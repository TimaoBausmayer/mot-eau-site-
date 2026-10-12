/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Boucherie Maison Lefèvre »
   Modifie ce fichier pour tout changer : textes, prix, horaires, couleurs, polices.
   Enregistre, recharge la page : c'est à jour. (Garde les guillemets et les virgules.)
   - theme.layout : "A" (moderne), "B" (carte/éditorial), "C" (affiche, gros titres)
   - theme.visual : pizza, cheese, steak, bread, flower, pole, wheel, pipes, stones,
                    aperture, wine, mandala, barbell, rings, plate, candles
   - Dans un texte, {mot} met le mot en couleur (titre de l'accueil).
   - Un produit avec un "tag" est mis en avant sur l'accueil.
   - Photos des produits : "img": "pizza-margherita" (illustration) ou "photo": "photos/ma-photo.jpg"
     (ta vraie photo, placée dans le dossier de la maquette). La photo remplace l'illustration.
   ===================================================================== */
window.SITE = {
  "name": "Boucherie Maison Lefèvre",
  "short": "Boucherie",
  "tagline": "Viande française, découpe à la demande, quatre générations de bouchers.",
  "theme": {
    "layout": "C",
    "visual": "steak",
    "headFont": "Oswald",
    "bodyFont": "Inter",
    "headWeight": 600,
    "upper": true,
    "radius": 2,
    "bg": "#17110f",
    "bg2": "#211815",
    "ink": "#f6ece7",
    "mut": "#b79d95",
    "acc": "#e0382e",
    "acc2": "#ff7a59",
    "line": "#3a2723",
    "card": "#1d1412",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Boucher · traiteur · Toulouse",
    "title": "La viande de {caractère}, du producteur à votre table.",
    "text": "Bœuf, veau, agneau et volaille de nos éleveurs, découpés à la demande et préparés par notre équipe. Maturation en cave, traiteur et click & collect.",
    "cta": "Commander ma viande",
    "cta2": "Nos produits",
    "highlightsTitle": "Les morceaux du moment",
    "highlightsText": "Nos coups de cœur de la semaine.",
    "aboutTitle": "Le métier, le vrai",
    "about": "Quatre générations de bouchers. Nous sélectionnons des bêtes locales, travaillons à la découpe et conseillons chaque cuisson. Ici, on connaît l'origine de chaque morceau.",
    "stats": [
      [
        "4",
        "générations de bouchers"
      ],
      [
        "100 %",
        "viande française"
      ],
      [
        "21 j",
        "de maturation"
      ]
    ],
    "features": [
      [
        "Origine française",
        "Toute la viande est traçable."
      ],
      [
        "Découpe sur mesure",
        "À l'épaisseur que vous voulez."
      ],
      [
        "Click & collect",
        "Commandez, passez la récupérer."
      ]
    ],
    "ctaTitle": "Une commande à préparer ?",
    "ctaText": "Click & collect, on s'occupe du reste."
  },
  "offers": {
    "label": "Au comptoir",
    "title": "Au comptoir",
    "intro": "Toute la viande est française et traçable. Dites-nous l'épaisseur, on découpe devant vous.",
    "images": true,
    "cats": [
      {
        "name": "Bœuf & veau",
        "note": "Maturation 21 jours",
        "items": [
          {
            "name": "Côte de bœuf maturée",
            "desc": "Persillée, tendre, à partager",
            "price": "36 €/kg",
            "tag": "Signature",
            "star": true,
            "img": "cote-boeuf"
          },
          {
            "name": "Entrecôte",
            "desc": "Tendre et savoureuse",
            "price": "28 €/kg",
            "tag": "",
            "star": false,
            "img": "entrecote"
          },
          {
            "name": "Rôti de veau",
            "desc": "Fermier, élevé sous la mère",
            "price": "26 €/kg",
            "tag": "",
            "star": false,
            "img": "roti-veau"
          },
          {
            "name": "Steak haché pur bœuf",
            "desc": "Haché à la demande",
            "price": "16 €/kg",
            "tag": "",
            "star": false,
            "img": "steak-hache"
          }
        ]
      },
      {
        "name": "Agneau, porc & volaille",
        "note": "",
        "items": [
          {
            "name": "Gigot d'agneau",
            "desc": "Élevé en plein air",
            "price": "24 €/kg",
            "tag": "",
            "star": false,
            "img": "gigot"
          },
          {
            "name": "Poulet fermier",
            "desc": "Label rouge, élevé à l'herbe",
            "price": "12 €/kg",
            "tag": "",
            "star": false,
            "img": "poulet"
          },
          {
            "name": "Côtes de porc",
            "desc": "Porc fermier",
            "price": "14 €/kg",
            "tag": "",
            "star": false,
            "img": "cotes-porc"
          },
          {
            "name": "Saucisses maison",
            "desc": "Recette de la maison, sans additifs",
            "price": "14 €/kg",
            "tag": "Fait maison",
            "star": true,
            "img": "saucisses"
          }
        ]
      },
      {
        "name": "Traiteur & barbecue",
        "note": "Sur commande 48 h",
        "items": [
          {
            "name": "Panier barbecue",
            "desc": "Brochettes, merguez, côtelettes (4 pers.)",
            "price": "29 €",
            "tag": "Été",
            "star": true,
            "img": "panier-bbq"
          },
          {
            "name": "Plateau de charcuterie",
            "desc": "Pour 6 personnes",
            "price": "32 €",
            "tag": "",
            "star": false,
            "img": "charcuterie"
          },
          {
            "name": "Plat du jour à emporter",
            "desc": "Cuisiné par notre traiteur",
            "price": "9 €",
            "tag": "",
            "star": false,
            "img": "plat-jour"
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
        "7h30–13h · 15h30–19h30"
      ],
      [
        "Dimanche",
        "7h30–12h30"
      ],
      [
        "Lundi",
        "Fermé"
      ]
    ],
    "address": "18 rue Gambetta, 31000 Toulouse",
    "phone": "05 61 23 45 67",
    "email": "boucherie@lefevre.example",
    "note": "Commande 48 h à l'avance pour les pièces à rôtir.",
    "form": {
      "title": "Passer commande",
      "options": [
        "Commande de viande",
        "Barbecue / fête",
        "Traiteur",
        "Autre"
      ],
      "button": "Envoyer ma commande",
      "success": "Merci ! Votre commande sera prête à l'heure indiquée.",
      "itemCta": "Commander"
    }
  }
};
