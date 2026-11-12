"""Keep ratings and written-review counts distinct."""
import re
from ..html_utils import add_bullets, first_text
from ..section_utils import texts, rating_value
from . import selectors as S


def extract_content(soup, metadata):
    description = "\n\n".join(texts(soup, S.DESCRIPTION, limit=12, max_length=4000))
    counts = first_text(soup, S.RATING_COUNT) or ""
    ratings = re.search(r"([\d,]+)\s+Ratings?", counts, re.I)
    reviews = re.search(r"([\d,]+)\s+Reviews?", counts, re.I)
    rating = rating_value(first_text(soup, S.RATING))
    return {
        "highlights": add_bullets(soup, S.HIGHLIGHTS),
        "description": description[:16000] or metadata.get("description") or None,
        "rating": rating if rating is not None else metadata.get("rating"),
        "rating_count": int(ratings.group(1).replace(",", "")) if ratings else metadata.get("rating_count"),
        "review_count": int(reviews.group(1).replace(",", "")) if reviews else metadata.get("review_count"),
    }
