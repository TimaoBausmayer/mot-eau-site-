/* Scène 05 (8 → 10 s) — COMMENT (simple) : « Tu nous écris. → On crée. → C’est en ligne. »
   Respiration papier : une ligne masquée change à chaque temps pendant qu’un site se monte dans une fenêtre ;
   clic sur « Publier » à 9,0 ; écrasement en ligne encre à 9,625 ; paupière sur la nuit 9,8 → 10,0.
   Tout est en délais ABSOLUS (WAAPI) ; trajectoires échantillonnées ; confettis dessinés par onSeek. */
const S = $(".s05");
const ms = s => Math.round(s * 1000);
const A = (el, kf, t0, dur, easing = "linear", fill = "both") =>
  el.animate(kf, { delay: ms(t0), duration: ms(dur), easing, fill });
/* K(el, [[t, props, easingVersLeSuivant], ...]) : chronologie à instants absolus dans UNE animation */
const K = (el, steps, fill = "both") => {
  const t0 = steps[0][0], d = steps[steps.length - 1][0] - t0;
  const kf = steps.map(([t, p, e]) => Object.assign({}, p, { offset: (t - t0) / d, easing: e || "linear" }));
  return el.animate(kf, { delay: ms(t0), duration: ms(d), fill });
};
const bez = (x1, y1, x2, y2) => {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = s => ((ax * s + bx) * s + cx) * s, Yb = s => ((ay * s + by) * s + cy) * s;
  return p => {
    if (p <= 0) return 0; if (p >= 1) return 1;
    let lo = 0, hi = 1, s = p;
    for (let i = 0; i < 40; i++) { if (X(s) < p) lo = s; else hi = s; s = (lo + hi) / 2; }
    return Yb(s);
  };
};
const EX = bez(.16, 1, .3, 1), E2 = bez(.7, 0, .2, 1), BO = bez(.34, 1.56, .64, 1), IO = bez(.45, 0, .55, 1);
const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, p) => a + (b - a) * p;
const f2 = v => (+v).toFixed(2);
const BOc = "cubic-bezier(.34,1.56,.64,1)", EXc = "cubic-bezier(.16,1,.3,1)", E2c = "cubic-bezier(.7,0,.2,1)",
  Ec = "cubic-bezier(.2,.8,.2,1)", IOc = "cubic-bezier(.45,0,.55,1)";
const SR = 120;
const samp = (el, fn, t0, t1, fill = "both") => {
  const n = Math.max(1, Math.round((t1 - t0) * SR)), kf = [];
  for (let i = 0; i <= n; i++) kf.push(fn(t0 + (t1 - t0) * i / n));
  return A(el, kf, t0, t1 - t0, "linear", fill);
};
const id = n => document.getElementById("s05-" + n);

/* ================= DÉCOR PAPIER ================= */
/* la grille de points se révèle en cercle depuis le centre de l’iris de S4 (485, 1000), puis glisse */
$$(".s05-dots", S).forEach(el => {
  K(el, [[8.0, { clipPath: "circle(0px at 525px 1040px)" }, EXc], [8.55, { clipPath: "circle(1500px at 525px 1040px)" }]]);
  K(el, [[8.0, { transform: "translate(0px,0px)" }], [10.0, { transform: "translate(-12px,-40px)" }]]);
});
$$(".s05-glow", S).forEach(el => {
  K(el, [[8.0, { transform: "translate(0px,30px) scale(.8)" }, "cubic-bezier(.3,.6,.4,1)"], [10.0, { transform: "translate(0px,-40px) scale(1.06)" }]]);
  K(el, [[8.0, { opacity: 0 }, "cubic-bezier(.3,0,.4,1)"], [8.5, { opacity: 1 }]]);
});

/* ================= CAMÉRA : dérive permanente + coup au clic ================= */
K(id("cam"), [[8.0, { transform: "translate(6px,18px) scale(1) rotate(-.6deg)" }, IOc],
  [9.8, { transform: "translate(-6px,-14px) scale(1.04) rotate(.5deg)" }]]);
K(id("kick"), [[8.5, { transform: "scale(1)" }, "cubic-bezier(.2,.9,.3,1)"], [8.56, { transform: "scale(1.006)" }, IOc],
  [8.8, { transform: "scale(1)" }],
  [9.0, { transform: "scale(1)" }, "cubic-bezier(.2,.9,.3,1)"], [9.07, { transform: "scale(1.022)" }, "cubic-bezier(.4,0,.3,1)"],
  [9.45, { transform: "scale(1)" }]]);

/* ================= LIGNE MASQUÉE : poussée verticale sur chaque temps ================= */
const IN = "translateY(120%)", ON = "translateY(0%)", OUT = "translateY(-120%)";
K(id("l1"), [[8.0, { transform: IN }, EXc], [8.25, { transform: ON }], [8.5, { transform: ON }, EXc], [8.75, { transform: OUT }]]);
K(id("l2"), [[8.5, { transform: IN }, EXc], [8.75, { transform: ON }], [9.0, { transform: ON }, EXc], [9.25, { transform: OUT }]]);
K(id("l3"), [[9.0, { transform: IN }, EXc], [9.25, { transform: ON }]]);

/* ================= FENÊTRE ================= */
const win = id("win");
K(win, [[8.0, { transform: "translateY(1900px) rotateX(26deg) scale(.9)" }, "cubic-bezier(.18,.9,.25,1)"],
  [8.42, { transform: "translateY(0px) rotateX(0deg) scale(1)" }]]);
/* lente dérive 3D de la fenêtre (parallaxe) */
K(id("wtilt"), [[8.0, { transform: "rotateY(-5deg) rotateX(2deg)" }, IOc], [9.8, { transform: "rotateY(4deg) rotateX(-1.5deg)" }]]);
/* contour lime au clic (box-shadow : autre propriété) */
const SH = "0 40px 80px rgba(60,40,140,.18)";
K(win, [[9.0, { boxShadow: `${SH},0 0 0 0px rgba(200,255,62,1)` }, EXc],
  [9.1, { boxShadow: `${SH},0 0 0 10px rgba(200,255,62,1)` }, "cubic-bezier(.4,0,.6,1)"],
  [9.4, { boxShadow: `${SH},0 0 0 22px rgba(200,255,62,0)` }]]);

/* 4 blocs gris qui tombent : les impacts (« tocs ») tombent sur 8,50 / 8,56 / 8,62 / 8,68 */
const drop = (el, ti) => { const t = ti - .155; K(el, [
  [t, { transform: "translateY(-700px) scale(1,1)" }, "cubic-bezier(.55,0,.9,.5)"],
  [ti, { transform: "translateY(0px) scale(1.04,.9)" }, "cubic-bezier(.2,.7,.4,1)"],
  [t + .2, { transform: "translateY(-18px) scale(.98,1.03)" }, IOc],
  [t + .25, { transform: "translateY(0px) scale(1,1)" }]]); };
drop(id("b1"), 8.5); drop(id("b2"), 8.56); drop(id("b3"), 8.62); drop(id("b4"), 8.68); drop(id("b5"), 8.71);
/* onde « message reçu » là où la bulle se pose */
K(id("rip"), [[8.46, { transform: "scale(.15)", opacity: 1 }, Ec], [8.74, { transform: "scale(1.6)", opacity: 0 }]], "forwards");

/* la vraie maquette balaie 8,80 → 9,00 puis défile */
const img = id("img");
K(img, [[8.8, { clipPath: "inset(0% 100% 0% 0%)" }, E2c], [9.0, { clipPath: "inset(0% 0% 0% 0%)" }]]);
K(img, [[9.08, { transform: "translateY(0px)" }, "cubic-bezier(.45,0,.35,1)"], [9.9, { transform: "translateY(-240px)" }]]);
const sw = id("sw");
K(sw, [[8.8, { transform: "translateX(0px)" }, E2c], [9.0, { transform: "translateX(750px)" }]]);
K(sw, [[8.8, { opacity: 1 }], [8.98, { opacity: 1 }], [9.02, { opacity: 0 }]], "forwards");

/* barre d’adresse : progression pendant la création, cadenas qui passe au lime à 9,0 */
K(id("pf"), [[8.5, { transform: "scaleX(0)" }, "cubic-bezier(.3,.5,.4,1)"], [8.97, { transform: "scaleX(.8)" }],
  [9.0, { transform: "scaleX(.8)" }, EXc], [9.12, { transform: "scaleX(1)" }]]);
K(id("pf"), [[9.0, { backgroundColor: "#c8ff3e" }], [9.05, { backgroundColor: "#c8ff3e" }]], "forwards");
K(id("lkf"), [[9.0, { fill: "#c8ff3e", stroke: "#0b0b10", strokeWidth: "1.6px" }], [9.05, { fill: "#c8ff3e", stroke: "#0b0b10", strokeWidth: "1.6px" }]], "forwards");
K($(".s05-lkb", S), [[9.0, { stroke: "#0b0b10" }], [9.05, { stroke: "#0b0b10" }]], "forwards");
K(id("lock"), [[9.0, { transform: "scale(1)" }, EXc], [9.08, { transform: "scale(1.4)" }, IOc], [9.3, { transform: "scale(1)" }]]);

/* ================= BULLE : pop (8,00) puis s’envole dans la fenêtre (8,30 → 8,50) ================= */
samp(id("bub"), t => {
  const s = BO(cl((t - 8) / .25)), q = E2(cl((t - 8.3) / .2));
  /* arc : on monte d’abord, puis on plonge vers le milieu de la fenêtre */
  const x = 2 * (1 - q) * q * 40 + q * q * 260, y = 2 * (1 - q) * q * -470 + q * q * -480;
  const sc = s * lerp(1, .2, q), rot = lerp(0, 14, q);
  return { transform: `translate(${f2(x)}px,${f2(y)}px) rotate(${f2(rot)}deg) scale(${sc.toFixed(4)})`, opacity: f2(1 - q * q) };
}, 8.0, 8.5);

/* ================= BOUTON « Publier » ================= */
K(id("btn"), [[8.5, { transform: "scale(0)" }, BOc], [8.8, { transform: "scale(1)" }]]);
K(id("btnp"), [[9.0, { transform: "scale(1)" }, "cubic-bezier(.3,0,.5,1)"], [9.06, { transform: "scale(.92)" }, EXc],
  [9.22, { transform: "scale(1)" }], [9.5, { transform: "scale(1)" }, "cubic-bezier(.3,0,.4,1)"],
  [9.56, { transform: "scale(1.15)" }, IOc], [9.66, { transform: "scale(1)" }]]);
K(id("btnb"), [[9.06, { left: "0px", width: "360px" }, E2c], [9.18, { left: "125px", width: "110px" }]]);
K(id("btnt"), [[9.0, { opacity: 1, transform: "scale(1)" }, "cubic-bezier(.4,0,.7,1)"], [9.06, { opacity: 0, transform: "scale(.82)" }]]);
const spin = id("spin");
K(spin, [[9.18, { opacity: 1 }], [9.3, { opacity: 1 }], [9.301, { opacity: 0 }]], "forwards");
K(spin, [[9.18, { transform: "rotate(-90deg)" }, "cubic-bezier(.3,0,.6,1)"], [9.3, { transform: "rotate(330deg)" }]]);
K(id("chk"), [[9.3, { opacity: 1 }], [9.35, { opacity: 1 }]], "forwards");
K(id("chkp"), [[9.3, { strokeDashoffset: "72px" }, "cubic-bezier(.5,0,.3,1)"], [9.42, { strokeDashoffset: "0px" }]]);

/* ================= CURSEUR ================= */
const P0 = [1140, 1760], PC = [800, 1480], P1 = [520, 1365], P2 = [590, 1450];
samp(id("cur"), t => {
  let x, y;
  if (t < 9.1) {
    const q = bez(.45, 0, .15, 1)(cl((t - 8.42) / .53));
    x = (1 - q) * (1 - q) * P0[0] + 2 * (1 - q) * q * PC[0] + q * q * P1[0];
    y = (1 - q) * (1 - q) * P0[1] + 2 * (1 - q) * q * PC[1] + q * q * P1[1];
  } else {
    const q = IO(cl((t - 9.1) / .5));
    x = lerp(P1[0], P2[0], q); y = lerp(P1[1], P2[1], q);
  }
  return { transform: `translate(${f2(x)}px,${f2(y)}px)` };
}, 8.4, 9.65);
K(id("curk"), [[9.0, { transform: "scale(1)" }, "cubic-bezier(.3,0,.6,1)"], [9.06, { transform: "scale(.82)" }, BOc], [9.16, { transform: "scale(1)" }]]);
K(id("crg"), [[9.0, { transform: "scale(.15)", opacity: 1 }, Ec], [9.36, { transform: "scale(1)", opacity: 0 }]], "forwards");

/* ================= CONFETTIS (canvas, 9 ≤ t < 10) ================= */
const cv = id("cf"), g = cv.getContext("2d");
const COLS = ["#c8ff3e", "#7c5cff", "#0b0b10", "#ff4d6d"];
const R = mkRnd(50), PARTS = [];
for (let i = 0; i < 120; i++) {
  const a = (-90 + (R() * 2 - 1) * 62) * Math.PI / 180, v = (600 + R() * 800) * 1.55;
  PARTS.push({
    x0: 485 + Math.cos(a) * 40, y0: 1345 + Math.sin(a) * 40,
    vx: Math.cos(a) * v, vy: Math.sin(a) * v,
    k: .8 + R() * .9,                     // traînée de l’air
    r0: R() * Math.PI * 2, vr: (R() * 2 - 1) * 14,
    fl: 8 + R() * 10, ph: R() * 6.28,      // retournement (papier qui tourne)
    w: 11 + R() * 4, h: 18 + R() * 6, c: COLS[i % 4], d: R() * .04
  });
}
const G = 2400;
onSeek(t => {
  g.clearRect(0, 0, 1080, 1920);
  if (t < 9 || t >= 10) return;
  for (const p of PARTS) {
    const u = t - 9 - p.d; if (u < 0 || u > 1) continue;
    const e = 1 - Math.exp(-p.k * u), gk = G / p.k;
    const x = p.x0 + p.vx * e / p.k + Math.sin(u * 7 + p.ph) * 10 * u;
    const y = p.y0 + gk * u + (p.vy - gk) * e / p.k;
    const sy = Math.cos(p.ph + u * p.fl);
    g.save(); g.translate(x, y); g.rotate(p.r0 + p.vr * u); g.scale(1, Math.abs(sy) < .12 ? .12 * Math.sign(sy || 1) : sy);
    g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore();
  }
});

/* ================= ÉCRASEMENT 9,625 → 9,80 ================= */
const crush = id("crush");
K(crush, [[9.625, { transform: "scale(1,1)" }, E2c], [9.775, { transform: "scale(1.15,.02)" }, "cubic-bezier(.4,0,1,1)"],
  [9.8, { transform: "scale(1.15,.002)" }]]);
K(crush, [[9.8, { opacity: 0 }], [9.81, { opacity: 0 }]], "forwards");
const seam = id("seam"), halves = $$(".s05-sh", S);
[seam, ...halves].forEach(el => {
  K(el, [[9.7, { transform: "scaleX(.6)" }, EXc], [9.8, { transform: "scaleX(1)" }]]);
});
K(seam, [[9.7, { opacity: 1 }], [9.8, { opacity: 1 }], [9.801, { opacity: 0 }]], "forwards");
halves.forEach(el => K(el, [[9.7, { opacity: 1 }], [9.75, { opacity: 1 }]], "forwards"));

/* ================= PAUPIÈRE 9,80 → 10,00 ================= */
K(id("lidT"), [[9.8, { transform: "translateY(0px)" }, E2c], [10.0, { transform: "translateY(-980px)" }]]);
K(id("lidB"), [[9.8, { transform: "translateY(0px)" }, E2c], [10.0, { transform: "translateY(980px)" }]]);
