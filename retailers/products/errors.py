"""Typed retrieval failures shared by navigation and the application service."""


class ProductDetailError(Exception):
    def __init__(self, reason: str, message: str):
        super().__init__(message)
        self.reason, self.message = reason, message
