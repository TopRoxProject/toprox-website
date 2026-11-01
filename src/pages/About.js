import React from 'react';
import { useI18n, Rich } from '../i18n';
import Icon from '../components/Icon';
import { SectionHead } from '../components/ui';
import Medallion from '../components/Medallion';

export default function About() {
  const { t } = useI18n();
  const A = t.aboutPage;
  const company = t.home.about;
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container hero-split">
          <div>
            <p className="badge">{A.badge}</p>
            <h1 id="page-title" className="h1">{A.title} <span className="accent">{A.accent}</span></h1>
            <p className="lead lead-lg">{A.lead}</p>
          </div>
          <Medallion />
        </div>
      </section>

      <section className="section" aria-labelledby="creds-title">
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

      <section className="section alt" aria-labelledby="company-title">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">{A.companyLabel}</p>
            <h2 id="company-title" className="h2" translate="no">TopRox Project SRL</h2>
            <p className="prose"><Rich text={company.p1} /></p>
            <p className="prose">{company.p2}</p>
          </div>
          <div>
            <SectionHead title={A.valuesTitle} accent={A.valuesAccent} center={false} as="h3" />
            <ul className="values">
              {company.values.map(v => (
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

      <section className="cta-band" aria-labelledby="about-cta">
        <div className="container center-text">
          <h2 id="about-cta" className="h2">{A.cta.title}</h2>
          <p className="lead">{A.cta.text}</p>
          <a href="#contact" className="btn btn-primary">{A.cta.button}</a>
        </div>
      </section>
    </>
  );
}
