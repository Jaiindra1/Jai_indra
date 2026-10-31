import os
import hashlib
import io
import json
from pathlib import Path
import tempfile
import tarfile
import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from core import browser
from main import app


class BrowserTests(unittest.TestCase):
    def test_offline_archive_extracts_once_and_reuses_warm_binaries(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            bundle = root / "vendor/browser"
            bundle.parent.mkdir()
            archive = bundle.with_suffix(".tar.gz")
            with tarfile.open(archive, "w:gz") as packaged:
                for name in ("chromium", "chromedriver"):
                    info = tarfile.TarInfo(name)
                    info.size = 4
                    packaged.addfile(info, io.BytesIO(b"test"))
            digest = hashlib.sha256(archive.read_bytes()).hexdigest()
            (bundle.parent / "browser-manifest.json").write_text(json.dumps({
                "archive_sha256": digest, "bundle_bytes": 8,
            }))
            with patch.object(browser, "BUNDLE", bundle), patch.object(browser, "RUNTIME_TMP", root):
                extracted = browser._bundle_dir()
                self.assertEqual((extracted / "chromium").read_bytes(), b"test")
                with patch.object(browser.tarfile, "open") as unpack:
                    self.assertEqual(browser._bundle_dir(), extracted)
                    unpack.assert_not_called()
                # A fresh target must reject a tampered packaged archive.
                (bundle.parent / "browser-manifest.json").write_text(json.dumps({
                    "archive_sha256": "0" * 64, "bundle_bytes": 8,
                }))
                with self.assertRaisesRegex(RuntimeError, "integrity"):
                    browser._bundle_dir()

    def test_vercel_paths_are_explicit_even_when_bundle_missing(self):
        with patch.dict(os.environ, {}, clear=True), patch.object(browser, "_serverless", return_value=True):
            chrome, driver = browser._explicit_paths()
        self.assertEqual(chrome, str(browser.BUNDLE / "chromium"))
        self.assertEqual(driver, str(browser.BUNDLE / "chromedriver"))

    def test_windows_keeps_local_discovery(self):
        with patch.dict(os.environ, {}, clear=True), patch.object(browser, "_serverless", return_value=False):
            self.assertEqual(browser._explicit_paths(), ("", ""))

    def test_partial_explicit_configuration_fails(self):
        with patch.dict(os.environ, {"CHROME_BINARY_PATH": "only-browser"}, clear=True):
            with self.assertRaisesRegex(RuntimeError, "together"):
                browser._explicit_paths()

    def test_binary_build_compatibility(self):
        self.addCleanup(browser._validate_binaries.cache_clear)
        for driver_version, valid in [("153.0.8010.52", True), ("153.0.8000.52", False)]:
            browser._validate_binaries.cache_clear()
            with self.subTest(driver=driver_version), \
                 patch.object(browser.sys, "platform", "linux"), \
                 patch.object(browser.Path, "is_file", return_value=True), \
                 patch.object(browser.os, "access", return_value=True), \
                 patch.object(browser.subprocess, "run", side_effect=[
                     SimpleNamespace(stdout="Chromium 153.0.8010.0"),
                     SimpleNamespace(stdout="ChromeDriver " + driver_version),
                 ]):
                if valid:
                    browser._validate_binaries("/test/chrome", "/test/driver")
                else:
                    with self.assertRaisesRegex(RuntimeError, "build versions"):
                        browser._validate_binaries("/test/chrome", "/test/driver")

    def test_serverless_explicit_service_and_writable_profile(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        workspace = Path(temporary.name)
        driver = MagicMock()
        with patch.object(browser, "_serverless", return_value=True), \
             patch.object(browser.sys, "platform", "linux"), \
             patch.object(browser, "_validate_binaries"), \
             patch.object(browser.diagnostics, "browser_environment"), \
             patch.object(browser.diagnostics, "enabled", return_value=False), \
             patch.object(browser.tempfile, "TemporaryDirectory", return_value=temporary), \
             patch.object(browser.webdriver, "Chrome", return_value=driver) as chrome:
            result = browser.create_browser()
            options = chrome.call_args.kwargs["options"]
            service = chrome.call_args.kwargs["service"]
            self.assertEqual(service.path, str(browser.BUNDLE / "chromedriver"))
            self.assertEqual(options.binary_location, str(browser.BUNDLE / "chromium"))
            self.assertEqual(options.capabilities["browserName"], "chrome-headless-shell")
            for flag in ("--headless=new", "--no-sandbox", "--disable-gpu", "--window-size=1365,900"):
                self.assertIn(flag, options.arguments)
            self.assertEqual(service.env["SE_OFFLINE"], "true")
            self.assertEqual(service.env["SE_CACHE_PATH"], str(workspace / "selenium"))
            result.set_page_load_timeout.assert_called_once_with(20)
            browser._quit_browser(result)
        driver.quit.assert_called_once()
        self.assertFalse(workspace.exists())

    def test_profile_removed_after_startup_failure(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        workspace = Path(temporary.name)
        with patch.object(browser, "_serverless", return_value=True), \
             patch.object(browser, "_validate_binaries"), \
             patch.object(browser.diagnostics, "browser_environment"), \
             patch.object(browser.tempfile, "TemporaryDirectory", return_value=temporary), \
             patch.object(browser.webdriver, "Chrome", side_effect=RuntimeError("startup failed")):
            with self.assertRaises(RuntimeError):
                browser.create_browser()
        self.assertFalse(workspace.exists())

    def test_health_does_not_expose_exception_details(self):
        with patch.object(browser, "binary_availability", side_effect=RuntimeError("/internal/private credential=secret")):
            result = browser.browser_health()
        self.assertFalse(result["startup_success"])
        self.assertEqual(result["error_category"], "unclassified")
        self.assertNotIn("secret", str(result))
        self.assertNotIn("/internal", str(result))

    def test_browser_health_route_status_and_no_cache(self):
        for success, expected in [(True, 200), (False, 503)]:
            with self.subTest(success=success), patch("main.browser_health", return_value={
                "startup_success": success, "browser_available": success,
                "driver_available": success, "browser_executable": success,
                "driver_executable": success, "error_category": None if success else "browser_binary_missing",
            }):
                response = app.test_client().get("/api/browser-health")
                self.assertEqual(response.status_code, expected)
                self.assertEqual(response.headers["Cache-Control"], "no-store")
                self.assertIn("X-Search-Request-ID", response.headers)


if __name__ == "__main__":
    unittest.main()
