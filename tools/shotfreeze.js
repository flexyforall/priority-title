// node tools/shotfreeze.js <hash> <out.png> — screenshot with all running GSAP animations frozen; progress fill pinned to 419 (Figma frame 638:29573)
const { chromium } = require('playwright');
(async () => {
  const [hash, out] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 800 } });
  await p.goto('http://127.0.0.1:8765/index.html#' + hash); await p.waitForTimeout(900);
  await p.evaluate(() => { gsap.globalTimeline.pause(); const f = document.getElementById('tlFill'); f.style.transform = 'scaleX(' + 419 / 1424 + ')'; f.style.opacity = 1;
    document.getElementById('tlLight').style.opacity = 1; document.querySelectorAll('#heroTimeline .row p').forEach(e => e.style.opacity = 1); });
  await p.waitForTimeout(100);
  await p.screenshot({ path: out }); await b.close();
})();
