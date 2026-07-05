import { useState } from 'react';
import { SelectTextInputView } from '@/dui';
import type { SelectTextOption } from '@/dui';
import { Row } from '../../../shared/Row';

const ST_HTTP_METHODS: SelectTextOption[] = [
  { value: 'GET',     label: 'GET',     color: 'var(--color-method-get)' },
  { value: 'POST',    label: 'POST',    color: 'var(--color-method-post)' },
  { value: 'PUT',     label: 'PUT',     color: 'var(--color-method-put)' },
  { value: 'PATCH',   label: 'PATCH',   color: 'var(--color-method-patch)' },
  { value: 'DELETE',  label: 'DELETE',  color: 'var(--color-method-delete)' },
  { value: 'OPTIONS', label: 'OPTIONS', color: 'var(--color-text-muted)' },
  { value: 'HEAD',    label: 'HEAD',    color: 'var(--color-text-muted)' },
];

const ST_SOAP_METHODS: SelectTextOption[] = [
  { value: 'SOAP11', label: 'SOAP 1.1', color: 'var(--color-protocol-soap)' },
  { value: 'SOAP12', label: 'SOAP 1.2', color: 'var(--color-protocol-soap)' },
];

const ST_PROTOCOL_OPTIONS: SelectTextOption[] = [
  { value: 'REST',      label: 'REST',      color: 'var(--color-protocol-rest)' },
  { value: 'GraphQL',   label: 'GraphQL',   color: 'var(--color-protocol-graphql)' },
  { value: 'WebSocket', label: 'WebSocket', color: 'var(--color-protocol-ws)' },
  { value: 'gRPC',      label: 'gRPC',      color: 'var(--color-protocol-grpc)' },
  { value: 'SOAP',      label: 'SOAP',      color: 'var(--color-protocol-soap)' },
];

function SoapUrlBarDemo({ accentColor }: { accentColor: string }) {
  const [version, setVersion] = useState<'1.1' | '1.2'>('1.1');
  const [endpoint, setEndpoint] = useState('https://service.example.com/endpoint');
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
      padding: '8px', background: 'var(--color-panel)',
      border: '1px solid var(--color-surface-border)', borderRadius: 8,
    }}>
      <button
        type="button"
        onClick={() => setVersion(v => v === '1.1' ? '1.2' : '1.1')}
        title="Click to toggle SOAP version"
        style={{
          height: 28, padding: '0 10px', borderRadius: 5, border: 'none', cursor: 'pointer',
          background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
          color: accentColor, fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', flexShrink: 0,
          transition: 'background 120ms',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = `color-mix(in srgb, ${accentColor} 25%, transparent)`}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = `color-mix(in srgb, ${accentColor} 15%, transparent)`}
      >{version}</button>
      <button
        type="button"
        style={{
          height: 28, padding: '0 10px', borderRadius: 5, border: `1px solid color-mix(in srgb, ${accentColor} 40%, transparent)`,
          background: `color-mix(in srgb, ${accentColor} 8%, transparent)`,
          color: accentColor, fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
        }}
      >WSDL</button>
      <div style={{
        flex: 1, height: 28, background: 'var(--color-input-bg)', border: '1px solid var(--color-input-border)',
        borderRadius: 5, display: 'flex', alignItems: 'center', padding: '0 8px',
      }}>
        <input
          value={endpoint} onChange={e => setEndpoint(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 12, color: 'var(--color-text-primary)', fontFamily: 'inherit' }}
          placeholder="Service endpoint URL"
        />
      </div>
    </div>
  );
}

export function SelectTextInputViewLive() {
  const [method, setMethod]       = useState('GET');
  const [url, setUrl]             = useState('https://api.example.com/users');
  const [method2, setMethod2]     = useState('POST');
  const [url2, setUrl2]           = useState('');
  const [smMethod, setSmMethod]   = useState('GET');
  const [mdMethod, setMdMethod]   = useState('POST');
  const [lgMethod, setLgMethod]   = useState('PUT');
  const [proto, setProto]         = useState('REST');
  const [protoUrl, setProtoUrl]   = useState('');

  return (
    <div>
      <Row label="REST — HTTP method + URL (request bar style)" gap={0} code={`<SelectTextInputView\n  selectValue={method}\n  selectOptions={HTTP_METHODS}  // colored GET/POST/PUT/PATCH/DELETE\n  onSelectChange={setMethod}\n  inputValue={url}\n  onInputChange={setUrl}\n  size="md"\n  placeholder="Enter URL or paste text"\n/>`}>
        <div style={{ width: '100%' }}>
          <SelectTextInputView
            selectValue={method} selectOptions={ST_HTTP_METHODS} onSelectChange={setMethod}
            inputValue={url} onInputChange={setUrl}
            size="md" placeholder="Enter URL or paste text"
          />
        </div>
      </Row>
      <Row label="Sizes — sm (26px) / md (34px) / lg (40px) — change method to see live update" align="flex-start" code={`// Each size is independent — change method in the dropdown to see live update\n<SelectTextInputView size="sm" selectValue={smMethod} onSelectChange={setSmMethod} ... />\n<SelectTextInputView size="md" selectValue={mdMethod} onSelectChange={setMdMethod} ... />\n<SelectTextInputView size="lg" selectValue={lgMethod} onSelectChange={setLgMethod} ... />`}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SelectTextInputView
            selectValue={smMethod} selectOptions={ST_HTTP_METHODS} onSelectChange={setSmMethod}
            inputValue="" onInputChange={() => {}} size="sm" placeholder="Small (26px) — change method ↑"
          />
          <SelectTextInputView
            selectValue={mdMethod} selectOptions={ST_HTTP_METHODS} onSelectChange={setMdMethod}
            inputValue="" onInputChange={() => {}} size="md" placeholder="Medium (34px — default) — change method ↑"
          />
          <SelectTextInputView
            selectValue={lgMethod} selectOptions={ST_HTTP_METHODS} onSelectChange={setLgMethod}
            inputValue="" onInputChange={() => {}} size="lg" placeholder="Large (40px) — change method ↑"
          />
        </div>
      </Row>
      <Row label="POST — empty URL with placeholder" gap={0} code={`<SelectTextInputView\n  selectValue={method}\n  selectOptions={HTTP_METHODS}\n  onSelectChange={setMethod}\n  inputValue={url}\n  onInputChange={setUrl}\n  placeholder="Enter request URL…"\n/>`}>
        <div style={{ width: '100%' }}>
          <SelectTextInputView
            selectValue={method2} selectOptions={ST_HTTP_METHODS} onSelectChange={setMethod2}
            inputValue={url2} onInputChange={setUrl2}
            placeholder="Enter request URL…"
          />
        </div>
      </Row>
      <Row label="SOAP URL bar — version toggle (1.1/1.2) + WSDL button + endpoint (matches Daakia SoapUrlBar)" align="flex-start" code={`// In Daakia, SOAP version is a toggle pill (1.1 ↔ 1.2), not a dropdown\n// [1.1] [WSDL] [endpoint input] [Operation selector] [Invoke]\n<SelectTextInputView\n  selectValue={soapVersion}\n  selectOptions={ST_SOAP_METHODS}\n  onSelectChange={setSoapVersion}\n  inputValue={wsdlUrl}\n  onInputChange={setWsdlUrl}\n  placeholder="WSDL URL"\n  accentColor="var(--color-protocol-soap)"\n/>`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <div style={{ fontSize: 10, color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>DAAKIA SOAP URL BAR (click version pill to toggle):</div>
          <SoapUrlBarDemo accentColor="var(--color-protocol-soap)" />
          <div style={{ fontSize: 10, color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginTop: 4 }}>SELECTTEXTINPUTVIEW VARIANT (dropdown style):</div>
          <SelectTextInputView
            selectValue={ST_SOAP_METHODS[0].value} selectOptions={ST_SOAP_METHODS} onSelectChange={() => {}}
            inputValue="" onInputChange={() => {}}
            placeholder="WSDL URL"
            selectWidth={100}
            accentColor="var(--color-protocol-soap)"
          />
        </div>
      </Row>
      <Row label="Protocol switcher — generic" gap={0} code={`<SelectTextInputView\n  selectValue={proto}\n  selectOptions={[\n    { value: 'REST',      label: 'REST',      color: 'var(--color-protocol-rest)' },\n    { value: 'GraphQL',   label: 'GraphQL',   color: 'var(--color-protocol-graphql)' },\n    { value: 'WebSocket', label: 'WebSocket', color: 'var(--color-protocol-ws)' },\n  ]}\n  onSelectChange={setProto}\n  inputValue={url}\n  onInputChange={setUrl}\n  placeholder="Endpoint URL"\n  selectWidth={100}\n/>`}>
        <div style={{ width: '100%' }}>
          <SelectTextInputView
            selectValue={proto} selectOptions={ST_PROTOCOL_OPTIONS} onSelectChange={setProto}
            inputValue={protoUrl} onInputChange={setProtoUrl}
            placeholder="Endpoint URL"
            selectWidth={100}
          />
        </div>
      </Row>
    </div>
  );
}
