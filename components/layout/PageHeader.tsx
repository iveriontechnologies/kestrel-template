import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  heading: string;
  lead?: string;
  align?: "center" | "left";
};

/**
 * The opening block of a secondary page. Structurally identical to
 * `SectionHeader`, but the heading is the page's `h1` and sets the larger
 * page-title type step — a page needs exactly one of these, and a section
 * heading must never be promoted to fill the role.
 */
export function PageHeader({
  eyebrow,
  heading,
  lead,
  align = "center",
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
      )}
    >
      {eyebrow ? (
        <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-accent-text">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="text-[34px] md:text-[48px] leading-[1.1] font-semibold tracking-[-0.03em] text-fg text-balance">
        {heading}
      </h1>
      {lead ? (
        <p
          className={cn(
            // text-pretty, not text-balance: a page lead runs long enough that
            // balancing squares it off, while pretty only prevents the orphan.
            "mt-1 max-w-[560px] text-[18px] leading-[1.6] text-fg-secondary text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
