"""Bounded Selenium navigation shared by the existing marketplace scrapers."""
from dataclasses import dataclass
from time import monotonic
from urllib.parse import parse_qs, urlsplit

from bs4 import BeautifulSoup
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait

from core import search_diagnostics as diagnostics
from retailers.outcomes import RetailerSearchError


@dataclass
class RetailerPage:
    items: list
    has_next: bool
    next_page: int | None = None


DOCUMENT_PROBE = r"""
const selector = arguments[0];
const cards = document.querySelectorAll(selector).length;
const n = performance.getEntriesByType('navigation')[0];
const text = ((document.title || '') + ' ' + (document.body?.innerText || '')).slice(0, 20000).replace(/\s+/g,' ').toLowerCase();
const challengeForm = Boolean(document.querySelector?.('input#captchacharacters, form[action*="validateCaptcha"], img[src*="captcha"]'));
let pageKind = 'unclassified';
if (challengeForm || /captcha|robot check|not a robot|type the characters|enter the characters you see|verify you are human/.test(text)) pageKind = 'captcha';
else if (/automated access|api-services-support@amazon/.test(text)) pageKind = 'automated_access';
else if (/access denied|request blocked|permission to access/.test(text)) pageKind = 'access_denied';
else if (/request could not be satisfied/.test(text)) pageKind = 'cdn_error';
else if (/something went wrong|service unavailable|503 service/.test(text)) pageKind = 'upstream_error';
else if (/no results for|no results found|did not match any products|0 results for/.test(text)) pageKind = 'empty';
const httpStatus = n?.responseStatus || 0;
let kind = null;
if (httpStatus >= 400) kind = 'upstream_http_' + httpStatus;
else if (['captcha','automated_access','access_denied'].includes(pageKind)) kind = 'blocked_page';
else if (cards >= 8 || (cards && document.readyState === 'complete')) kind = 'cards';
else if (['upstream_error','cdn_error'].includes(pageKind)) kind = 'upstream_error';
else if (pageKind === 'empty') kind = 'empty';
if (kind === 'cards') pageKind = 'product_results';
const host = location.hostname.replace(/^www\./, '');
return {kind, page_kind:pageKind, cards, http_status:httpStatus,
  host:['amazon.in','flipkart.com'].includes(host) ? host : 'other',
  search_path:location.pathname === '/s' || location.pathname === '/search',
  redirect_count:n?.redirectCount || 0, ready_state:document.readyState,
  body_characters:document.body?.innerText.length || 0, challenge_form:challengeForm,
  dns_ms:Math.round((n?.domainLookupEnd || 0)-(n?.domainLookupStart || 0)),
  connection_ms:Math.round((n?.connectEnd || 0)-(n?.connectStart || 0)),
  response_ms:Math.round((n?.responseStart || 0)-(n?.requestStart || 0))};
"""


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


def scrape_search_page(driver, retailer, url, page, deadline, selector, parser, max_results=40):
    """One navigation. Absolute deadline includes navigation, waits and parsing."""
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
            driver.get(url)
        except TimeoutException:
            # A ready result DOM can still be useful when an ancillary request
            # stalls. Stop loading and apply the same explicit card checks.
            driver.execute_cdp_cmd("Page.stopLoading", {})
        diagnostics.event("navigation_finished", retailer=retailer, page=page,
                          seconds=round(monotonic() - navigated, 3))
        probe = driver.execute_script(DOCUMENT_PROBE, selector)
        diagnostics.event("navigation_probe", retailer=retailer, page=page, **probe)
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
                lambda current: _ready_document(current, selector))
        except TimeoutException:
            raise RetailerSearchError(retailer, "results_timeout") from None
        diagnostics.event("results_ready", retailer=retailer, page=page, page_kind=ready["page_kind"], outcome=ready["kind"],
                          cards=ready["cards"], http_status=ready.get("http_status", 0), seconds=round(monotonic() - waiting, 3))
        if ready["kind"] == "empty":
            return RetailerPage([], False)
        if ready["kind"] != "cards":
            raise RetailerSearchError(retailer, ready["kind"], page_kind=ready["page_kind"], http_status=ready["http_status"])
        stage = "parsing"
        parsing = monotonic()
        soup = BeautifulSoup(driver.page_source, "html.parser")
        # Parse the whole marketplace page once; excess real products travel in
        # the signed cursor rather than requiring a second scrape of this page.
        products = parser(soup, max_results=max_results, base_url=driver.current_url)
        next_page = next_page_number(soup, retailer, page)
        diagnostics.event("parsing_finished", retailer=retailer, page=page, products=len(products),
                          seconds=round(monotonic() - parsing, 3), has_next=next_page is not None)
        if not products:
            raise RetailerSearchError(retailer, "parsing_failure")
        return RetailerPage(products, next_page is not None, next_page)
    except Exception as error:
        failure = error if isinstance(error, RetailerSearchError) else RetailerSearchError(retailer, stage, type(error).__name__)
        diagnostics.event("retailer_unavailable", retailer=retailer, page=page,
                          stage=failure.stage, page_kind=failure.page_kind, http_status=failure.http_status, seconds=round(monotonic() - started, 3),
                          **diagnostics.error_details(error))
        raise failure from None


def _ready_document(driver, selector):
    probe = driver.execute_script(DOCUMENT_PROBE, selector)
    return probe if probe.get("kind") else False
