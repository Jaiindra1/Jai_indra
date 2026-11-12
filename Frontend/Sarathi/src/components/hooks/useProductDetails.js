import { useCallback, useEffect, useState } from 'react';
import { fetchProductDetails } from '../services/productApi';
import { isCanceledRequest, isTimedOutRequest } from '../services/httpClient.js';

export default function useProductDetails(token, id) {
  const [revision, setRevision] = useState({ key: '', count: 0 });
  const key = `${id}:${token}`;
  const refresh = revision.key === key && revision.count > 0;
  const retry = useCallback(() => setRevision(previous => ({ key, count: previous.count + 1 })), [key]);
  const [state, setState] = useState({ key, product: null, error: null, loading: Boolean(token && id) });
  useEffect(() => {
    if (!token || !id) { setState({ key, product: null, error: null, loading: false }); return; }
    const controller = new AbortController();
    let active = true;
    setState({ key, product: null, error: null, loading: true });
    fetchProductDetails(token, id, controller.signal, undefined, refresh).then(product => {
      if (active) setState({ key, product, error: null, loading: false });
    }).catch(error => {
      if (active && !isCanceledRequest(error)) setState({ key, product: null, error: isTimedOutRequest(error)
        ? 'Product details took too long to load. Please try again.'
        : error?.isAxiosError || error instanceof SyntaxError ? 'Unable to load product details. Check the backend connection and try again.' : error.message, loading: false });
    });
    return () => { active = false; controller.abort(); };
  }, [token, id, key, revision, refresh]);
  return { ...(state.key === key ? state : { product: null, error: null, loading: Boolean(token && id) }), retry };
}
