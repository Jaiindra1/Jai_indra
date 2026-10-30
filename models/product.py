
from dataclasses import asdict, dataclass, field
from typing import Any, Optional


@dataclass
class Product:
    # Product title from the retailer.
    name: str

    # Current listed price, if available.
    price: Optional[str] = None

    # Customer rating, if available.
    rating: Optional[str] = None

    # Original product page URL.
    url: Optional[str] = None

    # Product image URL, if available.
    image_url: Optional[str] = None

    # Retailer providing the listing.
    retailer: str = "Unknown"

    # General product category, such as Electronics, Toys, or Clothing.
    category: str = "Other"

    # Flexible attributes that vary by product category.
    specifications: dict[str, Any] = field(default_factory=dict)

    # Availability information, if available.
    availability: Optional[str] = None

    # Original listed price, if available.
    original_price: Optional[str] = None

    highlights: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        # Convert the model into a dictionary for the HTML page.
        return asdict(self)
