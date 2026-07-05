import { useState } from 'react';
import { SegmentedControlView, type SegmentedControlOption } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const VIEW_OPTIONS: SegmentedControlOption[] = [
  { value: 'pretty', label: 'Pretty' },
  { value: 'raw', label: 'Raw' },
  { value: 'preview', label: 'Preview' },
];

const AUTH_OPTIONS: SegmentedControlOption[] = [
  { value: 'none', label: 'No Auth' },
  { value: 'bearer', label: 'Bearer Token' },
  { value: 'basic', label: 'Basic Auth' },
  { value: 'oauth2', label: 'OAuth 2.0' },
];

const ENV_OPTIONS: SegmentedControlOption[] = [
  { value: 'dev', label: 'Dev' },
  { value: 'staging', label: 'Staging' },
  { value: 'prod', label: 'Prod' },
];

const PLAN_OPTIONS: SegmentedControlOption[] = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro', disabled: true },
  { value: 'team', label: 'Team', disabled: true },
];

export function SegmentedControlViewExamples() {
  const [view, setView] = useState('pretty');
  const [auth, setAuth] = useState('bearer');
  const [pillVal, setPillVal] = useState('pretty');
  const [roundedVal, setRoundedVal] = useState('pretty');
  const [pointyVal, setPointyVal] = useState('pretty');
  const [env, setEnv] = useState('dev');
  const [plan, setPlan] = useState('free');

  return (
    <div>
      <ExampleCard
        title="Response Body Viewer Toggle"
        description="Default pill-shaped segmented control for switching response body views"
        code={`const options = [
  { value: 'pretty', label: 'Pretty' },
  { value: 'raw', label: 'Raw' },
  { value: 'preview', label: 'Preview' },
];

<SegmentedControlView options={options} value={view} onChange={setView} />`}
      >
        <SegmentedControlView options={VIEW_OPTIONS} value={view} onChange={setView} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Showing response as <strong style={{ color: 'var(--color-text-primary)' }}>{view}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Auth Type Selector (interactive)"
        description="Segmented control driving which auth fields render below it"
        code={`const [auth, setAuth] = useState('bearer');

<SegmentedControlView
  options={authOptions}
  value={auth}
  onChange={setAuth}
  accentColor="var(--color-info)"
  fullWidth
/>`}
      >
        <SegmentedControlView options={AUTH_OPTIONS} value={auth} onChange={setAuth} accentColor="var(--color-info)" fullWidth />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          {auth === 'none' && 'No authorization header will be sent.'}
          {auth === 'bearer' && 'Authorization: Bearer <token>'}
          {auth === 'basic' && 'Authorization: Basic <base64(user:pass)>'}
          {auth === 'oauth2' && 'Token fetched via configured OAuth 2.0 flow.'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Variant & Size Showcase"
        description="pill / rounded / pointy variants, each with a distinct accent color, plus size range xs → xl"
        code={`<SegmentedControlView options={options} value={v} onChange={setV} variant="pill" />
<SegmentedControlView options={options} value={v} onChange={setV} variant="rounded" accentColor="var(--color-success)" />
<SegmentedControlView options={options} value={v} onChange={setV} variant="pointy" accentColor="var(--color-warning)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SegmentedControlView options={VIEW_OPTIONS} value={pillVal} onChange={setPillVal} variant="pill" />
          <SegmentedControlView options={VIEW_OPTIONS} value={roundedVal} onChange={setRoundedVal} variant="rounded" accentColor="var(--color-success)" />
          <SegmentedControlView options={VIEW_OPTIONS} value={pointyVal} onChange={setPointyVal} variant="pointy" accentColor="var(--color-warning)" />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
              <SegmentedControlView key={sz} options={VIEW_OPTIONS} value={pillVal} onChange={setPillVal} size={sz} />
            ))}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Switcher"
        description="Domain-realistic use — switching the active environment (Dev/Staging/Prod) for a request collection"
        code={`<SegmentedControlView
  options={[
    { value: 'dev', label: 'Dev' },
    { value: 'staging', label: 'Staging' },
    { value: 'prod', label: 'Prod' },
  ]}
  value={env}
  onChange={setEnv}
  accentColor={env === 'prod' ? 'var(--color-error)' : 'var(--color-primary)'}
/>`}
      >
        <SegmentedControlView
          options={ENV_OPTIONS}
          value={env}
          onChange={setEnv}
          accentColor={env === 'prod' ? 'var(--color-error)' : 'var(--color-primary)'}
        />
        {env === 'prod' && (
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-error)' }}>
            Warning: requests will hit the production environment.
          </div>
        )}
      </ExampleCard>

      <ExampleCard
        title="Disabled Segments (edge case)"
        description="Individual options can be disabled (e.g. gated by plan) and the whole control can be disabled"
        code={`<SegmentedControlView
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro', disabled: true },
    { value: 'team', label: 'Team', disabled: true },
  ]}
  value={plan}
  onChange={setPlan}
/>

<SegmentedControlView options={planOptions} value={plan} onChange={setPlan} disabled />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SegmentedControlView options={PLAN_OPTIONS} value={plan} onChange={setPlan} />
          <SegmentedControlView options={PLAN_OPTIONS} value={plan} onChange={setPlan} disabled />
        </div>
      </ExampleCard>
    </div>
  );
}
