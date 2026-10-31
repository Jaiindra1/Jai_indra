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
