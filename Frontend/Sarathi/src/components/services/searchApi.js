import httpClient, { isCanceledRequest, isTimedOutRequest } from './httpClient.js';

// Same endpoints and deadlines as public/static/js/search.js.
export async function fetchSearchPage({ query, cursor, signal, prioritizePending, firstRetailer }, client = httpClient) {
  try {
    const path = cursor
      ? '/api/search/more?' + new URLSearchParams({ cursor, ...(prioritizePending ? { priority: '1' } : {}) })
      : '/api/search';
    const response = await client.request({
      url: path,
      method: cursor ? 'GET' : 'POST',
      data: cursor ? undefined : { query, ...(firstRetailer ? { retailer: firstRetailer } : {}) },
      signal,
      timeout: cursor ? 35000 : 25000,
    });
    const data = response.data;
    if (response.status < 200 || response.status >= 300 || data?.success !== true) {
      const expired = response.status === 400 && Boolean(cursor);
      const error = new Error(expired ? 'This search expired. Retry to start it again.'
        : data?.message || 'Unable to load products. Please retry.');
      error.restart = expired;
      throw error;
    }
    if (!Array.isArray(data.items) || typeof data.has_more !== 'boolean'
      || (data.has_more && (typeof data.next_cursor !== 'string' || !data.next_cursor))) {
      throw new Error('The search server returned an invalid product page. Please retry.');
    }
    return data;
  } catch (error) {
    if (isTimedOutRequest(error)) {
      throw new Error('The search is taking longer than expected. Please retry.');
    }
    if (isCanceledRequest(error) || signal?.aborted) throw error;
    if (error?.isAxiosError) {
      throw new Error('Unable to reach the search server. Check that the Flask backend is running.');
    }
    throw error;
  }
}

let pagerPromise;
export function loadSearchPager() {
  if (globalThis.SandhyaPager) return Promise.resolve(globalThis.SandhyaPager);
  if (!pagerPromise) {
    pagerPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      // Load the original controller, not a second implementation of its state machine.
      script.src = '/static/js/search-controller.js';
      script.async = true;
      const timer = setTimeout(() => script.onerror(), 10000);
      script.onload = () => {
        clearTimeout(timer);
        if (globalThis.SandhyaPager) resolve(globalThis.SandhyaPager);
        else { script.remove(); reject(new Error('Search could not initialize. Please reconnect.')); }
      };
      script.onerror = () => {
        clearTimeout(timer);
        script.remove();
        reject(new Error('Search is unavailable. Start the Flask backend and reconnect.'));
      };
      document.head.appendChild(script);
    }).catch(error => { pagerPromise = undefined; throw error; });
  }
  return pagerPromise;
}

export function safeHttpUrl(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function productDetailUrl(product) {
  return typeof product.detail_url === 'string' && product.detail_url.startsWith('/product/')
    ? product.detail_url : null;
}

export function reactProductUrl(product) {
  const detail = productDetailUrl(product);
  if (!detail || typeof product.id !== 'string' || !/^[a-f0-9]{20}$/.test(product.id)) return null;
  const token = detail.slice('/product/'.length);
  if (!token || !/^[\w.-]+$/.test(token)) return null;
  return '/products/' + product.id + '?' + new URLSearchParams({ snapshot: token });
}

export function displayPrice(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
  }
  if (typeof value !== 'string' || !value.trim()) return 'Price unavailable';
  const text = value.trim();
  return /^[\d,]+(?:\.\d+)?$/.test(text) ? '₹' + text : text;
}
