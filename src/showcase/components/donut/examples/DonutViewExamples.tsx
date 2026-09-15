import { DonutView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const STATUS = [
  { name: '200 OK', value: 1842, color: 'var(--color-success)' },
  { name: '404 Not Found', value: 318, color: 'var(--color-warning)' },
  { name: '500 Server Error', value: 96, color: 'var(--color-error)' },
  { name: '301 Moved', value: 54, color: 'var(--color-info)' },
];

const MANY = [
  { name: 'api', value: 820 }, { name: 'web', value: 610 }, { name: 'auth', value: 340 },
  { name: 'billing', value: 180 }, { name: 'search', value: 120 }, { name: 'mail', value: 90 },
  { name: 'cron', value: 60 }, { name: 'admin', value: 40 }, { name: 'legacy', value: 20 },
];

export function DonutViewExamples() {
  return (
    <>
      <ExampleCard
        title="A ring and its legend"
        description="Slices carry their own colour; the hole holds the total"
        code={'<DonutView items={status} legend centerLabel="requests" />'}
      >
        <DonutView items={STATUS} legend centerLabel="requests" size={180} />
      </ExampleCard>

      <ExampleCard
        title="Rolling up the tail"
        description="maxSlices keeps the ring readable — everything past it becomes one remainder"
        code={'<DonutView items={many} maxSlices={5} legend />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <DonutView items={MANY} size={150} legend={false} />
          <DonutView items={MANY} size={150} maxSlices={5} legend />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Thickness and formatting"
        description="thickness is a fraction of the radius; format controls every number drawn"
        code={'<DonutView thickness={0.55} format={v => (v / 1000).toFixed(1) + "k"} />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <DonutView items={STATUS} size={140} thickness={0.2} centerLabel="thin" />
          <DonutView items={STATUS} size={140} thickness={0.55} centerLabel="thick" />
          <DonutView
            items={STATUS}
            size={140}
            legend
            centerLabel="formatted"
            format={v => (v / 1000).toFixed(1) + 'k'}
          />
        </div>
      </ExampleCard>
    </>
  );
}
