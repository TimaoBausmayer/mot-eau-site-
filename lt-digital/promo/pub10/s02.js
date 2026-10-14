/* Scène 02 (2 → 4 s) — DROP 1 : « On te crée un beau SITE. » → le mot devient un site dans un téléphone.
   Tout est en délais ABSOLUS (ms depuis le début de la vidéo). */
const S = $(".s02");
const EX = "cubic-bezier(.16,1,.3,1)", E = "cubic-bezier(.2,.8,.2,1)", E2 = "cubic-bezier(.7,0,.2,1)";
const A = (el, kf, t0, dur, easing = "linear", fill = "both") =>
  el.animate(kf, { delay: Math.round(t0 * 1000), duration: Math.round(dur * 1000), easing, fill });

/* ---- « On te crée » : chute 3D lettre à lettre (CSS, --t absolu) ---- */
split($("#s02-on"), 2.0, 0.025);

/* ---- soulignement main levée sous « beau » ---- */
$("#s02-ul").setAttribute("d", "M452 549C532 537 632 535 718 541C682 546 632 551 598 558");

/* ---- SLAM de « SITE. » : 2,50 → impact 2,575 → rebond → 2,80 ---- */
const site = $("#s02-site");
A(site, [
  { transform: "scale(3)", easing: "cubic-bezier(.3,.55,.55,1)" },
  { transform: "scale(.93)", offset: .25, easing: "cubic-bezier(.45,0,.55,1)" },
  { transform: "scale(1.025)", offset: .55, easing: "cubic-bezier(.45,0,.55,1)" },
  { transform: "scale(1)" }
], 2.5, 0.3);
A(site, [{ opacity: 0 }, { opacity: 1 }], 2.5, 0.06);
const letters = $$(".s02-L", site), sdot = $(".s02-sdot", site);
[...letters, sdot].forEach(el => A(el, [{ filter: "blur(16px)" }, { filter: "blur(0px)" }], 2.5, 0.12, "cubic-bezier(.3,.6,.5,1)"));

/* impact : petite inspiration avant le coup, puis secousse courte (≤ 4 px) + punch d'échelle */
A($(".s02-shk"), [
  { transform: "translate(0,0) scale(1)", easing: "cubic-bezier(.4,0,.6,1)" },
  { transform: "translate(0,0) scale(.984)", offset: .25, easing: "cubic-bezier(.5,0,.9,.5)" },
  { transform: "translate(-4px,3px) scale(1.024)", offset: .42 },
  { transform: "translate(3px,-3px) scale(1.014)", offset: .5 },
  { transform: "translate(-2px,2px) scale(1.007)", offset: .62 },
  { transform: "translate(1px,-1px) scale(1.002)", offset: .76 },
  { transform: "translate(0,0) scale(1)" }
], 2.4, 0.4, "linear");

/* onde de choc fine (SVG redessiné à chaque image) */
const wave = $("#s02-wave");
onSeek(t => {
  const p = (t - 2.567) / 0.4;
  if (p <= 0 || p >= 1) { wave.setAttribute("r", 0); wave.style.opacity = 0; return; }
  const e = 1 - Math.pow(1 - p, 4);
  wave.setAttribute("r", (170 + 640 * e).toFixed(1));
  wave.style.strokeWidth = (14 * Math.pow(1 - p, 1.5) + 1).toFixed(2);
  wave.style.opacity = (0.7 * Math.pow(1 - p, 1.6)).toFixed(3);
});

/* 12 éclats projetés depuis le centre du mot (485, 880) */
{
  const r = mkRnd(22), box = $("#s02-shards");
  const g = ["S", "●", "T", "I", "E", "●", "S", "E", "T", "●", "I", "E"];
  for (let k = 0; k < 12; k++) {
    const sh = document.createElement("div"); sh.className = "s02-sh";
    const b = document.createElement("b"); const size = Math.round(40 + 50 * r());
    if (g[k] === "●") { b.className = "d"; b.style.width = b.style.height = Math.round(size * .5) + "px"; }
    else { b.textContent = g[k]; b.style.fontSize = size + "px"; if (k === 2 || k === 7 || k === 10) b.className = "o"; }
    sh.append(b); box.append(sh);
    const a = ((k + .5) / 12) * Math.PI * 2 + (r() - .5) * .5, d = 360 + 420 * r();
    const x0 = (r() - .5) * 260, y0 = (r() - .5) * 60;
    const dx = Math.cos(a) * d * 1.15, dy = Math.sin(a) * d, z = Math.round((r() - .3) * 700), rot = Math.round((r() * 2 - 1) * 400);
    A(sh, [
      { transform: `translate3d(${x0.toFixed(1)}px,${y0.toFixed(1)}px,0) rotate(0deg) scale(.6)`, opacity: 1 },
      { opacity: 1, offset: .5 },
      { transform: `translate3d(${(x0 + dx).toFixed(1)}px,${(y0 + dy).toFixed(1)}px,${z}px) rotate(${rot}deg) scale(1.1)`, opacity: 0 }
    ], 2.55 + (k % 3) * 0.01, 0.9, "cubic-bezier(.08,.85,.25,1)", "forwards");
  }
}

/* ---- 3,00 LE MOT DEVIENT L'IMAGE ---- */
const blks = $$(".s02-blk", S);
const to = [
  { left: "300px", top: "714px", width: "370px", height: "52px", borderRadius: "10px" },  /* S → barre de menu */
  { left: "307px", top: "920px", width: "243px", height: "130px", borderRadius: "6px" },  /* I → titre */
  { left: "307px", top: "1076px", width: "354px", height: "105px", borderRadius: "6px" }, /* T → paragraphe */
  { left: "307px", top: "1218px", width: "168px", height: "51px", borderRadius: "8px" }   /* E → bouton */
];
blks.forEach((b, i) => {
  const t0 = 3.0 + i * 0.04;
  // la lettre s'efface pendant que son bloc apparaît (2 images)
  A(letters[i], [{ opacity: 1 }, { opacity: 0 }], t0, 0.05, "linear", "forwards");
  // bloc : apparaît, reste, puis s'efface sous la vraie maquette (3,60 → 3,70)
  const tot = 3.70 - t0;
  A(b, [{ opacity: 0 }, { opacity: 1, offset: .05 / tot }, { opacity: 1, offset: (3.60 - t0) / tot }, { opacity: 0 }], t0, tot, "linear", "forwards");
  // petit punch au « clac »
  A(b, [{ transform: "scale(1.07)" }, { transform: "scale(1)" }], t0, 0.14, EX, "forwards");
  // glissement vers la maquette
  const from = [
    { left: "120px", top: "794px", width: "184px", height: "185px", borderRadius: "0px" },
    { left: "325px", top: "797px", width: "60px", height: "179px", borderRadius: "0px" },
    { left: "403px", top: "797px", width: "191px", height: "179px", borderRadius: "0px" },
    { left: "613px", top: "797px", width: "171px", height: "179px", borderRadius: "0px" }
  ][i];
  A(b, [from, to[i]], 3.06 + i * 0.04, 0.34, EX);
});

/* le point de « SITE. » saute en haut du téléphone et devient la pointe qui le trace */
A(sdot, [{ opacity: 1 }, { opacity: 0 }], 3.0, 0.001, "linear", "forwards");
const dx = $(".s02-dx", S), dy = $(".s02-dy", S), dd = $(".s02-dd", S);
A(dx, [{ opacity: 0 }, { opacity: 1 }], 3.0, 0.001, "linear", "forwards");
A(dx, [{ transform: "translateX(0)" }, { transform: "translateX(-350px)" }], 3.02, 0.23, "cubic-bezier(.45,0,.4,1)");
A(dy, [
  { transform: "translateY(0)", easing: "cubic-bezier(.2,.7,.4,1)" },
  { transform: "translateY(-345px)", offset: .62, easing: "cubic-bezier(.6,0,.8,.5)" },
  { transform: "translateY(-263px)" }
], 3.02, 0.23);
A(dd, [{ transform: "scale(1)" }, { transform: "scale(.27)" }], 3.02, 0.23, "cubic-bezier(.4,0,.2,1)");

/* 3,25 : le téléphone se trace depuis le point (deux moitiés symétriques) */
$$(".s02-ph", S).forEach(p => A(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], 3.25, 0.25, E2));

/* 3,50 : la vraie maquette apparaît */
const scr = $(".s02-screen", S);
/* le corps encre suit le bord de l’écran avec 14 px d’avance (ligne de balayage) */
A($(".s02-body", S), [{ clipPath: "inset(0 0 832px 0)" }, { clipPath: "inset(0 0 0px 0)" }], 3.5, 0.2, E2, "forwards");
A($(".s02-shadow", S), [{ opacity: 0 }, { opacity: 1 }], 3.46, 0.25, E, "forwards");
A(scr, [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }], 3.5, 0.2, E2);
A($(".s02-scroll", S), [{ transform: "translateY(0)" }, { transform: "translateY(-16px)" }], 3.5, 0.5, "cubic-bezier(.4,0,.6,1)");
A($(".s02-glare", S), [{ transform: "translateX(-300px)", opacity: 1 }, { transform: "translateX(560px)", opacity: 1 }], 3.6, 0.35, "cubic-bezier(.4,0,.3,1)", "forwards");
/* 3,625 : tap sur « Précommander » */
A($(".s02-tap", S), [{ transform: "scale(0)", opacity: 1 }, { transform: "scale(3)", opacity: 0 }], 3.625, 0.3, E, "forwards");
A($(".s02-tap2", S), [{ transform: "scale(.4)", opacity: .7 }, { transform: "scale(1)", opacity: .55, offset: .3 }, { transform: "scale(.8)", opacity: 0 }], 3.625, 0.2, "linear", "forwards");

/* le téléphone dérive (pendule doux) */
A($("#s02-dev"), [
  { transform: "translateY(0) rotate(0deg)", easing: "cubic-bezier(.3,.6,.4,1)" },
  { transform: "translateY(-6px) rotate(-4deg)", offset: .36, easing: "cubic-bezier(.45,0,.55,1)" },
  { transform: "translateY(-20px) rotate(2deg)" }
], 3.0, 1.0);

/* ---- 3,75 → 3,95 : le « + » arrive du fond et traverse la caméra ---- */
const plus = $(".s02-plus", S);
/* profondeur calée image par image : largeur apparente ≈ 170 → 190 → 250 → 350 → 540 → 1000 → 3000 px, puis traversée */
A(plus, [
  { transform: "translateZ(-6000px)" }, { transform: "translateZ(-5232px)", offset: 1 / 12 }, { transform: "translateZ(-3640px)", offset: 3 / 12 },
  { transform: "translateZ(-2200px)", offset: 5 / 12 }, { transform: "translateZ(-933px)", offset: 7 / 12 }, { transform: "translateZ(140px)", offset: 9 / 12 },
  { transform: "translateZ(1029px)", offset: 11 / 12 }, { transform: "translateZ(1300px)" }
], 3.75, 0.2, "linear");
A(plus, [{ opacity: 0 }, { opacity: 1, offset: 1 / 12 }, { opacity: 1, offset: .99 }, { opacity: 0 }], 3.75, 0.2, "linear", "forwards");
A($(".s02-prot", S), [{ transform: "rotate(-75deg)" }, { transform: "rotate(0deg)" }], 3.75, 0.15, "cubic-bezier(.25,.6,.35,1)");
/* la caméra s'avance doucement vers le téléphone (3,30 → 3,75), puis est aspirée avec le « + » */
A($(".s02-zoom", S), [
  { transform: "scale(1)", easing: "cubic-bezier(.45,0,.55,1)" },
  { transform: "scale(1.05)", offset: .45 / .65, easing: "cubic-bezier(.7,0,.84,0)" },
  { transform: "scale(1.16)" }
], 3.3, 0.65, "linear", "forwards");
