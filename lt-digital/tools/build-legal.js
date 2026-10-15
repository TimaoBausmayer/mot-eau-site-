/* Génère les 6 pages légales en HTML « en dur » (lisibles sans JavaScript par les moteurs de recherche et les agents IA).
   Usage : node tools/build-legal.js   (à relancer après une modification de config.legal) */
const fs = require("fs"), path = require("path"), vm = require("vm");
const R = path.join(__dirname, "..");
const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(R, "config.js"), "utf8"), ctx);
const C = ctx.window.SITE_CONFIG, build = require(path.join(R, "legal.js"));
const PAGES = { mentions: ["mentions-legales.html", "Mentions légales de L&T Digital : éditeur, hébergeur, médiation de la consommation."],
  cgv: ["cgv.html", "Conditions générales de vente de L&T Digital : commande, prix, paiement, délais, rétractation, garanties."],
  cgu: ["cgu.html", "Conditions générales d'utilisation du site L&T Digital."],
  privacy: ["confidentialite.html", "Politique de confidentialité de L&T Digital : données collectées, durées, droits RGPD."],
  cookies: ["cookies.html", "Politique de cookies de L&T Digital : aucun cookie ni traceur pour les visiteurs."],
  retractation: ["retractation.html", "Droit de rétractation, remboursement, résiliation des abonnements et formulaire type de rétractation."] };
for (const [page, [file, desc]] of Object.entries(PAGES)) {
  const r = build(C, page);
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${r.title.replace(/&/g, "&amp;")}</title>
<meta name="description" content="${desc.replace(/&/g, "&amp;")}">
<link rel="icon" href="images/logo-small.jpg">
<link rel="stylesheet" href="fonts/fonts.css">
<link rel="stylesheet" href="style.css">
</head>
<body data-page="${page}">
${r.body}
<script src="config.js"></script>
<script src="legal.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(R, file), html); console.log("ok", file);
}
