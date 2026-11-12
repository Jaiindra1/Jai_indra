"""Read the selected Flipkart PID and explicitly labelled identity."""
from urllib.parse import parse_qs, urlparse
from ..html_utils import first_text
from ..section_utils import spec_value
from . import selectors as S


def extract_identity(soup, url, metadata, specs):
    title = first_text(soup, S.TITLE) or metadata.get("name") or ""
    # The visible heading may be shortened by Flipkart's nested "more" control.
    # JSON-LD retains the complete name for the same canonical product page.
    metadata_title = metadata.get("name") or ""
    visible_title = title.removesuffix("more").rstrip(" .…")
    if metadata_title and (len(metadata_title) >= len(visible_title) or
                           "..." in title or "…" in title or title.casefold().endswith("more")):
        title = metadata_title
    model_number = (spec_value(specs, r"^model number$") or spec_value(specs, r"^part number$")
                    or metadata.get("model_number") or None)
    return {
        "retailer": "Flipkart", "url": url,
        "name": title,
        "product_id": parse_qs(urlparse(url).query).get("pid", [None])[0] or metadata.get("sku"),
        "brand": spec_value(specs, r"^brand$") or metadata.get("brand") or None,
        "series": spec_value(specs, r"^(?:series|model name)$") or None,
        "model_number": model_number,
        "manufacturer_part_number": spec_value(specs, r"^(?:part number|mpn|manufacturer part number)$")
                                    or model_number,
    }
