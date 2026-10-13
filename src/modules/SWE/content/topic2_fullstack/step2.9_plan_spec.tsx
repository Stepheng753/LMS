import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { SPEC_TEMPLATE } from '../../toolkit/tools_fullstack';

export default function Step2_9_PlanSpec() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.9 • Spec-Driven Engineering"
        title="/plan: Writing the Spec"
        summary="Describe exactly what you want before any code exists. This is the most valuable skill in vibe coding."
      />

      <p>
        If you tell an AI &quot;build me a task app&quot; and press go, you will get <em>an</em> app. Probably not yours,
        and you will not know why it looks the way it does. <strong>Spec-driven</strong> work flips that: you write down
        what you want (the <strong>spec</strong>), the AI turns it into a <strong>plan</strong> of what it intends to
        do, you check the plan, and only then does any code get written.
      </p>

      <Compare
        goodLabel="Spec-driven"
        badLabel="Prompt and pray"
        good={<p>Describe → AI plans → <strong>you review the plan</strong> → AI builds → you check it against the spec.</p>}
        bad={<p>&quot;Build me an app&quot; → thousands of lines you never saw → hope.</p>}
      />

      <Section title="What /plan does" />
      <p>
        In Antigravity, typing <code>/plan</code> followed by your request puts the AI in planning mode. It explores,
        and where your request is unclear it <strong>interviews you</strong> with questions. Then it produces a written
        implementation plan for you to read, and it does not change any file until you approve.
      </p>
      <Steps
        steps={[
          { title: 'Open the agent panel in your project', children: <p>Open your project folder in Antigravity (connected to WSL).</p> },
          { title: 'Type /plan and your spec', children: <p>Start the message with <code>/plan</code>. Attach your paper sketch as a photo if you have one.</p> },
          { title: 'Answer its questions', children: <p>If it asks about something, answer in plain language. If you do not know, say so and ask for a recommendation.</p> },
          { title: 'Read the plan it returns', children: <p>This is the subject of the next step.</p> },
        ]}
      />

      <Section title="What goes in a good spec" />
      <Table
        headers={['Part', 'Why it matters', 'Weak', 'Strong']}
        rows={[
          ['Goal', 'Sets the purpose', 'A website', 'A one-page portfolio for a graphic designer'],
          ['Actions', 'Defines what is possible', 'It manages tasks', 'Add a task, tick it off, delete it'],
          ['Screens', 'Tells it the layout', 'A nice page', 'Navbar, hero, three project cards, footer'],
          ['Data', 'Fixes the tables', 'Store stuff', 'tasks: title, done, category_id'],
          ['Done when', 'Lets you check the result', 'It works', 'I can add a task and see it after refreshing the page'],
        ]}
      />
      <Callout type="tip" title="Vague in, vague out">
        Every blank you leave, the AI fills with a guess. Sometimes it guesses well. The point of the spec is that the
        guesses are yours instead.
      </Callout>

      <Section title="The template" />
      <p>
        Copy this each time you start a project. Replace everything in <code>&lt;angle brackets&gt;</code>, and delete
        the parts you do not need (a portfolio has no data or endpoints).
      </p>
      <CodeBlock language="markdown" title="Spec template" code={SPEC_TEMPLATE} />

      <Callout type="info" title="Why it names the skills">
        Skills load themselves when their description matches, but naming them in the spec makes sure they are
        used, and reminds you (and the reviewer in you) what the plan will be measured against.
      </Callout>

      <QuizSet>
        <Quiz
          question="What happens when you type /plan?"
          options={[
            'The AI immediately writes all the code',
            'The AI interviews you if needed and writes a plan to review, before changing files',
            'The project is deleted',
            'The terminal closes',
          ]}
          correctIndex={1}
          explanation="/plan produces a reviewable plan first. Files change only after you approve."
        />
        <Quiz
          question="Which line is the strongest 'Done when' statement?"
          options={['It works', 'It looks good', 'I can add a task, refresh the page, and still see it', 'The AI says it is finished']}
          correctIndex={2}
          explanation="A good 'done' is something you can see or click yourself."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Spec → plan → review → build. You decide at each gate.',
          '/plan makes the AI interview you and produce a plan before any file changes.',
          'A good spec has a goal, actions, screens, data, rules and a clear "done when".',
          'Every blank you leave is a guess the AI makes for you.',
        ]}
      />
    </div>
  );
}
