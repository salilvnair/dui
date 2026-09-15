import { useState } from 'react';
import { FlameGraphView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const PROFILE = {
  name: 'request',
  children: [
    {
      name: 'router.handle',
      children: [
        {
          name: 'auth.verify',
          children: [
            { name: 'jwt.decode', value: 40 },
            { name: 'db.session.get', value: 120 },
          ],
        },
        {
          name: 'orders.list',
          children: [
            { name: 'db.query', value: 380 },
            { name: 'serialize', value: 90 },
          ],
        },
      ],
    },
    { name: 'middleware.log', value: 30 },
  ],
};

export function FlameGraphViewExamples() {
  const [zoomed, setZoomed] = useState<string | null>(null);

  return (
    <>
      <ExampleCard
        title="Where the time went"
        description="Width is cost; depth is the call stack"
        code={'<FlameGraphView root={profile} format={ms => ms + "ms"} />'}
      >
        <FlameGraphView root={PROFILE} width={640} format={v => v + 'ms'} />
      </ExampleCard>

      <ExampleCard
        title="Click a frame to zoom"
        description="onZoom hands back the cell, so the caller decides what the new root is"
        code={'<FlameGraphView onZoom={cell => setRoot(findNode(cell.name))} />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <FlameGraphView
            root={PROFILE}
            width={640}
            rowHeight={22}
            format={v => v + 'ms'}
            onZoom={cell => setZoomed(cell.name)}
          />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {zoomed ? 'last clicked: ' + zoomed : 'click a frame'}
          </div>
        </div>
      </ExampleCard>
    </>
  );
}
