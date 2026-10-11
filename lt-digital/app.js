(function(){
let C = window.SITE_CONFIG;
const PREVIEW = /[?&]preview/.test(location.search);
if (PREVIEW) { try { const d = localStorage.getItem("ltd_draft"); if (d) C = JSON.parse(d); } catch(e){}
  const b = document.createElement("div"); b.textContent = "APERÇU — brouillon non publié";
  b.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:99;background:#ffb020;color:#111;font:700 12px Inter,sans-serif;padding:6px 12px;border-radius:99px"; document.body.appendChild(b); }
const $ = id => document.getElementById(id);
const esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt = n => { const v = Math.round(n).toLocaleString("fr-FR"); return C.currency.after ? v+" "+C.currency.symbol : C.currency.symbol+v; };

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
$("stats").innerHTML = C.stats.map(s=>`<div class="stat reveal"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("");

/* gammes */
const priceHTML = p => p.price==null ? `<div class="price">Sur devis</div>` : `<div class="price">${p.from?"<small>À partir de</small> ":""}${fmt(p.price)}</div>`;
$("plans").innerHTML = C.plans.map(p=>`
  <article class="plan reveal ${p.popular?"pop":""}">
    ${p.popular?'<span class="ribbon">⭐ Le plus choisi</span>':""}
    <h3>${esc(p.name)}</h3><p class="tag">${esc(p.tagline)}</p>
    ${priceHTML(p)}<div class="delay">⏱ Livraison : ${esc(p.delay)}</div>
    <ul>${p.features.map(f=>f[0]==="!"?`<li class="no">${esc(f.slice(1))}</li>`:`<li>${esc(f)}</li>`).join("")}</ul>
    <a href="#commande" class="btn ${p.popular?"":"btn-ghost"}" data-plan="${esc(p.id)}">${esc(p.cta)}</a>
  </article>`).join("");

/* comparatif */
$("cmp").innerHTML = `<thead><tr><th></th>${C.plans.map(p=>`<th class="${p.popular?"pop-col":""}">${esc(p.name)}</th>`).join("")}</tr></thead>
<tbody>${C.compare.map(r=>`<tr><td>${esc(r.label)}</td>${C.plans.map(p=>{
  const v=r.values[p.id]; const c=p.popular?"pop-col":"";
  return `<td class="${c}">${v===true?'<span class="yes">✔</span>':v===false?'<span class="no">✕</span>':esc(v)}</td>`;}).join("")}</tr>`).join("")}
<tr><td>Prix</td>${C.plans.map(p=>`<td class="${p.popular?"pop-col":""}"><b>${p.price==null?"Sur devis":(p.from?"dès ":"")+fmt(p.price)}</b></td>`).join("")}</tr></tbody>`;

/* options */
$("addons").innerHTML = C.addons.map(a=>`<div class="addon reveal"><h4>${esc(a.name)}</h4><p>${esc(a.desc)}</p><strong>+ ${fmt(a.price)}${a.qty?" / unité":""}</strong></div>`).join("");

/* processus */
$("steps").innerHTML = C.process.map(s=>`<div class="step reveal"><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div>`).join("");

/* réalisations */
$("works").innerHTML = C.portfolio.map(w=>{
  const shot = w.image
    ? `<div class="shot"><img src="${esc(w.image)}" alt="Aperçu du site ${esc(w.name)}" loading="lazy">${w.mobile?`<div class="phone"><img src="${esc(w.mobile)}" alt="" loading="lazy"></div>`:""}</div>`
    : `<div class="shot s${esc(w.style||1)}"></div>`;
  const dom = (w.url||"").replace(/^https?:\/\//,"").replace(/^demos\//,"").replace(/\.html$/,"") || "ton-site.fr";
  const inner = `<div class="frame"><div class="fbar"><i></i><i></i><i></i><span>${esc(dom)}</span></div>${shot}</div><div class="work-in"><div><strong>${esc(w.name)}</strong><br><span>${esc(w.category)}</span></div>${w.url?"<em>Voir l'aperçu →</em>":""}</div>`;
  return w.url ? `<a class="work reveal" href="${esc(w.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="work reveal">${inner}</div>`;
}).join("");

/* avis (affichés seulement s'il y en a) */
if (C.testimonials && C.testimonials.length) {
  $("avis").hidden = false;
  $("reviews").innerHTML = C.testimonials.map(t=>`<div class="review reveal"><p>“${esc(t.text)}”</p><strong>${esc(t.name)}</strong><span>${esc(t.role||"")}</span></div>`).join("");
}
$("guar").innerHTML = C.guarantees.map(g=>`<div class="g reveal"><i>${esc(g.icon)}</i><h4>${esc(g.title)}</h4><p>${esc(g.text)}</p></div>`).join("");
$("faq-list").innerHTML = C.faq.map(f=>`<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");

/* ---------- COMMANDE ---------- */
$("pick").innerHTML = C.plans.map((p,i)=>`<label><input type="radio" name="plan" value="${esc(p.id)}" ${p.popular||(!C.plans.some(x=>x.popular)&&i===0)?"checked":""}><span><b>${esc(p.name)}</b><small>${p.price==null?"Sur devis":(p.from?"dès ":"")+fmt(p.price)}</small></span></label>`).join("");
$("opts").innerHTML = C.addons.map(a=>`<label class="opt"><input type="checkbox" data-a="${esc(a.id)}"><div><b>${esc(a.name)}</b><br><small>+ ${fmt(a.price)}${a.qty?" / unité":""}</small></div>${a.qty?`<input type="number" min="1" max="50" value="1" data-q="${esc(a.id)}" aria-label="Quantité">`:""}</label>`).join("");

let promo = 0, promoCode = "";
const form = $("order-form");
function state(){
  const plan = C.plans.find(p=>p.id===form.plan.value) || C.plans[0];
  const lines = [];
  if (plan.price!=null) lines.push([plan.name+(plan.from?" (dès)":""), plan.price]); else lines.push([plan.name+" (devis)", 0]);
  C.addons.forEach(a=>{
    const cb = form.querySelector(`[data-a="${a.id}"]`);
    if (cb && cb.checked) {
      const q = a.qty ? Math.max(1, Math.min(50, parseInt(form.querySelector(`[data-q="${a.id}"]`).value)||1)) : 1;
      lines.push([a.name+(q>1?" ×"+q:""), a.price*q]);
    }
  });
  const sub = lines.reduce((s,l)=>s+l[1],0);
  const disc = sub*promo/100;
  return {plan, lines, sub, disc, total: sub-disc};
}
function render(){
  const s = state();
  $("sum-lines").innerHTML = s.lines.map(l=>`<div class="sl"><span>${esc(l[0])}</span><span>${l[1]?fmt(l[1]):"—"}</span></div>`).join("")
    + (promo?`<div class="sl"><span>Code ${esc(promoCode)} (-${promo}%)</span><span>-${fmt(s.disc)}</span></div>`:"");
  $("total").textContent = s.plan.price==null ? (s.total? fmt(s.total)+" + devis":"Sur devis") : fmt(s.total);
  $("sum-delay").textContent = "Délai estimé : " + s.plan.delay;
  const msg = message();
  const ct = C.contact;
  $("insta-btn").hidden = !ct.instagram; if (ct.instagram) $("insta-btn").href = ct.instagram;
  $("mail-btn").hidden = !ct.email;
  if (ct.email) $("mail-btn").href = "mailto:"+ct.email+"?subject="+encodeURIComponent("Commande — "+s.plan.name)+"&body="+encodeURIComponent(msg);
  $("contact-line").textContent = [ct.instagramHandle&&"Instagram : "+ct.instagramHandle, ct.email].filter(Boolean).join(" · ");
}
function message(){
  const s = state(), d = new FormData(form);
  return ["🛒 NOUVELLE COMMANDE — "+C.brand, "",
    "Nom : "+(d.get("pseudo")||"—"), "Contact : "+(d.get("contact")||"—"), "Activité : "+(d.get("biz")||"—"), "",
    "Gamme : "+s.plan.name, ...s.lines.slice(1).map(l=>"+ "+l[0]),
    promo?"Code promo : "+promoCode+" (-"+promo+"%)":"",
    "TOTAL : "+(s.plan.price==null?"à définir (devis)":fmt(s.total)), "",
    "Projet : "+(d.get("desc")||"—")].filter((l,i,a)=>l!==""||a[i-1]!=="").join("\n");
}
function toast(t){ $("toast").textContent=t; setTimeout(()=>$("toast").textContent="",3500); }
form.addEventListener("input", render);
form.addEventListener("submit", e=>e.preventDefault());
$("promo-btn").onclick = ()=>{
  const code = $("promo").value.trim().toUpperCase();
  const m = $("promo-msg");
  if (C.promoCodes[code]) { promo=C.promoCodes[code]; promoCode=code; m.className="promo-msg"; m.textContent="Code appliqué : -"+promo+"%"; }
  else { promo=0; promoCode=""; m.className="promo-msg err"; m.textContent=code?"Code invalide.":""; }
  render();
};
$("copy-btn").onclick = async ()=>{
  if (!form.reportValidity()) return;
  const t = message();
  try { await navigator.clipboard.writeText(t); toast("✅ Commande copiée ! Envoie-la-moi en message privé sur Instagram."); }
  catch { const ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); toast("✅ Commande copiée !"); }
};
document.querySelectorAll("[data-plan]").forEach(b=>b.addEventListener("click",()=>{
  const r = form.querySelector(`input[name=plan][value="${b.dataset.plan}"]`); if (r) { r.checked=true; render(); }
}));
render();

/* menu mobile */
$("burger").onclick = ()=>$("links").classList.toggle("open");
$("links").addEventListener("click",()=>$("links").classList.remove("open"));

/* apparition au scroll */
const els = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(el=>io.observe(el));
} else els.forEach(el=>el.classList.add("in"));
})();
