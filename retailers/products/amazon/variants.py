"""Read displayed variant labels without clicking or switching the product."""
from ..html_utils import clean_text
from . import selectors as S


def extract_variants(soup):
    variants = []
    for section in soup.select(S.VARIANTS)[:12]:
        label = clean_text(section.select_one(".a-form-label")).rstrip(":")
        selected = clean_text(section.select_one(".selection"))
        options = []
        for node in section.select("li, option")[:40]:
            image = node.select_one("img")
            value = clean_text(node.get("title") or (image.get("alt") if image else None) or node)
            if value and value not in options:
                options.append(value[:200])
        if label:
            variants.append({"label": label, "selected": selected or None, "options": options})
    return {"variants": variants}
