import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const E = (h: Helpers) => h.P.tef.canada.ee;
const W = (h: Helpers) => h.P.tcf.canada.ee;
const w7 = (h: Helpers, t: 'tef' | 'tcf') => h.range(t, 'W', 7).split('–')[0];

export default definePage({
  id: 'french-writing',
  group: 'practice',
  order: 48,
  tool: { kind: 'writing', props: { task: 'tefB' } },
  mini: { kind: 'mini:words' },
  related: ['french-speaking', 'tef-mock', 'tcf-mock', 'tef-canada', 'tcf-canada', 'tef-irn'],
  sources: ['cci_tef_canada', 'fei_tcf_manual', 'cci_tef_irn_passation', 'ircc_equiv'],
  en: {
    slug: 'tef-tcf-writing-practice',
    nav: 'French writing practice',
    card: 'Every TEF and TCF writing task with a subject, a timer, a word counter and a checklist.',
    title: 'TEF and TCF writing practice: timed tasks and word counter',
    description: 'TEF and TCF writing practice: the official tasks with a subject, a timer, a live word counter set to the expected length and a checklist. Nothing is saved.',
    h1: 'TEF Canada and TCF Canada writing practice',
    intro: 'Choose a task, read the subject, start typing: the clock starts with your first word, and the counter tells you whether your text is long enough.',
    resume: (h) => `Writing is the test you can practise best on your own, provided you time yourself and count your words. This page gives you every writing task of the TEF Canada and TCF Canada with a subject written by Radif Partners, a timer set to the task, a word counter and a checklist. On the TEF Canada, writing lasts ${E(h).min} minutes: section A (${E(h).a.min} minutes) asks you to continue a news item in at least ${E(h).a.words} words, section B (${E(h).b.min} minutes) to defend a point of view in at least ${E(h).b.words} words. The TCF Canada has ${W(h).tasks} tasks in ${W(h).min} minutes, with ranges of ${W(h).words.map(([a, b]) => `${a} to ${b}`).join(', ')} words. NCLC 7 in writing starts at ${w7(h, 'tef')} on the TEF scale and at ${w7(h, 'tcf')} out of 20 on the TCF. The checklist is ours, not the official marking grid, and no software can mark your text the way the examiners do. What you type is neither sent nor saved: copy it before closing the page if you want to keep it or show it to a teacher.`,
    faqs: (h) => [
      { q: 'How many words do the TEF Canada writing sections require?', a: `At least ${E(h).a.words} words for section A, where you continue a news item, and at least ${E(h).b.words} words for section B, where you argue a point of view. The CCI gives ${E(h).a.min} and ${E(h).b.min} minutes respectively, ${E(h).min} in all. The small tool under the summary checks a count against each minimum.` },
      { q: 'How does the word counter count French words?', a: 'It splits the text on spaces and counts every piece that contains a letter or a digit. A word joined by an apostrophe or a hyphen, such as "l’école" or "peut-être", counts once, and a number counts as a word. The sources we rely on give no official counting rule, so keep a small margin above the minimum.' },
      { q: 'Does the practice page mark my French text?', a: 'No. It counts words and times you, and the checklist lets you tick what your text does, but there is no automatic grade. Writing on the TEF is marked by two examiners and the TCF gives a mark out of 20; an honest machine score is not possible. Show your texts to a French speaker or a teacher for feedback.' },
      { q: 'Why does the TCF writing timer stop before 60 minutes?', a: `The TCF gives ${W(h).min} minutes for all ${W(h).tasks} tasks together, not a time per task. The coach splits the hour into a time per task, which is only our suggestion so you can practise one task at a time. On test day you manage the hour as you wish.` },
    ],
    body: (h) => `
<h2>The writing tasks side by side</h2>
${h.table(['Test and task', 'What you write', 'Time', 'Length'], [
  ['TEF Canada, section A', 'the rest of a news item', `${E(h).a.min} min`, `${E(h).a.words} words or more`],
  ['TEF Canada, section B', 'a point of view with arguments', `${E(h).b.min} min`, `${E(h).b.words} words or more`],
  ['TCF Canada, task 1', 'a short message', `${W(h).min} min for the three tasks`, `${W(h).words[0][0]} to ${W(h).words[0][1]} words`],
  ['TCF Canada, task 2', 'an article or account', 'shared', `${W(h).words[1][0]} to ${W(h).words[1][1]} words`],
  ['TCF Canada, task 3', 'two views compared, then yours', 'shared', `${W(h).words[2][0]} to ${W(h).words[2][1]} words`],
], 'Writing formats: CCI Paris Île-de-France (TEF Canada) and TCF candidate manual, version J (TCF Canada).', ['l', 'l', 'r', 'r'])}
<p>The coach also offers the two writing tasks of the TEF IRN, the CCI's test for French administrative procedures; the ${h.a('tef-irn', 'TEF IRN page')} explains what it is used for. The ${h.src('cci_tef_canada', 'CCI presentation')} and the ${h.src('fei_tcf_manual', 'TCF manual')} are the sources of every figure above.</p>
<h2>How the writing coach works</h2>
<p>Pick a task in the list. A subject appears, written by Radif Partners in the style of the task; "Another subject" gives a new one. The timer starts on your first keystroke, or with "Start", and counts down from the time of the task. While you type, the panel shows the number of words and says whether you are under the expected length, inside it, or past the upper limit for the TCF tasks. Under the text, a checklist of seven points helps you reread: does the text answer the task, is it organised, is the register right for the reader, are verbs and agreements under control? Ticking is for you only. Spell-check is switched off in the text box, so no underlining helps you along.</p>
<h2>Length is a floor, not a target</h2>
<p>On the TEF, the figures are minimums. Writing exactly ${E(h).b.words} words in section B leaves no margin if the examiner counts differently from you, so aim a little above. On the TCF, the instructions give a range, and the upper bound matters as much as the lower one. Our suggestion for both tests: plan first, in a few lines, then write, and keep the last minutes to reread verbs and agreements. In our view, a clean and well-built text is a better use of the time than extra length.</p>
<h2>Marking and the NCLC you need</h2>
<p>The CCI states that TEF writing is marked by two examiners; the result is a score that IRCC reads on its writing chart, where NCLC 7 starts at ${w7(h, 'tef')}. The TCF gives a mark out of 20, and IRCC places NCLC 7 at ${w7(h, 'tcf')}. The sources we rely on contain no marking grid a candidate could apply alone, which is why our checklist is labelled as our own. If writing is your weakest skill, it alone decides eligibility for the Federal Skilled Worker program and the French-language category, both of which ask NCLC ${h.P.ee.fsw} in every skill.</p>
<h2>A writing routine (our suggestion)</h2>
<p>Write one timed task several times a week, alternating the two TEF sections or the three TCF tasks. After each text, tick the checklist honestly, then rewrite the weakest paragraph without the timer. Keep a list of your recurring errors and check it before the next attempt. Before the exam, take the full writing time in one sitting at least once, so the hour does not surprise you. Your text is not stored by the site: paste it into a document of your own if you want to track progress. For the oral tasks, the ${h.a('french-speaking', 'speaking practice')} uses the same timer.</p>`,
  },
  fr: {
    slug: 'expression-ecrite-tef-tcf',
    nav: 'Expression écrite',
    card: 'Toutes les tâches d’expression écrite du TEF et du TCF, avec sujet, chrono, compteur de mots et grille.',
    title: 'Expression écrite TEF et TCF : sujets, chrono et compteur',
    description: 'Expression écrite TEF et TCF : les tâches officielles avec un sujet, un chrono, un compteur de mots relié à la longueur attendue et une grille de relecture.',
    h1: 'Expression écrite : entraînement TEF Canada et TCF Canada',
    intro: 'Choisissez une tâche, lisez le sujet, écrivez : le chrono démarre au premier mot, et le compteur vous dit si votre texte atteint la longueur demandée.',
    resume: (h) => `L’expression écrite est l’épreuve qui se travaille le mieux seul, à condition de se chronométrer et de compter ses mots. Cette page réunit toutes les tâches d’écrit du TEF Canada et du TCF Canada, avec un sujet rédigé par Radif Partners, un chrono réglé sur la tâche, un compteur de mots et une grille de relecture. Au TEF Canada, l’écrit dure ${E(h).min} minutes : la section A (${E(h).a.min} minutes) demande d’écrire la suite d’un fait divers en ${E(h).a.words} mots au moins, la section B (${E(h).b.min} minutes) de défendre un point de vue en ${E(h).b.words} mots au moins. Le TCF Canada compte ${W(h).tasks} tâches en ${W(h).min} minutes, avec des fourchettes de ${W(h).words.map(([a, b]) => `${a} à ${b}`).join(', ')} mots. Le NCLC 7 en expression écrite commence à ${w7(h, 'tef')} sur l’échelle du TEF et à ${w7(h, 'tcf')} sur 20 au TCF. La grille est la nôtre, pas celle des correcteurs, et aucun logiciel ne peut noter votre texte comme eux. Ce que vous tapez n’est ni transmis ni enregistré : copiez-le avant de fermer la page si vous voulez le garder ou le montrer à un professeur.`,
    faqs: (h) => [
      { q: 'Combien de mots faut-il écrire aux sections du TEF Canada ?', a: `Au moins ${E(h).a.words} mots pour la section A, la suite d’un fait divers, et au moins ${E(h).b.words} mots pour la section B, un point de vue argumenté. La CCI accorde respectivement ${E(h).a.min} et ${E(h).b.min} minutes, soit ${E(h).min} au total. Le petit outil sous le résumé compare un nombre de mots à chaque minimum.` },
      { q: 'Comment le compteur compte-t-il les mots en français ?', a: 'Il découpe le texte aux espaces et compte chaque morceau qui contient une lettre ou un chiffre. Un mot avec apostrophe ou trait d’union, comme « l’école » ou « peut-être », compte une fois, et un nombre compte comme un mot. Les sources que nous utilisons ne donnent aucune règle officielle de décompte : gardez une petite marge au-dessus du minimum.' },
      { q: 'La page d’entraînement corrige-t-elle mon texte ?', a: 'Non. Elle compte les mots et mesure le temps, et la grille permet de cocher ce que fait votre texte, mais elle ne donne aucune note. Au TEF, l’écrit est corrigé par deux correcteurs ; au TCF, il reçoit une note sur 20 ; une note automatique honnête est impossible. Faites relire vos textes par un francophone ou un enseignant.' },
      { q: 'Pourquoi le chrono des tâches du TCF ne dure-t-il pas une heure ?', a: `Le TCF accorde ${W(h).min} minutes pour l’ensemble des ${W(h).tasks} tâches, sans temps imposé par tâche. L’outil répartit l’heure en un temps par tâche : c’est seulement notre suggestion, pour s’entraîner sur une tâche à la fois. Le jour de l’examen, vous gérez l’heure comme vous l’entendez.` },
    ],
    body: (h) => `
<h2>Les tâches d’écrit côte à côte</h2>
${h.table(['Test et tâche', 'Ce que vous écrivez', 'Temps', 'Longueur'], [
  ['TEF Canada, section A', 'la suite d’un fait divers', `${E(h).a.min} min`, `${E(h).a.words} mots au moins`],
  ['TEF Canada, section B', 'un point de vue argumenté', `${E(h).b.min} min`, `${E(h).b.words} mots au moins`],
  ['TCF Canada, tâche 1', 'un message court', `${W(h).min} min pour les trois tâches`, `${W(h).words[0][0]} à ${W(h).words[0][1]} mots`],
  ['TCF Canada, tâche 2', 'un article ou un récit', 'temps partagé', `${W(h).words[1][0]} à ${W(h).words[1][1]} mots`],
  ['TCF Canada, tâche 3', 'deux points de vue comparés, puis le vôtre', 'temps partagé', `${W(h).words[2][0]} à ${W(h).words[2][1]} mots`],
], 'Formats de l’expression écrite : CCI Paris Île-de-France (TEF Canada) et manuel du candidat TCF, version J (TCF Canada).', ['l', 'l', 'r', 'r'])}
<p>L’outil propose aussi les deux tâches d’écrit du TEF IRN, le test de la CCI tourné vers les démarches en France ; la page du ${h.a('tef-irn', 'TEF IRN')} précise à quoi il sert. Tous les chiffres ci-dessus viennent de la ${h.src('cci_tef_canada', 'présentation de la CCI')} et du ${h.src('fei_tcf_manual', 'manuel du TCF')}.</p>
<h2>Le fonctionnement de l’outil d’écriture</h2>
<p>Choisissez une tâche dans la liste. Un sujet s’affiche, rédigé par Radif Partners dans l’esprit de la tâche ; « Autre sujet » en propose un nouveau. Le chrono part à la première frappe, ou avec « Démarrer », et décompte le temps de la tâche. Pendant la rédaction, le panneau donne le nombre de mots et indique si vous êtes sous la longueur attendue, dedans, ou au-delà de la limite haute pour les tâches du TCF. Sous le texte, une grille de sept points aide à relire : le texte répond-il à la consigne, est-il organisé, le registre convient-il au destinataire, les verbes et les accords tiennent-ils ? Les cases cochées ne servent qu’à vous. Le correcteur orthographique est désactivé dans la zone de texte : aucun soulignement ne vient vous aider.</p>
<h2>La longueur est un plancher, pas un objectif</h2>
<p>Au TEF, les chiffres sont des minimums. Écrire tout juste ${E(h).b.words} mots en section B ne laisse aucune marge si le correcteur compte autrement que vous : visez un peu au-dessus. Au TCF, la consigne donne une fourchette, et la borne haute compte autant que la borne basse. Notre suggestion pour les deux tests : un plan de quelques lignes d’abord, la rédaction ensuite, et les dernières minutes pour relire verbes et accords. À nos yeux, un texte propre et bien construit vaut mieux que quelques lignes de plus.</p>
<h2>La correction et le NCLC visé</h2>
<p>La CCI indique que l’écrit du TEF est corrigé par deux correcteurs ; le score obtenu se lit dans la grille d’IRCC, où le NCLC 7 commence à ${w7(h, 'tef')}. Le TCF attribue une note sur 20, et IRCC place le NCLC 7 à ${w7(h, 'tcf')}. Les sources que nous utilisons ne contiennent aucune grille qu’un candidat pourrait appliquer seul : voilà pourquoi notre grille porte la mention « notre propre grille ». Si l’écrit est votre épreuve la plus faible, c’est lui seul qui décide de l’admissibilité au programme des travailleurs qualifiés et à la catégorie « français », qui demandent tous deux le NCLC ${h.P.ee.fsw} partout.</p>
<h2>Une routine d’écriture (notre suggestion)</h2>
<p>Rédigez une tâche chronométrée plusieurs fois par semaine, en alternant les deux sections du TEF ou les trois tâches du TCF. Après chaque texte, cochez la grille sans complaisance, puis réécrivez le paragraphe le plus faible sans chrono. Tenez la liste de vos erreurs récurrentes et relisez-la avant la tentative suivante. Avant l’examen, faites au moins une fois l’écrit complet d’une traite, pour que l’heure ne vous surprenne pas. Le site ne garde pas votre texte : collez-le dans un document à vous pour suivre vos progrès. Pour l’oral, l’entraînement en ${h.a('french-speaking', 'expression orale')} utilise le même chrono.</p>`,
  },
});
