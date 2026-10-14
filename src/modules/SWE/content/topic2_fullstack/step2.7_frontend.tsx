import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { FileTree } from '../../../../components/content/FileTree';
import { Compare } from '../../../../components/content/Compare';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { FRONTEND_SKILL } from '../topic_toolkit/tools/tools_fullstack';

export default function Step2_7_Frontend() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.7 • Spec-Driven Engineering"
        title="Frontend: React + Vite + Tailwind + TypeScript"
        summary="What each tool does, what a component is, and what the AI will be writing on your behalf."
      />

      <p>
        The frontend is everything the visitor sees. You will not write it, but you will review it, so you need to
        recognise the shape of the pieces.
      </p>

      <Section title="Four tools, four jobs" />
      <Table
        headers={['Tool', 'Job', 'Analogy']}
        rows={[
          ['React', 'Builds the page out of reusable pieces called components', 'LEGO bricks'],
          ['TypeScript', 'JavaScript with labels on data, so mistakes are caught early', 'A spell-checker'],
          ['Tailwind CSS', 'Styles things with short class names written right on each box', 'Paint and spacing'],
          ['Vite', 'A fast development server and the tool that bundles the app for release', 'The workshop'],
        ]}
      />

      <Section title="A component is a reusable box" />
      <p>
        Do you remember the card in the wireframe? You need three of them, with different words. Rather than building
        three, you build one <strong>TaskCard</strong> and use it three times. That is a component.
      </p>
      <CodeBlock
        language="typescript"
        title="frontend/src/components/TaskCard.tsx"
        code={`type TaskCardProps = {
  title: string;
  done: boolean;
};

export default function TaskCard({ title, done }: TaskCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{done ? "Done" : "To do"}</p>
    </div>
  );
}`}
      />
      <ul className="list-disc pl-5 space-y-1">
        <li>The <code>type</code> block at the top lists what the component needs (its <em>props</em>) and their kinds: text, true/false...</li>
        <li>The <code>return</code> block is the box. It looks like HTML, and is a div with things inside.</li>
        <li><code>className</code> is Tailwind: <code>rounded-lg</code> rounds corners, <code>p-4</code> adds padding, <code>font-semibold</code> makes the text heavier.</li>
      </ul>

      <Compare
        goodLabel="One component per file"
        badLabel="Several in one file"
        good={<p><code>TaskCard.tsx</code> contains only <code>TaskCard</code>. <code>Button.tsx</code> contains only <code>Button</code>.</p>}
        bad={<p><code>Components.tsx</code> contains <code>TaskCard</code>, <code>Button</code> and <code>Header</code>. Which file do you open to change the button?</p>}
      />

      <Section title="Tailwind in one minute" />
      <p>
        Instead of writing a separate stylesheet, you put short class names on each box. You do not have to memorise
        them. You just need to read them.
      </p>
      <Table
        headers={['Class', 'Does']}
        rows={[
          [<code key="a">p-4</code>, 'Padding inside the box'],
          [<code key="b">m-4</code>, 'Margin outside the box'],
          [<code key="c">flex</code>, 'Arrange children in a row'],
          [<code key="d">grid grid-cols-3</code>, 'Arrange children in a 3-column grid'],
          [<code key="e">text-lg font-bold</code>, 'Larger, bold text'],
          [<code key="f">bg-white rounded-lg shadow</code>, 'White background, rounded corners, soft shadow'],
          [<code key="g">md:grid-cols-3</code>, 'On medium screens and wider, use 3 columns (phone-first design)'],
        ]}
      />
      <Callout type="info" title="Tailwind v4 has no config file">
        Older tutorials mention a <code>tailwind.config.js</code>. Tailwind v4, the version we use, does not need one.
        It is switched on with one line at the top of <code>src/index.css</code>. If an AI creates a{' '}
        <code>tailwind.config</code> file, it is following out-of-date examples, which is something to catch in the
        plan.
      </Callout>

      <Section title="Getting data from the backend" />
      <p>
        When the page loads, the component asks the backend for data and then draws it. You will see code like this:
      </p>
      <CodeBlock
        language="typescript"
        title="Fetching tasks (just recognise the shape)"
        code={`const [tasks, setTasks] = useState<Task[]>([]);

useEffect(() => {
  fetch("http://localhost:8000/tasks")
    .then((res) => res.json())
    .then(setTasks);
}, []);`}
      />
      <p>
        Read it as: &quot;keep a list of tasks, which starts empty. When the page first appears, GET{' '}
        <code>/tasks</code>, turn the reply into data, and store it. Then draw a TaskCard for each one.&quot;
      </p>

      <FileTree
        title="Inside frontend/"
        tree={[
          {
            name: 'frontend',
            children: [
              { name: 'index.html', note: 'the single page the browser loads' },
              { name: 'package.json', note: 'the shopping list of libraries' },
              { name: 'vite.config.ts', note: 'Vite + Tailwind plugin' },
              {
                name: 'src',
                children: [
                  { name: 'main.tsx', note: 'starts the app' },
                  { name: 'App.tsx', note: 'the page layout' },
                  { name: 'index.css', note: '@import "tailwindcss";' },
                  { name: 'components', children: [{ name: 'TaskCard.tsx' }, { name: 'Button.tsx' }] },
                ],
              },
            ],
          },
        ]}
      />

      <TeachAI kind="skill" name="react-frontend" text={FRONTEND_SKILL} />

      <QuizSet>
        <Quiz
          question="What is a React component?"
          options={['A database table', 'A reusable box of the page, such as a card or button', 'A Python library', 'A folder']}
          correctIndex={1}
          explanation="Components are reusable pieces that you combine into a page."
        />
        <Quiz
          question="Where does the Tailwind v4 setup live?"
          options={['tailwind.config.js', 'A line in src/index.css plus a plugin in vite.config.ts', 'package.json only', 'A .env file']}
          correctIndex={1}
          explanation="v4 is configured in CSS, with the Vite plugin. No tailwind.config file."
        />
        <Quiz
          question="The AI proposes putting Header, Footer and Card in one file called Components.tsx. What do you do?"
          options={['Approve', 'Comment: one component per file, named after the component', 'Rename it by hand', 'Ignore it']}
          correctIndex={1}
          explanation="That breaks the one-component-per-file rule. A plan comment fixes it before any code is written."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'React builds pages from components. Reuse one card for every project.',
          'TypeScript labels the data, Tailwind styles boxes with class names, and Vite runs and bundles the app.',
          'One component per file, with the file named exactly like the component.',
          'Tailwind v4 needs no config file. If one shows up, it is a red flag.',
          'Data arrives with fetch: ask the backend, store the reply, draw it.',
        ]}
      />
    </div>
  );
}
