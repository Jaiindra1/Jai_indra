import React from 'react';
// Source: Pasted text (16).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function AccountPreferencesPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
<div>
<div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider mb-space-2xs">
<span className="hover:text-primary transition-colors cursor-pointer">{"Settings & Profile"}</span>
<span className="material-symbols-outlined text-outline text-body-sm leading-none">{"chevron_right"}</span>
<span className="text-primary font-semibold">{"Account & Deal Preferences"}</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">{"\n        Account, Buyer Profile & Card Stack\n      "}</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs max-w-3xl">{"\n        Manage your strict purchase budget envelopes, linked credit cards for instant net price calculations, crawler telemetry alerts, and WhatsApp webhook triggers.\n      "}</p>
</div>

<div className="flex items-center gap-space-sm self-start md:self-auto">
<div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-xl shadow-sm">
<span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
<span className="font-label-md text-label-md text-on-surface">{"Telemetry: Active Engine"}</span>
<span className="bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs rounded-full font-label-sm text-label-sm font-semibold">{"15m Refresh"}</span>
</div>
<button className="flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-lg py-2.5 rounded-lg shadow-sm transition-all active:scale-95" id="save-all-btn">
<span className="material-symbols-outlined text-body-lg">{"save"}</span>
<span>{"Save Preferences"}</span>
</button>
</div>
</div>

<div className="grid grid-cols-12 gap-space-xl items-start">

<div className="col-span-12 lg:col-span-7 flex flex-col gap-space-xl">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm relative overflow-hidden">

<div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-surface-container blur-3xl pointer-events-none opacity-60"></div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md relative z-10">
<div className="flex items-center gap-space-md">
<div className="relative">
<img className="w-16 h-16 rounded-xl object-cover shadow-sm" data-alt="Close up sharp professional portrait of Rahul Sharma, an Indian male software engineer in his late 20s wearing modern glasses and navy casual blazer against a clean softly lit tech office backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRL4Ou8_MTZ06DRFO371byis5rkVECq6Y836YJy98n0PMO2lhULiifEl3Xo6_VemdXKDuLvTOe7hvz65vu8mrvXalez1pCJ3yf30JXVjaP_1Y_hUNUSMK0xB3zaTi53MAN6594YCMrybhfI2IsdYAEo4QrxDoHigup_sa99g1SL8TYPtX6pL9RBl8ieFqACSMjQGnYojDgbq9ukdvlU-MVnGxq6kRqiwoZbdEZ1bNJoBL6HTJi1y9v_w" />
<span className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary text-on-secondary rounded-full flex items-center justify-center font-label-sm text-label-sm" title="Online & Synced">
<span className="material-symbols-outlined text-[12px] leading-none">{"check"}</span>
</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-sm">
<span className="font-headline-md text-headline-md text-on-surface font-bold">{"Rahul Sharma"}</span>
<span className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-space-xs py-space-2xs rounded-md uppercase tracking-wider font-semibold">{"PRO Active"}</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">{"Senior Software Engineer • Bengaluru, India"}</p>
<span className="font-body-sm text-body-sm text-outline mt-0.5">{"rahul.sharma@example.com • Synced with iPhone 17 Radar"}</span>
</div>
</div>
<div className="flex flex-col items-end justify-center bg-surface-container-low px-space-md py-space-sm rounded-lg sm:text-right">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">{"Subscription Term"}</span>
<span className="font-label-md text-label-md text-on-surface font-semibold mt-space-2xs">{"SARATHI PRO 36-Mo"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"Valid until Oct 2026"}</span>
</div>
</div>

<div className="grid grid-cols-3 gap-space-sm mt-space-lg pt-space-md bg-surface-container-low rounded-lg p-space-sm text-center">
<div>
<div className="font-label-sm text-label-sm uppercase text-outline">{"Active Tracks"}</div>
<div className="font-price-card text-price-card text-on-surface mt-space-2xs">{"7 Hardware"}</div>
</div>
<div>
<div className="font-label-sm text-label-sm uppercase text-outline">{"Realized Savings"}</div>
<div className="font-price-card text-price-card text-secondary mt-space-2xs">{"₹42,850"}</div>
</div>
<div>
<div className="font-label-sm text-label-sm uppercase text-outline">{"Stack Efficiency"}</div>
<div className="font-price-card text-price-card text-primary mt-space-2xs">{"98.4%"}</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<div className="p-2 bg-surface-container rounded-lg text-primary">
<span className="material-symbols-outlined leading-none">{"account_balance_wallet"}</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{"Category Budget Ceilings"}</h2>
<p className="font-body-sm text-body-sm text-outline">{"Automatic discount locks suppress deals priced higher than specified envelope caps"}</p>
</div>
</div>
<button className="flex items-center gap-space-2xs text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold transition-colors">
<span className="material-symbols-outlined text-[16px]">{"tune"}</span>{"\n            Reset Defaults\n          "}</button>
</div>

<div className="flex flex-col gap-space-md">

<div className="bg-surface-container-low p-space-md rounded-xl hover:bg-surface-container-high transition-all">
<div className="flex items-center justify-between mb-space-xs">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-outline">{"smartphone"}</span>
<div>
<span className="font-label-md text-label-md text-on-surface font-semibold block">{"Flagship Smartphone Cap"}</span>
<span className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" iPhone 17 (256GB) active tracking at ₹79,990 net\n                  "}</span>
</div>
</div>
<div className="text-right">
<div className="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded-lg shadow-sm">
<span className="font-label-sm text-label-sm text-outline">{"₹"}</span>
<input className="w-20 font-price-card text-price-card text-on-surface bg-transparent text-right focus:outline-none" type="text" defaultValue="80,000" />
</div>
</div>
</div>

<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-space-sm">
<div className="bg-primary h-full rounded-full" style={{"width": "99.8%"}}></div>
</div>
<div className="flex justify-between items-center mt-1 text-outline font-label-sm text-label-sm">
<span>{"99.8% ceiling allocated"}</span>
<span className="text-secondary font-medium">{"₹10 Buffer Left"}</span>
</div>
</div>

<div className="bg-surface-container-low p-space-md rounded-xl hover:bg-surface-container-high transition-all">
<div className="flex items-center justify-between mb-space-xs">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-outline">{"laptop_mac"}</span>
<div>
<span className="font-label-md text-label-md text-on-surface font-semibold block">{"Workstation & Gaming Laptop Cap"}</span>
<span className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" ASUS TUF Gaming F15 matched at ₹74,990\n                  "}</span>
</div>
</div>
<div className="text-right">
<div className="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded-lg shadow-sm">
<span className="font-label-sm text-label-sm text-outline">{"₹"}</span>
<input className="w-20 font-price-card text-price-card text-on-surface bg-transparent text-right focus:outline-none" type="text" defaultValue="80,000" />
</div>
</div>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-space-sm">
<div className="bg-secondary h-full rounded-full" style={{"width": "93.7%"}}></div>
</div>
<div className="flex justify-between items-center mt-1 text-outline font-label-sm text-label-sm">
<span>{"93.7% ceiling allocated"}</span>
<span className="text-secondary font-medium">{"₹5,010 Safe Headroom"}</span>
</div>
</div>

<div className="bg-surface-container-low p-space-md rounded-xl hover:bg-surface-container-high transition-all">
<div className="flex items-center justify-between mb-space-xs">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-outline">{"headphones"}</span>
<div>
<span className="font-label-md text-label-md text-on-surface font-semibold block">{"Premium ANC Audio Cap"}</span>
<span className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" Sony WH-1000XM6 matched at ₹26,990\n                  "}</span>
</div>
</div>
<div className="text-right">
<div className="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded-lg shadow-sm">
<span className="font-label-sm text-label-sm text-outline">{"₹"}</span>
<input className="w-20 font-price-card text-price-card text-on-surface bg-transparent text-right focus:outline-none" type="text" defaultValue="30,000" />
</div>
</div>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-space-sm">
<div className="bg-secondary h-full rounded-full" style={{"width": "89.9%"}}></div>
</div>
<div className="flex justify-between items-center mt-1 text-outline font-label-sm text-label-sm">
<span>{"89.9% ceiling allocated"}</span>
<span className="text-secondary font-medium">{"₹3,010 Safe Headroom"}</span>
</div>
</div>

<div className="bg-surface-container-low p-space-md rounded-xl hover:bg-surface-container-high transition-all">
<div className="flex items-center justify-between mb-space-xs">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-outline">{"tv"}</span>
<div>
<span className="font-label-md text-label-md text-on-surface font-semibold block">{"Smart TV & Home Entertainment Cap"}</span>
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>{" Passive radar listening for 55\" QLED drops\n                  "}</span>
</div>
</div>
<div className="text-right">
<div className="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded-lg shadow-sm">
<span className="font-label-sm text-label-sm text-outline">{"₹"}</span>
<input className="w-20 font-price-card text-price-card text-on-surface bg-transparent text-right focus:outline-none" type="text" defaultValue="45,000" />
</div>
</div>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-space-sm">
<div className="bg-tertiary-fixed-dim h-full rounded-full" style={{"width": "0%"}}></div>
</div>
<div className="flex justify-between items-center mt-1 text-outline font-label-sm text-label-sm">
<span>{"Awaiting primary target match"}</span>
<span className="text-outline font-medium">{"₹45,000 Available"}</span>
</div>
</div>
</div>

<div className="mt-space-lg p-space-md bg-inverse-surface text-inverse-on-surface rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm shadow-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary-fixed">{"verified"}</span>
<div>
<div className="font-label-md text-label-md font-semibold text-inverse-on-surface">{"Total Committed Watchlist Cap"}</div>
<div className="font-body-sm text-body-sm text-surface-dim">{"Net financial exposure calculated across 3 active tracking nodes"}</div>
</div>
</div>
<div className="sm:text-right">
<div className="font-price-hero text-price-hero text-secondary-fixed font-bold">{"₹1,70,998"}</div>
<div className="font-label-sm text-label-sm text-surface-dim">{"Max Gross MRP: ₹2,34,900"}</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<div className="p-2 bg-surface-container rounded-lg text-primary">
<span className="material-symbols-outlined leading-none">{"travel_explore"}</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{"Retailer Crawler Preferences"}</h2>
<p className="font-body-sm text-body-sm text-outline">{"Manage active marketplace scraper workers and priority heartbeat"}</p>
</div>
</div>
<span className="px-space-sm py-1 bg-surface-container-high text-on-surface font-label-sm text-label-sm rounded-full font-semibold">{"\n            Cluster: IN-South (BLR-1)\n          "}</span>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-sm mb-space-lg">

<div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-primary font-headline-sm">{"\n                Fk\n              "}</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">{"Flipkart"}</div>
<div className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" 4m latency\n                "}</div>
</div>
</div>
<input defaultChecked className="w-4 h-4 text-primary rounded bg-surface-container accent-primary cursor-pointer" type="checkbox" />
</div>

<div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-tertiary-container font-headline-sm">{"\n                Az\n              "}</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">{"Amazon India"}</div>
<div className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" Real-time\n                "}</div>
</div>
</div>
<input defaultChecked className="w-4 h-4 text-primary rounded bg-surface-container accent-primary cursor-pointer" type="checkbox" />
</div>

<div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-on-surface font-headline-sm">{"\n                Cr\n              "}</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">{"Croma Electronics"}</div>
<div className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" 12m latency\n                "}</div>
</div>
</div>
<input defaultChecked className="w-4 h-4 text-primary rounded bg-surface-container accent-primary cursor-pointer" type="checkbox" />
</div>

<div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-error font-headline-sm">{"\n                Rd\n              "}</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">{"Reliance Digital"}</div>
<div className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" 15m latency\n                "}</div>
</div>
</div>
<input defaultChecked className="w-4 h-4 text-primary rounded bg-surface-container accent-primary cursor-pointer" type="checkbox" />
</div>

<div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-outline font-headline-sm">{"\n                Tq\n              "}</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">{"Tata CLiQ Luxury"}</div>
<div className="font-body-sm text-body-sm text-outline">{"Standby mode"}</div>
</div>
</div>
<input className="w-4 h-4 text-primary rounded bg-surface-container accent-primary cursor-pointer" type="checkbox" />
</div>

<div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-center border-dashed border-outline-variant hover:bg-surface-container cursor-pointer transition-colors">
<button className="flex items-center gap-1 text-primary font-label-md text-label-md font-semibold">
<span className="material-symbols-outlined text-[18px]">{"add_circle"}</span>{"\n              Request Store Hook\n            "}</button>
</div>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md bg-surface-container-low rounded-xl gap-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary">{"schedule"}</span>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">{"Crawler Polling Frequency"}</div>
<div className="font-body-sm text-body-sm text-outline">{"Pro Tier allows sub-hourly hyper-aggressive parity scanning"}</div>
</div>
</div>
<div className="flex items-center gap-space-xs bg-surface-container-lowest p-1 rounded-lg shadow-sm">
<button className="px-space-sm py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">{"60m"}</button>
<button className="px-space-sm py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">{"30m"}</button>
<button className="px-space-sm py-1 rounded font-label-sm text-label-sm bg-primary text-on-primary font-semibold shadow-sm">{"15m Priority"}</button>
<button className="px-space-sm py-1 rounded font-label-sm text-label-sm text-outline hover:text-on-surface">{"5m Realtime"}</button>
</div>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-5 flex flex-col gap-space-xl">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<div className="p-2 bg-surface-container rounded-lg text-primary">
<span className="material-symbols-outlined leading-none">{"credit_card"}</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{"My Credit Cards & Wallet Stack"}</h2>
<p className="font-body-sm text-body-sm text-outline">{"Used by SARATHI to compute exact net effective checkout prices"}</p>
</div>
</div>
</div>

<div className="flex flex-col gap-space-md" id="cards-stack">

<div className="p-space-md rounded-xl bg-gradient-to-br from-inverse-surface via-slate-900 to-inverse-surface text-inverse-on-surface shadow-md relative overflow-hidden group">
<div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl"></div>
<div className="flex items-center justify-between mb-space-md relative z-10">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary-fixed text-body-lg">{"contactless"}</span>
<span className="font-headline-sm text-headline-sm font-bold tracking-tight text-inverse-on-surface">{"HDFC Bank"}</span>
</div>
<span className="bg-secondary text-on-secondary font-label-sm text-label-sm px-space-xs py-space-2xs rounded-full font-semibold uppercase">{"\n                Primary Default\n              "}</span>
</div>
<div className="relative z-10 mb-space-md">
<div className="font-label-md text-label-md font-semibold text-inverse-on-surface">{"Millennia Credit Card"}</div>
<div className="font-body-sm text-body-sm text-surface-dim font-mono tracking-widest mt-0.5">{"•••• •••• •••• 4892"}</div>
</div>
<div className="flex items-center justify-between pt-space-xs bg-white/5 rounded-lg px-space-sm py-1 text-surface-dim text-body-sm relative z-10">
<div className="flex items-center gap-1 text-secondary-fixed">
<span className="material-symbols-outlined text-[14px]">{"local_offer"}</span>
<span className="font-label-sm text-label-sm font-medium">{"₹4,000 Instant Rebate + 5% Cashback"}</span>
</div>
<span className="text-surface-dim font-label-sm text-label-sm">{"Exp 08/29"}</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-primary font-headline-sm">{"\n                  IC\n                "}</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-bold">{"ICICI Amazon Pay Credit Card"}</div>
<div className="font-body-sm text-body-sm text-outline font-mono">{"•••• 1044"}</div>
</div>
</div>
<span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-space-xs py-space-2xs rounded-full font-medium">{"\n                Active\n              "}</span>
</div>
<div className="flex items-center justify-between bg-surface-container-lowest px-space-sm py-1.5 rounded-lg text-body-sm">
<span className="text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">{"percent"}</span>{" Unlimited 5% Statement Credit\n              "}</span>
<button className="text-outline hover:text-on-surface font-label-sm text-label-sm">{"Manage Rules"}</button>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-primary-container font-headline-sm">{"\n                  SB\n                "}</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-bold">{"SBI SimplyCLICK Card"}</div>
<div className="font-body-sm text-body-sm text-outline font-mono">{"•••• 7731"}</div>
</div>
</div>
<span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-space-xs py-space-2xs rounded-full font-medium">{"\n                Active\n              "}</span>
</div>
<div className="flex items-center justify-between bg-surface-container-lowest px-space-sm py-1.5 rounded-lg text-body-sm">
<span className="text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">{"stars"}</span>{" 10x Rewards • Festive ₹3,000 Slash\n              "}</span>
<button className="text-outline hover:text-on-surface font-label-sm text-label-sm">{"Manage Rules"}</button>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-error font-headline-sm">{"\n                  AX\n                "}</div>
<div>
<div className="font-label-md text-label-md text-on-surface font-bold">{"Axis Flipkart Credit Card"}</div>
<div className="font-body-sm text-body-sm text-outline font-mono">{"•••• 9205"}</div>
</div>
</div>
<span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-space-xs py-space-2xs rounded-full font-medium">{"\n                Active\n              "}</span>
</div>
<div className="flex items-center justify-between bg-surface-container-lowest px-space-sm py-1.5 rounded-lg text-body-sm">
<span className="text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">{"payments"}</span>{" 5% Unlimited FK Cashback\n              "}</span>
<button className="text-outline hover:text-on-surface font-label-sm text-label-sm">{"Manage Rules"}</button>
</div>
</div>
</div>

<button className="w-full mt-space-md py-2.5 px-space-md bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md font-semibold rounded-xl flex items-center justify-center gap-space-xs transition-colors" id="add-card-trigger">
<span className="material-symbols-outlined text-[18px]">{"add_circle"}</span>
<span>{"+ Add New Bank Card"}</span>
</button>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<div className="p-2 bg-surface-container rounded-lg text-primary">
<span className="material-symbols-outlined leading-none">{"notifications_active"}</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{"Telemetry & Alerts"}</h2>
<p className="font-body-sm text-body-sm text-outline">{"Real-time webhook notifications and markup filters"}</p>
</div>
</div>
</div>

<div className="flex flex-col gap-space-md">

<div className="p-space-md bg-surface-container-low rounded-xl">
<div className="flex items-center justify-between mb-space-xs">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary">{"chat"}</span>
<div>
<div className="font-label-md text-label-md text-on-surface font-bold">{"WhatsApp Alert Webhook"}</div>
<div className="font-body-sm text-body-sm text-outline">{"+91 98•••• 4201"}</div>
</div>
</div>
<span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-space-xs py-space-2xs rounded-full font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" Online & Ready\n              "}</span>
</div>
<div className="flex items-center justify-between pt-space-xs mt-space-xs border-t-0">
<span className="font-body-sm text-body-sm text-on-surface-variant">{"Sends 1-click buy deep link"}</span>
<button className="px-space-sm py-1 bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-1" id="test-ping-btn">
<span className="material-symbols-outlined text-[14px]">{"send"}</span>{" Test Ping\n              "}</button>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary">{"desktop_windows"}</span>
<div>
<div className="font-label-md text-label-md text-on-surface font-bold">{"Browser Push Notifications"}</div>
<div className="font-body-sm text-body-sm text-outline">{"Desktop Chrome & Safari Web Push enabled"}</div>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>

<div className="p-space-md bg-surface-container-low rounded-xl">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-md text-label-md text-on-surface font-bold">{"Minimum Drop Trigger Threshold"}</span>
<span className="font-label-sm text-label-sm text-primary font-semibold bg-primary-fixed px-space-xs py-0.5 rounded">{"Drop ≥ ₹1,000"}</span>
</div>
<p className="font-body-sm text-body-sm text-outline mb-space-sm">{"\n              Only notify if instantaneous price drops by at least ₹1,000 or directly breaches your ceiling budget.\n            "}</p>
<input className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" max="5000" min="200" step="100" type="range" defaultValue="1000" />
<div className="flex justify-between font-label-sm text-label-sm text-outline mt-1">
<span>{"₹200 (Noisy)"}</span>
<span>{"₹1,000 (Optimal)"}</span>
<span>{"₹5,000 (Conservative)"}</span>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-tertiary">{"shield"}</span>
<div>
<div className="font-label-md text-label-md text-on-surface font-bold">{"Anti-Markup Filter Sensitivity"}</div>
<div className="font-body-sm text-body-sm text-outline">{"Suppress fake pre-sale MRP inflation > 5%"}</div>
</div>
</div>
<span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-space-sm py-1 rounded-full font-bold">{"\n              Strict Engine\n            "}</span>
</div>
</div>
</div>
</div>
</div>

<div className="fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition-all duration-300 ease-out flex items-center gap-space-md bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-xl" id="save-toast">
<div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary">
<span className="material-symbols-outlined text-[18px]">{"check"}</span>
</div>
<div>
<div className="font-label-md text-label-md font-bold">{"SARATHI Stack Updated"}</div>
<div className="font-body-sm text-body-sm text-surface-dim">{"Budgets & bank stack synchronized with live crawlers."}</div>
</div>
<button className="text-surface-dim hover:text-inverse-on-surface ml-space-sm" id="toast-close">
<span className="material-symbols-outlined text-[18px]">{"close"}</span>
</button>
</div>
</div>
</main></div>);
}
