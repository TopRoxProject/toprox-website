import React from 'react';
import { useI18n } from '../i18n';
import { EMAIL } from '../i18n/config';
import Icon from './Icon';

const YEAR = 2026;

export default function Footer() {
  const { t, href } = useI18n();
  const f = t.common.footer;
  const n = t.common.nav;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href={href('home')} className="brand" aria-label={n.home}>
            <img src="/images/logo-transparent.png" alt="" width="40" height="40" />
            <span className="brand-name" translate="no"><strong>TopRox</strong> Project</span>
          </a>
          <p className="footer-tagline">{f.tagline}</p>
          <p className="footer-about">{f.about}</p>
          <a className="footer-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>

        <nav aria-label={f.explore}>
          <h2 className="footer-h">{f.explore}</h2>
          <ul>
            <li><a href={href('solutions')}>{n.solutions}</a></li>
            <li><a href={href('gis')}>{n.gisCourses}</a></li>
            <li><a href={href('negotiation')}>{n.negotiation}</a></li>
            <li><a href={href('home', 'portfolio')}>{n.portfolio}</a></li>
            <li><a href={href('home', 'about')}>{n.about}</a></li>
          </ul>
        </nav>

        <nav aria-label={f.legal}>
          <h2 className="footer-h">{f.legal}</h2>
          <ul>
            <li><a href={href('privacy')}>{f.privacy}</a></li>
            <li><a href={href('accessibility')}>{f.accessibility}</a></li>
          </ul>
          <h2 className="footer-h footer-h-follow">{f.follow}</h2>
          <ul className="social">
            <li>
              <a href="https://www.linkedin.com/company/toprox-project-srl/" target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" /> LinkedIn <span className="sr-only">{t.common.newTab}</span>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/profile.php?id=100087336002775" target="_blank" rel="noopener noreferrer">
                <Icon name="facebook" /> Facebook <span className="sr-only">{t.common.newTab}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>© {YEAR} <span translate="no">TopRox Project SRL</span>. {f.rights}</p>
        <p>{f.noCookies}</p>
        <a href="#top" className="to-top"><Icon name="up" size={18} /> {f.backToTop}</a>
      </div>
    </footer>
  );
}
