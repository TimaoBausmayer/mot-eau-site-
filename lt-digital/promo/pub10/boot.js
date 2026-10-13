/* ===== Pub 10 — démarrage (après les scripts des scènes) ===== */
(function(){
  const vp = document.getElementById("vp"), DUR = 24;
  const fit = () => { const k = Math.min(innerWidth / 1080, innerHeight / 1920); vp.style.transform = `scale(${k})`; vp.style.margin = `${(1920 * k - 1920) / 2}px ${(1080 * k - 1080) / 2}px`; };
  addEventListener("resize", fit); fit();
  const all = () => document.getAnimations();
  const hooks = t => SEEK_HOOKS.forEach(f => { try { f(t); } catch (e) { console.error(e); } });
  if (/[?&]capture/.test(location.search)) {
    document.body.classList.add("capture");
    window.seek = ms => { all().forEach(a => { a.pause(); a.currentTime = ms; }); hooks(ms / 1000); };
    window.seek(0);
  } else {
    let t0 = performance.now();
    const restart = () => { all().forEach(a => { a.currentTime = 0; a.play(); }); t0 = performance.now(); };
    document.getElementById("replay").onclick = restart;
    const loop = () => { const t = (performance.now() - t0) / 1000; if (t >= DUR) restart(); hooks(Math.min(t, DUR)); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
})();
