# Build Plan

## Core Principle

Surface first, wiring second. Every section is built as visible UI with mock data and verified in both themes before any logic touches it. There are no invisible phases — after every numbered feature there is something you can look at and judge.

The template is a visual product. If a step produces nothing to see, it is in the wrong place.

Verify each feature at 375px, 768px, and 1440px in **both light and dark** before marking it done. A defect found three features later costs far more than the sixty seconds of checking.

---

## Phase 1 — Foundation

### 01 Project setup and design tokens

Next.js project running with the complete token system and both themes working.

**UI:**

- A temporary swatch page at `/` rendering every color, type scale step, radius, and shadow token
- A theme toggle in the corner to flip modes and confirm every token swaps

**Logic:**

- `create-next-app` with TypeScript, App Router, Tailwind v4
- `app/globals.css` with the full `@theme` block from `ui-tokens.md` — light on `:root`, dark on `.dark`
- Geist Sans and Geist Mono loaded in `app/layout.tsx`
- `next-themes` provider with `attribute="class"`, `defaultTheme="dark"`, `suppressHydrationWarning` on `<html>`
- `lib/utils.ts` with `cn()` and the shared constants
- shadcn/ui initialized, `button` added and retokenized

Done when: every token renders, the toggle swaps all of them, and there is no flash of the wrong theme on reload.

---

### 02 site.config.ts and types

The single source of copy, fully typed and fully populated with Kestrel content.

**UI:** None. This is a data feature — the swatch page from 01 stays up.

**Logic:**

- `types/index.ts` with `SiteConfig`, `Feature`, `Testimonial`, `PricingTier`, `FooterColumn`, `SocialLink`, `Post`, `ChangelogEntry` exactly as specified in `architecture.md`
- `site.config.ts` typed as `SiteConfig` and filled with complete Kestrel copy: headlines, six features, three how-it-works steps, three testimonials, three pricing tiers with one highlighted, six FAQ entries, six pricing FAQ entries, four footer columns, SEO defaults
- Copy must be genuinely good. It is what the buyer reads first and what appears in every marketplace screenshot. Placeholder lorem is a defect.

Done when: the config typechecks with zero errors and reads like real product marketing.

---

### 03 Layout shell — Section, Navbar, Footer

The frame every page sits in.

**UI:**

- `Section` wrapper: max width, horizontal padding, responsive vertical padding, `variant` prop for background alternation
- Sticky translucent `Navbar` with logo, center links, theme toggle, and two right-hand CTAs
- Border on the navbar appears only after scrolling past 8px
- `MobileMenu` — hamburger below 768px opening a full-screen overlay, closing on route change and Escape, locking body scroll
- Four-column `Footer` with bottom bar, wordmark, copyright, and social icons
- `Logo` component in `components/brand/`, clearly marked as the buyer's replacement point

**Logic:**

- Navbar and Footer read `siteConfig` directly, since they live in the root layout
- Scroll listener toggling the navbar border
- Active route detection for nav link state

Done when: the shell holds at every width, the mobile menu behaves correctly, and both themes are correct.

---

## Phase 2 — Home Page Surface

Every section below is built with content from `site.config.ts` and no interactivity beyond what is stated. Motion comes later, in feature 17.

### 04 Hero

**UI:**

- Eyebrow badge, display headline, lead subheadline, two CTAs
- Buttons stack full width below 640px
- Faint background grid with a radial mask
- One accent glow positioned behind where the mockup will sit
- A placeholder block reserving the mockup's exact dimensions

**Logic:** None. Content from `siteConfig.hero` and `siteConfig.ctas`.

---

### 05 Dashboard mockup

The single most important visual in the product. Budget real time here.

**UI:**

- App window frame replacing the placeholder from 04
- 200px sidebar with logo, six nav items, and an account block at the bottom
- Four stat cards with label, large value, and a coloured delta with arrow
- Line chart — inline SVG, area fill, gridlines, axis labels
- Bar chart — inline SVG, seven bars
- Small data table, five rows
- Below 768px: sidebar hidden, frame scrolls horizontally inside a masked container
- `aria-hidden="true"` on the whole mockup

**Logic:**

- `lib/mock-dashboard.ts` exporting typed static arrays for every number and label
- SVG paths computed from those arrays, not hardcoded — the charts must redraw if the data changes
- All strokes and fills use `currentColor` inheriting from chart token classes

Done when: it looks like a real product screenshot, rethemes completely when `--accent` changes, and is legible on a phone.

---

### 06 Logo cloud

**UI:** Caption line plus six company marks in a row, greyscale, lifting from `text-fg-muted` to `text-fg-secondary` on hover. Wraps to three columns on tablet, two on mobile.

> Corrected in feature 21. The original wording was "reduced opacity, lifting to full opacity on hover". At `opacity-70` the muted grey composited to 3.01:1 against the subtle background, which Lighthouse failed and a contrast check reading `color` alone cannot see — the computed value is still the passing token. The lift is a colour change instead.

**Logic:** None. Logos are inline SVG in `components/home/LogoCloud.tsx`, marked as buyer-replaceable.

---

### 07 Feature grid

**UI:** Section header plus six feature cards in a bento layout — two cards span two columns on desktop, all collapse to one column below 1024px. Each card has an icon square, title, and description.

**Logic:** None. Content from `siteConfig.features`, icons resolved from a name-to-component map.

---

### 08 How it works

**UI:** Section header plus three numbered steps, horizontal on desktop with a connecting line, stacked on mobile. Large muted step numerals behind each title.

**Logic:** None. Content from `siteConfig.howItWorks`.

---

### 09 Testimonials

**UI:** Section header plus three quote cards with quote text, avatar, name, role, and company. Three columns on desktop, one on mobile.

**Logic:** None. Content from `siteConfig.testimonials`. Avatars are initials in a tinted circle, not photos — avoids shipping stock imagery with licensing questions.

---

### 10 Pricing tiers

**UI:**

- Section header, monthly/annual switch, three tier cards
- Highlighted tier gets accent border, tinted header, and a "Most popular" badge on its top border
- Feature bullets with accent check icons
- Annual mode shows a discount badge by the toggle and a per-month equivalent under the price

**Logic:**

- Client component for the toggle
- Annual price computed as `monthlyPrice * 12 * (1 - annualDiscountPct / 100)` — never stored
- Price changes with a 150ms fade

---

### 11 FAQ and final CTA

**UI:**

- FAQ accordion, six items, first open by default, chevron rotating on expand
- Full-bleed CTA band with background grid, headline, subheadline, and one primary button

**Logic:** shadcn `accordion`, content from `siteConfig.faq` and `siteConfig.finalCta`.

Done when: the entire home page scrolls top to bottom, complete, in both themes.

---

## Phase 3 — Secondary Pages

### 12 Pricing page

**UI:** Page header, the pricing tiers from 10 reused, a full feature comparison table with checks and dashes, and the pricing FAQ accordion. Table scrolls horizontally inside its own container on mobile.

**Logic:** Tier components reused, not duplicated. Comparison rows come from `pricing.comparison` in config, grouped, with one value per tier matched by position.

> Corrected during the build. This step originally said "comparison rows derived from tier feature lists". Deriving them produces a useless table: the tiers describe the same capability in different words ("10,000 events per month" vs "1 million events per month"), so a union of those strings gives one row per string with a single check in it. A comparison table needs a shared row label and a per-tier value, which the bullet lists do not contain.

---

### 13 Blog index

**UI:** Page header, tag filter row, responsive card grid — three columns desktop, two tablet, one mobile. Cards show tag, title, description, date, and read time. Empty state for a filter matching nothing.

**Logic:** Renders from a mock post array so the layout can be judged before MDX exists. Tag filtering is client-side.

---

### 14 MDX pipeline and blog post page

**UI:** Post header with tag, title, description, date, and read time. Body constrained to 680px. Every MDX element styled: headings, paragraphs, lists, blockquote, inline code, code blocks, tables, images, `hr`, links.

**Logic:**

- `lib/content.ts` with `getAllPosts()` and `getPostBySlug()`, zod-validating frontmatter and throwing on invalid files
- Drafts excluded in production
- `generateStaticParams()` and `generateMetadata()`
- `MdxContent.tsx` component map
- Six sample posts, three of which between them exercise every styled element
- Blog index from 13 switched from mock data to real posts

> Corrected during the build. This step originally said "three sample posts". Feature 13's mock array held six, and the index was designed and verified against two full rows of cards; dropping to three would have left one thin row and one post per tag, which makes the tag filter look pointless. The six MDX files are the same six posts, so this is the mock data being converted rather than new content. Element coverage still comes from three of them.

---

### 15 Changelog

**UI:** Reverse-chronological entries, each with a version badge in mono, date, title, and body. A vertical rule connects entries down the page.

**Logic:** Same MDX pipeline, `content/changelog/`. Four sample entries.

---

### 16 404

**UI:** Centered, large muted "404", headline, one line of copy, and a primary button back to home. Consistent with the design, not a default Next.js page.

**Logic:** `app/not-found.tsx`.

---

## Phase 4 — Wiring

### 17 Motion pass

**UI:** Every section reveals on scroll — 16px rise and fade, 500ms, once. Staggered children at 60ms increments, capped at six.

**Logic:**

- `components/motion/Reveal.tsx` as the only file importing motion
- Reduced-motion check inside the component
- `Reveal` applied across all sections built in phases 2 and 3

Done when: scrolling feels intentional, and enabling reduced-motion in OS settings disables everything with the layout unchanged.

---

### 18 Forms

**UI:** Newsletter form in the footer, contact form on the pricing page. Both with labels, inline validation errors, a pending state with spinner and changed label, and an inline success state. No toasts.

**Logic:**

- `actions/newsletter.ts` and `actions/contact.ts` following the Server Action pattern exactly
- zod on both client and server
- `TODO (buyer):` markers at both wiring points
- Simulated latency so the pending state is visible in the demo

---

### 19 SEO and metadata

**UI:** None visible on the site. Verified through page source and social preview tools.

**Logic:**

- `lib/seo.ts` metadata builder used by every route
- Per-page title, description, canonical, OpenGraph, and Twitter card
- `app/opengraph-image.tsx` generating a branded OG image
- `app/sitemap.ts` including all static routes plus every post

> Corrected during the build. This step originally said "plus every post and changelog entry". Changelog entries have no route of their own — they render inline on `/changelog` (feature 15), so there is nothing at `/changelog/<slug>` to list. The changelog page instead takes its `lastModified` from the newest entry's date.
- `app/robots.ts`
- JSON-LD Organization schema on the home page

---

## Phase 5 — Ship

### 20 Responsive and theme QA

**UI:** Every page at 320, 375, 768, 1024, 1440, and 1920px, in both themes. Fix everything found.

**Logic:** Checklist per page: no horizontal scroll, no overlap, no text clipping, touch targets 44px or larger, every interactive element keyboard reachable with a visible focus ring, contrast passing AA in both modes.

---

### 21 Performance pass

**UI:** No visual change intended. Any change must be verified against the design.

**Logic:**

- Lighthouse on every page, both themes, targeting 95+ across all four categories
- Font display strategy checked, no layout shift on load
- Bundle inspected — nothing unexpected shipped to the client
- Confirm no client component crept in where a server component would do
- Fix every accessibility finding, including ones Lighthouse ranks as minor

---

### 22 Documentation and license

**UI:** None.

**Logic:**

- `README.md` — what it is, requirements, install, dev, build, deploy
- `SETUP.md` — the 30-minute rebrand walkthrough: change copy in `site.config.ts`, change the accent token, replace the logo, add a post, both `TODO (buyer):` wiring points, deploy
- `LICENSE.md` — commercial license terms covering what a buyer may and may not do
- `.env.example`
- Font OFL license text included

Done when: someone who has never seen the codebase can rebrand it start to finish using only these files.

---

### 23 Demo deployment and marketplace assets

**UI:** The live demo is the marketing asset. It must be flawless.

**Logic:**

- Deploy to Vercel, custom subdomain, verify both themes and every page in production
- Marketplace thumbnail
- Screenshot set: home in both themes, dashboard mockup detail, pricing, blog index, blog post, mobile views
- Scroll-through video of the home page
- Listing copy for Gumroad and Creative Market, including the feature bullet list and what the buyer receives

---

## Feature Count

| Phase | Features |
| ----- | -------- |
| Phase 1 — Foundation | 3 |
| Phase 2 — Home Page Surface | 8 |
| Phase 3 — Secondary Pages | 5 |
| Phase 4 — Wiring | 3 |
| Phase 5 — Ship | 4 |
| **Total** | **23** |
