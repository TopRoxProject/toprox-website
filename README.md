# TopRox Project SRL – website

Site multilingv (română, engleză, germană, italiană, franceză), construit în React și publicat pe Cloudflare Pages.

## Unde se modifică textele

Tot conținutul e în `src/i18n/`, câte un fișier pe limbă:

| Fișier | Limba |
|---|---|
| `ro.js` | română (limba principală) |
| `en.js` | engleză |
| `de.js` | germană |
| `it.js` | italiană |
| `fr.js` | franceză |

Când schimbați un text în română, schimbați-l și în celelalte patru fișiere. Toate au aceeași structură.
Comanda `node scripts/check-translations.js` verifică dacă vreo limbă are câmpuri lipsă.

Adresele paginilor în fiecare limbă sunt în `src/i18n/config.js`.

## Cum se publică

Cloudflare Pages rulează `npm run build` (director de ieșire: `build`, Node 20 din `.node-version`), care:

1. construiește aplicația React;
2. rulează `scripts/prerender.js`, care scrie câte o pagină HTML completă pentru fiecare limbă
   (titlu, descriere, adrese hreflang, date structurate pentru Google), plus `404.html`,
   `sitemap.xml` și `robots.txt`.

Cloudflare servește fiecare adresă din fișierul ei (de exemplu `/en/solutions` din `en/solutions.html`). Adresele inexistente primesc `404.html` cu status 404. Antetele de securitate sunt în `public/_headers`.

## Ce respectă site-ul

- **SEO:** fiecare pagină are conținutul deja în HTML, titlu și descriere proprii, adresă canonică,
  legături hreflang între cele 5 limbi, sitemap multilingv și date structurate schema.org.
- **Accesibilitate:** WCAG 2.1 nivel AA / EN 301 549 (Directiva (UE) 2019/882, Legea 232/2022).
  Verificat cu axe-core pe toate cele 31 de pagini, fără erori.
- **GDPR:** fără cookie-uri și fără instrumente de urmărire; fonturile sunt găzduite pe site
  (pachetele `@fontsource-variable/inter` și `@fontsource-variable/plus-jakarta-sans`), nu la Google.
