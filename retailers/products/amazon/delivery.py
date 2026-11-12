"""Extract seller, displayed delivery, warranty and return-policy text."""
from ..section_utils import purchase_details
from . import selectors as S


def extract_delivery_details(soup, specs):
    return purchase_details(soup, S.PURCHASE, specs)
