
"""
Flipkart product search and extraction.

Public interface:
    search_flipkart(query, max_results=10)

Offline testing:
    parse_product_cards(html, max_results=10)

This module does not write products to the database or save/overwrite
HTML inspection files.
"""

import logging
from time import monotonic
import re
from urllib.parse import quote, urljoin, urlparse

from bs4 import BeautifulSoup
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from core.browser import browser_session
from core import search_diagnostics as diagnostics
from retailers.outcomes import (
    RetailerSearchError,
    empty_result_or_raise,
    fail,
)


logger = logging.getLogger(__name__)

# Only search URL used by this module.
SEARCH_URL = "https://www.flipkart.com/search?q={query}"

# Base URL used to resolve relative product links.
SEARCH_BASE_URL = "https://www.flipkart.com/search"


# Known card layouts found in the project's saved HTML snapshots.
PRODUCT_CARD_SELECTOR = (
    "div.jIjQ8S[data-tkid], "
    "div.RGLWAk[data-tkid]"
)

# Fallback selectors: Flipkart can change card wrappers between layouts.
PRODUCT_LINK_SELECTOR = 'a[href*="/p/"]'

TITLE_SELECTORS = (
    "a.pIpigb[title][href*='/p/']",
    "a[href*='/p/'][title]",
    ".RG5Slk",
    "[class*='KzDlHZ']",
    "[class*='s1Q9rs']",
)

PRICE_SELECTORS = (
    ".QiMO5r .hZ3P6w",
    "[class*='Nx9bqj']",
    "[class*='_30jeq3']",
)

ORIGINAL_PRICE_SELECTORS = (
    ".QiMO5r .kRYCnD",
    "[class*='yRaY8j']",
    "[class*='_3I9_wc']",
)

RATING_SELECTORS = (
    ".MKiFS6",
    "[class*='XQDdHH']",
    "[class*='_3LWZlK']",
)

IMAGE_SELECTORS = (
    "img.UCc1lI",
    "img[src]",
    "img[data-src]",
)


def build_flipkart_search_url(query: str) -> str:
    """Build a safe Flipkart search URL for a user-provided query."""

    cleaned_query = (query or "").strip()

    if not cleaned_query:
        raise ValueError("Search query cannot be empty.")

    return SEARCH_URL.format(query=quote(cleaned_query, safe=""))


def _clean_text(value) -> str:
    """Normalize whitespace and return an empty string for missing values."""

    if value is None:
        return ""

    return re.sub(r"\s+", " ", str(value)).strip()


def _element_text(element) -> str:
    """Read visible text, falling back to useful accessibility attributes."""

    if element is None:
        return ""

    text = _clean_text(element.get_text(" ", strip=True))

    if text:
        return text

    for attribute in ("title", "aria-label", "content"):
        value = _clean_text(element.get(attribute))

        if value:
            return value

    return ""


def _first_element(parent, selectors):
    """Return the first matching element from a selector list."""

    for selector in selectors:
        try:
            element = parent.select_one(selector)

            if element is not None:
                return element

        except Exception:
            logger.debug("Selector failed: %s", selector, exc_info=True)

    return None


def _first_text(parent, selectors) -> str:
    """Return text from the first useful matching element."""

    for selector in selectors:
        try:
            element = parent.select_one(selector)
            value = _element_text(element)

            if value:
                return value

        except Exception:
            logger.debug("Text selector failed: %s", selector, exc_info=True)

    return ""


def _parse_rupees(value):
    """
    Convert an Indian price string to a float.

    Examples:
        '₹54,999' -> 54999.0
        'Rs. 1,09,999' -> 109999.0
        '₹999' -> 999.0
    """

    if not value:
        return None

    text = str(value).replace(",", "")

    match = re.search(
        r"(?:₹|Rs\.?\s*)\s*(\d+(?:\.\d{1,2})?)",
        text,
        re.I,
    )

    if not match:
        return None

    try:
        return float(match.group(1))

    except (ValueError, TypeError):
        return None


def _normalize_product_url(href: str, base_url: str) -> str:
    """Resolve relative URLs and reject non-product or external URLs."""

    if not href:
        return ""

    absolute_url = urljoin(base_url, href.strip())
    parsed = urlparse(absolute_url)

    if parsed.scheme not in ("http", "https"):
        return ""

    if parsed.hostname not in ("flipkart.com", "www.flipkart.com"):
        return ""

    if "/p/" not in parsed.path:
        return ""

    return absolute_url


def _extract_product_url(card, base_url: str) -> str:
    """Find a product URL independently of the title element."""

    for anchor in card.select(PRODUCT_LINK_SELECTOR):
        href = anchor.get("href", "")
        url = _normalize_product_url(href, base_url)

        if url:
            return url

    return ""


def _extract_image_url(card, base_url: str):
    """Extract one main product image, preferring non-placeholder URLs."""

    for selector in IMAGE_SELECTORS:

        for image in card.select(selector):

            # Blocking image downloads can leave src as a data: placeholder.
            # Inspect every lazy source instead of letting that mask data-src.
            for attribute in ("data-src", "data-original", "data-lazy-src", "data-srcset", "srcset", "src"):
                source = image.get(attribute) or ""
                if not source or source.startswith("data:"):
                    continue
                source = source.split(",")[0].strip().split(" ")[0]
                absolute_url = urljoin(base_url, source)
                if absolute_url.startswith(("http://", "https://")) and "placeholder" not in absolute_url.lower():
                    return absolute_url

    return None


def _extract_title(card) -> str:
    """Extract a product title using known and fallback selectors."""

    for selector in TITLE_SELECTORS:

        element = card.select_one(selector)

        if element is None:
            continue

        title = _clean_text(
            element.get("title")
            or element.get("aria-label")
            or element.get_text(" ", strip=True)
        )

        if title and title.lower() not in ("view details", "view product"):
            return title

    # Last resort: use the title attribute from a product link.
    for anchor in card.select(PRODUCT_LINK_SELECTOR):

        title = _clean_text(
            anchor.get("title") or anchor.get("aria-label")
        )

        if title:
            return title

        image = anchor.select_one("img[alt]")

        if image:
            title = _clean_text(image.get("alt"))

            if title:
                return title

    return ""


def _extract_price(card, selectors):
    """Extract a price as a number, not as display text."""

    for selector in selectors:

        for element in card.select(selector):

            price = _parse_rupees(_element_text(element))

            if price is not None:
                return price

    return None


def _extract_rating(card):
    """Extract an optional average rating."""

    for selector in RATING_SELECTORS:

        for element in card.select(selector):

            text = _element_text(element)

            match = re.search(
                r"(?<!\d)([0-5](?:\.\d{1,2})?)(?!\d)",
                text,
            )

            if match:

                try:
                    rating = float(match.group(1))

                    if 0 <= rating <= 5:
                        return rating

                except ValueError:
                    pass

    return None


def _extract_specifications(card) -> dict:
    """
    Collect short feature lines where available.

    These are listing-page snippets, not verified full specifications.
    """

    specifications = []
    seen = set()

    for element in card.select(
        "li, [class*='kRYCnD'], [class*='feature']"
    ):

        value = _element_text(element)

        if not value or value.startswith("₹"):
            continue

        if value not in seen and len(value) <= 180:
            seen.add(value)
            specifications.append(value)

        if len(specifications) >= 8:
            break

    return {"features": specifications} if specifications else {}


def _extract_availability(card):
    """Extract availability only when the card explicitly states it."""

    text = _clean_text(
        card.get_text(" ", strip=True)
    ).lower()

    if "currently unavailable" in text or "out of stock" in text:
        return "Out of stock"

    if "in stock" in text:
        return "In stock"

    # Do not assume an item is available just because it is listed.
    return None


def extract_product_from_card(
    card,
    base_url=SEARCH_BASE_URL,
):
    """Parse one BeautifulSoup product card into the service's data format."""

    name = _extract_title(card)
    url = _extract_product_url(card, base_url)

    # Reject containers that do not appear to represent a product listing.
    if not name or not url:
        return None

    price = _extract_price(card, PRICE_SELECTORS)
    original_price = _extract_price(card, ORIGINAL_PRICE_SELECTORS)

    # If the original price is absent, do not copy the current price into it.
    if original_price is not None and price is not None:

        if original_price < price:
            original_price = None

    return {
        "name": name,
        "price": price,
        "original_price": original_price,
        "rating": _extract_rating(card),
        "url": url,
        "image_url": _extract_image_url(card, base_url),
        "retailer": "Flipkart",
        "specifications": _extract_specifications(card),
        "availability": _extract_availability(card),
    }


def parse_product_cards(
    html: str,
    max_results: int = 20,
    base_url: str = SEARCH_BASE_URL,
) -> list[dict]:
    """
    Parse saved HTML without opening a browser or making a network request.

    Supports both the known grid/compact card wrappers and a fallback that
    discovers product links when the wrappers change.
    """

    if not html or max_results <= 0:
        return []

    soup = html if isinstance(html, BeautifulSoup) else BeautifulSoup(html, "html.parser")

    cards = soup.select(PRODUCT_CARD_SELECTOR)

    # If wrapper classes have changed, try product links and walk upward
    # to find a container that contains a title and price.
    if not cards:

        discovered = []
        seen_nodes = set()

        for anchor in soup.select(PRODUCT_LINK_SELECTOR):

            parent = anchor

            for _ in range(6):

                if parent is None:
                    break

                node_id = id(parent)

                if node_id in seen_nodes:
                    parent = parent.parent
                    continue

                seen_nodes.add(node_id)

                if (
                    _extract_title(parent)
                    and _extract_price(parent, PRICE_SELECTORS) is not None
                ):
                    discovered.append(parent)
                    break

                parent = parent.parent

        cards = discovered

    products = []
    seen_urls = set()

    for card in cards:

        product = extract_product_from_card(
            card,
            base_url=base_url,
        )

        if not product:
            continue

        normalized_url = (
            product["url"].split("?")[0].rstrip("/").lower()
        )

        if normalized_url in seen_urls:
            continue

        seen_urls.add(normalized_url)
        products.append(product)

        if len(products) >= max_results:
            break

    return products


def _dismiss_login_popup(driver):
    """Try common close controls without failing the search if none exist."""

    selectors = (
        "button[aria-label='Close']",
        "span[role='button'][aria-label='Close']",
        "button[class*='close']",
    )

    for selector in selectors:

        try:
            buttons = driver.find_elements(
                By.CSS_SELECTOR,
                selector,
            )

            for button in buttons:

                if button.is_displayed() and button.is_enabled():
                    button.click()
                    return

        except WebDriverException:
            continue


def search_flipkart(
    query: str,
    max_results: int = 20,
    *,
    raise_on_error: bool = True,
) -> list[dict]:
    """
    Search Flipkart using Selenium and return normalized product dictionaries.

    Failures always raise; an empty list requires explicit no-results evidence.
    raise_on_error is retained as a compatibility keyword.
    """

    query = (query or "").strip()

    if not query:
        logger.warning(
            "Flipkart search skipped because the query is empty."
        )
        return []

    try:
        max_results = int(max_results)

    except (TypeError, ValueError):
        max_results = 20

    max_results = max(1, min(max_results, 20))

    search_url = build_flipkart_search_url(query)

    logger.info("Retailer search started retailer=Flipkart")

    diagnostics.begin("Flipkart")

    started = monotonic()
    stage = "browser_startup"

    try:

        # Use the existing browser manager and its configured WebDriver.
        with browser_session() as driver:

            stage = "navigation"

            navigation_started = monotonic()

            diagnostics.event(
                "navigation_started",
                retailer="Flipkart",
                stage="navigation",
            )

            try:
                driver.get(search_url)

            except TimeoutException as error:

                diagnostics.event(
                    "navigation_timeout",
                    retailer="Flipkart",
                    stage="navigation",
                    seconds=round(
                        monotonic() - navigation_started,
                        2,
                    ),
                    **diagnostics.error_details(error),
                )

                raise

            except Exception as error:

                diagnostics.event(
                    "navigation_failed",
                    retailer="Flipkart",
                    stage="navigation",
                    seconds=round(
                        monotonic() - navigation_started,
                        2,
                    ),
                    **diagnostics.error_details(error),
                )

                raise

            diagnostics.event(
                "navigation_finished",
                retailer="Flipkart",
                stage="navigation",
                seconds=round(
                    monotonic() - navigation_started,
                    2,
                ),
            )

            diagnostics.page(
                "Flipkart",
                driver,
                "navigation_finished",
                PRODUCT_CARD_SELECTOR,
            )

            stage = "results_wait"
            diagnostics.event("stage_started", retailer="Flipkart", stage=stage)

            try:

                WebDriverWait(driver, 25).until(
                    lambda current_driver: (
                        current_driver.find_elements(
                            By.CSS_SELECTOR,
                            PRODUCT_CARD_SELECTOR,
                        )
                        or current_driver.find_elements(
                            By.CSS_SELECTOR,
                            PRODUCT_LINK_SELECTOR,
                        )
                    )
                )

            except TimeoutException:

                diagnostics.page(
                    "Flipkart",
                    driver,
                    "results_timeout",
                    PRODUCT_CARD_SELECTOR,
                )

                return empty_result_or_raise(
                    "Flipkart",
                    driver,
                    "results_timeout",
                )

            _dismiss_login_popup(driver)

            # Wait briefly for a product link after any popup interaction.
            try:

                WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located(
                        (
                            By.CSS_SELECTOR,
                            PRODUCT_LINK_SELECTOR,
                        )
                    )
                )

            except TimeoutException:

                diagnostics.page(
                    "Flipkart",
                    driver,
                    "results_timeout",
                    PRODUCT_CARD_SELECTOR,
                )

                return empty_result_or_raise(
                    "Flipkart",
                    driver,
                    "results_timeout",
                )

            stage = "parsing"
            diagnostics.event("stage_started", retailer="Flipkart", stage=stage)

            html = driver.page_source

            products = parse_product_cards(
                html=html,
                max_results=max_results,
                base_url=driver.current_url or SEARCH_BASE_URL,
            )

            diagnostics.page(
                "Flipkart",
                driver,
                "parsed",
                PRODUCT_CARD_SELECTOR,
                products=len(products),
            )

            if not products:

                return empty_result_or_raise(
                    "Flipkart",
                    driver,
                    "parsing_failure",
                )

            logger.info(
                "Retailer search completed retailer=Flipkart products=%d",
                len(products),
            )

            stage = "browser_cleanup"

            return products

    except RetailerSearchError as error:

        diagnostics.event(
            "retailer_failed",
            retailer="Flipkart",
            stage=error.stage,
            seconds=round(monotonic() - started, 2),
            **diagnostics.error_details(error),
        )

        raise

    except TimeoutException as error:

        diagnostics.event(
            "retailer_failed",
            retailer="Flipkart",
            stage=stage,
            seconds=round(monotonic() - started, 2),
            **diagnostics.error_details(error),
        )

        fail(
            "Flipkart",
            "navigation_timeout" if stage == "navigation" else stage,
            error,
        )

    except Exception as error:

        diagnostics.event(
            "retailer_failed",
            retailer="Flipkart",
            stage=stage,
            seconds=round(monotonic() - started, 2),
            **diagnostics.error_details(error),
        )

        fail("Flipkart", stage, error)
