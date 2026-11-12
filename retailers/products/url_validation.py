"""Validate and canonicalize supported retailer product URLs."""
import re
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse
from .errors import ProductDetailError

_AMAZON_PRODUCT = re.compile(r"/(?:dp|gp/product)/([A-Z0-9]{10})(?:/|$)", re.I)
_FLIPKART_PRODUCT = re.compile(r"^/.+/p/itm[a-z0-9]+(?:/|$)", re.I)


def validate_detail_url(url: str, retailer: str) -> str:
    if not isinstance(url, str) or len(url) > 2500 or retailer not in ("Amazon", "Flipkart"):
        raise ProductDetailError("invalid_url", "Invalid retailer product URL")
    parts = urlparse(url)
    try:
        port = parts.port
    except ValueError as error:
        raise ProductDetailError("invalid_url", "Invalid retailer URL port") from error
    if parts.scheme != "https" or parts.username or parts.password or port not in (None, 443):
        raise ProductDetailError("invalid_url", "Only secure retailer product URLs are accepted")
    allowed = {"Amazon": {"amazon.in", "www.amazon.in"},
               "Flipkart": {"flipkart.com", "www.flipkart.com"}}[retailer]
    if (parts.hostname or "").lower() not in allowed:
        raise ProductDetailError("invalid_url", "Product URL is outside the chosen retailer")
    if retailer == "Amazon":
        match = _AMAZON_PRODUCT.search(parts.path)
        if not match:
            raise ProductDetailError("invalid_url", "Amazon product URL must contain an ASIN")
        return f"https://www.amazon.in/dp/{match.group(1).upper()}"
    if not _FLIPKART_PRODUCT.match(parts.path):
        raise ProductDetailError("invalid_url", "Flipkart product URL is not a product detail page")
    pid = parse_qs(parts.query).get("pid", [None])[0]
    query = urlencode({"pid": pid}) if pid and re.fullmatch(r"[a-z0-9]{8,32}", pid, re.I) else ""
    return urlunparse(("https", "www.flipkart.com", parts.path, "", query, ""))
