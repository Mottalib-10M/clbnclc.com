import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'tcf-or-tef',
  group: 'scores',
  order: 34,
  tool: { kind: 'cost', props: { test: 'tef' } },
  mini: { kind: 'mini:pace' },
  related: ['tef-canada', 'tcf-canada', 'tef-mock', 'tcf-mock', 'test-cost', 'results-retake'],
  sources: ['cci_tef_canada', 'cci_tef_canada_attestation', 'fei_tcf_manual', 'ircc_ee_lang', 'fee_af_edmonton', 'fee_usherbrooke'],
  en: {
    slug: 'tcf-or-tef',
    nav: 'TCF or TEF?',
    card: 'TCF Canada and TEF Canada compared: format, length, marking, word limits, result delays, retakes and price.',
    title: 'TCF or TEF Canada: format, marking and retakes compared',
    description: 'TCF or TEF Canada for Express Entry: question counts, timing, writing and speaking tasks, marking, result delays, the wait before a retake and sample prices.',
    h1: 'TCF Canada or TEF Canada: which one suits you?',
    intro: 'IRCC accepts both tests on equal terms. What separates them is how they feel on the day: the number of tasks, the clock, the marking and the rules for trying again.',
    resume: (h) => `IRCC gives the TEF Canada and the TCF Canada exactly the same standing: both are converted to an NCLC level per skill, both count for Express Entry, the French-language category, the French bonus and citizenship, and both reports are valid ${h.P.tef.validityYears} years. The choice is practical. The TEF Canada asks ${h.P.tef.canada.ce.q} reading and ${h.P.tef.canada.co.q} listening questions; the TCF Canada asks ${h.P.tcf.canada.ce.q} of each, with ${h.P.tcf.canada.co.min} minutes of listening against ${h.P.tef.canada.co.min}. In writing, the TEF Canada sets two tasks with word minimums (${h.P.tef.canada.ee.a.words} and ${h.P.tef.canada.ee.b.words}), the TCF Canada three tasks with word ranges, up to ${h.P.tcf.canada.ee.words[2][1]} words. Speaking lasts ${h.P.tef.canada.eo.min} minutes in two role plays at the TEF and ${h.P.tcf.canada.eo.min} minutes in three tasks at the TCF. Marking differs too: every TEF score is out of 699, while the TCF reports writing and speaking out of 20. Results take ${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days at the TEF and up to ${h.P.tcf.resultsDaysComputer} or ${h.P.tcf.resultsDaysPaper} at the TCF. To retake, the TEF bars the same test for ${h.P.tef.retakeDays} days, the TCF asks ${h.P.tcf.retakeDays} days between sittings.`,
    faqs: (h) => [
      { q: 'Is the TCF Canada easier than the TEF Canada?', a: 'Neither organiser nor IRCC presents one as easier, and this site has no data to say so. The NCLC charts differ because the scales differ, not because one test is more generous. What can make one test easier for you is its shape: three short speaking tasks or two longer role plays, word ranges or word minimums.' },
      { q: 'Which test gives results faster?', a: `The announced windows are close. The CCI announces ${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days. The TCF manual announces up to ${h.P.tcf.resultsDaysComputer} working days on computer and ${h.P.tcf.resultsDaysPaper} on paper, so a paper TCF sitting is the slowest option. These are maximums or ranges stated by the organisers, not guarantees, and a centre may add its own delay for sending the report.` },
      { q: 'If I fail one skill, which test lets me retry sooner?', a: `The TEF Canada rule applies per test: you cannot take the same test again within ${h.P.tef.retakeDays} days of the last sitting. The TCF manual sets ${h.P.tcf.retakeDays} days between two sittings. If one weak skill is the problem, the shorter TEF gap can matter, especially when a profile or an invitation deadline is close.` },
      { q: 'Can I switch from the TEF to the TCF between two attempts?', a: `Yes. IRCC does not tie you to one French test, and each report stands on its own. You then enter the report that gives you the best set of levels and is under ${h.P.ee.validityYears} years old. Note that the two scales are different, so compare NCLC levels, not raw scores.` },
    ],
    body: (h) => `
<h2>Side by side</h2>
${h.table(['', 'TEF Canada (CCI Paris Île-de-France)', 'TCF Canada (France Éducation international)'], [
  ['Reading', `${h.P.tef.canada.ce.q} questions, ${h.P.tef.canada.ce.min} min`, `${h.P.tcf.canada.ce.q} questions, ${h.P.tcf.canada.ce.min} min`],
  ['Listening', `${h.P.tef.canada.co.q} questions, ${h.P.tef.canada.co.min} min`, `${h.P.tcf.canada.co.q} questions, ${h.P.tcf.canada.co.min} min, each recording played once`],
  ['Writing', `2 tasks, ${h.P.tef.canada.ee.min} min, at least ${h.P.tef.canada.ee.a.words} and ${h.P.tef.canada.ee.b.words} words`, `${h.P.tcf.canada.ee.tasks} tasks, ${h.P.tcf.canada.ee.min} min, ranges from ${h.P.tcf.canada.ee.words[0][0]} to ${h.P.tcf.canada.ee.words[2][1]} words`],
  ['Speaking', `2 sections, ${h.P.tef.canada.eo.min} min`, `${h.P.tcf.canada.eo.tasks} tasks, ${h.P.tcf.canada.eo.min} min`],
  ['Scale', '0 to 699 for all four', '100 to 699 (comprehension), out of 20 (expression)'],
  ['Expression marking', 'two markers per performance', 'mark out of 20'],
  ['Results', `${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days`, `up to ${h.P.tcf.resultsDaysComputer} (computer) or ${h.P.tcf.resultsDaysPaper} (paper) working days`],
  ['Retake', `not the same test within ${h.P.tef.retakeDays} days`, `${h.P.tcf.retakeDays} days between sittings`],
  ['Citizenship-only format', 'listening + speaking offered', 'not confirmed'],
  ['Validity', `${h.P.tef.validityYears} years`, `${h.P.tcf.validityYears} years`],
], 'Sources: CCI Paris Île-de-France TEF Canada pages; France Éducation international TCF candidate manual, version J.', ['l', 'l', 'l'])}
<h2>Comprehension: more questions or more time per question</h2>
<p>In reading, both tests give ${h.P.tef.canada.ce.min} minutes, but the TEF Canada fits ${h.P.tef.canada.ce.q} questions into them and the TCF Canada ${h.P.tcf.canada.ce.q}: ${h.num((h.P.tef.canada.ce.min * 60) / h.P.tef.canada.ce.q)} seconds per question against ${h.num((h.P.tcf.canada.ce.min * 60) / h.P.tcf.canada.ce.q)}. Listening is shorter at the TCF (${h.P.tcf.canada.co.min} minutes) and every TCF recording is heard once, with questions getting harder as you go. The timer next to this article computes your own pace for each section; the ${h.a('tef-mock', 'TEF mock')} and ${h.a('tcf-mock', 'TCF mock')} let you try both.</p>
<h2>Writing: a floor, or a window</h2>
<p>The TEF Canada sets minimums only: continue a news story in at least ${h.P.tef.canada.ee.a.words} words, then argue a position in at least ${h.P.tef.canada.ee.b.words}. The TCF Canada sets windows for its three tasks (${h.P.tcf.canada.ee.words[0][0]}–${h.P.tcf.canada.ee.words[0][1]}, ${h.P.tcf.canada.ee.words[1][0]}–${h.P.tcf.canada.ee.words[1][1]} and ${h.P.tcf.canada.ee.words[2][0]}–${h.P.tcf.canada.ee.words[2][1]} words). Writers who tend to go long may find the TEF more comfortable; writers who like short, framed tasks may prefer the TCF.</p>
<h2>Speaking: two role plays or three short tasks</h2>
<p>The TEF Canada speaking test has two sections: ${h.P.tef.canada.eo.a} minutes to obtain information, then ${h.P.tef.canada.eo.b} minutes to convince someone. The TCF Canada has three: a ${h.P.tcf.canada.eo.t1}-minute guided interview, an interaction of ${h.num(h.P.tcf.canada.eo.t2, 1)} minutes after ${h.P.tcf.canada.eo.t2prep} minutes of preparation, and ${h.num(h.P.tcf.canada.eo.t3, 1)} minutes on a point of view. The ${h.a('french-speaking', 'speaking practice')} offers both formats with a timer.</p>
<h2>Price and dates</h2>
<p>Each centre sets its own fee, and the two tests are not always offered at the same centre. As dated examples read on ${h.date(h.P.fees.afEdmonton.read)}: the ${h.src('fee_af_edmonton', 'Alliance française d’Edmonton')} listed ${h.cad(h.P.fees.afEdmonton.full)} for the full TEF Canada, and the ${h.src('fee_usherbrooke', 'Université de Sherbrooke')} ${h.cad(h.P.fees.usherbrooke.tcfCanada)} for the TCF Canada. The calculator above adds up several sittings at the fee you enter. In practice, the date available near you often settles the question.</p>
<h2>Our reading of the choice</h2>
<p>If you expect to retake one skill, the TEF Canada waiting rule is shorter. If you only need citizenship, the TEF Canada listening and speaking format is the one confirmed by its organiser. Otherwise, sit a mock section of each and pick the format in which your weakest skill does best. The ${h.a('test-cost', 'cost page')} and the ${h.a('results-retake', 'results and retake page')} go further on money and timing.</p>`,
  },
  fr: {
    slug: 'tcf-ou-tef',
    nav: 'TCF ou TEF ?',
    card: 'TCF Canada et TEF Canada comparés : format, durée, notation, nombre de mots, délais, nouvelle passation et prix.',
    title: 'TCF ou TEF Canada : format, notation et délais comparés',
    description: 'TCF ou TEF Canada pour Entrée express : questions, durées, tâches écrites et orales, notation, délais de résultats, attente avant de repasser, exemples de prix.',
    h1: 'TCF Canada ou TEF Canada : lequel vous convient ?',
    intro: 'IRCC accepte les deux tests sur un pied d’égalité. Ce qui les sépare, c’est le jour J : nombre de tâches, chronomètre, notation et règles pour retenter sa chance.',
    resume: (h) => `Pour IRCC, le TEF Canada et le TCF Canada se valent : chacun se convertit en NCLC par épreuve, compte pour Entrée express, la catégorie « français », le bonus francophone et la citoyenneté, et donne une attestation valable ${h.P.tef.validityYears} ans. Le choix est donc pratique. Le TEF Canada pose ${h.P.tef.canada.ce.q} questions en compréhension écrite et ${h.P.tef.canada.co.q} en compréhension orale ; le TCF Canada ${h.P.tcf.canada.ce.q} dans chacune, avec ${h.P.tcf.canada.co.min} minutes d’écoute contre ${h.P.tef.canada.co.min}. À l’écrit, le TEF Canada propose deux tâches avec un minimum de mots (${h.P.tef.canada.ee.a.words} et ${h.P.tef.canada.ee.b.words}), le TCF Canada trois tâches encadrées par des fourchettes, jusqu’à ${h.P.tcf.canada.ee.words[2][1]} mots. L’oral dure ${h.P.tef.canada.eo.min} minutes en deux mises en situation au TEF, ${h.P.tcf.canada.eo.min} minutes en trois tâches au TCF. La notation diffère : tout est sur 699 au TEF, alors que le TCF note les expressions sur 20. Les résultats arrivent en ${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés au TEF, sous ${h.P.tcf.resultsDaysComputer} ou ${h.P.tcf.resultsDaysPaper} au TCF. Pour repasser, le TEF bloque la même épreuve ${h.P.tef.retakeDays} jours, le TCF impose ${h.P.tcf.retakeDays} jours entre deux passations.`,
    faqs: (h) => [
      { q: 'Le TCF Canada est-il plus facile que le TEF Canada ?', a: 'Ni les organisateurs ni IRCC ne présentent l’un comme plus facile, et ce site n’a aucune donnée qui permette de le dire. Les grilles NCLC diffèrent parce que les échelles diffèrent, pas parce qu’un test serait plus généreux. Ce qui peut vous avantager, c’est la forme : trois courtes tâches orales ou deux mises en situation plus longues, fourchettes ou minimums de mots.' },
      { q: 'Quel test donne ses résultats le plus vite ?', a: `Les délais annoncés sont proches. La CCI annonce ${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés. Le manuel du TCF annonce jusqu’à ${h.P.tcf.resultsDaysComputer} jours ouvrés sur ordinateur et ${h.P.tcf.resultsDaysPaper} sur papier : une session TCF sur papier est donc la plus lente. Ce sont des délais annoncés par les organisateurs, pas des garanties, et le centre peut ajouter son propre délai d’envoi.` },
      { q: 'Si j’échoue dans une épreuve, quel test permet de retenter plus vite ?', a: `La règle du TEF Canada s’applique épreuve par épreuve : impossible de repasser la même épreuve dans les ${h.P.tef.retakeDays} jours qui suivent. Le manuel du TCF fixe ${h.P.tcf.retakeDays} jours entre deux passations. Quand une seule épreuve pose problème, le délai plus court du TEF peut compter, surtout si une échéance de profil ou d’invitation approche.` },
      { q: 'Peut-on passer du TEF au TCF entre deux tentatives ?', a: `Oui. IRCC ne vous attache à aucun test de français, et chaque attestation est indépendante. Vous saisissez ensuite celle qui donne la meilleure combinaison de niveaux et qui a moins de ${h.P.ee.validityYears} ans. Les deux échelles étant différentes, comparez les NCLC, pas les scores bruts.` },
    ],
    body: (h) => `
<h2>Les deux tests côte à côte</h2>
${h.table(['', 'TEF Canada (CCI Paris Île-de-France)', 'TCF Canada (France Éducation international)'], [
  ['Compréhension écrite', `${h.P.tef.canada.ce.q} questions, ${h.P.tef.canada.ce.min} min`, `${h.P.tcf.canada.ce.q} questions, ${h.P.tcf.canada.ce.min} min`],
  ['Compréhension orale', `${h.P.tef.canada.co.q} questions, ${h.P.tef.canada.co.min} min`, `${h.P.tcf.canada.co.q} questions, ${h.P.tcf.canada.co.min} min, une seule écoute`],
  ['Expression écrite', `2 tâches, ${h.P.tef.canada.ee.min} min, au moins ${h.P.tef.canada.ee.a.words} et ${h.P.tef.canada.ee.b.words} mots`, `${h.P.tcf.canada.ee.tasks} tâches, ${h.P.tcf.canada.ee.min} min, de ${h.P.tcf.canada.ee.words[0][0]} à ${h.P.tcf.canada.ee.words[2][1]} mots selon la tâche`],
  ['Expression orale', `2 sections, ${h.P.tef.canada.eo.min} min`, `${h.P.tcf.canada.eo.tasks} tâches, ${h.P.tcf.canada.eo.min} min`],
  ['Échelle', 'de 0 à 699 pour les quatre', 'de 100 à 699 (compréhensions), sur 20 (expressions)'],
  ['Correction des expressions', 'deux correcteurs par production', 'note sur 20'],
  ['Résultats', `${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés`, `jusqu’à ${h.P.tcf.resultsDaysComputer} (ordinateur) ou ${h.P.tcf.resultsDaysPaper} (papier) jours ouvrés`],
  ['Nouvelle passation', `pas la même épreuve dans les ${h.P.tef.retakeDays} jours`, `${h.P.tcf.retakeDays} jours entre deux passations`],
  ['Formule citoyenneté seule', 'compréhension + expression orales', 'non confirmée'],
  ['Validité', `${h.P.tef.validityYears} ans`, `${h.P.tcf.validityYears} ans`],
], 'Sources : pages TEF Canada de la CCI Paris Île-de-France ; manuel du candidat TCF de France Éducation international, version J.', ['l', 'l', 'l'])}
<h2>Compréhension : plus de questions, ou plus de temps par question</h2>
<p>En compréhension écrite, les deux tests accordent ${h.P.tef.canada.ce.min} minutes, mais le TEF Canada y loge ${h.P.tef.canada.ce.q} questions et le TCF Canada ${h.P.tcf.canada.ce.q} : ${h.num((h.P.tef.canada.ce.min * 60) / h.P.tef.canada.ce.q)} secondes par question contre ${h.num((h.P.tcf.canada.ce.min * 60) / h.P.tcf.canada.ce.q)}. La compréhension orale est plus courte au TCF (${h.P.tcf.canada.co.min} minutes), chaque document n’y passe qu’une fois et les questions se corsent au fil de l’épreuve. Le calculateur voisin donne votre rythme section par section ; l’${h.a('tef-mock', 'examen blanc TEF')} et l’${h.a('tcf-mock', 'examen blanc TCF')} permettent d’essayer les deux.</p>
<h2>Expression écrite : un plancher ou une fenêtre</h2>
<p>Le TEF Canada ne fixe que des minimums : poursuivre un fait divers en ${h.P.tef.canada.ee.a.words} mots au moins, puis défendre une position en ${h.P.tef.canada.ee.b.words} mots au moins. Le TCF Canada impose des fenêtres à ses trois tâches (${h.P.tcf.canada.ee.words[0][0]} à ${h.P.tcf.canada.ee.words[0][1]}, ${h.P.tcf.canada.ee.words[1][0]} à ${h.P.tcf.canada.ee.words[1][1]} et ${h.P.tcf.canada.ee.words[2][0]} à ${h.P.tcf.canada.ee.words[2][1]} mots). Qui écrit volontiers long sera plus à l’aise au TEF ; qui préfère des tâches courtes et cadrées, au TCF.</p>
<h2>Expression orale : deux mises en situation ou trois tâches brèves</h2>
<p>L’oral du TEF Canada compte deux sections : ${h.P.tef.canada.eo.a} minutes pour obtenir des informations, puis ${h.P.tef.canada.eo.b} minutes pour convaincre. Celui du TCF Canada en compte trois : un entretien dirigé de ${h.P.tcf.canada.eo.t1} minutes, une interaction de ${h.num(h.P.tcf.canada.eo.t2, 1)} minutes après ${h.P.tcf.canada.eo.t2prep} minutes de préparation, et ${h.num(h.P.tcf.canada.eo.t3, 1)} minutes de point de vue. L’${h.a('french-speaking', 'entraînement à l’oral')} propose les deux formats, chronomètre compris.</p>
<h2>Prix et dates</h2>
<p>Chaque centre fixe son tarif, et les deux tests ne sont pas toujours proposés au même endroit. Exemples datés, relevés le ${h.date(h.P.fees.afEdmonton.read)} : l’${h.src('fee_af_edmonton', 'Alliance française d’Edmonton')} affichait ${h.cad(h.P.fees.afEdmonton.full)} pour le TEF Canada complet, l’${h.src('fee_usherbrooke', 'Université de Sherbrooke')} ${h.cad(h.P.fees.usherbrooke.tcfCanada)} pour le TCF Canada. Le calculateur ci-dessus additionne plusieurs passations au tarif saisi. En pratique, la date disponible près de chez vous tranche souvent la question.</p>
<h2>Notre lecture du choix</h2>
<p>Si vous pensez devoir repasser une épreuve, le délai d’attente du TEF Canada est plus court. Si seule la citoyenneté vous concerne, la formule orale du TEF Canada est celle que confirme son organisateur. Sinon, faites une section d’examen blanc de chaque test et choisissez le format où votre épreuve la plus faible s’en sort le mieux. Les pages ${h.a('test-cost', 'prix du test')} et ${h.a('results-retake', 'résultats et nouvelle passation')} vont plus loin sur l’argent et le calendrier.</p>`,
  },
});
