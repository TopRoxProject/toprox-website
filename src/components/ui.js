import React from 'react';
import Icon from './Icon';
import { useI18n } from '../i18n';

export function SectionHead({ id, eyebrow, title, accent, sub, center = true, as = 'h2' }) {
  const H = as;
  return (
    <div className={`section-head ${center ? 'center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id} className="h2">{title}{accent && <> <span className="accent">{accent}</span></>}</H>
      {sub && <p className="lead">{sub}</p>}
    </div>
  );
}

export function CheckList({ items, className = '' }) {
  return (
    <ul className={`check-list ${className}`}>
      {items.map(i => <li key={i}><Icon name="check" size={18} />{i}</li>)}
    </ul>
  );
}

export function Flow({ label, steps }) {
  return (
    <div className="flow">
      <span className="flow-label">{label}:</span>
      <ol className="flow-steps">
        {steps.map((s, i) => (
          <li key={s}>{i > 0 && <Icon name="arrow" size={14} className="flow-arrow" />}<span>{s}</span></li>
        ))}
      </ol>
    </div>
  );
}

export function Shot({ src, w, h, alt, caption, wide }) {
  const { t } = useI18n();
  return (
    <figure className={`shot ${wide ? 'wide' : ''}`}>
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" />
        <span className="sr-only">{t.common.labels.enlarge} {t.common.newTab}</span>
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
