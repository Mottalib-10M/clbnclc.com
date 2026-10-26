import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

type Sk = 'R' | 'W' | 'L' | 'S';
const lo = (h: Helpers, t: 'tef' | 'tcf', s: Sk, lv: number) => h.range(t, s, lv).split('–')[0];

export default definePage({
  id: 'which-level',
  group: 'scores',
  order: 30,
  tool: { kind: 'level', props: { program: 'fsw' } },
  mini: { kind: 'mini:clbgap' },
  related: ['clb-7', 'citizenship-language', 'french-bonus', 'residence-card-level', 'naturalisation-b2', 'crs-language'],
  sources: ['ircc_ee_lang', 'ircc_cbs', 'ircc_cit_lang', 'sp_pluri', 'sp_resident', 'sp_naturalisation'],
  en: {
    slug: 'which-clb-level',
    nav: 'Which level do I need?',
    card: 'The minimum CLB or NCLC for each Express Entry program, citizenship, and the CEFR level for France.',
    title: 'CLB level needed by program: Express Entry, citizenship',
    description: 'CLB and NCLC level needed for each Express Entry program, the French category and citizenship, plus the CEFR level France asks for residence and naturalisation.',
    h1: 'Which CLB or NCLC level does your program need?',
    intro: 'Pick what the test is for: the tool shows the minimum level in each skill and the lowest score that reaches it on every accepted test.',
    resume: (h) => `The level you need depends on what the test is for, and each skill is checked on its own. For Express Entry, the Federal Skilled Worker program needs CLB or NCLC ${h.P.ee.fsw} in reading, writing, listening and speaking. The Canadian Experience Class needs ${h.P.ee.cecTeer01} in each skill for a TEER 0 or 1 job and ${h.P.ee.cecTeer23} for a TEER 2 or 3 job. The Federal Skilled Trades program needs ${h.P.ee.fst.S} in speaking and listening and ${h.P.ee.fst.R} in reading and writing. The French-language category asks NCLC ${h.P.ee.frenchCategory} in all four French skills, and a second official language starts earning points at level ${h.P.ee.fswSecondMin}. For Canadian citizenship, applicants aged ${h.P.citizenship.ages[0]} to ${h.P.citizenship.ages[1]} need CLB or NCLC ${h.P.citizenship.clb} in listening and speaking only. Provincial nominee programs set their own levels, which vary by province and stream and are not listed here. For France, since 1 January 2026, a first multi-year card asks ${h.P.france.pluri}, a first resident card ${h.P.france.resident} and naturalisation ${h.P.france.naturalisation} on the European scale.`,
    faqs: (h) => [
      { q: 'Does the Canadian Experience Class always need CLB 7?', a: `No. It depends on the job your Canadian experience was in. For a TEER 0 or 1 occupation the minimum is CLB ${h.P.ee.cecTeer01} in every skill; for TEER 2 or 3 it drops to CLB ${h.P.ee.cecTeer23}. Your CRS score still rises with every level above the minimum, so meeting the floor is rarely the whole goal.` },
      { q: 'Why does the skilled trades program ask different levels per skill?', a: `IRCC set the Federal Skilled Trades minimum at CLB ${h.P.ee.fst.S} for speaking and listening and CLB ${h.P.ee.fst.R} for reading and writing. It is the only federal economic program on this list where the oral skills and the written skills have different floors, which makes it reachable with a modest writing score.` },
      { q: 'What level do provincial nominee programs ask?', a: 'Each province sets its own language requirement, and it can differ between the streams of the same province. This site does not list those figures because we only publish levels we could check on an official page. Look at the program page of the province you are applying to before choosing your target score.' },
      { q: 'Can a TEF or TCF result serve both Canada and France?', a: `The scores can be read on both scales, but the reports are not interchangeable: Canada wants a TEF Canada or TCF Canada report, while France recognises the TCF and the TEF for residence cards and lists specific tests for naturalisation. The ${h.a('tef-tcf-cefr', 'CEFR page')} shows how one score reads as an NCLC and as a CEFR level.` },
    ],
    body: (h) => `
<h2>Minimum level by program</h2>
${h.table(['Program or procedure', 'Reading', 'Writing', 'Listening', 'Speaking'], [
  ['Federal Skilled Worker', h.P.ee.fsw, h.P.ee.fsw, h.P.ee.fsw, h.P.ee.fsw],
  ['Canadian Experience Class, TEER 0 or 1', h.P.ee.cecTeer01, h.P.ee.cecTeer01, h.P.ee.cecTeer01, h.P.ee.cecTeer01],
  ['Canadian Experience Class, TEER 2 or 3', h.P.ee.cecTeer23, h.P.ee.cecTeer23, h.P.ee.cecTeer23, h.P.ee.cecTeer23],
  ['Federal Skilled Trades', h.P.ee.fst.R, h.P.ee.fst.W, h.P.ee.fst.L, h.P.ee.fst.S],
  ['French-language category (French tests)', h.P.ee.frenchCategory, h.P.ee.frenchCategory, h.P.ee.frenchCategory, h.P.ee.frenchCategory],
  [`Citizenship (ages ${h.P.citizenship.ages[0]}–${h.P.citizenship.ages[1]})`, 'not assessed', 'not assessed', h.P.citizenship.clb, h.P.citizenship.clb],
], 'Minimum CLB / NCLC per skill. Sources: IRCC Express Entry language requirements and citizenship language proof pages.', ['l', 'r', 'r', 'r', 'r'])}
<p>The rule behind every row is the same: the minimum must be met in each skill. A brilliant result in three skills does not compensate for a fourth one below the line. The ${h.src('ircc_ee_lang', 'IRCC language requirements page')} also sets a validity condition: results under ${h.P.ee.validityYears} years old when the profile is created and when the permanent residence application is sent.</p>
<h2>The lower thresholds in TEF and TCF scores</h2>
<p>The CLB 7 scores are on the ${h.a('clb-7', 'NCLC 7 page')}. Here are the floors for the lower minimums, those of the skilled trades program (5 orally, 4 in writing and reading) and of TEER 2 or 3 jobs (5 everywhere):</p>
${h.table(['Skill', 'TEF Canada NCLC 4', 'TEF Canada NCLC 5', 'TCF Canada NCLC 4', 'TCF Canada NCLC 5'], [
  ['Reading', lo(h, 'tef', 'R', 4), lo(h, 'tef', 'R', 5), lo(h, 'tcf', 'R', 4), lo(h, 'tcf', 'R', 5)],
  ['Writing', lo(h, 'tef', 'W', 4), lo(h, 'tef', 'W', 5), `${lo(h, 'tcf', 'W', 4)} / 20`, `${lo(h, 'tcf', 'W', 5)} / 20`],
  ['Listening', lo(h, 'tef', 'L', 4), lo(h, 'tef', 'L', 5), lo(h, 'tcf', 'L', 4), lo(h, 'tcf', 'L', 5)],
  ['Speaking', lo(h, 'tef', 'S', 4), lo(h, 'tef', 'S', 5), `${lo(h, 'tcf', 'S', 4)} / 20`, `${lo(h, 'tcf', 'S', 5)} / 20`],
], 'Lowest score for NCLC 4 and NCLC 5 (TEF Canada since 11 December 2023; TCF Canada, IRCC chart).', ['l', 'r', 'r', 'r', 'r'])}
<h2>Points above the minimum</h2>
<p>Meeting a minimum makes you eligible; it does not make you competitive. In the Comprehensive Ranking System, each level above the floor adds points: in the first official language a single candidate earns ${h.P.crs.first.single[5]} points per skill at CLB 5, ${h.P.crs.first.single[7]} at CLB 7 and ${h.P.crs.first.single[9]} at CLB 9. The mini-tool next to this page shows the gain between two levels, and the ${h.a('crs-language', 'language points page')} gives the full picture. French speakers should also check the ${h.a('french-bonus', 'French bonus')}, which starts at NCLC ${h.P.crs.frenchBonus.nclc} in all four skills.</p>
<h2>Provincial programs</h2>
<p>Provincial nominee programs have their own language rules. They differ by province and by stream, and we have not verified them on official pages, so this site gives no figures for them. Before you pick a target score for a provincial route, read that province's own program page; the federal minimums above remain the floor for any Express Entry profile.</p>
<h2>If you are heading to France instead</h2>
<p>France uses the CEFR scale, not the NCLC. Since 1 January 2026, according to Service-Public, a first ${h.src('sp_pluri', 'multi-year residence card')} requires ${h.P.france.pluri}, a first ${h.src('sp_resident', '10-year resident card')} requires ${h.P.france.resident} (not required after age ${h.P.france.ageExempt}), and ${h.src('sp_naturalisation', 'naturalisation')} requires ${h.P.france.naturalisation} in writing and speaking. The ${h.a('residence-card-level', 'residence card page')} and the ${h.a('naturalisation-b2', 'naturalisation page')} explain which tests are accepted.</p>`,
  },
  fr: {
    slug: 'quel-niveau-nclc',
    nav: 'Quel niveau me faut-il ?',
    card: 'Le NCLC ou CLB minimum de chaque programme d’Entrée express et de la citoyenneté, et le niveau CECR exigé en France.',
    title: 'Niveau NCLC exigé par programme : Entrée express, France',
    description: 'Niveau NCLC ou CLB exigé pour chaque programme d’Entrée express, la catégorie français et la citoyenneté, et niveau CECR des titres de séjour en France.',
    h1: 'Quel niveau NCLC ou CLB votre démarche exige-t-elle ?',
    intro: 'Choisissez l’objet du test : l’outil affiche le niveau minimum par épreuve et le score le plus bas qui l’atteint dans chaque test accepté.',
    resume: (h) => `Le niveau à atteindre dépend de la démarche, et chaque épreuve est vérifiée séparément. Dans Entrée express, le programme des travailleurs qualifiés (fédéral) exige le NCLC ou CLB ${h.P.ee.fsw} en compréhension et en expression, écrites et orales. La catégorie de l’expérience canadienne demande ${h.P.ee.cecTeer01} partout pour un emploi FEER 0 ou 1, et ${h.P.ee.cecTeer23} pour un emploi FEER 2 ou 3. Le programme des métiers spécialisés (fédéral) veut ${h.P.ee.fst.S} à l’oral et à l’écoute, ${h.P.ee.fst.R} en lecture et à l’écrit. La catégorie « français » requiert le NCLC ${h.P.ee.frenchCategory} aux quatre épreuves de français, et la seconde langue officielle ne rapporte des points qu’à partir du niveau ${h.P.ee.fswSecondMin}. Pour la citoyenneté canadienne, les demandeurs de ${h.P.citizenship.ages[0]} à ${h.P.citizenship.ages[1]} ans doivent prouver le NCLC ou CLB ${h.P.citizenship.clb} à l’écoute et à l’oral seulement. Les programmes des provinces fixent leurs propres niveaux, variables selon la province et le volet, non repris ici. En France, depuis le 1er janvier 2026, la première carte pluriannuelle exige ${h.P.france.pluri}, la première carte de résident ${h.P.france.resident} et la naturalisation ${h.P.france.naturalisation}, sur l’échelle européenne.`,
    faqs: (h) => [
      { q: 'L’expérience canadienne exige-t-elle toujours le NCLC 7 ?', a: `Non, tout dépend de l’emploi occupé au Canada. Pour une profession FEER 0 ou 1, le minimum est le NCLC ${h.P.ee.cecTeer01} dans chaque épreuve ; pour une profession FEER 2 ou 3, il descend au NCLC ${h.P.ee.cecTeer23}. Votre score du SCG continue toutefois de monter à chaque niveau au-dessus du minimum : atteindre le plancher est rarement le seul objectif.` },
      { q: 'Pourquoi les métiers spécialisés ont-ils des niveaux différents selon l’épreuve ?', a: `IRCC a fixé le minimum du programme des travailleurs de métiers spécialisés (fédéral) au NCLC ${h.P.ee.fst.S} à l’oral et à l’écoute et au NCLC ${h.P.ee.fst.R} en lecture et à l’écrit. C’est le seul programme économique fédéral de cette liste où l’oral et l’écrit ont des planchers distincts, ce qui le rend accessible avec un écrit modeste.` },
      { q: 'Quel niveau demandent les programmes des provinces ?', a: 'Chaque province fixe sa propre exigence linguistique, qui peut varier d’un volet à l’autre au sein d’une même province. Ce site ne donne pas ces chiffres : nous ne publions que les niveaux vérifiés sur une page officielle. Consultez la page du programme de la province visée avant de choisir votre score cible.' },
      { q: 'Un résultat TEF ou TCF peut-il servir au Canada et en France ?', a: `Les scores se lisent sur les deux échelles, mais les attestations ne sont pas interchangeables : le Canada veut un TEF Canada ou un TCF Canada, alors que la France reconnaît le TCF et le TEF pour les titres de séjour et fixe une liste de tests pour la naturalisation. La page du ${h.a('tef-tcf-cefr', 'niveau CECR')} montre comment un même score se lit en NCLC et en CECR.` },
    ],
    body: (h) => `
<h2>Le niveau minimum, programme par programme</h2>
${h.table(['Programme ou démarche', 'Compr. écrite', 'Expr. écrite', 'Compr. orale', 'Expr. orale'], [
  ['Travailleurs qualifiés (fédéral)', h.P.ee.fsw, h.P.ee.fsw, h.P.ee.fsw, h.P.ee.fsw],
  ['Expérience canadienne, FEER 0 ou 1', h.P.ee.cecTeer01, h.P.ee.cecTeer01, h.P.ee.cecTeer01, h.P.ee.cecTeer01],
  ['Expérience canadienne, FEER 2 ou 3', h.P.ee.cecTeer23, h.P.ee.cecTeer23, h.P.ee.cecTeer23, h.P.ee.cecTeer23],
  ['Métiers spécialisés (fédéral)', h.P.ee.fst.R, h.P.ee.fst.W, h.P.ee.fst.L, h.P.ee.fst.S],
  ['Catégorie « français » (tests de français)', h.P.ee.frenchCategory, h.P.ee.frenchCategory, h.P.ee.frenchCategory, h.P.ee.frenchCategory],
  [`Citoyenneté (${h.P.citizenship.ages[0]} à ${h.P.citizenship.ages[1]} ans)`, 'non évaluée', 'non évaluée', h.P.citizenship.clb, h.P.citizenship.clb],
], 'NCLC / CLB minimum par épreuve. Sources : pages d’IRCC sur les exigences linguistiques d’Entrée express et sur la preuve linguistique pour la citoyenneté.', ['l', 'r', 'r', 'r', 'r'])}
<p>Une même règle vaut pour chaque ligne : le minimum doit être atteint dans chaque épreuve. Un excellent résultat dans trois épreuves ne rattrape pas une quatrième sous la barre. La ${h.src('ircc_ee_lang', 'page d’IRCC sur les exigences linguistiques')} ajoute une condition de validité : des résultats de moins de ${h.P.ee.validityYears} ans à la création du profil et à l’envoi de la demande de résidence permanente.</p>
<h2>Les seuils bas en scores TEF et TCF</h2>
<p>Les scores du NCLC 7 figurent sur la page du ${h.a('clb-7', 'NCLC 7')}. Voici les planchers des minimums plus bas, ceux des métiers spécialisés (5 à l’oral, 4 à l’écrit et en lecture) et des emplois FEER 2 ou 3 (5 partout) :</p>
${h.table(['Épreuve', 'TEF Canada NCLC 4', 'TEF Canada NCLC 5', 'TCF Canada NCLC 4', 'TCF Canada NCLC 5'], [
  ['Compréhension écrite', lo(h, 'tef', 'R', 4), lo(h, 'tef', 'R', 5), lo(h, 'tcf', 'R', 4), lo(h, 'tcf', 'R', 5)],
  ['Expression écrite', lo(h, 'tef', 'W', 4), lo(h, 'tef', 'W', 5), `${lo(h, 'tcf', 'W', 4)} / 20`, `${lo(h, 'tcf', 'W', 5)} / 20`],
  ['Compréhension orale', lo(h, 'tef', 'L', 4), lo(h, 'tef', 'L', 5), lo(h, 'tcf', 'L', 4), lo(h, 'tcf', 'L', 5)],
  ['Expression orale', lo(h, 'tef', 'S', 4), lo(h, 'tef', 'S', 5), `${lo(h, 'tcf', 'S', 4)} / 20`, `${lo(h, 'tcf', 'S', 5)} / 20`],
], 'Score minimum pour le NCLC 4 et le NCLC 5 (TEF Canada depuis le 11 décembre 2023 ; TCF Canada, grille d’IRCC).', ['l', 'r', 'r', 'r', 'r'])}
<h2>Les points au-delà du minimum</h2>
<p>Atteindre le minimum rend admissible, pas compétitif. Dans le Système de classement global, chaque niveau au-dessus du plancher rapporte : en première langue officielle, un candidat seul obtient ${h.P.crs.first.single[5]} points par épreuve au NCLC 5, ${h.P.crs.first.single[7]} au NCLC 7 et ${h.P.crs.first.single[9]} au NCLC 9. Le mini-calculateur voisin chiffre le gain entre deux niveaux, et la page des ${h.a('crs-language', 'points de langue')} donne le tableau complet. Les francophones regarderont aussi le ${h.a('french-bonus', 'bonus francophone')}, qui démarre au NCLC ${h.P.crs.frenchBonus.nclc} aux quatre épreuves.</p>
<h2>Les programmes provinciaux</h2>
<p>Les programmes des candidats des provinces ont leurs propres règles linguistiques. Elles varient selon la province et le volet, et nous ne les avons pas vérifiées sur des pages officielles : ce site n’en donne aucun chiffre. Avant de choisir un score cible pour une voie provinciale, lisez la page du programme de la province ; les minimums fédéraux ci-dessus restent le plancher de tout profil Entrée express.</p>
<h2>Si votre projet vise la France</h2>
<p>La France raisonne en niveaux du CECR, pas en NCLC. Depuis le 1er janvier 2026, selon Service-Public, la première ${h.src('sp_pluri', 'carte de séjour pluriannuelle')} demande le niveau ${h.P.france.pluri}, la première ${h.src('sp_resident', 'carte de résident valable dix ans')} le niveau ${h.P.france.resident} (non exigé après ${h.P.france.ageExempt} ans), et la ${h.src('sp_naturalisation', 'naturalisation')} le niveau ${h.P.france.naturalisation} à l’écrit et à l’oral. Les pages sur le ${h.a('residence-card-level', 'niveau de français des titres de séjour')} et sur la ${h.a('naturalisation-b2', 'naturalisation au niveau B2')} précisent les tests acceptés.</p>`,
  },
});
