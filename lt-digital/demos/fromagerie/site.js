/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « La Fromagerie des Alpes »
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
  "name": "La Fromagerie des Alpes",
  "short": "Fromagerie",
  "tagline": "Fromages de montagne, affinés en cave. Conseil de fromager.",
  "theme": {
    "layout": "B",
    "visual": "cheese",
    "headFont": "Cormorant Garamond",
    "bodyFont": "Hanken Grotesk",
    "headWeight": 600,
    "upper": false,
    "radius": 3,
    "bg": "#f6ecc9",
    "bg2": "#efe0ab",
    "ink": "#2b2410",
    "mut": "#6e6232",
    "acc": "#b86a00",
    "acc2": "#d99a1c",
    "line": "#dccb8a",
    "card": "#fff8dc",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Fromager affineur · Annecy",
    "title": "Des fromages d'exception, {affinés avec passion}.",
    "text": "Producteurs de montagne, affinage en cave et conseils de fromager pour vos plateaux, raclettes et repas de fête. Goûtez avant d'acheter : c'est la règle de la maison.",
    "cta": "Composer mon plateau",
    "cta2": "Nos fromages",
    "highlightsTitle": "À ne pas manquer",
    "highlightsText": "Les fromages que nous aimons faire découvrir.",
    "aboutTitle": "Un fromager qui connaît ses producteurs",
    "about": "Chaque fromage est choisi à la ferme, affiné dans notre cave et conseillé avec le sourire. Nous travaillons avec douze fermes que nous visitons nous-mêmes.",
    "stats": [
      [
        "45",
        "fromages à la coupe"
      ],
      [
        "12",
        "fermes partenaires"
      ],
      [
        "100 %",
        "lait cru sélectionné"
      ]
    ],
    "features": [
      [
        "Producteurs de montagne",
        "Des fermes que nous visitons nous-mêmes."
      ],
      [
        "Affinage en cave",
        "Chaque pièce atteint son point idéal."
      ],
      [
        "Plateaux sur commande",
        "De 2 à 40 personnes, à retirer ou livrés."
      ]
    ],
    "ctaTitle": "Un plateau pour votre table ?",
    "ctaText": "Commandez 48 h à l'avance."
  },
  "offers": {
    "label": "Nos fromages",
    "title": "Notre sélection",
    "intro": "Une quarantaine de fromages à la coupe, selon la saison et nos visites chez les producteurs.",
    "images": true,
    "illustrations": false,
    "cats": [
      {
        "name": "Pâtes dures et pressées",
        "note": "",
        "items": [
          {
            "name": "Comté 24 mois",
            "desc": "Fruité, noisette, cristaux de tyrosine",
            "price": "29 €/kg",
            "tag": "Coup de cœur",
            "star": true,
            "img": "comte",
            "photo": "../photos/comte.jpg"
          },
          {
            "name": "Beaufort d'été",
            "desc": "Lait d'alpage, onctueux",
            "price": "34 €/kg",
            "tag": "",
            "star": false,
            "img": "beaufort",
            "photo": "../photos/beaufort.jpg"
          },
          {
            "name": "Abondance fermier",
            "desc": "Lait cru, notes de noisette",
            "price": "27 €/kg",
            "tag": "",
            "star": false,
            "img": "abondance",
            "photo": "../photos/abondance.jpg"
          }
        ]
      },
      {
        "name": "Pâtes molles et chèvres",
        "note": "",
        "items": [
          {
            "name": "Reblochon fermier",
            "desc": "Crémeux, au lait cru de Savoie",
            "price": "24 €/kg",
            "tag": "Local",
            "star": true,
            "img": "reblochon",
            "photo": "../photos/reblochon.jpg"
          },
          {
            "name": "Brie de Meaux",
            "desc": "Onctueux, croûte fleurie",
            "price": "21 €/kg",
            "tag": "",
            "star": false,
            "img": "brie",
            "photo": "../photos/brie.jpg"
          },
          {
            "name": "Chèvre cendré",
            "desc": "Frais et léger, affiné 3 semaines",
            "price": "7 €/pièce",
            "tag": "",
            "star": false,
            "img": "chevre",
            "photo": "../photos/chevre.jpg"
          },
          {
            "name": "Saint-Marcellin",
            "desc": "Coulant, à la cuillère",
            "price": "3,80 €",
            "tag": "",
            "star": false,
            "img": "saint-marcellin",
            "photo": "../photos/saint-marcellin.jpg"
          }
        ]
      },
      {
        "name": "Plateaux & raclette",
        "note": "Sur commande, 48 h",
        "items": [
          {
            "name": "Plateau 6 personnes",
            "desc": "5 fromages, confiture et noix",
            "price": "39 €",
            "tag": "Fête",
            "star": true,
            "img": "plateau-6",
            "photo": "../photos/plateau-6.jpg"
          },
          {
            "name": "Plateau 12 personnes",
            "desc": "8 fromages, pain et fruits secs",
            "price": "72 €",
            "tag": "",
            "star": false,
            "img": "plateau-12",
            "photo": "../photos/plateau-12.jpg"
          },
          {
            "name": "Kit raclette",
            "desc": "Fromage, charcuterie, pommes de terre",
            "price": "18 €/pers.",
            "tag": "",
            "star": false,
            "img": "raclette",
            "photo": "../photos/raclette.jpg"
          },
          {
            "name": "Fondue savoyarde",
            "desc": "Trois fromages, pain, vin blanc",
            "price": "16 €/pers.",
            "tag": "",
            "star": false,
            "img": "fondue",
            "photo": "../photos/fondue.jpg"
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
        "8h–13h · 15h–19h"
      ],
      [
        "Dimanche",
        "8h–12h30"
      ],
      [
        "Lundi",
        "Fermé"
      ]
    ],
    "address": "4 place du Marché, 74000 Annecy",
    "phone": "04 50 12 34 56",
    "email": "fromagerie@alpes.example",
    "note": "Commande à passer 48 h à l'avance pour les plateaux.",
    "form": {
      "title": "Commander un plateau",
      "options": [
        "Plateau de fête",
        "Raclette / fondue",
        "Cadeau gourmand",
        "Autre demande"
      ],
      "button": "Envoyer ma commande",
      "success": "Merci ! Nous confirmons votre commande par téléphone.",
      "itemCta": "Commander"
    }
  }
};
