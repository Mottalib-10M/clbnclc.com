import { definePage } from '../../lib/guide-types';

const lo = (r: string) => r.split('–')[0];

export default definePage({
  id: 'tcf-canada-score',
  group: 'scores',
  order: 14,
  tool: { kind: 'converter', props: { focus: 'tcf' } },
  mini: { kind: 'mini:tcfnclc' },
  related: ['tcf-canada', 'tcf-mock', 'clb-7', 'crs-language', 'tef-canada-score', 'tef-tcf-cefr'],
  sources: ['ircc_equiv', 'ircc_ee_lang', 'fei_tcf_manual', 'ircc_crs'],
  en: {
    slug: 'tcf-canada-score',
    nav: 'TCF Canada score to NCLC',
    card: 'The IRCC chart for TCF Canada: scores out of 699 and marks out of 20, converted to NCLC.',
    title: 'TCF Canada score to NCLC: 2026 IRCC chart, skill by skill',
    description: 'TCF Canada score to NCLC with the IRCC chart: convert reading, listening and the writing and speaking marks, then see each NCLC and your Express Entry points.',
    h1: 'TCF Canada score to NCLC, with the marks out of 20',
    intro: 'Type the four results printed on your TCF Canada report. Two are scores out of 699, two are marks out of 20; each one gets its own NCLC.',
    resume: (h) => `IRCC converts a TCF Canada result to an NCLC level skill by skill, and the chart mixes two scales. Reading and listening are reported as scores between 100 and 699: NCLC 7 starts at ${lo(h.range('tcf', 'R', 7))} in reading and at ${lo(h.range('tcf', 'L', 7))} in listening, NCLC 9 at ${lo(h.range('tcf', 'R', 9))} and ${lo(h.range('tcf', 'L', 9))}. Writing and speaking are marked out of 20, with the same bands for both: ${h.P.tests.tcf.W[6][1]} to ${h.P.tests.tcf.W[5][1] - 1} is NCLC 4, ${h.P.tests.tcf.W[3][1]} to ${h.P.tests.tcf.W[2][1] - 1} is NCLC 7, and ${h.P.tests.tcf.W[0][1]} or more is NCLC 10, the top of the IRCC chart. Below ${lo(h.range('tcf', 'R', 4))} in reading, ${lo(h.range('tcf', 'L', 4))} in listening or ${h.P.tests.tcf.W[6][1]} out of 20, a skill is under NCLC 4 and brings nothing. For Express Entry, the lowest of the four levels decides whether you meet a program minimum such as NCLC ${h.P.ee.fsw} for skilled workers, while points in the Comprehensive Ranking System are counted for each skill separately, so every band you climb in any test adds to your score.`,
    faqs: (h) => [
      { q: 'Why are TCF Canada writing and speaking marked out of 20?', a: `The TCF reports the two expression tests as marks out of 20 and the two comprehension tests as scores from 100 to 699, as the France Éducation international candidate manual describes. IRCC built its chart on those same units, so you convert the mark as printed. A ${h.P.tests.tcf.W[3][1]} out of 20 in writing gives NCLC 7; a ${h.P.tests.tcf.W[4][1]} gives NCLC 6.` },
      { q: 'Are the TCF Canada listening and reading bands the same?', a: `Close but not identical. NCLC 7 starts at ${lo(h.range('tcf', 'R', 7))} in reading and ${lo(h.range('tcf', 'L', 7))} in listening; NCLC 8 starts at ${lo(h.range('tcf', 'R', 8))} and ${lo(h.range('tcf', 'L', 8))}. A score sitting a few points above a reading threshold can therefore fall one level lower if you get the same figure in listening.` },
      { q: 'Which TCF Canada result counts if I sat the test twice?', a: `IRCC reads the score report you enter in your profile and send with the application; the results must be less than ${h.P.ee.validityYears} years old at both moments. Two sittings are two separate reports, and the converter here works on one report at a time. Enter each one to see which gives the better set of NCLC levels.` },
    ],
    body: (h) => `
<h2>The IRCC chart for the TCF Canada</h2>
<p>IRCC publishes one equivalency chart for the TCF Canada, identical on its language testing pages. It stops at "10 and above": there is no NCLC 11 or 12 for this test in the federal chart.</p>
${h.chart('tcf', [10, 9, 8, 7, 6, 5, 4], 'TCF Canada result per NCLC level: reading and listening out of 699, writing and speaking out of 20 (IRCC equivalency chart).')}
<h2>Reading the two scales on one report</h2>
<p>The France Éducation international manual explains that the comprehension tests produce a score from 100 to 699 and the expression tests a mark out of 20. Nothing needs to be rescaled: IRCC's chart already uses those units. What trips people up is comparing across the two. A ${h.P.tests.tcf.W[2][1]} out of 20 in speaking sounds modest, yet it is NCLC 8, the same level as ${lo(h.range('tcf', 'R', 8))} in reading.</p>
<p>The bands for writing and speaking are short: NCLC 6 covers ${h.range('tcf', 'W', 6)}, NCLC 7 covers ${h.range('tcf', 'W', 7)}. A single point out of 20 can move you across a threshold that matters for a program, which is why the ${h.a('french-writing', 'writing practice')} and ${h.a('french-speaking', 'speaking practice')} pages focus on task completion and length, the parts you control.</p>
<h2>Where each skill stands for Express Entry</h2>
<p>Program minimums look at your weakest skill. The Federal Skilled Worker program asks NCLC ${h.P.ee.fsw} in all four, which on the TCF Canada means at least ${lo(h.range('tcf', 'R', 7))} in reading, ${lo(h.range('tcf', 'L', 7))} in listening and ${h.P.tests.tcf.W[3][1]} out of 20 in both writing and speaking. The Canadian Experience Class asks NCLC ${h.P.ee.cecTeer01} for TEER 0 or 1 jobs and NCLC ${h.P.ee.cecTeer23} for TEER 2 or 3. The Federal Skilled Trades program asks ${h.P.ee.fst.S} in speaking and listening and ${h.P.ee.fst.R} in reading and writing. The ${h.a('which-level', 'level by program page')} lists them all.</p>
<p>Points work differently: each skill earns its own amount. As a first official language, a single candidate receives ${h.P.crs.first.single[7]} points per skill at NCLC 7, ${h.P.crs.first.single[8]} at NCLC 8, ${h.P.crs.first.single[9]} at NCLC 9 and ${h.P.crs.first.single[10]} at NCLC 10 or more. The ${h.a('crs-language', 'language points page')} adds the second language and the spouse.</p>
<h2>What the TCF Canada scale says about CEFR</h2>
<p>The same report can also be read on the Common European Framework scale, which France uses for residence cards and naturalisation. A score of ${h.P.tcf.cecr[2][1]} or more in a comprehension test is B2, and ${h.P.tcf.cecr20[2][1]} out of 20 is B2 in an expression test. The ${h.a('tef-tcf-cefr', 'CEFR page')} gives both scales level by level.</p>
<h2>Before you rely on the conversion</h2>
<p>Check the report date: IRCC wants results less than ${h.P.ee.validityYears} years old when you create the Express Entry profile and again when you submit the permanent residence application. Then check that each number was typed exactly as printed. If you are still preparing, the ${h.a('tcf-mock', 'TCF Canada mock sections')} follow the official number of questions and timing and give a rough indication, never an official score.</p>`,
  },
  fr: {
    slug: 'score-tcf-canada',
    nav: 'Score TCF Canada en NCLC',
    card: 'La grille d’IRCC pour le TCF Canada : scores sur 699 et notes sur 20, convertis en NCLC.',
    title: 'Score TCF Canada en NCLC : grille IRCC 2026 par épreuve',
    description: 'Score TCF Canada en NCLC selon la grille d’IRCC : convertissez compréhensions et notes d’expression, voyez le NCLC par épreuve et vos points Entrée express.',
    h1: 'Score TCF Canada en NCLC, notes sur 20 comprises',
    intro: 'Saisissez les quatre résultats de votre attestation TCF Canada : deux scores sur 699 et deux notes sur 20, chacun avec son propre NCLC.',
    resume: (h) => `IRCC convertit le résultat du TCF Canada en niveau NCLC épreuve par épreuve, avec une grille qui combine deux échelles. Les compréhensions écrite et orale sont exprimées par un score de 100 à 699 : le NCLC 7 débute à ${lo(h.range('tcf', 'R', 7))} en compréhension écrite et à ${lo(h.range('tcf', 'L', 7))} en compréhension orale, le NCLC 9 à ${lo(h.range('tcf', 'R', 9))} et ${lo(h.range('tcf', 'L', 9))}. Les expressions écrite et orale sont notées sur 20, avec les mêmes bandes pour les deux : de ${h.P.tests.tcf.W[6][1]} à ${h.P.tests.tcf.W[5][1] - 1}, c’est le NCLC 4 ; de ${h.P.tests.tcf.W[3][1]} à ${h.P.tests.tcf.W[2][1] - 1}, le NCLC 7 ; à partir de ${h.P.tests.tcf.W[0][1]}, le NCLC 10, sommet de la grille fédérale. Sous ${lo(h.range('tcf', 'R', 4))} en lecture, ${lo(h.range('tcf', 'L', 4))} à l’écoute ou ${h.P.tests.tcf.W[6][1]} sur 20, l’épreuve reste sous le NCLC 4 et ne compte pas. Dans Entrée express, le niveau le plus faible décide si un minimum de programme est atteint, par exemple le NCLC ${h.P.ee.fsw} des travailleurs qualifiés, alors que les points du Système de classement global se comptent épreuve par épreuve : chaque bande gagnée rapporte.`,
    faqs: (h) => [
      { q: 'Pourquoi les expressions du TCF Canada sont-elles notées sur 20 ?', a: `Le TCF exprime les deux épreuves d’expression par une note sur 20 et les deux compréhensions par un score de 100 à 699, comme l’explique le manuel du candidat de France Éducation international. IRCC a bâti sa grille sur ces mêmes unités : on convertit la note telle qu’elle est imprimée. Un ${h.P.tests.tcf.W[3][1]} sur 20 en expression écrite donne le NCLC 7, un ${h.P.tests.tcf.W[4][1]} le NCLC 6.` },
      { q: 'Les bandes du TCF Canada sont-elles identiques à l’écoute et en lecture ?', a: `Proches, mais pas identiques. Le NCLC 7 commence à ${lo(h.range('tcf', 'R', 7))} en compréhension écrite et à ${lo(h.range('tcf', 'L', 7))} en compréhension orale ; le NCLC 8 à ${lo(h.range('tcf', 'R', 8))} et ${lo(h.range('tcf', 'L', 8))}. Un score juste au-dessus d’un seuil en lecture peut donc valoir un niveau de moins s’il est obtenu à l’écoute.` },
      { q: 'Quel résultat du TCF Canada compte si j’ai passé le test deux fois ?', a: `IRCC lit l’attestation que vous saisissez dans le profil et joignez à la demande ; elle doit avoir moins de ${h.P.ee.validityYears} ans à ces deux moments. Deux passations font deux attestations distinctes, et le convertisseur de cette page traite une attestation à la fois. Saisissez-les l’une après l’autre pour voir laquelle offre la meilleure combinaison de NCLC.` },
    ],
    body: (h) => `
<h2>La grille d’IRCC pour le TCF Canada</h2>
<p>IRCC publie une seule grille d’équivalence pour le TCF Canada, reprise à l’identique sur ses pages consacrées aux tests de langue. Elle s’arrête à « 10 et plus » : la grille fédérale ne prévoit ni NCLC 11 ni NCLC 12 pour ce test.</p>
${h.chart('tcf', [10, 9, 8, 7, 6, 5, 4], 'Résultat au TCF Canada par niveau NCLC : compréhensions sur 699, expressions sur 20 (grille d’équivalence d’IRCC).')}
<h2>Deux échelles sur une même attestation</h2>
<p>Le manuel de France Éducation international l’explique : les compréhensions donnent un score de 100 à 699, les expressions une note sur 20. Aucune règle de trois à faire, puisque la grille d’IRCC emploie déjà ces unités. La difficulté tient à la comparaison : un ${h.P.tests.tcf.W[2][1]} sur 20 à l’oral paraît modeste, et pourtant il vaut le NCLC 8, comme ${lo(h.range('tcf', 'R', 8))} en lecture.</p>
<p>Les bandes des expressions sont étroites : le NCLC 6 couvre ${h.range('tcf', 'W', 6)}, le NCLC 7 ${h.range('tcf', 'W', 7)}. Un seul point sur 20 peut faire franchir un seuil décisif pour un programme. Les pages d’entraînement à l’${h.a('french-writing', 'expression écrite')} et à l’${h.a('french-speaking', 'expression orale')} insistent donc sur ce que vous maîtrisez : traiter toute la consigne et respecter la longueur.</p>
<h2>Ce que chaque épreuve pèse dans Entrée express</h2>
<p>Les minimums de programme regardent l’épreuve la plus faible. Le programme des travailleurs qualifiés (fédéral) exige le NCLC ${h.P.ee.fsw} partout, soit au TCF Canada au moins ${lo(h.range('tcf', 'R', 7))} en lecture, ${lo(h.range('tcf', 'L', 7))} à l’écoute et ${h.P.tests.tcf.W[3][1]} sur 20 dans chaque expression. La catégorie de l’expérience canadienne demande le NCLC ${h.P.ee.cecTeer01} pour les emplois FEER 0 ou 1 et le NCLC ${h.P.ee.cecTeer23} pour les FEER 2 ou 3 ; les métiers spécialisés, ${h.P.ee.fst.S} à l’oral et à l’écoute, ${h.P.ee.fst.R} en lecture et à l’écrit. Tout est réuni sur la page ${h.a('which-level', 'quel niveau NCLC')}.</p>
<p>Les points obéissent à une autre logique : chaque épreuve rapporte sa part. En première langue officielle, un candidat seul reçoit ${h.P.crs.first.single[7]} points par épreuve au NCLC 7, ${h.P.crs.first.single[8]} au NCLC 8, ${h.P.crs.first.single[9]} au NCLC 9 et ${h.P.crs.first.single[10]} au NCLC 10 ou plus. La page des ${h.a('crs-language', 'points de langue')} ajoute la seconde langue et l’époux.</p>
<h2>Le même résultat lu sur l’échelle du CECR</h2>
<p>L’attestation se lit aussi sur le Cadre européen commun de référence, celui qu’emploie la France pour les titres de séjour et la naturalisation. Un score d’au moins ${h.P.tcf.cecr[2][1]} en compréhension correspond au B2, tout comme ${h.P.tcf.cecr20[2][1]} sur 20 en expression. La page du ${h.a('tef-tcf-cefr', 'niveau CECR')} donne les deux échelles niveau par niveau.</p>
<h2>Avant de vous fier à la conversion</h2>
<p>Vérifiez la date de l’attestation : IRCC exige des résultats de moins de ${h.P.ee.validityYears} ans à la création du profil et au dépôt de la demande de résidence permanente. Vérifiez aussi que chaque chiffre est saisi tel qu’imprimé. Si vous préparez encore le test, les ${h.a('tcf-mock', 'examens blancs du TCF Canada')} respectent le nombre de questions et la durée officiels et donnent une indication approximative, jamais un score officiel.</p>`,
  },
});
