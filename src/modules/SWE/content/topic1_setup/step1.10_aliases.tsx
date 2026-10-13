import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { ALIASES } from '../../toolkit/texts';

export default function Step1_10_Aliases() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.10 • Make It Yours"
        title="Customise Your Terminal"
        summary="Install a ready-made set of shortcuts and a colourful prompt by editing your first config file."
      />

      <p>
        An <strong>alias</strong> is a nickname for a longer command. For example, typing <code>cls</code> instead of{' '}
        <code>clear</code>. We keep our aliases in a config file called <code>.bash_aliases</code> in your home folder.
        Bash reads it every time a terminal opens. This is also your first real config file, and you will use
        everything from the last few steps to create it.
      </p>

      <Section title="Install it" />
      <Steps
        steps={[
          {
            title: 'Go home and open the file in nano',
            children: (
              <>
                <TerminalBlock
                  lines={[
                    { path: '~/Development', command: 'cd ~' },
                    { path: '~', command: 'nano .bash_aliases' },
                  ]}
                />
                <p>It does not exist yet, so nano opens an empty file that will be created when you save.</p>
              </>
            ),
          },
          {
            title: 'Copy the text below and paste it into nano',
            children: (
              <p>
                Use the copy button on the code block. Then in the terminal, paste with{' '}
                <strong>right-click</strong> or <code>Ctrl+Shift+V</code>. All of it, from <code>export COLOR_NC</code>{' '}
                to the last alias.
              </p>
            ),
          },
          { title: 'Save and exit', children: <p><code>Ctrl+O</code>, <code>Enter</code>, then <code>Ctrl+X</code>.</p> },
          {
            title: 'Load it now',
            children: (
              <>
                <TerminalBlock path="~" command="source ~/.bashrc" />
                <p>
                  Ubuntu&apos;s <code>.bashrc</code> already loads <code>.bash_aliases</code> when it exists.{' '}
                  <code>source</code> tells the current terminal to re-read it right now instead of waiting for you to
                  reopen it.
                </p>
              </>
            ),
          },
        ]}
      />

      <CodeBlock language="bash" title="~/.bash_aliases" code={ALIASES} />

      <Callout type="success" title="Success looks like this">
        Your prompt turns colourful and now starts with the date and time. Folder names in <code>ls</code> become
        yellow, executables green. Try <code>ll</code> and <code>la</code>.
      </Callout>

      <Section title="What you just installed" />
      <CommandTable
        title="Your new shortcuts"
        rows={[
          { command: 'cls', description: 'Same as clear. CLS and cls2 (clears twice) also work' },
          { command: 'll', description: 'List files in a detailed, readable form (sizes like 4.0K) sorted by type' },
          { command: 'la', description: 'Like ll, but includes hidden files' },
          { command: 'grep', description: 'Search inside text, with the matches highlighted (coming later)' },
          { command: 'py', description: 'Shortcut for python3 (for later)' },
          { command: 'gs, ga, gc', description: 'Shortcuts for git status, git add and git commit -m (for the next topic)' },
        ]}
      />
      <p>
        The long block at the top does two cosmetic jobs. The <code>COLOR_</code> lines define names for colours. They
        are then used to colour your folder names (<code>LS_COLORS</code>) and to build your prompt (<code>PS1</code>).
        You do not need to understand it yet. Just know that this is where those looks come from.
      </p>

      <Callout type="info" title="Some of these are for later">
        <code>py</code>, <code>gs</code>, <code>ga</code> and <code>gc</code> rely on Python and Git, which we have not
        installed yet. They will not do anything useful until we do. They are here so you never have to set this file up
        again.
      </Callout>

      <Section title="Add your own" />
      <p>
        Open the file again with <code>nano ~/.bash_aliases</code> and add a line at the bottom, such as one that jumps
        to your projects folder:
      </p>
      <CodeBlock language="bash" title="Add at the bottom" code={`alias dev='cd ~/Development'`} />
      <p>Save, run <code>source ~/.bashrc</code>, and then typing <code>dev</code> takes you there from anywhere.</p>

      <Collapsible title="Something looks wrong">
        <ul className="list-disc pl-5 space-y-1">
          <li>Strange characters in the prompt: you may have pasted only part of the text. Open the file with nano, select everything with <code>Ctrl+6</code> and delete it, and paste again.</li>
          <li>Nothing changed: run <code>source ~/.bashrc</code>, or close the terminal and open a new one.</li>
          <li>Still stuck: paste the full output into your AI helper, or ask Agy to check the file.</li>
        </ul>
      </Collapsible>

      <Quiz
        question="Why do we run source ~/.bashrc after editing .bash_aliases?"
        options={[
          'To delete the file',
          'To make the open terminal re-read its configuration right now',
          'To install Linux',
          'To save the file',
        ]}
        correctIndex={1}
        explanation="Bash only reads its config when a terminal starts. source re-reads it in the terminal you are already using."
      />

      <KeyTakeaways
        items={[
          'An alias is a nickname for a longer command, kept in ~/.bash_aliases.',
          'After editing a config file, run source ~/.bashrc to apply it immediately.',
          'Paste into a terminal with right-click or Ctrl+Shift+V.',
          'Add your own aliases by appending lines to the file.',
        ]}
      />
    </div>
  );
}
