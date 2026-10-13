import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_7_CopyMoveDelete() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.7 • Bash Basics"
        title="Copy, Move, Rename & Delete"
        summary="Reorganise your files with cp, mv and rm, and learn the one command that needs real care."
      />

      <p>
        All of these follow the same pattern: <code>command  source  destination</code>. Say it out loud: &quot;copy{' '}
        <em>this</em> to <em>there</em>.&quot; Work inside your <code>playground</code> from the last step.
      </p>

      <Section title="1. Copy: cp" />
      <TerminalBlock
        lines={[
          { path: '~/Development/playground', command: 'cp todo.txt notes/todo-copy.txt' },
          { path: '~/Development/playground', command: 'cp -r notes notes-backup' },
        ]}
      />
      <p>
        Copying a single file just needs <code>cp</code>. To copy a <em>folder</em> and everything in it, add{' '}
        <code>-r</code> (<em>recursive</em>, meaning &quot;and everything inside&quot;).
      </p>

      <Section title="2. Move and rename: mv" />
      <TerminalBlock
        lines={[
          { path: '~/Development/playground', command: 'mv todo.txt drafts/' },
          { path: '~/Development/playground', command: 'mv drafts/todo.txt drafts/shopping.txt' },
        ]}
      />
      <Callout type="info" title="Move and rename are the same command">
        The first line moves <code>todo.txt</code> into <code>drafts</code>. The second keeps the file where it is but
        gives it a new name. Linux treats &quot;rename&quot; as &quot;move to a new name&quot;. Folders move without{' '}
        <code>-r</code>.
      </Callout>

      <Section title="3. Delete: rm" />
      <TerminalBlock
        lines={[
          { path: '~/Development/playground', command: 'rm drafts/shopping.txt' },
          { path: '~/Development/playground', command: 'rm -r notes-backup' },
          { path: '~/Development/playground', command: 'rmdir projects/website/images' },
        ]}
      />
      <CommandTable
        title="Removing things"
        rows={[
          { command: 'rm file', description: 'Delete a file', example: 'rm old.txt' },
          { command: 'rm -r folder', description: 'Delete a folder and everything inside', example: 'rm -r notes-backup' },
          { command: 'rmdir folder', description: 'Delete a folder only if it is empty (the safe version)', example: 'rmdir images' },
        ]}
      />

      <Callout type="warning" title="There is no trash can">
        Deleting with <code>rm</code> is permanent. There is no undo and no recycle bin. Make a habit of running{' '}
        <code>ls</code> on the target first, so you see exactly what you are about to remove. Never run an{' '}
        <code>rm -r</code> command you do not understand. Ask your AI helper to explain it first.
      </Callout>

      <Compare
        goodLabel="Careful"
        badLabel="Careless"
        good={
          <TerminalBlock
            lines={[
              { path: '~/Development/playground', command: 'ls notes-backup', output: 'ideas.md  shopping.txt' },
              { path: '~/Development/playground', command: 'rm -r notes-backup' },
            ]}
          />
        }
        bad={<p>Pasting a delete command from the internet without reading it</p>}
      />

      <CommandTable
        title="Copy, move, delete at a glance"
        rows={[
          { command: 'cp a b', description: 'Copy file a to b', example: 'cp a.txt b.txt' },
          { command: 'cp -r a b', description: 'Copy folder a to b, with contents', example: 'cp -r docs docs-old' },
          { command: 'mv a b', description: 'Move or rename a to b', example: 'mv old.txt new.txt' },
          { command: 'rm a', description: 'Delete file a for good', example: 'rm a.txt' },
          { command: 'rm -r a', description: 'Delete folder a and all of its contents', example: 'rm -r old-folder' },
        ]}
      />

      <Exercise
        title="Copy it, rename it, delete the copy"
        hint={<p>You will use all three commands: <code>cp</code>, then <code>mv</code>, then <code>rm</code>. Check with <code>ls</code> after each.</p>}
        solution={
          <TerminalBlock
            lines={[
              { path: '~/Development/playground', command: 'cp notes/ideas.md drafts/' },
              { path: '~/Development/playground', command: 'mv drafts/ideas.md drafts/ideas-v2.md' },
              { path: '~/Development/playground', command: 'ls drafts', output: 'ideas-v2.md' },
              { path: '~/Development/playground', command: 'rm drafts/ideas-v2.md' },
            ]}
          />
        }
      >
        <p>
          Copy <code>notes/ideas.md</code> into <code>drafts</code>, rename the copy to <code>ideas-v2.md</code>, check
          that it is there, then delete it. The original in <code>notes</code> should still exist.
        </p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="How do you rename a file in Linux?"
          options={['rename a b', 'mv a b', 'cp a b', 'touch a b']}
          correctIndex={1}
          explanation="mv moves, and moving to a new name in the same place is a rename."
        />
        <Quiz
          question="What does the -r in cp -r mean?"
          options={['Read only', 'Remove', 'Recursive: include everything inside the folder', 'Rename']}
          correctIndex={2}
          explanation="Recursive means the command also applies to everything inside the folder."
        />
        <Quiz
          question="You delete a file with rm. Where does it go?"
          options={['The trash can', 'A hidden backup folder', 'Nowhere, it is gone for good', 'The Downloads folder']}
          correctIndex={2}
          explanation="rm has no trash. Check twice before you run it."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'All three commands follow command source destination.',
          'Add -r when the thing is a folder (for cp and rm).',
          'mv does both moving and renaming.',
          'rm is permanent. Look with ls first and never run an rm -r you do not understand.',
        ]}
      />
    </div>
  );
}
