# Marketplace listing copy

Paste-ready copy for Gumroad and Creative Market, plus the shared feature list.

**Live demo: https://kestrel-template.vercel.app** — it belongs at the top of both
listings and in the first line of the description. For a template, the demo does
more selling than any screenshot.

**Every number in here was measured, not estimated.** If you change the template
before listing it, re-measure before you republish — an inflated Lighthouse score
in a listing is the kind of thing buyers check.

Last measured **4 September 2026**, against a production build (`npm run build`
then `next start -p 3100`) with Lighthouse 12 on its default mobile preset.
Performance is the median of three consecutive runs — a single run on a busy
machine came in at 76, so one run is not a measurement.

---

## Short description (one line)

> A premium Next.js 16 landing page template for SaaS and developer tools. Six
> pages, an MDX blog, light and dark — and one config file that holds every word
> on the site.

**Under 60 characters**, for cards and search results:

> Next.js landing page template with an MDX blog

---

## Gumroad

### Title

`Kestrel — Next.js 16 Landing Page Template`

### Description

Written to be read out loud. If a sentence sounds like a brochure, cut it.

**A note before you paste this in:** the opening is in first person, as you. Read
it and make sure it is true of you before it goes live. If any of it is not, say
it your own way — a slightly clumsy sentence you mean beats a smooth one you
don't.

Also: Gumroad's editor ate the markdown table last time. The numbers below are
plain lines for that reason. Don't convert them back to a table.

---

Live demo → https://kestrel-template.vercel.app

Have a look at that first. It is the whole template, deployed, not a mockup.

I built Kestrel because I kept buying templates and then losing a day undoing
them. Colours hardcoded across forty components. Copy buried in JSX. A "blog"
that turned out to be three static pages.

So the rule here was simple. Every word on the site lives in one file. Every
colour lives in one other file. `site.config.ts` holds the copy, `globals.css`
holds the tokens. Change `--accent` from violet to whatever you use, and the
buttons, links, focus rings, the highlighted pricing tier and the chart in the
dashboard mockup all follow. No find and replace.

**Six pages, all of them finished**

- Home, ten sections
- Pricing, with a monthly/annual toggle and a comparison table
- Blog index, with tag filtering
- Blog post
- Changelog
- A 404 that looks like the rest of the site

The blog is real MDX, not a hardcoded array. Frontmatter is validated with zod,
so a typo fails the build and tells you which file it is in. Drafts stay out of
production. Read time is worked out from the body, so there is nothing to keep
in sync.

**Things I left out on purpose**

No chart library. The dashboard mockup is SVG I wrote by hand, and it rethemes
with your accent colour.

No animation library. The scroll reveals are an IntersectionObserver and some
CSS keyframes.

No analytics, no tracking, no third-party requests at all. The fonts are
self-hosted.

The home page is 358 KiB on the wire.

**Numbers, measured on a production build**

Accessibility: 100
Best practices: 100
SEO: 100
Performance: 93 to 95, depending on the page
Cumulative layout shift: 0

Performance is not 100 and I am not going to write that it is. It sits in the
low nineties on a throttled mobile profile, which is where a real Next.js app
with real fonts and real images lands.

**What you get**

Full source: Next.js 16, React 19, TypeScript in strict mode, Tailwind CSS v4.
Six sample blog posts and four changelog entries, so you can see the layouts
with something in them. A setup guide that walks from clone to deployed in about
half an hour. Light and dark, both finished, both clearing WCAG AA contrast.

**What you will still have to do**

Replace the demo content. The companies and testimonials are invented. They are
there so the layouts are not empty.

Connect the forms. Newsletter and contact both work, validation and pending
states and all, but they need your provider. Two `TODO (buyer):` markers show
you exactly where.

Drop in your own logo. It is one SVG in one component.

**The licence, in one sentence:** build as many sites as you like, for yourself
or for clients, charge whatever you charge, hand the finished site over to the
client — you just cannot resell Kestrel itself.

**On refunds:** there are none. The demo is the entire template, deployed and
public, so you can click through every page in both themes before you spend
anything. Nothing is hidden behind the purchase. Please do look first.

Node 20.9 or newer. Deploys to Vercel in a click, or anywhere that runs a
Next.js build.

---

### Filling in the Gumroad form

Field by field, in the order Gumroad asks. Every value is decided — this is
transcription, not decisions.

| Field | Value |
| --- | --- |
| Product type | Digital product |
| Require shipping information | **Off.** It is a physical-goods setting. Turning it on adds an address form to checkout and collects data you have no use for |
| Name | `Kestrel — Next.js 16 Landing Page Template` |
| URL slug | `kestrel` (or `kestrel-nextjs-template` if taken) |
| Price | **$59** list, with a discount to **$39** — see below |
| Cover / thumbnail | `marketing/thumbnail.png` |
| Gallery images | `marketing/screenshots/01, 03, 05, 07, 08, 12` in that order |
| Video | Yours. Put it first if Gumroad lets you order it above the images |
| Product file | `kestrel-template.zip` |
| Summary | The one-liner at the top of this file |
| Description | The Gumroad description above, demo link on the first line |
| Category | Software & Development, or Design if that reads better to you |
| Tags | `nextjs`, `react`, `tailwind`, `landing-page`, `saas`, `template`, `typescript`, `mdx` |
| Refund policy | **No refunds.** See the note below before you set it |
| Content rating | All audiences |

**Gallery order matters more than the count.** Six is plenty. Lead with the dark
home page, then light, then pricing — pricing is where a buyer decides the
template is complete rather than a hero and filler. The full-page shots
(`02`, `04`) are better linked from the description than dropped in the gallery,
where their aspect ratio makes every other thumbnail small.

**Price: $59 list, discounted to $39.** Decided 5 September 2026, before the
first sale — which is the right order, because raising a list price after a
product has sales is the awkward direction.

Set it up as:

1. Product price: **59**.
2. A discount of a **fixed $20 off**, not a percentage. 39 off 59 is 33.898%,
   and a percentage discount will round somewhere you did not choose.
3. Give it a **limit** — an end date or a number of uses. A discount with no
   limit is not a launch offer, it is a lower price with extra steps, and it
   removes the reason to buy today.

I set this up from the field sheet rather than from your dashboard, so confirm
the menu names in Gumroad itself — the discount UI has moved before and my
recollection of it is not evidence.

**The part that actually costs money if you miss it:** a Gumroad discount
applies through its own link. Someone landing on the bare product URL sees $59
with no strike-through. So the coded link — not the plain product URL — is what
goes in the listing description, the demo site, the launch post, and anywhere
else you promote it. Put the plain URL in one of those by accident and you are
quietly charging 59.

Do not write a fake "was $99" into the description text. The struck-through
price should come from the real list price and nothing else — it is the one
claim in a listing a buyer can check in a second, and on a listing that measures
everything else honestly it would cost more trust than the discount buys.

**About the no-refund policy.** Set it, but know what it does and does not do.

It sets expectations, and paired with a public demo that is genuinely the whole
product it is defensible. What it does not do is stop money going back out.
Gumroad can refund a buyer over your head under its own terms, and a card
chargeback is between the buyer and their bank — your policy is not part of that
conversation. The licence already handles the outcome: §11 terminates the licence
if a purchase is refunded or reversed, so someone cannot keep the rights and the
money both.

Two more things I would check rather than assume. Buyers in the EU and UK have a
statutory withdrawal right on digital purchases that a seller's policy cannot
simply switch off, though it can usually be waived at checkout if the buyer
consents to immediate download; Gumroad handles some of this for you and it is
worth seeing how. And on Creative Market I am not certain the refund policy is
the seller's to set at all — check before you assume it carries over. Neither of
these is a reason to change your mind, they are just the shape of it.

**Before you hit publish**

- Open the demo link from the description in a private window. It is the first
  thing a buyer clicks and the one thing that must not 404.
- Check the description renders — Gumroad's editor can eat the markdown table.
  If it does, the plain feature list further down this file is the fallback.
- Confirm the uploaded zip is the current one: 168 KB, unpacks to `kestrel/`.

## Creative Market

Shorter than the Gumroad copy, because Creative Market's layout truncates a long
opening. Same voice: plain sentences, no bolded lead-ins, nothing claimed that
was not measured.

### Title

`Kestrel - Next.js SaaS Landing Page Template`

### Opening paragraph

Live demo → https://kestrel-template.vercel.app

> Kestrel is a Next.js 16 landing page template for SaaS and developer tools.
> Six pages, all finished: home, pricing, blog, blog post, changelog, and a 404
> that looks like the rest of the site. Every word on the site lives in one
> config file and every colour lives in one CSS file, so rebranding it is an
> afternoon of editing two files rather than a week of hunting through
> components. The demo above is the template itself, deployed. Look at that
> before you read anything else.

### Highlights

- Six pages, ten home page sections
- A dashboard mockup drawn in SVG by hand, which rethemes with your brand colour
- MDX blog and changelog. Frontmatter is validated, so a typo fails the build
  and names the file
- Light and dark, both finished, both clearing WCAG AA contrast
- Newsletter and contact forms that work, with two marked places to plug in your
  provider
- Canonicals, OpenGraph, a generated OG image, sitemap, robots, JSON-LD
- Self-hosted fonts. No analytics, no tracking, no third-party requests
- No chart library and no animation library. 358 KiB on the wire

### What's included

- Full source: Next.js 16, React 19, TypeScript in strict mode, Tailwind CSS v4
- Six sample blog posts and four changelog entries, so the layouts are not empty
- A setup guide that goes from clone to deployed in about half an hour
- Commercial licence covering your own projects and client work

### Measured on a production build

Accessibility 100, best practices 100, SEO 100. Performance sits between 93 and
95 depending on the page, and cumulative layout shift is 0. Performance is not
100 and the listing does not say it is.

### What you will still have to do

Replace the demo content, which is invented. Connect the two forms to your
provider. Drop in your own logo, which is one SVG in one component.

### Software required

Node.js 20.9 or newer. Any code editor. No design software needed.

---

## The feature bullet list

Reusable anywhere a short list is wanted.

```
✓ Live demo: https://kestrel-template.vercel.app
✓ Six complete pages — home, pricing, blog, post, changelog, 404
✓ One typed config file holds every word on the site
✓ Light and dark themes, both complete, both WCAG AA
✓ MDX blog and changelog with validated frontmatter
✓ Hand-built dashboard mockup — no chart library
✓ Scroll reveals with no animation library
✓ Newsletter and contact forms, with two clear wiring points
✓ Full SEO: canonicals, OG image, sitemap, robots, JSON-LD
✓ Self-hosted fonts, no third-party requests
✓ Lighthouse 100 accessibility / best practices / SEO
✓ Next.js 16, React 19, TypeScript strict, Tailwind CSS v4
✓ Commercial licence — unlimited projects
```

---

## What to say about the demo content

Say it plainly somewhere in the listing. Buyers appreciate it, and it protects you.

> The companies and testimonials in the demo are fictional. They exist so you can
> see the layouts populated, and the setup guide walks you through replacing them
> before you launch.

---

## Claims to avoid

Do not write these. Each one is either untrue or unverifiable.

- ~~"100 Lighthouse scores"~~ — performance measures 93–95, not 100. Say what it is.
- ~~"Fully accessible"~~ — contrast, targets, focus, and heading order were tested.
  That is not the same as an audit of the whole WCAG spec by a specialist.
- ~~"SEO optimised — rank #1"~~ — the metadata is complete. Rankings are not yours
  to promise.
- ~~"Lifetime updates"~~ — only if you intend to provide them.
- ~~"Used by X companies"~~ — the logo cloud is fictional, and so is that claim.
