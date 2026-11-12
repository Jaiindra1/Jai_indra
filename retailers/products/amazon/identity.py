"""Read the selected ASIN, title and explicitly labelled brand/model."""
import re
from ..html_utils import first_text
from ..section_utils import spec_value
from . import selectors as S


def extract_identity(soup, url, metadata, specs):
    asin = re.search(r"/(?:dp|gp/product)/([A-Z0-9]{10})(?:/|$|\?)", url, re.I)
    brand = spec_value(specs, r"^brand$") or metadata.get("brand")
    if not brand:
        byline = first_text(soup, S.BRAND) or ""
        # Store labels are usable only when Amazon explicitly labels the brand.
        match = re.fullmatch(r"(?:Visit the (.+) Store|Brand:\s*(.+))", byline, re.I)
        brand = next((part for part in match.groups() if part), None) if match else None
    return {
        "retailer": "Amazon", "url": url,
        "name": first_text(soup, S.TITLE) or metadata.get("name") or "",
        "product_id": asin.group(1).upper() if asin else metadata.get("sku"),
        "brand": brand or None,
        "model_number": spec_value(specs, r"(?:model|part)\s*(?:number|name)|item\s*model")
                        or metadata.get("model_number") or None,
    }
