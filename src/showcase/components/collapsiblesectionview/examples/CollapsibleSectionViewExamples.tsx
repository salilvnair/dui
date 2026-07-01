import { useState } from 'react';
import { CollapsibleSectionView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function VariableRow({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 12px', fontSize: 12 }}>
      <span style={{ color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>{name}</span>
      <span style={{ color: 'var(--color-success)', fontFamily: 'monospace' }}>{value}</span>
    </div>
  );
}

function CallFrameRow({ fn, file, line }: { fn: string; file: string; line: number }) {
  return (
    <div style={{ padding: '3px 12px', fontSize: 12 }}>
      <span style={{ color: 'var(--color-text-primary)', fontFamily: 'monospace' }}>{fn}</span>
      <span style={{ color: 'var(--color-text-muted)', marginLeft: 8 }}>{file}:{line}</span>
    </div>
  );
}

export function CollapsibleSectionViewExamples() {
  const [varOpen, setVarOpen] = useState(true);
  const [watchOpen, setWatchOpen] = useState(false);
  const [stackOpen, setStackOpen] = useState(true);
  const [bpOpen, setBpOpen] = useState(true);
  const [nested1, setNested1] = useState(true);
  const [nested2, setNested2] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Variables Section — Expanded with Badge"
        description="Shows 3 local variables; badge=3 signals how many vars are in scope"
        code={`<CollapsibleSectionView
  title="Variables"
  expanded={open}
  onToggle={() => setOpen(v => !v)}
  badge={3}
>
  <VariableRow name="userId" value="42" />
  <VariableRow name="email"  value='"alice@example.com"' />
  <VariableRow name="roles"  value='["admin","user"]' />
</CollapsibleSectionView>`}
      >
        <CollapsibleSectionView
          title="Variables"
          expanded={varOpen}
          onToggle={() => setVarOpen(v => !v)}
          badge={3}
        >
          <VariableRow name="userId" value="42" />
          <VariableRow name="email"  value='"alice@example.com"' />
          <VariableRow name="roles"  value='["admin", "user"]' />
        </CollapsibleSectionView>
      </ExampleCard>

      <ExampleCard
        title="Watch Expressions — Collapsed"
        description="Section starts collapsed; clicking the header expands it"
        code={`<CollapsibleSectionView
  title="Watch"
  expanded={false}
  onToggle={() => setWatchOpen(v => !v)}
  badge={2}
>
  <div>req.headers.authorization</div>
  <div>res.statusCode</div>
</CollapsibleSectionView>`}
      >
        <CollapsibleSectionView
          title="Watch"
          expanded={watchOpen}
          onToggle={() => setWatchOpen(v => !v)}
          badge={watchOpen ? 2 : 2}
        >
          <div style={{ padding: '4px 12px', fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>req.headers.authorization</div>
          <div style={{ padding: '4px 12px', fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>res.statusCode</div>
        </CollapsibleSectionView>
      </ExampleCard>

      <ExampleCard
        title="Call Stack — With Right-Side Action Slot"
        description="headerRight renders a Restart Frame button next to the title"
        code={`<CollapsibleSectionView
  title="Call Stack"
  expanded={stackOpen}
  onToggle={() => setStackOpen(v => !v)}
  headerRight={<ButtonView size="xs" variant="ghost">Restart Frame</ButtonView>}
>
  <CallFrameRow fn="fetchUser"     file="api.ts"   line={42} />
  <CallFrameRow fn="loadDashboard" file="page.tsx" line={88} />
</CollapsibleSectionView>`}
      >
        <CollapsibleSectionView
          title="Call Stack"
          expanded={stackOpen}
          onToggle={() => setStackOpen(v => !v)}
          headerRight={<ButtonView size="xs" variant="ghost">Restart Frame</ButtonView>}
        >
          <CallFrameRow fn="fetchUser"     file="api.ts"   line={42} />
          <CallFrameRow fn="loadDashboard" file="page.tsx" line={88} />
          <CallFrameRow fn="App"           file="main.tsx" line={12} />
        </CollapsibleSectionView>
      </ExampleCard>

      <ExampleCard
        title="Breakpoints — Enable All Button"
        description="headerRight places a bulk action alongside the section title"
        code={`<CollapsibleSectionView
  title="Breakpoints"
  expanded={bpOpen}
  onToggle={() => setBpOpen(v => !v)}
  badge={4}
  headerRight={<ButtonView size="xs" variant="ghost">Enable All</ButtonView>}
>
  ...breakpoint rows...
</CollapsibleSectionView>`}
      >
        <CollapsibleSectionView
          title="Breakpoints"
          expanded={bpOpen}
          onToggle={() => setBpOpen(v => !v)}
          badge={4}
          headerRight={<ButtonView size="xs" variant="ghost">Enable All</ButtonView>}
        >
          {[
            { file: 'api.ts',    line: 14, disabled: false },
            { file: 'auth.ts',   line: 37, disabled: true },
            { file: 'parser.ts', line: 92, disabled: false },
            { file: 'index.ts',  line: 5,  disabled: true },
          ].map(bp => (
            <div key={`${bp.file}:${bp.line}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 12px', fontSize: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: bp.disabled ? 'var(--color-text-muted)' : 'var(--color-error)', flexShrink: 0 }} />
              <span style={{ color: bp.disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)', fontFamily: 'monospace' }}>
                {bp.file}:{bp.line}
              </span>
            </div>
          ))}
        </CollapsibleSectionView>
      </ExampleCard>

      <ExampleCard
        title="Nested Sections"
        description="Outer section contains inner sections — each collapses independently"
        code={`<CollapsibleSectionView title="Local" expanded={nested1} onToggle={() => setNested1(v => !v)}>
  <CollapsibleSectionView title="Closure" expanded={nested2} onToggle={() => setNested2(v => !v)}>
    <VariableRow name="ctx" value="{…}" />
  </CollapsibleSectionView>
</CollapsibleSectionView>`}
      >
        <CollapsibleSectionView title="Local" expanded={nested1} onToggle={() => setNested1(v => !v)} badge={2}>
          <VariableRow name="userId" value="42" />
          <CollapsibleSectionView title="Closure" expanded={nested2} onToggle={() => setNested2(v => !v)} badge={1}>
            <VariableRow name="ctx" value="{requestId: 'abc123'}" />
          </CollapsibleSectionView>
        </CollapsibleSectionView>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color — GraphQL purple"
        description="accentColor changes the header chip tint and badge color"
        code={`<CollapsibleSectionView
  title="Query Variables"
  expanded={open}
  onToggle={() => setOpen(v => !v)}
  badge={5}
  accentColor="var(--color-protocol-graphql)"
>
  <VariableRow name="$userId" value="42" />
</CollapsibleSectionView>`}
      >
        <CollapsibleSectionView
          title="Query Variables"
          expanded={varOpen}
          onToggle={() => setVarOpen(v => !v)}
          badge={5}
          accentColor="var(--color-protocol-graphql)"
        >
          <VariableRow name="$userId"   value="42" />
          <VariableRow name="$limit"    value="10" />
          <VariableRow name="$offset"   value="0" />
          <VariableRow name="$sort"     value='"createdAt"' />
          <VariableRow name="$archived" value="false" />
        </CollapsibleSectionView>
      </ExampleCard>
    </div>
  );
}
