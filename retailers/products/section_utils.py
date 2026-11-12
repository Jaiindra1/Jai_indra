"""Small, bounded extraction primitives shared by retailer section modules.

Selectors belong to each retailer. These helpers never navigate or infer missing
values; every returned string comes from the supplied product document.
"""
import re
from .html_utils import clean_text, image_url, first_text, parse_inr


def priced_value(soup, selectors):
    """Return the first readable INR amount and its selector provenance."""
    for selector in selectors:
        value = parse_inr(first_text(soup, (selector,)))
        if value is not None:
            return value, f"html:{selector}"
    return None, None


def texts(soup, selectors, *, limit=30, max_length=2000):
    """Collect unique section text in document/selector order."""
    found = []
    for selector in selectors:
        for node in soup.select(selector):
            value = clean_text(node)[:max_length]
            if value and value not in found:
                found.append(value)
            if len(found) >= limit:
                return found
    return found


def gallery(soup, selectors, primary=None):
    images = [primary] if primary else []
    for selector in selectors:
        for node in soup.select(selector):
            # Reuse image attribute validation without fetching remote resources.
            image = image_url(node)
            if image and image not in images:
                images.append(image)
            if len(images) >= 20:
                return images
    return images


def rating_value(value):
    match = re.search(r"\b([0-5](?:\.\d+)?)\b", clean_text(value))
    number = float(match.group(1)) if match else None
    return number if number is not None and 0 <= number <= 5 else None


def count_value(value):
    match = re.search(r"\b([\d,]+)\b", clean_text(value))
    return int(match.group(1).replace(",", "")) if match else None


def spec_value(specs, pattern):
    return next((value for key, value in specs.items() if re.search(pattern, key, re.I)), None)


def purchase_details(soup, selectors, specs):
    """Keep location-dependent delivery text as text, without promising a date."""
    values = {field: first_text(soup, candidates) for field, candidates in selectors.items()}
    values["warranty"] = values.get("warranty") or spec_value(specs, r"warranty")
    values["return_policy"] = values.get("return_policy") or spec_value(specs, r"return policy")
    return values
