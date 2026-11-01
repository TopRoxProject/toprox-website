import React, { createContext, useContext } from 'react';
import ro from './ro';
import en from './en';
import de from './de';
import it from './it';
import fr from './fr';
import { ROUTES } from './config';

export const DICTS = { ro, en, de, it, fr };

const Ctx = createContext({ lang: 'ro', page: 'home' });

export function I18nProvider({ lang, page, children }) {
  return <Ctx.Provider value={{ lang, page }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const { lang, page } = useContext(Ctx);
  const t = DICTS[lang];
  const href = (p, anchor) => {
    const base = ROUTES[lang][p];
    if (!anchor) return base;
    // ancoră pe pagina curentă: doar #id, ca să nu reîncarce pagina
    if (p === page) return `#${anchor}`;
    return `${base}#${anchor}`;
  };
  return { lang, page, t, href };
}

// Text cu **îngroșat** și token-uri {nume} înlocuite cu elemente React.
export function Rich({ text, tokens = {} }) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|\{[a-z]+\})/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
        const m = part.match(/^\{([a-z]+)\}$/);
        if (m && tokens[m[1]] !== undefined) return <React.Fragment key={i}>{tokens[m[1]]}</React.Fragment>;
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}
