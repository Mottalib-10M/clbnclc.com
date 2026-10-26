import { describe, expect, it } from 'vitest';
import { levelOf, levelsOf, rangeFor, minScoreFor, isValidScore, cefrOf, tefIrnLevel } from '../src/lib/engine/clb';
import { firstLanguagePoints, secondLanguagePoints, spouseLanguagePoints, frenchBonus, transferPoints, languageCrs } from '../src/lib/engine/crs';
import { addWorkingDays, resultsBy, earliestRetake, validUntil, latestTestFor } from '../src/lib/engine/calendar';
import { buildMock, buildPractice, byLevel, indicativeLevel } from '../src/lib/engine/quiz';
import { BANKS } from '../src/lib/banks-build';
import P from '../src/data/params-2026.json';

const all = (n: number) => ({ R: n, W: n, L: n, S: n });
describe('score → CLB/NCLC (IRCC and CCI charts)', () => {
  it('TEF Canada from 11 December 2023, band edges', () => {
    expect(levelOf('tef', 'R', 433)).toBe(6);
    expect(levelOf('tef', 'R', 434)).toBe(7);
    expect(levelOf('tef', 'W', 428)).toBe(7);
    expect(levelOf('tef', 'S', 455)).toBe(6);
    expect(levelOf('tef', 'S', 456)).toBe(7);
    expect(levelOf('tef', 'L', 305)).toBe(0);
    expect(levelOf('tef', 'S', 650, false)).toBe(12);
    expect(levelOf('tef', 'S', 650)).toBe(10);
  });
  it('TEF Canada 2019–2023 and old scores', () => {
    expect(levelOf('tef2019', 'W', 499)).toBe(6 + 1);
    expect(levelOf('tef2019', 'W', 449)).toBe(6);
    expect(levelOf('tefOld', 'R', 207)).toBe(7);
    expect(levelOf('tefOld', 'L', 248)).toBe(6);
    expect(isValidScore('tefOld', 'R', 301)).toBe(false);
  });
  it('TCF Canada, comprehension out of 699 and expression out of 20', () => {
    expect(levelOf('tcf', 'R', 453)).toBe(7);
    expect(levelOf('tcf', 'L', 457)).toBe(6);
    expect(levelOf('tcf', 'W', 10)).toBe(7);
    expect(levelOf('tcf', 'S', 6)).toBe(5);
    expect(levelOf('tcf', 'S', 3)).toBe(0);
  });
  it('CELPIP, IELTS, PTE Core', () => {
    expect(levelOf('celpip', 'R', 9)).toBe(9);
    expect(levelOf('celpip', 'R', 3)).toBe(0);
    expect(levelOf('celpip', 'R', 12)).toBe(10);
    expect(levelOf('ielts', 'L', 7.5)).toBe(8);
    expect(levelOf('ielts', 'L', 7.0)).toBe(7);
    expect(isValidScore('ielts', 'L', 7.25)).toBe(false);
    expect(levelOf('pte', 'S', 68)).toBe(7);
    expect(levelOf('pte', 'L', 28)).toBe(4);
  });
  it('ranges are contiguous and match the charts', () => {
    expect(rangeFor('tef', 'R', 7)).toEqual([434, 461]);
    expect(rangeFor('tef', 'W', 12)).toEqual([619, 699]);
    expect(rangeFor('tcf', 'W', 6)).toEqual([7, 9]);
    expect(rangeFor('ielts', 'R', 9)).toEqual([7.0, 7.5]);
    expect(minScoreFor('pte', 'R', 10)).toBe(88);
    for (const t of ['tef', 'tef2019', 'tefOld', 'tcf', 'ielts', 'pte'] as const) for (const s of ['R', 'W', 'L', 'S'] as const) for (let lv = 4; lv < 10; lv++) {
      const a = rangeFor(t, s, lv)!, b = rangeFor(t, s, lv + 1)!;
      expect(a[1] < b[0], `${t} ${s} ${lv}`).toBe(true);
      expect(levelOf(t, s, a[0])).toBe(lv);
      expect(levelOf(t, s, a[1])).toBe(lv);
    }
  });
  it('CEFR bands and TEF IRN overall level', () => {
    expect(cefrOf('tef', 399)).toBe('B1');
    expect(cefrOf('tef', 400)).toBe('B2');
    expect(cefrOf('tcf', 10, true)).toBe('B2');
    expect(cefrOf('tcf', 99)).toBe('<A1');
    expect(tefIrnLevel({ R: 400, W: 400, L: 400, S: 367 })).toBe('B2');
    expect(tefIrnLevel({ R: 400, W: 400, L: 400, S: 366 })).toBe('B1');
    expect(tefIrnLevel({ R: 210, W: 200, L: 205, S: 167 })).toBe('A2');
  });
});
describe('CRS language points (IRCC criteria)', () => {
  it('first language', () => {
    expect(firstLanguagePoints(all(10), false)).toBe(P.crs.first.max.single);
    expect(firstLanguagePoints(all(10), true)).toBe(P.crs.first.max.withSpouse);
    expect(firstLanguagePoints(all(7), false)).toBe(68);
    expect(firstLanguagePoints(all(3), false)).toBe(0);
  });
  it('second language and spouse are capped', () => {
    expect(secondLanguagePoints(all(10), false)).toBe(24);
    expect(secondLanguagePoints(all(10), true)).toBe(22);
    expect(secondLanguagePoints(all(5), false)).toBe(4);
    expect(spouseLanguagePoints(all(9))).toBe(20);
  });
  it('French bonus', () => {
    expect(frenchBonus(all(7), null)).toBe(25);
    expect(frenchBonus(all(7), all(4))).toBe(25);
    expect(frenchBonus(all(7), all(5))).toBe(50);
    expect(frenchBonus({ R: 7, W: 6, L: 7, S: 7 }, all(9))).toBe(0);
  });
  it('transferability needs CLB 7 on all four', () => {
    expect(transferPoints(all(6), 'masters', 'threePlus').total).toBe(0);
    expect(transferPoints({ R: 7, W: 8, L: 9, S: 7 }, 'oneYear', 'oneTwo')).toEqual({ education: 13, foreign: 13, total: 26 });
    expect(transferPoints(all(9), 'phd', 'threePlus').total).toBe(100);
  });
  it('picks the better first official language', () => {
    const r = languageCrs(all(5), all(9), { withSpouse: false });
    expect(r.firstIs).toBe('fr');
    expect(r.first).toBe(124);
    expect(r.second).toBe(4);
    expect(r.bonus).toBe(50);
  });
});
describe('calendar', () => {
  it('working days skip weekends', () => {
    expect(addWorkingDays('2026-10-23', 1)).toBe('2026-10-26');
    expect(resultsBy('tef', '2026-10-26')).toBe('2026-11-09');
  });
  it('retake and validity', () => {
    expect(earliestRetake('tef', '2026-10-01')).toBe('2026-10-22');
    expect(earliestRetake('tcf', '2026-10-01')).toBe('2026-10-31');
    expect(validUntil('2026-10-26')).toBe('2028-10-25');
    expect(validUntil('2024-02-29')).toBe('2026-02-27');
    const d = latestTestFor('tef', '2026-12-31');
    expect(resultsBy('tef', d) <= '2026-12-31').toBe(true);
  });
});
describe('quiz draws', () => {
  it('mock sections follow the official counts', () => {
    expect(buildMock(BANKS['fr-reading'], P.tef.canada.ce.q, 1)).toHaveLength(P.tef.canada.ce.q);
    expect(buildMock(BANKS['fr-listening'], P.tef.canada.co.q, 2)).toHaveLength(P.tef.canada.co.q);
    expect(buildMock(BANKS['fr-reading'], P.tcf.canada.ce.q, 3)).toHaveLength(P.tcf.canada.ce.q);
    const m = buildMock(BANKS['fr-reading'], 40, 7);
    expect(new Set(m.map((q) => q.id)).size).toBe(40);
    expect(m[0].level <= m[39].level).toBe(true);
    expect(buildMock(BANKS['fr-reading'], 40, 7).map((q) => q.id)).toEqual(m.map((q) => q.id));
  });
  it('practice filters and indicative level', () => {
    const p = buildPractice(BANKS['fr-reading'], { level: 'B2' }, 5, 10);
    expect(p.every((q) => q.level === 'B2')).toBe(true);
    const r = byLevel(p, p.map((q) => q.answer));
    expect(indicativeLevel(r)).toBe('B2');
    expect(indicativeLevel([{ level: 'A1', right: 1, total: 3 }])).toBe(null);
  });
});
