"""Deterministic HTML helpers; no browser, network, AI, or database side effects."""
from __future__ import annotations

import json
import re
from collections.abc import Iterator
from urllib.parse import urlparse

from bs4 import BeautifulSoup, Tag

_SPACE = re.compile(r"\s+")
_RUPEES = re.compile(r"(?:₹|Rs\.?\s*|INR\s*)([\d,]+(?:\.\d{1,2})?)", re.I)
_NUMBER = re.compile(r"^\s*[\d,]+(?:\.\d{1,2})?\s*$")


def clean_text(value: object) -> str:
    if isinstance(value, Tag):
        value = value.get_text(" ", strip=True)
    return _SPACE.sub(" ", str(value or "")).strip()


def first_text(soup: BeautifulSoup, selectors: tuple[str, ...]) -> str | None:
    for selector in selectors:
        value = clean_text(soup.select_one(selector))
        if value:
            return value
    return None


def first_image(soup: BeautifulSoup, selectors: tuple[str, ...]) -> str | None:
    for selector in selectors:
        if value := image_url(soup.select_one(selector)):
            return value
    return None


def image_url(element: Tag | None) -> str | None:
    """Read one image URL, preferring lazy and high-resolution attributes."""
    if element is None:
        return None
    for attr in ("data-old-hires", "data-highres-src", "data-highres", "data-a-dynamic-image",
                 "data-src", "data-srcset", "srcset", "src", "content"):
        value = element.get(attr)
        if attr == "data-a-dynamic-image" and isinstance(value, str):
            try:
                images = json.loads(value)
                value = next(iter(images), None) if isinstance(images, dict) else None
            except (TypeError, ValueError):
                value = None
        elif attr in {"data-srcset", "srcset"} and isinstance(value, str):
            # The final srcset entry normally carries the largest rendered asset.
            candidates = [part.strip().split()[0] for part in value.split(",") if part.strip()]
            value = candidates[-1] if candidates else None
        if isinstance(value, str) and value.startswith("https://") and urlparse(value).hostname:
            return value
    return None


def parse_inr(value: object, *, allow_plain: bool = False) -> float | None:
    if value is None or isinstance(value, bool):
        return None
    if isinstance(value, (float, int)):
        result = float(value)
        return result if 0 < result < 100_000_000 else None
    text = clean_text(value)
    match = _RUPEES.search(text)
    if not match and allow_plain and _NUMBER.fullmatch(text):
        match = re.match(r"([\d,]+(?:\.\d{1,2})?)", text)
    if not match:
        return None
    try:
        result = float(match.group(1).replace(",", ""))
    except ValueError:
        return None
    return result if 0 < result < 100_000_000 else None


def product_json_ld(soup: BeautifulSoup) -> Iterator[dict]:
    for script in soup.select('script[type="application/ld+json"]'):
        raw = script.string or script.get_text()
        if not raw or len(raw) > 150_000:
            continue
        try:
            parsed = json.loads(raw)
        except (TypeError, ValueError):
            continue
        roots = parsed if isinstance(parsed, list) else [parsed]
        for root in roots:
            if not isinstance(root, dict):
                continue
            candidates = [root]
            if isinstance(root.get("@graph"), list):
                candidates.extend(node for node in root["@graph"] if isinstance(node, dict))
            for candidate in candidates:
                kinds = candidate.get("@type", [])
                kinds = [kinds] if isinstance(kinds, str) else kinds
                if isinstance(kinds, list) and any(str(kind).lower().endswith("product") for kind in kinds):
                    yield candidate


def key_value_tables(soup: BeautifulSoup, selectors: tuple[str, ...]) -> dict[str, str]:
    found: dict[str, str] = {}
    for selector in selectors:
        for table in soup.select(selector)[:6]:
            for row in table.select("tr")[:120]:
                cells = row.find_all(["th", "td"], recursive=False)
                if len(cells) < 2:
                    continue
                key, value = clean_text(cells[0]).rstrip(":"), clean_text(cells[1])
                if key and value and len(key) <= 100:
                    found.setdefault(key, value[:2000])
            if len(found) >= 100:
                return dict(list(found.items())[:100])
    return found


def add_bullets(soup: BeautifulSoup, selectors: tuple[str, ...], *, limit: int = 30) -> list[str]:
    bullets, seen = [], set()
    for selector in selectors:
        for node in soup.select(selector):
            value = clean_text(node)
            if 8 <= len(value) <= 500 and value.casefold() not in seen:
                bullets.append(value)
                seen.add(value.casefold())
                if len(bullets) >= limit:
                    return bullets
    return bullets


def jsonld_details(node: dict | None) -> dict:
    if not node:
        return {}
    brand, image, offers = node.get("brand"), node.get("image"), node.get("offers")
    if isinstance(brand, dict):
        brand = brand.get("name")
    if isinstance(image, list):
        image = image[0] if image else None
    if isinstance(image, dict):
        image = image.get("url")
    if isinstance(offers, list):
        offers = next((offer for offer in offers if isinstance(offer, dict)), None)
    offers = offers if isinstance(offers, dict) else {}
    aggregate = node.get("aggregateRating")
    aggregate = aggregate if isinstance(aggregate, dict) else {}
    # These helpers have no metadata dependency, so the local import avoids
    # coupling the generic text primitives to section composition at import time.
    from .section_utils import rating_value, count_value
    return {
        "name": clean_text(node.get("name")), "brand": clean_text(brand),
        "model_number": clean_text(node.get("mpn") or node.get("model")),
        "sku": clean_text(node.get("sku")),
        "image_url": image if isinstance(image, str) and image.startswith("https://") else None,
        "price": parse_inr(offers.get("price"), allow_plain=True)
                 if str(offers.get("priceCurrency") or "INR").upper() == "INR" else None,
        "description": clean_text(node.get("description"))[:16000],
        "availability": clean_text(offers.get("availability")),
        "rating": rating_value(aggregate.get("ratingValue")),
        "rating_count": count_value(aggregate.get("ratingCount")),
        "review_count": count_value(aggregate.get("reviewCount")),
    }
