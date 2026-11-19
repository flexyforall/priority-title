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
  const url = 'file://' + path.resolve(__dirname, '../index.html') + (step !== undefined ? `#state=${step}` : '#state=static');
  await page.goto(url);
  await page.waitForTimeout(wait);
  await page.screenshot({ path: out });
  await browser.close();
})();
