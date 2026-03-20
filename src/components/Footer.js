import React from 'react';
import './Footer.css';

const currentYear = new Date().getFullYear();

const footerLinks = {
  Servicii: [
    { label: 'Audit GDPR', href: '#services' },
    { label: 'Dezvoltare Software', href: '#services' },
    { label: 'Securitate IT', href: '#services' },
    { label: 'Infrastructură Cloud', href: '#services' },
    { label: 'Suport Tehnic', href: '#services' },
  ],
  Companie: [
    { label: 'Despre noi', href: '#about' },
    { label: 'Portofoliu', href: '#portfolio' },
    { label: 'Testimoniale', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Politică de confidențialitate', href: '#' },
    { label: 'Termeni și condiții', href: '#' },
    { label: 'Politică cookies', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#hero" className="footer-logo">
            <img src="/images/logo.png" alt="TopRox Project Logo" />
            <div>
              <span className="footer-name"><strong>TopRox</strong> Project</span>
              <span className="footer-slogan">Consultanță IT · Sibiu</span>
            </div>
          </a>
          <p className="footer-about">
            Soluții IT complete pentru afacerea ta — de la conformitate GDPR și securitate
            informatică, până la software personalizat și suport tehnic continuu.
          </p>
          <a href="mailto:toproxproject@gmail.com" className="footer-email">
            toproxproject@gmail.com
          </a>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div className="footer-col" key={section}>
            <h4>{section}</h4>
            <ul>
              {links.map(link => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© {currentYear} TopRox Project SRL · Toate drepturile rezervate</span>
          <span className="footer-gdpr-badge">
            🔒 Date protejate conform GDPR
          </span>
          <a href="#hero" className="back-to-top" aria-label="Înapoi sus">↑</a>
        </div>
      </div>

      <div className="footer-glow" />
    </footer>
  );
}
