/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Atelier Floral Camélia »
   Modifie ce fichier pour tout changer : textes, prix, horaires, couleurs, polices.
   Enregistre, recharge la page : c'est à jour. (Garde les guillemets et les virgules.)
   - theme.layout : "A" (moderne), "B" (carte/éditorial), "C" (affiche, gros titres)
   - theme.visual : pizza, cheese, steak, bread, flower, pole, wheel, pipes, stones,
                    aperture, wine, mandala, barbell, rings, plate, candles
   - Dans un texte, {mot} met le mot en couleur (titre de l'accueil).
   - Un produit avec un "tag" est mis en avant sur l'accueil.
   - Photos des produits : "photo": "../photos/pizza-margherita.jpg" (dossier demos/photos/).
     Photo absente = la case n'apparaît pas. Outil pour les ajouter : demos/photos.html
   ===================================================================== */
window.SITE = {
  "name": "Atelier Floral Camélia",
  "short": "Fleuriste",
  "tagline": "Créatrice florale. Bouquets de saison, mariages, abonnements.",
  "theme": {
    "layout": "A",
    "visual": "flower",
    "headFont": "Fraunces",
    "bodyFont": "DM Sans",
    "headWeight": 600,
    "upper": false,
    "radius": 14,
    "bg": "#fff6f8",
    "bg2": "#fde6ec",
    "ink": "#3a1f2b",
    "mut": "#8f6b78",
    "acc": "#d4406f",
    "acc2": "#7ea776",
    "line": "#f4cdd8",
    "card": "#ffffff",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Fleuriste créatrice · Bordeaux",
    "title": "Des fleurs qui {racontent} vos émotions.",
    "text": "Bouquets de saison, compositions sur mesure, mariages et abonnements floraux livrés chez vous. Composés à la main, avec des fleurs locales dès que possible.",
    "cta": "Commander un bouquet",
    "cta2": "Nos créations",
    "highlightsTitle": "Nos bouquets préférés",
    "highlightsText": "Ceux que l'on offre le plus.",
    "aboutTitle": "Une créatrice florale, des fleurs de saison",
    "about": "Je compose chaque bouquet à la main, en privilégiant les fleurs locales et de saison. Livraison soignée le jour même, avec un message personnalisé offert.",
    "stats": [
      [
        "100 %",
        "composé à la main"
      ],
      [
        "24 h",
        "livraison locale"
      ],
      [
        "200+",
        "mariages décorés"
      ]
    ],
    "features": [
      [
        "Fleurs de saison",
        "Plus durables, plus belles."
      ],
      [
        "Livraison le jour même",
        "Pour toute commande avant 14 h."
      ],
      [
        "Carte personnalisée",
        "Un message offert avec chaque bouquet."
      ]
    ],
    "ctaTitle": "Faire plaisir avec des fleurs",
    "ctaText": "Livraison le jour même avant 14 h."
  },
  "offers": {
    "label": "Nos créations",
    "title": "Nos créations",
    "intro": "Chaque bouquet est composé à la main le jour même. Livraison à Bordeaux et alentours.",
    "images": false,
    "illustrations": false,
    "cats": [
      {
        "name": "Bouquets",
        "note": "Composés à la main",
        "items": [
          {
            "name": "Bouquet de saison",
            "desc": "Fleurs fraîches du marché",
            "price": "29 €",
            "tag": "Saison",
            "star": true
          },
          {
            "name": "Roses premium",
            "desc": "Bouquet de 12 roses à longue tige",
            "price": "39 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Bouquet tulipes",
            "desc": "Printemps, 20 tulipes",
            "price": "25 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Bouquet champêtre",
            "desc": "Fleurs des champs, tons pastel",
            "price": "35 €",
            "tag": "Coup de cœur",
            "star": true
          }
        ]
      },
      {
        "name": "Plantes & compositions",
        "note": "",
        "items": [
          {
            "name": "Plante d'intérieur",
            "desc": "Pot décoratif inclus",
            "price": "18 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Composition en coupe",
            "desc": "Pour une table ou une entrée",
            "price": "45 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Couronne de deuil",
            "desc": "Sur mesure, livraison rapide",
            "price": "dès 70 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Événements & abonnements",
        "note": "",
        "items": [
          {
            "name": "Mariage",
            "desc": "Bouquet, boutonnières, décoration",
            "price": "dès 250 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Abonnement floral",
            "desc": "1 bouquet par mois chez vous",
            "price": "dès 29 €/mois",
            "tag": "",
            "star": false
          },
          {
            "name": "Fleurir mon entreprise",
            "desc": "Compositions hebdomadaires",
            "price": "sur devis",
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
        "Mardi – Samedi",
        "9h–19h"
      ],
      [
        "Dimanche",
        "9h–13h"
      ]
    ],
    "address": "9 cours des Roses, 33000 Bordeaux",
    "phone": "05 56 12 34 56",
    "email": "camelia@floral.example",
    "note": "Pour un mariage, parlez-moi de votre date et de votre lieu.",
    "form": {
      "title": "Commander ou demander un devis",
      "options": [
        "Bouquet",
        "Mariage / événement",
        "Deuil",
        "Abonnement",
        "Entreprise"
      ],
      "button": "Envoyer",
      "success": "Merci ! Je reviens vers vous très vite.",
      "itemCta": "Commander"
    }
  }
};
