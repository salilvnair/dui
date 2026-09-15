import { SetupOptionView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { ButtonView } from '@/dui';

export function SetupOptionViewExamples() {
  return (
    <>
      <ExampleCard
        title="One route to getting set up"
        description="A title, a marker, the command, and why you would pick this one"
        code={'<SetupOptionView title="winget" recommended command="winget install ..." />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <SetupOptionView
            title="winget"
            tag="recommended"
            recommended
            command="winget install Kubernetes.kubectl"
            note="Ships with Windows 11 and keeps itself updated."
          />
          <SetupOptionView
            title="Homebrew"
            tag="macOS"
            command="brew install kubectl"
          />
          <SetupOptionView
            title="apt"
            tag="needs admin"
            command="sudo apt-get install -y kubectl"
            note="You will be asked for your password."
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With a control in the header"
        description="A link out, a picker, or a button that does it for you"
        code={'<SetupOptionView title="Sign in with a browser" action={<ButtonView size="sm">Open</ButtonView>} />'}
      >
        <SetupOptionView
          title="Sign in with a browser"
          tag="no install"
          note="Opens your default browser and waits for the callback."
          action={<ButtonView size="sm" variant="secondary">Open</ButtonView>}
        />
      </ExampleCard>
    </>
  );
}
