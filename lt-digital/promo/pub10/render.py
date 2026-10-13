"""Rendu final de la pub 10 : images (30 i/s) → MP4 1080×1920 avec la musique.
  python3 promo/pub10/render.py SORTIE.mp4 [--audio musique.wav] [--workers 3] [--frames DOSSIER]"""
import sys, subprocess, pathlib, os, tempfile
a = sys.argv[1:]; out = a[0]
audio = a[a.index("--audio") + 1] if "--audio" in a else None
W = int(a[a.index("--workers") + 1]) if "--workers" in a else 3
fr = pathlib.Path(a[a.index("--frames") + 1]) if "--frames" in a else pathlib.Path(tempfile.mkdtemp())
fr.mkdir(parents=True, exist_ok=True); FPS, DUR = 30, 24
js = r"""
const { chromium } = require('playwright'); const [dir, w, nw, N] = process.argv.slice(2).map((x,i)=>i?+x:x);
(async()=>{ const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p = await b.newPage({viewport:{width:1080,height:1920}});
 await p.goto('http://localhost:8123/promo/pub10.html?capture'); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1500);
 for (let i=w;i<N;i+=nw){ await p.evaluate(t=>window.seek(t), i*1000/30); await p.screenshot({path:`${dir}/${String(i).padStart(4,'0')}.jpg`, type:'jpeg', quality:93}); }
 await b.close(); })();
"""
tmp = pathlib.Path(tempfile.mkdtemp()); (tmp / "r.js").write_text(js)
env = dict(os.environ, NODE_PATH=subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip())
procs = [subprocess.Popen(["node", str(tmp / "r.js"), str(fr), str(w), str(W), str(FPS * DUR)], env=env) for w in range(W)]
for p in procs: p.wait()
cmd = ["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", str(fr / "%04d.jpg")]
if audio: cmd += ["-i", audio, "-c:a", "aac", "-b:a", "192k"]
cmd += ["-c:v", "libx264", "-crf", "17", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-t", str(DUR), out]
subprocess.run(cmd, check=True); print("ok", out)
