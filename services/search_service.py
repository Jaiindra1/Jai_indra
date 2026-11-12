import logging
import re
from time import monotonic
from core import search_diagnostics as diagnostics

from models.product import Product
from retailers.flipkart import search_flipkart
from retailers.amazon import search_amazon
from retailers.outcomes import AllRetailersFailed, RetailerSearchError
from services.specification_extractor import extract_highlights
from urllib.parse import urlsplit, urlunsplit
from services.retailer_mode import retailer_mode, source_fields


logger = logging.getLogger(__name__)

CATEGORY_PHRASES = {
    "Electronics": ("smart phone", "smartphone", "mobile phone", "macbook", "laptop", "notebook computer",
                    "computer", "tablet", "headphones", "headphone", "earphones", "earphone", "camera",
                    "television", "smart tv", "monitor", "processor", "speaker", "router", "electronics"),
    "Home & Kitchen": ("pressure cooker", "vacuum cleaner", "home decor", "mixer grinder", "air fryer",
                       "cookware", "bedsheet", "curtain", "kitchen appliance", "lamp"),
    "Beauty & Personal Care": ("face wash", "skin care", "personal care", "shampoo", "perfume",
                               "moisturizer", "lipstick", "makeup"),
    "Sports & Fitness": ("cricket bat", "yoga mat", "foot ball", "football", "dumbbell", "treadmill", "fitness"),
    "Footwear": ("running shoe", "running shoes", "shoe", "shoes", "sneaker", "sneakers", "sandal",
                 "sandals", "slipper", "slippers", "boot", "boots", "heel", "heels", "footwear"),
    "Clothing": ("t shirt", "shirt", "jeans", "trousers", "dress", "jacket", "kurta", "saree",
                 "hoodie", "sweater", "clothing"),
    "Furniture": ("book shelf", "bookshelf", "sofa", "couch", "chair", "dining table", "table", "bed",
                  "wardrobe", "mattress", "furniture"),
    "Toys": ("stuffed animal", "soft toy", "action figure", "teddy", "doll", "puzzle", "lego", "toy", "toys"),
    "Books": ("text book", "textbook", "novel", "book", "books"),
}


def _category_evidence(value):
    normalized = " " + re.sub(r"[^a-z0-9]+", " ", str(value or "").lower()).strip() + " "
    evidence = {}
    for category, phrases in CATEGORY_PHRASES.items():
        matches = [phrase for phrase in phrases if f" {phrase} " in normalized]
        if matches:
            # Longer phrases are stronger than isolated generic words.
            evidence[category] = max(len(phrase.split()) * 10 + len(phrase) for phrase in matches)
    return evidence


class SearchResults(list):
    """Preserve the list interface while attaching persistence diagnostics."""
    def __init__(self, products, persistence):
        super().__init__(products)
        self.persistence = persistence


def detect_category(query: str, product_name: str) -> str:
    """Classify with title-first, whole-word evidence and conservative ties."""
    for evidence in (_category_evidence(product_name), _category_evidence(query)):
        if not evidence:
            continue
        strongest = max(evidence.values())
        winners = [category for category, score in evidence.items() if score == strongest]
        runner_up = max((score for score in evidence.values() if score < strongest), default=0)
        if len(winners) == 1 and (len(evidence) == 1 or strongest - runner_up >= 10):
            return winners[0]
        return "Other"
    return "Other"



def search_products(query: str, max_results: int = 20) -> list[dict]:

    """Search Flipkart and Amazon and combine their product results."""

    query = query.strip()

    if not query:
        raise ValueError("Please enter a product name to search.")

    max_results = max(1, min(max_results, 20))
    mode = retailer_mode()

    # Store results from each retailer separately.
    retailer_results = {}
    retailer_errors = []

    # Search each retailer independently so one failure does not
    # prevent products from the other retailer from being displayed.
    for retailer_name, search_function in [
        ("Flipkart", search_flipkart),
        ("Amazon", search_amazon),
    ]:
        retailer_started = monotonic()
        diagnostics.event("retailer_dispatch", retailer=retailer_name, stage="browser_startup")
        try:
            if mode == "fixture":
                from retailers.fixture_acquisition import fixture_search_page
                retailer_results[retailer_name] = fixture_search_page(retailer_name, query, 1).items[:max_results]
            else:
                retailer_results[retailer_name] = search_function(
                    query=query,
                    max_results=max_results,
                    raise_on_error=True,
                )
            diagnostics.event("retailer_completed", retailer=retailer_name,
                              products=len(retailer_results[retailer_name]),
                              seconds=round(monotonic() - retailer_started, 3))
        except Exception as error:
            stage = error.stage if isinstance(error, RetailerSearchError) else "unexpected_failure"
            logger.error("Retailer unavailable retailer=%s stage=%s error_type=%s",
                         retailer_name, stage, type(error).__name__)
            retailer_results[retailer_name] = []
            retailer_errors.append(retailer_name)
            diagnostics.event("retailer_unavailable", retailer=retailer_name, stage=stage,
                              seconds=round(monotonic() - retailer_started, 3),
                              **diagnostics.error_details(error))

    # Report an error only if both retailer searches raised exceptions.
    if len(retailer_errors) == 2:
        raise AllRetailersFailed(
            "Both Flipkart and Amazon searches failed. "
            "Check the application logs for details."
        )

    products = []
    diagnostics.event("processing_started", stage="normalization",
                      input_products=sum(len(items) for items in retailer_results.values()))
    seen_urls = set()

    # Process both retailers using the same Product model.
    for retailer_name in ("Flipkart", "Amazon"):
        for item in retailer_results[retailer_name]:
            name = item.get("name")

            # Ignore malformed results without a product name.
            if not name:
                continue

            # Avoid showing the same URL more than once.
            product_url = item.get("url")
            if product_url:
                # URL-only deduplication: no database identity or persistence.
                parsed = urlsplit(product_url)
                normalized_url = (retailer_name.lower(), urlunsplit((
                    parsed.scheme.lower(), parsed.netloc.lower(), parsed.path.rstrip("/"), "", ""
                )))

                if normalized_url in seen_urls:
                    continue

                seen_urls.add(normalized_url)

            raw_specifications = item.get("specifications")

            if isinstance(raw_specifications, dict):
                specifications = raw_specifications
            elif raw_specifications:
                specifications = {"raw_details": raw_specifications}
            else:
                specifications = {}

            category = detect_category(query, name)

            product = Product(
                name=name,
                price=item.get("price"),
                original_price=item.get("original_price"),
                rating=item.get("rating"),
                url=product_url,
                image_url=item.get("image_url"),
                retailer=item.get("retailer") or retailer_name,
                category=category,
                specifications=specifications,
                highlights=extract_highlights(name, item.get("description"), specifications),
                availability=item.get("availability"),
            )

            products.append({**product.to_dict(), **source_fields(mode)})

    diagnostics.event("processing_finished", stage="normalization", products=len(products))
    return SearchResults(products, {"enabled": False, "mode": mode})
