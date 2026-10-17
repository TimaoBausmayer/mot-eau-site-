/* Liens courts imprimés sur les affiches (QR codes et puces NFC) : /insta, /tiktok, /site.
   Ils redirigent vers les comptes indiqués dans config.js › contact : si tu changes de nom sur TikTok ou Instagram,
   modifie seulement config.js (ou l'admin), les affiches déjà imprimées restent valables. */
global.window = global.window || {};
require("../config.js");
module.exports = (req, res) => {
  const C = global.window.SITE_CONFIG, ct = C.contact || {}, base = (C.siteUrl || "/").replace(/\/$/, "") + "/";
  const to = new URL(req.url || "/", "http://x").searchParams.get("to");
  const dest = to === "insta" ? (ct.instagram || base) : to === "tiktok" ? (ct.tiktok || base) : base;
  res.statusCode = 302;
  res.setHeader("Location", dest);
  res.setHeader("Cache-Control", "no-store");
  res.end();
};
