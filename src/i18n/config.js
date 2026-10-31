// Limbile site-ului și adresele (URL) fiecărei pagini în fiecare limbă.
// Româna e limba principală și nu are prefix în adresă.

export const SITE = 'https://toproxproject.com';
export const EMAIL = 'toproxproject@gmail.com';

export const LANGS = ['ro', 'en', 'de', 'it', 'fr'];

export const LANG_META = {
  ro: { name: 'Română', short: 'RO', locale: 'ro_RO', htmlLang: 'ro' },
  en: { name: 'English', short: 'EN', locale: 'en_GB', htmlLang: 'en' },
  de: { name: 'Deutsch', short: 'DE', locale: 'de_DE', htmlLang: 'de' },
  it: { name: 'Italiano', short: 'IT', locale: 'it_IT', htmlLang: 'it' },
  fr: { name: 'Français', short: 'FR', locale: 'fr_FR', htmlLang: 'fr' },
};

export const PAGES = ['home', 'solutions', 'gis', 'negotiation', 'privacy', 'accessibility'];

export const ROUTES = {
  ro: { home: '/', solutions: '/solutii', gis: '/gis', negotiation: '/negociere', privacy: '/confidentialitate', accessibility: '/accesibilitate' },
  en: { home: '/en', solutions: '/en/solutions', gis: '/en/gis-courses', negotiation: '/en/negotiation', privacy: '/en/privacy', accessibility: '/en/accessibility' },
  de: { home: '/de', solutions: '/de/loesungen', gis: '/de/gis-kurse', negotiation: '/de/verhandlung', privacy: '/de/datenschutz', accessibility: '/de/barrierefreiheit' },
  it: { home: '/it', solutions: '/it/soluzioni', gis: '/it/corsi-gis', negotiation: '/it/negoziazione', privacy: '/it/privacy', accessibility: '/it/accessibilita' },
  fr: { home: '/fr', solutions: '/fr/solutions', gis: '/fr/formations-sig', negotiation: '/fr/negociation', privacy: '/fr/confidentialite', accessibility: '/fr/accessibilite' },
};

// Găsește limba și pagina pentru o adresă. Întoarce null dacă adresa nu există.
export function matchRoute(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  for (const lang of LANGS) {
    for (const page of PAGES) {
      if (ROUTES[lang][page] === clean) return { lang, page };
    }
  }
  return null;
}

export function langFromPath(pathname) {
  const m = pathname.match(/^\/(en|de|it|fr)(\/|$)/);
  return m ? m[1] : 'ro';
}

export const url = (lang, page) => ROUTES[lang][page];
export const absUrl = (lang, page) => SITE + (ROUTES[lang][page] === '/' ? '/' : ROUTES[lang][page]);
