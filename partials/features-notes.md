# Features section – implementation notes (from Figma 6z3ldwHkiRRSwd1lwrPSWb)

All coordinates are relative to the **inner bordered frame** (1424×784, 8px inset inside the 1440×800 section),
in Figma space (origin = outer top-left of the 1.5px stroke). Figma strokes do NOT take layout space:
to keep coordinates exact, draw the 1.5px frame border, the card's left/right 1px borders and the 1.149px
BenefitRow top borders as overlays (`::after`/`::before` or `box-shadow: inset`) rather than real CSS borders
(a real border shifts children by 1–1.5px and makes BenefitRows 67px instead of 66px).

## 0. Asset inventory (`assets/features/`) – deduped by md5

| file | what | used in |
|---|---|---|
| `tab1-photo.png` (2048², RGB) | **door-of-light photo** (dark room, open door to sky) | base img of intro, tab1, tab2, tab3 (identical bytes in all four frames) |
| `tab1-photo-overlay.png` (2048², RGB) | hand holding golden key against sky | overlay img, intro + tab1 only |
| `tab4-photo.png` (1024², RGBA, fully opaque) | office building at dusk (bluer) | base img tab4 + 612:6967 (hidden under overlay) |
| `tab4-photo-overlay.png` (1024², RGBA, fully opaque) | office building at night (darker, the visible one) | overlay img tab4 + 612:6967 |
| `arrow-right-accent-14.svg` (13.7893²) | accent arrow, intro link | intro |
| `../common/arrow-right-accent.svg` (20.5037²) | accent arrow, tab links (Figma's copy differs by 0.002px only) | tabs 1-4, 612:6967 |
| `../common/line-dashed-712.svg` (712×1) | dashed line under last BenefitRow (identical bytes) | all 6 frames |
| `../common/logo.svg` | logo (identical bytes) | header |
| `intro-guide-left-inner-295.svg` (294.779×7.77817) | dashed line 291 + 1 tick at end | intro |
| `intro-guide-right-inner-291.svg` (291×7.77817) | dashed line 291, its tick has opacity:0 | intro |
| `intro-guide-right-outer-904.svg` (904.307×7.77836) | dashed 655 + ticks at 284 / 902 | intro |
| `intro-guide-left-outer-966.svg` (966.307×7.77835) | dashed 737 + ticks at 285 / 964 | intro |
| `guide-tick-44.svg` (43.7792×7.77817) | dashed 40 + 1 tick at end | tabs 1-4, 612:6967 (both left & right short groups; per-frame copies differ only sub-pixel) |
| `guide-right-outer-678.svg` (678.307×7.7782) | dashed 676 + ticks at 43 / 677 | tabs 1-4, 612:6967 |
| `guide-left-outer-738.svg` (738.307×7.7782) | dashed 735 + ticks at 42 / 737 | tabs 1-4, 612:6967 |

Guide SVGs are horizontal; Figma renders each inside a `7.778px`-wide box rotated 90°. Dashes: stroke black
@0.16; ticks: 2×9 rects rotated 45° fill `#ACACA7`. Exact CSS pattern (do not override SVG width/height):

```css
.fguide{position:absolute;width:7.778px;display:flex;align-items:center;justify-content:center;pointer-events:none}
.fguide img{flex:none;display:block;height:7.778px;transform:rotate(90deg)} /* img width = svg width */
```
`<div class="fguide" style="left:Xpx;top:Ypx;height:Lpx"><img src="…" style="width:Lpx"></div>`
(svg start → top, svg end → bottom; the visible dashed line ends up ~3.9px right/left of `left`+3.9 as noted).

### Guide geometry – tab states (tab1 532:5127, tab2-4, 612:6967 are identical)
| node | asset | left | top | height (=img width) | visible result |
|---|---|---|---|---|---|
| right short | guide-tick-44.svg | 1257.97 | 49 | 43.779 | dash x≈1263, y49→89, tick at y≈88-96 |
| left short | guide-tick-44.svg | 156 | 49 | 43.779 | dash x≈160.5, y49→89, tick y≈88-96 |
| right outer | guide-right-outer-678.svg | 1289.63 | 49 | 678.307 | dash x≈1294, y49→725, ticks y≈92 & ≈726 |
| left outer | guide-left-outer-738.svg | 126.12 | 49 | 738.307 | dash x≈131, y49→784, ticks y≈91 & ≈785 (clipped) |

(Figma gives these as `bottom`: 691.22 / 691.22 / 56.69 / −3.31; top = 784 − bottom − height.)

## 1. Per-tab content (tab states 532:5127 / 545:5888 / 545:5965 / 545:6042)

Shared layout = your tab-1 code: section `top:90 h694` (border-top 1px default, px160 pb60), card 1104×633 at
(160,91), left col 552 (text block p40 h395, link at y=331 within col; benefits 3×66 + pb40), right image col 552×633.
Label = 14px Medium, uppercase, tracking 0.56px, lh1.2, `--text-tertiary`. H3 = Coconat 32/1.1/−0.64, w413.
Body = 16/1.6/−0.32 `--text-secondary`. Link = **20px** Medium /1.2/−0.4px accent, gap 6.895, arrow 20.504 inside
a wrapper with `padding-top:2px`. Benefit text 16/1.6/−0.32 primary.

| | Tab 1 – 532:5127 | Tab 2 – 545:5888 | Tab 3 – 545:5965 | Tab 4 – 545:6042 |
|---|---|---|---|---|
| label | Real estate agents | Buyers & sellers | Lenders | Brokers |
| H3 | Keep every transaction moving with confidence (no period in tab frame; intro has a period) | Close on your next home with total clarity | Fund every loan with confidence, on schedule | Support your whole brokerage team at any scale |
| body | Get reliable title and escrow support from contract to closing. Our team keeps your clients’ transactions on track. | Clear guidance on title, escrow, and closing costs at every step. We confirm a clean title and keep your funds safe until closing. | Accurate title work and secure escrow keep your loans compliant and your closings on time, from residential to commercial. (**body width 445px**, others 413) | One title and escrow partner for every agent in your office, with local teams across California. |
| link | Explore services for agents | Explore services for buyers & sellers | Explore services for lenders | Explore services for brokers |
| row 1 | Open title orders quickly | Estimate costs with our mortgage calculator | Open title orders online, 24/7 | Local offices from San Diego to Sacramento |
| row 2 | Access property data and reports | Check your Prop 19 tax savings | Residential and commercial coverage | One team for residential and commercial files |
| row 3 | Get net sheets and closing estimates | Stay protected from wire fraud | Service in all 58 California counties | Wire fraud protection on every transaction |
| images | tab1-photo.png (crop) + tab1-photo-overlay.png (cover) | **tab1-photo.png only (crop), no overlay** → door shows | same as tab 2 (door) | tab4-photo.png + tab4-photo-overlay.png, both cover, no crop |

Image CSS (right col `position:relative;flex:1;height:100%`):
- Tabs 1/2/3 base: wrapper `position:absolute;inset:0;overflow:hidden;pointer-events:none` →
  `img{position:absolute;height:110.9%;left:-6.34%;top:-9.67%;width:127.17%;max-width:none}` (src tab1-photo.png).
- Tab 1 (and intro) overlay, sibling after the wrapper: `img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none}` (tab1-photo-overlay.png). Tabs 2/3 have NO overlay node.
- Tab 4: wrapper `position:absolute;inset:0` containing two `img{position:absolute;width:100%;height:100%;object-fit:cover}`: tab4-photo.png then tab4-photo-overlay.png (overlay is opaque → only it is visible).

Tabs bar (all tab states): `position:absolute; bottom:1px; right:0; width:1263px; height:80px` (x=161,y=703), 4 × flex:1
(Figma widths 316.75/315.75/315.75/314.75). Text 16px Medium /1.2/−0.32. Inactive: bg `--bg`, border-top 1px
`--border-strong`, border-right 1px strong, text `--text-secondary`; **inactive first tab also has border-left 1px**;
inactive last tab (Brokers) has border-top only. Active: bg #000, no borders, text `--text-inverse`.
Active tab = the frame's tab (2: Buyers & sellers, 3: Lenders, 4: Brokers).

Header in all tab states (and 612:6967): logo col 400px, then 6 flex:1 cols (170.67) each border-left default,
tick rect 2×9 at bottom:−2px; "Start an order" = **accent bg** (#bf5e2a) with border-left + tick rect too. Same in tab 1.
Each tab frame also contains the hidden (display:none) intro heading block (y49, h197) – ignore.

## 2. Intro state 528:4855 – static HTML/CSS (excluding the 48px Menu)

Differences vs tab states: intro heading block visible (y48–331); content section starts at y=331 with h670 (overflows,
clipped by frame) → card h609 (not 633); label is 16px Medium sentence-case (not 14px uppercase); link 16px with
13.79px arrow; H3 ends with a period; tabs bar is 1264 wide at x=160, bottom:0, first (active) tab has no left border;
guides differ (below). Header differs too (logo col 464 flex:1, links fixed 160px, ticks at bottom:0, Start-an-order accent
with NO border-left and no tick) – you have it.

```html
<div class="fi"><!-- 1424x784 inner frame; header goes inside at top:0 -->
  <!-- heading block 528:4859 -->
  <div class="fi-head">
    <div class="fi-head-in">
      <div class="fi-head-l">
        <p class="fi-eyebrow">Who we serve</p>
        <h2 class="fi-h2">Title &amp; escrow support<br>built around your role.</h2>
      </div>
      <div class="fi-head-r">
        <p class="fi-lead">Title insurance, escrow, and closing support for buyers, sellers, real estate professionals, and lenders across California.</p>
      </div>
    </div>
  </div>
  <!-- content section 529:4988 -->
  <div class="fi-body">
    <div class="fi-card">
      <div class="fi-col">
        <div class="fi-text">
          <div class="fi-copy">
            <p class="fi-label">Real estate agents</p>
            <h3 class="fi-h3">Keep every transaction moving with confidence.</h3>
            <p class="fi-p">Get reliable title and escrow support from contract to closing. Our team keeps your clients’ transactions on track.</p>
          </div>
          <a class="fi-link" href="#">Explore services for agents<img src="assets/features/arrow-right-accent-14.svg" width="13.7893" height="13.7893" alt=""></a>
        </div>
        <div class="fi-rows">
          <div class="fi-row">Open title orders quickly</div>
          <div class="fi-row">Access property data and reports</div>
          <div class="fi-row">Get net sheets and closing estimates
            <img class="fi-dash" src="assets/common/line-dashed-712.svg" width="712" height="1" alt=""></div>
        </div>
      </div>
      <div class="fi-media">
        <div class="fi-crop"><img src="assets/features/tab1-photo.png" alt=""></div>
        <img class="fi-cover" src="assets/features/tab1-photo-overlay.png" alt="">
      </div>
    </div>
  </div>
  <!-- tabs 528:4863 -->
  <div class="fi-tabs">
    <button class="fi-tab is-active">Real estate agents</button>
    <button class="fi-tab">Buyers &amp; sellers</button>
    <button class="fi-tab">Lenders</button>
    <button class="fi-tab fi-tab--last">Brokers</button>
  </div>
  <!-- guides (DOM order = Figma z-order: after tabs; outer guides after the Menu) -->
  <div class="fguide" style="left:156.94px;top:41px;height:294.779px"><img src="assets/features/intro-guide-left-inner-295.svg" style="width:294.779px" alt=""></div>
  <div class="fguide" style="left:1258px;top:42px;height:291px"><img src="assets/features/intro-guide-right-inner-291.svg" style="width:291px" alt=""></div>
  <!-- Menu (yours) here -->
  <div class="fguide" style="left:1289.61px;top:49px;height:904.307px"><img src="assets/features/intro-guide-right-outer-904.svg" style="width:904.307px" alt=""></div>
  <div class="fguide" style="left:126.09px;top:49px;height:966.307px"><img src="assets/features/intro-guide-left-outer-966.svg" style="width:966.307px" alt=""></div>
</div>
```

```css
.fi{position:relative;width:1424px;height:784px;background:var(--bg);overflow:hidden}
.fi::after{content:"";position:absolute;inset:0;border:1.5px solid var(--border-strong);pointer-events:none;z-index:10}
.fi p,.fi h2,.fi h3{margin:0}

/* heading block: x0 y48 1424x283, px40 py80, centered */
.fi-head{position:absolute;left:0;top:48px;width:1424px;height:283px;box-sizing:border-box;padding:80px 40px;
  display:flex;align-items:center;justify-content:center}
.fi-head-in{width:1100px;box-sizing:border-box;padding:0 40px;display:flex;gap:10px;align-items:flex-end} /* x=162, h123 */
.fi-head-l{flex:1 0 0;min-width:0;display:flex;flex-direction:column;gap:10px}           /* 594 wide */
.fi-eyebrow{font:400 14px/1.2 'Overused Grotesk';letter-spacing:.56px;text-transform:uppercase;color:var(--text-secondary);white-space:nowrap} /* h17 */
.fi-h2{font:400 44px/1.1 'Coconat';letter-spacing:-.88px;color:var(--text-primary)}      /* y27 in block, h96 */
.fi-head-r{align-self:stretch;display:flex;flex-direction:column;justify-content:flex-end;gap:10px;padding:16px 0 4px}
.fi-lead{width:416px;font:400 16px/1.6 'Overused Grotesk';letter-spacing:-.32px;color:var(--text-secondary)} /* x644 in block, y67, h52 */

/* content section: y331 h670 (bottom 1001 → clipped), border-top 1px default, px160 pb60 */
.fi-body{position:absolute;left:0;top:331px;width:1424px;height:670px;box-sizing:border-box;
  border-top:1px solid var(--border-default);padding:0 160px 60px;display:flex;align-items:flex-end}
.fi-card{position:relative;flex:1 0 0;height:100%;display:flex}                         /* 1104x609 at (160,332) */
.fi-card::after{content:"";position:absolute;inset:0;border-left:1px solid var(--border-default);border-right:1px solid var(--border-default);pointer-events:none;z-index:2}
.fi-col{flex:1 0 0;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:space-between} /* 552 */
.fi-text{flex:1 0 0;padding:40px;display:flex;flex-direction:column;justify-content:space-between} /* h371 */
.fi-copy{display:flex;flex-direction:column;gap:16px}                                    /* h173 */
.fi-label{font:500 16px/1.2 'Overused Grotesk';letter-spacing:-.32px;color:var(--text-tertiary);white-space:nowrap} /* h19 */
.fi-h3{width:413px;font:400 32px/1.1 'Coconat';letter-spacing:-.64px;color:var(--text-primary)} /* y35, h70 */
.fi-p{width:413px;font:400 16px/1.6 'Overused Grotesk';letter-spacing:-.32px;color:var(--text-secondary)} /* y121, h52 */
.fi-link{display:inline-flex;align-items:center;gap:6.895px;align-self:flex-start;text-decoration:none;
  font:500 16px/1.2 'Overused Grotesk';letter-spacing:-.32px;color:var(--accent);white-space:nowrap} /* at col y312, 203.68x19 */
.fi-link img{display:block;width:13.7893px;height:13.7893px;flex:none}
.fi-rows{padding-bottom:40px;display:flex;flex-direction:column}                          /* y371, h238 */
.fi-row{position:relative;height:66px;box-sizing:border-box;padding:20px 40px;
  box-shadow:inset 0 1.149px 0 var(--border-default);
  font:400 16px/1.6 'Overused Grotesk';letter-spacing:-.32px;color:var(--text-primary)}
.fi-dash{position:absolute;left:0;bottom:0;width:712px;height:1px;transform:rotate(180deg);max-width:none}
  /* Figma: 712 wide, overflows into image column; image column paints over it */
.fi-media{position:relative;flex:1 0 0;min-width:0;height:100%}                         /* 552x609 */
.fi-crop{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.fi-crop img{position:absolute;height:110.9%;left:-6.34%;top:-9.67%;width:127.17%;max-width:none}
.fi-cover{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none;pointer-events:none}

/* tabs: x160 y704 1264x80, bottom:0 right:0 */
.fi-tabs{position:absolute;right:0;bottom:0;width:1264px;height:80px;display:flex}
.fi-tab{flex:1 0 0;min-width:0;height:100%;padding:0 20px;display:flex;align-items:center;justify-content:center;
  background:var(--bg);border:0;border-top:1.005px solid var(--border-strong);border-right:1.005px solid var(--border-strong);
  font:500 16px/1.2 'Overused Grotesk';letter-spacing:-.32px;color:var(--text-secondary);white-space:nowrap}
.fi-tab--last{border-right:0}
.fi-tab.is-active{background:#000;color:var(--text-inverse);border:0}
/* Figma tab widths: 315.50 / 316.50 / 316.50 / 315.50 */

.fguide{position:absolute;width:7.778px;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:3}
.fguide img{flex:none;display:block;height:7.778px;max-width:none;transform:rotate(90deg)}
```

Intro guide results (Figma `bottom` values 448.22 / 451 / −169.31 / −231.31 converted to top):
- left inner: dash x≈159.5, y41→332, tick at y≈334–342 (sits on the section border line at x160).
- right inner: dash x≈1263.5, y42→333, its tick is opacity 0 (invisible).
- right outer: dash x≈1294, y49→704 (stops at tabs bar), tick at y≈333; 2nd tick y≈951 (clipped).
- left outer: dash x≈131, y49→786, tick at y≈334; 2nd tick y≈1013 (clipped).

Intro → tab-1 morph (for scroll animation): heading block (y48–331) collapses/leaves; section top 331→90, h670→694;
card h609→633, text block h371→395; label 16px Medium sentence-case → 14px uppercase +0.56 tracking (h19→17);
link 16px→20px, arrow 13.79→20.5 (+pt2 wrapper), link y 312→331; H3 loses the period; tabs bar x160/w1264/bottom0 →
x161/w1263/bottom1 and first tab gains border-left once inactive; inner guides 295/291 → 44px tick groups
(tick moves y≈334 → ≈91); outer guides 904→678 (right) and 966→738 (left) with first tick y≈333 → ≈91/92.
Header layout also changes (logo 464→400, link cols 160→170.67, Start-an-order gains border-left + tick).

## 3. 612:6967 "Features -> Services"

Verified via get_design_context + get_metadata + get_motion_context (no keyframes): **visually identical to tab 4
(545:6042)** – same text, same node geometry to the 0.01px, same images (byte-identical tab4 photo + overlay), same
tabs bar (Brokers active), same header, same 4 guides (left short group uses the …102 asset instead of …103, renders
identically). It is a duplicate "hold"/source keyframe placed at the end of the tab row on the canvas
(row y=2408: tab1 x1621 … tab4 x6089, this frame x7581); Services state 1 (538:5633) sits at x129,y3414, directly
below the intro frame (x129,y2386). So the in-between state carries no extra geometry: animate tab-4 → Services directly.

What changes tab-4 → Services 538:5633 (same 1424×784 bordered frame, same header):
- Features content (section y90–784: card x160–1264 / y91–724 with text col 160–712, image col 712–1264; tabs bar
  x161–1424 / y703–783) is replaced by a 3-column full-width grid: col1 x0–474, col2 x474–948.5, col3 x948.5–1422,
  all y0–783 (content from y48).
- col1: "our services" label at (40, 240) 94×17; H2 "Everything you need for a confident closing" at (40, 267) 393×144
  (3 lines of 44/1.1); list of 4 rows 472×72 at y=495/567/639/711 (Title insurance, Escrow & Closing,
  Residential Services, Commercial Services; text x=40, y+26.5). The Features tabs bar (horizontal, bottom-right)
  conceptually becomes this vertical list (bottom-left).
- col2: "Illustration / 01" plat-map vector at (474,48) 473.5×735 (replaces the photo column, which was x712–1264).
- col3: "Title Insurance" H3 at (988.5, 276), description at (988.5, 327) 393.5×64, link "Explore Title Insurance"
  (20px + 20.5 arrow) at (988.5, 415).
- Guides: Services metadata has no guide groups → the 4 Features guides (x≈131, 160, 1264, 1294) disappear.
- Services Menu is at x=1 w=1423 (links 170.5) vs Features x=0 w=1424 (170.67) – negligible.
- Services has a hidden bottom bar (Start an order / Find a location / >>>) – ignore.
