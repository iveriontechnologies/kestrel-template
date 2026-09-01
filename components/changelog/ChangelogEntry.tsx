// Changelog — one release.

import { MdxContent } from "@/components/blog/MdxContent";
import { formatPostDate } from "@/lib/utils";
import type { ChangelogEntry as Entry } from "@/types";

type Props = {
  entry: Entry;
};

export function ChangelogEntry({ entry }: Props) {
  return (
    // The rule lives on each item and is cleared on the last, so it runs from
    // the first marker to the last rather than trailing off past the end.
    <li className="relative border-l border-border pb-14 pl-8 last:border-transparent last:pb-0">
      <span
        aria-hidden="true"
        className="absolute -left-[4px] top-2 h-[7px] w-[7px] rounded-full bg-border-strong ring-4 ring-bg"
      />

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-border bg-surface-raised px-2.5 py-1 font-mono text-[12px] text-fg">
          {entry.version}
        </span>
        <time
          dateTime={entry.date}
          className="text-[13px] font-medium text-fg-muted"
        >
          {formatPostDate(entry.date)}
        </time>
      </div>

      <h2 className="mt-4 text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-fg">
        {entry.title}
      </h2>

      {/* The MDX map opens every element with a top margin, which is right in a
          post body and wrong directly under a title. */}
      <div className="[&>*:first-child]:mt-4">
        <MdxContent source={entry.content} />
      </div>
    </li>
  );
}
