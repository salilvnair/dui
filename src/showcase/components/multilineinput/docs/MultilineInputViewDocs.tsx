import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function MultilineInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Matches TextInputView exactly, in height and chrome', color: 'var(--color-primary)' },
          { label: 'Rows, not pixel heights', color: 'var(--color-success)' },
          { label: 'Resize off by default', color: 'var(--color-info)' },
          { label: 'Error state shared with the other inputs', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The textarea, wearing the same clothes as the rest of the input family. Every native textarea prop passes through, so this is a drop-in for one that happens to inherit the theme."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'rows', type: 'number', default: '4', description: 'Visible rows.' },
          { name: 'resize', type: "'none' | 'vertical' | 'both'", default: "'none'", description: 'Whether the reader may drag it larger.' },
          { name: 'size', type: "'default' | DuiSize", description: 'Shared size scale.' },
          { name: 'error', type: 'boolean', description: 'Red border.' },
          { name: 'rounded', type: 'boolean', description: 'Token border radius, or square.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Explicit radius override.' },
          { name: 'width', type: 'DuiWidth', description: 'Shared width scale.' },
          { name: 'accentColor', type: 'string', description: 'Focus ring colour.' },
          { name: '…rest', type: 'TextareaHTMLAttributes', description: 'Every native textarea prop — value, onChange, placeholder, disabled, maxLength.' },
        ]} />
      </DocSection>
    </div>
  );
}
