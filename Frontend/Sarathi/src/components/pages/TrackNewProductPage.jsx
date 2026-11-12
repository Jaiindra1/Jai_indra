import React from 'react';
// Source: Pasted text (15).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function TrackNewProductPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">

<div className="flex flex-col gap-space-xs mb-space-xl">
<div className="flex items-center gap-space-xs font-label-sm text-label-sm text-outline">
<span className="hover:text-primary transition-colors cursor-pointer">{"Overview"}</span>
<span className="material-symbols-outlined text-[14px]">{"chevron_right"}</span>
<span className="text-on-surface font-semibold">{"Track New Product"}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-high text-on-surface-variant text-label-sm ml-space-2xs font-mono">{"SKU-INGEST // v4.2"}</span>
</div>
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
<div className="max-w-3xl">
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Track New Product & Set Buying Target"}</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">{"\n          Paste an Amazon, Flipkart, or Croma product URL. SARATHI auto-normalizes the SKU, fetches 90-day pricing baselines, calculates authentic discounts, and monitors your budget ceiling.\n        "}</p>
</div>
<div className="flex items-center gap-space-xs self-start md:self-auto bg-surface-container-low px-space-md py-space-xs rounded-xl shadow-sm">
<span className="material-symbols-outlined text-secondary text-[20px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"format_image_left"}</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface">{"Precision Guarantee"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Zero affiliate markup drift"}</span>
</div>
</div>
</div>
</div>

<div className="relative bg-surface-container-lowest rounded-xl p-space-lg mb-space-xl shadow-sm overflow-hidden">
<div className="absolute -top-12 -right-12 w-64 h-64 bg-surface-container-high/40 rounded-full blur-3xl pointer-events-none"></div>
<div className="relative flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm">
<div className="relative flex-1 flex items-center">
<span className="material-symbols-outlined absolute left-space-md text-primary pointer-events-none text-[22px]">{"link"}</span>
<input className="w-full h-12 pl-12 pr-28 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder-outline focus:outline-none focus:bg-surface-container-lowest transition-all shadow-inner" id="url-input" placeholder="https://www.flipkart.com/apple-iphone-17-mist-blue-256-gb... or Amazon / Croma link" type="text" defaultValue="https://www.flipkart.com/apple-iphone-17-mist-blue-256-gb/p/itm1959491234?pid=MOBG8792XYZ" />
<button className="absolute right-space-sm px-space-xs py-space-2xs text-outline hover:text-on-surface text-label-sm rounded font-label-sm transition-colors" id="clear-btn">{"\n            CLEAR\n          "}</button>
</div>
<button className="flex items-center justify-center gap-space-xs h-12 px-space-xl bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all shadow-sm active:scale-[0.99] whitespace-nowrap" id="analyze-btn">
<span className="material-symbols-outlined text-[18px]">{"bolt"}</span>
<span>{"Fetch & Analyze SKU"}</span>
</button>
</div>

<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex flex-wrap items-center gap-space-md">
<span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">{"Live Polling Engine:"}</span>
<div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-space-2xs rounded-full">
<span className="material-symbols-outlined text-secondary text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"check_circle"}</span>
<span className="font-label-sm text-label-sm text-on-surface">{"Flipkart India"}</span>
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse ml-space-2xs"></span>
</div>
<div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-space-2xs rounded-full">
<span className="material-symbols-outlined text-secondary text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"check_circle"}</span>
<span className="font-label-sm text-label-sm text-on-surface">{"Amazon India"}</span>
</div>
<div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-space-2xs rounded-full">
<span className="material-symbols-outlined text-secondary text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"check_circle"}</span>
<span className="font-label-sm text-label-sm text-on-surface">{"Croma Retail"}</span>
</div>
<div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-space-2xs rounded-full">
<span className="material-symbols-outlined text-secondary text-[14px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"check_circle"}</span>
<span className="font-label-sm text-label-sm text-on-surface">{"Reliance Digital"}</span>
</div>
</div>
<div className="flex items-center gap-space-2xs text-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">{"verified"}</span>
<span>{"SKU Canonical Identity Resolved"}</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-2xl items-start">

<div className="lg:col-span-7 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
<div className="flex flex-col sm:flex-row items-start gap-space-md">

<div className="relative w-full sm:w-36 h-36 rounded-lg bg-surface-container-low overflow-hidden shrink-0 flex items-center justify-center group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Studio catalog product photography of the Apple iPhone 17 in mist blue finish, elegant angle highlighting titanium curved edges and dual-camera module, soft slate studio backdrop, crisp reflections, commercial tech product render." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdbqQWt1Q684GOnLCZFfRGGs0sZpIG76Zmie3DVYnK7nxPiLmZoaYcQQUEm8iYKNjYe8GeEbvRW5CRAn67iETygC7s5bMgCJEvmFDubOldECP298NwxdH2vCwWeVa3E8Z89-paSsEFP1CT2phj8WZjtdsVrux1Qdciz3vHbBXNMFQ1z6pF-irhxde3t3aA1FkqJuGz2ho4wb5UifyweMjJgvKgInYt6byc_B9_yGE-6ALPMt3G9wWBag" />
<span className="absolute top-space-xs left-space-xs bg-surface-container-lowest/90 backdrop-blur-md px-space-xs py-space-2xs rounded text-label-sm font-label-sm text-on-surface font-mono">{"\n              EAN: 0195949123456\n            "}</span>
</div>

<div className="flex-1 flex flex-col justify-between min-w-0">
<div>
<div className="flex items-center gap-space-xs mb-space-2xs flex-wrap">
<span className="px-space-xs py-space-2xs rounded bg-surface-container text-primary font-label-sm text-label-sm">{"Electronics • Smartphones"}</span>
<span className="px-space-xs py-space-2xs rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"SKU MATCH: 99.8%"}</span>
<span className="text-outline font-body-sm text-body-sm">{"ID: AP-IPH17-BLU-256"}</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight truncate">{"Apple iPhone 17 (256 GB, Mist Blue)"}</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs line-clamp-2">{"\n                A19 Bionic Chip, 6.3-inch Super Retina XDR OLED ProMotion 120Hz display, 48MP Fusion Camera, Action Button, Ceramic Shield 2.\n              "}</p>
</div>
<div className="flex items-baseline gap-space-sm mt-space-sm pt-space-xs">
<span className="font-price-hero text-price-hero text-on-surface tracking-tight">{"₹78,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹89,999 MRP"}</span>
<span className="font-label-md text-label-md text-secondary bg-secondary-container px-space-xs py-space-2xs rounded">{"₹11,000 (12.2% Off)"}</span>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-lg p-space-md flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary text-[20px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"gpp_good"}</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-space-2xs">{"\n                Verified Genuine Price\n                "}<span className="w-2 h-2 rounded-full bg-secondary"></span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">{"\n                No pre-sale artificial inflation detected. Baseline remained stable over past 21 days.\n              "}</span>
</div>
</div>
<span className="font-mono text-label-sm text-outline hidden sm:inline">{"ALGO_CHECK_PASS"}</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px]">{"storefront"}</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">{"Live Market Cross-Reference"}</h3>
</div>
<span className="font-body-sm text-body-sm text-outline">{"Refreshed 3 mins ago"}</span>
</div>
<div className="flex flex-col gap-space-xs">

<div className="flex items-center justify-between p-space-md rounded-lg bg-secondary-container/20 hover:bg-secondary-container/30 transition-colors">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-primary font-headline-sm">{"F"}</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md text-on-surface font-semibold">{"Flipkart India"}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm">{"Current Lowest"}</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">{"Assured Fulfilled • In Stock (Delivers in 24h)"}</span>
</div>
</div>
<div className="flex flex-col items-end shrink-0">
<span className="font-price-card text-price-card text-secondary">{"₹78,999"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Free Delivery"}</span>
</div>
</div>

<div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center font-bold text-on-surface-variant font-headline-sm">{"A"}</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md text-on-surface font-semibold">{"Amazon India"}</span>
<span className="text-outline font-label-sm text-label-sm">{"+₹3,901 gap"}</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">{"Appario Retail • Prime Next Day"}</span>
</div>
</div>
<div className="flex flex-col items-end shrink-0">
<span className="font-price-card text-price-card text-on-surface">{"₹82,900"}</span>
<span className="font-body-sm text-body-sm text-outline">{"₹1,500 Coupon Avail"}</span>
</div>
</div>

<div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center font-bold text-on-surface-variant font-headline-sm">{"C"}</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md text-on-surface font-semibold">{"Croma Electronics"}</span>
<span className="text-outline font-label-sm text-label-sm">{"+₹4,491 gap"}</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">{"Tata Retail • In-Store Pickup Avail"}</span>
</div>
</div>
<div className="flex flex-col items-end shrink-0">
<span className="font-price-card text-price-card text-on-surface">{"₹83,490"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Tata Neu Coins 5%"}</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">{"90-Day Pricing Baseline Intelligence"}</h3>
<p className="font-body-sm text-body-sm text-outline">{"Normalized historic range with festive flash anomalies smoothed"}</p>
</div>
<span className="px-space-xs py-space-2xs bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant">{"90-Day Trend"}</span>
</div>

<div className="grid grid-cols-3 gap-space-sm">
<div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"All-Time Low"}</span>
<span className="font-price-card text-price-card text-secondary mt-space-2xs">{"₹78,999"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"Happening Right Now"}</span>
</div>
<div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"90-Day Median"}</span>
<span className="font-price-card text-price-card text-on-surface mt-space-2xs">{"₹86,500"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Standard market level"}</span>
</div>
<div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"Festive Launch"}</span>
<span className="font-price-card text-price-card text-outline mt-space-2xs">{"₹89,999"}</span>
<span className="font-body-sm text-body-sm text-outline">{"MRP Oct 2024"}</span>
</div>
</div>

<div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-xs">
<div className="flex items-center justify-between text-label-sm font-label-sm text-outline">
<span>{"₹89,999 (Peak)"}</span>
<span>{"Historical Range Volatility: LOW (±4.2%)"}</span>
<span>{"₹78,999 (Floor)"}</span>
</div>
<div className="w-full h-24 relative flex items-end">

<svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 80">
<defs>
<lineargradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#2563eb" stopOpacity="0.25"></stop>
<stop offset="100%" stopColor="#2563eb" stopOpacity="0.0"></stop>
</lineargradient>
</defs>

<path d="M 0,15 Q 70,16 110,22 T 220,38 T 330,35 T 410,50 L 500,72 L 500,80 L 0,80 Z" fill="url(#chartGradient)"></path>

<path d="M 0,15 Q 70,16 110,22 T 220,38 T 330,35 T 410,50 L 500,72" fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="2.5"></path>

<circle cx="500" cy="72" fill="#006c4a" r="4.5"></circle>
<circle cx="500" cy="72" fill="#006c4a" opacity="0.3" r="8"></circle>
</svg>
</div>
<div className="flex items-center justify-between text-body-sm font-body-sm text-outline pt-space-xs">
<span>{"90 days ago"}</span>
<span>{"60 days ago"}</span>
<span>{"30 days ago"}</span>
<span className="text-secondary font-medium">{"Today (ATL)"}</span>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-lg">
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg">

<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[22px]">{"tune"}</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">{"Target Ceiling & Triggers"}</h3>
</div>
<span className="px-space-xs py-space-2xs rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant">{"User Profile: Rahul"}</span>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between" htmlFor="price-target-input">
<span>{"Your Target Buying Price (INR)"}</span>
<span className="text-primary text-label-sm font-label-sm">{"Active Ceiling: ₹80,000 Limit"}</span>
</label>
<div className="flex items-center gap-space-xs">
<button className="w-11 h-11 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-bold flex items-center justify-center transition-colors" id="decrement-btn">
<span className="material-symbols-outlined text-[18px]">{"remove"}</span>
</button>
<div className="relative flex-1">
<span className="absolute left-space-md top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-outline">{"₹"}</span>
<input className="w-full h-11 pl-9 pr-space-md bg-surface-container-low rounded-lg font-price-card text-price-card text-on-surface focus:outline-none focus:bg-surface-container-lowest text-left" id="price-target-input" step="500" type="number" defaultValue="78000" />
</div>
<button className="w-11 h-11 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-bold flex items-center justify-center transition-colors" id="increment-btn">
<span className="material-symbols-outlined text-[18px]">{"add"}</span>
</button>
</div>

<div className="flex flex-wrap items-center gap-space-2xs mt-space-2xs">
<button className="preset-chip px-space-xs py-space-2xs bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-label-sm text-label-sm transition-colors" data-price="75049">{"\n              -5% below current (₹75,049)\n            "}</button>
<button className="preset-chip px-space-xs py-space-2xs bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-label-sm text-label-sm transition-colors" data-price="74000">{"\n              Diwali Floor (₹74,000)\n            "}</button>
<button className="preset-chip px-space-xs py-space-2xs bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-label-sm text-label-sm transition-colors" data-price="78999">{"\n              Match ATL (₹78,999)\n            "}</button>
</div>
</div>

<div className="bg-secondary-container/25 rounded-lg p-space-md flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-secondary-container uppercase tracking-wider font-semibold">{"Projected Net Savings"}</span>
<span className="font-headline-md text-headline-md text-secondary tracking-tight mt-space-2xs" id="projected-savings">{"Save ₹11,999 (13.3%)"}</span>
<span className="font-body-sm text-body-sm text-on-secondary-container">{"Calculated vs ₹89,999 launch MRP"}</span>
</div>
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings": "'FILL' 1"}}>{"savings"}</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface font-semibold">{"Stack Rahul's Active Bank Cards"}</span>
<span className="text-outline font-label-sm text-label-sm">{"Auto-applied at checkout"}</span>
</div>
<div className="flex flex-col gap-space-xs">

<label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<div className="flex items-center gap-space-sm">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">{"HDFC Millennia CC"}</span>
<span className="font-body-sm text-body-sm text-outline">{"5% Cashback (Capped ₹1,000/mo)"}</span>
</div>
</div>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/60 px-space-xs py-space-2xs rounded">{"-₹1,000 net"}</span>
</label>

<label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<div className="flex items-center gap-space-sm">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">{"ICICI Amazon Pay CC"}</span>
<span className="font-body-sm text-body-sm text-outline">{"5% Unlimited on Amazon"}</span>
</div>
</div>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/60 px-space-xs py-space-2xs rounded">{"Eligible"}</span>
</label>

<label className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<div className="flex items-center gap-space-sm">
<input className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">{"SBI SimplyCLICK / Cashback"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Instant ₹3,000 Flipkart festive tie-up"}</span>
</div>
</div>
<span className="font-label-sm text-label-sm text-outline bg-surface-container px-space-xs py-space-2xs rounded">{"Inactive"}</span>
</label>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<span className="font-label-md text-label-md text-on-surface font-semibold">{"Immediate Alert Dispatch"}</span>
<div className="grid grid-cols-1 gap-space-xs">

<div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[20px]">{"chat"}</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">{"WhatsApp Notification"}</span>
<span className="font-body-sm text-body-sm text-outline">{"+91 98•••• 4201 (Primary)"}</span>
</div>
</div>
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
</div>

<div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[20px]">{"notifications_active"}</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">{"Browser Desktop Push"}</span>
<span className="font-body-sm text-body-sm text-outline">{"High-priority instant prompt"}</span>
</div>
</div>
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
</div>

<div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-outline text-[20px]">{"mail"}</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">{"Email Report & Deep-Link"}</span>
<span className="font-body-sm text-body-sm text-outline">{"rahul@example.com"}</span>
</div>
</div>
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
</div>
</div>
</div>

<div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[18px]">{"update"}</span>
<span className="font-body-sm text-body-sm text-on-surface">{"Scraper Cadence:"}</span>
</div>
<span className="font-label-sm text-label-sm font-semibold text-primary bg-surface-container px-space-xs py-space-2xs rounded">{"\n            ⚡ Real-time 15-Minute Polling Passes\n          "}</span>
</div>

<div className="flex flex-col gap-space-xs pt-space-xs">
<button className="w-full h-12 flex items-center justify-center gap-space-xs bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:bg-secondary/90 transition-all shadow-md active:scale-[0.99]" id="activate-tracker-btn">
<span className="material-symbols-outlined text-[20px]">{"radar"}</span>
<span>{"Activate SARATHI Tracking & Add to My Products"}</span>
</button>
<p className="font-body-sm text-body-sm text-outline text-center">{"\n            You can revoke or adjust alert triggers at any time from your Watchlist dashboard.\n          "}</p>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-space-md mb-space-xl">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[22px]">{"history"}</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">{"Recently Added Tracked Products by You"}</h3>
</div>
<a className="font-label-md text-label-md text-primary hover:underline flex items-center gap-space-2xs" href="#">
<span>{"View all 14 active tracks"}</span>
<span className="material-symbols-outlined text-[16px]">{"arrow_forward"}</span>
</a>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="w-16 h-16 rounded bg-surface-container-low shrink-0 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Sony WH-1000XM5 wireless noise canceling headphones in silver finish resting on a minimal slate desk surface, soft natural daylight, premium aesthetic studio product shot." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOBTNhvrURol3hPUr8QqH5bhZ_gZRZZe5ui_t0yl5I4WNqLrRSyL70W4j27fSNtt3fijUr4-LiX0et8ng3FhwGI1ANJCBHP3W-m2Wsib1mXEJNtrUlb-lmXDfEhqZMjDTO-kwPwMXqNGUV5mCV7om1hxa8Rj2xpR4v1IBF4BGjoMqupAcetKM6vTi_QAjDITBGTPHDVHQ0MYjnBLCdZdQ_M0sDRzblo8xjkE0lT5inbYO38j4ynpQ8Qg" />
</div>
<div className="flex flex-col items-end">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n                In Target\n              "}</span>
<span className="text-outline font-body-sm text-body-sm mt-space-2xs">{"Added 2d ago"}</span>
</div>
</div>
<h4 className="font-label-md text-label-md text-on-surface font-semibold line-clamp-1">{"Sony WH-1000XM5 Wireless ANC"}</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">{"Flipkart • Ceiling: ₹25,000"}</p>
</div>
<div className="mt-space-md pt-space-sm bg-surface-container-low rounded-lg p-space-xs flex items-center justify-between">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-outline">{"Current Price"}</span>
<span className="font-price-card text-price-card text-secondary">{"₹24,990"}</span>
</div>
<div className="flex items-center gap-space-2xs text-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">{"trending_down"}</span>
<span>{"-₹2,000 drop"}</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="w-16 h-16 rounded bg-surface-container-low shrink-0 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="MacBook Air M3 in midnight color open showing high resolution wallpaper, sleek aluminum body, minimalist studio background with cool blue undertones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuByBfqbUtxnOXZpb_jm6BErh6xBOv20OTPaOAfjYtE06S074lZTAR9EBuyVJcY5FMLExSbhahltj9V7sXIcT4bSJFxXINrAh5pMpBPZZ9Sl2Ye1dyjvGllftOs1iZxaMuPHCJiotd5dENWUUcgeL2Un-M_t6Y_l5I6YWV7p_ZwXp83TWQYfLCK1X93Yb46xH0LNQQkIlUWAvbC9x-vKvOm-x_nswKwNQDr7JaYPWTcrefplm7CO9haImg" />
</div>
<div className="flex flex-col items-end">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-outline font-label-sm text-label-sm flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>{"\n                Monitoring\n              "}</span>
<span className="text-outline font-body-sm text-body-sm mt-space-2xs">{"Added 4d ago"}</span>
</div>
</div>
<h4 className="font-label-md text-label-md text-on-surface font-semibold line-clamp-1">{"MacBook Air M3 (16GB, 512GB)"}</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">{"Amazon • Ceiling: ₹1,12,000"}</p>
</div>
<div className="mt-space-md pt-space-sm bg-surface-container-low rounded-lg p-space-xs flex items-center justify-between">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-outline">{"Current Price"}</span>
<span className="font-price-card text-price-card text-on-surface">{"₹1,18,900"}</span>
</div>
<div className="flex items-center gap-space-2xs text-outline font-label-sm text-label-sm">
<span>{"₹6,900 above target"}</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div>
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="w-16 h-16 rounded bg-surface-container-low shrink-0 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="LG C4 55-inch OLED 4K television on minimal stand showcasing deep contrast vivid display, modern living room ambient background, ultra thin profile." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiR1LXlMTFVNut8QpNAed2PWZMr1arQuN2ESuVLzOVH9jsh_mL1-MBkjbMaB13yOR2WabkeMDm02GPYWvcmtoVeOt1h8QVhlFZ4P1NglXHeBw_sQc-vTq_DOicUOTmeT1a3xYv07XGLuA86w0wL8eTud7DRQMhO7HXUJaTYekdEgIfQXfw-wlebhdXx70vv6waYwR4ixWTbtGajEZgN81wgW5Qmwzyj0sYDZyAjkDI_faYN4UcCazjwQ" />
</div>
<div className="flex flex-col items-end">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n                Target Met\n              "}</span>
<span className="text-outline font-body-sm text-body-sm mt-space-2xs">{"Added 1w ago"}</span>
</div>
</div>
<h4 className="font-label-md text-label-md text-on-surface font-semibold line-clamp-1">{"LG C4 55\" OLED 4K Smart TV"}</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">{"Croma • Ceiling: ₹1,20,000"}</p>
</div>
<div className="mt-space-md pt-space-sm bg-surface-container-low rounded-lg p-space-xs flex items-center justify-between">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-outline">{"Current Price"}</span>
<span className="font-price-card text-price-card text-secondary">{"₹1,17,990"}</span>
</div>
<div className="flex items-center gap-space-2xs text-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">{"check_circle"}</span>
<span>{"Alert Sent"}</span>
</div>
</div>
</div>
</div>
</div>


</div></main></div>);
}
