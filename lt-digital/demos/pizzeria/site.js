/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Pizzeria Bella Napoli »
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
  "name": "Pizzeria Bella Napoli",
  "short": "Pizzeria",
  "tagline": "Pizza napolitaine au feu de bois. Sur place, à emporter, en livraison.",
  "theme": {
    "layout": "C",
    "visual": "pizza",
    "headFont": "Bebas Neue",
    "bodyFont": "DM Sans",
    "headWeight": 400,
    "upper": true,
    "radius": 3,
    "bg": "#fff4df",
    "bg2": "#ffe6b8",
    "ink": "#2b1a10",
    "mut": "#8a6a4f",
    "acc": "#d8281f",
    "acc2": "#2f8f3a",
    "line": "#f0d29a",
    "card": "#ffffff",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Pizzeria napolitaine · Marseille",
    "title": "La vraie pizza napolitaine, {cuite au feu de bois}.",
    "text": "Pâte maturée 48 h, tomates San Marzano et mozzarella fraîche. Sur place, à emporter ou en livraison, chaude et croustillante.",
    "cta": "Commander en ligne",
    "cta2": "Voir la carte",
    "highlightsTitle": "Les plus commandées",
    "highlightsText": "Les pizzas que tout le monde demande.",
    "aboutTitle": "Né à Naples, cuit chez vous",
    "about": "Notre four à bois monte à 450 °C et cuit chaque pizza en 90 secondes. Une pâte légère, des produits italiens et beaucoup de passion.",
    "stats": [
      [
        "48 h",
        "de maturation de la pâte"
      ],
      [
        "90 s",
        "de cuisson à 450 °C"
      ],
      [
        "20+",
        "recettes à la carte"
      ]
    ],
    "features": [
      [
        "Four à bois",
        "Cuisson traditionnelle, pâte aérée."
      ],
      [
        "Livraison rapide",
        "En 30 minutes, chaude et croustillante."
      ],
      [
        "Produits frais",
        "Italiens et locaux, jamais surgelés."
      ]
    ],
    "ctaTitle": "Une faim de napolitain ?",
    "ctaText": "Commandez, on enfourne."
  },
  "offers": {
    "label": "La carte",
    "title": "Nos pizzas",
    "intro": "Une pâte légère, des produits italiens, une cuisson de 90 secondes à 450 °C.",
    "images": true,
    "cats": [
      {
        "name": "Les classiques",
        "note": "Base tomate",
        "items": [
          {
            "name": "Margherita",
            "desc": "Tomate, mozzarella, basilic",
            "price": "9 €",
            "tag": "Classique",
            "star": true,
            "img": "pizza-margherita"
          },
          {
            "name": "Regina",
            "desc": "Jambon, champignons, mozzarella",
            "price": "12 €",
            "tag": "",
            "star": false,
            "img": "pizza-regina"
          },
          {
            "name": "Diavola",
            "desc": "Salami piquant, tomate, mozzarella",
            "price": "13 €",
            "tag": "Épicée",
            "star": true,
            "img": "pizza-diavola"
          },
          {
            "name": "Napoli",
            "desc": "Anchois, câpres, olives",
            "price": "12 €",
            "tag": "",
            "star": false,
            "img": "pizza-napoli"
          }
        ]
      },
      {
        "name": "Les spéciales",
        "note": "",
        "items": [
          {
            "name": "Quattro Formaggi",
            "desc": "Mozzarella, gorgonzola, parmesan, chèvre",
            "price": "14 €",
            "tag": "Best-seller",
            "star": true,
            "img": "pizza-4fromages"
          },
          {
            "name": "Burrata",
            "desc": "Burrata, roquette, tomates cerises",
            "price": "15 €",
            "tag": "",
            "star": false,
            "img": "pizza-burrata"
          },
          {
            "name": "Calzone",
            "desc": "Jambon, ricotta, mozzarella (pliée)",
            "price": "13 €",
            "tag": "",
            "star": false,
            "img": "calzone"
          },
          {
            "name": "Végétarienne",
            "desc": "Légumes grillés, mozzarella, pesto",
            "price": "12 €",
            "tag": "",
            "star": false,
            "img": "pizza-vege"
          }
        ]
      },
      {
        "name": "Desserts & boissons",
        "note": "",
        "items": [
          {
            "name": "Tiramisu maison",
            "desc": "Recette traditionnelle",
            "price": "6 €",
            "tag": "",
            "star": false,
            "img": "tiramisu"
          },
          {
            "name": "Panna cotta",
            "desc": "Coulis de fruits rouges",
            "price": "5 €",
            "tag": "",
            "star": false,
            "img": "pannacotta"
          },
          {
            "name": "Boissons italiennes",
            "desc": "Limonade, Aperol sans alcool, café",
            "price": "dès 3 €",
            "tag": "",
            "star": false,
            "img": "spritz"
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
        "Tous les jours",
        "11h30–14h30 · 18h30–23h"
      ]
    ],
    "address": "7 rue de la République, 13001 Marseille",
    "phone": "04 91 23 45 67",
    "email": "ciao@bellanapoli.example",
    "note": "Livraison dans un rayon de 5 km.",
    "form": {
      "title": "Réserver ou commander",
      "options": [
        "Sur place",
        "À emporter",
        "Livraison",
        "Événement"
      ],
      "button": "Envoyer",
      "success": "Grazie ! Nous confirmons dans quelques minutes.",
      "itemCta": "Commander"
    }
  }
};
