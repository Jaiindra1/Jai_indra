"""Application service for the selected product page.

The signed snapshot identifies the retailer URL. Fresh details own the displayed
fields on success; failures retain the complete snapshot with an explicit notice.
"""
from time import monotonic

from core.browser import BrowserBusy
from core import search_diagnostics as diagnostics
from retailers.products import get_product_details, ProductDetailError
from services.product_details import load_product
from services.retailer_mode import require_source_mode

MESSAGES = {
    "blocked_page": "The retailer restricted access. Showing the earlier search result; current details could not be checked.",
    "browser_busy": "The retailer checker is busy. Showing the earlier search result. Please retry shortly.",
    "deadline_exceeded": "The retailer took too long to respond. Showing the earlier search result.",
}


def load_selected_product(token, *, force_refresh=False):
    """Validate the signed link before any browser activity or network request."""
    snapshot = load_product(token)
    require_source_mode(snapshot)
    product = dict(snapshot)
    try:
        details = get_product_details(snapshot["url"], snapshot["retailer"],
                                      deadline=monotonic() + 25, force_refresh=force_refresh)
        product.update(details)
        # The route id and trusted destination must not change after parsing.
        product.update(id=snapshot["id"], retailer=snapshot["retailer"], url=snapshot["url"],
                       detail_status="extracted", detail_error=None, detail_message=None)
    except Exception as error:
        reason = (error.reason if isinstance(error, ProductDetailError) else
                  "browser_busy" if isinstance(error, BrowserBusy) else "retrieval_failed")
        diagnostics.event("product_detail_unavailable", retailer=snapshot["retailer"], reason=reason,
                          error_type=type(error).__name__)
        product.update(detail_status="snapshot", detail_error=reason, checked_at=None, cache_hit=False,
                       detail_message=MESSAGES.get(reason,
                           "Current product details could not be checked. Showing the earlier search result."))
    return product
