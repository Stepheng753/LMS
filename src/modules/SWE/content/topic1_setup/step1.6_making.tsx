import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { FileTree } from '../../../../components/content/FileTree';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_6_Making() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.6 • Bash Basics"
        title="Making Folders & Files"
        summary="Create folders with mkdir and files with touch."
      />

      <p>
        Two commands build almost everything: <code>mkdir</code> makes folders and <code>touch</code> makes files.
        Practice in a scratch area, so make a safe place for it first.
      </p>

      <Section title="1. Folders: mkdir" />
      <TerminalBlock
        lines={[
          { path: '~', command: 'cd ~/Development' },
          { path: '~/Development', command: 'mkdir playground' },
          { path: '~/Development', command: 'cd playground' },
          { path: '~/Development/playground', command: 'mkdir notes drafts' },
          { path: '~/Development/playground', command: 'ls', output: 'drafts  notes' },
        ]}
      />
      <p>
        You can list several names to make several folders at once. To make a whole chain in one go, including parents
        that do not exist yet, add <code>-p</code>:
      </p>
      <TerminalBlock
        lines={[
          { path: '~/Development/playground', command: 'mkdir -p projects/website/images' },
          { path: '~/Development/playground', command: 'ls projects/website', output: 'images' },
        ]}
      />
      <FileTree
        title="What we have built"
        tree={[
          {
            name: 'playground',
            children: [
              { name: 'notes', children: [] },
              { name: 'drafts', children: [] },
              { name: 'projects', children: [{ name: 'website', children: [{ name: 'images', children: [] }] }] },
            ],
          },
        ]}
      />
      <Callout type="info" title="Without -p">
        <code>mkdir projects/website/images</code> fails with &quot;No such file or directory&quot; if{' '}
        <code>projects</code> does not exist yet. With <code>-p</code>, it creates every missing level.
      </Callout>

      <Section title="2. Files: touch" />
      <p>
        <code>touch</code> creates an empty file. It is the quickest way to start a new file you will fill in later.
      </p>
      <TerminalBlock
        lines={[
          { path: '~/Development/playground', command: 'touch todo.txt' },
          { path: '~/Development/playground', command: 'touch notes/ideas.md notes/shopping.txt' },
          { path: '~/Development/playground', command: 'ls notes', output: 'ideas.md  shopping.txt' },
        ]}
      />
      <p>
        <code>touch</code> has a second job: on a file that <em>already exists</em>, it does not change the contents,
        it only updates the &quot;last modified&quot; time. Look at the time column with <code>ls -l</code> before and after:
      </p>
      <TerminalBlock
        lines={[
          { path: '~/Development/playground', command: 'ls -l todo.txt', output: '-rw-r--r-- 1 anna anna 0 Oct 13 09:00 todo.txt' },
          { path: '~/Development/playground', command: 'touch todo.txt' },
          { path: '~/Development/playground', command: 'ls -l todo.txt', output: '-rw-r--r-- 1 anna anna 0 Oct 13 09:07 todo.txt' },
        ]}
      />

      <Compare
        goodLabel="Safe names"
        badLabel="Troublesome names"
        good={<p><code>mkdir my-project</code>, <code>touch my_notes.txt</code></p>}
        bad={<p><code>mkdir my project</code> makes <em>two</em> folders, &quot;my&quot; and &quot;project&quot;</p>}
      />
      <Callout type="tip" title="No spaces in names">
        Spaces separate arguments, so the terminal thinks <code>my project</code> is two things. Use dashes or
        underscores, and prefer lowercase, so names are easy to type.
      </Callout>

      <CommandTable
        title="Making things"
        rows={[
          { command: 'mkdir name', description: 'Create a folder', example: 'mkdir notes' },
          { command: 'mkdir a b c', description: 'Create several folders at once', example: 'mkdir a b c' },
          { command: 'mkdir -p a/b/c', description: 'Create a whole chain, including missing parents', example: 'mkdir -p a/b/c' },
          { command: 'touch file', description: 'Create an empty file, or refresh its timestamp', example: 'touch todo.txt' },
          { command: 'touch a b', description: 'Create several files at once', example: 'touch a.txt b.txt' },
        ]}
      />

      <Exercise
        title="Build a small structure"
        hint={<p>Use <code>-p</code> for the nested folder, then <code>touch</code> with the full path to put a file inside it.</p>}
        solution={
          <TerminalBlock
            lines={[
              { path: '~/Development/playground', command: 'mkdir -p recipes/dinner' },
              { path: '~/Development/playground', command: 'touch recipes/dinner/pasta.txt' },
              { path: '~/Development/playground', command: 'ls recipes/dinner', output: 'pasta.txt' },
            ]}
          />
        }
      >
        <p>
          In your <code>playground</code>, create a folder <code>recipes</code> with a folder <code>dinner</code> inside
          it, then create an empty file <code>pasta.txt</code> inside <code>dinner</code>, using just two commands.
          Confirm with <code>ls</code>.
        </p>
      </Exercise>

      <Quiz
        question="What does touch todo.txt do if todo.txt already exists?"
        options={['Erases it', 'Updates its last-modified time and leaves the contents alone', 'Shows an error', 'Makes a copy']}
        correctIndex={1}
        explanation="touch only creates the file if it is missing. For existing files it just refreshes the timestamp."
      />

      <KeyTakeaways
        items={[
          'mkdir creates folders. Add -p to create a whole chain at once.',
          'touch creates an empty file, and on an existing file only updates its timestamp.',
          'Avoid spaces in names. Use dashes or underscores.',
          'ls and ls -l are how you check the result.',
        ]}
      />
    </div>
  );
}
