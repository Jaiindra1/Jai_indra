import os
import unittest
from unittest.mock import patch

from bs4 import BeautifulSoup

from main import app
from services.product_details import product_path, load_product, InvalidProductLink, inr


class ProductDetailTests(unittest.TestCase):
    def setUp(self):
        env = patch.dict(os.environ, {"PAGINATION_SECRET": "test-only-product-link-secret-32-characters"})
        env.start()
        self.addCleanup(env.stop)
        self.product = {"name": "Samsung Galaxy A56 (Awesome Olive, 256 GB)",
                        "price": 27999, "original_price": 31999, "rating": 4.4,
                        "url": "https://www.flipkart.com/galaxy-a56/p/itm123?pid=MOB12345678&tracking=ignored",
                        "retailer": "Flipkart", "image_url": "https://images.example.com/galaxy.jpg",
                        "category": "Electronics", "highlights": ["256 GB storage", "8 GB RAM"],
                        "specifications": {"Storage": "256 GB"}}
        self.client = app.test_client()

    def test_clicked_listing_renders_its_own_details_and_real_retailer_link(self):
        path = product_path(self.product)
        response = self.client.get(path)
        self.assertEqual(response.status_code, 200)
        page = BeautifulSoup(response.data, "html.parser")
        self.assertEqual(page.select_one("#product-name").get_text(strip=True), self.product["name"])
        self.assertEqual(page.select_one("#product-price").get_text(strip=True), "\u20b927,999")
        self.assertEqual(page.select_one("#product-image")["src"], self.product["image_url"])
        self.assertIn("4.4 / 5", page.select_one("#product-rating").get_text())
        self.assertEqual(page.select_one("#retailer-link")["href"], "https://www.flipkart.com/galaxy-a56/p/itm123?pid=MOB12345678")
        self.assertEqual(len(page.select("#retailer-matrix tbody tr")), 1)
        self.assertNotIn("Rahul", page.get_text())
        self.assertNotIn("STRONG BUY RECOMMENDATION", page.get_text())
        self.assertIn("No price history available", page.get_text())
        self.assertEqual(response.headers["Cache-Control"], "no-store")
        self.assertEqual(response.headers["Referrer-Policy"], "no-referrer")

    def test_tampered_expired_and_cross_purpose_links_are_rejected(self):
        path = product_path(self.product)
        self.assertEqual(self.client.get(path[:-8] + "tampered").status_code, 404)
        with patch("itsdangerous.timed.TimestampSigner.get_timestamp", return_value=1):
            expired = product_path(self.product)
        with patch("itsdangerous.timed.TimestampSigner.get_timestamp", return_value=100000):
            response = self.client.get(expired)
        self.assertEqual(response.status_code, 410)
        self.assertIn(b"expired", response.data)

    def test_missing_fields_and_unsafe_content_have_safe_fallbacks(self):
        product = {**self.product, "name": '<script>alert("test")</script>', "image_url": None,
                   "price": None, "rating": None, "original_price": None, "highlights": [], "specifications": {}}
        response = self.client.get(product_path(product))
        self.assertEqual(response.status_code, 200)
        self.assertNotIn(b'<script>alert("test")</script>', response.data)
        self.assertIn(b"Not provided", response.data)
        page = BeautifulSoup(response.data, "html.parser")
        self.assertIsNone(page.select_one("#product-image"))
        self.assertIsNotNone(page.select_one("#product-image-fallback"))
        self.assertEqual(page.select_one("#product-name").get_text(), product["name"])
        with self.assertRaises(InvalidProductLink):
            product_path({**self.product, "url": "javascript:alert(1)"})

    def test_amazon_links_and_indian_currency_formatting(self):
        product = {**self.product, "retailer": "Amazon", "url": "https://www.amazon.in/title/dp/B012345678?ref=test"}
        snapshot = load_product(product_path(product).split("/product/", 1)[1])
        self.assertEqual(snapshot["url"], "https://www.amazon.in/dp/B012345678")
        self.assertEqual(inr(109999), "\u20b91,09,999")
        self.assertEqual(inr(1299.5), "\u20b91,299.50")

    def test_server_rendered_search_also_links_to_the_details_page(self):
        with patch("main.search_products", return_value=[dict(self.product)]):
            response = self.client.post("/", data={"query": "Samsung A56"})
        page = BeautifulSoup(response.data, "html.parser")
        for link in page.select(".product-image-link, .product-title-link, .product-button"):
            self.assertTrue(link["href"].startswith("/product/"))
            self.assertEqual(self.client.get(link["href"]).status_code, 200)


if __name__ == "__main__":
    unittest.main()
