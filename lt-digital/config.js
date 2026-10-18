/* =====================================================================
   ✏️  FICHIER À MODIFIER : tout le contenu du site est ici.
   Change les textes, les prix, les gammes… puis recharge la page.
   (Garde bien les guillemets "..." et les virgules.)
   Les prix et textes ci-dessous sont des EXEMPLES à adapter.
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---------- IDENTITÉ ---------- */
  siteUrl: "https://l-t-digital.vercel.app",   /* adresse du site (sert au plan du site et au résumé pour les IA) */
  brand: "L&T Digital",
  tagline: "Création & modernisation de sites web",
  logo: "images/logo-small.jpg",          // petit logo (barre du haut)
  logoBig: "images/logo.jpg",             // grand logo (pied de page)
  accent: "#c8ff3e",                      // vert citron (couleur principale du site)
  accent2: "#8fa2ff",

  /* ---------- DÉLAI DE LIVRAISON (partout sur le site) ----------
     Écris {delivery} dans n'importe quel texte pour y mettre ce délai.
     Chaque gamme peut avoir son propre délai ("delay"), sinon elle prend celui-ci. */
  delivery: "48 à 72 h",

  /* ---------- TVA ----------
     mode : "ttc"       => les prix affichés sont TTC (TVA incluse)
            "ht"        => les prix affichés sont HT (la TVA s'ajoute à la commande)
            "franchise" => pas de TVA (micro-entreprise : "TVA non applicable, art. 293 B du CGI")
     rate : taux de TVA en % (20 pour la plupart des prestations de création de sites)
     note : phrase affichée sous les prix (laisse "" pour le texte automatique) */
  vat: { mode: "franchise", rate: 20, note: "" }   /* franchise en base : pas de TVA facturée (art. 293 B du CGI) — prix nets, adaptés le 12/10/2026 (ancien prix TTC ÷ 1,2) */,

  /* ---------- INFORMATIONS LÉGALES (pages Mentions légales, CGV, Confidentialité) ----------
     Remplis ce que tu peux : ce qui manque s'affiche "[à compléter]" sur les pages légales.
     ⚠ Ce sont des modèles : fais-les relire par un professionnel (expert-comptable, juriste). */
  legal: {
    /* ⚠️ À compléter dès que la micro-entreprise est immatriculée (SIRET, adresse, nom du responsable). */
    company: { name: "L&T Digital", status: "Entrepreneur individuel (micro-entreprise)", capital: "", address: "", siret: "", rcs: "", vatNumber: "", publisher: "", email: "l.t.digital.rb@gmail.com", phone: "" },
    hosting: { name: "Vercel Inc.", address: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis", website: "https://vercel.com", phone: "" },
    mediator: { name: "", address: "", website: "" },
    cgv: { paymentMethods: "", city: "", extra: "" },
    updated: "14 octobre 2026"
  },

  /* ---------- MONNAIE ---------- */
  currency: { symbol: "€", after: true },   // after:true => "290 €"

  /* ---------- BANDEAU D'ANNONCE (laisse "" pour le cacher) ---------- */
  announce: "Offre de lancement : -10 % avec le code BIENVENUE",

  /* ---------- HERO (haut de page) ---------- */
  hero: {
    badge: "On crée ton site internet",
    title: "Le site qui fait venir",
    titleAccent: "de nouveaux clients.",
    text: "On fait ton site internet. Il est joli, facile à utiliser, et les gens te trouvent sur Google. Prêt en {delivery}.",
    cta1: "Voir les prix",
    cta2: "Je commande",
    /* mots qui défilent sous le titre : « Pour les restaurants », puis « Pour les boulangeries »… (vide = rien) */
    rotatePrefix: "Pensé pour les",
    rotate: [],
    /* barre « demande » qui s'écrit toute seule (clic = page de commande). Vide = pas de barre */
    prompts: ["Je veux un site pour ma boulangerie", "Je veux un logo pour mon salon", "Je veux une vidéo pour Instagram", "Je veux refaire mon site", "Je veux de belles photos"],
    /* petites coches sous les boutons */
    trust: ["Le prix est écrit à l'avance", "Tu peux demander des changements", "Tu paies le reste quand ton site te plaît"],
    /* petites notifications animées autour des images (exemples de ce que le site apporte) */
    notes: [
      { icon: "🔔", title: "Nouvelle réservation", text: "Un client a réservé" }
    ],
    /* images du haut de page (captures de tes maquettes) */
    visual: { a: "images/portfolio/restaurant.jpg", b: "images/portfolio/boutique.jpg", phone: "images/portfolio/coach-mobile.jpg" }
  },


  /* ---------- VIDÉO DE PRÉSENTATION (juste après l'accueil) ----------
     show:false => section cachée. src = la vidéo (format vertical), poster = l'image affichée avant la lecture. */
  promoVideo: {
    show: true,
    hero: true, // true = la vidéo est tout en haut du site, à côté du titre
    eyebrow: "Notre pub en 24 secondes",
    title: "Regarde ce qu'on sait faire.",
    text: "Cette vidéo, on l'a entièrement créée nous-mêmes : animations, musique et bruitages. On peut faire la même pour ton commerce.",
    cta: "Je veux la mienne",
    src: "images/pubs/pub-lt-digital.mp4",
    poster: "images/pubs/pub-lt-digital.jpg"
  },

  /* ---------- POURQUOI UN VRAI SITE (argumentaire) ----------
     icon : search, shield, clock, time, home, growth */
  why: {
    eyebrow: "Pourquoi un site ?",
    title: "Un site, c'est ta boutique sur internet.",
    intro: "Quand quelqu'un veut un magasin, il cherche sur internet d'abord. Si tu as un site, il te trouve. Sinon, il va chez un autre.",
    items: [
      { icon: "search", title: "Les gens te trouvent", text: "Quelqu'un écrit « boulangerie près de moi » sur Google. Avec un site, c'est toi qu'il voit." },
      { icon: "shield", title: "Les gens te font confiance", text: "Un joli site donne envie de venir. Sans site, on se demande si tu existes vraiment." },
      { icon: "clock", title: "Ouvert tout le temps", text: "Ton site ne dort jamais. On y voit tes horaires et tes prix, même la nuit." },
      { icon: "time", title: "Moins de questions au téléphone", text: "Les réponses (horaires, prix, adresse) sont sur le site. Tu gagnes du temps." },
      { icon: "home", title: "C'est chez toi", text: "Ton site est à toi, avec ton nom. Personne ne peut te le prendre." },
      { icon: "growth", title: "Plus de clients", text: "Plus de gens te trouvent, donc plus de gens appellent, réservent et achètent." }
    ],
    withoutTitle: "Sans site",
    without: ["On ne te trouve pas sur Google", "Des clients qui hésitent et vont ailleurs", "Toujours les mêmes questions au téléphone", "Tu dépends des réseaux sociaux", "Rien ne se passe quand tu es fermé"],
    withTitle: "Avec un site L&T Digital",
    with: ["Les clients près de chez toi te trouvent", "Une belle image qui donne envie", "Prix et horaires toujours justes", "Ta vitrine, à ton nom", "On peut réserver et commander tout le temps"],
    cta: "Je veux mon site"
  },

  /* ---------- CHIFFRES CLÉS (supprime les lignes inutiles) ---------- */
  stats: [
    { value: "{delivery}",  label: "pour recevoir ton site" },
    { value: "1", label: "seul contact, du début à la fin" },
    { value: "100%", label: "Marche sur téléphone et tablette" },
    { value: "7j/7", label: "On t'aide après la livraison" }
  ],

  /* ---------- NOTRE HISTOIRE (fin de page) ----------
     paragraphs : un texte par paragraphe ; founders : photo = chemin d'une image (ex "images/fondateur-l.jpg"),
     vide = pastille avec l'initiale (champ initial). Modifie tout depuis admin.html ▸ Notre histoire. */
  story: {
    eyebrow: "Notre histoire",
    title: "On est deux, et on fait des sites pour les commerces.",
    paragraphs: [
      "L&T Digital est née d'une idée simple : chaque commerce mérite un beau site, expliqué simplement, avec un prix clair.",
      "Tu parles toujours à la même personne, du premier message jusqu'à la mise en ligne de ton site.",
      "On crée de nouveaux sites, et on refait ceux qui sont vieux, pour que chaque commerce ait une belle vitrine."
    ],
    founders: [
      { name: "Prénom du fondateur L", initial: "L", role: "Cofondateur", text: "À compléter : son parcours, ce qu'il aime dans ce métier et son rôle chez L&T Digital.", photo: "" },
      { name: "Prénom du fondateur T", initial: "T", role: "Cofondateur", text: "À compléter : son parcours, ce qu'il aime dans ce métier et son rôle chez L&T Digital.", photo: "" }
    ],
    values: [
      { title: "Clair", text: "Le prix est écrit, les étapes sont expliquées, pas de surprise." },
      { title: "Soigné", text: "Chaque site est fait pour ton métier. On ne copie pas." },
      { title: "Proche de toi", text: "Tu nous écris directement, avant, pendant et après." }
    ]
  },

  /* ---------- SECTIONS : afficher / masquer / renommer ----------
     Chaque bloc de la page. show:false => la section disparaît (et son lien du menu).
     Laisse title/subtitle vides ("") pour garder le texte par défaut. */
  sections: {
    tarifs:       { show: true, eyebrow: "1 · Les prix",  title: "Choisis ton site", subtitle: "Chaque site a un prix clair. Si tu veux plus, tu ajoutes des options." },
    comparatif:   { show: true, eyebrow: "Comparer",   title: "Les sites, côte à côte", subtitle: "Pour voir la différence en un coup d'œil." },
    options:      { show: true, eyebrow: "2 · Les options", title: "Tu veux plus ? Ajoute ce que tu aimes", subtitle: "Rien n'est obligatoire. Tu prends seulement ce qui te plaît." },
    services:     { show: true, eyebrow: "Photos, logo, pubs & réseaux" },
    process:      { show: true, eyebrow: "Comment ça marche",    title: "C'est facile : 4 étapes", subtitle: "" },
    realisations: { show: true, eyebrow: "Exemples", title: "Des exemples de sites", subtitle: "Clique sur un exemple pour le voir en grand." },
    pourquoi:     { show: true, eyebrow: "Pourquoi un site ?" },
    avis:         { show: true, eyebrow: "Avis",         title: "", subtitle: "" },
    commande:     { show: true, eyebrow: "3 · Je commande",     title: "Fais ta commande, c'est simple", subtitle: "Choisis ce que tu veux. Le prix se calcule tout seul. Ensuite, envoie-nous ta commande." },
    faq:          { show: true, eyebrow: "Questions",          title: "Tu te poses des questions ?", subtitle: "" },
    histoire:     { show: true, eyebrow: "Qui sommes-nous ?", title: "", subtitle: "" }
  },

  /* ---------- GAMMES / TARIFS ----------
     unit      : texte après le prix (ex: "/mois") — facultatif
     group     : nom d'un groupe (ex: "Sites", "Boutiques") — si tu en mets
                 plusieurs, des boutons de filtre apparaissent
     id        : identifiant unique (sans espace)
     price     : prix (nombre) — null pour afficher "Sur devis"
     from      : true => affiche "À partir de"
     popular   : true => mise en avant "Notre conseil"
     features  : liste ; "!" au début = ligne barrée (non incluse)
  */
  plans: [
    {
      id: "express", name: "Page Express", tagline: "Une seule page, vite faite.",
      price: 85, from: false, delay: "", popular: false, cta: "Choisir Express",
      features: [
        "1 seule page",
        "Qui tu es + comment te contacter",
        "Aux couleurs de ton activité",
        "1 changement gratuit",
        "!Plusieurs pages",
        "!Formulaire pour t'écrire"
      ]
    },
    {
      id: "vitrine", name: "Site Vitrine", tagline: "Le bon choix pour la plupart des gens.",
      price: 239, from: false, delay: "", popular: true, cta: "Choisir Vitrine",
      features: [
        "Jusqu'à 5 pages (Accueil, Services, Qui es-tu, Photos, Contact)",
        "Un beau design fait pour toi",
        "Un formulaire pour que les clients t'écrivent",
        "On t'aide à être trouvé sur Google",
        "3 changements gratuits",
        "On t'aide pendant 7 jours après"
      ]
    },
    {
      id: "complet", name: "Site Complet", tagline: "Tout en un : boutique ou réservation.",
      price: 575, from: true, delay: "", popular: false, cta: "Choisir Complet",
      features: [
        "Jusqu'à 10 pages",
        "Une boutique en ligne ou des réservations",
        "Un très beau design qui bouge",
        "Très bien placé sur Google + on compte tes visites",
        "Autant de changements que tu veux pendant la création",
        "On t'aide en priorité pendant 30 jours"
      ]
    },
    {
      id: "refonte", name: "Refaire mon site", tagline: "On rajeunit ton site qui existe déjà.",
      price: 159, from: true, delay: "selon le site", popular: false, cta: "Moderniser",
      features: [
        "On regarde ce qui ne va pas sur ton site",
        "Un nouveau design, joli sur téléphone",
        "On garde tes textes et tes photos",
        "Ton site va plus vite",
        "2 changements gratuits",
        "!Nouvelles choses à ajouter (en option)"
      ]
    },
    {
      id: "surmesure", name: "Sur mesure", tagline: "Un projet spécial ? On en parle.",
      price: null, from: false, delay: "selon projet", popular: false, cta: "Demander un devis",
      features: [
        "Des choses faites exactement pour toi",
        "Un logo et des couleurs rien qu'à toi",
        "Quelqu'un te suit pendant tout le projet",
        "On s'occupe de ton site après, si tu veux"
      ]
    }
  ],

  /* ---------- TABLEAU COMPARATIF ----------
     true (✔), false (✘) ou un texte. Les clés = les "id" des gammes. */
  compare: [
    { label: "Nombre de pages",         values: { express: "1", vitrine: "5", complet: "10", refonte: "Les mêmes", surmesure: "Autant que tu veux" } },
    { label: "Design fait pour toi",       values: { express: true, vitrine: true, complet: true, refonte: true, surmesure: true } },
    { label: "Marche sur téléphone",     values: { express: true, vitrine: true, complet: true, refonte: true, surmesure: true } },
    { label: "Formulaire pour t'écrire",   values: { express: false, vitrine: true, complet: true, refonte: true, surmesure: true } },
    { label: "Trouvé sur Google",            values: { express: false, vitrine: "Un peu", complet: "Beaucoup", refonte: "Un peu", surmesure: "Beaucoup" } },
    { label: "Boutique / réservation",  values: { express: false, vitrine: false, complet: true, refonte: false, surmesure: true } },
    { label: "Changements gratuits",      values: { express: "1", vitrine: "3", complet: "À volonté", refonte: "2", surmesure: "À volonté" } },
    { label: "Aide après la livraison", values: { express: "—", vitrine: "7 jours", complet: "30 jours", refonte: "7 jours", surmesure: "Au choix" } }
  ],

  /* ---------- OPTIONS / SUPPLÉMENTS ----------
     price    : prix (null => sur devis) ; from:true => affiché "dès"
     group    : rubrique (les options sont rangées par rubrique pour rester lisibles)
     popular  : true => mise en avant dans "Nos conseils" (affichée en premier)
     qty      : true => le client choisit une quantité (max = plafond)
     plans    : liste d'id de gammes pour lesquelles l'option existe ([] = toutes)
     included : liste d'id de gammes où l'option est déjà incluse (gratuite)
     tag      : badge facultatif (sinon "Conseillé" si popular) */
  addons: [
    { id: "reservation", name: "Réserver en ligne", price: 115, from: true, group: "Fonctionnalités", popular: true, qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Tes clients réservent une table ou un rendez-vous sur ton site." },
    { id: "carte", name: "Google Maps + bouton itinéraire", price: 25, group: "Fonctionnalités", popular: true, qty: false, plans: [], included: [], tag: "", desc: "Une carte sur ton site, avec un bouton qui montre le chemin jusqu'à chez toi." },
    { id: "notif", name: "Être prévenu (e-mail / SMS)", price: 39, group: "Fonctionnalités", popular: true, qty: false, plans: [], included: [], tag: "", desc: "Tu reçois un message à chaque réservation. Ton client reçoit une confirmation." },
    { id: "boutique", name: "Boutique en ligne / catalogue", price: 125, from: true, group: "Fonctionnalités", popular: true, qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Montre tes produits et vends-les sur internet." },
    { id: "domain", name: "Ton adresse internet (1 an)", price: 49, group: "Mise en ligne & visibilité", popular: true, qty: false, plans: [], included: [], tag: "", desc: "On choisit ton adresse (par exemple tonnom.fr) et on met ton site en ligne." },
    { id: "seo", name: "Mieux placé sur Google", price: 59, group: "Mise en ligne & visibilité", popular: true, qty: false, plans: [], included: [], tag: "", desc: "Pour que plus de gens te trouvent quand ils cherchent." },
    { id: "maint", name: "On s'occupe de ton site (1 mois)", price: 25, group: "Service & rapidité", popular: true, qty: false, plans: [], included: [], tag: "", desc: "On le garde à jour et on fait les petits changements pour toi." },
    { id: "page", name: "Page supplémentaire", price: 35, group: "Contenu & visuel", qty: true, max: 20, plans: ["vitrine","complet","refonte"], included: [], tag: "", desc: "Ajoute autant de pages que tu veux." },
    { id: "logo", name: "Création de logo", price: 65, group: "Contenu & visuel", qty: false, plans: [], included: ["complet"], tag: "", desc: "Un logo rien qu'à toi." },
    { id: "texte", name: "On écrit tes textes", price: 59, group: "Contenu & visuel", qty: false, plans: [], included: [], tag: "", desc: "On écrit les phrases de ton site, simples et claires." },
    { id: "photos", name: "Photos prises ou arrangées", price: 99, group: "Contenu & visuel", qty: false, plans: [], included: [], tag: "", desc: "De belles photos pour ton site." },
    { id: "equipe", name: "Page « Notre équipe »", price: 35, group: "Contenu & visuel", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Présente ton équipe avec des photos." },
    { id: "galerie", name: "Galerie de photos", price: 49, group: "Contenu & visuel", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Montre ce que tu as fait avec des photos." },
    { id: "traduction", name: "Traduction du site (anglais)", price: 75, group: "Contenu & visuel", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Ton site aussi en anglais." },
    { id: "video", name: "Vidéo de présentation intégrée", price: null, group: "Contenu & visuel", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Une vidéo qui te présente, sur ton site." },
    { id: "paiement", name: "Paiement en ligne", price: null, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Tes clients paient directement sur ton site." },
    { id: "devisform", name: "Formulaire pour demander un prix", price: 49, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Tu reçois des demandes claires et bien rangées." },
    { id: "whatsapp", name: "Bouton WhatsApp / Instagram", price: 25, group: "Fonctionnalités", qty: false, plans: [], included: [], tag: "", desc: "Un contact direct en un clic." },
    { id: "newsletter", name: "Lettre d'infos par e-mail", price: 49, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Garde les e-mails de tes visiteurs pour leur écrire." },
    { id: "avis", name: "Les avis de tes clients", price: 39, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Montre ce que tes clients disent de toi." },
    { id: "blog", name: "Page de nouvelles (tu la modifies)", price: 75, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Tu écris tes nouvelles facilement." },
    { id: "espace", name: "Espace privé pour tes clients", price: null, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Chaque client a son espace avec un mot de passe." },
    { id: "spec", name: "Une idée spéciale", price: null, group: "Fonctionnalités", qty: false, plans: [], included: [], tag: "", desc: "Tu as une idée ? On regarde ensemble et on te donne un prix." },
    { id: "email", name: "Adresse e-mail professionnelle", price: 39, group: "Mise en ligne & visibilité", qty: false, plans: [], included: [], tag: "", desc: "Une adresse e-mail à ton nom, comme contact@tonnom.fr." },
    { id: "gbp", name: "Ta fiche Google", price: 49, group: "Mise en ligne & visibilité", qty: false, plans: [], included: [], tag: "", desc: "Ta fiche avec ton adresse et tes horaires, sur Google et sur la carte." },
    { id: "reseaux", name: "On crée tes comptes (Instagram…)", price: 49, group: "Mise en ligne & visibilité", qty: false, plans: [], included: [], tag: "", desc: "Instagram, Facebook… prêts à utiliser." },
    { id: "analytics", name: "Compter les visites", price: 25, group: "Mise en ligne & visibilité", qty: false, plans: [], included: [], tag: "", desc: "Tu vois combien de personnes visitent ton site." },
    { id: "urgent", name: "Plus vite !", price: 85, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "Ton projet passe avant les autres." },
    { id: "modifs", name: "Changements à volonté (1 mois)", price: 39, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "Tu changes ce que tu veux, même après la livraison." },
    { id: "formation", name: "Apprends à le modifier (30 min en visio)", price: 39, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "On t'apprend à changer ton site tout seul." },
    { id: "secu", name: "Site protégé et sauvegardé (1 mois)", price: 12, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "Ton site est en sécurité et on garde une copie." },
    { id: "evol", name: "Nouveautés chaque année", price: null, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "On ajoute de nouvelles choses à ton site chaque année." }
  ],




  /* ---------- LOGO, AFFICHES & RÉSEAUX SOCIAUX ----------
     Prestations vendues avec OU sans site (le client peut choisir « Pas de site »).
     group   : onglet où ranger la prestation
     price   : prix (null = « Sur devis ») · from : true = « dès »
     unit    : "/mois" = abonnement (affiché à part, pas dans le total à payer tout de suite)
     qty     : true = le client choisit une quantité (max = maximum)
     popular : true = mise en avant · features : petites lignes « ce qui est inclus » */
  services: {
    eyebrow: "Photos, logo, pubs & réseaux",
    title: "Et aussi : photos, logo, vidéos…",
    intro: "On peut aussi faire tes photos, ton logo, tes affiches, tes vidéos et tes réseaux. Avec un site ou sans site : tu prends seulement ce que tu veux.",
    items: [
      { id: "s-pubv-courte", group: "Pubs vidéo", name: "Pub vidéo courte (15 à 30 s)", price: 125, popular: true, video: "images/pubs/courte.mp4", videoSound: "images/pubs/courte-son.mp4", desc: "Une petite vidéo animée, sans voix, pour Instagram, TikTok et les stories.", features: ["Pour le téléphone, plein écran", "Des animations et des bruitages", "Une musique faite pour toi", "1 changement gratuit"] },
      { id: "s-pubv-longue", group: "Pubs vidéo", name: "Pub vidéo longue (1 min 30)", price: 289, video: "images/pubs/longue.mp4", videoSound: "images/pubs/longue-son.mp4", desc: "Un vrai petit film qui présente ton activité.", features: ["Jusqu'à 1 min 30", "Une histoire faite pour toi", "Musique et bruitages", "2 changements gratuits"] },
      { id: "s-pubv-pack", group: "Pubs vidéo", name: "Pack 3 pubs courtes", price: 335, video: "images/pubs/pack.mp4", videoSound: "images/pubs/pack-son.mp4", desc: "3 vidéos de styles différents, pour changer à chaque publication.", features: ["3 vidéos de 15 à 30 s", "Styles différents à alterner", "Le meilleur prix par pub"] },
      { id: "s-pubv-portfolio", group: "Pubs vidéo", name: "Pub style « portfolio tech »", price: 209, video: "images/pubs/portfolio.mp4", videoSound: "images/pubs/portfolio-son.mp4", desc: "Une vidéo moderne, comme celles qu'on voit partout sur les réseaux.", features: ["30 s plein écran", "Texte et visuels à ton image", "Musique originale"] },
      { id: "s-pubv-visuel", group: "Pubs vidéo", name: "Visuel animé (post ou bannière)", price: 35, qty: true, max: 30, video: "images/pubs/visuel.mp4", desc: "Une petite image qui bouge, pour un post ou une story.", features: ["Carré ou vertical", "5 à 8 secondes", "Tes couleurs et tes mots"] },
      { id: "s-pubv-stories", group: "Pubs vidéo", name: "Série de 5 stories animées", price: 85, video: "images/pubs/stories.mp4", desc: "5 stories qui se suivent pour annoncer une promo.", features: ["5 stories de 8 s", "Stickers et boutons animés", "Prêtes à publier"] },
      { id: "s-shoot-prod", group: "Photos & vidéo", name: "On vient photographier tes produits", price: 125, from: true, popular: true, desc: "On se déplace dans ton commerce pour photographier tes produits, plats ou créations.", features: ["Déplacement compris (au-delà : sur devis)", "1 h sur place", "20 photos de produits retouchées", "Prêtes pour le site et les réseaux"] },
      { id: "s-shoot-team", group: "Photos & vidéo", name: "Photos de ton équipe", price: 109, from: true, desc: "Portraits de toi et de ton équipe pour une page « Notre équipe » qui inspire confiance.", features: ["On se déplace chez toi", "Portrait de chaque personne", "Photo de groupe", "Retouche incluse"] },
      { id: "s-shoot-full", group: "Photos & vidéo", name: "Shooting complet : produits + lieu + équipe", price: 209, from: true, desc: "Tout en une seule visite : tes produits, ton lieu et ton équipe.", features: ["Demi-journée sur place", "40 photos retouchées", "Le meilleur prix par photo"] },
      { id: "s-photo-integ", group: "Photos & vidéo", name: "Mise en place de tes photos", price: 35, desc: "Tu nous envoies tes photos, même prises au téléphone. On s'occupe du reste.", features: ["On trie et on améliore tes photos", "Elles ne ralentissent pas ton site", "Jusqu'à 30 photos"] },
      { id: "s-packshot", group: "Photos & vidéo", name: "Photo de produit en plus", price: 8, qty: true, max: 100, desc: "Beaucoup de produits ? Ajoute des photos à ton shooting, sur fond propre ou en situation.", features: ["Fond blanc ou en situation", "Idéal pour une boutique en ligne"] },
      { id: "s-retouche", group: "Photos & vidéo", name: "Retouche photo", price: 4, qty: true, max: 200, desc: "On rend tes photos existantes plus belles et plus nettes.", features: ["Couleurs, lumière, netteté", "Détourage possible"] },
      { id: "s-banque", group: "Photos & vidéo", name: "Pack photos pro libres de droits", price: 39, desc: "En attendant tes propres photos : une sélection d'images professionnelles adaptées à ton métier.", features: ["15 photos choisies pour toi", "Utilisation autorisée sur ton site"] },
      { id: "s-video", group: "Photos & vidéo", name: "Vidéo de présentation", price: null, desc: "Une courte vidéo de ton commerce pour ton site et tes réseaux.", features: ["Tournage + montage", "Format site et format réseaux"] },

      { id: "s-logo", group: "Logo & identité", name: "Logo essentiel", price: 125, desc: "Un logo simple et facile à lire.", features: ["2 propositions", "2 retouches", "Tes fichiers prêts à utiliser"] },
      { id: "s-logo-pro", group: "Logo & identité", name: "Logo + identité visuelle", price: 289, popular: true, desc: "Ton logo, et tout ce qui va avec : couleurs, lettres, modèles.", features: ["3 propositions", "Autant de changements que tu veux", "Tes couleurs et tes lettres", "Plusieurs versions du logo", "Un petit guide pour l'utiliser"] },
      { id: "s-refonte-logo", group: "Logo & identité", name: "Modernisation de logo", price: 85, from: true, desc: "On rajeunit ton logo sans qu'il perde son air.", features: ["On le redessine proprement", "Des couleurs plus modernes"] },
      { id: "s-carte", group: "Logo & identité", name: "Carte de visite", price: 39, desc: "Recto-verso, prête à imprimer.", features: ["Prête à envoyer à l'imprimeur", "Un QR code vers ton site ou Instagram"] },

      { id: "s-affiche", group: "Affiches & print", name: "Affiche", price: 49, qty: true, max: 20, popular: true, desc: "Pour ta vitrine, un événement, une promo…", features: ["Grande (A3) ou normale (A4)", "1 changement gratuit", "Prête à imprimer"] },
      { id: "s-flyer", group: "Affiches & print", name: "Flyer recto-verso", price: 59, qty: true, max: 20, desc: "Pour distribuer ou laisser au comptoir.", features: ["Petit format (A5 ou A6)", "Prêt à imprimer"] },
      { id: "s-menu", group: "Affiches & print", name: "Carte / menu / tarifs", price: 75, from: true, desc: "Menu de restaurant, carte de prix, plaquette.", features: ["Bien rangé et facile à lire", "Facile à changer plus tard"] },
      { id: "s-impression", group: "Affiches & print", name: "Impression et livraison", price: null, desc: "On s'occupe de faire imprimer tes supports.", features: ["Papier au choix", "Prix selon la quantité"] },

      { id: "s-kit", group: "Réseaux sociaux", name: "Kit réseaux sociaux", price: 75, desc: "Photo de profil, bannières et couvertures à tes couleurs.", features: ["Instagram, Facebook, TikTok", "Des images pour tes stories à la une"] },
      { id: "s-templates", group: "Réseaux sociaux", name: "Modèles de publications", price: 99, desc: "10 modèles que tu peux réutiliser tout seul.", features: ["Pour les posts et les stories", "Tu les changes sur Canva"] },
      { id: "s-setup", group: "Réseaux sociaux", name: "On prépare tes comptes", price: 65, desc: "Tes comptes bien réglés, pour qu'on te trouve.", features: ["Ta description, tes liens", "On te conseille pour ta fiche Google"] },
      { id: "s-cm-1", group: "Réseaux sociaux", name: "Gestion des réseaux — Essentiel", price: 159, unit: "/mois", desc: "On publie à ta place chaque semaine.", features: ["8 publications par mois", "1 réseau", "Images et textes faits pour toi"] },
      { id: "s-cm-2", group: "Réseaux sociaux", name: "Gestion des réseaux — Pro", price: 325, unit: "/mois", popular: true, desc: "Tu es présent sur les réseaux, régulièrement.", features: ["12 publications + stories", "2 réseaux", "On répond aux messages", "Un résumé chaque mois"] },
      { id: "s-reel", group: "Réseaux sociaux", name: "Montage vidéo (Reel / TikTok)", price: 39, qty: true, max: 30, desc: "On monte tes vidéos : musique et sous-titres.", features: ["Jusqu'à 60 secondes", "Avec musique et sous-titres"] },
      { id: "s-boost", group: "Réseaux sociaux", name: "Boost de publications", price: 35, qty: true, max: 20, popular: true, desc: "On montre tes meilleures publications à plus de gens de ta ville. Prix par boost ; l'argent de la pub est en plus.", features: ["Les gens près de ton commerce", "On choisit la publication avec toi", "Un résumé des résultats"] },
      { id: "s-pub", group: "Réseaux sociaux", name: "Campagne de publicité", price: null, desc: "Des pubs Instagram et Facebook pour les gens près de chez toi.", features: ["Budget pub en plus", "Réglages et suivi"] }
    ]
  },

  /* ---------- PROMOTIONS ----------
     code     : le code que tape le client ("" => promo automatique, sans code)
     label    : nom affiché (ex : "Offre de lancement")
     type     : "percent" (%) ou "amount" (montant fixe)
     value    : valeur de la réduction
     on       : "all" (sur toute la commande) ou "plan" (sur la gamme seulement)
     active   : false => en pause
     start/end: dates "AAAA-MM-JJ" (vide = pas de limite)
     plans    : ids de gammes concernées ([] = toutes)
     minTotal : commande minimale pour que la promo marche (0 = aucun)
     auto     : true => s'applique toute seule, sans code */
  promos: [
    { code: "BIENVENUE", label: "Offre de lancement", type: "percent", value: 10, on: "all", active: true,  start: "", end: "", plans: [], minTotal: 0,   auto: false },
    { code: "PRO50",     label: "Commande pro",       type: "amount",  value: 50, on: "all", active: false, start: "", end: "", plans: [], minTotal: 500, auto: false }
  ],

  /* ---------- RÉGLAGES DE LA COMMANDE ---------- */
  order: {
    depositPercent: 30,    /* acompte demandé à la commande, en % (0 = ne pas afficher) */
    note: "On te demande une partie du prix au début (l'acompte). Le reste, tu le paies quand ton site te plaît.",
    intro: "NOUVELLE COMMANDE",
    askBusiness: true,     /* demander le nom de l'activité */
    askProject: true       /* demander la description du projet */
  },

  /* ---------- PROCESSUS ---------- */
  process: [
    { title: "Tu choisis",  text: "Tu prends ton site et ce que tu veux en plus. Puis tu envoies ta commande." },
    { title: "On discute",  text: "On te pose quelques questions : tes couleurs, tes photos, ce que tu aimes." },
    { title: "On fabrique",     text: "On te montre ton site. Tu dis ce que tu veux changer." },
    { title: "C'est en ligne !", text: "Tu dis OK, tu paies le reste, et tout le monde peut voir ton site." }
  ],

  /* ---------- RÉALISATIONS ----------
     Ce sont des maquettes de démonstration (cliquables). Remplace-les par tes
     vrais projets : tag = catégorie (sert au filtre), url = lien du site, image = capture d'écran PC,
     mobile = capture d'écran téléphone (facultatif). */
  /* ---------- NOS DESIGNS DE LOGOS ----------
     image : chemin de l'image (dossier images/logos/) · name : nom · sector : activité
     Section masquée si la liste est vide. */
  logos: {
    eyebrow: "Logos",
    title: "Voici nos designs de logos",
    text: "Chaque logo est dessiné pour un métier. On t'en fait un rien qu'à toi. Clique sur un logo pour le voir en grand.",
    note: "On te propose plusieurs logos, et on change jusqu'à ce qu'il te plaise.",
    cta: "Je veux mon logo",
    items: [
      { name: "LT Digital", sector: "Agence web", image: "images/logos/lt-digital.jpg" },
      { name: "Agrovia", sector: "Agriculture", image: "images/logos/agrovia.jpg" },
      { name: "Horizon Immo", sector: "Immobilier", image: "images/logos/horizon-immo.jpg" },
      { name: "Le Reflet", sector: "Barbier", image: "images/logos/le-reflet.jpg" },
      { name: "Green Clean", sector: "Nettoyage", image: "images/logos/green-clean.jpg" },
      { name: "Bella Pizza", sector: "Pizzeria", image: "images/logos/bella-pizza.jpg" },
      { name: "FitZone", sector: "Salle de sport", image: "images/logos/fitzone.jpg" },
      { name: "Nexa Tech", sector: "Informatique", image: "images/logos/nexa-tech.jpg" },
      { name: "Vesti'R", sector: "Prêt-à-porter", image: "images/logos/vestir.jpg" },
      { name: "Alp'Explor", sector: "Voyages", image: "images/logos/alp-explor.jpg" },
      { name: "Réno+", sector: "Rénovation", image: "images/logos/reno-plus.jpg" },
      { name: "Shoply", sector: "E-commerce", image: "images/logos/shoply.jpg" }
    ]
  },

  portfolio: [
    { name: "Le Comptoir", tag: "Restauration", category: "Restaurant · site de 3 pages", url: "demos/restaurant/index.html", image: "images/portfolio/restaurant.jpg", mobile: "images/portfolio/restaurant-mobile.jpg", features: ["Google Maps", "Réservation", "Notifications"], style: 1 },
    { name: "Maison Aurore", tag: "Commerces", category: "Boutique · site de 3 pages", url: "demos/boutique/index.html", image: "images/portfolio/boutique.jpg", mobile: "images/portfolio/boutique-mobile.jpg", style: 2 },
    { name: "PEAK Coaching", tag: "Services", category: "Coach sportif · site de 3 pages", url: "demos/coach/index.html", image: "images/portfolio/coach.jpg", mobile: "images/portfolio/coach-mobile.jpg", features: ["Réservation", "Notifications"], style: 3 },
    { name: "Barber Club 1925", tag: "Beauté & bien-être", category: "Barbier · site de 3 pages", url: "demos/barbier/index.html", image: "images/portfolio/barbier.jpg", mobile: "images/portfolio/barbier-mobile.jpg", features: ["Google Maps", "Prise de RDV", "Notifications"], style: 2 },
    { name: "Atelier Dubois", tag: "Artisans", category: "Menuiserie · site de 3 pages", url: "demos/artisan/index.html", image: "images/portfolio/artisan.jpg", mobile: "images/portfolio/artisan-mobile.jpg", style: 4 },
    { name: "La Fromagerie des Alpes", tag: "Commerces", category: "Fromagerie · site de 3 pages", url: "demos/fromagerie/index.html", image: "images/portfolio/fromagerie.jpg", mobile: "images/portfolio/fromagerie-mobile.jpg", style: 1 },
    { name: "Boucherie Maison Lefèvre", tag: "Commerces", category: "Boucherie · site de 3 pages", url: "demos/boucherie/index.html", image: "images/portfolio/boucherie.jpg", mobile: "images/portfolio/boucherie-mobile.jpg", style: 2 },
    { name: "Pizzeria Bella Napoli", tag: "Restauration", category: "Pizzeria · site de 3 pages", url: "demos/pizzeria/index.html", image: "images/portfolio/pizzeria.jpg", mobile: "images/portfolio/pizzeria-mobile.jpg", style: 3 },
    { name: "Boulangerie Le Fournil", tag: "Commerces", category: "Boulangerie · site de 3 pages", url: "demos/boulangerie/index.html", image: "images/portfolio/boulangerie.jpg", mobile: "images/portfolio/boulangerie-mobile.jpg", features: ["Google Maps"], style: 4 },
    { name: "Atelier Floral Camélia", tag: "Commerces", category: "Fleuriste · site de 3 pages", url: "demos/fleuriste/index.html", image: "images/portfolio/fleuriste.jpg", mobile: "images/portfolio/fleuriste-mobile.jpg", style: 1 },
    { name: "Garage Auto Performance", tag: "Services", category: "Garage auto · site de 3 pages", url: "demos/garage/index.html", image: "images/portfolio/garage.jpg", mobile: "images/portfolio/garage-mobile.jpg", style: 3 },
    { name: "Duval Plomberie & Chauffage", tag: "Artisans", category: "Plombier · site de 3 pages", url: "demos/plombier/index.html", image: "images/portfolio/plombier.jpg", mobile: "images/portfolio/plombier-mobile.jpg", style: 4 },
    { name: "Institut Éclat", tag: "Beauté & bien-être", category: "Institut de beauté · site de 3 pages", url: "demos/esthetique/index.html", image: "images/portfolio/esthetique.jpg", mobile: "images/portfolio/esthetique-mobile.jpg", style: 1 },
    { name: "Studio Lumière", tag: "Services", category: "Photographe · site de 3 pages", url: "demos/photographe/index.html", image: "images/portfolio/photographe.jpg", mobile: "images/portfolio/photographe-mobile.jpg", style: 2 },
    { name: "La Cave du Sommelier", tag: "Commerces", category: "Caviste · site de 3 pages", url: "demos/cave/index.html", image: "images/portfolio/cave.jpg", mobile: "images/portfolio/cave-mobile.jpg", style: 3 },
    { name: "Ink & Soul Tattoo", tag: "Beauté & bien-être", category: "Tatoueur · site de 3 pages", url: "demos/tatoueur/index.html", image: "images/portfolio/tatoueur.jpg", mobile: "images/portfolio/tatoueur-mobile.jpg", style: 4 }
  ],




  /* ---------- AVIS CLIENTS ----------
     Ajoute de VRAIS avis (avec l'accord du client). Liste vide = section cachée.
     Exemple : { name: "Jean D.", role: "Gérant", text: "Super travail !" } */
  /* Avis clients : ajoute-les depuis admin.html ▸ Avis clients (avec l'accord du client).
     rating = note sur 5 · site = lien vers son site · logo / image = chemin d'une image (ex : images/avis/logo-martin.png) */
  testimonials: [],
  reviewsForm: { show: true, title: "Tu es client ? Donne ton avis", text: "Raconte ce que tu as pensé de notre travail. On le lit avant de le publier." },

  /* ---------- GARANTIES ---------- */
  guarantees: [
    { title: "Tu es d'accord à chaque étape", text: "Rien n'est mis en ligne sans ton OK." },
    { icon: "⚡",  title: "Prêt vite",      text: "On dit quand ce sera prêt, et on le fait." },
    { title: "Rien que pour toi",          text: "On ne copie pas : ton site est le tien." },
    { title: "On répond vite",        text: "Tu écris, on te répond en général dans la journée." }
  ],

  /* ---------- TEXTES DU SITE (boutons, menus, formulaire…) ----------
     Modifie le texte que tu veux. Tout se change aussi depuis admin.html ▸ Textes du site. */
  texts: {
    nav_tarifs: "Tarifs", nav_comparatif: "Comparatif", nav_process: "Comment ça marche", nav_realisations: "Réalisations", nav_avis: "Avis", cmp_link: "Comparer les gammes côte à côte", cmp_pick: "Gammes à comparer", cmp_diff: "Seulement les différences", cmp_choose: "Choisir", mcta_btn: "Commander mon site", nav_faq: "Questions", nav_histoire: "Notre histoire", nav_insta: "Instagram", nav_cta: "Commander",
    badge_pop: "Notre conseil", nav_services: "Services", nav_search: "Rechercher", search_ph: "Cherche un prix, un service, une question…", search_empty: "Aucun résultat. Essaie « logo », « pub », « photo », « prix »…", pub_cta: "Envie d'une pub vidéo pour tes réseaux ? Animée, sans voix, avec musique : à partir de 125 €.", pub_cta_btn: "Voir les pubs vidéo", photo_cta: "Pas de belles photos ? On se déplace pour photographier tes produits et ton équipe, ou on retouche les tiennes.", photo_cta_btn: "Voir les offres photo", pick_none: "Pas de site", pick_none_sub: "Services seuls", label_monthly: "Abonnement mensuel", label_monthly_note: "Payé chaque mois, sans engagement au-delà du 1er mois.", label_services: "Photos, logo, affiches & réseaux", label_delivery: "Livraison :", label_from: "À partir de", label_delay_est: "Délai estimé :",
    order_plan: "1. Choisis ton site", order_opts: "2. Ajoute ce que tu veux", order_info: "3. Dis-nous qui tu es",
    f_name: "Ton nom", f_biz: "Nom de ton activité", f_contact: "Ton Instagram ou e-mail", f_project: "Décris ton projet",
    sum_title: "Récapitulatif", promo_btn: "Appliquer", sum_total: "Total", copy_btn: "Copier ma commande", insta_btn: "Ouvrir Instagram", mail_btn: "Envoyer par e-mail", cart_btn: "Voir ma commande",
    cgv_pre: "J'ai lu et j'accepte les", cgv_link: "conditions générales de vente", legal_mentions: "Mentions légales", legal_cgv: "CGV", legal_privacy: "Confidentialité", top_question: "Une question ? Écris-nous", top_mail_short: "E-mail", top_copy: "Copier le code", top_copied: "Copié !",
    final_title: "Ton site est prêt en {delivery}.", final_text: "Tu commandes en deux minutes. On te répond dans la journée.", final_btn: "Commander", final_insta: "Écrire sur Instagram", final_mail: "Nous écrire par e-mail"
  },

  /* ---------- FAQ ---------- */
  faq: [
    { q: "Combien de temps pour avoir mon site ?", a: "Ton site est prêt en {delivery}. Ça dépend du site que tu choisis et de la vitesse à laquelle tu nous réponds." },
    { q: "Comment je paie ?", a: "Tu paies une partie au début (l'acompte). Le reste, tu le paies quand ton site te plaît. On t'explique comment payer quand on discute." },
    { q: "Je veux juste un logo ou de l'aide sur mes réseaux. C'est possible ?", a: "Oui. Dans la commande, choisis « Pas de site », puis ce que tu veux (photos, logo, affiches, réseaux…). L'aide pour les réseaux se paie chaque mois." },
    { q: "Je n'ai pas de belles photos. C'est grave ?", a: "Non. On peut venir faire tes photos, ou arranger celles que tu as, ou te donner de belles photos en attendant (voir « Photos & vidéo »)." },
    { q: "Je peux demander des changements ?", a: "Oui. Chaque site inclut des changements gratuits. Après la livraison, l'option « On s'occupe de ton site » permet d'en faire d'autres." },
    { q: "Je n'ai pas de logo ni de textes. C'est grave ?", a: "Pas du tout. On peut créer ton logo et écrire tes textes à ta place (voir les options)." },
    { q: "J'ai déjà un site. Vous pouvez le refaire ?", a: "Oui, c'est « Refaire mon site » : un nouveau design, joli sur téléphone, plus rapide. On garde tes textes et tes photos." },
    { q: "Et si je veux quelque chose de très spécial ?", a: "Choisis « Sur mesure » : on discute de ton idée et on te donne un prix." }
  ],

  /* ---------- CONTACT ---------- */
  contact: {
    instagram: "https://www.instagram.com/l.t_digital",
    instagramHandle: "@l.t_digital",
    tiktok: "https://www.tiktok.com/@lenytimao",   /* compte TikTok (les QR codes et puces NFC des affiches passent par /tiktok) */
    email: "l.t.digital.rb@gmail.com"   // laisse "" pour cacher le bouton e-mail
  },

  footer: "Création & modernisation de sites web."
};
