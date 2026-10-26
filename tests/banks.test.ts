import { describe, expect, it } from 'vitest';
import { BANKS } from '../src/lib/banks-build';
import { lintBank } from '../src/lib/engine/quiz';

describe('question banks written by Radif Partners', () => {
  for (const [k, bank] of Object.entries(BANKS)) {
    it(`${k}: lint`, () => { expect(lintBank(bank)).toEqual([]); });
    it(`${k}: language and skill match the file`, () => {
      const [lang, skill] = k.split('-');
      expect(bank.every((q) => q.lang === lang && q.skill === skill)).toBe(true);
    });
    it(`${k}: right answers spread over the four positions`, () => {
      const c = [0, 1, 2, 3].map((i) => bank.filter((q) => q.answer === i).length);
      expect(Math.min(...c) / bank.length).toBeGreaterThan(0.15);
    });
  }
  it('ids are unique across banks', () => {
    const ids = Object.values(BANKS).flat().map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
