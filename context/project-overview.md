# Project Overview

## About the Project

Kestrel is a premium landing page template for B2B SaaS companies, built in Next.js 16 with Tailwind v4 and shadcn/ui. It ships as a commercial product sold on Gumroad and Creative Market.

The template is themed as the marketing site for a fictional product-analytics SaaS, also called Kestrel. That fictional product exists to give the template realistic copy, a believable pricing structure, and a coded dashboard mockup — everything a buyer needs to see the design working with real-looking content before they replace it with their own.

The central promise to the buyer: **rebrand the entire site by editing two files.** All copy, navigation, pricing tiers, testimonials, and SEO live in `site.config.ts`. All colors, typography, and spacing live in the `@theme` block of `app/globals.css`. A buyer should never need to open a component to make the site theirs.

---

## The Problem It Solves

A solo founder or small agency launching a B2B SaaS needs a marketing site that looks like it came from a funded company. Their options today are all bad:

- **Free templates** look free. Generic type, default shadcn colors, and thin sections that read as unfinished.
- **Hiring a designer** costs thousands and takes weeks before a line of code exists.
- **Building it themselves** means spending a week on a hero section instead of on the product.

Kestrel closes that gap: a designed, complete, production-ready marketing site they can rebrand in half an hour and deploy the same day.

---

## Pages

Six pages ship in v1.

```
/                  → Home — the full landing page, 10 sections
/pricing           → Dedicated pricing page with comparison table and FAQ
/blog              → Blog index, card grid, MDX-driven
/blog/[slug]       → Individual blog post, MDX-rendered
/changelog         → Product changelog, MDX-driven, reverse chronological
/not-found         → 404
```

---

## Navigation

Top navigation bar, sticky, translucent with a backdrop blur over content.

```
Kestrel [logo]    Features    Pricing    Blog    Changelog        [Sign in]  [Start free]
```

- Left: wordmark and logo mark
- Center: text links. `Features` scrolls to the home page feature section; the rest are page routes.
- Right: a ghost `Sign in` link and a solid `Start free` button. Both are visual — they point at `#` by default and are configurable in `site.config.ts`.
- Below 768px the center links collapse into a hamburger that opens a full-screen overlay menu.
- A theme toggle sits to the left of `Sign in`.

Footer is four columns — Product, Company, Resources, Legal — over a bottom bar with the wordmark, copyright, and social icons.

---

## Core User Flow

There are two users, and both journeys must work.

### The visitor (what the landing page does)

Reads top to bottom on the home page, in this order:

1. **Nav** — orients, sees the primary CTA immediately
2. **Hero** — headline, subheadline, two CTAs, and the coded dashboard mockup directly below. The mockup is the single most important element on the page; it is what makes the template look expensive in a marketplace thumbnail.
3. **Logo cloud** — six greyscale company marks under a line of social proof text
4. **Feature grid** — six features in a bento-style grid, each with an icon, title, and one-line description. Two cells span wider and carry a small visual.
5. **How it works** — three numbered steps, horizontal on desktop, stacked on mobile
6. **Testimonials** — three quote cards with avatar, name, role, and company
7. **Pricing tiers** — three tiers, monthly/annual toggle, middle tier highlighted as most popular
8. **FAQ** — six questions in an accordion, one open by default
9. **Final CTA** — full-width band with headline and a single button
10. **Footer**

### The buyer (what rebranding looks like)

This flow is the product. It must be true, and the README documents it step by step.

1. Buyer unzips, runs `npm install`, runs `npm run dev`, sees the site running
2. Opens `site.config.ts` — replaces product name, headlines, nav items, pricing tiers, testimonials, footer links, and SEO metadata
3. Opens `app/globals.css` — changes the accent color token and, if desired, the radius scale
4. Replaces the logo mark component in `components/brand/`
5. Adds their own posts as `.mdx` files in `content/blog/`
6. Deploys

Anything that forces the buyer outside those five steps to rebrand is a design defect, not a customization opportunity.

---

## Data Architecture

There is no database, no API, and no authentication. All content is static and lives in the repository.

| Content | Lives in | Changed by |
| ------- | -------- | ---------- |
| All site copy, nav, pricing, testimonials, FAQ, footer, SEO | `site.config.ts` | Buyer, directly |
| Design tokens | `app/globals.css` `@theme` block | Buyer, directly |
| Blog posts | `content/blog/*.mdx` | Buyer adds files |
| Changelog entries | `content/changelog/*.mdx` | Buyer adds files |
| Dashboard mockup data | `lib/mock-dashboard.ts` | Static arrays, illustrative only |

Form submissions do not persist anywhere. The newsletter and contact Server Actions validate input, simulate latency, and return success — with a documented `TODO` marking where the buyer connects their own provider.

---

## Features In Scope

- Home page with all 10 sections listed above
- Coded HTML/CSS dashboard mockup — charts, sidebar, stat cards, fully themed, no images
- Dedicated pricing page with tier comparison table and pricing-specific FAQ
- Blog index with card grid and tag filtering
- Individual blog post pages rendered from MDX, with typography styles for all elements
- Changelog page rendered from MDX, reverse chronological, version-tagged
- 404 page consistent with the design
- Light and dark themes, both fully designed, driven from one token set
- Theme toggle with preference persisted to `localStorage`, no flash on load
- Sticky translucent navigation with mobile overlay menu
- Scroll-reveal animations on section entry, respecting `prefers-reduced-motion`
- Monthly/annual pricing toggle with the annual discount applied live
- FAQ accordion
- Newsletter form in the footer — validated, with loading, success, and error states
- Contact form — validated, same state handling
- `site.config.ts` as the single source of all copy and structure
- Full SEO — per-page metadata, OpenGraph images, `sitemap.xml`, `robots.txt`, JSON-LD
- Responsive from 320px to 1920px
- README, setup guide, and commercial license
- Live demo deployment
- Marketplace preview assets — thumbnail, screenshot set, scroll-through video

---

## Features Out of Scope

Explicitly not built in v1. Each was considered and deliberately excluded.

- Backend of any kind — no API routes beyond form stubs, no database, no ORM
- Authentication — no login, signup, sessions, or protected routes
- A real analytics product — the dashboard is a marketing mockup, not a working app
- Docs page — reserved as a v2 upsell
- About page — reserved as a v2 upsell
- Contact page as a route — the contact form appears in the footer only
- Login and signup screens — v2 upsell, commonly requested
- i18n, multi-language, and RTL support
- Storybook
- Unit, integration, or E2E tests
- CI/CD pipelines
- Figma source file — deliberately excluded from v1 deliverables
- Multiple preset color themes — one accent, buyer-changeable
- CMS integration — MDX only
- E-commerce, checkout, or payment integration
- Cookie consent banner
- Search
- Comments on blog posts
- RSS feed
- Blog post author pages

---

## Target User

The buyer is a **solo technical founder or a two-to-five person agency**, who:

- Is shipping a B2B SaaS and needs a marketing site now, not in three weeks
- Is comfortable running `npm install` and editing a TypeScript config file
- Knows React well enough to be dangerous, but does not want to design
- Has looked at free templates and concluded they look free
- Will pay $39–79 to skip a week of work
- Finds templates by searching "Next.js SaaS landing page template" on Gumroad, or browsing Creative Market's web templates category

They are not a designer. They will not fix your spacing. If it does not look right out of the box, they refund it and leave a two-star review.

---

## Success Criteria

Observable and checkable. Each is verified before the product goes on sale.

1. A buyer can change the product name, all headlines, nav, pricing, and footer by editing `site.config.ts` alone — verified by doing it end to end without opening a component
2. Changing the `--color-accent` token in `globals.css` rebrands the entire site coherently, including the dashboard mockup, in both modes
3. Lighthouse scores 95+ on Performance, Accessibility, Best Practices, and SEO on the deployed home page
4. Every page renders correctly in both light and dark mode with no unstyled or invisible elements
5. No horizontal scroll and no overlapping elements at any width from 320px to 1920px
6. Theme selection persists across reloads with no flash of the wrong theme
7. A new blog post appears on `/blog` and renders at its own URL by adding one `.mdx` file and nothing else
8. All animations are disabled when `prefers-reduced-motion: reduce` is set
9. Every interactive element is reachable and operable by keyboard, with a visible focus ring
10. `npm install && npm run build` succeeds from a clean clone with zero errors and zero warnings
11. The README takes a buyer from unzip to a rebranded running site in under 30 minutes
