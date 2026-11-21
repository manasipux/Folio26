# Manasi — UX portfolio

Vite + React + TypeScript, React Router, plain CSS, Motion (framer-motion). Static build, free on Vercel.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Editing content (no component changes needed)

**All words, links, projects and images live in `src/content.ts`.**

- Search the file for `TODO` to find every placeholder. Replace the whole `[TODO: …]` string.
- **Email / LinkedIn:** set `site.email` and `site.linkedin`. Until they're filled in, they show as plain text rather than broken links.
- **Projects:** each entry in `projects` drives one Work card *and* its case study page at `/work/<slug>`.
  - Order matters for the bento grid: items 1–2 are the large top cards, 3–4 the medium bottom cards, 5–6 the stacked right column.
  - Case study fields (`role`, `timeline`, `problem`, `process`, `outcome`, `images`…) are under `caseStudy`.
  - The spare `ux-project` entry fills the 4th slot from the wireframe. Rename its slug and fill it in, or delete it.
  - Keep the IBM study free of confidential details.
- **About feed:** edit `about.feed` (photo + caption per post). Add as many as you like.
- **About copy:** `about.short` is shown; `about.long` sits behind "Read the longer story".

### Images

Put files in `public/images/` and reference them as `/images/my-photo.jpg`. Always write meaningful `alt` text. Current images are lightweight SVG placeholders you can delete once replaced. Images lazy-load automatically.

### Illustrations

The Home objects are placeholder SVGs, one component each, in `src/components/illustrations/`:

| Component | Links to |
| --- | --- |
| `PencilIllustration.tsx` | Work |
| `PassportIllustration.tsx` | About me |
| `FlipPhoneIllustration.tsx` | Contact me |
| `ContactPhone.tsx` | the large phone on the Contact page |

Replace the `<svg>` inside with your final art (or an `<img>`). Leave `aria-hidden="true"` on it, since the link around it already carries the accessible label.

### Look and feel

All colours, the type scale, radii and spacing are CSS variables in `src/styles/tokens.css`.

**Swapping to Maison Neue:**
1. Add the font files and an `@font-face` (or the foundry's CSS).
2. Change `--font-sans` in `tokens.css`.
3. Remove the Google Fonts `<link>` in `index.html`.

## Deploying to GitHub Pages (free)

A workflow in `.github/workflows/deploy-pages.yml` builds and publishes the site every time you push to `main`.

1. In the repo on GitHub, go to **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
2. Merge your work into `main` (or push to it). The **Actions** tab shows the "Deploy to GitHub Pages" run.
3. When it's green, the site is live at **https://manasipux.github.io/Folio26/**.
4. To redeploy without a code change, open **Actions → Deploy to GitHub Pages → Run workflow**.

How it handles Pages quirks:
- **Subfolder URL:** the site is served from `/Folio26/`, so the workflow sets `BASE_PATH` and all links and images are prefixed automatically. Keep writing image paths as `/images/…` in `content.ts`.
- **Deep links:** `index.html` is copied to `404.html`, so refreshing `/work/salt-pe` still loads the app.
- **Custom domain:** if you add one (Settings → Pages → Custom domain), change `BASE_PATH` in the workflow to `/`.

To test a Pages-style build locally:

```bash
BASE_PATH=/Folio26/ npm run build && npm run preview
```

Then open http://localhost:4173/Folio26/.

## Deploying to Vercel (alternative)

1. Push this repo to GitHub.
2. Go to <https://vercel.com>, sign in with GitHub, and click **Add New → Project**.
3. Import the repo. Vercel detects Vite automatically:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. Every push to the default branch redeploys; other branches get preview URLs.
5. Optional: add your own domain under **Project → Settings → Domains**.

`vercel.json` rewrites all routes to `index.html`, so deep links like `/work/salt-pe` work on refresh.

## Accessibility and motion notes

- **Keyboard:** the flip card is a real button (Enter/Space), and every nav item and object is a link with a visible focus ring. There is a skip link.
- **Reduced motion:** with `prefers-reduced-motion`, the tilt, float and 3D flip are replaced by a cross-fade.
- **Mobile:** below 768px the side nav becomes a bottom tab bar and the Home card tilts less.
