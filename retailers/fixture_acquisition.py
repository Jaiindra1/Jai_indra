"""Offline retailer acquisition that feeds saved HTML through production parsers."""
import re
from pathlib import Path
from time import time
from urllib.parse import parse_qs, urlparse

from retailers import amazon, flipkart
from retailers.navigation import RetailerPage
from retailers.products.amazon_product import parse_amazon_product_page
from retailers.products.flipkart_product import parse_flipkart_product_page
from retailers.products.product_normalizer import normalize_product_details
from retailers.products.errors import ProductDetailError

ROOT = Path(__file__).resolve().parents[1] / "fixtures" / "retailers"


def _read(retailer, name):
    path = ROOT / retailer.casefold() / name
    try:
        return path.read_text(encoding="utf-8")
    except OSError as error:
        raise ProductDetailError("fixture_missing", f"Fixture HTML is unavailable: {path.name}") from error


def fixture_search_page(retailer, query, page):
    if page != 1:
        return RetailerPage([], False, None)
    html = _read(retailer, "search.html")
    parser = amazon.parse_amazon_product_cards if retailer == "Amazon" else flipkart.parse_product_cards
    products = parser(html, max_results=40)
    terms = {term for term in re.findall(r"[a-z0-9]+", str(query).casefold()) if len(term) > 1}
    ranked = sorted(products, key=lambda item: sum(term in item.get("name", "").casefold() for term in terms), reverse=True)
    return RetailerPage(ranked, False, None)


def _fixture_name(retailer, url):
    parsed = urlparse(url)
    if retailer == "Amazon":
        match = re.search(r"/(?:dp|gp/product)/([A-Z0-9]{10})(?:/|$|\?)", parsed.path, re.I)
        identity = match.group(1).upper() if match else ""
    else:
        identity = parse_qs(parsed.query).get("pid", [""])[0].upper()
    mapping = {
        "B0M6MINI01": "mac-mini-m6.html", "B0M5MINI01": "mac-mini-m5.html",
        "B0IPHONE17": "iphone.html", "B0MINIKPAD": "accessory.html",
        "MACMINIM601": "mac-mini-m6.html", "MACMINIM501": "mac-mini-m5.html",
        "IPHONE17001": "iphone.html", "MINIKEYPAD1": "accessory.html",
    }
    if identity not in mapping:
        raise ProductDetailError("fixture_missing", "No product-detail fixture exists for this listing.")
    return mapping[identity]


def fixture_product_details(url, retailer):
    html = _read(retailer, _fixture_name(retailer, url))
    parser = parse_amazon_product_page if retailer == "Amazon" else parse_flipkart_product_page
    raw = parser(html, url)
    if not raw.get("name") or not raw.get("product_id"):
        raise ProductDetailError("incomplete_page", "Fixture product identity could not be extracted.")
    product = normalize_product_details(raw)
    product.update(checked_at=int(time()), cache_hit=False, data_source="fixture", is_live=False)
    return product
