import type { MetadataRoute } from "next";

import { getAllChangelogEntries, getAllPosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/** Routes that exist regardless of content. */
const STATIC_ROUTES = [
  { path: "/", priority: 1 },
  { path: "/pricing", priority: 0.8 },
  { path: "/blog", priority: 0.7 },
  { path: "/changelog", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const entries = getAllChangelogEntries();

  // The changelog has no per-entry route — entries render inline on /changelog.
  // Its newest entry date is therefore the lastModified for that one page.
  const changelogUpdated = entries[0]?.date;

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: route.path === "/changelog" ? changelogUpdated : undefined,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.date,
      priority: 0.6,
    })),
  ];
}
