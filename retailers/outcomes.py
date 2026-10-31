"""Explicit failure outcomes and safe logging shared by retailer searches."""
import logging
import re

from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)


class RetailerSearchError(RuntimeError):
    def __init__(self, retailer, stage, error_type="", *, page_kind=None, http_status=None):
        self.retailer = retailer
        self.stage = stage
        self.error_type = error_type
        self.page_kind = page_kind
        self.http_status = http_status
        super().__init__(f"{retailer} search failed during {stage}.")

    @property
    def public_message(self):
        if self.page_kind in {"automated_access", "captcha", "access_denied"}:
            return f"{self.retailer} is restricting automated access from this server. Check the retailer directly."
        if self.http_status and self.http_status >= 400:
            return f"{self.retailer} returned HTTP {self.http_status}. Its price could not be verified."
        return f"{self.retailer} listings could not be loaded."


class AllRetailersFailed(RuntimeError):
    """No retailer completed successfully; this is not a no-results search."""


def fail(retailer, stage, error=None):
    # Do not include exception messages/tracebacks, query, URL, or page content.
    error_type = type(error).__name__ if error is not None else "None"
    logger.error("Retailer search failed retailer=%s stage=%s error_type=%s",
                 retailer, stage, error_type)
    raise RetailerSearchError(retailer, stage, error_type) from None


def empty_result_or_raise(retailer, driver, stage):
    """Only explicit no-results evidence is a successful empty response.

    This is outcome classification, not a replacement for product selectors.
    Unknown pages fail closed rather than pretending a search succeeded.
    """
    soup = BeautifulSoup(driver.page_source, "html.parser")
    for tag in soup(["script", "style"]):
        tag.decompose()
    text = " ".join(soup.get_text(" ", strip=True).lower().split())
    blocked = ("captcha", "access denied", "robot check", "verify you are human",
               "enter the characters you see below", "automated access")
    if any(marker in text for marker in blocked):
        fail(retailer, "blocked_page")
    patterns = {
        "Amazon": r"\b(?:no results for|0 results for|did not match any products)\b",
        "Flipkart": r"\b(?:sorry,? no results found|no results found|we couldn['’]t find any matches)\b",
    }
    if re.search(patterns[retailer], text):
        logger.info("Retailer search completed retailer=%s outcome=empty", retailer)
        return []
    fail(retailer, stage)
