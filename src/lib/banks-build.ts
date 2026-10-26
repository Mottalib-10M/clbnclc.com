/** Build-time access to the four banks (never imported by a client component). */
import FR from '../data/questions/fr-reading.json';
import FL from '../data/questions/fr-listening.json';
import ER from '../data/questions/en-reading.json';
import EL from '../data/questions/en-listening.json';
import type { BankKey, Question } from './engine/quiz';
export const BANKS: Record<BankKey, Question[]> = {
  'fr-reading': FR.questions as Question[], 'fr-listening': FL.questions as Question[],
  'en-reading': ER.questions as Question[], 'en-listening': EL.questions as Question[],
};
