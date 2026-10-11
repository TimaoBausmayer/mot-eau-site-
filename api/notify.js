/*
 * Envoi des notifications « push » aux visiteurs abonnés.
 * Appelé par le site quand l'admin publie une nouveauté (ou depuis l'Espace admin).
 * Sécurité : seul le compte administrateur peut l'utiliser (jeton Firebase vérifié),
 * et la clé privée d'envoi reste dans les variables d'environnement Vercel.
 */
const webpush = require('web-push');

const FIREBASE_API_KEY = 'AIzaSyDMdz5I1kGdB5QbSQi4PCVvgIr9SXQ6jvc';
const DB_URL = 'https://mot-eau-default-rtdb.europe-west1.firebasedatabase.app';
const ADMIN_EMAIL = 'timaobausmayer04@gmail.com';

async function adminEmailFromToken(idToken){
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken })
  });
  if(!res.ok) return null;
  const data = await res.json();
  return data.users && data.users[0] && String(data.users[0].email || '').toLowerCase();
}

module.exports = async (req, res) => {
  if(req.method !== 'POST'){ res.status(405).json({ error: 'POST uniquement' }); return; }
  const { idToken, title, body, url } = req.body || {};
  if(!idToken || !title){ res.status(400).json({ error: 'idToken et title requis' }); return; }
  if(!process.env.VAPID_PRIVATE_KEY || !process.env.VAPID_PUBLIC_KEY){ res.status(500).json({ error: 'Clés VAPID absentes' }); return; }

  const email = await adminEmailFromToken(idToken);
  if(email !== ADMIN_EMAIL){ res.status(403).json({ error: 'Réservé à l\'administrateur' }); return; }

  webpush.setVapidDetails('https://moteau.vercel.app', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  const auth = `auth=${encodeURIComponent(idToken)}`;
  const subsRes = await fetch(`${DB_URL}/moteau/pushSubs.json?${auth}`);
  const subs = subsRes.ok ? (await subsRes.json() || {}) : {};
  const payload = JSON.stringify({
    title: String(title).slice(0, 80),
    body: String(body || '').slice(0, 200),
    url: typeof url === 'string' && url.startsWith('/') ? url : '/'
  });

  let sent = 0, removed = 0, failed = 0;
  await Promise.all(Object.entries(subs).map(async ([key, sub]) => {
    try{
      await webpush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload, { TTL: 60 * 60 * 24 * 3 });
      sent++;
    }catch(err){
      if(err.statusCode === 404 || err.statusCode === 410){
        // abonnement expiré (l'appareil a désactivé les notifications) : on le retire
        await fetch(`${DB_URL}/moteau/pushSubs/${encodeURIComponent(key)}.json?${auth}`, { method: 'DELETE' });
        removed++;
      } else failed++;
    }
  }));
  res.status(200).json({ sent, removed, failed, total: Object.keys(subs).length });
};
