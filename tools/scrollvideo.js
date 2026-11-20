// Records a smooth scroll from one state to another. node tools/scrollvideo.js <outdir> <fromUnits> <toUnits> <ms>
const { chromium } = require('playwright');
(async () => {
  const [out, from, to, ms] = [process.argv[2], +process.argv[3], +process.argv[4], +(process.argv[5] || 6000)];
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 800 }, recordVideo: { dir: out, size: { width: 1440, height: 800 } } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:8765/index.html#state=hero-1'); await p.waitForTimeout(800);
  const vh = 800 * 0.9;
  await p.evaluate(async ([a, z, d, vh]) => {
    const t0 = performance.now();
    await new Promise(res => { (function f() { const k = Math.min(1, (performance.now() - t0) / d); scrollTo(0, (a + (z - a) * k) * vh); k < 1 ? requestAnimationFrame(f) : res(); })(); });
  }, [from, to, ms, vh]);
  await p.waitForTimeout(1200);
  await ctx.close(); await b.close();
})();
