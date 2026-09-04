# Progress Tracker

Update this file after every completed feature. Any agent reading it should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Post-build — ready to list
**Last completed:** 23 Marketplace assets. All 23 features done. Since then: demo
deployed and verified, licence gaps closed, favicon replaced, buyer zip built and
verified, version set to 1.0.0, listing numbers re-measured.
**Next:** nothing queued. One open decision belongs to Israel, not to an agent —
whether to reissue the licence in a company name if Iverion Technologies is
registered before launch. The pre-publish checklist lives in `marketing/ASSETS.md`.

---

## Progress

### Phase 1 — Foundation

- [x] 01 Project setup and design tokens
- [x] 02 site.config.ts and types
- [x] 03 Layout shell — Section, Navbar, Footer

### Phase 2 — Home Page Surface

- [x] 04 Hero
- [x] 05 Dashboard mockup
- [x] 06 Logo cloud
- [x] 07 Feature grid
- [x] 08 How it works
- [x] 09 Testimonials
- [x] 10 Pricing tiers
- [x] 11 FAQ and final CTA

### Phase 3 — Secondary Pages

- [x] 12 Pricing page
- [x] 13 Blog index
- [x] 14 MDX pipeline and blog post page
- [x] 15 Changelog
- [x] 16 404

### Phase 4 — Wiring

- [x] 17 Motion pass
- [x] 18 Forms
- [x] 19 SEO and metadata

### Phase 5 — Ship

- [x] 20 Responsive and theme QA
- [x] 21 Performance pass
- [x] 22 Documentation and license
- [x] 23 Demo deployment and marketplace assets — *complete. Demo live at https://kestrel-template.vercel.app, video recorded, zip built.*

---

## Decisions Made During Build

**Post-build — `NEXT_PUBLIC_SITE_URL` resolution was rewritten, then made to announce itself.**
The Vercel build died on `TypeError: Invalid URL, input: ''`. The cause was mine: `process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url`. `??` falls back on null and undefined only, so an env var *defined with an empty value* passed `""` straight to `new URL()`. Feature 19 verified the variable set and unset, never set-to-empty. `resolveSiteUrl()` now walks candidates in order, warns on present-but-empty, prefixes a bare host with `https://`, and throws only when nothing is usable. Verified against six cases: empty, unset, bare host, unparseable, trailing slash, valid.

A second, quieter problem followed: the live site kept serving placeholder canonicals and no request from outside could force a CDN miss (`X-Vercel-Cache: HIT`, `Age: 138967`), so stale-cache and stale-build were indistinguishable remotely. The fix was to make the build say which it is — a production build that falls back to the placeholder now logs it. The variable was set correctly all along; the redeploy had reused the build cache, and `NEXT_PUBLIC_*` is inlined at build time.

**Post-build — the licence let buyers build client sites but never let them deliver one.**
§2 permitted building for clients and charging; §3 forbade providing source files to a client "except as expressly permitted under Section 2"; and §2 permitted only *temporary* contractor access. A freelancer following it literally could not hand over the finished site, which contradicts the listing's "unlimited projects, yours and your clients'." §2 now defines an **End Product** and permits transferring one to the client it was built for, without granting them the Template. Separately, §3 banned publishing the source publicly without ever saying private repositories were fine, so a buyer using GitHub had to guess. Both stated plainly.

**Post-build — the favicon was still create-next-app's.**
25,931 bytes of the Next.js logo, live on the demo and bound for every buyer. Replaced with `app/icon.svg`, the same mark as `Logo.tsx`. Its accent is written literally, because a favicon is fetched outside the page and cannot read `--accent`; `SETUP.md` says to change both. `public/` also still held `next.svg`, `vercel.svg`, `window.svg`, `globe.svg` and `file.svg`, none referenced. Removing them and the `.ico` took the home page from 383 KiB to 358.

**Post-build — the buyer's zip is built from `git archive`, not from a copy of the directory.**
A directory copy can pick up anything untracked or ignored, which is how `node_modules/` and stray `.env` files end up in template downloads. `git archive HEAD` emits exactly the tracked tree; the four build-time paths are then deleted. Verified by extracting the result and running `npm ci && npm run build` — `npm ci` aborts if `package.json` and the lockfile disagree, which is the first thing a buyer would hit. Recipe in `marketing/ASSETS.md`.

**Post-build — seven shipped comments cited context docs that do not ship.**
`MockLineChart.tsx` pointed at `code-standards.md`, `Field.tsx` and `FinalCta.tsx` at `ui-tokens.md`, `utils.ts` and `PricingTiers.tsx` at `ui-rules.md`, `globals.css` at `ui-tokens.md`, and a public SVG at `progress-tracker.md`. Each now states the fact rather than citing a file the reader does not have. Worth watching for in future edits: a comment that is right for us can be a dead end for the buyer.

**Post-build — one Lighthouse run is not a measurement.**
Re-measuring the listing's numbers, the first home-page run scored **76** on a machine that had just finished two npm builds. Three consecutive runs then gave 93, 94, 94. The listing now records the date, the method, and that performance is a median of three — and the 76 is written down, because the temptation on seeing it was to accept it or to re-run until it looked good, and neither is measurement.

**23 — Screenshots are captured over the DevTools protocol, by `marketing/capture.mjs`.**
Superseded the original `msedge --screenshot` approach, which produced bad assets three ways. The flag subtracts window chrome from the requested size (asking for 1440 gives 1414) and enforces a minimum width near 496px, so a 390px mobile shot rendered at 496 and was cropped — headlines cut mid-word. It also captures on load, before the IntersectionObserver runs, so everything below the hero came out blank at `opacity: 0`. And a force-installed browser extension painted a badge into every frame, which a fresh profile did not stop. CDP sets device metrics exactly, `Emulation.setEmulatedMedia` forces `prefers-reduced-motion` so the stylesheet paints every section at first paint with no JavaScript, and `--disable-extensions` clears the badge. 15 shots, one pass.

**23 — Light-theme captures no longer need a `defaultTheme` flip.**
The earlier method required editing `app/layout.tsx` and rebuilding between themes. `capture.mjs` seeds `localStorage` through `Page.addScriptToEvaluateOnNewDocument`, so next-themes reads the intended theme on its first pass. Both themes now come out of one run, with no source edit and no flash.

**23 — The listing copy carries a "claims to avoid" section.**
Performance measures 93–95, not 100, and the listing says so. Also ruled out: "fully accessible" (contrast, targets, focus, and heading order were tested — that is not a full WCAG audit by a specialist), ranking promises, and lifetime updates. A template listing that overstates its Lighthouse scores is trivially checked by the buyer.

**23 — Deployment and the video are done.**
Both were Israel's to do and both are done. Demo live at https://kestrel-template.vercel.app, verified route by route. Video recorded, over a minute, which is fine for a template listing.

**22 — `/tokens` is deleted, and the two references to it went with it.**
Outstanding since feature 01. Removing the route also meant removing the `Disallow: /tokens` line from `robots.ts` and a stale comment in `sitemap.ts` — a deleted page leaves rules behind that quietly outlive it.

**22 — `.gitignore` was excluding `.env.example`.**
`.env*` matched the example file, so the one env file that *must* ship would have been missing from the buyer's repository. Added a negation. Worth checking whenever a template ships a dotfile the ignore rules were written to exclude.

**22 — The licence is a draft and says so, in the first paragraph.**
`LICENSE.md` covers what a template licence needs to cover — unlimited end projects, no redistribution of the template itself, fonts licensed separately, fictional demo content disclaimed — but it is written by someone unqualified to give legal advice, and pretending otherwise would be the worst kind of polish. It carries placeholders for name, date, and contact, and an instruction to have it reviewed. **Do that before selling.**

**22 — The fictional content warning appears in three places on purpose.**
README ("Before you ship"), SETUP (step 2, with instructions for deleting the section entirely), and `LICENSE.md` section 5. A buyer who publishes invented testimonials is misrepresenting their business, and one mention in a file nobody reads twice is not enough of a guard.

**21 — zod was shipping to every page, and removing it moved performance 66 → 92.**
The largest client chunk was 79 KiB transferred with **86% unused**, and it was zod: `lib/forms.ts` imported it, the form components import `lib/forms.ts`, and the newsletter form lives in the footer — so every page paid for it to check an email and two string lengths. This is exactly what kept the chart library and framer-motion out, applied inconsistently. Schemas moved into `actions/`, where zod is the guard that matters; the client validates with plain functions. Both read the same `MESSAGES` constants, so the wording still cannot drift. `code-standards.md`'s "zod on both client and server" corrected. Total page weight 467 → 383 KiB, TBT 740 → 140 ms, LCP 4.1 → 3.1 s, Speed Index 4.1 → 1.4 s.

**21 — Lighthouse found two contrast failures my feature-20 audit could not see.**
Both involved compositing, and both were blind spots in the same way. The logo cloud used `text-fg-muted opacity-70`, which composited to #5d5d6a — 3.01:1 — while `getComputedStyle().color` still reported the passing token. The pricing page's "/mo" sat on the highlighted tier's `bg-accent-subtle`, a translucent tint my audit walked past on its way to the first opaque ancestor; `--fg-muted` measured 4.29:1 there. **A contrast check that reads `color` and the nearest opaque background misses element opacity and every translucent layer between.** The logo cloud now lifts by colour instead of opacity, and `--fg-muted` moved again — dark #808090 → #86869a, light #6e6e7a → #6a6a76 — so the token clears 4.5 on the tinted surface too, which is now the worst case in both themes.

**21 — The `heading-order` failure was a real structural bug on the pricing page.**
`PricingTiers` in `bare` mode renders no `h2` of its own, so the page went `h1` → `h3` straight to the tier names. `TierCard` now takes a `headingLevel`, which `bare` sets to `h2`. The outline reads h1 → h2 ×3 → h2 → h2 → h3 ×6 → h2, with no skipped level.

**21 — `ThemeToggle` lost its `mounted` state, which also cleared the last lint error.**
Outstanding since feature 03: an effect that immediately called setState. The fix was not a smarter effect but removing the question — which icon to show is now decided by the `.dark` class, which `next-themes` sets in a blocking script before first paint. That also removes the placeholder div and the frame where the button was empty. Same shape as the feature-17 fix, as predicted there. **eslint is now clean across the whole project.**

**21 — Lighthouse: 92 / 93 / 97 performance, 100 accessibility, 100 best practices, 100 SEO.**
Accessibility, best practices, and SEO are at target on every page checked. Performance is 88–97 against a 95 target, and the remaining gap is LCP render delay under Lighthouse's 4× CPU throttle on a machine also running a dev server and a browser. The only actionable items left in the report are framework-owned: 26 KiB unused inside React's own chunk and 13 KiB of legacy polyfills governed by browserslist. **Not chased further** — narrowing browser support to win three points is a bad trade for a template sold to buyers with unknown audiences.

**21 — The Geist Mono preload is left in place, deliberately.**
Mono is used on post pages and the changelog and nowhere else, so it is preloaded and unused on the four most-visited pages. Removing it means hand-wiring `next/font/local` against a `node_modules` path in the root layout — the fragility flagged for the OG image, but at build time where no try/catch can save it. It never appeared as a Lighthouse opportunity, only as a console warning. A buyer who wants it gone has one file to edit.

**21 — Two checks that confirmed non-defects.**
The accessibility tree lists both of `ThemeToggle`'s `sr-only` spans, which looks like a doubled accessible name; computed styles show one is `display: none`, so only one is announced — the tool includes hidden nodes. And the client-component inventory came back at ten, every one justified by state, an effect, a handler, or being a provider: nothing crept in.

**20 — `--fg-muted` failed AA in both themes, on every surface.**
The most-used muted tone in the template — meta rows, captions, table group labels, the logo cloud — measured 3.15–3.37:1 in light and 3.49–3.87:1 in dark against a 4.5 requirement. Light went #8b8b97 → **#6e6e7a**, dark #6c6c7a → **#808090**. Both now clear 4.5 on all four surfaces with the smallest shift that does the job, so the tone still reads as muted next to `--fg-secondary`.

**20 — The accent needed splitting: `--accent` fills, `--accent-text` writes.**
As text in dark it measured 3.95–4.39:1. The obvious fix — lighten `--accent` — breaks the other half: white on `--accent` is 4.56:1 and lightening the fill drops it below AA. One value cannot serve both jobs, so dark gains `--accent-text: #8f83fb` (5.84:1 on the worst surface) while the fill is untouched, and light aliases it to `--accent`, which already passes. Twenty `text-accent` call sites swapped. **`text-accent` still exists as a utility and must not be used** — that is recorded in `ui-tokens.md`.

**20 — Light-mode status colours were too bright for 10–11px text.**
`--success` at 3.52:1 and `--danger` at 4.39:1 on `--surface-raised`, both used for the dashboard mockup's deltas — the hero visual. Dropped a step to #047857 / #be123c, with `--warning` and `--info` moved for consistency. The dark values already passed and are unchanged.

**20 — Result: zero contrast failures on every page in both themes.** Home, pricing, a blog post, and the changelog all audited clean, against WCAG AA with the large-text exemption applied properly (≥24px, or ≥18.66px bold).

**20 — Icon controls keep their 36px look and gain a 44px hit area.**
The logo (100×29), theme toggle, hamburger, mobile-menu close, and footer social icons were all under the minimum. Rather than inflate the navbar, each gained `relative after:absolute after:-inset-1 after:content-['']` — the same trick feature 10 used on the switch. Verified by hit-testing outward from each centre with `elementFromPoint`, since `getBoundingClientRect()` does not include a pseudo-element.

**20 — The touch-target rule now says what it always meant.**
Applying 44px to stacked footer text links would have doubled the footer's height for no benefit. `ui-rules.md` now scopes the rule to discrete controls and exempts inline and stacked text links, which is the line WCAG itself draws — 2.5.8 exempts inline links, and 44px is the AAA enhanced target rather than the AA one.

**20 — Two findings that turned out not to be defects, and both were worth chasing.**
`documentElement.scrollWidth` reported 595 on a 320px `/pricing`, which looks exactly like a horizontal-scroll bug. It is not: `window.scrollX` cannot leave 0, because the comparison table's `overflow: hidden` card contains it. **The authoritative test is whether `scrollX` can move**, not what `scrollWidth` reports. Separately, a focus ring sampled immediately after a Tab press read `--fg-secondary` rather than the accent — that was the 150ms `transition-colors` caught mid-flight; with a settle delay it is the accent at 2px.

**19 — `title: undefined` is not the same as omitting the title, and it cost the home page its `<title>`.**
`buildMetadata()` set `title` unconditionally, so the home page — which passes no title and relies on the layout's `title.default` — shipped with **no `<title>` element at all**. Found by grepping the production HTML rather than by looking at the tab, which showed the right thing in dev. The key is now spread in only when a title exists.

**19 — A route that sets `openGraph` replaces the parent's object wholesale, image included.**
`app/opengraph-image.tsx` is picked up automatically, and I assumed that meant every route inherited it. It does not: the file-based image is merged into the *root layout's* `openGraph`, and any route setting its own replaces the lot. `/pricing` and every post were shipping with no `og:image` while the home page had one. `buildMetadata()` now names the image explicitly. Verified across four routes.

**19 — No canonical on a noindex page.**
The 404 was emitting `<link rel="canonical" href="https://…/">` — pointing crawlers at a different URL for a page it had just told them to skip. `noIndex` and `alternates` are now mutually exclusive in the builder.

**19 — The Organization schema was advertising three profiles at `#`.**
`sameAs` was mapped straight from `footer.social`, whose hrefs are `#` placeholders until a buyer fills them in. That is invalid structured data, and it would have shipped on every copy of the template. Non-URL hrefs are filtered out and the key disappears entirely when none remain.

**19 — The OG image reads Geist's TTF, and tolerates not finding it.**
Satori cannot read woff2, which is all the site itself uses; the `geist` package also ships TTFs, so the card renders in the real brand face. That is the one place in the project that reaches into `node_modules` by path, so a failed read falls back to the default face with a warning rather than failing a buyer's build over a font. Verified by pixel-sampling the generated PNG: 1200×630, no ink on any edge, text present in both the headline and tagline bands.

**19 — `NEXT_PUBLIC_SITE_URL` verified end to end, not assumed.**
Built with the variable set to a URL with a trailing slash and confirmed the slash was stripped and the value reached canonicals, the sitemap, and `robots.txt`; then rebuilt without it and confirmed the fallback to `siteConfig.url`. **Feature 22 must put this variable in `.env.example`** — it is live now and a fresh clone has no way to discover it.

**19 — The 404 carries two `robots` meta tags and that is fine.**
Next emits its own `noindex` for the not-found boundary, and the builder adds `noindex, nofollow`. They agree, crawlers combine them, and keeping ours means the intent is declared in our code rather than inherited from framework behaviour that could change.

**18 — Schemas live in `lib/forms.ts` because a `"use server"` file may only export async functions.**
The obvious home for a schema is next to the action that uses it. Next forbids it — exporting a non-function from a `"use server"` module is a build error. `lib/forms.ts` also turns out to be the right answer anyway: the client and the server validate against the identical object and show the identical message, which is what "zod on both client and server" was asking for.

**18 — Validation messages live with the rules, not in `site.config.ts`.**
Every other user-facing string is in config. These are not, and the reason is that a message and the rule it describes are one thing — change `min(20)` and the sentence about it has to change in the same breath. Splitting them across two files is how they end up contradicting each other. `code-standards.md`'s own Server Action example does the same.

**18 — The actions only surface a zod message when the issue has a field path.**
Found by testing rather than reasoning. With the client guard temporarily bypassed I submitted an invalid address, and the server correctly rejected it — but the message shown was `Invalid input: expected object, received undefined`, which is a raw error surfaced to a user, and `code-standards.md` forbids exactly that. Structural failures now return the generic message; field-level ones, which are written for a person, pass through.

**18 — The documented `(input: unknown)` signature over `useActionState`.**
`useActionState` wants `(prevState, formData)` and would give progressive enhancement — the form would work with JavaScript off. The signature in `code-standards.md` is unambiguous, and client-side zod validation needs JavaScript regardless, so the forms are already JS-dependent. Kept the documented pattern and drove it with `useTransition`. Worth revisiting only if a buyer's brief actually demands no-JS submission.

**18 — Controls are `min-h-11`, and it fixed a visible mismatch.**
The newsletter button first rendered at 32px beside a 43px input — the default `Button` size. `min-h` on the control and `size="lg"` on the button put both at exactly 44px, which is also the touch-target minimum. `min-h` rather than `h` so the textarea can still grow.

**18 — The newsletter row aligns with `sm:items-end`, and the error moved outside it.**
Aligning the button to the input meant clearing the label above it, which the first version did with `mt-[26px]` — a magic number, and one that breaks the moment an error appears and the field grows. Rendering the error below the whole row instead lets `items-end` do the alignment, with nothing to recompute.

**18 — The pending spinner is the one looping animation in the template.**
`ui-rules.md` says nothing animates on a loop and no duration exists outside 150ms and 500ms; the same file's form section requires a spinner. The specific rule wins and the general one now names the exception, so the two no longer contradict each other.

**18 — The footer's background adjacency is a gap in the rule, not a violation.**
The pricing page's contact section is `bg-bg-subtle` and sits directly above the `bg-bg-subtle` footer. Alternation cannot be satisfied at both ends of a four-section page, and the home page has had the same adjacency since feature 11 — `FinalCta` is subtle above a subtle footer. The footer is not a `Section` and carries its own `border-t`, which is the separator. `ui-rules.md` now says so rather than leaving a rule that the design quietly breaks twice.

**17 — `motion` was approved and is not installed.**
`code-standards.md` requires checking for a native solution before adding a dependency, and here there is one: the entire motion brief is a 16px rise and a fade. `IntersectionObserver` plus a keyframe covers it in about sixty lines, with no library weight in a package a buyer inherits. Same reasoning that kept the chart library out. `architecture.md` and `code-standards.md` corrected. Install it only if the brief grows past what CSS can express.

**17 — The reveal is a CSS `animation`, not a `transition`. This one was a real bug.**
The first version used `transition: opacity, transform`. Measuring a revealed feature card showed `transition-duration: 0.15s` and a property list of `color, background-color, border-color, …` — the card's own `transition-colors duration-150` was winning, because Tailwind utilities sit in a later layer than `@layer components`. The reveal was silently snapping with no animation at all, and it looked plausible enough to pass a glance. Switching to a keyframe sidesteps the conflict entirely: animations do not compete for the transition property, and the card keeps its hover border transition. Verified mid-flight — the six cards read 0.75 / 0.63 / 0.48 / 0.32 / 0.14 / 0.00.

**17 — `Reveal` replaces the container it animates instead of wrapping it.**
The obvious shape is `<Reveal>` around each card. It does not work here: a wrapper div between a grid and its cards becomes the grid item, so the bento `lg:col-span-2` stops applying and the 3×3 balance from feature 07 breaks; and a div between `ol` and `li` is invalid HTML, which `HowItWorks` and the changelog both hit. So `Reveal` takes an `as` prop and renders as the grid or the list itself, staggering its own children through `[data-reveal="stagger"] > *`.

**17 — The first block of a page never reveals.**
Above the fold on every load, so a fade there delays exactly what the visitor came for and puts an animation in front of the LCP element. The hero, every `PageHeader`, and the post body are static; everything below the first block reveals. Stated as a rule in `ui-rules.md` so it does not read as an omission.

**17 — Visual state lives in `globals.css`, not in the component.**
`Reveal` sets `data-reveal` and `data-revealed` and nothing else; the distance, durations, delays, and reduced-motion override are all CSS. That puts every value a buyer might tune in the file they already open for design values, and keeps the component to the one thing it decides — when.

**17 — Reduced motion is handled in CSS as well as JS, and that ordering matters.**
The JS check alone leaves the page briefly invisible before the effect runs. The `@media (prefers-reduced-motion: reduce)` block makes it correct from the first paint with no JavaScript involved; the component's early return then just avoids pointless observer work. Verified by temporarily flipping the query to `no-preference`, loading the page, and confirming every reveal node and staggered child at `opacity: 1` with `animation-name: none` — and **30 layout probes identical to the animated build**, which is the "layout unchanged" half of the done-when.

**17 — A `<noscript>` override, because the reveal starts hidden.**
Elements begin at `opacity: 0` and are flipped by an observer. With JavaScript off nothing flips them and the page is blank — a static marketing site failing at the one thing static sites are good at. Three lines in the root layout.

**17 — `setState` inside an effect is the lint rule this project keeps hitting.**
The reduced-motion branch originally called `setRevealed(true)` synchronously and tripped `react-hooks/set-state-in-effect`, the same error already outstanding in `ThemeToggle`. Fixed by removing the state change entirely rather than suppressing the rule: the CSS already forces those elements visible, so the early return renders the identical page. Worth remembering when feature 21 tackles `ThemeToggle` — the fix there is likely to be the same shape, removing the state rather than working around the rule.

**16 — `not-found.tsx`'s own `metadata` does not cover `notFound()` calls from a route.**
Hitting an unmatched URL gave the right tab title; hitting `/blog/does-not-exist` gave the site default, because the blog route's `generateMetadata` had already run and returned `{}` for the missing post. The 404 page renders inside that route's metadata, not its own. Fixed by returning `siteConfig.notFound.metaTitle` from the post route's metadata when the slug misses. **Any future route calling `notFound()` needs the same line** — feature 19 should fold it into the `lib/seo.ts` builder rather than repeating it.

**16 — The 404 numeral is a real type step, and is documented as one.**
It is 120px, above the 64px hero display, and the only step set in `text-fg-muted`. Added to the type table in `ui-tokens.md` rather than left as an arbitrary value in the component: a size that exists nowhere in the token file is a size the next person changes without knowing what it was for. Muted and oversized so the number reads as a backdrop to the headline — at hero-display size and full contrast it becomes the message, which it is not.

**16 — "404" lives in config.**
It is a user-facing string, and the invariant has no carve-out for numerals. It also happens to be the thing a buyer localising the template would want to change.

**16 — The dev-only "script tag while rendering" warning on 404 is not a defect.**
It appears on the 404 page in `next dev` and is absent from a production build served with `next start`. Checked deliberately, because the same warning showed up alongside the real hydration bug in feature 14 and was worth ruling out rather than assuming.

**15 — One `readEntry()` and one base schema serve both content types.**
`lib/content.ts` was post-shaped. Rather than copying it for the changelog, `baseFrontmatter` now holds what both share — title, description, date, draft — and each type `.extend()`s it, posts with `tags` and entries with `version`. The draft filter, the sort, and the error message are written once. A second copy would have drifted the moment one of them changed.

**15 — The vertical rule lives on each entry, not on the list.**
A `border-l` on the `<ol>` runs the full height of the list, so it continues past the last entry and trails off into the section padding. Putting it on each `<li>` with `last:border-transparent` makes it run marker-to-marker and stop at the final release. `last:pb-0` removes the trailing gap the same way. Verified: items 0–2 carry `rgb(30,30,38)`, item 3 is transparent, and every dot sits at offset 0 from the rule.

**15 — Version badges are neutral, not accent.**
`ui-tokens.md` reserves the accent for buttons, active nav, links, focus rings, the highlighted tier, chart series 1, and the hero glow. A release number is none of those. The badge is Geist Mono on `bg-surface-raised` with a `border-border` outline — mono because `ui-tokens.md` names version tags as a mono use, neutral because the accent means something specific in this template.

**15 — Changelog entries have no route of their own.**
The build plan asks for a single page of entries, so `slug` exists only as a stable React key. Worth knowing before feature 19 writes the sitemap: it should enumerate post slugs but not changelog ones, because there is nothing at `/changelog/<slug>` to link to.

**15 — `MdxContent`'s first-child margin needed neutralising, not changing.**
The map opens every element with a top margin, which is right in a post body and wrong directly under an entry title. Handled at the call site with `[&>*:first-child]:mt-4` rather than by editing the map, which would have re-spaced all six posts to fix one page.

**14 — A `<figure>` inside a `<p>` was breaking hydration on every post with an image.**
Markdown wraps a standalone image in a paragraph, so mapping `img` to a `<figure>` produced `<p><figure>…</figure></p>`. That is invalid HTML: the browser hoists the figure out, the DOM stops matching what the server sent, and React throws a hydration error — which is why the figure rendered as an empty box. Fixed in the `p` mapping, which unwraps a paragraph whose only child is `MdxImage` (a named function precisely so it can be identified by reference). **Any element mapped to a block-level tag needs the same treatment**, since markdown paragraphs wrap all of them.

**14 — `remark-gfm` had to be added; tables are not core markdown.**
The retention post's cohort table rendered as nothing at all — GFM tables, strikethrough, and autolinks are a GitHub extension that neither MDX nor `next-mdx-remote` enables by default. Passed through `options.mdxOptions.remarkPlugins`. Added to the approved dependency table in `code-standards.md`. Worth knowing before feature 15, which uses the same pipeline.

**14 — `--container-prose` never worked, and is now `--container-reading`.**
Tailwind ships a built-in `max-w-prose` of `65ch`, which beat the theme key of the same name. The FAQ and the post body were both at 689.5px rather than the 680px the token declared, and editing `--container-prose` in `globals.css` did nothing — a dead knob in the one file the template promises a buyer can edit. Renamed the token and the utility to `reading`; both now measure exactly 680px. This was a latent defect from feature 11, not something feature 14 introduced. **Check any new `--container-*` or `--color-*` key against Tailwind's built-in utility names before adding it.**

**14 — Read time is derived, so post bodies are the source of truth for it.**
Enriching three posts with headings, lists, and a table moved their read times from 3/1/2 to 3/2/3. Nothing needed updating anywhere, which is the payoff for not storing the number.

**14 — Six sample posts, not the three the build plan asked for.**
The mock array in feature 13 held six, and the index was designed and verified against two full rows of cards. Three posts would leave one thin row and exactly one post per tag, which makes the tag filter look like decoration. These are the same six posts converted to MDX rather than new content; element coverage still comes from three of them. `build-plan.md` corrected.

**14 — The sample figure is a drawn SVG with hardcoded mid-tone colours.**
It loads through `<img>`, so it cannot inherit `currentColor` or see the `.dark` class — the two mechanisms every other graphic in this template uses. Each value sits between the light and dark palette so it reads on both. This is the one place in the project where a colour is written outside `globals.css`, and it is a `public/` asset rather than a component, so the no-hex invariant is not in play. `next.config.ts` needed `dangerouslyAllowSVG` with the `contentDispositionType` and CSP pair that Next documents alongside it; the template has no uploads, so every SVG the optimizer sees shipped in the repo.

**14 — No syntax highlighting in code blocks.**
It would mean a highlighter dependency, a grammar bundle, and a theme to maintain in two colour modes — for sample code a buyer replaces on day one. Blocks are Geist Mono on `bg-surface-raised`, which retheme for free.

**13 — Read time is derived from the body, not stored in frontmatter.**
`Post` has no `readTime` field and should not get one. A hand-maintained minute count goes stale the first time a post is edited, and it is one more thing a buyer can get wrong in every file they write. `readingTime()` in `lib/utils.ts` divides the word count by `READING_WPM` (200) with a floor of 1. Feature 14 should use the same helper rather than adding a frontmatter field.

**13 — Mock posts carry real prose, because read time is derived from it.**
The first draft had six bodies of 200–280 words, which all rounded to "1 min read" — six identical cards, which tells you nothing about whether the layout holds. Extended three of them to 400–500 words for a 3 / 2 / 1 spread. The bodies are on-topic rather than lorem so they can seed feature 14's sample posts instead of being thrown away.

**13 — Dates are formatted with locale and time zone both pinned.**
`formatPostDate()` passes `"en-US"` and `timeZone: "UTC"`. The card renders on the server and again on the client, so an unpinned locale is a hydration mismatch and an unpinned zone dates every post a day early for readers west of UTC. `YYYY-MM-DD` parses as UTC midnight, which is exactly the value that shifts.

**13 — Card titles are `h2`, sized at 18px.**
The page `h1` is the header, so an `h3` card title would skip a level. The element and the type step are independent decisions and this is the case that shows why — six `h2`s at 18px is correct, and an `h3` styled identically would not be.

**13 — Filter pills stay 44px through tablet, dropping to 36px at `lg` rather than `md`.**
`ui-rules.md` required 44px "on mobile", and its own breakpoint table puts tablet at 768–1023. Compacting at `md` therefore left an iPad on 36px targets — technically inside the letter of the rule and outside its point. `ui-rules.md` corrected to say mobile **and tablet**.

**13 — The tag-filter empty state is a guard, not a reachable branch.**
Tags are derived from the posts, so every pill always has at least one post behind it and "No posts tagged X" cannot be triggered through the UI. Kept it anyway: the moment a buyer swaps in a curated tag list it becomes the difference between an explanation and a blank page. Verified by seeding a non-existent tag, confirming the message and the ghost reset button, then reverting. Documented as a guard in the component so it does not read as dead code.

**12 — Comparison rows are their own config shape, not derived from tier bullets.**
`build-plan.md` said "comparison rows derived from tier feature lists". Deriving them produces a useless table. The tiers describe the same capability in different words — "10,000 events per month", "1 million events per month", "10 million events per month" — so a union of those strings gives nineteen rows with a single check each and no shared labels to compare across. A comparison row needs one label plus one value per tier, which the bullet lists do not contain. Added `pricing.comparison: ComparisonGroup[]`, grouped, values matched to tiers by position. `build-plan.md` and `architecture.md` corrected.

**12 — The comparison table's min width is 640px, not 720.**
720px was the first choice, matching the dashboard mockup. At 375px it showed only the row labels and about 80px of the Starter column — the values were entirely off-screen, which reads as a broken table rather than a scrollable one. Dropping to 640px with `px-4` cells below `md` puts the Starter column's values inside a 375px viewport (its centre lands at x=313 in a 325px scroller), so the page still works without touching it. Verified: no page-level horizontal scroll at 375, 768, or 1440.

**12 — `table-fixed`, because auto layout made one plan look bigger.**
With default layout the tier columns measured 216 / 234 / 308px — "Dedicated manager" widened the Scale column by 40%. Three plans of visibly different widths reads as a design error in a pricing table. `table-fixed` with `w-[34%]` on the label column splits the rest equally.

**12 — The highlighted tier gets its name in accent and nothing else.**
Tinting the whole Growth column was the obvious move and is wrong here: nineteen rows of `bg-accent-subtle` is exactly the "large background fill" `ui-tokens.md` forbids for the accent. Colour enters through the text, as it does in every card in this template.

**12 — `PageHeader` is a separate component from `SectionHeader`.**
`SectionHeader` renders an `h2`. A page needs one `h1`, and promoting a section heading to fill the role would have broken the heading order rule the moment a second section appeared below it. `PageHeader` is the same three parts at the page-title type step, with no `Section` of its own so the header and the tiers it introduces share one background.

**12 — Page leads use `text-pretty`, not `text-balance`.**
The pricing lead broke with "does." alone on its third line. `text-balance` squares a long lead into a block and changes its shape; `text-pretty` only pulls a word down to kill the orphan. Applied to `PageHeader` only — `SectionHeader` is unchanged, since editing it would re-flow five verified home page sections.

**11 — Verify geometry only after checking `window.innerWidth`.**
Spent a long detour on an apparent accordion bug: panels reported `height: 0` while expanded, with a stuck `data-starting-style` and a nonsensical `--accordion-panel-height: 951px`. The actual cause was that the browser pane had collapsed to `innerWidth: 0`, so **every geometry reading was meaningless**. With a real viewport the default-open panel measures 84px correctly, and with animations disabled an interactive open measures 60px with the marker cleared. The accordion was never broken.

Three harness artifacts have now cost real time — `window.scrollTo` firing no scroll events, synthetic clicks not reaching Base UI, and a zero-width viewport. **Before trusting any measurement, assert `window.innerWidth > 0` and `document.visibilityState`.** A hidden document also throttles rAF, which prevents CSS animations completing and leaves Base UI transition markers stuck.

**11 — The reduced-motion path is confirmed working.**
Disabling animations was how the accordion was isolated, which incidentally verified that panels open correctly with zero-duration animations — the behaviour `prefers-reduced-motion` users will get.

**10 — The deferred config validator now exists.**
`lib/validate-config.ts`, called once from the root layout, warns in development about invariants TypeScript cannot express: tier count, exactly-one-highlighted, discount range, step count, bento span total, and a trailing slash on `url`. It **warns rather than throws** — a buyer mid-edit should see a broken pricing row, not a white screen. Verified by deliberately breaking two invariants and confirming both warnings fired with actionable text, then confirming silence once restored.

**10 — Switch hit area was under the 44px minimum.**
Stock shadcn ships `after:-inset-y-2`, giving 55×34 — my own `ui-rules.md` requires 44px on mobile. Changed to `after:-inset-y-[14px]` for 55×45, with the visual switch unchanged at 32×18. Measured by probing `elementFromPoint` outward from the centre, since `getBoundingClientRect` does not include the `::after` hit area.

**10 — Base UI components need a full pointer sequence, not a synthetic click.**
The harness `left_click` did not toggle the switch even post-hydration; `element.click()` and a full `pointerdown → mousedown → pointerup → mouseup → click` sequence both did. The component is correct for real users. **Test Base UI interactions with a full pointer sequence.** Same class of issue as `window.scrollTo` not firing scroll events.

**09 — Testimonial avatars are initials, not photographs.**
Stock portraits would imply real named customers the buyer does not have, which is a misrepresentation they would be shipping under their own brand. Initials in a tinted circle read as deliberate rather than as a missing image, and remove a licensing question from the package entirely.

**07 — Section heading copy moved into config as `sections`.**
Nothing in `SiteConfig` held a section's eyebrow / heading / lead, so building the feature grid would have meant hardcoding headings in the component — breaking the no-strings-in-components invariant. Added `sections` keyed by section name, with copy for features, howItWorks, testimonials, pricing, and faq written up front. Types, config, and `architecture.md` updated.

**07 — Bento spans must total a multiple of three.**
The original spans (2,1,1,2,1,1) summed to 8 in a 3-column grid, leaving a visible hole in the last row — bad in a marketplace screenshot. Gave the sixth feature `span: 2` for a total of 9 and a clean 3×3. Recorded in `ui-registry.md` so adding a feature triggers a rebalance rather than a hole.

**05 — `--chart-1` now resolves to `var(--accent)` instead of a literal hex.**
The stated promise is "change `--accent` and the whole site rebrands, dashboard mockup included". It did not: every chart and adoption bar kept the old violet because `--chart-1` was its own literal. Verified by editing `globals.css` to an orange accent — CTA, logo, and eyebrow followed; the chart did not. Now `--chart-1: var(--accent)` in both themes, so the primary metric series is always the brand color. `--chart-2` through `--chart-5` stay independent, which is correct — supporting series must remain visually distinct.

**05 — Bar chart heights were collapsing to zero.**
`items-end` on the flex container shrank each column to content height, leaving the inner `flex-1` with nothing to fill. Labels rendered, bars did not. Fixed by dropping `items-end` and giving columns `h-full`.

**05 — Runtime CSS-variable injection is not a valid test of the rebrand promise.**
Setting `--accent` via `element.style.setProperty` in the dev server did not repaint `bg-primary`, which looked like a broken promise for some time. Editing `globals.css` — the workflow a buyer actually uses — works correctly. **Test rebranding by editing the file, not by injecting variables.**

**04 — The hero carries its own CTA pair, separate from the navbar's.**
`architecture.md` had `ctas` serving "nav and hero buttons", but a hero secondary of "Sign in" is weak — real SaaS heroes use "Book a demo". Rather than hardcode it in the component (which would violate the no-strings-in-components invariant), `hero` gained `primaryCta` and `secondaryCta`. Types, config, and `architecture.md` updated.

**04 — Button `lg` size corrected to the hero spec.**
shadcn's stock `lg` is `h-9 px-2.5` — 36px tall, which read undersized beside a 64px headline. `ui-tokens.md` already specified 14/26px padding at 15px. Now `h-11 gap-2 px-6 text-[15px]`.

**04 — Hero is the one section that does not use `Section`.**
It needs full-bleed decorative layers and asymmetric top padding, neither of which `Section` offers by design. Documented in `ui-registry.md` so it reads as deliberate rather than as drift.

**03 — `nativeButton` defaults to `false` when a `render` prop is passed.**
Base UI's Button assumes a native `<button>`. Rendering a `Link` through `render` logged an error and **stripped button semantics** — a real accessibility defect that would have shipped on every CTA in the template and hit any buyer linking a button. Fixed once in `components/ui/button.tsx` rather than at each call site. Verified output: `<a role="button" tabindex="0" href="…">`.

**03 — Button base radius changed to `rounded-md` (8px).**
Deferred from feature 01 as not judgeable in isolation. With the navbar CTA on screen, shadcn's 12px default read softer than the refined-technical direction wants, and `ui-tokens.md` already specified 8px. Now matches the spec.

**03 — Brand marks are inline SVG, because lucide v1 deleted them.**
`Github`, `Linkedin`, `Twitter` and every other brand icon were removed in lucide-react v1. `components/brand/SocialIcon.tsx` holds the paths, using `currentColor` so they theme like any icon. Recorded in `ui-rules.md` as the third exception to "no custom SVG icons".

**03 — `IconName` "filter" renamed to "funnel".**
lucide v1 renamed `Filter` to `Funnel`. Caught before feature 07 would have hit it. The name is also a better fit for the "Funnels in seconds" feature it labels.

**02 — `IconName` is declared in `types/index.ts`, not derived from the icon map.**
`library-docs.md` originally said to derive it with `keyof typeof ICONS`. That creates a circular import: `site.config.ts` → component → `site.config.ts`. Declaring the union in `types/` and typing the map `Record<IconName, LucideIcon>` gives identical exhaustiveness checking with no cycle. `library-docs.md` corrected.

**02 — `logoCloud.logos` is name-only, no `src`.**
`architecture.md` specified `{ name, src }`, which contradicted `ui-rules.md` calling for inline SVG. Resolved toward name-only: `LogoCloud` renders a known inline SVG or falls back to a styled wordmark. No image assets ship, logos theme correctly in both modes, and a buyer swaps names in config. `architecture.md` corrected.

**02 — Root layout metadata now reads from `siteConfig`.**
It was hardcoded after feature 01, which violated the invariant that no user-facing string lives in a component. Also serves as the first runtime proof that the config loads.

**01 — Theme classes follow the shadcn convention, not dark-on-`:root`.**
The context files originally specified `:root` = dark and `.light` = light. shadcn primitives ship `dark:` variants that only match a `.dark` ancestor, so that scheme would have silently broken every one of them. Now `:root` = light, `.dark` = dark. Dark is still the default and still the designed-first palette. Four context files updated.

**01 — shadcn's semantic layer is mapped onto the Kestrel palette rather than retokenizing components.**
`--primary: var(--accent)`, `--muted: var(--surface-raised)`, `--ring: var(--accent)`, and so on. `button.tsx` needed zero edits and renders violet in both themes. This scales: future shadcn components mostly inherit the design for free. The exception is `bg-accent`, which means "neutral hover" to shadcn and "brand violet" to us — swap it to `bg-surface-raised` on add.

**01 — `enableSystem={false}`.**
Dark is the designed-first look and what appears in marketplace previews, so a visitor's OS preference should not decide the first impression. One prop for buyers to flip.

**01 — Fonts come from the `geist` package, not `next/font/google`.**
Self-hosted, so the template has no runtime dependency on Google Fonts, works offline, and ships nothing that phones home — which matters for a product buyers deploy under their own brand. OFL licensed, so redistribution is clear.

**01 — shadcn installed the `base-nova` style, built on `@base-ui/react`, not Radix.**
`code-standards.md` and `library-docs.md` corrected. Verify component APIs against Base UI docs, not Radix docs.

---

## Notes

**Geist Mono is preloaded on every page and unused on most of them.**
Production console warns `GeistMono_Variable.woff2 was preloaded using link preload but not used within a few seconds` on `/`, `/pricing`, and the 404 alike. The `geist` package preloads both faces regardless of whether a page renders mono text. Harmless but it is a wasted round trip on every first paint, and exactly what **feature 21's "font display strategy checked"** line is for. Not a 404 issue — it was found there and confirmed everywhere.

**Pre-existing lint error in `ThemeToggle.tsx`.**
`npx eslint` fails on `useEffect(() => setMounted(true), [])` with `react-hooks/set-state-in-effect`. It predates feature 12 and does not surface in `next build`, which is why it was missed. The mounted guard itself is correct and documented in `ui-registry.md` — the fix is `useSyncExternalStore` or an equivalent, not removing the guard. **Feature 21 should resolve it**, since a paid template that fails its own lint is a defect a buyer will notice on first commit.

**~~Feature 23 must exclude the build-time files from the buyer's package.~~ Done.**
Resolved post-build: the zip is produced from `git archive HEAD` with `context/`, `marketing/`, `AGENTS.md` and `memory.md` deleted afterwards, which also rules out untracked and ignored files by construction. Recipe and verification steps in `marketing/ASSETS.md`.

**Deferred to feature 19 — per-page metadata through `lib/seo.ts`.**
`app/pricing/page.tsx` exports a minimal `metadata` from `pages.pricing.metaTitle` / `metaDescription`, which satisfies "every route exports metadata" and picks up the root's title template. Canonical, OpenGraph, and Twitter fields are feature 19's job and should replace this object rather than sit beside it.

**Considered and left out of feature 12, deliberately:**

- A repeat of each tier's CTA button in a final table row. Common in premium templates and genuinely useful after nineteen rows, but not in the feature's scope.
- A sticky table header under the navbar. Would need `top-16` coordination with the sticky navbar and a solid background on the header row; the table is short enough not to need it.
- `text-pretty` on `SectionHeader`'s lead. It would improve every section, and it would also re-flow five sections that were verified in phase 2. Worth doing as one deliberate pass in feature 20.

**Deferred to feature 10 — a runtime guard on pricing invariants.**
`architecture.md` requires exactly 3 tiers with exactly one `highlighted: true`. TypeScript cannot express that, and a buyer editing config could break it silently. A dev-only assertion belongs with the pricing UI in feature 10, not here. Currently correct by inspection: 3 tiers, 1 highlighted.

**Company names in testimonials and the logo cloud are fictional** (Loomstack, Fernwood, Trellis Health, Northbound, Halcyon, Meridian). Deliberately so — shipping a template that implies real customers would be a misrepresentation for the buyer. The README must tell buyers to replace them.

_Workarounds, surprises, and anything that differs from the context files. If something here contradicts a context file, update the context file too — this section is for the record, not for corrections that never land._
