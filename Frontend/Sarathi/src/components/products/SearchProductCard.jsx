import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { displayPrice, reactProductUrl, safeHttpUrl } from '../services/searchApi';

export default function SearchProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = safeHttpUrl(product.image_url);
  const location = useLocation();
  const detail = reactProductUrl(product);
  const retailerUrl = safeHttpUrl(product.url);
  const destination = detail || retailerUrl;
  const highlights = Array.isArray(product.highlights)
    ? product.highlights.filter(value => typeof value === 'string').slice(0, 3) : [];
  const ProductLink = detail ? Link : 'a';
  const linkProps = detail ? { to: detail, state: { returnTo: location.pathname + location.search } }
    : { href: retailerUrl, target: '_blank', rel: 'noopener noreferrer' };
  return <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-white shadow-sm transition-shadow hover:shadow-md">
    {!product.is_live ? <p className="bg-tertiary-fixed px-4 py-2 text-center text-xs font-semibold text-on-tertiary-fixed-variant">Demo data — not live retailer prices</p> : null}
    <div className="flex items-center justify-between gap-3 px-5 pt-4">
      <span className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-semibold text-primary">{product.retailer || 'Retailer'}</span>
      {product.rating != null && <span className="flex items-center gap-1 text-xs text-on-surface-variant" aria-label={'Rating: ' + product.rating}>
        <span className="material-symbols-outlined text-[16px] text-tertiary" aria-hidden="true">star</span>{product.rating}
      </span>}
    </div>
    <div className="flex h-52 items-center justify-center bg-white p-5">
      {image && !imageFailed
        ? <img src={image} alt={product.name} loading="lazy" referrerPolicy="no-referrer" onError={() => setImageFailed(true)} className="h-full w-full object-contain" />
        : <div className="flex flex-col items-center gap-2 text-outline"><span className="material-symbols-outlined text-4xl" aria-hidden="true">inventory_2</span><span className="text-xs">No image available</span></div>}
    </div>
    <div className="flex flex-1 flex-col gap-3 px-5 pb-5">
      <h2 className="text-sm font-semibold leading-5 text-on-surface" title={product.name}>
        {destination ? <ProductLink {...linkProps} className="hover:text-primary">{product.name}</ProductLink> : product.name}
      </h2>
      {highlights.length > 0 && <ul className="flex flex-wrap gap-1.5">{highlights.map((highlight, index) =>
        <li key={index} className="rounded bg-surface-container-low px-2 py-1 text-[11px] text-on-surface-variant">{highlight}</li>)}</ul>}
      <div className="mt-auto pt-2">
        <p className="text-xs text-outline">Listed price</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{displayPrice(product.price)}</p>
        {product.original_price != null && <p className="mt-1 text-xs text-outline line-through">{displayPrice(product.original_price)}</p>}
        {product.availability && <p className="mt-2 text-xs text-on-surface-variant">{product.availability}</p>}
      </div>
      {destination && <ProductLink {...linkProps} className="mt-1 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-container">
        View product <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
      </ProductLink>}
    </div>
  </article>;
}
