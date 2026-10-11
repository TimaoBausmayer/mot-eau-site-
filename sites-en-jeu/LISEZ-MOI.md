# Site de vente de sites in-game

## Modifier le contenu
Ouvre **`config.js`** : tout s'y trouve (nom, couleurs, tarifs, gammes, options,
codes promo, FAQ, réalisations, avis, contact). Change les valeurs, enregistre, recharge la page.

- Nouvelle gamme : copie un bloc dans `plans` et change son `id`, `name`, `price`.
- Prix "Sur devis" : `price: null`.
- Ligne non incluse dans une gamme : commence le texte par `!`.
- Vrais avis clients : ajoute-les dans `testimonials` (la section apparaît toute seule).
- Contact : renseigne `contact.discord`, `discordTag`, `ingame`, `email`.

## Mettre en ligne
Site 100 % statique (HTML/CSS/JS) : héberge le dossier sur Vercel, Netlify ou GitHub Pages.
