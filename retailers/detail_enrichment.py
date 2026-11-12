"""Bounded product-detail evidence extraction for existing retailer sessions.

This module performs no matching.  It only returns labelled facts already
present in Amazon India or Flipkart HTML; the Categories package decides
whether those facts are sufficient and consistent.
"""

from __future__ import annotations

import re
from time import monotonic
from urllib.parse import urlsplit

from bs4 import BeautifulSoup
from selenium.common.exceptions import TimeoutException

from core import search_diagnostics as diagnostics


_HOSTS = {
    "Amazon": {"amazon.in", "www.amazon.in"},
    "Flipkart": {"flipkart.com", "www.flipkart.com"},
}
_BLOCKED = re.compile(
    r"(?:enter the characters you see below|validatecaptcha|automated access|access denied)",
    re.I,
)


def _text(value) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def _add(result: dict[str, str], key, value) -> None:
    label, fact = _text(key).strip(":-"), _text(value)
    if not label or not fact or len(label) > 80 or len(fact) > 300:
        return
    if label.casefold() in {"price", "deal price", "you save"}:
        return
    existing = result.get(label)
    if existing and existing != fact:
        result[label] = existing + " | " + fact
    else:
        result[label] = fact


def parse_detail_specifications(html: str, retailer: str) -> dict[str, str]:
    """Parse labelled specification rows from saved detail HTML."""
    if retailer not in _HOSTS or not html:
        return {}
    soup = BeautifulSoup(html, "html.parser")
    values: dict[str, str] = {}

    for row in soup.select("table tr"):
        cells = row.find_all(["th", "td"], recursive=True)
        if len(cells) >= 2:
            _add(values, cells[0].get_text(" ", strip=True), cells[-1].get_text(" ", strip=True))
        if len(values) >= 40:
            break

    if retailer == "Flipkart":
        # Flipkart commonly renders specification tables as two-column div
        # rows instead of semantic HTML tables. Only accept a short label and
        # a distinct sibling value to avoid treating prose as a specification.
        for row in soup.select("div.row, div[class*='specification'] > div, div[class*='productSpecs'] > div"):
            children = [child for child in row.find_all("div", recursive=False) if _text(child.get_text(" ", strip=True))]
            if len(children) >= 2:
                label = _text(children[0].get_text(" ", strip=True))
                value = _text(children[-1].get_text(" ", strip=True))
                if len(label) <= 80 and label != value:
                    _add(values, label, value)
            if len(values) >= 40:
                break

    selectors = (
        "#detailBullets_feature_div li",
        "#feature-bullets li",
        "div[class*='specification'] li",
    ) if retailer == "Amazon" else (
        "div[class*='productSpecs'] li",
        "div[class*='specification'] li",
        "div[class*='GNDEQ-'] li",
    )
    for selector in selectors:
        for node in soup.select(selector):
            line = _text(node.get_text(" ", strip=True))
            if ":" in line:
                label, value = line.split(":", 1)
                _add(values, label, value)
            if len(values) >= 40:
                break

    # Common metadata can live outside tables.
    for label in ("ASIN", "Item model number", "Model Name", "Model Number", "Part Number"):
        match = re.search(re.escape(label) + r"\s*[:\-]?\s*([^|\n]{2,100})", soup.get_text("\n", strip=True), re.I)
        if match:
            _add(values, label, match.group(1))
    return values


def enrich_listing(driver, retailer: str, listing: dict, deadline: float) -> dict | None:
    """Fetch one trusted detail URL within the caller's browser and deadline."""
    url = str(listing.get("url") or "")
    if retailer not in _HOSTS or urlsplit(url).hostname not in _HOSTS[retailer]:
        return None
    remaining = deadline - monotonic()
    if remaining < 2.5:
        return None
    started = monotonic()
    try:
        driver.set_page_load_timeout(max(1, min(6, remaining - 0.5)))
        try:
            driver.get(url)
        except TimeoutException:
            driver.execute_cdp_cmd("Page.stopLoading", {})
        html = driver.page_source or ""
        if _BLOCKED.search(html[:250000]):
            diagnostics.event("detail_enrichment_skipped", retailer=retailer, reason="access_restriction")
            return None
        specifications = parse_detail_specifications(html, retailer)
        diagnostics.event(
            "detail_enrichment_finished",
            retailer=retailer,
            fields=len(specifications),
            seconds=round(monotonic() - started, 3),
        )
        return {"specifications": specifications} if specifications else None
    except Exception as error:
        diagnostics.event(
            "detail_enrichment_failed",
            retailer=retailer,
            **diagnostics.error_details(error),
        )
        return None


__all__ = ["parse_detail_specifications", "enrich_listing"]
