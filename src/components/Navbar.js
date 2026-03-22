import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { label: 'Acasă', href: '/' },
  { label: 'Despre', href: '/#about' },
  { label: 'Servicii', href: '/#services' },
  { label: 'GIS', href: '/gis' },
  { label: 'Negociere', href: '/negociere' },
  { label: 'Portofoliu', href: '/#portfolio' },
  { label: 'Testimoniale', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleClick = (href) => {
    setOpen(false);
    if (href.startsWith('/#') && location.pathname !== '/') {
      window.location.href = href;
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="/" className="nav-logo">
          <img src="/images/logo.png" alt="TopRox Project Logo" />
          <span className="nav-brand">
            <strong>TopRox</strong> Project
          </span>
        </a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.label}>
              
                href={link.href}
                className={location.pathname === link.href ? 'active' : ''}
                onClick={() => handleClick(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/#contact" className="nav-cta" onClick={() => setOpen(false)}>
              Contactează-ne
            </a>
          </li>
        </ul>
        <button
          className={`burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Meniu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
