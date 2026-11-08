import React from 'react';
import { useI18n } from '../i18n';
import { EMAIL } from '../i18n/config';

// Pagini text: politica de confidențialitate și declarația de accesibilitate.
function linkify(text) {
  const parts = text.split(new RegExp(`(${EMAIL.replace('.', '\\.')}|www\\.dataprotection\\.ro)`));
  return parts.map((p, i) => {
    if (p === EMAIL) return <a key={i} href={`mailto:${EMAIL}`}>{p}</a>;
    if (p === 'www.dataprotection.ro') return <a key={i} href="https://www.dataprotection.ro" rel="noopener">{p}</a>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

export default function Legal({ which }) {
  const { t } = useI18n();
  const d = t[which];
  return (
    <section className="page-hero legal" aria-labelledby="page-title">
      <div className="container narrow">
        <h1 id="page-title" className="h1">{d.title}</h1>
        <p className="muted">{d.updated}</p>
        <p className="lead">{d.intro}</p>
        {d.sections.map(s => (
          <section key={s.h} className="legal-sec" aria-labelledby={`h-${s.h.length}-${s.h.charCodeAt(0)}`}>
            <h2 id={`h-${s.h.length}-${s.h.charCodeAt(0)}`} className="h3">{s.h}</h2>
            {s.p.map(p => <p key={p.slice(0, 30)} className="prose">{linkify(p)}</p>)}
          </section>
        ))}
      </div>
    </section>
  );
}
