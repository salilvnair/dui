import { useState } from 'react';
import { DuiProvider, ButtonView, TextInputView, ToggleSwitchView, TabView } from '@/dui';
import type { TabItem } from '@/dui';
import { Row } from '../../../shared/Row';

const SIZES_DEMO = ['sm', 'md', 'lg', 'xl'] as const;

const PILL_TABS_DEMO: TabItem[] = [
  { id: 'body',    label: 'Body' },
  { id: 'headers', label: 'Headers', badge: 3 },
  { id: 'auth',    label: 'Auth' },
];

function DuiSizeBlock({ size }: { size: 'sm' | 'md' | 'lg' | 'xl' }) {
  const [toggled, setToggled] = useState(false);
  const [activeTab, setActiveTab] = useState('body');
  const [inputVal, setInputVal] = useState('');
  const accent = 'var(--color-primary)';
  return (
    <DuiProvider size={size}>
      <div style={{
        padding: '14px 16px', borderRadius: 8, border: '1px solid var(--color-surface-border)',
        background: 'var(--color-panel)', display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, marginBottom: 2 }}>
          size="{size}"
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <ButtonView variant="primary" label="Send" accentColor={accent} />
          <ButtonView variant="secondary" label="Cancel" />
          <ButtonView variant="ghost" label="Reset" />
        </div>
        <TextInputView placeholder="Endpoint URL…" value={inputVal} onChange={e => setInputVal(e.target.value)} style={{ width: '100%' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <ToggleSwitchView checked={toggled} onChange={setToggled} label="Enable" />
          <TabView tabs={PILL_TABS_DEMO} activeTab={activeTab} onChange={setActiveTab} accentColor={accent} />
        </div>
      </div>
    </DuiProvider>
  );
}

export function DuiProviderLive() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Row label="All four sizes — one provider wraps all components" code={`<DuiProvider size="sm">\n  <ButtonView label="Send" />\n  <TextInputView placeholder="URL…" />\n  <ToggleSwitchView checked label="Enable" />\n  <TabView tabs={tabs} activeTab={tab} onChange={setTab} />\n</DuiProvider>`}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {SIZES_DEMO.map(s => <DuiSizeBlock key={s} size={s} />)}
        </div>
      </Row>
    </div>
  );
}
