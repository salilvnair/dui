import { useState } from 'react';
import { TextInputView } from '@/dui';
import { GlobeIcon, SearchIcon, EyeIcon, EyeOffIcon, LockIcon } from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TextInputViewExamples() {
  const [url, setUrl] = useState('https://api.example.com/users');
  const [search, setSearch] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [apiKey, setApiKey] = useState('sk-abc123');

  return (
    <div>
      <ExampleCard
        title="URL Input with Globe Icon"
        description="Standard endpoint URL input used in the REST/GraphQL URL bar"
        code={`<TextInputView
  value={url}
  onChange={e => setUrl(e.target.value)}
  placeholder="https://api.example.com/users"
  iconLeft={<GlobeIcon size={11} />}
  accentColor="var(--color-protocol-rest)"
/>`}
      >
        <TextInputView
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://api.example.com/users"
          iconLeft={<GlobeIcon size={11} />}
          accentColor="var(--color-protocol-rest)"
          style={{ width: '100%' }}
        />
      </ExampleCard>

      <ExampleCard
        title="Search Input"
        description="Collection search, environment variable search, header search"
        code={`<TextInputView
  value={search}
  onChange={e => setSearch(e.target.value)}
  placeholder="Search requests…"
  iconLeft={<SearchIcon size={11} />}
/>`}
      >
        <TextInputView
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search requests…"
          iconLeft={<SearchIcon size={11} />}
          style={{ width: 280 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Password Input with Eye Toggle"
        description="Secret values like Bearer tokens or API keys — show/hide toggle"
        code={`const [show, setShow] = useState(false);

<TextInputView
  value={password}
  onChange={e => setPassword(e.target.value)}
  type={show ? 'text' : 'password'}
  placeholder="Bearer token or secret"
  iconLeft={<LockIcon size={11} />}
  iconRight={
    <button onClick={() => setShow(v => !v)} style={{ ... }}>
      {show ? <EyeOffIcon size={11} /> : <EyeIcon size={11} />}
    </button>
  }
/>`}
      >
        <TextInputView
          value={password}
          onChange={e => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          placeholder="Bearer token or secret"
          iconLeft={<LockIcon size={11} />}
          iconRight={
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', padding: 0 }}
            >
              {showPassword ? <EyeOffIcon size={11} /> : <EyeIcon size={11} />}
            </button>
          }
          style={{ width: 280 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Read-only locked inputs — e.g. inherited environment variables"
        code={`<TextInputView
  value="https://prod.api.example.com"
  disabled
  iconLeft={<GlobeIcon size={11} />}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TextInputView
            value="https://prod.api.example.com"
            disabled
            iconLeft={<GlobeIcon size={11} />}
            style={{ width: 300 }}
          />
          <TextInputView
            value="Bearer eyJhbGciOiJIUzI1NiJ9..."
            disabled
            iconLeft={<LockIcon size={11} />}
            style={{ width: 300 }}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Error State"
        description="Validation error — red focus ring and border color"
        code={`<TextInputView
  value={apiKey}
  onChange={e => setApiKey(e.target.value)}
  error
  placeholder="API key is required"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TextInputView
            value=""
            onChange={() => {}}
            error
            placeholder="Required — API key is empty"
            style={{ width: 280 }}
          />
          <TextInputView
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            error
            iconLeft={<LockIcon size={11} />}
            placeholder="Invalid API key format"
            style={{ width: 280 }}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="default / sm / md / lg / xl — pick the size that fits your toolbar"
        code={`<TextInputView size="default" placeholder="default — 26px" />
<TextInputView size="sm"      placeholder="sm — 22px" />
<TextInputView size="md"      placeholder="md — 28px" />
<TextInputView size="lg"      placeholder="lg — 32px" />
<TextInputView size="xl"      placeholder="xl — 36px" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TextInputView size="default" placeholder="default — 26px" style={{ width: 220 }} />
          <TextInputView size="sm"      placeholder="sm — 22px"      style={{ width: 200 }} />
          <TextInputView size="md"      placeholder="md — 28px"      style={{ width: 210 }} />
          <TextInputView size="lg"      placeholder="lg — 32px"      style={{ width: 210 }} />
          <TextInputView size="xl"      placeholder="xl — 36px"      style={{ width: 210 }} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Prefix Text Label"
        description="Inline protocol prefix — wrap TextInputView in a styled container with a text prefix badge"
        code={`// Pair a static prefix span with naked TextInputView
<div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-input-border)', borderRadius: 5, height: 26 }}>
  <span style={{ padding: '0 8px', fontSize: 11, color: 'var(--color-text-muted)', borderRight: '1px solid var(--color-input-border)' }}>https://</span>
  <TextInputView naked placeholder="api.example.com/users" style={{ flex: 1 }} />
</div>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { prefix: 'https://', placeholder: 'api.example.com/users', accent: 'var(--color-protocol-rest)' },
            { prefix: 'wss://',   placeholder: 'api.example.com/events', accent: 'var(--color-protocol-websocket)' },
          ].map(({ prefix, placeholder, accent }) => (
            <div
              key={prefix}
              style={{
                display: 'flex', alignItems: 'center', width: 320, height: 26,
                border: `1px solid var(--color-input-border)`, borderRadius: 5,
                overflow: 'hidden',
                background: 'var(--color-input-bg)',
              }}
            >
              <span style={{
                padding: '0 8px', fontSize: 11, color: accent,
                borderRight: '1px solid var(--color-input-border)',
                fontWeight: 600, flexShrink: 0, lineHeight: '24px',
              }}>
                {prefix}
              </span>
              <TextInputView naked placeholder={placeholder} accentColor={accent} style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}
