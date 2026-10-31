"""Opt-in real retailer checks. No fixtures, database, proxies or product APIs."""
import argparse
from collections import Counter
import json
from pathlib import Path
import sys
from time import monotonic
from urllib.error import HTTPError
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
records = []


def report(check, **fields):
    record = {"check": check, **fields}
    records.append(record)
    print(json.dumps(record, ensure_ascii=True), flush=True)


def local_checks(query):
    from core.browser import browser_session
    from retailers.amazon import search_amazon
    from retailers.flipkart import search_flipkart
    from retailers.pagination import scrape_page
    from services.product_comparison import compare_product
    from services.search_pagination import normalize_listing

    for retailer, search in [("Amazon", search_amazon), ("Flipkart", search_flipkart)]:
        started = monotonic()
        try:
            items = search(query, max_results=3)
            report("standalone", retailer=retailer, products=len(items), seconds=round(monotonic()-started, 3))
        except Exception as error:
            report("standalone", retailer=retailer, products=0, stage=getattr(error, "stage", "unknown"),
                   error_type=type(error).__name__, seconds=round(monotonic()-started, 3))
    selected = None
    started = monotonic()
    with browser_session(scraping=True) as driver:
        report("shared_browser", startup_seconds=round(monotonic()-started, 3),
               browser=driver.capabilities.get("browserVersion"),
               driver=driver.capabilities.get("chrome", {}).get("chromedriverVersion", "").split(" ")[0])
        for retailer in ("Amazon", "Flipkart"):
            identities = set()
            for number in (1, 2):
                started = monotonic()
                try:
                    page = scrape_page(driver, retailer, query, number, started+14)
                    normalized = [item for raw in page.items if (item := normalize_listing(raw, query, retailer))]
                    new = {item["id"] for item in normalized} - identities
                    identities.update(item["id"] for item in normalized)
                    if retailer == "Flipkart" and selected is None:
                        selected = next((item for item in normalized if "Olive" in item["name"] and "128" in item["name"]),
                                        normalized[0] if normalized else None)
                    report("pagination", retailer=retailer, page=number, products=len(normalized),
                           new_products=len(new), has_next=page.has_next, seconds=round(monotonic()-started, 3))
                    if not page.has_next:
                        break
                except Exception as error:
                    report("pagination", retailer=retailer, page=number, products=0,
                           stage=getattr(error, "stage", "unknown"), page_kind=getattr(error, "page_kind", None),
                           seconds=round(monotonic()-started, 3))
                    break
    if selected:
        result = compare_product(selected)
        report("comparison", selected=selected["name"], selected_price=selected["price"], status=result["status"],
               retailer=result["retailer"], matched_price=(result.get("offer") or {}).get("price"),
               reason=result["reason"], seconds=result["elapsed_ms"]/1000)


def remote_checks(base, query):
    def call(path, payload=None):
        started = monotonic()
        request = Request(base.rstrip("/")+path, data=json.dumps(payload).encode() if payload is not None else None,
                          headers={"Content-Type": "application/json"})
        try:
            response = urlopen(request, timeout=45)
        except HTTPError as error:
            response = error
        with response:
            data = json.loads(response.read())
            report("http", path=path.split("?", 1)[0], status=response.status,
                   seconds=round(monotonic()-started, 3), request_id=response.headers.get("X-Search-Request-ID"),
                   products=len(data.get("items", [])), retailers=dict(Counter(i["retailer"] for i in data.get("items", []))),
                   warnings=data.get("warnings"), reason=data.get("reason"), comparison_status=data.get("status"),
                   matched_price=(data.get("offer") or {}).get("price"),
                   browser=data.get("browser_version"), driver=data.get("driver_version"), startup_success=data.get("startup_success"))
            return data
    call("/api/browser-health")
    first = call("/api/search", {"query": query})
    selected = next((i for i in first.get("items", []) if "Olive" in i["name"] and "128" in i["name"]),
                    next(iter(first.get("items", [])), None))
    page = first
    for _ in range(6):
        if not page.get("has_more") or any(w.get("retailer")=="Amazon" for w in page.get("warnings", [])):
            break
        page = call("/api/search/more?cursor="+page["next_cursor"])
        if any(i["retailer"]=="Amazon" for i in page.get("items", [])):
            break
    amazon_first = call("/api/search", {"query": query, "retailer": "Amazon"})
    report("production_amazon", products=sum(i["retailer"]=="Amazon" for i in amazon_first.get("items", [])),
           warnings=amazon_first.get("warnings"))
    if selected:
        call("/api/product/compare", {"token": selected["detail_url"].split("/product/", 1)[1]})


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--live-local", action="store_true")
    mode.add_argument("--base-url")
    parser.add_argument("--query", default="Samsung A56")
    args = parser.parse_args()
    local_checks(args.query) if args.live_local else remote_checks(args.base_url, args.query)
    output = Path(".browser-downloads")
    output.mkdir(exist_ok=True)
    (output/("amazon-verification-local.json" if args.live_local else "amazon-verification-production.json")).write_text(
        json.dumps(records, indent=2)+"\n", encoding="utf-8")
