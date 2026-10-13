import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Term } from '../../../../components/content/Term';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_13_Connecting() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.13 • Full Stack"
        title="Putting It All Together"
        summary="Follow a single click all the way from the browser to the database and back, and learn what to check when it breaks."
      />

      <p>
        You now know every piece. This step connects them. Imagine your task app has a button that adds a task. Here is
        what happens when you click it.
      </p>

      <Section title="One click, end to end" />
      <Steps
        steps={[
          { title: 'You click "Add task" in the browser', children: <p>A React component (the <em>frontend</em>) collects the title you typed.</p> },
          { title: 'The component sends an HTTP request', children: <p><code>POST http://localhost:8000/tasks</code> with the body <code>{'{"title": "Buy milk"}'}</code>.</p> },
          { title: 'FastAPI receives it on port 8000', children: <p><code>main.py</code> hands it to the router in <code>endpoints/tasks.py</code> that matches <code>/tasks</code>.</p> },
          { title: 'The router checks the data', children: <p>If the title is missing or not text, it stops here and answers <code>422</code>.</p> },
          { title: 'The backend asks the database', children: <p>It uses the <code>sqlite3</code> library to insert a new row into the <code>tasks</code> table in <code>data/app.db</code>.</p> },
          { title: 'The database stores it', children: <p>The row is written to the file. It survives restarts.</p> },
          { title: 'The backend answers', children: <p>It returns <code>201 Created</code> with the new task as JSON.</p> },
          { title: 'The frontend updates the screen', children: <p>It adds the new task to its list, and React redraws a new <code>TaskCard</code>.</p> },
        ]}
      />
      <p>
        Every feature you will ever build is a variation of those eight steps. When something breaks, the question is
        always: <strong>which step failed?</strong>
      </p>

      <Section title="Why can the browser talk to the backend? CORS" />
      <p>
        The website is served from port <code>5173</code> and the backend lives on port <code>8000</code>. To a
        browser those are two different &quot;origins&quot;, and for safety, browsers refuse to let one origin read data
        from another unless that other one says it is allowed. That permission system is called{' '}
        <Term definition="Cross-Origin Resource Sharing: the browser rule that decides whether a page from one address may read data from a different address.">CORS</Term>.
      </p>
      <p>
        The backend grants permission by listing the frontend&apos;s address (<code>http://localhost:5173</code>) in{' '}
        <code>allowed_origins</code> in <code>config.json</code>. Forget this, and the frontend works, the backend works,
        and they refuse to talk to each other.
      </p>
      <Callout type="warning" title="The classic first bug">
        If the browser console says something like <em>&quot;blocked by CORS policy&quot;</em>, the backend is not
        allowing your frontend&apos;s address. It is almost always an <code>allowed_origins</code> issue. Give the exact
        message to your AI.
      </Callout>

      <Section title="Seeing the conversation yourself" />
      <Steps
        steps={[
          { title: 'Open your running app in the browser', children: <p>Start it with <code>./scripts/system.sh --start all</code>.</p> },
          { title: 'Press F12 to open the developer tools', children: <p>Choose the <strong>Network</strong> tab.</p> },
          { title: 'Click a button that talks to the backend', children: <p>You will see a new row appear for each request: the method, the address and the status code.</p> },
          { title: 'Click a row', children: <p>Look at the <strong>Response</strong>. That is the JSON the backend sent, and you can compare it to what you see on screen.</p> },
        ]}
      />

      <Section title="When it breaks: a field guide" />
      <Table
        headers={['What you see', 'Probably', 'Where to look']}
        rows={[
          ['"blocked by CORS policy" in the console', 'Backend does not allow the frontend', 'allowed_origins in config.json'],
          ['Request fails: "connection refused" or "failed to fetch"', 'Backend is not running or the wrong port', 'Run --start backend. Check the URL'],
          ['404 Not Found', 'Wrong URL path, or the router is not registered', 'Compare the URL with /docs. Check main.py'],
          ['422 Unprocessable', 'The data sent does not match what the endpoint expects', 'The request body in the Network tab, versus /docs'],
          ['500 Server Error', 'The backend code crashed', 'logs/backend.log'],
          ['Page loads but the list is empty', 'The request worked but the table has no rows, or the frontend does not draw them', 'Check the table in the SQLite viewer, then the Response in the Network tab'],
          ['Everything worked yesterday', 'The backend is not running anymore', 'Run --start all'],
        ]}
      />
      <Callout type="success" title="Divide and conquer">
        Test in this order: the <strong>database</strong> (does the viewer show the row?), the <strong>backend</strong>{' '}
        (does Swagger return it?), the <strong>request</strong> (does the Network tab show a 2xx?), the{' '}
        <strong>screen</strong> (does the page draw it?). The first one that fails is where the bug is.
      </Callout>

      <Exercise
        title="Trace a delete"
        hint={<p>It mirrors the add-task flow. Think about the method, the URL (what identifies the task?), and the status code.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li>You click the delete button on a task card.</li>
            <li>The frontend sends <code>DELETE http://localhost:8000/tasks/7</code> (7 is that task&apos;s id).</li>
            <li>FastAPI routes it to <code>endpoints/tasks.py</code>.</li>
            <li>The backend removes row 7 from the <code>tasks</code> table (or answers 404 if there is none).</li>
            <li>The reply is a success status, such as 200.</li>
            <li>The frontend removes that card from its list, and the screen updates.</li>
          </ol>
        }
      >
        <p>In your own words, describe step by step what happens when you click the delete button on task number 7.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="The browser console says 'blocked by CORS policy'. What is the likely fix?"
          options={['Reinstall Python', "Add the frontend's address to allowed_origins in config.json", 'Delete the database', 'Change the Tailwind version']}
          correctIndex={1}
          explanation="CORS errors mean the backend has not allowed the frontend's origin."
        />
        <Quiz
          question="Which tool shows you the actual requests and responses between browser and backend?"
          options={['The Network tab (F12)', 'nano', 'The README', 'ls']}
          correctIndex={0}
          explanation="The browser's Network tab lists each request with its status code and response."
        />
        <Quiz
          question="You get a 500 status. Where do you look first?"
          options={['The sketch', 'logs/backend.log', 'The CSS', 'The READMEs']}
          correctIndex={1}
          explanation="500 means the backend crashed, and the log records why."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A click becomes an HTTP request, which a FastAPI router receives, runs against SQLite, and answers in JSON that React draws.',
          'Browsers block cross-address requests unless the backend allows them (CORS, via allowed_origins).',
          'The Network tab (F12) shows each request and response.',
          'Debug in order: database → backend (Swagger) → request → screen.',
        ]}
      />
    </div>
  );
}
