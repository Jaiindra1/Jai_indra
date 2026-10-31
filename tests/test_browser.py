import os
import hashlib
import io
import json
from pathlib import Path
import tempfile
import tarfile
import threading
import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from core import browser
from main import app


class BrowserTests(unittest.TestCase):
    def test_shutdown_watchdog_releases_a_stalled_quit(self):
        stopped = threading.Event()
        driver = MagicMock()
        driver._sandhya_process_group = 12345
        driver.quit.side_effect = lambda: stopped.wait(1)
        real_timer = threading.Timer
        with patch.object(browser, "Timer", side_effect=lambda delay, callback, args: real_timer(0.01, callback, args)), \
             patch.object(browser, "_kill_browser_group", side_effect=lambda group: stopped.set()) as force:
            browser._quit_browser(driver)
        self.assertTrue(stopped.is_set())
        driver.quit.assert_called_once()
        force.assert_called_once_with(12345)

    def test_shutdown_watchdog_is_cancelled_after_normal_quit(self):
        driver = MagicMock()
        driver._sandhya_process_group = 12345
        with patch.object(browser, "Timer") as timer:
            browser._quit_browser(driver)
        driver.quit.assert_called_once()
        timer.assert_called_once_with(3, browser._kill_browser_group, args=(12345,))
        timer.return_value.start.assert_called_once()
        timer.return_value.cancel.assert_called_once()
        timer.return_value.join.assert_called_once()

    def test_forced_cleanup_targets_only_the_owned_dedicated_group(self):
        with patch.object(browser.os, "getpgrp", return_value=10, create=True), \
             patch.object(browser.os, "getpgid", return_value=20, create=True), \
             patch.object(browser.signal, "SIGKILL", 9, create=True), \
             patch.object(browser.os, "killpg", create=True) as kill:
            browser._kill_browser_group(20)
            kill.assert_called_once_with(20, browser.signal.SIGKILL)
            kill.reset_mock()
            browser._kill_browser_group(10)
            browser._kill_browser_group(30)
            kill.assert_not_called()

    def test_only_one_browser_can_hold_the_instance_slot(self):
        with patch.object(browser, "_serverless", return_value=False), \
             patch.object(browser, "create_browser", return_value=MagicMock()) as create, \
             patch.object(browser, "_quit_browser") as quit_browser:
            with browser.browser_session():
                with self.assertRaises(browser.BrowserBusy):
                    with browser.browser_session():
                        pass
            self.assertEqual(create.call_count, 1)
            self.assertEqual(quit_browser.call_count, 1)
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
             patch.object(browser.Service, "process", SimpleNamespace(pid=12345), create=True), \
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

    def test_packaged_standard_chrome_keeps_normal_browser_capability(self):
        with tempfile.TemporaryDirectory() as root:
            bundle = Path(root) / "browser"
            bundle.mkdir()
            (bundle / "browser-kind").write_text("chrome")
            profile = tempfile.TemporaryDirectory()
            self.addCleanup(profile.cleanup)
            driver = MagicMock()
            with patch.dict(os.environ, {}, clear=True), \
                 patch.object(browser, "BUNDLE", bundle), \
                 patch.object(browser, "_serverless", return_value=True), \
                 patch.object(browser.sys, "platform", "linux"), \
                 patch.object(browser, "_validate_binaries"), \
                 patch.object(browser.diagnostics, "browser_environment"), \
                 patch.object(browser.diagnostics, "enabled", return_value=False), \
                 patch.object(browser.tempfile, "TemporaryDirectory", return_value=profile), \
                 patch.object(browser.Service, "process", SimpleNamespace(pid=12345), create=True), \
                 patch.object(browser.webdriver, "Chrome", return_value=driver) as chrome:
                result = browser.create_browser(scraping=True)
                self.assertEqual(chrome.call_args.kwargs["options"].capabilities["browserName"], "chrome")
                browser._quit_browser(result)
            driver.quit.assert_called_once()

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
