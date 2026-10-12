/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Le Comptoir »
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
  "name": "Le Comptoir",
  "short": "Restaurant",
  "tagline": "Bistrot de quartier. Cuisine de saison, faite maison.",
  "theme": {
    "layout": "B",
    "visual": "plate",
    "headFont": "Playfair Display",
    "bodyFont": "Inter",
    "headWeight": 600,
    "upper": false,
    "radius": 2,
    "bg": "#17100d",
    "bg2": "#1f1612",
    "ink": "#f3e9d8",
    "mut": "#b9a994",
    "acc": "#c9a15b",
    "acc2": "#8a6a35",
    "line": "#3a2b22",
    "card": "#1c1410",
    "onacc": "#17100d"
  },
  "home": {
    "kicker": "Bistrot · cuisine maison",
    "title": "L'art de la table, {sans chichi}.",
    "text": "Produits de saison, recettes de caractère et une salle chaleureuse au cœur de la ville. Déjeuner entre collègues ou dîner à deux, il y a toujours une place pour vous.",
    "cta": "Réserver une table",
    "cta2": "Voir la carte",
    "highlightsTitle": "Les plats du moment",
    "highlightsText": "Trois incontournables de la carte actuelle.",
    "aboutTitle": "Un lieu pensé pour se retrouver",
    "about": "Nous cuisinons avec des producteurs de la région et des recettes transmises. Une salle chaleureuse, une terrasse dès les beaux jours, et toujours le même plaisir de recevoir.",
    "stats": [
      [
        "100 %",
        "fait maison"
      ],
      [
        "25",
        "producteurs locaux"
      ],
      [
        "12",
        "mois de carte renouvelée"
      ]
    ],
    "features": [
      [
        "Produits de saison",
        "Des arrivages chaque semaine, une carte qui change."
      ],
      [
        "Salle & terrasse",
        "Jusqu'à 45 couverts, terrasse chauffée l'hiver."
      ],
      [
        "Menus de groupe",
        "Repas d'entreprise et événements sur demande."
      ]
    ],
    "ctaTitle": "Une table vous attend",
    "ctaText": "Réservez en deux minutes."
  },
  "offers": {
    "label": "La carte",
    "title": "Une cuisine de saison",
    "intro": "La carte change chaque mois selon les arrivages. Les plats sont cuisinés sur place, tous les jours.",
    "images": true,
    "cats": [
      {
        "name": "Entrées",
        "note": "",
        "items": [
          {
            "name": "Velouté de potimarron",
            "desc": "Éclats de noisette, crème fumée",
            "price": "9 €",
            "tag": "Saison",
            "star": true,
            "img": "veloute"
          },
          {
            "name": "Œuf parfait",
            "desc": "Champignons des bois, jus de viande",
            "price": "11 €",
            "tag": "",
            "star": false,
            "img": "oeuf"
          },
          {
            "name": "Terrine de campagne",
            "desc": "Cornichons, pain grillé",
            "price": "10 €",
            "tag": "",
            "star": false,
            "img": "terrine"
          },
          {
            "name": "Salade de chèvre chaud",
            "desc": "Miel, noix, mesclun",
            "price": "11 €",
            "tag": "",
            "star": false,
            "img": "salade-chevre"
          }
        ]
      },
      {
        "name": "Plats",
        "note": "",
        "items": [
          {
            "name": "Magret de canard",
            "desc": "Purée truffée, jus au miel",
            "price": "26 €",
            "tag": "Signature",
            "star": true,
            "img": "magret"
          },
          {
            "name": "Pavé de cabillaud",
            "desc": "Risotto crémeux, beurre blanc",
            "price": "24 €",
            "tag": "",
            "star": false,
            "img": "cabillaud"
          },
          {
            "name": "Burger du Comptoir",
            "desc": "Bœuf français, cheddar, frites maison",
            "price": "19 €",
            "tag": "Best-seller",
            "star": true,
            "img": "burger"
          },
          {
            "name": "Risotto aux champignons",
            "desc": "Parmesan 24 mois (végétarien)",
            "price": "18 €",
            "tag": "",
            "star": false,
            "img": "risotto"
          }
        ]
      },
      {
        "name": "Desserts",
        "note": "",
        "items": [
          {
            "name": "Tarte tatin",
            "desc": "Crème d'Isigny",
            "price": "9 €",
            "tag": "",
            "star": false,
            "img": "tarte-tatin"
          },
          {
            "name": "Fondant au chocolat",
            "desc": "Cœur coulant, glace vanille",
            "price": "10 €",
            "tag": "",
            "star": false,
            "img": "fondant"
          },
          {
            "name": "Café gourmand",
            "desc": "Trois mignardises",
            "price": "8 €",
            "tag": "",
            "star": false,
            "img": "cafe-gourmand"
          }
        ]
      },
      {
        "name": "Boissons",
        "note": "",
        "items": [
          {
            "name": "Vin au verre",
            "desc": "Rouge, blanc ou rosé du moment",
            "price": "6 €",
            "tag": "",
            "star": false,
            "img": "vin-verre"
          },
          {
            "name": "Bière artisanale",
            "desc": "Pression 25 cl",
            "price": "5 €",
            "tag": "",
            "star": false,
            "img": "biere"
          },
          {
            "name": "Café, thé, infusion",
            "desc": "",
            "price": "2,50 €",
            "tag": "",
            "star": false,
            "img": "cafe"
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
        "Mardi – Dimanche",
        "12h–14h30 · 19h–22h30"
      ],
      [
        "Lundi",
        "Fermé"
      ]
    ],
    "address": "12 rue des Halles, 75001 Paris",
    "phone": "01 23 45 67 89",
    "email": "contact@lecomptoir.example",
    "note": "Réponse sous 24 h. Pour le jour même, appelez-nous directement.",
    "form": {
      "title": "Réserver une table",
      "options": [
        "Déjeuner",
        "Dîner",
        "Groupe (8 pers. et +)",
        "Privatisation"
      ],
      "button": "Envoyer ma demande",
      "success": "Merci ! Nous vous confirmons la réservation par téléphone.",
      "itemCta": "Réserver"
    }
  }
};
