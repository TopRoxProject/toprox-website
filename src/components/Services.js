import React, { useState } from 'react';
import './Services.css';

const services = [
  {
    icon: '🔐',
    color: 'red',
    title: 'Audit & Conformitate GDPR',
    short: 'Conformitate completă cu regulamentele europene de protecție a datelor.',
    details: [
      'Scanare și audit date personale din fișiere locale',
      'Rapoarte detaliate în format Excel, PDF, Word',
      'Conformitate cu GDPR 2016/679, Legea 190/2018, Legea 506/2004',
      'Aplicație proprietară GDPR_TopRox v1.0',
      'Consultanță continuă privind obligațiile legale',
    ],
    tag: 'Produs propriu',
  },
  {
    icon: '💻',
    color: 'blue',
    title: 'Cursuri GIS',
    short: 'Proiecte Digitale in GIS.',
    details: [
      'Curs GIS Începatori',
      'Curs GIS Avansat',
    ],
    tag: 'Personalizat',
  },
  {
    icon: '🛡️',
    color: 'red',
    title: 'Cursuri Negociere',
    short: 'Negociere pentru Antreprenori.',
    details: [
      'Curs Negociere Pentru Antreprenori',
      'Curs Negociere Pentru Project Manageri',
    ],
    tag: 'Recomandat',
  },
  {
    icon: '📊',
    color: 'red',
    title: 'Consultanță IT Strategică',
    short: 'Te ajutăm să iei decizii IT corecte, aliniate cu obiectivele de business.',
    details: [
      'Planificare IT pe termen lung',
      'Selecție și implementare soluții software',
      'Optimizare costuri IT',
      'Training și suport echipă internă',
    ],
    tag: 'Strategic',
  },
  {
    icon: '🔧',
    color: 'blue',
    title: 'Suport Tehnic',
    short: 'Asistență tehnică rapidă și eficientă, la nevoie sau în abonament lunar.',
    details: [
      'Help desk și suport remote',
      'Întreținere sisteme și echipamente',
      'Actualizări software și patch-uri de securitate',
      'Intervenție on-site în Sibiu și împrejurimi',
      'Rapoarte lunare de activitate',
    ],
    tag: 'Abonament',
  },
];

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <section className="services" id="services">
      <div className="services-inner">
        <div className="section-header">
          <div className="section-label">Ce oferim</div>
          <h2 className="section-title">
            Servicii IT <span className="accent-blue">complete</span>
          </h2>
          <p className="section-sub">
            De la primul audit până la suport continuu — suntem partenerul tău IT de încredere.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div
              className={`service-card ${s.color} ${active === i ? 'active' : ''}`}
              key={i}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="service-top">
                <span className="service-icon">{s.icon}</span>
                <span className={`service-tag ${s.color}`}>{s.tag}</span>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-short">{s.short}</p>
              <ul className={`service-details ${active === i ? 'open' : ''}`}>
                {s.details.map((d, j) => (
                  <li key={j}><span className="check">✓</span>{d}</li>
                ))}
              </ul>
              <button className="service-toggle">
                {active === i ? 'Mai puțin ↑' : 'Detalii ↓'}
              </button>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <p>Nu știi de unde să începi?</p>
          <a href="#contact" className="btn-primary">Solicită o consultație gratuită</a>
        </div>
      </div>
    </section>
  );
}
