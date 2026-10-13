import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { Flow } from '../../../../components/content/Flow';

export default function Step2_0_BigPicture() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.0 • Full Stack Design"
        title="The Big Picture"
        summary="How a real app is put together, in one diagram, before we meet any of the parts."
      />

      <p>
        Every app you use, from a banking site to a to-do list, is the same three pieces talking to each other. Once you
        can see that shape, every later step is just filling in one box.
      </p>

      <Flow
        steps={[
          { title: 'Frontend', sub: 'What you see and click. Runs in the browser' },
          { title: 'Backend', sub: 'The rules and logic. Runs on a server', via: 'HTTP request' },
          { title: 'Database', sub: 'Where data is kept for good', via: 'reads / writes' },
        ]}
      />
      <p>
        The answer travels back the same way: the database hands data to the backend, the backend sends it to the
        frontend as <strong>JSON</strong>, and the frontend draws it on screen.
      </p>

      <Section title="A restaurant, for example" />
      <Table
        headers={['In the restaurant', 'In an app', 'Technology we use']}
        rows={[
          ['Dining room: what the guest sees', 'Frontend', 'React + Vite + Tailwind CSS + TypeScript'],
          ['The waiter carrying orders', 'HTTP requests (the API)', 'HTTP and JSON'],
          ['The kitchen: where the work happens', 'Backend', 'FastAPI (Python)'],
          ['The pantry: where ingredients are stored', 'Database', 'SQLite'],
          ['The menu: what you may order', 'API documentation', 'Swagger page at /docs'],
        ]}
      />
      <p>
        A guest never walks into the pantry. They talk to the waiter. In the same way, the frontend never touches the
        database. It <em>asks</em> the backend, which does the work.
      </p>

      <Section title="The stack is fixed on purpose" />
      <p>
        There are hundreds of ways to build an app. We use exactly one, so you can go deep instead of wide, and so your
        AI helper always knows what you mean.
      </p>
      <Table
        headers={['Layer', 'Choice', 'Why']}
        rows={[
          ['Backend', 'FastAPI (Python)', 'Readable, fast, and builds its own documentation page'],
          ['Frontend', 'React + Vite + Tailwind CSS v4 + TypeScript', 'The most common modern web stack, with types that catch mistakes early'],
          ['Database', 'SQLite', 'One file, no server to run, and perfect for learning and small apps'],
        ]}
      />

      <Section title="Where this topic is going" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>Learn the concepts: APIs, databases, and how to lay out a project.</li>
        <li>Teach your AI helper your standards by saving <strong>rules</strong> and <strong>skills</strong>.</li>
        <li>Learn to write a <strong>spec</strong> and review an AI-made <strong>plan</strong>.</li>
        <li><strong>Project A:</strong> a portfolio website (frontend only).</li>
        <li><strong>Project B:</strong> a full app with a frontend, a backend and a database.</li>
      </ol>

      <Callout type="info" title="You are the architect, not the typist">
        You will not write Python or TypeScript by hand. Your job is to decide what gets built, describe it precisely,
        and check that what comes back matches. That is what &quot;architecture&quot; means, and it is the skill that
        makes vibe coding work instead of making a mess.
      </Callout>

      <Quiz
        question="In the restaurant analogy, what is the backend?"
        options={['The dining room', 'The waiter', 'The kitchen', 'The pantry']}
        correctIndex={2}
        explanation="The kitchen is where the real work happens, which is the backend's job. The pantry is the database."
      />

      <KeyTakeaways
        items={[
          'Every app is a frontend, a backend and a database talking in a chain.',
          'The frontend never touches the database. It asks the backend over HTTP.',
          'Our fixed stack: FastAPI, React + Vite + Tailwind v4 + TypeScript, and SQLite.',
          'Your role is architect: decide, describe, review.',
        ]}
      />
    </div>
  );
}
