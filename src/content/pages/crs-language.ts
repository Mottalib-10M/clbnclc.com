import { definePage } from '../../lib/guide-types';

const LV = [10, 9, 8, 7, 6, 5, 4];

export default definePage({
  id: 'crs-language',
  group: 'scores',
  order: 26,
  tool: { kind: 'crs' },
  mini: { kind: 'mini:crsfirst' },
  related: ['french-bonus', 'clb-7', 'tef-canada-score', 'tcf-canada-score', 'which-level', 'celpip'],
  sources: ['ircc_crs', 'ircc_ee_lang', 'ircc_cbs'],
  en: {
    slug: 'crs-language-points',
    nav: 'CRS language points',
    card: 'Every language point in the CRS: first and second language, spouse, transferability and French bonus.',
    title: 'CRS language points: first, second language and spouse',
    description: 'CRS language points from your CLB or NCLC levels: first official language, second language, spouse, transferability with education and work, French bonus.',
    h1: 'CRS language points, from CLB level to score',
    intro: 'Enter your levels in each skill, for one or two official languages: the tool adds up the language points exactly as the Comprehensive Ranking System counts them.',
    resume: (h) => `In the Comprehensive Ranking System, language points are counted skill by skill, in up to two official languages and for your spouse. In your first official language, each of the four skills earns ${h.P.crs.first.single[4]} points at CLB 4 or 5, ${h.P.crs.first.single[6]} at 6, ${h.P.crs.first.single[7]} at 7, ${h.P.crs.first.single[8]} at 8, ${h.P.crs.first.single[9]} at 9 and ${h.P.crs.first.single[10]} at 10 or more for a single candidate, up to ${h.P.crs.first.max.single} in total; with an accompanying spouse the scale is slightly lower, up to ${h.P.crs.first.max.withSpouse}. The second official language adds ${h.P.crs.second.perAbility[5]} point per skill at CLB 5 or 6, ${h.P.crs.second.perAbility[7]} at 7 or 8 and ${h.P.crs.second.perAbility[9]} at 9 or more, capped at ${h.P.crs.second.max.single} (${h.P.crs.second.max.withSpouse} with a spouse). A spouse's own test adds up to ${h.P.crs.spouse.max}. Language also drives transferability points combined with education or foreign work, up to ${h.P.crs.transfer.maxEach} per combination, and NCLC ${h.P.crs.frenchBonus.nclc} in all four French skills opens an additional bonus of ${h.P.crs.frenchBonus.englishLow} or ${h.P.crs.frenchBonus.englishClb5} points. The tool above adds all of it from your levels.`,
    faqs: (h) => [
      { q: 'From which level does a language test start earning CRS points?', a: `In the first official language, from CLB 4: ${h.P.crs.first.single[4]} points per skill for a single candidate, the same at CLB 5. In the second official language and for the spouse, from CLB 5: ${h.P.crs.second.perAbility[5]} point per skill. Below those levels a skill earns nothing, so a weak second-language test adds no points at all.` },
      { q: 'Why do I get fewer language points with a spouse?', a: `The CRS splits core points between you and your spouse when the spouse comes to Canada with you. Your own first-language points drop to ${h.P.crs.first.withSpouse[10]} per skill at CLB 10 (instead of ${h.P.crs.first.single[10]}), and your spouse can earn up to ${h.P.crs.spouse.max} points with their own test: ${h.P.crs.spouse.perAbility[5]} per skill at CLB 5 or 6, ${h.P.crs.spouse.perAbility[7]} at 7 or 8, ${h.P.crs.spouse.perAbility[9]} at 9 or more.` },
      { q: 'How much can language add through transferability?', a: `Up to ${h.P.crs.transfer.maxEach} points per combination and ${h.P.crs.transfer.max} in total. With two or more post-secondary credentials, for example, CLB 7 or more in all four skills with at least one below 9 gives ${h.P.crs.transfer.education.twoPlus[0]} points, and CLB 9 or more everywhere gives ${h.P.crs.transfer.education.twoPlus[1]}. Foreign work experience follows the same pattern.` },
    ],
    body: (h) => `
<h2>Where language sits in the 1,200 points</h2>
<p>The ${h.src('ircc_crs', 'IRCC criteria')} divide the score into four sections: core human capital factors (up to ${h.P.crs.sections.coreSingle} points for a single candidate, ${h.P.crs.sections.coreWithSpouse} with a spouse), spouse factors (up to ${h.P.crs.sections.spouse}), skill transferability (up to ${h.P.crs.sections.transfer}) and additional points (up to ${h.P.crs.sections.additional}), for a maximum of ${h.num(h.P.crs.sections.total)}. Language appears in all four.</p>
<h2>Points per skill, by level</h2>
${h.table(['CLB / NCLC', 'First language, single', 'First language, with spouse', 'Second language', 'Spouse’s language'], LV.map((lv) => [String(lv) + (lv === 10 ? '+' : ''), h.P.crs.first.single[lv], h.P.crs.first.withSpouse[lv], h.P.crs.second.perAbility[lv], h.P.crs.spouse.perAbility[lv]]), 'CRS points per skill (reading, writing, listening, speaking each count once). Below level 4, nothing. Source: IRCC CRS criteria.', ['l', 'r', 'r', 'r', 'r'])}
<p>Multiply by four for a candidate with the same level everywhere. A single candidate at CLB 9 in all four skills of the first language has ${h.num(4 * h.P.crs.first.single[9])} points; at CLB 7, ${h.num(4 * h.P.crs.first.single[7])}. The difference, ${h.num(4 * (h.P.crs.first.single[9] - h.P.crs.first.single[7]))} points, comes from language alone, before any transferability.</p>
<h2>The second official language</h2>
<p>Points start at CLB 5. Below that, a second-language test earns nothing in the core section. At the top, ${h.P.crs.second.perAbility[9]} per skill would give ${h.num(4 * h.P.crs.second.perAbility[9])}, but the total is capped at ${h.P.crs.second.max.single} for a single candidate and ${h.P.crs.second.max.withSpouse} with a spouse. For a French speaker whose second language is English, a modest English result therefore pays little here; its real value is elsewhere, in the French bonus explained on the ${h.a('french-bonus', 'French bonus page')}.</p>
<h2>Transferability: language combined with something else</h2>
<p>Language multiplies the value of education and foreign work experience. The two thresholds are CLB 7 or more in all four first-language skills with at least one under 9, and CLB 9 or more in all four.</p>
${h.table(['Combination', 'CLB 7+, one skill under 9', 'CLB 9+ in all four'], [
  ['Post-secondary credential, one year or more', h.P.crs.transfer.education.oneYear[0], h.P.crs.transfer.education.oneYear[1]],
  ['Two or more post-secondary credentials, master’s or doctorate', h.P.crs.transfer.education.twoPlus[0], h.P.crs.transfer.education.twoPlus[1]],
  ['Foreign work experience, one or two years', h.P.crs.transfer.foreignWork.oneTwo[0], h.P.crs.transfer.foreignWork.oneTwo[1]],
  ['Foreign work experience, three years or more', h.P.crs.transfer.foreignWork.threePlus[0], h.P.crs.transfer.foreignWork.threePlus[1]],
], `Each combination is capped at ${h.P.crs.transfer.maxEach} points and transferability at ${h.P.crs.transfer.max} in total (IRCC).`, ['l', 'r', 'r'])}
<p>Reaching CLB 9 in all four skills can therefore double these amounts. For a candidate with two or more post-secondary credentials and three years of work abroad, moving from CLB 8 to CLB 9 everywhere raises transferability from ${h.P.crs.transfer.education.twoPlus[0] + h.P.crs.transfer.foreignWork.threePlus[0]} to ${h.P.crs.transfer.education.twoPlus[1] + h.P.crs.transfer.foreignWork.threePlus[1]} points, before the first-language points themselves go up.</p>
<h2>The French bonus in additional points</h2>
<p>In the additional section, NCLC ${h.P.crs.frenchBonus.nclc} or more in all four French skills adds ${h.P.crs.frenchBonus.englishLow} points when English is CLB 4 or lower or untested, and ${h.P.crs.frenchBonus.englishClb5} points when English is CLB 5 or more in all four. It comes on top of everything above.</p>
<h2>Using the calculator well</h2>
<p>Enter the levels as IRCC will read them: one level per skill, from a test report under ${h.P.ee.validityYears} years old. If you hold a TEF Canada report, the ${h.a('tef-canada-score', 'TEF Canada score page')} explains which column to use; for a TCF Canada report, see the ${h.a('tcf-canada-score', 'TCF Canada score page')}. The tool covers language only: age, education and work experience are left out, so the figure is part of your score, not all of it.</p>`,
  },
  fr: {
    slug: 'points-crs-langue',
    nav: 'Points de langue du SCG',
    card: 'Tous les points de langue du SCG : première et seconde langue, époux, transférabilité et bonus francophone.',
    title: 'Points de langue du SCG : première langue, seconde, époux',
    description: 'Points de langue du SCG selon vos NCLC ou CLB : première langue officielle, seconde langue, époux, transférabilité avec études et expérience, bonus francophone.',
    h1: 'Points de langue du SCG, du niveau NCLC au score',
    intro: 'Saisissez vos niveaux épreuve par épreuve, dans une ou deux langues officielles : l’outil additionne les points de langue comme le Système de classement global.',
    resume: (h) => `Dans le Système de classement global (SCG), les points de langue se comptent épreuve par épreuve, dans une ou deux langues officielles et pour l’époux. En première langue officielle, chacune des quatre épreuves rapporte à un candidat seul ${h.P.crs.first.single[4]} points au NCLC 4 ou 5, ${h.P.crs.first.single[6]} au NCLC 6, ${h.P.crs.first.single[7]} au NCLC 7, ${h.P.crs.first.single[8]} au NCLC 8, ${h.P.crs.first.single[9]} au NCLC 9 et ${h.P.crs.first.single[10]} au NCLC 10 ou plus, soit ${h.P.crs.first.max.single} au maximum ; avec un époux qui accompagne, le barème baisse un peu, jusqu’à ${h.P.crs.first.max.withSpouse}. La seconde langue officielle ajoute ${h.P.crs.second.perAbility[5]} point par épreuve au niveau 5 ou 6, ${h.P.crs.second.perAbility[7]} au niveau 7 ou 8 et ${h.P.crs.second.perAbility[9]} à partir de 9, avec un plafond de ${h.P.crs.second.max.single} (${h.P.crs.second.max.withSpouse} avec époux). Le test de l’époux rapporte jusqu’à ${h.P.crs.spouse.max} points. La langue nourrit aussi les points de transférabilité combinés aux études ou à l’expérience étrangère, jusqu’à ${h.P.crs.transfer.maxEach} par combinaison, et le NCLC ${h.P.crs.frenchBonus.nclc} aux quatre épreuves de français ouvre un bonus de ${h.P.crs.frenchBonus.englishLow} ou ${h.P.crs.frenchBonus.englishClb5} points. L’outil ci-dessus fait la somme.`,
    faqs: (h) => [
      { q: 'À partir de quel niveau un test de langue rapporte-t-il des points ?', a: `En première langue officielle, dès le NCLC 4 : ${h.P.crs.first.single[4]} points par épreuve pour un candidat seul, autant au NCLC 5. En seconde langue officielle et pour l’époux, à partir du niveau 5 : ${h.P.crs.second.perAbility[5]} point par épreuve. En dessous, l’épreuve ne rapporte rien : un test faible dans la seconde langue n’ajoute donc aucun point.` },
      { q: 'Pourquoi ai-je moins de points de langue avec un époux ?', a: `Le SCG partage les points de base entre vous et votre époux lorsqu’il vous accompagne au Canada. Vos propres points de première langue tombent à ${h.P.crs.first.withSpouse[10]} par épreuve au NCLC 10 (au lieu de ${h.P.crs.first.single[10]}), et votre époux peut gagner jusqu’à ${h.P.crs.spouse.max} points avec son propre test : ${h.P.crs.spouse.perAbility[5]} par épreuve au niveau 5 ou 6, ${h.P.crs.spouse.perAbility[7]} au niveau 7 ou 8, ${h.P.crs.spouse.perAbility[9]} à partir de 9.` },
      { q: 'Combien la langue peut-elle ajouter par la transférabilité ?', a: `Jusqu’à ${h.P.crs.transfer.maxEach} points par combinaison et ${h.P.crs.transfer.max} au total. Avec deux diplômes postsecondaires ou plus, par exemple, le NCLC 7 ou plus aux quatre épreuves dont une sous 9 donne ${h.P.crs.transfer.education.twoPlus[0]} points, et le NCLC 9 ou plus partout ${h.P.crs.transfer.education.twoPlus[1]}. L’expérience de travail à l’étranger suit la même logique.` },
    ],
    body: (h) => `
<h2>La place de la langue dans les 1 200 points</h2>
<p>Les ${h.src('ircc_crs', 'critères d’IRCC')} répartissent le score en quatre sections : facteurs de base liés au capital humain (jusqu’à ${h.P.crs.sections.coreSingle} points pour un candidat seul, ${h.P.crs.sections.coreWithSpouse} avec époux), facteurs liés à l’époux (jusqu’à ${h.P.crs.sections.spouse}), transférabilité des compétences (jusqu’à ${h.P.crs.sections.transfer}) et points supplémentaires (jusqu’à ${h.P.crs.sections.additional}), pour un maximum de ${h.num(h.P.crs.sections.total)}. La langue intervient dans les quatre.</p>
<h2>Les points par épreuve, niveau par niveau</h2>
${h.table(['NCLC / CLB', 'Première langue, seul', 'Première langue, avec époux', 'Seconde langue', 'Langue de l’époux'], LV.map((lv) => [String(lv) + (lv === 10 ? ' et plus' : ''), h.P.crs.first.single[lv], h.P.crs.first.withSpouse[lv], h.P.crs.second.perAbility[lv], h.P.crs.spouse.perAbility[lv]]), 'Points du SCG par épreuve (compréhension et expression, écrites et orales, comptent chacune une fois). Sous le niveau 4 : rien. Source : critères du SCG, IRCC.', ['l', 'r', 'r', 'r', 'r'])}
<p>Multipliez par quatre si le niveau est le même partout. Un candidat seul au NCLC 9 dans les quatre épreuves de sa première langue totalise ${h.num(4 * h.P.crs.first.single[9])} points ; au NCLC 7, ${h.num(4 * h.P.crs.first.single[7])}. L’écart, ${h.num(4 * (h.P.crs.first.single[9] - h.P.crs.first.single[7]))} points, vient de la seule langue, avant toute transférabilité.</p>
<h2>La seconde langue officielle</h2>
<p>Les points commencent au niveau 5 : en dessous, un test dans la seconde langue ne rapporte rien dans la section de base. En haut de l’échelle, ${h.P.crs.second.perAbility[9]} points par épreuve donneraient ${h.num(4 * h.P.crs.second.perAbility[9])}, mais le total plafonne à ${h.P.crs.second.max.single} pour un candidat seul et ${h.P.crs.second.max.withSpouse} avec époux. Pour un francophone dont l’anglais est la seconde langue, un résultat moyen en anglais pèse donc peu ici ; sa vraie valeur est ailleurs, dans le bonus expliqué sur la page du ${h.a('french-bonus', 'bonus francophone')}.</p>
<h2>La transférabilité : la langue multipliée</h2>
<p>La langue démultiplie la valeur des études et de l’expérience à l’étranger. Deux seuils comptent : le NCLC 7 ou plus aux quatre épreuves de première langue avec au moins une sous 9, et le NCLC 9 ou plus aux quatre.</p>
${h.table(['Combinaison', 'NCLC 7+, une épreuve sous 9', 'NCLC 9+ aux quatre'], [
  ['Diplôme postsecondaire d’un an ou plus', h.P.crs.transfer.education.oneYear[0], h.P.crs.transfer.education.oneYear[1]],
  ['Deux diplômes postsecondaires ou plus, maîtrise ou doctorat', h.P.crs.transfer.education.twoPlus[0], h.P.crs.transfer.education.twoPlus[1]],
  ['Expérience de travail à l’étranger, un ou deux ans', h.P.crs.transfer.foreignWork.oneTwo[0], h.P.crs.transfer.foreignWork.oneTwo[1]],
  ['Expérience de travail à l’étranger, trois ans ou plus', h.P.crs.transfer.foreignWork.threePlus[0], h.P.crs.transfer.foreignWork.threePlus[1]],
], `Chaque combinaison plafonne à ${h.P.crs.transfer.maxEach} points, la transférabilité à ${h.P.crs.transfer.max} au total (IRCC).`, ['l', 'r', 'r'])}
<p>Atteindre le NCLC 9 partout peut donc doubler ces montants. Pour un candidat titulaire de deux diplômes postsecondaires ou plus et de trois ans d’expérience à l’étranger, passer du NCLC 8 au NCLC 9 aux quatre épreuves fait monter la transférabilité de ${h.P.crs.transfer.education.twoPlus[0] + h.P.crs.transfer.foreignWork.threePlus[0]} à ${h.P.crs.transfer.education.twoPlus[1] + h.P.crs.transfer.foreignWork.threePlus[1]} points, en plus de la hausse des points de première langue.</p>
<h2>Le bonus francophone dans les points supplémentaires</h2>
<p>Dans la section des points supplémentaires, le NCLC ${h.P.crs.frenchBonus.nclc} ou plus aux quatre épreuves de français ajoute ${h.P.crs.frenchBonus.englishLow} points si l’anglais est au CLB 4 ou moins, ou sans test, et ${h.P.crs.frenchBonus.englishClb5} points si l’anglais atteint le CLB 5 ou plus aux quatre compétences. Il s’ajoute à tout le reste.</p>
<h2>Bien utiliser le calculateur</h2>
<p>Saisissez les niveaux tels qu’IRCC les lira : un niveau par épreuve, tiré d’une attestation de moins de ${h.P.ee.validityYears} ans. Pour une attestation TEF Canada, la page du ${h.a('tef-canada-score', 'score TEF Canada')} indique la colonne à utiliser ; pour le TCF Canada, voyez la page du ${h.a('tcf-canada-score', 'score TCF Canada')}. L’outil ne traite que la langue : âge, études et expérience sont laissés de côté, le résultat n’est donc qu’une partie de votre score.</p>`,
  },
});
