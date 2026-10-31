import React from 'react';
import { I18nProvider } from './i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Gis from './pages/Gis';
import Negotiation from './pages/Negotiation';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

const PAGES = {
  home: () => <Home />,
  solutions: () => <Solutions />,
  gis: () => <Gis />,
  negotiation: () => <Negotiation />,
  privacy: () => <Legal which="privacy" />,
  accessibility: () => <Legal which="accessibility" />,
};

// lang + page vin din adresă (client) sau din scriptul de prerandare (server).
export default function App({ lang, page }) {
  const notFound = !page;
  return (
    <I18nProvider lang={lang} page={page || 'notFound'}>
      <Header notFound={notFound} />
      <main id="main" tabIndex={-1}>
        {notFound ? <NotFound /> : PAGES[page]()}
        {page !== 'privacy' && page !== 'accessibility' && <Contact />}
      </main>
      <Footer />
    </I18nProvider>
  );
}
