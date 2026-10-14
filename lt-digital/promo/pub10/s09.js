/* Scène 09 (16 → 18 s) — BREAKDOWN demi-temps : tunnel de cadrans d’horloge, « Livré en 48 à 72 h »,
   puis une aiguille balaie l’écran et le repeint en violet (raccord S10).
   Tout est piloté par le temps absolu : WAAPI à delay absolu + canvas redessinés en entier dans onSeek(t). */
const S = $(".s09");
const A = (el, kf, t0, dur, easing = "linear", fill = "both") =>
  el.animate(kf, { delay: Math.round(t0 * 1000), duration: Math.round(dur * 1000), easing, fill });
const EX = "cubic-bezier(.16,1,.3,1)", E = "cubic-bezier(.2,.8,.2,1)", E2 = "cubic-bezier(.7,0,.2,1)", BO = "cubic-bezier(.34,1.56,.64,1)";

/* ---------- petits outils ---------- */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const sstep = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
const eoc = u => 1 - Math.pow(1 - clamp(u), 3);                       // easeOutCubic
const eoq = u => 1 - Math.pow(1 - clamp(u), 4);                       // easeOutQuart
const back = u => { u = clamp(u); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); };
const TAU = Math.PI * 2;
const T0 = 16, T1 = 18, CX = 485, CY = 900;

/* ======================================================================
   TUNNEL (canvas#s09-tun)
   cadran k : profondeur z = (1 + k) − 2(t − 16) − Z0 ; rayon écran 265 / z ; centre (485, 900).
   Z0 = 1 − 1/1,02 : à 16,00 le cadran 0 vaut l’anneau de S8 en fin de respiration (scale 1,02 à 16,00).
   ====================================================================== */
const cv = $("#s09-tun"), g = cv.getContext("2d");
const Z0 = 1 - 1 / 1.02, R0 = 265, NK = 14;
const COL = ["200,255,62", "124,92,255", "143,162,255"];               // lime, violet, bleu
const dialCol = k => (k === 0 ? COL[0] : COL[k % 3]);
const PH = [0, .9, 2.1, .4, 1.7, 2.9, 1.2, .2, 2.5, 1.5, .7, 2.2, 1.0, 2.7];   // calage angulaire des graduations

/* rotation des graduations : moitié continue, moitié en « tics » calés sur les croches (16,00 → 17,75) */
const tickRot = u => {
  let s = 0;
  for (let i = 0; i < 8; i++) s += back((u - .25 * i) / .1);
  return .175 * u + .04375 * s;                                      // moyenne 0,35 rad/s
};
/* légère dérive latérale de la caméra dans le tunnel (unités monde ; 0 à 16,00) */
const camX = u => .045 * Math.sin(2.1 * u);
const camY = u => .03 * (1 - Math.cos(1.6 * u)) - .012 * Math.sin(3.1 * u);
/* coups de zoom d’impact sur 16,50 et 17,00 */
const punch = t => {
  let p = 0;
  for (const tb of [16.5, 17.0]) if (t >= tb) p += .022 * Math.exp(-(t - tb) / .09);
  return 1 + p;
};
/* lignes de vitesse : 120, perspective vraie (rayon monde R, profondeur cyclique), mkRnd(909) */
const LINES = (() => {
  const r = mkRnd(909), out = [];
  for (let i = 0; i < 120; i++) out.push({ a: TAU * r(), R: .6 + 1.8 * r(), z0: 5.2 * r(), w: 1.6 + .8 * r() });
  return out;
})();
const ZMIN = .15, ZSPAN = 5.2;

const ring = (x, y, r, w, col, a) => {
  if (a <= .002 || r <= 0) return;
  g.strokeStyle = `rgba(${col},${a.toFixed(4)})`; g.lineWidth = w;
  g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();
};
const ticks = (x, y, r, z, rot, col, a, sa = .72) => {
  if (a <= .002) return;
  const w = Math.max(1, 5 / z);
  g.lineWidth = w; g.lineCap = "butt";
  for (const long of [false, true]) {
    g.beginPath();
    for (let i = 0; i < 60; i++) {
      const isL = i % 5 === 0;
      if (isL !== long) continue;
      const th = rot + i * TAU / 60, c = Math.cos(th), s = Math.sin(th);
      const r1 = (isL ? .78 : .84) * r, r2 = .93 * r;
      g.moveTo(x + c * r1, y + s * r1); g.lineTo(x + c * r2, y + s * r2);
    }
    g.strokeStyle = `rgba(${col},${(a * (long ? 1 : sa)).toFixed(4)})`;
    g.stroke();
  }
};

/* lunette extérieure : anneau fin à 1,1 r + 12 index des heures */
const bezel = (x, y, r, z, rot, col, a) => {
  if (a <= .003) return;
  ring(x, y, 1.1 * r, Math.max(1, 2.2 / z), col, .45 * a);
  g.lineWidth = Math.max(1.5, 6 / z); g.lineCap = "butt"; g.beginPath();
  for (let i = 0; i < 12; i++) {
    const th = rot + i * TAU / 12, c = Math.cos(th), s = Math.sin(th);
    g.moveTo(x + c * 1.045 * r, y + s * 1.045 * r); g.lineTo(x + c * 1.1 * r, y + s * 1.1 * r);
  }
  g.strokeStyle = `rgba(${col},${(.8 * a).toFixed(4)})`; g.stroke();
};
/* anneaux de points entre deux cadrans (profondeur k + 0,5) : texture du tunnel */
const dots = (x, y, r, z, rot, a) => {
  if (a <= .003) return;
  const d = Math.max(1, 2.4 / z);
  g.fillStyle = `rgba(255,255,255,${a.toFixed(4)})`; g.beginPath();
  for (let i = 0; i < 72; i++) {
    const th = rot + i * TAU / 72, px = x + Math.cos(th) * r, py = y + Math.sin(th) * r;
    g.moveTo(px + d, py); g.arc(px, py, d, 0, TAU);
  }
  g.fill();
};

const drawTunnel = t => {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, 1080, 1920);
  if (t < T0 || t >= T1) return;
  const u = t - T0;
  const on = eoc(u / .3);                                              // le tunnel « s’allume » sur le kick
  /* fond : nuit (= fin de S8) → radial bleu-vert */
  g.globalCompositeOperation = "source-over"; g.globalAlpha = 1;
  g.fillStyle = "#07060c"; g.fillRect(0, 0, 1080, 1920);
  const bg = g.createRadialGradient(CX, CY, 0, CX, CY, 1300);
  bg.addColorStop(0, "#0f2f3a"); bg.addColorStop(1, "#06070d");
  g.globalAlpha = on; g.fillStyle = bg; g.fillRect(0, 0, 1080, 1920); g.globalAlpha = 1;

  /* lueur au point de fuite (+30 % sur 16,0 / 16,5 / 17,0 / 17,5) */
  let pulse = 1;
  for (const tb of [16, 16.5, 17, 17.5]) if (t >= tb) pulse += .3 * Math.exp(-(t - tb) / .14);
  const ga = on * pulse;
  g.globalCompositeOperation = "lighter";
  const halo = g.createRadialGradient(CX, CY, 0, CX, CY, 430);
  halo.addColorStop(0, `rgba(25,198,176,${(.16 * ga).toFixed(4)})`); halo.addColorStop(1, "rgba(25,198,176,0)");
  g.fillStyle = halo; g.fillRect(CX - 430, CY - 430, 860, 860);
  const core = g.createRadialGradient(CX, CY, 0, CX, CY, 160);
  core.addColorStop(0, `rgba(255,255,255,${(.5 * ga).toFixed(4)})`); core.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = core; g.fillRect(CX - 160, CY - 160, 320, 320);
  g.globalCompositeOperation = "source-over";

  const P = punch(t), cxw = camX(u), cyw = camY(u), rot = tickRot(u);
  const sx = z => CX - cxw * R0 * P / z, sy = z => CY - cyw * R0 * P / z;

  /* lignes de vitesse (sous les cadrans proches) */
  const lineOn = clamp(u / .15);
  g.lineCap = "round";
  for (const L of LINES) {
    const z = ZMIN + (((L.z0 - 2 * u) % ZSPAN) + ZSPAN) % ZSPAN;
    const a = .22 * lineOn * sstep(ZMIN, .32, z) * sstep(5.2, 3.2, z);
    if (a < .003) continue;
    const c = Math.cos(L.a), s = Math.sin(L.a);
    const ra = L.R * R0 * P / z, rb = L.R * R0 * P / (z + .14);       // traînée = obturateur 70 ms
    const rB = clamp(rb, ra - 600, ra - 8);
    const xa = sx(z) + c * ra, ya = sy(z) + s * ra, xb = sx(z + .14) + c * rB, yb = sy(z + .14) + s * rB;
    g.strokeStyle = `rgba(255,255,255,${a.toFixed(4)})`; g.lineWidth = L.w * Math.min(1.8, Math.max(1, .6 / z));
    g.beginPath(); g.moveTo(xb, yb); g.lineTo(xa, ya); g.stroke();
  }

  /* cadrans, du plus loin au plus proche */
  const blurOn = clamp((u - .03) / .1);
  for (let k = NK - 1; k >= 0; k--) {
    /* anneau de points à mi-chemin (plus loin que le cadran k) */
    {
      const zh = (1.5 + k) - 2 * u - Z0;
      if (zh > .12) {
        const ah = .38 * Math.min(1, 1.6 / zh) * sstep(.12, .45, zh) * sstep(12.5, 9.5, zh) * eoc((u - .03 - .02 * k) / .22);
        dots(sx(zh), sy(zh), .97 * R0 * P / zh, zh, (k % 2 ? .2 : -.2) * u + k * .37, ah);
      }
    }
    const z = (1 + k) - 2 * u - Z0;
    if (z <= .12) continue;
    const vis = Math.min(1, 1.6 / z) * sstep(.12, .4, z) * sstep(13, 10, z);
    const lit = k === 0 ? 1 : eoc((u - .02 * (k - 1)) / .22);        // à 16,00 seul l’anneau de S8 est là
    const a = vis * lit;
    if (a < .003) continue;
    const r = R0 * P / z, x = sx(z), y = sy(z), col = dialCol(k);
    const w = k === 0 ? (170 - 154 * eoc(u / .25)) * P / z : 16 * P / z;
    /* lueur douce autour de l’anneau */
    g.globalCompositeOperation = "lighter";
    ring(x, y, r, Math.min(260, 64 * P / z), col, .06 * a * on);
    g.globalCompositeOperation = "source-over";
    /* flou de bougé (obturateur ~30 ms) sur les cadrans proches */
    const bOn = k === 0 ? blurOn * sstep(.2, .32, u) : blurOn;      // pas de flou pendant l’affinage de l’anneau
    if (z < 2.2 && bOn > 0) for (let j = 3; j >= 1; j--) {
      const zj = z + .02 * j;
      const wj = k === 0 ? (170 - 154 * eoc(u / .25)) * P / zj : 16 * P / zj;
      ring(sx(zj), sy(zj), R0 * P / zj, wj, col, a * bOn * [0, .42, .24, .12][j]);
    }
    ring(x, y, r, w, col, a);
    ticks(x, y, r, z, PH[k] + (k % 2 ? -rot : rot), col, a, k === 0 ? 1 - .28 * sstep(.15, .35, u) : .72);
    bezel(x, y, r, z, PH[k] * .5 + (k % 2 ? rot : -rot) * .5, col, a * (k === 0 ? sstep(.05, .25, u) : 1));
    /* repère lumineux sur le cadran (petite bille blanche qui tourne) */
    const th = PH[k] * 2.3 + (k % 2 ? 1 : -1) * 1.1 * u, rr = r;
    const bx = x + Math.cos(th) * rr, by = y + Math.sin(th) * rr, br = Math.max(2.2, 7 / z);
    if (k > 0 || u > .2) {
      g.globalCompositeOperation = "lighter";
      const bgd = g.createRadialGradient(bx, by, 0, bx, by, br * 4);
      bgd.addColorStop(0, `rgba(255,255,255,${(.9 * a * on).toFixed(4)})`); bgd.addColorStop(.25, `rgba(${col},${(.5 * a * on).toFixed(4)})`); bgd.addColorStop(1, `rgba(${col},0)`);
      g.fillStyle = bgd; g.beginPath(); g.arc(bx, by, br * 4, 0, TAU); g.fill();
      g.globalCompositeOperation = "source-over";
    }
    /* vague lime à 17,50 (du cadran le plus proche vers le fond) */
    if (k >= 3) {
      const wv = .9 * Math.exp(-Math.pow((t - 17.5 - .035 * (k - 3)) / .08, 2));
      if (wv > .004) {
        const aw = wv * Math.min(1, .45 + vis) * sstep(.12, .4, z);
        g.globalCompositeOperation = "lighter";
        ring(x, y, r, Math.min(300, 90 * P / z), COL[0], .22 * aw);
        g.globalCompositeOperation = "source-over";
        ring(x, y, r, 22 * P / z, COL[0], aw);
        ticks(x, y, r, z, PH[k] + (k % 2 ? -rot : rot), COL[0], aw);
      }
    }
  }
};

/* ======================================================================
   BALAYAGE D’AIGUILLE (canvas#s09-sweep, au-dessus de tout) 17,80 → 18,00
   ====================================================================== */
const sw = $("#s09-sweep"), h = sw.getContext("2d");
const drawSweep = t => {
  h.setTransform(1, 0, 0, 1, 0, 0);
  h.clearRect(0, 0, 1080, 1920);
  if (t < 17.8 || t >= T1) return;
  const q = (t - 17.8) / .2, a = TAU * q * q, full = t >= 17.99;
  const a0 = -Math.PI / 2, ah = a0 + a;
  const vg = h.createRadialGradient(CX, CY, 0, CX, CY, 1300);
  vg.addColorStop(0, "#2a1c66"); vg.addColorStop(1, "#07060c");
  h.fillStyle = vg;
  if (full) { h.fillRect(0, 0, 1080, 1920); return; }
  if (a > .0005) {
    h.beginPath(); h.moveTo(CX, CY); h.arc(CX, CY, 2400, a0, ah); h.closePath(); h.fill();
    /* traînée lumineuse derrière l’aiguille (longueur = vitesse × obturateur 30 ms) */
    const om = TAU * 2 * q / .2, tr = Math.min(a, 1.6, om * .03);
    if (tr > .01) {
      const cg = h.createConicGradient(ah - tr, CX, CY);
      const f = tr / TAU;
      cg.addColorStop(0, "rgba(124,92,255,0)");
      cg.addColorStop(f * .7, "rgba(124,92,255,.22)");
      cg.addColorStop(f * .985, "rgba(200,255,62,.30)");
      cg.addColorStop(f, "rgba(200,255,62,0)");
      cg.addColorStop(1, "rgba(200,255,62,0)");
      h.fillStyle = cg;
      h.beginPath(); h.moveTo(CX, CY); h.arc(CX, CY, 2400, ah - tr, ah); h.closePath(); h.fill();
    }
  }
  /* l’aiguille */
  const ex = CX + Math.cos(ah) * 2400, ey = CY + Math.sin(ah) * 2400;
  h.lineCap = "butt";
  h.globalCompositeOperation = "lighter";
  h.strokeStyle = "rgba(200,255,62,.28)"; h.lineWidth = 22;
  h.beginPath(); h.moveTo(CX, CY); h.lineTo(ex, ey); h.stroke();
  h.globalCompositeOperation = "source-over";
  h.strokeStyle = "#c8ff3e"; h.lineWidth = 6;
  h.beginPath(); h.moveTo(CX, CY); h.lineTo(ex, ey); h.stroke();
  /* moyeu */
  h.fillStyle = "#c8ff3e"; h.beginPath(); h.arc(CX, CY, 13, 0, TAU); h.fill();
  h.fillStyle = "#07060c"; h.beginPath(); h.arc(CX, CY, 5, 0, TAU); h.fill();
};

/* ======================================================================
   SONAR 17,00 (SVG, base invisible)
   ====================================================================== */
const s1 = $("#s09-son1"), s2 = $("#s09-son2");
const drawSonar = t => {
  const p1 = (t - 17.0) / .5, p2 = (t - 17.07) / .5;
  if (p1 > 0 && p1 < 1) {
    s1.setAttribute("r", (100 + 600 * eoq(p1)).toFixed(1));
    s1.style.strokeWidth = (6 * (1 - p1)).toFixed(2); s1.style.opacity = (1 - p1 * p1).toFixed(3);
  } else { s1.setAttribute("r", 0); s1.style.opacity = 0; }
  if (p2 > 0 && p2 < 1) {
    s2.setAttribute("r", (80 + 520 * eoq(p2)).toFixed(1));
    s2.style.strokeWidth = (3 * (1 - p2)).toFixed(2); s2.style.opacity = (.55 * (1 - p2)).toFixed(3);
  } else { s2.setAttribute("r", 0); s2.style.opacity = 0; }
};

onSeek(t => { drawTunnel(t); drawSweep(t); drawSonar(t); });

/* ======================================================================
   TEXTE
   ====================================================================== */
/* caméra : dérive (push + roulis) et coups d’impact sur 16,5 / 17,0 / 17,5 */
A($("#s09-cam"), [{ transform: "scale(1) rotate(0deg)" }, { transform: "scale(1.03) rotate(-.5deg)" }], 16.0, 2.0, "linear");
A($("#s09-kick"), [
  { transform: "scale(1) translateY(0px)", offset: 0 },
  { transform: "scale(1) translateY(0px)", offset: .25 },
  { transform: "scale(1.018) translateY(3px)", offset: .265 },
  { transform: "scale(1) translateY(0px)", offset: .36 },
  { transform: "scale(1) translateY(0px)", offset: .5 },
  { transform: "scale(1.022) translateY(4px)", offset: .515 },
  { transform: "scale(1) translateY(0px)", offset: .61 },
  { transform: "scale(1) translateY(0px)", offset: .75 },
  { transform: "scale(1.008) translateY(0px)", offset: .765 },
  { transform: "scale(1) translateY(0px)", offset: .84 },
  { transform: "scale(1) translateY(0px)", offset: 1 }
], 16.0, 2.0, "linear");

/* « Livré en » tombe lettre à lettre */
split($("#s09-l1"), 16.0, .03);

/* SLAM des nombres : scale 2,6 → 1, opacité, flou → 0 */
const slam = (el, t0) => A(el, [
  { transform: "scale(2.6)", opacity: 0, filter: "blur(12px)" },
  { opacity: 1, offset: .38 },
  { transform: "scale(1)", opacity: 1, filter: "blur(0px)" }
], t0, .3, BO, "both");
slam($("#s09-48"), 16.5);
slam($("#s09-72"), 17.0);

/* « à » : pop doux */
A($("#s09-a"), [{ transform: "scale(0) rotate(-14deg)" }, { transform: "scale(1) rotate(0deg)" }], 16.75, .2, BO, "both");

/* « h » : arrive à 17,06 (scale 1,85 → 1 : reste dans x < 900), s’étire (62 % → 110 % à 17,20) puis se pose à 80 % (17,36) */
A($("#s09-h"), [
  { offset: 0, transform: "scale(1.85)", opacity: 0, fontStretch: "62%", easing: EX },
  { offset: .25, opacity: 1 },
  { offset: .467, transform: "scale(1)", fontStretch: "110%", easing: "cubic-bezier(.45,0,.2,1.25)" },
  { offset: 1, transform: "scale(1)", opacity: 1, fontStretch: "80%" }
], 17.06, .3, "linear", "both");

/* écho en contour lime : il « verrouille » le chiffre en reculant en Z jusqu’au plan du texte */
const echo = (el, t0) => A(el, [
  { transform: "scale(1.5)", opacity: 0 },
  { opacity: .42, offset: .3 },
  { transform: "scale(1)", opacity: 0 }
], t0, .26, "cubic-bezier(.2,.7,.3,1)", "forwards");
echo($("#s09-e48"), 16.56);
echo($("#s09-e72"), 17.06);

/* 17,50 : soulignement lime + halo lime sur 48 et 72 h */
A($("#s09-ul"), [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], 17.5, .2, E2, "both");
const GL0 = "0 6px 40px rgba(6,7,13,.55),0 0 0px rgba(200,255,62,0)";
const GL1 = "0 6px 40px rgba(6,7,13,.55),0 0 42px rgba(200,255,62,.85)";
const GL2 = "0 6px 40px rgba(6,7,13,.55),0 0 30px rgba(200,255,62,.6)";
for (const id of ["#s09-48", "#s09-72", "#s09-h"])
  A($(id), [{ textShadow: GL0 }, { textShadow: GL1, offset: .3 }, { textShadow: GL2 }], 17.5, .3, "ease-out", "both");
