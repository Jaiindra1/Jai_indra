"""Public retrieval entry point: validation, cache lookup and browser ownership.

Retailer parsing is delegated to amazon/ and flipkart/. This module deliberately
contains no selectors or section parsing so comparison and page APIs share it.
"""
from time import monotonic
from .errors import ProductDetailError
from .url_validation import validate_detail_url
from .cache import _CACHE, _cache_get, _cache_put  # Compatibility with existing tests.
from .navigation import _load_with_driver


def get_product_details(url, retailer, *, driver=None, deadline=None, cache_ttl=90, force_refresh=False):
    canonical = validate_detail_url(url, retailer)
    if deadline is not None and deadline <= monotonic():
        raise ProductDetailError("deadline_exceeded", "Product detail request deadline exceeded")
    key = retailer, canonical
    if not force_refresh and (saved := _cache_get(key)) is not None:
        saved["cache_hit"] = True
        return saved
    stop_at = deadline if deadline is not None else monotonic() + 15
    if driver is None:
        from core.browser import browser_session
        with browser_session(scraping=True, wait_timeout=5, deadline=stop_at,
                             owner="selected_product_detail") as shared_driver:
            details = _load_with_driver(shared_driver, canonical, retailer, stop_at)
    else:
        details = _load_with_driver(driver, canonical, retailer, stop_at)
    details["cache_hit"] = False
    _cache_put(key, details, cache_ttl)
    return details
