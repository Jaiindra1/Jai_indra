"""Stateless signed search continuation. No database or warm-worker state."""
import hashlib
import os
from pathlib import Path
import re
import secrets
from time import monotonic
from urllib.parse import parse_qs, unquote, urlencode, urlsplit, urlunsplit

from itsdangerous import BadData, URLSafeTimedSerializer

from core.browser import browser_session, BrowserBusy
from core import search_diagnostics as diagnostics
from models.product import Product
from retailers.outcomes import RetailerSearchError
from retailers.pagination import scrape_page
from services.search_service import detect_category
from services.specification_extractor import extract_highlights
from services.product_normalizer import normalize_price

ROOT = Path(__file__).resolve().parents[1]
PAGE_SIZE = 8
MAX_PAGES = 8
MAX_SEEN = 640
MAX_CURSOR = 14000
CURSOR_AGE = 1800


class InvalidCursor(ValueError):
    pass


class SearchUnavailable(RuntimeError):
    def __init__(self, result, status=502):
        self.result = result
        self.status = status


def signing_key():
    configured = os.getenv("PAGINATION_SECRET", "")
    if configured:
        if len(configured) < 32:
            raise RuntimeError("PAGINATION_SECRET must contain at least 32 characters.")
        return configured
    path = ROOT / "vendor/pagination.key"
    if os.getenv("VERCEL", "").lower() in {"1", "true"}:
        return path.read_bytes()
    path = ROOT / ".pagination-secret"
    try:
        fd = os.open(path, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    except FileExistsError:
        return path.read_bytes()
    with os.fdopen(fd, "wb") as output:
        key = secrets.token_bytes(32)
        output.write(key)
    return key


def serializer():
    return URLSafeTimedSerializer(signing_key(), salt="sandhya-pagination-v1")


def encode_cursor(state):
    token = serializer().dumps(state)
    if len(token) > MAX_CURSOR:
        raise RuntimeError("Search continuation exceeded its bounded size.")
    return token


def decode_cursor(token):
    if not isinstance(token, str) or not token or len(token) > MAX_CURSOR:
        raise InvalidCursor("Invalid search cursor. Start a new search.")
    try:
        state = serializer().loads(token, max_age=CURSOR_AGE)
        if not isinstance(state, dict) or state.get("v") != 1:
            raise ValueError("Invalid cursor version.")
        checks = [
            isinstance(state["q"], str) and 0 < len(state["q"]) <= 200,
            isinstance(state["pages"], dict) and set(state["pages"]) == {"Amazon", "Flipkart"},
            all(page is None or type(page) is int and 1 <= page <= MAX_PAGES for page in state["pages"].values()),
            state["turn"] in state["pages"],
            isinstance(state["buffer"], list) and len(state["buffer"]) <= 40,
            all(isinstance(item, dict) and isinstance(item.get("id"), str) for item in state["buffer"]),
            isinstance(state["seen"], list) and len(state["seen"]) <= MAX_SEEN,
            all(isinstance(key, str) and re.fullmatch(r"[a-f0-9]{20}", key) for key in state["seen"]),
            isinstance(state["warnings"], list) and len(state["warnings"]) <= 6,
        ]
        if not all(checks):
            raise ValueError("Invalid cursor state.")
        return state
    except (BadData, KeyError, TypeError, ValueError, AttributeError):
        raise InvalidCursor("Search cursor is invalid or expired. Start a new search.") from None


def listing_identity(item, retailer):
    raw = item.get("url") or ""
    if not isinstance(raw, str) or len(raw) > 3000:
        return None
    parsed = urlsplit(raw)
    host = parsed.hostname or ""
    expected = "amazon.in" if retailer == "Amazon" else "flipkart.com"
    if host.removeprefix("www.") != expected:
        return None
    if retailer == "Amazon":
        match = re.search(r"/(?:dp|gp/product)/([a-zA-Z0-9]{10})(?:/|$)", parsed.path)
        if not match:
            nested = parse_qs(parsed.query).get("url", [""])[0]
            match = re.search(r"/dp/([a-zA-Z0-9]{10})(?:/|$|\?)", unquote(nested))
        identity = match[1].upper() if match else parsed.path.rstrip("/")
        canonical = "https://www.amazon.in/dp/" + identity if match else urlunsplit(("https", "www.amazon.in", parsed.path, "", ""))
    else:
        pid = parse_qs(parsed.query).get("pid", [""])[0]
        identity = pid or parsed.path.rstrip("/")
        canonical = urlunsplit(("https", "www.flipkart.com", parsed.path, urlencode({"pid": pid}) if pid else "", ""))
    key = hashlib.sha256((retailer + ":" + identity).encode()).hexdigest()[:20]
    return key, canonical


def normalize_listing(item, query, retailer):
    identity = listing_identity(item, retailer)
    if not identity or not isinstance(item.get("name"), str) or not item["name"].strip():
        return None
    price = normalize_price(item.get("price"))
    if price is None:
        return None
    specs = item.get("specifications") if isinstance(item.get("specifications"), dict) else {}
    name = item["name"].strip()[:500]
    image = item.get("image_url")
    if not isinstance(image, str) or len(image) > 1600 or urlsplit(image).scheme not in {"http", "https"}:
        image = None
    product = Product(name=name, price=price, original_price=item.get("original_price"),
                      rating=item.get("rating"), url=identity[1], image_url=image,
                      retailer=retailer, category=detect_category(query, name),
                      highlights=extract_highlights(name, item.get("description"), specs)[:5],
                      availability=item.get("availability"))
    normalized = product.to_dict()
    normalized["id"] = identity[0]
    return normalized


def search_page(query=None, cursor=None, first_retailer="Flipkart"):
    started = monotonic()
    if cursor is not None:
        state = decode_cursor(cursor)
    else:
        if not isinstance(query, str) or not query.strip() or len(query.strip()) > 200:
            raise ValueError("Enter a product name of 1–200 characters.")
        if not isinstance(first_retailer, str) or first_retailer not in {"Amazon", "Flipkart"}:
            raise ValueError("Invalid retailer.")
        state = {"v": 1, "q": query.strip(), "pages": {"Flipkart": 1, "Amazon": 1},
                 "turn": first_retailer, "buffer": [], "seen": [], "warnings": []}
    deadline = started + (13 if cursor is None else 18)
    request_warnings = []
    if not state["buffer"] and any(state["pages"].values()):
        operation_stage = "browser_startup"
        try:
            with browser_session(scraping=True) as driver:
                operation_stage = "retailer_processing"
                # One process reused sequentially if the preferred retailer
                # fails. Return as soon as one real marketplace page is ready.
                for _ in range(2):
                    retailer = state["turn"]
                    if state["pages"][retailer] is None:
                        retailer = "Amazon" if retailer == "Flipkart" else "Flipkart"
                    page = state["pages"][retailer]
                    if page is None or monotonic() >= deadline - 1:
                        break
                    state["turn"] = "Amazon" if retailer == "Flipkart" else "Flipkart"
                    try:
                        retailer_deadline = min(deadline, monotonic() + (6 if retailer == "Amazon" else 11))
                        result = scrape_page(driver, retailer, state["q"], page, retailer_deadline)
                        state["pages"][retailer] = result.next_page if result.has_next and page < MAX_PAGES else None
                        normalizing = monotonic()
                        seen = set(state["seen"])
                        valid_listings = 0
                        for raw in result.items:
                            item = normalize_listing(raw, state["q"], retailer)
                            if item:
                                valid_listings += 1
                            if item and item["id"] not in seen:
                                seen.add(item["id"])
                                state["buffer"].append(item)
                                state["seen"].append(item["id"])
                        diagnostics.event("normalization_finished", retailer=retailer, page=page,
                                          products=len(state["buffer"]), seconds=round(monotonic() - normalizing, 4))
                        if result.items and not state["buffer"]:
                            state["pages"][retailer] = None
                            request_warnings.append({"retailer": retailer, "stage": "duplicate_page" if valid_listings else "invalid_listings",
                                                     "message": retailer + " returned no new valid listings."})
                        if page == MAX_PAGES and result.has_next:
                            request_warnings.append({"retailer": retailer, "stage": "page_limit",
                                                     "message": retailer + " reached the pagination limit. Refine your search for more listings."})
                        if state["buffer"]:
                            break
                    except RetailerSearchError as error:
                        state["pages"][retailer] = None
                        diagnostics.event("page_retailer_failed", retailer=retailer, page=page, stage=error.stage)
                        request_warnings.append({"retailer": retailer, "stage": error.stage,
                                                 "message": retailer + " listings could not be loaded."})
                operation_stage = "browser_cleanup"
        except BrowserBusy:
            diagnostics.event("browser_capacity_busy", stage="browser_startup")
            raise SearchUnavailable({"items": [], "products": [], "has_more": True,
                                     "next_cursor": cursor, "warnings": [],
                                     "message": "Search is busy. Please retry shortly."}, status=503) from None
        except Exception as error:
            diagnostics.event("search_failed", stage=operation_stage, **diagnostics.error_details(error))
            raise SearchUnavailable({"items": [], "products": [], "has_more": False, "next_cursor": None,
                                     "warnings": [{"retailer": "Both retailers", "stage": operation_stage,
                                                   "message": "The search could not finish."}],
                                     "message": "Search is temporarily unavailable. Please retry."}) from None
    # Every buffered listing was deduplicated when its page was scraped. Keep
    # unsent products in the token; no worker cache or repeated navigation.
    items = state["buffer"][:PAGE_SIZE]
    state["buffer"] = state["buffer"][PAGE_SIZE:]
    state["warnings"] = (state["warnings"] + request_warnings)[-6:]
    if len(state["seen"]) > MAX_SEEN:
        state["pages"] = {"Amazon": None, "Flipkart": None}
        state["seen"] = state["seen"][:MAX_SEEN]
    has_more = bool(state["buffer"] or any(state["pages"].values()))
    token = encode_cursor(state) if has_more else None
    elapsed = round(monotonic() - started, 3)
    result = {"items": items, "products": items, "next_cursor": token, "has_more": has_more,
              "warnings": state["warnings"], "pending_retailers": [r for r, p in state["pages"].items() if p == 1],
              "elapsed_ms": round(elapsed * 1000), "success": True,
              "message": "Products found successfully." if items else "Checking remaining retailers." if has_more else "No additional products found."}
    diagnostics.event("search_page_finished", stage="response", products=len(items),
                      has_more=has_more, seconds=elapsed, warnings=len(state["warnings"]))
    if not items and not has_more and state["warnings"] and all(w["stage"] != "duplicate_page" for w in state["warnings"]):
        result["success"] = False
        result["message"] = "Retailer searches are unavailable. Please retry your search."
        raise SearchUnavailable(result)
    return result
