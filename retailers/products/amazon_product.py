"""Compatibility entry point; implementation lives in amazon/."""
from .amazon.parser import parse_product_page as parse_amazon_product_page

__all__ = ["parse_amazon_product_page"]
