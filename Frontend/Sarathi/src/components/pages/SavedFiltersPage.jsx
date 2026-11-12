import React from 'react';
// Source: Pasted text (10).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function SavedFiltersPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">

<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md mb-space-xl">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center gap-space-xs text-outline font-body-sm text-body-sm">
<a className="hover:text-primary transition-colors" href="#">{"Dashboard"}</a>
<span className="material-symbols-outlined text-[14px]">{"chevron_right"}</span>
<span className="text-on-surface-variant">{"Tools & Intelligence"}</span>
<span className="material-symbols-outlined text-[14px]">{"chevron_right"}</span>
<span className="text-on-surface font-label-md text-label-md">{"Saved Filters"}</span>
</div>
<h1 className="font-display-lg text-display-lg text-on-surface tracking-tight mt-space-2xs">{"\n        Saved Filters & Automated Deal Scanners\n      "}</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">{"\n        Configure personalized deal hunting criteria, automated alert thresholds, and multi-retailer scanning rules.\n      "}</p>
</div>

<div className="flex items-center gap-space-sm self-start lg:self-center">
<button className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg shadow-sm transition-all" id="quick-run-btn">
<span className="material-symbols-outlined text-[18px]">{"bolt"}</span>
<span>{"Run All Scanners Now"}</span>
</button>
<button className="flex items-center gap-space-xs px-space-lg py-space-sm bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md rounded-lg shadow-sm transition-all" id="open-builder-btn">
<span className="material-symbols-outlined text-[18px]">{"add"}</span>
<span>{"Create New Filter Rule"}</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-space-2xs">{"Active Scanners"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface font-bold">{"4"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"Rules Running"}</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" 100% telemetry online\n        "}</span>
</div>
<div className="p-space-xs rounded-lg bg-surface-container text-primary">
<span className="material-symbols-outlined text-[24px]">{"tune"}</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-space-2xs">{"Matches Discovered"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-secondary font-bold">{"28"}</span>
<span className="font-body-sm text-body-sm text-on-surface font-medium">{"Deals Today"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline mt-space-xs flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-secondary text-[16px]">{"trending_up"}</span>{" +7 vs yesterday\n        "}</span>
</div>
<div className="p-space-xs rounded-lg bg-secondary-container text-on-secondary-container">
<span className="material-symbols-outlined text-[24px]">{"price_check"}</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-space-2xs">{"Auto-Alert Delivery"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-md text-headline-md text-on-surface font-bold">{"Instant"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"WhatsApp & Push"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline mt-space-xs">{"\n          Avg dispatch: 1.2s latency\n        "}</span>
</div>
<div className="p-space-xs rounded-lg bg-surface-container-high text-primary">
<span className="material-symbols-outlined text-[24px]">{"notifications_active"}</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-space-2xs">{"Scan Cadence"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-headline-md text-headline-md text-on-surface font-bold">{"Every 15m"}</span>
<span className="font-body-sm text-body-sm text-outline font-medium">{"Continuous"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline mt-space-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>{" Next sync: in 3m 42s\n        "}</span>
</div>
<div className="p-space-xs rounded-lg bg-surface-container text-outline">
<span className="material-symbols-outlined text-[24px]">{"history"}</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start">

<section className="xl:col-span-7 flex flex-col gap-space-md">
<div className="flex items-center justify-between px-space-xs">
<div className="flex items-center gap-space-xs">
<h2 className="font-headline-md text-headline-md text-on-surface">{"Active Saved Filter Rules"}</h2>
<span className="px-space-xs py-space-2xs bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full">{"4 Active"}</span>
</div>
<div className="flex items-center gap-space-xs text-outline font-body-sm text-body-sm">
<span>{"Sort by:"}</span>
<button className="font-label-md text-label-md text-on-surface flex items-center gap-space-2xs">{"\n            Matches Discovered\n            "}<span className="material-symbols-outlined text-[16px]">{"expand_more"}</span>
</button>
</div>
</div>

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm mb-space-md">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
<span className="material-symbols-outlined text-[28px]">{"smartphone"}</span>
</div>
<div>
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<h3 className="font-headline-sm text-headline-sm text-on-surface">{"Rahul's Flagship iPhone Scanner"}</h3>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"High Priority"}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-outline font-label-sm text-label-sm">{"ID: #SCAN-9021"}</span>
</div>
<p className="font-body-sm text-body-sm text-outline">{"Targeting premium iOS flagship drops below festive benchmarks."}</p>
</div>
</div>

<div className="flex items-center gap-space-xs self-end sm:self-auto">
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Active"}</span>
<button aria-checked="true" className="w-10 h-6 bg-primary rounded-full relative p-0.5 transition-colors focus:outline-none" role="switch">
<span className="block w-5 h-5 bg-surface-container-lowest rounded-full shadow-sm transform translate-x-4 transition-transform"></span>
</button>
</div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs p-space-md bg-surface-container-low rounded-lg mb-space-md font-body-sm text-body-sm">
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Category & Brand"}</span>
<span className="font-label-md text-label-md text-on-surface">{"Mobiles • Apple"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Budget Ceiling"}</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">{"≤ ₹80,000"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Min Specs & Deal"}</span>
<span className="font-label-md text-label-md text-on-surface">{"≥256GB • ≥15% Off"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Retailers"}</span>
<div className="flex items-center gap-space-2xs mt-space-2xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-outline font-label-sm text-[10px]">{"Flipkart"}</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-outline font-label-sm text-[10px]">{"Amazon"}</span>
</div>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container mb-space-md">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px]">{"verified"}</span>
<span className="font-label-md text-label-md text-on-surface">{"2 Active Deals Qualified"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"Triggered 14m ago"}</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">

<div className="flex items-center gap-space-sm p-space-sm bg-surface-container-lowest rounded-lg shadow-sm">
<img className="w-12 h-12 rounded object-cover flex-shrink-0" data-alt="High tech iPhone 17 in soft Mist Blue finish isolated on clean minimal gradient backdrop with subtle blue reflection" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu6rC_ZDgXIHJwtD_hs42-ljkIMd-8UvHB1cYGgUzzejFYuS5NL5rlZ3GsoJfnHRgG-Pr-9kKEfG-9l4MGHZ5Y1xQvYYlGCqZLYwn7dVLOIEKX52vgJ7kwbc4_IgyaMNwVkCwnpc9KbKX4OWdPNb1LMYiQU2up4jFBsbWY9QhvQYm2qUrg1v6u2w2zO3nftD6QPAdGO1dAcdR7f0DOToNl-UovCztbFvGdZfeQgNx36OWNuO788m5s3w" />
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface truncate">{"iPhone 17 (256GB, Mist Blue)"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹78,999"}</span>
<span className="font-price-mrp text-price-mrp line-through text-outline">{"₹89,900"}</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"17% OFF"}</span>
</div>
</div>
</div>

<div className="flex items-center gap-space-sm p-space-sm bg-surface-container-lowest rounded-lg shadow-sm">
<img className="w-12 h-12 rounded object-cover flex-shrink-0" data-alt="Sleek iPhone 17 in Matte Black color with ceramic shield sheen against dark minimal tech studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyljyGHwOzVIObKBnXTPbmA4MSJ0rArfMvRczbAMifNfOwTG-oBjjUwbJHPcY89WYRbFs_cDvKig_Jlw2UYm9hyvR8IjRC4GaXvWDImTZvrMaZyG2i_oi-XWaM4N3MXYnQsHTaoHgX_5HcNNffrF13BW702_0icMplhY2W0IZ1RfOk7z1A3CerL-vjRI94TIhyY0zKg2SR21ihqxTiThTLyY7j73vbihms-7vQyfslT1Tva-bF2xvwmQ" />
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface truncate">{"iPhone 17 (256GB, Black)"}</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹79,999"}</span>
<span className="font-price-mrp text-price-mrp line-through text-outline">{"₹89,900"}</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"15% OFF"}</span>
</div>
</div>
</div>
</div>
</div>

<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex items-center gap-space-md text-outline font-body-sm text-body-sm">
<span className="flex items-center gap-space-2xs text-secondary">
<span className="material-symbols-outlined text-[16px]">{"check_circle"}</span>{" Push & Email Enabled\n            "}</span>
<span className="flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">{"schedule"}</span>{" Checked 4m ago\n            "}</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-md py-space-xs bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition-colors">{"\n              Edit Rule\n            "}</button>
<button className="px-space-md py-space-xs bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md rounded-lg transition-colors shadow-sm">{"\n              View 2 Matches\n            "}</button>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm mb-space-md">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
<span className="material-symbols-outlined text-[28px]">{"laptop_mac"}</span>
</div>
<div>
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<h3 className="font-headline-sm text-headline-sm text-on-surface">{"High-Performance Gaming Laptop Alert"}</h3>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-outline font-label-sm text-label-sm">{"ID: #SCAN-4410"}</span>
</div>
<p className="font-body-sm text-body-sm text-outline">{"Tracking thermal efficiency & GPU TDP thresholds for 1080p/1440p gaming rigs."}</p>
</div>
</div>
<div className="flex items-center gap-space-xs self-end sm:self-auto">
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Active"}</span>
<button aria-checked="true" className="w-10 h-6 bg-primary rounded-full relative p-0.5 transition-colors focus:outline-none" role="switch">
<span className="block w-5 h-5 bg-surface-container-lowest rounded-full shadow-sm transform translate-x-4 transition-transform"></span>
</button>
</div>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs p-space-md bg-surface-container-low rounded-lg mb-space-md font-body-sm text-body-sm">
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Target Keywords"}</span>
<span className="font-label-md text-label-md text-on-surface">{"\"RTX 4060\", \"i7\", \"Ryzen 7\""}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Budget Window"}</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">{"₹60,000 - ₹80,000"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Min Savings"}</span>
<span className="font-label-md text-label-md text-on-surface">{"≥20% Discount"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Rating Criteria"}</span>
<span className="font-label-md text-label-md text-on-surface">{"≥ 4.2 ★ Verified"}</span>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container mb-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="flex -space-x-2 overflow-hidden">
<span className="inline-block h-8 w-8 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-center leading-8 font-bold">{"AS"}</span>
<span className="inline-block h-8 w-8 rounded-full bg-surface-container-high text-on-surface font-label-sm text-center leading-8 font-bold">{"LN"}</span>
<span className="inline-block h-8 w-8 rounded-full bg-surface-container-low text-on-surface font-label-sm text-center leading-8 font-bold">{"AC"}</span>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface">{"5 Active Matches Qualified"}</p>
<p className="font-body-sm text-body-sm text-outline truncate">{"ASUS TUF F15, Lenovo Legion Slim 5, Acer Nitro V15"}</p>
</div>
</div>
<span className="px-space-xs py-space-2xs bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded self-start sm:self-auto">{"From ₹68,490"}</span>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex items-center gap-space-md text-outline font-body-sm text-body-sm">
<span className="flex items-center gap-space-2xs text-secondary">
<span className="material-symbols-outlined text-[16px]">{"check_circle"}</span>{" Web Push Active\n            "}</span>
<span>{"Scan Frequency: 15m"}</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-md py-space-xs bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition-colors">{"\n              Edit Rule\n            "}</button>
<button className="px-space-md py-space-xs bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md rounded-lg transition-colors shadow-sm">{"\n              View 5 Matches\n            "}</button>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm mb-space-md">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
<span className="material-symbols-outlined text-[28px]">{"headphones"}</span>
</div>
<div>
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<h3 className="font-headline-sm text-headline-sm text-on-surface">{"Premium ANC Audio Steals"}</h3>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-outline font-label-sm text-label-sm">{"ID: #SCAN-1198"}</span>
</div>
<p className="font-body-sm text-body-sm text-outline">{"Monitoring flagship noise cancelling wireless headsets & buds."}</p>
</div>
</div>
<div className="flex items-center gap-space-xs self-end sm:self-auto">
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Active"}</span>
<button aria-checked="true" className="w-10 h-6 bg-primary rounded-full relative p-0.5 transition-colors focus:outline-none" role="switch">
<span className="block w-5 h-5 bg-surface-container-lowest rounded-full shadow-sm transform translate-x-4 transition-transform"></span>
</button>
</div>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs p-space-md bg-surface-container-low rounded-lg mb-space-md font-body-sm text-body-sm">
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Category & Brands"}</span>
<span className="font-label-md text-label-md text-on-surface">{"Audio • Sony, Bose, Senn"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Max Price"}</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">{"≤ ₹28,000"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Min Discount"}</span>
<span className="font-label-md text-label-md text-on-surface">{"≥ 20% Required"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Active Matches"}</span>
<span className="font-label-md text-label-md text-secondary font-bold">{"3 Deals Live"}</span>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex items-center gap-space-md text-outline font-body-sm text-body-sm">
<span className="flex items-center gap-space-2xs text-secondary">
<span className="material-symbols-outlined text-[16px]">{"check_circle"}</span>{" WhatsApp Alert On\n            "}</span>
<span>{"Sony WH-1000XM5 triggered at ₹24,990"}</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-md py-space-xs bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition-colors">{"\n              Edit Rule\n            "}</button>
<button className="px-space-md py-space-xs bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md rounded-lg transition-colors shadow-sm">{"\n              View 3 Matches\n            "}</button>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm mb-space-md">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
<span className="material-symbols-outlined text-[28px]">{"tv"}</span>
</div>
<div>
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<h3 className="font-headline-sm text-headline-sm text-on-surface">{"Living Room 55-65 inch 4K TV"}</h3>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-outline font-label-sm text-label-sm">{"ID: #SCAN-7729"}</span>
</div>
<p className="font-body-sm text-body-sm text-outline">{"Smart TV upgrades with Dolby Vision, HDR10+, and minimum 60Hz panel."}</p>
</div>
</div>
<div className="flex items-center gap-space-xs self-end sm:self-auto">
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Active"}</span>
<button aria-checked="true" className="w-10 h-6 bg-primary rounded-full relative p-0.5 transition-colors focus:outline-none" role="switch">
<span className="block w-5 h-5 bg-surface-container-lowest rounded-full shadow-sm transform translate-x-4 transition-transform"></span>
</button>
</div>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs p-space-md bg-surface-container-low rounded-lg mb-space-md font-body-sm text-body-sm">
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Size Bounds"}</span>
<span className="font-label-md text-label-md text-on-surface">{"55\" - 65\" UHD"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Max Price Cap"}</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">{"≤ ₹45,000"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Specs"}</span>
<span className="font-label-md text-label-md text-on-surface">{"60Hz+ Panel Refresh"}</span>
</div>
<div>
<span className="block font-label-sm text-label-sm text-outline uppercase">{"Live Deals"}</span>
<span className="font-label-md text-label-md text-secondary font-bold">{"4 Matches"}</span>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
<div className="flex items-center gap-space-md text-outline font-body-sm text-body-sm">
<span className="flex items-center gap-space-2xs text-secondary">
<span className="material-symbols-outlined text-[16px]">{"check_circle"}</span>{" Web Push On\n            "}</span>
<span>{"Includes LG UHD & Samsung Crystal"}</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-md py-space-xs bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition-colors">{"\n              Edit Rule\n            "}</button>
<button className="px-space-md py-space-xs bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md rounded-lg transition-colors shadow-sm">{"\n              View 4 Matches\n            "}</button>
</div>
</div>
</article>
</section>

<aside className="xl:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm sticky top-20">

<div className="flex items-center justify-between pb-space-md mb-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">{"precision_manufacturing"}</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">{"Rule Builder Preview"}</h2>
<p className="font-body-sm text-body-sm text-outline">{"Real-time parameters for multi-retailer crawler"}</p>
</div>
</div>
<span className="px-space-xs py-space-2xs rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">{"PRESET MODE"}</span>
</div>

<form className="flex flex-col gap-space-md" id="filter-builder-form">

<div>
<label className="block font-label-md text-label-md text-on-surface mb-space-2xs" htmlFor="filter-name">{"\n            Filter Scanner Name\n          "}</label>
<input className="w-full h-10 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest transition-colors shadow-sm" id="filter-name" placeholder="e.g. Sony OLED 55-inch Price Drop" type="text" defaultValue="Apple MacBook Air M3 Drops" />
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<div>
<label className="block font-label-md text-label-md text-on-surface mb-space-2xs" htmlFor="target-category">{"\n              Target Category\n            "}</label>
<div className="relative">
<select className="w-full h-10 px-space-md pr-8 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest shadow-sm cursor-pointer" id="target-category">
<option value="laptops">{"Laptops & MacBooks"}</option>
<option value="mobiles">{"Mobiles & Tablets"}</option>
<option value="audio">{"Audio & Soundbars"}</option>
<option value="tvs">{"Televisions"}</option>
<option value="gaming">{"Gaming Consoles"}</option>
</select>
<span className="material-symbols-outlined text-outline absolute right-space-sm top-2.5 pointer-events-none text-[18px]">{"expand_more"}</span>
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface mb-space-2xs" htmlFor="keyword-triggers">{"\n              Keyword Triggers\n            "}</label>
<input className="w-full h-10 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest transition-colors shadow-sm" id="keyword-triggers" placeholder="Comma-separated keywords" type="text" defaultValue="M3, 16GB, 512GB" />
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg">
<div className="flex items-center justify-between mb-space-2xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="price-range">{"\n              Target Price Cap Range\n            "}</label>
<span className="font-label-md text-label-md text-primary font-bold" id="price-display">{"\n              ₹85,000 max\n            "}</span>
</div>
<input className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary" id="price-range" max="150000" min="10000" step="5000" type="range" defaultValue="85000" />
<div className="flex justify-between items-center text-outline font-label-sm text-label-sm mt-space-2xs">
<span>{"₹10,000"}</span>
<span>{"₹75,000"}</span>
<span>{"₹1,50,000"}</span>
</div>
</div>

<div>
<div className="flex items-center justify-between mb-space-2xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="discount-req">{"\n              Minimum Required Discount\n            "}</label>
<span className="font-label-sm text-label-sm text-secondary font-bold" id="discount-val">{"≥ 18%"}</span>
</div>
<div className="grid grid-cols-4 gap-space-xs">
<button className="discount-pill py-space-xs rounded-lg font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors" data-discount="10" type="button">{"10%+"}</button>
<button className="discount-pill py-space-xs rounded-lg font-label-sm text-label-sm bg-primary text-on-primary font-bold shadow-sm" data-discount="18" type="button">{"18%+"}</button>
<button className="discount-pill py-space-xs rounded-lg font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors" data-discount="25" type="button">{"25%+"}</button>
<button className="discount-pill py-space-xs rounded-lg font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors" data-discount="35" type="button">{"35%+"}</button>
</div>
</div>

<div>
<label className="block font-label-md text-label-md text-on-surface mb-space-xs">{"\n            Target Retailers & Marketplaces\n          "}</label>
<div className="grid grid-cols-2 gap-space-xs">
<label className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface font-medium">{"Flipkart"}</span>
<span className="ml-auto w-2 h-2 rounded-full bg-secondary"></span>
</label>
<label className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface font-medium">{"Amazon India"}</span>
<span className="ml-auto w-2 h-2 rounded-full bg-secondary"></span>
</label>
<label className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface font-medium">{"Croma Retail"}</span>
<span className="ml-auto w-2 h-2 rounded-full bg-secondary"></span>
</label>
<label className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
<span className="font-body-sm text-body-sm text-outline font-medium">{"Reliance Digital"}</span>
<span className="ml-auto w-2 h-2 rounded-full bg-outline"></span>
</label>
</div>
</div>

<div>
<label className="block font-label-md text-label-md text-on-surface mb-space-xs">{"\n            Delivery & Stock Conditions\n          "}</label>
<div className="flex flex-wrap gap-space-xs">
<label className="flex items-center gap-space-2xs px-space-sm py-space-xs rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-surface-container">
<input defaultChecked className="accent-primary" type="checkbox" />
<span>{"In Stock Only"}</span>
</label>
<label className="flex items-center gap-space-2xs px-space-sm py-space-xs rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-surface-container">
<input defaultChecked className="accent-primary" type="checkbox" />
<span>{"Flipkart Assured / Prime"}</span>
</label>
<label className="flex items-center gap-space-2xs px-space-sm py-space-xs rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-surface-container">
<input className="accent-primary" type="checkbox" />
<span>{"No-Cost EMI Applicable"}</span>
</label>
</div>
</div>

<div>
<label className="block font-label-md text-label-md text-on-surface mb-space-xs">{"\n            Notification Dispatch Channels\n          "}</label>
<div className="grid grid-cols-3 gap-space-xs">
<label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low text-center cursor-pointer hover:bg-surface-container transition-colors">
<input className="sr-only peer" type="checkbox" />
<span className="material-symbols-outlined text-[20px] text-outline peer-checked:text-primary">{"sms"}</span>
<span className="font-label-sm text-label-sm text-outline peer-checked:text-on-surface peer-checked:font-bold mt-space-2xs">{"SMS"}</span>
</label>
<label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low text-center cursor-pointer hover:bg-surface-container transition-colors">
<input defaultChecked className="sr-only peer" type="checkbox" />
<span className="material-symbols-outlined text-[20px] text-secondary peer-checked:text-secondary">{"chat"}</span>
<span className="font-label-sm text-label-sm text-on-surface peer-checked:font-bold mt-space-2xs">{"WhatsApp"}</span>
</label>
<label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low text-center cursor-pointer hover:bg-surface-container transition-colors">
<input defaultChecked className="sr-only peer" type="checkbox" />
<span className="material-symbols-outlined text-[20px] text-primary peer-checked:text-primary">{"notifications"}</span>
<span className="font-label-sm text-label-sm text-on-surface peer-checked:font-bold mt-space-2xs">{"Web Push"}</span>
</label>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low text-on-surface flex items-center justify-between" id="live-test-output">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px]">{"troubleshoot"}</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold">{"Simulated Match Results"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Tested over 12,410 active listings"}</span>
</div>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-secondary font-bold">{"~3 Deals"}</span>
<span className="block font-label-sm text-label-sm text-outline">{"instant hit"}</span>
</div>
</div>

<div className="flex flex-col gap-space-xs pt-space-xs">
<button className="w-full h-10 px-space-md bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg flex items-center justify-center gap-space-xs transition-colors" id="test-filter-btn" type="button">
<span className="material-symbols-outlined text-[18px]">{"network_check"}</span>
<span>{"Test Filter Against Live Inventory"}</span>
</button>
<button className="w-full h-11 px-space-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-space-xs transition-colors shadow-sm font-semibold" id="save-filter-btn" type="submit">
<span className="material-symbols-outlined text-[18px]">{"save"}</span>
<span>{"Save Scanner Rule"}</span>
</button>
</div>
</form>
</aside>
</div>

<div className="mt-space-2xl p-space-lg bg-surface-container-low rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-[24px]">{"chevron_forward"}</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">{"Automated Webhook & Telegram Sync"}</h3>
<p className="font-body-md text-body-md text-outline">{"Connect your DealSense scanner to custom Discord bots, Telegram groups, or API triggers."}</p>
</div>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition-colors">{"\n        Configure Webhook\n      "}</button>
<button className="px-space-md py-space-sm bg-secondary text-on-secondary hover:bg-opacity-90 font-label-md text-label-md rounded-lg transition-colors shadow-sm">{"\n        Connect Telegram Bot\n      "}</button>
</div>
</div>
</div>
</main></div>);
}
