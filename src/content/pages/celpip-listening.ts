import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'celpip-listening',
  group: 'practice',
  order: 54,
  tool: { kind: 'quiz', props: { bank: 'en-listening' } },
  mini: { kind: 'mini:celpipclb' },
  related: ['celpip', 'celpip-reading', 'citizenship-language', 'celpip-vs-ielts', 'ielts-general', 'review'],
  sources: ['ircc_equiv', 'ircc_cit_lang', 'ircc_ee_lang', 'cclb'],
  en: {
    slug: 'celpip-listening-practice',
    nav: 'CELPIP listening practice',
    card: 'English listening questions from CLB 4 to CLB 10, read aloud by your browser, with the transcript after each answer.',
    title: 'CELPIP listening practice: English audio from CLB 4 to 10',
    description: 'CELPIP listening practice: short English conversations and announcements read by your browser, graded from CLB 4 to 10, with the transcript after each answer.',
    h1: 'CELPIP listening practice by CLB level',
    intro: 'Press play, listen to the conversation or announcement, pick an answer. The correction comes with the transcript, and you can play the document again.',
    resume: (h) => `Listening is the skill that counts everywhere in Canadian immigration: in all three Express Entry programs and, with speaking, for citizenship. IRCC reads CELPIP-General levels as CLB levels one for one, and for citizenship it accepts a CELPIP-General level of ${h.P.citizenship.celpip} or more in listening and speaking. This page gives you ${h.num(h.bankSize.enListening)} English listening questions written by Radif Partners, from CLB ${h.P.clb.min} to CLB ${h.P.clb.max}: phone messages, workplace meetings, health and housing conversations, radio items. They are general CLB-level questions written with the Canadian Language Benchmarks in mind, not CELPIP items, and this site does not describe the CELPIP's parts or timing, which we have not confirmed on an official source. Your browser reads each document aloud with its own speech synthesis, choosing a Canadian English voice where the device has one. You may replay as often as you like, and the transcript appears after you answer. On other accepted tests, CLB 7 in listening is ${h.range('ielts', 'L', 7)} on the IELTS General Training and starts at ${h.range('pte', 'L', 7).split('–')[0]} on the PTE Core. Answers stay in this browser for the review page.`,
    faqs: (h) => [
      { q: 'Are these listening questions from the CELPIP test?', a: 'No. They were written by Radif Partners and graded by CLB level, with no link to the CELPIP or its publisher. They train the general ability to follow spoken English in Canadian situations, at a known CLB level. They do not reproduce the CELPIP format, and they cannot predict a CELPIP score.' },
      { q: 'What listening level does IRCC ask for citizenship?', a: `CLB ${h.P.citizenship.clb} in listening and in speaking, for applicants aged ${h.P.citizenship.ages[0]} to ${h.P.citizenship.ages[1]}. In test terms that is CELPIP-General ${h.P.citizenship.celpip} or more, IELTS General Training ${h.num(h.P.citizenship.ielts.L, 1)} or more in listening, or PTE Core ${h.P.citizenship.pte.L} or more in listening. IRCC also accepts expired results for citizenship.` },
      { q: 'Why does the English voice sound robotic?', a: 'It is not a recording but your browser reading the text aloud. The quality depends on the voices installed on your device; a Canadian English voice is used when one is available, then American or British English. Installing a better English voice in your system settings often helps. If no voice exists, the transcript is shown instead.' },
      { q: 'Which Express Entry program has the lowest listening minimum?', a: `The Canadian Experience Class for TEER 2 or 3 jobs and the Federal Skilled Trades program both ask CLB ${h.P.ee.cecTeer23} in listening. The Federal Skilled Worker program and the Canadian Experience Class for TEER 0 or 1 jobs ask CLB ${h.P.ee.fsw}. Points in the ranking system then rise with each level up to CLB 10.` },
    ],
    body: (h) => `
<h2>What the listening questions cover, level by level</h2>
<p>Every question is tagged with the CLB level it was written for. The summaries in this table are ours; the benchmarks themselves come from the ${h.src('cclb', 'Centre for Canadian Language Benchmarks')}.</p>
${h.table(['CLB level', 'What our listening questions ask'], [
  ['4', 'understand a short, simple exchange about everyday needs'],
  ['5', 'catch key details in a routine message or conversation'],
  ['6', 'follow main ideas and details in a conversation or announcement'],
  ['7', 'understand decisions, reasons and opinions in a discussion'],
  ['8', 'identify attitudes and implied concerns in a longer discussion'],
  ['9', 'infer purpose and speaker intent in complex speech'],
  ['10', 'interpret irony, nuance and the structure of an argument'],
], 'Our summary of the listening tasks behind each level of the question bank (Radif Partners, after the Canadian Language Benchmarks).', ['l', 'l'])}
<h2>Listening in Express Entry and for citizenship</h2>
<p>The thresholds below come from IRCC's ${h.src('ircc_ee_lang', 'Express Entry language page')} and its ${h.src('ircc_cit_lang', 'citizenship language page')}.</p>
${h.table(['Purpose', 'Listening level', 'CELPIP-General', 'IELTS General Training', 'PTE Core'], [
  ['Citizenship', `CLB ${h.P.citizenship.clb}`, `${h.P.citizenship.celpip}+`, `${h.num(h.P.citizenship.ielts.L, 1)}+`, `${h.P.citizenship.pte.L}+`],
  ['Federal Skilled Trades', `CLB ${h.P.ee.fst.L}`, `${h.P.ee.fst.L}+`, h.range('ielts', 'L', h.P.ee.fst.L).split('–')[0] + '+', h.range('pte', 'L', h.P.ee.fst.L).split('–')[0] + '+'],
  ['Federal Skilled Worker', `CLB ${h.P.ee.fsw}`, `${h.P.ee.fsw}+`, h.range('ielts', 'L', h.P.ee.fsw).split('–')[0] + '+', h.range('pte', 'L', h.P.ee.fsw).split('–')[0] + '+'],
], 'Listening minimums by purpose and test (IRCC; scores from the IRCC equivalency charts).', ['l', 'l', 'r', 'r', 'r'])}
<p>For Express Entry, results must be less than ${h.P.ee.validityYears} years old at profile creation and again when you apply for permanent residence. For citizenship, IRCC accepts expired results. The ${h.a('citizenship-language', 'citizenship page')} covers the other ways to prove your level.</p>
<h2>How the audio works</h2>
<p>No sound file is played. When you press "Play the recording", your browser reads the document aloud, slightly slower than its default rate, picking a Canadian English voice if one is installed, then American or British English. Conversations are read by one voice, so you follow the speakers through what they say. After your answer the transcript appears under the question; read it, then play again to hear the words you missed. If your browser cannot speak, you see the transcript straight away, which turns the exercise into reading.</p>
<h2>Using the sets well (our suggestion)</h2>
<p>Start with unfiltered sets of ten to see your profile across CLB ${h.P.clb.min} to ${h.P.clb.max}. When you press "See my result", our indication shows the highest level up to which you kept two thirds right; it is a rough guide written by us, not a test score. Then filter on the level just above it. Listen once before answering, as you would in a test, and only replay after reading the correction. Missed questions are stored in this browser, and the ${h.a('review', 'review page')} brings them back with their transcript.</p>
<h2>What this page does not cover</h2>
<p>We do not give the CELPIP's number of parts, its timing, fee or result delay: we have not confirmed them on an official source, so they are left out on purpose. Check them with the test publisher before booking. For the conversion of your actual results, see the ${h.a('celpip', 'CELPIP and CLB page')}; to compare with the IELTS General Training, see the ${h.a('ielts-general', 'IELTS page')}. The ${h.a('celpip-reading', 'reading practice')} uses the same CLB levels.</p>`,
  },
  fr: {
    slug: 'celpip-ecoute-entrainement',
    nav: 'Écoute CELPIP',
    card: 'Des questions d’écoute en anglais du CLB 4 au CLB 10, lues par votre navigateur, avec la transcription après chaque réponse.',
    title: 'Écoute CELPIP : entraînement en anglais du CLB 4 au CLB 10',
    description: 'Écoute CELPIP : des conversations et des annonces en anglais lues par votre navigateur, classées du CLB 4 au CLB 10, avec la transcription après chaque réponse.',
    h1: 'Écoute en anglais : entraînement par niveau CLB pour le CELPIP',
    intro: 'Lancez l’écoute, suivez la conversation ou l’annonce, choisissez une réponse. La correction s’accompagne de la transcription, et vous pouvez réécouter le document.',
    resume: (h) => `L’écoute compte partout dans l’immigration au Canada : dans les trois programmes d’Entrée express et, avec l’oral, pour la citoyenneté. IRCC lit les niveaux du CELPIP-General comme des niveaux CLB, sans conversion, et accepte pour la citoyenneté un CELPIP-General de niveau ${h.P.citizenship.celpip} ou plus à l’écoute et à l’oral. Cette page propose ${h.num(h.bankSize.enListening)} questions d’écoute en anglais rédigées par Radif Partners, du CLB ${h.P.clb.min} au CLB ${h.P.clb.max} : messages téléphoniques, réunions de travail, échanges sur la santé ou le logement, brèves de radio. Ce sont des questions générales de niveau CLB, écrites d’après les niveaux de compétence linguistique canadiens, et non des questions du CELPIP ; le site ne décrit ni les parties ni la durée de ce test, que nous n’avons pas confirmées sur une source officielle. Votre navigateur lit chaque document avec sa propre synthèse vocale, en choisissant une voix d’anglais canadien si l’appareil en a une. La réécoute est libre et la transcription s’affiche après la réponse. Dans les autres tests acceptés, le CLB 7 à l’écoute correspond à ${h.range('ielts', 'L', 7)} à l’IELTS General Training et commence à ${h.range('pte', 'L', 7).split('–')[0]} au PTE Core. Vos réponses restent dans ce navigateur.`,
    faqs: (h) => [
      { q: 'Ces questions d’écoute viennent-elles du CELPIP ?', a: 'Non. Elles ont été écrites par Radif Partners et classées par niveau CLB, sans aucun lien avec le CELPIP ni avec son éditeur. Elles entraînent la capacité générale à suivre l’anglais parlé dans des situations canadiennes, à un niveau CLB connu. Elles ne reproduisent pas le format du CELPIP et ne peuvent pas prédire un score.' },
      { q: 'Quel niveau d’écoute IRCC exige-t-il pour la citoyenneté ?', a: `Le CLB ${h.P.citizenship.clb} à l’écoute et à l’oral, pour les demandeurs de ${h.P.citizenship.ages[0]} à ${h.P.citizenship.ages[1]} ans. Concrètement : CELPIP-General ${h.P.citizenship.celpip} ou plus, IELTS General Training ${h.num(h.P.citizenship.ielts.L, 1)} ou plus à l’écoute, ou PTE Core ${h.P.citizenship.pte.L} ou plus à l’écoute. IRCC accepte aussi des résultats expirés pour la citoyenneté.` },
      { q: 'Pourquoi la voix anglaise paraît-elle mécanique ?', a: 'Ce n’est pas un enregistrement : c’est votre navigateur qui lit le texte. La qualité dépend des voix installées sur l’appareil ; une voix d’anglais canadien est choisie si elle existe, sinon américain ou britannique. Installer une meilleure voix anglaise dans les réglages du système aide souvent. Sans aucune voix, la transcription s’affiche à la place.' },
      { q: 'Quel programme d’Entrée express a le minimum d’écoute le plus bas ?', a: `La catégorie de l’expérience canadienne pour un emploi FEER 2 ou 3 et le programme des métiers spécialisés demandent tous deux le CLB ${h.P.ee.cecTeer23} à l’écoute. Le programme des travailleurs qualifiés et l’expérience canadienne pour un emploi FEER 0 ou 1 demandent le CLB ${h.P.ee.fsw}. Les points du classement montent ensuite à chaque niveau jusqu’au CLB 10.` },
    ],
    body: (h) => `
<h2>Ce que couvrent les questions d’écoute, niveau par niveau</h2>
<p>Chaque question porte le niveau CLB pour lequel elle a été écrite. Les résumés du tableau sont les nôtres ; les niveaux eux-mêmes sont publiés par le ${h.src('cclb', 'Centre des niveaux de compétence linguistique canadiens')}.</p>
${h.table(['Niveau CLB', 'Ce que demandent nos questions d’écoute'], [
  ['4', 'comprendre un échange court et simple sur des besoins courants'],
  ['5', 'saisir les détails clés d’un message ou d’une conversation ordinaire'],
  ['6', 'suivre idées principales et détails d’une conversation ou d’une annonce'],
  ['7', 'comprendre décisions, raisons et opinions dans une discussion'],
  ['8', 'repérer attitudes et inquiétudes implicites dans une discussion longue'],
  ['9', 'déduire le but et l’intention d’un locuteur dans un discours complexe'],
  ['10', 'interpréter l’ironie, les nuances et la structure d’une argumentation'],
], 'Notre résumé des tâches d’écoute derrière chaque niveau de la banque (Radif Partners, d’après les niveaux de compétence linguistique canadiens).', ['l', 'l'])}
<h2>L’écoute dans Entrée express et pour la citoyenneté</h2>
<p>Les seuils ci-dessous proviennent de la ${h.src('ircc_ee_lang', 'page d’IRCC sur Entrée express')} et de sa ${h.src('ircc_cit_lang', 'page sur la citoyenneté')}.</p>
${h.table(['Démarche', 'Niveau d’écoute', 'CELPIP-General', 'IELTS General Training', 'PTE Core'], [
  ['Citoyenneté', `CLB ${h.P.citizenship.clb}`, `${h.P.citizenship.celpip} et plus`, `${h.num(h.P.citizenship.ielts.L, 1)} et plus`, `${h.P.citizenship.pte.L} et plus`],
  ['Métiers spécialisés', `CLB ${h.P.ee.fst.L}`, `${h.P.ee.fst.L} et plus`, h.range('ielts', 'L', h.P.ee.fst.L).split('–')[0] + ' et plus', h.range('pte', 'L', h.P.ee.fst.L).split('–')[0] + ' et plus'],
  ['Travailleurs qualifiés', `CLB ${h.P.ee.fsw}`, `${h.P.ee.fsw} et plus`, h.range('ielts', 'L', h.P.ee.fsw).split('–')[0] + ' et plus', h.range('pte', 'L', h.P.ee.fsw).split('–')[0] + ' et plus'],
], 'Minimums d’écoute par démarche et par test (IRCC ; scores tirés des grilles d’équivalence d’IRCC).', ['l', 'l', 'r', 'r', 'r'])}
<p>Pour Entrée express, les résultats doivent dater de moins de ${h.P.ee.validityYears} ans à la création du profil et au dépôt de la demande de résidence permanente. Pour la citoyenneté, IRCC accepte des résultats expirés. La page sur la ${h.a('citizenship-language', 'langue pour la citoyenneté')} présente les autres preuves possibles.</p>
<h2>Le fonctionnement de l’audio</h2>
<p>Aucun fichier son n’est diffusé. Quand vous appuyez sur « Écouter l’enregistrement », le navigateur lit le document, un peu plus lentement que sa vitesse par défaut, avec une voix d’anglais canadien si elle est installée, sinon américaine ou britannique. Les conversations passent par une seule voix : on suit les interlocuteurs par ce qu’ils disent. Après la réponse, la transcription apparaît sous la question ; lisez-la, puis réécoutez pour entendre les mots manqués. Si le navigateur ne sait pas parler, la transcription s’affiche d’emblée et l’exercice devient une lecture.</p>
<h2>Bien utiliser les séries (notre suggestion)</h2>
<p>Commencez par des séries de dix sans filtre pour voir votre profil du CLB ${h.P.clb.min} au CLB ${h.P.clb.max}. Après « Voir mon résultat », notre indication donne le niveau le plus haut jusqu’où vous avez gardé deux tiers de bonnes réponses : un repère grossier, établi par nous, pas un score de test. Filtrez ensuite sur le niveau juste au-dessus. Écoutez une fois avant de répondre, comme à l’examen, et ne réécoutez qu’après la correction. Les questions manquées restent dans ce navigateur, et la ${h.a('review', 'page de révision')} les propose de nouveau avec leur transcription.</p>
<h2>Ce que cette page ne couvre pas</h2>
<p>Nous ne donnons ni le nombre de parties du CELPIP, ni sa durée, ni son prix, ni son délai de résultat : ces éléments n’ont pas été confirmés sur une source officielle et sont donc laissés de côté. Vérifiez-les auprès de l’éditeur du test avant de réserver. Pour convertir vos vrais résultats, voyez la page ${h.a('celpip', 'CELPIP et NCLC')} ; pour comparer avec l’IELTS General Training, la page de l’${h.a('ielts-general', 'IELTS')}. L’entraînement en ${h.a('celpip-reading', 'lecture')} suit les mêmes niveaux CLB.</p>`,
  },
});
