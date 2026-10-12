/* =====================================================================
   ✏️  FICHIER À MODIFIER : tout le contenu du site est ici.
   Change les textes, les prix, les gammes… puis recharge la page.
   (Garde bien les guillemets "..." et les virgules.)
   Les prix et textes ci-dessous sont des EXEMPLES à adapter.
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---------- IDENTITÉ ---------- */
  brand: "L&T Digital",
  tagline: "Création & modernisation de sites web",
  logo: "images/logo-small.jpg",          // petit logo (barre du haut)
  logoBig: "images/logo.jpg",             // grand logo (pied de page)
  accent: "#2f6bff",                      // bleu du logo
  accent2: "#5ab6ff",

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
  vat: { mode: "ttc", rate: 20, note: "" },

  /* ---------- INFORMATIONS LÉGALES (pages Mentions légales, CGV, Confidentialité) ----------
     Remplis ce que tu peux : ce qui manque s'affiche "[à compléter]" sur les pages légales.
     ⚠ Ce sont des modèles : fais-les relire par un professionnel (expert-comptable, juriste). */
  legal: {
    company: { name: "L&T Digital", status: "", capital: "", address: "", siret: "", rcs: "", vatNumber: "", publisher: "", email: "l.t.digital.rb@gmail.com", phone: "" },
    hosting: { name: "", address: "", website: "" },
    mediator: { name: "", address: "", website: "" },
    cgv: { paymentMethods: "", city: "", extra: "" },
    updated: ""
  },

  /* ---------- MONNAIE ---------- */
  currency: { symbol: "€", after: true },   // after:true => "290 €"

  /* ---------- BANDEAU D'ANNONCE (laisse "" pour le cacher) ---------- */
  announce: "Offre de lancement : -10 % avec le code BIENVENUE",

  /* ---------- HERO (haut de page) ---------- */
  hero: {
    badge: "Création & modernisation de sites web",
    title: "Votre site web,",
    titleAccent: "livré en quelques jours.",
    text: "L&T Digital crée et modernise les sites des commerçants, artisans et indépendants. Un seul interlocuteur, un prix annoncé à l'avance, des retouches incluses.",
    cta1: "Voir les tarifs",
    cta2: "Commander",
    /* mots qui défilent sous le titre : « Pour les restaurants », puis « Pour les boulangeries »… (vide = rien) */
    rotatePrefix: "Pensé pour les",
    rotate: ["restaurants", "boulangeries", "boutiques", "artisans", "coiffeurs & barbiers", "garages", "fleuristes", "coachs"],
    /* petites coches sous les boutons */
    trust: ["Prix annoncé à l'avance", "Retouches incluses", "Livré en {delivery}"],
    /* petites notifications animées autour des images (exemples de ce que le site apporte) */
    notes: [
      { icon: "🔔", title: "Nouvelle réservation", text: "Table pour 4 · ce soir 20 h" },
      { icon: "✓", title: "Ton site est en ligne", text: "Livré en {delivery}" },
      { icon: "★", title: "Nouvel avis client", text: "« Super site, très clair ! »" }
    ],
    /* images du haut de page (captures de tes maquettes) */
    visual: { a: "images/portfolio/restaurant.jpg", b: "images/portfolio/boutique.jpg", phone: "images/portfolio/coach-mobile.jpg" }
  },


  /* ---------- POURQUOI UN VRAI SITE (argumentaire) ----------
     icon : search, shield, clock, time, home, growth */
  why: {
    eyebrow: "Pourquoi un vrai site",
    title: "Ton site travaille pour toi, même quand tu es fermé.",
    intro: "Aujourd'hui, avant de pousser ta porte, tes clients te cherchent sur internet. Ce qu'ils y trouvent décide s'ils viennent… ou s'ils vont chez le voisin.",
    items: [
      { icon: "search", title: "Être trouvé sur Google", text: "Quand quelqu'un tape « boulangerie près de chez moi » ou « plombier à côté », ce sont les commerces avec un site qui sortent. Sans site, ces clients partent chez tes concurrents." },
      { icon: "shield", title: "Inspirer confiance tout de suite", text: "Un site propre, rapide et à jour rassure avant même la première visite. Un site vieillot, lent ou absent donne l'impression que l'activité n'est pas sérieuse." },
      { icon: "clock", title: "Ouvert 24 h/24, 7 j/7", text: "Horaires, carte, tarifs, adresse, photos : tout est consultable à toute heure. Les réservations, commandes et demandes de devis arrivent même la nuit." },
      { icon: "time", title: "Moins d'appels, plus de temps", text: "Les questions qui reviennent (horaires, prix, accès) trouvent leur réponse sur le site. Tu passes moins de temps au téléphone et plus sur ton métier." },
      { icon: "home", title: "Une vitrine qui t'appartient", text: "Les réseaux sociaux changent leurs règles et peuvent bloquer un compte. Ton site, c'est chez toi : ton nom, ton adresse web, tes règles." },
      { icon: "growth", title: "Plus de clients, plus de chiffre", text: "Un client qui trouve facilement ce qu'il cherche passe à l'action : il appelle, réserve, commande ou vient en boutique. C'est un investissement, pas une dépense." }
    ],
    withoutTitle: "Sans site (ou avec un vieux site)",
    without: ["Invisible quand on te cherche sur Google", "Des clients qui doutent et vont ailleurs", "Des appels à répétition pour les mêmes questions", "Dépendant des réseaux sociaux", "Aucune vente ou réservation en dehors des horaires"],
    withTitle: "Avec un site L&T Digital",
    with: ["Trouvé par les clients près de chez toi", "Une image pro qui donne envie de venir", "Infos, prix et horaires toujours à jour", "Ta propre vitrine, à ton nom", "Réservations, commandes et devis 24 h/24"],
    cta: "Je veux mon site"
  },

  /* ---------- CHIFFRES CLÉS (supprime les lignes inutiles) ---------- */
  stats: [
    { value: "{delivery}",  label: "Délai de livraison de ton site" },
    { value: "1", label: "seul interlocuteur, de A à Z" },
    { value: "100%", label: "Adapté au mobile et à la tablette" },
    { value: "7j/7", label: "Support après livraison" }
  ],

  /* ---------- NOTRE HISTOIRE (fin de page) ----------
     paragraphs : un texte par paragraphe ; founders : photo = chemin d'une image (ex "images/fondateur-l.jpg"),
     vide = pastille avec l'initiale (champ initial). Modifie tout depuis admin.html ▸ Notre histoire. */
  story: {
    eyebrow: "Notre histoire",
    title: "Deux fondateurs, un même objectif : des sites à l'image de chaque commerce.",
    paragraphs: [
      "L&T Digital est née d'une idée simple : les commerçants, artisans et indépendants méritent un site aussi soigné que leur travail, sans jargon et sans prix cachés.",
      "Nous avons fondé L&T Digital pour proposer des sites modernes, rapides et sur mesure, avec un seul interlocuteur du premier échange jusqu'à la mise en ligne.",
      "Aujourd'hui, nous créons de nouveaux sites et nous modernisons ceux qui ont vieilli, pour que chaque entreprise ait une vitrine à la hauteur de ce qu'elle propose."
    ],
    founders: [
      { name: "Prénom du fondateur L", initial: "L", role: "Cofondateur", text: "À compléter : son parcours, ce qu'il aime dans ce métier et son rôle chez L&T Digital.", photo: "" },
      { name: "Prénom du fondateur T", initial: "T", role: "Cofondateur", text: "À compléter : son parcours, ce qu'il aime dans ce métier et son rôle chez L&T Digital.", photo: "" }
    ],
    values: [
      { title: "Clarté", text: "Des prix annoncés, des étapes expliquées, aucune mauvaise surprise." },
      { title: "Soin", text: "Chaque site est dessiné pour une activité précise, jamais copié-collé." },
      { title: "Proximité", text: "Un échange direct avec les fondateurs, avant, pendant et après le projet." }
    ]
  },

  /* ---------- SECTIONS : afficher / masquer / renommer ----------
     Chaque bloc de la page. show:false => la section disparaît (et son lien du menu).
     Laisse title/subtitle vides ("") pour garder le texte par défaut. */
  sections: {
    tarifs:       { show: true, eyebrow: "Tarifs",       title: "", subtitle: "" },
    comparatif:   { show: true, eyebrow: "Comparatif",   title: "", subtitle: "" },
    options:      { show: true, eyebrow: "Options",      title: "", subtitle: "" },
    services:     { show: true, eyebrow: "Photos, logo, affiches & réseaux" },
    process:      { show: true, eyebrow: "Processus",    title: "", subtitle: "" },
    realisations: { show: true, eyebrow: "Réalisations", title: "", subtitle: "" },
    pourquoi:     { show: true, eyebrow: "Pourquoi un vrai site" },
    avis:         { show: true, eyebrow: "Avis",         title: "", subtitle: "" },
    commande:     { show: true, eyebrow: "Commande",     title: "", subtitle: "" },
    faq:          { show: true, eyebrow: "FAQ",          title: "", subtitle: "" },
    histoire:     { show: true, eyebrow: "Notre histoire", title: "", subtitle: "" }
  },

  /* ---------- GAMMES / TARIFS ----------
     unit      : texte après le prix (ex: "/mois") — facultatif
     group     : nom d'un groupe (ex: "Sites", "Boutiques") — si tu en mets
                 plusieurs, des boutons de filtre apparaissent
     id        : identifiant unique (sans espace)
     price     : prix (nombre) — null pour afficher "Sur devis"
     from      : true => affiche "À partir de"
     popular   : true => mise en avant "Le plus choisi"
     features  : liste ; "!" au début = ligne barrée (non incluse)
  */
  plans: [
    {
      id: "express", name: "Page Express", tagline: "Une page, l'essentiel, vite.",
      price: 99, from: false, delay: "", popular: false, cta: "Choisir Express",
      features: [
        "1 page unique responsive",
        "Présentation + contact",
        "Design aux couleurs de ton activité",
        "1 retouche incluse",
        "!Plusieurs pages",
        "!Formulaire de contact avancé"
      ]
    },
    {
      id: "vitrine", name: "Site Vitrine", tagline: "Le choix idéal pour une entreprise.",
      price: 290, from: false, delay: "", popular: true, cta: "Choisir Vitrine",
      features: [
        "Jusqu'à 5 pages (Accueil, Services, À propos, Galerie, Contact)",
        "Design premium sur mesure",
        "Formulaire de contact",
        "Optimisation Google de base (SEO)",
        "3 retouches incluses",
        "Support 7 jours après livraison"
      ]
    },
    {
      id: "complet", name: "Site Complet", tagline: "Boutique, réservation, tout-en-un.",
      price: 690, from: true, delay: "", popular: false, cta: "Choisir Complet",
      features: [
        "Jusqu'à 10 pages",
        "Boutique en ligne ou système de réservation",
        "Animations et design haut de gamme",
        "SEO avancé + Google Analytics",
        "Retouches illimitées pendant la création",
        "Support prioritaire 30 jours"
      ]
    },
    {
      id: "refonte", name: "Refonte de site", tagline: "On modernise ton site existant.",
      price: 190, from: true, delay: "selon le site", popular: false, cta: "Moderniser mon site",
      features: [
        "Audit de ton site actuel",
        "Nouveau design moderne et responsive",
        "Conservation de tes contenus",
        "Amélioration de la vitesse",
        "2 retouches incluses",
        "!Nouvelles fonctionnalités (en option)"
      ]
    },
    {
      id: "surmesure", name: "Sur mesure", tagline: "Un projet unique ? On en parle.",
      price: null, from: false, delay: "selon projet", popular: false, cta: "Demander un devis",
      features: [
        "Fonctionnalités spécifiques",
        "Identité visuelle complète",
        "Suivi dédié du projet",
        "Maintenance sur demande"
      ]
    }
  ],

  /* ---------- TABLEAU COMPARATIF ----------
     true (✔), false (✘) ou un texte. Les clés = les "id" des gammes. */
  compare: [
    { label: "Nombre de pages",         values: { express: "1", vitrine: "5", complet: "10", refonte: "Existant", surmesure: "Illimité" } },
    { label: "Design sur mesure",       values: { express: true, vitrine: true, complet: true, refonte: true, surmesure: true } },
    { label: "Responsive (mobile)",     values: { express: true, vitrine: true, complet: true, refonte: true, surmesure: true } },
    { label: "Formulaire de contact",   values: { express: false, vitrine: true, complet: true, refonte: true, surmesure: true } },
    { label: "SEO (Google)",            values: { express: false, vitrine: "Base", complet: "Avancé", refonte: "Base", surmesure: "Avancé" } },
    { label: "Boutique / réservation",  values: { express: false, vitrine: false, complet: true, refonte: false, surmesure: true } },
    { label: "Retouches incluses",      values: { express: "1", vitrine: "3", complet: "Illimitées", refonte: "2", surmesure: "Illimitées" } },
    { label: "Support après livraison", values: { express: "—", vitrine: "7 jours", complet: "30 jours", refonte: "7 jours", surmesure: "Au choix" } }
  ],

  /* ---------- OPTIONS / SUPPLÉMENTS ----------
     price    : prix (null => sur devis) ; from:true => affiché "dès"
     group    : rubrique (les options sont rangées par rubrique pour rester lisibles)
     popular  : true => mise en avant dans "Populaires" (affichée en premier)
     qty      : true => le client choisit une quantité (max = plafond)
     plans    : liste d'id de gammes pour lesquelles l'option existe ([] = toutes)
     included : liste d'id de gammes où l'option est déjà incluse (gratuite)
     tag      : badge facultatif (sinon "Populaire" si popular) */
  addons: [
    { id: "reservation", name: "Réservation en ligne", price: 140, from: true, group: "Fonctionnalités", popular: true, qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Rendez-vous ou tables réservés directement sur le site." },
    { id: "boutique", name: "Boutique en ligne / catalogue", price: 150, from: true, group: "Fonctionnalités", popular: true, qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Présente et vends tes produits en ligne." },
    { id: "domain", name: "Nom de domaine + hébergement (1 an)", price: 60, group: "Mise en ligne & visibilité", popular: true, qty: false, plans: [], included: [], tag: "", desc: "On s'occupe de toute la mise en ligne." },
    { id: "seo", name: "Optimisation Google (SEO)", price: 70, group: "Mise en ligne & visibilité", popular: true, qty: false, plans: [], included: [], tag: "", desc: "Pour mieux apparaître dans les recherches." },
    { id: "maint", name: "Maintenance (1 mois)", price: 30, group: "Service & rapidité", popular: true, qty: false, plans: [], included: [], tag: "", desc: "Mises à jour et petites modifications." },
    { id: "page", name: "Page supplémentaire", price: 40, group: "Contenu & visuel", qty: true, max: 20, plans: ["vitrine","complet","refonte"], included: [], tag: "", desc: "Ajoute autant de pages que nécessaire." },
    { id: "logo", name: "Création de logo", price: 80, group: "Contenu & visuel", qty: false, plans: [], included: ["complet"], tag: "", desc: "Un logo propre à ton activité." },
    { id: "texte", name: "Rédaction des textes", price: 70, group: "Contenu & visuel", qty: false, plans: [], included: [], tag: "", desc: "Des contenus clairs et percutants." },
    { id: "photos", name: "Séance photo ou retouche des photos", price: 120, group: "Contenu & visuel", qty: false, plans: [], included: [], tag: "", desc: "Des photos soignées pour ton site." },
    { id: "galerie", name: "Galerie photo / portfolio", price: 60, group: "Contenu & visuel", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Montre tes réalisations en images." },
    { id: "traduction", name: "Traduction du site (anglais)", price: 90, group: "Contenu & visuel", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Ton site dans une deuxième langue." },
    { id: "video", name: "Vidéo de présentation intégrée", price: null, group: "Contenu & visuel", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Une vidéo mise en valeur sur ton site." },
    { id: "paiement", name: "Paiement en ligne", price: null, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Encaisse tes clients directement sur le site." },
    { id: "devisform", name: "Formulaire de devis / commande avancé", price: 60, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Reçois des demandes complètes et bien ordonnées." },
    { id: "whatsapp", name: "Bouton WhatsApp / Instagram", price: 30, group: "Fonctionnalités", qty: false, plans: [], included: [], tag: "", desc: "Un contact direct en un clic." },
    { id: "newsletter", name: "Inscription à la newsletter", price: 60, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Récupère les e-mails de tes visiteurs." },
    { id: "avis", name: "Affichage des avis clients", price: 45, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Mets en avant les retours de tes clients." },
    { id: "carte", name: "Carte interactive + « ouvert maintenant »", price: 30, group: "Fonctionnalités", qty: false, plans: [], included: [], tag: "", desc: "Plan, horaires et statut ouvert/fermé en direct." },
    { id: "blog", name: "Blog / actualités modifiable", price: 90, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Publie des nouvelles facilement." },
    { id: "espace", name: "Espace client / connexion", price: null, group: "Fonctionnalités", qty: false, plans: ["vitrine","complet","refonte","surmesure"], included: [], tag: "", desc: "Un espace privé pour tes clients." },
    { id: "spec", name: "Fonctionnalité spéciale", price: null, group: "Fonctionnalités", qty: false, plans: [], included: [], tag: "", desc: "Un besoin particulier ? On chiffre ensemble." },
    { id: "email", name: "Adresse e-mail professionnelle", price: 45, group: "Mise en ligne & visibilité", qty: false, plans: [], included: [], tag: "", desc: "contact@tonsite avec ton nom de domaine." },
    { id: "gbp", name: "Fiche Google Business Profile", price: 60, group: "Mise en ligne & visibilité", qty: false, plans: [], included: [], tag: "", desc: "Ta fiche Google soignée (Maps et recherches)." },
    { id: "reseaux", name: "Création des comptes réseaux sociaux", price: 60, group: "Mise en ligne & visibilité", qty: false, plans: [], included: [], tag: "", desc: "Instagram, Facebook… prêts à l'emploi." },
    { id: "analytics", name: "Statistiques de visites", price: 30, group: "Mise en ligne & visibilité", qty: false, plans: [], included: [], tag: "", desc: "Sais combien de personnes visitent ton site." },
    { id: "urgent", name: "Livraison express", price: 100, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "Ton projet passe en priorité." },
    { id: "modifs", name: "Modifications illimitées (1 mois)", price: 45, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "Change ce que tu veux après la livraison." },
    { id: "formation", name: "Formation (30 min en visio)", price: 45, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "Je t'apprends à modifier ton site toi-même." },
    { id: "secu", name: "Sauvegardes + sécurité (1 mois)", price: 15, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "Ton site protégé et sauvegardé." },
    { id: "evol", name: "Pack d'évolution annuel", price: null, group: "Service & rapidité", qty: false, plans: [], included: [], tag: "", desc: "De nouvelles fonctionnalités chaque année." }
  ],




  /* ---------- LOGO, AFFICHES & RÉSEAUX SOCIAUX ----------
     Prestations vendues avec OU sans site (le client peut choisir « Pas de site »).
     group   : onglet où ranger la prestation
     price   : prix (null = « Sur devis ») · from : true = « dès »
     unit    : "/mois" = abonnement (affiché à part, pas dans le total à payer tout de suite)
     qty     : true = le client choisit une quantité (max = maximum)
     popular : true = mise en avant · features : petites lignes « ce qui est inclus » */
  services: {
    eyebrow: "Photos, logo, affiches & réseaux",
    title: "Toute ton image, pas seulement ton site",
    intro: "On équipe ton site avec de vraies photos, on crée ton logo, tes affiches et on gère tes réseaux : avec ton site ou sans site, tu prends seulement ce dont tu as besoin.",
    items: [
      { id: "s-photo-integ", group: "Photos & vidéo", name: "Mise en place de tes photos", price: 39, desc: "Tu nous envoies tes photos (même prises au téléphone), on s'occupe du reste.", features: ["Tri, recadrage et luminosité", "Optimisées pour un site rapide", "Jusqu'à 30 photos"] },
      { id: "s-shooting", group: "Photos & vidéo", name: "Shooting photo sur place", price: 190, from: true, popular: true, desc: "On vient dans ton commerce photographier tes produits, ton lieu et ton équipe.", features: ["1 h sur place", "20 photos retouchées", "Prêtes pour le site et les réseaux"] },
      { id: "s-packshot", group: "Photos & vidéo", name: "Photos de produits", price: 9, qty: true, max: 100, desc: "Tes produits sur fond propre, comme dans les grandes boutiques.", features: ["Fond blanc ou en situation", "Idéal pour une boutique en ligne"] },
      { id: "s-retouche", group: "Photos & vidéo", name: "Retouche photo", price: 5, qty: true, max: 200, desc: "On rend tes photos existantes plus belles et plus nettes.", features: ["Couleurs, lumière, netteté", "Détourage possible"] },
      { id: "s-banque", group: "Photos & vidéo", name: "Pack photos pro libres de droits", price: 49, desc: "En attendant tes propres photos : une sélection d'images professionnelles adaptées à ton métier.", features: ["15 photos choisies pour toi", "Utilisation autorisée sur ton site"] },
      { id: "s-video", group: "Photos & vidéo", name: "Vidéo de présentation", price: null, desc: "Une courte vidéo de ton commerce pour ton site et tes réseaux.", features: ["Tournage + montage", "Format site et format réseaux"] },

      { id: "s-logo", group: "Logo & identité", name: "Logo essentiel", price: 149, desc: "Un logo simple et lisible pour ton activité.", features: ["2 propositions", "2 retouches", "Fichiers PNG, JPG et PDF"] },
      { id: "s-logo-pro", group: "Logo & identité", name: "Logo + identité visuelle", price: 349, popular: true, desc: "Ton logo et tout ce qui va autour pour une image pro et cohérente.", features: ["3 propositions", "Retouches illimitées (raisonnables)", "Couleurs et typographies", "Versions claire / foncée / icône", "Mini charte graphique"] },
      { id: "s-refonte-logo", group: "Logo & identité", name: "Modernisation de logo", price: 99, from: true, desc: "On rafraîchit ton logo existant sans perdre ton identité.", features: ["Nettoyage et vectorisation", "Couleurs modernisées"] },
      { id: "s-carte", group: "Logo & identité", name: "Carte de visite", price: 49, desc: "Recto-verso, prête à imprimer.", features: ["Fichier imprimeur (PDF)", "QR code vers ton site ou Instagram"] },

      { id: "s-affiche", group: "Affiches & print", name: "Affiche", price: 59, qty: true, max: 20, popular: true, desc: "Pour ta vitrine, un événement, une promo…", features: ["Format A3 / A4", "1 retouche", "Fichier prêt à imprimer"] },
      { id: "s-flyer", group: "Affiches & print", name: "Flyer recto-verso", price: 69, qty: true, max: 20, desc: "Pour distribuer ou laisser au comptoir.", features: ["Format A5 / A6", "Fichier prêt à imprimer"] },
      { id: "s-menu", group: "Affiches & print", name: "Carte / menu / tarifs", price: 89, from: true, desc: "Menu de restaurant, carte de prix, plaquette.", features: ["Mise en page claire", "Facile à mettre à jour"] },
      { id: "s-impression", group: "Affiches & print", name: "Impression et livraison", price: null, desc: "On s'occupe de faire imprimer tes supports.", features: ["Papier au choix", "Prix selon la quantité"] },

      { id: "s-kit", group: "Réseaux sociaux", name: "Kit réseaux sociaux", price: 89, desc: "Photo de profil, bannières et couvertures à tes couleurs.", features: ["Instagram, Facebook, TikTok", "Couvertures de stories à la une"] },
      { id: "s-templates", group: "Réseaux sociaux", name: "Modèles de publications", price: 119, desc: "10 modèles que tu réutilises toi-même facilement.", features: ["Posts et stories", "Modifiables sur Canva"] },
      { id: "s-setup", group: "Réseaux sociaux", name: "Création / optimisation de comptes", price: 79, desc: "Comptes bien configurés pour être trouvé.", features: ["Bio, liens, catégories", "Fiche Google conseillée"] },
      { id: "s-cm-1", group: "Réseaux sociaux", name: "Gestion des réseaux — Essentiel", price: 190, unit: "/mois", desc: "On publie pour toi chaque semaine.", features: ["8 publications / mois", "1 réseau", "Visuels et textes rédigés"] },
      { id: "s-cm-2", group: "Réseaux sociaux", name: "Gestion des réseaux — Pro", price: 390, unit: "/mois", popular: true, desc: "Une présence active et régulière.", features: ["12 publications + stories", "2 réseaux", "Réponses aux messages", "Bilan chaque mois"] },
      { id: "s-reel", group: "Réseaux sociaux", name: "Montage vidéo (Reel / TikTok)", price: 49, qty: true, max: 30, desc: "Tes vidéos montées, rythmées et sous-titrées.", features: ["Jusqu'à 60 secondes", "Musique et sous-titres"] },
      { id: "s-pub", group: "Réseaux sociaux", name: "Campagne de publicité", price: null, desc: "Pubs Instagram / Facebook ciblées autour de chez toi.", features: ["Budget pub en plus", "Réglages et suivi"] }
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
    note: "Un acompte est demandé au démarrage, le solde à la validation du site.",
    intro: "NOUVELLE COMMANDE",
    askBusiness: true,     /* demander le nom de l'activité */
    askProject: true       /* demander la description du projet */
  },

  /* ---------- PROCESSUS ---------- */
  process: [
    { title: "Tu choisis",  text: "Sélectionne ta gamme et tes options, puis envoie ta commande." },
    { title: "On échange",  text: "On te contacte pour cadrer ton besoin : style, couleurs, contenu." },
    { title: "On crée",     text: "Tu reçois une première version et tu demandes les retouches voulues." },
    { title: "Mise en ligne", text: "Tu valides, tu règles le solde, et ton site est en ligne." }
  ],

  /* ---------- RÉALISATIONS ----------
     Ce sont des maquettes de démonstration (cliquables). Remplace-les par tes
     vrais projets : tag = catégorie (sert au filtre), url = lien du site, image = capture d'écran PC,
     mobile = capture d'écran téléphone (facultatif). */
  portfolio: [
    { name: "Le Comptoir", tag: "Restauration", category: "Restaurant · site de 3 pages", url: "demos/restaurant/index.html", image: "images/portfolio/restaurant.jpg", mobile: "images/portfolio/restaurant-mobile.jpg", style: 1 },
    { name: "Maison Aurore", tag: "Commerces", category: "Boutique · site de 3 pages", url: "demos/boutique/index.html", image: "images/portfolio/boutique.jpg", mobile: "images/portfolio/boutique-mobile.jpg", style: 2 },
    { name: "PEAK Coaching", tag: "Services", category: "Coach sportif · site de 3 pages", url: "demos/coach/index.html", image: "images/portfolio/coach.jpg", mobile: "images/portfolio/coach-mobile.jpg", style: 3 },
    { name: "Atelier Dubois", tag: "Artisans", category: "Menuiserie · site de 3 pages", url: "demos/artisan/index.html", image: "images/portfolio/artisan.jpg", mobile: "images/portfolio/artisan-mobile.jpg", style: 4 },
    { name: "La Fromagerie des Alpes", tag: "Commerces", category: "Fromagerie · site de 3 pages", url: "demos/fromagerie/index.html", image: "images/portfolio/fromagerie.jpg", mobile: "images/portfolio/fromagerie-mobile.jpg", style: 1 },
    { name: "Boucherie Maison Lefèvre", tag: "Commerces", category: "Boucherie · site de 3 pages", url: "demos/boucherie/index.html", image: "images/portfolio/boucherie.jpg", mobile: "images/portfolio/boucherie-mobile.jpg", style: 2 },
    { name: "Pizzeria Bella Napoli", tag: "Restauration", category: "Pizzeria · site de 3 pages", url: "demos/pizzeria/index.html", image: "images/portfolio/pizzeria.jpg", mobile: "images/portfolio/pizzeria-mobile.jpg", style: 3 },
    { name: "Boulangerie Le Fournil", tag: "Commerces", category: "Boulangerie · site de 3 pages", url: "demos/boulangerie/index.html", image: "images/portfolio/boulangerie.jpg", mobile: "images/portfolio/boulangerie-mobile.jpg", style: 4 },
    { name: "Atelier Floral Camélia", tag: "Commerces", category: "Fleuriste · site de 3 pages", url: "demos/fleuriste/index.html", image: "images/portfolio/fleuriste.jpg", mobile: "images/portfolio/fleuriste-mobile.jpg", style: 1 },
    { name: "Barber Club 1925", tag: "Beauté & bien-être", category: "Barbier · site de 3 pages", url: "demos/barbier/index.html", image: "images/portfolio/barbier.jpg", mobile: "images/portfolio/barbier-mobile.jpg", style: 2 },
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
  reviewsForm: { show: true, title: "Tu es client ? Laisse ton avis", text: "Raconte ton expérience et montre ton site ou ton logo. Ton avis sera publié après vérification." },

  /* ---------- GARANTIES ---------- */
  guarantees: [
    { title: "Satisfait ou retouché", text: "Tu valides chaque étape avant la mise en ligne." },
    { icon: "⚡",  title: "Livraison rapide",      text: "Des délais annoncés, et tenus." },
    { title: "100 % unique",          text: "Aucun modèle réutilisé : ton site est le tien." },
    { title: "Réponse rapide",        text: "Un message et on te répond en général dans la journée." }
  ],

  /* ---------- TEXTES DU SITE (boutons, menus, formulaire…) ----------
     Modifie le texte que tu veux. Tout se change aussi depuis admin.html ▸ Textes du site. */
  texts: {
    nav_tarifs: "Tarifs", nav_comparatif: "Comparatif", nav_process: "Méthode", nav_realisations: "Réalisations", nav_avis: "Avis", cmp_link: "Comparer les gammes côte à côte", cmp_pick: "Gammes à comparer", cmp_diff: "Seulement les différences", cmp_choose: "Choisir", mcta_btn: "Commander mon site", nav_faq: "Questions", nav_histoire: "Notre histoire", nav_insta: "Instagram", nav_cta: "Commander",
    badge_pop: "Le plus choisi", nav_services: "Services", photo_cta: "Pas de belles photos ? On équipe ton site : shooting, retouche, photos de produits ou pack de photos pro.", photo_cta_btn: "Voir les offres photo", pick_none: "Pas de site", pick_none_sub: "Services seuls", label_monthly: "Abonnement mensuel", label_monthly_note: "Payé chaque mois, sans engagement au-delà du 1er mois.", label_services: "Photos, logo, affiches & réseaux", label_delivery: "Livraison :", label_from: "À partir de", label_delay_est: "Délai estimé :",
    order_plan: "Ta gamme", order_opts: "Tes options", order_info: "Tes informations",
    f_name: "Ton nom", f_biz: "Nom de ton activité", f_contact: "Ton Instagram ou e-mail", f_project: "Décris ton projet",
    sum_title: "Récapitulatif", promo_btn: "Appliquer", sum_total: "Total", copy_btn: "Copier ma commande", insta_btn: "Ouvrir Instagram", mail_btn: "Envoyer par e-mail", cart_btn: "Voir ma commande",
    cgv_pre: "J'ai lu et j'accepte les", cgv_link: "conditions générales de vente", legal_mentions: "Mentions légales", legal_cgv: "CGV", legal_privacy: "Confidentialité", top_question: "Une question ? Écris-nous", top_mail_short: "E-mail", top_copy: "Copier le code", top_copied: "Copié !",
    final_title: "Un site pour ton activité, livré en {delivery}.", final_text: "Commande en deux minutes. On revient vers toi dans la journée.", final_btn: "Commander", final_insta: "Écrire sur Instagram", final_mail: "Nous écrire par e-mail"
  },

  /* ---------- FAQ ---------- */
  faq: [
    { q: "Combien de temps pour recevoir mon site ?", a: "Ton site est livré en {delivery}, selon la gamme et la rapidité de tes retours." },
    { q: "Comment se passe le paiement ?", a: "Un acompte est demandé au démarrage, le solde à la validation du site. Les moyens de paiement te sont précisés lors de notre échange." },
    { q: "Je n'ai pas besoin de site, juste d'un logo ou d'aide sur mes réseaux. C'est possible ?", a: "Oui. Dans la commande, choisis « Pas de site » puis les prestations voulues (photos, logo, affiches, gestion des réseaux…). Les abonnements réseaux sont payés chaque mois." },
    { q: "Je n'ai pas de belles photos, c'est un problème ?", a: "Non. On peut retoucher et mettre en place tes photos, venir faire un shooting dans ton commerce, ou t'équiper d'un pack de photos pro en attendant (voir « Photos & vidéo »)." },
    { q: "Puis-je demander des modifications ?", a: "Oui. Chaque gamme inclut des retouches, et l'option maintenance permet des changements après la livraison." },
    { q: "Je n'ai pas de logo ni de textes, c'est un problème ?", a: "Pas du tout. On peut créer ton logo et rédiger tes textes (voir les options et la partie « Logo, affiches & réseaux »)." },
    { q: "J'ai déjà un site, vous pouvez le moderniser ?", a: "Oui, c'est la gamme « Refonte de site » : nouveau design, mobile, vitesse, en gardant tes contenus." },
    { q: "Et si j'ai un besoin très particulier ?", a: "Choisis « Sur mesure » : on discute de ton projet et on te propose un devis." }
  ],

  /* ---------- CONTACT ---------- */
  contact: {
    instagram: "https://www.instagram.com/l.t_digital",
    instagramHandle: "@l.t_digital",
    email: "l.t.digital.rb@gmail.com"   // laisse "" pour cacher le bouton e-mail
  },

  footer: "Création & modernisation de sites web."
};
