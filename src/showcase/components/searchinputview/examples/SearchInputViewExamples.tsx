import { useState, useMemo } from 'react';
import { SearchInputView, ButtonView } from '@/dui';
import { SearchIcon, CloseIcon } from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

const ALL_COLLECTIONS = [
  'Users API',
  'Auth Service',
  'Products Catalogue',
  'Orders Service',
  'Payments Gateway',
  'Notifications',
  'Analytics Events',
];

const HISTORY = [
  'https://api.example.com/users',
  'https://api.example.com/auth/token',
  'https://staging.example.com/products',
  'http://localhost:3000/orders',
];

const ENV_VARS = ['BASE_URL', 'API_KEY', 'AUTH_TOKEN', 'TIMEOUT', 'RETRY_COUNT', 'NODE_ENV'];

export function SearchInputViewExamples() {
  const [collectionQ, setCollectionQ] = useState('');
  const [historyQ, setHistoryQ] = useState('');
  const [envQ, setEnvQ] = useState('');
  const [clearableQ, setClearableQ] = useState('hello world');
  const [sizeQ, setSizeQ] = useState('');

  const filteredCollections = useMemo(() =>
    ALL_COLLECTIONS.filter(c => c.toLowerCase().includes(collectionQ.toLowerCase())),
    [collectionQ]
  );

  const filteredHistory = useMemo(() =>
    HISTORY.filter(h => h.toLowerCase().includes(historyQ.toLowerCase())),
    [historyQ]
  );

  const filteredEnvVars = useMemo(() =>
    ENV_VARS.filter(v => v.toLowerCase().includes(envQ.toLowerCase())),
    [envQ]
  );

  return (
    <div>
      <ExampleCard
        title="Collection Search — Live Filter"
        description="Type to filter the list in real time"
        code={`<SearchInputView value={q} onChange={setQ} placeholder="Search collections…" prefix={<SearchIcon size={12} />} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SearchInputView
            value={collectionQ}
            onChange={setCollectionQ}
            placeholder="Search collections…"
            prefix={<SearchIcon size={12} />}
            style={{ width: 260 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredCollections.map(c => (
              <div key={c} style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '3px 4px' }}>
                {c}
              </div>
            ))}
            {filteredCollections.length === 0 && (
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                No collections match.
              </div>
            )}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="History Search"
        description="Filter URL history entries"
        code={`<SearchInputView value={q} onChange={setQ} placeholder="Search history…" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SearchInputView
            value={historyQ}
            onChange={setHistoryQ}
            placeholder="Search history…"
            prefix={<SearchIcon size={12} />}
            style={{ width: 320 }}
          />
          {filteredHistory.map(h => (
            <div key={h} style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
              {h}
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Variable Search"
        description="Filter environment variables by name"
        code={`<SearchInputView value={q} onChange={setQ} placeholder="Search variables…" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SearchInputView
            value={envQ}
            onChange={setEnvQ}
            placeholder="Search variables…"
            prefix={<SearchIcon size={12} />}
            style={{ width: 240 }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {filteredEnvVars.map(v => (
              <span
                key={v}
                style={{
                  fontSize: 11, fontFamily: 'monospace', padding: '2px 6px', borderRadius: 4,
                  background: 'var(--color-tag-bg)', color: 'var(--color-tag-text)',
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Clearable Button"
        description="Suffix slot used for an X button that clears the value"
        code={`<SearchInputView value={q} onChange={setQ} suffix={q ? <button onClick={() => setQ('')}><CloseIcon size={11} /></button> : null} />`}
      >
        <SearchInputView
          value={clearableQ}
          onChange={setClearableQ}
          placeholder="Type something…"
          prefix={<SearchIcon size={12} />}
          suffix={
            clearableQ ? (
              <button
                type="button"
                onClick={() => setClearableQ('')}
                style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 2 }}
              >
                <CloseIcon size={11} />
              </button>
            ) : undefined
          }
          style={{ width: 240 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg sizes for different density needs"
        code={`<SearchInputView size="sm" ... />\n<SearchInputView size="md" ... />\n<SearchInputView size="lg" ... />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(['sm', 'md', 'lg'] as const).map(sz => (
            <SearchInputView
              key={sz}
              value={sizeQ}
              onChange={setSizeQ}
              size={sz}
              placeholder={`Search (${sz})…`}
              prefix={<SearchIcon size={12} />}
              style={{ width: 240 }}
            />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Non-interactive placeholder when search is unavailable"
        code={`<SearchInputView value="" onChange={() => {}} disabled placeholder="Search unavailable" />`}
      >
        <SearchInputView
          value=""
          onChange={() => {}}
          placeholder="Search unavailable"
          prefix={<SearchIcon size={12} />}
          disabled
          style={{ width: 260 }}
        />
      </ExampleCard>
    </div>
  );
}
