import os
import unittest
from contextlib import nullcontext
from unittest.mock import patch

from bs4 import BeautifulSoup

from core.browser import BrowserBusy
from main import app
from retailers.outcomes import RetailerSearchError
from retailers.pagination import RetailerPage, page_url, next_page_number
from retailers.flipkart import _extract_image_url
from services import search_pagination as pagination


def listings(retailer, start=0, count=20):
    return [{"name": f"Real-shaped listing {index}", "price": 100 + index,
             "image_url": "https://images.example.com/product.jpg",
             "url": (f"https://www.amazon.in/title/dp/B{index:09d}" if retailer == "Amazon"
                     else f"https://www.flipkart.com/title/p/itm{index}?pid=MOB{index:010d}&tracking=test")}
            for index in range(start, start + count)]


class PaginationTests(unittest.TestCase):
    def setUp(self):
        self.environment = patch.dict(os.environ, {"PAGINATION_SECRET": "test-only-pagination-key-32-characters"})
        self.environment.start()
        self.addCleanup(self.environment.stop)
        self.session = patch.object(pagination, "browser_session", return_value=nullcontext(object()))
        self.browser = self.session.start()
        self.addCleanup(self.session.stop)

    def test_initial_api_returns_eight_and_defers_amazon(self):
        with patch.object(pagination, "scrape_page", return_value=RetailerPage(listings("Flipkart"), True, 2)) as scrape:
            response = app.test_client().post("/api/search", json={"query": "phone"})
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertEqual(len(data["items"]), 8)
        self.assertTrue(all(item["detail_url"].startswith("/product/") for item in data["items"]))
        self.assertEqual(app.test_client().get(data["items"][0]["detail_url"]).status_code, 200)
        self.assertTrue(all("detail_url" not in item for item in pagination.decode_cursor(data["next_cursor"])["buffer"]))
        self.assertEqual(data["items"], data["products"])
        self.assertEqual(data["pending_retailers"], ["Amazon"])
        self.assertTrue(data["has_more"])
        self.assertEqual(scrape.call_count, 1)
        self.assertEqual(scrape.call_args.args[1:4], ("Flipkart", "phone", 1))
        self.assertIn("Server-Timing", response.headers)

    def test_buffered_next_page_uses_no_browser_or_repeated_scrape(self):
        with patch.object(pagination, "scrape_page", return_value=RetailerPage(listings("Flipkart"), True, 2)) as scrape:
            first = pagination.search_page("phone")
            self.browser.reset_mock()
            second = pagination.search_page(cursor=first["next_cursor"])
            third = pagination.search_page(cursor=second["next_cursor"])
        self.assertEqual([len(first["items"]), len(second["items"]), len(third["items"])], [8, 8, 4])
        self.browser.assert_not_called()
        self.assertEqual(scrape.call_count, 1)
        ids = [item["id"] for response in [first, second, third] for item in response["items"]]
        self.assertEqual(len(ids), len(set(ids)))

    def test_pending_retailer_is_checked_before_buffer_when_requested(self):
        with patch.object(pagination, "scrape_page", side_effect=[
             RetailerPage(listings("Flipkart", count=24), True, 2),
             RetailerPage(listings("Amazon", count=16), True, 2)]) as scrape:
            first = pagination.search_page("phone")
            second = pagination.search_page(cursor=first["next_cursor"], prioritize_pending=True)
            third = pagination.search_page(cursor=second["next_cursor"])
        self.assertTrue(all(i["retailer"] == "Amazon" for i in second["items"]))
        self.assertEqual(scrape.call_count, 2)
        self.assertEqual(scrape.call_args_list[1].args[1:4], ("Amazon", "phone", 1))
        state = pagination.decode_cursor(third["next_cursor"])
        self.assertEqual(len(state["buffer"]), 16)
        self.assertTrue(all(i["retailer"] == "Flipkart" for i in state["buffer"]))

    def test_pending_generic_503_retries_once_later_and_keeps_flipkart_buffer(self):
        error = RetailerSearchError("Amazon", "upstream_http_503", page_kind="upstream_error", http_status=503)
        with patch.object(pagination, "scrape_page", side_effect=[
             RetailerPage(listings("Flipkart", count=24), False), error,
             RetailerPage(listings("Amazon", count=8), False)]):
            first = pagination.search_page("phone")
            second = pagination.search_page(cursor=first["next_cursor"], prioritize_pending=True)
            third = pagination.search_page(cursor=second["next_cursor"], prioritize_pending=True)
        self.assertEqual(second["pending_retailers"], ["Amazon"])
        self.assertEqual(second["retry_delay_ms"], 2500)
        self.assertEqual(len(second["items"]), 8)
        self.assertTrue(all(i["retailer"] == "Flipkart" for i in second["items"]))
        self.assertEqual(third["warnings"], [])
        self.assertTrue(all(i["retailer"] == "Amazon" for i in third["items"]))

    def test_pending_access_restriction_stops_and_generic_errors_are_bounded(self):
        for kind in ("captcha", "upstream_error"):
            error = RetailerSearchError("Amazon", "upstream_http_503", page_kind=kind, http_status=503)
            with patch.object(pagination, "scrape_page", side_effect=[RetailerPage(listings("Flipkart",count=24),False),error,error]) as scrape:
                result = pagination.search_page("phone")
                result = pagination.search_page(cursor=result["next_cursor"],prioritize_pending=True)
                if result["pending_retailers"]:
                    result = pagination.search_page(cursor=result["next_cursor"],prioritize_pending=True)
            self.assertEqual(result["pending_retailers"], [])
            self.assertLessEqual(scrape.call_count, 3)

    def test_real_page_numbers_advance_and_retailers_alternate(self):
        responses = [RetailerPage(listings("Flipkart", count=8), True, 2),
                     RetailerPage(listings("Amazon", count=8), False),
                     RetailerPage(listings("Flipkart", start=8, count=8), False)]
        with patch.object(pagination, "scrape_page", side_effect=responses) as scrape:
            first = pagination.search_page("phone")
            second = pagination.search_page(cursor=first["next_cursor"])
            third = pagination.search_page(cursor=second["next_cursor"])
        self.assertEqual([(call.args[1], call.args[3]) for call in scrape.call_args_list],
                         [("Flipkart", 1), ("Amazon", 1), ("Flipkart", 2)])
        self.assertFalse(third["has_more"])
        self.assertIsNone(third["next_cursor"])

    def test_cursors_reject_tampering_expiry_and_signed_invalid_state(self):
        with patch.object(pagination, "scrape_page", return_value=RetailerPage(listings("Flipkart"), True, 2)):
            token = pagination.search_page("phone")["next_cursor"]
        for invalid in ["", "garbage", token[:-8] + "tampered", "x" * 14001,
                        pagination.serializer().dumps({"v": 100}), pagination.serializer().dumps({"v": 1, "q": []})]:
            with self.subTest(token=invalid[:30]), self.assertRaises(pagination.InvalidCursor):
                pagination.decode_cursor(invalid)
        state = pagination.decode_cursor(token)
        with patch("itsdangerous.timed.TimestampSigner.get_timestamp", return_value=1):
            expired = pagination.encode_cursor(state)
        with patch("itsdangerous.timed.TimestampSigner.get_timestamp", return_value=3601):
            with self.assertRaises(pagination.InvalidCursor):
                pagination.decode_cursor(expired)
        self.assertEqual(app.test_client().get("/api/search/more?cursor=garbage").status_code, 400)

    def test_cross_page_canonical_deduplication_and_end_detection(self):
        initial = listings("Flipkart", count=8)
        duplicate = [{**item, "url": item["url"].replace("tracking=test", "tracking=another")} for item in initial]
        with patch.object(pagination, "scrape_page", side_effect=[RetailerPage(initial, True, 2),
             RetailerPage([], False), RetailerPage(duplicate, True, 3)]) as scrape:
            first = pagination.search_page("phone")
            last = pagination.search_page(cursor=first["next_cursor"])
        self.assertEqual(last["items"], [])
        self.assertFalse(last["has_more"])
        self.assertEqual(last["warnings"][0]["stage"], "duplicate_page")
        self.assertEqual(scrape.call_count, 3)

    def test_partial_failure_reuses_one_browser_and_preserves_warning(self):
        with patch.object(pagination, "scrape_page", side_effect=[
            RetailerSearchError("Flipkart", "navigation"), RetailerPage(listings("Amazon"), False)
        ]):
            response = pagination.search_page("phone")
        self.assertEqual(len(response["items"]), 8)
        self.assertEqual(response["items"][0]["retailer"], "Amazon")
        self.assertEqual(response["warnings"][0]["stage"], "navigation")
        self.assertEqual(self.browser.call_count, 1)

    def test_both_failures_are_reported_as_502(self):
        with patch.object(pagination, "scrape_page", side_effect=[
            RetailerSearchError("Flipkart", "blocked_page"), RetailerSearchError("Amazon", "results_timeout")
        ]):
            response = app.test_client().post("/api/search", json={"query": "phone"})
        self.assertEqual(response.status_code, 502)
        self.assertEqual(len(response.json["warnings"]), 2)
        self.assertFalse(response.json["success"])

    def test_no_results_stops_and_capacity_is_retryable(self):
        with patch.object(pagination, "scrape_page", return_value=RetailerPage([], False)):
            response = pagination.search_page("no matches")
        self.assertEqual(response["items"], [])
        self.assertFalse(response["has_more"])
        with patch.object(pagination, "browser_session", side_effect=BrowserBusy):
            response = app.test_client().post("/api/search", json={"query": "phone"})
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.headers["Retry-After"], "2")

    def test_deadline_defers_unattempted_retailer_without_repeating_failed_page(self):
        clock = [0.0]
        def slow_page(*args):
            clock[0] = 13.0
            raise RetailerSearchError("Flipkart", "request_deadline")
        with patch.object(pagination, "monotonic", side_effect=lambda: clock[0]), \
             patch.object(pagination, "scrape_page", side_effect=slow_page) as scrape:
            result = pagination.search_page("phone")
        self.assertTrue(result["has_more"])
        self.assertEqual(result["items"], [])
        self.assertEqual(scrape.call_count, 1)
        state = pagination.decode_cursor(result["next_cursor"])
        self.assertIsNone(state["pages"]["Flipkart"])
        self.assertEqual(state["pages"]["Amazon"], 1)

    def test_adapters_and_canonical_amazon_listing_ids(self):
        self.assertIn("page=2", page_url("Flipkart", "phone & laptop", 2))
        self.assertIn("k=phone", page_url("Amazon", "phone", 3))
        html = '<a href="/s?k=phone&page=2">Next</a><a href="https://evil.example/?page=2">bad</a>'
        self.assertEqual(next_page_number(BeautifulSoup(html, "html.parser"), "Amazon", 1), 2)
        self.assertIsNone(next_page_number(BeautifulSoup('<span>No next page</span>', "html.parser"), "Flipkart", 1))
        first = pagination.listing_identity({"url": "https://www.amazon.in/first-title/dp/B000000001?ref=1"}, "Amazon")
        other = pagination.listing_identity({"url": "https://amazon.in/other-title/dp/B000000001?ref=2"}, "Amazon")
        self.assertEqual(first, other)
        card = BeautifulSoup('<div><img src="data:image/gif;base64,placeholder" data-src="https://images.example.com/real.jpg"></div>', "html.parser")
        self.assertEqual(_extract_image_url(card, "https://www.flipkart.com"), "https://images.example.com/real.jpg")


if __name__ == "__main__":
    unittest.main()
