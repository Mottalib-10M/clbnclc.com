/**
 * Express Entry points that depend on language, from the IRCC CRS criteria (params-2026.json, `crs`):
 * first official language, second official language, spouse's language, French-language bonus and
 * the two skill-transferability factors that combine language with education or foreign work.
 * Every other CRS factor (age, education alone, Canadian work, job offer, nomination) is outside
 * the scope of this site and never estimated here.
 */
import P from '../../data/params-2026.json';
import { type Levels, SKILLS, minLevel } from './clb';

const C = P.crs;
const at = (arr: number[], lv: number) => arr[Math.max(0, Math.min(10, Math.floor(lv)))];

export function firstLanguagePoints(l: Levels, withSpouse: boolean): number {
  const t = withSpouse ? C.first.withSpouse : C.first.single;
  return SKILLS.reduce((s, k) => s + at(t, l[k]), 0);
}
export function secondLanguagePoints(l: Levels | null, withSpouse: boolean): number {
  if (!l) return 0;
  const raw = SKILLS.reduce((s, k) => s + at(C.second.perAbility, l[k]), 0);
  return Math.min(raw, withSpouse ? C.second.max.withSpouse : C.second.max.single);
}
export function spouseLanguagePoints(l: Levels | null): number {
  if (!l) return 0;
  return Math.min(SKILLS.reduce((s, k) => s + at(C.spouse.perAbility, l[k]), 0), C.spouse.max);
}
/**
 * French bonus (additional points): NCLC 7 or more on all four French skills gives 25 points, or 50
 * when the English test also shows CLB 5 or more on all four skills.
 */
export function frenchBonus(fr: Levels | null, en: Levels | null): number {
  if (!fr || minLevel(fr) < C.frenchBonus.nclc) return 0;
  return en && minLevel(en) >= 5 ? C.frenchBonus.englishClb5 : C.frenchBonus.englishLow;
}

export type Education = keyof typeof C.transfer.education;
export type ForeignWork = keyof typeof C.transfer.foreignWork;
/** 0 = below the transferability floor, 1 = CLB 7+ on all four (one or more under 9), 2 = CLB 9+ on all four. */
export function languageBand(first: Levels): 0 | 1 | 2 {
  const m = minLevel(first);
  return m >= 9 ? 2 : m >= 7 ? 1 : 0;
}
export function transferPoints(first: Levels, edu: Education, work: ForeignWork) {
  const b = languageBand(first);
  const pick = (pair: number[]) => (b === 0 ? 0 : pair[b - 1]);
  const education = Math.min(pick(C.transfer.education[edu]), C.transfer.maxEach);
  const foreign = Math.min(pick(C.transfer.foreignWork[work]), C.transfer.maxEach);
  return { education, foreign, total: Math.min(education + foreign, C.transfer.max) };
}

export interface LanguageCrs { first: number; second: number; spouse: number; bonus: number; transfer: number; total: number; firstIs: 'en' | 'fr' }
/**
 * All language-driven points for a candidate with an English result, a French result or both.
 * The candidate chooses the first official language in the profile: both choices are computed and
 * the better one is returned, with `firstIs` telling which one it is.
 */
export function languageCrs(en: Levels | null, fr: Levels | null, opts: { withSpouse: boolean; spouse?: Levels | null; edu?: Education; work?: ForeignWork; firstIs?: 'en' | 'fr' }): LanguageCrs {
  const run = (firstIs: 'en' | 'fr'): LanguageCrs | null => {
    const first = firstIs === 'en' ? en : fr, second = firstIs === 'en' ? fr : en;
    if (!first) return null;
    const a = firstLanguagePoints(first, opts.withSpouse);
    const b = secondLanguagePoints(second, opts.withSpouse);
    const s = opts.withSpouse ? spouseLanguagePoints(opts.spouse ?? null) : 0;
    const bonus = frenchBonus(fr, en);
    const tr = transferPoints(first, opts.edu ?? 'none', opts.work ?? 'none').total;
    return { first: a, second: b, spouse: s, bonus, transfer: tr, total: a + b + s + bonus + tr, firstIs };
  };
  const options = (opts.firstIs ? [run(opts.firstIs)] : [run('en'), run('fr')]).filter((x): x is LanguageCrs => !!x);
  if (!options.length) return { first: 0, second: 0, spouse: 0, bonus: 0, transfer: 0, total: 0, firstIs: 'en' };
  return options.sort((x, y) => y.total - x.total)[0];
}

/** Programme thresholds (Express Entry language page, category-based selection, citizenship). */
export interface ProgramCheck { id: string; need: Partial<Levels>; ok: boolean }
export function programChecks(first: Levels | null, french: Levels | null): ProgramCheck[] {
  const E = P.ee;
  const all = (n: number): Partial<Levels> => ({ R: n, W: n, L: n, S: n });
  const meets = (l: Levels | null, need: Partial<Levels>) => !!l && SKILLS.every((k) => need[k] == null || l[k] >= need[k]!);
  const list: Array<{ id: string; need: Partial<Levels>; on: Levels | null }> = [
    { id: 'fsw', need: all(E.fsw), on: first },
    { id: 'cec01', need: all(E.cecTeer01), on: first },
    { id: 'cec23', need: all(E.cecTeer23), on: first },
    { id: 'fst', need: E.fst as Partial<Levels>, on: first },
    { id: 'french', need: all(E.frenchCategory), on: french },
    { id: 'citizenship', need: { L: P.citizenship.clb, S: P.citizenship.clb }, on: first },
  ];
  return list.map((x) => ({ id: x.id, need: x.need, ok: meets(x.on, x.need) }));
}
