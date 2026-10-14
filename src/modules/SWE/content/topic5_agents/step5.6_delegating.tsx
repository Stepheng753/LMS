import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { TASK_BRIEF_TEMPLATE } from '../topic_toolkit/tools/tools_agents';

export default function Step5_6_Delegating() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 5.6 • Autonomous Agents"
        title="Delegating Well: Briefs and Supervision"
        summary="The skill that matters most with any agent: describing the job so it is done right, and checking the result."
      />

      <p>
        Handing a job to an agent is like handing it to a new colleague who is fast, tireless, completely literal, and who
        has never met you. If you are vague, they will guess. If you do not say what is off-limits, they will not know. The
        quality of the result depends far more on <strong>your brief</strong> than on which agent you pick.
      </p>

      <Compare
        goodLabel="A good brief"
        badLabel="A vague request"
        good={
          <p>&quot;Read the files in <code>notes/</code> (read-only). List every appointment with its date, in a table, sorted by date. Do not change any file. If a date is unclear, mark it &quot;unclear&quot; and do not guess.&quot;</p>
        }
        bad={<p>&quot;Sort out my notes.&quot;</p>}
      />

      <Section title="The task brief" />
      <p>
        A brief answers nine questions. You met the same idea as a spec in Topics 2 and 4: tell the AI what, where, how, and
        when it is done. Here is a template for an agent, which you can fill in for any job. It is also in your Toolkit.
      </p>
      <CodeBlock language="markdown" title="Task brief template" code={TASK_BRIEF_TEMPLATE} />
      <Table
        headers={['Part', 'Why it matters']}
        rows={[
          [<strong key="a">Goal</strong>, 'A clear target. Without one, "done" is a guess'],
          [<strong key="b">Context</strong>, 'What it cannot know: your situation, preferences, files'],
          [<strong key="c">Allowed</strong>, 'The exact tools, folders and sites. A short list is a safe list'],
          [<strong key="d">Not allowed</strong>, 'The things it must never do. Say it outright: delete, send, spend, post'],
          [<strong key="e">Ask me before</strong>, 'Where the approvals go'],
          [<strong key="f">Done when</strong>, 'How you will judge the result, so you can check it'],
          [<strong key="g">Format</strong>, 'Where the output goes and what it looks like'],
          [<strong key="h">Limits</strong>, 'Time, steps and money, so it cannot run on forever'],
          [<strong key="i">If unsure</strong>, 'The most important line: stop and ask, never guess'],
        ]}
      />

      <Section title="Climb the trust ladder" />
      <Steps
        steps={[
          { title: 'Suggest only', children: <p>First ask it to <strong>propose a plan</strong> without doing anything. Read the plan. Is it what you meant?</p> },
          { title: 'Read-only run', children: <p>Let it do the job with <strong>read-only</strong> access, and look at the output. Does it match your &quot;done when&quot;?</p> },
          { title: 'Act with approval', children: <p>Let it make changes, but <strong>approve each one</strong>. Read each approval.</p> },
          { title: 'Act within limits', children: <p>Only after several good runs, give it freedom on a short list of safe, reversible actions.</p> },
          { title: 'Check, always', children: <p>Even at the top step, spot-check results and read logs. Trust is earned and re-earned.</p> },
        ]}
      />
      <Callout type="warning" title="Backups before write access">
        Before you let any agent change files, back them up (step 3.22), or work on a <em>copy</em>. An undo you have
        prepared in advance is the only undo that works.
      </Callout>

      <Section title="Checking the work" />
      <Table
        headers={['Ask yourself', 'Because']}
        rows={[
          ['Is it correct? Spot-check three items against the source', 'Agents state wrong things confidently'],
          ['Is it complete? Did it quietly skip some?', 'Partial work can look like a full result'],
          ['Did it stay in scope? What else did it touch?', 'Check the log or the list of changes, not just the output'],
          ['Did it do what it said? Does the summary match the actions?', 'It can describe steps it never took'],
          ['What did it cost, and how many steps did it take?', 'A cheap-looking result can hide an expensive run'],
        ]}
      />

      <Section title="When not to delegate" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Money, legal or medical decisions, or anything that cannot be undone, unless a person makes the final move.</li>
        <li>Anything that needs your judgment or taste about people.</li>
        <li>A job you could not check yourself. If you cannot tell a good result from a bad one, you cannot supervise it.</li>
      </ul>

      <Section title="Practise it" />
      <p>
        Use whichever agent you have: a cloud agent from the last step, or your own setup from step 5.3 (Antigravity or
        Agy with the notes server). Fill in a brief for this job and run it at each rung of the ladder:
      </p>
      <CodeBlock
        language="markdown"
        title="Practice brief"
        code={`Goal: Make a weekly summary of my notes.
Context: The notes are in the notes/ folder of my playground. They are short and informal.
Allowed: Read files in notes/. Nothing else.
Not allowed: Changing, moving or deleting any file. Using the internet.
Ask me before: Anything that is not reading.
Done when: I get a list of at most 10 lines, one per note, with its date if it has one.
Format: A short bulleted list in the chat.
Limits: At most 10 steps.
If unsure: Ask me.`}
      />

      <Exercise
        title="Fix the brief"
        hint={<p>Look for the missing limits, the missing &quot;not allowed&quot;, and the missing &quot;done when&quot;.</p>}
        solution={
          <div className="space-y-2">
            <p>The original gives the agent unlimited access and no way to check the result. A safer version:</p>
            <CodeBlock
              language="markdown"
              title="Better brief"
              code={`Goal: Propose how to organise my Downloads folder. Do not move anything yet.
Allowed: List and read file names and sizes in Downloads (read-only).
Not allowed: Moving, renaming or deleting any file.
Done when: I get a proposed folder structure and a table showing where each file would go.
Ask me before: Any change to any file.
If unsure: Ask me.`}
            />
          </div>
        }
      >
        <p>This brief is dangerous: &quot;Clean up my Downloads folder and delete anything you don&apos;t need.&quot; Rewrite it so that it is safe.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="Which line of a brief is the most important?"
          options={['The goal', 'If unsure: stop and ask, never guess', 'The format', 'The context']}
          correctIndex={1}
          explanation="Agents guess by default. Telling them to stop and ask is the best defence against a confident wrong action."
        />
        <Quiz
          question="What is the first rung of the trust ladder?"
          options={['Act freely', 'Suggest a plan without doing anything', 'Delete files', 'Skip the brief']}
          correctIndex={1}
          explanation="Start with a plan you can read, then read-only, then approvals."
        />
        <Quiz
          question="Why back up before giving an agent write access?"
          options={['It runs faster', 'An undo prepared in advance is the only undo that works', 'It is required by the vendor', 'It reduces cost']}
          correctIndex={1}
          explanation="Agents can make mistakes at speed. A backup turns a disaster into an annoyance."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The brief matters more than the agent. State goal, context, allowed, not allowed, approvals, done-when, format, limits and "if unsure, ask".',
          'Climb the trust ladder: plan, read-only, act with approval, act within limits. Check at every rung.',
          'Back up before write access. Check correctness, completeness, scope and cost.',
          'Do not delegate what you cannot check, or what cannot be undone, without a human final step.',
        ]}
      />
    </div>
  );
}
