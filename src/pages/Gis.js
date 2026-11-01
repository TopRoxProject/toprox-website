import React from 'react';
import { useI18n } from '../i18n';
import Icon from '../components/Icon';
import { SectionHead, CheckList } from '../components/ui';

export default function Gis() {
  const { t, href } = useI18n();
  const g = t.gis;
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container hero-split">
          <div>
            <p className="badge">{g.hero.badge}</p>
            <h1 id="page-title" className="h1">{g.hero.title} <span className="accent">{g.hero.accent}</span></h1>
            <p className="lead lead-lg">{g.hero.sub}</p>
            <div className="actions">
              <a href="#gis-courses" className="btn btn-primary">{g.hero.cta1}</a>
              <a href="#contact" className="btn btn-ghost">{g.hero.cta2}</a>
            </div>
          </div>
          <figure className="hero-map">
            <img src="/images/mediu/harta-hipsometrica.jpg" alt={g.hero.map.alt} width="724" height="495" decoding="async" />
            <figcaption>{g.hero.map.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section alt" aria-labelledby="why-title">
        <div className="container">
          <SectionHead id="why-title" eyebrow={g.why.label} title={g.why.title} accent={g.why.accent} sub={g.why.sub} />
          <ul className="cards cards-4">
            {g.why.items.map(i => (
              <li key={i.title} className="card">
                <span className="icon-tile"><Icon name={i.icon} /></span>
                <h3 className="h4">{i.title}</h3>
                <p>{i.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="gis-courses" aria-labelledby="courses-title">
        <div className="container">
          <SectionHead id="courses-title" eyebrow={g.services.label} title={g.services.title} accent={g.services.accent} sub={g.services.sub} />
          <ul className="cards cards-3">
            {g.services.items.map(s => (
              <li key={s.title} className="card course">
                <div className="card-top">
                  <span className="icon-tile"><Icon name={s.icon} /></span>
                  <span className="tag">{s.tag}</span>
                </div>
                <h3 className="h3">{s.title}</h3>
                <p>{s.short}</p>
                <CheckList items={s.details} className="small" />
                {s.link && <a className="text-link" href={href(s.link, 'orice-domeniu')}>{t.common.labels.learnMore} <Icon name="arrow" size={16} /></a>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section alt" aria-labelledby="tools-title">
        <div className="container">
          <SectionHead id="tools-title" eyebrow={g.tools.label} title={g.tools.title} accent={g.tools.accent} />
          <ul className="tool-badges">{g.tools.list.map(x => <li key={x}>{x}</li>)}</ul>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="gis-cta">
        <div className="container center-text">
          <h2 id="gis-cta" className="h2">{g.cta.title}</h2>
          <p className="lead">{g.cta.text}</p>
          <a href="#contact" className="btn btn-primary">{g.cta.button}</a>
        </div>
      </section>
    </>
  );
}
