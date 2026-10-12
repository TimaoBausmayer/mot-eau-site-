/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Maison Aurore »
   Modifie ce fichier pour tout changer : textes, prix, horaires, couleurs, polices.
   Enregistre, recharge la page : c'est à jour. (Garde les guillemets et les virgules.)
   - theme.layout : "A" (moderne), "B" (carte/éditorial), "C" (affiche, gros titres)
   - theme.visual : pizza, cheese, steak, bread, flower, pole, wheel, pipes, stones,
                    aperture, wine, mandala, barbell, rings, plate, candles
   - Dans un texte, {mot} met le mot en couleur (titre de l'accueil).
   - Un produit avec un "tag" est mis en avant sur l'accueil.
   ===================================================================== */
window.SITE = {
  "name": "Maison Aurore",
  "short": "Boutique",
  "tagline": "Bougies artisanales, cire végétale, fabriquées à la main en France.",
  "theme": {
    "layout": "A",
    "visual": "candles",
    "headFont": "Fraunces",
    "bodyFont": "DM Sans",
    "headWeight": 600,
    "upper": false,
    "radius": 10,
    "bg": "#faf5ee",
    "bg2": "#f1e6d8",
    "ink": "#2b211b",
    "mut": "#7d6e63",
    "acc": "#c0623a",
    "acc2": "#e0a07a",
    "line": "#e4d6c4",
    "card": "#ffffff",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Nouvelle collection",
    "title": "Des bougies qui {racontent} vos soirées.",
    "text": "Cires végétales, parfums composés par un maître parfumeur et créations artisanales pour une maison qui vous ressemble. Livraison offerte dès 49 €.",
    "cta": "Découvrir la boutique",
    "cta2": "Voir les produits",
    "highlightsTitle": "Nos best-sellers",
    "highlightsText": "Les parfums que nos clients rachètent le plus.",
    "aboutTitle": "Fabriquées à la main, en petites séries",
    "about": "Nous coulons chaque bougie à la main dans notre atelier. Cire de soja et de colza, parfums sans phtalates, verres réutilisables : on aime les objets qu'on garde longtemps.",
    "stats": [
      [
        "100 %",
        "cire végétale"
      ],
      [
        "45 h",
        "de combustion"
      ],
      [
        "48 h",
        "livraison en France"
      ]
    ],
    "features": [
      [
        "Livraison offerte",
        "Dès 49 € d'achat, colis suivi."
      ],
      [
        "Retours sous 30 jours",
        "Un souci ? On échange ou on rembourse."
      ],
      [
        "Emballage soigné",
        "Prêt à offrir, sans plastique inutile."
      ]
    ],
    "ctaTitle": "Offrez une lumière",
    "ctaText": "Livraison offerte dès 49 €."
  },
  "offers": {
    "label": "Boutique",
    "title": "Nos produits",
    "intro": "Toutes nos bougies sont coulées à la main, en petites séries, avec une mèche en coton.",
    "cats": [
      {
        "name": "Bougies parfumées",
        "note": "",
        "items": [
          {
            "name": "Ambre & Vanille",
            "desc": "Bougie 220 g · 45 h de combustion",
            "price": "32 €",
            "tag": "Best-seller",
            "star": true
          },
          {
            "name": "Figuier d'été",
            "desc": "Bougie 220 g · notes vertes et lactées",
            "price": "32 €",
            "tag": "Nouveau",
            "star": true
          },
          {
            "name": "Santal Rose",
            "desc": "Bougie 180 g · 38 h",
            "price": "28 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Cèdre Noir",
            "desc": "Grande bougie 400 g · 3 mèches",
            "price": "46 €",
            "tag": "Édition limitée",
            "star": true
          }
        ]
      },
      {
        "name": "Diffuseurs",
        "note": "",
        "items": [
          {
            "name": "Diffuseur à bâtonnets",
            "desc": "100 ml, parfum au choix",
            "price": "29 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Brume d'oreiller",
            "desc": "50 ml, lavande et camomille",
            "price": "19 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Recharge de diffuseur",
            "desc": "200 ml",
            "price": "22 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Coffrets",
        "note": "",
        "items": [
          {
            "name": "Coffret découverte",
            "desc": "3 mini-bougies + guide des parfums",
            "price": "34 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Coffret cadeau Aurore",
            "desc": "1 bougie, 1 diffuseur, 1 brume",
            "price": "69 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Carte cadeau",
            "desc": "Montant au choix, envoi par e-mail",
            "price": "dès 20 €",
            "tag": "",
            "star": false
          }
        ]
      }
    ]
  },
  "contact": {
    "title": "Contactez-nous",
    "intro": "Une question, un devis, une réservation ? Écrivez-nous ou appelez-nous : nous répondons rapidement.",
    "hours": [
      [
        "Atelier-boutique",
        "Mer–Sam · 10h–18h30"
      ],
      [
        "Commandes en ligne",
        "7j/7"
      ]
    ],
    "address": "8 rue des Tanneurs, 69002 Lyon",
    "phone": "04 72 00 11 22",
    "email": "bonjour@maison-aurore.example",
    "note": "Pour les commandes en entreprise, indiquez la quantité souhaitée.",
    "form": {
      "title": "Une question sur une commande ?",
      "options": [
        "Suivi de commande",
        "Choisir un parfum",
        "Cadeau / entreprise",
        "Autre"
      ],
      "button": "Envoyer",
      "success": "Merci, nous répondons sous 24 h ouvrées.",
      "itemCta": "Commander"
    }
  }
};
