import React from 'react';

function SpecificationRows({ entries }) {
  return <dl className="grid md:grid-cols-2 md:gap-x-8">{entries.map(([label, value]) =>
    <div key={label} className="product-detail-row grid gap-1.5 border-b border-outline-variant/50 py-3.5 sm:grid-cols-[minmax(130px,40%)_minmax(0,1fr)] sm:gap-4">
      <dt className="font-semibold text-on-surface">{label}</dt>
      <dd className="min-w-0 break-words leading-7 text-on-surface-variant">{String(value)}</dd>
    </div>)}</dl>;
}

export default function ProductSpecifications({ specifications, sections }) {
  const entries = specifications && typeof specifications === 'object' ? Object.entries(specifications) : [];
  const groups = sections && typeof sections === 'object' ? Object.entries(sections)
    .filter(([, values]) => values && typeof values === 'object' && Object.keys(values).length) : [];
  return <section className="product-detail-panel rounded-xl bg-white p-5 md:p-6">
    <div className="flex items-end justify-between gap-4">
      <h2 className="text-xl font-semibold">Product specifications</h2>
      {entries.length > 8 && <span className="text-sm font-medium text-outline">Scroll for all details</span>}
    </div>
    {entries.length ? <div className="product-specifications-scroll mt-4 space-y-6" tabIndex="0" aria-label="Product specifications; scroll for more details">
      {groups.length ? groups.map(([title, values]) => <section key={title}>
        <h3 className="sticky top-0 z-10 border-b border-outline-variant/40 bg-white py-2 text-base font-bold text-primary">{title}</h3>
        <SpecificationRows entries={Object.entries(values)} />
      </section>) : <SpecificationRows entries={entries} />}
    </div>
      : <p className="mt-3 text-on-surface-variant">No additional specifications were supplied with this retailer listing.</p>}
  </section>;
}
