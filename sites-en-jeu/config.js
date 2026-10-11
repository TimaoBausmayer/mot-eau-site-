/* =====================================================================
   ✏️  FICHIER À MODIFIER : tout le contenu du site est ici.
   Change les textes, les prix, les gammes… puis recharge la page.
   (Garde bien les guillemets "..." et les virgules.)
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---------- IDENTITÉ ---------- */
  brand: "Ton Studio",              // nom affiché en haut à gauche
  game: "ton jeu",                  // nom du jeu (ex: "GTA RP", "Roblox"…)
  accent: "#7c5cff",                // couleur principale du site
  accent2: "#00d4ff",               // couleur secondaire (dégradés)

  /* ---------- MONNAIE DU JEU ---------- */
  currency: { symbol: "$", after: true },   // after:true => "50 000 $"

  /* ---------- BANDEAU D'ANNONCE (laisse "" pour le cacher) ---------- */
  announce: "🔥 Offre de lancement : -10 % avec le code BIENVENUE",

  /* ---------- HERO (haut de page) ---------- */
  hero: {
    badge: "Création de sites in-game",
    title: "Ton entreprise mérite un site",
    titleAccent: "qui impressionne.",
    text: "Sites vitrines, boutiques, pages de recrutement… Je crée des sites propres, rapides et sur mesure pour les joueurs et les entreprises de {game}. Livraison rapide, retouches incluses.",
    cta1: "Voir les tarifs",
    cta2: "Commander maintenant"
  },

  /* ---------- CHIFFRES CLÉS (supprime les lignes inutiles) ---------- */
  stats: [
    { value: "48h",  label: "Délai moyen de livraison" },
    { value: "100%", label: "Sur mesure, jamais de copier-coller" },
    { value: "∞",    label: "Retouches pendant la création" },
    { value: "7j/7", label: "Support après livraison" }
  ],

  /* ---------- GAMMES / TARIFS ----------
     id        : identifiant unique (sans espace)
     price     : prix (nombre) — mets null pour afficher "Sur devis"
     popular   : true => mise en avant "Le plus choisi"
     features  : liste ; ajoute "!" au début pour une ligne barrée (non incluse)
  */
  plans: [
    {
      id: "express",
      name: "Page Express",
      tagline: "Une page, l'essentiel, vite.",
      price: 50000,
      delay: "24h",
      popular: false,
      cta: "Choisir Express",
      features: [
        "1 page unique responsive",
        "Présentation + contact",
        "Design propre aux couleurs de ton activité",
        "1 retouche incluse",
        "!Plusieurs pages",
        "!Formulaire de commande"
      ]
    },
    {
      id: "vitrine",
      name: "Site Vitrine",
      tagline: "Le choix idéal pour une entreprise.",
      price: 120000,
      delay: "48h",
      popular: true,
      cta: "Choisir Vitrine",
      features: [
        "Jusqu'à 5 pages (Accueil, Services, Équipe, Tarifs, Contact)",
        "Design premium sur mesure",
        "Galerie photos / captures du jeu",
        "Bouton de contact direct (Discord / téléphone)",
        "3 retouches incluses",
        "Support 7 jours après livraison"
      ]
    },
    {
      id: "complet",
      name: "Site Complet",
      tagline: "Boutique, recrutement, tout-en-un.",
      price: 280000,
      delay: "4-5 jours",
      popular: false,
      cta: "Choisir Complet",
      features: [
        "Jusqu'à 10 pages",
        "Boutique / catalogue de produits",
        "Formulaire de recrutement et de commande",
        "Animations et design haut de gamme",
        "Retouches illimitées pendant la création",
        "Support prioritaire 30 jours"
      ]
    },
    {
      id: "surmesure",
      name: "Sur mesure",
      tagline: "Un projet unique ? On en parle.",
      price: null,                   // null => "Sur devis"
      delay: "selon projet",
      popular: false,
      cta: "Demander un devis",
      features: [
        "Fonctionnalités spécifiques",
        "Identité visuelle complète",
        "Suivi dédié du projet",
        "Maintenance sur demande"
      ]
    }
  ],

  /* ---------- TABLEAU COMPARATIF ----------
     Pour chaque ligne : true (✔), false (✘) ou un texte (ex: "5").
     Les clés sont les "id" des gammes ci-dessus. */
  compare: [
    { label: "Nombre de pages",          values: { express: "1", vitrine: "5", complet: "10", surmesure: "Illimité" } },
    { label: "Design sur mesure",        values: { express: true, vitrine: true, complet: true, surmesure: true } },
    { label: "Responsive (mobile)",      values: { express: true, vitrine: true, complet: true, surmesure: true } },
    { label: "Galerie d'images",         values: { express: false, vitrine: true, complet: true, surmesure: true } },
    { label: "Boutique / catalogue",     values: { express: false, vitrine: false, complet: true, surmesure: true } },
    { label: "Formulaire de commande",   values: { express: false, vitrine: false, complet: true, surmesure: true } },
    { label: "Retouches incluses",       values: { express: "1", vitrine: "3", complet: "Illimitées", surmesure: "Illimitées" } },
    { label: "Support après livraison",  values: { express: "—", vitrine: "7 jours", complet: "30 jours", surmesure: "Au choix" } }
  ],

  /* ---------- OPTIONS / SUPPLÉMENTS ----------
     qty:true => le client peut choisir une quantité (ex: pages en plus) */
  addons: [
    { id: "page",    name: "Page supplémentaire",         price: 15000, qty: true,  desc: "Ajoute autant de pages que nécessaire." },
    { id: "logo",    name: "Création de logo",            price: 30000, qty: false, desc: "Un logo propre à ton entreprise." },
    { id: "urgent",  name: "Livraison express (-50% délai)", price: 40000, qty: false, desc: "Ton projet passe en priorité." },
    { id: "seo",     name: "Optimisation visibilité",     price: 20000, qty: false, desc: "Titres, descriptions, mots-clés du jeu." },
    { id: "maint",   name: "Maintenance 1 mois",          price: 25000, qty: false, desc: "Mises à jour et modifications illimitées." }
  ],

  /* ---------- CODES PROMO (en %) ---------- */
  promoCodes: { "BIENVENUE": 10 },

  /* ---------- PROCESSUS ---------- */
  process: [
    { title: "Tu choisis",     text: "Sélectionne ta gamme et tes options, puis envoie ta commande." },
    { title: "On discute",     text: "Je te contacte pour cadrer ton besoin : style, couleurs, contenu." },
    { title: "Je crée",        text: "Tu reçois une première version et tu peux demander des retouches." },
    { title: "Livraison",      text: "Paiement à la validation, puis ton site est en ligne." }
  ],

  /* ---------- RÉALISATIONS ----------
     Remplace par tes vrais sites. url:"" => pas de lien.
     style : 1 à 4 = couleur de l'aperçu automatique ; ou mets image:"images/monsite.jpg" */
  portfolio: [
    { name: "Garage Los Santos",  category: "Site Vitrine",  url: "", style: 1, image: "" },
    { name: "Café du Port",       category: "Site Complet",  url: "", style: 2, image: "" },
    { name: "Police RP",          category: "Recrutement",   url: "", style: 3, image: "" },
    { name: "Boutique Neon",      category: "Page Express",  url: "", style: 4, image: "" }
  ],

  /* ---------- AVIS CLIENTS ----------
     Ajoute ici de VRAIS avis (avec l'accord du client). Si la liste est vide,
     la section n'apparaît pas. Exemple :
     { name: "Jean D.", role: "Gérant du garage", text: "Super travail !" } */
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
    { q: "Combien de temps pour recevoir mon site ?", a: "De 24h pour une Page Express à 4-5 jours pour un Site Complet, selon la charge et tes retours." },
    { q: "Comment se passe le paiement ?", a: "Un acompte peut être demandé au démarrage, le solde à la validation. Tout se règle en monnaie du jeu." },
    { q: "Puis-je demander des modifications ?", a: "Oui. Chaque gamme inclut des retouches, et les options de maintenance permettent des changements après livraison." },
    { q: "Je n'ai pas de logo ni de textes, c'est un problème ?", a: "Pas du tout. Je peux créer un logo (option) et t'aider à rédiger tes textes." },
    { q: "Et si j'ai un besoin très particulier ?", a: "Choisis la gamme Sur mesure : on discute de ton projet et je te propose un devis." }
  ],

  /* ---------- CONTACT ---------- */
  contact: {
    discord: "",              // lien d'invitation Discord (ex: "https://discord.gg/xxxx")
    discordTag: "tonpseudo",  // ton pseudo Discord
    ingame: "Ton Pseudo",     // ton pseudo / numéro en jeu
    email: ""                 // laisse "" si tu n'en veux pas
  },

  footer: "Site non affilié à l'éditeur du jeu. Tous droits réservés."
};
