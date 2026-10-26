import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const lo = (h: Helpers, s: 'R' | 'W' | 'L' | 'S', lv: number) => h.range('ielts', s, lv).split('–')[0];

export default definePage({
  id: 'ielts-general',
  group: 'scores',
  order: 22,
  tool: { kind: 'converter', props: { focus: 'ielts' } },
  mini: { kind: 'mini:ieltsclb' },
  related: ['celpip-vs-ielts', 'celpip', 'crs-language', 'french-bonus', 'which-level'],
  sources: ['ircc_equiv', 'ircc_ee_lang', 'ircc_cit_lang', 'ircc_crs'],
  en: {
    slug: 'ielts-general-clb',
    nav: 'IELTS General to CLB',
    card: 'The IRCC chart for IELTS General Training bands, the uneven listening scale and what each band earns.',
    title: 'IELTS General Training to CLB: 2026 band chart from IRCC',
    description: 'IELTS General Training to CLB with the IRCC chart: the band per skill from CLB 4 to 10, why listening asks more, citizenship bands and Express Entry points.',
    h1: 'IELTS General Training bands to CLB',
    intro: 'Enter your four IELTS General Training bands to see the CLB of each skill. The chart is not the same for every skill, and listening is where it bites.',
    resume: (h) => `IRCC converts IELTS General Training bands to CLB levels with a chart that differs by skill. CLB 7, the Federal Skilled Worker minimum, is band ${lo(h, 'R', 7)} in all four skills. Above that the scales split: CLB 8 needs ${lo(h, 'R', 8)} in reading, writing and speaking but ${lo(h, 'L', 8)} in listening; CLB 9 needs ${lo(h, 'R', 9)} in reading, writing and speaking and ${lo(h, 'L', 9)} in listening; CLB 10 needs ${lo(h, 'R', 10)} in reading, ${lo(h, 'W', 10)} in writing and speaking, and ${lo(h, 'L', 10)} in listening. At the bottom, CLB 4 starts at ${lo(h, 'R', 4)} in reading, ${lo(h, 'L', 4)} in listening and ${lo(h, 'W', 4)} in writing and speaking. IRCC accepts IELTS General Training for Express Entry but not the IELTS One Skill Retake, and the results must be under ${h.P.ee.validityYears} years old. For citizenship it asks ${h.num(h.P.citizenship.ielts.L, 1)} in listening and ${h.num(h.P.citizenship.ielts.S, 1)} in speaking. This site uses IELTS as a reference point for the conversion only; it offers no IELTS-format practice.`,
    faqs: (h) => [
      { q: 'Why does IELTS listening need a higher band for the same CLB?', a: `Because IRCC's chart sets separate bands per skill. From CLB 8 upward, listening asks half a band or more above the others: ${lo(h, 'L', 8)} against ${lo(h, 'R', 8)} for CLB 8, ${lo(h, 'L', 10)} against ${lo(h, 'R', 10)} in reading for CLB 10. A strong reader can therefore end up one CLB lower in listening with an identical band.` },
      { q: 'What IELTS band do I need for CLB 5?', a: `Band ${lo(h, 'R', 5)} in reading and ${lo(h, 'W', 5)} in writing, listening and speaking, according to IRCC's chart. CLB 5 matters in two places: it is the floor for second-language points, and English at CLB 5 or more in all four skills raises the French-language bonus to ${h.P.crs.frenchBonus.englishClb5} points for a candidate with NCLC ${h.P.crs.frenchBonus.nclc} in French.` },
      { q: 'Does a band of 9 earn more than CLB 10?', a: `No. IRCC's chart ends at "CLB 10 and above", reached at ${lo(h, 'L', 10)} in listening, ${lo(h, 'R', 10)} in reading and ${lo(h, 'W', 10)} in writing and speaking. A higher band changes nothing in the Comprehensive Ranking System: a single candidate's first-language points stop at ${h.P.crs.first.single[10]} per skill.` },
    ],
    body: (h) => `
<h2>The IRCC chart for IELTS General Training</h2>
<p>The chart below is the one IRCC publishes on its ${h.src('ircc_equiv', 'language testing page')}. Each cell is the band range that gives the level; IELTS bands move in half points.</p>
${h.chart('ielts', [10, 9, 8, 7, 6, 5, 4], 'IELTS General Training band per CLB level (IRCC equivalency chart).')}
<h2>Three things the chart tells you</h2>
<p>First, CLB 7 is uniform: ${lo(h, 'R', 7)} everywhere. It is the easiest IELTS target to remember and the one most skilled workers need.</p>
<p>Second, listening is the expensive skill above CLB 7. Between CLB 7 and CLB 8 the listening floor climbs from ${lo(h, 'L', 7)} to ${lo(h, 'L', 8)}, a jump of a band and a half, while reading only moves from ${lo(h, 'R', 7)} to ${lo(h, 'R', 8)}.</p>
<p>Third, reading has wider bands at the low end: CLB 6 in reading covers ${h.range('ielts', 'R', 6)}, while CLB 6 in writing covers only ${h.range('ielts', 'W', 6)}. Half a band lost in writing costs more than half a band lost in reading.</p>
<h2>From band to CRS points</h2>
<p>Each skill earns points on its own. With English as your first official language, a single candidate earns ${h.P.crs.first.single[7]} points per skill at CLB 7, ${h.P.crs.first.single[8]} at CLB 8, ${h.P.crs.first.single[9]} at CLB 9 and ${h.P.crs.first.single[10]} at CLB 10; with a spouse who comes along, ${h.P.crs.first.withSpouse[7]}, ${h.P.crs.first.withSpouse[8]}, ${h.P.crs.first.withSpouse[9]} and ${h.P.crs.first.withSpouse[10]}. If French is your first official language, English becomes the second one and earns at most ${h.P.crs.second.max.single} points for a single candidate. The ${h.a('crs-language', 'language points page')} runs the full calculation.</p>
<h2>What IRCC accepts</h2>
<p>For Express Entry, IRCC's ${h.src('ircc_ee_lang', 'language requirements page')} accepts IELTS General Training and rules out the IELTS One Skill Retake. Results count only if they are under ${h.P.ee.validityYears} years old when you create the profile and again when you apply for permanent residence. For citizenship, the ${h.src('ircc_cit_lang', 'language proof page')} accepts IELTS General Training with at least ${h.num(h.P.citizenship.ielts.L, 1)} in listening and ${h.num(h.P.citizenship.ielts.S, 1)} in speaking, and older results that have expired are still taken. In both cases IELTS General Training sits next to CELPIP-General and PTE Core as one of three English options, with no extra weight given to any of them.</p>
<h2>IELTS on a French-focused site</h2>
<p>This site is built around the TEF Canada and the TCF Canada. We include IELTS General Training because many French speakers also hold an English result and want to know what it is worth next to their NCLC. We do not offer IELTS practice, list IELTS fees or describe the IELTS format: those details were not checked on an official page. The ${h.a('celpip-vs-ielts', 'CELPIP vs IELTS comparison')} sets the IELTS bands next to CELPIP-General and PTE Core, and the ${h.a('which-level', 'level by program page')} tells you which CLB to aim for.</p>`,
  },
  fr: {
    slug: 'ielts-general-nclc',
    nav: 'IELTS General en CLB',
    card: 'La grille d’IRCC pour les bandes de l’IELTS General Training, l’écoute plus exigeante et les points obtenus.',
    title: 'IELTS General Training en CLB : la grille d’IRCC pour 2026',
    description: 'IELTS General Training en CLB selon IRCC : la bande à viser par compétence du CLB 4 au CLB 10, l’écoute plus exigeante, la citoyenneté et les points obtenus.',
    h1: 'Les bandes de l’IELTS General Training en CLB',
    intro: 'Saisissez vos quatre bandes IELTS General Training pour obtenir le CLB de chaque compétence. La grille change selon la compétence, et c’est à l’écoute qu’elle se durcit.',
    resume: (h) => `IRCC convertit les bandes de l’IELTS General Training en CLB avec une grille propre à chaque compétence. Le CLB 7, minimum des travailleurs qualifiés (fédéral), correspond à la bande ${lo(h, 'R', 7)} dans les quatre compétences. Au-delà, les échelles divergent : le CLB 8 demande ${lo(h, 'R', 8)} en lecture, à l’écrit et à l’oral, mais ${lo(h, 'L', 8)} à l’écoute ; le CLB 9, ${lo(h, 'R', 9)} en lecture, à l’écrit et à l’oral, et ${lo(h, 'L', 9)} à l’écoute ; le CLB 10, ${lo(h, 'R', 10)} en lecture, ${lo(h, 'W', 10)} à l’écrit et à l’oral, ${lo(h, 'L', 10)} à l’écoute. Tout en bas, le CLB 4 commence à ${lo(h, 'R', 4)} en lecture, ${lo(h, 'L', 4)} à l’écoute et ${lo(h, 'W', 4)} à l’écrit et à l’oral. IRCC accepte l’IELTS General Training pour Entrée express, pas l’IELTS One Skill Retake, et exige des résultats de moins de ${h.P.ee.validityYears} ans. Pour la citoyenneté, il demande ${h.num(h.P.citizenship.ielts.L, 1)} à l’écoute et ${h.num(h.P.citizenship.ielts.S, 1)} à l’oral. Ce site se sert de l’IELTS comme point de repère pour la conversion seulement : il ne propose aucun entraînement au format IELTS.`,
    faqs: (h) => [
      { q: 'Pourquoi l’écoute de l’IELTS exige-t-elle une bande plus haute pour le même CLB ?', a: `Parce que la grille d’IRCC fixe des bandes distinctes par compétence. À partir du CLB 8, l’écoute réclame une demi-bande ou plus au-dessus des autres : ${lo(h, 'L', 8)} contre ${lo(h, 'R', 8)} pour le CLB 8, ${lo(h, 'L', 10)} contre ${lo(h, 'R', 10)} en lecture pour le CLB 10. Un bon lecteur peut donc perdre un CLB à l’écoute avec une bande identique.` },
      { q: 'Quelle bande IELTS faut-il pour le CLB 5 ?', a: `La bande ${lo(h, 'R', 5)} en lecture et ${lo(h, 'W', 5)} à l’écrit, à l’écoute et à l’oral, selon la grille d’IRCC. Le CLB 5 compte à deux endroits : c’est le plancher des points de seconde langue, et un anglais au CLB 5 ou plus dans les quatre compétences porte le bonus francophone à ${h.P.crs.frenchBonus.englishClb5} points pour qui a le NCLC ${h.P.crs.frenchBonus.nclc} en français.` },
      { q: 'Une bande de 9 rapporte-t-elle plus que le CLB 10 ?', a: `Non. La grille d’IRCC s’arrête à « CLB 10 et plus », atteint avec ${lo(h, 'L', 10)} à l’écoute, ${lo(h, 'R', 10)} en lecture et ${lo(h, 'W', 10)} à l’écrit et à l’oral. Une bande plus haute ne change rien dans le Système de classement global : les points de première langue d’un candidat seul plafonnent à ${h.P.crs.first.single[10]} par compétence.` },
    ],
    body: (h) => `
<h2>La grille d’IRCC pour l’IELTS General Training</h2>
<p>Voici la grille publiée par IRCC sur sa ${h.src('ircc_equiv', 'page consacrée aux tests de langue')}. Chaque case donne la plage de bandes qui mène au niveau ; les bandes de l’IELTS avancent par demi-point.</p>
${h.chart('ielts', [10, 9, 8, 7, 6, 5, 4], 'Bande IELTS General Training par niveau CLB (grille d’équivalence d’IRCC).')}
<h2>Trois enseignements de la grille</h2>
<p>D’abord, le CLB 7 est uniforme : ${lo(h, 'R', 7)} partout. C’est la cible IELTS la plus simple à retenir, et celle dont la plupart des travailleurs qualifiés ont besoin.</p>
<p>Ensuite, au-dessus du CLB 7, l’écoute coûte cher. Entre le CLB 7 et le CLB 8, son plancher passe de ${lo(h, 'L', 7)} à ${lo(h, 'L', 8)}, soit une bande et demie, alors que la lecture ne monte que de ${lo(h, 'R', 7)} à ${lo(h, 'R', 8)}.</p>
<p>Enfin, en bas de l’échelle, la lecture a des bandes plus larges : le CLB 6 y couvre ${h.range('ielts', 'R', 6)}, contre ${h.range('ielts', 'W', 6)} seulement à l’écrit. Une demi-bande perdue à l’écrit coûte plus qu’en lecture.</p>
<h2>De la bande aux points du SCG</h2>
<p>Chaque compétence rapporte ses propres points. Avec l’anglais en première langue officielle, un candidat seul obtient ${h.P.crs.first.single[7]} points par compétence au CLB 7, ${h.P.crs.first.single[8]} au CLB 8, ${h.P.crs.first.single[9]} au CLB 9 et ${h.P.crs.first.single[10]} au CLB 10 ; avec un époux qui l’accompagne, ${h.P.crs.first.withSpouse[7]}, ${h.P.crs.first.withSpouse[8]}, ${h.P.crs.first.withSpouse[9]} et ${h.P.crs.first.withSpouse[10]}. Si le français est votre première langue officielle, l’anglais devient la seconde et rapporte au plus ${h.P.crs.second.max.single} points à un candidat seul. La page des ${h.a('crs-language', 'points de langue')} fait le calcul complet.</p>
<h2>Ce qu’IRCC accepte</h2>
<p>Pour Entrée express, la ${h.src('ircc_ee_lang', 'page des exigences linguistiques')} accepte l’IELTS General Training et écarte l’IELTS One Skill Retake. Les résultats ne comptent que s’ils ont moins de ${h.P.ee.validityYears} ans à la création du profil, puis au dépôt de la demande de résidence permanente. Pour la citoyenneté, la ${h.src('ircc_cit_lang', 'page sur la preuve linguistique')} accepte l’IELTS General Training avec au moins ${h.num(h.P.citizenship.ielts.L, 1)} à l’écoute et ${h.num(h.P.citizenship.ielts.S, 1)} à l’oral, et elle prend aussi les résultats expirés. Dans les deux cas, l’IELTS General Training figure à côté du CELPIP-General et du PTE Core, sans qu’aucun des trois tests d’anglais pèse davantage.</p>
<h2>L’IELTS sur un site consacré au français</h2>
<p>Ce site tourne autour du TEF Canada et du TCF Canada. L’IELTS General Training y figure parce que beaucoup de francophones ont aussi un résultat en anglais et veulent savoir ce qu’il vaut à côté de leurs NCLC. Nous ne proposons ni entraînement IELTS, ni tarifs, ni description du format : ces informations n’ont pas été vérifiées sur une page officielle. Le comparatif ${h.a('celpip-vs-ielts', 'CELPIP ou IELTS')} place les bandes IELTS à côté du CELPIP-General et du PTE Core, et la page ${h.a('which-level', 'quel niveau NCLC')} indique le CLB à viser.</p>`,
  },
});
