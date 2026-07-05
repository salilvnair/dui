import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function LiveCursorPresenceViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Collaborative live cursors', color: 'var(--color-primary)' },
          { label: 'Name tags per cursor', color: 'var(--color-success)' },
          { label: 'Fractional positioning (responsive)', color: 'var(--color-info)' },
          { label: 'Smooth CSS position transitions', color: 'var(--color-warning)' },
          { label: '6-color auto palette rotation', color: '#a855f7' },
          { label: 'Overlays arbitrary children', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'cursors', type: 'LiveCursor[]', required: true, description: 'Active collaborators to render as cursors overlaid on children.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'The content the cursors are positioned relative to. The wrapper is position: relative.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the name-tag font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="LiveCursor shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable key per collaborator.' },
          { name: 'name', type: 'string', required: true, description: 'Display name shown in the cursor tag.' },
          { name: 'x', type: 'number', required: true, description: 'Horizontal position as a fraction (0-1) of the container width.' },
          { name: 'y', type: 'number', required: true, description: 'Vertical position as a fraction (0-1) of the container height.' },
          { name: 'color', type: 'string', description: 'Explicit cursor/tag color. Falls back to a 6-color palette rotation by array index when omitted.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Positions are fractional (0-1), not pixel coordinates, so the same cursors array stays correctly placed if the container resizes — ideal for syncing over a WebSocket where you only ever transmit normalized coordinates.
      </DocNote>

      <DocNote type="tip">
        Cursor movement animates via CSS transition on left/top (200ms ease-out), so you don't need to interpolate positions yourself — just update the x/y values on each presence update from your realtime backend and the visual movement will smooth out automatically.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="LiveCursorPresenceView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on LiveCursorPresenceView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
