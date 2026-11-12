"""Compatibility entry point; implementation lives in flipkart/."""
from .flipkart.parser import parse_product_page as parse_flipkart_product_page

__all__ = ["parse_flipkart_product_page"]
