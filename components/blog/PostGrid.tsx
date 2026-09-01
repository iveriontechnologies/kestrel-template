"use client";

// Blog index — tag filtering and the post grid.

import { useMemo, useState } from "react";

import { PostCard } from "@/components/blog/PostCard";
import { TagFilter } from "@/components/blog/TagFilter";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import type { Post } from "@/types";

type Props = {
  posts: Post[];
};

export function PostGrid({ posts }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(
    () => [...new Set(posts.flatMap((post) => post.tags))].sort(),
    [posts],
  );

  const visible = useMemo(
    () =>
      activeTag === null
        ? posts
        : posts.filter((post) => post.tags.includes(activeTag)),
    [posts, activeTag],
  );

  // Nothing to filter and nothing to show. A buyer who deletes the sample
  // content must not land on a page that looks broken.
  if (posts.length === 0) {
    return (
      <p className="mt-12 text-center text-[15px] text-fg-muted">
        No posts yet.
      </p>
    );
  }

  return (
    <>
      <Reveal>
        <TagFilter tags={tags} active={activeTag} onChange={setActiveTag} />
      </Reveal>

      {/* Unreachable while the pills are derived from the posts themselves —
          every tag on screen has at least one post behind it. Kept because the
          moment a buyer swaps in a curated tag list, or filters drafts out of
          one tag entirely, it becomes the difference between an explanation and
          a blank page. */}
      {visible.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-[15px] text-fg-muted">
            No posts tagged {activeTag}.
          </p>
          <Button variant="ghost" onClick={() => setActiveTag(null)}>
            Show all posts
          </Button>
        </div>
      ) : (
        <Reveal
          // Keyed on the filter so a new selection replays the reveal rather
          // than snapping the replacement cards into place.
          key={activeTag ?? "all"}
          stagger
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Reveal>
      )}
    </>
  );
}
