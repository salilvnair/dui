import { useState } from 'react';
import { SwatchPickerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const METHODS = [
  { id: 'get', label: 'GET', color: 'var(--color-success)' },
  { id: 'post', label: 'POST', color: 'var(--color-primary)' },
  { id: 'put', label: 'PUT', color: 'var(--color-info)' },
  { id: 'patch', label: 'PATCH', color: 'var(--color-warning)' },
  { id: 'delete', label: 'DELETE', color: 'var(--color-error)' },
];

const THEMES = [
  { id: 'indigo', label: 'Indigo', color: '#6366f1' },
  { id: 'teal', label: 'Teal', color: '#2ad4a8' },
  { id: 'rose', label: 'Rose', color: '#f43f5e' },
  { id: 'amber', label: 'Amber', color: '#f59e0b' },
  { id: 'violet', label: 'Violet', color: '#a855f7' },
  { id: 'sky', label: 'Sky', color: '#38bdf8' },
];

export function SwatchPickerViewExamples() {
  const [method, setMethod] = useState('get');
  const [theme, setTheme] = useState('indigo');
  const [big, setBig] = useState('teal');

  return (
    <>
      <ExampleCard
        title="Pick a colour"
        description="The label is the tooltip and the accessible name — never visible text, so the row stays a row of colour"
        code={'<SwatchPickerView options={THEMES} value={theme} onChange={setTheme} />'}
      >
        <SwatchPickerView options={THEMES} value={theme} onChange={setTheme} />
      </ExampleCard>

      <ExampleCard
        title="With initials"
        description="For options whose colour alone is not enough to tell them apart"
        code={'<SwatchPickerView options={METHODS} value={m} onChange={setM} initials />'}
      >
        <SwatchPickerView options={METHODS} value={method} onChange={setMethod} initials />
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="One number, in px"
        code={'<SwatchPickerView size={28} … />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SwatchPickerView options={THEMES} value={big} onChange={setBig} size={14} />
          <SwatchPickerView options={THEMES} value={big} onChange={setBig} size={20} />
          <SwatchPickerView options={THEMES} value={big} onChange={setBig} size={28} />
        </div>
      </ExampleCard>
    </>
  );
}
