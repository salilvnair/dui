import { SwimlaneChartView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const COLORS = {
  running: 'var(--color-success)',
  waiting: 'var(--color-warning)',
  blocked: 'var(--color-error)',
  parked: 'var(--color-text-muted)',
};

const ROWS = [
  {
    id: 'http-1', label: 'http-nio-8080-1',
    segments: [
      { from: 0, to: 1200, state: 'running' },
      { from: 1200, to: 2600, state: 'waiting' },
      { from: 2600, to: 5000, state: 'running' },
    ],
  },
  {
    id: 'http-2', label: 'http-nio-8080-2',
    segments: [
      { from: 0, to: 800, state: 'waiting' },
      { from: 800, to: 3400, state: 'blocked' },
      { from: 3400, to: 5000, state: 'running' },
    ],
  },
  {
    id: 'scheduler', label: 'scheduling-1',
    segments: [
      { from: 0, to: 2200, state: 'parked' },
      { from: 2200, to: 2500, state: 'running' },
      { from: 2500, to: 5000, state: 'parked' },
    ],
  },
];

export function SwimlaneChartViewExamples() {
  return (
    <>
      <ExampleCard
        title="What each thread was doing"
        description="One lane per row, each stretch coloured by its state"
        code={'<SwimlaneChartView rows={rows} colors={colors} />'}
      >
        <div style={{ width: '100%' }}>
          <SwimlaneChartView rows={ROWS} colors={COLORS} format={s => (s.to - s.from) + 'ms'} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Markers and a wider gutter"
        description="A vertical mark across every lane, for the moment a dump was taken"
        code={'markers={[{ at: 2600, label: "dump", color: "var(--color-info)" }]}'}
      >
        <div style={{ width: '100%' }}>
          <SwimlaneChartView
            rows={ROWS}
            colors={COLORS}
            labelWidth={150}
            rowHeight={26}
            markers={[{ at: 2600, label: 'dump taken', color: 'var(--color-info)' }]}
            format={s => (s.to - s.from) + 'ms'}
          />
        </div>
      </ExampleCard>
    </>
  );
}
