import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'tcf-irn',
  group: 'france',
  order: 72,
  tool: { kind: 'level', props: { program: 'frResident' } },
  mini: { kind: 'mini:cefr' },
  related: ['tef-irn', 'residence-card-level', 'naturalisation-b2', 'tef-tcf-cefr', 'tcf-canada', 'tcf-mock'],
  sources: ['jo_titres', 'jo_naturalisation', 'fei_tcf_manual', 'fei_tcf_canada', 'sp_resident', 'sp_pluri'],
  en: {
    slug: 'tcf-irn',
    nav: 'TCF IRN',
    card: 'The TCF IRN for France: what is confirmed, what is not, and how a TCF score reads as a CEFR level.',
    title: 'TCF IRN: residence card levels and how the TCF is scored',
    description: 'TCF IRN for French residence cards and naturalisation: levels required since 2026, how the TCF manual scores the test, CEFR bands and what remains unconfirmed.',
    h1: 'TCF IRN: what we know, and what we could not confirm',
    intro: 'The TCF IRN is France Éducation international’s TCF for residence and nationality. Choose your procedure in the tool to see the level it asks.',
    resume: (h) => `The TCF IRN is one of the versions of the Test de connaissance du français run by France Éducation international, next to the TCF TP, the TCF Québec and the TCF Canada. The order of 22 December 2025 on residence card certifications recognises two certifications: the TCF of France Éducation international and the TEF of the CCI Paris Île-de-France. Since 1 January 2026, a first multi-year card requires ${h.P.france.pluri}, a first resident card ${h.P.france.resident} (not after age ${h.P.france.ageExempt}) and naturalisation ${h.P.france.naturalisation} in writing and speaking. A new TCF IRN format has been reported since 2025, but we could not read it on an official source, so this page gives no question count or duration for the TCF IRN. What the TCF candidate manual (version J, September 2024) does establish is the TCF's scoring: comprehension from 100 to 699, expression out of 20, with B1 starting at ${h.P.tcf.cecr[3][1]} or ${h.P.tcf.cecr20[3][1]} out of 20 and B2 at ${h.P.tcf.cecr[2][1]} or ${h.P.tcf.cecr20[2][1]} out of 20. Check the current TCF IRN format with France Éducation international or your centre before you book.`,
    faqs: (h) => [
      { q: 'How long is the TCF IRN and how many questions does it have?', a: 'We could not confirm it. A new format has been mentioned since 2025, but the France Éducation international page describing it could not be read when we checked, and we do not publish figures we have not seen on an official source. Ask your test centre for the format of the session you book.' },
      { q: 'What TCF score gives B1 for a resident card?', a: `On the TCF scale described in the candidate manual, B1 starts at ${h.P.tcf.cecr[3][1]} in the comprehension tests and at ${h.P.tcf.cecr20[3][1]} out of 20 in the expression tests; B2 starts at ${h.P.tcf.cecr[2][1]} and ${h.P.tcf.cecr20[2][1]} out of 20. How the TCF IRN combines the tests into one overall level is not confirmed here; the certificate itself states the level.` },
      { q: 'Is a TCF Canada result accepted for a French residence card?', a: 'The order recognises the TCF of France Éducation international for residence cards without our being able to confirm, from the sources we read, which TCF versions it covers. The TCF Canada is built for Canadian immigration; before relying on it in France, check with the prefecture or France Éducation international that it fits your procedure.' },
    ],
    body: (h) => `
<h2>What is confirmed</h2>
<p>The ${h.src('jo_titres', 'order of 22 December 2025 on residence card certifications')}, published in the Journal officiel on 26 December 2025, names two recognised certifications for residence cards: the TCF, from France Éducation international, and the TEF, from the CCI Paris Île-de-France. The TCF IRN is the TCF version aimed at residence and nationality; the candidate manual lists it next to the TCF TP, the TCF Québec and the TCF Canada.</p>
<p>The levels themselves come from the two orders and Service-Public:</p>
${h.table(['Procedure (first application, since 1 January 2026)', 'CEFR level'], [
  [`First ${h.src('sp_pluri', 'multi-year residence card')}`, h.P.france.pluri],
  [`First ${h.src('sp_resident', 'resident card')} (not required after age ${h.P.france.ageExempt})`, h.P.france.resident],
  ['Naturalisation (writing and speaking)', h.P.france.naturalisation],
], 'Sources: orders of 22 December 2025; Service-Public.fr.', ['l', 'r'])}
<h2>What we could not confirm</h2>
<p>A revised TCF IRN format has been reported since 2025. The official France Éducation international page that would describe it could not be read when we checked on ${h.date(h.P.retrieved_at)}, so we give neither a number of questions nor a duration for the TCF IRN, nor its fee. If someone quotes you a precise format, ask for the official source. The tool above lets you choose your procedure and shows the level it asks; it does not simulate the TCF IRN itself.</p>
<h2>How the TCF is scored</h2>
<p>The ${h.src('fei_tcf_manual', 'TCF candidate manual')} (version J, September 2024) describes principles shared across its presentation of the test: multiple-choice questions with ${h.P.tcf.choices} options and one right answer, difficulty that rises through the test, recordings played only once, comprehension scores from 100 to 699, and expression tasks marked out of 20. Those scores map to CEFR levels as follows:</p>
${h.table(['CEFR level', 'Comprehension (100–699) from', 'Expression (out of 20) from'], h.P.tcf.cecr.map((c, i) => [String(c[0]), c[1], h.P.tcf.cecr20[i][1]]), 'TCF score to CEFR level, from the France Éducation international manual.', ['l', 'r', 'r'])}
<p>The mini-tool beside this article converts one TEF or TCF score into a level and tells you how far it is from B2.</p>
<h2>Naturalisation: a stricter frame</h2>
<p>For nationality, the ${h.src('jo_naturalisation', 'naturalisation order')} goes further than a level. A test must be listed in a specific register, show B2 in four distinct tests taken the same day in a centre, and include an identity check; the certificate is valid ${h.P.france.validityYears} years. Some diplomas exempt you from the test altogether. The ${h.a('naturalisation-b2', 'naturalisation page')} lists them.</p>
<h2>TCF IRN or TEF IRN?</h2>
<p>Both certifications are recognised for residence cards. The difference for us is information: the ${h.a('tef-irn', 'TEF IRN page')} can describe the format and the overall level rule because the CCI publishes them in a readable form. To train the skills either way, the ${h.a('tcf-mock', 'TCF Canada mock sections')} on this site use four-option questions written by Radif Partners, with the TCF Canada timing.</p>`,
  },
  fr: {
    slug: 'tcf-irn',
    nav: 'TCF IRN',
    card: 'Le TCF IRN pour la France : ce qui est confirmé, ce qui ne l’est pas, et la lecture d’un score TCF en niveau CECR.',
    title: 'TCF IRN : niveaux exigés en 2026 et notation du TCF',
    description: 'TCF IRN pour les titres de séjour et la naturalisation : niveaux exigés depuis 2026, notation selon le manuel du TCF, bandes du CECR et points non confirmés.',
    h1: 'Le TCF IRN : ce que l’on sait, et ce qui reste à confirmer',
    intro: 'Le TCF IRN est le TCF de France Éducation international pour le séjour et la nationalité. Choisissez votre démarche dans l’outil pour voir le niveau exigé.',
    resume: (h) => `Le TCF IRN est l’une des versions du Test de connaissance du français de France Éducation international, à côté du TCF TP, du TCF Québec et du TCF Canada. L’arrêté du 22 décembre 2025 sur les certifications de langue pour les cartes de séjour reconnaît deux certifications : le TCF de France Éducation international et le TEF de la CCI Paris Île-de-France. Depuis le 1er janvier 2026, une première carte pluriannuelle exige le niveau ${h.P.france.pluri}, une première carte de résident le niveau ${h.P.france.resident} (pas après ${h.P.france.ageExempt} ans) et la naturalisation le niveau ${h.P.france.naturalisation} à l’écrit et à l’oral. Un nouveau format du TCF IRN est évoqué depuis 2025, mais nous n’avons pas pu le lire sur une source officielle : cette page ne donne donc ni nombre de questions ni durée pour le TCF IRN. Le manuel du candidat TCF (version J, septembre 2024) établit en revanche la notation : compréhensions de 100 à 699, expressions sur 20, le B1 commençant à ${h.P.tcf.cecr[3][1]} ou à ${h.P.tcf.cecr20[3][1]} sur 20, le B2 à ${h.P.tcf.cecr[2][1]} ou à ${h.P.tcf.cecr20[2][1]} sur 20. Vérifiez le format en vigueur auprès de France Éducation international ou de votre centre avant de réserver.`,
    faqs: (h) => [
      { q: 'Combien de temps dure le TCF IRN et combien de questions compte-t-il ?', a: 'Nous n’avons pas pu le confirmer. Un nouveau format est évoqué depuis 2025, mais la page de France Éducation international qui le décrit n’était pas lisible lors de notre vérification, et nous ne publions aucun chiffre non lu sur une source officielle. Demandez à votre centre le format de la session que vous réservez.' },
      { q: 'Quel score TCF donne le B1 pour une carte de résident ?', a: `Sur l’échelle du TCF décrite dans le manuel du candidat, le B1 commence à ${h.P.tcf.cecr[3][1]} dans les épreuves de compréhension et à ${h.P.tcf.cecr20[3][1]} sur 20 dans les épreuves d’expression ; le B2 à ${h.P.tcf.cecr[2][1]} et ${h.P.tcf.cecr20[2][1]} sur 20. La façon dont le TCF IRN combine les épreuves en un niveau global n’est pas confirmée ici : c’est l’attestation qui indique le niveau.` },
      { q: 'Un TCF Canada est-il accepté pour un titre de séjour en France ?', a: 'L’arrêté reconnaît le TCF de France Éducation international pour les titres de séjour, sans que les sources que nous avons lues permettent de confirmer quelles versions du TCF il couvre. Le TCF Canada est conçu pour l’immigration au Canada : avant de vous en servir en France, vérifiez auprès de la préfecture ou de France Éducation international qu’il convient à votre démarche.' },
    ],
    body: (h) => `
<h2>Ce qui est confirmé</h2>
<p>L’${h.src('jo_titres', 'arrêté du 22 décembre 2025 sur les certifications de langue')}, publié au Journal officiel du 26 décembre 2025, cite deux certifications reconnues pour les cartes de séjour : le TCF, de France Éducation international, et le TEF, de la CCI Paris Île-de-France. Le TCF IRN est la version du TCF tournée vers le séjour et la nationalité ; le manuel du candidat la cite à côté du TCF TP, du TCF Québec et du TCF Canada.</p>
<p>Les niveaux eux-mêmes viennent des deux arrêtés et de Service-Public :</p>
${h.table(['Démarche (première demande, depuis le 1er janvier 2026)', 'Niveau CECR'], [
  [`Première ${h.src('sp_pluri', 'carte de séjour pluriannuelle')}`, h.P.france.pluri],
  [`Première ${h.src('sp_resident', 'carte de résident')} (non exigé après ${h.P.france.ageExempt} ans)`, h.P.france.resident],
  ['Naturalisation (écrit et oral)', h.P.france.naturalisation],
], 'Sources : arrêtés du 22 décembre 2025 ; Service-Public.fr.', ['l', 'r'])}
<h2>Ce que nous n’avons pas pu confirmer</h2>
<p>Un format révisé du TCF IRN est évoqué depuis 2025. La page officielle de France Éducation international qui devrait le décrire n’était pas lisible lors de notre vérification du ${h.date(h.P.retrieved_at)} : nous ne donnons donc ni nombre de questions, ni durée, ni tarif pour le TCF IRN. Si l’on vous annonce un format précis, demandez la source officielle. L’outil ci-dessus indique le niveau exigé par votre démarche ; il ne simule pas le TCF IRN lui-même.</p>
<h2>La notation du TCF</h2>
<p>Le ${h.src('fei_tcf_manual', 'manuel du candidat TCF')} (version J, septembre 2024) décrit des principes communs dans sa présentation du test : des questions à ${h.P.tcf.choices} choix avec une seule bonne réponse, une difficulté croissante, des enregistrements diffusés une seule fois, des scores de 100 à 699 en compréhension et des notes sur 20 en expression. Ces résultats se lisent ainsi en niveaux du CECR :</p>
${h.table(['Niveau CECR', 'Compréhension (100 à 699) à partir de', 'Expression (sur 20) à partir de'], h.P.tcf.cecr.map((c, i) => [String(c[0]), c[1], h.P.tcf.cecr20[i][1]]), 'Score TCF et niveau du CECR, d’après le manuel de France Éducation international.', ['l', 'r', 'r'])}
<p>Le mini-calculateur voisin convertit un score TEF ou TCF en niveau et indique l’écart qui le sépare du B2.</p>
<h2>La naturalisation : un cadre plus strict</h2>
<p>Pour la nationalité, l’${h.src('jo_naturalisation', 'arrêté sur la naturalisation')} va au-delà d’un niveau. Le test doit figurer à un répertoire spécifique, attester le B2 dans quatre épreuves distinctes passées le même jour en centre, avec contrôle d’identité ; l’attestation vaut ${h.P.france.validityYears} ans. Certains diplômes dispensent du test : la page ${h.a('naturalisation-b2', 'naturalisation')} les énumère.</p>
<h2>TCF IRN ou TEF IRN ?</h2>
<p>Les deux certifications sont reconnues pour les titres de séjour. La différence, pour nous, tient à l’information disponible : la page ${h.a('tef-irn', 'TEF IRN')} décrit le format et la règle du niveau global parce que la CCI les publie sous une forme lisible. Pour travailler les compétences dans tous les cas, les ${h.a('tcf-mock', 'examens blancs TCF Canada')} du site proposent des questions à quatre choix rédigées par Radif Partners, au rythme du TCF Canada.</p>`,
  },
});
