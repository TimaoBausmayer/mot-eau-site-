/* Pages légales générées depuis config.js (legal, vat, order, delivery). Modèles : à faire relire par un professionnel. */
(function(){
const C = window.SITE_CONFIG, L = C.legal||{}, co = L.company||{}, ho = L.hosting||{}, me = L.mediator||{}, cg = L.cgv||{}, vat = Object.assign({mode:"ttc",rate:20}, C.vat||{});
const page = document.body.dataset.page;
const esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const todo = (v,label) => v ? esc(v) : `<mark class="todo">[à compléter : ${esc(label)}]</mark>`;
const brand = co.name || C.brand, today = L.updated || new Date().toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"});
const r = document.documentElement.style; r.setProperty("--accent", C.accent); r.setProperty("--accent2", C.accent2||C.accent);
const delivery = C.delivery || "48 à 72 h", dep = +((C.order||{}).depositPercent)||0;
const tvaTxt = vat.mode==="ttc" ? `Les prix sont indiqués en euros toutes taxes comprises (TVA au taux de ${vat.rate} % incluse).` : vat.mode==="ht" ? `Les prix sont indiqués en euros hors taxes. La TVA au taux de ${vat.rate} % est ajoutée au montant facturé.` : "TVA non applicable, article 293 B du Code général des impôts.";
const tvaId = vat.mode==="franchise" ? "TVA non applicable, article 293 B du CGI" : todo(co.vatNumber,"numéro de TVA intracommunautaire");

const T = {
mentions: { title:"Mentions légales", html:`
<h2>1. Éditeur du site</h2>
<dl><dt>Dénomination</dt><dd>${todo(co.name,"nom ou dénomination")}</dd><dt>Forme juridique</dt><dd>${todo(co.status,"ex : micro-entreprise, SASU, SAS")}</dd>
<dt>Capital social</dt><dd>${co.capital?esc(co.capital):"Sans objet (entreprise individuelle) ou "+todo("","montant du capital, si société")}</dd>
<dt>Adresse</dt><dd>${todo(co.address,"adresse du siège")}</dd><dt>SIRET</dt><dd>${todo(co.siret,"numéro SIRET")}</dd>
<dt>RCS / RM</dt><dd>${co.rcs?esc(co.rcs):"Si applicable : "+todo("","ville du RCS ou du répertoire des métiers")}</dd><dt>TVA</dt><dd>${tvaId}</dd>
<dt>Directeur de la publication</dt><dd>${todo(co.publisher,"nom du responsable de la publication")}</dd><dt>Contact</dt><dd>${todo(co.email,"e-mail")} · ${todo(co.phone,"téléphone")}${C.contact&&C.contact.instagram?` · <a href="${esc(C.contact.instagram)}" target="_blank" rel="noopener">${esc(C.contact.instagramHandle||"Instagram")}</a>`:""}</dd></dl>
<h2>2. Hébergement</h2>
<dl><dt>Hébergeur</dt><dd>${todo(ho.name,"nom de l'hébergeur")}</dd><dt>Adresse</dt><dd>${todo(ho.address,"adresse de l'hébergeur")}</dd><dt>Site</dt><dd>${todo(ho.website,"site de l'hébergeur")}</dd></dl>
<h2>3. Propriété intellectuelle</h2>
<p>L'ensemble des éléments du site (textes, logos, mises en page, illustrations, maquettes) est protégé par le droit de la propriété intellectuelle. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite. Les maquettes de démonstration présentées sont des exemples fictifs : les noms, adresses et prix qu'elles contiennent n'ont aucune valeur réelle.</p>
<h2>4. Données personnelles et cookies</h2>
<p>Le traitement des données personnelles est décrit dans la <a href="confidentialite.html">politique de confidentialité</a>. Ce site n'utilise aucun cookie de suivi ni outil de mesure d'audience.</p>
<h2>5. Médiation de la consommation</h2>
<p>Conformément au Code de la consommation, tout consommateur peut recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige.</p>
<dl><dt>Médiateur</dt><dd>${todo(me.name,"nom du médiateur de la consommation")}</dd><dt>Adresse</dt><dd>${todo(me.address,"adresse du médiateur")}</dd><dt>Site</dt><dd>${todo(me.website,"site du médiateur")}</dd></dl>
<h2>6. Crédits</h2>
<p>Les polices de caractères sont fournies par Google Fonts. Conception et réalisation : ${esc(brand)}.</p>
<h2>7. Droit applicable</h2><p>Le présent site est soumis au droit français.</p>`},

cgv: { title:"Conditions générales de vente", html:`
<h2>Article 1 — Objet et champ d'application</h2>
<p>Les présentes conditions générales de vente (CGV) régissent les prestations de création, de refonte et d'amélioration de sites internet proposées par ${todo(co.name||C.brand,"nom du prestataire")} (le « Prestataire ») à ses clients (le « Client »), professionnels ou consommateurs. Toute commande implique l'acceptation sans réserve des CGV.</p>
<h2>Article 2 — Prestations</h2>
<p>Les prestations, gammes et options sont décrites sur le site. Le contenu précis de chaque projet (pages, fonctionnalités, options) est confirmé au Client par devis ou récapitulatif de commande avant le démarrage des travaux. Les maquettes de démonstration présentées sur le site sont de simples exemples et ne constituent pas un engagement sur le rendu final.</p>
<h2>Article 3 — Commande</h2>
<p>La commande est passée via le formulaire du site, par message ou par devis. Elle n'est définitive qu'après confirmation du Prestataire et, le cas échéant, acceptation du devis par le Client${dep?` et paiement de l'acompte (article 5)`:""}.</p>
<h2>Article 4 — Prix et TVA</h2>
<p>${esc(tvaTxt)} Les prix des options et des prestations sur devis sont communiqués avant la commande. Les promotions et codes promotionnels s'appliquent dans les conditions indiquées lors de leur diffusion (dates de validité, gammes concernées, montant minimum de commande).</p>
<h2>Article 5 — Paiement</h2>
<p>${dep?`Un acompte de ${dep} % du montant total est exigible à la commande ; le solde est payable à la validation du site, avant sa mise en ligne.`:`Les conditions de paiement (acompte, solde) sont précisées sur le devis ou le récapitulatif de commande.`} Moyens de paiement acceptés : ${todo(cg.paymentMethods,"ex : virement bancaire, carte, PayPal")}.</p>
<p>Toute somme non payée à l'échéance entraîne de plein droit, pour les clients professionnels, des pénalités de retard égales à trois fois le taux d'intérêt légal, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 € (articles L.441-10 et D.441-5 du Code de commerce).</p>
<h2>Article 6 — Délais</h2>
<p>Le délai de livraison indicatif est de ${esc(delivery)}, à compter de la réception de l'acompte (le cas échéant) et de l'ensemble des éléments nécessaires fournis par le Client (textes, images, logo, accès). Ce délai peut varier selon la gamme, les options choisies et la réactivité du Client à ses demandes de validation ; il ne constitue pas un délai de rigueur sauf stipulation contraire écrite.</p>
<h2>Article 7 — Obligations du Client</h2>
<p>Le Client fournit des contenus exacts et dont il détient les droits (textes, photographies, logos, marques). Il garantit le Prestataire contre toute réclamation de tiers relative à ces contenus. Il valide les étapes du projet dans un délai raisonnable.</p>
<h2>Article 8 — Retouches et validation</h2>
<p>Les retouches incluses dépendent de la gamme choisie. Le site est mis en ligne après validation écrite (message, e-mail) du Client. Les demandes dépassant le périmètre convenu font l'objet d'un devis complémentaire.</p>
<h2>Article 9 — Propriété intellectuelle</h2>
<p>Après paiement intégral, le Prestataire cède au Client les droits d'exploitation du site livré, pour la France et pour la durée de protection légale. Les éléments préexistants du Prestataire (outils, bibliothèques, modèles) restent sa propriété. Sauf refus écrit du Client, le Prestataire peut mentionner la réalisation à titre de référence.</p>
<h2>Article 10 — Droit de rétractation (clients consommateurs)</h2>
<p>Lorsque le Client agit en tant que consommateur, il dispose d'un délai de 14 jours à compter de la conclusion du contrat pour se rétracter, sans motif. Toutefois, conformément à l'article L.221-28 du Code de la consommation, ce droit ne peut être exercé pour les prestations pleinement exécutées avant la fin du délai avec son accord préalable exprès, ni pour les contenus numériques fournis sur support immatériel dont l'exécution a commencé avec son accord. Si le Client demande un démarrage des travaux avant la fin du délai de 14 jours, il doit payer un montant proportionnel à la prestation déjà fournie. Les clients professionnels ne bénéficient pas d'un droit de rétractation, sauf dispositions légales contraires.</p>
<h2>Article 11 — Responsabilité et garanties</h2>
<p>Le Prestataire est tenu d'une obligation de moyens. Il n'est pas responsable des interruptions de services tiers (hébergement, nom de domaine, réseaux), ni des conséquences d'un contenu fourni par le Client. Sa responsabilité est limitée, sauf faute lourde ou dol, au montant payé pour la prestation concernée.</p>
<h2>Article 12 — Maintenance et support</h2>
<p>Le support et la maintenance sont ceux prévus par la gamme ou l'option choisie, pour la durée indiquée.</p>
<h2>Article 13 — Données personnelles</h2>
<p>Les données collectées sont traitées conformément à la <a href="confidentialite.html">politique de confidentialité</a>.</p>
<h2>Article 14 — Médiation et litiges</h2>
<p>Les CGV sont soumises au droit français. En cas de litige, le Client peut recourir à la médiation de la consommation : ${todo(me.name,"médiateur de la consommation")}, ${todo(me.address,"adresse du médiateur")}, ${todo(me.website,"site du médiateur")}. À défaut de solution amiable, les tribunaux compétents sont ceux du ressort de ${todo(cg.city,"ville du siège")} pour les litiges entre professionnels ; pour les consommateurs, les règles légales de compétence s'appliquent.</p>
${cg.extra?`<h2>Dispositions particulières</h2><p>${esc(cg.extra).replace(/\n/g,"<br>")}</p>`:""}`},

privacy: { title:"Politique de confidentialité", html:`
<h2>1. Qui est responsable de vos données ?</h2>
<p>Le responsable du traitement est ${todo(co.name||C.brand,"nom du prestataire")}, ${todo(co.address,"adresse")} — contact : ${todo(co.email,"e-mail")}.</p>
<h2>2. Quelles données collectons-nous ?</h2>
<p>Ce site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience. Le formulaire de commande n'envoie aucune donnée automatiquement : les informations que vous saisissez (nom, activité, moyen de contact, description du projet) restent sur votre appareil tant que vous ne choisissez pas de les envoyer vous-même, par message privé ou par e-mail. Nous ne recevons donc que les informations que vous nous transmettez volontairement.</p>
<h2>3. Pourquoi et sur quelle base ?</h2>
<ul><li>Répondre à vos demandes et établir un devis (mesures précontractuelles) ;</li><li>Exécuter le contrat et assurer le suivi du projet (exécution du contrat) ;</li><li>Établir les factures et respecter nos obligations comptables et fiscales (obligation légale).</li></ul>
<h2>4. Combien de temps ?</h2>
<p>Les données de prospection sont conservées au maximum 3 ans après le dernier contact. Les données de facturation sont conservées pendant les durées légales (jusqu'à 10 ans pour les pièces comptables).</p>
<h2>5. Qui y a accès ? Transferts hors Union européenne</h2>
<p>Vos données ne sont ni vendues ni cédées. Elles peuvent être traitées par nos prestataires techniques (hébergement du site, messagerie, Instagram/Meta si vous nous contactez par ce canal), qui peuvent être situés hors de l'Union européenne, avec les garanties prévues par le RGPD. Les polices de caractères sont chargées depuis les serveurs de Google Fonts : votre adresse IP peut être transmise à Google à cette occasion.</p>
<h2>6. Vos droits</h2>
<p>Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité de vos données. Pour les exercer : ${todo(co.email,"e-mail")}. Vous pouvez aussi introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>).</p>`}
};

const t = T[page] || T.mentions;
document.title = t.title + " — " + C.brand;
document.body.innerHTML = `<header class="lp-top"><div class="wrap"><a class="logo" href="index.html"><img src="${esc(C.logo||"")}" alt="" width="40" height="40"><b>${esc(C.brand)}</b></a><a href="index.html" class="btn btn-sm btn-ghost">← Retour au site</a></div></header>
<main class="lp"><h1>${esc(t.title)}</h1><p class="upd">Dernière mise à jour : ${esc(today)}</p>${t.html}</main>
<footer class="foot"><div class="wrap"><div class="fb"><strong>${esc(C.brand)}</strong></div><nav class="legal-nav" style="border:0;padding:0;width:auto"><a href="mentions-legales.html">Mentions légales</a><a href="cgv.html">CGV</a><a href="confidentialite.html">Confidentialité</a></nav></div></footer>`;
})();
