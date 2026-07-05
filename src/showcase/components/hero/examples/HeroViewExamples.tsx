import { HeroView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function HeroViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Hero"
        description="Product landing banner with title, subtitle, and a primary CTA"
        code={`<HeroView
  title="Build APIs faster"
  subtitle="Design, test, and document APIs in one workspace."
  actions={<ButtonView variant="primary">Get Started</ButtonView>}
/>`}
      >
        <HeroView
          title="Build APIs faster"
          subtitle="Design, test, and document APIs in one workspace."
          actions={<ButtonView variant="primary">Get Started</ButtonView>}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Background & Colors"
        description="Gradient background with white text for a marketing-style splash screen"
        code={`<HeroView
  title="Daakia Enterprise"
  subtitle="SSO, audit logs, and unlimited workspaces for API teams."
  background="linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
  actions={<ButtonView variant="secondary">Talk to Sales</ButtonView>}
/>`}
      >
        <HeroView
          title="Daakia Enterprise"
          subtitle="SSO, audit logs, and unlimited workspaces for API teams."
          background="linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
          actions={<ButtonView variant="secondary">Talk to Sales</ButtonView>}
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Size controls the min-height, padding, and title scale — xs for compact banners, xl for full landing sections"
        code={`<HeroView size="xs" title="Webhook delivered" subtitle="Sent to 3 endpoints just now." />
<HeroView size="lg" title="Migrate your saved collections" subtitle="Import in seconds, no manual rework." actions={<ButtonView variant="primary">Import Collection</ButtonView>} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <HeroView size="xs" title="Webhook delivered" subtitle="Sent to 3 endpoints just now." />
          <HeroView
            size="lg"
            title="Migrate your saved collections"
            subtitle="Import in seconds, no manual rework."
            actions={<ButtonView variant="primary">Import Collection</ButtonView>}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Workspace State"
        description="Using HeroView as an empty-state panel inside a workspace with no collections yet"
        code={`<HeroView
  size="sm"
  title="No collections yet"
  subtitle="Create your first collection to start organizing API requests."
  actions={<><ButtonView variant="primary">New Collection</ButtonView><ButtonView variant="ghost">Import</ButtonView></>}
  borderRadius="lg"
/>`}
      >
        <HeroView
          size="sm"
          title="No collections yet"
          subtitle="Create your first collection to start organizing API requests."
          actions={
            <>
              <ButtonView variant="primary">New Collection</ButtonView>
              <ButtonView variant="ghost">Import</ButtonView>
            </>
          }
          borderRadius="lg"
        />
      </ExampleCard>

      <ExampleCard
        title="Image Background"
        description="background accepts an image URL — auto-detected and rendered as center/cover"
        code={`<HeroView
  title="API Design Week"
  subtitle="Join the workshop on schema-first API design."
  background="https://images.unsplash.com/photo-1550439062-609e1531270e?w=1200"
  actions={<ButtonView variant="primary">Register</ButtonView>}
  size="md"
/>`}
      >
        <HeroView
          title="API Design Week"
          subtitle="Join the workshop on schema-first API design."
          background="https://images.unsplash.com/photo-1550439062-609e1531270e?w=1200"
          actions={<ButtonView variant="primary">Register</ButtonView>}
          size="md"
        />
      </ExampleCard>
    </div>
  );
}
