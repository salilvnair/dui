import { useState } from 'react';
import { ChipView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ChipsViewExamples() {
  const [activeMethod, setActiveMethod] = useState('GET');
  const [activeFilters, setActiveFilters] = useState<string[]>(['auth']);

  const toggleFilter = (f: string) =>
    setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  return (
    <div>
      <ExampleCard
        title="HTTP Method Chips"
        description="Colored chip badges for HTTP methods in API request lists"
        code={`<ChipView label="GET"    color="var(--color-method-get)"    size="sm" />
<ChipView label="POST"   color="var(--color-method-post)"   size="sm" />
<ChipView label="PUT"    color="var(--color-method-put)"    size="sm" />
<ChipView label="PATCH"  color="var(--color-method-patch)"  size="sm" />
<ChipView label="DELETE" color="var(--color-method-delete)" size="sm" />`}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <ChipView label="GET"     color="var(--color-method-get)"    size="sm" />
          <ChipView label="POST"    color="var(--color-method-post)"   size="sm" />
          <ChipView label="PUT"     color="var(--color-method-put)"    size="sm" />
          <ChipView label="PATCH"   color="var(--color-method-patch)"  size="sm" />
          <ChipView label="DELETE"  color="var(--color-method-delete)" size="sm" />
          <ChipView label="OPTIONS" color="var(--color-text-muted)"    size="sm" />
          <ChipView label="HEAD"    color="var(--color-text-muted)"    size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="HTTP Status Code Chips"
        description="Semantic colors for response status codes in the response panel"
        code={`<ChipView label="200 OK"          color="var(--color-success)" active />
<ChipView label="301 Moved"       color="var(--color-info)"    active />
<ChipView label="404 Not Found"   color="var(--color-warning)" active />
<ChipView label="500 Server Error" color="var(--color-error)"  active />`}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <ChipView label="200 OK"           color="var(--color-success)" active />
          <ChipView label="201 Created"      color="var(--color-success)" active />
          <ChipView label="204 No Content"   color="var(--color-success)" />
          <ChipView label="301 Moved"        color="var(--color-info)"    active />
          <ChipView label="400 Bad Request"  color="var(--color-warning)" active />
          <ChipView label="404 Not Found"    color="var(--color-warning)" active />
          <ChipView label="500 Server Error" color="var(--color-error)"   active />
          <ChipView label="503 Unavailable"  color="var(--color-error)"   active />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Protocol Chips"
        description="Protocol identifiers for request tabs and collection items"
        code={`<ChipView label="REST"    color="var(--color-protocol-rest)"      size="sm" />
<ChipView label="GQL"     color="var(--color-protocol-graphql)"   size="sm" />
<ChipView label="WS"      color="var(--color-protocol-websocket)" size="sm" />
<ChipView label="gRPC"    color="var(--color-protocol-grpc)"      size="sm" />
<ChipView label="SOAP"    color="var(--color-protocol-soap)"      size="sm" />`}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <ChipView label="REST"  color="var(--color-protocol-rest)"      size="sm" />
          <ChipView label="GQL"   color="var(--color-protocol-graphql)"   size="sm" />
          <ChipView label="WS"    color="var(--color-protocol-websocket)" size="sm" />
          <ChipView label="gRPC"  color="var(--color-protocol-grpc)"      size="sm" />
          <ChipView label="SOAP"  color="var(--color-protocol-soap)"      size="sm" />
          <ChipView label="MQTT"  color="var(--color-protocol-mqtt)"      size="sm" />
          <ChipView label="SSE"   color="var(--color-protocol-sse)"       size="sm" />
          <ChipView label="MCP"   color="var(--color-protocol-mcp)"       size="sm" />
          <ChipView label="AI"    color="var(--color-protocol-ai)"        size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Filter Tag Chips (interactive)"
        description="Clickable filter chips in a toolbar — click to toggle active state"
        code={`const [active, setActive] = useState<string[]>(['auth']);
const toggle = (f: string) =>
  setActive(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

<ChipView label="Auth"    active={active.includes('auth')}    onClick={() => toggle('auth')}    color="var(--color-warning)" />
<ChipView label="Errors"  active={active.includes('errors')}  onClick={() => toggle('errors')}  color="var(--color-error)" />`}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'auth',    label: 'Auth',      color: 'var(--color-warning)' },
            { id: 'errors',  label: 'Errors',    color: 'var(--color-error)' },
            { id: 'slow',    label: '> 500ms',   color: 'var(--color-info)' },
            { id: 'cached',  label: 'Cached',    color: 'var(--color-success)' },
            { id: 'mocked',  label: 'Mocked',    color: 'var(--color-protocol-mqtt)' },
          ].map(f => (
            <ChipView
              key={f.id}
              label={f.label}
              color={f.color}
              active={activeFilters.includes(f.id)}
              onClick={() => toggleFilter(f.id)}
              size="sm"
            />
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Active: {activeFilters.length > 0 ? activeFilters.join(', ') : 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Clickable Method Selector"
        description="Use chips as a single-select method pill group"
        code={`const [active, setActive] = useState('GET');
{methods.map(m => (
  <ChipView
    key={m.value}
    label={m.value}
    color={m.color}
    active={active === m.value}
    onClick={() => setActive(m.value)}
    size="sm"
  />
))}`}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { value: 'GET',    color: 'var(--color-method-get)' },
            { value: 'POST',   color: 'var(--color-method-post)' },
            { value: 'PUT',    color: 'var(--color-method-put)' },
            { value: 'PATCH',  color: 'var(--color-method-patch)' },
            { value: 'DELETE', color: 'var(--color-method-delete)' },
          ].map(m => (
            <ChipView
              key={m.value}
              label={m.value}
              color={m.color}
              active={activeMethod === m.value}
              onClick={() => setActiveMethod(m.value)}
              size="sm"
            />
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Selected: <strong style={{ color: 'var(--color-text-primary)' }}>{activeMethod}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md sizes for different UI densities"
        code={`<ChipView label="xs" size="xs" color="var(--color-primary)" />
<ChipView label="sm" size="sm" color="var(--color-primary)" />
<ChipView label="md" size="md" color="var(--color-primary)" />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <ChipView label="xs" size="xs" color="var(--color-primary)" />
          <ChipView label="sm" size="sm" color="var(--color-primary)" />
          <ChipView label="md" size="md" color="var(--color-primary)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Active vs Outlined"
        description="active=true fills the chip; default is outlined"
        code={`<ChipView label="Active"   color="var(--color-success)" active />
<ChipView label="Outlined" color="var(--color-success)" />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <ChipView label="Active"   color="var(--color-success)"          active size="sm" />
          <ChipView label="Outlined" color="var(--color-success)"                 size="sm" />
          <ChipView label="Active"   color="var(--color-protocol-graphql)" active size="sm" />
          <ChipView label="Outlined" color="var(--color-protocol-graphql)"        size="sm" />
          <ChipView label="Active"   color="var(--color-error)"            active size="sm" />
          <ChipView label="Outlined" color="var(--color-error)"                   size="sm" />
        </div>
      </ExampleCard>
    </div>
  );
}
