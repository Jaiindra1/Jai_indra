"""Independent, deterministic query text processing; no product inference."""
from dataclasses import dataclass
import re
import unicodedata


# Formatting only: no conversions or inference. Case-sensitive before lowercasing
# so e.g. 'Gb' (gigabits) is not joined as 'GB' (gigabytes).
_SPACED_UNIT = re.compile(
    r"(?<![\w.,+-])([0-9]+(?:\.[0-9]+)?)\s+"
    r"(GB|TB|MB|KB|GHz|MHz|kHz|Hz|mAh|Wh|kg|cm|mm|ml|G)"
    r"(?!\w)"
)


@dataclass(frozen=True)
class Token:
    """Text and zero-based, half-open Python character offsets in normalized text."""

    text: str
    start: int
    end: int


@dataclass(frozen=True)
class SearchText:
    """Lossless source alongside normalized text and ordered token spans."""

    original_query: str
    normalized_query: str
    tokens: tuple[Token, ...]


def normalize_query(query: str) -> str:
    """Apply NFC, whitespace folding, explicit unit joining, then lowercase.

    Keep accents, punctuation, numbers and word boundaries. NFC intentionally
    avoids compatibility folding (e.g. superscripts into ordinary digits).
    Lowercase is a comparison convention, not a claim of product equivalence.
    """
    if not isinstance(query, str):
        raise TypeError("query must be a string")
    text = " ".join(unicodedata.normalize("NFC", query).split())
    text = _SPACED_UNIT.sub(r"\1\2", text)
    return unicodedata.normalize("NFC", text.lower())


def tokenize(text: str) -> tuple[Token, ...]:
    """Tokenize supplied text without normalizing it or discarding punctuation.

    Consecutive Unicode letters, numbers, marks and underscores form a token.
    Keep decimal points between decimal digits within that token. Every other
    non-whitespace character is a separate token, preserving variant separators
    and modifiers such as '/', '-', '+' and parentheses.
    """
    if not isinstance(text, str):
        raise TypeError("text must be a string")
    tokens = []
    start = None
    for index, character in enumerate(text):
        category = unicodedata.category(character)
        word = category[0] in "LNM" or character == "_"
        decimal_point = (character == "." and index > 0
                         and index + 1 < len(text)
                         and text[index - 1].isdecimal()
                         and text[index + 1].isdecimal())
        if word or decimal_point:
            if start is None:
                start = index
            continue
        if start is not None:
            tokens.append(Token(text[start:index], start, index))
            start = None
        if not character.isspace():
            tokens.append(Token(character, index, index + 1))
    if start is not None:
        tokens.append(Token(text[start:], start, len(text)))
    return tuple(tokens)


def process_query(query: str) -> SearchText:
    """Build a query representation without invoking the existing search flow."""
    normalized = normalize_query(query)
    return SearchText(query, normalized, tokenize(normalized))
