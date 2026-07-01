import { useState } from 'react';
import {
  ChipView, ButtonView, IconButtonView, DropDownButtonView,
  SelectInputView, TextInputView, TabView,
} from '@/dui';
import type { ContextMenuItem, TabItem } from '@/dui';
import {
  SparkleIcon, PlayIcon, FilterIcon, RefreshIcon, MoreHorizontalIcon,
  DownloadIcon, ExportIcon, CopyIcon,
} from '@/icons/daakia-icons';
import { Row } from '../../../shared/Row';

const METHOD_OPTIONS = [
  { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },
  { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },
  { value: 'PUT',    label: 'PUT',    color: 'var(--color-method-put)' },
  { value: 'PATCH',  label: 'PATCH',  color: 'var(--color-method-patch)' },
  { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },
];

const DROPDOWN_ITEMS: ContextMenuItem[] = [
  { id: 'save-as',   label: 'Save as…',   onClick: () => alert('Save as') },
  { id: 'save-copy', label: 'Save a copy', onClick: () => alert('Save copy') },
  { id: 'sep', label: '', separator: true },
  { id: 'export',    label: 'Export…',    onClick: () => alert('Export') },
];

const PILL_TABS: TabItem[] = [
  { id: 'params',  label: 'Params',  badge: 2 },
  { id: 'headers', label: 'Headers', badge: 4 },
  { id: 'body',    label: 'Body' },
  { id: 'auth',    label: 'Auth', dot: true, dotColor: 'var(--color-success)' },
  { id: 'scripts', label: 'Scripts' },
];

const PROTOCOLS = [
  { label: 'REST',      color: 'var(--color-protocol-rest)',      badge: 'REST' },
  { label: 'GraphQL',   color: 'var(--color-protocol-graphql)',   badge: 'GQL' },
  { label: 'WebSocket', color: 'var(--color-protocol-websocket)', badge: 'WS'  },
  { label: 'gRPC',      color: 'var(--color-protocol-grpc)',      badge: 'gRPC' },
  { label: 'SOAP',      color: 'var(--color-protocol-soap)',      badge: 'SOAP' },
  { label: 'MQTT',      color: 'var(--color-protocol-mqtt)',      badge: 'MQTT' },
  { label: 'SSE',       color: 'var(--color-protocol-sse)',       badge: 'SSE'  },
  { label: 'MCP',       color: 'var(--color-protocol-mcp)',       badge: 'MCP'  },
  { label: 'AI',        color: 'var(--color-protocol-ai)',        badge: 'AI'   },
];

export function PatternsLive() {
  const [method, setMethod] = useState('GET');
  const [pillTab, setPillTab] = useState('params');

  return (
    <div>
      <Row label="REST URL bar assembly" code={`<SelectInputView options={HTTP_METHODS} value={method} onChange={setMethod} style={{ width: 90 }} />\n<TextInputView placeholder="https://api.example.com/users" style={{ flex: 1 }} />\n<IconButtonView icon={<SparkleIcon size={13} />} accentColor="var(--color-protocol-ai)" />\n<DropDownButtonView label="Save" items={items} />\n<ButtonView variant="primary" accentColor="var(--color-protocol-rest)">Send</ButtonView>`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
          <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} style={{ width: 90 }} accentColor="var(--color-protocol-rest)" />
          <TextInputView placeholder="https://api.example.com/users" style={{ flex: 1 }} accentColor="var(--color-protocol-rest)" />
          <IconButtonView icon={<SparkleIcon size={13} />} accentColor="var(--color-protocol-ai)" tooltip="AI Assist" />
          <DropDownButtonView label="Save" items={DROPDOWN_ITEMS} />
          <ButtonView variant="primary" accentColor="var(--color-protocol-rest)" iconLeft={<PlayIcon size={11} />}>Send</ButtonView>
        </div>
      </Row>

      <Row label="Request config tab bar + toolbar (underline tabs + icon buttons at same height)" noPad code={`<div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid ...' }}>\n  <TabView variant="underline" size="sm" accentColor="..." className="flex-1" />\n  <IconButtonView icon={<FilterIcon size={12} />} size="sm" />\n  <IconButtonView icon={<RefreshIcon size={12} />} size="sm" />\n</div>`}>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '8px', borderBottom: '1px solid var(--color-surface-border)' }}>
            <TabView tabs={PILL_TABS} activeTab={pillTab} onChange={setPillTab} variant="underline" size="sm" accentColor="var(--color-protocol-rest)" className="flex-1" />
            <div style={{ display: 'flex', gap: '2px', paddingRight: '6px' }}>
              <IconButtonView icon={<FilterIcon size={12} />} size="sm" tooltip="Filter" />
              <IconButtonView icon={<RefreshIcon size={12} />} size="sm" tooltip="Clear" />
              <IconButtonView icon={<MoreHorizontalIcon size={12} />} size="sm" tooltip="More" />
            </div>
          </div>
          <div style={{ padding: '12px 16px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            Active tab: <strong style={{ color: 'var(--color-text-primary)' }}>{pillTab}</strong>
          </div>
        </div>
      </Row>

      <Row label="Protocol chip + method badge in collection tree row" noPad code={`<div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px' }}>\n  <ChipView label="GET" color="var(--color-method-get)" size="xs" />\n  <span style={{ flex: 1 }}>/api/users</span>\n  <IconButtonView icon={<MoreHorizontalIcon size={12} />} size="sm" />\n</div>`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', padding: '4px', width: '100%' }}>
          {[
            { method: 'GET',    color: 'var(--color-method-get)',    path: '/api/users' },
            { method: 'POST',   color: 'var(--color-method-post)',   path: '/api/users' },
            { method: 'PUT',    color: 'var(--color-method-put)',    path: '/api/users/{id}' },
            { method: 'DELETE', color: 'var(--color-method-delete)', path: '/api/users/{id}' },
          ].map(r => (
            <div key={r.path + r.method} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <ChipView label={r.method} color={r.color} size="xs" />
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', flex: 1 }}>{r.path}</span>
              <IconButtonView icon={<MoreHorizontalIcon size={12} />} size="sm" tooltip="Actions" />
            </div>
          ))}
        </div>
      </Row>

      <Row label="Protocol sidebar nav (chip + label)" gap={4} code={`{PROTOCOLS.map(p => (\n  <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 6, ... }}>\n    <ChipView label={p.badge} color={p.color} size="xs" />\n    <span>{p.label}</span>\n  </div>\n))}`}>
        {PROTOCOLS.map(p => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-panel)', border: '1px solid var(--color-surface-border)', borderRadius: '5px', padding: '4px 10px', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-panel)'}
          >
            <ChipView label={p.badge} color={p.color} size="xs" />
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{p.label}</span>
          </div>
        ))}
      </Row>

      <Row label="Toolbar button group (icon + text mix)" gap={4} code={`<ButtonView variant="primary" iconLeft={<PlayIcon size={11} />}>Run</ButtonView>\n<ButtonView variant="secondary" iconLeft={<RefreshIcon size={11} />}>Reset</ButtonView>\n<IconButtonView icon={<DownloadIcon size={13} />} />\n<DropDownButtonView label="Save" items={items} />`}>
        <ButtonView variant="primary" iconLeft={<PlayIcon size={11} />} accentColor="var(--color-success)">Run</ButtonView>
        <ButtonView variant="secondary" iconLeft={<RefreshIcon size={11} />}>Reset</ButtonView>
        <div style={{ width: '1px', height: '20px', background: 'var(--color-surface-border)', margin: '0 4px' }} />
        <IconButtonView icon={<DownloadIcon size={13} />} tooltip="Import" />
        <IconButtonView icon={<ExportIcon size={13} />} tooltip="Export" />
        <IconButtonView icon={<CopyIcon size={13} />} tooltip="Copy" />
        <div style={{ width: '1px', height: '20px', background: 'var(--color-surface-border)', margin: '0 4px' }} />
        <DropDownButtonView label="Save" items={DROPDOWN_ITEMS} />
      </Row>
    </div>
  );
}
