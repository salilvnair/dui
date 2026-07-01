import { useState } from 'react';
import { CheckboxView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function CheckboxViewExamples() {
  const [params, setParams] = useState([
    { id: 'p1', key: 'limit',  value: '10',    enabled: true },
    { id: 'p2', key: 'offset', value: '0',     enabled: true },
    { id: 'p3', key: 'sort',   value: 'name',  enabled: false },
    { id: 'p4', key: 'filter', value: 'active', enabled: true },
  ]);

  const [features, setFeatures] = useState<Record<string, boolean>>({
    cache:       true,
    logs:        false,
    metrics:     true,
    debug:       false,
    autoRetry:   false,
  });

  const allEnabled  = params.every(p => p.enabled);
  const someEnabled = params.some(p => p.enabled) && !allEnabled;

  const toggleAll = (checked: boolean) =>
    setParams(prev => prev.map(p => ({ ...p, enabled: checked })));

  const toggleParam = (id: string) =>
    setParams(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));

  return (
    <div>
      <ExampleCard
        title="Header / Param Row Checkbox"
        description="Each key-value row has an enable/disable checkbox — unchecked rows are grayed out"
        code={`{params.map(p => (
  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <CheckboxView
      checked={p.enabled}
      onChange={() => toggleParam(p.id)}
      accentColor="var(--color-protocol-rest)"
    />
    <span style={{ opacity: p.enabled ? 1 : 0.4 }}>{p.key}</span>
    <span style={{ opacity: p.enabled ? 1 : 0.4 }}>{p.value}</span>
  </div>
))}`}
        noPad
      >
        <div>
          {params.map(p => (
            <div
              key={p.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 14px',
                borderBottom: '1px solid color-mix(in srgb, var(--color-surface-border) 40%, transparent)',
              }}
            >
              <CheckboxView
                checked={p.enabled}
                onChange={() => toggleParam(p.id)}
                accentColor="var(--color-protocol-rest)"
                size="sm"
              />
              <span style={{
                width: 80, fontSize: 12, fontFamily: 'monospace',
                color: p.enabled ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                opacity: p.enabled ? 1 : 0.5,
              }}>
                {p.key}
              </span>
              <span style={{
                flex: 1, fontSize: 12,
                color: p.enabled ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                opacity: p.enabled ? 1 : 0.5,
              }}>
                {p.value}
              </span>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Bulk-Select All (Indeterminate State)"
        description="Header checkbox that checks/unchecks all rows — indeterminate when some are checked"
        code={`const allEnabled  = params.every(p => p.enabled);
const someEnabled = params.some(p => p.enabled) && !allEnabled;

<CheckboxView
  checked={allEnabled}
  indeterminate={someEnabled}
  onChange={toggleAll}
  label="Select all"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, borderBottom: '1px solid var(--color-surface-border)' }}>
            <CheckboxView
              checked={allEnabled}
              indeterminate={someEnabled}
              onChange={toggleAll}
              accentColor="var(--color-protocol-rest)"
            />
            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              Select all ({params.filter(p => p.enabled).length}/{params.length} enabled)
            </span>
          </div>
          {params.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12 }}>
              <CheckboxView
                checked={p.enabled}
                onChange={() => toggleParam(p.id)}
                accentColor="var(--color-protocol-rest)"
                size="sm"
              />
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-secondary)', opacity: p.enabled ? 1 : 0.5 }}>
                {p.key}={p.value}
              </span>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled Row"
        description="Non-interactive checkbox — e.g. inherited or system-set headers that cannot be removed"
        code={`<CheckboxView checked={true}  onChange={() => {}} disabled label="Content-Type (auto-set)" />
<CheckboxView checked={false} onChange={() => {}} disabled label="Authorization (locked)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CheckboxView checked={true}  onChange={() => {}} disabled label="Content-Type (auto-set by body)" />
          <CheckboxView checked={false} onChange={() => {}} disabled label="Authorization (locked by auth tab)" />
          <CheckboxView checked={true}  onChange={() => {}} disabled label="User-Agent (enforced)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md / lg — scale with the row height of your table"
        code={`<CheckboxView checked={true} onChange={() => {}} size="xs" label="xs" />
<CheckboxView checked={true} onChange={() => {}} size="sm" label="sm" />
<CheckboxView checked={true} onChange={() => {}} size="md" label="md" />
<CheckboxView checked={true} onChange={() => {}} size="lg" label="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CheckboxView checked={true} onChange={() => {}} size="xs" label="xs — tightest" />
          <CheckboxView checked={true} onChange={() => {}} size="sm" label="sm — compact rows" />
          <CheckboxView checked={true} onChange={() => {}} size="md" label="md — standard" />
          <CheckboxView checked={true} onChange={() => {}} size="lg" label="lg — spacious" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With accentColor"
        description="Protocol-tinted checkboxes for settings panels with protocol context"
        code={`<CheckboxView checked={v} onChange={setV} accentColor="var(--color-protocol-rest)"      label="REST" />
<CheckboxView checked={v} onChange={setV} accentColor="var(--color-protocol-graphql)"   label="GraphQL" />
<CheckboxView checked={v} onChange={setV} accentColor="var(--color-protocol-websocket)" label="WebSocket" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'REST',      color: 'var(--color-protocol-rest)',      checked: true },
            { label: 'GraphQL',   color: 'var(--color-protocol-graphql)',   checked: true },
            { label: 'WebSocket', color: 'var(--color-protocol-websocket)', checked: false },
            { label: 'gRPC',      color: 'var(--color-protocol-grpc)',      checked: true },
            { label: 'SOAP',      color: 'var(--color-protocol-soap)',      checked: false },
          ].map(({ label, color, checked }) => (
            <CheckboxView
              key={label}
              checked={checked}
              onChange={() => {}}
              accentColor={color}
              label={label}
              size="sm"
            />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Feature Selection Group"
        description="Multi-select feature toggles — checkboxes for enabling optional capabilities"
        code={`const [features, setFeatures] = useState({ cache: true, logs: false, metrics: true });

{Object.entries(features).map(([key, enabled]) => (
  <CheckboxView
    key={key}
    checked={enabled}
    onChange={v => setFeatures(prev => ({ ...prev, [key]: v }))}
    label={key}
  />
))}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(Object.entries(features) as [string, boolean][]).map(([key, enabled]) => (
            <CheckboxView
              key={key}
              checked={enabled}
              onChange={v => setFeatures(prev => ({ ...prev, [key]: v }))}
              label={{
                cache:     'Response caching',
                logs:      'Request / response logs',
                metrics:   'Performance metrics',
                debug:     'Debug mode',
                autoRetry: 'Auto-retry on 5xx',
              }[key] ?? key}
              size="sm"
            />
          ))}
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', paddingTop: 4 }}>
            Enabled: {Object.entries(features).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none'}
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
