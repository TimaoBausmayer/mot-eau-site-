/* Scène 08 (14 → 16 s) — CONFIANCE : « PRIX annoncé à l’avance. RETOUCHES incluses. »
   Tout est en délais ABSOLUS (secondes depuis le début de la vidéo → ms dans A()).
   Le O de RETOUCHES : glyphe jusqu’à 15,5 s, puis tracé SVG (profil mesuré du glyphe Archivo 900 / 70 %)
   qui se transforme sans coupure en anneau parfait (centre 485/900, r int. 180, r ext. 350). */
const S = $(".s08");
const A = (el, kf, t0, dur, easing = "linear", fill = "both") =>
  el.animate(kf, { delay: Math.round(t0 * 1000), duration: Math.round(dur * 1000), easing, fill });
const EX = "cubic-bezier(.16,1,.3,1)", E = "cubic-bezier(.2,.8,.2,1)", E2 = "cubic-bezier(.7,0,.2,1)", BO = "cubic-bezier(.34,1.56,.64,1)";
const bez = (x1, y1, x2, y2) => {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = u => ((ax * u + bx) * u + cx) * u, Y = u => ((ay * u + by) * u + cy) * u;
  return x => {
    if (x <= 0) return 0; if (x >= 1) return 1;
    let lo = 0, hi = 1, u = x;
    for (let i = 0; i < 30; i++) { u = (lo + hi) / 2; if (X(u) < x) lo = u; else hi = u; }
    return Y(u);
  };
};
const fEX = bez(.16, 1, .3, 1), fE = bez(.2, .8, .2, 1), fE2 = bez(.7, 0, .2, 1);
const cl = x => x < 0 ? 0 : x > 1 ? 1 : x;
const lerp = (a, b, u) => a + (b - a) * u;

/* ---------- fond ---------- */
A($("#s08-gv"), [{ transform: "translate(300px,400px)" }, { transform: "translate(700px,1300px)" }], 14, 2, "linear");
A($("#s08-gv"), [{ opacity: .35 }, { opacity: 1 }], 14, .45, E);
A($("#s08-gb"), [{ transform: "translate(860px,1560px) scale(.9)" }, { transform: "translate(260px,620px) scale(1.15)" }], 14, 2, "linear");
/* les lueurs s’éteignent pendant que le O devient l’anneau : S8 finit sur la nuit (S9 rallume le tunnel sur le kick de 16,0) */
A($("#s08-dark"), [{ opacity: 0 }, { opacity: 1 }], 15.55, .38, "cubic-bezier(.45,0,.3,1)", "forwards");

/* ---------- « € » géant : rotation 3D permanente, puis il file vers la caméra ---------- */
A($("#s08-eurot"), [{ transform: "rotateY(0deg) rotateX(4deg)" }, { transform: "rotateY(60deg) rotateX(-3deg)" }], 14, 2, "linear");
A($("#s08-euout"), [
  { transform: "scale(.93)", easing: EX },
  { transform: "scale(1)", offset: .3 },
  { transform: "scale(1.02)", offset: .75, easing: "cubic-bezier(.55,0,.9,.45)" },
  { transform: "scale(2.3)" }], 14, 2);
$$(".s08-eu", S).forEach(e => A(e, [{ opacity: 1 }, { opacity: 0 }], 15.55, .35, "cubic-bezier(.5,0,.8,.3)"));

/* ---------- caméra : poussée + roulis permanents (origine 485/900) ---------- */
const CAM = { s0: 1, s1: 1.045, r0: -.4, r1: .35 };
A($("#s08-cam"), [{ transform: `scale(${CAM.s0}) rotate(${CAM.r0}deg)` }, { transform: `scale(${CAM.s1}) rotate(${CAM.r1}deg)` }], 14, 2, "linear");
/* secousse du moment fort (15,0 → 15,2) */
A($("#s08-shk"), [
  { transform: "translate(0px,0px)" },
  { transform: "translate(-6px,4px)", offset: .1 },
  { transform: "translate(5px,-4px)", offset: .24 },
  { transform: "translate(-4px,3px)", offset: .4 },
  { transform: "translate(3px,-2px)", offset: .56 },
  { transform: "translate(-2px,1px)", offset: .72 },
  { transform: "translate(1px,0px)", offset: .87 },
  { transform: "translate(0px,0px)" }], 14.99, .21);

/* ---------- 14,00 PRIX se gonfle (mot entier : symétrique) ---------- */
A($("#s08-prix"), [
  { fontStretch: "62%", fontWeight: 400, letterSpacing: ".2em", textIndent: ".2em" },
  { fontStretch: "125%", fontWeight: 900, letterSpacing: "-.03em", textIndent: "-.03em" }], 14, .35, "cubic-bezier(.38,1.32,.5,1)");
A($("#s08-prixw"), [{ transform: "scale(.94,.8)" }, { transform: "scale(1,1)" }], 14, .35, "cubic-bezier(.38,1.32,.5,1)");
/* échos en contour à l’atterrissage */
A($("#s08-echo1"), [{ transform: "scale(1)", opacity: .7 }, { transform: "scale(1.13)", opacity: 0 }], 14.28, .45, EX, "forwards");
A($("#s08-echo2"), [{ transform: "scale(1)", opacity: .4 }, { transform: "scale(1.28)", opacity: 0 }], 14.33, .55, EX, "forwards");
/* ligne de base lime */
A($("#s08-base"), [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], 14.2, .2, EX);
/* « annoncé à l’avance. » s’écrit (plume lumineuse au bord) */
const write = (el, nib, t0, dur, x0, x1) => {
  A(el, [{ clipPath: "inset(-40px 100% -50px 0px)" }, { clipPath: "inset(-40px 0% -50px 0px)" }], t0, dur, E2);
  A(nib, [{ transform: `translateX(${x0 - 2}px)` }, { transform: `translateX(${x1 - 2}px)` }], t0, dur, E2);
  A(nib, [{ opacity: 0 }, { opacity: 1, offset: .12 }, { opacity: 1, offset: .7 }, { opacity: 0 }], t0, dur + .05, "linear");
};
write($("#s08-ann"), $("#s08-nib1"), 14.125, .275, 95.85, 874.15);   // boîte 738,3 + 2×20 centrée sur 485

/* ---------- 14,50 RETOUCHES : volets de tableau de gare ---------- */
const row = $("#s08-row");
const chs = split(row, 14.5, .02);
const wraps = chs.map((ch, i) => {
  const w = document.createElement("span"); w.className = i === 3 ? "s08-ow" : "s08-lt";
  ch.replaceWith(w); w.append(ch);
  const t0 = 14.5 + i * .02;
  A(ch, [{ transform: "rotateX(-90deg)" }, { transform: "rotateX(0deg)" }], t0, .18, BO);
  A(ch, [{ color: "rgba(75,72,96,0)" }, { color: "rgba(75,72,96,1)", offset: .12 }, { color: "#ffffff" }], t0, .18, "linear", "backwards");
  return w;
});
const ow = wraps[3];
write($("#s08-inc"), $("#s08-nib2"), 14.625, .225, 264.85, 705.15);   // boîte 400,3 + 2×20

/* ---------- 15,00 MOMENT FORT : le O s’allume ---------- */
A(ow, [{ color: "#ffffff" }, { color: "#c8ff3e" }], 14.98, .1, E);
A(ow, [
  { textShadow: "0 0 0px rgba(200,255,62,0)", easing: "cubic-bezier(.2,.8,.3,1)" },
  { textShadow: "0 0 60px rgba(200,255,62,1)", offset: .14 },
  { textShadow: "0 0 30px rgba(200,255,62,.55)" }], 14.98, .47, "linear");
A(ow, [
  { transform: "scale(1)", easing: "cubic-bezier(.2,.8,.3,1)" },
  { transform: "scale(1.17)", offset: .22, easing: "cubic-bezier(.34,1.4,.64,1)" },
  { transform: "scale(1)" }], 14.98, .36, "linear");
A($("#s08-halo"), [{ opacity: 0 }, { opacity: .9, offset: .06 }, { opacity: .32, offset: .75 }, { opacity: 0 }], 14.985, .655, "linear", "forwards");
A($("#s08-halo"), [{ transform: "scale(.45)" }, { transform: "scale(1)" }], 14.985, .4, EX);
A($("#s08-pl1"), [{ transform: "scale(1.06)" }, { transform: "scale(1)" }], 14.99, .36, E, "forwards");
A($("#s08-pl2"), [{ transform: "scale(1.06)" }, { transform: "scale(1)" }], 14.99, .36, E, "forwards");

/* onde + graduations qui jaillissent autour du O (repère local caméra) */
{
  const OX = 409, OY = 853.5, w1 = $("#s08-wv1"), w2 = $("#s08-wv2"), g = $("#s08-ticks"), NS = "http://www.w3.org/2000/svg";
  const tk = Array.from({ length: 12 }, () => { const l = document.createElementNS(NS, "line"); g.append(l); return l; });
  onSeek(t => {
    const p = (t - 14.985) / .5;
    if (p > 0 && p < 1) {
      w1.setAttribute("r", (50 + 550 * fEX(p)).toFixed(1));
      w1.style.strokeWidth = (12 * Math.pow(1 - p, 1.15)).toFixed(2); w1.style.opacity = 1;
    } else { w1.setAttribute("r", 0); w1.style.opacity = 0; }
    const q = (t - 15.07) / .45;
    if (q > 0 && q < 1) {
      w2.setAttribute("r", (44 + 360 * fEX(q)).toFixed(1));
      w2.style.strokeWidth = (5 * (1 - q)).toFixed(2); w2.style.opacity = (.7 * (1 - q)).toFixed(3);
    } else { w2.setAttribute("r", 0); w2.style.opacity = 0; }
    const k = (t - 14.985) / .42;
    tk.forEach((l, i) => {
      if (k <= 0 || k >= 1) { l.style.opacity = 0; return; }
      const e = fEX(k), a = (i * 30 - 90 + 14 * e) * Math.PI / 180, big = i % 3 === 0;
      const r1 = 78 + 175 * e, L = (big ? 46 : 26) * (1 - .75 * k) + 4;
      l.setAttribute("x1", (OX + r1 * Math.cos(a)).toFixed(1)); l.setAttribute("y1", (OY + r1 * Math.sin(a)).toFixed(1));
      l.setAttribute("x2", (OX + (r1 + L) * Math.cos(a)).toFixed(1)); l.setAttribute("y2", (OY + (r1 + L) * Math.sin(a)).toFixed(1));
      l.style.strokeWidth = ((big ? 6 : 4) * (1 - .5 * k)).toFixed(2); l.style.opacity = Math.pow(1 - k, 1.4).toFixed(3);
    });
  });
}

/* ---------- 15,50 SORTIE ---------- */
/* bloc 1 file à gauche (+ flou de bougé horizontal) */
const B1T = 15.5, B1D = .25;
A($("#s08-b1"), [{ transform: "translateX(0px)" }, { transform: "translateX(-1400px)" }], B1T, B1D, E2, "forwards");
{
  const b1 = $("#s08-b1"), hb = $("#s08-hbg"), x = t => -1400 * fE2(cl((t - B1T) / B1D));
  onSeek(t => {
    const sg = Math.min(38, Math.abs(x(t) - x(t - 1 / 30)) * .16);
    if (sg > .4) { hb.setAttribute("stdDeviation", `${sg.toFixed(1)} 0`); b1.style.filter = "url(#s08-hb)"; }
    else b1.style.filter = "none";
  });
}
/* les autres lettres sont lâchées (du O vers l’extérieur) avec un petit sursaut, flou vertical */
{
  const NS = "http://www.w3.org/2000/svg", defs = $("#s08-vbs");
  const fall = [];
  const add = (el, t0, dx, rot, id) => {
    const D = .27, k1 = .24;
    A(el, [
      { transform: "translate(0px,0px) rotate(0deg)", easing: "cubic-bezier(.25,.7,.4,1)" },
      { transform: `translate(${(dx * .12).toFixed(1)}px,-24px) rotate(${(rot * .12).toFixed(2)}deg)`, offset: k1, easing: "cubic-bezier(.55,0,.9,.55)" },
      { transform: `translate(${dx}px,2300px) rotate(${rot}deg)` }], t0, D, "linear", "forwards");
    const f = document.createElementNS(NS, "filter"); f.id = id;
    f.setAttribute("x", "-50%"); f.setAttribute("y", "-60%"); f.setAttribute("width", "200%"); f.setAttribute("height", "220%");
    const gb = document.createElementNS(NS, "feGaussianBlur"); gb.setAttribute("stdDeviation", "0 0"); f.append(gb); defs.append(f);
    const ey = bez(.55, 0, .9, .55);
    const y = t => { const p = (t - t0) / D; return p <= k1 ? 0 : 2300 * ey(cl((p - k1) / (1 - k1))); };
    fall.push({ el, gb, y, id });
  };
  wraps.forEach((w, i) => {
    if (i === 3) return;
    const d = Math.abs(i - 3), side = i < 3 ? -1 : 1;
    add(w, 15.5 + (d - 1) * .022 + (side > 0 ? .011 : 0), side * (34 + 16 * d), side * (24 + 5 * d), "s08-vb" + i);
  });
  add($("#s08-incf"), 15.54, 0, 9, "s08-vbi");
  onSeek(t => fall.forEach(o => {
    const sg = Math.min(18, Math.abs(o.y(t) - o.y(t - 1 / 30)) * .07);
    if (sg > .4) { o.gb.setAttribute("stdDeviation", `0 ${sg.toFixed(1)}`); o.el.style.filter = `url(#${o.id})`; }
    else o.el.style.filter = "none";
  }));
}

/* ---------- le O devient l’anneau (15,50 → 15,85) ---------- */
{
  /* profil polaire mesuré du O (Archivo 900, stretch 70 %, 150 px), quart 0→90° par pas de 2,5° (px depuis le centre de l’encre) */
  const QI = [11.84, 11.85, 11.88, 11.94, 12.02, 12.12, 12.25, 12.41, 12.59, 12.81, 13.06, 13.34, 13.67, 14.03, 14.45, 14.92, 15.44, 16.02, 16.67, 17.39, 18.18, 19.04, 19.98, 21.03, 22.11, 23.24, 24.34, 25.45, 26.48, 27.35, 28.06, 28.63, 29.05, 29.34, 29.5, 29.56, 29.6];
  const QO = [40.97, 41.0, 41.09, 41.22, 41.42, 41.67, 41.98, 42.32, 42.73, 43.19, 43.7, 44.25, 44.85, 45.48, 46.14, 46.83, 47.54, 48.25, 48.96, 49.65, 50.32, 50.94, 51.51, 52.02, 52.44, 52.77, 53.04, 53.23, 53.36, 53.45, 53.49, 53.48, 53.48, 53.45, 53.4, 53.39, 53.4];
  const N = 144, FI = [], FO = [];
  for (let k = 0; k < N; k++) { let d = (k * 2.5) % 180; if (d > 90) d = 180 - d; const j = Math.round(d / 2.5); FI.push(QI[j]); FO.push(QO[j]); }
  /* centre de l’encre du O dans le repère caméra, puis à l’écran à 15,5 s (caméra linéaire 14 → 16) */
  const OX = 408.74, OY = 853.5, T0 = 15.5, T1 = 15.85;
  const camAt = t => { const u = cl((t - 14) / 2); return { s: lerp(CAM.s0, CAM.s1, u), r: lerp(CAM.r0, CAM.r1, u) * Math.PI / 180 }; };
  const c0 = camAt(T0);
  const SX = 485 + c0.s * (Math.cos(c0.r) * (OX - 485) - Math.sin(c0.r) * (OY - 900));
  const SY = 900 + c0.s * (Math.sin(c0.r) * (OX - 485) + Math.cos(c0.r) * (OY - 900));
  const path = (u, w, uc = u) => {
    const cx = lerp(SX, 485, uc), cy = lerp(SY, 900, uc), rot = lerp(c0.r, 0, u);
    let s = "";
    for (const [F, R] of [[FO, 350], [FI, 180]]) {
      for (let k = 0; k < N; k++) {
        const r = lerp(F[k] * c0.s, R, u) + (R === 350 ? w : -w), a = k * Math.PI * 2 / N + rot;
        s += (k ? "L" : "M") + (cx + r * Math.cos(a)).toFixed(2) + " " + (cy + r * Math.sin(a)).toFixed(2);
      }
      s += "Z";
    }
    return s;
  };
  const op = $("#s08-op"), og = $("#s08-og"), ogb = $("#s08-ogb"), e1 = $("#s08-oe1"), e2 = $("#s08-oe2"), ring = $("#s08-ring");
  const fM = bez(.68, 0, .26, 1.1), U = t => fM(cl((t - T0) / (T1 - T0)));
  onSeek(t => {
    const on = t >= T0 - .005 && t < T1 - .005;
    ow.style.visibility = t >= T0 - .005 ? "hidden" : "visible";
    ring.style.opacity = t >= T1 - .005 ? 1 : 0;
    if (!on) { [op, og, e1, e2].forEach(p => p.setAttribute("d", "")); return; }
    const u = U(t), d = path(u, 0);
    op.setAttribute("d", d);
    /* lueur héritée du glyphe (text-shadow 0 0 30px .55) qui s’éteint pendant la course */
    const ga = .55 * (1 - fE(cl((t - T0) / .34)));
    if (ga > .01) { og.setAttribute("d", d); og.style.opacity = ga.toFixed(3); ogb.setAttribute("stdDeviation", (15 * c0.s + 22 * u).toFixed(1)); }
    else og.setAttribute("d", "");
    /* deux échos en contour qui traînent derrière */
    [[e1, .045, .55], [e2, .09, .3]].forEach(([e, lag, a]) => {
      const ue = U(t - lag), al = a * Math.sin(Math.PI * cl((ue - .18) / .78));
      if (al > .02 && Math.abs(u - ue) > .01) { e.setAttribute("d", path(ue, 0, u)); e.style.opacity = al.toFixed(3); e.style.strokeWidth = 3; }
      else e.setAttribute("d", "");
    });
  });
}
/* anneau final : respire et revient pile à r 265 à la dernière image (raccord S9) */
A($("#s08-ring"), [
  { transform: "scale(1)", easing: "cubic-bezier(.3,.7,.4,1)" },
  { transform: "scale(1.016)", offset: .45, easing: "cubic-bezier(.5,0,.5,1)" },
  { transform: "scale(1)" }], 15.85, .117, "linear");
A($("#s08-shim"), [{ transform: "rotate(-75deg)" }, { transform: "rotate(85deg)" }], 15.833, .134, "cubic-bezier(.3,.4,.4,1)");
A($("#s08-shim"), [{ opacity: 0 }, { opacity: 1, offset: .3 }, { opacity: .6, offset: .7 }, { opacity: 0 }], 15.833, .134, "linear", "forwards");
