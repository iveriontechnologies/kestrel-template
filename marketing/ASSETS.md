# Marketplace assets

What is here, how it was made, and the two pieces still outstanding.

---

## Captured

All shots are taken against the **production build** (`npm run build && npm run start`),
not the dev server, so what you see is what a visitor gets.

| File | Output | Page | Theme |
| --- | --- | --- | --- |
| `screenshots/01-home-dark.png` | 2880×1800 (1440×900 @2x) | Home, above the fold | Dark |
| `screenshots/02-home-dark-full.png` | 1440×6757 | Home, full page | Dark |
| `screenshots/03-home-light.png` | 2880×1800 @2x | Home, above the fold | Light |
| `screenshots/04-home-light-full.png` | 1440×6757 | Home, full page | Light |
| `screenshots/05-pricing-dark.png` | 1440×4829 | Pricing, full page | Dark |
| `screenshots/06-pricing-light.png` | 1440×4829 | Pricing, full page | Light |
| `screenshots/07-blog-dark.png` | 1440×1817 | Blog index, full page | Dark |
| `screenshots/08-post-dark.png` | 1440×3017 | Blog post, full page | Dark |
| `screenshots/09-post-light.png` | 1440×3017 | Blog post, full page | Light |
| `screenshots/10-changelog-dark.png` | 1440×2995 | Changelog, full page | Dark |
| `screenshots/11-404-dark.png` | 2880×1800 @2x | 404 | Dark |
| `screenshots/12-mobile-home-dark.png` | 780×1688 (390×844 @2x) | Home | Dark |
| `screenshots/13-mobile-home-dark-full.png` | 390×9567 | Home, full page | Dark |
| `screenshots/14-mobile-pricing-dark.png` | 780×1688 @2x | Pricing | Dark |
| `screenshots/15-mobile-home-light.png` | 780×1688 @2x | Home | Light |
| `thumbnail.png` | 2560×1440 (1280×720 @2x) | Marketplace card | Dark |

`thumbnail.html` is the source for the card — edit the headline or the chips
there and re-run the capture.

**Need a close-up of the dashboard mockup?** Crop it out of
`02-home-dark-full.png`. It sits roughly 850–1450px down at full width.

### How to re-capture

```bash
npm run build
npx next start -p 3100     # leave running in one terminal
node marketing/capture.mjs # in another
```

The script wipes `screenshots/`, re-shoots everything in the list at the top of
`capture.mjs`, and re-renders the thumbnail last (it embeds shot 01, so order
matters). Add or change a shot by editing that list. `BROWSER=/path/to/chrome`
overrides the browser; `ORIGIN=…` points it at a deployed URL instead of
localhost.

### Why a script instead of a one-line browser flag

Three things the `--screenshot` command-line flag gets wrong here, all of which
produced bad assets before the script existed:

- **Scroll reveals.** Sections start at `opacity: 0` and are revealed by an
  IntersectionObserver. The flag captures on load, before any of that runs, so
  everything below the hero came out **completely blank**. The script emulates
  `prefers-reduced-motion`, which the stylesheet honours by painting every
  section visible at first paint with no JavaScript involved.
- **Viewport size.** The browser subtracts window chrome from `--window-size`
  (asking for 1440×844 gives a 1414×751 viewport) and enforces a minimum width
  around 496px. A 390px mobile request rendered the page at 496 and cropped it
  to 390, cutting the headline and the logo cloud off mid-word. The script sets
  device metrics over the DevTools protocol, so 390 means 390.
- **Extensions.** A force-installed browser extension painted a floating badge
  into the bottom-right corner of every capture, and a fresh profile did not
  stop it. The script passes `--disable-extensions`.

It also removes a manual step: light-mode shots used to need `defaultTheme`
flipped in `app/layout.tsx` and a rebuild. The script seeds `localStorage`
before the page's own scripts run, so both themes come out of one pass.

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
