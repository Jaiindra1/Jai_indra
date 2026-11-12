import hashlib
import json
from services.ai.ai_cache import TTLCache
from services.ai.ai_config import AIConfig
from services.ai.gemini_client import GeminiClient
from services.ai.groq_client import GroqClient


class AIUnavailable(RuntimeError):
    pass


class AIProvider:
    def __init__(self, config=None, clients=None):
        self.config = config or AIConfig.from_env()
        self.cache = TTLCache(self.config.cache_ttl)
        self.clients = clients or {}

    def generate(self, prompt, schema):
        if not self.config.enabled:
            raise AIUnavailable("AI is disabled")
        key = hashlib.sha256(json.dumps([prompt, schema], sort_keys=True).encode()).hexdigest()
        if (saved := self.cache.get(key)) is not None:
            return saved
        providers = [("gemini", self.config.gemini_api_key, self.config.gemini_model, GeminiClient),
                     ("groq", self.config.groq_api_key, self.config.groq_model, GroqClient)]
        for name, api_key, model, client_type in providers:
            if not api_key:
                continue
            try:
                client = self.clients.get(name) or client_type(api_key, model, self.config.timeout)
                result = client.generate(prompt, schema), name
                self.cache.set(key, result)
                return result
            except Exception:
                continue
        raise AIUnavailable("All configured AI providers failed")
