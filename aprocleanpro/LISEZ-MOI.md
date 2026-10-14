# Site A-Proclean — mode d'emploi

## Ce que contient ce dossier

| Fichier | À quoi il sert |
|---|---|
| `index.html` | Le site complet. Il contient tout : textes, photos, logo, polices et pages légales. |
| `robots.txt`, `sitemap.xml` | Ils aident Google à trouver le site. |
| `llms.txt` | Un résumé du site pour les assistants IA (ChatGPT, Claude, etc.). |

## Modifier le site (sans code)

1. Ouvre `index.html` dans ton navigateur (double-clic).
2. Clique sur **« ✎ Modifier le site »**, en bas à gauche.
3. Fais tes changements :
   - **Textes** : clique sur un texte et écris.
   - **Photos** : clique sur une photo, puis « Choisir une photo… ». Ajoute une courte description : elle sert aux personnes malvoyantes et à Google.
   - **Ajouter ou supprimer un bloc** (service, question, photo, commune, tarif) : utilise les boutons « ＋ Dupliquer » et « Supprimer ».
   - **⚙ Réglages** :
     - *Entreprise* : nom, téléphone, email, SIRET, hébergeur, médiateur… Ces infos se mettent partout, pages légales comprises.
     - *Logo & couleurs* : le site te prévient si une couleur rend le texte difficile à lire.
     - *Sections* : afficher ou masquer une section, par exemple « Tarifs ».
4. Clique sur **« 💾 Enregistrer le site »**. Un nouveau fichier `index.html` est téléchargé. C'est celui-là qu'il faut mettre en ligne.

Une fois le site en ligne, ajoute `?edit` à la fin de l'adresse pour retrouver le bouton (exemple : `https://aprocleanpro.fr/?edit`). Les visiteurs ne voient jamais ce bouton. Même s'ils trouvaient l'adresse, ils ne pourraient rien changer au site en ligne : l'enregistrement ne fait que télécharger un fichier sur leur propre ordinateur.

## À faire AVANT la mise en ligne (obligations légales)

Le badge jaune « à compléter » du mode édition compte les informations qui manquent.

- [ ] Remplir l'identité de l'entreprise : raison sociale, forme juridique, capital, adresse, SIRET, immatriculation, TVA ou franchise de TVA, directeur de la publication. C'est obligatoire (loi LCEN) : jusqu'à 1 an de prison et 75 000 € d'amende (375 000 € pour une société).
- [ ] Choisir un hébergeur, de préférence avec des serveurs en Europe, et renseigner ses coordonnées.
- [ ] **Adhérer à un médiateur de la consommation** et renseigner ses coordonnées. C'est obligatoire dès que tu as des clients particuliers : amende jusqu'à 3 000 € (15 000 € pour une société).
- [ ] Renseigner le téléphone, l'email (qui reçoit les demandes de devis), la zone et les horaires.
- [ ] Remplacer « Commune 1… 5 » par tes vraies communes.
- [ ] Vérifier que chaque promesse affichée est vraie : délais, horaires, « 24 h », « 6 j/7 »… Une fausse promesse est une pratique commerciale trompeuse.
- [ ] Ajouter tes photos et leur description.
- [ ] Si tu es déclaré « services à la personne » : coche la case dans Réglages, affiche la section « Tarifs » et indique tes prix TTC.

## Ce qu'il ne faut PAS ajouter sans précaution

Google Analytics, une carte Google Maps, une vidéo YouTube, des boutons de réseaux sociaux, un chat en ligne, un reCAPTCHA ou des polices Google Fonts. Tous déposent des traceurs ou envoient des données à des tiers. Il faudrait alors un bandeau de consentement aux cookies et une mise à jour de la politique cookies. Aujourd'hui, le site n'en a pas besoin, car il ne dépose **aucun cookie ni traceur**.

Ne publie jamais de faux avis clients.
