/**
 * TEF or TCF score → CEFR level per skill (CCI and France Éducation international bands), and for
 * the TEF IRN the overall level by the CCI rule, compared with the levels France asks since
 * 1 January 2026 (A2 multi-year card, B1 resident card, B2 naturalisation).
 */
import { useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { type Scores, SKILLS, cefrOf, tefIrnLevel } from '../../lib/engine/clb';
import { SKILL, type Lang } from '../../lib/tool-text';
import P from '../../data/params-2026.json';

type Mode = 'tef' | 'irn' | 'tcf';
const ORDER = ['<A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const T = {
  en: { test: 'Test', modes: { tef: 'TEF (Canada, Québec…), 0 to 699', irn: 'TEF IRN (France), up to B2', tcf: 'TCF (reading and listening 100–699, writing and speaking out of 20)' }, head: 'Level per skill', overall: 'TEF IRN overall level', uses: 'For France (from Jan. 1, 2026)', pluri: 'Multi-year card (A2)', res: 'Resident card (B1)', nat: 'Naturalisation (B2)', yes: 'Level reached', no: 'Not reached', perSkill: 'Level per skill only: the overall level is the one printed on your TCF attestation.', note: 'Bands from the CCI correspondence table (TEF) and the TCF candidate manual. TEF IRN overall level: three tests at the threshold and the weakest one at the lower threshold.' },
  fr: { test: 'Test', modes: { tef: 'TEF (Canada, Québec…), de 0 à 699', irn: 'TEF IRN (France), jusqu’à B2', tcf: 'TCF (compréhensions de 100 à 699, expressions sur 20)' }, head: 'Niveau par épreuve', overall: 'Niveau global au TEF IRN', uses: 'Pour la France (depuis le 1er janvier 2026)', pluri: 'Carte pluriannuelle (A2)', res: 'Carte de résident (B1)', nat: 'Naturalisation (B2)', yes: 'Niveau atteint', no: 'Non atteint', perSkill: 'Niveau par épreuve seulement : le niveau global est celui inscrit sur votre attestation TCF.', note: 'Bandes de la grille de correspondance de la CCI (TEF) et du manuel du candidat TCF. Niveau global du TEF IRN : trois épreuves au seuil et la moins réussie au seuil inférieur.' },
} as const;
const DEF: Record<Mode, Scores> = { tef: { R: 420, W: 390, L: 450, S: 410 }, irn: { R: 410, W: 380, L: 430, S: 405 }, tcf: { R: 420, W: 9, L: 440, S: 11 } };

interface Props { lang?: Lang; mode?: Mode; idPrefix?: string }
export default function CefrTool({ lang = 'en', mode: m0 = 'tef', idPrefix = 'ce' }: Props) {
  const L = T[lang];
  const tag = lang === 'fr' ? 'fr-CA' : 'en-CA';
  const [mode, setMode] = useState<Mode>(m0);
  const [s, setS] = useState<Scores>(DEF[m0]);
  const of20 = (k: string) => mode === 'tcf' && (k === 'W' || k === 'S');
  const lv = (k: 'R' | 'W' | 'L' | 'S') => {
    const x = cefrOf(mode === 'tcf' ? 'tcf' : 'tef', s[k], of20(k));
    return mode === 'irn' && ORDER.indexOf(x) > ORDER.indexOf('B2') ? 'B2' : x;
  };
  const overall = mode === 'irn' ? tefIrnLevel(s) : null;
  const reached = (need: string) => !!overall && ORDER.indexOf(overall) >= ORDER.indexOf(need);
  const F = P.france;
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form className="grid content-start gap-3" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-m`} label={L.test} value={mode} onChange={(v) => { setMode(v as Mode); setS(DEF[v as Mode]); }} options={(['tef', 'irn', 'tcf'] as Mode[]).map((x) => ({ value: x, label: L.modes[x] }))} />
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {SKILLS.map((k) => <NumberField key={k} id={`${idPrefix}-${k}`} label={SKILL[lang][k]} value={s[k]} onChange={(v) => setS({ ...s, [k]: v })} max={of20(k) ? 20 : 699} unit={of20(k) ? '/ 20' : '/ 699'} tag={tag} />)}
        </div>
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{overall ? L.overall : L.head}</p>
        <p className="mt-1 text-4xl font-bold text-navy-900">{overall ?? SKILLS.map((k) => lv(k)).join(' · ')}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {SKILLS.map((k) => <tr key={k}><td className="py-1.5 pr-2 text-navy-700">{SKILL[lang][k]}</td><td className="py-1.5 text-right font-semibold text-navy-900">{lv(k)}</td></tr>)}
        </tbody></table>
        {overall && (
          <><p className="mt-3 text-sm font-semibold text-navy-900">{L.uses}</p>
            <ul className="mt-1 space-y-1 text-xs">{([[L.pluri, F.pluri], [L.res, F.resident], [L.nat, F.naturalisation]] as Array<[string, string]>).map(([a, need]) => <li key={a} className="flex justify-between gap-2"><span className="text-navy-700">{a}</span><span className={`font-semibold ${reached(need) ? 'text-green-800' : 'text-red-700'}`}>{reached(need) ? L.yes : L.no}</span></li>)}</ul></>
        )}
        {mode === 'tcf' && <p className="mt-2 text-xs text-navy-700">{L.perSkill}</p>}
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
