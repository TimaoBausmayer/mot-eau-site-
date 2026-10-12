/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Atelier Dubois »
   Modifie ce fichier pour tout changer : textes, prix, horaires, couleurs, polices.
   Enregistre, recharge la page : c'est à jour. (Garde les guillemets et les virgules.)
   - theme.layout : "A" (moderne), "B" (carte/éditorial), "C" (affiche, gros titres)
   - theme.visual : pizza, cheese, steak, bread, flower, pole, wheel, pipes, stones,
                    aperture, wine, mandala, barbell, rings, plate, candles
   - Dans un texte, {mot} met le mot en couleur (titre de l'accueil).
   - Un produit avec un "tag" est mis en avant sur l'accueil.
   ===================================================================== */
window.SITE = {
  "name": "Atelier Dubois",
  "short": "Menuiserie",
  "tagline": "Menuisier artisan depuis 1998. Cuisines, escaliers, agencements sur mesure.",
  "theme": {
    "layout": "A",
    "visual": "rings",
    "headFont": "Fraunces",
    "bodyFont": "Inter",
    "headWeight": 600,
    "upper": false,
    "radius": 4,
    "bg": "#eef0ea",
    "bg2": "#e1e6dd",
    "ink": "#1b2a22",
    "mut": "#5d6a62",
    "acc": "#c7782a",
    "acc2": "#2f4a3a",
    "line": "#cdd4c8",
    "card": "#ffffff",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Menuisier artisan · depuis 1998",
    "title": "Du bois travaillé avec {passion}, pour la vie.",
    "text": "Cuisines, escaliers, placards et agencements sur mesure. Un artisan local, des matériaux nobles et un travail soigné de A à Z, de la prise de cotes à la pose.",
    "cta": "Demander un devis",
    "cta2": "Nos réalisations",
    "highlightsTitle": "Nos spécialités",
    "highlightsText": "Ce que nous fabriquons le plus souvent.",
    "aboutTitle": "25 ans de métier, une promesse simple",
    "about": "Nous travaillons le bois de la région, nous le choisissons à la scierie et nous fabriquons tout dans notre atelier. Vous suivez l'avancement et vous validez chaque étape.",
    "stats": [
      [
        "25 ans",
        "d'expérience"
      ],
      [
        "100 %",
        "sur mesure"
      ],
      [
        "10 ans",
        "de garantie"
      ]
    ],
    "features": [
      [
        "Devis détaillé",
        "Gratuit, sous 48 h, sans engagement."
      ],
      [
        "Fabrication locale",
        "Atelier à 15 minutes de chez vous."
      ],
      [
        "Pose soignée",
        "Finitions et nettoyage inclus."
      ]
    ],
    "ctaTitle": "Un projet en bois ?",
    "ctaText": "Devis gratuit sous 48 h."
  },
  "offers": {
    "label": "Nos services",
    "title": "Tout pour votre intérieur",
    "intro": "Chaque projet est dessiné, fabriqué dans l'atelier et posé par nos soins. Devis gratuit sous 48 h.",
    "cats": [
      {
        "name": "Agencement",
        "note": "Fabrication sur mesure",
        "items": [
          {
            "name": "Cuisine sur mesure",
            "desc": "Conception 3D, fabrication et pose",
            "price": "dès 6 500 €",
            "tag": "Spécialité",
            "star": true
          },
          {
            "name": "Placards & dressings",
            "desc": "Rangements optimisés jusqu'au dernier centimètre",
            "price": "dès 1 200 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Bibliothèque sur mesure",
            "desc": "Chêne, noyer ou peinte",
            "price": "dès 900 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Meuble salle de bain",
            "desc": "Bois traité pour l'humidité",
            "price": "dès 1 100 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Escaliers & ouvertures",
        "note": "Pose comprise",
        "items": [
          {
            "name": "Escalier bois",
            "desc": "Droit, quart ou demi-tournant",
            "price": "dès 3 800 €",
            "tag": "Spécialité",
            "star": true
          },
          {
            "name": "Porte intérieure",
            "desc": "Sur mesure, finitions au choix",
            "price": "dès 480 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Fenêtre bois",
            "desc": "Double vitrage, isolation renforcée",
            "price": "dès 650 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Extérieur & rénovation",
        "note": "",
        "items": [
          {
            "name": "Terrasse en bois",
            "desc": "Pin traité, mélèze ou ipé",
            "price": "dès 85 €/m²",
            "tag": "",
            "star": false
          },
          {
            "name": "Pergola",
            "desc": "Sur mesure, ancrage sécurisé",
            "price": "dès 2 400 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Rénovation de boiseries",
            "desc": "Ponçage, réparation, finition",
            "price": "sur devis",
            "tag": "",
            "star": false
          },
          {
            "name": "Visite et conseil",
            "desc": "Prise de cotes à domicile",
            "price": "Gratuit",
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
        "Lundi – Vendredi",
        "8h–12h · 14h–18h"
      ],
      [
        "Samedi",
        "Sur rendez-vous"
      ]
    ],
    "address": "ZA Les Chênes, 38000 Grenoble",
    "phone": "04 76 11 22 33",
    "email": "contact@atelier-dubois.example",
    "note": "Devis gratuit. Déplacement offert dans un rayon de 40 km.",
    "form": {
      "title": "Parlons de votre projet",
      "options": [
        "Cuisine",
        "Escalier",
        "Placard / dressing",
        "Terrasse",
        "Autre"
      ],
      "button": "Recevoir mon devis",
      "success": "Merci. Nous vous recontactons sous 48 h avec un rendez-vous.",
      "itemCta": "Demander un devis"
    }
  }
};
