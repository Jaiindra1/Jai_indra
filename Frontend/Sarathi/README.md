# DealSense React + Tailwind UI

Modular Vite/React conversion of the supplied HTML designs. Pages live in `src/components/pages/`, with shared navigation, header and Tailwind design tokens. Original HTML is preserved in `reference/`.

## Run

```bash
npm install
npm run dev
npm run build
```

## Find Your Products

Open **Find Your Products** in the sidebar, or visit `/find-your-products`.
The header search also opens this page. It uses the original Flask search behind
`templates/index.html`; no new scraper or search optimizer is introduced.

Run the Flask backend from the repository root in one terminal:

```powershell
$env:RETAILER_MODE = "fixture"
python main.py
```

Fixture mode parses saved Amazon and Flipkart HTML through the same production
parsers and visibly labels all prices as demo data. Set `RETAILER_MODE=live` only
where Selenium is permitted to start; there is no automatic fixture fallback.

Run `npm run dev` from this frontend folder in another terminal. Vite proxies
`/api`, `/static`, and `/product/` to `http://127.0.0.1:5000`. For a different backend
address set `DEALSENSE_BACKEND_URL` before starting Vite. Restart Vite after changing
that environment variable. Production hosting must route those same paths to Flask;
a standalone Vite preview/static build does not provide the backend.

The React page loads the original `/static/js/search-controller.js` once and reuses
SearchPager for cancellation, stale-response protection, pending-retailer checks,
expired cursors and retries. It calls POST `/api/search` and GET `/api/search/more`,
deduplicates cards by the existing product ID/URL, and opens React product
details. It reuses the hamster loader and existing visual tokens. Initial searches
have a 25-second request timeout and continuations 35 seconds, as in the original
search UI. Editing the query cancels old pagination. Leaving search pauses
outstanding work. ProductSearchProvider stays mounted above the routes, keeping
the loaded records, cursor, query and scroll position in memory. Returning with
browser Back or the product page's search link resumes that session, without
another initial POST. Explicitly submitting the same query still starts a fresh
search. A hard browser refresh resets this in-memory session.

## React product details

Search cards use React Router links to `/products/:id?snapshot=<signed-token>`;
they do not navigate to the Flask HTML product page. The route renders modular
ProductOverview, ProductRetailerDetails and ProductSpecifications components. A direct
or refreshed detail URL calls `GET /api/products/<token>`: Flask verifies the same
signed, expiring snapshot used by existing HTML links and returns JSON with
no-store/no-referrer headers. React also verifies that the product ID matches the
route. Invalid/expired links provide a safe return-to-search action.

Legacy `/product/<token>` HTML links continue to work for the original Flask frontend. `/product-detail`
without a selected product redirects to search instead of showing demo data.

Run search client/controller tests from the repository root:

```powershell
node --test tests/product_navigation.test.cjs tests/product_search.test.mjs tests/search_controller.test.cjs tests/retailer_probe.test.cjs
```

## Notes
- Find Your Products uses live search APIs. Other imported design screens remain prototypes; their original inline scripts are not executed.
- The price parity screen has no connected observation feed and shows an empty state.
- Tracking, checkout, notification subscriptions and automatic price monitoring are not connected to backend services.
- Navigation lists implemented pages; unavailable category pages are not linked.
- Shared styles live in Tailwind config and `src/components/styles/index.css`.
