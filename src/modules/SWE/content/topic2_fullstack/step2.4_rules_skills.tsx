import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Compare } from '../../../../components/content/Compare';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { STACK_RULE } from '../../toolkit/tools_fullstack';

const EXAMPLE_SKILL = `---
name: pr-checklist
description: Checks a change against our review checklist. Use when asked to review or finish a change.
---
# Review checklist
1. Does it follow the folder layout?
2. Are names consistent?
3. Is anything left unfinished?`;

export default function Step2_4_RulesSkills() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.4 • Spec-Driven Engineering"
        title="Teaching Your AI: Rules & Skills"
        summary="An AI helper forgets everything between conversations. Rules and skills are files that remind it, every time."
      />

      <p>
        Imagine hiring a very fast assistant who has never met you and forgets everything overnight. Each morning you
        would hand them the same sheet of instructions. <strong>Rules</strong> and <strong>skills</strong> are that
        sheet, kept as files that Antigravity and Agy read for you. You write your standards once, and every future
        project follows them.
      </p>

      <Section title="Rules vs skills" />
      <Table
        headers={['', 'Rule', 'Skill']}
        rows={[
          ['Think of it as', 'House rules that always apply', 'A recipe for one kind of job'],
          ['Loaded', 'Into every conversation (if set to always on)', 'Only when the task matches its description'],
          ['Good for', 'The stack, hard "never do this" lines, tone', 'The folder layout, how to design a page, how to write the run script'],
          ['A file named', 'stack.md', 'a folder with a SKILL.md inside'],
        ]}
      />

      <Section title="Anatomy of each file" />
      <p>
        Both are Markdown (plain text with simple formatting) and both start with a small header between two lines of{' '}
        <code>---</code>. That header is called <em>frontmatter</em>.
      </p>
      <CodeBlock language="markdown" title="SKILL.md (an example)" code={EXAMPLE_SKILL} />
      <Table
        headers={['Frontmatter field', 'Meaning']}
        rows={[
          [<code key="a">name</code>, 'A short lowercase-with-hyphens name. You can also invoke the skill by typing it'],
          [<code key="b">description</code>, 'The most important line. The AI reads it to decide when to use the skill. Say what it does and when'],
          [<code key="c">trigger</code>, '(Rules only) always_on, model_decision, glob, or manual'],
        ]}
      />
      <Callout type="warning" title="A rule without a valid header is ignored">
        Rule files that are missing the frontmatter, or that have an unrecognised <code>trigger</code>, are silently
        discarded. There is no error. If a rule seems to be doing nothing, check the header first.
      </Callout>

      <Section title="Where they live: global or per-project" />
      <Table
        headers={['Scope', 'Skills', 'Rules']}
        rows={[
          ['Global (all projects)', '~/.gemini/config/skills/NAME/SKILL.md', '~/.gemini/config/rules/NAME.md'],
          ['One project only', '.agents/skills/NAME/SKILL.md', '.agents/rules/NAME.md'],
          ['Agy command line (global)', '~/.gemini/antigravity-cli/skills/', '~/.gemini/antigravity-cli/rules/'],
        ]}
      />
      <p>
        We save <strong>globally</strong>, so every new project you create starts with your standards already known. The
        Agy command line reads a separate folder, which is why each save block below also shows a short copy command.
      </p>

      <Compare
        goodLabel="With a saved rule"
        badLabel="Without one"
        good={<p>&quot;Build me a task app.&quot; The AI uses FastAPI, SQLite and React because your rule said so.</p>}
        bad={<p>&quot;Build me a task app.&quot; The AI picks Express and MongoDB, creates a .env file and tells you to run npm start.</p>}
      />

      <Section title="Your first one: the stack rule" />
      <p>
        This rule is <code>always_on</code>, because it applies to everything you will ever build. Read it through
        before you save it. Every line is a decision from the earlier steps.
      </p>
      <TeachAI kind="rule" name="stack" text={STACK_RULE} />

      <Callout type="tip" title="Skills are living documents">
        As you learn what works, you will edit these files. In step 2.12 you will replace the run-script skill with a
        better version. When your AI keeps making the same mistake, the fix is almost never to correct it again. It is
        to improve the rule or skill.
      </Callout>

      <QuizSet>
        <Quiz
          question="Which one should be loaded into every conversation?"
          options={['A skill', 'A rule with trigger: always_on', 'Neither', 'The README']}
          correctIndex={1}
          explanation="Rules marked always_on go into every prompt. Skills load on demand."
        />
        <Quiz
          question="What is the most important line of a skill?"
          options={['The title', 'The name', 'The description, because the AI uses it to decide when to apply the skill', 'The last line']}
          correctIndex={2}
          explanation="The AI only sees names and descriptions up front. A vague description means the skill never gets used."
        />
        <Quiz
          question="Why save rules and skills globally?"
          options={['It is faster', 'Every new project follows them without copying', 'It is required', 'Project folders cannot hold them']}
          correctIndex={1}
          explanation="Your projects live in separate folders. Global files apply to all of them."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'AI forgets between conversations. Rules and skills are files that remind it.',
          'Rules are always-on house rules. Skills are recipes loaded when their description matches the task.',
          'Both start with frontmatter between --- lines. A rule with a bad header is silently ignored.',
          'We save globally under ~/.gemini/config/, then copy to the Agy folder.',
          'If the AI repeats a mistake, improve the file instead of repeating the correction.',
        ]}
      />
    </div>
  );
}
