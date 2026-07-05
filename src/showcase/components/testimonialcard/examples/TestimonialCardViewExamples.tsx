import { TestimonialCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TestimonialCardViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Card"
        description="Quote + fallback avatar circle + author/role"
        code={`<TestimonialCardView quote="Daakia cut our testing time in half." author="Jordan Lee" role="Platform Engineer" />`}
      >
        <div style={{ maxWidth: 320 }}>
          <TestimonialCardView quote="Daakia cut our testing time in half." author="Jordan Lee" role="Platform Engineer" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Custom Avatar"
        description="Pass a real avatar image instead of the placeholder circle"
        code={`<TestimonialCardView
  quote="The environment switcher alone saved us from three production incidents."
  author="Priya Nair"
  role="Site Reliability Lead, Meridian Corp"
  avatar={<img src="https://i.pravatar.cc/64?u=priya" style={{ width: 32, height: 32, borderRadius: '999px' }} />}
/>`}
      >
        <div style={{ maxWidth: 340 }}>
          <TestimonialCardView
            quote="The environment switcher alone saved us from three production incidents."
            author="Priya Nair"
            role="Site Reliability Lead, Meridian Corp"
            avatar={<img src="https://i.pravatar.cc/64?u=priya" alt="Priya Nair" style={{ width: 32, height: 32, borderRadius: '999px' }} />}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Customer Wall Grid (domain use case)"
        description="A grid of testimonials for a marketing or changelog page"
        code={`{[
  { quote: 'Mock servers let our frontend team ship without waiting on the backend.', author: 'Sam Torres', role: 'Frontend Lead' },
  { quote: 'Webhook simulation caught a race condition we\\'d missed for months.', author: 'Alex Kim', role: 'Backend Engineer' },
].map(t => <TestimonialCardView key={t.author} {...t} />)}`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <TestimonialCardView quote="Mock servers let our frontend team ship without waiting on the backend." author="Sam Torres" role="Frontend Lead" />
          <TestimonialCardView quote="Webhook simulation caught a race condition we'd missed for months." author="Alex Kim" role="Backend Engineer" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Compact Size, No Role"
        description="Omit role for a shorter attribution line, and use size='sm' for a dense list"
        code={`<TestimonialCardView quote="Fast, reliable, and the docs are actually good." author="anonymous user" size="sm" />`}
      >
        <div style={{ maxWidth: 280 }}>
          <TestimonialCardView quote="Fast, reliable, and the docs are actually good." author="anonymous user" size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Long Quote (edge case)"
        description="Longer quotes wrap naturally at 1.6 line-height — no truncation is applied"
        code={`<TestimonialCardView
  quote="We migrated our entire QA suite from a mix of ad-hoc API clients and hand-rolled scripts to Daakia in about two weeks. The biggest win wasn't features — it was that every engineer on the team could finally read and modify tests without asking the one person who understood the old setup."
  author="Morgan Yu"
  role="Head of QA"
/>`}
      >
        <div style={{ maxWidth: 380 }}>
          <TestimonialCardView
            quote="We migrated our entire QA suite from a mix of ad-hoc API clients and hand-rolled scripts to Daakia in about two weeks. The biggest win wasn't features — it was that every engineer on the team could finally read and modify tests without asking the one person who understood the old setup."
            author="Morgan Yu"
            role="Head of QA"
          />
        </div>
      </ExampleCard>
    </div>
  );
}
