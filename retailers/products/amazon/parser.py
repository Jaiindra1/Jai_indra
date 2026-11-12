"""Compose pure section extractors from one Selenium-rendered HTML document."""
from bs4 import BeautifulSoup
from ..html_utils import jsonld_details, product_json_ld
from .identity import extract_identity
from .pricing import extract_pricing
from .media import extract_media
from .specifications import extract_specifications
from .content import extract_content
from .offers import extract_offers
from .delivery import extract_delivery_details
from .variants import extract_variants


def parse_product_page(html: str, url: str) -> dict:
    """Missing sections return None/empty collections, never invented values."""
    soup = BeautifulSoup(html or "", "html.parser")
    metadata = jsonld_details(next(product_json_ld(soup), None))
    specifications = extract_specifications(soup)
    specs = specifications["specifications"]
    return {
        **extract_identity(soup, url, metadata, specs),
        **extract_pricing(soup, metadata),
        **extract_media(soup, metadata),
        **specifications,
        **extract_content(soup, metadata),
        **extract_offers(soup),
        **extract_delivery_details(soup, specs),
        **extract_variants(soup),
        "json_ld": metadata or None,
        "source": "product_detail",
    }
