import { useState } from 'react';
import { TileGridView, ChipView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function Box({ label, color = 'var(--color-surface)' }: { label: string; color?: string }) {
  return (
    <div style={{
      padding: 14, borderRadius: 8, background: color,
      border: '1px solid var(--color-surface-border)',
      fontSize: 12, color: 'var(--color-text-secondary)', minHeight: 48,
      display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
    }}>
      {label}
    </div>
  );
}

export function TileGridViewExamples() {
  const [selected, setSelected] = useState('overview');

  return (
    <div>
      <ExampleCard
        title="Weighted Split with Nested Vertical Column"
        description="One wide tile (weight 2) beside a nested vertical stack of two tiles — the classic nested tile grid pattern"
        code={`<TileGridView nodes={[
  { content: <Box label="A" />, weight: 2 },
  { vertical: true, children: [{ content: <Box label="B" /> }, { content: <Box label="C" /> }] },
]} />`}
      >
        <TileGridView nodes={[
          { content: <Box label="A (weight 2)" />, weight: 2 },
          { vertical: true, children: [{ content: <Box label="B" /> }, { content: <Box label="C" /> }] },
        ]} />
      </ExampleCard>

      <ExampleCard
        title="API Response Dashboard Layout"
        description="Realistic dashboard grid: request summary spans wide, status + timing stacked on the side"
        code={`<TileGridView nodes={[
  { content: <RequestSummary />, weight: 3 },
  { vertical: true, children: [
    { content: <StatusChip /> },
    { content: <TimingCard /> },
  ]},
]} />`}
      >
        <TileGridView nodes={[
          {
            weight: 3,
            content: (
              <div style={{ padding: 14, borderRadius: 8, border: '1px solid var(--color-surface-border)' }}>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Response Body</div>
                <pre style={{ margin: 0, fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
{`{
  "userId": 8842,
  "email": "priya@daakia.io",
  "active": true
}`}
                </pre>
              </div>
            ),
          },
          {
            vertical: true,
            children: [
              {
                content: (
                  <div style={{ padding: 14, borderRadius: 8, border: '1px solid var(--color-surface-border)', width: '100%' }}>
                    <ChipView label="200 OK" color="var(--color-success)" active size="sm" />
                  </div>
                ),
              },
              {
                content: (
                  <div style={{ padding: 14, borderRadius: 8, border: '1px solid var(--color-surface-border)', width: '100%', fontSize: 12 }}>
                    <div style={{ color: 'var(--color-text-muted)' }}>Time</div>
                    <div style={{ fontWeight: 700 }}>184ms</div>
                  </div>
                ),
              },
            ],
          },
        ]} />
      </ExampleCard>

      <ExampleCard
        title="Interactive Selectable Grid"
        description="Tiles wrapping clickable cards — selecting one updates outer state"
        code={`const [selected, setSelected] = useState('overview');
<TileGridView nodes={[
  { content: <SelectableCard id="overview" /> },
  { content: <SelectableCard id="tests" /> },
  { content: <SelectableCard id="monitors" /> },
]} />`}
      >
        <TileGridView nodes={[
          { content: (
            <ButtonView variant={selected === 'overview' ? 'primary' : 'secondary'} onClick={() => setSelected('overview')} style={{ width: '100%' }}>
              Overview
            </ButtonView>
          ) },
          { content: (
            <ButtonView variant={selected === 'tests' ? 'primary' : 'secondary'} onClick={() => setSelected('tests')} style={{ width: '100%' }}>
              Tests
            </ButtonView>
          ) },
          { content: (
            <ButtonView variant={selected === 'monitors' ? 'primary' : 'secondary'} onClick={() => setSelected('monitors')} style={{ width: '100%' }}>
              Monitors
            </ButtonView>
          ) },
        ]} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Selected: {selected}</div>
      </ExampleCard>

      <ExampleCard
        title="Fully Vertical Grid"
        description="vertical=true on TileGridView stacks the top-level nodes instead of the default horizontal row"
        code={`<TileGridView vertical nodes={[
  { content: <Box label="Environments" /> },
  { content: <Box label="Variables" /> },
  { content: <Box label="Secrets" /> },
]} />`}
      >
        <TileGridView vertical nodes={[
          { content: <Box label="Environments" /> },
          { content: <Box label="Variables" /> },
          { content: <Box label="Secrets" /> },
        ]} />
      </ExampleCard>

      <ExampleCard
        title="Empty Grid (edge case)"
        description="An empty nodes array renders the outer container with no tiles — useful while a layout config is still loading"
        code={`<TileGridView nodes={[]} />`}
      >
        <div style={{ border: '1px dashed var(--color-surface-border)', borderRadius: 8, minHeight: 40 }}>
          <TileGridView nodes={[]} />
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Renders an empty container — pair with a loading skeleton or placeholder text.
        </div>
      </ExampleCard>
    </div>
  );
}
