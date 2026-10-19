// Régénère images/og.jpg (image de partage 1200×630) à partir de tools/og.html.
// Prérequis : serveur local (cd lt-digital && python3 -m http.server 8123) et Playwright.
const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.goto('http://127.0.0.1:8123/tools/og.html', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(__dirname, '..', 'images', 'og.jpg'), type: 'jpeg', quality: 88 }); await b.close(); console.log('images/og.jpg OK'); })();
