"""Bounded rendering preparation; no variant, cart, login or purchase actions."""
from time import monotonic

from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.support.ui import WebDriverWait

from .amazon import selectors as amazon
from .flipkart import selectors as flipkart


def prepare_product_page(driver, retailer, deadline):
    """Wait for product identity, reveal lazy sections and expand known details.

    Test/offline drivers may expose only page_source. Real Selenium drivers use
    explicit waits within the caller's deadline; optional-section failures must
    not discard already readable product information.
    """
    if not callable(getattr(driver, "execute_script", None)):
        return
    selectors = amazon if retailer == "Amazon" else flipkart

    def wait_for(predicate, seconds):
        remaining = min(seconds, deadline - monotonic() - .3)
        if remaining <= 0:
            return
        try:
            WebDriverWait(driver, remaining, poll_frequency=.2).until(predicate)
        except (TimeoutException, WebDriverException):
            pass

    wait_for(lambda browser: browser.execute_script("""
        const title = document.querySelector(arguments[0]);
        const text = (document.body?.innerText || '').slice(0, 50000);
        return Boolean(title?.textContent.trim()) ||
          /captcha|access denied|not a robot|enter the characters/i.test(text);
    """, selectors.READY), 5)
    if monotonic() >= deadline - .3:
        return
    try:
        # Scroll the detail section into view when present, otherwise advance
        # two viewports to trigger lazy product content without crawling links.
        driver.execute_script("""
            const section = document.querySelector(arguments[0]);
            if (section) section.scrollIntoView({block: 'center'});
            else window.scrollTo(0, window.innerHeight * 2);
        """, ", ".join((*selectors.TABLES, getattr(selectors, "SPEC_CARDS", "#productDetails_feature_div"))))
        for selector in selectors.EXPAND:
            if monotonic() >= deadline - .5:
                break
            driver.execute_script("""
                const control = document.querySelector(arguments[0]);
                if (!control || !control.getClientRects().length) return;
                const href = control.getAttribute('href');
                if (control.tagName === 'BUTTON' && control.type !== 'submit' ||
                    control.tagName === 'A' && (!href || href === '#' || href === 'javascript:void(0)')) {
                    control.click();
                }
            """, selector)
        # Give asynchronous section rendering time to settle after scrolling.
        state = {"size": None, "stable": 0}

        def settled(browser):
            size = browser.execute_script("return document.body?.innerText.length || 0")
            state["stable"] = state["stable"] + 1 if size == state["size"] else 0
            state["size"] = size
            return state["stable"] >= 3

        wait_for(settled, 2)
    except WebDriverException:
        pass
