export const meta = {
  name: 'pub10-build-scenes',
  description: 'Coder les 12 scènes de la pub 10 + la couche fx, chacune vérifiée image par image puis critiquée et corrigée',
  phases: [
    { title: 'Construction', detail: 'un agent par scène : code + planche contact + auto-vérification' },
    { title: 'Critique', detail: 'relecteur indépendant qui critique puis corrige' },
    { title: 'FX', detail: 'couche globale de transitions' },
  ],
}

const ROOT = '/home/user/mot-eau-site-/lt-digital'
const P10 = ROOT + '/promo/pub10'
const SCR = '/tmp/claude-0/-home-user-mot-eau-site-/05591e9e-0cf7-5764-9828-1fab1ec1dbc6/scratchpad/p10'
const pad = n => String(n).padStart(2, '0')

const COMMON = `Projet : publicité verticale de 24 s pour L&T Digital (petite agence française de sites web), codée en HTML/CSS/JS et filmée image par image.
LIS D'ABORD ${P10}/SPEC.md (règles techniques OBLIGATOIRES : délais absolus, interdits, zones sûres, outils mkRnd/onSeek/split, images, faits autorisés, commandes de test).
Le scénario complet est dans ${P10}/storyboard.json (champ "style_guide" = charte commune ; "scenes" = les 12 scènes). Le moteur commun est ${P10}/runtime.js, ${P10}/base.css, ${P10}/boot.js (NE PAS les modifier ; si un outil manque, code-le dans ton propre sNN.js).
Le serveur local doit tourner sur http://localhost:8123 (racine ${ROOT}). Vérifie avec curl ; s'il ne répond pas, relance-le en arrière-plan : cd ${ROOT} && nohup python3 -m http.server 8123 >/dev/null 2>&1 &  — ne l'arrête JAMAIS.
Tu ne touches QU'AUX fichiers de ta scène (sNN.html / sNN.css / sNN.js dans ${P10}). D'autres agents travaillent en même temps sur les autres scènes.
Niveau attendu : studio de motion design haut de gamme. Mouvement permanent, couches multiples, courbes soignées, raccords parfaits, typographie impeccable (français sans faute, apostrophe ’). Aucun texte coupé, aucun texte hors zone sûre (x 70–900, y 220–1560), aucune image vide, aucun élément qui "saute".
Pour regarder ton travail : python3 ${P10}/build.py --only NN puis python3 ${P10}/shot.py pub10-sNN.html <instants> --out ${SCR}/sNN/<nom>.png --w 300, puis ouvre la planche avec l'outil Read (c'est une image) et REGARDE-la vraiment. Fais aussi des planches resserrées (pas de 0,05 s) autour des moments forts pour vérifier la fluidité. Corrige et recommence jusqu'à ce que ce soit irréprochable.`

const RESULT = { type: 'object', properties: {
  scene: { type: 'integer' }, done: { type: 'boolean' },
  files: { type: 'array', items: { type: 'string' } },
  sheets: { type: 'array', items: { type: 'string' }, description: 'chemins des planches contact finales' },
  deviations: { type: 'array', items: { type: 'string' }, description: 'écarts volontaires par rapport au brief et pourquoi' },
  known_issues: { type: 'array', items: { type: 'string' } },
}, required: ['scene', 'done', 'files', 'sheets', 'deviations', 'known_issues'] }

const CRIT = { type: 'object', properties: {
  scene: { type: 'integer' },
  verdict: { type: 'string', enum: ['excellent', 'a_corriger', 'casse'] },
  issues: { type: 'array', items: { type: 'object', properties: {
    severity: { type: 'string', enum: ['bloquant', 'important', 'mineur'] },
    at: { type: 'string', description: 'instant(s) concerné(s)' }, problem: { type: 'string' }, fix: { type: 'string' } },
    required: ['severity', 'at', 'problem', 'fix'] } },
  sheets: { type: 'array', items: { type: 'string' } },
}, required: ['scene', 'verdict', 'issues', 'sheets'] }

const sceneCtx = n => `TON BRIEF (à lire en entier avant tout) : ${P10}/briefs/s${pad(n)}.md — il contient le JSON complet de la scène ${pad(n)} (textes exacts, chorégraphie, implementation_brief, handoff_out), les raccords avec les scènes voisines, la charte commune et la structure musicale.`

const scenes = Array.from({ length: 12 }, (_, i) => i + 1)

const results = await pipeline(scenes,
  n => n <= 7 ? { scene: n, done: true, files: [], sheets: [], deviations: ['déjà construite'], known_issues: [] } :
    agent(`${COMMON}\n\n${sceneCtx(n)}\n\nTA MISSION : réaliser la scène ${pad(n)} en entier (fichiers s${pad(n)}.html / .css / .js) en suivant le brief au plus près, puis la vérifier sur planches contact (au minimum la planche indiquée dans le brief + une planche serrée au pas de 0,1 s sur toute la scène + image par image autour des moments forts et des raccords) et l'améliorer jusqu'à un rendu haut de gamme. NOTE : base.css a été corrigé, la scène est désormais visible dès sa première image (t = début exact) ; inutile de surcharger .sc. Si un fichier de ta scène existe déjà (travail interrompu), relis-le et reprends ou recommence proprement. Si un point du brief est impossible ou moche en vrai, choisis la meilleure alternative et note-la dans deviations. Sois efficace : pas de captures inutiles, mais regarde vraiment chaque planche. Rends le résultat structuré.`,
    { label: `construire:s${pad(n)}`, phase: 'Construction', schema: RESULT }))

phase('FX')
const fx = await agent(`${COMMON}\n\nTA MISSION : réaliser la COUCHE GLOBALE fx (fichiers fx.html / fx.css / fx.js dans ${P10} ; sélecteurs .fx…, keyframes fx-…, ids fx-…), d'après le brief ${P10}/briefs/fx.md (à lire en entier).\n\nLes 12 scènes sont déjà codées. Construis la vidéo complète (python3 ${P10}/build.py, qui inclut fx) et vérifie TOUTES les coupes avec shot.py pub10.html (instants listés dans le brief, plus des planches image par image autour de 2, 6, 8, 12 et 20 s). La couche fx doit enrichir sans jamais gêner la lecture ni créer de flash désagréable. Rends le résultat structuré (scene = 0).`,
  { label: 'construire:fx', phase: 'FX', schema: RESULT })

return { scenes: results, fx }
