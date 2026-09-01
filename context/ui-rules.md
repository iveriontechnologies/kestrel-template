# UI Rules

How to compose the tokens. Values live in `ui-tokens.md` — this file is composition rules only. If you find yourself writing a raw value here, it belongs in the token file.

---

## Font

Geist Sans and Geist Mono, loaded once in the root layout and exposed as CSS variables.

```typescript
// app/layout.tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

<html
  lang="en"
  className={`${GeistSans.variable} ${GeistMono.variable}`}
  suppressHydrationWarning
>
```

`--font-geist-sans` and `--font-geist-mono` are consumed by `--font-sans` and `--font-mono` in `@theme`. Never import a font inside a component. Never use a system font as the primary face.

---

## Layout

- Every page section is wrapped in `components/layout/Section.tsx`. Never hand-roll section padding.
- `Section` owns: max width (`--container-page`), horizontal padding, vertical padding at all three breakpoints, optional `bg-bg-subtle` alternation, and the scroll-reveal wrapper.
- Sections alternate background: `bg-bg` then `bg-bg-subtle`, starting with `bg-bg` on the hero. Never two adjacent sections with the same background unless one is a full-bleed CTA band.
- The footer is not a `Section` and is exempt: it is `bg-bg-subtle` with its own `border-t`, which is the separator. A closing section may therefore also be subtle — the home page's CTA band and the pricing page's contact section both are.
- Blog post bodies constrain to `--container-reading` (680px) via `max-w-reading`, not the page container.
- The token is **not** called `prose`: Tailwind ships a built-in `max-w-prose` of `65ch`, and a theme key of that name loses to it silently. A token a buyer can edit with no effect is worse than no token.
- Breakpoints: mobile below 768px, tablet 768–1023px, desktop 1024px and up. Only these three.

### Page header pattern

Secondary pages open with `PageHeader`, not `SectionHeader`. Same three parts in the same order, but the heading is the page's `h1` and takes the page-title type step. The header and the content it introduces share one `Section` — a background change between a heading and the block it belongs to reads as a mistake.

### Section header pattern

Every section except the hero and CTA band opens with the same block, centered:

1. Eyebrow — uppercase, tracked, `text-accent-text`
2. `h2` — section heading
3. Lead paragraph — `text-fg-secondary`, max width 560px, centered

Gap of 12px between eyebrow and heading, 16px between heading and lead, 48px from the block to the section content.

---

## Navigation

Sticky, full width, translucent.

```
position: sticky; top: 0
height: 64px
background: color-mix of bg at 72% + backdrop-blur-lg
border-bottom: 1px solid var(--border)   /* only after scrolling past 8px */
```

- Border appears on scroll, not at rest. Track scroll position and toggle.
- Active link: `text-fg`, weight 500. Inactive: `text-fg-secondary`, weight 500. Hover moves inactive to `text-fg`.
- No underline in any state. Active is a color change only.
- Below 768px: center links collapse into a hamburger. The overlay is full-screen, `bg-bg`, links stacked at 20px with 24px gaps, primary CTA pinned at the bottom.
- Body scroll locks while the mobile menu is open. It closes on route change and on Escape.
- Theme toggle sits left of the auth links, icon-only, 36px square, ghost styling.

### Footer

Four columns on desktop, two on tablet, one on mobile. Column heading is 13px weight 500 `text-fg-muted`; links are 14px `text-fg-secondary` hovering to `text-fg`. Bottom bar sits above a `border-border` top border with the wordmark and copyright left, social icons right.

---

## Typography Hierarchy

Three levels carry the entire site. Do not introduce a fourth.

1. **Heading** — `text-fg`, weight 600, negative tracking per the type table
2. **Body** — `text-fg-secondary`, weight 400, normal tracking
3. **Meta** — `text-fg-muted`, 13px, weight 500 — labels, captions, timestamps

Rules:

- One `h1` per page. On the home page it is the hero headline.
- Never skip a level. An `h3` never follows an `h1` directly.
- Never use more than one font weight inside a single element.
- Body copy never uses `text-fg`. Reserve full-contrast text for headings.
- Line length in prose caps at 680px. Never full-width paragraphs.

---

## Cards

Every grouped content block is a card. Cards are always `bg-surface` — never accent-tinted, never gradient-filled. Color enters a card through badges, icons, and text, never through its background.

- Radius `--radius-lg`, padding 24px, 1px `border-border`
- Feature cards get a 36px icon square at the top: `bg-accent-subtle`, radius `--radius-md`, icon 18px in `text-accent-text`
- Interactive cards raise their border to `border-border-strong` on hover over 150ms. Nothing else moves. No lift, no scale, no shadow change.
- Never nest a card inside a card. Use `bg-surface-raised` for inner grouping.

---

## Buttons

Three variants only: primary, secondary, ghost. Values in `ui-tokens.md`.

- One primary button per section. Two competing primaries is a design error.
- The hero has exactly two buttons: primary then secondary, side by side on desktop, stacked full-width on mobile.
- Button text is sentence case, never title case, never all caps.
- Icons sit right of the label at 16px with an 8px gap. Arrow icons translate 2px on hover; nothing else animates.
- Disabled: 50% opacity, `cursor: not-allowed`, no hover change.

---

## Form Inputs

- Label above the input, 13px weight 500 `text-fg-muted`, 6px gap.
- Errors render below the field, 13px `text-danger`, and set `aria-invalid` on the input.
- The submit button shows a spinner and the label changes to a present-participle form ("Subscribing…") while pending. The button is disabled during submit.
- Success replaces the form body with a confirmation message and a checkmark in `text-success`. Never a toast — inline only.
- Every input has an associated `<label>`. Placeholder is never a substitute for a label.

---

## Pricing Tiers

- Three cards in a row on desktop, stacked on mobile in the same order.
- The highlighted tier gets: `border-accent-border`, a `bg-accent-subtle` header area, and a "Most popular" badge centered on its top border. It does **not** get a different size or a scale transform.
- Prices render in Geist Sans at 44px weight 600 with the currency symbol at 24px raised to the top of the digits.
- The monthly/annual toggle is a shadcn `Switch` with labels either side. Switching animates the price with a 150ms fade, never a slot-machine roll.
- Annual mode shows the discount as a badge next to the toggle. The large figure stays the **per-month equivalent**; the annual total goes below it in `text-fg-muted` as "$854 billed annually". (Reversing these — annual total large — tests worse: buyers compare plans on monthly figures.)
- The line below the price is always rendered at fixed height, even when empty, so switching modes does not shift the card.
- Feature bullets use a 16px check icon in `text-accent-text`, 12px gap, one line per feature.

### Comparison table

- A real `<table>`, not a grid of divs. Row labels are `th scope="row"`, tier names are `th scope="col"`, and each group label is a `th scope="colgroup"` spanning the full width.
- `table-fixed` so the three tier columns are exactly equal. Auto layout sizes columns by content, which makes one plan look wider than the others.
- Row groups are separated by a `bg-surface-raised` label row, not by whitespace or a second card.
- Cells hold one of three things: a 16px check in `text-accent-text`, a 16px dash in `text-fg-muted`, or a short value in `text-fg`. The icons are `aria-hidden` with an `sr-only` word beside them — a check read aloud in a cell says nothing.
- The highlighted tier is marked by its **name in `text-accent-text`** only. Never tint the whole column: nineteen rows of accent is the "large background fill" the accent is never used for.

---

## Dashboard Mockup

The most important visual in the product. It sits directly under the hero copy.

- Rendered entirely in markup — no screenshots, no image assets, no chart library.
- Framed as a browser-chrome-less app window: `bg-surface`, `--radius-xl`, 1px `border-border`, `--shadow-lg`, with the hero glow behind it.
- Composition: 200px sidebar left, main area right. Main area holds a row of four stat cards over a line chart, with a bar chart and a small table beneath.
- Charts are inline SVG with `stroke="currentColor"` and `fill="currentColor"`, inheriting from a parent with a chart token class.
- Stat card deltas use `text-success` for positive and `text-danger` for negative, with a 12px arrow icon.
- All numbers come from `lib/mock-dashboard.ts`. Never inline a number in the JSX.
- Text inside the mockup is 11–13px. It reads as a dense real app, not a diagram.
- On mobile the mockup does not shrink to illegibility: below 768px the sidebar is hidden and the frame scrolls horizontally inside a masked container.
- The mockup is decorative. It is `aria-hidden="true"` with a text alternative in the hero copy.

---

## Social and Brand Marks

lucide-react v1 removed every brand icon — `Github`, `Linkedin`, `Twitter` and the rest are gone. Brand marks therefore live as inline SVG paths in `components/brand/SocialIcon.tsx`.

This is the third documented exception to "no custom SVG icons", alongside the logo mark and the chart graphics.

- All paths use `fill="currentColor"` so they inherit text color and theme like any icon
- Rendered at 16px inside a 36px hit target
- Every social link carries an `aria-label` from `socialLabel()` — the SVG itself is `aria-hidden`
- UI icons still come from lucide. Only brand marks are hand-drawn.

---

## Motion

- All reveals go through `components/motion/Reveal.tsx`. Never animate in a section directly.
- Default reveal: 16px upward translate and opacity 0 to 1, 500ms, ease-out, triggered once at 15% viewport entry.
- Staggered children use 60ms increments, capped at 6 items. Beyond six, reveal the group as one block — `Reveal` counts its children and decides, so no caller has to.
- **The first block of a page never reveals.** It is above the fold on every load, so a fade there delays exactly what the visitor came for and costs LCP. The hero, every `PageHeader`, and the post body are all static. Everything below the first block reveals.
- Hover transitions are 150ms. Reveals are 500ms. No other durations.
- Reduced motion is handled twice, deliberately: a `@media (prefers-reduced-motion: reduce)` block in `globals.css` forces every `[data-reveal]` visible from the first paint, and `Reveal` skips the observer entirely. No section needs to handle it.
- **Reveals are a CSS `animation`, not a `transition`.** Cards carry `transition-colors` for their hover border, and Tailwind utilities sit in a later layer than the reveal rules — a `transition` there loses and the reveal silently snaps.
- Never animate layout properties. Transform and opacity only.
- Nothing animates on a loop. No infinite marquees, no pulsing, no floating. **One exception:** the spinner in a pending submit button, which is also the one animation outside 150ms and 500ms. A pending state has to keep moving to mean anything.

---

## Empty States

- **Blog index with no posts**: centered, `text-fg-muted`, "No posts yet." No illustration.
- **Blog index with a tag filter matching nothing**: "No posts tagged X", plus a ghost button clearing the filter. Unreachable while the pills are derived from the posts, and written anyway — it is what stands between a buyer with a curated tag list and a blank page.
- **Changelog with no entries**: "No releases yet."
- Every list rendered from MDX needs its empty branch. A buyer who deletes the sample content must not see a broken page.

---

## Responsive Rules

- Test every section at 320, 375, 768, 1024, 1440, and 1920px.
- Grids collapse: 3 columns to 2 at tablet to 1 at mobile. Feature bento collapses to a single column, span values ignored below 1024px.
- Three elements may scroll horizontally inside their own container, and nothing else: the dashboard mockup's masked frame, the pricing comparison table, and anything the MDX map wraps in a scroller (post tables and code blocks). The **page** never scrolls horizontally at any width.
- The comparison table sets a min width that keeps the first tier's column inside a 375px viewport. A table showing only its own row labels reads as broken rather than as scrollable.
- Touch targets are at least 44px in both dimensions on mobile **and tablet**. Drop to a compact height at `lg`, not `md` — a tablet at 768px is a touch device, and `md:` is exactly where it stops being covered.
- This applies to **discrete controls** — buttons, icon buttons, the logo link, form fields, filter pills. It does not apply to inline links in prose or to stacked text links in a nav or footer column, which rely on line spacing instead; WCAG draws the same line.
- Where 44px would distort the design, keep the visual size and expand the hit area with `relative after:absolute after:-inset-1 after:content-['']`. The 36px icon buttons and the 29px logo all do this. **Verify by hit-testing** with `elementFromPoint` outward from the centre — `getBoundingClientRect()` does not include a pseudo-element's hit area.
- The hero's two buttons go full width and stack below 640px.

---

## Do Nots

- Never use a Tailwind default color class — `bg-slate-900`, `text-gray-400`, and all equivalents
- Never write a hex value in a component
- Never hardcode a user-facing string in JSX — it belongs in `site.config.ts`
- Never use a gradient as a card background
- Never stack more than two levels of border radius
- Never use `position: fixed` outside the sticky navbar and the mobile menu
- Never place two primary buttons in one section
- Never scale or lift a card on hover — border color only
- Never use an animation duration other than 150ms or 500ms
- Never render more than one hero glow per page
- Never use a placeholder in place of a label
- Never let a paragraph run wider than 680px
- Never introduce a font weight outside 400, 500, and 600
