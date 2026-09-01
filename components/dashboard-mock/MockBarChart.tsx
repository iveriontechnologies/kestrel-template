import type { MockPoint } from "@/lib/mock-dashboard";

type Props = {
  points: MockPoint[];
};

/**
 * Seven bars, heights derived from the data. Uses flex rather than SVG because
 * a bar chart is just proportional rectangles — SVG would add nothing here and
 * this keeps the labels selectable text at the real font size.
 */
export function MockBarChart({ points }: Props) {
  const max = Math.max(...points.map((p) => p.value)) || 1;

  return (
    <div className="flex h-[104px] gap-2" aria-hidden="true">
      {points.map((point, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-sm bg-chart-2"
              style={{ height: `${Math.max((point.value / max) * 100, 6)}%` }}
            />
          </div>
          <span className="text-[10px] leading-none text-fg-muted">
            {point.label}
          </span>
        </div>
      ))}
    </div>
  );
}
