import { buildLinePath, type MockPoint } from "@/lib/mock-dashboard";

type Props = {
  points: MockPoint[];
};

const WIDTH = 640;
const HEIGHT = 176;
const GRID_LINES = 4;

/**
 * Hand-written SVG. No chart library — see code-standards.md.
 *
 * Everything paints with currentColor so the chart inherits whichever chart
 * token the parent sets, which is what lets a buyer change --accent and have
 * the chart follow.
 */
export function MockLineChart({ points }: Props) {
  const { line, area, coords } = buildLinePath(points, WIDTH, HEIGHT);
  const last = coords[coords.length - 1];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className="h-[176px] w-full text-chart-1"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mock-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {Array.from({ length: GRID_LINES }).map((_, i) => {
        const y = (HEIGHT / GRID_LINES) * (i + 1) - HEIGHT / GRID_LINES / 2;
        return (
          <line
            key={i}
            x1="0"
            x2={WIDTH}
            y1={y}
            y2={y}
            className="stroke-border"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      <path d={area} fill="url(#mock-area)" />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Endpoint marker. The halo is the surface color so it reads as a
          cutout against the line rather than a floating dot. */}
      <circle
        cx={last.x}
        cy={last.y}
        r="4"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
