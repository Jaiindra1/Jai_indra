"""Search diagnostics, on by default on Vercel. Never log credentials or page text."""
import json
import logging
import os
import platform
import re
import shutil
import subprocess
from contextlib import contextmanager
from contextvars import ContextVar
from datetime import datetime, timezone
from pathlib import Path
from time import monotonic
from urllib.error import HTTPError
from urllib.request import urlopen
from urllib.parse import urlsplit
from uuid import uuid4

from bs4 import BeautifulSoup

logger = logging.getLogger("sarathi.search_diagnostics")
_runtime_logged = False
_network_checked = False
_trace = ContextVar("search_diagnostic_trace", default=None)
_request_id = ContextVar("search_request_id", default=None)


@contextmanager
def request_scope():
    """Correlate all retailer events without logging the search query."""
    request_id = uuid4().hex[:16]
    request_token = _request_id.set(request_id)
    trace_token = _trace.set(None)
    started = monotonic()
    event("request_started", stage="validation")
    try:
        yield request_id
    finally:
        event("request_finished", seconds=round(monotonic() - started, 3))
        _trace.reset(trace_token)
        _request_id.reset(request_token)


def begin(retailer):
    if enabled():
        _trace.set(uuid4().hex[:12])
        event("retailer_started", retailer=retailer)


def enabled():
    value = os.getenv("SEARCH_DIAGNOSTICS")
    if value is None:
        return os.getenv("VERCEL", "").lower() in {"1", "true"}
    return value.lower() in {"1", "true", "yes"}


def event(name, **fields):
    if not enabled():
        return
    try:
        # INFO must reach stderr even when Gunicorn's root log level is WARNING.
        if not logger.handlers:
            handler = logging.StreamHandler()
            handler.setFormatter(logging.Formatter("[search-diagnostics] %(message)s"))
            logger.addHandler(handler)
            logger.setLevel(logging.INFO)
            logger.propagate = False
        logger.info(json.dumps({"event": name, "pid": os.getpid(),
                               "timestamp": datetime.now(timezone.utc).isoformat(),
                               "request_id": _request_id.get(), "trace": _trace.get(),
                               **fields}, sort_keys=True))
    except Exception:
        pass  # Observability must never change a search outcome.


def error_details(error):
    """Classify SDK errors without emitting their message or stack trace."""
    text = " ".join(str(part).lower() for part in
                    (error, error.__cause__, error.__context__) if part is not None)
    reasons = [
        ("error while loading shared libraries", "missing_linux_library"),
        ("cannot open shared object file", "missing_linux_library"),
        ("missing linux libraries", "missing_linux_library"),
        ("browser bundle integrity", "bundle_integrity_failed"),
        ("browser capacity is busy", "browser_busy"),
        ("unable to discover open pages", "browser_initial_page_missing"),
        ("build versions do not match", "browser_driver_version_mismatch"),
        ("only supports chrome version", "browser_driver_version_mismatch"),
        ("cannot find chrome binary", "browser_binary_missing"),
        ("no chrome binary", "browser_binary_missing"),
        ("configured chrome executable is missing", "browser_binary_missing"),
        ("configured chromedriver executable is missing", "driver_binary_missing"),
        ("configure chrome_binary_path and chromedriver_path together", "incomplete_binary_configuration"),
        ("unable to obtain driver", "driver_discovery_failed"),
        ("devtoolsactiveport", "chrome_startup_failed"),
        ("no usable sandbox", "sandbox_unavailable"),
        ("without --no-sandbox", "sandbox_rejected"),
        ("permission denied", "permission_denied"),
        ("dns error", "network_dns_failure"),
        ("failed to download", "download_failed"),
        ("certificate verify failed", "network_certificate_failure"),
        ("chrome instance exited", "chrome_exited"),
        ("chrome not reachable", "browser_not_reachable"),
        ("cannot connect to chrome", "browser_not_reachable"),
        ("timed out", "timeout"),
        ("timeout", "timeout"),
    ]
    return {"error_type": type(error).__name__,
            "reason": next((reason for marker, reason in reasons if marker in text), "unclassified")}


def version_number(value):
    match = re.search(r"\b\d+(?:\.\d+){1,3}\b", str(value))
    return match.group() if match else "unknown"


def compare_network(retailer, url, selector):
    """One diagnostic-only direct HTTPS request per worker; never product data.

    Compare a generic browser 503 with the same server's default Python HTTPS
    stack. No UA override, proxy, credentials, response text or full URL logged.
    """
    global _network_checked
    if not enabled() or _network_checked:
        return
    if retailer != "Amazon" or urlsplit(url).hostname != "www.amazon.in":
        return
    _network_checked = True
    started = monotonic()
    try:
        try:
            response = urlopen(url, timeout=2)
        except HTTPError as error:
            response = error
        with response:
            status = response.status
            soup = BeautifulSoup(response.read(512 * 1024), "html.parser")
            for tag in soup(["script", "style"]):
                tag.decompose()
            text = " ".join(soup.get_text(" ", strip=True).lower().split())
            kind = "unclassified"
            if any(marker in text for marker in ("captcha", "not a robot", "robot check")):
                kind = "captcha"
            elif any(marker in text for marker in ("automated access", "access denied")):
                kind = "access_restricted"
            elif any(marker in text for marker in ("something went wrong", "service unavailable")):
                kind = "upstream_error"
            cards = len(soup.select(selector))
            if status == 200 and cards:
                kind = "product_results"
            event("network_comparison", retailer=retailer, transport="python_https",
                  http_status=status, page_kind=kind, cards=cards,
                  same_host=urlsplit(response.url).hostname in {"amazon.in", "www.amazon.in"},
                  seconds=round(monotonic() - started, 3))
    except Exception as error:
        event("network_comparison_failed", retailer=retailer, transport="python_https",
              seconds=round(monotonic() - started, 3), **error_details(error))


def browser_environment(refresh=False):
    """Report PATH/cache availability and unresolved Linux libraries, best effort."""
    global _runtime_logged
    if not enabled() or (_runtime_logged and not refresh):
        return
    _runtime_logged = True
    try:
        from importlib.metadata import version
        browsers = [shutil.which(name) for name in ("google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "chrome")]
        browser_on_path = any(browsers)
        if platform.system() == "Windows":
            for variable in ("PROGRAMFILES", "PROGRAMFILES(X86)", "LOCALAPPDATA"):
                base = os.getenv(variable)
                if base:
                    candidate = Path(base) / "Google/Chrome/Application/chrome.exe"
                    if candidate.is_file():
                        browsers.append(str(candidate))
        drivers = [shutil.which("chromedriver")]
        configured_browser = os.getenv("CHROME_BINARY_PATH")
        configured_driver = os.getenv("CHROMEDRIVER_PATH")
        # Runtime fallback paths are explicit too, even without dashboard env vars.
        from core.browser import _explicit_paths, _bundle_dir, _serverless
        if _serverless():
            configured_browser, configured_driver = _explicit_paths()
        probe_env = os.environ.copy()
        if _serverless():
            probe_env["LD_LIBRARY_PATH"] = str(_bundle_dir() / "lib") + ":" + probe_env.get("LD_LIBRARY_PATH", "")
        # Manager cache availability is distinct from PATH availability.
        cache = Path(os.getenv("SE_CACHE_PATH") or Path.home() / ".cache" / "selenium")
        browser_name = "chrome.exe" if platform.system() == "Windows" else "chrome"
        driver_name = "chromedriver.exe" if platform.system() == "Windows" else "chromedriver"
        cached_chrome = list(cache.glob(f"chrome/**/{browser_name}"))[:3] if cache.is_dir() else []
        cached_driver = list(cache.glob(f"chromedriver/**/{driver_name}"))[:3] if cache.is_dir() else []
        event("browser_environment", platform=platform.system(), architecture=platform.machine(),
              execution_region=os.getenv("VERCEL_REGION", "local"),
              selenium_version=version("selenium"), browser_on_path=browser_on_path,
              browser_installed=any(browsers) or bool(configured_browser and Path(configured_browser).is_file()),
              driver_on_path=any(drivers), chrome_in_manager_cache=bool(cached_chrome),
              driver_in_manager_cache=bool(cached_driver),
              explicit_browser_configured=bool(configured_browser),
              explicit_driver_configured=bool(configured_driver),
              explicit_browser_exists=Path(os.path.expandvars(os.path.expanduser(configured_browser))).is_file() if configured_browser else False,
              explicit_driver_exists=Path(os.path.expandvars(os.path.expanduser(configured_driver))).is_file() if configured_driver else False,
              running_as_root=(os.geteuid() == 0) if hasattr(os, "geteuid") else False)
        if platform.system() == "Linux" and Path("/dev/shm").is_dir():
            space = shutil.disk_usage("/dev/shm")
            event("shared_memory", total_mb=space.total // (1024 * 1024), free_mb=space.free // (1024 * 1024))
        for kind, candidates in [("chrome", [configured_browser] + browsers + cached_chrome),
                                 ("chromedriver", [configured_driver] + drivers + cached_driver)]:
            binary = next((str(p) for p in candidates if p and Path(p).is_file()), None)
            if not binary:
                event("binary_unavailable", binary=kind, stage="browser_startup")
                continue
            if platform.system() == "Windows" and kind == "chrome":
                event("binary_probe", binary=kind, available=True, version="checked_on_session_start")
                continue
            result = subprocess.run([binary, "--version"], capture_output=True, text=True, timeout=3, env=probe_env)
            missing = sorted(set(re.findall(r"\b(lib[\w.+-]+\.so(?:\.[\d]+)*)", result.stderr)))
            event("binary_probe", binary=kind, exit_code=result.returncode,
                  version=version_number(result.stdout), mentioned_libraries=missing[:15])
            if platform.system() == "Linux" and shutil.which("ldd"):
                result = subprocess.run(["ldd", binary], capture_output=True, text=True, timeout=3, env=probe_env)
                missing = re.findall(r"\b([\w.+-]+\.so(?:\.\d+)*)\s+=>\s+not found", result.stdout)
                event("linux_libraries", binary=kind, exit_code=result.returncode,
                      missing_libraries=missing[:20])
    except Exception as error:
        event("environment_probe_incomplete", **error_details(error))


def page(retailer, driver, phase, card_selector, link_selector=None, products=None):
    """Counts and classifications only: no page title, body, query, or full URL."""
    if not enabled():
        return
    try:
        soup = BeautifulSoup(driver.page_source, "html.parser")
        title = soup.title.get_text(" ", strip=True).lower() if soup.title else ""
        for tag in soup(["script", "style"]):
            tag.decompose()
        text = " ".join(soup.get_text(" ", strip=True).lower().split())
        markers = [
            ("captcha", "captcha"), ("robot check", "captcha"),
            ("enter the characters you see below", "captcha"),
            ("verify you are human", "captcha"), ("access denied", "access_denied"),
            ("automated access", "blocked"), ("before you continue", "possible_consent"),
            ("no results for", "no_results"), ("no results found", "no_results"),
        ]
        kind = next((kind for marker, kind in markers if marker in title or marker in text), "unclassified")
        host = (urlsplit(driver.current_url).hostname or "").removeprefix("www.")
        event("retailer_page", retailer=retailer, phase=phase,
              host=host if host in {"amazon.in", "flipkart.com"} else "other",
              page_kind=kind, cards=len(soup.select(card_selector)),
              product_links=len(soup.select(link_selector)) if link_selector else None,
              products=products)
    except Exception as error:
        event("page_probe_incomplete", retailer=retailer, phase=phase, **error_details(error))
