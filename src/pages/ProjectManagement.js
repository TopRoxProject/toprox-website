import React from 'react';
import { useI18n } from '../i18n';
import Icon from '../components/Icon';
import { CheckList } from '../components/ui';

export default function ProjectManagement() {
  const { t } = useI18n();
  const c = t.pmCourse;
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container hero-split">
          <div>
            <p className="badge">{c.hero.badge}</p>
            <h1 id="page-title" className="h1">{c.hero.title} <span className="accent">{c.hero.accent}</span></h1>
            <p className="lead lead-lg">{c.hero.sub}</p>
            <div className="actions">
              <a href="#contact" className="btn btn-primary">{c.hero.cta1}</a>
              <a href="#pm-learn" className="btn btn-ghost">{c.hero.cta2}</a>
            </div>
          </div>
          <div className="hero-tile" aria-hidden="true"><Icon name="compass" size={150} /></div>
        </div>
      </section>

      <section className="section cat-body" id="pm-learn" aria-labelledby="learn-title">
        <div className="container">
          <div className="two-col">
            <div className="card">
              <p className="eyebrow">{c.learn.label}</p>
              <h2 id="learn-title" className="h3">{c.learn.title}</h2>
              <CheckList items={c.learn.items} />
            </div>
            <div className="card">
              <h2 className="h3">{c.who.title}</h2>
              <CheckList items={c.who.items} />
            </div>
          </div>
          <h2 className="label mt-lg">{c.why.title}</h2>
          <ul className="chips chips-lg">{c.why.chips.map(x => <li key={x}>{x}</li>)}</ul>
          <p className="muted mt">{c.note}</p>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="pm-cta">
        <div className="container center-text">
          <h2 id="pm-cta" className="h2">{c.cta.title}</h2>
          <p className="lead">{c.cta.text}</p>
          <a href="#contact" className="btn btn-primary">{c.cta.button}</a>
        </div>
      </section>
    </>
  );
}
