import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_10_ReviewPlan() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.10 • Spec-Driven Engineering"
        title="Reviewing the Plan"
        summary="Read the whole plan, check it against your rules, comment on what is wrong, and approve only when it is exactly what you want."
      />

      <Callout type="warning" title="The most important step in this topic">
        Everything the AI builds comes from this plan. A mistake you catch here costs a sentence to fix. The same mistake
        after the code is written costs a rebuild. <strong>Read the whole plan, every line, every time.</strong>
      </Callout>

      <p>
        You do not need to understand every technical detail. You need to check that the plan <em>matches what you
        asked for</em>, and that it <em>respects your rules</em>. That is a checking job, not a coding job.
      </p>

      <Section title="The review routine" />
      <Steps
        steps={[
          { title: 'Read it top to bottom without commenting', children: <p>Get the whole picture first. If a word is unfamiliar, ask your AI helper what it means.</p> },
          { title: 'Check it against your spec', children: <p>Is every screen and action you listed in there? Is anything in there that you did not ask for?</p> },
          { title: 'Walk the checklist below', children: <p>Go through it line by line. It catches the mistakes AI makes most often.</p> },
          {
            title: 'Leave comments on the exact lines that are wrong',
            children: (
              <p>
                Antigravity lets you select text in the plan and add an inline comment, like in a shared document.
                Say what is wrong and what you want instead. (The exact button wording can change between versions.)
              </p>
            ),
          },
          { title: 'Send the comments back and read the revised plan', children: <p>Repeat until nothing is wrong. A second or third round is normal.</p> },
          { title: 'Approve', children: <p>Only now press the button to proceed. Keep approving step by step if it asks.</p> },
        ]}
      />

      <Section title="The checklist" />
      <Table
        headers={['Check', 'Why']}
        rows={[
          ['Are all folders from the layout? Is there anything not on the map?', 'A strange folder means it went off-spec'],
          ['Is the stack exactly FastAPI, React + Vite + Tailwind v4 + TypeScript, SQLite?', 'No Express, MongoDB, Next.js, or Django'],
          ['Are files .tsx / .ts, not .jsx / .js?', 'We use TypeScript'],
          ['One component per file, with matching names?', 'Easy to find and change'],
          ['Is configuration in JSON in backend/config/? Any .env file?', '.env is forbidden here'],
          ['Is the database file inside data/?', 'The only allowed location'],
          ['Does it tell me to run npm, pip or python myself?', 'It should add to scripts/system.sh instead'],
          ['Does the backend use ./.venv/bin/python?', 'No activating, no global python'],
          ['Are there tests, and READMEs in all 7 places?', 'Tests and READMEs are part of "done"'],
          ['Does it do exactly what I asked, no more?', 'Extra features are extra risk'],
          ['Does the plan say how I will know it works?', 'It should match your "done when"'],
        ]}
      />

      <Section title="Writing a good comment" />
      <Table
        headers={['Weak comment', 'Strong comment']}
        rows={[
          ['This is wrong.', 'Use .tsx, not .jsx. Our rules say TypeScript only.'],
          ['Fix the structure.', 'Put each of these three components in its own file, named after the component.'],
          ['Hmm, not sure.', 'Explain in plain words what this step does and why it is needed.'],
          ['No.', 'Remove step 4. I did not ask for a login page.'],
        ]}
      />
      <Callout type="tip" title="It is fine to ask">
        A comment can be a question: &quot;What does this step do, in plain words? Do I need it?&quot; If the answer is
        unclear, say you are not comfortable and ask for a simpler approach.
      </Callout>

      <Section title="Spot the problems" />
      <p>Here is part of a plan. Before opening the solution, see how many problems you can find.</p>
      <CodeBlock
        language="markdown"
        title="Plan excerpt"
        code={`Plan: Task tracker
1. Create a folder app/ with server.js (Express) and a MongoDB connection.
2. Add a .env file with DATABASE_URL.
3. Create frontend/src/components/Cards.jsx containing TaskCard, Button and Header.
4. Tell the user to run "npm start" to see the app.
5. Skip tests for now, to move faster.`}
      />
      <Exercise
        title="How many rule violations are there?"
        hint={<p>Check each line against the checklist: stack, config, file names, how to run, tests.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Wrong stack: Express and MongoDB instead of FastAPI and SQLite. Also <code>app/</code> is not on the folder map.</li>
            <li><code>.env</code> is forbidden. Use JSON in <code>backend/config/</code>.</li>
            <li>Wrong extension (<code>.jsx</code> instead of <code>.tsx</code>), and three components in one file with a name that does not match any of them.</li>
            <li>Asks the user to run npm. It should add this to <code>scripts/system.sh</code>.</li>
            <li>Skips tests. Tests are part of &quot;done&quot;.</li>
          </ol>
        }
      >
        <p>Read the plan excerpt above and list every way it breaks our rules.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="The plan creates a .env file for the database path. What do you do?"
          options={['Approve it', 'Comment: use a JSON file in backend/config/ instead', 'Delete the plan', 'Ask for a second .env']}
          correctIndex={1}
          explanation="Config is JSON in backend/config/. A short, specific comment fixes it."
        />
        <Quiz
          question="When should you approve a plan?"
          options={['As soon as it appears', 'After you have read all of it and it matches your spec and rules', 'After the first paragraph', 'Never']}
          correctIndex={1}
          explanation="Approval is the last gate before files change, so it needs a full read."
        />
        <Quiz
          question="Which is the best comment?"
          options={['Bad', 'Wrong', 'Rename Cards.tsx to TaskCard.tsx and put the Button component in its own file', 'Fix it']}
          correctIndex={2}
          explanation="A good comment says exactly what to change."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Read the whole plan before commenting. Never approve what you have not read.',
          'You are checking against two things: your spec and your rules.',
          'Use the checklist: layout, stack, file types, config, database location, scripts, tests.',
          'Comment on the exact line, say what is wrong and what you want.',
          'A second or third round of review is normal.',
        ]}
      />
    </div>
  );
}
