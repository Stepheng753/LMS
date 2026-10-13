import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_4_Agy() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.4 • Setup"
        title="Agy: Your Terminal Helper"
        summary="Install an AI assistant that lives inside the terminal and can set things up for you."
      />

      <p>
        <strong>Agy</strong> is the Antigravity command-line tool. Run it inside the terminal and you can ask for
        things in plain English, like &quot;check my WSL networking mode&quot; or &quot;install the tool called
        tree&quot;. It works out the commands, shows them to you, and runs them once you approve. From now on, it is
        your first stop when something in the terminal confuses you.
      </p>

      <Section title="1. Install it in Ubuntu" />
      <Callout type="info" title="Run this in Ubuntu, not PowerShell">
        Use the Antigravity terminal from the last step, or open the Ubuntu app. You should see a prompt ending in{' '}
        <code>$</code>, not <code>PS C:\</code>.
      </Callout>
      <TerminalBlock
        lines={[
          { path: '~', command: 'curl -fsSL https://antigravity.google/cli/install.sh | bash' },
          { path: '~', command: 'agy --version' },
        ]}
      />
      <p>
        The first command downloads Google&apos;s installer and runs it. The second checks that the install worked by
        printing a version number.
      </p>
      <Callout type="warning" title="Installers change">
        Install commands are occasionally updated. If the one above fails, check <code>antigravity.google/download</code>{' '}
        for the current Linux command, or paste the error to your other AI helper.
      </Callout>

      <Collapsible title='"agy: command not found"'>
        <p>
          The installer puts <code>agy</code> in a hidden folder, <code>~/.local/bin</code>. Close the terminal and open
          a fresh one, since Ubuntu adds that folder to its search list when a new session starts. If it still is not
          found, ask your AI helper: &quot;agy is installed in ~/.local/bin but my shell cannot find it.&quot;
        </p>
      </Collapsible>

      <Section title="2. Sign in and say hello" />
      <Steps
        steps={[
          { title: 'Start it', children: <TerminalBlock path="~" command="agy" /> },
          { title: 'Sign in', children: <p>The first run opens your web browser so you can log in with your Google account. Approve it and return to the terminal.</p> },
          {
            title: 'Ask for something small',
            children: <p>Try: <em>&quot;Run the command that shows which networking mode WSL is using, and explain the result.&quot;</em></p>,
          },
          { title: 'Read before you approve', children: <p>Agy will show you the command it wants to run. Read it. If you do not understand it, answer with &quot;explain that command first&quot;.</p> },
        ]}
      />

      <Section title="3. Asking well" />
      <Compare
        goodLabel="Specific"
        badLabel="Vague"
        good={
          <p>
            &quot;Install the tool called <code>tree</code>, then show me what it does in my Development folder.&quot;
          </p>
        }
        bad={<p>&quot;Make my computer better for coding&quot;</p>}
      />

      <Callout type="warning" title="You are the one in charge">
        Agy can run real commands on your machine. Treat it like a capable coworker: give clear instructions, read what
        it proposes, and be especially careful with anything that deletes files (<code>rm</code>) or asks for{' '}
        <code>sudo</code>. When unsure, say no and ask it to explain.
      </Callout>

      <Callout type="tip" title="Two helpers, two jobs">
        Use <strong>Agy</strong> when you want something done on your machine. Use your <strong>regular AI chat</strong>{' '}
        when you want to understand something or you are stuck before Agy is working.
      </Callout>

      <Quiz
        question="Agy suggests a command you do not recognise. What do you do?"
        options={[
          'Approve it. The AI knows best',
          'Close the terminal',
          'Ask Agy to explain the command before approving',
          'Retype it manually without reading it',
        ]}
        correctIndex={2}
        explanation="You stay in charge. Asking for an explanation costs nothing and is how you learn the commands."
      />

      <KeyTakeaways
        items={[
          'Agy is an AI helper that runs inside the terminal and can carry out tasks in plain English.',
          'Install it inside Ubuntu, then verify with agy --version.',
          'Always read the command it proposes before approving, especially anything with rm or sudo.',
          'Clear, specific requests get better results than vague ones.',
        ]}
      />
    </div>
  );
}
