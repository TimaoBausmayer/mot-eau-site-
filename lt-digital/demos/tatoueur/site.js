/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « Ink & Soul Tattoo »
   Modifie ce fichier pour tout changer : textes, prix, horaires, couleurs, polices.
   Enregistre, recharge la page : c'est à jour. (Garde les guillemets et les virgules.)
   - theme.layout : "A" (moderne), "B" (carte/éditorial), "C" (affiche, gros titres)
   - theme.visual : pizza, cheese, steak, bread, flower, pole, wheel, pipes, stones,
                    aperture, wine, mandala, barbell, rings, plate, candles
   - Dans un texte, {mot} met le mot en couleur (titre de l'accueil).
   - Un produit avec un "tag" est mis en avant sur l'accueil.
   ===================================================================== */
window.SITE = {
  "name": "Ink & Soul Tattoo",
  "short": "Tatoueur",
  "tagline": "Studio de tatouage : fineline, blackwork, réalisme, flash.",
  "theme": {
    "layout": "C",
    "visual": "mandala",
    "headFont": "Anton",
    "bodyFont": "Inter",
    "headWeight": 400,
    "upper": true,
    "radius": 0,
    "bg": "#efe9dc",
    "bg2": "#e4dcc9",
    "ink": "#111111",
    "mut": "#5c564a",
    "acc": "#d62828",
    "acc2": "#111111",
    "line": "#cfc6b0",
    "card": "#f8f4ea",
    "onacc": "#ffffff"
  },
  "home": {
    "kicker": "Studio de tatouage · Lille",
    "title": "Des tatouages qui {vous ressemblent}.",
    "text": "Fineline, réalisme, blackwork et flash. Hygiène irréprochable, conseil personnalisé et dessin sur mesure. Chaque projet commence par une vraie discussion.",
    "cta": "Réserver une séance",
    "cta2": "Styles & tarifs",
    "highlightsTitle": "Nos styles",
    "highlightsText": "Ce que nous tatouons le plus.",
    "aboutTitle": "Un studio propre et sûr",
    "about": "Matériel à usage unique, studio aux normes et tatoueurs diplômés. On vous explique le processus, on dessine avec vous, et on suit la cicatrisation.",
    "stats": [
      [
        "100 %",
        "matériel stérile"
      ],
      [
        "3",
        "tatoueurs résidents"
      ],
      [
        "0 €",
        "consultation"
      ]
    ],
    "features": [
      [
        "Hygiène stricte",
        "Matériel à usage unique, studio aux normes."
      ],
      [
        "Dessin sur mesure",
        "Créé spécialement pour vous."
      ],
      [
        "Suivi cicatrisation",
        "Conseils et retouche offerte."
      ]
    ],
    "ctaTitle": "Un projet en tête ?",
    "ctaText": "Consultation dessin gratuite."
  },
  "offers": {
    "label": "Styles & tarifs",
    "title": "Styles & tarifs",
    "intro": "Les prix sont indicatifs : le devis final dépend de la taille, du détail et de l'emplacement.",
    "cats": [
      {
        "name": "Styles",
        "note": "",
        "items": [
          {
            "name": "Fineline",
            "desc": "Dessin fin, minimaliste",
            "price": "dès 80 €",
            "tag": "Populaire",
            "star": true
          },
          {
            "name": "Blackwork",
            "desc": "Aplats et motifs graphiques",
            "price": "dès 100 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Réalisme",
            "desc": "Portraits et nature",
            "price": "dès 150 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Géométrique",
            "desc": "Mandalas, lignes et symétrie",
            "price": "dès 110 €",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Flash & retouches",
        "note": "",
        "items": [
          {
            "name": "Flash",
            "desc": "Motifs prêts à tatouer",
            "price": "dès 60 €",
            "tag": "Rapide",
            "star": true
          },
          {
            "name": "Cover-up",
            "desc": "Recouvrement : conseil gratuit",
            "price": "sur devis",
            "tag": "",
            "star": false
          },
          {
            "name": "Retouche",
            "desc": "Offerte dans les 3 mois",
            "price": "Gratuit",
            "tag": "",
            "star": false
          }
        ]
      },
      {
        "name": "Piercing & conseils",
        "note": "",
        "items": [
          {
            "name": "Consultation dessin",
            "desc": "Échange et projet",
            "price": "Gratuit",
            "tag": "",
            "star": false
          },
          {
            "name": "Piercing",
            "desc": "Oreille, nez, bijou titane inclus",
            "price": "dès 35 €",
            "tag": "",
            "star": false
          },
          {
            "name": "Soins post-tatouage",
            "desc": "Crème et conseils",
            "price": "12 €",
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
        "11h–19h"
      ],
      [
        "Dimanche – Lundi",
        "Fermé"
      ]
    ],
    "address": "33 rue des Arts, 59000 Lille",
    "phone": "03 20 12 34 56",
    "email": "studio@inksoul.example",
    "note": "Pièce d'identité obligatoire. Tatouage interdit aux mineurs.",
    "form": {
      "title": "Réserver une séance",
      "options": [
        "Nouveau tatouage",
        "Cover-up",
        "Flash",
        "Retouche",
        "Piercing"
      ],
      "button": "Envoyer ma demande",
      "success": "Merci ! Nous vous contactons pour discuter du projet.",
      "itemCta": "Réserver"
    }
  }
};
