import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function AIButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '6 AI action presets', color: 'var(--color-primary)' },
          { label: 'Loading / thinking state with spinner', color: 'var(--color-success)' },
          { label: 'Sparkle icon at rest', color: 'var(--color-info)' },
          { label: 'Gradient-border hover effect (CSS class)', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Compact shorthand (xs size)', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
          { label: 'DUI container props (width, borderRadius, color)', color: '#f97316' },
          { label: 'Disabled state', color: 'var(--color-primary)' },
          { label: 'Custom label override', color: 'var(--color-success)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="AIButtonView is a specialized button for AI-triggered actions. It defaults to a themed gradient-border style with a SparkleIcon and auto-maps action keys to labels. During loading, the icon swaps to a spinner and the label reads 'Thinking…'. The accent defaults to var(--color-protocol-ai) — the DUI AI purple."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'action', type: 'AIButtonAction', default: "'ask'", description: "Preset action type. Determines the default label if label prop is not set." },
          { name: 'label', type: 'string', description: 'Override the auto-derived label from the action. When set, this text is always shown (except during loading, which shows "Thinking…").' },
          { name: 'onClick', type: '() => void', description: 'Click handler. Not called when disabled or loading.' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'When true, icon switches to a spinner and the label reads "Thinking…". Button is also disabled.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'When true, the button is non-interactive at 50% opacity. Cursor changes to not-allowed.' },
          { name: 'size', type: 'DuiSize', description: 'Falls back to DuiProvider context when omitted. compact=true is shorthand for size="xs".' },
          { name: 'compact', type: 'boolean', default: 'false', description: "Shorthand for size='xs' (20px height). Kept for backwards compatibility. Explicit size prop wins." },
          { name: 'accentColor', type: 'string', description: 'Override the accent color. Affects text color, border color, and hover background. Defaults to var(--color-protocol-ai).' },
          { name: 'className', type: 'string', description: 'Additional class names.' },
          { name: 'width', type: 'DuiWidth', description: 'Width override.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius override (defaults to 5px via resolveBorderRadius).' },
          { name: 'color', type: 'string', description: 'Text color override. When set, overrides the default accentColor text.' },
          { name: 'fontStyle', type: 'DuiFontStyle', description: 'Font style override.' },
        ]} />
      </DocSection>

      <DocSection title="AIButtonAction enum">
        <EnumTable name="AIButtonAction" values={[
          { value: 'generate', description: 'Label: "Generate"', color: 'var(--color-primary)' },
          { value: 'fuzz', description: 'Label: "Fuzz"', color: 'var(--color-success)' },
          { value: 'explain', description: 'Label: "Explain"', color: 'var(--color-info)' },
          { value: 'fix', description: 'Label: "Fix"', color: 'var(--color-warning)' },
          { value: 'ask', description: 'Label: "Ask AI" (default)', color: '#a855f7' },
          { value: 'suggest', description: 'Label: "Suggest"', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'xs', height: '20px', font: '10px', desc: 'compact=true' },
          { size: 'sm', height: '24px', font: '11px', desc: 'Small' },
          { size: 'md', height: '28px', font: '12px', desc: 'Default' },
          { size: 'lg', height: '32px', font: '13px', desc: 'Large' },
          { size: 'xl', height: '36px', font: '14px', desc: 'XL' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The hover/active styling is implemented via the .dui_ai-button CSS class in AIButtonView.css, using CSS custom properties --dui-aibtn-bg, --dui-aibtn-border-color, --dui-aibtn-hover-bg, and --dui-aibtn-hover-border. The inline style sets these vars so the CSS class can read them.
      </DocNote>

      <DocNote type="tip">
        When loading=true, both the disabled attribute and the not-allowed cursor are applied. The loading state does not add any timeout — caller is responsible for setting loading=false when the AI response arrives.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AIButtonView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on AIButtonView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useButtonBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 4px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 6px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 20px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 24px' },
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
          These values come from the Button category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every button-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
