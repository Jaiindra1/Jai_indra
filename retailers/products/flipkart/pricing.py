"""Prefer the main price block; accept an unscoped legacy price only if unique."""
from ..html_utils import first_text, parse_inr
from ..section_utils import priced_value
from . import selectors as S


def _availability(value):
    """Turn JSON-LD vocabulary URLs into labels suitable for the product UI."""
    if not value:
        return None
    label = str(value).rstrip("/").rsplit("/", 1)[-1]
    known = {
        "InStock": "In stock",
        "OutOfStock": "Out of stock",
        "PreOrder": "Available for pre-order",
        "PreSale": "Available for pre-sale",
        "LimitedAvailability": "Limited availability",
        "OnlineOnly": "Available online",
        "SoldOut": "Sold out",
        "Discontinued": "Discontinued",
    }
    return known.get(label, value)


def extract_pricing(soup, metadata):
    price, source = priced_value(soup, S.PRICE)
    if price is None:
        # Minimal/older layouts omit the purchase container. Multiple prices
        # are ambiguous (often recommendations), so leave those to metadata.
        unique = tuple(s for s in ("div.Nx9bqj", "div._30jeq3") if len(soup.select(s)) == 1)
        price, source = priced_value(soup, unique)
    if price is None:
        price = metadata.get("price")
        source = "jsonld:offers.price" if price is not None else None
    original, _ = priced_value(soup, S.ORIGINAL_PRICE)
    if original is None:
        # The card layout omits the currency symbol on its crossed-out MRP.
        original = parse_inr(first_text(soup, S.CARD_ORIGINAL_PRICE), allow_plain=True)
    return {"price": price, "price_source": source, "original_price": original,
            "availability": _availability(first_text(soup, S.AVAILABILITY) or metadata.get("availability"))}
