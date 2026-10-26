import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const pts = (h: Helpers, lv: number) => h.P.crs.first.single[lv];

export default definePage({
  id: 'celpip-reading',
  group: 'practice',
  order: 52,
  tool: { kind: 'quiz', props: { bank: 'en-reading' } },
  mini: { kind: 'mini:celpipclb' },
  related: ['celpip', 'celpip-listening', 'celpip-vs-ielts', 'clb-7', 'crs-language', 'review'],
  sources: ['ircc_equiv', 'ircc_ee_lang', 'cclb', 'ircc_crs'],
  en: {
    slug: 'celpip-reading-practice',
    nav: 'CELPIP reading practice',
    card: 'English reading questions from CLB 4 to CLB 10, corrected at once, to check your level before a CELPIP test.',
    title: 'CELPIP practice test for reading: CLB 4 to 10 questions',
    description: 'CELPIP reading practice: English reading questions sorted by CLB level, from 4 to 10, corrected at once, to see where you stand before booking the CELPIP.',
    h1: 'CELPIP reading practice by CLB level',
    intro: 'Choose a CLB level or leave "All", read the text, answer: you see at once whether you were right and why. The panel on the right tracks your score level by level.',
    resume: (h) => `For Canadian immigration, a CELPIP-General level converts one for one into the Canadian Language Benchmarks: CELPIP ${h.P.tests.celpip.min} is CLB ${h.P.tests.celpip.min}, CELPIP 7 is CLB 7, up to ${h.P.tests.celpip.max} and above, according to the IRCC equivalency chart. This page does not copy the CELPIP. It offers ${h.num(h.bankSize.enReading)} English reading questions written by Radif Partners, at every CLB level from ${h.P.clb.min} to ${h.P.clb.max}, on everyday Canadian situations: building notices, workplace emails, clinic letters, city announcements and opinion pieces. Each question was written with the CLB reading benchmarks of the Centre for Canadian Language Benchmarks in mind, is corrected as soon as you answer, and comes with an explanation in English and French. The CELPIP's own parts, timing and question types are not described here, because we have not confirmed them on an official source. What the practice can do is show the CLB level where your accuracy drops. That matters: the Federal Skilled Worker program asks CLB ${h.P.ee.fsw} in reading as in every skill, and each reading level up to 10 adds first-language points in Express Entry, ${pts(h, 7)} at CLB 7 for a single candidate.`,
    faqs: (h) => [
      { q: 'Is this an official CELPIP practice test?', a: 'No. Radif Partners is not linked to the CELPIP or its publisher, and none of these questions come from the test. They are general English reading questions graded by CLB level, written with the Canadian Language Benchmarks in mind. Their purpose is to locate your level, not to reproduce the CELPIP format, which we have not confirmed on an official source.' },
      { q: 'Which CLB level do the English reading questions start at?', a: `CLB ${h.P.clb.min}, the lowest level on IRCC's equivalency charts, and they go up to CLB ${h.P.clb.max}. The bank holds the same number of questions at each level, ${h.num(h.bankSize.enReading)} in all. Use the level filter to stay on one band, or leave "All" for a mixed set that shows where your answers start to slip.` },
      { q: 'What CELPIP reading level do I need for Express Entry?', a: `It depends on the program. The Federal Skilled Worker program asks CLB ${h.P.ee.fsw} in all four skills, so CELPIP ${h.P.ee.fsw} in reading. The Canadian Experience Class asks CLB ${h.P.ee.cecTeer01} for TEER 0 or 1 jobs and CLB ${h.P.ee.cecTeer23} for TEER 2 or 3. The Federal Skilled Trades program asks CLB ${h.P.ee.fst.R} in reading and writing.` },
      { q: 'Does a higher CELPIP reading score add Express Entry points?', a: `Yes, up to CLB 10. For a single candidate, reading in the first official language earns ${pts(h, 7)} points at CLB 7, ${pts(h, 8)} at CLB 8, ${pts(h, 9)} at CLB 9 and ${pts(h, 10)} at CLB 10 or more. Above 10 the points stop rising. The calculator under the summary applies the same scale to all four skills.` },
    ],
    body: (h) => `
<h2>What the questions test at each level</h2>
<p>Each question in the bank is tagged with the CLB level it targets. The descriptions below are our own short summaries, used to write the questions; the full benchmarks are published by the ${h.src('cclb', 'Centre for Canadian Language Benchmarks')}.</p>
${h.table(['CLB level', 'What our reading questions ask'], [
  ['4', 'find a specific detail in a short, simple everyday text'],
  ['5', 'understand key facts in a short notice, message or email'],
  ['6', 'get the main idea and details of a routine text'],
  ['7', 'understand main ideas, details and opinions in a moderately complex text'],
  ['8', 'identify opinions, arguments and purpose in a longer text'],
  ['9', 'interpret implied meaning and the writer’s intent'],
  ['10', 'analyse tone, nuance and the structure of an argument'],
], 'Our summary of the reading tasks behind each level of the question bank (Radif Partners, after the Canadian Language Benchmarks).', ['l', 'l'])}
<h2>From CELPIP level to CLB, and to other tests</h2>
<p>IRCC's ${h.src('ircc_equiv', 'equivalency chart')} treats CELPIP-General levels as CLB levels directly. For the other English tests IRCC accepts, the reading score that reaches CLB 7 differs:</p>
${h.table(['Test', 'Reading score for CLB 7', 'Reading score for CLB 9'], [
  ['CELPIP-General', '7', '9'],
  ['IELTS General Training', h.range('ielts', 'R', 7), h.range('ielts', 'R', 9)],
  ['PTE Core', h.range('pte', 'R', 7), h.range('pte', 'R', 9)],
], 'Reading scores per CLB level (IRCC equivalency charts).', ['l', 'r', 'r'])}
<p>The ${h.a('celpip-vs-ielts', 'CELPIP or IELTS page')} compares the full charts. Note that IRCC's ${h.src('ircc_ee_lang', 'Express Entry language page')} accepts the IELTS General Training but not its One Skill Retake.</p>
<h2>How to use the practice before booking a test</h2>
<p>Run two or three unfiltered sets of ten questions first. The panel shows your result per CLB level and, once you press "See my result", an indication of our own: the highest level up to which you kept at least two thirds right. If that lands below your target, filter on the level just above it and work there, reading every explanation. The questions you miss are kept in this browser for the ${h.a('review', 'review page')}. When your accuracy holds at your target level and the one above, the practice has done what it can; it cannot tell you what a CELPIP examiner or scoring system would give you.</p>
<h2>Why reading levels matter in Express Entry</h2>
<p>Reading counts in two ways. As a minimum, it must reach the level your program asks: CLB ${h.P.ee.fsw} for the Federal Skilled Worker program, CLB ${h.P.ee.cecTeer01} or ${h.P.ee.cecTeer23} for the Canadian Experience Class depending on the job, CLB ${h.P.ee.fst.R} for skilled trades. As points, each level adds to your Comprehensive Ranking System score: ${pts(h, 6)} at CLB 6, ${pts(h, 7)} at CLB 7, ${pts(h, 9)} at CLB 9 for a single candidate. Results must be less than ${h.P.ee.validityYears} years old when you create your profile and when you apply for permanent residence. The ${h.a('clb-7', 'CLB 7 page')} lists the scores to aim for in each test, and the ${h.a('crs-language', 'language points page')} gives the full scale.</p>
<h2>About the CELPIP format</h2>
<p>We do not describe the number of parts, the timing, the fee or the result delay of the CELPIP-General: we could not confirm them on an official source when this page was checked. Look them up with the test publisher before you book. What IRCC confirms, and what this site uses, is the level equivalence and the fact that the CELPIP-General is accepted for Express Entry and, at level ${h.P.citizenship.celpip} or above in listening and speaking, for citizenship. The ${h.a('celpip', 'CELPIP and CLB page')} converts your results.</p>`,
  },
  fr: {
    slug: 'celpip-lecture-entrainement',
    nav: 'Lecture CELPIP',
    card: 'Des questions de lecture en anglais du CLB 4 au CLB 10, corrigées aussitôt, pour situer son niveau avant le CELPIP.',
    title: 'Lecture CELPIP : entraînement en anglais du CLB 4 au CLB 10',
    description: 'Lecture CELPIP : des questions de lecture en anglais classées par niveau CLB, de 4 à 10, corrigées aussitôt, pour vous situer avant le CELPIP-General.',
    h1: 'Lecture en anglais : entraînement par niveau CLB pour le CELPIP',
    intro: 'Choisissez un niveau CLB ou laissez « Tous », lisez le texte et répondez : vous voyez tout de suite si c’est juste et pourquoi. Le panneau de droite suit votre score niveau par niveau.',
    resume: (h) => `Pour l’immigration au Canada, un niveau CELPIP-General se convertit tel quel en niveau de compétence linguistique canadien (CLB) : CELPIP ${h.P.tests.celpip.min} vaut CLB ${h.P.tests.celpip.min}, CELPIP 7 vaut CLB 7, et ainsi de suite jusqu’à ${h.P.tests.celpip.max} et plus, selon la grille d’équivalence d’IRCC. Cette page ne reproduit pas le CELPIP. Elle propose ${h.num(h.bankSize.enReading)} questions de lecture en anglais rédigées par Radif Partners, à chaque niveau du CLB ${h.P.clb.min} au CLB ${h.P.clb.max}, sur des situations de la vie au Canada : avis d’immeuble, courriels de travail, lettres de clinique, annonces municipales, textes d’opinion. Chaque question a été écrite en tenant compte des niveaux de lecture du Centre des niveaux de compétence linguistique canadiens ; elle se corrige dès votre réponse, avec une explication en français et en anglais. Les parties, la durée et les types de questions du CELPIP ne sont pas décrits ici, faute de confirmation sur une source officielle. L’entraînement sert à repérer le niveau CLB où vos réponses faiblissent. C’est utile : le programme des travailleurs qualifiés exige le CLB ${h.P.ee.fsw} en lecture comme partout, et chaque niveau de lecture jusqu’à 10 ajoute des points de première langue dans Entrée express, ${pts(h, 7)} au CLB 7 pour un candidat seul.`,
    faqs: (h) => [
      { q: 'Est-ce un test d’entraînement officiel du CELPIP ?', a: 'Non. Radif Partners n’a aucun lien avec le CELPIP ni avec son éditeur, et aucune de ces questions ne vient du test. Ce sont des questions générales de lecture en anglais, classées par niveau CLB et écrites en tenant compte des niveaux de compétence linguistique canadiens. Elles servent à situer votre niveau, pas à imiter le format du CELPIP, que nous n’avons pas confirmé sur une source officielle.' },
      { q: 'À quel niveau CLB commencent les questions de lecture en anglais ?', a: `Au CLB ${h.P.clb.min}, le plus bas des grilles d’équivalence d’IRCC, et elles montent jusqu’au CLB ${h.P.clb.max}. La banque compte le même nombre de questions à chaque niveau, ${h.num(h.bankSize.enReading)} en tout. Le filtre de niveau permet de rester sur une bande ; « Tous » donne une série mélangée qui montre où vos réponses commencent à flancher.` },
      { q: 'Quel niveau de lecture CELPIP faut-il pour Entrée express ?', a: `Cela dépend du programme. Les travailleurs qualifiés doivent avoir le CLB ${h.P.ee.fsw} aux quatre compétences, donc CELPIP ${h.P.ee.fsw} en lecture. La catégorie de l’expérience canadienne demande le CLB ${h.P.ee.cecTeer01} pour un emploi FEER 0 ou 1 et le CLB ${h.P.ee.cecTeer23} pour un emploi FEER 2 ou 3. Les métiers spécialisés demandent le CLB ${h.P.ee.fst.R} en lecture et en écriture.` },
      { q: 'Un meilleur score de lecture au CELPIP donne-t-il plus de points ?', a: `Oui, jusqu’au CLB 10. Pour un candidat seul, la lecture en première langue officielle rapporte ${pts(h, 7)} points au CLB 7, ${pts(h, 8)} au CLB 8, ${pts(h, 9)} au CLB 9 et ${pts(h, 10)} au CLB 10 ou plus. Au-delà de 10, les points ne montent plus. Le calculateur sous le résumé applique ce barème aux quatre compétences.` },
    ],
    body: (h) => `
<h2>Ce que vérifient les questions à chaque niveau</h2>
<p>Chaque question de la banque porte le niveau CLB qu’elle vise. Les descriptions ci-dessous sont nos propres résumés, utilisés pour écrire les questions ; les niveaux complets sont publiés par le ${h.src('cclb', 'Centre des niveaux de compétence linguistique canadiens')}.</p>
${h.table(['Niveau CLB', 'Ce que demandent nos questions de lecture'], [
  ['4', 'repérer un détail précis dans un texte court et simple de la vie courante'],
  ['5', 'comprendre les faits essentiels d’un avis, d’un message ou d’un courriel court'],
  ['6', 'saisir l’idée principale et les détails d’un texte courant'],
  ['7', 'comprendre idées, détails et opinions dans un texte de complexité moyenne'],
  ['8', 'repérer opinions, arguments et intention dans un texte plus long'],
  ['9', 'interpréter l’implicite et l’intention de l’auteur'],
  ['10', 'analyser le ton, les nuances et la structure d’une argumentation'],
], 'Notre résumé des tâches de lecture derrière chaque niveau de la banque (Radif Partners, d’après les niveaux de compétence linguistique canadiens).', ['l', 'l'])}
<h2>Du niveau CELPIP au CLB, et aux autres tests</h2>
<p>La ${h.src('ircc_equiv', 'grille d’équivalence d’IRCC')} traite les niveaux du CELPIP-General comme des niveaux CLB. Pour les autres tests d’anglais acceptés, le score de lecture qui donne le CLB 7 change :</p>
${h.table(['Test', 'Lecture pour le CLB 7', 'Lecture pour le CLB 9'], [
  ['CELPIP-General', '7', '9'],
  ['IELTS General Training', h.range('ielts', 'R', 7), h.range('ielts', 'R', 9)],
  ['PTE Core', h.range('pte', 'R', 7), h.range('pte', 'R', 9)],
], 'Scores de lecture par niveau CLB (grilles d’équivalence d’IRCC).', ['l', 'r', 'r'])}
<p>La page ${h.a('celpip-vs-ielts', 'CELPIP ou IELTS')} compare les grilles complètes. La ${h.src('ircc_ee_lang', 'page d’IRCC sur les exigences linguistiques')} accepte l’IELTS General Training, mais pas sa version One Skill Retake.</p>
<h2>Utiliser l’entraînement avant de réserver un test</h2>
<p>Commencez par deux ou trois séries de dix questions sans filtre. Le panneau affiche votre résultat par niveau CLB et, après « Voir mon résultat », une indication de notre cru : le niveau le plus haut jusqu’où vous avez gardé au moins deux tiers de bonnes réponses. S’il se situe sous votre objectif, filtrez sur le niveau juste au-dessus et travaillez-le, en lisant chaque explication. Les questions manquées restent dans ce navigateur pour la ${h.a('review', 'page de révision')}. Quand vos réponses tiennent à votre niveau cible et au suivant, l’entraînement a rempli son rôle ; il ne peut pas dire quelle note vous donnerait le CELPIP.</p>
<h2>Pourquoi le niveau de lecture compte dans Entrée express</h2>
<p>La lecture compte de deux façons. Comme minimum, elle doit atteindre le niveau du programme visé : CLB ${h.P.ee.fsw} pour les travailleurs qualifiés, CLB ${h.P.ee.cecTeer01} ou ${h.P.ee.cecTeer23} pour l’expérience canadienne selon l’emploi, CLB ${h.P.ee.fst.R} pour les métiers spécialisés. Comme points, chaque niveau s’ajoute au score du Système de classement global : ${pts(h, 6)} au CLB 6, ${pts(h, 7)} au CLB 7, ${pts(h, 9)} au CLB 9 pour un candidat seul. Les résultats doivent avoir moins de ${h.P.ee.validityYears} ans à la création du profil et au dépôt de la demande de résidence permanente. La page du ${h.a('clb-7', 'CLB 7')} donne les scores à viser pour chaque test, celle des ${h.a('crs-language', 'points de langue')} le barème complet.</p>
<h2>À propos du format du CELPIP</h2>
<p>Nous ne décrivons ni le nombre de parties, ni la durée, ni le prix, ni le délai de résultat du CELPIP-General : nous n’avons pas pu les confirmer sur une source officielle lors de la vérification de cette page. Renseignez-vous auprès de l’éditeur du test avant de réserver. Ce qu’IRCC confirme, et ce que le site utilise, c’est l’équivalence des niveaux et l’acceptation du CELPIP-General pour Entrée express et, au niveau ${h.P.citizenship.celpip} ou plus à l’écoute et à l’oral, pour la citoyenneté. La page ${h.a('celpip', 'CELPIP et NCLC')} convertit vos résultats.</p>`,
  },
});
