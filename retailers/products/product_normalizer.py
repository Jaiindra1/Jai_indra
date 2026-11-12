"""Normalize only attributes supported by literal product-page evidence."""
from __future__ import annotations

import re
from typing import Any
from .html_utils import clean_text

_SIZE = re.compile(r"\b(\d+(?:\.\d+)?)\s*(GB|TB)\b", re.I)
_RAM = re.compile(r"\b(\d+(?:\.\d+)?)\s*(GB|TB)\s*(?:unified\s+memory|RAM|system\s+memory|DDR\d?|LPDDR\d?)\b", re.I)
_STORAGE = re.compile(r"\b(\d+(?:\.\d+)?)\s*(GB|TB)\s*(?:SSD|HDD|eMMC|internal\s+storage|storage|ROM)\b", re.I)
_PAIR = re.compile(r"\b(\d+(?:\.\d+)?)\s*(GB|TB)\s*/\s*(\d+(?:\.\d+)?)\s*(GB|TB)\b", re.I)
_SKU = re.compile(r"\b[A-Z0-9]{5,}/[A-Z0-9]{1,4}\b", re.I)
_PROCESSOR = re.compile(
    r"\b(?:Apple\s+)?M\d{1,2}(?:\s*(?:Pro|Max|Ultra))?\s*(?:chip|processor)?\b"
    r"|\b(?:Intel\s+)?(?:Core\s+Ultra|Core\s+i[3579]|Xeon)\s*[A-Z0-9-]+\b"
    r"|\b(?:AMD\s+)?Ryzen\s*[3579](?:\s*\d{3,5}[A-Z]*)?\b"
    r"|\b(?:Qualcomm\s+)?Snapdragon\s*[A-Za-z0-9+\s-]{1,24}\b", re.I)
_DISPLAY = re.compile(r"\b\d+(?:\.\d+)?\s*(?:inch|inches|″)\b", re.I)


def _size(value: str) -> tuple[str, float] | None:
    match = _SIZE.search(str(value))
    if not match or float(match.group(1)) <= 0:
        return None
    amount, unit = float(match.group(1)), match.group(2).upper()
    return f"{amount:g}{unit}", amount * (1024 if unit == "TB" else 1)


def normalize_product_details(raw: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(raw, dict):
        raise TypeError("Product details must be a dictionary")
    title = clean_text(raw.get("name"))
    specs = raw.get("specifications") if isinstance(raw.get("specifications"), dict) else {}
    highlights = [clean_text(item) for item in (raw.get("highlights") or []) if clean_text(item)][:30]
    attributes: dict[str, str] = {}
    evidence: dict[str, dict[str, str]] = {}

    def add(field, value, source, quote):
        value, quote = clean_text(value), clean_text(quote)
        if value and quote and field not in attributes:
            attributes[field] = value
            evidence[field] = {"source": source, "quote": quote}

    for key, value in list(specs.items())[:100]:
        key, value = clean_text(key), clean_text(value)
        low = key.casefold()
        if not key or not value:
            continue
        # GPU/video memory must never become system RAM.
        if re.search(r"graphic|\bgpu\b|video", low):
            if "model" in low:
                add("gpu", value, f"specifications:{key}", value)
            continue
        size = _size(value)
        if size and re.search(r"\b(ram|unified memory|system memory|installed memory|memory capacity)\b", low):
            add("ram", size[0], f"specifications:{key}", value)
            add("ram_gb", f"{size[1]:g}", f"specifications:{key}", value)
        if size and re.search(r"\b(ssd|hdd|storage|rom|disk capacity|hard drive|flash memory)\b", low):
            add("storage", size[0], f"specifications:{key}", value)
            add("storage_gb", f"{size[1]:g}", f"specifications:{key}", value)
        for field, pattern in (("processor", r"\b(processor|chipset|cpu|chip)\b"),
                               ("colour", r"\b(colou?r|finish)\b"),
                               ("model_number", r"\b(model number|part number|manufacturer part number|mpn)\b"),
                               ("display_size", r"\b(display size|screen size|screen diagonal)\b")):
            if re.search(pattern, low):
                add(field, value, f"specifications:{key}", value)
        if re.search(r"\b(isbn|edition|binding|pack of|quantity|volume|weight|size)\b", low):
            add(re.sub(r"\W+", "_", low).strip("_"), value, f"specifications:{key}", value)

    for field in ("brand", "series", "model_number", "manufacturer_part_number"):
        if clean_text(raw.get(field)):
            add(field, raw[field], "product_metadata", raw[field])
    selected = raw.get("selected_configuration") if isinstance(raw.get("selected_configuration"), dict) else {}
    for field in ("color", "ram", "storage", "screen_size"):
        if clean_text(selected.get(field)):
            target = "colour" if field == "color" else field
            add(target, selected[field], f"selected_configuration:{field}", selected[field])
    for source, text in [("title", title), *[(f"highlights:{i}", item) for i, item in enumerate(highlights)]]:
        if not text:
            continue
        for field, pattern in (("ram", _RAM), ("storage", _STORAGE)):
            if field not in attributes and (match := pattern.search(text)) and (size := _size(match.group(0))):
                add(field, size[0], source, text); add(field + "_gb", f"{size[1]:g}", source, text)
        if match := _PAIR.search(text):
            first, second = _size(match.group(1) + match.group(2)), _size(match.group(3) + match.group(4))
            if first and second:
                add("ram", first[0], source, text); add("ram_gb", f"{first[1]:g}", source, text)
                add("storage", second[0], source, text); add("storage_gb", f"{second[1]:g}", source, text)
        for field, pattern in (("processor", _PROCESSOR), ("display_size", _DISPLAY), ("model_number", _SKU)):
            if field not in attributes and (match := pattern.search(text)):
                add(field, match.group(0), source, text)
    price, original = raw.get("price"), raw.get("original_price")
    saving = round(original - price, 2) if original and price and original > price else None
    return {**raw, "name": title, "specifications": specs, "highlights": highlights,
            "original_price": original if saving else None,
            "saving": saving, "discount": round(saving / original * 100) if saving else None,
            "normalized_attributes": attributes, "attribute_evidence": evidence,
            "detail_status": "extracted" if title else "incomplete", "specifications_complete": None}
