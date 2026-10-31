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

## Run and verify locally

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
320 MiB browser budget cannot be satisfied. Vercel also enforces its total
500 MB uncompressed Python function limit, including Python dependencies.
The extracted artifacts before copying host libraries measured 244,863,379 bytes
(233.52 MiB). Final Linux bundle size is logged as `BROWSER_BUNDLE` during build.

No Linux binaries or download archives are committed to Git. `includeFiles`
explicitly packages generated browser files in the Flask function; downloads
happen at build time only. The build cache and tests are excluded from the function.
Do not deploy a locally generated `--prepare-only` bundle: that option allows
artifact inspection on Windows but does not test Linux execution.

On Vercel, `core/browser.py` resolves explicit bundled paths, sets the library
search path for child processes, and never falls back to Selenium Manager.
`CHROME_BINARY_PATH` and `CHROMEDRIVER_PATH` can override the paths only as a pair.
Each browser gets its own writable `/tmp/sandhya-chrome-*` profile/cache/config
directory, which is removed after `quit()` or failed startup. Windows keeps its
existing local Chrome discovery behavior. The serverless defaults are eager page
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
