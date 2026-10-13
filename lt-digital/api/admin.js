/* Page admin protégée (Vercel). Elle ne s'affiche que si on donne le bon e-mail + le bon mot de passe.
   Ni l'e-mail ni le mot de passe ne sont écrits ici : tu les règles toi-même dans Vercel
   (Project → Settings → Environment Variables) : ADMIN_EMAIL et ADMIN_PASSWORD. */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const same = (a, b) => crypto.timingSafeEqual(
  crypto.createHash("sha256").update(String(a)).digest(),
  crypto.createHash("sha256").update(String(b)).digest());

module.exports = async (req, res) => {
  const email = process.env.ADMIN_EMAIL, pass = process.env.ADMIN_PASSWORD;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  if (!email || !pass) {
    res.statusCode = 503;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Admin non configuré : ajoute ADMIN_EMAIL et ADMIN_PASSWORD dans les réglages Vercel.");
  }
  const h = req.headers.authorization || "";
  let ok = false;
  if (h.startsWith("Basic ")) {
    const raw = Buffer.from(h.slice(6), "base64").toString("utf8"), i = raw.indexOf(":");
    if (i > -1) ok = same(raw.slice(0, i).trim().toLowerCase(), email.trim().toLowerCase()) & same(raw.slice(i + 1), pass);
  }
  if (!ok) {
    await new Promise(r => setTimeout(r, 900)); /* ralentit les essais au hasard */
    res.statusCode = 401;
    res.setHeader("WWW-Authenticate", 'Basic realm="Admin L&T Digital", charset="UTF-8"');
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Connexion requise.");
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(fs.readFileSync(path.join(process.cwd(), "admin.html"), "utf8"));
};
