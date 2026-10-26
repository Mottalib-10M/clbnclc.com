#!/usr/bin/env python3
"""Écrit public/llms.txt à partir du build (dist/) : nom, résumé du site et liste des pages
indexables (titre, URL, description), anglais puis français. À relancer après un `npm run build`
quand des pages changent, puis reconstruire pour que le fichier parte avec le site."""
import html, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')
cfg = open(os.path.join(ROOT, 'src', 'data', 'site-config.ts'), encoding='utf-8').read()
SITE = re.search(r'SITE_URL = "([^"]+)"', cfg).group(1)
pages = {'en': [], 'fr': []}
for d, _, files in os.walk(DIST):
    if 'index.html' not in files:
        continue
    rel = '/' + os.path.relpath(d, DIST).replace(os.sep, '/') + '/'
    if rel in ('/./',) or rel.startswith('/embed/'):
        continue
    doc = open(os.path.join(d, 'index.html'), encoding='utf-8').read()
    if re.search(r'<meta name="robots" content="[^"]*noindex', doc):
        continue
    t = re.search(r'<title>(.*?)</title>', doc, re.S)
    m = re.search(r'<meta name="description" content="([^"]*)"', doc)
    lang = rel.split('/')[1]
    if lang in pages and t:
        pages[lang].append((html.unescape(t.group(1)).strip(), SITE + rel, html.unescape(m.group(1)) if m else ''))
if not pages['en']:
    sys.exit('dist/ vide : lancer npm run build d’abord')
out = ['# Canadian Citizenship Quiz', '',
       '> Free practice for the Canadian citizenship test (20 questions, 45 minutes, 15 correct answers to pass, as published by IRCC), with every answer explained, in English and in Canadian French, plus a day-by-day count of the 1,095 days of physical presence, IRCC fees and each step from the application to the oath. Independent site published by Radif Partners, not IRCC. Questions written from the facts of Discover Canada; rules and fees read on canada.ca and dated in one parameter file.', '']
for lang, head in (('en', '## Pages in English'), ('fr', '## Pages en français')):
    out += [head, ''] + [f'- [{t}]({u}): {d}' for t, u, d in sorted(pages[lang], key=lambda x: x[1])] + ['']
open(os.path.join(ROOT, 'public', 'llms.txt'), 'w', encoding='utf-8').write('\n'.join(out))
print('llms.txt :', len(pages['en']), 'pages en,', len(pages['fr']), 'pages fr')
