import { useState } from 'react';
import { AIButtonView } from '@/dui';
import type { AIButtonAction } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Individual action demos ───────────────────────────────────────────────────
function GenerateQueryDemo() {
  const [loading, setLoading] = useState(false);
  const run = () => { setLoading(true); setTimeout(() => setLoading(false), 2000); };
  return (
    <AIButtonView
      action="generate"
      loading={loading}
      onClick={run}
      accentColor="var(--color-protocol-graphql)"
    />
  );
}

function FixIssuesDemo() {
  const [loading, setLoading] = useState(false);
  const run = () => { setLoading(true); setTimeout(() => setLoading(false), 1800); };
  return (
    <AIButtonView
      action="fix"
      loading={loading}
      onClick={run}
      accentColor="var(--color-error)"
    />
  );
}

function ExplainResponseDemo() {
  const [loading, setLoading] = useState(false);
  const run = () => { setLoading(true); setTimeout(() => setLoading(false), 1500); };
  return (
    <AIButtonView
      action="explain"
      loading={loading}
      onClick={run}
    />
  );
}

function SuggestImprovementsDemo() {
  const [loading, setLoading] = useState(false);
  const run = () => { setLoading(true); setTimeout(() => setLoading(false), 2200); };
  return (
    <AIButtonView
      action="suggest"
      loading={loading}
      onClick={run}
      accentColor="var(--color-protocol-soap)"
    />
  );
}

// ─── Loading state demo ────────────────────────────────────────────────────────
function LoadingStateDemo() {
  const [activeAction, setActiveAction] = useState<AIButtonAction | null>(null);
  const run = (action: AIButtonAction) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 3000);
  };
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {(['generate', 'fix', 'explain'] as AIButtonAction[]).map(action => (
        <AIButtonView
          key={action}
          action={action}
          loading={activeAction === action}
          onClick={() => run(action)}
          disabled={activeAction !== null && activeAction !== action}
        />
      ))}
      {activeAction && (
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', alignSelf: 'center' }}>
          Running {activeAction}…
        </span>
      )}
    </div>
  );
}

// ─── All action variants in a row ─────────────────────────────────────────────
function AllActionsRowDemo() {
  const actions: AIButtonAction[] = ['generate', 'fuzz', 'explain', 'fix', 'ask', 'suggest'];
  const colors: Partial<Record<AIButtonAction, string>> = {
    generate: 'var(--color-protocol-graphql)',
    fuzz:     'var(--color-protocol-rest)',
    fix:      'var(--color-error)',
    explain:  'var(--color-info)',
    ask:      'var(--color-protocol-ai)',
    suggest:  'var(--color-warning)',
  };
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {actions.map(action => (
        <AIButtonView key={action} action={action} accentColor={colors[action]} />
      ))}
    </div>
  );
}

// ─── Size variants ────────────────────────────────────────────────────────────
function SizeVariantsDemo() {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const;
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      {sizes.map(size => (
        <AIButtonView key={size} action="generate" size={size} />
      ))}
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function AIButtonViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Generate Query"
        description="action=&quot;generate&quot; — triggers AI query generation; click to see loading state"
        code={`<AIButtonView action="generate" loading={loading} onClick={run}
  accentColor="var(--color-protocol-graphql)" />`}
      >
        <GenerateQueryDemo />
      </ExampleCard>

      <ExampleCard
        title="Fix Issues"
        description="action=&quot;fix&quot; — error accent color signals a corrective AI action"
        code={`<AIButtonView action="fix" loading={loading} onClick={run}
  accentColor="var(--color-error)" />`}
      >
        <FixIssuesDemo />
      </ExampleCard>

      <ExampleCard
        title="Explain Response"
        description="action=&quot;explain&quot; — uses default protocol-ai accent color"
        code={`<AIButtonView action="explain" loading={loading} onClick={run} />`}
      >
        <ExplainResponseDemo />
      </ExampleCard>

      <ExampleCard
        title="Suggest Improvements"
        description="action=&quot;suggest&quot; — SOAP protocol color to match the active panel"
        code={`<AIButtonView action="suggest" loading={loading} onClick={run}
  accentColor="var(--color-protocol-soap)" />`}
      >
        <SuggestImprovementsDemo />
      </ExampleCard>

      <ExampleCard
        title="Loading State — Only One Active"
        description="Click any button — the others become disabled while AI is running"
        code={`<AIButtonView action="generate" loading={active === 'generate'} disabled={active !== null && active !== 'generate'} onClick={() => run('generate')} />
<AIButtonView action="fix"      loading={active === 'fix'}      disabled={active !== null && active !== 'fix'}      onClick={() => run('fix')} />`}
      >
        <LoadingStateDemo />
      </ExampleCard>

      <ExampleCard
        title="All Action Variants"
        description="generate · fuzz · explain · fix · ask · suggest — each with a protocol accent"
        code={`const actions = ['generate','fuzz','explain','fix','ask','suggest'];
actions.map(a => <AIButtonView key={a} action={a} accentColor={colors[a]} />)`}
      >
        <AllActionsRowDemo />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs (20px) · sm (22px) · md (28px) · lg (32px)"
        code={`<AIButtonView action="generate" size="xs" />
<AIButtonView action="generate" size="sm" />
<AIButtonView action="generate" size="md" />
<AIButtonView action="generate" size="lg" />`}
      >
        <SizeVariantsDemo />
      </ExampleCard>
    </div>
  );
}
