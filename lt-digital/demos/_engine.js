/* Moteur des maquettes : lit window.SITE (fichier site.js du dossier) et construit la page. */
(function(){
const S = window.SITE, T = S.theme, V = window.VISUALS || {};
const esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const accent = t => esc(t).replace(/\{([^}]*)\}/g,'<em class="a">$1</em>');
const page = document.body.dataset.page || "home";
const ROOT = "../../index.html";

/* thème */
const r = document.documentElement.style;
["bg","bg2","ink","mut","acc","acc2","line","card","onacc"].forEach(k=>r.setProperty("--"+k, T[k]));
r.setProperty("--hf", `'${T.headFont}'`); r.setProperty("--bf", `'${T.bodyFont}'`);
r.setProperty("--hw", T.headWeight||600); r.setProperty("--r", (T.radius==null?12:T.radius)+"px");
r.setProperty("--hcase", T.upper ? "uppercase" : "none"); if (T.upper) r.setProperty("--hls", ".01em");
const single = ["Anton","Bebas Neue","Archivo Black"], ital = ["Cormorant Garamond","Playfair Display","Fraunces"];
const fam = f => "family="+f.replace(/ /g,"+")+(single.includes(f)?"":ital.includes(f)?":ital,wght@0,400;0,500;0,600;0,700;1,500":":wght@400;500;600;700");
const lk = document.createElement("link"); lk.rel="stylesheet"; lk.href="https://fonts.googleapis.com/css2?"+fam(T.headFont)+"&"+fam(T.bodyFont)+"&family=DM+Mono:wght@400;500&display=swap"; document.head.appendChild(lk);
document.body.classList.add("L-"+(T.layout||"A"));
const pageTitle = {home:S.name, offre:S.offers.label+" — "+S.name, contact:"Contact — "+S.name}[page];
document.title = pageTitle;

const items = []; S.offers.cats.forEach((c,ci)=>c.items.forEach(it=>items.push({...it, cat:c.name})));
const href = {home:"index.html", offre:"offre.html", contact:"contact.html"};
const q = n => "contact.html?q="+encodeURIComponent(n);

const topbar = `<div class="top"><div class="w"><span>Maquette de démonstration réalisée par <b>LT Digital</b></span><span><a href="${ROOT}#realisations">← Retour aux réalisations</a> &nbsp;·&nbsp; <a href="${ROOT}#commande">Commander un site comme celui-ci →</a></span></div></div>`;
const header = `<header class="hd" id="hd"><div class="w nv"><a class="lg" href="index.html"><span class="mk">${esc(S.name.trim()[0])}</span><span>${esc(S.name)}</span></a>
<nav class="nl" id="nl"><a href="index.html" class="${page==="home"?"on":""}">Accueil</a><a href="offre.html" class="${page==="offre"?"on":""}">${esc(S.offers.label)}</a><a href="contact.html" class="${page==="contact"?"on":""}">Contact</a></nav>
<a class="btn" href="${S.home.ctaHref||"contact.html"}">${esc(S.home.cta)}</a><button class="bg" id="bg" aria-label="Menu">Menu</button></div></header>`;

const pic = it => it.photo ? `<div class="pic" tabindex="0" role="button" aria-label="Agrandir ${esc(it.name)}"><img src="${esc(it.photo)}" alt="${esc(it.name)}" loading="lazy"></div>` : (it.img && window.FOOD && window.FOOD[it.img]) ? `<div class="pic" tabindex="0" role="button" aria-label="Agrandir ${esc(it.name)}">${window.FOOD[it.img](window.__foodU())}</div>` : "";
const hp = it => pic(it) ? " has-pic" : "";
const heroVisual = () => { if(!S.offers.images) return visual(); const seen=[]; [...items.filter(i=>i.star), ...items].forEach(i=>{ if(seen.length<4 && pic(i) && !seen.includes(i)) seen.push(i); }); return `<div class="mosaic">${seen.map(i=>`<div class="mc has-pic">${pic(i)}<span>${esc(i.name)}</span></div>`).join("")}</div>`; };
const visual = () => `<div class="visbox">${(V[T.visual]||V.plate)()}</div>`;
const money = p => esc(p);

function home(){
  const H = S.home, L = T.layout||"A";
  let feat = items.filter(i=>i.star); if (!feat.length) feat = S.offers.cats.map(c=>c.items[0]).filter(Boolean).map(i=>({...i}));
  const want = L==="B"?4:3;
  if (feat.length<want) items.forEach(i=>{ if(feat.length<want && !feat.includes(i)) feat.push(i); });
  feat = feat.slice(0, want);
  const hl = feat.map((it,i)=>`<a class="card rv${hp(it)}" href="${q(it.name)}">${pic(it)}${it.tag?`<span class="tagc">${esc(it.tag)}</span>`:`<span class="n">${String(i+1).padStart(2,"0")}</span>`}<h3>${esc(it.name)}</h3><p>${esc(it.desc)}</p><span class="pr">${money(it.price)}</span></a>`).join("");
  const mq = L==="C" ? `<div class="mq"><div>${[...S.offers.cats.map(c=>c.name), ...items.slice(0,6).map(i=>i.name)].concat([...S.offers.cats.map(c=>c.name), ...items.slice(0,6).map(i=>i.name)]).map(t=>`<span>${esc(t)}</span>✦`).join("")}</div></div>` : "";
  return `<section class="hero"><div class="w hero-in"><div><span class="eb">${esc(H.kicker)}</span><h1>${accent(H.title)}</h1><p class="lead">${esc(H.text)}</p><div class="ctas"><a class="btn" href="${H.ctaHref||"contact.html"}">${esc(H.cta)}</a><a class="btn o" href="offre.html">${esc(H.cta2)}</a></div></div>${heroVisual()}</div>${mq}</section>
<div class="strip"><div class="w"><div><small>Horaires</small>${esc(S.contact.hours[0][0])} · ${esc(S.contact.hours[0][1])}</div><div><small>Adresse</small>${esc(S.contact.address)}</div><div><small>Contact</small>${esc(S.contact.phone)}</div></div></div>
<section class="sec"><div class="w"><div class="sh rv"><span class="eb">${esc(H.highlightsKicker||S.offers.label)}</span><h2>${esc(H.highlightsTitle||S.offers.title)}</h2><p>${esc(H.highlightsText||"")}</p></div><div class="hl">${hl}</div><div class="ctas rv"><a class="btn o" href="offre.html">${esc(H.cta2)}</a></div></div></section>
<section class="sec alt"><div class="w duo"><div class="rv">${visual()}</div><div class="rv"><span class="eb">${esc(H.aboutKicker||"À propos")}</span><h2>${esc(H.aboutTitle)}</h2><p>${esc(H.about)}</p><div class="stats">${H.stats.map(([v,l])=>`<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join("")}</div></div></div></section>
<section class="sec"><div class="w"><div class="feat">${H.features.map(([t,x])=>`<div class="rv"><h4>${esc(t)}</h4><p>${esc(x)}</p></div>`).join("")}</div></div></section>
<section class="cta"><div class="w"><div><h2>${esc(H.ctaTitle||"Une question ? Parlons-en.")}</h2><p>${esc(H.ctaText||"")}</p></div><a class="btn" href="contact.html">${esc(H.cta)}</a></div></section>`;
}

function offre(){
  const O = S.offers;
  return `<div class="ph"><div class="w"><span class="eb">${esc(S.short)}</span><h1>${esc(O.title)}</h1><p class="lead">${esc(O.intro)}</p><nav class="catnav">${O.cats.map((c,i)=>`<a href="#c${i}">${esc(c.name)}</a>`).join("")}</nav></div></div>
${O.cats.map((c,i)=>`<section class="cat" id="c${i}"><div class="w"><h2 class="rv">${esc(c.name)}${c.note?`<small>${esc(c.note)}</small>`:""}</h2><div class="items${c.items.some(i=>pic(i))?" pics":""}">${c.items.map(it=>`<article class="it rv${hp(it)}">${pic(it)}<h3>${esc(it.name)}${it.tag?` <span class="tagc" style="display:inline-block;margin:0 0 0 8px;vertical-align:middle">${esc(it.tag)}</span>`:""}</h3><span class="p">${money(it.price)}</span><p class="d">${esc(it.desc)}</p><a class="go" href="${q(it.name)}">${esc(S.contact.form.itemCta||"Choisir")} →</a></article>`).join("")}</div></div></section>`).join("")}`;
}

function map(){
  return `<svg viewBox="0 0 640 360" class="map" role="img" aria-label="Plan du quartier"><rect width="640" height="360" fill="var(--bg2)"/><g fill="var(--bg)" stroke="var(--line)" stroke-width="2"><rect x="30" y="30" width="150" height="90" rx="4"/><rect x="210" y="30" width="110" height="90" rx="4"/><rect x="350" y="30" width="130" height="90" rx="4"/><rect x="510" y="30" width="100" height="90" rx="4"/><rect x="30" y="150" width="150" height="70" rx="4"/><rect x="350" y="150" width="130" height="70" rx="4"/><rect x="510" y="150" width="100" height="70" rx="4"/><rect x="30" y="250" width="290" height="80" rx="4"/><rect x="350" y="250" width="260" height="80" rx="4"/></g><rect x="210" y="150" width="110" height="70" rx="4" fill="var(--acc)" opacity=".16" stroke="var(--acc)" stroke-width="2"/><path d="M0 235C140 215 260 245 420 225S600 205 640 215" stroke="var(--acc2)" stroke-width="9" fill="none" opacity=".28"/><g transform="translate(265 150)"><path d="M0 52c-20-26-30-38-30-56a30 30 0 0 1 60 0c0 18-10 30-30 56z" fill="var(--acc)" stroke="var(--ink)" stroke-width="3"/><circle cx="0" cy="-5" r="10" fill="var(--bg)"/></g></svg>`;
}
function contact(){
  const C = S.contact, F = C.form, qv = new URLSearchParams(location.search).get("q")||"";
  return `<div class="ph"><div class="w"><span class="eb">${esc(S.short)}</span><h1>${esc(C.title)}</h1><p class="lead">${esc(C.intro)}</p></div></div>
<div class="w ct"><div class="info rv"><dl><div><dt>Adresse</dt><dd>${esc(C.address)}</dd></div><div><dt>Téléphone</dt><dd>${esc(C.phone)}</dd></div>${C.email?`<div><dt>E-mail</dt><dd>${esc(C.email)}</dd></div>`:""}${C.social?`<div><dt>${esc(C.social.label)}</dt><dd>${esc(C.social.text)}</dd></div>`:""}</dl>
<table class="hrs">${C.hours.map(([d,t])=>`<tr><td>${esc(d)}</td><td>${esc(t)}</td></tr>`).join("")}</table>${map()}</div>
<form class="fm rv" id="fm"><h2>${esc(F.title)}</h2><div class="two"><label>Nom<input name="n" required placeholder="Votre nom"></label><label>Téléphone ou e-mail<input name="c" required placeholder="06 00 00 00 00"></label></div>
<label>Votre demande<select name="o">${F.options.map(o=>`<option>${esc(o)}</option>`).join("")}</select></label>
<label>Message<textarea name="m" rows="4" placeholder="${esc(F.placeholder||"Dites-nous en quelques mots…")}">${qv?esc("Bonjour, je suis intéressé(e) par : "+qv+"."):""}</textarea></label>
<button class="btn" type="submit">${esc(F.button)}</button><p class="note">${esc(C.note||"")}</p><div class="ok" id="ok" hidden>${esc(F.success)}</div></form></div>`;
}

const footer = `<footer class="ft"><div class="w"><div class="g"><div><a class="lg" href="index.html"><span class="mk">${esc(S.name.trim()[0])}</span><span>${esc(S.name)}</span></a><p style="margin-top:14px;max-width:26em">${esc(S.tagline||"")}</p></div>
<div><h4>Horaires</h4><ul>${S.contact.hours.map(([d,t])=>`<li>${esc(d)} · ${esc(t)}</li>`).join("")}</ul></div>
<div><h4>Navigation</h4><ul><li><a href="index.html">Accueil</a></li><li><a href="offre.html">${esc(S.offers.label)}</a></li><li><a href="contact.html">Contact</a></li></ul></div></div>
<div class="bt"><span>© ${new Date().getFullYear()} ${esc(S.name)} — ${esc(S.contact.address)}</span><span>Maquette de démonstration · site réalisé par LT Digital</span></div></div></footer>`;

if (window.self !== window.top) document.documentElement.classList.add("embed");
document.body.innerHTML = topbar + header + `<main>${{home,offre,contact}[page]()}</main>` + footer;

/* comportements */
const hd = document.getElementById("hd"); const sc = ()=>hd.classList.toggle("sc", scrollY>8); sc(); addEventListener("scroll",sc,{passive:true});
document.getElementById("bg").onclick = ()=>document.getElementById("nl").classList.toggle("open");
const fm = document.getElementById("fm"); if (fm) fm.addEventListener("submit",e=>{ e.preventDefault(); document.getElementById("ok").hidden=false; fm.querySelector("button").disabled=true; });
/* agrandir une photo / illustration produit */
document.addEventListener("click",ev=>{ const p=ev.target.closest(".pic"); if(!p||ev.target.closest("a.go")) return; ev.preventDefault();
  const card=p.closest(".it,.card"), name=card&&card.querySelector("h3")?(card.querySelector("h3").firstChild.textContent||"").trim():"";
  const ov=document.createElement("div"); ov.className="zoom"; ov.innerHTML=`<div class="zoom-in">${p.innerHTML}<p>${esc(name)}</p><button type="button">Fermer</button></div>`; document.body.appendChild(ov);
  const close=()=>{ ov.remove(); document.removeEventListener("keydown",kd); }; const kd=e=>{ if(e.key==="Escape") close(); };
  document.addEventListener("keydown",kd); ov.addEventListener("click",close); ov.querySelector("button").focus(); });
document.addEventListener("keydown",ev=>{ if((ev.key==="Enter"||ev.key===" ")&&ev.target.classList&&ev.target.classList.contains("pic")){ ev.preventDefault(); ev.target.click(); } });
const els = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window){ const io = new IntersectionObserver(es=>es.forEach(x=>{ if(x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target);} }),{threshold:.1}); els.forEach((e,i)=>{ e.style.transitionDelay=Math.min(i%6,5)*60+"ms"; io.observe(e); }); } else els.forEach(e=>e.classList.add("in"));
})();
