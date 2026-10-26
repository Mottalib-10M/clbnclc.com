/**
 * Score, progress and error review, read from this browser's local storage only (written by the
 * practice tools of the site). The missed questions can be answered again here; a right answer
 * takes them off the list. Nothing is sent anywhere; "Clear" erases everything.
 */
import { useEffect, useState } from 'react';
import { readProgress, record, clearProgress, THEME_LABEL, type Progress } from '../../lib/progress';
import { loadBank } from '../../lib/banks';
import SelectField from '../ui/SelectField';
import type { BankKey, Question } from '../../lib/engine/quiz';

type Lang = 'en' | 'fr';
const BANKS: BankKey[] = ['fr-reading', 'fr-listening', 'en-reading', 'en-listening'];
const T = {
  en: {
    head: 'Questions answered in this browser', right: 'right on the last try', empty: 'No answers saved yet in this browser. Practise on the reading or listening pages: your results appear here.',
    banks: { 'fr-reading': 'French reading', 'fr-listening': 'French listening', 'en-reading': 'English reading', 'en-listening': 'English listening' } as Record<BankKey, string>,
    review: 'Questions to review', none: 'Nothing to review: every question answered so far was right on the last try.', retry: 'Answer again', ok: 'Right: removed from the list.', ko: 'Still wrong. Right answer:',
    clear: 'Clear my progress', stored: 'Stored only in this browser (local storage). Clearing it, or a private window, starts from zero.', transcript: 'Transcript', show: 'Show', all: 'All four banks',
  },
  fr: {
    head: 'Questions répondues dans ce navigateur', right: 'justes au dernier essai', empty: 'Aucune réponse enregistrée pour l’instant dans ce navigateur. Entraînez-vous sur les pages de compréhension : vos résultats s’affichent ici.',
    banks: { 'fr-reading': 'Compréhension écrite (français)', 'fr-listening': 'Compréhension orale (français)', 'en-reading': 'Lecture (anglais)', 'en-listening': 'Écoute (anglais)' } as Record<BankKey, string>,
    review: 'Questions à revoir', none: 'Rien à revoir : toutes les questions répondues jusqu’ici étaient justes au dernier essai.', retry: 'Répondre à nouveau', ok: 'Juste : retirée de la liste.', ko: 'Toujours faux. Bonne réponse :',
    clear: 'Effacer ma progression', stored: 'Enregistré uniquement dans ce navigateur (stockage local). L’effacer, ou une fenêtre privée, repart de zéro.', transcript: 'Transcription', show: 'Afficher', all: 'Les quatre banques',
  },
} as const;

export default function ProgressBoard({ lang = 'en' }: { lang?: Lang }) {
  const L = T[lang];
  const [p, setP] = useState<Progress>({ seen: {}, at: {} });
  const [qs, setQs] = useState<Question[]>([]);
  const [tries, setTries] = useState<Record<string, number>>({});
  const [bank, setBank] = useState<BankKey | ''>('');
  useEffect(() => {
    const pr = readProgress(); setP(pr);
    if (Object.keys(pr.seen).length) Promise.all(BANKS.map(loadBank)).then((bs) => setQs(bs.flat()));
  }, []);
  const ids = Object.keys(p.seen);
  const stats = BANKS.map((b) => {
    const pre = b === 'fr-reading' ? 'fce' : b === 'fr-listening' ? 'fco' : b === 'en-reading' ? 'ece' : 'eco';
    const mine = ids.filter((i) => i.startsWith(pre));
    return { b, n: mine.length, r: mine.filter((i) => p.seen[i] === 1).length };
  }).filter((x) => x.n);
  const missed = qs.filter((q) => p.seen[q.id] === 0 && (!bank || (q.lang === 'fr' ? 'fr-' : 'en-') + q.skill === bank));
  const answer = (q: Question, i: number) => {
    setTries((t) => ({ ...t, [q.id]: i }));
    if (i === q.answer) { record(q.id, true, new Date().toISOString().slice(0, 10)); window.setTimeout(() => setP(readProgress()), 1500); }
  };
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-4">
        <div className="max-w-xs"><SelectField id="rv-bank" label={L.show} value={bank} onChange={(v) => setBank(v as BankKey | '')} options={[{ value: '', label: L.all }, ...BANKS.map((b) => ({ value: b, label: L.banks[b] }))]} /></div>
        <p className="text-base font-semibold text-navy-900">{L.review}</p>
        {!ids.length ? <p className="rounded-xl border border-navy-200 bg-white p-4 text-sm text-navy-700">{L.empty}</p>
          : !missed.length && qs.length ? <p className="rounded-xl border border-navy-200 bg-white p-4 text-sm text-navy-700">{L.none}</p>
          : missed.slice(0, 30).map((q) => {
            const t = tries[q.id]; const lg = q.lang;
            return (
              <div key={q.id} className="rounded-xl border border-navy-200 bg-white p-4">
                <p className="text-xs font-medium text-navy-600">{L.banks[(q.lang === 'fr' ? 'fr-' : 'en-') + q.skill as BankKey]} · {q.level.replace('CLB', 'CLB ')} · {THEME_LABEL[lang][q.theme]}</p>
                <details className="mt-2 text-sm text-navy-800"><summary className="cursor-pointer font-medium">{q.skill === 'listening' ? L.transcript : 'Document'}</summary><p className="mt-1 whitespace-pre-line" lang={lg}>{q.doc}</p></details>
                <p className="mt-2 font-semibold text-navy-900" lang={lg}>{q.q}</p>
                <div className="mt-2 grid gap-2" lang={lg}>{q.options.map((o, i) => (
                  <button key={i} type="button" onClick={() => answer(q, i)} aria-pressed={t === i} className={`min-h-11 rounded-lg border px-3 py-2 text-left text-sm ${t === undefined ? 'border-navy-300 hover:bg-accent-50' : i === q.answer && t === i ? 'border-green-700 bg-green-50' : t === i ? 'border-red-700 bg-red-50' : 'border-navy-200'}`}>{o}</button>
                ))}</div>
                {t !== undefined && <p className="mt-2 text-sm text-navy-800" aria-live="polite">{t === q.answer ? L.ok : <>{L.ko} <span lang={lg}>{q.options[q.answer]}</span>.</>} {q.explain[lang]}</p>}
              </div>
            );
          })}
      </div>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{ids.length}</p>
        <ul className="mt-3 space-y-1 text-sm">{stats.map((s) => <li key={s.b} className="flex justify-between gap-2"><span className="text-navy-700">{L.banks[s.b]}</span><span className="tabular-nums text-navy-900">{s.r}/{s.n} {L.right}</span></li>)}</ul>
        <button type="button" onClick={() => { clearProgress(); setP({ seen: {}, at: {} }); setQs([]); }} className="mt-3 h-10 rounded-lg border border-navy-300 bg-white px-4 text-sm font-medium text-navy-800 hover:bg-navy-50">{L.clear}</button>
        <p className="mt-2 text-xs text-navy-700">{L.stored}</p>
      </div>
    </div>
  );
}
