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
   dashboard Build Command and Output Directory overrides; use preset defaults.
3. Deploy. No database configuration is needed.
4. For feedback email, set `MAIL_USERNAME`, `MAIL_PASSWORD` (Gmail App Password),
   and `FEEDBACK_RECIPIENT` in Vercel environment settings.

Check these requests against the deployment URL after deployment:

| Request | Expected |
| --- | --- |
| `GET /health` | 200 JSON `{"status":"ok"}`; Cache-Control: no-store |
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

Chrome/ChromeDriver are not bundled. Live Selenium searches on Vercel still require
compatible browser binaries and may encounter retailer bot protection or function
timeouts. The requested duration is 60 seconds. Routing tests do not verify live
scraping, browser availability, email delivery, or a production deployment.
