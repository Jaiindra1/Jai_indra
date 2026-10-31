"""Route checks without Selenium, email delivery, or storage."""
import unittest
from unittest.mock import patch
from bs4 import BeautifulSoup
from main import app
from retailers.outcomes import AllRetailersFailed


class RouteTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health(self):
        with patch("main.search_products") as search:
            response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"status": "ok"})
        self.assertEqual(response.headers["Cache-Control"], "no-store")
        search.assert_not_called()

    def test_homepage_and_linked_assets(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        page = BeautifulSoup(response.data, "html.parser")
        assets = [tag["href"] for tag in page.select('link[rel="stylesheet"]')]
        assets += [tag["src"] for tag in page.select("script[src]")]
        self.assertTrue(assets)
        assets = set(assets) | {
            "/static/css/loader.css", "/static/css/search-page.css",
            "/static/css/hamster.css", "/static/js/search.js",
        }
        for url in assets:
            with self.subTest(url=url):
                asset = self.client.get(url)
                self.assertEqual(asset.status_code, 200)
                self.assertTrue(asset.data)
                self.assertIn("text/css" if url.endswith(".css") else "javascript", asset.content_type)
                asset.close()

    def test_search_validation(self):
        with patch("main.search_products") as search:
            response = self.client.post("/api/search", json={"query": " "})
        self.assertEqual(response.status_code, 400)
        self.assertFalse(response.json["success"])
        search.assert_not_called()
        self.assertEqual(self.client.get("/api/search").status_code, 405)

    def test_search_response(self):
        products = [{"name": "Example phone", "price": 100, "retailer": "Amazon"}]
        with patch("main.search_products", return_value=products) as search:
            response = self.client.post("/api/search", json={"query": " phone "})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json["success"])
        self.assertEqual(response.json["products"], products)
        search.assert_called_once_with("phone", max_results=20)

    def test_search_failure(self):
        with patch("main.search_products", side_effect=AllRetailersFailed):
            response = self.client.post("/api/search", json={"query": "phone"})
        self.assertEqual(response.status_code, 502)
        self.assertFalse(response.json["success"])

    def test_feedback(self):
        response = self.client.get("/feedback")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Share Your Feedback", response.data)
        with patch("main.send_feedback_email") as send:
            response = self.client.post("/feedback", data={})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Please complete all required fields.", response.data)
        send.assert_not_called()

    def test_missing_paths(self):
        self.assertEqual(self.client.get("/missing-page").status_code, 404)
        self.assertEqual(self.client.get("/static/missing.css").status_code, 404)


if __name__ == "__main__":
    unittest.main()
