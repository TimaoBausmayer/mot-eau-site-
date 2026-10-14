/* Scène 04 (6 → 8 s) — survol en drone d’un mur de 16 vrais sites ; le point lime saute de tuile en tuile ;
   « Un style / pour chaque / MÉTIER. » ; vague de tuiles à 7,0 ; iris papier bordé de lime 7,75 → 8,0.
   Tout est en délais ABSOLUS. Les trajectoires sont des fonctions de t échantillonnées (120 /s) en WAAPI linéaire. */
const S = $(".s04");
const ms = s => Math.round(s * 1000);
const A = (el, kf, t0, dur, easing = "linear", fill = "both") =>
  el.animate(kf, { delay: ms(t0), duration: ms(dur), easing, fill });

/* courbes de Bézier (mêmes valeurs que base.css) évaluées en JS */
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
const OUT3 = p => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);
const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, p) => a + (b - a) * p;
const f2 = v => (+v).toFixed(2);
const BOc = "cubic-bezier(.34,1.56,.64,1)", EXc = "cubic-bezier(.16,1,.3,1)", E2c = "cubic-bezier(.7,0,.2,1)", Ec = "cubic-bezier(.2,.8,.2,1)";

/* échantillonnage d'une fonction du temps → keyframes linéaires */
const SR = 120;
const samp = (el, fn, t0, t1, fill = "both") => {
  const n = Math.max(1, Math.round((t1 - t0) * SR)), kf = [];
  for (let i = 0; i <= n; i++) kf.push(fn(t0 + (t1 - t0) * i / n));
  return A(el, kf, t0, t1 - t0, "linear", fill);
};

/* ================= CAMÉRA (identique sur les plateaux A et B) ================= */
const DY = 280;                                                   // le mur est posé un peu plus bas dans le cadre
const slideP = t => EX(cl((t - 6) / .35));                        // fin du whip : arrive de la droite et freine
const Yf = t => -700 + 400 * (t - 6) + 60 * (1 - Math.exp(-(t - 6) / .12));  // vol vers l'avant : élan puis croisière
const Xf = t => 230 * bez(.42, 0, .38, 1)(cl((t - 6.12) / 1.88)); // la caméra suit le point vers la gauche
const RZ = t => t < 7.5 ? lerp(-6, 4, IO(cl((t - 6) / 1.5))) : lerp(4, -2, IO(cl((t - 7.5) / .5)));
const RX = t => t < 7 ? 0 : t < 7.07 ? 3 * OUT3((t - 7) / .07) : 3 * (1 - IO(cl((t - 7.07) / .45)));

const camSlide = t => { const e = slideP(t); return { transform: `translateX(${f2(1400 * (1 - e))}px) skewX(${f2(-12 * (1 - e))}deg)` }; };
const camRoll = t => ({ transform: `rotateZ(${RZ(t).toFixed(3)}deg) rotateX(${RX(t).toFixed(3)}deg)` });
const camFly = t => ({ transform: `translate3d(${f2(Xf(t))}px,${DY}px,-700px) rotateX(58deg) translateY(${f2(Yf(t))}px)` });
$$(".s04-slide", S).forEach(el => samp(el, camSlide, 6, 6.5));
$$(".s04-roll", S).forEach(el => samp(el, camRoll, 6, 8));
$$(".s04-fly", S).forEach(el => samp(el, camFly, 6, 8));

/* flou de bougé horizontal sur les tuiles pendant l'arrivée du whip */
const mbg = $("#s04-mbg");

/* ================= LE MUR : 16 tuiles 4 × 4 ================= */
const NAMES = ["restaurant", "boutique", "barbier", "coach", "artisan", "fromagerie", "pizzeria", "boucherie",
  "boulangerie", "fleuriste", "garage", "plombier", "esthetique", "photographe", "cave", "tatoueur"];
const fly = $("#s04-fly"), flyB = $("#s04-flyb");
const CTR = (r, c) => [202.5 + 445 * c, 394 + 828 * r];          // centre d'une tuile (repère du mur)
const ORIGIN = [2, 0];                                            // boulangerie : départ de la vague
const JUMP = { pizzeria: 6.25, garage: 6.5, fleuriste: 6.75 };   // tuiles où le point rebondit
const WAVE0 = 7.0, WDT = .035;

const jumpLift = (t, tl) => {
  const u = t - tl; if (u < 0) return 0;
  if (u < .2) return 60 * BO(u / .2);
  if (u < .3) return 60;
  if (u < .55) return 60 * (1 - IO((u - .3) / .25));
  return 0;
};
const waveLift = (t, d) => {
  const u = (t - (WAVE0 + WDT * d)) / .45; if (u < 0) return 0; if (u >= 1) return 40;
  return u < .32 ? 110 * OUT3(u / .32) : 110 - 70 * BO((u - .32) / .68);
};
const jumpGlow = (t, tl) => { const u = t - tl; return u < 0 ? 0 : u < .06 ? u / .06 : u < .25 ? 1 : u < .45 ? 1 - (u - .25) / .2 : 0; };
const waveGlow = (t, d) => { const u = t - (WAVE0 + WDT * d); return u < 0 ? 0 : u < .1 ? u / .1 : u < .22 ? 1 : u < .55 ? 1 - (u - .22) / .33 : 0; };
const shadowOf = I => I <= 0 ? "0 0 0 0px rgba(200,255,62,0), 0 0 0px 0px rgba(200,255,62,0)"
  : `0 0 0 ${f2(6 * I)}px rgba(200,255,62,${f2(I)}), 0 0 ${f2(60 * I)}px ${f2(4 * I)}px rgba(200,255,62,${f2(.5 * I)})`;

const TILES = {};
NAMES.forEach((n, k) => {
  const r = Math.floor(k / 4), c = k % 4, d = Math.hypot(r - ORIGIN[0], c - ORIGIN[1]);
  const el = document.createElement("div"); el.className = "s04-tile"; el.id = "s04-t-" + n;
  el.style.left = 445 * c + "px"; el.style.top = 828 * r + "px";
  el.style.backgroundImage = `url(../images/portfolio/${n}.jpg)`;
  el.style.setProperty("--sd", (WAVE0 + WDT * d + .04).toFixed(3) + "s");
  fly.append(el);
  const tl = JUMP[n];
  const lift = t => Math.max(tl ? jumpLift(t, tl) : 0, waveLift(t, d));
  const glow = t => Math.max(tl ? jumpGlow(t, tl) : 0, waveGlow(t, d));
  const t0 = tl ? tl - .02 : WAVE0;
  samp(el, t => ({ transform: `translateZ(${f2(lift(t))}px)` }), t0, 8);
  samp(el, t => ({ boxShadow: shadowOf(glow(t)) }), t0, 8);
  TILES[n] = { el, r, c, d, lift };
});

/* ================= LE POINT LIME ================= */
const LAND = [[6.25, "pizzeria"], [6.5, "garage"], [6.75, "fleuriste"], [7.0, "boulangerie"]].map(([t, n]) => {
  const T = TILES[n]; return { t, n, p: CTR(T.r, T.c), lift: T.lift };
});
const H0 = 31, HJ = 200;                                          // hauteur du centre au repos (rayon 36 × sin 58°), arc
const START = [CTR(1, 3)[0] + 140, CTR(1, 3)[1] - 330], Z0 = 360; // arrive du ciel, côté droit (suite du whip)
const dotState = t => {
  // renvoie {x, y, z} du centre de la balle (repère du mur)
  if (t < 6.25) {
    const p = cl((t - 6) / .25), L = LAND[0];
    return { x: lerp(START[0], L.p[0], p), y: lerp(START[1], L.p[1], p), z: H0 + (Z0 - H0) * (1 - p * p) };
  }
  if (t < 7.0) {
    const i = Math.min(2, Math.floor((t - 6.25) / .25)), a = LAND[i], b = LAND[i + 1], p = cl((t - a.t) / .25);
    return { x: lerp(a.p[0], b.p[0], p), y: lerp(a.p[1], b.p[1], p), z: H0 + HJ * 4 * p * (1 - p) };
  }
  const L = LAND[3];
  return { x: L.p[0], y: L.p[1], z: L.lift(t) + H0 };
};
const dotP = $("#s04-dotp"), dotS = $("#s04-dots");
samp(dotP, t => { const s = dotState(t); return { transform: `translate3d(${f2(s.x)}px,${f2(s.y)}px,${f2(s.z)}px)` }; }, 6, 7.2);
/* écrasement / étirement de la balle */
const squash = t => {
  let sx = 1, sy = 1;
  for (const L of LAND) {
    const u = t - L.t;
    if (u > -.07 && u < 0) { const k = 1 + u / .07; sy = 1 + .2 * k; sx = 1 - .1 * k; }
    else if (u >= 0 && u < .16 && L.t < 7) { const k = u / .16, a = Math.exp(-3 * k) * Math.cos(k * Math.PI * 1.6); sy = 1 - .38 * a; sx = 1 + .3 * a; }
  }
  if (t >= 7) {                                                    // dernier impact : la balle s'écrase et part dans la vague
    const u = t - 7;
    if (u < .045) { sx = 1.7; sy = .42; }
    else { const k = cl((u - .045) / .08); sx = 1.7 * (1 - E2(k)); sy = .42 * (1 - E2(k)); }
  }
  return { transform: `scale(${sx.toFixed(3)},${sy.toFixed(3)})` };
};
samp(dotS, squash, 6, 7.2);
A(dotS, [{ opacity: 1 }, { opacity: 1, offset: .55 }, { opacity: 0 }], 7.0, .13, "linear", "forwards");

/* ombre + flaque lime sous le point (plateau A, dans le plan de la tuile) */
{
  const shp = document.createElement("div"); shp.className = "s04-shp";
  shp.innerHTML = '<i class="s04-pool"></i><i class="s04-shd"></i>'; fly.append(shp);
  const surf = t => {
    if (t < 6.25) return 0;
    if (t < 7) { const i = Math.min(2, Math.floor((t - 6.25) / .25)), a = LAND[i], b = LAND[i + 1], p = cl((t - a.t) / .25); return lerp(a.lift(t), b.lift(t), p); }
    return LAND[3].lift(t);
  };
  const h = t => Math.max(0, dotState(t).z - surf(t) - H0);
  samp(shp, t => { const s = dotState(t), k = 1 + h(t) / 260; return { transform: `translate3d(${f2(s.x)}px,${f2(s.y)}px,${f2(surf(t) + 2)}px) scale(${k.toFixed(3)})` }; }, 6, 7.2);
  samp($(".s04-shd", shp), t => ({ opacity: f2((t < 7.05 ? 1 : 1 - cl((t - 7.05) / .08)) * cl(.85 - h(t) / 420, .12, .85)) }), 6, 7.2);
  samp($(".s04-pool", shp), t => ({ opacity: f2((t < 7.06 ? 1 : 1 - cl((t - 7.06) / .1)) * cl(1 - h(t) / 330, .25, 1)) }), 6, 7.2);
}

/* anneaux d'impact (plan des tuiles) */
const ALL = Object.values(TILES);
LAND.forEach((L, i) => {
  const big = i === 3, g = document.createElement("div"); g.className = "s04-rg" + (big ? " big" : "");
  g.innerHTML = "<i></i>"; fly.append(g);
  const dur = big ? .55 : .34;
  samp(g, t => {
    const p = cl((t - L.t) / dur), s = big ? lerp(.04, 1.25, OUT3(p)) : lerp(.12, 1.05, OUT3(p));
    const z = big ? Math.max(...ALL.map(T => T.lift(t))) + 4 : L.lift(t) + 3;   // la grande onde reste au-dessus de la vague
    return { transform: `translate3d(${L.p[0]}px,${L.p[1]}px,${f2(z)}px) scale(${s.toFixed(3)})` };
  }, L.t, L.t + dur);
  A($("i", g), [{ opacity: 1 }, { opacity: big ? .9 : .85, offset: .35 }, { opacity: 0 }], L.t, dur, "linear", "forwards");
});

/* ================= TEXTE ================= */
/* « Un style » : 6,25 — scale .2 → 1 + largeur 125 % → 90 % (rebond) */
const l1 = $("#s04-l1");
A(l1, [{ transform: "scale(.2)" }, { transform: "scale(1)" }], 6.25, .25, BOc);
A(l1, [{ fontStretch: "125%" }, { fontStretch: "90%" }], 6.25, .25, BOc);
A(l1, [{ opacity: 0 }, { opacity: 1 }], 6.25, .05);
/* « pour chaque » : balayage gauche → droite 6,50 → 6,65 */
const l2 = $("#s04-l2");
A(l2, [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], 6.5, .15, Ec);
A(l2, [{ transform: "translateX(-26px)" }, { transform: "translateX(0px)" }], 6.5, .4, EXc);
/* « MÉTIER » : chute 3D lettre à lettre à 7,00 (split 0,03 s) */
const met = split($("#s04-met"), 7.0, .03);
met.forEach((ch, i) => {
  const t0 = 7.0 + .03 * i;
  A(ch, [{ transform: "translateY(-46px) rotateX(-92deg)" }, { transform: "translateY(0px) rotateX(0deg)" }], t0, .36, BOc);
  A(ch, [{ opacity: 0 }, { opacity: 1, offset: .16 }, { opacity: 1 }], t0, .36);
});
/* échos en contour lime qui reculent en Z (7,25 → 7,75), lettre par lettre */
[["#s04-echo1", 7.25, -200, .5], ["#s04-echo2", 7.4, -380, .38]].forEach(([sel, t0, z, o]) => {
  split($(sel), t0, .03).forEach((ch, i) => {
    const ti = t0 + .03 * i;
    A(ch, [{ transform: "translateZ(0px)" }, { transform: `translateZ(${z}px)` }], ti, .5, Ec, "forwards");
    A(ch, [{ opacity: o }, { opacity: 0 }], ti, .5, "cubic-bezier(.3,0,.7,1)", "forwards");
  });
});
/* le point de « MÉTIER. » : 7,125 */
const pt = $("#s04-pt");
A(pt, [{ transform: "translateY(-80px)" }, { transform: "translateY(0px)" }], 7.125, .3, BOc);
A(pt, [{ opacity: 0 }, { opacity: 1 }], 7.125, .06);
/* calque texte : poussée lente + petit choc à 7,0 (≤ 4 px) */
samp($("#s04-txt"), t => {
  const s = 1 + .028 * cl((t - 6.2) / 1.8);
  const u = t - 7, dy = u < 0 ? 0 : 4 * Math.exp(-u / .07) * Math.cos(u * Math.PI * 2 / .11);
  return { transform: `translateY(${f2(dy)}px) scale(${s.toFixed(4)})` };
}, 6, 8);

/* ================= DÉCOR ================= */
A($(".s04-fogm"), [{ opacity: 0 }, { opacity: 1 }], 6.96, .16, "cubic-bezier(.3,0,.3,1)");
A($(".s04-glow"), [{ transform: "translate(-30px,10px) scale(1)" }, { transform: "translate(30px,-6px) scale(1.12)" }], 6, 2, "linear");
A($(".s04-hz"), [{ transform: "translateX(40px) scaleX(.94)" }, { transform: "translateX(-40px) scaleX(1.06)" }], 6, 2, "linear");

/* ================= IRIS PAPIER 7,75 → 7,96 ================= */
const IR0 = 7.75, IR1 = 7.96, IK = 4.0;
const irisR = t => { const p = cl((t - IR0) / (IR1 - IR0)); return 1320 * (Math.exp(IK * p) - 1) / (Math.exp(IK) - 1); };
samp($("#s04-iris"), t => ({ clipPath: `circle(${f2(irisR(t))}px at 485px 1000px)` }), IR0, IR1, "forwards");
const ring = $("#s04-ring"), ringSvg = $(".s04-ring", S);
const tiles = Object.values(TILES).map(T => T.el);
let mbOn = "";
onSeek(t => {
  /* anneau lime collé au bord de l'iris */
  const on = t >= IR0 && t < IR1 - .005;
  ringSvg.style.opacity = on ? 1 : 0;
  ring.setAttribute("r", on ? f2(irisR(t)) : 0);
  ring.style.strokeWidth = on ? f2(Math.min(28, 10 + irisR(t) * .6)) : 28;
  /* flou de bougé : proportionnel à la vitesse du whip (repère du mur) */
  const v = Math.abs(1400 * (slideP(t + 1 / 60) - slideP(t - 1 / 60)));   // px par image (1/30 s)
  const sd = t >= 6 && t < 6.4 ? Math.min(36, v * .09) : 0;
  mbg.setAttribute("stdDeviation", `${f2(sd)} 0`);
  const fl = sd > .4 ? "url(#s04-mb)" : "none";
  if (fl !== mbOn) { mbOn = fl; tiles.forEach(el => { el.style.filter = fl; }); }
});
