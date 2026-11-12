"""Evidence-preserving selected product-detail extraction."""
from .amazon_product import parse_amazon_product_page
from .flipkart_product import parse_flipkart_product_page
from .product_details import ProductDetailError, get_product_details, validate_detail_url
from .product_normalizer import normalize_product_details

__all__ = [
    "parse_amazon_product_page", "parse_flipkart_product_page",
    "get_product_details", "validate_detail_url", "ProductDetailError",
    "normalize_product_details",
]
