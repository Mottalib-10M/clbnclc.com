import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/guides';
export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
const R = (id: string, en: string, fr: string, noindex = false): RouteDef<Locale> => ({ id, paths: { en: `/en/${en}/`, fr: `/fr/${fr}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { en: '/en/', fr: '/fr/' } },
  R('method', 'method', 'methode'),
  R('about', 'about', 'a-propos'),
  R('widget', 'widget', 'widget', true),
  R('contact', 'contact', 'contact', true),
  R('editorial', 'editorial-policy', 'politique-editoriale', true),
  R('privacy', 'privacy', 'confidentialite', true),
  R('terms', 'legal-notice', 'mentions-legales', true),
  R('cookies', 'cookies', 'cookies', true),
];
const fromPage = (p: (typeof PAGES)[number]): RouteDef<Locale> => ({ id: p.id, paths: { en: `/en/${p.en.slug}/`, ...(p.fr ? { fr: `/fr/${p.fr.slug}/` } : {}) } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...PAGES.map(fromPage), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
