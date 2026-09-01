# Library Docs

How **this project** uses each dependency. Not a copy of upstream documentation.

---

## Before Using Any Library

Authority order for any library question:

```
MCP server (live docs) → installed skills → this file → training knowledge
```

Never write a code sample for an API you have not verified this session. Library APIs drift, and a confidently wrong sample is worse than no sample.

**Verification status of this file:** the patterns below record *this project's decisions* — which library to use for what, and the constraints around it. The exact call signatures are marked where they must be confirmed against live documentation before first use. Confirm, then correct this file if reality differs.

Available tooling for this project:

| Tool | Use for |
| ---- | ------- |
| 21st.dev MCP (`mcp__21st__*`) | Component patterns and layout inspiration. `search` is free and unmetered; `get_component` is metered. |
| Playwright MCP (`mcp__playwright__*`) | Rendering built sections and verifying both themes at multiple widths |
| Vercel MCP | Demo deployment |

---

## Next.js 16

**Check first:** verify metadata, caching, and `generateStaticParams` signatures against live docs. These have changed across recent major versions.

### Static generation for content routes

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.description });
}
```

**Rules:**

- `params` is a Promise in recent App Router versions — always `await` it. Verify against live docs before writing the first route.
- Every content route implements `generateStaticParams()`. This site is fully static.
- Metadata is built through `lib/seo.ts`, never assembled inline in a route.
- Missing content calls `notFound()`, never renders an empty page.

---

## Tailwind CSS v4

**Check first:** v4 removed the JS config for theme values and changed the dark-mode variant setup. Verify `@theme`, `@theme inline`, and `@custom-variant` syntax against live docs before writing `globals.css`.

**Rules:**

- All tokens live in `@theme` in `app/globals.css`. There is no `tailwind.config.ts` for colors, spacing, or radius.
- Theme switching works by indirection: `@theme inline` points at plain CSS variables that `.dark` overrides. Verified against the official shadcn/ui Tailwind v4 documentation and the current `create-next-app` output — both use exactly this pattern. Blog posts claiming `@theme inline` breaks runtime theme switching are wrong; do not "fix" this. See `ui-tokens.md` for the full block.
- The dark variant is registered with `@custom-variant` targeting the class `next-themes` applies.
- Never use an arbitrary value for a color. Never use a default Tailwind color class.
- Arbitrary values are acceptable only for one-off geometry (grid mask sizes, chart viewBox dimensions).

---

## shadcn/ui

**Check first:** components are added via the CLI, which writes source into `components/ui/`. Verify the current CLI invocation before running it.

Components used in this project — add only these:

`accordion`, `button`, `input`, `label`, `switch`, `tabs`, `badge`, `separator`, `sheet`

**Rules:**

- The CLI installs the `base-nova` style, which is built on **`@base-ui/react`, not Radix**. Verify against Base UI docs, not Radix docs.
- Components mostly need **no** retokenizing: `globals.css` maps shadcn's semantic layer onto the Kestrel palette, so `bg-primary`, `bg-muted`, and `ring` already resolve to Kestrel tokens.
- The exception is `bg-accent`. shadcn means "neutral hover surface" by it; Kestrel means "violet brand". Any component using `bg-accent` needs it swapped to `bg-surface-raised` on add.
- shadcn components are **source you own**. Edit them directly to match `ui-tokens.md` — do not wrap them in another layer to restyle.
- After adding any component, immediately replace its default color classes with project tokens. shadcn ships with its own palette; ours replaces it entirely.
- `components/ui/` holds shadcn primitives only. Project components never live there.
- `sheet` powers the mobile menu. `switch` powers the pricing toggle. `accordion` powers both FAQs.

---

## lucide-react

Every icon in the project. No second icon set, no custom SVG icons except the logo mark and the mockup's chart graphics.

Because `site.config.ts` stores icon **names as strings** — a buyer editing a config file cannot import a component — names resolve through a map.

```tsx
// components/home/FeatureGrid.tsx
import { BarChart3, Bell, Filter, Gauge, Share2, Zap } from "lucide-react";

import { Bell, Database, Filter, Play, Repeat, Zap } from "lucide-react";
import type { IconName } from "@/types";

// Record<IconName, ...> makes a missing entry a compile error
const ICONS: Record<IconName, LucideIcon> = {
  zap: Zap,
  filter: Filter,
  repeat: Repeat,
  play: Play,
  bell: Bell,
  database: Database,
};

// Unknown name falls back rather than crashing a buyer's build
const Icon = ICONS[feature.icon] ?? Zap;
```

**Rules:**

- Import icons individually by name. Never `import * as Icons`, which defeats tree-shaking and ships the whole set.
- `IconName` is declared in `types/index.ts`, **not** derived from the map with `keyof typeof`. Deriving it would make `site.config.ts` import the component that imports `site.config.ts` — a cycle. Typing the map as `Record<IconName, LucideIcon>` gives the same exhaustiveness guarantee without one.
- An unrecognized icon name falls back to a default. A buyer's typo must never break the build.
- Sizes: 16px inline with text, 18px in feature cards, 20px in navigation. No other sizes.
- Icons inherit color via `currentColor`. Never set a color prop on an icon.
- Decorative icons get `aria-hidden="true"`. An icon that carries meaning on its own needs an accessible label.
- Extend the map when adding an icon. Never import one directly into a section component.

---

## motion (Framer Motion)

**Check first:** this library was renamed from `framer-motion` to `motion`, and the React import path changed. Verify the correct package name and import path before installing.

**Rules:**

- Motion is used **only** inside `components/motion/Reveal.tsx`. No other file imports it.
- `Reveal` handles: viewport triggering, the once-only flag, stagger delay, and the reduced-motion check. Sections pass a `delay` prop and nothing else.
- Animate `transform` and `opacity` only. Never animate width, height, or any layout property.
- Reveal duration is `REVEAL_DURATION_MS` from `lib/utils.ts`. Never a literal.
- The reduced-motion check lives inside `Reveal`, so no section needs to think about it.

```tsx
// The only motion surface in the codebase
<Reveal delay={index * STAGGER_STEP_MS}>
  <FeatureCard {...feature} />
</Reveal>
```

---

## next-themes

**Check first:** verify provider props and the `useTheme` return shape against live docs.

**Rules:**

- Configured with `attribute="class"` and `defaultTheme="dark"`.
- `<html>` carries `suppressHydrationWarning`. Without it the console fills with hydration errors.
- The theme toggle must not render theme-dependent content before mount. Gate on a `mounted` flag and render a fixed-size placeholder — otherwise the layout shifts on hydration.
- Never read `theme` to decide styling. Styling comes from CSS variables that swap with the class. `useTheme` is only for the toggle control itself.

---

## zod

Used for two things: form input validation and MDX frontmatter validation.

**Rules:**

- Form schemas live beside their Server Action in `actions/`.
- Frontmatter schemas live in `lib/content.ts`.
- Always `safeParse`, never `parse`, in Server Actions — a throw would reach the client.
- `parse` is acceptable in `lib/content.ts` where a throw correctly fails the build.
- Error messages shown to users are written by us, never taken from zod's default output.

---

## geist

Geist Sans and Geist Mono, distributed under OFL and safe to bundle in a commercial template.

```typescript
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
```

**Rules:**

- Imported once, in `app/layout.tsx`. Never in a component.
- Applied as `className={`${GeistSans.variable} ${GeistMono.variable}`}` on `<html>`.
- The generated CSS variables feed `--font-sans` and `--font-mono` in `@theme`.
- **License note:** the OFL text ships in the template package. Never swap in a font without confirming it is licensed for redistribution — this is what gets a marketplace listing taken down.

---

## gray-matter and next-mdx-remote

**Check first:** verify the RSC import path for `next-mdx-remote` — it differs from the client entry point and has moved between versions.

`gray-matter` parses frontmatter. `next-mdx-remote` renders the body inside a Server Component.

**Rules:**

- All filesystem reading happens in `lib/content.ts`. Routes call typed functions, never `fs` directly.
- MDX element styling is centralized in `components/blog/MdxContent.tsx` via the components map. Never style MDX output with a global stylesheet.
- Every HTML element a buyer might write must be styled: headings, paragraphs, lists, blockquote, `code`, `pre`, tables, images, `hr`, links. An unstyled element in a blog post is a visible defect.
- Images inside MDX map to `next/image` with explicit dimensions.
- Sample content ships with the template and must exercise every one of those elements, so a buyer sees the full typography set working.
