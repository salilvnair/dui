import { useState } from 'react';
import { NpsSurveyView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function NpsSurveyViewExamples() {
  const [score1, setScore1] = useState<number | null>(null);
  const [score2, setScore2] = useState<number | null>(null);
  const [followUp2, setFollowUp2] = useState('');
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [score3, setScore3] = useState<number | null>(9);
  const [score4, setScore4] = useState<number | null>(null);

  return (
    <div>
      <ExampleCard
        title="Basic NPS Picker"
        description="Default question with a 0-10 score grid"
        code={`const [score, setScore] = useState<number | null>(null);
<NpsSurveyView score={score} onScoreChange={setScore} />`}
      >
        <NpsSurveyView score={score1} onScoreChange={setScore1} />
      </ExampleCard>

      <ExampleCard
        title="With Follow-up Reason (interactive)"
        description="Selecting a score reveals a free-text follow-up and submit button"
        code={`const [score, setScore] = useState(null);
const [followUp, setFollowUp] = useState('');
<NpsSurveyView
  score={score}
  onScoreChange={setScore}
  followUp={followUp}
  onFollowUpChange={setFollowUp}
  onSubmit={() => sendNps(score, followUp)}
/>`}
      >
        <NpsSurveyView
          score={score2}
          onScoreChange={setScore2}
          followUp={followUp2}
          onFollowUpChange={setFollowUp2}
          onSubmit={() => setSubmitted(p => [...p, `Score ${score2}: ${followUp2 || '(no reason)'}`])}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Last submitted: {submitted.length > 0 ? submitted[submitted.length - 1] : 'none yet'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Product-Specific Question"
        description="Override the default question for a targeted in-app survey"
        code={`<NpsSurveyView
  question="How likely are you to recommend Daakia to another developer?"
  score={score}
  onScoreChange={setScore}
/>`}
      >
        <NpsSurveyView question="How likely are you to recommend Daakia to another developer?" score={score3} onScoreChange={setScore3} />
      </ExampleCard>

      <ExampleCard
        title="Color-coded Score Ranges"
        description="Scores 0-6 render red (detractor), 7-8 amber (passive), 9-10 green (promoter) automatically"
        code={`// colorFor(n) is internal: n <= 6 error, n <= 8 warning, else success
<NpsSurveyView score={score} onScoreChange={setScore} />`}
      >
        <NpsSurveyView score={score4} onScoreChange={setScore4} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Try clicking 4 (red), 7 (amber), and 10 (green) to see the color change.
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="The accent color affects the submit button; score cells always use the red/amber/green scale"
        code={`<NpsSurveyView score={score} onScoreChange={setScore} color="var(--color-info)" />`}
      >
        <NpsSurveyView score={null} onScoreChange={() => {}} color="var(--color-info)" />
      </ExampleCard>
    </div>
  );
}
