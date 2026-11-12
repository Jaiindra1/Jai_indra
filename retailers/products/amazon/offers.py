"""Collect offer terms as text; conditional offers never replace the price."""
from ..section_utils import texts
from . import selectors as S


def extract_offers(soup):
    return {"offers": texts(soup, S.OFFERS, limit=20)}
