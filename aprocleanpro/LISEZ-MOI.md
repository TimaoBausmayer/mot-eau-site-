# Site A-Proclean — mode d'emploi

## Modifier le site (depuis ton téléphone ou ton ordinateur, sans fichier à ouvrir)

1. Va sur **`https://ton-site/admin`** et connecte-toi avec ton email et ton mot de passe.
2. Le site s'ouvre en **mode édition** :
   - **Textes** : touche un texte et écris.
   - **Photos** : touche une photo, puis « Choisir une photo… ». Ajoute une courte description : elle sert aux personnes malvoyantes et à Google.
   - **Ajouter ou supprimer un bloc** (service, question, photo, commune, tarif) : boutons « ＋ Dupliquer » et « Supprimer ».
   - **⚙ Réglages** :
     - *Entreprise* : nom, téléphone, email, SIRET, hébergeur, médiateur… Ces infos se mettent partout, pages légales comprises.
     - *Logo & couleurs* : le site te prévient si une couleur rend le texte difficile à lire.
     - *Sections* : afficher ou masquer une section, par exemple « Tarifs ».
3. Appuie sur **🚀 Publier**. Le site en ligne est à jour pour tout le monde en une minute environ.

Les visiteurs ne voient jamais les outils d'édition. Sans ton mot de passe, personne ne peut rien publier.

## Mise en ligne : à faire une seule fois (environ 15 minutes)

1. **Vercel** : *Add New → Project* → importer le dépôt GitHub `mot-eau-site-`. Dans **Root Directory**, choisir `aprocleanpro`, puis *Deploy*.
2. **Créer le jeton GitHub** qui permet au bouton « Publier » d'enregistrer le site :
   - GitHub → *Settings → Developer settings → Fine-grained tokens → Generate new token* ;
   - *Repository access* : uniquement `mot-eau-site-` ;
   - *Permissions* : **Contents : Read and write**.
3. **Vercel** → le projet → *Settings → Environment Variables*, ajouter :
   - `ADMIN_EMAIL` : ton email de connexion ;
   - `ADMIN_PASSWORD` : un mot de passe long (au moins 12 caractères), que tu n'utilises nulle part ailleurs ;
   - `GITHUB_TOKEN` : le jeton de l'étape 2 ;
   - `GITHUB_BRANCH` : seulement si Vercel publie une autre branche que `main`.

   Puis *Deployments → … → Redeploy*.
4. **Nom de domaine** : Vercel → *Settings → Domains* → ajouter `aprocleanpro.fr`, puis suivre les instructions DNS chez le vendeur du domaine.
5. **Vérification** : `https://ton-site/admin?diag` doit afficher `true` partout (aucun secret n'y apparaît).

Les fichiers techniques :

| Fichier | Rôle |
|---|---|
| `index.html` | Le site complet : textes, logo, polices, pages légales. |
| `photos/` | Les photos ajoutées depuis l'admin (le dossier se crée tout seul). |
| `api/admin.js` | La page de connexion et le bouton « Publier ». |
| `vercel.json` | L'adresse /admin et les protections de sécurité du site. |
| `robots.txt`, `sitemap.xml` | Ils aident Google à trouver le site. |
| `llms.txt` | Un résumé du site pour les assistants IA (ChatGPT, Claude…). |

## À faire AVANT d'annoncer le site (obligations légales)

Le badge jaune « à compléter » du mode édition compte les informations qui manquent.

- [ ] Remplir l'identité de l'entreprise : raison sociale, forme juridique, capital, adresse, SIRET, immatriculation, TVA ou franchise de TVA, directeur de la publication. C'est obligatoire (loi LCEN) : jusqu'à 1 an de prison et 75 000 € d'amende (375 000 € pour une société).
- [ ] Renseigner l'hébergeur : **Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis**. Vérifie ces coordonnées sur vercel.com/legal avant de les publier.
- [ ] **Adhérer à un médiateur de la consommation**, puis renseigner ses coordonnées. C'est obligatoire dès que tu as des clients particuliers : jusqu'à 3 000 € d'amende (15 000 € pour une société). La liste officielle est sur le site du ministère de l'Économie (CECMC).
- [ ] Renseigner le téléphone, l'email (qui reçoit les demandes de devis), la zone et les horaires.
- [ ] Remplacer « Commune 1… 5 » par tes vraies communes.
- [ ] Vérifier que chaque promesse affichée est vraie : horaires (« tôt le matin, le soir ou le samedi »), « matériel fourni », « un seul interlocuteur », « réponse rapide », « visite possible », et les listes « ce qui est inclus » de chaque service. Corrige ou supprime ce qui ne correspond pas à ta façon de travailler : une fausse promesse est une pratique commerciale trompeuse.
- [ ] Ajouter tes photos et leur description : touche le dessin de la fenêtre sur l'accueil pour le remplacer par une vraie photo, puis affiche « Avant / après » et « Galerie photos » dans *Réglages › Sections* quand tu as tes photos.
- [ ] « Avis clients » est masqué : affiche-le seulement avec de **vrais** avis, recopiés tels quels, avec l'accord du client.
- [ ] Si tu es déclaré « services à la personne » : coche la case dans Réglages, affiche la section « Tarifs » et indique tes prix TTC.
- [ ] Sur tes devis signés chez un client particulier : remettre le formulaire de rétractation et **ne rien encaisser pendant 7 jours**. Les CGV du site détaillent ces règles.

## Ce qu'il ne faut PAS ajouter sans précaution

Google Analytics, une carte Google Maps, une vidéo YouTube, des boutons de réseaux sociaux, un chat en ligne, un reCAPTCHA ou des polices Google Fonts. Tous déposent des traceurs ou envoient des données à des tiers. Il faudrait alors un bandeau de consentement aux cookies et une mise à jour de la politique cookies. Aujourd'hui, le site n'en a pas besoin, car il ne dépose **aucun cookie ni traceur**.

Ne publie jamais de faux avis clients. Ne fais pas de démarchage téléphonique auprès de particuliers sans leur accord préalable : c'est interdit depuis le 11 août 2026.
