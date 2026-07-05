import { useState, useEffect } from 'react';
import { SegmentedProgressBarView, type ProgressSegment, type SegmentStatus } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SegmentedProgressBarViewExamples() {
  const [segments, setSegments] = useState<ProgressSegment[]>([
    { label: 'Upload', status: 'done' },
    { label: 'Scan', status: 'active' },
    { label: 'Deploy', status: 'pending' },
  ]);

  useEffect(() => {
    const order: SegmentStatus[] = ['pending', 'active', 'done'];
    const timer = setInterval(() => {
      setSegments(prev => {
        const activeIdx = prev.findIndex(s => s.status === 'active');
        if (activeIdx === -1) return prev;
        const next = [...prev];
        next[activeIdx] = { ...next[activeIdx], status: 'done' };
        if (activeIdx + 1 < next.length) next[activeIdx + 1] = { ...next[activeIdx + 1], status: 'active' };
        return next;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <ExampleCard
        title="Basic Pipeline Progress"
        description="Each segment independently colored by its status"
        code={`<SegmentedProgressBarView
  segments={[
    { label: 'Upload', status: 'done' },
    { label: 'Scan', status: 'active' },
  ]}
/>`}
      >
        <SegmentedProgressBarView segments={[{ label: 'Upload', status: 'done' }, { label: 'Scan', status: 'active' }]} />
      </ExampleCard>

      <ExampleCard
        title="Auto-Advancing Deploy Pipeline (interactive)"
        description="Segments automatically progress from pending → active → done every ~1.8s"
        code={`const [segments, setSegments] = useState([
  { label: 'Upload', status: 'done' },
  { label: 'Scan', status: 'active' },
  { label: 'Deploy', status: 'pending' },
]);
// interval advances the active segment to 'done' and starts the next one`}
      >
        <SegmentedProgressBarView segments={segments} />
      </ExampleCard>

      <ExampleCard
        title="Failed Step"
        description="An error status halts the pipeline visually with the error color"
        code={`<SegmentedProgressBarView
  segments={[
    { label: 'Build', status: 'done' },
    { label: 'Test', status: 'error' },
    { label: 'Deploy', status: 'pending' },
  ]}
/>`}
      >
        <SegmentedProgressBarView
          segments={[
            { label: 'Build', status: 'done' },
            { label: 'Test', status: 'error' },
            { label: 'Deploy', status: 'pending' },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Webhook Delivery Retry Chain"
        description="Domain-realistic use — visualizing retry attempts of a webhook delivery"
        code={`<SegmentedProgressBarView
  segments={[
    { label: 'Attempt 1', status: 'error' },
    { label: 'Attempt 2', status: 'error' },
    { label: 'Attempt 3', status: 'done' },
  ]}
  color="var(--color-info)"
/>`}
      >
        <SegmentedProgressBarView
          segments={[
            { label: 'Attempt 1', status: 'error' },
            { label: 'Attempt 2', status: 'error' },
            { label: 'Attempt 3', status: 'done' },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="No Labels, Custom Width/Size"
        description="Labels are optional — a compact unlabeled bar for tight inline status indicators"
        code={`<SegmentedProgressBarView
  segments={[{ status: 'done' }, { status: 'done' }, { status: 'active' }, { status: 'pending' }]}
  size="sm"
  width="sm"
/>`}
      >
        <SegmentedProgressBarView
          segments={[{ status: 'done' }, { status: 'done' }, { status: 'active' }, { status: 'pending' }]}
          size="sm"
          width="sm"
        />
      </ExampleCard>
    </div>
  );
}
