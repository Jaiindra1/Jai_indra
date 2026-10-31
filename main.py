import re
from threading import Lock

from flask import Flask, render_template, request, jsonify

from services.search_service import search_products
from services.feedback_service import send_feedback_email
from core import search_diagnostics as diagnostics
from core.browser import browser_health
from services.search_pagination import search_page, InvalidCursor, SearchUnavailable
from services.product_details import product_path, load_product, inr, InvalidProductLink, ExpiredProductLink
from services.product_comparison import compare_product, comparison_target, comparison_query
from retailers.pagination import page_url


app = Flask(
    __name__,
    template_folder="templates",
    static_folder="public/static",
    static_url_path="/static",
)
_browser_health_lock = Lock()
app.jinja_env.filters["inr"] = inr


@app.get("/product/<token>")
def product_detail(token):
    try:
        product = load_product(token)
        product["comparison_retailer"] = comparison_target(product)
        product["comparison_search_url"] = page_url(product["comparison_retailer"], comparison_query(product), 1)
        response = app.make_response(render_template("product_detail.html", product=product, error=None))
    except InvalidProductLink as error:
        response = app.make_response((render_template("product_detail.html", product=None, error=str(error)),
                                      410 if isinstance(error, ExpiredProductLink) else 404))
    response.headers["Cache-Control"] = "no-store"
    response.headers["Referrer-Policy"] = "no-referrer"
    return response


@app.post("/api/product/compare")
def product_compare():
    with diagnostics.request_scope() as request_id:
        data = request.get_json(silent=True)
        try:
            if not isinstance(data, dict) or not isinstance(data.get("token"), str):
                raise InvalidProductLink("Choose a product from search to compare its prices.")
            product = load_product(data["token"])
            result = compare_product(product)
            response = jsonify(result)
            if result["status"] == "busy":
                response.status_code = 503
                response.headers["Retry-After"] = "2"
        except InvalidProductLink as error:
            response = jsonify({"status": "invalid_product", "message": str(error)})
            response.status_code = 410 if isinstance(error, ExpiredProductLink) else 400
        response.headers["X-Search-Request-ID"] = request_id
        response.headers["Cache-Control"] = "no-store"
        return response


@app.get("/api/browser-health")
def browser_health_endpoint():
    # Do not launch concurrent health-check browsers within one function instance.
    if not _browser_health_lock.acquire(blocking=False):
        response = jsonify({"startup_success": False, "error_category": "check_in_progress"})
        response.status_code = 503
    else:
        try:
            with diagnostics.request_scope() as request_id:
                result = browser_health()
                response = jsonify(result)
                response.status_code = 200 if result["startup_success"] else 503
                response.headers["X-Search-Request-ID"] = request_id
        finally:
            _browser_health_lock.release()
    response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/health")
def health():
    """Application liveness only; does not launch Selenium or contact retailers."""
    response = jsonify({"status": "ok"})
    response.headers["Cache-Control"] = "no-store"
    return response


FEEDBACK_CATEGORIES = [
    "Bug report",
    "Feature suggestion",
    "User experience",
    "Product search issue",
    "Other",
]


def is_valid_email(email):
    if not email or len(email) > 254:
        return False

    if "\r" in email or "\n" in email:
        return False

    return re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email) is not None


@app.route("/", methods=["GET", "POST"])
def home():

    query = ""
    products = []
    message = ""

    if request.method == "POST":
        query = request.form.get("query", "").strip()

        if not query:
            message = "Please enter a product name."
        else:
            try:
                products = search_products(query, max_results=20)

                if not products:
                    message = "No products found. Try another search."

            except Exception:
                app.logger.exception("Product search failed")
                message = "Product search failed. Please try again later."

    for product in products:
        try:
            product["detail_url"] = product_path(product)
        except InvalidProductLink:
            product["detail_url"] = None
    return render_template(
        "index.html",
        query=query,
        products=products,
        message=message,
    )


# NEW: AJAX search endpoint.
@app.route("/api/search", methods=["POST"])
def api_search():
    with diagnostics.request_scope() as request_id:
        response = app.make_response(_api_search())
        response.headers["X-Search-Request-ID"] = request_id
        response.headers["Cache-Control"] = "no-store"
        if response.status_code == 503:
            response.headers["Retry-After"] = "2"
        diagnostics.event("api_response", stage="response", status=response.status_code)
        return response


def _api_search():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return _search_response_error("Please enter a product name.", 400)
    try:
        return _page_response(search_page(query=data.get("query"), first_retailer=data.get("retailer", "Flipkart")))
    except ValueError as error:
        return _search_response_error(str(error), 400)
    except SearchUnavailable as error:
        return jsonify({**error.result, "success": False}), error.status
    except Exception as error:
        diagnostics.event("search_failed", stage="pagination", status=500, **diagnostics.error_details(error))
        return _search_response_error("Product search failed. Please try again later.", 500)


def _page_response(result):
    response = jsonify(result)
    response.headers["Cache-Control"] = "no-store"
    response.headers["Server-Timing"] = "search;dur=" + str(result.get("elapsed_ms", 0))
    return response


def _search_response_error(message, status):
    return jsonify({"success": False, "message": message, "items": [], "products": [],
                    "next_cursor": None, "has_more": False, "warnings": []}), status


@app.get("/api/search/more")
def api_search_more():
    with diagnostics.request_scope() as request_id:
        try:
            priority = request.args.get("priority", "0")
            if priority not in {"0", "1"}:
                raise InvalidCursor("Invalid pending-retailer request.")
            response = _page_response(search_page(cursor=request.args.get("cursor", ""), prioritize_pending=priority == "1"))
        except InvalidCursor as error:
            response = app.make_response(_search_response_error(str(error), 400))
        except SearchUnavailable as error:
            response = app.make_response((jsonify({**error.result, "success": False}), error.status))
        except Exception as error:
            diagnostics.event("search_failed", stage="pagination", status=500, **diagnostics.error_details(error))
            response = app.make_response(_search_response_error("Unable to load more products. Please retry.", 500))
        response.headers["X-Search-Request-ID"] = request_id
        response.headers["Cache-Control"] = "no-store"
        if response.status_code == 503:
            response.headers["Retry-After"] = "2"
        diagnostics.event("api_response", stage="response", status=response.status_code)
        return response


@app.route("/feedback", methods=["GET", "POST"])
def feedback():

    form = {}

    if request.method == "GET":
        return render_template(
            "feedback.html",
            message="",
            form=form,
            categories=FEEDBACK_CATEGORIES,
        )

    form = {
        "name": request.form.get("name", "").strip(),
        "email": request.form.get("email", "").strip(),
        "category": request.form.get("category", "").strip(),
        "rating": request.form.get("rating", "").strip(),
        "feature": request.form.get("feature", "").strip(),
        "subject": request.form.get("subject", "").strip(),
        "message": request.form.get("message", "").strip(),
    }

    if request.form.get("website", "").strip():
        return render_template(
            "feedback.html",
            message="Unable to process this submission.",
            form={},
            categories=FEEDBACK_CATEGORIES,
        )

    if not all([
        form["name"],
        form["email"],
        form["category"],
        form["subject"],
        form["message"],
    ]):
        error_message = "Please complete all required fields."

    elif (
        len(form["name"]) > 80
        or len(form["email"]) > 254
        or len(form["subject"]) > 120
        or len(form["feature"]) > 100
        or len(form["message"]) > 3000
    ):
        error_message = "One or more fields exceed the allowed length."

    elif not is_valid_email(form["email"]):
        error_message = "Please enter a valid email address."

    elif form["category"] not in FEEDBACK_CATEGORIES:
        error_message = "Please select a valid feedback category."

    elif form["rating"] and form["rating"] not in ["1", "2", "3", "4", "5"]:
        error_message = "Please select a valid rating."

    else:
        error_message = ""

    if error_message:
        return render_template(
            "feedback.html",
            message=error_message,
            form=form,
            categories=FEEDBACK_CATEGORIES,
        )

    form["rating"] = int(form["rating"]) if form["rating"] else None

    try:
        send_feedback_email(form)

        return render_template(
            "feedback.html",
            message="Thank you! Your feedback has been submitted successfully.",
            form={},
            categories=FEEDBACK_CATEGORIES,
        )

    except Exception:
        app.logger.exception("Feedback email delivery failed")

        return render_template(
            "feedback.html",
            message="We couldn't send your feedback right now. Please try again later.",
            form=form,
            categories=FEEDBACK_CATEGORIES,
        )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
