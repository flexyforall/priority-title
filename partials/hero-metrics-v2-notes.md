# Hero Metrics v2: Figma notes (designer update)

File `6z3ldwHkiRRSwd1lwrPSWb`. Every number comes from `get_metadata` and `get_design_context` for the five "Hero Metrics" frames
(1440x800). Time order on the canvas, left to right:

| alias | node | inner frame (artboard pos, size) | role |
|---|---|---|---|
| REST | 638:29573 "Hero - Progress bar" | (8,10) 1424x782 | hero at rest (JS label `hero-1`) |
| A | 595:6527 | (8,10) **1424x782** | hero moves left, guides fade out |
| B | 612:6755 | (8,10) **1424x782** | photo shrinks, stats column appears |
| C | 595:6669 | (8,8) **1424x784** | photo bottom-left, "7 Regions" highlighted |
| D | 528:4762 | (8,8) **1424x784** | "58 Years" highlighted |
| E | 612:6831 | (8,8) **1424x784** | **NEW: "12,000+" highlighted** (it used to be identical to D) |

Unless noted otherwise, coordinates are **inner-frame px**: inner (x,y) = artboard (x-8, y-10) for REST/A/B and (x-8, y-8) for C/D/E.

The designer's intent: the hero slides left. The column line on the right must stop at the buttons instead of showing through them.
ONE photo moves smoothly to the bottom-left corner and sits above the H1. The scroll guides fade out by opacity. 12,000+ gets its own step.

---------------------------------------------------------------------------------------------------
## 1. Assets

| file | md5 | what |
|---|---|---|
| `assets/hero/hero-photo-full.png` (existing, 1024x361) | e025fb0f… | **The only photo, in all five frames.** Each frame's export has the same md5. `hero-photo-small-a.png`, `hero-photo-small-b.png` and `hero-photo-small-b-595-6669.png` are **no longer used** |
| `assets/hero/col-line-656.svg` (**new**) | 1213c52e… | Line 72 in frame A: 656x1, solid, stroke black @0.16, drawn rotated 90deg. A 1px `div` with bg `rgba(0,0,0,.16)` gives the same result |
| `assets/hero/texture-stripes-o06.svg` (**new**) | 4d745192… | Texture: the same paths as `common/texture-stripes.svg`, but **stroke-opacity 0.06 instead of 0.04**. The REST frame 638:29856 also exports 0.06, so the designer raised the texture everywhere |
| `assets/hero/scroll-line-v-28-c5.svg` / `scroll-line-h-712-c5.svg` (existing) | b3d14…/df9c7… | Line 71 / Line 61. The md5 matches the exports from A |

---------------------------------------------------------------------------------------------------
## 2. Per-frame table

### 2a. Photo (a single `<img>` of hero-photo-full.png, object-fit cover, inside an overflow-hidden window)
| frame | window box (x, y, w, h) | img box relative to the window (x, y, w, h) | img scale vs 1479x605 |
|---|---|---|---|
| REST | 0, 48, 1424 x 432 | -28, -99, 1479 x 605 | 1 |
| A | 0, 48, **1082** x 432 | **-199**, -99, 1479 x 605. Wrapper 1424 at x -171, img at wrapper -28 | 1 |
| B | **150, 223, 542.275 x 317** | **-271.504, -72.646, 1085.285 x 443.947**. Wrapper 1044.926 at x -250.959, img at wrapper -20.545 | 0.73380 |
| C | **0, 543.156, 412 x 240.844** (bottom = 784, flush with the frame bottom) | **-206.277, -55.193, 824.557 x 337.294**. Wrapper 793.894 at x -190.669, img at wrapper -15.608 | 0.55751 |
| D | **1, 542.156, 412 x 240.844** (bottom = 783) | same as C | 0.55751 |
| E | 1, 542.156, 412 x 240.844 | same as C | 0.55751 |

- **B → C is a pure uniform scale**: window and image both scale by 412/542.275 = **0.759762** (both have aspect ratio 1.71064).
  It can run as one `transform: translate() scale()` on the window. With the origin at the top-left: scale 0.759762 and translate from (150,223) to (0,543.156).
- REST → A only narrows the window: the right edge moves 1424 → 1082 and the image moves 1px (-28 → -199 = -171 + -28).
- **Z-order: the photo is ABOVE the H1** in B, C, D and E. Its node comes after the H1 block, and in B its bottom (540) covers the top of "A safer way…" (H1 top 520).

### 2b. H1 / subtitle / timeline overlay
| frame | H1 box (x, y), 574 wide | H1 lines | subtitle | timeline overlay ("Open order…" plus progress line) |
|---|---|---|---|---|
| REST | (40, 520) in block 0,480 1424x302 | auto-wrapped | (40, 678) opacity 1 | present |
| A | (40, 520) in block 0,480 **1082**x302 | auto | (40, 678) **opacity 1** | absent |
| B | (40, 520) in block 0,480 709x302 | auto | **opacity 0** | absent |
| C | **(40, 304.5)**. Col 595:6673 is at (0,49) 710x735, flex centred, pb100 px40, and the H1 sits at y 255.5 inside it | "A safer way to finalize" / "real estate deals." | node hidden | absent |
| D | **(41, 303.5)**. Same column at (1,48) | 2 lines | hidden | absent |
| E | (41, 303.5) | 2 lines | hidden | absent |

H1: Coconat 56/1.1, tracking -1.12. Subtitle: Overused Grotesk 20/1.6, tracking -0.4.

### 2c. Vertical column line (rgba(0,0,0,.16), 1px)
| frame | x (pixel column) | top → bottom | source | notes |
|---|---|---|---|---|
| REST | — | — | — | none |
| A | **1081** (1081–1082) | **47 → 703** (h **656**) | **Line 72** 677:36918: `right:1px; top:-1px; h656` in the 1082 container at (0,48) | **The line stops at the buttons**: the button top is y 702 (artboard 712). The line ends at 703, so it only touches the ghost button's black top border and does not run through the button. The photo paints over the line for y 48–480, so you see it from 480 to 702 |
| B | **709** (709–710) | 48 → 782 (h 734) | border-right of the 710-wide left column 612:6757 | Left of the buttons (x 712), so it can run to the bottom |
| C | **709** | **49 → 784** (h 735) | border-right of 595:6673 (row 595:6671 at **(0,1)**) | |
| D | **710** | 48 → 783 (h 735) | border-right of 538:5455 (row 538:5443 at **(1,0)**) | |
| E | 710 | 48 → 783 | same | |

### 2d. Stats column (rows 711x128, px20 py40; number Coconat 44/1.1 -0.88; caption Overused Grotesk 24/1.6 -0.48, black)
| frame | column (x, y) | row tops R / Y / 12k (inner) | row opacity R / Y / 12k | caption opacity R / Y / 12k | highlighted |
|---|---|---|---|---|---|
| REST, A | — | absent | | | |
| B | (711, 0) 711x783, absolute rows | **495 / 720.5 / 946** | **.3** / .4 / .4 | 0 / 0 / 0 | none |
| C | **(713, 1)**: second flex child of the 1424 row, justify-between | **276 / 501.5 / 727** (275 / 500.5 / 726 inside the column) | **1** / **.3** / **.4** | **1** / 0 / 0 | 7 Regions |
| D | (712, 0): flex column, justify-between, pt48 pb156 | **48 / 273.5 / 499** | **.3** / **1** / **.3** | 0 / **1** / 0 | 58 Years |
| E | (712, 0), absolute rows | **-178 / 47.5 / 273** | **.3** / **.3** / **1** | 0 / 0 / **1** | **12,000+** |

Row step: 225.5. Column shift per step: B→C **-219** (and x +2), C→D **-228** (and x -1), D→E **-226**.
The highlighted row lands at about y 273–276 in C, D and E. In E, 12,000+ (273–401) takes the slot 58 Years had in D (273.5–401.5),
and the 7 Regions row (-178…-50) is above the frame and hidden. "58 Years" uses `align-items:flex-end` (caption y +50), the other rows centre.

### 2e. Buttons block (artboard child "Buttons", **outside** the inner frame, painted after the Texture)
- **Artboard (720, 712) 712x80 in every frame** (`right:8px; bottom:8px`). In inner coordinates that is (712,702) in REST/A/B and (712,704) in C/D/E.
  **There is no -5.11 shift any more.**
- btn1 356x80: bg #BF5E2A, "Start an order" #F6F6EF 20/1.2 -0.4 at (107,28), **20px** arrow in every frame (the 20.504 arrow from the old 784-tall states is gone).
- btn2 356x80: no bg, border-top 1.005 #000, "Find a location" #626260 (the token fallback; the project uses #4A4A48) at (118,28).

### 2f. Scroll guides (group 2087330099 inside Buttons: Line 71, Line 61, 2 ticks, "SCROLL ↓")
Geometry relative to Buttons is **identical in all six frames**. It never moves:
- Line 71: dashed #C5C5BF 28px, vertical, `left:-0.11; top:-28` → inner x 711.89, y 674→702 (REST)
- Line 61: dashed #C5C5BF 712px, `left:-1.11; top:-29` → inner y 673, x 710.89→1422.89
- ticks: 7.778 boxes, 2x9 #C5C5BF rotated 45deg, `bottom:104.61`, `left:-4` / `right:-4.3` → inner top 669.61, x 708 / 1420.52
- label: `left:325.89; top:-52` → inner (1037.89, 650). 14px uppercase, tracking 0.56, #C5C5BF, plus a 14px arrow rotated 90deg

| frame | Line 71 | Line 61 | ticks | label |
|---|---|---|---|---|
| REST | 1 | 1 | 1 | 1 |
| A, B, C, D, E | **0** | **0** | **0** | **0** |

So the guides **fade out during REST → A** and stay hidden.

### 2g. Texture, header, frame
- Texture (1440x800 at artboard 0,0; Stripes vector x -800, 3040x800) is in every frame, layered **above the inner frame and below Buttons**.
  It covers everything except the Buttons block. Stroke-opacity is **0.06** (see §1).
- Header: in REST/A/B it is "Menu" at (0,0) 1422x48, border-bottom .16, **no bg**. In C/D/E it is "Header" at **(1,1)** 1422x48 with **bg primary**
  and border-bottom .16, and the CTA arrow is hidden. This is unchanged from v1.
- Inner frame: 782 tall at (8,10) for REST/A/B, 784 tall at (8,8) for C/D/E. This is unchanged from v1.
- Content-row inset: **C uses (0,1)**, row 595:6671 `left:0; right:0; top:1px`, 1424 wide. **D and E use (1,0)**, `left:1px; right:1px; top:0`, 1422 wide.
- No horizontal separator under the photo in REST or A: the photo frame has no border.

---------------------------------------------------------------------------------------------------
## 3. Differences vs v1 (`loader-hero-notes.md` §B)

1. **Single photo.** v1 crossfaded a "small" composite (small-a crop plus small-b fill, 399x242) in 595:6669, 528:4762 and 612:6831.
   v2 uses **one** `hero-photo-full.png` everywhere, in a **412 x 240.844** window. In C it is at (0,543.156) and in D/E at (1,542.156).
   v1 had (1,541) / (3,541) at 399x242.
2. **A width**: the photo window and left block are **1082** wide (v1: 1079). The img x is **-199** (v1: -200).
3. **Column line in A**: it is a separate **Line 72 at x 1081, y 47→703 (h656)** that **stops at the button top**.
   v1 had the column border at x 1079 running the full 734px down through the ghost button.
4. **Column line in C** is at **x 709**, y 49→784 (v1: 710 with the +1 inset). D/E are at **x 710**, y 48→783.
5. **Buttons and guides are no longer shifted** -5.11px in A/B. The buttons stay at artboard (720,712) in all frames.
6. **Scroll guides**: v1 kept them visible in every frame (label at .2). v2 sets **all of them to opacity 0 from A on**, positions unchanged.
7. **Stats opacities**: dimmed rows are now **.3** in most places. B: Regions .3. C: Years .3 and 12k .4. D: Regions .3 and 12k .3. v1 used .4 everywhere.
8. **Stats x in C is 713** (v1: 712). The rows are at y 276/501.5/727 inner, because the column is at y 1 in C.
9. **H1 in C is at (40,304.5)** (v1: 41,303.5). D/E keep (41,303.5).
10. **C content row is at (0,1)**. **D/E rows are at (1,0)** (v1 used a left 1 inset in all 784-tall states).
11. **NEW state E (612:6831)**: 12,000+ highlighted, rows -178/47.5/273, opacity .3/.3/1, captions 0/0/1. In v1, 612:6831 was identical to 528:4762.
12. **Texture opacity 0.04 → 0.06**, also in REST.
13. **Photo above the H1** in B–E, by z-order.

---------------------------------------------------------------------------------------------------
## 4. Differences vs what `js/main.js` animates now

Label mapping today is `hero-1` = 512:4618, `hero-2` = 595:6527, `hero-3` = 612:6755, `hero-4` = 595:6669, `hero-5` = 528:4762 = 612:6831.
In v2, **E is a separate state**, so the hero needs **6 labels**: `hero-1` (REST), `hero-2` (A), `hero-3` (B), `hero-4` (C), `hero-5` (D), **`hero-6` (E)**.
Add `t-h6` and `hero-6`, add 'hero-6' to the keyboard `names` list, and start `t-f0` from E.
**No 7th state is implied**: E completes the Regions → Years → 12k sequence, and the next frame is Features intro 528:4855.

JS values below are hero-local. JS shifts `#hero` by `top:1` from t-h4 on. In C, hero-local = inner minus (0,1). If D/E move `#hero` to `left:1, top:0`, hero-local = inner minus (1,0).

### t-h2 (REST → A)
| what | JS now | v2 |
|---|---|---|
| media width | 1079 | **1082** |
| heroImg left | -200 | **-199** |
| colLine | fromTo left 1424→**1079**, top 48, h 734, opacity 0→1 | → **left 1081, top 47, height 656** (bottom 703 = button top). It must never extend below 702 while it sits over x ≥ 712 |
| sep | width → 1079 | there is no separator in REST or A in Figma. Check whether `#heroSep` should exist at all; if kept, its width is 1082 |
| btns, guides | x → -5.11 | **remove** (buttons fixed) |
| guides | (stays visible) | **opacity → 0** (whole `#heroGuides`: vline, h line, c5 copies, ticks, `#scrollHint`) |
| timeline | opacity 0, y -12 | same (absent in A) |

### t-h3 (A → B)
| what | JS now | v2 |
|---|---|---|
| media / heroImg | 150,223 542.275x317 / -271.5,-72.646 1085.285x443.947 | unchanged ✓ |
| colLine | left 709 (height stays 734) | **left 709, top 48, height 734**. From A's h656 the line must not grow below 702 while x > 712. For example, move x first, or grow the height only in the last part of the tween |
| stats | y 447, opacity 1, all rows .4 | y 447 ✓. **Regions row opacity .3** (Y and 12k .4) |
| sub | opacity 0 | ✓ |
| z-order | `.hero-title` z 4 > `.hero-media` z 2 | **photo must be above the H1** (Figma B shows the photo covering the top of the H1) |

### t-h4 (B → C)
| what | JS now | v2 |
|---|---|---|
| frame | top 8, h 784 | ✓ |
| hero / menu | hero top 1; menu 1,1 | ✓ (C row is at (0,1)) |
| media | left 1, top 541, 399x242 | **left 0, top 542.156, 412 x 240.844** (hero-local, with hero top 1). That is inner (0,543.156), flush with the bottom |
| heroImg | -110,-45 620x254, then crossfade `#heroSmall` | **-206.277, -55.193, 824.557 x 337.294**, with **no `#heroSmall` crossfade** (drop `#heroSmall`/`#heroSmallB1`). B→C can be one uniform scale ×0.759762 |
| title | left 41, top 303.5 | **left 40**, top 303.5 hero-local (= inner 304.5) |
| colLine | left 711, h 735 | **left 709**, top 48, h 735 (inner 49→784) |
| stats | y 227 (x 712) | y 227 ✓, but **x 713** (+1) |
| stat opacities | R 1 (cap 1), Y .4, 12k .4 | R 1 (cap 1), **Y .3**, 12k .4 |
| btns/guides x 0, guides y -2 | | not needed (no shift; guides invisible) |

### t-h5 (C → D)
| what | JS now | v2 |
|---|---|---|
| row inset | (hero stays top 1) media left 3 | the row moves to **(1,0)**. Either tween `#hero` {left:1, top:0}, or shift each element by (+1,-1) |
| media | left 3, `#heroSmallB2` fade in | inner **(1, 542.156)** 412x240.844. No B2 fade |
| title | (41,303.5) | inner (41, 303.5) |
| colLine | 711 | inner **x 710**, 48→783 |
| stats | y 0 | inner rows 48/273.5/499, column x **712** |
| stat opacities | R .4 (cap 0), Y 1 (cap 1), 12k .4 | **R .3**, Y 1 (cap 1), **12k .3** |

### t-h6 (D → E), NEW
- stats column shifts **-226**: rows -178 / 47.5 / 273 inner.
- Y → opacity **.3**, caption → 0. 12k → opacity **1**, caption → **1**. R stays .3, caption 0.
- Everything else (photo, H1, colLine, buttons, header) is identical to D.
- `t-f0` then starts from stats y = -226. Today it tweens from y 0 to -340, so the end value must be adjusted if the same travel is wanted.

### Other
- Texture asset: switch to `assets/hero/texture-stripes-o06.svg` (0.06) to match Figma, or keep 0.04 if that was a deliberate earlier choice.
- `assets/hero/arrow-right-20-5.svg` and the small-photo PNGs are no longer used by the hero states.
