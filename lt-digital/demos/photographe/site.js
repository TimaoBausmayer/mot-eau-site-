/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Studio Lumière »
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
  "name": "Studio Lumière",
  "short": "Photographe",
  "tagline": "Photographie de mariage, famille, portrait et entreprise.",
  "theme": {
    "layout": "B",
    "visual": "aperture",
    "headFont": "Playfair Display",
    "bodyFont": "Inter",
    "headWeight": 600,
    "upper": false,
    "radius": 2,
    "bg": "#101010",
    "bg2": "#191919",
    "ink": "#f5f5f2",
    "mut": "#a5a5a0",
    "acc": "#e8e0d2",
    "acc2": "#c0b49a",
    "line": "#2d2d2d",
    "card": "#151515",
    "onacc": "#101010"
  },
  "home": {
    "kicker": "Photographe · Lyon et alentours",
    "title": "Des images qui {durent} toute une vie.",
    "text": "Mariage, famille, portrait et photo d'entreprise. Un regard naturel, une lumière soignée, et une galerie en ligne pour partager vos photos.",
    "cta": "Demander un devis",
    "cta2": "Voir les tarifs",
    "highlightsTitle": "Nos formules",
    "highlightsText": "Les séances les plus réservées.",
    "aboutTitle": "Un regard, une histoire",
    "about": "Photographe professionnel depuis dix ans, je privilégie le naturel et l'émotion. Chaque séance est préparée avec vous pour que vous soyez à l'aise devant l'objectif.",
    "stats": [
      [
        "10 ans",
        "d'expérience"
      ],
      [
        "15 j",
        "livraison de la galerie"
      ],
      [
        "100 %",
        "images retouchées"
      ]
    ],
    "features": [
      [
        "Séance préparée",
        "On définit ensemble l'ambiance."
      ],
      [
        "Galerie en ligne",
        "Téléchargez et partagez facilement."
      ],
      [
        "Tirages premium",
        "Pour garder de vrais souvenirs."
      ]
    ],
    "ctaTitle": "Parlons de votre projet",
    "ctaText": "Premier échange gratuit."
  },
  "offers": {
    "label": "Tarifs",
    "title": "Formules photo",
    "intro": "Chaque séance est préparée avec vous. Photos retouchées livrées en galerie privée sous 15 jours.",
    "images": false,
    "illustrations": false,
    "cats": [
      {
        "name": "Portrait & famille",
        "note": "",
        "items": [
          {
            "name": "Portrait",
            "desc": "Séance 1 h, 10 photos retouchées",
            "price": "90 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Famille",
            "desc": "Séance 1 h 30 en extérieur, 20 photos",
            "price": "150 €",
            "tag": "Populaire",
            "star": true
          },
          {
            "name": "Grossesse & naissance",
            "desc": "À domicile ou en studio",
            "price": "dès 160 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Mariage",
        "note": "Sur devis",
        "items": [
          {
            "name": "Mariage — journée complète",
            "desc": "Préparatifs à soirée, galerie en ligne",
            "price": "dès 1 400 €",
            "tag": "Signature",
            "star": true
          },
          {
            "name": "Mariage — cérémonie",
            "desc": "Cérémonie et vin d'honneur",
            "price": "dès 750 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Séance engagement",
            "desc": "Avant le grand jour",
            "price": "180 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Professionnel",
        "note": "",
        "items": [
          {
            "name": "Portraits d'équipe",
            "desc": "Pour votre site et LinkedIn",
            "price": "dès 220 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Photo culinaire",
            "desc": "Pour restaurants et traiteurs",
            "price": "dès 180 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Tirage d'art",
            "desc": "Papier fine art, format A3",
            "price": "dès 35 €",
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
        "Sur rendez-vous",
        "Du lundi au samedi"
      ]
    ],
    "address": "Studio à Lyon · déplacement possible en région",
    "phone": "06 98 76 54 32",
    "email": "hello@studio-lumiere.example",
    "note": "Indiquez la date et le lieu de votre projet.",
    "form": {
      "title": "Parlons de votre projet",
      "options": [
        "Portrait",
        "Famille",
        "Mariage",
        "Entreprise"
      ],
      "button": "Demander un devis",
      "success": "Merci ! Je vous réponds sous 48 h avec une proposition.",
      "itemCta": "Demander un devis"
    }
  }
};
