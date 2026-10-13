export const meta = {
  name: 'pub10-storyboard',
  description: 'Concevoir le scénario image par image d\'une pub TikTok très animée (3 concepts, jury, synthèse)',
  phases: [
    { title: 'Concepts', detail: '3 directions artistiques indépendantes' },
    { title: 'Jury', detail: 'notation croisée des concepts' },
    { title: 'Synthèse', detail: 'scénario final détaillé, scène par scène' },
  ],
}

const ROOT = '/home/user/mot-eau-site-/lt-digital'
const CONTEXT = `Tu travailles pour L&T Digital, une toute petite agence française (deux jeunes fondateurs) qui crée des sites internet, logos, pubs vidéo, affiches, photos et gère les réseaux sociaux de commerçants et artisans.
On fabrique une publicité verticale de 24 s pour TikTok / Instagram Reels, codée en HTML/CSS/JS puis filmée image par image (30 i/s).
Le client veut "beaucoup d'animation, le top du top" : niveau studio de motion design (pense aux pubs Apple, Stripe, Linear, aux génériques de kinetic typography, aux transitions des meilleurs monteurs TikTok). Mouvement permanent, aucune image figée, rythme calé sur la musique, transitions spectaculaires, profondeur 3D, particules, lumière, typographie qui vit.
La vidéo précédente (${ROOT}/promo/pub9.html, 20 s) est jugée "bien mais pas assez" : textes qui claquent, logos qui rebondissent, compteur de prix, cercle de progression, 3 étapes. Il faut nettement plus riche, plus fluide, plus créatif, plus cinématographique — sans perdre la clarté du message.
LIS D'ABORD le cahier des charges technique : ${ROOT}/promo/pub10/SPEC.md (format, 12 scènes de 2 s à 120 BPM, zones sûres, règles d'animation, images disponibles, ce qu'on a le droit de dire). Tu peux regarder les images disponibles (outil Read sur les .jpg) et ${ROOT}/promo/pub9.html pour voir le niveau actuel.
Contraintes de réalisme : tout doit être faisable en CSS (animations à délai absolu), Web Animations API, SVG ou canvas 2D piloté par le temps (onSeek). Pas de vidéo, pas de WebGL, pas de bibliothèque externe. Une scène = 2 s, réalisée par un développeur seul en une passe : ambitieux mais faisable.
Public : commerçants, artisans, indépendants français, souvent pas à l'aise avec internet. Message simple : on te fait un beau site (et logo, pubs, réseaux), prix clair dès 85 €, prêt en 48 à 72 h, écris-nous (@l.t_digital, lien en bio).
Textes à l'écran : français simple, en "tu", très courts (un écran se lit en moins d'une seconde), aucune faute, aucun chiffre inventé.`

const SCENE = {
  type: 'object',
  properties: {
    n: { type: 'integer' },
    start: { type: 'number' }, end: { type: 'number' },
    role: { type: 'string', description: 'rôle narratif de la scène' },
    on_screen_text: { type: 'array', items: { type: 'string' }, description: 'textes exacts affichés, dans l\'ordre' },
    visual: { type: 'string', description: 'décor, composition, couleurs, images utilisées (chemins)' },
    motion: { type: 'string', description: 'chorégraphie précise avec instants absolus (s), techniques (CSS/WAAPI/SVG/canvas), courbes' },
    transition_in: { type: 'string', description: 'comment on entre dans cette scène depuis la précédente' },
    sound_cues: { type: 'array', items: { type: 'object', properties: { t: { type: 'number' }, sound: { type: 'string' } }, required: ['t', 'sound'] } },
  },
  required: ['n', 'start', 'end', 'role', 'on_screen_text', 'visual', 'motion', 'transition_in', 'sound_cues'],
}
const BOARD = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    concept: { type: 'string', description: 'idée directrice en 3-5 phrases' },
    style_guide: { type: 'string', description: 'palette, typo, grammaire de mouvement commune, motifs récurrents qui lient les scènes' },
    music: { type: 'string', description: 'structure musicale à 120 BPM : intro, drop, pauses, montées, final, instruments' },
    scenes: { type: 'array', items: SCENE, minItems: 12, maxItems: 12 },
  },
  required: ['title', 'concept', 'style_guide', 'music', 'scenes'],
}

const LENSES = [
  { key: 'kinetic', brief: 'Direction "typographie cinétique maximale" : le texte EST l\'image. Lettres qui se forment, se déforment, explosent, se recomposent, mots géants qui traversent l\'écran en 3D, masques, découpes, échelles extrêmes, typographie variable (font-stretch / graisse animés). Transitions faites avec la typo elle-même (un O qui devient un trou par lequel on passe, etc.).' },
  { key: 'story', brief: 'Direction "on construit le site en direct" : un récit visuel. On voit un commerçant (sans visage, juste sa boutique / ses objets en formes graphiques) puis son site se construire sous nos yeux à toute vitesse : blocs qui tombent, curseur qui clique, couleurs qui s\'appliquent, photos qui se placent, téléphone qui s\'allume, notifications de réservation, carte Google Maps, logo qui se dessine trait par trait. Toujours lisible, très fluide, plein de micro-animations UI.' },
  { key: 'cinema', brief: 'Direction "caméra cinéma 3D" : une seule caméra virtuelle qui voyage sans couper à travers un espace 3D (perspective CSS) : on traverse des écrans, on vole au-dessus d\'un mur de maquettes, on plonge dans un téléphone, on ressort par un logo, profondeur de champ, lumière volumétrique, particules, reflets, parallaxe. Coupes invisibles (match cuts) entre scènes.' },
]

phase('Concepts')
const concepts = await parallel(LENSES.map(l => () => agent(
  `${CONTEXT}\n\nTA MISSION : proposer un scénario complet de 12 scènes (2 s chacune, instants absolus 0→24 s) selon cette direction :\n${l.brief}\n\nExigences :\n- Les 2 premières secondes doivent accrocher immédiatement (le pouce s'arrête de scroller).\n- Chaque scène contient au moins 3 couches de mouvement simultanées (fond, sujet, détails) et un "moment fort" calé sur un temps.\n- Varie les techniques d'une scène à l'autre ; garde un fil visuel commun.\n- Le message doit rester clair : quoi (site, logo, pubs, réseaux), pour qui (ton commerce), combien (dès 85 €), en combien de temps (48 à 72 h), comment (simple), et la fin = appel à l'action (@l.t_digital, lien en bio) qui reste lisible au moins 1,5 s.\n- Décris la chorégraphie avec des instants absolus précis et des techniques concrètes réalisables.\n- Donne les bruitages pour chaque moment fort.\nRends uniquement le scénario structuré.`,
  { label: `concept:${l.key}`, phase: 'Concepts', schema: BOARD })))
const ok = concepts.map((c, i) => c && ({ key: LENSES[i].key, board: c })).filter(Boolean)
log(`${ok.length} concepts reçus`)

phase('Jury')
const JURY = {
  type: 'object',
  properties: {
    scores: { type: 'array', items: { type: 'object', properties: {
      key: { type: 'string' }, hook: { type: 'number' }, animation_richness: { type: 'number' }, clarity: { type: 'number' },
      cohesion: { type: 'number' }, feasibility: { type: 'number' }, legibility_safe_zones: { type: 'number' }, truthfulness: { type: 'number' },
      best_scenes: { type: 'array', items: { type: 'string' } }, weaknesses: { type: 'array', items: { type: 'string' } } },
      required: ['key', 'hook', 'animation_richness', 'clarity', 'cohesion', 'feasibility', 'legibility_safe_zones', 'truthfulness', 'best_scenes', 'weaknesses'] } },
    recommendation: { type: 'string' },
  },
  required: ['scores', 'recommendation'],
}
const JUDGES = [
  'un directeur artistique de motion design exigeant (Buck, ManvsMachine) : spectacle, rythme, originalité, cohérence visuelle',
  'un responsable marketing pour petits commerçants : clarté du message, crédibilité, envie de cliquer, honnêteté des promesses',
  'un développeur front-end expert en animation CSS/canvas : faisabilité réelle en 2 s par scène avec les règles de SPEC.md, risques de rendu, performances',
]
const verdicts = await parallel(JUDGES.map((j, i) => () => agent(
  `${CONTEXT}\n\nTu es ${j}. Voici ${ok.length} scénarios concurrents (JSON) :\n${JSON.stringify(ok, null, 1)}\n\nNote chaque scénario de 1 à 10 sur chaque critère, cite les meilleures scènes (par "clé:numéro") et les faiblesses précises. Sois sévère et concret.`,
  { label: `jury:${i + 1}`, phase: 'Jury', schema: JURY })))

phase('Synthèse')
const FINAL = {
  type: 'object',
  properties: {
    ...BOARD.properties,
    scenes: { type: 'array', minItems: 12, maxItems: 12, items: { type: 'object', properties: {
      ...SCENE.properties,
      implementation_brief: { type: 'string', description: 'brief technique précis pour le développeur de la scène : structure DOM, couches, techniques, instants, courbes, images, état au début et à la fin (pour raccorder avec les scènes voisines)' },
      handoff_out: { type: 'string', description: 'à quoi ressemble la dernière image de la scène (pour que la scène suivante raccorde)' },
    }, required: [...SCENE.required, 'implementation_brief', 'handoff_out'] } },
    fx_layer: { type: 'string', description: 'brief de la couche globale fx (transitions entre scènes qui chevauchent les coupes, grain, vignettage, flashs), avec instants précis' },
  },
  required: [...BOARD.required, 'fx_layer'],
}
const final = await agent(
  `${CONTEXT}\n\nTu es le réalisateur. Voici les scénarios concurrents :\n${JSON.stringify(ok, null, 1)}\n\nEt les avis du jury :\n${JSON.stringify(verdicts.filter(Boolean), null, 1)}\n\nÉcris le SCÉNARIO FINAL : pars du meilleur, greffe les meilleures scènes et idées des autres, corrige toutes les faiblesses signalées. Il doit être le plus spectaculaire possible tout en restant faisable et parfaitement clair.\nPour chaque scène, écris un implementation_brief autosuffisant (le développeur ne verra QUE ce brief + SPEC.md) : couches DOM, techniques, instants absolus, courbes, images exactes, textes exacts, état d'entrée et de sortie (handoff_out) pour des raccords parfaits entre scènes. Ajoute le brief de la couche fx globale (transitions qui enjambent les coupes).\nRespecte strictement les zones sûres et les faits autorisés de SPEC.md.`,
  { label: 'réalisateur', phase: 'Synthèse', schema: FINAL, effort: 'max' })
return { final, verdicts: verdicts.filter(Boolean), concepts: ok.map(c => ({ key: c.key, title: c.board.title, concept: c.board.concept })) }
