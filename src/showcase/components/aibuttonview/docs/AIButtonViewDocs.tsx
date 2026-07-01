import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

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
    </div>
  );
}
