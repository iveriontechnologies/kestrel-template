// Forms — label, control, and inline error. Shared by both forms so they
// cannot drift apart.

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The control styling itself, applied to the `input` or `textarea`. Exported
 * rather than wrapped in a component because the two forms need different
 * elements and different props, and only the surface has to match.
 *
 * Values are the input spec in `ui-tokens.md`. The focus ring replaces the
 * global focus outline, which is why `outline-none` is safe here.
 */
export const CONTROL = cn(
  // min-h rather than h: the textarea grows past it, and 44px is both the
  // touch-target minimum and the height of the buttons these sit beside.
  "w-full min-h-11 rounded-md border border-border bg-surface-raised px-3.5 py-2.5",
  "text-[14px] text-fg placeholder:text-fg-muted",
  "transition-colors duration-150",
  "focus:border-accent focus:ring-[3px] focus:ring-accent-subtle focus:outline-none",
  "aria-[invalid=true]:border-danger",
  "disabled:opacity-50",
);

type Props = {
  /** Matches the control's `id`, which is what ties the two together. */
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export function Field({ id, label, error, children }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-fg-muted">
        {label}
      </label>

      {children}

      {/* Reserved by the error's own presence rather than a fixed height: a
          form is not a pricing card, and a field growing by one line when it
          fails is the feedback, not a layout defect. */}
      {error ? (
        <p id={`${id}-error`} className="text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
