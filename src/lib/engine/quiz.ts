/**
 * Practice sets and timed mock sections drawn from the site's own question banks
 * (src/data/questions/*.json, written by Radif Partners). Same seed, same draw (shareable link,
 * hydration). A mock section follows the official count of questions and duration of the test
 * (params-2026.json), with items ordered from easiest to hardest; its result is a raw score and a
 * success rate per level, never an official TEF or TCF score.
 */
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'CLB4' | 'CLB5' | 'CLB6' | 'CLB7' | 'CLB8' | 'CLB9' | 'CLB10';
export const LEVELS_FR: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const LEVELS_EN: Level[] = ['CLB4', 'CLB5', 'CLB6', 'CLB7', 'CLB8', 'CLB9', 'CLB10'];
export const THEMES = ['daily', 'work', 'housing', 'health', 'admin', 'transport', 'education', 'media', 'environment', 'society', 'culture', 'science'] as const;
export type Theme = (typeof THEMES)[number];
export interface Question {
  id: string;
  skill: 'reading' | 'listening';
  lang: 'en' | 'fr';
  level: Level;
  theme: Theme;
  docId: string;
  doc: string;
  q: string;
  options: string[];
  answer: number;
  explain: { en: string; fr: string };
  ref: { doc: string; section: string; url: string };
}
export type BankKey = 'fr-reading' | 'fr-listening' | 'en-reading' | 'en-listening';

/** mulberry32: same seed, same draw. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function shuffle<T>(xs: T[], r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const levelIndex = (l: Level) => { const i = LEVELS_FR.indexOf(l); return i >= 0 ? i : LEVELS_EN.indexOf(l); };

export interface Filter { level?: Level | ''; theme?: Theme | '' }
/** Practice set: `n` questions of the bank matching the filter, in random order. */
export function buildPractice(bank: Question[], f: Filter, seed: number, n = 10): Question[] {
  const pool = bank.filter((q) => (!f.level || q.level === f.level) && (!f.theme || q.theme === f.theme));
  return shuffle(pool, rng(seed)).slice(0, n);
}
/**
 * Mock section of `n` questions: the same share of every level the bank holds, drawn at random,
 * then ordered from the easiest level to the hardest (both TEF and TCF raise the difficulty as the
 * section goes on). Questions sharing a document stay together.
 */
export function buildMock(bank: Question[], n: number, seed: number): Question[] {
  if (bank.length < n) throw new Error(`bank too small: ${bank.length} < ${n}`);
  const r = rng(seed);
  const levels = [...new Set(bank.map((q) => q.level))].sort((a, b) => levelIndex(a) - levelIndex(b));
  const per = levels.map((l) => bank.filter((q) => q.level === l).length);
  const quota = per.map((c) => Math.floor((c / bank.length) * n));
  let rest = n - quota.reduce((s, x) => s + x, 0);
  for (let i = levels.length - 1; rest > 0; i = (i - 1 + levels.length) % levels.length) if (quota[i] < per[i]) { quota[i]++; rest--; }
  const out: Question[] = [];
  levels.forEach((l, i) => out.push(...shuffle(bank.filter((q) => q.level === l), r).slice(0, quota[i])));
  // keep questions of one document next to each other, inside their level
  return out.sort((a, b) => levelIndex(a.level) - levelIndex(b.level) || a.docId.localeCompare(b.docId) || a.id.localeCompare(b.id));
}

export interface LevelResult { level: Level; right: number; total: number }
export function byLevel(qs: Question[], answers: Array<number | null>): LevelResult[] {
  const m = new Map<Level, LevelResult>();
  qs.forEach((q, i) => {
    const x = m.get(q.level) ?? { level: q.level, right: 0, total: 0 };
    x.total++; if (answers[i] === q.answer) x.right++;
    m.set(q.level, x);
  });
  return [...m.values()].sort((a, b) => levelIndex(a.level) - levelIndex(b.level));
}
/**
 * Our own rough reading of a result, labelled as such on the page: the highest level up to which
 * at least two thirds of the questions were answered correctly, level after level. It is not a
 * TEF or TCF score: the official scores are calibrated by the test bodies.
 */
export function indicativeLevel(rs: LevelResult[]): Level | null {
  let best: Level | null = null;
  for (const r of rs) {
    if (!r.total) continue;
    if (r.right / r.total >= 2 / 3) best = r.level; else break;
  }
  return best;
}

/** Bank check: unique ids, answer inside the options, explanation and reference present. */
export function lintBank(bank: Question[]): string[] {
  const errs: string[] = [];
  const seen = new Set<string>();
  const docs = new Map<string, string>();
  for (const q of bank) {
    if (seen.has(q.id)) errs.push(`${q.id}: duplicate id`);
    seen.add(q.id);
    if (q.options.length !== 4 || new Set(q.options).size !== 4) errs.push(`${q.id}: four distinct options expected`);
    if (q.answer < 0 || q.answer > 3) errs.push(`${q.id}: answer out of range`);
    if (!q.ref?.doc || !q.ref?.section || !q.ref?.url) errs.push(`${q.id}: reference missing`);
    if (!q.explain?.en || !q.explain?.fr || q.explain.en.split(/\s+/).length < 12 || q.explain.fr.split(/\s+/).length < 12) errs.push(`${q.id}: explanation too short`);
    if (levelIndex(q.level) < 0) errs.push(`${q.id}: unknown level`);
    if (!THEMES.includes(q.theme)) errs.push(`${q.id}: unknown theme`);
    const d = docs.get(q.docId);
    if (d !== undefined && d !== q.doc) errs.push(`${q.id}: document differs from the other questions of ${q.docId}`);
    docs.set(q.docId, q.doc);
  }
  return errs;
}
