"""Télécharge les polices Google Fonts et les héberge sur le site (aucune requête vers Google pour les visiteurs).
Usage : python3 tools/self-host-fonts.py   → crée fonts/fonts.css (site) et fonts/demos.css (maquettes) + les fichiers .woff2"""
import re, pathlib, urllib.request, hashlib
R = pathlib.Path(__file__).resolve().parent.parent; F = R / "fonts"; F.mkdir(exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}
SETS = {
  "fonts.css": ["Bricolage+Grotesque:opsz,wght@12..96,400..800", "Hanken+Grotesk:wght@400..800", "DM+Mono:wght@400;500", "Instrument+Serif:ital@0;1"],
  "demos.css": ["Anton", "Archivo+Black", "Barlow:wght@400;500;600;700", "Barlow+Condensed:wght@400;500;600;700", "Bebas+Neue",
                "Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500", "DM+Sans:wght@400;500;600;700", "Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,500",
                "Hanken+Grotesk:wght@400..800", "Inter:wght@400;500;600;700", "Oswald:wght@400;500;600;700", "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,500",
                "Plus+Jakarta+Sans:wght@400;500;600;700", "DM+Mono:wght@400;500"],
}
get = lambda u: urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30).read()
for out, fams in SETS.items():
    css = get("https://fonts.googleapis.com/css2?" + "&".join("family=" + f for f in fams) + "&display=swap").decode()
    blocks = re.findall(r"/\* ([a-z-]+) \*/\s*(@font-face \{.*?\})", css, re.S)
    keep = []
    for subset, b in blocks:
        if subset not in ("latin", "latin-ext"): continue
        url = re.search(r"url\((https://[^)]+)\)", b).group(1)
        fam = re.search(r"font-family: '([^']+)'", b).group(1)
        name = fam.lower().replace(" ", "-") + "-" + hashlib.sha1(url.encode()).hexdigest()[:10] + ".woff2"
        if not (F / name).exists(): (F / name).write_bytes(get(url))
        keep.append(f"/* {fam} — {subset} */\n" + b.replace(url, name))
    (F / out).write_text("/* Polices hébergées sur le site (copie de Google Fonts, licence SIL Open Font License). Générées par tools/self-host-fonts.py */\n" + "\n".join(keep) + "\n")
    print(out, len(keep), "faces")
