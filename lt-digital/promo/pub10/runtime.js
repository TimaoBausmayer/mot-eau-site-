/* ===== Pub 10 — moteur commun (chargé avant les scripts des scènes) =====
   Règles : aucune horloge réelle. Tout mouvement = animation CSS (animation-delay ABSOLU en s),
   ou element.animate(...) avec delay ABSOLU en ms, ou dessin canvas via onSeek(t => ...).
   Aléatoire : uniquement mkRnd(graine) (déterministe). */
window.mkRnd = seed => { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
window.SEEK_HOOKS = [];
window.onSeek = fn => SEEK_HOOKS.push(fn);            // fn(tSeconds) doit tout redessiner pour l'instant t
/* split(el, t0, dt) : découpe le texte de el en lettres <span class="ch"> avec --i et --t = t0 + i*dt (s).
   Les espaces restent des espaces. Retourne la liste des spans. */
window.split = (el, t0 = 0, dt = 0.03) => {
  const txt = el.textContent; el.textContent = ""; const out = []; let i = 0;
  for (const c of txt) { const s = document.createElement("span"); s.className = "ch"; s.textContent = c;
    s.style.setProperty("--i", i); s.style.setProperty("--t", (t0 + i * dt).toFixed(3) + "s"); el.append(s); out.push(s); if (c !== " ") i++; }
  return out;
};
window.$ = (sel, root = document) => root.querySelector(sel);
window.$$ = (sel, root = document) => [...root.querySelectorAll(sel)];
