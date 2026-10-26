/**
 * "Which level do I need?": programme → minimum level per skill, then the lowest score that reaches
 * it on each test. Canadian programmes from IRCC pages, French residence cards and naturalisation
 * from the orders of 22 December 2025 and Service-Public.fr (params-2026.json).
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import P from '../../data/params-2026.json';
import { type Skill, type TestId, SKILLS, minScoreFor } from '../../lib/engine/clb';
import { SKILL_SHORT, TEST, type Lang } from '../../lib/tool-text';
import { formatNumberL } from '../../lib/format-l';

type Need = { kind: 'clb'; need: Partial<Record<Skill, number>>; tests: TestId[] } | { kind: 'cefr'; level: 'A2' | 'B1' | 'B2' };
const E = P.ee, F = P.france;
const all = (n: number) => ({ R: n, W: n, L: n, S: n });
const NEEDS: Record<string, Need> = {
  fsw: { kind: 'clb', need: all(E.fsw), tests: ['tef', 'tcf', 'celpip', 'ielts', 'pte'] },
  cec01: { kind: 'clb', need: all(E.cecTeer01), tests: ['tef', 'tcf', 'celpip', 'ielts', 'pte'] },
  cec23: { kind: 'clb', need: all(E.cecTeer23), tests: ['tef', 'tcf', 'celpip', 'ielts', 'pte'] },
  fst: { kind: 'clb', need: E.fst, tests: ['tef', 'tcf', 'celpip', 'ielts', 'pte'] },
  french: { kind: 'clb', need: all(E.frenchCategory), tests: ['tef', 'tcf'] },
  citizenship: { kind: 'clb', need: { L: P.citizenship.clb, S: P.citizenship.clb }, tests: ['tef', 'tcf', 'celpip', 'ielts', 'pte'] },
  frPluri: { kind: 'cefr', level: F.pluri as 'A2' },
  frResident: { kind: 'cefr', level: F.resident as 'B1' },
  frNat: { kind: 'cefr', level: F.naturalisation as 'B2' },
};
const T = {
  en: {
    program: 'What the test is for', head: 'Minimum level', skill: 'Skill', level: 'Level',
    names: { fsw: 'Express Entry: Federal Skilled Worker', cec01: 'Express Entry: Canadian Experience, TEER 0 or 1', cec23: 'Express Entry: Canadian Experience, TEER 2 or 3', fst: 'Express Entry: Federal Skilled Trades', french: 'Express Entry: French-language category', citizenship: 'Canadian citizenship (18 to 54)', frPluri: 'France: first multi-year residence card', frResident: 'France: first 10-year resident card', frNat: 'France: naturalisation' } as Record<string, string>,
    cefrHead: (lv: string) => `Overall CEFR level ${lv}, written and oral skills`, cefrRows: (lv: string, tef: string) => [['TEF IRN', `overall level ${lv}: ${tef}`], ['TCF IRN', `level ${lv} printed on the attestation (scoring rules set by France Éducation international)`]] as Array<[string, string]>,
    tefRule: (a: number, b: number) => `${a} or more on three tests and ${b} or more on the weakest`,
    notSkill: 'not required', note: 'Results must be less than two years old (IRCC for Express Entry; French orders for residence cards and naturalisation). Provincial programmes set their own levels.',
  },
  fr: {
    program: 'À quoi sert le test', head: 'Niveau minimum', skill: 'Épreuve', level: 'Niveau',
    names: { fsw: 'Entrée express : travailleurs qualifiés (fédéral)', cec01: 'Entrée express : expérience canadienne, FEER 0 ou 1', cec23: 'Entrée express : expérience canadienne, FEER 2 ou 3', fst: 'Entrée express : métiers spécialisés (fédéral)', french: 'Entrée express : catégorie français', citizenship: 'Citoyenneté canadienne (18 à 54 ans)', frPluri: 'France : première carte pluriannuelle', frResident: 'France : première carte de résident', frNat: 'France : naturalisation' } as Record<string, string>,
    cefrHead: (lv: string) => `Niveau global ${lv} du CECR, à l’écrit et à l’oral`, cefrRows: (lv: string, tef: string) => [['TEF IRN', `niveau global ${lv} : ${tef}`], ['TCF IRN', `niveau ${lv} inscrit sur l’attestation (règles de notation fixées par France Éducation international)`]] as Array<[string, string]>,
    tefRule: (a: number, b: number) => `${a} ou plus à trois épreuves et ${b} ou plus à la moins réussie`,
    notSkill: 'non exigé', note: 'Résultats de moins de deux ans (IRCC pour Entrée express ; arrêtés français pour les titres et la naturalisation). Les programmes provinciaux fixent leurs propres niveaux.',
  },
} as const;

interface Props { lang?: Lang; program?: string; idPrefix?: string }
export default function LevelNeeded({ lang = 'en', program: p0 = 'fsw', idPrefix = 'ln' }: Props) {
  const L = T[lang];
  const [program, setProgram] = useState(p0);
  const need = NEEDS[program];
  const n = (x: number, t: TestId) => formatNumberL(x, lang, t === 'ielts' ? 1 : 0);
  let body;
  if (need.kind === 'clb') {
    body = (
      <table className="mt-2 w-full min-w-[520px] text-sm">
        <thead><tr><th scope="col" className="py-1.5 pr-2 text-left text-navy-700">{L.skill}</th><th scope="col" className="py-1.5 text-right text-navy-700">{L.level}</th>{need.tests.map((t) => <th key={t} scope="col" className="py-1.5 text-right text-navy-700">{TEST[lang][t].split(' (')[0]}</th>)}</tr></thead>
        <tbody className="divide-y divide-navy-200">{SKILLS.map((k) => { const lv = need.need[k]; return (
          <tr key={k}><td className="py-1.5 pr-2 text-navy-800">{SKILL_SHORT[lang][k]}</td><td className="tabular-nums py-1.5 text-right font-semibold text-navy-900">{lv ?? L.notSkill}</td>
            {need.tests.map((t) => { const m = lv ? minScoreFor(t, k, lv) : null; return <td key={t} className="tabular-nums py-1.5 text-right text-navy-900">{m != null ? n(m, t) : '–'}</td>; })}</tr>); })}</tbody>
      </table>
    );
  } else {
    const row = (P.tef.irn.levels as Array<[string, number, number]>).find(([lv]) => lv === need.level)!;
    body = (
      <>
        <p className="mt-1 text-sm text-navy-800">{L.cefrHead(need.level)}</p>
        <table className="mt-2 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {L.cefrRows(need.level, L.tefRule(row[1], row[2])).map(([a, b]) => <tr key={a}><td className="py-1.5 pr-2 text-navy-700">{a}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{b}</td></tr>)}
        </tbody></table>
      </>
    );
  }
  return (
    <div className="not-prose grid gap-4">
      <form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-p`} label={L.program} value={program} onChange={setProgram} options={Object.keys(NEEDS).map((k) => ({ value: k, label: L.names[k] }))} />
      </form>
      <div data-resultat aria-live="polite" className="overflow-x-auto rounded-xl border border-accent-200 bg-accent-50/60 p-4">
        <p className="text-sm font-semibold text-navy-900">{L.head} · {L.names[program]}</p>
        {body}
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
