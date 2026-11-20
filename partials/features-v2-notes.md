# Features v2: Figma notes (designer redo, file 6z3ldwHkiRRSwd1lwrPSWb)

Eight "Features" frames (1440x800), time order left to right:

| alias | node | role |
|---|---|---|
| F1 | 677:37473 | line splits in two, hero leaves, CTA buttons empty |
| F2 | 677:37552 | lines at the card edges, title rising, 4 empty tab cells |
| F3 | 677:37577 | title at its final place, card rising, tab 1 filling black |
| F4 | 677:37602 | **Features intro** (replaces 528:4855) |
| F5 | 677:37627 | **Tab 1** Real estate agents (replaces 532:5127) |
| F6 | 677:38452 | Tab 2 Buyers & sellers |
| F7 | 677:38525 | Tab 3 Lenders (**new safe photo**) |
| F8 | 677:38598 | Tab 4 Brokers |

**Coordinates.** All numbers are **inner-frame px**. The inner bordered frame is **1424x784 at artboard (8,8)** in all 8 frames, the same as hero C/D/E:
inner (x,y) = artboard (x-8, y-8). Content row: F1/F2 use a 1422x783 row at **(1,1)** (overflow clip), and F3–F8 use a 1424x783 row at **(0,1)**.
The **Buttons/Tabs bar is outside the inner frame**, in the artboard, painted **after the Texture**. It is always 80 tall at artboard y 712, so inner **y 704→784** (bottom:0).

**1px lines drawn as rotated SVG** (`left:L`, w0, inner 1px img rotated -90deg) cover the pixel column **[L-1, L]**. The tables give that column.
In CSS, a 1px `div` at `left:L-1` gives the same result. Strokes: `rgba(0,0,0,.16)` = border-default, `#000` = border-strong.

---------------------------------------------------------------------------------------------------
## 0. Assets

| file | md5 | status |
|---|---|---|
| `assets/features/tab3-photo-safe.png` (2048², RGB, opaque) | b51433996cbc… | **NEW.** The safe in a field, F7 overlay. A render check against the Figma node export gives a mean diff of about 1.5/255 |
| `assets/features/line-solid-655.svg` (655x1, solid .16) | 2d861f28… | NEW. Line 63, left card edge, F2–F8 |
| `assets/features/line-solid-656.svg` (656x1, solid .16) | 2480566b… | NEW. Line 62, right card edge, F2–F8. Same geometry as `hero/col-line-656.svg`, only the id differs ("Line 72"), so either file works |
| `assets/features/line-dashed-737.svg` (737x1, dash 6 6, .16) | f8da77c9… | NEW. Line 61, left outer guide, F3–F8 |
| `assets/features/line-dashed-655.svg` (655x1, dash 6 6, .16) | cddf3f68… | NEW. Line 65, right outer guide, F3–F8 |
| `assets/features/row-dash-712.svg` (712x1, `<line>` dash 6 6, .16) | be78cc67… | NEW. The dashed line under BenefitRow 3. The existing `common/line-dashed-712.svg` is a path with a 3.017 half-dash start, so it is the same look with a different dash phase. Keep the old one if a 3px phase shift doesn't matter |
| `assets/hero/hero-photo-full.png` | e025fb0f… | **Existing.** F1 photo (render diff about 1.4/255) |
| `assets/features/tab1-photo.png` / `tab1-photo-overlay.png` | 57b958bd… / 100da526… | Existing. Door base crop, key cover |
| `assets/features/tab4-photo-overlay.png` | 62c99813… | Existing. The F8 visible (top, opaque) layer matches it (render diff about 1.7/255) |
| `assets/features/arrow-right-accent-14.svg` | | Existing. Figma's copy differs by 0.002px |
| `assets/hero/texture-stripes-o06.svg` | | Existing. The F5 texture export is identical except for the clip id. Stroke-opacity .06 |
| `assets/common/arrow-right-inverse.svg` (20px) | | Existing. Arrow of the old "Start an order" button, still present in F1–F3 |

Not saved: the Figma subtree also holds 512² thumbnails of door and safe, plus a 2048² near-copy of the night building (b107d88a…, mean diff about 7/255 vs
`tab4-photo-overlay.png` at 1024). None of them is the visible pixel source, so they are not needed.
The old guide SVGs (`guide-*.svg`, `intro-guide-*.svg`, ticks baked in) are **no longer used by v2**.

---------------------------------------------------------------------------------------------------
## 1. Transition frames F1–F4

### 1a. Vertical lines
| frame | line | px column | top→bottom | style |
|---|---|---|---|---|
| hero E (612:6831) | column line | 710–711 | 48→783 | solid .16 (one line) |
| **F1** | left (border-right of the left block 677:37689) | **670–671** | **48→784** | solid .16 |
| F1 | right (border-left of the stats block 677:37695) | **752–753** | **48→704** (stops at the buttons top) | solid .16 |
| **F2** | Line 63 (`left:156` in row at x1 → L 157) | **155–156** | 49→704 | solid .16 |
| F2 | Line 62 (L 1268+1 → 1269) | **1267–1268** | 48→704 | solid .16 |
| **F3–F8** | Line 61 (L 130) | **129–130** | 49→786 (clipped at 784; passes left of the tabs) | **dashed 6/6** .16 |
| F3–F8 | Line 63 (L 158) | **157–158** | 49→704 | solid .16 |
| F3–F8 | Line 62 (L 1268) | **1267–1268** | 48→704 | solid .16 (behind the photo from y 95 down in F5–F8: the photo column is painted over it) |
| F3–F8 | Line 65 (`right:127` → L 1297) | **1296–1297** | 49→704 | **dashed 6/6** .16 |

The lines are the first children of the content row, so the card and photo paint over them. The text column has no background, so Line 63 shows through it.
"The line doubles and opens from the middle": 710 → (670 | 752) → (155 | 1267) → (157 | 1267). The split is not symmetric: -40 on the left and +42 on the right in F1.

### 1b. Ticks (F3–F8 only, children of the content section, 7.778 box, 2x9 rect `#ACACA7`, `rotate(45deg) scaleY(-1)`, a "\" mark)
Box `top = sectionTop − 4.36` (centre on the section's top border). Box lefts **153.94 / 125.94 / 1292.00** (centres x 157.83 / 129.83 / 1295.89).
There is no tick on the right solid line.
| frame | section top (border y) | tick box top | centre y |
|---|---|---|---|
| F3 | 532 | 527.64 | 531.5 |
| F4 | 332 | 327.64 | 331.5 |
| F5–F8 | 94 | 89.64 | 93.5 |

### 1c. Horizontal lines
- Header bottom border y 47→48 (.16) in every frame.
- F1: none in the content. Buttons top border at y 704, x 712→1424, **.16**. In hero E the ghost button top was #000.
- F2: buttons top border at y 704, x 157→1424, .16.
- F3: section border-top **y 532**, full width x 0→1424 (.16), clipped by the content column 49→704. Tabs top border at y 704 is **#000**.
- F4: section border-top **y 332**. F5–F8: **y 94**. BenefitRow top borders are 1.149 .16. The dashed row line is under row 3 (y 664 in F5–F8).

### 1d. Hero leftovers (F1 only, gone in F2)
| element | hero E | **F1** |
|---|---|---|
| left block 677:37688 | — | **(-39, 48) 711x736, bg primary**, contains col 710 (border-r) + photo |
| H1 (Coconat 56/1.1, 574 wide, 2 lines) | (41, 303.5) | **(1, 304)**, opacity 1 (col: flex centred, pb100, H1 at col (40,256)) |
| photo window | (1, 542.156) 412x240.844 | **(-39, 592) 328.445x192** (bottom 784; visible x 1→289.4 because of the row clip) |
| photo img (hero-photo-full, cover) rel. window | -206.277, -55.193, 824.557x337.294 | **-164.445, -44, 657.334x268.889** (wrapper 632.889 at -152, img at wrapper -12.445) |
| photo scale | 0.55751 | **0.444457** (= E × **0.79720**). Uniform: window and img both ×0.7972, bottom-left corner (1,783) → (-39,784) |
| stats block 677:37695 | column x 712 | **(752, 48) 711x656, border-l**. Rows: 712 wide at x **751** |
| 7 Regions row | -178, op .3 | -177, op .3 (off-frame) |
| 58 Years row | 47.5, op .3 | **-151.5**, op .3 (off-frame) |
| 12,000+ row | 273, **op 1, caption 1** | **74**, **op .3, caption 0** (number text at x 771, y 114) |

So the stats column moves **+39 x** and the visible rows move **-199 y**. The H1 and photo move **-40 x** with the left line.

### 1e. Title block "Who we serve" (absent in F1)
Eyebrow 14px Regular uppercase +0.56 `--text-secondary` (h17). H2 Coconat 44/1.1 -0.88 (2 lines, 594 wide, h96, at +27). Lead 16/1.6 -0.32 secondary, 416 wide (h52, at +67 x+644 in the 1100 container).
Opacity 1 in every frame where present (no fade in the frames; it is a positional rise, clipped by the content column top at y 49 / its overflow).
| frame | block box | eyebrow (x,y) | H2 y | lead (x,y) |
|---|---|---|---|---|
| F2 | (1, 421) 1424x283, px40 py80 | **(203, 501)** | 528 | (807, 568) |
| F3 | (0, 49) 1424x283, px156 py80 (content 1100 at x162) | **(202, 129)** | 156 | (806, 196) |
| F4 | same as F3 | (202, 129) | 156 | (806, 196) |
| F5–F8 | (0, **-189**) → hidden (above the content clip at y 49) | (202, -109) | -82 | (806, -42) |
| old intro 528:4855 | (0,48) | (202, 128) | 155 | (806, 195) |

F2→F3: the title rises **-372** (and x -1). F2 has no clip edge at the bottom except the block bottom at 704 = buttons top.

### 1f. Content column / section / card (F3–F8)
Content column 677:37828 etc.: (0, 49) 1424x**655** (to 704), **overflow clip**, flex column: [title block 283] [gap] [section].
| frame | column justify / gap | section (y, h, padding) | card box | visible card |
|---|---|---|---|---|
| F3 | start, **gap 200** | **532**, h670, px156 pb60, border-top .16 | **(156, 533) 1112x609** | 533→704 (171px: label + H3 + first body line) |
| F4 | start, gap 0 | **332**, h670, px156 pb60 | (156, 333) 1112x609 | 333→704 (rows are under the clip) |
| F5–F8 | **justify-end** | **94**, **h610, px156, NO pb** | **(156, 95) 1112x609** | full: 95→704 (bottom = tabs top) |

Card inside (all frames): left column **556.5** wide (555.5 + 1px border-r .16 at x 711–712). Text block p40, h371. Rows 3x66 + pb40 (238).
Image column **555.5x609 at x 712.5→1268**. **No card left/right borders.** Lines 63/62 at 157/1267 act as the edges. Card-relative positions:
label (40,40) h19 · H3 (40,75) 413x70 · body (40,161) 413x52 · link (40,312) · rows at 371/437/503 · dashed line at 569 (= under row 3).
- F4 absolute: label 373, H3 408, body 494, link 645, rows 704+ (clipped).
- F5–F8 absolute: label 135, H3 170, body 256, **link 407**, rows **466 / 532 / 598**, dashed line y 664 (x 156→868, the photo covers x > 712.5).

Card text style in **F3–F8, including all tab frames**: label **16px Medium sentence-case** `--text-tertiary` (not 14px uppercase). H3 Coconat 32/1.1 -0.64.
Link **16px** Medium -0.32 accent + **13.789 arrow in a `padding-top:2px` wrapper, gap 4** (F3 still has gap 6.895 and no wrapper, link box 203.68x19). From F4 on: 200.79x19.

Image (F3, F4, F5): base wrapper `inset:0; overflow:hidden`, img `height:110.9%; left:-6.34%; top:-9.67%; width:127.17%` (tab1-photo.png).
Then cover img `inset:0; object-fit:cover` (tab1-photo-overlay.png). It is the same as v1, but the box is now 555.5x609.

### 1g. CTA buttons → tabs bar (artboard child, above the Texture)
| frame | bar box (inner) | cells (x, width incl. borders) | borders | fill | labels |
|---|---|---|---|---|---|
| hero E | (712,704) 712x80 | 356 / 356 | btn2 border-top **#000** | btn1 **#BF5E2A** | "Start an order" #F6F6EF + 20px arrow, "Find a location" #4A4A48/#626260 |
| **F1** | (712,704) 712x80 | **357 (712→1069) / 355 (1069→1424)** | btn1 **l+r+t .16**, btn2 **t 1.005 .16** | **none (transparent, texture shows)** | btn1 text + arrow still `--text-inverse` #F6F6EF (practically invisible on #F6F6EF). btn2 text **opacity 0** |
| **F2** | **(157,704) 1267x80** | 4 cells: **317.75 / 316.75 / 316.75 / 315.75** (x 157, 474.75, 791.5, 1108.25) | c1 l+r+t, c2/c3 r+t, c4 t, all **.16** | none | c1 "Start an order" inverse + arrow (invisible). c2–c4 are copies of "Find a location" at **opacity 0** |
| **F3** | (157,704) 1267x80 | same | same sides, **#000** (border-strong) | c1: **black rect 677:37869 at cell (1,1) 113x79** → inner **x 158→271, y 705→784** (painted after the label) | same as F2 |
| **F4–F8** | (157,704) 1267x80 | same | **active**: 1px #000 on all sides. **Inactive**: border-top + border-right #000. **The first tab when inactive also has border-left**. **Brokers when inactive: border-top only** | **active #000; inactive: NO background (transparent → texture shows through)** | 16px Medium -0.32. Active `--text-inverse`. **Inactive `--text-primary` #000** (v1: secondary) |

**Mapping:** btn1 "Start an order" (357) → **tab 1** (it is the cell that fills black in F3).
btn2 "Find a location" (355) → **tabs 2, 3, 4** (the designer duplicated the ghost button 3 times, with labels at opacity 0).
The bar's left edge goes 712 → 157 and its height stays 80.

### 1h. Header, texture, z-order
- Header "Menu" in **all 8 frames**: (0,0) 1424x48, bg primary, border-b .16. Logo col **flex 464**, 5 links **160** each with 2x9 tick marks (Services `bottom:-2 left:-2`, others `bottom:0` left -1.34/-0.66/-1/-1.34).
  "Start an order" **160 wide, accent #BF5E2A, text #F6F6EF, no border-left, no tick, no arrow**. This is the same as the old intro header (528:4855). The old tab-state header (logo 400, 170.67 cols, CTA with border-left and tick) is **gone**, so the header **does not change** F1→F8.
- Texture (1440x800, stroke-opacity .06) lies **above the whole inner frame**: header (including the orange header CTA), lines, H1, photos, title, card, card images.
  It lies **below the Buttons/Tabs bar**. So: the inactive tabs and the empty F1/F2 cells are transparent and the texture shows through. The **active black tab** (and the F3 black fill) is **opaque above the texture** (no stripes on it).
  The photos are **under** the texture (as in v1). Prototype today: `.texture` z 110 over `#features`, and `#featTabs` (z 5) is under it with an opaque `--bg` on inactive tabs.
  To match: lift `#featTabs` above the texture (like `.ready .btn-row{z-index:120}`), set the inactive `.tab` background to transparent, and set the inactive text colour to `--color-text-primary`.
- Scroll-guide group (Line 71/61, ticks, "SCROLL"): still inside Buttons in F1–F3, all opacity 0. Gone in F4+.

---------------------------------------------------------------------------------------------------
## 2. Tab frames F5–F8: diff vs `features-notes.md` §1

| | v1 (532:5127 …) | **v2 (F5–F8)** |
|---|---|---|
| section | top 90, h694, px160 pb60 | **top 94, h610, px156, pb0** (it sits in the 49→704 clip column, justify-end) |
| card | 1104x633 at (160,91), 1px left/right borders | **1112x609 at (156,95)**, no own side borders (Lines 63/62 at px 157/1267). Text col 556.5 incl. border-r, image col **555.5x609 at x 712.5** |
| text block | p40 h395 | p40 **h371** (link at card y 312 → inner 407) |
| label | 14px uppercase +0.56 | **16px Medium sentence-case, -0.32** (intro style) |
| H3 | no period | tab1 "…moving with confidence**.**", tab2 "…with total clarity**.**", tab3 "…confidence, on schedule**.**", tab4 "…at any scale" (**no period**). Line breaks: same 2 lines as v1 |
| link | 20px + 20.5 arrow | **16px + 13.789 arrow, gap 4, arrow wrapper pt2** |
| body | 413, tab3 **445** | **413 for all four** (tab3 now wraps to 3 lines: "…keep your loans / compliant and your closings on time, from residential to / commercial.") |
| texts | — | label/body/link/rows are **unchanged** (see table in features-notes.md) |
| rows | 3x66, dashed 712 under row 3 | same (dash = `row-dash-712.svg`, stroke-dasharray 6 6) |
| tab1 image | door crop + key cover | same |
| tab2 image | door crop only | same |
| **tab3 image** | door crop only | door crop + **`tab3-photo-safe.png` crop: `position:absolute; height:105.13%; left:-0.85%; top:-5.13%; width:115.26%; max-width:none`** inside its own `inset:0; overflow:hidden` wrapper (opaque, so only the safe shows) |
| tab4 image | tab4-photo + tab4-photo-overlay (cover) | door crop + 2 cover layers; the visible top layer = **`tab4-photo-overlay.png`** (`object-fit:cover`) |
| tabs bar | x161 w1263, bottom 1 (y 703) | **x157 w1267, bottom 0 (y 704→784)**, cells 317.75/316.75/316.75/315.75 |
| inactive tab | bg `--bg`, text secondary, borders top+right (+left on first) | **transparent bg (texture through), text primary #000**, same border rule |
| active tab | #000, no borders | **#000 + 1px #000 border on all sides** (visually the same), above the texture |
| guides | 4 SVG groups (44px tick groups at x≈160.5/1263, outer 678/738) | 4 plain lines (dashed 129–130 & 1296–1297, solid 157–158 & 1267–1268) + 3 ticks at y 93.5 (§1a/1b) |
| header | logo 400 / 170.67 cols / CTA border-left + tick | logo 464 / 160 cols / CTA no border, no tick (as in the intro) |

The intro F4 vs old 528:4855: everything is **+1 y** (section 331 → 332, title 128 → 129). The card is 156→1268 (v1: 160→1264). The tabs are 1267 @157 (v1: 1264 @160).
The first tab gains a border and inactive tabs are transparent. The link has gap 4 + pt2. Guides as above. The intro → tab-1 morph is now **only a translateY**:
the column content moves **-238** (section 332 → 94, title 129 → -109). The card height stays 609 and the typography stays the same. In v1, the section grew 670 → 694, the label went to uppercase, and the link went 16 → 20.

---------------------------------------------------------------------------------------------------
## 3. How to animate (derived from the frames)

**hero-6 (E) → F1: "the line doubles and opens".**
- `#heroColLine` splits into two 1px lines. The left one goes 710 → **670** (48→784) and the right one goes 710 → **752**. The right one stays 48→**704**, so it never crosses the button bar.
- Everything left of the split moves **-40 x**: the H1 goes (41,303.5) → (1,304). The photo goes ×0.7972 about its bottom-left corner, from window 412x240.844 @ (1,542.156) to **328.445x192 @ (-39,592)**, with the img box ×0.7972 (-164.445,-44, 657.334x268.889).
- The stats column moves **+39 x** and **-199 y**: the 12,000+ row goes 273 → 74, its opacity 1 → .3 and its caption 1 → 0. The other rows are off-frame.
- Buttons: the accent bg of btn1 fades out, its border goes to .16 l/r/t, and its label + arrow stay `--text-inverse` (they disappear into the bg). The btn2 label → opacity 0 and its border-top #000 → .16. Widths 356/356 → 357/355.
- The header CTA is already orange (as in the current t-f0).

**F1 → F2: the lines open to the card edges.**
- The left line goes 670 → **156** (px 155–156, now 49→704) and the right line goes 752 → **1268** (48→704). That is about ±515px.
- The hero leftovers leave: they are wiped by/with the opening lines. The H1/photo exit left with the left block; the stats exit right. None of it is in F2.
- The "Who we serve" block appears **from the bottom**: eyebrow y 501 (block 421→704, bottom anchored on the bar top). In F2 it is fully visible at opacity 1, so animate it as a rise from below y 704 and clip at 704.
- The button bar widens to the left: x 712 → **157**, w 712 → 1267, and 2 cells become 4.
  - btn1 → tab-1 cell (x 157→474.75).
  - btn2 (1069→1424) splits into tab cells 2/3/4 (474.75 / 791.5 / 1108.25).
  - The borders stay .16 and there are no labels.

**F2 → F3: the title settles, the card rises.**
- The title block goes 421 → **49** (eyebrow 501 → 129, x 203 → 202).
- The left solid line moves 156 → 158. The dashed outer guides appear at px 129–130 (49→784) and 1296–1297 (49→704), as a fade or a draw from the top.
- The section with its .16 top border and the card rise from below the bar: section top → **532**, card 533→(1142, clipped at 704). This is a 200px gap under the title.
- The 3 ticks ride on the section top border (y 531.5).
- Tab borders .16 → **#000**.
- Tab 1 starts **filling black from the left**: rect x 158, w **113** of 316.75 (≈36%). Use `scaleX` from origin left, or clip-path inset right 100% → 64.3%.

**F3 → F4 (Features intro):**
- The section goes 532 → **332** (the gap closes 200 → 0), and the ticks follow (y 331.5).
- The tab-1 black fill completes to the full cell (it becomes the active-tab style: #000 + 1px #000 border).
- Tab labels fade in: "Real estate agents" inverse and the others #000. "Start an order" is gone.
- The link gap changes 6.895 → 4 with a pt2 arrow wrapper (negligible).

**F4 → F5 (Tab 1):**
- One translateY of the whole column content: **-238** (section 332 → 94, title 129 → -109 under the header/clip, ticks 331.5 → 93.5).
- The card is the same box, so it now shows fully (rows 466/532/598).
- Nothing else changes: same labels, same tabs, same header, same lines.

**F5 → F8:** discrete `setTab()` as now (text swap + image reveal), with these changes:
- Tab 3 image = door + **safe** (new `.fm` layer with the crop CSS above).
- Tab 4 = `tab4-photo-overlay.png`.
- Inactive tabs are transparent with #000 text.
- H3 periods on tabs 1–3.
- All bodies 413 wide.

**Impact on current `main.js` (for the implementer):**
- t-f0 must be rebuilt around the split lines and the bar morph (`#heroBtns` → `#featTabs`, or animate a shared bar).
- `#fgIntro`/`#fgTabs` are replaced by the 4 lines + 3 ticks, which are static from F3 on and move only with the section (ticks) or not at all (lines).
- `featArea` geometry becomes left 156 / width 1112 / card h609. In t-f1, only the y changes (top 332 → 94). Drop the label/link/dot morphs and the featTabs width/bottom tween.
