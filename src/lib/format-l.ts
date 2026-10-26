/** Formatting by page language (RECETTE §4: one locale per language). English pages: en-CA; French pages: fr-CA. */
export type L = 'en' | 'fr';
export type Cur = 'CAD';
const TAG: Record<L, string> = { en: 'en-CA', fr: 'fr-CA' };
export const langTag = (lang: L) => TAG[lang];
const cache = new Map<string, Intl.NumberFormat>();
function nf(lang: L, o: Intl.NumberFormatOptions) {
  const k = lang + JSON.stringify(o);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(TAG[lang], o));
  return cache.get(k)!;
}
export const formatNumberL = (v: number, lang: L, d = 0) => nf(lang, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
/** $653 in Canadian English, 653 $ in Canadian French (cents only when the official amount has them). */
export const money = (v: number, _cur: Cur, lang: L) => {
  const cents = Math.round(v * 100) % 100 !== 0;
  const n = formatNumberL(v, lang, cents ? 2 : 0);
  return lang === 'fr' ? `${n} $` : `$${n}`;
};
// « 75% » en anglais, « 75 % » en français canadien.
export const pct = (v: number, lang: L, d = 0) => `${formatNumberL(v * 100, lang, d)}${lang === 'fr' ? ' ' : ''}%`;
/** "2026-10-24" → "October 24, 2026" / "24 octobre 2026" (UTC, never shifts a day). */
export const dateL = (iso: string, lang: L) => {
  const s = new Date(`${iso}T00:00:00Z`).toLocaleDateString(TAG[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  return lang === 'fr' ? s.replace(/^1 /, '1er ') : s;
};
