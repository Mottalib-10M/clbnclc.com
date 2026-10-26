import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'results-retake',
  group: 'exam',
  order: 64,
  tool: { kind: 'calendar', props: { test: 'tcf' } },
  mini: { kind: 'mini:retake' },
  related: ['test-validity', 'test-cost', 'tef-canada-score', 'tcf-canada-score', 'tcf-or-tef', 'preparation'],
  sources: ['cci_tef_canada_results', 'cci_tef_canada_attestation', 'fei_tcf_manual', 'cci_tef_nclc'],
  en: {
    slug: 'tef-tcf-results-retake',
    nav: 'Results and retakes',
    card: 'When TEF Canada and TCF Canada results arrive, how scores are built, and the waiting time before a new sitting.',
    title: 'TEF and TCF results: delays, appeals and when to retake',
    description: 'TEF and TCF results: when the scores arrive, how they are calculated, the appeal window for the TEF, and how long to wait before sitting the same test again.',
    h1: 'TEF Canada and TCF Canada results, and sitting again',
    intro: 'Enter your test date to see when results are due at the latest and the first day you could sit again. Switch between TCF Canada and TEF Canada at the top.',
    resume: (h) => `TEF Canada results arrive ${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days after the test, in digital form, according to the CCI Paris Île-de-France. For the TCF Canada, the candidate manual gives up to ${h.P.tcf.resultsDaysComputer} working days for a session on computer and up to ${h.P.tcf.resultsDaysPaper} on paper. The scores are not a simple count. On the TEF, each right answer in reading and listening earns one point, then the total is converted into a calibrated score on the 0 to ${h.num(h.P.tests.tef2023.max)} scale, and writing and speaking are marked by two examiners. On the TCF, reading and listening are reported on a ${h.num(h.P.tcf.cecr[5][1] as number)} to ${h.num(h.P.tests.tcf.max.R)} scale and writing and speaking out of 20. If you disagree with a TEF result, the CCI allows an appeal within ${h.P.tef.appealDays} days. If a skill falls short of your target, a retake must wait: the TEF does not allow the same test again within ${h.P.tef.retakeDays} days, and the TCF manual sets ${h.P.tcf.retakeDays} days between two sittings. The calendar above turns those rules into dates for your own test, counting weekdays only, without public holidays.`,
    faqs: (h) => [
      { q: 'How long do TEF Canada results take?', a: `Between ${h.P.tef.resultsDays[0]} and ${h.P.tef.resultsDays[1]} working days after the test, according to the CCI, and they are delivered in digital form. The calendar above adds ${h.P.tef.resultsDays[1]} working days to your test date to show the latest expected day, counting weekdays only, so a public holiday can push it a day further.` },
      { q: 'How soon can I sit the TCF Canada again?', a: `The TCF candidate manual requires ${h.P.tcf.retakeDays} days between two sittings. With the TEF Canada, the CCI rule is that you cannot sit the same test again within ${h.P.tef.retakeDays} days. The small calculator under the summary tells you how many days you still have to wait from your last sitting.` },
      { q: 'Can I challenge a TEF Canada score?', a: `Yes. The CCI Paris Île-de-France provides for an appeal within ${h.P.tef.appealDays} days. Our sources do not describe the procedure or its cost, so ask your test centre or the CCI directly. Our sources say nothing on an appeal route for the TCF Canada.` },
      { q: 'Why were some TEF reports from early 2024 affected?', a: 'The CCI temporarily changed its calculation for tests taken between 11 December 2023 and 6 May 2024, and says candidates in that window may update their Express Entry profile. Compare the NCLC levels on your report with the current chart and correct the profile if they differ.' },
    ],
    body: (h) => `
<h2>When the results arrive</h2>
${h.table(['Test', 'Results', 'Next sitting', 'Appeal'], [
  ['TEF Canada', `${h.P.tef.resultsDays[0]} to ${h.P.tef.resultsDays[1]} working days, digital`, `same test not within ${h.P.tef.retakeDays} days`, `within ${h.P.tef.appealDays} days`],
  ['TCF Canada (computer)', `up to ${h.P.tcf.resultsDaysComputer} working days`, `${h.P.tcf.retakeDays} days between sittings`, 'not covered by our sources'],
  ['TCF Canada (paper)', `up to ${h.P.tcf.resultsDaysPaper} working days`, `${h.P.tcf.retakeDays} days between sittings`, 'not covered by our sources'],
], 'Result delays, waiting periods and appeals (CCI Paris Île-de-France; TCF candidate manual, version J).', ['l', 'l', 'l', 'l'])}
<p>The figures come from the ${h.src('cci_tef_canada_results', 'CCI results page')}, the ${h.src('cci_tef_canada_attestation', 'CCI page on the score report')} and the ${h.src('fei_tcf_manual', 'TCF candidate manual')}. The calendar counts working days as Monday to Friday; it does not know the public holidays of your province or country.</p>
<h2>How the scores are built</h2>
<p>On the TEF Canada, the CCI gives one point per right answer in the multiple-choice tests, then converts the total into a calibrated score, which is why a raw count of right answers cannot be read as a TEF score. Writing and speaking are each marked by two examiners. On the TCF Canada, the manual describes a score from ${h.num(h.P.tcf.cecr[5][1] as number)} to ${h.num(h.P.tests.tcf.max.R)} for reading and listening, linked to CEFR levels, and a mark out of 20 for writing and speaking. IRCC then reads each skill on its own chart: the ${h.a('tef-canada-score', 'TEF score page')} and the ${h.a('tcf-canada-score', 'TCF score page')} convert yours.</p>
<h2>Reading the TEF report for Express Entry</h2>
<p>A TEF Canada report shows the score out of ${h.num(h.P.tests.tef2023.max)} and a column headed "équivalence ancien score". IRCC and the CCI ask candidates to type that second column in the Express Entry profile, because the 699 scale is not compatible with the profile system. Reports issued for tests from 11 December 2023 to 6 May 2024 were affected by a temporary change in the CCI calculation; the CCI says those candidates may update their profile.</p>
<h2>Sitting again: what the waiting rules mean</h2>
<p>The TEF rule applies to each test separately: it stops you from repeating, say, writing within ${h.P.tef.retakeDays} days of your last writing test. Whether your centre lets you book one test alone, and at what price, depends on the centre. The TCF rule is broader: ${h.P.tcf.retakeDays} days between two sittings. In both cases the waiting time is a minimum, not a recommendation. Our suggestion: use the weeks in between to work on the weak skill with the ${h.a('french-writing', 'writing practice')}, the ${h.a('french-speaking', 'speaking practice')} or the ${h.a('tef-mock', 'mock sections')}, rather than booking the first date allowed. A new sitting can also come out lower than the previous one.</p>
<h2>Before booking a retake</h2>
<p>Check three things. First, whether you need it at all: compare each skill on the report you hold with your target, and check how long that report remains valid. Second, the cost: the ${h.a('test-cost', 'cost page')} adds up fees, sittings and travel. Third, your deadline: enter it in the calendar to see the last test date whose results would arrive in time. The ${h.a('test-validity', 'validity page')} explains the two dates IRCC checks.</p>`,
  },
  fr: {
    slug: 'resultats-tef-tcf',
    nav: 'Résultats et nouvelle passation',
    card: 'Quand arrivent les résultats du TEF Canada et du TCF Canada, comment se calcule le score, et le délai avant de repasser.',
    title: 'Résultats TEF et TCF : délais, recours et nouvelle passation',
    description: 'Résultats TEF et TCF : quand arrivent les scores, comment ils se calculent, le délai de recours au TEF et l’attente imposée avant de repasser la même épreuve.',
    h1: 'Résultats du TEF Canada et du TCF Canada, et nouvelle passation',
    intro: 'Saisissez la date de votre test pour voir la date limite des résultats et le premier jour où vous pourriez repasser. Choisissez TCF Canada ou TEF Canada en haut.',
    resume: (h) => `Les résultats du TEF Canada arrivent ${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés après le test, sous forme numérique, selon la CCI Paris Île-de-France. Pour le TCF Canada, le manuel du candidat annonce au plus ${h.P.tcf.resultsDaysComputer} jours ouvrés pour une session sur ordinateur et au plus ${h.P.tcf.resultsDaysPaper} sur papier. Le score n’est pas un simple décompte. Au TEF, chaque bonne réponse en compréhension écrite et orale vaut un point, puis le total est converti en score étalonné sur l’échelle de 0 à ${h.num(h.P.tests.tef2023.max)}, et l’expression écrite et orale sont corrigées par deux correcteurs. Au TCF, les compréhensions sont notées de ${h.num(h.P.tcf.cecr[5][1] as number)} à ${h.num(h.P.tests.tcf.max.R)} et les expressions sur 20. En cas de désaccord sur un résultat du TEF, la CCI prévoit un recours dans les ${h.P.tef.appealDays} jours. Si une épreuve reste sous votre objectif, il faut patienter avant de repasser : le TEF n’autorise pas la même épreuve dans les ${h.P.tef.retakeDays} jours, et le manuel du TCF impose ${h.P.tcf.retakeDays} jours entre deux passations. Le calendrier ci-dessus traduit ces règles en dates pour votre propre test, en comptant les jours de semaine seulement, sans les jours fériés.`,
    faqs: (h) => [
      { q: 'En combien de temps arrivent les résultats du TEF Canada ?', a: `En ${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés après le test, selon la CCI, sous forme numérique. Le calendrier ci-dessus ajoute ${h.P.tef.resultsDays[1]} jours ouvrés à la date du test pour afficher le jour le plus tardif attendu ; il ne compte que les jours de semaine, si bien qu’un jour férié peut décaler d’une journée.` },
      { q: 'Au bout de combien de temps peut-on repasser le TCF Canada ?', a: `Le manuel du candidat TCF impose ${h.P.tcf.retakeDays} jours entre deux passations. Pour le TEF Canada, la règle de la CCI interdit de repasser la même épreuve dans les ${h.P.tef.retakeDays} jours. Le petit calculateur placé sous le résumé indique combien de jours il vous reste à attendre depuis votre dernière passation.` },
      { q: 'Peut-on contester un score du TEF Canada ?', a: `Oui. La CCI Paris Île-de-France prévoit un recours dans les ${h.P.tef.appealDays} jours. Nos sources ne décrivent ni la marche à suivre ni son coût : renseignez-vous auprès de votre centre ou de la CCI. Elles ne disent rien non plus d’une voie de recours pour le TCF Canada.` },
      { q: 'Pourquoi certaines attestations TEF du début de 2024 posent-elles question ?', a: 'La CCI a modifié temporairement son calcul pour les tests passés entre le 11 décembre 2023 et le 6 mai 2024, et indique que les candidats concernés peuvent mettre à jour leur profil Entrée express. Comparez les NCLC de votre attestation avec la grille actuelle et corrigez le profil en cas d’écart.' },
    ],
    body: (h) => `
<h2>Quand arrivent les résultats</h2>
${h.table(['Test', 'Résultats', 'Nouvelle passation', 'Recours'], [
  ['TEF Canada', `${h.P.tef.resultsDays[0]} à ${h.P.tef.resultsDays[1]} jours ouvrés, numériques`, `même épreuve exclue pendant ${h.P.tef.retakeDays} jours`, `dans les ${h.P.tef.appealDays} jours`],
  ['TCF Canada (ordinateur)', `au plus ${h.P.tcf.resultsDaysComputer} jours ouvrés`, `${h.P.tcf.retakeDays} jours entre deux passations`, 'non traité par nos sources'],
  ['TCF Canada (papier)', `au plus ${h.P.tcf.resultsDaysPaper} jours ouvrés`, `${h.P.tcf.retakeDays} jours entre deux passations`, 'non traité par nos sources'],
], 'Délais de résultats, délais d’attente et recours (CCI Paris Île-de-France ; manuel du candidat TCF, version J).', ['l', 'l', 'l', 'l'])}
<p>Ces chiffres viennent de la ${h.src('cci_tef_canada_results', 'page de la CCI sur les résultats')}, de sa ${h.src('cci_tef_canada_attestation', 'page sur l’attestation')} et du ${h.src('fei_tcf_manual', 'manuel du candidat TCF')}. Le calendrier compte les jours ouvrés du lundi au vendredi ; il ignore les jours fériés de votre province ou de votre pays.</p>
<h2>Comment se construit le score</h2>
<p>Au TEF Canada, la CCI attribue un point par bonne réponse dans les épreuves à choix multiple, puis convertit le total en score étalonné : un simple nombre de bonnes réponses ne se lit donc pas comme un score TEF. L’expression écrite et l’expression orale sont chacune corrigées par deux correcteurs. Au TCF Canada, le manuel décrit un score de ${h.num(h.P.tcf.cecr[5][1] as number)} à ${h.num(h.P.tests.tcf.max.R)} pour les deux compréhensions, rattaché aux niveaux du CECR, et une note sur 20 pour les deux expressions. IRCC lit ensuite chaque épreuve dans sa grille : les pages du ${h.a('tef-canada-score', 'score TEF Canada')} et du ${h.a('tcf-canada-score', 'score TCF Canada')} font la conversion.</p>
<h2>Lire l’attestation du TEF pour Entrée express</h2>
<p>L’attestation du TEF Canada affiche le score sur ${h.num(h.P.tests.tef2023.max)} et une colonne intitulée « équivalence ancien score ». IRCC et la CCI demandent de reporter cette seconde colonne dans le profil Entrée express, l’échelle sur 699 n’étant pas compatible avec le système des profils. Les attestations des tests passés du 11 décembre 2023 au 6 mai 2024 ont subi une modification temporaire du calcul de la CCI ; celle-ci indique que les candidats concernés peuvent mettre leur profil à jour.</p>
<h2>Repasser : ce que veulent dire les délais</h2>
<p>La règle du TEF s’applique épreuve par épreuve : elle empêche par exemple de repasser l’expression écrite dans les ${h.P.tef.retakeDays} jours qui suivent la précédente. La possibilité de réserver une seule épreuve, et son prix, dépendent du centre. La règle du TCF est plus large : ${h.P.tcf.retakeDays} jours entre deux passations. Dans les deux cas, ce délai est un minimum, pas un conseil. Notre suggestion : profitez des semaines d’intervalle pour travailler l’épreuve faible avec l’entraînement en ${h.a('french-writing', 'expression écrite')}, en ${h.a('french-speaking', 'expression orale')} ou les ${h.a('tef-mock', 'sections d’examen blanc')}, plutôt que de réserver la première date permise. Une nouvelle passation peut aussi donner un score plus bas que la précédente.</p>
<h2>Avant de réserver une nouvelle passation</h2>
<p>Vérifiez trois points. D’abord la nécessité même de repasser : comparez chaque épreuve de l’attestation que vous avez avec votre objectif, et vérifiez combien de temps elle reste valable. Ensuite le coût : la page sur le ${h.a('test-cost', 'prix des tests')} additionne tarifs, passations et déplacements. Enfin votre échéance : saisissez-la dans le calendrier pour voir la dernière date de test dont les résultats arriveraient à temps. La page sur la ${h.a('test-validity', 'validité des résultats')} explique les deux dates vérifiées par IRCC.</p>`,
  },
});
