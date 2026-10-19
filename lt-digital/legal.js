/* Pages légales générées depuis config.js (legal, vat, order, delivery, contact).
   Les pages HTML contiennent déjà une copie « en dur » de ce texte (pour les moteurs de recherche et les agents IA) :
   après une modification de config.legal, relance  node tools/build-legal.js  pour la mettre à jour.
   Ces textes sont des modèles sérieux mais ne remplacent pas la relecture d'un professionnel du droit. */
(function(){
function build(C, page){
const L = C.legal||{}, co = L.company||{}, ho = L.hosting||{}, me = L.mediator||{}, cg = L.cgv||{}, ct = C.contact||{}, vat = Object.assign({mode:"ttc",rate:20}, C.vat||{});
const esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const todo = (v,label) => v ? esc(v) : `<mark class="todo">[à compléter : ${esc(label)}]</mark>`;
const brand = co.name || C.brand, today = L.updated || "";
const mail = co.email || ct.email || "";
const mailLink = mail ? `<a href="mailto:${esc(mail)}">${esc(mail)}</a>` : todo("", "e-mail");
const insta = ct.instagram ? `<a href="${esc(ct.instagram)}" target="_blank" rel="noopener">${esc(ct.instagramHandle||"Instagram")}</a>` : "";
const delivery = C.delivery || "48 à 72 h", dep = +((C.order||{}).depositPercent)||0;
const tvaTxt = vat.mode==="ttc" ? `Les prix sont indiqués en euros toutes taxes comprises (TVA au taux de ${vat.rate} % incluse).` : vat.mode==="ht" ? `Les prix sont indiqués en euros hors taxes ; la TVA au taux de ${vat.rate} % est ajoutée au montant facturé.` : "Les prix sont indiqués en euros, nets de taxe : TVA non applicable, article 293 B du Code général des impôts.";
const tvaId = vat.mode==="franchise" ? "TVA non applicable, article 293 B du CGI" : todo(co.vatNumber,"numéro de TVA intracommunautaire");
const who = `${esc(brand)} (voir les <a href="mentions-legales.html">mentions légales</a>)`;
const medBlock = `<dl><dt>Médiateur</dt><dd>${todo(me.name,"nom du médiateur de la consommation")}</dd><dt>Adresse</dt><dd>${todo(me.address,"adresse du médiateur")}</dd><dt>Site internet</dt><dd>${me.website?`<a href="${esc(me.website)}" target="_blank" rel="noopener">${esc(me.website)}</a>`:todo("","site du médiateur")}</dd></dl>`;

const T = {
/* ------------------------------------------------------------------ MENTIONS LÉGALES */
mentions: { title:"Mentions légales", html:`
<p>Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici les informations sur l'éditeur et l'hébergeur de ce site.</p>
<h2>1. Éditeur du site</h2>
<dl><dt>Nom commercial</dt><dd>${esc(brand)}</dd>
<dt>Entrepreneur</dt><dd>${todo(co.publisher,"prénom et nom de l'entrepreneur")}</dd>
<dt>Statut</dt><dd>${todo(co.status,"ex : entrepreneur individuel (micro-entreprise)")}</dd>
${co.capital?`<dt>Capital social</dt><dd>${esc(co.capital)}</dd>`:""}
<dt>Adresse</dt><dd>${todo(co.address,"adresse de l'entreprise")}</dd>
<dt>SIRET</dt><dd>${todo(co.siret,"numéro SIRET")}</dd>
<dt>Immatriculation</dt><dd>${co.rcs?esc(co.rcs):"Registre national des entreprises (RNE) — "+todo("","numéro d'immatriculation, identique au SIREN")}</dd>
<dt>TVA</dt><dd>${tvaId}</dd>
<dt>E-mail</dt><dd>${mailLink}</dd>
<dt>Téléphone</dt><dd>${todo(co.phone,"numéro de téléphone")}</dd>
${insta?`<dt>Instagram</dt><dd>${insta}</dd>`:""}</dl>
<h2>2. Directeur de la publication</h2>
<p>${todo(co.publisher,"prénom et nom du directeur de la publication")}</p>
<h2>3. Hébergeur</h2>
<dl><dt>Nom</dt><dd>${todo(ho.name,"nom de l'hébergeur")}</dd><dt>Adresse</dt><dd>${todo(ho.address,"adresse de l'hébergeur")}</dd>
<dt>Site internet</dt><dd>${ho.website?`<a href="${esc(ho.website)}" target="_blank" rel="noopener">${esc(ho.website)}</a>`:todo("","site de l'hébergeur")}</dd>
<dt>Téléphone</dt><dd>${todo(ho.phone,"téléphone de l'hébergeur")}</dd></dl>
<h2>4. Propriété intellectuelle</h2>
<p>Les textes, logos, mises en page, illustrations, vidéos, musiques et maquettes de ce site sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite. Les maquettes de démonstration sont des exemples fictifs : les noms, adresses, horaires et prix qu'elles contiennent ne correspondent à aucune entreprise réelle.</p>
<h2>5. Données personnelles et cookies</h2>
<p>Ce site ne dépose aucun cookie chez ses visiteurs et n'utilise aucun outil de mesure d'audience ni de publicité. Le traitement des données personnelles est détaillé dans la <a href="confidentialite.html">politique de confidentialité</a> et la <a href="cookies.html">politique de cookies</a>.</p>
<h2>6. Médiation de la consommation</h2>
<p>Conformément aux articles L.612-1 et suivants du Code de la consommation, tout consommateur peut recourir gratuitement au médiateur de la consommation ci-dessous, après avoir d'abord adressé une réclamation écrite à ${esc(brand)}.</p>
${medBlock}
<h2>7. Crédits</h2>
<p>Conception, réalisation, vidéos et musiques : ${esc(brand)}. Polices de caractères libres (licence SIL Open Font License), hébergées directement sur ce site.</p>
<h2>8. Droit applicable</h2>
<p>Ce site et ses mentions sont soumis au droit français.</p>`},

/* ------------------------------------------------------------------ CGU */
cgu: { title:"Conditions générales d'utilisation", html:`
<p>Les présentes conditions générales d'utilisation (CGU) encadrent l'utilisation du site ${esc(brand)}. En naviguant sur le site, tu acceptes ces conditions. Les commandes de prestations sont régies par les <a href="cgv.html">conditions générales de vente</a>.</p>
<h2>1. Éditeur</h2>
<p>Le site est édité par ${who}. Contact : ${mailLink}.</p>
<h2>2. Accès au site</h2>
<p>Le site est accessible gratuitement, sans inscription. Nous faisons notre possible pour qu'il reste disponible, mais nous ne pouvons pas garantir l'absence d'interruptions (maintenance, panne, problème chez l'hébergeur ou le fournisseur d'accès).</p>
<h2>3. Contenu du site</h2>
<ul><li>Les informations sur nos prestations et nos prix sont données à titre indicatif ; le contenu exact et le prix d'une commande sont confirmés par écrit avant tout démarrage.</li>
<li>Les maquettes de démonstration sont des exemples fictifs : les noms, adresses, horaires et prix qu'elles affichent n'ont aucune valeur réelle.</li>
<li>Le « simulateur » de commande calcule un montant indicatif à partir de tes choix ; il ne vaut pas commande tant que nous ne l'avons pas confirmé.</li></ul>
<h2>4. Utilisation autorisée</h2>
<p>Tu t'engages à utiliser le site de façon loyale : pas d'usage contraire à la loi, pas de tentative de nuire à son fonctionnement ou à sa sécurité, pas de copie de ses contenus pour les revendre ou les publier comme les tiens. Les moteurs de recherche et les assistants ou agents d'intelligence artificielle peuvent consulter les pages publiques dans le respect du fichier <a href="robots.txt">robots.txt</a> ; un résumé lisible par les machines est disponible dans <a href="llms.txt">llms.txt</a>. L'espace d'administration est réservé à l'éditeur.</p>
<h2>5. Propriété intellectuelle</h2>
<p>Tous les contenus du site (textes, visuels, logos, vidéos, musiques, maquettes, code) appartiennent à ${esc(brand)} ou sont utilisés avec autorisation. Toute reproduction sans accord écrit préalable est interdite. Les logos présentés dans la galerie sont des créations réalisées par ${esc(brand)}.</p>
<h2>6. Liens vers d'autres sites</h2>
<p>Le site contient des liens vers des services tiers (Instagram, Google Maps dans les maquettes, messagerie). Ces services ne sont ouverts que si tu cliques dessus et ont leurs propres conditions et politiques de confidentialité, dont nous ne sommes pas responsables.</p>
<h2>7. Avis clients</h2>
<p>Les avis publiés sur le site proviennent uniquement de clients ayant réellement commandé une prestation. Ils sont publiés avec l'accord de leur auteur, avec leur date, sans contrepartie, qu'ils soient positifs ou négatifs. Nous pouvons refuser un avis injurieux, hors sujet ou contenant des données personnelles de tiers. L'auteur peut demander le retrait de son avis à tout moment.</p>
<h2>8. Responsabilité</h2>
<p>Nous veillons à l'exactitude des informations publiées, sans pouvoir garantir l'absence de toute erreur. Si tu en repères une, écris-nous : nous la corrigerons rapidement.</p>
<h2>9. Données personnelles et cookies</h2>
<p>Voir la <a href="confidentialite.html">politique de confidentialité</a> et la <a href="cookies.html">politique de cookies</a>.</p>
<h2>10. Modification des CGU</h2>
<p>Nous pouvons faire évoluer ces CGU ; la version applicable est celle en ligne au moment de ta visite, avec sa date de mise à jour.</p>
<h2>11. Droit applicable</h2>
<p>Les présentes CGU sont soumises au droit français.</p>`},

/* ------------------------------------------------------------------ CGV */
cgv: { title:"Conditions générales de vente", html:`
<h2>Article 1 — Prestataire</h2>
<p>Les prestations sont réalisées par ${who}, joignable à ${mailLink}${insta?` et sur Instagram (${insta})`:""}.</p>
<h2>Article 2 — Champ d'application</h2>
<p>Les présentes conditions générales de vente (CGV) s'appliquent à toutes les prestations proposées sur le site : création et refonte de sites internet et leurs options, logos et identité visuelle, publicités vidéo et visuels animés, affiches et supports imprimés, photographies, gestion et accompagnement sur les réseaux sociaux. Elles s'appliquent aux clients consommateurs (particuliers) comme aux clients professionnels (le « Client »). Toute commande implique leur acceptation ; les CGV applicables sont celles en vigueur au jour de la commande.</p>
<h2>Article 3 — Commande et conclusion du contrat</h2>
<p>Le Client compose sa demande sur le site et nous la transmet (message, e-mail). Le Prestataire lui envoie ensuite par écrit un récapitulatif ou un devis précisant le contenu, le prix, le délai et les conditions de paiement. Le contrat est conclu lorsque le Client accepte ce récapitulatif ou ce devis par écrit et que le Prestataire confirme la commande. Le montant affiché par le simulateur du site est indicatif tant qu'il n'a pas été confirmé.</p>
<h2>Article 4 — Prix</h2>
<p>${esc(tvaTxt)} Les prix « à partir de » ou « sur devis » sont fixés avant la commande. Les frais payés à des tiers (budget publicitaire sur les réseaux, impression, nom de domaine, abonnements de services externes) sont indiqués et validés avec le Client avant d'être engagés. Les codes promotionnels s'appliquent selon les conditions indiquées lors de leur diffusion (durée, prestations concernées, montant minimum).</p>
<h2>Article 5 — Paiement</h2>
<p>${dep?`Un acompte de ${dep} % du prix est payable à la commande ; le solde est payable à la validation de la prestation, avant la mise en ligne ou la remise des fichiers définitifs.`:`Les modalités de paiement (acompte, solde) sont précisées sur le récapitulatif ou le devis.`} Les abonnements mensuels sont payables d'avance, au début de chaque mois. Moyens de paiement acceptés : ${todo(cg.paymentMethods,"ex : virement bancaire, carte bancaire")}. Une facture est remise pour chaque paiement.</p>
<p>En cas de retard de paiement, le Prestataire peut suspendre la prestation. Pour les clients professionnels, toute somme non payée à l'échéance entraîne de plein droit des pénalités de retard égales à trois fois le taux d'intérêt légal et une indemnité forfaitaire pour frais de recouvrement de 40 € (articles L.441-10 et D.441-5 du Code de commerce). Pour les clients consommateurs, les sommes dues portent intérêt au taux légal après mise en demeure.</p>
<h2>Article 6 — Délais et livraison</h2>
<p>Le délai indicatif de réalisation d'un site est de ${esc(delivery)} ; il court à partir de la réception de l'acompte et de tous les éléments nécessaires (textes, images, logo, accès). Les délais des autres prestations sont indiqués sur le récapitulatif ou le devis. La livraison correspond à la mise en ligne du site ou à la remise des fichiers (logo, vidéo, visuels…). En cas de retard important, le Client consommateur dispose des droits prévus aux articles L.216-1 et suivants du Code de la consommation.</p>
<h2>Article 7 — Obligations du Client</h2>
<p>Le Client fournit des contenus exacts et dont il détient les droits (textes, photos, logos, marques, musiques). Il garantit le Prestataire contre toute réclamation de tiers à leur sujet. Il répond aux demandes de validation dans un délai raisonnable.</p>
<h2>Article 8 — Retouches et validation</h2>
<p>Le nombre de retouches incluses dépend de la prestation choisie. La prestation est livrée après validation écrite (message ou e-mail) du Client. Les demandes qui dépassent ce qui a été convenu font l'objet d'un devis complémentaire.</p>
<h2>Article 9 — Abonnements mensuels</h2>
<p>Les prestations vendues « au mois » (gestion des réseaux sociaux, maintenance…) sont conclues pour un mois et se renouvellent chaque mois. Le Client peut les résilier à tout moment, simplement, par e-mail ou par message : la résiliation prend effet à la fin du mois en cours, et le mois commencé reste dû. Voir aussi la page <a href="retractation.html">rétractation, remboursement et résiliation</a>.</p>
<h2>Article 10 — Propriété intellectuelle</h2>
<p>Après paiement intégral, le Prestataire cède au Client, à titre exclusif pour les créations faites sur mesure, les droits de reproduction, de représentation et d'adaptation des livrables (site, logo, vidéos, musiques originales, visuels), pour tous supports, pour le monde entier et pour toute la durée de protection légale, afin de les exploiter pour son activité. Les outils, modèles et éléments préexistants du Prestataire restent sa propriété. Sauf refus écrit du Client, le Prestataire peut présenter la réalisation comme référence.</p>
<h2>Article 11 — Droit de rétractation (clients consommateurs)</h2>
<p>Le Client consommateur dispose d'un délai de 14 jours pour se rétracter, sans avoir à se justifier, à compter de la conclusion du contrat (ou de la réception pour un bien livré, comme des supports imprimés). S'il demande expressément que la prestation commence avant la fin de ce délai et se rétracte ensuite, il paie un montant proportionnel à ce qui a été fourni (article L.221-25 du Code de la consommation). Le droit de rétractation ne peut plus être exercé pour une prestation pleinement exécutée avant la fin du délai, lorsque l'exécution a commencé après son accord préalable exprès et sa reconnaissance qu'il perdrait ce droit, ni pour les biens confectionnés selon ses spécifications ou nettement personnalisés (article L.221-28 du même code). Conditions complètes, remboursement et formulaire type : page <a href="retractation.html">Rétractation et remboursement</a>. Les clients professionnels ne bénéficient pas du droit de rétractation, sauf disposition légale contraire.</p>
<h2>Article 12 — Garanties légales (clients consommateurs)</h2>
<p>Le Client consommateur bénéficie de la garantie légale de conformité des contenus et services numériques (articles L.224-25-12 et suivants du Code de la consommation), de la garantie légale de conformité des biens pour les supports imprimés (articles L.217-3 et suivants du même code) et de la garantie des vices cachés (articles 1641 et suivants du Code civil). Pour la mettre en œuvre, il suffit de nous écrire à ${mailLink} en décrivant le problème.</p>
<h2>Article 13 — Responsabilité</h2>
<p>Le Prestataire est tenu d'une obligation de moyens. Il n'est pas responsable des interruptions de services tiers (hébergement, nom de domaine, réseaux sociaux, plateformes de paiement) ni des conséquences d'un contenu fourni par le Client. Pour les clients professionnels, sa responsabilité est limitée, sauf faute lourde ou dolosive, au montant payé pour la prestation concernée. Pour les clients consommateurs, la responsabilité du Prestataire s'apprécie selon les règles légales.</p>
<h2>Article 14 — Force majeure</h2>
<p>Aucune des parties n'est responsable d'un manquement causé par un cas de force majeure au sens de l'article 1218 du Code civil.</p>
<h2>Article 15 — Données personnelles</h2>
<p>Les données nécessaires à la commande sont traitées conformément à la <a href="confidentialite.html">politique de confidentialité</a>.</p>
<h2>Article 16 — Réclamations et médiation de la consommation</h2>
<p>Toute réclamation peut être adressée à ${mailLink}. Si le litige n'est pas résolu, le Client consommateur peut recourir gratuitement au médiateur de la consommation suivant, dans un délai d'un an à compter de sa réclamation écrite (articles L.612-1 et suivants du Code de la consommation) :</p>
${medBlock}
<h2>Article 17 — Droit applicable et litiges</h2>
<p>Les présentes CGV sont soumises au droit français. À défaut d'accord amiable, les litiges avec un client professionnel relèvent des tribunaux du ressort de ${todo(cg.city,"ville du siège de l'entreprise")} ; pour un client consommateur, les règles légales de compétence s'appliquent.</p>
${cg.extra?`<h2>Dispositions particulières</h2><p>${esc(cg.extra).replace(/\n/g,"<br>")}</p>`:""}`},

/* ------------------------------------------------------------------ RÉTRACTATION / REMBOURSEMENT */
retractation: { title:"Rétractation, remboursement et résiliation", html:`
<p>Cette page explique simplement tes droits si tu changes d'avis, comment obtenir un remboursement et comment arrêter un abonnement.</p>
<h2>1. Qui a droit à la rétractation ?</h2>
<p>Le droit de rétractation est réservé aux <b>particuliers (consommateurs)</b> qui commandent à distance (articles L.221-18 et suivants du Code de la consommation). Les professionnels qui commandent pour leur activité n'en bénéficient pas, sauf cas prévus par la loi.</p>
<h2>2. Combien de temps ?</h2>
<p><b>14 jours</b> à compter de la conclusion du contrat (confirmation écrite de la commande) pour une prestation de service, ou à compter de la réception pour un bien livré (par exemple des affiches imprimées). Tu n'as pas à te justifier ni à payer de pénalité.</p>
<h2>3. Comment faire ?</h2>
<p>Envoie-nous une déclaration claire (par exemple « Je me rétracte de ma commande du … ») par e-mail à ${mailLink}${insta?` ou par message Instagram (${insta})`:""}, avant la fin du délai. Tu peux aussi utiliser le formulaire type ci-dessous, mais ce n'est pas obligatoire. Nous confirmons la réception sans attendre.</p>
<h2>4. Si la prestation a déjà commencé</h2>
<ul><li>Si tu nous as demandé expressément de commencer avant la fin des 14 jours (case prévue dans le formulaire de commande) puis que tu te rétractes, tu paies seulement la partie déjà réalisée, en proportion du prix total (article L.221-25).</li>
<li>Une fois la prestation <b>entièrement réalisée</b> avant la fin du délai, avec ton accord exprès et ta reconnaissance de la perte de ce droit, tu ne peux plus te rétracter (article L.221-28, 1°).</li>
<li>Le droit de rétractation ne s'applique pas non plus aux biens fabriqués selon tes demandes ou nettement personnalisés (cartes de visite, affiches à ton nom…) une fois commandés (article L.221-28, 3°).</li></ul>
<h2>5. Remboursement</h2>
<p>En cas de rétractation, nous te remboursons toutes les sommes versées (sauf la part due au point 4) <b>au plus tard 14 jours</b> après avoir reçu ta décision (article L.221-24), par le même moyen de paiement que celui utilisé, sauf accord différent de ta part, et sans frais. Pour un bien livré, le remboursement peut attendre que nous l'ayons récupéré ; les frais de retour restent à ta charge.</p>
<h2>6. En dehors du droit de rétractation</h2>
<ul><li>Si nous ne pouvons pas réaliser une prestation, nous te remboursons intégralement les sommes versées pour ce qui n'a pas été fait.</li>
<li>Si tu annules une commande après le délai de rétractation (ou si tu es un professionnel), le travail déjà réalisé reste dû ; le reste des sommes versées t'est remboursé.</li>
<li>En cas de problème de conformité, tu bénéficies des garanties légales (voir l'article 12 des <a href="cgv.html">CGV</a>).</li></ul>
<h2>7. Résilier un abonnement mensuel</h2>
<p>Les abonnements (gestion des réseaux sociaux, maintenance…) se résilient à tout moment, sans motif : la résiliation prend effet à la fin du mois en cours et le mois commencé reste dû.</p>
<p>${mail?`<a class="btn" href="mailto:${esc(mail)}?subject=${encodeURIComponent("Résiliation de mon abonnement")}&amp;body=${encodeURIComponent("Bonjour,\n\nJe souhaite résilier mon abonnement.\nNom :\nAbonnement concerné :\n\nMerci.")}">Résilier mon abonnement par e-mail</a>`:todo("","e-mail de contact")}</p>
<h2>8. Formulaire type de rétractation</h2>
<p>(Annexe à l'article R.221-1 du Code de la consommation — à compléter et renvoyer uniquement si tu souhaites te rétracter du contrat.)</p>
<div class="formtype">
<p>À l'attention de ${esc(brand)}, ${todo(co.address,"adresse de l'entreprise")}, ${mail?esc(mail):todo("","e-mail")} :</p>
<p>Je/Nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat portant sur la vente du bien (*) / pour la prestation de services (*) ci-dessous :</p>
<p>Commandé le (*) / reçu le (*) : ………………………………</p>
<p>Nom du (des) consommateur(s) : ………………………………</p>
<p>Adresse du (des) consommateur(s) : ………………………………</p>
<p>Signature du (des) consommateur(s) (uniquement en cas de notification du présent formulaire sur papier) : ………………</p>
<p>Date : ………………</p>
<p>(*) Rayez la mention inutile.</p>
</div>`},

/* ------------------------------------------------------------------ CONFIDENTIALITÉ */
privacy: { title:"Politique de confidentialité", html:`
<p>Nous collectons <b>le moins de données possible</b> : uniquement ce qui sert à te répondre, à réaliser ta commande et à respecter la loi. Cette politique respecte le Règlement général sur la protection des données (RGPD) et la loi Informatique et Libertés.</p>
<h2>1. Responsable du traitement</h2>
<p>${who}, ${todo(co.address,"adresse")}. Contact pour toute question sur tes données : ${mailLink}.</p>
<h2>2. Ce que nous collectons, pourquoi, et combien de temps</h2>
<div class="tbl"><table>
<thead><tr><th scope="col">Situation</th><th scope="col">Données</th><th scope="col">Pourquoi (base légale)</th><th scope="col">Durée de conservation</th></tr></thead>
<tbody>
<tr><td>Simple visite du site</td><td>Aucune donnée collectée par nous. L'hébergeur enregistre techniquement l'adresse IP, la date, la page demandée et le navigateur (journaux de connexion).</td><td>Sécurité et bon fonctionnement du site (intérêt légitime)</td><td>Durée courte fixée par l'hébergeur pour ses journaux techniques</td></tr>
<tr><td>Formulaire de commande</td><td>Rien n'est envoyé automatiquement : les informations restent dans ton navigateur jusqu'à ce que tu nous les transmettes toi-même (copier-coller, Instagram ou e-mail).</td><td>—</td><td>Rien n'est conservé par le site</td></tr>
<tr><td>Quand tu nous contactes ou commandes</td><td>Nom, moyen de contact (e-mail ou compte Instagram), nom de l'activité (facultatif), description du projet (facultative), contenu des échanges</td><td>Répondre et établir un devis (mesures précontractuelles), exécuter la commande (contrat)</td><td>3 ans après le dernier contact si aucune commande ; durée du contrat puis 5 ans (prescription) si commande</td></tr>
<tr><td>Facturation</td><td>Nom, adresse, montant, prestations</td><td>Obligations comptables et fiscales (obligation légale)</td><td>10 ans (article L.123-22 du Code de commerce)</td></tr>
<tr><td>Avis client</td><td>Nom, activité, note, avis, éventuellement logo et lien du site</td><td>Ton consentement, donné dans le formulaire d'avis</td><td>Jusqu'au retrait de ton consentement</td></tr>
</tbody></table></div>
<p>Nous ne vendons, ne louons et ne cédons jamais tes données. Nous ne faisons ni profilage ni décision automatisée, et nous n'utilisons pas tes données à des fins de publicité.</p>
<h2>3. Qui peut y accéder ?</h2>
<ul><li>Uniquement l'équipe de ${esc(brand)}.</li>
<li>Nos prestataires techniques, qui agissent pour notre compte : l'hébergeur du site (${esc(ho.name||"voir les mentions légales")}) et, selon le canal que tu choisis pour nous écrire, la messagerie e-mail (Google, pour Gmail) ou Instagram (Meta).</li>
<li>Les autorités, uniquement si la loi l'exige.</li></ul>
<h2>4. Transferts hors de l'Union européenne</h2>
<p>Certains de ces prestataires sont situés aux États-Unis. Les transferts sont encadrés par les garanties prévues par le RGPD (décision d'adéquation « Data Privacy Framework » pour les entreprises certifiées et/ou clauses contractuelles types de la Commission européenne).</p>
<h2>5. Aucun traceur, aucune publicité</h2>
<p>Le site ne dépose aucun cookie chez ses visiteurs, n'utilise aucun outil de mesure d'audience, aucune publicité et aucun bouton de réseau social intégré. Les polices et les vidéos sont hébergées directement sur le site : ta visite ne déclenche aucun envoi de données vers Google ou d'autres sociétés. Détails : <a href="cookies.html">politique de cookies</a>.</p>
<h2>6. Sécurité</h2>
<p>Le site est servi en HTTPS (connexion chiffrée). L'espace d'administration est protégé par mot de passe. Nous limitons l'accès à tes données aux seules personnes qui en ont besoin.</p>
<h2>7. Tes droits</h2>
<p>Tu peux à tout moment accéder à tes données, les faire corriger ou supprimer, limiter leur utilisation, t'opposer à leur traitement, demander leur portabilité, retirer ton consentement (pour un avis publié) et définir des directives sur leur sort après ton décès. Écris-nous à ${mailLink} : nous répondons dans un délai d'un mois maximum. Si tu estimes que tes droits ne sont pas respectés, tu peux adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>).</p>
<h2>8. Mineurs</h2>
<p>Nos prestations s'adressent aux entreprises et aux adultes. Si tu as moins de 15 ans, demande à un parent avant de nous transmettre des informations.</p>
<h2>9. Modifications</h2>
<p>Nous mettons à jour cette politique si nos pratiques changent ; la date de mise à jour figure en haut de la page.</p>`},

/* ------------------------------------------------------------------ COOKIES */
cookies: { title:"Politique de cookies", html:`
<h2>En résumé</h2>
<p><b>Ce site ne dépose aucun cookie et n'enregistre rien dans ton navigateur</b> quand tu le visites. Il n'utilise ni mesure d'audience, ni publicité, ni bouton de partage de réseau social, ni contenu intégré d'un autre site. C'est pour cela qu'aucun bandeau de consentement ne s'affiche : il n'y a rien à accepter ni à refuser.</p>
<h2>Ce que nous avons vérifié</h2>
<div class="tbl"><table>
<thead><tr><th scope="col">Élément</th><th scope="col">Utilisé ?</th><th scope="col">Détail</th></tr></thead>
<tbody>
<tr><td>Cookies déposés chez les visiteurs</td><td>Non</td><td>Aucun cookie</td></tr>
<tr><td>Stockage dans le navigateur (localStorage, sessionStorage)</td><td>Non</td><td>Rien n'est enregistré pour les visiteurs</td></tr>
<tr><td>Mesure d'audience (Google Analytics, etc.)</td><td>Non</td><td>Aucun outil installé</td></tr>
<tr><td>Publicité, pixels (Meta, TikTok…)</td><td>Non</td><td>Aucun</td></tr>
<tr><td>Polices de caractères</td><td>Oui</td><td>Hébergées sur notre site : aucune connexion à Google Fonts</td></tr>
<tr><td>Vidéos</td><td>Oui</td><td>Hébergées sur notre site : pas de lecteur YouTube ou autre</td></tr>
<tr><td>Liens Instagram, Google Maps, e-mail</td><td>Liens simples</td><td>Rien n'est chargé tant que tu ne cliques pas ; le site ouvert a alors ses propres règles</td></tr>
</tbody></table></div>
<h2>Espace d'administration (éditeur uniquement)</h2>
<p>Quand l'éditeur du site se connecte à son espace d'administration, un cookie de session nommé <code>ltd_admin</code> est déposé pour le garder connecté (durée : 8 heures), et l'aperçu de ses modifications est gardé dans son navigateur. Ces éléments ne concernent jamais les visiteurs et sont strictement nécessaires au service demandé (authentification) : ils sont exemptés de consentement (article 82 de la loi Informatique et Libertés et lignes directrices de la CNIL).</p>
<h2>Si cela change</h2>
<p>Si nous ajoutons un jour un outil de mesure d'audience ou un contenu tiers soumis à consentement, nous mettrons à jour cette page et nous te demanderons ton accord avant tout dépôt, avec un bouton « Tout refuser » aussi visible que « Tout accepter ».</p>
<h2>Contrôler les cookies dans ton navigateur</h2>
<p>Tous les navigateurs permettent de voir et de supprimer les cookies dans leurs réglages (rubrique « Confidentialité »). La CNIL explique comment faire sur <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/comment-se-proteger/maitriser-votre-navigateur" target="_blank" rel="noopener">cnil.fr</a>.</p>`}
};

const P = { mentions:"mentions-legales.html", cgv:"cgv.html", cgu:"cgu.html", privacy:"confidentialite.html", cookies:"cookies.html", retractation:"retractation.html" };
const t = T[page] || T.mentions;
const nav = [["mentions","Mentions légales"],["cgv","CGV"],["cgu","CGU"],["privacy","Confidentialité"],["cookies","Cookies"],["retractation","Rétractation"]]
  .map(([k,l])=>`<a href="${P[k]}"${k===page?' aria-current="page"':""}>${l}</a>`).join("");
const body = `<a class="skip" href="#contenu">Aller au contenu</a>
<header class="lp-top"><div class="wrap"><a class="logo" href="index.html"><img src="${esc(C.logo||"")}" alt="" width="40" height="40"><b>${esc(C.brand)}</b></a><a href="index.html" class="btn btn-sm btn-ghost">← Retour au site</a></div></header>
<main class="lp" id="contenu"><h1>${esc(t.title)}</h1>${today?`<p class="upd">Dernière mise à jour : ${esc(today)}</p>`:""}${t.html}</main>
<footer class="foot"><div class="wrap"><div class="fb"><strong>${esc(C.brand)}</strong></div><nav class="legal-nav" aria-label="Pages légales" style="border:0;padding:0;width:auto">${nav}</nav></div></footer>`;
/* typographie française : espaces insécables avant ? ! : ; » et après « (dans le texte seulement, pas dans les balises) */
const nb = h => h.replace(/>([^<]+)</g, (m, x) => ">" + x.replace(/ ([?!:;»])/g, "\u00a0$1").replace(/« /g, "«\u00a0") + "<");
return { title: t.title + " — " + C.brand, body: nb(body) };
}

if (typeof module !== "undefined" && module.exports) { module.exports = build; return; }
const C = window.SITE_CONFIG, r = build(C, document.body.dataset.page);
const s = document.documentElement.style; s.setProperty("--accent", C.accent); s.setProperty("--accent2", C.accent2||C.accent);
document.title = r.title; document.body.innerHTML = r.body;
})();
