import { SunburstView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const HEAP = {
  name: 'heap',
  children: [
    {
      name: 'com.example',
      children: [
        { name: 'OrderService', value: 4200 },
        { name: 'UserCache', value: 2600 },
        { name: 'SessionStore', value: 1400 },
      ],
    },
    {
      name: 'java.util',
      children: [
        { name: 'HashMap', value: 3100 },
        { name: 'ArrayList', value: 1800 },
        { name: 'ConcurrentHashMap', value: 900 },
      ],
    },
    { name: 'byte[]', value: 5200 },
    { name: 'java.lang.String', value: 2400 },
  ],
};

export function SunburstViewExamples() {
  return (
    <>
      <ExampleCard
        title="A hierarchy, drawn outward"
        description="Each ring is a level; a parent is the sum of its children"
        code={'<SunburstView root={heap} centerLabel="heap" />'}
      >
        <SunburstView root={HEAP} size={260} centerLabel="heap" format={v => (v / 1024).toFixed(1) + ' MB'} />
      </ExampleCard>

      <ExampleCard
        title="Depth and noise"
        description="maxDepth stops the rings; minShare drops slivers too thin to mean anything"
        code={'<SunburstView maxDepth={1} minShare={0.02} />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <SunburstView root={HEAP} size={180} maxDepth={1} centerLabel="top level" />
          <SunburstView root={HEAP} size={180} minShare={0.08} centerLabel="big only" />
        </div>
      </ExampleCard>
    </>
  );
}
