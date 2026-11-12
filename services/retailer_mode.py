"""Strict retailer acquisition-mode selection and source binding."""
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / ".env.local")
load_dotenv()

VALID_MODES = {"fixture", "live"}


class RetailerModeError(RuntimeError):
    pass


def retailer_mode():
    value = os.getenv("RETAILER_MODE", "").strip().casefold()
    if value not in VALID_MODES:
        raise RetailerModeError("RETAILER_MODE must be explicitly set to 'fixture' or 'live'.")
    return value


def source_fields(mode=None):
    selected = mode or retailer_mode()
    return {"data_source": selected, "is_live": selected == "live"}


def require_source_mode(product, mode=None):
    selected = mode or retailer_mode()
    source = product.get("data_source")
    if source not in VALID_MODES:
        raise RetailerModeError("Product snapshot has no valid retailer data source.")
    if source != selected:
        raise RetailerModeError(
            f"A {source} product snapshot cannot be used while RETAILER_MODE={selected}."
        )
    return selected
