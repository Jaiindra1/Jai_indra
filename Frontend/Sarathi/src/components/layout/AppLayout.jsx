import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import HamsterLoader from '../Hamster/HamsterLoader';

export default function AppLayout() {
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = desktop ? !collapsed : mobileOpen;
  const closeMenu = useCallback(() => {
    if (desktop) setCollapsed(true);
    else setMobileOpen(false);
    document.getElementById('sidebar-toggle')?.focus();
  }, [desktop]);
  const closeOnNavigate = useCallback(() => { if (!desktop) setMobileOpen(false); }, [desktop]);
  const toggleMenu = () => { if (desktop) setCollapsed(value => !value); else setMobileOpen(value => !value); };
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const resize = event => { setDesktop(event.matches); setMobileOpen(false); };
    media.addEventListener('change', resize);
    return () => media.removeEventListener('change', resize);
  }, []);
  useEffect(() => {
    if (desktop || !mobileOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = document.getElementById('primary-navigation');
    panel.querySelector('button').focus();
    function keyboard(event) {
      if (event.key === 'Escape') closeMenu();
      if (event.key === 'Tab') {
        const elements = [...panel.querySelectorAll('a[href], button')].filter(el => el.getClientRects().length);
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', keyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', keyboard);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [desktop, mobileOpen, closeMenu]);
  return <div className={'app-shell' + (open ? ' sidebar-open' : '')}>
    <a href="#page-content" className="skip-link">Skip to content</a>
    <Sidebar open={open} onClose={closeMenu} onNavigate={closeOnNavigate} modal={!desktop} />
    <div className="app-workspace">
      <Header onMenu={toggleMenu} menuOpen={open} />
      <div id="page-content" className="app-main" tabIndex={-1}>
        <Suspense fallback={<HamsterLoader />}><Outlet /></Suspense>
      </div>
    </div>
  </div>;
}
