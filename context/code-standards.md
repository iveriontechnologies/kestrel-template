# Code Standards

Implementation rules for Kestrel. Followed in every session without exception. These exist to prevent drift between sections — drift is what makes a paid template read as amateur.

---

## Engineering Mindset

- **This code ships to customers who read it.** A buyer opens these files to customize them. Code clarity is a product feature, not a preference.
- **Build one numbered feature at a time.** Complete it, verify it in both themes at three widths, update the trackers, then move on.
- **Scope is sacred.** Never build beyond the current feature, even when adjacent work looks trivial. Note the idea in `progress-tracker.md` under Notes.
- **Read `ui-registry.md` before building any component.** Matching an existing pattern beats inventing a better one.
- **Clean over clever.** A buyer with intermediate React skills must be able to modify anything here.
- **If it is not visible, it is not done.** Every feature ends with something you can look at.

---

## TypeScript

- Strict mode on. No exceptions.
- Never `any`. Use `unknown` and narrow.
- Never a type assertion (`as X`) unless unavoidable, and then with a comment explaining why.
- All function parameters and return types explicitly typed. Component props always typed.
- `type` for object shapes and unions. `interface` only for props meant to be extended.
- `const` by default. `let` only where reassignment is real.
- Shared types live in `types/index.ts`. Props types live directly above their component.

---

## Next.js 16 Conventions

- App Router only. No Pages Router.
- React 19 APIs throughout.
- **Server Components by default.** Add `"use client"` only when the component needs `useState`, `useEffect`, an event handler, a browser API, or a client-only library.
- Push `"use client"` to the leaf. A section that is static except for one interactive control splits: the section stays server, the control becomes a small client component.
- Never `"use client"` in `app/layout.tsx`.
- Server Actions live in `actions/`. Never define one inline in a component.
- Filesystem access happens only in `lib/content.ts`, only at build time, only from Server Components.
- Blog and changelog routes implement `generateStaticParams()` so every page is statically generated.
- Every route exports `metadata` or `generateMetadata()`. No page ships without it, and every one of them is built by `buildMetadata()` in `lib/seo.ts` — never by assembling a `Metadata` object by hand. That is what keeps the canonical, the OpenGraph payload, and the Twitter card from disagreeing.
- A route with a dynamic segment returns `notFoundMetadata()` when its lookup misses. `app/not-found.tsx`'s own metadata only applies when nothing matched a route at all.
- Always verify Next.js API details against live documentation before use — caching and metadata APIs have changed across recent versions.

---

## File and Folder Naming

| Kind | Convention | Example |
| ---- | ---------- | ------- |
| Folders | kebab-case | `dashboard-mock`, `blog` |
| Component files | PascalCase | `FeatureGrid.tsx`, `MockStatCard.tsx` |
| Utility and lib files | camelCase or kebab-case | `content.ts`, `mock-dashboard.ts` |
| Server Action files | camelCase | `newsletter.ts` |
| Route files | Next.js reserved names | `page.tsx`, `layout.tsx`, `not-found.tsx` |
| Type files | `index.ts` | `types/index.ts` |
| MDX content | kebab-case slug | `getting-started-with-kestrel.mdx` |

One component per file. Named exports only — never `export default` for a component. Barrel files only in `components/ui/`.

**Framework exception:** `page.tsx`, `layout.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`, and `opengraph-image.tsx` must use default exports — Next.js requires it. This is the only place a default export is allowed.

---

## Component Structure

Exact order in every component file.

```tsx
"use client"; // only when genuinely required

// 1. External imports
import { useState } from "react";
import { ArrowRight } from "lucide-react";

// 2. Internal imports
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 3. Types
type Props = {
  headline: string;
  highlighted?: boolean;
};

// 4. Component
export function PricingCard({ headline, highlighted = false }: Props) {
  // state
  // derived values
  // handlers
  // return
}
```

- Props type sits directly above the component unless shared, in which case it lives in `types/index.ts`.
- No inline `style` attributes except for CSS custom properties that Tailwind cannot express (chart geometry, grid masks).
- Class composition always through `cn()`.

---

## Section Component Pattern

Every home page section follows this shape.

```tsx
// components/home/FeatureGrid.tsx

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { Feature } from "@/types";

type Props = {
  eyebrow: string;
  heading: string;
  lead: string;
  features: Feature[];
};

export function FeatureGrid({ eyebrow, heading, lead, features }: Props) {
  return (
    <Section id="features" variant="subtle">
      <Reveal>
        <SectionHeader eyebrow={eyebrow} heading={heading} lead={lead} />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 60}>
            <FeatureCard {...feature} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

Rules:

- Sections receive content as props. They never import `site.config.ts` themselves — the page does that and passes slices down. Only `Navbar` and `Footer` are exempt, since they live in the root layout.
- Sections never set their own padding or max width. `Section` owns that.
- Sections never call motion primitives directly. `Reveal` owns that.

---

## Server Action Pattern

```typescript
// actions/newsletter.ts
"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export async function subscribe(
  input: unknown,
): Promise<{ success: boolean; error?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    // TODO (buyer): connect your email provider here.
    await new Promise((r) => setTimeout(r, 600));
    return { success: true };
  } catch (error) {
    console.error("[actions/newsletter]", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
```

- Every Server Action validates with zod on the server, even when the client validated first.
- **zod is server-only.** The schemas live in `actions/`, not in `lib/forms.ts`, because `lib/forms.ts` is imported by the form components and therefore ships to the browser on every page — the newsletter form is in the footer. Importing zod there put 79 KiB of it, 86% unused, into every page load. The client validates with the plain functions in `lib/forms.ts`; both sides read the same `MESSAGES` constants, so the wording cannot drift.
- Every Server Action returns `{ success: boolean; error?: string }`. Never throws to the client.
- Every Server Action has a try/catch.
- The `TODO (buyer):` prefix marks every place a buyer must wire something up. These are documented in the README and must never be removed.

---

## Content Reading Pattern

```typescript
// lib/content.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Post } from "@/types";

const postFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export function getAllPosts(): Post[] {
  const dir = path.join(process.cwd(), "content/blog");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = postFrontmatter.safeParse(data);

      if (!parsed.success) {
        throw new Error(
          `[content] Invalid frontmatter in ${file}: ${parsed.error.message}`,
        );
      }

      return { ...parsed.data, slug: file.replace(/\.mdx$/, ""), content };
    })
    .filter((post) => !post.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));
}
```

- Invalid frontmatter throws and fails the build. Never silently skip a file — a buyer with a typo must be told, not left wondering why their post vanished.
- Drafts appear in development and are excluded from production builds.
- `lib/` never imports from `components/`.

---

## Error Handling

- Never an empty catch block.
- Console errors carry a bracketed context prefix: `[actions/newsletter]`, `[content]`.
- User-facing error copy is plain language. Never surface a raw error message or stack.
- Content parsing errors fail the build loudly. Runtime errors in forms return a friendly message.

---

## Analytics

There is none. No tracking, no pixels, no third-party scripts. Buyers add their own — the README explains where. Adding an analytics dependency is out of scope.

---

## Environment Variables

Only one, and it is not a secret.

| Variable | Used in | Purpose |
| -------- | ------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts` | Canonical origin for metadata and sitemap |

- Falls back to `siteConfig.url` when unset so a fresh clone builds with no `.env` file at all.
- `.env.example` ships with the template. `.env.local` is gitignored.
- Never add a secret. This template has no server integrations by design.

---

## Shared Constants

Defined once in `lib/utils.ts`. Never duplicated.

```typescript
export const BREAKPOINTS = { mobile: 768, tablet: 1024 } as const;
export const REVEAL_DURATION_MS = 500;
export const HOVER_DURATION_MS = 150;
export const STAGGER_STEP_MS = 60;
export const MAX_STAGGER_ITEMS = 6;
```

Import these. Never retype the number.

---

## Import Aliases

Always `@/`. Never a relative path that climbs more than one level.

```typescript
// Correct
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

// Never
import { Button } from "../../../components/ui/button";
```

---

## Comments

- No comments restating what the code does.
- Comments explain **why** — a non-obvious layout constraint, a browser workaround, a deliberate deviation.
- `TODO (buyer):` marks the places a buyer must act. These are intentional and permanent.
- No other TODOs survive into a commit.
- Every section component opens with a one-line comment naming the section, because buyers navigate this codebase by scanning.

---

## Dependencies

Before installing anything, check in order: does shadcn/ui already provide it, does Next.js already provide it, is there a native solution.

Approved for this project:

| Package | Purpose |
| ------- | ------- |
| `next`, `react`, `react-dom` | Framework |
| `typescript`, `@types/*` | Types |
| `tailwindcss`, `@tailwindcss/postcss` | Styling |
| `clsx`, `tailwind-merge` | `cn()` helper |
| `class-variance-authority` | shadcn/ui variants |
| `@base-ui/react` | shadcn/ui primitives. The `base-nova` style uses Base UI, **not** Radix. |
| `tw-animate-css` | Animation utilities shadcn's stylesheet imports |
| `shadcn` | The shadcn CLI itself, used to add components |
| `lucide-react` | Icons |
| ~~`motion`~~ | **Not installed.** Approved here originally, then ruled out in feature 17: the whole motion surface is one 16px fade, and `IntersectionObserver` plus a CSS animation covers it in about sixty lines. Same reasoning as the chart library. Install it only if the animation brief grows past what CSS can express. |
| `next-themes` | Light/dark switching |
| `zod` | Form and frontmatter validation. **Server-side only** — see the note under the Server Action pattern. |
| `geist` | Geist Sans and Geist Mono |
| `gray-matter` | MDX frontmatter parsing |
| `next-mdx-remote` | MDX rendering in RSC. Use the `/rsc` entry point; `MDXRemote` is an async Server Component. |
| `remark-gfm` | GitHub-flavoured markdown — tables, strikethrough, autolinks. Core MDX has none of these, so a table renders as pipe characters without it. |

Nothing else gets installed without being added to this table first. Every dependency is weight a buyer inherits.

**No chart library.** Charts in the dashboard mockup are hand-written inline SVG. This is deliberate: it keeps the bundle small, makes the charts theme automatically, and avoids shipping a dependency for four decorative graphics.
