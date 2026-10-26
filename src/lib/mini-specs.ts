/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always through the site's
 * engines and params-2026.json, never a second formula. English and Canadian French.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { levelOf, cefrOf, tefIrnLevel, type Skill, type TestId } from './engine/clb';
import { firstLanguagePoints, frenchBonus } from './engine/crs';
import { money, formatNumberL } from './format-l';

type L = 'en' | 'fr';
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const N = (v: number, lang: L, d = 0) => formatNumberL(v, lang, d);
const SK: Skill[] = ['R', 'W', 'L', 'S'];
const skillOpts = (lang: L) => SK.map((s, i) => ({ value: String(i), label: lang === 'fr' ? ['Compréhension écrite', 'Expression écrite', 'Compréhension orale', 'Expression orale'][i] : ['Reading', 'Writing', 'Listening', 'Speaking'][i] }));
const lvName = (lv: number, tag: string, lang: L) => (lv < 4 ? (lang === 'fr' ? `sous ${tag} 4` : `below ${tag} 4`) : `${tag} ${lv}`);
const all = (n: number) => ({ R: n, W: n, L: n, S: n });
const fr = (lang: L) => lang === 'fr';

function scoreSpec(test: TestId, lang: L, ctaPage: string, title: { en: string; fr: string }): MiniSpec {
  return {
    title: title[lang], cta: fr(lang) ? 'Convertir les quatre épreuves et voir les points' : 'Convert all four skills and see the points', ctaPage,
    inputs: [{ id: 'sk', label: fr(lang) ? 'Épreuve' : 'Skill', def: 0, options: skillOpts(lang) }, { id: 'x', label: 'Score', def: test === 'tcf' ? 460 : 450, max: 699 }],
    run: (v) => {
      const s = SK[clamp(Math.round(v.sk ?? 0), 0, 3)];
      const max = test === 'tcf' && (s === 'W' || s === 'S') ? 20 : 699;
      const x = clamp(v.x ?? 0, 0, max);
      const lv = levelOf(test, s, x, false), cap = Math.min(lv, 10);
      return {
        head: [fr(lang) ? 'Niveau NCLC' : 'NCLC level', lvName(lv, 'NCLC', lang)],
        rows: [
          [fr(lang) ? 'Échelle de cette épreuve' : 'Scale of this skill', `0–${max}`],
          [fr(lang) ? 'Points en première langue (seul)' : 'First-language points (single)', N(firstLanguagePoints(all(cap), false) / 4, lang)],
          [fr(lang) ? 'NCLC 7 (Entrée express)' : 'NCLC 7 (Express Entry)', cap >= 7 ? (fr(lang) ? 'atteint' : 'reached') : (fr(lang) ? 'pas encore' : 'not yet')],
        ],
        note: test === 'tcf' && max === 20 ? (fr(lang) ? 'Expression écrite et orale du TCF Canada : note sur 20.' : 'TCF Canada writing and speaking are marked out of 20.') : undefined,
      };
    },
  };
}

const SPECS: Record<string, (lang: L) => MiniSpec> = {
  tefnclc: (lang) => scoreSpec('tef', lang, 'tef-canada-score', { en: 'One TEF Canada score to NCLC', fr: 'Un score TEF Canada en NCLC' }),
  tcfnclc: (lang) => scoreSpec('tcf', lang, 'tcf-canada-score', { en: 'One TCF Canada score to NCLC', fr: 'Un score TCF Canada en NCLC' }),
  celpipclb: (lang) => ({
    title: fr(lang) ? 'Niveau CELPIP et points en première langue' : 'CELPIP level and first-language points', cta: fr(lang) ? 'Convertir tous les tests' : 'Convert every test', ctaPage: 'home',
    inputs: [{ id: 'lv', label: fr(lang) ? 'Niveau CELPIP à chaque épreuve' : 'CELPIP level on every skill', def: 8, max: 12 }, { id: 'sp', label: fr(lang) ? 'Époux qui accompagne' : 'Spouse coming', def: 0, options: fr(lang) ? [{ value: '0', label: 'Non' }, { value: '1', label: 'Oui' }] : [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }] }],
    run: (v) => {
      const lv = levelOf('celpip', 'R', clamp(Math.round(v.lv ?? 0), 0, 12));
      const pts = firstLanguagePoints(all(lv), !!v.sp);
      return { head: [fr(lang) ? 'Points de première langue' : 'First-language points', N(pts, lang)], rows: [[fr(lang) ? 'Niveau CLB' : 'CLB level', lvName(lv, 'CLB', lang)], [fr(lang) ? 'Par compétence' : 'Per skill', N(pts / 4, lang)], [fr(lang) ? 'Maximum possible' : 'Maximum possible', N(v.sp ? P.crs.first.max.withSpouse : P.crs.first.max.single, lang)]] };
    },
  }),
  ieltsclb: (lang) => ({
    title: fr(lang) ? 'Une bande IELTS General Training en CLB' : 'One IELTS General Training band to CLB', cta: fr(lang) ? 'Comparer avec le CELPIP' : 'Compare with CELPIP', ctaPage: 'celpip-vs-ielts',
    inputs: [{ id: 'sk', label: fr(lang) ? 'Compétence' : 'Skill', def: 2, options: skillOpts(lang) }, { id: 'b', label: fr(lang) ? 'Bande' : 'Band', def: 6.5, max: 9, decimals: 1 }],
    run: (v) => {
      const s = SK[clamp(Math.round(v.sk ?? 0), 0, 3)], b = Math.round(clamp(v.b ?? 0, 0, 9) * 2) / 2, lv = levelOf('ielts', s, b);
      return { head: [fr(lang) ? 'Niveau CLB' : 'CLB level', lvName(lv, 'CLB', lang)], rows: [[fr(lang) ? 'Bande lue (demi-points)' : 'Band read (half points)', N(b, lang, 1)], [fr(lang) ? 'Équivalent CELPIP' : 'CELPIP equivalent', lv >= 4 ? N(lv, lang) : '–']] };
    },
  }),
  crsfirst: (lang) => ({
    title: fr(lang) ? 'Points de première langue selon le niveau' : 'First-language points by level', cta: fr(lang) ? 'Calcul complet des points de langue' : 'Full language points calculator', ctaPage: 'crs-language',
    inputs: [{ id: 'lv', label: fr(lang) ? 'Niveau CLB/NCLC aux quatre épreuves' : 'CLB/NCLC on all four skills', def: 9, max: 10 }],
    run: (v) => {
      const lv = clamp(Math.round(v.lv ?? 0), 0, 10);
      const a = firstLanguagePoints(all(lv), false), b = firstLanguagePoints(all(lv), true);
      return { head: [fr(lang) ? 'Sans époux' : 'Single', N(a, lang)], rows: [[fr(lang) ? 'Avec époux qui accompagne' : 'With a spouse coming', N(b, lang)], [fr(lang) ? 'Un niveau de plus partout' : 'One level more everywhere', lv < 10 ? `+${N(firstLanguagePoints(all(lv + 1), false) - a, lang)}` : '–']] };
    },
  }),
  clbgap: (lang) => ({
    title: fr(lang) ? 'Ce que rapporte un niveau de plus' : 'What one more level is worth', cta: fr(lang) ? 'Voir les scores à viser' : 'See the scores to aim for', ctaPage: 'clb-7',
    inputs: [{ id: 'a', label: fr(lang) ? 'Niveau actuel (quatre épreuves)' : 'Current level (all four)', def: 6, max: 10 }, { id: 'b', label: fr(lang) ? 'Niveau visé' : 'Target level', def: 7, max: 10 }],
    run: (v) => {
      const a = clamp(Math.round(v.a ?? 0), 0, 10), b = clamp(Math.round(v.b ?? 0), 0, 10);
      const gain = firstLanguagePoints(all(b), false) - firstLanguagePoints(all(a), false);
      return { head: [fr(lang) ? 'Points gagnés (sans époux)' : 'Points gained (single)', `${gain >= 0 ? '+' : ''}${N(gain, lang)}`], rows: [[fr(lang) ? 'Admissible aux travailleurs qualifiés' : 'Federal Skilled Worker minimum', b >= P.ee.fsw ? (fr(lang) ? 'oui' : 'yes') : (fr(lang) ? 'non' : 'no')], [fr(lang) ? 'Bonus francophone possible (en français)' : 'French bonus possible (if French)', b >= P.crs.frenchBonus.nclc ? (fr(lang) ? 'oui' : 'yes') : (fr(lang) ? 'non' : 'no')]] };
    },
  }),
  frbonus: (lang) => ({
    title: fr(lang) ? 'Mon bonus francophone' : 'My French-language bonus', cta: fr(lang) ? 'Calcul complet des points de langue' : 'Full language points calculator', ctaPage: 'crs-language',
    inputs: [{ id: 'f', label: fr(lang) ? 'NCLC le plus bas en français' : 'Lowest French NCLC', def: 7, max: 10 }, { id: 'e', label: fr(lang) ? 'CLB le plus bas en anglais (0 = pas de test)' : 'Lowest English CLB (0 = no test)', def: 5, max: 10 }],
    run: (v) => {
      const f = clamp(Math.round(v.f ?? 0), 0, 10), e = clamp(Math.round(v.e ?? 0), 0, 10);
      const b = frenchBonus(all(f), e ? all(e) : null);
      return { head: [fr(lang) ? 'Bonus' : 'Bonus', N(b, lang)], rows: [[fr(lang) ? 'Seuil en français' : 'French threshold', `NCLC ${P.crs.frenchBonus.nclc}`], [fr(lang) ? 'Pour 50 points' : 'For 50 points', fr(lang) ? 'anglais CLB 5 ou plus partout' : 'English CLB 5 or more on all four']] };
    },
  }),
  citizenship: (lang) => ({
    title: fr(lang) ? 'Ma preuve de langue pour la citoyenneté' : 'My language proof for citizenship', cta: fr(lang) ? 'Voir les tests acceptés' : 'See the accepted tests', ctaPage: 'citizenship-language',
    inputs: [{ id: 'l', label: fr(lang) ? 'Niveau à l’écoute' : 'Listening level', def: 5, max: 10 }, { id: 's', label: fr(lang) ? 'Niveau à l’oral' : 'Speaking level', def: 4, max: 10 }],
    run: (v) => {
      const l = clamp(Math.round(v.l ?? 0), 0, 10), s = clamp(Math.round(v.s ?? 0), 0, 10), ok = l >= P.citizenship.clb && s >= P.citizenship.clb;
      return { head: [fr(lang) ? 'Exigence remplie' : 'Requirement met', ok ? (fr(lang) ? 'Oui' : 'Yes') : (fr(lang) ? 'Non' : 'No')], rows: [[fr(lang) ? 'Seuil' : 'Threshold', `CLB/NCLC ${P.citizenship.clb}`], [fr(lang) ? 'Âges concernés' : 'Ages concerned', `${P.citizenship.ages[0]}–${P.citizenship.ages[1]}`], [fr(lang) ? 'Lecture et écriture' : 'Reading and writing', fr(lang) ? 'non évaluées' : 'not assessed']] };
    },
  }),
  validity: (lang) => ({
    title: fr(lang) ? 'Combien de temps mon test reste valable' : 'How long my test stays valid', cta: fr(lang) ? 'Calculer avec les dates exactes' : 'Work it out with exact dates', ctaPage: 'test-validity',
    inputs: [{ id: 'm', label: fr(lang) ? 'Mois écoulés depuis l’attestation' : 'Months since the report', def: 15, max: 60 }],
    run: (v) => {
      const m = clamp(Math.round(v.m ?? 0), 0, 60), left = P.ee.validityYears * 12 - m;
      return { head: [fr(lang) ? 'Mois restants' : 'Months left', left > 0 ? N(left, lang) : (fr(lang) ? 'expiré' : 'expired')], rows: [[fr(lang) ? 'Durée pour IRCC' : 'Validity for IRCC', fr(lang) ? `${P.ee.validityYears} ans` : `${P.ee.validityYears} years`], [fr(lang) ? 'Citoyenneté' : 'Citizenship', fr(lang) ? 'résultats expirés acceptés' : 'expired results accepted']] };
    },
  }),
  retake: (lang) => ({
    title: fr(lang) ? 'Quand puis-je repasser le test ?' : 'When can I sit the test again?', cta: fr(lang) ? 'Calendrier complet' : 'Full calendar', ctaPage: 'results-retake',
    inputs: [{ id: 't', label: 'Test', def: 0, options: [{ value: '0', label: 'TEF' }, { value: '1', label: 'TCF' }] }, { id: 'd', label: fr(lang) ? 'Jours depuis la dernière passation' : 'Days since the last sitting', def: 12, max: 365 }],
    run: (v) => {
      const tef = !v.t, d = clamp(Math.round(v.d ?? 0), 0, 365), need = tef ? P.tef.retakeDays + 1 : P.tcf.retakeDays, wait = Math.max(0, need - d);
      return { head: [fr(lang) ? 'Jours à attendre' : 'Days to wait', N(wait, lang)], rows: [[fr(lang) ? 'Règle' : 'Rule', tef ? (fr(lang) ? `pas la même épreuve dans les ${P.tef.retakeDays} jours` : `not the same test within ${P.tef.retakeDays} days`) : (fr(lang) ? `${P.tcf.retakeDays} jours entre deux passations` : `${P.tcf.retakeDays} days between sittings`)]] };
    },
  }),
  words: (lang) => ({
    title: fr(lang) ? 'Mon texte est-il assez long ?' : 'Is my text long enough?', cta: fr(lang) ? 'S’entraîner avec chrono et compteur' : 'Practise with timer and counter', ctaPage: 'french-writing',
    inputs: [{ id: 't', label: fr(lang) ? 'Tâche' : 'Task', def: 1, options: [{ value: '0', label: 'TEF A' }, { value: '1', label: 'TEF B' }, { value: '2', label: 'TCF 1' }, { value: '3', label: 'TCF 2' }, { value: '4', label: 'TCF 3' }] }, { id: 'w', label: fr(lang) ? 'Mots écrits' : 'Words written', def: 170, max: 1000 }],
    run: (v) => {
      const W = P.tcf.canada.ee.words, ranges: Array<[number, number | null]> = [[P.tef.canada.ee.a.words, null], [P.tef.canada.ee.b.words, null], [W[0][0], W[0][1]], [W[1][0], W[1][1]], [W[2][0], W[2][1]]];
      const [lo, hi] = ranges[clamp(Math.round(v.t ?? 0), 0, 4)], w = clamp(Math.round(v.w ?? 0), 0, 1000);
      const ok = w >= lo && (!hi || w <= hi);
      return { head: [fr(lang) ? 'Longueur' : 'Length', ok ? (fr(lang) ? 'correcte' : 'fine') : w < lo ? (fr(lang) ? 'trop court' : 'too short') : (fr(lang) ? 'trop long' : 'too long')], rows: [[fr(lang) ? 'Attendu' : 'Expected', hi ? `${lo}–${hi}` : `${lo}+`], [fr(lang) ? 'Écart' : 'Gap', w < lo ? `−${N(lo - w, lang)}` : hi && w > hi ? `+${N(w - hi, lang)}` : '0']] };
    },
  }),
  pace: (lang) => ({
    title: fr(lang) ? 'Mon temps par question' : 'My time per question', cta: fr(lang) ? 'Faire l’examen blanc chronométré' : 'Take the timed mock', ctaPage: 'tef-mock',
    inputs: [{ id: 's', label: fr(lang) ? 'Section' : 'Section', def: 0, options: [{ value: '0', label: fr(lang) ? 'TEF compréhension écrite' : 'TEF reading' }, { value: '1', label: fr(lang) ? 'TEF compréhension orale' : 'TEF listening' }, { value: '2', label: fr(lang) ? 'TCF compréhension écrite' : 'TCF reading' }, { value: '3', label: fr(lang) ? 'TCF compréhension orale' : 'TCF listening' }] }, { id: 'r', label: fr(lang) ? 'Minutes gardées pour relire' : 'Minutes kept to check', def: 5, max: 30 }],
    run: (v) => {
      const sec = [P.tef.canada.ce, P.tef.canada.co, P.tcf.canada.ce, P.tcf.canada.co][clamp(Math.round(v.s ?? 0), 0, 3)];
      const r = clamp(Math.round(v.r ?? 0), 0, sec.min - 1), per = ((sec.min - r) * 60) / sec.q;
      return { head: [fr(lang) ? 'Secondes par question' : 'Seconds per question', N(per, lang)], rows: [[fr(lang) ? 'Format' : 'Format', fr(lang) ? `${sec.q} questions en ${sec.min} min` : `${sec.q} questions in ${sec.min} min`]] };
    },
  }),
  cost: (lang) => ({
    title: fr(lang) ? 'Coût de plusieurs passations' : 'Cost of several sittings', cta: fr(lang) ? 'Budget complet' : 'Full budget', ctaPage: 'test-cost',
    inputs: [{ id: 'f', label: fr(lang) ? 'Tarif de votre centre' : 'Fee at your centre', def: P.fees.afEdmonton.full, max: 5000, unit: '$' }, { id: 'n', label: fr(lang) ? 'Passations' : 'Sittings', def: 2, max: 5 }],
    run: (v) => {
      const f = clamp(v.f ?? 0, 0, 5000), n = clamp(Math.round(v.n ?? 1), 1, 5);
      return { head: ['Total', money(f * n, 'CAD', lang)], rows: [[fr(lang) ? 'Chaque passation en plus' : 'Each extra sitting', money(f, 'CAD', lang)]], note: fr(lang) ? 'Chaque centre fixe son tarif.' : 'Each centre sets its own fee.' };
    },
  }),
  cefr: (lang) => ({
    title: fr(lang) ? 'Un score TEF ou TCF en niveau du CECR' : 'One TEF or TCF score to a CEFR level', cta: fr(lang) ? 'Les quatre épreuves et le niveau global' : 'All four tests and the overall level', ctaPage: 'tef-tcf-cefr',
    inputs: [{ id: 't', label: 'Test', def: 0, options: [{ value: '0', label: 'TEF (0–699)' }, { value: '1', label: 'TCF (100–699)' }] }, { id: 'x', label: 'Score', def: 410, max: 699 }],
    run: (v) => {
      const x = clamp(v.x ?? 0, 0, 699), lv = cefrOf(v.t ? 'tcf' : 'tef', x);
      return { head: [fr(lang) ? 'Niveau' : 'Level', lv], rows: [[fr(lang) ? 'B2 (naturalisation)' : 'B2 (naturalisation)', x >= 400 ? (fr(lang) ? 'atteint sur cette épreuve' : 'reached on this test') : (fr(lang) ? `${N(400 - x, lang)} points manquants` : `${N(400 - x, lang)} points short`)]] };
    },
  }),
  irn: (lang) => ({
    title: fr(lang) ? 'Mon niveau global au TEF IRN' : 'My TEF IRN overall level', cta: fr(lang) ? 'Saisir les quatre épreuves' : 'Enter all four tests', ctaPage: 'tef-tcf-cefr',
    inputs: [{ id: 'a', label: fr(lang) ? 'Score de la 3e meilleure épreuve' : 'Third-best test score', def: 410, max: 699 }, { id: 'b', label: fr(lang) ? 'Score de l’épreuve la moins réussie' : 'Weakest test score', def: 370, max: 699 }],
    run: (v) => {
      const a = clamp(v.a ?? 0, 0, 699), b = clamp(Math.min(v.b ?? 0, a), 0, 699), lv = tefIrnLevel({ R: 699, W: 699, L: a, S: b });
      return { head: [fr(lang) ? 'Niveau global' : 'Overall level', lv], rows: [['B2', `${P.tef.irn.levels[0][1]} / ${P.tef.irn.levels[0][2]}`], ['B1', `${P.tef.irn.levels[1][1]} / ${P.tef.irn.levels[1][2]}`], ['A2', `${P.tef.irn.levels[2][1]} / ${P.tef.irn.levels[2][2]}`]], note: fr(lang) ? 'Seuils : trois épreuves / épreuve la moins réussie.' : 'Thresholds: three tests / weakest test.' };
    },
  }),
  plan: (lang) => ({
    title: fr(lang) ? 'Mon plan de préparation' : 'My preparation plan', cta: fr(lang) ? 'Commencer par la compréhension écrite' : 'Start with reading practice', ctaPage: 'french-reading',
    inputs: [{ id: 'w', label: fr(lang) ? 'Semaines avant le test' : 'Weeks before the test', def: 8, max: 52 }, { id: 'h', label: fr(lang) ? 'Heures par semaine' : 'Hours a week', def: 5, max: 40 }],
    run: (v) => {
      const w = clamp(Math.round(v.w ?? 1), 1, 52), h = clamp(v.h ?? 1, 1, 40), tot = w * h, mocks = Math.min(4, Math.max(1, Math.floor(w / 2)));
      return { head: [fr(lang) ? 'Heures au total' : 'Total hours', N(tot, lang)], rows: [[fr(lang) ? 'Par épreuve (quatre)' : 'Per skill (four)', `${N(tot / 4, lang, 1)} h`], [fr(lang) ? 'Examens blancs à placer' : 'Mock sections to schedule', N(mocks, lang)]], note: fr(lang) ? 'Répartition égale : notre suggestion, pas une règle officielle.' : 'Equal split: our suggestion, not an official rule.' };
    },
  }),
};
export function getSpec(kind: string, lang: L): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool: ${kind}`);
  return f(lang);
}
export const SPEC_KINDS = Object.keys(SPECS);
