import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'citizenship-language',
  group: 'scores',
  order: 32,
  tool: { kind: 'level', props: { program: 'citizenship' } },
  mini: { kind: 'mini:citizenship' },
  related: ['tef-canada', 'celpip', 'celpip-vs-ielts', 'which-level', 'test-validity', 'tef-tcf-cefr'],
  sources: ['ircc_cit_lang', 'cci_tef_canada', 'cci_tef_cecr', 'fee_af_edmonton', 'fei_tcf_manual'],
  en: {
    slug: 'citizenship-language-test',
    nav: 'Citizenship language test',
    card: 'The language proof IRCC accepts for citizenship: ages, skills, the result per test, and expired results.',
    title: 'Citizenship language test: CLB 4 results IRCC accepts',
    description: 'Citizenship language test: who must prove CLB 4, the listening and speaking results IRCC accepts per test, TEF and TCF at B1, why expired results count.',
    h1: 'Language proof for Canadian citizenship: the results that count',
    intro: 'Most adult applicants must prove basic English or French. Here is who is concerned, which skills are checked and the result each accepted test must show.',
    resume: (h) => `For a Canadian citizenship application, IRCC asks applicants aged ${h.P.citizenship.ages[0]} to ${h.P.citizenship.ages[1]} to prove CLB or NCLC ${h.P.citizenship.clb} in English or French, and only in two skills: listening and speaking. Reading and writing are not assessed. On its language proof page, IRCC accepts CELPIP-General with level ${h.P.citizenship.celpip} or more in both skills, IELTS General Training with ${h.num(h.P.citizenship.ielts.L, 1)} or more in listening and ${h.num(h.P.citizenship.ielts.S, 1)} or more in speaking, PTE Core with ${h.P.citizenship.pte.L} in listening and ${h.P.citizenship.pte.S} in speaking, and the TEF Canada or TCF Canada at level B1 or higher. Unlike Express Entry, citizenship accepts results that have expired, so a test taken years ago for permanent residence may still do. For French speakers, the CCI offers a TEF Canada limited to listening and speaking for exactly this purpose; a dated centre example priced it at ${h.cad(h.P.fees.afEdmonton.ls)} against ${h.cad(h.P.fees.afEdmonton.full)} for the full test. This page covers language tests only; check the IRCC page for any other kind of proof.`,
    faqs: (h) => [
      { q: 'Can I use the language test from my permanent residence application?', a: `Often yes. IRCC accepts expired results for citizenship, so the report you used for Express Entry can serve again as long as it shows at least CLB ${h.P.citizenship.clb} in listening and speaking, or the equivalent result on that test. The IRCC page explains how to submit it with the application.` },
      { q: 'Do I need a language test if I am over 54?', a: `IRCC's language requirement applies to applicants aged ${h.P.citizenship.ages[0]} to ${h.P.citizenship.ages[1]}. Outside that age range, the language proof described on this page is not asked. Check your age against IRCC's rules on the date that applies to your application, as stated on the IRCC page.` },
      { q: 'Which TEF Canada tests do I sit for citizenship?', a: `Only listening and speaking. The CCI offers this reduced TEF Canada for citizenship applicants, which is shorter and, at many centres, cheaper than the full four-test sitting. The listening test has ${h.P.tef.canada.co.q} questions in ${h.P.tef.canada.co.min} minutes and the speaking test lasts ${h.P.tef.canada.eo.min} minutes.` },
      { q: 'What does B1 mean on a TEF or TCF report?', a: `B1 is a level of the Common European Framework of Reference. On the TEF scale of the CCI, B1 covers ${h.P.tef.cecr[3][1]} to ${h.P.tef.cecr[2][1] - 1}. On the TCF, B1 starts at ${h.P.tcf.cecr[3][1]} in the comprehension tests and at ${h.P.tcf.cecr20[3][1]} out of 20 in the expression tests. IRCC lists B1 or higher as acceptable for citizenship.` },
    ],
    body: (h) => `
<h2>Who has to prove language, and in which skills</h2>
<p>The ${h.src('ircc_cit_lang', 'IRCC citizenship language page')} sets the requirement at CLB or NCLC ${h.P.citizenship.clb} for applicants aged ${h.P.citizenship.ages[0]} to ${h.P.citizenship.ages[1]}. Only two skills count: understanding spoken English or French, and speaking it. That is a far lower bar than Express Entry, where most programs ask CLB ${h.P.ee.fsw} in four skills. You can prove it in English or in French: one accepted test in either language is enough.</p>
<h2>The result each test must show</h2>
${h.table(['Test', 'Listening', 'Speaking'], [
  ['CELPIP-General', `${h.P.citizenship.celpip}+`, `${h.P.citizenship.celpip}+`],
  ['IELTS General Training', `${h.num(h.P.citizenship.ielts.L, 1)}+`, `${h.num(h.P.citizenship.ielts.S, 1)}+`],
  ['PTE Core', `${h.P.citizenship.pte.L}+`, `${h.P.citizenship.pte.S}+`],
  ['TEF Canada', `${h.P.citizenship.tefCefr} or higher`, `${h.P.citizenship.tefCefr} or higher`],
  ['TCF Canada', `${h.P.citizenship.tcfCefr} or higher`, `${h.P.citizenship.tcfCefr} or higher`],
], `Minimum results accepted as language proof for citizenship (IRCC, page modified ${h.date(h.P.sources.ircc_cit_lang.pageDate)}).`, ['l', 'r', 'r'])}
<p>The English thresholds are stated as test scores; the French ones as a level of the European framework. For reference, the ${h.src('cci_tef_cecr', 'CCI CEFR table')} places B1 between ${h.P.tef.cecr[3][1]} and ${h.P.tef.cecr[2][1] - 1} on the TEF scale, and the TCF manual places it from ${h.P.tcf.cecr[3][1]} in comprehension and ${h.P.tcf.cecr20[3][1]} out of 20 in expression. The ${h.a('tef-tcf-cefr', 'CEFR page')} has the full scale.</p>
<h2>Expired results are fine</h2>
<p>For Express Entry, a test report must be less than ${h.P.ee.validityYears} years old. For citizenship, IRCC accepts results that have expired. If you became a permanent resident through Express Entry with a TEF Canada, TCF Canada, CELPIP-General, IELTS General Training or PTE Core report, look for it before booking anything: if it meets the thresholds above, it may be all you need. The ${h.a('test-validity', 'test validity page')} explains the two-year rule that applies everywhere else.</p>
<h2>Booking a test only for citizenship</h2>
<p>If you have no usable report, the shortest route for a French speaker is the TEF Canada limited to listening and speaking, which the ${h.src('cci_tef_canada', 'CCI presents')} as the citizenship option. The listening test has ${h.P.tef.canada.co.q} questions in ${h.P.tef.canada.co.min} minutes and the speaking test lasts ${h.P.tef.canada.eo.min} minutes, in two parts. Prices are set by each centre: as a dated example, the ${h.src('fee_af_edmonton', 'Alliance française d’Edmonton')} listed ${h.cad(h.P.fees.afEdmonton.ls)} for listening and speaking when we read its page on ${h.date(h.P.fees.afEdmonton.read)}. The TCF Canada candidate manual describes its four tests as compulsory, and we found no confirmed reduced format for it. This site is independent: you register with a centre, not here.</p>
<h2>Getting ready for a CLB 4 result</h2>
<p>CLB 4 is the lowest level any IRCC chart counts. On the TEF Canada sat since 11 December 2023, NCLC 4 starts at ${h.range('tef', 'L', 4).split('–')[0]} in listening and ${h.range('tef', 'S', 4).split('–')[0]} in speaking; IRCC's citizenship page, however, expresses the TEF and TCF requirement as ${h.P.citizenship.tefCefr}, so aim for that. The ${h.a('tef-canada', 'TEF Canada page')} describes both tasks of the speaking test, and the ${h.a('celpip-vs-ielts', 'English test comparison')} sets the three English options side by side if English is the easier language for you.</p>`,
  },
  fr: {
    slug: 'test-langue-citoyennete',
    nav: 'Test de langue, citoyenneté',
    card: 'La preuve linguistique qu’IRCC accepte pour la citoyenneté : âges, compétences, résultat par test et résultats expirés.',
    title: 'Test de langue pour la citoyenneté : NCLC 4 et tests admis',
    description: 'Test de langue pour la citoyenneté : qui doit prouver le NCLC 4, les résultats oraux admis par IRCC, le B1 au TEF et au TCF, et les résultats expirés.',
    h1: 'Preuve linguistique pour la citoyenneté canadienne : les résultats admis',
    intro: 'La plupart des adultes doivent prouver un français ou un anglais de base. Voici qui est concerné, quelles compétences sont vérifiées et le résultat exigé dans chaque test.',
    resume: (h) => `Pour la demande de citoyenneté canadienne, IRCC demande aux personnes de ${h.P.citizenship.ages[0]} à ${h.P.citizenship.ages[1]} ans de prouver le NCLC ou CLB ${h.P.citizenship.clb} en français ou en anglais, dans deux compétences seulement : la compréhension et l’expression orales. La lecture et l’écriture ne sont pas évaluées. Sur sa page consacrée à la preuve linguistique, IRCC accepte le TEF Canada et le TCF Canada au niveau B1 ou plus, le CELPIP-General avec au moins ${h.P.citizenship.celpip} dans les deux compétences, l’IELTS General Training avec ${h.num(h.P.citizenship.ielts.L, 1)} à l’écoute et ${h.num(h.P.citizenship.ielts.S, 1)} à l’oral, et le PTE Core avec ${h.P.citizenship.pte.L} à l’écoute et ${h.P.citizenship.pte.S} à l’oral. Contrairement à Entrée express, la citoyenneté accepte des résultats expirés : un test passé il y a des années pour la résidence permanente peut encore servir. Pour les francophones, la CCI propose un TEF Canada limité à l’écoute et à l’oral, conçu pour cette démarche ; un centre le facturait ${h.cad(h.P.fees.afEdmonton.ls)}, contre ${h.cad(h.P.fees.afEdmonton.full)} pour le test complet, à la date de notre relevé. Cette page ne traite que des tests de langue ; pour toute autre preuve, consultez la page d’IRCC.`,
    faqs: (h) => [
      { q: 'Peut-on réutiliser le test de langue de la résidence permanente ?', a: `Souvent, oui. IRCC accepte les résultats expirés pour la citoyenneté : l’attestation utilisée pour Entrée express peut resservir si elle montre au moins le NCLC ${h.P.citizenship.clb} à l’écoute et à l’oral, ou le résultat équivalent dans ce test. La page d’IRCC explique comment la joindre à la demande.` },
      { q: 'Faut-il un test de langue après 54 ans ?', a: `L’exigence linguistique d’IRCC vise les demandeurs de ${h.P.citizenship.ages[0]} à ${h.P.citizenship.ages[1]} ans. En dehors de cette tranche d’âge, la preuve décrite sur cette page n’est pas demandée. Vérifiez votre âge à la date qui s’applique à votre demande, telle que l’indique la page d’IRCC.` },
      { q: 'Quelles épreuves du TEF Canada passer pour la citoyenneté ?', a: `La compréhension orale et l’expression orale seulement. La CCI propose ce TEF Canada réduit aux candidats à la citoyenneté : plus court, et souvent moins cher que la session complète. La compréhension orale compte ${h.P.tef.canada.co.q} questions en ${h.P.tef.canada.co.min} minutes, et l’expression orale dure ${h.P.tef.canada.eo.min} minutes.` },
      { q: 'Que signifie B1 sur une attestation TEF ou TCF ?', a: `B1 est un niveau du Cadre européen commun de référence pour les langues. Sur l’échelle TEF de la CCI, il va de ${h.P.tef.cecr[3][1]} à ${h.P.tef.cecr[2][1] - 1}. Au TCF, il commence à ${h.P.tcf.cecr[3][1]} dans les épreuves de compréhension et à ${h.P.tcf.cecr20[3][1]} sur 20 dans les épreuves d’expression. IRCC accepte B1 ou plus pour la citoyenneté.` },
    ],
    body: (h) => `
<h2>Qui doit prouver sa langue, et dans quelles compétences</h2>
<p>La ${h.src('ircc_cit_lang', 'page d’IRCC sur la preuve linguistique')} fixe l’exigence au NCLC ou CLB ${h.P.citizenship.clb} pour les demandeurs de ${h.P.citizenship.ages[0]} à ${h.P.citizenship.ages[1]} ans. Deux compétences seulement comptent : comprendre le français ou l’anglais parlé, et le parler. La barre est bien plus basse que dans Entrée express, où la plupart des programmes exigent le NCLC ${h.P.ee.fsw} dans quatre épreuves. La preuve peut se faire en français ou en anglais : un seul test accepté, dans l’une ou l’autre langue, suffit.</p>
<h2>Le résultat exigé dans chaque test</h2>
${h.table(['Test', 'Compréhension orale', 'Expression orale'], [
  ['TEF Canada', `${h.P.citizenship.tefCefr} ou plus`, `${h.P.citizenship.tefCefr} ou plus`],
  ['TCF Canada', `${h.P.citizenship.tcfCefr} ou plus`, `${h.P.citizenship.tcfCefr} ou plus`],
  ['CELPIP-General', `${h.P.citizenship.celpip} ou plus`, `${h.P.citizenship.celpip} ou plus`],
  ['IELTS General Training', `${h.num(h.P.citizenship.ielts.L, 1)} ou plus`, `${h.num(h.P.citizenship.ielts.S, 1)} ou plus`],
  ['PTE Core', `${h.P.citizenship.pte.L} ou plus`, `${h.P.citizenship.pte.S} ou plus`],
], `Résultats minimums acceptés comme preuve linguistique pour la citoyenneté (IRCC, page modifiée le ${h.date(h.P.sources.ircc_cit_lang.pageDate)}).`, ['l', 'r', 'r'])}
<p>Pour l’anglais, IRCC donne des scores ; pour le français, un niveau du cadre européen. À titre de repère, le ${h.src('cci_tef_cecr', 'tableau CECR de la CCI')} situe le B1 entre ${h.P.tef.cecr[3][1]} et ${h.P.tef.cecr[2][1] - 1} sur l’échelle du TEF, et le manuel du TCF le fait commencer à ${h.P.tcf.cecr[3][1]} en compréhension et à ${h.P.tcf.cecr20[3][1]} sur 20 en expression. La page du ${h.a('tef-tcf-cefr', 'niveau CECR')} reprend toute l’échelle.</p>
<h2>Les résultats expirés sont acceptés</h2>
<p>Pour Entrée express, une attestation doit avoir moins de ${h.P.ee.validityYears} ans. Pour la citoyenneté, IRCC accepte des résultats expirés. Si vous êtes devenu résident permanent par Entrée express avec un TEF Canada, un TCF Canada, un CELPIP-General, un IELTS General Training ou un PTE Core, retrouvez cette attestation avant de réserver quoi que ce soit : si elle atteint les seuils ci-dessus, elle peut suffire. La page sur la ${h.a('test-validity', 'validité des résultats')} explique la règle des deux ans qui s’applique partout ailleurs.</p>
<h2>Passer un test uniquement pour la citoyenneté</h2>
<p>Sans attestation utilisable, la voie la plus courte pour un francophone est le TEF Canada limité à l’oral, que la ${h.src('cci_tef_canada', 'CCI présente')} comme la formule citoyenneté. La compréhension orale compte ${h.P.tef.canada.co.q} questions en ${h.P.tef.canada.co.min} minutes ; l’expression orale dure ${h.P.tef.canada.eo.min} minutes, en deux sections. Chaque centre fixe son prix : à titre d’exemple daté, l’${h.src('fee_af_edmonton', 'Alliance française d’Edmonton')} affichait ${h.cad(h.P.fees.afEdmonton.ls)} pour l’oral seul lors de notre lecture du ${h.date(h.P.fees.afEdmonton.read)}. Le manuel du candidat présente les quatre épreuves du TCF Canada comme obligatoires, et nous n’avons trouvé aucune formule réduite confirmée pour ce test. Ce site est indépendant : l’inscription se fait auprès d’un centre, pas ici.</p>
<h2>Se préparer à un résultat de base</h2>
<p>Le NCLC 4 est le plus bas niveau que comptent les grilles d’IRCC. Au TEF Canada passé depuis le 11 décembre 2023, il commence à ${h.range('tef', 'L', 4).split('–')[0]} en compréhension orale et à ${h.range('tef', 'S', 4).split('–')[0]} en expression orale ; la page d’IRCC sur la citoyenneté exprime toutefois l’exigence du TEF et du TCF en niveau ${h.P.citizenship.tefCefr} : visez donc ce niveau. La page du ${h.a('tef-canada', 'TEF Canada')} décrit les deux sections de l’expression orale, et le ${h.a('celpip-vs-ielts', 'comparatif des tests d’anglais')} met les trois options côte à côte si l’anglais vous est plus facile.</p>`,
  },
});
