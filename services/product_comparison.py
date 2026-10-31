"""Conservative live cross-retailer matching for a signed selected listing."""
import re
import unicodedata
from time import monotonic, time

from core.browser import browser_session, BrowserBusy
from core import search_diagnostics as diagnostics
from retailers.pagination import scrape_page, page_url
from retailers.outcomes import RetailerSearchError
from services.search_pagination import normalize_listing

BRANDS = {"samsung", "apple", "google", "oneplus", "xiaomi", "redmi", "poco", "realme",
          "vivo", "oppo", "iqoo", "nothing", "motorola", "moto", "nokia", "sony", "lg",
          "hp", "dell", "lenovo", "asus", "acer", "msi", "jbl", "bose", "boat", "noise"}
COLORS = {"black", "white", "blue", "green", "red", "pink", "purple", "olive", "graphite",
          "grey", "lavender", "silver", "gold", "orange", "yellow", "cream", "navy", "teal",
          "brown", "midnight", "starlight", "titanium", "peach", "coral", "violet", "ultramarine"}
VARIANTS = {"pro", "max", "plus", "ultra", "fe", "lite", "mini", "se", "fold", "flip"}
ACCESSORIES = {"case", "cover", "protector", "tempered", "charger", "cable", "skin", "adapter"}
FAMILIES = {"galaxy", "iphone", "pixel", "redmi", "poco", "nord", "xperia", "edge"}


def words(value):
    text = unicodedata.normalize("NFKC", str(value or "")).lower().replace("gray", "grey")
    text = re.sub(r"(?<=\w)-(?=\w)", "", text)
    text = re.sub(r"(iphone|pixel)(?=\d)", r"\1 ", text)
    text = re.sub(r"(\d+(?:\.\d+)?)(gb|tb)(?=[a-z])", r"\1 \2 ", text)
    text = re.sub(r"([a-z]*\d+)(pro|max|plus|ultra|fe|lite|mini)\b", r"\1 \2", text)
    return re.sub(r"[^a-z0-9.]+", " ", text).strip()


def fingerprint(product):
    name = words(str(product.get("name") or "").split("|", 1)[0])
    evidence = [name, *[words(value) for value in product.get("highlights") or []]]
    specs = product.get("specifications") or {}
    evidence.extend(words(f"{key}: {value}") for key, value in specs.items())
    tokens = set(name.split())
    brand = next((word for word in name.split() if word in BRANDS), None)
    if brand is None and "iphone" in tokens:
        brand = "apple"
    if brand is None and "galaxy" in tokens:
        brand = "samsung"
    if brand == "moto":
        brand = "motorola"
    memory = {"storage": set(), "ram": set()}
    for text in evidence:
        for match in re.finditer(r"\b(\d+(?:\.\d+)?)\s*(gb|tb)\b", text):
            size = float(match[1]) * (1024 if match[2] == "tb" else 1)
            after, before = text[match.end():match.end() + 16], text[:match.start()]
            if re.match(r"\s*(?:ram|ddr)", after):
                kind = "ram"
            elif re.match(r"\s*(?:rom|storage|ssd|hdd|internal)", after):
                kind = "storage"
            elif re.fullmatch(r"\s*(?:ram|memory)\s*", before):
                kind = "ram"
            else:
                kind = "ram" if size <= 24 else "storage"
            memory[kind].add(size)
    without_units = re.sub(r"\b\d+(?:\.\d+)?\s*(?:gb|tb|cm|inch|inches|mah|hz|mp)\b", " ", name)
    models = {token for token in without_units.split() if any(c.isdigit() for c in token)
              and token not in {"5g", "4g", "3g"} and len(token) >= 2}
    colors = tokens & COLORS
    if len(colors) > 1:
        colors.discard("titanium")
    for qualifier, color in re.findall(r"\b(light|dark|deep|mist|space|natural|desert)\s*(black|white|blue|green|red|pink|purple|grey|silver|gold|titanium)\b", name):
        colors.discard(color)
        colors.add(qualifier + " " + color)
    return {"brand": brand, "models": models, "families": tokens & FAMILIES, "variants": tokens & VARIANTS,
            "colors": colors, "memory": memory, "radio": tokens & {"3g", "4g", "5g"},
            "accessories": tokens & ACCESSORIES}


def match_variant(reference, candidate):
    selected, other = fingerprint(reference), fingerprint(candidate)
    if not selected["brand"] or selected["brand"] != other["brand"]:
        return "different", ["brand"]
    if other["accessories"] - selected["accessories"]:
        return "different", ["product type"]
    if selected["models"] and not selected["models"].issubset(other["models"]):
        return "different", ["model"]
    if selected["families"] and not selected["families"].issubset(other["families"]):
        return "different", ["model family"]
    if selected["variants"] != other["variants"]:
        return "different", ["model variant"]
    if selected["radio"] and other["radio"] and selected["radio"] != other["radio"]:
        return "different", ["network variant"]
    missing = [] if selected["models"] else ["exact model identifier"]
    phone = bool(selected["families"] & {"iphone", "pixel", "redmi", "poco", "nord"}) or (
        "galaxy" in selected["families"] and (any(re.fullmatch(r"[amsfz]\d+[a-z]*", code) for code in selected["models"]) or selected["variants"] & {"fold", "flip"}))
    if phone:
        if not selected["memory"]["storage"]:
            missing.append("storage on selected listing")
        if not selected["colors"]:
            missing.append("colour on selected listing")
        if selected["brand"] != "apple" and not selected["memory"]["ram"]:
            missing.append("RAM on selected listing")
    for kind in ("storage", "ram"):
        expected, actual = selected["memory"][kind], other["memory"][kind]
        if expected and actual and expected != actual:
            return "different", [kind]
        if expected and not actual:
            missing.append(kind)
    if selected["colors"] and other["colors"] and selected["colors"] != other["colors"]:
        return "different", ["colour"]
    if selected["colors"] and not other["colors"]:
        missing.append("colour")
    return ("unverified", missing) if missing else ("verified", [])


def comparison_query(product):
    title = re.split(r"[|(]", product["name"], maxsplit=1)[0].strip()
    identity = fingerprint(product)
    extras = []
    for kind in ("storage", "ram"):
        if len(identity["memory"][kind]) == 1:
            size = next(iter(identity["memory"][kind]))
            extras.append(f"{size:g} GB" + (" RAM" if kind == "ram" else ""))
    return (title + " " + " ".join(extras + sorted(identity["colors"]))).strip()[:200]


def comparison_target(product):
    return "Amazon" if product["retailer"] == "Flipkart" else "Flipkart"


def compare_product(product):
    retailer, query = comparison_target(product), comparison_query(product)
    result = {"retailer": retailer, "status": "unavailable", "offer": None, "related_offer": None,
              "reason": None, "search_url": page_url(retailer, query, 1), "checked_at": int(time()),
              "message": retailer + " could not be checked. Please retry or check the retailer directly."}
    started = monotonic()
    try:
        with browser_session(scraping=True) as driver:
            page = scrape_page(driver, retailer, query, 1, started + 14)
        verified, related = [], []
        for raw in page.items:
            item = normalize_listing(raw, query, retailer)
            if not item:
                continue
            status, fields = match_variant(product, item)
            if status == "verified":
                verified.append(item)
            elif status == "unverified":
                related.append({**item, "unverified_fields": fields})
        if verified:
            result.update(status="matched", offer=min(verified, key=lambda item: item["price"]),
                          message="Same model and listed variant matched.", matches=len(verified))
        elif related:
            result.update(status="variant_unverified", related_offer=min(related, key=lambda item: item["price"]),
                          message="A similar listing was found. Its full variant details need confirmation.")
        else:
            result.update(status="no_match", message="No matching model and variant was found in the returned listings.")
    except BrowserBusy:
        result.update(status="busy", reason="browser_busy", message="A search is still finishing. Retry the comparison shortly.")
    except RetailerSearchError as error:
        result["reason"] = error.stage
        diagnostics.event("comparison_retailer_failed", retailer=retailer, stage=error.stage)
    except Exception as error:
        result["reason"] = "comparison_failed"
        diagnostics.event("comparison_failed", retailer=retailer, **diagnostics.error_details(error))
    result["elapsed_ms"] = round((monotonic() - started) * 1000)
    diagnostics.event("comparison_finished", retailer=retailer, status=result["status"],
                      reason=result["reason"], seconds=round(monotonic() - started, 3))
    return result
