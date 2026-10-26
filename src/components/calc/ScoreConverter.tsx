/**
 * Main tool: TEF Canada, TCF Canada, CELPIP-General, IELTS General Training or PTE Core scores →
 * CLB / NCLC level per skill (IRCC charts) → Express Entry language points and French bonus (CRS
 * criteria), with the programmes whose language minimum is met. First render = build defaults
 * (RECETTE §17.5). Nothing typed here leaves the browser.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { type Levels, type Scores, type Skill, type TestId, SKILLS, levelsOf, levelOf, maxScore, isValidScore, minLevel, isFrench } from '../../lib/engine/clb';
import { languageCrs, programChecks } from '../../lib/engine/crs';
import { SKILL, TEST, PROGRAM, clbName, type Lang } from '../../lib/tool-text';
import { formatNumberL } from '../../lib/format-l';

const T = {
  en: {
    fr: 'French test', en: 'English test', none: 'No test', spouse: 'Spouse or partner coming with you',
    yes: 'Yes', no: 'No', head: 'Express Entry language points', levels: 'Level per skill',
    first: 'First official language', second: 'Second official language', bonus: 'French bonus', total: 'Language points (sections A and D)',
    firstIs: (x: string) => `Best choice of first official language: ${x}.`, english: 'English', french: 'French',
    programs: 'Language minimum met?', ok: 'Met', ko: 'Not met', invalid: 'Score outside the scale of this test',
    note: 'Points from language only: age, education, work experience and the rest of the CRS are not counted here. Charts and points read on canada.ca.',
    extra: 'Above NCLC 10 on the CCI table',
  },
  fr: {
    fr: 'Test de français', en: 'Test d’anglais', none: 'Aucun test', spouse: 'Époux ou conjoint qui vous accompagne',
    yes: 'Oui', no: 'Non', head: 'Points de langue d’Entrée express', levels: 'Niveau par épreuve',
    first: 'Première langue officielle', second: 'Seconde langue officielle', bonus: 'Bonus francophone', total: 'Points de langue (sections A et D)',
    firstIs: (x: string) => `Meilleur choix de première langue officielle : ${x}.`, english: 'l’anglais', french: 'le français',
    programs: 'Minimum linguistique atteint ?', ok: 'Atteint', ko: 'Non atteint', invalid: 'Score hors de l’échelle de ce test',
    note: 'Points liés à la langue seulement : âge, études, expérience et le reste du SCG ne sont pas comptés ici. Grilles et points relevés sur canada.ca.',
    extra: 'Au-delà de NCLC 10 dans la grille de la CCI',
  },
} as const;

export type Focus = 'all' | 'tef' | 'tcf' | 'celpip' | 'ielts' | 'pte' | 'tefOld' | 'tef2019';
const DEF: Record<string, Scores> = {
  tef: { R: 450, W: 440, L: 470, S: 460 }, tef2019: { R: 455, W: 452, L: 470, S: 460 }, tefOld: { R: 215, W: 320, L: 260, S: 330 },
  tcf: { R: 460, W: 10, L: 470, S: 11 }, celpip: { R: 8, W: 7, L: 9, S: 7 }, ielts: { R: 6.5, W: 6.0, L: 7.5, S: 6.5 }, pte: { R: 70, W: 72, L: 75, S: 70 },
};
const presets = (f: Focus): [TestId | '', TestId | ''] => {
  if (f === 'tef' || f === 'tcf' || f === 'tefOld' || f === 'tef2019') return [f, ''];
  if (f === 'celpip' || f === 'ielts' || f === 'pte') return ['', f];
  return ['tef', 'celpip'];
};

interface Props { lang?: Lang; focus?: Focus; idPrefix?: string }
export default function ScoreConverter({ lang = 'en', focus = 'all', idPrefix = 'sc' }: Props) {
  const L = T[lang];
  const tag = lang === 'fr' ? 'fr-CA' : 'en-CA';
  const [p0, p1] = presets(focus);
  const [frTest, setFrTest] = useState<TestId | ''>(p0);
  const [enTest, setEnTest] = useState<TestId | ''>(p1);
  const [frS, setFrS] = useState<Scores>(DEF[p0 || 'tef']);
  const [enS, setEnS] = useState<Scores>(DEF[p1 || 'celpip']);
  const [spouse, setSpouse] = useState(false);

  const pickFr = (t: string) => { setFrTest(t as TestId | ''); if (t) setFrS(DEF[t]); };
  const pickEn = (t: string) => { setEnTest(t as TestId | ''); if (t) setEnS(DEF[t]); };
  const valid = (t: TestId | '', s: Scores) => !!t && SKILLS.every((k) => isValidScore(t, k, s[k]));
  const fr: Levels | null = frTest && valid(frTest, frS) ? levelsOf(frTest, frS) : null;
  const en: Levels | null = enTest && valid(enTest, enS) ? levelsOf(enTest, enS) : null;
  const crs = useMemo(() => languageCrs(en, fr, { withSpouse: spouse }), [en?.R, en?.W, en?.L, en?.S, fr?.R, fr?.W, fr?.L, fr?.S, spouse]);
  const first = crs.firstIs === 'fr' ? fr : en;
  const best = [en, fr].filter((x): x is Levels => !!x).sort((a, b) => minLevel(b) - minLevel(a))[0] ?? null;
  const checks = programChecks(first ?? best, fr).map((c) => (c.id === 'citizenship' ? { ...c, ok: [en, fr].some((l) => !!l && l.L >= 4 && l.S >= 4) } : c));
  const n = (x: number) => formatNumberL(x, lang);

  const fields = (t: TestId, s: Scores, set: (x: Scores) => void, pre: string) => (
    <div className="grid grid-cols-2 gap-x-3 gap-y-2">
      {SKILLS.map((k) => (
        <div key={k}>
          <NumberField id={`${idPrefix}-${pre}-${k}`} label={SKILL[lang][k]} value={s[k]} onChange={(v) => set({ ...s, [k]: v })} max={maxScore(t, k)} unit={`/ ${maxScore(t, k)}`} decimals={t === 'ielts' ? 1 : 0} tag={tag} />
          {!isValidScore(t, k, s[k]) && <p className="mt-1 text-xs font-medium text-amber-700">{L.invalid}</p>}
        </div>
      ))}
    </div>
  );
  const levelRow = (t: TestId | '', s: Scores, lv: Levels | null) => t && lv ? (
    <tr><td className="py-1.5 pr-2 align-top text-navy-700">{TEST[lang][t as TestId]}</td>
      <td className="py-1.5 text-right text-navy-900">{SKILLS.map((k) => {
        const raw = t === 'tef' ? levelOf(t, k, s[k], false) : lv[k];
        return <span key={k} className="block tabular-nums">{SKILL[lang][k]}{lang === 'fr' ? ' : ' : ': '}<strong>{clbName(lang, isFrench(t as TestId), raw)}</strong></span>;
      })}</td></tr>
  ) : null;

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="rounded-xl border border-navy-200 bg-white p-4">
          <SelectField id={`${idPrefix}-frt`} label={L.fr} value={frTest} onChange={pickFr} options={[{ value: '', label: L.none }, ...(['tef', 'tef2019', 'tefOld', 'tcf'] as TestId[]).map((x) => ({ value: x, label: TEST[lang][x] }))]} />
          {frTest && <div className="mt-3">{fields(frTest, frS, setFrS, 'fr')}</div>}
        </div>
        <div className="rounded-xl border border-navy-200 bg-white p-4">
          <SelectField id={`${idPrefix}-ent`} label={L.en} value={enTest} onChange={pickEn} options={[{ value: '', label: L.none }, ...(['celpip', 'ielts', 'pte'] as TestId[]).map((x) => ({ value: x, label: TEST[lang][x] }))]} />
          {enTest && <div className="mt-3">{fields(enTest, enS, setEnS, 'en')}</div>}
        </div>
        <Toggle id={`${idPrefix}-sp`} label={L.spouse} value={spouse ? '1' : '0'} onChange={(v) => setSpouse(v === '1')} options={[{ value: '0', label: L.no }, { value: '1', label: L.yes }]} />
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{n(crs.first + crs.second + crs.bonus)}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.first}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{n(crs.first)}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.second}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{n(crs.second)}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.bonus}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{n(crs.bonus)}</td></tr>
        </tbody></table>
        {en && fr && <p className="mt-2 text-xs text-navy-700">{L.firstIs(crs.firstIs === 'fr' ? L.french : L.english)}</p>}
        <p className="mt-4 text-sm font-semibold text-navy-900">{L.levels}</p>
        <table className="mt-1 w-full text-sm"><tbody className="divide-y divide-navy-200">{levelRow(frTest, frS, fr)}{levelRow(enTest, enS, en)}</tbody></table>
        <p className="mt-4 text-sm font-semibold text-navy-900">{L.programs}</p>
        <ul className="mt-1 space-y-1 text-xs">
          {checks.map((c) => <li key={c.id} className="flex justify-between gap-2"><span className="text-navy-700">{PROGRAM[lang][c.id]}</span><span className={`shrink-0 font-semibold ${c.ok ? 'text-green-800' : 'text-red-700'}`}>{c.ok ? L.ok : L.ko}</span></li>)}
        </ul>
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
