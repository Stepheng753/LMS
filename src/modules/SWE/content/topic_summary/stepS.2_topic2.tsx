import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { FileTree } from '../../../../components/content/FileTree';
import { Flow } from '../../../../components/content/Flow';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet, MultiSelectQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_2_Topic2() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Topic 2"
        title="Recap: Full Stack & Spec-Driven Design"
        summary="How an app fits together, how to describe one, and how to direct an AI to build it correctly."
      />

      <Section title="The big picture" />
      <Flow
        steps={[
          { title: 'Frontend', sub: 'React + Vite + Tailwind v4 + TypeScript' },
          { title: 'Backend', sub: 'FastAPI (Python)', via: 'HTTP + JSON' },
          { title: 'Database', sub: 'SQLite, in data/', via: 'sqlite3' },
        ]}
      />
      <p>
        The frontend never touches the database. It asks the backend over HTTP, the backend does the work, and JSON comes
        back. The stack is fixed on purpose, so you go deep instead of wide.
      </p>

      <Section title="The ideas, step by step" />
      <Table
        headers={['Topic', 'Key points', 'Step']}
        rows={[
          [<strong key="a">APIs</strong>, 'A request has a URL, a method and sometimes a body. GET reads, POST creates, PUT/PATCH updates, DELETE removes. Status codes: 2xx worked, 4xx your request, 5xx the server', '2.1'],
          [<strong key="b">Databases</strong>, 'Tables of columns and rows. Types: INTEGER, REAL, TEXT, BLOB, NULL. Yes/no is 0/1, dates are text. Every table has an id. One table per kind of thing, linked by a foreign key on the "many" side', '2.2'],
          [<strong key="c">Rules and skills</strong>, 'Files that remind your AI of your standards. A rule is always on. A skill loads when its description matches. Saved globally under ~/.gemini/config/', '2.4'],
          [<strong key="d">Repo layout</strong>, 'docs, scripts, data, tests, backend, frontend, and 7 READMEs. Config is JSON in backend/config/. The database lives in data/', '2.5'],
          [<strong key="e">Website design</strong>, 'Every page is rectangles inside rectangles: navbar, hero, sections, cards, footer. Sketch it on paper first', '2.6'],
          [<strong key="f">The frontend</strong>, 'One component per file, named exactly like the component. Tailwind classes style it. No tailwind.config in v4', '2.7'],
          [<strong key="g">system.sh</strong>, 'One script starts, stops, restarts and tests everything, so you never type npm, pip or python', '2.8, 2.12'],
          [<strong key="h">/plan and review</strong>, 'Spec, then a plan, then you review the whole plan against your rules and comment before anything is built', '2.9, 2.10'],
          [<strong key="i">The backend</strong>, 'A private .venv called as ./.venv/bin/python from inside backend/. JSON config files. One router file per resource. Swagger at /docs', '2.12'],
          [<strong key="j">Connecting</strong>, 'A click becomes a request, a route, a query, and JSON back. CORS lets two ports talk. Debug in order: database, backend, request, screen', '2.13'],
          [<strong key="k">Testing</strong>, 'unit (small functions), system (the live API), manual (human steps). Run through system.sh', '2.14'],
        ]}
      />

      <FileTree
        title="The universal layout"
        tree={[
          {
            name: 'project-root',
            children: [
              { name: 'README.md' },
              { name: 'docs', children: [{ name: 'README.md' }] },
              { name: 'scripts', children: [{ name: 'README.md' }, { name: 'system.sh' }] },
              { name: 'data', children: [{ name: 'README.md' }, { name: 'app.db' }] },
              { name: 'tests', children: [{ name: 'unit', children: [] }, { name: 'system', children: [] }, { name: 'manual', children: [] }] },
              { name: 'backend', children: [{ name: 'config', children: [{ name: 'config.json' }, { name: 'secrets.json' }] }, { name: 'endpoints', children: [{ name: 'tasks.py' }] }, { name: 'main.py' }, { name: 'requirements.txt' }] },
              { name: 'frontend', children: [{ name: 'src', children: [{ name: 'components', children: [{ name: 'TaskCard.tsx' }] }, { name: 'App.tsx' }, { name: 'main.tsx' }] }, { name: 'vite.config.ts' }] },
            ],
          },
        ]}
      />

      <Section title="The spec, plan, review loop" />
      <Flow
        steps={[
          { title: 'Sketch', sub: 'Rectangles on paper' },
          { title: 'Spec', sub: 'Goal, actions, screens, data, rules, done-when', via: 'write' },
          { title: '/plan', sub: 'The AI interviews you and writes a plan', via: 'run' },
          { title: 'Review', sub: 'Read ALL of it. Comment. Repeat', via: 'check' },
          { title: 'Build', sub: 'Then run it with system.sh', via: 'approve' },
        ]}
      />
      <Callout type="warning" title="The plan-review checklist, in short">
        Only folders from the layout. FastAPI, React + Vite + Tailwind v4 + TypeScript, SQLite and nothing else. .tsx files,
        one component per file. JSON config, no .env. The database in data/. No instruction to run npm or pip: everything
        through system.sh. Tests in all three layers. Nothing you did not ask for.
      </Callout>

      <Section title="Common mistakes" />
      <Table
        headers={['Mistake', 'Fix']}
        rows={[
          ['Approving a plan you did not read', 'Read every line. A wrong plan is cheap to fix and expensive to build'],
          ['Vague specs', 'Every blank is a guess the AI makes for you. Be specific, and add a "done when"'],
          ['Two components in one file', 'One per file, named identically'],
          ['Activating the venv by hand, or using global python', 'Always ./.venv/bin/python from inside backend/'],
          ['A .env file or hard-coded settings', 'JSON in backend/config/'],
          ['Debugging the screen first', 'Check the database, then Swagger, then the Network tab, then the screen'],
          ['Forgetting CORS', 'The backend must allow the frontend\'s address in allowed_origins'],
        ]}
      />

      <Collapsible title="Rapid recall">
        <ul className="list-disc pl-5 space-y-1">
          <li>Which method creates? <em>POST</em>. Which deletes? <em>DELETE</em>.</li>
          <li>What does a 422 mean? <em>The data you sent was invalid</em>.</li>
          <li>Where does a foreign key go? <em>On the "many" side</em>.</li>
          <li>How many READMEs? <em>Seven</em>: the root, plus docs, scripts, data, tests, backend and frontend.</li>
          <li>What starts everything? <em>./scripts/system.sh --start all</em></li>
        </ul>
      </Collapsible>

      <QuizSet title="Topic 2 Quick Check">
        <Quiz
          question="Which request would delete task number 3?"
          options={['GET /tasks/3', 'POST /tasks/3', 'DELETE /tasks/3', 'DELETE /deleteTask']}
          correctIndex={2}
          explanation="The URL names the thing, and the method says what to do with it."
        />
        <Quiz
          question="How does SQLite store a yes/no value?"
          options={['As a BOOL', 'As 0 or 1', 'As the word yes', 'As a BLOB']}
          correctIndex={1}
          explanation="There is no true boolean. 0 means no and 1 means yes."
        />
        <Quiz
          question="Where does the SQLite database file live?"
          options={['backend/', 'frontend/src/', 'data/', 'docs/']}
          correctIndex={2}
          explanation="Only in data/."
        />
        <Quiz
          question="A new component is called ProductCard. What should its file be?"
          options={['product-card.tsx', 'productcard.tsx', 'ProductCard.tsx', 'Card.tsx']}
          correctIndex={2}
          explanation="One component per file, named exactly like the component."
        />
        <Quiz
          question="Why call ./.venv/bin/python instead of activating the environment?"
          options={['It is shorter', 'Nothing to forget and no risk of the wrong Python', 'Activation is impossible', 'It is faster']}
          correctIndex={1}
          explanation="The project's own Python always has the right libraries."
        />
        <Quiz
          question="Where does configuration go in your projects?"
          options={['A .env file', 'JSON files in backend/config/', 'Inside main.py', 'The frontend']}
          correctIndex={1}
          explanation="Readable JSON, named by purpose."
        />
        <MultiSelectQuiz
          question="Which of these belong in a plan-review checklist? (Pick all)"
          options={['Only folders from the layout', 'It tells me to run npm myself', 'Tests in unit, system and manual', 'No .env file']}
          correctIndexes={[0, 2, 3]}
          explanation="A plan that tells you to run npm breaks the rule that everything goes through system.sh."
        />
        <Quiz
          question="The frontend shows nothing. What do you check first?"
          options={['Rewrite the frontend', 'The database and Swagger, to halve the search', 'Reinstall Python', 'Delete the cache']}
          correctIndex={1}
          explanation="If the endpoint works in Swagger, the problem is in the frontend. If not, it is in the backend or database."
        />
      </QuizSet>

      <Section title="Can you...?" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Explain the frontend, backend and database to someone, using the restaurant picture?</li>
        <li>Design two related tables and say where the foreign key goes?</li>
        <li>Sketch a page as rectangles, and name its parts?</li>
        <li>Write a spec with a goal, actions, screens, data, rules and a done-when?</li>
        <li>Run <code>/plan</code>, read the whole plan, and leave comments that say exactly what to change?</li>
        <li>Start and stop your app with system.sh, and find a problem with Swagger and the database viewer?</li>
        <li>Save a rule or a skill and check that Agy can see it?</li>
      </ul>

      <KeyTakeaways
        items={[
          'Frontend, backend, database: asking, doing and storing, connected by HTTP and JSON.',
          'The layout, the stack and the naming rules are fixed, so your AI and your reviews always know where things go.',
          'Rules and skills make your AI remember your standards. Improve them when it repeats a mistake.',
          'The loop: sketch, spec, plan, review, build, run, test. The review is where you earn your keep.',
          'Everything runs through system.sh, and Python is always ./.venv/bin/python.',
        ]}
      />
    </div>
  );
}
