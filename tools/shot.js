// Usage: node tools/shot.js <out.png> [scrollStep] [extraWaitMs]
// Renders the prototype at the Figma artboard size (1440x800, DPR 1).
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || 'shot.png';
  const step = process.argv[3];
  const wait = +(process.argv[4] || 300);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 800 }, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
  page.on('pageerror', e => console.log('pageerror:', e.message));
  const url = 'http://127.0.0.1:8765/index.html' + (step !== undefined ? `#state=${step}` : '#state=static');
  const u2 = process.env.HASH ? url.split('#')[0] + '#' + process.env.HASH : url;
  await page.goto(u2);
  await page.waitForTimeout(wait);
  await page.screenshot({ path: out });
  await browser.close();
})();
