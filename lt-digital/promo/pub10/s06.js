/* Scène 06 (10 → 12 s) — MONTÉE / SUSPENSE : « Et ça coûte COMBIEN ? »
   10,00 « Et ça coûte » monte lettre à lettre, le vortex s’ouvre et accélère.
   10,50 SLAM de COMBIEN (respire en largeur/graisse, 2 Hz puis 4 Hz, tremble, aberration).
   10,625 le « ? » tombe, atterrit à 10,75, rebondit (10,905) et se pose sur 11,0 ; le crochet fait ressort.
   11,50 tout est aspiré dans le point ; 11,60 → 11,75 le point glisse en (485, 960) et passe à Ø 60.
   11,75 → 12,00 LE TROU : nuit, le point lime tremble seul dans un anneau fin.
   Tout est en délais ABSOLUS (WAAPI échantillonnées) ou recalculé par onSeek à partir de t seul. */
const id = n => document.getElementById("s06-" + n);
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
const EX = bez(.16, 1, .3, 1), E2 = bez(.7, 0, .2, 1), E = bez(.2, .8, .2, 1), IO = bez(.45, 0, .55, 1);
const RB = bez(.55, 0, 1, .45);         // accélération des anneaux
const PU = bez(.55, 0, .75, 1);         // push caméra (accélère jusqu’à ~11,5 puis se pose)
const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, p) => a + (b - a) * p;
const f3 = v => (+v).toFixed(3);
const BOc = "cubic-bezier(.34,1.56,.64,1)", Ec = "cubic-bezier(.2,.8,.2,1)";
const SR = 120;                         // échantillons WAAPI par seconde
const samp = (el, fn, t0, t1, fill = "both") => {
  const n = Math.max(1, Math.round((t1 - t0) * SR)), kf = [];
  for (let i = 0; i <= n; i++) kf.push(fn(t0 + (t1 - t0) * i / n));
  return A(el, kf, t0, t1 - t0, "linear", fill);
};
/* tirage déterministe par image (on jette les premières valeurs : graines voisines → valeurs voisines) */
const rnd = seed => { const r = mkRnd(seed * 7919 + 17); r(); r(); r(); return r; };

/* ---- point lime : centre local D(t) — (493, 1070) puis glisse en (485, 960) de 11,60 à 11,75 ---- */
const D = t => { const p = E2(cl((t - 11.6) / .15)); return [lerp(493, 485, p), lerp(1070, 960, p)]; };
const CAMS = 1.06;                      // échelle caméra finale (le point fait Ø 60 À L’ÉCRAN)
/* ---- aspiration ---- */
/* courbe : accélération continue (u^2,6) plutôt que (.7,0,.84,0) qui garde tout immobile puis vide l’écran en 2 images.
   Spirale : l’élément orbite AUTOUR du point en rapetissant → X ↦ D + R(orb·e)·(1−e)·(X − D), et tourne sur lui-même de 140°.
   Textes : orbite 70° seulement (sinon ils sortent à droite de x = 900 pendant l’aspiration) ; anneaux : 140°.
   Anticipation : 0,1 s avant son départ, l’élément « inspire » (+3,5 %). */
const SUe = u => Math.pow(cl(u), 2.6);
const spiral = (C, t, e, pre = 1, rot = 140, orb = rot) => {
  const d = D(t), s = Math.max(.0001, pre * (1 - e)), a = orb * e * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
  const vx = C[0] - d[0], vy = C[1] - d[1];
  const tx = d[0] + s * (c * vx - sn * vy) - C[0], ty = d[1] + s * (sn * vx + c * vy) - C[1];
  return { tx, ty, s, deg: rot * e };
};

/* ================= CAMÉRA (origine 485/960 = point fixe) ================= */
samp(id("cam"), t => {
  const s = 1 + (CAMS - 1) * PU(cl((t - 10) / 1.75));
  const r = -0.8 + 1.9 * IO(cl((t - 10) / 2));
  return { transform: `rotate(${f3(r)}deg) scale(${(s).toFixed(4)})` };
}, 10, 12);
/* coups : slam (10,6) en échelle, atterrissages (10,75 / 10,905 / 11,0) en vertical */
samp(id("kick"), t => {
  let s = 1, y = 0;
  const k0 = t - 10.58; if (k0 > 0) s += 0.024 * Math.sin(Math.min(1, k0 / .05) * Math.PI / 2) * Math.exp(-Math.max(0, k0 - .05) / .07);
  for (const [ti, a] of [[10.75, 13], [10.905, 5], [11.0, 2.5]]) {
    const k = t - ti; if (k > 0) y += a * Math.exp(-k / .055) * Math.sin(2 * Math.PI * k / .11);
  }
  return { transform: `translate(0px,${f3(y)}px) scale(${(s).toFixed(4)})` };
}, 10, 11.5);

/* ================= LUEUR VIOLETTE ================= */
/* descend de (485, 900) [raccord S5] à (485, 960), grossit pendant le riser, puis est aspirée dans le point */
samp(id("glow"), t => {
  const cy = 900 + 60 * E(cl((t - 10) / .5)), cx = 485;
  let g = 1 + .14 * Math.pow(cl((t - 11) / .5), 2), x = cx, y = cy, o = 1;
  if (t > 11.5) {
    const e = SUe((t - 11.5) / .22), d = D(t);
    x = lerp(cx, d[0], e); y = lerp(cy, d[1], e); g *= Math.max(.0001, 1 - e); o = 1 - cl((e - .6) / .4);
  }
  return { transform: `translate(${f3(x - 485)}px,${f3(y - 900)}px) scale(${g.toFixed(4)})`, opacity: f3(o) };
}, 10, 11.75);
/* pulse : 1 sur chaque temps (10 / 10,5 / 11), puis sur chaque croche (11,25 / 11,5) ; creux à .6 */
(() => {
  const B = [10, 10.5, 11, 11.25, 11.5], lo = [.6, .6, .62, .66], st = [];
  B.forEach((b, i) => {
    st.push([b, { opacity: 1 }, "cubic-bezier(.25,.7,.4,1)"]);
    if (i < B.length - 1) st.push([B[i + 1] - 2 / 30, { opacity: lo[i] }, "cubic-bezier(.5,0,.8,.6)"]);
  });
  st.push([11.75, { opacity: .7 }]);
  K(id("glowp"), st);
})();

/* ================= VORTEX : 3 anneaux de texte (canvas, flou de bougé) ================= */
const RINGS = [{ r: 360, n: 11, dir: 1, w: 1 }, { r: 520, n: 16, dir: -1, w: .9 }, { r: 700, n: 22, dir: 1, w: .8 }];
const WORD = "COMBIEN ? ";
const FONT = '500 34px "DM Mono"';
try { document.fonts.load(FONT); } catch (e) { }
/* angle (degrés) : 0 → courbe (.55,0,1,.45) sur 10,0 → 11,5 (900° visés), vitesse plafonnée à OMAX
   pour que le texte file en traînées au lieu de « stroboscoper » ; continue à OMAX pendant l’aspiration */
const OMAX = 1300, NT = 2001, TH = new Float64Array(NT);
{
  let acc = 0, prev = 0;
  for (let i = 1; i < NT; i++) {
    const tb = 10 + i / 1000, cur = 900 * RB(cl((tb - 10) / 1.5));
    const w = tb <= 11.5 ? Math.min((cur - prev) * 1000, OMAX) : OMAX;
    prev = cur; acc += w / 1000; TH[i] = acc;
  }
}
const theta = t => {
  if (t <= 10) return 0;
  const x = (t - 10) * 1000, i = Math.floor(x);
  if (i >= NT - 1) return TH[NT - 1] + OMAX * (t - 12);
  return TH[i] + (TH[i + 1] - TH[i]) * (x - i);
};
let sprites = null, spritesOk = false;
const mkSprites = () => {
  spritesOk = document.fonts.check(FONT);
  sprites = RINGS.map(R => {
    const h = R.r + 30, c = document.createElement("canvas"); c.width = c.height = 2 * h;
    const x = c.getContext("2d"); x.font = FONT; x.fillStyle = "#fff"; x.textAlign = "center"; x.textBaseline = "alphabetic";
    const txt = WORD.repeat(R.n), N = txt.length;
    for (let k = 0; k < N; k++) {
      const ch = txt[k]; if (ch === " " || ch === " ") continue;
      x.save(); x.translate(h, h); x.rotate(k / N * Math.PI * 2); x.fillText(ch, 0, -R.r + 12); x.restore();
    }
    return c;
  });
};
const vx = id("vx"), vctx = vx.getContext("2d");
const ringState = (R, i, t) => {
  const ts = 10 + .07 * i, p = cl((t - ts) / .5);
  let s = .5 + .5 * EX(p), a = EX(cl((t - ts) / .3)), cx = 485, cy = 960, ang = R.dir * theta(t);
  if (t > 11.5) {
    const k = spiral([485, 960], t, SUe((t - 11.5) / .2));
    cx = 485 + k.tx; cy = 960 + k.ty; s *= k.s; ang += k.deg;
  }
  return { s, a, cx, cy, ang };
};
const SH = 1 / 120;                     // obturateur 90° (texte lisible au départ, traînées à pleine vitesse)
onSeek(t => {
  vctx.setTransform(1, 0, 0, 1, 0, 0); vctx.clearRect(0, 0, 1080, 1920);
  if (t < 10 || t >= 11.7) return;
  if (!sprites || (!spritesOk && document.fonts.check(FONT))) mkSprites();
  vctx.globalCompositeOperation = "lighter";
  RINGS.forEach((R, i) => {
    const h = R.r + 30, s0 = ringState(R, i, t), s1 = ringState(R, i, t - SH);
    const mv = Math.abs(s0.ang - s1.ang) * Math.PI / 180 * R.r * s0.s + Math.abs(s0.s - s1.s) * R.r + Math.hypot(s0.cx - s1.cx, s0.cy - s1.cy);
    const N = Math.max(1, Math.min(48, Math.ceil(mv / 2.5)));
    /* le texte étalé par le flou perd de la densité : on « charge » l’anneau avec la vitesse (×1,6 au maximum) */
    const boost = 1 + .6 * cl(Math.abs(s0.ang - s1.ang) / SH / OMAX);
    for (let k = 0; k < N; k++) {
      const st = N === 1 ? s0 : ringState(R, i, t - SH * k / (N - 1));
      if (st.s <= .001 || st.a <= 0) continue;
      const c = Math.cos(st.ang * Math.PI / 180) * st.s, sn = Math.sin(st.ang * Math.PI / 180) * st.s;
      vctx.setTransform(c, sn, -sn, c, st.cx, st.cy);
      vctx.globalAlpha = Math.min(1, R.w * boost * st.a / N);
      vctx.drawImage(sprites[i], -h, -h);
    }
  });
  vctx.globalAlpha = 1; vctx.globalCompositeOperation = "source-over";
});

/* ================= ASPIRATION (11,50 → 11,75) : spirale vers le point, rotation 140°, échelle 0 ================= */
const suck = (C, t0, dur, pa = .035) => t => {
  const e = SUe((t - t0) / dur), pre = 1 + pa * E(cl((t - t0 + .1) / .1));
  const k = spiral(C, t, e, pre, 140, 70);
  return {
    transform: `translate(${f3(k.tx)}px,${f3(k.ty)}px) rotate(${f3(k.deg)}deg) scale(${k.s.toFixed(4)})`,
    opacity: f3(1 - cl((e - .7) / .3))
  };
};

/* ================= « Et ça coûte » ================= */
split(id("ett"), 10.0, .03);
samp(id("etca"), suck([485.5, 495], 11.52, .23), 11.42, 11.75, "forwards");
const etm = $(".s06-etm");

/* ================= COMBIEN ================= */
const cw = id("cw"), cw2 = id("cw2"), LB = $$(".s06-lb");
A(cw, [{ transform: "scale(2.4)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }], 10.5, .3, BOc, "both");
LB.forEach(el => A(el, [{ filter: "blur(14px)" }, { filter: "blur(0px)" }], 10.5, .3, Ec, "both"));
samp(id("cws"), suck([485.5, 685], 11.56, .19, .02), 11.46, 11.75, "forwards");   // +2 % seulement : reste dans x 70–900

/* ================= « ? » : chute, atterrissage, rebonds ================= */
/* hauteur Y(t) (px, négatif = en l’air), vitesse pour l’étirement, ressort d’écrasement après chaque contact */
const FALL0 = 10.625, LAND1 = 10.75, UP1 = 10.775, LAND2 = 10.905, UP2 = 10.92, LAND3 = 11.0, H0 = 1150, H1 = 84, H2 = 22;
const qY = t => {
  if (t <= FALL0) return -H0;
  if (t < LAND1) { const u = (t - FALL0) / (LAND1 - FALL0); return -H0 * (1 - u * u); }
  if (t < UP1) return 0;
  if (t < LAND2) { const p = (t - UP1) / (LAND2 - UP1); return -H1 * 4 * p * (1 - p); }
  if (t < UP2) return 0;
  if (t < LAND3) { const p = (t - UP2) / (LAND3 - UP2); return -H2 * 4 * p * (1 - p); }
  return 0;
};
samp(id("qf"), t => {
  const y = qY(t), v = Math.abs(qY(t + .002) - qY(t - .002)) / .004;     // px/s
  let st = .2 * Math.min(1, v / 18400);                                   // étirement (vitesse)
  let sq = 0;
  for (const [ti, a] of [[LAND1, .2], [LAND2, .1], [LAND3, .045]]) {
    const k = t - ti; if (k >= 0) sq += a * Math.exp(-k / .04) * Math.cos(2 * Math.PI * k / .1);
  }
  const sx = 1 + .6 * sq - .45 * st, sy = 1 - sq + st;
  const rot = t < LAND1 ? -6 * Math.pow(1 - cl((t - FALL0) / (LAND1 - FALL0)), 2) : 0;
  return { transform: `translate(0px,${f3(y)}px) rotate(${f3(rot)}deg) scale(${sx.toFixed(4)},${sy.toFixed(4)})` };
}, 10.6, 11.2);
K(id("qf"), [[10.625, { opacity: 1 }], [10.64, { opacity: 1 }]], "forwards");
/* crochet : ressort autour du point après l’atterrissage (« boing ») */
samp(id("qw"), t => {
  const k = t - LAND1;
  const r = k <= 0 ? 0 : 8 * Math.exp(-k / .2) * Math.sin(2 * Math.PI * k / .24) * cl(1 - (t - 11.4) / .1);
  return { transform: `rotate(${f3(r)}deg)` };
}, 10.75, 11.5);
samp(id("q"), suck([493, 910], 11.62, .13), 11.52, 11.75, "forwards");
/* ondes au sol (ellipses) */
K(id("rip"), [[LAND1, { width: "90px", height: "26px", borderWidth: "6px", opacity: .75 }, Ec],
  [LAND1 + .42, { width: "520px", height: "140px", borderWidth: "1px", opacity: 0 }]], "forwards");
K(id("rip2"), [[LAND2, { width: "90px", height: "26px", borderWidth: "4px", opacity: .45 }, Ec],
  [LAND2 + .3, { width: "300px", height: "82px", borderWidth: "1px", opacity: 0 }]], "forwards");

/* ================= LE POINT ================= */
/* 11,50 inspire (Ø 84 → 92), 11,60 → 11,75 glisse en (485, 960) et passe à Ø 60 à l’écran */
samp(id("dot"), t => {
  const d = D(t);
  let s = 1 + .1 * E(cl((t - 11.5) / .1));
  s = lerp(s, 60 / CAMS / 84, E2(cl((t - 11.6) / .15)));
  return { transform: `translate(${f3(d[0] - 493)}px,${f3(d[1] - 1070)}px) scale(${s.toFixed(4)})` };
}, 11.5, 11.75);
/* battement de sub à 11,875 */
K(id("dotc"), [[11.875, { transform: "scale(1)" }, "cubic-bezier(.2,.8,.3,1)"], [11.91, { transform: "scale(1.14)" }, "cubic-bezier(.4,0,.4,1)"],
  [12.0, { transform: "scale(1)" }]]);
K(id("dh"), [[11.6, { opacity: 0 }], [11.75, { opacity: .8 }], [11.875, { opacity: .8 }, Ec], [11.91, { opacity: 1 }], [12.0, { opacity: .75 }]], "forwards");
/* anneau du trou */
K(id("hole"), [[11.75, { transform: "scale(1)" }, Ec], [12.0, { transform: "scale(1.3)" }]], "forwards");
K(id("hole"), [[11.75, { opacity: 0 }], [11.8, { opacity: 1 }]], "forwards");

/* ================= onSeek : respiration, tremblements, aberration ================= */
const qg = id("qg"), dotc = id("dotc");
onSeek(t => {
  const f = Math.round(t * 30);
  /* COMBIEN respire : 2 Hz (10,5 → 11) puis 4 Hz, jusqu’à sa disparition */
  const on = t >= 10.5 && t < 11.75;
  const phi = t <= 11 ? 4 * Math.PI * (t - 10.5) : 2 * Math.PI + 8 * Math.PI * (t - 11);
  LB.forEach((el, i) => {
    el.style.fontStretch = on ? (75 + 6 * Math.sin(phi - .6 * i)).toFixed(2) + "%" : "75%";
    el.style.fontWeight = on ? (825 + 75 * Math.sin(phi - .6 * i + 1)).toFixed(1) : "825";
  });
  /* tremblement + aberration (≤ 4 px) */
  const Am = on ? Math.min(4, 4 * (t - 10.5)) : 0;
  if (on) {
    const r = rnd(1000 + f);
    cw2.style.translate = `${f3((r() * 2 - 1) * Am)}px ${f3((r() * 2 - 1) * Am)}px`;
    cw2.style.textShadow = `${f3(-Am)}px 0 #19c6b0, ${f3(Am)}px 0 #ff4d6d`;
  } else { cw2.style.translate = "0px 0px"; cw2.style.textShadow = "none"; }
  /* le riser fait aussi vibrer « Et ça coûte » et le crochet (moitié moins) */
  const Ah = t >= 11 && t < 11.75 ? Math.min(2, 4 * (t - 11)) : 0;
  if (Ah > 0) {
    const r = rnd(3000 + f), r2 = rnd(4000 + f);
    etm.style.translate = `${f3((r() * 2 - 1) * Ah)}px ${f3((r() * 2 - 1) * Ah)}px`;
    qg.style.translate = `${f3((r2() * 2 - 1) * Ah)}px ${f3((r2() * 2 - 1) * Ah)}px`;
  } else { etm.style.translate = "0px 0px"; qg.style.translate = "0px 0px"; }
  /* LE TROU : le point tremble de ±2 px (à l’écran) */
  if (t >= 11.75 && t < 12) {
    const r = rnd(5000 + f), a = 2 / CAMS;
    dotc.style.translate = `${f3((r() * 2 - 1) * a)}px ${f3((r() * 2 - 1) * a)}px`;
  } else dotc.style.translate = "0px 0px";
});
