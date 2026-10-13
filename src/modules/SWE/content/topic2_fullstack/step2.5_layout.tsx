import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { FileTree } from '../../../../components/content/FileTree';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const ARCH_SKILL = `---
name: fullstack-architecture
description: The required folder layout, README convention and naming rules for every full-stack project. Use whenever creating, planning, extending or reorganising a project.
---
# Full-stack project architecture

Every full-stack project uses exactly this layout. Do not invent other top-level folders.

project-root/
├── README.md                 Project overview and how to start it
├── .gitignore                .venv/, node_modules/, data/*.db, logs/, dist/, backend/config/secrets.json
├── docs/
│   └── README.md             Specifications, architecture plans, design docs
├── scripts/
│   ├── README.md             What each script does
│   ├── system.sh             Start, stop, restart and test (see the system-script skill)
│   └── ...                   Other utility scripts (seed_db.sh, backup.sh, ...)
├── data/
│   └── README.md             Schemas, seed data, SQLite files (*.db)
├── tests/
│   ├── README.md             Testing guidelines
│   ├── unit/                 pytest tests of functions and config loading
│   ├── system/               Tests against the running API
│   └── manual/               Step-by-step human checks written in Markdown
├── backend/
│   ├── README.md             API documentation and local setup
│   ├── .venv/                Python virtual environment
│   ├── requirements.txt      Pinned dependencies
│   ├── config/               All configuration as JSON. Never .env files
│   │   ├── config.json
│   │   ├── secrets.json      Ignored by git
│   │   └── distinct_values.json
│   ├── endpoints/            One router file per domain, named after the resource
│   │   ├── __init__.py
│   │   └── tasks.py
│   └── main.py               FastAPI entrypoint: registers every router
└── frontend/
    ├── README.md             Build, dev setup and component notes
    ├── node_modules/
    ├── public/               Static assets
    ├── src/
    │   ├── components/       One component per file, file named exactly like the component
    │   │   ├── Button.tsx
    │   │   └── TaskCard.tsx
    │   ├── main.tsx          Application entrypoint
    │   ├── App.tsx           Root layout
    │   └── index.css         Contains: @import "tailwindcss";
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts        Includes the Tailwind v4 Vite plugin

## Rules
1. There are 7 README.md files: the project root plus docs, scripts, data, tests, backend and frontend. Create them all.
2. Configuration is JSON files in backend/config/, named by purpose. The three above are typical, add more when needed. No .env files.
3. Database files live only in data/.
4. Each endpoints/ file is a router for one domain, named after the resource in lowercase plural (tasks.py, users.py). main.py registers all of them.
5. Frontend components live in frontend/src/components/. One component per file, and the file name equals the component name in PascalCase.
6. Tailwind v4 has no tailwind.config file. Do not create one.
7. Tests are split into unit, system and manual (see the testing skill).
8. A frontend-only project (such as a portfolio) uses only README.md, docs/, scripts/ and frontend/, each with its README.md.`;

export default function Step2_5_Layout() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.5 • Spec-Driven Engineering"
        title="The Universal Repo Layout"
        summary="Every full-stack project you ever build will have these folders, in these places, with these names."
      />

      <p>
        When the structure is always the same, you always know where to look, your AI helper always knows where to put
        things, and a review takes minutes instead of hours. It also makes it easy to tell when an AI has gone off-spec:
        a folder appears that is not on the map.
      </p>

      <Section title="The map" />
      <FileTree
        title="project-root/"
        tree={[
          { name: 'README.md', note: 'overview + how to start' },
          { name: '.gitignore', note: 'files that must never be shared' },
          { name: 'docs', children: [{ name: 'README.md', note: 'specs, plans, design docs' }] },
          {
            name: 'scripts',
            children: [
              { name: 'README.md' },
              { name: 'system.sh', note: 'start / stop / restart / test' },
            ],
          },
          { name: 'data', children: [{ name: 'README.md', note: 'schemas, seed data, *.db files' }] },
          {
            name: 'tests',
            children: [
              { name: 'README.md' },
              { name: 'unit', note: 'small function checks', children: [] },
              { name: 'system', note: 'checks against the running API', children: [] },
              { name: 'manual', note: 'human step-by-step checks', children: [] },
            ],
          },
          {
            name: 'backend',
            children: [
              { name: 'README.md' },
              { name: 'requirements.txt', note: 'pinned dependencies' },
              {
                name: 'config',
                note: 'JSON only, never .env',
                children: [
                  { name: 'config.json' },
                  { name: 'secrets.json', note: 'never shared' },
                  { name: 'distinct_values.json' },
                ],
              },
              { name: 'endpoints', children: [{ name: '__init__.py' }, { name: 'tasks.py', note: 'one file per resource' }] },
              { name: 'main.py', note: 'FastAPI entrypoint' },
            ],
          },
          {
            name: 'frontend',
            children: [
              { name: 'README.md' },
              { name: 'public', note: 'static assets', children: [] },
              {
                name: 'src',
                children: [
                  {
                    name: 'components',
                    note: 'one component per file',
                    children: [{ name: 'Button.tsx' }, { name: 'TaskCard.tsx' }],
                  },
                  { name: 'main.tsx' },
                  { name: 'App.tsx' },
                  { name: 'index.css' },
                ],
              },
              { name: 'index.html' },
              { name: 'package.json' },
              { name: 'vite.config.ts' },
            ],
          },
        ]}
      />
      <p>
        <code>.venv/</code> and <code>node_modules/</code> also appear inside <code>backend/</code> and{' '}
        <code>frontend/</code> once a script has installed things. They are created automatically, so you never make
        them yourself.
      </p>

      <Section title="What each folder is for" />
      <Table
        headers={['Folder', 'Holds', 'Test: would you put this here?']}
        rows={[
          ['docs/', 'Specs, plans, design notes', 'A written plan for a new feature'],
          ['scripts/', 'Every command-line automation', 'A script that starts the app'],
          ['data/', 'Database files, schemas and seed data', 'The app.db file'],
          ['tests/', 'Every kind of check', 'A step-by-step manual test'],
          ['backend/', 'The Python server', 'A new endpoint'],
          ['frontend/', 'The React app', 'A new page component'],
        ]}
      />

      <Section title="The 7-README convention" />
      <p>
        Every project gets exactly seven <code>README.md</code> files: one in the project root, and one in each of{' '}
        <code>docs</code>, <code>scripts</code>, <code>data</code>, <code>tests</code>, <code>backend</code> and{' '}
        <code>frontend</code>. A README is a short note that says what is in this folder and how to use it. When you
        return to a project after a month, or hand it to someone else, the READMEs are how anyone finds their feet.
      </p>

      <Section title="Naming rules" />
      <Table
        headers={['What', 'Rule', 'Example']}
        rows={[
          ['Folders', 'lowercase, no spaces', 'endpoints'],
          ['Backend endpoint files', 'The resource, lowercase and plural', 'tasks.py, categories.py'],
          ['Frontend components', 'PascalCase, and the file name equals the component name', 'TaskCard.tsx contains TaskCard'],
          ['Config files', 'JSON, named by purpose', 'config.json, secrets.json'],
          ['Frontend source', 'TypeScript', '.tsx / .ts, never .jsx / .js'],
        ]}
      />

      <Callout type="info" title="About .gitignore">
        The layout includes a <code>.gitignore</code> file, a list of things that should never be shared or saved
        (secrets, downloaded libraries, logs). You do not need to understand it yet. It starts to matter when we learn
        about git later. For now, just let the AI create it.
      </Callout>

      <Callout type="tip" title="Not every project uses every folder">
        A portfolio website has no backend or database, so it uses only the root, <code>docs/</code>,{' '}
        <code>scripts/</code> and <code>frontend/</code>. A full app uses everything.
      </Callout>

      <TeachAI kind="skill" name="fullstack-architecture" text={ARCH_SKILL} />

      <QuizSet>
        <Quiz
          question="Where does the SQLite database file live?"
          options={['backend/', 'frontend/src/', 'data/', 'docs/']}
          correctIndex={2}
          explanation="The database lives only in data/."
        />
        <Quiz
          question="How many README.md files should every full-stack project have?"
          options={['1', '3', '7', 'One per file']}
          correctIndex={2}
          explanation="One in the root plus one in each of docs, scripts, data, tests, backend and frontend."
        />
        <Quiz
          question="A new component is called ProductCard. What should its file be called?"
          options={['product-card.tsx', 'productcard.tsx', 'ProductCard.tsx', 'Card.tsx']}
          correctIndex={2}
          explanation="One component per file, and the file name matches the component exactly."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Every project has the same folders: docs, scripts, data, tests, backend and frontend.',
          '7 READMEs: the root plus one per top-level folder.',
          'Config is JSON in backend/config/, the database lives in data/, and one component goes in each file.',
          'A folder that is not on the map is a sign the AI went off-spec.',
        ]}
      />
    </div>
  );
}
