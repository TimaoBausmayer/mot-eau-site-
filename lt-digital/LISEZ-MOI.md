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

## Maquettes de démonstration (16 métiers)
Dossier `demos/` : restaurant, boutique, coach, artisan, fromagerie, boucherie, pizzeria, boulangerie,
fleuriste, barbier, garage, plombier, institut de beauté, photographe, caviste, tatoueur.
Elles s'affichent dans « Réalisations » avec un filtre par catégorie et s'ouvrent en grand au clic.

### Ajouter un nouveau métier (ex : poissonnerie)
Les maquettes sont fabriquées automatiquement depuis `tools/niches.py` : copie une entrée, change les
textes/prix/couleurs, puis lance `python3 tools/generate_demos.py`. (Ou demande-moi : je m'en charge.)
Les images d'aperçu sont dans `images/portfolio/`.

### Tes vrais projets
Mets une capture PC (et téléphone) dans `images/portfolio/`, puis renseigne-la dans `admin.html` ▸ Réalisations.

## Dans l'administration
Démarrer · Prix rapides (tous les prix au même endroit) · Gammes · Options · Comparatif · Réalisations ·
Accueil · Identité (couleurs, logo) · Sections (afficher/masquer/renommer) · Processus · Avis · Garanties · FAQ · Contact.
Prix vide = « Sur devis ».
