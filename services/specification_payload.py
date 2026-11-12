"""Bound specification data stored in signed search and product snapshots."""
from collections.abc import Mapping


def _entries(specifications):
    def visit(value, label, depth, active):
        if depth > 8 or id(value) in active:
            return
        if isinstance(value, (Mapping, list, tuple)):
            active = active | {id(value)}
            children = value.items() if isinstance(value, Mapping) else enumerate(value)
            for key, child in children:
                child_label = str(key) if isinstance(value, Mapping) else label
                yield from visit(child, child_label, depth + 1, active)
        elif isinstance(value, (str, int, float)) and not isinstance(value, bool):
            text = " ".join(str(value).split())
            if text:
                yield label, text

    if isinstance(specifications, Mapping):
        yield from visit(specifications, "Details", 0, set())


def bounded_specifications(specifications):
    """Return a small specification map suitable for a signed URL token."""
    result, remaining, complete = {}, 600, True
    for label, value in _entries(specifications):
        if len(label) > 80 or len(value) > 250 or len(label) + len(value) > remaining or len(result) >= 12:
            complete = False
            continue
        key = label
        suffix = 2
        while key in result:
            key = f"{label} {suffix}"
            suffix += 1
        result[key] = value
        remaining -= len(key) + len(value)
    return result, complete
