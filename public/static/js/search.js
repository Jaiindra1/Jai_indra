// Find the existing search form.
const searchForm = document.getElementById("search-form");

// Find the loading overlay.
const searchLoader = document.getElementById("search-loader");

// Find the loading message.
const loaderMessage = document.getElementById("loader-message");

// Find the product results container.
const resultsContainer = document.getElementById("results-container");


// Messages that rotate while products are being fetched.
const loadingMessages = [
    "I'm getting product details...",
    "Searching Flipkart and Amazon...",
    "Collecting product prices...",
    "Checking available products...",
    "Almost there! Preparing your results..."
];


// Change the loading message every three seconds.
let messageInterval = null;


// Maximum time the browser waits for a response.
const SEARCH_TIMEOUT = 25000;


// Show the loading animation.
function showLoader() {

    searchLoader.classList.add("active");
    searchLoader.setAttribute("aria-hidden", "false");

    if (messageInterval !== null) clearInterval(messageInterval);

    resultsContainer.setAttribute("aria-busy", "true");
    let messageIndex = 0;

    loaderMessage.textContent = loadingMessages[messageIndex];

    messageInterval = setInterval(() => {

        messageIndex = (messageIndex + 1) % loadingMessages.length;

        loaderMessage.textContent = loadingMessages[messageIndex];

    }, 3000);
}


// Hide the loading animation.
function hideLoader() {

    searchForm.querySelector('button[type="submit"]').disabled = false;
    resultsContainer.setAttribute("aria-busy", "false");
    searchLoader.classList.remove("active");
    searchLoader.setAttribute("aria-hidden", "true");

    if (messageInterval !== null) {
        clearInterval(messageInterval);
        messageInterval = null;
    }
}


// Safely create a text element.
function createTextElement(tag, text, className = "") {

    const element = document.createElement(tag);

    element.textContent = text ?? "";

    if (className) {
        element.className = className;
    }

    return element;
}


// Accept only valid HTTP or HTTPS URLs.
function isSafeUrl(value) {

    if (typeof value !== "string" || !value.trim()) {
        return false;
    }

    try {
        const url = new URL(value);

        return url.protocol === "http:" || url.protocol === "https:";

    } catch {
        return false;
    }
}


// Display products returned by Flask.
function displayProducts(products, append = false) {

    if (!append) resultsContainer.replaceChildren();
    if (append && (!products || !products.length)) return;

    if (!products || products.length === 0) {

        resultsContainer.append(
            createTextElement("p", "No matching products found.")
        );

        return;
    }

    const grid = resultsContainer.querySelector(".products-grid") || document.createElement("div");
    grid.className = "products-grid";

    products.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.productId = product.id || product.url;

        card.append(
            createTextElement("p", product.retailer, "product-retailer")
        );

        if (isSafeUrl(product.image_url)) {

            const image = document.createElement("img");

            image.src = product.image_url;
            image.alt = product.name || "Product image";
            image.loading = "lazy";

            const wrapper = document.createElement("div");
            wrapper.className = "product-image-wrapper";
            wrapper.append(image);
            card.append(wrapper);
        }

        card.append(
            createTextElement("h3", product.name, "product-title")
        );

        if (Array.isArray(product.highlights) && product.highlights.length) {
            const highlights = document.createElement("div");
            highlights.className = "product-highlights";
            product.highlights.slice(0, 5).forEach(highlight => {
                if (typeof highlight === "string" && highlight.trim()) {
                    highlights.append(createTextElement("span", highlight, "highlight-chip"));
                }
            });
            if (highlights.childElementCount) card.append(highlights);
        }

        if (product.price !== null && product.price !== undefined) {
            card.append(
                createTextElement(
                    "p",
                    `₹${product.price}`,
                    "product-price"
                )
            );
        }

        if (product.original_price !== null &&
            product.original_price !== undefined) {

            card.append(
                createTextElement(
                    "p",
                    `Original price: ₹${product.original_price}`,
                    "product-original-price"
                )
            );
        }

        if (product.rating !== null && product.rating !== undefined) {
            card.append(
                createTextElement("p", `Rating: ${product.rating}`, "product-rating")
            );
        }

        if (product.availability) {
            card.append(
                createTextElement("p", product.availability, "product-availability")
            );
        }

        if (isSafeUrl(product.url)) {

            const link = document.createElement("a");

            link.className = "product-button";
            link.href = product.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "View Product";

            card.append(link);
        }

        grid.append(card);
    });

    if (!grid.isConnected) resultsContainer.append(grid);
}



const notices = document.createElement("div");
notices.className = "search-notice";
notices.setAttribute("role", "status");
resultsContainer.before(notices);
const controls = document.createElement("div");
controls.className = "pagination-controls";
const sentinel = document.createElement("div");
sentinel.className = "pagination-sentinel";
sentinel.id = "pagination-sentinel";
sentinel.setAttribute("aria-hidden", "true");
const paginationStatus = document.createElement("p");
paginationStatus.className = "pagination-status";
paginationStatus.setAttribute("role", "status");
const moreButton = document.createElement("button");
moreButton.className = "pagination-button";
moreButton.type = "button";
moreButton.hidden = true;
controls.append(sentinel, paginationStatus, moreButton);
resultsContainer.after(controls);
const rendered = new Set();
let searchStarted = 0;
let lastApiMs = 0;
let observer;
window.__sandhyaMetrics = {pages: []};

async function fetchPage({query, cursor, signal}) {
    const started = performance.now();
    const timeout = new AbortController();
    const abort = () => timeout.abort();
    signal.addEventListener("abort", abort, {once: true});
    const timer = setTimeout(abort, cursor ? 35000 : SEARCH_TIMEOUT);
    try {
        const response = await fetch(cursor ? "/api/search/more?cursor=" + encodeURIComponent(cursor) : "/api/search", {
            method: cursor ? "GET" : "POST",
            headers: {"Content-Type": "application/json"},
            body: cursor ? undefined : JSON.stringify({query}),
            signal: timeout.signal,
            cache: "no-store"
        });
        const data = await response.json();
        lastApiMs = performance.now() - started;
        data.request_id = response.headers.get("X-Search-Request-ID");
        if (!response.ok || !data.success) {
            const expired = response.status === 400 && cursor;
            const error = new Error(expired ? "This search has expired. Retry to start it again." : data.message || "Unable to load products. Please retry.");
            error.restart = Boolean(expired);
            throw error;
        }
        return data;
    } catch (error) {
        if (error.name === "AbortError" && !signal.aborted) throw new Error("The search is taking longer than expected. Please retry.");
        throw error;
    } finally {
        clearTimeout(timer);
        signal.removeEventListener("abort", abort);
    }
}

const pager = new window.SandhyaPager({
    fetchPage,
    onPage(data, append) {
        if (!append) rendered.clear();
        const fresh = (data.items || []).filter(product => {
            const id = product.id || product.url;
            if (!id || rendered.has(id)) return false;
            rendered.add(id);
            return true;
        });
        const renderStarted = performance.now();
        const generation = pager.generation;
        const apiMs = lastApiMs;
        displayProducts(fresh, append);
        if (!append && !fresh.length) resultsContainer.replaceChildren(createTextElement("p", data.message || "No matching products found."));
        const warnings = [...new Set((data.warnings || []).map(w =>
            ["page_limit", "duplicate_page", "invalid_listings"].includes(w.stage)
                ? w.message : w.retailer + " listings are unavailable right now."))];
        notices.classList.toggle("warning", warnings.length > 0);
        notices.textContent = warnings.length ? warnings.join(" ") : (data.pending_retailers || []).length ? "More retailers and listings load as you continue scrolling." : "";
        if (!append && fresh.length) resultsContainer.scrollIntoView({behavior: "smooth", block: "start"});
        requestAnimationFrame(() => requestAnimationFrame(() => {
            if (generation !== pager.generation) return;
            const metrics = {request_id: data.request_id, api_ms: apiMs,
                render_paint_ms: performance.now() - renderStarted, items: fresh.length,
                total_items: rendered.size};
            window.__sandhyaMetrics.pages.push(metrics);
            if (!append && fresh.length) {
                window.__sandhyaMetrics.first_product_ms = performance.now() - searchStarted;
                window.__sandhyaMetrics.first_api_ms = apiMs;
            }
            window.dispatchEvent(new CustomEvent("sandhya:page-rendered", {detail: metrics}));
            maybeLoadMore();
        }));
    },
    onStatus(state) {
        if (state.loading && !state.loaded) showLoader();
        else hideLoader();
        const loadingMore = state.loading && state.loaded;
        paginationStatus.classList.toggle("loading", loadingMore);
        paginationStatus.textContent = state.error || (loadingMore ? "Loading more products..." : state.loaded && !state.hasMore ? "You have reached the end of this search." : "");
        moreButton.hidden = !state.error && !state.hasMore;
        moreButton.disabled = state.loading;
        moreButton.textContent = state.error ? "Retry" : "Load more";
        controls.setAttribute("aria-busy", String(loadingMore));
    }
});

function maybeLoadMore() {
    if (!pager.loading && !pager.error && pager.hasMore && sentinel.getBoundingClientRect().top < window.innerHeight + 400) pager.more();
}
if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) pager.more();
    }, {rootMargin: "400px 0px"});
    observer.observe(sentinel);
}
moreButton.addEventListener("click", () => pager.error ? pager.retry() : pager.more());
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const query = new FormData(searchForm).get("query")?.trim();
    if (!query) return;
    searchStarted = performance.now();
    window.__sandhyaMetrics = {pages: []};
    notices.textContent = "";
    pager.search(query);
});
document.getElementById("product-query").addEventListener("input", () => {
    if (pager.loading || pager.hasMore || pager.error) {
        pager.cancel();
        notices.textContent = "Press Find products to search for your updated query.";
    }
});
hideLoader();
window.addEventListener("pageshow", event => { if (event.persisted) { pager.cancel(); hideLoader(); } });
