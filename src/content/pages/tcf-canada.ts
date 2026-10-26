import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'tcf-canada',
  group: 'scores',
  order: 16,
  tool: { kind: 'converter', props: { focus: 'tcf' } },
  mini: { kind: 'mini:pace' },
  related: ['tcf-canada-score', 'tcf-mock', 'tcf-or-tef', 'test-cost', 'results-retake', 'french-writing'],
  sources: ['fei_tcf_manual', 'fei_tcf_canada', 'ircc_ee_lang', 'ircc_equiv', 'fee_usherbrooke'],
  en: {
    slug: 'tcf-canada',
    nav: 'TCF Canada test',
    card: 'The TCF Canada in four compulsory tests: timing, tasks, word counts, marking, results and retakes.',
    title: 'TCF Canada test: four tests, timing, marking and results',
    description: 'TCF Canada test in detail: four compulsory tests, the three writing and speaking tasks, word ranges, the two marking scales, result delays and retake rules.',
    h1: 'TCF Canada: the four tests, minute by minute',
    intro: 'The TCF Canada is France Éducation international’s version of the TCF for Canadian immigration. Here is what each test asks and how long you get.',
    resume: (h) => `The TCF Canada is the version of the Test de connaissance du français that France Éducation international runs for Canadian immigration, and IRCC accepts it for Express Entry and citizenship. According to the candidate manual (version J, September 2024), the four tests are all compulsory and last ${h.num(Math.floor(h.P.tcf.canada.totalMin / 60))} h ${h.num(h.P.tcf.canada.totalMin % 60)} in total: listening (${h.P.tcf.canada.co.q} questions, ${h.P.tcf.canada.co.min} minutes), reading (${h.P.tcf.canada.ce.q} questions, ${h.P.tcf.canada.ce.min} minutes), writing (${h.P.tcf.canada.ee.tasks} tasks in ${h.P.tcf.canada.ee.min} minutes) and speaking (${h.P.tcf.canada.eo.tasks} tasks in ${h.P.tcf.canada.eo.min} minutes). Each comprehension question offers ${h.P.tcf.choices} choices with one right answer, difficulty rises as you go, and recordings are played only once. Comprehension is scored from 100 to 699 and expression is marked out of 20. Results come within ${h.P.tcf.resultsDaysComputer} working days on computer or ${h.P.tcf.resultsDaysPaper} on paper, the report is valid ${h.P.tcf.validityYears} years, and ${h.P.tcf.retakeDays} days must pass between two sittings. Each skill then converts to an NCLC level.`,
    faqs: (h) => [
      { q: 'How many words do the TCF Canada writing tasks ask for?', a: `The manual sets a range for each of the three tasks: ${h.P.tcf.canada.ee.words[0][0]} to ${h.P.tcf.canada.ee.words[0][1]} words for the first, ${h.P.tcf.canada.ee.words[1][0]} to ${h.P.tcf.canada.ee.words[1][1]} for the second and ${h.P.tcf.canada.ee.words[2][0]} to ${h.P.tcf.canada.ee.words[2][1]} for the third, all within ${h.P.tcf.canada.ee.min} minutes. Unlike the TEF Canada, there is an upper limit as well as a floor, so writing far more is not a safe strategy.` },
      { q: 'How is the TCF Canada speaking test organised?', a: `It lasts ${h.P.tcf.canada.eo.min} minutes in three parts: a guided interview of ${h.P.tcf.canada.eo.t1} minutes, an interaction of ${h.num(h.P.tcf.canada.eo.t2, 1)} minutes for which you get ${h.P.tcf.canada.eo.t2prep} minutes of preparation, and ${h.num(h.P.tcf.canada.eo.t3, 1)} minutes in which you express a point of view. The ${h.a('french-speaking', 'speaking practice page')} has a timer set to these durations.` },
      { q: 'Can I skip a TCF Canada test I do not need?', a: `The candidate manual describes the four TCF Canada tests as compulsory, unlike the TEF Canada, where the CCI offers a listening and speaking option for citizenship. Check with France Éducation international or your centre before registering if you only need a citizenship result, since this site cannot confirm any reduced format for the TCF Canada.` },
      { q: 'Why can I hear each TCF Canada recording only once?', a: `That is the rule stated in the candidate manual for the listening test: each recording is played a single time, and the questions get harder as the test goes on. Training with one hearing only is the closest you can get to the real conditions; the ${h.a('french-listening', 'listening practice')} on this site lets you do exactly that.` },
    ],
    body: (h) => `
<h2>The format, test by test</h2>
<p>France Éducation international describes the TCF Canada in its candidate manual. The four tests are compulsory and run in this order of size:</p>
${h.table(['Test', 'What you do', 'Time'], [
  ['Listening', `${h.P.tcf.canada.co.q} questions, ${h.P.tcf.choices} choices each, recordings played once`, `${h.P.tcf.canada.co.min} min`],
  ['Reading', `${h.P.tcf.canada.ce.q} questions, ${h.P.tcf.choices} choices each`, `${h.P.tcf.canada.ce.min} min`],
  ['Writing', `Task 1: ${h.P.tcf.canada.ee.words[0][0]}–${h.P.tcf.canada.ee.words[0][1]} words. Task 2: ${h.P.tcf.canada.ee.words[1][0]}–${h.P.tcf.canada.ee.words[1][1]} words. Task 3: ${h.P.tcf.canada.ee.words[2][0]}–${h.P.tcf.canada.ee.words[2][1]} words`, `${h.P.tcf.canada.ee.min} min`],
  ['Speaking', `Guided interview (${h.P.tcf.canada.eo.t1} min), interaction with ${h.P.tcf.canada.eo.t2prep} min of preparation (${h.num(h.P.tcf.canada.eo.t2, 1)} min), point of view (${h.num(h.P.tcf.canada.eo.t3, 1)} min)`, `${h.P.tcf.canada.eo.min} min`],
], 'TCF Canada format, France Éducation international candidate manual, version J (September 2024).', ['l', 'l', 'r'])}
<p>The total is ${h.P.tcf.canada.totalMin} minutes of testing. In reading, that leaves ${h.num((h.P.tcf.canada.ce.min * 60) / h.P.tcf.canada.ce.q)} seconds per question on average; the timer beside this article recalculates it once you set aside a few minutes for checking.</p>
<h2>How the questions behave</h2>
<p>Every multiple-choice question has ${h.P.tcf.choices} options and exactly one correct answer. The manual says difficulty increases through the test, which means the last questions are worth the time you saved on the first ones. In listening, nothing is replayed: you hear each document once and answer. This is the main habit to build, and the ${h.a('tcf-mock', 'TCF Canada mock sections')} reproduce the count of questions and the time limit, then give a raw result and an approximate indication of our own, never an official score.</p>
<h2>Marking: two scales on one report</h2>
<p>The comprehension tests are scored from 100 to 699. Writing and speaking receive a mark out of 20. IRCC converts each of the four to an NCLC level with its own chart, which is set out on the ${h.a('tcf-canada-score', 'TCF Canada score page')}. In practice, NCLC ${h.P.ee.fsw} asks ${h.range('tcf', 'R', 7).split('–')[0]} in reading, ${h.range('tcf', 'L', 7).split('–')[0]} in listening and ${h.P.tests.tcf.W[3][1]} out of 20 in each expression test.</p>
<h2>Registration, fee and versions</h2>
<p>The TCF exists in several versions (TCF TP, TCF IRN, TCF Québec and TCF Canada), so check that your booking says TCF Canada before you pay. Registration goes through approved centres, listed on the ${h.src('fei_tcf_canada', 'France Éducation international TCF Canada page')}. Each centre sets its own price. As a dated example, the ${h.src('fee_usherbrooke', 'Université de Sherbrooke language centre')} listed ${h.cad(h.P.fees.usherbrooke.tcfCanada)} when we read its page on ${h.date(h.P.fees.usherbrooke.read)}. This site is independent and takes no registrations.</p>
<h2>Results, validity and the gap between sittings</h2>
<p>The manual announces results within ${h.P.tcf.resultsDaysComputer} working days for a computer sitting and ${h.P.tcf.resultsDaysPaper} for a paper one. The report is valid for ${h.P.tcf.validityYears} years, matching IRCC's requirement that Express Entry results be under ${h.P.ee.validityYears} years old at profile creation and at the permanent residence application. If you want to try again, ${h.P.tcf.retakeDays} days must separate the two sittings; the ${h.a('results-retake', 'results and retake page')} counts the days for you.</p>
<h2>TCF Canada or TEF Canada?</h2>
<p>For IRCC both tests are equal. The TCF Canada has three writing tasks with word ranges, three short speaking tasks and a ${h.P.tcf.retakeDays}-day gap; the TEF Canada has two longer tasks in each expression test and a ${h.P.tef.retakeDays}-day rule per test. The ${h.a('tcf-or-tef', 'TCF or TEF comparison')} weighs those differences.</p>`,
  },
  fr: {
    slug: 'tcf-canada',
    nav: 'Le test TCF Canada',
    card: 'Le TCF Canada en quatre épreuves obligatoires : durées, tâches, nombre de mots, notation, résultats.',
    title: 'TCF Canada : quatre épreuves, durée, notation, résultats',
    description: 'TCF Canada en pratique : quatre épreuves obligatoires, trois tâches à l’écrit et à l’oral, fourchettes de mots, double notation, délais et nouvelle passation.',
    h1: 'Le TCF Canada, minute par minute',
    intro: 'Le TCF Canada est la version du TCF que France Éducation international destine à l’immigration au Canada. Voici ce que demande chaque épreuve, et en combien de temps.',
    resume: (h) => `Version du Test de connaissance du français destinée à l’immigration au Canada, le TCF Canada est administré par France Éducation international et accepté par IRCC pour Entrée express et la citoyenneté. Le manuel du candidat (version J, septembre 2024) décrit quatre épreuves obligatoires, d’une durée totale de ${h.num(Math.floor(h.P.tcf.canada.totalMin / 60))} h ${h.num(h.P.tcf.canada.totalMin % 60)} : compréhension orale (${h.P.tcf.canada.co.q} questions, ${h.P.tcf.canada.co.min} minutes), compréhension écrite (${h.P.tcf.canada.ce.q} questions, ${h.P.tcf.canada.ce.min} minutes), expression écrite (${h.P.tcf.canada.ee.tasks} tâches, ${h.P.tcf.canada.ee.min} minutes) et expression orale (${h.P.tcf.canada.eo.tasks} tâches, ${h.P.tcf.canada.eo.min} minutes). Les questions proposent ${h.P.tcf.choices} choix pour une seule bonne réponse, la difficulté monte au fil de l’épreuve et chaque enregistrement n’est diffusé qu’une fois. Les compréhensions sont notées de 100 à 699, les expressions sur 20. Les résultats tombent sous ${h.P.tcf.resultsDaysComputer} jours ouvrés sur ordinateur, ${h.P.tcf.resultsDaysPaper} sur papier ; l’attestation vaut ${h.P.tcf.validityYears} ans et ${h.P.tcf.retakeDays} jours doivent séparer deux passations. Chaque épreuve se convertit ensuite en NCLC.`,
    faqs: (h) => [
      { q: 'Combien de mots faut-il écrire aux tâches du TCF Canada ?', a: `Le manuel fixe une fourchette par tâche : ${h.P.tcf.canada.ee.words[0][0]} à ${h.P.tcf.canada.ee.words[0][1]} mots pour la première, ${h.P.tcf.canada.ee.words[1][0]} à ${h.P.tcf.canada.ee.words[1][1]} pour la deuxième, ${h.P.tcf.canada.ee.words[2][0]} à ${h.P.tcf.canada.ee.words[2][1]} pour la troisième, le tout en ${h.P.tcf.canada.ee.min} minutes. Contrairement au TEF Canada, il y a un plafond en plus du plancher : écrire beaucoup plus n’est pas une stratégie sûre.` },
      { q: 'Comment se déroule l’expression orale du TCF Canada ?', a: `Elle dure ${h.P.tcf.canada.eo.min} minutes en trois temps : un entretien dirigé de ${h.P.tcf.canada.eo.t1} minutes, une interaction de ${h.num(h.P.tcf.canada.eo.t2, 1)} minutes précédée de ${h.P.tcf.canada.eo.t2prep} minutes de préparation, puis ${h.num(h.P.tcf.canada.eo.t3, 1)} minutes pour exprimer un point de vue. La page d’${h.a('french-speaking', 'entraînement à l’oral')} propose un chronomètre réglé sur ces durées.` },
      { q: 'Peut-on sauter une épreuve du TCF Canada dont on n’a pas besoin ?', a: `Le manuel présente les quatre épreuves du TCF Canada comme obligatoires, alors que la CCI propose pour le TEF Canada une formule limitée à l’oral pour la citoyenneté. Si seule la citoyenneté vous concerne, renseignez-vous auprès de France Éducation international ou de votre centre avant de vous inscrire : ce site ne peut confirmer aucun format réduit pour le TCF Canada.` },
      { q: 'Pourquoi n’entend-on qu’une fois chaque document au TCF Canada ?', a: `C’est la règle posée par le manuel du candidat pour la compréhension orale : chaque enregistrement n’est diffusé qu’une fois, et les questions se compliquent au fil de l’épreuve. S’entraîner avec une seule écoute est le meilleur moyen de se rapprocher des conditions réelles ; l’${h.a('french-listening', 'entraînement à la compréhension orale')} du site fonctionne ainsi.` },
    ],
    body: (h) => `
<h2>Le déroulement, épreuve par épreuve</h2>
<p>Le manuel du candidat de France Éducation international décrit le TCF Canada. Les quatre épreuves sont obligatoires :</p>
${h.table(['Épreuve', 'Ce qu’on vous demande', 'Durée'], [
  ['Compréhension orale', `${h.P.tcf.canada.co.q} questions à ${h.P.tcf.choices} choix, documents diffusés une seule fois`, `${h.P.tcf.canada.co.min} min`],
  ['Compréhension écrite', `${h.P.tcf.canada.ce.q} questions à ${h.P.tcf.choices} choix`, `${h.P.tcf.canada.ce.min} min`],
  ['Expression écrite', `Tâche 1 : ${h.P.tcf.canada.ee.words[0][0]} à ${h.P.tcf.canada.ee.words[0][1]} mots. Tâche 2 : ${h.P.tcf.canada.ee.words[1][0]} à ${h.P.tcf.canada.ee.words[1][1]} mots. Tâche 3 : ${h.P.tcf.canada.ee.words[2][0]} à ${h.P.tcf.canada.ee.words[2][1]} mots`, `${h.P.tcf.canada.ee.min} min`],
  ['Expression orale', `Entretien dirigé (${h.P.tcf.canada.eo.t1} min), interaction après ${h.P.tcf.canada.eo.t2prep} min de préparation (${h.num(h.P.tcf.canada.eo.t2, 1)} min), point de vue (${h.num(h.P.tcf.canada.eo.t3, 1)} min)`, `${h.P.tcf.canada.eo.min} min`],
], 'Format du TCF Canada, manuel du candidat de France Éducation international, version J (septembre 2024).', ['l', 'l', 'r'])}
<p>Au total, ${h.P.tcf.canada.totalMin} minutes d’épreuves. En compréhension écrite, la moyenne tombe à ${h.num((h.P.tcf.canada.ce.min * 60) / h.P.tcf.canada.ce.q)} secondes par question ; le calculateur voisin refait le compte une fois réservées quelques minutes de relecture.</p>
<h2>La mécanique des questions</h2>
<p>Chaque question à choix multiple offre ${h.P.tcf.choices} propositions et une seule est juste. Selon le manuel, la difficulté augmente au fil de l’épreuve : le temps gagné au début se réinvestit dans les dernières questions. À l’écoute, rien n’est rejoué. C’est l’habitude à prendre en priorité, et les ${h.a('tcf-mock', 'examens blancs du TCF Canada')} reprennent le nombre de questions et la durée officiels, puis affichent un résultat brut et une indication approximative de notre cru, jamais un score officiel.</p>
<h2>La notation : deux échelles</h2>
<p>Les compréhensions sont notées de 100 à 699, les expressions sur 20. IRCC convertit chacune des quatre en NCLC avec sa propre grille, détaillée sur la page du ${h.a('tcf-canada-score', 'score TCF Canada')}. Concrètement, le NCLC ${h.P.ee.fsw} demande ${h.range('tcf', 'R', 7).split('–')[0]} en lecture, ${h.range('tcf', 'L', 7).split('–')[0]} à l’écoute et ${h.P.tests.tcf.W[3][1]} sur 20 dans chaque expression.</p>
<h2>Inscription, prix et versions du TCF</h2>
<p>Le TCF existe en plusieurs versions (TCF TP, TCF IRN, TCF Québec, TCF Canada) : vérifiez que votre réservation porte bien sur le TCF Canada avant de payer. L’inscription passe par un centre agréé, que l’on trouve sur la ${h.src('fei_tcf_canada', 'page TCF Canada de France Éducation international')}. Chaque centre fixe son tarif ; à titre d’exemple daté, le ${h.src('fee_usherbrooke', 'centre de langues de l’Université de Sherbrooke')} affichait ${h.cad(h.P.fees.usherbrooke.tcfCanada)} lors de notre lecture du ${h.date(h.P.fees.usherbrooke.read)}. Ce site est indépendant et ne prend aucune inscription.</p>
<h2>Résultats, validité et délai entre deux passations</h2>
<p>Le manuel annonce les résultats sous ${h.P.tcf.resultsDaysComputer} jours ouvrés pour une session sur ordinateur et ${h.P.tcf.resultsDaysPaper} sur papier. L’attestation est valable ${h.P.tcf.validityYears} ans, ce qui rejoint l’exigence d’IRCC : des résultats de moins de ${h.P.ee.validityYears} ans à la création du profil Entrée express et au dépôt de la demande de résidence permanente. Pour retenter sa chance, il faut laisser ${h.P.tcf.retakeDays} jours entre deux passations ; la page ${h.a('results-retake', 'résultats et nouvelle passation')} fait le calcul.</p>
<h2>TCF Canada ou TEF Canada ?</h2>
<p>Pour IRCC, les deux se valent. Le TCF Canada compte trois tâches écrites encadrées par des fourchettes de mots, trois courtes tâches orales et un délai de ${h.P.tcf.retakeDays} jours ; le TEF Canada propose deux tâches plus longues par expression et une règle de ${h.P.tef.retakeDays} jours par épreuve. Le comparatif ${h.a('tcf-or-tef', 'TCF ou TEF')} met ces écarts en balance.</p>`,
  },
});
