import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { LANGS, LANG_META, ROUTES, SOLUTION_PAGES } from '../i18n/config';
import Icon from './Icon';

// Meniu derulant accesibil: se deschide cu click/Enter, se închide cu Escape sau click în afară.
function useDisclosure() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const btn = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); btn.current && btn.current.focus(); } };
    const onClick = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);
  return { open, setOpen, ref, btn };
}

export default function Header({ notFound }) {
  const { lang, page, t, href } = useI18n();
  const n = t.common.nav;
  const [menu, setMenu] = useState(false);
  const courses = useDisclosure();
  const sol = useDisclosure();
  const groups = t.solutions.menu.groups;
  const langs = useDisclosure();
  const current = p => (!notFound && page === p ? 'page' : undefined);

  useEffect(() => {
    if (!menu) return undefined;
    const onKey = e => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">{t.common.skip}</a>
      <div className="header-inner">
        <a href={ROUTES[lang].home} className="brand" aria-label={n.home}>
          <img src="/images/logo-transparent.png" alt="" width="40" height="40" />
          <span className="brand-name" translate="no"><strong>TopRox</strong> Project</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="site-menu"
          onClick={() => setMenu(!menu)}
        >
          <Icon name={menu ? 'close' : 'menu'} size={24} />
          <span className="sr-only">{menu ? n.closeMenu : n.openMenu}</span>
        </button>

        <nav id="site-menu" className={`site-nav ${menu ? 'open' : ''}`} aria-label={n.label}>
          <ul className="nav-list">
            <li className="has-sub has-mega" ref={sol.ref}>
              <button
                type="button"
                ref={sol.btn}
                className={`nav-sub-btn ${['solutions', 'utilities', 'cemeteries', 'environment'].includes(page) ? 'is-current' : ''}`}
                aria-expanded={sol.open}
                aria-controls="sub-solutions"
                onClick={() => { sol.setOpen(!sol.open); courses.setOpen(false); }}
              >
                {n.solutions} <Icon name="chevron" size={16} className="chev" />
              </button>
              <div id="sub-solutions" className={`mega ${sol.open ? 'open' : ''}`}>
                <ul className="mega-grid">
                  {groups.map(g => (
                    <li key={g.anchor} className="mega-group">
                      <a className="mega-title" href={SOLUTION_PAGES[g.anchor] ? href(SOLUTION_PAGES[g.anchor]) : href('solutions', g.anchor)} aria-current={current(SOLUTION_PAGES[g.anchor])} onClick={() => { sol.setOpen(false); setMenu(false); }}>{g.title}</a>
                      {g.items.length > 0 && (
                        <ul>
                          {g.items.map(i => (
                            <li key={i.anchor}>
                              <a href={href(SOLUTION_PAGES[g.anchor] || 'solutions', i.anchor)} onClick={() => { sol.setOpen(false); setMenu(false); }}>{i.label}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                <a className="mega-all" href={href('solutions')} aria-current={current('solutions')} onClick={() => setMenu(false)}>
                  {n.allSolutions} <Icon name="arrow" size={16} />
                </a>
              </div>
            </li>
            <li className="has-sub" ref={courses.ref}>
              <button
                type="button"
                ref={courses.btn}
                className={`nav-sub-btn ${['gis', 'negotiation', 'pm'].includes(page) ? 'is-current' : ''}`}
                aria-expanded={courses.open}
                aria-controls="sub-courses"
                onClick={() => { courses.setOpen(!courses.open); sol.setOpen(false); }}
              >
                {n.courses} <Icon name="chevron" size={16} className="chev" />
              </button>
              <ul id="sub-courses" className={`sub-menu ${courses.open ? 'open' : ''}`}>
                <li><a href={href('gis')} aria-current={current('gis')}><strong>{n.gisCourses}</strong><span>{n.gisCoursesDesc}</span></a></li>
                <li><a href={href('negotiation')} aria-current={current('negotiation')}><strong>{n.negotiation}</strong><span>{n.negotiationDesc}</span></a></li>
                <li><a href={href('pm')} aria-current={current('pm')}><strong>{n.pmCourse}</strong><span>{n.pmCourseDesc}</span></a></li>
              </ul>
            </li>
            <li><a href={href('home', 'portfolio')}>{n.portfolio}</a></li>
            <li><a href={href('about')} aria-current={current('about')}>{n.about}</a></li>
          </ul>

          <div className="nav-actions">
            <div className="lang" ref={langs.ref}>
              <button
                type="button"
                ref={langs.btn}
                className="lang-btn"
                aria-expanded={langs.open}
                aria-controls="lang-list"
                onClick={() => langs.setOpen(!langs.open)}
              >
                <Icon name="globeLang" size={18} />
                <span aria-hidden="true">{LANG_META[lang].short}</span>
                <span className="sr-only">{n.language}: {LANG_META[lang].name}. {n.changeLanguage}</span>
                <Icon name="chevron" size={14} className="chev" />
              </button>
              <ul id="lang-list" className={`lang-list ${langs.open ? 'open' : ''}`}>
                {LANGS.map(l => (
                  <li key={l}>
                    <a
                      href={ROUTES[l][notFound ? 'home' : page]}
                      hrefLang={LANG_META[l].htmlLang}
                      lang={LANG_META[l].htmlLang}
                      aria-current={l === lang ? 'true' : undefined}
                    >
                      <span className="lang-code" aria-hidden="true">{LANG_META[l].short}</span>
                      {LANG_META[l].name}
                      {l === lang && <Icon name="check" size={16} className="lang-check" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contact" className="btn btn-primary btn-sm" onClick={() => setMenu(false)}>{n.contact}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
