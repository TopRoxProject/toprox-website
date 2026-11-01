import React from 'react';
import { useI18n } from '../i18n';
import { LANGS, LANG_META, ROUTES } from '../i18n/config';

export default function NotFound() {
  const { t, href } = useI18n();
  const nf = t.common.notFound;
  const n = t.common.nav;
  return (
    <section className="page-hero center-text" aria-labelledby="page-title">
      <div className="container narrow">
        <p className="big-code" aria-hidden="true">404</p>
        <h1 id="page-title" className="h1">{nf.title}</h1>
        <p className="lead">{nf.text}</p>
        <div className="actions center-actions">
          <a href={href('home')} className="btn btn-primary">{nf.home}</a>
          <a href={href('solutions')} className="btn btn-ghost">{n.solutions}</a>
          <a href={href('gis')} className="btn btn-ghost">{n.gisCourses}</a>
          <a href={href('negotiation')} className="btn btn-ghost">{n.negotiation}</a>
        </div>
        <ul className="lang-inline">
          {LANGS.filter(l => l !== 'ro').map(l => (
            <li key={l}><a href={ROUTES[l].home} hrefLang={l} lang={l}>{LANG_META[l].name}</a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
