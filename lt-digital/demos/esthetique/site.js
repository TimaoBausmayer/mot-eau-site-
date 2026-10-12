/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Institut Éclat »
   Modifie ce fichier pour tout changer : textes, prix, horaires, couleurs, polices.
   Enregistre, recharge la page : c'est à jour. (Garde les guillemets et les virgules.)
   - theme.layout : "A" (moderne), "B" (carte/éditorial), "C" (affiche, gros titres)
   - theme.visual : pizza, cheese, steak, bread, flower, pole, wheel, pipes, stones,
                    aperture, wine, mandala, barbell, rings, plate, candles
   - Dans un texte, {mot} met le mot en couleur (titre de l'accueil).
   - Un produit avec un "tag" est mis en avant sur l'accueil.
   ===================================================================== */
window.SITE = {
  "name": "Institut Éclat",
  "short": "Institut de beauté",
  "tagline": "Soins du visage et du corps, épilation, beauté des mains.",
  "theme": {
    "layout": "B",
    "visual": "stones",
    "headFont": "Cormorant Garamond",
    "bodyFont": "DM Sans",
    "headWeight": 600,
    "upper": false,
    "radius": 2,
    "bg": "#fbf4f0",
    "bg2": "#f4e4dc",
    "ink": "#3d2a2a",
    "mut": "#94787a",
    "acc": "#b9697c",
    "acc2": "#b8956a",
    "line": "#ecd5cc",
    "card": "#fffdfb",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Institut de beauté · Rennes",
    "title": "Prenez soin de vous, {tout simplement}.",
    "text": "Soins du visage, du corps, épilation, beauté des mains et massages dans un cadre apaisant. Des soins personnalisés avec des produits sélectionnés.",
    "cta": "Réserver un soin",
    "cta2": "Nos soins",
    "highlightsTitle": "Nos soins signature",
    "highlightsText": "Les moments préférés de nos clientes.",
    "aboutTitle": "Un moment rien que pour vous",
    "about": "Des soins personnalisés avec des produits sélectionnés et une équipe à l'écoute. Ici, on prend le temps : cabines calmes, tisane offerte et aucun enchaînement pressé.",
    "stats": [
      [
        "3",
        "esthéticiennes diplômées"
      ],
      [
        "100 %",
        "soins personnalisés"
      ],
      [
        "1 h",
        "en moyenne par soin"
      ]
    ],
    "features": [
      [
        "Produits sélectionnés",
        "Formules douces et efficaces."
      ],
      [
        "Cabines apaisantes",
        "Ambiance calme et chaleureuse."
      ],
      [
        "Réservation en ligne",
        "Choisissez votre créneau."
      ]
    ],
    "ctaTitle": "Offrez-vous une pause",
    "ctaText": "Réservez votre soin en ligne."
  },
  "offers": {
    "label": "Nos soins",
    "title": "Carte des soins",
    "intro": "Chaque soin commence par un échange pour comprendre vos besoins. Réservation en ligne ou par téléphone.",
    "cats": [
      {
        "name": "Visage",
        "note": "",
        "items": [
          {
            "name": "Soin du visage éclat",
            "desc": "Nettoyage, gommage, masque",
            "price": "65 €",
            "tag": "Signature",
            "star": true
          },
          {
            "name": "Soin anti-âge",
            "desc": "Sérum, massage liftant",
            "price": "85 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Rehaussement de cils",
            "desc": "Effet naturel, 6 semaines",
            "price": "55 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Corps",
        "note": "",
        "items": [
          {
            "name": "Massage relaxant 60 min",
            "desc": "Huiles essentielles",
            "price": "70 €",
            "tag": "Coup de cœur",
            "star": true
          },
          {
            "name": "Gommage corps",
            "desc": "Sels marins, hydratation",
            "price": "45 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Massage future maman",
            "desc": "Après le 4e mois",
            "price": "65 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Mains, pieds & épilation",
        "note": "",
        "items": [
          {
            "name": "Manucure semi-permanent",
            "desc": "Pose et soin",
            "price": "38 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Beauté des pieds",
            "desc": "Soin et vernis",
            "price": "42 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Épilation jambes complètes",
            "desc": "Cire tiède",
            "price": "32 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Carte cadeau",
            "desc": "Montant au choix",
            "price": "dès 30 €",
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
        "Mardi – Vendredi",
        "9h30–19h"
      ],
      [
        "Samedi",
        "9h–17h"
      ]
    ],
    "address": "5 rue des Lilas, 35000 Rennes",
    "phone": "02 99 12 34 56",
    "email": "institut@eclat.example",
    "note": "Annulation gratuite jusqu'à 24 h avant.",
    "form": {
      "title": "Réserver un soin",
      "options": [
        "Soin du visage",
        "Massage",
        "Mains & pieds",
        "Épilation",
        "Carte cadeau"
      ],
      "button": "Réserver",
      "success": "Merci ! Nous confirmons votre rendez-vous par SMS.",
      "itemCta": "Réserver"
    }
  }
};
