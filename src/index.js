import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import './styles.css';
import App from './App';
import { matchRoute, langFromPath } from './i18n/config';

const container = document.getElementById('root');
const m = matchRoute(window.location.pathname);
// Pe paginile de eroare limba vine din atributul <html lang> scris la prerandare.
const lang = m ? m.lang : (document.documentElement.getAttribute('data-lang') || langFromPath(window.location.pathname));
const app = <App lang={lang} page={m ? m.page : null} />;

if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
