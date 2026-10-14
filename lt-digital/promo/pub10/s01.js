/* Scène 01 — 0 → 2 s. Tout est piloté par le temps absolu (WAAPI à delay absolu + onSeek). */
const S = document.querySelector('.s01');
const q = sel => S.querySelector(sel), qa = sel => [...S.querySelectorAll(sel)];

/* ---------- courbes ---------- */
const bz = (x1, y1, x2, y2) => {
  const cx = s => ((1 - 3 * x2 + 3 * x1) * s + (3 * x2 - 6 * x1)) * s * s + 3 * x1 * s;
  const cy = s => ((1 - 3 * y2 + 3 * y1) * s + (3 * y2 - 6 * y1)) * s * s + 3 * y1 * s;
  return x => { if (x <= 0) return 0; if (x >= 1) return 1; let lo = 0, hi = 1, s = x;
    for (let i = 0; i < 48; i++) { s = (lo + hi) / 2; if (cx(s) < x) lo = s; else hi = s; } return cy(s); };
};
const EX = bz(.16, 1, .3, 1), SLIDE = bz(.3, 0, .2, 1), LAND = bz(.34, 1.56, .64, 1);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
/* animation échantillonnée (keyframes linéaires très serrées) entre t0 et t1 (s absolues) */
const samp = (el, t0, t1, f, n = 40, fill = 'forwards') => {
  const k = []; for (let i = 0; i <= n; i++) { const u = i / n; k.push(Object.assign({ offset: u }, f(u))); }
  return el.animate(k, { delay: t0 * 1000, duration: (t1 - t0) * 1000, fill, easing: 'linear' });
};

/* ---------- repères ---------- */
const O = { x: 237.5, y: 900.2 };                 // centre de l’encre du O (repère caméra, mesuré dans Chromium)
const CAMEND = 1.03, CX = 485, CY = 900;          // caméra à l'arrêt (1,75 s)
const OZ = { x: CX + (O.x - CX) * CAMEND, y: CY + (O.y - CY) * CAMEND }; // centre du O à l'écran pendant la plongée
const ORX = 46, ORY = 66;                          // demi-taille de l’encre du O à l’écran (caméra ×1,03)

/* ---------- 1. rolodex : position de la bande (px) à l'instant t ---------- */
const stripY = t => {
  let y = 0;
  for (let k = 1; k <= 6; k++) {
    const s = k / 6 - .1, e = k / 6;
    if (t >= e) { y = -260 * k; continue; }
    if (t > s) y = -260 * (k - 1) - 260 * (k === 6 ? LAND : SLIDE)((t - s) / .1);
    break;
  }
  return y;
};
const MS = q('.mstrip'), GS = q('.gstrip'), mbg = document.getElementById('s01-mbg'), ghb = document.getElementById('s01-ghb');
onSeek(t => {
  const y = stripY(t), h = 1 / 240, v = (stripY(t + h) - stripY(t - h)) / (2 * h); // px/s
  const sig = Math.min(16, Math.abs(v) / 60 / 2.4);                               // flou de bougé vertical (obturateur 180°)
  for (const s of [MS, GS]) s.style.transform = `translateY(${y.toFixed(2)}px)`;
  MS.style.filter = sig > .25 ? 'url(#s01-mb)' : 'none';
  mbg.setAttribute('stdDeviation', `0 ${sig.toFixed(2)}`);
  ghb.setAttribute('stdDeviation', `0 ${(sig > .25 ? sig : 0).toFixed(2)}`);
});

/* ---------- 2. COMMERCE : large et maigre → haut et gras, largeur constante (1,00 → 1,25) ---------- */
// largeur mesurée (Chromium, Archivo 183 px, −0,03 em) pour p = 0 … 1 (stretch 125→62 %, graisse 400→900)
const WT = [1370.9, 1330.8, 1290, 1252.1, 1210.2, 1171.7, 1129, 1085.5, 1046, 1023.2, 1002.2, 979.2, 954.4, 934.3, 910.4, 888.5, 863.7, 839.7, 816.5, 790.8, 765.5];
const wAt = p => { const x = clamp(p) * 20, i = Math.min(19, Math.floor(x)); return lerp(WT[i], WT[i + 1], x - i); };
const WC = 765.5;
samp(document.getElementById('s01-com'), 1.0, 1.25, u => {
  const pc = 1 - Math.pow(1 - u, 3), sx = WC / wAt(pc);   // verrouillage : sortie cubique, rien ne déborde
  const b = clamp((u - .3) / .7), pop = .07 * Math.sin(Math.PI * b) * Math.sqrt(1 - b);
  return { fontStretch: (125 - 63 * pc).toFixed(2) + '%', fontWeight: Math.round(400 + 500 * pc), transform: `scale(${sx.toFixed(4)},${(sx * (1 + pop)).toFixed(4)})` };
}, 40, 'both');

/* ---------- 3. caméra, secousse, « Ton », halo ---------- */
q('.cam').animate([
  { offset: 0, transform: 'scale(1.08) rotate(-3deg)', easing: 'cubic-bezier(.2,.8,.2,1)' },
  { offset: 1 / 1.75, transform: 'scale(1) rotate(0deg)', easing: 'cubic-bezier(.45,0,.55,1)' },
  { offset: 1, transform: `scale(${CAMEND}) rotate(0deg)` }
], { delay: 0, duration: 1750, fill: 'both' });

q('.shk').animate([
  { offset: 0, transform: 'translate(0px,0px) scale(1)' },
  { offset: .08, transform: 'translate(4px,-3px) scale(1.018)' },
  { offset: .3, transform: 'translate(-4px,2px) scale(1.008)' },
  { offset: .6, transform: 'translate(2px,-1px) scale(1.002)' },
  { offset: 1, transform: 'translate(0px,0px) scale(1)' }
], { delay: 1000, duration: 200, fill: 'forwards' });

q('.tonin').animate([
  { offset: 0, transform: 'translateY(0px) rotate(0deg)', easing: 'cubic-bezier(.2,.8,.3,1)' },
  { offset: .3, transform: 'translateY(-18px) rotate(-3deg)', easing: 'cubic-bezier(.34,1.56,.64,1)' },
  { offset: 1, transform: 'translateY(0px) rotate(0deg)' }
], { delay: 1000, duration: 320, fill: 'forwards' });

/* légère séparation des plans pendant la lecture (profondeur) */
q('.ton').animate([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }],
  { delay: 1150, duration: 600, easing: 'cubic-bezier(.45,0,.55,1)', fill: 'forwards' });
q('.merite').animate([{ transform: 'translateY(0px)' }, { transform: 'translateY(8px)' }],
  { delay: 1300, duration: 450, easing: 'cubic-bezier(.45,0,.55,1)', fill: 'forwards' });

q('.halo').animate([
  { offset: 0, transform: 'scale(1)', opacity: .8, easing: 'linear' },
  { offset: .5, transform: 'scale(1.04)', opacity: .8, easing: 'cubic-bezier(.16,1,.3,1)' },
  { offset: .53, transform: 'scale(1.14)', opacity: 1, easing: 'cubic-bezier(.3,0,.3,1)' },
  { offset: .8, transform: 'scale(1.08)', opacity: .9, easing: 'linear' },
  { offset: 1, transform: 'scale(1.12)', opacity: .95 }
], { delay: 0, duration: 2000, fill: 'both' });

/* ---------- 4. rangées : défilent, stoppées net à 1,00, rebond, dérive ---------- */
[[q('.r1'), -1, 1250], [q('.r2'), 1, 1050], [q('.r3'), -1, 1350], [q('.r4'), 1, 1150]].forEach(([el, d, A]) => {
  el.animate([
    { offset: 0, transform: `translateX(${-d * A}px)`, easing: 'linear' },
    { offset: .5, transform: 'translateX(0px)', easing: 'cubic-bezier(.2,.9,.4,1)' },
    { offset: .535, transform: `translateX(${d * 24}px)`, easing: 'cubic-bezier(.45,0,.55,1)' },
    { offset: .6, transform: `translateX(${d * 14}px)`, easing: 'cubic-bezier(.4,0,.8,1)' },
    { offset: 1, transform: `translateX(${d * 62}px)` }
  ], { delay: 0, duration: 2000, fill: 'both' });
});

/* ---------- 5. ondes (onSeek) ---------- */
const W1 = document.getElementById('s01-w1'), W2 = document.getElementById('s01-w2'), W3 = document.getElementById('s01-w3');
for (const c of [W1, W2, W3]) { c.setAttribute('cx', O.x); c.setAttribute('cy', O.y); }
const ring = (c, t, t0, dur, r0, r1, sw0, a0) => {
  const u = (t - t0) / dur;
  if (u <= 0 || u >= 1) { c.style.opacity = 0; return; }
  const e = EX(u);
  c.setAttribute('r', lerp(r0, r1, e).toFixed(1)); c.setAttribute('stroke-width', (sw0 * (1 - e)).toFixed(2));
  c.style.opacity = (a0 * (1 - u) * (1 - u)).toFixed(3);
};
onSeek(t => {
  ring(W1, t, 1.0, .55, 40, 920, 16, 1);
  ring(W2, t, 1.05, .5, 30, 640, 5, 1);
  ring(W3, t, 1.5, .3, 56, 200, 6, 1);
});

/* ---------- 6. « mérite d’être vu. » (1,25) et le point (1,625) ---------- */
q('.mclip').animate([
  { clipPath: 'inset(0px 100% 0px 0px)' }, { clipPath: 'inset(0px 0% 0px 0px)' }
], { delay: 1250, duration: 200, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
q('.mtxt').animate([
  { transform: 'translateX(-46px)' }, { transform: 'translateX(0px)' }
], { delay: 1250, duration: 260, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
document.getElementById('s01-dot').animate([
  { offset: 0, opacity: 0, transform: 'translateY(-130px) scale(.9,1.1)', easing: 'cubic-bezier(.55,0,1,.45)' },
  { offset: .14, opacity: 1, transform: 'translateY(-110px) scale(.9,1.12)', easing: 'cubic-bezier(.55,0,1,.45)' },
  { offset: .5, opacity: 1, transform: 'translateY(0px) scale(1.35,.66)', easing: 'cubic-bezier(.2,.7,.4,1)' },
  { offset: .72, opacity: 1, transform: 'translateY(-20px) scale(.94,1.08)', easing: 'cubic-bezier(.6,0,.9,.6)' },
  { offset: .86, opacity: 1, transform: 'translateY(0px) scale(1.12,.9)', easing: 'cubic-bezier(.2,.7,.4,1)' },
  { offset: 1, opacity: 1, transform: 'translateY(0px) scale(1,1)' }
], { delay: 1500, duration: 250, fill: 'forwards' });

/* ---------- 7. le O s'allume (1,50) ---------- */
const OEL = document.getElementById('s01-o');
OEL.animate([{ color: '#ffffff' }, { color: '#c8ff3e' }], { delay: 1500, duration: 100, easing: 'ease-out', fill: 'forwards' });
document.getElementById('s01-glow').animate([            // 1,50 → 1,95 : bloom, repos, puis s’efface pendant la plongée
  { offset: 0, opacity: 0, transform: 'scale(.55)', easing: 'cubic-bezier(.16,1,.3,1)' },
  { offset: .1667, opacity: 1, transform: 'scale(1.18)', easing: 'cubic-bezier(.45,0,.55,1)' },
  { offset: .5556, opacity: .8, transform: 'scale(1)', easing: 'ease-in' },
  { offset: 1, opacity: .2, transform: 'scale(1)' }
], { delay: 1500, duration: 450, fill: 'forwards' });
document.getElementById('s01-oi').animate([
  { transform: 'scale(0)' }, { transform: 'scale(1)' }
], { delay: 1500, duration: 150, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'forwards' });

/* ---------- 8. plongée dans le O (1,75 → 2,00) ---------- */
const T0 = 1.75, TF = 1.9667, ZMAX = 32;
const qz = t => Math.pow(clamp((t - T0) / (TF - T0)), 1.6);
// pendant la plongée, la caméra recentre le O sur 485/960 (centre des anneaux qui ouvrent la scène 02)
const DX = 485 - OZ.x, DY = 960 - OZ.y;
const pan = t => { const u = clamp((t - T0) / (TF - T0)); return u * u * (3 - 2 * u); };
samp(q('.zoom'), T0, 2.0, u => { const t = T0 + u * .25, g = pan(t);
  return { transform: `translate(${(DX * g).toFixed(2)}px,${(DY * g).toFixed(2)}px) scale(${Math.pow(ZMAX, qz(t)).toFixed(4)})` }; }, 60);
samp(q('.rig'), T0, 2.0, u => { const t = T0 + u * .25, g = pan(t) * .35;
  return { transform: `translate(${(DX * g).toFixed(2)}px,${(DY * g).toFixed(2)}px) scale(${Math.pow(1.9, qz(t)).toFixed(4)})` }; }, 60);
samp(q('#s01-iris'), T0, 2.0, u => {
  const t = T0 + u * .25, s = Math.pow(ZMAX, qz(t)), m = .9, g = pan(t);
  const rx = Math.max(.5, ORX * s * m), ry = Math.max(.5, ORY * s * m);
  return { clipPath: `ellipse(${rx.toFixed(1)}px ${ry.toFixed(1)}px at ${(OZ.x + DX * g).toFixed(1)}px ${(OZ.y + DY * g).toFixed(1)}px)` };
}, 60);
q('.merite').animate([
  { filter: 'blur(0px)', opacity: 1 }, { filter: 'blur(10px)', opacity: 0 }
], { delay: 1800, duration: 100, easing: 'ease-in', fill: 'forwards' });

/* traînées d’aspiration : rayons qui fusent depuis le O (au-dessus de la plongée, sous l’iris) */
const WARP = document.getElementById('s01-warp'), NS = 'http://www.w3.org/2000/svg', rw = mkRnd(101);
const streaks = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2 + (rw() - .5) * .3, l = document.createElementNS(NS, 'polygon');
  l.setAttribute('fill', i % 3 === 1 ? '#c8ff3e' : '#ffffff'); WARP.append(l);
  return { l, a, r0: 170 + rw() * 240, k: .75 + rw() * .5, len: 120 + rw() * 200, w: 5 + rw() * 6, d: rw() * .3 };
});
onSeek(t => {
  const u = clamp((t - 1.77) / .18);
  for (const s of streaks) {
    const v = clamp((u - s.d) / (1 - s.d));
    if (v <= 0 || v >= 1) { s.l.style.opacity = 0; continue; }
    const r1 = s.r0 + 1400 * Math.pow(v, 1.6) * s.k, r2 = r1 + s.len * (.5 + 2.5 * v), hw = s.w * (.5 + v) / 2;
    const g = pan(t), c = Math.cos(s.a), n = Math.sin(s.a), X = r => OZ.x + DX * g + c * r, Y = r => OZ.y + DY * g + n * r;
    s.l.setAttribute('points', `${X(r1).toFixed(1)},${Y(r1).toFixed(1)} ${(X(r2) - n * hw).toFixed(1)},${(Y(r2) + c * hw).toFixed(1)} ${(X(r2) + n * hw).toFixed(1)},${(Y(r2) - c * hw).toFixed(1)}`);
    s.l.style.opacity = (.6 * Math.sin(Math.PI * Math.pow(v, .8))).toFixed(3);
  }
});
