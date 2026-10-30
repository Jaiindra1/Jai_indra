"""Opt-in production diagnostics. Never log credentials or retailer page text."""
import json
import logging
import os
import platform
import re
import shutil
import subprocess
from contextvars import ContextVar
from pathlib import Path
from urllib.parse import urlsplit
from uuid import uuid4

from bs4 import BeautifulSoup

logger = logging.getLogger("sarathi.search_diagnostics")
_runtime_logged = False
_trace = ContextVar("search_diagnostic_trace", default=None)


def begin(retailer):
    if enabled():
        _trace.set(uuid4().hex[:12])
        event("retailer_started", retailer=retailer)


def enabled():
    return os.getenv("SEARCH_DIAGNOSTICS", "").lower() in {"1", "true", "yes"}


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
        logger.info(json.dumps({"event": name, "pid": os.getpid(), "trace": _trace.get(), **fields}, sort_keys=True))
    except Exception:
        pass  # Observability must never change a search outcome.


def error_details(error):
    """Classify SDK errors without emitting their message or stack trace."""
    text = " ".join(str(part).lower() for part in
                    (error, error.__cause__, error.__context__) if part is not None)
    reasons = [
        ("error while loading shared libraries", "missing_linux_library"),
        ("cannot open shared object file", "missing_linux_library"),
        ("only supports chrome version", "browser_driver_version_mismatch"),
        ("cannot find chrome binary", "browser_binary_missing"),
        ("no chrome binary", "browser_binary_missing"),
        ("unable to obtain driver", "driver_discovery_failed"),
        ("devtoolsactiveport", "chrome_startup_failed"),
        ("no usable sandbox", "sandbox_unavailable"),
        ("without --no-sandbox", "sandbox_rejected"),
        ("permission denied", "permission_denied"),
        ("dns error", "network_dns_failure"),
        ("failed to download", "download_failed"),
        ("certificate verify failed", "network_certificate_failure"),
        ("chrome instance exited", "chrome_exited"),
        ("timed out", "timeout"),
        ("timeout", "timeout"),
    ]
    return {"error_type": type(error).__name__,
            "reason": next((reason for marker, reason in reasons if marker in text), "unclassified")}


def version_number(value):
    match = re.search(r"\b\d+(?:\.\d+){1,3}\b", str(value))
    return match.group() if match else "unknown"


def browser_environment(refresh=False):
    """Report PATH/cache availability and unresolved Linux libraries, best effort."""
    global _runtime_logged
    if not enabled() or (_runtime_logged and not refresh):
        return
    _runtime_logged = True
    try:
        from importlib.metadata import version
        browsers = [shutil.which(name) for name in ("google-chrome", "google-chrome-stable", "chromium", "chromium-browser")]
        drivers = [shutil.which("chromedriver")]
        configured_browser = os.getenv("CHROME_BINARY_PATH")
        configured_driver = os.getenv("CHROMEDRIVER_PATH")
        # Manager cache availability is distinct from PATH availability.
        cache = Path(os.getenv("SE_CACHE_PATH") or Path.home() / ".cache" / "selenium")
        cached_chrome = list(cache.glob("chrome/**/chrome"))[:3] if cache.is_dir() else []
        cached_driver = list(cache.glob("chromedriver/**/chromedriver"))[:3] if cache.is_dir() else []
        event("browser_environment", platform=platform.system(), architecture=platform.machine(),
              selenium_version=version("selenium"), browser_on_path=any(browsers),
              driver_on_path=any(drivers), chrome_in_manager_cache=bool(cached_chrome),
              driver_in_manager_cache=bool(cached_driver),
              explicit_browser_configured=bool(configured_browser),
              explicit_driver_configured=bool(configured_driver),
              running_as_root=(os.geteuid() == 0) if hasattr(os, "geteuid") else False)
        if platform.system() == "Linux" and Path("/dev/shm").is_dir():
            space = shutil.disk_usage("/dev/shm")
            event("shared_memory", total_mb=space.total // (1024 * 1024), free_mb=space.free // (1024 * 1024))
        for kind, candidates in [("chrome", [configured_browser] + browsers + cached_chrome),
                                 ("chromedriver", [configured_driver] + drivers + cached_driver)]:
            binary = next((str(p) for p in candidates if p and Path(p).is_file()), None)
            if not binary:
                continue
            result = subprocess.run([binary, "--version"], capture_output=True, text=True, timeout=3)
            missing = sorted(set(re.findall(r"\b(lib[\w.+-]+\.so(?:\.[\d]+)*)", result.stderr)))
            event("binary_probe", binary=kind, exit_code=result.returncode,
                  version=version_number(result.stdout), mentioned_libraries=missing[:15])
            if platform.system() == "Linux" and shutil.which("ldd"):
                result = subprocess.run(["ldd", binary], capture_output=True, text=True, timeout=3)
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
