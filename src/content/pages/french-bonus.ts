import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

type Sk = 'R' | 'W' | 'L' | 'S';
const lo = (h: Helpers, t: 'tef' | 'tcf' | 'ielts' | 'pte' | 'celpip', s: Sk, lv: number) => h.range(t, s, lv).split('–')[0];

export default definePage({
  id: 'french-bonus',
  group: 'scores',
  order: 28,
  tool: { kind: 'crs', props: { french: true } },
  mini: { kind: 'mini:frbonus' },
  related: ['crs-language', 'clb-7', 'tef-canada-score', 'tcf-canada-score', 'tcf-or-tef', 'celpip'],
  sources: ['ircc_crs', 'ircc_cbs', 'ircc_ee_lang', 'ircc_equiv'],
  en: {
    slug: 'express-entry-french-bonus',
    nav: 'French bonus',
    card: 'The additional CRS points for French and the French-language category: who qualifies and with which scores.',
    title: 'Express Entry French bonus: CRS points and NCLC 7 scores',
    description: 'Express Entry French bonus: who earns the extra CRS points, why English CLB 5 doubles them, the TEF and TCF scores for NCLC 7, and the French-language category.',
    h1: 'The Express Entry French-language bonus, explained with scores',
    intro: 'French at NCLC 7 in every skill earns extra CRS points and access to French-language rounds. Here is the rule, the scores behind it and the role of English.',
    resume: (h) => `In Express Entry, French pays twice. First, the Comprehensive Ranking System adds a bonus in its additional points section to any candidate with NCLC ${h.P.crs.frenchBonus.nclc} or more in all four French skills: ${h.P.crs.frenchBonus.englishLow} points when English is CLB 4 or lower or was not tested, and ${h.P.crs.frenchBonus.englishClb5} points when English reaches CLB 5 or more in all four skills. Second, the same NCLC ${h.P.ee.frenchCategory} in all four skills opens the French-language category, one of ${h.P.ee.categories} categories IRCC lists for category-based rounds of invitations. On the TEF Canada sat since 11 December 2023, NCLC 7 means at least ${lo(h, 'tef', 'R', 7)} in reading, ${lo(h, 'tef', 'W', 7)} in writing, ${lo(h, 'tef', 'L', 7)} in listening and ${lo(h, 'tef', 'S', 7)} in speaking. On the TCF Canada it means ${lo(h, 'tcf', 'R', 7)} in reading, ${lo(h, 'tcf', 'L', 7)} in listening and ${h.P.tests.tcf.W[3][1]} out of 20 in writing and speaking. One French skill at NCLC 6 cancels both the bonus and the category. The English part is modest: CLB 5 is band ${lo(h, 'ielts', 'R', 5)} in IELTS General Training reading and level 5 on CELPIP-General.`,
    faqs: (h) => [
      { q: 'Do I lose the French bonus if French is my second official language?', a: `No. The bonus looks at your French levels and your English levels, not at which one you declared first. A candidate with strong English as first language and NCLC ${h.P.crs.frenchBonus.nclc} in all four French skills receives ${h.P.crs.frenchBonus.englishClb5} points, since English is then well above CLB 5. French also earns second-language points on top.` },
      { q: 'Is it worth taking an English test just for the bonus?', a: `It can be. Moving English from no test to CLB 5 in all four skills lifts the bonus from ${h.P.crs.frenchBonus.englishLow} to ${h.P.crs.frenchBonus.englishClb5} points, and English as a second language adds ${h.P.crs.second.perAbility[5]} point per skill at CLB 5 or 6. That is ${h.P.crs.frenchBonus.englishClb5 - h.P.crs.frenchBonus.englishLow + 4 * h.P.crs.second.perAbility[5]} points for a candidate who reaches CLB 5 everywhere. Weigh it against the fee and the preparation time.` },
      { q: 'Does the French-language category ask for more than NCLC 7?', a: `On the language side, IRCC's Express Entry page sets NCLC ${h.P.ee.frenchCategory} in all four skills for that category. You must also be eligible for Express Entry and receive an invitation in a round aimed at that category. This site does not list draw cut-offs or round dates, which change from one round to the next.` },
    ],
    body: (h) => `
<h2>The rule in one table</h2>
${h.table(['French, all four skills', 'English', 'Bonus'], [
  [`NCLC ${h.P.crs.frenchBonus.nclc} or more`, 'No test, or CLB 4 or lower', h.P.crs.frenchBonus.englishLow],
  [`NCLC ${h.P.crs.frenchBonus.nclc} or more`, 'CLB 5 or more in all four', h.P.crs.frenchBonus.englishClb5],
  [`At least one skill under NCLC ${h.P.crs.frenchBonus.nclc}`, 'Any', 0],
], 'Additional CRS points for French-language ability (IRCC CRS criteria).', ['l', 'l', 'r'])}
<p>The weakest of the four French skills decides. A candidate with three NCLC 9 and one NCLC 6 gets no bonus at all, while a candidate at NCLC 7 everywhere gets it in full. The calculator above takes your eight levels, French and English, and shows the bonus with the rest of your language points.</p>
<h2>The French scores to reach</h2>
<p>NCLC 7 per skill on each French test, from the ${h.src('ircc_equiv', 'IRCC equivalency charts')}:</p>
${h.table(['Skill', 'TEF Canada (since 11 Dec. 2023)', 'TCF Canada'], [
  ['Reading', lo(h, 'tef', 'R', 7), lo(h, 'tcf', 'R', 7)],
  ['Writing', lo(h, 'tef', 'W', 7), `${h.P.tests.tcf.W[3][1]} / 20`],
  ['Listening', lo(h, 'tef', 'L', 7), lo(h, 'tcf', 'L', 7)],
  ['Speaking', lo(h, 'tef', 'S', 7), `${h.P.tests.tcf.S[3][1]} / 20`],
], 'Lowest score for NCLC 7 per skill.', ['l', 'r', 'r'])}
<p>On the TEF Canada, speaking is the skill most likely to hold the bonus back: its NCLC 7 floor is the highest of the four. If your TEF Canada report predates 11 December 2023, the ${h.a('tef-canada-score', 'TEF Canada score page')} gives the older charts.</p>
<h2>The English half of the rule</h2>
<p>To get the higher amount, English must be CLB 5 or more in reading, writing, listening and speaking. In IELTS General Training that is ${lo(h, 'ielts', 'R', 5)} in reading and ${lo(h, 'ielts', 'W', 5)} in the other three skills; in PTE Core, ${lo(h, 'pte', 'R', 5)} in reading, ${lo(h, 'pte', 'W', 5)} in writing, ${lo(h, 'pte', 'L', 5)} in listening and ${lo(h, 'pte', 'S', 5)} in speaking; in CELPIP-General, level 5 in each skill. The ${h.a('celpip', 'CELPIP page')} explains how IRCC reads that test.</p>
<h2>The French-language category</h2>
<p>Since IRCC introduced category-based selection, some rounds invite only candidates who meet a category's conditions. The ${h.src('ircc_cbs', 'category-based selection page')} lists ${h.P.ee.categories} categories; the French-language one asks NCLC ${h.P.ee.frenchCategory} in all four French skills, the same threshold as the bonus. The two work together: the bonus raises your score in every round, and the category gives you access to rounds where only French speakers compete. Cut-off scores and round dates change often and are not tracked on this site.</p>
<h2>Keeping the bonus until the end</h2>
<p>The bonus only counts while the French result is valid. IRCC wants test results under ${h.P.ee.validityYears} years old when you create the profile and again when you submit the permanent residence application, and both the TEF Canada and the TCF Canada reports are valid for ${h.P.tef.validityYears} years. If your report will expire before you can apply, plan a new sitting early enough to keep NCLC ${h.P.crs.frenchBonus.nclc} in all four skills.</p>
<h2>A worked example</h2>
<p>A single candidate with French as first official language at NCLC 8 in all four skills earns ${h.num(4 * h.P.crs.first.single[8])} first-language points. Without any English test, the bonus adds ${h.P.crs.frenchBonus.englishLow}. With English at CLB 5 in all four, the bonus becomes ${h.P.crs.frenchBonus.englishClb5} and English adds ${h.num(4 * h.P.crs.second.perAbility[5])} second-language points: ${h.num(h.P.crs.frenchBonus.englishClb5 + 4 * h.P.crs.second.perAbility[5] - h.P.crs.frenchBonus.englishLow)} more in total. The ${h.a('crs-language', 'language points page')} gives the full scale, and the ${h.a('clb-7', 'NCLC 7 page')} shows the score to aim for on every test.</p>`,
  },
  fr: {
    slug: 'entree-express-bonus-francophone',
    nav: 'Bonus francophone',
    card: 'Les points supplémentaires pour le français et la catégorie « français » d’Entrée express : conditions et scores.',
    title: 'Bonus francophone Entrée express : points SCG et NCLC 7',
    description: 'Bonus francophone d’Entrée express : qui a les points du SCG, pourquoi le CLB 5 en anglais les double, les scores TEF et TCF du NCLC 7, catégorie français.',
    h1: 'Le bonus francophone d’Entrée express, scores à l’appui',
    intro: 'Un français au NCLC 7 dans chaque épreuve rapporte des points en plus et l’accès aux rondes réservées aux francophones. Voici la règle, les scores et le rôle de l’anglais.',
    resume: (h) => `Dans Entrée express, le français rapporte deux fois. D’abord, le Système de classement global ajoute, dans ses points supplémentaires, un bonus à tout candidat qui a le NCLC ${h.P.crs.frenchBonus.nclc} ou plus aux quatre épreuves de français : ${h.P.crs.frenchBonus.englishLow} points si l’anglais est au CLB 4 ou moins, ou n’a pas été testé, et ${h.P.crs.frenchBonus.englishClb5} points si l’anglais atteint le CLB 5 ou plus dans les quatre compétences. Ensuite, ce même NCLC ${h.P.ee.frenchCategory} aux quatre épreuves ouvre la catégorie « français », l’une des ${h.P.ee.categories} catégories qu’IRCC énumère pour les rondes d’invitations ciblées. Au TEF Canada passé depuis le 11 décembre 2023, le NCLC 7 demande au moins ${lo(h, 'tef', 'R', 7)} en compréhension écrite, ${lo(h, 'tef', 'W', 7)} en expression écrite, ${lo(h, 'tef', 'L', 7)} en compréhension orale et ${lo(h, 'tef', 'S', 7)} en expression orale. Au TCF Canada, ${lo(h, 'tcf', 'R', 7)} en compréhension écrite, ${lo(h, 'tcf', 'L', 7)} en compréhension orale et ${h.P.tests.tcf.W[3][1]} sur 20 dans chaque expression. Une seule épreuve au NCLC 6 fait perdre le bonus et la catégorie. Côté anglais, l’exigence reste modeste : le CLB 5, c’est ${lo(h, 'ielts', 'R', 5)} en lecture à l’IELTS General Training ou le niveau 5 au CELPIP-General.`,
    faqs: (h) => [
      { q: 'Perd-on le bonus francophone si le français est la seconde langue officielle ?', a: `Non. Le bonus regarde vos niveaux en français et en anglais, pas l’ordre dans lequel vous les déclarez. Un candidat dont l’anglais, très solide, est la première langue et qui a le NCLC ${h.P.crs.frenchBonus.nclc} aux quatre épreuves de français reçoit ${h.P.crs.frenchBonus.englishClb5} points, puisque son anglais dépasse largement le CLB 5. Le français lui rapporte en plus des points de seconde langue.` },
      { q: 'Vaut-il la peine de passer un test d’anglais pour le bonus ?', a: `Souvent, oui. Passer de l’absence de test au CLB 5 dans les quatre compétences fait monter le bonus de ${h.P.crs.frenchBonus.englishLow} à ${h.P.crs.frenchBonus.englishClb5} points, et l’anglais en seconde langue ajoute ${h.P.crs.second.perAbility[5]} point par compétence au CLB 5 ou 6. Soit ${h.P.crs.frenchBonus.englishClb5 - h.P.crs.frenchBonus.englishLow + 4 * h.P.crs.second.perAbility[5]} points pour qui atteint le CLB 5 partout. À mettre en balance avec le prix du test et le temps de préparation.` },
      { q: 'La catégorie « français » exige-t-elle plus que le NCLC 7 ?', a: `Côté langue, la page d’IRCC sur Entrée express fixe le NCLC ${h.P.ee.frenchCategory} aux quatre épreuves pour cette catégorie. Il faut aussi être admissible à Entrée express et recevoir une invitation lors d’une ronde visant cette catégorie. Ce site ne suit ni les seuils des rondes ni leurs dates, qui changent d’une ronde à l’autre.` },
    ],
    body: (h) => `
<h2>La règle en un tableau</h2>
${h.table(['Français, quatre épreuves', 'Anglais', 'Bonus'], [
  [`NCLC ${h.P.crs.frenchBonus.nclc} ou plus`, 'Pas de test, ou CLB 4 ou moins', h.P.crs.frenchBonus.englishLow],
  [`NCLC ${h.P.crs.frenchBonus.nclc} ou plus`, 'CLB 5 ou plus aux quatre compétences', h.P.crs.frenchBonus.englishClb5],
  [`Au moins une épreuve sous le NCLC ${h.P.crs.frenchBonus.nclc}`, 'Peu importe', 0],
], 'Points supplémentaires du SCG pour la maîtrise du français (critères d’IRCC).', ['l', 'l', 'r'])}
<p>C’est l’épreuve de français la plus faible qui décide. Trois NCLC 9 et un NCLC 6 ne donnent aucun bonus ; un NCLC 7 partout le donne en entier. Le calculateur ci-dessus prend vos huit niveaux, français et anglais, et affiche le bonus avec le reste de vos points de langue.</p>
<h2>Les scores de français à atteindre</h2>
<p>Le NCLC 7 par épreuve dans chaque test de français, d’après les ${h.src('ircc_equiv', 'grilles d’équivalence d’IRCC')} :</p>
${h.table(['Épreuve', 'TEF Canada (depuis le 11 déc. 2023)', 'TCF Canada'], [
  ['Compréhension écrite', lo(h, 'tef', 'R', 7), lo(h, 'tcf', 'R', 7)],
  ['Expression écrite', lo(h, 'tef', 'W', 7), `${h.P.tests.tcf.W[3][1]} / 20`],
  ['Compréhension orale', lo(h, 'tef', 'L', 7), lo(h, 'tcf', 'L', 7)],
  ['Expression orale', lo(h, 'tef', 'S', 7), `${h.P.tests.tcf.S[3][1]} / 20`],
], 'Score minimum pour le NCLC 7, par épreuve.', ['l', 'r', 'r'])}
<p>Au TEF Canada, l’expression orale est l’épreuve qui menace le plus le bonus : son plancher pour le NCLC 7 est le plus élevé des quatre. Si votre attestation est antérieure au 11 décembre 2023, la page du ${h.a('tef-canada-score', 'score TEF Canada')} reprend les anciennes grilles.</p>
<h2>La moitié anglaise de la règle</h2>
<p>Pour le montant le plus haut, l’anglais doit atteindre le CLB 5 en lecture, écriture, écoute et oral. À l’IELTS General Training, c’est ${lo(h, 'ielts', 'R', 5)} en lecture et ${lo(h, 'ielts', 'W', 5)} dans les trois autres compétences ; au PTE Core, ${lo(h, 'pte', 'R', 5)} en lecture, ${lo(h, 'pte', 'W', 5)} à l’écrit, ${lo(h, 'pte', 'L', 5)} à l’écoute et ${lo(h, 'pte', 'S', 5)} à l’oral ; au CELPIP-General, le niveau 5 partout. La page ${h.a('celpip', 'CELPIP')} explique comment IRCC lit ce test.</p>
<h2>La catégorie « français »</h2>
<p>Depuis l’instauration de la sélection par catégorie, certaines rondes n’invitent que les candidats qui remplissent les conditions d’une catégorie. La ${h.src('ircc_cbs', 'page d’IRCC sur la sélection par catégorie')} en énumère ${h.P.ee.categories} ; celle du français exige le NCLC ${h.P.ee.frenchCategory} aux quatre épreuves, le même seuil que le bonus. Les deux se complètent : le bonus relève votre score dans toutes les rondes, la catégorie donne accès à des rondes où seuls les francophones sont en concurrence. Les seuils et les dates des rondes varient souvent ; ce site ne les suit pas.</p>
<h2>Garder le bonus jusqu’au bout</h2>
<p>Le bonus ne compte que tant que le résultat de français est valide. IRCC exige des résultats de moins de ${h.P.ee.validityYears} ans à la création du profil, puis au dépôt de la demande de résidence permanente, et les attestations du TEF Canada comme du TCF Canada valent ${h.P.tef.validityYears} ans. Si la vôtre expire avant la demande, prévoyez assez tôt une nouvelle passation qui conserve le NCLC ${h.P.crs.frenchBonus.nclc} aux quatre épreuves.</p>
<h2>Un exemple chiffré</h2>
<p>Un candidat seul, français en première langue officielle, au NCLC 8 dans les quatre épreuves, obtient ${h.num(4 * h.P.crs.first.single[8])} points de première langue. Sans test d’anglais, le bonus ajoute ${h.P.crs.frenchBonus.englishLow} points. Avec un anglais au CLB 5 partout, le bonus passe à ${h.P.crs.frenchBonus.englishClb5} et l’anglais rapporte ${h.num(4 * h.P.crs.second.perAbility[5])} points de seconde langue : ${h.num(h.P.crs.frenchBonus.englishClb5 + 4 * h.P.crs.second.perAbility[5] - h.P.crs.frenchBonus.englishLow)} points de plus au total. La page des ${h.a('crs-language', 'points de langue')} donne le barème complet, et celle du ${h.a('clb-7', 'NCLC 7')} le score à viser dans chaque test.</p>`,
  },
});
