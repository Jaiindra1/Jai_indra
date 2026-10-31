"""Signed listing snapshots for database-free product detail pages."""
from datetime import datetime, timedelta, timezone
from time import time

from itsdangerous import BadData, SignatureExpired, URLSafeTimedSerializer

from services.product_normalizer import normalize_price
from services.search_pagination import signing_key, listing_identity

MAX_TOKEN = 7000
MAX_AGE = 24 * 60 * 60


class InvalidProductLink(ValueError):
    pass


class ExpiredProductLink(InvalidProductLink):
    pass


def _serializer():
    return URLSafeTimedSerializer(signing_key(), salt="sandhya-product-detail-v1")


def _snapshot(product):
    retailer = product.get("retailer")
    if retailer not in {"Amazon", "Flipkart"}:
        raise InvalidProductLink("Unsupported retailer.")
    identity = listing_identity(product, retailer)
    name = product.get("name")
    if not identity or not isinstance(name, str) or not name.strip():
        raise InvalidProductLink("Product details are unavailable.")
    from urllib.parse import urlsplit
    image = product.get("image_url")
    if not isinstance(image, str) or len(image) > 1600 or urlsplit(image).scheme not in {"http", "https"}:
        image = None
    highlights = product.get("highlights") or []
    specs = product.get("specifications") or {}
    return {"id": identity[0], "name": name.strip()[:500], "retailer": retailer,
            "url": identity[1], "price": normalize_price(product.get("price")),
            "original_price": normalize_price(product.get("original_price")),
            "image_url": image, "rating": _rating(product.get("rating")),
            "category": str(product.get("category") or "Product")[:80],
            "availability": str(product.get("availability") or "Confirm with retailer")[:120],
            "highlights": [text[:180] for text in highlights[:8] if isinstance(text, str)] if isinstance(highlights, list) else [],
            "specifications": {str(key)[:80]: str(value)[:250] for key, value in list(specs.items())[:12]} if isinstance(specs, dict) else {}}


def _rating(value):
    try:
        number = float(value)
        return number if 0 <= number <= 5 else None
    except (ValueError, TypeError):
        return None


def product_path(product):
    captured = product.get("captured_at")
    if type(captured) is not int or captured <= 0:
        captured = int(time())
    token = _serializer().dumps({"v": 1, "product": _snapshot(product), "captured": captured})
    if len(token) > MAX_TOKEN:
        raise InvalidProductLink("Product details exceed the supported size.")
    return "/product/" + token


def load_product(token):
    if not isinstance(token, str) or not token or len(token) > MAX_TOKEN:
        raise InvalidProductLink("This product link is invalid.")
    try:
        data = _serializer().loads(token, max_age=MAX_AGE)
        if not isinstance(data, dict) or data.get("v") != 1 or type(data.get("captured")) is not int:
            raise ValueError("Invalid product data.")
        product = _snapshot(data["product"])
        product["captured_label"] = datetime.fromtimestamp(data["captured"], timezone(timedelta(hours=5, minutes=30))).strftime("%d %b %Y, %I:%M %p IST")
        original, current = product["original_price"], product["price"]
        product["saving"] = round(original - current, 2) if original and current and original > current else None
        product["discount"] = round(product["saving"] / original * 100) if product["saving"] else None
        if original and current and original <= current:
            product["original_price"] = None
        return product
    except SignatureExpired:
        raise ExpiredProductLink("This product link has expired. Choose the product again from search.") from None
    except (BadData, ValueError, TypeError, KeyError, AttributeError, OverflowError, OSError):
        raise InvalidProductLink("This product link is invalid or no longer available. Choose the product again from search.") from None


def inr(value):
    if value is None:
        return "Not provided"
    whole, decimal = f"{value:.2f}".split(".")
    tail, head = whole[-3:], whole[:-3]
    groups = []
    while head:
        groups.insert(0, head[-2:])
        head = head[:-2]
    number = ",".join(groups + [tail])
    return "\u20b9" + number + ("." + decimal if decimal != "00" else "")
