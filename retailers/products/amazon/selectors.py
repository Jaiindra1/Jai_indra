"""Amazon product-page selectors, primary layout first, older layouts last.

Keep selectors inside product sections so recommendation cards cannot supply
the selected product's price or specifications. Update with an HTML fixture
and a regression test whenever a supported layout changes.
"""
TITLE = ("#productTitle", "h1#title", "#title span")
READY = "#productTitle, h1#title"
PRICE = ("#corePriceDisplay_desktop_feature_div .a-price:not(.a-text-price) .a-offscreen",
         "#corePrice_feature_div .a-price:not(.a-text-price) .a-offscreen",
         "#apex_desktop .a-price:not(.a-text-price) .a-offscreen",
         "#priceblock_dealprice", "#priceblock_ourprice", "#priceblock_saleprice")
ORIGINAL_PRICE = ("#corePriceDisplay_desktop_feature_div .a-text-price .a-offscreen",
                  "#corePrice_feature_div .a-text-price .a-offscreen", "#price .a-text-price .a-offscreen")
AVAILABILITY = ("#availability span", "#availability", "#outOfStock")
TABLES = ("#productDetails_detailBullets_sections1", "#productDetails_techSpec_section_1",
          "#productDetails_techSpec_section_2", "#technicalSpecifications_section_1",
          "#prodDetails table.a-keyvalue", "#productOverview_feature_div table",
          "#productDetails_feature_div table")
DETAIL_BULLETS = "#detailBullets_feature_div li"
IMAGE = ("#landingImage", "#imgBlkFront", "#main-image", 'meta[property="og:image"]')
GALLERY = ("#altImages img", "#imageBlock img")
HIGHLIGHTS = ("#feature-bullets li span.a-list-item", "#feature-bullets li")
DESCRIPTION = ("#productDescription", "#aplus_feature_div .aplus-module")
BRAND = ("#bylineInfo",)
RATING = ("#acrPopover .a-icon-alt", "#averageCustomerReviews .a-icon-alt")
RATING_COUNT = ("#acrCustomerReviewText",)
OFFERS = ("#sopp_feature_div .offers-items", "#itembox-InstantBankDiscount",
          "#itembox-Partner", "#itembox-NoCostEmi", "#itembox-Cashback")
PURCHASE = {
    "seller": ("#sellerProfileTriggerId", "#merchant-info"),
    "delivery": ("#mir-layout-DELIVERY_BLOCK", "#deliveryBlockMessage"),
    "warranty": ("#WARRANTY",),
    "return_policy": ("#RETURNS_POLICY", "#RETURNS_POLICY_feature_div"),
}
VARIANTS = '[id^="variation_"]'
EXPAND = ("#productDetails_expander a.a-expander-header",)
