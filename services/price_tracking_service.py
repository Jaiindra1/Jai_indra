"""Persist normalized search results without coupling storage to Selenium."""
import logging
from datetime import datetime, timezone
from uuid import uuid4

from services.product_repository import ProductRepository

logger = logging.getLogger(__name__)


def track_search(query, products, retailer_errors=(), repository=None):
    search_id = uuid4().hex
    report = {"search_id": search_id, "status": "failed", "saved_count": 0}
    try:
        repo = repository if repository is not None else ProductRepository()
        searched_at = datetime.now(timezone.utc)
        record = {
            "search_id": search_id, "query": query, "searched_at": searched_at,
            "status": "processing", "retailers_attempted": ["Flipkart", "Amazon"],
            "retailer_errors": list(retailer_errors), "products_found": len(products),
            "product_ids": [],
        }
        repo.save_search(search_id, record)
        ids, failures = [], 0
        for product in products:
            try:
                product_id = repo.save_observation(product, search_id, searched_at)
                if product_id not in ids:
                    ids.append(product_id)
            except Exception as error:
                failures += 1
                logger.error("Product persistence failed (%s).", type(error).__name__)
        status = ("failed" if len(retailer_errors) == 2 else
                  "partial" if retailer_errors else "completed")
        persistence_status = ("failed" if failures and not ids else
                              "partial" if failures else "saved")
        report["saved_count"] = len(ids)
        repo.save_search(search_id, {
            "status": status, "product_ids": ids,
            "persistence_status": persistence_status,
            "persistence_failures": failures,
        })
        report["status"] = persistence_status
    except Exception as error:
        logger.error("Search persistence failed (%s). Check SQLite path, permissions, and disk space.",
                     type(error).__name__)
    if report["status"] != "saved":
        report["warning"] = (
            "Search results are available, but saving products and price history to SQLite "
            "did not fully complete. Check the server's SQLite path, permissions, and disk space."
        )
    return report
