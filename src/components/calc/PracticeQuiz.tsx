/**
 * Reading and listening practice (immediate correction, filter by level and theme) and timed mock
 * sections in the official format (count and duration from params-2026.json). Listening items are
 * read aloud by the browser's own speech synthesis: no audio file, no server. First render = the
 * questions drawn at build time for this page (RECETTE §17.5). Progress is kept in this browser only.
 */
import { useEffect, useRef, useState } from 'react';
import SelectField from '../ui/SelectField';
import { buildPractice, buildMock, byLevel, indicativeLevel, LEVELS_FR, LEVELS_EN, THEMES, type BankKey, type Question, type Level, type Theme } from '../../lib/engine/quiz';
import { loadBank } from '../../lib/banks';
import { record, THEME_LABEL } from '../../lib/progress';
import { readParams, updateURL } from '../../lib/url-state';

type Lang = 'en' | 'fr';
const T = {
  en: {
    level: 'Level', theme: 'Theme', any: 'All', q: (i: number, n: number) => `Question ${i} of ${n}`, next: 'Next', prev: 'Previous', goto: 'Go to question', finish: 'See my result',
    again: 'New set of questions', loading: 'Loading the questions…', right: 'Correct.', wrong: 'Not quite.', answer: 'Right answer:',
    play: 'Play the recording', playing: 'Playing…', played: 'Played once (as in the test)', replay: 'Play again', noVoice: 'Your browser has no speech synthesis: the transcript is shown instead.',
    transcript: 'Transcript', doc: 'Document', start: 'Start the timer', left: 'Time left', timeUp: 'Time is up: the section is marked as it stands.',
    score: 'Your result', answered: 'answered', byLevel: 'Result by level', indicative: 'Our rough indication', noLevel: 'below the easiest level of the set',
    indicNote: 'Our own reading of this practice set (two thirds right, level after level). It is not a TEF or TCF score: official scores are calibrated by the test bodies.',
    review: 'Questions you missed', none: 'No mistakes.', hidden: 'Answer recorded. The correction comes at the end, as in the test.',
    stored: 'Your answers stay in this browser (local storage, for the review page). Nothing is sent.', ref: 'Reference',
    practice: (n: number) => `Practice set of ${n} questions`, mock: (n: number, m: number) => `Mock section: ${n} questions, ${m} minutes`,
  },
  fr: {
    level: 'Niveau', theme: 'Thème', any: 'Tous', q: (i: number, n: number) => `Question ${i} sur ${n}`, next: 'Suivante', prev: 'Précédente', goto: 'Aller à la question', finish: 'Voir mon résultat',
    again: 'Nouvelle série de questions', loading: 'Chargement des questions…', right: 'Bonne réponse.', wrong: 'Pas tout à fait.', answer: 'Bonne réponse :',
    play: 'Écouter l’enregistrement', playing: 'Lecture…', played: 'Écouté une fois (comme à l’examen)', replay: 'Réécouter', noVoice: 'Votre navigateur n’a pas de synthèse vocale : la transcription s’affiche à la place.',
    transcript: 'Transcription', doc: 'Document', start: 'Lancer le chrono', left: 'Temps restant', timeUp: 'Temps écoulé : la section est notée telle quelle.',
    score: 'Votre résultat', answered: 'répondues', byLevel: 'Résultat par niveau', indicative: 'Notre indication approximative', noLevel: 'sous le niveau le plus facile de la série',
    indicNote: 'Notre propre lecture de cette série (deux tiers de bonnes réponses, niveau après niveau). Ce n’est pas un score TEF ou TCF : les scores officiels sont étalonnés par les organismes.',
    review: 'Questions manquées', none: 'Aucune erreur.', hidden: 'Réponse enregistrée. La correction vient à la fin, comme à l’examen.',
    stored: 'Vos réponses restent dans ce navigateur (stockage local, pour la page de révision). Rien n’est transmis.', ref: 'Référence',
    practice: (n: number) => `Série d’entraînement de ${n} questions`, mock: (n: number, m: number) => `Section d’examen blanc : ${n} questions, ${m} minutes`,
  },
} as const;

interface Props {
  lang?: Lang; bank: BankKey; mode?: 'practice' | 'mock'; count?: number; minutes?: number;
  level?: Level | ''; theme?: Theme | ''; initial: Question[]; seed: number; idPrefix?: string;
}
export default function PracticeQuiz({ lang = 'en', bank, mode = 'practice', count = 10, minutes = 0, level: lv0 = '', theme: th0 = '', initial, seed: s0, idPrefix = 'pq' }: Props) {
  const L = T[lang];
  const isMock = mode === 'mock';
  const listening = bank.endsWith('listening');
  const itemLang = bank.startsWith('fr') ? 'fr' : 'en';
  const levels = itemLang === 'fr' ? LEVELS_FR : LEVELS_EN;
  const [level, setLevel] = useState<Level | ''>(lv0);
  const [theme, setTheme] = useState<Theme | ''>(th0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [answers, setAnswers] = useState<Array<number | null>>(() => initial.map(() => null));
  const [cur, setCur] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [plays, setPlays] = useState<Record<string, number>>({});
  const [speaking, setSpeaking] = useState(false);
  const [voiceOk, setVoiceOk] = useState(true);
  const started = useRef<number | null>(null);

  const draw = async (lv: Level | '', th: Theme | '', seed: number) => {
    setLoading(true);
    const all = await loadBank(bank);
    const next = isMock ? buildMock(all, count, seed) : buildPractice(all, { level: lv, theme: th }, seed, count);
    setQs(next); setAnswers(next.map(() => null)); setCur(0); setDone(false); setLoading(false); setPlays({}); started.current = null; setLeft(null);
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
  };
  useEffect(() => {
    setVoiceOk(typeof window !== 'undefined' && 'speechSynthesis' in window);
    const s = Number(readParams(window.location.search).get('seed'));
    if (s && s !== s0) draw(lv0, th0, s);
    return () => { if (window.speechSynthesis) window.speechSynthesis.cancel(); };
  }, []);
  useEffect(() => {
    if (!isMock || done || !minutes) return;
    const id = window.setInterval(() => {
      if (started.current == null) return;
      const rem = minutes * 60 - Math.floor((Date.now() - started.current) / 1000);
      setLeft(Math.max(0, rem)); if (rem <= 0) setDone(true);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isMock, done, minutes]);

  const n = qs.length;
  const q = qs[cur];
  const a = answers[cur];
  const showAll = !isMock || done;
  const answeredN = answers.filter((x) => x !== null).length;
  const right = qs.reduce((s, x, i) => s + (answers[i] === x.answer ? 1 : 0), 0);
  const startClock = () => { if (started.current == null) { started.current = Date.now(); setLeft(minutes * 60); } };
  const choose = (i: number) => {
    if (done || (showAll && a !== null)) return;
    startClock();
    setAnswers((o) => o.map((x, j) => (j === cur ? i : x)));
    record(q.id, i === q.answer, new Date().toISOString().slice(0, 10));
  };
  const play = () => {
    if (!q || !window.speechSynthesis) return;
    if (isMock && (plays[q.docId] ?? 0) >= 1) return;
    startClock();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(q.doc.replace(/^— /gm, ''));
    const want = itemLang === 'fr' ? ['fr-CA', 'fr-FR', 'fr'] : ['en-CA', 'en-US', 'en-GB', 'en'];
    const voices = window.speechSynthesis.getVoices();
    const v = want.map((w) => voices.find((x) => x.lang.replace('_', '-').startsWith(w))).find(Boolean);
    if (v) u.voice = v;
    u.lang = v?.lang ?? want[0];
    u.rate = 0.95;
    u.onend = () => setSpeaking(false); u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    setPlays((p) => ({ ...p, [q.docId]: (p[q.docId] ?? 0) + 1 }));
    window.speechSynthesis.speak(u);
  };
  const newSet = () => { const s = Math.floor(Math.random() * 2 ** 31); updateURL({ seed: s }); draw(level, theme, s); };
  const results = byLevel(qs, answers);
  const ind = indicativeLevel(results);
  const mm = left == null ? minutes * 60 : left;
  const clock = `${Math.floor(mm / 60)}:${String(mm % 60).padStart(2, '0')}`;
  const sepc = lang === 'fr' ? ' : ' : ': ';
  const docShown = !listening || showAll && a !== null || !voiceOk;
  const playedOnce = isMock && (plays[q?.docId ?? ''] ?? 0) >= 1;

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {!isMock && (
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectField id={`${idPrefix}-lv`} label={L.level} value={level} onChange={(v) => { setLevel(v as Level | ''); draw(v as Level | '', theme, s0); }} options={[{ value: '', label: L.any }, ...levels.map((x) => ({ value: x, label: x.replace('CLB', 'CLB ') }))]} />
            <SelectField id={`${idPrefix}-th`} label={L.theme} value={theme} onChange={(v) => { setTheme(v as Theme | ''); draw(level, v as Theme | '', s0); }} options={[{ value: '', label: L.any }, ...THEMES.map((x) => ({ value: x, label: THEME_LABEL[lang][x] }))]} />
          </div>
        )}
        {isMock && (
          <div className="max-w-xs">
            <SelectField id={`${idPrefix}-goto`} label={L.goto} value={String(cur)} onChange={(v) => { if (window.speechSynthesis) window.speechSynthesis.cancel(); setSpeaking(false); setCur(Number(v)); }} options={(n ? qs : [null]).map((_, i) => ({ value: String(i), label: `${i + 1}${n ? ` / ${n}` : ''}` }))} />
          </div>
        )}
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-navy-700">
            <span>{n ? L.q(cur + 1, n) : ''}</span>
            {q && <span className="rounded bg-navy-100 px-2 py-0.5 text-xs font-medium text-navy-800">{q.level.replace('CLB', 'CLB ')} · {THEME_LABEL[lang][q.theme]}</span>}
          </div>
          {loading && <p className="mt-3 text-navy-700">{L.loading}</p>}
          {q && !loading && (
            <div className="mt-3">
              {listening && voiceOk && (
                <button type="button" onClick={play} disabled={speaking || playedOnce} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800 disabled:cursor-not-allowed disabled:bg-navy-300">
                  {speaking ? L.playing : playedOnce ? L.played : (plays[q.docId] ? L.replay : L.play)}
                </button>
              )}
              {listening && !voiceOk && <p className="text-sm text-amber-800">{L.noVoice}</p>}
              {docShown && (
                <div className="mt-3 rounded-lg border border-navy-200 bg-navy-50 p-3 text-[0.95rem] leading-relaxed text-navy-900" lang={itemLang}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-navy-600">{listening ? L.transcript : L.doc}</p>
                  <p className="whitespace-pre-line">{q.doc}</p>
                </div>
              )}
              <fieldset className="mt-4">
                <legend className="text-lg font-semibold leading-snug text-navy-900" lang={itemLang}>{q.q}</legend>
                <div className="mt-3 grid gap-2" lang={itemLang}>
                  {q.options.map((o, i) => {
                    const picked = a === i, isRight = i === q.answer, shown = showAll && a !== null;
                    const cls = !shown ? (picked ? 'border-accent-700 bg-accent-50 text-navy-900' : 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50') : isRight ? 'border-green-700 bg-green-50 text-green-900' : picked ? 'border-red-700 bg-red-50 text-red-900' : 'border-navy-200 bg-white text-navy-600';
                    return <button key={i} type="button" onClick={() => choose(i)} aria-pressed={picked} className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-base ${cls}`}>{o}</button>;
                  })}
                </div>
                {a !== null && (
                  <div className="mt-4 border-l-4 border-accent-700 bg-accent-50 px-4 py-3 text-sm text-navy-800" aria-live="polite">
                    {showAll ? <p><strong>{a === q.answer ? L.right : L.wrong}</strong>{a !== q.answer && <> {L.answer} <span lang={itemLang}>{q.options[q.answer]}</span>.</>} {q.explain[lang]} <span className="text-navy-600">{L.ref}{sepc}{q.ref.doc}, {q.ref.section}</span></p> : <p>{L.hidden}</p>}
                  </div>
                )}
              </fieldset>
              <div className="mt-4 flex flex-wrap gap-3">
                {cur > 0 && <button type="button" onClick={() => setCur(cur - 1)} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.prev}</button>}
                {cur < n - 1 && <button type="button" onClick={() => { if (window.speechSynthesis) window.speechSynthesis.cancel(); setSpeaking(false); setCur(cur + 1); }} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.next}</button>}
                {!done && answeredN > 0 && (cur === n - 1 || answeredN === n) && <button type="button" onClick={() => setDone(true)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.finish}</button>}
                <button type="button" onClick={newSet} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.again}</button>
              </div>
            </div>
          )}
        </div>
        {done && (
          <div className="rounded-xl border border-navy-200 bg-white p-4 text-sm">
            {left === 0 && <p className="mb-2 font-medium text-red-700">{L.timeUp}</p>}
            <p className="font-semibold text-navy-900">{L.review}</p>
            {qs.every((x, i) => answers[i] === x.answer) ? <p className="mt-2 text-navy-700">{L.none}</p> : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-navy-800">{qs.map((x, i) => (answers[i] !== x.answer ? <li key={x.id}><span className="font-medium" lang={itemLang}>{x.q}</span> {L.answer} <span lang={itemLang}>{x.options[x.answer]}</span>. <span className="text-navy-700">{x.explain[lang]}</span></li> : null))}</ol>
            )}
          </div>
        )}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.score}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{showAll ? right : answeredN}<span className="text-xl font-semibold text-navy-700"> / {done ? n : showAll ? answeredN : n}</span></p>
        <p className="text-sm text-navy-700">{answeredN} / {n} {L.answered}</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(answeredN / Math.max(1, n)) * 100}%` }} /></div>
        <p className="mt-3 text-sm text-navy-700">{isMock ? L.mock(n, minutes) : L.practice(n)}</p>
        {isMock && <p className="tabular-nums mt-1 text-sm text-navy-700">{L.left}{sepc}{clock}</p>}
        {isMock && left == null && !done && <button type="button" onClick={startClock} className="mt-2 h-10 rounded-lg border border-navy-300 bg-white px-4 text-sm font-medium text-navy-800 hover:bg-navy-50">{L.start}</button>}
        {showAll && answeredN > 0 && (
          <div className="mt-3"><p className="text-sm font-semibold text-navy-900">{L.byLevel}</p>
            <ul className="mt-1 space-y-1 text-xs text-navy-700">{results.map((r) => <li key={r.level} className="flex justify-between gap-2"><span>{r.level.replace('CLB', 'CLB ')}</span><span className="tabular-nums">{r.right}/{r.total}</span></li>)}</ul>
            {done && <p className="mt-2 text-sm text-navy-900">{L.indicative}{sepc}<strong>{ind ? ind.replace('CLB', 'CLB ') : L.noLevel}</strong></p>}
            {done && <p className="mt-1 text-xs text-navy-700">{L.indicNote}</p>}
          </div>
        )}
        <p className="mt-3 text-xs text-navy-700">{L.stored}</p>
      </div>
    </div>
  );
}
