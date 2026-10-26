import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'tef-canada',
  group: 'scores',
  order: 12,
  tool: { kind: 'converter', props: { focus: 'tef' } },
  mini: { kind: 'mini:pace' },
  related: ['tef-canada-score', 'tef-mock', 'tcf-or-tef', 'test-cost', 'results-retake', 'citizenship-language'],
  sources: ['cci_tef_canada', 'cci_tef_canada_results', 'cci_tef_canada_attestation', 'cci_conditions', 'ircc_ee_lang', 'fee_af_edmonton'],
  en: {
    slug: 'tef-canada',
    nav: 'TEF Canada test',
    card: 'The four TEF Canada tests, their timing, the citizenship option, results, fees and validity.',
    title: 'TEF Canada test: format, timing, results and validity',
    description: 'TEF Canada test explained: four timed tests, the listening and speaking option for citizenship, how scores are set, result delays, fees and the 2-year rule.',
    h1: 'TEF Canada: what the test looks like and how it is scored',
    intro: 'The TEF Canada is the French test most Express Entry candidates sit. Here is each part, the clock you face, and what happens after the last task.',
    resume: (h) => `The TEF Canada is the French test of the CCI Paris Île-de-France that IRCC accepts for Express Entry and for citizenship. A full sitting has four tests taken on the same day: reading (${h.P.tef.canada.ce.q} questions in ${h.P.tef.canada.ce.min} minutes), listening (${h.P.tef.canada.co.q} questions in ${h.P.tef.canada.co.min} minutes), writing (${h.P.tef.canada.ee.min} minutes, two tasks of at least ${h.P.tef.canada.ee.a.words} and ${h.P.tef.canada.ee.b.words} words) and speaking (${h.P.tef.canada.eo.min} minutes, two role plays). Citizenship applicants only need the listening and speaking tests. Candidates must be over ${h.P.tef.minAge}, and about ${h.num(h.P.tef.centres)} centres in more than ${h.P.tef.countries} countries run the test, each one setting its own fee. Results arrive in digital form within ${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days and the score report stays valid for ${h.P.tef.validityYears} years from the date it is issued. You cannot sit the same test again within ${h.P.tef.retakeDays} days, and a review request must be made within ${h.P.tef.appealDays} days. Each score is then converted to an NCLC level per skill for IRCC.`,
    faqs: (h) => [
      { q: 'How long does a full TEF Canada sitting take?', a: `The four tests add up to ${h.P.tef.canada.ce.min + h.P.tef.canada.co.min + h.P.tef.canada.ee.min + h.P.tef.canada.eo.min} minutes of testing: ${h.P.tef.canada.ce.min} for reading, ${h.P.tef.canada.co.min} for listening, ${h.P.tef.canada.ee.min} for writing and ${h.P.tef.canada.eo.min} for the speaking interview. The CCI states that they are held on the same day. Breaks, check-in and identity checks come on top and depend on the centre, so ask yours for the full schedule of the day.` },
      { q: 'Can I take only some of the TEF Canada tests?', a: `For citizenship, yes: the CCI offers listening and speaking alone, which matches what IRCC assesses for that application. For Express Entry, IRCC needs a level in all four skills, so a candidate for permanent residence sits reading, writing, listening and speaking. Some centres price the two formats differently; one example is shown on the ${h.a('test-cost', 'cost page')}.` },
      { q: 'Who marks the TEF Canada writing and speaking tests?', a: `According to the CCI, each written and spoken performance is assessed by two markers. For reading and listening, every correct answer is worth one point and the raw total is then turned into a calibrated score on the 0 to 699 scale. That is why two candidates with the same number of correct answers on different versions can receive slightly different scores.` },
      { q: 'What can I do if my TEF Canada result looks wrong?', a: `The CCI accepts a request for review within ${h.P.tef.appealDays} days. The rules and the way to file it are described on the CCI pages listed below this article. Keep in mind that a review is not a new sitting: if you want a better level rather than a correction, the route is another test, at least ${h.P.tef.retakeDays} days after the previous sitting of the same test.` },
    ],
    body: (h) => `
<h2>The four tests at a glance</h2>
<p>The TEF Canada follows a fixed format published by the CCI Paris Île-de-France. Reading and listening are multiple-choice; writing and speaking are tasks you produce and that people mark.</p>
${h.table(['Test', 'Content', 'Time'], [
  ['Reading (compréhension écrite)', `${h.P.tef.canada.ce.q} questions`, `${h.P.tef.canada.ce.min} min`],
  ['Listening (compréhension orale)', `${h.P.tef.canada.co.q} questions`, `${h.P.tef.canada.co.min} min`],
  ['Writing (expression écrite)', `Task A: continue a news story, ${h.P.tef.canada.ee.a.words}+ words (${h.P.tef.canada.ee.a.min} min). Task B: argue a point of view, ${h.P.tef.canada.ee.b.words}+ words (${h.P.tef.canada.ee.b.min} min)`, `${h.P.tef.canada.ee.min} min`],
  ['Speaking (expression orale)', `Section A: ask for information (${h.P.tef.canada.eo.a} min). Section B: convince someone (${h.P.tef.canada.eo.b} min)`, `${h.P.tef.canada.eo.min} min`],
], 'TEF Canada format, CCI Paris Île-de-France presentation page, read on ' + h.date(h.P.retrieved_at) + '.', ['l', 'l', 'r'])}
<p>The pacing matters more than people expect. In reading you have ${h.num((h.P.tef.canada.ce.min * 60) / h.P.tef.canada.ce.q)} seconds per question on average; in listening the recordings set the rhythm. The small timer next to this article shows what is left per question once you keep a few minutes to check, and the ${h.a('tef-mock', 'TEF Canada mock sections')} put you under the real clock.</p>
<h2>Express Entry or citizenship: which tests you sit</h2>
<p>For permanent residence through Express Entry, IRCC reads four levels, one per skill, and most programs set a minimum in each of them. That means a full sitting. For a citizenship application, IRCC only assesses listening and speaking, and the CCI offers a TEF Canada limited to those two tests. The ${h.a('citizenship-language', 'citizenship language page')} gives the level IRCC accepts from each test.</p>
<h2>Who can register, and where</h2>
<p>The ${h.src('cci_conditions', 'CCI registration conditions')} require candidates to be over ${h.P.tef.minAge}. The test is run in about ${h.num(h.P.tef.centres)} approved centres in more than ${h.P.tef.countries} countries, and each centre sets its own dates and price. As a dated example, the ${h.src('fee_af_edmonton', 'Alliance française d’Edmonton page')} listed ${h.cad(h.P.fees.afEdmonton.full)} for the four tests and ${h.cad(h.P.fees.afEdmonton.ls)} for listening and speaking when we read it on ${h.date(h.P.fees.afEdmonton.read)}. This site is independent: registration is done with a centre, never here.</p>
<h2>How the score is built</h2>
<p>In the multiple-choice tests each right answer earns one point, then the raw total is converted to a score between 0 and 699. Writing and speaking are each judged by two markers. Since 11 December 2023, each of the four scores has its own conversion chart to the NCLC, which is why the ${h.a('tef-canada-score', 'TEF Canada score page')} shows four columns rather than one.</p>
<h2>Results, validity and a second attempt</h2>
<p>The CCI announces results within ${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days, in digital form. The score report is valid for ${h.P.tef.validityYears} years from its date of issue, and IRCC itself asks for results under ${h.P.ee.validityYears} years old both when you create the profile and when you send the permanent residence application, so the date you sit the test is a planning decision. The ${h.src('cci_tef_canada_attestation', 'CCI attestation page')} adds one constraint: the same test cannot be taken again within ${h.P.tef.retakeDays} days. The ${h.a('results-retake', 'results and retake page')} turns those rules into dates.</p>
<h2>Is the TEF Canada the right choice?</h2>
<p>IRCC treats the TEF Canada and the TCF Canada the same way: both convert to an NCLC level per skill and both count for Express Entry and citizenship. The differences lie in the format, the marking of the expression tests and the waiting period between sittings, compared side by side on the ${h.a('tcf-or-tef', 'TCF or TEF page')}.</p>`,
  },
  fr: {
    slug: 'tef-canada',
    nav: 'Le test TEF Canada',
    card: 'Les quatre épreuves du TEF Canada, leur durée, l’option citoyenneté, les résultats, le prix et la validité.',
    title: 'TEF Canada : épreuves, durée, résultats et validité 2026',
    description: 'TEF Canada : quatre épreuves chronométrées, la formule citoyenneté à l’oral, la notation, les délais de résultats, le prix fixé par centre, la validité.',
    h1: 'Le TEF Canada, épreuve par épreuve',
    intro: 'Le TEF Canada est le test de français passé par la plupart des candidats à Entrée express. Voici son déroulement, le chronomètre de chaque partie et la suite.',
    resume: (h) => `Conçu par la CCI Paris Île-de-France, le TEF Canada est reconnu par IRCC pour Entrée express comme pour la citoyenneté. Une session complète réunit quatre épreuves le même jour : compréhension écrite (${h.P.tef.canada.ce.q} questions, ${h.P.tef.canada.ce.min} minutes), compréhension orale (${h.P.tef.canada.co.q} questions, ${h.P.tef.canada.co.min} minutes), expression écrite (${h.P.tef.canada.ee.min} minutes pour deux textes d’au moins ${h.P.tef.canada.ee.a.words} et ${h.P.tef.canada.ee.b.words} mots) et expression orale (${h.P.tef.canada.eo.min} minutes, deux mises en situation). Pour la citoyenneté, seules la compréhension et l’expression orales sont exigées. Il faut avoir plus de ${h.P.tef.minAge} ans ; environ ${h.num(h.P.tef.centres)} centres répartis dans plus de ${h.P.tef.countries} pays organisent le test et chacun fixe son tarif. Les résultats, numériques, arrivent en ${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés, et l’attestation vaut ${h.P.tef.validityYears} ans à partir de son émission. Une même épreuve ne peut pas être repassée dans les ${h.P.tef.retakeDays} jours, et un recours se dépose dans les ${h.P.tef.appealDays} jours. Chaque score devient ensuite un niveau NCLC pour IRCC.`,
    faqs: (h) => [
      { q: 'Combien de temps dure une session complète du TEF Canada ?', a: `Les quatre épreuves totalisent ${h.P.tef.canada.ce.min + h.P.tef.canada.co.min + h.P.tef.canada.ee.min + h.P.tef.canada.eo.min} minutes : ${h.P.tef.canada.ce.min} pour la compréhension écrite, ${h.P.tef.canada.co.min} pour la compréhension orale, ${h.P.tef.canada.ee.min} pour l’expression écrite et ${h.P.tef.canada.eo.min} pour l’entretien oral. La CCI indique qu’elles se passent le même jour. L’accueil, le contrôle d’identité et les pauses s’ajoutent selon le centre : demandez-lui le programme de la journée.` },
      { q: 'Peut-on ne passer qu’une partie du TEF Canada ?', a: `Oui pour la citoyenneté : la CCI propose la compréhension et l’expression orales seules, ce qui correspond à ce qu’évalue IRCC pour cette demande. Pour Entrée express, IRCC veut un niveau dans les quatre compétences : le candidat à la résidence permanente passe donc toutes les épreuves. Les centres facturent souvent les deux formules différemment ; un exemple figure sur la page du ${h.a('test-cost', 'prix du test')}.` },
      { q: 'Qui corrige l’expression écrite et orale du TEF Canada ?', a: `Selon la CCI, chaque production écrite ou orale est évaluée par deux correcteurs. En compréhension, chaque bonne réponse vaut un point, puis le total brut est transformé en score étalonné sur l’échelle de 0 à 699. Deux candidats ayant le même nombre de bonnes réponses sur des versions différentes peuvent donc obtenir des scores légèrement différents.` },
      { q: 'Que faire si mon résultat au TEF Canada semble erroné ?', a: `La CCI accepte une demande de recours dans les ${h.P.tef.appealDays} jours ; les modalités figurent sur ses pages, citées en bas de cet article. Un recours n’est pas une nouvelle passation : pour viser un meilleur niveau plutôt qu’une correction, il faut repasser l’épreuve, au moins ${h.P.tef.retakeDays} jours après la précédente passation de cette même épreuve.` },
    ],
    body: (h) => `
<h2>Le format en un tableau</h2>
<p>La CCI Paris Île-de-France publie un format fixe. Les deux compréhensions sont des questionnaires à choix multiple ; les deux expressions sont des productions notées par des correcteurs.</p>
${h.table(['Épreuve', 'Contenu', 'Durée'], [
  ['Compréhension écrite', `${h.P.tef.canada.ce.q} questions`, `${h.P.tef.canada.ce.min} min`],
  ['Compréhension orale', `${h.P.tef.canada.co.q} questions`, `${h.P.tef.canada.co.min} min`],
  ['Expression écrite', `Section A : rédiger la suite d’un fait divers, ${h.P.tef.canada.ee.a.words} mots minimum (${h.P.tef.canada.ee.a.min} min). Section B : défendre un point de vue, ${h.P.tef.canada.ee.b.words} mots minimum (${h.P.tef.canada.ee.b.min} min)`, `${h.P.tef.canada.ee.min} min`],
  ['Expression orale', `Section A : obtenir des informations (${h.P.tef.canada.eo.a} min). Section B : convaincre un interlocuteur (${h.P.tef.canada.eo.b} min)`, `${h.P.tef.canada.eo.min} min`],
], 'Format du TEF Canada d’après la page de présentation de la CCI Paris Île-de-France, lue le ' + h.date(h.P.retrieved_at) + '.', ['l', 'l', 'r'])}
<p>Le rythme surprend souvent. En compréhension écrite, la moyenne est de ${h.num((h.P.tef.canada.ce.min * 60) / h.P.tef.canada.ce.q)} secondes par question ; en compréhension orale, ce sont les enregistrements qui imposent la cadence. Le petit calculateur à côté de l’article indique le temps par question une fois gardées quelques minutes de relecture, et les ${h.a('tef-mock', 'examens blancs du TEF Canada')} vous placent face au vrai chronomètre.</p>
<h2>Résidence permanente ou citoyenneté : quelles épreuves passer</h2>
<p>Pour la résidence permanente par Entrée express, IRCC lit quatre niveaux, un par compétence, et la plupart des programmes posent un minimum dans chacun : session complète obligatoire. Pour la citoyenneté, IRCC n’évalue que l’écoute et l’oral, et la CCI propose un TEF Canada réduit à ces deux épreuves. La page sur le ${h.a('citizenship-language', 'test de langue pour la citoyenneté')} précise le niveau retenu pour chaque test.</p>
<h2>Conditions d’inscription et centres</h2>
<p>Les ${h.src('cci_conditions', 'conditions d’inscription de la CCI')} imposent d’avoir plus de ${h.P.tef.minAge} ans. Le test est organisé dans environ ${h.num(h.P.tef.centres)} centres agréés, dans plus de ${h.P.tef.countries} pays, et chacun fixe ses dates et son prix. À titre d’exemple daté, la ${h.src('fee_af_edmonton', 'page de l’Alliance française d’Edmonton')} affichait ${h.cad(h.P.fees.afEdmonton.full)} pour les quatre épreuves et ${h.cad(h.P.fees.afEdmonton.ls)} pour l’oral seul lors de notre lecture du ${h.date(h.P.fees.afEdmonton.read)}. Ce site est indépendant : l’inscription se fait auprès d’un centre, jamais ici.</p>
<h2>Comment le score est calculé</h2>
<p>Dans les questionnaires, chaque bonne réponse rapporte un point ; le total brut est ensuite converti en score de 0 à 699. Chaque expression est appréciée par deux correcteurs. Depuis le 11 décembre 2023, chacune des quatre épreuves a sa propre grille de passage au NCLC : c’est pourquoi la page du ${h.a('tef-canada-score', 'score TEF Canada')} présente quatre colonnes.</p>
<h2>Résultats, validité et nouvelle tentative</h2>
<p>La CCI annonce des résultats sous ${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés, sous forme numérique. L’attestation vaut ${h.P.tef.validityYears} ans à compter de son émission, et IRCC exige des résultats de moins de ${h.P.ee.validityYears} ans à la création du profil puis au dépôt de la demande de résidence permanente : la date du test se choisit donc avec soin. La ${h.src('cci_tef_canada_attestation', 'page de la CCI sur l’attestation')} ajoute une contrainte : impossible de repasser la même épreuve avant ${h.P.tef.retakeDays} jours. La page ${h.a('results-retake', 'résultats et nouvelle passation')} transforme ces règles en dates.</p>
<h2>Le TEF Canada est-il le bon choix ?</h2>
<p>IRCC traite le TEF Canada et le TCF Canada de la même façon : chacun se convertit en NCLC par compétence et vaut pour Entrée express comme pour la citoyenneté. Ce qui les distingue, c’est le format, la notation des expressions et le délai entre deux passations, comparés point par point sur la page ${h.a('tcf-or-tef', 'TCF ou TEF')}.</p>`,
  },
});
