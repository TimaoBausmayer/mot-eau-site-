/* =====================================================================
   ✏️  FICHIER À MODIFIER : tout le contenu du site est ici.
   Change les textes, les prix, les gammes… puis recharge la page.
   (Garde bien les guillemets "..." et les virgules.)
   Les prix et textes ci-dessous sont des EXEMPLES à adapter.
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---------- IDENTITÉ ---------- */
  brand: "LT Digital",
  tagline: "Création & modernisation de sites web",
  logo: "images/logo-small.jpg",          // petit logo (barre du haut)
  logoBig: "images/logo.jpg",             // grand logo (pied de page)
  accent: "#2f6bff",                      // bleu du logo
  accent2: "#5ab6ff",

  /* ---------- MONNAIE ---------- */
  currency: { symbol: "€", after: true },   // after:true => "290 €"

  /* ---------- BANDEAU D'ANNONCE (laisse "" pour le cacher) ---------- */
  announce: "🔥 Offre de lancement : -10 % avec le code BIENVENUE",

  /* ---------- HERO (haut de page) ---------- */
  hero: {
    badge: "Création & modernisation de sites web",
    title: "Un site web professionnel qui",
    titleAccent: "fait la différence.",
    text: "Sites vitrines, boutiques en ligne, refonte de site existant… LT Digital conçoit des sites modernes, rapides et sur mesure pour les entrepreneurs, artisans, associations et créateurs.",
    cta1: "Voir les tarifs",
    cta2: "Commander maintenant"
  },

  /* ---------- CHIFFRES CLÉS (supprime les lignes inutiles) ---------- */
  stats: [
    { value: "48h",  label: "Délai de livraison dès 1 page" },
    { value: "100%", label: "Sur mesure, jamais de copier-coller" },
    { value: "Mobile", label: "Sites adaptés mobile & tablette" },
    { value: "7j/7", label: "Support après livraison" }
  ],

  /* ---------- SECTIONS : afficher / masquer / renommer ----------
     Chaque bloc de la page. show:false => la section disparaît (et son lien du menu).
     Laisse title/subtitle vides ("") pour garder le texte par défaut. */
  sections: {
    tarifs:       { show: true, eyebrow: "Tarifs",       title: "", subtitle: "" },
    comparatif:   { show: true, eyebrow: "Comparatif",   title: "", subtitle: "" },
    options:      { show: true, eyebrow: "Options",      title: "", subtitle: "" },
    process:      { show: true, eyebrow: "Processus",    title: "", subtitle: "" },
    realisations: { show: true, eyebrow: "Réalisations", title: "", subtitle: "" },
    avis:         { show: true, eyebrow: "Avis",         title: "", subtitle: "" },
    commande:     { show: true, eyebrow: "Commande",     title: "", subtitle: "" },
    faq:          { show: true, eyebrow: "FAQ",          title: "", subtitle: "" }
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
      price: 99, from: false, delay: "24-48h", popular: false, cta: "Choisir Express",
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
      price: 290, from: false, delay: "3-5 jours", popular: true, cta: "Choisir Vitrine",
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
      price: 690, from: true, delay: "1-2 semaines", popular: false, cta: "Choisir Complet",
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

  /* ---------- OPTIONS / SUPPLÉMENTS (qty:true => quantité au choix ; price:null => sur devis) ---------- */
  addons: [
    { id: "page",   name: "Page supplémentaire",      price: 40,  qty: true,  desc: "Ajoute autant de pages que nécessaire." },
    { id: "logo",   name: "Création de logo",         price: 80,  qty: false, desc: "Un logo propre à ton activité." },
    { id: "urgent", name: "Livraison express",        price: 100, qty: false, desc: "Ton projet passe en priorité." },
    { id: "domain", name: "Nom de domaine + hébergement (1 an)", price: 60, qty: false, desc: "Je m'occupe de la mise en ligne." },
    { id: "texte",  name: "Rédaction des textes",     price: 70,  qty: false, desc: "Des contenus clairs et percutants." },
    { id: "maint",  name: "Maintenance (1 mois)",     price: 30,  qty: false, desc: "Mises à jour et modifications." },
    { id: "spec",   name: "Fonctionnalité spéciale",  price: null, qty: false, desc: "Réservation, espace client… sur devis." }
  ],

  /* ---------- CODES PROMO (en %) ---------- */
  promoCodes: { "BIENVENUE": 10 },

  /* ---------- PROCESSUS ---------- */
  process: [
    { title: "Tu choisis",  text: "Sélectionne ta gamme et tes options, puis envoie ta commande." },
    { title: "On échange",  text: "Je te contacte pour cadrer ton besoin : style, couleurs, contenu." },
    { title: "Je crée",     text: "Tu reçois une première version et tu demandes les retouches voulues." },
    { title: "Mise en ligne", text: "Tu valides, tu règles le solde, et ton site est en ligne." }
  ],

  /* ---------- RÉALISATIONS ----------
     Ce sont des maquettes de démonstration (cliquables). Remplace-les par tes
     vrais projets : tag = catégorie (sert au filtre), url = lien du site, image = capture d'écran PC,
     mobile = capture d'écran téléphone (facultatif). */
  portfolio: [
    { name: "Le Comptoir", tag: "Restauration", category: "Restaurant · Site Vitrine", url: "demos/restaurant.html", image: "images/portfolio/restaurant.jpg", mobile: "images/portfolio/restaurant-mobile.jpg", style: 1 },
    { name: "Maison Aurore", tag: "Commerces", category: "Boutique en ligne · Site Complet", url: "demos/boutique.html", image: "images/portfolio/boutique.jpg", mobile: "images/portfolio/boutique-mobile.jpg", style: 2 },
    { name: "PEAK Coaching", tag: "Services", category: "Coach sportif · Site Vitrine", url: "demos/coach.html", image: "images/portfolio/coach.jpg", mobile: "images/portfolio/coach-mobile.jpg", style: 3 },
    { name: "Atelier Dubois", tag: "Artisans", category: "Menuisier · Site Vitrine", url: "demos/artisan.html", image: "images/portfolio/artisan.jpg", mobile: "images/portfolio/artisan-mobile.jpg", style: 4 },
    { name: "La Fromagerie des Alpes", tag: "Commerces", category: "Fromagerie · Maquette", url: "demos/fromagerie.html", image: "images/portfolio/fromagerie.jpg", mobile: "images/portfolio/fromagerie-mobile.jpg", style: 1 },
    { name: "Boucherie Maison Lefèvre", tag: "Commerces", category: "Boucherie · Maquette", url: "demos/boucherie.html", image: "images/portfolio/boucherie.jpg", mobile: "images/portfolio/boucherie-mobile.jpg", style: 2 },
    { name: "Pizzeria Bella Napoli", tag: "Restauration", category: "Pizzeria · Maquette", url: "demos/pizzeria.html", image: "images/portfolio/pizzeria.jpg", mobile: "images/portfolio/pizzeria-mobile.jpg", style: 3 },
    { name: "Boulangerie Le Fournil", tag: "Commerces", category: "Boulangerie · Maquette", url: "demos/boulangerie.html", image: "images/portfolio/boulangerie.jpg", mobile: "images/portfolio/boulangerie-mobile.jpg", style: 4 },
    { name: "Atelier Floral Camélia", tag: "Commerces", category: "Fleuriste · Maquette", url: "demos/fleuriste.html", image: "images/portfolio/fleuriste.jpg", mobile: "images/portfolio/fleuriste-mobile.jpg", style: 1 },
    { name: "Barber Club 1925", tag: "Beauté & bien-être", category: "Barbier · Maquette", url: "demos/barbier.html", image: "images/portfolio/barbier.jpg", mobile: "images/portfolio/barbier-mobile.jpg", style: 2 },
    { name: "Garage Auto Performance", tag: "Services", category: "Garage auto · Maquette", url: "demos/garage.html", image: "images/portfolio/garage.jpg", mobile: "images/portfolio/garage-mobile.jpg", style: 3 },
    { name: "Duval Plomberie & Chauffage", tag: "Artisans", category: "Plombier · Maquette", url: "demos/plombier.html", image: "images/portfolio/plombier.jpg", mobile: "images/portfolio/plombier-mobile.jpg", style: 4 },
    { name: "Institut Éclat", tag: "Beauté & bien-être", category: "Institut de beauté · Maquette", url: "demos/esthetique.html", image: "images/portfolio/esthetique.jpg", mobile: "images/portfolio/esthetique-mobile.jpg", style: 1 },
    { name: "Studio Lumière Photographie", tag: "Services", category: "Photographe · Maquette", url: "demos/photographe.html", image: "images/portfolio/photographe.jpg", mobile: "images/portfolio/photographe-mobile.jpg", style: 2 },
    { name: "La Cave du Sommelier", tag: "Commerces", category: "Caviste · Maquette", url: "demos/cave.html", image: "images/portfolio/cave.jpg", mobile: "images/portfolio/cave-mobile.jpg", style: 3 },
    { name: "Ink & Soul Tattoo", tag: "Beauté & bien-être", category: "Tatoueur · Maquette", url: "demos/tatoueur.html", image: "images/portfolio/tatoueur.jpg", mobile: "images/portfolio/tatoueur-mobile.jpg", style: 4 }
  ],



  /* ---------- AVIS CLIENTS ----------
     Ajoute de VRAIS avis (avec l'accord du client). Liste vide = section cachée.
     Exemple : { name: "Jean D.", role: "Gérant", text: "Super travail !" } */
  testimonials: [],

  /* ---------- GARANTIES ---------- */
  guarantees: [
    { icon: "🛡️", title: "Satisfait ou retouché", text: "Tu valides chaque étape avant la mise en ligne." },
    { icon: "⚡",  title: "Livraison rapide",      text: "Des délais annoncés, et tenus." },
    { icon: "🎨", title: "100 % unique",          text: "Aucun modèle réutilisé : ton site est le tien." },
    { icon: "💬", title: "Réponse rapide",        text: "Un message et je te réponds en général dans la journée." }
  ],

  /* ---------- FAQ ---------- */
  faq: [
    { q: "Combien de temps pour recevoir mon site ?", a: "De 24-48h pour une Page Express à 1-2 semaines pour un Site Complet, selon la charge et la rapidité de tes retours." },
    { q: "Comment se passe le paiement ?", a: "Un acompte est demandé au démarrage, le solde à la validation du site. Les moyens de paiement te sont précisés lors de notre échange." },
    { q: "Puis-je demander des modifications ?", a: "Oui. Chaque gamme inclut des retouches, et l'option maintenance permet des changements après la livraison." },
    { q: "Je n'ai pas de logo ni de textes, c'est un problème ?", a: "Pas du tout. Je peux créer ton logo et rédiger tes textes (options)." },
    { q: "J'ai déjà un site, tu peux le moderniser ?", a: "Oui, c'est la gamme « Refonte de site » : nouveau design, mobile, vitesse, en gardant tes contenus." },
    { q: "Et si j'ai un besoin très particulier ?", a: "Choisis « Sur mesure » : on discute de ton projet et je te propose un devis." }
  ],

  /* ---------- CONTACT ---------- */
  contact: {
    instagram: "https://www.instagram.com/l.t_digital",
    instagramHandle: "@l.t_digital",
    email: ""        // ex: "contact@ltdigital.fr" (laisse "" pour cacher)
  },

  footer: "Création & modernisation de sites web."
};
