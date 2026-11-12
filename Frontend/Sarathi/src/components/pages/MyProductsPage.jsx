import React from 'react';
// Source: Pasted text (3).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function MyProductsPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full gap-space-xl">

<div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-md">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center gap-space-sm">
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"My Products Watchlist"}</h1>
<span className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>{"\n          Hourly Engine Active\n        "}</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">{"\n        Products you are personally monitoring. SARATHI crawls verified retail SKU prices, models multi-bank card incentives, and forecasts checkout cost parity.\n      "}</p>
</div>
<div className="flex flex-wrap items-center gap-space-sm w-full xl:w-auto">
<div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container-low shadow-sm">
<span className="material-symbols-outlined text-primary text-headline-sm">{"account_balance_wallet"}</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"Committed Target"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹1,70,998 "}<span className="font-body-sm text-body-sm text-outline font-normal">{"/ 12 tracked"}</span></span>
</div>
</div>
<button className="flex items-center gap-space-xs h-10 px-space-md rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-md" id="add-tracker-btn" type="button">
<span className="material-symbols-outlined text-on-primary text-headline-sm">{"add_link"}</span>{"\n        Add Product by URL / SKU\n      "}</button>
<button className="flex items-center gap-space-xs h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-all shadow-sm" type="button">
<span className="material-symbols-outlined text-outline text-headline-sm">{"tune"}</span>{"\n        Export\n      "}</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center gap-space-md">
<div className="w-11 h-11 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-headline-md" style={{"fontVariationSettings": "'FILL' 1"}}>{"verified"}</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-surface font-bold">{"2 Items"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"Ready to Buy • Target Achieved"}</span>
</div>
</div>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">{"Immediate"}</span>
</div>
<div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center gap-space-md">
<div className="w-11 h-11 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-headline-md">{"trending_down"}</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-surface font-bold">{"7 Drops"}</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">{"Last 48 Hours Crawl"}</span>
</div>
</div>
<span className="px-space-xs py-space-2xs rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold">{"-₹24,000 Net"}</span>
</div>
<div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center gap-space-md">
<div className="w-11 h-11 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-headline-md">{"timelapse"}</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-surface font-bold">{"3 Watching"}</span>
<span className="font-body-sm text-body-sm text-tertiary font-medium">{"Within 5% of Buying Trigger"}</span>
</div>
</div>
<span className="px-space-xs py-space-2xs rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">{"Pending Drop"}</span>
</div>
</div>

<div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md p-space-sm bg-surface-container-lowest rounded-xl shadow-sm">
<div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-space-2xs">
<button className="filter-tab px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold transition-all shadow-sm">{"\n        All Monitored (12)\n      "}</button>
<button className="filter-tab px-space-md py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all">{"\n        Ready to Buy (2)\n      "}</button>
<button className="filter-tab px-space-md py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all">{"\n        Dropped Today (7)\n      "}</button>
<button className="filter-tab px-space-md py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all">{"\n        Near Target (3)\n      "}</button>
</div>
<div className="flex items-center gap-space-sm self-end lg:self-auto">
<div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-space-xs rounded-lg">
<span className="material-symbols-outlined text-outline text-headline-sm">{"category"}</span>
<select className="bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none cursor-pointer">
<option>{"All Sectors"}</option>
<option>{"Mobiles & Wearables"}</option>
<option>{"Laptops & Desktops"}</option>
<option>{"Personal Audio"}</option>
<option>{"Home & Displays"}</option>
</select>
</div>
<div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-space-xs rounded-lg">
<span className="material-symbols-outlined text-outline text-headline-sm">{"swap_vert"}</span>
<select className="bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none cursor-pointer">
<option>{"Biggest Drop vs Yesterday"}</option>
<option>{"Closest to Target Budget"}</option>
<option>{"Recent Crawl Activity"}</option>
<option>{"Highest Discount Rate"}</option>
</select>
</div>
</div>
</div>

<div className="flex flex-col gap-space-lg">

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">

<div className="flex flex-wrap items-center justify-between gap-space-sm px-space-lg py-space-xs bg-secondary-container text-on-secondary-container">
<div className="flex items-center gap-space-xs font-label-md text-label-md font-semibold">
<span className="material-symbols-outlined text-headline-sm" style={{"fontVariationSettings": "'FILL' 1"}}>{"check_circle"}</span>{"\n          GREAT TIME TO BUY — TARGET REACHED (₹1,001 Below Rahul's Budget Cap)\n        "}</div>
<div className="flex items-center gap-space-sm font-label-sm text-label-sm">
<span>{"Target ₹80,000"}</span>
<span>{"•"}</span>
<span>{"Checked 14m ago via Flipkart API"}</span>
</div>
</div>
<div className="p-space-lg flex flex-col lg:flex-row items-start gap-space-xl">

<div className="flex flex-col items-center gap-space-sm w-full lg:w-56 shrink-0">
<div className="relative w-full h-44 rounded-xl bg-surface-container-low flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="High tech minimalist product rendering of the Apple iPhone 17 in striking Mist Blue colorway, sleek titanium rounded frame, reflective camera bump, pristine studio lighting with soft cool slate reflection, ultra detailed product photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5qVIoSFIJ1J3rHU5-jo61LZkFM-oKuzqkge17H2ernKF3qr5fDoF3QqmLG4hKhxkUL_yzfqC9v8OKtjQ1ctz9FCqXNTCeUi4UgfRGZOGRx9HeIqfDVdaIq1Ixyb2hQFtK_tVPix9YTxzIxXv2rmvNzDAygwxxhh_BK7ZLcrSPiLKzdvLjEQVxHQdmjwlFRjHfXp292mAJ5HAEkTzktrQ1DuBaOfBYzO5zheYZ6oyHDHwuaydx6dk5qg" />
<span className="absolute top-2 left-2 px-space-xs py-space-2xs rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium shadow-sm">{"\n              Flipkart Primary\n            "}</span>
<span className="absolute bottom-2 right-2 px-space-xs py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">{"\n              All-Time Low\n            "}</span>
</div>

<div className="w-full flex items-center justify-between px-space-sm py-space-xs bg-surface-container rounded-lg font-body-sm text-body-sm">
<span className="text-on-surface-variant">{"Amazon: ₹82,900"}</span>
<span className="text-on-surface-variant">{"Croma: ₹83,490"}</span>
</div>
</div>

<div className="flex flex-col flex-1 gap-space-md w-full">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
<div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant font-medium">{"Smartphones"}</span>
<span className="font-body-sm text-body-sm text-outline">{"• Added 24 days ago"}</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-2xs">{"\n                Apple iPhone 17 (Mist Blue, 256GB)\n              "}</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">{"\n                A19 Pro Bionic Chip • 48MP Pro Fusion System • 6.3\" ProMotion Super Retina XDR • Action Button 2.0\n              "}</p>
</div>

<div className="flex flex-col sm:items-end bg-surface-container-low sm:bg-transparent p-space-sm sm:p-0 rounded-lg">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">{"Effective Net Price"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface font-bold text-secondary">{"₹78,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹99,999"}</span>
</div>
<div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md font-medium">
<span className="material-symbols-outlined text-headline-sm">{"arrow_downward"}</span>
<span>{"₹6,000 (7.1% drop) vs Yesterday"}</span>
</div>
</div>
</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm p-space-md rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Rahul's Target"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹80,000"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"Surpassed (-₹1,001)"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Yesterday's Close"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹84,999"}</span>
<span className="font-body-sm text-body-sm text-outline">{"₹6,000 higher"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"30-Day Median"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹86,500"}</span>
<span className="font-body-sm text-body-sm text-on-surface-variant font-medium">{"8.6% Volatility"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Observed Floor"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹78,999"}</span>
<span className="font-body-sm text-body-sm text-secondary font-semibold">{"Hit 11:20 AM Today"}</span>
</div>
</div>

<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-secondary-container/40 text-on-secondary-container">
<span className="material-symbols-outlined text-secondary text-headline-sm shrink-0">{"verified_user"}</span>
<p className="font-body-sm text-body-sm">
<span className="font-semibold">{"SARATHI Decision:"}</span>{" Lowest recorded during your 24-day monitoring window. HDFC Bank ₹4,000 instant credit card discount is active and expires at midnight tonight.\n            "}</p>
</div>

<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex flex-wrap items-center gap-space-xs">
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-colors shadow-sm">
<span>{"View Deal on Flipkart"}</span>
<span className="material-symbols-outlined text-headline-sm">{"arrow_outward"}</span>
</button>
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span className="material-symbols-outlined text-headline-sm text-outline">{"ssid_chart"}</span>{"\n                Price History\n              "}</button>
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span className="material-symbols-outlined text-headline-sm text-outline">{"credit_card"}</span>{"\n                Check Bank EMI\n              "}</button>
</div>
<div className="flex items-center gap-space-xs">
<button className="p-space-xs rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Edit Budget Alert">
<span className="material-symbols-outlined text-headline-sm">{"tune"}</span>
</button>
<button className="p-space-xs rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors" title="Remove Tracking">
<span className="material-symbols-outlined text-headline-sm">{"delete_outline"}</span>
</button>
</div>
</div>
</div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
<div className="flex flex-wrap items-center justify-between gap-space-sm px-space-lg py-space-xs bg-tertiary-container text-on-tertiary-container">
<div className="flex items-center gap-space-xs font-label-md text-label-md font-semibold">
<span className="material-symbols-outlined text-headline-sm">{"warning"}</span>{"\n          PRICE DROPPED, BUT ₹2,999 ABOVE TARGET\n        "}</div>
<div className="flex items-center gap-space-sm font-label-sm text-label-sm">
<span>{"Target ₹25,000"}</span>
<span>{"•"}</span>
<span>{"Amazon India Crawl"}</span>
</div>
</div>
<div className="p-space-lg flex flex-col lg:flex-row items-start gap-space-xl">
<div className="flex flex-col items-center gap-space-sm w-full lg:w-56 shrink-0">
<div className="relative w-full h-44 rounded-xl bg-surface-container-low flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Sony WH-1000XM6 wireless premium over-ear headphones in silver grey matte finish, folded gracefully on clean white slate surface with elegant studio backlight, clean luxury audio tech photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVP12edXRIyi6fgqjKsmeuR918qnp2Kmdj1MIKxbpzHquThkd9RybCvmLAGEZT_ahXn-vwJydGlF4_UTQ3dr_TdqY4kZfWjLsmHyWZumcICvCj8UUAAoRN88XwPHQ0NXsA470YyAy7aP-JGYV6KRdMfkTZZv9hH-I4ZdEPgZ5BNqgO8S9ECDWzhnGiyCyc66Pj1SpnOFXmgUi6NBechbhPr4Ci3M7OJSczlTQTgWaHw8-fi06speUoqQ" />
<span className="absolute top-2 left-2 px-space-xs py-space-2xs rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium shadow-sm">{"\n              Amazon In\n            "}</span>
</div>
<div className="w-full flex items-center justify-between px-space-sm py-space-xs bg-surface-container rounded-lg font-body-sm text-body-sm">
<span className="text-on-surface-variant">{"Floor: ₹26,499 (12d ago)"}</span>
</div>
</div>
<div className="flex flex-col flex-1 gap-space-md w-full">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
<div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant font-medium">{"Audio"}</span>
<span className="font-body-sm text-body-sm text-outline">{"• Added 35 days ago"}</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-2xs">{"\n                Sony WH-1000XM6 Wireless Noise Cancelling Headphones (Silver)\n              "}</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">{"\n                Industry Leading ANC • 40-hr Battery • Multipoint Bluetooth 5.4 • DSEE Extreme AI Audio\n              "}</p>
</div>
<div className="flex flex-col sm:items-end bg-surface-container-low sm:bg-transparent p-space-sm sm:p-0 rounded-lg">
<span className="font-label-sm text-label-sm text-outline font-bold uppercase tracking-wider">{"Current Lowest"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface font-bold">{"₹27,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹34,990"}</span>
</div>
<div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md font-medium">
<span className="material-symbols-outlined text-headline-sm">{"arrow_downward"}</span>
<span>{"₹3,000 (9.7% drop) vs Yesterday"}</span>
</div>
</div>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm p-space-md rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Rahul's Target"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹25,000"}</span>
<span className="font-body-sm text-body-sm text-tertiary font-medium">{"+₹2,999 away"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Yesterday's Close"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹30,999"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Crawl verified"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"All-Time Lowest"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹26,499"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Recorded on Prime Day"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Forecast Status"}</span>
<span className="font-headline-sm text-headline-sm text-tertiary font-semibold">{"Soft Downtrend"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Hold 4-6 Days"}</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container text-on-surface">
<span className="material-symbols-outlined text-outline text-headline-sm shrink-0">{"lightbulb"}</span>
<p className="font-body-sm text-body-sm">
<span className="font-semibold">{"SARATHI Advisory:"}</span>{" Price dropped ₹3,000 today. Still ₹2,999 above your ₹25,000 target. Recommended: Wait or apply ICICI Amazon Pay 5% statement cashback to narrow gap to ₹1,599.\n            "}</p>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex flex-wrap items-center gap-space-xs">
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm">
<span>{"View Deal on Amazon"}</span>
<span className="material-symbols-outlined text-headline-sm">{"arrow_outward"}</span>
</button>
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span className="material-symbols-outlined text-headline-sm text-outline">{"ssid_chart"}</span>{"\n                Price History\n              "}</button>
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span className="material-symbols-outlined text-headline-sm text-outline">{"tune"}</span>{"\n                Edit Target Alert\n              "}</button>
</div>
<button className="p-space-xs rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors" title="Remove Tracking">
<span className="material-symbols-outlined text-headline-sm">{"delete_outline"}</span>
</button>
</div>
</div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
<div className="flex flex-wrap items-center justify-between gap-space-sm px-space-lg py-space-xs bg-secondary-container text-on-secondary-container">
<div className="flex items-center gap-space-xs font-label-md text-label-md font-semibold">
<span className="material-symbols-outlined text-headline-sm" style={{"fontVariationSettings": "'FILL' 1"}}>{"check_circle"}</span>{"\n          GREAT TIME TO BUY — ₹2,001 Below Target!\n        "}</div>
<div className="flex items-center gap-space-sm font-label-sm text-label-sm">
<span>{"Target ₹72,000"}</span>
<span>{"•"}</span>
<span>{"Flipkart Flash Drop"}</span>
</div>
</div>
<div className="p-space-lg flex flex-col lg:flex-row items-start gap-space-xl">
<div className="flex flex-col items-center gap-space-sm w-full lg:w-56 shrink-0">
<div className="relative w-full h-44 rounded-xl bg-surface-container-low flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="ASUS TUF Gaming F15 gaming laptop, sleek dark stealth grey chassis with backlit keyboard glow, open 144Hz IPS screen displaying vibrant benchmark visuals, professional commercial studio product shot on clean surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX7ElOvLbAHpxVdlMiCbUAkNoxl_sQheuoWwDH7a3Cg5IPubpBCWnkZCkSO2bvXbuHzQJODnmu_hGfFaUbjqBjf95Gt3ckmQT6Dt1Xym0Ev9a_Hcw-OKevPJMlX8aJGUmsn1wTD-ZqBh-1frxMn9E24etYemO2o0Uq60MkqmMTNG2HNufC2l-KgjU8QHSxiIeGjYuipOw3aHBU9OZjRp1JHujPQJfBq_kUPDpfskaWZoze-hNNldTHOQ" />
<span className="absolute top-2 left-2 px-space-xs py-space-2xs rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium shadow-sm">{"\n              Flipkart\n            "}</span>
<span className="absolute bottom-2 right-2 px-space-xs py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">{"\n              17.6% Drop\n            "}</span>
</div>
<div className="w-full flex items-center justify-between px-space-sm py-space-xs bg-surface-container rounded-lg font-body-sm text-body-sm">
<span className="text-on-surface-variant">{"Amazon: ₹74,500"}</span>
<span className="text-on-surface-variant">{"Croma: ₹77,990"}</span>
</div>
</div>
<div className="flex flex-col flex-1 gap-space-md w-full">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
<div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant font-medium">{"Laptops"}</span>
<span className="font-body-sm text-body-sm text-outline">{"• Added 18 days ago"}</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-2xs">{"\n                ASUS TUF Gaming F15 AI Laptop (Core i7, RTX 4060, 16GB / 1TB SSD)\n              "}</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">{"\n                Intel Core i7 13th Gen • 140W TGP NVIDIA RTX 4060 • 144Hz FHD Adaptive Sync • Military Grade 810H\n              "}</p>
</div>
<div className="flex flex-col sm:items-end bg-surface-container-low sm:bg-transparent p-space-sm sm:p-0 rounded-lg">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">{"Flash Deal Price"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface font-bold text-secondary">{"₹69,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹89,990"}</span>
</div>
<div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md font-medium">
<span className="material-symbols-outlined text-headline-sm">{"arrow_downward"}</span>
<span>{"₹15,000 (17.6%) drop today"}</span>
</div>
</div>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm p-space-md rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Target Ceiling"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹72,000"}</span>
<span className="font-body-sm text-body-sm text-secondary font-semibold">{"Achieved (-₹2,001)"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Yesterday's Price"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹84,999"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Pre-drop price"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Historic Lowest"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹69,999"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"Matching record"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Inventory Volatility"}</span>
<span className="font-headline-sm text-headline-sm text-error font-semibold">{"High Urgency"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Limited Units"}</span>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex flex-wrap items-center gap-space-xs">
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-colors shadow-sm">
<span>{"View Deal on Flipkart"}</span>
<span className="material-symbols-outlined text-headline-sm">{"arrow_outward"}</span>
</button>
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span className="material-symbols-outlined text-headline-sm text-outline">{"credit_card"}</span>{"\n                Offers & No Cost EMI\n              "}</button>
</div>
<button className="p-space-xs rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors" title="Remove Tracking">
<span className="material-symbols-outlined text-headline-sm">{"delete_outline"}</span>
</button>
</div>
</div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
<div className="flex flex-wrap items-center justify-between gap-space-sm px-space-lg py-space-xs bg-surface-container-high text-on-surface-variant">
<div className="flex items-center gap-space-xs font-label-md text-label-md font-semibold">
<span className="material-symbols-outlined text-headline-sm">{"horizontal_rule"}</span>{"\n          STABLE — No Significant Price Movement in 7 Days\n        "}</div>
<div className="flex items-center gap-space-sm font-label-sm text-label-sm">
<span>{"Target ₹54,000"}</span>
<span>{"•"}</span>
<span>{"Croma / Flipkart Monitoring"}</span>
</div>
</div>
<div className="p-space-lg flex flex-col lg:flex-row items-start gap-space-xl">
<div className="flex flex-col items-center gap-space-sm w-full lg:w-56 shrink-0">
<div className="relative w-full h-44 rounded-xl bg-surface-container-low flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Apple iPad Air 11 inch M2 chip in refined Space Grey finish, sleek slim metallic edges with Apple Pencil docked on top edge, floating angled perspective on clean architectural surface with subtle ambient shadows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU0LKWsqaNNkePV4FHLVGKIlaURetMPP0MUaOLOsbW1VDvLz-QevjLEIbC2x3ltdROS7K75s7TeRA4vLvqUDx_ztqq2XhDk7MM15dxCXmnDcfx94nuJynHL4_T52LGTFLendAnFxdp4zKsL14sAOFrPme04UzAiEr9HTXnzd9yWq4tnCv90P7LbF7pUrXiRUwMpHpgQIYcEC_r6bfChvjR5cgNMMjB51vWeuISztrPVAYXgWrEk-Mp1g" />
<span className="absolute top-2 left-2 px-space-xs py-space-2xs rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium shadow-sm">{"\n              Croma\n            "}</span>
</div>
<div className="w-full flex items-center justify-between px-space-sm py-space-xs bg-surface-container rounded-lg font-body-sm text-body-sm">
<span className="text-on-surface-variant">{"Diwali Low: ₹53,999"}</span>
</div>
</div>
<div className="flex flex-col flex-1 gap-space-md w-full">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
<div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant font-medium">{"Tablets"}</span>
<span className="font-body-sm text-body-sm text-outline">{"• Added 40 days ago"}</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-2xs">{"\n                Apple iPad Air 11\" M2 (128GB, Space Grey, Wi-Fi)\n              "}</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">{"\n                Apple M2 Processor • Liquid Retina Display with P3 Wide Color • 12MP Center Stage Camera\n              "}</p>
</div>
<div className="flex flex-col sm:items-end bg-surface-container-low sm:bg-transparent p-space-sm sm:p-0 rounded-lg">
<span className="font-label-sm text-label-sm text-outline font-bold uppercase tracking-wider">{"Current Retail Price"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface font-bold">{"₹57,900"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹59,900"}</span>
</div>
<div className="flex items-center gap-space-xs text-outline font-label-md text-label-md">
<span className="material-symbols-outlined text-headline-sm">{"remove"}</span>
<span>{"₹0 delta vs Yesterday (Flat)"}</span>
</div>
</div>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm p-space-md rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Target Target"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹54,000"}</span>
<span className="font-body-sm text-body-sm text-tertiary font-medium">{"₹3,900 deficit"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Yesterday's Close"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹57,900"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Unchanged"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Seasonal Floor"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹53,999"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Festive window"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Next Probable Sale"}</span>
<span className="font-headline-sm text-headline-sm text-primary font-semibold">{"In 11 Days"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Bank Week Event"}</span>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex flex-wrap items-center gap-space-xs">
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span>{"View Deal on Croma"}</span>
<span className="material-symbols-outlined text-headline-sm text-outline">{"arrow_outward"}</span>
</button>
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span className="material-symbols-outlined text-headline-sm text-outline">{"ssid_chart"}</span>{"\n                Price History\n              "}</button>
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span className="material-symbols-outlined text-headline-sm text-outline">{"notifications_active"}</span>{"\n                Tighten Alert Band\n              "}</button>
</div>
<button className="p-space-xs rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors" title="Remove Tracking">
<span className="material-symbols-outlined text-headline-sm">{"delete_outline"}</span>
</button>
</div>
</div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
<div className="flex flex-wrap items-center justify-between gap-space-sm px-space-lg py-space-xs bg-secondary-container text-on-secondary-container">
<div className="flex items-center gap-space-xs font-label-md text-label-md font-semibold">
<span className="material-symbols-outlined text-headline-sm" style={{"fontVariationSettings": "'FILL' 1"}}>{"check_circle"}</span>{"\n          GREAT TIME TO BUY — ₹2,001 Below Target!\n        "}</div>
<div className="flex items-center gap-space-sm font-label-sm text-label-sm">
<span>{"Target ₹42,000"}</span>
<span>{"•"}</span>
<span>{"Flipkart Verified Crawl"}</span>
</div>
</div>
<div className="p-space-lg flex flex-col lg:flex-row items-start gap-space-xl">
<div className="flex flex-col items-center gap-space-sm w-full lg:w-56 shrink-0">
<div className="relative w-full h-44 rounded-xl bg-surface-container-low flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Samsung 55 inch Crystal 4K UHD smart TV showing breathtaking natural landscape with vivid colors and deep contrasts, ultra thin bezel mounted elegantly against modern minimal living room wall." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdzE_09oPSXhi37xfuC0exK3XNWRe-gvA336bXxGyjZio3mvSObkU_LeIgA2qH-Xn9agphqXZlN0KYT5dPFwrza42539nAZDYTVYKSVd0oGxIkQsrJvIdZOfDexvhsSwyzU1xXhas0ESCJ5hUvaqGCGz_Frz5Nx7DOrhpTvA8fkFwkAKvOp1e50kPvGNxhvgVvmuL9F0Es0k_4CokCTMHf7kHLrCTAOenszm30daXr63yWz84VuDjttg" />
<span className="absolute top-2 left-2 px-space-xs py-space-2xs rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium shadow-sm">{"\n              Flipkart\n            "}</span>
<span className="absolute bottom-2 right-2 px-space-xs py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">{"\n              27% Drop\n            "}</span>
</div>
<div className="w-full flex items-center justify-between px-space-sm py-space-xs bg-surface-container rounded-lg font-body-sm text-body-sm">
<span className="text-on-surface-variant">{"Amazon: ₹43,990"}</span>
<span className="text-on-surface-variant">{"Reliance: ₹44,990"}</span>
</div>
</div>
<div className="flex flex-col flex-1 gap-space-md w-full">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
<div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant font-medium">{"Televisions"}</span>
<span className="font-body-sm text-body-sm text-outline">{"• Added 12 days ago"}</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-2xs">{"\n                Samsung 55\" Crystal 4K UHD Smart TV (UA55DU7700)\n              "}</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">{"\n                PurColor 4K Upscaling Processor • Motion Xcelerator • Knox Security • Q-Symphony Sound\n              "}</p>
</div>
<div className="flex flex-col sm:items-end bg-surface-container-low sm:bg-transparent p-space-sm sm:p-0 rounded-lg">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">{"Current Discounted Price"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface font-bold text-secondary">{"₹39,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹54,999"}</span>
</div>
<div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md font-medium">
<span className="material-symbols-outlined text-headline-sm">{"arrow_downward"}</span>
<span>{"₹15,000 (27.2%) drop vs Yesterday"}</span>
</div>
</div>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm p-space-md rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Rahul's Budget"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹42,000"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"-₹2,001 Below Target"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Yesterday's Price"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹54,999"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Standard MRP run"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Historic Low"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"₹39,999"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"New Record Today"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Exchange Bonus"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"Up to ₹3,500"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Applies at checkout"}</span>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex flex-wrap items-center gap-space-xs">
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-colors shadow-sm">
<span>{"View Deal on Flipkart"}</span>
<span className="material-symbols-outlined text-headline-sm">{"arrow_outward"}</span>
</button>
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span className="material-symbols-outlined text-headline-sm text-outline">{"ssid_chart"}</span>{"\n                Price History\n              "}</button>
<button className="flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
<span className="material-symbols-outlined text-headline-sm text-outline">{"credit_card"}</span>{"\n                Bank Offers\n              "}</button>
</div>
<button className="p-space-xs rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors" title="Remove Tracking">
<span className="material-symbols-outlined text-headline-sm">{"delete_outline"}</span>
</button>
</div>
</div>
</div>
</div>
</div>

<div className="flex flex-col md:flex-row items-center justify-between gap-space-md p-space-lg rounded-xl bg-surface-container-low shadow-sm">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md">
<span className="material-symbols-outlined text-headline-md">{"cell_tower"}</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"SARATHI Auto-Alerting & Execution Shield"}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">{"24/7 Enabled"}</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">{"\n          Instant SMS and push dispatches trigger automatically whenever monitored SKUs drop by > ₹1,000 or penetrate your target budget envelope.\n        "}</p>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0 w-full md:w-auto justify-end">
<span className="font-label-sm text-label-sm text-outline">{"Alert Route: +91 98•••• 4201 & App Push"}</span>
<button className="px-space-md py-space-xs rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors shadow-sm">{"\n        Configure Thresholds\n      "}</button>
</div>
</div>

<div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm hidden" id="add-modal">
<div className="w-full max-w-lg p-space-xl rounded-xl bg-surface-container-lowest shadow-xl flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-headline-md">{"add_circle"}</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{"Track New Product"}</h3>
</div>
<button className="text-outline hover:text-on-surface" id="close-modal-btn" type="button">
<span className="material-symbols-outlined">{"close"}</span>
</button>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">{"\n        Paste any direct product link from Flipkart, Amazon, Croma, or Reliance Digital. We will automatically resolve variations, historical price trends, and bank deals.\n      "}</p>
<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm text-outline">{"Product Page URL"}</label>
<input className="w-full h-11 px-space-md rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary" id="product-url-input" placeholder="https://www.flipkart.com/apple-iphone-17-mist-blue-256gb/p/..." type="text" />
</div>
<div className="grid grid-cols-2 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm text-outline">{"Target Purchase Budget (₹)"}</label>
<input className="w-full h-11 px-space-md rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary" placeholder="75000" type="number" />
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm text-outline">{"Alert Sensitivity"}</label>
<select className="w-full h-11 px-space-sm rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none">
<option>{"Any Price Drop"}</option>
<option>{"Drops > ₹1,000"}</option>
<option>{"Only When Target Hit"}</option>
</select>
</div>
</div>
<div className="flex items-center justify-end gap-space-sm mt-space-sm">
<button className="px-space-md py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md" id="cancel-modal-btn" type="button">{"\n          Cancel\n        "}</button>
<button className="px-space-lg py-space-xs rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-sm" id="save-tracker-btn" type="button">{"\n          Start Tracking\n        "}</button>
</div>
</div>
</div>
</div>
</main></div>);
}
