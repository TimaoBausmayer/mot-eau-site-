/* Scène 10 (18 → 20 s) — MONTÉE 2 / RÉCAP « Tout au même endroit. »
   Tout est piloté par le temps absolu : WAAPI à delay absolu (ms) + canvas/SVG redessinés dans onSeek(t). */
const S = $(".s10");
const EX = "cubic-bezier(.16,1,.3,1)", E = "cubic-bezier(.2,.8,.2,1)", E2 = "cubic-bezier(.7,0,.2,1)",
  BO = "cubic-bezier(.34,1.56,.64,1)", SUCK = "cubic-bezier(.7,0,.84,0)";
/* TL(el, [{t, …propriétés, e}], fill) : une animation WAAPI, instants ABSOLUS (s) ; e = courbe du segment suivant */
const TL = (el, fr, fill = "both") => {
  const t0 = fr[0].t, t1 = fr[fr.length - 1].t, d = t1 - t0;
  const kf = fr.map(f => {
    const o = {}; for (const k in f) if (k !== "t" && k !== "e") o[k] = f[k];
    o.offset = d > 0 ? Math.min(1, Math.max(0, (f.t - t0) / d)) : 0; o.easing = f.e || "linear"; return o;
  });
  return el.animate(kf, { delay: t0 * 1000, duration: Math.max(1, d * 1000), fill });
};
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* ======================================================================
   FOND : lueur qui éclot avec la carte puis est aspirée vers le point
   ====================================================================== */
TL($("#s10-gw"), [
  { t: 18.0, transform: "scale(.55)", e: EX }, { t: 18.5, transform: "scale(1)" },
  { t: 19.75, transform: "scale(1)", e: SUCK }, { t: 19.9, transform: "scale(.22)" }, { t: 20.0, transform: "scale(.22)" }]);
/* pulsation en croches : montée 45 ms, retombée douce (amplitude volontairement faible, sécurité) */
{
  const fr = [];
  for (let k = 0; k < 8; k++) {
    const tb = 18 + k * .25;
    fr.push({ t: tb, opacity: k ? .55 : 0, e: "cubic-bezier(.3,0,.5,1)" }, { t: tb + (k ? .045 : .06), opacity: 1, e: "cubic-bezier(.3,.6,.4,1)" });
  }
  fr.push({ t: 20.0, opacity: .55 });
  TL($("#s10-glow"), fr);
}
/* voile : le fond s’assombrit à 40 % (19,70 → 20,00) */
TL($("#s10-dim"), [{ t: 19.7, opacity: 0, e: "cubic-bezier(.4,0,.6,1)" }, { t: 20.0, opacity: .6 }], "forwards");

/* ======================================================================
   MUR 3D : 13 bandes (2 de plus que le brief pour couvrir les coins pendant la bascule).
   Chaque bande est un enfant DIRECT de .stage (perspective) et porte toute la transformation du mur :
   rotate(−8°) rotateX(bascule) puis sa propre charnière (haut de la bande) → pas de preserve-3d
   (Chromium perdait des bandes presque coplanaires pendant le tri 3D).
   ====================================================================== */
const W = ["PHOTOS", "RÉSEAUX", "SITE", "LOGO", "PUBS", "AFFICHES", "SITE", "PHOTOS", "RÉSEAUX", "SITE", "LOGO", "PUBS", "AFFICHES"];
const N = W.length, SH = 213, WH = N * SH, MID = (N - 1) / 2, WTOP = 960 - WH / 2;
const OP = [.30, .35, .28, .40];                       // contraste réduit : blanc plein, contour blanc, lime plein, contour lime
const stage = $("#s10-stage");
const strips = [];
W.forEach((w, i) => {
  const k = i % 4, dir = i % 2 ? -1 : 1;
  const st = document.createElement("div"); st.className = `s10-strip s10-k${k}`;
  st.style.top = (WTOP + i * SH) + "px";
  st.style.transformOrigin = `1800px ${WH / 2 - i * SH}px`;          // = centre du mur (485, 960)
  const run = document.createElement("div"); run.className = "s10-run"; run.style.left = (-520 - (i * 173) % 420) + "px";
  const tx = document.createElement("div"); tx.className = "s10-txt";
  const reps = Math.ceil(6200 / ((w.length + 3) * 100));
  tx.textContent = Array(reps).fill(w).join(" · ") + " · ";
  run.append(tx); st.append(run); stage.append(st);
  strips.push({ st, run, tx, i, k, dir });
});
/* transformation complète d’une bande : mur (roulis −8°, bascule wx) puis charnière BASSE (angle a) :
   a = −90° couchée vers la caméra (invisible), 0 debout, +90° tombée en arrière comme un domino */
const stripT = (i, wx, a) => {
  const yt = (i + 1) * SH - WH / 2;
  return `rotate(-8deg) rotateX(${wx}deg) translateY(${yt}px) rotateX(${a}deg) translateY(${-yt}px)`;
};

strips.forEach(({ st, run, tx, i, k, dir }) => {
  const tr = 18.0 + .022 * Math.abs(i - MID);           // ouverture depuis le centre (la carte) vers les bords
  const tf = 19.5 + .025 * (i - 3);                    // dominos du haut vers le bas : 1re bande visible (i = 3) à 19,50, dernière (i = 11) à 19,70
  /* une seule animation transform par bande :
     les bandes se redressent (−90° → 0, --ex) ; bascule du mur 12° → −12° (18,5 → 19,0, --e2) ; chute en arrière (0 → 90°) */
  const fr = [{ t: 18.0, transform: stripT(i, 12, -90) }];
  if (tr > 18.0) fr.push({ t: tr, transform: stripT(i, 12, -90) });
  fr[fr.length - 1].e = EX;
  fr.push({ t: tr + .3, transform: stripT(i, 12, 0) },
    { t: 18.5, transform: stripT(i, 12, 0), e: E2 },
    { t: 19.0, transform: stripT(i, -12, 0) },
    { t: tf, transform: stripT(i, -12, 0), e: "cubic-bezier(.32,0,.7,.55)" },
    { t: tf + .15, transform: stripT(i, -12, 90) });
  TL(st, fr);
  /* opacité (feuille) : apparaît pendant l’ouverture, s’éteint en tombant */
  const o = OP[k], fo = [{ t: 18.0, opacity: 0 }];
  if (tr > 18.0) fo.push({ t: tr, opacity: 0 });
  fo[fo.length - 1].e = "cubic-bezier(.3,0,.4,1)";
  fo.push({ t: tr + .14, opacity: o }, { t: tf + .04, opacity: o, e: "cubic-bezier(.4,0,.8,.6)" }, { t: tf + .145, opacity: 0 });
  TL(tx, fo);
  /* défilement en sens alternés, accélère jusqu’à 19,0 puis arrêt net */
  TL(run, [{ t: 18.0, transform: "translateX(0px)", e: "cubic-bezier(.5,0,1,1)" }, { t: 19.0, transform: `translateX(${dir * 1400}px)` }]);
});

/* caméra : dérive permanente (roulis + push) */
TL($("#s10-cam"), [
  { t: 18.0, transform: "rotate(1deg) scale(1)", e: "cubic-bezier(.35,0,.65,1)" },
  { t: 20.0, transform: "rotate(-.7deg) scale(1.04)" }]);

/* 19,00 → 19,375 : 4 coups de zoom en doubles-croches (sauts nets + petit rebond), puis tient */
{
  const fr = [{ t: 18.0, transform: "scale(1) rotate(0deg)" }];
  [19.0, 19.125, 19.25, 19.375].forEach((tb, n) => {
    const s = 1 + .025 * (n + 1), r = n % 2 ? -.5 : .5;
    fr.push({ t: tb - .004, transform: `scale(${(s - .025).toFixed(3)}) rotate(0deg)` },
      { t: tb, transform: `scale(${(s + .028).toFixed(3)}) rotate(${r}deg)`, e: EX },
      { t: tb + .1, transform: `scale(${s.toFixed(3)}) rotate(0deg)` });
  });
  fr.push({ t: 20.0, transform: "scale(1.1) rotate(0deg)" });
  TL($("#s10-punch"), fr);
}

/* ======================================================================
   CARTE (stable, hors du mur)
   ====================================================================== */
TL($("#s10-cw"), [{ t: 18.0, transform: "scale(0)", e: BO }, { t: 18.3, transform: "scale(1)" }]);
/* écho en contour qui sort de derrière la carte */
TL($("#s10-ew"), [{ t: 18.2, transform: "scale(1)", e: "cubic-bezier(.2,.7,.3,1)" }, { t: 18.62, transform: "scale(1.2)" }]);
TL($("#s10-echo"), [{ t: 18.2, opacity: 0 }, { t: 18.24, opacity: .7, e: "cubic-bezier(.3,0,.6,1)" }, { t: 18.62, opacity: 0 }], "forwards");

/* pulsations 19,0 / 19,125 / 19,25 / 19,375 */
const HITS = [19.0, 19.125, 19.25, 19.375];
{
  const fr = [{ t: 18.9, transform: "scale(1)" }];
  HITS.forEach(tb => fr.push({ t: tb - .004, transform: "scale(1)" }, { t: tb, transform: "scale(1.04)", e: E }, { t: tb + .1, transform: "scale(1)" }));
  TL($("#s10-pulse"), fr);
}
const card = $("#s10-card");
const SHB = "0 30px 80px rgba(0,0,0,.6), inset 0 0 60px rgba(124,92,255,.14), 0 0 0px rgba(200,255,62,0)";
const SHH = "0 30px 80px rgba(0,0,0,.6), inset 0 0 60px rgba(124,92,255,.14), 0 0 44px rgba(200,255,62,.42)";
{
  const fr = [{ t: 18.9, boxShadow: SHB }];
  HITS.forEach(tb => fr.push({ t: tb - .004, boxShadow: SHB }, { t: tb, boxShadow: SHH, e: E }, { t: tb + .11, boxShadow: SHB }));
  fr.push({ t: 19.625, boxShadow: SHB, e: "cubic-bezier(.6,0,.4,1)" },
    { t: 19.74, boxShadow: "0 6px 16px rgba(0,0,0,.35), inset 0 0 4px rgba(124,92,255,.14), 0 0 0px rgba(200,255,62,0)" });
  TL(card, fr);
}
/* 19,625 → 19,74 : la carte se replie sur son point (d’abord en ligne, puis dans le point), puis disparaît */
const FOLD = "cubic-bezier(.6,0,.35,1)";
TL(card, [
  { t: 19.625, left: "90px", top: "780px", width: "790px", height: "360px", borderRadius: "40px", e: FOLD },
  { t: 19.68, left: "90px", top: "1033px", width: "790px", height: "26px", borderRadius: "13px", e: FOLD },
  { t: 19.74, left: "777px", top: "1033px", width: "26px", height: "26px", borderRadius: "13px" }]);
TL(card, [{ t: 19.735, opacity: 1 }, { t: 19.745, opacity: 0 }], "forwards");
/* textes : écrasés vers la ligne du point (scaleY 1 → 0) */
for (const id of ["#s10-f1", "#s10-f2"])
  TL($(id), [{ t: 19.625, transform: "scale(1,1)", e: "cubic-bezier(.5,0,.6,1)" }, { t: 19.665, transform: "scale(.96,0)" }]);
TL($("#s10-l2"), [{ t: 19.635, opacity: 1, e: "cubic-bezier(.5,0,.8,.6)" }, { t: 19.662, opacity: 0 }], "forwards");

/* « Tout au » claque : 18,05 scale 2 → 1 (--bo) + opacité + flou → net */
TL($("#s10-sl"), [{ t: 18.05, transform: "scale(2)", e: BO }, { t: 18.35, transform: "scale(1)" }]);
TL($("#s10-l1"), [{ t: 18.05, opacity: 0, e: "cubic-bezier(.2,.6,.4,1)" }, { t: 18.13, opacity: 1 },
  { t: 19.635, opacity: 1, e: "cubic-bezier(.5,0,.8,.6)" }, { t: 19.662, opacity: 0 }]);
TL($("#s10-l1"), [{ t: 18.05, filter: "blur(10px)", e: E }, { t: 18.22, filter: "blur(0px)" }]);
/* « même endroit » s’écrit de gauche à droite 18,25 → 18,45 */
TL($("#s10-l2"), [
  { t: 18.25, clipPath: "inset(-40px calc(100% + 40px) -40px -40px)", e: "cubic-bezier(.4,0,.25,1)" },
  { t: 18.45, clipPath: "inset(-40px -40px -40px -40px)" }]);

/* la plume suit exactement le bord du masque (128 → 811 px, même courbe) puis s’éteint */
TL($("#s10-nib"), [
  { t: 18.25, transform: "translateX(0px) skewX(-11deg)", e: "cubic-bezier(.4,0,.25,1)" },
  { t: 18.45, transform: "translateX(683px) skewX(-11deg)" }]);
TL($("#s10-nib"), [{ t: 18.25, opacity: 0 }, { t: 18.275, opacity: .95 }, { t: 18.41, opacity: .95, e: "cubic-bezier(.4,0,.6,1)" }, { t: 18.47, opacity: 0 }], "forwards");
/* onde de pose du point */
TL($("#s10-rip"), [{ t: 18.475, transform: "scale(.8)", e: "cubic-bezier(.15,.75,.3,1)" }, { t: 18.69, transform: "scale(2.7)" }]);
TL($("#s10-rip"), [{ t: 18.475, opacity: 0 }, { t: 18.49, opacity: .6, e: "cubic-bezier(.3,0,.6,1)" }, { t: 18.69, opacity: 0 }], "forwards");

/* ======================================================================
   LE POINT : une seule animation transform 18,375 → 20,0
   chute + écrasement (18,375 → 18,6) ; 19,75 → 19,875 glisse au centre (485, 960) Ø 90 ; 19,9 se comprime Ø 54
   ====================================================================== */
const dot = $("#s10-dot");
TL(dot, [
  { t: 18.375, transform: "translate(0px,-80px) scale(.86,1.18)", e: "cubic-bezier(.45,0,.9,.55)" },
  { t: 18.475, transform: "translate(0px,3px) scale(1.24,.78)", e: E },
  { t: 18.545, transform: "translate(0px,-5px) scale(.95,1.06)", e: "cubic-bezier(.4,0,.6,1)" },
  { t: 18.6, transform: "translate(0px,0px) scale(1,1)" },
  { t: 19.75, transform: "translate(0px,0px) scale(1,1)", e: E2 },
  { t: 19.875, transform: "translate(-305px,-86px) scale(3.46,3.46)", e: "cubic-bezier(.3,0,.2,1)" },
  { t: 19.9, transform: "translate(-305px,-86px) scale(2.08,2.08)" },
  { t: 20.0, transform: "translate(-305px,-86px) scale(2.08,2.08)" }]);
TL(dot, [{ t: 18.375, opacity: 0, e: "cubic-bezier(.2,.6,.4,1)" }, { t: 18.43, opacity: 1 }]);
TL(dot, [
  { t: 19.75, boxShadow: "0 0 0px 0px rgba(200,255,62,0)", e: "cubic-bezier(.4,0,.6,1)" },
  { t: 19.875, boxShadow: "0 0 12px 0px rgba(200,255,62,.45)", e: E },
  { t: 19.9, boxShadow: "0 0 16px 1px rgba(200,255,62,.6)", e: "cubic-bezier(.4,0,.8,.6)" },
  { t: 20.0, boxShadow: "0 0 22px 3px rgba(200,255,62,.85)" }]);

/* ======================================================================
   onSeek : flou de bougé des bandes + aspiration (anneaux + traits convergents)
   ====================================================================== */
const mbg = $("#s10-mbg");
/* cubic-bezier(.5,0,1,1) : dérivée dy/dx au temps normalisé u (résolution par dichotomie) */
const bx = s => 3 * (1 - s) * (1 - s) * s * .5 + 3 * (1 - s) * s * s + s * s * s;
const slope = u => {
  let a = 0, b = 1;
  for (let n = 0; n < 40; n++) { const m = (a + b) / 2; if (bx(m) < u) a = m; else b = m; }
  const s = (a + b) / 2, h = 1e-4;
  const by = q => 3 * (1 - q) * q * q + q * q * q;
  return (by(s + h) - by(s - h)) / (bx(s + h) - bx(s - h));
};
const blurAt = t => {
  if (t < 18.02 || t >= 19.0) return 0;
  const v = 1400 * slope(clamp(t - 18)) / 30;            // déplacement par image (px)
  return Math.min(24, .26 * v);
};

const cv = $("#s10-fx"), g = cv.getContext("2d");
const TAU = Math.PI * 2, CX = 485, CY = 960;
const LINES = (() => { const r = mkRnd(1018), o = []; for (let i = 0; i < 26; i++) o.push({ a: TAU * (i + .6 * r()) / 26, r0: 560 + 420 * r(), len: 120 + 160 * r(), w: 1.5 + 1.5 * r(), d: .025 * r(), lime: r() < .55 }); return o; })();
const drawFx = t => {
  g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 1080, 1920);
  if (t < 19.74 || t >= 20.0) return;
  /* traits convergents (aspiration courte) */
  g.lineCap = "round";
  for (const L of LINES) {
    const u = clamp((t - 19.74 - L.d) / .15); if (u <= 0 || u >= 1) continue;
    const q = u * u * (1.6 - .6 * u);                   // accélère vers le centre
    const rh = L.r0 * (1 - q) + 40 * q, rt = Math.min(L.r0 + L.len, rh + L.len * (1 - .7 * q));
    const al = Math.sin(Math.PI * u) * .6;
    const c = Math.cos(L.a), s = Math.sin(L.a);
    g.strokeStyle = L.lime ? `rgba(200,255,62,${al.toFixed(3)})` : `rgba(143,162,255,${(al * .8).toFixed(3)})`;
    g.lineWidth = L.w; g.beginPath(); g.moveTo(CX + c * rh, CY + s * rh); g.lineTo(CX + c * rt, CY + s * rt); g.stroke();
  }
  /* 19,90 battement sub : une onde fine part du point comprimé et s’éteint avant 20,0 */
  {
    const u = clamp((t - 19.9) / .075);
    if (u > 0 && u < 1) {
      const q = 1 - Math.pow(1 - u, 3);
      g.strokeStyle = `rgba(200,255,62,${(.5 * (1 - u)).toFixed(3)})`; g.lineWidth = 3 * (1 - .6 * u);
      g.beginPath(); g.arc(CX, CY, 34 + 80 * q, 0, TAU); g.stroke();
    }
  }
  /* deux anneaux qui se resserrent sur le point */
  for (const [t0, R, col, w0] of [[19.75, 430, "200,255,62", 5], [19.79, 300, "255,255,255", 2.5]]) {
    const u = clamp((t - t0) / (19.9 - t0)); if (u <= 0 || u >= 1) continue;
    const q = u * u * u;
    const r = R * (1 - q) + 30 * q, al = Math.min(1, u * 4) * (1 - u * u) * .8;
    g.strokeStyle = `rgba(${col},${al.toFixed(3)})`; g.lineWidth = w0 * (1 + 1.2 * q);
    g.beginPath(); g.arc(CX, CY, r, 0, TAU); g.stroke();
  }
};

onSeek(t => {
  const b = blurAt(t);
  mbg.setAttribute("stdDeviation", `${b.toFixed(2)} 0`);
  drawFx(t);
});
