import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function TransferListViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Dual-panel available/selected layout', color: 'var(--color-primary)' },
          { label: 'Checkbox multi-select per panel', color: 'var(--color-success)' },
          { label: 'Move one / move all controls', color: 'var(--color-info)' },
          { label: 'Custom left/right titles', color: 'var(--color-warning)' },
          { label: 'Configurable panel height', color: '#a855f7' },
          { label: 'Accent color for control buttons', color: '#ec4899' },
          { label: 'DUI size + border-radius tokens', color: '#14b8a6' },
          { label: 'Built-in empty-panel placeholder', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'TransferItem[]', required: true, description: 'Full source list of items ({ value, label }) shown across both panels.' },
          { name: 'value', type: 'string[]', required: true, description: "Values currently on the right (\"selected\") side. Controlled — items with a matching value render in the right panel." },
          { name: 'onChange', type: '(value: string[]) => void', required: true, description: 'Called with the updated selected values whenever items move between panels.' },
          { name: 'leftTitle', type: 'string', default: "'Available'", description: 'Header label for the left (unselected) panel. The item count is appended automatically.' },
          { name: 'rightTitle', type: 'string', default: "'Selected'", description: 'Header label for the right (selected) panel. The item count is appended automatically.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size preset controlling row/header font size. Falls back to DuiProvider context when omitted.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Named radius token (none, sm, md, lg, full) or an explicit pixel number applied to both panel containers.' },
          { name: 'color', type: 'string', default: "'var(--color-primary)'", description: 'Accent color for the move-left/move-right control buttons.' },
          { name: 'height', type: 'number', default: '220', description: 'Fixed height in pixels for both list panels.' },
          { name: 'className', type: 'string', default: "''", description: 'Additional class name applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style overrides merged onto the outer flex wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="TransferItem shape">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Unique identifier used for selection matching and onChange payloads.' },
          { name: 'label', type: 'string', required: true, description: 'Human-readable text rendered in the list row.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Selection state is derived purely from value + items: any item.value present in the value array renders on the right. There is no built-in search/filter — for long lists (e.g. hundreds of environment variables), pre-filter the items array yourself before passing it in.
      </DocNote>

      <DocNote type="tip">
        Well suited to permission/role editors, environment-variable export pickers, webhook event-scope subscriptions, and reviewer or team-member assignment screens — anywhere a user chooses a subset from a larger catalog.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TransferListView reads its dimensions from the shared select category base hook (useSelectBase). Omitting size, width, borderRadius, or color on TransferListView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every select-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useSelectBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'item padY 2px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'item padY 3px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'item padY 4px' },
          { size: 'md', height: '28px', font: '11px', desc: 'item padY 5px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'item padY 7px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'item padY 9px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'item padY 11px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'item padY 14px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Select category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every select-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
