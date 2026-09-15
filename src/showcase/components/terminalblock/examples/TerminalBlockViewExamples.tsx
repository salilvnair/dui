import { TerminalBlockView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TerminalBlockViewExamples() {
  return (
    <>
      <ExampleCard
        title="A block of shell"
        description="Monospace on a terminal ground, with a title bar"
        code={'<TerminalBlockView title="Install" code={"npm install @salilvnair/dui"} />'}
      >
        <TerminalBlockView
          title="Install"
          code={'npm install @salilvnair/dui react react-dom zustand\nnpm run dev'}
        />
      </ExampleCard>

      <ExampleCard
        title="Output, not input"
        description="Equally at home holding what a command printed"
        code={'<TerminalBlockView code={output} />'}
      >
        <TerminalBlockView
          title="kubectl get pods"
          code={'NAME                     READY   STATUS    RESTARTS   AGE\napi-7d4f9c8b6-2xk4m      1/1     Running   0          4d\napi-7d4f9c8b6-9wq2n      1/1     Running   2          4d\nworker-5b8d7f4c9-lm3pq   0/1     Pending   0          12m'}
        />
      </ExampleCard>

      <ExampleCard
        title="Forcing the ground"
        description="Follows the app theme by default; dark pins it"
        code={'<TerminalBlockView dark code={"echo hello"} />'}
      >
        <TerminalBlockView dark code={'echo "always dark, whatever the page is doing"'} />
      </ExampleCard>
    </>
  );
}
