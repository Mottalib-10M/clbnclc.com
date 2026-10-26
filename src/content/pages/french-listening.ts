import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const lo = (h: Helpers, t: 'tef' | 'tcf', lv: number) => h.range(t, 'L', lv).split('–')[0];
const b1 = (h: Helpers) => h.num(h.P.tef.cecr[3][1] as number);

export default definePage({
  id: 'french-listening',
  group: 'practice',
  order: 42,
  tool: { kind: 'quiz', props: { bank: 'fr-listening' } },
  mini: { kind: 'mini:pace' },
  related: ['french-reading', 'tef-mock', 'tcf-mock', 'french-speaking', 'citizenship-language', 'review'],
  sources: ['fei_tcf_manual', 'cci_tef_canada', 'ircc_cit_lang', 'coe_cefr', 'ircc_equiv'],
  en: {
    slug: 'tef-tcf-listening-practice',
    nav: 'French listening practice',
    card: 'French recordings read by your browser, from A1 to C2, with the transcript after each answer.',
    title: 'TEF and TCF listening practice: French audio, A1 to C2',
    description: 'TEF and TCF listening practice: short French messages and dialogues read aloud by your browser, four options per question, levels A1 to C2, transcript after.',
    h1: 'TEF Canada and TCF Canada listening practice',
    intro: 'Press play, listen, answer: the correction comes with the transcript, so you can see exactly which words you missed and play the document again.',
    resume: (h) => `This listening practice uses ${h.num(h.bankSize.frListening)} questions written by Radif Partners, from CEFR level A1 to C2: phone messages, station announcements, radio items, conversations at work or at the clinic. There is no audio file. Your browser reads each document aloud with its own speech synthesis, choosing a Canadian French voice when the device has one and a French voice otherwise. The result is clear but flatter than a real recording, so treat it as training for comprehension, not for accents or background noise. In practice mode you can replay a document, and the transcript appears once you have answered. The official tests are stricter: the TEF Canada listening test has ${h.P.tef.canada.co.q} questions in ${h.P.tef.canada.co.min} minutes, the TCF Canada one ${h.P.tcf.canada.co.q} questions in ${h.P.tcf.canada.co.min} minutes, and the TCF manual says each recording is played only once. NCLC 7 in listening starts at ${lo(h, 'tef', 7)} on the TEF and ${lo(h, 'tcf', 7)} on the TCF. Listening also counts for citizenship, where IRCC asks NCLC ${h.P.citizenship.clb}, or CEFR ${h.P.citizenship.tefCefr} on the TEF and TCF.`,
    faqs: (h) => [
      { q: 'Why does the listening practice use a synthetic voice?', a: 'Because it lets the site offer listening without storing or streaming audio: the text of each document is read by your own browser. The voice depends on your device and may sound mechanical. It trains the core skill (following spoken French at speed) but not every accent or the sound quality of a test room.' },
      { q: 'What happens if my browser cannot read the French aloud?', a: 'The tool detects it and shows the transcript instead of the play button. The exercise then becomes a reading exercise on spoken-style French, which is still useful but easier than listening. Most current desktop and mobile browsers include speech synthesis; installing a French voice on the device usually improves the result.' },
      { q: 'Can I replay a recording during listening practice?', a: `Yes, in practice mode the button turns into "Play again" after the first listening. In the timed sections of the TEF and TCF mocks each document plays once, matching what the TCF candidate manual describes. Our suggestion: replay freely at first, then train on single listenings as the exam gets closer.` },
      { q: 'Does French listening count for Canadian citizenship?', a: `Yes. For citizenship IRCC looks only at listening and speaking: CLB or NCLC ${h.P.citizenship.clb} in both, which for the TEF Canada and TCF Canada means CEFR ${h.P.citizenship.tefCefr} or higher. Reading and writing are not assessed, and IRCC accepts expired results for this purpose.` },
    ],
    body: (h) => `
<h2>What you hear, and what you do not</h2>
<p>Each document is plain text that your browser turns into speech, slightly slower than its default pace. Dialogues are read by a single voice, so you follow who speaks from the content rather than from a change of voice. That is the main gap with a real test, along with accents, background sounds and natural hesitations. In return, nothing is downloaded or recorded, and you can replay a document as often as you need.</p>
<p>The questions were written by Radif Partners against the CEFR global scale. At A1 and A2 the documents are short and concrete (a time, a place, a price); from B2 upwards they become longer exchanges where the answer depends on an opinion, a reason or a nuance. Every explanation names the CEFR descriptor the question targets.</p>
<h2>The listening tests at a glance</h2>
${h.table(['Test', 'Questions', 'Minutes', 'NCLC 7 from', 'CEFR B1 from'], [
  ['TEF Canada', h.P.tef.canada.co.q, h.P.tef.canada.co.min, lo(h, 'tef', 7), b1(h)],
  ['TCF Canada', h.P.tcf.canada.co.q, h.P.tcf.canada.co.min, lo(h, 'tcf', 7), b1(h)],
], 'Listening tests: questions, duration, NCLC 7 threshold (IRCC chart) and start of the B1 band (CCI and TCF manual).', ['l', 'r', 'r', 'r', 'r'])}
<p>The TCF Canada listening test is shorter than the TEF one by ${h.P.tef.canada.co.min - h.P.tcf.canada.co.min} minutes for one question fewer, so its pace is tighter. The ${h.src('fei_tcf_manual', 'TCF candidate manual')} adds that recordings are heard once and that questions get harder as the test goes on. The ${h.src('cci_tef_canada', 'CCI presentation')} gives the TEF format.</p>
<h2>Replaying now, listening once later</h2>
<p>Replay is a learning tool, not an exam habit. On a first pass, listen, answer, then read the transcript and play the document again to hear the words you missed: a number said quickly, a negation, a time expression. When your accuracy at a level is steady, switch to the timed sections of the ${h.a('tef-mock', 'TEF Canada mock')} or the ${h.a('tcf-mock', 'TCF Canada mock')}, where each document plays once and the transcript stays hidden until the end. That is our suggestion, not an official method.</p>
<h2>Listening for Express Entry and for citizenship</h2>
<p>For Express Entry, listening is one of the four skills, each converted to its own NCLC level; the Federal Skilled Worker program needs NCLC ${h.P.ee.fsw} in all four. For citizenship, listening is one of only two skills that count. The ${h.src('ircc_cit_lang', 'IRCC citizenship page')} asks CLB or NCLC ${h.P.citizenship.clb} in listening and speaking, and accepts the TEF Canada and TCF Canada at CEFR ${h.P.citizenship.tefCefr} or higher. The CCI notes that the TEF Canada for citizenship covers only listening and speaking. More on the ${h.a('citizenship-language', 'citizenship language page')}.</p>
<h2>Making the most of the transcript (our suggestion)</h2>
<p>After each set, pick the two documents you found hardest. Read the transcript aloud yourself, then play the synthetic version and compare: the words you stumble on are often the ones you did not hear. Note recurring traps, such as numbers, dates and the difference between what a speaker wants and what they finally decide. Questions you missed stay in this browser, and the ${h.a('review', 'review page')} brings them back with their transcript. Nothing is sent; clearing your browser storage clears your progress.</p>`,
  },
  fr: {
    slug: 'comprehension-orale-tef-tcf',
    nav: 'Compréhension orale',
    card: 'Des documents sonores lus par votre navigateur, du A1 au C2, avec la transcription après chaque réponse.',
    title: 'Compréhension orale TEF et TCF : exercices audio A1 à C2',
    description: 'Compréhension orale TEF et TCF : messages et dialogues lus à voix haute par votre navigateur, quatre choix par question, niveaux A1 à C2, transcription ensuite.',
    h1: 'Compréhension orale : entraînement TEF Canada et TCF Canada',
    intro: 'Lancez l’écoute, répondez, puis lisez la transcription : vous voyez exactement les mots qui vous ont échappé et vous pouvez réécouter le document.',
    resume: (h) => `L’entraînement en compréhension orale repose sur ${h.num(h.bankSize.frListening)} questions rédigées par Radif Partners, du niveau A1 au C2 du CECR : messages de répondeur, annonces en gare, brèves de radio, échanges au travail ou chez le médecin. Aucun fichier son n’est diffusé : c’est votre navigateur qui lit chaque document grâce à sa synthèse vocale, avec une voix du français canadien si l’appareil en possède une, sinon une voix française. Le rendu est net mais plus plat qu’un enregistrement réel ; il entraîne la compréhension, pas l’oreille aux accents ni au bruit ambiant. En mode entraînement, vous pouvez réécouter, et la transcription s’affiche après votre réponse. À l’examen, les conditions sont plus strictes : ${h.P.tef.canada.co.q} questions en ${h.P.tef.canada.co.min} minutes au TEF Canada, ${h.P.tcf.canada.co.q} questions en ${h.P.tcf.canada.co.min} minutes au TCF Canada, et le manuel du TCF précise que chaque enregistrement n’est diffusé qu’une fois. Le NCLC 7 en compréhension orale commence à ${lo(h, 'tef', 7)} au TEF et à ${lo(h, 'tcf', 7)} au TCF. Pour la citoyenneté, IRCC demande le NCLC ${h.P.citizenship.clb} à l’écoute, soit le niveau ${h.P.citizenship.tefCefr} au TEF ou au TCF.`,
    faqs: (h) => [
      { q: 'Pourquoi une voix de synthèse pour la compréhension orale ?', a: 'Parce qu’elle permet de proposer l’écoute sans héberger ni diffuser de fichiers son : le texte du document est lu par votre propre navigateur. La voix dépend de l’appareil et peut sembler mécanique. Elle exerce l’essentiel, suivre le français parlé à vitesse normale, mais pas la diversité des accents ni l’acoustique d’une salle d’examen.' },
      { q: 'Et si mon navigateur ne sait pas lire le français à voix haute ?', a: 'L’outil le détecte et affiche la transcription à la place du bouton d’écoute. L’exercice devient alors une lecture de français oral, utile mais plus facile qu’une vraie écoute. La plupart des navigateurs récents, sur ordinateur comme sur téléphone, savent lire un texte ; installer une voix française sur l’appareil améliore souvent le rendu.' },
      { q: 'Peut-on réécouter un document pendant l’entraînement à l’oral ?', a: 'Oui : en mode entraînement, le bouton devient « Réécouter » après la première écoute. Dans les sections chronométrées des examens blancs, chaque document ne passe qu’une fois, comme le décrit le manuel du candidat TCF. Notre conseil : réécoutez librement au début, puis habituez-vous à l’écoute unique à l’approche de l’examen.' },
      { q: 'La compréhension orale compte-t-elle pour la citoyenneté canadienne ?', a: `Oui. Pour la citoyenneté, IRCC ne regarde que la compréhension et l’expression orales : NCLC ${h.P.citizenship.clb} dans les deux, ce qui correspond au niveau ${h.P.citizenship.tefCefr} ou plus au TEF Canada et au TCF Canada. La lecture et l’écriture ne sont pas évaluées, et IRCC accepte pour cette démarche des résultats expirés.` },
    ],
    body: (h) => `
<h2>Ce que vous entendez, et ce qui manque</h2>
<p>Chaque document est un texte que le navigateur transforme en parole, un peu plus lentement que sa vitesse par défaut. Les dialogues passent par une seule voix : c’est le contenu, et non le timbre, qui indique qui parle. Voilà le principal écart avec une épreuve réelle, avec les accents, les bruits de fond et les hésitations naturelles. En échange, aucun fichier n’est téléchargé ni enregistré, et la réécoute est illimitée.</p>
<p>Les questions ont été rédigées par Radif Partners à partir de l’échelle globale du CECR. Aux niveaux A1 et A2, les documents sont courts et concrets : une heure, un lieu, un prix. Dès le B2, ils s’allongent et la bonne réponse tient à une opinion, une raison, une nuance. Chaque explication rappelle le descripteur du CECR visé.</p>
<h2>Les deux épreuves d’écoute</h2>
${h.table(['Test', 'Questions', 'Minutes', 'NCLC 7 à partir de', 'B1 à partir de'], [
  ['TEF Canada', h.P.tef.canada.co.q, h.P.tef.canada.co.min, lo(h, 'tef', 7), b1(h)],
  ['TCF Canada', h.P.tcf.canada.co.q, h.P.tcf.canada.co.min, lo(h, 'tcf', 7), b1(h)],
], 'Compréhension orale : questions, durée, seuil du NCLC 7 (grille d’IRCC) et début de la bande B1 (CCI et manuel du TCF).', ['l', 'r', 'r', 'r', 'r'])}
<p>L’épreuve du TCF Canada dure ${h.P.tef.canada.co.min - h.P.tcf.canada.co.min} minutes de moins que celle du TEF pour une question de moins : le rythme y est plus serré. Le ${h.src('fei_tcf_manual', 'manuel du candidat TCF')} indique aussi que les enregistrements ne passent qu’une fois et que les questions deviennent plus difficiles au fil de l’épreuve. La ${h.src('cci_tef_canada', 'présentation de la CCI')} décrit le format du TEF.</p>
<h2>Réécouter d’abord, écouter une seule fois ensuite</h2>
<p>La réécoute sert à apprendre, pas à passer l’examen. Au premier passage, écoutez, répondez, puis lisez la transcription et relancez le document pour entendre ce qui vous a échappé : un chiffre dit vite, une négation, une indication de temps. Quand vos résultats sont stables à un niveau, passez aux sections chronométrées de l’${h.a('tef-mock', 'examen blanc du TEF Canada')} ou de celui du ${h.a('tcf-mock', 'TCF Canada')}, où chaque document ne passe qu’une fois et où la transcription reste cachée jusqu’à la fin. C’est une suggestion de notre part, pas une méthode officielle.</p>
<h2>L’écoute pour Entrée express et pour la citoyenneté</h2>
<p>Dans Entrée express, la compréhension orale est l’une des quatre épreuves, chacune convertie en NCLC ; le programme des travailleurs qualifiés exige le NCLC ${h.P.ee.fsw} partout. Pour la citoyenneté, elle fait partie des deux seules compétences retenues. La ${h.src('ircc_cit_lang', 'page d’IRCC sur la citoyenneté')} demande le NCLC ${h.P.citizenship.clb} en compréhension et en expression orales, et accepte le TEF Canada et le TCF Canada au niveau ${h.P.citizenship.tefCefr} ou plus. La CCI précise que le TEF Canada passé pour la citoyenneté ne comporte que ces deux épreuves. Le détail est sur la page du ${h.a('citizenship-language', 'test de langue pour la citoyenneté')}.</p>
<h2>Tirer parti de la transcription (notre suggestion)</h2>
<p>Après chaque série, retenez les deux documents les plus difficiles. Lisez leur transcription à voix haute, puis relancez la version de synthèse et comparez : les mots sur lesquels vous butez sont souvent ceux que vous n’aviez pas entendus. Notez les pièges qui reviennent, comme les nombres, les dates, ou l’écart entre ce qu’une personne souhaite et ce qu’elle décide. Les questions manquées restent dans ce navigateur, et la ${h.a('review', 'page de révision')} les propose de nouveau avec leur transcription. Rien n’est transmis ; vider le stockage du navigateur efface la progression.</p>`,
  },
});
