/**
 * Static data for the marketing dashboard mockup.
 *
 * Every number and label rendered inside the mockup comes from here — none are
 * inline in JSX. Charts compute their geometry from these arrays, so editing a
 * value redraws the chart rather than leaving a hardcoded path behind.
 *
 * This is illustrative marketing content. There is no analytics product.
 */

export type MockStat = {
  label: string;
  value: string;
  /** Percent change. Sign drives the arrow direction and color. */
  delta: number;
};

export type MockPoint = {
  label: string;
  value: number;
};

export type MockFeatureRow = {
  feature: string;
  users: string;
  /** Adoption as a percentage, 0–100. Drives the inline bar width. */
  adoption: number;
};

export type MockNavItem = {
  label: string;
  icon:
    | "dashboard"
    | "users"
    | "funnel"
    | "retention"
    | "replay"
    | "alerts"
    | "settings";
  active?: boolean;
};

export const mockNav: MockNavItem[] = [
  { label: "Overview", icon: "dashboard", active: true },
  { label: "Users", icon: "users" },
  { label: "Funnels", icon: "funnel" },
  { label: "Retention", icon: "retention" },
  { label: "Replays", icon: "replay" },
  { label: "Alerts", icon: "alerts" },
];

export const mockStats: MockStat[] = [
  { label: "Active users", value: "24,318", delta: 12.4 },
  { label: "Activation rate", value: "68.2%", delta: 4.1 },
  { label: "Weekly retention", value: "41.9%", delta: -2.3 },
  { label: "Events captured", value: "1.24M", delta: 18.7 },
];

/** Active users over 14 days. Drives the line chart. */
export const mockUsersSeries: MockPoint[] = [
  { label: "1", value: 14200 },
  { label: "2", value: 15100 },
  { label: "3", value: 14800 },
  { label: "4", value: 16400 },
  { label: "5", value: 17900 },
  { label: "6", value: 17200 },
  { label: "7", value: 18600 },
  { label: "8", value: 19800 },
  { label: "9", value: 19100 },
  { label: "10", value: 20900 },
  { label: "11", value: 22400 },
  { label: "12", value: 21800 },
  { label: "13", value: 23600 },
  { label: "14", value: 24318 },
];

/** Events per weekday. Drives the bar chart. */
export const mockEventsByDay: MockPoint[] = [
  { label: "M", value: 182 },
  { label: "T", value: 214 },
  { label: "W", value: 236 },
  { label: "T", value: 198 },
  { label: "F", value: 246 },
  { label: "S", value: 121 },
  { label: "S", value: 96 },
];

export const mockTopFeatures: MockFeatureRow[] = [
  { feature: "Funnel builder", users: "8,412", adoption: 82 },
  { feature: "Session replay", users: "6,190", adoption: 64 },
  { feature: "Retention grid", users: "4,733", adoption: 51 },
  { feature: "Slack alerts", users: "3,208", adoption: 37 },
  { feature: "Warehouse sync", users: "1,624", adoption: 19 },
];

export const mockMeta = {
  workspace: "Loomstack",
  plan: "Growth",
  user: { name: "Priya R.", initials: "PR" },
  chartTitle: "Active users",
  chartRange: "Last 14 days",
  barTitle: "Events by day",
  tableTitle: "Top features",
} as const;

/* ---------- Chart geometry ---------- */

/**
 * Maps values onto an SVG viewBox and returns a smoothed path.
 *
 * Smoothing uses horizontal control points at the midpoint between neighbours,
 * which cannot overshoot the way a Catmull-Rom spline can — a chart that dips
 * below its own minimum reads as a bug in a marketing screenshot.
 */
export function buildLinePath(
  points: MockPoint[],
  width: number,
  height: number,
  padY = 8,
): { line: string; area: string; coords: { x: number; y: number }[] } {
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const usable = height - padY * 2;

  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * width,
    y: padY + (1 - (p.value - min) / span) * usable,
  }));

  let line = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const midX = (prev.x + curr.x) / 2;
    line += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  return { line, area, coords };
}
