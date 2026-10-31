
from contextlib import contextmanager
from functools import lru_cache
import math
import errno
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
from threading import Lock
from time import monotonic
from xml.sax.saxutils import escape

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from core import search_diagnostics as diagnostics

BUNDLE = Path(__file__).resolve().parents[1] / "vendor/browser"
RUNTIME_TMP = Path("/tmp") if sys.platform.startswith("linux") else Path(tempfile.gettempdir())
_bundle_lock = Lock()


def _bundle_dir():
    """Offline cold-start extraction; binaries are shipped inside the function."""
    archive = BUNDLE.with_suffix(".tar.gz")
    if BUNDLE.is_dir() or not archive.is_file():
        return BUNDLE
    manifest = json.loads((BUNDLE.parent / "browser-manifest.json").read_text())
    digest = manifest["archive_sha256"]
    target = RUNTIME_TMP / ("sandhya-browser-" + digest[:16])
    with _bundle_lock:
        if not (target / "chromium").is_file() or not (target / "chromedriver").is_file():
            started = monotonic()
            with archive.open("rb") as source:
                if hashlib.file_digest(source, "sha256").hexdigest() != digest:
                    raise RuntimeError("Browser bundle integrity check failed.")
            with tempfile.TemporaryDirectory(prefix="sandhya-unpack-", dir=RUNTIME_TMP) as staging:
                with tarfile.open(archive) as packaged:
                    packaged.extractall(staging, filter="data")
                for name in ("chromium", "chromedriver"):
                    (Path(staging) / name).chmod(0o755)
                try:
                    os.rename(staging, target)
                except OSError as error:
                    # Another process has atomically published the same archive.
                    if error.errno not in {errno.EEXIST, errno.ENOTEMPTY} or not (target / "chromium").is_file() or not (target / "chromedriver").is_file():
                        raise
            diagnostics.event("browser_bundle_extracted", seconds=round(monotonic() - started, 3),
                              expanded_bytes=manifest["bundle_bytes"])
    return target


def _serverless():
    return sys.platform.startswith("linux") and os.getenv("VERCEL", "").lower() in {"1", "true"}


def _child_environment(workspace):
    """Only browser subprocesses get a writable HOME; Flask environment is untouched."""
    env = os.environ.copy()
    if not _serverless():
        return env
    for name in ("profile", "cache", "config", "selenium", "font-cache"):
        (workspace / name).mkdir(exist_ok=True)
    env.update(HOME=str(workspace), TMPDIR=str(workspace),
               XDG_CACHE_HOME=str(workspace / "cache"),
               XDG_CONFIG_HOME=str(workspace / "config"),
               SE_CACHE_PATH=str(workspace / "selenium"), SE_OFFLINE="true")
    bundle = _bundle_dir()
    libraries = bundle / "lib"
    env["LD_LIBRARY_PATH"] = str(libraries) + ":" + env.get("LD_LIBRARY_PATH", "")
    config = workspace / "fonts.conf"
    config.write_text("<?xml version='1.0'?><!DOCTYPE fontconfig SYSTEM 'fonts.dtd'>"
                      "<fontconfig><dir>" + escape(str(bundle / "fonts/fonts")) + "</dir>"
                      "<cachedir>" + escape(str(workspace / "font-cache")) + "</cachedir></fontconfig>")
    env["FONTCONFIG_FILE"] = str(config)
    return env


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
            env = os.environ.copy()
            if _serverless():
                env["LD_LIBRARY_PATH"] = str(_bundle_dir() / "lib") + ":" + env.get("LD_LIBRARY_PATH", "")
            result = subprocess.run([path, "--version"], capture_output=True, text=True,
                                    timeout=5, check=True, env=env)
        except subprocess.CalledProcessError as error:
            missing = sorted(set(re.findall(r"\b(lib[\w.+-]+\.so(?:\.[\d]+)*)", error.stderr or "")))
            diagnostics.event("binary_validation_failed", binary=label.lower(),
                              exit_code=error.returncode, mentioned_libraries=missing)
            if "shared libraries" in (error.stderr or ""):
                raise RuntimeError("Browser binary has missing Linux libraries.") from None
            raise RuntimeError(f"Configured {label} could not report its version.") from None
        except (OSError, subprocess.SubprocessError):
            raise RuntimeError(f"Configured {label} could not report its version. Check Linux dependencies.") from None
        version = diagnostics.version_number(result.stdout)
        if version == "unknown":
            raise RuntimeError(f"Configured {label} returned an unrecognized version.")
        versions.append(version)
    if versions[0].split(".")[:3] != versions[1].split(".")[:3]:
        raise RuntimeError("Configured Chrome and ChromeDriver build versions do not match.")
    diagnostics.event("explicit_binaries_verified", browser_version=versions[0], driver_version=versions[1])


def _explicit_paths():
    browser = os.getenv("CHROME_BINARY_PATH", "").strip()
    driver = os.getenv("CHROMEDRIVER_PATH", "").strip()
    if bool(browser) != bool(driver):
        raise RuntimeError("Configure CHROME_BINARY_PATH and CHROMEDRIVER_PATH together.")
    if not browser and _serverless():
        # Always explicit on Vercel, even if the build bundle is missing. Never
        # fall through to Selenium Manager/network downloads in a request.
        bundle = _bundle_dir()
        browser, driver = str(bundle / "chromium"), str(bundle / "chromedriver")
    if not browser and os.getenv("RENDER", "").lower() == "true":
        raise RuntimeError("Render requires CHROME_BINARY_PATH and CHROMEDRIVER_PATH; runtime downloads are disabled.")
    return tuple(os.path.expandvars(os.path.expanduser(p)) for p in (browser, driver))


def _navigation_settings():
    """Unset values leave Selenium's existing defaults untouched."""
    strategy = os.getenv("SELENIUM_PAGE_LOAD_STRATEGY", "eager" if _serverless() else None)
    if strategy is not None:
        strategy = strategy.strip().lower()
        if strategy not in {"normal", "eager", "none"}:
            raise ValueError("SELENIUM_PAGE_LOAD_STRATEGY must be normal, eager, or none.")
    raw_timeout = os.getenv("SELENIUM_PAGE_LOAD_TIMEOUT", "20" if _serverless() else None)
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
    finally:
        temporary = getattr(driver, "_sandhya_workspace", None)
        if temporary is not None:
            temporary.cleanup()


def create_browser():
    """Create and return a Selenium-controlled Chrome browser."""

    strategy, page_load_timeout = _navigation_settings()
    options = Options()
    if strategy is not None:
        options.page_load_strategy = strategy
    options.add_argument("--headless=new")
    options.add_argument("--log-level=3")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1365,900")
    if sys.platform.startswith("linux"):
        options.add_argument("--disable-dev-shm-usage")
        if _serverless() or os.getenv("CHROME_NO_SANDBOX", "").lower() in {"1", "true", "yes"}:
            options.add_argument("--no-sandbox")
    temporary = None

    diagnostics.browser_environment()
    started = monotonic()
    diagnostics.event("browser_starting")
    driver = None
    try:
        browser_path, driver_path = _explicit_paths()
        env = os.environ.copy()
        if _serverless():
            temporary = tempfile.TemporaryDirectory(prefix="sandhya-chrome-", dir="/tmp")
            workspace = Path(temporary.name)
            env = _child_environment(workspace)
            options.add_argument(f"--user-data-dir={workspace / 'profile'}")
            options.add_argument(f"--disk-cache-dir={workspace / 'cache'}")
            options.add_argument("--disk-cache-size=16777216")
            options.add_argument("--no-zygote")
            options.add_argument("--single-process")
            options.add_argument("--disable-webgl")
        if browser_path:
            _validate_binaries(browser_path, driver_path)
            options.binary_location = browser_path
            if _serverless() and not os.getenv("CHROME_BINARY_PATH", "").strip():
                # This binary is chrome-headless-shell. With a custom profile,
                # ChromeDriver creates the required initial page only when the
                # correct browserName is supplied (chrome_launcher.cc).
                options.set_capability("browserName", "chrome-headless-shell")
            service = Service(executable_path=driver_path, env=env)
            # Keep a separate Selenium driver-path environment variable from
            # overriding the validated application configuration.
            service.path = driver_path
            diagnostics.event("browser_configuration", mode="explicit", selenium_manager=False)
            driver = webdriver.Chrome(service=service, options=options)
        else:
            # Preserve localhost Windows discovery when neither path is set.
            diagnostics.event("browser_configuration", mode="local_discovery", selenium_manager=True)
            driver = webdriver.Chrome(options=options)
        if temporary is not None:
            driver._sandhya_workspace = temporary
        if page_load_timeout is not None:
            driver.set_page_load_timeout(page_load_timeout)
        diagnostics.event("browser_navigation_settings", page_load_strategy=strategy or "default",
                          page_load_timeout_seconds=page_load_timeout)
    except Exception as error:
        # InitSession has no retailer content/query. Keep its short diagnostic
        # message in private logs, never in the browser-health response.
        summary = str(getattr(error, "msg", error)).split("Stacktrace:")[0]
        summary = re.sub(r"https?://\S+", "[url]", summary)
        summary = re.sub(r"(?:/[^\s:]+){2,}", "[path]", summary)
        summary = re.sub(r"(?i)(password|token|secret|key)=\S+", r"\1=[redacted]", summary)
        diagnostics.event("browser_start_failed", seconds=round(monotonic() - started, 2),
                          detail=summary[:500],
                          **diagnostics.error_details(error))
        # Manager may have downloaded a binary since the initial inventory.
        diagnostics.browser_environment(refresh=True)
        # A failed timeout-configuration command must not leak a created browser.
        if driver is not None:
            try:
                _quit_browser(driver)
            except Exception:
                pass  # Preserve the original configuration failure.
        elif temporary is not None:
            temporary.cleanup()
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


def binary_availability():
    """Public-safe flags only. Never return filesystem paths."""
    browser, driver = _explicit_paths()
    if not browser and sys.platform == "win32":
        candidates = [Path(os.getenv(name, "")) / "Google/Chrome/Application/chrome.exe"
                      for name in ("PROGRAMFILES", "PROGRAMFILES(X86)", "LOCALAPPDATA")]
        browser = next((str(path) for path in candidates if path.is_file()), "")
        cache = Path(os.getenv("SE_CACHE_PATH") or Path.home() / ".cache/selenium")
        driver = next((str(path) for path in cache.glob("chromedriver/**/chromedriver.exe")), "")
    browser = browser or shutil.which("google-chrome") or shutil.which("chromium") or ""
    driver = driver or shutil.which("chromedriver") or ""
    return {"browser_available": bool(browser and Path(browser).is_file()),
            "driver_available": bool(driver and Path(driver).is_file()),
            "browser_executable": bool(browser and os.access(browser, os.X_OK)),
            "driver_executable": bool(driver and os.access(driver, os.X_OK))}


def browser_health():
    """Offline startup smoke test, with sanitized failures and guaranteed quit."""
    result = {"browser_available": False, "driver_available": False,
              "browser_executable": False, "driver_executable": False,
              "startup_success": False, "error_category": None}
    try:
        result.update(binary_availability())
        with browser_session() as driver:
            driver.set_page_load_timeout(5)
            driver.get("data:text/html,<title>Sandhya browser check</title>")
            if driver.title != "Sandhya browser check":
                raise RuntimeError("Browser smoke test did not load the expected page.")
            result.update(browser_available=True, driver_available=True,
                          browser_executable=True, driver_executable=True,
                          browser_version=diagnostics.version_number(driver.capabilities.get("browserVersion")),
                          driver_version=diagnostics.version_number(driver.capabilities.get("chrome", {}).get("chromedriverVersion")))
        result["startup_success"] = True
        diagnostics.event("browser_health_finished", stage="browser_startup", success=True)
    except Exception as error:
        result["error_category"] = diagnostics.error_details(error)["reason"]
        diagnostics.event("browser_health_failed", stage="browser_startup", **diagnostics.error_details(error))
    return result


@contextmanager
def browser_session():
    """Create a browser and always close it when the session ends."""

    driver = create_browser()

    try:
        yield driver
    finally:
        _quit_browser(driver)
