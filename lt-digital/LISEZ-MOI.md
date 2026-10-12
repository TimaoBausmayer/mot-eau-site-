# LT Digital — site de vente de sites web

## Modifier le site SANS toucher au code
1. Ouvre **`admin.html`** (même adresse que ton site, en ajoutant `/admin.html`).
2. Choisis une rubrique à gauche (Gammes & tarifs, Options, FAQ, Contact…), modifie.
   L'aperçu à droite se met à jour tout seul. Ton brouillon est gardé dans ton navigateur.
3. Clique **⬇ Télécharger config.js**.
4. Sur GitHub, dans le dossier `lt-digital`, remplace `config.js` (Add file ▸ Upload files).
   Le site se met à jour après quelques instants.

## Modifier à la main (facultatif)
Tout le contenu est dans `config.js` (texte simple, commenté).
- "Sur devis" : `price: null` — "à partir de" : `from: true`
- Ligne non incluse dans une gamme : commence par `!`

## Mettre en ligne
Site statique (HTML/CSS/JS) : héberge le dossier `lt-digital` sur Vercel, Netlify ou GitHub Pages.

## Maquettes de démonstration (16 vrais mini-sites)
Chaque métier a son propre site de 3 pages (Accueil, Carte/Catalogue, Contact), ouvert depuis « Réalisations » :
restaurant, boutique, coach, menuisier, fromagerie, boucherie, pizzeria, boulangerie, fleuriste, barbier,
garage, plombier, institut de beauté, photographe, caviste, tatoueur.

### Tout modifier dans une maquette
Ouvre `demos/<métier>/site.js` : textes, produits, prix, horaires, couleurs, polices, style (A/B/C) et
illustration. Enregistre, recharge : c'est à jour. Aucune autre ligne de code à toucher.
Pour livrer un site à un client : copie le dossier, change `site.js`, et c'est son site.

### Photos des produits (restaurant, pizzeria, boucherie, fromagerie)
47 emplacements de photos (un par plat / produit). Ouvre **`demos/photos.html`** : pour chaque produit, clique ou glisse
une photo, puis « Télécharger mes photos (.zip) », dézippe et envoie les fichiers dans `demos/photos/` sur GitHub.
Les photos sont recadrées et allégées automatiquement. Une photo absente ne s'affiche tout simplement pas.
(Pour un autre métier : ajoute `"photo": "../photos/nom.jpg"` à ses produits dans `site.js`.)

### Ajouter un nouveau métier (ex : poissonnerie)
Copie un dossier de `demos/`, renomme-le et modifie son `site.js`. (Ou ajoute une entrée dans `tools/niches.py`
puis lance `python3 tools/build_sites.py` — attention : ça réécrit tous les `site.js`.)
Les images d'aperçu du portfolio sont dans `images/portfolio/`.

### Tes vrais projets
Mets une capture PC (et téléphone) dans `images/portfolio/`, puis renseigne-la dans `admin.html` ▸ Réalisations.

## Dans l'administration
Démarrer · Prix rapides (tous les prix au même endroit) · Gammes · Options (par gamme : réservées, incluses, quantité) · Promos (codes ou automatiques, % ou montant, dates, minimum) · Commande (acompte, note, champs demandés) · Comparatif · Réalisations ·
Accueil · Identité (couleurs, logo) · Sections (afficher/masquer/renommer) · Processus · Avis · Garanties · FAQ · Contact.
Prix vide = « Sur devis ».
