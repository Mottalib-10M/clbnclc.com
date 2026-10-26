/** Words shared by the tools (both languages): skills, tests, programmes, levels. */
import type { Skill, TestId } from './engine/clb';
export type Lang = 'en' | 'fr';

export const SKILL: Record<Lang, Record<Skill, string>> = {
  en: { R: 'Reading', W: 'Writing', L: 'Listening', S: 'Speaking' },
  fr: { R: 'Compréhension écrite', W: 'Expression écrite', L: 'Compréhension orale', S: 'Expression orale' },
};
export const SKILL_SHORT: Record<Lang, Record<Skill, string>> = {
  en: { R: 'Reading', W: 'Writing', L: 'Listening', S: 'Speaking' },
  fr: { R: 'Lecture', W: 'Écrit', L: 'Écoute', S: 'Oral' },
};
export const TEST: Record<Lang, Record<TestId, string>> = {
  en: { tef: 'TEF Canada (from Dec. 11, 2023)', tef2019: 'TEF Canada (Oct. 1, 2019 to Dec. 10, 2023)', tefOld: 'TEF Canada, “équivalence ancien score” column', tcf: 'TCF Canada', celpip: 'CELPIP-General', ielts: 'IELTS General Training', pte: 'PTE Core' },
  fr: { tef: 'TEF Canada (depuis le 11 déc. 2023)', tef2019: 'TEF Canada (1er oct. 2019 au 10 déc. 2023)', tefOld: 'TEF Canada, colonne « équivalence ancien score »', tcf: 'TCF Canada', celpip: 'CELPIP-General', ielts: 'IELTS General Training', pte: 'PTE Core' },
};
export const PROGRAM: Record<Lang, Record<string, string>> = {
  en: { fsw: 'Federal Skilled Worker (CLB 7 all four)', cec01: 'Canadian Experience Class, TEER 0 or 1 job (CLB 7)', cec23: 'Canadian Experience Class, TEER 2 or 3 job (CLB 5)', fst: 'Federal Skilled Trades (5 speaking/listening, 4 reading/writing)', french: 'Express Entry French-language category (NCLC 7 all four)', citizenship: 'Citizenship, ages 18 to 54 (CLB 4 listening and speaking)' },
  fr: { fsw: 'Travailleurs qualifiés (fédéral), NCLC 7 partout', cec01: 'Expérience canadienne, emploi FEER 0 ou 1 (NCLC 7)', cec23: 'Expérience canadienne, emploi FEER 2 ou 3 (NCLC 5)', fst: 'Métiers spécialisés (fédéral) : 5 à l’oral et à l’écoute, 4 en lecture et à l’écrit', french: 'Catégorie « compétences linguistiques en français » (NCLC 7 partout)', citizenship: 'Citoyenneté, de 18 à 54 ans (NCLC 4 à l’écoute et à l’oral)' },
};
export const clbName = (lang: Lang, french: boolean, lv: number) => {
  const tag = french ? 'NCLC' : 'CLB';
  return lv < 4 ? (lang === 'fr' ? `< ${tag} 4` : `below ${tag} 4`) : `${tag} ${lv}`;
};
export const sep = (lang: Lang) => (lang === 'fr' ? ' : ' : ': ');
