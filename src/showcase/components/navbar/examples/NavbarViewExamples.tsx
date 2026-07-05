import { useState } from 'react';
import { NavbarView, ButtonView, ChipView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function NavbarViewExamples() {
  const [active, setActive] = useState('requests');
  const [envActive, setEnvActive] = useState('staging');

  return (
    <div>
      <ExampleCard
        title="Default Navbar"
        description="Brand, link menu, and a sign-in action on the right"
        code={`<NavbarView
  brand="Daakia"
  links={[{ id: 'requests', label: 'Requests', active: true }, { id: 'docs', label: 'Docs' }]}
  right={<ButtonView size="sm">Sign in</ButtonView>}
/>`}
      >
        <NavbarView
          brand="Daakia"
          links={[{ id: 'requests', label: 'Requests', active: true }, { id: 'docs', label: 'Docs' }]}
          right={<ButtonView size="sm">Sign in</ButtonView>}
        />
      </ExampleCard>

      <ExampleCard
        title="Interactive Link Selection"
        description="Each link has an onClick that updates the active section, mirrored in the active flag"
        code={`const [active, setActive] = useState('requests');
<NavbarView
  brand="Daakia"
  links={links.map(l => ({ ...l, active: l.id === active, onClick: () => setActive(l.id) }))}
  right={<ButtonView size="sm" variant="primary">New Request</ButtonView>}
/>`}
      >
        <NavbarView
          brand="Daakia"
          links={[
            { id: 'requests', label: 'Requests' },
            { id: 'collections', label: 'Collections' },
            { id: 'environments', label: 'Environments' },
            { id: 'docs', label: 'Docs' },
          ].map(l => ({ ...l, active: l.id === active, onClick: () => setActive(l.id) }))}
          right={<ButtonView size="sm" variant="primary">New Request</ButtonView>}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Active section: {active}</div>
      </ExampleCard>

      <ExampleCard
        title="Workspace Navbar with Environment Switcher"
        description="Domain-realistic: team workspace navbar with an environment chip group on the right"
        code={`<NavbarView
  brand="Payments Workspace"
  color="var(--color-protocol-graphql)"
  links={[{ id: 'overview', label: 'Overview', active: true }, { id: 'monitors', label: 'Monitors' }, { id: 'webhooks', label: 'Webhooks' }]}
  right={<>
    <ChipView label="Staging" color="var(--color-warning)" active size="sm" onClick={() => setEnvActive('staging')} />
    <ChipView label="Production" color="var(--color-error)" onClick={() => setEnvActive('production')} size="sm" />
  </>}
/>`}
      >
        <NavbarView
          brand="Payments Workspace"
          color="var(--color-protocol-graphql)"
          links={[{ id: 'overview', label: 'Overview', active: true }, { id: 'monitors', label: 'Monitors' }, { id: 'webhooks', label: 'Webhooks' }]}
          right={
            <>
              <ChipView label="Staging" color="var(--color-warning)" active={envActive === 'staging'} onClick={() => setEnvActive('staging')} size="sm" />
              <ChipView label="Production" color="var(--color-error)" active={envActive === 'production'} onClick={() => setEnvActive('production')} size="sm" />
            </>
          }
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="size scales font size and horizontal padding of the bar"
        code={`<NavbarView size="xs" brand="Daakia" links={[{ id: 'a', label: 'Requests', active: true }]} />
<NavbarView size="lg" brand="Daakia" links={[{ id: 'a', label: 'Requests', active: true }]} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <NavbarView size="xs" brand="Daakia" links={[{ id: 'a', label: 'Requests', active: true }, { id: 'b', label: 'Docs' }]} />
          <NavbarView size="lg" brand="Daakia" links={[{ id: 'a', label: 'Requests', active: true }, { id: 'b', label: 'Docs' }]} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Brand Only (edge case)"
        description="Both links and right are optional — a bare brand-only bar for minimal/loading states"
        code={`<NavbarView brand="Daakia" />`}
      >
        <NavbarView brand="Daakia" />
      </ExampleCard>
    </div>
  );
}
