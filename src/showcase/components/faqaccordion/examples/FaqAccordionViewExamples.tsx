import { FaqAccordionView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function FaqAccordionViewExamples() {
  const apiFaqs = [
    { id: '1', question: 'How do I import a collection?', answer: 'Go to Import → select your saved-collection/OpenAPI/cURL file, then confirm the target workspace.' },
    { id: '2', question: 'How do I share an environment with my team?', answer: 'Open the environment, click Share, and choose which workspace members should have access.' },
    { id: '3', question: 'Can I run collections on a schedule?', answer: 'Yes — the Collection Runner supports cron-based scheduling under Automation settings.' },
  ];

  const billingFaqs = [
    { id: '1', question: 'What happens if I downgrade my plan?', answer: 'You keep all data, but team seats beyond the new limit become read-only until removed.' },
    { id: '2', question: 'Do you offer annual billing?', answer: 'Yes, annual plans get a 20% discount over monthly billing.' },
  ];

  return (
    <div>
      <ExampleCard
        title="Basic FAQ (single-open accordion)"
        description="Default behavior — only one question can be expanded at a time"
        code={`<FaqAccordionView
  faqs={[
    { id: '1', question: 'How do I import a collection?', answer: 'Go to Import → select your file.' },
    { id: '2', question: 'How do I share an environment?', answer: 'Open the environment and click Share.' },
  ]}
/>`}
      >
        <FaqAccordionView faqs={apiFaqs} />
      </ExampleCard>

      <ExampleCard
        title="Multiple Open at Once"
        description="multiple allows several answers to be visible simultaneously"
        code={`<FaqAccordionView faqs={billingFaqs} multiple />`}
      >
        <FaqAccordionView faqs={billingFaqs} multiple />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="accentColor tints the expand icon and active section border"
        code={`<FaqAccordionView faqs={apiFaqs} accentColor="var(--color-info)" />`}
      >
        <FaqAccordionView faqs={apiFaqs} accentColor="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="Support Docs Page FAQ"
        description="A realistic help-center layout with API-testing-specific questions"
        code={`<FaqAccordionView
  faqs={[
    { id: '1', question: 'Why is my request timing out?', answer: 'Check that your environment base URL is reachable and your timeout setting is above the expected response time.' },
    { id: '2', question: 'How do I mock a response for offline testing?', answer: 'Enable the Mock Server toggle on any request and define example responses per status code.' },
    { id: '3', question: 'Can I chain requests using variables?', answer: 'Yes — use the post-response script to set an environment variable, then reference it as {{variable}} in later requests.' },
  ]}
  multiple
/>`}
      >
        <FaqAccordionView
          faqs={[
            { id: '1', question: 'Why is my request timing out?', answer: 'Check that your environment base URL is reachable and your timeout setting is above the expected response time.' },
            { id: '2', question: 'How do I mock a response for offline testing?', answer: 'Enable the Mock Server toggle on any request and define example responses per status code.' },
            { id: '3', question: 'Can I chain requests using variables?', answer: 'Yes — use the post-response script to set an environment variable, then reference it as {{variable}} in later requests.' },
          ]}
          multiple
        />
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="An empty faqs array renders nothing — pair with your own empty-state message"
        code={`<FaqAccordionView faqs={[]} />
{faqs.length === 0 && <p>No FAQs published yet.</p>}`}
      >
        <FaqAccordionView faqs={[]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>No FAQs published yet.</div>
      </ExampleCard>
    </div>
  );
}
