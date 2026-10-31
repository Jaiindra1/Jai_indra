# Sandhya — Flask on Vercel, no database

The existing Flask app and Selenium searches are retained. Searches return live
results without SQLite, persistent cache, a product repository, or price history.

## Routing

Vercel's native Flask preset discovers `main.py:app`. No catch-all rewrite or
separate API function is needed. Flask keeps the original request paths.
Templates are explicitly included in the function bundle.

Assets live in `public/static/`, served by Vercel's CDN at `/static/...`.
Local Flask serves the same directory at the same URLs. Missing CSS and JavaScript
were restored from repository commit `e54bd29`.
Reference: https://vercel.com/docs/frameworks/backend/flask

## Product detail page

Product images, titles, cards and View Product links open `/product/<signed-snapshot>`.
The detail page adapts the supplied dashboard design and displays that selected
listing's image, title, price, original price, rating, highlights, category and
available specifications. Retailer buttons retain the real canonical marketplace
URL. Missing history, offers, delivery and warranty data are labelled honestly;
sample prices, accounts, recommendations and tracking data are not displayed.

Snapshots are signed server-side with a separate signing salt, require no database
for displaying the selected listing, and expire after 24 hours (or earlier if the deployment key
changes). Invalid links return 404 and expired links 410 with a search-page link.
Snapshots use `Cache-Control: no-store` and `Referrer-Policy: no-referrer`.
Detail tokens are attached only to outgoing search batches, not cursor buffers.
Back navigation retains search cards and pagination when the browser restores
the search page from its back/forward cache.

The supplied Tailwind theme is compiled into local static CSS; no Tailwind CDN
script is loaded in the product page. To rebuild its stylesheet after a design edit:

```powershell
npx --yes --package tailwindcss@3.4.17 tailwindcss -c scripts/product-tailwind.config.cjs -i scripts/product-tailwind.css -o public/static/css/product-detail.css --minify
```

The hamster animation uses 12.6px instead of its previous effective 14px base,
reducing all em-based dimensions by 10%.

## Live cross-retailer comparison

Opening a signed product page automatically calls `POST /api/product/compare`
with its snapshot token. Both retailer rows remain visible. The other retailer
is searched separately for the selected model and variant; this does not delay
the initial search response. The existing Selenium page adapters and browser
lock are reused, with a 14-second navigation/readiness budget and no database.

Matching checks brand, model identifiers, model family/suffix, network variant,
storage, RAM and colour where listed. Phone listings with incomplete selected
variant details cannot produce a verified comparison. A cheaper different
variant is rejected. Similar listings missing required evidence appear in a
separate, explicitly unverified panel, without a claimed saving. This conservative
listing matcher can miss equivalent wording and does not replace checking the
retailer's final product options and checkout price.

Unavailable retailers retain their row, a Retry action and a direct retailer
search link; no price is fabricated. Structured logs include `comparison_finished`,
`comparison_retailer_failed`, execution region and safe navigation HTTP status
and body length. No retailer response text or query is logged by those probes. A generic Amazon
503 can also trigger one diagnostic-only, two-second direct Python HTTPS probe
per worker to compare network outcomes; it never supplies product results.
The deployment uses the single Mumbai (`bom1`) region, supported on Hobby,
to reduce distance to Indian marketplaces. Region locality does not guarantee
Amazon will accept requests from Vercel infrastructure.

## Existing Amazon scraper and upstream failures

`retailers/amazon.py` remains the Amazon implementation. Its six title, price,
original-price, image, rating and card extraction functions are unchanged.
`search_amazon()` and `search_amazon_page()` share one bounded navigation path.
`retailers/pagination.py` delegates Amazon directly to that module, so initial
Amazon requests, continuation/infinite scrolling and cross-retailer comparison
all use the same parser and URL builder. Caller-owned browsers are reused.

The first page uses the original working `/s?k=...` URL, with `page` added only
for subsequent pages. Font blocking and eager navigation preserve image URLs.
Flipkart remains preferred for the initial response, so Amazon does not delay
its first real products. Error pages are identified immediately. A recognized generic HTTP 503 gets at
most one retry after two seconds, in the same browser and only when at least
four seconds remain in the existing deadline. For a first-page generic error, the retry may instead open Amazon's normal
homepage and submit its search form in the same browser. This establishes only
the site's own ordinary session cookies; no cookies are imported or overridden.
The form result is parsed without navigating to the search page again.
CAPTCHA, access-denied, automated-access and unknown pages are never retried. There is no CAPTCHA solving,
proxy rotation, identity spoofing, external product API or persistent storage.

Safe `navigation_probe` logs classify product results, confirmed empty pages,
CAPTCHA, automated-access notices, access denial, CDN errors and generic upstream
errors. Logs record HTTP status, known marketplace host, search-path boolean,
redirect count, DNS/connect/response timings and DOM size. They never contain
response text, query strings, cookies, full URLs or credentials. A generic 503
alone is not proof of an access restriction; only an explicit marker is labelled
as one. Public search/comparison messages show the sanitized retailer failure.

Local Windows verification returned 16 Amazon products on each of pages 1 and 2,
23 Flipkart products on page 1 and 6 on page 2. Olive 8 GB/128 GB variant matching
returned real prices on both retailers. Both Chrome 156 and Chrome 153 headless
shell returned Amazon products on Windows. Vercel uses Linux Chromium
153.0.8010.0 with compatible ChromeDriver 153.0.8010.52. These Windows checks do
not prove Linux/Vercel access; before this change, deployed Amazon requests
repeatedly returned HTTP 503. An initial production check of this change returned eight real Amazon products
in 4.75 seconds, but other searches and comparison still returned 503. Access
was intermittent; this is not a claim of reliable production comparison.
Production must be checked after every deployment.

Explicit live verification (contacts the retailers):

```powershell
py scripts/verify_amazon_search.py --live-local --query "Samsung A56"
py scripts/verify_amazon_search.py --base-url https://jai-indra.vercel.app --query "Samsung A56"
```

The scripts print measured counts, timings, pagination and comparison outcomes;
reports stay in ignored `.browser-downloads/`. Unit tests use synthetic HTML
only; production never returns these fixtures.

## Incremental search and infinite scrolling

`POST /api/search` accepts JSON `{"query":"Samsung A56"}` and returns up to eight
real products in `items` (`products` is retained as a compatibility alias), plus
`next_cursor`, `has_more`, `warnings`, `pending_retailers`, and `elapsed_ms`.
`GET /api/search/more?cursor=...` continues that search. The optional initial
`retailer` field can be `Amazon` or `Flipkart`; Flipkart is preferred by default
because production profiling showed its results were ready before Amazon's wait.

The initial response does not wait for both retailers. After first paint, the
frontend automatically requests the pending retailer with `priority=1`, without
requiring a scroll. That continuation preserves the first retailer's buffered
listings and appends real new-retailer products first. Requests remain serialized
and are cancelled on query changes. A generic pending-retailer 503 may be tried
once more after 2.5 seconds; its signed cursor bounds the attempts. CAPTCHA and
access-restriction pages are not retried.

Remaining products from
the already scraped marketplace page are carried in the signed cursor; buffered
requests start no browser. Without the pending-priority flag, or after the pending check, once that buffer
is exhausted, retailer-specific
adapters alternate Amazon and Flipkart and advance their actual `page` parameters.
They inspect next-page links and stop on exhausted or fully repeated pages.
No successful page is fetched again during a forward cursor sequence.

Cursors are opaque to callers, signed, validated, limited to 14,000 characters,
and expire after 30 minutes. They contain the query, unsent real listings, next
marketplace page numbers, warnings and hashed listing identities; no database,
Redis, worker cache, or persistent process state is needed. Tokens are signed,
not encrypted; do not treat them as secret storage. A random signing key is
packaged during the build and shared across workers of that deployment. Deploys
invalidate older cursors; optional `PAGINATION_SECRET` (32+ characters) can retain
validity across deploys. Local development uses an ignored `.pagination-secret`.

Deduplication uses Amazon ASINs, Flipkart listing PIDs, or canonical URLs, with
tracking parameters removed. Each search is bounded to eight pages per retailer
and 640 identities; hitting a limit is reported in warnings. Small or exhausted
marketplace pages can legitimately return fewer than eight listings.

The browser runs with eager page loading and blocks font network requests.
Image blocking was tested and rejected: three of 24 Flipkart listings lost image
metadata in the comparison. Images remain enabled and parsers also inspect lazy
image attributes; eager navigation avoids waiting for every download. A single
browser is reused sequentially if another retailer must be attempted. A semaphore
and a `/tmp` file lock restrict browser use within a function instance, including
multiple Python workers. Serverless ChromeDriver starts in a dedicated process
group. Normal shutdown still calls `driver.quit()`; a three-second watchdog
kills that owned group if shutdown stalls, so parsed results are not held behind
an unresponsive Chrome shutdown. Windows development keeps normal shutdown. Busy searches receive 503 with `Retry-After: 2` rather
than launching unbounded parallel browsers.

Navigation and result waits share an absolute operation deadline (13 seconds for
initial requests; 18 for continuation). Navigation is capped at eight seconds;
card readiness is capped at four seconds for Flipkart and five for deferred
Amazon requests. Amazon navigation/retry receives up to nine seconds within
the existing operation deadline. ChromeDriver startup is capped at five seconds for scraping.
Cold archive extraction, network latency and process cleanup can still add time;
these are engineering budgets, not a strict 15-second SLA. Logs report navigation,
readiness, parsing, normalization, cleanup and response timings under request IDs.

The frontend uses IntersectionObserver to request and append the next batch near
the grid's end. It deduplicates appended cards, preserves existing nodes and scroll
position, serializes requests, exposes retailer failures, offers Retry, and aborts
obsolete fetches on query changes. A Load more button supports keyboard access
and browsers without IntersectionObserver. Browser measurements are available in
`window.__sandhyaMetrics`, with a `sandhya:page-rendered` event after painting.

Baseline production profiling (before these changes): 32.21 seconds for the API,
6.31 seconds for Flipkart, 25.61 seconds for Amazon's unsuccessful card wait,
approximately 0.12 seconds per browser startup, and 1.8 ms for normalization.
A browser measurement showed the first products at 29.59 seconds, with 68 ms
spent appending/painting after the response. Amazon's delayed failure, rather
than normalization or frontend rendering, was the main bottleneck.

Run the Python suite and frontend race-condition tests:

```powershell
py -m unittest discover -s tests -v
node --test tests/search_controller.test.cjs tests/retailer_probe.test.cjs
py scripts/profile_pagination.py --base-url https://jai-indra.vercel.app --pages 6
py scripts/profile_pagination.py --base-url https://jai-indra.vercel.app --mobile --pages 3
```

The profiling commands contact real retailers through the deployed API. They check
first product paint time, additional scroll batches, uniqueness, required product
fields, retention of the first DOM card, and scroll-position preservation.

## Local commands

```powershell
py -m pip install -r requirements.txt
py -m unittest discover -s tests -v
py main.py
```

Open http://127.0.0.1:5000. Route tests mock retailer calls and do not send email.
They verify rendering, assets and MIME types, API validation, successful search
response contracts, retailer failure responses, feedback validation, and 404s.

## Deploy

1. Import the repository with the project root as Root Directory.
2. Use the **Flask** framework preset (also set in `vercel.json`). Clear old
   dashboard Build Command and Output Directory overrides. The repository sets
   `python scripts/build_browser.py` as the build command.
3. Deploy. No database configuration is needed.
4. For feedback email, set `MAIL_USERNAME`, `MAIL_PASSWORD` (Gmail App Password),
   and `FEEDBACK_RECIPIENT` in Vercel environment settings.

Check these requests against the deployment URL after deployment:

| Request | Expected |
| --- | --- |
| `GET /health` | 200 JSON `{"status":"ok"}`; Cache-Control: no-store |
| `GET /api/browser-health` | 200 if the browser starts; otherwise 503 with sanitized category |
| `GET /` | 200 HTML |
| `POST /api/search` with JSON `{"query":""}` | 400 JSON validation error |
| `GET /api/search` | 405 (POST required) |
| `GET /feedback` | 200 HTML |
| `GET /static/css/loader.css` | 200 CSS |
| `GET /static/css/search-page.css` | 200 CSS |
| `GET /static/css/hamster.css` | 200 CSS |
| `GET /static/js/search.js` | 200 JavaScript |
| `GET /static/missing.css` | 404 |

The health endpoint checks application liveness only. It does not start Selenium,
contact retailers, send email, or access storage.

## Runtime limits

### Diagnose a 502

Structured `[search-diagnostics]` logs are enabled automatically when `VERCEL=1`.
Set `SEARCH_DIAGNOSTICS=1` locally to enable them, or `0` to explicitly disable.
Every search response includes `X-Search-Request-ID`; match that to `request_id`
in runtime logs. Queries, credentials, raw exception messages, and retailer page
text are not emitted by these diagnostic events.

The API returns 502 when both retailer searches fail. A routing check or a healthy
`/health` response does not establish that browser startup or scraping works.

| Log event/stage | What to check |
| --- | --- |
| `browser_environment`, `binary_unavailable` | Chrome/ChromeDriver PATH, Manager cache, and explicit path availability |
| `binary_probe`, `linux_libraries` | Executable versions and missing shared libraries |
| `browser_start_failed` | Classified reason: driver discovery, missing browser, version mismatch, sandbox, etc. |
| `navigation_started` / `navigation_failed` | Retailer connectivity or navigation timeout |
| `stage_started` with `results_wait` | Waiting for retailer result elements |
| `retailer_page`, `parsing` | CAPTCHA/block classification, card/link counts, parsed product counts |
| `browser_cleanup_failed` | Driver quit failed |
| `processing_started` / `processing_finished` | Product normalization before JSON response |
| `retailer_unavailable`, `search_failed`, `api_response` | Failed retailer stage and final HTTP status |

If a request times out, the last stage event without a completion identifies where
execution stopped. Logs diagnose availability; they do not install Chrome or
ChromeDriver. Production availability must be checked in production logs, not
inferred from a successful local Windows browser session.

### Browser packaging

`.python-version` selects Python 3.12. The Linux x86-64 build downloads the
SHA-256-pinned artifacts in `scripts/browser-lock.json`:

- `@sparticuz/chromium` 153.0.0 contains serverless Chromium **153.0.8010.0**,
  AL2023 NSS/NSPR libraries, fonts, and SwiftShader support.
- Google Chrome for Testing ChromeDriver **153.0.8010.52** matches the browser's
  `MAJOR.MINOR.BUILD` (`153.0.8010`).

The build extracts these into `vendor/browser/`, copies transitive non-glibc
dependencies from the Linux build image, checks `ldd` and both versions, and
starts the exact production Selenium configuration on an offline `data:` page.
It fails rather than deploying if libraries, compatibility, startup, or the
320 MiB expanded browser budget cannot be satisfied. The first uncompressed
deployment was rejected with `LAMBDA_SIZE_EXCEEDED`: **274.91 MB exceeded this
project's effective 225 MB function budget**, despite the general documentation
advertising up to 500 MB for Python. The implementation therefore packages a
compressed archive (with a 160 MiB budget) instead of the expanded binaries.
The extracted artifacts before copying host libraries measured 244,863,379 bytes
(233.52 MiB). Final Linux bundle size is logged as `BROWSER_BUNDLE` during build.

No Linux binaries or download archives are committed to Git. `includeFiles`
explicitly packages generated `vendor/browser.tar.gz` and its integrity manifest.
Cold starts extract that **local archive** atomically into a versioned `/tmp`
directory, verify its checksum, and reuse the extracted executables on warm
invocations. There are no request-time downloads. The extracted binaries and
libraries use less than 320 MiB of the documented 500 MB `/tmp` space, leaving
space for browser profiles. The build tests startup again from the archive after
removing its expanded staging directory. Build downloads and tests are excluded
from the function.
Do not deploy a locally generated `--prepare-only` bundle: that option allows
artifact inspection on Windows but does not test Linux execution.

On Vercel, `core/browser.py` resolves explicit extracted paths, sets the library
search path for child processes, and never falls back to Selenium Manager.
`CHROME_BINARY_PATH` and `CHROMEDRIVER_PATH` can override the paths only as a pair.
Each browser gets its own writable `/tmp/sandhya-chrome-*` profile/cache/config
directory, which is removed after `quit()` or failed startup. Windows keeps its
existing local Chrome discovery behavior. The bundled browser is identified as
`chrome-headless-shell` so ChromeDriver creates its required initial page when a
custom writable profile is supplied. The serverless defaults are eager page
loading and a 20-second navigation timeout; environment overrides remain supported.

`/api/browser-health` starts a browser against an offline `data:` page and reports
availability, executability, actual browser/driver versions, startup success, and
a sanitized error category. It sends no retailer request and returns no paths,
exception messages, secrets, or stack traces. `/health` remains a cheap liveness
check that never starts Chrome. Avoid using browser-health as a high-frequency
uptime probe; it does consume function/browser resources.

Explicit live checks (contact retailers; not part of the normal unit suite):

```powershell
py scripts/verify_browser.py --live-local
py scripts/verify_browser.py --base-url https://jai-indra.vercel.app
```

The function duration is 120 seconds, within the documented Hobby Fluid Compute
limit. Retailer bot protection, network failures, and changing HTML may still
prevent results even with a working browser. A successful local Windows browser
or Linux build smoke test is not proof of production scraping; verify both the
deployed browser health and a real product search after deployment.

Sources:
- https://github.com/Sparticuz/chromium
- https://googlechromelabs.github.io/chrome-for-testing/
- https://vercel.com/docs/functions/limitations
- https://vercel.com/docs/functions/runtimes/python
