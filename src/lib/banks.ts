/**
 * Question banks. `BANKS` (banks-build.ts, static import) is for the build only: pages, helpers and
 * the first render of each quiz. In the browser, `loadBank` fetches one bank on demand.
 */
import type { BankKey, Question } from './engine/quiz';
export type { BankKey };
export async function loadBank(k: BankKey): Promise<Question[]> {
  const m = k === 'fr-reading' ? await import('../data/questions/fr-reading.json')
    : k === 'fr-listening' ? await import('../data/questions/fr-listening.json')
    : k === 'en-reading' ? await import('../data/questions/en-reading.json')
    : await import('../data/questions/en-listening.json');
  return (m.default as { questions: Question[] }).questions;
}
