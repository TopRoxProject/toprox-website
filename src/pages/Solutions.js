import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { SOLUTION_PAGES } from '../i18n/config';
import Icon from '../components/Icon';
import { CheckList, Flow, Shot } from '../components/ui';

// Imaginile (fișiere + dimensiuni); textele alternative și legendele vin din dicționar.
const SHOTS = {
  'intreruperi-scurte': [
    { src: '/images/solutii/harta-plecare.jpg', w: 1176, h: 702 },
    { src: '/images/solutii/raport-dimineata.jpg', w: 689, h: 719 },
  ],
  inventar: [
    { src: '/images/solutii/stalpi-harta.jpg', w: 1440, h: 842 },
    { src: '/images/solutii/stalpi-operatori.jpg', w: 1440, h: 465 },
  ],
};
const TOPIC_IMG = {
  geomorfologie: { src: '/images/mediu/teren-3d-cisnadioara.jpg', w: 705, h: 528 },
};
const PLAN_SHOT = { src: '/images/business/plan-strategic-grafice.jpg', w: 1400, h: 1055 };

// Grafic ilustrativ: tensiunea unui post pe 24 de ore (banda admisă +5% / −10%).
function VoltageChart({ c }) {
  return (
    <figure className="volt-chart">
      <svg role="img" aria-label={c.alt} viewBox="0 0 460 180" width="100%">
        <rect x="44" y="34" width="406" height="94" fill="#EDF5F0" />
        <line x1="44" y1="34" x2="450" y2="34" stroke="#14532D" strokeDasharray="4 3" />
        <line x1="44" y1="128" x2="450" y2="128" stroke="#14532D" strokeDasharray="4 3" />
        <line x1="44" y1="65" x2="450" y2="65" stroke="#9AA8B6" />
        <text x="38" y="38" fontSize="11" textAnchor="end" fill="#2E4257">+5%</text>
        <text x="38" y="69" fontSize="11" textAnchor="end" fill="#2E4257">230 V</text>
        <text x="38" y="132" fontSize="11" textAnchor="end" fill="#2E4257">−10%</text>
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.5" strokeLinejoin="round" points="44,60 77,58 110,62 143,70 176,56 209,40 230,31" />
        <polyline fill="none" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" points="230,31 246,22 267,19 288,24 304,32" />
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.5" strokeLinejoin="round" points="304,32 320,50 341,80 366,112 382,126" />
        <polyline fill="none" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" points="382,126 396,136 412,140 424,132" />
        <polyline fill="none" stroke="#1D4E89" strokeWidth="2.5" strokeLinejoin="round" points="424,132 436,110 450,82" />
        <text x="267" y="12" fontSize="11" textAnchor="middle" fill="#B45309" fontWeight="600">{c.pv}</text>
        <text x="404" y="160" fontSize="11" textAnchor="middle" fill="#B45309" fontWeight="600">{c.evening}</text>
        <text x="44" y="160" fontSize="11" fill="#526273">00:00</text>
        <text x="247" y="160" fontSize="11" textAnchor="middle" fill="#526273">12:00</text>
        <text x="450" y="176" fontSize="11" textAnchor="end" fill="#526273">24:00</text>
      </svg>
      <figcaption>{c.caption}</figcaption>
    </figure>
  );
}

const TOC = ['retele', 'cimitire', 'mediu', 'mentenanta', 'business', 'orice-domeniu'];

function TopicCard({ c, link }) {
  const img = c.img && TOPIC_IMG[c.id];
  return (
    <li className="card topic" id={c.id}>
      <span className="icon-tile"><Icon name={c.icon} /></span>
      <h3 className="h3">{c.title}</h3>
      <p>{c.intro}</p>
      {img && (
        <figure className="topic-img">
          <img src={img.src} alt={c.img.alt} width={img.w} height={img.h} loading="lazy" decoding="async" />
          <figcaption>{c.img.caption}</figcaption>
        </figure>
      )}
      <CheckList items={c.points} className="small" />
      {c.result && <p className="result-note">{c.result}</p>}
      {link}
    </li>
  );
}

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
        {s.award && <p className="award">{s.award}</p>}
        <p className="prose">{s.intro}</p>
        <p className="norm">{s.norm}</p>
      </div>
      <div className="two-col">
        <div><h4 className="label">{L.analyze}</h4><CheckList items={s.analyze} /></div>
        <div><h4 className="label">{L.get}</h4><CheckList items={s.get} /></div>
      </div>
      {s.chart && <VoltageChart c={s.chart} />}
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

// Antet de pagină pentru o categorie cu pagină proprie.
function CatHero({ badge, title, desc }) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="container">
        <p className="badge">{badge}</p>
        <h1 id="page-title" className="h1">{title}</h1>
        <p className="lead lead-lg">{desc}</p>
      </div>
    </section>
  );
}

function CtaBand({ refs }) {
  const { t } = useI18n();
  const S = t.solutions;
  return (
    <section className="cta-band" aria-labelledby="sol-cta">
      <div className="container center-text">
        <h2 id="sol-cta" className="h2">{S.cta.title}</h2>
        <p className="lead">{S.cta.text}</p>
        <a href="#contact" className="btn btn-primary">{S.cta.button}</a>
        {refs && <p className="refs">{S.refs}</p>}
      </div>
    </section>
  );
}

const groupOf = (S, anchor) => S.menu.groups.find(g => g.anchor === anchor);

// Navigare verticală pe dreapta: arată secțiunea curentă și permite saltul între secțiuni.
function SideNav({ items, label }) {
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let cur = null;
      items.forEach(i => {
        const el = document.getElementById(i.id);
        if (el && el.getBoundingClientRect().top <= 140) cur = i.id;
      });
      setActive(cur);
      const first = document.getElementById(items[0].id);
      const box = first && first.closest('.with-side');
      if (box) {
        const r = box.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.6;
        setProgress(Math.max(0, Math.min(1, (140 - r.top) / (total > 0 ? total : 1))));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [items]);
  return (
    <nav className="side-nav" aria-label={label}>
      <p className="side-nav-title">{label}</p>
      <div className="side-nav-track" aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /></div>
      <ol>
        {items.map(i => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={active === i.id ? 'active' : undefined} aria-current={active === i.id ? 'location' : undefined}>{i.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function UtilitiesPage() {
  const { t } = useI18n();
  const S = t.solutions;
  return (
    <>
      <CatHero badge={t.common.nav.solutions} title={S.cat1.title} desc={S.cat1.desc} />
      <section className="section cat-body" id="retele" aria-labelledby="cat1-title">
        <div className="container with-side">
          <div className="side-main">
            <h2 id="cat1-title" className="sr-only">{S.cat1.title}</h2>
            {S.items.map(s => <Solution key={s.id} s={s} />)}
            {S.awards && <p className="awards-note">{S.awards}</p>}
            <div className="two-col notes">
              <div className="card"><h3 className="h4">{S.notes.how.title}</h3><p>{S.notes.how.text}</p></div>
              <div className="card"><h3 className="h4">{S.notes.excl.title}</h3><p>{S.notes.excl.text}</p></div>
            </div>
          </div>
          <SideNav label={t.common.labels.onThisPage} items={groupOf(S, 'retele').items.map(i => ({ id: i.anchor, label: i.label }))} />
        </div>
      </section>

      <CtaBand refs />
    </>
  );
}

export function CemeteriesPage() {
  const { t } = useI18n();
  const S = t.solutions;
  const L = t.common.labels;
  return (
    <>
      <CatHero badge={S.cat2.title} title={groupOf(S, 'cimitire').title} desc={S.cat2.desc} />
      <section className="section cat-body" id="cimitire" aria-labelledby="cat2-title">
        <div className="container">
          <h2 id="cat2-title" className="h2">{S.cat2.subtitle}</h2>
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

      <CtaBand />
    </>
  );
}

export function EnvironmentPage() {
  const { t } = useI18n();
  const S = t.solutions;
  const e = S.egie;
  return (
    <>
      <CatHero badge={t.common.nav.solutions} title={S.cat3.title} desc={S.cat3.desc} />
      <section className="section cat-body" id="mediu" aria-labelledby="cat3-title">
        <div className="container">
          <h2 id="cat3-title" className="sr-only">{S.cat3.title}</h2>
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

          <ul className="cards cards-4 mt-lg topics">
            {S.env.map(c => <TopicCard key={c.id} c={c} />)}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export default function Solutions() {
  const { t, href } = useI18n();
  const S = t.solutions;
  const L = t.common.labels;
  const tocHref = a => (SOLUTION_PAGES[a] ? href(SOLUTION_PAGES[a]) : `#${a}`);
  const domains = ['retele', 'cimitire', 'mediu'];
  const icons = { retele: 'bolt', cimitire: 'map', mediu: 'leaf' };
  const descs = { retele: S.cat1.desc, cimitire: S.cat2.desc, mediu: S.cat3.desc };
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container">
          <p className="badge">{S.hero.badge}</p>
          <h1 id="page-title" className="h1">{S.hero.title} <span className="accent">{S.hero.accent}</span></h1>
          <p className="lead lead-lg">{S.hero.sub}</p>
          <nav aria-label={S.hero.tocLabel} className="toc">
            <ul>
              {TOC.map((a, i) => <li key={a}><a href={tocHref(a)}>{S.hero.toc[i]}</a></li>)}
            </ul>
          </nav>
        </div>
      </section>

      <section className="section alt" aria-labelledby="domains-title">
        <div className="container">
          <h2 id="domains-title" className="sr-only">{S.hero.tocLabel}</h2>
          <ul className="cards cards-3 topics">
            {domains.map(a => {
              const g = groupOf(S, a);
              return (
                <li key={a} className="card topic">
                  <span className="icon-tile"><Icon name={icons[a]} /></span>
                  <h3 className="h3"><a className="stretched" href={href(SOLUTION_PAGES[a])}>{g.title}</a></h3>
                  <p>{descs[a]}</p>
                  {g.items.length > 0 && <CheckList items={g.items.map(i => i.label)} className="small" />}
                  <span className="text-link" aria-hidden="true">{L.learnMore} <Icon name="arrow" size={16} /></span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section" id="mentenanta" aria-labelledby="cat4-title">
        <div className="container">
          <header className="cat-head">
            <div><h2 id="cat4-title" className="h2">{S.cat4.title}</h2></div>
            <p className="prose">{S.cat4.desc}</p>
          </header>
          <div className="maint">
            <CheckList items={S.cat4.list} />
            <p className="deliverable"><span>{L.deliverable}</span>{S.cat4.deliverable}</p>
          </div>
        </div>
      </section>

      <section className="section alt" id="business" aria-labelledby="cat5-title">
        <div className="container">
          <header className="cat-head">
            <div><h2 id="cat5-title" className="h2">{S.cat5.title}</h2></div>
            <p className="prose">{S.cat5.desc}</p>
          </header>
          <ul className="cards cards-2 mt-lg topics">
            {S.cat5.items.map(c => (
              <TopicCard
                key={c.id}
                c={c}
                link={c.link && (
                  <span className="card-links">
                    <a className="text-link" href={href('pm')}>{t.common.nav.pmCourse} <Icon name="arrow" size={16} /></a>
                    <a className="text-link" href={href(c.link)}>{t.common.nav.negotiation} <Icon name="arrow" size={16} /></a>
                  </span>
                )}
              />
            ))}
          </ul>
          {S.cat5.shot && (
            <div className="shots single mt-lg">
              <Shot {...PLAN_SHOT} alt={S.cat5.shot.alt} caption={S.cat5.shot.caption} wide />
            </div>
          )}
        </div>
      </section>

      <section className="section" id="orice-domeniu" aria-labelledby="any-title">
        <div className="container">
          <header className="cat-head">
            <div><h2 id="any-title" className="h2">{S.any.title}</h2></div>
            <p className="prose">{S.any.desc}</p>
          </header>
          <ul className="cards cards-2 mt-lg topics">
            {S.any.focus.map(f => <TopicCard key={f.title} c={{ ...f, id: undefined }} />)}
          </ul>
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

      <CtaBand />
    </>
  );
}
