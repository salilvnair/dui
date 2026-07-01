import { useState } from 'react';
import { SelectTextInputView } from '@/dui';
import type { SelectTextOption } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const HTTP_METHODS: SelectTextOption[] = [
  { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },
  { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },
  { value: 'PUT',    label: 'PUT',    color: 'var(--color-method-put)' },
  { value: 'PATCH',  label: 'PATCH',  color: 'var(--color-method-patch)' },
  { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },
  { value: 'OPTIONS', label: 'OPTIONS', color: 'var(--color-text-muted)' },
];

const GRPC_OPTIONS: SelectTextOption[] = [
  { value: 'unary',            label: 'Unary',            color: 'var(--color-protocol-grpc)' },
  { value: 'server-streaming', label: 'Server Streaming', color: 'var(--color-protocol-grpc)' },
  { value: 'client-streaming', label: 'Client Streaming', color: 'var(--color-protocol-grpc)' },
  { value: 'bidi-streaming',   label: 'Bidirectional',    color: 'var(--color-protocol-grpc)' },
];

const AUTH_TYPE_OPTIONS: SelectTextOption[] = [
  { value: 'bearer',  label: 'Bearer',  color: 'var(--color-warning)' },
  { value: 'basic',   label: 'Basic',   color: 'var(--color-info)' },
  { value: 'api-key', label: 'API Key', color: 'var(--color-protocol-rest)' },
];

const STATUS_OPTIONS: SelectTextOption[] = [
  { value: '200', label: '200', color: 'var(--color-success)' },
  { value: '201', label: '201', color: 'var(--color-success)' },
  { value: '400', label: '400', color: 'var(--color-warning)' },
  { value: '404', label: '404', color: 'var(--color-warning)' },
  { value: '500', label: '500', color: 'var(--color-error)' },
];

export function SelectTextInputViewExamples() {
  const [method, setMethod]         = useState('GET');
  const [url, setUrl]               = useState('https://api.example.com/users');
  const [grpcType, setGrpcType]     = useState('unary');
  const [grpcHost, setGrpcHost]     = useState('grpc.example.com:50051');
  const [authType, setAuthType]     = useState('bearer');
  const [authValue, setAuthValue]   = useState('eyJhbGciOiJIUzI1NiJ9...');
  const [statusCode, setStatusCode] = useState('200');
  const [statusMsg, setStatusMsg]   = useState('OK');

  return (
    <div>
      <ExampleCard
        title="REST URL Bar"
        description="Method dropdown + URL input — the primary input pattern for REST requests"
        code={`<SelectTextInputView
  selectOptions={HTTP_METHODS}
  selectValue={method}
  onSelectChange={setMethod}
  inputValue={url}
  onInputChange={setUrl}
  placeholder="https://api.example.com/users"
  accentColor="var(--color-protocol-rest)"
  width="fullWidth"
/>`}
      >
        <SelectTextInputView
          selectOptions={HTTP_METHODS}
          selectValue={method}
          onSelectChange={setMethod}
          inputValue={url}
          onInputChange={setUrl}
          placeholder="https://api.example.com/users"
          accentColor="var(--color-protocol-rest)"
          width="fullWidth"
        />
      </ExampleCard>

      <ExampleCard
        title="gRPC — Call Type + Host"
        description="Call type selector (Unary / Streaming) + host:port input"
        code={`<SelectTextInputView
  selectOptions={GRPC_OPTIONS}
  selectValue={grpcType}
  onSelectChange={setGrpcType}
  inputValue={grpcHost}
  onInputChange={setGrpcHost}
  placeholder="grpc.example.com:50051"
  accentColor="var(--color-protocol-grpc)"
  width="fullWidth"
/>`}
      >
        <SelectTextInputView
          selectOptions={GRPC_OPTIONS}
          selectValue={grpcType}
          onSelectChange={setGrpcType}
          inputValue={grpcHost}
          onInputChange={setGrpcHost}
          placeholder="grpc.example.com:50051"
          accentColor="var(--color-protocol-grpc)"
          width="fullWidth"
        />
      </ExampleCard>

      <ExampleCard
        title="Auth Type + Token Value"
        description="Auth type picker followed by the token/secret input field"
        code={`<SelectTextInputView
  selectOptions={AUTH_TYPE_OPTIONS}
  selectValue={authType}
  onSelectChange={setAuthType}
  inputValue={authValue}
  onInputChange={setAuthValue}
  placeholder="Paste your token here"
  accentColor="var(--color-warning)"
  width="fullWidth"
/>`}
      >
        <SelectTextInputView
          selectOptions={AUTH_TYPE_OPTIONS}
          selectValue={authType}
          onSelectChange={setAuthType}
          inputValue={authValue}
          onInputChange={setAuthValue}
          placeholder="Paste your token here"
          accentColor="var(--color-warning)"
          width="fullWidth"
        />
      </ExampleCard>

      <ExampleCard
        title="Status Code + Message"
        description="Mock server response editor — status code dropdown + reason phrase input"
        code={`<SelectTextInputView
  selectOptions={STATUS_OPTIONS}
  selectValue={statusCode}
  onSelectChange={setStatusCode}
  inputValue={statusMsg}
  onInputChange={setStatusMsg}
  placeholder="Reason phrase"
  accentColor="var(--color-success)"
  width="fullWidth"
/>`}
      >
        <SelectTextInputView
          selectOptions={STATUS_OPTIONS}
          selectValue={statusCode}
          onSelectChange={setStatusCode}
          inputValue={statusMsg}
          onInputChange={setStatusMsg}
          placeholder="Reason phrase"
          accentColor={statusCode.startsWith('2') ? 'var(--color-success)' : statusCode.startsWith('4') ? 'var(--color-warning)' : 'var(--color-error)'}
          width="fullWidth"
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled / Read-Only URL Bar"
        description="Locked state — e.g. showing a saved request in read-only history view"
        code={`<SelectTextInputView
  selectOptions={HTTP_METHODS}
  selectValue="POST"
  onSelectChange={() => {}}
  inputValue="https://api.example.com/orders"
  onInputChange={() => {}}
  disabled
  width="fullWidth"
/>`}
      >
        <SelectTextInputView
          selectOptions={HTTP_METHODS}
          selectValue="POST"
          onSelectChange={() => {}}
          inputValue="https://api.example.com/orders"
          onInputChange={() => {}}
          disabled
          width="fullWidth"
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md / lg / xl — match surrounding toolbar height"
        code={`<SelectTextInputView selectOptions={opts} selectValue="GET" size="sm" width="fullWidth" ... />
<SelectTextInputView selectOptions={opts} selectValue="GET" size="md" width="fullWidth" ... />
<SelectTextInputView selectOptions={opts} selectValue="GET" size="lg" width="fullWidth" ... />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
            <SelectTextInputView
              key={sz}
              selectOptions={HTTP_METHODS}
              selectValue="GET"
              onSelectChange={() => {}}
              inputValue=""
              onInputChange={() => {}}
              placeholder={`Size: ${sz}`}
              size={sz}
              accentColor="var(--color-protocol-rest)"
              width="fullWidth"
            />
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}
