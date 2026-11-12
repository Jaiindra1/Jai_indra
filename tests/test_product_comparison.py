import os
import unittest
from types import SimpleNamespace
from unittest.mock import patch

os.environ["RETAILER_MODE"] = "fixture"

from core.browser import BrowserBusy
from retailers.outcomes import RetailerSearchError
from services.ai.ai_config import AIConfig
from services.ai.ai_provider import AIProvider, AIUnavailable
from services.product_comparison import attributes, deterministic_query, deterministic_verdict, optimized_query, compare_product, _shortlist
from retailers.products.product_normalizer import normalize_product_details
from services.product_details import product_path, load_product, InvalidProductLink


def product(name, retailer="Flipkart", **configuration):
    return {"name": name, "retailer": retailer, "url": "https://www.flipkart.com/item/p/x?pid=TEST123",
            "price": 100000.0, "brand": configuration.pop("brand", None),
            "selected_configuration": configuration, "specifications": {}, "highlights": [],
            "data_source": "fixture", "is_live": False}


class FakeClient:
    def __init__(self, result=None, error=None): self.result, self.error = result, error
    def generate(self, prompt, schema):
        if self.error: raise self.error
        return self.result


class ComparisonTests(unittest.TestCase):
    def test_flipkart_targets_amazon(self):
        item = product("iPhone 15 128GB"); item.update(data_source="live", is_live=True)
        with patch.dict(os.environ, {"RETAILER_MODE": "live"}), \
             patch("services.product_comparison.optimized_query", return_value=("phone", {})), \
             patch("services.product_comparison.browser_session", side_effect=BrowserBusy()):
            self.assertEqual(compare_product(item)["retailer"], "Amazon")

    def test_amazon_targets_flipkart(self):
        item = product("iPhone 15 128GB", retailer="Amazon"); item.update(url="https://www.amazon.in/dp/B012345678", data_source="live", is_live=True)
        with patch.dict(os.environ, {"RETAILER_MODE": "live"}), \
             patch("services.product_comparison.optimized_query", return_value=("phone", {})), \
             patch("services.product_comparison.browser_session", side_effect=BrowserBusy()):
            self.assertEqual(compare_product(item)["retailer"], "Flipkart")

    def test_gemini_optimized_query(self):
        provider = type("Provider", (), {"generate": lambda self, p, s: ({"search_query": "Apple MacBook Air M5 16GB 512GB"}, "gemini")})()
        query, info = optimized_query(product("Apple MacBook Air M5", brand="Apple", ram="16GB", storage="512GB"), provider)
        self.assertTrue(info["used"]); self.assertIn("16GB", query)

    def test_groq_fallback(self):
        config = AIConfig(True, "g", "m", "q", "m", 2)
        provider = AIProvider(config, {"gemini": FakeClient(error=RuntimeError()), "groq": FakeClient({"search_query": "ok"})})
        self.assertEqual(provider.generate("p", {"type": "object"})[1], "groq")

    def test_both_ai_providers_fail(self):
        provider = type("Provider", (), {"generate": lambda self, p, s: (_ for _ in ()).throw(AIUnavailable())})()
        query, info = optimized_query(product("Apple MacBook Air M5", brand="Apple", ram="16GB"), provider)
        self.assertTrue(info["fallback"]); self.assertIn("16GB", query)

    def test_iphone_pro_is_different_model(self):
        self.assertEqual(deterministic_verdict(product("Apple iPhone 15", ram="8GB"), product("Apple iPhone 15 Pro", ram="8GB")), "DIFFERENT_MODEL")

    def test_samsung_a55_is_different_model(self):
        self.assertEqual(deterministic_verdict(product("Samsung Galaxy A56", ram="8GB"), product("Samsung Galaxy A55", ram="8GB")), "DIFFERENT_MODEL")

    def test_macbook_storage_mismatch(self):
        left = product("Apple MacBook Air M5", ram="16GB", storage="512GB")
        right = product("Apple MacBook Air M5", ram="16GB", storage="1TB")
        self.assertEqual(deterministic_verdict(left, right), "DIFFERENT_VARIANT")

    def test_metric_and_inch_display_are_equivalent(self):
        left = product("Apple MacBook Air M5", ram="24GB", storage="1TB", screen_size="34.54 cm (13.6 inch)")
        right = product("Apple MacBook Air M5", ram="24GB", storage="1TB", screen_size="13.6 Inches")
        self.assertEqual(deterministic_verdict(left, right), "EXACT_MATCH")

    def test_mac_mini_identity_is_preserved(self):
        item = product("Apple Mac mini with Apple M6 Chip - Silver", brand="Apple")
        self.assertEqual(attributes(item)["model"].casefold(), "mac mini")
        self.assertEqual(deterministic_query(item), "Apple Mac mini M6")

    def test_invalid_numeric_fragment_is_excluded(self):
        item = product("Apple Mac mini with Apple M6 Chip - Silver", brand="Apple", screen_size="5.00")
        self.assertNotIn("5.00", deterministic_query(item))

    def test_mac_mini_dimensions_and_unverified_ram_do_not_poison_query(self):
        item = product("Apple Mac mini with Apple M6 Chip - Silver", brand="Apple",
                       ram="16GB", screen_size="5.00 inch")
        self.assertEqual(deterministic_query(item), "Apple Mac mini M6")

    def test_mac_mini_verified_system_ram_is_preserved(self):
        item = product("Apple Mac mini with Apple M6 Chip - Silver", brand="Apple", ram="16GB")
        item["attribute_evidence"] = {"ram": {"source": "specifications:System Memory", "quote": "16 GB"}}
        self.assertIn("16GB", deterministic_query(item))

    def test_mac_mini_rejects_iphone_and_accessory(self):
        selected = product("Apple Mac mini with Apple M6 Chip", brand="Apple")
        candidates = [product("Apple iPhone 17 512GB", brand="Apple"),
                      product("Loudspeaker replacement accessory for Mac mini", brand="Apple")]
        self.assertEqual(_shortlist(selected, candidates), [])

    def test_mac_mini_m5_rejected_for_m6(self):
        selected = product("Apple Mac mini with Apple M6 Chip", brand="Apple")
        candidate = product("Apple Mac mini with Apple M5 Chip", brand="Apple")
        self.assertEqual(_shortlist(selected, [candidate]), [])

    def test_trackpad_protector_is_rejected_as_accessory(self):
        selected = product("Apple MacBook Air M5", brand="Apple", ram="24GB", storage="1TB")
        candidate = product("Trackpad Protector Compatible with MacBook Air 15 inch M5", brand="Midkart")
        self.assertEqual(_shortlist(selected, [candidate]), [])

    def test_mac_mini_search_rejects_mouse_and_number_pad_results(self):
        selected = product("Apple Mac mini with Apple M6 Chip", brand="Apple")
        candidates = [product("VYAR Mini USB Wired Optical Mouse"),
                      product("D25 Wired Number Keyboard Slim Mini Numeric Pad for Laptop Mac")]
        self.assertEqual(_shortlist(selected, candidates), [])

    def test_mac_mini_accessory_only_search_returns_no_match(self):
        selected = product("Apple Mac mini with Apple M6 Chip - Silver", retailer="Amazon",
                           brand="Apple", ram="16GB", screen_size="5.00 inch")
        selected["url"] = "https://www.amazon.in/dp/B012345678"
        returned = [{"name": "VYAR Mini USB Wired Optical Mouse", "price": 178, "url": "https://www.flipkart.com/mouse/p/x?pid=MOUSE1"},
                    {"name": "D25 Wired Number Keyboard Slim Mini Numeric Pad for Laptop Mac", "price": 342,
                     "url": "https://www.flipkart.com/keypad/p/x?pid=KEYPAD1"}]
        manager = unittest.mock.MagicMock(); manager.__enter__.return_value = object()
        with patch("services.product_comparison.browser_session", return_value=manager), \
             patch("services.product_comparison.get_product_details", return_value=selected), \
             patch("services.product_comparison.optimized_query", return_value=("Apple Mac mini M6", {"fallback": True})), \
             patch("services.product_comparison.scrape_page", return_value=SimpleNamespace(items=returned)), \
             patch("services.product_comparison.normalize_listing", side_effect=lambda raw, *_: raw):
            result = compare_product(selected)
        self.assertEqual(result["status"], "no_match")
        self.assertEqual(result["query"], "Apple Mac mini M6")
        self.assertEqual(result["candidates"], [])

    def test_graphics_memory_is_not_system_ram(self):
        normalized = normalize_product_details({"name": "Apple Mac mini M6", "specifications": {"Graphics RAM Size": "256 GB"}})
        self.assertNotIn("ram", normalized["normalized_attributes"])

    def test_invalid_ai_identity_uses_fallback(self):
        item = product("Apple Mac mini with Apple M6 Chip", brand="Apple")
        provider = type("Provider", (), {"generate": lambda self, p, s: ({"search_query": "Apple iPhone 17"}, "gemini")})()
        query, info = optimized_query(item, provider)
        self.assertEqual(query, "Apple Mac mini M6"); self.assertTrue(info["fallback"])

    def test_missing_specs_are_unverified(self):
        left = product("Apple MacBook Air M5", ram="16GB", storage="512GB")
        self.assertEqual(deterministic_verdict(left, product("Apple MacBook Air M5")), "VARIANT_UNVERIFIED")

    def test_signed_snapshot_verification(self):
        os.environ["PAGINATION_SECRET"] = "x" * 32
        item = product("Apple iPhone 15"); item["captured_at"] = 1_800_000_000
        token = product_path(item).split("/product/", 1)[1]
        self.assertEqual(load_product(token)["name"], item["name"])
        with self.assertRaises(InvalidProductLink): load_product(token + "bad")

    def test_variant_query_changes(self):
        first = deterministic_query(product("Apple MacBook Air M5", ram="16GB", storage="512GB"))
        second = deterministic_query(product("Apple MacBook Air M5", ram="24GB", storage="1TB"))
        self.assertNotEqual(first, second)

    def test_browser_busy_status(self):
        item = product("iPhone 15"); item.update(data_source="live", is_live=True)
        with patch.dict(os.environ, {"RETAILER_MODE": "live"}), \
             patch("services.product_comparison.optimized_query", return_value=("phone", {})), \
             patch("services.product_comparison.browser_session", side_effect=BrowserBusy()):
            self.assertEqual(compare_product(item)["status"], "waiting")

    def test_retailer_timeout_status(self):
        manager = unittest.mock.MagicMock(); manager.__enter__.return_value = object()
        item = product("iPhone 15"); item.update(data_source="live", is_live=True)
        with patch.dict(os.environ, {"RETAILER_MODE": "live"}), \
             patch("services.product_comparison.optimized_query", return_value=("phone", {})), \
             patch("services.product_comparison.browser_session", return_value=manager), \
             patch("services.product_comparison.get_product_details", return_value={}), \
             patch("services.product_comparison.scrape_page", side_effect=RetailerSearchError("Amazon", "timeout")):
            self.assertEqual(compare_product(item)["status"], "unavailable")


if __name__ == "__main__": unittest.main()
