import { useState } from 'react';
import { MergedInputView } from '@/dui';
import type { MergedInputSegment } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function MergedInputViewExamples() {
  const [soapVersion, setSoapVersion] = useState('1.1');
  const [soapUrl, setSoapUrl] = useState('https://{{wsdlHost}}/service.asmx');

  const [grpcHost, setGrpcHost] = useState('localhost');
  const [grpcPort, setGrpcPort] = useState('50051');

  const [authScheme, setAuthScheme] = useState('Bearer');
  const [authToken, setAuthToken] = useState('{{authToken}}');

  const [method, setMethod] = useState('GET');
  const [reqUrl, setReqUrl] = useState('https://api.example.com/users');
  const [timeout, setTimeout] = useState('30');

  const SOAP_SEGMENTS: MergedInputSegment[] = [
    {
      type: 'select',
      value: soapVersion,
      options: [
        { value: '1.1', label: 'SOAP 1.1', color: 'var(--color-protocol-soap)' },
        { value: '1.2', label: 'SOAP 1.2', color: 'var(--color-protocol-soap)' },
      ],
      onChange: setSoapVersion,
      width: 96,
    },
    { type: 'divider' },
    { type: 'text', value: soapUrl, onChange: setSoapUrl, placeholder: 'https://…/service.wsdl', flex: 1 },
  ];

  const GRPC_SEGMENTS: MergedInputSegment[] = [
    { type: 'text', value: grpcHost, onChange: setGrpcHost, placeholder: 'hostname', flex: 1 },
    { type: 'divider' },
    { type: 'text', value: grpcPort, onChange: setGrpcPort, placeholder: '50051' },
  ];

  const AUTH_SEGMENTS: MergedInputSegment[] = [
    {
      type: 'select',
      value: authScheme,
      options: [
        { value: 'Bearer', label: 'Bearer' },
        { value: 'Basic', label: 'Basic' },
        { value: 'ApiKey', label: 'API Key' },
        { value: 'HMAC', label: 'HMAC' },
      ],
      onChange: setAuthScheme,
      width: 88,
    },
    { type: 'divider' },
    { type: 'text', value: authToken, onChange: setAuthToken, placeholder: 'token or credential', flex: 1 },
  ];

  const METHOD_SEGMENTS: MergedInputSegment[] = [
    {
      type: 'select',
      value: method,
      options: [
        { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },
        { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },
        { value: 'PUT',    label: 'PUT',    color: 'var(--color-method-put)' },
        { value: 'PATCH',  label: 'PATCH',  color: 'var(--color-method-patch)' },
        { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },
      ],
      onChange: setMethod,
      width: 80,
    },
    { type: 'divider' },
    { type: 'text', value: reqUrl, onChange: setReqUrl, placeholder: 'https://…', flex: 1 },
    { type: 'divider' },
    { type: 'text', value: timeout, onChange: setTimeout, placeholder: 'timeout (s)' },
  ];

  const READONLY_SEGMENTS: MergedInputSegment[] = [
    {
      type: 'select',
      value: 'GET',
      options: [{ value: 'GET', label: 'GET', color: 'var(--color-method-get)' }],
      onChange: () => {},
      width: 80,
    },
    { type: 'divider' },
    { type: 'text', value: 'https://api.example.com/users', onChange: () => {}, placeholder: '', flex: 1 },
  ];

  return (
    <div>
      <ExampleCard
        title="SOAP Version + URL"
        description="Dropdown for SOAP version (1.1 / 1.2) fused with the WSDL URL input"
        code={`<MergedInputView segments={[{ type:'select', value:'1.1', options:[...], ... }, { type:'divider' }, { type:'text', ... }]} />`}
      >
        <MergedInputView segments={SOAP_SEGMENTS} accentColor="var(--color-protocol-soap)" />
      </ExampleCard>

      <ExampleCard
        title="gRPC Host + Port"
        description="Two text segments separated by a divider — hostname and port number"
        code={`<MergedInputView segments={[{ type:'text', value:host, flex:1 }, { type:'divider' }, { type:'text', value:port }]} />`}
      >
        <MergedInputView segments={GRPC_SEGMENTS} accentColor="var(--color-protocol-grpc)" />
      </ExampleCard>

      <ExampleCard
        title="Auth Scheme + Token"
        description="Bearer / Basic / API Key / HMAC scheme picker fused with the credential input"
        code={`<MergedInputView segments={[{ type:'select', ... }, { type:'divider' }, { type:'text', ... }]} />`}
      >
        <MergedInputView segments={AUTH_SEGMENTS} accentColor="var(--color-primary)" />
      </ExampleCard>

      <ExampleCard
        title="Method + URL + Timeout"
        description="Three-segment bar: HTTP method selector, URL input, timeout field"
        code={`<MergedInputView segments={[method-select, divider, url-text, divider, timeout-text]} />`}
      >
        <MergedInputView segments={METHOD_SEGMENTS} />
      </ExampleCard>

      <ExampleCard
        title="Read-Only Merged Bar"
        description="disabled prop locks all segments — useful in preview / history views"
        code={`<MergedInputView segments={segments} disabled />`}
      >
        <MergedInputView segments={READONLY_SEGMENTS} disabled />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="size prop scales all segment heights and font sizes uniformly"
        code={`<MergedInputView segments={segments} size="sm" />
<MergedInputView segments={segments} size="md" />
<MergedInputView segments={segments} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 10, color: 'var(--color-text-muted)', width: 20 }}>{s}</span>
              <MergedInputView segments={SOAP_SEGMENTS} size={s} />
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}
