/* Scène 03 (4 → 6 s) — « ton LOGO · tes PUBS · tes RÉSEAUX » : tambour 3D à 4 faces.
   Tout est en délais ABSOLUS (secondes depuis le début de la vidéo, converties en ms). */
const S = $(".s03");
const EX = "cubic-bezier(.16,1,.3,1)", E = "cubic-bezier(.2,.8,.2,1)", BO = "cubic-bezier(.34,1.56,.64,1)";
const IO = "cubic-bezier(.45,.05,.55,.95)", SUCK = "cubic-bezier(.7,0,.84,0)";
const A = (el, kf, t0, dur, easing = "linear", fill = "both") =>
  el.animate(kf, { delay: Math.round(t0 * 1000), duration: Math.round(dur * 1000), easing, fill });
/* keyframes posés en temps absolus : [[t, {props}], …] entre t0 et t1 */
const AT = (el, t0, t1, list, fill = "both") =>
  A(el, list.map(([t, p]) => Object.assign({ offset: +((t - t0) / (t1 - t0)).toFixed(5) }, p)), t0, t1 - t0, "linear", fill);

/* ---------- contenus des faces ---------- */
{
  const strip = $("#s03-strip");
  const L = ["bella-pizza", "fitzone", "le-reflet", "horizon-immo", "green-clean", "vestir"];
  for (let k = 0; k < 12; k++) {
    const c = document.createElement("div"); c.className = "s03-card";
    const im = document.createElement("img"); im.src = `../images/logos/${L[k % 6]}.jpg`; im.alt = "";
    c.append(im); strip.append(c);
  }
  const cols = $("#s03-cols");
  const C = [
    ["fleuriste", "restaurant", "boutique"],
    ["esthetique", "pizzeria", "tatoueur"],
    ["coach", "photographe", "cave"],
    ["boulangerie", "barbier", "garage"]
  ];
  C.forEach((list, i) => {
    const col = document.createElement("div"); col.className = "s03-col " + (i % 2 ? "s03-cb" : "s03-ca");
    col.style.left = (40 + i * 190) + "px";
    list.forEach(n => { const im = document.createElement("img"); im.src = `../images/portfolio/${n}-mobile.jpg`; im.alt = ""; col.append(im); });
    cols.append(col);
  });
}

/* ---------- tambour ---------- */
const drum = $("#s03-drum"), arrive = $(".s03-arrive", S), cam = $(".s03-cam", S);
const R = a => ({ transform: `translateZ(-300px) rotateX(${a}deg)` });
AT(drum, 4.0, 6.0, [
  [4.00, { ...R(0) }],
  [4.40, { ...R(0), easing: "cubic-bezier(.4,0,.6,1)" }],
  [4.50, { ...R(-6), easing: BO }],           /* petite prise d'élan */
  [4.80, { ...R(90) }],
  [4.90, { ...R(90), easing: "cubic-bezier(.4,0,.6,1)" }],
  [5.00, { ...R(84), easing: BO }],
  [5.30, { ...R(180), easing: "cubic-bezier(.4,0,.6,1)" }],
  [6.00, { ...R(183) }]                       /* dérive infime : jamais figé */
]);
/* arrivée du fond en roulant (axe du tambour) */
A(arrive, [{ transform: "translateZ(-900px) rotateX(-60deg)" }, { transform: "translateZ(0px) rotateX(0deg)" }], 4.0, 0.35, BO);
/* caméra qui dérive en permanence */
A(cam, [
  { transform: "translateZ(0px) rotateY(6deg) rotateZ(-1deg)" },
  { transform: "translateZ(36px) rotateY(-4deg) rotateZ(.8deg)" }
], 4.0, 2.0, IO);

/* flou de bougé par face pendant les rotations */
$$(".s03-face", S).forEach(f => AT(f, 4.0, 6.0, [
  [4.00, { filter: "blur(0px)" }], [4.50, { filter: "blur(0px)" }], [4.56, { filter: "blur(6px)" }], [4.68, { filter: "blur(1.5px)" }], [4.78, { filter: "blur(0px)" }],
  [5.00, { filter: "blur(0px)" }], [5.06, { filter: "blur(6px)" }], [5.18, { filter: "blur(1.5px)" }], [5.28, { filter: "blur(0px)" }], [6.00, { filter: "blur(0px)" }]
]));

/* ---------- halos colorés (la face avant éclaire la nuit) ---------- */
{
  const [h0, h1, h2] = $$(".s03-halo", S);
  AT(h0, 4.0, 6.0, [[4.0, { opacity: 0 }], [4.12, { opacity: 1 }], [4.5, { opacity: 1 }], [4.66, { opacity: 0 }], [6.0, { opacity: 0 }]]);
  AT(h1, 4.0, 6.0, [[4.0, { opacity: 0 }], [4.52, { opacity: 0 }], [4.68, { opacity: 1 }], [5.0, { opacity: 1 }], [5.16, { opacity: 0 }], [6.0, { opacity: 0 }]]);
  AT(h2, 4.0, 6.0, [[4.0, { opacity: 0 }], [5.02, { opacity: 0 }], [5.18, { opacity: 1 }], [5.5, { opacity: .9 }], [5.56, { opacity: 1 }], [6.0, { opacity: .85 }]]);
  /* échos en contour au moment où chaque face se pose (impacts du rebond) */
  $$(".s03-echo", S).forEach((e, i) => A(e, [
    { transform: "scale(1)", opacity: .6 }, { transform: "scale(1.16)", opacity: 0 }
  ], [4.13, 4.61, 5.11][i], 0.4, EX, "forwards"));
}

/* reflet lumineux qui balaie chaque face juste après qu'elle s'est posée */
$$(".s03-sheen", S).forEach((el, k) => A(el, [
  { transform: "translateX(-400px) rotate(18deg)" }, { transform: "translateX(1000px) rotate(18deg)" }
], [4.16, 4.64, 5.14][k], 0.42, "cubic-bezier(.45,0,.25,1)"));

/* ---------- secousses caméra : « chunk » 4,50 / 5,00, coup de cœur 5,50 ---------- */
const shk = $("#s03-shk");
AT(shk, 4.0, 6.0, [
  [4.00, { transform: "translate(0px,0px) scale(1)" }],
  [4.50, { transform: "translate(0px,0px) scale(1)" }],
  [4.53, { transform: "translate(0px,-4px) scale(1.006)" }],
  [4.62, { transform: "translate(0px,2px) scale(1)" }],
  [4.72, { transform: "translate(0px,0px) scale(1)" }],
  [5.00, { transform: "translate(0px,0px) scale(1)" }],
  [5.03, { transform: "translate(0px,-4px) scale(1.006)" }],
  [5.12, { transform: "translate(0px,2px) scale(1)" }],
  [5.22, { transform: "translate(0px,0px) scale(1)" }],
  [5.50, { transform: "translate(0px,0px) scale(1)", easing: "cubic-bezier(.2,.7,.3,1)" }],
  [5.56, { transform: "translate(-3px,2px) scale(1.05)", easing: "cubic-bezier(.4,0,.3,1)" }],
  [5.62, { transform: "translate(2px,-2px) scale(1.035)", easing: "cubic-bezier(.4,0,.3,1)" }],
  [5.75, { transform: "translate(0px,0px) scale(1.02)" }],
  [6.00, { transform: "translate(0px,0px) scale(1.02)" }]
]);

/* ---------- whip pan 5,75 → 6,00 ---------- */
const whip = $("#s03-whip");
A(whip, [{ transform: "translateX(0px) skewX(0deg)" }, { transform: "translateX(-1400px) skewX(-10deg)" }], 5.75, 0.25, SUCK, "forwards");
A($(".s03-bgw", S), [{ transform: "translateX(0px)" }, { transform: "translateX(-420px)" }], 5.75, 0.25, SUCK, "forwards");

/* ---------- cœurs qui montent (5,05 + i·0,08) ---------- */
{
  const r = mkRnd(33), box = $("#s03-hearts");
  const HP = "M12 21.2l-1.5-1.3C5.4 15.3 2 12.3 2 8.6 2 5.5 4.4 3.1 7.5 3.1c1.7 0 3.4.8 4.5 2.1 1.1-1.3 2.8-2.1 4.5-2.1 3.1 0 5.5 2.4 5.5 5.5 0 3.7-3.4 6.7-8.5 11.3z";
  const xs = [190, 700, 330, 560, 250, 790, 440, 160, 630, 380];
  for (let i = 0; i < 10; i++) {
    const s = Math.round(40 + 30 * r()), x = xs[i] + (r() - .5) * 40, y = 1200 + (r() - .5) * 60;
    const col = i % 3 === 1 ? "#c8ff3e" : "#ff4d6d";
    const h = document.createElement("div"); h.className = "s03-ht";
    h.style.cssText = `left:${(x - s / 2).toFixed(1)}px;top:${(y - s / 2).toFixed(1)}px;width:${s}px;height:${s}px`;
    h.innerHTML = `<svg viewBox="0 0 24 24"><path d="${HP}" fill="${col}"/></svg>`;
    box.append(h);
    const H = 500 + 300 * r(), amp = 18 + 12 * r(), ph = r() * Math.PI * 2, rot = (r() * 2 - 1) * 20, f = .9 + .5 * r();
    const kf = [];
    for (let k = 0; k <= 16; k++) {
      const p = k / 16, ty = -H * (1 - Math.pow(1 - p, 2.2));
      const tx = amp * Math.sin(ph + p * Math.PI * 2 * f) - amp * Math.sin(ph);
      const ro = rot * Math.sin(ph + p * Math.PI * 2 * f + .8);
      const sc = p < .18 ? .4 + .6 * (1 - Math.pow(1 - p / .18, 3)) * 1.08 : 1.08 - .08 * Math.min(1, (p - .18) / .2);
      const op = p < .1 ? p / .1 : p > .7 ? Math.max(0, 1 - (p - .7) / .3) : 1;
      kf.push({ offset: p, transform: `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) rotate(${ro.toFixed(1)}deg) scale(${sc.toFixed(3)})`, opacity: +op.toFixed(3) });
    }
    A(h, kf, 5.05 + i * 0.08, 0.9, "linear", "forwards");
  }
}

/* ---------- 3 notifications sur les pops (5,10 / 5,20 / 5,30) ---------- */
$$(".s03-nt", S).forEach((n, i) => {
  const t0 = 5.1 + i * 0.1;
  AT(n, t0, 6.0, [
    [t0, { transform: "translateY(0px) scale(0)", easing: "cubic-bezier(.3,1.6,.5,1)" }],
    [t0 + .2, { transform: "translateY(-6px) scale(1)", easing: "cubic-bezier(.4,0,.6,1)" }],
    [6.0, { transform: `translateY(${-26 + i * 4}px) scale(1)` }]
  ]);
});

/* ---------- 5,50 MOMENT FORT : gros cœur lime + onde ---------- */
const bh = $(".s03-bh", S);
A(bh, [
  { transform: "scale(0) rotate(-14deg)", easing: "cubic-bezier(.2,.9,.35,1)" },
  { transform: "scale(1.2) rotate(4deg)", offset: .5, easing: "cubic-bezier(.45,0,.4,1)" },
  { transform: "scale(.96) rotate(-1deg)", offset: .78, easing: "cubic-bezier(.45,0,.55,1)" },
  { transform: "scale(1) rotate(0deg)" }
], 5.5, 0.3);

const ring1 = $("#s03-ring1"), ring2 = $("#s03-ring2"), sparks = $("#s03-sparks");
const SP = [];
{
  const r = mkRnd(55);
  for (let k = 0; k < 10; k++) {
    const ln = document.createElementNS("http://www.w3.org/2000/svg", "line");
    sparks.append(ln);
    SP.push({ el: ln, a: (k / 10) * Math.PI * 2 + (r() - .5) * .4, d: 150 + 70 * r(), w: 4 + 3 * r() });
  }
}
const ringAt = (el, t, t0, dur, r1, w0, o0) => {
  const p = (t - t0) / dur;
  if (p <= 0 || p >= 1) { el.setAttribute("r", 0); el.style.opacity = 0; return; }
  const e = 1 - Math.pow(1 - p, 3);
  el.setAttribute("r", (r1 * e).toFixed(1));
  el.style.strokeWidth = (w0 * Math.pow(1 - p, 1.2) + .8).toFixed(2);
  el.style.opacity = (o0 * Math.pow(1 - p, 1.4)).toFixed(3);
};

/* ---------- traînées verticales (canvas) ---------- */
const cv = $("#s03-streaks"), cx = cv.getContext("2d");
const ST = [];
{
  const r = mkRnd(303);
  for (let c = 0; c < 13; c++) for (let j = 0; j < 3; j++)
    ST.push({ x: 15 + c * 90 + (j === 0 ? 0 : (r() - .5) * 36), y: r() * 2600, len: 90 + 360 * r(), a: .05 + .08 * r(), w: j === 0 ? 2 : 1 + r(), k: .6 + .9 * r() });
}
const sm = x => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);
/* déplacement : croisière 260 px/s + deux accélérations de 400 px en 0,2 s (4,50 et 5,00) */
const D = t => 260 * (t - 4) + 400 * sm((t - 4.5) / .2) + 400 * sm((t - 5.0) / .2);
const V = t => { const h = 1 / 60; return (D(t + h) - D(t - h)) / (2 * h); };
/* courbe exacte du whip : cubic-bezier(.7,0,.84,0) résolue numériquement */
const bez = (x1, y1, x2, y2) => x => {
  if (x <= 0) return 0; if (x >= 1) return 1;
  const cx = s => 3 * x1 * s * (1 - s) * (1 - s) + 3 * x2 * s * s * (1 - s) + s * s * s;
  let lo = 0, hi = 1, s = x; for (let k = 0; k < 40; k++) { s = (lo + hi) / 2; if (cx(s) < x) lo = s; else hi = s; }
  return 3 * y1 * s * (1 - s) * (1 - s) + 3 * y2 * s * s * (1 - s) + s * s * s;
};
const suck = bez(.7, 0, .84, 0);
const whipX = t => -1400 * suck((t - 5.75) / .25);

/* lecture de l'angle courant (après seek) pour éclairer chaque face */
const faces = $$(".s03-face", S).map(f => ({ shade: $(".s03-shade", f), gloss: $(".s03-gloss", f) }));
const angX = el => { const m = new DOMMatrix(getComputedStyle(el).transform); return Math.atan2(m.m23, m.m22) * 180 / Math.PI; };
const mbg = $("#s03-mbg"), stage = $(".s03-stage", S);

onSeek(t => {
  /* --- traînées --- */
  cx.clearRect(0, 0, 1080, 1920);
  if (t >= 3.99 && t <= 6.05) {
    const d = D(t), v = V(t), stretch = 1 + Math.min(2.2, Math.max(0, (v - 260) / 900));
    const ox = whipX(t) * .55;
    for (const s of ST) {
      const L = s.len * stretch * (.7 + .3 * s.k);
      const span = 1920 + 900;
      let y = ((s.y - d * s.k) % span + span) % span - 450;
      const x = s.x + ox * s.k;
      if (x < -20 || x > 1100) continue;
      const g = cx.createLinearGradient(0, y, 0, y + L);
      const a = Math.min(.16, s.a * (.8 + .25 * stretch));
      g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(.5, `rgba(255,255,255,${a.toFixed(3)})`); g.addColorStop(1, "rgba(255,255,255,0)");
      cx.fillStyle = g; cx.fillRect(x, y, s.w, L);
    }
  }
  /* --- éclairage des faces --- */
  const th = angX(drum) + angX(arrive);
  faces.forEach((f, k) => {
    let ph = th - 90 * k; ph = ((ph + 180) % 360 + 360) % 360 - 180;     /* angle de la normale (0 = de face) */
    const c = Math.cos(ph * Math.PI / 180);
    f.shade.style.opacity = Math.min(.92, Math.max(0, (1 - c) * 1.15)).toFixed(3);
    if (f.gloss) {
      const g = Math.exp(-Math.pow((ph - 22) / 16, 2));                   /* reflet quand la face bascule vers le haut */
      f.gloss.style.opacity = (g * .9).toFixed(3);
      f.gloss.style.transform = `translateY(${(170 + ph * 9).toFixed(1)}px)`;
    }
  });
  /* --- reflet au sol : apparaît une fois le tambour posé, s'atténue pendant les rotations rapides --- */
  const kr = sm((t - 4.14) / .2) * (1 - .92 * Math.exp(-Math.pow((t - 4.59) / .09, 2)) - .92 * Math.exp(-Math.pow((t - 5.09) / .09, 2)));
  stage.style.webkitBoxReflect = kr < .01 ? "none" :
    `below 0px linear-gradient(rgba(0,0,0,0) 85%,rgba(0,0,0,${(.07 * kr).toFixed(3)}) 93%,rgba(0,0,0,${(.24 * kr).toFixed(3)}))`;
  /* --- flou directionnel du whip --- */
  const pw = (t - 5.75) / .25;
  if (pw > 0 && t < 6.05) {
    const v = Math.abs(whipX(t) - whipX(t - 1 / 30));                    /* px parcourus pendant l'image */
    const sx = Math.min(38, v * .16);
    mbg.setAttribute("stdDeviation", `${sx.toFixed(2)} 0`);
    whip.style.filter = sx > .3 ? "url(#s03-mb)" : "none";
  } else { mbg.setAttribute("stdDeviation", "0 0"); whip.style.filter = "none"; }
  /* --- onde + étincelles du gros cœur --- */
  ringAt(ring1, t, 5.5, .5, 210, 10, .7);
  ringAt(ring2, t, 5.58, .45, 150, 5, .45);
  const ps = (t - 5.52) / .32;
  SP.forEach(s => {
    if (ps <= 0 || ps >= 1) { s.el.style.opacity = 0; return; }
    const e = 1 - Math.pow(1 - ps, 3), r0 = 80 + s.d * e * .55, r1 = 80 + s.d * e;
    const ca = Math.cos(s.a), sa = Math.sin(s.a);
    s.el.setAttribute("x1", (785 + ca * r0).toFixed(1)); s.el.setAttribute("y1", (650 + sa * r0).toFixed(1));
    s.el.setAttribute("x2", (785 + ca * r1).toFixed(1)); s.el.setAttribute("y2", (650 + sa * r1).toFixed(1));
    s.el.style.strokeWidth = (s.w * (1 - ps * .7)).toFixed(2);
    s.el.style.opacity = (1 - Math.pow(ps, 2)).toFixed(3);
  });
});
