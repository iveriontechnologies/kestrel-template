import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MockStat } from "@/lib/mock-dashboard";

export function MockStatCard({ label, value, delta }: MockStat) {
  const positive = delta >= 0;
  const Arrow = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-lg border border-border bg-surface-raised p-3">
      <p className="text-[11px] leading-none text-fg-muted">{label}</p>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <span className="text-[18px] font-semibold leading-none tracking-[-0.02em] text-fg">
          {value}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 text-[11px] font-medium leading-none",
            positive ? "text-success" : "text-danger",
          )}
        >
          <Arrow className="h-3 w-3" aria-hidden="true" />
          {Math.abs(delta)}%
        </span>
      </div>
    </div>
  );
}
