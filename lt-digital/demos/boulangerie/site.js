/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Boulangerie Le Fournil »
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
  "name": "Boulangerie Le Fournil",
  "short": "Boulangerie",
  "tagline": "Artisan boulanger depuis 1987. Pains au levain, viennoiseries pur beurre.",
  "theme": {
    "layout": "A",
    "visual": "bread",
    "headFont": "Playfair Display",
    "bodyFont": "DM Sans",
    "headWeight": 600,
    "upper": false,
    "radius": 8,
    "bg": "#fdf6ea",
    "bg2": "#f6e7cb",
    "ink": "#33241a",
    "mut": "#85705e",
    "acc": "#bf6d1f",
    "acc2": "#e0a04a",
    "line": "#ead9b8",
    "card": "#ffffff",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Boulangerie artisanale · Lyon",
    "title": "Le vrai goût du pain, {fait chaque matin}.",
    "text": "Pains au levain, viennoiseries pur beurre et pâtisseries maison, cuits sur place tous les jours. Précommandez et passez récupérer sans attendre.",
    "cta": "Précommander",
    "cta2": "Nos produits",
    "highlightsTitle": "Sortis du four ce matin",
    "highlightsText": "Nos incontournables.",
    "aboutTitle": "Artisan boulanger depuis 1987",
    "about": "Nous pétrissons, façonnons et cuisons tout sur place. Farines issues de moulins locaux, levain naturel et un savoir-faire transmis de génération en génération.",
    "stats": [
      [
        "5 h",
        "début de la première fournée"
      ],
      [
        "30+",
        "produits maison"
      ],
      [
        "37 ans",
        "de savoir-faire"
      ]
    ],
    "features": [
      [
        "Farines locales",
        "Des meuniers de la région."
      ],
      [
        "Fermentation lente",
        "Plus de goût, plus de digestibilité."
      ],
      [
        "Précommande",
        "Retirez votre commande sans attendre."
      ]
    ],
    "ctaTitle": "Du pain frais demain matin ?",
    "ctaText": "Précommandez jusqu'à 17 h la veille."
  },
  "offers": {
    "label": "Nos produits",
    "title": "Notre vitrine",
    "intro": "Tout est pétri, façonné et cuit sur place. Les fournées commencent à 5 h.",
    "images": false,
    "illustrations": false,
    "cats": [
      {
        "name": "Pains",
        "note": "Farines locales, levain naturel",
        "items": [
          {
            "name": "Baguette tradition",
            "desc": "Fermentation lente de 18 h",
            "price": "1,30 €",
            "tag": "Best-seller",
            "star": true
          },
          {
            "name": "Pain au levain",
            "desc": "Croûte épaisse, mie alvéolée",
            "price": "4,80 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Pain complet",
            "desc": "Farine T110, graines",
            "price": "4,20 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Pain aux noix",
            "desc": "Idéal avec le fromage",
            "price": "5,40 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Viennoiseries",
        "note": "Pur beurre",
        "items": [
          {
            "name": "Croissant",
            "desc": "Feuilletage maison",
            "price": "1,40 €",
            "tag": "Signature",
            "star": true
          },
          {
            "name": "Pain au chocolat",
            "desc": "Deux barres de chocolat",
            "price": "1,60 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Chausson aux pommes",
            "desc": "Compote maison",
            "price": "1,90 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Pâtisseries & salé",
        "note": "",
        "items": [
          {
            "name": "Tarte aux fruits",
            "desc": "Fruits de saison, part individuelle",
            "price": "3,90 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Gâteau sur commande",
            "desc": "À partir de 6 parts",
            "price": "28 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Sandwich du jour",
            "desc": "Pain frais, produits locaux",
            "price": "5,50 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Formule déjeuner",
            "desc": "Sandwich, dessert, boisson",
            "price": "8,90 €",
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
        "Lundi – Samedi",
        "6h30–19h30"
      ],
      [
        "Dimanche",
        "7h–13h"
      ]
    ],
    "address": "2 rue du Four, 69003 Lyon",
    "phone": "04 72 12 34 56",
    "email": "fournil@example.example",
    "note": "Précommande possible jusqu'à la veille 17 h.",
    "form": {
      "title": "Précommander",
      "options": [
        "Pain & viennoiseries",
        "Gâteau d'anniversaire",
        "Buffet / traiteur",
        "Autre"
      ],
      "button": "Envoyer ma précommande",
      "success": "Merci ! Votre commande sera prête à l'heure choisie.",
      "itemCta": "Précommander"
    }
  }
};
