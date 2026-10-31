import os
from contextlib import nullcontext
import unittest
from unittest.mock import patch

from core.browser import BrowserBusy
from main import app
from retailers.pagination import RetailerPage
from retailers.outcomes import RetailerSearchError
from services.product_details import product_path
from services.product_comparison import match_variant, compare_product, comparison_query


class ComparisonTests(unittest.TestCase):
    def setUp(self):
        env = patch.dict(os.environ, {"PAGINATION_SECRET": "test-only-comparison-secret-32-characters"})
        env.start()
        self.addCleanup(env.stop)
        browser = patch("services.product_comparison.browser_session", return_value=nullcontext(object()))
        browser.start()
        self.addCleanup(browser.stop)
        self.selected = {"name": "Samsung Galaxy A56 5G (Awesome Olive, 256 GB)",
                         "highlights": ["8 GB RAM", "256 GB ROM"], "price": 39999,
                         "retailer": "Flipkart", "url": "https://www.flipkart.com/phone/p/itm123?pid=MOB12345678"}
        self.offer = {"name": "Samsung Galaxy A56 5G (Awesome Olive, 8GB RAM, 256GB Storage)",
                      "price": 37999, "retailer": "Amazon", "url": "https://www.amazon.in/title/dp/B012345678"}

    def test_exact_model_memory_and_colour_match(self):
        self.assertEqual(match_variant(self.selected, self.offer), ("verified", []))
        self.assertIn("256 GB", comparison_query(self.selected))
        self.assertIn("8 GB RAM", comparison_query(self.selected))

    def test_wrong_model_memory_colour_and_accessory_are_never_compared(self):
        for name in [self.offer["name"].replace("A56", "A55"),
                     self.offer["name"].replace("256GB", "128GB"),
                     self.offer["name"].replace("8GB", "12GB"),
                     self.offer["name"].replace("Olive", "Graphite"),
                     "Case cover for " + self.offer["name"]]:
            with self.subTest(name=name):
                self.assertEqual(match_variant(self.selected, {**self.offer, "name": name})[0], "different")

    def test_missing_variant_fields_are_unverified_not_a_verified_low_price(self):
        unknown = {**self.offer, "name": "Samsung Galaxy A56 5G (Awesome Olive, 256GB)"}
        status, fields = match_variant(self.selected, unknown)
        self.assertEqual(status, "unverified")
        self.assertIn("ram", fields)
        with patch("services.product_comparison.scrape_page", return_value=RetailerPage([unknown], False)):
            result = compare_product(self.selected)
        self.assertIsNone(result["offer"])
        self.assertIsNotNone(result["related_offer"])
        self.assertEqual(result["status"], "variant_unverified")

    def test_iphone_pro_and_base_are_different_models(self):
        source = {"name": "Apple iPhone 16 (Black, 256 GB)"}
        self.assertEqual(match_variant(source, {"name": "Apple iPhone 16 Pro (Black, 256 GB)"})[0], "different")
        self.assertEqual(match_variant(source, {"name": "Apple iPhone16 (Black, 256GB)"})[0], "verified")

    def test_galaxy_family_without_repeated_brand_and_marketing_suffix(self):
        offer = {**self.offer, "name": self.offer["name"].replace("Samsung ", "") + " | Google AI editing"}
        self.assertEqual(match_variant(self.selected, offer), ("verified", []))

    def test_cheapest_verified_offer_is_selected_without_using_other_variants(self):
        wrong = {**self.offer, "name": self.offer["name"].replace("256GB", "128GB"), "price": 19999}
        second = {**self.offer, "price": 38999, "url": "https://www.amazon.in/dp/B012345679"}
        with patch("services.product_comparison.scrape_page", return_value=RetailerPage([wrong, second, self.offer], False)):
            result = compare_product(self.selected)
        self.assertEqual(result["status"], "matched")
        self.assertEqual(result["offer"]["price"], 37999)
        self.assertEqual(result["matches"], 2)

    def test_unavailable_retailer_keeps_row_without_a_fabricated_price(self):
        with patch("services.product_comparison.scrape_page", side_effect=RetailerSearchError("Amazon", "upstream_http_503")):
            result = compare_product(self.selected)
        self.assertEqual(result["status"], "unavailable")
        self.assertEqual(result["reason"], "upstream_http_503")
        self.assertIsNone(result["offer"])
        self.assertIn("amazon.in", result["search_url"])

    def test_signed_endpoint_and_busy_retry_status(self):
        token = product_path(self.selected).split("/product/", 1)[1]
        with patch("services.product_comparison.scrape_page", return_value=RetailerPage([self.offer], False)):
            response = app.test_client().post("/api/product/compare", json={"token": token})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["status"], "matched")
        self.assertEqual(response.headers["Cache-Control"], "no-store")
        with patch("services.product_comparison.browser_session", side_effect=BrowserBusy):
            response = app.test_client().post("/api/product/compare", json={"token": token})
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.headers["Retry-After"], "2")
        self.assertEqual(app.test_client().post("/api/product/compare", json={"token": "invalid"}).status_code, 400)

    def test_comparison_works_in_reverse_for_selected_amazon_listing(self):
        selected = {**self.offer, "highlights": ["8 GB RAM", "256 GB Storage"]}
        flipkart = {**self.selected, "price": 36999, "specifications": {"RAM": "8 GB", "Storage": "256 GB"}}
        with patch("services.product_comparison.scrape_page", return_value=RetailerPage([flipkart], False)):
            result = compare_product(selected)
        self.assertEqual(result["retailer"], "Flipkart")
        self.assertEqual(result["status"], "matched")
        self.assertEqual(result["offer"]["price"], 36999)


if __name__ == "__main__":
    unittest.main()
