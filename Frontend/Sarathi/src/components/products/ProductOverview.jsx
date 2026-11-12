import React from 'react';
import { displayPrice } from '../services/searchApi';
import { retailerUrl } from '../services/productApi';
import ProductGallery from './ProductGallery';

const AVAILABILITY = {
  InStock: 'In stock', OutOfStock: 'Out of stock', PreOrder: 'Available for pre-order',
  LimitedAvailability: 'Limited availability', OnlineOnly: 'Available online', SoldOut: 'Sold out',
};

function availabilityLabel(value) {
  if (!value) return null;
  const key = String(value).replace(/\/$/, '').split('/').pop();
  return AVAILABILITY[key] || value;
}

export default function ProductOverview({ product }) {
  const link = retailerUrl(product.url, product.retailer);
  const selected = product.selected_configuration || {};
  const configurations = [
    ['Colour', selected.color], ['RAM', selected.ram], ['Storage', selected.storage],
    ['Display', selected.screen_size], ['Model', product.model_number || selected.model_number],
  ].filter(([, value]) => value);
  const availability = availabilityLabel(product.availability);

  return <section className="grid items-start gap-6 rounded-2xl border border-outline-variant/30 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:p-7">
    <ProductGallery key={product.url || product.id} product={product} />
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-primary/10 px-3 py-1.5 font-semibold text-primary">{product.retailer}</span>
        {product.category && <span className="rounded-full bg-surface-container px-3 py-1.5 text-outline">{product.category}</span>}
        {product.rating != null && <span className="font-semibold text-tertiary">★ {product.rating} / 5</span>}
      </div>
      {(product.rating_count != null || product.review_count != null) && <p className="!text-sm text-outline">
        {product.rating_count != null && `${product.rating_count.toLocaleString('en-IN')} ratings`}
        {product.rating_count != null && product.review_count != null && ' · '}
        {product.review_count != null && `${product.review_count.toLocaleString('en-IN')} reviews`}
      </p>}
      <h1 className="break-words text-xl font-semibold leading-[1.4] text-on-surface md:text-[1.4rem]">{product.name}</h1>

      {configurations.length > 0 && <dl className="flex flex-wrap gap-2" aria-label="Selected configuration">
        {configurations.map(([label, value]) => <div key={label} className="rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 text-sm">
          <dt className="inline text-xs text-outline">{label}: </dt><dd className="inline font-semibold text-on-surface">{value}</dd>
        </div>)}
      </dl>}

      <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="!text-xs font-medium text-outline">Current price</p>
            <p className="mt-1 text-[1.85rem] font-semibold tracking-tight text-on-surface">{displayPrice(product.price)}</p></div>
          {availability && <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${/out of stock|sold out/i.test(availability) ? 'bg-error/10 text-error' : 'bg-secondary/10 text-secondary'}`}>{availability}</span>}
        </div>
        {product.original_price != null && <p className="mt-2 !text-sm text-outline"><span className="line-through">{displayPrice(product.original_price)}</span>
          {product.discount != null && <span className="ml-2 font-semibold text-secondary">{product.discount}% off</span>}</p>}
        {product.saving != null && <p className="mt-1 !text-sm font-semibold text-secondary">You save {displayPrice(product.saving)}</p>}
      </div>

      {Array.isArray(product.highlights) && product.highlights.length > 0 && <div className="border-t border-outline-variant/30 pt-4">
        <h2 className="mb-2 text-sm font-semibold">Key highlights</h2>
        <ul className="grid gap-x-6 gap-y-1.5 pl-5 text-sm text-on-surface-variant sm:grid-cols-2">{product.highlights.slice(0, 4).map((text, index) => <li key={index} className="list-disc">{text}</li>)}</ul>
      </div>}

      {link && <a href={link} target="_blank" rel="noopener noreferrer" className="mt-1 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-container">
        View on {product.retailer}<span aria-hidden="true">↗</span></a>}
      {product.detail_status !== 'extracted' && product.captured_label && <p className="!text-xs text-outline">Search result captured {product.captured_label}</p>}
    </div>
  </section>;
}
