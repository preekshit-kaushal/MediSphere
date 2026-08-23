import React, { useEffect, useRef, useState } from 'react';
import { navLinks, pages } from '../data/siteData';

export function AppLink({ to, go, children, onClick, ...props }) {
  return (
    <a
      href={to}
      onClick={event => {
        event.preventDefault();
        onClick?.(event);
        go(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

export function Brand({ go }) {
  return (
    <AppLink to="/" go={go} className="brand">
      <span className="brand-mark" />
      <span className="brand-name">MediSphere</span>
    </AppLink>
  );
}

export default function Navigation({ go, active }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setHidden(scrollY > 120 && scrollY > lastScroll.current);
      lastScroll.current = scrollY;
    };

    addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`nav ${hidden ? 'is-hidden' : ''}`} aria-label="Primary">
        <Brand go={go} />
        <ul className="nav-links">
          {navLinks.map(([to, label]) => (
            <li key={to}>
              <AppLink
                to={to}
                go={go}
                className={active === pages[to] ? 'active' : ''}
              >
                {label}
              </AppLink>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <AppLink
            to="/appointment"
            go={go}
            className="btn btn-primary"
            style={{ padding: '10px 18px', fontSize: 13 }}
          >
            Book →
          </AppLink>
          <button
            className="nav-burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <button className="close" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
        {navLinks.map(([to, label]) => (
          <AppLink key={to} to={to} go={go} onClick={() => setOpen(false)}>
            {label}
          </AppLink>
        ))}
        <AppLink to="/appointment" go={go} onClick={() => setOpen(false)}>
          Book Appointment →
        </AppLink>
      </div>
    </>
  );
}
