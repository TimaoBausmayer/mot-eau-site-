# Vidéo promo A-Proclean (Reel / TikTok / Shorts)

- `A-Proclean-reel.mp4` : la vidéo finale, verticale 1080 × 1920, 24 s, 30 images/s, avec musique.
- La musique est **originale** (générée par `music.py`) : aucun droit d'auteur à payer, aucun risque de blocage.
- Pour mettre un son tendance à la place, utilise la version sans musique : relance `fabriquer.sh`, ou demande-la.

## Déroulé (une scène = 2 secondes = une mesure de musique à 120 BPM)

| Temps | Scène |
|---|---|
| 0–2 s | « Tes BUREAUX / Ta VITRINE / Ta MAISON mérite de briller. » |
| 2–4 s | « On rend tes locaux vraiment IMPECCABLES. », puis le site dans un téléphone |
| 4–6 s | « tes BUREAUX », « tes VITRES », « tes CHANTIERS » |
| 6–8 s | Mur 3D de pages du site : « Une solution pour chaque LIEU. » |
| 8–10 s | « Tu nous appelles. / On nettoie. / C'est impeccable. » |
| 10–12 s | « Et ça coûte COMBIEN ? » (pause musicale) |
| 12–14 s | « Ton devis 0 € c'est gratuit. » (reprise de la musique) |
| 14–16 s | « PRIX annoncé à l'avance. SANS frais cachés. » |
| 16–18 s | « Réponse SOUS 24 h » |
| 18–20 s | « Un seul interlocuteur. » |
| 20–24 s | Logo, « DEMANDE TON DEVIS », aprocleanpro.fr, « Lien en bio » |

⚠ Toutes ces promesses (devis gratuit, réponse sous 24 h, prix annoncé, interlocuteur unique) doivent être **vraies**. Sinon, c'est une pratique commerciale trompeuse.

## Modifier la vidéo

- **Textes** : dans `promo.html`, cherche le texte et remplace-le.
- **Couleurs** : en haut de `promo.html` (`--navy`, `--sky`).
- **Musique** : `music.py` (tempo, accords, sons).
- **Images du site** : dossier `assets/` (captures du site, logo).
- **Refabriquer** : `./fabriquer.sh`

Polices : Anton, Fraunces et Inter, sous licence libre SIL Open Font License.
