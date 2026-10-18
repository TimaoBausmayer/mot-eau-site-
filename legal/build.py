#!/usr/bin/env python3
"""Génère les pages légales statiques du site Mot'eau à partir de legal/info.json.
Usage : python3 legal/build.py   (depuis la racine du dépôt)"""
import json, html, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INFO = json.load(open(os.path.join(ROOT, 'legal', 'info.json'), encoding='utf-8'))
def v(k):
    t = html.escape(INFO[k]); return f'<mark class="todo">{t}</mark>' if 'À COMPLÉTER' in t else t
CSS = """
:root{--black:#0a0a09;--surface:#141311;--line:#4a443c;--orange:#ff5a1f;--cream:#f4efe6;--grey:#b3ada1}
@font-face{font-family:'Anton';src:url('/fonts/Anton.ttf') format('truetype');font-display:swap}
@font-face{font-family:'Space Grotesk';src:url('/fonts/SpaceGrotesk.ttf') format('truetype');font-weight:300 700;font-display:swap}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--black);color:var(--cream);font-family:'Space Grotesk',system-ui,sans-serif;line-height:1.65;font-size:17px}
a{color:var(--orange);text-underline-offset:3px}a:hover{color:var(--cream)}
.skip{position:absolute;left:12px;top:-60px;background:var(--orange);color:#0a0a09;padding:10px 16px;font-weight:700;z-index:9}.skip:focus{top:12px}
header{border-bottom:1px solid var(--line);padding:16px 24px;display:flex;gap:20px;align-items:center;flex-wrap:wrap}
header .logo{font-family:'Anton',sans-serif;font-size:1.6rem;letter-spacing:.02em;color:var(--cream);text-decoration:none}header .logo span{color:var(--orange)}
header a.back{margin-left:auto}
main{max-width:820px;margin:0 auto;padding:36px 24px 70px}
h1{font-family:'Anton',sans-serif;font-weight:400;text-transform:uppercase;font-size:2.4rem;line-height:1.05;margin:0 0 8px}
h2{font-size:1.25rem;margin:2.2em 0 .5em;color:var(--orange)}h3{font-size:1.05rem;margin:1.5em 0 .3em}
p,li{color:var(--cream)}.muted{color:var(--grey);font-size:.92rem}
ul{padding-left:1.2em}li{margin:.3em 0}
table{width:100%;border-collapse:collapse;margin:1em 0;font-size:.93rem}th,td{border:1px solid var(--line);padding:9px 11px;text-align:left;vertical-align:top}th{background:var(--surface)}
.todo{background:#ffe08a;color:#2a1c00;padding:0 4px;border-radius:3px}
.box{border:1px solid var(--line);background:var(--surface);padding:16px 18px;margin:1.2em 0;border-radius:6px}
footer{border-top:1px solid var(--line);padding:22px 24px;text-align:center;font-size:.9rem}footer a{margin:0 9px;white-space:nowrap}
@media (max-width:600px){body{font-size:16px}h1{font-size:1.9rem}table{display:block;overflow-x:auto}}
@media print{body{background:#fff;color:#000}a{color:#000}.todo{background:none}header,footer,.skip{display:none}}
"""
PAGES = [('mentions-legales','Mentions légales'),('confidentialite','Politique de confidentialité'),('cgu',"Conditions d'utilisation"),('cgv','Conditions de vente'),('remboursement','Remboursement et rétractation'),('cookies','Cookies et stockage local')]
def page(slug, title, body, desc):
    nav = ''.join(f'<a href="/{s}.html">{t}</a>' for s,t in PAGES)
    return f"""<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Mot'eau</title><meta name="description" content="{html.escape(desc)}">
<link rel="canonical" href="https://moteau.vercel.app/{slug}.html"><meta name="robots" content="index, follow">
<link rel="icon" type="image/png" href="/icon-192.png"><meta name="theme-color" content="#0a0a09">
<link rel="preload" href="/fonts/SpaceGrotesk.ttf" as="font" type="font/ttf" crossorigin>
<style>{CSS}</style></head><body>
<a class="skip" href="#contenu">Aller au contenu</a>
<header><a class="logo" href="/" aria-label="Mot'eau — retour à l'accueil">MOT<span>'</span>EAU</a><a class="back" href="/">← Retour au site</a></header>
<main id="contenu"><h1>{title}</h1><p class="muted">Dernière mise à jour : {v('maj')}</p>
{body}
</main>
<footer><nav aria-label="Informations légales">{nav}</nav></footer></body></html>"""

ED = f"""<p><strong>{v('editeur')}</strong><br>Statut : {v('statut')}<br>Identifiant : {v('siren')}<br>Adresse : {v('adresse')}<br>E-mail : {v('email')}<br>Téléphone : {v('tel')}</p>"""
INTRO_TODO = '<div class="box"><strong>Information pour l\'éditeur du site :</strong> les passages surlignés en jaune doivent être remplis dans <code>legal/info.json</code> avant la publication définitive ; ils disparaissent ensuite automatiquement.</div>' if any('À COMPLÉTER' in x for x in INFO.values()) else ''

mentions = f"""{INTRO_TODO}
<h2>Éditeur du site</h2>{ED}
<p>Directeur ou directrice de la publication : {v('directeur')}</p>
<p>TVA non applicable, article 293 B du Code général des impôts (franchise en base).</p>
<h2>Hébergement</h2>
<p><strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — <a href="https://vercel.com">vercel.com</a>. Les fonctions du site s'exécutent dans la région de Paris.</p>
<p>La base de données et la connexion aux comptes utilisent <strong>Google Firebase</strong> (Realtime Database et Authentication). Les données sont stockées dans l'Union européenne (Belgique, région europe-west1).</p>
<h2>Paiement</h2>
<p>Les paiements en ligne sont réalisés sur les pages sécurisées de <strong>Stripe Payments Europe, Ltd.</strong> (1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Irlande). Le site ne voit ni ne conserve vos données de carte bancaire.</p>
<h2>Propriété intellectuelle</h2>
<p>Le nom, le logo, les textes, photos et vidéos du site appartiennent à l'éditeur ou sont utilisés avec l'accord de leurs auteurs. Toute reproduction sans autorisation est interdite. Polices de caractères Anton et Space Grotesk, utilisées sous licence SIL Open Font License 1.1.</p>
<h2>Signaler un contenu</h2>
<p>Pour signaler un contenu illicite publié par un utilisateur (avis, question, réponse), écrivez à {v('email')} en indiquant l'adresse de la page, la nature du contenu et le motif. Le contenu manifestement illicite sera retiré rapidement.</p>
<h2>Données personnelles et cookies</h2>
<p>Voir la <a href="/confidentialite.html">politique de confidentialité</a> et la page <a href="/cookies.html">cookies et stockage local</a>.</p>
<h2>Médiation de la consommation</h2>
<p>Voir les <a href="/cgv.html#mediation">conditions de vente</a>.</p>"""

rows = [
 ("Compte utilisateur","Adresse e-mail, mot de passe (stocké chiffré par Firebase, jamais lisible par le club), nom et téléphone si vous les renseignez","Créer et gérer votre compte, pré-remplir vos formulaires","Contrat (art. 6.1.b)","Jusqu'à la suppression du compte, ou 3 ans sans activité"),
 ("Inscriptions aux compétitions et aux séances","Nom, e-mail, téléphone (facultatif), compétition choisie, éventuelle autorisation d'image","Gérer l'inscription, vous contacter, émettre le justificatif","Contrat (6.1.b) ; consentement pour l'image (6.1.a)","Durée de l'activité + 3 ans ; pièces comptables : 10 ans"),
 ("Adhésions","Nom, e-mail, téléphone (facultatif), parrain indiqué (facultatif)","Gérer l'adhésion, la réduction adhérent et le parrainage","Contrat (6.1.b)","Durée de l'adhésion + 3 ans ; pièces comptables : 10 ans"),
 ("Commandes, cartes cadeaux, dons","Nom, e-mail, articles, montants, mode de paiement","Traiter la commande, émettre factures et reçus","Contrat (6.1.b) ; obligation légale comptable (6.1.c)","10 ans (obligations comptables)"),
 ("Prêts d'équipement","Nom, e-mail, équipement et date souhaités","Gérer le prêt","Contrat (6.1.b)","Durée du prêt + 3 ans"),
 ("Attestation de responsabilité","Nom du signataire, e-mail, nom du mineur le cas échéant, mode de signature","Preuve de l'acceptation des règles de sécurité","Intérêt légitime : sécurité et preuve (6.1.f)","10 ans (délai de prescription en cas de dommage corporel)"),
 ("Programme de fidélité","Points gagnés et échangés, demandes de récompense","Gérer vos points","Contrat (6.1.b)","Tant que le compte existe + 3 ans"),
 ("Avis, questions et réponses (FAQ), messages","Nom affiché, texte, date, identifiant de compte","Publier vos contributions","Contrat (6.1.b)","Tant que le compte existe ; suppression sur demande"),
 ("Votes du public","Identifiant de compte (ou identifiant aléatoire sur cet appareil) et option choisie","Un vote par personne","Intérêt légitime (6.1.f)","Jusqu'à la suppression du vote par le club"),
 ("Notifications (téléphone, e-mail, SMS)","Appareil abonné (adresse technique du navigateur) ; e-mail et/ou téléphone ; prénom facultatif","Vous prévenir des nouveautés","Consentement (6.1.a)","Jusqu'au désabonnement"),
 ("Statistiques de fréquentation","Compteurs anonymes : visites par jour, parties vues, site d'origine, type d'appareil (téléphone, tablette, ordinateur)","Savoir quelles parties du site sont utiles","Intérêt légitime (6.1.f)","Compteurs agrégés, sans donnée personnelle"),
 ("Hébergement et sécurité","Adresse IP et journaux techniques traités par les hébergeurs","Fournir le site, prévenir les abus","Intérêt légitime (6.1.f)","Selon les hébergeurs (quelques jours à quelques semaines)"),
]
tr = ''.join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td></tr>" for a,b,c,d,e in rows)
confid = f"""{INTRO_TODO}
<p>Cette page explique, simplement, quelles données personnelles le site Mot'eau utilise, pourquoi, combien de temps, et comment exercer vos droits (règlement européen RGPD et loi Informatique et Libertés).</p>
<h2>1. Responsable du traitement</h2>{ED}
<p>Pour toute question ou demande : {v('email')}. Aucun délégué à la protection des données n'est désigné.</p>
<h2>2. Données, finalités et durées de conservation</h2>
<p>Nous ne collectons que ce qui est nécessaire. Les champs facultatifs sont indiqués comme tels sur les formulaires.</p>
<table><thead><tr><th>Traitement</th><th>Données</th><th>Pourquoi</th><th>Base légale</th><th>Conservation</th></tr></thead><tbody>{tr}</tbody></table>
<h2>3. Ce que nous ne faisons pas</h2>
<ul><li>Aucune publicité, aucun profilage, aucune revente de données.</li><li>Aucun outil de mesure d'audience tiers (pas de Google Analytics, pas de pixel de réseau social).</li><li>Aucune donnée de santé collectée. Aucune donnée de carte bancaire : le paiement se fait chez Stripe.</li><li>Aucune police de caractères ni ressource externe chargée automatiquement : tout est hébergé sur le site.</li></ul>
<h2>4. Qui reçoit vos données</h2>
<ul><li><strong>Vercel Inc.</strong> : hébergement du site et fonctions techniques (envoi de notifications, réception des paiements).</li><li><strong>Google (Firebase)</strong> : base de données et comptes, stockés dans l'Union européenne.</li><li><strong>Stripe</strong> : paiement en ligne, sur ses propres pages (Stripe est responsable de traitement pour les données de paiement).</li><li><strong>YouTube, Vimeo, TikTok, Instagram</strong> : uniquement si vous cliquez pour lire une vidéo intégrée ; le site vous en informe avant le clic. Ces services peuvent alors déposer leurs propres traceurs.</li><li>Les personnes habilitées de l'équipe du club.</li></ul>
<h2>5. Transferts hors Union européenne</h2>
<p>Vercel Inc. et Google sont des sociétés américaines. Les transferts éventuels sont encadrés par les mécanismes prévus par le RGPD (clauses contractuelles types et/ou cadre de protection des données UE–États-Unis). Les données de votre compte et de vos formulaires sont stockées dans l'Union européenne.</p>
<h2>6. Sécurité</h2>
<p>Connexion chiffrée (HTTPS), mots de passe gérés par Firebase, accès aux données personnelles réservé à l'administrateur du site, règles d'accès strictes sur la base de données. En cas de violation de données, vous et la CNIL seriez informés dans les conditions prévues par la loi.</p>
<h2>7. Vos droits</h2>
<p>Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation ou l'opposition à leur traitement, et leur portabilité. Vous pouvez retirer à tout moment un consentement (notifications, autorisation d'image).</p>
<ul><li><strong>Depuis votre compte</strong> (bouton « Mon compte ») : télécharger vos données et supprimer votre compte en un clic.</li><li><strong>Par e-mail</strong> : {v('email')} — réponse sous un mois maximum.</li></ul>
<p>Certaines données doivent être conservées malgré une demande d'effacement (factures et justificatifs : 10 ans). Elles sont alors archivées et ne servent plus à autre chose. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL : <a href="https://www.cnil.fr">cnil.fr</a>, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.</p>
<h2>8. Mineurs</h2>
<p>La création d'un compte est réservée aux personnes de 15 ans et plus, ou avec l'accord d'un parent. Un parent ou tuteur signe l'attestation de responsabilité pour un enfant mineur ; le nom du mineur est alors conservé pour cette seule finalité.</p>
<h2>9. Cookies et stockage local</h2>
<p>Le site n'utilise que des éléments de stockage nécessaires à son fonctionnement : voir la page <a href="/cookies.html">cookies et stockage local</a>.</p>
<h2>10. Particularités à connaître</h2>
<ul><li>Pour permettre aux adhérents d'obtenir leur réduction, une empreinte irréversible de l'adresse e-mail des adhérents à jour est publiée ; seule une personne qui connaît déjà une adresse peut vérifier si elle correspond à un adhérent. Dans l'espace réservé aux adhérents, seuls le prénom et l'initiale du nom sont affichés.</li><li>Les avis, questions et réponses sont publics avec le nom que vous choisissez d'afficher.</li></ul>
<h2>11. Modifications</h2><p>Cette politique peut évoluer ; la date de mise à jour figure en haut de page.</p>"""

cgu = f"""{INTRO_TODO}
<h2>1. Objet</h2><p>Ces conditions encadrent l'utilisation du site Mot'eau (présentation du sport, planning, résultats, boutique, comptes, avis, questions, votes…). Les achats et inscriptions payantes sont aussi soumis aux <a href="/cgv.html">conditions de vente</a>.</p>
<h2>2. Accès au site</h2><p>Le site est accessible gratuitement, sans compte pour la consultation. Certaines fonctions (avis, questions, votes, fidélité) demandent un compte. L'éditeur s'efforce d'assurer la disponibilité du site mais ne la garantit pas : maintenance et pannes sont possibles.</p>
<h2>3. Compte utilisateur</h2><ul><li>Réservé aux personnes de 15 ans et plus, ou avec l'accord d'un parent.</li><li>Les informations données doivent être exactes. Vous gardez votre mot de passe confidentiel et êtes responsable de l'usage de votre compte.</li><li>Vous pouvez supprimer votre compte à tout moment depuis « Mon compte ».</li><li>L'éditeur peut suspendre un compte en cas de non-respect de ces conditions ou de fraude.</li></ul>
<h2>4. Contenus publiés par les utilisateurs</h2>
<p>Vous êtes responsable de ce que vous publiez (avis, questions, réponses, messages). Sont interdits : propos illégaux, haineux, diffamatoires, discriminatoires ou violents ; atteintes à la vie privée d'autrui ; publicité, spam ; contenus protégés que vous n'avez pas le droit de publier ; faux avis. Vous nous autorisez à afficher vos contenus sur le site, gratuitement, tant qu'ils sont publiés. L'éditeur peut retirer tout contenu contraire à ces règles. Signalement : {v('email')}.</p>
<h2>5. Propriété intellectuelle</h2><p>Les éléments du site (logo, textes, images, vidéos, code) sont protégés. Toute reproduction ou réutilisation non autorisée est interdite, sauf pour un usage privé.</p>
<h2>6. Sécurité sportive</h2><p>Les activités Mot'eau comportent des risques (sport nautique et de vitesse). La participation suppose la lecture et l'acceptation de l'attestation de responsabilité et des consignes (gilet et casque obligatoires). Le site ne remplace pas les consignes données sur place.</p>
<h2>7. Responsabilité</h2><p>Les informations (planning, résultats, prix) sont données à titre indicatif et peuvent être modifiées. L'éditeur ne peut être tenu responsable des contenus des sites externes liés (réseaux sociaux, vidéos, paiement), ni des dommages indirects résultant de l'utilisation du site, dans les limites permises par la loi.</p>
<h2>8. Données personnelles</h2><p>Voir la <a href="/confidentialite.html">politique de confidentialité</a>.</p>
<h2>9. Droit applicable</h2><p>Droit français. En cas de litige, une solution amiable est recherchée en priorité ; les consommateurs peuvent recourir à la médiation (voir les <a href="/cgv.html#mediation">conditions de vente</a>), puis aux tribunaux compétents.</p>
<h2>10. Contact</h2><p>{v('email')}</p>"""

cgv = f"""{INTRO_TODO}
<h2>1. Vendeur</h2>{ED}
<p>TVA non applicable, article 293 B du Code général des impôts. Les prix sont indiqués en euros, nets de taxe.</p>
<h2>2. Champ d'application</h2><p>Ces conditions s'appliquent aux ventes et services proposés sur le site à des consommateurs : articles de la boutique, inscriptions aux compétitions et séances, adhésions, prêts d'équipement, cartes cadeaux. Les dons ne sont pas des ventes : ils sont volontaires.</p>
<h2>3. Prix</h2><p>Le prix applicable est celui affiché au moment de la commande, avec les réductions éventuelles (code promo, réduction adhérent, carte cadeau). Les prix peuvent changer à tout moment, sans effet sur les commandes déjà validées.</p>
<h2>4. Commande</h2><p>Vous choisissez vos articles, vérifiez le panier, puis validez avec le bouton « Commander avec obligation de paiement », après avoir accepté les présentes conditions. Un document récapitulatif (bon de commande, fiche d'inscription ou facture) vous est présenté et peut être enregistré en PDF. Le vendeur peut refuser ou annuler une commande pour motif légitime (stock épuisé, erreur de prix manifeste, litige antérieur) ; vous seriez alors intégralement remboursé.</p>
<h2>5. Paiement</h2><p>Deux modes : <strong>en ligne</strong>, sur la page sécurisée de Stripe, ou <strong>sur place</strong>, au club. Une commande est ferme à réception du paiement (ou lors du règlement sur place). Le vendeur peut annuler une commande non réglée après relance restée sans réponse.</p>
<h2>6. Remise des commandes</h2><ul><li><strong>Retrait au club</strong> : gratuit, à la date convenue avec le vendeur.</li><li><strong>Envoi postal</strong> : sur demande, par e-mail à {v('email')} avant de commander. Les frais d'envoi et le délai vous sont communiqués et doivent être acceptés par vous <em>avant</em> tout paiement.</li></ul><p>Sauf accord contraire, les articles disponibles sont remis dans un délai maximal de 30 jours après la commande. Les articles en précommande sont remis dès leur disponibilité, selon la date annoncée sur la fiche produit. Les « pièces concept » ne sont pas en vente : elles servent à recueillir votre avis.</p>
<h2>7. Droit de rétractation et remboursements</h2><p>Voir la page <a href="/remboursement.html">remboursement et rétractation</a>, qui contient aussi le formulaire type de rétractation.</p>
<h2>8. Garanties légales</h2><p>Le vendeur répond de la conformité des biens (garantie légale de conformité de 2 ans à compter de la délivrance, articles L.217-3 et suivants du Code de la consommation) et des défauts cachés (articles 1641 et suivants du Code civil). Vous pouvez demander la réparation ou le remplacement du bien, puis, à défaut, sa réduction de prix ou son remboursement. Écrivez à {v('email')}.</p>
<h2>9. Cartes cadeaux</h2><p>La carte cadeau est utilisable sur tout le site grâce à son code, jusqu'à épuisement du solde, pendant un an à compter de l'achat. Elle n'est ni échangeable contre de l'argent, ni remboursable une fois utilisée, et n'est pas remplacée en cas de perte du code. Le code est activé à réception du paiement.</p>
<h2>10. Inscriptions, adhésions et prêts</h2><ul><li><strong>Inscriptions aux compétitions et séances</strong> : activité à date fixe ; conditions d'annulation sur la page <a href="/remboursement.html">remboursement</a>.</li><li><strong>Adhésion</strong> : cotisation annuelle donnant droit à la réduction adhérent et aux avantages affichés.</li><li><strong>Prêts d'équipement</strong> : le matériel est restitué propre et en bon état à la date convenue ; l'emprunteur répond de la perte ou de la dégradation hors usure normale.</li></ul>
<h2>11. Sécurité des activités</h2><p>La participation aux activités suppose d'avoir signé l'attestation de responsabilité et de respecter les consignes de sécurité.</p>
<h2>12. Données personnelles</h2><p>Voir la <a href="/confidentialite.html">politique de confidentialité</a>.</p>
<h2 id="mediation">13. Réclamations et médiation</h2><p>En cas de difficulté, contactez d'abord le vendeur : {v('email')}. À défaut de solution dans un délai raisonnable, vous pouvez saisir gratuitement le médiateur de la consommation : {v('mediateur')}.</p>
<h2>14. Droit applicable</h2><p>Droit français. Vous pouvez aussi saisir le tribunal du lieu où vous demeurez ou celui du lieu de livraison.</p>"""

remb = f"""{INTRO_TODO}
<p class="muted">Cette page résume vos droits de consommateur lors d'un achat à distance (articles L.221-18 et suivants du Code de la consommation).</p>
<h2>1. Articles de la boutique : 14 jours pour changer d'avis</h2>
<p>Vous pouvez vous rétracter, sans donner de motif, dans les <strong>14 jours</strong> suivant la réception de votre commande (ou du dernier article en cas de commande en plusieurs articles). Notifiez-nous votre décision par e-mail à {v('email')} ou en utilisant le formulaire ci-dessous. Renvoyez ou rapportez l'article au plus tard 14 jours après votre notification, <strong>dans son état d'origine</strong>. Les frais de renvoi sont à votre charge. Nous vous remboursons <strong>au plus tard 14 jours</strong> après avoir reçu votre notification, avec le même moyen de paiement ; nous pouvons attendre la réception de l'article ou une preuve de renvoi. Un article abîmé ou porté peut subir une déduction pour dépréciation.</p>
<p><strong>Exceptions</strong> (article L.221-28) : articles personnalisés ou confectionnés selon vos demandes, articles scellés pour des raisons d'hygiène et descellés après livraison.</p>
<h2>2. Adhésion</h2>
<p>Vous disposez de 14 jours à compter de la souscription. Comme vous demandez que l'adhésion commence immédiatement, vous payez, en cas de rétractation, la part correspondant à la période déjà écoulée ; le reste vous est remboursé sous 14 jours.</p>
<h2>3. Inscriptions aux compétitions et séances</h2>
<p>Ce sont des activités de loisirs à date fixe : la loi ne prévoit <strong>pas de droit de rétractation</strong> (article L.221-28, 12°). Notre politique commerciale est toutefois la suivante :</p>
<ul><li><strong>Annulation au moins 7 jours avant la date</strong> : remboursement intégral.</li><li><strong>Annulation moins de 7 jours avant</strong> : pas de remboursement, sauf force majeure ou blessure justifiée (certificat médical) ; dans ce cas, remboursement ou report à une autre date, à votre choix.</li><li><strong>Annulation, report ou modification par le club</strong> (météo, sécurité, organisation) : remboursement intégral ou report, à votre choix.</li></ul>
<h2>4. Cartes cadeaux</h2><p>Rétractation possible dans les 14 jours suivant l'achat, tant que la carte n'a pas été utilisée.</p>
<h2>5. Prêts d'équipement</h2><p>Annulation gratuite jusqu'à la veille de la date de prêt. Le prix éventuel est alors remboursé.</p>
<h2>6. Dons</h2><p>Les dons sont volontaires. En cas d'erreur de montant, écrivez-nous dans les 14 jours : nous corrigeons ou remboursons.</p>
<h2>7. Article défectueux ou non conforme</h2><p>Vous bénéficiez en plus des garanties légales (voir les <a href="/cgv.html">conditions de vente</a>, article 8), sans condition de délai de 14 jours.</p>
<h2>8. Comment procéder</h2><p>Écrivez à {v('email')} en indiquant votre nom, la référence de votre commande ou inscription (par exemple CMD-…) et votre demande. Nous accusons réception et vous indiquons la suite.</p>
<h2>Formulaire type de rétractation</h2>
<div class="box"><p>(Veuillez compléter et renvoyer le présent formulaire uniquement si vous souhaitez vous rétracter du contrat.)</p>
<p>À l'attention de {v('editeur')}, {v('adresse')}, {v('email')} :</p>
<p>Je vous notifie par la présente ma rétractation du contrat portant sur la vente du bien / la prestation de services ci-dessous :</p>
<ul><li>Commandé le / reçu le (*) : ……………………</li><li>Référence de la commande : ……………………</li><li>Nom du consommateur : ……………………</li><li>Adresse du consommateur : ……………………</li><li>Signature du consommateur (uniquement en cas de notification du présent formulaire sur papier) : ……………………</li><li>Date : ……………………</li></ul>
<p class="muted">(*) Rayez la mention inutile.</p></div>"""

cook_rows = [
 ("moteau_admin_rt","Stockage local","Garder votre session de connexion à votre compte (jeton d'authentification)","Jusqu'à votre déconnexion","Nécessaire au service demandé"),
 ("moteau_lang","Stockage local","Mémoriser la langue choisie (FR/EN)","Jusqu'à effacement","Préférence demandée par vous"),
 ("moteau_favorites","Stockage local","Mémoriser vos produits favoris","Jusqu'à effacement","Fonction demandée par vous"),
 ("moteau_voter","Stockage local","Identifiant aléatoire pour ne voter qu'une fois (si vous n'avez pas de compte)","Jusqu'à effacement","Nécessaire au service demandé"),
 ("moteau_push","Stockage local","Se souvenir que vous avez activé les notifications","Jusqu'à effacement","Fonction demandée par vous"),
 ("moteau_visit, moteau_sec_…","Stockage de session","Ne compter qu'une fois votre visite dans les statistiques anonymes","Supprimé à la fermeture de l'onglet","Mesure d'audience anonyme (exemptée de consentement)"),
]
ck = ''.join(f"<tr><td><code>{a}</code></td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td></tr>" for a,b,c,d,e in cook_rows)
cookies = f"""{INTRO_TODO}
<p>Cette page indique ce que le site Mot'eau enregistre dans votre navigateur (cookies et stockage local), pourquoi, et pourquoi il n'y a pas de bandeau de consentement.</p>
<h2>1. Ce que nous utilisons</h2>
<table><thead><tr><th>Nom</th><th>Type</th><th>Rôle</th><th>Durée</th><th>Nature</th></tr></thead><tbody>{ck}</tbody></table>
<p>Le site ne dépose <strong>aucun cookie publicitaire</strong>, aucun traceur de réseau social et aucun outil de statistiques tiers.</p>
<h2>2. Pourquoi pas de bandeau ?</h2>
<p>Selon les règles européennes et les lignes directrices de la CNIL, le consentement n'est pas requis pour les traceurs strictement nécessaires au service que vous demandez (connexion, langue, panier, vote) ni pour une mesure d'audience anonyme et limitée à un usage statistique strict. C'est le cas ici : les statistiques ne sont que des compteurs globaux (visites par jour, parties vues, site d'origine, type d'appareil), sans identifiant ni suivi d'une personne d'un jour à l'autre. Si cela change, un bandeau de choix sera ajouté <em>avant</em> tout nouveau traceur.</p>
<h2>3. Contenus d'autres services</h2>
<p>Les vidéos YouTube (mode sans cookie), Vimeo, TikTok et Instagram ne sont chargées <strong>qu'après votre clic</strong> sur la vidéo ; la mention « Au clic, la vidéo est chargée depuis… » vous en informe. Ces services appliquent leurs propres règles. Les paiements se font sur les pages de Stripe.</p>
<h2>4. Notifications</h2>
<p>Les notifications sur téléphone ou ordinateur ne s'activent que si vous cliquez sur « Activer les notifications » puis acceptez la demande de votre navigateur. Vous pouvez les couper à tout moment dans les réglages du navigateur ou de l'appareil.</p>
<h2>5. Effacer ou bloquer</h2>
<p>Dans votre navigateur : réglages, confidentialité, « Effacer les données de navigation » (cochez « cookies et données de sites »). Effacer ces données vous déconnecte et réinitialise vos préférences.</p>
<h2>6. Plus d'informations</h2><p><a href="/confidentialite.html">Politique de confidentialité</a> · <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs">cnil.fr — cookies et autres traceurs</a></p>"""

OUT = {
 'mentions-legales':(mentions,"Informations légales sur l'éditeur, l'hébergeur et le site Mot'eau."),
 'confidentialite':(confid,"Quelles données le site Mot'eau utilise, pourquoi, combien de temps, et comment exercer vos droits."),
 'cgu':(cgu,"Conditions d'utilisation du site Mot'eau."),
 'cgv':(cgv,"Conditions de vente Mot'eau : boutique, inscriptions, adhésions, prêts, cartes cadeaux."),
 'remboursement':(remb,"Droit de rétractation, remboursements et formulaire type de rétractation."),
 'cookies':(cookies,"Cookies et stockage local utilisés par le site Mot'eau."),
}
titles=dict(PAGES)
for slug,(body,desc) in OUT.items():
    open(os.path.join(ROOT, slug + '.html'),'w',encoding='utf-8').write(page(slug, titles[slug], body, desc))
print('pages générées :', ', '.join(OUT))
todo=[k for k,x in INFO.items() if 'À COMPLÉTER' in x]
print('champs à compléter :', ', '.join(todo) or 'aucun')
