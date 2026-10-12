/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « PEAK Coaching »
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
  "name": "PEAK Coaching",
  "short": "Coach sportif",
  "tagline": "Coaching sportif personnalisé, en salle ou à distance.",
  "theme": {
    "layout": "C",
    "visual": "barbell",
    "headFont": "Anton",
    "bodyFont": "Barlow",
    "headWeight": 400,
    "upper": true,
    "radius": 0,
    "bg": "#1a35e8",
    "bg2": "#142bc0",
    "ink": "#ffffff",
    "mut": "#cdd5ff",
    "acc": "#ffd400",
    "acc2": "#ff7a00",
    "line": "#3a56f0",
    "card": "#2240ee",
    "onacc": "#0b1230"
  },
  "home": {
    "kicker": "Coaching sportif · Nantes",
    "title": "Transforme ton corps. {Dépasse} tes limites.",
    "text": "Un programme sur mesure, un suivi chaque semaine et des résultats que tu peux mesurer. Séances en salle ou en visio, pour débutants comme confirmés.",
    "cta": "Séance découverte offerte",
    "cta2": "Voir les programmes",
    "highlightsTitle": "Les formules les plus demandées",
    "highlightsText": "Trois façons de commencer.",
    "aboutTitle": "Un coach, un plan, des résultats",
    "about": "Ancien sportif de haut niveau, je construis chaque programme autour de ton niveau, de ton emploi du temps et de ton objectif. Pas de méthode miracle : de la régularité, des mesures et du soutien.",
    "stats": [
      [
        "8 ans",
        "d'expérience"
      ],
      [
        "1:1",
        "suivi personnalisé"
      ],
      [
        "12 sem.",
        "pour un vrai changement"
      ]
    ],
    "features": [
      [
        "Bilan complet",
        "Mesures, objectifs, historique de blessures."
      ],
      [
        "Suivi chaque semaine",
        "Ajustements et motivation, par message ou en visio."
      ],
      [
        "Matériel inclus",
        "Séances en salle équipée ou à domicile."
      ]
    ],
    "ctaTitle": "Prêt à commencer ?",
    "ctaText": "Première séance découverte offerte."
  },
  "offers": {
    "label": "Programmes",
    "title": "Choisis ton programme",
    "intro": "Sans engagement long. Tu peux changer de formule à tout moment.",
    "images": false,
    "cats": [
      {
        "name": "Coaching mensuel",
        "note": "Suivi à distance",
        "items": [
          {
            "name": "Start",
            "desc": "Programme d'entraînement, plan alimentaire de base, bilan mensuel",
            "price": "49 €/mois",
            "tag": "",
            "star": false
          },
          {
            "name": "Performance",
            "desc": "Programme 100 % personnalisé, suivi nutrition, bilan hebdo en visio",
            "price": "99 €/mois",
            "tag": "Le plus choisi",
            "star": true
          },
          {
            "name": "Elite",
            "desc": "4 séances coachées par mois, analyse complète, accès prioritaire",
            "price": "199 €/mois",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Séances à l'unité",
        "note": "En salle ou en extérieur",
        "items": [
          {
            "name": "Séance découverte",
            "desc": "Bilan + première séance",
            "price": "Offerte",
            "tag": "Gratuit",
            "star": true
          },
          {
            "name": "Séance individuelle",
            "desc": "1 h avec un coach",
            "price": "45 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Carnet de 10 séances",
            "desc": "Valable 6 mois",
            "price": "390 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Séance duo",
            "desc": "1 h à deux",
            "price": "65 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Objectifs",
        "note": "Programmes de 12 semaines",
        "items": [
          {
            "name": "Perte de poids",
            "desc": "Cardio, renforcement et plan alimentaire",
            "price": "249 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Prise de masse",
            "desc": "Programme de force sur 4 jours",
            "price": "249 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Préparation physique",
            "desc": "Course, trail ou sports collectifs",
            "price": "sur devis",
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
        "6h30–20h"
      ],
      [
        "Samedi",
        "8h–13h"
      ]
    ],
    "address": "5 quai de la Fosse, 44000 Nantes",
    "phone": "06 12 34 56 78",
    "email": "coach@peak.example",
    "note": "La séance découverte est gratuite et sans engagement.",
    "form": {
      "title": "Réserver ma séance découverte",
      "options": [
        "Perte de poids",
        "Prise de masse",
        "Remise en forme",
        "Préparation physique"
      ],
      "button": "Je me lance",
      "success": "Reçu ! Je te rappelle dans la journée pour fixer le créneau.",
      "itemCta": "Choisir"
    }
  }
};
