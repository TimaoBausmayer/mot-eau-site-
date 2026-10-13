# Pub 10 — cahier des charges technique (à respecter à la lettre)

## Format
- Vidéo verticale **1080 × 1920**, **24 s**, **30 images/s**, pour TikTok et Instagram Reels.
- Musique originale à **120 BPM** : 1 temps = 0,5 s · 1 mesure = 2 s. Les gros mouvements tombent sur les temps (multiples de 0,25 s).
- **12 scènes de 2 s**. La scène NN (01→12) occupe **[2·(NN−1) s ; 2·NN s]**. Coupe franche sur le temps fort.
- Le fichier final est assemblé par `build.py` à partir de `sNN.html` / `sNN.css` / `sNN.js`, plus `fx.*` (couche globale de transitions).

## Zones sûres (interface TikTok / Instagram par-dessus la vidéo)
- Textes et éléments importants **entre x = 70 et x = 900**, **entre y = 220 et y = 1560**.
- À droite (x > 900, y 800→1650) : les boutons j'aime / commentaires. En bas (y > 1600) : la légende. En haut (y < 200) : l'onglet « Pour toi ».
- Les décors peuvent déborder partout ; le texte, jamais.

## Fichiers d'une scène (NN = 01…12)
- `sNN.html` : **un seul** `<section class="sc sNN" style="--a:Xs;--b:Ys">…</section>` avec X = 2·(NN−1), Y = 2·NN (scène 12 : Y = 24.1).
- `sNN.css` : **tous** les sélecteurs commencent par `.sNN` ; **tous** les `@keyframes` s'appellent `sNN-…`.
- `sNN.js` (facultatif) : exécuté une fois au chargement, dans sa propre fonction. Ids préfixés `sNN-`.

## Règles d'animation (sinon la vidéo est fausse au rendu)
- Le rendu « gèle » le temps puis photographie chaque image : `window.seek(ms)` met **toutes** les animations (`document.getAnimations()`) à l'instant voulu, puis appelle les fonctions `onSeek`.
- Autorisé :
  1. animations CSS avec **`animation-delay` absolu** (en secondes depuis le début de la vidéo), ex. `animation: sNN-pop .4s var(--bo) both; animation-delay: 6.25s;`
  2. `el.animate(keyframes, {duration, delay /* ms ABSOLUS */, easing, fill})`
  3. dessin canvas ou SVG piloté par `onSeek(t => { … })` : la fonction reçoit t (secondes) et doit **tout redessiner** de façon déterministe à partir de t seul.
- **Interdit** : `setTimeout`, `setInterval`, `requestAnimationFrame`, `Date`, `performance.now()`, `Math.random()`, vidéos `<video>`, transitions CSS (`transition:`), `animation-iteration-count: infinite` sans délai maîtrisé (les infinies sont permises mais elles doivent avoir un délai absolu).
- Aléatoire : `const r = mkRnd(graine)` puis `r()` (déterministe).
- `fill-mode` : `both` seulement si l'état « from » est le bon état AVANT le départ. Pour un flash / un élément qui doit être invisible avant son départ : `forwards` + état de base invisible. (Erreur déjà vue : un flash blanc en `both` a rendu toute la vidéo blanche.)
- Une animation infinie + une animation d'entrée sur la même propriété `transform` : mettre l'infinie sur un élément enfant (sinon elle écrase la position finale de l'entrée).
- Pas de `backdrop-filter` ni de `filter: blur()` > 40 px sur des éléments plus grands que l'écran (trop lent). `will-change` inutile.
- Rien d'interactif.

## Outils fournis (dans runtime.js)
- `mkRnd(graine)`, `onSeek(fn)`, `split(el, t0, dt)` (découpe un texte en lettres `<span class="ch">` avec `--i` et `--t` = t0 + i·dt secondes), `$`, `$$`.
- Variables CSS : `--lime #c8ff3e` (couleur de la marque), `--violet #7c5cff`, `--blue #8fa2ff`, `--teal #19c6b0`, `--pink #ff4d6d`, `--orange #ff9a3c`, `--ink #0b0b10`, `--night #07060c`, `--paper #f4f2ff`.
  Polices : `--f` Archivo (variable : `font-stretch` 62 %→125 %, graisse 400→900, italique dispo), `--mono` DM Mono, `--serif` Instrument Serif (italique pour les mots d'accent).
  Courbes : `--e` (sortie douce), `--e2` (entrée-sortie franche), `--bo` (rebond), `--ex` (expo).

## Images disponibles (chemins depuis la page : `../images/...`)
- `../images/logo.jpg` (600 × 600, logo L&T Digital, cercle bleu sur fond noir) — **à utiliser pour le logo** (pas logo-small).
- Maquettes de sites (pleine page, 900 × 1750) : `../images/portfolio/<nom>.jpg` et version téléphone (300 × 649) `../images/portfolio/<nom>-mobile.jpg`,
  noms : restaurant, boutique, barbier, coach, artisan, fromagerie, boucherie, pizzeria, boulangerie, fleuriste, garage, plombier, esthetique, photographe, cave, tatoueur.
- Logos clients (606 × 810, fond propre à chaque logo) : `../images/logos/<nom>.jpg`, noms : lt-digital, agrovia, horizon-immo, le-reflet, green-clean, bella-pizza, fitzone, nexa-tech, vestir, alp-explor, reno-plus, shoply.
- Visuels du menu (vignettes) : `../images/menu/{affiches,logo,logos,portfolio,pubs,reseaux,stories}.jpg`.

## Ce qu'on a le droit de dire (vrai, vérifié sur le site)
- L&T Digital crée des **sites internet**, des **logos**, des **pubs vidéo**, des **affiches**, des **photos** et s'occupe des **réseaux sociaux**.
- **Sites dès 85 €** (Page Express). Site Vitrine 239 € (le plus choisi). **Livré en 48 à 72 h**. **Prix annoncé à l'avance**, **retouches incluses**.
- Options : réservation en ligne, carte Google Maps + itinéraire, notifications (e-mail / SMS), boutique en ligne. Le site marche sur téléphone et aide à être trouvé sur Google.
- 16 exemples de sites pour différents métiers (voir la liste ci-dessus).
- Contact : **@l.t_digital** (Instagram), site **l-t-digital.vercel.app**, « lien en bio ».
- **Interdit** : inventer des chiffres (nombre de clients, avis, abonnés, notes), des témoignages, des promesses (« 1re place sur Google »), ou des marques connues.
- Langue : **français simple** (le site parle en « tu »), sans faute.

## Tester une scène
1. Le serveur local tourne sur `http://localhost:8123` (racine = dossier `lt-digital`). S'il ne répond pas : `cd /home/user/mot-eau-site-/lt-digital && nohup python3 -m http.server 8123 >/dev/null 2>&1 &`. **Ne jamais l'arrêter.**
2. `python3 promo/pub10/build.py --only NN` → crée `promo/pub10-sNN.html`.
3. `python3 promo/pub10/shot.py pub10-sNN.html 10.05 10.3 10.6 11 11.5 11.95 --out /tmp/…/sNN.png --w 300` → planche contact + liste des erreurs JS.
4. Ouvrir la planche avec l'outil Read (c'est une image) et la regarder vraiment.
