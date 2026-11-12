import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ onMenu, menuOpen }) {
  const navigate = useNavigate();
  function search(event) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('query').trim();
    if (query) navigate('/find-your-products?q=' + encodeURIComponent(query));
  }
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <button id="sidebar-toggle" type="button" className="header-icon" onClick={onMenu}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="primary-navigation" aria-expanded={menuOpen}>
          <span className="material-symbols-outlined" aria-hidden="true">{menuOpen ? 'menu_open' : 'menu'}</span>
        </button>
        <form className="header-search" role="search" onSubmit={search}>
          <span className="material-symbols-outlined text-outline" aria-hidden="true">search</span>
          <input type="search" name="query" aria-label="Search products" placeholder="Search products and deals…" />
        </form>
        <span className="hidden shrink-0 text-xs text-outline xl:block">Amazon + Flipkart search</span>
        <div className="header-actions">
          <Link to="/notifications" className="header-icon" aria-label="Notifications">
            <span className="material-symbols-outlined" aria-hidden="true">notifications</span>
          </Link>
          <Link to="/track-new-product" className="track-product-link">
            <span className="material-symbols-outlined" aria-hidden="true">add</span>
            <span>Track Product</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
