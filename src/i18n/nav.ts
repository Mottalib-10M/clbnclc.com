import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  en: { home: 'Score to CLB and CRS points', method: 'How charts and questions are built', about: 'About', widget: 'Embed the converter', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  fr: { home: 'Score en NCLC et points', method: 'Méthode', about: 'À propos', widget: 'Intégrer le convertisseur', contact: 'Contact', editorial: 'Politique éditoriale', privacy: 'Confidentialité', terms: 'Mentions légales', cookies: 'Témoins (cookies)' },
};
const GROUP_LABEL: Record<Locale, Record<Group, string>> = {
  en: { scores: 'Scores and levels', practice: 'Practice', exam: 'Booking the test', france: 'Tests for France' },
  fr: { scores: 'Scores et niveaux', practice: 'Entraînement', exam: 'Passer le test', france: 'Tests pour la France' },
};
export const GROUPS_ORDER: Group[] = ['scores', 'practice', 'exam', 'france'];
export const groupLabel = (g: Group, lang: Locale) => GROUP_LABEL[lang][g];
export const label = (id: string, lang: Locale = 'en') => CORE[lang][id] ?? pageById(id)?.[lang]?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS_ORDER.map((g) => ({ label: GROUP_LABEL[lang][g], links: g === 'scores' ? [link('home', lang), ...inGroup(g, lang)] : inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...navCategories(lang),
  { label: lang === 'fr' ? 'Ce site' : 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
export const popularLinks = (_lang: Locale): NavLink[] => [];
