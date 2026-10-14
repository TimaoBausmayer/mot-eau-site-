/* Couche globale fx (0 → 24,1 s) — poussière de glyphes, grain, vignette, fuites de lumière, traînées du whip, bloom de l’iris.
   Tout est piloté par le temps : WAAPI à délai ABSOLU (fill forwards, base invisible) ou onSeek(t) qui redessine tout
   à partir de t seul. Aucun texte DOM, aucune dépendance aux scènes, aucune horloge réelle, aléatoire = mkRnd. */
const id = n => document.getElementById("fx-" + n);
const FPS = 30, NF = 725;                       // 725 images : 0 → 24,133 s
const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, p) => a + (b - a) * p;
const mod = (v, m) => ((v % m) + m) % m;
const bez = (x1, y1, x2, y2) => {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = s => ((ax * s + bx) * s + cx) * s, Y = s => ((ay * s + by) * s + cy) * s;
  return p => { if (p <= 0) return 0; if (p >= 1) return 1;
    let lo = 0, hi = 1, s = p; for (let i = 0; i < 40; i++) { if (X(s) < p) lo = s; else hi = s; s = (lo + hi) / 2; } return Y(s); };
};
const EO = bez(.2, .8, .2, 1), E2 = bez(.7, 0, .2, 1), IO = bez(.45, 0, .55, 1);
/* hachage entier déterministe (pour les vibrations image par image et le placement du grain) */
const hash = (a, b) => { let h = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
const ms = s => Math.round(s * 1000);
/* animation échantillonnée : fn(p) → images clés, délai absolu, fill forwards (l’état de base CSS est invisible) */
const samp = (el, fn, t0, dur, n = 24) => {
  const kf = []; for (let i = 0; i <= n; i++) kf.push(fn(i / n));
  return el.animate(kf, { delay: ms(t0), duration: ms(dur), easing: "linear", fill: "forwards" });
};

/* ================= 1) POUSSIÈRE DE GLYPHES ================= */
/* énergie E(t) : 1 en croisière ; ×3 au coup (2,0 · 12,0 · 20,0) qui revient à 1 en 0,4 s ; ×2 pendant le survol (6 → 8) ;
   0,3 pendant le breakdown (16 → 18) ; 0 pendant le silence (11,75 → 12,0). */
const Ef = t => {
  if (t >= 11.75 && t < 12) return 0;
  let e = 1;
  if (t >= 6 && t < 8) e = 2;
  else if (t >= 16 && t < 18) e = .3;
  for (const h of [2, 12, 20]) if (t >= h && t < h + .4) { const p = (t - h) / .4; e *= 1 + 2 * (1 - p * p); }
  return e;
};
/* intégrale de E précalculée pour chaque image (725 valeurs), 16 sous-pas par image */
const S = new Float64Array(NF);
for (let k = 1, acc = 0; k < NF; k++) {
  for (let j = 0; j < 16; j++) acc += Ef((k - 1 + (j + .5) / 16) / FPS) / (16 * FPS);
  S[k] = acc;
}
const Sat = t => { const f = cl(t * FPS, 0, NF - 1), i = Math.floor(f), j = Math.min(NF - 1, i + 1); return S[i] + (S[j] - S[i]) * (f - i); };

/* whip pan (5,85 → 6,15) : la poussière part vers la gauche avec la caméra (parallaxe selon le plan) */
const WHIP = t => -1250 * E2(cl((t - 5.85) / .3));
/* fonds clairs : lime 1,95 → 3,92 · papier 7,95 → 9,89 · lime 12,0 → 13,89 (instants mesurés sur les coupes) */
const SW = [1.95, 3.92, 7.95, 9.89, 12.0, 13.89];
const isLight = t => SW.filter(s => t >= s).length % 2 === 1;
/* passage de couleur : la poussière s’efface puis revient dans l’autre couleur en ±0,04 s autour de chaque bascule */
const dipAt = t => SW.reduce((m, s) => Math.min(m, cl(Math.abs(t - s) / .04)), 1);

const dust = id("dust"), ctx = dust.getContext("2d");
const G = [];
{
  const r = mkRnd(7); r();                      // la 1re valeur d’une graine courte est quasi nulle : on la jette
  const CH = ["L", "T", "&", ".", "€", "h", "@", "+", "?"];
  const FONTS = ["900 {s}px Archivo", "500 {s}px 'DM Mono'", "italic 400 {s}px 'Instrument Serif'"];
  /* 3 plans : lointain (×0,5), milieu (×1), proche (×1,8) */
  const PL = [{ k: .5, n: 62, s: [10, 15], a: [.12, .17] }, { k: 1, n: 48, s: [15, 24], a: [.16, .24] }, { k: 1.8, n: 30, s: [23, 34], a: [.22, .30] }];
  PL.forEach((P, pi) => {
    for (let i = 0; i < P.n; i++) {
      const ch = CH[Math.floor(r() * CH.length)];
      const fr = r(), font = fr < .55 ? 0 : fr < .8 ? 1 : 2;
      const size = Math.round(lerp(P.s[0], P.s[1], r()));
      const cr = r(), col = ch === "." ? (cr < .7 ? 1 : 0) : (cr < .6 ? 0 : cr < .8 ? 1 : 2);   // 0 blanc · 1 lime · 2 violet
      G.push({
        pl: pi, k: P.k, ch, size, font: FONTS[font].replace("{s}", size),
        a: lerp(P.a[0], P.a[1], r()), col,
        x0: r() * 1240, y0: r() * 2040,
        sa: lerp(8, 26, r()) * (r() < .5 ? -1 : 1), sp: r() * 6.283, sf: lerp(.45, 1.2, r()),
        r0: (r() - .5) * 1.2, rw: (r() - .5) * 1.1,
      });
    }
  });
}
const DARK = ["#ffffff", "#c8ff3e", "#9d86ff"], INK = "#0b0b10";
const rgba = (h, a) => `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${a})`;
const DARK_A = DARK.map(h => [rgba(h, 1), rgba(h, 0)]), INK_A = [rgba(INK, 1), rgba(INK, 0)];
const BASE = 46;                                  // px par unité d’énergie (≈ px/s en croisière) pour le plan ×1
const WW = 1240, MX = 80, HH = 2040, MY = 60;     // boîtes de bouclage (marges hors cadre)
const CX = 485, CY = 960;                         // point d’aspiration (le disque lime de S10)

/* position d’un glyphe à l’instant t (déterministe) : bouclage, balancement, whip, vibration du silence, aspiration */
const P = (g, i, t) => {
  const s = Sat(t), f = Math.round(t * FPS);
  let x = mod(g.x0 + g.sa * Math.sin(g.sp + g.sf * s) + WHIP(t) * g.k, WW) - MX;
  let y = mod(g.y0 - BASE * g.k * s, HH) - MY;
  let rot = g.r0 + g.rw * s, sc = 1, al = g.a;
  if (t >= 11.75 && t < 12) { x += Math.round((hash(i, f) - .5) * 2.4); y += Math.round((hash(i + 977, f) - .5) * 2.4); }   // vibre de ±1 px
  if (t > 19.75) {                                // aspirée dans le point lime (485, 960) en s’éteignant
    const p = cl((t - 19.75) / .25), q = p * p;
    x = lerp(x, CX, q); y = lerp(y, CY, q); sc = 1 - .7 * q; al *= 1 - p * p * p * p; rot += q * 2 * g.rw;
  }
  return [x, y, rot, sc, al];
};
const SHUT = .5 / FPS;                            // obturateur 180° : la traînée couvre la moitié du trajet d’une image

onSeek(t => {
  ctx.clearRect(0, 0, 1080, 1920);
  if (t >= 20 || t < 0) return;                   // éteinte de 20,0 à la fin (S11 a ses propres particules)
  const light = isLight(t), dip = dipAt(t);
  const blur = (t > 5.84 && t < 6.17) || t > 19.75;  // flou de bougé seulement quand ça va vite (whip, aspiration)
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  for (let i = 0; i < G.length; i++) {
    const g = G[i];
    let [x, y, rot, sc, al] = P(g, i, t);
    al *= dip;
    if (al < .004) continue;
    const c = light ? INK : DARK[g.col];
    ctx.font = g.font; ctx.fillStyle = c;
    /* plan proche : léger halo (profondeur de champ) sur les fonds sombres seulement */
    if (g.pl === 2 && !light) { ctx.shadowColor = c; ctx.shadowBlur = 7; } else ctx.shadowBlur = 0;
    /* flou de bougé : traînée continue de la position (t − ½ image) à la position t, qui s’efface vers l’arrière,
       et glyphe légèrement étiré dans le sens du mouvement */
    let stretch = 1, ang = 0;
    if (blur) {
      const [x1, y1] = P(g, i, t - SHUT), dx = x1 - x, dy = y1 - y, L = Math.hypot(dx, dy);
      if (L > 4 && L < 700) {                     // (au-delà de 700 px : saut de bouclage, pas un mouvement)
        const hg = Math.max(1.5, g.size * .2 * sc), A = light ? INK_A : DARK_A[g.col];
        const gr = ctx.createLinearGradient(x, y, x1, y1); gr.addColorStop(0, A[0]); gr.addColorStop(1, A[1]);
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.shadowBlur = 0; ctx.globalAlpha = al * .8;
        ctx.strokeStyle = gr; ctx.lineWidth = hg; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x1, y1); ctx.stroke();
        stretch = 1 + Math.min(L / 40, .9); ang = Math.atan2(dy, dx); al *= .75;
      }
    }
    ctx.globalAlpha = al;
    /* étirement le long de la direction du mouvement, puis rotation propre du glyphe */
    ctx.setTransform(1, 0, 0, 1, x, y);
    if (stretch > 1) { ctx.rotate(ang); ctx.scale(stretch, 1); ctx.rotate(-ang); }
    ctx.scale(sc, sc); ctx.rotate(rot);
    ctx.fillText(g.ch, 0, 0);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.shadowBlur = 0;
});

/* ================= 2) GRAIN ================= */
const GR = [0, 1, 2].map(i => id("g" + i));
{
  GR.forEach((el, i) => {
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const x = c.getContext("2d"), im = x.createImageData(256, 256), r = mkRnd(4099 + i * 7919); r(); r();
    for (let p = 0; p < 65536; p++) {
      const v = cl(Math.round(128 + (r() + r() + r() + r() - 2) * 165), 0, 255);   // bruit gris quasi gaussien centré sur 128
      im.data[p * 4] = im.data[p * 4 + 1] = im.data[p * 4 + 2] = v; im.data[p * 4 + 3] = 255;
    }
    x.putImageData(im, 0, 0);
    el.style.backgroundImage = `url(${c.toDataURL("image/png")})`;
  });
}
onSeek(t => {
  const f = Math.round(t * FPS), n = f % 3;
  const op = t >= 7.95 && t < 9.89 ? .04 : .06;           // plus discret sur le papier
  GR.forEach((el, i) => {
    el.style.opacity = i === n ? op : 0;
    if (i === n) el.style.backgroundPosition = `${Math.floor(hash(f, 31) * 256)}px ${Math.floor(hash(f, 57) * 256)}px`;
  });
});

/* ================= 3) VIGNETTE ================= */
const vig = id("vig");
/* transparent jusqu’à stop %, puis montée en u² jusqu’à rgba(0,0,0,.45) au coin : pas d’arête visible (bande de Mach) au départ du dégradé */
const VIG = stop => `radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) ${stop.toFixed(2)}%,` +
  [.25, .5, .75].map(u => `rgba(0,0,0,${(.45 * u * u).toFixed(4)}) ${(stop + (100 - stop) * u).toFixed(2)}%`).join(",") + `,rgba(0,0,0,.45) 100%)`;
let vigStop = -1;
onSeek(t => {
  const pulse = ph => Math.exp(-ph / .08);
  let o, stop = 55;
  if (t >= 11.75 && t < 12) {                       // silence : opacité 1, la vignette inspire lentement vers le point
    const p = (t - 11.75) / .25; o = 1; stop = 55 - 9 * Math.sin(p * Math.PI / 2);
  } else if (t >= 16 && t < 18) o = .8 + .2 * pulse(mod(t - 16, 1));   // demi-temps : pulses à 16,0 et 17,0 seulement
  else o = .8 + .2 * pulse(mod(t, .5));
  /* champs lime (drops 2–4 et 12–14) : même pulse mais ×0,65, sinon les bords du lime virent à l’olive.
     On y entre avec l’iris lime (1,90 → 1,97) et l’explosion du point (12,0), on en sort sous l’encre (3,88 · 13,86). */
  const wl = t < 3 ? IO(cl((t - 1.9) / .07)) : t < 6 ? 1 - IO(cl((t - 3.88) / .05))
           : t < 12 ? 0 : t < 13 ? 1 : 1 - IO(cl((t - 13.86) / .05));
  o *= 1 - .35 * wl;
  /* scène claire 8–10 : .35 (on y glisse pendant l’iris 7,87 → 7,97, on en sort sous les paupières 9,87 → 9,95) */
  const w = t < 8.9 ? IO(cl((t - 7.87) / .1)) : 1 - IO(cl((t - 9.87) / .08));
  o = lerp(o, .35, w);
  vig.style.opacity = o.toFixed(3);
  if (stop !== vigStop) { vigStop = stop; vig.style.background = VIG(stop); }
});

/* ================= 4) FUITES DE LUMIÈRE ================= */
/* opacité o0 → 0 (tient un peu puis s’éteint) en glissant de 300 px le long de la bande (sortie douce) */
const leak = (el, t0, dur, o0, dir) => samp(el, p => ({
  opacity: +(o0 * (1 - p) * (1 - .35 * p)).toFixed(4),
  transform: `rotate(-30deg) translateX(${(dir * (-150 + 300 * EO(p))).toFixed(1)}px)`,
}), t0, dur);
leak(id("leak-a"), 2.0, .5, .5, 1);
leak(id("leak-b"), 12.0, .5, .5, -1);
leak(id("leak-w"), 17.9, .4, .35, 1);
leak(id("leak-c"), 20.0, .5, .5, 1);

/* ================= 5) TRAÎNÉES DU WHIP ================= */
{
  const box = id("whip"), r = mkRnd(66); r();
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("i"); el.className = "fx-st";
    const h = 2 + Math.round(r() * 2), w = Math.round(lerp(300, 900, r()));
    const y = Math.round(lerp(140, 1780, (i + r()) / 10));        // réparties sur toute la hauteur
    const t0 = 5.85 + ((i * 7) % 10 + r() * .6) / 10 * .14, dur = .15 + r() * .01;   // départs étalés 5,85 → 5,99, fin ≤ 6,15
    el.style.cssText = `top:${y}px;width:${w}px;height:${h}px`;
    box.append(el);
    el.animate([
      { opacity: .5, transform: "translateX(1200px)" },
      { opacity: .5, transform: "translateX(-1400px)", offset: .96 },
      { opacity: 0, transform: "translateX(-1400px)" },
    ], { delay: ms(t0), duration: ms(dur), easing: "linear", fill: "forwards" });
  }
}

/* ================= 6) BLOOM DE L’IRIS ================= */
samp(id("bloom"), p => ({ opacity: +(.25 * (1 - EO(p))).toFixed(4), transform: `scale(${(1 + .08 * EO(p)).toFixed(4)})` }), 7.92, .2, 12);
