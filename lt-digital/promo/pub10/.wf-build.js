export const meta = {
  name: 'pub10-build-scenes',
  description: 'Coder les 12 scènes de la pub 10 + la couche fx, chacune vérifiée image par image puis critiquée et corrigée',
  phases: [
    { title: 'Construction', detail: 'un agent par scène : code + planche contact + auto-vérification' },
    { title: 'Critique', detail: 'critique indépendant par scène (vision)' },
    { title: 'Correction', detail: 'corrections puis re-vérification' },
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
  n => agent(`${COMMON}\n\n${sceneCtx(n)}\n\nTA MISSION : réaliser la scène ${pad(n)} en entier (fichiers s${pad(n)}.html / .css / .js) en suivant le brief au plus près, puis la vérifier sur planches contact (au minimum la planche indiquée dans le brief + une planche serrée au pas de 0,1 s sur toute la scène) et l'améliorer jusqu'à un rendu haut de gamme. Si un point du brief est impossible ou moche en vrai, choisis la meilleure alternative et note-la dans deviations. Rends le résultat structuré.`,
    { label: `construire:s${pad(n)}`, phase: 'Construction', schema: RESULT }),
  (built, n) => agent(`${COMMON}\n\n${sceneCtx(n)}\n\nTU ES LE CRITIQUE INDÉPENDANT de la scène ${pad(n)} (tu n'as pas écrit le code). Construis-la (build.py --only ${pad(n)}) et capture-la toi-même : une planche au pas de 0,1 s sur toute la scène + des planches au pas de 0,033 s (image par image) autour de chaque moment fort et des 0,15 premières / dernières secondes. Regarde chaque image. Juge sans complaisance :\n1) fidélité au brief (textes exacts, instants, couches, effets) ;\n2) lisibilité (chaque phrase-clé nette ≥ 0,5 s, taille, contraste) et zones sûres (x 70–900, y 220–1560) ;\n3) défauts visuels : texte coupé ou qui déborde, éléments qui sautent d'une image à l'autre, images vides ou noires, flou/pixellisation, crénelage, chevauchements laids, couleurs hors charte, flash désagréable ;\n4) qualité de motion design : mouvement continu, courbes, rythme sur les temps, richesse des couches, niveau "studio" ;\n5) raccords : la première image doit raccorder avec la fin de la scène précédente et la dernière avec l'entrée de la suivante ;\n6) règles de SPEC.md (lis le code : délais absolus, aucune horloge réelle, Math.random interdit, préfixes .s${pad(n)} / s${pad(n)}-, fill-mode).\nNote du constructeur : ${JSON.stringify(built)}\nDonne une liste précise de problèmes avec l'instant et la correction concrète. Verdict "excellent" seulement si tu n'as rien d'important à redire.`,
    { label: `critiquer:s${pad(n)}`, phase: 'Critique', schema: CRIT }),
  (crit, n) => {
    if (!crit || (crit.verdict === 'excellent' && !crit.issues.some(i => i.severity !== 'mineur'))) {
      if (crit && crit.issues.length) return agent(`${COMMON}\n\n${sceneCtx(n)}\n\nUn critique a validé la scène ${pad(n)} avec seulement des remarques mineures. Applique celles qui améliorent vraiment le rendu (sans rien casser), vérifie sur planche, puis rends le résultat.\nRemarques : ${JSON.stringify(crit.issues)}`,
        { label: `peaufiner:s${pad(n)}`, phase: 'Correction', schema: RESULT })
      return { scene: n, done: true, files: [], sheets: [], deviations: [], known_issues: [] }
    }
    return agent(`${COMMON}\n\n${sceneCtx(n)}\n\nLa scène ${pad(n)} est déjà codée (fichiers s${pad(n)}.* dans ${P10}). Un critique indépendant a trouvé ces problèmes :\n${JSON.stringify(crit.issues, null, 1)}\nPlanches du critique : ${JSON.stringify(crit.sheets)}\n\nTA MISSION : corriger TOUS les problèmes bloquants et importants (et les mineurs quand c'est simple), puis re-vérifier toi-même image par image autour de chaque point corrigé et sur toute la scène au pas de 0,1 s. Ne casse rien qui marchait. Rends le résultat structuré (known_issues = ce qui reste).`,
      { label: `corriger:s${pad(n)}`, phase: 'Correction', schema: RESULT })
  },
  (fixed, n) => {
    if (!fixed || !fixed.known_issues || !fixed.known_issues.length) return fixed
    return agent(`${COMMON}\n\n${sceneCtx(n)}\n\nDernière passe sur la scène ${pad(n)}. Problèmes encore signalés : ${JSON.stringify(fixed.known_issues)}\nRègle ce qui peut l'être, vérifie sur planches, rends le résultat.`,
      { label: `finir:s${pad(n)}`, phase: 'Correction', schema: RESULT })
  })

phase('FX')
const fx = await agent(`${COMMON}\n\nTA MISSION : réaliser la COUCHE GLOBALE fx (fichiers fx.html / fx.css / fx.js dans ${P10} ; sélecteurs .fx…, keyframes fx-…, ids fx-…), d'après le brief ${P10}/briefs/fx.md (à lire en entier).\n\nLes 12 scènes sont déjà codées. Construis la vidéo complète (python3 ${P10}/build.py, qui inclut fx) et vérifie TOUTES les coupes avec shot.py pub10.html (instants listés dans le brief, plus des planches image par image autour de 2, 6, 8, 12 et 20 s). La couche fx doit enrichir sans jamais gêner la lecture ni créer de flash désagréable. Rends le résultat structuré (scene = 0).`,
  { label: 'construire:fx', phase: 'FX', schema: RESULT })

return { scenes: results, fx }
