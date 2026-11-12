import React from 'react';
import { displayPrice } from '../services/searchApi';

function DetailSection({ title, children }) {
  return <section className="product-detail-panel rounded-xl bg-white p-5 md:p-6">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="mt-4 text-base leading-7 text-on-surface-variant">{children}</div>
  </section>;
}

/** Render only retailer evidence returned by the selected-product extractor. */
export default function ProductRetailerDetails({ product, group = 'all', onSelectVariant, selectedVariantUrl, variantError }) {
  const showPurchase = group === 'all' || group === 'purchase';
  const showDescription = group === 'all' || group === 'description';
  const selected = product.selected_configuration || {};
  const purchase = [['Brand', product.brand], ['Series', product.series], ['Model', product.model_number],
    ['Manufacturer part number', product.manufacturer_part_number], ['Selected colour', selected.color],
    ['RAM', selected.ram], ['Storage', selected.storage], ['Screen size', selected.screen_size],
    ['Seller', product.seller], ['Seller rating', product.seller_details?.rating != null ? `${product.seller_details.rating} / 5` : null],
    ['Delivery', product.delivery], ['Delivery pincode', product.delivery_details?.pincode],
    ['Warranty', product.warranty], ['Returns', product.return_policy],
    ['Cash on delivery', product.cash_on_delivery == null ? null : product.cash_on_delivery ? 'Available' : 'Unavailable'],
    ['Flipkart Assured', product.flipkart_assured ? 'Yes' : null]].filter(([, value]) => value);
  const variantGroups = product.available_variants && typeof product.available_variants === 'object'
    ? Object.entries(product.available_variants).filter(([, data]) => data?.selected || data?.options?.length) : [];
  const offerDetails = product.offer_details || {};
  const offerGroups = [
    ['Bank offers', offerDetails.bank, 'account_balance'],
    ['Exchange', offerDetails.exchange, 'swap_horiz'],
    ['Extra benefits', offerDetails.additional_benefits, 'redeem'],
    ['EMI options', offerDetails.emi, 'credit_card'],
  ].filter(([, offers]) => Array.isArray(offers) && offers.length > 0);

  return <div className={showPurchase ? 'grid gap-6 lg:grid-cols-2' : ''}>
    {showDescription && product.description && <DetailSection title="Product description">
      <p className="whitespace-pre-line break-words">{product.description}</p>
    </DetailSection>}
    {showPurchase && (offerGroups.length > 0 || product.offers?.length > 0) && <div className="lg:col-span-2"><DetailSection title="Offers & payment options">
      <div className="grid gap-3 sm:grid-cols-2">{(offerGroups.length ? offerGroups : [['Available offers', product.offers, 'sell']]).map(([title, offers, icon]) =>
        <section key={title} className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-on-surface"><span className="material-symbols-outlined text-primary" aria-hidden="true">{icon}</span>{title}</h3>
          <ul className="mt-3 space-y-2 text-sm">{offers.map((offer, index) => <li key={`${title}-${index}`} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{offer}</li>)}</ul>
        </section>)}</div>
      <p className="mt-4 text-xs text-outline">Eligibility and payment conditions apply. Confirm terms with the retailer.</p>
    </DetailSection></div>}
    {showPurchase && product.offer_details?.additional_fees?.length > 0 && <aside className="product-fee-notice lg:col-span-2" aria-labelledby="additional-fees-title">
      <div><p id="additional-fees-title" className="text-sm font-semibold text-on-surface">Additional fees</p><p className="mt-1 text-xs text-outline">Added by the retailer at checkout</p></div>
      <ul className="space-y-1 text-sm">{product.offer_details.additional_fees.map((fee, index) =>
        <li key={index}><strong>{displayPrice(fee.amount)}</strong><span className="mx-2 text-outline">·</span>{fee.description}</li>)}</ul>
    </aside>}
    {showPurchase && purchase.length > 0 && <DetailSection title="Purchase details">
      <dl className="divide-y divide-outline-variant/30">{purchase.map(([label, value]) =>
        <div key={label} className="product-detail-row grid gap-1.5 py-3.5 sm:grid-cols-[minmax(130px,32%)_minmax(0,1fr)] sm:gap-6">
          <dt className="font-semibold text-on-surface">{label}</dt><dd className="min-w-0 break-words leading-7">{value}</dd>
        </div>)}</dl>
      {product.delivery && <p className="mt-3 text-xs text-outline">Delivery shown by the retailer may depend on your location.</p>}
    </DetailSection>}
    {showPurchase && (variantGroups.length > 0 || product.variants?.length > 0) && <DetailSection title="Choose a configuration">
      <dl className="space-y-5">{variantGroups.length ? variantGroups.map(([label, variant]) => <div key={label}>
        <dt className="font-semibold capitalize">{label.replaceAll('_', ' ')}{variant.selected ? `: ${variant.selected}` : ''}</dt>
        <dd className="mt-2 flex flex-wrap gap-2">{variant.options?.length ? variant.options.map((option, index) => {
          const text = `${option.label}${option.price != null ? ` — ${displayPrice(option.price)}` : ''}`;
          const isColour = label === 'color';
          const style = isColour
            ? `group relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-xl border bg-surface-container-low p-2 ${option.selected ? 'border-on-surface ring-1 ring-on-surface' : 'border-outline-variant/50 hover:border-primary'}`
            : `rounded-lg border px-3 py-2 text-sm ${option.selected ? 'border-on-surface bg-surface-container font-semibold text-on-surface' : 'border-outline-variant/50 hover:border-primary hover:text-primary'}`;
          const content = isColour && option.image_url
            ? <><img src={option.image_url} alt={option.label} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain" />
              <span className="sr-only">{text}</span><span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-on-surface px-2 py-1 text-xs text-white group-hover:block">{option.label}</span></>
            : text;
          return option.url && onSelectVariant ? <button key={index} type="button" onClick={() => onSelectVariant(option)}
            disabled={option.selected || selectedVariantUrl === option.url} aria-pressed={Boolean(option.selected)}
            aria-label={`${option.label}${option.selected ? ', selected' : ''}`} className={style}>
            {selectedVariantUrl === option.url ? 'Loading…' : content}</button>
            : option.url ? <a key={index} href={option.url} target="_blank" rel="noopener noreferrer" aria-label={option.label} className={style}>{content}</a>
              : <span key={index} className={style}>{content}</span>;
        }) : 'No additional options listed'}</dd>
      </div>) : product.variants.map((variant, index) => <div key={index}>
        <dt className="font-semibold">{variant.label}{variant.selected ? `: ${variant.selected}` : ''}</dt>
        <dd className="mt-1">{variant.options?.join(' · ') || 'No additional options listed'}</dd>
      </div>)}</dl>
      {variantError && <p role="alert" className="mt-4 rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{variantError}</p>}
      <p className="mt-3 text-xs text-outline">Choose an option to refresh the product title, price, images, purchase details and specifications. Variant prices appear only when supplied by the retailer.</p>
    </DetailSection>}
  </div>;
}
