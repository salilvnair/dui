import { LineDiffView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const BEFORE = [
  '{',
  '  "name": "@salilvnair/dui",',
  '  "version": "1.0.10",',
  '  "main": "./dist/index.js"',
  '}',
].join('\n');

const AFTER = [
  '{',
  '  "name": "@salilvnair/dui",',
  '  "version": "1.0.11",',
  '  "main": "./dist/index.js",',
  '  "types": "./dist/index.d.ts"',
  '}',
].join('\n');

export function LineDiffViewExamples() {
  return (
    <>
      <ExampleCard
        title="Two texts, side by side"
        description="The changed lines marked, with no Monaco anywhere near it"
        code={'<LineDiffView left={before} right={after} leftLabel="Before" rightLabel="After" />'}
      >
        <div style={{ width: '100%' }}>
          <LineDiffView
            left={BEFORE}
            right={AFTER}
            leftLabel="Before"
            rightLabel="After"
            height={200}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="When one side does not exist"
        description="A note beside the label says so, rather than showing an empty pane with no explanation"
        code={'<LineDiffView left="" right={after} leftNote="not present" />'}
      >
        <div style={{ width: '100%' }}>
          <LineDiffView
            left=""
            right={AFTER}
            leftLabel="Remote"
            leftNote="not present"
            rightLabel="Local"
            rightNote="package.json"
            height={180}
          />
        </div>
      </ExampleCard>
    </>
  );
}
