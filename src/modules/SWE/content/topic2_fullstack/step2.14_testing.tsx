import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { FileTree } from '../../../../components/content/FileTree';
import { Exercise } from '../../../../components/content/Exercise';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { TESTING_SKILL } from '../../toolkit/texts';

export default function Step2_14_Testing() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.14 • Full Stack"
        title="Three Layers of Testing"
        summary="How you know a feature really works: small checks, checks against the live API, and human step-by-step checks."
      />

      <p>
        A test is a small question with a known answer: &quot;if I add a task called Buy milk, does the list contain
        it?&quot; Passing means yes. Tests turn &quot;I think it works&quot; into &quot;I can prove it works&quot;. This is
        especially valuable with AI, which changes a lot of code quickly. Tests tell you what it broke.
      </p>

      <FileTree
        title="tests/"
        tree={[
          {
            name: 'tests',
            children: [
              { name: 'README.md' },
              { name: 'unit', note: 'small, fast, no server', children: [{ name: 'test_config.py' }, { name: 'test_validation.py' }] },
              { name: 'system', note: 'against the running API', children: [{ name: 'test_tasks.py' }] },
              { name: 'manual', note: 'a human follows the steps', children: [{ name: 'add_task.md' }] },
            ],
          },
        ]}
      />

      <Section title="The three layers" />
      <Table
        headers={['Layer', 'Checks', 'Needs the app running?', 'Written by']}
        rows={[
          ['unit/', 'Single functions: does the config load? Is this input valid?', 'No', 'AI (pytest)'],
          ['system/', 'The live API: POST /tasks returns 201, GET /tasks/999 returns 404', 'Yes', 'AI (pytest)'],
          ['manual/', 'The whole thing, as a person would use it', 'Yes', 'You or AI, in Markdown'],
        ]}
      />

      <Section title="Unit tests" />
      <p>
        Small and instant. They check one thing about one piece of code. You will see names like this:
      </p>
      <CodeBlock
        language="python"
        title="tests/unit/test_config.py (shape only)"
        code={`def test_config_has_backend_port():
    config = load_config()
    assert config["backend_port"] == 8000`}
      />
      <p>
        The word <code>assert</code> means &quot;this must be true&quot;. If it is not, the test fails and says where.
      </p>

      <Section title="System tests" />
      <p>
        These send real requests to the running backend and check the answers.
      </p>
      <CodeBlock
        language="python"
        title="tests/system/test_tasks.py (shape only)"
        code={`def test_create_task_returns_201():
    response = client.post("/tasks", json={"title": "Buy milk"})
    assert response.status_code == 201
    assert response.json()["title"] == "Buy milk"

def test_missing_task_returns_404():
    response = client.get("/tasks/999999")
    assert response.status_code == 404`}
      />
      <p>This is where the status codes from step 2.1 earn their keep.</p>

      <Section title="Manual tests: written for humans" />
      <p>
        Some things only a person can judge: does the button look right, does the page work on a narrow screen? A manual
        test is a plain Markdown file with exact steps and an expected result. Anyone could follow it, including you in
        three months.
      </p>
      <CodeBlock
        language="markdown"
        title="tests/manual/add_task.md"
        code={`# Add a task

## Steps
1. Run ./scripts/system.sh --start all
2. Open http://localhost:5173
3. Type "Buy milk" in the box and click Add

## Expected result
A card titled "Buy milk" appears and is still there after refreshing the page.`}
      />

      <Section title="Running them: only through the script" />
      <TerminalBlock
        lines={[
          {
            path: '~/Development/taskapp',
            command: './scripts/system.sh --test unit',
            output: `[INFO] Running unit tests...
3 passed in 0.12s
[SUCCESS] Unit tests passed`,
          },
          {
            path: '~/Development/taskapp',
            command: './scripts/system.sh --test system',
            output: `[INFO] Backend is not running. Starting it for the tests...
[INFO] Running system tests...
4 passed in 0.55s
[SUCCESS] System tests passed`,
          },
          { path: '~/Development/taskapp', command: './scripts/system.sh --test all' },
        ]}
      />
      <Callout type="info" title="Manual tests are not run by a command">
        You follow them yourself. That is the point: a human confirms what a machine cannot.
      </Callout>

      <Exercise
        title="Write a manual test"
        hint={<p>Write the steps so exact that a stranger could follow them: which command, which address, what to click, and what should happen.</p>}
        solution={
          <CodeBlock
            language="markdown"
            title="tests/manual/delete_task.md"
            code={`# Delete a task

## Steps
1. Run ./scripts/system.sh --start all
2. Open http://localhost:5173
3. Add a task called "Test task"
4. Click the delete button on its card

## Expected result
The card disappears, and stays gone after refreshing the page.`}
          />
        }
      >
        <p>In your head or in a file, write a manual test for deleting a task from your task app.</p>
      </Exercise>

      <TeachAI kind="skill" name="testing" text={TESTING_SKILL} />

      <QuizSet>
        <Quiz
          question="Which test layer needs the backend to be running?"
          options={['unit', 'system', 'neither', 'both']}
          correctIndex={1}
          explanation="System tests call the live API. Unit tests only check code directly."
        />
        <Quiz
          question="How do you run the tests?"
          options={['Type pytest', './scripts/system.sh --test <unit|system|all>', 'Open a browser', 'Run npm test']}
          correctIndex={1}
          explanation="Everything goes through the script."
        />
        <Quiz
          question="Which layer is best for 'does the page look right on a phone'?"
          options={['unit', 'system', 'manual', 'none']}
          correctIndex={2}
          explanation="Visual and experience checks need a human, and a manual SOP records the steps."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Tests turn "I think it works" into "I can prove it works".',
          'unit/ checks small functions. system/ checks the running API. manual/ is Markdown steps for a human.',
          'Run them only through ./scripts/system.sh --test unit|system|all.',
          'A plan with no tests is incomplete.',
        ]}
      />
    </div>
  );
}
