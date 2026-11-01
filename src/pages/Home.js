import React from 'react';
import { useI18n, Rich } from '../i18n';
import Medallion from '../components/Medallion';
import Icon from '../components/Icon';
import { SectionHead, CheckList } from '../components/ui';

export default function Home() {
  const { t, href } = useI18n();
  const h = t.home;
  const A = t.aboutPage;
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="badge">{h.hero.badge}</p>
            <h1 id="hero-title" className="h1">{A.title} <span className="accent">{A.accent}</span></h1>
            <p className="lead lead-lg">{A.lead}</p>
            <div className="actions">
              <a href={href('solutions')} className="btn btn-primary">{h.hero.cta1} <Icon name="arrow" size={18} /></a>
              <a href="#contact" className="btn btn-ghost">{h.hero.cta2}</a>
            </div>
          </div>
          <Medallion />
        </div>
      </section>

      <section className="section alt creds-band" aria-labelledby="creds-title">
        <div className="container">
          <h2 id="creds-title" className="eyebrow center-text">{A.credsLabel}</h2>
          <ul className="cards cards-4 creds-cards">
            {A.creds.map(([k, v]) => (
              <li key={k} className="card">
                <p className="cred-key">{k}</p>
                <p>{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="offer-title">
        <div className="container">
          <SectionHead id="offer-title" eyebrow={h.offer.label} title={h.offer.title} accent={h.offer.accent} sub={h.offer.sub} />
          <ul className="cards cards-3">
            {h.offer.cards.map(c => (
              <li key={c.title} className="card card-hover offer-card">
                <div className="card-top">
                  <span className="icon-tile"><Icon name={c.icon} /></span>
                  <span className="tag">{c.tag}</span>
                </div>
                <h3 className="h3">{c.link ? <a className="stretched" href={href(c.link)}>{c.title}</a> : c.title}</h3>
                <p>{c.desc}</p>
                {c.points && <CheckList items={c.points} className="small" />}
                {c.link && <span className="more" aria-hidden="true">{t.common.labels.learnMore} <Icon name="arrow" size={16} /></span>}
              </li>
            ))}
          </ul>
          <div className="center-cta">
            <p>{h.offer.ctaText}</p>
            <a href="#contact" className="btn btn-primary">{h.offer.cta}</a>
          </div>
        </div>
      </section>

      <section className="section alt" id="portfolio" aria-labelledby="portfolio-title">
        <div className="container">
          <SectionHead id="portfolio-title" eyebrow={h.portfolio.label} title={h.portfolio.title} accent={h.portfolio.accent} sub={h.portfolio.sub} />
          <ul className="cards cards-portfolio">
            {h.portfolio.projects.map(p => (
              <li key={p.title} className="card project">
                {p.img && <img className="project-img" src={p.img} alt={p.imgAlt || `${t.common.labels.screenshotOf} ${p.title}`} width="640" height="380" loading="lazy" decoding="async" />}
                <div className="card-top">
                  <span className="tag">{p.tag}</span>
                  <span className="muted small-text">{p.cat}</span>
                </div>
                <h3 className="h3">{p.link ? <a href={href(p.link, p.anchor)}>{p.title}</a> : p.title}</h3>
                <p>{p.desc}</p>
                <ul className="chips" aria-label={t.common.labels.keyPoints}>
                  {p.tech.map(x => <li key={x}>{x}</li>)}
                </ul>
                <CheckList items={p.points} className="small" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="company-title">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">{A.companyLabel}</p>
            <h2 id="company-title" className="h2" translate="no">TopRox Project SRL</h2>
            <p className="prose"><Rich text={h.about.p1} /></p>
            <p className="prose">{h.about.p2}</p>
          </div>
          <div>
            <SectionHead title={A.valuesTitle} accent={A.valuesAccent} center={false} as="h3" />
            <ul className="values">
              {h.about.values.map(v => (
                <li key={v.title} className="card">
                  <span className="icon-tile"><Icon name={v.icon} /></span>
                  <h4 className="h4">{v.title}</h4>
                  <p>{v.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt" id="testimonials" aria-labelledby="testimonials-title">
        <div className="container">
          <SectionHead id="testimonials-title" eyebrow={h.testimonials.label} title={h.testimonials.title} accent={h.testimonials.accent} />
          <ul className="quotes">
            {h.testimonials.items.map(q => (
              <li key={q.name} className="card quote">
                <Icon name="quote" size={30} className="quote-icon" />
                <blockquote><p>{q.text}</p></blockquote>
                <p className="quote-author">
                  <span className="avatar" aria-hidden="true">{q.name[0]}</span>
                  <span><strong>{q.name}</strong><span>{q.role} · {q.company}</span></span>
                </p>
              </li>
            ))}
          </ul>
          {h.testimonials.note && <p className="note center-text">{h.testimonials.note}</p>}
        </div>
      </section>
    </>
  );
}
