import React from 'react';
import './About.css';

const values = [
  { icon: '🛡️', title: 'Integritate', desc: 'Lucrăm transparent, fără costuri ascunse și fără compromisuri.' },
  { icon: '⚡', title: 'Rapiditate', desc: 'Livrăm soluții eficiente, respectând termenele agreate.' },
  { icon: '🔒', title: 'Securitate', desc: 'Datele tale sunt protejate conform standardelor GDPR și ISO.' },
  { icon: '🤝', title: 'Parteneriat', desc: 'Suntem alături de tine pe termen lung, nu doar la proiect.' },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-left">
          <div className="section-label">Despre noi</div>
          <h2 className="section-title">
            Expertiza IT <br />
            <span className="accent-red">la dispoziția ta</span>
          </h2>
          <p className="about-text">
            <strong>TopRox Project SRL</strong> este o firmă de consultanță IT cu sediul în Sibiu, România.
            Ne specializăm în implementarea de soluții software personalizate, audit de securitate informatică
            și conformitate GDPR pentru firme de toate dimensiunile.
          </p>
          <p className="about-text">
            Echipa noastră combină experiența tehnică profundă cu o înțelegere clară a nevoilor de business,
            oferind soluții practice care aduc valoare reală — nu doar rapoarte și documente.
          </p>
          <div className="about-highlights">
            <div className="highlight">
              <span className="highlight-dot red" />
              Certificați în reglementări GDPR (2016/679), Legea 190/2018
            </div>
            <div className="highlight">
              <span className="highlight-dot blue" />
              Aplicații desktop și web dezvoltate intern
            </div>
            <div className="highlight">
              <span className="highlight-dot red" />
              Suport tehnic continuu, personalizat per client
            </div>
          </div>
          <a href="#contact" className="btn-primary">Hai să lucrăm împreună</a>
        </div>

        <div className="about-right">
          <div className="about-logo-block">
            <img src="/images/logo.png" alt="TopRox Project Logo" className="about-logo" />
            <div className="about-logo-glow" />
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <span className="value-icon">{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
