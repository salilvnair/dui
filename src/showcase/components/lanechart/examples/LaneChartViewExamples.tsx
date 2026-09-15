import { LaneChartView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const t0 = 0;
const wave = (n: number, base: number, amp: number, phase: number) =>
  Array.from({ length: n }, (_, i) => ({
    at: t0 + i * 1000,
    value: base + Math.sin(i / 4 + phase) * amp + (i % 5) * (amp / 8),
  }));

export function LaneChartViewExamples() {
  return (
    <>
      <ExampleCard
        title="Several series, stacked in lanes"
        description="Each gets its own lane and its own scale, so a slow-moving line is not flattened by a fast one"
        code={'<LaneChartView series={series} />'}
      >
        <div style={{ width: '100%' }}>
          <LaneChartView
            series={[
              { id: 'cpu', label: 'CPU', points: wave(40, 40, 22, 0), color: 'var(--color-primary)', filled: true, readout: '48%' },
              { id: 'mem', label: 'Heap', points: wave(40, 60, 10, 2), color: 'var(--color-info)', readout: '612 MB' },
              { id: 'rps', label: 'Requests', points: wave(40, 120, 60, 1), color: 'var(--color-success)', filled: true, readout: '138/s' },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Markers across every lane"
        description="A deploy, a GC, a restart — drawn through the whole stack so you can line up cause and effect"
        code={'markers={[{ at: 18000, label: "deploy", color: "var(--color-warning)" }]}'}
      >
        <div style={{ width: '100%' }}>
          <LaneChartView
            laneHeight={44}
            series={[
              { id: 'cpu', label: 'CPU', points: wave(40, 40, 22, 0), color: 'var(--color-primary)', filled: true },
              { id: 'err', label: 'Errors', points: wave(40, 4, 4, 3), color: 'var(--color-error)', filled: true },
            ]}
            markers={[
              { at: 12000, label: 'deploy', color: 'var(--color-warning)' },
              { at: 28000, label: 'GC', color: 'var(--color-info)' },
            ]}
          />
        </div>
      </ExampleCard>
    </>
  );
}
