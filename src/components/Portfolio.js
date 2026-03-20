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
    tech: ['Python', 'GDPR 2016/679', 'Legea 190/2018', 'Excel / PDF / Word'],
    highlights: ['Scanare inteligentă date personale', 'Rapoarte multi-format', 'Conformitate UE + România', 'Licențiere anuală'],
  },
  {
    id: 2,
    title: 'Sistem Management Clienți',
    category: 'Dezvoltare custom',
    tag: 'Web App',
    color: 'blue',
    year: '2025',
    desc: 'Platformă web personalizată pentru gestionarea clienților, contractelor și facturilor pentru o firmă de servicii din Sibiu. Integrat cu sistemul contabil existent.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    highlights: ['CRM complet', 'Facturare automată', 'Rapoarte lunare', 'Acces multi-utilizator'],
  },
  {
    id: 3,
    title: 'Audit Securitate IT',
    category: 'Securitate',
    tag: 'Consulting',
    color: 'red',
    year: '2025',
    desc: 'Audit complet de securitate pentru o companie din sectorul medical. Identificare vulnerabilități, implementare politici de securitate și formare personal.',
    tech: ['Penetration Testing', 'Nessus', 'Firewall Config', 'Staff Training'],
    highlights: ['23 vulnerabilități remediate', '0 incidente post-audit', 'Politici actualizate', 'Training 15 angajați'],
  },
  {
    id: 4,
    title: 'Migrare Cloud & Backup',
    category: 'Infrastructură',
    tag: 'Cloud',
    color: 'blue',
    year: '2024',
    desc: 'Migrare completă a infrastructurii on-premise pe Azure pentru o firmă de distribuție. Implementare backup automat și disaster recovery plan.',
    tech: ['Microsoft Azure', 'Azure Backup', 'VPN', 'Active Directory'],
    highlights: ['99.9% uptime', 'Backup zilnic automat', 'Recovery < 4h', '-40% costuri IT'],
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
