/**
 * One page = ONE data file in `src/content/pages/<id>.ts`, with an English and a French version
 * (every indexable page exists in both). How to add a page: CONTRIBUTING-PAGES.md.
 */
import type { Helpers } from './helpers';

export type Lang = 'en' | 'fr';
/** Section of a page: menus, footer and home lists follow it. */
export type Group = 'scores' | 'practice' | 'exam' | 'france';
export interface FAQ { q: string; a: string }
/** Tool kinds and props: see components/Tool.astro (converter, crs, target, level, quiz, writing,
 *  speaking, calendar, cost, cefr, progress, mini:<spec> from lib/mini-specs.ts). */
export interface ToolDef { kind: string; props?: Record<string, string | number | boolean | string[]> }
export interface PageText {
  /** Path after /en/ or /fr/, without slashes at the ends; no slash inside. */
  slug: string; nav: string; card: string;
  /** 50–60 characters, key term first (RECETTE §11). */
  title: string;
  /** 150–160 characters. */
  description: string;
  h1: string; intro: string;
  /** Citable block, one paragraph of 120 words or more (RECETTE §21), folded after its first sentence. */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  /** HTML; `<!--tool:mini:spec-->` or `<!--tool:quiz|{"bank":"fr-listening","mode":"mock","test":"tef"}-->` places a tool in the body. */
  body: (h: Helpers) => string;
}
export interface PageDef {
  id: string; group: Group; order: number;
  tool?: ToolDef; mini?: ToolDef;
  related: string[];
  /** Keys of `data/params-2026.json` sources. */
  sources: string[];
  en: PageText; fr: PageText;
}
export const definePage = (g: PageDef): PageDef => g;
