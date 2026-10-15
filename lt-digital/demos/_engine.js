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
const lk = document.createElement("link"); lk.rel="stylesheet"; lk.href="/fonts/demos.css"; /* polices hébergées sur le site (aucune requête vers Google) */ document.head.appendChild(lk);
document.body.classList.add("L-"+(T.layout||"A"));
const pageTitle = {home:S.name, offre:S.offers.label+" — "+S.name, contact:"Contact — "+S.name}[page];
document.title = pageTitle;

const items = []; S.offers.cats.forEach((c,ci)=>c.items.forEach(it=>items.push({...it, cat:c.name})));
const href = {home:"index.html", offre:"offre.html", contact:"contact.html"};
const q = n => "contact.html?q="+encodeURIComponent(n);

const topbar = `<div class="top"><div class="w"><span>Maquette de démonstration réalisée par <b>L&amp;T Digital</b></span><span><a href="${ROOT}#realisations">← Retour aux réalisations</a> &nbsp;·&nbsp; <a href="${ROOT}#commande">Commander un site comme celui-ci →</a></span></div></div>`;
const header = `<header class="hd" id="hd"><div class="w nv"><a class="lg" href="index.html"><span class="mk">${esc(S.name.trim()[0])}</span><span>${esc(S.name)}</span></a>
<nav class="nl" id="nl"><a href="index.html" class="${page==="home"?"on":""}">Accueil</a><a href="offre.html" class="${page==="offre"?"on":""}">${esc(S.offers.label)}</a><a href="contact.html" class="${page==="contact"?"on":""}">Contact</a></nav>
<a class="btn" href="${S.home.ctaHref||"contact.html"}">${esc(S.home.cta)}</a><button class="bg" id="bg" aria-label="Menu">Menu</button></div></header>`;

const pic = it => {
  if (it.photo) return `<div class="pic" tabindex="0" role="button" aria-label="Agrandir ${esc(it.name)}"><img src="${esc(it.photo)}" alt="${esc(it.name)}"></div>`;
  if (S.offers.illustrations && it.img && window.FOOD && window.FOOD[it.img]) return `<div class="pic" tabindex="0" role="button" aria-label="Agrandir ${esc(it.name)}">${window.FOOD[it.img](window.__foodU())}</div>`;
  return ""; };
const hp = it => pic(it) ? " has-pic" : "";
const heroVisual = () => { if(!S.offers.images || !items.some(i=>i.photo && !CLEAN_NOPHOTO)) return infoCard(); const seen=[]; [...items.filter(i=>i.star), ...items].forEach(i=>{ if(seen.length<4 && pic(i) && !seen.includes(i)) seen.push(i); }); return `<div class="mosaic">${seen.map(i=>`<div class="mc has-pic">${pic(i)}<span>${esc(i.name)}</span></div>`).join("")}</div>`; };
const CLEAN_NOPHOTO = !S.offers.hasPhotos; /* tant qu'aucune vraie photo n'est fournie, on montre la fiche pratique */
function todayHours(){ try { const d = new Date().getDay(); for (const [days,times] of S.contact.hours){ const ds = dayset(days); if (ds && ds.includes(d)) return times; } return "Fermé"; } catch(e){ return S.contact.hours[0][1]; } }
function infoCard(){
  const C = S.contact, a = encodeURIComponent(S.name+" "+C.address), star = items.find(i=>i.star) || items[0], J = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"][new Date().getDay()];
  return `<aside class="fiche rv"><div class="fi-top"><span class="fi-name">${esc(S.name)}</span>${openBadge()}</div>
  <dl><div><dt>Aujourd'hui, ${J}</dt><dd>${esc(todayHours())}</dd></div>
  <div><dt>Adresse</dt><dd>${esc(C.address)} <a href="https://www.google.com/maps/dir/?api=1&destination=${a}" target="_blank" rel="noopener">Itinéraire ↗</a></dd></div>
  <div><dt>Téléphone</dt><dd><a href="tel:${esc(C.phone.replace(/\s/g,""))}">${esc(C.phone)}</a></dd></div>
  ${star?`<div class="fi-star"><dt>${esc(S.home.starLabel||"La spécialité de la maison")}</dt><dd><b>${esc(star.name)}</b><span>${esc(star.price||"")}</span></dd>${star.desc?`<p>${esc(star.desc)}</p>`:""}</div>`:""}</dl>
  <a class="fi-all" href="offre.html">${esc(S.offers.label)} complète →</a></aside>`; }
function quote(){ const H = S.home, q = H.quote || S.tagline; if (!q) return "";
  return `<figure class="qt"><blockquote>${esc(q)}</blockquote><figcaption>— ${esc(H.signature || "L'équipe " + S.name)}</figcaption></figure>`; }
const visual = () => `<div class="visbox">${(V[T.visual]||V.plate)()}</div>`;
const money = p => esc(p);


/* ---- ouvert / fermé (calculé depuis les horaires, si lisibles) ---- */
const DAYS = {dimanche:0,lundi:1,mardi:2,mercredi:3,jeudi:4,vendredi:5,samedi:6};
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
function dayset(txt){ const t = norm(txt); if (/tous les jours|7j\/7|7 j/.test(t)) return [0,1,2,3,4,5,6];
  const names = t.match(/dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi/g); if(!names) return null;
  if (names.length===2 && /[-–—]/.test(t)){ const a=DAYS[names[0]], b=DAYS[names[1]], out=[]; for(let d=a; ; d=(d+1)%7){ out.push(d); if(d===b) break; } return out; }
  return names.map(n=>DAYS[n]); }
function intervals(txt){ if (/ferm/i.test(txt)) return []; const out=[]; const re=/(\d{1,2})h(\d{2})?\s*[–-]\s*(\d{1,2})h(\d{2})?/g; let m; while((m=re.exec(txt))) out.push([+m[1]*60+(+m[2]||0), +m[3]*60+(+m[4]||0)]); return out.length?out:null; }
const fmtT = m => Math.floor(m/60)+"h"+(m%60?String(m%60).padStart(2,"0"):"");
function openBadge(){ try {
  const now = new Date(), d = now.getDay(), mn = now.getHours()*60+now.getMinutes(); let known=false, today=[];
  S.contact.hours.forEach(([days,times])=>{ const ds=dayset(days), iv=intervals(times); if(!ds||iv===null) return; known=true; if(ds.includes(d)) today=today.concat(iv); });
  if(!known) return "";
  const cur = today.find(([a,b])=>mn>=a&&mn<b); if (cur) return `<span class="open on"><i></i>Ouvert maintenant · jusqu'à ${fmtT(cur[1])}</span>`;
  const nxt = today.filter(([a])=>a>mn).sort((x,y)=>x[0]-y[0])[0]; return `<span class="open"><i></i>${nxt?"Fermé · ouvre à "+fmtT(nxt[0]):"Fermé actuellement"}</span>`;
 } catch(e){ return ""; } }

/* ---- petites icônes pour les engagements ---- */
const ICONS = {
 truck:'<path d="M2 6h11v9H2zM13 9h4l3 3v3h-7zM6 18a2 2 0 1 0 0 .1M17 18a2 2 0 1 0 0 .1"/>',
 bolt:'<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
 shield:'<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>',
 leaf:'<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19c3-5 6-8 10-10"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>' };
function icon(txt){ const t=norm(txt); const k = /livraison|collect|emporter|retrait/.test(t)?"truck":/rapide|express|24 ?h|urgence|vite|jour meme|intervention/.test(t)?"bolt":/garanti|assur|hygien|sterile|securit|decennale/.test(t)?"shield":/produit|farine|fleur|saison|lait|origine|local|frais|vigneron|ferme|bois/.test(t)?"leaf":/reserv|rendez|commande|devis|ligne/.test(t)?"cal":/salle|terrasse|atelier|cave|studio|chez/.test(t)?"pin":/soin|conseil|sur mesure|personnalis|ecoute/.test(t)?"heart":"star";
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`; }

function home(){
  const H = S.home, L = T.layout||"A";
  let feat = items.filter(i=>i.star); if (!feat.length) feat = S.offers.cats.map(c=>c.items[0]).filter(Boolean).map(i=>({...i}));
  const want = S.offers.images ? 6 : (L==="B"?4:3);
  if (feat.length<want) items.forEach(i=>{ if(feat.length<want && !feat.includes(i)) feat.push(i); });
  feat = feat.slice(0, want);
  const hl = feat.map((it,i)=>`<a class="card rv${hp(it)}" href="${q(it.name)}">${pic(it)}${it.tag?`<span class="tagc">${esc(it.tag)}</span>`:`<span class="n">${String(i+1).padStart(2,"0")}</span>`}<h3>${esc(it.name)}</h3><p>${esc(it.desc)}</p><span class="pr">${money(it.price)}</span></a>`).join("");
  const mq = L==="C" ? `<div class="mq"><div>${[...S.offers.cats.map(c=>c.name), ...items.slice(0,6).map(i=>i.name)].concat([...S.offers.cats.map(c=>c.name), ...items.slice(0,6).map(i=>i.name)]).map(t=>`<span>${esc(t)}</span>✦`).join("")}</div></div>` : "";
  const mqA = L==="A" ? `<div class="mqA" aria-hidden="true"><div>${Array(2).fill([...S.offers.cats.map(c=>c.name), ...items.slice(0,5).map(i=>i.name)]).flat().map(t=>`<span>${esc(t)}</span><b>✦</b>`).join("")}</div></div>` : "";
  return `<section class="hero">${L==="C"?`<div class="wm" aria-hidden="true">${esc(S.short)}</div>`:""}<div class="w hero-in"><div>${openBadge()}<span class="eb">${esc(H.kicker)}</span><h1>${accent(H.title)}</h1><p class="lead">${esc(H.text)}</p><div class="ctas"><a class="btn" href="${H.ctaHref||"contact.html"}">${esc(H.cta)}</a><a class="btn o" href="offre.html">${esc(H.cta2)}</a></div></div>${heroVisual()}</div>${mq}</section>${mqA}
${CLEAN_NOPHOTO?"":`<div class="strip"><div class="w"><div><small>Horaires</small>${esc(S.contact.hours[0][0])} · ${esc(S.contact.hours[0][1])}</div><div><small>Adresse</small>${esc(S.contact.address)}</div><div><small>Contact</small>${esc(S.contact.phone)}</div></div></div>`}
<section class="sec"><div class="w"><div class="sh rv"><span class="eb">${esc(H.highlightsKicker||S.offers.label)}</span><h2>${esc(H.highlightsTitle||S.offers.title)}</h2><p>${esc(H.highlightsText||"")}</p></div><div class="hl">${hl}</div><div class="ctas rv"><a class="btn o" href="offre.html">${esc(H.cta2)}</a></div></div></section>
<section class="sec alt"><div class="w duo"><div class="rv">${quote()}</div><div class="rv"><span class="eb">${esc(H.aboutKicker||"À propos")}</span><h2>${esc(H.aboutTitle)}</h2><p>${esc(H.about)}</p><div class="stats">${H.stats.map(([v,l])=>`<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join("")}</div></div></div></section>
<section class="sec"><div class="w"><div class="feat">${H.features.map(([t,x])=>`<div class="rv"><span class="ico">${icon(t+" "+x)}</span><h4>${esc(t)}</h4><p>${esc(x)}</p></div>`).join("")}</div></div></section>
${extrasHome()}<section class="cta"><div class="w"><div><h2>${esc(H.ctaTitle||"Une question ? Parlons-en.")}</h2><p>${esc(H.ctaText||"")}</p></div><a class="btn" href="contact.html">${esc(H.cta)}</a></div></section>`;
}

function offre(){
  const O = S.offers;
  return `<div class="ph"><div class="w"><span class="eb">${esc(S.short)}</span><h1>${esc(O.title)}</h1><p class="lead">${esc(O.intro)}</p><input class="search" id="search" type="search" placeholder="Rechercher un produit…" aria-label="Rechercher un produit"></div></div>
<div class="catbar"><div class="w"><nav class="catnav" id="catnav">${O.cats.map((c,i)=>`<a href="#c${i}">${esc(c.name)}</a>`).join("")}</nav></div></div>
${O.cats.map((c,i)=>`<section class="cat" id="c${i}"><div class="w"><h2 class="rv">${esc(c.name)}${c.note?`<small>${esc(c.note)}</small>`:""}</h2><div class="items${c.items.some(i=>pic(i))?" pics":""}">${c.items.map(it=>`<article class="it rv${hp(it)}">${pic(it)}<h3>${esc(it.name)}${it.tag?` <span class="tagc" style="display:inline-block;margin:0 0 0 8px;vertical-align:middle">${esc(it.tag)}</span>`:""}</h3><span class="p">${money(it.price)}</span><p class="d">${esc(it.desc)}</p><a class="go" href="${q(it.name)}">${esc(S.contact.form.itemCta||"Choisir")} →</a></article>`).join("")}</div></div></section>`).join("")}
<div class="w"><p class="none" id="none">Aucun produit ne correspond à cette recherche.</p></div>`;
}

function map(){
  return `<svg viewBox="0 0 640 360" class="map" role="img" aria-label="Plan du quartier"><rect width="640" height="360" fill="var(--bg2)"/><g fill="var(--bg)" stroke="var(--line)" stroke-width="2"><rect x="30" y="30" width="150" height="90" rx="4"/><rect x="210" y="30" width="110" height="90" rx="4"/><rect x="350" y="30" width="130" height="90" rx="4"/><rect x="510" y="30" width="100" height="90" rx="4"/><rect x="30" y="150" width="150" height="70" rx="4"/><rect x="350" y="150" width="130" height="70" rx="4"/><rect x="510" y="150" width="100" height="70" rx="4"/><rect x="30" y="250" width="290" height="80" rx="4"/><rect x="350" y="250" width="260" height="80" rx="4"/></g><rect x="210" y="150" width="110" height="70" rx="4" fill="var(--acc)" opacity=".16" stroke="var(--acc)" stroke-width="2"/><path d="M0 235C140 215 260 245 420 225S600 205 640 215" stroke="var(--acc2)" stroke-width="9" fill="none" opacity=".28"/><g transform="translate(265 150)"><circle class="ring" cx="0" cy="50" r="16" fill="none" stroke="var(--acc)" stroke-width="3"/><g class="pin"><path d="M0 52c-20-26-30-38-30-56a30 30 0 0 1 60 0c0 18-10 30-30 56z" fill="var(--acc)" stroke="var(--ink)" stroke-width="3"/><circle cx="0" cy="-5" r="10" fill="var(--bg)"/></g></g></svg>`;
}
/* ---------------------------------------------------------------------
   OPTIONS DE LA MAQUETTE (dans site.js → "extras") :
   "maps": true                       → carte Google Maps + bouton itinéraire
   "booking": { … }                   → réservation en ligne (jours, créneaux, nombre de personnes)
   "notify": true                     → notifications : le commerçant est prévenu, le client reçoit sa confirmation
   --------------------------------------------------------------------- */
const X = S.extras || {};
const PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c-3.9 0-7 3-7 6.9 0 5.1 7 12.1 7 12.1s7-7 7-12.1c0-3.9-3.1-6.9-7-6.9z" fill="#ea4335"/><circle cx="12" cy="9.4" r="2.6" fill="#7a1a12"/></svg>';
function gmap(){
  const a = encodeURIComponent(S.name + " " + S.contact.address);
  return `<div class="gmap rv"><div class="gm-map">${map()}<span class="gm-pin">${PIN}</span><span class="gm-pulse"></span>
  <div class="gm-ctrl" aria-hidden="true"><b>+</b><b>−</b></div><span class="gm-brand">${PIN}Google Maps</span></div>
  <div class="gm-card"><div><strong>${esc(S.name)}</strong><span>${esc(S.short)} · ${esc(S.contact.address)}</span></div>
  <div class="gm-btns"><a class="gm-go" href="https://www.google.com/maps/dir/?api=1&destination=${a}" target="_blank" rel="noopener">➜ Itinéraire</a><a href="https://www.google.com/maps/search/?api=1&query=${a}" target="_blank" rel="noopener">Ouvrir dans Maps</a></div></div></div>`;
}
function booking(){
  const B = X.booking, d0 = new Date(), J = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"], M = ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
  const closed = B.closed || [];
  const days = []; for (let k = 0; days.length < 7 && k < 14; k++){ const d = new Date(d0); d.setDate(d0.getDate()+k); if (closed.includes(d.getDay())) continue; days.push(d); }
  return `<form class="bk rv" id="bk"><div class="bk-h"><span class="eb">${esc(B.kicker||"Réservation en ligne")}</span><h2>${esc(B.title||"Réservez en 30 secondes")}</h2><p>${esc(B.text||"Choisissez un jour et un créneau : c'est confirmé tout de suite.")}</p></div>
  ${B.services?`<label class="bk-l">${esc(B.serviceLabel||"Prestation")}<select name="sv">${B.services.map(x=>`<option>${esc(x)}</option>`).join("")}</select></label>`:""}
  <div class="bk-l">Jour</div><div class="bk-days">${days.map((d,i)=>`<button type="button" class="${i?"":"on"}" data-d="${J[d.getDay()]} ${d.getDate()} ${M[d.getMonth()]}"><small>${i===0?"Auj.":J[d.getDay()]}</small><b>${d.getDate()}</b><small>${M[d.getMonth()]}</small></button>`).join("")}</div>
  <div class="bk-l">Créneau</div><div class="bk-slots">${(B.slots||[]).map((t,i)=>`<button type="button" class="${i===1?"on":""}${(B.full||[]).includes(t)?" full":""}" ${(B.full||[]).includes(t)?"disabled":""}>${esc(t)}</button>`).join("")}</div>
  ${B.people?`<div class="bk-row"><span class="bk-l">${esc(B.peopleLabel||"Personnes")}</span><div class="bk-step"><button type="button" data-s="-1" aria-label="Moins">−</button><output id="bk-n">2</output><button type="button" data-s="1" aria-label="Plus">+</button></div></div>`:""}
  <div class="bk-two"><input required name="n" placeholder="Votre nom"><input required name="t" placeholder="06 00 00 00 00"></div>
  <button class="btn bk-go" type="submit">${esc(B.button||"Confirmer la réservation")}</button>
  <div class="bk-ok" id="bk-ok" hidden></div><p class="bk-note">Démonstration : aucune réservation n'est réellement envoyée.</p></form>`;
}
function extrasHome(){
  if (!X.maps && !X.booking) return "";
  return `<section class="sec alt xtra" id="reserver"><div class="w${X.booking && X.maps ? " xtra-g" : ""}">${X.booking?booking():""}${X.maps?`<div><div class="sh rv"><span class="eb">Nous trouver</span><h2>${esc(S.contact.address)}</h2><p>${esc(S.contact.hours[0][0])} · ${esc(S.contact.hours[0][1])}</p></div>${gmap()}</div>`:""}</div></section>`;
}
function contact(){
  const C = S.contact, F = C.form, qv = new URLSearchParams(location.search).get("q")||"";
  return `<div class="ph"><div class="w"><span class="eb">${esc(S.short)}</span><h1>${esc(C.title)}</h1><p class="lead">${esc(C.intro)}</p></div></div>
<div class="w ct"><div class="info rv"><dl><div><dt>Adresse</dt><dd>${esc(C.address)}</dd></div><div><dt>Téléphone</dt><dd>${esc(C.phone)}</dd></div>${C.email?`<div><dt>E-mail</dt><dd>${esc(C.email)}</dd></div>`:""}${C.social?`<div><dt>${esc(C.social.label)}</dt><dd>${esc(C.social.text)}</dd></div>`:""}</dl>
<table class="hrs">${C.hours.map(([d,t])=>`<tr><td>${esc(d)}</td><td>${esc(t)}</td></tr>`).join("")}</table>${X.maps ? gmap() : map()}</div>
<form class="fm rv" id="fm"><h2>${esc(F.title)}</h2><div class="two"><label>Nom<input name="n" required placeholder="Votre nom"></label><label>Téléphone ou e-mail<input name="c" required placeholder="06 00 00 00 00"></label></div>
<label>Votre demande<select name="o">${F.options.map(o=>`<option>${esc(o)}</option>`).join("")}</select></label>
<label>Message<textarea name="m" rows="4" placeholder="${esc(F.placeholder||"Dites-nous en quelques mots…")}">${qv?esc("Bonjour, je suis intéressé(e) par : "+qv+"."):""}</textarea></label>
<button class="btn" type="submit">${esc(F.button)}</button><p class="note">${esc(C.note||"")}</p><div class="ok" id="ok" hidden>${esc(F.success)}</div></form></div>`;
}

const footer = `<footer class="ft"><div class="w"><div class="g"><div><a class="lg" href="index.html"><span class="mk">${esc(S.name.trim()[0])}</span><span>${esc(S.name)}</span></a><p style="margin-top:14px;max-width:26em">${esc(S.tagline||"")}</p></div>
<div><h4>Horaires</h4><ul>${S.contact.hours.map(([d,t])=>`<li>${esc(d)} · ${esc(t)}</li>`).join("")}</ul></div>
<div><h4>Navigation</h4><ul><li><a href="index.html">Accueil</a></li><li><a href="offre.html">${esc(S.offers.label)}</a></li><li><a href="contact.html">Contact</a></li></ul></div></div>
<div class="bt"><span>© ${new Date().getFullYear()} ${esc(S.name)} — ${esc(S.contact.address)}</span><span>Maquette de démonstration · site réalisé par L&amp;T Digital</span></div></div></footer>`;

if (window.self !== window.top) document.documentElement.classList.add("embed");
document.body.innerHTML = topbar + header + `<main>${{home,offre,contact}[page]()}</main>` + footer;

/* mots du titre qui montent un par un */
(function splitWords(){ const h1=document.querySelector(".hero h1"); if(!h1||matchMedia("(prefers-reduced-motion: reduce)").matches) return; let i=0;
  const walk=node=>[...node.childNodes].forEach(n=>{ if(n.nodeType===3){ const f=document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(t=>{ if(!t) return; if(/^\s+$/.test(t)) f.append(t); else { const o=document.createElement("span"); o.className="wd"; const s=document.createElement("span"); s.textContent=t; s.style.setProperty("--i",i++); o.append(s); f.append(o); } }); n.replaceWith(f); } else if(n.nodeType===1) walk(n); }); walk(h1); })();

/* barre de progression + parallaxe */
const sp=document.createElement("div"); sp.className="sp"; document.body.prepend(sp);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let tick=false; function onScroll(){ if(tick) return; tick=true; requestAnimationFrame(()=>{ tick=false; const y=scrollY, max=document.documentElement.scrollHeight-innerHeight;
  sp.style.transform=`scaleX(${max>0?Math.min(1,y/max):0})`; if(!reduce){ const v=document.querySelector(".hero .visbox,.hero .mosaic"); if(v) v.style.setProperty("--py",(Math.min(y,700)*-.06).toFixed(1)+"px"); const w=document.querySelector(".wm"); if(w) w.style.setProperty("--wx",(-Math.min(y,900)*.14).toFixed(1)+"px"); } }); }
addEventListener("scroll",onScroll,{passive:true}); onScroll();
if(!reduce && matchMedia("(pointer:fine)").matches){
  const vb=document.querySelector(".hero .visbox"); const hero=document.querySelector(".hero");
  if(vb&&hero) hero.addEventListener("pointermove",ev=>{ const r=hero.getBoundingClientRect(), x=(ev.clientX-r.left)/r.width-.5, y=(ev.clientY-r.top)/r.height-.5; const s=vb.querySelector("svg"); if(s) s.style.transform=`translate(${(x*16).toFixed(1)}px,${(y*12).toFixed(1)}px) rotate(${(x*3).toFixed(2)}deg)`; });
  document.querySelectorAll(".card,.it").forEach(c=>c.addEventListener("pointermove",ev=>{ const r=c.getBoundingClientRect(); c.style.setProperty("--mx",((ev.clientX-r.left)/r.width*100)+"%"); c.style.setProperty("--my",((ev.clientY-r.top)/r.height*100)+"%"); }));
}
/* chiffres qui défilent */
/* (les chiffres s'affichent directement : pas de compteur qui part de zéro) */ if (false) document.querySelectorAll(".stats strong").forEach(el=>{ const m=el.textContent.match(/^(\D*)(\d+)(.*)$/); if(!m||reduce||/[?&]clean/.test(location.search)) return; const end=+m[2]; if(end<2) return; el.dataset.t=el.textContent; el.textContent=m[1]+"0"+m[3];
  const io=new IntersectionObserver(es=>es.forEach(x=>{ if(!x.isIntersecting) return; io.disconnect(); const t0=performance.now(); const step=t=>{ const k=Math.min(1,(t-t0)/1300), v=Math.round(end*(1-Math.pow(1-k,3))); el.textContent=m[1]+v+m[3]; if(k<1) requestAnimationFrame(step); }; requestAnimationFrame(step); }),{threshold:.6}); io.observe(el); });
/* page offre : recherche + catégorie active */
const se=document.getElementById("search"); if(se){ se.addEventListener("input",()=>{ const t=norm(se.value.trim()); let any=false;
  document.querySelectorAll(".cat").forEach(c=>{ let n=0; c.querySelectorAll(".it").forEach(i=>{ const ok=!t||norm(i.textContent).includes(t); i.hidden=!ok; if(ok) n++; }); c.hidden=!n; if(n) any=true; });
  const no=document.getElementById("none"); if(no) no.style.display=any?"none":"block"; }); }
const cn=document.getElementById("catnav"); if(cn && "IntersectionObserver" in window){ const links=[...cn.querySelectorAll("a")];
  const io=new IntersectionObserver(es=>es.forEach(x=>{ if(x.isIntersecting){ links.forEach(l=>l.classList.toggle("on",l.getAttribute("href")==="#"+x.target.id)); } }),{rootMargin:"-30% 0px -60% 0px"}); document.querySelectorAll(".cat").forEach(c=>io.observe(c)); }

/* comportements */
const hd = document.getElementById("hd"); const sc = ()=>hd.classList.toggle("sc", scrollY>8); sc(); addEventListener("scroll",sc,{passive:true});
document.getElementById("bg").onclick = ()=>document.getElementById("nl").classList.toggle("open");
/* réservation : choix du jour / créneau / nombre, puis confirmation + notifications */
const bk = document.getElementById("bk");
if (bk){ const pick = sel => bk.querySelector(sel).addEventListener("click", e=>{ const b = e.target.closest("button"); if (!b || b.disabled) return; b.parentNode.querySelectorAll("button").forEach(x=>x.classList.remove("on")); b.classList.add("on"); });
  pick(".bk-days"); pick(".bk-slots");
  const st = bk.querySelector(".bk-step"); if (st) st.addEventListener("click", e=>{ const b = e.target.closest("button"); if (!b) return; const o = document.getElementById("bk-n"); o.textContent = Math.max(1, Math.min(12, +o.textContent + +b.dataset.s)); });
  bk.addEventListener("submit", e=>{ e.preventDefault(); const day = bk.querySelector(".bk-days .on").dataset.d, slot = bk.querySelector(".bk-slots .on")?.textContent || "", n = document.getElementById("bk-n")?.textContent, sv = bk.querySelector("select")?.value;
    const what = (sv ? sv + " · " : "") + (n ? n + " pers. · " : "") + day + " à " + slot;
    const ok = document.getElementById("bk-ok"); ok.hidden = false; ok.innerHTML = `<b>✓ C'est réservé !</b><span>${esc(what)}</span>`; bk.querySelector(".bk-go").disabled = true;
    if (X.notify) notify([
      { who: S.name, ic: "🔔", t: (X.booking.notifTitle||"Nouvelle réservation"), x: what + " — " + (bk.n.value||"Client"), lab: "Reçu par le commerçant" },
      { who: "SMS", ic: "💬", t: "Réservation confirmée", x: `${S.name} : merci ${bk.n.value||""} ! Rendez-vous ${day} à ${slot}. Un rappel vous sera envoyé la veille.`, lab: "Reçu par le client" } ]); }); }
function notify(list){ let box = document.querySelector(".nt-box"); if (!box){ box = document.createElement("div"); box.className = "nt-box"; box.setAttribute("aria-live","polite"); document.body.appendChild(box); }
  list.forEach((n,i)=>setTimeout(()=>{ const el = document.createElement("div"); el.className = "nt";
    el.innerHTML = `<span class="nt-lab">${esc(n.lab)}</span><div class="nt-in"><span class="nt-ic">${n.ic}</span><div><small>${esc(n.who)} · maintenant</small><b>${esc(n.t)}</b><p>${esc(n.x)}</p></div></div>`;
    box.appendChild(el); setTimeout(()=>{ el.classList.add("out"); setTimeout(()=>el.remove(), 500); }, 9000); }, 600 + i*1400)); }
const fm = document.getElementById("fm"); if (fm) fm.addEventListener("submit",e=>{ e.preventDefault(); document.getElementById("ok").hidden=false; fm.querySelector("button").disabled=true; });
/* photo introuvable : on retire la case (le site reste propre tant qu'il n'y a pas de photo) */
const CLEAN = /[?&]clean/.test(location.search), PH = S.offers.placeholders !== false && !CLEAN;
const CAM = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 15h9l3-5h12l3 5h9v24H6z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="24" cy="26" r="7.5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';
function dropPic(im){ const p = im.closest(".pic"); if(!p) return; const holder = p.closest(".mc,.it,.card");
  if (PH){ const a = document.createElement("a"); a.className = "pic empty"; a.href = "../photos.html"; a.target = "_blank"; a.rel = "noopener"; a.title = "Ajouter la photo de ce produit";
    a.innerHTML = `${CAM}<b>Photo à ajouter</b><span>Ajoute ta vraie photo ici</span>`; p.replaceWith(a); return; }
  if (holder && holder.classList.contains("mc")){ holder.remove(); const mo = document.querySelector(".mosaic"); if (mo && !mo.children.length) mo.outerHTML = visual(); }
  else if (holder) holder.classList.remove("has-pic"); p.remove(); }
document.querySelectorAll(".pic img").forEach(im=>{ im.addEventListener("error",()=>dropPic(im)); if (im.complete && !im.naturalWidth) dropPic(im); });
/* agrandir une photo produit */
document.addEventListener("click",ev=>{ const p=ev.target.closest(".pic"); if(!p||p.classList.contains("empty")||ev.target.closest("a.go")) return; ev.preventDefault();
  const card=p.closest(".it,.card"), name=card&&card.querySelector("h3")?(card.querySelector("h3").firstChild.textContent||"").trim():"";
  const ov=document.createElement("div"); ov.className="zoom"; ov.innerHTML=`<div class="zoom-in">${p.innerHTML}<p>${esc(name)}</p><button type="button">Fermer</button></div>`; document.body.appendChild(ov);
  const close=()=>{ ov.remove(); document.removeEventListener("keydown",kd); }; const kd=e=>{ if(e.key==="Escape") close(); };
  document.addEventListener("keydown",kd); ov.addEventListener("click",close); ov.querySelector("button").focus(); });
document.addEventListener("keydown",ev=>{ if((ev.key==="Enter"||ev.key===" ")&&ev.target.classList&&ev.target.classList.contains("pic")){ ev.preventDefault(); ev.target.click(); } });
const els = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window){ const io = new IntersectionObserver(es=>es.forEach(x=>{ if(x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target);} }),{threshold:.1}); els.forEach((e,i)=>{ e.style.transitionDelay=Math.min(i%6,5)*60+"ms"; io.observe(e); }); } else els.forEach(e=>e.classList.add("in"));
})();
