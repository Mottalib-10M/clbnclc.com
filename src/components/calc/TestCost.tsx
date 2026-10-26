/**
 * Budget of the language tests: fee of your centre (each centre sets its own; the default is the
 * fee read on one centre's page, named and dated), number of sittings, a second test and your
 * travel. No fee is invented: every amount can be replaced by the one of your centre.
 */
import { useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { money, dateL } from '../../lib/format-l';
import P from '../../data/params-2026.json';

type Lang = 'en' | 'fr';
const F = P.fees;
const PRESET: Record<string, { fee: number; read: string; centre: { en: string; fr: string } }> = {
  tef: { fee: F.afEdmonton.full, read: F.afEdmonton.read, centre: { en: 'Alliance française d’Edmonton, TEF Canada, four tests', fr: 'Alliance française d’Edmonton, TEF Canada, quatre épreuves' } },
  tefLS: { fee: F.afEdmonton.ls, read: F.afEdmonton.read, centre: { en: 'Alliance française d’Edmonton, TEF Canada listening and speaking only', fr: 'Alliance française d’Edmonton, TEF Canada compréhension et expression orales' } },
  tcf: { fee: F.usherbrooke.tcfCanada, read: F.usherbrooke.read, centre: { en: 'Université de Sherbrooke, TCF Canada, four tests', fr: 'Université de Sherbrooke, TCF Canada, quatre épreuves' } },
};
const T = {
  en: { test: 'Test and example centre', fee: 'Fee at your centre', sittings: 'Sittings you budget for', other: 'Second test (e.g. English) if any', travel: 'Travel and other costs', head: 'Total budget', per: 'Per sitting', tests: 'Test fees', note: (c: string, d: string) => `Default fee read on the page of ${c} on ${d}. Each centre sets its own fee: type yours. Taxes may apply depending on the centre.`, labels: { tef: 'TEF Canada (four tests)', tefLS: 'TEF Canada (listening + speaking, citizenship)', tcf: 'TCF Canada (four tests)' } as Record<string, string> },
  fr: { test: 'Test et centre d’exemple', fee: 'Tarif de votre centre', sittings: 'Passations prévues au budget', other: 'Deuxième test (anglais par exemple), s’il y a lieu', travel: 'Déplacement et autres frais', head: 'Budget total', per: 'Par passation', tests: 'Frais de test', note: (c: string, d: string) => `Tarif par défaut relevé sur la page de ${c} le ${d}. Chaque centre fixe son tarif : saisissez le vôtre. Des taxes peuvent s’ajouter selon le centre.`, labels: { tef: 'TEF Canada (quatre épreuves)', tefLS: 'TEF Canada (compréhension + expression orales, citoyenneté)', tcf: 'TCF Canada (quatre épreuves)' } as Record<string, string> },
} as const;

interface Props { lang?: Lang; test?: 'tef' | 'tefLS' | 'tcf'; idPrefix?: string }
export default function TestCost({ lang = 'en', test: t0 = 'tef', idPrefix = 'co' }: Props) {
  const L = T[lang];
  const tag = lang === 'fr' ? 'fr-CA' : 'en-CA';
  const [test, setTest] = useState<string>(t0);
  const [fee, setFee] = useState(PRESET[t0].fee);
  const [n, setN] = useState(1);
  const [other, setOther] = useState(0);
  const [travel, setTravel] = useState(0);
  const sittings = Math.max(1, Math.min(5, Math.round(n)));
  const testFees = fee * sittings;
  const total = testFees + other + travel;
  const pre = PRESET[test];
  const $ = (x: number) => money(x, 'CAD', lang);
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField className="sm:col-span-2" id={`${idPrefix}-t`} label={L.test} value={test} onChange={(v) => { setTest(v); setFee(PRESET[v].fee); }} options={Object.keys(PRESET).map((k) => ({ value: k, label: L.labels[k] }))} />
        <NumberField id={`${idPrefix}-fee`} label={L.fee} value={fee} onChange={setFee} max={5000} unit="$" tag={tag} />
        <NumberField id={`${idPrefix}-n`} label={L.sittings} value={n} onChange={setN} max={5} tag={tag} />
        <NumberField id={`${idPrefix}-o`} label={L.other} value={other} onChange={setOther} max={5000} unit="$" tag={tag} />
        <NumberField id={`${idPrefix}-tr`} label={L.travel} value={travel} onChange={setTravel} max={20000} unit="$" tag={tag} />
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{$(total)}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.tests}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{$(testFees)}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.per}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{$(total / sittings)}</td></tr>
        </tbody></table>
        <p className="mt-2 text-xs text-navy-700">{L.note(pre.centre[lang], dateL(pre.read, lang))}</p>
      </div>
    </div>
  );
}
