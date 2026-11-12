"""Extract high-resolution product images and genuine product videos."""
import re
from urllib.parse import urlsplit, urlunsplit
from ..html_utils import first_image, image_url
from ..section_utils import gallery
from . import selectors as S


def _high_resolution(value):
    if not isinstance(value, str):
        return None
    parsed = urlsplit(value)
    if parsed.scheme != "https" or not (parsed.hostname or "").endswith("amazon.com"):
        return value
    path = re.sub(r"\._[^/]+_\.(jpg|jpeg|png|webp)$", r".\1", parsed.path, flags=re.I)
    return urlunsplit((parsed.scheme, parsed.netloc, path, parsed.query, ""))


def _video(value):
    if not isinstance(value, str): return None
    parsed = urlsplit(value)
    host = (parsed.hostname or "").casefold()
    trusted = host.endswith("media-amazon.com") or host.endswith("amazonaws.com") or host.endswith("ssl-images-amazon.com")
    return value if parsed.scheme == "https" and trusted and re.search(r"\.(?:mp4|webm)(?:$|\?)", value, re.I) else None


def extract_media(soup, metadata):
    primary = _high_resolution(first_image(soup, S.IMAGE) or metadata.get("image_url"))
    images = []
    for value in gallery(soup, S.GALLERY, primary):
        value = _high_resolution(value)
        if value and value not in images: images.append(value)
    videos = []
    for node in soup.select("video[src], video source[src], [data-video-url]")[:20]:
        value = _video(node.get("src") or node.get("data-video-url"))
        if value and value not in videos: videos.append(value)
    # Amazon often stores product-video MP4 URLs in bounded JSON scripts.
    for script in soup.select("script")[:200]:
        raw = script.string or ""
        if "mp4" not in raw.casefold() or len(raw) > 500_000: continue
        for found in re.findall(r'https:\\/\\/[^"\\]+?\.mp4[^"\\]*', raw):
            value = _video(found.replace("\\/", "/"))
            if value and value not in videos: videos.append(value)
    return {"image_url": primary, "images": images, "videos": videos[:8]}
