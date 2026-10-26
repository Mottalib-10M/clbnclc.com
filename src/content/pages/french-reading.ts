import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const lo = (h: Helpers, t: 'tef' | 'tcf', lv: number) => h.range(t, 'R', lv).split('–')[0];
const cefrRows = (h: Helpers) => h.P.tef.cecr.map(([lv, from], i) => {
  const tcfFrom = h.P.tcf.cecr[i][1];
  const to = i === 0 ? h.P.tests.tef2023.max : (h.P.tef.cecr[i - 1][1] as number) - 1;
  return [String(lv), `${h.num(from as number)}–${h.num(to)}`, `${h.num(tcfFrom as number)}–${h.num(to)}`];
});

export default definePage({
  id: 'french-reading',
  group: 'practice',
  order: 40,
  tool: { kind: 'quiz', props: { bank: 'fr-reading' } },
  mini: { kind: 'mini:pace' },
  related: ['tef-mock', 'tcf-mock', 'french-listening', 'review', 'tef-tcf-cefr', 'preparation'],
  sources: ['cci_tef_canada', 'fei_tcf_manual', 'coe_cefr', 'cci_tef_cecr', 'ircc_equiv'],
  en: {
    slug: 'tef-tcf-reading-practice',
    nav: 'French reading practice',
    card: 'Short French documents from A1 to C2, corrected at once, to prepare the TEF and TCF reading tests.',
    title: 'TEF and TCF reading practice: French questions A1 to C2',
    description: 'TEF and TCF reading practice in French: short documents and questions from A1 to C2, sorted by level and theme, corrected at once with a clear explanation.',
    h1: 'TEF Canada and TCF Canada reading practice',
    intro: 'Pick a level and a theme, read the document, choose an answer: the correction and its reason appear straight away, and your tally builds up on the right.',
    resume: (h) => `Our French reading practice draws ten questions at a time from a bank of ${h.num(h.bankSize.frReading)} items written by Radif Partners, covering the six CEFR levels from A1 to C2 and twelve everyday themes such as work, housing, health and public services. Each item has four options and is corrected the moment you answer, with a short explanation in English and French and the CEFR descriptor it was written against. The real tests are longer and timed: the TEF Canada reading test has ${h.P.tef.canada.ce.q} questions in ${h.P.tef.canada.ce.min} minutes, the TCF Canada one ${h.P.tcf.canada.ce.q} questions in ${h.P.tcf.canada.ce.min} minutes, and both report a score on a scale that ends at ${h.num(h.P.tests.tef2023.max)}. On those scales NCLC 7 in reading starts at ${lo(h, 'tef', 7)} for the TEF and ${lo(h, 'tcf', 7)} for the TCF. These are not questions taken from either test, and no practice set can predict an official score: the useful signal is the level where your accuracy drops, because that is where your study time pays off. Answers stay in this browser only.`,
    faqs: (h) => [
      { q: 'Are these reading questions taken from past TEF or TCF papers?', a: 'No. Every document and question was written by Radif Partners for this site, against the CEFR global scale of the Council of Europe. They follow the spirit of the tests (everyday documents, four options, rising difficulty) but they are not official material, and nobody outside the test bodies can publish their real questions.' },
      { q: 'How many reading questions can I practise here?', a: `The bank holds ${h.num(h.bankSize.frReading)} questions, shared between the six CEFR levels and twelve themes. Each set draws ten of them; the "New set of questions" button draws ten others, and the level and theme filters narrow the pool. Some documents carry two or three questions, which is also how the real reading tests work.` },
      { q: 'What does the level shown after a reading set mean?', a: 'It is our own rough indication: the highest CEFR level up to which you answered at least two thirds of the questions correctly, level after level. It is not a TEF or TCF score. The test bodies calibrate their scores on large groups of candidates, which a ten-question set cannot reproduce.' },
      { q: 'Is the reading level for Express Entry the same as a CEFR level?', a: `Not exactly. IRCC uses NCLC levels, read from each test's own chart. On the TEF Canada, NCLC 7 in reading starts at ${lo(h, 'tef', 7)}, inside the CEFR B2 band that begins at ${h.num(h.P.tef.cecr[2][1] as number)}. The practice works with CEFR levels because the questions are written against them; the score pages convert to NCLC.` },
    ],
    body: (h) => `
<h2>How the practice set works</h2>
<p>Leave both filters on "All" for a first set: you get ten questions drawn from every level, which shows quickly where you stand. Then choose a level (A1 to C2) to stay on the band you need, or a theme if a type of document bothers you, such as administrative letters or job offers. Each answer is corrected at once: the right option turns green, a short explanation says why, and a reference line names the CEFR level descriptor the question was written for. The panel on the right counts your right answers and lists them level by level.</p>
<p>The documents are what a newcomer reads in a normal week: notices in a building, emails from an employer, a clinic letter, a city announcement, an opinion piece for the higher levels. The bank was written for this site by Radif Partners; it is not a copy of any test paper.</p>
<h2>The two reading tests in figures</h2>
<p>Both tests are multiple-choice and both are timed, which changes the task: reading well is not enough, you must read well at a steady pace. The table below divides the official time by the number of questions.</p>
${h.table(['Test', 'Questions', 'Minutes', 'Seconds per question', 'NCLC 7 from'], [
  ['TEF Canada', h.P.tef.canada.ce.q, h.P.tef.canada.ce.min, h.num((h.P.tef.canada.ce.min * 60) / h.P.tef.canada.ce.q), lo(h, 'tef', 7)],
  ['TCF Canada', h.P.tcf.canada.ce.q, h.P.tcf.canada.ce.min, h.num((h.P.tcf.canada.ce.min * 60) / h.P.tcf.canada.ce.q), lo(h, 'tcf', 7)],
], 'Reading tests: number of questions and duration (CCI Paris Île-de-France; TCF candidate manual, version J), NCLC 7 thresholds (IRCC chart).', ['l', 'r', 'r', 'r', 'r'])}
<p>The TCF manual adds that each question has ${h.P.tcf.choices} options with one right answer and that difficulty rises along the test, so the last documents take longer than the first ones. The ${h.src('cci_tef_canada', 'CCI presentation of the TEF Canada')} and the ${h.src('fei_tcf_manual', 'TCF candidate manual')} describe the two formats. The small calculator under the summary turns a time budget into seconds per question.</p>
<h2>CEFR levels and test scores</h2>
<p>Our questions carry a CEFR level because that is the scale both test bodies use to describe what a candidate can do. The TEF and the TCF place the same score bands on that scale:</p>
${h.table(['CEFR level', 'TEF score', 'TCF score'], cefrRows(h), 'Score bands per CEFR level (CCI Paris Île-de-France table; TCF candidate manual).', ['l', 'r', 'r'])}
<p>A set where you pass B1 easily and stumble on B2 points to a score around the lower end of the B2 band, but that is a direction, not a forecast. The ${h.a('tef-tcf-cefr', 'CEFR level page')} explains both scales, and the ${h.a('tef-canada-score', 'TEF')} and ${h.a('tcf-canada-score', 'TCF')} score pages convert to NCLC.</p>
<h2>What the result does and does not tell you</h2>
<p>After "See my result", the panel shows an indication of our own: the highest level up to which you got at least two thirds right, checked one level after another. A set of ten questions is small, so two sets can disagree. The official tests work differently: the CCI gives one point per right answer and then turns the total into a calibrated score, and both bodies calibrate their scales on many candidates. Treat our indication as a way to choose the next level to practise.</p>
<h2>A way to use the sets (our suggestion)</h2>
<p>Start with two or three unfiltered sets to find the level where your accuracy falls. Spend most of your sessions one level above your comfortable one, reading each explanation even when you were right. Once you hold that level, take a timed section on the ${h.a('tef-mock', 'TEF Canada mock')} or the ${h.a('tcf-mock', 'TCF Canada mock')} to work on pace. Missed questions are kept in this browser, and the ${h.a('review', 'review page')} lets you answer them again until they are right. Nothing leaves your device: a private window or cleared storage starts from zero.</p>`,
  },
  fr: {
    slug: 'comprehension-ecrite-tef-tcf',
    nav: 'Compréhension écrite',
    card: 'Des documents courts du A1 au C2, corrigés aussitôt, pour préparer la compréhension écrite du TEF et du TCF.',
    title: 'Compréhension écrite TEF et TCF : exercices du A1 au C2',
    description: 'Compréhension écrite TEF et TCF : des documents et des questions du A1 au C2, triés par niveau et par thème, corrigés tout de suite avec une explication claire.',
    h1: 'Compréhension écrite : entraînement TEF Canada et TCF Canada',
    intro: 'Choisissez un niveau et un thème, lisez le document, cochez une réponse : la correction et sa raison s’affichent aussitôt, et le décompte avance dans le panneau de droite.',
    resume: (h) => `L’entraînement en compréhension écrite tire dix questions à la fois d’une banque de ${h.num(h.bankSize.frReading)} questions rédigées par Radif Partners, réparties sur les six niveaux du CECR, du A1 au C2, et sur douze thèmes de la vie courante : travail, logement, santé, services publics, études, médias. Chaque question propose quatre réponses et se corrige dès que vous cliquez, avec une explication en français et en anglais et le descripteur du CECR qui a servi à l’écrire. À l’examen, l’épreuve est plus longue et chronométrée : ${h.P.tef.canada.ce.q} questions en ${h.P.tef.canada.ce.min} minutes au TEF Canada, ${h.P.tcf.canada.ce.q} questions en ${h.P.tcf.canada.ce.min} minutes au TCF Canada, sur une échelle de score qui monte à ${h.num(h.P.tests.tef2023.max)}. Le NCLC 7, seuil du programme des travailleurs qualifiés, commence à ${lo(h, 'tef', 7)} au TEF et à ${lo(h, 'tcf', 7)} au TCF. Ces questions ne viennent d’aucune session d’examen et ne prédisent aucun score officiel : elles servent à repérer le niveau où vos réponses se mettent à faiblir, pour y concentrer le travail. Vos réponses restent dans ce navigateur.`,
    faqs: (h) => [
      { q: 'Ces questions de compréhension écrite viennent-elles d’anciens sujets ?', a: 'Non. Les documents et les questions ont été écrits par Radif Partners pour ce site, en s’appuyant sur l’échelle globale du CECR du Conseil de l’Europe. Ils reprennent l’esprit des épreuves (documents de la vie courante, quatre choix, difficulté croissante), sans être des sujets officiels : seuls les organismes certificateurs disposent des vraies questions.' },
      { q: 'Combien de questions de lecture la banque contient-elle ?', a: `${h.num(h.bankSize.frReading)} questions, réparties entre les six niveaux du CECR et douze thèmes. Chaque série en tire dix ; le bouton « Nouvelle série de questions » en tire dix autres, et les filtres de niveau et de thème resserrent le choix. Un même document porte parfois deux ou trois questions, comme dans les épreuves réelles.` },
      { q: 'Que vaut le niveau affiché à la fin d’une série de lecture ?', a: 'C’est notre indication approximative : le niveau le plus haut jusqu’où vous avez obtenu au moins deux tiers de bonnes réponses, niveau après niveau. Ce n’est pas un score TEF ou TCF : les organismes étalonnent leurs scores sur de grands groupes de candidats, ce qu’une série de dix questions ne peut pas imiter.' },
      { q: 'Le niveau de lecture exigé par IRCC est-il un niveau du CECR ?', a: `Non : IRCC raisonne en NCLC, lus dans la grille propre à chaque test. Au TEF Canada, le NCLC 7 en compréhension écrite commence à ${lo(h, 'tef', 7)}, à l’intérieur de la bande B2 qui débute à ${h.num(h.P.tef.cecr[2][1] as number)}. L’entraînement parle en niveaux du CECR parce que les questions sont écrites sur cette base ; les pages de score convertissent en NCLC.` },
    ],
    body: (h) => `
<h2>Le fonctionnement d’une série</h2>
<p>Pour une première série, laissez les deux filtres sur « Tous » : vous recevez dix questions de tous niveaux, de quoi situer rapidement votre zone de confort. Ensuite, fixez un niveau (A1 à C2) pour rester sur la bande qui vous concerne, ou un thème si un genre de document vous gêne : courrier administratif, offre d’emploi, article d’opinion. La correction arrive à chaque clic : la bonne réponse passe au vert, une explication courte dit pourquoi, et une ligne de référence indique le descripteur du CECR visé. Le panneau de droite compte les bonnes réponses et les classe par niveau.</p>
<p>Les documents ressemblent à ce qu’on lit en s’installant : affichettes d’immeuble, courriels d’un employeur, lettre d’une clinique, avis municipal, et des textes argumentés aux niveaux les plus hauts. Ils ont été rédigés pour ce site par Radif Partners et ne reproduisent aucun sujet d’examen.</p>
<h2>Les deux épreuves en chiffres</h2>
<p>Le TEF et le TCF posent des questions à choix multiple dans un temps limité. Bien comprendre ne suffit donc pas : il faut comprendre vite et de façon régulière. Le tableau divise la durée officielle par le nombre de questions.</p>
${h.table(['Test', 'Questions', 'Minutes', 'Secondes par question', 'NCLC 7 à partir de'], [
  ['TEF Canada', h.P.tef.canada.ce.q, h.P.tef.canada.ce.min, h.num((h.P.tef.canada.ce.min * 60) / h.P.tef.canada.ce.q), lo(h, 'tef', 7)],
  ['TCF Canada', h.P.tcf.canada.ce.q, h.P.tcf.canada.ce.min, h.num((h.P.tcf.canada.ce.min * 60) / h.P.tcf.canada.ce.q), lo(h, 'tcf', 7)],
], 'Compréhension écrite : nombre de questions et durée (CCI Paris Île-de-France ; manuel du candidat TCF, version J), seuils du NCLC 7 (grille d’IRCC).', ['l', 'r', 'r', 'r', 'r'])}
<p>Le manuel du TCF précise que chaque question offre ${h.P.tcf.choices} choix pour une seule bonne réponse et que la difficulté monte au fil de l’épreuve : les derniers documents prennent plus de temps que les premiers. Les formats sont décrits dans la ${h.src('cci_tef_canada', 'présentation du TEF Canada par la CCI')} et dans le ${h.src('fei_tcf_manual', 'manuel du candidat TCF')}. Le petit calculateur placé sous le résumé convertit un budget de temps en secondes par question.</p>
<h2>Du niveau du CECR au score</h2>
<p>Nos questions portent un niveau du CECR parce que c’est l’échelle avec laquelle les deux organismes décrivent ce que sait faire un candidat. Le TEF et le TCF y rattachent les mêmes bandes de score :</p>
${h.table(['Niveau CECR', 'Score TEF', 'Score TCF'], cefrRows(h), 'Bandes de score par niveau du CECR (tableau de la CCI Paris Île-de-France ; manuel du candidat TCF).', ['l', 'r', 'r'])}
<p>Une série où le B1 passe sans peine et où le B2 résiste laisse penser à un score dans le bas de la bande B2, mais c’est une tendance, pas une prévision. La page sur le ${h.a('tef-tcf-cefr', 'niveau du CECR')} détaille les deux échelles, et les pages de score du ${h.a('tef-canada-score', 'TEF')} et du ${h.a('tcf-canada-score', 'TCF')} font la conversion en NCLC.</p>
<h2>Ce que dit le résultat, et ce qu’il ne dit pas</h2>
<p>Après « Voir mon résultat », le panneau affiche notre indication : le niveau le plus haut jusqu’où vous avez réussi au moins deux tiers des questions, en vérifiant les niveaux dans l’ordre. Sur dix questions, deux séries peuvent donner deux indications différentes. Les épreuves officielles procèdent autrement : la CCI compte un point par bonne réponse puis convertit ce total en score étalonné, et chaque organisme cale son échelle sur un grand nombre de candidats. Prenez notre indication comme une aide pour choisir le prochain niveau à travailler.</p>
<h2>Une façon d’enchaîner les séries (notre suggestion)</h2>
<p>Commencez par deux ou trois séries sans filtre pour repérer le niveau où les erreurs apparaissent. Consacrez ensuite l’essentiel des séances au niveau juste au-dessus de celui qui vous est facile, en lisant chaque explication, même après une bonne réponse. Quand ce niveau tient, passez à une section chronométrée de l’${h.a('tef-mock', 'examen blanc du TEF Canada')} ou de celui du ${h.a('tcf-mock', 'TCF Canada')} pour travailler le rythme. Les questions manquées sont gardées dans ce navigateur, et la ${h.a('review', 'page de révision')} permet d’y répondre de nouveau jusqu’à la bonne réponse. Rien ne quitte votre appareil : une fenêtre privée ou un stockage effacé repart de zéro.</p>`,
  },
});
