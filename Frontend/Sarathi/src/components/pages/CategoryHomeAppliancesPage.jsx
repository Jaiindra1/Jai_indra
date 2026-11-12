import React from 'react';
// Source: Pasted text (13).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function CategoryHomeAppliancesPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">


<div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
<span className="hover:text-primary cursor-pointer transition-colors">{"Categories"}</span>
<span className="material-symbols-outlined text-[16px] text-outline">{"chevron_right"}</span>
<span className="text-on-surface font-semibold">{"Home Appliances"}</span>
</div>
<div className="flex items-center gap-space-sm">
<div className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm shadow-sm">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span>{"Live Ingestion Active (4 Major Retailers)"}</span>
</div>
<span className="text-outline font-label-sm text-label-sm hidden sm:inline-block">{"Auto-refreshed 2m ago"}</span>
</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-low p-space-xl shadow-sm mb-space-lg">
<div className="relative z-10 max-w-3xl">
<div className="inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-xs shadow-sm">
<span className="material-symbols-outlined text-[14px]">{"tune"}</span>{"\n        Algorithmic Clearance Radar\n      "}</div>
<h1 className="font-display-lg text-display-lg text-on-surface tracking-tight mb-space-xs">{"\n        Home Appliances Deal Intelligence\n      "}</h1>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{"\n        Monitoring energy-efficient inverter ACs, front-load washing machines, frost-free refrigerators, and robotic vacuums with verified installation subsidy and exchange bonuses.\n      "}</p>
</div>

<div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none opacity-20 hidden md:flex items-center justify-end pr-space-lg">
<svg className="h-32 w-64 text-primary" fill="none" viewBox="0 0 200 100">
<path d="M0,50 Q25,10 50,50 T100,50 T150,20 T200,60" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
<path d="M0,60 Q35,90 70,55 T140,40 T200,50" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1.5"></path>
</svg>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">

<div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-md text-label-md text-on-surface-variant uppercase">{"Monitored Appliance SKUs"}</span>
<span className="material-symbols-outlined text-primary bg-surface-container p-space-xs rounded-lg">{"kitchen"}</span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-on-surface">{"1,450"}</span>
<span className="font-label-sm text-label-sm text-secondary font-medium">{"+12 today"}</span>
</div>
<div className="mt-space-xs flex items-center justify-between text-outline font-body-sm text-body-sm">
<span>{"Active tracked catalog"}</span>
<span className="text-on-surface font-semibold">{"99.8% in stock"}</span>
</div>
<div className="w-full bg-surface-container h-1 rounded-full mt-space-sm overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width": "88%"}}></div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-md text-label-md text-on-surface-variant uppercase">{"Clearance Delta"}</span>
<span className="material-symbols-outlined text-secondary bg-secondary-container/40 p-space-xs rounded-lg">{"trending_down"}</span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-secondary">{"28.5%"}</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{"Off MSRP"}</span>
</div>
<div className="mt-space-xs flex items-center justify-between text-outline font-body-sm text-body-sm">
<span>{"Festive & Summer Clearance"}</span>
<span className="text-secondary font-semibold">{"Peak Savings"}</span>
</div>
<div className="w-full bg-surface-container h-1 rounded-full mt-space-sm overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{"width": "72%"}}></div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-md text-label-md text-on-surface-variant uppercase">{"5-Star BEE Efficiency Deals"}</span>
<span className="material-symbols-outlined text-tertiary bg-tertiary-fixed/60 p-space-xs rounded-lg">{"eco"}</span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-on-surface">{"44 Units"}</span>
<span className="font-label-sm text-label-sm px-space-xs py-space-2xs bg-tertiary-fixed text-on-tertiary-fixed rounded">{"Verified"}</span>
</div>
<div className="mt-space-xs flex items-center justify-between text-outline font-body-sm text-body-sm">
<span>{"High-efficiency standards"}</span>
<span className="text-on-surface font-semibold">{"ISEER > 5.2"}</span>
</div>
<div className="w-full bg-surface-container h-1 rounded-full mt-space-sm overflow-hidden">
<div className="bg-tertiary-container h-full rounded-full" style={{"width": "60%"}}></div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-md text-label-md text-on-surface-variant uppercase">{"Rahul's Budget Match"}</span>
<span className="material-symbols-outlined text-primary bg-primary-fixed p-space-xs rounded-lg">{"verified_user"}</span>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-primary">{"8 Matches"}</span>
<span className="font-label-sm text-label-sm text-outline">{"₹80k Limit"}</span>
</div>
<div className="mt-space-xs flex items-center justify-between text-outline font-body-sm text-body-sm">
<span>{"Configured limits met"}</span>
<span className="text-primary font-semibold">{"Ready to buy"}</span>
</div>
<div className="w-full bg-surface-container h-1 rounded-full mt-space-sm overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{"width": "45%"}}></div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<aside className="lg:col-span-3 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">{"Filter Radar"}</span>
<button className="font-label-sm text-label-sm text-primary hover:underline" id="reset-filters-btn">{"Reset All"}</button>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">{"Appliance Category"}</label>
<div className="flex flex-col gap-space-2xs text-body-md text-on-surface-variant">
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
<span className="flex-1 font-body-sm text-body-sm text-on-surface">{"Front-Load Washers"}</span>
<span className="font-label-sm text-label-sm text-outline">{"18"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
<span className="flex-1 font-body-sm text-body-sm text-on-surface">{"Smart Inverter ACs (1.5T/2T)"}</span>
<span className="font-label-sm text-label-sm text-outline">{"12"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
<span className="flex-1 font-body-sm text-body-sm text-on-surface">{"Frost-Free Refrigerators"}</span>
<span className="font-label-sm text-label-sm text-outline">{"9"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
<span className="flex-1 font-body-sm text-body-sm text-on-surface">{"Robot Vacuum Cleaners"}</span>
<span className="font-label-sm text-label-sm text-outline">{"5"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
<span className="flex-1 font-body-sm text-body-sm text-on-surface">{"Built-in Dishwashers"}</span>
<span className="font-label-sm text-label-sm text-outline">{"3"}</span>
</label>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">{"BEE Star Rating"}</label>
<div className="grid grid-cols-3 gap-space-xs">
<button className="py-space-xs px-space-2xs rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm text-center shadow-xs">{"\n            5 Star ★\n          "}</button>
<button className="py-space-xs px-space-2xs rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm text-center">{"\n            4 Star & Up\n          "}</button>
<button className="py-space-xs px-space-2xs rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm text-center">{"\n            3 Star\n          "}</button>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">{"Smart & Engine Spec"}</label>
<div className="flex flex-col gap-space-2xs">
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface">{"Wi-Fi IoT (ThinQ/SmartThings)"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface">{"Inverter Direct Drive Motor"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface">{"Heater Built-in (Steam Clean)"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
<span className="font-body-sm text-body-sm text-on-surface">{"Auto-Empty Dock Station"}</span>
</label>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">{"Manufacturers"}</label>
<div className="flex flex-wrap gap-space-xs">
<span className="px-space-sm py-space-2xs bg-primary text-on-primary font-label-sm text-label-sm rounded-full cursor-pointer">{"LG"}</span>
<span className="px-space-sm py-space-2xs bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm rounded-full cursor-pointer">{"Samsung"}</span>
<span className="px-space-sm py-space-2xs bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm rounded-full cursor-pointer">{"Bosch"}</span>
<span className="px-space-sm py-space-2xs bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm rounded-full cursor-pointer">{"IFB"}</span>
<span className="px-space-sm py-space-2xs bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm rounded-full cursor-pointer">{"Daikin"}</span>
<span className="px-space-sm py-space-2xs bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm rounded-full cursor-pointer">{"Dyson"}</span>
<span className="px-space-sm py-space-2xs bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm rounded-full cursor-pointer">{"Dreame"}</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">{"Price Range"}</label>
<div className="flex flex-col gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input className="accent-primary" name="price_band" type="radio" />
<span>{"Under ₹25,000"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input defaultChecked className="accent-primary" name="price_band" type="radio" />
<span className="text-on-surface font-medium">{"₹25,000 – ₹40,000"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input className="accent-primary" name="price_band" type="radio" />
<span>{"₹40,000 – ₹65,000"}</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded hover:bg-surface-container-low transition-colors">
<input className="accent-primary" name="price_band" type="radio" />
<span>{"Above ₹65,000"}</span>
</label>
</div>
</div>

<div className="rounded-lg bg-surface-container p-space-md flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">{"solar_power"}</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">{"Discom Installation Subsidy"}</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">{"\n            Inverter AC installations in NCR & Bengaluru qualify for ₹1,500 direct vendor cashback.\n          "}</p>
</div>
</div>
</aside>

<section className="lg:col-span-9 flex flex-col gap-space-lg">

<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-wrap items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm">
<span className="font-headline-sm text-headline-sm text-on-surface">{"Active Appliance Deals"}</span>
<span className="px-space-xs py-space-2xs bg-surface-container text-on-surface-variant rounded font-label-sm text-label-sm">{"6 Showing"}</span>
</div>
<div className="flex items-center gap-space-md">
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase">{"Sort By:"}</span>
<select className="bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg px-space-sm py-space-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
<option>{"Highest Net Savings (₹)"}</option>
<option>{"Lowest Effective Price"}</option>
<option>{"Highest BEE Energy Efficiency"}</option>
<option>{"Largest Drop (24h)"}</option>
</select>
</div>
<div className="h-4 w-px bg-outline-variant hidden sm:block"></div>
<div className="flex items-center gap-space-2xs">
<button className="p-space-xs rounded bg-surface-container-high text-primary"><span className="material-symbols-outlined text-[18px]">{"grid_view"}</span></button>
<button className="p-space-xs rounded hover:bg-surface-container text-outline"><span className="material-symbols-outlined text-[18px]">{"table_rows"}</span></button>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
<div className="p-space-md flex flex-col gap-space-sm">
<div className="relative w-full h-48 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
<img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="A modern graphite gray front load washing machine with chrome tinted glass door in a sleek contemporary laundry room with soft daylight illumination and clean architectural lines." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc-zqRakTM7oTpTBKTejK8fVSJM_WbMSfVwzOJljxNFc77-KvnuFYeunRZFpKn6k506EtGOwKgzDCnM7JV86l7ZImqLuIxj8Ml5pQFc5P8MBxwLSfjhMb8fhvLjWxvyXdKpxUrY5UNXU5zHzXIHcaNEzjyPp4_DktcIacFSoSk0Cz3R9C_LruQEobwFLTbrwRXTkgR0RnXc1owCwQPnrU3YIeaSUlGjbUGymR86SbHSLFGOIlPK0reWA" />
<div className="absolute top-2 left-2 flex gap-space-2xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"Festive Clearance Floor"}</span>
</div>
<div className="absolute top-2 right-2">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs">{"Flipkart"}</span>
</div>
</div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs bg-tertiary-fixed text-on-tertiary-fixed rounded font-label-sm text-label-sm">{"5 Star BEE"}</span>
<span className="text-outline font-label-sm text-label-sm">{"• AI DD Motor • Steam"}</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2">{"\n                LG 8kg 5-Star AI Direct Drive Front Load Washing Machine (FHM1408BDW)\n              "}</h3>
<p className="font-body-sm text-body-sm text-secondary font-medium mt-space-2xs flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">{"verified"}</span>{"\n                Free Standard Installation Included\n              "}</p>
</div>

<div className="pt-space-xs">
<div className="flex items-baseline gap-space-sm">
<span className="font-price-card text-price-card text-on-surface">{"₹34,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹45,990"}</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"24% off"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary mt-0.5">{"\n                Save ₹11,000 + ₹2,500 HDFC Card Rebate\n              "}</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between gap-space-sm">
<button className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors w-1/2">
<span className="material-symbols-outlined text-[16px]">{"notifications_active"}</span>{" Track\n            "}</button>
<a className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-secondary text-on-secondary hover:opacity-90 font-label-md text-label-md transition-colors w-1/2 shadow-xs no-underline" href="#">
<span>{"Buy Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"arrow_forward"}</span>
</a>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
<div className="p-space-md flex flex-col gap-space-sm">
<div className="relative w-full h-48 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
<img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="A premium silver Bosch Serie 6 front loading washing machine set in a modern minimalist utility room with elegant concrete tiles and warm spotlight accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhN78pkc4EksQH3Yj_W-qFZpRLOwLonxhj1pvw2RNJdw5uy6CCPBvtckj6BNo1uhbemjtpb0-4WVHqPK8XK8coS064opUOKUItiHc9nMmYD7BtZBsDnyCFmY9W4uyaeyg10hgPsdQZND2fmwASOn60Kb9HdKLm84po2NPSVGOlQISMEiQv1ATVZsEKPBjIKzLEoBDgdrsX4RV2fX-XvoMVO1SNuH-sR31twmEVdvqROlxtSooK8MCkog" />
<div className="absolute top-2 left-2 flex gap-space-2xs">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm">{"Lowest in 90 Days"}</span>
</div>
<div className="absolute top-2 right-2">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs">{"Amazon India"}</span>
</div>
</div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs bg-tertiary-fixed text-on-tertiary-fixed rounded font-label-sm text-label-sm">{"5 Star BEE"}</span>
<span className="text-outline font-label-sm text-label-sm">{"• EcoSilence Drive • AntiTangle"}</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2">{"\n                Bosch 8kg 5-Star Series 6 Inverter Front Load Washer (WAJ2846SIN)\n              "}</h3>
<p className="font-body-sm text-body-sm text-secondary font-medium mt-space-2xs flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">{"electric_bolt"}</span>{"\n                ₹1,200 Annual Energy Savings\n              "}</p>
</div>

<div className="pt-space-xs">
<div className="flex items-baseline gap-space-sm">
<span className="font-price-card text-price-card text-on-surface">{"₹38,490"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹51,990"}</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"26% off"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary mt-0.5">{"\n                Save ₹13,500 + Up to ₹3,000 Exchange Bonus\n              "}</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between gap-space-sm">
<button className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors w-1/2">
<span className="material-symbols-outlined text-[16px]">{"notifications_active"}</span>{" Track\n            "}</button>
<a className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-secondary text-on-secondary hover:opacity-90 font-label-md text-label-md transition-colors w-1/2 shadow-xs no-underline" href="#">
<span>{"Buy Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"arrow_forward"}</span>
</a>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
<div className="p-space-md flex flex-col gap-space-sm">
<div className="relative w-full h-48 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
<img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="A minimalist white split air conditioner mounted on an architectural sage green accent wall with gentle cool breeze visualization in an airy modern living space." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS5pmMLDe-SbPPOyCcF2h_-tOPvMce28lBeRyEn0cn08R3n2fe1e0O4uYT-CZiApTJisTSpwVtli3qYbBYfXxVRhRhNd9SjctJR2dCtW3vWaHkgu6kI0u5QCc9cFnM1OGvw6C0tv1mEwxFHzRiagHvQHG4F-fcAt1BTZLaMhMrcdY2juo6mTpJYEPwcqHO0KlaUvpJg8rC4-ZTI_exLz6XJzXoFRNJXJsCpqcKYEJko5wYzAw5bhIQCg" />
<div className="absolute top-2 left-2 flex gap-space-2xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"High ISEER 5.2"}</span>
</div>
<div className="absolute top-2 right-2">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs">{"Croma"}</span>
</div>
</div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs bg-tertiary-fixed text-on-tertiary-fixed rounded font-label-sm text-label-sm">{"5 Star BEE"}</span>
<span className="text-outline font-label-sm text-label-sm">{"• 100% Copper • Triple Display"}</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2">{"\n                Daikin 1.5 Ton 5-Star Inverter Split AC (Copper, PM2.5 Filter)\n              "}</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant font-medium mt-space-2xs flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-primary">{"build"}</span>{"\n                Standard Install ₹999 (Subsidy Verified)\n              "}</p>
</div>

<div className="pt-space-xs">
<div className="flex items-baseline gap-space-sm">
<span className="font-price-card text-price-card text-on-surface">{"₹44,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹58,400"}</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"23% off"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary mt-0.5">{"\n                Save ₹13,410 + ICICI 10% Instant Discount\n              "}</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between gap-space-sm">
<button className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors w-1/2">
<span className="material-symbols-outlined text-[16px]">{"notifications_active"}</span>{" Track\n            "}</button>
<a className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-secondary text-on-secondary hover:opacity-90 font-label-md text-label-md transition-colors w-1/2 shadow-xs no-underline" href="#">
<span>{"Buy Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"arrow_forward"}</span>
</a>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
<div className="p-space-md flex flex-col gap-space-sm">
<div className="relative w-full h-48 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
<img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="A clean matte inox double door refrigerator with recessed handles in a luxurious Scandinavian kitchen interior featuring marble countertops and warm lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq-VI-OY6CMg9dvVyXlX_AqOXdIYRKqHGSZQkcj8iZD8gU6Bu6gdYWVnXIh-PGOgg1CNRMgZw45H_rV7cC8q75S0rma6WT6nHzr89vxydWnbwtAA7IWVWuZcyyi2TVZDx86FNkhnUo7PamT2c4MAtfN1CuEIObypKgwItMX1-UIHPxfStbNvXRzBpqSif9VaQZgwNncAR1SUwioS3k_dsFlOyoRYFvKgAFLdZ97l6n6myhOO29OBirCg" />
<div className="absolute top-2 left-2 flex gap-space-2xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"Curd Maestro Tech"}</span>
</div>
<div className="absolute top-2 right-2">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs">{"Flipkart"}</span>
</div>
</div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs bg-surface-container-high text-on-surface-variant rounded font-label-sm text-label-sm">{"3 Star BEE"}</span>
<span className="text-outline font-label-sm text-label-sm">{"• 322 Litres • Twin Cooling"}</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2">{"\n                Samsung 322L 3-Star Curd Maestro Double Door Frost Free Refrigerator\n              "}</h3>
<p className="font-body-sm text-body-sm text-secondary font-medium mt-space-2xs flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">{"swap_horiz"}</span>{"\n                Exchange up to ₹4,500 on old fridge\n              "}</p>
</div>

<div className="pt-space-xs">
<div className="flex items-baseline gap-space-sm">
<span className="font-price-card text-price-card text-on-surface">{"₹33,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹44,990"}</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"24% off"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary mt-0.5">{"\n                Save ₹11,000 + ₹1,750 SBI Card discount\n              "}</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between gap-space-sm">
<button className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors w-1/2">
<span className="material-symbols-outlined text-[16px]">{"notifications_active"}</span>{" Track\n            "}</button>
<a className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-secondary text-on-secondary hover:opacity-90 font-label-md text-label-md transition-colors w-1/2 shadow-xs no-underline" href="#">
<span>{"Buy Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"arrow_forward"}</span>
</a>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
<div className="p-space-md flex flex-col gap-space-sm">
<div className="relative w-full h-48 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
<img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="A high-tech sleek white robotic vacuum cleaner docked in its auto-empty and mop-cleaning station on light hardwood floors in an upscale apartment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwUfjhNStbq5o8B4KKHybKmmENjJop2WzmShG7uG0lGH4OWv3rcnsv4Nzh1VKk5x_2aZqbg-m-V0CI6XvwRBmOps87u_kBonbX3EzRsiU9-YZGhuvXqgo0LGEU0eCgvBh_52W097CcmTR1CNs0bfhdXsLl_SkpS9vT9l24kpPYi6zCIPUOicXfcmb1CApJPFI2V0hLR3jzqUL6NEyq3K_rsFz9k3yWeFa1EMzX1ac5o6bSOLhskqvsjw" />
<div className="absolute top-2 left-2 flex gap-space-2xs">
<span className="px-space-xs py-space-2xs rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">{"33% Mega Drop"}</span>
</div>
<div className="absolute top-2 right-2">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs">{"Amazon India"}</span>
</div>
</div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs bg-primary-fixed text-on-primary-fixed rounded font-label-sm text-label-sm">{"AI Obstacle 3D"}</span>
<span className="text-outline font-label-sm text-label-sm">{"• 5300Pa • Self-Cleaning Mop"}</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2">{"\n                Dreame L10s Ultra Robot Vacuum & Mop with Auto Empty Station\n              "}</h3>
<p className="font-body-sm text-body-sm text-primary font-medium mt-space-2xs flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">{"wifi"}</span>{"\n                SmartThings & Alexa Integrated\n              "}</p>
</div>

<div className="pt-space-xs">
<div className="flex items-baseline gap-space-sm">
<span className="font-price-card text-price-card text-on-surface">{"₹59,990"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹89,990"}</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"33% off"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary mt-0.5">{"\n                Save ₹30,000 + 12-Month No-Cost EMI\n              "}</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between gap-space-sm">
<button className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors w-1/2">
<span className="material-symbols-outlined text-[16px]">{"notifications_active"}</span>{" Track\n            "}</button>
<a className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-secondary text-on-secondary hover:opacity-90 font-label-md text-label-md transition-colors w-1/2 shadow-xs no-underline" href="#">
<span>{"Buy Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"arrow_forward"}</span>
</a>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
<div className="p-space-md flex flex-col gap-space-sm">
<div className="relative w-full h-48 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
<img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="A futuristic cordless stick vacuum cleaner with yellow and iron metallic finishes mounted cleanly on a sleek charging wall mount against a modern neutral studio background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL9PQrQw6saU1_1UZO8BBT6T-DQaENwjGiy9FFE1wSPkanqakdEsQPhHTN7tC2HPf51OWFXEQfGls_d0b14MVTaWTSgbX5A8Z1YNQnNTK-dPybTgcO0To7gfopBum3dlMk1BcM5Z_7jBMlI35TCFGCPLYNViRMGBPkD9YW6ql5Cxtqt2ujUt4kQEUDAUPrAwkEPsnoTFYUiABFkCEXLF-5gAZMk08su_RHW1fKxWfl1V0qypDs4jpZ0Q" />
<div className="absolute top-2 left-2 flex gap-space-2xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"Festive Flash"}</span>
</div>
<div className="absolute top-2 right-2">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm shadow-xs">{"Croma"}</span>
</div>
</div>
<div className="flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs bg-surface-container text-on-surface-variant rounded font-label-sm text-label-sm">{"40 min Runtime"}</span>
<span className="text-outline font-label-sm text-label-sm">{"• De-tangling Motorhead"}</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2">{"\n                Dyson V8 Absolute Cordless Vacuum Cleaner (Includes 5 Tool Attachments)\n              "}</h3>
<p className="font-body-sm text-body-sm text-secondary font-medium mt-space-2xs flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">{"verified_user"}</span>{"\n                2-Year Official Brand Warranty\n              "}</p>
</div>

<div className="pt-space-xs">
<div className="flex items-baseline gap-space-sm">
<span className="font-price-card text-price-card text-on-surface">{"₹29,900"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through">{"₹39,900"}</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">{"25% off"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary mt-0.5">{"\n                Save ₹10,000 + Extra ₹2,000 Croma Club Vouchers\n              "}</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between gap-space-sm">
<button className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors w-1/2">
<span className="material-symbols-outlined text-[16px]">{"notifications_active"}</span>{" Track\n            "}</button>
<a className="flex items-center justify-center gap-space-2xs h-9 px-space-sm rounded-lg bg-secondary text-on-secondary hover:opacity-90 font-label-md text-label-md transition-colors w-1/2 shadow-xs no-underline" href="#">
<span>{"Buy Deal"}</span>
<span className="material-symbols-outlined text-[16px]">{"arrow_forward"}</span>
</a>
</div>
</div>
</div>
</section>
</div>

<section className="mt-space-xl rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
<div>
<div className="flex items-center gap-space-2xs">
<span className="material-symbols-outlined text-primary">{"calculate"}</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Total Landed Cost Breakdown"}</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">{"\n          Transparent financial calculation: Base Price - Bank Instant Rebate + Standard Delivery + Free Installation + Old Appliance Exchange Value = Net Out-of-Pocket Expense.\n        "}</p>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<span className="font-label-sm text-label-sm text-outline">{"Simulated SKU:"}</span>
<span className="px-space-sm py-space-2xs bg-surface-container rounded-lg font-label-md text-label-md text-on-surface font-semibold">{"LG 8kg AI DD Front Load"}</span>
</div>
</div>

<div className="grid grid-cols-2 md:grid-cols-6 gap-space-md items-center">

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-2xs text-left">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">{"Base Price"}</span>
<span className="font-price-card text-price-card text-on-surface">{"₹34,990"}</span>
<span className="font-body-sm text-body-sm text-outline">{"Cart Subtotal"}</span>
</div>

<div className="hidden md:flex justify-center text-outline">
<span className="material-symbols-outlined text-[28px]">{"remove"}</span>
</div>

<div className="p-space-md rounded-xl bg-secondary-container/40 flex flex-col gap-space-2xs text-left">
<span className="font-label-sm text-label-sm text-on-secondary-container uppercase tracking-wide">{"Bank Rebate"}</span>
<span className="font-price-card text-price-card text-secondary">{"-₹2,500"}</span>
<span className="font-body-sm text-body-sm text-on-secondary-container">{"HDFC Instant CC"}</span>
</div>

<div className="hidden md:flex justify-center text-outline">
<span className="material-symbols-outlined text-[28px]">{"add"}</span>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-2xs text-left">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">{"Delivery & Setup"}</span>
<span className="font-price-card text-price-card text-on-surface">{"₹0"}</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">{"100% Free / Subsidized"}</span>
</div>

<div className="col-span-2 md:col-span-1 p-space-md rounded-xl bg-primary-container text-on-primary-container flex flex-col gap-space-2xs text-left shadow-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wide font-semibold">{"Net Landed Out-Of-Pocket"}</span>
<span className="font-price-hero text-price-hero text-on-primary font-bold">{"₹29,990"}</span>
<span className="font-body-sm text-body-sm text-on-primary-container">{"After ₹2,500 Old Semi-Auto Exchange"}</span>
</div>
</div>

<div className="mt-space-lg overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead>
<tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase">
<th className="p-space-sm pl-space-md">{"Merchant Store"}</th>
<th className="p-space-sm text-right">{"Sticker Price"}</th>
<th className="p-space-sm text-right">{"Instant Card Discount"}</th>
<th className="p-space-sm text-right">{"Exchange Value"}</th>
<th className="p-space-sm text-right">{"Installation Fee"}</th>
<th className="p-space-sm text-right font-bold text-on-surface pr-space-md">{"Effective Landed Cost"}</th>
</tr>
</thead>
<tbody className="divide-y-0 text-on-surface">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-space-sm pl-space-md font-semibold flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>{"\n              Flipkart (Best Parity)\n            "}</td>
<td className="p-space-sm text-right">{"₹34,990"}</td>
<td className="p-space-sm text-right text-secondary">{"-₹2,500 (HDFC)"}</td>
<td className="p-space-sm text-right text-secondary">{"-₹2,500"}</td>
<td className="p-space-sm text-right text-secondary">{"₹0 (Free)"}</td>
<td className="p-space-sm text-right font-bold text-price-card text-primary pr-space-md">{"₹29,990"}</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-space-sm pl-space-md flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-outline"></span>{"\n              Amazon India\n            "}</td>
<td className="p-space-sm text-right">{"₹35,490"}</td>
<td className="p-space-sm text-right text-secondary">{"-₹2,000 (ICICI)"}</td>
<td className="p-space-sm text-right text-secondary">{"-₹2,100"}</td>
<td className="p-space-sm text-right">{"₹399"}</td>
<td className="p-space-sm text-right font-bold text-on-surface pr-space-md">{"₹31,789"}</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-space-sm pl-space-md flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-outline"></span>{"\n              Croma Retail\n            "}</td>
<td className="p-space-sm text-right">{"₹36,990"}</td>
<td className="p-space-sm text-right text-secondary">{"-₹1,500 (Tata Neu)"}</td>
<td className="p-space-sm text-right text-secondary">{"-₹1,800"}</td>
<td className="p-space-sm text-right text-secondary">{"₹0 (Free)"}</td>
<td className="p-space-sm text-right font-bold text-on-surface pr-space-md">{"₹33,690"}</td>
</tr>
</tbody>
</table>
</div>
</section>
</div></main></div>);
}
