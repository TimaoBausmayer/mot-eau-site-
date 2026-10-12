# L&T Digital — site de vente de sites web

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
Les photos sont recadrées et allégées automatiquement.
Tant qu'une photo manque, le site affiche une case « Photo à ajouter » (cliquable : elle ouvre l'outil photos).
Pour masquer ces cases : dans `site.js`, mets `"placeholders": false` (ou ajoute `?clean` à l'adresse de la page).
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

## Haut de page (animations)

Admin → **Accueil** : badge, titre (les mots apparaissent un par un, la partie colorée a un dégradé animé), **mots qui défilent** (« Pensé pour les restaurants / boulangeries… », un mot par ligne), **petites coches** sous les boutons, **notifications animées** autour des images (3 max). La bande des métiers qui défile se remplit toute seule avec tes réalisations.

## Logo, affiches & réseaux sociaux

Section sombre « Photos, logo, affiches & réseaux » (photos : on se déplace pour les produits (149 €), photos d'équipe (129 €), shooting complet (249 €), mise en place, retouche, pack photos pro, vidéo ; logo, identité visuelle, cartes de visite, affiches, flyers, menus, kit réseaux, gestion des réseaux sociaux au mois, montage vidéo, pub…).
- **Admin → onglet « Logo & réseaux »** : nom, prix, description, ce qui est inclus, onglet de rangement, mise en avant, quantité.
- **Prix vide = « Sur devis »**. **Unité « /mois » = abonnement** : affiché à part, pas compté dans le total payé tout de suite.
- Le client peut commander **sans site** (choix « Pas de site » dans la commande).
- Les prix sont des exemples : change-les dans **Prix rapides** (tout en bas).

## Publicité vidéo (sans voix)

- **`promo/lt-digital-pub.mp4`** : la pub prête à poster (format vertical 1080 × 1920, 27 s, sans son), pour les Reels, les stories Instagram ou TikTok. Ajoute une musique directement dans Instagram si tu veux.
- **`promo/lt-digital-pub-2.mp4`** : 2e pub, style clair « avant / après » (25,5 s) : vieux site → nouveau site, photos, logo, réseaux, offre. Page animée : `promo/pub2.html`.
- **`promo/lt-digital-pub-3.mp4`** : 3e pub « Ton site, en un message » (22 s) : une conversation où un client commande son site, qui se construit et passe en ligne avec des confettis. Page animée : `promo/pub3.html`.
- **`promo/lt-digital-film-1min40.mp4`** : film de présentation de 1 min 40 en 10 chapitres (constat, avant/après, qui on est, sites, 16 métiers, gammes, photos, logo & print, réseaux, méthode, engagements, contact). Page animée : `promo/film.html`.
- **`promo/lt-digital-pub-4.mp4`** : 4e pub, style « cinéma orange » plein écran vertical (30 s), coupes calées sur un tempo de 120 BPM. Page animée : `promo/pub5.html`. Texte de voix off : `promo/voix-off-pub4.txt`. La musique s'ajoute dans TikTok/Instagram (« Utiliser ce son »).
- **`promo/lt-digital-pub-1min30.mp4`** : pub de 1 min 30, style « cinéma orange » plein écran, 25 scènes calées sur 120 BPM. Page animée : `promo/pub6.html`. Voix off : `promo/voix-off-1min30.txt`.
- **Versions avec son** : `promo/lt-digital-pub-1min30-son.mp4` et `promo/lt-digital-pub-4-son.mp4` (musique originale + bruitages calés sur les coupes, créés pour L&T Digital : libres d'utilisation). Musique seule : `promo/musique-pub-1min30.mp3`. Pour refaire le son : `python3 tools/musique.py pub6 sortie.wav`.
- **`promo/index.html`** : la 1re pub en page web animée (bouton « Rejouer »). Les textes (prix, code promo, contacts…) se changent directement dans ce fichier.
- Pour refaire la vidéo après une modification, il faut relancer l'enregistrement : demande-le-moi.

## Google et partage du lien

- Quand ton lien est partagé (WhatsApp, Instagram, Facebook…), l'image `images/og.jpg` s'affiche en aperçu. Remplace-la si tu veux (format 1200 × 630).
- Quand tu auras ton nom de domaine, mets l'adresse complète de l'image dans `index.html` (ligne `og:image`, ex : `https://www.lt-digital.fr/images/og.jpg`) : certains réseaux l'exigent.
- La page d'administration n'est pas indexée par Google (`robots.txt`).

## TVA et pages légales
Admin ▸ **Légal & TVA** : choisis le régime (TTC, HT ou « TVA non applicable art. 293 B »), le taux, et renseigne ton entreprise
(SIRET, adresse, hébergeur, médiateur…). Les pages `mentions-legales.html`, `cgv.html` et `confidentialite.html` se remplissent toutes seules,
avec un rappel « [à compléter] » pour ce qui manque. La case « J'ai lu et j'accepte les CGV » est obligatoire avant de copier une commande.
⚠ Ce sont des modèles : à faire relire par un expert-comptable ou un juriste.
Le délai de livraison se règle une seule fois (Admin ▸ Gammes & tarifs) ; écris `{delivery}` dans un texte pour l'y insérer.

## Guide : comment modifier ton site toi-même (sans coder)
**Méthode 1 — la plus simple : l'administration**
1. Ouvre `admin.html` (adresse de ton site + `/admin.html`).
2. Choisis une rubrique à gauche (Prix rapides, Options, Promos, Textes du site, Légal & TVA…), modifie. L'aperçu à droite se met à jour.
3. Clique sur **Télécharger config.js**.
4. Sur GitHub, ouvre le dossier `lt-digital`, clique **Add file ▸ Upload files**, glisse le `config.js` téléchargé, puis **Commit changes**.
5. Ton site se met à jour en quelques minutes.

**Méthode 2 — modifier un fichier directement sur GitHub**
Ouvre le fichier (ex : `config.js`), clique sur le crayon ✏️, change le texte entre guillemets, puis **Commit changes**.

**Maquettes (restaurant, pizzeria…)** : `demos/<métier>/site.js` (textes, prix, horaires, couleurs). Photos : `demos/photos.html`.
**Images et logos** : dépose-les dans le dossier `images/` puis écris leur chemin dans l'admin.
