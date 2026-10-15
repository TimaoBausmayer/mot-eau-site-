/* /llms.txt — résumé du site lisible par les agents IA (format llmstxt.org), généré à chaque appel depuis config.js :
   les prix et les textes sont donc toujours à jour, même après une publication depuis l'admin. */
global.window = global.window || {};
require("../config.js");
const C = global.window.SITE_CONFIG;
const BASE = (C.siteUrl || "https://l-t-digital.vercel.app").replace(/\/$/, "");
const eur = n => n == null ? "sur devis" : (Number.isInteger(n) ? n : n.toFixed(2).replace(".", ",")) + " €";
const vis = l => (Array.isArray(l) ? l : []).filter(x => x && x.hidden !== true);
function text() {
  const T = [], ct = C.contact || {}, vat = (C.vat || {}).mode === "franchise" ? "TVA non applicable, art. 293 B du CGI (prix nets)." : "";
  T.push(`# ${C.brand}`, "", `> ${C.brand} est une petite entreprise française qui crée des sites internet, des logos, des pubs vidéo, des affiches et des photos, et gère les réseaux sociaux des commerçants, artisans et indépendants. Prix annoncés à l'avance, sites livrés en ${C.delivery || "48 à 72 h"}.`, "");
  T.push(`Site : ${BASE}/`, `Contact : ${ct.email || ""}${ct.instagramHandle ? " · Instagram " + ct.instagramHandle + " (" + ct.instagram + ")" : ""}`, `Langue : français. ${vat}`, "");
  T.push("## Sites internet (prix de départ)", "");
  for (const p of vis(C.plans)) T.push(`- **${p.name}** — ${p.from ? "à partir de " : ""}${eur(p.price)} : ${p.tagline || ""} (${(p.features || []).filter(f => !String(f).startsWith("!")).join(" ; ")})`);
  T.push("", "## Options des sites", "");
  for (const a of vis(C.addons)) T.push(`- ${a.name} — ${a.from ? "dès " : ""}${eur(a.price)}${a.desc ? " : " + a.desc : ""}`);
  T.push("", "## Logo, pubs vidéo, photos, affiches, réseaux sociaux", "");
  for (const s of vis((C.services || {}).items)) T.push(`- ${s.name} (${s.group}) — ${s.from ? "dès " : ""}${eur(s.price)}${s.unit ? " " + s.unit : ""}${s.desc ? " : " + s.desc : ""}`);
  T.push("", "## Comment commander", "", ...(C.process || []).map((s, i) => `${i + 1}. ${s.title} — ${s.text}`), "", `Commande : ${BASE}/#commande (le formulaire prépare un récapitulatif que le client nous envoie lui-même ; rien n'est transmis automatiquement).`);
  const dep = +((C.order || {}).depositPercent) || 0; if (dep) T.push(`Acompte de ${dep} % à la commande, solde à la validation.`);
  T.push("", "## Questions fréquentes", "", ...(C.faq || []).map(f => `- **${f.q}** ${String(f.a).replace("{delivery}", C.delivery || "48 à 72 h")}`));
  T.push("", "## Pages légales", "", `- [Mentions légales](${BASE}/mentions-legales.html)`, `- [Conditions générales de vente](${BASE}/cgv.html)`, `- [Conditions générales d'utilisation](${BASE}/cgu.html)`,
    `- [Politique de confidentialité](${BASE}/confidentialite.html)`, `- [Politique de cookies](${BASE}/cookies.html) — aucun cookie ni traceur pour les visiteurs`, `- [Rétractation et remboursement](${BASE}/retractation.html)`, "");
  return T.join("\n").replace(/\{delivery\}/g, C.delivery || "48 à 72 h") + "\n";
}
module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=300");
  res.end(text());
};
module.exports.text = text;
