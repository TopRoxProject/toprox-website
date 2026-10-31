import React from 'react';

// Set mic de pictograme liniare, desenate pentru site (fără biblioteci externe).
const P = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><path d="M14 17.5h7M17.5 14v7" /></>,
  map: <><path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5L9 4z" /><path d="M9 4v13.5M15 6.5V20" /></>,
  handshake: <><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2L10.6 6.6a5 5 0 0 1 6.2-.7l.5.3a3 3 0 0 0 2 .4H21" /><path d="M21 4.5v8.5h-2M3 4.5h8M3 13h3l3.5 3.5a1.4 1.4 0 0 0 2-2" /></>,
  shield: <><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3z" /><path d="m9 12 2 2 4-4" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2z" /></>,
  chart: <><path d="M4 20V4M4 20h16" /><path d="m7.5 15 3.5-4 3 2.5 5-6" /></>,
  bolt: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3z" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></>,
  leaf: <><path d="M5 19c0-8 5-13.5 14-14-0.5 9-6 14-14 14z" /><path d="M5 19c3-4 6-6.5 9-8" /></>,
  thermo: <><path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z" /><path d="M12 9v7" /></>,
  bike: <><circle cx="6" cy="16.5" r="3.5" /><circle cx="18" cy="16.5" r="3.5" /><path d="m6 16.5 4-7.5h5l3 7.5M10 9 8.5 6H7M15 9l-3.5 7.5H6" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  globeLang: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  up: <path d="m6 15 6-6 6 6" />,
  quote: <path d="M7 17c-1.7 0-3-1.3-3-3 0-3.5 2-6.5 5-8l.8 1.2C8 8.5 7 10 7 11h.5a3 3 0 0 1 0 6H7zm9.5 0c-1.7 0-3-1.3-3-3 0-3.5 2-6.5 5-8l.8 1.2c-1.8 1.3-2.8 2.8-2.8 3.8h.5a3 3 0 0 1 0 6h-.5z" />,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V16.5M8 7.5v.01M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6v3.5" /></>,
  facebook: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M15.5 8H14a2 2 0 0 0-2 2v11M9.5 13.5H15" /></>,
};

export default function Icon({ name, size = 22, className = '', label }) {
  const fill = name === 'quote' ? 'currentColor' : 'none';
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={fill === 'none' ? 'currentColor' : 'none'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : 'true'}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
    >
      {P[name]}
    </svg>
  );
}
