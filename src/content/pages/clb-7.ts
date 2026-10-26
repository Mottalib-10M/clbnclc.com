import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

type T = 'tef' | 'tefOld' | 'tcf' | 'celpip' | 'ielts' | 'pte';
const SK = ['R', 'W', 'L', 'S'] as const;
const lo = (h: Helpers, t: T, s: (typeof SK)[number]) => h.range(t, s, 7).split('–')[0];
const row = (h: Helpers, name: string, t: T) => [name, ...SK.map((s) => lo(h, t, s))];

export default definePage({
  id: 'clb-7',
  group: 'scores',
  order: 24,
  tool: { kind: 'target', props: { level: 7 } },
  mini: { kind: 'mini:clbgap' },
  related: ['tef-canada-score', 'tcf-canada-score', 'crs-language', 'french-bonus', 'which-level', 'celpip-vs-ielts'],
  sources: ['ircc_equiv', 'ircc_ee_lang', 'ircc_crs', 'ircc_cbs', 'cci_tef_nclc'],
  en: {
    slug: 'clb-7',
    nav: 'CLB 7 / NCLC 7',
    card: 'The score that gives CLB 7 or NCLC 7 on each of the five accepted tests, and the doors that level opens.',
    title: 'CLB 7 score on every test: TEF, TCF, CELPIP, IELTS, PTE',
    description: 'CLB 7 and NCLC 7 on each test IRCC accepts: the minimum score per skill for TEF Canada, TCF Canada, CELPIP, IELTS and PTE Core, and why this level matters most.',
    h1: 'CLB 7 and NCLC 7: the score to reach on each test',
    intro: 'CLB 7 in English and NCLC 7 in French are the same benchmark. Pick a test below to see the score it takes in each skill, then what the level unlocks.',
    resume: (h) => `CLB 7 (NCLC 7 in French) is the level that opens the most doors in Express Entry. On the TEF Canada sat since 11 December 2023 it starts at ${lo(h, 'tef', 'R')} in reading, ${lo(h, 'tef', 'W')} in writing, ${lo(h, 'tef', 'L')} in listening and ${lo(h, 'tef', 'S')} in speaking. On the TCF Canada it starts at ${lo(h, 'tcf', 'R')} in reading, ${lo(h, 'tcf', 'L')} in listening and ${lo(h, 'tcf', 'W')} out of 20 in both expression tests. In English it is level 7 on CELPIP-General, band ${lo(h, 'ielts', 'R')} in every IELTS General Training skill, and ${lo(h, 'pte', 'R')} to ${lo(h, 'pte', 'W')} on PTE Core depending on the skill. Reaching it in all four skills meets the Federal Skilled Worker minimum, the Canadian Experience Class minimum for TEER 0 and 1 jobs and, in French, the French-language category and the French bonus of ${h.P.crs.frenchBonus.englishLow} or ${h.P.crs.frenchBonus.englishClb5} points. It also lifts first-language points from ${h.P.crs.first.single[6]} to ${h.P.crs.first.single[7]} per skill for a single candidate, one of the two steepest steps on the scale, and opens transferability points.`,
    faqs: (h) => [
      { q: 'Is CLB 7 the same as NCLC 7?', a: 'Yes. The Canadian Language Benchmarks (CLB) describe English ability and the Niveaux de compétence linguistique canadiens (NCLC) describe French ability on parallel scales. IRCC uses CLB for English tests and NCLC for French tests, and its program minimums apply to both in the same way.' },
      { q: 'I have CLB 7 in three skills and CLB 6 in one: am I eligible?', a: `Not for the Federal Skilled Worker program, which needs CLB ${h.P.ee.fsw} in each of the four skills, nor for the French-language category, which needs NCLC ${h.P.ee.frenchCategory} in each of the four. The Canadian Experience Class for TEER 2 or 3 jobs only needs CLB ${h.P.ee.cecTeer23}, so that route may still be open. The weakest skill is what counts.` },
      { q: 'How many CRS points does going from CLB 6 to CLB 7 add?', a: `For a single candidate in the first official language, ${h.P.crs.first.single[7] - h.P.crs.first.single[6]} points per skill, so ${h.num(4 * (h.P.crs.first.single[7] - h.P.crs.first.single[6]))} if all four skills move up. With an accompanying spouse it is ${h.P.crs.first.withSpouse[7] - h.P.crs.first.withSpouse[6]} per skill. Transferability points with education or foreign work experience can come on top, as the language points page explains.` },
      { q: 'Which TEF Canada column should show NCLC 7 on an old report?', a: `For a test taken from 1 October 2019 to 10 December 2023, NCLC 7 is ${h.num(h.P.tests.tef2019.all[3][1])} in any skill. In the "équivalence ancien score" column that IRCC asks you to enter in the profile, NCLC 7 starts at ${lo(h, 'tefOld', 'R')} in reading, ${lo(h, 'tefOld', 'W')} in writing, ${lo(h, 'tefOld', 'L')} in listening and ${lo(h, 'tefOld', 'S')} in speaking.` },
    ],
    body: (h) => `
<h2>The CLB 7 score on each accepted test</h2>
<p>Lowest score that gives CLB or NCLC 7, per skill, from the ${h.src('ircc_equiv', 'IRCC equivalency charts')} and, for the TEF Canada, the ${h.src('cci_tef_nclc', 'CCI correspondence table')}:</p>
${h.table(['Test', 'Reading', 'Writing', 'Listening', 'Speaking'], [
  row(h, 'TEF Canada (since 11 Dec. 2023, 0–699)', 'tef'),
  row(h, 'TEF Canada, old-score column', 'tefOld'),
  row(h, 'TCF Canada (699 / 20)', 'tcf'),
  row(h, 'CELPIP-General', 'celpip'),
  row(h, 'IELTS General Training', 'ielts'),
  row(h, 'PTE Core', 'pte'),
], 'Minimum result for CLB / NCLC 7 per skill.', ['l', 'r', 'r', 'r', 'r'])}
<p>On the TEF Canada, writing is the cheapest skill for NCLC 7 (${lo(h, 'tef', 'W')}) and speaking the most demanding (${lo(h, 'tef', 'S')}). On PTE Core it is the other way round in a sense: writing asks ${lo(h, 'pte', 'W')}, the highest of the four. The tool above lets you change the level and compare the same tests at CLB 8 or 9.</p>
<h2>Why CLB 7 is the line that matters</h2>
<p>Several rules on IRCC's ${h.src('ircc_ee_lang', 'Express Entry language page')} meet at this level:</p>
<p><strong>Federal Skilled Worker program.</strong> CLB ${h.P.ee.fsw} in all four skills is the entry ticket. Below it, the program is closed whatever your other points.</p>
<p><strong>Canadian Experience Class.</strong> A TEER 0 or 1 job needs CLB ${h.P.ee.cecTeer01}; TEER 2 or 3 needs CLB ${h.P.ee.cecTeer23}.</p>
<p><strong>French-language category.</strong> Category-based rounds for French speakers, one of ${h.P.ee.categories} categories IRCC lists on its ${h.src('ircc_cbs', 'category-based selection page')}, require NCLC ${h.P.ee.frenchCategory} in all four French skills.</p>
<p><strong>French bonus.</strong> NCLC ${h.P.crs.frenchBonus.nclc} in all four French skills adds ${h.P.crs.frenchBonus.englishLow} points, or ${h.P.crs.frenchBonus.englishClb5} with English at CLB 5 or more. Details on the ${h.a('french-bonus', 'French bonus page')}.</p>
<h2>What the step from 6 to 7 is worth</h2>
<p>In the ${h.src('ircc_crs', 'Comprehensive Ranking System')}, first-language points per skill go ${h.P.crs.first.single[5]}, ${h.P.crs.first.single[6]}, ${h.P.crs.first.single[7]}, ${h.P.crs.first.single[8]}, ${h.P.crs.first.single[9]} from CLB 5 to CLB 9 for a single candidate. The step from 6 to 7 adds ${h.P.crs.first.single[7] - h.P.crs.first.single[6]} points per skill, as much as the step from 8 to 9 and far more than the ${h.P.crs.first.single[6] - h.P.crs.first.single[5]} added between 5 and 6. CLB 7 in all four skills also starts the transferability points: with a post-secondary credential of at least one year, for example, ${h.P.crs.transfer.education.oneYear[0]} points while one skill is under CLB 9, ${h.P.crs.transfer.education.oneYear[1]} once all four reach CLB 9. The mini-tool beside this text shows the gain between any two levels.</p>
<h2>Getting there from a lower level</h2>
<p>Look at the gap skill by skill, not on average. A TEF Canada candidate at ${h.num(h.P.tests.tef2023.S[6][1])} in speaking (NCLC 6) needs ${h.num(h.P.tests.tef2023.S[5][1] - h.P.tests.tef2023.S[6][1])} more points to reach the NCLC 7 floor of ${lo(h, 'tef', 'S')}; the same candidate may already be above NCLC 7 in writing. Spend your preparation on the skill that is below the line. The ${h.a('which-level', 'level by program page')} confirms which programs need CLB 7, and the score pages for the ${h.a('tef-canada-score', 'TEF Canada')} and the ${h.a('tcf-canada-score', 'TCF Canada')} show every band.</p>`,
  },
  fr: {
    slug: 'nclc-7',
    nav: 'NCLC 7 / CLB 7',
    card: 'Le score qui donne le NCLC 7 ou le CLB 7 dans chacun des cinq tests acceptés, et les portes que ce niveau ouvre.',
    title: 'NCLC 7 : le score à viser au TEF, au TCF et en anglais',
    description: 'NCLC 7 et CLB 7 dans chaque test accepté par IRCC : le score minimum par épreuve au TEF Canada, au TCF Canada, au CELPIP, à l’IELTS, au PTE Core, et ses enjeux.',
    h1: 'NCLC 7 et CLB 7 : le score à atteindre dans chaque test',
    intro: 'Le NCLC 7 en français et le CLB 7 en anglais désignent le même palier. Voici le score qu’il faut dans chaque test, épreuve par épreuve, puis ce que ce niveau débloque.',
    resume: (h) => `Le NCLC 7 (CLB 7 en anglais) est le niveau qui ouvre le plus de portes dans Entrée express. Au TEF Canada passé depuis le 11 décembre 2023, il commence à ${lo(h, 'tef', 'R')} en compréhension écrite, ${lo(h, 'tef', 'W')} en expression écrite, ${lo(h, 'tef', 'L')} en compréhension orale et ${lo(h, 'tef', 'S')} en expression orale. Au TCF Canada, il faut ${lo(h, 'tcf', 'R')} en compréhension écrite, ${lo(h, 'tcf', 'L')} en compréhension orale et ${lo(h, 'tcf', 'W')} sur 20 dans chaque expression. En anglais, c’est le niveau 7 au CELPIP-General, la bande ${lo(h, 'ielts', 'R')} partout à l’IELTS General Training, et de ${lo(h, 'pte', 'R')} à ${lo(h, 'pte', 'W')} au PTE Core selon la compétence. Atteint aux quatre épreuves, il remplit le minimum des travailleurs qualifiés (fédéral), celui de l’expérience canadienne pour les emplois FEER 0 et 1, et, en français, ouvre la catégorie « français » ainsi que le bonus francophone de ${h.P.crs.frenchBonus.englishLow} ou ${h.P.crs.frenchBonus.englishClb5} points. Il fait aussi passer les points de première langue de ${h.P.crs.first.single[6]} à ${h.P.crs.first.single[7]} par épreuve pour un candidat seul, l’une des deux plus hautes marches du barème, et déclenche les points de transférabilité.`,
    faqs: (h) => [
      { q: 'Le NCLC 7 et le CLB 7, est-ce la même chose ?', a: 'Oui. Les Niveaux de compétence linguistique canadiens (NCLC) décrivent la maîtrise du français, les Canadian Language Benchmarks (CLB) celle de l’anglais, sur des échelles parallèles. IRCC emploie les NCLC pour les tests de français et les CLB pour ceux d’anglais ; les minimums des programmes s’appliquent de la même façon aux deux.' },
      { q: 'J’ai le NCLC 7 dans trois épreuves et le NCLC 6 dans une : suis-je admissible ?', a: `Pas au programme des travailleurs qualifiés (fédéral), qui exige le NCLC ${h.P.ee.fsw} dans chacune des quatre épreuves, ni à la catégorie « français », qui exige le NCLC ${h.P.ee.frenchCategory} aux quatre. La catégorie de l’expérience canadienne pour un emploi FEER 2 ou 3 ne demande que le NCLC ${h.P.ee.cecTeer23} : cette voie peut rester ouverte. C’est l’épreuve la plus faible qui tranche.` },
      { q: 'Combien de points rapporte le passage du NCLC 6 au NCLC 7 ?', a: `Pour un candidat seul, en première langue officielle, ${h.P.crs.first.single[7] - h.P.crs.first.single[6]} points par épreuve, soit ${h.num(4 * (h.P.crs.first.single[7] - h.P.crs.first.single[6]))} si les quatre progressent. Avec un époux qui accompagne, ${h.P.crs.first.withSpouse[7] - h.P.crs.first.withSpouse[6]} par épreuve. Les points de transférabilité liés aux études ou à l’expérience à l’étranger peuvent s’y ajouter, comme l’explique la page des points de langue.` },
      { q: 'Quelle colonne d’une ancienne attestation TEF montre le NCLC 7 ?', a: `Pour un test passé entre le 1er octobre 2019 et le 10 décembre 2023, le NCLC 7 correspond à ${h.num(h.P.tests.tef2019.all[3][1])} dans n’importe quelle épreuve. Dans la colonne « équivalence ancien score », celle qu’IRCC demande de saisir dans le profil, il commence à ${lo(h, 'tefOld', 'R')} en compréhension écrite, ${lo(h, 'tefOld', 'W')} en expression écrite, ${lo(h, 'tefOld', 'L')} en compréhension orale et ${lo(h, 'tefOld', 'S')} en expression orale.` },
    ],
    body: (h) => `
<h2>Le score du NCLC 7 dans chaque test accepté</h2>
<p>Résultat minimum donnant le NCLC ou CLB 7, par épreuve, d’après les ${h.src('ircc_equiv', 'grilles d’équivalence d’IRCC')} et, pour le TEF Canada, le ${h.src('cci_tef_nclc', 'tableau de correspondance de la CCI')} :</p>
${h.table(['Test', 'Compréhension écrite', 'Expression écrite', 'Compréhension orale', 'Expression orale'], [
  row(h, 'TEF Canada (depuis le 11 déc. 2023, 0 à 699)', 'tef'),
  row(h, 'TEF Canada, colonne ancien score', 'tefOld'),
  row(h, 'TCF Canada (699 / 20)', 'tcf'),
  row(h, 'CELPIP-General', 'celpip'),
  row(h, 'IELTS General Training', 'ielts'),
  row(h, 'PTE Core', 'pte'),
], 'Résultat minimum pour le NCLC / CLB 7, par épreuve.', ['l', 'r', 'r', 'r', 'r'])}
<p>Au TEF Canada, l’expression écrite est l’épreuve la moins chère pour le NCLC 7 (${lo(h, 'tef', 'W')}) et l’expression orale la plus exigeante (${lo(h, 'tef', 'S')}). Au PTE Core, c’est l’écrit qui demande le plus : ${lo(h, 'pte', 'W')}. L’outil en haut de page permet de changer de niveau et de comparer les mêmes tests au NCLC 8 ou 9.</p>
<h2>Pourquoi le NCLC 7 est le seuil décisif</h2>
<p>Plusieurs règles de la ${h.src('ircc_ee_lang', 'page d’IRCC sur les exigences linguistiques')} se rejoignent à ce niveau :</p>
<p><strong>Travailleurs qualifiés (fédéral).</strong> Le NCLC ${h.P.ee.fsw} aux quatre épreuves est le ticket d’entrée. En dessous, le programme reste fermé, quels que soient vos autres atouts.</p>
<p><strong>Expérience canadienne.</strong> Un emploi FEER 0 ou 1 demande le NCLC ${h.P.ee.cecTeer01} ; un emploi FEER 2 ou 3, le NCLC ${h.P.ee.cecTeer23}.</p>
<p><strong>Catégorie « français ».</strong> Les rondes d’invitations réservées aux francophones, l’une des ${h.P.ee.categories} catégories énumérées sur la ${h.src('ircc_cbs', 'page d’IRCC sur la sélection par catégorie')}, exigent le NCLC ${h.P.ee.frenchCategory} aux quatre épreuves de français.</p>
<p><strong>Bonus francophone.</strong> Le NCLC ${h.P.crs.frenchBonus.nclc} aux quatre épreuves de français ajoute ${h.P.crs.frenchBonus.englishLow} points, ou ${h.P.crs.frenchBonus.englishClb5} avec un anglais au CLB 5 ou plus. Détails sur la page du ${h.a('french-bonus', 'bonus francophone')}.</p>
<h2>Ce que vaut la marche du 6 au 7</h2>
<p>Dans le ${h.src('ircc_crs', 'Système de classement global')}, les points de première langue par épreuve s’échelonnent ainsi pour un candidat seul, du NCLC 5 au NCLC 9 : ${h.P.crs.first.single[5]}, ${h.P.crs.first.single[6]}, ${h.P.crs.first.single[7]}, ${h.P.crs.first.single[8]}, ${h.P.crs.first.single[9]}. Passer de 6 à 7 rapporte ${h.P.crs.first.single[7] - h.P.crs.first.single[6]} points par épreuve, autant que de 8 à 9, contre ${h.P.crs.first.single[6] - h.P.crs.first.single[5]} seulement de 5 à 6. Le NCLC 7 aux quatre épreuves déclenche aussi les points de transférabilité : avec un diplôme postsecondaire d’au moins un an, par exemple, ${h.P.crs.transfer.education.oneYear[0]} points tant qu’une épreuve reste sous le NCLC 9, ${h.P.crs.transfer.education.oneYear[1]} quand les quatre l’atteignent. Le mini-calculateur voisin chiffre l’écart entre deux niveaux.</p>
<h2>Y arriver depuis un niveau inférieur</h2>
<p>Mesurez l’écart épreuve par épreuve, pas en moyenne. Un candidat au TEF Canada à ${h.num(h.P.tests.tef2023.S[6][1])} en expression orale (NCLC 6) doit gagner ${h.num(h.P.tests.tef2023.S[5][1] - h.P.tests.tef2023.S[6][1])} points pour atteindre le plancher du NCLC 7, ${lo(h, 'tef', 'S')} ; le même candidat peut déjà dépasser le NCLC 7 à l’écrit. Concentrez la préparation sur l’épreuve sous la barre. La page ${h.a('which-level', 'quel niveau NCLC')} confirme quels programmes exigent le NCLC 7, et les pages du score ${h.a('tef-canada-score', 'TEF Canada')} et du score ${h.a('tcf-canada-score', 'TCF Canada')} montrent toutes les bandes.</p>`,
  },
});
