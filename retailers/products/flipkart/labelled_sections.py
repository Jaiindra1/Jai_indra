"""Semantic fallbacks for Flipkart's card layout with changing utility classes.

Use exact labels and their immediate sibling/container, never whole-page text.
These helpers do not search arbitrary ancestors that could mix recommendations.
"""
import re
from ..html_utils import clean_text


def labelled_value(soup, label):
    for text in soup.find_all(string=lambda value: value and clean_text(value) == label):
        sibling = text.parent.find_next_sibling()
        value = clean_text(sibling)
        if value:
            return value[:2000]
    return None


def labelled_rows(soup, label):
    rows = []
    for text in soup.find_all(string=lambda value: value and clean_text(value) == label):
        value = clean_text(text.parent.parent)
        if value != label and value.startswith(label) and len(value) <= 1500 and value not in rows:
            rows.append(value)
    return rows[:20]


def matching_text(soup, pattern):
    expression = re.compile(pattern, re.I)
    for text in soup.find_all(string=True):
        if text.parent.name in ('script', 'style'):
            continue
        value = clean_text(text)
        if expression.search(value):
            return value[:1000]
        # Retailer policy labels can contain line-break tags between words.
        parent_value = clean_text(text.parent)
        if len(parent_value) <= 1000 and expression.search(parent_value):
            return parent_value
    return None
