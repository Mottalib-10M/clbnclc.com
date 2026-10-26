#!/usr/bin/env python3
"""Contrôle anti-recopie du guide Discover Canada / Découvrir le Canada (droit d'auteur de la Couronne).

Échec dès qu'un texte du site partage N=8 mots consécutifs (ou plus) avec le guide.
Le guide n'est pas stocké dans le dépôt : seules des empreintes (BLAKE2, 12 hex) de ses
suites de 8 mots le sont, dans scripts/data/guide-ca-8grams.txt.

Usage :
  python3 scripts/check-copie-guide.py .                 # contrôle (banques CA + pages du dist)
  python3 scripts/check-copie-guide.py --build data/textes-sources   # régénère les empreintes (textes du guide, non versionnés)
                                                          # (fichiers en-*.txt et fr-*.txt)
"""
import glob, hashlib, html, json, os, re, sys, unicodedata

N = 8
HERE = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(HERE, 'data', 'guide-ca-8grams.txt')


def toks(s):
    # Même normalisation que scripts/check-copie.mjs (factory) : minuscules, accents retirés,
    # apostrophes et ponctuation traitées comme des espaces, chiffres gardés.
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c)).lower()
    return re.findall(r"[^\W_]+", s)


def h(gram):
    return hashlib.blake2b(' '.join(gram).encode(), digest_size=6).hexdigest()


def build(folder):
    out = set()
    files = sorted(glob.glob(os.path.join(folder, 'en*.txt')) + glob.glob(os.path.join(folder, 'fr*.txt')))
    for f in files:
        t = toks(open(f, encoding='utf-8', errors='ignore').read())
        for i in range(len(t) - N + 1):
            out.add(h(t[i:i + N]))
    os.makedirs(os.path.dirname(DB), exist_ok=True)
    with open(DB, 'w') as fh:
        fh.write('# Empreintes BLAKE2 (6 octets) des suites de %d mots du guide Discover Canada / Découvrir le Canada, %d fichiers source\n' % (N, len(files)))
        fh.write('\n'.join(sorted(out)) + '\n')
    print('empreintes :', len(out), 'depuis', len(files), 'fichiers')


def load():
    return {l.strip() for l in open(DB) if l.strip() and not l.startswith('#')}


# Titres du guide et de ses chapitres, et quelques noms officiels : on les cite pour nommer les chapitres (un titre n'est pas
# de la prose du guide). Ils coupent la recherche : aucune suite de 8 mots ne les traverse.
TITRES = [
    'Discover Canada', 'The Rights and Responsibilities of Citizenship', 'Rights and Responsibilities of Citizenship',
    'Who We Are', "Canada's History", 'Modern Canada', 'How Canadians Govern Themselves', 'Federal Elections',
    'The Justice System', 'Canadian Symbols', "Canada's Economy", "Canada's Regions",
    'Découvrir le Canada', 'Les droits et responsabilités liés à la citoyenneté', 'Qui sommes-nous',
    "L'histoire du Canada", 'Le Canada moderne', 'Le mode de gouvernement canadien',
    'Les Canadiens et leur système de gouvernement', 'Les élections fédérales', 'Le système judiciaire',
    'Le système de justice', 'Les symboles canadiens', "L'économie canadienne", 'Les régions du Canada',
    # Noms propres (loi, compagnie) : un nom officiel n'est pas de la prose du guide.
    "Acte de l'Amérique du Nord britannique", "Compagnie de la Baie d'Hudson",
]
TITRES_T = sorted((toks(x) for x in TITRES), key=len, reverse=True)


def segments(t):
    """Découpe la suite de mots aux titres de chapitre (retirés)."""
    out, cur, i = [], [], 0
    while i < len(t):
        for tt in TITRES_T:
            if t[i:i + len(tt)] == tt:
                out.append(cur); cur = []; i += len(tt); break
        else:
            cur.append(t[i]); i += 1
    out.append(cur)
    return out


def spans(text, S):
    res = []
    for seg in segments(toks(text)):
        res += _spans(seg, S)
    return res


def _spans(t, S):
    hit = [h(t[i:i + N]) in S for i in range(len(t) - N + 1)]
    res, i = [], 0
    while i < len(hit):
        if hit[i]:
            j = i
            while j + 1 < len(hit) and hit[j + 1]:
                j += 1
            res.append(' '.join(t[i:j + N]))
            i = j + 1
        else:
            i += 1
    return res


def strip_html(s):
    s = re.sub(r'(?is)<(script|style|noscript)[^>]*>.*?</\1>', ' ', s)
    s = re.sub(r'(?s)<[^>]+>', ' ', s)
    return html.unescape(s)


def main(root):
    S = load()
    fails = []
    for f in sorted(glob.glob(os.path.join(root, 'src/data/questions/ca-*.json'))):
        for q in json.load(open(f, encoding='utf-8'))['questions']:
            for fld in ('q', 'explain'):
                for sp in spans(q.get(fld, ''), S):
                    fails.append('%s %s.%s : « %s »' % (os.path.basename(f), q['id'], fld, sp))
            for k, o in enumerate(q.get('options', [])):
                for sp in spans(o, S):
                    fails.append('%s %s.options[%d] : « %s »' % (os.path.basename(f), q['id'], k, sp))
    dist = os.path.join(root, 'dist')
    for f in sorted(glob.glob(os.path.join(dist, '**/*.html'), recursive=True)):
        for sp in spans(strip_html(open(f, encoding='utf-8', errors='ignore').read()), S):
            fails.append('%s : « %s »' % (os.path.relpath(f, root), sp))
    if fails:
        print('check-copie-guide : %d passage(s) de %d mots ou plus recopié(s) du guide Discover Canada / Découvrir le Canada' % (len(fails), N))
        for x in fails:
            print('  ' + x)
        sys.exit(1)
    print('check-copie-guide : 0 passage de %d mots consécutifs repris du guide (banques CA + %s)' % (N, 'dist' if os.path.isdir(dist) else 'pas de dist'))


if __name__ == '__main__':
    if len(sys.argv) > 2 and sys.argv[1] == '--build':
        build(sys.argv[2])
    else:
        main(sys.argv[1] if len(sys.argv) > 1 else '.')
