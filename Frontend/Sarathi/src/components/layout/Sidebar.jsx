import React from 'react';
import { NavLink } from 'react-router-dom';
import { navGroups } from '../config/navigation';

export default function Sidebar({ open, onClose, onNavigate, modal = false }) {
  return <>
    {open && modal && <button type="button" className="sidebar-backdrop" onClick={onClose} aria-label="Close navigation" />}
    <aside id="primary-navigation" className={'app-sidebar' + (open ? ' is-open' : '')}
      role={open && modal ? 'dialog' : undefined} aria-modal={open && modal ? true : undefined} aria-label="Main navigation">
      <div className="sidebar-brand">
        <NavLink to="/dashboard" onClick={onNavigate} className="flex items-center gap-2 text-xl font-bold text-primary">
          SARATHI
        </NavLink>
        <button type="button" className="header-icon sidebar-close" onClick={onClose} aria-label="Close navigation">
          <span className="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      </div>
      <nav className="sidebar-navigation" aria-label="Main navigation">
        {navGroups.map(group => <section key={group.title}>
          <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-outline">{group.title}</h2>
          <div className="space-y-1">
            {group.items.map(([label, path]) => <NavLink key={path} to={'/' + path} onClick={onNavigate}
              className={({ isActive }) => 'sidebar-link' + (isActive ? ' is-active' : '')}>{label}</NavLink>)}
          </div>
        </section>)}
      </nav>
      <NavLink to="/account-preferences" onClick={onNavigate} className="sidebar-settings">Account preferences</NavLink>
    </aside>
  </>;
}
