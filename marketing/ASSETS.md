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

## The demo

Live at **https://kestrel-template.vercel.app**.

Verified against the deployment: all six routes return 200, `/no-such-page`
returns a real 404, the blog index lists six posts, and `/opengraph-image`
serves a 60 KB PNG. Canonicals, `og:url`, `og:image`, the `robots.txt` sitemap
line, and all ten sitemap `<loc>` entries carry the deployed origin.

`NEXT_PUBLIC_SITE_URL` is set in the Vercel project's environment variables.
Two things about that variable are worth remembering, because both bit us:

- **`.env.example` is documentation, nothing more.** Next.js loads `.env`,
  `.env.local`, `.env.production` and `.env.development` — never `.env.example`,
  and a host reads none of them. Editing it changes no build anywhere. Keep the
  placeholder in it so a buyer who copies it to `.env.local` and forgets to edit
  gets an obviously-fake domain rather than this demo's.
- **`NEXT_PUBLIC_*` values are inlined at build time.** A redeploy that reuses
  the build cache keeps whatever value was baked in when that cache was made, so
  changing the variable and redeploying with the cache on appears to do nothing.
  Untick *Use existing Build Cache*, or push a commit.

Any production build that falls back to the placeholder now says so in the build
log (`[seo] Building with the placeholder URL …`), so this is diagnosable from
the log rather than by guessing at a CDN.

Still to do: put the demo link at the very top of both listings. For a template,
the live demo does more selling than any screenshot.

## The video

Recorded, and it runs over a minute. That is fine — a template listing is not an
ad, and a buyer who clicks play is already interested enough to watch a build
scroll. Two things matter more than the total length:

- **The first ten seconds.** Most platforms show the opening frame as the poster
  and most viewers decide inside that window. Open on the hero at the top of the
  home page in dark, already painted — not on an editor, a terminal, or a fade-in.
- **Nothing that dates it.** No visible clock, no browser profile or bookmarks
  bar, no notification. Those are what make a listing video look old in six
  months.

If a platform rejects it on length, trim rather than re-shoot: the theme toggle
and the pricing monthly/annual switch are the two moments worth keeping, and
everything between them can be cut.

## Building the buyer's zip

Built from `git archive`, not from a copy of the working directory — that way
nothing untracked or ignored can leak in, which is how `node_modules/` and stray
`.env` files end up in template downloads.

```bash
git archive HEAD | tar -x -C /tmp/kestrel
rm -rf /tmp/kestrel/context /tmp/kestrel/marketing        /tmp/kestrel/AGENTS.md /tmp/kestrel/memory.md
# then zip /tmp/kestrel so it unpacks to a single kestrel/ folder
```

`.gitignore` and `.env.example` stay in — buyers need both. `*.zip` is
gitignored, so the deliverable is never committed.

**Verify before you upload.** Extract the zip somewhere clean and run
`npm ci && npm run build`. `npm ci` fails outright if `package.json` and
`package-lock.json` disagree, which is the first thing a buyer would hit, and
the build proves the shipped tree stands on its own. Current zip: 84 entries,
166 KB, verified at v1.0.0.

---

## Before you publish the listing

- [x] Demo deployed, and `NEXT_PUBLIC_SITE_URL` set on the host
- [x] Demo link at the top of both listings
- [x] Screenshots re-captured if you changed anything visual — nothing visual has
      changed since the shoot. The favicon was replaced, but no screenshot shows a
      browser tab.
- [x] Video recorded
- [x] `LICENSE.md` complete — 14 sections, no placeholders, and it now covers the two
      cases a buyer actually hits: delivering a finished site to the client it was
      built for, and keeping the work in a private repository.
- [ ] If **Iverion Technologies** is registered before launch, decide whether to
      reissue the licence in the company's name. It currently names Israel Ahunanya,
      which is right while the company is unregistered.
- [x] The zip excludes `context/`, `AGENTS.md`, `memory.md`, `marketing/`,
      `node_modules/`, and `.next/` — build it with the recipe below rather than by
      hand, and it cannot go wrong twice.
- [x] Numbers in `LISTING.md` still match what you measure today — re-measured
      4 September 2026: home 358 KiB (was 383, the difference is the 25 KiB
      default favicon we dropped), performance 93–95, accessibility, best
      practices and SEO 100 on every page, CLS 0.
