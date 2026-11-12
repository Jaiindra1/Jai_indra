# Selected product detail extraction

Selecting a result in **Find Your Products** opens the existing React route
`/products/:id?snapshot=<signed-token>`. The API validates the token, revisits
the selected retailer URL with Selenium, parses its rendered HTML with
BeautifulSoup, and returns structured data for the page.

The page reads in this order: overview, buying details (offers, seller/delivery
and variants), description, then specifications. Section links provide direct
navigation. Extra overview highlights are expandable. During retrieval, the
hamster displays a visible explanation directly underneath the animation.

## Responsibilities

| Layer | Location | Responsibility |
| --- | --- | --- |
| React loading | `useProductDetails.js`, `productApi.js` | Request details, cancel obsolete requests, retry/refresh |
| Page presentation | `ProductDetailPage.jsx`, `products/Product*.jsx` | Overview, gallery, specifications, additional sections, retrieval status |
| API | `main.py`: `/api/products/<token>` | HTTP response and invalid/expired link status |
| Application service | `services/selected_product.py` | Signed identity and fresh result versus search fallback |
| Retrieval entry point | `retailers/products/product_details.py` | Cache lookup and shared browser ownership |
| Navigation | `navigation.py`, `page_readiness.py` | Bounded loading, lazy content preparation, redirect/access checks |
| URL policy | `url_validation.py` | HTTPS, permitted hosts, product identifiers |
| Retailer parsing | `amazon/`, `flipkart/` | Independent, pure extraction functions |
| Common utilities | `html_utils.py`, `section_utils.py` | Text, INR amounts, metadata, images, section helpers |
| Normalization | `product_normalizer.py` | Common attributes, evidence and price-derived savings |

Each retailer package contains:

```text
parser.py          Coordinates section extractors from one parsed HTML document
selectors.py       Supported selectors and layout fallbacks
identity.py        Product identifier, title, brand and model
pricing.py         Main price, original price and availability
media.py           Primary image and gallery
specifications.py  Labelled tables and detail rows
content.py         Highlights, description, rating and counts
offers.py          Offer terms, separate from the main price
delivery.py        Seller, displayed delivery, warranty and returns
variants.py        Displayed variant options; does not change the selection
```

Flipkart also has `labelled_sections.py` for the current card layout: narrowly
labelled sibling values and rows supplement the legacy CSS selectors. Its card
structure was checked against a live retailer page on 10 November 2026.

`amazon_product.py` and `flipkart_product.py` are compatibility imports. Section extractors
do not start browsers, make requests, invoke AI or write to a database.

## Request lifecycle

1. The search result supplies a signed snapshot containing its retailer URL.
2. `load_selected_product()` verifies the signature and expiry before retrieval.
3. `get_product_details()` validates/canonicalizes the URL and checks the cache.
4. On a cache miss, the shared browser session loads that exact product URL.
5. Preparation waits for product identity, scrolls toward details, and can expand
   narrowly selected detail controls. It never switches variants or buys items.
6. Navigation rejects off-retailer redirects, changed product identifiers,
   access-denied pages, oversized pages and missing identity.
7. The retailer parser composes section results; normalization adds supported
   attributes and recalculates savings from the freshly extracted prices.
8. The API returns data to the page.

The API uses a 25-second retrieval budget; the browser's startup and shutdown
also have operational overhead. React allows 45 seconds for the HTTP request.
Navigation is bounded to 12 seconds, identity waiting to 5 seconds and content
settling to 2 seconds, all constrained by the remaining retrieval budget.

## API contract and freshness

`GET /api/products/<token>` retains the `{success, product}` response envelope.
`GET /api/products/<token>?refresh=1` bypasses the short-lived detail cache.

| Field | Meaning |
| --- | --- |
| `id`, `retailer`, `url` | Identity from the signed snapshot, preserved after extraction |
| `detail_status: extracted` | The product document supplied readable identity and was parsed |
| `detail_status: snapshot` | Live retrieval failed; the original search result is displayed |
| `detail_error`, `detail_message` | Machine-readable reason and safe fallback explanation |
| `checked_at` | Unix timestamp of successful extraction; absent on fallback |
| `cache_hit` | A recently extracted result was reused |
| `images`, `offers`, `variants` | Arrays; empty when unavailable |
| `specifications` | Retailer-labelled key/value map |
| `rating_count`, `review_count` | Separate counts; a rating does not imply a written review |
| `normalized_attributes`, `attribute_evidence` | Normalized product attribute evidence |

A successful extraction does not silently substitute an old price, old savings,
or old specifications when the current page omits them. A failed extraction
returns the whole search snapshot with a visible notice and a retry button.
Invalid links return 404; expired links return 410. These cases never launch a
browser. Internal exception details are not returned to the frontend.

The cache lives in process memory for 90 seconds with a maximum of 256 entries.
It does not persist across restarts or guarantee sharing across serverless workers.
The UI shows the original check time when a cached result is used.

## Coverage boundaries

Extraction covers supported product sections present in the rendered document.
It does not promise every element of an arbitrary retailer page. Navigation,
advertisements, unrelated recommendations, full review pagination, authenticated
content and external documents are outside this feature. Delivery text reflects
the retailer browser's current location context; no postcode is entered.

Unknown/missing values remain null or empty. Descriptions, galleries, offers and
specification tables have finite size limits to keep responses manageable.
`specifications_complete` remains unknown: successful parsing does not claim
that every retailer specification has been found. HTML text is rendered through
React escaping, with no raw retailer HTML injection.

Retailer classes and layouts can change. Add a representative HTML fixture and
an expected-value test when introducing a selector. Keep conditional prices
(bank discounts, EMI, exchange offers) separate from the ordinary purchase price.

## Verification

From the project root:

```powershell
python -m unittest discover -s tests -v
npm --prefix Frontend/Sarathi run test:product
npm --prefix Frontend/Sarathi run build
python scripts/verify_product_detail_flow.py
```

The browser integration script starts a temporary localhost server and two
headless Chrome sessions, then closes them. It exercises selection from search,
the real signed API, JavaScript-rendered fixture content, both retailer parsers,
desktop/mobile presentation, refresh, blocked-page fallback, retry and returning
to search. Screenshots are generated in `.artifacts/product-details/`.

Fixtures under `tests/product_details/fixtures/` are synthetic supported-layout
examples, not live retailer captures. The browser check substitutes retailer
navigation; it does not prove live website compatibility.

Optional live checks use actual search results and perform one selected-product
visit:

```powershell
python scripts/verify_live_product_details.py --retailer Amazon --query "wireless mouse"
python scripts/verify_live_product_details.py --retailer Flipkart --query "wireless mouse"
```

These report extraction coverage or an explicit retrieval failure. A missing
field may reflect a changed selector, omitted retailer data, access restrictions,
or content requiring a location/login; inspect the actual page before changing
the parser.

## Verification recorded on 10 November 2026

- 43 Python tests passed, including signed API behavior and the new card layout.
- Four frontend tests passed: identity validation, safe rendering, fallback UI,
  request cancellation, stale-response protection and refresh.
- The React production build passed.
- The offline real-browser flow checks both retailer directions using synthetic
  pages, including delayed JavaScript content, refresh and recovery.
- A live Flipkart Logitech B170 listing yielded 28 specifications, purchase and
  original prices, images, rating/review counts, description, offers, seller,
  delivery and warranty. That listing supplied no parsed text highlights or
  selectable variants; those remain empty.
- Amazon returned an access-restriction page. Amazon extraction is covered by
  offline fixtures, but a successful live Amazon extraction was not verified.
