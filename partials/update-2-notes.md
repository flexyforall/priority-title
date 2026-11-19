# Update 2: texture, button area, loader v2, hero progress bar (Figma notes)

File `6z3ldwHkiRRSwd1lwrPSWb`. All numbers come from `get_design_context` / `get_metadata` and the exported SVGs. Where a value
was checked against pixels in a Figma screenshot at 1440x800 (1x), that is stated.
"abs" means frame coordinates (the 1440x800 artboard). "inner" means relative to the 1424x782 inner frame at abs (8,10).

## 0. Asset map (new files only; md5 checked against everything already in `assets/`)

| file | source node(s) | native size | notes |
|---|---|---|---|
| `assets/common/texture-stripes.svg` | Texture 638:29764 (+ the identical copies, see 1a) | 1440 x 800 | diagonal stripes, clip-path 0 0 1440 800. Every frame exports the same file (ids differ only) |
| `assets/loader/letter-p-grey-v2.svg` | 638:29375 "Group 2087330105" (638:29300) | 78 x 105 | black stroke-width 2, masked (1px inside), with a new solid silhouette fill `#F6F6EF` |
| `assets/loader/letter-p-orange-v2.svg` | 638:29376 (501:4439) = 638:29380 (501:4479), same geometry | 78 x 105 | `#BF5E2A` stroke-width 4, masked (2px inside), with the same silhouette fill |
| `assets/loader/guides-perspective-v2-loader1.svg` | 638:29364 (638:29300) | 1490.98 x 878.875 | perspective guides, `<g opacity=.7>`, lines black at 0.16 |
| `assets/loader/guides-perspective-v2-step2.svg` | 501:4458 (501:4439) | 1480.97 x 880.875 | |
| `assets/loader/guides-perspective-v2-step3.svg` | 501:4480 (501:4479) | 1485.97 x 880.875 | |
| `assets/hero/progress-track.svg` | 638:29460 (progress frame 2) | 1424 x 7.778 | white dashed track + 4 white ticks. Line 62 has zero length here, so this is effectively the track only |
| `assets/hero/progress-fill-87.svg` | 638:29523 (frame 3) | 1424 x 7.778 | track + solid line 0→87 |
| `assets/hero/timeline.svg` (already existed) | 638:29397 (frame 1) and 638:29586 (frame 4) | 1424 x 7.778 | track + solid line 0→419. The export is byte-identical to the existing file |
| `assets/hero/progress-fill-1017.svg` | 638:29649 (frame 5) | 1424 x 7.778 | track + line 0→1017 |
| `assets/hero/progress-fill-1424.svg` | 638:29712 (frame 6) | 1424 x 7.778 | track + line 0→1424 (full) |
| `assets/hero/scroll-line-h-712-c5.svg` | Line 61 in the Buttons group (638:29804 etc.) | 712 x 1 | dashed, stroke `#C5C5BF` solid. It replaces `common/line-dashed-712.svg` (black at 0.16) in the progress frames |
| `assets/hero/scroll-line-v-28-c5.svg` | Line 71 (638:29803 etc.) | 28 x 1 | dashed, `#C5C5BF`. It replaces `common/line-vertical-28.svg` |
| `assets/common/arrow-right-scroll-c5.svg` | arrow-right 638:29809 etc. | 14 x 14 | stroke `#C5C5BF`. It replaces `common/arrow-right-scroll.svg` |

Re-exports that were byte-identical to files already in `assets/`, so no new file was saved:
- `loader/frame-lines-step2.svg` (501:4440), `frame-lines-step3.svg` (501:4487) and `frame-lines-step4.svg` (501:4517) are unchanged.
- `hero/timeline-empty.svg` (612:7206 and 562:6457) is unchanged.
- `hero/line-vertical-655.svg`, `common/line-dashed-712.svg`, `common/arrow-right-inverse.svg`, `common/arrow-right-scroll.svg`, `loader/logo-hidden-32.svg` and `common/logo.svg` are unchanged.
- The hero photo in all 6 progress frames is the same bytes as `hero/hero-photo-full.png` (1024x361). Only its box changes in frame 1 (see 2d).

No figma.com URL is referenced anywhere in `assets/`.

---------------------------------------------------------------------------------------------------
## 1. TEXTURE

### 1a. Node and structure
- Structure: frame **"Texture"** 1440x800 → inner frame "Texture" 1440x800 at 0,0, which clips → vector **"Stripes"** at **x -800, y 0, 3040 x 800**.
  It is a vector, not an image fill, so there is no tile, crop or fill mode and no scale. The rotation is 0; the lines themselves are drawn diagonally.
- Geometry (from the SVG): **449 parallel straight strokes**, each going from `(x, 800)` to `(x+800, 0)` for x = -800, -795, …, 1440.
  That is 45° with the "/" orientation, a **5px horizontal pitch** (3.536px measured perpendicular to the lines), and the lines satisfy **x + y = 5n**
  (one line passes through the frame's top-left corner).
- Paint: `stroke="black" stroke-opacity="0.04"`, stroke-width **1** (the default), butt caps. Layer opacity 1, **blend mode normal**
  (the export has no mix-blend-mode and no group opacity). Clipped to 0 0 1440 800.
- Pixel check in 638:29573: bg 246/246/239, and the darkest stripe pixel is 237/237/232 (about 4% black). The pattern repeats every 5px in x.
- Node ids per frame: 638:29764 (in 638:29300), 638:29772 (501:4439), 638:29776 (501:4479), 638:29780 (501:4508),
  638:29784 (562:6444), 638:29788 (638:29384), **638:29812 (638:29447, see below)**, 638:29834 (638:29510), 638:29856 (638:29573),
  638:29878 (638:29636), 638:29900 (638:29699).

### 1b. Where it sits (z-order)
| frame | parent and position | above it | below it (covered by the stripes) |
|---|---|---|---|
| 638:29300 Loader 1 | child of the outer 1440x800 frame, at abs 0,0, **last child** | nothing | everything: outer bg, the 1px frame border, guides, grey P |
| 501:4439 step 2 | child of the frame, abs 0,0, last | nothing | clip window, guides, frame lines, orange P |
| 501:4479 step 3 | abs 0,0, last | nothing | clip window (guides + P), frame lines |
| 501:4508 step 4 | abs 0,0, last | nothing | the hero skeleton window, frame lines |
| 562:6444 Loader → Hero | child of the outer frame, abs 0,0, last | nothing | the whole inner frame, including the button outlines and button 2's `#F6F6EF` bg |
| 638:29384, 638:29510, 638:29573, 638:29636, 638:29699 (progress 1, 3–6) | child of the outer frame at abs 0,0, **between** the inner frame and the new **"Buttons"** frame | **Buttons** (orange btn, transparent "Find a location" btn, scroll guides) | outer 8px margin, the 1.5px frame stroke, menu, photo, timeline overlay, H1, subtitle |
| **638:29447 (progress 2)** | child of the **inner** frame 638:29448 at inner (-8,-9), i.e. **abs (0,1)**, so it is clipped by the inner frame | Buttons 638:29815 (also inside the inner frame) | menu, photo, timeline, text. The 8px outer margin shows **no** texture in this frame (pixel-checked) |

Opaque layers above the texture (these hide it): only the **orange "Start an order" button** (`#BF5E2A`, 356x80) and the **scroll guides**, which are now
solid `#C5C5BF`. Transparent layer: **"Find a location"** has **no background** now, so the stripes show through it (pixel-checked at abs 1300,760).
The header/menu has no bg and the photo sits under the texture, so the stripes show over the photo too (at 4% black they are barely visible).
Nothing in the loader frames is above the texture.

### 1c. CSS
Option A (exact, preferred), with one layer per artboard. Put it after the hero content and before the button row; in the loader, put it last:
```html
<img class="texture" src="assets/common/texture-stripes.svg" alt="">
```
```css
.texture { position:absolute; left:0; top:0; width:1440px; height:800px; pointer-events:none; }
/* hero: z-index below .btn-row (the buttons must paint above it); loader: above everything */
```
Option B is the same thing as a background:
```css
background-image:url(assets/common/texture-stripes.svg); background-size:1440px 800px; background-position:0 0; background-repeat:no-repeat;
```
Option C is a size-independent approximation with the same phase (lines at x+y=5n, 1px wide, pitch 5/√2 = 3.5355px):
```css
background-image:repeating-linear-gradient(135deg, rgba(0,0,0,.04) 0 .5px, transparent .5px 3.0355px, rgba(0,0,0,.04) 3.0355px 3.5355px);
```
For 638:29447 the texture box is (0,1) 1440x800 clipped to the inner frame. That is probably a designer inconsistency, because every other frame uses (0,0) unclipped.

---------------------------------------------------------------------------------------------------
## 2. BUTTON AREA and other hero changes (vs 512:4618)

### 2a. Structure
- Before (512:4618): the button row 512:4717 and the scroll guides 528:4839 lived inside the lower 302px block "Frame 2147225902"
  (row at inner 712,702; `right:0; bottom:0`).
- Now: the new top-level frame **"Buttons"** (638:29792 / 638:29837 / 638:29859 / 638:29881 / 638:29903) is a child of the outer 1440x800 frame,
  painted **after the Texture**, at `position:absolute; right:8px; bottom:8px; width:712px; height:80px`, which is **abs (720,712)**.
  That is inner (712,702), the same place as before. The scroll-guide group is now a child of Buttons.
  - Exception: in progress frame 2 (638:29447) Buttons 638:29815 sits inside the inner frame at inner (712,**703**), which is **abs (720,713)**:
    1px lower, with the bottom 1px clipped by the inner frame. This looks like a designer glitch.

### 2b. Per element (abs coordinates)
| element | before (512:4618) | now (progress frames) |
|---|---|---|
| btn 1 "Start an order" (356x80, px20, gap 8) | bg `#BF5E2A`, text `#F6F6EF` Overused Grotesk Medium 20/1.2 -0.4 at (107,28), 20px arrow `common/arrow-right-inverse.svg` | **unchanged** (bg `#BF5E2A`, no border). It is opaque, so it covers the texture |
| btn 2 "Find a location" (356x80) | **bg `#F6F6EF`** + border-top 1.005px `#000`, text `#4A4A48` at (118,28) | **bg removed (transparent)**. Border-top 1.005px `#000` and the text are unchanged. The texture shows through it |
| hidden 80x80 btn (632,0) | hidden | hidden |
| Line 71 (vertical dashed 28) | x 720, y 683→711, black at 0.16 (`common/line-vertical-28.svg`) | x **719.89**, y **684→712**, solid **`#C5C5BF`** (`hero/scroll-line-v-28-c5.svg`). CSS: `left:-0.11px; top:-28px; h28` in Buttons, rotated 90 |
| Line 61 (horizontal dashed 712) | y 682, x 720→1432, black at 0.16 | y **683**, x **718.89→1430.89**, solid **`#C5C5BF`** (`hero/scroll-line-h-712-c5.svg`). CSS: `left:-1.11px; top:-29px; w712`, rotated 180 |
| left tick (7.778 box, 2x9 rect rotated 45) | box at (717.11, 678.61), fill black | box at (**716.00, 679.61**). CSS in Buttons: `left:-4px; bottom:104.61px`. Fill black **plus a 1px `#C5C5BF` border**, which renders as solid `#C5C5BF` (pixel 197) |
| right tick | box at (1429.63, 678.61), black | box at (**1428.53, 679.61**). CSS: `right:-4.3px; bottom:104.61px`. Same `#C5C5BF` look |
| "SCROLL ↓" label (14px Medium uppercase, tracking .56, gap 2) | at (1047,659), black text, group **opacity 0.2**, black arrow | at (**1045.89, 660**), **opacity 1**, text **`#C5C5BF`**, arrow `common/arrow-right-scroll-c5.svg`. CSS: `left:325.89px; top:-52px` in Buttons |

`#C5C5BF` is black at 20% precomposited on `#F6F6EF` (246×0.8 = 197, 239×0.8 = 191). So the label looks the same as before, while the dashed lines get
slightly darker (0.16 → about 0.20). Net offset of the whole scroll group vs before: **(-1.11, +1)** (Line 71: -0.11, +1).
Pixel check (638:29573): Line 61 at y 683 = 197, btn-2 border-top at y 712 = 0, orange from x 720, inner-frame bottom stroke at y 792–793.

### 2c. Inner frame and the other blocks
- Inner frame 638:29385: (8,10) 1424x782, bg `#F6F6EF`, **1.5px `#000` stroke**, overflow clip. It is now auto-layout (flex column, `pt:48`): the photo section is
  flex-1, giving 0,48 1424x432 (no visible border-bottom in this export), then the lower block 0,480 1424x302. Geometry is unchanged.
  Figma renders this stroke **outside** the box (pixels x 6.5–8 and 1432–1433.5, y 8.5–10 and 792–793.5). That is identical to the old 512:4618 render, so nothing changed here.
- Menu (0,0 1422x48, border-bottom 0.16, link cells 400 + 6 x 170.33, black 2x9 ticks): unchanged, texts opacity 1, no bg.
- H1 (40,520) 574w and subtitle (40,678) 586w, opacity 1: unchanged.

### 2d. Photo box per progress frame (same asset `hero/hero-photo-full.png`, object-fit cover)
- Frame 1 (638:29388): **1835 x 715 at (-206,-154)** relative to the 1424x432 photo frame (CSS `left:calc(50% - .5px); translateX(-50%); top:-154px`).
- Frames 2–6: **1479 x 605 at (-28,-99)**, the same as 512:4618.
- Both boxes are centred on the same point (711.5, 203.5). With cover, the rendered image scale is driven by height: 715/361 vs 605/361.
  So frame 1 is the photo **zoomed 1.1818x** around that centre, and frame 1 → 2 is a zoom-out to the normal framing. Pixel check: the photo is darker in frame 1.

---------------------------------------------------------------------------------------------------
## 3. LOADER (diff vs `partials/loader-hero-notes.md`)

New Letter P (all frames): **78 x 105** (was 84 x 106). The silhouette is more symmetric: top vertex (39.25,0), left face width 37 (was 43),
outline `M78 22.51V68.04L52.99 82.55V96.74L38.75 105L0 82.49V22.76L39.25 0Z`. The SVG now starts with a solid silhouette fill
`#F6F6EF` ("Letter P" path), so the P is fully opaque, followed by the masked stroke group ("Letter P_2"). The stroke rules are unchanged:
grey = black stroke-width 2 masked (**1px inside**), orange = `#BF5E2A` stroke-width 4 masked (**2px inside**). The right edge stays at x 759; the left edge moves from 675 to 681.

Guide lines below are abs centre-lines. Old values were L65 x 719.5; L66 y 399.5; L67 (-19.75,39.57)→(1420.25,839.57);
L68 (20.25,-40.43)→(1460.25,759.57); L69 (19.76,839.57)→(1459.77,39.57); L70 (-30.24,759.57)→(1409.77,-40.43).
Line style is unchanged: `<g opacity=.7>`, black stroke-opacity 0.16, 1px, dashed.

### 3.1 638:29300 "Hero" (the new first loader frame, replaces 485:4400)
- Outer 1440x800 bg `#F6F6EF`, padding 8. **New frame**: inner frame 638:29301 at **(8,10) 1424 x 782**, bg `#F6F6EF`,
  **border 1px `rgba(0,0,0,.16)`**, overflow clip. Figma draws the stroke outside the box: pixels at x 7, x 1432, y 9 and y 792 read 206 on 246 bg.
  CSS: `left:8px;top:10px;width:1424px;height:782px;outline:1px solid rgba(0,0,0,.16)` (or a 1426x784 box at 7,9 with a 1px inside border).
- Inside it, "Loader" 638:29363 is 1440x800, centred: inner (-8,-9), so **abs (0,1)**. It is 1px lower than before, and everything inside it is clipped to the inner frame.
- Guides 638:29364: box at Loader (-25.985,-38), so abs (-25.985,-37), 1490.004 x 878.001.
  Use `guides-perspective-v2-loader1.svg` at native size, **left -26.47px, top -37.87px** (abs).
  Lines: L65 x 719.5, **y 1→801**; L66 **y 400.5**; L67 (-19.76,**40.56**)→(1420.25,840.56); **L68 (24.25,-37.44)→(1464.26,762.56)**;
  L69 (19.76,**840.56**)→(1459.77,40.56); **L70 (-26.23,762.56)→(1413.78,-37.44)**.
  So the Loader's +1 y shift moves every line down 1px, and L68/L70 also move **+4 x / +2 y** within the loader.
- P 638:29375 (grey v2) at Loader (681,346), which is **abs (681,347)**, 78x105.
- Texture on top.

### 3.2 501:4439 (step 2)
- Clip 501:4493 is unchanged: 55,54 1332x692, bg `#F6F6EF`, overflow hidden. Frame lines are unchanged (same `frame-lines-step2.svg`).
- Guides 501:4458: **1480.008 x 880.001** (was 1490.005), `left:calc(50% - 1px); translateX(-50%); top:-94px` in the clip, which puts the box at abs (-20.004,-40).
  Use `guides-perspective-v2-step2.svg` at native size, **left -75.485px, top -94.874px** inside the clip (abs -20.485, -40.874).
  Lines: L65 719.5, L66 399.5, L67, L68 and L69 identical to old; **L70 (-20.24,759.56)→(1419.77,-40.44)**, which is **+10 x** vs old.
- P 638:29376 (orange v2) at **abs (681,346)** 78x105, a sibling of the clip (not clipped).
- Texture on top.

### 3.3 501:4479 (step 3)
- Clip 501:4492 is unchanged at 477,274 483x245, overflow hidden. **No bg is given** in the new export. Frame lines are unchanged (`frame-lines-step3.svg`).
- Guides 501:4480: **1484.998 x 880.001**, `left:calc(50% - 1px); translateX(-50%); top:-314px`, so the box is at abs (-24.999,-40).
  Use `guides-perspective-v2-step3.svg` at native size, **left -502.485px, top -314.874px** inside the clip (abs -25.485, -40.874).
  Lines: L65, L66, L67 and L68 identical to old; **L69 (14.76,839.56)→(1454.77,39.56)** (-5 x); **L70 (-25.24,759.56)→(1414.77,-40.44)** (+5 x).
- P 638:29380 (orange v2) is now **inside the clip** at clip (203,70), which is **abs (680,344)**, 78x105. That is 1px left and 2px up vs step 2.
- Texture on top.

### 3.4 501:4508 (step 4) and 3.5 562:6444 (Loader → Hero)
- No changes apart from the texture added on top. Every exported asset (frame-lines-step4, timeline-empty, line 655/712, arrows,
  logo) is byte-identical, and every position matches the old notes. In 562:6444, btn 2 still has bg `#F6F6EF` and btn 1 is still outline-only,
  both under the texture.

---------------------------------------------------------------------------------------------------
## 4. PROGRESS BAR (6 frames "Hero - Progress bar", in time order)

### 4a. Common geometry (all 6 frames)
- Container "Frame 2147225935": photo-frame (-10,217) 1444 x 52, p10, flex column, gap 10. That puts the text row at photo-frame (0,227),
  which is inner (0,275), **abs (8,285)**: 1424 x 32, px40, `justify-between`.
- Labels: Overused Grotesk Regular 20px / 1.6, tracking -0.4, colour **`#F6F6EF`**, opacity 1, no per-stage highlight. Every label is identical in all frames.
  Left group (gap 240): "Open order" (x 40, w 93) and "Title search" (x 373, w 94). Right group (gap 280): "Escrow" (x 981, w 62) and "Closing" (x 1323, w 61).
  These x values are relative to the 1424 row; abs = +8. All labels are 32 tall.
- Timeline group "Group 2087330099": container (10,-4), so photo-frame (0,213), inner (0,261), **abs (8,271)**, 1424 x 7.778.
  - Track (Line 61): y 3.5 in the svg (**abs 274.5**), x 0→1424, stroke `#F6F6EF` at **stroke-opacity 0.16**, 1px, dashed: dash 5.98 / gap 5.98
    (period 11.967), starting with a 2.99 half dash at each end.
  - Ticks: 4 rects 2x9, fill `#F6F6EF`, `rotate(45)` about their top-left corner at svg x **89.367, 421.891, 1019.37, 1351.89** (frame 1 has 89.365), y 0.
    Each sits in a 7.778 box spanning y 0–7.78. Visual centres are at about x **86.9 / 419.4 / 1016.9 / 1349.4**.
  - Fill (Line 62): y 3.5 (abs 274.5), stroke **`#F6F6EF`, opacity 1, 1px solid**. In Figma it is a line rotated 180°: its `x` is the
    right end, and it extends left by `width`.

### 4b. Per frame
| # | node | container opacity | fill Line 62 (svg x, abs x = +8) | asset | photo |
|---|---|---|---|---|---|
| 1 | 638:29384 | **0** | 0 → 419 (w 419), invisible | `hero/timeline.svg` | **1835x715 at (-206,-154)**, zoomed 1.1818x |
| 2 | 638:29447 | 1 | **87 → 87 (w 0.0001)**, nothing drawn | `hero/progress-track.svg` | 1479x605 at (-28,-99) |
| 3 | 638:29510 | 1 | **0 → 87** (w 87), ends at the "Open order" tick centre | `hero/progress-fill-87.svg` | same |
| 4 | 638:29573 | 1 | **0 → 419** (w 419), ends at the "Title search" tick | `hero/timeline.svg` | same |
| 5 | 638:29636 | 1 | **0 → 1017** (w 1017), ends at the "Escrow" tick | `hero/progress-fill-1017.svg` | same |
| 6 | 638:29699 | 1 | **0 → 1424** (w 1424), the full width. It passes the "Closing" tick (≈1349.4) and runs to the right edge | `hero/progress-fill-1424.svg` | same |

For a CSS build, use `progress-track.svg` (track + ticks) plus a 1px `#F6F6EF` div at abs left 8, top 274 (inner top 264), height 1.
Animate its width 0 → 87 → 419 → 1017 → 1424 (`transform-origin:left` / `scaleX`), or swap between the exported SVGs.

### 4c. The loop
1. Frame 1 → 2 (appear): the timeline overlay fades in (opacity 0 → 1) while the photo zooms out from 1835x715 to 1479x605 around the same centre.
   The bar starts empty.
2. Frame 2 → 3: the fill grows to 87 (the first tick, "Open order"). Literally, Figma Smart Animate would grow it leftward from its anchor at x 87,
   because frame 2's line sits at x 87 with zero width. The intended read is a fill from the left edge, so animate a left-anchored width 0 → 87.
3. Frame 3 → 4: 87 → 419 ("Title search").
4. Frame 4 → 5: 419 → 1017 ("Escrow").
5. Frame 5 → 6: 1017 → 1424 (the full track; "Closing" is passed). This is the end state, with the bar completely filled.
6. Loop: back to frame 2 (empty bar, overlay visible), then repeat. Frame 1 (hidden overlay, zoomed photo) is only the entry state.

Nothing else changes between the six frames. Menu, H1, subtitle, buttons, scroll guides and texture are identical in frames 1 and 3–6;
frame 2 has the inner-frame texture and buttons quirks described in 1b and 2a. Labels, ticks and the track never change colour or opacity.
The previous hero 512:4618 corresponds to frame 4's fill (0→419) at full opacity.
