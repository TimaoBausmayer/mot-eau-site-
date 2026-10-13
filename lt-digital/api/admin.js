/* Administration protégée (Vercel).
   /admin affiche une page de connexion ; après connexion (e-mail + mot de passe), l'admin s'ouvre.
   Ni l'e-mail ni le mot de passe ne sont écrits ici : tu les règles dans Vercel
   (Project → Settings → Environment Variables) : ADMIN_EMAIL et ADMIN_PASSWORD, puis « Redeploy ».
   La page d'admin est intégrée dans api/_admin_page.js (généré par tools/build-admin.py). */
const crypto = require("crypto");
let PAGE = "";
try { PAGE = require("./_admin_page.js"); } catch (e) { PAGE = ""; }

const COOKIE = "ltd_admin", DURATION = 8 * 3600;
const sha = s => crypto.createHash("sha256").update(String(s)).digest();
const same = (a, b) => crypto.timingSafeEqual(sha(a), sha(b));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function sign(exp, email, pass) {
  return crypto.createHmac("sha256", "ltd|" + email + "|" + pass).update(String(exp)).digest("hex");
}
function makeCookie(email, pass) {
  const exp = Math.floor(Date.now() / 1000) + DURATION;
  return exp + "." + sign(exp, email, pass);
}
function validCookie(req, email, pass) {
  const m = (req.headers.cookie || "").match(new RegExp("(?:^|;\\s*)" + COOKIE + "=([^;]+)"));
  if (!m) return false;
  const [exp, sig] = m[1].split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now() / 1000) return false;
  return same(sig, sign(exp, email, pass));
}
async function readForm(req) {
  let b = req.body;
  if (b && typeof b === "object" && !Buffer.isBuffer(b)) return b;
  if (Buffer.isBuffer(b)) b = b.toString("utf8");
  if (typeof b !== "string") {
    b = await new Promise(r => { let d = ""; req.on("data", c => d += c); req.on("end", () => r(d)); req.on("error", () => r("")); });
  }
  const o = {}; new URLSearchParams(b).forEach((v, k) => { o[k] = v; });
  return o;
}
function send(res, code, type, body, extra) {
  res.statusCode = code;
  res.setHeader("Content-Type", type);
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Referrer-Policy", "no-referrer");
  Object.keys(extra || {}).forEach(k => res.setHeader(k, extra[k]));
  res.end(body);
}
const loginPage = err => `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Connexion — L&amp;T Digital</title>
<style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a0912;color:#fff;font:16px/1.4 system-ui,-apple-system,Segoe UI,sans-serif;padding:20px}
form{width:100%;max-width:380px;background:#14121f;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:30px 26px}
h1{margin:0 0 4px;font-size:22px}p{margin:0 0 20px;color:#a9aec8;font-size:14px}
label{display:block;margin:14px 0 6px;font-size:13px;color:#a9aec8}
input{width:100%;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.18);background:#0d0b16;color:#fff;font-size:16px}
input:focus{outline:2px solid #c8ff3e;outline-offset:1px}
button{width:100%;margin-top:20px;padding:13px;border:0;border-radius:999px;background:#c8ff3e;color:#0a0912;font-weight:700;font-size:16px;cursor:pointer}
.err{margin:14px 0 0;padding:10px 12px;border-radius:10px;background:rgba(255,90,90,.14);color:#ffb3b3;font-size:14px}</style></head>
<body><form method="post" action="/admin" autocomplete="on"><h1>Administration</h1><p>L&amp;T Digital — accès réservé</p>
<label for="e">Adresse e-mail</label><input id="e" name="email" type="email" autocomplete="username" required autofocus>
<label for="p">Mot de passe</label><input id="p" name="password" type="password" autocomplete="current-password" required>
${err ? '<div class="err">' + esc(err) + "</div>" : ""}<button type="submit">Se connecter</button></form></body></html>`;

module.exports = async (req, res) => {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase(), pass = process.env.ADMIN_PASSWORD || "";
  const url = new URL(req.url || "/", "http://x");
  if (url.searchParams.has("diag")) { /* diagnostic sans aucun secret */
    return send(res, 200, "application/json; charset=utf-8", JSON.stringify({
      emailConfigured: !!email, passwordConfigured: !!pass, pageBundled: PAGE.length > 1000, pageBytes: PAGE.length, node: process.version }));
  }
  if (!email || !pass) {
    return send(res, 503, "text/plain; charset=utf-8", "Admin non configuré : ajoute ADMIN_EMAIL et ADMIN_PASSWORD dans les réglages Vercel (Environment Variables), puis fais « Redeploy ».");
  }
  if (url.searchParams.has("logout")) {
    return send(res, 303, "text/plain; charset=utf-8", "", { Location: "/admin", "Set-Cookie": COOKIE + "=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict" });
  }
  if (req.method === "POST") {
    const f = await readForm(req);
    const ok = same(String(f.email || "").trim().toLowerCase(), email) & same(String(f.password || ""), pass);
    if (!ok) {
      await new Promise(r => setTimeout(r, 900)); /* ralentit les essais au hasard */
      return send(res, 401, "text/html; charset=utf-8", loginPage("E-mail ou mot de passe incorrect."));
    }
    return send(res, 303, "text/plain; charset=utf-8", "", {
      Location: "/admin",
      "Set-Cookie": COOKIE + "=" + makeCookie(email, pass) + "; Path=/; Max-Age=" + DURATION + "; HttpOnly; Secure; SameSite=Strict" });
  }
  if (!validCookie(req, email, pass)) return send(res, 200, "text/html; charset=utf-8", loginPage(""));
  if (!PAGE) return send(res, 500, "text/plain; charset=utf-8", "Connexion réussie, mais la page d'admin n'est pas intégrée : lance « python3 tools/build-admin.py » puis publie api/_admin_page.js.");
  return send(res, 200, "text/html; charset=utf-8", PAGE);
};
