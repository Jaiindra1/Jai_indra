"""Extract genuine Flipkart product gallery media, excluding feature icons."""
import re
from urllib.parse import urlsplit, urlunsplit

from ..html_utils import first_image, image_url
from . import selectors as S


_DIMENSIONS = re.compile(r"/image/(\d+)/(\d+)/", re.I)


def _media_url(value):
    """Accept Flipkart CDN product media and reject small specification icons."""
    if not isinstance(value, str):
        return None
    parsed = urlsplit(value)
    host = (parsed.hostname or "").casefold()
    if parsed.scheme != "https" or not (host == "flixcart.com" or host.endswith(".flixcart.com")):
        return None
    if "/internalised/" in parsed.path.casefold():
        return None
    dimensions = _DIMENSIONS.search(parsed.path)
    if dimensions and max(map(int, dimensions.groups())) < 200:
        return None
    path = _DIMENSIONS.sub("/image/1500/1500/", parsed.path)
    return urlunsplit((parsed.scheme, parsed.netloc, path, parsed.query, ""))


def _video_url(value):
    if not isinstance(value, str):
        return None
    parsed = urlsplit(value)
    host = (parsed.hostname or "").casefold()
    if parsed.scheme != "https" or not (host == "flixcart.com" or host.endswith(".flixcart.com")):
        return None
    return value if re.search(r"\.(?:mp4|webm)(?:$|\?)", parsed.path + ("?" + parsed.query if parsed.query else ""), re.I) else None


def _asset_key(value):
    """Treat multiple CDN sizes of the same underlying image as one asset."""
    path = urlsplit(value).path.casefold()
    return _DIMENSIONS.sub("/image/{size}/", path)


def extract_media(soup, metadata):
    # JSON-LD usually exposes a 1500px primary image; visible markup often holds
    # only a 300px copy of the same asset.
    primary = _media_url(metadata.get("image_url")) or _media_url(first_image(soup, S.IMAGE))
    images, keys = [], set()

    def add(value):
        value = _media_url(value)
        if not value:
            return
        key = _asset_key(value)
        if key not in keys:
            keys.add(key)
            images.append(value)

    add(primary)
    for selector in S.GALLERY:
        for node in soup.select(selector):
            add(image_url(node))
            if len(images) >= 20:
                break
    if len(images) < 20:
        for node in soup.select(S.CARD_IMAGES):
            # Similar-product images navigate elsewhere; small "internalised"
            # assets are specification symbols rather than product photos.
            if node.find_parent("a", href=True):
                continue
            add(image_url(node))
            if len(images) >= 20:
                break
    videos = []
    for node in soup.select("video[src], video source[src], [data-video-url]")[:20]:
        value = _video_url(node.get("src") or node.get("data-video-url"))
        if value and value not in videos:
            videos.append(value)
    return {"image_url": primary or (images[0] if images else None), "images": images, "videos": videos[:8]}
