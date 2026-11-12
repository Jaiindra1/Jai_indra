import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchSearchPage, loadSearchPager } from '../services/searchApi';

const initialStatus = { loading: false, loaded: false, hasMore: false, error: null, pendingRetailer: false };

export default function useProductSearch(enabled = true) {
  const pager = useRef(null);
  const seen = useRef(new Set());
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(null);
  const [status, setStatus] = useState(initialStatus);
  const [ready, setReady] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [connectionAttempt, setConnectionAttempt] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const scrollPosition = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    const pause = () => pager.current?.pause();
    const resume = event => { if (event.persisted) pager.current?.resume(); };
    window.addEventListener('pagehide', pause);
    window.addEventListener('pageshow', resume);
    setReady(false);
    setConnectionError(null);
    loadSearchPager().then(SearchPager => {
      if (!active) return;
      pager.current = new SearchPager({
        fetchPage: fetchSearchPage,
        onPage(data, append) {
          if (!active) return;
          if (!append) seen.current.clear();
          const fresh = data.items.filter(product => {
            const key = product?.id || product?.url;
            if (!key || typeof product.name !== 'string' || seen.current.has(key)) return false;
            seen.current.add(key);
            return true;
          });
          setItems(previous => append ? [...previous, ...fresh] : fresh);
          setPage(data);
        },
        onStatus(next) { if (active) setStatus(next); },
      });
      setReady(true);
    }).catch(error => { if (active) setConnectionError(error.message); });
    return () => {
      active = false;
      window.removeEventListener('pagehide', pause);
      window.removeEventListener('pageshow', resume);
      pager.current?.cancel();
      pager.current = null;
    };
  }, [connectionAttempt, enabled]);

  const search = useCallback(query => {
    if (!pager.current || !query.trim()) return;
    setItems([]);
    setPage(null);
    seen.current.clear();
    scrollPosition.current = 0;
    setCurrentQuery(query.trim());
    return pager.current.search(query.trim());
  }, []);
  const ensureSearch = useCallback(query => {
    const current = pager.current;
    if (!current) return;
    if (current.query === query.trim() && (current.loaded || current.loading || current.error)) {
      current.resume();
      return;
    }
    return search(query);
  }, [search]);
  const pause = useCallback(() => pager.current?.pause(), []);
  const cancel = useCallback(() => pager.current?.cancel(), []);
  const more = useCallback(() => pager.current?.more(), []);
  const retry = useCallback(() => pager.current?.retry(), []);
  const reconnect = useCallback(() => setConnectionAttempt(attempt => attempt + 1), []);
  return { items, page, status, ready, connectionError, currentQuery, scrollPosition,
    search, ensureSearch, pause, cancel, more, retry, reconnect };
}
