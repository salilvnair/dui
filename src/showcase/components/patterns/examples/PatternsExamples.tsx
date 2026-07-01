import { useState } from 'react';
import {
  SelectTextInputView, TabView, ButtonView, IconButtonView, ChipView,
  SelectInputView, TextInputView,
} from '@/dui';
import type { SelectTextOption, SelectOption, TabItem } from '@/dui';
import {
  PlayIcon, CopyIcon, SparkleIcon, SaveIcon, RefreshIcon,
  GlobeIcon, MoreHorizontalIcon, FolderIcon, DocumentIcon,
} from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

const HTTP_METHODS: SelectTextOption[] = [
  { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },
  { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },
  { value: 'PUT',    label: 'PUT',    color: 'var(--color-method-put)' },
  { value: 'PATCH',  label: 'PATCH',  color: 'var(--color-method-patch)' },
  { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },
];

const METHOD_OPTIONS: SelectOption[] = [
  { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },
  { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },
  { value: 'PUT',    label: 'PUT',    color: 'var(--color-method-put)' },
  { value: 'PATCH',  label: 'PATCH',  color: 'var(--color-method-patch)' },
  { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },
];

const REQUEST_TABS: TabItem[] = [
  { id: 'params',  label: 'Params',  badge: 2 },
  { id: 'headers', label: 'Headers', badge: 4 },
  { id: 'body',    label: 'Body' },
  { id: 'auth',    label: 'Auth', dot: true, dotColor: 'var(--color-success)' },
  { id: 'scripts', label: 'Scripts' },
];

const SIDEBAR_ITEMS = [
  { id: 'f1', type: 'folder', name: 'Auth API',         method: null },
  { id: 'r1', type: 'request', name: 'POST /login',     method: 'POST',   color: 'var(--color-method-post)' },
  { id: 'r2', type: 'request', name: 'GET /profile',    method: 'GET',    color: 'var(--color-method-get)' },
  { id: 'r3', type: 'request', name: 'DELETE /session', method: 'DELETE', color: 'var(--color-method-delete)' },
  { id: 'f2', type: 'folder', name: 'Users API',        method: null },
  { id: 'r4', type: 'request', name: 'GET /users',      method: 'GET',    color: 'var(--color-method-get)' },
  { id: 'r5', type: 'request', name: 'POST /users',     method: 'POST',   color: 'var(--color-method-post)' },
];

export function PatternsExamples() {
  const [stMethod, setStMethod]   = useState('GET');
  const [stUrl, setStUrl]         = useState('https://api.example.com/users');
  const [method, setMethod]       = useState('GET');
  const [url, setUrl]             = useState('https://api.example.com/users');
  const [reqTab, setReqTab]       = useState('params');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div>
      <ExampleCard
        title="Full REST URL Bar"
        description="SelectTextInputView (method + URL) + AI icon + Save dropdown + Send button — the complete URL bar pattern"
        code={`<SelectTextInputView
  selectOptions={HTTP_METHODS}
  selectValue={method}
  onSelectChange={setMethod}
  inputValue={url}
  onInputChange={setUrl}
  accentColor="var(--color-protocol-rest)"
  style={{ flex: 1 }}
/>
<IconButtonView icon={<SparkleIcon size={13} />} accentColor="var(--color-protocol-ai)" tooltip="AI Assist" />
<ButtonView variant="primary" accentColor="var(--color-protocol-rest)" iconLeft={<PlayIcon size={11} />}>
  Send
</ButtonView>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
          <SelectTextInputView
            selectOptions={HTTP_METHODS}
            selectValue={stMethod}
            onSelectChange={setStMethod}
            inputValue={stUrl}
            onInputChange={setStUrl}
            placeholder="https://api.example.com/users"
            accentColor="var(--color-protocol-rest)"
            width="fullWidth"
          />
          <IconButtonView
            icon={<SparkleIcon size={13} />}
            accentColor="var(--color-protocol-ai)"
            tooltip="AI Assist"
          />
          <ButtonView
            variant="primary"
            accentColor="var(--color-protocol-rest)"
            iconLeft={<PlayIcon size={11} />}
            loading={loading}
            onClick={handleSend}
          >
            {loading ? 'Sending…' : 'Send'}
          </ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Tabs Row"
        description="TabView with badge counts + Auth dot — the standard request section switcher"
        code={`const tabs = [
  { id: 'params',  label: 'Params',  badge: 2 },
  { id: 'headers', label: 'Headers', badge: 4 },
  { id: 'body',    label: 'Body' },
  { id: 'auth',    label: 'Auth', dot: true, dotColor: 'var(--color-success)' },
];

<TabView
  tabs={tabs}
  activeTab={reqTab}
  onChange={setReqTab}
  variant="pill"
  accentColor="var(--color-protocol-rest)"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TabView
            tabs={REQUEST_TABS}
            activeTab={reqTab}
            onChange={setReqTab}
            variant="pill"
            accentColor="var(--color-protocol-rest)"
          />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            Active tab: <strong style={{ color: 'var(--color-text-primary)' }}>{reqTab}</strong>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Response Section Header"
        description="Status chip + time chip + size chip + copy button — response panel top bar"
        code={`<ChipView label="200 OK" color="var(--color-success)" active size="xs" />
<ChipView label="142 ms" color="var(--color-info)"    size="xs" />
<ChipView label="3.4 KB" color="var(--color-text-muted)" size="xs" />
<span style={{ flex: 1 }} />
<IconButtonView icon={<CopyIcon size={12} />} tooltip="Copy response" size="sm" />
<IconButtonView icon={<RefreshIcon size={12} />} tooltip="Re-send" size="sm" />`}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 10px',
          background: 'color-mix(in srgb, var(--color-surface-border) 30%, transparent)',
          borderRadius: 6,
        }}>
          <ChipView label="200 OK" color="var(--color-success)" active size="xs" />
          <ChipView label="142 ms" color="var(--color-info)"    size="xs" />
          <ChipView label="3.4 KB" color="var(--color-text-muted)" size="xs" />
          <div style={{ flex: 1 }} />
          <IconButtonView icon={<CopyIcon size={12} />}    tooltip="Copy response" size="sm" />
          <IconButtonView icon={<RefreshIcon size={12} />} tooltip="Re-send request" size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Collection Sidebar Row"
        description="Folder/request row with icon + name + hover actions — sidebar item pattern"
        noPad
      >
        <div style={{ width: '100%' }}>
          {SIDEBAR_ITEMS.map(item => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredRow(item.id)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: item.type === 'folder' ? '5px 12px' : '4px 12px 4px 24px',
                borderBottom: '1px solid color-mix(in srgb, var(--color-surface-border) 30%, transparent)',
                background: hoveredRow === item.id ? 'var(--color-surface-hover)' : 'transparent',
                cursor: 'pointer',
                transition: 'background 100ms',
              }}
            >
              {item.type === 'folder' ? (
                <FolderIcon size={12} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              ) : (
                <DocumentIcon size={11} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              )}
              {item.method && item.color && (
                <ChipView label={item.method} color={item.color} size="xs" />
              )}
              <span style={{
                flex: 1, fontSize: item.type === 'folder' ? 12 : 11,
                fontWeight: item.type === 'folder' ? 600 : 400,
                color: item.type === 'folder' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {item.name}
              </span>
              {hoveredRow === item.id && (
                <IconButtonView icon={<MoreHorizontalIcon size={12} />} size="sm" tooltip="More actions" />
              )}
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Simple URL Bar (SelectInputView + TextInputView)"
        description="Alternative pattern using separate SelectInputView + TextInputView — useful when you need fine-grained control"
        code={`<SelectInputView
  options={METHOD_OPTIONS}
  value={method}
  onChange={setMethod}
  accentColor="var(--color-protocol-rest)"
  style={{ width: 90 }}
/>
<TextInputView
  value={url}
  onChange={e => setUrl(e.target.value)}
  placeholder="https://api.example.com"
  iconLeft={<GlobeIcon size={11} />}
  accentColor="var(--color-protocol-rest)"
  style={{ flex: 1 }}
/>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
          <SelectInputView
            options={METHOD_OPTIONS}
            value={method}
            onChange={setMethod}
            accentColor="var(--color-protocol-rest)"
            style={{ width: 90 }}
          />
          <TextInputView
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://api.example.com"
            iconLeft={<GlobeIcon size={11} />}
            accentColor="var(--color-protocol-rest)"
            style={{ flex: 1 }}
          />
          <ButtonView
            variant="secondary"
            iconLeft={<SaveIcon size={11} />}
          >
            Save
          </ButtonView>
        </div>
      </ExampleCard>
    </div>
  );
}
