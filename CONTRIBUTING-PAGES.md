# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Model: `tef-canada-score.ts`. Every page exists in
English (`/en/<en.slug>/`) and Canadian French (`/fr/<fr.slug>/`); hreflang, menus, home lists and sitemap
follow by themselves.

## Fields

- `group`: `scores`, `practice`, `exam` or `france`; `order`: position in its group.
- `tool`: main tool under the H1. Kinds (see `src/components/Tool.astro`): `converter` {focus}, `crs`,
  `target` {level, tests}, `level` {program}, `quiz` {bank, mode practice|mock, test tef|tcf, level, theme},
  `writing` / `speaking` {task}, `calendar` {test}, `cost` {test}, `cefr` {mode}, `progress`, `mini:<spec>`.
- `mini`: always a `mini:<spec>` from `src/lib/mini-specs.ts` (RECETTE §9.3).
- In a body, `<!--tool:KIND|{json}-->` places a tool between paragraphs.
- `related`: 4 to 6 page ids; `sources`: keys of `src/data/params-2026.json` → `sources`.

## Text rules (checked by `npm run check`)

- `title` 50–60 characters, key term first; `description` 150–160; `resume(h)` one paragraph ≥ 130 words;
  `faqs(h)` 3–5 questions unique across the site, answers 40–90 words; `body(h)` ≥ 450 words with `<h2>`.
- No em dash. Canadian English; Canadian French with « guillemets ». Pages must read differently (check-unique).
- Links only to official sources (`h.src`) and internal pages (`h.a`). No school, centre, app or other prep site.

## Figures

Never type a chart value, threshold, count or delay: read it through `h.P` (params-2026.json), `h.range`,
`h.chart`, `h.bankSize`. A fact that is not on an official page (IRCC, CCI Paris Île-de-France, France
Éducation international, Légifrance / Service-Public.fr) is not written, or is marked unconfirmed.

## Data

- `src/data/params-2026.json`: charts, points, formats, delays, French levels and dated fee examples, each
  with its source and `retrieved_at`. Re-read the sources before changing a value.
- `src/data/questions/*.json`: banks written by Radif Partners (French reading and listening A1–C2, English
  reading and listening CLB 4–10). `npx vitest run` lints them. No official item is ever added.
- `data/textes-sources/` (not versioned): working copies of official texts, compared with the build by
  `scripts/check-copie.mjs`.
