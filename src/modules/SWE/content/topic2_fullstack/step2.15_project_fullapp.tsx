import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const EXAMPLE_SPEC = `/plan

I want to build: a reading list app for me, to keep track of the books I want to
read, am reading, and have finished.

What I can do with it:
- Add a book (title, author, year)
- See all my books as cards
- Mark a book as read
- Delete a book
- Filter by author

Data:
- authors: id, name
- books: id, title, year, read (0 or 1), author_id
- Relationship: each book belongs to one author; one author can have many books

API endpoints:
- GET /authors, POST /authors
- GET /books, POST /books, PATCH /books/{id} (mark read), DELETE /books/{id}

Screens (see attached sketch):
- Navbar with the app name
- A form to add a book (title, author, year)
- A grid of book cards with a "Mark read" and a "Delete" button
- Footer

Follow my saved rules and skills: stack, fullstack-architecture, website-design,
react-frontend, fastapi-backend, system-script, testing.
Everything runs through scripts/system.sh. I never run npm, pip or python.
Include tests in tests/unit, tests/system and tests/manual, and all 7 READMEs.

It is done when:
- ./scripts/system.sh --start all starts everything
- I add a book in the browser, refresh the page, and it is still there
- I can see the book as a row in the SQLite viewer
- ./scripts/system.sh --test all passes

Before you write the plan, ask me about anything that is unclear.`;

export default function Step2_15_ProjectFullApp() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.15 • Project B"
        title="Project B: Your Full App"
        summary="A real app with a frontend, a backend and a database, built from your own idea, using the kit you saved."
      />

      <p>
        This is the capstone for the topic. Unlike the portfolio, this app <em>remembers things</em>: you add data in the
        browser, it travels to the backend, it lands in SQLite, and it is still there tomorrow.
      </p>

      <Callout type="info" title="You are your own judge">
        As in Project A, there is no hidden check. When every item in the checklist at the bottom is honestly true,
        press Mark as Complete.
      </Callout>

      <Section title="Pick an idea" />
      <p>Choose something small, with at least two kinds of things (two tables) that relate to each other:</p>
      <Table
        headers={['Idea', 'Table 1', 'Table 2', 'Relationship']}
        rows={[
          ['Reading list', 'books', 'authors', 'a book has one author'],
          ['Recipe box', 'recipes', 'categories', 'a recipe has one category'],
          ['Budget tracker', 'expenses', 'categories', 'an expense has one category'],
          ['Plant care log', 'plants', 'rooms', 'a plant lives in one room'],
          ['Task list', 'tasks', 'categories', 'a task belongs to one category'],
        ]}
      />

      <Section title="The brief" />
      <p>Your app must have:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>A frontend</strong> with a form to add things and a visual list of them (cards).</li>
        <li><strong>A backend</strong> with at least two router files in <code>endpoints/</code>.</li>
        <li><strong>A database</strong> with two related tables, in <code>data/</code>.</li>
        <li>At least one way to <strong>change</strong> data (mark done, edit) and one to <strong>delete</strong> it.</li>
        <li><strong>Tests</strong> in all three layers, run through <code>system.sh</code>.</li>
        <li>All <strong>7 READMEs</strong>.</li>
      </ul>

      <Section title="Do it" />
      <Steps
        steps={[
          {
            title: 'Create the folder and open it',
            children: <p>Make <code>~/Development/&lt;your-app-name&gt;</code> with <code>mkdir</code>, <code>cd</code> into it, and open it in Antigravity (connected to WSL).</p>,
          },
          {
            title: 'Design the data on paper',
            children: <p>Write the two table names with their columns, and draw the arrow for the foreign key. Check it against the three questions in step 2.2.</p>,
          },
          {
            title: 'Sketch the screens as rectangles',
            children: <p>Navbar, a form, a grid of cards, a footer. Photograph it.</p>,
          },
          {
            title: 'Write the spec from the template',
            children: (
              <Collapsible title="Example spec (a reading list)">
                <CodeBlock language="markdown" title="Spec" code={EXAMPLE_SPEC} />
              </Collapsible>
            ),
          },
          {
            title: 'Run /plan and review it hard',
            children: <p>This plan is much bigger than Project A&apos;s. Take your time. Use the full checklist from step 2.10, and make sure it covers the backend, the database in <code>data/</code>, JSON config, tests and all 7 READMEs.</p>,
          },
          {
            title: 'Approve step by step, and build',
            children: <p>If the plan has phases, approve one at a time and glance at each result.</p>,
          },
          {
            title: 'Start everything',
            children: <p><code>chmod +x scripts/system.sh</code> if needed, then <code>./scripts/system.sh --start all</code>. Open the frontend address and the <code>/docs</code> page.</p>,
          },
          {
            title: 'Use it, then look inside the database',
            children: <p>Add a few items in the browser. Open <code>data/*.db</code> in the SQLite viewer and find your rows in both tables. Check that the foreign key values line up.</p>,
          },
          {
            title: 'Run the tests',
            children: <p><code>./scripts/system.sh --test all</code>. Then follow your manual test by hand.</p>,
          },
          {
            title: 'Improve your kit',
            children: <p>Did the AI break one of your rules? Don&apos;t just correct it: open the matching skill or rule, make it clearer, and save it. This is how your kit gets better.</p>,
          },
        ]}
      />

      <Collapsible title="If something goes wrong">
        <ul className="list-disc pl-5 space-y-1">
          <li>Use the field guide from step 2.13. Test in order: database, backend (Swagger), request (Network tab), screen.</li>
          <li>Give the AI the exact error, the file name, and what you expected.</li>
          <li>If the plan is badly off, it is cheaper to reject it and sharpen the spec than to patch it.</li>
        </ul>
      </Collapsible>

      <Section title="Checklist: you are done when" />
      <ul className="list-disc pl-5 space-y-1">
        <li>I designed the tables and the screens on paper before asking for anything.</li>
        <li>I read the whole plan and commented on at least one thing that broke my rules, or can say why nothing did.</li>
        <li>I started everything with <code>./scripts/system.sh --start all</code> and typed no npm, pip or python.</li>
        <li>I added data in the browser, refreshed, and it was still there.</li>
        <li>I opened the database in the viewer and can point to my rows and the foreign key that links them.</li>
        <li>The backend&apos;s <code>/docs</code> page shows my endpoints and I tried one there.</li>
        <li><code>./scripts/system.sh --test all</code> passes and I followed my manual test once.</li>
        <li>There are 7 READMEs, the config is JSON with no .env file, and each component is in its own file.</li>
        <li>I improved at least one rule or skill after seeing the AI make a mistake.</li>
      </ul>
      <p>
        When every item is honestly true, press <strong>Mark as Complete</strong>.
      </p>

      <KeyTakeaways
        items={[
          'You built a full app: browser → API → SQLite → back again, with tests, using a kit of your own rules and skills.',
          'You directed it with a spec, controlled it with plan reviews, and verified it with tests and the database viewer.',
          'When the AI slips, improve the rule or skill, not just the output.',
        ]}
      />
    </div>
  );
}
