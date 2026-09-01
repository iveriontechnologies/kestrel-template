# Kestrel

A premium landing page template for Next.js 16, built for SaaS and developer-tool
companies. Dark-first, fully responsive, and written so that rebranding it means
editing one config file rather than opening components.

Every page is included: home, pricing, blog with MDX, changelog, and a 404. Both
light and dark themes are complete, and every colour pair in the template clears
WCAG AA in both.

**New here? Read [SETUP.md](SETUP.md).** It is the thirty-minute walkthrough from
a fresh clone to your own brand, deployed.

---

## What is in the box

| | |
| --- | --- |
| **Pages** | Home, pricing, blog index, blog post, changelog, 404 |
| **Home sections** | Hero, dashboard mockup, logo cloud, feature bento, how-it-works, testimonials, pricing tiers, FAQ, closing CTA |
| **Content** | MDX blog and changelog, zod-validated frontmatter, drafts excluded from production builds |
| **Forms** | Newsletter and contact, both with inline validation, pending, and success states |
| **SEO** | Per-page metadata, canonicals, OpenGraph, Twitter cards, a generated OG image, sitemap, robots, JSON-LD |
| **Theming** | Light and dark, no flash on load, one accent token drives the whole palette |
| **Motion** | Scroll reveals with no animation library, disabled under `prefers-reduced-motion` |

### What is deliberately not included

No database, no authentication, no analytics, no chart library, and no animation
library. This is a marketing site. Adding those is your decision, not one the
template makes for you — which is also why the whole thing is 383 KiB on the wire.

---

## Requirements

- **Node.js 20.9 or newer**
- npm, pnpm, yarn, or bun

## Install

```bash
npm install
```

## Develop

```bash
npm run dev
```

Then open <http://localhost:3000>.

## Build and run in production

```bash
npm run build
npm run start
```

## Lint and typecheck

```bash
npm run lint
npx tsc --noEmit
```

Both are clean on a fresh clone. If either fails, something you changed caused it.

---

## Project layout

```
site.config.ts        Every user-facing string on the site. Start here.
app/globals.css       Every colour, size, and radius. The design lives here.
app/                  Routes. Composition only — no copy, no logic.
components/           Presentation. Reads props and tokens.
content/blog/         Blog posts, one .mdx file each
content/changelog/    Release notes, one .mdx file each
actions/              Server Actions for the two forms — your wiring points
lib/                  Content reading, SEO builders, form validation, helpers
types/                The shape of site.config.ts
licenses/             Font licence
```

Two files are where almost all customisation happens: **`site.config.ts`** for
words, **`app/globals.css`** for looks.

---

## Deploy

The template is fully static — every page is prerendered at build time — so it
runs anywhere that can serve a Next.js build.

### Vercel

Import the repository and deploy. Set `NEXT_PUBLIC_SITE_URL` to your domain in
the project's environment variables (see [.env.example](.env.example)).

### Anywhere else

```bash
npm run build
npm run start
```

`npm run start` serves the built output on port 3000. Put it behind your usual
reverse proxy, or use the Docker image of your choice — there is nothing
Vercel-specific in the code.

---

## Before you ship

Two things in this template are **fictional and must be replaced**:

- The companies in the logo cloud and testimonials — Loomstack, Fernwood,
  Trellis Health, Northbound, Halcyon, Meridian — do not exist, and neither do
  the people quoted. Shipping them implies customers you do not have.
- The two `TODO (buyer):` markers in `actions/`. Until you connect a provider,
  the newsletter and contact forms accept input and do nothing with it.

Search the project for `TODO (buyer):` to find the wiring points. There are
exactly two.

---

## Licence

Commercial licence — see [LICENSE.md](LICENSE.md). In short: use it for as many
of your own projects as you like, do not resell or redistribute the template
itself.

Geist Sans and Geist Mono are licensed separately under the SIL Open Font
License 1.1; the full text is in [licenses/GEIST-OFL.txt](licenses/GEIST-OFL.txt).
