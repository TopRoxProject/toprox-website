import React, { useState } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'Acasă', href: '#hero' },
  { label: 'Despre', href: '#about' },
  { label: 'Servicii', href: '#services' },
  { label: 'Portofoliu', href: '#portfolio' },
  { label: 'Testimoniale', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          <img src="/images/logo.png" alt="TopRox Project Logo" />
          <span className="nav-brand">
            <strong>TopRox</strong> Project
          </span>
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
              Contactează-ne
            </a>
          </li>
        </ul>

        <button
          className={`burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Meniu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
