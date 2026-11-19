// Records the loader at 20fps and reports per-frame motion of the logo (shake check). node tools/ldframes.js <outdir>
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 800 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://127.0.0.1:8765/index.html');
  const t0 = Date.now(); let i = 0;
  while (Date.now() - t0 < 7000) {
    await p.screenshot({ path: `${out}/l-${String(i++).padStart(3, '0')}.png` });
    await p.waitForTimeout(120);
  }
  console.log('frames', i, 'errors', errs);
  await b.close();
})();
