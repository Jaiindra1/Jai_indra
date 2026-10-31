"""Marketplace page adapters using the existing BeautifulSoup product parsers."""
from dataclasses import dataclass
from time import monotonic
from urllib.parse import parse_qs, urlencode, urlsplit

from bs4 import BeautifulSoup
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait

from core import search_diagnostics as diagnostics
from retailers import amazon, flipkart
from retailers.outcomes import RetailerSearchError


@dataclass
class RetailerPage:
    items: list
    has_next: bool
    next_page: int | None = None


READY_SCRIPT = r"""
const selector = arguments[0];
const cards = document.querySelectorAll(selector).length;
if (cards >= 8) return {kind:'cards', cards};
const text = (document.body?.innerText || '').slice(0,16000).toLowerCase();
if (/captcha|robot check|verify you are human|access denied|automated access/.test(text))
  return {kind:'blocked_page', cards};
if (/sorry.{0,12}something went wrong|service unavailable|503 service/.test(text))
  return {kind:'upstream_error', cards};
if (/no results for|no results found|did not match any products|0 results for/.test(text))
  return {kind:'empty', cards};
if (cards && document.readyState === 'complete') return {kind:'cards', cards};
return null;
"""


def page_url(retailer, query, page):
    if retailer not in {"Amazon", "Flipkart"} or type(page) is not int or not 1 <= page <= 8:
        raise ValueError("Invalid retailer page.")
    key, base = ("k", "https://www.amazon.in/s") if retailer == "Amazon" else ("q", "https://www.flipkart.com/search")
    return base + "?" + urlencode({key: query, "page": page})


def next_page_number(soup, retailer, page):
    for link in soup.select("a[href]"):
        if link.get("aria-disabled") == "true" or "s-pagination-disabled" in link.get("class", []):
            continue
        parsed = urlsplit(link["href"])
        if parsed.hostname and parsed.hostname.removeprefix("www.") != ("amazon.in" if retailer == "Amazon" else "flipkart.com"):
            continue
        values = parse_qs(parsed.query).get("page", [])
        if values and values[0].isdigit() and int(values[0]) == page + 1:
            return page + 1
    return None


def scrape_page(driver, retailer, query, page, deadline):
    """One navigation. Absolute deadline includes navigation, waits and parsing."""
    selector = amazon.PRODUCT_CARD_SELECTOR if retailer == "Amazon" else flipkart.PRODUCT_CARD_SELECTOR + ', a[href*="/p/"]'
    parser = amazon.parse_amazon_product_cards if retailer == "Amazon" else flipkart.parse_product_cards
    stage = "navigation"
    started = monotonic()
    diagnostics.begin(retailer)
    diagnostics.event("page_started", retailer=retailer, page=page, stage=stage)
    try:
        remaining = deadline - monotonic()
        if remaining <= 0.8:
            raise RetailerSearchError(retailer, "request_deadline")
        driver.set_page_load_timeout(max(0.3, min(8, remaining - 0.6)))
        navigated = monotonic()
        try:
            driver.get(page_url(retailer, query, page))
        except TimeoutException:
            # A ready result DOM can still be useful when an ancillary request
            # stalls. Stop loading and apply the same explicit card checks.
            driver.execute_cdp_cmd("Page.stopLoading", {})
        diagnostics.event("navigation_finished", retailer=retailer, page=page,
                          seconds=round(monotonic() - navigated, 3))
        stage = "results_wait"
        waiting = monotonic()
        remaining = deadline - monotonic() - 0.5
        if remaining <= 0:
            raise RetailerSearchError(retailer, "request_deadline")
        # Baseline: Flipkart cards arrive with the DOM; Amazon waited 25s on
        # zero cards. Deferred Amazon requests get a bounded readiness window.
        wait = min(5 if retailer == "Amazon" else 4, remaining)
        try:
            ready = WebDriverWait(driver, wait, poll_frequency=0.25).until(
                lambda current: current.execute_script(READY_SCRIPT, selector))
        except TimeoutException:
            raise RetailerSearchError(retailer, "results_timeout") from None
        diagnostics.event("results_ready", retailer=retailer, page=page, page_kind=ready["kind"],
                          cards=ready["cards"], seconds=round(monotonic() - waiting, 3))
        if ready["kind"] == "empty":
            return RetailerPage([], False)
        if ready["kind"] != "cards":
            raise RetailerSearchError(retailer, ready["kind"])
        stage = "parsing"
        parsing = monotonic()
        soup = BeautifulSoup(driver.page_source, "html.parser")
        # Parse the whole marketplace page once; excess real products travel in
        # the signed cursor rather than requiring a second scrape of this page.
        products = parser(soup, max_results=40, base_url=driver.current_url)
        next_page = next_page_number(soup, retailer, page)
        diagnostics.event("parsing_finished", retailer=retailer, page=page, products=len(products),
                          seconds=round(monotonic() - parsing, 3), has_next=next_page is not None)
        if not products:
            raise RetailerSearchError(retailer, "parsing_failure")
        return RetailerPage(products, next_page is not None, next_page)
    except Exception as error:
        failure = error if isinstance(error, RetailerSearchError) else RetailerSearchError(retailer, stage, type(error).__name__)
        diagnostics.event("retailer_unavailable", retailer=retailer, page=page,
                          stage=failure.stage, seconds=round(monotonic() - started, 3),
                          **diagnostics.error_details(error))
        raise failure from None
