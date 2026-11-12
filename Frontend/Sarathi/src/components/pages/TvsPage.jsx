import React from 'react';
// Source: Pasted text (8).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function TvsPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">

<section className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-xl mb-space-lg shadow-sm">
<div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div className="max-w-3xl">
<div className="flex items-center gap-space-xs mb-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase tracking-wider">{"Display Intelligence Node"}</span>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="text-secondary font-label-sm text-label-sm flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>{" Live Web Scraping (12 Retailers)\n          "}</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Smart TVs & Home Entertainment Deal Intelligence"}</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs max-w-2xl">{"\n          Automated price parity and panel technology tracker across 4K UHD, OLED, QLED, and Mini-LED displays.\n        "}</p>
</div>
<div className="flex items-center gap-space-sm shrink-0">
<button className="h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container transition-all flex items-center gap-space-xs">
<span className="material-symbols-outlined text-outline text-[18px]">{"tune"}</span>{"\n          Display Metric Analyzer\n        "}</button>
<button className="h-10 px-space-md rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-all flex items-center gap-space-xs">
<span className="material-symbols-outlined text-on-primary text-[18px]">{"notifications_active"}</span>{"\n          Set Panel Price Alert\n        "}</button>
</div>
</div>
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase text-outline">{"TV Models Monitored"}</span>
<span className="font-price-hero text-price-hero text-on-surface mt-space-2xs">{"940"}</span>
</div>
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined">{"tv"}</span>
</div>
</div>
<div className="flex items-center justify-between mt-space-md pt-space-xs">
<span className="font-label-sm text-label-sm text-secondary flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[14px]">{"sensors"}</span>{"\n          Active SKUs Real-time\n        "}</span>
<span className="font-body-sm text-body-sm text-outline">{"98.8% in stock"}</span>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase text-outline">{"Average Price Drop"}</span>
<span className="font-price-hero text-price-hero text-secondary mt-space-2xs">{"26.4%"}</span>
</div>
<div className="w-10 h-10 rounded-lg bg-secondary-container/50 flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined">{"trending_down"}</span>
</div>
</div>
<div className="flex items-center justify-between mt-space-md pt-space-xs">
<span className="font-label-sm text-label-sm text-on-secondary-fixed-variant font-medium">{"Festive Clearance"}</span>
<span className="font-body-sm text-body-sm text-outline">{"vs 60-day baseline"}</span>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase text-outline">{"In Rahul's Budget (<₹45k)"}</span>
<div className="flex items-baseline gap-space-xs mt-space-2xs">
<span className="font-price-hero text-price-hero text-primary">{"18"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Matches"}</span>
</div>
</div>
<div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
<span className="material-symbols-outlined">{"account_balance_wallet"}</span>
</div>
</div>
<div className="flex items-center justify-between mt-space-md pt-space-xs">
<span className="font-label-sm text-label-sm text-primary font-medium">{"Recommended 55\" 4K Smart TVs"}</span>
<span className="font-body-sm text-body-sm text-outline">{"₹80k Max Pool"}</span>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase text-outline">{"Best Value Record"}</span>
<span className="font-price-hero text-price-hero text-on-surface mt-space-2xs">{"₹39,999"}</span>
</div>
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">{"verified"}</span>
</div>
</div>
<div className="flex items-center justify-between mt-space-md pt-space-xs">
<span className="font-label-sm text-label-sm text-on-surface truncate pr-2 font-medium">{"Samsung 55\" Crystal 4K UHD"}</span>
<span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-space-xs py-space-2xs rounded-full">{"New Low"}</span>
</div>
</div>
</section>

<section className="rounded-xl bg-surface-container-lowest p-space-md mb-space-lg shadow-sm">
<div className="flex flex-col gap-space-md">

<div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-xs">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-outline text-[20px]">{"tune"}</span>
<span className="font-headline-sm text-headline-sm text-on-surface">{"Precision Filters"}</span>
<span className="font-label-sm text-label-sm text-outline ml-space-xs">{"9 Active Filters Applied"}</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="font-label-sm text-label-sm text-primary hover:text-primary-container px-space-sm py-space-2xs">{"Reset All"}</button>
<button className="font-label-sm text-label-sm text-on-surface bg-surface-container-high px-space-sm py-space-2xs rounded-md flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-[14px]">{"save"}</span>{" Save Config\n          "}</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-space-md text-on-surface">

<div className="flex flex-col gap-space-2xs">
<label className="font-label-sm text-label-sm uppercase text-outline">{"Screen Size"}</label>
<div className="flex flex-wrap gap-space-2xs">
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"43\""}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"50\""}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-primary text-on-primary font-medium flex items-center gap-space-2xs">{"\n              55\"\n              "}<span className="text-[9px] bg-primary-container text-on-primary-container px-1 rounded-full">{"Hot"}</span>
</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"65\""}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"75\"+"}</button>
</div>
</div>

<div className="flex flex-col gap-space-2xs">
<label className="font-label-sm text-label-sm uppercase text-outline">{"Display Technology"}</label>
<div className="flex flex-wrap gap-space-2xs">
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"OLED"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"QD-OLED"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"QLED"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"Mini-LED"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container-high text-on-surface font-medium">{"Crystal 4K"}</button>
</div>
</div>

<div className="flex flex-col gap-space-2xs">
<label className="font-label-sm text-label-sm uppercase text-outline">{"Gaming & Refresh"}</label>
<div className="flex flex-wrap gap-space-2xs">
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"60Hz"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"120Hz"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container-high font-medium">{"144Hz VRR"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"ALLM"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"HDMI 2.1"}</button>
</div>
</div>

<div className="flex flex-col gap-space-2xs">
<label className="font-label-sm text-label-sm uppercase text-outline">{"Operating System"}</label>
<div className="flex flex-wrap gap-space-2xs">
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-primary text-on-primary font-medium">{"Google TV"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"LG webOS"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"Samsung Tizen"}</button>
</div>
</div>

<div className="flex flex-col gap-space-2xs">
<label className="font-label-sm text-label-sm uppercase text-outline">{"Audio Architecture"}</label>
<div className="flex flex-wrap gap-space-2xs">
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"Dolby Atmos"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"20W"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"30W+"}</button>
<button className="px-space-xs py-space-2xs rounded text-body-sm font-body-sm bg-surface-container hover:bg-surface-container-high">{"Subwoofer"}</button>
</div>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg mb-space-2xl">

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all group">
<div>

<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[13px]">{"verified"}</span>{" 30-Day Lowest Floor\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">{"Flipkart"}</span>
</div>
<button className="text-outline hover:text-primary transition-colors" title="Bookmark / Watch">
<span className="material-symbols-outlined text-[20px]">{"bookmark_border"}</span>
</button>
</div>

<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A sleek modern 55-inch Samsung Crystal 4K Smart TV mounted on a minimalist concrete wall in a high-end contemporary living room. Vibrant visual content on screen showcasing cinematic depth with rich colors, subtle lighting, and hyper-clean studio aesthetics matching modern SaaS blue and emerald tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo9Dd5eVqEf_7oGc-ENSBGwHmYVoHuT8m7UDXsyXV1bWZhNtVJ4BanaCylv63-wgmg3p6Me26YJGPvtHZxYtDkkYIuXCXHRk3fGd1oH-EvFLI5sfhnUL-KiKsQjrOw66alumibXvVskFgFY6Ae3gGhRNM58akDlcG8Z9rOXd35UGRgrBeIlCk6DDoXuw0k7_FEBp5C4pjSkgj2re2gVU63OMLwsOQbrISHgMEMiPzUc9neM5NfqkL-vQ" />
<div className="absolute bottom-2 left-2 flex gap-1">
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"Crystal 4K UHD"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"60 Hz"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"Tizen OS"}</span>
</div>
</div>

<div className="flex items-center gap-space-2xs mb-space-2xs">
<div className="flex text-tertiary-container items-center">
<span className="material-symbols-outlined text-[16px] text-tertiary">{"star"}</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">{"4.5"}</span>
</div>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-body-sm text-body-sm text-outline">{"UA55DU7700"}</span>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-label-sm text-label-sm text-secondary font-medium">{"In Budget (<₹45k)"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1 group-hover:text-primary transition-colors">{"\n          Samsung 55\" Crystal 4K UHD Smart TV\n        "}</h3>

<div className="flex items-center gap-space-sm py-space-xs my-space-xs bg-surface-container-low px-space-sm rounded-lg">
<div className="flex flex-col">
<span className="text-outline font-label-sm text-label-sm">{"30D Price Trend"}</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Drop -₹4,500"}</span>
</div>
<div className="flex-1 h-6 flex items-center justify-end">
<svg className="w-24 h-5 overflow-visible text-secondary" fill="none" viewBox="0 0 100 20">
<path d="M0,8 L20,9 L40,6 L60,14 L80,11 L100,18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
</svg>
</div>
</div>

<div className="flex flex-col gap-space-2xs mb-space-md">
<div className="flex items-center gap-space-2xs text-secondary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"credit_card"}</span>
<span>{"ICICI Card: ₹3,000 Instant Off"}</span>
</div>
<div className="flex items-center gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"swap_horizontal_circle"}</span>
<span>{"Exchange Bonus: Up to ₹3,500 verified"}</span>
</div>
</div>
</div>

<div className="pt-space-sm bg-surface-container-lowest">
<div className="flex items-baseline justify-between mb-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface">{"₹39,999"}</span>
<span className="font-price-mrp text-price-mrp line-through text-outline">{"₹54,999"}</span>
</div>
<div className="flex items-center gap-space-2xs">
<span className="font-label-sm text-label-sm font-semibold text-secondary bg-secondary-container/30 px-space-xs py-space-2xs rounded">{"27% OFF"}</span>
<span className="font-label-sm text-label-sm text-outline">{"Save ₹15,000"}</span>
</div>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<button className="h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[18px]">{"query_stats"}</span>{" Analyze\n          "}</button>
<a className="h-10 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm" href="#">{"\n            Buy on Flipkart "}<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
</div>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all group">
<div>
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[13px]">{"military_tech"}</span>{" All-Time Lowest\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">{"Croma"}</span>
</div>
<button className="text-outline hover:text-primary transition-colors" title="Bookmark / Watch">
<span className="material-symbols-outlined text-[20px]">{"bookmark_border"}</span>
</button>
</div>
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="An ultra-premium LG evo OLED C4 4K display in a dark cinematic home theater room with infinite deep blacks and bright neon contrast. Gaming graphics displaying ray tracing and high refresh action on the panel, sleek edge-to-edge bezel, warm diffused ambient backlighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPeFUOa_POQOvNy-u0kjjwEF4GLhOx1-ZMi9uKCAoYGi0gjO6_kWY0TLUJBWTfrjd2PAICtcJHcmcumZ7mQt14BH5ZBIfLZbYOpZuAsbtPfzORRJkcvi3nI3_iuyVelSumhu_s1kMrsM5KkHnS_TBAx678kxRjjaSIycZs19X5trGxK0YBdpf_ncSV07GI1nuB9MdGuB-YktCFTToDGvxL0LybR32SZdyShrdpcwTlQVR69ngsInzZMA" />
<div className="absolute bottom-2 left-2 flex gap-1">
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"OLED evo"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"144Hz VRR"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"α9 Gen7"}</span>
</div>
</div>
<div className="flex items-center gap-space-2xs mb-space-2xs">
<div className="flex text-tertiary-container items-center">
<span className="material-symbols-outlined text-[16px] text-tertiary">{"star"}</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">{"4.8"}</span>
</div>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-body-sm text-body-sm text-outline">{"OLED55C4PSA"}</span>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-label-sm text-label-sm text-primary font-medium">{"Dolby Vision IQ"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1 group-hover:text-primary transition-colors">{"\n          LG 55\" evo OLED C4 4K Gaming TV\n        "}</h3>

<div className="flex items-center gap-space-sm py-space-xs my-space-xs bg-surface-container-low px-space-sm rounded-lg">
<div className="flex flex-col">
<span className="text-outline font-label-sm text-label-sm">{"30D Price Trend"}</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Drop -₹12,000"}</span>
</div>
<div className="flex-1 h-6 flex items-center justify-end">
<svg className="w-24 h-5 overflow-visible text-secondary" fill="none" viewBox="0 0 100 20">
<path d="M0,5 L25,5 L45,10 L70,9 L85,16 L100,19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
</svg>
</div>
</div>
<div className="flex flex-col gap-space-2xs mb-space-md">
<div className="flex items-center gap-space-2xs text-secondary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"credit_card"}</span>
<span>{"HDFC Bank: ₹6,000 Instant Off"}</span>
</div>
<div className="flex items-center gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"swap_horizontal_circle"}</span>
<span>{"Exchange Bonus: Up to ₹3,500 verified"}</span>
</div>
</div>
</div>
<div className="pt-space-sm bg-surface-container-lowest">
<div className="flex items-baseline justify-between mb-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface">{"₹1,18,990"}</span>
<span className="font-price-mrp text-price-mrp line-through text-outline">{"₹1,44,990"}</span>
</div>
<div className="flex items-center gap-space-2xs">
<span className="font-label-sm text-label-sm font-semibold text-secondary bg-secondary-container/30 px-space-xs py-space-2xs rounded">{"18% OFF"}</span>
<span className="font-label-sm text-label-sm text-outline">{"Save ₹26,000"}</span>
</div>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<button className="h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[18px]">{"query_stats"}</span>{" Analyze\n          "}</button>
<a className="h-10 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm" href="#">{"\n            Buy on Croma "}<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
</div>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all group">
<div>
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[13px]">{"award_star"}</span>{" Popular Flagship\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">{"Amazon India"}</span>
</div>
<button className="text-outline hover:text-primary transition-colors" title="Bookmark / Watch">
<span className="material-symbols-outlined text-[20px]">{"bookmark_border"}</span>
</button>
</div>
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Sony BRAVIA 55-inch television operating in an upscale sunlit living room with natural colors and balanced contrast. Detailed nature documentary frame running on the panel, elegant industrial stands, sleek matte frame finish, clean modern tech layout." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_SFiJbsR-gULYuAJScjJMF1nL1kV6xLfqOMYD69zyjHUCEEwSRnGxCN18MKAwgz62yloSa8PjKgcOfJpEt8IJz7iuD_LYsDEtkIAsA7nPKCYk2VEjIsQDDSxKG8F7mg_pSutW7OHjgirTuSr_uMcRch5ZzZSzdq9DEMnp0KOW7PRinSFVRIBqxunr0R6z1gFfT_pS-6z_GeA-OlayRXYl_nMPNtr5iLZQAzs64-7f12h59ZbynRjtbA" />
<div className="absolute bottom-2 left-2 flex gap-1">
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"X1 4K Processor"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"Dolby Audio"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"Google TV"}</span>
</div>
</div>
<div className="flex items-center gap-space-2xs mb-space-2xs">
<div className="flex text-tertiary-container items-center">
<span className="material-symbols-outlined text-[16px] text-tertiary">{"star"}</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">{"4.6"}</span>
</div>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-body-sm text-body-sm text-outline">{"KD-55X74L"}</span>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-label-sm text-label-sm text-outline">{"Motionflow XR"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1 group-hover:text-primary transition-colors">{"\n          Sony BRAVIA 55\" 4K Google TV\n        "}</h3>

<div className="flex items-center gap-space-sm py-space-xs my-space-xs bg-surface-container-low px-space-sm rounded-lg">
<div className="flex flex-col">
<span className="text-outline font-label-sm text-label-sm">{"30D Price Trend"}</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Drop -₹3,900"}</span>
</div>
<div className="flex-1 h-6 flex items-center justify-end">
<svg className="w-24 h-5 overflow-visible text-secondary" fill="none" viewBox="0 0 100 20">
<path d="M0,10 L30,12 L50,8 L70,9 L90,14 L100,16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
</svg>
</div>
</div>
<div className="flex flex-col gap-space-2xs mb-space-md">
<div className="flex items-center gap-space-2xs text-secondary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"credit_card"}</span>
<span>{"SBI Card: ₹2,500 Instant Discount"}</span>
</div>
<div className="flex items-center gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"swap_horizontal_circle"}</span>
<span>{"Exchange Bonus: Up to ₹3,500 verified"}</span>
</div>
</div>
</div>
<div className="pt-space-sm bg-surface-container-lowest">
<div className="flex items-baseline justify-between mb-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface">{"₹52,990"}</span>
<span className="font-price-mrp text-price-mrp line-through text-outline">{"₹69,900"}</span>
</div>
<div className="flex items-center gap-space-2xs">
<span className="font-label-sm text-label-sm font-semibold text-secondary bg-secondary-container/30 px-space-xs py-space-2xs rounded">{"24% OFF"}</span>
<span className="font-label-sm text-label-sm text-outline">{"Save ₹16,910"}</span>
</div>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<button className="h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[18px]">{"query_stats"}</span>{" Analyze\n          "}</button>
<a className="h-10 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm" href="#">{"\n            Buy on Amazon "}<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
</div>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all group">
<div>
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[13px]">{"bolt"}</span>{" High Spec Deal\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">{"Flipkart"}</span>
</div>
<button className="text-outline hover:text-primary transition-colors" title="Bookmark / Watch">
<span className="material-symbols-outlined text-[20px]">{"bookmark_border"}</span>
</button>
</div>
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="TCL QD-Mini LED 55-inch television showcasing extreme 1300 nits peak brightness and local dimming matrix in a modern studio environment. High dynamic range visuals with deep shadows and hyper-bright highlights, metallic bezel, contemporary stand setup." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzIbxqysLFrYJG07aJ3v5Cobb1z4OafnBKzc4bJEy3n7C1bG6abaYTQ-_LLmci1P5vwBfuSuQLG-xhl6qGhtfp696SNNgp0kJb471jzLSBxzdp6DV79q_pVpTcfCpxlNcmeJLC9nH_m3hUt53kyIqESom-6-U4W39FgR0aB6Rk7YWqdZlPDh5PyWvOjJoAGEajaqEQccDD940JgCTnW1Q21j8wYk2_y8W8BZwfm1nJV13H-gWpsS-7WQ" />
<div className="absolute bottom-2 left-2 flex gap-1">
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"QD-Mini LED"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"144Hz VRR"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"1300 Nits"}</span>
</div>
</div>
<div className="flex items-center gap-space-2xs mb-space-2xs">
<div className="flex text-tertiary-container items-center">
<span className="material-symbols-outlined text-[16px] text-tertiary">{"star"}</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">{"4.4"}</span>
</div>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-body-sm text-body-sm text-outline">{"55C755"}</span>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-label-sm text-label-sm text-primary font-medium">{"500+ Local Dimming"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1 group-hover:text-primary transition-colors">{"\n          TCL 55\" 4K QD-Mini LED Smart Google TV\n        "}</h3>

<div className="flex items-center gap-space-sm py-space-xs my-space-xs bg-surface-container-low px-space-sm rounded-lg">
<div className="flex flex-col">
<span className="text-outline font-label-sm text-label-sm">{"30D Price Trend"}</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Drop -₹6,000"}</span>
</div>
<div className="flex-1 h-6 flex items-center justify-end">
<svg className="w-24 h-5 overflow-visible text-secondary" fill="none" viewBox="0 0 100 20">
<path d="M0,6 L20,7 L45,5 L65,12 L85,10 L100,17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
</svg>
</div>
</div>
<div className="flex flex-col gap-space-2xs mb-space-md">
<div className="flex items-center gap-space-2xs text-secondary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"credit_card"}</span>
<span>{"Axis Bank: ₹2,000 Flat Off"}</span>
</div>
<div className="flex items-center gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"swap_horizontal_circle"}</span>
<span>{"Exchange Bonus: Up to ₹3,500 verified"}</span>
</div>
</div>
</div>
<div className="pt-space-sm bg-surface-container-lowest">
<div className="flex items-baseline justify-between mb-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface">{"₹47,990"}</span>
<span className="font-price-mrp text-price-mrp line-through text-outline">{"₹64,990"}</span>
</div>
<div className="flex items-center gap-space-2xs">
<span className="font-label-sm text-label-sm font-semibold text-secondary bg-secondary-container/30 px-space-xs py-space-2xs rounded">{"26% OFF"}</span>
<span className="font-label-sm text-label-sm text-outline">{"Save ₹17,000"}</span>
</div>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<button className="h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[18px]">{"query_stats"}</span>{" Analyze\n          "}</button>
<a className="h-10 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm" href="#">{"\n            Buy on Flipkart "}<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
</div>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all group">
<div>
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[13px]">{"monetization_on"}</span>{" Value King\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">{"Amazon India"}</span>
</div>
<button className="text-outline hover:text-primary transition-colors" title="Bookmark / Watch">
<span className="material-symbols-outlined text-[20px]">{"bookmark_border"}</span>
</button>
</div>
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Xiaomi 55-inch X Pro 4K television on a sleek wooden media console with Dolby Vision colorful graphics on display. Minimalist aesthetic, slim metal bezels, bright crisp visuals under clean ambient lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCldy-f7fbUVDQjuKwup5ueM-TbOKxUooDhG9XP-P7wXK2Qw1Irm2XleSSrQ-PhCiMT0kjFytqXGzUXmYfcGPN34HnOyduffDiMxMblq7aX4uJF8uNHX8zUrt5nsmRvlMBg0JaPjP0IHdLw0U2U61x3Ir3Z2sxzogEC-5vSDUClq3ks2qrc1JD1iOW79UpCQRCKKuLmrgZQ0vJ67ze6DgcVrHA5IvfpZpJKn_wZjW1W-0hNm9dkRrQ75g" />
<div className="absolute bottom-2 left-2 flex gap-1">
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"Dolby Vision IQ"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"30W Speakers"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"Google TV"}</span>
</div>
</div>
<div className="flex items-center gap-space-2xs mb-space-2xs">
<div className="flex text-tertiary-container items-center">
<span className="material-symbols-outlined text-[16px] text-tertiary">{"star"}</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">{"4.3"}</span>
</div>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-body-sm text-body-sm text-outline">{"X Pro Series"}</span>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-label-sm text-label-sm text-secondary font-medium">{"In Budget (<₹45k)"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1 group-hover:text-primary transition-colors">{"\n          Xiaomi 55\" X Pro 4K Dolby Vision TV\n        "}</h3>

<div className="flex items-center gap-space-sm py-space-xs my-space-xs bg-surface-container-low px-space-sm rounded-lg">
<div className="flex flex-col">
<span className="text-outline font-label-sm text-label-sm">{"30D Price Trend"}</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Drop -₹5,000"}</span>
</div>
<div className="flex-1 h-6 flex items-center justify-end">
<svg className="w-24 h-5 overflow-visible text-secondary" fill="none" viewBox="0 0 100 20">
<path d="M0,8 L25,9 L40,7 L60,11 L80,13 L100,18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
</svg>
</div>
</div>
<div className="flex flex-col gap-space-2xs mb-space-md">
<div className="flex items-center gap-space-2xs text-secondary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"credit_card"}</span>
<span>{"Amazon Pay ICICI: 5% Cashback"}</span>
</div>
<div className="flex items-center gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"swap_horizontal_circle"}</span>
<span>{"Exchange Bonus: Up to ₹3,000 verified"}</span>
</div>
</div>
</div>
<div className="pt-space-sm bg-surface-container-lowest">
<div className="flex items-baseline justify-between mb-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface">{"₹34,999"}</span>
<span className="font-price-mrp text-price-mrp line-through text-outline">{"₹49,999"}</span>
</div>
<div className="flex items-center gap-space-2xs">
<span className="font-label-sm text-label-sm font-semibold text-secondary bg-secondary-container/30 px-space-xs py-space-2xs rounded">{"30% OFF"}</span>
<span className="font-label-sm text-label-sm text-outline">{"Save ₹15,000"}</span>
</div>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<button className="h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[18px]">{"query_stats"}</span>{" Analyze\n          "}</button>
<a className="h-10 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm" href="#">{"\n            Buy on Amazon "}<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
</div>
</div>
</div>

<div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all group">
<div>
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[13px]">{"fullscreen"}</span>{" Big Screen Steal\n            "}</span>
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">{"Flipkart"}</span>
</div>
<button className="text-outline hover:text-primary transition-colors" title="Bookmark / Watch">
<span className="material-symbols-outlined text-[20px]">{"bookmark_border"}</span>
</button>
</div>
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A grand 65-inch Hisense Tornado QLED television in an airy loft apartment. Prominent bottom-mounted JBL acoustic speaker grille design, showing cinematic high-framerate action, balanced deep colors and rich acoustic presentation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhNjTqCgWaJs2YGRP9-jpOWnNW9Z3ESjqYVUXQPQdVXZhgtvMR9DlYmHXE5IizKqdeJOVX9q_d2haeB3RXbXy66RO_TJ_iQmuaZaLthKaCavIo7AeIWZbWK9f5Q4d7B2RWViaasYNinkhnZN-NWiepTuMuaG503KfHfrF_fvWSFWJzfbRknEqdM3p_jrBk7FS2jVbdHa1neT3TnvNQX7Z9k7ZeVa76rccOjNujy7zgvkahOjwK5BYpcw" />
<div className="absolute bottom-2 left-2 flex gap-1">
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"Quantum Dot"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"120Hz Native"}</span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-space-xs py-space-2xs rounded font-label-sm text-label-sm shadow-sm">{"102W JBL 6-Spk"}</span>
</div>
</div>
<div className="flex items-center gap-space-2xs mb-space-2xs">
<div className="flex text-tertiary-container items-center">
<span className="material-symbols-outlined text-[16px] text-tertiary">{"star"}</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">{"4.4"}</span>
</div>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-body-sm text-body-sm text-outline">{"65U7H Series"}</span>
<span className="text-outline font-label-sm text-label-sm">{"•"}</span>
<span className="font-label-sm text-label-sm text-primary font-medium">{"Subwoofer Built-in"}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1 group-hover:text-primary transition-colors">{"\n          Hisense 65\" Tornado 4K QLED TV\n        "}</h3>

<div className="flex items-center gap-space-sm py-space-xs my-space-xs bg-surface-container-low px-space-sm rounded-lg">
<div className="flex flex-col">
<span className="text-outline font-label-sm text-label-sm">{"30D Price Trend"}</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Drop -₹7,500"}</span>
</div>
<div className="flex-1 h-6 flex items-center justify-end">
<svg className="w-24 h-5 overflow-visible text-secondary" fill="none" viewBox="0 0 100 20">
<path d="M0,5 L30,5 L50,11 L75,10 L90,15 L100,19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
</svg>
</div>
</div>
<div className="flex flex-col gap-space-2xs mb-space-md">
<div className="flex items-center gap-space-2xs text-secondary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"credit_card"}</span>
<span>{"Kotak Card: ₹3,000 Instant Off"}</span>
</div>
<div className="flex items-center gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">{"swap_horizontal_circle"}</span>
<span>{"Exchange Bonus: Up to ₹3,500 verified"}</span>
</div>
</div>
</div>
<div className="pt-space-sm bg-surface-container-lowest">
<div className="flex items-baseline justify-between mb-space-sm">
<div className="flex items-baseline gap-space-xs">
<span className="font-price-hero text-price-hero text-on-surface">{"₹54,999"}</span>
<span className="font-price-mrp text-price-mrp line-through text-outline">{"₹79,999"}</span>
</div>
<div className="flex items-center gap-space-2xs">
<span className="font-label-sm text-label-sm font-semibold text-secondary bg-secondary-container/30 px-space-xs py-space-2xs rounded">{"31% OFF"}</span>
<span className="font-label-sm text-label-sm text-outline">{"Save ₹25,000"}</span>
</div>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<button className="h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[18px]">{"query_stats"}</span>{" Analyze\n          "}</button>
<a className="h-10 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors font-label-md text-label-md flex items-center justify-center gap-1 shadow-sm" href="#">{"\n            Buy on Flipkart "}<span className="material-symbols-outlined text-[16px]">{"open_in_new"}</span>
</a>
</div>
</div>
</div>
</section>

<section className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm mb-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-md">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">{"Panel Parity & Spec Benchmark"}</h2>
<p className="font-body-sm text-body-sm text-outline">{"Real-time dynamic verification across brightness, VRR support, and actual lab metrics."}</p>
</div>
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant">{"Sort by:"}</span>
<button className="px-space-sm py-space-2xs rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface">{"Best Value Ratio"}</button>
<button className="px-space-sm py-space-2xs rounded-lg bg-surface-container-low font-label-sm text-label-sm text-outline hover:text-on-surface">{"Dimming Count"}</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase">
<th className="py-space-sm px-space-md rounded-l-lg">{"Model & Screen"}</th>
<th className="py-space-sm px-space-md">{"Panel Type"}</th>
<th className="py-space-sm px-space-md">{"Peak Luminance"}</th>
<th className="py-space-sm px-space-md">{"Gaming (HDMI 2.1)"}</th>
<th className="py-space-sm px-space-md">{"Audio Rig"}</th>
<th className="py-space-sm px-space-md text-right">{"Effective Lowest"}</th>
<th className="py-space-sm px-space-md text-right rounded-r-lg">{"Action"}</th>
</tr>
</thead>
<tbody className="divide-y-0 text-body-sm font-body-sm">
<tr className="hover:bg-surface-container-low/70 transition-colors">
<td className="py-space-md px-space-md">
<div className="font-headline-sm text-headline-sm text-on-surface font-medium">{"Samsung 55\" DU7700"}</div>
<div className="text-outline font-body-sm text-body-sm">{"Crystal 4K Processor"}</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-space-2xs rounded bg-surface-container text-on-surface font-label-sm text-label-sm">{"VA Edge LED"}</span>
</td>
<td className="py-space-md px-space-md text-on-surface">{"320 Nits"}</td>
<td className="py-space-md px-space-md text-outline">{"60Hz (ALLM)"}</td>
<td className="py-space-md px-space-md text-on-surface">{"20W OTS Lite"}</td>
<td className="py-space-md px-space-md text-right font-price-card text-price-card text-secondary">{"₹36,999*"}</td>
<td className="py-space-md px-space-md text-right">
<button className="px-space-sm py-space-2xs rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container">{"Track"}</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low/70 transition-colors">
<td className="py-space-md px-space-md">
<div className="font-headline-sm text-headline-sm text-on-surface font-medium">{"LG 55\" OLED C4"}</div>
<div className="text-outline font-body-sm text-body-sm">{"Self-lit evo Subpixels"}</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-space-2xs rounded bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">{"OLED (True Black)"}</span>
</td>
<td className="py-space-md px-space-md text-on-surface">{"1000+ Nits (HDR)"}</td>
<td className="py-space-md px-space-md text-secondary font-medium">{"144Hz VRR / G-Sync (4x 2.1)"}</td>
<td className="py-space-md px-space-md text-on-surface">{"40W 2.2Ch Dolby Atmos"}</td>
<td className="py-space-md px-space-md text-right font-price-card text-price-card text-secondary">{"₹1,12,990*"}</td>
<td className="py-space-md px-space-md text-right">
<button className="px-space-sm py-space-2xs rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container">{"Track"}</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low/70 transition-colors">
<td className="py-space-md px-space-md">
<div className="font-headline-sm text-headline-sm text-on-surface font-medium">{"TCL 55\" 55C755"}</div>
<div className="text-outline font-body-sm text-body-sm">{"QD-Mini LED Matrix"}</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-space-2xs rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">{"Mini LED (512 Zones)"}</span>
</td>
<td className="py-space-md px-space-md text-on-surface">{"1300 Nits"}</td>
<td className="py-space-md px-space-md text-secondary font-medium">{"144Hz VRR / FreeSync Prem"}</td>
<td className="py-space-md px-space-md text-on-surface">{"30W 2.1 Onkyo Sub"}</td>
<td className="py-space-md px-space-md text-right font-price-card text-price-card text-secondary">{"₹45,990*"}</td>
<td className="py-space-md px-space-md text-right">
<button className="px-space-sm py-space-2xs rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container">{"Track"}</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="mt-space-sm flex justify-between items-center text-outline font-body-sm text-body-sm">
<span>{"*Effective price calculated including instant bank card discounts & standard coupons."}</span>
<span className="text-primary cursor-pointer hover:underline">{"View comprehensive 940 SKU comparison matrix →"}</span>
</div>
</section>
</div></main></div>);
}
