// Blog index — one post card.

import Link from "next/link";

import { formatPostDate, readingTime } from "@/lib/utils";
import type { Post } from "@/types";

type Props = {
  post: Post;
};

export function PostCard({ post }: Props) {
  const minutes = readingTime(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      // The whole card is the link. A "Read more" affordance under a title that
      // is already a link gives keyboard users two stops for one destination.
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-150 hover:border-border-strong"
    >
      {post.tags[0] ? (
        <span className="self-start rounded-full border border-accent-border bg-accent-subtle px-2.5 py-1 text-[12px] font-medium text-accent-text">
          {post.tags[0]}
        </span>
      ) : null}

      <h2 className="mt-4 text-[18px] font-semibold leading-[1.4] tracking-[-0.01em] text-fg">
        {post.title}
      </h2>

      <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-fg-secondary">
        {post.description}
      </p>

      <div className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-[13px] font-medium text-fg-muted">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{minutes} min read</span>
      </div>
    </Link>
  );
}
