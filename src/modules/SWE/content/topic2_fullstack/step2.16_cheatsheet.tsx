import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CommandTable } from '../../../../components/content/CommandTable';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_16_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.16 • Reference"
        title="Topic 2 Cheat Sheet"
        summary="Architecture, HTTP, databases, scripts and the plan review. One page to come back to."
      />

      <Section title="The shape of every app" />
      <p>
        Browser (React) → HTTP request → FastAPI → sqlite3 → <code>data/*.db</code> → JSON → Browser.
      </p>
      <Table
        headers={['Layer', 'Tool', 'Lives in']}
        rows={[
          ['Frontend', 'React + Vite + Tailwind v4 + TypeScript', 'frontend/'],
          ['Backend', 'FastAPI (Python)', 'backend/'],
          ['Database', 'SQLite', 'data/'],
        ]}
      />

      <Section title="Folder map" />
      <Table
        headers={['Folder', 'Holds']}
        rows={[
          ['docs/', 'Specs, plans, design docs'],
          ['scripts/', 'system.sh and other scripts'],
          ['data/', 'SQLite databases, schemas, seed data'],
          ['tests/', 'unit/, system/, manual/'],
          ['backend/', 'main.py, endpoints/, config/ (JSON), requirements.txt, .venv'],
          ['frontend/', 'src/components/ (one per file), App.tsx, main.tsx, index.css'],
        ]}
      />
      <p>7 READMEs: the root, plus one in each of the six folders above.</p>

      <Section title="HTTP" />
      <Table
        headers={['Method', 'Means', 'Example']}
        rows={[
          ['GET', 'Read', 'GET /tasks'],
          ['POST', 'Create', 'POST /tasks'],
          ['PUT / PATCH', 'Update', 'PATCH /tasks/7'],
          ['DELETE', 'Delete', 'DELETE /tasks/7'],
        ]}
      />
      <Table
        headers={['Code', 'Meaning']}
        rows={[
          ['200', 'OK'],
          ['201', 'Created'],
          ['404', 'Not found'],
          ['422', 'Invalid data sent'],
          ['500', 'Server crashed. Check logs/backend.log'],
        ]}
      />

      <Section title="Databases" />
      <Table
        headers={['Idea', 'Remember']}
        rows={[
          ['Table', 'A grid. Columns are kinds of info, rows are records'],
          ['Types', 'INTEGER, REAL, TEXT, BLOB, NULL. Yes/no is 0/1, dates are text'],
          ['Primary key', 'id: a row\'s unique name'],
          ['Foreign key', 'A column holding another table\'s id. Put it on the "many" side'],
          ['Splitting', 'One table per kind of thing. Repeated values deserve their own table'],
          ['Viewing', 'Ctrl+Shift+P → SQLite: Open Database; right-click a table → Show Table'],
        ]}
      />

      <Section title="The script" />
      <CommandTable
        rows={[
          { command: './scripts/system.sh --start all', description: 'Start backend and frontend' },
          { command: './scripts/system.sh --start backend', description: 'Start only the backend' },
          { command: './scripts/system.sh --start frontend', description: 'Start only the frontend' },
          { command: './scripts/system.sh --stop all', description: 'Stop everything' },
          { command: './scripts/system.sh --restart all', description: 'Stop, then start' },
          { command: './scripts/system.sh --test unit', description: 'Run unit tests' },
          { command: './scripts/system.sh --test system', description: 'Run tests against the live API' },
          { command: './scripts/system.sh --test all', description: 'Run all tests' },
          { command: 'chmod +x scripts/system.sh', description: 'If you see "Permission denied"' },
        ]}
      />

      <Section title="Addresses" />
      <Table
        headers={['What', 'Where']}
        rows={[
          ['The website', 'http://localhost:5173'],
          ['The API', 'http://localhost:8000'],
          ['API documentation (Swagger)', 'http://localhost:8000/docs'],
          ['Logs', 'logs/frontend.log and logs/backend.log'],
        ]}
      />

      <Section title="The loop for every project" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>Sketch the screens as rectangles. Design the tables.</li>
        <li>Write the spec from the template.</li>
        <li>Run <code>/plan</code> and answer its questions.</li>
        <li>Read the entire plan. Run the checklist. Comment. Repeat.</li>
        <li>Approve, and let it build.</li>
        <li>Run it with <code>system.sh</code>. Check Swagger and the database viewer.</li>
        <li>Run the tests. Follow the manual test.</li>
        <li>If the AI broke a rule, improve the rule or skill.</li>
      </ol>

      <Section title="Plan review checklist" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Only folders from the layout, and all 7 READMEs.</li>
        <li>FastAPI, React + Vite + Tailwind v4 + TypeScript, SQLite and nothing else.</li>
        <li>.tsx / .ts files. One component per file, named identically.</li>
        <li>JSON config in backend/config/. No .env.</li>
        <li>The database lives in data/.</li>
        <li>No instruction to run npm, pip or python. Everything through system.sh.</li>
        <li>Python is run as ./.venv/bin/python from inside backend/.</li>
        <li>Tests in unit, system and manual.</li>
        <li>Nothing I did not ask for.</li>
      </ul>

      <Section title="Where your kit lives" />
      <Table
        headers={['Name', 'Type', 'Path (global)']}
        rows={[
          ['stack', 'Rule (always on)', '~/.gemini/config/rules/stack.md'],
          ['fullstack-architecture', 'Skill', '~/.gemini/config/skills/fullstack-architecture/SKILL.md'],
          ['website-design', 'Skill', '~/.gemini/config/skills/website-design/SKILL.md'],
          ['react-frontend', 'Skill', '~/.gemini/config/skills/react-frontend/SKILL.md'],
          ['fastapi-backend', 'Skill', '~/.gemini/config/skills/fastapi-backend/SKILL.md'],
          ['system-script', 'Skill', '~/.gemini/config/skills/system-script/SKILL.md'],
          ['testing', 'Skill', '~/.gemini/config/skills/testing/SKILL.md'],
        ]}
      />
      <Callout type="tip" title="Copy for Agy">
        The Agy command line reads <code>~/.gemini/antigravity-cli/skills/</code> and <code>~/.gemini/antigravity-cli/rules/</code>.
        After editing a skill, copy it across again with <code>cp -r</code>.
      </Callout>

      <KeyTakeaways
        items={[
          'Every app is frontend → API → backend → SQLite, and the data comes back as JSON.',
          'Every project has the same folders, 7 READMEs, JSON config, and the database in data/.',
          'You never type npm, pip or python. system.sh does it, and Python is always ./.venv/bin/python.',
          'The loop: sketch, spec, /plan, review, build, run, test, improve the kit.',
        ]}
      />
    </div>
  );
}
