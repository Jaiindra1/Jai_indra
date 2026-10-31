"""Marketplace pagination adapters; parsers stay in amazon.py and flipkart.py."""
from urllib.parse import urlencode

from retailers import amazon, flipkart
from retailers.navigation import RetailerPage, next_page_number, scrape_search_page


def page_url(retailer, query, page):
    if retailer not in {"Amazon", "Flipkart"} or type(page) is not int or not 1 <= page <= 8:
        raise ValueError("Invalid retailer page.")
    if retailer == "Amazon":
        return amazon.build_amazon_search_url(query, page=page)
    return "https://www.flipkart.com/search?" + urlencode({"q": query, "page": page})


def scrape_page(driver, retailer, query, page, deadline):
    if retailer == "Amazon":
        return amazon.search_amazon_page(driver, query, page=page, deadline=deadline)
    if retailer != "Flipkart":
        raise ValueError("Invalid retailer.")
    return scrape_search_page(driver, retailer, page_url(retailer, query, page), page, deadline,
                              flipkart.PRODUCT_CARD_SELECTOR + ', a[href*="/p/"]',
                              flipkart.parse_product_cards)
