# AGENTS.md

**Kestrel** is a premium Next.js landing page template sold as a product on Gumroad and Creative Market. It is themed as the marketing site for a fictional B2B product-analytics SaaS called Kestrel.

The customer is the **buyer of the template**, not an end user of an analytics product. Every decision optimizes for: does this look worth paying for, and can a buyer rebrand it without opening a component file.

---

## Read Before Any Work

Read these in order before writing code. Do not start a feature without them.

| File | Answers |
| ---- | ------- |
| `context/project-overview.md` | What this is, who buys it, what is in and out of scope |
| `context/architecture.md` | Stack, folder structure, content pipeline, invariants |
| `context/code-standards.md` | Language rules, file naming, component patterns |
| `context/ui-tokens.md` | Every color, type, spacing, and radius value |
| `context/ui-rules.md` | How to compose those tokens into sections |
| `context/ui-registry.md` | Components already built — match them before inventing |
| `context/library-docs.md` | How this project uses each dependency |
| `context/build-plan.md` | The numbered feature you are building right now |
| `context/progress-tracker.md` | What is done, what is next |

---

## Working Rules

- Build exactly one numbered feature from `build-plan.md` at a time. Complete it before starting the next.
- Update `context/progress-tracker.md` after every completed feature — check the box, set `Last completed` and `Next`.
- Update `context/ui-registry.md` after building any new component — name, path, and the exact classes used.
- Read `context/ui-registry.md` before building any component. Match an existing pattern before inventing a new one.
- Never exceed the current feature's scope, even when an adjacent improvement looks obvious. Note it in `progress-tracker.md` under Notes instead.

---

## Tooling Available

Prefer live sources over training knowledge. Library APIs drift.

| Tool | Use for |
| ---- | ------- |
| 21st.dev MCP (`mcp__21st__*`) | Searching component patterns and inspiration. `search` is free; `get_component` is metered. |
| Playwright MCC (`mcp__playwright__*`) | Visual verification of built sections in both light and dark modes |
| Vercel MCP | Demo deployment (feature 23) |

Authority order for any library question:

```
MCP server (live docs) → installed skills → context/library-docs.md → training knowledge
```

Never write a code sample for a library API you have not verified this session.

---

## Definition of Done

A feature is done when all of these hold:

1. It renders correctly in **both light and dark mode**
2. It holds up from **320px to 1920px** with no horizontal scroll and no overlap
3. It uses **only tokens** from `ui-tokens.md` — no raw hex, no Tailwind default color classes
4. All copy comes from `site.config.ts`, not hardcoded in JSX
5. `progress-tracker.md` and `ui-registry.md` are updated

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
