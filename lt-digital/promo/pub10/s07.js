/* Scène 07 (12 → 14 s) — DROP 2 : le point lime explose et devient le prix « Un site dès 85 € ».
   Tout est en délais ABSOLUS (secondes depuis le début de la vidéo → ms dans A()). */
const S = $(".s07");
const A = (el, kf, t0, dur, easing = "linear", fill = "both") =>
  el.animate(kf, { delay: Math.round(t0 * 1000), duration: Math.round(dur * 1000), easing, fill });
const EX = "cubic-bezier(.16,1,.3,1)", E = "cubic-bezier(.2,.8,.2,1)", E2 = "cubic-bezier(.7,0,.2,1)", BO = "cubic-bezier(.34,1.56,.64,1)";
/* courbe de Bézier évaluée en JS (pour les dessins onSeek) */
const bez = (x1, y1, x2, y2) => {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = u => ((ax * u + bx) * u + cx) * u, Y = u => ((ay * u + by) * u + cy) * u;
  return x => {
    if (x <= 0) return 0; if (x >= 1) return 1;
    let lo = 0, hi = 1, u = x;
    for (let i = 0; i < 28; i++) { u = (lo + hi) / 2; if (X(u) < x) lo = u; else hi = u; }
    return Y(u);
  };
};
const fEX = bez(.16, 1, .3, 1);
/* perspective de .s07-stage : un plan à z = −d se projette en scale(P/(P+d)) autour de (485, 900) */
const P = 1500, KZ = d => +(P / (P + d)).toFixed(5);
const ECH = [{ d: 90, o: 1 }, { d: 180, o: .7 }, { d: 270, o: .45 }];   // échos en contour (extrusion)
const CZ = [0, -3, -6, -9, -12, -15];                                    // épaisseur de la pièce « € »

/* ---------- caméra : poussée + roulis permanents, secousse d’impact ---------- */
A($("#s07-cam"), [{ transform: "scale(1) rotate(-.35deg)" }, { transform: "scale(1.04) rotate(.35deg)" }], 12.0, 2.0, "linear");
A($("#s07-shk"), [
  { transform: "translate(0px,0px) scale(1)" },
  { transform: "translate(0px,0px) scale(1.04)", offset: .07 },     /* 12,03 souffle de l’explosion */
  { transform: "translate(0px,0px) scale(1.012)", offset: .35 },
  { transform: "translate(0px,4px) scale(1.026)", offset: .39 },    /* 12,155 thud au sol */
  { transform: "translate(-3px,-3px) scale(1.016)", offset: .47 },
  { transform: "translate(3px,2px) scale(1.008)", offset: .56 },
  { transform: "translate(-2px,-1px) scale(1.004)", offset: .67 },
  { transform: "translate(1px,1px) scale(1.001)", offset: .8 },
  { transform: "translate(0px,0px) scale(1)" }
], 12.0, .4);

/* ---------- 12,00 EXPLOSION DU POINT ---------- */
/* le disque lime Ø 60 de S6 s’ouvre (départ un demi-image avant le temps : la 1re image de S7 est déjà l’explosion) */
A($("#s07-lime"), [{ clipPath: "circle(30px at 545px 1020px)" }, { clipPath: "circle(1400px at 545px 1020px)" }], 11.983, .22, EX);
/* anneau lime du raccord + 3 anneaux encre (SVG redessinés à chaque image) */
{
  const rl = $("#s07-rl"), ri = $$(".s07-ri", S);
  onSeek(t => {
    const p = (t - 11.983) / .25;
    if (p > 0 && p < 1) {
      rl.setAttribute("r", (60 + 1800 * fEX(p)).toFixed(1));
      rl.style.strokeWidth = (6 * (1 - p) + 1).toFixed(2); rl.style.opacity = (.6 * (1 - p)).toFixed(3);
    } else { rl.setAttribute("r", 0); rl.style.opacity = 0; }
    ri.forEach((c, k) => {
      const q = (t - (11.995 + k * .045)) / .6;
      if (q <= 0 || q >= 1) { c.setAttribute("r", 0); c.style.opacity = 0; return; }
      c.setAttribute("r", (24 + 1550 * fEX(q)).toFixed(1));
      c.style.strokeWidth = (17 * Math.pow(1 - q, 1.3) + 1.5).toFixed(2);
      c.style.opacity = Math.pow(1 - q, 1.2).toFixed(3);
    });
  });
}

/* ---------- confettis de glyphes (40, mkRnd(77)) ---------- */
{
  const r = mkRnd(77), back = $("#s07-gback"), front = $("#s07-gfront");
  const G = ["€", "8", "5", "●"], C = ["#0b0b10", "#0b0b10", "#7c5cff", "#ffffff"];
  const ce = bez(.1, .7, .2, 1), items = [];
  for (let k = 0; k < 40; k++) {
    const b = document.createElement("b"), g = G[k % 4], size = 30 + 50 * r(), col = C[Math.floor(r() * 4)];
    if (g === "●") { b.className = "d"; b.style.width = b.style.height = Math.round(size * .42) + "px"; b.style.background = col; }
    else { b.textContent = g; b.style.fontSize = Math.round(size) + "px"; b.style.color = col; }
    const a = (k / 40) * Math.PI * 2 + (r() - .5) * .55;
    items.push({ b, a, D: 400 + 500 * r(), rot: (r() * 2 - 1) * 600, t0: 11.99 + r() * .05, g: 300 + 500 * r() });
    (k % 3 === 0 ? front : back).append(b);
  }
  onSeek(t => items.forEach(o => {
    const tau = t - o.t0, p = tau / 1.1;
    if (p <= 0 || p >= 1) { o.b.style.opacity = 0; return; }
    const e = ce(p), x = 485 + Math.cos(o.a) * o.D * e * 1.1, y = 960 + Math.sin(o.a) * o.D * e + .5 * o.g * tau * tau;
    const sc = .35 + .65 * Math.min(1, p * 5);
    o.b.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-50%) rotate(${(o.rot * e).toFixed(1)}deg) scale(${sc.toFixed(3)})`;
    o.b.style.opacity = (p < .45 ? 1 : 1 - (p - .45) / .55).toFixed(3);
  }));
}

/* ---------- PRIX ---------- */
const price = $("#s07-price"), face = $("#s07-face"), rface = $(".s07-rface", S);
/* largeur de l’Archivo : 62 % → 70 % en atterrissant, flexion 13,0 → 13,3 */
A(price, [
  { fontStretch: "62%", easing: BO },
  { fontStretch: "70%", offset: .3 / 1.3 },
  { fontStretch: "70%", offset: 1.0 / 1.3, easing: "cubic-bezier(.55,0,.45,1)" },
  { fontStretch: "62%", offset: 1.15 / 1.3, easing: BO },
  { fontStretch: "70%" }
], 12.0, 1.3);
/* SLAM : chute depuis la caméra sur la ligne de base, écrasement à 12,15, rebond */
const SLAM = [
  { transform: "scale(2.75)" },
  { transform: "scale(2.38)", offset: .11 },                        /* 12,033 */
  { transform: "scale(1.86)", offset: .22 },                        /* 12,067 */
  { transform: "scale(1.4)", offset: .33 },                         /* 12,10 */
  { transform: "scale(1.1)", offset: .44 },                         /* 12,133 */
  { transform: "scale(1.07,.86)", offset: .5, easing: "cubic-bezier(.25,0,.4,1)" },   /* 12,15 écrasement au sol */
  { transform: "scale(.975,1.045)", offset: .73, easing: "cubic-bezier(.45,0,.55,1)" },
  { transform: "scale(1)" }
];
[face, rface].forEach(f => { A(f, SLAM, 12.0, .3); A(f, [{ opacity: 0 }, { opacity: 1 }], 12.0, .03); });
A(face, [{ filter: "blur(15px)" }, { filter: "blur(0px)" }], 12.0, .14);
/* reflet de verre sur le 85 */
A($(".s07-sheen", face), [{ backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0" }], 13.0, .4, "cubic-bezier(.4,0,.6,1)");

/* « € » : pièce épaisse (6 couches) qui tombe en tournant, se pose à 12,70 */
const er = $("#s07-er");
CZ.forEach((z, k) => {
  const g = document.createElement("span"); g.className = "s07-eg"; g.textContent = "€";
  if (k === 0) { g.classList.add("f"); const sh = document.createElement("span"); sh.className = "s07-sheen"; sh.textContent = "€"; g.append(sh); }
  else if (k === CZ.length - 1) { g.classList.add("b"); g.style.transform = `translateZ(${z}px) rotateY(180deg)`; }   /* revers lisible */
  else g.style.transform = `translateZ(${z}px)`;
  er.append(g);
});
const FALL = [
  { transform: "translateY(-600px)", easing: "cubic-bezier(.3,.15,.7,.6)" },
  { transform: "translateY(0px)", offset: .45 / .6, easing: "cubic-bezier(.25,.7,.45,1)" },   /* 12,70 clink */
  { transform: "translateY(-30px)", offset: .51 / .6, easing: "cubic-bezier(.55,0,.85,.45)" },
  { transform: "translateY(0px)" }
];
const SPIN = [
  { transform: "rotateY(1080deg)", easing: "cubic-bezier(.3,.45,.45,1)" },
  { transform: "rotateY(-14deg)", offset: .5 / .6, easing: "cubic-bezier(.45,0,.55,1)" },
  { transform: "rotateY(0deg)" }
];
[[$("#s07-ey"), er], [$(".s07-rey", S), $(".s07-rer", S)]].forEach(([y, rr]) => {
  A(y, FALL, 12.25, .6); A(rr, SPIN, 12.25, .6);
  $$(".s07-eg", rr).forEach(g => A(g, [{ opacity: 0 }, { opacity: 1 }], 12.25, .08));
});
A($(".s07-sheen", er), [{ backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0" }], 13.12, .38, "cubic-bezier(.4,0,.6,1)");
/* étincelles au « clink » */
const stars = $$(".s07-star", S);
A(stars[0], [
  { transform: "scale(0) rotate(0deg)", easing: "cubic-bezier(.2,.8,.4,1)" },
  { transform: "scale(1) rotate(40deg)", offset: .4, easing: "cubic-bezier(.6,0,.8,.4)" },
  { transform: "scale(0) rotate(90deg)" }
], 12.62, .2, "linear", "forwards");
A(stars[1], [
  { transform: "scale(0) rotate(0deg)", easing: "cubic-bezier(.2,.8,.4,1)" },
  { transform: "scale(.55) rotate(-40deg)", offset: .4, easing: "cubic-bezier(.6,0,.8,.4)" },
  { transform: "scale(0) rotate(-90deg)" }
], 12.68, .18, "linear", "forwards");

/* 13,25 : l’extrusion sort par l’arrière (3 échos en contour, « whomp » en cascade) */
$$(".s07-echo", S).forEach((e, k) => A(e, [
  { transform: "translateZ(-4px)", opacity: 0 },
  { transform: `translateZ(${-ECH[k].d}px)`, opacity: ECH[k].o }
], 13.25 + k * .06, .25, BO, "forwards"));
/* 12,9 → 13,75 : la caméra pivote autour du prix (on voit l’épaisseur), puis revient de face */
A($("#s07-orbit"), [
  { transform: "rotateY(0deg) rotateX(0deg)", easing: E },
  { transform: "rotateY(-16deg) rotateX(6deg)", offset: .55 / .85 },
  { transform: "rotateY(-17deg) rotateX(6.4deg)", offset: .6 / .85, easing: E2 },
  { transform: "rotateY(0deg) rotateX(0deg)" }
], 12.9, .85);

/* ---------- SOL ---------- */
A($("#s07-shw"), [{ transform: "scaleX(0)", opacity: 0 }, { transform: "scaleX(1)", opacity: 1 }], 12.1, .22, EX);
A($("#s07-shadow"), [
  { transform: "scaleX(1)", easing: "cubic-bezier(.55,0,.45,1)" },
  { transform: "scaleX(.88)", offset: .5, easing: BO },
  { transform: "scaleX(1)" }
], 13.0, .3);
/* ombre de la pièce : grandit pendant la chute, se rétracte au rebond */
A($("#s07-shw2"), [
  { transform: "scaleX(.3)", opacity: 0, easing: "cubic-bezier(.4,0,.8,.6)" },
  { transform: "scaleX(1)", opacity: 1, offset: .25 / .4, easing: "cubic-bezier(.2,.6,.4,1)" },
  { transform: "scaleX(.86)", opacity: .75, offset: .31 / .4, easing: "cubic-bezier(.6,0,.8,.4)" },
  { transform: "scaleX(1)", opacity: 1 }
], 12.45, .4);
A($("#s07-refl"), [{ opacity: 0 }, { opacity: .12 }], 12.12, .26, E);
/* ondes de choc au sol */
{
  const wave = (el, t0, dur, rx, ry, sw, o) => onSeek(t => {
    const q = (t - t0) / dur;
    if (q <= 0 || q >= 1) { el.setAttribute("rx", 0); el.setAttribute("ry", 0); el.style.opacity = 0; return; }
    const e = fEX(q);
    el.setAttribute("rx", (rx * e).toFixed(1)); el.setAttribute("ry", (ry * e).toFixed(1));
    el.style.strokeWidth = (sw * (1 - q) + .5).toFixed(2); el.style.opacity = (o * Math.pow(1 - q, .8)).toFixed(3);
  });
  wave($("#s07-w1"), 12.15, .6, 700, 90, 10, .9);
  wave($("#s07-w2"), 12.22, .55, 540, 66, 5, .55);
}
/* poussière encre (canvas) : 120 grains mkRnd(707) + bouffées, seulement 12,15 ≤ t < 13,2 */
{
  const cv = $("#s07-dust"), ctx = cv.getContext("2d"), r = mkRnd(707), F = 1067, pts = [], puffs = [];
  for (let i = 0; i < 120; i++) {
    const x = 140 + 700 * r();
    pts.push({ x, vx: (x - 490) / 350 * 240 + (r() * 2 - 1) * 200, vy: -(300 + 600 * r()), a: .4 + .3 * r(), s: 3 + 6 * r(), d: .07 * r() });
  }
  for (let i = 0; i < 18; i++) {
    const x = 130 + 720 * r();
    puffs.push({ x, vx: (x - 490) / 350 * 340 + (r() - .5) * 140, r0: 40 + 30 * r(), r1: 140 + 110 * r(), a: .16 + .14 * r(), d: .05 * r() });
  }
  onSeek(t => {
    ctx.clearRect(0, 0, 1080, 1920);
    if (t < 12.15 || t >= 13.2) return;
    puffs.forEach(o => {
      const tau = t - 12.15 - o.d, p = tau / .95; if (tau <= 0 || p >= 1) return;
      const e = 1 - Math.pow(1 - p, 3), x = o.x + o.vx * e * .9, y = F - 14 - 46 * e, rad = o.r0 + (o.r1 - o.r0) * e, al = o.a * (1 - p) * (1 - p);
      ctx.save(); ctx.translate(x, y); ctx.scale(1, .5);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rad);
      g.addColorStop(0, `rgba(11,11,16,${al.toFixed(3)})`); g.addColorStop(1, "rgba(11,11,16,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rad, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });
    ctx.fillStyle = "#0b0b10";
    pts.forEach(o => {
      const tau = t - 12.15 - o.d; if (tau <= 0 || tau >= .9) return;
      const x = o.x + o.vx * (1 - Math.exp(-2.2 * tau)) / 2.2, y = F + o.vy * tau + 1200 * tau * tau;
      if (y > F + 4) return;
      const life = tau / .9; ctx.globalAlpha = o.a * (1 - life * life);
      ctx.beginPath(); ctx.arc(x, y, o.s / 2, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
  });
}

/* ---------- « Un site dès » lettre à lettre (12,50) ---------- */
const un = $("#s07-un");
split(un, 12.5, .025);

/* ---------- 13,75 → 14,00 COUP DE LAME ---------- */
const blade = $("#s07-blade");
A(blade, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], 13.75, .06, "cubic-bezier(.55,0,.3,1)", "forwards");
A(blade, [{ opacity: 1 }, { opacity: 1, offset: .25 }, { opacity: 0 }], 13.81, .12, "linear", "forwards");
/* deux moitiés plates de l’image (copie exacte de l’état à 13,81) qui glissent de part et d’autre de la coupe */
{
  const tan = Math.tan(12 * Math.PI / 180), ly = x => (860 - tan * (x - 485)).toFixed(2), X0 = -700, X1 = 1800;
  const flat = () => {
    const f = document.createElement("div"); f.className = "s07-flat";
    let h = `<div class="s07-lime s07-limeX"></div><div class="s07-sun s07-sunrot"></div>
      <div class="s07-shw"><i class="s07-shadow"></i></div><i class="s07-shw2"></i>
      <div class="s07-price" style="font-stretch:70%">
        <div class="s07-refl"><div class="s07-face">85</div><div class="s07-ey"><div class="s07-er"><span class="s07-eg">€</span></div></div></div>`;
    ECH.forEach(o => { h += `<div class="s07-echo" style="opacity:${o.o};transform:scale(${KZ(o.d)});transform-origin:485px 900px"><span class="s07-e85">85</span><span class="s07-eeu">€</span></div>`; });
    CZ.slice(1, -1).reverse().forEach(z => { h += `<div class="s07-ey" style="transform:scale(${KZ(-z)});transform-origin:-197px 104px"><span class="s07-eg" style="color:#262630">€</span></div>`; });
    h += `<div class="s07-face">85</div><div class="s07-ey"><span class="s07-eg">€</span></div></div>`;
    f.innerHTML = h;
    const u = un.cloneNode(true); u.removeAttribute("id"); f.append(u);
    const edge = document.createElement("i"); edge.className = "s07-edge"; f.append(edge);
    return f;
  };
  const top = $("#s07-top"), bot = $("#s07-bot");
  top.append(flat()); bot.append(flat());
  top.style.clipPath = `polygon(${X0}px -900px,${X1}px -900px,${X1}px ${ly(X1)}px,${X0}px ${ly(X0)}px)`;
  bot.style.clipPath = `polygon(${X0}px ${ly(X0)}px,${X1}px ${ly(X1)}px,${X1}px 2900px,${X0}px 2900px)`;
  A($("#s07-cut"), [{ opacity: 1 }, { opacity: 1 }], 13.81, .2, "linear", "forwards");
  A(top, [{ transform: "translate(0px,0px) rotate(0deg)" }, { transform: "translate(-1650px,-320px) rotate(-8deg)" }], 13.81, .19, E2, "forwards");
  A(bot, [{ transform: "translate(0px,0px) rotate(0deg)" }, { transform: "translate(1650px,320px) rotate(8deg)" }], 13.81, .19, E2, "forwards");
}
