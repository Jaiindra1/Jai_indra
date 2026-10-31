"""Build-time Linux browser packaging. No runtime downloads or OS installation.

The AWS-compatible Chromium build avoids full desktop Chrome's GTK/X11 stack.
ChromeDriver uses the same MAJOR.MINOR.BUILD. AL2023 NSS libraries are supplied
by Sparticuz; other non-glibc dependencies are copied from the Linux build image.
Fail the build if dependencies, size, versions, or an offline startup test fail.
"""
import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import platform
import re
import shutil
import struct
import subprocess
import sys
import tarfile
from urllib.request import urlopen
import zipfile

import brotli

ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / "vendor/browser"
CACHE = ROOT / ".browser-downloads"
LOCK = json.loads((Path(__file__).with_name("browser-lock.json")).read_text())
# Leave 180 MiB for Python dependencies/framework/runtime overhead.
MAX_BROWSER_BYTES = 320 * 1024 * 1024
SYSTEM_LIBRARIES = re.compile(r"^(?:ld-linux|lib(?:c|m|dl|pthread|rt|resolv|util)\.so)")


def download(name, artifact):
    CACHE.mkdir(exist_ok=True)
    path = CACHE / name
    if not path.exists():
        partial = path.with_suffix(".partial")
        with urlopen(artifact["url"], timeout=120) as response, partial.open("wb") as output:
            shutil.copyfileobj(response, output)
        partial.replace(path)
    with path.open("rb") as source:
        digest = hashlib.file_digest(source, "sha256").hexdigest()
    if digest != artifact["sha256"]:
        raise RuntimeError(f"Checksum mismatch for {name}; remove cached artifact and retry.")
    return path


def extract_tar(raw, destination):
    destination.mkdir(parents=True, exist_ok=True)
    with tarfile.open(fileobj=io.BytesIO(raw)) as archive:
        archive.extractall(destination, filter="data")


def assert_linux_x64(path):
    with path.open("rb") as binary:
        header = binary.read(20)
    if header[:6] != b"\x7fELF\x02\x01" or struct.unpack("<H", header[18:20])[0] != 62:
        raise RuntimeError(f"Expected a Linux x86-64 ELF executable: {path.name}")
    path.chmod(0o755)


def library_env():
    env = os.environ.copy()
    env["LD_LIBRARY_PATH"] = str(BUNDLE / "lib") + ":" + env.get("LD_LIBRARY_PATH", "")
    return env


def collect_libraries():
    """ldd includes transitive dependencies; retain glibc and loader from runtime."""
    for binary in [BUNDLE / "chromium", BUNDLE / "chromedriver"]:
        result = subprocess.run(["ldd", str(binary)], capture_output=True, text=True,
                                timeout=20, env=library_env(), check=True)
        missing = re.findall(r"(\S+)\s+=>\s+not found", result.stdout)
        if missing:
            raise RuntimeError("Linux build image lacks required libraries: " + ", ".join(missing))
        for name, path in re.findall(r"(\S+)\s+=>\s+(/\S+)", result.stdout):
            target = BUNDLE / "lib" / name
            if not SYSTEM_LIBRARIES.match(name) and not target.exists():
                shutil.copy2(Path(path).resolve(), target)
    # Resolve again with bundled libraries to catch transitive omissions.
    for binary in [BUNDLE / "chromium", BUNDLE / "chromedriver"]:
        result = subprocess.run(["ldd", str(binary)], capture_output=True, text=True,
                                timeout=20, env=library_env(), check=True)
        if "not found" in result.stdout:
            raise RuntimeError("Bundled library resolution failed: " + result.stdout)


def prepare():
    package = download("chromium.tgz", LOCK["chromium_package"])
    driver = download("driver153.zip", LOCK["chromedriver"])
    # Remove stale files only from this script's fixed generated bundle directory.
    if BUNDLE.exists():
        shutil.rmtree(BUNDLE)
    BUNDLE.mkdir(parents=True)
    with tarfile.open(package) as archive:
        (BUNDLE / "chromium").write_bytes(brotli.decompress(archive.extractfile("package/bin/chromium.br").read()))
        for name, destination in [("al2023", BUNDLE), ("fonts", BUNDLE / "fonts"),
                                  ("swiftshader", BUNDLE)]:
            extract_tar(brotli.decompress(archive.extractfile(f"package/bin/{name}.tar.br").read()), destination)
        for member in archive.getmembers():
            if member.name.lower() in {"package/license", "package/license.md"}:
                (BUNDLE / "LICENSE.sparticuz").write_bytes(archive.extractfile(member).read())
    with zipfile.ZipFile(driver) as archive:
        for member in archive.namelist():
            name = Path(member).name
            if name in {"chromedriver", "LICENSE.chromedriver", "THIRD_PARTY_NOTICES.chromedriver"}:
                (BUNDLE / name).write_bytes(archive.read(member))
    for name in ("chromium", "chromedriver"):
        assert_linux_x64(BUNDLE / name)


def verify():
    collect_libraries()
    for name, expected in [("chromium", LOCK["browser_version"]), ("chromedriver", LOCK["driver_version"])]:
        output = subprocess.run([str(BUNDLE / name), "--version"], capture_output=True,
                                text=True, timeout=10, env=library_env(), check=True)
        if expected not in output.stdout:
            raise RuntimeError(f"Unexpected {name} version: {output.stdout}")
    # Test the exact production startup code with no retailer/network request.
    sys.path.insert(0, str(ROOT))
    os.environ["VERCEL"] = "1"
    os.environ["SEARCH_DIAGNOSTICS"] = "1"
    from core.browser import browser_health
    result = browser_health()
    print("BUILD_BROWSER_HEALTH", json.dumps(result), flush=True)
    if not result["startup_success"]:
        raise RuntimeError("Linux browser startup failed: " + result["error_category"])


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--prepare-only", action="store_true",
                        help="Extract/inspect Linux artifacts on Windows; does not prove Linux startup")
    args = parser.parse_args()
    if not args.prepare_only and (sys.platform != "linux" or platform.machine() not in {"x86_64", "AMD64"}):
        raise RuntimeError("Production browser build requires Linux x86-64.")
    prepare()
    if not args.prepare_only:
        verify()
    size = sum(path.stat().st_size for path in BUNDLE.rglob("*") if path.is_file())
    if size > MAX_BROWSER_BYTES:
        raise RuntimeError(f"Browser bundle is {size} bytes; exceeds 320 MiB browser budget.")
    manifest = {"platform": LOCK["platform"], "browser_version": LOCK["browser_version"],
                "driver_version": LOCK["driver_version"], "bundle_bytes": size,
                "linux_startup_verified": not args.prepare_only}
    (BUNDLE / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    if not args.prepare_only:
        archive = BUNDLE.with_suffix(".tar.gz")
        with tarfile.open(archive, "w:gz", compresslevel=6) as packaged:
            for path in sorted(BUNDLE.rglob("*")):
                packaged.add(path, arcname=path.relative_to(BUNDLE), recursive=False)
        if archive.stat().st_size > 160 * 1024 * 1024:
            raise RuntimeError("Compressed browser exceeds the 160 MiB packaging budget.")
        with archive.open("rb") as source:
            manifest["archive_sha256"] = hashlib.file_digest(source, "sha256").hexdigest()
        manifest["archive_bytes"] = archive.stat().st_size
        (BUNDLE.parent / "browser-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
        shutil.rmtree(BUNDLE)
        # Test the archive extraction path as well, not just the build directory.
        from core.browser import _validate_binaries, browser_health
        _validate_binaries.cache_clear()
        packaged_health = browser_health()
        print("PACKAGED_BROWSER_HEALTH", json.dumps(packaged_health), flush=True)
        if not packaged_health["startup_success"]:
            raise RuntimeError("Packaged browser startup failed: " + packaged_health["error_category"])
    print("BROWSER_BUNDLE", json.dumps(manifest), flush=True)


if __name__ == "__main__":
    main()
