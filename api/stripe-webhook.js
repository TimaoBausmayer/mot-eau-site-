/*
 * Réception des paiements Stripe : marque automatiquement « payé » l'inscription, l'adhésion,
 * le prêt ou la commande correspondant (le site ajoute la référence au lien de paiement).
 * Sécurité : la signature Stripe est vérifiée avec STRIPE_WEBHOOK_SECRET ; l'écriture dans la base
 * se fait avec le compte de service Firebase (FIREBASE_SERVICE_ACCOUNT), stocké dans les variables Vercel.
 */
const crypto = require('crypto');

const DB_URL = 'https://mot-eau-default-rtdb.europe-west1.firebasedatabase.app';
const COLLS = ['memberships', 'registrations', 'equipmentLoans', 'orders', 'donationRecords'];
const LOYALTY_COLLS = ['registrations', 'memberships', 'orders', 'equipmentLoans'];

function readRaw(req){
  return new Promise((resolve, reject) => {
    if(Buffer.isBuffer(req.body)) return resolve(req.body);
    if(typeof req.body === 'string') return resolve(Buffer.from(req.body));
    const chunks = []; req.on('data', c => chunks.push(c)); req.on('end', () => resolve(Buffer.concat(chunks))); req.on('error', reject);
  });
}
function verifyStripe(raw, header, secret){
  const parts = Object.fromEntries(String(header || '').split(',').map(kv => kv.split('=')));
  if(!parts.t || !parts.v1) return false;
  if(Math.abs(Date.now() / 1000 - Number(parts.t)) > 600) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${parts.t}.${raw.toString('utf8')}`).digest('hex');
  const a = Buffer.from(expected), b = Buffer.from(String(parts.v1));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
async function googleToken(sa){
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: 'RS256', typ: 'JWT' });
  const claim = b64({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3000 });
  const sig = crypto.createSign('RSA-SHA256').update(`${head}.${claim}`).sign(sa.private_key, 'base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${head}.${claim}.${sig}` });
  if(!r.ok) throw new Error('token ' + r.status);
  return (await r.json()).access_token;
}
const sha256 = t => crypto.createHash('sha256').update(t).digest('hex');
const normEmail = e => String(e || '').trim().toLowerCase();

module.exports = async (req, res) => {
  if(req.method !== 'POST'){ res.status(405).end(); return; }
  const secret = process.env.STRIPE_WEBHOOK_SECRET, saRaw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if(!secret || !saRaw){ res.status(500).json({ error: 'Configuration manquante' }); return; }
  const raw = await readRaw(req);
  if(!verifyStripe(raw, req.headers['stripe-signature'], secret)){ res.status(400).json({ error: 'Signature invalide' }); return; }
  const event = JSON.parse(raw.toString('utf8'));
  if(event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded'){ res.status(200).json({ ignored: event.type }); return; }
  const session = event.data.object;
  if(session.payment_status !== 'paid' || !session.client_reference_id){ res.status(200).json({ ignored: 'no ref / not paid' }); return; }
  const ref = String(session.client_reference_id).slice(0, 40);

  const sa = JSON.parse(saRaw), token = await googleToken(sa);
  const db = async (method, path, body) => {
    const r = await fetch(`${DB_URL}/moteau/${path}.json?access_token=${token}`, { method, headers: { 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
    if(!r.ok) throw new Error(`${method} ${path} ${r.status}`);
    return r.json();
  };
  for(const coll of COLLS){
    const data = await db('GET', coll);
    const entry = Object.entries(data || {}).find(([, v]) => v && v.ref === ref);
    if(!entry) continue;
    const [key, rec] = entry;
    if(rec.paid){ res.status(200).json({ already: true }); return; }
    const paidDate = new Date().toLocaleDateString('fr-FR', { timeZone: 'Europe/Paris' });
    await db('PATCH', `${coll}/${key}`, { paid: true, paidDate, method: 'en_ligne', stripe: true });
    if(rec.uid) await db('PATCH', `userRecords/${rec.uid}/${ref}`, { paid: true, paidDate });
    await db('PUT', `stripePayments/${ref}`, { amount: (session.amount_total || 0) / 100, ts: Date.now(), coll });
    if(coll === 'memberships' && rec.email){
      await db('PUT', `memberHashes/${sha256(normEmail(rec.email))}`, true);
      const all = await db('GET', 'memberships');
      await db('PUT', 'memberNames', Object.values(all || {}).filter(m => m && m.paid && m.name).map(m => m.name));
    }
    if(rec.uid && LOYALTY_COLLS.includes(coll)){
      const cfg = await db('GET', 'loyaltyConfig') || {};
      if(cfg.enabled !== false){
        const pts = Math.floor(((session.amount_total || 0) / 100) * (Number(cfg.perEuro) || 1));
        if(pts > 0) await db('PUT', `loyalty/${rec.uid}/earned/${ref}`, pts);
      }
    }
    res.status(200).json({ paid: ref, coll }); return;
  }
  res.status(200).json({ notFound: ref });
};
