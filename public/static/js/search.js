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
const SEARCH_TIMEOUT = 90000;


// Show the loading animation.
function showLoader() {

    searchLoader.classList.add("active");
    searchLoader.setAttribute("aria-hidden", "false");

    if (messageInterval !== null) clearInterval(messageInterval);
    searchForm.querySelector('button[type="submit"]').disabled = true;
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
function displayProducts(products) {

    resultsContainer.replaceChildren();

    if (!products || products.length === 0) {

        resultsContainer.append(
            createTextElement("p", "No matching products found.")
        );

        return;
    }

    const grid = document.createElement("div");
    grid.className = "products-grid";

    products.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

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

    resultsContainer.append(grid);
}


// Handle the search form submission.
searchForm.addEventListener("submit", async function (event) {

    // Prevent the normal page reload.
    event.preventDefault();

    const formData = new FormData(searchForm);

    const query = formData.get("query")?.trim();

    if (!query) {
        alert("Please enter a product name.");
        return;
    }

    // Create a controller to manage request timeout.
    const controller = new AbortController();

    let timeoutId;

    showLoader();

    try {

        // Abort the browser request if it takes longer than 90 seconds.
        timeoutId = setTimeout(() => {
            controller.abort();
        }, SEARCH_TIMEOUT);

        // Send the query to Flask.
        const response = await fetch("/api/search", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                query: query
            }),

            signal: controller.signal

        });

        // Convert Flask's JSON response.
        const data = await response.json();

        if (!response.ok || !data.success) {

            resultsContainer.replaceChildren(
                createTextElement(
                    "p",
                    data.message || "Unable to complete the search."
                )
            );

            return;
        }

        // Display the returned products.
        displayProducts(data.products);

    } catch (error) {

        if (error.name === "AbortError") {

            resultsContainer.replaceChildren(
                createTextElement(
                    "p",
                    "The search is taking longer than expected. Please try again."
                )
            );

        } else {

            console.error("Search error:", error);

            resultsContainer.replaceChildren(
                createTextElement(
                    "p",
                    "Something went wrong. Please try again."
                )
            );
        }

    } finally {

        // Clear the timeout.
        clearTimeout(timeoutId);

        // Stop the message animation and hide the hamster.
        hideLoader();
    }

});
// Dismiss the initial page loader when page resources have loaded.
if (document.readyState === "complete") {
    hideLoader();
} else {
    window.addEventListener("load", hideLoader, { once: true });
}
window.addEventListener("pageshow", (event) => {
    if (event.persisted) hideLoader();
});
