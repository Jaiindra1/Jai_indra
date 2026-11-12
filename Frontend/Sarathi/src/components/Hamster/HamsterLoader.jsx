import React from 'react';
import Hamster from './Hamster';

export default function HamsterLoader({ label = 'Loading page', description, compact = false, inline = false }) {
  const className = 'hamster-loader' + (inline ? ' hamster-loader-inline' : compact ? ' hamster-loader-compact' : '');
  return <div role="status" aria-label={label} className={className}>
    <div aria-hidden="true"><Hamster /></div>
    <div className={inline ? 'sr-only' : 'max-w-md px-4 text-center'}>
      <p className="text-sm font-semibold text-on-surface">{label}</p>
      {description && <p className="mt-2 text-sm leading-6 text-on-surface-variant">{description}</p>}
    </div>
  </div>;
}
