import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SkeletonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '4 composable variants', color: 'var(--color-primary)' },
          { label: 'Multi-line text mode', color: 'var(--color-success)' },
          { label: 'Row = avatar + 2 text lines preset', color: 'var(--color-info)' },
          { label: 'Uses Tailwind animate-pulse', color: 'var(--color-warning)' },
          { label: 'Custom width/height overrides', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'variant', type: 'SkeletonVariant', default: "'text'", description: 'Shape to render.' },
          { name: 'lines', type: 'number', default: '1', description: 'Number of lines for variant="text". The last line renders at 70% width to mimic natural wrap when lines > 1.' },
          { name: 'width', type: 'number | string', description: 'Explicit width override. Applies to text and block variants.' },
          { name: 'height', type: 'number | string', description: 'Explicit height override. Applies to text and block variants.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Drives default line height and avatar diameter when width/height are not explicitly set.' },
          { name: 'className', type: 'string', description: 'Additional class names.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer element.' },
        ]} />
      </DocSection>

      <DocSection title="SkeletonVariant enum">
        <EnumTable name="SkeletonVariant" values={[
          { value: 'text', description: 'One or more shimmer bars mimicking lines of text.', color: 'var(--color-primary)' },
          { value: 'block', description: 'A single rectangular shimmer block, e.g. for an image or card placeholder.', color: 'var(--color-success)' },
          { value: 'avatar', description: 'A circular shimmer matching AvatarView\'s diameter at the current size.', color: 'var(--color-info)' },
          { value: 'row', description: 'Preset combo: avatar + two text lines, side by side — the common list-item skeleton.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        variant="row" is a fixed preset (avatar + 2 lines) meant to match a typical list row exactly — for anything else, compose the primitives (text/block/avatar) yourself in your own flex layout, as shown in the block+avatar example.
      </DocNote>

      <DocNote type="info">
        Skeleton bars pull their background from var(--color-loader-track), the same token LoaderView uses, so shimmer placeholders stay visually consistent with the rest of the loading system regardless of theme.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SkeletonView reads its dimensions from the shared avatar category base hook (useAvatarBase). Omitting size or color on SkeletonView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every avatar-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useAvatarBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'dot 6px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'dot 7px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'dot 8px' },
          { size: 'md', height: '32px', font: '11px', desc: 'dot 10px' },
          { size: 'lg', height: '40px', font: '12px', desc: 'dot 12px' },
          { size: 'xl', height: '48px', font: '13px', desc: 'dot 14px' },
          { size: 'xxl', height: '56px', font: '14px', desc: 'dot 16px' },
          { size: 'xxxl', height: '72px', font: '16px', desc: 'dot 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Avatar category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every avatar-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
