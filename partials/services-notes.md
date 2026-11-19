# Services section: notes for states 1 to 4

Figma frames (1440x800, inner bordered frame 1424x784 at 8px): 538:5633 (state 1), 545:6119 (state 2), 545:6174 (state 3), 545:6229 (state 4).
The layout (left column, middle column, right column, menu) is identical in all four states. Only the items listed below change.

## Geometry shared by all states

- Inner row "Frame 2147225902": 1422 x 783.
- Left column: x 0, width 474. The heading block is at y 48, height 735. The list "Frame 2147225898" is at y 495 (x 0, 473 x 288) and has `border-right: 1px solid var(--color-border-strong, #000)`. Each of its 4 buttons is 472 x 72 with `padding: 0 40px`.
- **Middle column** "Frame 2147225927": x 474, **width 474.5**, height 783.
  - **Illustration frame** ("Illustration / 0N"): left 0, **top 48**, **473.5 x 735**. The frame does not clip. Clip at the column.
  - In `services-illustrations.html`, every layer coordinate is relative to this illustration frame (`.svc-illu__canvas`). The canvas is placed at `top:48px` inside a `.svc-illu` that has `inset:0` over the column.
- Right column "Frame 2147225928": x 948.5, width 473.5, background `var(--color-background-primary,#f6f6ef)`, `padding-top:48px; padding-bottom:80px`. The inner frame has `padding-top:228px`, `padding: 0 40px` and `gap:24px`. The title/body group has `gap:16px`.
  - H3: Coconat Regular 32px, line-height 1.1, letter-spacing -0.64px, `var(--color-text-primary, #000)`, width 413px.
  - Body: Overused Grotesk Regular 20px, line-height 1.6, letter-spacing -0.4px, `var(--color-text-secondary, #4a4a48)`, width 393.5px.
  - Link: Overused Grotesk Medium 20px, line-height 1.2, letter-spacing -0.4px, `var(--color-text-accent, #bf5e2a)`, nowrap. Then a `gap:6.895px` and the 20.504px arrow with `padding-top:2px`. The arrow SVG is byte-identical in all 4 states to the existing `assets/common/arrow-right-accent.svg`.

## Per-state content

| | State 1 | State 2 | State 3 | State 4 |
|---|---|---|---|---|
| Frame | 538:5633 | 545:6119 | 545:6174 | 545:6229 |
| Active list item | Title insurance (1st) | Escrow & Closing (2nd) | Residential Services (3rd) | Commercial Services (4th) |
| H3 title | Title Insurance | Escrow & Closing | Residential Services | Commercial Services |
| Body | Protect buyers and lenders from ownership issues that may surface after closing. | Coordinate funds, documents, and parties through a secure closing process. | Title and escrow support for residential real estate transactions. | Title expertise and transaction support for commercial properties. |
| Link text | Explore Title Insurance | Explore Escrow & Closing | Explore Residential Services | Explore Commercial Services |
| Link frame width (text + gap + arrow) | 215.4 (text 188) | 239.4 (text 212) | 263.4 (text 236) | 274.4 (text 247) |
| Illustration node | 608:542 | 608:582 | 608:627 | 608:687 |

The list item labels are the same in every state: "Title insurance", "Escrow & Closing", "Residential Services", "Commercial Services". Only the first one uses a lowercase "i".

## List button styling differences

The list uses Overused Grotesk Medium 16px, line-height 1.2, letter-spacing -0.32px.

- **Active button**, all states: `background: var(--color-background-inverse, #000)` and text `var(--color-text-inverse, #f6f6ef)`.
- **Inactive text**: `var(--color-text-secondary, #4a4a48)`.
  - Exception in **state 4**: the inactive "Title insurance" text is `var(--color-text-primary, #000)`. This is probably a design inconsistency. Every other inactive label in all states uses secondary.
- **Top borders**:
  - State 1: the first (active) button has no `border-top`. Buttons 2 to 4 have `border-top: 1px solid var(--color-border-strong, #000)`.
  - States 2, 3 and 4: all 4 buttons, including the first one and the active one, have `border-top: 1px`.
  - If you implement one shared component, treat the state-1 missing top border as the only odd case. A border-top on all items is the majority.
- **Inactive background**: explicit `var(--color-background-primary,#f6f6ef)` in state 1 (all inactive) and state 4 (items 2 and 3). It is unset (transparent) in states 2 and 3 and on item 1 in state 4. The visual result is the same, because the column background is the same `#f6f6ef`.

No other colour, size or position differences exist between the states outside the illustration. The heading, the label "our services", the menu and the hidden CTA bar are identical.

## Illustration changes between states

Each block in `services-illustrations.html` has a comment that repeats these changes.

1. **State 1** is the base scene. It contains:
   - `plat-map`: 16 street lines and 7 lot lines, each 1385.64 x 800.
   - `parcel`: a dashed outline, 311.77 x 180 at (95.57, 278.75).
   - `survey-stakes`: 4 stakes, each 0 x 18 with a 7px orange marker.
   - `dimension`: 2 ext ticks and a dimension line.
2. **State 2** changes from state 1:
   - The dashed `parcel` is replaced by `parcel-foundation`: slab face front/side/top plus foundation front/side/top. The slab top is at 275.25, which is 3.5px higher than the old outline.
   - `plat-map` moves +3.5px in y.
   - `survey-stakes` moves -3.5px in y.
   - `dimension` moves +3.5px in y.
3. **State 3** adds `house` (11 parts) and `tree` (trunk and canopy). Everything else is pixel-identical to state 2. The paint order is: plat-map, parcel-foundation, survey-stakes, house, tree, dimension.
4. **State 4** changes from state 3:
   - The whole state-3 scene shifts by **dx -50.21, dy +64.75**.
   - New `building` ("Commercial building"): a base slab, a tower, a parapet and 10 ribbon windows (5 front, 5 side).
   - `building` is painted directly after `plat-map`, which puts it under the parcel.

The illustrations contain no rotations or CSS transforms. The isometry is already in the SVG paths.

## Assets (assets/services/, 36 SVGs, deduplicated by content)

85 asset URLs were downloaded. Files with identical content were merged into one, which left 36 files. All of them are valid SVGs and none is empty.

| File | Used in states |
|---|---|
| illu-street-line-a.svg (street lines 1-8), illu-street-line-b.svg (street lines 9-16) | 1, 2, 3, 4 |
| illu-lot-line-a.svg (lot lines 1-4), illu-lot-line-b.svg (lot lines 5-7) | 1, 2, 3, 4 |
| illu-stake.svg, illu-stake-marker.svg | 1, 2, 3, 4 |
| illu-dimension-ext.svg, illu-dimension-line.svg | 1, 2, 3, 4 |
| illu1-parcel-outline-dashed.svg | 1 |
| illu-parcel-face-front.svg (also used as the building base face front in state 4), illu-parcel-face-side.svg, illu-parcel-face-top.svg | 2, 3, 4 |
| illu-foundation-front.svg, illu-foundation-side.svg, illu-foundation-top.svg | 2, 3, 4 |
| illu-house-face-front.svg, -face-side, -face-top, -garage-door, -roof-back, -wall-front, -wall-gable, -roof-front, -door, -window, -gable-glazing | 3, 4 |
| illu-tree-trunk.svg, illu-tree-canopy.svg | 3, 4 |
| illu4-building-base-face-side.svg, illu4-building-base-face-top.svg | 4 |
| illu4-building-tower-face-front.svg, -tower-face-side, -tower-face-top, -parapet, -ribbon-window-front, -ribbon-window-side | 4 |

The plat-map line SVGs have a root size of 1386.39 x 800.75 (street lines) and 1386.02 x 800.65 (lot lines). Their boxes are 1385.64 x 800. Figma's code stretches the `img` to fill the box (`inset:0; width/height:100%`), and the partial keeps that exactly as Figma does.
