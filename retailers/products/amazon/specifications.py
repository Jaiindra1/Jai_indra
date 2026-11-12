"""Extract Amazon technical tables and labelled detail bullets."""
from ..html_utils import clean_text, key_value_tables
from . import selectors as S


def extract_specifications(soup):
    specs = key_value_tables(soup, S.TABLES)
    for item in soup.select(S.DETAIL_BULLETS)[:100]:
        label = item.select_one("span.a-text-bold")
        if label is None:
            continue
        key = clean_text(label).rstrip(":").strip()
        value = clean_text(item).removeprefix(clean_text(label)).strip(" :")
        if key and value and len(key) <= 100:
            specs.setdefault(key, value[:2000])
    return {"specifications": specs}
