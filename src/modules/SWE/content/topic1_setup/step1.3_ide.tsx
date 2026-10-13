import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { FileTree } from '../../../../components/content/FileTree';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_3_Ide() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.3 • Setup"
        title="Install the Antigravity IDE"
        summary="Install your code editor and connect it to Linux, so the editor and the terminal live in the same place."
      />

      <p>
        An <strong>IDE</strong> is a text editor with developer tools built in. We use <strong>Antigravity</strong>,
        which has an AI assistant built in. It runs on Windows, but we will connect it to your Ubuntu so that the files
        it edits and the terminal it opens are all on the Linux side.
      </p>

      <Section title="1. Install and sign in" />
      <Steps
        steps={[
          { title: 'Download the Windows installer', children: <p>Go to <code>antigravity.google/download</code> and download the Windows version.</p> },
          { title: 'Run the installer with the default options', children: <p>Keep clicking Next. When it offers to add itself to PATH, leave that ticked.</p> },
          { title: 'Open Antigravity and sign in with your Google account', children: <p>It will open a browser window for you to approve the sign-in.</p> },
        ]}
      />

      <Section title="2. Connect it to WSL" />
      <Steps
        steps={[
          {
            title: 'Open the command palette',
            children: <p>Press <code>Ctrl+Shift+P</code>. A search box appears at the top. Almost everything in an IDE can be done from here.</p>,
          },
          {
            title: 'Search for WSL and choose the connect option',
            children: <p>Type <code>WSL</code> and choose something like <em>WSL: Connect to WSL</em> (the exact wording can change between versions). A new window opens.</p>,
          },
          {
            title: 'Check the bottom-left corner',
            children: <p>It should now say <code>WSL: Ubuntu</code>. That means the editor is working inside Linux.</p>,
          },
          {
            title: 'Open the built-in terminal',
            children: <p>Press <code>Ctrl+`</code> (the key above Tab). You get the same Ubuntu terminal you used in the last step, but inside the editor.</p>,
          },
        ]}
      />

      <Callout type="warning" title="If connecting fails">
        Antigravity updates frequently, and WSL connection problems have been reported after certain updates. If
        connecting fails, copy the exact error and ask your AI helper. Restarting Antigravity, then running{' '}
        <code>wsl --shutdown</code> in PowerShell and trying again, solves most cases.
      </Callout>

      <Section title="3. Make your projects folder" />
      <p>
        Every project you build will live in one folder called <code>Development</code>, inside your Linux home. Run
        this in the terminal. We will explain <code>mkdir</code> properly in step 1.6.
      </p>
      <TerminalBlock lines={[{ path: '~', command: 'mkdir -p ~/Development' }, { path: '~', command: 'cd ~/Development' }, { path: '~/Development', command: 'pwd', output: '/home/anna/Development' }]} />

      <FileTree
        title="Where things live"
        tree={[
          {
            name: 'home',
            children: [
              {
                name: 'anna',
                note: 'your home, written as ~',
                children: [{ name: 'Development', note: 'all your projects go here', children: [] }],
              },
            ],
          },
        ]}
      />

      <Callout type="warning" title="Keep projects inside Linux, never under /mnt/c">
        You can reach Windows files from Linux through <code>/mnt/c</code>, but working there is slow and causes odd
        permission problems. Always keep your code under <code>~/Development</code>.
      </Callout>

      <Collapsible title="Why bother with WSL if the IDE runs on Windows?">
        <p>
          Servers, deployment tools and nearly every tutorial assume Linux. If you practise on Linux from day one, what
          you learn works unchanged when you later run things on a server, which is exactly where Topic 3 is heading.
        </p>
      </Collapsible>

      <Quiz
        question="Where should your projects be stored?"
        options={['On the Windows Desktop', 'Under /mnt/c', 'In ~/Development inside Linux', 'Wherever there is room']}
        correctIndex={2}
        explanation="Files inside Linux are faster and avoid permission problems. ~/Development is our convention."
      />

      <KeyTakeaways
        items={[
          'An IDE is an editor with developer tools, and Antigravity has an AI assistant built in.',
          'Ctrl+Shift+P opens the command palette, and Ctrl+` opens the terminal.',
          'The bottom-left corner says "WSL: Ubuntu" when you are connected correctly.',
          'Keep all projects in ~/Development, not under /mnt/c.',
        ]}
      />
    </div>
  );
}
