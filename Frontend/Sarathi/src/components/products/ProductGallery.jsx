import React, { useState } from 'react';
import { safeHttpUrl } from '../services/searchApi';

/** Gallery media comes only from the selected retailer document. */
export default function ProductGallery({ product }) {
  const images = [...new Set([product.image_url, ...(product.images || [])].map(safeHttpUrl).filter(Boolean))];
  const videos = [...new Set((product.videos || []).map(safeHttpUrl).filter(Boolean))];
  const media = [...images.map(url => ({ type: 'image', url })), ...videos.map(url => ({ type: 'video', url }))];
  const [selected, setSelected] = useState(null);
  const [failed, setFailed] = useState([]);
  const available = media.filter(item => !failed.includes(item.url));
  const current = available.find(item => item.url === selected) || available[0];
  const reject = url => setFailed(previous => previous.includes(url) ? previous : [...previous, url]);

  return <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
    <div className="flex aspect-[4/3] max-h-[25rem] min-h-64 items-center justify-center rounded-2xl bg-surface-container-low p-6 sm:p-8">
      {current?.type === 'video' ? <video key={current.url} src={current.url} controls playsInline preload="metadata"
        aria-label={`Product video for ${product.name}`} onError={() => reject(current.url)} className="h-full w-full rounded-xl object-contain" />
        : current ? <img src={current.url} alt={product.name} referrerPolicy="no-referrer"
          onError={() => reject(current.url)} className="h-full w-full object-contain" />
          : <p className="text-sm text-outline">No product media available</p>}
    </div>
    {available.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Product media">
      {available.map((item, index) => <button type="button" key={item.url} aria-label={`View product ${item.type} ${index + 1}`}
        aria-pressed={current?.url === item.url} onClick={() => setSelected(item.url)}
        className={`relative h-16 w-16 shrink-0 rounded-lg border bg-white p-1 ${current?.url === item.url ? 'border-primary ring-2 ring-primary/10' : 'border-outline-variant/30 hover:border-primary/60'}`}>
        {item.type === 'video' ? <span className="flex h-full w-full items-center justify-center rounded bg-on-surface text-white"><span className="material-symbols-outlined" aria-hidden="true">play_arrow</span></span>
          : <img src={item.url} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => reject(item.url)} className="h-full w-full object-contain" />}
      </button>)}</div>}
  </div>;
}
