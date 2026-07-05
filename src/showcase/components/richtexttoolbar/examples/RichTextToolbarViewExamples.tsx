import { useState } from 'react';
import { RichTextToolbarView, type RichTextAction } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function RichTextToolbarViewExamples() {
  const [active, setActive] = useState<RichTextAction[]>(['bold']);
  const [commentActive, setCommentActive] = useState<RichTextAction[]>([]);
  const [log, setLog] = useState<string[]>([]);

  const toggle = (a: RichTextAction) =>
    setActive(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const toggleComment = (a: RichTextAction) =>
    setCommentActive(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  return (
    <div>
      <ExampleCard
        title="Default Toolbar"
        description="Uncontrolled default — no actions active"
        code={`<RichTextToolbarView active={[]} onAction={a => console.log(a)} />`}
      >
        <RichTextToolbarView active={[]} onAction={a => setLog(l => [`clicked: ${a}`, ...l].slice(0, 3))} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          {log.length > 0 ? log.join(' · ') : 'Click a button to see the action fire'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Interactive Toggle Group"
        description="Controlled multi-select formatting state, as used above a description editor"
        code={`const [active, setActive] = useState<RichTextAction[]>(['bold']);
const toggle = (a: RichTextAction) =>
  setActive(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

<RichTextToolbarView active={active} onAction={toggle} />`}
      >
        <RichTextToolbarView active={active} onAction={toggle} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Active: {active.length > 0 ? active.join(', ') : 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg toolbars for different UI densities"
        code={`<RichTextToolbarView size="sm" active={['bold']} onAction={() => {}} />
<RichTextToolbarView size="md" active={['bold']} onAction={() => {}} />
<RichTextToolbarView size="lg" active={['bold']} onAction={() => {}} />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <RichTextToolbarView size="sm" active={['bold']} onAction={() => {}} />
          <RichTextToolbarView size="md" active={['bold']} onAction={() => {}} />
          <RichTextToolbarView size="lg" active={['bold']} onAction={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Team-branded color for a request-description editor toolbar"
        code={`<RichTextToolbarView
  active={['italic', 'link']}
  onAction={() => {}}
  color="var(--color-protocol-graphql)"
/>`}
      >
        <RichTextToolbarView active={['italic', 'link']} onAction={() => {}} color="var(--color-protocol-graphql)" />
      </ExampleCard>

      <ExampleCard
        title="Comment Composer Toolbar"
        description="Formatting bar above a team comment thread reply box — API-testing collaboration use case"
        code={`const [active, setActive] = useState<RichTextAction[]>([]);

<div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
  <RichTextToolbarView active={active} onAction={toggleComment} color="var(--color-info)" size="sm" />
  <textarea placeholder="Reply to this request review…" rows={2} />
</div>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, padding: 8 }}>
          <RichTextToolbarView active={commentActive} onAction={toggleComment} color="var(--color-info)" size="sm" />
          <textarea
            placeholder="Reply to this request review…"
            rows={2}
            style={{
              width: '100%', marginTop: 8, resize: 'vertical', fontSize: 12, fontFamily: 'inherit',
              padding: 8, border: '1px solid var(--color-surface-border)', borderRadius: 6,
              background: 'var(--color-input-bg)', color: 'var(--color-text-primary)', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </ExampleCard>
    </div>
  );
}
