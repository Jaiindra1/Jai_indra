import React from 'react';
// Source: Pasted text (12).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function CategoryGamingPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">

<div className="flex flex-col gap-space-sm mb-space-lg">
<div className="flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
<span>{"Categories"}</span>
<span className="material-symbols-outlined text-[14px] text-outline">{"chevron_right"}</span>
<span className="text-primary font-semibold">{"Gaming & Consoles"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container-high rounded text-outline font-label-sm text-label-sm ml-space-xs">{"Node #IN-DEL-92"}</span>
</div>
<div className="flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-lowest shadow-sm">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
</span>
<span className="font-label-sm text-label-sm text-on-surface font-medium">{"Live Crawler Active:"}</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">{"Croma • Amazon India • Flipkart • Sony Center"}</span>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-1.5 py-0.5 rounded ml-1">{"Synced 90s ago"}</span>
</div>
</div>
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mt-space-2xs">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Gaming & Consoles Deal Intelligence"}</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5 max-w-3xl">{"\n          Automated deal scanner for PlayStation 5, Xbox Series X, Nintendo Switch, handheld PCs (Steam Deck, ROG Ally), and AAA gaming peripherals with anti-markup validation.\n        "}</p>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<button className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm font-label-md text-label-md hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[18px]">{"download"}</span>{"\n          Export Matrix\n        "}</button>
<button className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary text-on-primary shadow-sm font-label-md text-label-md hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined text-[18px]">{"tune"}</span>{"\n          Set Budget Trigger\n        "}</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{"Gaming SKUs Monitored"}</span>
<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">{"sports_esports"}</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-headline-lg text-headline-lg text-on-surface">{"860 "}<span className="font-label-md text-label-md text-on-surface-variant font-normal">{"Active SKUs"}</span></div>
<div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm mt-1">
<span className="material-symbols-outlined text-[16px]">{"trending_up"}</span>
<span>{"+42 scanned across 8 authorized retailers"}</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-space-md">
<div className="bg-primary h-full rounded-full" style={{"width": "78%"}}></div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{"Average Discount Delta"}</span>
<div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">{"price_check"}</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-headline-lg text-headline-lg text-secondary">{"19.4% "}<span className="font-label-md text-label-md text-on-surface font-semibold">{"True Delta"}</span></div>
<div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm mt-1">
<span className="material-symbols-outlined text-[16px] text-secondary">{"verified"}</span>
<span>{"Vs. strict 60-day price floor baseline"}</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-space-md">
<div className="bg-secondary h-full rounded-full" style={{"width": "64%"}}></div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{"Rahul's Budget Match"}</span>
<span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px]">{"₹50,000 Cap"}</span>
</div>
<div className="w-8 h-8 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[18px]">{"account_balance_wallet"}</span>
</div>
</div>
<div className="mt-space-md">
<div className="font-headline-lg text-headline-lg text-on-surface">{"12 "}<span className="font-label-md text-label-md text-on-surface font-semibold">{"Deals Matched"}</span></div>
<div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm mt-1">
<span className="material-symbols-outlined text-[16px]">{"task_alt"}</span>
<span>{"4 flagship consoles + 8 handhelds in range"}</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-space-md">
<div className="bg-tertiary-container h-full rounded-full" style={{"width": "85%"}}></div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{"Biggest Drop Today"}</span>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-[10px] uppercase font-bold tracking-wide">{"Flipkart Hot"}</span>
</div>
<div className="mt-space-md">
<div className="font-headline-md text-headline-md text-on-surface truncate">{"PS5 Slim Digital"}</div>
<div className="flex items-baseline gap-2 mt-0.5">
<span className="font-price-card text-price-card text-secondary">{"₹39,990"}</span>
<span className="font-label-sm text-label-sm text-error font-semibold">{"-₹5,000 (11% off)"}</span>
</div>
</div>
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm mt-space-md pt-1">
<span>{"Instant ₹2,000 SBI card applied"}</span>
<span className="text-primary font-semibold">{"All-Time Low"}</span>
</div>
</div>
</div>

<div className="flex flex-col lg:flex-row items-start gap-space-xl">

<aside className="w-full lg:w-64 shrink-0 flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[20px] text-primary">{"filter_alt"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface">{"Filters"}</span>
</div>
<button className="font-label-sm text-label-sm text-primary hover:underline">{"Reset All"}</button>
</div>

<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-outline">{"Rahul's Budget"}</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Active"}</span>
</div>
<div className="flex flex-col gap-1.5 mt-1">
<button className="flex items-center justify-between px-space-sm py-1.5 rounded-lg text-left font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">
<span>{"Under ₹20,000"}</span>
<span className="text-outline font-label-sm text-label-sm">{"4"}</span>
</button>
<button className="flex items-center justify-between px-space-sm py-1.5 rounded-lg text-left font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">
<span>{"₹20,000 – ₹40,000"}</span>
<span className="text-outline font-label-sm text-label-sm">{"7"}</span>
</button>
<button className="flex items-center justify-between px-space-sm py-1.5 rounded-lg text-left font-body-sm text-body-sm bg-primary/10 text-primary font-semibold">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">{"check_circle"}</span>{"\n              ₹40,000 – ₹55,000\n            "}</span>
<span className="px-1.5 py-0.2 rounded bg-primary text-on-primary font-label-sm text-[10px]">{"Target"}</span>
</button>
<button className="flex items-center justify-between px-space-sm py-1.5 rounded-lg text-left font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">
<span>{"Above ₹55,000"}</span>
<span className="text-outline font-label-sm text-label-sm">{"9"}</span>
</button>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-outline">{"Ecosystem / Platform"}</span>
<div className="flex flex-col gap-1 mt-1">
<label className="flex items-center justify-between px-space-xs py-1 rounded hover:bg-surface-container-low cursor-pointer">
<div className="flex items-center gap-2">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface font-medium">{"PlayStation 5"}</span>
</div>
<span className="font-label-sm text-label-sm text-outline">{"18"}</span>
</label>
<label className="flex items-center justify-between px-space-xs py-1 rounded hover:bg-surface-container-low cursor-pointer">
<div className="flex items-center gap-2">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface font-medium">{"Xbox Series X|S"}</span>
</div>
<span className="font-label-sm text-label-sm text-outline">{"12"}</span>
</label>
<label className="flex items-center justify-between px-space-xs py-1 rounded hover:bg-surface-container-low cursor-pointer">
<div className="flex items-center gap-2">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface font-medium">{"Nintendo Switch OLED"}</span>
</div>
<span className="font-label-sm text-label-sm text-outline">{"9"}</span>
</label>
<label className="flex items-center justify-between px-space-xs py-1 rounded hover:bg-surface-container-low cursor-pointer">
<div className="flex items-center gap-2">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface font-medium">{"PC Handhelds"}</span>
</div>
<span className="font-label-sm text-label-sm text-outline">{"6"}</span>
</label>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-outline">{"Hardware Type"}</span>
<div className="flex flex-wrap gap-1.5 mt-1">
<span className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold cursor-pointer">{"Consoles & Bundles"}</span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm cursor-pointer">{"Handheld PCs"}</span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm cursor-pointer">{"Controllers"}</span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm cursor-pointer">{"Headsets"}</span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm cursor-pointer">{"Keyboards"}</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-outline">{"Storage Edition"}</span>
<div className="grid grid-cols-3 gap-1.5 mt-1">
<button className="py-1 px-2 text-center rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container">{"512GB"}</button>
<button className="py-1 px-2 text-center rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold">{"1TB SSD"}</button>
<button className="py-1 px-2 text-center rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container">{"2TB SSD"}</button>
</div>
</div>

<div className="flex flex-col gap-space-xs pt-1">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-outline">{"Special Deal Logic"}</span>
<div className="flex flex-col gap-2 mt-1">
<label className="flex items-center gap-2 text-on-surface cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox" />
<span className="font-body-sm text-body-sm flex items-center gap-1 font-medium">
<span className="material-symbols-outlined text-[15px] text-secondary">{"verified_user"}</span>{"\n              Anti-Markup Verified\n            "}</span>
</label>
<label className="flex items-center gap-2 text-on-surface cursor-pointer">
<input defaultChecked className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox" />
<span className="font-body-sm text-body-sm">{"Bundled Controller Incl."}</span>
</label>
<label className="flex items-center gap-2 text-on-surface cursor-pointer">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox" />
<span className="font-body-sm text-body-sm">{"Free Game Pass / PS Plus"}</span>
</label>
</div>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-high/60 flex items-start gap-2 text-on-surface">
<span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">{"insights"}</span>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
<strong className="text-on-surface">{"SARATHI Tip:"}</strong>{" Flipkart currently leads Sony PS5 pricing by ₹3,000 through instant Axis/SBI credit card stacking.\n        "}</p>
</div>
</aside>

<section className="flex-1 w-full min-w-0 flex flex-col gap-space-lg">

<div className="flex flex-wrap items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
<div className="flex items-center gap-space-sm">
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">{"Active Deals:"}</span>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"6 Priority Matches"}</span>
<span className="text-outline font-body-sm text-body-sm hidden sm:inline">{"• Real-time pricing confirmed"}</span>
</div>
<div className="flex items-center gap-space-md">
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-label-sm text-on-surface-variant">{"Sort by:"}</span>
<div className="relative">
<select className="h-9 pl-3 pr-8 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
<option>{"Highest Real Savings (₹)"}</option>
<option>{"Deepest Percentage Drop (%)"}</option>
<option>{"Price: Low to High"}</option>
<option>{"All-Time Low Records"}</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-2 text-[18px] pointer-events-none text-outline">{"expand_more"}</span>
</div>
</div>
<div className="flex items-center rounded-lg bg-surface-container-low p-1 gap-1">
<button className="p-1 rounded bg-surface-container-lowest text-primary shadow-xs">
<span className="material-symbols-outlined text-[18px]">{"grid_view"}</span>
</button>
<button className="p-1 rounded text-outline hover:text-on-surface">
<span className="material-symbols-outlined text-[18px]">{"table_rows"}</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
<div>
<div className="relative w-full h-48 bg-surface-container-low overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="PlayStation 5 Slim Digital Edition game console standing vertically with futuristic clean white faceplates and dual LED blue ambient glows on a sleek slate table, commercial gaming photography, soft studio lighting, sharp focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1NABA2f_OsElEDGNxojvOuR4pUa8wIqLRgqkss5T_rwvgaqkKPgEpSlcJMniq83jfa5oUyD7apdLF5CEJ56fKHoYsGj22iOAefUsvoTApQiTri8bzOhwsEore8gRQTEJONm9JekdjUHmc9HUmneDBoe_BpdGY_S0hgQ6za_R3hBTpgEtFq2NZC-ungLorbxGXEndOcPU04YSU1sZgcX9aarmoojubxBdczx5Y9OpoN2FpxQo0N_NHbg" />
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs">
<span className="material-symbols-outlined text-[12px]">{"verified"}</span>{" Flipkart Verified\n                "}</span>
<span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold uppercase tracking-wider">{"\n                  Target Reached!\n                "}</span>
</div>
<div className="absolute top-space-sm right-space-sm">
<span className="px-2 py-0.5 rounded-md bg-inverse-surface/80 backdrop-blur-sm text-on-primary font-label-sm text-[11px] font-medium">{"\n                  All-Time Low\n                "}</span>
</div>
</div>
<div className="p-space-lg flex flex-col gap-space-sm">
<div>
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
<span>{"Sony • 1TB Custom SSD"}</span>
<span className="text-secondary font-semibold">{"In Rahul's Budget"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">{"\n                  PlayStation 5 Slim Digital Edition\n                "}</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{"Includes DualSense, Astro's Playroom & 10Gbps USB-C ports."}</p>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<div className="flex items-baseline gap-2">
<span className="font-price-hero text-price-hero text-secondary">{"₹39,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹44,990"}</span>
</div>
<span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">{"11% OFF"}</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
<span className="text-secondary font-medium">{"Net Real Savings: ₹5,000"}</span>
<span className="text-outline">{"Free Delivery by Tomorrow"}</span>
</div>
</div>
</div>
</div>
<div className="p-space-lg pt-0 flex items-center gap-space-xs">
<a className="flex-1 py-2 px-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold text-center hover:bg-secondary/90 transition-colors flex items-center justify-center gap-1 shadow-xs" href="https://flipkart.com" rel="noopener noreferrer" target="_blank">
<span>{"View Deal on Flipkart"}</span>
<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
<button className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="Track Price Radar">
<span className="material-symbols-outlined text-[20px]">{"notifications_active"}</span>
</button>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
<div>
<div className="relative w-full h-48 bg-surface-container-low overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="ASUS ROG Ally X gaming handheld portable console in matte black with dual illuminated RGB analog thumbsticks, textured ergonomic side grips, displayed on a minimalist carbon-fiber surface, high-end product showcase photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK-JbuewbWmOaQv0EaFHqJBrJff_2lLqgwETx9OZ0JvorF1QbZ9pUnMlbZCtOBU5X_1mM22qOMszoiWYJhNJjH8VIYVlM3whQhlC_QN_YXn_rQKVK2xJCbTaoTSFRmVG2LLSq3jXeAWUrY_AlnuW7JeKczzvco67CJ_aAPFOm-lHNL1RYkQNvYdqCdESS0mlobtkZnDOS6GUkCXNPoGEHhpfJdR-AYaYXlCPZuTgNHF00-9YF5Rt6Z5Q" />
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs">
<span className="material-symbols-outlined text-[12px] text-primary">{"local_shipping"}</span>{" Amazon India\n                "}</span>
<span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] font-bold uppercase tracking-wider">{"\n                  Lowest in 30 Days\n                "}</span>
</div>
</div>
<div className="p-space-lg flex flex-col gap-space-sm">
<div>
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
<span>{"AMD Ryzen Z1 Extreme • 80Wh Batt"}</span>
<span className="text-outline font-label-sm">{"Above ₹55k"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">{"\n                  ASUS ROG Ally X Handheld\n                "}</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{"24GB LPDDR5X, 1TB NVMe, 120Hz VRR FHD display."}</p>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<div className="flex items-baseline gap-2">
<span className="font-price-hero text-price-hero text-secondary">{"₹79,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹89,990"}</span>
</div>
<span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">{"11% OFF"}</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
<span className="text-secondary font-medium">{"Save ₹10,000 Flat"}</span>
<span className="text-outline">{"Amazon Prime 1-Day"}</span>
</div>
</div>
</div>
</div>
<div className="p-space-lg pt-0 flex items-center gap-space-xs">
<a className="flex-1 py-2 px-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold text-center hover:bg-primary-container transition-colors flex items-center justify-center gap-1 shadow-xs" href="https://amazon.in" rel="noopener noreferrer" target="_blank">
<span>{"View Deal on Amazon"}</span>
<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
<button className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="Track Price Radar">
<span className="material-symbols-outlined text-[20px]">{"notifications_active"}</span>
</button>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
<div>
<div className="relative w-full h-48 bg-surface-container-low overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Xbox Series X 1TB monolithic matte black tower gaming console beside official wireless controller, soft green illumination casting from the top thermal vent, studio setting with soft grey shadows, elegant tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQu2uR56X8kI8R7FGjan4zkR_MGervucBcCI6h9KxcNuAqfeC17igpV4PFKYf6zGvbD-JdQyf-0934xU9X-yr8LZaR8DiIGJ7cjfiD-qC3s0o6JpI3SXJy1zGFd5kWJyRVezplfCi72GwQ0HiXuoSHOgEZ8VZfLK9pk2if29oYpNF1iby3LRbS8mFiXzR1USZfnCqXlv_SP2K39je8SPV_xt4XZdzmTIy311s03iFii6rPqI3yxNqbdA" />
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs">
<span className="material-symbols-outlined text-[12px] text-secondary">{"verified"}</span>{" Flipkart Assured\n                "}</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold uppercase tracking-wider">{"\n                  Under ₹50k Cap\n                "}</span>
</div>
</div>
<div className="p-space-lg flex flex-col gap-space-sm">
<div>
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
<span>{"Microsoft • 1TB Custom SSD"}</span>
<span className="text-secondary font-semibold">{"In Rahul's Budget"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">{"\n                  Xbox Series X (1TB Black)\n                "}</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{"12 Teraflops GPU, 4K True Gaming & Disc Drive edition."}</p>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<div className="flex items-baseline gap-2">
<span className="font-price-hero text-price-hero text-secondary">{"₹46,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹54,990"}</span>
</div>
<span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">{"15% OFF"}</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
<span className="text-secondary font-medium">{"Save ₹8,000 Flat"}</span>
<span className="text-outline">{"HDFC EMI ₹2,600/mo"}</span>
</div>
</div>
</div>
</div>
<div className="p-space-lg pt-0 flex items-center gap-space-xs">
<a className="flex-1 py-2 px-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold text-center hover:bg-secondary/90 transition-colors flex items-center justify-center gap-1 shadow-xs" href="https://flipkart.com" rel="noopener noreferrer" target="_blank">
<span>{"View Deal on Flipkart"}</span>
<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
<button className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="Track Price Radar">
<span className="material-symbols-outlined text-[20px]">{"notifications_active"}</span>
</button>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
<div>
<div className="relative w-full h-48 bg-surface-container-low overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="PlayStation 5 DualSense Wireless Controller Midnight Black Edition close-up on dark textured marble background, subtle reflection, highlighting ergonomic tactile triggers and touchpad, crisp modern commercial tech photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBReAHBNn0QFnMSZTfDUlAPdosbcgtbA-4WTs1dTkw9EpsVvCy8sYuFbmF_ND2M5sLDlpXAsAuuF1198CGmta7kdKLKMOBJudtGWz8jKZv3nBY1FJVb0F2H99E05EtpUzpMWZji3JFkXDQzRxXw6IwsB9iuIn2e-T2WJKnW3lK4FskbRo-s-NV4Rkq8NcJtXHzVildQdccxFvVby1lFSxV-uhFPvCc_5dzbVYYUdW_Pzr4vSBKaoaEpuw" />
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs">
<span className="material-symbols-outlined text-[12px] text-primary">{"local_shipping"}</span>{" Amazon India\n                "}</span>
<span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] font-bold uppercase tracking-wider">{"\n                  25% Drop\n                "}</span>
</div>
</div>
<div className="p-space-lg flex flex-col gap-space-sm">
<div>
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
<span>{"Sony Official Accessory"}</span>
<span className="text-secondary font-semibold">{"Under ₹20k"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">{"\n                  DualSense Wireless Controller (Midnight Black)\n                "}</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{"Haptic feedback, dynamic adaptive triggers, built-in mic."}</p>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<div className="flex items-baseline gap-2">
<span className="font-price-hero text-price-hero text-secondary">{"₹4,499"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹5,990"}</span>
</div>
<span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">{"25% OFF"}</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
<span className="text-secondary font-medium">{"Save ₹1,491"}</span>
<span className="text-outline">{"6-Month Warranty"}</span>
</div>
</div>
</div>
</div>
<div className="p-space-lg pt-0 flex items-center gap-space-xs">
<a className="flex-1 py-2 px-space-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold text-center hover:bg-primary-container transition-colors flex items-center justify-center gap-1 shadow-xs" href="https://amazon.in" rel="noopener noreferrer" target="_blank">
<span>{"View Deal on Amazon"}</span>
<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
<button className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="Track Price Radar">
<span className="material-symbols-outlined text-[20px]">{"notifications_active"}</span>
</button>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
<div>
<div className="relative w-full h-48 bg-surface-container-low overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Nintendo Switch OLED Model with White Joy-Con controllers docked on desk, vivid vibrant 7-inch OLED panel displaying saturated colors, soft daylight studio lighting, clean architectural tabletop setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLRMciukmh3OjojVrxv0nLiBYGMm8xD2WcJym0lNmxgaV8Qw4XT1pZCuK6FUn115_O3OyI-KInX9Twe-TyCu4LYoPYMi8r-iIF2NykQWOTiN6fKqq7Axu-2LXPyO8i-6YWTRharE7e1h-JeKC8TBgNCAryTCiiCGhzoFLpW8VHS0LaximAfXJ6-VtEkIAvCpYg9FkVf21I8gLONsxGOon5t7S8kTNEUIxR0D0QLA6ebxbcZnzDfDuJQw" />
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs">
<span className="material-symbols-outlined text-[12px] text-primary">{"storefront"}</span>{" Croma Retail\n                "}</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold uppercase tracking-wider">{"\n                  Store Pickup Ready\n                "}</span>
</div>
</div>
<div className="p-space-lg flex flex-col gap-space-sm">
<div>
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
<span>{"Nintendo • 64GB OLED"}</span>
<span className="text-secondary font-semibold">{"In Rahul's Budget"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">{"\n                  Nintendo Switch OLED Model (White)\n                "}</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{"7-inch vibrant OLED screen, LAN dock, wide adjustable stand."}</p>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<div className="flex items-baseline gap-2">
<span className="font-price-hero text-price-hero text-secondary">{"₹28,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹34,999"}</span>
</div>
<span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">{"17% OFF"}</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
<span className="text-secondary font-medium">{"Save ₹6,009"}</span>
<span className="text-outline">{"Instant Store Pickup"}</span>
</div>
</div>
</div>
</div>
<div className="p-space-lg pt-0 flex items-center gap-space-xs">
<a className="flex-1 py-2 px-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold text-center hover:bg-secondary/90 transition-colors flex items-center justify-center gap-1 shadow-xs" href="https://croma.com" rel="noopener noreferrer" target="_blank">
<span>{"View Deal on Croma"}</span>
<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
<button className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="Track Price Radar">
<span className="material-symbols-outlined text-[20px]">{"notifications_active"}</span>
</button>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
<div>
<div className="relative w-full h-48 bg-surface-container-low overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Sony INZONE H9 premium wireless noise cancelling gaming headset resting on an acrylic headphone stand, elegant white and black PS5 aesthetic design, subtle LED lighting accent, clean high-tech desktop setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjsfWc8YvecQzx6q2Ka92EoVZoDbgpNSuFV84Th4l5Y8i02YqZoFs83SQV1Oeimw9bvWUZZccsJS8oB82vU73wThzgq4VsGAc7t01NxWH8R-0qG6fS6kRhEq2Yu0BrhpE7TRtH-AMexXw9FyLUY3SCjAyNtX0ybU016kYCieR_W_n0_fTXSx3mVxTO64aPxv39UatOn0zCat2XTAXgRg69VgyiGJ71WGVqNPm59nn34W3iHOwUMw6Yw" />
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start">
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs">
<span className="material-symbols-outlined text-[12px] text-secondary">{"verified"}</span>{" Flipkart Verified\n                "}</span>
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[10px] font-bold uppercase tracking-wider">{"\n                  29% Steep Drop\n                "}</span>
</div>
</div>
<div className="p-space-lg flex flex-col gap-space-sm">
<div>
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm mb-1">
<span>{"360 Spatial Audio • Dual Noise Canceling"}</span>
<span className="text-secondary font-semibold">{"Under ₹20k"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">{"\n                  Sony INZONE H9 Wireless Gaming Headset\n                "}</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{"32-hour battery life, 2.4GHz USB dongle & Bluetooth simultaneous."}</p>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<div className="flex items-baseline gap-2">
<span className="font-price-hero text-price-hero text-secondary">{"₹19,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹27,990"}</span>
</div>
<span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">{"29% OFF"}</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
<span className="text-secondary font-medium">{"Save ₹8,000 Flat"}</span>
<span className="text-outline">{"Official Sony India Bill"}</span>
</div>
</div>
</div>
</div>
<div className="p-space-lg pt-0 flex items-center gap-space-xs">
<a className="flex-1 py-2 px-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold text-center hover:bg-secondary/90 transition-colors flex items-center justify-center gap-1 shadow-xs" href="https://flipkart.com" rel="noopener noreferrer" target="_blank">
<span>{"View Deal on Flipkart"}</span>
<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
<button className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="Track Price Radar">
<span className="material-symbols-outlined text-[20px]">{"notifications_active"}</span>
</button>
</div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg mt-space-md flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">{"compare_arrows"}</span>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">{"\n                Console & Hardware Landed Cost Benchmarking Matrix\n              "}</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{"\n              Live multi-vendor cost audit accounting for instant bank discounts, delivery fees, and genuine Indian warranty.\n            "}</p>
</div>
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">{"\n              Live Scrape Verified\n            "}</span>
</div>
</div>

<div className="w-full overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead>
<tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3 px-space-md rounded-l-lg">{"Hardware SKU"}</th>
<th className="py-3 px-space-md text-right">{"Flipkart (Live)"}</th>
<th className="py-3 px-space-md text-right">{"Amazon India"}</th>
<th className="py-3 px-space-md text-right">{"Croma Retail"}</th>
<th className="py-3 px-space-md text-right">{"Reliance Digital"}</th>
<th className="py-3 px-space-md text-center">{"Warranty & Stock"}</th>
<th className="py-3 px-space-md text-right rounded-r-lg">{"Lowest Vendor Action"}</th>
</tr>
</thead>
<tbody className="divide-y-0">

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3.5 px-space-md font-medium text-on-surface">
<div className="flex flex-col">
<span className="font-semibold">{"PlayStation 5 Slim Digital (1TB)"}</span>
<span className="text-outline font-label-sm text-label-sm">{"Sony India Official SKU"}</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right">
<span className="font-bold text-secondary text-price-card">{"₹39,990"}</span>
<span className="block font-label-sm text-[10px] text-secondary">{"Lowest (SBI Card)"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹42,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"ICICI ₹1,500"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹44,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"No Bank Promo"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹43,490"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"HDFC ₹1,500"}</span>
</td>
<td className="py-3.5 px-space-md text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-semibold">{"\n                    In Stock (1 Yr Sony)\n                  "}</span>
</td>
<td className="py-3.5 px-space-md text-right">
<a className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary/90 transition-colors" href="#">{"\n                    Flipkart ₹39k\n                  "}</a>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3.5 px-space-md font-medium text-on-surface">
<div className="flex flex-col">
<span className="font-semibold">{"PlayStation 5 Disc Edition (1TB)"}</span>
<span className="text-outline font-label-sm text-label-sm">{"Slim Disc Version"}</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹49,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Axis Card"}</span>
</td>
<td className="py-3.5 px-space-md text-right">
<span className="font-bold text-secondary text-price-card">{"₹48,990"}</span>
<span className="block font-label-sm text-[10px] text-secondary">{"Lowest (Amazon Pay)"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹54,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Store stock only"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹51,490"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Tata Neu Coins"}</span>
</td>
<td className="py-3.5 px-space-md text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-semibold">{"\n                    In Stock (1 Yr Sony)\n                  "}</span>
</td>
<td className="py-3.5 px-space-md text-right">
<a className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors" href="#">{"\n                    Amazon ₹48.9k\n                  "}</a>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3.5 px-space-md font-medium text-on-surface">
<div className="flex flex-col">
<span className="font-semibold">{"Xbox Series X (1TB Black)"}</span>
<span className="text-outline font-label-sm text-label-sm">{"Standard Standalone"}</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right">
<span className="font-bold text-secondary text-price-card">{"₹46,990"}</span>
<span className="block font-label-sm text-[10px] text-secondary">{"Lowest (Save ₹8k)"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹49,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Prime Member Only"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹52,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Standard MRP"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span className="text-outline">{"Out of Stock"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"—"}</span>
</td>
<td className="py-3.5 px-space-md text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-semibold">{"\n                    In Stock (1 Yr MS)\n                  "}</span>
</td>
<td className="py-3.5 px-space-md text-right">
<a className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary/90 transition-colors" href="#">{"\n                    Flipkart ₹46.9k\n                  "}</a>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3.5 px-space-md font-medium text-on-surface">
<div className="flex flex-col">
<span className="font-semibold">{"Nintendo Switch OLED (White)"}</span>
<span className="text-outline font-label-sm text-label-sm">{"Includes 2 Joy-Cons"}</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹29,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Third Party Seller"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹30,490"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Imported Unit"}</span>
</td>
<td className="py-3.5 px-space-md text-right">
<span className="font-bold text-secondary text-price-card">{"₹28,990"}</span>
<span className="block font-label-sm text-[10px] text-secondary">{"Lowest (Official Import)"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹31,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Store Only"}</span>
</td>
<td className="py-3.5 px-space-md text-center">
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-[11px] font-semibold">{"\n                    Limited Units\n                  "}</span>
</td>
<td className="py-3.5 px-space-md text-right">
<a className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary/90 transition-colors" href="#">{"\n                    Croma ₹28.9k\n                  "}</a>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3.5 px-space-md font-medium text-on-surface">
<div className="flex flex-col">
<span className="font-semibold">{"ASUS ROG Ally X (24GB / 1TB)"}</span>
<span className="text-outline font-label-sm text-label-sm">{"RC72LA-NH007W"}</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹82,490"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Flat ₹7.5k off"}</span>
</td>
<td className="py-3.5 px-space-md text-right">
<span className="font-bold text-secondary text-price-card">{"₹79,990"}</span>
<span className="block font-label-sm text-[10px] text-secondary">{"Lowest (Apparels)"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹84,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"ASUS Corner"}</span>
</td>
<td className="py-3.5 px-space-md text-right text-on-surface">
<span>{"₹84,990"}</span>
<span className="block font-label-sm text-[10px] text-outline">{"Standard Tag"}</span>
</td>
<td className="py-3.5 px-space-md text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-semibold">{"\n                    In Stock (1 Yr Asus)\n                  "}</span>
</td>
<td className="py-3.5 px-space-md text-right">
<a className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors" href="#">{"\n                    Amazon ₹79.9k\n                  "}</a>
</td>
</tr>
</tbody>
</table>
</div>

<div className="flex flex-wrap items-center justify-between text-outline font-label-sm text-label-sm pt-space-xs">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-secondary">{"shield"}</span>
<span>{"All monitored items are verified for Indian manufacturer warranty. Grey-market units are filtered out automatically."}</span>
</div>
<span>{"Refreshed 2 minutes ago • SARATHI Bot #G-09"}</span>
</div>
</div>
</section>
</div>
</div></main></div>);
}
