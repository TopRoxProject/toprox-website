import React from 'react';
import { useI18n } from '../i18n';

// Medalion: șase cercuri suprapuse (ca inelele olimpice), fiecare cu o imagine dintr-o aplicație TopRox.
const RINGS = [
  { src: '/images/medalion/pante.jpg', color: '#1D4E89' },
  { src: '/images/medalion/egie.jpg', color: '#0B2545' },
  { src: '/images/medalion/irural.jpg', color: '#14532D' },
  { src: '/images/medalion/stalpi.jpg', color: '#B45309' },
  { src: '/images/medalion/teren-3d.jpg', color: '#2F7D4F' },
  { src: '/images/medalion/infografic.jpg', color: '#6D28D9' },
];

export default function Medallion() {
  const { t } = useI18n();
  const m = t.home.medallion;
  const order = [0, 1, 2, 3, 4, 5];
  return (
    <figure className="medallion" role="img" aria-label={`${m.label}: ${m.items.join(', ')}`}>
      {order.map(i => (
        <span key={i} className={`ring ring-${i + 1}`} style={{ '--ring': RINGS[i].color }} title={m.items[i]}>
          <img src={RINGS[i].src} alt="" width="420" height="420" decoding="async" />
        </span>
      ))}
    </figure>
  );
}
