import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const T = (h: Helpers) => h.P.tef.canada;
const lo = (h: Helpers, s: 'R' | 'W' | 'L' | 'S', lv: number) => h.range('tef', s, lv).split('–')[0];

export default definePage({
  id: 'tef-mock',
  group: 'practice',
  order: 44,
  tool: { kind: 'quiz', props: { bank: 'fr-reading', mode: 'mock', test: 'tef' } },
  mini: { kind: 'mini:pace' },
  related: ['tef-canada', 'tef-canada-score', 'tcf-mock', 'french-writing', 'french-speaking', 'review'],
  sources: ['cci_tef_canada', 'cci_tef_canada_results', 'cci_tef_nclc', 'coe_cefr'],
  en: {
    slug: 'tef-canada-practice-test',
    nav: 'TEF Canada mock test',
    card: 'Timed TEF Canada reading and listening sections with the official number of questions and duration.',
    title: 'TEF Canada practice test: timed reading and listening mock',
    description: 'TEF Canada practice test: a timed reading section and a timed listening section with the official question count and duration, marked at the end as in the exam.',
    h1: 'TEF Canada practice test: timed mock sections',
    intro: 'Two timed sections in the TEF Canada format: reading just below, listening further down. The correction waits until the end, and the clock does not stop.',
    resume: (h) => `This TEF Canada practice test reproduces the frame of the two multiple-choice tests: a reading section of ${T(h).ce.q} questions in ${T(h).ce.min} minutes and a listening section of ${T(h).co.q} questions in ${T(h).co.min} minutes, the figures the CCI Paris Île-de-France publishes for the TEF Canada. The questions are not from the TEF: they are drawn from our own banks (${h.num(h.bankSize.frReading)} reading and ${h.num(h.bankSize.frListening)} listening items written by Radif Partners), in the same proportion at every CEFR level from A1 to C2 and sorted from easiest to hardest. The clock starts with your first answer, corrections stay hidden until you finish, and each recording plays once, read by your browser's speech synthesis. At the end you get a raw score, your result level by level and a rough level indication of our own, never a TEF score: the CCI counts one point per right answer and then converts the total into a calibrated score that we cannot reproduce. As a benchmark, NCLC 7 starts at ${lo(h, 'R', 7)} in reading and ${lo(h, 'L', 7)} in listening on the chart in use since 11 December 2023. Writing and speaking have their own practice pages.`,
    faqs: (h) => [
      { q: 'Can I turn my mock raw score into a TEF Canada score out of 699?', a: 'No, and we do not try. The CCI Paris Île-de-France gives one point per right answer and then converts the total into a calibrated score, using data on its own questions that is not public. Our questions have no such calibration. The mock gives a raw score, a success rate per level and our rough indication, nothing more.' },
      { q: 'Does the TEF Canada mock cover all four tests?', a: `It covers the two multiple-choice tests, reading and listening. Writing (${T(h).ee.min} minutes, two sections) and speaking (${T(h).eo.min} minutes, two sections) are marked by examiners, so they are practised on separate pages with a timer, a word counter for writing and a self-assessment checklist.` },
      { q: 'What happens when the mock timer runs out?', a: `The section ends and is marked as it stands. The big figure shows right answers out of the questions you reached, while the per-level lines count skipped questions as missed. The timer starts at your first answer or when you press "Start the timer", and it runs for ${T(h).ce.min} minutes in reading and ${T(h).co.min} in listening. Pausing is not possible.` },
      { q: 'Will I see the same questions if I take the TEF mock twice?', a: `Partly. Each section draws ${T(h).ce.q} questions from a bank larger than the section (${h.num(h.bankSize.frReading)} in reading, ${h.num(h.bankSize.frListening)} in listening), so a second attempt mixes known and new items. The "New set of questions" button gives another draw. A familiar question answered fast says little about your level: judge yourself on the new ones.` },
    ],
    body: (h) => `
<h2>The listening section</h2>
<p>The reading section sits under the title. The listening section is here: ${T(h).co.q} questions, ${T(h).co.min} minutes, each recording played once.</p>
<!--tool:quiz|{"bank":"fr-listening","mode":"mock","test":"tef"}-->
<p>The recordings are read aloud by your browser, so use headphones and check the volume on the first document. If your browser has no French speech synthesis, the transcript is shown instead and the section turns into reading practice: the result then says nothing about listening.</p>
<h2>The four TEF Canada tests</h2>
<p>The mock covers the two tests answered by choosing an option. The full TEF Canada, as described on the ${h.src('cci_tef_canada', 'CCI presentation page')}, looks like this:</p>
${h.table(['Test', 'Format', 'Duration', 'NCLC 7 from'], [
  ['Reading', `${T(h).ce.q} questions`, `${T(h).ce.min} min`, lo(h, 'R', 7)],
  ['Listening', `${T(h).co.q} questions`, `${T(h).co.min} min`, lo(h, 'L', 7)],
  ['Writing', `section A (${T(h).ee.a.words}+ words), section B (${T(h).ee.b.words}+ words)`, `${T(h).ee.min} min`, lo(h, 'W', 7)],
  ['Speaking', 'section A (getting information), section B (convincing)', `${T(h).eo.min} min`, lo(h, 'S', 7)],
], 'TEF Canada format (CCI Paris Île-de-France) and start of NCLC 7 on the chart for tests from 11 December 2023.', ['l', 'l', 'r', 'r'])}
<p>For writing and speaking, the ${h.a('french-writing', 'writing practice')} and ${h.a('french-speaking', 'speaking practice')} pages give the same tasks with a timer. For citizenship, the CCI notes that the TEF Canada covers listening and speaking only.</p>
<h2>How the questions are chosen</h2>
<p>Each section takes from our bank the same share of every CEFR level the bank contains, draws the questions at random inside each level, then orders them from A1 to C2. Questions about the same document stay together. The bank was written by Radif Partners against the CEFR global scale of the Council of Europe; none of it comes from a TEF paper. That is why the result can show where you lose points, but cannot say what the CCI would score.</p>
<h2>Reading the result</h2>
<p>The panel gives three things once you press "See my result" or the clock reaches zero. First, the raw score: right answers out of the questions you answered. Second, the result per CEFR level, which shows where the curve breaks. Third, our indication: the highest level up to which you kept at least two thirds right, level after level. The ${h.src('cci_tef_canada_results', 'CCI results page')} explains that official scores are calibrated, and the ${h.a('tef-canada-score', 'TEF score page')} converts real scores to NCLC levels.</p>
<p>A practical reading of the panel, as our suggestion: if your accuracy drops at B2, that is where to practise, since NCLC 7 in reading (${lo(h, 'R', 7)}) falls inside the B2 band that starts at ${h.num(h.P.tef.cecr[2][1] as number)}.</p>
<h2>Fitting the mock into your preparation</h2>
<p>A full section is tiring, which is the point. We suggest one section per sitting, in a quiet place, with your phone away, then a pause before reading the corrections. The time calculator under the summary shows how many seconds each question gets if you keep a few minutes at the end. Missed questions are saved in this browser, and the ${h.a('review', 'review page')} brings them back. If you also consider the TCF, the ${h.a('tcf-mock', 'TCF Canada mock')} uses that test's own count and duration.</p>`,
  },
  fr: {
    slug: 'test-blanc-tef-canada',
    nav: 'Test blanc TEF Canada',
    card: 'Les sections de compréhension écrite et orale du TEF Canada, chronométrées, au nombre officiel de questions.',
    title: 'Test blanc TEF Canada : compréhension écrite et orale',
    description: 'Test blanc TEF Canada : une section de compréhension écrite et une de compréhension orale, au nombre de questions et à la durée officiels, corrigées à la fin.',
    h1: 'Test blanc TEF Canada : sections chronométrées',
    intro: 'Deux sections chronométrées au format du TEF Canada : la compréhension écrite juste en dessous, la compréhension orale plus bas. La correction attend la fin, et le chrono ne s’arrête pas.',
    resume: (h) => `Ce test blanc du TEF Canada reprend le cadre des deux épreuves à choix multiple : une section de compréhension écrite de ${T(h).ce.q} questions en ${T(h).ce.min} minutes et une section de compréhension orale de ${T(h).co.q} questions en ${T(h).co.min} minutes, chiffres publiés par la CCI Paris Île-de-France. Les questions ne sont pas celles du TEF : elles sont tirées de nos propres banques, rédigées par Radif Partners (${h.num(h.bankSize.frReading)} questions de lecture et ${h.num(h.bankSize.frListening)} d’écoute), dans la même proportion à chaque niveau du CECR, du A1 au C2, puis classées de la plus facile à la plus difficile. Le chrono part à la première réponse, les corrections restent cachées jusqu’à la fin et chaque enregistrement, lu par la synthèse vocale du navigateur, ne passe qu’une fois. À l’arrivée : un score brut, un résultat par niveau et une indication approximative de notre cru, jamais un score TEF. La CCI compte un point par bonne réponse, puis convertit le total en score étalonné, un calcul que nous ne pouvons pas reproduire. Pour repère, le NCLC 7 commence à ${lo(h, 'R', 7)} en compréhension écrite et à ${lo(h, 'L', 7)} en compréhension orale dans la grille en vigueur depuis le 11 décembre 2023. L’écrit et l’oral ont leurs propres pages d’entraînement.`,
    faqs: (h) => [
      { q: 'Peut-on convertir le score brut du test blanc en score TEF sur 699 ?', a: 'Non, et nous ne le faisons pas. La CCI Paris Île-de-France attribue un point par bonne réponse puis convertit le total en score étalonné, à partir de données sur ses propres questions qui ne sont pas publiques. Nos questions n’ont pas cet étalonnage. Le test blanc donne un score brut, un taux de réussite par niveau et notre indication approximative.' },
      { q: 'Le test blanc TEF couvre-t-il les quatre épreuves ?', a: `Il couvre les deux épreuves à choix multiple, compréhension écrite et compréhension orale. L’expression écrite (${T(h).ee.min} minutes, deux sections) et l’expression orale (${T(h).eo.min} minutes, deux sections) sont notées par des correcteurs : elles se travaillent sur des pages à part, avec chrono, compteur de mots pour l’écrit et grille d’auto-évaluation.` },
      { q: 'Que se passe-t-il quand le chrono du test blanc arrive à zéro ?', a: `La section s’arrête et elle est notée en l’état. Le grand chiffre donne les bonnes réponses sur les questions traitées, tandis que les lignes par niveau comptent les questions laissées comme manquées. Le chrono démarre à la première réponse ou avec le bouton « Lancer le chrono » ; il dure ${T(h).ce.min} minutes en compréhension écrite et ${T(h).co.min} en compréhension orale, sans pause possible.` },
      { q: 'Retrouve-t-on les mêmes questions en refaisant le test blanc TEF ?', a: `En partie. Chaque section tire ${T(h).ce.q} questions d’une banque plus grande (${h.num(h.bankSize.frReading)} en lecture, ${h.num(h.bankSize.frListening)} en écoute) : une seconde tentative mêle des questions connues et nouvelles. Le bouton « Nouvelle série de questions » fait un autre tirage. Une question déjà vue, réussie vite, en dit peu : jugez-vous sur les nouvelles.` },
    ],
    body: (h) => `
<h2>La section de compréhension orale</h2>
<p>La compréhension écrite se trouve sous le titre. Voici la compréhension orale : ${T(h).co.q} questions, ${T(h).co.min} minutes, une seule écoute par document.</p>
<!--tool:quiz|{"bank":"fr-listening","mode":"mock","test":"tef"}-->
<p>Les documents sont lus par votre navigateur : prenez un casque et réglez le volume dès le premier. Si le navigateur n’a pas de synthèse vocale en français, la transcription s’affiche à la place et la section devient un exercice de lecture ; son résultat ne dit alors rien de votre écoute.</p>
<h2>Les quatre épreuves du TEF Canada</h2>
<p>Le test blanc couvre les deux épreuves où l’on choisit une réponse. Le TEF Canada complet, tel que le décrit la ${h.src('cci_tef_canada', 'page de présentation de la CCI')}, se compose ainsi :</p>
${h.table(['Épreuve', 'Format', 'Durée', 'NCLC 7 dès'], [
  ['Compréhension écrite', `${T(h).ce.q} questions`, `${T(h).ce.min} min`, lo(h, 'R', 7)],
  ['Compréhension orale', `${T(h).co.q} questions`, `${T(h).co.min} min`, lo(h, 'L', 7)],
  ['Expression écrite', `section A (${T(h).ee.a.words} mots au moins), section B (${T(h).ee.b.words} mots au moins)`, `${T(h).ee.min} min`, lo(h, 'W', 7)],
  ['Expression orale', 'section A (obtenir des informations), section B (convaincre)', `${T(h).eo.min} min`, lo(h, 'S', 7)],
], 'Format du TEF Canada (CCI Paris Île-de-France) et début du NCLC 7 dans la grille des tests passés depuis le 11 décembre 2023.', ['l', 'l', 'r', 'r'])}
<p>Pour l’écrit et l’oral, les pages d’${h.a('french-writing', 'expression écrite')} et d’${h.a('french-speaking', 'expression orale')} proposent les mêmes tâches avec un chrono. Pour la citoyenneté, la CCI indique que le TEF Canada ne porte que sur la compréhension et l’expression orales.</p>
<h2>Le choix des questions</h2>
<p>Chaque section prend dans notre banque la même part de chaque niveau du CECR que celle de la banque, tire les questions au hasard à l’intérieur de chaque niveau, puis les range du A1 au C2. Les questions qui portent sur un même document restent groupées. La banque a été écrite par Radif Partners à partir de l’échelle globale du CECR du Conseil de l’Europe ; rien ne provient d’un sujet du TEF. Le résultat montre donc où vous perdez des points, sans pouvoir dire ce que noterait la CCI.</p>
<h2>Lire le résultat</h2>
<p>Après « Voir mon résultat », ou quand le chrono tombe à zéro, le panneau affiche trois éléments. D’abord le score brut : les bonnes réponses sur les questions traitées. Ensuite le résultat par niveau du CECR, qui montre où la courbe décroche. Enfin notre indication : le niveau le plus haut jusqu’où vous avez gardé au moins deux tiers de bonnes réponses. La ${h.src('cci_tef_canada_results', 'page de la CCI sur les résultats')} rappelle que les scores officiels sont étalonnés, et la page du ${h.a('tef-canada-score', 'score TEF Canada')} convertit un vrai score en NCLC.</p>
<p>Une lecture pratique, à titre de suggestion : si la réussite chute au B2, c’est là qu’il faut travailler, puisque le NCLC 7 en compréhension écrite (${lo(h, 'R', 7)}) se situe dans la bande B2, qui commence à ${h.num(h.P.tef.cecr[2][1] as number)}.</p>
<h2>Placer le test blanc dans la préparation</h2>
<p>Une section complète fatigue, et c’est voulu. Nous suggérons une section par séance, au calme, téléphone de côté, puis une pause avant de lire les corrections. Le calculateur de temps placé sous le résumé indique combien de secondes revient à chaque question si vous gardez quelques minutes pour relire. Les questions manquées sont enregistrées dans ce navigateur, et la ${h.a('review', 'page de révision')} les fait revenir. Si vous hésitez avec le TCF, le ${h.a('tcf-mock', 'test blanc du TCF Canada')} suit le nombre de questions et la durée propres à ce test.</p>`,
  },
});
