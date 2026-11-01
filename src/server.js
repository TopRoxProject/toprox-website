// Punct de intrare folosit doar la build: generează HTML-ul fiecărei pagini.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { DICTS } from './i18n';

export function render(lang, page) {
  return renderToString(<App lang={lang} page={page} />);
}
export { DICTS };
export * from './i18n/config';
