import os
import unittest
from unittest.mock import patch

os.environ["RETAILER_MODE"] = "fixture"

from retailers.fixture_acquisition import fixture_product_details, fixture_search_page
from services.product_details import InvalidProductLink, load_product, product_path
from services.retailer_mode import RetailerModeError, retailer_mode
from services.search_pagination import SearchUnavailable, search_page
from services.product_comparison import compare_product
from services.ai.ai_provider import AIUnavailable


class FixtureModeTests(unittest.TestCase):
    def test_mode_is_explicit_and_strict(self):
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaises(RetailerModeError):
                retailer_mode()
        with patch.dict(os.environ, {"RETAILER_MODE": "unexpected"}):
            with self.assertRaises(RetailerModeError):
                retailer_mode()

    def test_search_html_uses_both_existing_parsers(self):
        amazon = fixture_search_page("Amazon", "Apple Mac mini M6", 1).items
        flipkart = fixture_search_page("Flipkart", "Apple Mac mini M6", 1).items
        self.assertTrue(any("Mac mini" in item["name"] for item in amazon))
        self.assertTrue(any("Mac mini" in item["name"] for item in flipkart))
        self.assertTrue(any("iPhone" in item["name"] for item in amazon + flipkart))
        self.assertTrue(any("Keyboard" in item["name"] for item in amazon + flipkart))

    def test_detail_html_uses_existing_parser_and_normalizer(self):
        item = fixture_product_details("https://www.amazon.in/dp/B0M6MINI01", "Amazon")
        self.assertEqual(item["data_source"], "fixture")
        self.assertFalse(item["is_live"])
        self.assertEqual(item["normalized_attributes"]["storage"], "256GB")
        flipkart = fixture_product_details(
            "https://www.flipkart.com/apple/p/itm0000000000001?pid=MACMINIM601", "Flipkart")
        self.assertEqual(flipkart["normalized_attributes"]["storage"], "256GB")

    def test_search_response_and_products_are_source_labelled(self):
        result = search_page(query="Apple Mac mini M6", first_retailer="Amazon")
        self.assertEqual(result["data_source"], "fixture")
        self.assertFalse(result["is_live"])
        self.assertTrue(result["items"])
        self.assertTrue(all(item["data_source"] == "fixture" and not item["is_live"] for item in result["items"]))

    def test_fixture_snapshot_is_rejected_in_live_mode(self):
        result = search_page(query="Apple Mac mini M6", first_retailer="Amazon")
        token = result["items"][0]["detail_url"].split("/product/", 1)[1]
        with patch.dict(os.environ, {"RETAILER_MODE": "live"}):
            with self.assertRaises((RetailerModeError, InvalidProductLink)):
                load_product(token)

    def test_live_failure_never_falls_back_to_fixture(self):
        with patch.dict(os.environ, {"RETAILER_MODE": "live"}), \
             patch("services.search_pagination.browser_session", side_effect=OSError("driver blocked")), \
             patch("retailers.fixture_acquisition.fixture_search_page") as fixture_search:
            with self.assertRaises(SearchUnavailable):
                search_page(query="Apple Mac mini M6", first_retailer="Amazon")
            fixture_search.assert_not_called()

    def test_snapshot_preserves_source(self):
        item = search_page(query="Apple Mac mini M6", first_retailer="Amazon")["items"][0]
        token = product_path(item).split("/product/", 1)[1]
        loaded = load_product(token)
        self.assertEqual(loaded["data_source"], "fixture")
        self.assertFalse(loaded["is_live"])

    def test_fixture_comparison_matches_capacity_and_rejects_noise(self):
        selected = fixture_product_details("https://www.amazon.in/dp/B0M6MINI01", "Amazon")
        selected.update(id="fixture-m6", retailer="Amazon", url="https://www.amazon.in/dp/B0M6MINI01")
        provider = type("UnavailableProvider", (), {"generate": lambda self, *_: (_ for _ in ()).throw(AIUnavailable())})()
        result = compare_product(selected, provider=provider)
        self.assertEqual(result["status"], "matched")
        self.assertEqual(result["data_source"], "fixture")
        self.assertFalse(result["is_live"])
        self.assertEqual(len(result["candidates"]), 1)
        self.assertIn("Mac mini", result["matched_product"]["name"])


if __name__ == "__main__":
    unittest.main()
