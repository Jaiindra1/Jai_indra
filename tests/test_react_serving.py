import unittest

from main import app


class ReactServingTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_root_serves_react_build(self):
        response = self.client.get("/")
        try:
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'id="root"', response.data)
        finally:
            response.close()

    def test_client_route_serves_react_build(self):
        response = self.client.get("/dashboard")
        try:
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'id="root"', response.data)
        finally:
            response.close()

    def test_api_route_is_not_swallowed_by_spa_fallback(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"status": "ok"})


if __name__ == "__main__":
    unittest.main()
