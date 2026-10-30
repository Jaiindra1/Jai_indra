import re

from flask import Flask, render_template, request, jsonify

from services.search_service import search_products
from services.feedback_service import send_feedback_email
from retailers.outcomes import AllRetailersFailed


app = Flask(__name__, template_folder="templates")


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
                warning = getattr(products, "persistence", {}).get("warning", "")
                if warning:
                    message = f"{message} {warning}".strip()

            except Exception:
                app.logger.exception("Product search failed")
                message = "Product search failed. Please try again later."

    return render_template(
        "index.html",
        query=query,
        products=products,
        message=message,
    )


# NEW: AJAX search endpoint.
@app.route("/api/search", methods=["POST"])
def api_search():

    # Read the search query from the JSON request.
    data = request.get_json(silent=True) or {}
    query = data.get("query", "")

    # Validate the query.
    if not isinstance(query, str) or not query.strip():
        return jsonify({
            "success": False,
            "message": "Please enter a product name.",
            "products": [],
        }), 400

    query = query.strip()

    try:
        # Reuse the existing product-search service.
        products = search_products(query, max_results=20)

        return jsonify({
            "success": True,
            "message": (
                "Products found successfully."
                if products
                else "No matching products found. Try another search."
            ),
            "products": products,
            "persistence": getattr(products, "persistence", {}),
        }), 200

    except AllRetailersFailed:
        app.logger.error("AJAX product search failed: all retailers unavailable")
        return jsonify({
            "success": False,
            "message": "Retailer searches are unavailable. Please try again later.",
            "products": [],
        }), 502

    except Exception:
        app.logger.exception("AJAX product search failed")

        return jsonify({
            "success": False,
            "message": "Product search failed. Please try again later.",
            "products": [],
        }), 500


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
