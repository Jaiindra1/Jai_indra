import httpClient from './httpClient.js';

export async function fetchProductDetails(token, id, signal, client = httpClient, refresh = false) {
  const response = await client.get('/api/products/' + encodeURIComponent(token), {
    signal, timeout: 45000, params: refresh ? { refresh: '1' } : undefined,
  });
  const data = response.data;
  if (response.status < 200 || response.status >= 300 || !data?.success) throw new Error(data?.message || 'Product details are unavailable. Choose the product again from search.');
  if (!data.product || data.product.id !== id || typeof data.product.name !== 'string') {
    throw new Error('This product link does not match the selected product. Choose it again from search.');
  }
  return data.product;
}

export async function fetchVariantDetails(url, signal, client = httpClient) {
  const response = await client.get('/api/products/details', {
    signal, timeout: 45000, params: { retailer: 'flipkart', url },
  });
  const data = response.data;
  if (response.status < 200 || response.status >= 300 || !data?.success || !data.product) {
    throw new Error(data?.message || 'This variant could not be loaded. Please try again.');
  }
  return data.product;
}
// Retain the existing import contract for other clients.
export const fetchProductSnapshot = fetchProductDetails;

export function retailerUrl(value, retailer) {
  try {
    const url = new URL(value);
    const expected = retailer === 'Amazon' ? 'amazon.in' : retailer === 'Flipkart' ? 'flipkart.com' : null;
    return expected && url.protocol === 'https:' && url.hostname.replace(/^www\./, '') === expected ? url.href : null;
  } catch { return null; }
}

export function searchReturnUrl(value, query = '') {
  if (typeof value === 'string') {
    try {
      const parsed = new URL(value, 'http://local.invalid');
      if (parsed.origin === 'http://local.invalid' && parsed.pathname === '/find-your-products') return parsed.pathname + parsed.search;
    } catch { /* Use the current search session below. */ }
  }
  return '/find-your-products' + (query ? '?' + new URLSearchParams({ q: query }) : '');
}
