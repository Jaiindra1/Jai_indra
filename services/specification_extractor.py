"""Extract concise listing evidence without inferring product features."""
import re
from collections.abc import Mapping

# Match explicit quantities, retaining the listing's original wording.
QUANTITY = re.compile(
    r"\b\d+(?:\.\d+)?\s*(?:GB|TB|MB|MP|mAh|Wh|W|Hz|kHz|GHz|MHz|"
    r"kg|cm|mm|ml|litres?|liters?|inches|inch|hours?|hrs?)\b"
    r"(?:\s+(?:RAM|ROM|storage|battery|camera|display|refresh rate))?", re.I
)


def extract_highlights(name, description=None, specifications=None, limit=5):
    """Prefer structured facts, then explicit measurements from listing text.

    Return no chips when the listing provides no supported details. Never use
    model names or search queries to infer specifications.
    """
    results = []
    seen = set()

    def add(value):
        if not isinstance(value, str):
            return
        value = " ".join(value.split()).strip(" |;,")
        if not value or len(value) > 100 or value.casefold() in seen:
            return
        seen.add(value.casefold())
        results.append(value)

    def visit(value, key=""):
        if isinstance(value, Mapping):
            for label, detail in value.items():
                visit(detail, str(label))
        elif isinstance(value, (list, tuple)):
            for detail in value:
                visit(detail, key)
        elif isinstance(value, (str, int, float)) and not isinstance(value, bool):
            text = str(value)
            if key.lower() in {"features", "highlights", "raw_details", "description"}:
                for part in re.split(r"[\n|;]+", text):
                    add(part)
            elif key:
                add(f"{key.replace('_', ' ')}: {text}")
            else:
                add(text)

    visit(specifications or {})
    for source in (name, description):
        if isinstance(source, str):
            # Preserve negation/context rather than extracting an affirmative
            # fragment from a sentence such as "no 5000mAh battery".
            for clause in re.split(r"[.!?;\n]+(?!\d)", source):
                if re.search(r"\b(no|not|without|unsupported)\b", clause, re.I):
                    continue
                for match in QUANTITY.finditer(clause):
                    add(match.group())
    return results[:max(0, limit)]
