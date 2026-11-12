"""Small process-local cache; no database and no cross-worker guarantees."""
from copy import deepcopy
from threading import Lock
from time import monotonic

_CACHE = {}
_CACHE_LOCK = Lock()


def _cache_get(key):
    with _CACHE_LOCK:
        saved = _CACHE.get(key)
        if not saved:
            return None
        if saved[0] <= monotonic():
            del _CACHE[key]
            return None
        return deepcopy(saved[1])


def _cache_put(key, product, ttl):
    if ttl <= 0:
        return
    with _CACHE_LOCK:
        if len(_CACHE) >= 256:
            del _CACHE[min(_CACHE, key=lambda item: _CACHE[item][0])]
        _CACHE[key] = (monotonic() + ttl, deepcopy(product))
