(function(){
let C = window.SITE_CONFIG;
const PREVIEW = /[?&]preview/.test(location.search);
if (PREVIEW) { try { const d = localStorage.getItem("ltd_draft"); if (d) C = JSON.parse(d); } catch(e){}
  const b = document.createElement("div"); b.textContent = "APERÇU — brouillon non publié";
  b.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:99;background:#ffb020;color:#111;font:700 12px Inter,sans-serif;padding:6px 12px;border-radius:99px"; document.body.appendChild(b); }
const $ = id => document.getElementById(id);
const esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt = n => { const r = Math.round(n*100)/100, v = Number.isInteger(r) ? r.toLocaleString("fr-FR") : r.toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2}); return C.currency.after ? v+" "+C.currency.symbol : C.currency.symbol+v; };

/* {delivery} : le délai de livraison réglé dans config.delivery */
(function tok(o){ const f = s => String(s).replace(/\{delivery\}/g, C.delivery||""); (function w(x){ if(Array.isArray(x)) x.forEach((v,i)=>{ if(typeof v==="string") x[i]=f(v); else w(v); }); else if(x&&typeof x==="object") Object.keys(x).forEach(k=>{ if(typeof x[k]==="string") x[k]=f(x[k]); else w(x[k]); }); })(C); })();
const TX = Object.assign({ badge_pop:"Le plus choisi", label_delivery:"Livraison :", label_from:"À partir de", label_delay_est:"Délai estimé :" }, C.texts||{});
const VAT = Object.assign({mode:"ttc",rate:20,note:""}, C.vat||{}); const vr = (+VAT.rate||0)/100;
const vtag = VAT.mode==="ttc" ? "TTC" : VAT.mode==="ht" ? "HT" : "";
const vt = vtag ? ` <small class="vt">${vtag}</small>` : "";
const vatNote = VAT.note || (VAT.mode==="ttc" ? `Prix en euros TTC (TVA ${VAT.rate} % incluse).` : VAT.mode==="ht" ? `Prix en euros HT. TVA ${VAT.rate} % en sus.` : "TVA non applicable, art. 293 B du CGI.");
const delayOf = p => p.delay || C.delivery || "";

/* thème */
document.documentElement.style.setProperty("--accent", C.accent);
document.documentElement.style.setProperty("--accent2", C.accent2);
/* texte posé sur la couleur principale : foncé si la couleur est claire, blanc sinon */
(function(){ const m = String(C.accent||"").match(/^#?([0-9a-f]{6})$/i); if (!m) return; const n = parseInt(m[1],16), L = (.299*(n>>16) + .587*(n>>8&255) + .114*(n&255))/255;
  document.documentElement.style.setProperty("--on-accent", L > .6 ? "#0a0912" : "#fff"); })();
document.title = C.brand + " — " + C.tagline;

/* en-tête */

$("logo").innerHTML = `<img src="${esc(C.logo)}" alt="" width="46" height="46"><b>${esc(C.brand)}</b>`;
$("f-logo").src = C.logoBig; $("f-insta").href = C.contact.instagram; $("f-insta").textContent = C.contact.instagramHandle;
$("f-brand").textContent = C.brand; $("f-copy").textContent = "© " + new Date().getFullYear() + " " + C.brand;
$("f-text").textContent = C.footer;
$("h-badge").textContent = C.hero.badge; $("h-badge-wrap").hidden = !C.hero.badge;
/* titre : chaque mot apparaît l'un après l'autre */
(function(){ let i = 0; const words = (el, txt) => { el.innerHTML = String(txt||"").split(/\s+/).filter(Boolean).map(w=>`<span class="w" style="--i:${i++}"><span>${esc(w)}</span></span>`).join(" "); };
  words($("h-title"), C.hero.title); words($("h-accent"), C.hero.titleAccent);
  $("h1").style.setProperty("--n", i);
  $("h-accent").insertAdjacentHTML("beforeend", `<svg class="swoosh" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 10 C 70 2, 150 2, 298 8" /></svg>`); })();
/* mots qui défilent : « Pensé pour les restaurants / boulangeries / … » */
(function(){ const r = (C.hero.rotate||[]).filter(Boolean); if(!r.length) return; const el = $("h-rot"); el.hidden = false;
  el.innerHTML = `${esc(C.hero.rotatePrefix||"")} <span class="rot">${r.map((w,i)=>`<b class="${i?"":"on"}">${esc(w)}</b>`).join("")}</span>`;
  const bs = el.querySelectorAll(".rot b"), box = el.querySelector(".rot"); let k = 0;
  const fit = () => { box.style.width = bs[k].offsetWidth + "px"; }; requestAnimationFrame(fit); addEventListener("resize", fit);
  if (r.length<2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setInterval(()=>{ const o = bs[k]; o.classList.remove("on"); o.classList.add("out"); setTimeout(()=>o.classList.remove("out"), 500); k = (k+1)%bs.length; bs[k].classList.add("on"); fit(); }, 2200); })();
/* petites coches sous les boutons */
(function(){ const t = (C.hero.trust||[]).filter(Boolean); if(!t.length) return; $("h-trust").hidden = false;
  $("h-trust").innerHTML = t.map(x=>`<li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3 3 7-7"/></svg>${esc(x)}</li>`).join(""); })();
/* fond du haut : bulles de lumière floues qui flottent (style des pubs) */
(function(){ const box = $("hero-bokeh"); if (!box) return; const cols = ["127,155,255","192,132,252","94,234,212","200,255,62","255,190,140","255,255,255"];
  let sd = 5; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647; const k = innerWidth < 700 ? 7 : 11;
  box.innerHTML = Array.from({length:k}, (_, i) => { const s = 40 + r()*150;
    return `<i style="--s:${s.toFixed(0)}px;--x:${(r()*100).toFixed(1)}%;--y:${(r()*100).toFixed(1)}%;--c:${cols[i%cols.length]};--o:${(.25+r()*.45).toFixed(2)};--d:${(9+r()*10).toFixed(1)}s;--dl:-${(r()*10).toFixed(1)}s;--mx:${((r()-.5)*120).toFixed(0)}px;--my:${((r()-.5)*160).toFixed(0)}px"></i>`; }).join(""); })();
/* barre « demande » : des exemples de projets s'écrivent tout seuls */
(function(){ const list = ((C.hero||{}).prompts||[]).filter(Boolean), el = $("h-prompt"); if (!el || !list.length) return; el.hidden = false;
  const q = $("hp-q"); el.setAttribute("aria-label", list[0]);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches){ q.textContent = list[0]; return; }
  let i = 0, n = 0, del = false;
  const tick = () => { const txt = list[i];
    if (!del){ n++; q.textContent = txt.slice(0, n); if (n >= txt.length){ del = true; el.classList.add("ok"); setTimeout(()=>el.classList.remove("ok"), 600); return setTimeout(tick, 1900); } return setTimeout(tick, 38 + Math.random()*55); }
    n -= 2; q.textContent = txt.slice(0, Math.max(0, n)); if (n <= 0){ del = false; n = 0; i = (i+1) % list.length; return setTimeout(tick, 350); } setTimeout(tick, 18); };
  setTimeout(tick, 1700); })();
/* bande des métiers qui défile (tirée des réalisations) */
(function(){ const names = [...new Set((C.portfolio||[]).map(p=>String(p.category||p.tag||"").split("·")[0].trim()).filter(Boolean))]; if(names.length<3) return;
  const idx = n => (C.portfolio||[]).findIndex(p=>String(p.category||p.tag||"").split("·")[0].trim()===n);
  const row = (dup) => names.map(n=>`<button type="button" class="tr" data-p="${idx(n)}" ${dup?'tabindex="-1"':""}>${esc(n)}</button><i>✦</i>`).join("");
  $("trades-track").innerHTML = row(false) + row(true); $("trades").hidden = false; $("trades").removeAttribute("aria-hidden");
  $("trades").addEventListener("click", e=>{ const b = e.target.closest("[data-p]"); if (b && +b.dataset.p>=0) openDemo(+b.dataset.p); }); })();
$("h-text").textContent = C.hero.text;
$("h-cta1").textContent = C.hero.cta1;
$("h-cta1").href = "#tarifs";
$("h-cta2").textContent = C.hero.cta2;
/* envie d'acheter : prix d'appel dans le bouton, offre en cours, carte de prix sur les maquettes */
(function(){ const T = C.texts||{}, priced = (C.plans||[]).filter(p=>p.price!=null);
  if (priced.length){ const min = Math.min(...priced.map(p=>+p.price)); $("h-cta1").insertAdjacentHTML("beforeend", ` <small class="cta-price">${esc(T.hero_from||"dès")} ${esc(fmt(min))}</small>`); }
  const pr = (C.promos||[]).find(x=>x.active && x.code && !x.auto && (!x.end || new Date(x.end) >= new Date()));
  if (pr && $("h-offer")){ const v = pr.type==="percent" ? `−${pr.value} %` : `−${fmt(pr.value)}`;
    $("h-offer").innerHTML = `<b>${esc(v)}</b><span>${esc(pr.label||T.hero_offer||"Offre en cours")} avec le code</span><code>${esc(pr.code)}</code><em aria-hidden="true">→</em>`; $("h-offer").hidden = false; }
  const pop = (C.plans||[]).find(p=>p.popular && p.price!=null) || priced[0];
  if (pop) setTimeout(()=>{ const vi = document.querySelector("#hero-vis .vis-in"); if (!vi) return;
    vi.insertAdjacentHTML("beforeend", `<a href="#tarifs" class="h-price"><span class="hpp-t">${esc(T.badge_pop||"Le plus choisi")}</span><b>${esc(pop.name)}</b><span class="hpp-p">${pop.from?esc(T.hero_from||"dès")+" ":""}<strong>${esc(fmt(pop.price))}</strong></span><small>${esc(TX.label_delivery)} ${esc(delayOf(pop))}</small><span class="hpp-go">${esc(T.hero_price_btn||"Je le veux")} →</span></a>`); }, 0); })();
$("stats").innerHTML = C.stats.map(s=>`<div class="stat"><dt data-v="${esc(s.value)}">${esc(s.value)}</dt><dd>${esc(s.label)}</dd></div>`).join("");
/* visuel du haut : tes propres maquettes dans des fenêtres de navigateur */
(function(){ const v = C.hero.visual || {}, vis = $("hero-vis");
  const host = src => { const p = (C.portfolio||[]).find(x=>x.image===src||x.mobile===src); return p ? p.name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"")+".fr" : "ton-site.fr"; };
  const fr = (cls, src)=> src ? `<div class="vf ${cls}"><div class="bar"><i></i><i></i><i></i><span class="url">${esc(host(src))}</span></div><div class="crop"><img src="${esc(src)}" alt=""></div></div>` : "";
  const notes = (C.hero.notes||[]).filter(n=>n&&n.title).slice(0,3);
  vis.innerHTML = `<div class="vis-in">${fr("a", v.a) + fr("b", v.b) + (v.phone ? `<div class="vp"><img src="${esc(v.phone)}" alt=""></div>` : "")}${notes.map((n,i)=>`<div class="note n${i+1}" style="--k:${i}"><span class="ni">${esc(n.icon||"•")}</span><span><b>${esc(n.title)}</b><small>${esc(n.text||"")}</small></span></div>`).join("")}</div>`;
  vis.hidden = !(v.a||v.b);
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches, fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  /* les fenêtres font défiler tes maquettes une à une (fondu), clic = aperçu en grand */
  const P = (C.portfolio||[]).filter(p=>p.image);
  const slots = [...vis.querySelectorAll(".vf, .vp")].map(el=>{ const mob = el.classList.contains("vp"), img = el.querySelector("img"), src = img.getAttribute("src");
    let i = P.findIndex(p=>(mob?p.mobile:p.image)===src); el.dataset.p = i; return {el, mob, i}; });
  slots.forEach(s=>{ s.el.insertAdjacentHTML("beforeend", `<span class="vhint">${esc((C.texts||{}).hero_view||"Voir en grand")} ↗</span>`); s.el.addEventListener("click", ()=>{ const i = +s.el.dataset.p; if (i>=0) openDemo(C.portfolio.indexOf(P[i])); }); });
  const used = () => slots.map(s=>s.i);
  function swap(s){
    let n = s.i, guard = 0; do { n = (n+1) % P.length; guard++; } while ((used().includes(n) || (s.mob && !P[n].mobile)) && guard < P.length+1);
    const src = s.mob ? P[n].mobile : P[n].image; if (!src) return; const pre = new Image(); pre.src = src;
    pre.onload = ()=>{ const box = s.mob ? s.el : s.el.querySelector(".crop"), old = box.querySelector("img"), im = document.createElement("img");
      im.src = src; im.alt = ""; im.className = "fadein"; old.after(im); setTimeout(()=>old.remove(), 900);
      const u = s.el.querySelector(".url"); if (u){ u.classList.add("chg"); setTimeout(()=>{ u.textContent = host(P[n].image); u.classList.remove("chg"); }, 250); }
      s.i = n; s.el.dataset.p = n; };
  }
  if (!still && P.length > slots.length){ let k = 0, on = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(es=>{ on = es[0].isIntersecting; }).observe(vis);
    setInterval(()=>{ if (!on || document.hidden || vis.matches(":hover")) return; swap(slots[k % slots.length]); k++; }, 3800); }
  /* halo de lumière qui suit la souris + profondeur au défilement + boutons « aimantés » */
  const hero = document.querySelector(".hero");
  if (fine && !still){
    hero.addEventListener("pointermove", e=>{ const r = hero.getBoundingClientRect(); hero.style.setProperty("--mx", (e.clientX-r.left)+"px"); hero.style.setProperty("--my", (e.clientY-r.top)+"px"); hero.classList.add("lit"); }, {passive:true});
    hero.addEventListener("pointerleave", ()=>hero.classList.remove("lit"));
    hero.querySelectorAll(".cta-row .btn").forEach(b=>{
      b.addEventListener("pointermove", e=>{ const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX-r.left-r.width/2)*.18}px ${(e.clientY-r.top-r.height/2)*.28}px`; });
      b.addEventListener("pointerleave", ()=>{ b.style.translate = ""; }); });
  }
  if (!still && matchMedia("(min-width:961px)").matches){ const bg = hero.querySelector(".hero-bg"); let t = 0;
    addEventListener("scroll", ()=>{ if (t) return; t = requestAnimationFrame(()=>{ t = 0; const y = scrollY; if (y > innerHeight*1.2) return;
      vis.style.translate = `0 ${y*-.12}px`; bg.style.translate = `0 ${y*.25}px`; }); }, {passive:true}); }
  /* léger effet 3D qui suit la souris (ordinateur uniquement) */
  if (matchMedia("(hover:hover) and (pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    const inner = vis.querySelector(".vis-in"); let raf = 0;
    addEventListener("pointermove", e=>{ if(raf) return; raf = requestAnimationFrame(()=>{ raf = 0; const r = vis.getBoundingClientRect(); if (r.bottom<0) return;
      const x = (e.clientX/innerWidth-.5), y = (e.clientY/innerHeight-.5); inner.style.transform = `rotateY(${x*8}deg) rotateX(${-y*6}deg)`; }); }, {passive:true});
  } })();

/* promotions : liste config.promos (l'ancien format config.promoCodes reste lu) */
const frDate = d => String(d).split("-").reverse().join("/");
function promos(){
  const out = (C.promos||[]).map(p=>({...p}));
  Object.entries(C.promoCodes||{}).forEach(([k,v])=>{ if(!out.some(p=>(p.code||"").toUpperCase()===k.toUpperCase())) out.push({code:k,type:"percent",value:v}); });
  return out;
}
function promoErr(p, planId, sub){
  const t = new Date().toISOString().slice(0,10);
  if (p.active===false) return "Ce code n'est plus actif.";
  if (p.start && t<p.start) return "Ce code sera valable à partir du "+frDate(p.start)+".";
  if (p.end && t>p.end) return "Ce code a expiré.";
  if (p.plans && p.plans.length && !p.plans.includes(planId)) return "Ce code ne s'applique pas à cette gamme.";
  if (p.minTotal && sub<p.minTotal) return "Commande minimale pour ce code : "+fmt(p.minTotal)+".";
  return "";
}
function promoAmount(p, planPrice, sub){
  const base = p.on==="plan" ? planPrice : sub;
  return Math.max(0, p.type==="amount" ? Math.min(+p.value||0, base) : base*(+p.value||0)/100);
}
const promoLabel = p => p.type==="amount" ? "-"+fmt(p.value) : "-"+p.value+" %";
const isAuto = p => p.auto===true || !p.code;
function autoPromoFor(plan){
  if (plan.price==null) return null; let best=null, bd=0;
  promos().forEach(p=>{ if(!isAuto(p)||promoErr(p,plan.id,plan.price)) return; const d=promoAmount(p,plan.price,plan.price); if(d>bd){bd=d;best=p;} });
  return best ? {p:best, d:bd} : null;
}

/* gammes (avec filtre par groupe si plusieurs groupes) */
const unitHTML = p => p.unit ? ` <small>${esc(p.unit)}</small>` : "";
function priceHTML(p){
  if (p.price==null) return `<div class="price">Sur devis</div>`;
  const from = p.from ? `<small>${esc(TX.label_from)}</small> ` : "", ap = autoPromoFor(p);
  if (ap && ap.d>0) return `<div class="price">${from}<s class="old">${fmt(p.price)}</s> ${fmt(p.price-ap.d)}${unitHTML(p)}${vt}</div><div class="promo-tag">${esc(ap.p.label||"Promo")} (${promoLabel(ap.p)})</div>`;
  return `<div class="price">${from}<span class="num" data-n="${p.price}">${fmt(p.price)}</span>${unitHTML(p)}${vt}</div>`;
}
let groupSel = "Tous";
function drawPlans(){
  const groups = [...new Set(C.plans.map(p=>p.group).filter(Boolean))];
  $("plan-filters").innerHTML = groups.length>1 ? ["Tous"].concat(groups).map(g=>`<button class="chip ${g===groupSel?"on":""}" data-g="${esc(g)}">${esc(g)}</button>`).join("") : "";
  $("plans").innerHTML = C.plans.filter(p=>groupSel==="Tous"||!p.group||p.group===groupSel).map(p=>`
  <article class="plan ${p.popular?"pop":""}">
    ${p.popular?`<span class="ribbon">${esc(TX.badge_pop)}</span>`:""}
    <h3>${esc(p.name)}</h3><p class="tag">${esc(p.tagline)}</p>
    ${priceHTML(p)}<div class="delay">${esc(TX.label_delivery)} ${esc(delayOf(p))}</div>
    <ul>${p.features.map(f=>f[0]==="!"?`<li class="no">${esc(f.slice(1))}</li>`:`<li>${esc(f)}</li>`).join("")}</ul>
    <a href="#commande" class="btn ${p.popular?"":"btn-ghost"}" data-plan="${esc(p.id)}">${esc(p.cta)}</a>
  </article>`).join("");
}
$("plan-filters").addEventListener("click",e=>{ const b=e.target.closest("[data-g]"); if(b){ groupSel=b.dataset.g; drawPlans(); } });
$("plans").addEventListener("click",e=>{ const b=e.target.closest("[data-plan]"); if(b){ const r=form.querySelector(`input[name=plan][value="${b.dataset.plan}"]`); if(r){ r.checked=true; drawOpts(); render(); } } });
drawPlans();
/* mobile : gammes en carrousel (on glisse), centré sur la gamme la plus choisie, avec petits points */
(function(){ const box = $("plans"), dots = $("plans-dots");
  const cards = () => [...box.querySelectorAll(".plan")];
  const sync = () => { const c = cards(), mid = box.scrollLeft + box.clientWidth/2; let k = 0;
    c.forEach((el,i)=>{ if (Math.abs(el.offsetLeft+el.offsetWidth/2-mid) < Math.abs(c[k].offsetLeft+c[k].offsetWidth/2-mid)) k = i; });
    [...dots.children].forEach((d,i)=>d.classList.toggle("on", i===k)); };
  const build = () => { dots.innerHTML = cards().map((_,i)=>`<button type="button" data-i="${i}"></button>`).join(""); sync(); };
  dots.addEventListener("click", e=>{ const b = e.target.closest("[data-i]"); if(!b) return; const el = cards()[+b.dataset.i]; box.scrollTo({left: el.offsetLeft - (box.clientWidth-el.offsetWidth)/2, behavior:"smooth"}); });
  box.addEventListener("scroll", ()=>requestAnimationFrame(sync), {passive:true});
  new MutationObserver(build).observe(box, {childList:true}); build();
  const pop = box.querySelector(".plan.pop"); if (pop && box.scrollWidth > box.clientWidth) box.scrollLeft = pop.offsetLeft - (box.clientWidth-pop.offsetWidth)/2; sync();
})();

/* comparatif : choisir les gammes à mettre côte à côte + « seulement les différences » */
(function(){ const T = C.texts||{}, P = C.plans, rows = C.compare||[];
  if (!rows.length){ $("comparatif").hidden = true; $("cmp-link").hidden = true; return; }
  $("cmp-link").lastChild.textContent = " " + (T.cmp_link||"Comparer les gammes côte à côte");
  const small = () => innerWidth <= 760;
  let shown = new Set(), diffOnly = false;
  const pop = P.findIndex(p=>p.popular), def = () => { if (!small()) return P.map(p=>p.id);
    const a = Math.max(0, pop), b = a+1 < P.length ? a+1 : a-1; return [P[a].id, P[Math.max(0,b)].id]; };
  shown = new Set(def());
  const cell = v => v===true ? '<span class="yes" aria-label="Oui">✔</span>' : v===false ? '<span class="no" aria-label="Non">✕</span>' : esc(v==null?"—":v);
  const priceTxt = p => p.price==null ? "Sur devis" : (p.from?"dès ":"")+fmt(p.price)+(p.unit?" "+esc(p.unit):"")+(vtag?" "+vtag:"");
  function draw(){
    const cols = P.filter(p=>shown.has(p.id));
    $("cmp-tools").innerHTML = `<div class="ct-group"><span class="ct-lbl">${esc(T.cmp_pick||"Gammes à comparer")}</span>${P.map(p=>`<button type="button" class="ct-chip ${shown.has(p.id)?"on":""}" data-p="${esc(p.id)}" aria-pressed="${shown.has(p.id)}">${esc(p.name)}</button>`).join("")}</div>
      <label class="ct-switch"><input type="checkbox" id="ct-diff" ${diffOnly?"checked":""}><span class="ct-track"><i></i></span>${esc(T.cmp_diff||"Seulement les différences")}</label>`;
    const vis = rows.filter(r=>{ if(!diffOnly || cols.length<2) return true; const vals = cols.map(p=>JSON.stringify(r.values[p.id])); return new Set(vals).size > 1; });
    $("cmp").style.minWidth = (small() ? 110 + cols.length*118 : 170 + cols.length*150) + "px";
    $("cmp").innerHTML = `<thead><tr><th></th>${cols.map(p=>`<th class="${p.popular?"pop-col":""}" data-c="${esc(p.id)}">${p.popular?`<span class="cmp-badge">${esc(TX.badge_pop)}</span>`:""}<b>${esc(p.name)}</b><small>${priceTxt(p)}</small></th>`).join("")}</tr></thead>
      <tbody>${vis.map(r=>`<tr><td>${esc(r.label)}</td>${cols.map(p=>`<td class="${p.popular?"pop-col":""}" data-c="${esc(p.id)}">${cell(r.values[p.id])}</td>`).join("")}</tr>`).join("") || `<tr><td colspan="${cols.length+1}" class="cmp-same">${esc(T.cmp_same||"Ces gammes ont les mêmes caractéristiques : seul le prix change.")}</td></tr>`}
      <tr class="cmp-price"><td>Prix</td>${cols.map(p=>`<td class="${p.popular?"pop-col":""}" data-c="${esc(p.id)}"><b>${priceTxt(p)}</b></td>`).join("")}</tr>
      <tr class="cmp-act"><td></td>${cols.map(p=>`<td class="${p.popular?"pop-col":""}" data-c="${esc(p.id)}"><a href="#commande" class="btn btn-sm ${p.popular?"":"btn-ghost"}" data-plan="${esc(p.id)}">${esc(T.cmp_choose||"Choisir")}</a></td>`).join("")}</tr></tbody>`;
  }
  $("cmp-tools").addEventListener("click", e=>{ const b = e.target.closest("[data-p]"); if(!b) return; const id = b.dataset.p;
    if (shown.has(id)){ if (shown.size>1) shown.delete(id); } else shown.add(id); draw(); });
  $("cmp-tools").addEventListener("change", e=>{ if (e.target.id==="ct-diff"){ diffOnly = e.target.checked; draw(); } });
  /* colonne survolée mise en avant */
  $("cmp").addEventListener("mouseover", e=>{ const c = e.target.closest("[data-c]"); $("cmp").querySelectorAll(".hcol").forEach(x=>x.classList.remove("hcol")); if(c) $("cmp").querySelectorAll(`[data-c="${c.dataset.c}"]`).forEach(x=>x.classList.add("hcol")); });
  $("cmp").addEventListener("mouseleave", ()=>$("cmp").querySelectorAll(".hcol").forEach(x=>x.classList.remove("hcol")));
  $("cmp").addEventListener("click", e=>{ const b = e.target.closest("[data-plan]"); if(!b) return; const r = form.querySelector(`input[name=plan][value="${b.dataset.plan}"]`); if (r){ r.checked = true; drawOpts(); render(); } });
  let wasSmall = small(); addEventListener("resize", ()=>{ if (small()!==wasSmall){ wasSmall = small(); shown = new Set(def()); draw(); } });
  draw();
})();

/* options : rangées par rubrique (Populaires d'abord) */
const aTag = a => a.tag || (a.popular ? "Populaire" : "");
const aGroup = a => a.group || "Autres";
const groupsOf = list => { const out=[]; list.forEach(a=>{ if(!out.includes(aGroup(a))) out.push(aGroup(a)); }); return out; };
const aPrice = a => a.price==null ? "Sur devis" : "+ "+(a.from?"dès ":"")+fmt(a.price)+(vtag?" "+vtag:"")+(a.qty?" / unité":"");
const hasPop = C.addons.some(a=>a.popular);
let addonSel = hasPop ? "Populaires" : groupsOf(C.addons)[0];
function drawAddons(){
  const gs = (hasPop?["Populaires"]:[]).concat(groupsOf(C.addons));
  $("addon-filters").innerHTML = gs.length>1 ? gs.map(g=>`<button class="chip ${g===addonSel?"on":""}" data-ag="${esc(g)}">${esc(g)}</button>`).join("") : "";
  const names = ids => ids.map(id=>(C.plans.find(p=>p.id===id)||{}).name).filter(Boolean).join(", ");
  $("addons").innerHTML = C.addons.filter(a=>addonSel==="Populaires" ? a.popular : aGroup(a)===addonSel).map(a=>{
    const exc = (a.plans&&a.plans.length) ? C.plans.filter(p=>!a.plans.includes(p.id)).map(p=>p.id) : [];
    const note = [a.plans&&a.plans.length ? (exc.length<=a.plans.length ? "Pas avec : "+names(exc) : "Disponible avec : "+names(a.plans)) : "", a.included&&a.included.length?"Inclus dans : "+names(a.included):""].filter(Boolean).join(" · ");
    return `<div class="addon"><h4>${esc(a.name)}${aTag(a)?` <em class="otag">${esc(aTag(a))}</em>`:""}</h4><p>${esc(a.desc)}${note?`<span class="avail">${esc(note)}</span>`:""}</p><div class="aprice"><strong>${aPrice(a)}</strong><button type="button" class="add-btn" data-add="${esc(a.id)}">Ajouter</button></div></div>`; }).join("");
  try { syncAddButtons(state()); } catch(e) {}
}
$("addon-filters").addEventListener("click",e=>{ const b=e.target.closest("[data-ag]"); if(b){ addonSel=b.dataset.ag; drawAddons(); } });
drawAddons();

/* processus */
$("steps").innerHTML = C.process.map(s=>`<li class="step"><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></li>`).join("");

/* réalisations : filtre par catégorie + "voir plus" */
const LIMIT = 6; let tagSel = "Tous", showAll = false, curList = [];
const workHTML = (w,i)=>{
  const shot = w.image
    ? `<div class="shot"><img src="${esc(w.image)}" alt="Aperçu du site ${esc(w.name)}" loading="lazy">${w.mobile?`<div class="phone"><img src="${esc(w.mobile)}" alt="" loading="lazy"></div>`:""}</div>`
    : `<div class="shot s${esc(w.style||1)}"></div>`;
  const dom = (w.url||"").replace(/^https?:\/\//,"").replace(/^demos\//,"").replace(/\/?index\.html$/,"").replace(/\.html$/,"") || "ton-site.fr";
  const inner = `<div class="frame"><div class="fbar"><i></i><i></i><i></i><span>${esc(dom)}</span></div>${shot}</div><div class="work-in"><div><strong>${esc(w.name)}</strong><br><span>${esc(w.category)}</span></div>${w.url?"<em>Voir l'aperçu →</em>":""}</div>`;
  return `<a class="work" data-i="${i}" href="${esc(w.url||w.image||"#")}" target="_blank" rel="noopener">${inner}</a>`;
};
function drawWorks(){
  const tags = ["Tous"].concat([...new Set(C.portfolio.map(w=>w.tag).filter(Boolean))]);
  $("filters").innerHTML = tags.length>2 ? tags.map(t=>`<button class="chip ${t===tagSel?"on":""}" data-t="${esc(t)}">${esc(t)}</button>`).join("") : "";
  const list = curList = C.portfolio.filter(w=>tagSel==="Tous"||w.tag===tagSel);
  const shown = showAll||tagSel!=="Tous" ? list : list.slice(0,LIMIT);
  $("works").innerHTML = shown.map(workHTML).join("");
  $("more-btn").hidden = showAll || tagSel!=="Tous" || list.length<=LIMIT;
  $("more-btn").textContent = "Voir les "+list.length+" maquettes";
}
$("filters").addEventListener("click",e=>{ const b=e.target.closest("[data-t]"); if(b){ tagSel=b.dataset.t; drawWorks(); } });
$("more-btn").onclick = ()=>{ showAll=true; drawWorks(); };

/* aperçu en grand : fenêtre avec le site complet (ordinateur / téléphone) */
const lb = document.createElement("div"); lb.className = "lb"; lb.hidden = true; lb.setAttribute("role","dialog"); lb.setAttribute("aria-modal","true"); lb.setAttribute("aria-label","Aperçu du site");
lb.innerHTML = `<div class="lb-bar"><div class="lb-title"><strong id="lb-name"></strong><span id="lb-cat"></span></div>
  <div class="lb-dev" role="group" aria-label="Appareil"><button type="button" data-dev="desk" class="on">Ordinateur</button><button type="button" data-dev="mob">Téléphone</button></div>
  <div class="lb-act"><a id="lb-open" target="_blank" rel="noopener">Ouvrir dans un onglet ↗</a><a id="lb-order" class="btn btn-sm" href="#commande">Commander un site comme celui-ci</a><button type="button" id="lb-x" class="lb-x">Fermer</button></div></div>
  <div class="lb-stage"><button type="button" class="lb-nav" id="lb-prev" aria-label="Site précédent">‹</button><div class="lb-view" id="lb-view"></div><button type="button" class="lb-nav" id="lb-next" aria-label="Site suivant">›</button></div>`;
document.body.appendChild(lb);
let lbIdx = 0, lbDev = innerWidth<760 ? "mob" : "desk", lbOpener = null;
const lbView = lb.querySelector("#lb-view");
function lbFit(){
  const box = lbView.querySelector(".lb-box"); if(!box) return;
  const vw = lbView.clientWidth, vh = lbView.clientHeight;
  if (lbDev==="desk"){ const k = Math.min(1, vw/1280); box.style.cssText = `width:1280px;height:${Math.round(vh/k)}px;transform:scale(${k});transform-origin:top left`; lbView.querySelector(".lb-wrap").style.cssText = `width:${Math.round(1280*k)}px;height:${vh}px`; }
  else { const H = 780, k = Math.min(1, (vh-8)/(H+36), (vw-20)/414); box.style.cssText = `width:390px;height:${H}px;transform:scale(${k});transform-origin:top left`; lbView.querySelector(".lb-wrap").style.cssText = `width:${Math.round(390*k)+16}px;height:${Math.round(H*k)+16}px`; }
}
function lbShow(i){
  const n = curList.length; if(!n) return; lbIdx = (i+n)%n; const w = curList[lbIdx];
  lb.querySelector("#lb-name").textContent = w.name; lb.querySelector("#lb-cat").textContent = w.category||"";
  const open = lb.querySelector("#lb-open"); open.hidden = !w.url; if (w.url) open.href = w.url;
  lbView.className = "lb-view "+lbDev;
  const inner = w.url ? `<iframe src="${esc(w.url)}" title="Aperçu de ${esc(w.name)}" loading="eager"></iframe>` : `<img src="${esc(w.image||"")}" alt="Aperçu de ${esc(w.name)}">`;
  lbView.innerHTML = `<div class="lb-wrap"><div class="lb-box">${inner}</div></div>`; lbFit();
  lb.querySelectorAll("[data-dev]").forEach(b=>b.classList.toggle("on", b.dataset.dev===lbDev));
  lb.querySelector("#lb-prev").hidden = lb.querySelector("#lb-next").hidden = n<2;
}
function lbOpen(i){ lbOpener = document.activeElement; lb.hidden = false; document.body.style.overflow = "hidden"; lbShow(i); lb.querySelector("#lb-x").focus(); }
let lbSaved = null;
/* ouvre une maquette en grand depuis n'importe où (haut de page, bande des métiers) */
function openDemo(pi){ const w = C.portfolio[pi]; if(!w) return; lbSaved = curList; curList = C.portfolio.slice(); lbOpen(pi); }
function lbClose(){ if (lbSaved){ curList = lbSaved; lbSaved = null; } lb.hidden = true; document.body.style.overflow = ""; lbView.innerHTML = ""; if (lbOpener && lbOpener.focus) lbOpener.focus(); }
$("works").addEventListener("click", e=>{ const c = e.target.closest(".work"); if(!c || e.metaKey || e.ctrlKey || e.shiftKey || e.button===1) return; e.preventDefault(); lbOpen(+c.dataset.i); });
lb.addEventListener("click", e=>{
  if (e.target.closest("#lb-x")) return lbClose();
  if (e.target.closest("#lb-prev")) return lbShow(lbIdx-1);
  if (e.target.closest("#lb-next")) return lbShow(lbIdx+1);
  if (e.target.closest("#lb-order")) return lbClose();
  const d = e.target.closest("[data-dev]"); if (d){ lbDev = d.dataset.dev; lbShow(lbIdx); }
});
addEventListener("keydown", e=>{ if (lb.hidden) return; if (e.key==="Escape") lbClose(); else if (e.key==="ArrowLeft") lbShow(lbIdx-1); else if (e.key==="ArrowRight") lbShow(lbIdx+1); });
addEventListener("resize", ()=>{ if(!lb.hidden) lbFit(); });
drawWorks();

/* avis (affichés seulement s'il y en a) */
/* pourquoi un vrai site */
(function(){ const W = C.why; if(!W || !(W.items||[]).length){ $("pourquoi").hidden = true; return; }
  const sec = $("pourquoi"), hd = sec.querySelector(".sec-head"); hd.querySelector(".eyebrow").textContent = W.eyebrow||""; hd.querySelector("h2").textContent = W.title||""; hd.querySelector("p").textContent = W.intro||"";
  const I = { search:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/>', shield:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6Z"/><path d="m8.8 12 2.2 2.2 4.4-4.4"/>', clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    time:'<path d="M5 4h14M5 20h14M7 4c0 4.5 10 5.5 10 8s-10 3.5-10 8M17 4c0 4.5-10 5.5-10 8s10 3.5 10 8"/>', home:'<path d="M4 10.5 12 4l8 6.5V20H4Z"/><path d="M10 20v-5h4v5"/>', growth:'<path d="M4 18 10 12l3.5 3.5L20 9"/><path d="M15 9h5v5"/>' };
  $("why-grid").innerHTML = W.items.map((it,i)=>`<article class="why reveal" style="--d:${i*80}ms"><span class="why-ic"><svg viewBox="0 0 24 24" aria-hidden="true">${I[it.icon]||I.growth}</svg></span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></article>`).join("");
  const li = (arr, ok) => (arr||[]).map(x=>`<li><span class="vs-i ${ok?"ok":"ko"}">${ok?"✓":"✕"}</span>${esc(x)}</li>`).join("");
  $("why-vs").innerHTML = (W.without||[]).length ? `<div class="vs-col vs-no reveal"><h3>${esc(W.withoutTitle||"Sans site")}</h3><ul>${li(W.without,false)}</ul></div><div class="vs-arrow" aria-hidden="true">→</div><div class="vs-col vs-yes reveal"><h3>${esc(W.withTitle||"Avec un site")}</h3><ul>${li(W.with,true)}</ul>${W.cta?`<a href="#tarifs" class="btn btn-light btn-arrow">${esc(W.cta)}</a>`:""}</div>` : "";
})();

/* avis clients : note moyenne, cartes avec logo / site, formulaire pour laisser un avis */
const stars = n => { const r = Math.max(0, Math.min(5, Math.round(+n||0))); return `<span class="stars" aria-label="${r} sur 5">${"★".repeat(r)}<i>${"★".repeat(5-r)}</i></span>`; };
(function(){ const R = (C.testimonials||[]).filter(t=>t&&t.text), F = C.reviewsForm||{}, T = C.texts||{};
  if (!R.length && F.show===false) return;
  $("avis").hidden = false;
  const rated = R.filter(t=>+t.rating>0), avg = rated.length ? rated.reduce((s,t)=>s+(+t.rating),0)/rated.length : 0;
  $("rv-top").innerHTML = `${rated.length?`<div class="rv-score"><b>${avg.toFixed(1).replace(".",",")}</b><div>${stars(avg)}<small>${rated.length} avis client${rated.length>1?"s":""}</small></div></div>`:""}${F.show!==false?`<div class="rv-cta"><div><strong>${esc(F.title||"Laisse ton avis")}</strong><span>${esc(F.text||"")}</span></div><button type="button" class="btn" id="rv-open">${esc(T.rv_btn||"Laisser un avis")}</button></div>`:""}`;
  const host = u => { try { return new URL(u).hostname.replace(/^www\./,""); } catch { return u; } };
  $("reviews").innerHTML = R.length ? R.map((t,i)=>`<article class="review reveal" style="--d:${(i%3)*90}ms">
    ${t.image?`<a class="rv-shot" ${t.site?`href="${esc(t.site)}" target="_blank" rel="noopener"`:""}><img src="${esc(t.image)}" alt="Site de ${esc(t.role||t.name)}" loading="lazy"></a>`:""}
    <div class="rv-head">${t.logo?`<img class="rv-logo" src="${esc(t.logo)}" alt="Logo ${esc(t.role||"")}" loading="lazy">`:`<span class="rv-logo rv-ini">${esc((t.role||t.name||"?").trim()[0]||"?")}</span>`}<div><strong>${esc(t.role||t.name)}</strong>${t.role?`<span>${esc(t.name)}</span>`:""}</div>${+t.rating>0?stars(t.rating):""}</div>
    <p>“${esc(t.text)}”</p>
    <div class="rv-foot">${t.site?`<a class="rv-link" href="${esc(t.site)}" target="_blank" rel="noopener">${esc(T.rv_site||"Voir son site")} · ${esc(host(t.site))} ↗</a>`:""}${t.insta?`<a class="rv-link" href="https://www.instagram.com/${esc(String(t.insta).replace(/^@/,""))}" target="_blank" rel="noopener">${esc(t.insta.startsWith("@")?t.insta:"@"+t.insta)}</a>`:""}${t.date?`<time>${esc(t.date)}</time>`:""}</div>
  </article>`).join("") : [0,1,2].map(k=>`<article class="review rv-ghost reveal" style="--d:${k*90}ms"><div class="rv-head"><span class="rv-logo rv-ini rv-q">${k===0?"?":k===1?"★":"✎"}</span><div><strong>${esc(k===0?(T.rv_ghost1||"Ton commerce ici"):k===1?(T.rv_ghost2||"Ton logo, ton site"):(T.rv_ghost3||"Ton avis compte"))}</strong><span>${esc(T.rv_ghost_sub||"Bientôt sur cette page")}</span></div><span class="stars"><i>★★★★★</i></span></div><div class="rv-lines"><i></i><i></i><i style="width:60%"></i></div><div class="rv-foot"><button type="button" class="rv-link rv-open2">${esc(T.rv_btn||"Laisser un avis")} →</button></div></article>`).join("");
  /* formulaire */
  const dlg = $("rv-modal"), f = $("rv-form"); let note = 5;
  $("rv-m-text").textContent = F.text||"";
  const sIn = $("rv-stars-in"); const drawS = () => { sIn.innerHTML = [1,2,3,4,5].map(n=>`<button type="button" role="radio" aria-checked="${n===note}" aria-label="${n} sur 5" class="${n<=note?"on":""}" data-n="${n}">★</button>`).join("") + `<span>${note}/5</span>`; }; drawS();
  sIn.addEventListener("click", e=>{ const b = e.target.closest("[data-n]"); if(b){ note = +b.dataset.n; drawS(); } });
  const openDlg = ()=>{ dlg.showModal ? dlg.showModal() : dlg.setAttribute("open",""); };
  const open = $("rv-open"); if (open) open.onclick = openDlg;
  document.querySelectorAll(".rv-open2").forEach(b=>b.onclick = openDlg);
  /* raccourci dans le haut de page : note moyenne, ou invitation à laisser un avis */
  const hr = $("h-rv"); hr.hidden = false;
  hr.innerHTML = rated.length ? `${stars(avg)}<b>${avg.toFixed(1).replace(".",",")}/5</b><span>${rated.length} avis client${rated.length>1?"s":""}</span><em>→</em>`
    : `<span class="h-rv-ic" aria-hidden="true">💬</span><span>${esc(T.rv_hero||"Avis clients : découvre-les ou laisse le tien")}</span><em>→</em>`;
  $("rv-x").onclick = ()=>dlg.close ? dlg.close() : dlg.removeAttribute("open");
  dlg.addEventListener("click", e=>{ if (e.target===dlg) dlg.close(); });
  const msg = () => { const d = new FormData(f); return ["NOUVEL AVIS — "+C.brand, "", "Note : "+note+"/5", "Nom : "+(d.get("name")||""), "Activité : "+(d.get("biz")||""), "Site : "+(d.get("site")||"—"), "Instagram : "+(d.get("insta")||"—"), "", "Avis :", d.get("text")||"", "", "✔ J'accepte la publication de mon avis, de mon nom, de mon logo et du lien de mon site."].join("\n"); };
  const ct = C.contact||{}, toastR = t=>{ $("rv-toast").textContent = t; setTimeout(()=>$("rv-toast").textContent="", 4000); };
  $("rv-mail").onclick = ()=>{ if(!f.reportValidity()) return; if(!ct.email){ toastR("Ajoute ton e-mail dans l'admin (Contact)."); return; } location.href = "mailto:"+ct.email+"?subject="+encodeURIComponent("Avis client — "+(new FormData(f).get("biz")||""))+"&body="+encodeURIComponent(msg()); toastR("Ta messagerie s'ouvre : pense à joindre ton logo ! Merci 🙏"); };
  $("rv-copy").onclick = async ()=>{ if(!f.reportValidity()) return; try { await navigator.clipboard.writeText(msg()); } catch { const ta=document.createElement("textarea"); ta.value=msg(); document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
    toastR("Avis copié ! Colle-le en message privé sur Instagram "+(ct.instagramHandle||"")+", avec ton logo."); if (ct.instagram) window.open(ct.instagram, "_blank", "noopener"); };
})();
$("guar").innerHTML = C.guarantees.map(g=>`<div class="g"><span class="g-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7"/></svg></span><h4>${esc(g.title)}</h4><p>${esc(g.text)}</p></div>`).join("");
$("faq-list").innerHTML = C.faq.map(f=>`<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");

/* ---------- COMMANDE ---------- */
const O = C.order || {}; const T0 = C.texts || {};
const form = $("order-form");
const sel = {};            /* options choisies : id -> quantité */
let applied = "";          /* code promo tapé par le client */
/* logo, affiches & réseaux (config.services) : vendus avec ou sans site */
const SV = C.services && (C.services.items||[]).length ? C.services : null, SI = SV ? SV.items : [];
const svcSel = {};         /* services choisis : id -> quantité */
const NONE = {id:"__none", none:true, name:T0.pick_none||"Pas de site", price:0, delay:T0.label_delay_svc||"selon la prestation"};
function curPlan(){ return form.plan.value==="__none" ? NONE : (C.plans.find(p=>p.id===form.plan.value) || C.plans[0]); }
const allowed = (a,plan) => !plan.none && (!(a.plans&&a.plans.length) || a.plans.includes(plan.id));
const included = (a,plan) => !!(a.included&&a.included.includes(plan.id));
const clamp = (n,lo,hi) => Math.max(lo, Math.min(hi, n));

$("pick").innerHTML = C.plans.map((p,i)=>`<label><input type="radio" name="plan" value="${esc(p.id)}" ${p.popular||(!C.plans.some(x=>x.popular)&&i===0)?"checked":""}><span><b>${esc(p.name)}</b><small>${p.price==null?"Sur devis":(p.from?"dès ":"")+fmt(p.price)}</small></span></label>`).join("");
if (SV) $("pick").insertAdjacentHTML("beforeend", `<label class="pick-none"><input type="radio" name="plan" value="__none"><span><b>${esc(NONE.name)}</b><small>${esc(T0.pick_none_sub||"Services seuls")}</small></span></label>`);
if (O.askBusiness===false) form.biz.closest("label").hidden = true;
if (O.askProject===false) form.desc.closest("label").hidden = true;

const openG = new Set(); let gTouched = false;
function optHTML(a, plan){
  const inc = included(a,plan), on = inc || sel[a.id]>0;
  const price = inc ? "Inclus avec "+esc(plan.name) : aPrice(a);
  return `<label class="opt ${inc?"inc":""}"><input type="checkbox" data-a="${esc(a.id)}" ${on?"checked":""} ${inc?"disabled":""}><div><b>${esc(a.name)}</b>${aTag(a)?` <em class="otag">${esc(aTag(a))}</em>`:""}<br><small>${price}</small></div>${a.qty&&!inc?`<input type="number" min="1" max="${a.max||50}" value="${sel[a.id]||1}" data-q="${esc(a.id)}" aria-label="Quantité">`:""}</label>`;
}
function groupCounts(){ document.querySelectorAll("#opts details.og, #svc-opts details.og").forEach(d=>{ const n = d.querySelectorAll("input[data-a]:checked:not(:disabled), input[data-s]:checked").length; const c = d.querySelector("[data-cnt]"); if(c) c.textContent = n ? n+(n>1?" choisies":" choisie") : ""; }); }
function drawOpts(){
  const plan = curPlan(), list = C.addons.filter(a=>allowed(a,plan));
  const pop = list.filter(a=>a.popular), rest = list.filter(a=>!a.popular), groups = [];
  if (pop.length) groups.push(["Populaires", pop]); groupsOf(rest).forEach(g=>groups.push([g, rest.filter(a=>aGroup(a)===g)]));
  if (!gTouched && groups.length) openG.add(groups[0][0]);
  $("opts").innerHTML = groups.length ? groups.map(([g,arr])=>{ const open = openG.has(g) || arr.some(a=>sel[a.id]>0);
    return `<details class="og" data-g="${esc(g)}" ${open?"open":""}><summary><span>${esc(g)} <i>${arr.length}</i></span><small data-cnt></small></summary><div class="ogl">${arr.map(a=>optHTML(a,plan)).join("")}</div></details>`; }).join("") : `<p class="small">${plan.none ? esc(T0.opts_none||"Les options concernent les sites : choisis une gamme pour en ajouter.") : "Aucune option disponible pour cette gamme."}</p>`;
  groupCounts();
}
$("opts").addEventListener("toggle", e=>{ const d = e.target; if (d.classList && d.classList.contains("og")){ gTouched = true; d.open ? openG.add(d.dataset.g) : openG.delete(d.dataset.g); } }, true);
const svPrice = (it, short) => it.price==null ? "Sur devis" : (it.from?"dès ":"")+fmt(it.price)+(it.unit?" "+it.unit:"")+(vtag&&!short?" "+vtag:"")+(it.qty?" / unité":"");
const svOpen = new Set();
function drawSvcOpts(){
  if (!SV){ $("svc-block").hidden = true; return; }
  $("svc-h").textContent = T0.label_services || "Logo, affiches & réseaux";
  const plan = curPlan();
  $("svc-opts").innerHTML = groupsOf(SI).map((g,i)=>{ const arr = SI.filter(it=>aGroup(it)===g), open = svOpen.has(g) || arr.some(it=>svcSel[it.id]) || (plan.none && i===0 && !svOpen.size);
    return `<details class="og" data-g="${esc(g)}" ${open?"open":""}><summary><span>${esc(g)} <i>${arr.length}</i></span><small data-cnt></small></summary><div class="ogl">${arr.map(it=>`<label class="opt"><input type="checkbox" data-s="${esc(it.id)}" ${svcSel[it.id]?"checked":""}><div><b>${esc(it.name)}</b>${it.unit?` <em class="otag">${esc(T0.badge_monthly||"Abonnement")}</em>`:it.popular?` <em class="otag">Populaire</em>`:""}<br><small>${svPrice(it)}</small></div>${it.qty?`<input type="number" min="1" max="${it.max||50}" value="${svcSel[it.id]||1}" data-sq="${esc(it.id)}" aria-label="Quantité">`:""}</label>`).join("")}</div></details>`; }).join("");
}
$("svc-opts").addEventListener("toggle", e=>{ const d = e.target; if (d.classList && d.classList.contains("og")) d.open ? svOpen.add(d.dataset.g) : svOpen.delete(d.dataset.g); }, true);
function readSel(){
  $("svc-opts").querySelectorAll("[data-s]").forEach(cb=>{ const id = cb.dataset.s, it = SI.find(x=>x.id===id);
    if (cb.checked){ const q = $("svc-opts").querySelector(`[data-sq="${id}"]`); svcSel[id] = it.qty ? clamp(parseInt(q&&q.value)||1, 1, it.max||50) : 1; } else delete svcSel[id]; });
  $("opts").querySelectorAll("[data-a]").forEach(cb=>{
    if (cb.disabled) return; const id = cb.dataset.a, a = C.addons.find(x=>x.id===id);
    if (cb.checked){ const q = $("opts").querySelector(`[data-q="${id}"]`); sel[id] = a.qty ? clamp(parseInt(q&&q.value)||1, 1, a.max||50) : 1; } else delete sel[id];
  });
}

function state(){
  const plan = curPlan(), lines = [], monthly = []; let devis = plan.price==null;
  lines.push({label: plan.name+(plan.from?" (dès)":""), amount: plan.price||0, devis: plan.price==null, none: plan.none});
  C.addons.forEach(a=>{
    if (!allowed(a,plan)) return;
    if (included(a,plan)){ lines.push({label:a.name, amount:0, inc:true}); return; }
    const q = sel[a.id]; if (!q) return;
    lines.push({label: a.name+(q>1?" ×"+q:""), amount:(a.price||0)*q, devis: a.price==null}); if (a.price==null) devis = true;
  });
  SI.forEach(it=>{ const q = svcSel[it.id]; if (!q) return;
    const l = {label: it.name+(it.from?" (dès)":"")+(q>1?" ×"+q:""), amount:(it.price||0)*q, devis: it.price==null};
    if (it.unit) monthly.push(Object.assign(l,{unit:it.unit})); else { lines.push(l); if (it.price==null) devis = true; } });
  const mTotal = monthly.reduce((s,l)=>s+l.amount,0), mDevis = monthly.some(l=>l.devis);
  const sub = lines.reduce((s,l)=>s+l.amount,0);
  let best = null, bd = 0, err = "", typedOK = false;
  promos().forEach(p=>{
    const typed = !isAuto(p) && applied && p.code.toUpperCase()===applied;
    if (!isAuto(p) && !typed) return;
    const e = promoErr(p, plan.id, sub); if (e){ if (typed) err = e; return; }
    if (typed) typedOK = true;
    const d = promoAmount(p, plan.price||0, sub); if (d>bd){ bd=d; best=p; }
  });
  return {plan, lines, monthly, mTotal, mDevis, sub, promo:best, disc:bd, total:Math.max(0,sub-bd), devis, err, typedOK};
}
const grand = s => VAT.mode==="ht" ? s.total*(1+vr) : s.total;
const monthText = s => s.monthly.length ? "+ "+(s.mTotal?fmt(VAT.mode==="ht"?s.mTotal*(1+vr):s.mTotal):"")+(s.mDevis?(s.mTotal?" + devis":"devis"):"")+" "+(s.monthly[0].unit||"/mois") : "";
const totalText = s => s.plan.price==null ? (s.total ? fmt(grand(s))+" + devis" : "Sur devis") : fmt(grand(s))+(s.devis?" + devis":"");

function render(){
  const s = state(), plan = s.plan;
  $("sum-lines").innerHTML = s.lines.map(l=>`<div class="sl${l.none?" none":""}"><span>${esc(l.label)}</span><span>${l.none?"—":l.inc?"Inclus":l.devis?"à définir":fmt(l.amount)}</span></div>`).join("")
    + (s.promo ? `<div class="sl promo-line"><span>${esc(s.promo.label||(s.promo.code?"Code "+s.promo.code:"Promotion"))} (${promoLabel(s.promo)})</span><span>-${fmt(s.disc)}</span></div>` : "");
  if (s.monthly.length) $("sum-lines").innerHTML += `<div class="sl sl-h"><span>${esc(T0.label_monthly||"Abonnement mensuel")}</span></div>` + s.monthly.map(l=>`<div class="sl"><span>${esc(l.label)}</span><span>${l.devis?"à définir":fmt(l.amount)+" "+esc(l.unit)}</span></div>`).join("");
  $("total").textContent = totalText(s);
  $("sum-month").hidden = !s.monthly.length; $("sum-month").textContent = s.monthly.length ? monthText(s)+" — "+(T0.label_monthly_note||"") : "";
  document.querySelector(".total span").textContent = (T0.sum_total||"Total") + (VAT.mode==="franchise" ? "" : " TTC");
  let vl = ""; if (plan.price!=null && s.total>0){ if (VAT.mode==="ttc"){ const ht = s.total/(1+vr); vl = `Dont HT : ${fmt(ht)} · TVA ${VAT.rate} % : ${fmt(s.total-ht)}`; } else if (VAT.mode==="ht") vl = `Total HT : ${fmt(s.total)} · TVA ${VAT.rate} % : ${fmt(s.total*vr)}`; }
  $("sum-vat").textContent = vl; $("sum-vat").hidden = !vl;
  const dp = +O.depositPercent||0;
  $("sum-dep").textContent = dp>0 && s.total>0 && plan.price!=null ? "Acompte à la commande ("+dp+" %) : "+fmt(grand(s)*dp/100) : "";
  $("sum-delay").textContent = TX.label_delay_est + " " + (plan.none ? NONE.delay : delayOf(plan));
  const sn = [vatNote, O.note].filter(Boolean).join(" "); $("sum-note").textContent = sn; $("sum-note").hidden = !sn;
  const m = $("promo-msg");
  if (!applied){ m.textContent=""; m.className="promo-msg"; }
  else if (s.typedOK){ m.className="promo-msg"; m.textContent = s.promo && s.promo.code && s.promo.code.toUpperCase()===applied ? "Code "+applied+" appliqué ("+promoLabel(s.promo)+")." : "Code valable, mais une réduction plus avantageuse est déjà appliquée."; }
  else { m.className="promo-msg err"; m.textContent = s.err || "Code invalide."; }
  const ct = C.contact;
  $("insta-btn").hidden = !ct.instagram; if (ct.instagram) $("insta-btn").href = ct.instagram;
  $("mail-btn").hidden = !ct.email;
  if (ct.email) $("mail-btn").href = "mailto:"+ct.email+"?subject="+encodeURIComponent("Commande — "+plan.name)+"&body="+encodeURIComponent(message());
  $("contact-line").textContent = [ct.instagramHandle&&"Instagram : "+ct.instagramHandle, ct.email].filter(Boolean).join(" · ");
  syncAddButtons(s); syncSvcButtons(); updateCartbar(s); groupCounts();
}
function message(){
  const s = state(), d = new FormData(form), dp = +O.depositPercent||0;
  return [(O.intro||"NOUVELLE COMMANDE")+" — "+C.brand, "",
    "Nom : "+(d.get("pseudo")||"—"), "Contact : "+(d.get("contact")||"—"), O.askBusiness===false?"":"Activité : "+(d.get("biz")||"—"), "",
    "Gamme : "+(s.plan.none ? (T0.pick_none||"Pas de site")+" ("+(T0.pick_none_sub||"services seuls").toLowerCase()+")" : s.plan.name), ...s.lines.slice(1).map(l=>"+ "+l.label+(l.inc?" (inclus)":"")),
    ...s.monthly.map(l=>"+ "+l.label+" : "+(l.devis?"à définir":fmt(l.amount)+" "+l.unit)),
    s.promo?"Promo : "+(s.promo.code||s.promo.label||"")+" ("+promoLabel(s.promo)+")":"",
    "TOTAL : "+(s.plan.price==null?"à définir (devis)":totalText(s)), s.monthly.length ? "Abonnement : "+monthText(s).replace(/^\+ /,"") : "",
    dp>0&&s.total>0&&s.plan.price!=null?"Acompte ("+dp+" %) : "+fmt(grand(s)*dp/100):"", vatNote, "",
    O.askProject===false?"":"Projet : "+(d.get("desc")||"—")].filter((l,i,arr)=>l!==""||(arr[i-1]!==""&&i>0)).join("\n");
}
function toast(t){ $("toast").textContent=t; setTimeout(()=>$("toast").textContent="",3500); }

/* boutons "Ajouter" de la section Options + barre de commande flottante */
function syncAddButtons(s){
  document.querySelectorAll("[data-add]").forEach(b=>{
    const a = C.addons.find(x=>x.id===b.dataset.add), plan = s.plan;
    b.disabled = false; b.classList.remove("on");
    if (!allowed(a,plan)){ b.textContent = "Indisponible"; b.disabled = true; }
    else if (included(a,plan)){ b.textContent = "Inclus"; b.disabled = true; }
    else if (sel[a.id]){ b.textContent = "Retirer"; b.classList.add("on"); }
    else b.textContent = "Ajouter";
  });
}
$("addons").addEventListener("click",e=>{
  const b = e.target.closest("[data-add]"); if(!b||b.disabled) return;
  const id = b.dataset.add; if (sel[id]) delete sel[id]; else sel[id] = 1;
  drawOpts(); render();
});
let commandeVisible = false;
function updateCartbar(s){
  const n = s.lines.filter(l=>!l.inc).length-1+s.monthly.length, show = n>0 && !commandeVisible;
  $("cartbar").hidden = !show;
  if (show) $("cart-text").textContent = (s.plan.none ? "" : s.plan.name+" + ")+n+" "+(s.plan.none?(n>1?"prestations":"prestation"):"ajout"+(n>1?"s":""))+" · "+totalText(s)+(s.monthly.length?" "+monthText(s):"");
}
if ("IntersectionObserver" in window) new IntersectionObserver(es=>{ commandeVisible = es[0].isIntersecting; render(); },{threshold:.05}).observe($("commande"));

form.addEventListener("input", ()=>{ readSel(); render(); });
form.addEventListener("change", e=>{ readSel(); if (e.target.name==="plan"){ drawOpts(); if (curPlan().none) drawSvcOpts(); } render(); });
form.addEventListener("submit", e=>e.preventDefault());
$("promo-btn").onclick = ()=>{ applied = $("promo").value.trim().toUpperCase(); render(); };
$("promo").addEventListener("keydown", e=>{ if(e.key==="Enter"){ e.preventDefault(); $("promo-btn").click(); } });
$("copy-btn").onclick = async ()=>{
  if (!form.reportValidity()) return;
  const t = message();
  try { await navigator.clipboard.writeText(t); toast("Commande copiée. Envoie-la-nous en message privé sur Instagram ou par e-mail."); }
  catch { const ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); toast("Commande copiée."); }
};
/* section « Logo, affiches & réseaux » : onglets + cartes avec bouton Ajouter */
let svTab = groupsOf(SI)[0];
function drawSvcs(){
  const gs = groupsOf(SI);
  $("svc-tabs").innerHTML = gs.length>1 ? gs.map(g=>`<button class="chip ${g===svTab?"on":""}" role="tab" aria-selected="${g===svTab}" data-t="${esc(g)}">${esc(g)} <i>${SI.filter(it=>aGroup(it)===g).length}</i></button>`).join("") : "";
  $("svcs").innerHTML = SI.filter(it=>aGroup(it)===svTab).map((it,i)=>`
  <article class="svc ${it.popular?"pop":""} ${it.video?"has-vid":""}" style="--d:${i*70}ms" data-sid="${esc(it.id)}">
    ${it.video?`<div class="svc-vid"><video muted loop playsinline preload="metadata"><source src="${esc(it.video)}" type="video/mp4"><source src="${esc(String(it.video).replace(/\.mp4$/i,".webm"))}" type="video/webm"></video><span class="svc-play" aria-hidden="true">▶ Aperçu</span></div>`:""}
    ${it.unit?`<span class="svc-tag">${esc(T0.badge_monthly||"Abonnement")}</span>`:it.popular?`<span class="svc-tag hot">${esc(TX.badge_pop)}</span>`:""}
    <h3>${esc(it.name)}</h3><p>${esc(it.desc||"")}</p>
    <div class="svc-price">${it.price==null?"Sur devis":`${it.from?`<small>${esc(TX.label_from)}</small> `:""}<span class="num" data-n="${it.price}">${fmt(it.price)}</span>${it.unit?` <small>${esc(it.unit)}</small>`:""}${it.qty?` <small>/ unité</small>`:""}${vt}`}</div>
    ${(it.features||[]).length?`<ul>${it.features.map(f=>`<li>${esc(f)}</li>`).join("")}</ul>`:""}
    <button type="button" class="btn btn-sm svc-add" data-svc="${esc(it.id)}"></button>
  </article>`).join("");
  syncSvcButtons(); watchVids();
}
/* aperçus vidéo : ils se lancent seulement quand ils sont visibles à l'écran */
const vidIO = "IntersectionObserver" in window ? new IntersectionObserver(es=>es.forEach(e=>{ const v = e.target; if (e.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(()=>{}); } else v.pause(); }), {threshold:.35}) : null;
function watchVids(){ document.querySelectorAll(".svc-vid video").forEach(v=>{ if (v.dataset.w) return; v.dataset.w = 1; if (vidIO) vidIO.observe(v); else v.autoplay = true; }); }
function syncSvcButtons(){ document.querySelectorAll("[data-svc]").forEach(b=>{ const on = !!svcSel[b.dataset.svc]; b.classList.toggle("on", on); b.textContent = on ? (T0.svc_remove||"✓ Ajouté — retirer") : (T0.svc_add||"Ajouter à ma commande"); }); }
if (SV){
  const sec = $("services"), hd = sec.querySelector(".sec-head");
  hd.querySelector(".eyebrow").textContent = SV.eyebrow||"Logo, affiches & réseaux"; hd.querySelector("h2").textContent = SV.title||""; hd.querySelector("p").textContent = SV.intro||"";
  $("svc-note").textContent = [vatNote, SI.some(it=>it.unit) ? (T0.label_monthly_note||"") : ""].filter(Boolean).join(" ");
  $("svc-tabs").addEventListener("click", e=>{ const b = e.target.closest("[data-t]"); if(b){ svTab = b.dataset.t; drawSvcs(); } });
  $("svcs").addEventListener("click", e=>{ const b = e.target.closest("[data-svc]"); if(!b) return; const id = b.dataset.svc;
    if (svcSel[id]) delete svcSel[id]; else { svcSel[id] = 1; svOpen.add(aGroup(SI.find(x=>x.id===id))); }
    drawSvcOpts(); render(); });
  drawSvcs();
} else { $("services").hidden = true; document.querySelectorAll('a[href="#services"]').forEach(l=>l.hidden=true); }
drawOpts(); drawSvcOpts(); render();

/* notre histoire */
(function(){ const st = C.story; if(!st){ $("histoire").hidden = true; document.querySelectorAll('a[href="#histoire"]').forEach(l=>l.hidden=true); return; }
  const sec = $("histoire"); sec.querySelector(".eyebrow").textContent = st.eyebrow||"Notre histoire"; sec.querySelector("h2").textContent = st.title||"";
  $("story-text").innerHTML = (st.paragraphs||[]).map(p=>`<p>${esc(p)}</p>`).join("");
  $("founders").innerHTML = (st.founders||[]).map(f=>`<article class="founder">${f.photo?`<img src="${esc(f.photo)}" alt="${esc(f.name)}" width="88" height="88">`:`<span class="fi" aria-hidden="true">${esc(f.initial||(f.name||"?").trim()[0]||"?")}</span>`}<div><h3>${esc(f.name)}</h3><span class="role">${esc(f.role||"")}</span><p>${esc(f.text||"")}</p></div></article>`).join("");
  $("values").innerHTML = (st.values||[]).map(v=>`<div class="val"><h4>${esc(v.title)}</h4><p>${esc(v.text)}</p></div>`).join(""); })();

/* barre du haut : offre + contact, moderne et animée (desktop : une ligne ; mobile : messages qui alternent) */
(function(){ const ct = C.contact||{}, T = C.texts||{}; const promo = C.announce||""; if(!promo && !ct.instagram && !ct.email) return;
  const ic = { ig:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="f"/></svg>',
    mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>' };
  const m = promo.match(/code\s+([A-Z0-9_-]{3,})/i);
  const promoHTML = !promo ? "" : `<span class="tb-promo"><i class="tb-dot" aria-hidden="true"></i>${m ? esc(promo.slice(0,m.index+5)) + `<button type="button" class="tb-code" data-code="${esc(m[1])}" title="${esc(T.top_copy||"Copier le code")}">${esc(m[1])}</button>` + esc(promo.slice(m.index+m[0].length)) : esc(promo)}</span>`;
  const links = `${ct.instagram?`<a class="tb-pill" href="${esc(ct.instagram)}" target="_blank" rel="noopener">${ic.ig}<span>${esc(ct.instagramHandle||"Instagram")}</span></a>`:""}${ct.email?`<a class="tb-pill" href="mailto:${esc(ct.email)}">${ic.mail}<span class="tb-mail">${esc(ct.email)}</span><span class="tb-mail-s">${esc(T.top_mail_short||"E-mail")}</span></a>`:""}`;
  const contact = `<span class="tb-contact"><span class="tb-q">${esc(T.top_question||"Une question ? Écris-nous")}</span>${links}</span>`;
  const slides = [promoHTML, contact].filter(Boolean);
  $("tb-in").innerHTML = `<div class="tb-row">${slides.map((h,i)=>`<div class="tb-slide${i===0?" on":""}">${h}</div>`).join("")}</div>`;
  const bar = $("topbar"); bar.hidden = false;
  bar.querySelectorAll(".tb-code").forEach(b=>b.addEventListener("click",()=>{ const c=b.dataset.code; (navigator.clipboard?navigator.clipboard.writeText(c):Promise.reject()).catch(()=>{}).finally(()=>{ b.classList.add("ok"); b.textContent = T.top_copied||"Copié !"; setTimeout(()=>{ b.classList.remove("ok"); b.textContent=c; },1600); }); }));
  const sl = bar.querySelectorAll(".tb-slide"); if(sl.length<2) return; let k = 0, paused = false;
  bar.addEventListener("mouseenter",()=>paused=true); bar.addEventListener("mouseleave",()=>paused=false);
  setInterval(()=>{ if(paused || !matchMedia("(max-width:900px)").matches || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    sl[k].classList.remove("on"); sl[k].classList.add("out"); const old = sl[k]; setTimeout(()=>old.classList.remove("out"),600); k = (k+1)%sl.length; sl[k].classList.add("on"); }, 4200); })();

/* e-mail : contact direct */
(function(){ const em = (C.contact||{}).email; if(!em) return; const T = C.texts||{};
  $("final-mail").href = "mailto:"+em; $("final-mail").hidden = false; $("final-mail").textContent = T.final_mail||"Nous écrire par e-mail";
  const fa = $("final-addr"); if(fa){ fa.hidden = false; fa.innerHTML = `E-mail : <a href="mailto:${esc(em)}">${esc(em)}</a>`; }
  $("f-mail").href = "mailto:"+em; $("f-mail").textContent = em; })();

/* Instagram : partout où c'est utile */
(function(){ const ct = C.contact||{}; if(!ct.instagram) return;
  const hi=$("h-insta"); hi.hidden = !(C.hero||{}).showContact;
  hi.innerHTML = `<span>${esc((C.texts||{}).hero_question||"Une question ?")}</span><a class="hp" href="${esc(ct.instagram)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="f"/></svg>${esc(ct.instagramHandle||"Instagram")}</a>${ct.email?`<a class="hp" href="mailto:${esc(ct.email)}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>${esc(ct.email)}</a>`:""}`;
  [$("nav-insta"),$("final-insta")].forEach(l=>{ l.href=ct.instagram; l.hidden=false; }); })();

/* sections : afficher / masquer / renommer (config.sections) */
Object.entries(C.sections||{}).forEach(([id,s])=>{
  const sec = $(id); if(!sec) return;
  if (s.show===false){ sec.hidden = true; document.querySelectorAll(`a[href="#${id}"]`).forEach(l=>l.hidden=true); return; }
  const hd = sec.querySelector(".sec-head"); if(!hd) return;
  if (s.eyebrow) hd.querySelector(".eyebrow").textContent = s.eyebrow;
  if (s.title) hd.querySelector("h2").textContent = s.title;
  if (s.subtitle){ let p = hd.querySelector("p"); if(!p){ p=document.createElement("p"); hd.append(p);} p.textContent = s.subtitle; }
});

/* petites animations : chiffres qui défilent + ombre de la barre */
const nav = $("nav"); const onScroll = ()=>nav.classList.toggle("sc", scrollY>8); onScroll(); addEventListener("scroll", onScroll, {passive:true});
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function countUp(el){
  const m = String(el.dataset.v).match(/^(\D*)(\d+)(.*)$/); if(!m||reduce) return;
  const end = +m[2], t0 = performance.now(), dur = 1200;
  const step = t=>{ const k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3); el.textContent = m[1]+Math.round(end*e)+m[3]; if(k<1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
if ("IntersectionObserver" in window) { const st = new IntersectionObserver(es=>{ if (es[0].isIntersecting){ $("stats").classList.add("in"); st.disconnect(); } },{threshold:.4}); st.observe($("stats")); } else $("stats").classList.add("in");
if ("IntersectionObserver" in window) { const so = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ countUp(e.target); so.unobserve(e.target);} }),{threshold:.6}); document.querySelectorAll("[data-v]").forEach(el=>so.observe(el)); }

/* menu mobile */
$("burger").onclick = ()=>$("links").classList.toggle("open");
$("links").addEventListener("click",()=>$("links").classList.remove("open"));

/* apparition au scroll */
/* apparition douce des blocs de chaque section (cascade sur les éléments d'une grille) */
document.querySelectorAll("main .sec-head, .table-wrap, .addons, .works, .order, .faq, .story, .final, .svcs, .rv-top").forEach(el=>el.classList.add("reveal"));
document.querySelectorAll(".steps > .step, .guar > .g, .values > .val, .plans > .plan").forEach((el,i,all)=>{ el.classList.add("reveal"); el.style.setProperty("--d", (Array.prototype.indexOf.call(el.parentNode.children, el)*90)+"ms"); });
const els = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(el=>io.observe(el));
} else els.forEach(el=>el.classList.add("in"));

/* TVA + légal */
$("vat-note").textContent = vatNote;
(function(){ const T = C.texts||{}; $("cgv-pre").textContent = T.cgv_pre||"J'ai lu et j'accepte les"; $("cgv-link").textContent = T.cgv_link||"conditions générales de vente";
  $("lg-m").textContent = T.legal_mentions||"Mentions légales"; $("lg-c").textContent = T.legal_cgv||"CGV"; $("lg-p").textContent = T.legal_privacy||"Confidentialité";
  const co = ((C.legal||{}).company)||{}; $("legal-id").textContent = [co.name||"", co.status||"", co.siret?"SIRET "+co.siret:"", VAT.mode==="franchise"?"TVA non applicable, art. 293 B du CGI":(co.vatNumber?"TVA "+co.vatNumber:"")].filter(Boolean).join(" · "); $("legal-id").hidden = !$("legal-id").textContent; })();

/* textes modifiables (config.texts) */
(function(){ const T = C.texts||{}; const set=(sel,key,i)=>{ if(T[key]==null) return; const els=document.querySelectorAll(sel); const el = i==null ? els[0] : els[i]; if(el) el.textContent=T[key]; };
  const lab=(i,key)=>{ if(T[key]==null) return; const l=document.querySelectorAll("#order-form .fields label")[i]; if(l&&l.firstChild) l.firstChild.textContent=T[key]; };
  set('.links a[href="#tarifs"]','nav_tarifs'); set('.links a[href="#avis"]','nav_avis'); set('.links a[href="#comparatif"]','nav_comparatif'); set('.links a[href="#services"]','nav_services'); set('.links a[href="#process"]','nav_process'); set('.links a[href="#realisations"]','nav_realisations'); set('.links a[href="#faq"]','nav_faq'); set('.links a[href="#histoire"]','nav_histoire'); set('#nav-insta','nav_insta'); set('.nav-in > a.btn','nav_cta');
  set("#order-form > h3","order_plan",0); set("#order-form > h3","order_opts",1); set("#order-form > h3","order_info",2);
  lab(0,"f_name"); lab(1,"f_biz"); lab(2,"f_contact"); lab(3,"f_project");
  set(".summary > h3","sum_title"); set("#promo-btn","promo_btn"); set("#copy-btn","copy_btn"); set("#insta-btn","insta_btn"); set("#mail-btn","mail_btn"); set("#cartbar .btn","cart_btn");
  set(".final h2","final_title"); set(".final p","final_text"); set(".final .btn-light","final_btn"); set("#final-insta","final_insta"); set("#final-mail","final_mail"); })();
/* ---------- confort de navigation ---------- */
(function(){ const ct = C.contact||{}, T = C.texts||{};
  /* barre de progression de lecture + bouton « haut de page » */
  const bar = $("progress"), top = $("totop");
  /* barre « Commander » en bas sur téléphone (cachée près de la commande ou quand le panier s'affiche) */
  const m = $("mcta"); $("mcta-order").textContent = T.mcta_btn||"Commander mon site";
  if (ct.instagram){ $("mcta-ig").href = ct.instagram; $("mcta-ig").hidden = false; }
  if (ct.email){ $("mcta-mail").href = "mailto:"+ct.email; $("mcta-mail").hidden = false; }
  const lbIsOpen = () => { const l = document.querySelector(".lb"); return !!(l && !l.hidden); };
  const heroEnd = () => { const h = document.querySelector(".hero .cta-row"); return h ? h.getBoundingClientRect().bottom + scrollY : 600; };
  let t = 0; const tick = () => { t = 0; const y = scrollY, H = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${H>0 ? Math.min(1, y/H) : 0})`;
    top.hidden = y < innerHeight*1.5;
    const cmd = $("commande").getBoundingClientRect(), nearCmd = cmd.top < innerHeight && cmd.bottom > 0;
    m.hidden = !(innerWidth <= 760 && y > heroEnd() && !nearCmd && $("cartbar").hidden && !lbIsOpen());
    document.body.classList.toggle("has-mcta", !m.hidden); };
  addEventListener("scroll", ()=>{ if(!t) t = requestAnimationFrame(tick); }, {passive:true}); addEventListener("resize", tick); tick();
  top.onclick = ()=>scrollTo({top:0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
  /* menu : la rubrique en cours s'allume */
  const links = [...document.querySelectorAll('.links a[href^="#"]')], map = new Map();
  links.forEach(a=>{ const s = document.querySelector(a.getAttribute("href")); if (s) map.set(s, a); });
  if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es=>es.forEach(e=>{ const a = map.get(e.target); if (a && e.isIntersecting){ links.forEach(l=>l.classList.remove("on")); a.classList.add("on"); } }), {rootMargin:"-45% 0px -50% 0px"});
    map.forEach((a,s)=>io.observe(s)); }
  /* fiche pour Google (données structurées), tirée de config.js */
  try { const ld = {"@context":"https://schema.org","@type":"ProfessionalService", name: C.brand, description: C.tagline, image: new URL("images/og.jpg", location.href).href, logo: new URL(C.logoBig||C.logo, location.href).href,
      email: ct.email||undefined, sameAs: ct.instagram ? [ct.instagram] : undefined, areaServed: "FR", priceRange: "€€",
      makesOffer: (C.plans||[]).filter(p=>p.price!=null).map(p=>({"@type":"Offer", name: p.name, price: p.price, priceCurrency: "EUR"})) };
    const sc = document.createElement("script"); sc.type = "application/ld+json"; sc.textContent = JSON.stringify(ld); document.head.appendChild(sc); } catch {}
})();

/* bandeau « Pas de belles photos ? » sous les tarifs → ouvre l'onglet Photos des services */
(function(){ const T = C.texts||{}, b = $("photo-cta"); const g = SI.find(it=>/photo/i.test(aGroup(it))); if (!SV || !g || !T.photo_cta) return;
  b.hidden = false; b.innerHTML = `<span class="pc-ic" aria-hidden="true">📸</span><span>${esc(T.photo_cta)}</span><b>${esc(T.photo_cta_btn||"Voir")} →</b>`;
  b.onclick = ()=>{ svTab = aGroup(g); drawSvcs(); $("services").scrollIntoView({behavior:"smooth"}); }; })();

/* ---------- animations v3 : bulles de lumière sur tout le site, halo qui suit la souris, apparitions plus vivantes ---------- */
(function(){ if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  /* bulles floues qui flottent derrière tout le site */
  const sky = document.createElement("div"); sky.className = "sky-bokeh"; sky.setAttribute("aria-hidden","true");
  const cols = ["127,155,255","192,132,252","94,234,212","200,255,62","255,190,140"]; let sd = 11; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  sky.innerHTML = Array.from({length: innerWidth < 700 ? 5 : 9}, (_, i) => { const z = 60 + r()*160;
    return `<i style="--s:${z.toFixed(0)}px;--x:${(r()*100).toFixed(1)}%;--y:${(r()*100).toFixed(1)}%;--c:${cols[i%cols.length]};--d:${(14+r()*14).toFixed(1)}s;--dl:-${(r()*14).toFixed(1)}s;--mx:${((r()-.5)*220).toFixed(0)}px;--my:${((r()-.5)*260).toFixed(0)}px"></i>`; }).join("");
  document.body.prepend(sky);
  /* les bulles bougent un peu avec le défilement (profondeur) */
  let tk = 0; addEventListener("scroll", ()=>{ if (tk) return; tk = requestAnimationFrame(()=>{ tk = 0; sky.style.transform = `translateY(${-(scrollY*.06)%400}px)`; }); }, {passive:true});
  /* halo vert très doux qui suit la souris (ordinateur) */
  if (matchMedia("(hover:hover) and (pointer:fine)").matches){
    const c = document.createElement("div"); c.className = "cursor-glow"; c.setAttribute("aria-hidden","true"); document.body.appendChild(c);
    let x = innerWidth/2, y = innerHeight/2, cx = x, cy = y, on = false;
    addEventListener("pointermove", e=>{ x = e.clientX; y = e.clientY; if (!on){ on = true; c.classList.add("on"); loop(); } }, {passive:true});
    document.addEventListener("pointerleave", ()=>c.classList.remove("on"));
    function loop(){ cx += (x-cx)*.12; cy += (y-cy)*.12; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); }
    /* tous les boutons deviennent légèrement « aimantés » */
    document.querySelectorAll("main .btn:not(.hero .btn), .final .btn").forEach(b=>{
      b.addEventListener("pointermove", e=>{ const q = b.getBoundingClientRect(); b.style.translate = `${(e.clientX-q.left-q.width/2)*.12}px ${(e.clientY-q.top-q.height/2)*.2}px`; });
      b.addEventListener("pointerleave", ()=>{ b.style.translate = ""; }); });
  }
  /* les prix des gammes défilent jusqu'à leur valeur quand on arrive dessus */
  if ("IntersectionObserver" in window){
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if (!e.isIntersecting) return; io.unobserve(e.target);
      const pr = e.target.querySelector(".price"); if (!pr || pr.querySelector("s")) return;
      const tn = [...pr.childNodes].find(n=>n.nodeType===3 && /\d/.test(n.textContent)); if (!tn) return;
      const full = tn.textContent, m = full.match(/(\d(?:[\d\s\u202f]*\d)?)/); if (!m) return; const end = +m[1].replace(/\D/g,""); if (!end) return;
      const t0 = performance.now(), D = 900; const step = now => { const k = Math.min(1,(now-t0)/D), v = Math.round(end*(1-Math.pow(1-k,3)));
        tn.textContent = full.replace(m[1], v.toLocaleString("fr-FR")); if (k<1) requestAnimationFrame(step); else tn.textContent = full; }; requestAnimationFrame(step); }), {threshold:.4});
    const watch = () => document.querySelectorAll("#plans .plan").forEach(p=>{ if (!p.dataset.cnt){ p.dataset.cnt = 1; io.observe(p); } });
    watch(); new MutationObserver(watch).observe($("plans"), {childList:true}); }
})();
/* ---------- animations supplémentaires ---------- */
(function(){ if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  /* titres de section : les mots montent un par un quand la section arrive */
  document.querySelectorAll("main .sec-head h2").forEach(h=>{ const t = h.textContent.trim(); if(!t) return; let i = 0;
    const ws = t.split(/\s+/), g = ws.length > 3 ? 2 : 1;   /* les derniers mots prennent le dégradé animé du haut de page */
    h.innerHTML = ws.map((w,k)=>`<span class="w2${k >= ws.length-g ? " gw" : ""}"><span style="--i:${i++}">${esc(w)}</span></span>`).join(" "); });
  /* cartes : légère inclinaison 3D + reflet lumineux qui suit la souris */
  if (matchMedia("(hover:hover) and (pointer:fine)").matches){
    document.addEventListener("pointermove", e=>{ const c = e.target.closest && e.target.closest(".why, .svc, .step, .review, .g, .val, .plan, .addon, .founder"); if(!c) return;
      const r = c.getBoundingClientRect(), x = (e.clientX-r.left)/r.width, y = (e.clientY-r.top)/r.height;
      c.style.setProperty("--sx", (x*100)+"%"); c.style.setProperty("--sy", (y*100)+"%");
      if (!c.classList.contains("plan") && !c.classList.contains("addon")) c.style.setProperty("--tilt", `perspective(900px) rotateX(${(.5-y)*5}deg) rotateY(${(x-.5)*6}deg)`); }, {passive:true});
    document.addEventListener("pointerout", e=>{ const c = e.target.closest && e.target.closest(".why, .svc, .step, .review, .g, .val, .founder"); if (c && !c.contains(e.relatedTarget)) c.style.removeProperty("--tilt"); }, {passive:true});
  }
  /* boutons : onde au clic */
  document.addEventListener("pointerdown", e=>{ const b = e.target.closest && e.target.closest(".btn, .add-btn, .chip"); if(!b) return;
    const r = b.getBoundingClientRect(), s = document.createElement("span"), d = Math.max(r.width, r.height)*2;
    s.className = "ripple"; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;
    b.appendChild(s); setTimeout(()=>s.remove(), 650); });
  /* réalisations : les captures se dévoilent en balayage */
  if ("IntersectionObserver" in window){ const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ const f = e.target.querySelector(".frame"); if (f) f.classList.add("wiped"); io.unobserve(e.target); } }), {threshold:.2});
    const watch = () => document.querySelectorAll(".work .frame:not(.wipe)").forEach(f=>{ f.classList.add("wipe"); io.observe(f.closest(".work")); });
    watch(); new MutationObserver(watch).observe($("works"), {childList:true}); }
})();

/* ---------- bas du site ---------- */
(function(){ const T = C.texts||{}, still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* grande bande de mots qui défile (accélère quand on fait défiler la page) */
  const words = (T.mega_words || "Sites web · Photos · Logos · Affiches · Réseaux sociaux · Boutiques en ligne").split("·").map(w=>w.trim()).filter(Boolean);
  const row = words.map((w,i)=>`<span class="${i%2?"o":""}">${esc(w)}</span><i>✦</i>`).join("");
  $("mega-track").innerHTML = row + row;
  if (!still){ const tr = $("mega-track"); let x = 0, v = 0, last = scrollY, w = 0, vis = false;
    if ("IntersectionObserver" in window) new IntersectionObserver(es=>{ vis = es[0].isIntersecting; }).observe($("mega")); else vis = true;
    addEventListener("scroll", ()=>{ v += Math.abs(scrollY-last)*.15; last = scrollY; }, {passive:true});
    (function loop(){ if (vis){ w = w || tr.scrollWidth/2; x -= .6 + v; v *= .9; if (-x >= w) x += w; tr.style.transform = `translate3d(${x}px,0,0) skewX(${-Math.min(v,12)}deg)`; } requestAnimationFrame(loop); })(); }
  /* appel final : coches + étincelles */
  $("final-checks").innerHTML = ((C.hero||{}).trust||[]).map((t,i)=>`<li style="--k:${i}"><span aria-hidden="true">✓</span>${esc(t)}</li>`).join("");
  if (T.final_kicker) $("final-kicker").lastChild.textContent = T.final_kicker;
  const fin = $("final"); if (!still && matchMedia("(hover:hover) and (pointer:fine)").matches) fin.addEventListener("pointermove", e=>{ const r = fin.getBoundingClientRect(); fin.style.setProperty("--fx", (e.clientX-r.left)+"px"); fin.style.setProperty("--fy", (e.clientY-r.top)+"px"); });
  /* pied de page : colonnes de liens */
  $("f-nav").innerHTML = [...document.querySelectorAll('.links a[href^="#"]')].filter(a=>!a.hidden).map(a=>`<a href="${a.getAttribute("href")}">${esc(a.textContent)}</a>`).join("");
  const sv = [`<a href="#tarifs">${esc(T.f_sites||"Sites internet")}</a>`, `<a href="#tarifs" data-cmp>${esc(T.f_refonte||"Refonte de site")}</a>`].concat(SV ? groupsOf(SI).map(g=>`<a href="#services" data-g="${esc(g)}">${esc(g)}</a>`) : []);
  $("f-svc").innerHTML = sv.join("");
  $("f-svc").addEventListener("click", e=>{ const a = e.target.closest("[data-g]"); if (a){ svTab = a.dataset.g; drawSvcs(); } });
  ["f_h1","f_h2","f_h3"].forEach((k,i)=>{ if (T[k]) $("f-h"+(i+1)).textContent = T[k]; }); if (T.f_note) $("f-note").textContent = T.f_note; if (T.mcta_btn) $("f-cta").textContent = T.mcta_btn;
  /* le grand nom en bas : lettres qui montent une à une */
  $("foot-word").innerHTML = [...String(C.brand)].map((c,i)=>`<span style="--i:${i}">${c===" "?"&nbsp;":esc(c)}</span>`).join("");
  document.querySelectorAll(".foot-grid > *").forEach((el,i)=>{ el.classList.add("reveal"); el.style.setProperty("--d", (i*90)+"ms"); });
  if ("IntersectionObserver" in window){ const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.15});
    [$("foot-word"), $("final"), ...document.querySelectorAll(".foot-grid > *")].forEach(el=>io.observe(el)); }
  else [$("foot-word"), $("final")].forEach(el=>el.classList.add("in"));
  /* prix qui défilent jusqu'au bon montant quand ils apparaissent */
  if (!still && "IntersectionObserver" in window){ const po = new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting) return; po.unobserve(e.target); const el = e.target, n = +el.dataset.n; if(!(n>0)) return;
      const t0 = performance.now(), d = 900; const step = t=>{ const k = Math.min(1,(t-t0)/d), ez = 1-Math.pow(1-k,3); el.textContent = fmt(Math.round(n*ez)); if (k<1) requestAnimationFrame(step); else el.textContent = fmt(n); }; requestAnimationFrame(step); }), {threshold:.6});
    const watchN = () => document.querySelectorAll(".num[data-n]:not(.nw)").forEach(el=>{ el.classList.add("nw"); po.observe(el); });
    watchN(); const mo = new MutationObserver(watchN); [$("plans"), $("svcs")].forEach(el=>el && mo.observe(el, {childList:true})); }
})();

/* ---------- animations : clarté et mouvement ---------- */
(function(){ const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* écran d'accueil express (une seule fois par visite, jamais dans l'aperçu de l'admin) */
  const intro = $("intro"); let seen = false; try { seen = sessionStorage.getItem("ltd_intro")==="1"; sessionStorage.setItem("ltd_intro","1"); } catch {}
  if (seen || still || PREVIEW) intro.remove(); else { $("intro").querySelector("span").textContent = C.brand; intro.querySelector("img").src = C.logo; setTimeout(()=>intro.remove(), 1500); }
  /* onglets : un indicateur glisse jusqu'à l'onglet choisi */
  document.querySelectorAll(".filters").forEach(box=>{
    const place = () => { const on = box.querySelector(".chip.on"); let ind = box.querySelector(":scope > .ind");
      if (!on){ if (ind) ind.remove(); return; }
      if (!ind){ ind = document.createElement("span"); ind.className = "ind"; ind.setAttribute("aria-hidden","true");
        if (box.dataset.l){ ind.style.cssText = `left:${box.dataset.l}px;width:${box.dataset.w}px;transition:none`; } box.prepend(ind); ind.offsetWidth; ind.style.transition = ""; }
      const l = on.offsetLeft, w = on.offsetWidth; ind.style.left = l+"px"; ind.style.width = w+"px"; box.dataset.l = l; box.dataset.w = w; };
    new MutationObserver(m=>{ if (m.some(r=>[...r.addedNodes].some(n=>n.classList && n.classList.contains("chip")))) place(); }).observe(box, {childList:true});
    box.classList.add("has-ind"); place(); addEventListener("resize", place); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(()=>dispatchEvent(new Event("resize")));
  /* FAQ : ouverture et fermeture en douceur */
  if (!still) $("faq-list").addEventListener("click", e=>{ const sm = e.target.closest("summary"); if(!sm) return; const d = sm.parentElement; e.preventDefault();
    if (d.dataset.anim) return; d.dataset.anim = 1; const start = d.offsetHeight;
    if (d.open){ const end = sm.offsetHeight + 2; d.classList.add("closing"); d.animate({height:[start+"px", end+"px"]}, {duration:320, easing:"cubic-bezier(.2,.8,.2,1)"}).onfinish = ()=>{ d.open = false; d.classList.remove("closing"); delete d.dataset.anim; }; }
    else { d.open = true; const end = d.offsetHeight; d.animate({height:[start+"px", end+"px"]}, {duration:380, easing:"cubic-bezier(.2,.8,.2,1)"}).onfinish = ()=>{ delete d.dataset.anim; }; } });
  /* méthode : une frise se remplit au fil du défilement et allume chaque étape */
  const steps = $("steps"); if (steps){ const items = [...steps.children]; steps.classList.add("tl");
    const tick = () => { const r = steps.getBoundingClientRect(), p = Math.max(0, Math.min(1, (innerHeight*.75 - r.top) / (r.height + innerHeight*.25)));
      steps.style.setProperty("--p", still ? 1 : p); items.forEach((el,i)=>el.classList.toggle("lit", still || p >= (items.length>1 ? i/(items.length-1)*.92 : 0))); };
    addEventListener("scroll", ()=>requestAnimationFrame(tick), {passive:true}); tick(); }
  /* réalisations : les cartes arrivent en cascade à chaque filtre */
  const works = $("works"); const stag = () => [...works.children].forEach((w,i)=>{ if (!w.dataset.st){ w.dataset.st = 1; w.style.setProperty("--n", i % 6); } });
  new MutationObserver(stag).observe(works, {childList:true}); stag();
})();

/* ---------- bandeau « pubs vidéo » sous les tarifs ---------- */
(function(){ const T = C.texts||{}, b = $("pub-cta"); const g = SI.find(it=>/pub/i.test(aGroup(it))); if (!SV || !g || !T.pub_cta) return;
  b.hidden = false; b.innerHTML = `<span class="pc-ic" aria-hidden="true">🎬</span><span>${esc(T.pub_cta)}</span><b>${esc(T.pub_cta_btn||"Voir")} →</b>`;
  b.onclick = ()=>{ svTab = aGroup(g); drawSvcs(); $("services").scrollIntoView({behavior:"smooth"}); }; })();

/* ---------- s'y retrouver : recherche (touche « / ») + plan de la page ---------- */
(function(){ const T = C.texts||{}, still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const norm = x => String(x||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
  const strip = x => String(x||"").replace(/<[^>]+>/g,"");
  const price = p => p==null ? "Sur devis" : fmt(p);
  const flash = el => { if(!el) return; el.classList.remove("flashed"); void el.offsetWidth; el.classList.add("flashed"); setTimeout(()=>el.classList.remove("flashed"), 2200); };
  const go = (id, then) => { const el = $(id); if(!el || el.hidden) return; el.scrollIntoView({behavior: still?"auto":"smooth"}); if (then) setTimeout(then, still?0:450); };

  /* sections de la page */
  const SECS = [["top","Accueil","🏠"],["pourquoi","Pourquoi un vrai site","💡"],["tarifs","Tarifs des sites","💶"],["comparatif","Comparer les gammes","⇄"],["services","Services : photos, logo, pubs, réseaux","🎨"],["options","Options des sites","➕"],["process","La méthode en 4 étapes","🧭"],["realisations","Réalisations (maquettes)","🖼️"],["avis","Avis clients","⭐"],["commande","Commander","🛒"],["faq","Questions fréquentes","❓"],["histoire","Notre histoire","👥"]];
  const IDX = [];
  SECS.forEach(([id,t,ic])=>{ if ($(id) && !$(id).hidden) IDX.push({type:"Page", ic, t, s:"Aller à cette section", k:t+" "+id, run:()=>go(id)}); });
  (C.plans||[]).forEach(p=>IDX.push({type:"Tarif", ic:"💶", t:p.name+" — "+price(p.price)+(p.from?" (dès)":""), s:p.tagline||"", k:[p.name,p.tagline,(p.features||[]).join(" ")].join(" "), run:()=>go("tarifs",()=>{ groupSel="Tous"; drawPlans(); flash([...document.querySelectorAll("#plans .plan")].find(c=>c.querySelector(`[data-plan="${p.id}"]`))); })}));
  (C.addons||[]).forEach(a=>IDX.push({type:"Option", ic:"➕", t:a.name+" — "+(a.price==null?"Sur devis":"+ "+fmt(a.price)), s:a.desc||"", k:[a.name,a.desc,a.group].join(" "), run:()=>go("options",()=>{ addonSel = a.popular ? "Populaires" : aGroup(a); drawAddons(); flash($("addons")); })}));
  (SI||[]).forEach(it=>IDX.push({type:"Service", ic: /pub/i.test(aGroup(it))?"🎬":/photo/i.test(aGroup(it))?"📸":/logo/i.test(aGroup(it))?"✏️":/print|affiche/i.test(aGroup(it))?"🖼️":"📱", t:it.name+" — "+price(it.price)+(it.unit?" "+it.unit:"")+(it.from?" (dès)":""), s:aGroup(it)+(it.desc?" · "+it.desc:""), k:[it.name,it.desc,aGroup(it),(it.features||[]).join(" ")].join(" "), run:()=>go("services",()=>{ svTab = aGroup(it); drawSvcs(); flash(document.querySelector(`.svc[data-sid="${it.id}"]`)); })}));
  (C.faq||[]).forEach((f,i)=>IDX.push({type:"Question", ic:"❓", t:strip(f.q), s:strip(f.a).slice(0,90)+"…", k:f.q+" "+f.a, run:()=>go("faq",()=>{ const d = $("faq-list").children[i]; if (d){ d.open = true; flash(d); } })}));
  (C.portfolio||[]).forEach((w,i)=>IDX.push({type:"Maquette", ic:"🖼️", t:w.name+" — "+String(w.category||"").split("·")[0].trim(), s:"Ouvrir l'aperçu en grand", k:[w.name,w.category,w.tag].join(" "), run:()=>openDemo(i)}));
  [["Instagram","@l.t_digital",(C.contact||{}).instagram],["E-mail",(C.contact||{}).email,(C.contact||{}).email&&"mailto:"+C.contact.email]].forEach(([t,s,u])=>{ if(u) IDX.push({type:"Contact", ic:"💬", t:"Nous écrire : "+t, s:s, k:"contact ecrire message "+t+" "+s, run:()=>{ location.href = u; }}); });
  [["Mentions légales","mentions-legales.html"],["Conditions générales de vente","cgv.html"],["Confidentialité","confidentialite.html"]].forEach(([t,u])=>IDX.push({type:"Légal", ic:"📄", t, s:"Page légale", k:t+" legal cgv rgpd", run:()=>{ location.href = u; }}));
  const WORDS = {"pub":"pubs publicite video reel tiktok","prix":"tarif tarifs euros combien cout","logo":"identite marque","photo":"photos shooting produit equipe"};
  IDX.forEach(x=>{ x.n = norm(x.k+" "+x.t+" "+x.type); });

  /* interface */
  const box = $("srch"), inp = $("srch-q"), res = $("srch-res"); let list = [], sel = 0;
  inp.placeholder = T.search_ph || inp.placeholder;
  const QUICK = [["💶","Voir les tarifs","tarif"],["🎬","Pubs vidéo","pub video"],["📸","Photos","photo"],["✏️","Logo","logo"],["📱","Réseaux sociaux","reseaux"],["🛒","Commander","commander"],["❓","Questions","question"]];
  const SYN = {delai:["temps","jours","livre"],livraison:["livre","temps","jours"],livrer:["livre","temps"],rapide:["temps","jours","vite"],vite:["temps","jours"],paiement:["acompte","payer"],payer:["acompte","paiement"],acompte:["paiement"],retouche:["modification","modifier"],modification:["retouche"],reduction:["promo","code"],promo:["code","bienvenue"],remise:["promo","code"],site:["site"],boutique:["vente","catalogue"],reservation:["rendez","table"],prix:["tarif","euro"],tarif:["prix","euro"],video:["reel","tiktok","film"],reel:["video"],tiktok:["video"],film:["video"],reseaux:["instagram","facebook","tiktok"],contact:["mail","instagram","ecrire"],mail:["email","contact"],telephone:["mobile"],mobile:["telephone","smartphone"],google:["seo","reference"],seo:["google","reference"],aide:["contact","question"]};
  function score(x, ws){ let s = 0; for (const w of ws){ const alts = [w].concat(SYN[w]||[]); const hit = alts.find(a=>x.n.includes(a)); if (!hit) return 0; s += norm(x.t).includes(hit) ? 3 : 1; if (norm(x.t).startsWith(hit)) s += 2; } if (x.type==="Page") s += 1; return s; }
  function draw(){
    const q = norm(inp.value).trim();
    if (!q){ list = IDX.filter(x=>x.type==="Page"); res.innerHTML = `<div class="srch-quick">${QUICK.map(([ic,t,k])=>`<button type="button" data-q="${esc(k)}">${esc(t)}</button>`).join("")}</div><div class="srch-h">Aller à…</div>` + list.map((x,i)=>row(x,i)).join(""); }
    else {
      const STOP = new Set(["un","une","le","la","les","de","des","du","et","ou","pour","combien","coute","cout","couter","est","ce","que","qui","quoi","mon","ma","mes","ton","je","veux","voudrais","comment","quel","quelle","quels","a","au","aux","sur","en","il","y","faire","avoir","vous","on","peut","puis","ya","dans"]);
      let ws = q.split(/[^a-z0-9€]+/).filter(Boolean).filter(w=>!STOP.has(w)).map(w=>w.replace(/s$/,"")).filter(Boolean);
      if (!ws.length) ws = q.split(/\s+/).filter(Boolean);
      const sc = IDX.map(x=>({x, s:score(x, ws)})).filter(r=>r.s>0), best = {};
      sc.forEach(r=>{ best[r.x.type] = Math.max(best[r.x.type]||0, r.s); });
      list = sc.sort((a,b)=>(best[b.x.type]-best[a.x.type]) || (a.x.type<b.x.type?-1:a.x.type>b.x.type?1:0) || (b.s-a.s)).slice(0,40).map(r=>r.x);
      let last = ""; res.innerHTML = list.length ? list.map((x,i)=>{ const h = x.type!==last ? `<div class="srch-h">${esc(x.type)}</div>` : ""; last = x.type; return h + row(x,i); }).join("") : `<p class="srch-empty">${esc(T.search_empty||"Aucun résultat.")}</p>`;
    }
    sel = 0; mark();
  }
  const row = (x,i) => `<button type="button" class="srch-r" role="option" data-i="${i}"><span class="tx"><b>${esc(x.t)}</b><small>${esc(x.s||"")}</small></span><em>${esc(x.type)}</em></button>`;
  function mark(){ res.querySelectorAll(".srch-r").forEach(b=>{ const on = +b.dataset.i===sel; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); if (on) b.scrollIntoView({block:"nearest"}); }); }
  function open(q){ box.hidden = false; document.body.classList.add("srch-open"); inp.value = q||""; draw(); setTimeout(()=>inp.focus(), 30); }
  function close(){ box.hidden = true; document.body.classList.remove("srch-open"); }
  function pick(i){ const x = list[i]; if (!x) return; close(); setTimeout(x.run, 60); }
  $("srch-btn").onclick = ()=>open(); $("srch-x").onclick = close;
  box.addEventListener("mousedown", e=>{ if (e.target===box) close(); });
  inp.addEventListener("input", draw);
  res.addEventListener("click", e=>{ const q = e.target.closest("[data-q]"); if (q){ inp.value = q.dataset.q; draw(); inp.focus(); return; } const b = e.target.closest("[data-i]"); if (b) pick(+b.dataset.i); });
  res.addEventListener("mousemove", e=>{ const b = e.target.closest("[data-i]"); if (b && +b.dataset.i!==sel){ sel = +b.dataset.i; mark(); } });
  addEventListener("keydown", e=>{
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement||{}).tagName) || (document.activeElement||{}).isContentEditable;
    if (box.hidden){ if ((e.key==="/" && !typing && !e.ctrlKey && !e.metaKey) || ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="k")){ e.preventDefault(); open(); } return; }
    if (e.key==="Escape"){ e.preventDefault(); close(); }
    else if (e.key==="ArrowDown"){ e.preventDefault(); sel = Math.min(list.length-1, sel+1); mark(); }
    else if (e.key==="ArrowUp"){ e.preventDefault(); sel = Math.max(0, sel-1); mark(); }
    else if (e.key==="Enter"){ e.preventDefault(); pick(sel); } });

  /* plan de la page : points à droite, la section en cours s'allume */
  const DOTS = SECS.filter(([id])=>["top","tarifs","services","realisations","avis","commande","faq","histoire"].includes(id) && $(id) && !$(id).hidden);
  const dots = $("dots"); dots.innerHTML = DOTS.map(([id,t])=>`<a href="#${id}" data-id="${id}"><span>${esc(t.split(":")[0].replace("Tarifs des sites","Tarifs").replace("Réalisations (maquettes)","Réalisations"))}</span><i></i></a>`).join("");
  if ("IntersectionObserver" in window){ const io = new IntersectionObserver(es=>es.forEach(e=>{ if (e.isIntersecting){ dots.querySelectorAll("a").forEach(a=>a.classList.toggle("on", a.dataset.id===e.target.id)); } }), {rootMargin:"-45% 0px -50% 0px"});
    DOTS.forEach(([id])=>io.observe($(id))); }
  const dotsVis = () => { const l = document.querySelector(".lb"); dots.classList.toggle("off", scrollY < 400 || !!(l && !l.hidden) || !box.hidden); };
  addEventListener("scroll", dotsVis, {passive:true}); dotsVis();
})();
})();
