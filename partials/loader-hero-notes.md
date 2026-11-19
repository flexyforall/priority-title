# Loader + Hero scroll states — Figma notes

File `6z3ldwHkiRRSwd1lwrPSWb`. Every number below comes from `get_design_context` / `get_metadata`.
Colours: bg `--color-background-primary #F6F6EF`, accent `#BF5E2A`, border-default `rgba(0,0,0,.16)`,
border-strong `#000`, text-secondary `#4A4A48`, text-inverse `#F6F6EF`.

---------------------------------------------------------------------------------------------------
## A. LOADER (frames are 1440x800, coordinates relative to the frame)

### Asset map
| file | what | native size |
|---|---|---|
| `assets/loader/guides-perspective.svg` | the 6 dashed perspective guides (Group 2087330098). Identical export in 485:4400 / 501:4458 / 501:4480 | 1490.98 x 880.875 |
| `assets/loader/letter-p-grey.svg` | "Letter P" cube logo, grey/black outline (626:588) | 84 x 106 |
| `assets/loader/letter-p-orange.svg` | "Letter P" cube logo, orange (612:7299 = 612:7298, identical) | 84 x 106 |
| `assets/loader/frame-lines-step2.svg` | 4 solid frame lines, 501:4440 | 1444 x 800 |
| `assets/loader/frame-lines-step3.svg` | 4 solid frame lines, 501:4487 | 1444 x 800 |
| `assets/loader/frame-lines-step4.svg` | 4 solid frame lines, 501:4517 | 1444 x 800 |
| `assets/loader/logo-hidden-32.svg` | Menu logo export from 501:4508. Its `<g>` has opacity 0 and viewBox 32x32, so it is invisible. Not needed visually | 32 x 32 |
| `assets/loader/loader-full-flattened-485-4400.svg` | REFERENCE ONLY: 485:4400 flattened into one SVG (bg rect, guides and grey P) | 1490.98 x 880.875 |
| `assets/hero/timeline-empty.svg` (already existed; same bytes as the 612:7206 export) | black dashed timeline and 4 black ticks, no progress line | 1424 x 7.778 |
| `assets/hero/line-vertical-655.svg` (already existed) | Line 71, dashed, 655 long (draw rotated 90deg) | 655 x 1 |
| `assets/common/line-dashed-712.svg` (already existed) | Line 61, dashed, 712 long (rotated 180deg) | 712 x 1 |
| `assets/common/arrow-right-inverse.svg`, `assets/common/arrow-right-scroll.svg` (already existed) | arrows inside the hidden button/scroll text of 501:4508 | 20 / 14 |

Layer styles:
- **Guides**: the `<g>` has opacity **0.7**. Every line is stroke `black`, stroke-opacity **0.16**, 1px wide, dashed.
  Vertical and horizontal lines use 8px dashes with 8px gaps (they start with a 4px half dash). The diagonal lines use segments
  about 8px long (dx 6.99, dy 3.88) with gaps of about 8px.
  Placement: put the SVG at its native size at **left -30.48px, top -40.87px** (this is the bleed offset from the flattened export;
  the Figma group box is at x -30, y -40, 1490.005 x 880.001). In frame coordinates the lines run:
  - L65 vertical x=719.5, y 0→800
  - L66 horizontal y=399.5, x 0→1440
  - L67 (-19.8,39.6)→(1420.2,839.6)
  - L68 (20,-40)→(1460,760)
  - L69 (1459.8,39.6)→(19.8,839.6)
  - L70 (1409.8,-40.4)→(-30.2,759.6)

  The four diagonals form an X/diamond around the centre.
- **Letter P** (all frames): left **675**, top **345**, **84 x 106**. The fill is `#F6F6EF`.
  - Grey version: stroke `black`, stroke-width 2, masked to the shape, so you see a **1px inside stroke**. The screenshot shows it as dark grey or black.
  - Orange version: stroke `#BF5E2A`, stroke-width 4, masked, so you see a **2px inside stroke**.
- **Frame lines** (Group 2087330097): the box is at **left -2, top 0, 1444 x 800**. It holds 2 horizontal lines and 2 vertical lines,
  stroke black, stroke-opacity 0.16, 1px solid, spanning the whole frame. In frame coordinates (svg x minus 2):

| state | top line y | bottom line y | left line x | right line x | inner rect (clip window) |
|---|---|---|---|---|---|
| step2 501:4439 | 54.5 | 745.5 | 54.5 | 1386.5 | 55,54 1332x692 |
| step3 501:4479 | 274.5 | 519.5 | 476.5 | 959.5 | 477,274 483x245 |
| step4 501:4508 | 93.5 | 711.5 | 121.5 | 1312.5 | 123,93 1190x616 |

### Frame by frame
1. **485:4400 "Loader"**: bg `#F6F6EF`. Shows the guides at full size (not clipped) and the **grey** Letter P at 675,345. No frame lines.
2. **501:4439**: frame bg `#F6F6EF`.
   - Clip window `501:4493` sits at **55,54 1332x692**, has bg #F6F6EF and `overflow:hidden`. The guides inside it are at
     `left: calc(50% - 6px); translateX(-50%); top:-94px`, size 1490.005x880.001. That puts them at the same absolute position as in
     step 1 (frame x -30, y -40). **The guides do not move. Only the clip rect shrinks**, so the guides are cut off 55px in from each edge.
   - `frame-lines-step2.svg` appears at -2,0.
   - The Letter P turns **orange** and its outline gets thicker (1px to 2px).
3. **501:4479**: the clip window `501:4492` shrinks to **477,274 483x245** around the P. The guides sit inside it at
   `left: calc(50% - 3.5px); translateX(-50%); top:-314px`, which is the same absolute position again.
   `frame-lines-step3.svg` shows the lines tight around the logo. The P stays orange.
4. **501:4508**: the P and the guides are **gone**. The clip window `612:7194` expands to **123,93 1190x616**, with bg #F6F6EF and overflow hidden.
   `frame-lines-step4.svg` is shown. The hero skeleton is drawn inside the window at the hero's absolute position. Its children are
   offset by -117,-35 and similar values, so the skeleton origin is abs **(6,10)**. The hero inner frame is at (8,10), so this is 2px further left.
   - Menu `612:7235`: abs 6,10, 1422x48, border-bottom 0.16. Cells (400 + 6 x 170.33) each have border-left 0.16 and a black tick
     at the bottom-left (2x9, bottom -2, left about -2). **All link texts and the logo have opacity 0.**
   - Photo frame `612:7195`: abs 6,58, 1424x432, border-bottom 1px 0.16. The photo itself (`612:7196`) is **hidden**.
     - Timeline: `timeline-empty.svg` at photo-frame (0,213), which is abs (6,271). The dashed line is at abs y 274.5.
       Ticks at svg x 89.37, 421.89, 1019.37, 1351.89.
     - Timeline texts: at photo-frame y 227, px40, 20px/1.6, colour #F6F6EF, so they are invisible on the light bg.
   - Lower block `612:7213`: abs top 490, h302. The H1 and subtitle have **opacity 0**.
     - Buttons: bottom-right 712x80, starting abs y 712. They are below the clip bottom (709), so not visible. Button 1 has a black
       left/top/right outline and no accent bg; button 2 has bg plus border-top 1.005 black. The texts and arrow are opacity 0.
   - Scroll guides in `612:7226`, all visible inside the window:
     - vertical dashed Line 71 (655 long) at abs x≈718, y 56→711
     - horizontal dashed Line 61 (712) at abs y≈682, x 718→1430
     - 2 black diagonal ticks (2x9, rotated 45deg, 7.778 box) at abs x≈715.1 and ≈1427.0, y≈678.6
     - "scroll" label is opacity 0
5. **562:6444 "Loader → Hero"** (you have it): the full empty hero grid.

**Animation summary**:
- step 1 → 2: the P stroke goes black 1px → orange 2px. The 4 frame lines fade or slide in at 54/55px inset, and the guides get clipped to that rect.
- step 2 → 3: animate the clip rect and the 4 lines together from (55,54,1332,692) to (477,274,483,245).
- step 3 → 4: remove the P and the guides, then expand the clip rect and lines to (123,93,1190,616). The hero skeleton (menu cells, photo bottom border, timeline dashes and ticks, scroll guides) is revealed inside it.
- step 4 → 562:6444: expand to the full frame.

---------------------------------------------------------------------------------------------------
## B. HERO scroll states (1440x800 frame, 8px padding)

The inner frame has `border:1.5px solid #000`, bg #F6F6EF and `overflow:hidden`. Coordinates below are relative to the inner frame's top-left.
Inner frame size by state:
- 512:4618, 595:6527, 612:6755: at (8,10), **1424x782**
- 595:6669, 528:4762, 612:6831: at (8,8), **1424x784**

In the 784-tall states the content row and header are inset by **left 1** (Header at 1,1, 1422x48, with bg primary and border-bottom 0.16).
In the 782 states the Menu is at 0,0, 1422x48 with no bg.

Photo assets:
- `assets/hero/hero-photo-full.png` (1024x361): used in 512:4618, 595:6527, 612:6755
- `hero-photo-small-a.png` (3584x1814) plus `hero-photo-small-b.png` (1024x361): used in 528:4762 and 612:6831
- 595:6669 uses the same `small-a` but a **different** `small-b` export, saved as `hero-photo-small-b-595-6669.png`. It is the same
  photo with a slightly different framing, about 10 to 20 levels mean pixel difference; visually it is nearly the same.
- `assets/hero/arrow-right-20-5.svg` is the 20.504px #F6F6EF arrow used in the 784-tall states. The 782 states use the 20px
  `common/arrow-right-inverse.svg`.

### Photo container per state
| state | container (left, top, w, h) | inner wrapper | img box (relative to container) |
|---|---|---|---|
| 512:4618 | 0, 48, 1424 x 432 | 562:6439 0,0 1424x432 | `left:calc(50% - .5px); translateX(-50%)` → **-28, -99, 1479x605**, object-fit cover |
| 595:6527 | 0, 48, **1079 x 432** (overflow hidden) | 612:6731 `left:calc(50% + .5px); translateX(-50%)` → x -172, 1424x432 | wrapper → -28,-99 1479x605 cover. The image's absolute x is -200, so it is the same scale, re-centred in the narrower window |
| 612:6755 | **150, 223 (48+175), 542.275 x 317** (overflow hidden) | 612:6763 `left:calc(50% + .37px); translateX(-50%)` → x -250.96, 1044.926x317 | wrapper → **-20.545, -72.646, 1085.285x443.947** cover (scale 0.7338 of 1479x605). The image's x relative to the container is -271.5 |
| 595:6669 | **1, 541, 399 x 242** (bottom:1px; left:1px) | two stacked layers, see below | |
| 528:4762 | **3, 541, 399 x 242** (bottom:1px; left:3px) | same | |
| 612:6831 | 3, 541, 399 x 242 | same | |

Small-photo crop CSS (595:6669, 528:4762, 612:6831), written as the container's children:
```html
<div style="position:absolute;inset:0;pointer-events:none">
  <div style="position:absolute;inset:0;overflow:hidden">
    <img src="hero-photo-small-a.png" style="position:absolute;height:149%;left:-37.99%;top:-1.39%;width:178.97%;max-width:none">
  </div>
  <img src="hero-photo-small-b.png" style="position:absolute;width:100%;height:100%;max-width:none;object-position:bottom">  <!-- no object-fit given, so it stretches -->
</div>
```

### H1 / subtitle / timeline
| state | H1 | subtitle | timeline overlay |
|---|---|---|---|
| 512:4618 | block at 0,480 (1424x302), text col 710 wide p40, so H1 is at (40,520), 574w | (40,678) 586w, opacity 1 | present: text row at (0,275) 1424w px40; svg `timeline.svg` at (0,261), dashed line y 264.5, solid white progress Line 62 0→419 |
| 595:6527 | block at 0,480 (1079x302), H1 (40,520), opacity 1 | (40,678), opacity 1 | **absent** (not in the tree) |
| 612:6755 | block at 0,480 (709x302), H1 (40,520), opacity 1. The photo overlaps it (photo bottom 540) | **opacity 0** | absent |
| 595:6669 | left col 711 (border-right 0.16 on the inner 710 col), flex column centred, pb100 px40. H1 is two lines, "A safer way to finalize" / "real estate deals.", at (**41, 303.5**), 574x124 | node hidden | absent |
| 528:4762 / 612:6831 | same as 595:6669, at (41,303.5) | hidden | absent |

H1: Coconat 56px, line-height 1.1, tracking -1.12. Subtitle: Overused Grotesk 20px, line-height 1.6, tracking -0.4, colour #4A4A48.
The left-column right border (0.16) is at x 1079 in 595:6527, x 709 in 612:6755, and x 710 (+1 inset) in 595:6669 onwards.

### Stats column
- Fonts: number Coconat 44px, line-height 1.1, tracking -0.88. Caption Overused Grotesk 24px, line-height 1.6, tracking -0.48. Colour black.
- Each row is 711 wide x 128 high, px20 py40, split into 2 equal flex cells: the number at (20,40) 335.5x48 and the caption at (355.5,45) 335.5x38.
- The 58 Years row uses `align-items:flex-end`, so its caption is at y 50. The other rows centre.

| state | column x (inner) | row tops (Regions / Years / 12,000+) | row opacity R / Y / 12k | caption opacity R / Y / 12k |
|---|---|---|---|---|
| 512:4618 | — | absent | | |
| 595:6527 | — | absent | | |
| 612:6755 | 711 (711x783, absolute rows) | **495 / 720.5 / 946** (the last two are behind the buttons or off-frame) | .4 / .4 / .4 | 0 / 0 / 0 |
| 595:6669 | 712 (1 + 711) | **275 / 500.5 / 726** | **1** / .4 / .4 | **1** / 0 / 0 |
| 528:4762 | 712 | **48 / 273.5 / 499** (flex column, justify-between, pt48, pb156) | .4 / **1** / .4 | 0 / **1** / 0 |
| 612:6831 | 712 | 48 / 273.5 / 499 | .4 / **1** / .4 | 0 / **1** / 0 |

The column slides up by +447, then +227, then 0, while the highlight moves Regions → Years.
**No state in this set highlights 12,000+.** 612:6831 has the same stats as 528:4762. Its only metadata difference is that it is the final frame,
and the photo is at x=3 in both.

### Buttons and scroll guides
- **512:4618**: buttons at (712,702) 712x80, each btn 356. Scroll group: Line71 at x 712, y 673→701; Line61 at y 672, x 712→1424;
  scroll label at (1039,649); ticks at y≈668.6.
- **595:6527 / 612:6755**: buttons are **shifted 5.11px left**: (706.89,702) 712x80 (`right:5.11px; bottom:0`). Btn1 has bg #BF5E2A
  and text #F6F6EF with a 20px arrow; btn2 has bg primary, `border-top:1.005px #000`, and text #4A4A48.
  - Line71: dashed 28px (`common/line-vertical-28.svg`, rotated 90) at x 706.89, top 673.
  - Line61: 712 dashed at x 706.89, top 672.
  - Ticks: 7.778 boxes with a 2x9 black rect rotated 45, at `left:704` and `right:-0.3px`, `bottom:105.61px` (top 668.61).
  - "scroll" label: at (1033.89,649), opacity **0.2**, 14px uppercase, tracking 0.56, plus a 14px arrow rotated 90.
- **595:6669 / 528:4762 / 612:6831**: buttons at right 0, bottom 0, i.e. (712,704) 712x80, each btn 356, arrow 20.504.
  - Line71 and Line61 at x 712.01, top 673 / 672.
  - Ticks: `bottom:107.61px` (top 668.61), `left:709.12px` and `right:-5.42px`.
  - Scroll label: (1039.01,649), opacity 0.2.

Other differences:
- Only the 784 states have a Header with its own bg (it covers the stats rows that scroll under it).
- 512:4618 is the only state with the "Open order / Title search / Escrow / Closing" overlay. Texts are 20px, colour #F6F6EF,
  positioned at px40 with x 40 / 373 / 981 / 1323 and y 275.
