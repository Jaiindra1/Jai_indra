import json
from urllib.request import Request, urlopen


class GroqClient:
    def __init__(self, key, model, timeout):
        self.key, self.model, self.timeout = key, model, timeout

    def generate(self, prompt, schema):
        body = {"model": self.model, "temperature": 0, "messages": [{"role": "user", "content": prompt}],
                "response_format": {"type": "json_schema", "json_schema": {"name": "sarathi", "strict": True, "schema": schema}}}
        request = Request("https://api.groq.com/openai/v1/chat/completions", json.dumps(body).encode(),
                          {"Authorization": "Bearer " + self.key, "Content-Type": "application/json"}, method="POST")
        with urlopen(request, timeout=self.timeout) as response:
            return json.loads(json.load(response)["choices"][0]["message"]["content"])
