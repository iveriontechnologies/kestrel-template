import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

import type { ChangelogEntry, Post } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const CHANGELOG_DIR = path.join(process.cwd(), "content/changelog");

/** Slugs come from filenames, so this also keeps `getPostBySlug` off the disk. */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Fields every content type shares. Each schema extends it. */
const baseFrontmatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD"),
  draft: z.boolean().default(false),
});

const postFrontmatter = baseFrontmatter.extend({
  tags: z.array(z.string()).default([]),
});

const changelogFrontmatter = baseFrontmatter.extend({
  version: z.string().min(1),
});

type Frontmatter = z.ZodType<{ draft: boolean; date: string }>;

/**
 * Reads and validates one file.
 *
 * Invalid frontmatter fails the build rather than skipping the file. A buyer
 * with a typo must be told which file and which field, not left wondering why
 * their post vanished.
 */
function readEntry<Schema extends Frontmatter>(
  dir: string,
  file: string,
  schema: Schema,
): z.infer<Schema> & { slug: string; content: string } {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("; ");
    throw new Error(`[content] Invalid frontmatter in ${file} — ${issues}`);
  }

  return {
    ...parsed.data,
    slug: file.replace(/\.mdx$/, ""),
    content,
  };
}

/** Drafts are visible in development and excluded from production builds. */
function isVisible(entry: { draft: boolean }): boolean {
  return !entry.draft || process.env.NODE_ENV === "development";
}

function newestFirst(a: { date: string }, b: { date: string }): number {
  return b.date.localeCompare(a.date);
}

function listMdx(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(): Post[] {
  return listMdx(BLOG_DIR)
    .map((file) => readEntry(BLOG_DIR, file, postFrontmatter))
    .filter(isVisible)
    .sort(newestFirst);
}

export function getPostBySlug(slug: string): Post | null {
  if (!SLUG_PATTERN.test(slug)) return null;

  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(BLOG_DIR, file))) return null;

  const post = readEntry(BLOG_DIR, file, postFrontmatter);
  return isVisible(post) ? post : null;
}

export function getAllChangelogEntries(): ChangelogEntry[] {
  return listMdx(CHANGELOG_DIR)
    .map((file) => readEntry(CHANGELOG_DIR, file, changelogFrontmatter))
    .filter(isVisible)
    .sort(newestFirst);
}
