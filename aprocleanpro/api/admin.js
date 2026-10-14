/* Administration en ligne du site A-Proclean (Vercel).

   Adresse : https://<ton-site>/admin → connexion → le site s'ouvre en mode édition → « Publier ».
   « Publier » enregistre le site dans GitHub ; Vercel le remet en ligne tout seul (environ 1 minute).

   Aucun secret n'est écrit ici. À régler une seule fois dans Vercel
   (Project → Settings → Environment Variables), puis « Redeploy » :
     ADMIN_EMAIL     ton adresse email de connexion
     ADMIN_PASSWORD  ton mot de passe (long : au moins 12 caractères)
     GITHUB_TOKEN    jeton GitHub « fine-grained » limité à ce dépôt, permission « Contents : Read and write »
     GITHUB_REPO     (facultatif) dépôt, par défaut TimaoBausmayer/mot-eau-site-
     GITHUB_BRANCH   (facultatif) branche publiée par Vercel, par défaut main
     SITE_DIR        (facultatif) dossier du site dans le dépôt, par défaut aprocleanpro

   Routes : GET /admin (connexion) · POST /admin (se connecter) · GET /admin?logout
            GET /admin?me (suis-je connecté ?) · POST /admin?blob (envoi d'une photo)
            POST /admin?publish (publication du site) · GET /admin?diag (diagnostic, sans secret) */
const crypto = require("crypto");

const COOKIE = "apc_admin", DURATION = 8 * 3600, MAX_HTML = 4000000, MAX_PHOTO = 3500000;
const sha = s => crypto.createHash("sha256").update(String(s)).digest();
const same = (a, b) => crypto.timingSafeEqual(sha(a), sha(b));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function sign(exp, email, pass) {
  return crypto.createHmac("sha256", "apc|" + email + "|" + pass).update(String(exp)).digest("hex");
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
/* Refuse les requêtes envoyées depuis un autre site (en plus du cookie SameSite=Strict). */
function sameOrigin(req) {
  const o = req.headers.origin;
  if (!o) return true;
  try { return new URL(o).host === req.headers.host; } catch (e) { return false; }
}
async function readRaw(req) {
  let b = req.body;
  if (b && typeof b === "object" && !Buffer.isBuffer(b)) return b;
  if (Buffer.isBuffer(b)) return b.toString("utf8");
  if (typeof b === "string") return b;
  return new Promise(r => { let d = ""; req.on("data", c => d += c); req.on("end", () => r(d)); req.on("error", () => r("")); });
}
async function readForm(req) {
  const b = await readRaw(req);
  if (b && typeof b === "object") return b;
  const o = {}; new URLSearchParams(b).forEach((v, k) => { o[k] = v; });
  return o;
}
async function readJson(req) {
  const b = await readRaw(req);
  if (b && typeof b === "object") return b;
  try { return JSON.parse(b); } catch (e) { return null; }
}
function send(res, code, type, body, extra) {
  res.statusCode = code;
  res.setHeader("Content-Type", type);
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Referrer-Policy", "same-origin"); /* « no-referrer » ferait envoyer « Origin: null » au formulaire de connexion */
  Object.keys(extra || {}).forEach(k => res.setHeader(k, extra[k]));
  res.end(body);
}
const jsonOut = (res, code, o) => send(res, code, "application/json; charset=utf-8", JSON.stringify(o));

/* ---------- GitHub ---------- */
function ghCfg() {
  return {
    token: process.env.GITHUB_TOKEN || "",
    repo: process.env.GITHUB_REPO || "TimaoBausmayer/mot-eau-site-",
    branch: process.env.GITHUB_BRANCH || "main",
    dir: (process.env.SITE_DIR || "aprocleanpro").replace(/^\/+|\/+$/g, ""),
    api: (process.env.GITHUB_API || "https://api.github.com").replace(/\/+$/, ""),
  };
}
async function gh(cfg, method, path, body) {
  const r = await fetch(cfg.api + "/repos/" + cfg.repo + path, {
    method,
    headers: { Authorization: "Bearer " + cfg.token, Accept: "application/vnd.github+json", "User-Agent": "aproclean-admin", "Content-Type": "application/json", "X-GitHub-Api-Version": "2022-11-28" },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null; try { data = await r.json(); } catch (e) { data = null; }
  return { ok: r.ok, status: r.status, data };
}
function ghError(res, r) {
  if (r.status === 401 || r.status === 403) return jsonOut(res, 502, { ok: false, message: "GitHub refuse le jeton (GITHUB_TOKEN) : vérifie qu'il est valide et qu'il a le droit d'écrire dans le dépôt." });
  if (r.status === 404) return jsonOut(res, 502, { ok: false, message: "Dépôt ou branche introuvable : vérifie GITHUB_REPO et GITHUB_BRANCH dans Vercel." });
  return jsonOut(res, 502, { ok: false, message: "GitHub a répondu : erreur " + r.status + "." });
}

/* Envoi d'une photo : elle est stockée dans GitHub (sans publier) et sera ajoutée au site au moment de « Publier ». */
async function blob(req, res) {
  const cfg = ghCfg();
  if (!cfg.token) return jsonOut(res, 501, { ok: false, message: "La publication n'est pas encore configurée (GITHUB_TOKEN manquant dans Vercel)." });
  const b = await readJson(req);
  const type = b && b.type, data = b && b.data;
  if (!["image/jpeg", "image/png"].includes(type) || typeof data !== "string" || !/^[A-Za-z0-9+/]+=*$/.test(data))
    return jsonOut(res, 400, { ok: false, message: "Photo non valide." });
  const buf = Buffer.from(data, "base64");
  const isJpg = buf[0] === 0xff && buf[1] === 0xd8, isPng = buf.slice(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  if ((type === "image/jpeg" && !isJpg) || (type === "image/png" && !isPng)) return jsonOut(res, 400, { ok: false, message: "Ce fichier n'est pas une image valide." });
  if (buf.length > MAX_PHOTO) return jsonOut(res, 400, { ok: false, message: "Photo trop lourde." });
  try {
    const r = await gh(cfg, "POST", "/git/blobs", { content: data, encoding: "base64" });
    if (!r.ok || !r.data || !r.data.sha) return ghError(res, r);
    return jsonOut(res, 200, { ok: true, sha: r.data.sha, path: "photos/" + r.data.sha.slice(0, 20) + (isPng ? ".png" : ".jpg") });
  } catch (e) { return jsonOut(res, 502, { ok: false, message: "Impossible de joindre GitHub." }); }
}

/* Publication : un seul enregistrement GitHub contenant index.html et les nouvelles photos. */
async function publish(req, res) {
  const cfg = ghCfg();
  if (!cfg.token) return jsonOut(res, 501, { ok: false, message: "La publication n'est pas encore configurée (GITHUB_TOKEN manquant dans Vercel)." });
  const b = await readJson(req);
  const html = b && b.html, files = (b && Array.isArray(b.files)) ? b.files : [];
  if (typeof html !== "string" || !/^<!doctype html>/i.test(html) || !html.includes('id="site-data"') || html.length > MAX_HTML)
    return jsonOut(res, 400, { ok: false, message: "Le contenu reçu n'est pas valide : rien n'a été publié." });
  if (files.length > 80 || files.some(f => !f || !/^photos\/[a-f0-9]{20}\.(jpg|png)$/.test(f.path) || !/^[a-f0-9]{40}$/.test(f.sha) || f.path.slice(7, 27) !== f.sha.slice(0, 20)))
    return jsonOut(res, 400, { ok: false, message: "Liste de photos non valide : rien n'a été publié." });
  const seen = new Set(), photos = files.filter(f => !seen.has(f.path) && seen.add(f.path));
  try {
    const page = await gh(cfg, "POST", "/git/blobs", { content: Buffer.from(html, "utf8").toString("base64"), encoding: "base64" });
    if (!page.ok) return ghError(res, page);
    for (let k = 0; k < 3; k++) {
      const ref = await gh(cfg, "GET", "/git/ref/heads/" + cfg.branch);
      if (!ref.ok) return ghError(res, ref);
      const head = ref.data.object.sha;
      const commit = await gh(cfg, "GET", "/git/commits/" + head);
      if (!commit.ok) return ghError(res, commit);
      const tree = await gh(cfg, "POST", "/git/trees", {
        base_tree: commit.data.tree.sha,
        tree: [{ path: cfg.dir + "/index.html", mode: "100644", type: "blob", sha: page.data.sha }]
          .concat(photos.map(f => ({ path: cfg.dir + "/" + f.path, mode: "100644", type: "blob", sha: f.sha }))),
      });
      if (!tree.ok) return ghError(res, tree);
      const c = await gh(cfg, "POST", "/git/commits", { message: "Mise à jour du site depuis l'administration", tree: tree.data.sha, parents: [head] });
      if (!c.ok) return ghError(res, c);
      const up = await gh(cfg, "PATCH", "/git/refs/heads/" + cfg.branch, { sha: c.data.sha, force: false });
      if (up.ok) return jsonOut(res, 200, { ok: true, commit: c.data.sha });
      if (up.status === 422 && k < 2) continue; /* la branche a bougé entre-temps : on recommence */
      return ghError(res, up);
    }
  } catch (e) { return jsonOut(res, 502, { ok: false, message: "Impossible de joindre GitHub." }); }
}

const loginPage = err => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Connexion — Administration</title>
<style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#142f64;color:#0f1e33;font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:20px}
form{width:100%;max-width:400px;background:#fff;border-radius:18px;padding:32px 28px;box-shadow:0 30px 60px -20px rgba(0,0,0,.5)}
h1{margin:0 0 4px;font-size:1.5rem}p{margin:0 0 22px;color:#566375;font-size:.95rem}
label{display:block;margin:16px 0 6px;font-size:.88rem;font-weight:600}
input{width:100%;padding:13px 14px;border-radius:10px;border:1.5px solid #7b8794;font-size:1rem;color:#0f1e33}
input:focus{outline:3px solid #2cb3f3;outline-offset:1px;border-color:#0e63ad}
button{width:100%;margin-top:24px;padding:14px;border:0;border-radius:999px;background:#2cb3f3;color:#0f1e33;font-weight:700;font-size:1rem;cursor:pointer}
button:hover{background:#142f64;color:#fff}button:focus-visible{outline:3px solid #0e63ad;outline-offset:3px}
.err{margin:16px 0 0;padding:10px 12px;border-radius:10px;background:#fde8e7;color:#8c1d18;font-size:.92rem}
a{display:block;margin-top:18px;text-align:center;color:#0e63ad;font-size:.9rem}</style></head>
<body><main><form method="post" action="/admin" autocomplete="on"><h1>Administration</h1><p>Accès réservé au propriétaire du site.</p>
<label for="e">Adresse email</label><input id="e" name="email" type="email" autocomplete="username" required autofocus>
<label for="p">Mot de passe</label><input id="p" name="password" type="password" autocomplete="current-password" required>
${err ? '<div class="err" role="alert">' + esc(err) + "</div>" : ""}<button type="submit">Se connecter</button><a href="/">← Retour au site</a></form></main></body></html>`;

module.exports = async (req, res) => {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase(), pass = process.env.ADMIN_PASSWORD || "";
  const url = new URL(req.url || "/", "http://x"), q = url.searchParams;
  if (q.has("diag")) { /* diagnostic sans aucun secret */
    const c = ghCfg();
    return jsonOut(res, 200, { emailConfigured: !!email, passwordConfigured: !!pass, passwordLongEnough: pass.length >= 12, publishConfigured: !!c.token, repo: c.repo, branch: c.branch, dir: c.dir, node: process.version });
  }
  if (!email || !pass) {
    if (q.has("me")) return jsonOut(res, 200, { ok: false, configured: false });
    return send(res, 503, "text/plain; charset=utf-8", "Administration non configurée : ajoute ADMIN_EMAIL et ADMIN_PASSWORD dans Vercel (Settings → Environment Variables), puis « Redeploy ».");
  }
  const logged = validCookie(req, email, pass);
  if (q.has("me")) return jsonOut(res, 200, { ok: logged, publish: !!ghCfg().token });
  if (q.has("logout")) {
    return send(res, 303, "text/plain; charset=utf-8", "", { Location: "/", "Set-Cookie": COOKIE + "=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict" });
  }
  if (req.method === "POST" && (q.has("publish") || q.has("blob"))) {
    if (!sameOrigin(req)) return jsonOut(res, 403, { ok: false, message: "Requête refusée." });
    if (!logged) return jsonOut(res, 401, { ok: false, message: "Session expirée : reconnecte-toi." });
    return q.has("blob") ? blob(req, res) : publish(req, res);
  }
  if (req.method === "POST") {
    if (!sameOrigin(req)) return send(res, 403, "text/plain; charset=utf-8", "Requête refusée.");
    const f = await readForm(req);
    const ok = same(String(f.email || "").trim().toLowerCase(), email) & same(String(f.password || ""), pass);
    if (!ok) {
      await new Promise(r => setTimeout(r, 900)); /* ralentit les essais au hasard */
      return send(res, 401, "text/html; charset=utf-8", loginPage("Email ou mot de passe incorrect."));
    }
    return send(res, 303, "text/plain; charset=utf-8", "", {
      Location: "/?admin",
      "Set-Cookie": COOKIE + "=" + makeCookie(email, pass) + "; Path=/; Max-Age=" + DURATION + "; HttpOnly; Secure; SameSite=Strict" });
  }
  if (logged) return send(res, 303, "text/plain; charset=utf-8", "", { Location: "/?admin" });
  return send(res, 200, "text/html; charset=utf-8", loginPage(""));
};
