import React, { useState } from 'react';
import './GIS.css';

const gisServices = [
  {
    icon: '🗺️',
    title: 'Curs GIS Începători — Bazele GIS',
    short: 'Curs complet QGIS 3.28.2 — de la zero la proiecte reale cu date din România.',
    details: [
      'Curs 1: Terminologie și Concepte GIS — CRS, date vectoriale și raster',
      'Curs 2: Conversii din Date Non-Spațiale în Date Spațiale',
      'Curs 3: Metode și Procese GIS',
      'Curs 4: Hărți de Distribuție',
      'Curs 5: Formate de Date GIS — Ghid Complet',
      'Curs 6: Simbolizare Avansată — Toate Opțiunile',
      'Curs 7: Print Layout — Crearea Hărților Profesionale',
      'Curs 8: Geoprocesare — Analiza Spațială Vectorială',
      'Curs 9: Digitizare și Editare Avansată a Geometriilor',
    ],
    tag: 'Începători',
    color: 'blue',
  },
  {
    icon: '📡',
    title: 'Curs GIS Avansat — Physical Geography',
    short: 'Analiză spațială avansată cu focus pe studii de caz în geografie fizică.',
    details: [
      '3D GIS Modelling — digitizare 3D, DEM, date LiDAR (3h)',
      'GIS Modelling in Geomorphology — hărți hipsometrice, pantă, aspect (3h)',
      'GIS Modelling in Hydrology — scenarii inundații, bazine hidrografice (2h)',
      'GIS Modelling for Vegetation and Land Use — indici vegetație, hărți utilizare teren (3h)',
      'Prezentare finală cu hărți, analize și rapoarte (2h)',
    ],
    tag: 'Avansat',
    color: 'red',
  },
  {
    icon: '📊',
    title: 'Consultanță GIS',
    short: 'Soluții geospațiale personalizate pentru companii și instituții.',
    details: [
      'Audit și structurare baze de date spațiale',
      'Implementare sisteme GIS în organizație',
      'Cartografiere și vizualizare date geografice',
      'Modelare spațială și analiză de teren',
      'Training personalizat pentru echipele interne',
    ],
    tag: 'Personalizat',
    color: 'blue',
  },
];

const whyGIS = [
  { icon: '🎯', title: 'Decizii mai bune', desc: 'Datele geografice transformă informații complexe în decizii clare și vizuale.' },
  { icon: '⚡', title: 'Eficiență operațională', desc: 'Automatizarea analizelor spațiale reduce timpul de lucru cu până la 60%.' },
  { icon: '🌍', title: 'Vizibilitate globală', desc: 'Înțelege distribuția resurselor, clienților și riscurilor pe hartă.' },
  { icon: '📈', title: 'Avantaj competitiv', desc: 'Companiile care folosesc GIS iau decizii mai rapide și mai precise decât concurența.' },
];

export default function GIS() {
  const [active, setActive] = useState(null);

  return (
    <div className="gis-page">

      <section className="gis-hero">
        <div className="gis-hero-inner">
          <div className="gis-hero-label">Servicii GIS</div>
          <h1 className="gis-hero-title">
            Date geografice.<br />
            <span className="accent-blue">Decizii clare.</span>
          </h1>
          <p className="gis-hero-sub">
            Transformăm date spațiale complexe în hărți, analize și soluții care îți arată exact unde ești și unde vrei să ajungi.
          </p>
          <div className="gis-hero-actions">
            <a href="#gis-services" className="btn-primary">Vezi cursurile</a>
            <a href="#contact" className="btn-secondary">Contactează-ne</a>
          </div>
        </div>
        <div className="gis-hero-visual">
          <div className="gis-globe">🌍</div>
        </div>
      </section>

      <section className="gis-why">
        <div className="gis-why-inner">
          <div className="section-header">
            <div className="section-label">De ce GIS?</div>
            <h2 className="section-title">
              Puterea datelor <span className="accent-blue">spațiale</span>
            </h2>
            <p className="section-sub">
              GIS nu e doar o hartă — e un instrument strategic de business.
            </p>
          </div>
          <div className="gis-why-grid">
            {whyGIS.map((item, i) => (
              <div className="gis-why-card" key={i}>
                <span className="gis-why-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gis-services" id="gis-services">
        <div className="gis-services-inner">
          <div className="section-header">
            <div className="section-label">Ce oferim</div>
            <h2 className="section-title">
              Cursuri & Consultanță <span className="accent-blue">GIS</span>
            </h2>
            <p className="section-sub">
              De la primul pas în GIS până la soluții avansate pentru organizații.
            </p>
          </div>
          <div className="services-grid">
            {gisServices.map((s, i) => (
              <div className={`service-card ${s.color} ${active === i ? 'active' : ''}`} key={i} onClick={() => setActive(active === i ? null : i)}>
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
        </div>
      </section>

      <section className="gis-tools">
        <div className="gis-tools-inner">
          <div className="section-header">
            <div className="section-label">Tehnologii</div>
            <h2 className="section-title">
              Instrumente cu care <span className="accent-blue">lucrăm</span>
            </h2>
          </div>
          <div className="gis-tools-grid">
            {['QGIS', 'ArcGIS', 'Google Earth Engine'].map((tool, i) => (
              <div className="gis-tool-badge" key={i}>{tool}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="gis-cta">
        <div className="gis-cta-inner">
          <h2>Vrei să înveți GIS sau ai nevoie de consultanță?</h2>
          <p>Spune-ne despre proiectul tău și îți propunem soluția potrivită.</p>
          <a href="#contact" className="btn-primary">Solicită o consultație gratuită</a>
        </div>
      </section>

    </div>
  );
}
