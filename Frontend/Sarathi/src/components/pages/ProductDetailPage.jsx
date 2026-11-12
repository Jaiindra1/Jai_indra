import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import HamsterLoader from '../Hamster/HamsterLoader';
import { useProductSearchContext } from '../context/ProductSearchContext';
import useProductDetails from '../hooks/useProductDetails';
import { fetchVariantDetails, searchReturnUrl } from '../services/productApi';
import ProductOverview from '../products/ProductOverview';
import ProductSpecifications from '../products/ProductSpecifications';
import ProductRetailerDetails from '../products/ProductRetailerDetails';
import ProductDetailStatus from '../products/ProductDetailStatus';
import ProductComparison from '../products/ProductComparison';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const token = params.get('snapshot');
  const location = useLocation();
  const { currentQuery } = useProductSearchContext();
  const { product, error, loading, retry } = useProductDetails(token, id);
  const [activeProduct, setActiveProduct] = useState(null);
  const [variantState, setVariantState] = useState({ url: null, error: null });
  const variantRequest = useRef(null);
  const shownProduct = activeProduct || product;
  const shownToken = activeProduct?.detail_url?.startsWith('/product/')
    ? activeProduct.detail_url.slice('/product/'.length) : token;
  const returnTo = searchReturnUrl(location.state?.returnTo, currentQuery);
  const hasPurchaseDetails = shownProduct && (shownProduct.offers?.length || shownProduct.variants?.length ||
    shownProduct.selected_configuration || shownProduct.available_variants ||
    ['brand', 'model_number', 'seller', 'delivery', 'warranty', 'return_policy'].some(field => shownProduct[field]));
  const loadingDetails = <HamsterLoader label="Loading product details"
    description="Opening the retailer listing and collecting available prices, images and specifications. This may take a few moments." />;
  useEffect(() => {
    setActiveProduct(null);
    setVariantState({ url: null, error: null });
    window.scrollTo(0, 0);
    return () => variantRequest.current?.abort();
  }, [id, token]);

  async function selectVariant(option) {
    if (!option?.url || option.selected || option.url === shownProduct?.url) return;
    variantRequest.current?.abort();
    const controller = new AbortController();
    variantRequest.current = controller;
    setVariantState({ url: option.url, error: null });
    try {
      const nextProduct = await fetchVariantDetails(option.url, controller.signal);
      setActiveProduct(nextProduct);
      setVariantState({ url: null, error: null });
      document.getElementById('product-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (requestError) {
      if (requestError?.name !== 'CanceledError' && requestError?.name !== 'AbortError') {
        setVariantState({ url: null, error: requestError.message });
      }
    }
  }

  return <div className="product-detail-page mx-auto w-full max-w-7xl space-y-6 pb-8">
    <Link to={returnTo} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>Back to search results
    </Link>
    {!token || !id ? <section className="rounded-xl border border-outline-variant/30 bg-white p-8 text-center">
      <h1 className="text-2xl font-bold">Choose a product from search</h1>
      <p className="mt-3 text-sm text-on-surface-variant">Open a result in Find Your Products to see its details.</p>
    </section> : loading ? <section className="rounded-xl border border-outline-variant/30 bg-white px-4 py-8">{loadingDetails}</section>
      : error ? <section role="alert" className="rounded-xl border border-error/20 bg-white p-8">
        <h1 className="text-xl font-semibold">Product details unavailable</h1>
        <p className="mt-3 text-sm text-on-surface-variant">{error}</p>
        <button type="button" onClick={retry} className="mt-4 rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold text-primary">Retry product details</button>
      </section> : product && product.id === id && shownProduct ? <>
        <ProductDetailStatus product={shownProduct} onRetry={retry} />
        <nav aria-label="Product sections" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-outline-variant/40 pb-4 text-sm font-semibold text-on-surface-variant">
          <a href="#product-overview" className="hover:text-primary">Overview</a>
          {hasPurchaseDetails ? <a href="#product-purchase" className="hover:text-primary">Buying details</a> : null}
          {shownProduct.description && <a href="#product-description" className="hover:text-primary">Description</a>}
          <a href="#product-comparison" className="hover:text-primary">Compare prices</a>
          <a href="#product-specifications" className="hover:text-primary">Specifications</a>
        </nav>
        <div id="product-overview" className="scroll-mt-24"><ProductOverview key={shownProduct.url || shownProduct.id} product={shownProduct} /></div>
        {hasPurchaseDetails ? <div id="product-purchase" className="scroll-mt-24">
          <ProductRetailerDetails product={shownProduct} group="purchase" onSelectVariant={selectVariant}
            selectedVariantUrl={variantState.url} variantError={variantState.error} />
        </div> : null}
        {shownProduct.description && <div id="product-description" className="product-detail-reading-section scroll-mt-24">
          <ProductRetailerDetails product={shownProduct} group="description" />
        </div>}
        <div id="product-comparison" className="scroll-mt-24"><ProductComparison key={shownProduct.url || shownProduct.id} product={shownProduct} token={shownToken} /></div>
        <div id="product-specifications" className="product-detail-reading-section scroll-mt-24"><ProductSpecifications
          specifications={shownProduct.specifications} sections={shownProduct.specification_sections} /></div>
      </> : loadingDetails}
  </div>;
}
