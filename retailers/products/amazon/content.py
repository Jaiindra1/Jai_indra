"""Read highlights, product description and aggregate customer ratings."""
from ..html_utils import add_bullets, first_text
from ..section_utils import texts, rating_value, count_value
from . import selectors as S


def extract_content(soup, metadata):
    description = "\n\n".join(texts(soup, S.DESCRIPTION, limit=12, max_length=4000))
    rating = rating_value(first_text(soup, S.RATING))
    count = count_value(first_text(soup, S.RATING_COUNT))
    return {
        "highlights": add_bullets(soup, S.HIGHLIGHTS),
        "description": description[:16000] or metadata.get("description") or None,
        "rating": rating if rating is not None else metadata.get("rating"),
        "rating_count": count if count is not None else metadata.get("rating_count"),
        "review_count": metadata.get("review_count"),
    }
