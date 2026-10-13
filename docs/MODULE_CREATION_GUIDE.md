# Module & Content Creation Guide

This guide outlines the standard architectural pattern for authoring modules and content steps within the LMS platform.

---

## 1. Directory Structure

Each learning module lives in its own directory under `src/modules/<ModuleName>`:

```
src/modules/<ModuleName>/
├── content/
│   ├── step1.0_<slug>.tsx
│   ├── step1.1_<slug>.tsx
│   └── step1.2_<slug>.tsx
└── index.ts
```

---

## 2. Creating a Step Component

Step files are standard React components named using the pattern:  
`step<stage>.<order>_<description>.tsx` (e.g., `step1.0_bash.tsx`).

### Step Component Template

```tsx
import { StepHeader } from '../../../components/content/StepHeader';
import { Section } from '../../../components/content/Section';
import { TerminalBlock } from '../../../components/content/TerminalBlock';
import { CodeBlock } from '../../../components/content/CodeBlock';
import { Callout } from '../../../components/content/Callout';
import { Quiz } from '../../../components/content/Quiz';
import { KeyTakeaways } from '../../../components/content/KeyTakeaways';

export default function Step1_0_Example() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.0 • Category"
        title="Lesson Title"
        summary="Brief summary of what the learner will accomplish."
      />

      {/* Plain <p>, <ul>, <ol>, <strong>, <code> are styled automatically by .lms-content
          in src/styles/style.css. Don't add typography classes to them. */}
      <p>Core educational concept goes here...</p>

      {/* Use <Section> (not a bare <h2>) so the heading appears in "On this page". */}
      <Section title="1. First Idea" />
      <p>Use <code>inline code</code> and <strong>emphasis</strong> freely.</p>

      <TerminalBlock command="npm run dev" output="Vite ready at http://localhost:5173" />

      <Callout type="tip" title="Pro Tip">
        Helpful advice for learners.
      </Callout>

      <CodeBlock language="typescript" title="Example.ts" code={`const greeting = "Hello LMS";`} />

      <Quiz
        question="What is the primary role of this concept?"
        options={['Option A', 'Option B', 'Option C']}
        correctIndex={0}
        explanation="Option A is correct because..."
      />

      <KeyTakeaways items={['Core lesson principle 1', 'Core lesson principle 2']} />
    </div>
  );
}
```

**Rules of thumb**
- The step's root must be a single `<div>`; the shared typography rules apply to its direct children.
- No `import React` is needed (the project uses the automatic JSX runtime).
- Prefer the content components over hand-written markup so every step looks the same.

---

## 3. Creating the Module Manifest (`index.ts`)

Create `src/modules/<ModuleName>/index.ts` to organize steps into stages:

```ts
import Step1_0_Example from './content/step1.0_example';
import { ModuleDefinition } from '../../types/lms';

export const exampleModule: ModuleDefinition = {
  id: 'ExampleModule',
  slug: 'example-module',
  title: 'Example Module Title',
  category: 'Specialization Track',
  description: 'Detailed description of the track...',
  icon: 'BookOpen', // Lucide icon identifier
  badge: 'Track Badge',
  difficulty: 'Beginner', // 'Beginner' | 'Intermediate' | 'Advanced'
  stages: [
    {
      id: 'example-stage-1',
      title: 'Stage 1: Core Fundamentals',
      description: 'Stage overview description.',
      steps: [
        {
          id: 'ex-1-0',
          order: '1.0',
          title: 'Introduction to Example',
          description: 'Step summary.',
          estimatedMinutes: 10,
          component: Step1_0_Example,
        },
      ],
    },
  ],
};
```

---

## 4. Registering the Module in the System

Open `src/modules/index.ts` and add your module to `ALL_MODULES`:

```ts
import { sweModule } from './SWE';
import { financeModule } from './Finance';
import { exampleModule } from './ExampleModule'; // 1. Import

export const ALL_MODULES: ModuleDefinition[] = [
  sweModule,
  financeModule,
  exampleModule, // 2. Register here
];
```

The new module will immediately appear on the catalog homepage with its stages and steps fully wired to the sidebar navigation.

---

## 5. Content Component Reference

All live in `src/components/content/`. Working examples: the SWE steps (1.0–1.2) and Finance step 1.2.

| Component | Use it for |
|---|---|
| `StepHeader` | Eyebrow, title and summary at the top of every step |
| `Section` | `<h2>`/`<h3>` with an anchor id; level-2 sections feed the "On this page" outline |
| `TerminalBlock` | A command and its output; pass `lines` for a multi-command session |
| `CodeBlock` | File or snippet contents, syntax highlighted (Bash, Java, Python, JS/TS, JSON, SQL, YAML); same frame as `TerminalBlock` |
| `Callout` | Tip, info, warning or success note |
| `Term` | Inline glossary word with a hover definition |
| `Steps` | Numbered walkthrough |
| `Compare` | Do / don't side by side |
| `Tabs` | Per-OS or per-language variants |
| `Collapsible` | Hints and optional deep dives |
| `FileTree` | Collapsible directory tree with vscode-icons (a node with `children` is a folder) |
| `CommandTable` | Command cheat sheet |
| `Table` | General data table |
| `Formula` | Display equation with an optional legend |
| `Chart` | Single-series bar or line chart with a table view |
| `Exercise` | `kind="exercise"` hides the solution, `kind="example"` shows a worked solution |
| `Quiz`, `MultiSelectQuiz`, `FillInQuiz` | Knowledge checks |
| `QuizSet` | Wrap several quizzes to show a combined score |
| `KeyTakeaways` | Summary list at the end of a step |

---

## 6. Checklist Before Committing a New Step

- [ ] Step uses `StepHeader` and `Section`
- [ ] Ends with a quiz or exercise and `KeyTakeaways`
- [ ] Registered in the module's `index.ts` with a realistic `estimatedMinutes`
- [ ] `npm run build` passes
