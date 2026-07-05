import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function BreadcrumbViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Path trail with chevron separators', color: 'var(--color-primary)' },
          { label: 'Overflow-collapse into "…"', color: 'var(--color-success)' },
          { label: 'Click-to-expand collapsed items', color: 'var(--color-info)' },
          { label: 'Clickable intermediate segments', color: 'var(--color-warning)' },
          { label: 'Accent-colored active (final) segment', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'BreadcrumbItem[]', required: true, description: 'Path segments in order, first to last.' },
          { name: 'maxVisible', type: 'number', default: '4', description: 'When items.length exceeds this, the middle segments collapse into a clickable "…" that expands the full path.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size.' },
          { name: 'color', type: 'string', description: 'Accent color applied to the final (active) segment. Falls back to NavBase activeColor, then var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer nav element.' },
        ]} />
      </DocSection>

      <DocSection title="BreadcrumbItem shape">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Segment text.' },
          { name: 'onClick', type: '() => void', description: 'Makes the segment clickable (rendered as a button). The last item is always plain text regardless of onClick, since it represents the current location.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The final item is always rendered as static (non-interactive) text in the accent color, even if you pass onClick on it — it represents "you are here," so clicking it would be a no-op by design.
      </DocNote>

      <DocNote type="info">
        Once expanded via the "…" button, the breadcrumb stays expanded for the lifetime of that component instance (internal state, not a controlled prop) — there's no built-in way to re-collapse it without unmounting/remounting.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="BreadcrumbView reads its dimensions from the shared nav category base hook (useNavBase). Omitting size, borderRadius, or color on BreadcrumbView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every nav-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useNavBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '20px', font: '8px', desc: 'padX 16px' },
          { size: 'xs', height: '24px', font: '9px', desc: 'padX 16px' },
          { size: 'sm', height: '28px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '32px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '44px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '52px', font: '14px', desc: 'padX 16px' },
          { size: 'xxxl', height: '60px', font: '16px', desc: 'padX 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Nav category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every nav-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
