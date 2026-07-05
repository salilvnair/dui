import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function ToastViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Portal-rendered (document.body)', color: 'var(--color-primary)' },
          { label: 'Four variants: success/error/warning/info', color: 'var(--color-success)' },
          { label: 'Auto-dismiss with configurable duration', color: 'var(--color-info)' },
          { label: 'Manual dismiss via X button', color: 'var(--color-warning)' },
          { label: '6 position presets', color: '#a855f7' },
          { label: 'Fade-in-up animation', color: '#ec4899' },
          { label: 'useToast() imperative hook', color: '#14b8a6' },
          { label: 'Optional message sub-line', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Toast interface">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for this toast instance.' },
          { name: 'variant', type: 'ToastVariant', required: true, description: "One of 'success' | 'error' | 'warning' | 'info'." },
          { name: 'title', type: 'string', required: true, description: 'Primary bold title text.' },
          { name: 'message', type: 'string', description: 'Optional secondary description line.' },
          { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in ms. Set to 0 to disable auto-dismiss.' },
        ]} />
      </DocSection>

      <DocSection title="ToastView Props">
        <PropTable props={[
          { name: 'toasts', type: 'Toast[]', required: true, description: 'Array of active toasts to display.' },
          { name: 'onDismiss', type: '(id: string) => void', required: true, description: 'Called when a toast is dismissed (auto or manual).' },
          { name: 'position', type: 'ToastPosition', default: "'bottom-right'", description: 'Where to anchor the toast stack on screen.' },
        ]} />
      </DocSection>

      <DocSection title="Position values">
        <EnumTable name="position" values={[
          { value: 'top-right', description: 'Top-right corner', color: 'var(--color-primary)' },
          { value: 'top-left', description: 'Top-left corner', color: 'var(--color-success)' },
          { value: 'bottom-right', description: 'Bottom-right (default)', color: 'var(--color-info)' },
          { value: 'bottom-left', description: 'Bottom-left corner', color: 'var(--color-warning)' },
          { value: 'top-center', description: 'Top center (translateX)', color: '#a855f7' },
          { value: 'bottom-center', description: 'Bottom center (translateX)', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="ToastVariant colors">
        <EnumTable name="ToastVariant" values={[
          { value: 'success', description: 'Green — CheckCircleIcon', color: 'var(--color-success)' },
          { value: 'error', description: 'Red — CloseCircleIcon', color: 'var(--color-error)' },
          { value: 'warning', description: 'Amber — WarningTriangleIcon', color: 'var(--color-warning)' },
          { value: 'info', description: 'Blue — InfoCircleIcon', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection title="useToast hook">
        <DocNote type="info">
          The <code>useToast()</code> hook provides an imperative API: <code>toast(variant, title, message?, duration?)</code> to add a toast and <code>dismiss(id)</code> to remove one. Use <code>subscribe(fn)</code> to sync the toast array into local state.
        </DocNote>
        <DocNote type="tip">
          The hook stores toasts in a ref (not React state) so calls from outside React components work without re-renders. Subscribe in a <code>useEffect</code> to drive the <code>ToastView</code>.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ToastView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          ToastView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
