import React, { useState } from 'react';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'GDPR_TopRox v1.0',
    category: 'Software propriu',
    tag: 'Desktop App',
    color: 'red',
    year: '2026',
    desc: 'Aplicație desktop pentru audit și conformitate GDPR. Scanează fișiere locale după date personale (CNP, IBAN, pașaport, etc.) și generează rapoarte profesionale în Excel, PDF și Word.',
    tech: ['15 Reglementari legale la nivel EU si Romania', 'Rapoarte in Excel / PDF / Word'],
    highlights: ['Scanare inteligentă date personale', 'Rapoarte multi-format', 'Conformitate UE + România', 'Licențiere anuală'],
  },
  {
    id: 2,
    title: 'Model analiza si elaborare Plan Strategic Digitalizare',
    category: 'Dezvoltare custom',
    tag: 'Web App',
    color: 'blue',
    year: '2026',
    desc: 'Vei putea înțelege de ce ai blocaje în a crește, a scala afacerea sau a digitaliza',
    tech: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    highlights: ['Plan Strategic', 'Top 1% calitate in Romania'],
  },
  {
    id: 3,
    title: 'Proiecte GIS',
    category: 'Software',
    tag: 'Consulting',
    color: 'red',
    year: '2026',
    desc: 'Cursuri GIS pe diferite nivele de competențe',
    tech: ['Curs Online de GIS'],
    highlights: ['GIS', 'Analiză Geospațială', 'Hărți digitale'],
  },
];

const categories = ['Toate', 'Software propriu', 'Dezvoltare custom', 'Securitate', 'Infrastructură'];

export default function Portfolio() {
  const [filter, setFilter] = useState('Toate');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'Toate' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-inner">
        <div className="section-header">
          <div className="section-label">Portofoliu</div>
          <h2 className="section-title">
            Proiecte <span className="accent-red">realizate</span>
          </h2>
          <p className="section-sub">
            Câteva exemple din activitatea noastră. Fiecare proiect a început cu o problemă reală și s-a terminat cu o soluție concretă.
          </p>
        </div>

        <div className="portfolio-filters">
          {categories.map(c => (
            <button
              key={c}
              className={`filter-btn ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filtered.map(p => (
            <div
              className={`portfolio-card ${p.color}`}
              key={p.id}
              onClick={() => setSelected(selected?.id === p.id ? null : p)}
            >
              <div className="portfolio-card-header">
                <div className="portfolio-meta">
                  <span className={`p-tag ${p.color}`}>{p.tag}</span>
                  <span className="p-year">{p.year}</span>
                </div>
                <h3 className="portfolio-title">{p.title}</h3>
                <p className="portfolio-cat">{p.category}</p>
              </div>
              <p className="portfolio-desc">{p.desc}</p>
              <div className="portfolio-tech">
                {p.tech.map((t, i) => <span key={i} className="tech-chip">{t}</span>)}
              </div>
              {selected?.id === p.id && (
                <div className="portfolio-expanded">
                  <div className="expand-divider" />
                  <h4>Puncte cheie:</h4>
                  <ul>
                    {p.highlights.map((h, i) => (
                      <li key={i}><span className="check">✓</span>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button className="service-toggle">
                {selected?.id === p.id ? 'Închide ↑' : 'Detalii ↓'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
