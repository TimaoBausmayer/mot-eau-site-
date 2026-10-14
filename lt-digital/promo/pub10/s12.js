/* Scène 12 (22 → 24,1 s) — CTA final. Le texte est posé par CSS (délais absolus) ; le décor vivant
   (bokeh, onde du dernier coup) est redessiné par onSeek(t) à partir de t seul. */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const sstep = x => { x = clamp(x); return x * x * (3 - 2 * x); };
const TAU = Math.PI * 2;

/* ---------- textes ---------- */
split($("#s12-title"), 22.0, .025);                     // « ÉCRIS-NOUS » se tasse lettre à lettre
const hs = split($("#s12-handle"), 21.6, .02);           // même découpe ET mêmes animations que S11 (finies avant 22,0) : rendu au pixel près
hs[2].classList.add("s12-dotCh");                        // le « . » reste transparent : le disque lime prend sa place
/* copies du reflet : découpées à l’identique (mêmes animations, finies avant 23,0) */
split($("#s12-titleG"), 22.0, .025);
split($("#s12-handleG"), 21.6, .02)[2].classList.add("s12-dotCh");

/* ---------- bokeh : 40 disques, mkRnd(1212) ---------- */
const cv = $("#s12-bokeh"), g = cv.getContext("2d");
const R = mkRnd(1212);
const COLS = [[200, 255, 62], [143, 162, 255], [124, 92, 255]];
const B = [];
for (let i = 0; i < 40; i++) {
  const d = 40 + R() * 140, k = (d - 40) / 140;          // k : 0 = petit / net, 1 = gros / flou (plus proche)
  B.push({
    x: -60 + R() * 1200, y: -80 + R() * 2080, r: d / 2,
    c: COLS[[0, 1, 1, 2, 2][Math.floor(R() * 5)]],          // lime plus rare : la pilule reste le seul aplat lime
    a: clamp(.18 - .1 * k + (R() - .5) * .04, .06, .18),
    v: 20 + 40 * clamp(k * .8 + R() * .2),               // les gros montent plus vite (parallaxe)
    ph: R() * TAU, sw: 4 + R() * 10, f: .9 + R() * .8, edge: .1 + .32 * k + R() * .06   // bord : net (petits) → doux (gros)
  });
}
const drawBokeh = t => {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = "source-over";
  g.clearRect(0, 0, 1080, 1920);
  const tau = t - 22;
  if (tau < 0 || tau >= 2.1) return;
  const fade = sstep(tau / .3);
  g.globalCompositeOperation = "lighter";
  for (const p of B) {
    const x = p.x + p.sw * Math.sin(p.ph + tau * p.f * 1.6);
    const y = p.y - p.v * tau;
    const a = p.a * fade, [cr, cg, cb] = p.c, col = `${cr},${cg},${cb}`;
    const gr = g.createRadialGradient(x, y, 0, x, y, p.r);
    gr.addColorStop(0, `rgba(${col},${(a * .55).toFixed(4)})`);
    gr.addColorStop(.62 * (1 - p.edge), `rgba(${col},${(a * .72).toFixed(4)})`);
    gr.addColorStop(1 - p.edge, `rgba(${col},${a.toFixed(4)})`);       // léger liseré, comme un vrai bokeh
    gr.addColorStop(1, `rgba(${col},0)`);
    g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, p.r, 0, TAU); g.fill();
  }
  g.globalCompositeOperation = "source-over";
};

/* ---------- onde lime du dernier coup (23,50) depuis le point du @ (300, 967) ---------- */
const wv = $("#s12-wave"), w = wv.getContext("2d");
const OX = 300, OY = 967;
const eo = (q, p) => 1 - Math.pow(1 - q, p);
const ring = (r, lw, css) => { w.beginPath(); w.arc(OX, OY, Math.max(r, .1), 0, TAU); w.lineWidth = lw; w.strokeStyle = css; w.stroke(); };
const drawWave = t => {
  w.setTransform(1, 0, 0, 1, 0, 0);
  w.clearRect(0, 0, 1080, 1920);
  const d = t - 23.5;
  if (d < 0 || d >= .6) return;
  /* éclat doux autour du point */
  if (d < .3) {
    const q = d / .3, r = 40 + 160 * eo(q, 3), a = .55 * Math.pow(1 - q, 2);
    const gr = w.createRadialGradient(OX, OY, 0, OX, OY, r);
    gr.addColorStop(0, `rgba(230,255,170,${a.toFixed(3)})`); gr.addColorStop(.35, `rgba(200,255,62,${(a * .5).toFixed(3)})`);
    gr.addColorStop(1, "rgba(200,255,62,0)");
    w.globalCompositeOperation = "lighter"; w.fillStyle = gr; w.fillRect(OX - r, OY - r, 2 * r, 2 * r);
    w.globalCompositeOperation = "source-over";
  }
  /* onde principale : bordure 4 px, Ø 22 → ~1300, opacité .6 → 0 en 0,5 s */
  const q1 = clamp(d / .5);
  if (q1 < 1) ring(11 + 650 * eo(q1, 3), 4 + 3 * (1 - q1), `rgba(200,255,62,${(.6 * Math.pow(1 - q1, 1.25)).toFixed(3)})`);
  /* écho fin, légèrement en retard */
  const q2 = clamp((d - .06) / .5);
  if (q2 > 0 && q2 < 1) ring(11 + 480 * eo(q2, 3), 1.5 + 1.5 * (1 - q2), `rgba(200,255,62,${(.35 * Math.pow(1 - q2, 1.4)).toFixed(3)})`);
};

onSeek(t => { drawBokeh(t); drawWave(t); });
