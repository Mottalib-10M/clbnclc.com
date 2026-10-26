/**
 * Target level → lowest score per skill on each accepted test (IRCC charts; TEF Canada from
 * 11 December 2023 per the CCI table). Reads the same tables as the converter, backwards.
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import { type TestId, SKILLS, rangeFor } from '../../lib/engine/clb';
import { SKILL_SHORT, TEST, type Lang } from '../../lib/tool-text';
import { formatNumberL } from '../../lib/format-l';

const T = {
  en: { target: 'Level you need on every skill', head: (n: number) => `Lowest scores for CLB / NCLC ${n}`, test: 'Test', note: 'Ranges from the IRCC equivalency charts. A score at the bottom of a range is enough: no rounding is applied.', above: 'and above' },
  fr: { target: 'Niveau visé à chaque épreuve', head: (n: number) => `Scores minimums pour NCLC / CLB ${n}`, test: 'Test', note: 'Fourchettes des grilles d’équivalence d’IRCC. Le bas de la fourchette suffit : aucun arrondi n’est appliqué.', above: 'et plus' },
} as const;

interface Props { lang?: Lang; level?: number; tests?: TestId[]; idPrefix?: string }
export default function TargetTool({ lang = 'en', level: l0 = 7, tests = ['tef', 'tcf', 'celpip', 'ielts', 'pte'], idPrefix = 'tg' }: Props) {
  const L = T[lang];
  const [level, setLevel] = useState(l0);
  const f = (t: TestId, x: number) => formatNumberL(x, lang, t === 'ielts' ? 1 : 0);
  return (
    <div className="not-prose grid gap-4">
      <form className="max-w-xs" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-lv`} label={L.target} value={String(level)} onChange={(v) => setLevel(Number(v))} options={[4, 5, 6, 7, 8, 9, 10].map((n) => ({ value: String(n), label: `CLB / NCLC ${n}` }))} />
      </form>
      <div data-resultat aria-live="polite" className="overflow-x-auto rounded-xl border border-accent-200 bg-accent-50/60 p-4">
        <p className="text-sm font-semibold text-navy-900">{L.head(level)}</p>
        <table className="mt-2 w-full min-w-[520px] text-sm">
          <thead><tr><th scope="col" className="py-1.5 pr-2 text-left text-navy-700">{L.test}</th>{SKILLS.map((k) => <th key={k} scope="col" className="py-1.5 text-right text-navy-700">{SKILL_SHORT[lang][k]}</th>)}</tr></thead>
          <tbody className="divide-y divide-navy-200">
            {tests.map((t) => (
              <tr key={t}><td className="py-1.5 pr-2 text-navy-800">{TEST[lang][t]}</td>
                {SKILLS.map((k) => { const r = rangeFor(t, k, level); return <td key={k} className="tabular-nums py-1.5 text-right text-navy-900">{r ? (level === 10 && t !== 'tef' ? `${f(t, r[0])} ${L.above}` : r[0] === r[1] ? f(t, r[0]) : `${f(t, r[0])}–${f(t, r[1])}`) : '–'}</td>; })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
