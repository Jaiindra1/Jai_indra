"""Extract conditional promotions, seller, delivery, and purchase policies."""
import re

from ..html_utils import clean_text, parse_inr
from ..section_utils import purchase_details
from . import selectors as S
from .labelled_sections import labelled_rows, matching_text
from .page_text import bounded_section


def _unique(values, limit=30):
    result = []
    for value in values:
        value = clean_text(value)
        if value and value not in result:
            result.append(value)
    return result[:limit]


def extract_commerce(soup, lines, specs):
    base = purchase_details(soup, S.PURCHASE, specs)
    seller_line = matching_text(soup, r"^(?:Seller:|Fulfilled by)\s*\S")
    seller = base.get("seller")
    if not seller and seller_line:
        seller = re.split(r"(?:Seller:|Fulfilled by)\s*", seller_line, maxsplit=1, flags=re.I)[-1]
    seller_rating = None
    if seller_line:
        index = next((i for i, value in enumerate(lines) if seller_line in value), -1)
        if index >= 0:
            seller_rating = next((float(value) for value in lines[index + 1:index + 6]
                                  if re.fullmatch(r"[0-5](?:\.\d)?", value)), None)

    delivery_lines = bounded_section(lines, "Delivery details",
                                     ("Shop with peace of mind", "Product highlights", "Specifications"), 35)
    delivery = base.get("delivery") or next((value for value in delivery_lines
                                              if value.casefold().startswith("delivery by")), None)
    if delivery and delivery.casefold().rstrip(":") == "delivery by":
        index = next((i for i, value in enumerate(delivery_lines) if value == delivery), -1)
        if 0 <= index < len(delivery_lines) - 1:
            delivery = f"Delivery by {delivery_lines[index + 1]}"
    if not delivery:
        rows = labelled_rows(soup, "Delivery by")
        delivery = rows[0] if rows else None
    pincode = next((value for value in delivery_lines if re.fullmatch(r"\d{6}", value)), None)

    policy_lines = bounded_section(lines, "Shop with peace of mind",
                                   ("Product highlights", "Specifications", "Similar Products"), 25)
    policy_text = " ".join(policy_lines).casefold()
    returns = next((value for value in policy_lines
                    if re.search(r"(?:no\s+returns?|\d+[- ]day\s+(?:returns?|replacement)|replacement policy)", value, re.I)), None)
    if not returns and base.get("return_policy") and len(base["return_policy"]) > 8:
        returns = base["return_policy"]
    warranty = base.get("warranty") or next((value for value in policy_lines if "warranty" in value.casefold()), None)
    cod = (False if "no cash on delivery" in policy_text else
           True if "cash on delivery" in policy_text else None)

    exchange = bounded_section(lines, "Exchange offer",
                               ("Bank offers", "Additional benefits", "Delivery details"), 20)
    bank = bounded_section(lines, "Bank offers",
                           ("Additional benefits", "Delivery details", "Product highlights"), 40)
    benefits = bounded_section(lines, "Additional benefits on this purchase",
                               ("Delivery details", "Product highlights"), 25)
    emi = [value for value in lines if re.search(r"\bEMI\b", value, re.I)][:20]
    fees = []
    for value in lines:
        if re.search(r"\b(?:fee|charge|charges)\b", value, re.I) and (amount := parse_inr(value)) is not None:
            fees.append({"amount": amount, "description": value[:500]})
    offer_details = {"bank": _unique(bank), "exchange": _unique(exchange),
                     "additional_benefits": _unique(benefits), "emi": _unique(emi),
                     "additional_fees": fees[:20]}
    offers = _unique([*offer_details["bank"], *offer_details["exchange"],
                      *offer_details["additional_benefits"], *offer_details["emi"]])
    return {
        "offers": offers,
        "offer_details": offer_details,
        "seller": clean_text(seller) or None,
        "seller_details": {"name": clean_text(seller) or None, "rating": seller_rating},
        "delivery": delivery,
        "delivery_details": {"pincode": pincode, "estimate": delivery,
                             "details": _unique(delivery_lines)},
        "warranty": warranty,
        "return_policy": returns,
        "cash_on_delivery": cod,
        "flipkart_assured": "flipkart assured" in policy_text,
        "policy_details": {"warranty": warranty, "returns": returns,
                           "cash_on_delivery": cod,
                           "flipkart_assured": "flipkart assured" in policy_text},
    }
