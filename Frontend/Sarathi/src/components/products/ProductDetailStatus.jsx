import React from 'react';

export default function ProductDetailStatus({ product, onRetry }) {
  const checked = product.checked_at ? new Date(product.checked_at * 1000).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short',
  }) : null;
  return <div className={`flex flex-wrap items-center justify-between gap-3 ${product.detail_status === 'snapshot' ? 'rounded-xl border border-tertiary/20 bg-tertiary-fixed/20 p-4' : 'py-1'}`}>
    <p role="status" className="text-xs leading-5 text-on-surface-variant">
      {product.detail_status === 'snapshot' ? product.detail_message
        : `Details from ${product.retailer}${checked ? ` · Checked ${checked} IST` : ''}${product.cache_hit ? ' · Recently saved result' : ''}`}
    </p>
    <button type="button" onClick={onRetry} className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold text-primary">
      {product.detail_status === 'snapshot' ? 'Retry product details' : 'Refresh product details'}
    </button>
  </div>;
}
