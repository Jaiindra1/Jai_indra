"""Real browser measurements and scroll verification. Explicit live checks only."""
import argparse
import json
from pathlib import Path
import sys
from time import monotonic

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from core.browser import browser_session


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default="http://127.0.0.1:5001")
    parser.add_argument("--mobile", action="store_true")
    parser.add_argument("--pages", type=int, default=5)
    parser.add_argument("--query", default="Samsung A56")
    args = parser.parse_args()
    measurements = []
    with browser_session() as driver:
        driver.set_window_size(390 if args.mobile else 1365, 844 if args.mobile else 900)
        if args.mobile:
            driver.execute_cdp_cmd("Emulation.setDeviceMetricsOverride", {
                "width": 390, "height": 844, "deviceScaleFactor": 1, "mobile": True,
            })
        driver.get(args.base_url)
        driver.execute_script("""
            window.__testRequests=[]; const original=window.fetch;
            window.fetch=async(...args)=>{
              if(!String(args[0]).includes('/api/search')) return original(...args);
              const entry={more:String(args[0]).includes('/more'),start:performance.now()};
              window.__testRequests.push(entry);
              const response=await original(...args); entry.status=response.status;
              entry.ms=performance.now()-entry.start; return response;
            };
        """)
        driver.find_element(By.ID, "product-query").send_keys(args.query)
        driver.find_element(By.CSS_SELECTOR, "#search-form button").click()
        WebDriverWait(driver, 40).until(lambda d: d.execute_script("return !!window.__sandhyaMetrics?.first_product_ms"))
        driver.execute_script("window.__firstCard=document.querySelector('.product-card')")
        previous = 0
        for index in range(args.pages):
            scroll_before = None
            if index:
                previous = len(driver.find_elements(By.CSS_SELECTOR, ".product-card"))
                scroll_before = driver.execute_script("document.getElementById('pagination-sentinel').scrollIntoView({block:'end',behavior:'instant'}); return scrollY;")
                WebDriverWait(driver, 40).until(lambda d: d.execute_script("""
                    return document.querySelectorAll('.product-card').length > arguments[0]
                       || document.querySelector('.pagination-button')?.textContent === 'Retry'
                       || document.querySelector('.pagination-status')?.textContent.includes('end of');
                """, previous))
            record = driver.execute_script("""
                const cards=[...document.querySelectorAll('.product-card')];
                return {batch:arguments[0], viewport:{width:innerWidth,height:innerHeight},
                  items:cards.length, unique:new Set(cards.map(c=>c.dataset.productId)).size,
                  first_card_preserved:window.__firstCard===cards[0] && window.__firstCard.isConnected,
                  scroll_y:scrollY, status:document.querySelector('.pagination-status')?.textContent,
                  notices:document.querySelector('.search-notice')?.textContent,
                  metrics:window.__sandhyaMetrics, requests:window.__testRequests,
                  valid_fields:cards.every(c=>c.querySelector('.product-title')?.textContent.trim()
                    && c.querySelector('.product-price')?.textContent.trim()
                    && c.querySelector('.product-button')?.href.startsWith('https://')),
                  with_images:cards.filter(c=>c.querySelector('img')?.src.startsWith('http')).length};
            """, index + 1)
            if not record["first_card_preserved"] or record["items"] != record["unique"] or not record["valid_fields"]:
                raise RuntimeError("Scroll verification failed: " + json.dumps(record))
            record["scroll_before_append"] = scroll_before
            if scroll_before is not None and abs(scroll_before - record["scroll_y"]) > 80:
                raise RuntimeError("Appending products changed the scroll position: " + json.dumps(record))
            measurements.append(record)
            print(json.dumps(record), flush=True)
            if "end of" in record["status"] or "retry" in record["status"].lower() or record["items"] <= previous:
                break
    Path("performance-results.json").write_text(json.dumps(measurements, indent=2))


if __name__ == "__main__":
    main()
