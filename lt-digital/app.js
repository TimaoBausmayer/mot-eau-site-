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
document.title = C.brand + " — " + C.tagline;

/* en-tête */
if (C.announce) { $("announce").textContent = C.announce; $("announce").hidden = false; }
$("logo").innerHTML = `<img src="${esc(C.logo)}" alt="" width="46" height="46"><b>${esc(C.brand)}</b>`;
$("f-logo").src = C.logoBig; $("f-insta").href = C.contact.instagram; $("f-insta").textContent = C.contact.instagramHandle;
$("f-brand").textContent = "© " + new Date().getFullYear() + " " + C.brand;
$("f-text").textContent = C.footer;
$("h-badge").textContent = C.hero.badge;
$("h-title").textContent = C.hero.title;
$("h-accent").textContent = C.hero.titleAccent;
$("h-text").textContent = C.hero.text;
$("h-cta1").textContent = C.hero.cta1;
$("h-cta1").href = "#tarifs";
$("h-cta2").textContent = C.hero.cta2;
$("stats").innerHTML = C.stats.map(s=>`<div class="stat"><dt data-v="${esc(s.value)}">${esc(s.value)}</dt><dd>${esc(s.label)}</dd></div>`).join("");
/* visuel du haut : tes propres maquettes dans des fenêtres de navigateur */
(function(){ const v = C.hero.visual || {}; const fr = (cls, src)=> src ? `<div class="vf ${cls}"><div class="bar"><i></i><i></i><i></i></div><div class="crop"><img src="${esc(src)}" alt=""></div></div>` : "";
  $("hero-vis").innerHTML = fr("a", v.a) + fr("b", v.b) + (v.phone ? `<div class="vp"><img src="${esc(v.phone)}" alt=""></div>` : ""); $("hero-vis").hidden = !(v.a||v.b); })();

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
  return `<div class="price">${from}${fmt(p.price)}${unitHTML(p)}${vt}</div>`;
}
let groupSel = "Tous";
function drawPlans(){
  const groups = [...new Set(C.plans.map(p=>p.group).filter(Boolean))];
  $("plan-filters").innerHTML = groups.length>1 ? ["Tous"].concat(groups).map(g=>`<button class="chip ${g===groupSel?"on":""}" data-g="${esc(g)}">${esc(g)}</button>`).join("") : "";
  $("plans").innerHTML = C.plans.filter(p=>groupSel==="Tous"||!p.group||p.group===groupSel).map(p=>`
  <article class="plan ${p.popular?"pop":""}">
    ${p.popular?'<span class="ribbon">${esc(TX.badge_pop)}</span>':""}
    <h3>${esc(p.name)}</h3><p class="tag">${esc(p.tagline)}</p>
    ${priceHTML(p)}<div class="delay">${esc(TX.label_delivery)} ${esc(delayOf(p))}</div>
    <ul>${p.features.map(f=>f[0]==="!"?`<li class="no">${esc(f.slice(1))}</li>`:`<li>${esc(f)}</li>`).join("")}</ul>
    <a href="#commande" class="btn ${p.popular?"":"btn-ghost"}" data-plan="${esc(p.id)}">${esc(p.cta)}</a>
  </article>`).join("");
}
$("plan-filters").addEventListener("click",e=>{ const b=e.target.closest("[data-g]"); if(b){ groupSel=b.dataset.g; drawPlans(); } });
$("plans").addEventListener("click",e=>{ const b=e.target.closest("[data-plan]"); if(b){ const r=form.querySelector(`input[name=plan][value="${b.dataset.plan}"]`); if(r){ r.checked=true; drawOpts(); render(); } } });
drawPlans();

/* comparatif */
$("cmp").innerHTML = `<thead><tr><th></th>${C.plans.map(p=>`<th class="${p.popular?"pop-col":""}">${esc(p.name)}</th>`).join("")}</tr></thead>
<tbody>${C.compare.map(r=>`<tr><td>${esc(r.label)}</td>${C.plans.map(p=>{
  const v=r.values[p.id]; const c=p.popular?"pop-col":"";
  return `<td class="${c}">${v===true?'<span class="yes">✔</span>':v===false?'<span class="no">✕</span>':esc(v)}</td>`;}).join("")}</tr>`).join("")}
<tr><td>Prix</td>${C.plans.map(p=>`<td class="${p.popular?"pop-col":""}"><b>${p.price==null?"Sur devis":(p.from?"dès ":"")+fmt(p.price)+(p.unit?" "+esc(p.unit):"")+(vtag?" "+vtag:"")}</b></td>`).join("")}</tr></tbody>`;

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
function lbClose(){ lb.hidden = true; document.body.style.overflow = ""; lbView.innerHTML = ""; if (lbOpener && lbOpener.focus) lbOpener.focus(); }
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
if (C.testimonials && C.testimonials.length) {
  $("avis").hidden = false;
  $("reviews").innerHTML = C.testimonials.map(t=>`<div class="review"><p>“${esc(t.text)}”</p><strong>${esc(t.name)}</strong><span>${esc(t.role||"")}</span></div>`).join("");
}
$("guar").innerHTML = C.guarantees.map(g=>`<div class="g"><h4>${esc(g.title)}</h4><p>${esc(g.text)}</p></div>`).join("");
$("faq-list").innerHTML = C.faq.map(f=>`<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");

/* ---------- COMMANDE ---------- */
const O = C.order || {}; const T0 = C.texts || {};
const form = $("order-form");
const sel = {};            /* options choisies : id -> quantité */
let applied = "";          /* code promo tapé par le client */
function curPlan(){ return C.plans.find(p=>p.id===form.plan.value) || C.plans[0]; }
const allowed = (a,plan) => !(a.plans&&a.plans.length) || a.plans.includes(plan.id);
const included = (a,plan) => !!(a.included&&a.included.includes(plan.id));
const clamp = (n,lo,hi) => Math.max(lo, Math.min(hi, n));

$("pick").innerHTML = C.plans.map((p,i)=>`<label><input type="radio" name="plan" value="${esc(p.id)}" ${p.popular||(!C.plans.some(x=>x.popular)&&i===0)?"checked":""}><span><b>${esc(p.name)}</b><small>${p.price==null?"Sur devis":(p.from?"dès ":"")+fmt(p.price)}</small></span></label>`).join("");
if (O.askBusiness===false) form.biz.closest("label").hidden = true;
if (O.askProject===false) form.desc.closest("label").hidden = true;

const openG = new Set(); let gTouched = false;
function optHTML(a, plan){
  const inc = included(a,plan), on = inc || sel[a.id]>0;
  const price = inc ? "Inclus avec "+esc(plan.name) : aPrice(a);
  return `<label class="opt ${inc?"inc":""}"><input type="checkbox" data-a="${esc(a.id)}" ${on?"checked":""} ${inc?"disabled":""}><div><b>${esc(a.name)}</b>${aTag(a)?` <em class="otag">${esc(aTag(a))}</em>`:""}<br><small>${price}</small></div>${a.qty&&!inc?`<input type="number" min="1" max="${a.max||50}" value="${sel[a.id]||1}" data-q="${esc(a.id)}" aria-label="Quantité">`:""}</label>`;
}
function groupCounts(){ document.querySelectorAll("#opts details.og").forEach(d=>{ const n = d.querySelectorAll("input[data-a]:checked:not(:disabled)").length; const c = d.querySelector("[data-cnt]"); if(c) c.textContent = n ? n+(n>1?" choisies":" choisie") : ""; }); }
function drawOpts(){
  const plan = curPlan(), list = C.addons.filter(a=>allowed(a,plan));
  const pop = list.filter(a=>a.popular), rest = list.filter(a=>!a.popular), groups = [];
  if (pop.length) groups.push(["Populaires", pop]); groupsOf(rest).forEach(g=>groups.push([g, rest.filter(a=>aGroup(a)===g)]));
  if (!gTouched && groups.length) openG.add(groups[0][0]);
  $("opts").innerHTML = groups.length ? groups.map(([g,arr])=>{ const open = openG.has(g) || arr.some(a=>sel[a.id]>0);
    return `<details class="og" data-g="${esc(g)}" ${open?"open":""}><summary><span>${esc(g)} <i>${arr.length}</i></span><small data-cnt></small></summary><div class="ogl">${arr.map(a=>optHTML(a,plan)).join("")}</div></details>`; }).join("") : `<p class="small">Aucune option disponible pour cette gamme.</p>`;
  groupCounts();
}
$("opts").addEventListener("toggle", e=>{ const d = e.target; if (d.classList && d.classList.contains("og")){ gTouched = true; d.open ? openG.add(d.dataset.g) : openG.delete(d.dataset.g); } }, true);
function readSel(){
  $("opts").querySelectorAll("[data-a]").forEach(cb=>{
    if (cb.disabled) return; const id = cb.dataset.a, a = C.addons.find(x=>x.id===id);
    if (cb.checked){ const q = $("opts").querySelector(`[data-q="${id}"]`); sel[id] = a.qty ? clamp(parseInt(q&&q.value)||1, 1, a.max||50) : 1; } else delete sel[id];
  });
}

function state(){
  const plan = curPlan(), lines = []; let devis = plan.price==null;
  lines.push({label: plan.name+(plan.from?" (dès)":""), amount: plan.price||0, devis: plan.price==null});
  C.addons.forEach(a=>{
    if (!allowed(a,plan)) return;
    if (included(a,plan)){ lines.push({label:a.name, amount:0, inc:true}); return; }
    const q = sel[a.id]; if (!q) return;
    lines.push({label: a.name+(q>1?" ×"+q:""), amount:(a.price||0)*q, devis: a.price==null}); if (a.price==null) devis = true;
  });
  const sub = lines.reduce((s,l)=>s+l.amount,0);
  let best = null, bd = 0, err = "", typedOK = false;
  promos().forEach(p=>{
    const typed = !isAuto(p) && applied && p.code.toUpperCase()===applied;
    if (!isAuto(p) && !typed) return;
    const e = promoErr(p, plan.id, sub); if (e){ if (typed) err = e; return; }
    if (typed) typedOK = true;
    const d = promoAmount(p, plan.price||0, sub); if (d>bd){ bd=d; best=p; }
  });
  return {plan, lines, sub, promo:best, disc:bd, total:Math.max(0,sub-bd), devis, err, typedOK};
}
const grand = s => VAT.mode==="ht" ? s.total*(1+vr) : s.total;
const totalText = s => s.plan.price==null ? (s.total ? fmt(grand(s))+" + devis" : "Sur devis") : fmt(grand(s))+(s.devis?" + devis":"");

function render(){
  const s = state(), plan = s.plan;
  $("sum-lines").innerHTML = s.lines.map(l=>`<div class="sl"><span>${esc(l.label)}</span><span>${l.inc?"Inclus":l.devis?"à définir":fmt(l.amount)}</span></div>`).join("")
    + (s.promo ? `<div class="sl promo-line"><span>${esc(s.promo.label||(s.promo.code?"Code "+s.promo.code:"Promotion"))} (${promoLabel(s.promo)})</span><span>-${fmt(s.disc)}</span></div>` : "");
  $("total").textContent = totalText(s);
  document.querySelector(".total span").textContent = (T0.sum_total||"Total") + (VAT.mode==="franchise" ? "" : " TTC");
  let vl = ""; if (plan.price!=null && s.total>0){ if (VAT.mode==="ttc"){ const ht = s.total/(1+vr); vl = `Dont HT : ${fmt(ht)} · TVA ${VAT.rate} % : ${fmt(s.total-ht)}`; } else if (VAT.mode==="ht") vl = `Total HT : ${fmt(s.total)} · TVA ${VAT.rate} % : ${fmt(s.total*vr)}`; }
  $("sum-vat").textContent = vl; $("sum-vat").hidden = !vl;
  const dp = +O.depositPercent||0;
  $("sum-dep").textContent = dp>0 && s.total>0 && plan.price!=null ? "Acompte à la commande ("+dp+" %) : "+fmt(grand(s)*dp/100) : "";
  $("sum-delay").textContent = TX.label_delay_est + " " + delayOf(plan);
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
  syncAddButtons(s); updateCartbar(s); groupCounts();
}
function message(){
  const s = state(), d = new FormData(form), dp = +O.depositPercent||0;
  return [(O.intro||"NOUVELLE COMMANDE")+" — "+C.brand, "",
    "Nom : "+(d.get("pseudo")||"—"), "Contact : "+(d.get("contact")||"—"), O.askBusiness===false?"":"Activité : "+(d.get("biz")||"—"), "",
    "Gamme : "+s.plan.name, ...s.lines.slice(1).map(l=>"+ "+l.label+(l.inc?" (inclus)":"")),
    s.promo?"Promo : "+(s.promo.code||s.promo.label||"")+" ("+promoLabel(s.promo)+")":"",
    "TOTAL : "+(s.plan.price==null?"à définir (devis)":totalText(s)),
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
  const n = s.lines.filter(l=>!l.inc).length-1, show = n>0 && !commandeVisible;
  $("cartbar").hidden = !show;
  if (show) $("cart-text").textContent = s.plan.name+" + "+n+" option"+(n>1?"s":"")+" · "+totalText(s);
}
if ("IntersectionObserver" in window) new IntersectionObserver(es=>{ commandeVisible = es[0].isIntersecting; render(); },{threshold:.05}).observe($("commande"));

form.addEventListener("input", ()=>{ readSel(); render(); });
form.addEventListener("change", e=>{ readSel(); if (e.target.name==="plan") drawOpts(); render(); });
form.addEventListener("submit", e=>e.preventDefault());
$("promo-btn").onclick = ()=>{ applied = $("promo").value.trim().toUpperCase(); render(); };
$("promo").addEventListener("keydown", e=>{ if(e.key==="Enter"){ e.preventDefault(); $("promo-btn").click(); } });
$("copy-btn").onclick = async ()=>{
  if (!form.reportValidity()) return;
  const t = message();
  try { await navigator.clipboard.writeText(t); toast("Commande copiée. Envoie-la-moi en message privé sur Instagram."); }
  catch { const ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); toast("Commande copiée."); }
};
drawOpts(); render();

/* notre histoire */
(function(){ const st = C.story; if(!st){ $("histoire").hidden = true; document.querySelectorAll('a[href="#histoire"]').forEach(l=>l.hidden=true); return; }
  const sec = $("histoire"); sec.querySelector(".eyebrow").textContent = st.eyebrow||"Notre histoire"; sec.querySelector("h2").textContent = st.title||"";
  $("story-text").innerHTML = (st.paragraphs||[]).map(p=>`<p>${esc(p)}</p>`).join("");
  $("founders").innerHTML = (st.founders||[]).map(f=>`<article class="founder">${f.photo?`<img src="${esc(f.photo)}" alt="${esc(f.name)}" width="88" height="88">`:`<span class="fi" aria-hidden="true">${esc(f.initial||(f.name||"?").trim()[0]||"?")}</span>`}<div><h3>${esc(f.name)}</h3><span class="role">${esc(f.role||"")}</span><p>${esc(f.text||"")}</p></div></article>`).join("");
  $("values").innerHTML = (st.values||[]).map(v=>`<div class="val"><h4>${esc(v.title)}</h4><p>${esc(v.text)}</p></div>`).join(""); })();

/* barre du haut : question + Instagram + e-mail */
(function(){ const ct = C.contact||{}, T = C.texts||{}; if(!ct.instagram && !ct.email) return; $("contactbar").hidden = false;
  $("cb-q").textContent = (T.top_question||"Une question ?") + " " + (ct.instagram ? (T.top_insta||"Écris-nous sur Instagram") : (T.top_mail_only||"Écris-nous par e-mail"));
  const i=$("cb-insta"); if(ct.instagram){ i.href=ct.instagram; i.textContent=ct.instagramHandle||"Instagram"; } else i.hidden=true;
  $("cb-or").textContent = ct.instagram && ct.email ? (T.top_mail||"ou par e-mail :") : "";
  const m=$("cb-mail"); if(ct.email){ m.href="mailto:"+ct.email; m.textContent=ct.email; } else m.hidden=true; })();

/* e-mail : contact direct */
(function(){ const em = (C.contact||{}).email; if(!em) return; const T = C.texts||{};
  $("final-mail").href = "mailto:"+em; $("final-mail").hidden = false; $("final-mail").textContent = T.final_mail||"Nous écrire par e-mail";
  const fa = $("final-addr"); if(fa){ fa.hidden = false; fa.innerHTML = `E-mail : <a href="mailto:${esc(em)}">${esc(em)}</a>`; }
  $("f-mail").href = "mailto:"+em; $("f-mail").textContent = em; })();

/* Instagram : partout où c'est utile */
(function(){ const ct = C.contact||{}; if(!ct.instagram) return;
  const hi=$("h-insta"); hi.hidden=false; hi.innerHTML = `Une question ? Écris-nous sur Instagram : <a href="${esc(ct.instagram)}" target="_blank" rel="noopener">${esc(ct.instagramHandle||"Instagram")}</a>${ct.email?` ou par e-mail : <a href="mailto:${esc(ct.email)}">${esc(ct.email)}</a>`:""}`;
  [$("nav-insta"),$("final-insta")].forEach(l=>{ l.href=ct.instagram; l.hidden=false; }); })();

/* sections : afficher / masquer / renommer (config.sections) */
Object.entries(C.sections||{}).forEach(([id,s])=>{
  const sec = $(id); if(!sec) return;
  if (s.show===false){ sec.hidden = true; document.querySelectorAll(`a[href="#${id}"]`).forEach(l=>l.hidden=true); return; }
  const hd = sec.querySelector(".sec-head"); if(!hd) return;
  if (s.eyebrow) hd.querySelector(".eyebrow").textContent = s.eyebrow;
  if (s.title) hd.querySelector("h2").textContent = s.title;
  if (s.subtitle!=null){ let p = hd.querySelector("p"); if(!p){ p=document.createElement("p"); hd.append(p);} p.textContent = s.subtitle; p.hidden = !s.subtitle; }
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
if ("IntersectionObserver" in window) { const so = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ countUp(e.target); so.unobserve(e.target);} }),{threshold:.6}); document.querySelectorAll("[data-v]").forEach(el=>so.observe(el)); }

/* menu mobile */
$("burger").onclick = ()=>$("links").classList.toggle("open");
$("links").addEventListener("click",()=>$("links").classList.remove("open"));

/* apparition au scroll */
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
  set('.links a[href="#tarifs"]','nav_tarifs'); set('.links a[href="#comparatif"]','nav_comparatif'); set('.links a[href="#process"]','nav_process'); set('.links a[href="#realisations"]','nav_realisations'); set('.links a[href="#faq"]','nav_faq'); set('.links a[href="#histoire"]','nav_histoire'); set('#nav-insta','nav_insta'); set('.nav-in > a.btn','nav_cta');
  set("#order-form > h3","order_plan",0); set("#order-form > h3","order_opts",1); set("#order-form > h3","order_info",2);
  lab(0,"f_name"); lab(1,"f_biz"); lab(2,"f_contact"); lab(3,"f_project");
  set(".summary > h3","sum_title"); set("#promo-btn","promo_btn"); set("#copy-btn","copy_btn"); set("#insta-btn","insta_btn"); set("#mail-btn","mail_btn"); set("#cartbar .btn","cart_btn");
  set(".final h2","final_title"); set(".final p","final_text"); set(".final .btn-light","final_btn"); set("#final-insta","final_insta"); set("#final-mail","final_mail"); })();
})();