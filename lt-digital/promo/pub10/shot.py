"""Capture des images de la pub 10 à des instants précis + planche contact.
  python3 promo/pub10/shot.py PAGE T1 T2 ... --out /chemin/planche.png [--w 360]
  PAGE = pub10.html ou pub10-s05.html (dans promo/). Les instants sont en secondes (absolus).
Écrit aussi chaque image en .jpg à côté de la planche. Affiche les erreurs JavaScript de la page."""
import sys, subprocess, pathlib, json, os, tempfile
from PIL import Image, ImageDraw, ImageFont
args = sys.argv[1:]
out = pathlib.Path(args[args.index("--out") + 1]); W = int(args[args.index("--w") + 1]) if "--w" in args else 360
rest = [a for i, a in enumerate(args) if a not in ("--out", "--w") and (i == 0 or args[i - 1] not in ("--out", "--w"))]
page, times = rest[0], [float(x) for x in rest[1:]]
out.parent.mkdir(parents=True, exist_ok=True)
js = r"""
const { chromium } = require('playwright'); const [page, dir, ...ts] = process.argv.slice(2);
(async()=>{ const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}); const errs=[];
 const p = await b.newPage({viewport:{width:1080,height:1920}}); p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
 await p.goto('http://localhost:8123/promo/'+page+'?capture'); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1200);
 for (const t of ts) { await p.evaluate(t=>window.seek(t*1000), +t); await p.waitForTimeout(50); await p.screenshot({path:`${dir}/t${(+t).toFixed(2)}.jpg`, type:'jpeg', quality:80}); }
 console.log(JSON.stringify(errs)); await b.close(); })();
"""
tmp = pathlib.Path(tempfile.mkdtemp()); (tmp / "s.js").write_text(js)
env = dict(os.environ, NODE_PATH=subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip())
r = subprocess.run(["node", str(tmp / "s.js"), page, str(out.parent)] + [str(t) for t in times], capture_output=True, text=True, env=env)
print("erreurs JS :", r.stdout.strip() or r.stderr[-800:])
H = int(W * 1920 / 1080); cols = min(6, len(times)); rows = -(-len(times) // cols)
sheet = Image.new("RGB", (cols * (W + 8), rows * (H + 34)), "#222"); d = ImageDraw.Draw(sheet)
for k, t in enumerate(times):
    im = Image.open(out.parent / f"t{t:.2f}.jpg").resize((W, H)); x, y = (k % cols) * (W + 8), (k // cols) * (H + 34)
    sheet.paste(im, (x, y + 34)); d.text((x + 6, y + 8), f"t = {t:.2f} s", fill="#c8ff3e")
sheet.save(out); print("planche :", out)
