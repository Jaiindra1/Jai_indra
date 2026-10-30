
"""Strict product-family filtering for Amazon and Flipkart results."""

import re


# Terms that indicate an accessory rather than the requested main product.
ACCESSORY_TERMS = {
    "case",
    "cover",
    "sleeve",
    "skin",
    "screen protector",
    "tempered glass",
    "charger",
    "charging cable",
    "adapter",
    "replacement battery",
    "keyboard cover",
    "laptop stand",
    "dock",
    "docking station",
    "bag",
    "backpack",
}

# Common laptop families and their distinguishing title terms.
LAPTOP_FAMILIES = {
    "macbook air": ("macbook", "air"),
    "macbook pro": ("macbook", "pro"),
    "thinkpad": ("thinkpad",),
    "ideapad": ("ideapad",),
    "inspiron": ("inspiron",),
    "pavilion": ("pavilion",),
    "vivobook": ("vivobook",),
    "zenbook": ("zenbook",),
    "swift": ("swift",),
    "aspire": ("aspire",),
}


def normalize_text(value: str) -> str:
    """Normalize text for consistent title comparisons."""
    value = (value or "").lower()
    value = value.replace("-", " ")
    value = value.replace("/", " ")
    return re.sub(r"\s+", " ", value).strip()


def contains_phrase(text: str, phrase: str) -> bool:
    """Match a phrase without matching it inside unrelated words."""
    text = normalize_text(text)
    phrase = normalize_text(phrase)

    pattern = rf"(?<![a-z0-9]){re.escape(phrase)}(?![a-z0-9])"
    return re.search(pattern, text) is not None


def is_accessory(product_name: str) -> bool:
    """Identify obvious accessory listings."""
    title = normalize_text(product_name)

    return any(
        contains_phrase(title, term)
        for term in ACCESSORY_TERMS
    )


def matches_product_family(query: str, product_name: str) -> bool:
    """
    Return True only when the title matches the requested family.

    Unknown families use a conservative fallback: all meaningful query
    terms must occur in the product title.
    """
    query = normalize_text(query)
    title = normalize_text(product_name)

    if not query or not title:
        return False

    # Never include obvious accessories in main-product results.
    if is_accessory(title):
        return False

    # Recognize known laptop families, including their variants.
    for family, required_terms in LAPTOP_FAMILIES.items():
        if contains_phrase(query, family):
            return all(
                contains_phrase(title, term)
                for term in required_terms
            )

    # Conservative fallback for other product families.
    query_terms = query.split()

    # Ignore very generic search words in the fallback.
    generic_terms = {"best", "new", "latest", "buy", "online"}
    meaningful_terms = [
        term for term in query_terms
        if term not in generic_terms
    ]

    return bool(meaningful_terms) and all(
        contains_phrase(title, term)
        for term in meaningful_terms
    )


def filter_products(
    query: str,
    products: list[dict],
) -> list[dict]:
    """Keep only listings matching the requested product family."""
    filtered = []
    seen_urls = set()

    for product in products:
        name = product.get("name", "")

        if not matches_product_family(query, name):
            continue

        url = (product.get("url") or "").split("?")[0].rstrip("/").lower()

        if url and url in seen_urls:
            continue

        if url:
            seen_urls.add(url)

        filtered.append(product)

    return filtered
