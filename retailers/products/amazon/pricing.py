"""Read the main purchase price; MRP and bank offers stay separate."""
from ..html_utils import first_text
from ..section_utils import priced_value
from . import selectors as S


def extract_pricing(soup, metadata):
    price, source = priced_value(soup, S.PRICE)
    if price is None:
        price = metadata.get("price")
        source = "jsonld:offers.price" if price is not None else None
    original, _ = priced_value(soup, S.ORIGINAL_PRICE)
    return {"price": price, "price_source": source, "original_price": original,
            "availability": first_text(soup, S.AVAILABILITY) or metadata.get("availability") or None}
