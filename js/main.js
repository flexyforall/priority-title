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
    { label: 'Real estate agents', h3: 'Keep every transaction\nmoving with confidence.',
      body: 'Get reliable title and escrow support from contract to closing. Our team keeps your clients’ transactions on track.',
      link: 'Explore services for agents', rows: ['Open title orders quickly', 'Access property data and reports', 'Get net sheets and closing estimates'], img: 0 },
    { label: 'Buyers & sellers', h3: 'Close on your next home\nwith total clarity.',
      body: 'Clear guidance on title, escrow, and closing costs at every step. We confirm a clean title and keep your funds safe until closing.',
      link: 'Explore services for buyers & sellers', rows: ['Estimate costs with our mortgage calculator', 'Check your Prop 19 tax savings', 'Stay protected from wire fraud'], img: 1 },
    { label: 'Lenders', h3: 'Fund every loan with\nconfidence, on schedule.',
      body: 'Accurate title work and secure escrow keep your loans compliant and your closings on time, from residential to commercial.',
      link: 'Explore services for lenders', rows: ['Open title orders online, 24/7', 'Residential and commercial coverage', 'Service in all 58 California counties'], img: 2 },
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
  const media = $('#heroMedia'), heroImg = $('#heroImg');
  const title = $('#heroTitle'), sub = $('#heroSub'), timeline = $('#heroTimeline');
  const stats = $('#heroStats'), statEls = $$('.stat', stats);
  const colLine = $('#heroColLine'), sep = $('#heroSep'), guides = $('#heroGuides'), btns = $('#heroBtns');
  const fiHead = $('#fiHead'), fSec = $('#fSec'), featTabs = $('#featTabs'), fWin = $('#fWin');
  const fLineL = $('#fLineL'), fLineR = $('#fLineR'), fGuides = $$('.f-guide'), fTicks = $('#fTicks');
  const fms = $$('.fm'), tabs = $$('.tab'), tabFills = $$('.tab-fill'), tabTexts = $$('.tab-t');
  const menuLogo = $('.menu-logo'), ctaMark = $('.mark', menuCta);

  const menuTexts = $$('.menu-cell > span, .menu-logo img', menu);
  const btnAccent = $('.btn-accent', btns);
  const btnTexts = $$('.btn > *', btns);
  const vline = $('#heroVLine');
  // masked line reveal helpers (reference: text slides up line by line inside a mask)
  function maskify(el) {
    if (el.querySelector('.line-mask')) return;
    el.innerHTML = `<span class="line-mask"><span class="line-inner">${el.innerHTML}</span></span>`;
  }
  const revealTexts = [...menuTexts.filter(e => e.tagName !== 'IMG'), ...btnTexts.filter(e => !e.classList.contains('arrow')), $('#scrollHint > span')];
  revealTexts.forEach(maskify);
  const inners = el => $$('.line-inner', el);

  // hover: the whole label slides up out of its mask and a copy slides in from below —
  // the same masked line motion the headings use when they load (kerning stays intact)
  function rollify(el) {
    if (!el || el.dataset.roll) return;
    const host = el.querySelector('.line-inner') || el;
    const html = host.innerHTML;
    host.setAttribute('aria-label', host.textContent);
    host.innerHTML = `<span class="rl" aria-hidden="true"><span>${html}</span><span>${html}</span></span>`;
    el.dataset.roll = '1';
  }
  // labels that carry the hover strip are updated through this (both copies + aria-label)
  function setLabel(el, text) {
    if (!el.dataset.roll) { el.textContent = text; return; }
    el.setAttribute('aria-label', text);
    $$('.rl > span', el).forEach(sp => (sp.textContent = text));
  }
  [...$$('.link-accent [data-f="link"], .link-accent [data-s="link"]')].forEach(rollify);
  [...$$('.menu-cell > span', menu), ...$$('.btn > .t-btn-l', btns), ...$$('.tab-t'), ...$$('.svc-t')].forEach(rollify);
  const svcItems = $$('.svc-item'), svcFills = $$('.svc-fill'), illus = $$('.svc-illu');

  /* ======================================================================
     INITIAL (pre-scroll) STATES
     ====================================================================== */
  gsap.set([features, services], { autoAlpha: 0 });
  gsap.set(stats, { y: 447 + 225.5, opacity: 0 });
  gsap.set(statEls, { opacity: 0.4 });
  gsap.set(colLine, { opacity: 0 });
  gsap.set($$('.cap', stats), { opacity: 0 });
  gsap.set('#tlDark', { opacity: 0 });

  // Features v2 — everything starts hidden below / closed at the centre line
  gsap.set(fiHead, { y: 700 });
  gsap.set([fSec, fTicks], { y: 800 });
  gsap.set(fTicks, { opacity: 0 });
  gsap.set(fGuides, { scaleY: 0, transformOrigin: '50% 0%' });
  gsap.set(featTabs, { autoAlpha: 0, left: 709, width: 715, '--tb': 'rgba(0,0,0,0.16)', '--tbi': 'rgba(0,0,0,0)' });
  gsap.set(tabs, { width: (i) => [357.5, 119.17, 119.17, 119.16][i] });
  gsap.set(tabTexts, { opacity: 0 });
  gsap.set(tabFills, { scaleX: 0 });
  fms.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));
  illus.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));

  /* ======================================================================
     MASTER SCROLL TIMELINE  (1 unit of time = 1 viewport height of scroll)
     ====================================================================== */
  const tl = gsap.timeline({ paused: true, defaults: { ease: E, duration: 1 } });
  const HOLD = 0.55;
  const hold = (d = HOLD) => tl.to({}, { duration: d });

  // Values: partials/hero-metrics-v2-notes.md ("Hero Metrics" 595:6527 → 612:6755 → 595:6669 → 528:4762 → 612:6831).
  // Coordinates are inner-frame px. Coconat renders ~1px higher in Chrome than in Figma → +1 on H1/stats (see README).
  const STAT_Y = { B: 447 + 1, C: 228 + 1, D: 0 + 1, E: -226 + 1 };
  const capOf = i => $('.cap', statEls[i]);

  // ---- REST (638:29573) ----
  tl.addLabel('hero-1'); hold(0.35);

  // ---- REST → A (595:6527): the hero slides left — photo window narrows to 1082, a column line follows its edge
  //      and stops on the button top (y 703); progress overlay and scroll guides fade out ----
  tl.addLabel('t-h2');
  tl.to(media, { width: 1082 }, 't-h2')
    .to(heroImg, { left: -172 }, 't-h2')
    .to(timeline, { opacity: 0, duration: 0.45, ease: 'power1.out' }, 't-h2')
    .to(guides, { opacity: 0, duration: 0.45, ease: 'power1.out' }, 't-h2')
    .fromTo(colLine, { left: 1424, top: 47, height: 656, opacity: 0 }, { left: 1081, top: 47, height: 656, opacity: 1 }, 't-h2');
  tl.addLabel('hero-2'); hold();

  // ---- A → B (612:6755): photo shrinks to 542×317 at 150,223; stats column rises, subtitle fades ----
  tl.addLabel('t-h3');
  tl.to(media, { left: 150, top: 223, width: 542.275, height: 317 }, 't-h3')
    .to(heroImg, { left: -251.692, top: -101.264, width: 1045.665, height: 464.495 }, 't-h3')
    .to(sub, { opacity: 0, duration: 0.5 }, 't-h3')
    .to(colLine, { left: 709, top: 48 }, 't-h3')
    // the line only grows past the buttons once it is left of them (x < 712) — never shows through "Find a location"
    .to(colLine, { height: 734, duration: 0.1, ease: 'none' }, 't-h3+=0.9')
    .to(stats, { y: STAT_Y.B, opacity: 1 }, 't-h3')
    .fromTo(statEls, { opacity: 0.4 }, { opacity: (i) => [0.3, 0.4, 0.4][i] }, 't-h3');
  tl.addLabel('hero-3'); hold();

  // ---- B → C (595:6669): ONE photo glides to the bottom-left corner above the H1 (a pure ×0.7598 scale),
  //      H1 centres, "7 Regions" highlighted ----
  tl.addLabel('t-h4');
  tl.to(frame, { top: 8, height: 784 }, 't-h4')
    .to(media, { left: 0, top: 543.156, width: 412, height: 240.844 }, 't-h4')
    .to(heroImg, { left: -191.225, top: -76.936, width: 794.452, height: 352.903 }, 't-h4')
    .to(title, { left: 40, top: 304.5 + 1 }, 't-h4')
    .to(colLine, { left: 709, top: 49, height: 735 }, 't-h4')
    .to(stats, { y: STAT_Y.C, x: 1 }, 't-h4')
    .to(statEls[0], { opacity: 1 }, 't-h4')
    .to(statEls[1], { opacity: 0.3 }, 't-h4')
    .to(capOf(0), { opacity: 1, duration: 0.6 }, 't-h4+=0.4');
  tl.addLabel('hero-4'); hold();

  // ---- C → D (528:4762): stats scroll, "58 Years" highlighted ----
  tl.addLabel('t-h5');
  tl.to(media, { left: 1, top: 542.156 }, 't-h5')
    .to(title, { left: 41, top: 303.5 + 1 }, 't-h5')
    .to(colLine, { left: 709, top: 48 }, 't-h5') // same x as the buttons' left edge
    .to(stats, { y: STAT_Y.D, x: 0 }, 't-h5')
    .to(statEls[0], { opacity: 0.3 }, 't-h5')
    .to(capOf(0), { opacity: 0, duration: 0.45 }, 't-h5')
    .to(statEls[1], { opacity: 1 }, 't-h5')
    .to(statEls[2], { opacity: 0.3 }, 't-h5')
    .to(capOf(1), { opacity: 1, duration: 0.6 }, 't-h5+=0.4');
  tl.addLabel('hero-5'); hold();

  // ---- D → E (612:6831): "12,000+" gets its own step and lands in the middle slot (no longer cut off) ----
  tl.addLabel('t-h6');
  tl.to(stats, { y: STAT_Y.E }, 't-h6')
    .to(statEls[1], { opacity: 0.3 }, 't-h6')
    .to(capOf(1), { opacity: 0, duration: 0.45 }, 't-h6')
    .to(statEls[2], { opacity: 1 }, 't-h6')
    .to(capOf(2), { opacity: 1, duration: 0.6 }, 't-h6+=0.4');
  tl.addLabel('hero-6'); hold(0.8);

  // ---- hero-6 → Features intro: ONE continuous, scroll-like move (no stops between the storyboard frames) ----
  // Storyboard 677:37473 (F1) → 677:37552 (F2) → 677:37577 (F3) → 677:37602 (F4). The tweens overlap so the motion never
  // comes to rest in between; vertical rises are linear (they feel like the page itself scrolling up).
  const ink = 'rgba(0,0,0,0.16)';
  const SPLIT = 2.0;                       // lines: centre (709) → card edges (155 / 1267)
  tl.addLabel('t-f0');
  tl.set(features, { autoAlpha: 1 }, 't-f0')
    .set(colLine, { opacity: 0 }, 't-f0')
    .to(fLineL, { left: 155, ease: 'power2.inOut', duration: SPLIT }, 't-f0')
    .to(fLineL, { top: 49, height: 655, ease: 'none', duration: 0.4 }, 't-f0+=1.2')
    .to(fLineR, { left: 1267, ease: 'power2.inOut', duration: SPLIT }, 't-f0')
    .to(fWin, { clipPath: 'inset(0px 156px 0px 155px)', ease: 'power2.inOut', duration: SPLIT }, 't-f0')
    // the two hero halves travel with their lines (left: H1 + photo, right: stats)
    .to([title, media], { x: 155 - 709, ease: 'power2.inOut', duration: SPLIT }, 't-f0')
    .to(stats, { x: 1267 - 709, ease: 'power2.inOut', duration: SPLIT }, 't-f0')
    .to(title, { top: 304 + 1, ease: 'power1.inOut', duration: 0.9 }, 't-f0')
    .to(media, { left: -39, top: 592, width: 328.445, height: 192, ease: 'power1.inOut', duration: 0.9 }, 't-f0')
    .to(heroImg, { left: -152.445, top: -61.333, width: 633.334, height: 281.334, ease: 'power1.inOut', duration: 0.9 }, 't-f0')
    .to(stats, { y: STAT_Y.E - 199, ease: 'none', duration: 1.2 }, 't-f0')
    .to(statEls[2], { opacity: 0.3, duration: 0.6 }, 't-f0')
    .to(capOf(2), { opacity: 0, duration: 0.4 }, 't-f0')
    .set(hero, { autoAlpha: 0 }, 't-f0+=' + SPLIT)
    .set(fWin, { clipPath: 'inset(0px 0px 0px 0px)' }, 't-f0+=' + SPLIT)
    // CTA buttons empty out, then grow into the four tab cells together with the lines
    .to(btnAccent, { backgroundColor: 'rgba(191,94,42,0)', boxShadow: `inset 1px 1px 0 ${ink}, inset -1px 0 0 ${ink}`, duration: 0.6, ease: 'power1.inOut' }, 't-f0')
    .to($('.btn-ghost', btns), { borderTopColor: ink, duration: 0.6, ease: 'power1.inOut' }, 't-f0')
    .to(inners(btns), { yPercent: -110, duration: 0.5, ease: 'power2.in' }, 't-f0')
    .to($$('.arrow', btns), { opacity: 0, duration: 0.3 }, 't-f0')
    .set(btns, { autoAlpha: 0 }, 't-f0+=0.6')
    .set(featTabs, { autoAlpha: 1 }, 't-f0+=0.6')
    .to(featTabs, { left: 157, width: 1267, '--tbi': ink, ease: 'power2.inOut', duration: SPLIT - 0.6 }, 't-f0+=0.6')
    .to(tabs, { width: (i) => [317.75, 316.75, 316.75, 315.75][i], ease: 'power2.inOut', duration: SPLIT - 0.6 }, 't-f0+=0.6')
    // the header never changes — only its CTA turns orange and loses its tick
    .to(menuCta, { backgroundColor: '#bf5e2a', color: '#f6f6ef', duration: 0.5 }, 't-f0+=0.3')
    .to(ctaMark, { opacity: 0, duration: 0.4 }, 't-f0+=0.3')
    // title rises from the bottom into the opening space and settles (linear = scroll-like)
    .fromTo(fiHead, { y: 700 }, { y: 0, ease: 'none', duration: 2.2 }, 't-f0+=0.7')
    // left edge line settles 155 → 157, outer dashed guides draw in
    .to(fLineL, { left: 157, ease: 'power1.inOut', duration: 0.5 }, 't-f0+=' + SPLIT)
    .to(fGuides, { scaleY: 1, ease: 'power1.out', duration: 1.0, stagger: 0.08 }, 't-f0+=1.9')
    // section + card rise right behind the title, ticks ride on its top border
    .fromTo([fSec, fTicks], { y: 800 }, { y: 0, ease: 'none', duration: 2.2 }, 't-f0+=1.4')
    .to(fTicks, { opacity: 1, duration: 0.4 }, 't-f0+=2.2')
    // tab borders darken and tab 1 fills black while the card arrives
    .to(featTabs, { '--tb': '#000', '--tbi': '#000', duration: 0.6 }, 't-f0+=2.0')
    .to(tabFills[0], { scaleX: 1, ease: 'power1.inOut', duration: 1.4 }, 't-f0+=2.1')
    .to(tabTexts, { opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power1.out' }, 't-f0+=3.1');
  // storyboard frames, for review links (#state=feat-a …): approximate moments of F1–F3 inside the continuous move
  tl.addLabel('feat-a', 't-f0+=0.55').addLabel('feat-b', 't-f0+=1.7').addLabel('feat-c', 't-f0+=2.85');
  tl.addLabel('feat-intro'); hold(0.7);

  // ---- F4 → F5 (677:37627, Tab 1): one vertical slide of the whole column (−238) ----
  tl.addLabel('t-f1');
  tl.to([fiHead, fSec, fTicks], { y: -238, duration: 0.9 }, 't-f1');
  const TAB_ROOM = 2.2; // scroll room per audience card (×0.9 viewport) — every card gets a calm stop
  tl.addLabel('feat-1'); hold(TAB_ROOM);
  // tabs 2–4 are discrete steps (see TABS below) — each gets scroll room
  tl.addLabel('feat-2'); hold(TAB_ROOM);
  tl.addLabel('feat-3'); hold(TAB_ROOM);
  tl.addLabel('feat-4'); hold(TAB_ROOM);

  // ---- Features → Services (714:55849 → 722:56498 → 722:55923 → 538:5633) ----
  // Plain scroll: Services sits right under the Features card and both move up together (one linear move).
  // Meanwhile the tab bar widens to the full frame, narrows to one "Title insurance" button (473) and grows up
  // into the four-row Services list; then row 1 fills black.
  const SCROLL = 2.2;
  const svcList = $('#svcList'), barLabel = $('.bar-label', featTabs);
  const ROW0 = 704 - 495;                         // bar top (704) relative to the list top (495)
  tl.addLabel('t-s1');
  const yAt = (u) => 704 * (1 - u / SCROLL);    // services offset at time u (linear)
  tl.set(services, { autoAlpha: 1, y: 704 }, 't-s1')
    .fromTo(services, { clipPath: `inset(-1px 0px ${80 + yAt(0)}px 0px)` }, { clipPath: `inset(-1px 0px ${80 + yAt(1.4)}px 0px)`, ease: 'none', duration: 1.4 }, 't-s1')
    .set(svcList, { autoAlpha: 0 }, 't-s1')
    .to(services, { y: 0, ease: 'none', duration: SCROLL }, 't-s1')
    .to([fWin, ...fGuides], { y: -704, ease: 'none', duration: SCROLL }, 't-s1')
    .to(fTicks, { y: -238 - 704, ease: 'none', duration: SCROLL }, 't-s1')
    // 1 · bar widens to the full frame (714:55849): active fill and labels go
    .set(tabFills, { scaleX: 0 }, 't-s1')
    .to(tabTexts, { opacity: 0, duration: 0.25, ease: 'power1.in' }, 't-s1')
    // borders go semi-transparent (as in Figma) and the bar gets its own right edge while it narrows
    .to(featTabs, { '--tb': ink, '--tbi': ink, duration: 0.25, ease: 'power1.out' }, 't-s1')
    .fromTo(featTabs, { boxShadow: 'inset -1px 0 0 rgba(0,0,0,0)' }, { boxShadow: `inset -1px 0 0 ${ink}`, duration: 0.25 }, 't-s1')
    .to(featTabs, { left: 0, width: 1424, ease: 'power1.inOut', duration: 0.67 }, 't-s1')
    .to(tabs, { width: (i) => [356.5, 355.5, 355.5, 356.5][i], ease: 'power1.inOut', duration: 0.67 }, 't-s1')
    // 2 · narrows to one "Title insurance" button, 473 wide (722:56498)
    .to(featTabs, { width: 473, ease: 'power1.inOut', duration: 0.73 }, 't-s1+=0.67')
    .to(tabs, { width: (i) => [473, 0, 0, 0][i], ease: 'power1.inOut', duration: 0.73 }, 't-s1+=0.67')
    .to(barLabel, { opacity: 1, duration: 0.35, ease: 'power1.out' }, 't-s1+=1.0')
    // 3 · the button grows up into the four list rows (722:55923)
    .set(featTabs, { autoAlpha: 0 }, 't-s1+=1.4')
    .set(services, { clipPath: 'inset(-1px 0px 0px 0px)' }, 't-s1+=1.4')
    .set(svcList, { autoAlpha: 1 }, 't-s1+=1.4')
    .fromTo(svcList, { clipPath: `inset(${ROW0}px 0px 0px 0px)` }, { clipPath: 'inset(0px 0px 0px 0px)', ease: 'power1.inOut', duration: SCROLL - 1.4 }, 't-s1+=1.4')
    .fromTo(svcItems, { y: (i) => ROW0 + 4 - 72 * i }, { y: 0, ease: 'power1.inOut', duration: SCROLL - 1.4 }, 't-s1+=1.4')
    .fromTo(svcItems.slice(1), { opacity: 0 }, { opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power1.out' }, 't-s1+=1.55')
    .fromTo($('.svc-intro .t-label'), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 't-s1+=1.55')
    .fromTo($$('#svcH2 .line-inner'), { yPercent: 105 }, { yPercent: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, 't-s1+=1.6')
    .fromTo($('#svcCopy'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 't-s1+=1.7')
    .fromTo($$('[data-layer="parcel"], [data-layer="survey-stakes"], [data-layer="dimension"]', illus[0]), { opacity: 0, y: -24 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, 't-s1+=1.7')
    .fromTo($$('.svc-t', svcList), { opacity: 0 }, { opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power1.out' }, 't-s1+=' + (SCROLL - 0.1))
    // 4 · row 1 fills black (538:5633)
    .fromTo(svcFills[0], { scaleX: 0 }, { scaleX: 1, duration: 0.01, ease: 'none', immediateRender: false }, 't-s1+=' + (SCROLL + 0.3))
    .fromTo(svcItems[0], { color: '#000000' }, { color: '#f6f6ef', duration: 0.01, ease: 'none', immediateRender: false }, 't-s1+=' + (SCROLL + 0.3))
    .to({}, { duration: 0.4 })
    .set(features, { autoAlpha: 0 }, 't-s1+=' + SCROLL);
  tl.addLabel('svc-a', 't-s1+=0.67').addLabel('svc-b', 't-s1+=1.4').addLabel('svc-c', 't-s1+=' + SCROLL); // storyboard frames for review links
  // same calm stops as the Features cards: TAB_ROOM of scroll per service
  tl.addLabel('svc-1'); hold(TAB_ROOM);
  tl.addLabel('svc-2'); hold(TAB_ROOM);
  tl.addLabel('svc-3'); hold(TAB_ROOM);
  tl.addLabel('svc-4'); hold(TAB_ROOM / 2);

  const L = tl.labels;
  const TOTAL = tl.duration();

  /* ======================================================================
     DISCRETE STEPS (tabs + services) — time-based transitions, scroll-triggered
     ====================================================================== */
  const fText = k => $(`[data-f="${k}"]`, fSec);
  let curTab = 0, tabTl = null, svcTl = null, tabActTimer = null, fillTw = null;
  const TAB_SWITCH = 1.15; // s — a card change plays fully before the next one may start
  function setTab(i, instant, skipFill) {
    if (i === curTab && !instant) return;
    const d = TABS[i], prevImg = TABS[curTab].img;
    curTab = i;
    // deactivating is instant (no effect); activating fills black from the left and the label turns white
    // when the fill reaches it. (no killTweensOf on fills: tab 1's fill is also driven by the scroll timeline)
    if (tabActTimer) tabActTimer.kill();
    if (fillTw) fillTw.kill();
    tabs.forEach((t, k) => { if (k !== i) t.classList.remove('is-active'); });
    if (instant) tabs[i].classList.add('is-active');
    else tabActTimer = gsap.delayedCall(0.38, () => tabs[i].classList.add('is-active'));
    if (!(instant && skipFill)) tabFills.forEach((f, k) => {
      if (k !== i) { gsap.set(f, { scaleX: 0, overwrite: false }); return; }
      if (instant) gsap.set(f, { scaleX: 1 });
      else fillTw = gsap.fromTo(f, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' });
    });
    // the link animates as one piece (text + arrow)
    const swap = [fText('label'), fText('h3'), fText('body'), $('.feat-link', fSec), fText('r0'), fText('r1'), fText('r2')];
    const apply = () => {
      fText('label').textContent = d.label;
      fText('h3').textContent = d.h3;
      fText('body').textContent = d.body;
      setLabel(fText('link'), d.link);
      d.rows.forEach((r, k) => (fText('r' + k).textContent = r));
    };
    if (tabTl) tabTl.kill();
    gsap.killTweensOf(swap);
    if (instant) { apply(); gsap.set(swap, { opacity: 1, y: 0 }); }
    else {
      tabTl = gsap.timeline()
        .to(swap, { opacity: 0, y: -10, duration: 0.35, stagger: 0.03, ease: 'power2.in' })
        .add(apply)
        .fromTo(swap, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out' });
    }
    // image
    fms.forEach(el => {
      const k = +el.dataset.img, on = k === d.img;
      gsap.killTweensOf(el);
      if (instant) { gsap.set(el, { autoAlpha: on ? 1 : 0, clipPath: 'inset(0% 0% 0% 0%)' }); return; }
      if (on && k !== prevImg) {
        gsap.set(el, { zIndex: 2, autoAlpha: 1 });
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut' });
        gsap.fromTo(el.querySelectorAll('img'), { scale: 1.08 }, { scale: 1, duration: 1.7, ease: 'power3.out' });
      } else if (!on) {
        gsap.set(el, { zIndex: 1 });
        gsap.to(el, { autoAlpha: 0, duration: 0.01, delay: k === prevImg ? 1.3 : 0 });
      }
    });
  }

  let curSvc = 0, svcActTimer = null, svcFillTw = null;
  const LAYERS_NEW = { 1: ['parcel-foundation'], 2: ['house', 'tree'], 3: ['building'] };
  function setSvc(i, instant) {
    if (i === curSvc && !instant) return;
    const d = SERVICES[i], prev = curSvc;
    curSvc = i;
    // same as the Features tabs: deactivate instantly, activate with a black fill from the left
    if (svcActTimer) svcActTimer.kill();
    if (svcFillTw) svcFillTw.kill();
    gsap.set(svcItems, { clearProps: 'color' });   // the scroll-in sets row 1's colour inline
    svcItems.forEach((t, k) => { if (k !== i) t.classList.remove('is-active'); });
    svcFills.forEach((f, k) => { if (k !== i) gsap.set(f, { scaleX: 0 }); });
    if (instant) { svcItems[i].classList.add('is-active'); gsap.set(svcFills[i], { scaleX: 1 }); }
    else {
      svcItems[i].classList.add('is-active');      // on at once — no sweep
      gsap.set(svcFills[i], { scaleX: 1 });
    }
    $('#svcList').classList.toggle('has-top', i > 0);
    const fields = $$('[data-s]', services);
    // h3, body and the whole link (text + arrow) move as units
    const copy = [$('[data-s="h3"]', services), $('[data-s="body"]', services), $('#svcCopy .link-accent')];
    const apply = () => { fields.forEach(el => setLabel(el, d[el.dataset.s])); };
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

  const HALF = 2.2 / 2;
  const tabAt = t => t < L['feat-2'] - HALF ? 0 : t < L['feat-3'] - HALF ? 1 : t < L['feat-4'] - HALF ? 2 : 3;
  const svcAt = t => t < L['svc-2'] - HALF ? 0 : t < L['svc-3'] - HALF ? 1 : t < L['svc-4'] - HALF ? 2 : 3;
  // cards change strictly one step at a time; while a change is playing, further scroll waits for it
  let tabBusy = false, tabHoldUntil = 0;
  function syncTabs(t) {
    if (tabBusy || performance.now() < tabHoldUntil) return;
    const want = tabAt(t);
    if (want === curTab) return;
    setTab(curTab + Math.sign(want - curTab));
    tabBusy = true;
    gsap.delayedCall(TAB_SWITCH, () => { tabBusy = false; syncTabs(current); });
  }
  let svcBusy = false, svcHoldUntil = 0;
  function syncSvc(t) {
    if (svcBusy || performance.now() < svcHoldUntil) return;
    const want = svcAt(t);
    if (want === curSvc) return;
    setSvc(curSvc + Math.sign(want - curSvc));
    svcBusy = true;
    gsap.delayedCall(TAB_SWITCH, () => { svcBusy = false; syncSvc(current); });
  }
  function syncDiscrete(t) { syncTabs(t); syncSvc(t); }

  /* ======================================================================
     SCROLL → TIMELINE (smoothed)
     ====================================================================== */
  const scroller = $('#scroll');
  const unitPx = () => innerHeight * 0.9;
  function setHeight() { scroller.style.height = `${TOTAL * unitPx() + innerHeight}px`; }
  let target = 0, current = 0, running = false;
  function onScroll() { target = Math.min(TOTAL, Math.max(0, scrollY / unitPx())); if (!running) { running = true; requestAnimationFrame(tick); } }
  // the header sits above the texture, so it carries its own copy, phase-locked to the stage
  // (the frame moves 10 → 8px during the hero, so the offset is recomputed)
  function alignHeaderTexture() {
    menu.style.backgroundPosition = `${-(8 + 1)}px ${-(gsap.getProperty(frame, 'top'))}px`; // menu sits at (1,0) in the frame
  }
  alignHeaderTexture();
  function tick() {
    current += (target - current) * 0.11;
    if (Math.abs(target - current) < 0.0005) current = target;
    tl.time(current);
    alignHeaderTexture();
    syncDiscrete(current);
    if (current !== target) requestAnimationFrame(tick); else running = false;
  }
  function scrollToLabel(name) { scrollTo({ top: L[name] * unitPx() + 2, behavior: 'smooth' }); }

  tabs.forEach((t, k) => t.addEventListener('click', () => {
    tabHoldUntil = performance.now() + 1400;
    setTab(k);
    scrollToLabel('feat-' + (k + 1));
  }));
  let idleT = null;
  addEventListener('scroll', () => {
    clearTimeout(idleT);
    idleT = setTimeout(() => {
      // soft snap to the nearest Features card or Services item once the scroll stops
      let goal = null;
      if (target >= L['feat-1'] - 0.3 && target <= L['feat-4'] + HALF) goal = L['feat-' + (tabAt(target) + 1)];
      else if (target >= L['svc-1'] - 0.3) goal = L['svc-' + (svcAt(target) + 1)];
      if (goal !== null && Math.abs(target - goal) > 0.04) scrollTo({ top: goal * unitPx() + 2, behavior: 'smooth' });
    }, 260);
  }, { passive: true });
  svcItems.forEach((t, k) => t.addEventListener('click', () => {
    svcHoldUntil = performance.now() + 1400;
    setSvc(k);
    scrollToLabel('svc-' + (k + 1));
  }));
  $$('.menu-cell[href="#services"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); scrollToLabel('svc-1'); }));
  $$('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));
  addEventListener('keydown', e => {
    const names = ['hero-1', 'hero-2', 'hero-3', 'hero-4', 'hero-5', 'hero-6', 'feat-intro', 'feat-1', 'feat-2', 'feat-3', 'feat-4', 'svc-1', 'svc-2', 'svc-3', 'svc-4'];
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
    root.classList.add('ready');
    setHeight();
    addEventListener('resize', setHeight);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ======================================================================
     LOADER  (485:4400 → 501:4439 → 501:4479 → 501:4508 → 562:6444 → hero 512:4618)
     ====================================================================== */
  /* The loader never moves its artwork (that is what made the logo shake before):
     - #ldArt (guides + P) stays put and is only clipped with clip-path: inset(R)
     - four covers mask everything outside R, the four lines sit on R's edges
     - covers and lines move with transforms only (GPU, sub-pixel smooth) */
  const ldArt = $('#ldArt');
  const covers = $$('.ld-cover');
  const ldT = $('#ldT'), ldB = $('#ldB'), ldLn = $('#ldL'), ldR = $('#ldR');
  const lines = [ldT, ldB, ldLn, ldR];
  const R = { x: 0, y: 0, w: 1440, h: 800 };
  function drawRect() {
    const r = 1440 - R.x - R.w, b = 800 - R.y - R.h;
    ldArt.style.clipPath = `inset(${R.y}px ${r}px ${b}px ${R.x}px)`;
    covers[0].style.transform = `translate3d(0, ${R.y - 800}px, 0)`;
    covers[1].style.transform = `translate3d(0, ${R.y + R.h}px, 0)`;
    covers[2].style.transform = `translate3d(${R.x - 1440}px, 0, 0)`;
    covers[3].style.transform = `translate3d(${R.x + R.w}px, 0, 0)`;
    ldT.style.transform = `translate3d(0, ${R.y}px, 0)`;
    // at zero size the pairs of lines must land on the same pixel (638:29922 — a single cross)
    const kx = Math.min(1, R.w), ky = Math.min(1, R.h);
    ldB.style.transform = `translate3d(0, ${R.y + R.h - ky}px, 0)`;
    ldLn.style.transform = `translate3d(${R.x - kx}px, 0, 0)`;
    ldR.style.transform = `translate3d(${R.x + R.w - kx}px, 0, 0)`;
  }
  // window rects, straight from the Figma loader frames
  const RECT = {
    start: { x: 8, y: 9, w: 1425, h: 784 },            // 638:29300 — lines start on the new 1px frame border (7,9 → 1432,792)
    step2: { x: 55, y: 54, w: 1332, h: 692 },          // 501:4439
    step3: { x: 477, y: 274, w: 483, h: 245 },         // 501:4479 — tight around the P
    point: { x: 720, y: 400, w: 0, h: 0 },             // 638:29922 — fully collapsed: one horizontal + one vertical line
    open1: { x: 489, y: 275, w: 460, h: 244 },         // 638:29942 — lines at x 488/948, y 275/518, hero grid inside
    step4: { x: 123, y: 93, w: 1190, h: 616 },         // 501:4508
    hero:  { x: 8, y: 10, w: 1424, h: 782 },           // 562:6444 — the hero frame
  };

  // Hero "skeleton" (Loader -> Hero 562:6444): everything but the grid is invisible

  // Hero "skeleton" (Loader -> Hero 562:6444): only the grid lines are visible
  function skeleton() {
    gsap.set(inners(menu), { yPercent: 110 });
    gsap.set('.menu-logo img', { opacity: 0 });
    gsap.set(heroImg, { opacity: 0, scale: 1835 / 1479, transformOrigin: '50% 50%' });
    gsap.set('#tlDark', { opacity: 1 }); gsap.set('#tlLight', { opacity: 0 });
    gsap.set($$('.row p', timeline), { opacity: 0 });
    gsap.set([...inners(title), ...inners(sub)], { yPercent: 110 });
    gsap.set($('#scrollHint'), { opacity: 0 });
    gsap.set(btnAccent, { backgroundColor: 'rgba(191,94,42,0)', boxShadow: 'inset 1px 1px 0 #000, inset -1px 0 0 #000' });
    gsap.set(inners(btns), { yPercent: 110 });
    gsap.set($$('.arrow', btns), { opacity: 0 });
    gsap.set(vline, { height: 655 });
    gsap.set(frame, { outlineColor: 'rgba(0,0,0,0)' });
  }

  // Lines first, then texts & photo load in (reference video)
  function heroIntro() {
    const out = 'expo.out';
    return gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(frame, { outlineColor: 'rgba(0,0,0,1)', duration: 0.5, ease: 'power1.inOut' }, 0)
      .to(vline, { height: 28, duration: 1.0, ease: 'power3.inOut' }, 0.1)
      // photo: appears oversized and slowly zooms out to its Figma framing
      // Hero - Progress bar frame 1 → 2: photo 1835×715 → 1479×605 around the same centre (×1.1818)
      .to(heroImg, { opacity: 1, duration: 0.7, ease: 'power1.out' }, 0.25)
      .to(heroImg, { scale: 1, duration: 2.4, ease: out }, 0.25)
      .to('#tlDark', { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.45)
      .to(sep, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.45) // REST has no line under the photo
      .add(() => startProgress(), 0.9)
      // texts slide up inside their masks
      .to('.menu-logo img', { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0.35)
      .to(inners(menu), { yPercent: 0, duration: 0.9, stagger: 0.05, ease: out }, 0.4)
      .to(inners(title), { yPercent: 0, duration: 1.1, stagger: 0.1, ease: out }, 0.55)
      .to(inners(sub), { yPercent: 0, duration: 1.0, stagger: 0.08, ease: out }, 0.8)
      .to(btnAccent, { backgroundColor: 'rgba(191,94,42,1)', boxShadow: 'inset 0px 0px 0 #000, inset 0px 0 0 #000', duration: 0.7, ease: 'power2.inOut' }, 0.6)
      .to(inners(btns), { yPercent: 0, duration: 0.9, stagger: 0.06, ease: out }, 0.85)
      .to($$('.arrow', btns), { opacity: 1, duration: 0.5 }, 1.0)
      .to($('#scrollHint'), { opacity: 1, duration: 0.8, ease: 'power1.out' }, 1.2)
      .add(() => liveGuides(), 1.2)
      .add(() => { gsap.set(btnAccent, { clearProps: 'boxShadow' }); gsap.set(heroImg, { clearProps: 'transform,opacity' }); });
  }

  /* Progress bar over the hero photo (frames "Hero - Progress bar" 638:29384 … 638:29699).
     Runs on its own clock, independent of scroll: appears once, then fills
     Open order (87) → Title search (419) → Escrow (1017) → full track (1424), resets, repeats. */
  const fill = $('#tlFill');
  const STOPS = [87, 419, 1017, 1424];
  let progressTl = null;
  function startProgress() {
    if (progressTl) return;
    gsap.to('#tlLight', { opacity: 1, duration: 0.7, ease: 'power1.inOut' });
    gsap.to($$('.row p', timeline), { opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power1.out' });
    gsap.set(fill, { scaleX: 0, opacity: 1 });
    progressTl = gsap.timeline({ repeat: -1, delay: 0.9 });
    let prev = 0;
    STOPS.forEach((x, i) => {
      progressTl.to(fill, { scaleX: x / 1424, duration: 0.6 + (x - prev) / 520, ease: 'power2.inOut' })
        .to({}, { duration: i === STOPS.length - 1 ? 1.0 : 0.7 });
      prev = x;
    });
    progressTl.to(fill, { opacity: 0, duration: 0.45, ease: 'power1.in' })
      .set(fill, { scaleX: 0, opacity: 1 })
      .to({}, { duration: 0.5 });
  }
  // final look of the scroll guides (solid #C5C5BF, group nudged −1.11 / +1 as in Figma)
  function liveGuides() {
    guides.classList.add('is-live');
    gsap.set([...$$('.tick', guides), $('#scrollHint'), $('.rot.h', guides)], { x: -1.11, y: 1 });
  }

  function runLoader() {
    skeleton();
    Object.assign(R, RECT.start);
    drawRect();
    gsap.set(lines, { opacity: 0 });
    root.classList.add('booted');
    const ld = gsap.timeline({ onUpdate: drawRect });
    // 1 · 638:29300 — grey outlined P on the perspective guides (fade only: no scaling = no shake)
    ld.fromTo(['#ldPGrey', '.ld-guides', '#ldFrame'], { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power1.out' }, 0)
      .to('#ldFrame', { opacity: 0, duration: 0.3 }, 0.8)
    // 2 · 501:4439 — P turns orange (cross-fade), the four lines appear at the frame edges
      .to('#ldPOrange', { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, 0.7)
      .to(lines, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 0.7)
    // 2 → 3 · one continuous move: lines glide in and close tight around the logo
    //     (start, step2, step3 share one centre, so a single tween passes through 501:4439 with no joints = no jerks)
      .to(R, { ...RECT.step3, duration: 1.5, ease: 'power2.inOut' }, 0.8)
    // 3 → collapse (638:29922) · the window keeps closing until all four lines meet in one cross;
    //     the logo is simply squeezed out by the clip — no fade, no movement
      .to(R, { ...RECT.point, duration: 0.6, ease: 'power3.in' }, 2.45)
      .set(ldArt, { autoAlpha: 0 }, 3.05)
    // collapse → 638:29942 → 501:4508 → Loader -> Hero · lines spring open and reveal the hero grid
    //     (open1, step4 and the hero frame are all centred on the cross, so one tween runs through them smoothly)
      .to(R, { ...RECT.hero, duration: 1.6, ease: 'power3.out' }, 3.2)
      .to(lines, { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 4.55)
      .add(() => heroIntro().eventCallback('onComplete', startScroll), 4.45)
      .add(() => { $('#loader').style.display = 'none'; }, 5.0);
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  const ready = document.fonts ? document.fonts.ready : Promise.resolve();
  const imgs = ['assets/hero/hero-photo-v2.webp', 'assets/loader/letter-p-grey-v2.svg', 'assets/loader/letter-p-orange-v2.svg', 'assets/loader/guides-perspective-v2-loader1.svg', 'assets/hero/texture-stripes-o06.svg']
    .map(src => new Promise(res => { const i = new Image(); i.onload = i.onerror = res; i.src = src; }));

  if (hashState) {
    // review mode: #state=<label> renders that Figma state instantly (no loader)
    root.classList.add('booted');
    $('#loader').style.display = 'none';
    root.classList.remove('is-loading');
    if (hashState !== 'loader-hero') { root.classList.add('ready'); liveGuides(); gsap.set(['#tlDark', sep], { opacity: 0 }); startProgress(); }
    const lab = hashState === 'static' ? 'hero-1' : hashState;
    if (lab === 'loader-hero') { skeleton(); gsap.set(frame, { outlineColor: 'rgba(0,0,0,1)' }); }
    const t = L[lab] !== undefined ? L[lab] : 0;
    tl.time(t);
    alignHeaderTexture();
    curTab = tabAt(t); curSvc = svcAt(t);
    if (t < L['t-s1']) setTab(curTab, true, t < L['feat-intro']);
    if (t >= L['svc-1']) setSvc(curSvc, true);
    if (hashState !== 'static' && hashState !== 'loader-hero') { // allow scrolling from here
      setHeight(); addEventListener('resize', setHeight);
      scrollTo(0, t * unitPx()); target = current = t;
      addEventListener('scroll', onScroll, { passive: true });
    }
  } else {
    scrollTo(0, 0);
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    Promise.all([ready, ...imgs]).then(() => setTimeout(runLoader, 150));
    // decode the Features photos ahead of time (off the main thread) so the first card reveal never waits on them
    addEventListener('load', () => setTimeout(() => $$('.feat-media img').forEach(i => i.decode && i.decode().catch(() => {})), 500));
  }
})();
