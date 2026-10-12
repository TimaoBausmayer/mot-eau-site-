/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « La Cave du Sommelier »
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
  "name": "La Cave du Sommelier",
  "short": "Caviste",
  "tagline": "Vins, champagnes et spiritueux de vignerons indépendants.",
  "theme": {
    "layout": "B",
    "visual": "wine",
    "headFont": "Playfair Display",
    "bodyFont": "Inter",
    "headWeight": 600,
    "upper": false,
    "radius": 2,
    "bg": "#1a0f14",
    "bg2": "#25161d",
    "ink": "#f4e9e4",
    "mut": "#b79ea4",
    "acc": "#c43d5c",
    "acc2": "#d8a657",
    "line": "#3b2530",
    "card": "#201218",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Caviste indépendant · Bordeaux",
    "title": "Des vins de {vignerons passionnés}.",
    "text": "Sélection de vins, champagnes et spiritueux, conseils personnalisés, dégustations et coffrets cadeaux. Dites-nous votre plat ou votre budget, on trouve la bouteille.",
    "cta": "Découvrir la sélection",
    "cta2": "Prendre rendez-vous",
    "highlightsTitle": "Nos coups de cœur",
    "highlightsText": "Des bouteilles à partager.",
    "aboutTitle": "Le plaisir de la dégustation",
    "about": "Chaque bouteille est goûtée et choisie. Nous organisons des dégustations avec les vignerons et vous conseillons selon vos goûts, votre repas et votre budget.",
    "stats": [
      [
        "300+",
        "références"
      ],
      [
        "30",
        "vignerons indépendants"
      ],
      [
        "1 / mois",
        "soirée dégustation"
      ]
    ],
    "features": [
      [
        "Conseil de sommelier",
        "L'accord parfait pour chaque repas."
      ],
      [
        "Coffrets cadeaux",
        "Personnalisés selon le budget."
      ],
      [
        "Livraison",
        "À domicile ou en entreprise."
      ]
    ],
    "ctaTitle": "Une bouteille pour l'occasion ?",
    "ctaText": "Dites-nous le plat, nous choisissons le vin."
  },
  "offers": {
    "label": "La cave",
    "title": "Notre cave",
    "intro": "Plus de trois cents références, toutes goûtées et choisies par nos soins.",
    "images": false,
    "cats": [
      {
        "name": "Vins rouges",
        "note": "",
        "items": [
          {
            "name": "Bordeaux supérieur",
            "desc": "Château familial, 2019",
            "price": "18 €",
            "tag": "Coup de cœur",
            "star": true
          },
          {
            "name": "Saint-Émilion grand cru",
            "desc": "Boisé, soyeux",
            "price": "34 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Côtes-du-Rhône",
            "desc": "Épicé et gourmand",
            "price": "12 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Blancs, rosés & bulles",
        "note": "",
        "items": [
          {
            "name": "Bourgogne blanc",
            "desc": "Chardonnay, minéral",
            "price": "24 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Rosé de Provence",
            "desc": "Frais et fruité",
            "price": "11 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Champagne brut",
            "desc": "Maison indépendante",
            "price": "34 €",
            "tag": "Fête",
            "star": true
          },
          {
            "name": "Crémant de Loire",
            "desc": "Fines bulles",
            "price": "14 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Spiritueux & coffrets",
        "note": "",
        "items": [
          {
            "name": "Whisky single malt 12 ans",
            "desc": "Écosse, notes de fruits secs",
            "price": "49 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Rhum vieux",
            "desc": "Martinique, 8 ans",
            "price": "42 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Coffret découverte",
            "desc": "3 bouteilles + guide de dégustation",
            "price": "59 €",
            "tag": "Cadeau",
            "star": true
          },
          {
            "name": "Atelier dégustation",
            "desc": "Une soirée, six vins, avec un vigneron",
            "price": "35 €",
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
        "10h–13h · 15h–20h"
      ],
      [
        "Dimanche",
        "10h–13h"
      ]
    ],
    "address": "14 quai des Chartrons, 33000 Bordeaux",
    "phone": "05 56 98 76 54",
    "email": "cave@sommelier.example",
    "note": "L'abus d'alcool est dangereux pour la santé. À consommer avec modération.",
    "form": {
      "title": "Une demande ?",
      "options": [
        "Conseil vin",
        "Coffret cadeau",
        "Dégustation",
        "Entreprise"
      ],
      "button": "Envoyer",
      "success": "Merci ! Nous revenons vers vous rapidement.",
      "itemCta": "Demander"
    }
  }
};
