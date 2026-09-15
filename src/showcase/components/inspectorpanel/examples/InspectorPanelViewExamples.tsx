import { useState } from 'react';
import { InspectorPanelView, InspectorSectionView, ButtonView, BadgeChipView, KeyValueListView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { GlobeIcon, LayersIcon, GaugeIcon } from '@/icons';

export function InspectorPanelViewExamples() {
  const [open, setOpen] = useState(false);

  const body = (
    <>
      <InspectorSectionView icon={<GlobeIcon size={11} />} label="Identity">
        <KeyValueListView
          entries={[
            { key: 'Namespace', value: 'production' },
            { key: 'Node', value: 'ip-10-0-3-114' },
            { key: 'Created', value: '4 days ago' },
          ]}
        />
      </InspectorSectionView>

      <InspectorSectionView icon={<GaugeIcon size={11} />} label="Resources" accentColor="var(--color-warning)">
        <KeyValueListView
          entries={[
            { key: 'CPU', value: '340m / 500m' },
            { key: 'Memory', value: '612 Mi / 1 Gi' },
          ]}
        />
      </InspectorSectionView>

      <InspectorSectionView icon={<LayersIcon size={11} />} label="Containers">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <BadgeChipView size="2xs" tone="var(--color-success)">api</BadgeChipView>
          <BadgeChipView size="2xs" tone="var(--color-success)">sidecar</BadgeChipView>
        </div>
      </InspectorSectionView>
    </>
  );

  return (
    <>
      <ExampleCard
        title="Embedded"
        description="Sits in the layout as an ordinary column — for a screen that always shows detail beside a list"
        code={'<InspectorPanelView embedded title="api-7d4f9c8b6" subtitle="pod">…</InspectorPanelView>'}
      >
        <div style={{ width: '100%', height: 360, border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <InspectorPanelView
            embedded
            title="api-7d4f9c8b6-2xk4m"
            subtitle="pod"
            badges={<BadgeChipView size="2xs" tone="var(--color-success)">Running</BadgeChipView>}
          >
            {body}
          </InspectorPanelView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="As an overlay"
        description="The default — an absolute panel on the right edge, over whatever is behind it"
        code={'<InspectorPanelView title="…" onClose={close}>…</InspectorPanelView>'}
      >
        <div style={{ position: 'relative', width: '100%', height: 360, border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden', background: 'var(--color-panel)' }}>
          <div style={{ padding: 16 }}>
            <ButtonView size="sm" onClick={() => setOpen(v => !v)}>
              {open ? 'Close inspector' : 'Open inspector'}
            </ButtonView>
          </div>
          {open && (
            <InspectorPanelView
              title="api-7d4f9c8b6-2xk4m"
              subtitle="pod"
              width={300}
              onClose={() => setOpen(false)}
              badges={<BadgeChipView size="2xs" tone="var(--color-success)">Running</BadgeChipView>}
            >
              {body}
            </InspectorPanelView>
          )}
        </div>
      </ExampleCard>
    </>
  );
}
