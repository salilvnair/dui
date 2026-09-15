import { FindingCardView, ButtonView, BadgeChipView, TerminalBlockView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function FindingCardViewExamples() {
  return (
    <>
      <ExampleCard
        title="Four severities"
        description="The colour comes from the severity — a finding is not a place to invent a palette"
        code={'<FindingCardView severity="critical" title="Heap grew 412 MB" detail="…" />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <FindingCardView
            severity="critical"
            title="Heap grew 412 MB across 3 dumps"
            meta="LEAK-001"
            detail="byte[] retained by OrderCache rose from 88 MB to 500 MB while request volume stayed flat."
            remediation="Cap the cache, or give it a time-based eviction policy."
            actions={<ButtonView size="xs" variant="ghost">Dismiss</ButtonView>}
          />
          <FindingCardView
            severity="warning"
            title="4 threads blocked on the same monitor"
            meta="THREAD-014"
            detail="All four are waiting on com.example.SessionStore.lock, held by http-nio-8080-2."
          />
          <FindingCardView
            severity="info"
            title="Compression is off for this route"
            detail="Responses average 240 KB. gzip would take that to roughly 30 KB."
          />
          <FindingCardView severity="success" title="No blocked threads in this dump" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With evidence"
        description="Children take anything structured — a stack, a table, a chart — and sit below the detail"
        code={'<FindingCardView …>{<TerminalBlockView code={stack} />}</FindingCardView>'}
      >
        <FindingCardView
          severity="critical"
          title="Deadlock between two worker threads"
          meta="THREAD-002"
          detail="Neither thread can proceed; both have been in this state for the whole capture."
          remediation="Take the two locks in a consistent order, or collapse them into one."
          actions={<BadgeChipView size="2xs" tone="var(--color-error)">blocking</BadgeChipView>}
        >
          <TerminalBlockView
            code={'"worker-1" waiting to lock <0x000000076ab> held by "worker-2"\n"worker-2" waiting to lock <0x000000076cd> held by "worker-1"'}
          />
        </FindingCardView>
      </ExampleCard>
    </>
  );
}
