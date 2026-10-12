# -*- coding: utf-8 -*-
"""Construit les 16 maquettes : demos/<slug>/{index,offre,contact}.html + site.js
Usage : python3 build_sites.py          (écrase les site.js : ne le relance pas après les avoir modifiés à la main)"""
import json, os, sys
from niches import NICHES

DEMOS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "demos")
SHELL = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name} — maquette</title>
<link rel="stylesheet" href="../_engine.css">
</head>
<body data-page="{page}" style="background:{bg}">
<script src="site.js"></script>
<script src="../_visuals.js"></script>
<script src="../_food.js"></script>
<script src="../_food_meat.js"></script>
<script src="../_food_cheese.js"></script>
<script src="../_food_resto.js"></script>
<script src="../_engine.js"></script>
</body>
</html>
"""
HEADER = """/* =====================================================================
   ✏️  CONTENU DE LA MAQUETTE « {name} »
   Modifie ce fichier pour tout changer : textes, prix, horaires, couleurs, polices.
   Enregistre, recharge la page : c'est à jour. (Garde les guillemets et les virgules.)
   - theme.layout : "A" (moderne), "B" (carte/éditorial), "C" (affiche, gros titres)
   - theme.visual : pizza, cheese, steak, bread, flower, pole, wheel, pipes, stones,
                    aperture, wine, mandala, barbell, rings, plate, candles
   - Dans un texte, {{mot}} met le mot en couleur (titre de l'accueil).
   - Un produit avec un "tag" est mis en avant sur l'accueil.
   - Photos des produits : "photo": "../photos/pizza-margherita.jpg" (dossier demos/photos/).
     Photo absente = la case n'apparaît pas. Outil pour les ajouter : demos/photos.html
   ===================================================================== */
"""

def site(n):
    p = n["pal"]
    theme = dict(layout=n["layout"], visual=n["visual"], headFont=n["headFont"], bodyFont=n["bodyFont"], headWeight=700 if n["upper"] is False and n["headFont"] in ("Plus Jakarta Sans","Archivo Black") else 600,
                 upper=n["upper"], radius=n["radius"], **p)
    if n["headFont"] in ("Anton","Bebas Neue","Archivo Black"): theme["headWeight"] = 400
    return dict(
      name=n["name"], short=n["short"], tagline=n["tagline"], theme=theme,
      home=dict(kicker=n["kicker"], title=n["title"], text=n["text"], cta=n["cta"], cta2=n["cta2"],
                highlightsTitle=n["hl_title"], highlightsText=n["hl_text"], aboutTitle=n["about_title"], about=n["about"],
                stats=[list(s) for s in n["stats"]], features=[list(f) for f in n["features"]], ctaTitle=n["ctatitle"], ctaText=n["ctatext"]),
      offers=dict(label=n["label"], title=n["offers_title"], intro=n["offers_intro"], images=any("img" in it for c in n["cats"] for it in c[2]), illustrations=False,
                  cats=[dict(name=c[0], note=c[1], items=[dict(it, photo="../photos/%s.jpg" % it["img"]) if "img" in it else dict(it) for it in c[2]]) for c in n["cats"]]),
      contact=dict(title="Contactez-nous", intro="Une question, un devis, une réservation ? Écrivez-nous ou appelez-nous : nous répondons rapidement.",
                   hours=[list(h) for h in n["hours"]], address=n["address"], phone=n["phone"], email=n["email"], note=n["note"],
                   form=dict(title=n["form_title"], options=n["form_options"], button=n["form_button"], success=n["form_success"], itemCta=n["item_cta"])))

if __name__ == "__main__":
    for n in NICHES:
        d = os.path.join(DEMOS, n["slug"]); os.makedirs(d, exist_ok=True)
        for page, f in (("home","index.html"),("offre","offre.html"),("contact","contact.html")):
            open(os.path.join(d, f), "w", encoding="utf-8").write(SHELL.format(name=n["name"], page=page, bg=n["pal"]["bg"]))
        open(os.path.join(d, "site.js"), "w", encoding="utf-8").write(HEADER.format(name=n["name"]) + "window.SITE = " + json.dumps(site(n), ensure_ascii=False, indent=2) + ";\n")
    slots = [dict(key=it["img"], name=it["name"], site=n["name"], short=n["short"], cat=c[0]) for n in NICHES for c in n["cats"] for it in c[2] if "img" in it]
    os.makedirs(os.path.join(DEMOS, "photos"), exist_ok=True)
    open(os.path.join(DEMOS, "photos", "slots.js"), "w", encoding="utf-8").write("window.PHOTO_SLOTS = " + json.dumps(slots, ensure_ascii=False, indent=1) + ";\n")
    print(len(NICHES), "maquettes construites,", len(slots), "emplacements photo, dans", os.path.abspath(DEMOS))
