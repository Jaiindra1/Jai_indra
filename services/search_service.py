import logging

from models.product import Product
from retailers.flipkart import search_flipkart
from retailers.amazon import search_amazon
from retailers.outcomes import AllRetailersFailed, RetailerSearchError
from services.specification_extractor import extract_highlights
from services.product_repository import product_identity
from services.price_tracking_service import track_search

logger = logging.getLogger(__name__)


class SearchResults(list):
    """Preserve the list interface while attaching persistence diagnostics."""
    def __init__(self, products, persistence):
        super().__init__(products)
        self.persistence = persistence


def detect_category(query: str, product_name: str) -> str:
    """Guess a broad category using the search query and product title."""

    # Use both values so category detection still works for vague titles.
    text = f"{query} {product_name}".lower()

    # Check more specific categories before general ones.
    category_keywords = {
        "Footwear": [
            "shoe", "shoes", "sneaker", "sneakers", "sandals",
            "slippers", "boots", "heels", "footwear",
        ],
        "Clothing": [
            "shirt", "t-shirt", "tshirt", "jeans", "trousers",
            "dress", "jacket", "kurta", "saree", "clothing",
            "hoodie", "sweater",
        ],
        "Furniture": [
            "sofa", "couch", "chair", "table", "bed", "wardrobe",
            "bookshelf", "mattress", "furniture",
        ],
        "Toys": [
            "toy", "toys", "teddy", "doll", "puzzle", "lego",
            "stuffed animal", "soft toy", "action figure",
        ],
        "Electronics": [
            "phone", "smartphone", "mobile", "laptop", "computer",
            "tablet", "headphone", "earphone", "camera", "television",
            "tv", "monitor", "samsung galaxy", "processor",
            "electronics",
        ],
        "Home & Kitchen": [
            "mixer", "grinder", "cookware", "pressure cooker",
            "vacuum cleaner", "bedsheet", "curtain", "lamp",
            "kitchen", "home decor",
        ],
        "Beauty & Personal Care": [
            "shampoo", "perfume", "moisturizer", "lipstick",
            "face wash", "skin care", "makeup",
        ],
        "Books": [
            "book", "books", "novel", "textbook",
        ],
        "Sports & Fitness": [
            "football", "cricket bat", "yoga mat", "dumbbell",
            "treadmill", "fitness",
        ],
    }

    # Return the first category with a matching keyword.
    for category, keywords in category_keywords.items():
        if any(keyword in text for keyword in keywords):
            return category

    # Keep unknown products instead of inventing a category.
    return "Other"



def search_products(query: str, max_results: int = 20) -> list[dict]:

    """Search Flipkart and Amazon and combine their product results."""

    query = query.strip()

    if not query:
        raise ValueError("Please enter a product name to search.")

    max_results = max(1, min(max_results, 20))

    # Store results from each retailer separately.
    retailer_results = {}
    retailer_errors = []

    # Search each retailer independently so one failure does not
    # prevent products from the other retailer from being displayed.
    for retailer_name, search_function in [
        ("Flipkart", search_flipkart),
        ("Amazon", search_amazon),
    ]:
        try:
            retailer_results[retailer_name] = search_function(
                query=query,
                max_results=max_results,
                raise_on_error=True,
            )
        except Exception as error:
            stage = error.stage if isinstance(error, RetailerSearchError) else "unexpected_failure"
            logger.error("Retailer unavailable retailer=%s stage=%s error_type=%s",
                         retailer_name, stage, type(error).__name__)
            retailer_results[retailer_name] = []
            retailer_errors.append(retailer_name)

    # Report an error only if both retailer searches raised exceptions.
    if len(retailer_errors) == 2:
        track_search(query, [], retailer_errors)
        raise AllRetailersFailed(
            "Both Flipkart and Amazon searches failed. "
            "Check the application logs for details."
        )

    products = []
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
                try:
                    normalized_url = product_identity({
                        "retailer": item.get("retailer") or retailer_name, "url": product_url,
                    })[0]
                except ValueError:
                    normalized_url = (retailer_name, product_url)

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

            products.append(product.to_dict())

    return SearchResults(products, track_search(query, products, retailer_errors))
