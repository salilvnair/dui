import { useState, useMemo, type CSSProperties } from 'react';

export interface HeatmapDay {
  date: string;
  count: number;
}

export interface HeatmapCalendarViewProps {
  data: HeatmapDay[];
  color?: string;
  cellSize?: number;
  className?: string;
  style?: CSSProperties;
}

/** GitHub-style contribution heatmap — day cells shaded by count, tooltip on hover. */
export function HeatmapCalendarView({
  data,
  color,
  cellSize = 11,
  className = '',
  style,
}: HeatmapCalendarViewProps) {
  const accent = color ?? 'var(--color-success)';
  const [hover, setHover] = useState<HeatmapDay | null>(null);
  const maxCount = Math.max(1, ...data.map(d => d.count));

  const weeks = useMemo(() => {
    const byDate = new Map(data.map(d => [d.date, d]));
    if (data.length === 0) return [];
    const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
    const start = new Date(sorted[0].date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(sorted[sorted.length - 1].date);
    const cols: HeatmapDay[][] = [];
    let cur = new Date(start);
    while (cur <= end) {
      const col: HeatmapDay[] = [];
      for (let i = 0; i < 7; i++) {
        const iso = cur.toISOString().slice(0, 10);
        col.push(byDate.get(iso) ?? { date: iso, count: 0 });
        cur.setDate(cur.getDate() + 1);
      }
      cols.push(col);
    }
    return cols;
  }, [data]);

  const opacityFor = (count: number) => count === 0 ? 0.08 : 0.25 + Math.min(1, count / maxCount) * 0.75;

  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <div style={{ display: 'flex', gap: 3 }}>
        {weeks.map((col, ci) => (
          <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {col.map(day => (
              <div
                key={day.date}
                onMouseEnter={() => setHover(day)}
                onMouseLeave={() => setHover(null)}
                style={{ width: cellSize, height: cellSize, borderRadius: 2, background: accent, opacity: opacityFor(day.count), cursor: 'pointer' }}
              />
            ))}
          </div>
        ))}
      </div>
      {hover && (
        <div style={{ position: 'absolute', bottom: '100%', left: 0, marginBottom: 4, padding: '4px 8px', borderRadius: 5, background: 'var(--color-elevated, #1f2430)', color: '#fff', fontSize: 10, whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 10 }}>
          {hover.count} on {hover.date}
        </div>
      )}
    </div>
  );
}
