import { useMemo } from 'react';
import { HeatmapCalendarView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function genData(days: number, seedFn: (i: number) => number, endIso = '2026-07-03') {
  const end = new Date(endIso);
  const out: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    out.push({ date: d.toISOString().slice(0, 10), count: seedFn(i) });
  }
  return out;
}

export function HeatmapCalendarViewExamples() {
  const basic = [{ date: '2026-07-01', count: 4 }, { date: '2026-07-02', count: 1 }, { date: '2026-07-03', count: 9 }];

  const requestActivity = useMemo(
    () => genData(84, i => Math.max(0, Math.round(Math.sin(i / 4) * 6 + (i % 7 === 0 ? 10 : 3)))),
    []
  );

  const testRunActivity = useMemo(
    () => genData(56, i => (i % 11 === 0 ? 0 : Math.round(Math.random() * 8))),
    []
  );

  return (
    <div>
      <ExampleCard
        title="Default Heatmap"
        description="Day cells shaded by count, hover to see the tooltip"
        code={`<HeatmapCalendarView data={[{ date: '2026-07-01', count: 4 }, { date: '2026-07-02', count: 1 }]} />`}
      >
        <HeatmapCalendarView data={basic} />
      </ExampleCard>

      <ExampleCard
        title="API Request Volume (domain use case)"
        description="Twelve weeks of request activity for a workspace — darker cells mean busier days"
        code={`<HeatmapCalendarView data={requestActivity} color="var(--color-info)" />`}
      >
        <HeatmapCalendarView data={requestActivity} color="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="Larger Cells"
        description="Increase cellSize for a more prominent, less dense grid"
        code={`<HeatmapCalendarView data={testRunActivity} cellSize={16} color="var(--color-warning)" />`}
      >
        <HeatmapCalendarView data={testRunActivity} cellSize={16} color="var(--color-warning)" />
      </ExampleCard>

      <ExampleCard
        title="Custom Color"
        description="Theme the intensity color to match a status meaning, e.g. errors logged per day"
        code={`<HeatmapCalendarView data={testRunActivity} color="var(--color-error)" />`}
      >
        <HeatmapCalendarView data={testRunActivity} color="var(--color-error)" />
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="No data — renders an empty grid with no weeks; pair with a fallback message"
        code={`<HeatmapCalendarView data={[]} />
{data.length === 0 && <p>No activity recorded in this range.</p>}`}
      >
        <HeatmapCalendarView data={[]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No activity recorded in this range.</div>
      </ExampleCard>
    </div>
  );
}
