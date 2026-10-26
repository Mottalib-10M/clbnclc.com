import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'residence-card-level',
  group: 'france',
  order: 76,
  tool: { kind: 'level', props: { program: 'frResident' } },
  mini: { kind: 'mini:irn' },
  related: ['tef-irn', 'tcf-irn', 'naturalisation-b2', 'tef-tcf-cefr', 'which-level'],
  sources: ['jo_titres', 'sp_pluri', 'sp_resident', 'cci_tef_irn_results', 'fei_tcf_manual', 'coe_cefr'],
  en: {
    slug: 'france-residence-card-french',
    nav: 'Residence card: French level',
    card: 'The French level for a first multi-year card (A2) and a first resident card (B1) since 2026, and the tests recognised.',
    title: 'Residence card French level: A2 and B1 required in 2026',
    description: 'French level for a residence card in France since 1 January 2026: A2 for a first multi-year card, B1 for a first resident card, recognised tests, scores.',
    h1: 'French level for a residence card in France since 2026',
    intro: 'France now asks a certified French level for a first multi-year card and a first resident card. Pick the card in the tool to see the level, then check your scores.',
    resume: (h) => `Since 1 January 2026, foreign nationals in France must prove a minimum level of French for two residence cards. A first multi-year residence card (carte de séjour pluriannuelle) requires level ${h.P.france.pluri} of the Common European Framework, and a first resident card (carte de résident, valid ten years) requires level ${h.P.france.resident}; the resident card requirement does not apply after age ${h.P.france.ageExempt}. The rules come from an order of 22 December 2025, published in the Journal officiel on 26 December 2025, which recognises two certifications: the TCF of France Éducation international and the TEF of the CCI Paris Île-de-France. Service-Public describes the same levels. On the TEF IRN, the CCI sets the overall level with two thresholds: ${h.P.tef.irn.levels[2][1]} in three tests and ${h.P.tef.irn.levels[2][2]} in the weakest for ${h.P.france.pluri}, ${h.P.tef.irn.levels[1][1]} and ${h.P.tef.irn.levels[1][2]} for ${h.P.france.resident}. On the TCF scale, ${h.P.france.resident} starts at ${h.P.tcf.cecr[3][1]} in comprehension and ${h.P.tcf.cecr20[3][1]} out of 20 in expression. Naturalisation is a separate procedure and asks ${h.P.france.naturalisation}.`,
    faqs: (h) => [
      { q: 'Does the A2 requirement apply when I renew a multi-year card?', a: 'The order and Service-Public describe the level for a first multi-year card and a first resident card. This site does not cover renewals or the other permits, because we have not verified their language rules on an official page. Check the Service-Public page for your exact situation before booking a test.' },
      { q: 'I am 66: do I need B1 for a resident card?', a: `No. Service-Public states that the B1 requirement for the resident card does not apply after age ${h.P.france.ageExempt}. This exemption is specific to the resident card: it does not exist for naturalisation, where the only exemptions concern health or disability and refugees or stateless persons over ${h.P.france.refugeeAge}.` },
      { q: 'Can I use any French test for my residence card?', a: 'No. The order of 22 December 2025 recognises two certifications for residence cards: the TCF, from France Éducation international, and the TEF, from the CCI Paris Île-de-France. A certificate from another test, or a school report, is not on that list. Both organisers have versions aimed at residence and nationality: the TCF IRN and the TEF IRN.' },
      { q: 'What happens if my TEF IRN shows one weak test?', a: `The CCI rule leaves room for one weaker test. For B1, three tests at ${h.P.tef.irn.levels[1][1]} or more and the fourth at ${h.P.tef.irn.levels[1][2]} or more are enough. Below ${h.P.tef.irn.levels[1][2]} in the weakest test, the overall level drops to A2 even if the other three are high. The mini-tool on this page checks that rule.` },
    ],
    body: (h) => `
<h2>The levels, card by card</h2>
${h.table(['Card (first application)', 'Level since 1 January 2026', 'Note'], [
  [h.src('sp_pluri', 'Multi-year residence card'), h.P.france.pluri, ''],
  [h.src('sp_resident', 'Resident card (10 years)'), h.P.france.resident, `not required after age ${h.P.france.ageExempt}`],
  ['For comparison: naturalisation', h.P.france.naturalisation, 'written and oral'],
], 'Source: order of 22 December 2025 (JO 26 December 2025) and Service-Public.fr.', ['l', 'r', 'l'])}
<p>On the ${h.src('coe_cefr', 'Council of Europe global scale')}, A2 covers simple, routine exchanges on familiar matters; B1 covers most everyday situations and giving brief reasons for an opinion. The tool above shows the level each French procedure asks; the ${h.src('jo_titres', 'order on residence card certifications')} is the legal reference.</p>
<h2>Two certifications, two families of tests</h2>
<p>The order names the TCF of France Éducation international and the TEF of the CCI Paris Île-de-France. Each organiser has a version for residence and nationality: the ${h.a('tef-irn', 'TEF IRN')} and the ${h.a('tcf-irn', 'TCF IRN')}. The TEF IRN format is published by the CCI (four short tests, ${h.P.tef.irn.ce.min + h.P.tef.irn.co.min + h.P.tef.irn.ee.min + h.P.tef.irn.eo.min} minutes in total). For the TCF IRN, a new format has been mentioned since 2025 that we could not confirm on an official source.</p>
<h2>A2 and B1 in TEF IRN scores</h2>
<p>The CCI does not average the four scores; it applies a double threshold, explained on its ${h.src('cci_tef_irn_results', 'results page')}:</p>
${h.table(['Level', 'Three tests at least', 'Weakest test at least', 'Card it covers'], [
  [h.P.tef.irn.levels[1][0], h.P.tef.irn.levels[1][1], h.P.tef.irn.levels[1][2], 'resident card and multi-year card'],
  [h.P.tef.irn.levels[2][0], h.P.tef.irn.levels[2][1], h.P.tef.irn.levels[2][2], 'multi-year card'],
], 'TEF IRN overall level thresholds (CCI Paris Île-de-France).', ['l', 'r', 'r', 'l'])}
<p>Example: ${h.num(330)}, ${h.num(315)}, ${h.num(302)} and ${h.num(275)} gives B1; the same profile with ${h.num(260)} in the weakest test gives A2, enough for a multi-year card but not for a resident card.</p>
<h2>A2 and B1 on the TCF scale</h2>
<p>The ${h.src('fei_tcf_manual', 'TCF candidate manual')} places A2 from ${h.P.tcf.cecr[4][1]} and B1 from ${h.P.tcf.cecr[3][1]} in the comprehension tests, and from ${h.P.tcf.cecr20[4][1]} and ${h.P.tcf.cecr20[3][1]} out of 20 in the expression tests. How the TCF IRN combines its tests into an overall level is not confirmed here: the certificate states it.</p>
<h2>From booking to filing</h2>
<p>Registration is done with an approved centre of the organiser you choose; this site is independent and takes no bookings. Each centre sets its own dates and fee, and we have no confirmed TEF IRN or TCF IRN price to quote. For the TEF IRN, the CCI announces results within ${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days, so leave a margin of a few weeks between the test and the appointment where you file your application. Keep the certificate itself: it is the document that proves the level.</p>
<h2>Timing your test</h2>
<p>A test certificate is valid ${h.P.france.validityYears} years. Sit the test once you know when you will file, not years ahead. If you plan to apply for French nationality later, note that it asks ${h.P.france.naturalisation} in four tests on the same day, under stricter conditions explained on the ${h.a('naturalisation-b2', 'naturalisation page')}; a B1 certificate for your resident card will not be enough then. The ${h.a('tef-tcf-cefr', 'CEFR page')} converts any TEF or TCF score into a level.</p>`,
  },
  fr: {
    slug: 'titre-de-sejour-niveau-francais',
    nav: 'Titre de séjour : niveau',
    card: 'Le niveau de français exigé pour une première carte pluriannuelle (A2) et une première carte de résident (B1) depuis 2026.',
    title: 'Titre de séjour et niveau de français : A2 et B1 en 2026',
    description: 'Niveau de français d’un titre de séjour depuis le 1er janvier 2026 : A2 pour une première carte pluriannuelle, B1 pour une carte de résident, tests admis.',
    h1: 'Titre de séjour : le niveau de français exigé depuis 2026',
    intro: 'La France exige désormais un niveau de français certifié pour une première carte pluriannuelle et une première carte de résident. Choisissez la carte dans l’outil, puis vérifiez vos scores.',
    resume: (h) => `Depuis le 1er janvier 2026, les étrangers en France doivent prouver un niveau minimum de français pour deux titres de séjour. Une première carte de séjour pluriannuelle exige le niveau ${h.P.france.pluri} du Cadre européen commun de référence, et une première carte de résident, valable dix ans, le niveau ${h.P.france.resident} ; cette dernière exigence ne s’applique plus après ${h.P.france.ageExempt} ans. Ces règles viennent d’un arrêté du 22 décembre 2025, publié au Journal officiel du 26 décembre 2025, qui reconnaît deux certifications : le TCF de France Éducation international et le TEF de la CCI Paris Île-de-France. Service-Public reprend les mêmes niveaux. Au TEF IRN, la CCI calcule le niveau global avec deux seuils : ${h.P.tef.irn.levels[2][1]} dans trois épreuves et ${h.P.tef.irn.levels[2][2]} dans la plus faible pour l’${h.P.france.pluri}, ${h.P.tef.irn.levels[1][1]} et ${h.P.tef.irn.levels[1][2]} pour le ${h.P.france.resident}. Sur l’échelle du TCF, le ${h.P.france.resident} commence à ${h.P.tcf.cecr[3][1]} en compréhension et à ${h.P.tcf.cecr20[3][1]} sur 20 en expression. La naturalisation est une démarche distincte, qui exige le ${h.P.france.naturalisation}.`,
    faqs: (h) => [
      { q: 'L’A2 s’applique-t-il au renouvellement d’une carte pluriannuelle ?', a: 'L’arrêté et Service-Public décrivent le niveau exigé pour une première carte pluriannuelle et une première carte de résident. Ce site ne traite ni des renouvellements ni des autres titres, faute d’avoir vérifié leurs règles linguistiques sur une page officielle. Consultez la fiche Service-Public correspondant à votre situation avant de réserver un test.' },
      { q: 'J’ai 66 ans : dois-je prouver le B1 pour une carte de résident ?', a: `Non. Service-Public précise que l’exigence du B1 pour la carte de résident ne s’applique pas après ${h.P.france.ageExempt} ans. Cette dispense est propre à la carte de résident : elle n’existe pas pour la naturalisation, où les seules dispenses concernent la santé ou le handicap, et les réfugiés ou apatrides de plus de ${h.P.france.refugeeAge} ans.` },
      { q: 'Peut-on présenter n’importe quel test de français pour un titre de séjour ?', a: 'Non. L’arrêté du 22 décembre 2025 reconnaît deux certifications pour les titres de séjour : le TCF, de France Éducation international, et le TEF, de la CCI Paris Île-de-France. Une attestation d’un autre test, ou un bulletin de cours, ne figure pas sur cette liste. Chaque organisateur propose une version tournée vers le séjour et la nationalité : le TCF IRN et le TEF IRN.' },
      { q: 'Que se passe-t-il si mon TEF IRN montre une épreuve faible ?', a: `Le calcul de la CCI laisse une marge pour une épreuve en retrait. Pour le B1, trois épreuves à ${h.P.tef.irn.levels[1][1]} ou plus et la quatrième à ${h.P.tef.irn.levels[1][2]} ou plus suffisent. Sous ${h.P.tef.irn.levels[1][2]} dans l’épreuve la plus faible, le niveau global retombe à l’A2, même si les trois autres sont élevées. Le mini-calculateur de cette page vérifie cette règle.` },
    ],
    body: (h) => `
<h2>Le niveau, carte par carte</h2>
${h.table(['Titre (première demande)', 'Niveau depuis le 1er janvier 2026', 'Remarque'], [
  [h.src('sp_pluri', 'Carte de séjour pluriannuelle'), h.P.france.pluri, ''],
  [h.src('sp_resident', 'Carte de résident (10 ans)'), h.P.france.resident, `non exigé après ${h.P.france.ageExempt} ans`],
  ['Pour comparaison : naturalisation', h.P.france.naturalisation, 'écrit et oral'],
], 'Source : arrêté du 22 décembre 2025 (JO du 26 décembre 2025) et Service-Public.fr.', ['l', 'r', 'l'])}
<p>Sur l’${h.src('coe_cefr', 'échelle globale du Conseil de l’Europe')}, l’A2 couvre les échanges simples et habituels sur des sujets familiers ; le B1, la plupart des situations de la vie courante et la capacité à justifier brièvement un avis. L’outil ci-dessus indique le niveau de chaque démarche française ; l’${h.src('jo_titres', 'arrêté sur les certifications linguistiques')} fait référence.</p>
<h2>Deux certifications, deux familles de tests</h2>
<p>L’arrêté cite le TCF de France Éducation international et le TEF de la CCI Paris Île-de-France. Chaque organisateur a une version pour le séjour et la nationalité : le ${h.a('tef-irn', 'TEF IRN')} et le ${h.a('tcf-irn', 'TCF IRN')}. Le format du TEF IRN est publié par la CCI (quatre épreuves courtes, ${h.P.tef.irn.ce.min + h.P.tef.irn.co.min + h.P.tef.irn.ee.min + h.P.tef.irn.eo.min} minutes au total). Pour le TCF IRN, un nouveau format est évoqué depuis 2025, sans que nous ayons pu le confirmer sur une source officielle.</p>
<h2>L’A2 et le B1 en scores TEF IRN</h2>
<p>La CCI ne fait pas la moyenne des quatre scores ; elle applique un double seuil, expliqué sur sa ${h.src('cci_tef_irn_results', 'page des résultats')} :</p>
${h.table(['Niveau', 'Trois épreuves au moins à', 'Épreuve la plus faible au moins à', 'Titre couvert'], [
  [h.P.tef.irn.levels[1][0], h.P.tef.irn.levels[1][1], h.P.tef.irn.levels[1][2], 'carte de résident et carte pluriannuelle'],
  [h.P.tef.irn.levels[2][0], h.P.tef.irn.levels[2][1], h.P.tef.irn.levels[2][2], 'carte pluriannuelle'],
], 'Seuils du niveau global au TEF IRN (CCI Paris Île-de-France).', ['l', 'r', 'r', 'l'])}
<p>Exemple : ${h.num(330)}, ${h.num(315)}, ${h.num(302)} et ${h.num(275)} donnent le B1 ; le même profil avec ${h.num(260)} dans l’épreuve la plus faible donne l’A2, suffisant pour une carte pluriannuelle mais pas pour une carte de résident.</p>
<h2>L’A2 et le B1 sur l’échelle du TCF</h2>
<p>Le ${h.src('fei_tcf_manual', 'manuel du candidat TCF')} place l’A2 à partir de ${h.P.tcf.cecr[4][1]} et le B1 à partir de ${h.P.tcf.cecr[3][1]} dans les épreuves de compréhension, et à partir de ${h.P.tcf.cecr20[4][1]} et ${h.P.tcf.cecr20[3][1]} sur 20 dans les épreuves d’expression. La manière dont le TCF IRN combine ses épreuves en niveau global n’est pas confirmée ici : l’attestation l’indique.</p>
<h2>De l’inscription au dépôt du dossier</h2>
<p>L’inscription se fait auprès d’un centre agréé de l’organisateur choisi ; ce site est indépendant et ne prend aucune réservation. Chaque centre fixe ses dates et son tarif, et nous n’avons aucun prix confirmé du TEF IRN ou du TCF IRN à citer. Pour le TEF IRN, la CCI annonce les résultats en ${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés : gardez quelques semaines de marge entre le test et le rendez-vous de dépôt. Conservez l’attestation elle-même, c’est elle qui prouve le niveau.</p>
<h2>Bien choisir la date du test</h2>
<p>Une attestation vaut ${h.P.france.validityYears} ans. Passez le test quand vous savez à quel moment vous déposerez le dossier, pas des années avant. Si vous envisagez plus tard la nationalité française, sachez qu’elle exige le ${h.P.france.naturalisation} dans quatre épreuves passées le même jour, à des conditions plus strictes détaillées sur la page ${h.a('naturalisation-b2', 'naturalisation')} : une attestation B1 obtenue pour la carte de résident ne suffira pas. La page du ${h.a('tef-tcf-cefr', 'niveau CECR')} convertit n’importe quel score TEF ou TCF.</p>`,
  },
});
