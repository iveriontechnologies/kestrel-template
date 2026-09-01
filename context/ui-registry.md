# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match an existing pattern exactly before inventing a new one.

---

## How to Use

Before building any component:

1. Check whether something similar already exists below
2. If it does — reuse it, or match its exact classes
3. If it does not — build it following `ui-rules.md` and `ui-tokens.md`, then record it here

After building any component, add a row with:

- Component name
- File path
- What it does in one line
- The exact classes used for its container
- Any props that change its appearance

The point is that the twelfth card built looks identical to the first. Drift between sections is the most visible way a template reads as amateur.

---

## Components

### Field · NewsletterForm · ContactForm

`components/forms/` · Both forms and the control styling they share. Both are client components.

```
CONTROL (exported from Field.tsx, applied to input and textarea):
  w-full min-h-11 rounded-md border border-border bg-surface-raised
  px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-muted
  transition-colors duration-150
  focus:border-accent focus:ring-[3px] focus:ring-accent-subtle focus:outline-none
  aria-[invalid=true]:border-danger  disabled:opacity-50

Field wrapper: flex flex-col gap-1.5
label:  text-[13px] font-medium text-fg-muted
error:  text-[13px] text-danger
```

- **`CONTROL` is an exported string, not a wrapped component.** The two forms need different elements (`input`, `textarea`) and different props; only the surface has to match.
- **`min-h-11`, not `h-11`** — the textarea grows past it, and 44px is both the touch-target minimum and the height of the `lg` buttons these sit beside. Verified: input and button are both 44px with bottoms aligned to the pixel.
- The focus ring replaces the global focus outline, which is why `outline-none` is safe here.
- **The newsletter row aligns with `sm:items-end`, not a top margin on the button.** The error renders below the whole row rather than inside the field, so a failing input never pushes the button out of alignment.
- The contact form shows **every** failing field at once (`fieldErrors()` in `lib/forms.ts`). Fixing one error only to be shown the next is the worst version of this interaction.
- Success replaces the form body inline, with `role="status"` so the swap is announced, and a check in `text-success`. Never a toast.
- Pending: button and every control disabled, label swapped to the present participle, spinner alongside. The spinner is the template's one looping animation — see `ui-rules.md`.

### Reveal

`components/motion/Reveal.tsx` · Scroll reveal. **The only animated component in the template**, and the only client component outside the navbar, theme toggle, pricing toggle, and blog filter.

```tsx
<Reveal>{block}</Reveal>                       // fades the block as one
<Reveal stagger className="grid …">{cards}</Reveal>   // becomes the grid
<Reveal as="ol" stagger className="…">{items}</Reveal> // becomes the list
```

- **`Reveal` replaces the container it animates; it never wraps it.** A wrapper div between a grid and its cards becomes the grid item, so the bento `lg:col-span-2` would stop applying — and a div between `ol` and `li` is invalid HTML. Hence the `as` prop.
- **The visual states live in `globals.css` under `[data-reveal]`**, not in the component. Durations, the 16px rise, and the reduced-motion override all sit with the other design values; the component only decides *when* to flip `data-revealed`.
- `--reveal-duration` and `--reveal-step` are set inline from `lib/utils.ts`, so the numbers exist in one place. This is the permitted use of inline `style` — CSS custom properties Tailwind cannot express.
- **CSS `animation`, not `transition`.** Cards carry `transition-colors duration-150` for their hover border, and Tailwind utilities are in a later layer than these rules — a transition here loses to theirs and the reveal snaps with no animation at all. Found by measuring: the cards reported `transition-duration: 0.15s` and a colors-only property list.
- Stagger caps at `MAX_STAGGER_ITEMS`. `Children.count` decides, so a group of seven reveals as one block without the caller thinking about it.
- The observer disconnects on first intersection. Scrolling back past a section does not replay it.
- No dependency. `IntersectionObserver` plus a keyframe covers the whole brief — see the `motion` row in `code-standards.md`.

### NotFound

`app/not-found.tsx` · The 404 page. Server component, no separate component file — it is one centred block with nothing reusable in it.

```
section: flex min-h-[60vh] flex-col items-center justify-center text-center
code:    text-[88px] md:text-[120px] font-semibold leading-none
         tracking-[-0.04em] text-fg-muted
h1:      mt-6 text-[28px] md:text-[36px] leading-[1.15] font-semibold
         tracking-[-0.025em] text-fg text-balance
lead:    mt-4 max-w-[480px] text-[17px] leading-[1.6] text-fg-secondary
button:  size="lg" mt-8, primary, render={<Link/>}
```

- `min-h-[60vh]` keeps the block optically centred instead of sitting under the navbar with the footer pulled up to meet it.
- The numeral is its own type step in `ui-tokens.md` — 120px, muted, above the hero display. It is a backdrop for the headline, not the message.
- All copy including the numeral comes from `siteConfig.notFound`.
- **The tab title needs help from any route that calls `notFound()`.** This file's `metadata` export only applies when nothing matched a route at all; a `notFound()` from inside a route renders under *that* route's metadata. See the post route's `generateMetadata`.

### ChangelogEntry

`components/changelog/ChangelogEntry.tsx` · One release on `/changelog`. Server component.

```
li:      relative border-l border-border pb-14 pl-8
         last:border-transparent last:pb-0
dot:     absolute -left-[4px] top-2 h-[7px] w-[7px] rounded-full
         bg-border-strong ring-4 ring-bg
version: rounded-full border border-border bg-surface-raised px-2.5 py-1
         font-mono text-[12px] text-fg
date:    text-[13px] font-medium text-fg-muted
h2:      mt-4 text-[22px] font-semibold leading-[1.3] tracking-[-0.02em]
body:    [&>*:first-child]:mt-4  wrapping MdxContent
```

- **The rule is on each `<li>`, not on the `<ol>`.** On the list it runs the full height and trails past the final release into the section padding; per item with `last:border-transparent` it runs marker-to-marker and stops. `last:pb-0` closes the trailing gap the same way. The transparent border still occupies its 1px, so the last entry stays aligned with the rest.
- The dot is `ring-4 ring-bg`, which punches a hole in the rule behind it rather than sitting on top of a line.
- **The version badge is neutral, not accent.** `ui-tokens.md` reserves the accent for a specific list and a release number is not on it. Mono because that file names version tags as a mono use.
- The body reuses `MdxContent` unchanged, `remarkGfm` included. The first-child margin is neutralised at this call site rather than in the map, so fixing one page does not re-space six posts.

### MdxContent

`components/blog/MdxContent.tsx` · The MDX element map. Server component, wraps `MDXRemote` from `next-mdx-remote/rsc`.

```
p:          mt-6 text-[17px] leading-[1.7] text-fg-secondary
h2/h3/h4:   mt-14 / mt-10 / mt-8, 28 / 20 / 18px, semibold, negative tracking
ul/ol:      mt-6 flex flex-col gap-3 pl-5 marker:text-fg-muted
blockquote: mt-8 border-l-2 border-accent-border pl-5 text-fg
inline code: rounded-sm bg-surface-raised px-1.5 py-0.5 font-mono text-[0.875em]
pre:        mt-8 overflow-x-auto rounded-lg border border-border
            bg-surface-raised p-5 font-mono text-[13px]
table:      card wrapper + overflow-x-auto + w-full min-w-[520px]
figure:     mt-10 rounded-lg border border-border bg-surface p-5
a:          text-accent-text underline decoration-accent-border underline-offset-[3px]
```

- **Every element MDX can emit is mapped.** Nothing in a post body falls back to a browser default — a buyer writing their second post should not have to open a component file to make a table look right.
- **`remarkGfm` is passed in `options.mdxOptions`.** Tables are a GitHub extension, not core markdown; without it a table renders as a run of pipe characters inside a paragraph.
- **The `p` mapping unwraps standalone images.** Markdown puts a paragraph around a lone image, which would nest the `<figure>` inside a `<p>` — invalid HTML that the browser silently restructures, producing a hydration mismatch on every post with a figure. `MdxImage` is a named function so `p` can identify it by reference.
- `code` distinguishes inline from fenced by looking for `language-` in the className. Only inline gets the pill; inside a `<pre>` it inherits the block.
- No syntax highlighting. It would mean a highlighter dependency and a theme to maintain in two colour modes, for sample code a buyer replaces on day one.
- Links: internal (`/…`) go through `next/link`; external open in a new tab with `rel="noopener noreferrer"`.
- Images render through `next/image` at the authored 1200×600 with `h-auto w-full`, so the dimensions fix the ratio and the classes do the scaling.

### PostHeader

`components/blog/PostHeader.tsx` · The block above a post body.

```
header: mx-auto w-full max-w-reading
tag:    rounded-full border-accent-border bg-accent-subtle px-2.5 py-1
        text-[12px] text-accent-text
h1:     mt-5 text-[32px] md:text-[40px] leading-[1.15] font-semibold
        tracking-[-0.03em] text-fg text-balance
lead:   mt-4 text-[18px] leading-[1.6] text-fg-secondary text-pretty
meta:   mt-6 border-t border-border pt-5 text-[13px] font-medium text-fg-muted
```

- Constrained to the same measure as the body, so the title sits on the reading column rather than running wider than the prose under it.
- Smaller than `PageHeader`'s h1 (32/40 against 34/48): a post title is content, not a page banner, and it competes with the body if it is set at page-title size.
- Date and read time come from the same helpers the cards use, so the two never disagree.

### PostCard

`components/blog/PostCard.tsx` · One post on the blog index. Server-compatible.

```
card: group flex h-full flex-col rounded-lg border border-border bg-surface p-6
      transition-colors duration-150 hover:border-border-strong
tag:  self-start rounded-full border-accent-border bg-accent-subtle
      px-2.5 py-1 text-[12px] text-accent-text
title: mt-4 text-[18px] font-semibold leading-[1.4] tracking-[-0.01em] text-fg
desc:  mt-2 flex-1 text-[14px] leading-[1.55] text-fg-secondary
meta:  mt-6 border-t border-border pt-5 text-[13px] font-medium text-fg-muted
```

- **The whole card is the `Link`.** A "Read more" affordance under a title that is already a link gives keyboard users two tab stops for one destination.
- Title is an `h2`, not an `h3`: the page `h1` is the header, and an `h3` after an `h1` skips a level. The 18px size is a visual choice, independent of the element.
- `h-full` plus `flex-1` on the description keeps every meta row in a grid row on the same line, whatever the description length. Verified equal at 768 and 1440.
- Date renders through `formatPostDate()` inside a `<time dateTime>`; read time through `readingTime()`. Neither is stored.
- Hover raises **border only**, matching every other card in the template.

### TagFilter

`components/blog/TagFilter.tsx` · Filter pills. Presentational — no state of its own and no `"use client"`, since it is only ever rendered from one.

```
row:  mt-10 flex flex-wrap items-center justify-center gap-2
pill: inline-flex h-11 items-center rounded-full border px-4 text-[14px]
      font-medium transition-colors duration-150 lg:h-9
on:   border-accent-border bg-accent-subtle text-accent-text
off:  border-border text-fg-secondary hover:border-border-strong hover:text-fg
```

- `h-11` down to `lg`, not `md`. Tablets are touch devices, so dropping to 36px at the md breakpoint would put the pills under the 44px minimum on exactly the devices that need it.
- `role="group"` with an `aria-label`, and `aria-pressed` per button. Not a list: these are controls, and "list, four items" announced ahead of them is noise.
- `null` is a real option, rendered as the "All" pill, so no separate reset control is needed.

### PostGrid

`components/blog/PostGrid.tsx` · Blog index body. **Client component** — the only one on the page.

```
grid: mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3
```

- Owns the filter state so `TagFilter` and the grid stay in sync. `PostCard` and `TagFilter` are both presentational, which keeps `"use client"` to this one file.
- Tags are derived from the posts and sorted, so a buyer adding a post with a new tag gets a new pill for free.
- Two empty branches. **No posts at all** is reachable the moment a buyer deletes the samples. **No posts for the active tag** is not reachable while tags are derived — every pill has a post behind it — and is kept as a guard for a buyer who swaps in a curated tag list. Verified by seeding a non-existent tag.

### ComparisonTable

`components/pricing/ComparisonTable.tsx` · Full plan comparison. `Section variant="subtle"`. Server component.

```
card:     mt-12 overflow-hidden rounded-lg border border-border bg-surface
scroller: overflow-x-auto
table:    w-full min-w-[640px] table-fixed text-left
label col: w-[34%]
cells:    px-4 py-3 md:px-6   (header row py-4, group row py-2)
group row: border-t border-border bg-surface-raised, 13px text-fg-muted
```

- A real `<table>`. Row labels are `th scope="row"`, tier names `th scope="col"`, group labels `th scope="colgroup"` with `colSpan={tiers.length + 1}`. An `sr-only` `<caption>` names the table.
- **`table-fixed`** keeps the three tier columns equal. Auto layout widens whichever column holds the longest string, which makes one plan look like a different-sized product.
- **`min-w-[640px]`, not 720**: at 375px that puts the first tier's column inside the viewport. A table showing only its own row labels reads as broken, not as scrollable. This is the second and last element allowed to scroll horizontally — `ui-rules.md` lists both.
- Cells render a check (`text-accent-text`), a dash (`text-fg-muted`), or a short string (`text-fg`). Icons are `aria-hidden` with an `sr-only` word beside them.
- The highlighted tier is marked by **its name in `text-accent-text`, nothing else**. Tinting the column would be nineteen rows of accent background, which the accent is never used for.
- Cells map over `tiers`, indexing into `row.values` — a config edit that drops a value leaves a dash instead of a ragged row.

### PageHeader

`components/layout/PageHeader.tsx` · Opening block of a secondary page.

```
wrapper: flex flex-col gap-3 (items-center text-center by default)
h1:      text-[34px] md:text-[48px] leading-[1.1] font-semibold
         tracking-[-0.03em] text-fg text-balance
lead:    mt-1 max-w-[560px] text-[18px] leading-[1.6]
         text-fg-secondary text-pretty
```

- Structurally identical to `SectionHeader`, but the heading is the page's `h1` and takes the page-title type step. Props match: `eyebrow?`, `heading`, `lead?`, `align?`.
- Carries no `Section` of its own, so a page can put the header and the block it introduces in one section. A background change between a heading and its content reads as a mistake.
- `text-pretty` on the lead, not `text-balance` — a page lead runs long enough that balancing squares it into a block, while pretty only kills the one-word last line.

### ThemeProvider

`components/theme-provider.tsx` · Client wrapper around `next-themes`.

Mounted once in `app/layout.tsx` with `attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`, `disableTransitionOnChange`. Nothing else in the app imports `next-themes` directly.

`enableSystem` is off deliberately: dark is the designed-first look and the one that sells in marketplace screenshots, so a visitor's OS preference should not decide first impressions. Buyers flip one prop.

### ThemeToggle

`components/brand/ThemeToggle.tsx` · Icon button switching light and dark.

```
inline-flex h-9 w-9 items-center justify-center rounded-md
text-fg-secondary transition-colors duration-150
hover:bg-surface-raised hover:text-fg
```

- Props: `className?` merged via `cn()`
- Icons: `Sun` / `Moon` from lucide at `h-[18px] w-[18px]`, both rendered, switched by `dark:` variants
- **No `mounted` state.** The obvious implementation gates on a flag set in an effect, because `resolvedTheme` is unknowable during SSR — which costs an effect that immediately calls setState (React flags it), a placeholder to stop the navbar shifting, and a frame with an empty button. Switching on the `.dark` class removes all three: `next-themes` sets that class in a blocking script before first paint, so the right icon is simply painted. `resolvedTheme` is read only inside the click handler.
- The accessible name names the destination theme and swaps with the same class the icons do — two `sr-only` spans, one `hidden` at a time, so no `aria-label` has to be computed in JS.
- 36px visual, 44px hit area below `lg` via `after:-inset-1`.

### Faq

`components/home/Faq.tsx` · Accordion, `Section` default background.

```
root: mx-auto mt-12 w-full max-w-reading   (--container-reading, 680px)
```

- `defaultValue={[0]}` opens the first item, so the section never reads as an undifferentiated stack of closed rows.
- Single-open: opening one closes the others.
- Constrained to prose width — full-bleed answers are unreadable.
- `bare` prop drops the `Section` wrapper for reuse on the pricing page. Unused there in the end: the pricing FAQ wants its own heading, so `app/pricing/page.tsx` renders `Faq` normally with `sections.pricingFaq` copy. The prop stays for a buyer embedding it elsewhere.

### FinalCta

`components/home/FinalCta.tsx` · Full-bleed closing band.

```
section: relative w-full overflow-hidden border-y border-border bg-bg-subtle
grid:    pointer-events-none absolute inset-0 bg-grid
inner:   relative mx-auto flex max-w-page flex-col items-center px-6 py-20 text-center md:py-24
```

- Second of the two sections that skip `Section` (the hero is the other), because it needs an edge-to-edge background layer.
- Carries the grid but **no glow** — `ui-tokens.md` allows exactly one glow per page and the hero owns it. Verified: `.hero-glow` count is 1.
- One primary button only.

### PricingTiers / TierCard

`components/home/PricingTiers.tsx` · Three tiers with a billing-period switch. **Client component** — the only one on the home page.

```
grid:        mt-10 grid grid-cols-1 gap-6 pt-3 md:grid-cols-3
card:        relative flex flex-col rounded-lg border bg-surface p-6
highlighted: border-accent-border + header block bg-accent-subtle
badge:       absolute -top-3 left-1/2 -translate-x-1/2 rounded-full
             border-accent-border bg-accent-subtle text-accent-text
```

- `pt-3` on the grid stops the "Most popular" badge clipping at `-top-3`.
- Highlighted tier gets border + tinted header **only** — never a different size or a scale transform, per `ui-rules.md`.
- **Annual price is derived, never stored:** `monthlyPrice * multiplier` for the headline figure, `monthlyPrice * 12 * multiplier` for the annual total.
- `monthlyPrice: 0` renders "Free" with no `/mo` and no annual line.
- The annual line reserves `h-4` even when empty so toggling does not shift the card.
- Price span is keyed on the mode so remounting replays the 150ms fade.
- `bare` prop renders without the `Section` wrapper — used on the pricing page, where `PageHeader` supplies the heading and both share one `Section`.

**Switch edit from stock shadcn:** `after:-inset-y-2` → `after:-inset-y-[14px]`. The stock hit area measured 55×34, under the 44px minimum in `ui-rules.md`. Now 55×45 while the visual stays 32×18.

`components/home/Testimonials.tsx` · Three quote cards. `Section` default background.

```
grid: mt-12 grid grid-cols-1 gap-6 md:grid-cols-3
card: flex flex-col rounded-lg border border-border bg-surface p-6
quote:  flex-1 text-[15px] leading-[1.65] text-fg
byline: mt-6 flex items-center gap-3 border-t border-border pt-5
avatar: h-9 w-9 rounded-full bg-accent-subtle text-[12px] text-accent-text
```

- Semantic `<figure>` / `<blockquote>` / `<figcaption>`, not divs.
- `flex-1` on the quote keeps bylines aligned across cards of unequal quote length.
- **Avatars are initials, never stock photography.** A bought portrait in a template implies a customer the buyer does not have.

### HowItWorks

`components/home/HowItWorks.tsx` · Three numbered steps. `Section variant="subtle"`.

```
rule:  pointer-events-none absolute inset-x-[16.667%] top-5 hidden h-px bg-border md:block
list:  relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8
badge: h-10 w-10 rounded-full border border-border bg-surface text-accent-text
```

- Semantic `<ol>` / `<li>` — the steps are ordered, and that should survive with CSS off.
- The connecting rule is inset by `16.667%` (half of a third) so it runs badge-to-badge rather than off the edges. It is `hidden md:block`, since stacked steps have nothing to connect.
- Numerals come from `step.step` in config, not from a CSS counter, so the buyer controls them.

### FeatureGrid / FeatureCard

`components/home/FeatureGrid.tsx` · Bento feature grid. `Section id="features"` so the nav's `/#features` link lands here.

```
grid: mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3
card: flex flex-col rounded-lg border border-border bg-surface p-6
      transition-colors duration-150 hover:border-border-strong
icon: flex h-9 w-9 items-center justify-center rounded-md bg-accent-subtle
      + 18px icon in text-accent-text
```

- Hover raises **border only** — no lift, no scale, no shadow, per `ui-rules.md`.
- `span: 2` applies `lg:col-span-2`, ignored below `lg` where everything is one column.
- **Spans must total a multiple of 3**, or the last row leaves a hole. Currently 2+1+1+2+1+2 = 9 → a clean 3×3. Adding or removing a feature means rebalancing the spans.
- Icons resolve through `ICONS: Record<IconName, LucideIcon>` — a missing entry is a compile error, an unknown name at runtime falls back to `Zap` rather than rendering blank.

### LogoCloud

`components/home/LogoCloud.tsx` · Social proof band. `Section variant="subtle"` with reduced padding (`py-12 md:py-14 lg:py-16`) — it is a thin band, not a full section.

```
grid: mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6
mark: flex items-center justify-center gap-2 text-fg-muted opacity-70
      transition-opacity duration-150 hover:opacity-100
```

- Names come from `siteConfig.logoCloud.logos`; marks are matched by name from a `MARKS` record inside the component. An unknown name renders as a wordmark alone, so a buyer can add companies without touching the marks.
- Marks are geometric `currentColor` SVG, not imitations of real brand logos — the companies are fictional.
- Carries a **BUYER: REPLACE THESE** banner warning against shipping a logo cloud implying customers they do not have.

### DashboardMock

`components/dashboard-mock/DashboardMock.tsx` · The product shot. Entirely markup — no images, no chart library.

```
frame:    overflow-hidden rounded-xl border-border bg-surface shadow-[var(--shadow-lg)]
scroller: overflow-x-auto [mask-image:linear-gradient(to_right,black_88%,transparent)] md:[mask-image:none]
row:      flex min-w-[720px] md:min-w-0
```

- `aria-hidden="true"` on the whole frame. It is decorative; the hero copy is the text alternative.
- Below `md` the sidebar hides and the frame scrolls horizontally inside a masked container. The **page** never scrolls horizontally — only this container does.
- Composition: sidebar → top bar → 4 stat cards → line chart → (bar chart | features table) at `col-span-2` / `col-span-3` of 5.
- Every number and label comes from `lib/mock-dashboard.ts`. Nothing is inline in JSX.

**Subcomponents**

| Component | Notes |
| --------- | ----- |
| `MockSidebar` | 200px, `hidden md:flex`. Workspace header, 6 nav items, account block. Active item `bg-accent-subtle text-accent-text`. |
| `MockStatCard` | Label, value, delta. `ArrowUpRight`/`ArrowDownRight` with `text-success`/`text-danger` driven by the sign. |
| `MockLineChart` | Inline SVG, 640×176. Area gradient, dashed gridlines, endpoint marker. `text-chart-1` + `currentColor`. |
| `MockBarChart` | Flex, not SVG — proportional rectangles gain nothing from SVG, and labels stay real text. `bg-chart-2`. |

Chart geometry is computed by `buildLinePath()` in `lib/mock-dashboard.ts`, never hardcoded — editing a value redraws the curve. Smoothing uses horizontal control points at neighbour midpoints rather than Catmull-Rom, which cannot overshoot; a line dipping below its own minimum reads as a bug in a marketing shot.

### Hero

`components/home/Hero.tsx` · Full-bleed opening section. Server component.

```
outer:  relative w-full overflow-hidden bg-bg
grid:   pointer-events-none absolute inset-0 bg-grid
glow:   pointer-events-none absolute inset-x-0 top-0 h-[720px] hero-glow
inner:  relative mx-auto w-full max-w-page px-6 pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32
```

- Does **not** use `Section`. It needs full-bleed decorative layers and asymmetric top padding, which `Section` deliberately does not offer. It is the one exception; every other section uses `Section`.
- Both decorative layers are `pointer-events-none` and `aria-hidden`.
- Headline: `text-balance`, 40px → 56px → 64px with tracking tightening `-0.03em` → `-0.035em`
- Eyebrow is a pill: `rounded-full border-accent-border bg-accent-subtle px-3 py-1 text-xs text-accent-text`
- Two CTAs at `size="lg"`, `w-full` below `sm` and `w-auto` above. Primary carries an `ArrowRight` that translates 2px on hover via `group-hover/button`.
- Bullets: 13px `text-fg-muted` with 14px `text-accent-text` checks, stacked below `sm`
- Ends with a placeholder reserving the mockup footprint: `aspect-[16/10] max-w-[1100px] rounded-xl border-border bg-surface shadow-[var(--shadow-lg)]`. **Feature 05 replaces this element — do not restyle it.**

### Section / SectionHeader

`components/layout/Section.tsx` · Wrapper every page section uses.

```
outer:  w-full  +  bg-bg | bg-bg-subtle
inner:  mx-auto w-full max-w-page px-6 py-16 md:py-24 lg:py-32
```

- Props: `id?`, `variant?: "default" | "subtle"`, `bleed?`, `className?`
- Owns max width, horizontal padding, and vertical rhythm. **No section sets its own padding** — that is what keeps spacing identical down the page.
- `SectionHeader` is exported from the same file: eyebrow → h2 → lead, `align?: "center" | "left"`. Every section except hero and CTA opens with it.
- `max-w-page` comes from `--container-page` in `@theme`.

### Logo

`components/brand/Logo.tsx` · Mark plus wordmark, links to `/`.

- 28px mark, `rx="8"`, `fill-accent` with an `fill-accent-contrast` chevron
- Wordmark reads `siteConfig.name` — never hardcoded
- Props: `className?`, `markOnly?`
- Carries a **BUYER: REPLACE THIS** banner comment. Keep the 32×32 viewBox so sizing holds.

### Navbar

`components/layout/Navbar.tsx` · Sticky translucent header, client component.

```
sticky top-0 z-40 w-full bg-bg/72 backdrop-blur-lg
transition-colors duration-150
border-b border-border | border-b border-transparent
inner: mx-auto flex h-16 w-full max-w-page items-center justify-between px-6
```

- Border appears only past 8px of scroll, so the hero reads full-bleed at rest
- Active link `text-fg`, inactive `text-fg-secondary hover:text-fg`, no underline in any state
- `isActiveRoute()` returns false for any href containing `#` — hash links target sections, not routes
- Below `md` the links and CTAs hide and a hamburger appears

### MobileMenu

`components/layout/MobileMenu.tsx` · Full-screen overlay, client component.

- `fixed inset-0 z-50 bg-bg md:hidden`, `role="dialog"` + `aria-modal="true"`
- Closes on Escape, on route change, and on any link click
- Locks body scroll while open and **restores the previous value**, not a hardcoded `""`
- Links at 20px with 24px gaps; secondary link and primary CTA pinned to the bottom above a border

### Footer

`components/layout/Footer.tsx` · Four columns over a bottom bar. Server component.

```
border-t border-border bg-bg-subtle
grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12
```

- Column heading 13px `text-fg-muted`; links 14px `text-fg-secondary hover:text-fg`
- Bottom bar stacks below `sm`, splits left/right above it
- Social icons in 36px hit targets with `aria-label` from `socialLabel()`

### SocialIcon

`components/brand/SocialIcon.tsx` · Inline brand marks for X, GitHub, LinkedIn.

Exists because lucide v1 removed brand icons. `fill="currentColor"`, 24×24 viewBox, `aria-hidden`. `socialLabel()` exports the display name for the wrapping link's `aria-label`.

### Button

`components/ui/button.tsx` · shadcn primitive, **unmodified**.

Inherits the Kestrel palette through the semantic layer in `globals.css` — `bg-primary` resolves to `--accent`, hovers use `bg-muted` → `--surface-raised`, focus ring uses `--accent`. Verified violet in both themes with zero edits to the file.

Variants: `default` (primary), `outline` (secondary), `secondary`, `ghost`, `destructive`, `link`.
Sizes: `xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`.

**Two edits from stock shadcn:**

1. Base radius changed `rounded-lg` → `rounded-md` to match the 8px `ui-tokens.md` specifies for buttons. Resolved in feature 03 with the navbar CTA on screen: 12px read softer than the refined-technical direction wants.
2. `nativeButton` now defaults to `false` whenever a `render` prop is passed. Base UI otherwise assumes a native `<button>`, logs an error, and **strips button semantics** when you render a Link through it. Fixed once here so no call site has to remember, and buyers linking a button do not hit it either. An explicit `nativeButton` still wins.

Verified output for `render={<Link/>}`: `<a role="button" tabindex="0" href="…">`.

3. `lg` size changed `h-9 gap-1.5 px-2.5` → `h-11 gap-2 px-6 text-[15px]` to match the 14/26px, 15px hero button spec in `ui-tokens.md`. shadcn's stock `lg` is 36px tall and read visibly undersized against a 64px headline.
