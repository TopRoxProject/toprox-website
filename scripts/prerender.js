/*
 * Rulează automat după `npm run build` ("postbuild" în package.json).
 *
 * Generează câte un fișier HTML complet pentru fiecare pagină și fiecare limbă
 * (5 limbi × 6 pagini), cu tot conținutul deja în HTML, plus:
 *  - titlu, descriere, adresă canonică și legături hreflang între limbi;
 *  - etichete Open Graph / Twitter pentru distribuire;
 *  - date structurate schema.org (firmă, servicii, cursuri, breadcrumb);
 *  - pagina 404.html, sitemap.xml cu toate limbile și robots.txt.
 * Cloudflare Pages servește fiecare adresă din fișierul ei (/en/solutions → en/solutions.html).
 */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const OUT = path.join(ROOT, 'node_modules', '.cache', 'ssr', 'server.js');

esbuild.buildSync({
  entryPoints: [path.join(ROOT, 'src', 'server.js')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  outfile: OUT,
  jsx: 'automatic',
  loader: { '.js': 'jsx', '.css': 'empty' },
  external: ['react', 'react-dom', '@emailjs/browser'],
  logLevel: 'warning',
});
// eslint-disable-next-line import/no-dynamic-require
const S = require(OUT);
const { render, DICTS, LANGS, LANG_META, PAGES, ROUTES, SITE, EMAIL } = S;

const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = p => SITE + (p === '/' ? '/' : p);
const OG_IMAGE = `${SITE}/images/og-toprox.png`;
const TODAY = '2026-10-31';

const ORG_ID = `${SITE}/#organization`;
const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: 'TopRox Project SRL',
  url: `${SITE}/`,
  logo: `${SITE}/images/logo-transparent.png`,
  image: OG_IMAGE,
  email: EMAIL,
  address: { '@type': 'PostalAddress', addressLocality: 'Sibiu', addressRegion: 'Sibiu', addressCountry: 'RO' },
  geo: { '@type': 'GeoCoordinates', latitude: 45.7983, longitude: 24.1256 },
  openingHours: 'Mo-Fr 09:00-18:00',
  areaServed: [{ '@type': 'Country', name: 'Romania' }, { '@type': 'Place', name: 'European Union' }],
  knowsLanguage: ['ro', 'en'],
  sameAs: ['https://www.linkedin.com/company/toprox-project-srl/', 'https://www.facebook.com/profile.php?id=100087336002775'],
};

function structured(lang, page) {
  const t = DICTS[lang];
  const pageUrl = abs(ROUTES[lang][page]);
  const graph = [organization];
  graph.push({
    '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'TopRox Project',
    publisher: { '@id': ORG_ID }, inLanguage: LANGS.map(l => LANG_META[l].htmlLang),
  });
  const webPage = {
    '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: t.seo[page].title,
    description: t.seo[page].description, inLanguage: LANG_META[lang].htmlLang,
    isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': ORG_ID },
  };
  graph.push(webPage);
  if (page !== 'home') {
    const names = { solutions: t.common.nav.solutions, gis: t.common.nav.gisCourses, negotiation: t.common.nav.negotiation, privacy: t.common.footer.privacy, accessibility: t.common.footer.accessibility };
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'TopRox Project', item: abs(ROUTES[lang].home) },
        { '@type': 'ListItem', position: 2, name: names[page], item: pageUrl },
      ],
    });
  }
  const provider = { '@id': ORG_ID };
  if (page === 'solutions') {
    const s = t.solutions;
    const services = [
      ...s.items.map(i => ({ name: i.title, description: i.intro, url: `${pageUrl}#${i.id}` })),
      { name: s.cat2.subtitle, description: s.cat2.desc, url: `${pageUrl}#cimitire` },
      ...s.any.focus.map(f => ({ name: f.title, description: f.intro, url: `${pageUrl}#orice-domeniu` })),
    ];
    graph.push({
      '@type': 'ItemList', name: t.seo.solutions.title,
      itemListElement: services.map((x, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Service', ...x, provider, areaServed: organization.areaServed } })),
    });
    graph.push({
      '@type': 'SoftwareApplication', name: 'EGIE', applicationCategory: 'BusinessApplication',
      description: s.egie.intro, creator: provider, url: `${pageUrl}#egie`,
    });
  }
  const course = (name, description) => ({
    '@type': 'Course', name, description, provider,
  });
  if (page === 'gis') {
    const items = t.gis.services.items.slice(0, 2);
    graph.push({ '@type': 'ItemList', itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `${pageUrl}#gis-courses`, item: course(c.title, c.short) })) });
  }
  if (page === 'negotiation') {
    const n = t.negotiation;
    graph.push({ '@type': 'ItemList', itemListElement: ['gm', 'pm'].map((k, i) => ({ '@type': 'ListItem', position: i + 1, url: `${pageUrl}#editions`, item: course(`${n.tabs[k]} – ${n.hero.title} ${n.hero.accent}`.replace(/\.$/, ''), n.hero.sub) })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function head(lang, page) {
  const t = DICTS[lang];
  const url = abs(ROUTES[lang][page]);
  const m = LANG_META[lang];
  const lines = [
    `<title>${esc(t.seo[page].title)}</title>`,
    `<meta name="description" content="${esc(t.seo[page].description)}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large">`,
    `<link rel="canonical" href="${url}">`,
    ...LANGS.map(l => `<link rel="alternate" hreflang="${LANG_META[l].htmlLang}" href="${abs(ROUTES[l][page])}">`),
    `<link rel="alternate" hreflang="x-default" href="${abs(ROUTES.ro[page])}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="TopRox Project">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${esc(t.seo[page].title)}">`,
    `<meta property="og:description" content="${esc(t.seo[page].description)}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="TopRox Project">`,
    `<meta property="og:locale" content="${m.locale}">`,
    ...LANGS.filter(l => l !== lang).map(l => `<meta property="og:locale:alternate" content="${LANG_META[l].locale}">`),
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(t.seo[page].title)}">`,
    `<meta name="twitter:description" content="${esc(t.seo[page].description)}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
    `<script type="application/ld+json">${JSON.stringify(structured(lang, page)).replace(/</g, '\\u003c')}</script>`,
  ];
  return lines.join('');
}

function fill(html, { lang, headHtml, body, notFound }) {
  const marker = /<meta name="x-head" content="1"\s*\/?>/;
  if (!marker.test(html)) throw new Error('prerender: marcajul x-head lipsește din build/index.html');
  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${LANG_META[lang].htmlLang}"${notFound ? ` data-lang="${lang}"` : ''}>`)
    .replace(marker, () => headHtml)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const fileFor = route => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);
let count = 0;
for (const lang of LANGS) {
  for (const page of PAGES) {
    const html = fill(template, { lang, headHtml: head(lang, page), body: render(lang, page) });
    const file = path.join(BUILD, fileFor(ROUTES[lang][page]));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    count += 1;
  }
}

// 404 – Cloudflare Pages o servește cu status 404 pentru orice adresă inexistentă
const nfHead = `<title>${esc(DICTS.ro.seo.notFound.title)}</title><meta name="robots" content="noindex, follow">`;
fs.writeFileSync(path.join(BUILD, '404.html'), fill(template, { lang: 'ro', headHtml: nfHead, body: render('ro', null), notFound: true }));

// Sitemap cu toate limbile (hreflang în sitemap)
const PRIORITY = { home: '1.0', solutions: '0.9', gis: '0.8', negotiation: '0.8', privacy: '0.3', accessibility: '0.3' };
const urls = [];
for (const page of PAGES) {
  for (const lang of LANGS) {
    const alts = LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${LANG_META[l].htmlLang}" href="${abs(ROUTES[l][page])}"/>`).join('\n');
    urls.push(`  <url>\n    <loc>${abs(ROUTES[lang][page])}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>${PRIORITY[page]}</priority>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(ROUTES.ro[page])}"/>\n  </url>`);
  }
}
fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(BUILD, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`prerender: ${count} pagini + 404.html + sitemap.xml (${urls.length} adrese)`);
