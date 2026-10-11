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
