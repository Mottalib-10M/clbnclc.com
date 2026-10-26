import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const band = (h: Helpers, x: number) => {
  for (const [lv, min] of h.P.tef.cecr as Array<[string, number]>) if (x >= min) return lv;
  return '<A1';
};
const tefRows = (h: Helpers) => (h.P.tef.cecr as Array<[string, number]>).map(([lv, min], i, arr) => [lv, `${h.num(min)}–${h.num(i === 0 ? h.P.tests.tef2023.max : arr[i - 1][1] - 1)}`]);

export default definePage({
  id: 'tef-tcf-cefr',
  group: 'france',
  order: 78,
  tool: { kind: 'cefr', props: { mode: 'tef' } },
  mini: { kind: 'mini:cefr' },
  related: ['tef-irn', 'tcf-irn', 'naturalisation-b2', 'residence-card-level', 'tef-canada-score', 'citizenship-language'],
  sources: ['cci_tef_cecr', 'fei_tcf_manual', 'coe_cefr', 'jo_titres', 'jo_naturalisation', 'ircc_cit_lang'],
  en: {
    slug: 'tef-tcf-cefr-level',
    nav: 'TEF and TCF to CEFR',
    card: 'TEF and TCF scores read as CEFR levels, A1 to C2, and the level France and IRCC ask in CEFR terms.',
    title: 'TEF and TCF score to CEFR level: A1 to C2 conversion table',
    description: 'TEF and TCF score to CEFR level: CCI and France Éducation international bands from A1 to C2, the TCF marks out of 20 and the level each French procedure asks.',
    h1: 'TEF and TCF scores as CEFR levels',
    intro: 'Type a TEF or TCF score to read it as a level of the Common European Framework. France counts in these levels; Canada counts in NCLC.',
    resume: (h) => `Both French tests can be read on the Common European Framework of Reference (CEFR), the six-level scale from A1 to C2 that France uses for residence cards and naturalisation. On the TEF, the CCI Paris Île-de-France publishes bands of one hundred points: ${h.P.tef.cecr[5][1]} to ${h.P.tef.cecr[4][1] - 1} is A1, ${h.P.tef.cecr[4][1]} to ${h.P.tef.cecr[3][1] - 1} A2, ${h.P.tef.cecr[3][1]} to ${h.P.tef.cecr[2][1] - 1} B1, ${h.P.tef.cecr[2][1]} to ${h.P.tef.cecr[1][1] - 1} B2, ${h.P.tef.cecr[1][1]} to ${h.P.tef.cecr[0][1] - 1} C1 and ${h.P.tef.cecr[0][1]} to ${h.P.tests.tef2023.max} C2. The TCF uses the same thresholds for its comprehension scores, while its writing and speaking marks out of 20 have their own: A2 from ${h.P.tcf.cecr20[4][1]}, B1 from ${h.P.tcf.cecr20[3][1]}, B2 from ${h.P.tcf.cecr20[2][1]}, C1 from ${h.P.tcf.cecr20[1][1]} and C2 from ${h.P.tcf.cecr20[0][1]}. In France since 1 January 2026, a first multi-year card asks ${h.P.france.pluri}, a first resident card ${h.P.france.resident} and naturalisation ${h.P.france.naturalisation}. In Canada, IRCC reads the TEF Canada and TCF Canada in NCLC levels for Express Entry, but expresses its citizenship requirement for those two tests as ${h.P.citizenship.tefCefr} or higher. No official table in our sources converts NCLC directly into CEFR.`,
    faqs: (h) => [
      { q: 'Is NCLC 7 the same as B2?', a: `No official table we rely on says so. The two scales were built separately: NCLC by the Centre for Canadian Language Benchmarks, CEFR by the Council of Europe. You can only note where a given score falls on each: ${h.range('tef', 'R', 7).split('–')[0]}, the NCLC 7 floor in TEF Canada reading, sits in the ${band(h, h.P.tests.tef2023.R[5][1])} band of the CCI CEFR table. That is an observation, not an equivalence.` },
      { q: 'Why does the TCF give a level out of 20 for writing?', a: `Because the TCF reports its expression tests as marks out of 20, with their own CEFR thresholds. On that scale B1 starts at ${h.P.tcf.cecr20[3][1]} and B2 at ${h.P.tcf.cecr20[2][1]}; on the 100 to 699 comprehension scale, B1 starts at ${h.P.tcf.cecr[3][1]} and B2 at ${h.P.tcf.cecr[2][1]}. The tool on this page lets you pick the scale.` },
      { q: 'Does a CEFR level on my report expire?', a: `The level itself does not change, but the certificate that proves it has a validity: ${h.P.tef.validityYears} years for the TEF and the TCF, and the French orders ask for a certificate under ${h.P.france.validityYears} years old. Canada is the exception for citizenship, where IRCC accepts expired results.` },
    ],
    body: (h) => `
<h2>The TEF scale in CEFR levels</h2>
<p>The CCI Paris Île-de-France publishes a ${h.src('cci_tef_cecr', 'correspondence table between TEF scores and CEFR levels')}. Each level covers a band of the 0 to 699 scale:</p>
${h.table(['CEFR level', 'TEF score'], tefRows(h), 'TEF score to CEFR level (CCI Paris Île-de-France).', ['l', 'r'])}
<p>The same table applies to each test separately. A candidate can therefore be B2 in reading and B1 in speaking on the same report.</p>
<h2>The TCF scale, with its marks out of 20</h2>
<p>The ${h.src('fei_tcf_manual', 'TCF candidate manual')} gives two scales: one for comprehension scores (100 to 699), one for expression marks (out of 20).</p>
${h.table(['CEFR level', 'Comprehension from', 'Expression (out of 20) from'], h.P.tcf.cecr.map((c, i) => [String(c[0]), c[1], h.P.tcf.cecr20[i][1]]), 'TCF score to CEFR level (France Éducation international manual, version J).', ['l', 'r', 'r'])}
<p>The expression bands are narrow near the top: C1 needs ${h.P.tcf.cecr20[1][1]} out of 20 and C2 ${h.P.tcf.cecr20[0][1]}.</p>
<h2>What the levels mean</h2>
<p>The ${h.src('coe_cefr', 'Council of Europe global scale')} describes six levels in three pairs: A1 and A2 for basic users, B1 and B2 for independent users, C1 and C2 for proficient users. The tool above returns the level of each score; the mini-tool beside this text adds how many points separate a score from B2.</p>
<h2>Which level, for what</h2>
<p>In France, the ${h.src('jo_titres', 'order on residence card certifications')} and the ${h.src('jo_naturalisation', 'naturalisation order')} set ${h.P.france.pluri} for a first multi-year card, ${h.P.france.resident} for a first resident card and ${h.P.france.naturalisation} for naturalisation, the last one in four distinct tests on the same day. The pages on the ${h.a('residence-card-level', 'residence card level')} and on ${h.a('naturalisation-b2', 'naturalisation')} go through the conditions. On the TEF IRN, the overall level follows a specific rule explained on the ${h.a('tef-irn', 'TEF IRN page')}.</p>
<p>In Canada, the ${h.src('ircc_cit_lang', 'IRCC citizenship page')} states its requirement for the TEF Canada and the TCF Canada as ${h.P.citizenship.tefCefr} or higher in listening and speaking; see the ${h.a('citizenship-language', 'citizenship page')}. For Express Entry, IRCC works in NCLC levels only, on the ${h.a('tef-canada-score', 'TEF Canada score page')}.</p>
<h2>NCLC and CEFR: where a score falls on each</h2>
<p>None of our official sources gives a direct NCLC to CEFR table, so we do not publish one. What we can show is where the NCLC floors of the TEF Canada (reading, tests since 11 December 2023) fall on the CCI's CEFR table:</p>
${h.table(['NCLC (TEF Canada reading)', 'Lowest score', 'CEFR band of that score'], [10, 9, 8, 7, 6, 5, 4].map((lv) => { const x = h.P.tests.tef2023.R[12 - lv][1]; return [String(lv), x, band(h, x)]; }), 'Observation from two separate tables; not an official equivalence.', ['l', 'r', 'l'])}
<p>Read this as a rough orientation for someone who holds one scale and needs the other, never as proof for a procedure.</p>`,
  },
  fr: {
    slug: 'niveau-cecr-tef-tcf',
    nav: 'TEF et TCF en CECR',
    card: 'Les scores TEF et TCF lus en niveaux du CECR, de A1 à C2, et le niveau qu’exigent la France et IRCC.',
    title: 'Niveau CECR au TEF et au TCF : tableau de A1 à C2 en 2026',
    description: 'Niveau CECR d’un score TEF ou TCF : bandes de la CCI et de France Éducation international de A1 à C2, notes sur 20 du TCF et niveau de chaque démarche.',
    h1: 'Les scores TEF et TCF en niveaux du CECR',
    intro: 'Saisissez un score TEF ou TCF pour le lire en niveau du Cadre européen commun de référence. La France raisonne dans ces niveaux, le Canada en NCLC.',
    resume: (h) => `Les deux tests de français se lisent sur le Cadre européen commun de référence pour les langues (CECR), l’échelle à six niveaux, de A1 à C2, qu’emploie la France pour les titres de séjour et la naturalisation. Pour le TEF, la CCI Paris Île-de-France publie des bandes de cent points : de ${h.P.tef.cecr[5][1]} à ${h.P.tef.cecr[4][1] - 1}, A1 ; de ${h.P.tef.cecr[4][1]} à ${h.P.tef.cecr[3][1] - 1}, A2 ; de ${h.P.tef.cecr[3][1]} à ${h.P.tef.cecr[2][1] - 1}, B1 ; de ${h.P.tef.cecr[2][1]} à ${h.P.tef.cecr[1][1] - 1}, B2 ; de ${h.P.tef.cecr[1][1]} à ${h.P.tef.cecr[0][1] - 1}, C1 ; de ${h.P.tef.cecr[0][1]} à ${h.P.tests.tef2023.max}, C2. Le TCF reprend ces seuils pour ses compréhensions, mais ses notes d’expression sur 20 ont les leurs : A2 dès ${h.P.tcf.cecr20[4][1]}, B1 dès ${h.P.tcf.cecr20[3][1]}, B2 dès ${h.P.tcf.cecr20[2][1]}, C1 dès ${h.P.tcf.cecr20[1][1]}, C2 dès ${h.P.tcf.cecr20[0][1]}. En France, depuis le 1er janvier 2026, une première carte pluriannuelle exige l’${h.P.france.pluri}, une première carte de résident le ${h.P.france.resident} et la naturalisation le ${h.P.france.naturalisation}. Au Canada, IRCC lit le TEF Canada et le TCF Canada en NCLC pour Entrée express, mais formule son exigence pour la citoyenneté en niveau ${h.P.citizenship.tefCefr} ou plus pour ces deux tests. Aucune grille officielle de nos sources ne convertit directement les NCLC en CECR.`,
    faqs: (h) => [
      { q: 'Le NCLC 7 équivaut-il au B2 ?', a: `Aucune grille officielle que nous suivons ne l’affirme. Les deux échelles ont été bâties séparément : les NCLC par le Centre des niveaux de compétence linguistique canadiens, le CECR par le Conseil de l’Europe. On peut seulement constater où tombe un score sur chacune : ${h.range('tef', 'R', 7).split('–')[0]}, plancher du NCLC 7 en compréhension écrite au TEF Canada, se situe dans la bande ${band(h, h.P.tests.tef2023.R[5][1])} du tableau CECR de la CCI. C’est un constat, pas une équivalence.` },
      { q: 'Pourquoi le TCF donne-t-il un niveau sur 20 à l’écrit ?', a: `Parce que le TCF exprime ses épreuves d’expression par une note sur 20, avec ses propres seuils CECR. Sur cette échelle, le B1 commence à ${h.P.tcf.cecr20[3][1]} et le B2 à ${h.P.tcf.cecr20[2][1]} ; sur l’échelle de 100 à 699 des compréhensions, le B1 commence à ${h.P.tcf.cecr[3][1]} et le B2 à ${h.P.tcf.cecr[2][1]}. L’outil de cette page permet de choisir l’échelle.` },
      { q: 'Un niveau CECR inscrit sur l’attestation expire-t-il ?', a: `Le niveau lui-même ne change pas, mais l’attestation qui le prouve a une durée de validité : ${h.P.tef.validityYears} ans pour le TEF et le TCF, et les arrêtés français exigent une attestation de moins de ${h.P.france.validityYears} ans. Le Canada fait exception pour la citoyenneté : IRCC y accepte des résultats expirés.` },
    ],
    body: (h) => `
<h2>L’échelle du TEF en niveaux du CECR</h2>
<p>La CCI Paris Île-de-France publie un ${h.src('cci_tef_cecr', 'tableau de correspondance entre scores TEF et niveaux du CECR')}. Chaque niveau couvre une bande de l’échelle de 0 à 699 :</p>
${h.table(['Niveau CECR', 'Score TEF'], tefRows(h), 'Score TEF et niveau du CECR (CCI Paris Île-de-France).', ['l', 'r'])}
<p>Le tableau s’applique à chaque épreuve séparément : un candidat peut donc être B2 en compréhension écrite et B1 en expression orale sur la même attestation.</p>
<h2>L’échelle du TCF, notes sur 20 comprises</h2>
<p>Le ${h.src('fei_tcf_manual', 'manuel du candidat TCF')} donne deux échelles : l’une pour les scores de compréhension (100 à 699), l’autre pour les notes d’expression (sur 20).</p>
${h.table(['Niveau CECR', 'Compréhension à partir de', 'Expression (sur 20) à partir de'], h.P.tcf.cecr.map((c, i) => [String(c[0]), c[1], h.P.tcf.cecr20[i][1]]), 'Score TCF et niveau du CECR (manuel de France Éducation international, version J).', ['l', 'r', 'r'])}
<p>En haut de l’échelle, les bandes d’expression sont étroites : le C1 demande ${h.P.tcf.cecr20[1][1]} sur 20, le C2 ${h.P.tcf.cecr20[0][1]}.</p>
<h2>Ce que recouvrent les niveaux</h2>
<p>L’${h.src('coe_cefr', 'échelle globale du Conseil de l’Europe')} décrit six niveaux regroupés par paires : A1 et A2 pour l’utilisateur élémentaire, B1 et B2 pour l’utilisateur indépendant, C1 et C2 pour l’utilisateur expérimenté. L’outil ci-dessus donne le niveau de chaque score ; le mini-calculateur voisin ajoute l’écart qui le sépare du B2.</p>
<h2>Quel niveau, pour quelle démarche</h2>
<p>En France, l’${h.src('jo_titres', 'arrêté sur les certifications pour les titres de séjour')} et l’${h.src('jo_naturalisation', 'arrêté sur la naturalisation')} fixent l’${h.P.france.pluri} pour une première carte pluriannuelle, le ${h.P.france.resident} pour une première carte de résident et le ${h.P.france.naturalisation} pour la naturalisation, ce dernier dans quatre épreuves distinctes le même jour. Les pages sur le ${h.a('residence-card-level', 'niveau exigé pour un titre de séjour')} et sur la ${h.a('naturalisation-b2', 'naturalisation')} détaillent les conditions. Au TEF IRN, le niveau global suit une règle propre, expliquée sur la page ${h.a('tef-irn', 'TEF IRN')}.</p>
<p>Au Canada, la ${h.src('ircc_cit_lang', 'page d’IRCC sur la citoyenneté')} formule l’exigence pour le TEF Canada et le TCF Canada en niveau ${h.P.citizenship.tefCefr} ou plus à l’écoute et à l’oral ; voir la page ${h.a('citizenship-language', 'citoyenneté')}. Pour Entrée express, IRCC ne raisonne qu’en NCLC, sur la page du ${h.a('tef-canada-score', 'score TEF Canada')}.</p>
<h2>NCLC et CECR : où tombe un même score</h2>
<p>Aucune de nos sources officielles ne fournit de grille directe entre NCLC et CECR : nous n’en publions donc pas. On peut en revanche montrer où tombent les planchers NCLC du TEF Canada (compréhension écrite, tests depuis le 11 décembre 2023) dans le tableau CECR de la CCI :</p>
${h.table(['NCLC (TEF Canada, compréhension écrite)', 'Score le plus bas', 'Bande CECR de ce score'], [10, 9, 8, 7, 6, 5, 4].map((lv) => { const x = h.P.tests.tef2023.R[12 - lv][1]; return [String(lv), x, band(h, x)]; }), 'Constat tiré de deux tableaux distincts ; pas une équivalence officielle.', ['l', 'r', 'l'])}
<p>Lisez-le comme un repère grossier pour qui connaît une échelle et cherche l’autre, jamais comme une preuve à verser à un dossier.</p>`,
  },
});
