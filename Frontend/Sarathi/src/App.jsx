import React, { lazy } from 'react';import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';import AppLayout from './components/layout/AppLayout';
import { ProductSearchProvider } from './components/context/ProductSearchContext';
const AccountPreferencesPage = lazy(() => import('./components/pages/AccountPreferencesPage.jsx'));
const DailyDealsPage = lazy(() => import('./components/pages/DailyDealsPage.jsx'));
const OffersEmiPage = lazy(() => import('./components/pages/OffersEmiPage.jsx'));
const NotificationsPage = lazy(() => import('./components/pages/NotificationsPage.jsx'));
const TvsPage = lazy(() => import('./components/pages/TvsPage.jsx'));
const TrackNewProductPage = lazy(() => import('./components/pages/TrackNewProductPage.jsx'));
const PriceDropsPage = lazy(() => import('./components/pages/PriceDropsPage.jsx'));
const MyProductsPage = lazy(() => import('./components/pages/MyProductsPage.jsx'));
const SavedFiltersPage = lazy(() => import('./components/pages/SavedFiltersPage.jsx'));
const ProductDetailPage = lazy(() => import('./components/pages/ProductDetailPage.jsx'));
const CategoryHomeAppliancesPage = lazy(() => import('./components/pages/CategoryHomeAppliancesPage.jsx'));
const PriceParityArbitragePage = lazy(() => import('./components/pages/PriceParityArbitragePage.jsx'));
const AudioPage = lazy(() => import('./components/pages/AudioPage.jsx'));
const ForYouPage = lazy(() => import('./components/pages/ForYouPage.jsx'));
const CategoryGamingPage = lazy(() => import('./components/pages/CategoryGamingPage.jsx'));
const DashboardPage = lazy(() => import('./components/pages/DashboardPage.jsx'));
const FindYourProductsPage = lazy(() => import('./components/pages/FindYourProductsPage.jsx'));
export default function App(){
    return <BrowserRouter>
    <ProductSearchProvider>
    <Routes>
    <Route element={<AppLayout/>}>
    <Route index element={<Navigate to="/dashboard" replace/>}/>
    <Route path="my-products" element={<MyProductsPage/>} />
    <Route path="notifications" element={<NotificationsPage/>} />
    <Route path="category-home-appliances" element={<CategoryHomeAppliancesPage/>} />
    <Route path="daily-deals" element={<DailyDealsPage/>} />
    <Route path="tvs" element={<TvsPage/>} />
    <Route path="dashboard" element={<DashboardPage/>} />
    <Route path="find-your-products" element={<FindYourProductsPage/>} />
    <Route path="track-new-product" element={<TrackNewProductPage/>} />
    <Route path="audio" element={<AudioPage/>} />
    <Route path="account-preferences" element={<AccountPreferencesPage/>} />
    <Route path="category-gaming" element={<CategoryGamingPage/>} />
    <Route path="offers-emi" element={<OffersEmiPage/>} />
    <Route path="price-drops" element={<PriceDropsPage/>} />
    <Route path="saved-filters" element={<SavedFiltersPage/>} />
    <Route path="products/:id" element={<ProductDetailPage/>} />
    <Route path="product-detail" element={<Navigate to="/find-your-products" replace/>} />
    <Route path="for-you" element={<ForYouPage/>} />
    <Route path="price-parity-arbitrage" element={<PriceParityArbitragePage/>} />
    <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
    </Route>
    </Routes>
    </ProductSearchProvider>
    </BrowserRouter>
}
