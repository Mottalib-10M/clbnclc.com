/**
 * CRS points that depend on language, from CLB / NCLC levels typed directly: first and second
 * official language, spouse's language, French bonus and the two skill-transferability factors
 * that combine language with education or foreign work (CRS criteria, params-2026.json).
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { type Levels, SKILLS } from '../../lib/engine/clb';
import { firstLanguagePoints, secondLanguagePoints, spouseLanguagePoints, frenchBonus, transferPoints, type Education, type ForeignWork } from '../../lib/engine/crs';
import { SKILL_SHORT, type Lang } from '../../lib/tool-text';
import { formatNumberL } from '../../lib/format-l';

const T = {
  en: {
    firstLang: 'First official language', en: 'English', fr: 'French', firstLv: 'First language level', secondLv: 'Second language level', none: 'none',
    spouse: 'Spouse or partner coming', spouseLv: 'Spouse’s level (first language)', yes: 'Yes', no: 'No',
    edu: 'Your education', work: 'Foreign work experience',
    eduO: { none: 'Secondary school or less', oneYear: 'Post-secondary credential, 1 year or more', twoPlus: 'Two or more credentials, one of 3 years or more', masters: 'Master’s or entry-to-practice professional degree', phd: 'Doctoral degree' },
    workO: { none: 'None or under 1 year', oneTwo: '1 or 2 years', threePlus: '3 years or more' },
    head: 'Language-related CRS points', rows: { first: 'First official language', second: 'Second official language', spouse: 'Spouse’s language', bonus: 'French bonus', edu: 'Transferability: education + language', work: 'Transferability: foreign work + language' },
    note: 'Transferability also counts combinations without language (education or foreign work with Canadian experience): they are not included here.',
  },
  fr: {
    firstLang: 'Première langue officielle', en: 'Anglais', fr: 'Français', firstLv: 'Niveau en première langue', secondLv: 'Niveau en seconde langue', none: 'aucun',
    spouse: 'Époux ou conjoint qui accompagne', spouseLv: 'Niveau de l’époux (première langue)', yes: 'Oui', no: 'Non',
    edu: 'Vos études', work: 'Expérience de travail à l’étranger',
    eduO: { none: 'Secondaire ou moins', oneYear: 'Diplôme postsecondaire d’un an ou plus', twoPlus: 'Deux diplômes ou plus, dont un de 3 ans ou plus', masters: 'Maîtrise ou diplôme professionnel d’accès à la profession', phd: 'Doctorat' },
    workO: { none: 'Aucune ou moins d’un an', oneTwo: '1 ou 2 ans', threePlus: '3 ans ou plus' },
    head: 'Points du SCG liés à la langue', rows: { first: 'Première langue officielle', second: 'Seconde langue officielle', spouse: 'Langue de l’époux', bonus: 'Bonus francophone', edu: 'Transférabilité : études + langue', work: 'Transférabilité : travail à l’étranger + langue' },
    note: 'La transférabilité compte aussi des combinaisons sans la langue (études ou travail à l’étranger avec l’expérience canadienne) : elles ne sont pas incluses ici.',
  },
} as const;
const lvOptions = (lang: Lang, withNone = false) => [
  ...(withNone ? [{ value: '-1', label: T[lang].none }] : []),
  { value: '0', label: lang === 'fr' ? 'moins de 4' : 'below 4' },
  ...[4, 5, 6, 7, 8, 9, 10].map((n) => ({ value: String(n), label: n === 10 ? '10+' : String(n) })),
];

interface Props { lang?: Lang; idPrefix?: string; firstDefault?: number; frenchFirst?: boolean }
export default function CrsTool({ lang = 'en', idPrefix = 'crs', firstDefault = 7, frenchFirst = false }: Props) {
  const L = T[lang];
  const all = (n: number): Levels => ({ R: n, W: n, L: n, S: n });
  const [firstIs, setFirstIs] = useState<'en' | 'fr'>(frenchFirst ? 'fr' : 'en');
  const [first, setFirst] = useState<Levels>(all(firstDefault));
  const [second, setSecond] = useState<Levels | null>(null);
  const [spouse, setSpouse] = useState(false);
  const [sp, setSp] = useState<Levels>(all(5));
  const [edu, setEdu] = useState<Education>('oneYear');
  const [work, setWork] = useState<ForeignWork>('none');
  const enLv = firstIs === 'en' ? first : second, frLv = firstIs === 'fr' ? first : second;
  const tr = transferPoints(first, edu, work);
  const rows: Array<[string, number]> = [
    [L.rows.first, firstLanguagePoints(first, spouse)], [L.rows.second, secondLanguagePoints(second, spouse)],
    ...(spouse ? [[L.rows.spouse, spouseLanguagePoints(sp)] as [string, number]] : []),
    [L.rows.bonus, frenchBonus(frLv, enLv)], [L.rows.edu, tr.education], [L.rows.work, tr.foreign],
  ];
  const total = rows.reduce((s, [, v]) => s + v, 0);
  const grid = (val: Levels | null, set: (l: Levels | null) => void, pre: string, withNone = false) => (
    <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4">
      {SKILLS.map((k) => <SelectField key={k} id={`${idPrefix}-${pre}-${k}`} label={SKILL_SHORT[lang][k]} value={val ? String(val[k]) : '-1'} onChange={(v) => { const n = Number(v); if (n < 0) set(null); else set({ ...(val ?? all(0)), [k]: n }); }} options={lvOptions(lang, withNone)} />)}
    </div>
  );
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form className="grid content-start gap-4" onSubmit={(e) => e.preventDefault()}>
        <Toggle id={`${idPrefix}-fl`} label={L.firstLang} value={firstIs} onChange={(v) => setFirstIs(v as 'en' | 'fr')} options={[{ value: 'en', label: L.en }, { value: 'fr', label: L.fr }]} />
        <fieldset><legend className="mb-1 text-sm font-semibold text-navy-900">{L.firstLv}</legend>{grid(first, (l) => setFirst(l ?? all(0)), 'f')}</fieldset>
        <fieldset><legend className="mb-1 text-sm font-semibold text-navy-900">{L.secondLv}</legend>{grid(second, setSecond, 's', true)}</fieldset>
        <div className="grid gap-3 sm:grid-cols-2">
          <SelectField id={`${idPrefix}-edu`} label={L.edu} value={edu} onChange={(v) => setEdu(v as Education)} options={Object.entries(L.eduO).map(([value, label]) => ({ value, label }))} />
          <SelectField id={`${idPrefix}-work`} label={L.work} value={work} onChange={(v) => setWork(v as ForeignWork)} options={Object.entries(L.workO).map(([value, label]) => ({ value, label }))} />
        </div>
        <Toggle id={`${idPrefix}-sp`} label={L.spouse} value={spouse ? '1' : '0'} onChange={(v) => setSpouse(v === '1')} options={[{ value: '0', label: L.no }, { value: '1', label: L.yes }]} />
        {spouse && <fieldset><legend className="mb-1 text-sm font-semibold text-navy-900">{L.spouseLv}</legend>{grid(sp, (l) => setSp(l ?? all(0)), 'p')}</fieldset>}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{formatNumberL(total, lang)}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {rows.map(([l, v]) => <tr key={l}><td className="py-1.5 pr-2 text-navy-700">{l}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{formatNumberL(v, lang)}</td></tr>)}
        </tbody></table>
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
