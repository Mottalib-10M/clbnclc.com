/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://clbnclc.com";
export const SITE_NAMES: Record<string, string> = {"en": "CLB NCLC", "fr": "CLB NCLC"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "NCLC";
export const LANG_TAGS: Record<string, string> = {"en": "en-CA", "fr": "fr-CA"};
export const OG_LOCALES: Record<string, string> = {"en": "en_CA", "fr": "fr_CA"};
export const LOCALE_TAG = 'en-CA';
export const CURRENCY = 'CAD';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-26';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Independent publisher of language-test tools for Canadian immigration: TEF Canada, TCF Canada and CELPIP scores converted to CLB/NCLC levels and Express Entry points, plus French and English practice written in-house", "fr": "Éditeur indépendant d'outils sur les tests de langue de l'immigration : scores TEF Canada, TCF Canada et CELPIP convertis en NCLC/CLB et en points d'Entrée express, entraînement en français et en anglais rédigé par nos soins"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners is an independent publisher. For this site it reads the IRCC language test equivalency charts and Comprehensive Ranking System criteria, the CCI Paris Île-de-France TEF Canada score tables, the France Éducation international TCF candidate manual and the French orders of 22 December 2025 on language proof, then writes its own practice questions and converters that run only in your browser. It is not IRCC, not a test centre and not affiliated with CCI Paris Île-de-France, France Éducation international or Paragon Testing.", "fr": "Radif Partners est un éditeur indépendant. Pour ce site, il lit les tableaux d'équivalence des tests de langue et les critères du Système de classement global d'IRCC, les grilles TEF Canada de la CCI Paris Île-de-France, le manuel du candidat TCF de France Éducation international et les arrêtés du 22 décembre 2025 sur la preuve du niveau de français, puis rédige ses propres questions d'entraînement et des convertisseurs qui tournent uniquement dans votre navigateur. Ce n'est ni IRCC, ni un centre d'examen, et il n'est affilié ni à la CCI Paris Île-de-France, ni à France Éducation international, ni à Paragon Testing."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["TEF Canada", "TCF Canada", "CELPIP-General", "Canadian Language Benchmarks", "Express Entry language points", "TEF IRN and TCF IRN for France"], "fr": ["TEF Canada", "TCF Canada", "CELPIP-General", "Niveaux de compétence linguistique canadiens", "Points de langue d'Entrée express", "TEF IRN et TCF IRN pour la France"]};
export const CONTACT_EMAIL = "contact@clbnclc.com";
export const THEME_COLOR = '#A6192E';
export const LOGO_SYMBOL = 'CLB';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = 'd649a5de703cfcfb5dd0e98d5172f201';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
