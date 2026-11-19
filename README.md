# Priority Title — interactive prototype

Pixel-perfect HTML/CSS/JS build of the Figma section **Concept** (`Priority-title`, node `562:6287`):
loader → hero (5 scroll states) → features (intro + 4 tabs) → services (4 states).

## Public link (GitHub Pages)

One-time setup in the repository: **Settings → Pages → Build and deployment → Source: “Deploy from a branch”**,
pick the branch with this code and the `/ (root)` folder, then **Save**.
After about a minute the prototype is live at:

https://flexyforall.github.io/priority-title/

(Alternatively, after merging to `main`, choose **Source: GitHub Actions**; `.github/workflows/pages.yml` deploys on every push to `main`.)

## Review a specific Figma state

Append `#state=<name>` to the URL to jump straight to a frame, no loader:
`loader-hero`, `hero-1` … `hero-5`, `feat-intro`, `feat-1` … `feat-4`, `svc-1` … `svc-4`.

Keyboard: ↓ / ↑ (or PageDown / PageUp) step between states. Tabs and the services list are clickable.

## Structure

```
index.html          markup (1440×800 artboard, scaled to the viewport)
css/tokens.css      Figma variables: colors, type styles, @font-face
css/styles.css      layout
js/main.js          loader + scroll timeline (GSAP, vendored in js/vendor)
assets/             every image/SVG exported from Figma, fonts (Coconat, Overused Grotesk — SIL OFL)
partials/           extraction notes per section (geometry from Figma)
tools/              screenshot helpers used to diff against Figma
```
