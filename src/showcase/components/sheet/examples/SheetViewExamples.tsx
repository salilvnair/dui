import { useState } from 'react';
import { SheetView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SheetViewExamples() {
  const [edge, setEdge] = useState<null | 'left' | 'right' | 'top' | 'bottom'>(null);

  return (
    <>
      <ExampleCard
        title="In from any edge"
        description="A drawer that is not committed to one side — useful when the same panel is a sidebar on a desktop and a bottom sheet on a phone"
        code={'<SheetView open={open} onClose={close} edge="right" title="Filters" />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(['left', 'right', 'top', 'bottom'] as const).map(e => (
            <ButtonView key={e} variant="secondary" size="sm" onClick={() => setEdge(e)}>
              From {e}
            </ButtonView>
          ))}
        </div>
        <SheetView
          open={edge !== null}
          onClose={() => setEdge(null)}
          edge={edge ?? 'right'}
          size={edge === 'top' || edge === 'bottom' ? 240 : 320}
          title={'Sheet from the ' + (edge ?? '')}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <ButtonView variant="ghost" size="sm" onClick={() => setEdge(null)}>Cancel</ButtonView>
              <ButtonView size="sm" onClick={() => setEdge(null)}>Apply</ButtonView>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12, color: 'var(--color-text-secondary)' }}>
            <p style={{ margin: 0 }}>
              Drag the handle to resize, click the backdrop to dismiss, or press Escape.
            </p>
            <p style={{ margin: 0 }}>
              The handle and the backdrop close can both be turned off for a sheet that must be
              answered.
            </p>
          </div>
        </SheetView>
      </ExampleCard>
    </>
  );
}
