# Architecture

## Stack

| Layer | Tool | Purpose |
| ----- | ---- | ------- |
| Framework | Next.js 16 (App Router) | Static marketing site, React 19 |
| Language | TypeScript strict | Throughout |
| Styling | Tailwind CSS v4 | Utilities generated from `@theme` tokens |
| Components | shadcn/ui | Accordion, button, dialog, input, tabs, switch |
| Icons | lucide-react | All icons |
| Motion | None — IntersectionObserver + CSS | Scroll reveals, hover transitions. See `Reveal` in `ui-registry.md`. |
| Content | MDX | Blog posts and changelog entries |
| Fonts | Geist Sans, Geist Mono | Loaded via `next/font/local` or `geist` package |
| Validation | zod | Frontmatter and Server Action input. **Never in a client bundle** — see `code-standards.md`. |
| Theming | next-themes | Light/dark with no flash on load |
| Deployment | Vercel | Demo site only |

There is **no database, no ORM, no authentication library, and no backend service**. If a feature seems to need one, it is out of scope — check `project-overview.md`.

---

## Folder Structure

```
/
├── AGENTS.md
├── site.config.ts                       → ALL copy, nav, pricing, testimonials, SEO
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── ui-tokens.md
│   ├── ui-rules.md
│   ├── ui-registry.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── build-plan.md
│   └── progress-tracker.md
├── public/
│   └── blog/                            → Drawn figures for sample posts
├── content/
│   ├── blog/
│   │   └── *.mdx                        → Blog posts, frontmatter + body
│   └── changelog/
│       └── *.mdx                        → Changelog entries
├── app/
│   ├── layout.tsx                       → Root layout, fonts, ThemeProvider, nav, footer
│   ├── globals.css                      → @theme token block — the only place colors exist
│   ├── page.tsx                         → Home, composes the 10 sections
│   ├── pricing/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx                     → Index
│   │   └── [slug]/
│   │       └── page.tsx                 → Post
│   ├── changelog/
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx              → Generated OG image
├── actions/
│   ├── newsletter.ts                    → Newsletter Server Action (stub)
│   └── contact.ts                       → Contact Server Action (stub)
├── components/
│   ├── ui/                              → shadcn/ui primitives only
│   ├── brand/
│   │   ├── Logo.tsx                     → Mark + wordmark, buyer replaces this
│   │   └── ThemeToggle.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── PageHeader.tsx               → Eyebrow + h1 + lead for secondary pages
│   │   └── Section.tsx                  → Shared section wrapper: padding, max width, reveal
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── LogoCloud.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── PricingTiers.tsx
│   │   ├── Faq.tsx
│   │   └── FinalCta.tsx
│   ├── dashboard-mock/
│   │   ├── DashboardMock.tsx            → Composes the mockup
│   │   ├── MockSidebar.tsx
│   │   ├── MockStatCard.tsx
│   │   ├── MockLineChart.tsx            → Inline SVG, no chart library
│   │   └── MockBarChart.tsx             → Inline SVG, no chart library
│   ├── pricing/
│   │   └── ComparisonTable.tsx          → Full plan comparison, pricing page only
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── TagFilter.tsx                → Filter pills, presentational
│   │   ├── PostGrid.tsx                 → Client: filter state + grid + empty states
│   │   ├── PostHeader.tsx
│   │   └── MdxContent.tsx               → MDX component mapping
│   ├── changelog/
│   │   └── ChangelogEntry.tsx
│   ├── forms/
│   │   ├── Field.tsx                    → Label, control styling, inline error
│   │   ├── NewsletterForm.tsx
│   │   └── ContactForm.tsx
│   └── motion/
│       └── Reveal.tsx                   → Scroll reveals — the only animated component
├── lib/
│   ├── content.ts                       → MDX read, parse, sort — posts and changelog
│   ├── forms.ts                         → Messages + client validators (no zod)
│   ├── seo.ts                           → buildMetadata(), canonical origin, JSON-LD
│   ├── mock-dashboard.ts                → Static arrays for the mockup
│   └── utils.ts                         → cn() and shared helpers
└── types/
    └── index.ts                         → SiteConfig, Post, ChangelogEntry, PricingTier
```

---

## System Boundaries

| Folder | Owns |
| ------ | ---- |
| `app/` | Routes, layouts, metadata. Composition only — no business logic, no inline copy. |
| `actions/` | Server Actions for form submission. Nothing else. |
| `components/` | Presentation. Reads props and `site.config.ts`. Never reads the filesystem. |
| `lib/` | Filesystem reads, parsing, and pure helpers. Never imports from `components/`. |
| `content/` | Author-written MDX. No code. |
| `types/` | Shared TypeScript types. No runtime values. |
| `context/` | Project documentation for the building agent. Never shipped in the buyer's package. |
| `site.config.ts` | Every user-facing string and structural list in the site. |

---

## Data Flow

### Page render

```
Route in app/
      ↓
Imports siteConfig from site.config.ts
      ↓
Passes slices as props to section components
      ↓
Components render with tokens from globals.css
```

No component imports `site.config.ts` directly except `Navbar` and `Footer`, which appear in the root layout. Everything else receives its content as props, which keeps sections reusable and testable by inspection.

### MDX content

```
Build time
      ↓
lib/content.ts reads content/blog/*.mdx and content/changelog/*.mdx
      ↓
zod-validates frontmatter, filters drafts, sorts by date descending
      ↓
Route (Server Component) receives typed Post[] or ChangelogEntry[]
      ↓
generateStaticParams() pre-renders every post slug
```

Both content types share one `readEntry()` and one `baseFrontmatter` schema, which each type `.extend()`s — posts add `tags`, changelog entries add `version`. Invalid frontmatter throws and fails the build, naming the file and every failing field.

Changelog entries have no route of their own. They render inline on `/changelog`, so `slug` exists only as a stable React key.

### Form submission

```
Client Component form
      ↓
plain validators in lib/forms.ts — inline field errors, no zod in the bundle
      ↓
Server Action in actions/
      ↓
zod validation on the server — never trust the client
      ↓
TODO marker: buyer connects their provider here
      ↓
Returns { success: boolean, error?: string }
      ↓
Client renders success or error state
```

---

## Content Model

There is no database. These three shapes are the whole data model, and they live in `types/index.ts`.

### `SiteConfig`

The complete shape of `site.config.ts`. Every field is required unless marked optional.

| Field | Type | Notes |
| ----- | ---- | ----- |
| `name` | `string` | Product name, used in nav, footer, and metadata |
| `tagline` | `string` | One line, used in metadata and OG image |
| `url` | `string` | Canonical origin, no trailing slash |
| `nav` | `{ label: string; href: string }[]` | Center nav links |
| `ctas` | `{ primary: {label,href}; secondary: {label,href} }` | Navbar buttons only. The hero carries its own pair — a hero secondary is "Book a demo", not "Sign in". |
| `hero` | `{ eyebrow?, headline, subheadline, bullets?, primaryCta, secondaryCta }` | Hero copy and its own two buttons |
| `logoCloud` | `{ caption: string; logos: { name: string }[] }` | Social proof band. Name only — `LogoCloud` renders a known inline SVG or falls back to a styled wordmark, so no image assets ship. |
| `pages` | `{ pricing: PageCopy; blog: PageCopy; changelog: PageCopy }` | Eyebrow / h1 / lead plus `metaTitle` and `metaDescription` for each secondary page. One entry per route that has a page header. |
| `sections` | `Record<"features"|"howItWorks"|"testimonials"|"pricing"|"faq"|"comparison"|"pricingFaq", SectionCopy>` | Eyebrow / heading / lead per section. Keeps headings out of components. |
| `features` | `Feature[]` | `{ icon, title, description, span?: 1 \| 2 }` |
| `howItWorks` | `{ step: number; title; description }[]` | Exactly 3 |
| `testimonials` | `Testimonial[]` | `{ quote, name, role, company, avatar }` |
| `pricing` | `{ annualDiscountPct: number; tiers: PricingTier[]; comparison: ComparisonGroup[] }` | Exactly 3 tiers |
| `faq` | `{ question: string; answer: string }[]` | Home FAQ |
| `pricingFaq` | `{ question: string; answer: string }[]` | Pricing page FAQ |
| `forms` | `{ newsletter: …; contact: … }` | Labels, placeholders, button and pending labels, and the success message for each form. Validation messages are **not** here — see below. |
| `finalCta` | `{ headline, subheadline, cta: {label,href} }` | Closing band |
| `notFound` | `{ code, heading, lead, cta: {label,href}, metaTitle }` | 404 page. `code` is the large numeral — in config because it is a user-facing string like any other. |
| `footer` | `{ columns: FooterColumn[]; social: SocialLink[]; legal: string }` | 4 columns |
| `seo` | `{ titleTemplate, description, ogImageAlt, twitterHandle? }` | Metadata defaults |

### `PricingTier`

| Field | Type | Notes |
| ----- | ---- | ----- |
| `name` | `string` | e.g. Starter, Growth, Scale |
| `monthlyPrice` | `number` | In whole currency units. `0` renders as Free. |
| `description` | `string` | One line under the tier name |
| `features` | `string[]` | Bullet list |
| `cta` | `{ label: string; href: string }` | Tier button |
| `highlighted` | `boolean` | Exactly one tier is `true` |

Annual price is **derived**, never stored: `monthlyPrice * 12 * (1 - annualDiscountPct / 100)`. Never hardcode an annual price.

### `ComparisonGroup`

The pricing page's comparison table. A separate shape from `PricingTier.features` on purpose: a tier's bullets describe one plan in that plan's own words, while a comparison row needs one label shared across all three plans and one value each.

| Field | Type | Notes |
| ----- | ---- | ----- |
| `title` | `string` | Group label, e.g. "Usage". Renders as a full-width divider row. |
| `rows` | `ComparisonRow[]` | `{ label: string; values: ComparisonValue[] }` |

`ComparisonValue` is `boolean | string`: `true` renders a check, `false` a dash, and a string renders as text. **Values are matched to tiers by position**, so `values` must have one entry per tier — `lib/validate-config.ts` warns in development when it does not, and the table falls back to a dash rather than going ragged.

### `Post` and `ChangelogEntry`

MDX frontmatter, validated by zod at read time in `lib/content.ts`. A file that fails validation fails the build loudly — never silently skipped.

| Field | Type | Notes |
| ----- | ---- | ----- |
| `title` | `string` | |
| `description` | `string` | Used in cards and metadata |
| `date` | `string` | ISO `YYYY-MM-DD` |
| `tags` | `string[]` | Blog only, drives index filtering |
| `version` | `string` | Changelog only, e.g. `1.4.0` |
| `draft` | `boolean` | Optional, defaults false. Excluded from production builds. |
| `slug` | `string` | Derived from filename, never in frontmatter |

Read time is **derived from `content`**, never stored in frontmatter — `readingTime()` in `lib/utils.ts` at `READING_WPM`. A hand-maintained minute count goes stale the first time a post is edited, and it is one more thing for a buyer to get wrong. Dates are formatted by `formatPostDate()`, which pins both locale and time zone: post metadata renders on the server and again on the client, and letting either drift gives a hydration mismatch or a post dated a day early west of UTC.

---

## Theming

`next-themes` with `attribute="class"` and `defaultTheme="dark"`.

- Dark is the designed-first theme. Light is derived and equally complete.
- The `ThemeProvider` wraps the app in `app/layout.tsx` with `suppressHydrationWarning` on `<html>`.
- Both palettes are defined in `globals.css` — light on `:root`, dark under `.dark`, following the shadcn/next-themes convention so `dark:` variants in shadcn primitives resolve correctly. See `ui-tokens.md`.
- The theme toggle never renders theme-dependent content before mount. Render a fixed-size placeholder to prevent layout shift.

---

## Forms

Both forms follow one pattern. Never deviate.

Schemas live in `lib/forms.ts`, not beside the actions: a file marked `"use server"` may only export async functions, so a schema exported from `actions/newsletter.ts` is a build error. Keeping them in `lib/` is also what lets the client and the server validate against identical rules and show an identical message.

**Validation messages live with the rules, not in `site.config.ts`.** A buyer changing a message is changing the rule at the same time, and the two must not drift into separate files.

An action surfaces a zod message only when the issue has a field path. A structural failure — "expected object, received undefined" — only happens when something calls the action with the wrong shape, and is not copy to show anyone; those return the generic message instead.

```typescript
// actions/newsletter.ts
"use server";

import { GENERIC_ERROR, newsletterSchema, type ActionResult } from "@/lib/forms";

export async function subscribe(
  input: unknown,
): Promise<{ success: boolean; error?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // TODO (buyer): connect your email provider here.
  // Example: await resend.contacts.create({ email: parsed.data.email })
  // This stub simulates latency so the loading state is visible in the demo.
  await new Promise((r) => setTimeout(r, 600));

  return { success: true };
}
```

The `TODO (buyer):` prefix is required and documented in the README. It is how buyers find the two places they must wire up.

---

## Authentication

None. There is no login, no session, no protected route, and no auth library. `Sign in` and `Start free` are configurable links that point at `#` by default.

---

## Storage

None. No uploads, no file writes at runtime. The only filesystem access is `lib/content.ts` reading MDX at build time.

---

## Invariants

Rules that are never violated, regardless of what a feature seems to need.

- No hardcoded hex, rgb, hsl, or oklch value in any component. Colors come from tokens defined in `globals.css`.
- No Tailwind default color classes — `bg-slate-900`, `text-gray-500`, and equivalents are forbidden. Project tokens only.
- No user-facing string is hardcoded in a component. All copy comes from `site.config.ts` or MDX frontmatter.
- `lib/` never imports from `components/`. `components/` never reads the filesystem.
- Every Server Action validates with zod on the server, even when the client already validated.
- Every Server Action returns `{ success: boolean; error?: string }` and never throws to the client.
- Annual pricing is always computed from `monthlyPrice` and `annualDiscountPct`. Never stored.
- Exactly one pricing tier has `highlighted: true`.
- Every animation is wrapped so `prefers-reduced-motion: reduce` disables it. No exceptions.
- Every interactive element has a visible focus state. Never `outline: none` without a replacement.
- No chart or icon library for the dashboard mockup — charts are hand-written inline SVG using currentColor and token variables so they retheme automatically.
- No `position: fixed` except the sticky navbar and the mobile menu overlay.
- Images use `next/image` with explicit `width` and `height`. Never a bare `<img>`.
- Never add a dependency that is not already listed in `code-standards.md`.
