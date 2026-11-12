"""Flipkart selectors grouped by meaning with supported layout fallbacks.

Opaque retailer classes change. Keep each fallback documented here and test
it with a product-page fixture; avoid collecting recommendation-card data.
"""
TITLE = ("h1 span.VU-ZEz", "h1 span.B_NuCI", "h1 span", "h1")
READY = "h1 span.VU-ZEz, h1 span.B_NuCI, h1"
PRICE = ("div.CEmiEU div.Nx9bqj", "div._25b18c div._30jeq3",
         "div.Nx9bqj.CxhGGd", "div._30jeq3._16Jk6d", 'div.v1zwn20[font="default-fk-font-m"]')
ORIGINAL_PRICE = ("div.CEmiEU div.yRaY8j", "div._25b18c div._3I9_wc",
                  r"div.yRaY8j.A6\+E6v", "div._3I9_wc._2p6lqe")
AVAILABILITY = ("div._16FRp0", "div._2JC05C", "div.ZjO2L_")
TABLES = ("div._3k-BhJ table", "div.GNDEQ- table", "div._1UhVsV table",
          "section._3f_B1E table", "table._14cfVK", "#specifications table")
DETAIL_ROWS = "div._3k-BhJ div._2k4JXJ, div.GNDEQ- div._2k4JXJ"
IMAGE = ("img.DByuf4", "img._396cs4", "div._3kidJX img", 'meta[property="og:image"]')
GALLERY = ("div._3kidJX img", "ul.ZqtVYK img", "ul._3GnUWp img")
HIGHLIGHTS = ("div._1mXcCf li", "div._2cM9lP li", "div._3xFhiH li")
DESCRIPTION = (r"div.yN\+eNk", "div._1mXcCf ._1AN87F", "div._1AN87F", "#description")
RATING = ("div._3LWZlK", "div.XQDdHH")
RATING_COUNT = ("span.Wphh3N", "span._2_R_DZ")
OFFERS = ("li.kF1Ml8", "li._16eBzU", "#offers li")
PURCHASE = {
    "seller": ("#sellerName span span", "#sellerName"),
    "delivery": ("#deliveryMessage", "div._3XINqE", "div.hVvnXm"),
    "warranty": ("div._3h9TMa", "div._2ptWuB"),
    "return_policy": ("#return-policy", "div._2MJMLX"),
}
VARIANTS = ("#variants", "div._1rcQuH", "div._2n7_Q3")
EXPAND = ("button._2KpZ6l._1FH0tX",)

# Card layout observed on a live Flipkart product page, 2026-11-10.
# Typography classes distinguish the main purchase price from recommendation prices.
CARD_ORIGINAL_PRICE = ('div.v1zwn21[style*="line-through"]',)
SPEC_CARDS = ".grid-formation-dynamic"
CARD_LABEL = ".v1zwn28"
CARD_VALUE = ".v1zwn27"
CARD_IMAGES = 'img[alt="Image"][data-highres-loaded][src*="flixcart.com/image/"]'
DETAIL_LABELS = ("Warranty Summary", "Covered in Warranty", "Not Covered in Warranty",
                 "Warranty Service Type", "Generic Name", "Country of Origin",
                 "Name and address of the Manufacturer", "Name and address of the Packer")
