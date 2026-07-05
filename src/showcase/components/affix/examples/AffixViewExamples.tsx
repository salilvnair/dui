import { useState } from 'react';
import { AffixView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function AffixViewExamples() {
  const [stuck, setStuck] = useState(false);
  const [saveStuck, setSaveStuck] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Pinned Toolbar"
        description="Default usage — pins the toolbar once it reaches the top of its scroll container"
        code={`<AffixView offsetTop={0}>
  <div>Pinned toolbar</div>
</AffixView>`}
      >
        <div style={{ height: 160, overflowY: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <AffixView offsetTop={0}>
            <div style={{ padding: '8px 12px', background: 'var(--color-surface)', fontSize: 12, fontWeight: 600 }}>
              Request Builder Toolbar
            </div>
          </AffixView>
          <div style={{ padding: 12, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>Params / Headers / Body row {i + 1}</div>
            ))}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Stuck-state Callback (interactive)"
        description="onStickyChange fires when the affixed element pins/unpins — scroll the box below"
        code={`const [stuck, setStuck] = useState(false);

<AffixView offsetTop={0} onStickyChange={setStuck}>
  <div>Environment: Production</div>
</AffixView>
<div style={{ marginTop: 8 }}>Pinned: {stuck ? 'yes' : 'no'}</div>`}
      >
        <div style={{ height: 160, overflowY: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <AffixView offsetTop={0} onStickyChange={setStuck}>
            <div style={{
              padding: '8px 12px', fontSize: 12, fontWeight: 600,
              background: stuck ? 'var(--color-warning)' : 'var(--color-surface)',
              color: stuck ? '#1a1a1a' : 'var(--color-text-primary)',
              transition: 'background 120ms',
            }}>
              Environment: Production
            </div>
          </AffixView>
          <div style={{ padding: 12, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>Variable row {i + 1}</div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Currently pinned: <strong style={{ color: 'var(--color-text-primary)' }}>{stuck ? 'yes' : 'no'}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom offsetTop"
        description="Sticks 40px below the top — useful when a fixed app header already occupies space"
        code={`<AffixView offsetTop={40}>
  <div>Section nav</div>
</AffixView>`}
      >
        <div style={{ height: 160, overflowY: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8, position: 'relative' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 20, padding: '6px 12px', fontSize: 10, background: 'var(--color-primary)', color: '#fff' }}>
            App Header (fixed, 40px)
          </div>
          <AffixView offsetTop={40}>
            <div style={{ padding: '8px 12px', background: 'var(--color-surface)', fontSize: 12, fontWeight: 600 }}>
              Collection: Auth Endpoints
            </div>
          </AffixView>
          <div style={{ padding: 12, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>Endpoint /v1/auth/{i}</div>
            ))}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Test Runner — Pinned Save Bar"
        description="Keeps the Save & Send actions visible while a long request editor scrolls beneath it"
        code={`<AffixView offsetTop={0} onStickyChange={setSaveStuck}>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Unsaved changes</span>
    <button>Save request</button>
  </div>
</AffixView>`}
      >
        <div style={{ height: 180, overflowY: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <AffixView offsetTop={0} onStickyChange={setSaveStuck}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', background: 'var(--color-surface)',
              boxShadow: saveStuck ? '0 2px 8px rgba(0,0,0,.15)' : 'none',
            }}>
              <span style={{ fontSize: 11, color: 'var(--color-warning)' }}>Unsaved changes</span>
              <button style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 6, border: 'none',
                background: 'var(--color-primary)', color: '#fff', cursor: 'pointer',
              }}>
                Save request
              </button>
            </div>
          </AffixView>
          <div style={{ padding: 12, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <div>POST https://api.daakia.dev/v1/webhooks</div>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>Body field {i + 1}</div>
            ))}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Short Content — No Sticking Room"
        description="Edge case: when content is shorter than the scroll container, the affix stays in its natural position"
        code={`<AffixView offsetTop={0}>
  <div>Header</div>
</AffixView>
<div>Just one short row of content</div>`}
      >
        <div style={{ height: 100, overflowY: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <AffixView offsetTop={0}>
            <div style={{ padding: '8px 12px', background: 'var(--color-surface)', fontSize: 12, fontWeight: 600 }}>
              Empty Collection
            </div>
          </AffixView>
          <div style={{ padding: 12, fontSize: 12, color: 'var(--color-text-muted)' }}>
            No requests saved yet.
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
