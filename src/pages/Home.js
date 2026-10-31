import React from 'react';
import { useI18n, Rich } from '../i18n';
import Icon from '../components/Icon';
import { SectionHead, CheckList } from '../components/ui';

function HeroArt() {
  // Decor: contururi topografice stilizate (fără animație).
  return (
    <svg className="hero-art" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ha" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1D4E89" stopOpacity=".55" />
          <stop offset="1" stopColor="#14532D" stopOpacity=".55" />
        </linearGradient>
      </defs>
      {[0.38, 0.55, 0.72, 0.89, 1.06, 1.23, 1.4].map((k, i) => (
        <path
          key={k}
          d="M300 150c78 0 156 44 164 116s-34 146-108 170-158 8-196-54-24-148 26-190c32-28 74-42 114-42z"
          transform={`translate(300 300) scale(${k}) translate(-300 -300)`}
          fill="none"
          stroke="url(#ha)"
          strokeWidth={i === 0 ? 2.2 : 1.3}
          vectorEffect="non-scaling-stroke"
          opacity={1 - i * 0.11}
        />
      ))}
      <circle cx="332" cy="262" r="7" fill="#14532D" />
      <circle cx="332" cy="262" r="16" fill="none" stroke="#14532D" strokeOpacity=".35" />
    </svg>
  );
}

export default function Home() {
  const { t, href } = useI18n();
  const h = t.home;
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="badge">{h.hero.badge}</p>
            <h1 id="hero-title" className="h1">{h.hero.title} <span className="accent">{h.hero.accent}</span></h1>
            <p className="lead lead-lg">{h.hero.sub}</p>
            <div className="actions">
              <a href={href('solutions')} className="btn btn-primary">{h.hero.cta1} <Icon name="arrow" size={18} /></a>
              <a href="#contact" className="btn btn-ghost">{h.hero.cta2}</a>
            </div>
            <ul className="creds">
              {h.hero.creds.map(c => <li key={c}><Icon name="check" size={16} />{c}</li>)}
            </ul>
            <dl className="stats">
              {h.hero.stats.map(s => (
                <div key={s.label}><dt>{s.label}</dt><dd>{s.num}</dd></div>
              ))}
            </dl>
          </div>
          <HeroArt />
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

      <section className="section alt" id="about" aria-labelledby="about-title">
        <div className="container about-grid">
          <div>
            <SectionHead id="about-title" eyebrow={h.about.label} title={h.about.title} accent={h.about.accent} center={false} />
            <p className="prose"><Rich text={h.about.p1} /></p>
            <p className="prose">{h.about.p2}</p>
            <CheckList items={h.about.highlights} className="highlights" />
            <a href="#contact" className="btn btn-primary">{h.about.cta}</a>
          </div>
          <ul className="values">
            {h.about.values.map(v => (
              <li key={v.title} className="card">
                <span className="icon-tile"><Icon name={v.icon} /></span>
                <h3 className="h4">{v.title}</h3>
                <p>{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="portfolio" aria-labelledby="portfolio-title">
        <div className="container">
          <SectionHead id="portfolio-title" eyebrow={h.portfolio.label} title={h.portfolio.title} accent={h.portfolio.accent} sub={h.portfolio.sub} />
          <ul className="cards cards-portfolio">
            {h.portfolio.projects.map(p => (
              <li key={p.title} className="card project">
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
