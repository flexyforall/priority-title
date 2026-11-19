// Records the page load as video (tools for checking loader smoothness). node tools/ldvideo.js <outdir> [ms]
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2], ms = +(process.argv[3] || 7000);
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 800 }, recordVideo: { dir: out, size: { width: 1440, height: 800 } } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://127.0.0.1:8765/index.html');
  await p.waitForTimeout(ms);
  await ctx.close(); await b.close();
  console.log('errors', errs);
})();
