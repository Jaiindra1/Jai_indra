"""Offline browser integration check using real Chrome and synthetic retailer HTML.

Run after `npm run build` in Frontend/Sarathi. Search is stubbed; the signed
product API, Selenium rendering, parsers and React page run
for real. A test-only driver adapter maps retailer navigation to local fixtures.
No request is sent to Amazon, Flipkart or an AI provider.
"""
from contextlib import contextmanager
import json
from pathlib import Path
import sys
from threading import Thread
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from flask import send_from_directory
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from werkzeug.serving import make_server

from main import app
from retailers.products.cache import _CACHE
from services.product_details import product_path, load_product
from tests.product_details.test_sections import AMAZON_URL, FLIPKART_URL, FIXTURES

DIST = ROOT / "Frontend/Sarathi/dist"
ARTIFACTS = ROOT / ".artifacts/product-details"
scenario = {"retailer": "Amazon", "blocked": False, "visits": 0}


@app.get('/find-your-products')
@app.get('/products/<product_id>')
def spa(product_id=None):
    return send_from_directory(DIST, 'index.html')


@app.get('/assets/<path:filename>')
def assets(filename):
    return send_from_directory(DIST / 'assets', filename)


@app.get('/fixture')
def fixture():
    if scenario['blocked']:
        return '<html><body>Enter the characters you see below</body></html>'
    html = (FIXTURES / (scenario['retailer'].lower() + '.html')).read_text(encoding='utf-8')
    # Confirm data inserted asynchronously reaches BeautifulSoup and the UI.
    html = html.replace('A portable notebook for everyday work.', '')
    return html.replace('</body>', """<script>setTimeout(() => {
      document.querySelector('#productDescription, #description').textContent =
        'Dynamically loaded product description.';
    }, 250);</script></body>""")


def search_results(**kwargs):
    retailer = scenario['retailer']
    token = product_path({'name': 'Earlier search notebook', 'price': 45000,
                          'retailer': retailer, 'url': AMAZON_URL if retailer == 'Amazon' else FLIPKART_URL})
    product = load_product(token.split('/product/')[1])
    product['detail_url'] = token
    return {'success': True, 'items': [product], 'has_more': False, 'next_cursor': None,
            'warnings': [], 'pending_retailers': []}


class FixtureBrowser:
    """Substitute only the destination; all rendering uses a real WebDriver."""
    def __init__(self, driver, base):
        self.driver, self.base, self.current_url = driver, base, None

    def get(self, url):
        self.current_url = url
        scenario['visits'] += 1
        self.driver.get(self.base + '/fixture')

    def __getattr__(self, name):
        return getattr(self.driver, name)


def main():
    if not (DIST / 'index.html').is_file():
        raise SystemExit('Build the React frontend first.')
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    options = webdriver.ChromeOptions()
    options.add_argument('--headless=new')
    options.add_argument('--window-size=1440,1000')
    options.page_load_strategy = 'eager'
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
    server = make_server('127.0.0.1', 0, app, threaded=True)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = f'http://127.0.0.1:{server.server_port}'
    ui = scraper = None
    try:
        ui = webdriver.Chrome(options=options)
        scraper = webdriver.Chrome(options=options)
        adapter = FixtureBrowser(scraper, base)

        @contextmanager
        def session(**kwargs):
            yield adapter

        with patch.dict('os.environ', {'PAGINATION_SECRET': 'offline-browser-verification-' * 2}), \
             patch('main.search_page', search_results), \
             patch('core.browser.browser_session', session):
            wait = WebDriverWait(ui, 35)
            for retailer in ('Amazon', 'Flipkart'):
                scenario.update(retailer=retailer, blocked=False, visits=0)
                _CACHE.clear()
                ui.get(base + '/find-your-products?q=' + retailer)
                wait.until(lambda browser: browser.find_elements(By.PARTIAL_LINK_TEXT, 'View product'))[0].click()
                loader = wait.until(lambda browser: browser.find_elements(By.CSS_SELECTOR, '.hamster-loader[aria-label="Loading product details"]'))[0]
                label = loader.find_element(By.XPATH, ".//p[text()='Loading product details']")
                assert label.is_displayed(), 'Loader status must be visible'
                wheel = loader.find_element(By.CLASS_NAME, 'wheel-and-hamster')
                assert label.rect['y'] >= wheel.rect['y'] + wheel.rect['height'], 'Status must sit below the hamster'
                ui.save_screenshot(str(ARTIFACTS / (retailer.lower() + '-loading.png')))
                wait.until(lambda browser: 'Dynamically loaded product description.' in browser.find_element(By.TAG_NAME, 'body').text)
                body = ui.find_element(By.TAG_NAME, 'body').text
                for expected in ('Example Notebook', 'Product specifications', 'Available offers', 'Example Seller', 'Listed variants'):
                    assert expected in body, (retailer, expected)
                assert '/products/' in ui.current_url
                section_ids = ['product-overview', 'product-purchase', 'product-description', 'product-specifications']
                positions = [ui.find_element(By.ID, ident).rect['y'] for ident in section_ids]
                assert positions == sorted(positions), 'Product sections must follow reading order'
                assert not ui.find_elements(By.XPATH, "//*[starts-with(text(), 'Selected on ')]"), 'No duplicate selected-product summary'
                assert scenario['visits'] == 1
                ui.save_screenshot(str(ARTIFACTS / (retailer.lower() + '-desktop.png')))
                ui.set_window_size(390, 844)
                ui.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {
                    'width': 390, 'height': 844, 'deviceScaleFactor': 1, 'mobile': True})
                assert ui.execute_script('return document.documentElement.scrollWidth <= window.innerWidth'), 'Mobile overflow'
                ui.save_screenshot(str(ARTIFACTS / (retailer.lower() + '-mobile.png')))
                ui.execute_cdp_cmd('Emulation.clearDeviceMetricsOverride', {})
                ui.set_window_size(1440, 1000)
                # A manual refresh really revisits the selected URL.
                ui.find_element(By.XPATH, "//button[text()='Refresh product details']").click()
                wait.until(lambda browser: scenario['visits'] == 2 and browser.find_elements(By.XPATH, "//button[text()='Refresh product details']"))
                assert scenario['visits'] == 2
                scenario['blocked'] = True
                ui.find_element(By.XPATH, "//button[text()='Refresh product details']").click()
                wait.until(lambda browser: 'Showing the earlier search result' in browser.find_element(By.TAG_NAME, 'body').text)
                assert ui.find_element(By.TAG_NAME, 'h1').text == 'Earlier search notebook'
                scenario['blocked'] = False
                ui.find_element(By.XPATH, "//button[text()='Retry product details']").click()
                wait.until(lambda browser: 'Dynamically loaded product description.' in browser.find_element(By.TAG_NAME, 'body').text)
                ui.find_element(By.PARTIAL_LINK_TEXT, 'Back to search results').click()
                wait.until(lambda browser: browser.find_elements(By.PARTIAL_LINK_TEXT, 'View product'))
                print(f'PASS: {retailer} search selection, dynamic extraction, desktop/mobile, refresh, fallback, retry and back navigation', flush=True)
            errors = [entry for entry in ui.get_log('browser') if 'Uncaught ' in entry['message']]
            assert not errors, json.dumps(errors)
    finally:
        for driver in (ui, scraper):
            if driver:
                driver.quit()
        server.shutdown()
        thread.join(timeout=3)


if __name__ == '__main__':
    main()
