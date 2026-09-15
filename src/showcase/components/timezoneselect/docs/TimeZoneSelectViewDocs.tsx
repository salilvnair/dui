import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function TimeZoneSelectViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Every zone the platform knows, searchable', color: 'var(--color-primary)' },
          { label: 'Value is the IANA name — what you store', color: 'var(--color-success)' },
          { label: 'Shares SelectInputView chrome and sizes', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="A time zone picker, and the conversion that makes one useful. The list comes from the platform rather than a bundled table, so it does not go stale the next time a government moves a clock."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'IANA zone name, e.g. Asia/Kolkata.' },
          { name: 'onChange', type: '(timeZone: string) => void', required: true, description: 'Fired with the chosen zone.' },
          { name: 'size', type: 'SelectInputSize', description: 'Shared select size scale.' },
          { name: 'width', type: 'string | number', description: 'Explicit width.' },
          { name: 'color', type: 'string', description: 'Accent.' },
          { name: 'disabled', type: 'boolean', description: 'Non-interactive.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
