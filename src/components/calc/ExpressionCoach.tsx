/**
 * Writing and speaking practice: the task formats of the TEF Canada, TCF Canada and TEF IRN (time
 * and length from params-2026.json), a subject written by Radif Partners, a timer, a word counter
 * for writing and a self-assessment checklist. Nothing typed here is sent or saved: the text
 * disappears when the page is closed.
 */
import { useEffect, useRef, useState } from 'react';
import SelectField from '../ui/SelectField';
import P from '../../data/params-2026.json';
import { seedOf } from '../../lib/engine/quiz';

type Lang = 'en' | 'fr';
type Kind = 'writing' | 'speaking';
interface Task { id: string; label: { en: string; fr: string }; prep?: number; minutes: number; words?: [number, number | null]; prompts: string[] }
const TE = P.tef.canada, TC = P.tcf.canada, TI = P.tef.irn;
const W: Task[] = [
  { id: 'tefA', label: { en: `TEF Canada writing, section A: continue a news item (${TE.ee.a.min} min, ${TE.ee.a.words} words or more)`, fr: `TEF Canada écrit, section A : suite d’un fait divers (${TE.ee.a.min} min, ${TE.ee.a.words} mots au moins)` }, minutes: TE.ee.a.min, words: [TE.ee.a.words, null], prompts: [
    'Un chien perdu a traversé seul tout le centre-ville de Moncton avant de s’arrêter devant une boulangerie. Imaginez la suite de cette histoire.',
    'Un autobus scolaire est resté bloqué deux heures dans la neige ; les enfants ont organisé un concours de chansons. Racontez la suite.',
    'Une locataire découvre dans son grenier une boîte de lettres écrites il y a cinquante ans. Racontez ce qu’elle décide de faire.',
    'Un festival de quartier a été annulé la veille à cause d’une panne d’électricité. Imaginez comment les habitants ont sauvé la fête.',
  ] },
  { id: 'tefB', label: { en: `TEF Canada writing, section B: give and defend a point of view (${TE.ee.b.min} min, ${TE.ee.b.words} words or more)`, fr: `TEF Canada écrit, section B : exprimer et défendre un point de vue (${TE.ee.b.min} min, ${TE.ee.b.words} mots au moins)` }, minutes: TE.ee.b.min, words: [TE.ee.b.words, null], prompts: [
    '« Le télétravail devrait devenir la règle pour tous les emplois de bureau. » Vous réagissez à cette affirmation dans le courrier des lecteurs d’un journal.',
    '« Les cours de musique ne sont pas indispensables à l’école. » Donnez votre opinion avec des arguments et des exemples.',
    '« Interdire les voitures dans le centre des villes rendrait la vie meilleure. » Écrivez une lettre au maire de votre ville.',
    '« Apprendre une langue avec une application suffit, pas besoin de professeur. » Vous répondez à cette idée sur un forum.',
  ] },
  { id: 'tcf1', label: { en: `TCF Canada writing, task 1: a short message (${TC.ee.words[0][0]} to ${TC.ee.words[0][1]} words; timer: our suggested 15 of the ${TC.ee.min} min)`, fr: `TCF Canada écrit, tâche 1 : un message court (${TC.ee.words[0][0]} à ${TC.ee.words[0][1]} mots ; chrono : 15 des ${TC.ee.min} min, notre suggestion)` }, minutes: 15, words: [TC.ee.words[0][0], TC.ee.words[0][1]], prompts: [
    'Vous invitez vos collègues à un repas pour fêter votre nouvel emploi. Écrivez-leur un message : date, lieu, ce que chacun peut apporter.',
    'Votre voisine vous a gardé vos plantes pendant vos vacances. Écrivez-lui un message pour la remercier et lui proposer un service en retour.',
    'Vous ne pourrez pas assister au cours de mercredi. Écrivez à votre professeur pour l’expliquer et demander ce que vous devez rattraper.',
  ] },
  { id: 'tcf2', label: { en: `TCF Canada writing, task 2: an article or account (${TC.ee.words[1][0]} to ${TC.ee.words[1][1]} words; timer: our suggested 20 of the ${TC.ee.min} min)`, fr: `TCF Canada écrit, tâche 2 : un article ou un récit (${TC.ee.words[1][0]} à ${TC.ee.words[1][1]} mots ; chrono : 20 des ${TC.ee.min} min, notre suggestion)` }, minutes: 20, words: [TC.ee.words[1][0], TC.ee.words[1][1]], prompts: [
    'Pour le bulletin de votre association, racontez une journée de bénévolat qui vous a marqué et dites ce que vous en retenez.',
    'Sur un blogue de voyageurs, décrivez une ville où vous avez vécu et donnez trois conseils à ceux qui veulent s’y installer.',
    'Pour le journal de votre entreprise, racontez votre première semaine dans votre poste et ce qui vous a surpris.',
  ] },
  { id: 'tcf3', label: { en: `TCF Canada writing, task 3: compare two views and give yours (${TC.ee.words[2][0]} to ${TC.ee.words[2][1]} words; timer: our suggested 25 of the ${TC.ee.min} min)`, fr: `TCF Canada écrit, tâche 3 : comparer deux points de vue et donner le sien (${TC.ee.words[2][0]} à ${TC.ee.words[2][1]} mots ; chrono : 25 des ${TC.ee.min} min, notre suggestion)` }, minutes: 25, words: [TC.ee.words[2][0], TC.ee.words[2][1]], prompts: [
    'Pour les uns, les devoirs à la maison aident les élèves à progresser ; pour les autres, ils creusent les inégalités. Présentez ces deux opinions, puis donnez la vôtre.',
    'Certains pensent qu’il faut habiter près de son travail, d’autres préfèrent la campagne et de longs trajets. Comparez ces deux choix et dites ce que vous en pensez.',
    'Les uns trouvent les réseaux sociaux utiles pour s’informer, les autres les jugent dangereux. Résumez ces positions puis prenez parti.',
  ] },
  { id: 'irnA', label: { en: `TEF IRN writing, section A: news to a friend (${TI.ee.a.min} min, ${TI.ee.a.words} words or more)`, fr: `TEF IRN écrit, section A : prendre des nouvelles (${TI.ee.a.min} min, ${TI.ee.a.words} mots au moins)` }, minutes: TI.ee.a.min, words: [TI.ee.a.words, null], prompts: [
    'Une amie vient de déménager dans une autre ville. Écrivez-lui pour prendre de ses nouvelles et lui donner des vôtres.',
    'Votre cousin a commencé un nouveau travail. Écrivez-lui un message pour lui demander comment cela se passe.',
  ] },
  { id: 'irnB', label: { en: `TEF IRN writing, section B: explain your motivation (${TI.ee.b.min} min, ${TI.ee.b.words} words or more)`, fr: `TEF IRN écrit, section B : exposer ses motivations (${TI.ee.b.min} min, ${TI.ee.b.words} mots au moins)` }, minutes: TI.ee.b.min, words: [TI.ee.b.words, null], prompts: [
    'Vous souhaitez participer à un atelier de cuisine organisé par la mairie. Écrivez pour expliquer pourquoi vous voulez y participer.',
    'Une association cherche des bénévoles pour accompagner des personnes âgées. Écrivez pour présenter votre candidature et vos raisons.',
  ] },
];
const S: Task[] = [
  { id: 'tefA', label: { en: `TEF Canada speaking, section A: ask for information (${TE.eo.a} min)`, fr: `TEF Canada oral, section A : obtenir des informations (${TE.eo.a} min)` }, minutes: TE.eo.a, prompts: [
    'Vous lisez une petite annonce : un club de randonnée cherche de nouveaux membres. Vous téléphonez pour en savoir plus (horaires, prix, niveau, matériel).',
    'Une école de langues propose des cours du soir. Vous appelez pour vous renseigner sur les groupes, les dates et l’inscription.',
    'Un appartement est à louer près de votre travail. Vous appelez le propriétaire pour poser toutes vos questions avant la visite.',
  ] },
  { id: 'tefB', label: { en: `TEF Canada speaking, section B: convince a friend (${TE.eo.b} min)`, fr: `TEF Canada oral, section B : convaincre un ami (${TE.eo.b} min)` }, minutes: TE.eo.b, prompts: [
    'Vous avez vu l’annonce d’un séjour de bénévolat dans un parc national. Vous essayez de convaincre un ami de partir avec vous ; il hésite.',
    'Une ville organise un concours de jardins sur les balcons. Vous voulez convaincre votre colocataire d’y participer ; elle n’a pas le temps.',
  ] },
  { id: 'tcf1', label: { en: `TCF Canada speaking, task 1: guided interview (${TC.eo.t1} min, no preparation)`, fr: `TCF Canada oral, tâche 1 : entretien dirigé (${TC.eo.t1} min, sans préparation)` }, minutes: TC.eo.t1, prompts: [
    'Présentez-vous : votre parcours, votre travail ou vos études, vos loisirs et ce que vous aimez dans votre ville.',
    'Parlez de votre famille, de votre quartier et d’une journée habituelle de votre semaine.',
  ] },
  { id: 'tcf2', label: { en: `TCF Canada speaking, task 2: interaction (${TC.eo.t2prep} min preparation, ${String(TC.eo.t2).replace('.5', ' ½')} min)`, fr: `TCF Canada oral, tâche 2 : exercice en interaction (${TC.eo.t2prep} min de préparation, ${String(TC.eo.t2).replace('.5', ' min 30')})` }, prep: TC.eo.t2prep, minutes: TC.eo.t2, prompts: [
    'Vous voulez inscrire votre enfant à une activité sportive. L’examinateur joue le responsable du centre : posez-lui vos questions.',
    'Vous cherchez une salle pour fêter un anniversaire. L’examinateur joue le gérant d’un restaurant : informez-vous et négociez.',
  ] },
  { id: 'tcf3', label: { en: `TCF Canada speaking, task 3: give a point of view (${String(TC.eo.t3).replace('.5', ' ½')} min, no preparation)`, fr: `TCF Canada oral, tâche 3 : exprimer un point de vue (${String(TC.eo.t3).replace('.5', ' min 30')}, sans préparation)` }, minutes: TC.eo.t3, prompts: [
    '« Il vaut mieux vivre en ville qu’à la campagne quand on a des enfants. » Qu’en pensez-vous ?',
    '« Tout le monde devrait faire du bénévolat au moins une fois dans sa vie. » Êtes-vous d’accord ?',
    '« Les voyages en avion devraient coûter plus cher pour protéger l’environnement. » Donnez votre avis.',
  ] },
  { id: 'irnA', label: { en: `TEF IRN speaking, section A: phone for information (${TI.eo.a} min)`, fr: `TEF IRN oral, section A : appel pour se renseigner (${TI.eo.a} min)` }, minutes: TI.eo.a, prompts: [
    'Vous appelez une médiathèque pour savoir comment s’inscrire, les horaires et ce qu’on peut emprunter.',
  ] },
  { id: 'irnB', label: { en: `TEF IRN speaking, section B: help a friend decide (${TI.eo.b} min)`, fr: `TEF IRN oral, section B : aider un ami à prendre une décision (${TI.eo.b} min)` }, minutes: TI.eo.b, prompts: [
    'Votre ami hésite entre deux logements : un grand appartement loin du centre ou un petit studio près de son travail. Aidez-le à choisir.',
  ] },
];
const GRID = {
  writing: {
    en: ['The text does what the task asks (type of text, person addressed, all points covered)', 'Length within the range or above the minimum', 'Clear plan: introduction, paragraphs, conclusion, linking words', 'Varied and precise vocabulary, few repetitions', 'Verbs, agreements and spelling mostly under control', 'Register suited to the reader (tu or vous, formulas)', 'Opinion supported by arguments and examples (point-of-view tasks)'],
    fr: ['Le texte répond à la consigne (type de texte, destinataire, tous les points traités)', 'Longueur dans la fourchette ou au-dessus du minimum', 'Plan clair : introduction, paragraphes, conclusion, connecteurs', 'Vocabulaire varié et précis, peu de répétitions', 'Verbes, accords et orthographe le plus souvent maîtrisés', 'Registre adapté au lecteur (tutoiement ou vouvoiement, formules)', 'Opinion appuyée par des arguments et des exemples (tâches d’opinion)'],
  },
  speaking: {
    en: ['I did what the task asks until the end of the time', 'I asked or answered questions naturally, without long silences', 'My ideas follow each other with linking words', 'Varied vocabulary, I rephrase when a word is missing', 'Verb tenses and agreements mostly correct', 'Pronunciation clear enough to be understood the first time', 'Arguments and examples to support my view (point-of-view tasks)'],
    fr: ['J’ai fait ce que demande la tâche jusqu’à la fin du temps', 'J’ai posé ou répondu aux questions naturellement, sans longs silences', 'Mes idées s’enchaînent avec des connecteurs', 'Vocabulaire varié, je reformule quand un mot me manque', 'Temps des verbes et accords le plus souvent corrects', 'Prononciation assez claire pour être compris du premier coup', 'Arguments et exemples pour défendre mon avis (tâches d’opinion)'],
  },
};
const T = {
  en: { task: 'Task', subject: 'Subject', other: 'Another subject', start: 'Start', pause: 'Pause', reset: 'Reset', prep: 'Preparation', time: 'Time', words: 'Words', write: 'Write your text here', range: (a: number, b: number | null) => (b ? `${a} to ${b} words expected` : `${a} words or more expected`), under: 'Under the expected length', over: 'Over the expected range', inRange: 'Length OK', grid: 'Self-assessment checklist', score: (n: number, m: number) => `${n} of ${m} points ticked`, note: 'Our own checklist, inspired by what the tasks ask: it is not the official marking grid. Your text is not sent or saved.', done: 'Time is up.', speakNote: 'Speak aloud as if the examiner were in front of you; record yourself on your phone if you want to listen back.' },
  fr: { task: 'Tâche', subject: 'Sujet', other: 'Autre sujet', start: 'Démarrer', pause: 'Pause', reset: 'Remettre à zéro', prep: 'Préparation', time: 'Temps', words: 'Mots', write: 'Écrivez votre texte ici', range: (a: number, b: number | null) => (b ? `${a} à ${b} mots attendus` : `${a} mots au moins attendus`), under: 'Sous la longueur attendue', over: 'Au-delà de la fourchette', inRange: 'Longueur correcte', grid: 'Grille d’auto-évaluation', score: (n: number, m: number) => `${n} point${n > 1 ? 's' : ''} coché${n > 1 ? 's' : ''} sur ${m}`, note: 'Notre propre grille, inspirée de ce que demandent les tâches : ce n’est pas la grille officielle de correction. Votre texte n’est ni transmis ni enregistré.', done: 'Temps écoulé.', speakNote: 'Parlez à voix haute comme devant l’examinateur ; enregistrez-vous avec votre téléphone si vous voulez vous réécouter.' },
} as const;
/** French word count: apostrophes and hyphens join, numbers count as words. */
export const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0);

interface Props { lang?: Lang; kind: Kind; task?: string; idPrefix?: string }
export default function ExpressionCoach({ lang = 'en', kind, task: t0, idPrefix = 'ex' }: Props) {
  const L = T[lang];
  const tasks = kind === 'writing' ? W : S;
  const [taskId, setTaskId] = useState(t0 ?? tasks[0].id);
  const task = tasks.find((x) => x.id === taskId) ?? tasks[0];
  const [pi, setPi] = useState(() => seedOf(`${kind}-${taskId}`) % task.prompts.length);
  const [text, setText] = useState('');
  const [secs, setSecs] = useState(0);
  const [running, setRunning] = useState(false);
  const [ticks, setTicks] = useState<boolean[]>(() => GRID[kind][lang].map(() => false));
  const timer = useRef<number | null>(null);
  const prep = (task.prep ?? 0) * 60, total = prep + task.minutes * 60;
  useEffect(() => {
    if (!running) return;
    timer.current = window.setInterval(() => setSecs((s) => { if (s + 1 >= total) { setRunning(false); return total; } return s + 1; }), 1000);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [running, total]);
  const pick = (id: string) => { setTaskId(id); setPi(0); setSecs(0); setRunning(false); };
  const inPrep = secs < prep;
  const remain = inPrep ? prep - secs : total - secs;
  const clock = `${Math.floor(remain / 60)}:${String(remain % 60).padStart(2, '0')}`;
  const wc = countWords(text);
  const [lo, hi] = task.words ?? [0, null];
  const status = !task.words ? '' : wc < lo ? L.under : hi && wc > hi ? L.over : L.inRange;
  const grid = GRID[kind][lang];
  const sepc = lang === 'fr' ? ' : ' : ': ';
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-4">
        <SelectField id={`${idPrefix}-task`} label={L.task} value={taskId} onChange={pick} options={tasks.map((x) => ({ value: x.id, label: x.label[lang] }))} />
        <div className="rounded-xl border border-navy-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">{L.subject}</p>
          <p className="mt-1 text-base text-navy-900" lang="fr">{task.prompts[pi % task.prompts.length]}</p>
          {task.prompts.length > 1 && <button type="button" onClick={() => setPi((pi + 1) % task.prompts.length)} className="mt-2 text-sm font-medium text-accent-700 underline">{L.other}</button>}
        </div>
        {kind === 'writing' ? (
          <div>
            <label htmlFor={`${idPrefix}-txt`} className="mb-1 block text-sm font-medium text-navy-700">{L.write}</label>
            <textarea id={`${idPrefix}-txt`} lang="fr" value={text} onChange={(e) => { setText(e.target.value); if (!running && secs === 0) setRunning(true); }} rows={10} spellCheck={false} autoComplete="off" className="w-full rounded-lg border border-navy-300 bg-white p-3 text-base text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
          </div>
        ) : <p className="text-sm text-navy-700">{L.speakNote}</p>}
        <fieldset className="rounded-xl border border-navy-200 bg-white p-4">
          <legend className="px-1 text-sm font-semibold text-navy-900">{L.grid}</legend>
          <ul className="space-y-2">{grid.map((g, i) => (
            <li key={i}><label className="flex items-start gap-2 text-sm text-navy-800"><input type="checkbox" checked={ticks[i]} onChange={() => setTicks((o) => o.map((x, j) => (j === i ? !x : x)))} className="mt-0.5 h-4 w-4 accent-accent-700" />{g}</label></li>
          ))}</ul>
        </fieldset>
      </div>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{task.prep && inPrep ? L.prep : L.time}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{clock}</p>
        {secs >= total && <p className="text-sm font-semibold text-red-700">{L.done}</p>}
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" onClick={() => setRunning(!running)} className="h-10 rounded-lg bg-accent-700 px-4 text-sm font-semibold text-white hover:bg-accent-800">{running ? L.pause : L.start}</button>
          <button type="button" onClick={() => { setRunning(false); setSecs(0); }} className="h-10 rounded-lg border border-navy-300 bg-white px-4 text-sm font-medium text-navy-800 hover:bg-navy-50">{L.reset}</button>
        </div>
        {kind === 'writing' && (
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 text-navy-700">{L.words}</td><td className="tabular-nums py-1.5 text-right font-semibold text-navy-900">{wc}</td></tr>
            {task.words && <tr><td colSpan={2} className="py-1.5 text-navy-700">{L.range(lo, hi)}{status ? ` · ${status}` : ''}</td></tr>}
          </tbody></table>
        )}
        <p className="mt-3 text-sm text-navy-900">{L.grid}{sepc}<strong>{L.score(ticks.filter(Boolean).length, grid.length)}</strong></p>
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
