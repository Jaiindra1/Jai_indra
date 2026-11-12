import React from 'react';
// Source: Pasted text (9).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function PriceDropsPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
<div className="flex flex-col gap-space-2xs">
<nav className="flex items-center gap-space-2xs text-outline font-label-sm text-label-sm">
<a className="hover:text-primary transition-colors" href="#">{"Dashboard"}</a>
<span className="material-symbols-outlined text-outline" style={{"fontSize": "14px"}}>{"chevron_right"}</span>
<span>{"Tools & Intelligence"}</span>
<span className="material-symbols-outlined text-outline" style={{"fontSize": "14px"}}>{"chevron_right"}</span>
<span className="text-primary font-semibold">{"Price Drops"}</span>
</nav>
<div className="flex items-center gap-space-sm mt-space-2xs">
<h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">{"Real-Time Price Drops & Volatility Radar"}</h1>
<span className="flex items-center gap-space-2xs px-space-xs py-space-2xs bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm font-semibold">
<span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>{"\n          Live Ingestion\n        "}</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">{"\n        Verified price drops detected across 12,000+ monitored SKUs over the last 24 to 72 hours. Anti-markup algorithm active to filter false sale inflated baselines.\n      "}</p>
</div>

<div className="flex items-center gap-space-sm self-start md:self-auto">
<div className="bg-surface-container-low px-space-md py-space-xs rounded-xl flex items-center gap-space-sm shadow-sm">
<span className="material-symbols-outlined text-secondary" style={{"fontSize": "20px"}}>{"verified"}</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"Scraper Engine"}</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">{"100% Anti-Markup Verified"}</span>
</div>
</div>
<button className="bg-surface-container-high hover:bg-surface-variant text-on-surface px-space-md h-10 rounded-lg font-label-md text-label-md flex items-center gap-space-2xs transition-colors shadow-sm">
<span className="material-symbols-outlined" style={{"fontSize": "18px"}}>{"history"}</span>{"\n        Scan Log\n      "}</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg flex flex-col xl:flex-row gap-space-md xl:items-center justify-between">
<div className="flex flex-wrap items-center gap-space-sm">

<div className="flex items-center bg-surface-container-low p-space-2xs rounded-lg">
<button className="px-space-md py-space-xs rounded-md bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all">{"Today / 24h"}</button>
<button className="px-space-md py-space-xs rounded-md text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">{"Past 48 Hours"}</button>
<button className="px-space-md py-space-xs rounded-md text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">{"Past 7 Days"}</button>
<button className="px-space-md py-space-xs rounded-md text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">{"All-Time Drops"}</button>
</div>

<div className="relative">
<button className="h-10 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md flex items-center gap-space-xs transition-colors" id="thresholdBtn">
<span className="material-symbols-outlined text-outline" style={{"fontSize": "18px"}}>{"filter_list"}</span>
<span>{"Threshold: "}<strong className="text-primary font-semibold">{"Drop > ₹5,000"}</strong></span>
<span className="material-symbols-outlined text-outline" style={{"fontSize": "18px"}}>{"expand_more"}</span>
</button>
</div>

<div className="flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold cursor-pointer">{"All Retailers"}</span>
<span className="px-space-sm py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm cursor-pointer transition-colors flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>{"Flipkart Assured\n        "}</span>
<span className="px-space-sm py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm cursor-pointer transition-colors flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{"Amazon Prime\n        "}</span>
<span className="px-space-sm py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm cursor-pointer transition-colors">{"Croma Retail"}</span>
</div>
</div>

<div className="relative min-w-[280px]">
<span className="material-symbols-outlined absolute left-space-sm top-2.5 text-outline pointer-events-none" style={{"fontSize": "20px"}}>{"tune"}</span>
<input className="w-full h-10 pl-10 pr-space-md bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all" placeholder="Filter drops by SKU or brand..." type="text" />
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"Total Drops Tracked"}</span>
<div className="flex items-baseline gap-space-xs mt-space-2xs">
<span className="font-price-hero text-price-hero text-on-surface">{"184"}</span>
<span className="font-label-md text-label-md text-outline">{"SKUs Today"}</span>
</div>
<div className="flex items-center gap-space-2xs mt-space-xs text-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"trending_up"}</span>
<span>{"+38% vs. yesterday"}</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontSize": "26px"}}>{"arrow_downward"}</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"Avg Real Discount"}</span>
<div className="flex items-baseline gap-space-xs mt-space-2xs">
<span className="font-price-hero text-price-hero text-secondary">{"22.4%"}</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">{"True Delta"}</span>
</div>
<div className="flex items-center gap-space-2xs mt-space-xs text-outline font-label-sm text-label-sm">
<span>{"Median savings: "}<strong>{"₹6,420"}</strong></span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" style={{"fontSize": "26px"}}>{"percent"}</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden">
<div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/5 rounded-full pointer-events-none"></div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"In Rahul's Budget"}</span>
<div className="flex items-baseline gap-space-xs mt-space-2xs">
<span className="font-price-hero text-price-hero text-primary">{"7"}</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">{"Products Ready"}</span>
</div>
<div className="flex items-center gap-space-2xs mt-space-xs text-secondary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"notifications_active"}</span>
<span>{"Target reached < ₹80,000"}</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontSize": "26px"}}>{"ads_click"}</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"Fake Drops Filtered"}</span>
<div className="flex items-baseline gap-space-xs mt-space-2xs">
<span className="font-price-hero text-price-hero text-error">{"62"}</span>
<span className="font-label-md text-label-md text-outline">{"Pre-sale markups"}</span>
</div>
<div className="flex items-center gap-space-2xs mt-space-xs text-outline font-label-sm text-label-sm">
<span className="material-symbols-outlined text-secondary" style={{"fontSize": "16px"}}>{"shield"}</span>
<span>{"Protected from bad buys"}</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-error-container/50 flex items-center justify-center text-error">
<span className="material-symbols-outlined" style={{"fontSize": "26px"}}>{"block"}</span>
</div>
</div>
</div>

<div className="mb-space-2xl">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-error animate-pulse"></span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Steepest Flash Price Drops"}</h2>
<span className="font-label-sm text-label-sm px-space-xs py-space-2xs bg-error-container text-on-error-container rounded-md uppercase font-bold tracking-wider ml-space-xs">{"High Volatility"}</span>
</div>
<span className="font-label-md text-label-md text-outline">{"Real-time dynamic inventory matching"}</span>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group relative overflow-hidden">
<div className="absolute top-0 right-0 bg-secondary px-space-md py-space-2xs text-on-secondary font-label-sm text-label-sm rounded-bl-xl font-bold flex items-center gap-space-2xs">
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"bolt"}</span>
<span>{"-₹8,000 Drop"}</span>
</div>
<div>

<div className="flex items-start gap-space-md mb-space-md">
<div className="w-20 h-20 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0 flex items-center justify-center p-space-xs">
<img className="w-full h-full object-contain" data-alt="Apple iPhone 17 Mist Blue 256GB sleek premium smartphone with dynamic island against a clean high-tech slate backdrop, studio commercial lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkv6oy8Ls3RUyrZhGbkjdi1aq7Mlm_ZaDBUys5XuECeikQIuRixhbXMK-IIisfK4HEXN6Bn3LDUiLF8ARDnMJRrp-39jiGkAMgGGSM_0Da8HiIcDgxtOya67IT4v8KyRm5nNXLYKvwUfqNHpVskE3_PsfxGGepx1QfIRtfAke-uBc-PTrfIzbO8ufEWy7ftwRTmy43MzA-riQ1KTtQprUwpCC94qEW6uAWCEQ0SX2sMxWhdtIk8LfM3w" />
</div>
<div className="flex flex-col pr-space-lg">
<div className="flex items-center gap-space-2xs mb-space-2xs">
<span className="px-space-xs py-space-2xs rounded bg-surface-container font-label-sm text-label-sm text-outline">{"Flipkart Verified"}</span>
<span className="font-label-sm text-label-sm text-outline">{"14m ago"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug">{"\n                Apple iPhone 17 (Mist Blue, 256GB)\n              "}</h3>
</div>
</div>

<div className="bg-secondary-container/30 px-space-sm py-space-xs rounded-lg flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-2xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm font-semibold text-on-secondary-container">{"Below Rahul's ₹80,000 Target"}</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"Target Hit!"}</span>
</div>

<div className="flex items-baseline justify-between mb-space-sm">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-outline line-through">{"MRP ₹86,999"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface">{"₹78,999"}</span>
<span className="font-label-md text-label-md text-secondary font-bold">{"-9.2%"}</span>
</div>
</div>

<div className="flex flex-col items-end">
<span className="font-label-sm text-label-sm text-outline mb-1">{"7D Velocity"}</span>
<svg className="w-24 h-8 text-secondary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0,5 L30,6 L60,8 L75,7 L100,26" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
<circle cx="100" cy="26" fill="currentColor" r="3"></circle>
</svg>
</div>
</div>
<p className="font-body-sm text-body-sm text-outline mb-space-md">{"\n            HDFC Bank CC Instant Discount ₹4,000 applied. Historical lowest price since launch.\n          "}</p>
</div>
<div className="flex items-center gap-space-sm pt-space-md bg-surface-container-lowest">
<button className="flex-1 h-10 bg-secondary hover:bg-secondary/90 text-on-secondary rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center gap-space-2xs transition-colors shadow-sm">
<span>{"Buy on Flipkart"}</span>
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"open_in_new"}</span>
</button>
<button className="h-10 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md transition-colors" title="Detailed Price Analysis">
<span className="material-symbols-outlined" style={{"fontSize": "18px"}}>{"analytics"}</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group relative overflow-hidden">
<div className="absolute top-0 right-0 bg-primary px-space-md py-space-2xs text-on-primary font-label-sm text-label-sm rounded-bl-xl font-bold flex items-center gap-space-2xs">
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"equalizer"}</span>
<span>{"-₹15,000 Drop"}</span>
</div>
<div>

<div className="flex items-start gap-space-md mb-space-md">
<div className="w-20 h-20 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0 flex items-center justify-center p-space-xs">
<img className="w-full h-full object-contain" data-alt="ASUS TUF Gaming F15 Laptop dark graphite stealth finish with backlit RGB keyboard on modern wooden workstation, architectural studio photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHV3tKST9Xf-6E5_LxLdPiHkWBYLOh2TF3BUnug7uxX03sN6zStCjibZG1rZvW0VuRoXnJg1bWAL9UM4tj1wQDjDbtz1gYzJJ5CkemIokBtziZcyahJaOZjiS2z5qldQUK5IgbOPYuB-KRVvBhB4pum_Mp_NrHjYuq7V99E2e4LrPsGBKx-bvYjK78X553ZRlvEMgSzHpC0mcm8phh3laOwT3G_51aEzTREBSvslqV0hwUB7bIYD1Fcg" />
</div>
<div className="flex flex-col pr-space-lg">
<div className="flex items-center gap-space-2xs mb-space-2xs">
<span className="px-space-xs py-space-2xs rounded bg-surface-container font-label-sm text-label-sm text-outline">{"Amazon / FK Parity"}</span>
<span className="font-label-sm text-label-sm text-outline">{"1h ago"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug">{"\n                ASUS TUF Gaming F15 (16GB / RTX 4060)\n              "}</h3>
</div>
</div>

<div className="bg-secondary-container/30 px-space-sm py-space-xs rounded-lg flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-2xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm font-semibold text-on-secondary-container">{"₹2,001 Below Target (₹72k)"}</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"Great Deal"}</span>
</div>

<div className="flex items-baseline justify-between mb-space-sm">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-outline line-through">{"MRP ₹84,999"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface">{"₹69,999"}</span>
<span className="font-label-md text-label-md text-secondary font-bold">{"-17.6%"}</span>
</div>
</div>

<div className="flex flex-col items-end">
<span className="font-label-sm text-label-sm text-outline mb-1">{"7D Velocity"}</span>
<svg className="w-24 h-8 text-secondary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0,4 L25,4 L50,10 L70,8 L100,28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
<circle cx="100" cy="28" fill="currentColor" r="3"></circle>
</svg>
</div>
</div>
<p className="font-body-sm text-body-sm text-outline mb-space-md">{"\n            Coupon applied + SBI Credit Card flat ₹5,000 instant markdown. Stock limited to 14 units.\n          "}</p>
</div>
<div className="flex items-center gap-space-sm pt-space-md bg-surface-container-lowest">
<button className="flex-1 h-10 bg-secondary hover:bg-secondary/90 text-on-secondary rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center gap-space-2xs transition-colors shadow-sm">
<span>{"Grab Deal (Amazon)"}</span>
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"open_in_new"}</span>
</button>
<button className="h-10 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md transition-colors" title="Detailed Price Analysis">
<span className="material-symbols-outlined" style={{"fontSize": "18px"}}>{"analytics"}</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group relative overflow-hidden">
<div className="absolute top-0 right-0 bg-tertiary-container px-space-md py-space-2xs text-on-tertiary-container font-label-sm text-label-sm rounded-bl-xl font-bold flex items-center gap-space-2xs">
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"workspace_premium"}</span>
<span>{"Record Low"}</span>
</div>
<div>

<div className="flex items-start gap-space-md mb-space-md">
<div className="w-20 h-20 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0 flex items-center justify-center p-space-xs">
<img className="w-full h-full object-contain" data-alt="Samsung 55 inch Crystal 4K UHD smart television showing vibrant nature landscape in a bright minimalist living room interior, architectural photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn676A13JhoA3ZvFWMvdVssNbT3e_fz9MW13zexcs_fdD5y024D2F31kNI8Uqn-E6oiaz1k-nW8ux_Rjn07Eyr2E0yBaUvSOk3hBrzDcTDqqhYH-PpBHDs2aVRUzdvvWpfGtBvZvBfGqwWiRuvz4APtmYz-wIGIfOtqRQGyK15wrjyOm6H1UCu9blN7yJQGQ4nRdUmzw9NYKciHGtO_VBegNfBh5Uoj-KXUICuMjITcIobuemFQENeoA" />
</div>
<div className="flex flex-col pr-space-lg">
<div className="flex items-center gap-space-2xs mb-space-2xs">
<span className="px-space-xs py-space-2xs rounded bg-surface-container font-label-sm text-label-sm text-outline">{"Flipkart"}</span>
<span className="font-label-sm text-label-sm text-outline">{"2h ago"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug">{"\n                Samsung 55\" Crystal 4K UHD TV\n              "}</h3>
</div>
</div>

<div className="bg-secondary-container/30 px-space-sm py-space-xs rounded-lg flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-2xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm font-semibold text-on-secondary-container">{"All-Time Lowest Floor"}</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"₹0 Below Floor"}</span>
</div>

<div className="flex items-baseline justify-between mb-space-sm">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-outline line-through">{"MRP ₹54,999"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface">{"₹39,999"}</span>
<span className="font-label-md text-label-md text-secondary font-bold">{"-27.2%"}</span>
</div>
</div>

<div className="flex flex-col items-end">
<span className="font-label-sm text-label-sm text-outline mb-1">{"7D Velocity"}</span>
<svg className="w-24 h-8 text-secondary overflow-visible" fill="none" viewBox="0 0 100 30">
<path d="M0,6 L35,8 L55,12 L80,14 L100,29" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
<circle cx="100" cy="29" fill="currentColor" r="3"></circle>
</svg>
</div>
</div>
<p className="font-body-sm text-body-sm text-outline mb-space-md">{"\n            ICICI Bank Card ₹3,000 off + Exchange boost ₹2,000. Anti-markup confirmed against 90-day base.\n          "}</p>
</div>
<div className="flex items-center gap-space-sm pt-space-md bg-surface-container-lowest">
<button className="flex-1 h-10 bg-secondary hover:bg-secondary/90 text-on-secondary rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center gap-space-2xs transition-colors shadow-sm">
<span>{"Buy on Flipkart"}</span>
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"open_in_new"}</span>
</button>
<button className="h-10 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md transition-colors" title="Detailed Price Analysis">
<span className="material-symbols-outlined" style={{"fontSize": "18px"}}>{"analytics"}</span>
</button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg mb-space-2xl">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg pb-space-md">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Comprehensive Price Drop Feed & Historical Velocity"}</h2>
<p className="font-body-md text-body-md text-on-surface-variant">{"\n          Normalized real-time streaming feed comparing current selling price against 90-day volume-weighted floor.\n        "}</p>
</div>
<div className="flex items-center gap-space-xs self-start md:self-auto">
<button className="px-space-md h-9 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md flex items-center gap-space-2xs transition-colors">
<span className="material-symbols-outlined" style={{"fontSize": "18px"}}>{"tune"}</span>{"\n          Column Visibility\n        "}</button>
<button className="px-space-md h-9 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md flex items-center gap-space-2xs transition-colors">
<span className="material-symbols-outlined" style={{"fontSize": "18px"}}>{"download"}</span>{"\n          Export CSV\n        "}</button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider rounded-lg">
<th className="py-space-sm px-space-md rounded-l-lg">{"Product & Specs"}</th>
<th className="py-space-sm px-space-sm">{"Retailer"}</th>
<th className="py-space-sm px-space-sm text-right">{"Previous Price"}</th>
<th className="py-space-sm px-space-sm text-right">{"Current Price"}</th>
<th className="py-space-sm px-space-md text-right">{"Drop Delta"}</th>
<th className="py-space-sm px-space-md">{"Velocity / Floor"}</th>
<th className="py-space-sm px-space-md rounded-r-lg text-right">{"Actions"}</th>
</tr>
</thead>
<tbody className="divide-y-0">

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center">
<img className="w-full h-full object-contain" data-alt="Apple iPhone 17 smartphone compact frontal render product image isolated." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOLGJcr62LDH-q7l0XBvBpa2H6IT24FL1pbuJKZgi6TpUecww8L8u8vMxMBP7z4J9YS0ngQFe7lBPsphqdMCF2n4Ui7AJ30ywFV_LRaNpqslY148mjv4acpl5QPI0xv7OdBR7k2Biv7sBmNxeBwqpHs6nKMMS9RnFOkmzamWPeaZPsutnZmQCooHqAzVoTw8qUFlTYk2LV4UjTgESdm2qJahQValJc5StYXC9GB1Mf6kBeX4MlAn99uw" />
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">{"Apple iPhone 17 (256GB, Mist Blue)"}</span>
<span className="material-symbols-outlined text-secondary" style={{"fontSize": "16px"}} title="Anti-Markup Verified: No false price hike detected">{"verified"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"A19 Bionic · ProMotion 120Hz · Dynamic Island"}</span>
</div>
</div>
</td>
<td className="py-space-md px-space-sm whitespace-nowrap">
<span className="px-space-xs py-space-2xs bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant font-medium">{"Flipkart"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹86,999"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-card text-price-card text-on-surface font-bold">{"₹78,999"}</span>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md text-secondary font-bold">{"-₹8,000"}</span>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-1 rounded">{"-9.2%"}</span>
</div>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<div className="flex items-center gap-space-sm">

<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 60 20">
<path d="M0,2 L20,3 L40,6 L60,18" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
</svg>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">{"At 90D Low"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex items-center justify-end gap-space-xs">
<button className="px-space-sm h-8 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1" title="Analyze Price Trend">
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"query_stats"}</span>{"\n                  Analyze\n                "}</button>
<button className="px-space-sm h-8 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"arrow_forward"}</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center">
<img className="w-full h-full object-contain" data-alt="Sony WH-1000XM6 Wireless Noise Cancelling Headphones matte black finish isolated on plain background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSf-m06T9lEeJd1OdolQuaEeQkh6MoBVRnY4nurT_hYG2K3KHh9zMF3QPUeCC1Vq0o23Yfjd3K5q4CiNGTi88BGZyjCikoUGvVoIvkq7qfOmQus5cFhh9h1HQyXI_UWUr_TwFs3a24mV9lHqZtKqWbZBmYEXwdZIz3HRfYh9p2Xo90fp5mDvcYXLE6fdo571NdLDxZBv9Wtgmtsp7Zehr-MJMBKe4z5X6HbHBvstfYRAz5rRz4hT3Hfw" />
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">{"Sony WH-1000XM6 Wireless ANC Headphones"}</span>
<span className="material-symbols-outlined text-secondary" style={{"fontSize": "16px"}} title="Anti-Markup Verified">{"verified"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"Hi-Res Audio · LDAC · 38Hr Battery · Multipoint"}</span>
</div>
</div>
</td>
<td className="py-space-md px-space-sm whitespace-nowrap">
<span className="px-space-xs py-space-2xs bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant font-medium">{"Amazon"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹32,990"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-card text-price-card text-on-surface font-bold">{"₹24,990"}</span>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md text-secondary font-bold">{"-₹8,000"}</span>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-1 rounded">{"-24.2%"}</span>
</div>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<div className="flex items-center gap-space-sm">

<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 60 20">
<path d="M0,2 L15,4 L30,4 L45,8 L60,19" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
</svg>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">{"Flash Markdown"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex items-center justify-end gap-space-xs">
<button className="px-space-sm h-8 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"query_stats"}</span>{"\n                  Analyze\n                "}</button>
<button className="px-space-sm h-8 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"arrow_forward"}</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center">
<img className="w-full h-full object-contain" data-alt="LG 55 inch OLED C4 TV ultrathin bezel edge mounted on architectural stand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9Hdlna5TYYcXBqRCOWDcfAYNdaQomTR4SbFRDdz461EVXWCRYJfapLqu3rozBVvyDVxxB_Bx267cFFhyY5hXTaHe-OmgveTy83FZedowlBfi51d9HGcqKM240c6hdCak24YllTkMBVo6A2FbqKnCi5Q34KWI-qEWPyBbmIZdDSyAcWMNRcam7xHbDHmSs-wUtFaJBO1S7iWG2sN5XZyKwPqQyShFPGK1EvRUhw9Zt04OCEEZEXdaqLw" />
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">{"LG 55\" evo OLED C4 4K Gaming TV"}</span>
<span className="material-symbols-outlined text-secondary" style={{"fontSize": "16px"}} title="Anti-Markup Verified">{"verified"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"144Hz VRR · α9 AI Gen7 · Dolby Vision IQ · 4x HDMI 2.1"}</span>
</div>
</div>
</td>
<td className="py-space-md px-space-sm whitespace-nowrap">
<span className="px-space-xs py-space-2xs bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant font-medium">{"Croma Retail"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹1,44,990"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-card text-price-card text-on-surface font-bold">{"₹1,18,990"}</span>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md text-secondary font-bold">{"-₹26,000"}</span>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-1 rounded">{"-17.9%"}</span>
</div>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<div className="flex items-center gap-space-sm">

<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 60 20">
<path d="M0,5 L20,5 L35,8 L50,12 L60,18" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
</svg>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">{"Historic Floor"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex items-center justify-end gap-space-xs">
<button className="px-space-sm h-8 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"query_stats"}</span>{"\n                  Analyze\n                "}</button>
<button className="px-space-sm h-8 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"arrow_forward"}</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center">
<img className="w-full h-full object-contain" data-alt="Apple MacBook Air 13 inch M3 chip Space Gray metal finish open laptop studio display." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGjojZt_VN0RcRdDLeqerX1XTvyqVuhjEvqfLdlXWBGnTUR_U9DD0lCy8FwTSFjSUi4ZBdXvRObEB1G2BGXDEgveuSPBwcwW_xZdXrCs1QamVVh_GZiKLwpy6EYNi9c3wtqNuOCs9QptmGh_n_hahmsnXVW4WPiu4CD4I47mvSq7hCJxZciqo6zjN0tebbaLDG5huEIpBf-IvMgx9uQOOmzsXdBGsZR8YEgHZGg8xi2QMTcJMxPuqzlA" />
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">{"Apple MacBook Air 13\" (M3, 16GB / 512GB)"}</span>
<span className="material-symbols-outlined text-secondary" style={{"fontSize": "16px"}} title="Anti-Markup Verified">{"verified"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"Liquid Retina · 18hr Battery · MagSafe 3 · Space Grey"}</span>
</div>
</div>
</td>
<td className="py-space-md px-space-sm whitespace-nowrap">
<span className="px-space-xs py-space-2xs bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant font-medium">{"Amazon"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹1,34,900"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-card text-price-card text-on-surface font-bold">{"₹1,19,900"}</span>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md text-secondary font-bold">{"-₹15,000"}</span>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-1 rounded">{"-11.1%"}</span>
</div>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<div className="flex items-center gap-space-sm">

<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 60 20">
<path d="M0,3 L18,3 L36,5 L48,10 L60,18" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
</svg>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">{"₹1.5k to Floor"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex items-center justify-end gap-space-xs">
<button className="px-space-sm h-8 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"query_stats"}</span>{"\n                  Analyze\n                "}</button>
<button className="px-space-sm h-8 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"arrow_forward"}</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center">
<img className="w-full h-full object-contain" data-alt="Lenovo Legion Slim 5 Gaming Laptop metallic storm grey premium chassis on black desktop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv6nuRGqWj-R1woPlwJop2Dalc7Nm4nz63D32ss6Echq2hOsjZXg3LExV5sEz10d5rwa_5IdIaUMiYQOOiWGcGLrYTE-kS5IgXVNxtTumLBTMlhSSziOWynTjyw15FUTQuP6piHOugZm8TvsJuT3jIzdvAq4TRyk7DoAC-z-Ohk08JNf9RgveilS9LNdxVyc5TY76igRJoLRzVBVB_hbUoeHLkiAgk4ChmLehTmvEfYIVEPbFuqFIB5g" />
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">{"Lenovo Legion Slim 5 Gen 9 (Ryzen 7 8845HS)"}</span>
<span className="material-symbols-outlined text-secondary" style={{"fontSize": "16px"}} title="Anti-Markup Verified">{"verified"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"RTX 4070 · 165Hz WQXGA · 16GB DDR5 · 1TB SSD"}</span>
</div>
</div>
</td>
<td className="py-space-md px-space-sm whitespace-nowrap">
<span className="px-space-xs py-space-2xs bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant font-medium">{"Flipkart"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹1,32,990"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-card text-price-card text-on-surface font-bold">{"₹1,12,490"}</span>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md text-secondary font-bold">{"-₹20,500"}</span>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-1 rounded">{"-15.4%"}</span>
</div>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<div className="flex items-center gap-space-sm">

<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 60 20">
<path d="M0,4 L22,4 L38,8 L48,11 L60,18" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
</svg>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">{"Drop Accelerating"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex items-center justify-end gap-space-xs">
<button className="px-space-sm h-8 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"query_stats"}</span>{"\n                  Analyze\n                "}</button>
<button className="px-space-sm h-8 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"arrow_forward"}</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center">
<img className="w-full h-full object-contain" data-alt="Apple iPad Air 11 inch M2 Starlight tablet front display with Apple Pencil pro resting adjacent." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_MlWeehchD_99h30mKyXPeCeFGjcbaXflemUsUX6_UHMzwUbfgB-065DGUyEAKvrLAivme480tdwmq7gT2Bms2adYJyNc3LVPOLaCmuNmUqalYF628bntebzo7mEEEXKu_9dvRH2ASwF8l2QQLK5CSsRyJZ-_vXNE-2U9IRZdcg8pEFjHwYYyqUrgolJMd2PvcdzusDkg7mtlLYOdFIAS1yTj95mcHnlcHeiJW3KBQCe2feOr8xQOCg" />
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">{"Apple iPad Air 11\" (M2, Wi-Fi, 128GB - Starlight)"}</span>
<span className="material-symbols-outlined text-secondary" style={{"fontSize": "16px"}} title="Anti-Markup Verified">{"verified"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"Apple M2 chip · Liquid Retina display · Apple Pencil Pro support"}</span>
</div>
</div>
</td>
<td className="py-space-md px-space-sm whitespace-nowrap">
<span className="px-space-xs py-space-2xs bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant font-medium">{"Flipkart"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹59,900"}</span>
</td>
<td className="py-space-md px-space-sm text-right whitespace-nowrap">
<span className="font-price-card text-price-card text-on-surface font-bold">{"₹52,999"}</span>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md text-secondary font-bold">{"-₹6,901"}</span>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-1 rounded">{"-11.5%"}</span>
</div>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<div className="flex items-center gap-space-sm">

<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 60 20">
<path d="M0,6 L20,7 L35,8 L50,12 L60,19" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
</svg>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">{"At 90D Low"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="flex items-center justify-end gap-space-xs">
<button className="px-space-sm h-8 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span className="material-symbols-outlined" style={{"fontSize": "16px"}}>{"query_stats"}</span>{"\n                  Analyze\n                "}</button>
<button className="px-space-sm h-8 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"arrow_forward"}</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="flex flex-col sm:flex-row items-center justify-between gap-space-md mt-space-lg pt-space-md">
<div className="flex items-center gap-space-xs text-outline font-body-sm text-body-sm">
<span>{"Showing "}<strong>{"1 - 6"}</strong>{" of "}<strong>{"184"}</strong>{" verified drops"}</span>
<span className="mx-space-xs">{"•"}</span>
<span className="flex items-center gap-space-2xs text-secondary">
<span className="material-symbols-outlined" style={{"fontSize": "14px"}}>{"sync"}</span>{"\n          Next batch checks in 2m 45s\n        "}</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="h-9 px-space-md bg-surface-container-low text-outline rounded-lg font-label-sm text-label-sm hover:text-on-surface transition-colors cursor-not-allowed opacity-60" disabled="">{"Previous"}</button>
<button className="h-9 w-9 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm font-bold shadow-sm">{"1"}</button>
<button className="h-9 w-9 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm transition-colors">{"2"}</button>
<button className="h-9 w-9 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm transition-colors">{"3"}</button>
<span className="text-outline px-1">{"..."}</span>
<button className="h-9 w-9 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm transition-colors">{"31"}</button>
<button className="h-9 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm transition-colors">{"Next"}</button>
</div>
</div>
</div>

<div className="fixed bottom-6 right-6 bg-inverse-surface text-inverse-on-surface p-space-md rounded-xl shadow-xl flex items-center gap-space-md z-50 transition-all duration-300 transform translate-y-0 max-w-md" id="toastNotification">
<div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary flex-shrink-0">
<span className="material-symbols-outlined" style={{"fontSize": "22px"}}>{"radar"}</span>
</div>
<div className="flex flex-col min-w-0 pr-space-sm">
<span className="font-headline-sm text-headline-sm text-inverse-on-surface">{"Target Hit Alert"}</span>
<span className="font-body-sm text-body-sm text-inverse-on-surface/80">{"iPhone 17 dropped below your ₹80,000 threshold to ₹78,999 on Flipkart."}</span>
</div>
<button className="text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors flex-shrink-0">
<span className="material-symbols-outlined" style={{"fontSize": "20px"}}>{"close"}</span>
</button>
</div>
</div></main></div>);
}
