"""Persistence price normalization; display values remain unchanged."""
import re
from decimal import Decimal, InvalidOperation


def normalize_price(value):
    """Return positive INR with at most two decimals; reject ambiguous text."""
    if value is None or isinstance(value, bool):
        return None
    text = str(value).strip()
    text = re.sub(r"^(?:INR\s*|Rs\.?\s*|\u20b9\s*)", "", text, flags=re.I)
    if not re.fullmatch(r"(?:\d+|\d{1,3}(?:,\d{3})+|\d{1,2}(?:,\d{2})*,\d{3})(?:\.\d{1,2})?", text):
        return None
    try:
        amount = Decimal(text.replace(",", ""))
        if not amount.is_finite() or not 0 < amount < Decimal("1000000000000"):
            return None
        return float(amount)
    except (InvalidOperation, ValueError, OverflowError):
        return None
