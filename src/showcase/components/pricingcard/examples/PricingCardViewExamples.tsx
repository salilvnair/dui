import { PricingCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PricingCardViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Card"
        description="Basic plan card with a feature checklist"
        code={`<PricingCardView planName="Pro" price="$29" features={['Unlimited requests', 'Team collaboration']} popular />`}
      >
        <div style={{ maxWidth: 260 }}>
          <PricingCardView planName="Pro" price="$29" features={['Unlimited requests', 'Team collaboration']} popular />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Three-Tier Plan Comparison (domain use case)"
        description="Free / Pro / Enterprise tiers for an API-testing product, with Pro marked popular"
        code={`<PricingCardView planName="Free" price="$0" features={['5 collections', '1 environment', 'Community support']} />
<PricingCardView planName="Pro" price="$29" features={['Unlimited collections', '10 environments', 'Team workspaces', 'Priority support']} popular />
<PricingCardView planName="Enterprise" price="Custom" period="" features={['SSO / SCIM', 'Audit logs', 'Dedicated support', 'On-prem option']} />`}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ width: 220 }}>
            <PricingCardView planName="Free" price="$0" features={['5 collections', '1 environment', 'Community support']} />
          </div>
          <div style={{ width: 220 }}>
            <PricingCardView planName="Pro" price="$29" features={['Unlimited collections', '10 environments', 'Team workspaces', 'Priority support']} popular />
          </div>
          <div style={{ width: 220 }}>
            <PricingCardView planName="Enterprise" price="Custom" period="" features={['SSO / SCIM', 'Audit logs', 'Dedicated support', 'On-prem option']} />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Custom Actions"
        description="Pass a button (or any node) via actions, rendered below the feature list"
        code={`<PricingCardView
  planName="Team"
  price="$79"
  features={['25 seats', 'Shared environments', 'SAML SSO']}
  actions={<button style={{ width: '100%' }}>Start free trial</button>}
/>`}
      >
        <div style={{ maxWidth: 240 }}>
          <PricingCardView
            planName="Team"
            price="$79"
            features={['25 seats', 'Shared environments', 'SAML SSO']}
            actions={
              <button type="button" style={{ width: '100%', padding: '8px 0', borderRadius: 6, border: 'none', background: 'var(--color-primary)', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                Start free trial
              </button>
            }
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Theme the border, background tint, and popular ribbon"
        code={`<PricingCardView planName="Startup" price="$15" color="var(--color-info)" features={['3 team members', '5 environments']} popular />`}
      >
        <div style={{ maxWidth: 240 }}>
          <PricingCardView planName="Startup" price="$15" color="var(--color-info)" features={['3 team members', '5 environments']} popular />
        </div>
      </ExampleCard>

      <ExampleCard
        title="No Features (edge case)"
        description="An empty features array is valid — the card still renders the plan name and price with an empty list area"
        code={`<PricingCardView planName="Trial" price="$0" period="/14 days" features={[]} />`}
      >
        <div style={{ maxWidth: 220 }}>
          <PricingCardView planName="Trial" price="$0" period="/14 days" features={[]} />
        </div>
      </ExampleCard>
    </div>
  );
}
