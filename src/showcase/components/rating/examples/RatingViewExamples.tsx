import { useState } from 'react';
import { RatingView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function RatingViewExamples() {
  const [basic, setBasic] = useState(3);
  const [feedback, setFeedback] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [reliability, setReliability] = useState(4.5);
  const [uptime, setUptime] = useState(3.5);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div>
      <ExampleCard
        title="Default Star Rating"
        description="Whole-step star rating with a controlled value"
        code={`const [value, setValue] = useState(3);

<RatingView value={value} onChange={setValue} />`}
      >
        <RatingView value={basic} onChange={setBasic} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Value: {basic} / 5
        </div>
      </ExampleCard>

      <ExampleCard
        title="Post-Request Feedback Widget (interactive)"
        description="Rate an API response before submitting — real handler logic with a submit button"
        code={`const [feedback, setFeedback] = useState(0);
const [submitted, setSubmitted] = useState(false);

<RatingView value={feedback} onChange={setFeedback} max={5} />
<button disabled={feedback === 0} onClick={() => setSubmitted(true)}>
  Submit feedback
</button>
{submitted && <p>Thanks for rating this response {feedback}/5!</p>}`}
      >
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
            How was this API response?
          </div>
          <RatingView value={feedback} onChange={v => { setFeedback(v); setSubmitted(false); }} max={5} />
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              disabled={feedback === 0}
              onClick={handleSubmit}
              style={{
                fontSize: 11, padding: '5px 12px', borderRadius: 6,
                border: '1px solid var(--color-surface-border)',
                background: feedback === 0 ? 'var(--color-surface)' : 'var(--color-primary)',
                color: feedback === 0 ? 'var(--color-text-muted)' : '#fff',
                cursor: feedback === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              Submit feedback
            </button>
            {submitted && (
              <span style={{ marginLeft: 10, fontSize: 11, color: 'var(--color-success)' }}>
                Thanks for rating this response {feedback}/5!
              </span>
            )}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Half-Steps, Icon & Color Showcase"
        description="allowHalf for precise ratings, icon='heart', and a custom accent color"
        code={`<RatingView value={4.5} allowHalf max={5} color="var(--color-warning)" />
<RatingView value={3.5} onChange={setUptime} allowHalf icon="heart" color="var(--color-error)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--color-text-muted)', marginBottom: 4 }}>Default star, half-step</div>
            <RatingView value={reliability} onChange={setReliability} allowHalf max={5} color="var(--color-warning)" />
          </div>
          <div>
            <div style={{ fontSize: 10.5, color: 'var(--color-text-muted)', marginBottom: 4 }}>Heart icon, custom color</div>
            <RatingView value={uptime} onChange={setUptime} allowHalf icon="heart" color="var(--color-error)" />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Team Member Endpoint Reliability Score"
        description="Domain-realistic use case: rating a mocked endpoint's reliability in an API testing tool"
        code={`<RatingView
  value={endpointScore}
  onChange={setEndpointScore}
  max={5}
  allowHalf
  color="var(--color-info)"
/>
<span>{endpointScore.toFixed(1)} avg over 128 test runs</span>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <RatingView value={4.5} readOnly allowHalf max={5} color="var(--color-info)" />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>4.5 avg over 128 test runs</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Read-Only Rating (Edge Case)"
        description="readOnly disables interaction entirely — useful for displaying historical or aggregate scores"
        code={`<RatingView value={4.5} allowHalf readOnly />
<RatingView value={0} readOnly />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RatingView value={4.5} allowHalf readOnly />
          <div style={{ fontSize: 10.5, color: 'var(--color-text-muted)' }}>Empty / unrated state:</div>
          <RatingView value={0} readOnly />
        </div>
      </ExampleCard>
    </div>
  );
}
