import json
from urllib.parse import quote
from urllib.request import Request, urlopen


class GeminiClient:
    def __init__(self, key, model, timeout):
        self.key, self.model, self.timeout = key, model, timeout

    def generate(self, prompt, schema):
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{quote(self.model, safe='')}:generateContent?key={quote(self.key, safe='')}"
        body = {"contents": [{"parts": [{"text": prompt}]}], "generationConfig": {
            "temperature": 0, "maxOutputTokens": 1000, "responseMimeType": "application/json",
            "responseJsonSchema": schema}}
        with urlopen(Request(url, json.dumps(body).encode(), {"Content-Type": "application/json"}, method="POST"), timeout=self.timeout) as response:
            payload = json.load(response)
        return json.loads(payload["candidates"][0]["content"]["parts"][0]["text"])
