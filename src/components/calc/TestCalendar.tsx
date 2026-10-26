/**
 * Test calendar from one date: results deadline, earliest new sitting, last day the report counts
 * for IRCC (two years), and, with a deadline, the last test date whose results arrive in time.
 * First render = build day (RECETTE §17.5); today's date is read after mount.
 */
import { useEffect, useState } from 'react';
import Toggle from '../ui/Toggle';
import { type CalTest, resultsBy, earliestRetake, validUntil, latestTestFor, daysBetween } from '../../lib/engine/calendar';
import { addDays } from '../../lib/engine/dates';
import { dateL, formatNumberL } from '../../lib/format-l';
import P from '../../data/params-2026.json';

type Lang = 'en' | 'fr';
const T = {
  en: {
    test: 'Test', date: 'Date of the test', issue: 'Date printed on the report (TEF: issue date)', deadline: 'Your own deadline (optional): profile or application date',
    head: 'Your report counts for IRCC until', results: (t: CalTest) => (t === 'tef' ? `Results sent at the latest (${P.tef.resultsDays[0]} to ${P.tef.resultsDays[1]} working days)` : `Results at the centre at the latest (${P.tcf.resultsDaysComputer} working days, computer session)`),
    retake: (t: CalTest) => (t === 'tef' ? `Earliest new sitting (more than ${P.tef.retakeDays} days later)` : `Earliest new sitting (${P.tcf.retakeDays} days between sittings)`),
    left: 'Days of validity left today', expired: 'expired', latest: 'Last test date for results before your deadline', none: '–',
    note: 'Working days skip weekends only, not public holidays. IRCC asks for results less than two years old both when you create the Express Entry profile and when you apply for permanent residence.',
  },
  fr: {
    test: 'Test', date: 'Date du test', issue: 'Date inscrite sur l’attestation (TEF : date d’émission)', deadline: 'Votre échéance (facultatif) : date du profil ou de la demande',
    head: 'Votre attestation compte pour IRCC jusqu’au', results: (t: CalTest) => (t === 'tef' ? `Résultats transmis au plus tard (${P.tef.resultsDays[0]} à ${P.tef.resultsDays[1]} jours ouvrés)` : `Résultats au centre au plus tard (${P.tcf.resultsDaysComputer} jours ouvrés, session sur ordinateur)`),
    retake: (t: CalTest) => (t === 'tef' ? `Nouvelle passation au plus tôt (plus de ${P.tef.retakeDays} jours après)` : `Nouvelle passation au plus tôt (${P.tcf.retakeDays} jours entre deux passations)`),
    left: 'Jours de validité restants aujourd’hui', expired: 'expirée', latest: 'Dernière date de test pour des résultats avant l’échéance', none: '–',
    note: 'Les jours ouvrés n’excluent que les fins de semaine, pas les jours fériés. IRCC demande des résultats de moins de deux ans à la création du profil Entrée express et au dépôt de la demande de résidence permanente.',
  },
} as const;

interface Props { lang?: Lang; test?: CalTest; idPrefix?: string }
export default function TestCalendar({ lang = 'en', test: t0 = 'tef', idPrefix = 'cal' }: Props) {
  const L = T[lang];
  const [today, setToday] = useState(__BUILD_DAY__);
  const [test, setTest] = useState<CalTest>(t0);
  const [date, setDate] = useState(addDays(__BUILD_DAY__, -30));
  const [issue, setIssue] = useState('');
  const [deadline, setDeadline] = useState('');
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); }, []);
  const ok = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
  const report = ok(issue) ? issue : date;
  const until = ok(report) ? validUntil(report) : null;
  const left = until ? daysBetween(today, until) : null;
  const D = (s: string | null) => (s ? dateL(s, lang) : L.none);
  const inputCls = 'h-12 w-full min-w-0 rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const field = (id: string, label: string, val: string, set: (v: string) => void) => (
    <div className="grid min-w-0 content-start"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={val} onChange={(e) => set(e.target.value)} className={inputCls} /></div>
  );
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-4" onSubmit={(e) => e.preventDefault()}>
        <Toggle id={`${idPrefix}-t`} label={L.test} value={test} onChange={(v) => setTest(v as CalTest)} options={[{ value: 'tef', label: 'TEF Canada' }, { value: 'tcf', label: 'TCF Canada' }]} />
        <div className="grid gap-4 sm:grid-cols-2">
          {field('d', L.date, date, setDate)}
          {field('i', L.issue, issue, setIssue)}
        </div>
        {field('dl', L.deadline, deadline, setDeadline)}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="mt-1 text-3xl font-bold text-navy-900">{D(until)}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.left}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{left == null ? L.none : left < 0 ? L.expired : formatNumberL(left, lang)}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.results(test)}</td><td className="py-1.5 text-right text-navy-900">{ok(date) ? D(resultsBy(test, date)) : L.none}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.retake(test)}</td><td className="py-1.5 text-right text-navy-900">{ok(date) ? D(earliestRetake(test, date)) : L.none}</td></tr>
          {ok(deadline) && <tr><td className="py-1.5 pr-2 text-navy-700">{L.latest}</td><td className="py-1.5 text-right text-navy-900">{D(latestTestFor(test, deadline))}</td></tr>}
        </tbody></table>
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
