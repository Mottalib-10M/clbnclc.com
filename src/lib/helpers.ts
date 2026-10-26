/** Writing helpers handed to every page: links, figures read from params-2026.json, tables. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL } from './format-l';
import { BANKS } from './banks-build';
import { rangeFor, SKILLS, type TestId } from './engine/clb';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>, lang: Locale) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export function helpers(lang: Locale, strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  /** Link to an official source; the French page uses the French URL when the source has one. */
  const src = (k: SourceKey, text: string) => {
    const s = P.sources[k] as { url: string; urlFr?: string };
    return ext(lang === 'fr' && s.urlFr ? s.urlFr : s.url, text);
  };
  const num = (n: number, d = 0) => formatNumberL(n, lang, d);
  const fmtScore = (t: TestId, x: number) => formatNumberL(x, lang, t === 'ielts' ? 1 : 0);
  /** Score range of one level, per skill, as text ("434–461"), read from the IRCC/CCI tables. */
  const range = (t: TestId, s: (typeof SKILLS)[number], level: number) => {
    const r = rangeFor(t, s, level);
    if (!r) return '–';
    return r[0] === r[1] ? fmtScore(t, r[0]) : `${fmtScore(t, r[0])}–${fmtScore(t, r[1])}`;
  };
  /** Full equivalency table of a test: one row per level, one column per skill. */
  const chart = (t: TestId, levels: number[], caption?: string) => {
    const head = lang === 'fr' ? ['NCLC / CLB', 'Compréhension écrite', 'Expression écrite', 'Compréhension orale', 'Expression orale'] : ['CLB / NCLC', 'Reading', 'Writing', 'Listening', 'Speaking'];
    return table(head, levels.map((lv) => [String(lv), ...SKILLS.map((s) => range(t, s, lv))]), caption, ['l', 'r', 'r', 'r', 'r'], lang);
  };
  return {
    lang, a, ext, src, num, P, range, chart,
    cad: (n: number) => money(n, 'CAD', lang),
    pc: (x: number, d = 0) => pct(x, lang, d),
    date: (iso: string) => dateL(iso, lang),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al, lang),
    /** Size of each bank, read from the JSON (never typed in a page). */
    bankSize: { frReading: BANKS['fr-reading'].length, frListening: BANKS['fr-listening'].length, enReading: BANKS['en-reading'].length, enListening: BANKS['en-listening'].length },
  };
}
export type Helpers = ReturnType<typeof helpers>;
