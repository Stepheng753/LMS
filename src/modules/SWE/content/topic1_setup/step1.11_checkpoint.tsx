import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_11_Checkpoint() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.11 • Checkpoint"
        title="Checkpoint Project"
        summary="Prove to yourself that you can do everything in Topic 1. No answers are checked. You are the judge."
      />

      <p>
        This is not a test with a score. It is a list of small jobs. Do each one in your terminal, without looking back
        at the lessons if you can. If you get stuck, open the hint, reread the relevant step, or ask Agy.
      </p>

      <Callout type="info" title="How this works">
        When you can honestly say &quot;yes, I can do that&quot; to every task below, press <strong>Mark as
        Complete</strong> at the bottom of this page. That is your sign-off.
      </Callout>

      <Section title="The tasks" />
      <Steps
        steps={[
          {
            title: 'Make a workspace',
            children: (
              <>
                <p>
                  Inside <code>~/Development</code>, create a folder called <code>checkpoint</code>. Inside it make
                  three folders: <code>notes</code>, <code>drafts</code> and <code>archive</code>.
                </p>
                <Collapsible title="Hint" className="mt-2">
                  <p>You can make all three with a single <code>mkdir</code> by listing the names. Remember to <code>cd</code> into <code>checkpoint</code> first.</p>
                </Collapsible>
              </>
            ),
          },
          {
            title: 'Create files',
            children: (
              <>
                <p>
                  Create an empty file called <code>todo.txt</code> using <code>touch</code>. Then create{' '}
                  <code>hello.txt</code> inside <code>notes</code>, write three lines in it using nano, and save.
                </p>
                <Collapsible title="Hint" className="mt-2">
                  <p><code>nano notes/hello.txt</code>, type, <code>Ctrl+O</code>, <code>Enter</code>, <code>Ctrl+X</code>.</p>
                </Collapsible>
              </>
            ),
          },
          {
            title: 'Copy and rename',
            children: (
              <>
                <p>Copy <code>hello.txt</code> into <code>drafts</code>, then rename the copy to <code>hello-v2.txt</code>.</p>
                <Collapsible title="Hint" className="mt-2">
                  <p>First <code>cp</code>, then <code>mv</code> with the same folder and a new name.</p>
                </Collapsible>
              </>
            ),
          },
          {
            title: 'Move',
            children: <p>Move <code>todo.txt</code> into <code>archive</code>.</p>,
          },
          {
            title: 'Read',
            children: (
              <p>
                Show the whole of <code>notes/hello.txt</code>, then only its first line, then only its last line.
              </p>
            ),
          },
          {
            title: 'See it all',
            children: (
              <>
                <p>Show your whole <code>checkpoint</code> structure with <code>ls -R</code> or, better, with <code>tree</code>.</p>
                <Collapsible title="Hint" className="mt-2">
                  <p>If <code>tree</code> is not found, you skipped step 1.9. Install it with <code>sudo apt install tree</code>.</p>
                </Collapsible>
              </>
            ),
          },
          {
            title: 'Clean up',
            children: (
              <>
                <p>
                  Delete the entire <code>checkpoint</code> folder and everything in it, then prove it is gone.
                </p>
                <Collapsible title="Hint" className="mt-2">
                  <p>First <code>cd ..</code> out of the folder. Then <code>rm -r</code>. Check with <code>ls</code>. Remember: no undo.</p>
                </Collapsible>
              </>
            ),
          },
          {
            title: 'Make your own alias',
            children: (
              <>
                <p>
                  Add one alias of your own to <code>~/.bash_aliases</code>, reload with <code>source</code>, and use it.
                </p>
              </>
            ),
          },
          {
            title: 'Ask for help',
            children: (
              <p>
                Start <code>agy</code> and ask it to explain one command from this track that you are not fully
                comfortable with. Read the answer.
              </p>
            ),
          },
        ]}
      />

      <Section title="Before you tick the box" />
      <p>Ask yourself honestly:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>I know where I am in the file system, and how to get anywhere else.</li>
        <li>I can create, copy, move and delete files and folders and I know which of those cannot be undone.</li>
        <li>I can write and save a file in nano, and get out of it when I am stuck.</li>
        <li>I can install a program with apt.</li>
        <li>When something goes wrong I know what to copy, and who to ask.</li>
      </ul>

      <Callout type="success" title="Ready for Topic 2">
        If that is all true, you are ready to start planning and organising real projects. If one line felt shaky, go
        back to that step, which will take about ten minutes, then return here.
      </Callout>

      <KeyTakeaways
        items={[
          'You can navigate, create, copy, move, read, edit and delete from the terminal.',
          'You can install software and customise your environment.',
          'You know how to get unstuck by using the error message and your AI helpers.',
        ]}
      />
    </div>
  );
}
