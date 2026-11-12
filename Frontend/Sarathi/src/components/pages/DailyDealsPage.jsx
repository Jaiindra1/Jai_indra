import React from 'react';
// Source: Pasted text (2)(2).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function DailyDealsPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">

<div className="flex flex-col lg:flex-row lg:items-center justify-between pb-space-lg gap-space-md">
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center gap-space-xs">
<span className="p-space-2xs bg-secondary-container text-on-secondary-container rounded-md flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">{"local_fire_department"}</span>
</span>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Daily Deals Discovery"}</h1>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm ml-space-xs">{"\n          Live Radar\n        "}</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">{"\n        Best deals algorithmically discovered today across 12,000+ monitored products. Filter, compare effective payable prices, and add to your personal watchlist.\n      "}</p>
</div>
<div className="flex items-center gap-space-md flex-wrap lg:flex-nowrap">
<div className="flex flex-col items-end">
<div className="flex items-center gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span>{"Last scanned: "}<span className="font-label-md text-label-md text-on-surface font-semibold">{"12m ago"}</span></span>
</div>
<span className="font-label-sm text-label-sm text-outline">{"482 active verified drops today"}</span>
</div>
<button className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">{"add_alert"}</span>
<span>{"Create Custom Alert"}</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md mb-space-lg flex flex-col gap-space-md">

<div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-md">
<div className="relative w-full xl:max-w-md">
<span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">{"manage_search"}</span>
<input className="w-full h-10 pl-10 pr-space-md bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Filter deals by title, model, or specs (e.g. RTX 4060, OLED)..." type="text" />
</div>

<div className="flex items-center gap-space-xs overflow-x-auto pb-space-2xs xl:pb-0">
<button className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm bg-primary-container text-on-primary-container whitespace-nowrap shadow-xs font-semibold">{"\n          All Deals "}<span className="opacity-80 ml-space-2xs font-normal">{"482"}</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          📱 Mobiles "}<span className="text-outline ml-space-2xs font-normal">{"84"}</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          💻 Laptops "}<span className="text-outline ml-space-2xs font-normal">{"62"}</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          📺 TVs "}<span className="text-outline ml-space-2xs font-normal">{"45"}</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          🎧 Audio "}<span className="text-outline ml-space-2xs font-normal">{"71"}</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          🎮 Gaming "}<span className="text-outline ml-space-2xs font-normal">{"53"}</span>
</button>
<button className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          🏠 Appliances "}<span className="text-outline ml-space-2xs font-normal">{"92"}</span>
</button>
</div>
</div>

<div className="flex flex-wrap items-center justify-between pt-space-sm gap-space-sm bg-surface-container-low/60 p-space-sm rounded-lg">
<div className="flex flex-wrap items-center gap-space-sm">

<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-space-2xs rounded-lg shadow-xs">
<span className="material-symbols-outlined text-outline text-[16px]">{"payments"}</span>
<span className="font-label-sm text-label-sm text-outline">{"Budget:"}</span>
<span className="font-label-sm text-label-sm text-primary font-semibold">{"≤ ₹85,000"}</span>
<button className="text-outline hover:text-on-surface ml-space-2xs flex items-center">
<span className="material-symbols-outlined text-[14px]">{"close"}</span>
</button>
</div>

<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-space-2xs rounded-lg shadow-xs cursor-pointer hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-secondary text-[16px]">{"percent"}</span>
<span className="font-label-sm text-label-sm text-on-surface">{"Min 20% OFF"}</span>
<span className="material-symbols-outlined text-outline text-[16px]">{"keyboard_arrow_down"}</span>
</div>

<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-space-2xs rounded-lg shadow-xs cursor-pointer hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-tertiary text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span className="font-label-sm text-label-sm text-on-surface">{"4.0 & above"}</span>
<span className="material-symbols-outlined text-outline text-[16px]">{"keyboard_arrow_down"}</span>
</div>

<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-space-2xs rounded-lg shadow-xs cursor-pointer hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-outline text-[16px]">{"storefront"}</span>
<span className="font-label-sm text-label-sm text-on-surface">{"Flipkart, Amazon, Croma"}</span>
<span className="material-symbols-outlined text-outline text-[16px]">{"keyboard_arrow_down"}</span>
</div>

<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-space-2xs rounded-lg shadow-xs cursor-pointer hover:bg-surface-container-high transition-colors">
<span className="font-label-sm text-label-sm text-outline">{"Brand:"}</span>
<span className="font-label-sm text-label-sm text-on-surface">{"Apple, ASUS, Sony..."}</span>
<span className="material-symbols-outlined text-outline text-[16px]">{"keyboard_arrow_down"}</span>
</div>

<label className="flex items-center gap-space-xs cursor-pointer select-none pl-space-xs">
<input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer bg-surface-container-lowest" type="checkbox" />
<span className="font-label-sm text-label-sm text-on-surface">{"In Stock Only"}</span>
</label>
</div>

<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-outline">{"Sorted by:"}</span>
<button className="flex items-center gap-space-xs px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
<span className="material-symbols-outlined text-primary text-[16px]">{"auto_awesome"}</span>
<span className="font-semibold">{"SARATHI Intelligence Score"}</span>
<span className="material-symbols-outlined text-outline text-[16px]">{"expand_more"}</span>
</button>
</div>
</div>
</div>

<div className="mb-space-lg p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]">{"insights"}</span>
</div>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface">{"Morning Liquidation Sync Complete"}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"\n            High Confidence\n          "}</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">{"\n          Detected 18 fresh electronic price drops matching your active "}<span className="font-semibold text-on-surface">{"₹80,000 threshold"}</span>{" across verified e-commerce partners.\n        "}</p>
</div>
</div>
<div className="hidden md:flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{"Monitored Portals:"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant">{"Flipkart (SuperCoins Active)"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant">{"Amazon Prime"}</span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-lg mb-space-2xl">

<div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">

<div className="relative p-space-md bg-surface-container-low flex flex-col justify-between h-48 overflow-hidden">
<div className="flex items-center justify-between z-10">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n            Flipkart Verified\n          "}</span>
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors shadow-xs" title="Save to My Products">
<span className="material-symbols-outlined text-[18px]">{"favorite"}</span>
</button>
</div>
<div className="absolute inset-0 flex items-center justify-center p-space-lg">
<img className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Modern smartphone in sleek Mist Blue titanium finish, studio product lighting, reflective glass backdrop with soft blue shadows, highly detailed flagship electronics rendering on clean neutral surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBivhXZtrHENLIy-mmlbiVOTzFh023X5q-8UVetIYxkstiaB1eJ-HnMZChoBGLs1nio054N8KWnUBjiVWaXhJxCjsBMhuMe7oMYAvgwbYrWzlX6cJoGYaI7mcLKhgsmQNvsoEuR3s3eK51U5rMdc3vmr5dH0RJEtBS8uVlTSbkvPGfl41-xh9-gOhJLOkD4WF_bM7wS_QFpPXP49VKNVA_OUyBj0xPgeuANkKqqv73v6IfZjDBLAKJmTw" />
</div>
<div className="z-10 flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>{"Synced 14m ago"}</span>
<span className="text-secondary font-semibold">{"🟢 In Stock"}</span>
</div>
</div>

<div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
<div>

<div className="flex flex-wrap gap-space-2xs mb-space-xs">
<span className="px-space-xs py-space-2xs rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"\n              🏷 30-Day Low\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-md bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">{"\n              📉 ₹8,000 Drop\n            "}</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{"\n            Apple iPhone 17 (Mist Blue, 256 GB)\n          "}</h2>
<div className="flex items-center gap-space-xs mt-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span className="font-semibold ml-space-2xs">{"4.5"}</span>
</span>
<span>{"•"}</span>
<span className="text-outline">{"1,832 reviews"}</span>
</div>
</div>

<div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"30D Velocity"}</span>
<span className="font-label-md text-label-md text-secondary font-semibold">{"All-time Low"}</span>
</div>
<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 100 30">
<path d="M0 5 L20 12 L40 8 L65 20 L80 18 L100 28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
</svg>
</div>

<div className="pt-space-xs">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹78,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹99,999"}</span>
<span className="px-space-xs py-space-2xs rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">{"\n              21% OFF\n            "}</span>
</div>
<div className="mt-space-2xs flex items-center gap-space-2xs font-body-sm text-body-sm text-secondary">
<span className="material-symbols-outlined text-[16px]">{"credit_card"}</span>
<span className="font-semibold">{"₹74,999"}</span>{" with ₹4,000 HDFC Instant\n          "}</div>
</div>

<div className="p-space-xs bg-surface-container rounded font-body-sm text-body-sm text-on-surface-variant">
<span className="font-semibold text-secondary">{"📉 ₹6,000 cheaper"}</span>{" than yesterday • Fits Rahul's ₹80k budget\n        "}</div>

<div className="grid grid-cols-2 gap-space-xs pt-space-xs">
<button className="h-9 px-space-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"north_east"}</span>
</button>
<button className="h-9 px-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">{"bookmark_add"}</span>
<span>{"Watch"}</span>
</button>
</div>
</div>
</div>

<div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
<div className="relative p-space-md bg-surface-container-low flex flex-col justify-between h-48 overflow-hidden">
<div className="flex items-center justify-between z-10">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n            Flipkart\n          "}</span>
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors shadow-xs">
<span className="material-symbols-outlined text-[18px]">{"favorite"}</span>
</button>
</div>
<div className="absolute inset-0 flex items-center justify-center p-space-lg">
<img className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Matte black high-performance gaming laptop with thin bezels, backlit mechanical-style keyboard, aggressive cooling vents, illuminated metallic logo, high tech sleek gaming hardware product photograph." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9Xvmhe2iQ6_M_xya5zmsjqQ1fFoeOEc1o5zjBIro9Q9kxieCD4HqelxGBkroUSkQsz2H9AfleyirRdaSCNYUnPZiZw2Hdin-rsn-CHcFPj3k7p7oKRnY-9JvSyHsHOAtjsRqM8GzCP6qN1uhpL9bSTUBfgiucgnGaB8w_IHHj3Uj0a47sHDkeZBE1jD8_UZ5-Gc8CzHhGmYSBS8c1BK8A7-mU5GBefVrcT6qcz2esH5CQHUmhhGu5Rw" />
</div>
<div className="z-10 flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>{"Synced 22m ago"}</span>
<span className="text-error font-semibold">{"⚠️ 3 left"}</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
<div>
<div className="flex flex-wrap gap-space-2xs mb-space-xs">
<span className="px-space-xs py-space-2xs rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">{"\n              📉 ₹20,000 Drop\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"\n              🔥 22% OFF\n            "}</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{"\n            ASUS TUF Gaming F15 AI Laptop\n          "}</h2>
<div className="flex items-center gap-space-xs mt-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span className="font-semibold ml-space-2xs">{"4.4"}</span>
</span>
<span>{"•"}</span>
<span className="text-outline">{"845 reviews • i7 / RTX 4060"}</span>
</div>
</div>
<div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"60D Low Mark"}</span>
<span className="font-label-md text-label-md text-secondary font-semibold">{"Best in 2 Mos"}</span>
</div>
<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 100 30">
<path d="M0 2 L25 5 L50 15 L75 14 L100 27" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
</svg>
</div>
<div className="pt-space-xs">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹69,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹89,999"}</span>
<span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-sm text-label-sm font-bold">{"\n              Save ₹20k\n            "}</span>
</div>
<div className="mt-space-2xs flex items-center gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-outline">{"calendar_today"}</span>
<span>{"No Cost EMI from "}<strong className="text-on-surface">{"₹5,833/mo"}</strong></span>
</div>
</div>
<div className="p-space-xs bg-surface-container rounded font-body-sm text-body-sm text-on-surface-variant">{"\n          Lowest recorded in 60 days • Fast DDR5 memory & 144Hz panel\n        "}</div>
<div className="grid grid-cols-2 gap-space-xs pt-space-xs">
<button className="h-9 px-space-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"north_east"}</span>
</button>
<button className="h-9 px-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">{"bookmark_add"}</span>
<span>{"Watch"}</span>
</button>
</div>
</div>
</div>

<div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
<div className="relative p-space-md bg-surface-container-low flex flex-col justify-between h-48 overflow-hidden">
<div className="flex items-center justify-between z-10">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n            Amazon Prime\n          "}</span>
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors shadow-xs">
<span className="material-symbols-outlined text-[18px]">{"favorite"}</span>
</button>
</div>
<div className="absolute inset-0 flex items-center justify-center p-space-lg">
<img className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Premium silver noise canceling over-ear headphones floating on clean minimalist backdrop, soft ambient lighting, high fidelity audio product imagery with leatherette cushions and matte metal accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsc9bcG9ebQWiFTEfM-9nj-rofE_dFr88ctpAAf2x35Yz3tG8UVVZVsD640BHVso86LDoVa-wFY3l21Rv8zsvVKg8BjVhdouLBLQ-DV_mVLoo1t30uGvKXcG7lyBeBTvd2z9hYDnfAIBc1wboMb9uT2XahtikKtRcxj0s9O5rSjgncri0aZlV6vVd-Wg5bph6yYQs8y5lrNwp6SvcP7vmbg4I4gKkPtEQW1IRPxiWA4LzJYuuM-rKI3Q" />
</div>
<div className="z-10 flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>{"Synced 8m ago"}</span>
<span className="text-secondary font-semibold">{"🟢 In Stock"}</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
<div>
<div className="flex flex-wrap gap-space-2xs mb-space-xs">
<span className="px-space-xs py-space-2xs rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"\n              🏷 30-Day Low\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-md bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">{"\n              📉 ₹7,000 Drop\n            "}</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{"\n            Sony WH-1000XM6 Wireless ANC\n          "}</h2>
<div className="flex items-center gap-space-xs mt-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span className="font-semibold ml-space-2xs">{"4.6"}</span>
</span>
<span>{"•"}</span>
<span className="text-outline">{"3,210 reviews"}</span>
</div>
</div>
<div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Steepest Drop"}</span>
<span className="font-label-md text-label-md text-secondary font-semibold">{"-20% True Delta"}</span>
</div>
<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 100 30">
<path d="M0 4 L30 4 L50 12 L70 12 L100 26" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
</svg>
</div>
<div className="pt-space-xs">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹27,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹34,999"}</span>
<span className="px-space-xs py-space-2xs rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">{"\n              20% OFF\n            "}</span>
</div>
<div className="mt-space-2xs flex items-center gap-space-2xs font-body-sm text-body-sm text-secondary">
<span className="material-symbols-outlined text-[16px]">{"credit_card"}</span>
<span className="font-semibold">{"₹25,499"}</span>{" with ICICI Card Offer\n          "}</div>
</div>
<div className="p-space-xs bg-surface-container rounded font-body-sm text-body-sm text-on-surface-variant">{"\n          ₹3,000 cheaper than yesterday • Top benchmark noise canceling\n        "}</div>
<div className="grid grid-cols-2 gap-space-xs pt-space-xs">
<button className="h-9 px-space-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"north_east"}</span>
</button>
<button className="h-9 px-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">{"bookmark_add"}</span>
<span>{"Watch"}</span>
</button>
</div>
</div>
</div>

<div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
<div className="relative p-space-md bg-surface-container-low flex flex-col justify-between h-48 overflow-hidden">
<div className="flex items-center justify-between z-10">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n            Flipkart\n          "}</span>
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors shadow-xs">
<span className="material-symbols-outlined text-[18px]">{"favorite"}</span>
</button>
</div>
<div className="absolute inset-0 flex items-center justify-center p-space-lg">
<img className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Slim bezel 55-inch 4K UHD television showing vibrant cinematic nature video on screen, placed against clean modern architectural wall, premium consumer technology product render." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm1wVsGowMLMw6XiLK44ScOizSOJS6EslqyfAn53_cgFOYRVz29nfvi6aiEqqu1KqMsrtyIOxhUf4MB8zOPsTDxTEULYm93lK7O50CY2DLbtLHkGAOxya73IgEDYmCXDiUaFC0lZpebu-RNxPhFoEoA3GuXpcUOx8yE-FrkPJCegC5WsKLWtg8MBk0NkNmOFGMm2OG79lQEe3qyl2qEXuFU1PGmWzmDQyR0n0XCPKAPEbJF5syFE_8JQ" />
</div>
<div className="z-10 flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>{"Synced 31m ago"}</span>
<span className="text-secondary font-semibold">{"🟢 In Stock"}</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
<div>
<div className="flex flex-wrap gap-space-2xs mb-space-xs">
<span className="px-space-xs py-space-2xs rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">{"\n              📉 ₹15,000 Drop\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"\n              27% OFF\n            "}</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{"\n            Samsung 55\" Crystal 4K UHD TV\n          "}</h2>
<div className="flex items-center gap-space-xs mt-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span className="font-semibold ml-space-2xs">{"4.5"}</span>
</span>
<span>{"•"}</span>
<span className="text-outline">{"4,120 reviews"}</span>
</div>
</div>
<div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Category Rank"}</span>
<span className="font-label-md text-label-md text-secondary font-semibold">{"#1 Value TV"}</span>
</div>
<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 100 30">
<path d="M0 10 L30 10 L50 20 L75 16 L100 29" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
</svg>
</div>
<div className="pt-space-xs">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹39,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹54,999"}</span>
<span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-sm text-label-sm font-bold">{"\n              Save ₹15k\n            "}</span>
</div>
<div className="mt-space-2xs flex items-center gap-space-2xs font-body-sm text-body-sm text-secondary">
<span className="material-symbols-outlined text-[16px]">{"local_shipping"}</span>
<span>{"Free Next-Day Delivery Included"}</span>
</div>
</div>
<div className="p-space-xs bg-surface-container rounded font-body-sm text-body-sm text-on-surface-variant">{"\n          Deepest price reduction in TV category this week\n        "}</div>
<div className="grid grid-cols-2 gap-space-xs pt-space-xs">
<button className="h-9 px-space-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"north_east"}</span>
</button>
<button className="h-9 px-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">{"bookmark_add"}</span>
<span>{"Watch"}</span>
</button>
</div>
</div>
</div>

<div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
<div className="relative p-space-md bg-surface-container-low flex flex-col justify-between h-48 overflow-hidden">
<div className="flex items-center justify-between z-10">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n            Flipkart\n          "}</span>
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors shadow-xs">
<span className="material-symbols-outlined text-[18px]">{"favorite"}</span>
</button>
</div>
<div className="absolute inset-0 flex items-center justify-center p-space-lg">
<img className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Slim gray gaming laptop open displaying high resolution desktop wallpaper, precision aluminum chassis, soft desk lamp glow, high-end technical design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8CpDs5eSP3JMT9ZRkVkrgOujzDTCYuO3-O7g0aQfDb7PlP2hq5LA6wUgjTQ1DsB1DtQIA1LaZGsrRqG8eOIVuvHe0O_mDg4_FB3FJysW3q_0walUhP8fYQb7qlUYDwAe1a6oU-rL9XrN-FTLx3tXUnkza-t-6RTaumDUCFUJEP5QNOfTM8uHDGd8i6T2SHiBfLo0rP_twxOxmOeK2TDbE488hCJ1xtiGFzBfwZTtldnD2DbPRQMfm_A" />
</div>
<div className="z-10 flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>{"Synced 40m ago"}</span>
<span className="text-secondary font-semibold">{"🟢 In Stock"}</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
<div>
<div className="flex flex-wrap gap-space-2xs mb-space-xs">
<span className="px-space-xs py-space-2xs rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">{"\n              📉 ₹15,000 Drop\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"\n              19% OFF\n            "}</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{"\n            Lenovo Legion Slim 5 (Ryzen 7)\n          "}</h2>
<div className="flex items-center gap-space-xs mt-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span className="font-semibold ml-space-2xs">{"4.3"}</span>
</span>
<span>{"•"}</span>
<span className="text-outline">{"612 reviews • RTX 4060"}</span>
</div>
</div>
<div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Price Trend"}</span>
<span className="font-label-md text-label-md text-secondary font-semibold">{"Downward Sharp"}</span>
</div>
<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 100 30">
<path d="M0 5 L35 8 L60 15 L75 18 L100 27" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
</svg>
</div>
<div className="pt-space-xs">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹64,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹79,999"}</span>
<span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-sm text-label-sm font-bold">{"\n              Save ₹15,000\n            "}</span>
</div>
<div className="mt-space-2xs flex items-center gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-outline">{"tune"}</span>
<span>{"Ryzen 7 7840HS • 16GB • 512GB SSD"}</span>
</div>
</div>
<div className="p-space-xs bg-surface-container rounded font-body-sm text-body-sm text-on-surface-variant">{"\n          Heavy thermal headroom • 100% sRGB display calibrated\n        "}</div>
<div className="grid grid-cols-2 gap-space-xs pt-space-xs">
<button className="h-9 px-space-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"north_east"}</span>
</button>
<button className="h-9 px-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">{"bookmark_add"}</span>
<span>{"Watch"}</span>
</button>
</div>
</div>
</div>

<div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
<div className="relative p-space-md bg-surface-container-low flex flex-col justify-between h-48 overflow-hidden">
<div className="flex items-center justify-between z-10">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n            Flipkart & Croma\n          "}</span>
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors shadow-xs">
<span className="material-symbols-outlined text-[18px]">{"favorite"}</span>
</button>
</div>
<div className="absolute inset-0 flex items-center justify-center p-space-lg">
<img className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Ultra-thin Apple MacBook Air in deep Midnight finish resting slightly open on minimalist studio surface, crisp clean reflections, elegant high resolution technology render." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQn3xc-bOuZagF8sYJ1nnHv_Zq5TyQhvkMGX6hBWN_FoBbrp_H4V8B6_UnDmUtglCOpqUnSmXSi7f6uWUO2HQHd1yef-dMHARaw6CG7pXUK9ojIraIDM_I7uA6lvBr7TUJHm060y8jSURKiueQCXKSfj1PgjQ6JPXEe0WMwrdDcn_Wf0G-hVNDORtWJMBbpD4W6_bX3NAYNoVKamRQsnc9dAz23OCZf4tgDUNiwCKsQJxD_fhGZeUFVg" />
</div>
<div className="z-10 flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>{"Synced 18m ago"}</span>
<span className="text-secondary font-semibold">{"🟢 In Stock"}</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
<div>
<div className="flex flex-wrap gap-space-2xs mb-space-xs">
<span className="px-space-xs py-space-2xs rounded-md bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">{"\n              📉 ₹9,000 Drop\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"\n              16% OFF\n            "}</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{"\n            Apple MacBook Air M3 (16GB)\n          "}</h2>
<div className="flex items-center gap-space-xs mt-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span className="font-semibold ml-space-2xs">{"4.8"}</span>
</span>
<span>{"•"}</span>
<span className="text-outline">{"980 reviews • Midnight"}</span>
</div>
</div>
<div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Stability Score"}</span>
<span className="font-label-md text-label-md text-primary font-semibold">{"9.4/10 High"}</span>
</div>
<svg className="w-20 h-6 text-primary" fill="none" viewBox="0 0 100 30">
<path d="M0 10 L25 10 L45 10 L70 18 L100 25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
</svg>
</div>
<div className="pt-space-xs">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹96,900"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹1,14,900"}</span>
<span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-sm text-label-sm font-bold">{"\n              Save ₹18k\n            "}</span>
</div>
<div className="mt-space-2xs flex items-center gap-space-2xs font-body-sm text-body-sm text-secondary">
<span className="material-symbols-outlined text-[16px]">{"account_balance_wallet"}</span>
<span className="font-semibold">{"₹91,900"}</span>{" with SBI Cashback\n          "}</div>
</div>
<div className="p-space-xs bg-surface-container rounded font-body-sm text-body-sm text-on-surface-variant">{"\n          18hr battery longevity • Dual external display support\n        "}</div>
<div className="grid grid-cols-2 gap-space-xs pt-space-xs">
<button className="h-9 px-space-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"north_east"}</span>
</button>
<button className="h-9 px-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">{"bookmark_add"}</span>
<span>{"Watch"}</span>
</button>
</div>
</div>
</div>

<div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
<div className="relative p-space-md bg-surface-container-low flex flex-col justify-between h-48 overflow-hidden">
<div className="flex items-center justify-between z-10">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n            Flipkart\n          "}</span>
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors shadow-xs">
<span className="material-symbols-outlined text-[18px]">{"favorite"}</span>
</button>
</div>
<div className="absolute inset-0 flex items-center justify-center p-space-lg">
<img className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Modern platinum silver front-load smart washing machine with digital dial and black glass door, studio lit, hyper-realistic home appliance catalog photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCobPVt-nHiUFJu_t3LY-qjML6CIY1xLZyz-COZRvg4j-1fiiewfk_3CZBus7aeddRHascM-wdZKBxGI4WdDhnrtYFNhATdDniGzgu958QG8urzXf02VLSpyNDeEpZLrCNYm35GuLdesAP0kts_9y56N5SNrqQdXIbc0-BlYZLaH-8TjYQlC9ZGjWs6_vw_etI4Rd1WyhkJJt7CUuKD_ZfWkt1QfIRNw63PaQzaOkVR0FeLaHnkeJCRcQ" />
</div>
<div className="z-10 flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>{"Synced 45m ago"}</span>
<span className="text-secondary font-semibold">{"🟢 In Stock"}</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
<div>
<div className="flex flex-wrap gap-space-2xs mb-space-xs">
<span className="px-space-xs py-space-2xs rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"\n              📉 ₹8,500 Drop\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">{"\n              24% OFF\n            "}</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{"\n            LG 8kg 5-Star AI Direct Drive\n          "}</h2>
<div className="flex items-center gap-space-xs mt-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span className="font-semibold ml-space-2xs">{"4.4"}</span>
</span>
<span>{"•"}</span>
<span className="text-outline">{"1,540 reviews"}</span>
</div>
</div>
<div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Energy Index"}</span>
<span className="font-label-md text-label-md text-secondary font-semibold">{"5-Star Verified"}</span>
</div>
<svg className="w-20 h-6 text-secondary" fill="none" viewBox="0 0 100 30">
<path d="M0 6 L30 10 L55 12 L75 22 L100 28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
</svg>
</div>
<div className="pt-space-xs">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹34,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹45,990"}</span>
<span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-sm text-label-sm font-bold">{"\n              Save ₹11k\n            "}</span>
</div>
<div className="mt-space-2xs flex items-center gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-outline">{"verified"}</span>
<span>{"AI DD™ steam allergy care cycle"}</span>
</div>
</div>
<div className="p-space-xs bg-surface-container rounded font-body-sm text-body-sm text-on-surface-variant">{"\n          Lowest pricing since Festive Diwali Clearance\n        "}</div>
<div className="grid grid-cols-2 gap-space-xs pt-space-xs">
<button className="h-9 px-space-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"north_east"}</span>
</button>
<button className="h-9 px-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">{"bookmark_add"}</span>
<span>{"Watch"}</span>
</button>
</div>
</div>
</div>

<div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
<div className="relative p-space-md bg-surface-container-low flex flex-col justify-between h-48 overflow-hidden">
<div className="flex items-center justify-between z-10">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"\n            Flipkart\n          "}</span>
<button className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-outline hover:text-error transition-colors shadow-xs">
<span className="material-symbols-outlined text-[18px]">{"favorite"}</span>
</button>
</div>
<div className="absolute inset-0 flex items-center justify-center p-space-lg">
<img className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" data-alt="PlayStation 5 Slim console vertical with wireless DualSense controller sitting next to it, modern minimal studio lighting with subtle blue highlights, crisp product photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBInYo3zXsX-OjlfuRmeR3G-BR7sanKfE8RtXRg2RsuUlNkLKtKXbGkvhKiSknSSpg1ObCjDRPAsQmurcLM5oswiRLVrpIiKlPUmpfmplujTKTlCA39rWqiC_eOgAkEszRidSZilOlQZ3AH4iDg_ntNQYzsbaxoy6K8uNoZ8ICtzuLpcEmat9-cLqW8msAvSnLuuKbOdjaBg6M6KWBmeuSjej4GDhSlB3j-K9PF3_uFlUvDpsc19UfGfw" />
</div>
<div className="z-10 flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>{"Synced 52m ago"}</span>
<span className="text-secondary font-semibold">{"🟢 In Stock"}</span>
</div>
</div>
<div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
<div>
<div className="flex flex-wrap gap-space-2xs mb-space-xs">
<span className="px-space-xs py-space-2xs rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"\n              🏷 Lowest in 90 Days\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">{"\n              📉 ₹5,000 Drop\n            "}</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{"\n            PlayStation 5 Slim Digital + Extra Pad\n          "}</h2>
<div className="flex items-center gap-space-xs mt-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center text-tertiary">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span className="font-semibold ml-space-2xs">{"4.7"}</span>
</span>
<span>{"•"}</span>
<span className="text-outline">{"2,180 reviews"}</span>
</div>
</div>
<div className="bg-surface-container-low p-space-xs rounded-lg flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Stock Velocity"}</span>
<span className="font-label-md text-label-md text-tertiary font-semibold">{"High Demand"}</span>
</div>
<svg className="w-20 h-6 text-tertiary" fill="none" viewBox="0 0 100 30">
<path d="M0 8 L25 8 L45 15 L70 12 L100 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
</svg>
</div>
<div className="pt-space-xs">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-card text-price-card text-on-surface">{"₹39,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹44,990"}</span>
<span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-sm text-label-sm font-bold">{"\n              11% OFF\n            "}</span>
</div>
<div className="mt-space-2xs flex items-center gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-outline">{"sports_esports"}</span>
<span>{"Includes 1TB SSD & 2x DualSense"}</span>
</div>
</div>
<div className="p-space-xs bg-surface-container rounded font-body-sm text-body-sm text-on-surface-variant">{"\n          Matches lowest recorded retail bundle price\n        "}</div>
<div className="grid grid-cols-2 gap-space-xs pt-space-xs">
<button className="h-9 px-space-xs bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"north_east"}</span>
</button>
<button className="h-9 px-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-2xs">
<span className="material-symbols-outlined text-[16px]">{"bookmark_add"}</span>
<span>{"Watch"}</span>
</button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm mb-space-lg flex flex-col lg:flex-row items-center justify-between gap-space-lg">
<div className="flex items-start gap-space-md max-w-4xl">
<div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[28px]">{"verified_user"}</span>
</div>
<div className="flex flex-col gap-space-2xs">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface">{"Why is SARATHI different?"}</span>
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-outline font-label-sm text-label-sm font-semibold">{"\n            Anti-Markup Shield\n          "}</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">{"\n          We don't just pull Flipkart listings. We monitor price deltas across 90-day historic traces, cross-compare retailer SKUs, and mathematically verify if a 20% discount is real or marked up prior to sale events. Every badge shown represents an audited economic saving.\n        "}</p>
</div>
</div>

<div className="flex items-center gap-space-md shrink-0 bg-surface-container-low px-space-md py-space-sm rounded-lg">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Fake Discounts Filtered"}</span>
<span className="font-price-card text-price-card text-error font-bold">{"142 deals"}</span>
</div>
<div className="h-8 w-px bg-outline-variant"></div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">{"Verified Real Deals"}</span>
<span className="font-price-card text-price-card text-secondary font-bold">{"482 deals"}</span>
</div>
</div>
</div>

<div className="flex flex-col sm:flex-row items-center justify-between pb-space-2xl gap-space-md font-body-sm text-body-sm text-on-surface-variant">
<div className="flex items-center gap-space-xs">
<span>{"Showing "}<strong className="text-on-surface font-semibold">{"1 – 8"}</strong>{" of 482 algorithmic opportunities"}</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-sm py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-outline disabled:opacity-40 transition-colors flex items-center" disabled="">
<span className="material-symbols-outlined text-[18px]">{"chevron_left"}</span>
<span>{"Previous"}</span>
</button>
<div className="flex items-center gap-space-2xs">
<button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold">{"1"}</button>
<button className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors">{"2"}</button>
<button className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors">{"3"}</button>
<span className="px-space-2xs text-outline">{"..."}</span>
<button className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors">{"61"}</button>
</div>
<button className="px-space-sm py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors flex items-center">
<span>{"Next"}</span>
<span className="material-symbols-outlined text-[18px]">{"chevron_right"}</span>
</button>
</div>
</div>
</div></main></div>);
}
