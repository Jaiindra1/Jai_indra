import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HamsterLoader from '../Hamster/HamsterLoader';
import { useProductSearchContext } from '../context/ProductSearchContext';
import SearchProductCard from '../products/SearchProductCard';

const suggestions = ['MacBook Air', 'Samsung phone case', 'Running shoes', 'Mac mini dock'];

export default function FindYourProductsPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q')?.trim() || '';
  const [draft, setDraft] = useState(query);
  const [activeQuery, setActiveQuery] = useState(query);
  const sentinel = useRef(null);
  const { items, page, status, ready, connectionError, search, ensureSearch, activate, pause,
    currentQuery, scrollPosition, cancel, more, retry, reconnect } = useProductSearchContext();

  useEffect(() => { activate(); return pause; }, [activate, pause]);

  useEffect(() => {
    setDraft(query);
    if (query && ready) { setActiveQuery(query); ensureSearch(query); }
  }, [query, ready, ensureSearch]);

  useLayoutEffect(() => {
    if (query !== currentQuery) return;
    window.scrollTo(0, scrollPosition.current);
    const saveScroll = () => { scrollPosition.current = window.scrollY; };
    window.addEventListener('scroll', saveScroll, { passive: true });
    return () => window.removeEventListener('scroll', saveScroll);
  }, [query, currentQuery, scrollPosition]);

  useEffect(() => {
    if (!status.loaded || !status.hasMore || status.loading || status.error || !globalThis.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) more();
    }, { rootMargin: '300px 0px' });
    if (sentinel.current) observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [status.loaded, status.hasMore, status.loading, status.error, more]);

  function submit(value) {
    const next = value.trim();
    if (!next || !ready) return;
    setActiveQuery(next);
    if (next === query) search(next);
    else setParams({ q: next });
  }
  const warnings = [...new Set((Array.isArray(page?.warnings) ? page.warnings : [])
    .filter(warning => typeof warning?.message === 'string').map(warning => warning.message).filter(Boolean))];
  const loadingFirst = status.loading && !status.loaded;
  return <section className="space-y-7">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Product search</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Find Your Products</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant">Search Amazon and Flipkart in one place. Explore current listings, prices, and product details.</p>
      </div>
      <div className="flex gap-2 text-xs font-medium text-on-surface-variant">
        <span className="rounded-full border border-outline-variant/30 bg-white px-3 py-2">Amazon</span>
        <span className="rounded-full border border-outline-variant/30 bg-white px-3 py-2">Flipkart</span>
      </div>
    </div>

    <div className="rounded-xl border border-outline-variant/30 bg-white p-5 shadow-sm md:p-6">
      <form onSubmit={event => { event.preventDefault(); submit(draft); }} className="flex flex-col gap-3 sm:flex-row" role="search" aria-label="Find your products">
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-outline-variant/60 bg-surface-container-low px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
          <span className="material-symbols-outlined text-outline" aria-hidden="true">search</span>
          <span className="sr-only">Product name or model</span>
          <input type="search" name="query" maxLength={200} required value={draft} onChange={event => { setDraft(event.target.value); cancel(); }}
            placeholder="Try a product name, model, or category" className="min-h-12 w-full min-w-0 bg-transparent py-3 text-sm outline-none" />
        </label>
        <button type="submit" disabled={!ready || !draft.trim()} className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-container">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">travel_explore</span>Find products
        </button>
      </form>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="mr-1 text-outline">Try searching</span>
        {suggestions.map(suggestion => <button key={suggestion} type="button" disabled={!ready} onClick={() => submit(suggestion)} className="rounded-full bg-surface-container-low px-3 py-2 text-on-surface-variant hover:bg-surface-container-high">{suggestion}</button>)}
      </div>
    </div>

    {connectionError && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-error/20 bg-error-container/30 p-4 text-sm">
      <p>{connectionError}</p><button type="button" onClick={reconnect} className="rounded-lg bg-white px-4 py-2 font-semibold text-primary">Reconnect</button>
    </div>}
    {!ready && !connectionError && <HamsterLoader compact label="Connecting to product search" />}
    {warnings.length > 0 && <div role="status" className="rounded-xl border border-tertiary/20 bg-tertiary-fixed/20 p-4 text-sm text-tertiary">{warnings.join(' ')}</div>}
    {status.error && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-error/20 bg-error-container/30 p-4 text-sm">
      <p>{status.error}</p><button type="button" onClick={retry} disabled={status.loading} className="rounded-lg bg-white px-4 py-2 font-semibold text-primary">Retry search</button>
    </div>}

    {loadingFirst && <div className="rounded-xl border border-outline-variant/30 bg-white px-5 py-6">
      <HamsterLoader label={'Finding products for ' + activeQuery} />
    </div>}

    {items.length > 0 && <div className="space-y-4" aria-busy={status.loading}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">Results for “{activeQuery}”</h2>
        <p className="text-sm text-outline" aria-live="polite">{items.length} products loaded</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map(product => <SearchProductCard key={product.id || product.url} product={product} />)}
      </div>
    </div>}

    {!activeQuery && ready && <div className="rounded-xl border border-dashed border-outline-variant/60 px-5 py-12 text-center">
      <span className="material-symbols-outlined mb-3 text-4xl text-primary" aria-hidden="true">manage_search</span>
      <h2 className="text-lg font-semibold">Your next find starts here</h2>
      <p className="mt-2 text-sm text-on-surface-variant">Enter what you’re looking for to see real retailer listings.</p>
    </div>}
    {status.loaded && !items.length && !status.hasMore && !status.error && <div className="rounded-xl border border-outline-variant/30 bg-white p-10 text-center">
      <h2 className="text-lg font-semibold">No products found</h2><p className="mt-2 text-sm text-on-surface-variant">Try a different product name or a shorter query.</p>
    </div>}

    <div ref={sentinel} className="h-px" aria-hidden="true" />
    {status.loaded && <div className="flex flex-col items-center gap-3 pb-4">
      {status.loading ? <HamsterLoader compact label={status.pendingRetailer ? 'Checking the other retailer' : 'Fetching more products'} />
        : <p role="status" className="text-sm text-on-surface-variant">{status.hasMore ? 'More listings are available.' : items.length ? 'You’ve reached the end of these results.' : ''}</p>}
      {status.hasMore && !status.error && <button type="button" onClick={more} disabled={status.loading} className="rounded-lg border border-outline-variant/60 bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-surface-container-low">Load more products</button>}
    </div>}
  </section>;
}
