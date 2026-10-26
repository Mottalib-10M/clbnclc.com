/**
 * Language test score → CLB / NCLC level, skill by skill, from the IRCC equivalency charts
 * (params-2026.json, `tests`). Pure functions: no clock, no DOM. A level below 4 is returned as 0
 * ("below CLB 4"), because no IRCC programme counts it.
 */
import P from '../../data/params-2026.json';

export type Skill = 'R' | 'W' | 'L' | 'S';
export const SKILLS: Skill[] = ['R', 'W', 'L', 'S'];
/** `tef` = TEF Canada sat from 11 December 2023; `tef2019` = 1 October 2019 to 10 December 2023;
 *  `tefOld` = scores of the "équivalence ancien score" column (and tests sat before 1 October 2019). */
export type TestId = 'tef' | 'tef2019' | 'tefOld' | 'tcf' | 'celpip' | 'ielts' | 'pte';
export const FRENCH_TESTS: TestId[] = ['tef', 'tef2019', 'tefOld', 'tcf'];
export const ENGLISH_TESTS: TestId[] = ['celpip', 'ielts', 'pte'];
export const isFrench = (t: TestId) => FRENCH_TESTS.includes(t);
export type Scores = Record<Skill, number>;
export type Levels = Record<Skill, number>;

type Row = [number, number];
const T = P.tests;
const rows = (t: TestId, s: Skill): Row[] => {
  switch (t) {
    case 'tef': return T.tef2023[s] as Row[];
    case 'tef2019': return T.tef2019.all as Row[];
    case 'tefOld': return T.tefOld[s] as Row[];
    case 'tcf': return T.tcf[s] as Row[];
    case 'ielts': return T.ielts[s] as Row[];
    case 'pte': return T.pte[s] as Row[];
    default: return [];
  }
};

/** Highest score a test report can show, per skill (used to refuse impossible entries). */
export function maxScore(t: TestId, s: Skill): number {
  switch (t) {
    case 'tef': case 'tef2019': return 699;
    case 'tefOld': return T.tefOld.max[s];
    case 'tcf': return T.tcf.max[s];
    case 'celpip': return 12;
    case 'ielts': return 9;
    case 'pte': return 90;
  }
}
/** Step of the scale: IELTS bands go by halves, the others by whole points. */
export const stepOf = (t: TestId) => (t === 'ielts' ? 0.5 : 1);
export function isValidScore(t: TestId, s: Skill, x: number): boolean {
  if (!Number.isFinite(x) || x < 0 || x > maxScore(t, s)) return false;
  const st = stepOf(t);
  return Math.abs(x / st - Math.round(x / st)) < 1e-9;
}

/**
 * Level reached on one skill. TEF Canada from 11 December 2023 goes up to NCLC 12 (CCI table);
 * every other chart stops at "10 and above". `cap10` folds 11 and 12 into 10, as IRCC does.
 */
export function levelOf(t: TestId, s: Skill, x: number, cap10 = true): number {
  if (!Number.isFinite(x)) return 0;
  let lv = 0;
  if (t === 'celpip') lv = x >= P.tests.celpip.min ? Math.floor(x) : 0;
  else for (const [level, min] of rows(t, s)) if (x >= min) { lv = level; break; }
  return cap10 ? Math.min(lv, 10) : lv;
}
export function levelsOf(t: TestId, x: Scores, cap10 = true): Levels {
  return { R: levelOf(t, 'R', x.R, cap10), W: levelOf(t, 'W', x.W, cap10), L: levelOf(t, 'L', x.L, cap10), S: levelOf(t, 'S', x.S, cap10) };
}
export const minLevel = (l: Levels) => Math.min(l.R, l.W, l.L, l.S);

/** Lowest score that gives `level` on a skill (null when the chart has no such level). */
export function minScoreFor(t: TestId, s: Skill, level: number): number | null {
  if (t === 'celpip') return level >= 4 && level <= 12 ? level : null;
  const r = rows(t, s).find(([lv]) => lv === level);
  return r ? r[1] : null;
}
/** Score range of a level on a skill: [min, max] inclusive (max = next level's min − one step). */
export function rangeFor(t: TestId, s: Skill, level: number): [number, number] | null {
  const lo = minScoreFor(t, s, level);
  if (lo == null) return null;
  if (t === 'celpip') return [level, level];
  const r = rows(t, s);
  const higher = r.filter(([lv]) => lv > level).map(([, m]) => m);
  const hi = higher.length ? Math.min(...higher) - stepOf(t) : maxScore(t, s);
  return [lo, hi];
}

/** CEFR level of a TEF or TCF score (100–699 scale; TCF writing and speaking marked out of 20). */
export function cefrOf(test: 'tef' | 'tcf', x: number, outOf20 = false): string {
  const scale = (test === 'tcf' && outOf20 ? P.tcf.cecr20 : test === 'tcf' ? P.tcf.cecr : P.tef.cecr) as Array<[string, number]>;
  for (const [lv, min] of scale) if (x >= min) return lv;
  return '<A1';
}

/** TEF IRN overall level: three tests at the threshold and the weakest at the lower threshold (CCI rule). */
export function tefIrnLevel(x: Scores): string {
  const v = [x.R, x.W, x.L, x.S].sort((a, b) => b - a);
  for (const [lv, three, weakest] of P.tef.irn.levels as Array<[string, number, number]>) {
    if (v[2] >= three && v[3] >= weakest) return lv;
  }
  return v.every((y) => y >= P.tef.irn.a1) ? 'A1' : '<A1';
}
