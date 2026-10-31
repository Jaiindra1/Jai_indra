# Sandhya — Vercel-only, no database (experimental)

- Existing Flask app and retailer Selenium scraping code retained.
- SQLite, product repository, and price tracking operations removed.
- Searches run live and return products directly; no history or persistent cache.
- Flask entrypoint: `api/index.py`; routes forwarded through `vercel.json`.

## Deploy
1. Push this directory to a new Git repository (do not commit `.env`).
2. Import repository into Vercel, select **Other** framework preset, and deploy.
3. Set SMTP environment variables in Vercel only if you need the feedback form.
4. Test `/` and `/api/search`; inspect Vercel function logs.

## Critical limitations
- **Chrome/ChromeDriver are not bundled.** Existing `core/browser.py` uses Selenium Manager unless explicit paths are configured. A working compatible Chrome binary and ChromeDriver must be available within Vercel's runtime. Browser startup is not guaranteed and is likely to fail without further browser packaging changes.
- `maxDuration: 60` is a requested function duration, subject to account/platform limits; it does not guarantee successful scraping.
- No persistent background worker, no durable SQLite, and no price history.
- The supplied extracted source directory did **not** contain `static/` assets referenced by `templates/index.html` (`static/css/*.css`, `static/js/search.js`). Restore those assets from the original project before deploying or the interface will be incomplete.
- Retailer bot protection, scraping delays, and Vercel execution limits may still cause timeouts.
- This is a code preparation artifact, **not** a verified working Vercel deployment.
