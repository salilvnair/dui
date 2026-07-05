import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function CountdownRingViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated SVG ring progress', color: 'var(--color-primary)' },
          { label: 'Countdown to a target Date/timestamp', color: 'var(--color-success)' },
          { label: 'Or countdown from a duration in seconds', color: 'var(--color-info)' },
          { label: 'onComplete callback fires exactly once', color: 'var(--color-warning)' },
          { label: 'Pausable', color: '#a855f7' },
          { label: 'Formats h:mm:ss or m:ss automatically', color: '#ec4899' },
          { label: 'Custom diameter override', color: '#14b8a6' },
          { label: 'Optional caption label', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'target', type: 'Date | number', description: 'Target time to count down to (Date object or epoch ms timestamp). Takes precedence over durationSeconds when both are given.' },
          { name: 'durationSeconds', type: 'number', default: '60', description: 'Alternative to target — counts down from "now" for N seconds. Used only when target is not provided.' },
          { name: 'onComplete', type: '() => void', description: 'Called once when the remaining time reaches zero. Guarded internally so it never fires more than once per mount.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size preset controlling the default ring diameter and label font size. Falls back to DuiProvider context.' },
          { name: 'diameter', type: 'number', description: 'Ring diameter in px — overrides the size-derived default entirely.' },
          { name: 'width', type: 'DuiWidth', description: 'Width preset override, passed through to the internal DateBase layout.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border-radius preset or raw px number (accepted for API consistency with other date/time components; has no visible effect on the circular ring itself).' },
          { name: 'color', type: 'string', default: "'var(--color-primary)'", description: 'Accent color for the progress stroke.' },
          { name: 'label', type: 'string', description: 'Optional caption rendered below the ring, e.g. "Session expires".' },
          { name: 'paused', type: 'boolean', default: 'false', description: 'When true, freezes the countdown — the animation loop stops and remaining time no longer decreases.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The countdown's total duration is captured once on mount (from the initial target/durationSeconds) and used to compute ring progress. Changing target or durationSeconds after mount does not reset the ring — remount the component (e.g. with a key prop) to restart a countdown.
      </DocNote>

      <DocNote type="warning">
        onComplete relies on requestAnimationFrame and will not fire while the tab is backgrounded/throttled and paused is left false — this is expected browser behavior, not a bug. For strict deadline enforcement (e.g. actual session termination), pair this with a server-side check rather than relying on onComplete alone.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CountdownRingView reads its dimensions from the shared date category base hook (useDateBase). Omitting size, width, borderRadius, or color on CountdownRingView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every date-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDateBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '18px cell', font: '8px', desc: 'ring 40px' },
          { size: 'xs', height: '22px cell', font: '9px', desc: 'ring 52px' },
          { size: 'sm', height: '26px cell', font: '10px', desc: 'ring 64px' },
          { size: 'md', height: '30px cell', font: '11px', desc: 'ring 80px' },
          { size: 'lg', height: '34px cell', font: '12px', desc: 'ring 100px' },
          { size: 'xl', height: '38px cell', font: '13px', desc: 'ring 120px' },
          { size: 'xxl', height: '44px cell', font: '14px', desc: 'ring 144px' },
          { size: 'xxxl', height: '50px cell', font: '16px', desc: 'ring 168px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Width presets, resolved via the <code>width</code> prop or the nearest <code>{'<DuiProvider width="...">'}</code>:
        </div>
        <WidthReference widths={[
          { width: 'sm', value: '80px' },
          { width: 'md', value: '120px' },
          { width: 'default', value: 'auto' },
          { width: 'lg', value: '200px' },
          { width: 'fullWidth', value: '100%' },
          { width: 'maxContent', value: 'max-content' },
          { width: 'fw', value: '100%' },
          { width: 'mx', value: 'max-content' },
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
          These values come from the Date category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every date-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
