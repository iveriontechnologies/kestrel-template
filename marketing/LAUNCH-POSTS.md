# Launch posts

Copy for announcing Kestrel. Written for X, but the shape transfers.

**Facts you may use, all verified:** six pages, MDX blog, light and dark, Next.js
16 / React 19 / TypeScript strict / Tailwind v4. Lighthouse accessibility 100,
best practices 100, SEO 100, performance 93–95, CLS 0. Home page 358 KiB. No
chart library, no animation library, no analytics, self-hosted fonts.

**Do not invent a backstory.** No "six months of nights and weekends" unless it
is true. It is the one thing in a launch post that people can smell and the one
that costs you the room.

---

## The video post

Upload the video **natively**. A linked YouTube video does not autoplay in the
timeline and will be scrolled past. Add alt text — it also makes the post
readable to anyone with autoplay off.

Only the first two lines show before "show more", so the hook has to live there.

### Option A — lead with the numbers

> Lighthouse, on the production build:
>
> Accessibility 100
> Best practices 100
> SEO 100
> Performance 93–95
> CLS 0
>
> Performance isn't 100 and I'm not going to say it is.
>
> Kestrel — a Next.js 16 landing page template. Six pages, MDX blog, light and
> dark. Demo below.

The refusal to round up is the whole post. On a timeline full of "100/100/100
🚀" it reads as someone who actually ran the test.

### Option B — lead with what you left out

> No chart library. No animation library. No analytics.
>
> The dashboard mockup is SVG I wrote by hand. The scroll reveals are an
> IntersectionObserver and about sixty lines of CSS.
>
> The home page is 358 KiB on the wire.
>
> Kestrel — a Next.js 16 landing page template. Demo below.

### Option C — lead with the pitch

> Kestrel — a Next.js 16 landing page template.
>
> Six finished pages, an MDX blog, light and dark.
>
> Every word on the site lives in one config file. Every colour lives in one CSS
> file. Change the accent token and the whole thing rebrands — buttons, links,
> focus rings, even the chart in the mockup.
>
> Demo below.

## The reply

> Live demo: https://kestrel-template.vercel.app
>
> https://iverion.gumroad.com/l/kestrel
>
> $39 with code MXHVMZKS until 5 October, $59 after.

Putting links in a reply rather than the main post is common advice, on the
theory that the timeline demotes posts that send people away. It is widely
believed and not something I can verify. If you would rather not split it, put
the demo link in the post and accept whatever the algorithm does — a launch post
nobody can act on is its own problem.

## On saying it was built with AI

Your call, and there is a real argument either way.

The case for saying it: your Creative Market listing already declares it, the
repository is public, and 22 of its 23 commits carry a `Co-Authored-By: Claude`
trailer. Anyone who looks will find it in a minute. Finding it themselves, after
a post that implied otherwise, is much worse than reading it from you.

The case against: it is not what the post is about, and a launch post is not a
disclosure form.

What does not work is implying solo authorship. If you would rather not raise it
in the main post, this is enough, as a reply:

> Built with Claude, and worth saying plainly. I specced it, made the calls, and
> shipped it — the code was written with AI in the loop. The demo is public;
> judge it on that.
