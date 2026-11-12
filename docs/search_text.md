# Search text processing — Phase 1

## Architecture and integration

`services/search_text.py` is a standard-library-only module with no application,
retailer, category, AI, database or network dependencies. No existing
production module imports it. Future callers can explicitly pass the original
query to `process_query` and consume the returned representation as a separate
input to later intelligence. Do not use normalized equality as product identity.

Inspection found `product_normalizer.normalize_price` handles prices only.
`specification_extractor.extract_highlights` extracts listing evidence and is
already used by search processing. Generic query processing remains independent
from live price and product-detail extraction.
Tests follow the repository's standard `unittest` conventions.

## API

- `normalize_query(query: str) -> str`: NFC Unicode normalization, collapse
  Unicode whitespace, join explicitly recognized number/unit spellings, lowercase,
  then NFC again. Does not strip accents, punctuation, leading zeros or stopwords.
- `tokenize(text: str) -> tuple[Token, ...]`: tokenize exactly the supplied text.
  Keep adjacent letters/numbers/combining marks/underscores together, including
  alphanumeric identifiers and decimal points between decimal digits. Emit each
  remaining non-whitespace character as a separate token.
- `process_query(query: str) -> SearchText`: preserve the exact input, normalize
  it and tokenize the normalized result.
- `Token(text, start, end)`: immutable token with zero-based, half-open offsets
  into normalized text. `normalized_query[start:end] == text` for every token.
- `SearchText(original_query, normalized_query, tokens)`: immutable representation;
  `dataclasses.asdict(result)` can be serialized with `json.dumps` for datasets.

All input functions reject non-strings with `TypeError`. Empty and whitespace-only
strings produce empty normalized text and no tokens while retaining the source.

## Formatting policy

Supported case-sensitive spaced unit spellings are `GB`, `TB`, `MB`, `KB`, `GHz`,
`MHz`, `kHz`, `Hz`, `mAh`, `Wh`, `kg`, `cm`, `mm`, `ml`, and `G`. Join an unsigned
ASCII integer or decimal to a unit at word boundaries. Already compact tokens
remain compact. There are no conversions or quantity/attribute labels.

Case-sensitive joining precedes lowercase to avoid interpreting `Gb` as `GB`.
Thus `256 GB`, `12 GB RAM`, `5 G` become `256gb`, `12gb ram`, `5g`. Lowercase
spaced `256 gb` stays spaced; ambiguous case spellings are not guessed. `5 G` is
joined solely as requested formatting, without claiming it means a network type.

## Examples

```python
from dataclasses import asdict
from services.search_text import process_query

asdict(process_query("M4 (12 GB RAM), 256 GB / 5 G"))
# {
#   'original_query': 'M4 (12 GB RAM), 256 GB / 5 G',
#   'normalized_query': 'm4 (12gb ram), 256gb / 5g',
#   'tokens': (
#       {'text': 'm4', 'start': 0, 'end': 2},
#       {'text': '(', 'start': 3, 'end': 4},
#       {'text': '12gb', 'start': 4, 'end': 8},
#       {'text': 'ram', 'start': 9, 'end': 12},
#       {'text': ')', 'start': 12, 'end': 13},
#       {'text': ',', 'start': 13, 'end': 14},
#       {'text': '256gb', 'start': 15, 'end': 20},
#       {'text': '/', 'start': 21, 'end': 22},
#       {'text': '5g', 'start': 23, 'end': 25},
#   )
# }
```

## Validation and limitations

`python -m unittest discover -s tests -p test_search_text.py -v`: 10 tests passed.
`python -m unittest discover -s tests -p 'test_*.py'`: 75 tests passed.
Coverage includes the five requested product names, unknown model codes, numbers,
decimals, punctuation, parentheses, units, empty input, Unicode, combining marks,
whitespace, offsets, repeatability, normalization idempotence and invalid types.
Existing route, pagination and retailer unit tests remain passing.
No live retailer scraping was run.

Offsets are Python character indices in normalized text, not original-source,
UTF-16 or byte offsets. No alignment map is supplied. Lowercase intentionally
loses case in the normalized view; consult the original for case-sensitive units
or identifiers. NFC avoids compatibility folding, so full-width forms are not
collapsed and superscripts remain distinct. No transliteration, stemming, typo
correction, locale-specific numeric interpretation, language-specific word
segmentation, emoji grouping, or brand/model/colour/category identification is
performed. Hyphenated codes are represented by multiple tokens with the hyphen
retained; downstream consumers must not discard punctuation blindly. The unit
vocabulary is intentionally limited and can be extended independently after
validation. No dependencies or existing search logic changed.
