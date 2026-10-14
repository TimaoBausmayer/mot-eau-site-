/* Scène 11 (20 → 22 s) — DROP FINAL : le point explose, le logo jaillit en se retournant, 900 grains de poussière
   se posent sur l’anneau du logo, l’orbite et sa comète passent, puis le logo monte et « @l.t_digital » se tape.
   Tout est piloté par le temps absolu : CSS à délai absolu + onSeek(t) qui redessine tout à partir de t seul. */
const S = $(".s11");
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const sstep = x => { x = clamp(x); return x * x * (3 - 2 * x); };
const eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };   // easeInOutCubic
const bez = (x1, y1, x2, y2) => x => {                                                                // cubic-bezier CSS
  if (x <= 0) return 0; if (x >= 1) return 1;
  let lo = 0, hi = 1, u = x;
  for (let k = 0; k < 32; k++) { u = (lo + hi) / 2; const cx = 3 * x1 * u * (1 - u) * (1 - u) + 3 * x2 * u * u * (1 - u) + u * u * u; if (cx < x) lo = u; else hi = u; }
  return 3 * y1 * u * (1 - u) * (1 - u) + 3 * y2 * u * u * (1 - u) + u * u * u;
};
const EX = bez(.16, 1, .3, 1);
const TAU = Math.PI * 2;

/* ---------- le @ : découpe en lettres (21,60 + i·0,02) ---------- */
const H = $("#s11-handle");
const chs = split(H, 21.6, .02);
chs[2].classList.add("s11-dotCh");                       // le « . » reste transparent : le disque lime prend sa place
const cur = $("#s11-cur");

/* ---------- mise en place (même courbe que .s11-move) : point de la scène → point affiché ---------- */
const MV = bez(.45, 0, .15, 1);
const moveK = t => MV(clamp((t - 21.4) / .4));
const mapMove = (x, y, m) => { const s = 1 - .333 * m; return [485 + (x - 485) * s, 940 + (y - 940) * s - 470 * m]; };

/* ---------- particules : 900 grains, mkRnd(2020) ---------- */
const cv = $("#s11-p"), g = cv.getContext("2d");
const R = mkRnd(2020), N = 900, P = [];
for (let i = 0; i < N; i++) {
  const a = R() * TAU;
  P.push({
    a, v: 900 + R() * 1500,
    th: a + .85 + (R() - .5) * 1.1,                        // angle d’arrivée décalé : la gerbe s’enroule sur l’anneau
    d: R() * .15, ph: R() * TAU, sz: 2 + R() * 2,
    j: (R() - .5) * 12, tw: R() * TAU, tf: 18 + R() * 22, glint: R() < .045
  });
}
const RC = [482, 929], RR = 235;
const pos = (p, tau) => {
  const s = clamp(tau, 0, .3), k = p.v * s * (1 - s / .6);
  const bx = 485 + k * Math.cos(p.a), by = 960 + k * Math.sin(p.a);
  const th = p.th + .6 * tau, rr = RR + p.j;
  const tx = RC[0] + rr * Math.cos(th), ty = RC[1] + rr * Math.sin(th);
  const u = eio((tau - .15 - p.d) / .5);
  const dx = tx - bx, dy = ty - by, L = Math.hypot(dx, dy) || 1;
  const w = 60 * Math.sin(7 * tau + p.ph) * (1 - u) * sstep(tau / .15);
  return [bx + dx * u - dy / L * w, by + dy * u + dx / L * w, u];
};
const LIME = [200, 255, 62], WHITE = [246, 248, 255], BLUE = [143, 162, 255];
const mix = (A, B, u) => [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u, A[2] + (B[2] - A[2]) * u];
const colAt = u => (u < .5 ? mix(LIME, WHITE, u / .5) : mix(WHITE, BLUE, (u - .5) / .5));
const alphaAt = t => (t < 20.9 ? 1 : t < 21.4 ? 1 - .65 * (t - 20.9) / .5 : t < 21.6 ? .35 * (1 - (t - 21.4) / .2) : 0);

const ring = (x, y, r, w, css) => { g.beginPath(); g.arc(x, y, Math.max(r, .1), 0, TAU); g.lineWidth = w; g.strokeStyle = css; g.stroke(); };

const draw = t => {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = "source-over";
  g.clearRect(0, 0, 1080, 1920);
  const tau = t - 20;
  if (tau < 0 || tau >= 2) return;

  /* le point de S10 (Ø 54) qui éclate */
  if (tau < .12) {
    const q = tau / .12;
    g.beginPath(); g.arc(485, 960, 27 + 46 * EX(q), 0, TAU);
    g.fillStyle = `rgba(200,255,62,${(1 - q) * (1 - q)})`; g.fill();
  }
  /* éclat central (1 seul flash) */
  if (tau < .34) {
    const q = tau / .34, r = 90 + 520 * EX(q), a = .9 * Math.pow(1 - q, 2.2);
    const gr = g.createRadialGradient(485, 960, 0, 485, 960, r);
    gr.addColorStop(0, `rgba(250,255,235,${a})`); gr.addColorStop(.25, `rgba(200,255,62,${a * .55})`);
    gr.addColorStop(.6, `rgba(143,162,255,${a * .18})`); gr.addColorStop(1, "rgba(143,162,255,0)");
    g.globalCompositeOperation = "lighter"; g.fillStyle = gr; g.fillRect(485 - r, 960 - r, 2 * r, 2 * r);
    g.globalCompositeOperation = "source-over";
  }
  /* ondes de choc : lime épaisse puis bleue fine */
  if (tau < .6) {
    const eo = q => 1 - Math.pow(1 - q, 3.2);
    const q1 = clamp(tau / .5);                             // l’onde lime : bord extérieur = le point Ø 54 à 20,00, puis hors champ
    if (q1 < 1) ring(485, 960, 16 + 774 * eo(q1), 2 + 20 * (1 - q1), `rgba(200,255,62,${Math.pow(1 - q1, 1.3)})`);
    const q2 = clamp((tau - .05) / .55);
    if (q2 > 0 && q2 < 1) ring(485, 960, 30 + 1050 * eo(q2), 1.5 + 5 * (1 - q2), `rgba(143,162,255,${.85 * Math.pow(1 - q2, 1.4)})`);
    const q3 = clamp((tau - .1) / .45);
    if (q3 > 0 && q3 < 1) ring(485, 960, 20 + 420 * eo(q3), 1 + 2 * (1 - q3), `rgba(255,255,255,${.5 * Math.pow(1 - q3, 1.6)})`);
  }

  /* poussière */
  const A = alphaAt(t);
  if (A <= 0) return;
  const m = moveK(t);
  g.globalCompositeOperation = "lighter";
  g.lineCap = "round";
  for (const p of P) {
    let [x, y, u] = pos(p, tau);
    let [x0, y0] = pos(p, tau - .016);
    if (m > 0) { [x, y] = mapMove(x, y, m); [x0, y0] = mapMove(x0, y0, m); }   // la poussière suit le logo sans traînée
    const sc = 1 - .333 * m;
    const tw = 1 - .45 * u * (.5 + .5 * Math.sin(p.tf * tau + p.tw));
    const c = colAt(u), a = A * tw;
    g.strokeStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`;
    g.lineWidth = p.sz * sc;
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(x + .01, y); g.stroke();
    if (p.glint) {                                        // éclats en croix
      const l = (5 + 9 * (.5 + .5 * Math.sin(p.tf * .7 * tau + p.ph))) * sc;
      g.lineWidth = 1.2 * sc; g.strokeStyle = `rgba(250,252,255,${(a * .85).toFixed(3)})`;
      g.beginPath(); g.moveTo(x - l, y); g.lineTo(x + l, y); g.moveTo(x, y - l); g.lineTo(x, y + l); g.stroke();
    }
  }
  g.globalCompositeOperation = "source-over";
};

/* ---------- tremblement d’impact (≤ 4 px) ---------- */
const shake = $("#s11-shake");
const doShake = t => {
  const a = t - 20, b = t - 20.75;
  let x = 0, y = 0;
  if (a >= 0 && a < .4) { const k = 4 * Math.exp(-a / .09); x += k * Math.sin(a * TAU * 23); y += k * Math.cos(a * TAU * 29 + 1); }
  if (b >= 0 && b < .25) { const k = 2 * Math.exp(-b / .06); x += k * Math.sin(b * TAU * 31 + .5); y += k * Math.cos(b * TAU * 27); }
  shake.style.transform = (x || y) ? `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)` : "none";
};

/* ---------- lueur : +40 % sur chaque temps (20,0 / 20,5 / 21,0 / 21,5), revenue à la base avant 21,9 ---------- */
const glowP = $("#s11-glowP");
const doGlow = t => {
  let v = 0;
  [[20, 1], [20.5, .7], [21, .75], [21.5, .6]].forEach(([b, k]) => { const d = t - b; if (d >= 0) v += k * Math.exp(-d / .14) * sstep(d / .03 + .001); });
  v *= clamp((21.88 - t) / .3);
  glowP.style.opacity = (.55 * v).toFixed(3);
  glowP.style.transform = v > 0 ? `scale(${(1 + .06 * v).toFixed(4)})` : "none";
};

/* ---------- comète sur l’orbite (21,0 → 22,0) ---------- */
const cT = $("#s11-cTail"), cM = $("#s11-cMid"), cG = $("#s11-cGlow"), cH = $("#s11-cHead");
const setDash = (el, L, h) => { el.style.strokeDasharray = `${L} ${1000 - L}`; el.style.strokeDashoffset = `${(L - h).toFixed(2)}`; };
const doComet = t => {
  const x = clamp(t - 21);
  const h = 1000 * (1 - Math.pow(1 - x, 1.8));
  const grow = sstep(x / .12);                              // la queue s’allonge au départ
  setDash(cT, 300 * grow + .01, h); setDash(cM, 120 * grow + .01, h); setDash(cG, 34 * grow + 4, h); setDash(cH, 3, h);
};

/* ---------- curseur qui suit la frappe (visible 21,60 → 21,92) ---------- */
const doCursor = t => {
  if (t < 21.6 || t >= 21.92) { cur.style.opacity = "0"; return; }
  let n = 0; for (let i = 0; i < 12; i++) if (t > 21.6 + i * .02 + .0005) n = i + 1;
  cur.style.opacity = "1";
  cur.style.transform = `translateX(${(n * 52.8).toFixed(1)}px)`;
};

onSeek(t => { draw(t); doShake(t); doGlow(t); doComet(t); doCursor(t); });
