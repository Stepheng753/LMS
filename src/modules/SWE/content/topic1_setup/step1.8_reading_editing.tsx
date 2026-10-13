import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_8_ReadingEditing() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.8 • Bash Basics"
        title="Reading & Editing Files"
        summary="Look inside files with cat, head and tail, write quick lines with echo, and edit properly with nano."
      />

      <Section title="1. Reading files" />
      <p>Suppose <code>story.txt</code> has ten lines in it.</p>
      <TerminalBlock
        lines={[
          { path: '~/Development/playground', command: 'cat story.txt', output: 'Line 1\nLine 2\n...\nLine 10' },
          { path: '~/Development/playground', command: 'head -n 3 story.txt', output: 'Line 1\nLine 2\nLine 3' },
          { path: '~/Development/playground', command: 'tail -n 2 story.txt', output: 'Line 9\nLine 10' },
        ]}
      />
      <CommandTable
        title="Looking inside files"
        rows={[
          { command: 'cat file', description: 'Print the whole file', example: 'cat notes.txt' },
          { command: 'head file', description: 'First 10 lines (use -n 3 for the first 3)', example: 'head -n 3 notes.txt' },
          { command: 'tail file', description: 'Last 10 lines (use -n 3 for the last 3)', example: 'tail -n 3 notes.txt' },
        ]}
      />

      <Section title="2. Quick writing: echo and >" />
      <p>
        <code>echo</code> prints text. Add <code>&gt;</code> and the text goes into a file instead of the screen.
      </p>
      <TerminalBlock
        lines={[
          { path: '~/Development/playground', command: 'echo "hello world" > hello.txt' },
          { path: '~/Development/playground', command: 'echo "a second line" >> hello.txt' },
          { path: '~/Development/playground', command: 'cat hello.txt', output: 'hello world\na second line' },
        ]}
      />
      <Callout type="warning" title="One arrow replaces, two arrows add">
        <code>&gt;</code> <strong>replaces</strong> everything already in the file. <code>&gt;&gt;</code> adds to the
        end. Using the wrong one is a classic way to lose text.
      </Callout>

      <Section title="3. Editing properly: nano" />
      <p>
        For anything longer than one line, use <strong>nano</strong>, a small editor that runs inside the terminal. It
        is on every Ubuntu machine and is the friendliest of the terminal editors.
      </p>
      <Steps
        steps={[
          { title: 'Open (or create) a file', children: <TerminalBlock path="~/Development/playground" command="nano notes/ideas.md" /> },
          { title: 'Type', children: <p>Type normally. Use the arrow keys to move. The mouse will not move the cursor.</p> },
          { title: 'Save', children: <p>Press <code>Ctrl+O</code>, then <code>Enter</code> to confirm the file name.</p> },
          { title: 'Exit', children: <p>Press <code>Ctrl+X</code>. If you have unsaved changes it asks. Press <code>Y</code> to save, <code>N</code> to discard.</p> },
        ]}
      />

      <Callout type="info" title="Reading the footer">
        At the bottom of nano you see things like <code>^O Write Out</code> and <code>M-U Undo</code>. The{' '}
        <code>^</code> means <strong>Ctrl</strong> and <code>M-</code> means <strong>Alt</strong>. So{' '}
        <code>^X</code> is Ctrl+X.
      </Callout>

      <Section title="Nano survival kit" />
      <CommandTable
        title="Saving and leaving"
        rows={[
          { command: 'Ctrl+O, Enter', description: 'Save the file ("write out")' },
          { command: 'Ctrl+X', description: 'Exit. It asks to save if there are changes' },
          { command: 'Ctrl+G', description: 'Open the built-in help' },
        ]}
      />
      <CommandTable
        title="Moving around"
        rows={[
          { command: 'Ctrl+A / Ctrl+E', description: 'Jump to the start / end of the line' },
          { command: 'Ctrl+Y / Ctrl+V', description: 'Page up / page down' },
          { command: 'Ctrl+_  (or Ctrl+/)', description: 'Go to a line number' },
          { command: 'Ctrl+C', description: 'Show which line and column the cursor is on' },
          { command: 'Alt+#', description: 'Turn line numbers on or off' },
        ]}
      />
      <CommandTable
        title="Editing"
        rows={[
          { command: 'Ctrl+K', description: 'Cut the whole line' },
          { command: 'Ctrl+U', description: 'Paste what you cut or copied' },
          { command: 'Ctrl+6, then arrows', description: 'Start selecting text. Alt+6 copies it, Ctrl+K cuts it' },
          { command: 'Alt+U / Alt+E', description: 'Undo / redo' },
        ]}
      />
      <CommandTable
        title="Searching"
        rows={[
          { command: 'Ctrl+W', description: 'Search. Press Ctrl+W then Enter again for the next match' },
          { command: 'Ctrl+\\', description: 'Search and replace' },
        ]}
      />

      <Callout type="warning" title="Pasting into the terminal on Windows">
        Plain <code>Ctrl+V</code> may do nothing in a terminal. Paste with <strong>right-click</strong>, or with{' '}
        <code>Ctrl+Shift+V</code>. You will rely on this in step 1.10.
      </Callout>

      <Callout type="tip" title="Stuck inside nano?">
        Press <code>Ctrl+X</code>. If it asks about saving, press <code>N</code> to leave without saving. This always
        gets you out.
      </Callout>

      <Exercise
        title="Write, cut, undo, search, save"
        hint={<p>Cut with <code>Ctrl+K</code>, bring it back with <code>Alt+U</code> (undo) or <code>Ctrl+U</code> (paste). Search with <code>Ctrl+W</code>.</p>}
        solution={
          <TerminalBlock
            lines={[
              { path: '~/Development/playground', command: 'nano practice.txt', output: '(type 3 lines, Ctrl+K on one, Alt+U, Ctrl+W + a word, Ctrl+O Enter, Ctrl+X)' },
              { path: '~/Development/playground', command: 'cat practice.txt' },
            ]}
          />
        }
      >
        <p>
          Open <code>practice.txt</code> in nano and type three lines. Cut the middle line, undo the cut, search for a
          word from your text, save, and exit. Finish by confirming it with <code>cat</code>.
        </p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="In nano, how do you save?"
          options={['Ctrl+S', 'Ctrl+O then Enter', 'Ctrl+X only', 'Alt+F4']}
          correctIndex={1}
          explanation="Ctrl+O (Write Out) saves. Ctrl+X exits."
        />
        <Quiz
          question="What is the difference between > and >> ?"
          options={['None', '> replaces the file, >> adds to the end', '>> replaces the file, > adds to the end', 'One is for folders']}
          correctIndex={1}
          explanation="A single > overwrites. A double >> appends."
        />
        <FillInQuiz
          question="Which command shows the last lines of a file?"
          answer="tail"
          explanation="tail shows the end. head shows the beginning."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'cat shows a whole file, head the start, tail the end.',
          'echo "text" > file replaces, and >> adds. Do not mix them up.',
          'In nano, Ctrl+O saves, Ctrl+X exits, Ctrl+W searches, and Ctrl+K and Ctrl+U cut and paste a line.',
          '^ in the nano footer means Ctrl and M- means Alt.',
          'Paste into the terminal with right-click or Ctrl+Shift+V.',
        ]}
      />
    </div>
  );
}
