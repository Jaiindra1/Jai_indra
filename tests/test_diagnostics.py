"""Diagnostics stay safe and do not change search outcomes."""
import json
import os
import unittest
from contextlib import nullcontext
from pathlib import Path
from unittest.mock import patch

from core import search_diagnostics as diagnostics
from main import app
from retailers.outcomes import RetailerSearchError
from services.search_service import search_products


class DiagnosticTests(unittest.TestCase):
    def test_vercel_default_and_explicit_opt_out(self):
        with patch.dict(os.environ, {"VERCEL": "1"}, clear=True):
            self.assertTrue(diagnostics.enabled())
            os.environ["SEARCH_DIAGNOSTICS"] = "0"
            self.assertFalse(diagnostics.enabled())
        with patch.dict(os.environ, {}, clear=True):
            self.assertFalse(diagnostics.enabled())

    def test_request_id_correlates_retailers_and_does_not_leak_query(self):
        with patch.dict(os.environ, {"SEARCH_DIAGNOSTICS": "1"}):
            with patch("services.search_pagination.browser_session", return_value=nullcontext(object())), \
                 patch("services.search_pagination.scrape_page", side_effect=[
                     RetailerSearchError("Flipkart", "browser_startup"), RetailerSearchError("Amazon", "navigation")]):
                with self.assertLogs(diagnostics.logger, level="INFO") as logs:
                    response = app.test_client().post("/api/search", json={"query": "private-query-123"})
        self.assertEqual(response.status_code, 502)
        records = [json.loads(item.message) for item in logs.records]
        request_id = response.headers["X-Search-Request-ID"]
        self.assertTrue(all(item["request_id"] == request_id for item in records))
        failures = [item for item in records if item["event"] == "page_retailer_failed"]
        self.assertEqual([item["stage"] for item in failures], ["browser_startup", "navigation"])
        self.assertEqual(records[-1]["event"], "request_finished")
        self.assertNotIn("private-query-123", " ".join(logs.output))
        self.assertIsNone(diagnostics._request_id.get())
        self.assertIsNone(diagnostics._trace.get())

    def test_missing_binaries_are_reported_without_launching_browser(self):
        cache_home = Path.cwd()
        with patch.dict(os.environ, {"SEARCH_DIAGNOSTICS": "1"}, clear=True), \
             patch("core.search_diagnostics.Path.home", return_value=cache_home), \
             patch("core.search_diagnostics.shutil.which", return_value=None), \
             patch("core.search_diagnostics.platform.system", return_value="Linux"), \
             patch("core.search_diagnostics.platform.machine", return_value="x86_64"), \
             patch("core.search_diagnostics.Path.is_dir", return_value=False), \
             patch("core.search_diagnostics.subprocess.run") as run:
            with self.assertLogs(diagnostics.logger, level="INFO") as logs:
                diagnostics.browser_environment(refresh=True)
        records = [json.loads(item.message) for item in logs.records]
        missing = [item["binary"] for item in records if item["event"] == "binary_unavailable"]
        self.assertEqual(missing, ["chrome", "chromedriver"])
        run.assert_not_called()

    def test_logging_failure_does_not_change_search(self):
        with patch.dict(os.environ, {"SEARCH_DIAGNOSTICS": "1"}), \
             patch.object(diagnostics.logger, "info", side_effect=RuntimeError("logging failed")), \
             patch("services.search_service.search_flipkart", return_value=[]), \
             patch("services.search_service.search_amazon", return_value=[]):
            with diagnostics.request_scope():
                self.assertEqual(search_products("phone"), [])


if __name__ == "__main__":
    unittest.main()
