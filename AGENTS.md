# AGENTS.md

Context for AI coding agents working on this repo. Read this before making changes.

## What this is

A single-page personal portfolio site for **Pranjal ("PM.")**, a designer/developer. The visual identity is **brutalist × glassmorphism** on a near-black canvas: heavy borders, oversized Syne display type, an orange accent (`#FF6B35`), a lime "electric" accent (`#C4F82A`), film grain, and a custom magnetic cursor. **The accent colors are scroll-driven:** the page starts in the original orange/lime, and as the Selected Works section scrolls through the viewport the accents blend to antique gold (`#C8A45C`) and champagne (`#E9D9AE`), staying gold for About/CTA/footer and returning to orange on scroll back up. (Cold-blue and all-gold palettes were tried and dropped.)

- Tagline / hero copy: "BUILDING TOMORROW / LINE BY LINE"; page title "PM. — Design is the Silent Ambassador".
- Sections, top to bottom: Navbar (fixed) → Hero → Skills & Frameworks → Selected Works → About/Manifesto → CTA → Footer, plus a full-screen Contact overlay.
- There is a second route, `/agents` — a human-readable "for AI agents & crawlers" page (see below). Otherwise no router, backend, CMS, or test suite: the main site is one static page.

## Stack

| Concern | Choice |
| --- | --- |
| Build / dev server | Vite 8 (`@vitejs/plugin-react`, ESM — `"type": "module"`) |
| UI | React 19, function components + hooks, **JSX (not TypeScript)** |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first config, no `tailwind.config.js`) |
| Animation | `framer-motion` v12 (`motion`, `useScroll`, `useTransform`, `useSpring`, `useInView`, `AnimatePresence`) |
| Lint | ESLint 9 flat config (`eslint.config.js`) with react-hooks and react-refresh |
| Fonts | Google Fonts, loaded in [index.html](index.html): Syne, Space Grotesk, DM Sans, Inter |

`package.json` name is still `paper-design-mcp` (leftover from scaffolding); the README is the unmodified Vite React template. Neither reflects the real project.

## Commands

`node_modules` is not committed — run `npm install` first.

```bash
npm run dev       # Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # serve the built dist/
npm run lint      # eslint .
```

There is no test script. Verify changes with `npm run build` and by looking at the page in the dev server. `npm run lint` is useful but **already fails on the baseline** — see "Known issues".

## Layout

```
index.html                 # meta, Google Fonts, #root, loads /src/main.jsx
vite.config.js             # react() + tailwindcss() plugins only
eslint.config.js
vercel.json                 # rewrites /agents -> /index.html for the SPA route (Vercel)
public/                    # favicon.svg, icons.svg
  robots.txt                # allows all crawlers, points to sitemap.xml + llms.txt
  sitemap.xml                # lists / and /agents (placeholder https://example.com domain)
  llms.txt                   # machine-readable site summary (llmstxt.org convention)
  _redirects                 # /agents -> /index.html for the SPA route (Netlify)
src/
  main.jsx                 # route switch (pathname === /agents ? AgentsPage : App), createRoot + StrictMode
  App.jsx                  # page composition + Contact overlay state/markup
  pages/AgentsPage.jsx     # /agents route — human-readable summary for AI agents/crawlers
  index.css                # Tailwind import, @theme tokens, global + utility CSS
  components/
    Navbar.jsx  Hero.jsx  Skills.jsx  Works.jsx  About.jsx  CTA.jsx  Footer.jsx
    CustomCursor.jsx       # custom cursor visuals
    DesignTicker.jsx       # marquee of design principles — NOT currently rendered
  data/selectedWorks.js    # project list consumed by Works.jsx
  data/skills.js           # skill groups consumed by Skills.jsx
  hooks/useMagneticCursor.js  # useMagneticCursor + useMagneticElement
  hooks/useScrollAccent.js    # scroll-driven orange -> gold accent shift (used by Works)
  assets/                  # hero.png, works-01/02/03.png, react.svg, vite.svg
```

## The `/agents` route and SEO/AI-crawler files

The site added a second "page" for AI agents, LLMs and crawlers — the kind some product/commerce sites publish (a human-readable counterpart to `llms.txt`). Pieces:

- **`src/pages/AgentsPage.jsx`** — rendered at `/agents`. Its own minimal header (logo + "Back to site", not the real `Navbar` — the real one's `#skills`/`#works`/`#about` anchors don't exist on this page), then sections built from the *same* data files as the home page (`selectedWorks.js`, `skills.js`) plus static About/notes copy, then the real `Footer`. Styled with the same tokens (`.glass`, `.page-shell`, `font-display`, etc.) so it doesn't look like a different site.
- **No router dependency.** [src/main.jsx](src/main.jsx) does a plain regex check on `window.location.pathname` and renders `AgentsPage` or `App`. This is intentionally not react-router — there are only two routes. If a third route is ever needed, add a router instead of extending the regex.
- **Dev/preview:** Vite's dev server and `vite preview` both fall back to `index.html` for unknown paths by default, so `/agents` works there with no extra config.
- **Production:** a static host needs an explicit rewrite so `/agents` serves `index.html` instead of 404ing. [vercel.json](vercel.json) has this for Vercel; [public/_redirects](public/_redirects) has the Netlify equivalent. Add the equivalent for any other host.
- **`public/llms.txt`** — plain-text/markdown summary for LLMs, per the [llms.txt](https://llmstxt.org) convention. Links to `/agents`. Keep its content directionally in sync with `AgentsPage.jsx`, `selectedWorks.js` and `skills.js`, but it's not auto-generated from them — update by hand.
- **`public/robots.txt`** — allows all crawlers, points to `sitemap.xml` and mentions `llms.txt`.
- **`public/sitemap.xml`** — lists `/` and `/agents`.
- **JSON-LD in `index.html`** — a `Person` schema block (`@type: "Person"`) for traditional SEO/rich results. `sameAs` is empty since social links are still `#` placeholders — fill in once they're real.
- **Footer link:** a small "For Agents" link next to the copyright line links to `/agents`.
- **Placeholder domain:** `sitemap.xml`, `robots.txt`'s `Sitemap:` line, and the JSON-LD `url` all use `https://example.com/` — **replace with the real domain before deploying**, or search engines/crawlers will get wrong canonical URLs.
- llms.txt/robots.txt/sitemap.xml are for AI agents and traditional crawlers respectively; llms.txt is not a Google-ranking mechanism, it's for LLM tools that read it directly.

## How the pieces fit

### App ([src/App.jsx](src/App.jsx))
- Owns `contactOverlay = { open, source }`. `source` is `'nav'` or `'cta'`, and picks the origin point of the circular `clipPath` reveal (top-right for nav, bottom-center for CTA).
- While open: locks body scroll (`document.body.style.overflow`), closes on `Escape`, and closes via the × button.
- The overlay (`bg-accent-glow` panel with near-black text — takes on whatever accent is current at that scroll position, "LET'S BUILD IT.", Github/LinkedIn/Behance cards) is written inline in `App.jsx`, wrapped in `AnimatePresence`. Its social links are `href="#"` placeholders.
- Renders `<CustomCursor />` and a `.grain-overlay` div above everything else. `<main>` has `cursor-none`.
- `Navbar` and `CTA` both receive `onContactClick`; `Hero`, `Works`, `About` and `Footer` take no props.

### Design tokens ([src/index.css](src/index.css))
Defined in a Tailwind v4 `@theme` block, so each token becomes both a CSS variable and a utility class (e.g. `text-accent-glow`, `bg-void`, `font-display`):

- Colors: `void #0A0A0A`, `surface #111`, `elevated #1A1A1A`, `primary #F5F0E8` (cream text), `secondary #8A8278`, `muted #4A4540`, `accent-glow #FF6B35` (main accent: hero headline, buttons, cursor, overlay background), `accent-electric #C4F82A` (section labels, stat numbers), `accent-soft` (derived: `accent-glow` mixed 55% with white, used for button borders), plus `glass-border/fill/heavy`.
- **`accent-glow`, `accent-electric`, `accent-soft` and `--accent-rgb` are animated at runtime** by [src/hooks/useScrollAccent.js](src/hooks/useScrollAccent.js), which writes them inline on `<html>` (overriding the `@theme`/`:root` values in `index.css`). Their values in `index.css` are only the *starting* (top-of-page) colors — keep them in sync with `GLOW.from` / `ELECTRIC.from` in the hook.
- **Never hardcode the accent.** Use the utilities (`text-accent-glow`, `bg-accent-glow`, `border-accent-soft`), `var(--color-accent-glow)` / `var(--color-accent-electric)` in inline styles, and `rgb(var(--accent-rgb) / <alpha>)` for translucent glows/shadows (`--accent-rgb` is space-separated, e.g. `255 107 53`; in Tailwind arbitrary values write `shadow-[0_0_30px_rgb(var(--accent-rgb)/0.4)]`). A hardcoded orange hex/rgba will not follow the scroll transition and will look wrong once the page turns gold.
- Token names (`accent-glow` etc.) come from the original palette and don't describe the color — keep using them rather than renaming.
- **Neutrals are still partly hardcoded outside the tokens** (cream `rgba(245,240,232,…)` borders/dividers in `About`, `CTA`, `Hero`, `Works`, `App`; near-black `rgba(10,10,10,…)` text in the overlay; dark card gradients in `selectedWorks.js`; glass fill in `index.css`). To re-theme neutrals, change the `@theme` block *and* grep `src/` for the old hex and `rgba(r,g,b` values — earlier palette swaps were done as a mechanical find/replace of each old value. Accent colors are the exception: they are variables (see above).
- Fonts: `font-display` = Syne (big headlines, logo), `font-heading` = Space Grotesk, `font-body` = DM Sans, `font-ui` = Inter (labels, nav, small caps text).
- `--page-gutter: clamp(20px, 3vw, 48px)`.

Custom utility classes: `.page-shell` (max 1440px content column with gutter — wrap every section in it), `.glass`, `.glass-heavy`, `.brutal-border`, `.brutal-shadow`, `.brutal-shadow-accent`, `.grain-overlay`, `.glow-pulse`, `.float-subtle`, `.magnetic-cursor` (+ `.expanded`). **Gotcha — Tailwind padding/margin utilities do nothing in this project.** `index.css` has an unlayered `*, *::before, *::after { margin: 0; padding: 0 }` reset. Tailwind v4 emits utilities inside a cascade layer, and unlayered rules beat layered ones regardless of specificity, so every `p-*`, `px-*`, `py-*`, `pt-*`, `m-*`, `mt-*` etc. class is silently overridden (`gap-*`, `w-*`, `h-*` and the rest still work). The existing layout was tuned with those classes inert — the spacing you see comes from inline `style` (e.g. `marginBottom: '6rem'`), `gap`, fixed heights and `.page-shell`'s own `padding-inline`. So:
- **Set padding/margin with inline `style={{ ... }}`** (as the Contact and CONNECT buttons do) or with a custom unlayered class in `index.css`.
- **Do not "fix" this by removing the reset.** It was tried: it activates dozens of dead `pt-*`/`py-*`/`mt-*` classes (e.g. `pt-64 lg:pt-80` in Hero, `py-32` in CTA) and blows up spacing at the top, bottom and between every section. If you ever do want to, it means retuning the whole page.
- Existing `p-*`/`m-*` classes in components are therefore dead code, not active styles.

### Components
- **Navbar** — fixed, `.glass`, 3px cream bottom border. Logo "PM.", anchor links `#skills` / `#works` / `#about` (derived from the `navLinks` array — link text lowercased must match a section `id`), and a Contact button that opens the overlay.
- **Hero** — scroll-parallax headline (`useScroll` + `useTransform` on the section ref), then a 600px `BrutalistGeometry` block: scrolling grid, randomized barcode bars, rotating dashed ring, a spinning X, and a pulsing core, all built from framer-motion divs with blend modes. Vertical decorative lines are positioned at hardcoded 360/720/1080px.
- **Skills** (`id="skills"`) — sits between Hero and Works. Header row copies Works' style ("Skills & Frameworks" label, hairline, "Toolkit"), then one `glass` card per group in [src/data/skills.js](src/data/skills.js) (4-col at `lg`, 2 at `md`, 1 on mobile), each with a numbered title and bordered tag chips (`data-magnetic`, accent border on hover). Cards fade up on view with a stagger. The accent is still orange here — the orange→gold shift only begins as Works enters.
- **Works** (`id="works"`) — maps [src/data/selectedWorks.js](src/data/selectedWorks.js) into `ProjectCard`s in a 1-col / `lg:2-col` grid. Each card scroll-animates in via `useScroll` on itself. Card variants driven by data flags: `layout: 'featured'` (wide, `col-span-2`, shows category + "View Project"), `layout: 'offset'` (wrapper gets `-mt-10`), `brutal: true` (swaps `.glass` for `.brutal-border`).
- **About** (`id="about"`) — manifesto quote + paragraph on the left, a parallax `glass-heavy` stats panel on the right. `AnimatedNumber` counts up once in view (custom rAF loop, 2s, cubic ease-out). Stats are hardcoded in a `stats` array (currently 8+ Years, 47 Projects, 12 Awards).
- **CTA** — "DESIGN DEVELOP / SCALE" headline and a glowing CONNECT button that uses `useMagneticElement` (pulls toward the pointer) and opens the overlay.
- **Footer** — logo, social links (`href="#"` placeholders), credit line.
- **CustomCursor** — accent-colored dot plus trailing ring following `useMagneticCursor`; both are `hidden md:block`, so touch/small screens keep the native cursor.

### Hooks ([src/hooks/useMagneticCursor.js](src/hooks/useMagneticCursor.js))
- `useMagneticCursor()` — tracks `mousemove` into spring-smoothed motion values and sets `isHovering` on any element with a **`data-magnetic`** attribute. **Elements are queried once when `CustomCursor` mounts**, so `data-magnetic` elements added later (e.g. inside the Contact overlay) will not expand the cursor.
- `useMagneticElement()` — returns `{ ref, x, y }`; spring offsets at 30% of pointer distance from the element center, resetting on leave.

To make a new interactive element expand the cursor, add `data-magnetic` to it and make sure it exists in the DOM at first render.

- `useScrollAccent(ref)` (in [src/hooks/useScrollAccent.js](src/hooks/useScrollAccent.js)) — called once, from `Works`, with the section ref. `useScroll` with `offset: ['start 80%', 'end 30%']` gives 0→1 progress; a smoothstep of that lerps the accent rgb values (`GLOW`: orange→gold, `ELECTRIC`: lime→champagne) and writes `--color-accent-glow`, `--color-accent-electric` and `--accent-rgb` on `document.documentElement`. Progress clamps at 1, so the page stays gold after Works; the overrides are removed on unmount. To change the target colors, edit the `to` values there; to change when the shift happens, edit the offset.

## Conventions

- Function components, default exports for components, named exports for hooks/data. Files `.jsx` for components, `.js` otherwise.
- Style with Tailwind utilities using the theme tokens above; fall back to inline `style` for one-off values (gradients, rgba, dynamic values). Arbitrary values like `text-[clamp(...)]` and `tracking-[-4px]` are common here.
- Animation is framer-motion, not CSS transitions, for anything scroll- or mount-driven. Common easings: `[0.25, 0.46, 0.45, 0.94]` and `[0.22, 1, 0.36, 1]`.
- Wrap section content in `.page-shell`.
- ESLint quirk: `no-unused-vars` ignores names starting with an uppercase letter or `_` (`varsIgnorePattern: '^[A-Z_]'`). It does not understand `<motion.div>` as a use of `motion` (see Known issues).
- Match the existing formatting per file: `App.jsx` and components use semicolons; `main.jsx`, `vite.config.js` and `eslint.config.js` (Vite template files) do not.

## Editing content

- **Add/change a project:** edit [src/data/selectedWorks.js](src/data/selectedWorks.js) and drop an image in `src/assets/`. Fields: `id`, `num`, `title`, `desc`, `image` (optional — cards without one show just the gradient and big number), `categoryColor`, `gradient`, `layout` (`'grid' | 'featured' | 'offset'`), optional `brutal`, and `category` (rendered on every card that sets it, but currently commented out on the two real entries). Project cards are not links yet ("View Project" is decorative). There are 4 entries in a 2-col grid; `project-03` and `project-04` are **placeholders** with no image and generic copy.
- **Add/change skills:** edit [src/data/skills.js](src/data/skills.js) — an array of `{ title, items: [...] }`. The current entries are **starter content derived from this site's own stack** (plus generic design skills), not confirmed by the owner; treat as placeholders. The grid is tuned for 4 groups; a different count still works but may leave an uneven last row.
- **Change stats / manifesto:** hardcoded in [src/components/About.jsx](src/components/About.jsx).
- **Change social links:** they appear in two places — the overlay in `App.jsx` and `socials` in `Footer.jsx`. All are `#`. Once real, also fill in the JSON-LD `sameAs` array in `index.html`.
- **Change `/agents` content:** edit [src/pages/AgentsPage.jsx](src/pages/AgentsPage.jsx) directly (About paragraph, "Notes for crawlers" list); Skills and Selected Works sections pull live from the same data files as the home page, so those update automatically.
- **Change colors/fonts:** edit `@theme` in `index.css`. Fonts must also be present in the Google Fonts `<link>` in `index.html`.

## Known issues and loose ends

Things a future change may want to fix or should not be surprised by:

- **Placeholder content:** the manifesto quote is literally `"Placeholder quote box"`; social links are `#`; About stats (8+ years / 47 projects / 12 awards) and the Awwwards/CSSDA/FWA claim are unverified copy — confirm with the owner before treating them as real.
- **Broken favicon reference:** `index.html` points at `/vite.svg`, but `public/` only contains `favicon.svg` (and `icons.svg`).
- **Dead code:** `DesignTicker.jsx` is never imported; `hero.png`, `react.svg`, `vite.svg` and `works-03.png` (another Streamera screenshot) in `src/assets` are unused by any component.
- **`npm run lint` currently fails (~18 errors, 2 warnings)** — the build is unaffected. Breakdown:
  - ~10 `no-unused-vars` errors on `import { motion }` in nearly every component. These are **false positives**: the config has no `react/jsx-uses-vars`, so core ESLint doesn't see `<motion.div>` as a use. Don't delete those imports. A real fix is to add `eslint-plugin-react` (or extend `varsIgnorePattern` to include `^motion$`).
  - Real: unused `start` in `About.jsx` `AnimatedNumber`.
  - Real (React Compiler-style rules from `eslint-plugin-react-hooks` v7): `Math.random()` during render in `Hero.jsx` (`react-hooks/purity`); `magnetic.ref`/`.x`/`.y` read during render in `CTA.jsx` (`react-hooks/refs`).
  - Warnings: missing `useEffect` deps (`cursorX/Y`, `x/y`) in `useMagneticCursor.js` — motion values are stable, so this is harmless.
  - When touching a file, don't introduce *new* lint errors, and compare against this baseline.
- **Cursor coverage:** `cursor-none` is applied to `<main>` only, so the navbar, footer and overlay still show the native cursor alongside the custom one on desktop.
- **Hero performance:** `BrutalistGeometry` runs ~45 concurrent infinite animations with `Math.random()` durations evaluated at render (values change on re-render). Be careful adding re-renders to `Hero`.
- **Hero layout:** decorative grid lines use fixed pixel `left` offsets (360/720/1080) and don't adapt to the container width.
- **Mobile:** several headlines use `whitespace-nowrap`; check narrow viewports (~360px) when touching those.
- **Letter-spaced buttons:** `letter-spacing` adds trailing space after the last letter, so the Contact/CONNECT buttons use a slightly larger left padding (`pl-8.5`, `pl-[calc(3.5rem+10px)]`) to keep the label optically centered. Keep that offset if you change the tracking.
- **Metadata:** `package.json` name and `README.md` are template leftovers.
- **Placeholder domain (`https://example.com`)** in `sitemap.xml`, `robots.txt` and the `index.html` JSON-LD — must be replaced with the real domain before deploying (see "/agents route and SEO" above).
- **No tests, no CI.** `vercel.json` and `public/_redirects` exist only for the `/agents` SPA rewrite, not full deployment config.
