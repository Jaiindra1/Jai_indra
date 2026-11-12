import React, { createContext, useCallback, useContext, useState } from 'react';
import useProductSearch from '../hooks/useProductSearch';

const ProductSearchContext = createContext(null);

export function ProductSearchProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const session = useProductSearch(enabled);
  const activate = useCallback(() => setEnabled(true), []);
  return <ProductSearchContext.Provider value={{ ...session, activate }}>{children}
  </ProductSearchContext.Provider>;
}

export function useProductSearchContext() {
  const session = useContext(ProductSearchContext);
  if (!session) throw new Error('Product search requires ProductSearchProvider');
  return session;
}
