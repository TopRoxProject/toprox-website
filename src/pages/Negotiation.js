import React, { useRef, useState } from 'react';
import { useI18n } from '../i18n';
import Icon from '../components/Icon';
import { SectionHead } from '../components/ui';

const TABS = ['gm', 'pm'];

export default function Negotiation() {
  const { t } = useI18n();
  const N = t.negotiation;
  const [tab, setTab] = useState('gm');
  const refs = useRef({});

  // Tastele săgeată mută selecția între ediții (tiparul ARIA pentru tab-uri).
  const onKey = e => {
    const i = TABS.indexOf(tab);
    let next = null;
    if (e.key === 'ArrowRight') next = TABS[(i + 1) % TABS.length];
    if (e.key === 'ArrowLeft') next = TABS[(i + TABS.length - 1) % TABS.length];
    if (e.key === 'Home') next = TABS[0];
    if (e.key === 'End') next = TABS[TABS.length - 1];
    if (next) { e.preventDefault(); setTab(next); refs.current[next].focus(); }
  };


  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container hero-split">
          <div>
            <p className="badge">{N.hero.badge}</p>
            <h1 id="page-title" className="h1">{N.hero.title} <span className="accent">{N.hero.accent}</span></h1>
            <p className="lead lead-lg">{N.hero.sub}</p>
            <dl className="stats stats-4">
              {N.hero.stats.map(([n, l]) => <div key={l}><dt>{l}</dt><dd>{n}</dd></div>)}
            </dl>
            <div className="actions">
              <a href="#editions" className="btn btn-primary">{N.hero.cta1}</a>
              <a href="#contact" className="btn btn-ghost">{N.hero.cta2}</a>
            </div>
          </div>
          <figure className="card hero-quote">
            <blockquote><p>{N.hero.quote}</p></blockquote>
            <figcaption>{N.hero.quoteSrc}</figcaption>
          </figure>
        </div>
      </section>

      <div className="tabs-bar" id="editions">
        <div className="container">
          <div role="tablist" aria-label={N.tabsLabel} className="tabs">
            {TABS.map(k => (
              <button
                key={k}
                ref={el => { refs.current[k] = el; }}
                role="tab"
                id={`tab-${k}`}
                type="button"
                aria-selected={tab === k}
                aria-controls={`panel-${k}`}
                tabIndex={tab === k ? 0 : -1}
                className="tab"
                onClick={() => setTab(k)}
                onKeyDown={onKey}
              >
                {N.tabs[k]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {TABS.map(k => (
      <div role="tabpanel" id={`panel-${k}`} aria-labelledby={`tab-${k}`} hidden={tab !== k} key={k}>
        <section className="section alt" aria-labelledby={`for-title-${k}`}>
          <div className="container">
            <SectionHead id={`for-title-${k}`} eyebrow={N.for.label} title={N.for[k].title} accent={N.for[k].accent} />
            <ul className="chips chips-lg center-chips">{N.for[k].list.map(x => <li key={x}><Icon name="check" size={16} /> {x}</li>)}</ul>
          </div>
        </section>

        <section className="section" aria-labelledby={`modules-title-${k}`}>
          <div className="container">
            <SectionHead id={`modules-title-${k}`} eyebrow={N.modules.label} title={N.modules[k].title} accent={N.modules[k].accent} sub={N.modules.sub} />
            <ol className="cards cards-3 modules">
              {N.modules[k].list.map(([title, desc], i) => (
                <li key={title} className="card">
                  <span className="module-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h4">{title}</h3>
                  <p>{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section alt" aria-labelledby={`tools-title-${k}`}>
          <div className="container">
            <SectionHead id={`tools-title-${k}`} eyebrow={N.tools.label} title={N.tools.title} accent={N.tools.accent} sub={N.tools.sub} />
            <ul className="cards cards-3">
              {N.tools[k].map(([title, desc]) => (
                <li key={title} className="card">
                  <span className="tag">{N.tools.tag}</span>
                  <h3 className="h4 mt">{title}</h3>
                  <p>{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby={`scen-title-${k}`}>
          <div className="container">
            <SectionHead id={`scen-title-${k}`} eyebrow={N.scenarios.label} title={N.scenarios[k].title} accent={N.scenarios[k].accent} sub={N.scenarios.sub} />
            <ul className="cards cards-3">
              {N.scenarios[k].list.map(([title, desc]) => (
                <li key={title} className="card"><h3 className="h4">{title}</h3><p>{desc}</p></li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      ))}

      <section className="quote-band" aria-label={N.proverb.sub}>
        <div className="container center-text">
          <blockquote><p className="big-quote">{N.proverb.text}</p></blockquote>
          <p className="lead">{N.proverb.sub}</p>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="neg-cta">
        <div className="container center-text">
          <h2 id="neg-cta" className="h2">{N.cta.title}</h2>
          <p className="lead">{N.cta.text}</p>
          <a href="#contact" className="btn btn-primary">{N.cta.button}</a>
        </div>
      </section>
    </>
  );
}
