from dataclasses import dataclass
import os


@dataclass(frozen=True)
class AIConfig:
    enabled: bool
    gemini_api_key: str
    gemini_model: str
    groq_api_key: str
    groq_model: str
    timeout: int = 7
    cache_ttl: int = 1800

    @classmethod
    def from_env(cls):
        return cls(os.getenv("AI_ENABLED", "false").casefold() in {"1", "true", "yes"},
                   os.getenv("GEMINI_API_KEY", "").strip(), os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip(),
                   os.getenv("GROQ_API_KEY", "").strip(), os.getenv("GROQ_MODEL", "openai/gpt-oss-20b").strip(),
                   max(1, min(12, int(os.getenv("AI_REQUEST_TIMEOUT", "7")))))
