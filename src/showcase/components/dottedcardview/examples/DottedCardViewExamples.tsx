import { useState } from 'react';
import { DottedCardView, TextInputView, CheckboxView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Proxy Settings ───────────────────────────────────────────────────────────
function ProxySettingsDemo() {
  const [enabled, setEnabled] = useState(false);
  const [useSystem, setUseSystem] = useState(false);
  return (
    <DottedCardView
      title="Proxy Settings"
      expandable
      defaultExpanded={false}
      accentColor="var(--color-protocol-rest)"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CheckboxView label="Enable proxy" checked={enabled} onChange={setEnabled} size="md" />
        <TextInputView placeholder="127.0.0.1" size="md" />
        <TextInputView placeholder="8080" size="md" />
        <CheckboxView label="Use system proxy settings" checked={useSystem} onChange={setUseSystem} size="md" />
      </div>
    </DottedCardView>
  );
}

// ─── Advanced TLS Options (expanded by default) ───────────────────────────────
function TlsOptionsDemo() {
  const [verifySSL, setVerifySSL] = useState(true);
  const [clientCert, setClientCert] = useState(false);
  const [selfSigned, setSelfSigned] = useState(false);
  return (
    <DottedCardView
      title="Advanced TLS Options"
      expandable
      defaultExpanded
      accentColor="var(--color-protocol-grpc)"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CheckboxView label="Verify SSL certificate" checked={verifySSL} onChange={setVerifySSL} size="md" />
        <CheckboxView label="Enable client certificate authentication" checked={clientCert} onChange={setClientCert} size="md" />
        <TextInputView placeholder="TLS 1.2" size="md" />
        <CheckboxView label="Allow self-signed certificates" checked={selfSigned} onChange={setSelfSigned} size="md" />
      </div>
    </DottedCardView>
  );
}

// ─── Request Certificates ─────────────────────────────────────────────────────
function CertificatesDemo() {
  return (
    <DottedCardView
      title="Client Certificates"
      expandable
      defaultExpanded={false}
      accentColor="var(--color-warning)"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <TextInputView placeholder="Select or drag a file…" size="md" />
        <TextInputView placeholder="Select or drag a file…" size="md" />
        <TextInputView placeholder="Leave blank if not protected" size="md" />
      </div>
    </DottedCardView>
  );
}

// ─── Custom Timeout ───────────────────────────────────────────────────────────
function TimeoutDemo() {
  const [disableTimeout, setDisableTimeout] = useState(false);
  return (
    <DottedCardView
      title="Request Timeout"
      expandable
      defaultExpanded
      accentColor="var(--color-text-muted)"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <TextInputView placeholder="5000" size="md" />
        <TextInputView placeholder="30000" size="md" />
        <CheckboxView label="Disable timeout (wait indefinitely)" checked={disableTimeout} onChange={setDisableTimeout} size="md" />
      </div>
    </DottedCardView>
  );
}

// ─── Non-expandable plain card ────────────────────────────────────────────────
function PlainCardDemo() {
  return (
    <DottedCardView
      title="Request Notes"
      accentColor="var(--color-protocol-soap)"
    >
      <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        SOAP requests require a properly formatted envelope. Make sure your WSDL endpoint is reachable before
        sending. The SOAPAction header may be required by some services.
      </p>
    </DottedCardView>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function DottedCardViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Proxy Settings (collapsed by default)"
        description="expandable + defaultExpanded=false — section starts closed"
        code={`<DottedCardView title="Proxy Settings" expandable defaultExpanded={false}
  accentColor="var(--color-protocol-rest)">
  <CheckboxView label="Enable proxy" checked={enabled} onChange={setEnabled} size="md" />
  <TextInputView placeholder="127.0.0.1" size="md" />
</DottedCardView>`}
      >
        <ProxySettingsDemo />
      </ExampleCard>

      <ExampleCard
        title="Advanced TLS Options (expanded by default)"
        description="expandable + defaultExpanded — section starts open"
        code={`<DottedCardView title="Advanced TLS Options" expandable defaultExpanded
  accentColor="var(--color-protocol-grpc)">
  <CheckboxView label="Verify SSL certificate" checked={verifySSL} onChange={setVerifySSL} size="md" />
</DottedCardView>`}
      >
        <TlsOptionsDemo />
      </ExampleCard>

      <ExampleCard
        title="Request Client Certificates"
        description="File path inputs for PEM, key, and optional passphrase"
        code={`<DottedCardView title="Client Certificates" expandable defaultExpanded={false}
  accentColor="var(--color-warning)">
  <TextInputView ... />
</DottedCardView>`}
      >
        <CertificatesDemo />
      </ExampleCard>

      <ExampleCard
        title="Custom Timeout Section"
        description="Connection and read timeout inputs with a disable checkbox"
        code={`<DottedCardView title="Request Timeout" expandable defaultExpanded>
  <TextInputView placeholder="5000" size="md" />
  <TextInputView placeholder="30000" size="md" />
  <CheckboxView label="Disable timeout" checked={disableTimeout} onChange={setDisableTimeout} size="md" />
</DottedCardView>`}
      >
        <TimeoutDemo />
      </ExampleCard>

      <ExampleCard
        title="Non-Expandable Plain Card"
        description="No expandable prop — always visible, dashed border only"
        code={`<DottedCardView title="Request Notes" accentColor="var(--color-protocol-soap)">
  <p>Informational note about SOAP envelopes.</p>
</DottedCardView>`}
      >
        <PlainCardDemo />
      </ExampleCard>
    </div>
  );
}
