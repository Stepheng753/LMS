import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { FileTree } from '../../../../components/content/FileTree';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Term } from '../../../../components/content/Term';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { BACKEND_SKILL, SYSTEM_SKILL_V2 } from '../topic_toolkit/tools/tools_fullstack';

export default function Step2_12_Backend() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.12 • Full Stack"
        title="Backend: FastAPI, JSON Config & SQLite"
        summary="The kitchen and the pantry. What the AI will build, how to recognise it, and how to look inside."
      />

      <p>
        The backend is a Python program that waits for requests from the frontend, does the work, and answers. It reads
        and writes the database for it. You will not write any of it, but you need to know what the pieces are, so you
        can check a plan, and so that you can find them when something goes wrong.
      </p>

      <FileTree
        title="backend/ and data/"
        tree={[
          { name: 'data', children: [{ name: 'README.md' }, { name: 'app.db', note: 'the SQLite database' }] },
          {
            name: 'backend',
            children: [
              { name: 'README.md' },
              { name: 'requirements.txt', note: 'libraries, with versions' },
              { name: '.venv', note: 'private Python libraries (automatic)', children: [] },
              {
                name: 'config',
                children: [
                  { name: 'config.json', note: 'ports, database path, allowed origins' },
                  { name: 'secrets.json', note: 'keys and tokens' },
                  { name: 'distinct_values.json', note: 'fixed values' },
                ],
              },
              { name: 'endpoints', children: [{ name: '__init__.py' }, { name: 'tasks.py' }, { name: 'categories.py' }] },
              { name: 'main.py', note: 'starts the app, registers routers' },
            ],
          },
        ]}
      />

      <Section title="1. The virtual environment" />
      <p>
        Python projects use libraries. Different projects want different versions, so each project gets its own private
        box of libraries called a <Term definition="A private folder of Python libraries for one project, so projects cannot disturb each other.">virtual environment</Term>,
        stored in <code>.venv</code>. You may see tutorials say &quot;activate it first&quot;. We never do. Instead, we
        always call the Python <em>inside</em> the box by its full path:
      </p>
      <CodeBlock language="bash" title="From inside backend/. Always this, never plain python" code={`./.venv/bin/python -m pytest`} />
      <p>
        No activation to forget, and no chance of accidentally using the wrong Python. This is in your saved rule, so
        the AI does it, and in <code>system.sh</code>, so you never see it.
      </p>
      <p>
        <code>requirements.txt</code> is the shopping list of libraries and their versions. The script installs from it.
      </p>

      <Section title="2. JSON configuration, no .env" />
      <p>
        Most tutorials keep settings in a hidden <code>.env</code> file, which is easy to misread. We use readable
        JSON files in <code>backend/config/</code> instead, named by purpose. These three are typical, but add more
        when a new kind of setting appears.
      </p>
      <CodeBlock
        language="json"
        title="backend/config/config.json"
        code={`{
  "host": "127.0.0.1",
  "backend_port": 8000,
  "frontend_port": 5173,
  "database_path": "data/app.db",
  "allowed_origins": ["http://localhost:5173"]
}`}
      />
      <CodeBlock
        language="json"
        title="backend/config/secrets.json (never share this file)"
        code={`{
  "example_api_key": "replace-me"
}`}
      />
      <CodeBlock
        language="json"
        title="backend/config/distinct_values.json"
        code={`{
  "late_after_days": 30,
  "max_title_length": 120
}`}
      />
      <Callout type="warning" title="Secrets are special">
        Keys and passwords go only in <code>secrets.json</code>, which is never shared and never pasted into a chat.
        The rest of the configuration is safe to show.
      </Callout>

      <Section title="3. Endpoints, one file per resource" />
      <p>
        Each kind of thing the app handles gets its own file in <code>endpoints/</code>, named after the resource (
        <code>tasks.py</code>). Here is the shape you will see. You are not meant to write this, just to recognise it:
      </p>
      <CodeBlock
        language="python"
        title="backend/endpoints/tasks.py (shape only)"
        code={`from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/tasks", tags=["tasks"])

class TaskIn(BaseModel):
    title: str
    category_id: int | None = None

@router.get("")
def list_tasks():
    ...  # ask the database for every task, return them as JSON

@router.post("", status_code=201)
def create_task(task: TaskIn):
    ...  # insert a new row, return it

@router.delete("/{task_id}")
def delete_task(task_id: int):
    ...  # delete that row, or return 404 if it does not exist`}
      />
      <ul className="list-disc pl-5 space-y-1">
        <li>A <strong>router</strong> is a group of related endpoints.</li>
        <li><code>@router.get</code>, <code>.post</code>, <code>.delete</code> are the HTTP methods from step 2.1.</li>
        <li>The <code>TaskIn</code> class describes what a valid request body looks like. Anything else gets a 422.</li>
      </ul>
      <p>
        <code>main.py</code> is the front door. It creates the app, loads the config, allows the frontend to talk to it,
        and registers every router so that its endpoints exist.
      </p>

      <Section title="4. The database lives in data/" />
      <p>
        The backend talks to SQLite using Python&apos;s built-in <code>sqlite3</code> library. The database file sits in{' '}
        <code>data/</code> and nowhere else. A plan that puts it in <code>backend/</code> or <code>frontend/</code> gets
        a comment.
      </p>

      <Section title="5. Swagger: the menu for your API" />
      <p>
        Once the backend is running, open <code>http://localhost:8000/docs</code> in your browser. FastAPI creates this
        page by itself. It lists every endpoint, and each has a <strong>Try it out</strong> button.
      </p>
      <Steps
        steps={[
          { title: 'Expand an endpoint', children: <p>Click, for example, <code>GET /tasks</code>.</p> },
          { title: 'Click Try it out, then Execute', children: <p>You will see the response: a status code (200) and the JSON.</p> },
          { title: 'Try a POST', children: <p>Expand <code>POST /tasks</code>, click Try it out, fill in a title, Execute. You should see <code>201</code>.</p> },
          { title: 'Check the database', children: <p>Open <code>data/app.db</code> with the SQLite viewer (step 2.3), right-click <code>tasks</code> → Show Table, and find your new row.</p> },
        ]}
      />
      <Callout type="success" title="This is how you verify a backend">
        Frontend not working? First check the backend in Swagger. If it works there, the problem is in the frontend. If
        it fails there, the problem is in the backend or database. That one test halves the search.
      </Callout>

      <Section title="Back to the script: round 2" />
      <p>
        <code>system.sh</code> now needs to know about the backend and about tests. This is exactly the moment to bring
        it back to your AI. You will give it your upgraded skill, which describes the extended script, and ask it to
        update the script.
      </p>
      <CommandTable
        title="system.sh, round 2"
        rows={[
          { command: '--start backend', description: 'Create .venv if needed, install requirements, start the API' },
          { command: '--start frontend', description: 'Install if needed, start the website' },
          { command: '--start all', description: 'Start both' },
          { command: '--stop | --restart', description: 'The same targets: backend, frontend or all' },
          { command: '--test unit', description: 'Run the small function tests' },
          { command: '--test system', description: 'Start the backend if needed, then run tests against it' },
          { command: '--test all', description: 'Run both' },
        ]}
      />
      <TerminalBlock
        lines={[
          {
            path: '~/Development/taskapp',
            command: './scripts/system.sh --start all',
            output: `[INFO] Creating Python environment (first run only)...
[INFO] Installing backend libraries...
[INFO] Starting backend on port 8000...
[SUCCESS] Backend is running: http://localhost:8000  (docs: http://localhost:8000/docs)
[INFO] Starting frontend on port 5173...
[SUCCESS] Frontend is running: http://localhost:5173`,
          },
        ]}
      />
      <Collapsible title="What the script runs for you (you never type these)">
        <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
          <li>cd backend</li>
          <li>python3 -m venv .venv</li>
          <li>./.venv/bin/python -m pip install -r requirements.txt</li>
          <li>./.venv/bin/python -m uvicorn main:app --port 8000</li>
          <li>./.venv/bin/python -m pytest ../tests/unit</li>
        </ul>
        <p>Every Python command begins with <code>./.venv/bin/python</code>, run from inside <code>backend/</code>, where the <code>.venv</code> folder lives.</p>
      </Collapsible>

      <TeachAI kind="skill" name="fastapi-backend" text={BACKEND_SKILL} />
      <TeachAI kind="skill" name="system-script" text={SYSTEM_SKILL_V2} isUpdate />

      <Table
        caption="Your kit so far"
        headers={['Saved', 'Type', 'Step']}
        rows={[
          ['stack', 'Rule (always on)', '2.4'],
          ['fullstack-architecture', 'Skill', '2.5'],
          ['website-design', 'Skill', '2.6'],
          ['react-frontend', 'Skill', '2.7'],
          ['system-script (v2)', 'Skill', '2.8, updated here'],
          ['fastapi-backend', 'Skill', '2.12'],
        ]}
      />

      <QuizSet>
        <Quiz
          question="Why do we call ./.venv/bin/python instead of activating the environment?"
          options={['It is shorter', 'Nothing to forget and no risk of using the wrong Python', 'Activation is impossible on Linux', 'It is faster']}
          correctIndex={1}
          explanation="Calling the project's own Python directly always uses the right libraries."
        />
        <Quiz
          question="Where do settings go?"
          options={['A .env file', 'JSON files in backend/config/', 'Inside main.py', 'The frontend']}
          correctIndex={1}
          explanation="Readable JSON, named by purpose, in backend/config/."
        />
        <Quiz
          question="The frontend shows nothing. What do you check first?"
          options={['Reinstall Windows', 'Open /docs and test the endpoint there', 'Delete the database', 'Rewrite the frontend']}
          correctIndex={1}
          explanation="If the endpoint works in Swagger, the problem is in the frontend. If not, it is in the backend."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The backend is a Python program that answers requests and reads or writes the database.',
          '.venv is a private box of libraries, always called as ./.venv/bin/python, never activated.',
          'Settings are JSON files in backend/config/. Secrets only in secrets.json.',
          'One router file per resource in endpoints/, all registered in main.py. The database is in data/.',
          'Swagger at localhost:8000/docs is how you test the backend, and the SQLite viewer shows what was saved.',
          'system.sh grew: it now starts the backend, runs tests, and always uses ./.venv/bin/python.',
        ]}
      />
    </div>
  );
}
