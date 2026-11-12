from time import monotonic


class TTLCache:
    def __init__(self, ttl=1800):
        self.ttl, self.values = ttl, {}

    def get(self, key):
        saved = self.values.get(key)
        if not saved or monotonic() - saved[0] > self.ttl:
            self.values.pop(key, None)
            return None
        return saved[1]

    def set(self, key, value):
        if len(self.values) >= 128:
            self.values.pop(next(iter(self.values)))
        self.values[key] = monotonic(), value
