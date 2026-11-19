// Captures loader frames over time, then scroll positions. node tools/frames.js <outdir>
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 800 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://127.0.0.1:8765/index.html');
  const t0 = Date.now();
  for (const t of [200, 700, 1100, 1600, 2000, 2500, 2900, 3300, 3700, 4200, 5200]) {
    await p.waitForTimeout(Math.max(0, t - (Date.now() - t0)));
    await p.screenshot({ path: `${out}/ld-${String(t).padStart(5, '0')}.png` });
  }
  await p.waitForTimeout(1500);
  const vh = 800 * 0.9;
  for (const u of [0.6, 1.9, 3.1, 4.4, 5.9, 6.7, 8.2, 11.2, 12.2, 13.4]) {
    await p.evaluate(y => window.scrollTo(0, y), u * vh);
    await p.waitForTimeout(1600);
    await p.screenshot({ path: `${out}/sc-${String(u).padStart(4, '0')}.png` });
  }
  console.log('errors:', errs);
  await b.close();
})();
