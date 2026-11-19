/* Priority Title — prototype motion.
   Every "state" value below is taken from the Figma frames (file 6z3ldwHkiRRSwd1lwrPSWb, section "Concept").
   Coordinates are Figma px inside the 1424×784 inner frame. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const stage = $('#stage');

  /* ---------------- fit 1440×800 artboard to the viewport ---------------- */
  function fit() {
    const s = Math.min(innerWidth / 1440, innerHeight / 800);
    stage.style.transform = `translate(${-720 * s}px, ${-400 * s}px) scale(${s})`;
  }
  addEventListener('resize', fit);
  fit();

  const hashState = (location.hash.match(/state=([\w-]+)/) || [])[1];
  const E = 'power3.inOut';

  /* ---------------- content ---------------- */
  const TABS = [
    { label: 'Real estate agents', h3: 'Keep every transaction\nmoving with confidence',
      body: 'Get reliable title and escrow support from contract to closing. Our team keeps your clients’ transactions on track.',
      link: 'Explore services for agents', rows: ['Open title orders quickly', 'Access property data and reports', 'Get net sheets and closing estimates'], img: 0 },
    { label: 'Buyers & sellers', h3: 'Close on your next home\nwith total clarity',
      body: 'Clear guidance on title, escrow, and closing costs at every step. We confirm a clean title and keep your funds safe until closing.',
      link: 'Explore services for buyers & sellers', rows: ['Estimate costs with our mortgage calculator', 'Check your Prop 19 tax savings', 'Stay protected from wire fraud'], img: 1 },
    { label: 'Lenders', h3: 'Fund every loan with\nconfidence, on schedule',
      body: 'Accurate title work and secure escrow keep your loans compliant and your closings on time, from residential to commercial.',
      link: 'Explore services for lenders', rows: ['Open title orders online, 24/7', 'Residential and commercial coverage', 'Service in all 58 California counties'], img: 1, wide: true },
    { label: 'Brokers', h3: 'Support your whole\nbrokerage team at any scale',
      body: 'One title and escrow partner for every agent in your office, with local teams across California.',
      link: 'Explore services for brokers', rows: ['Local offices from San Diego to Sacramento', 'One team for residential and commercial files', 'Wire fraud protection on every transaction'], img: 3 },
  ];
  const SERVICES = [
    { h3: 'Title Insurance', body: 'Protect buyers and lenders from ownership issues that may surface after closing.', link: 'Explore Title Insurance' },
    { h3: 'Escrow & Closing', body: 'Coordinate funds, documents, and parties through a secure closing process.', link: 'Explore Escrow & Closing' },
    { h3: 'Residential Services', body: 'Title and escrow support for residential real estate transactions.', link: 'Explore Residential Services' },
    { h3: 'Commercial Services', body: 'Title expertise and transaction support for commercial properties.', link: 'Explore Commercial Services' },
  ];

  /* ---------------- elements ---------------- */
  const frame = $('#frame'), menu = $('#menu'), menuCta = $('#menuCta');
  const hero = $('#hero'), features = $('#features'), services = $('#services');
  const media = $('#heroMedia'), heroImg = $('#heroImg'), heroSmall = $('#heroSmall');
  const title = $('#heroTitle'), sub = $('#heroSub'), timeline = $('#heroTimeline');
  const stats = $('#heroStats'), statEls = $$('.stat', stats);
  const colLine = $('#heroColLine'), sep = $('#heroSep'), guides = $('#heroGuides'), btns = $('#heroBtns');
  const fiHead = $('#fiHead'), featArea = $('#featArea'), featTabs = $('#featTabs');
  const fgIntro = $('#fgIntro'), fgTabs = $('#fgTabs');
  const fms = $$('.fm'), tabs = $$('.tab');
  const svcItems = $$('.svc-item'), illus = $$('.svc-illu');

  /* ======================================================================
     INITIAL (pre-scroll) STATES
     ====================================================================== */
  gsap.set([features, services], { autoAlpha: 0 });
  gsap.set(heroSmall, { opacity: 0 });
  gsap.set('#heroSmallB2', { opacity: 0 });
  gsap.set(stats, { y: 447 + 225.5, opacity: 0 });
  gsap.set(statEls, { opacity: 0.4 });
  gsap.set($$('.cap', stats), { opacity: 0 });
  gsap.set('#tlDark', { opacity: 0 });
  menu.style.left = '0px';

  // Features intro state (528:4855)
  gsap.set(featArea, { top: 331, height: 670 });
  gsap.set($('.lbl-intro'), { opacity: 1 });
  gsap.set($('.lbl-tab'), { opacity: 0 });
  gsap.set($('.feat-label'), { height: 19 });
  gsap.set($('.h3-dot'), { opacity: 1 });
  gsap.set($('.feat-link'), { fontSize: 16, letterSpacing: '-0.32px' });
  gsap.set($('.feat-link .arrow'), { paddingTop: 0 });
  gsap.set($('.feat-link .arrow img'), { width: 13.7893, height: 13.7893 });
  gsap.set(featTabs, { width: 1264, bottom: 0 });
  gsap.set(fgTabs, { opacity: 0 });
  fms.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));
  illus.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));

  /* ======================================================================
     MASTER SCROLL TIMELINE  (1 unit of time = 1 viewport height of scroll)
     ====================================================================== */
  const tl = gsap.timeline({ paused: true, defaults: { ease: E, duration: 1 } });
  const HOLD = 0.55;
  const hold = (d = HOLD) => tl.to({}, { duration: d });

  // ---- Hero 1 (512:4618) ----
  tl.addLabel('hero-1'); hold(0.35);

  // ---- Hero 1 → 2 (595:6527): photo window narrows to 1079, timeline overlay leaves ----
  tl.addLabel('t-h2');
  tl.to(media, { width: 1079 }, 't-h2')
    .to(heroImg, { left: -200 }, 't-h2')
    .to(timeline, { opacity: 0, y: -12, duration: 0.5 }, 't-h2')
    .fromTo(colLine, { left: 1424, top: 48, height: 734, opacity: 0 }, { left: 1079, top: 48, height: 734, opacity: 1 }, 't-h2')
    .to(sep, { width: 1079 }, 't-h2')
    .to([btns, guides], { x: -5.11 }, 't-h2');
  tl.addLabel('hero-2'); hold();

  // ---- Hero 2 → 3 (612:6755): photo shrinks to 542×317 at 150,223; stats column rises ----
  tl.addLabel('t-h3');
  tl.to(media, { left: 150, top: 223, width: 542.275, height: 317 }, 't-h3')
    .to(heroImg, { left: -271.5, top: -72.646, width: 1085.285, height: 443.947 }, 't-h3')
    .to(sub, { opacity: 0, duration: 0.5 }, 't-h3')
    .to(sep, { opacity: 0, duration: 0.6 }, 't-h3')
    .to(colLine, { left: 709 }, 't-h3')
    .to(stats, { y: 447, opacity: 1 }, 't-h3');
  tl.addLabel('hero-3'); hold();

  // ---- Hero 3 → 4 (595:6669): photo lands bottom-left 399×242, H1 centres, "7 Regions" highlighted ----
  tl.addLabel('t-h4');
  tl.to(frame, { top: 8, height: 784 }, 't-h4')
    .to(hero, { y: 1 }, 't-h4') // Figma 784-tall states inset content by 1px
    .to(menu, { left: 1, top: 1 }, 't-h4')
    .to(media, { left: 1, top: 541, width: 399, height: 242 }, 't-h4')
    .to(heroImg, { left: -110, top: -45, width: 620, height: 254 }, 't-h4')
    .to(heroSmall, { opacity: 1, duration: 0.45, ease: 'power1.inOut' }, 't-h4+=0.45')
    .to(title, { left: 41, top: 303.5 }, 't-h4')
    .to(colLine, { left: 711, height: 735 }, 't-h4')
    .to([btns, guides], { x: 0 }, 't-h4')
    .to(guides, { y: -2 }, 't-h4')
    .to(stats, { y: 227 }, 't-h4')
    .to(statEls[0], { opacity: 1 }, 't-h4')
    .to($('.cap', statEls[0]), { opacity: 1 }, 't-h4+=0.3');
  tl.addLabel('hero-4'); hold();

  // ---- Hero 4 → 5 (528:4762 / 612:6831): stats scroll, "58 Years" highlighted ----
  tl.addLabel('t-h5');
  tl.to(media, { left: 3 }, 't-h5')
    .to('#heroSmallB2', { opacity: 1 }, 't-h5')
    .to(stats, { y: 0 }, 't-h5')
    .to(statEls[0], { opacity: 0.4 }, 't-h5')
    .to($('.cap', statEls[0]), { opacity: 0, duration: 0.5 }, 't-h5')
    .to(statEls[1], { opacity: 1 }, 't-h5')
    .to($('.cap', statEls[1]), { opacity: 1, duration: 0.6 }, 't-h5+=0.4');
  tl.addLabel('hero-5'); hold(0.8);

  // ---- Hero → Features intro (528:4855) ----
  tl.addLabel('t-f0');
  tl.to(stats, { y: -340, opacity: 0, duration: 0.8, ease: 'power2.in' }, 't-f0')
    .to(title, { y: -120, opacity: 0, duration: 0.7, ease: 'power2.in' }, 't-f0')
    .to(media, { top: 783, height: 0, duration: 0.7, ease: 'power2.in' }, 't-f0')
    .to(heroImg, { top: -300, duration: 0.7, ease: 'power2.in' }, 't-f0')
    .to(btns, { y: 82, duration: 0.6, ease: 'power2.in' }, 't-f0')
    .to(guides, { opacity: 0, duration: 0.4 }, 't-f0')
    .to(colLine, { scaleY: 0, transformOrigin: '50% 0%', duration: 0.7, ease: 'power2.in' }, 't-f0')
    .set(hero, { autoAlpha: 0 }, 't-f0+=0.8')
    .to(menu, { left: 0, top: 0, width: 1424, duration: 0.6 }, 't-f0')
    .to(menuCta, { backgroundColor: '#bf5e2a', color: '#f6f6ef', duration: 0.5 }, 't-f0+=0.3')
    .set(features, { autoAlpha: 1 }, 't-f0+=0.45')
    .from(fiHead.querySelectorAll('.line-inner'), { yPercent: 105, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, 't-f0+=0.6')
    .from($$('.fi-eyebrow, .fi-lead', fiHead), { opacity: 0, y: 14, duration: 0.5, ease: 'power2.out' }, 't-f0+=0.7')
    .from(featArea, { y: 470, duration: 0.8, ease: 'power3.out' }, 't-f0+=0.5')
    .from(featTabs, { y: 82, duration: 0.6, ease: 'power3.out' }, 't-f0+=0.65')
    .from(fgIntro.children, { scaleY: 0, transformOrigin: '50% 0%', stagger: 0.05, duration: 0.7, ease: 'power2.out' }, 't-f0+=0.55');
  tl.addLabel('feat-intro'); hold(0.7);

  // ---- Features intro → Tab 1 (532:5127) ----
  tl.addLabel('t-f1');
  tl.to(fiHead, { y: -90, opacity: 0, duration: 0.6, ease: 'power2.in' }, 't-f1')
    .to(featArea, { top: 90, height: 694 }, 't-f1')
    .to($('.lbl-intro'), { opacity: 0, duration: 0.4 }, 't-f1+=0.2')
    .to($('.lbl-tab'), { opacity: 1, duration: 0.4 }, 't-f1+=0.5')
    .to($('.feat-label'), { height: 17 }, 't-f1')
    .to($('.h3-dot'), { opacity: 0, duration: 0.3 }, 't-f1+=0.3')
    .to($('.feat-link'), { fontSize: 20, letterSpacing: '-0.4px' }, 't-f1')
    .to($('.feat-link .arrow'), { paddingTop: 2 }, 't-f1')
    .to($('.feat-link .arrow img'), { width: 20.504, height: 20.504 }, 't-f1')
    .to(featTabs, { width: 1263, bottom: 1 }, 't-f1')
    .to(fgIntro, { opacity: 0, duration: 0.5 }, 't-f1')
    .to(fgTabs, { opacity: 1, duration: 0.5 }, 't-f1+=0.5');
  tl.addLabel('feat-1'); hold(0.9);
  // tabs 2–4 are discrete steps (see TABS below) — each gets scroll room
  tl.addLabel('feat-2'); hold(0.9);
  tl.addLabel('feat-3'); hold(0.9);
  tl.addLabel('feat-4'); hold(0.9);

  // ---- Features → Services (538:5633) ----
  tl.addLabel('t-s1');
  tl.to(featArea, { y: -60, opacity: 0, duration: 0.6, ease: 'power2.in' }, 't-s1')
    .to(featTabs, { y: 82, duration: 0.6, ease: 'power2.in' }, 't-s1')
    .to([fgIntro, fgTabs], { opacity: 0, duration: 0.4 }, 't-s1')
    .set(features, { autoAlpha: 0 }, 't-s1+=0.6')
    .to(menu, { left: 1, width: 1423, duration: 0.6 }, 't-s1')
    .set(services, { autoAlpha: 1 }, 't-s1+=0.3')
    .from($$('.svc-col1, .svc-col2, .svc-col3', services), { opacity: 0, duration: 0.4, stagger: 0.06 }, 't-s1+=0.3')
    .from($$('#svcH2 .line-inner'), { yPercent: 105, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, 't-s1+=0.35')
    .from(svcItems, { xPercent: -101, stagger: 0.07, duration: 0.6, ease: 'power3.out' }, 't-s1+=0.4')
    .from($$('.plat-map > *', illus[0]), { opacity: 0, stagger: 0.015, duration: 0.4 }, 't-s1+=0.35')
    .from($$('[data-layer="parcel"], [data-layer="survey-stakes"], [data-layer="dimension"]', illus[0]), { opacity: 0, y: -24, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, 't-s1+=0.6')
    .from($('#svcCopy'), { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' }, 't-s1+=0.45');
  tl.addLabel('svc-1'); hold(0.9);
  tl.addLabel('svc-2'); hold(0.9);
  tl.addLabel('svc-3'); hold(0.9);
  tl.addLabel('svc-4'); hold(0.6);

  const L = tl.labels;
  const TOTAL = tl.duration();

  /* ======================================================================
     DISCRETE STEPS (tabs + services) — time-based transitions, scroll-triggered
     ====================================================================== */
  const fText = k => $(`[data-f="${k}"]`, featArea);
  let curTab = 0, tabTl = null, svcTl = null;
  function setTab(i, instant) {
    if (i === curTab && !instant) return;
    const d = TABS[i], prevImg = TABS[curTab].img;
    curTab = i;
    tabs.forEach((t, k) => t.classList.toggle('is-active', k === i));
    const swap = [fText('label'), fText('h3'), fText('body'), fText('link'), fText('r0'), fText('r1'), fText('r2')];
    const apply = () => {
      fText('label').textContent = d.label;
      fText('h3').textContent = d.h3;
      fText('body').textContent = d.body;
      fText('body').classList.toggle('is-wide', !!d.wide);
      fText('link').textContent = d.link;
      d.rows.forEach((r, k) => (fText('r' + k).textContent = r));
    };
    if (tabTl) tabTl.kill();
    gsap.killTweensOf(swap);
    if (instant) { apply(); gsap.set(swap, { opacity: 1, y: 0 }); }
    else {
      tabTl = gsap.timeline()
        .to(swap, { opacity: 0, y: -10, duration: 0.22, stagger: 0.02, ease: 'power2.in' })
        .add(apply)
        .fromTo(swap, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out' });
    }
    // image
    fms.forEach(el => {
      const k = +el.dataset.img, on = k === d.img;
      gsap.killTweensOf(el);
      if (instant) { gsap.set(el, { autoAlpha: on ? 1 : 0, clipPath: 'inset(0% 0% 0% 0%)' }); return; }
      if (on && k !== prevImg) {
        gsap.set(el, { zIndex: 2, autoAlpha: 1 });
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.inOut' });
        gsap.fromTo(el.querySelectorAll('img'), { scale: 1.08 }, { scale: 1, duration: 1.2, ease: 'power3.out' });
      } else if (!on) {
        gsap.set(el, { zIndex: 1 });
        gsap.to(el, { autoAlpha: 0, duration: 0.01, delay: k === prevImg ? 0.9 : 0 });
      }
    });
  }

  let curSvc = 0;
  const LAYERS_NEW = { 1: ['parcel-foundation'], 2: ['house', 'tree'], 3: ['building'] };
  function setSvc(i, instant) {
    if (i === curSvc && !instant) return;
    const d = SERVICES[i], prev = curSvc;
    curSvc = i;
    svcItems.forEach((t, k) => t.classList.toggle('is-active', k === i));
    $('#svcList').classList.toggle('has-top', i > 0);
    const copy = $$('[data-s]', services);
    const apply = () => { copy.forEach(el => (el.textContent = d[el.dataset.s])); };
    if (svcTl) svcTl.kill();
    gsap.killTweensOf(copy);
    if (instant) { apply(); gsap.set(copy, { opacity: 1, y: 0 }); }
    else {
      svcTl = gsap.timeline()
        .to(copy, { opacity: 0, y: -10, duration: 0.22, stagger: 0.03, ease: 'power2.in' })
        .add(apply)
        .fromTo(copy, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' });
    }
    illus.forEach((el, k) => {
      gsap.killTweensOf(el);
      if (instant || k !== i) { gsap.set(el, { autoAlpha: k === i ? 1 : 0 }); return; }
    });
    if (instant) return;
    const el = illus[i];
    gsap.set(el, { autoAlpha: 1 });
    const canvas = $('.svc-illu__canvas', el);
    if (i === 3 && prev === 2) {
      // whole scene slides (dx −50.21, dy +64.75 in Figma), then the commercial building rises
      gsap.fromTo(canvas, { x: 50.21, y: -64.75 }, { x: 0, y: 0, duration: 0.9, ease: 'power3.inOut' });
    } else if (i === 2 && prev === 3) {
      gsap.fromTo(canvas, { x: -50.21, y: 64.75 }, { x: 0, y: 0, duration: 0.9, ease: 'power3.inOut' });
    } else gsap.set(canvas, { x: 0, y: 0 });
    const fresh = i > prev ? (LAYERS_NEW[i] || []) : [];
    if (i < prev || !fresh.length) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power1.out' });
    }
    fresh.forEach((name, n) => {
      const g = $(`[data-layer="${name}"]`, el);
      if (!g) return;
      const parts = g.children.length > 1 ? [...g.children] : [g];
      gsap.fromTo(parts, { opacity: 0, y: -36 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, delay: 0.25 + n * 0.25, ease: 'power3.out' });
    });
  }

  const tabAt = t => t < L['feat-2'] - 0.3 ? 0 : t < L['feat-3'] - 0.3 ? 1 : t < L['feat-4'] - 0.3 ? 2 : 3;
  const svcAt = t => t < L['svc-2'] - 0.3 ? 0 : t < L['svc-3'] - 0.3 ? 1 : t < L['svc-4'] - 0.3 ? 2 : 3;
  function syncDiscrete(t) { setTab(tabAt(t)); setSvc(svcAt(t)); }

  /* ======================================================================
     SCROLL → TIMELINE (smoothed)
     ====================================================================== */
  const scroller = $('#scroll');
  const unitPx = () => innerHeight * 0.9;
  function setHeight() { scroller.style.height = `${TOTAL * unitPx() + innerHeight}px`; }
  let target = 0, current = 0, running = false;
  function onScroll() { target = Math.min(TOTAL, Math.max(0, scrollY / unitPx())); if (!running) { running = true; requestAnimationFrame(tick); } }
  function tick() {
    current += (target - current) * 0.11;
    if (Math.abs(target - current) < 0.0005) current = target;
    tl.time(current);
    syncDiscrete(current);
    if (current !== target) requestAnimationFrame(tick); else running = false;
  }
  function scrollToLabel(name) { scrollTo({ top: L[name] * unitPx() + 2, behavior: 'smooth' }); }

  tabs.forEach((t, k) => t.addEventListener('click', () => scrollToLabel('feat-' + (k + 1))));
  svcItems.forEach((t, k) => t.addEventListener('click', () => scrollToLabel('svc-' + (k + 1))));
  $$('.menu-cell[href="#services"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); scrollToLabel('svc-1'); }));
  $$('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));
  addEventListener('keydown', e => {
    const names = ['hero-1', 'hero-2', 'hero-3', 'hero-4', 'hero-5', 'feat-intro', 'feat-1', 'feat-2', 'feat-3', 'feat-4', 'svc-1', 'svc-2', 'svc-3', 'svc-4'];
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(e.key)) return;
    e.preventDefault();
    const dir = (e.key === 'ArrowUp' || e.key === 'PageUp') ? -1 : 1;
    let idx = names.findIndex(n => L[n] > target + 0.05);
    if (idx === -1) idx = names.length;
    const next = dir > 0 ? names[Math.min(idx, names.length - 1)] : names[Math.max(0, idx - 2)];
    scrollToLabel(next);
  });

  function startScroll() {
    root.classList.remove('is-loading');
    setHeight();
    addEventListener('resize', setHeight);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ======================================================================
     LOADER  (485:4400 → 501:4439 → 501:4479 → 501:4508 → 562:6444 → hero 512:4618)
     ====================================================================== */
  const win = $('#ldWin'), inner = $('#ldInner');
  const ldT = $('#ldT'), ldB = $('#ldB'), ldLn = $('#ldL'), ldR = $('#ldR');
  const R = { x: 0, y: 0, w: 1440, h: 800 };
  function drawRect() {
    gsap.set(win, { left: R.x, top: R.y, width: R.w, height: R.h });
    gsap.set(inner, { x: -R.x, y: -R.y });
    gsap.set(ldT, { top: R.y }); gsap.set(ldB, { top: R.y + R.h - 1 });
    gsap.set(ldLn, { left: R.x - 1 }); gsap.set(ldR, { left: R.x + R.w - 1 });
  }

  // Hero "skeleton" (Loader -> Hero 562:6444): everything but the grid is invisible
  const menuTexts = $$('.menu-cell > span, .menu-logo img', menu);
  const btnAccent = $('.btn-accent', btns);
  const btnTexts = $$('.btn > *', btns);
  const vline = $('#heroVLine');
  function skeleton() {
    gsap.set(menuTexts, { opacity: 0 });
    gsap.set(media, { clipPath: 'inset(0% 0% 100% 0%)' });
    gsap.set('#tlDark', { opacity: 1 }); gsap.set('#tlLight', { opacity: 0 });
    gsap.set($$('.row p', timeline), { opacity: 0 });
    gsap.set([title, sub, $('#scrollHint')], { opacity: 0 });
    gsap.set(btnAccent, { backgroundColor: 'rgba(191,94,42,0)', boxShadow: 'inset 1px 1px 0 #000, inset -1px 0 0 #000' });
    gsap.set(btnTexts, { opacity: 0 });
    gsap.set(vline, { height: 655 });
    gsap.set($('.frame-stroke'), { opacity: 0 });
  }

  function heroIntro() {
    return gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to($('.frame-stroke'), { opacity: 1, duration: 0.4 }, 0)
      .to(vline, { height: 28, duration: 0.9, ease: 'power3.inOut' }, 0)
      .to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' }, 0.05)
      .fromTo(heroImg, { scale: 1.12 }, { scale: 1, duration: 1.6 }, 0.05)
      .to('#tlDark', { opacity: 0, duration: 0.5 }, 0.5)
      .to('#tlLight', { opacity: 1, duration: 0.5 }, 0.5)
      .fromTo($$('.row p', timeline), { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6 }, 0.75)
      .fromTo(menuTexts, { opacity: 0, y: 6 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.5 }, 0.35)
      .to(btnAccent, { backgroundColor: 'rgba(191,94,42,1)', boxShadow: 'inset 0 0 0 #000, inset 0 0 0 #000', duration: 0.6, ease: 'power2.inOut' }, 0.6)
      .fromTo(btnTexts, { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }, 0.85)
      .fromTo(title, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9 }, 0.7)
      .fromTo(sub, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
      .to($('#scrollHint'), { opacity: 0.2, duration: 0.6 }, 1.2)
      .add(() => { gsap.set([btnAccent], { clearProps: 'boxShadow' }); gsap.set(heroImg, { clearProps: 'transform' }); });
  }

  function runLoader() {
    skeleton();
    drawRect();
    const lines = [ldT, ldB, ldLn, ldR];
    const ld = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onUpdate: drawRect });
    // 1 · 485:4400 — grey outlined P on the perspective guides
    ld.fromTo('#ldPGrey', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 0)
      .fromTo('.ld-guides', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0)
      .fromTo('#ldPOrange', { opacity: 0 }, { opacity: 0, duration: 0.01 }, 0)
    // 2 · 501:4439 — P turns orange, frame lines arrive at the 55/54 inset
      .to('#ldPOrange', { opacity: 1, duration: 0.35, ease: 'power1.inOut' }, 0.75)
      .set(lines, { opacity: 1 }, 0.75)
      .to(R, { x: 55, y: 54, w: 1332, h: 692, duration: 0.55 }, 0.75)
    // 3 · 501:4479 — window closes tight around the logo
      .to(R, { x: 477, y: 274, w: 483, h: 245, duration: 0.6 }, 1.4)
    // 4 · 501:4508 — logo & guides go, window opens onto the hero skeleton
      .to(['#ldPGrey', '#ldPOrange', '.ld-guides'], { opacity: 0, duration: 0.25, ease: 'power1.in' }, 2.1)
      .set(win, { backgroundColor: 'rgba(246,246,239,0)' }, 2.35)
      .to(R, { x: 123, y: 93, w: 1190, h: 616, duration: 0.6 }, 2.2)
    // 5 · 562:6444 — window = frame (8,10 1424×782)
      .to(R, { x: 8, y: 10, w: 1424, h: 782, duration: 0.5 }, 2.85)
      .to(lines, { opacity: 0, duration: 0.3 }, 3.3)
      .add(() => { $('#loader').style.display = 'none'; }, 3.6)
      .add(() => { heroIntro().eventCallback('onComplete', startScroll); }, 3.35);
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  const ready = document.fonts ? document.fonts.ready : Promise.resolve();
  const imgs = ['assets/hero/hero-photo-full.png', 'assets/loader/letter-p-grey.svg', 'assets/loader/letter-p-orange.svg', 'assets/loader/guides-perspective.svg']
    .map(src => new Promise(res => { const i = new Image(); i.onload = i.onerror = res; i.src = src; }));

  if (hashState) {
    // review mode: #state=<label> renders that Figma state instantly (no loader)
    $('#loader').style.display = 'none';
    root.classList.remove('is-loading');
    const lab = hashState === 'static' ? 'hero-1' : hashState;
    if (lab === 'loader-hero') { skeleton(); gsap.set($('.frame-stroke'), { opacity: 1 }); }
    const t = L[lab] !== undefined ? L[lab] : 0;
    tl.time(t);
    curTab = tabAt(t); curSvc = svcAt(t); setTab(curTab, true); setSvc(curSvc, true);
    if (hashState !== 'static' && hashState !== 'loader-hero') { // allow scrolling from here
      setHeight(); addEventListener('resize', setHeight);
      scrollTo(0, t * unitPx()); target = current = t;
      addEventListener('scroll', onScroll, { passive: true });
    }
  } else {
    scrollTo(0, 0);
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    Promise.all([ready, ...imgs]).then(() => setTimeout(runLoader, 150));
  }
})();
