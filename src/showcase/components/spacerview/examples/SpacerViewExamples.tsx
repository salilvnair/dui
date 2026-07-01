import { SpacerView, IconButtonView } from '@/dui';
import {
  PlusIcon, TrashIcon, SaveIcon, SearchIcon,
  FilterIcon, RefreshIcon, SettingsIcon, DownloadIcon,
} from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SpacerViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Vertical Spacer Between Icon Buttons in a Toolbar"
        description="SpacerView orientation='vertical' creates a thin divider line between toolbar sections"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <IconButtonView icon={<PlusIcon size={13} />}    size="sm" title="New" />
  <IconButtonView icon={<SaveIcon size={13} />}    size="sm" title="Save" />
  <SpacerView orientation="vertical" spacing="sm" />
  <IconButtonView icon={<TrashIcon size={13} />}   size="sm" title="Delete" />
  <IconButtonView icon={<RefreshIcon size={13} />} size="sm" title="Refresh" />
</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '6px 10px', background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', width: 'fit-content' }}>
          <IconButtonView icon={<PlusIcon    size={13} />} size="sm" title="New" onClick={() => {}} />
          <IconButtonView icon={<SaveIcon    size={13} />} size="sm" title="Save" onClick={() => {}} />
          <SpacerView orientation="vertical" spacing="sm" />
          <IconButtonView icon={<TrashIcon   size={13} />} size="sm" title="Delete" onClick={() => {}} />
          <IconButtonView icon={<RefreshIcon size={13} />} size="sm" title="Refresh" onClick={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Horizontal Spacer Between Layout Sections"
        description="SpacerView orientation='horizontal' adds vertical breathing room between content blocks"
        code={`<div>
  <p>Section A content</p>
  <SpacerView orientation="horizontal" spacing="lg" />
  <p>Section B content</p>
</div>`}
      >
        <div style={{ padding: '0 4px' }}>
          <div style={{ padding: '10px 12px', background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', fontSize: 12, color: 'var(--color-text-secondary)' }}>
            Request Headers
          </div>
          <SpacerView orientation="horizontal" spacing="lg" />
          <div style={{ padding: '10px 12px', background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', fontSize: 12, color: 'var(--color-text-secondary)' }}>
            Request Body
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Spacing Variants — sm / md / lg"
        description="Three thickness/gap variants — sm for tight toolbars, lg for section dividers"
        code={`<SpacerView orientation="vertical" spacing="sm" />
<SpacerView orientation="vertical" spacing="md" />
<SpacerView orientation="vertical" spacing="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(['sm', 'md', 'lg'] as const).map(spacing => (
            <div key={spacing} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 10, color: 'var(--color-text-muted)', width: 24 }}>{spacing}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '4px 8px', background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)' }}>
                <IconButtonView icon={<PlusIcon size={12} />} size="sm" title="A" onClick={() => {}} />
                <IconButtonView icon={<SaveIcon size={12} />} size="sm" title="B" onClick={() => {}} />
                <SpacerView orientation="vertical" spacing={spacing} />
                <IconButtonView icon={<TrashIcon size={12} />} size="sm" title="C" onClick={() => {}} />
              </div>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="In a Flex Column Layout"
        description="Horizontal spacers add consistent vertical gaps between panel sections"
        code={`<div style={{ display: 'flex', flexDirection: 'column' }}>
  <AuthSection />
  <SpacerView orientation="horizontal" spacing="md" />
  <QueryParamsSection />
  <SpacerView orientation="horizontal" spacing="md" />
  <BodySection />
</div>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {['Auth', 'Query Params', 'Body'].map((section, i) => (
            <div key={section}>
              {i > 0 && <SpacerView orientation="horizontal" spacing="md" />}
              <div style={{ padding: '8px 12px', borderRadius: 6, background: 'var(--color-panel)', border: '1px solid var(--color-surface-border)', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                {section}
              </div>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Multiple Vertical Spacers in One Row"
        description="Complex toolbar with three visual groups separated by spacers"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <PlusIcon />  <SaveIcon />
  <SpacerView orientation="vertical" spacing="sm" />
  <SearchIcon /> <FilterIcon />
  <SpacerView orientation="vertical" spacing="sm" />
  <SettingsIcon /> <DownloadIcon />
</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '6px 10px', background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', width: 'fit-content' }}>
          <IconButtonView icon={<PlusIcon     size={13} />} size="sm" title="New"      onClick={() => {}} />
          <IconButtonView icon={<SaveIcon     size={13} />} size="sm" title="Save"     onClick={() => {}} />
          <SpacerView orientation="vertical" spacing="sm" />
          <IconButtonView icon={<SearchIcon   size={13} />} size="sm" title="Search"   onClick={() => {}} />
          <IconButtonView icon={<FilterIcon   size={13} />} size="sm" title="Filter"   onClick={() => {}} />
          <SpacerView orientation="vertical" spacing="sm" />
          <IconButtonView icon={<SettingsIcon size={13} />} size="sm" title="Settings" onClick={() => {}} />
          <IconButtonView icon={<DownloadIcon size={13} />} size="sm" title="Export"   onClick={() => {}} />
        </div>
      </ExampleCard>
    </div>
  );
}
