import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'tef-irn',
  group: 'france',
  order: 70,
  tool: { kind: 'cefr', props: { mode: 'irn' } },
  mini: { kind: 'mini:irn' },
  related: ['residence-card-level', 'naturalisation-b2', 'tcf-irn', 'tef-tcf-cefr', 'french-writing'],
  sources: ['cci_tef_irn', 'cci_tef_irn_passation', 'cci_tef_irn_results', 'jo_titres', 'jo_naturalisation'],
  en: {
    slug: 'tef-irn',
    nav: 'TEF IRN',
    card: 'The TEF IRN for French residence cards and naturalisation: four short tests and the rule for the overall level.',
    title: 'TEF IRN: format, overall level rule and results for France',
    description: 'TEF IRN explained: the four tests and their timing, how the CCI sets the overall level from A1 to B2, what each French residence card asks, results, validity.',
    h1: 'TEF IRN: the test, and how its overall level is set',
    intro: 'The TEF IRN is the CCI Paris Île-de-France test for residence and nationality in France. Enter your four scores to see the overall level the CCI rule gives.',
    resume: (h) => `The TEF IRN is the version of the TEF designed by the CCI Paris Île-de-France for residence and nationality procedures in France. It certifies levels from A1 to B2 and is open to candidates over ${h.P.tef.minAge}. It has four short tests: reading (${h.P.tef.irn.ce.q} questions in ${h.P.tef.irn.ce.min} minutes), listening (${h.P.tef.irn.co.q} questions in ${h.P.tef.irn.co.min} minutes), writing (${h.P.tef.irn.ee.min} minutes: a message of at least ${h.P.tef.irn.ee.a.words} words, then a text of at least ${h.P.tef.irn.ee.b.words} words about your motivations) and speaking (${h.P.tef.irn.eo.min} minutes: a phone call, then helping a friend decide). The overall level follows a two-part rule: for B2, three tests at ${h.P.tef.irn.levels[0][1]} or more and the weakest at ${h.P.tef.irn.levels[0][2]} or more; for B1, ${h.P.tef.irn.levels[1][1]} and ${h.P.tef.irn.levels[1][2]}; for A2, ${h.P.tef.irn.levels[2][1]} and ${h.P.tef.irn.levels[2][2]}. Results arrive within ${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days and the certificate is valid ${h.P.tef.validityYears} years. Since 1 January 2026, France asks ${h.P.france.pluri} for a first multi-year card, ${h.P.france.resident} for a first resident card and ${h.P.france.naturalisation} for naturalisation.`,
    faqs: (h) => [
      { q: 'How does the TEF IRN overall level work with one weak test?', a: `The CCI rule tolerates one weaker test. For B1, you need ${h.P.tef.irn.levels[1][1]} or more in three tests and at least ${h.P.tef.irn.levels[1][2]} in the fourth. So scores of ${h.num(320)}, ${h.num(310)}, ${h.num(305)} and ${h.num(270)} give B1, while ${h.num(320)}, ${h.num(310)}, ${h.num(305)} and ${h.num(260)} do not. The tool above applies the rule to your four scores.` },
      { q: 'Is the TEF IRN the same as the TEF Canada?', a: `No. Both come from the CCI Paris Île-de-France, but the TEF IRN is built for French procedures and stops at B2, with much shorter tests: ${h.P.tef.irn.ce.q} reading questions in ${h.P.tef.irn.ce.min} minutes, against ${h.P.tef.canada.ce.q} in ${h.P.tef.canada.ce.min} minutes for the TEF Canada. A TEF Canada report is read by IRCC as NCLC levels; a TEF IRN certificate gives a CEFR level for France.` },
      { q: 'Can the TEF IRN be used for naturalisation?', a: `The naturalisation order of 22 December 2025 requires B2 in four distinct tests taken the same day in a centre, with an identity check, from a test listed in a specific register, or one of the diplomas it names. The TEF IRN certifies up to B2 in four tests; check with the CCI that the session you book is the one listed for naturalisation before you pay.` },
      { q: 'Which jobs ask for the TEF IRN besides residence?', a: 'The CCI also mentions private security work, at level B1, among the uses of the TEF IRN. This site does not cover the rules of that sector; check the requirement with the body that issues your professional card before booking.' },
    ],
    body: (h) => `
<h2>The four tests</h2>
${h.table(['Test', 'Content', 'Time'], [
  ['Reading', `${h.P.tef.irn.ce.q} questions`, `${h.P.tef.irn.ce.min} min`],
  ['Listening', `${h.P.tef.irn.co.q} questions`, `${h.P.tef.irn.co.min} min`],
  ['Writing', `A (${h.P.tef.irn.ee.a.min} min): a message, ${h.P.tef.irn.ee.a.words}+ words. B (${h.P.tef.irn.ee.b.min} min): your motivations, ${h.P.tef.irn.ee.b.words}+ words`, `${h.P.tef.irn.ee.min} min`],
  ['Speaking', `A (${h.P.tef.irn.eo.a} min): make a phone call. B (${h.P.tef.irn.eo.b} min): help a friend make a decision`, `${h.P.tef.irn.eo.min} min`],
], 'TEF IRN format, CCI Paris Île-de-France presentation and passation pages.', ['l', 'l', 'r'])}
<p>The whole TEF IRN takes ${h.P.tef.irn.ce.min + h.P.tef.irn.co.min + h.P.tef.irn.ee.min + h.P.tef.irn.eo.min} minutes of testing, less than half the TEF Canada. The tasks stay close to everyday life in France: messages, motivations, phone calls, advice to a friend. The ${h.src('cci_tef_irn_passation', 'CCI passation page')} describes how a session runs.</p>
<h2>The overall level rule</h2>
<p>Each test gets a score; the overall level then depends on two thresholds, published on the ${h.src('cci_tef_irn_results', 'CCI results page')}:</p>
${h.table(['Overall level', 'Three tests at least', 'Weakest test at least'], h.P.tef.irn.levels.map((l) => [String(l[0]), l[1], l[2]]), `Below A2, the level is A1 if every test reaches ${h.P.tef.irn.a1}.`, ['l', 'r', 'r'])}
<p>In practice, sort your four scores. Your third-best score decides which threshold you reach, and your weakest must not fall below the lower figure. A candidate at ${h.num(450)}, ${h.num(430)}, ${h.num(410)} and ${h.num(370)} reaches B2. A candidate at ${h.num(450)}, ${h.num(430)}, ${h.num(395)} and ${h.num(390)} stops at B1, even though the average is higher than ${h.P.tef.irn.levels[0][1]}. The mini-tool beside this text takes the two decisive scores.</p>
<h2>What level for which procedure</h2>
<p>Since 1 January 2026, two orders of 22 December 2025 set the levels. For residence cards, the ${h.src('jo_titres', 'order on residence card certifications')} recognises the TCF and the TEF, and asks ${h.P.france.pluri} for a first multi-year card and ${h.P.france.resident} for a first resident card (not after age ${h.P.france.ageExempt}). For nationality, the ${h.src('jo_naturalisation', 'naturalisation order')} asks ${h.P.france.naturalisation} in writing and speaking. The ${h.a('residence-card-level', 'residence card page')} and the ${h.a('naturalisation-b2', 'naturalisation page')} go into the details.</p>
<h2>Before you book</h2>
<p>Make sure the session is a TEF IRN and not a TEF Canada: the two share a name and an organiser, but only the TEF IRN is built for French procedures, and a TEF Canada report is designed to be read in NCLC levels by IRCC. Remember too that the TEF IRN stops at B2. You must be over ${h.P.tef.minAge} to sit it, and each centre publishes its own dates.</p>
<h2>Results and validity</h2>
<p>The CCI announces results within ${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days. The certificate is valid ${h.P.tef.validityYears} years, and the French orders also require a certificate under ${h.P.france.validityYears} years old, so do not sit the test too early before filing. Fees are set by each centre and we have no confirmed TEF IRN price to quote.</p>
<h2>Preparing on this site</h2>
<p>Our practice banks follow the TEF Canada and TCF Canada formats, which are longer, but the skills are the same. The ${h.a('french-writing', 'writing practice')} counts your words against a minimum, which suits the two TEF IRN writing tasks, and the ${h.a('tef-tcf-cefr', 'CEFR page')} converts any TEF score into a level. The ${h.a('tcf-irn', 'TCF IRN page')} covers the other recognised test.</p>`,
  },
  fr: {
    slug: 'tef-irn',
    nav: 'TEF IRN',
    card: 'Le TEF IRN pour les titres de séjour et la naturalisation : quatre épreuves courtes et la règle du niveau global.',
    title: 'TEF IRN : épreuves, niveau global et résultats en 2026',
    description: 'TEF IRN : les quatre épreuves et leur durée, le calcul du niveau global de A1 à B2 par la CCI, le niveau de chaque titre de séjour, résultats et validité.',
    h1: 'Le TEF IRN : déroulement et calcul du niveau global',
    intro: 'Pour le séjour et la nationalité en France, la CCI Paris Île-de-France propose le TEF IRN. Saisissez vos quatre scores pour voir le niveau global que donne la règle.',
    resume: (h) => `Le TEF IRN est la déclinaison du TEF que la CCI Paris Île-de-France a conçue pour les démarches de séjour et de nationalité en France. Il certifie les niveaux A1 à B2 et s’adresse aux candidats de plus de ${h.P.tef.minAge} ans. Quatre épreuves courtes le composent : compréhension écrite (${h.P.tef.irn.ce.q} questions en ${h.P.tef.irn.ce.min} minutes), compréhension orale (${h.P.tef.irn.co.q} questions en ${h.P.tef.irn.co.min} minutes), expression écrite (${h.P.tef.irn.ee.min} minutes : un message d’au moins ${h.P.tef.irn.ee.a.words} mots, puis un texte d’au moins ${h.P.tef.irn.ee.b.words} mots sur vos motivations) et expression orale (${h.P.tef.irn.eo.min} minutes : un appel téléphonique, puis aider un ami à prendre une décision). Le niveau global obéit à une double condition : pour le B2, trois épreuves à ${h.P.tef.irn.levels[0][1]} ou plus et la plus faible à ${h.P.tef.irn.levels[0][2]} ou plus ; pour le B1, ${h.P.tef.irn.levels[1][1]} et ${h.P.tef.irn.levels[1][2]} ; pour l’A2, ${h.P.tef.irn.levels[2][1]} et ${h.P.tef.irn.levels[2][2]}. Les résultats arrivent en ${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés et l’attestation vaut ${h.P.tef.validityYears} ans. Depuis le 1er janvier 2026, la France exige ${h.P.france.pluri} pour une première carte pluriannuelle, ${h.P.france.resident} pour une première carte de résident et ${h.P.france.naturalisation} pour la naturalisation.`,
    faqs: (h) => [
      { q: 'Comment le niveau global du TEF IRN tient-il compte d’une épreuve faible ?', a: `La règle de la CCI tolère une épreuve plus faible. Pour le B1, il faut ${h.P.tef.irn.levels[1][1]} ou plus dans trois épreuves et au moins ${h.P.tef.irn.levels[1][2]} dans la quatrième. Des scores de ${h.num(320)}, ${h.num(310)}, ${h.num(305)} et ${h.num(270)} donnent donc le B1, mais pas ${h.num(320)}, ${h.num(310)}, ${h.num(305)} et ${h.num(260)}. L’outil ci-dessus applique la règle à vos quatre scores.` },
      { q: 'Le TEF IRN est-il identique au TEF Canada ?', a: `Non. Les deux viennent de la CCI Paris Île-de-France, mais le TEF IRN vise les démarches françaises, plafonne au B2 et ses épreuves sont bien plus courtes : ${h.P.tef.irn.ce.q} questions de compréhension écrite en ${h.P.tef.irn.ce.min} minutes, contre ${h.P.tef.canada.ce.q} en ${h.P.tef.canada.ce.min} minutes au TEF Canada. IRCC lit le TEF Canada en NCLC ; le TEF IRN donne un niveau du CECR pour la France.` },
      { q: 'Le TEF IRN peut-il servir pour la naturalisation ?', a: `L’arrêté du 22 décembre 2025 sur la naturalisation exige le B2 dans quatre épreuves distinctes passées le même jour en centre, avec contrôle d’identité, auprès d’un test inscrit à un répertoire spécifique, ou l’un des diplômes qu’il cite. Le TEF IRN certifie jusqu’au B2 en quatre épreuves ; vérifiez auprès de la CCI que la session réservée est bien celle retenue pour la naturalisation avant de payer.` },
      { q: 'Quels métiers demandent le TEF IRN en dehors du séjour ?', a: 'La CCI cite aussi les métiers de la sécurité privée, au niveau B1, parmi les usages du TEF IRN. Ce site ne traite pas des règles de ce secteur : vérifiez l’exigence auprès de l’organisme qui délivre votre carte professionnelle avant de vous inscrire.' },
    ],
    body: (h) => `
<h2>Les quatre épreuves</h2>
${h.table(['Épreuve', 'Contenu', 'Durée'], [
  ['Compréhension écrite', `${h.P.tef.irn.ce.q} questions`, `${h.P.tef.irn.ce.min} min`],
  ['Compréhension orale', `${h.P.tef.irn.co.q} questions`, `${h.P.tef.irn.co.min} min`],
  ['Expression écrite', `Section A (${h.P.tef.irn.ee.a.min} min) : un message, ${h.P.tef.irn.ee.a.words} mots minimum. Section B (${h.P.tef.irn.ee.b.min} min) : vos motivations, ${h.P.tef.irn.ee.b.words} mots minimum`, `${h.P.tef.irn.ee.min} min`],
  ['Expression orale', `Section A (${h.P.tef.irn.eo.a} min) : téléphoner. Section B (${h.P.tef.irn.eo.b} min) : aider un ami à prendre une décision`, `${h.P.tef.irn.eo.min} min`],
], 'Format du TEF IRN, pages de présentation et de passation de la CCI Paris Île-de-France.', ['l', 'l', 'r'])}
<p>L’ensemble dure ${h.P.tef.irn.ce.min + h.P.tef.irn.co.min + h.P.tef.irn.ee.min + h.P.tef.irn.eo.min} minutes d’épreuves, moins de la moitié du TEF Canada. Les sujets restent proches de la vie quotidienne en France : messages, motivations, appels, conseils à un proche. La ${h.src('cci_tef_irn_passation', 'page de la CCI sur la passation')} décrit le déroulement d’une session.</p>
<h2>La règle du niveau global</h2>
<p>Chaque épreuve reçoit un score ; le niveau global dépend ensuite de deux seuils, publiés sur la ${h.src('cci_tef_irn_results', 'page de la CCI sur les résultats')} :</p>
${h.table(['Niveau global', 'Trois épreuves au moins à', 'Épreuve la plus faible au moins à'], h.P.tef.irn.levels.map((l) => [String(l[0]), l[1], l[2]]), `Sous l’A2, le niveau est A1 si chaque épreuve atteint ${h.P.tef.irn.a1}.`, ['l', 'r', 'r'])}
<p>Concrètement, classez vos quatre scores. Le troisième meilleur décide du seuil atteint, et le plus faible ne doit pas descendre sous le second chiffre. Un candidat à ${h.num(450)}, ${h.num(430)}, ${h.num(410)} et ${h.num(370)} obtient le B2. Un candidat à ${h.num(450)}, ${h.num(430)}, ${h.num(395)} et ${h.num(390)} s’arrête au B1, alors que sa moyenne dépasse ${h.P.tef.irn.levels[0][1]}. Le mini-calculateur voisin travaille sur ces deux scores décisifs.</p>
<h2>Quel niveau pour quelle démarche</h2>
<p>Depuis le 1er janvier 2026, deux arrêtés du 22 décembre 2025 fixent les niveaux. Pour les titres de séjour, l’${h.src('jo_titres', 'arrêté sur les certifications linguistiques')} reconnaît le TCF et le TEF, et exige ${h.P.france.pluri} pour une première carte pluriannuelle et ${h.P.france.resident} pour une première carte de résident (pas après ${h.P.france.ageExempt} ans). Pour la nationalité, l’${h.src('jo_naturalisation', 'arrêté sur la naturalisation')} exige ${h.P.france.naturalisation} à l’écrit et à l’oral. Les pages ${h.a('residence-card-level', 'titre de séjour')} et ${h.a('naturalisation-b2', 'naturalisation')} entrent dans le détail.</p>
<h2>Avant de réserver</h2>
<p>Vérifiez que la session est bien un TEF IRN et non un TEF Canada : les deux portent le même nom et viennent du même organisateur, mais seul le TEF IRN vise les démarches françaises, l’attestation TEF Canada étant conçue pour être lue en NCLC par IRCC. Le TEF IRN plafonne en outre au B2. Il faut avoir plus de ${h.P.tef.minAge} ans, et chaque centre publie ses propres dates.</p>
<h2>Résultats et validité</h2>
<p>La CCI annonce les résultats en ${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés. L’attestation vaut ${h.P.tef.validityYears} ans, et les arrêtés exigent eux aussi une attestation de moins de ${h.P.france.validityYears} ans : ne passez pas le test trop longtemps avant le dépôt du dossier. Chaque centre fixe ses tarifs, et nous n’avons aucun prix confirmé du TEF IRN à citer.</p>
<h2>Se préparer sur ce site</h2>
<p>Nos banques d’entraînement suivent les formats, plus longs, du TEF Canada et du TCF Canada, mais les compétences sont les mêmes. L’${h.a('french-writing', 'entraînement à l’expression écrite')} compte vos mots face à un minimum, ce qui convient aux deux tâches écrites du TEF IRN, et la page du ${h.a('tef-tcf-cefr', 'niveau CECR')} convertit n’importe quel score TEF en niveau. La page ${h.a('tcf-irn', 'TCF IRN')} présente l’autre test reconnu.</p>`,
  },
});
