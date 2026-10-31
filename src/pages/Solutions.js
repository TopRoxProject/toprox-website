import React from 'react';
import { useI18n } from '../i18n';
import Icon from '../components/Icon';
import { CheckList, Flow, Shot } from '../components/ui';

// Imaginile (fișiere + dimensiuni); textele alternative și legendele vin din dicționar.
const SHOTS = {
  'intreruperi-scurte': [
    { src: '/images/solutii/harta-plecare.jpg', w: 1176, h: 702 },
    { src: '/images/solutii/raport-dimineata.jpg', w: 689, h: 719 },
  ],
  stalpi: [
    { src: '/images/solutii/stalpi-harta.jpg', w: 1440, h: 842 },
    { src: '/images/solutii/stalpi-operatori.jpg', w: 1440, h: 465 },
  ],
};
const EGIE_SHOTS = [
  { src: '/images/egie/egie-temperatura.jpg', w: 600, h: 565 },
  { src: '/images/egie/egie-expunere.jpg', w: 600, h: 565 },
  { src: '/images/egie/egie-regula-r1.jpg', w: 1224, h: 405, wide: true },
  { src: '/images/egie/egie-sumar.jpg', w: 1400, h: 833 },
  { src: '/images/egie/egie-zone-prioritare.jpg', w: 1224, h: 860 },
];

function AppBlock({ app, shots }) {
  return (
    <div className="panel app-block">
      <p className="eyebrow">{app.eyebrow}</p>
      <h4 className="h3">{app.title}</h4>
      <p className="prose">{app.intro}</p>
      <Flow label={app.flowLabel} steps={app.flow} />
      <ol className="steps">
        {app.steps.map(([b, rest]) => <li key={b}><strong>{b}</strong>{rest}</li>)}
      </ol>
      <div className="shots">
        {shots.map((s, i) => <Shot key={s.src} {...s} alt={app.shots[i].alt} caption={app.shots[i].caption} />)}
      </div>
    </div>
  );
}

function Solution({ s }) {
  const { t } = useI18n();
  const L = t.common.labels;
  return (
    <article className="solution" id={s.id} aria-labelledby={`${s.id}-title`}>
      <div className="solution-head">
        <h3 id={`${s.id}-title`} className="h3 solution-title">{s.title}</h3>
        <p className="prose">{s.intro}</p>
        <p className="norm">{s.norm}</p>
      </div>
      <div className="two-col">
        <div><h4 className="label">{L.analyze}</h4><CheckList items={s.analyze} /></div>
        <div><h4 className="label">{L.get}</h4><CheckList items={s.get} /></div>
      </div>
      <p className="deliverable"><span>{L.deliverable}</span>{s.deliverable}</p>
      {s.advantages && (
        <div className="advantages">
          <h4 className="label">{L.advantages}</h4>
          <ul className="cards cards-4">
            {s.advantages.map(([a, b]) => <li key={a} className="card"><strong>{a}</strong><p>{b}</p></li>)}
          </ul>
        </div>
      )}
      {s.app && <AppBlock app={s.app} shots={SHOTS[s.id]} />}
    </article>
  );
}

export default function Solutions() {
  const { t } = useI18n();
  const S = t.solutions;
  const L = t.common.labels;
  const e = S.egie;
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container">
          <p className="badge">{S.hero.badge}</p>
          <h1 id="page-title" className="h1">{S.hero.title} <span className="accent">{S.hero.accent}</span></h1>
          <p className="lead lead-lg">{S.hero.sub}</p>
          <nav aria-label={S.hero.tocLabel} className="toc">
            <ul>
              <li><a href="#retele">{S.hero.toc[0]}</a></li>
              <li><a href="#cimitire">{S.hero.toc[1]}</a></li>
              <li><a href="#orice-domeniu">{S.hero.toc[2]}</a></li>
            </ul>
          </nav>
        </div>
      </section>

      <section className="section" id="retele" aria-labelledby="cat1-title">
        <div className="container">
          <header className="cat-head">
            <div><p className="eyebrow">{S.cat1.num}</p><h2 id="cat1-title" className="h2">{S.cat1.title}</h2></div>
            <p className="prose">{S.cat1.desc}</p>
          </header>
          {S.items.map(s => <Solution key={s.id} s={s} />)}
          <div className="two-col notes">
            <div className="card"><h3 className="h4">{S.notes.how.title}</h3><p>{S.notes.how.text}</p></div>
            <div className="card"><h3 className="h4">{S.notes.excl.title}</h3><p>{S.notes.excl.text}</p></div>
          </div>
        </div>
      </section>

      <section className="section alt" id="cimitire" aria-labelledby="cat2-title">
        <div className="container">
          <header className="cat-head">
            <div><p className="eyebrow">{S.cat2.num}</p><h2 id="cat2-title" className="h2">{S.cat2.title}</h2></div>
            <div><h3 className="h3 solution-title">{S.cat2.subtitle}</h3><p className="prose">{S.cat2.desc}</p></div>
          </header>
          <ul className="plans">
            {S.cat2.plans.map(p => (
              <li key={p.name} className={`card plan ${p.recommended ? 'recommended' : ''}`}>
                {p.recommended && <span className="plan-flag">{L.recommended}</span>}
                <h3 className="h3">{p.name}</h3>
                <p className="muted">{p.for}</p>
                <CheckList items={p.include} />
                <a href="#contact" className={`btn ${p.recommended ? 'btn-primary' : 'btn-outline'}`}>
                  {L.requestOffer}<span className="sr-only">: {p.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="note">{S.cat2.fine}</p>
        </div>
      </section>

      <section className="section" id="orice-domeniu" aria-labelledby="any-title">
        <div className="container">
          <header className="cat-head">
            <div><p className="eyebrow">{S.any.num}</p><h2 id="any-title" className="h2">{S.any.title}</h2></div>
            <p className="prose">{S.any.desc}</p>
          </header>
          <ul className="cards cards-3 focus">
            {S.any.focus.map(f => (
              <li key={f.title} className="card">
                <span className="icon-tile"><Icon name={f.icon} /></span>
                <h3 className="h3">{f.title}</h3>
                <p>{f.intro}</p>
                <CheckList items={f.points} className="small" />
              </li>
            ))}
          </ul>

          <div className="panel egie" id="egie" aria-labelledby="egie-title">
            <div className="egie-head">
              <div>
                <p className="eyebrow">{e.eyebrow}</p>
                <h3 id="egie-title" className="h3">{e.title}</h3>
              </div>
              <span className="flag">{e.flag}</span>
            </div>
            <p className="prose">{e.intro}</p>
            <Flow label={e.flowLabel} steps={e.flow} />
            <p className="muted mt">{e.rulesLabel}</p>
            <ul className="chips">{e.rules.map((r, i) => <li key={r}><span className="rule-no">R{i + 1}</span> {r}</li>)}</ul>
            <p className="status"><strong>{e.statusLabel}</strong> {e.status}</p>
            <div className="egie-demo">
              <div className="egie-demo-head">
                <div>
                  <h4 className="h4">{e.demoTitle}</h4>
                  <p className="period"><strong>{e.periodLabel}</strong> {e.period}</p>
                  <p className="prose small-text">{e.demoText}</p>
                </div>
                <a className="btn btn-outline" href="/demo/egie-raport-sibiu" target="_blank" rel="noopener" hrefLang="en">
                  {e.demoCta} <Icon name="external" size={16} /><span className="sr-only"> {t.common.newTab}</span>
                </a>
              </div>
              <div className="shots">
                {EGIE_SHOTS.map((s, i) => <Shot key={s.src} {...s} alt={e.shots[i].alt} caption={e.shots[i].caption} />)}
              </div>
            </div>
          </div>

          <p className="muted mt-lg">{S.any.othersLabel}</p>
          <ul className="chips">{S.any.others.map(o => <li key={o}>{o}</li>)}</ul>
          <div className="two-col mt-lg">
            <div><h3 className="label">{S.any.helpTitle}</h3><CheckList items={S.any.help} /></div>
            <div>
              <h3 className="label">{S.any.startTitle}</h3>
              <p className="prose">{S.any.startText}</p>
              <a href="#contact" className="btn btn-outline">{S.any.startCta}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="sol-cta">
        <div className="container center-text">
          <h2 id="sol-cta" className="h2">{S.cta.title}</h2>
          <p className="lead">{S.cta.text}</p>
          <a href="#contact" className="btn btn-primary">{S.cta.button}</a>
          <p className="refs">{S.refs}</p>
        </div>
      </section>
    </>
  );
}
