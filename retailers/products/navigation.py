"""Navigate, reject blocked/wrong pages, and parse the rendered document."""
import re
from time import monotonic, time
from urllib.parse import parse_qs, urlparse
from .errors import ProductDetailError
from .url_validation import validate_detail_url
from .amazon_product import parse_amazon_product_page
from .flipkart_product import parse_flipkart_product_page
from .product_normalizer import normalize_product_details
from .page_readiness import prepare_product_page


def _navigate(driver, url, retailer, deadline):
    available = deadline - monotonic()
    if available < .5:
        raise ProductDetailError("deadline_exceeded", "Product detail request deadline exceeded")
    driver.set_page_load_timeout(max(.5, min(12, available - .2)))
    try:
        driver.get(url)
    except Exception as error:
        try:
            from selenium.common.exceptions import TimeoutException
            timed_out = isinstance(error, TimeoutException)
        except ImportError:
            timed_out = type(error).__name__ == "TimeoutException"
        if not timed_out:
            raise ProductDetailError("navigation_failed", "Product page navigation failed") from error
        try:
            driver.execute_cdp_cmd("Page.stopLoading", {})
        except Exception:
            pass
    if monotonic() >= deadline:
        raise ProductDetailError("deadline_exceeded", "Product detail request deadline exceeded")
    prepare_product_page(driver, retailer, deadline)
    return driver.page_source


def _load_with_driver(driver, url, retailer, deadline):
    html = _navigate(driver, url, retailer, deadline)
    redirected = getattr(driver, "current_url", url) or url
    try:
        final_url = validate_detail_url(redirected, retailer)
    except ProductDetailError as error:
        raise ProductDetailError("unexpected_redirect", "Retailer redirected away from the product page") from error
    if retailer == "Amazon" and final_url != url:
        raise ProductDetailError("different_product_redirect", "Retailer redirected to a different product")
    if retailer == "Flipkart":
        expected, actual = urlparse(url), urlparse(final_url)
        expected_pid = parse_qs(expected.query).get("pid", [None])[0]
        actual_pid = parse_qs(actual.query).get("pid", [None])[0]
        expected_item = re.search(r"/p/(itm[a-z0-9]+)", expected.path, re.I)
        actual_item = re.search(r"/p/(itm[a-z0-9]+)", actual.path, re.I)
        if ((expected_pid and (not actual_pid or expected_pid.casefold() != actual_pid.casefold())) or
                (expected_item and actual_item and expected_item.group(1).casefold() != actual_item.group(1).casefold())):
            raise ProductDetailError("different_product_redirect", "Retailer redirected to a different product")
    blocked = (html or "")[:50_000].casefold()
    if any(text in blocked for text in ("enter the characters you see below", "automated access to amazon data",
            "sorry, we just need to make sure you're not a robot", "captcha challenge",
            "unusual traffic from your computer network", "access denied")):
        raise ProductDetailError("blocked_page", "Retailer restricted automated access to the product page")
    if len(html) > 5_000_000:
        raise ProductDetailError("oversized_page", "Product page exceeds the allowed size")
    raw = (parse_amazon_product_page if retailer == "Amazon" else parse_flipkart_product_page)(html, final_url)
    if not raw.get("name") or not raw.get("product_id"):
        raise ProductDetailError("incomplete_page", "Product identity could not be extracted")
    parsed = normalize_product_details(raw)
    parsed["checked_at"] = int(time())
    return parsed
