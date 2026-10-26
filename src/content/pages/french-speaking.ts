import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const O = (h: Helpers) => h.P.tef.canada.eo;
const Q = (h: Helpers) => h.P.tcf.canada.eo;
const s = (h: Helpers, t: 'tef' | 'tcf', lv: number) => h.range(t, 'S', lv).split('–')[0];
const half = (x: number, lang: 'en' | 'fr') => (x % 1 ? (lang === 'fr' ? `${Math.floor(x)} min 30` : `${Math.floor(x)} min 30 s`) : `${x} min`);

export default definePage({
  id: 'french-speaking',
  group: 'practice',
  order: 50,
  tool: { kind: 'speaking', props: { task: 'tefA' } },
  mini: { kind: 'mini:plan' },
  related: ['french-writing', 'french-listening', 'citizenship-language', 'tef-canada', 'tcf-canada', 'preparation'],
  sources: ['cci_tef_canada', 'fei_tcf_manual', 'ircc_cit_lang', 'ircc_equiv'],
  en: {
    slug: 'tef-tcf-speaking-practice',
    nav: 'French speaking practice',
    card: 'The TEF and TCF speaking tasks with a subject, a timer with preparation time and a self-check list.',
    title: 'TEF and TCF speaking practice: oral tasks with a timer',
    description: 'TEF and TCF speaking practice: each oral task with a subject, a timer that includes preparation time and a self-check list, to rehearse alone before the exam.',
    h1: 'TEF Canada and TCF Canada speaking practice',
    intro: 'Choose a task, read the subject, start the timer and speak aloud until it stops. Then tick what went well on the checklist, and try another subject.',
    resume: (h) => `Speaking can look impossible to prepare without a partner. Much of it can be rehearsed alone: the format, the timing and the habit of talking without long pauses. This page gives the oral tasks of the TEF Canada and TCF Canada with a subject written by Radif Partners and a timer. The TEF Canada speaking test lasts ${O(h).min} minutes: section A (${O(h).a} minutes) asks you to obtain information, section B (${O(h).b} minutes) to convince someone. The TCF Canada has ${Q(h).tasks} tasks in ${Q(h).min} minutes: a guided interview of ${Q(h).t1} minutes, an interaction of ${half(Q(h).t2, 'en')} after ${Q(h).t2prep} minutes of preparation, and a point of view of ${half(Q(h).t3, 'en')}. NCLC 7 in speaking starts at ${s(h, 'tef', 7)} on the TEF and at ${s(h, 'tcf', 7)} out of 20 on the TCF. For citizenship, speaking is one of the two skills IRCC checks, at NCLC ${h.P.citizenship.clb}. The site records nothing: if you want to hear yourself, use your phone's recorder, and treat our checklist as a reminder, not as the examiners' grid.`,
    faqs: (h) => [
      { q: 'Can I practise TEF and TCF speaking without a partner?', a: 'Partly. You can rehearse the format, keep talking for the full time and work on linking ideas, which is what this page is for. What you cannot rehearse alone is reacting to an examiner who asks unexpected questions. For that part, practise with a French speaker, playing the examiner in turn.' },
      { q: 'Does the speaking page record or analyse my voice?', a: 'No. The page shows a subject, runs a timer and offers a checklist; it never turns on the microphone. If you want to listen back, record yourself with your phone. Hearing your own hesitations and repeated words is, in our view, one of the most useful exercises, and it costs nothing.' },
      { q: 'How long is the TCF Canada oral test?', a: `${Q(h).min} minutes for ${Q(h).tasks} tasks, according to the candidate manual: a guided interview of ${Q(h).t1} minutes, an interaction of ${half(Q(h).t2, 'en')} with ${Q(h).t2prep} minutes of preparation before it, and a point of view of ${half(Q(h).t3, 'en')}. The result is a mark out of 20; IRCC places NCLC 7 at ${s(h, 'tcf', 7)}.` },
      { q: 'What speaking level do I need for Canadian citizenship?', a: `NCLC ${h.P.citizenship.clb} in speaking and in listening for applicants aged ${h.P.citizenship.ages[0]} to ${h.P.citizenship.ages[1]}. With the TEF Canada or TCF Canada, IRCC asks CEFR ${h.P.citizenship.tefCefr} or higher. The CCI notes that the TEF Canada for citizenship covers listening and speaking only, so reading and writing are not sat.` },
    ],
    body: (h) => `
<h2>The oral tasks of both tests</h2>
${h.table(['Test and task', 'What you do', 'Time'], [
  ['TEF Canada, section A', 'ask questions to obtain information', `${O(h).a} min`],
  ['TEF Canada, section B', 'convince the other person', `${O(h).b} min`],
  ['TCF Canada, task 1', 'guided interview', half(Q(h).t1, 'en')],
  ['TCF Canada, task 2', 'interaction', `${Q(h).t2prep} min preparation, then ${half(Q(h).t2, 'en')}`],
  ['TCF Canada, task 3', 'give a point of view', half(Q(h).t3, 'en')],
], `Speaking formats: CCI Paris Île-de-France (TEF Canada, ${O(h).min} minutes in all) and TCF candidate manual, version J (TCF Canada).`, ['l', 'l', 'r'])}
<p>Section B of the TEF is twice as long as section A, and convincing someone means answering objections, not reciting arguments. On the TCF, the interaction task is the only one with preparation time, which the timer on this page counts separately before the speaking time. Sources: the ${h.src('cci_tef_canada', 'CCI presentation')} and the ${h.src('fei_tcf_manual', 'TCF candidate manual')}.</p>
<h2>Practising alone with the timer</h2>
<p>Select a task: the subject appears, written by Radif Partners in the spirit of the official task. Press "Start" and speak aloud, standing if it helps, as if the examiner were across the table. For the TCF interaction, the clock first shows the preparation time, then the speaking time. When it reaches zero, stop, even mid-sentence: learning how much fits in the time is half the exercise. Then go through the seven-point checklist (task completed, no long silences, ideas linked, varied vocabulary, verb tenses, clear pronunciation, arguments for the opinion tasks) and tick only what was true. "Another subject" changes the situation for the same task.</p>
<h2>Speaking for citizenship and for Express Entry</h2>
<p>For citizenship, the ${h.src('ircc_cit_lang', 'IRCC page')} asks NCLC ${h.P.citizenship.clb} in speaking and listening, which for the TEF Canada and TCF Canada means CEFR ${h.P.citizenship.tefCefr} or higher; on the TEF chart NCLC ${h.P.citizenship.clb} in speaking starts at ${s(h, 'tef', h.P.citizenship.clb)}. For Express Entry, speaking is converted to its own NCLC like the other three skills, and NCLC 7 starts at ${s(h, 'tef', 7)} on the TEF and ${s(h, 'tcf', 7)} out of 20 on the TCF. The ${h.a('citizenship-language', 'citizenship language page')} lists every accepted test.</p>
<h2>What examiners look at, and what we cannot judge</h2>
<p>The CCI says that TEF speaking is assessed by two examiners. The TCF gives a mark out of 20. Our checklist sums up what the tasks plainly ask (doing the task, keeping the exchange going, organising ideas, vocabulary, grammar, pronunciation), but it is our own list, and nothing on this page measures your accent or your grammar. A French speaker listening to a recording of you will tell you more than any tick box.</p>
<h2>A speaking routine (our suggestion)</h2>
<p>Do one or two timed tasks a day, short and often rather than one long session a week. Record yourself on your phone, listen once, write down the three words or structures you were missing, and do the same task again with a new subject. Every few days, ask someone to play the examiner for section A or the TCF interaction, since those depend on questions you cannot predict. The ${h.a('french-listening', 'listening practice')} trains the other half of the oral pair, and the plan calculator under the summary spreads your weekly hours across the four skills.</p>`,
  },
  fr: {
    slug: 'expression-orale-tef-tcf',
    nav: 'Expression orale',
    card: 'Les tâches d’expression orale du TEF et du TCF avec sujet, chrono, temps de préparation et grille.',
    title: 'Expression orale TEF et TCF : tâches chronométrées',
    description: 'Expression orale TEF et TCF : chaque tâche de l’oral avec un sujet, un chrono qui compte la préparation et une grille d’auto-évaluation, pour répéter seul.',
    h1: 'Expression orale : entraînement TEF Canada et TCF Canada',
    intro: 'Choisissez une tâche, lisez le sujet, lancez le chrono et parlez à voix haute jusqu’à la fin. Cochez ensuite ce qui a fonctionné, puis essayez un autre sujet.',
    resume: (h) => `L’expression orale semble impossible à préparer sans partenaire. Une bonne part se travaille pourtant seul : le format, le temps et l’habitude de parler sans longs silences. Cette page propose les tâches orales du TEF Canada et du TCF Canada, avec un sujet rédigé par Radif Partners et un chrono. L’oral du TEF Canada dure ${O(h).min} minutes : la section A (${O(h).a} minutes) consiste à obtenir des informations, la section B (${O(h).b} minutes) à convaincre. Le TCF Canada compte ${Q(h).tasks} tâches en ${Q(h).min} minutes : un entretien dirigé de ${Q(h).t1} minutes, un exercice en interaction de ${half(Q(h).t2, 'fr')} précédé de ${Q(h).t2prep} minutes de préparation, et l’expression d’un point de vue en ${half(Q(h).t3, 'fr')}. Le NCLC 7 en expression orale commence à ${s(h, 'tef', 7)} au TEF et à ${s(h, 'tcf', 7)} sur 20 au TCF. Pour la citoyenneté, l’oral fait partie des deux compétences vérifiées par IRCC, au NCLC ${h.P.citizenship.clb}. Le site n’enregistre rien : pour vous réécouter, servez-vous du dictaphone de votre téléphone, et voyez notre grille comme un aide-mémoire, pas comme celle des examinateurs.`,
    faqs: (h) => [
      { q: 'Peut-on préparer l’oral du TEF et du TCF sans partenaire ?', a: 'En partie. Seul, on peut répéter le format, parler pendant tout le temps imparti et travailler l’enchaînement des idées : c’est l’objet de cette page. Ce qu’on ne peut pas répéter seul, c’est la réaction à un examinateur qui pose des questions imprévues. Pour cela, entraînez-vous avec un francophone en échangeant les rôles.' },
      { q: 'La page d’oral enregistre-t-elle ou analyse-t-elle ma voix ?', a: 'Non. Elle affiche un sujet, fait tourner un chrono et propose une grille ; elle n’active jamais le micro. Pour vous réécouter, enregistrez-vous avec votre téléphone. Entendre ses propres hésitations et ses mots répétés est, selon nous, l’un des exercices les plus utiles, et il ne coûte rien.' },
      { q: 'Combien de temps dure l’oral du TCF Canada ?', a: `${Q(h).min} minutes pour ${Q(h).tasks} tâches, selon le manuel du candidat : un entretien dirigé de ${Q(h).t1} minutes, un exercice en interaction de ${half(Q(h).t2, 'fr')} précédé de ${Q(h).t2prep} minutes de préparation, et un point de vue en ${half(Q(h).t3, 'fr')}. Le résultat est une note sur 20 ; IRCC place le NCLC 7 à ${s(h, 'tcf', 7)}.` },
      { q: 'Quel niveau à l’oral pour la citoyenneté canadienne ?', a: `Le NCLC ${h.P.citizenship.clb} en expression orale et en compréhension orale, pour les demandeurs de ${h.P.citizenship.ages[0]} à ${h.P.citizenship.ages[1]} ans. Avec le TEF Canada ou le TCF Canada, IRCC demande le niveau ${h.P.citizenship.tefCefr} ou plus. La CCI précise que le TEF Canada passé pour la citoyenneté ne comporte que la compréhension et l’expression orales.` },
    ],
    body: (h) => `
<h2>Les tâches orales des deux tests</h2>
${h.table(['Test et tâche', 'Ce que vous faites', 'Temps'], [
  ['TEF Canada, section A', 'poser des questions pour obtenir des informations', `${O(h).a} min`],
  ['TEF Canada, section B', 'convaincre votre interlocuteur', `${O(h).b} min`],
  ['TCF Canada, tâche 1', 'entretien dirigé', half(Q(h).t1, 'fr')],
  ['TCF Canada, tâche 2', 'exercice en interaction', `${Q(h).t2prep} min de préparation, puis ${half(Q(h).t2, 'fr')}`],
  ['TCF Canada, tâche 3', 'expression d’un point de vue', half(Q(h).t3, 'fr')],
], `Formats de l’expression orale : CCI Paris Île-de-France (TEF Canada, ${O(h).min} minutes en tout) et manuel du candidat TCF, version J (TCF Canada).`, ['l', 'l', 'r'])}
<p>La section B du TEF dure deux fois plus longtemps que la section A, et convaincre suppose de répondre aux objections, pas de réciter des arguments. Au TCF, seule la tâche en interaction prévoit un temps de préparation, que le chrono de cette page décompte à part, avant le temps de parole. Sources : la ${h.src('cci_tef_canada', 'présentation de la CCI')} et le ${h.src('fei_tcf_manual', 'manuel du candidat TCF')}.</p>
<h2>S’entraîner seul avec le chrono</h2>
<p>Choisissez une tâche : le sujet s’affiche, écrit par Radif Partners dans l’esprit de la tâche officielle. Appuyez sur « Démarrer » et parlez à voix haute, debout si cela vous aide, comme si l’examinateur était en face. Pour l’interaction du TCF, le chrono affiche d’abord la préparation, puis le temps de parole. À zéro, arrêtez-vous, même au milieu d’une phrase : apprendre ce qui tient dans le temps fait partie de l’exercice. Passez ensuite la grille de sept points (tâche accomplie, pas de longs silences, idées reliées, vocabulaire varié, temps des verbes, prononciation claire, arguments pour les tâches d’opinion) et ne cochez que ce qui était vrai. « Autre sujet » change de situation pour la même tâche.</p>
<h2>L’oral pour la citoyenneté et pour Entrée express</h2>
<p>Pour la citoyenneté, la ${h.src('ircc_cit_lang', 'page d’IRCC')} demande le NCLC ${h.P.citizenship.clb} en expression et en compréhension orales, soit le niveau ${h.P.citizenship.tefCefr} ou plus au TEF Canada et au TCF Canada ; dans la grille du TEF, le NCLC ${h.P.citizenship.clb} à l’oral commence à ${s(h, 'tef', h.P.citizenship.clb)}. Pour Entrée express, l’oral se convertit en NCLC comme les trois autres épreuves, avec le NCLC 7 dès ${s(h, 'tef', 7)} au TEF et dès ${s(h, 'tcf', 7)} sur 20 au TCF. La page du ${h.a('citizenship-language', 'test de langue pour la citoyenneté')} recense tous les tests acceptés.</p>
<h2>Ce que regardent les examinateurs, et ce que nous ne pouvons pas juger</h2>
<p>La CCI indique que l’oral du TEF est évalué par deux correcteurs. Le TCF attribue une note sur 20. Notre grille résume ce que demandent clairement les tâches (accomplir la consigne, faire vivre l’échange, organiser ses idées, vocabulaire, grammaire, prononciation), mais c’est notre propre liste, et rien sur cette page ne mesure votre accent ni votre grammaire. Un francophone qui écoute votre enregistrement vous en apprendra davantage qu’une case cochée.</p>
<h2>Une routine pour l’oral (notre suggestion)</h2>
<p>Faites une ou deux tâches chronométrées par jour : mieux vaut court et souvent qu’une longue séance par semaine. Enregistrez-vous, réécoutez une fois, notez les trois mots ou tournures qui vous ont manqué, puis refaites la même tâche avec un nouveau sujet. Tous les deux ou trois jours, demandez à quelqu’un de jouer l’examinateur pour la section A ou l’interaction du TCF, qui reposent sur des questions imprévisibles. L’entraînement en ${h.a('french-listening', 'compréhension orale')} travaille l’autre moitié de l’oral, et le calculateur de plan placé sous le résumé répartit vos heures entre les quatre épreuves.</p>`,
  },
});
