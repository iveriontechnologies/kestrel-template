// Blog index — tag filter row.

import { cn } from "@/lib/utils";

type Props = {
  tags: string[];
  /** `null` means no filter, rendered as the "All" pill. */
  active: string | null;
  onChange: (tag: string | null) => void;
};

// 44px through tablet, 36px only on desktop. Tablets are touch devices, so
// dropping to the compact height at the md breakpoint would put the pills under
// the minimum target size on exactly the devices that need it.
const PILL =
  "inline-flex h-11 items-center rounded-full border px-4 text-[14px] font-medium transition-colors duration-150 lg:h-9";

export function TagFilter({ tags, active, onChange }: Props) {
  const options: (string | null)[] = [null, ...tags];

  return (
    // A group rather than a list: these are controls, and a screen reader
    // announcing "list, four items" before them is noise.
    <div
      role="group"
      aria-label="Filter posts by tag"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {options.map((tag) => {
        const isActive = tag === active;

        return (
          <button
            key={tag ?? "all"}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tag)}
            className={cn(
              PILL,
              isActive
                ? "border-accent-border bg-accent-subtle text-accent-text"
                : "border-border text-fg-secondary hover:border-border-strong hover:text-fg",
            )}
          >
            {tag ?? "All"}
          </button>
        );
      })}
    </div>
  );
}
