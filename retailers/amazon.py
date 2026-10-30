
"""
Amazon India product search.

Public interface:
    search_amazon(query, max_results=10)

Uses the existing Selenium browser manager.
Does not write products to the database.
"""

import logging
from time import monotonic
import re
from urllib.parse import quote, urljoin, urlparse

from bs4 import BeautifulSoup
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

from core.browser import browser_session
from core import search_diagnostics as diagnostics
from retailers.outcomes import RetailerSearchError, empty_result_or_raise, fail


logger = logging.getLogger(__name__)

AMAZON_URL = "https://www.amazon.in/"
SEARCH_URL = "https://www.amazon.in/s?k={query}"

# Amazon's common search-result card selector.
PRODUCT_CARD_SELECTOR = (
    "div[data-component-type='s-search-result'][data-asin]"
)


def build_amazon_search_url(query: str) -> str:
    """Create a search URL from the user's product query."""
    query = (query or "").strip()

    if not query:
        raise ValueError("Search query cannot be empty.")

    return SEARCH_URL.format(query=quote(query, safe=""))


def clean_text(value) -> str:
    """Normalize whitespace."""
    if value is None:
        return ""

    return re.sub(r"\s+", " ", str(value)).strip()


def extract_price(card):
    """Extract the displayed price as a numeric value."""
    whole = card.select_one(".a-price .a-price-whole")
    fraction = card.select_one(".a-price .a-price-fraction")

    if whole:
        whole_text = clean_text(whole.get_text())
        fraction_text = clean_text(fraction.get_text()) if fraction else "00"

        digits = re.sub(r"[^\d]", "", whole_text)
        fraction_digits = re.sub(r"[^\d]", "", fraction_text)

        if digits:
            try:
                return float(f"{digits}.{fraction_digits[:2] or '00'}")
            except ValueError:
                pass

    # Fallback: parse a combined displayed price.
    price_element = card.select_one(".a-price .a-offscreen")

    if price_element:
        price_text = clean_text(price_element.get_text())
        match = re.search(r"(?:₹|Rs\.?\s*)\s*([\d,]+(?:\.\d{1,2})?)", price_text, re.I)

        if match:
            try:
                return float(match.group(1).replace(",", ""))
            except ValueError:
                pass

    return None


def extract_original_price(card):
    """Extract the struck-through list price, if available."""
    for selector in (
        ".a-price.a-text-price .a-offscreen",
        ".a-text-price .a-offscreen",
    ):
        element = card.select_one(selector)

        if element:
            text = clean_text(element.get_text())
            match = re.search(r"(?:₹|Rs\.?\s*)\s*([\d,]+(?:\.\d{1,2})?)", text, re.I)

            if match:
                try:
                    return float(match.group(1).replace(",", ""))
                except ValueError:
                    continue

    return None


def extract_rating(card):
    """Extract the product's average rating, when displayed."""
    element = card.select_one(
        "span.a-icon-alt"
    )

    if not element:
        return None

    text = clean_text(element.get_text())
    match = re.search(r"([0-5](?:\.\d+)?)\s+out of 5", text, re.I)

    if not match:
        return None

    try:
        rating = float(match.group(1))
        return rating if 0 <= rating <= 5 else None
    except ValueError:
        return None


def extract_product_from_card(card, base_url=AMAZON_URL):
    """Convert one Amazon result card into a product dictionary."""
    asin = clean_text(card.get("data-asin"))

    # Amazon uses empty ASINs for some non-product containers.
    if not asin:
        return None

    title_element = card.select_one("h2 a span")
    link_element = card.select_one("h2 a[href]")

    # Some result layouts wrap the title heading in the product link.
    if not title_element or not link_element:
        title_element = card.select_one("a[href] h2")
        link_element = (
            title_element.find_parent("a", href=True)
            if title_element else None
        )

    if not title_element or not link_element:
        return None

    name = clean_text(title_element.get_text())

    if not name:
        return None

    url = urljoin(base_url, link_element.get("href", ""))

    parsed = urlparse(url)

    if parsed.hostname not in ("amazon.in", "www.amazon.in"):
        return None

    price = extract_price(card)
    original_price = extract_original_price(card)

    if (
        original_price is not None
        and price is not None
        and original_price < price
    ):
        original_price = None

    image_element = card.select_one("img.s-image")
    image_url = None

    if image_element:
        image_url = (
            image_element.get("src")
            or image_element.get("data-src")
        )

    rating = extract_rating(card)

    availability = None
    card_text = clean_text(card.get_text(" ", strip=True)).lower()

    if "currently unavailable" in card_text:
        availability = "Unavailable"

    return {
        "name": name,
        "price": price,
        "original_price": original_price,
        "rating": rating,
        "url": url,
        "image_url": image_url,
        "retailer": "Amazon",
        "specifications": {},
        "availability": availability,
    }


def parse_amazon_product_cards(
    html: str,
    max_results: int = 10,
    base_url: str = AMAZON_URL,
) -> list[dict]:
    """Parse saved Amazon HTML offline without starting Selenium."""
    if not html or max_results <= 0:
        return []

    soup = BeautifulSoup(html, "html.parser")
    cards = soup.select(PRODUCT_CARD_SELECTOR)

    products = []
    seen_asins = set()
    seen_urls = set()

    for card in cards:
        product = extract_product_from_card(card, base_url=base_url)

        if not product:
            continue

        asin = clean_text(card.get("data-asin"))
        normalized_url = product["url"].split("?")[0].rstrip("/").lower()

        if asin in seen_asins or normalized_url in seen_urls:
            continue

        seen_asins.add(asin)
        seen_urls.add(normalized_url)
        products.append(product)

        if len(products) >= max_results:
            break

    return products


def search_amazon(query: str, max_results: int = 10, *, raise_on_error: bool = True) -> list[dict]:
    """Return product dictionaries (or a confirmed empty list); raise on failure.

    raise_on_error is retained as a compatibility keyword; failures always raise.
    """
    query = (query or "").strip()

    if not query:
        logger.warning("Amazon search skipped: query is empty.")
        return []

    try:
        max_results = max(1, min(int(max_results), 20))
    except (TypeError, ValueError):
        max_results = 10

    search_url = build_amazon_search_url(query)

    diagnostics.begin("Amazon")
    started = monotonic()
    stage = "browser_startup"
    try:
        with browser_session() as driver:
            logger.info("Retailer search started retailer=Amazon")
            stage = "navigation"
            navigation_started = monotonic()
            diagnostics.event("navigation_started", retailer="Amazon", stage="navigation")
            try:
                driver.get(search_url)
            except TimeoutException as error:
                diagnostics.event("navigation_timeout", retailer="Amazon", stage="navigation",
                                  seconds=round(monotonic() - navigation_started, 2),
                                  **diagnostics.error_details(error))
                raise  # Existing outcome handling classifies this as navigation_timeout.
            except Exception as error:
                diagnostics.event("navigation_failed", retailer="Amazon", stage="navigation",
                                  seconds=round(monotonic() - navigation_started, 2),
                                  **diagnostics.error_details(error))
                raise
            diagnostics.event("navigation_finished", retailer="Amazon", stage="navigation",
                              seconds=round(monotonic() - navigation_started, 2))
            diagnostics.page("Amazon", driver, "navigation_finished", PRODUCT_CARD_SELECTOR)

            stage = "results_wait"
            try:
                WebDriverWait(driver, 25).until(
                    lambda current_driver: (
                        current_driver.find_elements(
                            By.CSS_SELECTOR, PRODUCT_CARD_SELECTOR
                        )
                        or current_driver.find_elements(
                            By.CSS_SELECTOR, "h2 a[href]"
                        )
                    )
                )
            except TimeoutException:
                diagnostics.page("Amazon", driver, "results_timeout", PRODUCT_CARD_SELECTOR)
                return empty_result_or_raise("Amazon", driver, "results_timeout")

            stage = "parsing"
            products = parse_amazon_product_cards(
                html=driver.page_source,
                max_results=max_results,
                base_url=driver.current_url or AMAZON_URL,
            )

            diagnostics.page("Amazon", driver, "parsed", PRODUCT_CARD_SELECTOR, products=len(products))
            if not products:
                return empty_result_or_raise("Amazon", driver, "parsing_failure")
            logger.info("Retailer search completed retailer=Amazon products=%d", len(products))
            stage = "browser_cleanup"
            return products

    except RetailerSearchError as error:
        diagnostics.event("retailer_failed", retailer="Amazon", stage=error.stage,
                          seconds=round(monotonic() - started, 2), **diagnostics.error_details(error))
        raise
    except TimeoutException as error:
        diagnostics.event("retailer_failed", retailer="Amazon", stage=stage,
                          seconds=round(monotonic() - started, 2), **diagnostics.error_details(error))
        fail("Amazon", "navigation_timeout" if stage == "navigation" else stage, error)
    except Exception as error:
        diagnostics.event("retailer_failed", retailer="Amazon", stage=stage,
                          seconds=round(monotonic() - started, 2), **diagnostics.error_details(error))
        fail("Amazon", stage, error)
