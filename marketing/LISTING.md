# Marketplace listing copy

Paste-ready copy for Gumroad and Creative Market, plus the shared feature list.

**Live demo: https://kestrel-template.vercel.app** — it belongs at the top of both
listings and in the first line of the description. For a template, the demo does
more selling than any screenshot.

**Every number in here was measured, not estimated.** If you change the template
before listing it, re-measure before you republish — an inflated Lighthouse score
in a listing is the kind of thing buyers check.

Last measured **4 September 2026**, against a production build (`npm run build`
then `next start -p 3100`) with Lighthouse 12 on its default mobile preset.
Performance is the median of three consecutive runs — a single run on a busy
machine came in at 76, so one run is not a measurement.

---

## Short description (one line)

> A premium Next.js 16 landing page template for SaaS and developer tools. Six
> pages, an MDX blog, light and dark — and one config file that holds every word
> on the site.

**Under 60 characters**, for cards and search results:

> Next.js landing page template with an MDX blog

---

## Gumroad

### Title

`Kestrel — Next.js 16 Landing Page Template`

### Description

**Live demo → https://kestrel-template.vercel.app**

Most landing page templates look good in the screenshots and fight you the moment
you open them. Kestrel is built the other way round: **every user-facing string on
the site lives in one typed config file**, and every colour lives in one CSS file.
Change the accent token and the whole site rebrands — buttons, links, focus rings,
the highlighted pricing tier, even the chart in the dashboard mockup.

You get six complete pages, not a hero and some placeholders: home, pricing, a
blog index, a blog post, a changelog, and a 404 that matches the design instead of
being the Next.js default.

**What makes it different**

- **One file to rebrand.** `site.config.ts` is typed, so your editor tells you
  what to fill in and the build fails rather than shipping something half-edited.
- **Dark-first, and light is not an afterthought.** Both themes are complete, and
  every colour pair clears WCAG AA in both — measured, not assumed.
- **Deliberately light.** No chart library, no animation library, no analytics.
  The dashboard mockup is hand-written SVG; the scroll reveals are 60 lines of
  IntersectionObserver. The home page is 358 KiB on the wire.
- **A real MDX pipeline.** Blog and changelog, frontmatter validated with zod so a
  typo fails the build and names the file, drafts hidden in production, read time
  calculated from the body so there is nothing to keep in sync.
- **SEO already done.** Per-page canonicals, OpenGraph, Twitter cards, a generated
  OG image in your brand font, sitemap, robots, and JSON-LD.
- **Forms that work.** Newsletter and contact, with inline validation, pending
  states, and inline confirmation. Two `TODO (buyer):` markers show you exactly
  where to connect your provider.

**Measured, on the production build**

| | |
| --- | --- |
| Lighthouse accessibility | 100 |
| Lighthouse best practices | 100 |
| Lighthouse SEO | 100 |
| Lighthouse performance | 93–95 depending on page |
| Cumulative layout shift | 0 |
| Home page weight | 358 KiB |

**What you receive**

- Full source — Next.js 16, React 19, TypeScript strict, Tailwind CSS v4
- Six pages and every section component
- Six sample blog posts and four changelog entries, so you can see the layouts full
- `SETUP.md`, a thirty-minute walkthrough from clone to deployed
- Commercial licence: unlimited projects, yours and your clients'

**Requirements:** Node.js 20.9+. Deploys to Vercel in a click, or anywhere that
runs a Next.js build.

---

### Filling in the Gumroad form

Field by field, in the order Gumroad asks. Every value is decided — this is
transcription, not decisions.

| Field | Value |
| --- | --- |
| Product type | Digital product |
| Name | `Kestrel — Next.js 16 Landing Page Template` |
| URL slug | `kestrel` (or `kestrel-nextjs-template` if taken) |
| Price | **$39** |
| Cover / thumbnail | `marketing/thumbnail.png` |
| Gallery images | `marketing/screenshots/01, 03, 05, 07, 08, 12` in that order |
| Video | Yours. Put it first if Gumroad lets you order it above the images |
| Product file | `kestrel-template.zip` |
| Summary | The one-liner at the top of this file |
| Description | The Gumroad description above, demo link on the first line |
| Category | Software & Development, or Design if that reads better to you |
| Tags | `nextjs`, `react`, `tailwind`, `landing-page`, `saas`, `template`, `typescript`, `mdx` |
| Refund policy | Whatever you choose — §11 of the licence defers to it, so they cannot conflict |
| Content rating | All audiences |

**Gallery order matters more than the count.** Six is plenty. Lead with the dark
home page, then light, then pricing — pricing is where a buyer decides the
template is complete rather than a hero and filler. The full-page shots
(`02`, `04`) are better linked from the description than dropped in the gallery,
where their aspect ratio makes every other thumbnail small.

**Price: $39.** Decided 5 September 2026.

If you want the struck-through-price effect later, Gumroad does it by raising the
list price and adding a discount — not by editing the number. Raising it on a
product that already has sales is the awkward direction, so if a launch discount
appeals at all, set the list price higher *before* the first sale and discount
down to 39. Otherwise leave it at a flat 39 and ignore this.

Whatever you choose, do not put a fake "was $99" in the description text. It is
the one thing in a listing a buyer can check, and it costs more trust than the
discount buys.

**Before you hit publish**

- Open the demo link from the description in a private window. It is the first
  thing a buyer clicks and the one thing that must not 404.
- Check the description renders — Gumroad's editor can eat the markdown table.
  If it does, the plain feature list further down this file is the fallback.
- Confirm the uploaded zip is the current one: 168 KB, unpacks to `kestrel/`.

## Creative Market

Creative Market rewards a benefit-led opening and a scannable list. Same
substance, different shape.

### Title

`Kestrel - Next.js SaaS Landing Page Template`

### Opening paragraph

**Live demo → https://kestrel-template.vercel.app**

> Launch a landing page that looks like it took a month, in an afternoon. Kestrel
> is a complete Next.js 16 template for SaaS and developer tools — six pages, an
> MDX blog, and a light and dark theme that are both finished. Rebranding it means
> editing one config file and one colour, not hunting through components.

### Highlights

- Six complete pages: home, pricing, blog, blog post, changelog, 404
- Ten home page sections, including a hand-built dashboard mockup that rethemes
  with your brand colour
- MDX blog and changelog with validated frontmatter and automatic read time
- Light and dark, both complete, both clearing WCAG AA contrast
- Newsletter and contact forms with validation and clearly marked wiring points
- Full SEO: canonicals, OpenGraph, generated OG image, sitemap, robots, JSON-LD
- Self-hosted Geist fonts — nothing phones home
- No chart library, no animation library, no tracking

### What's included

- Complete source code (Next.js 16, React 19, TypeScript, Tailwind CSS v4)
- Six sample blog posts and four changelog entries
- README and a step-by-step setup guide
- Commercial licence for unlimited personal and client projects

### Software required

Node.js 20.9 or newer. Any code editor. No design software needed.

---

## The feature bullet list

Reusable anywhere a short list is wanted.

```
✓ Live demo: https://kestrel-template.vercel.app
✓ Six complete pages — home, pricing, blog, post, changelog, 404
✓ One typed config file holds every word on the site
✓ Light and dark themes, both complete, both WCAG AA
✓ MDX blog and changelog with validated frontmatter
✓ Hand-built dashboard mockup — no chart library
✓ Scroll reveals with no animation library
✓ Newsletter and contact forms, with two clear wiring points
✓ Full SEO: canonicals, OG image, sitemap, robots, JSON-LD
✓ Self-hosted fonts, no third-party requests
✓ Lighthouse 100 accessibility / best practices / SEO
✓ Next.js 16, React 19, TypeScript strict, Tailwind CSS v4
✓ Commercial licence — unlimited projects
```

---

## What to say about the demo content

Say it plainly somewhere in the listing. Buyers appreciate it, and it protects you.

> The companies and testimonials in the demo are fictional. They exist so you can
> see the layouts populated, and the setup guide walks you through replacing them
> before you launch.

---

## Claims to avoid

Do not write these. Each one is either untrue or unverifiable.

- ~~"100 Lighthouse scores"~~ — performance measures 93–95, not 100. Say what it is.
- ~~"Fully accessible"~~ — contrast, targets, focus, and heading order were tested.
  That is not the same as an audit of the whole WCAG spec by a specialist.
- ~~"SEO optimised — rank #1"~~ — the metadata is complete. Rankings are not yours
  to promise.
- ~~"Lifetime updates"~~ — only if you intend to provide them.
- ~~"Used by X companies"~~ — the logo cloud is fictional, and so is that claim.
