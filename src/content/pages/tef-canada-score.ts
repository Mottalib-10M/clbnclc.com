import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'tef-canada-score',
  group: 'scores',
  order: 10,
  tool: { kind: 'converter', props: { focus: 'tef' } },
  mini: { kind: 'mini:tefnclc' },
  related: ['home', 'tef-canada', 'clb-7', 'crs-language', 'tcf-canada-score', 'test-validity'],
  sources: ['cci_tef_nclc', 'ircc_equiv', 'ircc_ee_lang', 'cci_tef_canada_results', 'ircc_crs'],
  en: {
    slug: 'tef-canada-score',
    nav: 'TEF Canada score to NCLC',
    card: 'The three TEF Canada charts (2019, 2023 and the old scores) and the NCLC of each skill.',
    title: 'TEF Canada score to NCLC: 2026 chart for all four skills',
    description: 'TEF Canada score to NCLC with the IRCC and CCI charts: pick your test date, type the four scores and see the NCLC per skill and your Express Entry points.',
    h1: 'TEF Canada score to NCLC, skill by skill',
    intro: 'Choose the chart that matches your test date, type the four scores of your report: the NCLC of each skill and the language points appear at once.',
    resume: (h) => `A TEF Canada result is converted to an NCLC level separately for each of the four tests, with a chart that depends on the date of the test. Since 11 December 2023 each test has its own chart on the 0 to 699 scale: in reading, NCLC 7 starts at ${h.range('tef', 'R', 7).split('–')[0]}, in writing at ${h.range('tef', 'W', 7).split('–')[0]}, in listening at ${h.range('tef', 'L', 7).split('–')[0]} and in speaking at ${h.range('tef', 'S', 7).split('–')[0]}. Tests taken from 1 October 2019 to 10 December 2023 used one chart for all four, with NCLC 7 from ${h.num(h.P.tests.tef2019.all[3][1])}. Older reports used separate scales (reading out of ${h.P.tests.tefOld.max.R}, writing out of ${h.P.tests.tefOld.max.W}, listening out of ${h.P.tests.tefOld.max.L}, speaking out of ${h.P.tests.tefOld.max.S}), and that "équivalence ancien score" column is still the one IRCC and the CCI ask you to type in an Express Entry profile. The level that counts is the lowest of the four for programme minimums, while Comprehensive Ranking System points are added skill by skill, so a weaker writing score costs points even when the other three are strong.`,
    faqs: (h) => [
      { q: 'Which TEF Canada score do I type in my Express Entry profile?', a: 'The figures in the "équivalence ancien score" column of your score report, not the score out of 699. IRCC and the CCI Paris Île-de-France both state that the 699 scale is not compatible with the profile system. The converter above accepts both: choose "équivalence ancien score" to check what the profile will compute from those figures.' },
      { q: 'Why does the same score give a different NCLC in writing and in reading?', a: `Because the chart used since 11 December 2023 sets separate bands for each test. A score of ${h.num(430)}, for example, is NCLC 6 in reading and listening but NCLC 7 in writing, where the band for 7 starts at ${h.range('tef', 'W', 7).split('–')[0]}. Speaking asks the highest scores for NCLC 11 and 12.` },
      { q: 'Does an NCLC 11 or 12 on the CCI table earn more points?', a: `No. The CCI table goes up to NCLC 12, but the Comprehensive Ranking System stops at "CLB 10 or more": ${h.P.crs.first.single[10]} points per skill for a single candidate in the first official language, ${h.P.crs.first.withSpouse[10]} with a spouse. Above 10, a higher score changes nothing in Express Entry.` },
      { q: 'My test dates from early 2024: is my NCLC still right?', a: 'Reports issued between 11 December 2023 and 6 May 2024 were affected by a temporary change in the CCI calculation, and the CCI says some candidates may need to update their profile. Check the levels printed on your report against the chart for tests taken from 11 December 2023, and update the profile if they differ.' },
    ],
    body: (h) => `
<h2>The chart for tests taken since 11 December 2023</h2>
<p>This is the chart the CCI Paris Île-de-France publishes for current TEF Canada reports, read on ${h.date(h.P.retrieved_at)}. It goes up to NCLC 12; IRCC's own chart stops at "10 and above", which is all Express Entry needs.</p>
${h.chart('tef', [12, 11, 10, 9, 8, 7, 6, 5, 4], 'TEF Canada score (0 to 699) per NCLC level, tests from 11 December 2023. Source: CCI Paris Île-de-France correspondence table.')}
<p>Below the bottom of NCLC 4 (${h.range('tef', 'R', 4).split('–')[0]} in reading, ${h.range('tef', 'W', 4).split('–')[0]} in writing, ${h.range('tef', 'L', 4).split('–')[0]} in listening, ${h.range('tef', 'S', 4).split('–')[0]} in speaking) a skill counts for nothing in the Comprehensive Ranking System and fails every federal minimum.</p>
<h2>Tests from 1 October 2019 to 10 December 2023</h2>
<p>During those four years one chart served the four tests, which made the conversion simple: the same band, whatever the skill.</p>
${h.chart('tef2019', [10, 9, 8, 7, 6, 5, 4], 'TEF Canada, tests from 1 October 2019 to 10 December 2023: one chart for all four skills (IRCC).')}
<p>A report from that period is now more than two years old in most cases. IRCC asks for results that are less than two years old when you create your profile and again when you apply for permanent residence, so an old report is mostly useful to compare your progress, not to apply. The ${h.a('test-validity', 'validity page')} counts the days left on a report.</p>
<h2>The "équivalence ancien score" column</h2>
<p>Before 30 September 2019 the TEF used a different scale for each test. Those old scores live on in today's reports as a second column, and the CCI and IRCC tell candidates to type that column in the Express Entry profile. Its chart:</p>
${h.chart('tefOld', [10, 9, 8, 7, 6, 5, 4], 'TEF Canada old scores: reading out of 300, writing out of 450, listening out of 360, speaking out of 450 (IRCC).')}
<p>If you type the old-score figures from your report into the converter with this chart selected, you should land on the same NCLC as the 699 chart gives. When the two disagree, the report itself is the reference and the CCI can explain the gap; the ${h.src('cci_tef_canada_results', 'CCI results page')} covers how scores are produced.</p>
<h2>From NCLC to Express Entry points</h2>
<p>Each skill earns its own points. In the first official language a single candidate gets ${h.P.crs.first.single[7]} points per skill at NCLC 7, ${h.P.crs.first.single[9]} at NCLC 9 and ${h.P.crs.first.single[10]} at NCLC 10 or more; with an accompanying spouse the figures are ${h.P.crs.first.withSpouse[7]}, ${h.P.crs.first.withSpouse[9]} and ${h.P.crs.first.withSpouse[10]}. French as a second official language adds up to ${h.P.crs.second.max.single} points, and NCLC 7 on all four French tests opens the French bonus of ${h.P.crs.frenchBonus.englishLow} or ${h.P.crs.frenchBonus.englishClb5} points, detailed on the ${h.a('french-bonus', 'French bonus page')}. The full scale is on the ${h.a('crs-language', 'language points page')}.</p>
<h2>Reading your result well</h2>
<p>Look at the lowest of your four levels first. The Federal Skilled Worker program and the French-language category ask NCLC ${h.P.ee.fsw} in every skill, so one test at NCLC 6 blocks both, whatever the other three say. Then look at the margin: a score just above a band is fragile if you plan to sit the test again, because a new sitting replaces nothing automatically and can come out lower. The ${h.a('clb-7', 'NCLC 7 page')} lists the scores to aim for in each test, and the ${h.a('tef-mock', 'TEF Canada mock sections')} help you work on the weakest one.</p>`,
  },
  fr: {
    slug: 'score-tef-canada',
    nav: 'Score TEF Canada en NCLC',
    card: 'Les trois grilles du TEF Canada (2019, 2023 et anciens scores) et le NCLC de chaque épreuve.',
    title: 'Score TEF Canada en NCLC : grilles 2026 des quatre épreuves',
    description: 'Score TEF Canada en NCLC selon les grilles d’IRCC et de la CCI : choisissez la date du test, saisissez vos quatre scores, voyez vos NCLC et vos points.',
    h1: 'Score TEF Canada en NCLC, épreuve par épreuve',
    intro: 'Choisissez la grille qui correspond à la date de votre test et saisissez les quatre scores de l’attestation : NCLC par épreuve et points de langue s’affichent aussitôt.',
    resume: (h) => `Le résultat du TEF Canada se convertit en niveau NCLC épreuve par épreuve, avec une grille qui dépend de la date du test. Depuis le 11 décembre 2023, chaque épreuve a sa propre grille sur l’échelle de 0 à 699 : le NCLC 7 commence à ${h.range('tef', 'R', 7).split('–')[0]} en compréhension écrite, à ${h.range('tef', 'W', 7).split('–')[0]} en expression écrite, à ${h.range('tef', 'L', 7).split('–')[0]} en compréhension orale et à ${h.range('tef', 'S', 7).split('–')[0]} en expression orale. Entre le 1er octobre 2019 et le 10 décembre 2023, une grille unique servait aux quatre épreuves, avec le NCLC 7 dès ${h.num(h.P.tests.tef2019.all[3][1])}. Les anciennes attestations utilisaient des échelles distinctes (compréhension écrite sur ${h.P.tests.tefOld.max.R}, expression écrite sur ${h.P.tests.tefOld.max.W}, compréhension orale sur ${h.P.tests.tefOld.max.L}, expression orale sur ${h.P.tests.tefOld.max.S}) : c’est cette colonne « équivalence ancien score » qu’IRCC et la CCI demandent toujours de saisir dans le profil Entrée express. Les minimums des programmes regardent l’épreuve la plus faible, tandis que les points du Système de classement global s’additionnent épreuve par épreuve.`,
    faqs: (h) => [
      { q: 'Quel score du TEF Canada saisir dans le profil Entrée express ?', a: 'Les chiffres de la colonne « équivalence ancien score » de votre attestation, et non le score sur 699. IRCC et la CCI Paris Île-de-France précisent que l’échelle sur 699 n’est pas compatible avec le système des profils. Le convertisseur ci-dessus accepte les deux : choisissez la colonne « équivalence ancien score » pour vérifier ce que le profil calculera.' },
      { q: 'Pourquoi un même score donne-t-il un NCLC différent à l’écrit et en lecture ?', a: `Parce que la grille en vigueur depuis le 11 décembre 2023 fixe des bandes propres à chaque épreuve. Un score de ${h.num(430)}, par exemple, vaut NCLC 6 en compréhension écrite et orale, mais NCLC 7 en expression écrite, dont la bande commence à ${h.range('tef', 'W', 7).split('–')[0]}. L’expression orale demande les scores les plus élevés pour les NCLC 11 et 12.` },
      { q: 'Un NCLC 11 ou 12 dans la grille de la CCI rapporte-t-il plus de points ?', a: `Non. La grille de la CCI monte jusqu’au NCLC 12, mais le Système de classement global s’arrête à « NCLC 10 ou plus » : ${h.P.crs.first.single[10]} points par épreuve en première langue pour un candidat seul, ${h.P.crs.first.withSpouse[10]} avec un époux. Au-delà de 10, un meilleur score ne change rien dans Entrée express.` },
      { q: 'Mon test date du début de 2024 : mon NCLC est-il juste ?', a: 'Les attestations émises entre le 11 décembre 2023 et le 6 mai 2024 ont été touchées par une modification temporaire du calcul de la CCI, qui indique que certains candidats peuvent devoir mettre leur profil à jour. Comparez les niveaux de votre attestation avec la grille des tests passés depuis le 11 décembre 2023 et corrigez le profil en cas d’écart.' },
    ],
    body: (h) => `
<h2>La grille des tests passés depuis le 11 décembre 2023</h2>
<p>C’est la grille publiée par la CCI Paris Île-de-France, valable pour les attestations actuelles, relue le ${h.date(h.P.retrieved_at)}. Elle monte jusqu’au NCLC 12 ; celle d’IRCC s’arrête à « 10 et plus », ce qui suffit pour Entrée express.</p>
${h.chart('tef', [12, 11, 10, 9, 8, 7, 6, 5, 4], 'Score TEF Canada (0 à 699) par niveau NCLC, tests depuis le 11 décembre 2023. Source : tableau de correspondance de la CCI Paris Île-de-France.')}
<p>Sous le bas du NCLC 4 (${h.range('tef', 'R', 4).split('–')[0]} en compréhension écrite, ${h.range('tef', 'W', 4).split('–')[0]} en expression écrite, ${h.range('tef', 'L', 4).split('–')[0]} en compréhension orale, ${h.range('tef', 'S', 4).split('–')[0]} en expression orale), une épreuve ne rapporte aucun point et ne remplit aucun minimum fédéral.</p>
<h2>Les tests du 1er octobre 2019 au 10 décembre 2023</h2>
<p>Pendant ces quatre années, une seule grille valait pour toutes les épreuves : même bande, quelle que soit la compétence.</p>
${h.chart('tef2019', [10, 9, 8, 7, 6, 5, 4], 'TEF Canada, tests du 1er octobre 2019 au 10 décembre 2023 : une grille commune aux quatre épreuves (IRCC).')}
<p>Une attestation de cette période a souvent plus de deux ans. Or IRCC exige des résultats de moins de deux ans à la création du profil et de nouveau au dépôt de la demande de résidence permanente : une vieille attestation sert surtout à mesurer vos progrès. La page sur la ${h.a('test-validity', 'validité des résultats')} compte les jours qui restent.</p>
<h2>La colonne « équivalence ancien score »</h2>
<p>Avant le 30 septembre 2019, le TEF notait chaque épreuve sur une échelle différente. Ces anciens scores figurent encore sur les attestations actuelles, dans une seconde colonne, et c’est elle que la CCI et IRCC demandent de reporter dans le profil Entrée express. Sa grille :</p>
${h.chart('tefOld', [10, 9, 8, 7, 6, 5, 4], 'TEF Canada, anciens scores : compréhension écrite sur 300, expression écrite sur 450, compréhension orale sur 360, expression orale sur 450 (IRCC).')}
<p>En saisissant ces chiffres dans le convertisseur avec cette grille, vous devez retrouver les mêmes NCLC qu’avec l’échelle sur 699. En cas de différence, l’attestation fait foi et la CCI peut expliquer l’écart ; sa ${h.src('cci_tef_canada_results', 'page sur les résultats')} décrit le calcul des scores.</p>
<h2>Des NCLC aux points d’Entrée express</h2>
<p>Chaque épreuve rapporte ses propres points. En première langue officielle, un candidat seul obtient ${h.P.crs.first.single[7]} points par épreuve au NCLC 7, ${h.P.crs.first.single[9]} au NCLC 9 et ${h.P.crs.first.single[10]} au NCLC 10 ou plus ; avec un époux qui l’accompagne, ce sont ${h.P.crs.first.withSpouse[7]}, ${h.P.crs.first.withSpouse[9]} et ${h.P.crs.first.withSpouse[10]}. Le français en seconde langue ajoute jusqu’à ${h.P.crs.second.max.single} points, et un NCLC 7 aux quatre épreuves ouvre le bonus francophone de ${h.P.crs.frenchBonus.englishLow} ou ${h.P.crs.frenchBonus.englishClb5} points, expliqué sur la page du ${h.a('french-bonus', 'bonus francophone')}. Le barème complet se trouve sur la page des ${h.a('crs-language', 'points de langue')}.</p>
<h2>Bien lire son résultat</h2>
<p>Regardez d’abord le plus faible de vos quatre niveaux. Le programme des travailleurs qualifiés et la catégorie « français » demandent le NCLC ${h.P.ee.fsw} partout : une seule épreuve au NCLC 6 ferme les deux portes, quels que soient les trois autres résultats. Regardez ensuite la marge : un score tout juste au-dessus d’une bande est fragile si vous comptez repasser le test, car une nouvelle passation peut aussi descendre. La page du ${h.a('clb-7', 'NCLC 7')} donne les scores à viser dans chaque test, et les ${h.a('tef-mock', 'sections d’examen blanc du TEF Canada')} aident à travailler l’épreuve la plus faible.</p>`,
  },
});
