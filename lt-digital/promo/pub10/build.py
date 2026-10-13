"""Assemble la pub 10.
  python3 promo/pub10/build.py            → promo/pub10.html (toutes les scènes)
  python3 promo/pub10/build.py --only 05  → promo/pub10-s05.html (seulement la scène 05, pour la tester)
Chaque scène NN (01→12) = sNN.html (obligatoire) + sNN.css + sNN.js (facultatifs). fx.* = couche globale (transitions)."""
import sys, pathlib, re
D = pathlib.Path(__file__).resolve().parent
P = D.parent
only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
read = lambda f: (D / f).read_text(encoding="utf-8") if (D / f).exists() else ""
scenes = sorted(p.stem for p in D.glob("s[0-9][0-9].html"))
if only: scenes = [s for s in scenes if s == "s" + only.zfill(2)]
parts = scenes + ([] if only and "--fx" not in sys.argv else ["fx"])
css = read("base.css") + "\n".join(f"/* ---- {s} ---- */\n" + read(s + ".css") for s in parts)
html = "\n".join(f"<!-- ---- {s} ---- -->\n" + read(s + ".html") for s in parts)
js = "\n".join(f"/* ---- {s} ---- */\n(function(){{\n{read(s + '.js')}\n}})();" for s in parts if read(s + ".js"))
page = f"""<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>L&amp;T Digital — Pub 10</title><meta name="robots" content="noindex"><link rel="icon" href="../images/logo-small.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..900&family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
{css}
</style></head>
<body>
<div class="viewport" id="vp">
{html}
</div>
<button class="ui" id="replay">Rejouer</button>
<script>
{read("runtime.js")}
{js}
{read("boot.js")}
</script>
</body></html>
"""
out = P / (f"pub10-{scenes[0]}.html" if only else "pub10.html")
out.write_text(page, encoding="utf-8"); print("ok", out, len(page), "octets")
