import React from 'react';
// Source: Pasted text(4).txt. Visual markup migrated into React JSX.
// Replace sample retailer prices with verified API data before production use.
export default function DashboardPage() {
 return (<div className="page-content"><main className="relative pt-16 w-full px-space-lg py-space-lg min-h-screen bg-background"><div className="flex flex-col w-full">

<section className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-xl">
<div>
<div className="flex items-center gap-space-xs mb-space-2xs">
<span className="font-display-lg text-display-lg text-on-surface">{"Good evening, Rahul"}</span>
<span className="text-2xl animate-bounce">{"👋"}</span>
<span className="ml-space-xs px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wide">{"Radar Active"}</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">{"\n        Here are the best deals, verified price drops, and algorithmic buying signals detected across monitored stores today.\n      "}</p>
</div>

<div className="flex flex-wrap items-center gap-space-sm self-start lg:self-center">
<div className="flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md shadow-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>{"Last price sync: "}<strong className="text-on-surface font-semibold">{"4 mins ago"}</strong></span>
</div>
<button className="flex items-center gap-space-2xs px-space-sm h-10 bg-surface-container-lowest text-on-surface rounded-lg font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-outline">{"file_download"}</span>
<span>{"Export Daily Brief"}</span>
</button>
<button className="flex items-center gap-space-2xs px-space-md h-10 bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors" type="button">
<span className="material-symbols-outlined">{"add_link"}</span>
<span>{"Quick Track URL"}</span>
</button>
</div>
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter mb-space-2xl">

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{"Today's Best Deals"}</span>
<span className="font-price-hero text-price-hero text-on-surface mt-space-2xs">{"24"}</span>
</div>
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}}>{"local_fire_department"}</span>
</div>
</div>
<div className="mt-space-md flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"+6 newly detected"}</span>
</div>
<div className="mt-space-2xs font-body-sm text-body-sm text-on-surface-variant">{"\n        Avg. 22% below 30-day median\n      "}</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{"Your Price Drops"}</span>
<span className="font-price-hero text-price-hero text-secondary mt-space-2xs">{"7"}</span>
</div>
<div className="w-10 h-10 rounded-lg bg-secondary-container/50 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}}>{"trending_down"}</span>
</div>
</div>
<div className="mt-space-md flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">{"3 in My Products"}</span>
</div>
<div className="mt-space-2xs font-body-sm text-body-sm text-on-surface-variant">{"\n        ₹29,000 total potential savings today\n      "}</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{"Products You're Watching"}</span>
<span className="font-price-hero text-price-hero text-on-surface mt-space-2xs">{"12"}</span>
</div>
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}}>{"favorite"}</span>
</div>
</div>
<div className="mt-space-md flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">{"2 reached target budget"}</span>
</div>
<div className="mt-space-2xs font-body-sm text-body-sm text-on-surface-variant">{"\n        Active budget cap: ₹80,000\n      "}</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{"All-Time Lows Found"}</span>
<span className="font-price-hero text-price-hero text-primary mt-space-2xs">{"5"}</span>
</div>
<div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}}>{"verified"}</span>
</div>
</div>
<div className="mt-space-md flex items-center gap-space-xs">
<span className="px-space-xs py-space-2xs rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">{"Historic lowest price"}</span>
</div>
<div className="mt-space-2xs font-body-sm text-body-sm text-on-surface-variant">{"\n        Verified by 90-day history crawler\n      "}</div>
</div>
</section>

<section className="mb-space-2xl">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings": "'FILL' 1"}}>{"local_fire_department"}</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Best Deals Today"}</h2>
<span className="px-space-xs py-space-2xs bg-surface-container-high text-on-surface-variant rounded font-label-sm text-label-sm">{"Updated Hourly"}</span>
</div>
<a className="font-label-md text-label-md text-primary hover:text-primary-container flex items-center gap-space-2xs group transition-colors" href="#">{"\n        View all 24 deals\n        "}<span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">{"arrow_forward"}</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">

<article className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow group">
<div>

<div className="relative w-full h-44 rounded-lg bg-surface-container-low overflow-hidden mb-space-md flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Close up studio shot of an Apple iPhone 17 in Mist Blue finish against a calm slate background with sharp edge lighting highlighting its metallic chassis and camera bump" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVYvKKoCbdlexKie2sBd3LX8F5mMBPQ-zI6VkR6mvqQHm97mL4xmuB1rLBXGMrjhhJB4ARhUja0v-lILXUDBxdbhzBDA_wM-O9-xUtyovHjH4RKp2nyc6HUE3sVA-pCM5VGlJ7Lwm7GJW7M_JDp01UvJk3v2uR5s6hlGuRlGComlys38u2ORdWgfXcQmT9cq-6JZD45laSsYsGCB8-FP3ewKlqRj6BDe_eU4hq8-fTlnrn72W7kAymgQ" />
<div className="absolute top-2 left-2 flex flex-col gap-1">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-sm">{"🏷 Lowest Price Recorded"}</span>
</div>
<div className="absolute bottom-2 right-2 px-space-xs py-space-2xs bg-surface-container-lowest/90 backdrop-blur-sm rounded font-label-sm text-label-sm text-on-surface-variant">{"\n              Flipkart Verified\n            "}</div>
</div>

<div className="flex items-center justify-between gap-space-xs mb-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase font-semibold">{"Apple"}</span>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"In Stock\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 mb-space-xs" title="Apple iPhone 17 (Mist Blue, 256GB)">{"\n            Apple iPhone 17 (Mist Blue, 256GB)\n          "}</h3>

<div className="flex items-center gap-space-xs mb-space-md">
<div className="flex items-center text-amber-500 font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span>{"4.5"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"(1,832 reviews)"}</span>
</div>

<div className="flex flex-wrap gap-1 mb-space-md">
<span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm">{"📉 ₹8,000 Drop"}</span>
<span className="px-space-xs py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm">{"💳 ₹4,000 Bank Offer"}</span>
</div>

<div className="p-space-xs rounded-lg bg-surface-container-low mb-space-md">
<div className="flex items-baseline justify-between">
<div>
<span className="font-price-card text-price-card text-on-surface">{"₹78,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through ml-1">{"₹99,999"}</span>
</div>
<span className="font-label-md text-label-md text-secondary font-bold">{"21% OFF"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary font-medium mt-0.5">{"\n              Save ₹21,000 vs MRP\n            "}</div>
</div>
</div>

<div className="flex items-center gap-space-xs pt-space-xs">
<a className="flex-1 h-9 flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm" href="#">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-sm">{"open_in_new"}</span>
</a>
<button className="h-9 px-space-sm flex items-center gap-1 bg-surface-container-high text-primary rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors" title="Monitored in Rahul's active watch list" type="button">
<span className="material-symbols-outlined text-sm text-primary" style={{"fontVariationSettings": "'FILL' 1"}}>{"favorite"}</span>
<span className="hidden sm:inline">{"Saved"}</span>
</button>
</div>
</article>

<article className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow group">
<div>

<div className="relative w-full h-44 rounded-lg bg-surface-container-low overflow-hidden mb-space-md flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="High-end ASUS TUF gaming laptop with glowing backlit keyboard and high-refresh screen displaying an analytical telemetry dashboard in a sleek modern desk environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqXxIvTSeMNcBEdZTGjrCAxF5Z20K7_elA7Xd_sSABZ1iYBv93LfENShQpcu2RAA8dbUWSLzDBSHaAYhfDz8UOgEcdv-TOJOZbi-fbFdvK7Auv_5z6aMTXD3OYd18NQY3Zfk2jo9ISuQ6wxHPFJxmko4-C8KEo5jhPUhCggMhIgBlOwfN0AA8xmKKMPbCnDux_oKRzq1jXGvMvY3w5_WhZrfLqZWqgrgBuKS7wGDXt4uV141ty4ALyBw" />
<div className="absolute top-2 left-2 flex flex-col gap-1">
<span className="px-space-xs py-space-2xs rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold shadow-sm">{"📉 ₹20,000 Drop Today"}</span>
</div>
<div className="absolute bottom-2 right-2 px-space-xs py-space-2xs bg-surface-container-lowest/90 backdrop-blur-sm rounded font-label-sm text-label-sm text-on-surface-variant">{"\n              Flipkart\n            "}</div>
</div>

<div className="flex items-center justify-between gap-space-xs mb-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase font-semibold">{"ASUS"}</span>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"In Stock\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 mb-space-xs" title="ASUS TUF Gaming F15 (Core i7 13th Gen, RTX 4060, 16GB/1TB)">{"\n            ASUS TUF Gaming F15 (RTX 4060)\n          "}</h3>

<div className="flex items-center gap-space-xs mb-space-md">
<div className="flex items-center text-amber-500 font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span>{"4.4"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"(845 reviews)"}</span>
</div>

<div className="flex flex-wrap gap-1 mb-space-md">
<span className="px-space-xs py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm">{"🔥 22% OFF"}</span>
<span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">{"60-Day Low"}</span>
</div>

<div className="p-space-xs rounded-lg bg-surface-container-low mb-space-md">
<div className="flex items-baseline justify-between">
<div>
<span className="font-price-card text-price-card text-on-surface">{"₹69,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through ml-1">{"₹89,999"}</span>
</div>
<span className="font-label-md text-label-md text-secondary font-bold">{"22% OFF"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary font-medium mt-0.5">{"\n              Save ₹20,000 vs MRP\n            "}</div>
</div>
</div>

<div className="flex items-center gap-space-xs pt-space-xs">
<a className="flex-1 h-9 flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm" href="#">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-sm">{"open_in_new"}</span>
</a>
<button className="h-9 px-space-sm flex items-center gap-1 bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-sm text-outline">{"favorite_border"}</span>
<span className="hidden sm:inline">{"Watch"}</span>
</button>
</div>
</article>

<article className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow group">
<div>

<div className="relative w-full h-44 rounded-lg bg-surface-container-low overflow-hidden mb-space-md flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Minimalist product photo of premium silver wireless noise cancelling over-ear headphones floating on a clean studio gradient background with gentle diffuse lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSSNsp8EI9czJ9JG-HfD57xnvce5yyacZwjCGDp6W35_tc0nKzrKUvIgSz2tkHvW_LJxjCBe4KqNJsUswt7lSTBRf07NRsQ5SmAo1msEUmTf9UPmlQcHi_2-3eLepPy_nLdxUtgmMnsU6imaIPIJqzndPFRBYkBJa392EQpfhCIw3KSdQJljrIWsm_UAJBjwY4pSkrVc2-sTdCx2GfzN49hTIxU7tWH6awD57qW9dooJ1VNTR-CpluJw" />
<div className="absolute top-2 left-2 flex flex-col gap-1">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-sm">{"📉 ₹7,000 Drop"}</span>
</div>
<div className="absolute bottom-2 right-2 px-space-xs py-space-2xs bg-surface-container-lowest/90 backdrop-blur-sm rounded font-label-sm text-label-sm text-on-surface-variant">{"\n              Amazon / Flipkart\n            "}</div>
</div>

<div className="flex items-center justify-between gap-space-xs mb-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase font-semibold">{"Sony"}</span>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"In Stock\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 mb-space-xs" title="Sony WH-1000XM6 Wireless Noise Cancelling Headphones">{"\n            Sony WH-1000XM6 ANC Headphones\n          "}</h3>

<div className="flex items-center gap-space-xs mb-space-md">
<div className="flex items-center text-amber-500 font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span>{"4.6"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"(3,210 reviews)"}</span>
</div>

<div className="flex flex-wrap gap-1 mb-space-md">
<span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">{"💳 No-Cost EMI ₹2,333/m"}</span>
</div>

<div className="p-space-xs rounded-lg bg-surface-container-low mb-space-md">
<div className="flex items-baseline justify-between">
<div>
<span className="font-price-card text-price-card text-on-surface">{"₹27,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through ml-1">{"₹34,999"}</span>
</div>
<span className="font-label-md text-label-md text-secondary font-bold">{"20% OFF"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary font-medium mt-0.5">{"\n              Save ₹7,000 (20% OFF)\n            "}</div>
</div>
</div>

<div className="flex items-center gap-space-xs pt-space-xs">
<a className="flex-1 h-9 flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm" href="#">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-sm">{"open_in_new"}</span>
</a>
<button className="h-9 px-space-sm flex items-center gap-1 bg-surface-container-high text-primary rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors" title="Monitored in Rahul's active watch list" type="button">
<span className="material-symbols-outlined text-sm text-primary" style={{"fontVariationSettings": "'FILL' 1"}}>{"favorite"}</span>
<span className="hidden sm:inline">{"Saved"}</span>
</button>
</div>
</article>

<article className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow group">
<div>

<div className="relative w-full h-44 rounded-lg bg-surface-container-low overflow-hidden mb-space-md flex items-center justify-center">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Modern ultra-slim 55-inch 4K smart television on a designer stand showing an exquisite high-contrast cinematic visual in a minimal living room setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyDRKFcoAaNHggrPF3a5TsOB-T2T1PXU1RUqSiTLrgc0gNB06H5Y8kRD79szOSDilAo78-i20PbaP84wiUQwMUzQaddJ49WO7hDGvYHpG9IHY5tmNWtGLbkvCvAByKUmWubUfr4vlI0rLNuqhRGYm_C8wKki2Nuj8h1HcCF4kWxm6h48LHPm4iOJOk2Vj6v8mwy4-dEVHuAYlnJNGFp1FwXAsZY112a67gFzrD7bamM8oOMUsMbHfLtg" />
<div className="absolute top-2 left-2 flex flex-col gap-1">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-sm">{"🏷 30-Day Low"}</span>
</div>
<div className="absolute bottom-2 right-2 px-space-xs py-space-2xs bg-surface-container-lowest/90 backdrop-blur-sm rounded font-label-sm text-label-sm text-on-surface-variant">{"\n              Flipkart\n            "}</div>
</div>

<div className="flex items-center justify-between gap-space-xs mb-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase font-semibold">{"Samsung"}</span>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{"In Stock\n            "}</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 mb-space-xs" title={"Samsung 55\" Crystal 4K UHD Smart TV (2024 Series)"}>{"\n            Samsung 55\" Crystal 4K Smart TV\n          "}</h3>

<div className="flex items-center gap-space-xs mb-space-md">
<div className="flex items-center text-amber-500 font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings": "'FILL' 1"}}>{"star"}</span>
<span>{"4.5"}</span>
</div>
<span className="font-body-sm text-body-sm text-outline">{"(4,120 reviews)"}</span>
</div>

<div className="flex flex-wrap gap-1 mb-space-md">
<span className="px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm">{"📉 ₹15,000 Drop"}</span>
<span className="px-space-xs py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm">{"27% OFF"}</span>
</div>

<div className="p-space-xs rounded-lg bg-surface-container-low mb-space-md">
<div className="flex items-baseline justify-between">
<div>
<span className="font-price-card text-price-card text-on-surface">{"₹39,999"}</span>
<span className="font-price-mrp text-price-mrp text-outline line-through ml-1">{"₹54,999"}</span>
</div>
<span className="font-label-md text-label-md text-secondary font-bold">{"27% OFF"}</span>
</div>
<div className="font-body-sm text-body-sm text-secondary font-medium mt-0.5">{"\n              Save ₹15,000 vs MRP\n            "}</div>
</div>
</div>

<div className="flex items-center gap-space-xs pt-space-xs">
<a className="flex-1 h-9 flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm" href="#">
<span>{"View Deal"}</span>
<span className="material-symbols-outlined text-sm">{"open_in_new"}</span>
</a>
<button className="h-9 px-space-sm flex items-center gap-1 bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-sm text-outline">{"favorite_border"}</span>
<span className="hidden sm:inline">{"Watch"}</span>
</button>
</div>
</article>
</div>
</section>

<section className="mb-space-2xl">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md">
<div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings": "'FILL' 1"}}>{"trending_down"}</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Biggest Price Drops Today"}</h2>
</div>
<p className="font-body-sm text-body-sm text-outline">{"Verified drop calculations derived against the 30-day baseline median."}</p>
</div>
<div className="flex items-center gap-space-xs self-start sm:self-center">
<span className="font-label-sm text-label-sm text-outline uppercase font-semibold">{"Filter:"}</span>
<button className="px-space-xs py-1 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold" type="button">{"All Stores"}</button>
<button className="px-space-xs py-1 rounded hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm" type="button">{"Flipkart Only"}</button>
<button className="px-space-xs py-1 rounded hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm" type="button">{"Amazon Only"}</button>
</div>
</div>

<div className="overflow-x-auto rounded-xl bg-surface-container-lowest shadow-sm">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-space-md px-space-md font-semibold">{"Product Name & Specs"}</th>
<th className="py-space-md px-space-md font-semibold">{"Retailer"}</th>
<th className="py-space-md px-space-md font-semibold text-right">{"Previous Price"}</th>
<th className="py-space-md px-space-md font-semibold text-right">{"Current Price"}</th>
<th className="py-space-md px-space-md font-semibold text-right">{"Drop Amount"}</th>
<th className="py-space-md px-space-md font-semibold text-right">{"Drop %"}</th>
<th className="py-space-md px-space-md font-semibold">{"Target / Volatility Status"}</th>
<th className="py-space-md px-space-md font-semibold text-center">{"Action"}</th>
</tr>
</thead>
<tbody className="divide-y-0 text-on-surface font-body-sm text-body-sm">

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-md px-space-md font-medium text-on-surface">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-outline">{"smartphone"}</span>
</div>
<div className="min-w-0">
<div className="font-headline-sm text-headline-sm text-on-surface truncate">{"Apple iPhone 17 (Mist Blue, 256GB)"}</div>
<div className="font-body-sm text-body-sm text-outline truncate">{"256GB • A19 Bionic • 48MP Pro Fusion"}</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">{"Flipkart"}</span>
</td>
<td className="py-space-md px-space-md text-right text-outline line-through font-price-mrp text-price-mrp">{"\n              ₹86,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-price-card text-price-card text-on-surface">{"\n              ₹78,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">{"\n              ↓ ₹8,000\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">
<span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"9.2% Drop"}</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex items-center gap-1.5 text-secondary font-label-md text-label-md">
<span className="material-symbols-outlined text-base">{"check_circle"}</span>
<span>{"Below Rahul's ₹80k budget"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-center">
<button className="px-space-sm py-1.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap" type="button">{"\n                Analyze & View\n              "}</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-md px-space-md font-medium text-on-surface">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-outline">{"laptop_mac"}</span>
</div>
<div className="min-w-0">
<div className="font-headline-sm text-headline-sm text-on-surface truncate">{"ASUS Gaming Laptop 15.6\" (Core i7)"}</div>
<div className="font-body-sm text-body-sm text-outline truncate">{"RTX 4060 • 16GB RAM • 1TB SSD • 144Hz"}</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">{"Flipkart"}</span>
</td>
<td className="py-space-md px-space-md text-right text-outline line-through font-price-mrp text-price-mrp">{"\n              ₹84,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-price-card text-price-card text-on-surface">{"\n              ₹69,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">{"\n              ↓ ₹15,000\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">
<span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"17.6% Drop"}</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex items-center gap-1.5 text-secondary font-label-md text-label-md">
<span className="material-symbols-outlined text-base">{"verified"}</span>
<span>{"Lowest in 60 days"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-center">
<button className="px-space-sm py-1.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap" type="button">{"\n                Analyze & View\n              "}</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-md px-space-md font-medium text-on-surface">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-outline">{"headphones"}</span>
</div>
<div className="min-w-0">
<div className="font-headline-sm text-headline-sm text-on-surface truncate">{"Sony WH-1000XM6 Headphones"}</div>
<div className="font-body-sm text-body-sm text-outline truncate">{"Silver • Dual Processor V2 • 40h Battery"}</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">{"Amazon"}</span>
</td>
<td className="py-space-md px-space-md text-right text-outline line-through font-price-mrp text-price-mrp">{"\n              ₹34,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-price-card text-price-card text-on-surface">{"\n              ₹27,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">{"\n              ↓ ₹7,000\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">
<span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"20.0% Drop"}</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex items-center gap-1.5 text-tertiary font-label-md text-label-md">
<span className="material-symbols-outlined text-base">{"near_me"}</span>
<span>{"Target ₹25,000 (Close)"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-center">
<button className="px-space-sm py-1.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap" type="button">{"\n                Analyze & View\n              "}</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-md px-space-md font-medium text-on-surface">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-outline">{"tv"}</span>
</div>
<div className="min-w-0">
<div className="font-headline-sm text-headline-sm text-on-surface truncate">{"Samsung 55\" 4K Smart TV"}</div>
<div className="font-body-sm text-body-sm text-outline truncate">{"Crystal 4K UHD • HDR10+ • Q-Symphony"}</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">{"Flipkart"}</span>
</td>
<td className="py-space-md px-space-md text-right text-outline line-through font-price-mrp text-price-mrp">{"\n              ₹54,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-price-card text-price-card text-on-surface">{"\n              ₹39,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">{"\n              ↓ ₹15,000\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">
<span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"27.2% Drop"}</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex items-center gap-1.5 text-secondary font-label-md text-label-md">
<span className="material-symbols-outlined text-base">{"bolt"}</span>
<span>{"Steep drop today"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-center">
<button className="px-space-sm py-1.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap" type="button">{"\n                Analyze & View\n              "}</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="py-space-md px-space-md font-medium text-on-surface">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-outline">{"sports_esports"}</span>
</div>
<div className="min-w-0">
<div className="font-headline-sm text-headline-sm text-on-surface truncate">{"Lenovo Legion Slim 5 Gaming Laptop"}</div>
<div className="font-body-sm text-body-sm text-outline truncate">{"Ryzen 7 7840HS • RTX 4060 • 16GB/512GB"}</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">{"Flipkart"}</span>
</td>
<td className="py-space-md px-space-md text-right text-outline line-through font-price-mrp text-price-mrp">{"\n              ₹79,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-price-card text-price-card text-on-surface">{"\n              ₹64,999\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">{"\n              ↓ ₹15,000\n            "}</td>
<td className="py-space-md px-space-md text-right font-semibold text-secondary">
<span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">{"18.8% Drop"}</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex items-center gap-1.5 text-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-base">{"new_releases"}</span>
<span>{"New deal added"}</span>
</div>
</td>
<td className="py-space-md px-space-md text-center">
<button className="px-space-sm py-1.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap" type="button">{"\n                Analyze & View\n              "}</button>
</td>
</tr>
</tbody>
</table>
</div>
</section>

<section className="mb-space-xl">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-error" style={{"fontVariationSettings": "'FILL' 1"}}>{"favorite"}</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{"Monitored Watchlist Highlights"}</h2>
<span className="px-space-xs py-space-2xs bg-secondary-container text-on-secondary-container rounded font-label-sm text-label-sm font-semibold">{"Budget Cap ₹80,000"}</span>
</div>
<a className="font-label-md text-label-md text-primary hover:text-primary-container flex items-center gap-space-2xs group transition-colors" href="#">{"\n        Manage 12 monitored items\n        "}<span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">{"arrow_forward"}</span>
</a>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full pointer-events-none"></div>
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">{"done_all"}</span>{" TARGET REACHED\n            "}</span>
<span className="font-label-sm text-label-sm text-outline">{"Target: ₹80,000"}</span>
</div>
<div className="flex gap-space-sm mb-space-sm">
<div className="w-16 h-16 rounded-lg bg-surface-container-low shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Apple iPhone 17 frontal angle showcasing bezel-free screen and dynamic island on pristine white surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQHfH8a5ZU4JNgPfHYq3j4XeD84bZP-NRCoE3bLgmwEK7oahsOVPWNVYABB9eLupDNTtLjzCAsikb_6Ye53p5VnY0psPqtVyCiGliqx1YFLnMdvvJnBE9iFjTTVOteVeRi3KtTDQnP0xwBujSkL27KrdfpTghxCXymZz6R-Ie9Ol65bofiAmJ3yAHEE2bxZLNQ75Uez2XuyA1LT9MPa6dzAQq9O_E8YC1lOlS5TrRn-Tm3ShmeGHx_pQ" />
</div>
<div className="min-w-0">
<h4 className="font-headline-sm text-headline-sm text-on-surface truncate">{"iPhone 17 (256GB)"}</h4>
<p className="font-body-sm text-body-sm text-secondary font-semibold">{"₹1,001 below Rahul's limit"}</p>
<p className="font-price-card text-price-card text-on-surface mt-1">{"₹78,999"}</p>
</div>
</div>

<div className="h-10 w-full mb-space-sm flex items-end">
<svg className="w-full h-8 text-secondary" fill="none" viewBox="0 0 200 40">
<path d="M0,35 Q30,30 60,32 T120,20 T160,25 T200,8" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
<circle className="fill-secondary" cx="200" cy="8" r="3.5"></circle>
</svg>
</div>
</div>
<div className="pt-space-xs flex items-center justify-between">
<span className="font-body-sm text-body-sm text-outline">{"Retailer: Flipkart"}</span>
<button className="h-8 px-space-sm bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:bg-secondary/90 transition-colors" type="button">{"\n            Buy at Lowest\n          "}</button>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">{"trending_down"}</span>{" ₹2,999 TO GO\n            "}</span>
<span className="font-label-sm text-label-sm text-outline">{"Target: ₹25,000"}</span>
</div>
<div className="flex gap-space-sm mb-space-sm">
<div className="w-16 h-16 rounded-lg bg-surface-container-low shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Sony premium noise cancelling over ear headphones studio product render against matte neutral backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_mnJrxfG60z9cAjgB86pE691rhP1oNKFTNwRZKiyXGgTAzEWcW2jCUG7jFFJNzL_RDGIBWoXNKriegQnOVni-xOLqvExNDhvRUq_ytG6CBitCql9I7DOht9JqeBsJ6WjalAVtMTsjWDrYzs9jt6YcicqYywl1Z1x49ItB9qiha985SEdyxb4qWl0aYAtGj4v0NxVeaV68BWrIUbIPgQeZsHO7TPX-xyElwLktz6UPukWaqht2WOzoGA" />
</div>
<div className="min-w-0">
<h4 className="font-headline-sm text-headline-sm text-on-surface truncate">{"Sony WH-1000XM6"}</h4>
<p className="font-body-sm text-body-sm text-outline">{"Down from ₹34,999"}</p>
<p className="font-price-card text-price-card text-on-surface mt-1">{"₹27,999"}</p>
</div>
</div>

<div className="h-10 w-full mb-space-sm flex items-end">
<svg className="w-full h-8 text-primary" fill="none" viewBox="0 0 200 40">
<path d="M0,10 Q40,15 80,12 T130,22 T170,18 T200,28" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
<circle className="fill-primary" cx="200" cy="28" r="3.5"></circle>
</svg>
</div>
</div>
<div className="pt-space-xs flex items-center justify-between">
<span className="font-body-sm text-body-sm text-outline">{"Retailer: Amazon"}</span>
<button className="h-8 px-space-sm bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">{"\n            Adjust Budget\n          "}</button>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">{"\n              STABLE PRICE\n            "}</span>
<span className="font-label-sm text-label-sm text-outline">{"Target: ₹60,000"}</span>
</div>
<div className="flex gap-space-sm mb-space-sm">
<div className="w-16 h-16 rounded-lg bg-surface-container-low shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Apple iPad Air M2 tablet on metallic aluminum keyboard dock with Apple Pencil resting on edge in modern studio" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_mrAVCG9MhQCcRHcjENNiATaOVcvbBt_3ldOUyggUlBol0Jaj_EJ_oNqxTVh_zuX87zgrhdN9EOPD28NdaM-0OvK9c2dAoPft8qSFj-7g1JMRCB0dzRjOQdGwak9M9h_UjCs6H2RT4RvKrByR2J6Y25d_vJucKkST7siOnjp0YznuuTVuWIjog7Fu7JjmlU3oQJh19hZuSiuwR09bwb2Ukl3ML2L4nE_9xC2uQf-pPLQEYC0wdIxLdw" />
</div>
<div className="min-w-0">
<h4 className="font-headline-sm text-headline-sm text-on-surface truncate">{"iPad Air M2 (128GB)"}</h4>
<p className="font-body-sm text-body-sm text-outline">{"No price drops past 14d"}</p>
<p className="font-price-card text-price-card text-on-surface mt-1">{"₹64,900"}</p>
</div>
</div>

<div className="h-10 w-full mb-space-sm flex items-end">
<svg className="w-full h-8 text-outline" fill="none" viewBox="0 0 200 40">
<path d="M0,20 Q50,20 100,20 T150,20 T200,20" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2.5"></path>
<circle className="fill-outline" cx="200" cy="20" r="3"></circle>
</svg>
</div>
</div>
<div className="pt-space-xs flex items-center justify-between">
<span className="font-body-sm text-body-sm text-outline">{"Retailer: Croma / Apple"}</span>
<button className="h-8 px-space-sm bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">{"\n            Set Alert\n          "}</button>
</div>
</div>
</div>
</section>
</div></main></div>);
}
