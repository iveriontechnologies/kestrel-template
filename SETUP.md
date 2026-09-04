# Setup

From a fresh clone to your own brand, deployed. About thirty minutes, and you
will not need to open a component file.

Work through it in order — each step assumes the one before.

---

## 0. Run it (2 minutes)

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. You should see the Kestrel demo site. Click the
sun/moon icon in the header to check both themes work.

---

## 1. Your words (15 minutes)

Open **`site.config.ts`**. This is the only file that contains user-facing text,
and it is the longest step by far — everything after it is quick.

It is typed, so your editor will tell you if you miss a field, and the build will
fail rather than ship a half-edited config.

Work top to bottom:

| Key | What it controls |
| --- | --- |
| `name`, `tagline`, `url` | Product name, one-line description, and your canonical domain |
| `nav`, `ctas` | Header links and the two header buttons |
| `hero` | Headline, subheadline, the three bullets, and the hero's own two buttons |
| `logoCloud` | The "trusted by" strip — **see step 2** |
| `pages` | The heading and metadata for pricing, blog, and changelog |
| `sections` | The eyebrow, heading, and lead above each home page section |
| `features` | Six feature cards. `icon` picks from a fixed set; your editor lists them |
| `howItWorks` | Exactly three steps |
| `testimonials` | **See step 2** |
| `pricing` | Three tiers, one with `highlighted: true`, plus the comparison table |
| `faq`, `pricingFaq` | The two accordions |
| `forms` | Field labels, button labels, and success messages |
| `finalCta`, `notFound`, `footer`, `seo` | Closing band, 404 copy, footer columns, metadata defaults |

Some rules are enforced at runtime rather than by types — exactly three pricing
tiers, exactly one highlighted, comparison rows matching the tier count. If you
break one, a warning naming the file and the fix appears in your terminal in
development. It warns rather than throws, so you can keep editing.

> **Save often and watch the browser.** The dev server reloads on every change,
> so you are never more than a second away from seeing what you just wrote.

---

## 2. Delete the fiction (2 minutes)

Two parts of the demo content are invented and **must not ship**.

**Testimonials.** The three quotes in `testimonials` are from people who do not
exist, at companies that do not exist. Replace them with real ones, or delete the
array entries and the section will render with whatever you leave.

**Logo cloud.** `logoCloud.logos` lists six fictional companies. Replace the
names with your real customers. Each name is matched against a small set of
hand-drawn marks in `components/home/LogoCloud.tsx`; a name with no match renders
as a styled wordmark on its own, which looks intentional. To add your own mark,
there is a commented block at the top of that file showing exactly where.

If you have no customers to show yet, delete the whole `<LogoCloud .../>` line
from `app/page.tsx`. An honest gap beats an invented one.

---

## 3. Your colours (3 minutes)

Open **`app/globals.css`**. Every colour in the template is defined at the top of
that file, twice — once under `:root` for light mode and once under `.dark`.

Change `--accent` in both blocks and the entire site follows: buttons, links,
focus rings, the highlighted pricing tier, the chart in the dashboard mockup, and
the glow behind the hero.

```css
:root {
  --accent: #5b4be8;        /* your brand colour, light mode */
  --accent-hover: #4c3cd9;  /* ~8% darker */
  --accent-text: var(--accent);
}

.dark {
  --accent: #6d5ef8;        /* usually a lighter version of the same hue */
  --accent-hover: #8175fa;
  --accent-text: #8f83fb;   /* lighter still — see below */
}
```

Three things worth knowing before you pick values:

- **`--accent` fills, `--accent-text` writes.** One value cannot do both: white
  text on your accent needs the accent to be dark enough, and accent-coloured
  text on a dark surface needs it light enough. In light mode they are usually
  the same; in dark mode `--accent-text` is a lighter version.
- **Check your contrast.** Everything shipped clears WCAG AA in both themes. If
  you pick a pale accent, run your values through a contrast checker against
  `--bg` and `--surface-raised` before you commit to them.
- **The rest of the palette rarely needs touching.** `--bg`, `--surface`,
  `--fg`, and friends are a complete, tested greyscale. Change the accent first
  and see whether you still want to.

To switch the default theme, edit `defaultTheme` in `app/layout.tsx`. To let the
visitor's operating system decide, set `enableSystem` to `true` in the same place.

---

## 4. Your logo (3 minutes)

Open **`components/brand/Logo.tsx`**. It is short, and the top of the file tells
you what to replace.

Swap the `<svg>` for your own mark. Keep `fill="currentColor"` on the outer shape
so it picks up the accent token and themes automatically. The wordmark beside it
comes from `siteConfig.name` — you do not need to edit it here.

The same component renders in the header, the mobile menu, and the footer, so one
edit covers all three.

The favicon is `app/icon.svg` — the same mark, as a standalone file. A favicon is
fetched outside the page, so it cannot read `--accent` from `globals.css`; the
colour is written literally in that file. Change it in both places, or the tab
icon drifts from the header.

`app/favicon.ico` sits alongside it, holding the same mark at 16, 32 and 48px.
Modern browsers take the SVG; the `.ico` is for the clients that ignore the
`<link>` tag and request `/favicon.ico` directly — older Safari, and a number of
link-preview and feed bots. **After you change the mark, regenerate it:**

```bash
node marketing/make-ico.mjs
```

That renders `icon.svg` through a headless browser and repacks the `.ico`, so
the two cannot drift. If you would rather not hand-edit SVG at all, delete both
and drop in your own `icon.png` — Next.js picks it up by filename.

---

## 5. Your first post (3 minutes)

Add a file to **`content/blog/`**. The filename becomes the URL, so
`introducing-kestrel.mdx` publishes at `/blog/introducing-kestrel`.

```mdx
---
title: "Introducing our new thing"
description: "One or two sentences. This appears on the card and in search results."
date: "2026-09-01"
tags: ["Product"]
draft: false
---

Write in Markdown. Headings, lists, tables, code blocks, blockquotes, images,
and links are all styled — nothing falls back to a browser default.
```

- **Frontmatter is validated.** A missing field or a malformed date fails the
  build and names the file and the field. It will not silently drop your post.
- **`draft: true`** shows the post in development and hides it in production.
- **Read time is calculated** from the body. There is no field to maintain.
- **Tags create the filter pills** on the blog index automatically.
- **Images** go in `public/`, referenced as `/your-image.png`. They are authored
  at 1200×600; other ratios work but will letterbox in the figure frame.

Release notes work identically in **`content/changelog/`**, with `version`
instead of `tags`.

Delete the six sample posts and four sample changelog entries when you are ready
— they are there so you can see the layouts full.

---

## 6. Wire up the forms (5 minutes)

The newsletter and contact forms are complete: they validate, show a pending
state, and confirm inline. What they do not do is send anything anywhere.

There are exactly two places to fix, both marked `TODO (buyer):`.

**`actions/newsletter.ts`** — add your email provider:

```ts
// TODO (buyer): connect your email provider here.
await resend.contacts.create({ email: parsed.data.email });
```

**`actions/contact.ts`** — deliver the message somewhere you will read it:

```ts
// TODO (buyer): deliver this message somewhere you will actually read it.
await resend.emails.send({
  to: "sales@yourcompany.com",
  from: "site@yourcompany.com",
  subject: `New enquiry from ${parsed.data.name}`,
  text: parsed.data.message,
});
```

Both files contain a `setTimeout` that exists only so the pending spinner is
visible in the demo. **Delete it** when you add real work — the comment above it
says so too.

Validation runs twice on purpose: once in the browser for immediate feedback, and
again on the server, which is the check that actually protects you. If you change
a rule, change it in both — `lib/forms.ts` for the browser, the schema in
`actions/` for the server. They share their messages, so the wording stays in
step on its own.

---

## 7. Deploy (2 minutes)

Set one environment variable. Copy `.env.example` to `.env.local` for local use,
and set the same variable on your host:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Without it, canonicals and the sitemap fall back to `url` in `site.config.ts`, so
the build still works — it will just point at the wrong domain. On preview
deployments, set it to the preview URL so previews do not publish canonicals
aimed at production.

Then:

```bash
npm run build
```

On Vercel, import the repository and it builds on push. Anywhere else,
`npm run start` serves the output.

---

## Before you call it done

- [ ] Every string in `site.config.ts` is yours
- [ ] No fictional company or testimonial remains
- [ ] `--accent` set in both `:root` and `.dark`, and contrast checked
- [ ] Logo and favicon replaced
- [ ] Sample posts and changelog entries deleted or replaced
- [ ] Both `TODO (buyer):` markers resolved, and their `setTimeout` calls removed
- [ ] `NEXT_PUBLIC_SITE_URL` set on your host
- [ ] `npm run build` and `npx tsc --noEmit` both clean

---

## If something breaks

**A config warning in the terminal.** Development-only, and it names the file and
the fix. Nothing is broken that saving the file will not fix.

**The build fails on a post.** Frontmatter validation. The error names the file
and the field.

**Colours look wrong in one theme only.** You probably changed a token under
`:root` but not under `.dark`, or the reverse. They are separate blocks.

**A component looks off after an edit.** Every class in this template comes from
the token set. If you have introduced a raw hex value or a Tailwind default
colour like `bg-slate-900`, it will not theme — replace it with a token.
