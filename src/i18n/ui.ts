import type { Locale } from './routes';
const en = {
  updatedOn: 'Charts and rules checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Charts, converters and questions by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'What test takers ask', relatedCalculators: 'Next steps', sourcesTitle: 'Official pages this page relies on', writtenBy: 'Written by',
  asOf: 'Language test charts and rules for', lastUpdated: 'read on canada.ca, the CCI Paris Île-de-France and France Éducation international documents, last checked on',
  footerValidated: 'Every chart, threshold and delay links to the official page it was read on',
  footerBrowser: 'Converters and practice run in your browser · nothing you type is sent · quiz progress stays in this browser · free, no account, no email',
  footerDisclaimer: 'CA TEF TCF Canada is an independent site published by Radif Partners. It is not Immigration, Refugees and Citizenship Canada (IRCC), the Government of Canada or the French administration, and it is not affiliated with CCI Paris Île-de-France (TEF), France Éducation international (TCF) or Paragon Testing (CELPIP). It registers no one for a test, and its practice questions are written in-house: they are not questions of the official tests. Scores and levels shown here are for guidance: your official result is the one on your score report.',
  footerPopular: 'Practice',
  notFound: 'Nothing lives at this address. The score converter (TEF Canada, TCF Canada, CELPIP to CLB and CRS points) is on the home page.',
  readMore: 'Read more', back: 'Home',
};
const fr: typeof en = {
  updatedOn: 'Grilles et règles vérifiées le', editorialPolicy: 'Politique éditoriale', contactLabel: 'Contact', reviewedBy: 'Grilles, convertisseurs et questions par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Ce que demandent les candidats', relatedCalculators: 'Étapes suivantes', sourcesTitle: 'Pages officielles sur lesquelles repose cette page', writtenBy: 'Rédigé par',
  asOf: 'Grilles et règles des tests de langue', lastUpdated: 'relues sur canada.ca et dans les documents de la CCI Paris Île-de-France et de France Éducation international, dernière vérification le',
  footerValidated: 'Chaque grille, seuil et délai renvoie à la page officielle où il a été lu',
  footerBrowser: 'Convertisseurs et entraînement dans votre navigateur · rien de ce que vous saisissez n’est transmis · la progression des quiz reste dans ce navigateur · gratuit, sans compte, sans courriel',
  footerDisclaimer: 'CA TEF TCF Canada est un site indépendant publié par Radif Partners. Ce n’est ni Immigration, Réfugiés et Citoyenneté Canada (IRCC), ni le gouvernement du Canada, ni l’administration française, et il n’est affilié ni à la CCI Paris Île-de-France (TEF), ni à France Éducation international (TCF), ni à Paragon Testing (CELPIP). Il n’inscrit personne à un test, et ses questions d’entraînement sont rédigées par nos soins : ce ne sont pas des questions des tests officiels. Scores et niveaux affichés à titre indicatif : votre résultat officiel est celui de votre attestation.',
  footerPopular: 'Entraînement',
  notFound: 'Aucune page à cette adresse. Le convertisseur de scores (TEF Canada, TCF Canada, CELPIP en NCLC et en points) est sur la page d’accueil.',
  readMore: 'Lire la suite', back: 'Accueil',
};
export function t(lang: Locale) { return lang === 'fr' ? fr : en; }
