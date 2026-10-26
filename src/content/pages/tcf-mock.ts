import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = (h: Helpers) => h.P.tcf.canada;
const lo = (h: Helpers, s: 'R' | 'W' | 'L' | 'S', lv: number) => h.range('tcf', s, lv).split('–')[0];
const hm = (h: Helpers, lang: 'en' | 'fr') => {
  const m = C(h).totalMin, hh = Math.floor(m / 60), mm = m % 60;
  return lang === 'fr' ? `${hh} h ${mm}` : `${hh} h ${mm} min`;
};
const half = (x: number, lang: 'en' | 'fr') => (x % 1 ? (lang === 'fr' ? `${Math.floor(x)} min 30` : `${Math.floor(x)} min 30 s`) : `${x} min`);

export default definePage({
  id: 'tcf-mock',
  group: 'practice',
  order: 46,
  tool: { kind: 'quiz', props: { bank: 'fr-reading', mode: 'mock', test: 'tcf' } },
  mini: { kind: 'mini:pace' },
  related: ['tcf-canada', 'tcf-canada-score', 'tef-mock', 'tcf-or-tef', 'french-listening', 'review'],
  sources: ['fei_tcf_manual', 'fei_tcf_canada', 'ircc_equiv', 'coe_cefr'],
  en: {
    slug: 'tcf-canada-practice-test',
    nav: 'TCF Canada mock test',
    card: 'Timed TCF Canada reading and listening sections: official question count and duration, easiest to hardest.',
    title: 'TCF Canada practice test: timed reading and listening',
    description: 'TCF Canada practice test with a timed reading section and a timed listening section, official count and duration, four options, easy to hard, marked at the end.',
    h1: 'TCF Canada practice test: two timed sections',
    intro: 'Reading first, under this title; listening below. Each section follows the count and duration of the TCF Canada, with the correction kept for the end.',
    resume: (h) => `This TCF Canada practice test gives you the two multiple-choice tests in their official frame: reading, ${C(h).ce.q} questions in ${C(h).ce.min} minutes, and listening, ${C(h).co.q} questions in ${C(h).co.min} minutes, as set out in version J of the France Éducation international candidate manual. Like the real test, each question has ${h.P.tcf.choices} options and one right answer, the items get harder as you go, and each recording plays once. The content is ours: questions written by Radif Partners against the CEFR, ${h.num(h.bankSize.frReading)} for reading and ${h.num(h.bankSize.frListening)} for listening, drawn in proportion to each level from A1 to C2. Listening uses your browser's speech synthesis rather than studio recordings. When you finish or the clock runs out, the panel shows a raw score, the success rate per level and a rough level indication of our own. That is not a TCF score: the real one runs from ${h.num(h.P.tcf.cecr[5][1] as number)} to ${h.num(h.P.tests.tcf.max.R)} in reading and listening and comes from France Éducation international's calibration. For a target, NCLC 7 starts at ${lo(h, 'R', 7)} in reading and ${lo(h, 'L', 7)} in listening on the IRCC chart. Writing and speaking, marked out of 20, are practised on their own pages.`,
    faqs: (h) => [
      { q: `Why does the TCF mock have ${C(h).ce.q} questions and not ${h.P.tef.canada.ce.q}?`, a: `Because that is the count the TCF candidate manual gives for the TCF Canada: ${C(h).ce.q} questions in reading and ${C(h).co.q} in listening. The TEF Canada uses ${h.P.tef.canada.ce.q} in each. The mock reads both figures from the same data file as the rest of the site, so the two sections match the test you choose.` },
      { q: 'Is the TCF Canada listening section harder than the TEF one?', a: `Its pace is tighter: ${C(h).co.q} questions in ${C(h).co.min} minutes, against ${h.P.tef.canada.co.q} in ${h.P.tef.canada.co.min} minutes for the TEF Canada. Whether it feels harder depends on the candidate. The time calculator under the summary shows the seconds available per question in each format.` },
      { q: 'How is the real TCF Canada reading test scored?', a: `The manual describes a score from ${h.num(h.P.tcf.cecr[5][1] as number)} to ${h.num(h.P.tests.tcf.max.R)} for reading and listening, linked to CEFR levels, while writing and speaking get a mark out of 20. IRCC then reads each score on its own chart: NCLC 7 starts at ${lo(h, 'R', 7)} in reading and at ${lo(h, 'W', 7)} out of 20 in writing.` },
      { q: 'Should I take the TCF mock or the TEF mock?', a: 'The one for the test you will sit. If you have not chosen yet, try one section of each: the counts and durations differ, and some candidates find one rhythm easier. The comparison page sets the two tests side by side, including the waiting rules between two sittings.' },
    ],
    body: (h) => `
<h2>Listening section</h2>
<p>${C(h).co.q} questions, ${C(h).co.min} minutes, a single play per document. Headphones help, since the voice comes from your browser. Sit the two sections on different days if you can: one hour of reading followed by listening is a long stretch, and a tired second section would understate your level.</p>
<!--tool:quiz|{"bank":"fr-listening","mode":"mock","test":"tcf"}-->
<p>If no French voice is available on your device, the transcript replaces the play button. The section then measures reading, not listening, so keep that result apart.</p>
<h2>The TCF Canada in four tests</h2>
<p>The TCF Canada has four compulsory tests, ${hm(h, 'en')} in total according to the ${h.src('fei_tcf_manual', 'candidate manual')}. The mock covers the first two rows of this table.</p>
${h.table(['Test', 'Content', 'Duration', 'NCLC 7 from'], [
  ['Listening', `${C(h).co.q} questions`, `${C(h).co.min} min`, lo(h, 'L', 7)],
  ['Reading', `${C(h).ce.q} questions`, `${C(h).ce.min} min`, lo(h, 'R', 7)],
  ['Writing', `${C(h).ee.tasks} tasks (${C(h).ee.words.map(([a, b]) => `${a}–${b}`).join(', ')} words)`, `${C(h).ee.min} min`, `${lo(h, 'W', 7)}/20`],
  ['Speaking', `${C(h).eo.tasks} tasks (${half(C(h).eo.t1, 'en')}, ${half(C(h).eo.t2, 'en')} after ${C(h).eo.t2prep} min preparation, ${half(C(h).eo.t3, 'en')})`, `${C(h).eo.min} min`, `${lo(h, 'S', 7)}/20`],
], 'TCF Canada format (manual version J, September 2024) and NCLC 7 thresholds (IRCC chart).', ['l', 'l', 'r', 'r'])}
<p>Writing and speaking are practised with the same task formats on the ${h.a('french-writing', 'writing')} and ${h.a('french-speaking', 'speaking')} pages. They are marked out of 20 rather than on the ${h.num(h.P.tests.tcf.max.R)} scale, and IRCC's chart reads those marks directly: ${lo(h, 'W', 7)} out of 20 is the start of NCLC 7 in both. A candidate who is strong in reading but weak in writing can therefore fail the Federal Skilled Worker minimum of NCLC ${h.P.ee.fsw} on a single task-based test, which is a reason not to leave writing to the last weeks.</p>
<h2>What the mock copies, and what it cannot</h2>
<p>Copied from the manual: the number of questions, the time limit, ${h.P.tcf.choices} options with one right answer, difficulty rising through the section, one play per recording, and no correction before the end. Not copied: the questions themselves, which are ours; studio recordings with real voices; and the calibration that turns right answers into a score between ${h.num(h.P.tcf.cecr[5][1] as number)} and ${h.num(h.P.tests.tcf.max.R)}. Our questions were drawn up by Radif Partners from the descriptors of the Council of Europe's CEFR scale, and each correction names the descriptor it follows.</p>
<h2>From the panel to your next step</h2>
<p>The result panel lists your right answers per CEFR level. On the TCF scale, B1 starts at ${h.num(h.P.tcf.cecr[3][1] as number)} and B2 at ${h.num(h.P.tcf.cecr[2][1] as number)}, and NCLC 7 in reading (${lo(h, 'R', 7)}) falls inside B2. Our suggestion: if B2 questions are where your success rate falls under two thirds, spend the next weeks on B2 documents in the ${h.a('french-reading', 'reading practice')} and ${h.a('french-listening', 'listening practice')}, then take a fresh draw of the mock. Our level indication follows the same two-thirds rule and is only a rough guide, never a TCF result.</p>
<h2>TCF or TEF, and the timing of a sitting</h2>
<p>Both tests are accepted by IRCC for Express Entry and citizenship. Their rules differ on details that matter for planning: the TCF manual sets ${h.P.tcf.retakeDays} days between two sittings, and results within ${h.P.tcf.resultsDaysComputer} working days on computer or ${h.P.tcf.resultsDaysPaper} on paper. The ${h.a('tcf-or-tef', 'TCF or TEF comparison')} goes through the differences, the ${h.a('tcf-canada-score', 'TCF score page')} converts real results to NCLC, and the ${h.src('fei_tcf_canada', 'France Éducation international page')} lists registration and centres. Missed mock questions are kept in this browser for the ${h.a('review', 'review page')}.</p>`,
  },
  fr: {
    slug: 'test-blanc-tcf-canada',
    nav: 'Test blanc TCF Canada',
    card: 'Les sections de compréhension écrite et orale du TCF Canada, chronométrées, du plus facile au plus difficile.',
    title: 'Test blanc TCF Canada : compréhension écrite et orale',
    description: 'Test blanc TCF Canada : compréhension écrite et compréhension orale chronométrées, nombre de questions et durée officiels, quatre choix, correction à la fin.',
    h1: 'Test blanc TCF Canada en deux sections',
    intro: 'La compréhension écrite d’abord, sous ce titre ; la compréhension orale plus bas. Chaque section suit le nombre de questions et la durée du TCF Canada, correction gardée pour la fin.',
    resume: (h) => `Ce test blanc du TCF Canada présente les deux épreuves à choix multiple dans leur cadre officiel : compréhension écrite, ${C(h).ce.q} questions en ${C(h).ce.min} minutes, et compréhension orale, ${C(h).co.q} questions en ${C(h).co.min} minutes, d’après la version J du manuel du candidat de France Éducation international. Comme à l’examen, chaque question propose ${h.P.tcf.choices} choix pour une seule bonne réponse, la difficulté monte au fil de la section et chaque enregistrement ne passe qu’une fois. Le contenu, lui, est le nôtre : des questions écrites par Radif Partners à partir du CECR, ${h.num(h.bankSize.frReading)} en lecture et ${h.num(h.bankSize.frListening)} en écoute, tirées en proportion de chaque niveau du A1 au C2. L’écoute passe par la synthèse vocale du navigateur, pas par des enregistrements de studio. À la fin, ou quand le chrono s’arrête, le panneau donne un score brut, le taux de réussite par niveau et une indication approximative de notre cru. Ce n’est pas un score TCF : le vrai va de ${h.num(h.P.tcf.cecr[5][1] as number)} à ${h.num(h.P.tests.tcf.max.R)} en compréhension et sort de l’étalonnage de France Éducation international. Pour viser juste, le NCLC 7 commence à ${lo(h, 'R', 7)} en lecture et à ${lo(h, 'L', 7)} en écoute dans la grille d’IRCC. L’écrit et l’oral, notés sur 20, ont leurs propres pages.`,
    faqs: (h) => [
      { q: `Pourquoi ${C(h).ce.q} questions au test blanc du TCF et non ${h.P.tef.canada.ce.q} ?`, a: `Parce que c’est le nombre indiqué par le manuel du candidat pour le TCF Canada : ${C(h).ce.q} questions en compréhension écrite et ${C(h).co.q} en compréhension orale. Le TEF Canada en compte ${h.P.tef.canada.ce.q} par épreuve. Le test blanc lit ces chiffres dans le même fichier de données que le reste du site, de sorte que chaque section colle au test choisi.` },
      { q: 'L’écoute du TCF Canada est-elle plus difficile que celle du TEF ?', a: `Son rythme est plus serré : ${C(h).co.q} questions en ${C(h).co.min} minutes, contre ${h.P.tef.canada.co.q} en ${h.P.tef.canada.co.min} minutes au TEF Canada. Le ressenti varie d’un candidat à l’autre. Le calculateur de temps placé sous le résumé montre les secondes disponibles par question dans chaque format.` },
      { q: 'Comment la compréhension écrite du TCF Canada est-elle notée ?', a: `Le manuel décrit un score de ${h.num(h.P.tcf.cecr[5][1] as number)} à ${h.num(h.P.tests.tcf.max.R)} pour les deux compréhensions, rattaché aux niveaux du CECR, et, pour chacune des deux expressions, une note sur 20. IRCC lit ensuite chaque résultat dans sa grille : le NCLC 7 commence à ${lo(h, 'R', 7)} en compréhension écrite et à ${lo(h, 'W', 7)} sur 20 en expression écrite.` },
      { q: 'Test blanc TCF ou test blanc TEF : lequel choisir ?', a: 'Celui du test que vous passerez. Si votre choix n’est pas fait, essayez une section de chacun : le nombre de questions et la durée diffèrent, et certains candidats sont plus à l’aise avec l’un des deux rythmes. La page de comparaison met les deux tests côte à côte, règles d’attente entre deux passations comprises.' },
    ],
    body: (h) => `
<h2>Section de compréhension orale</h2>
<p>${C(h).co.q} questions, ${C(h).co.min} minutes, une seule écoute par document. Un casque aide, puisque la voix vient du navigateur.</p>
<!--tool:quiz|{"bank":"fr-listening","mode":"mock","test":"tcf"}-->
<p>Si l’appareil n’a pas de voix française, la transcription remplace le bouton d’écoute. La section mesure alors la lecture et non l’écoute : gardez ce résultat à part.</p>
<h2>Le TCF Canada en quatre épreuves</h2>
<p>Le TCF Canada comporte quatre épreuves obligatoires, ${hm(h, 'fr')} au total selon le ${h.src('fei_tcf_manual', 'manuel du candidat')}. Le test blanc reprend les deux premières lignes du tableau.</p>
${h.table(['Épreuve', 'Contenu', 'Durée', 'NCLC 7 dès'], [
  ['Compréhension orale', `${C(h).co.q} questions`, `${C(h).co.min} min`, lo(h, 'L', 7)],
  ['Compréhension écrite', `${C(h).ce.q} questions`, `${C(h).ce.min} min`, lo(h, 'R', 7)],
  ['Expression écrite', `${C(h).ee.tasks} tâches (${C(h).ee.words.map(([a, b]) => `${a} à ${b}`).join(', ')} mots)`, `${C(h).ee.min} min`, `${lo(h, 'W', 7)}/20`],
  ['Expression orale', `${C(h).eo.tasks} tâches (${half(C(h).eo.t1, 'fr')}, ${half(C(h).eo.t2, 'fr')} après ${C(h).eo.t2prep} min de préparation, ${half(C(h).eo.t3, 'fr')})`, `${C(h).eo.min} min`, `${lo(h, 'S', 7)}/20`],
], 'Format du TCF Canada (manuel, version J, septembre 2024) et seuils du NCLC 7 (grille d’IRCC).', ['l', 'l', 'r', 'r'])}
<p>L’écrit et l’oral se travaillent avec les mêmes formats de tâches sur les pages d’${h.a('french-writing', 'expression écrite')} et d’${h.a('french-speaking', 'expression orale')}. Ces deux épreuves sont notées sur 20, et la grille d’IRCC lit directement cette note : le NCLC 7 commence à ${lo(h, 'W', 7)} sur 20 dans les deux cas. Un candidat solide en lecture mais fragile à l’écrit peut donc manquer le minimum du NCLC ${h.P.ee.fsw} exigé des travailleurs qualifiés, d’où l’intérêt de ne pas repousser l’écrit aux dernières semaines.</p>
<h2>Ce que le test blanc reprend, et ce qu’il ne peut pas reprendre</h2>
<p>Repris du manuel : le nombre de questions, la durée, ${h.P.tcf.choices} choix pour une bonne réponse, une difficulté qui monte, une seule écoute par document et aucune correction avant la fin. Non repris : les questions elles-mêmes, qui sont les nôtres ; des enregistrements de studio avec de vraies voix ; l’étalonnage qui transforme les bonnes réponses en score entre ${h.num(h.P.tcf.cecr[5][1] as number)} et ${h.num(h.P.tests.tcf.max.R)}. Nos questions ont été construites par Radif Partners à partir des descripteurs de l’échelle du CECR du Conseil de l’Europe, et chaque correction cite le descripteur suivi.</p>
<h2>Du panneau de résultat à l’étape suivante</h2>
<p>Le panneau détaille vos bonnes réponses par niveau du CECR. Sur l’échelle du TCF, le B1 commence à ${h.num(h.P.tcf.cecr[3][1] as number)} et le B2 à ${h.num(h.P.tcf.cecr[2][1] as number)} ; le NCLC 7 en compréhension écrite (${lo(h, 'R', 7)}) tombe dans le B2. Notre suggestion : si vos réponses passent sous les deux tiers au B2, consacrez les semaines suivantes aux documents de ce niveau dans l’entraînement en ${h.a('french-reading', 'compréhension écrite')} et en ${h.a('french-listening', 'compréhension orale')}, puis refaites un tirage du test blanc. Notre indication de niveau suit cette même règle des deux tiers : un repère grossier, jamais un résultat du TCF.</p>
<h2>TCF ou TEF, et le calendrier d’une passation</h2>
<p>IRCC accepte les deux tests pour Entrée express et pour la citoyenneté. Leurs règles diffèrent sur des points utiles au calendrier : le manuel du TCF impose ${h.P.tcf.retakeDays} jours entre deux passations et annonce les résultats sous ${h.P.tcf.resultsDaysComputer} jours ouvrés sur ordinateur, ${h.P.tcf.resultsDaysPaper} sur papier. La page ${h.a('tcf-or-tef', 'TCF ou TEF')} détaille les écarts, celle du ${h.a('tcf-canada-score', 'score TCF Canada')} convertit un vrai résultat en NCLC, et la ${h.src('fei_tcf_canada', 'page de France Éducation international')} recense l’inscription et les centres. Les questions manquées au test blanc restent dans ce navigateur pour la ${h.a('review', 'page de révision')}.</p>`,
  },
});
