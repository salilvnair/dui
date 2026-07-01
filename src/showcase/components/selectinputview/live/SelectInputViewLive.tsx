import { useState } from 'react';
import { SelectInputView, TextInputView } from '@/dui';
import type { SelectOption } from '@/dui';
import { SCHEMA_LANG_OPTIONS } from '@/services/response';
import { Row } from '../../../shared/Row';

const METHOD_OPTIONS = [
  { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },
  { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },
  { value: 'PUT',    label: 'PUT',    color: 'var(--color-method-put)' },
  { value: 'PATCH',  label: 'PATCH',  color: 'var(--color-method-patch)' },
  { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },
];

export function SelectInputViewLive() {
  const [method, setMethod] = useState('GET');
  const [method2, setMethod2] = useState('POST');
  const [schemaLang, setSchemaLang] = useState('typescript');
  return (
    <div>
      <Row label="Sizes  default · sm · md · lg · xl" code={`<SelectInputView options={options} value={val} onChange={setVal} size="default" />\n<SelectInputView options={options} value={val} onChange={setVal} size="sm" />\n<SelectInputView options={options} value={val} onChange={setVal} size="md" />\n<SelectInputView options={options} value={val} onChange={setVal} size="lg" />\n<SelectInputView options={options} value={val} onChange={setVal} size="xl" />`}>
        <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} size="default" style={{ width: 105 }} />
        <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} size="sm"      style={{ width: 95 }} />
        <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} size="md"      style={{ width: 105 }} />
        <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} size="lg"      style={{ width: 105 }} />
        <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} size="xl"      style={{ width: 105 }} />
      </Row>
      <Row label="Colored options (HTTP methods)" code={`const options = [\n  { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },\n  { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },\n  { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },\n];\n<SelectInputView options={options} value={method} onChange={setMethod} />`}>
        <SelectInputView options={METHOD_OPTIONS} value={method2} onChange={setMethod2} style={{ width: 130 }} />
      </Row>
      <Row label="Grouped with badge chips (Data Schema Generator style)" code={`const options = [\n  { value: 'h1', label: 'TypeScript', isHeader: true },\n  { value: 'typescript', label: 'TypeScript / Interfaces', badge: { label: 'TS', color: 'var(--color-method-put)' } },\n  { value: 'zod', label: 'TypeScript / Zod', badge: { label: 'ZOD', color: 'var(--color-protocol-mqtt)' } },\n  { value: 'h2', label: 'JavaScript', isHeader: true },\n  { value: 'js', label: 'JavaScript / JSDoc', badge: { label: 'JS', color: 'var(--color-warning)' } },\n];\n<SelectInputView options={options} value={val} onChange={setVal} accentColor="var(--color-protocol-ai)" />`}>
        <SelectInputView
          options={SCHEMA_LANG_OPTIONS as SelectOption[]}
          value={schemaLang}
          onChange={setSchemaLang}
          style={{ width: 260 }}
          accentColor="var(--color-protocol-ai)"
        />
      </Row>
      <Row label="Custom accentColor" code={`<SelectInputView options={options} value={val} onChange={setVal} accentColor="var(--color-protocol-graphql)" />\n<SelectInputView options={options} value={val} onChange={setVal} accentColor="var(--color-protocol-soap)" />`}>
        <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} accentColor="var(--color-protocol-graphql)" style={{ width: 130 }} />
        <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} accentColor="var(--color-protocol-soap)" style={{ width: 130 }} />
      </Row>
      <Row label="rounded=false" code={`<SelectInputView options={options} value={val} onChange={setVal} rounded={false} />`}>
        <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} rounded={false} style={{ width: 130 }} />
      </Row>
      <Row label="Aligned with TextInputView — same 26px height" code={`<SelectInputView options={HTTP_METHODS} value={method} onChange={setMethod} style={{ width: 90 }} />\n<TextInputView placeholder="https://api.example.com/users" style={{ flex: 1 }} />`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <SelectInputView options={METHOD_OPTIONS} value={method} onChange={setMethod} style={{ width: 90 }} />
          <TextInputView placeholder="https://api.example.com/users" style={{ flex: 1, width: 300 }} />
        </div>
      </Row>
    </div>
  );
}
