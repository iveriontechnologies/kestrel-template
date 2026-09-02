# Marketplace assets

What is here, how it was made, and the two pieces still outstanding.

---

## Captured

All screenshots were taken against the **production build** (`npm run build && npm run start`),
not the dev server, so what you see is what a visitor gets.

| File | Viewport | Page | Theme |
| --- | --- | --- | --- |
| `screenshots/01-home-dark.png` | 1440×900 | Home, above the fold | Dark |
| `screenshots/02-home-dark-full.png` | 1440×3400 | Home, long scroll | Dark |
| `screenshots/03-home-light.png` | 1440×900 | Home, above the fold | Light |
| `screenshots/04-pricing-dark.png` | 1440×1700 | Pricing | Dark |
| `screenshots/05-blog-dark.png` | 1440×1250 | Blog index | Dark |
| `screenshots/06-post-dark.png` | 1440×1500 | Blog post | Dark |
| `screenshots/07-changelog-dark.png` | 1440×1500 | Changelog | Dark |
| `screenshots/08-mobile-home-dark.png` | 390×844 | Home | Dark |
| `screenshots/09-mobile-pricing-dark.png` | 390×1500 | Pricing | Dark |
| `screenshots/10-404-dark.png` | 1440×900 | 404 | Dark |
| `screenshots/11-pricing-light.png` | 1440×1700 | Pricing | Light |
| `screenshots/12-post-light.png` | 1440×1500 | Blog post | Light |
| `thumbnail.png` | 1280×720 | Marketplace card | Dark |

`thumbnail.html` is the source for the thumbnail — edit the headline or the chips
there and re-render with the command below.

### How to re-capture

Start the production server, then run headless Edge or Chrome with
`--screenshot`. No tooling to install:

```bash
npm run build
npm run start -- -p 3100
```

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,900 \
  --screenshot="marketing\screenshots\01-home-dark.png" \
  "http://localhost:3100/"
```

For the thumbnail, add `--allow-file-access-from-files` and point at
`file:///…/marketing/thumbnail.html`.

**Light-theme shots need one extra step.** The captures run before any JavaScript
sets a theme preference, so they always render the default. To capture light mode,
temporarily set `defaultTheme="light"` in `app/layout.tsx`, rebuild, capture, then
**change it back and rebuild again**. That is how `03`, `11`, and `12` were made.

---

## Still outstanding

Two items from the build plan that need you.

### 1. Deploy the demo

Not done — you asked to handle deployment yourself. Once it is live:

- Set `NEXT_PUBLIC_SITE_URL` to the demo's real URL in the host's environment
  variables. Without it the sitemap and every canonical point at
  `kestrel.example.com`, which is the placeholder in `site.config.ts`.
- Walk every page in both themes on the deployed URL before linking to it from a
  listing. Everything was verified locally against a production build, but a
  deployment is its own environment.
- Put the demo link at the very top of both listings. For a template, the live
  demo does more selling than any screenshot.

### 2. Scroll-through video

Not done — it needs a screen recording, which I cannot produce.

Suggested shape, about 20 seconds:

1. Home, top of page, dark. Pause a beat on the hero and the dashboard mockup.
2. Scroll steadily to the footer, slowly enough that the section reveals read as
   deliberate rather than as jitter.
3. Click the theme toggle. Let the light theme sit for two seconds.
4. Cut to `/pricing`, toggle monthly → annual so the prices animate.
5. Cut to a blog post, scroll past the table and the code block.

Record at 1440×900 and export at 1280×720. No captions needed — the point is that
it looks finished and nothing jumps.

---

## Before you publish the listing

- [ ] Demo deployed, and `NEXT_PUBLIC_SITE_URL` set on the host
- [ ] Demo link at the top of both listings
- [ ] Screenshots re-captured if you changed anything visual
- [ ] Video recorded
- [ ] `LICENSE.md` — one placeholder remains: **§13 governing law / jurisdiction**.
      Search the file for `TO BE COMPLETED`.
- [ ] `LICENSE.md` reviewed by a lawyer. The jurisdiction choice in §13 interacts with
      consumer-protection law wherever your buyers are, and §8, §9, and §11 are the
      clauses most likely to be tested.
- [ ] If **Iverion Technologies** is registered as a company before launch, decide
      whether to keep licensing personally or assign the copyright to the entity and
      reissue the licence in its name. The licensor is currently Israel Ahunanya, the
      natural person who holds the copyright — which is correct while the company is
      unregistered.
- [ ] The zip excludes `context/`, `AGENTS.md`, `memory.md`, `marketing/`,
      `node_modules/`, and `.next/`
- [ ] Numbers in `LISTING.md` still match what you measure today
