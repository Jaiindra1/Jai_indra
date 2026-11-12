import React from 'react';
import { displayPrice } from '../services/searchApi';
import { retailerUrl } from '../services/productApi';

const LABELS = { ram: 'RAM', storage: 'Storage', processor: 'Processor', model_number: 'Model code',
  colour: 'Colour', display_size: 'Display size', gpu: 'GPU', brand: 'Brand' };

export default function SelectedProductDetails({ product, details, loading, error }) {
  const shown = details || product;
  const attributes = details?.normalized_attributes || {};
  const link = retailerUrl(shown?.url || product?.url, product?.retailer);
  return <section className="border-b border-outline-variant/30 bg-surface-container-lowest p-5 md:p-6">
    <div className="grid gap-5 md:grid-cols-[10rem_1fr]">
      <div className="flex h-40 items-center justify-center rounded-lg bg-white p-3">
        {shown?.image_url ? <img src={shown.image_url} alt="" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
          : <span className="material-symbols-outlined text-5xl text-outline" aria-hidden="true">image_not_supported</span>}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Selected on {product?.retailer}</p>
        <h2 className="mt-2 text-lg font-semibold">{shown?.name}</h2>
        <p className="mt-2 text-2xl font-bold">{displayPrice(shown?.price)}</p>
        {details?.availability && <p className="mt-1 text-sm text-on-surface-variant">{details.availability}</p>}
        {loading && <p className="mt-3 text-sm text-on-surface-variant" role="status">Loading verified product-page specifications…</p>}
        {!loading && error && <p className="mt-3 text-sm text-outline">Detailed specifications were unavailable ({error.replaceAll('_', ' ')}). The signed search preview is still shown.</p>}
        {link && <a href={link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex font-semibold text-primary">View on {product?.retailer} ↗</a>}
      </div>
    </div>
    {Object.keys(attributes).length > 0 && <dl className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(attributes).filter(([key]) => !key.endsWith('_gb')).map(([key, value]) => <div key={key} className="rounded-lg bg-surface-container p-3 text-sm">
        <dt className="text-outline">{LABELS[key] || key.replaceAll('_', ' ')}</dt><dd className="mt-1 font-semibold">{value}</dd>
      </div>)}
    </dl>}
    {details?.highlights?.length > 0 && <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-on-surface-variant">
      {details.highlights.slice(0, 5).map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}
    </ul>}
  </section>;
}
