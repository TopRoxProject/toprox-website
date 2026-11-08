// Limbile site-ului și adresele (URL) fiecărei pagini în fiecare limbă.
// Româna e limba principală și nu are prefix în adresă.

export const SITE = 'https://toproxproject.com';
export const EMAIL = 'contact@toproxproject.com';

export const LANGS = ['ro', 'en', 'de', 'it', 'fr'];

export const LANG_META = {
  ro: { name: 'Română', short: 'RO', locale: 'ro_RO', htmlLang: 'ro' },
  en: { name: 'English', short: 'EN', locale: 'en_GB', htmlLang: 'en' },
  de: { name: 'Deutsch', short: 'DE', locale: 'de_DE', htmlLang: 'de' },
  it: { name: 'Italiano', short: 'IT', locale: 'it_IT', htmlLang: 'it' },
  fr: { name: 'Français', short: 'FR', locale: 'fr_FR', htmlLang: 'fr' },
};

export const PAGES = ['home', 'solutions', 'utilities', 'cemeteries', 'environment', 'gis', 'negotiation', 'pm', 'about', 'privacy', 'accessibility'];

export const ROUTES = {
  ro: { home: '/', solutions: '/solutii', utilities: '/utilitati', cemeteries: '/cimitire', environment: '/mediu', gis: '/gis', negotiation: '/negociere', pm: '/project-management', about: '/despre-noi', privacy: '/confidentialitate', accessibility: '/accesibilitate' },
  en: { home: '/en', solutions: '/en/solutions', utilities: '/en/utilities', cemeteries: '/en/cemeteries', environment: '/en/environment', gis: '/en/gis-courses', negotiation: '/en/negotiation', pm: '/en/project-management', about: '/en/about', privacy: '/en/privacy', accessibility: '/en/accessibility' },
  de: { home: '/de', solutions: '/de/loesungen', utilities: '/de/versorgungsnetze', cemeteries: '/de/friedhoefe', environment: '/de/umwelt', gis: '/de/gis-kurse', negotiation: '/de/verhandlung', pm: '/de/projektmanagement', about: '/de/ueber-uns', privacy: '/de/datenschutz', accessibility: '/de/barrierefreiheit' },
  it: { home: '/it', solutions: '/it/soluzioni', utilities: '/it/utility', cemeteries: '/it/cimiteri', environment: '/it/ambiente', gis: '/it/corsi-gis', negotiation: '/it/negoziazione', pm: '/it/project-management', about: '/it/chi-siamo', privacy: '/it/privacy', accessibility: '/it/accessibilita' },
  fr: { home: '/fr', solutions: '/fr/solutions', utilities: '/fr/reseaux', cemeteries: '/fr/cimetieres', environment: '/fr/environnement', gis: '/fr/formations-sig', negotiation: '/fr/negociation', pm: '/fr/gestion-de-projet', about: '/fr/a-propos', privacy: '/fr/confidentialite', accessibility: '/fr/accessibilite' },
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

// Categoriile de soluții care au pagină proprie (ancora din meniu → pagina).
export const SOLUTION_PAGES = { retele: 'utilities', cimitire: 'cemeteries', mediu: 'environment' };
