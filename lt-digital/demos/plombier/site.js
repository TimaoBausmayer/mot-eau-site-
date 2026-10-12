/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Duval Plomberie & Chauffage »
   Modifie ce fichier pour tout changer : textes, prix, horaires, couleurs, polices.
   Enregistre, recharge la page : c'est à jour. (Garde les guillemets et les virgules.)
   - theme.layout : "A" (moderne), "B" (carte/éditorial), "C" (affiche, gros titres)
   - theme.visual : pizza, cheese, steak, bread, flower, pole, wheel, pipes, stones,
                    aperture, wine, mandala, barbell, rings, plate, candles
   - Dans un texte, {mot} met le mot en couleur (titre de l'accueil).
   - Un produit avec un "tag" est mis en avant sur l'accueil.
   ===================================================================== */
window.SITE = {
  "name": "Duval Plomberie & Chauffage",
  "short": "Plombier",
  "tagline": "Dépannage, salle de bain, chaudière et pompe à chaleur.",
  "theme": {
    "layout": "A",
    "visual": "pipes",
    "headFont": "Plus Jakarta Sans",
    "bodyFont": "Inter",
    "headWeight": 700,
    "upper": false,
    "radius": 8,
    "bg": "#f4f9ff",
    "bg2": "#e3f0ff",
    "ink": "#10253f",
    "mut": "#5f7590",
    "acc": "#0a62e8",
    "acc2": "#00a8d6",
    "line": "#cfe2f7",
    "card": "#ffffff",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Plombier chauffagiste · Lille",
    "title": "Plomberie et chauffage, {intervention rapide}.",
    "text": "Dépannage 7j/7, installation de salle de bain, chaudière et pompe à chaleur. Devis gratuit sous 24 h, tarifs annoncés avant l'intervention.",
    "cta": "Devis gratuit",
    "cta2": "Nos services",
    "highlightsTitle": "Nos interventions principales",
    "highlightsText": "Pour les urgences comme pour les projets.",
    "aboutTitle": "Un artisan fiable près de chez vous",
    "about": "Intervention propre, tarifs annoncés d'avance et travail garanti. Nous nous déplaçons rapidement pour les urgences et prenons le temps d'expliquer les travaux.",
    "stats": [
      [
        "24 h",
        "devis gratuit"
      ],
      [
        "7j/7",
        "dépannage"
      ],
      [
        "10 ans",
        "garantie décennale"
      ]
    ],
    "features": [
      [
        "Rapide",
        "Intervention le jour même pour les urgences."
      ],
      [
        "Tarifs clairs",
        "Devis détaillé avant les travaux."
      ],
      [
        "Travail garanti",
        "Artisan assuré, garantie décennale."
      ]
    ],
    "ctaTitle": "Une fuite ? Une panne ?",
    "ctaText": "Appelez, on se déplace."
  },
  "offers": {
    "label": "Nos services",
    "title": "Nos interventions",
    "intro": "Un artisan qui se déplace vite, travaille proprement et annonce ses prix à l'avance.",
    "cats": [
      {
        "name": "Dépannage",
        "note": "Intervention rapide",
        "items": [
          {
            "name": "Dépannage urgent",
            "desc": "Fuite, panne, débouchage",
            "price": "dès 79 €",
            "tag": "Urgence",
            "star": true
          },
          {
            "name": "Recherche de fuite",
            "desc": "Détection sans casse",
            "price": "dès 120 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Débouchage canalisation",
            "desc": "Furet ou haute pression",
            "price": "dès 95 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Salle de bain & eau chaude",
        "note": "",
        "items": [
          {
            "name": "Salle de bain complète",
            "desc": "Création et rénovation clés en main",
            "price": "sur devis",
            "tag": "Projet",
            "star": true
          },
          {
            "name": "Remplacement chauffe-eau",
            "desc": "Pose et mise en service",
            "price": "dès 390 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Robinetterie",
            "desc": "Fourniture et pose",
            "price": "dès 60 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Chauffage",
        "note": "",
        "items": [
          {
            "name": "Chaudière",
            "desc": "Installation et entretien annuel",
            "price": "dès 119 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Pompe à chaleur",
            "desc": "Étude et pose, aides possibles",
            "price": "sur devis",
            "tag": "",
            "star": false
          },
          {
            "name": "Contrat d'entretien",
            "desc": "Visite annuelle obligatoire",
            "price": "dès 99 €/an",
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
        "Tous les jours",
        "7h–21h"
      ],
      [
        "Urgence",
        "Appelez, nous répondons"
      ]
    ],
    "address": "Intervention dans un rayon de 30 km autour de Lille",
    "phone": "06 12 34 56 78",
    "email": "contact@duval-plomberie.example",
    "note": "Pour une urgence, appelez directement.",
    "form": {
      "title": "Demander un devis ou un dépannage",
      "options": [
        "Dépannage urgent",
        "Salle de bain",
        "Chauffage / chaudière",
        "Chauffe-eau",
        "Autre"
      ],
      "button": "Envoyer",
      "success": "Merci ! Nous vous rappelons dans l'heure.",
      "itemCta": "Demander un devis"
    }
  }
};
