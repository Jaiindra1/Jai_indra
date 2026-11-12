import React from 'react';
// Source: Pasted text (11).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function NotificationsPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-xl">
<div className="flex flex-col gap-space-2xs">
<nav className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider">
<a className="hover:text-primary transition-colors" href="#">{"Dashboard"}</a>
<span>{"/"}</span>
<a className="hover:text-primary transition-colors" href="#">{"Tools & Intelligence"}</a>
<span>{"/"}</span>
<span className="text-on-surface font-semibold">{"Notifications"}</span>
</nav>
<div className="flex items-center gap-space-sm mt-space-2xs">
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Deal Alerts & Trigger History"}</h1>
<span className="px-space-xs py-space-2xs bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full flex items-center gap-space-2xs">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>{" Live Engine\n        "}</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">{"\n        Automated real-time notifications for target price breaks, instant bank offer changes, and stock replenishment across monitored marketplaces.\n      "}</p>
</div>
<div className="flex items-center gap-space-sm self-start md:self-auto shrink-0">
<button className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:bg-surface-container transition-all" id="markAllBtn">
<span className="material-symbols-outlined text-outline">{"done_all"}</span>
<span>{"Mark All as Read"}</span>
</button>
<button className="flex items-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary-container transition-all">
<span className="material-symbols-outlined">{"tune"}</span>
<span>{"Configure Alert Channels"}</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">

<div className="relative overflow-hidden bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="p-space-xs bg-secondary-container text-on-secondary-container rounded-lg">
<span className="material-symbols-outlined">{"price_check"}</span>
</span>
<span className="px-space-xs py-space-2xs bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full">{"High Urgency"}</span>
</div>
<div>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-on-surface font-bold">{"5"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"Triggers Today"}</span>
</div>
<div className="font-label-md text-label-md text-on-surface font-semibold mt-space-2xs">{"Target Price Alerts"}</div>
<p className="font-body-sm text-body-sm text-outline mt-space-2xs">{"Below user-configured buy ceiling"}</p>
</div>
<div className="w-full bg-surface-container-high h-1 rounded-full mt-space-md overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{"width": "82%"}}></div>
</div>
</div>

<div className="relative overflow-hidden bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="p-space-xs bg-surface-variant text-primary rounded-lg">
<span className="material-symbols-outlined">{"credit_card"}</span>
</span>
<span className="px-space-xs py-space-2xs bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-full">{"New Stacks"}</span>
</div>
<div>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-on-surface font-bold">{"4"}</span>
<span className="font-body-sm text-body-sm text-primary font-medium">{"Live Combinations"}</span>
</div>
<div className="font-label-md text-label-md text-on-surface font-semibold mt-space-2xs">{"Bank Discount Changes"}</div>
<p className="font-body-sm text-body-sm text-outline mt-space-2xs">{"HDFC, ICICI & Axis Instant Rebates"}</p>
</div>
<div className="w-full bg-surface-container-high h-1 rounded-full mt-space-md overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width": "65%"}}></div>
</div>
</div>

<div className="relative overflow-hidden bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="p-space-xs bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-lg">
<span className="material-symbols-outlined">{"inventory_2"}</span>
</span>
<span className="px-space-xs py-space-2xs bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm rounded-full">{"Scarcity Alert"}</span>
</div>
<div>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-on-surface font-bold">{"3"}</span>
<span className="font-body-sm text-body-sm text-tertiary font-medium">{"Items In Stock"}</span>
</div>
<div className="font-label-md text-label-md text-on-surface font-semibold mt-space-2xs">{"Monitored Stock Alerts"}</div>
<p className="font-body-sm text-body-sm text-outline mt-space-2xs">{"PS5 & GPUs inventory restored"}</p>
</div>
<div className="w-full bg-surface-container-high h-1 rounded-full mt-space-md overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{"width": "40%"}}></div>
</div>
</div>

<div className="relative overflow-hidden bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="p-space-xs bg-surface-container text-on-surface-variant rounded-lg">
<span className="material-symbols-outlined">{"send_to_mobile"}</span>
</span>
<div className="flex items-center gap-space-2xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">{"Active Sync"}</span>
</div>
</div>
<div>
<div className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">{"WhatsApp + Push"}</div>
<div className="font-label-md text-label-md text-on-surface-variant mt-space-2xs">{"+91 98•••• 4201"}</div>
<p className="font-body-sm text-body-sm text-outline mt-space-2xs flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-sm">{"bolt"}</span>{" Avg. latency < 840ms\n        "}</p>
</div>
<div className="flex items-center justify-between pt-space-xs mt-space-md text-primary font-label-sm text-label-sm cursor-pointer hover:underline">
<span>{"Test Webhook Ping"}</span>
<span className="material-symbols-outlined text-sm">{"arrow_forward"}</span>
</div>
</div>
</div>

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">

<div className="flex items-center overflow-x-auto gap-space-xs p-space-2xs bg-surface-container-low rounded-xl">
<button className="filter-tab px-space-md py-space-xs font-label-md text-label-md rounded-lg bg-surface-container-lowest text-primary shadow-sm font-semibold whitespace-nowrap transition-all" data-filter="all">{"\n        All Notifications "}<span className="ml-space-2xs px-space-xs py-space-2xs bg-surface-container rounded-full text-on-surface-variant font-label-sm text-label-sm">{"18"}</span>
</button>
<button className="filter-tab px-space-md py-space-xs font-label-md text-label-md rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 whitespace-nowrap transition-all" data-filter="target">{"\n        Target Price Achieved "}<span className="ml-space-2xs px-space-xs py-space-2xs bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm font-semibold">{"5"}</span>
</button>
<button className="filter-tab px-space-md py-space-xs font-label-md text-label-md rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 whitespace-nowrap transition-all" data-filter="bank">{"\n        Bank Offer Changes "}<span className="ml-space-2xs px-space-xs py-space-2xs bg-surface-container rounded-full text-on-surface-variant font-label-sm text-label-sm">{"4"}</span>
</button>
<button className="filter-tab px-space-md py-space-xs font-label-md text-label-md rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 whitespace-nowrap transition-all" data-filter="flash">{"\n        Flash Drops "}<span className="ml-space-2xs px-space-xs py-space-2xs bg-surface-container rounded-full text-on-surface-variant font-label-sm text-label-sm">{"6"}</span>
</button>
<button className="filter-tab px-space-md py-space-xs font-label-md text-label-md rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 whitespace-nowrap transition-all" data-filter="stock">{"\n        Stock Restocked "}<span className="ml-space-2xs px-space-xs py-space-2xs bg-surface-container rounded-full text-on-surface-variant font-label-sm text-label-sm">{"3"}</span>
</button>
</div>

<div className="flex items-center gap-space-sm self-end lg:self-auto text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-space-2xs text-outline">
<span className="material-symbols-outlined text-sm">{"schedule"}</span>{" Realtime sync: 30s polling\n      "}</span>
<div className="h-4 w-px bg-outline-variant"></div>
<button className="flex items-center gap-space-2xs hover:text-primary transition-colors">
<span className="material-symbols-outlined text-sm">{"filter_list"}</span>{" Custom Rules\n      "}</button>
</div>
</div>

<div className="flex flex-col gap-space-md" id="feed-container">

<article className="feed-item bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden" data-category="target">

<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
<div className="flex items-start gap-space-md min-w-0 pl-space-xs">

<div className="relative shrink-0">
<img className="w-16 h-16 rounded-lg object-cover bg-surface-container" data-alt="High tech minimal product studio shot of an Apple iPhone 17 in titanium natural finish on a clean slate architectural surface with soft studio directional lighting and neutral premium background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoiGpovclQ51j9juXHLfUkMnGAPPIgJawoS1q6VyBeYCdJe3aBTNmbJIV8Zb7uUbAhshlZpdCtZoU2TV6e4nOPcTtPyWpuxGY-3HaR8xMYTIAEnVINWpCa2RmjXalI737GUknWAHV6exOmK6dthuG4iV5LmLjWwdLVOaO3fvDy4e8x2I8Hryq9VtfaSWdW_c6g6l2hAUD0YA-4lB_CLOlVM08Pvb0iZum1qC0QeTSziknFY3weiSo_jw" />
<span className="absolute -top-2 -right-2 p-1 bg-secondary text-on-secondary rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-xs">{"trending_down"}</span>
</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<span className="px-space-xs py-space-2xs bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full font-semibold">{"Target Price Reached"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-full font-medium">{"Flipkart"}</span>
<span className="px-space-xs py-space-2xs bg-error-container text-on-error-container font-label-sm text-label-sm rounded-full font-bold">{"Unread"}</span>
<span className="text-outline font-body-sm text-body-sm flex items-center gap-space-2xs ml-auto md:ml-0">
<span className="material-symbols-outlined text-xs">{"schedule"}</span>{" 14 mins ago\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{"\n            Apple iPhone 17 (256GB, Titanium Blue)\n          "}</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">{"\n            Current price dropped to "}<strong className="text-on-surface font-semibold">{"₹78,999"}</strong>{" on Flipkart. This is "}<span className="text-secondary font-medium">{"₹1,001 below your ₹80,000 ceiling"}</span>{". All-time lowest price recorded in monitored history.\n          "}</p>
<div className="flex items-center gap-space-md mt-space-xs text-outline font-label-sm text-label-sm">
<span>{"Previous: "}<del>{"₹82,900"}</del></span>
<span>{"Target Ceiling: ₹80,000"}</span>
<span className="text-secondary font-semibold">{"Savings: ₹3,901 (4.7%)"}</span>
</div>
</div>
</div>

<div className="flex flex-row md:flex-col lg:flex-row items-center gap-space-xs shrink-0 w-full md:w-auto pt-space-sm md:pt-0">
<a className="flex-1 md:flex-initial flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-colors whitespace-nowrap shadow-sm" href="#">
<span>{"Buy on Flipkart @ ₹78,999"}</span>
<span className="material-symbols-outlined text-sm">{"open_in_new"}</span>
</a>
<button className="px-space-md py-space-xs bg-surface-container text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          View Breakdown\n        "}</button>
</div>
</article>

<article className="feed-item bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden" data-category="bank">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
<div className="flex items-start gap-space-md min-w-0 pl-space-xs">
<div className="relative shrink-0">
<div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-2xl">{"account_balance"}</span>
</div>
<span className="absolute -top-2 -right-2 p-1 bg-primary text-on-primary rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-xs">{"savings"}</span>
</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<span className="px-space-xs py-space-2xs bg-surface-variant text-on-surface font-label-sm text-label-sm rounded-full font-semibold">{"Bank Offer Stack"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-full font-medium">{"HDFC Bank Instant"}</span>
<span className="px-space-xs py-space-2xs bg-error-container text-on-error-container font-label-sm text-label-sm rounded-full font-bold">{"Unread"}</span>
<span className="text-outline font-body-sm text-body-sm flex items-center gap-space-2xs ml-auto md:ml-0">
<span className="material-symbols-outlined text-xs">{"schedule"}</span>{" 42 mins ago\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{"\n            New Bank Offer Stack: HDFC Bank Instant ₹4,000 Rebate\n          "}</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">{"\n            HDFC Credit Cards now grant flat "}<strong className="text-secondary font-semibold">{"₹4,000 instant discount"}</strong>{" at checkout on iPhone 17 (256GB). Effective net payable drops to "}<strong className="text-on-surface font-bold">{"₹74,498"}</strong>{".\n          "}</p>
<div className="flex items-center gap-space-md mt-space-xs text-outline font-label-sm text-label-sm">
<span>{"Flipkart SuperCoins +₹500 eligible"}</span>
<span className="text-primary font-semibold">{"Total Net Benefit: ₹4,501"}</span>
</div>
</div>
</div>
<div className="flex flex-row md:flex-col lg:flex-row items-center gap-space-xs shrink-0 w-full md:w-auto pt-space-sm md:pt-0">
<button className="flex-1 md:flex-initial flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors whitespace-nowrap shadow-sm">
<span className="material-symbols-outlined text-sm">{"calculate"}</span>
<span>{"Open EMI Calculator"}</span>
</button>
<button className="dismiss-btn px-space-md py-space-xs bg-surface-container text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          Dismiss\n        "}</button>
</div>
</article>

<article className="feed-item bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden" data-category="target">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
<div className="flex items-start gap-space-md min-w-0 pl-space-xs">
<div className="relative shrink-0">
<img className="w-16 h-16 rounded-lg object-cover bg-surface-container" data-alt="Futuristic black and dark graphite gaming laptop with backlit keyboard resting on a sleek dark desk with subtle RGB perimeter lighting, crisp product photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPkAM4dt3ijVxrKECnm01Qs4BXYgVPha4Z3SG8l_HxmwIKAteaV2T2yoRO8U3ebxU50ci9ZTqAxbki0HjGdHgn4wVMx-sLM-kBcnRgS7B1ouOvfL46-qslf45BWSUaUP0E_0VkVmwCqmQ7AETJIUu1ZNl-xTf-3OEHTtGV7fOMQIEWjOUwRDV1XqpZNRWePaK66XBXqGM-ai5xJmR4FyC_5G86zTrGwqjvbHRwhCHvWFVAjmZX3uEaA" />
<span className="absolute -top-2 -right-2 p-1 bg-secondary text-on-secondary rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-xs">{"check"}</span>
</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<span className="px-space-xs py-space-2xs bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full font-semibold">{"Budget Met"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-full font-medium">{"Amazon India"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container-high text-outline font-label-sm text-label-sm rounded-full">{"Actioned"}</span>
<span className="text-outline font-body-sm text-body-sm flex items-center gap-space-2xs ml-auto md:ml-0">
<span className="material-symbols-outlined text-xs">{"schedule"}</span>{" 2 hours ago\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{"\n            ASUS TUF Gaming F15 (Intel i7 13th Gen, RTX 4060, 16GB/1TB)\n          "}</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">{"\n            Price dropped by "}<span className="text-secondary font-medium">{"₹15,000 (17.6%)"}</span>{" to "}<strong className="text-on-surface font-semibold">{"₹69,999"}</strong>{", beating your specified ₹72,000 target by ₹2,001.\n          "}</p>
<div className="flex items-center gap-space-md mt-space-xs text-outline font-label-sm text-label-sm">
<span>{"MRP: "}<del>{"₹84,999"}</del></span>
<span className="text-secondary font-semibold">{"Discount: -₹15,000"}</span>
<span>{"Trigger Confidence: 99.4%"}</span>
</div>
</div>
</div>
<div className="flex flex-row md:flex-col lg:flex-row items-center gap-space-xs shrink-0 w-full md:w-auto pt-space-sm md:pt-0">
<a className="flex-1 md:flex-initial flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-colors whitespace-nowrap shadow-sm" href="#">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-sm">{"north_east"}</span>
</a>
<button className="px-space-md py-space-xs bg-surface-container text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          Price History\n        "}</button>
</div>
</article>

<article className="feed-item bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden" data-category="target">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary"></div>
<div className="flex items-start gap-space-md min-w-0 pl-space-xs">
<div className="relative shrink-0">
<img className="w-16 h-16 rounded-lg object-cover bg-surface-container" data-alt="Matte black wireless over-ear noise-cancelling headphones resting on a sculptured metallic pedestal, high key studio lighting, crisp industrial aesthetics." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL9tVMefSTOAVEZoMVWX-I4Gr1sRJKUZRabATdmHWqQJp1n0wWGk4knXr2t1BcBbJb9ccWCAeRZWZNI--XcMXbzuhoz0q4FFu2OhEeGg7vVjGzWi17cy6XFbgVzPbI7z1HTwGWHHAS14Q0cAGec-PMIk6U98DqygrDwPP09DRW_y73zD0AuzMgV5q0OJDV8fFqZudm3Bo6rcUco2RWkxDE46dOSa-zv7EPiNPKunu4QfasljzqINMo1Q" />
<span className="absolute -top-2 -right-2 p-1 bg-tertiary text-on-tertiary rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-xs">{"radar"}</span>
</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<span className="px-space-xs py-space-2xs bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm rounded-full font-semibold">{"Proximity Alert"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-full font-medium">{"Croma Retail"}</span>
<span className="text-outline font-body-sm text-body-sm flex items-center gap-space-2xs ml-auto md:ml-0">
<span className="material-symbols-outlined text-xs">{"schedule"}</span>{" 3 hours ago\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{"\n            Target Proximity Alert: Sony WH-1000XM6 Wireless ANC Headphones\n          "}</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">{"\n            Price dipped to "}<strong className="text-on-surface font-semibold">{"₹27,999"}</strong>{" (previously ₹30,999). Only "}<span className="text-tertiary font-medium">{"₹2,999 away from your ₹25,000 threshold"}</span>{". Downward trend detected over 48 hours.\n          "}</p>
<div className="flex items-center gap-space-md mt-space-xs text-outline font-label-sm text-label-sm">
<span>{"Threshold Gap: ₹2,999"}</span>
<span>{"Lowest 30D: ₹27,999"}</span>
<span className="text-tertiary font-semibold">{"Probability to Hit Goal: 78%"}</span>
</div>
</div>
</div>
<div className="flex flex-row md:flex-col lg:flex-row items-center gap-space-xs shrink-0 w-full md:w-auto pt-space-sm md:pt-0">
<button className="flex-1 md:flex-initial flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors whitespace-nowrap">
<span className="material-symbols-outlined text-sm">{"edit"}</span>
<span>{"Adjust Budget"}</span>
</button>
<a className="px-space-md py-space-xs bg-surface-container text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors whitespace-nowrap" href="#">{"\n          View Deal\n        "}</a>
</div>
</article>

<article className="feed-item bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden" data-category="stock">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-fixed-dim"></div>
<div className="flex items-start gap-space-md min-w-0 pl-space-xs">
<div className="relative shrink-0">
<div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-2xl">{"sports_esports"}</span>
</div>
<span className="absolute -top-2 -right-2 p-1 bg-secondary text-on-secondary rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-xs">{"inventory"}</span>
</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<span className="px-space-xs py-space-2xs bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full font-semibold">{"Back In Stock"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-full font-medium">{"Flipkart"}</span>
<span className="px-space-xs py-space-2xs bg-error-container text-on-error-container font-label-sm text-label-sm rounded-full font-semibold">{"Only 4 Units Left"}</span>
<span className="text-outline font-body-sm text-body-sm flex items-center gap-space-2xs ml-auto md:ml-0">
<span className="material-symbols-outlined text-xs">{"schedule"}</span>{" 5 hours ago\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{"\n            Back In Stock: PlayStation 5 Slim Digital Edition (1TB SSD)\n          "}</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">{"\n            Restocked at "}<strong className="text-on-surface font-semibold">{"₹39,990"}</strong>{" on Flipkart with free next-day dispatch. Critical inventory level: limited stock monitored.\n          "}</p>
<div className="flex items-center gap-space-md mt-space-xs text-outline font-label-sm text-label-sm">
<span>{"Vendor: Official Sony Distributor"}</span>
<span>{"Delivery: Tomorrow by 11 AM"}</span>
<span className="text-secondary font-semibold">{"Stock Status: Scarcity Risk"}</span>
</div>
</div>
</div>
<div className="flex flex-row md:flex-col lg:flex-row items-center gap-space-xs shrink-0 w-full md:w-auto pt-space-sm md:pt-0">
<a className="flex-1 md:flex-initial flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-colors whitespace-nowrap shadow-sm" href="#">
<span>{"Claim on Flipkart"}</span>
<span className="material-symbols-outlined text-sm">{"shopping_cart_checkout"}</span>
</a>
</div>
</article>

<article className="feed-item bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden" data-category="flash">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
<div className="flex items-start gap-space-md min-w-0 pl-space-xs">
<div className="relative shrink-0">
<img className="w-16 h-16 rounded-lg object-cover bg-surface-container" data-alt="Ultra-thin borderless smart 55-inch television screen displaying vivid crystal landscape wallpaper on an off-white architectural modern living room console table." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhDWNwSO9N7j3BDqIlgoNE8qm2ISHUM0GiaoJxg4_V3tnHBtwC-1a5e_qqV8hRe3ej-iKwJ9x99x2KNTqWSm9eZWVYgxDJMfnjfRDQqvm0RTvZ9vWN5vJlJ450svTWhSScsHXsuivlo_C9P-p8iQPDjqvKpfOfZbHwLQVAEKfJczfKj_xcSB4BHwoPbEhbharGzAyxxCMRQlK-D8khJMRcFZKC66Jsidi80SheKRD7otoQOHe3cEdj4w" />
<span className="absolute -top-2 -right-2 p-1 bg-error text-on-error rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-xs">{"bolt"}</span>
</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex flex-wrap items-center gap-space-xs mb-space-2xs">
<span className="px-space-xs py-space-2xs bg-error-container text-on-error-container font-label-sm text-label-sm rounded-full font-semibold">{"Flash 24h Clearance"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-full font-medium">{"Amazon"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container-high text-outline font-label-sm text-label-sm rounded-full">{"Expiring in 6h"}</span>
<span className="text-outline font-body-sm text-body-sm flex items-center gap-space-2xs ml-auto md:ml-0">
<span className="material-symbols-outlined text-xs">{"schedule"}</span>{" 6 hours ago\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{"\n            Flash 24h Clearance Detected: Samsung 55\" Crystal 4K Neo Series\n          "}</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">{"\n            27% rapid markdown to "}<strong className="text-on-surface font-semibold">{"₹39,999"}</strong>{" (saving "}<span className="text-secondary font-semibold">{"₹15,000"}</span>{" against 30-day baseline). Lowest observed in 90 days.\n          "}</p>
<div className="flex items-center gap-space-md mt-space-xs text-outline font-label-sm text-label-sm">
<span>{"Normal Price: "}<del>{"₹54,999"}</del></span>
<span>{"Historical Floor: ₹42,500"}</span>
<span className="text-error font-semibold">{"Deal Closes Midnight"}</span>
</div>
</div>
</div>
<div className="flex flex-row md:flex-col lg:flex-row items-center gap-space-xs shrink-0 w-full md:w-auto pt-space-sm md:pt-0">
<a className="flex-1 md:flex-initial flex items-center justify-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors whitespace-nowrap shadow-sm" href="#">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-sm">{"open_in_new"}</span>
</a>
<button className="px-space-md py-space-xs bg-surface-container text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors whitespace-nowrap">{"\n          Set Follow-up\n        "}</button>
</div>
</article>
</div>

<div className="mt-space-2xl bg-surface-container-low p-space-lg rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<div className="p-space-sm bg-surface-container rounded-lg text-primary">
<span className="material-symbols-outlined text-2xl">{"notifications_active"}</span>
</div>
<div>
<h4 className="font-headline-sm text-headline-sm text-on-surface">{"Channel Configuration Summary"}</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">{"\n          Push alerts sent to 2 paired devices (MacBook Pro, iPhone 16). WhatsApp triggers dispatched to +91 98•••• 4201 for price drops exceeding ₹1,500.\n        "}</p>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0">
<button className="px-space-md py-space-xs bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors shadow-sm">{"\n        Dispatch Test Alert\n      "}</button>
<button className="px-space-md py-space-xs bg-surface-container-high text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-highest transition-colors">{"\n        Edit Thresholds\n      "}</button>
</div>
</div>
</div>
</main></div>);
}
