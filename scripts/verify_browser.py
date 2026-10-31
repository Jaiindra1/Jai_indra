"""Explicit opt-in live checks; never part of automated unit tests or builds."""
import argparse
from collections import Counter
import json
from pathlib import Path
import sys
from time import monotonic
from urllib.error import HTTPError
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))


def check_url(base, method, path, payload=None):
    request = Request(base.rstrip("/") + path, method=method,
                      data=json.dumps(payload).encode() if payload is not None else None,
                      headers={"Content-Type": "application/json"})
    started = monotonic()
    try:
        response = urlopen(request, timeout=75)
    except HTTPError as error:
        response = error
    with response:
        raw = response.read()
        record = {"path": path, "status": response.status,
                  "seconds": round(monotonic() - started, 2),
                  "request_id": response.headers.get("X-Search-Request-ID")}
        if "application/json" in response.headers.get("Content-Type", ""):
            data = json.loads(raw)
            if path == "/api/search":
                record.update(success=data.get("success"), products=len(data.get("products", [])),
                              retailers=dict(Counter(p.get("retailer") for p in data.get("products", []))),
                              message=data.get("message"))
            else:
                record["body"] = data
        print(json.dumps(record), flush=True)
        return record


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", help="Run real HTTP requests against this deployment")
    parser.add_argument("--live-local", action="store_true", help="Launch browsers and contact both retailers locally")
    parser.add_argument("--query", default="Samsung A56")
    args = parser.parse_args()
    records = []
    if args.base_url:
        for path in ("/", "/health", "/api/browser-health", "/feedback",
                     "/static/css/loader.css", "/static/css/search-page.css",
                     "/static/css/hamster.css", "/static/js/search.js"):
            records.append(check_url(args.base_url, "GET", path))
        records.append(check_url(args.base_url, "POST", "/api/search", {"query": args.query}))
    elif args.live_local:
        from core.browser import browser_health
        from core.search_diagnostics import error_details
        from retailers.amazon import search_amazon
        from retailers.flipkart import search_flipkart
        from main import app
        health = {"check": "local_browser", **browser_health()}
        print(json.dumps(health), flush=True)
        records.append(health)
        for name, search in [("Amazon", search_amazon), ("Flipkart", search_flipkart)]:
            started = monotonic()
            try:
                products = search(args.query, max_results=3, raise_on_error=True)
                record = {"check": name, "success": True, "products": len(products)}
            except Exception as error:
                record = {"check": name, "success": False,
                          "stage": getattr(error, "stage", "unknown"), **error_details(error)}
            record["seconds"] = round(monotonic() - started, 2)
            print(json.dumps(record), flush=True)
            records.append(record)
        response = app.test_client().post("/api/search", json={"query": args.query})
        record = {"check": "local_flask_search", "status": response.status_code,
                  "success": response.json.get("success"),
                  "products": len(response.json.get("products", []))}
        print(json.dumps(record), flush=True)
        records.append(record)
    else:
        parser.error("Use --base-url or --live-local; live checks are opt-in.")
    Path("verification-results.json").write_text(json.dumps(records, indent=2) + "\n")


if __name__ == "__main__":
    main()
