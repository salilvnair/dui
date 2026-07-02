/**
 * Static stand-in for NetworkGraphView, shown whenever vis-network isn't
 * available (not installed, or '@salilvnair/dui/vis-setup' was never
 * imported). Deliberately minimal — no physics, no interaction. Anything
 * that needs a real force-directed layout should treat this as a signal to
 * wire up the vis-setup import, not something to build on top of.
 */
export function NetworkGraphViewFallback({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{
        width: '100%', height: '100%', minHeight: 160,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px dashed var(--color-elevated-border)', borderRadius: 8,
        color: 'var(--color-text-muted)', fontSize: 12, textAlign: 'center', padding: 16,
        ...style,
      }}
    >
      Install 'vis-network' + 'vis-data' and import '@salilvnair/dui/vis-setup'
      to render NetworkGraphView.
    </div>
  );
}
