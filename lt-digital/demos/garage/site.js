/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Garage Auto Performance »
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
  "name": "Garage Auto Performance",
  "short": "Garage auto",
  "tagline": "Entretien, pneus, freins et diagnostic toutes marques.",
  "theme": {
    "layout": "C",
    "visual": "wheel",
    "headFont": "Barlow Condensed",
    "bodyFont": "Inter",
    "headWeight": 600,
    "upper": true,
    "radius": 2,
    "bg": "#eff0f2",
    "bg2": "#e2e4e8",
    "ink": "#10151d",
    "mut": "#5a6372",
    "acc": "#e4500a",
    "acc2": "#10151d",
    "line": "#c8ccd4",
    "card": "#ffffff",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Garage indépendant · Grenoble",
    "title": "Votre voiture entre de {bonnes mains}.",
    "text": "Entretien, révision, pneus, freins et diagnostic toutes marques. Un devis clair avant chaque intervention, et vous validez avant que l'on démarre.",
    "cta": "Prendre rendez-vous",
    "cta2": "Nos prestations",
    "highlightsTitle": "Nos prestations phares",
    "highlightsText": "Les interventions les plus demandées.",
    "aboutTitle": "Un garage de confiance",
    "about": "Atelier équipé, mécaniciens qualifiés et pièces de qualité. On vous explique tout, vous validez le devis avant de démarrer, et vous repartez avec une facture détaillée.",
    "stats": [
      [
        "15 ans",
        "d'expérience"
      ],
      [
        "100 %",
        "devis avant travaux"
      ],
      [
        "2 ans",
        "de garantie pièces"
      ]
    ],
    "features": [
      [
        "Devis transparent",
        "Pas de mauvaise surprise."
      ],
      [
        "Véhicule de courtoisie",
        "Sur demande, selon disponibilité."
      ],
      [
        "Intervention rapide",
        "Révision en 24 h."
      ]
    ],
    "ctaTitle": "Un souci avec votre voiture ?",
    "ctaText": "Rendez-vous sous 48 h."
  },
  "offers": {
    "label": "Prestations",
    "title": "Nos prestations",
    "intro": "Tarifs affichés, devis avant travaux et pièces de qualité équivalente ou d'origine.",
    "images": false,
    "illustrations": false,
    "cats": [
      {
        "name": "Entretien",
        "note": "",
        "items": [
          {
            "name": "Vidange + filtres",
            "desc": "Huile premium, contrôle 20 points",
            "price": "dès 89 €",
            "tag": "Populaire",
            "star": true
          },
          {
            "name": "Révision constructeur",
            "desc": "Selon le carnet d'entretien",
            "price": "dès 159 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Courroie de distribution",
            "desc": "Kit complet, main-d'œuvre incluse",
            "price": "dès 420 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Climatisation",
            "desc": "Recharge et désinfection",
            "price": "69 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Pneus & freinage",
        "note": "",
        "items": [
          {
            "name": "Pneumatiques",
            "desc": "Montage, équilibrage, géométrie",
            "price": "dès 49 €",
            "tag": "Rapide",
            "star": true
          },
          {
            "name": "Freinage avant",
            "desc": "Plaquettes et disques",
            "price": "dès 120 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Géométrie",
            "desc": "Réglage du parallélisme",
            "price": "65 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Diagnostic & contrôle",
        "note": "",
        "items": [
          {
            "name": "Diagnostic électronique",
            "desc": "Lecture des défauts",
            "price": "45 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Batterie",
            "desc": "Test et remplacement",
            "price": "dès 79 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Préparation contrôle technique",
            "desc": "Vérification avant passage",
            "price": "49 €",
            "tag": "Conseillé",
            "star": true
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
        "8h–12h · 14h–18h30"
      ],
      [
        "Samedi",
        "8h–12h"
      ]
    ],
    "address": "ZA des Pins, 38000 Grenoble",
    "phone": "04 76 12 34 56",
    "email": "atelier@garage-perf.example",
    "note": "Précisez la marque, le modèle et l'année de votre véhicule.",
    "form": {
      "title": "Demander un rendez-vous",
      "options": [
        "Entretien / révision",
        "Pneus",
        "Freins",
        "Diagnostic",
        "Autre"
      ],
      "button": "Demander un rendez-vous",
      "success": "Merci ! Nous vous confirmons le créneau par téléphone.",
      "itemCta": "Prendre rendez-vous"
    }
  }
};
