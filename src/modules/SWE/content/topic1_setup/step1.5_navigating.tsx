import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { FileTree } from '../../../../components/content/FileTree';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_5_Navigating() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.5 • Bash Basics"
        title="Getting Around"
        summary="Find out where you are, look around, and move between folders."
      />

      <p>
        The file system is a tree of folders inside folders. In the terminal you are always <em>standing</em> in one
        folder, called your <strong>current directory</strong>. Three commands cover most of what you need: one tells
        you where you are, one lists what is here, and one moves you.
      </p>

      <FileTree
        title="A typical home folder"
        tree={[
          {
            name: 'anna',
            note: '~ (home)',
            children: [
              { name: 'Development', children: [{ name: 'notes.txt' }, { name: 'ideas.md' }] },
              { name: 'Documents', children: [] },
              { name: '.bashrc', note: 'hidden file' },
            ],
          },
        ]}
      />

      <Section title="1. Where am I? pwd" />
      <p>
        <code>pwd</code> stands for <em>print working directory</em>. It prints your current location as a path.
      </p>
      <TerminalBlock path="~" command="pwd" output="/home/anna" />

      <Section title="2. What is here? ls" />
      <TerminalBlock
        lines={[
          { path: '~', command: 'ls', output: 'Development  Documents' },
          {
            path: '~',
            command: 'ls -la',
            output: `total 24
drwxr-x--- 4 anna anna 4096 Oct 13 09:00 .
drwxr-xr-x 3 root root 4096 Oct 13 08:50 ..
-rw-r--r-- 1 anna anna 3771 Oct 13 08:50 .bashrc
drwxr-xr-x 2 anna anna 4096 Oct 13 09:00 Development
drwxr-xr-x 2 anna anna 4096 Oct 13 09:00 Documents`,
          },
        ]}
      />
      <p>
        Plain <code>ls</code> hides files whose names start with a dot. The flags change that:
      </p>
      <Table
        headers={['Command', 'What you see']}
        rows={[
          [<code key="a">ls</code>, 'Names only, hiding dotfiles'],
          [<code key="b">ls -l</code>, 'One item per line with size, date and permissions'],
          [<code key="c">ls -la</code>, 'The same, plus hidden files'],
          [<code key="d">ls Development</code>, 'Looks inside Development without moving there'],
        ]}
      />

      <Section title="3. Moving: cd" />
      <p>
        <code>cd</code> means <em>change directory</em>.
      </p>
      <TerminalBlock
        lines={[
          { path: '~', command: 'cd Development', output: '' },
          { path: '~/Development', command: 'pwd', output: '/home/anna/Development' },
          { path: '~/Development', command: 'cd ..', output: '' },
          { path: '~', command: 'cd /', output: '' },
          { path: '/', command: 'cd ~', output: '' },
        ]}
      />
      <CommandTable
        title="Moving around"
        rows={[
          { command: 'cd folder', description: 'Go into a folder inside the current one', example: 'cd Development' },
          { command: 'cd ..', description: 'Go up one level (to the parent)', example: 'cd ..' },
          { command: 'cd ~', description: 'Go home, from anywhere (plain cd does the same)', example: 'cd ~' },
          { command: 'cd -', description: 'Jump back to where you just were', example: 'cd -' },
          { command: 'cd /home/anna', description: 'Go to an exact path (absolute)', example: 'cd /home/anna/Documents' },
        ]}
      />

      <Section title="Absolute vs relative paths" />
      <p>
        A path starting with <code>/</code> is <strong>absolute</strong>: it works from anywhere. A path that does not
        is <strong>relative</strong>: it is measured from where you are standing. <code>.</code> means &quot;here&quot;
        and <code>..</code> means &quot;one level up&quot;.
      </p>

      <Section title="Terminal survival keys" />
      <CommandTable
        title="Shortcuts that save the most time"
        rows={[
          { command: 'Tab', description: 'Auto-completes names. Type cd Dev then press Tab' },
          { command: '↑ / ↓', description: 'Scroll through commands you typed before' },
          { command: 'Ctrl+C', description: 'Stop whatever is running right now' },
          { command: 'clear', description: 'Wipe the screen (Ctrl+L does the same)' },
          { command: 'ls --help', description: 'Most commands print their own manual with --help' },
          { command: 'man ls', description: 'The full manual. Press q to leave' },
        ]}
      />

      <Callout type="tip" title="Tab is your best friend">
        Never type a long name in full. Type the first few letters and press Tab. If it beeps, press Tab twice to see
        the options. This also prevents typos.
      </Callout>

      <Exercise
        title="Go there and back"
        hint={<p>Start with <code>pwd</code> so you know where you are. Then <code>cd</code> into Development, and use <code>cd ..</code> to come back up.</p>}
        solution={
          <TerminalBlock
            lines={[
              { path: '~', command: 'cd ~' },
              { path: '~', command: 'cd Development' },
              { path: '~/Development', command: 'pwd', output: '/home/anna/Development' },
              { path: '~/Development', command: 'cd ..' },
              { path: '~', command: 'ls -la' },
            ]}
          />
        }
      >
        <p>
          Starting from anywhere: go to your home folder, go into <code>Development</code>, confirm with{' '}
          <code>pwd</code>, go back up one level, and list everything (including hidden files) in your home.
        </p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="You are in /home/anna/Development. What does cd .. do?"
          options={['Goes to /', 'Goes to /home/anna', 'Does nothing', 'Deletes the folder']}
          correctIndex={1}
          explanation=".. means the parent directory, one level up."
        />
        <Quiz
          question="Which command shows hidden files?"
          options={['ls', 'ls -l', 'ls -la', 'pwd']}
          correctIndex={2}
          explanation="The -a flag means 'all', so it includes dotfiles."
        />
        <FillInQuiz
          question="Which command prints your current location?"
          answer="pwd"
          explanation="pwd = print working directory."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'pwd tells you where you are, ls shows what is here, and cd moves you.',
          'Absolute paths start with /, relative paths start from where you are. .. is up one level.',
          'ls -la reveals hidden files and details.',
          'Use Tab to autocomplete, the up arrow to repeat commands, and Ctrl+C to stop something.',
        ]}
      />
    </div>
  );
}
