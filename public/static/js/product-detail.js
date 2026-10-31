"use strict";
document.querySelectorAll("[data-back-search]").forEach(link => {
    link.addEventListener("click", event => {
        try {
            const previous = new URL(document.referrer);
            if (previous.origin === location.origin && previous.pathname === "/" && history.length > 1) {
                event.preventDefault();
                history.back();
            }
        } catch { /* A shared/direct link uses the normal search-page link. */ }
    });
});
const image = document.getElementById("product-image");
function showImageFallback() {
    image.hidden = true;
    const fallback = document.getElementById("product-image-fallback");
    fallback.classList.remove("hidden");
    fallback.classList.add("flex");
}
if (image) {
    image.addEventListener("error", showImageFallback);
    if (image.complete && !image.naturalWidth) showImageFallback();
}
document.getElementById("share-product")?.addEventListener("click", async () => {
    const status = document.getElementById("share-status");
    try {
        if (navigator.share) await navigator.share({title: document.title, url: location.href});
        else if (navigator.clipboard) {
            await navigator.clipboard.writeText(location.href);
            status.textContent = "Product link copied. Search snapshots are available for up to 24 hours.";
        } else status.textContent = "Copy the address from your browser to share this product.";
    } catch (error) {
        if (error.name !== "AbortError") status.textContent = "Copy the address from your browser to share this product.";
    }
});

const comparison = document.getElementById("retailer-matrix");
if (comparison) {
    const button = document.getElementById("compare-button");
    const status = document.getElementById("comparison-status");
    const price = document.getElementById("comparison-price");
    const match = document.getElementById("comparison-match");
    const link = document.getElementById("comparison-link");
    const retailer = comparison.dataset.comparisonRetailer;
    const originalSearch = link.href;
    let pending = false;
    let controller;
    let retryTimer;
    const money = value => new Intl.NumberFormat("en-IN", {style:"currency", currency:"INR", minimumFractionDigits:0, maximumFractionDigits:2}).format(value);
    function safeRetailerUrl(value) {
        try {
            const url = new URL(value);
            return url.protocol === "https:" && url.hostname.replace(/^www\./, "") === (retailer === "Amazon" ? "amazon.in" : "flipkart.com");
        } catch { return false; }
    }
    async function runComparison(attempt = 0) {
        if (pending) return;
        clearTimeout(retryTimer);
        pending = true;
        controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 22000);
        button.disabled = true;
        button.textContent = "Checking...";
        status.dataset.state = "loading";
        status.textContent = "Checking " + retailer + " for the same model and variant...";
        price.textContent = "Checking...";
        match.textContent = "Looking for the same variant";
        document.getElementById("comparison-related").hidden = true;
        try {
            const response = await fetch("/api/product/compare", {
                method:"POST", headers:{"Content-Type":"application/json"}, cache:"no-store",
                body:JSON.stringify({token:location.pathname.slice("/product/".length)}), signal:controller.signal
            });
            const data = await response.json();
            window.__comparisonResult = {...data, request_id:response.headers.get("X-Search-Request-ID")};
            status.dataset.state = data.status;
            status.textContent = data.message || "Comparison is unavailable. Please retry.";
            price.textContent = "Unavailable";
            match.textContent = data.status === "no_match" ? "Exact variant not found" : data.status === "variant_unverified" ? "Variant needs confirmation" : "Could not verify a price";
            link.href = originalSearch;
            link.textContent = "Search on " + retailer;
            if (data.status === "busy" && attempt < 2) {
                status.textContent = "A search is finishing. Retrying this comparison shortly...";
                retryTimer = setTimeout(() => runComparison(attempt + 1), (attempt + 1) * 2000);
            } else if (data.status === "matched" && data.offer && safeRetailerUrl(data.offer.url)) {
                price.textContent = money(data.offer.price);
                match.textContent = "Same model and variant";
                link.href = data.offer.url;
                link.textContent = "View deal on " + retailer;
                const selected = Number(comparison.dataset.selectedPrice);
                if (selected > 0 && selected > data.offer.price) status.textContent += " " + retailer + " lists it for " + money(selected - data.offer.price) + " less than your selected search price.";
                button.textContent = "Refresh comparison";
            } else if (data.status === "variant_unverified" && data.related_offer && safeRetailerUrl(data.related_offer.url)) {
                const offer = data.related_offer;
                document.getElementById("comparison-related").hidden = false;
                document.getElementById("comparison-related-name").textContent = offer.name;
                document.getElementById("comparison-related-price").textContent = money(offer.price) + " - please confirm " + offer.unverified_fields.join(", ") + ".";
                document.getElementById("comparison-related-link").href = offer.url;
            }
        } catch (error) {
            status.dataset.state = "unavailable";
            status.textContent = error.name === "AbortError" ? "The retailer check took too long. Please retry or check the retailer directly." : "The comparison could not load. Please retry.";
            price.textContent = "Unavailable";
            match.textContent = "Price not verified";
        } finally {
            clearTimeout(timeout);
            pending = false;
            button.disabled = false;
            if (button.textContent === "Checking...") button.textContent = "Retry comparison";
        }
    }
    button.addEventListener("click", () => runComparison());
    window.addEventListener("pagehide", () => { clearTimeout(retryTimer); controller?.abort(); });
    runComparison();
}
