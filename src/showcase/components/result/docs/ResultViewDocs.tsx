import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ResultViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '6 outcome statuses', color: 'var(--color-primary)' },
          { label: 'Icon states + numeric code states (404/403)', color: 'var(--color-success)' },
          { label: 'Optional subtitle', color: 'var(--color-info)' },
          { label: 'Actions slot for recovery buttons', color: 'var(--color-warning)' },
          { label: 'Centered full-page layout', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'status', type: 'ResultStatus', required: true, description: 'Which outcome state to render — determines icon/code and accent color.' },
          { name: 'title', type: 'string', required: true, description: 'Primary heading describing the outcome.' },
          { name: 'subtitle', type: 'string', description: 'Secondary explanatory text below the title, max-width constrained for readability.' },
          { name: 'actions', type: 'ReactNode', description: 'Buttons or links rendered in a row below the subtitle, e.g. retry / go back.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font/icon scale and internal gap spacing. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer centered container.' },
        ]} />
      </DocSection>

      <DocSection title="ResultStatus enum">
        <EnumTable name="ResultStatus" values={[
          { value: 'success', description: 'Checkmark icon, success color — completed action.', color: 'var(--color-success)' },
          { value: 'error', description: 'Close icon, error color — failed action.', color: 'var(--color-error)' },
          { value: 'warning', description: 'Warning triangle icon, warning color — deprecated / risky.', color: 'var(--color-warning)' },
          { value: 'info', description: 'Info icon, info color — informational notice.', color: 'var(--color-info)' },
          { value: '404', description: 'Large "404" code, muted color — resource not found.', color: 'var(--color-text-muted)' },
          { value: '403', description: 'Large "403" code, muted color — access forbidden.', color: 'var(--color-text-muted)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        404 and 403 render a large numeric code instead of an icon (STATUS_CONFIG has icon: null for these), matching classic HTTP error pages. All other statuses render a 40px icon.
      </DocNote>

      <DocNote type="tip">
        ResultView is meant to fill its container — use it as the sole content of an empty page, panel, or modal body rather than inline within a list or card.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ResultView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on ResultView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDisplayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'icon 8px' },
          { size: 'xs', height: '—', font: '9px', desc: 'icon 10px' },
          { size: 'sm', height: '—', font: '10px', desc: 'icon 11px' },
          { size: 'md', height: '—', font: '11px', desc: 'icon 12px' },
          { size: 'lg', height: '—', font: '12px', desc: 'icon 14px' },
          { size: 'xl', height: '—', font: '13px', desc: 'icon 16px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'icon 18px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'icon 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Display category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every display-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
