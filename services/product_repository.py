"""SQLite storage and atomic updates, independent of scraping."""
import hashlib
import json
import re
from datetime import datetime, timezone
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from services.product_normalizer import normalize_price
from services.sqlite_client import connection, initialize_database


def product_identity(product):
    """Return (product ID, retailer-qualified identity), never using the name."""
    retailer = str(product.get("retailer") or "").strip().lower()
    if retailer not in {"amazon", "flipkart"}:
        raise ValueError("A supported retailer is required for persistence.")
    parsed = urlsplit(product.get("url") or "")
    host = (parsed.hostname or "").lower().removeprefix("www.")
    expected = "amazon.in" if retailer == "amazon" else "flipkart.com"
    if parsed.scheme not in {"http", "https"} or host != expected or parsed.username:
        raise ValueError("A valid retailer product URL is required for persistence.")
    query = dict(parse_qsl(parsed.query))
    asin = re.search(r"/(?:dp|gp/product)/([A-Z0-9]{10})(?:/|$)", parsed.path, re.I)
    if retailer == "amazon" and asin:
        listing = "asin:" + asin.group(1).upper()
    elif retailer == "flipkart" and query.get("pid"):
        listing = "pid:" + query["pid"].upper()
    else:
        tracking = {"ref", "ref_", "tag", "linkcode", "lid", "marketplace", "otracker",
                    "otracker1", "iid", "ssid", "srno", "sprefix", "psc", "qid", "sr"}
        kept = sorted((k, v) for k, v in parse_qsl(parsed.query)
                      if k.lower() not in tracking and not k.lower().startswith("utm_"))
        listing = urlunsplit(("https", host, parsed.path.rstrip("/"), urlencode(kept), ""))
    key = f"{retailer}:{listing}"
    return hashlib.sha256(key.encode()).hexdigest(), key


def _timestamp(value):
    if not isinstance(value, datetime):
        raise TypeError("Observation timestamps must be datetime values.")
    if value.tzinfo is None:
        raise ValueError("Observation timestamps must include a timezone.")
    return value.astimezone(timezone.utc).isoformat(timespec="microseconds")


def _json_default(value):
    if isinstance(value, datetime):
        return _timestamp(value)
    raise TypeError("Unsupported value in persistence data.")


class ProductRepository:
    def __init__(self, database_path=None):
        self.database_path = initialize_database(database_path)

    def get_product(self, product_id):
        with connection(self.database_path) as db:
            row = db.execute("SELECT * FROM products WHERE product_id = ?", (product_id,)).fetchone()
        if row is None:
            return None
        result = dict(row)
        # Keep the existing repository return contract. Full source fields are
        # also retained in product_data, without altering the displayed product.
        result.pop("product_id")
        result.pop("product_data")
        for field in ("first_seen", "last_checked"):
            result[field] = datetime.fromisoformat(result[field])
        return result

    def save_observation(self, product, search_id, observed_at):
        product_id, identity = product_identity(product)
        observed = _timestamp(observed_at)
        price = normalize_price(product.get("price"))
        with connection(self.database_path, write=True) as db:
            previous = db.execute("SELECT * FROM products WHERE product_id = ?", (product_id,)).fetchone()
            if previous is not None and previous["last_checked"] > observed:
                return product_id
            stored_price = normalize_price(previous["current_price"]) if previous is not None else None
            changed = price is not None and price != stored_price
            if previous is None:
                db.execute("""INSERT INTO products (
                    product_id, product_identity_key, product_name, retailer, product_url,
                    product_image, current_price, original_price, currency, first_seen,
                    last_checked, price_status, product_data
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", (
                    product_id, identity, product["name"], product["retailer"], product["url"],
                    product.get("image_url"), price, normalize_price(product.get("original_price")),
                    "INR", observed, observed, "valid" if price is not None else "unavailable",
                    json.dumps(product, default=_json_default, ensure_ascii=False),
                ))
            elif changed:
                db.execute("UPDATE products SET last_checked = ?, current_price = ?, price_status = ? WHERE product_id = ?",
                           (observed, price, "valid", product_id))
            else:
                db.execute("UPDATE products SET last_checked = ? WHERE product_id = ?", (observed, product_id))
            if changed:
                db.execute("""INSERT INTO price_history
                    (product_id, search_id, price, currency, recorded_at, change_type)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON CONFLICT(product_id, search_id) DO UPDATE SET
                    price = excluded.price, currency = excluded.currency,
                    recorded_at = excluded.recorded_at, change_type = excluded.change_type""",
                    (product_id, search_id, price, "INR", observed,
                     "initial" if stored_price is None else "changed"))
        return product_id

    def save_search(self, search_id, data):
        with connection(self.database_path, write=True) as db:
            previous = db.execute("SELECT data FROM searches WHERE search_id = ?", (search_id,)).fetchone()
            merged = json.loads(previous["data"]) if previous is not None else {}
            merged.update(data)
            db.execute("""INSERT INTO searches (search_id, data) VALUES (?, ?)
                ON CONFLICT(search_id) DO UPDATE SET data = excluded.data""",
                (search_id, json.dumps(merged, default=_json_default, ensure_ascii=False)))
