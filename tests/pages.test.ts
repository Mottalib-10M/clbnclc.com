import { describe, expect, it } from 'vitest';
import { PAGES } from '../src/lib/guides';
import { helpers } from '../src/lib/helpers';
import { SPEC_KINDS } from '../src/lib/mini-specs';
import P from '../src/data/params-2026.json';

/** Rules of CONTRIBUTING-PAGES.md, checked on the page files before the build. */
const words = (s: string) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const ids = new Set([...PAGES.map((p) => p.id), 'home', 'method', 'about']);
const PLAN = (process.env.PLAN ?? '').split(',').filter(Boolean);
const seenQ = new Map<string, string>();

describe('pages', () => {
  for (const page of PAGES) {
    for (const lang of ['en', 'fr'] as const) {
      const T = page[lang];
      it(`${page.id} (${lang})`, () => {
        const h = helpers(lang, false);
        expect(T.title.length, `title ${T.title.length}: ${T.title}`).toBeGreaterThanOrEqual(50);
        expect(T.title.length, `title ${T.title.length}: ${T.title}`).toBeLessThanOrEqual(60);
        expect(T.description.length, `description ${T.description.length}`).toBeGreaterThanOrEqual(150);
        expect(T.description.length, `description ${T.description.length}`).toBeLessThanOrEqual(160);
        const resume = T.resume(h);
        expect(words(resume), 'resume words').toBeGreaterThanOrEqual(130);
        const faqs = T.faqs(h);
        expect(faqs.length).toBeGreaterThanOrEqual(3);
        expect(faqs.length).toBeLessThanOrEqual(5);
        for (const f of faqs) {
          const w = words(f.a);
          expect(w, `faq answer words (${w}): ${f.q}`).toBeGreaterThanOrEqual(40);
          expect(w, `faq answer words (${w}): ${f.q}`).toBeLessThanOrEqual(90);
          const k = f.q.toLowerCase();
          expect(seenQ.get(k), `duplicate FAQ question: ${f.q}`).toBeUndefined();
          seenQ.set(k, page.id);
        }
        const body = T.body(h);
        expect(words(body), 'body words').toBeGreaterThanOrEqual(450);
        expect(body).toMatch(/<h2>/);
        expect(body).not.toMatch(/<h1/);
        const all = [T.title, T.description, T.h1, T.intro, T.card, T.nav, resume, body, ...faqs.flatMap((f) => [f.q, f.a])].join(' ');
        expect(all.includes('—'), 'em dash').toBe(false);
        expect(all.includes('undefined') || all.includes('NaN'), 'undefined/NaN in text').toBe(false);
        for (const m of body.matchAll(/<!--tool:mini:([a-z0-9]+)/g)) expect(SPEC_KINDS).toContain(m[1]);
        if (page.tool?.kind.startsWith('mini:')) expect(SPEC_KINDS).toContain(page.tool.kind.slice(5));
        if (page.mini?.kind.startsWith('mini:')) expect(SPEC_KINDS).toContain(page.mini.kind.slice(5));
        for (const r of page.related) expect(ids.has(r) || PLAN.includes(r), `related ${r}`).toBe(true);
        for (const s of page.sources) expect(Object.keys(P.sources)).toContain(s);
      });
    }
  }
  it('every internal link points to an existing page (strict, run once all pages exist)', () => {
    for (const page of PAGES) for (const lang of ['en', 'fr'] as const) {
      const h = helpers(lang, true);
      expect(() => page[lang].body(h), `${page.id} ${lang}`).not.toThrow();
    }
  });
  it('slugs are unique in each language', () => {
    for (const lang of ['en', 'fr'] as const) {
      const s = PAGES.map((p) => p[lang].slug);
      expect(new Set(s).size).toBe(s.length);
    }
  });
});
