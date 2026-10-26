import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

type Sk = 'R' | 'W' | 'L' | 'S';
const lo = (h: Helpers, t: 'ielts' | 'pte' | 'celpip', s: Sk, lv: number) => h.range(t, s, lv).split('–')[0];
const SK: Sk[] = ['R', 'W', 'L', 'S'];

export default definePage({
  id: 'celpip-vs-ielts',
  group: 'scores',
  order: 20,
  tool: { kind: 'target', props: { level: 7, tests: ['celpip', 'ielts', 'pte'] } },
  mini: { kind: 'mini:ieltsclb' },
  related: ['celpip', 'ielts-general', 'clb-7', 'citizenship-language', 'celpip-reading', 'crs-language'],
  sources: ['ircc_equiv', 'ircc_ee_lang', 'ircc_cit_lang', 'ircc_crs'],
  en: {
    slug: 'celpip-vs-ielts',
    nav: 'CELPIP vs IELTS',
    card: 'CELPIP-General, IELTS General Training and PTE Core side by side: the score each needs for CLB 7 and CLB 9.',
    title: 'CELPIP vs IELTS General: scores for CLB 7 and CLB 9 compared',
    description: 'CELPIP vs IELTS General Training, with PTE Core: the score each test needs for CLB 7 and CLB 9 per skill, what IRCC accepts, and the thresholds for citizenship.',
    h1: 'CELPIP vs IELTS General Training: same target, different scales',
    intro: 'All three English tests accepted for Express Entry lead to the same CLB. Here is the score each one asks for, skill by skill, at the levels that matter.',
    resume: (h) => `IRCC accepts three English tests for Express Entry: CELPIP-General, IELTS General Training (but not the IELTS One Skill Retake) and PTE Core. Each is converted to a CLB level skill by skill with IRCC's charts, and none is favoured over another. What differs is the scale. On CELPIP-General the level is the CLB itself, so CLB 7 means 7 in each skill. On IELTS General Training, CLB 7 means ${lo(h, 'ielts', 'R', 7)} in all four skills, but CLB 9 asks ${lo(h, 'ielts', 'L', 9)} in listening against ${lo(h, 'ielts', 'R', 9)} in reading, writing and speaking. On PTE Core, CLB 7 starts at ${lo(h, 'pte', 'R', 7)} in reading and listening, ${lo(h, 'pte', 'S', 7)} in speaking and ${lo(h, 'pte', 'W', 7)} in writing. For citizenship, IRCC sets its own thresholds per test: CELPIP-General ${h.P.citizenship.celpip}, IELTS General Training ${h.num(h.P.citizenship.ielts.L, 1)} in listening and ${h.num(h.P.citizenship.ielts.S, 1)} in speaking, PTE Core ${h.P.citizenship.pte.L} and ${h.P.citizenship.pte.S}. The right test is the one where your weakest skill clears the level you need; this page compares the bands, not the test experience.`,
    faqs: (h) => [
      { q: 'Is CLB 9 harder to reach on IELTS than on CELPIP?', a: `The charts suggest the IELTS listening band is the demanding one at that level: CLB 9 asks ${lo(h, 'ielts', 'L', 9)} in IELTS General Training listening, against ${lo(h, 'ielts', 'R', 9)} in the other three skills, and CLB 10 asks ${lo(h, 'ielts', 'L', 10)}. On CELPIP-General the number is simply 9 everywhere. Whether one test feels easier depends on you; IRCC treats both results the same.` },
      { q: 'Does IRCC accept the IELTS One Skill Retake for Express Entry?', a: 'No. IRCC lists IELTS General Training among the accepted tests and states that the One Skill Retake is not accepted. If one IELTS skill falls short, the way to raise it for Express Entry is a full new test, and the new report replaces nothing automatically: you choose which valid report to enter.' },
      { q: 'Is IELTS Academic accepted instead of General Training?', a: 'The IRCC Express Entry page we rely on names IELTS General Training, not IELTS Academic, in its list of accepted English tests. This site only writes what that list says, so book the General Training version for Express Entry and check the IRCC page if you hold another IELTS result.' },
      { q: 'Which English test has the lowest bar for citizenship?', a: `Each has its own threshold on IRCC's citizenship page: CELPIP-General ${h.P.citizenship.celpip} in listening and speaking, IELTS General Training ${h.num(h.P.citizenship.ielts.L, 1)} in listening and ${h.num(h.P.citizenship.ielts.S, 1)} in speaking, PTE Core ${h.P.citizenship.pte.L} in listening and ${h.P.citizenship.pte.S} in speaking. All three correspond to CLB ${h.P.citizenship.clb}, so none is easier on paper.` },
    ],
    body: (h) => `
<h2>CLB 7 on each English test</h2>
<p>CLB 7 is the Federal Skilled Worker minimum and the point where language points jump. This is what it takes on each test, read on IRCC's ${h.src('ircc_equiv', 'equivalency charts')}:</p>
${h.table(['Skill', 'CELPIP-General', 'IELTS General Training', 'PTE Core'], SK.map((s, i) => [['Reading', 'Writing', 'Listening', 'Speaking'][i], lo(h, 'celpip', s, 7), lo(h, 'ielts', s, 7), lo(h, 'pte', s, 7)]), 'Lowest score giving CLB 7 per skill (IRCC charts).', ['l', 'r', 'r', 'r'])}
<p>At this level IELTS General Training is flat: ${lo(h, 'ielts', 'R', 7)} in every skill. PTE Core is not: writing asks ${lo(h, 'pte', 'W', 7)} and speaking ${lo(h, 'pte', 'S', 7)}, well above the ${lo(h, 'pte', 'R', 7)} needed in reading and listening.</p>
<h2>CLB 9 on each English test</h2>
<p>CLB 9 adds ${h.P.crs.first.single[9] - h.P.crs.first.single[8]} points per skill over CLB 8 for a single candidate, and it is the level, in all four skills, where transferability points reach their higher tier.</p>
${h.table(['Skill', 'CELPIP-General', 'IELTS General Training', 'PTE Core'], SK.map((s, i) => [['Reading', 'Writing', 'Listening', 'Speaking'][i], lo(h, 'celpip', s, 9), lo(h, 'ielts', s, 9), lo(h, 'pte', s, 9)]), 'Lowest score giving CLB 9 per skill (IRCC charts).', ['l', 'r', 'r', 'r'])}
<p>Now IELTS diverges: listening asks ${lo(h, 'ielts', 'L', 9)} while the other skills ask ${lo(h, 'ielts', 'R', 9)}. On PTE Core, writing at CLB 9 starts at ${lo(h, 'pte', 'W', 9)}, just below the CLB 10 floor of ${lo(h, 'pte', 'W', 10)}, so the CLB 9 writing band is very narrow. CELPIP-General keeps the same number in every skill. Use the tool above to set another target level and read the three columns again.</p>
<h2>What IRCC accepts, and what it does not</h2>
<p>The ${h.src('ircc_ee_lang', 'Express Entry language page')} names five tests: CELPIP-General, IELTS General Training, PTE Core, TEF Canada and TCF Canada. It excludes the IELTS One Skill Retake. Results must be less than ${h.P.ee.validityYears} years old on the day you create your profile and on the day you apply for permanent residence. Nothing on IRCC's pages gives one English test extra weight: a CLB is a CLB.</p>
<h2>The citizenship thresholds</h2>
<p>For applicants aged ${h.P.citizenship.ages[0]} to ${h.P.citizenship.ages[1]}, the ${h.src('ircc_cit_lang', 'citizenship language page')} only looks at listening and speaking:</p>
${h.table(['Test', 'Listening', 'Speaking'], [
  ['CELPIP-General', h.num(h.P.citizenship.celpip), h.num(h.P.citizenship.celpip)],
  ['IELTS General Training', h.num(h.P.citizenship.ielts.L, 1), h.num(h.P.citizenship.ielts.S, 1)],
  ['PTE Core', h.num(h.P.citizenship.pte.L), h.num(h.P.citizenship.pte.S)],
], 'Minimum results accepted as proof of language for citizenship (IRCC).', ['l', 'r', 'r'])}
<p>Expired results are accepted for citizenship, so an old Express Entry report may already be enough. More on the ${h.a('citizenship-language', 'citizenship page')}.</p>
<h2>How to choose between them</h2>
<p>Start from your target CLB and your weakest skill. If listening is your weak point and you need CLB 9 or 10, the IELTS bands are the highest there. If writing is the issue, compare the PTE Core writing band with the IELTS one at your level. Then factor in what this page cannot measure for you: the test format, dates near you and the fee, which we do not list for the English tests because we could not confirm them on an official page. For points, the ${h.a('crs-language', 'language points page')} turns any CLB into CRS points, and the ${h.a('ielts-general', 'IELTS General Training page')} gives the full IELTS chart.</p>`,
  },
  fr: {
    slug: 'celpip-ou-ielts',
    nav: 'CELPIP ou IELTS',
    card: 'CELPIP-General, IELTS General Training et PTE Core comparés : le résultat à viser pour le CLB 7 et le CLB 9.',
    title: 'CELPIP ou IELTS General : les scores du CLB 7 et du CLB 9',
    description: 'CELPIP ou IELTS General Training, avec le PTE Core : le résultat à viser pour le CLB 7 et le CLB 9 par compétence, les tests acceptés par IRCC, la citoyenneté.',
    h1: 'CELPIP ou IELTS General Training : même cible, échelles différentes',
    intro: 'Les trois tests d’anglais acceptés pour Entrée express mènent au même CLB. Voici le résultat que chacun exige, compétence par compétence, aux niveaux qui comptent.',
    resume: (h) => `Pour l’anglais, IRCC accepte trois tests dans Entrée express : le CELPIP-General, l’IELTS General Training (à l’exclusion de l’IELTS One Skill Retake) et le PTE Core. Chacun se convertit en CLB compétence par compétence selon les grilles d’IRCC, et aucun n’est avantagé. Seule l’échelle change. Au CELPIP-General, le niveau est le CLB lui-même : le CLB 7, c’est 7 partout. À l’IELTS General Training, le CLB 7 demande ${lo(h, 'ielts', 'R', 7)} dans les quatre compétences, mais le CLB 9 exige ${lo(h, 'ielts', 'L', 9)} à l’écoute contre ${lo(h, 'ielts', 'R', 9)} en lecture, à l’écrit et à l’oral. Au PTE Core, le CLB 7 commence à ${lo(h, 'pte', 'R', 7)} en lecture et à l’écoute, ${lo(h, 'pte', 'S', 7)} à l’oral et ${lo(h, 'pte', 'W', 7)} à l’écrit. Pour la citoyenneté, IRCC fixe un seuil par test : ${h.P.citizenship.celpip} au CELPIP-General, ${h.num(h.P.citizenship.ielts.L, 1)} à l’écoute et ${h.num(h.P.citizenship.ielts.S, 1)} à l’oral à l’IELTS General Training, ${h.P.citizenship.pte.L} et ${h.P.citizenship.pte.S} au PTE Core. Le bon test est celui où votre compétence la plus faible franchit le niveau visé ; cette page compare les bandes, pas l’expérience du test.`,
    faqs: (h) => [
      { q: 'Le CLB 9 est-il plus difficile à atteindre à l’IELTS qu’au CELPIP ?', a: `D’après les grilles, c’est l’écoute de l’IELTS qui est exigeante à ce niveau : le CLB 9 y demande ${lo(h, 'ielts', 'L', 9)}, contre ${lo(h, 'ielts', 'R', 9)} dans les trois autres compétences, et le CLB 10 demande ${lo(h, 'ielts', 'L', 10)}. Au CELPIP-General, il suffit d’un 9 partout. Le ressenti dépend de chacun ; IRCC traite les deux résultats de la même façon.` },
      { q: 'IRCC accepte-t-il l’IELTS One Skill Retake pour Entrée express ?', a: 'Non. IRCC cite l’IELTS General Training parmi les tests acceptés et précise que le One Skill Retake ne l’est pas. Si une seule compétence de l’IELTS est trop basse, il faut repasser le test complet ; le nouveau résultat ne remplace rien automatiquement, c’est vous qui choisissez quelle attestation valide saisir.' },
      { q: 'L’IELTS Academic remplace-t-il l’IELTS General Training ?', a: 'La page d’IRCC sur Entrée express que nous suivons nomme l’IELTS General Training, et non l’IELTS Academic, dans sa liste de tests d’anglais acceptés. Ce site s’en tient à cette liste : réservez la version General Training pour Entrée express et consultez la page d’IRCC si vous détenez un autre résultat IELTS.' },
      { q: 'Quel test d’anglais a le seuil le plus bas pour la citoyenneté ?', a: `Chacun a son seuil sur la page d’IRCC : ${h.P.citizenship.celpip} à l’écoute et à l’oral au CELPIP-General ; ${h.num(h.P.citizenship.ielts.L, 1)} à l’écoute et ${h.num(h.P.citizenship.ielts.S, 1)} à l’oral à l’IELTS General Training ; ${h.P.citizenship.pte.L} à l’écoute et ${h.P.citizenship.pte.S} à l’oral au PTE Core. Les trois correspondent au CLB ${h.P.citizenship.clb} : aucun n’est plus facile sur le papier.` },
    ],
    body: (h) => `
<h2>Le CLB 7 dans chaque test d’anglais</h2>
<p>Le CLB 7 est le minimum des travailleurs qualifiés (fédéral) et le palier où les points de langue décollent. Voici ce qu’il demande dans chaque test, d’après les ${h.src('ircc_equiv', 'grilles d’équivalence d’IRCC')} :</p>
${h.table(['Compétence', 'CELPIP-General', 'IELTS General Training', 'PTE Core'], SK.map((s, i) => [['Lecture', 'Écriture', 'Écoute', 'Oral'][i], lo(h, 'celpip', s, 7), lo(h, 'ielts', s, 7), lo(h, 'pte', s, 7)]), 'Résultat minimum donnant le CLB 7 par compétence (grilles d’IRCC).', ['l', 'r', 'r', 'r'])}
<p>À ce niveau, l’IELTS General Training est uniforme : ${lo(h, 'ielts', 'R', 7)} partout. Le PTE Core ne l’est pas : l’écrit demande ${lo(h, 'pte', 'W', 7)} et l’oral ${lo(h, 'pte', 'S', 7)}, nettement plus que les ${lo(h, 'pte', 'R', 7)} suffisant en lecture et à l’écoute.</p>
<h2>Le CLB 9 dans chaque test d’anglais</h2>
<p>Le CLB 9 rapporte ${h.P.crs.first.single[9] - h.P.crs.first.single[8]} points de plus par compétence que le CLB 8 pour un candidat seul, et, atteint dans les quatre compétences, il ouvre le palier supérieur des points de transférabilité.</p>
${h.table(['Compétence', 'CELPIP-General', 'IELTS General Training', 'PTE Core'], SK.map((s, i) => [['Lecture', 'Écriture', 'Écoute', 'Oral'][i], lo(h, 'celpip', s, 9), lo(h, 'ielts', s, 9), lo(h, 'pte', s, 9)]), 'Résultat minimum donnant le CLB 9 par compétence (grilles d’IRCC).', ['l', 'r', 'r', 'r'])}
<p>Là, l’IELTS se sépare : l’écoute exige ${lo(h, 'ielts', 'L', 9)} quand les autres compétences demandent ${lo(h, 'ielts', 'R', 9)}. Au PTE Core, l’écrit au CLB 9 commence à ${lo(h, 'pte', 'W', 9)}, juste sous le plancher du CLB 10 (${lo(h, 'pte', 'W', 10)}) : la bande est très étroite. Le CELPIP-General garde le même chiffre partout. L’outil en haut de page permet de choisir un autre niveau et de relire les trois colonnes.</p>
<h2>Ce qu’IRCC accepte et ce qu’il refuse</h2>
<p>La ${h.src('ircc_ee_lang', 'page d’IRCC sur les exigences linguistiques')} cite cinq tests : CELPIP-General, IELTS General Training, PTE Core, TEF Canada et TCF Canada, et exclut l’IELTS One Skill Retake. Les résultats doivent avoir moins de ${h.P.ee.validityYears} ans le jour de la création du profil et le jour du dépôt de la demande de résidence permanente. Aucune page d’IRCC ne donne plus de poids à un test d’anglais qu’à un autre.</p>
<h2>Les seuils pour la citoyenneté</h2>
<p>Pour les demandeurs de ${h.P.citizenship.ages[0]} à ${h.P.citizenship.ages[1]} ans, la ${h.src('ircc_cit_lang', 'page sur la preuve linguistique')} ne regarde que l’écoute et l’oral :</p>
${h.table(['Test', 'Écoute', 'Oral'], [
  ['CELPIP-General', h.num(h.P.citizenship.celpip), h.num(h.P.citizenship.celpip)],
  ['IELTS General Training', h.num(h.P.citizenship.ielts.L, 1), h.num(h.P.citizenship.ielts.S, 1)],
  ['PTE Core', h.num(h.P.citizenship.pte.L), h.num(h.P.citizenship.pte.S)],
], 'Résultats minimums acceptés comme preuve linguistique pour la citoyenneté (IRCC).', ['l', 'r', 'r'])}
<p>Les résultats expirés sont acceptés pour la citoyenneté : une ancienne attestation d’Entrée express peut donc suffire. Détails sur la page ${h.a('citizenship-language', 'citoyenneté')}.</p>
<h2>Comment trancher</h2>
<p>Partez du CLB visé et de votre compétence la plus faible. Si l’écoute vous coûte et que vous visez le CLB 9 ou 10, c’est là que les bandes de l’IELTS sont les plus hautes. Si c’est l’écrit, comparez la bande du PTE Core à celle de l’IELTS à votre niveau. Ajoutez ce que cette page ne peut pas mesurer : le format, les dates proches de chez vous et le prix, que nous ne donnons pas pour les tests d’anglais faute de confirmation sur une page officielle. Côté points, la page des ${h.a('crs-language', 'points de langue')} convertit n’importe quel CLB, et la page ${h.a('ielts-general', 'IELTS General Training')} reprend la grille complète.</p>`,
  },
});
