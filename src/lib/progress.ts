/**
 * Quiz progress kept in this browser only (localStorage), never sent anywhere: last result of each
 * question and the list of questions missed, for the error-review page. Every access is guarded:
 * private windows and blocked storage simply mean no saved progress.
 */
const KEY = 'clb-practice-progress-v1';
export interface Progress { seen: Record<string, 0 | 1>; at: Record<string, string> }
const empty = (): Progress => ({ seen: {}, at: {} });
export function readProgress(): Progress {
  try { const s = window.localStorage.getItem(KEY); if (!s) return empty(); const p = JSON.parse(s); return { seen: p.seen ?? {}, at: p.at ?? {} }; } catch { return empty(); }
}
export function record(id: string, right: boolean, day: string): void {
  try { const p = readProgress(); p.seen[id] = right ? 1 : 0; p.at[id] = day; window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage unavailable */ }
}
export function clearProgress(): void {
  try { window.localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
}
export const THEME_LABEL: Record<'en' | 'fr', Record<string, string>> = {
  en: { daily: 'Daily life', work: 'Work', housing: 'Housing', health: 'Health', admin: 'Public services', transport: 'Transport', education: 'Education', media: 'Media', environment: 'Environment', society: 'Society', culture: 'Culture and leisure', science: 'Science' },
  fr: { daily: 'Vie quotidienne', work: 'Travail', housing: 'Logement', health: 'Santé', admin: 'Services publics', transport: 'Transports', education: 'Études', media: 'Médias', environment: 'Environnement', society: 'Société', culture: 'Culture et loisirs', science: 'Sciences' },
};
