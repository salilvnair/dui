import { ColoredTextView } from '@/dui';
import type { ColorToken } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── HTTP status line ─────────────────────────────────────────────────────────
const httpOkTokens: ColorToken[] = [
  { text: 'HTTP/1.1 ', color: 'var(--color-text-muted)', mono: true },
  { text: '200', color: 'var(--color-success)', bold: true, mono: true },
  { text: ' OK', color: 'var(--color-success)', mono: true },
  { text: '  ·  ', color: 'var(--color-text-muted)' },
  { text: '142', color: 'var(--color-text-primary)', bold: true, mono: true },
  { text: ' ms', color: 'var(--color-text-muted)', mono: true },
  { text: '  ·  ', color: 'var(--color-text-muted)' },
  { text: '1.2', color: 'var(--color-text-primary)', bold: true, mono: true },
  { text: ' KB', color: 'var(--color-text-muted)', mono: true },
];

// ─── 500 error status ─────────────────────────────────────────────────────────
const http500Tokens: ColorToken[] = [
  { text: 'HTTP/1.1 ', color: 'var(--color-text-muted)', mono: true },
  { text: '500', color: 'var(--color-error)', bold: true, mono: true },
  { text: ' Internal Server Error', color: 'var(--color-error)', mono: true },
  { text: '  ·  ', color: 'var(--color-text-muted)' },
  { text: '3841', color: 'var(--color-text-primary)', bold: true, mono: true },
  { text: ' ms', color: 'var(--color-text-muted)', mono: true },
];

// ─── gRPC status codes ────────────────────────────────────────────────────────
const grpcTokenSets: ColorToken[][] = [
  [
    { text: 'grpc-status: ', color: 'var(--color-text-muted)', mono: true },
    { text: '0', color: 'var(--color-success)', bold: true, mono: true },
    { text: ' (OK)', color: 'var(--color-success)', mono: true },
  ],
  [
    { text: 'grpc-status: ', color: 'var(--color-text-muted)', mono: true },
    { text: '1', color: 'var(--color-warning)', bold: true, mono: true },
    { text: ' (CANCELLED)', color: 'var(--color-warning)', mono: true },
  ],
  [
    { text: 'grpc-status: ', color: 'var(--color-text-muted)', mono: true },
    { text: '3', color: 'var(--color-error)', bold: true, mono: true },
    { text: ' (INVALID_ARGUMENT)', color: 'var(--color-error)', mono: true },
  ],
  [
    { text: 'grpc-status: ', color: 'var(--color-text-muted)', mono: true },
    { text: '14', color: 'var(--color-error)', bold: true, mono: true },
    { text: ' (UNAVAILABLE)', color: 'var(--color-error)', mono: true },
  ],
];

// ─── Mixed-color response header ──────────────────────────────────────────────
const headerTokens: ColorToken[] = [
  { text: 'Content-Type', color: 'var(--color-info)', bold: true, mono: true },
  { text: ': ', color: 'var(--color-text-muted)', mono: true },
  { text: 'application/json', color: 'var(--color-success)', mono: true },
  { text: '; ', color: 'var(--color-text-muted)', mono: true },
  { text: 'charset', color: 'var(--color-info)', mono: true },
  { text: '=', color: 'var(--color-text-muted)', mono: true },
  { text: 'utf-8', color: 'var(--color-warning)', mono: true },
];

// ─── SOAP fault code ──────────────────────────────────────────────────────────
const soapFaultTokens: ColorToken[] = [
  { text: '<', color: 'var(--color-text-muted)', mono: true },
  { text: 'soap:Fault', color: 'var(--color-protocol-soap)', bold: true, mono: true },
  { text: '>', color: 'var(--color-text-muted)', mono: true },
  { text: '  faultcode: ', color: 'var(--color-text-muted)', mono: true },
  { text: 'soap:Server', color: 'var(--color-error)', bold: true, mono: true },
  { text: '  faultstring: ', color: 'var(--color-text-muted)', mono: true },
  { text: '"Service unavailable"', color: 'var(--color-error)', mono: true, italic: true },
];

// ─── Copyable token ───────────────────────────────────────────────────────────
const copyableTokens: ColorToken[] = [
  { text: 'Request ID: ', color: 'var(--color-text-muted)', mono: true },
  { text: 'req_abc123def456', color: 'var(--color-accent)', mono: true, bold: true, copyable: true },
  { text: '  (click to copy)', color: 'var(--color-text-muted)', italic: true },
];

// ─── Export ───────────────────────────────────────────────────────────────────
export function ColoredTextViewExamples() {
  return (
    <div>
      <ExampleCard
        title="HTTP Status Line — 200 OK"
        description="Status code + message in green, timing and size in muted mono"
        code={`<ColoredTextView tokens={[
  { text: 'HTTP/1.1 ', color: 'var(--color-text-muted)', mono: true },
  { text: '200',       color: 'var(--color-success)', bold: true, mono: true },
  { text: ' OK',       color: 'var(--color-success)', mono: true },
]} />`}
      >
        <ColoredTextView tokens={httpOkTokens} fontSize="13px" />
      </ExampleCard>

      <ExampleCard
        title="HTTP Status Line — 500 Error"
        description="Error code and message rendered in error red"
        code={`<ColoredTextView tokens={[
  { text: '500',                      color: 'var(--color-error)', bold: true, mono: true },
  { text: ' Internal Server Error',   color: 'var(--color-error)', mono: true },
]} />`}
      >
        <ColoredTextView tokens={http500Tokens} fontSize="13px" />
      </ExampleCard>

      <ExampleCard
        title="gRPC Status Codes"
        description="OK → success, CANCELLED → warning, INVALID_ARGUMENT / UNAVAILABLE → error"
        code={`[0 OK, 1 CANCELLED, 3 INVALID_ARGUMENT, 14 UNAVAILABLE]
// each rendered as separate ColoredTextView with status-specific colors`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {grpcTokenSets.map((tokens, i) => (
            <ColoredTextView key={i} tokens={tokens} fontSize="12px" />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Mixed-Color Response Header"
        description="Header name (info), value (success), charset param (warning) — all in one line"
        code={`<ColoredTextView tokens={[
  { text: 'Content-Type',      color: 'var(--color-info)',    bold: true, mono: true },
  { text: ': application/json',color: 'var(--color-success)', mono: true },
  { text: '; charset=utf-8',   color: 'var(--color-warning)', mono: true },
]} />`}
      >
        <ColoredTextView tokens={headerTokens} fontSize="12px" />
      </ExampleCard>

      <ExampleCard
        title="SOAP Fault Code"
        description="Protocol-specific color for tag names, error color for fault code/string"
        code={`<ColoredTextView tokens={[
  { text: 'soap:Fault',          color: 'var(--color-protocol-soap)', bold: true, mono: true },
  { text: '  faultcode: ',       color: 'var(--color-text-muted)',    mono: true },
  { text: 'soap:Server',         color: 'var(--color-error)',         bold: true, mono: true },
]} />`}
      >
        <ColoredTextView tokens={soapFaultTokens} fontSize="12px" />
      </ExampleCard>

      <ExampleCard
        title="Copyable Token"
        description="copyable=true — click the highlighted value to copy it to the clipboard"
        code={`<ColoredTextView tokens={[
  { text: 'Request ID: ',        color: 'var(--color-text-muted)' },
  { text: 'req_abc123def456',    color: 'var(--color-accent)', copyable: true },
]} />`}
      >
        <ColoredTextView tokens={copyableTokens} fontSize="12px" />
      </ExampleCard>
    </div>
  );
}
