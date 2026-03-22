import React, { useState } from 'react';
import './Negociere.css';

const modulesGM = [
  { icon: '📖', nr: '01', title: 'Fundamente', desc: 'BATNA, ZOPA, interese vs. poziții. Câmpul de negociere: Leverage × Informație × Timp.' },
  { icon: '⚡', nr: '02', title: '15 Tehnici Esențiale', desc: 'Ancorare, reframing, bundling, întrebări calibrate, tăcere strategică, labeling, mirroring, reciprocitate și altele.' },
  { icon: '🧠', nr: '03', title: 'Psihologie & Tipologii', desc: 'Mecanisme cognitive, aversiunea față de pierdere, efectul de ancorare. 4 profiluri de negociatori.' },
  { icon: '⚠️', nr: '04', title: '6 Capcane Sistematice', desc: 'Greșelile care costă acorduri: concesii unilaterale, urgența auto-impusă, negocierea cu tine însuți.' },
  { icon: '🎯', nr: '05', title: '6 Scenarii Executive Reale', desc: 'Cofondatori, VC, C-suite, renegociere contract, autonomie vs. holding, M&A.' },
  { icon: '🏆', nr: '06', title: 'Masterclass & Principii', desc: 'Negocierea înainte de negociere. BATNA strategică. 10 proverbe-ancoră. Axiomele negociatorului.' },
];

const modulesPM = [
  { icon: '📖', nr: '01', title: 'Fundamente PM', desc: 'BATNA, ZOPA și Triple Constraint — instrumentul central de negociere în PM. Scope, timp și cost ca monede de schimb.' },
  { icon: '⚡', nr: '02', title: '15 Tehnici cu exemple PM', desc: 'Ancorare, bundling, ofertă condiționată, labeling — fiecare tehnică cu exemple concrete din proiecte reale.' },
  { icon: '🧠', nr: '03', title: 'Psihologie & EQ în PM', desc: 'Stakeholder management, cititul camerei, inteligență emoțională aplicată în gestionarea echipelor și clienților.' },
  { icon: '👥', nr: '04', title: '4 Tipologii de Stakeholderi', desc: 'Cum recunoști și gestionezi fiecare profil: sponsorul, clientul, echipa internă, stakeholderul rezistent.' },
  { icon: '⚠️', nr: '05', title: '6 Capcane în PM', desc: 'Greșelile care generează scope creep și întârzieri: acceptarea informală, lipsa BATNA, urgența auto-impusă.' },
  { icon: '🎯', nr: '06', title: '4 Scenarii Reale PM', desc: 'Scope creep, deadline agresiv, stakeholder rezistent, renegociere contract — strategii pas cu pas.' },
  { icon: '🏆', nr: '07', title: 'Masterclass PM', desc: 'Negocierea continuă în proiecte. Mastering Scope & Timeline Negotiation. Nivelul avansat.' },
];

const instrumenteGM = [
  { icon: '🗺️', title: 'Harta Monedelor Invizibile', desc: 'Template operațional pentru identificarea monedelor de schimb cu cost mic și valoare mare — cele pe care le ai și nu știi că le ai.', tag: 'Instrument original' },
  { icon: '⚖️', title: 'Matricea Concesiilor', desc: '4 cadrane strategice: Zona de Aur, Negociere, Neutru și Evitat. Niciodată gratuit, întotdeauna strategic.', tag: 'Instrument original' },
  { icon: '✅', title: 'Modelul de Pregătire GM', desc: 'Checklist operațional pe 3 axe — Leverage, Informație, Timp. 45-60 minute care fac diferența dintre un acord acceptabil și unul excepțional.', tag: 'Instrument original' },
];

const instrumentePM = [
  { icon: '🔺', title: 'Triple Constraint Negotiation', desc: 'Scope, timp și cost ca instrumente de negociere. Dacă una se schimbă, ai dreptul și obligația să negociezi celelalte două.', tag: 'Instrument original' },
  { icon: '🗺️', title: 'Harta Monedelor PM', desc: 'Timeline, prioritate backlog, vizibilitate, resurse, risc asumat, flexibilitate scope — monedele invizibile ale PM-ului.', tag: 'Instrument original' },
  { icon: '✅', title: 'Checklist Negociere Scope', desc: 'Template operațional pentru orice negociere de scope sau deadline cu stakeholderii. BATNA, ZOPA și monede pregătite înainte de întâlnire.', tag: 'Instrument original' },
];

const scenariiGM = [
  { icon: '🤝', title: 'Conflict între cofondatori', desc: 'Scop, control și exit într-un startup Series B.' },
  { icon: '💰', title: 'Negociere cu investitor VC', desc: 'Termeni de diluție, board seat și anti-dilution.' },
  { icon: '👔', title: 'Salariu C-suite', desc: 'Pachet complet: salariu, bonus, phantom equity, autonomie.' },
  { icon: '📋', title: 'Renegociere contract în criză', desc: 'Client major cere reducere 20% — cum obții -8% și contract extins.' },
  { icon: '🏢', title: 'Autonomie vs. Holding', desc: 'Cum obții libertate decizională fără să pari că scazi controlul.' },
  { icon: '🔀', title: 'M&A: termeni de achiziție', desc: 'Cumpărarea unui competitor cu atașament emoțional al vânzătorului.' },
];

const scenariiPM = [
  { icon: '📦', title: 'Scope Creep necontrolat', desc: 'Stakeholderul extinde informal scopul cu features noi — cum transformi fiecare cerere într-un schimb explicit.' },
  { icon: '⏰', title: 'Deadline agresiv impus de client', desc: 'Clientul cere livrare imposibilă — cum negociezi MVP + fază 2 fără să pierzi proiectul.' },
  { icon: '🚧', title: 'Stakeholder rezistent la schimbare', desc: 'Cum obții buy-in de la un stakeholder care blochează decizii critice de proiect.' },
  { icon: '🔄', title: 'Renegociere contract în proiect activ', desc: 'Condițiile s-au schimbat la jumătatea proiectului — cum renegociezi fără să deteriorezi relația.' },
];

export default function Negociere() {
  const [activeTab, setActiveTab] = useState('gm');
  const [activeModule, setActiveModule] = useState(null);

  const modules = activeTab === 'gm' ? modulesGM : modulesPM;
  const instrumente = activeTab === 'gm' ? instrumenteGM : instrumentePM;
  const scenarii = activeTab === 'gm' ? scenariiGM : scenariiPM;
  const accentColor = activeTab === 'gm' ? '#ef4444' : '#3b82f6';

  return (
    <div className="neg-page">

      <section className="neg-hero">
        <div className="neg-hero-inner">
          <div className="neg-hero-label">Cursuri Negociere Executivă</div>
          <h1 className="neg-hero-title">
            Negociază Inteligent<br />
            <span className="accent-red">și Eficient.</span>
          </h1>
          <p className="neg-hero-sub">
            15 tehnici. Scenarii reale. Instrumente originale. Negociere executivă de nivel top 1% — pentru General Manageri și Project Manageri.
          </p>
          <div className="neg-hero-stats">
            <div className="neg-stat"><strong>8</strong><span>Module</span></div>
            <div className="neg-stat"><strong>15</strong><span>Tehnici</span></div>
            <div className="neg-stat"><strong>2</strong><span>Ediții</span></div>
            <div className="neg-stat"><strong>3</strong><span>Instrumente originale</span></div>
          </div>
          <div className="neg-hero-actions">
            <a href="#neg-tabs" className="btn-primary">Vezi cursurile</a>
            <a href="#contact" className="btn-secondary">Înscrie-te</a>
          </div>
        </div>
        <div className="neg-hero-visual">
          <div className="neg-quote">
            <p>„Pregătit ca de război,<br />blând ca de pace."</p>
            <span>— Înțelepciunea populară românească</span>
          </div>
        </div>
      </section>

      <section className="neg-tabs-section" id="neg-tabs">
        <div className="neg-tabs-inner">
          <div className="neg-tabs">
            <button className={`neg-tab ${activeTab === 'gm' ? 'active red' : ''}`} onClick={() => { setActiveTab('gm'); setActiveModule(null); }}>
              👔 General Manager Edition
            </button>
            <button className={`neg-tab ${activeTab === 'pm' ? 'active blue' : ''}`} onClick={() => { setActiveTab('pm'); setActiveModule(null); }}>
              📋 Project Manager Edition
            </button>
          </div>
        </div>
      </section>

      <section className="neg-for">
        <div className="neg-for-inner">
          <div className="section-header">
            <div className="section-label">Pentru cine</div>
            <h2 className="section-title">
              {activeTab === 'gm' ? (
                <span>Cursul GM e construit pentru <span className="accent-red">executivi reali</span></span>
              ) : (
                <span>Cursul PM e construit pentru <span className="accent-blue">project manageri reali</span></span>
              )}
            </h2>
          </div>
          <div className="neg-for-grid">
            {activeTab === 'gm' ? (
              ['General Manageri', 'Antreprenori & Cofondatori', 'Directori Executivi (C-suite)', 'Project Manageri seniori', 'Oricine negociază la nivel strategic'].map((item, i) => (
                <div className="neg-for-item" key={i}>
                  <span className="check-red">✓</span>
                  <span>{item}</span>
                </div>
              ))
            ) : (
              ['Project Manageri', 'Program Manageri', 'Scrum Masters & Agile Coaches', 'Team Leads tehnici', 'Oricine gestionează scope și stakeholderi'].map((item, i) => (
                <div className="neg-for-item blue" key={i}>
                  <span className="check-blue">✓</span>
                  <span>{item}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="neg-modules" id="neg-modules">
        <div className="neg-modules-inner">
          <div className="section-header">
            <div className="section-label">Structura cursului</div>
            <h2 className="section-title">
              {activeTab === 'gm' ? (
                <span>8 Module. <span className="accent-red">Un singur obiectiv.</span></span>
              ) : (
                <span>7 Module. <span className="accent-blue">Zero scope creep.</span></span>
              )}
            </h2>
            <p className="section-sub">De la fundamente la scenarii reale — un parcurs complet.</p>
          </div>
          <div className="neg-modules-grid">
            {modules.map((m, i) => (
              <div className={`neg-module-card ${activeModule === i ? 'active' : ''} ${activeTab}`} key={i} onClick={() => setActiveModule(activeModule === i ? null : i)}>
                <div className="neg-module-top">
                  <span className={`neg-module-nr ${activeTab}`}>{m.nr}</span>
                  <span className="neg-module-icon">{m.icon}</span>
                </div>
                <h3>{m.title}</h3>
                <p className={activeModule === i ? 'open' : ''}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="neg-tools">
        <div className="neg-tools-inner">
          <div className="section-header">
            <div className="section-label">Instrumente originale TopRoxProject</div>
            <h2 className="section-title">
              Nu doar teorie. <span style={{color: accentColor}}>Instrumente operaționale.</span>
            </h2>
            <p className="section-sub">3 instrumente originale pe care le completezi înainte de orice negociere importantă.</p>
          </div>
          <div className="neg-tools-grid">
            {instrumente.map((t, i) => (
              <div className={`neg-tool-card ${activeTab}`} key={i}>
                <div className="neg-tool-top">
                  <span className="neg-tool-icon">{t.icon}</span>
                  <span className={`service-tag ${activeTab === 'gm' ? 'red' : 'blue'}`}>{t.tag}</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="neg-scenarii">
        <div className="neg-scenarii-inner">
          <div className="section-header">
            <div className="section-label">Scenarii reale</div>
            <h2 className="section-title">
              {activeTab === 'gm' ? (
                <span>6 situații din <span className="accent-red">viața ta executivă</span></span>
              ) : (
                <span>4 situații din <span className="accent-blue">viața ta de PM</span></span>
              )}
            </h2>
            <p className="section-sub">Fiecare scenariu vine cu abordarea greșită, abordarea corectă și rezultatul concret.</p>
          </div>
          <div className="neg-scenarii-grid">
            {scenarii.map((s, i) => (
              <div className={`neg-scenariu-card ${activeTab}`} key={i}>
                <span className="neg-scenariu-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="neg-proverb">
        <div className="neg-proverb-inner">
          <h2>„Omul înțelept nu termină negocierea la semnătură.<br />O începe din nou în ziua următoare."</h2>
          <p>Modelul LIT (Leverage × Informație × Timp) — cadrul strategic complet, instrument original TopRoxProject.</p>
        </div>
      </section>

      <section className="neg-cta">
        <div className="neg-cta-inner">
          <h2>Ești pregătit să negociezi la nivel top 1%?</h2>
          <p>Contactează-ne pentru detalii despre înscriere și disponibilitate.</p>
          <a href="#contact" className="btn-primary">Vreau accesul la curs</a>
        </div>
      </section>

    </div>
  );
}
