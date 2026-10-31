"""Existing Amazon extraction and shared navigation, without retailer requests."""
from contextlib import nullcontext
from unittest.mock import MagicMock, patch
from time import monotonic
import unittest

from retailers import amazon, pagination
from retailers.navigation import RetailerPage
from retailers.outcomes import RetailerSearchError


HTML = '''<html><body>
<div data-component-type="s-search-result" data-asin="B012345678">
<h2><a href="/Samsung/dp/B012345678"><span>Samsung Galaxy A56 5G (Olive, 128 GB)</span></a></h2>
<span class="a-price"><span class="a-price-whole">32,999</span><span class="a-price-fraction">50</span></span>
<span class="a-price a-text-price"><span class="a-offscreen">₹45,999</span></span>
<span class="a-icon-alt">4.4 out of 5 stars</span><img class="s-image" src="https://m.media-amazon.com/images/example.jpg">
</div><a href="/s?k=phone&amp;page=2">Next</a></body></html>'''


class AmazonTests(unittest.TestCase):
    def driver(self, kind="cards", page_kind="unclassified", http_status=200):
        driver = MagicMock()
        driver.current_url = "https://www.amazon.in/s?k=phone"
        driver.page_source = HTML
        driver.execute_script.return_value = {"kind": kind, "page_kind": page_kind,
                                              "http_status": http_status, "cards": 1}
        return driver

    def test_existing_extraction_keeps_all_product_fields(self):
        item = amazon.parse_amazon_product_cards(HTML)[0]
        self.assertEqual(item["name"], "Samsung Galaxy A56 5G (Olive, 128 GB)")
        self.assertEqual(item["price"], 32999.5)
        self.assertEqual(item["original_price"], 45999)
        self.assertEqual(item["rating"], 4.4)
        self.assertTrue(item["image_url"].startswith("https://m.media-amazon.com/"))
        self.assertEqual(item["url"], "https://www.amazon.in/Samsung/dp/B012345678")
        self.assertEqual(item["retailer"], "Amazon")

    def test_first_page_matches_existing_canonical_local_url(self):
        url = amazon.build_amazon_search_url("Samsung A56")
        self.assertEqual(url, "https://www.amazon.in/s?k=Samsung%20A56")
        self.assertEqual(pagination.page_url("Amazon", "Samsung A56", 1), url)
        self.assertEqual(pagination.page_url("Amazon", "Samsung A56", 2), url + "&page=2")
        for page in (0, 9, True, "2"):
            with self.assertRaises(ValueError):
                amazon.build_amazon_search_url("phone", page)

    def test_standalone_search_uses_one_browser_and_preserved_parser(self):
        driver = self.driver()
        with patch.object(amazon, "browser_session", return_value=nullcontext(driver)) as session:
            items = amazon.search_amazon("Samsung A56", max_results=3)
        self.assertEqual(len(items), 1)
        session.assert_called_once_with(scraping=True)
        driver.get.assert_called_once_with(amazon.build_amazon_search_url("Samsung A56"))

    def test_paginated_path_calls_amazon_module_without_creating_a_browser(self):
        driver = self.driver()
        result = RetailerPage([{"name": "real listing"}], False)
        with patch.object(amazon, "search_amazon_page", return_value=result) as search:
            self.assertIs(pagination.scrape_page(driver, "Amazon", "phone", 2, 20), result)
        search.assert_called_once_with(driver, "phone", page=2, deadline=20)

    def test_amazon_page_reuses_browser_and_detects_next_page(self):
        driver = self.driver()
        with patch.object(amazon, "browser_session") as session:
            result = amazon.search_amazon_page(driver, "phone", deadline=float("inf"))
        session.assert_not_called()
        self.assertEqual(len(result.items), 1)
        self.assertTrue(result.has_next)
        self.assertEqual(result.next_page, 2)
        driver.quit.assert_not_called()

    def test_503_does_not_parse_or_wait_for_absent_product_cards(self):
        driver = self.driver("upstream_http_503", "automated_access", 503)
        with patch.object(amazon, "parse_amazon_product_cards") as parse, \
             patch("retailers.navigation.WebDriverWait") as wait:
            wait.return_value.until.side_effect = lambda predicate: predicate(driver)
            with self.assertRaises(RetailerSearchError) as failure:
                amazon.search_amazon_page(driver, "phone", deadline=float("inf"))
        self.assertEqual(failure.exception.stage, "upstream_http_503")
        self.assertEqual(failure.exception.page_kind, "automated_access")
        self.assertIn("restricting automated access", failure.exception.public_message)
        parse.assert_not_called()
        # The first readiness poll returns the explicit error immediately.
        self.assertEqual(driver.execute_script.call_count, 2)

    def test_generic_503_is_not_claimed_to_be_an_access_restriction(self):
        error = RetailerSearchError("Amazon", "upstream_http_503", page_kind="upstream_error", http_status=503)
        self.assertIn("HTTP 503", error.public_message)
        self.assertNotIn("restricting", error.public_message)

    def test_one_generic_server_error_retry_reuses_browser_and_deadline(self):
        driver = self.driver()
        error = RetailerSearchError("Amazon", "upstream_http_503", page_kind="upstream_error", http_status=503)
        page = RetailerPage([{"name": "real listing"}], False)
        deadline = monotonic()+10
        with patch.object(amazon, "scrape_search_page", side_effect=[error, page]) as scrape, \
             patch.object(amazon, "sleep") as pause:
            self.assertIs(amazon.search_amazon_page(driver, "phone", deadline=deadline), page)
        pause.assert_called_once_with(2)
        self.assertEqual(scrape.call_count, 2)
        self.assertTrue(all(call.args[0] is driver and call.args[4] == deadline for call in scrape.call_args_list))

    def test_access_restrictions_unknown_errors_and_deadlines_are_not_retried(self):
        for kind, budget in [("captcha",10),("automated_access",10),("unclassified",10),("upstream_error",1)]:
            with self.subTest(kind=kind,budget=budget):
                error = RetailerSearchError("Amazon", "upstream_http_503", page_kind=kind,http_status=503)
                with patch.object(amazon,"scrape_search_page",side_effect=error) as scrape, patch.object(amazon,"sleep") as pause:
                    with self.assertRaises(RetailerSearchError):
                        amazon.search_amazon_page(self.driver(),"phone",deadline=monotonic()+budget)
                self.assertEqual(scrape.call_count,1)
                pause.assert_not_called()

    def test_captcha_and_confirmed_empty_page_remain_distinct(self):
        driver = self.driver("blocked_page", "captcha")
        with self.assertRaises(RetailerSearchError):
            amazon.search_amazon_page(driver, "phone", deadline=float("inf"))
        driver = self.driver("empty", "empty")
        result = amazon.search_amazon_page(driver, "phone", deadline=float("inf"))
        self.assertEqual(result.items, [])
        self.assertFalse(result.has_next)


if __name__ == "__main__":
    unittest.main()
