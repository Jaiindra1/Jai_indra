
from contextlib import contextmanager
from functools import lru_cache
import math
import os
from pathlib import Path
import subprocess
import sys
from time import monotonic

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from core import search_diagnostics as diagnostics


@lru_cache(maxsize=4)
def _validate_binaries(browser_path, driver_path):
    """Bounded local checks once per path pair/process; never download anything."""
    versions = []
    for label, path in (("Chrome", browser_path), ("ChromeDriver", driver_path)):
        if not Path(path).is_file() or not os.access(path, os.X_OK):
            raise RuntimeError(f"Configured {label} executable is missing or not executable.")
    # Windows Chrome is a GUI executable and may not print --version to stdout.
    # ChromeDriver still enforces compatibility when creating the local session.
    if sys.platform == "win32":
        return
    for label, path in (("Chrome", browser_path), ("ChromeDriver", driver_path)):
        try:
            result = subprocess.run([path, "--version"], capture_output=True, text=True, timeout=5, check=True)
        except (OSError, subprocess.SubprocessError):
            raise RuntimeError(f"Configured {label} could not report its version. Check Linux dependencies.") from None
        version = diagnostics.version_number(result.stdout)
        if version == "unknown":
            raise RuntimeError(f"Configured {label} returned an unrecognized version.")
        versions.append(version)
    if versions[0].split(".")[0] != versions[1].split(".")[0]:
        raise RuntimeError("Configured Chrome and ChromeDriver major versions do not match.")
    diagnostics.event("explicit_binaries_verified", browser_version=versions[0], driver_version=versions[1])


def _explicit_paths():
    browser = os.getenv("CHROME_BINARY_PATH", "").strip()
    driver = os.getenv("CHROMEDRIVER_PATH", "").strip()
    if bool(browser) != bool(driver):
        raise RuntimeError("Configure CHROME_BINARY_PATH and CHROMEDRIVER_PATH together.")
    if not browser and os.getenv("RENDER", "").lower() == "true":
        raise RuntimeError("Render requires CHROME_BINARY_PATH and CHROMEDRIVER_PATH; runtime downloads are disabled.")
    return tuple(os.path.expandvars(os.path.expanduser(p)) for p in (browser, driver))


def _navigation_settings():
    """Unset values leave Selenium's existing defaults untouched."""
    strategy = os.getenv("SELENIUM_PAGE_LOAD_STRATEGY")
    if strategy is not None:
        strategy = strategy.strip().lower()
        if strategy not in {"normal", "eager", "none"}:
            raise ValueError("SELENIUM_PAGE_LOAD_STRATEGY must be normal, eager, or none.")
    raw_timeout = os.getenv("SELENIUM_PAGE_LOAD_TIMEOUT")
    timeout = None
    if raw_timeout is not None:
        try:
            timeout = float(raw_timeout)
        except ValueError:
            raise ValueError("SELENIUM_PAGE_LOAD_TIMEOUT must be a positive finite number of seconds.") from None
        if not math.isfinite(timeout) or timeout <= 0:
            raise ValueError("SELENIUM_PAGE_LOAD_TIMEOUT must be a positive finite number of seconds.")
    return strategy, timeout


def _quit_browser(driver):
    """Observe the existing quit operation without imposing a time guarantee."""
    started = monotonic()
    diagnostics.event("browser_cleanup_started")
    try:
        driver.quit()
    except Exception as error:
        diagnostics.event("browser_cleanup_failed", seconds=round(monotonic() - started, 2),
                          **diagnostics.error_details(error))
        raise
    else:
        diagnostics.event("browser_cleanup_finished", seconds=round(monotonic() - started, 2))


def create_browser():
    """Create and return a Selenium-controlled Chrome browser."""

    strategy, page_load_timeout = _navigation_settings()
    options = Options()
    if strategy is not None:
        options.page_load_strategy = strategy
    options.add_argument("--headless=new")
    options.add_argument("--log-level=3")
    if sys.platform.startswith("linux"):
        options.add_argument("--disable-dev-shm-usage")
        if os.getenv("CHROME_NO_SANDBOX", "").lower() in {"1", "true", "yes"}:
            options.add_argument("--no-sandbox")

    diagnostics.browser_environment()
    started = monotonic()
    diagnostics.event("browser_starting")
    driver = None
    try:
        browser_path, driver_path = _explicit_paths()
        if browser_path:
            _validate_binaries(browser_path, driver_path)
            options.binary_location = browser_path
            service = Service(executable_path=driver_path)
            # Keep a separate Selenium driver-path environment variable from
            # overriding the validated application configuration.
            service.path = driver_path
            diagnostics.event("browser_configuration", mode="explicit", selenium_manager=False)
            driver = webdriver.Chrome(service=service, options=options)
        else:
            # Preserve localhost Windows discovery when neither path is set.
            diagnostics.event("browser_configuration", mode="local_discovery", selenium_manager=True)
            driver = webdriver.Chrome(options=options)
        if page_load_timeout is not None:
            driver.set_page_load_timeout(page_load_timeout)
        diagnostics.event("browser_navigation_settings", page_load_strategy=strategy or "default",
                          page_load_timeout_seconds=page_load_timeout)
    except Exception as error:
        diagnostics.event("browser_start_failed", seconds=round(monotonic() - started, 2),
                          **diagnostics.error_details(error))
        # Manager may have downloaded a binary since the initial inventory.
        diagnostics.browser_environment(refresh=True)
        # A failed timeout-configuration command must not leak a created browser.
        if driver is not None:
            try:
                _quit_browser(driver)
            except Exception:
                pass  # Preserve the original configuration failure.
        raise
    if diagnostics.enabled():
        try:
            capabilities = driver.capabilities
            diagnostics.event("browser_started", seconds=round(monotonic() - started, 2),
                              browser_version=diagnostics.version_number(capabilities.get("browserVersion")),
                              driver_version=diagnostics.version_number(capabilities.get("chrome", {}).get("chromedriverVersion")))
        except Exception:
            diagnostics.event("browser_started", versions="unavailable")
    return driver


@contextmanager
def browser_session():
    """Create a browser and always close it when the session ends."""

    driver = create_browser()

    try:
        yield driver
    finally:
        _quit_browser(driver)
