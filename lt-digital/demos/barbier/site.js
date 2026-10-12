/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Barber Club 1925 »
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
  "name": "Barber Club 1925",
  "short": "Barbier",
  "tagline": "Salon pour hommes à l'ancienne : coupe, barbe, rasage à la lame.",
  "theme": {
    "layout": "C",
    "visual": "pole",
    "headFont": "Archivo Black",
    "bodyFont": "Inter",
    "headWeight": 400,
    "upper": true,
    "radius": 2,
    "bg": "#0e0e11",
    "bg2": "#17171c",
    "ink": "#f2efe8",
    "mut": "#a09d95",
    "acc": "#d4a84b",
    "acc2": "#f0d78c",
    "line": "#2a2a31",
    "card": "#131317",
    "onacc": "#0e0e11"
  },
  "home": {
    "kicker": "Barbier · Nantes",
    "title": "Coupe, barbe, {style}. Rien que du propre.",
    "text": "Un salon pour hommes à l'ancienne : coupe aux ciseaux, taille de barbe, rasage à la lame chaude. Prenez rendez-vous en ligne ou passez directement.",
    "cta": "Réserver mon créneau",
    "cta2": "Les tarifs",
    "highlightsTitle": "Les formules",
    "highlightsText": "Les prestations les plus réservées.",
    "aboutTitle": "L'art du barbier",
    "about": "Une ambiance chaleureuse, des barbiers passionnés et un souci du détail. Fauteuils d'époque, produits de qualité et un whisky ou un café offert pendant votre coupe.",
    "stats": [
      [
        "4",
        "barbiers expérimentés"
      ],
      [
        "30 min",
        "par prestation"
      ],
      [
        "9 h 30",
        "première coupe"
      ]
    ],
    "features": [
      [
        "Réservation en ligne",
        "Choisissez votre barbier et votre heure."
      ],
      [
        "Boisson offerte",
        "Un café ou un whisky pendant la coupe."
      ],
      [
        "Produits premium",
        "Soins et cires de qualité."
      ]
    ],
    "ctaTitle": "Un créneau pour vous",
    "ctaText": "Réservez en ligne en deux minutes."
  },
  "offers": {
    "label": "Tarifs",
    "title": "Prestations & tarifs",
    "intro": "Sur rendez-vous ou sans, selon l'affluence. Boisson offerte pendant la coupe.",
    "images": false,
    "illustrations": false,
    "cats": [
      {
        "name": "Coupes",
        "note": "",
        "items": [
          {
            "name": "Coupe homme",
            "desc": "Shampoing, coupe, coiffage",
            "price": "25 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Coupe dégradé",
            "desc": "Tondeuse et ciseaux, finitions rasoir",
            "price": "28 €",
            "tag": "Best-seller",
            "star": true
          },
          {
            "name": "Coupe enfant",
            "desc": "Moins de 12 ans",
            "price": "16 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Barbe & rasage",
        "note": "",
        "items": [
          {
            "name": "Taille de barbe",
            "desc": "Contours et soin",
            "price": "15 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Rasage à la lame",
            "desc": "Serviette chaude, huile de rasage",
            "price": "22 €",
            "tag": "Signature",
            "star": true
          },
          {
            "name": "Soin du visage",
            "desc": "Gommage et masque",
            "price": "20 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Formules",
        "note": "",
        "items": [
          {
            "name": "Coupe + barbe",
            "desc": "Formule complète",
            "price": "35 €",
            "tag": "Le plus choisi",
            "star": true
          },
          {
            "name": "Forfait grand jour",
            "desc": "Coupe, barbe et soin visage",
            "price": "55 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Carte de fidélité",
            "desc": "10 coupes, la 11e offerte",
            "price": "250 €",
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
        "9h30–19h30"
      ],
      [
        "Dimanche – Lundi",
        "Fermé"
      ]
    ],
    "address": "21 rue Saint-Michel, 44000 Nantes",
    "phone": "02 40 12 34 56",
    "email": "club@barber1925.example",
    "note": "Annulation possible jusqu'à 3 h avant le rendez-vous.",
    "form": {
      "title": "Réserver",
      "options": [
        "Coupe",
        "Barbe",
        "Coupe + barbe",
        "Autre"
      ],
      "button": "Réserver",
      "success": "Merci ! Nous confirmons votre créneau par SMS.",
      "itemCta": "Réserver"
    }
  }
};
