import React, { useCallback, useEffect, useRef, useState } from 'react';
import HamsterLoader from '../Hamster/HamsterLoader';
import { displayPrice, safeHttpUrl } from '../services/searchApi';
import httpClient, { isCanceledRequest, isTimedOutRequest } from '../services/httpClient';

function Offer({ candidate }) {
  const product = candidate.product;
  const exact = candidate.verification === 'EXACT_MATCH';
  return <article className={`rounded-xl border p-4 ${exact ? 'border-secondary/40 bg-secondary/5' : 'border-outline-variant/40'}`}>
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${exact ? 'bg-secondary/15 text-secondary' : 'bg-tertiary/10 text-tertiary'}`}>
      {exact ? 'Exact configuration' : candidate.verification.replaceAll('_', ' ').toLowerCase()}</span>
    <div className="mt-4 grid grid-cols-[5rem_minmax(0,1fr)] gap-3">
      <div className="flex h-20 items-center justify-center rounded-lg bg-surface-container-low p-2">
        {product.image_url ? <img src={product.image_url} alt="" className="h-full w-full object-contain" referrerPolicy="no-referrer" /> : null}
      </div>
      <div><p className="text-xs font-semibold uppercase text-primary">{product.retailer}</p><h3 className="mt-1 text-sm font-semibold leading-5">{product.name}</h3></div>
    </div>
    <p className="mt-4 text-2xl font-semibold">{displayPrice(product.price)}</p>
    {safeHttpUrl(product.url) && <a href={product.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-semibold text-primary">View listing ↗</a>}
  </article>;
}

export default function ProductComparison({ product, token }) {
  const [state, setState] = useState({ loading: true, result: null, error: null });
  const active = useRef(null);
  const compare = useCallback(async () => {
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    setState(previous => ({ ...previous, loading: true, error: null }));
    console.groupCollapsed('[Sarathi comparison] Request');
    console.table({ retailer: product.retailer, name: product.name, price: product.price,
      ram: product.selected_configuration?.ram, storage: product.selected_configuration?.storage,
      display: product.selected_configuration?.screen_size, color: product.selected_configuration?.color });
    console.info('A signed snapshot is sent to the backend; the token is intentionally not logged.');
    console.groupEnd();
    try {
      const response = await httpClient.post('/api/product/compare', { token }, { signal: controller.signal, timeout: 45000 });
      console.groupCollapsed('[Sarathi comparison] Response');
      console.info('Status:', response.data?.status);
      console.info('Opposite-retailer query:', response.data?.query);
      console.info('AI query metadata:', response.data?.ai_query);
      console.table((response.data?.candidates || []).map(item => ({ retailer: item.product?.retailer,
        name: item.product?.name, price: item.product?.price, verification: item.verification,
        ai_provider: item.ai_provider || 'none' })));
      console.info('Potential savings:', response.data?.potential_savings);
      console.info('Elapsed milliseconds:', response.data?.elapsed_ms);
      console.groupEnd();
      setState({ loading: false, result: response.data, error: null });
    } catch (error) {
      if (!isCanceledRequest(error)) {
        console.error('[Sarathi comparison] Failed', { status: error.response?.status,
          response: error.response?.data, timedOut: isTimedOutRequest(error) });
        setState({ loading: false, result: null,
          error: isTimedOutRequest(error) ? 'The retailer comparison took too long. Please retry.' : error.response?.data?.message || 'Comparison is unavailable.' });
      }
    }
  }, [token]);
  useEffect(() => { compare(); return () => active.current?.abort(); }, [compare]);

  const result = state.result;
  return <section className="overflow-hidden rounded-2xl border border-outline-variant/30 bg-white shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-outline-variant/30 p-5 md:p-6">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-primary">Verified retailer comparison</p>
        <h2 className="mt-1 text-xl font-semibold">Compare this configuration</h2>
        <p className="mt-2 text-sm text-on-surface-variant">The signed selected variant is reopened, then up to three promising {product.retailer === 'Flipkart' ? 'Amazon' : 'Flipkart'} listings are checked.</p></div>
      <button type="button" onClick={compare} disabled={state.loading} className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold text-primary disabled:opacity-60">{state.loading ? 'Comparing…' : 'Refresh comparison'}</button>
    </div>
    <div className="p-5 md:p-6">
      <div className="mb-5 rounded-xl bg-surface-container-low p-4 text-sm"><p className="font-semibold">Selected on {product.retailer}: {displayPrice(product.price)}</p><p className="mt-1 text-on-surface-variant">{product.name}</p></div>
      {state.loading ? <HamsterLoader compact label="Checking the opposite retailer" />
        : state.error ? <p role="alert" className="rounded-xl bg-error/10 p-4 text-sm text-error">{state.error}</p>
          : <><p className="mb-4 text-sm text-on-surface-variant">{result?.message}</p>
            {result?.candidates?.length ? <div className="grid gap-4 lg:grid-cols-3">{result.candidates.map((candidate, index) => <Offer key={candidate.product.id || candidate.product.url || index} candidate={candidate} />)}</div> : null}
            {result?.status === 'matched' && <p className="mt-4 rounded-xl bg-secondary/10 p-4 text-center text-sm font-semibold text-secondary">
              {result.potential_savings > 0 ? `Potential saving: ${displayPrice(result.potential_savings)} on ${result.matched_product.retailer}` : `${product.retailer} is currently the lowest verified price.`}</p>}
            {result?.ai_query && <p className="mt-3 text-xs text-outline">Search query: {result.query} · {result.ai_query.used ? `Optimized by ${result.ai_query.provider}` : 'Deterministic fallback used'}</p>}</>}
    </div>
  </section>;
}
