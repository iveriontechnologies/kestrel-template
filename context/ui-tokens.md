# UI Tokens

Every visual value in Kestrel. Defined once in `app/globals.css`, referenced everywhere by name.

This file and `site.config.ts` are the two files a buyer edits to rebrand. Anything that forces them elsewhere is a defect.

---

## How to Use

Tailwind v4 generates utilities from `@theme`. There is no `tailwind.config.ts` for colors.

Themes swap by indirection: `@theme` points at a plain CSS variable, and the theme class redefines that variable. This is what lets one token set serve both modes.

```tsx
// Correct — generated utility classes
className = "bg-surface text-fg border border-border";

// Correct — direct variable reference where a utility does not exist
style={{ boxShadow: "var(--shadow-glow)" }}

// Never — hardcoded value
className = "bg-[#101014] text-[#EDEDF0]";

// Never — Tailwind default color scale
className = "bg-slate-900 text-gray-400";
```

**Dark is the designed-first theme** — it is the palette to perfect first and the one that appears in marketplace screenshots. Structurally, however, it lives in `.dark` and light lives on `:root`, because that is the convention `next-themes` and shadcn/ui are built around. shadcn primitives ship with `dark:` variants that only match a `.dark` ancestor; inverting this would silently break every one of them.

Dark still renders by default: `next-themes` runs with `defaultTheme="dark"` and applies the class before first paint.

---

## globals.css — Palette Definition

The Kestrel palette as it appears in `app/globals.css`. The real file additionally contains the shadcn semantic layer (see **Two-Layer Mapping** below) and `--chart-5`. `app/globals.css` is the source of truth; this block is the readable summary of the layer a buyer edits.

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark, .dark *));

/* ---------- Light ---------- */
:root {
  --bg: #ffffff;
  --bg-subtle: #fafafc;
  --surface: #ffffff;
  --surface-raised: #f7f7f9;

  --border: #e7e7ec;
  --border-strong: #d3d3db;

  --fg: #0a0a0f;
  --fg-secondary: #55555f;
  --fg-muted: #6a6a76;

  --accent: #5b4be8;
  --accent-hover: #4c3cd9;
  --accent-contrast: #ffffff;
  --accent-text: var(--accent);
  --accent-subtle: rgb(91 75 232 / 0.09);
  --accent-border: rgb(91 75 232 / 0.28);

  --success: #047857;
  --warning: #b45309;
  --danger: #be123c;
  --info: #1d4ed8;

  --chart-1: #5b4be8;
  --chart-2: #0891b2;
  --chart-3: #059669;
  --chart-4: #d97706;

  --shadow-sm: 0 1px 2px rgb(16 16 20 / 0.06);
  --shadow-md: 0 4px 12px rgb(16 16 20 / 0.08);
  --shadow-lg: 0 16px 48px rgb(16 16 20 / 0.12);
  --shadow-glow: 0 0 80px rgb(91 75 232 / 0.14);

  --grid-line: rgb(10 10 15 / 0.05);
}

/* ---------- Dark — the designed-first palette ---------- */
.dark {
  --bg: #08080b;
  --bg-subtle: #0c0c10;
  --surface: #101014;
  --surface-raised: #16161c;

  --border: #1e1e26;
  --border-strong: #2b2b36;

  --fg: #ededf0;
  --fg-secondary: #a1a1ae;
  --fg-muted: #86869a;

  --accent: #6d5ef8;
  --accent-hover: #8175fa;
  --accent-contrast: #ffffff;
  --accent-text: #8f83fb;
  --accent-subtle: rgb(109 94 248 / 0.14);
  --accent-border: rgb(109 94 248 / 0.35);

  --success: #10b981;
  --warning: #f59e0b;
  --danger: #f43f5e;
  --info: #3b82f6;

  --chart-1: #6d5ef8;
  --chart-2: #22d3ee;
  --chart-3: #34d399;
  --chart-4: #fbbf24;

  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.4);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.45);
  --shadow-lg: 0 16px 48px rgb(0 0 0 / 0.55);
  --shadow-glow: 0 0 80px rgb(109 94 248 / 0.25);

  --grid-line: rgb(255 255 255 / 0.04);
}

@theme inline {
  /* Fonts */
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  /* Colors — every one points at a themed variable above */
  --color-bg: var(--bg);
  --color-bg-subtle: var(--bg-subtle);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);

  --color-border: var(--border);
  --color-border-strong: var(--border-strong);

  --color-fg: var(--fg);
  --color-fg-secondary: var(--fg-secondary);
  --color-fg-muted: var(--fg-muted);

  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-contrast: var(--accent-contrast);
  --color-accent-text: var(--accent-text);
  --color-accent-subtle: var(--accent-subtle);
  --color-accent-border: var(--accent-border);

  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-danger: var(--danger);
  --color-info: var(--info);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Container */
  --container-page: 1200px;
  --container-reading: 680px;
}

@layer base {
  body {
    background-color: var(--color-bg);
    color: var(--color-fg);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: var(--accent-subtle);
    color: var(--fg);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}
```

---

## Two-Layer Mapping

`globals.css` defines two layers. This is what lets shadcn primitives inherit the design with zero per-component edits.

1. **The Kestrel palette** — `--bg`, `--fg`, `--accent`, and the rest. The vocabulary this template is written in, and the only layer a buyer touches.
2. **The shadcn semantic layer** — `--primary`, `--muted`, `--ring`, `--destructive`, and friends, each pointing at a Kestrel token.

```css
--primary: var(--accent);            /* violet buttons, no button.tsx edits */
--primary-foreground: var(--accent-contrast);
--muted: var(--surface-raised);      /* ghost and outline hover surfaces */
--ring: var(--accent);               /* focus rings */
--destructive: var(--danger);
```

**The one trap:** shadcn uses `--accent` to mean *a neutral hover surface*. Kestrel uses `--accent` to mean *the violet brand color*. Kestrel's meaning wins, because it is the buyer-facing knob. The currently added components (`button`) use `bg-muted` for hovers and are unaffected — but any future shadcn component that uses `bg-accent` expecting neutral grey will render violet. Retokenize it to `bg-surface-raised` when adding it.

---

## Color Usage Guide

### Layout

| Element | Token |
| ------- | ----- |
| Page background | `bg-bg` |
| Alternating section background | `bg-bg-subtle` |
| Card, panel | `bg-surface` |
| Raised element inside a card | `bg-surface-raised` |
| Default border, divider | `border-border` |
| Emphasized border, hover border | `border-border-strong` |

### Typography

| Role | Token |
| ---- | ----- |
| Headings, primary body | `text-fg` |
| Supporting copy, descriptions | `text-fg-secondary` |
| Labels, captions, timestamps, placeholders | `text-fg-muted` |

### Accent

Reserved for: primary buttons, active nav, links, focus rings, the highlighted pricing tier, chart series 1, and hero glow. Never as a large background fill.

| Use | Token |
| --- | ----- |
| Primary button background | `bg-accent` |
| Primary button text | `text-accent-contrast` |
| Accent-coloured **text** — eyebrows, badges, links, checks | `text-accent-text` |
| Button hover | `bg-accent-hover` |
| Tinted badge or highlight background | `bg-accent-subtle` |

**`--accent` fills, `--accent-text` writes.** They are the same colour in light mode and different in dark, because one value cannot do both jobs: white on `--accent` is 4.56:1, and lightening the fill enough for accent text to clear AA on `--surface-raised` would drop the button below it. Never use `text-accent` — the utility exists but fails AA in dark at 3.95:1 on a raised surface.

Every colour pair in this file was measured in feature 20. The full text palette clears WCAG AA on all four surfaces in both themes: `--fg-secondary` from 6.9:1, `--fg-muted` from 4.6:1, `--accent-text` from 5.8:1, and the status colours from 5.1:1.
| Accent-tinted border | `border-accent-border` |

### Semantic

Used only inside the dashboard mockup and form states. Never in marketing copy.

| Meaning | Token |
| ------- | ----- |
| Positive delta, success message | `text-success` |
| Caution metric | `text-warning` |
| Negative delta, field error | `text-danger` |
| Neutral info | `text-info` |

### Charts

| Series | Token |
| ------ | ----- |
| Primary metric | `text-chart-1` |
| Secondary metric | `text-chart-2` |
| Tertiary | `text-chart-3` |
| Quaternary | `text-chart-4` |

Charts are inline SVG using `currentColor` on a parent with the chart token applied. This is what makes them retheme automatically when the buyer changes the accent.

---

## Typography

Geist Sans throughout. Geist Mono for code, version tags, and metric readouts in the mockup.

| Role | Size | Line height | Weight | Tracking | Color |
| ---- | ---- | ----------- | ------ | -------- | ----- |
| 404 numeral | 120px | 1 | 600 | -0.04em | `text-fg-muted` |
| Hero display | 64px | 1.05 | 600 | -0.035em | `text-fg` |
| Page h1 | 48px | 1.10 | 600 | -0.03em | `text-fg` |
| Section h2 | 36px | 1.15 | 600 | -0.025em | `text-fg` |
| Card h3 | 24px | 1.30 | 600 | -0.02em | `text-fg` |
| Small heading h4 | 18px | 1.40 | 600 | -0.01em | `text-fg` |
| Lead paragraph | 18px | 1.60 | 400 | 0 | `text-fg-secondary` |
| Body | 16px | 1.65 | 400 | 0 | `text-fg-secondary` |
| Small | 14px | 1.55 | 400 | 0 | `text-fg-secondary` |
| Caption, label | 13px | 1.50 | 500 | 0 | `text-fg-muted` |
| Eyebrow | 13px | 1.50 | 500 | 0.08em uppercase | `text-accent-text` |
| Mono | 13px | 1.50 | 400 | 0 | `text-fg-secondary` |

Mobile scaling: hero display drops to 40px, h1 to 34px, h2 to 28px, the 404 numeral to 88px. Nothing else changes.

The 404 numeral is the one step above the hero display, and the only one set in `text-fg-muted`. It exists so the number reads as a backdrop to the headline rather than competing with it — at hero-display size and full contrast it becomes the message, which it is not.

Tight negative tracking on large text is the defining characteristic of this design direction. Never set a heading with default tracking.

---

## Spacing

4px base. Only these steps are used.

| Token | Value | Used for |
| ----- | ----- | -------- |
| `gap-1` | 4px | Icon to label |
| `gap-2` | 8px | Inside badges, tight stacks |
| `gap-3` | 12px | Form field internals |
| `gap-4` | 16px | Card internal spacing |
| `gap-6` | 24px | Between cards in a grid |
| `gap-8` | 32px | Between subsections |
| `gap-12` | 48px | Section header to section content |
| `gap-16` | 64px | Major blocks within a section |

| Context | Value |
| ------- | ----- |
| Section vertical padding, desktop | 128px |
| Section vertical padding, tablet | 96px |
| Section vertical padding, mobile | 64px |
| Container max width | 1200px |
| Container horizontal padding | 24px |
| Prose max width (blog body) | 680px |
| Card padding | 24px |
| Large card padding | 32px |

---

## Component Tokens

### Card

```
background: bg-surface
border: 1px solid var(--border)
border-radius: var(--radius-lg)      /* 12px */
padding: 24px
```

Hover, only when interactive: `border-border-strong`, 150ms ease.

### Buttons

**Primary**

```
background: bg-accent
color: text-accent-contrast
border-radius: var(--radius-md)      /* 8px */
padding: 10px 18px
font-size: 14px
font-weight: 500
hover: bg-accent-hover
```

**Secondary**

```
background: bg-surface
border: 1px solid var(--border-strong)
color: text-fg
border-radius: var(--radius-md)
padding: 10px 18px
hover: border-color var(--accent-border)
```

**Ghost**

```
background: transparent
color: text-fg-secondary
padding: 10px 14px
hover: color text-fg, background bg-surface-raised
```

Large variants (hero) use `padding: 14px 26px` and `font-size: 15px`.

### Input

```
background: bg-surface-raised
border: 1px solid var(--border)
border-radius: var(--radius-md)
padding: 10px 14px
font-size: 14px
color: text-fg
placeholder: text-fg-muted
focus: border-color var(--accent), ring 3px var(--accent-subtle)
error: border-color var(--danger)
```

### Badge

```
border-radius: var(--radius-full)
padding: 4px 10px
font-size: 12px
font-weight: 500
background: bg-accent-subtle
color: text-accent-text
border: 1px solid var(--accent-border)
```

### Section background grid

The faint grid behind hero and CTA bands.

```
background-image:
  linear-gradient(var(--grid-line) 1px, transparent 1px),
  linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
background-size: 64px 64px;
mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
```

### Hero glow

A single radial accent glow behind the dashboard mockup.

```
background: radial-gradient(ellipse 60% 50% at 50% 0%, var(--accent-subtle), transparent 70%);
box-shadow: var(--shadow-glow);
```

Exactly one glow per page. More than one cheapens the design.

---

## Invariants

- Never write a hex, rgb, hsl, or oklch value in a component. Every color comes from a token.
- Never use a Tailwind default color class. `bg-slate-900`, `text-gray-400`, and all equivalents are forbidden.
- `--accent` is the only brand color. There is no second brand hue.
- Both `:root` and `.dark` define the identical set of variable names. Adding one to a theme without the other is a bug.
- Semantic colors appear only in the dashboard mockup and form states, never in marketing sections.
- Every heading sets explicit negative tracking per the type table.
- Charts use `currentColor` driven by a chart token — never a literal color attribute in the SVG.
- Only the spacing steps listed above are used. No arbitrary values like `mt-[37px]`.
