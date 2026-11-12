"""Extract selected configuration and linked Flipkart variant choices."""
import re
from urllib.parse import urljoin, urlparse

from ..html_utils import clean_text, image_url, parse_inr
from ..section_utils import spec_value
from .page_text import bounded_section, selected_value

_RAM = re.compile(r"\b\d+(?:\.\d+)?\s*(?:GB|TB)\b", re.I)
_VARIANT = re.compile(r"\b(\d+(?:\.\d+)?\s*(?:GB|TB))\s*,\s*(\d+(?:\.\d+)?\s*(?:inch|inches))", re.I)


def _linked_options(soup, heading, pattern):
    text = soup.find(string=lambda value: value and clean_text(value).casefold().rstrip(":") == heading.casefold().rstrip(":"))
    if not text:
        return []
    result, seen = [], set()
    for ancestor in list(text.parents)[:7]:
        links = ancestor.select('a[href*="/p/"]') if getattr(ancestor, "select", None) else []
        if not links or len(links) > 30:
            continue
        for link in links:
            url = urljoin("https://www.flipkart.com", link.get("href", ""))
            if "/p/" not in urlparse(url).path:
                continue
            image = link.select_one("img")
            raw = " ".join(filter(None, (link.get("title"), link.get("aria-label"),
                                           clean_text(link), image.get("alt") if image else None)))
            match = pattern.search(raw)
            if match and (label := clean_text(match.group(0))).casefold() not in seen:
                result.append({"label": label, "url": url, "selected": False,
                               "price": parse_inr(raw)})
                seen.add(label.casefold())
        if result:
            break
    return result


def _same_listing(first, second):
    left, right = urlparse(first), urlparse(second)
    left_pid = dict(item.split("=", 1) for item in left.query.split("&") if "=" in item).get("pid")
    right_pid = dict(item.split("=", 1) for item in right.query.split("&") if "=" in item).get("pid")
    return bool(left_pid and left_pid == right_pid) or left.path.rstrip("/") == right.path.rstrip("/")


def _linked_label_options(soup, heading, selected=None, current_url=None):
    """Read short, human-facing labels from linked visual choices such as colours."""
    text = soup.find(string=lambda value: value and clean_text(value).casefold().rstrip(":") == heading.casefold().rstrip(":"))
    if not text:
        return []
    result, seen = [], set()
    for ancestor in list(text.parents)[:7]:
        links = ancestor.select('a[href*="/p/"]') if getattr(ancestor, "select", None) else []
        if not links or len(links) > 30:
            continue
        for link in links:
            target = urljoin("https://www.flipkart.com", link.get("href", ""))
            if "/p/" not in urlparse(target).path:
                continue
            image = link.select_one("img")
            candidates = (link.get("title"), link.get("aria-label"), clean_text(link),
                          image.get("alt") if image else None)
            label = next((clean_text(value) for value in candidates
                          if value and 1 < len(clean_text(value)) <= 40
                          and not re.search(r"₹|\b(?:off|emi|product image)\b", clean_text(value), re.I)), None)
            if not label or label.casefold() == "image":
                label = clean_text(selected) if current_url and _same_listing(target, current_url) else f"Colour option {len(result) + 1}"
            if label and label.casefold() not in seen:
                result.append({"label": label, "url": target, "selected": False,
                               "price": parse_inr(" ".join(filter(None, candidates))),
                               "image_url": image_url(image)})
                seen.add(label.casefold())
        if result:
            break
    return result


def _text_options(lines, start, ends, pattern, selected):
    result, seen = [], set()
    for value in bounded_section(lines, start, ends, 30):
        match = pattern.search(value)
        if not match:
            continue
        label = clean_text(match.group(0))
        key = label.casefold()
        if key in seen:
            continue
        seen.add(key)
        result.append({"label": label, "selected": key == clean_text(selected).casefold(),
                       "url": None, "price": parse_inr(value)})
    return result


def _merge(first, second, selected):
    result = []
    for option in [*first, *second]:
        existing = next((item for item in result if item["label"].casefold() == option["label"].casefold()), None)
        if existing:
            for key in ("url", "price"):
                existing[key] = existing.get(key) or option.get(key)
        else:
            result.append(dict(option))
    selected_key = clean_text(selected).casefold()
    for option in result:
        option["selected"] = option["label"].casefold() == selected_key
    return result


def _select_current(options, selected, url):
    """Guarantee that the current choice is represented and points to the current page."""
    selected_key = clean_text(selected).casefold()
    current = next((option for option in options if option["label"].casefold() == selected_key), None)
    if current:
        current.update(selected=True, url=current.get("url") or url)
    elif selected:
        options.insert(0, {"label": clean_text(selected), "selected": True, "url": url, "price": None})
    return options


def extract_configurations(soup, lines, url, specs):
    color = selected_value(lines, "Selected Color:") or spec_value(specs, r"^colou?r$")
    ram = selected_value(lines, "System Memory:") or spec_value(specs, r"^(?:ram|system memory)$")
    variant = selected_value(lines, "Variant:")
    storage = (spec_value(specs, r"^(?:ssd|storage|internal storage|rom) capacity$")
               or spec_value(specs, r"^storage$"))
    screen = spec_value(specs, r"^(?:screen|display) size$")
    if variant and (match := _VARIANT.search(variant)):
        storage = storage or clean_text(match.group(1))
        screen = screen or clean_text(match.group(2))

    ram_options = _select_current(_merge(
        _text_options(lines, "System Memory:", ("Variant:",), _RAM, ram),
        _linked_options(soup, "System Memory:", _RAM), ram), ram, url)
    variant_options = _select_current(_merge(
        _text_options(lines, "Variant:", ("Delivery details", "Seller:", "Product highlights"), _VARIANT, variant),
        _linked_options(soup, "Variant:", _VARIANT), variant), variant, url)
    color_options = _linked_label_options(soup, "Selected Color:", color, url)
    if not color_options:
        color_options = _linked_label_options(soup, "Color:", color, url)
    color_options = _select_current(color_options, color, url)
    details = {
        "color": {"selected": color, "options": color_options},
        "ram": {"selected": ram, "options": ram_options},
        "variant": {"selected": variant, "options": variant_options},
    }
    legacy = [{"label": label, "selected": group["selected"],
               "options": [item["label"] for item in group["options"]]}
              for label, group in (("Colour", details["color"]), ("RAM", details["ram"]),
                                   ("Storage / display", details["variant"]))
              if group["selected"] or group["options"]]
    return {
        "selected_configuration": {"color": color, "ram": ram, "storage": storage,
                                   "screen_size": screen,
                                   "model_number": spec_value(specs, r"^(?:model|part) number$")},
        "available_variants": details,
        "variants": legacy,
    }
