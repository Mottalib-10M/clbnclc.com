import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'naturalisation-b2',
  group: 'france',
  order: 74,
  tool: { kind: 'level', props: { program: 'frNat' } },
  mini: { kind: 'mini:cefr' },
  related: ['tef-irn', 'tcf-irn', 'residence-card-level', 'tef-tcf-cefr', 'french-writing', 'french-speaking'],
  sources: ['jo_naturalisation', 'sp_naturalisation', 'cci_tef_cecr', 'fei_tcf_manual'],
  en: {
    slug: 'french-naturalisation-b2',
    nav: 'Naturalisation: B2',
    card: 'The B2 level for French naturalisation since 2026: accepted diplomas, test conditions, exemptions and B2 scores.',
    title: 'Naturalisation B2 French level: tests, diplomas, exemptions',
    description: 'Naturalisation in France now asks B2 French: diplomas that prove it, test conditions set by the 2025 order, who is exempt, and the TEF and TCF scores for B2.',
    h1: 'B2 French for naturalisation: what changed on 1 January 2026',
    intro: 'Applying for French nationality now means proving B2 in writing and speaking. Here is how to prove it, what a test must look like, and who is exempt.',
    resume: (h) => `Since 1 January 2026, applicants for French nationality must prove level ${h.P.france.naturalisation} of the Common European Framework in written and oral French, under the order of 22 December 2025 published in the Journal officiel on 26 December 2025. Applications filed before that date stay under the earlier 2020 orders. Proof can come from a diploma: the brevet, a state diploma at level 3 or above, a certification registered in the RNCP at level 3 or above, or any diploma attesting at least B2. Otherwise it comes from a language test listed in a specific register, which must certify B2 in four distinct tests taken on the same day in a test centre, with an identity check; the certificate is valid ${h.P.france.validityYears} years. Two exemptions exist: a disability or health condition shown by a medical certificate, and refugees or stateless persons over ${h.P.france.refugeeAge} with ${h.P.france.refugeeYears} years of residence in France. On the TEF and TCF scales, B2 starts at ${h.P.tef.cecr[2][1]} in each test, and at ${h.P.tcf.cecr20[2][1]} out of 20 in the TCF expression tests.`,
    faqs: (h) => [
      { q: 'Does B2 have to be reached in all four tests for naturalisation?', a: `The order requires B2 in four distinct tests taken the same day, and the Service-Public page states the requirement as B2 in written and oral French. If one test falls short, the certificate will not show B2 across the board. On a TEF scale that means ${h.P.tef.cecr[2][1]} or more in each test, not on average.` },
      { q: 'I applied for naturalisation in 2025: does B2 apply to me?', a: 'No. According to the order and Service-Public, applications filed before 1 January 2026 remain under the previous orders of 2020. The B2 requirement applies to applications filed from 1 January 2026. Keep proof of your filing date with your file.' },
      { q: 'Which diplomas exempt me from a French test for naturalisation?', a: 'The order accepts the diplôme national du brevet, a French state diploma at level 3 or above, a certification registered in the RNCP at level 3 or above, and any diploma attesting at least B2. With one of these, no test is needed. Check on Service-Public which documents to provide to prove it.' },
      { q: 'Who is exempt from the B2 requirement altogether?', a: `Two cases: applicants with a disability or a health condition, shown by a medical certificate, and refugees or stateless persons aged over ${h.P.france.refugeeAge} who have lived in France for ${h.P.france.refugeeYears} years. Everyone else must prove B2 by diploma or test.` },
    ],
    body: (h) => `
<h2>Three ways through the requirement</h2>
<p>The ${h.src('jo_naturalisation', 'order of 22 December 2025')} and the ${h.src('sp_naturalisation', 'Service-Public page on naturalisation')} leave three routes. A diploma that proves the level; a language test that meets the order's conditions; or an exemption. The tool above shows the level asked for each French procedure, and the mini-tool beside this text tells you whether one TEF or TCF score reaches B2.</p>
<h2>Route 1: a diploma</h2>
${h.table(['Diploma accepted', 'Condition'], [
  ['Diplôme national du brevet', 'French diploma'],
  ['State diploma (diplôme d’État)', 'level 3 or above'],
  ['Certification registered in the RNCP', 'level 3 or above'],
  ['Any other diploma', `attesting at least ${h.P.france.naturalisation}`],
], 'Diplomas accepted as proof of B2 for naturalisation (order of 22 December 2025, Service-Public).', ['l', 'l'])}
<p>If you hold one of these, no test is needed: the diploma itself is the proof that goes into the file. Only applicants without such a diploma, and without an exemption, have to sit a test.</p>
<h2>Route 2: a language test, under strict conditions</h2>
<p>A test certificate counts only if the test is listed in a specific register and the session met four conditions: four distinct tests (reading, listening, writing, speaking), all taken on the same day, in a test centre, with an identity check. The certificate must also be valid, which means less than ${h.P.france.validityYears} years old. A session taken outside a test centre, or spread over several days, does not meet those conditions.</p>
<p>The ${h.a('tef-irn', 'TEF IRN')} certifies levels up to B2 in four tests, and the ${h.a('tcf-irn', 'TCF IRN')} is the TCF version for residence and nationality. Before you book, check with the organiser or your centre that the session is the one listed for naturalisation.</p>
<h2>What B2 means in scores</h2>
<p>On the scale the CCI publishes in its ${h.src('cci_tef_cecr', 'TEF to CEFR table')}, B2 covers ${h.P.tef.cecr[2][1]} to ${h.P.tef.cecr[1][1] - 1}. On the TCF, according to the ${h.src('fei_tcf_manual', 'candidate manual')}, B2 starts at ${h.P.tcf.cecr[2][1]} in comprehension and at ${h.P.tcf.cecr20[2][1]} out of 20 in expression. B1 stops at ${h.P.tef.cecr[2][1] - 1}: a candidate at ${h.num(h.P.tef.cecr[2][1] - 15)} in writing is ${h.num(15)} points short, whatever the other tests say. The ${h.a('tef-tcf-cefr', 'CEFR page')} gives every band.</p>
<h2>Route 3: exemptions</h2>
<p>The order keeps two exemptions. The first covers applicants with a disability or a health condition, shown by a medical certificate. The second covers refugees and stateless persons aged over ${h.P.france.refugeeAge} who have resided in France for ${h.P.france.refugeeYears} years. The age limit that removes the requirement for the resident card (${h.P.france.ageExempt}) does not apply here.</p>
<h2>Preparing for B2 in writing and speaking</h2>
<p>Whatever the test, B2 in writing and speaking means producing arguments, not just messages. The TEF Canada already trains this with its task B in writing (defending a point of view in at least ${h.P.tef.canada.ee.b.words} words) and its section B in speaking (convincing someone for ${h.P.tef.canada.eo.b} minutes); the TCF Canada does it with its third writing task and its point-of-view speaking task. The ${h.a('french-writing', 'writing practice')} and the ${h.a('french-speaking', 'speaking practice')} on this site work on exactly those tasks with a timer. They follow the TEF Canada and TCF Canada formats and give an indication of our own, not a certified level.</p>`,
  },
  fr: {
    slug: 'naturalisation-niveau-b2',
    nav: 'Naturalisation : B2',
    card: 'Le niveau B2 exigé pour la naturalisation depuis 2026 : diplômes admis, conditions du test, dispenses et scores B2.',
    title: 'Naturalisation niveau B2 : tests, diplômes et dispenses',
    description: 'Naturalisation et niveau B2 de français : diplômes qui le prouvent, conditions du test fixées par l’arrêté de 2025, dispenses, scores TEF et TCF du B2.',
    h1: 'Naturalisation : le niveau B2 exigé depuis le 1er janvier 2026',
    intro: 'Demander la nationalité française suppose désormais de prouver le B2 à l’écrit et à l’oral. Voici comment le prouver, à quoi doit ressembler le test et qui en est dispensé.',
    resume: (h) => `Depuis le 1er janvier 2026, les candidats à la nationalité française doivent prouver un niveau ${h.P.france.naturalisation} du CECR, à l’écrit comme à l’oral, en application de l’arrêté du 22 décembre 2025 publié au Journal officiel du 26 décembre 2025. Les demandes déposées avant cette date restent régies par les arrêtés de 2020. La preuve peut venir d’un diplôme : le brevet, un diplôme d’État de niveau 3 ou plus, une certification inscrite au RNCP de niveau 3 ou plus, ou tout diplôme attestant au moins le B2. À défaut, elle vient d’un test inscrit à un répertoire spécifique, qui doit certifier le B2 dans quatre épreuves distinctes passées le même jour en centre, avec contrôle d’identité ; l’attestation vaut ${h.P.france.validityYears} ans. Deux dispenses existent : un handicap ou un état de santé attesté par certificat médical, et les réfugiés ou apatrides de plus de ${h.P.france.refugeeAge} ans justifiant de ${h.P.france.refugeeYears} ans de résidence en France. Sur les échelles du TEF et du TCF, le B2 commence à ${h.P.tef.cecr[2][1]} dans chaque épreuve, et à ${h.P.tcf.cecr20[2][1]} sur 20 dans les expressions du TCF.`,
    faqs: (h) => [
      { q: 'Faut-il le B2 dans les quatre épreuves pour la naturalisation ?', a: `L’arrêté exige le B2 dans quatre épreuves distinctes passées le même jour, et Service-Public formule l’exigence comme un B2 à l’écrit et à l’oral. Si une épreuve reste en dessous, l’attestation ne montrera pas le B2 partout. Sur l’échelle du TEF, cela veut dire ${h.P.tef.cecr[2][1]} ou plus dans chaque épreuve, pas en moyenne.` },
      { q: 'J’ai déposé ma demande en 2025 : le B2 s’applique-t-il à moi ?', a: 'Non. Selon l’arrêté et Service-Public, les demandes déposées avant le 1er janvier 2026 restent soumises aux arrêtés précédents de 2020. Le B2 s’applique aux demandes déposées à partir du 1er janvier 2026. Conservez la preuve de la date de dépôt dans votre dossier.' },
      { q: 'Quels diplômes dispensent du test de français pour la naturalisation ?', a: 'L’arrêté admet le diplôme national du brevet, un diplôme d’État de niveau 3 ou plus, une certification inscrite au RNCP de niveau 3 ou plus, et tout diplôme attestant au moins le B2. Avec l’un d’eux, aucun test n’est nécessaire. Vérifiez sur Service-Public les pièces à fournir pour le prouver.' },
      { q: 'Qui est dispensé de toute exigence de B2 ?', a: `Deux cas : les demandeurs atteints d’un handicap ou d’un problème de santé attesté par un certificat médical, et les réfugiés ou apatrides de plus de ${h.P.france.refugeeAge} ans qui résident en France depuis ${h.P.france.refugeeYears} ans. Tous les autres doivent prouver le B2 par diplôme ou par test.` },
    ],
    body: (h) => `
<h2>Trois manières de remplir l’exigence</h2>
<p>L’${h.src('jo_naturalisation', 'arrêté du 22 décembre 2025')} et la ${h.src('sp_naturalisation', 'fiche Service-Public sur la naturalisation')} laissent trois voies : un diplôme qui prouve le niveau, un test de langue conforme aux conditions de l’arrêté, ou une dispense. L’outil ci-dessus affiche le niveau demandé pour chaque démarche française, et le mini-calculateur voisin indique si un score TEF ou TCF atteint le B2.</p>
<h2>Première voie : un diplôme</h2>
${h.table(['Diplôme admis', 'Condition'], [
  ['Diplôme national du brevet', 'diplôme français'],
  ['Diplôme d’État', 'niveau 3 ou plus'],
  ['Certification inscrite au RNCP', 'niveau 3 ou plus'],
  ['Tout autre diplôme', `attestant au moins le ${h.P.france.naturalisation}`],
], 'Diplômes admis comme preuve du B2 pour la naturalisation (arrêté du 22 décembre 2025, Service-Public).', ['l', 'l'])}
<p>Si vous en détenez un, aucun test n’est nécessaire : le diplôme lui-même sert de preuve dans le dossier. Seuls les candidats sans diplôme de cette liste, et sans dispense, doivent passer un test.</p>
<h2>Deuxième voie : un test, à des conditions strictes</h2>
<p>Une attestation ne compte que si le test figure à un répertoire spécifique et si la session a respecté quatre conditions : quatre épreuves distinctes (compréhension écrite et orale, expression écrite et orale), passées le même jour, dans un centre, avec contrôle d’identité. L’attestation doit en outre être valide, c’est-à-dire dater de moins de ${h.P.france.validityYears} ans. Une session passée hors d’un centre, ou étalée sur plusieurs jours, ne remplit pas ces conditions.</p>
<p>Le ${h.a('tef-irn', 'TEF IRN')} certifie jusqu’au B2 en quatre épreuves, et le ${h.a('tcf-irn', 'TCF IRN')} est la version du TCF consacrée au séjour et à la nationalité. Avant de réserver, vérifiez auprès de l’organisateur ou du centre que la session est bien celle retenue pour la naturalisation.</p>
<h2>Le B2 en scores</h2>
<p>Sur l’échelle que publie la CCI dans son ${h.src('cci_tef_cecr', 'tableau TEF et CECR')}, le B2 va de ${h.P.tef.cecr[2][1]} à ${h.P.tef.cecr[1][1] - 1}. Au TCF, selon le ${h.src('fei_tcf_manual', 'manuel du candidat')}, il commence à ${h.P.tcf.cecr[2][1]} en compréhension et à ${h.P.tcf.cecr20[2][1]} sur 20 en expression. Le B1 s’arrête à ${h.P.tef.cecr[2][1] - 1} : un candidat à ${h.num(h.P.tef.cecr[2][1] - 15)} en expression écrite est à ${h.num(15)} points du compte, quels que soient ses autres résultats. La page du ${h.a('tef-tcf-cefr', 'niveau CECR')} donne toutes les bandes.</p>
<h2>Troisième voie : les dispenses</h2>
<p>L’arrêté maintient deux dispenses. La première vise les demandeurs atteints d’un handicap ou d’un problème de santé, attesté par un certificat médical. La seconde vise les réfugiés et apatrides âgés de plus de ${h.P.france.refugeeAge} ans qui vivent en France depuis ${h.P.france.refugeeYears} ans. La limite d’âge qui supprime l’exigence pour la carte de résident (${h.P.france.ageExempt} ans) ne joue pas ici.</p>
<h2>Se préparer au B2 à l’écrit et à l’oral</h2>
<p>Quel que soit le test, le B2 à l’écrit et à l’oral suppose d’argumenter, pas seulement de transmettre un message. Le TEF Canada entraîne déjà à cela avec sa section B écrite (défendre un point de vue en ${h.P.tef.canada.ee.b.words} mots au moins) et sa section B orale (convaincre pendant ${h.P.tef.canada.eo.b} minutes) ; le TCF Canada avec sa troisième tâche écrite et sa tâche orale de point de vue. L’${h.a('french-writing', 'entraînement à l’expression écrite')} et l’${h.a('french-speaking', 'entraînement à l’expression orale')} du site travaillent ces tâches, chronomètre à l’appui. Ils suivent les formats du TEF Canada et du TCF Canada et donnent une indication de notre cru, pas un niveau certifié.</p>`,
  },
});
