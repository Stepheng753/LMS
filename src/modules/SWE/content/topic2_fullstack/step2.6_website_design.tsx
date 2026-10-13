import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Term } from '../../../../components/content/Term';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { DESIGN_SKILL } from '../../toolkit/texts';

const WIREFRAME_BOX = 'rounded border-2 border-dashed border-primary/50 flex items-center justify-center text-xs font-semibold text-muted-foreground';

function Wireframe() {
  return (
    <div className="my-6 rounded-xl border-2 border-dashed border-primary bg-background p-3 space-y-2 max-w-md mx-auto">
      <p className="text-[0.7rem] uppercase tracking-wider text-primary font-semibold !my-0">The page (one big rectangle)</p>
      <div className={`${WIREFRAME_BOX} h-9`}>Navbar</div>
      <div className={`${WIREFRAME_BOX} h-24 flex-col gap-1`}>
        <span>Hero</span>
        <span className="rounded border border-dashed border-primary/50 px-3 py-0.5 text-[0.65rem]">Button</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['Card', 'Card', 'Card'].map((c, i) => (
          <div key={i} className={`${WIREFRAME_BOX} h-16`}>{c}</div>
        ))}
      </div>
      <div className={`${WIREFRAME_BOX} h-9`}>Footer</div>
    </div>
  );
}

export default function Step2_6_WebsiteDesign() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.6 • Spec-Driven Engineering"
        title="Websites Are Rectangles in Rectangles"
        summary="Before you can ask an AI to build a page, you need to be able to see it: boxes inside boxes."
      />

      <p>
        Every web page, from a tiny personal site to a giant shop, is built from the same thing: rectangles. A big
        rectangle (the page) holds smaller rectangles (sections), and those hold smaller ones still (a heading, a
        button, a photo). In code, each rectangle is called a <Term definition="A generic box. Almost everything on a web page is a div, or a more specific kind of box, nested inside another.">div</Term>,
        and a div can sit inside another div, as deep as you like.
      </p>

      <Wireframe />

      <p>
        That sketch is a complete page design. No colours, no words, just boxes. Designers call this a{' '}
        <strong>wireframe</strong>, and it is the most useful thing you can hand to an AI.
      </p>

      <Section title="Boxes in code" />
      <p>The wireframe above, as the AI would structure it:</p>
      <CodeBlock
        language="typescript"
        title="Boxes inside boxes"
        code={`<div className="page">
  <div className="navbar"> ... </div>
  <div className="hero">
    <h1>Hello, I am Anna</h1>
    <button>See my work</button>
  </div>
  <div className="cards">
    <div className="card"> ... </div>
    <div className="card"> ... </div>
    <div className="card"> ... </div>
  </div>
  <div className="footer"> ... </div>
</div>`}
      />
      <p>
        Read the indentation. Each box is inside the one above it that is less indented. If you can draw nested
        rectangles, you can read this code.
      </p>

      <Section title="The parts of almost every website" />
      <Table
        headers={['Part', 'What it is', 'Where it sits']}
        rows={[
          ['Navbar', 'Name or logo plus navigation links', 'Top of every page'],
          ['Hero', 'The big first section: headline, one sentence, one main button', 'Directly under the navbar'],
          ['Section', 'A block with one idea: About, Projects, Skills', 'Stacked down the page'],
          ['Card', 'A small box for one repeated item, like a project', 'In a row or grid inside a section'],
          ['Grid / row', 'A box that arranges its children side by side', 'Inside a section'],
          ['Button / call to action', 'The thing you most want a visitor to click', 'Hero and the end of sections'],
          ['Form', 'Labelled fields plus a submit button', 'Inside a section or its own page'],
          ['Footer', 'Small links and copyright', 'Bottom of every page'],
        ]}
      />

      <Section title="How rectangles line up" />
      <p>
        You do not position things with exact numbers. You tell a box how to arrange its children, and the browser does
        the sums. There are two arrangements to know:
      </p>
      <Table
        headers={['Arrangement', 'Meaning', 'Use it for']}
        rows={[
          ['Flex (row or column)', 'Children in a line, either across or down', 'A navbar, a button row, a column of text'],
          ['Grid', 'Children in rows and columns of equal cells', 'A set of cards'],
        ]}
      />
      <Callout type="info" title="Phones first">
        More than half of web visits are on phones, so we design the narrow version first. On a phone the three cards
        stack in a column. On a wide screen they sit in a row. Mention this in your spec and the AI handles it.
      </Callout>

      <Section title="Draw it on paper" />
      <p>
        This is not an art class. Rough is fine. Take a sheet of paper and draw it like this:
      </p>
      <Exercise
        title="Sketch your website"
        hint={<p>Start with the page outline, then slice it into horizontal bands from top to bottom, then divide the bands that have several items in them.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li>A big rectangle for the whole page.</li>
            <li>A thin strip at the top labelled &quot;Navbar&quot;, with a name on the left and 3 links on the right.</li>
            <li>A tall box underneath labelled &quot;Hero&quot;, with a headline and a button inside it.</li>
            <li>2 to 3 more bands (About, Projects, ...), each with a heading, and cards drawn inside the Projects band.</li>
            <li>A thin strip at the bottom labelled &quot;Footer&quot;.</li>
            <li>Take a photo of it. You will use it in Project A.</li>
          </ol>
        }
      >
        <p>
          On paper, draw a big rectangle for the page. Inside it, draw rectangles for each section of a personal
          portfolio: navbar, hero, about, projects (with cards) and footer. Write a label in each box.
        </p>
      </Exercise>

      <Callout type="tip" title="Describing it to an AI">
        You can take a photo of your sketch and give it to the AI, and also describe it in words: &quot;A navbar with my
        name on the left and three links on the right. Under it a hero with a headline and one button. Then a projects
        section with three cards in a row...&quot; Words plus a picture is the most reliable combination.
      </Callout>

      <Section title="Borrow great-looking pieces: 21st.dev" />
      <p>
        You do not have to invent every card, hero and button from nothing. <strong><a href="https://21st.dev/" target="_blank" rel="noopener noreferrer">21st.dev</a></strong> is a free gallery
        of ready-made interface pieces built by designers, using the same tools as our stack: React, TypeScript and
        Tailwind CSS. You browse the gallery like a shop window, pick what you like, and have your AI build it into your
        site.
      </p>
      <Steps
        steps={[
          { title: 'Browse', children: <p>Go to <a href="https://21st.dev/" target="_blank" rel="noopener noreferrer">21st.dev</a> and look through the categories: heroes, navbars, pricing tables, cards, footers, buttons.</p> },
          { title: 'Pick one that matches a rectangle in your sketch', children: <p>Look for the part, not the whole page. &quot;I want that hero&quot; or &quot;I want those cards.&quot;</p> },
          { title: 'Use "Copy prompt"', children: <p>Each piece offers a ready-made prompt that describes it for an AI. Copy it.</p> },
          {
            title: 'Paste it into your spec',
            children: (
              <p>
                In the &quot;Screens or sections&quot; part of your spec (step 2.9), add a line such as:{' '}
                <em>&quot;For the hero, use this component:&quot;</em> followed by the pasted prompt. Then run{' '}
                <code>/plan</code> as usual and check that the plan lists the component.
              </p>
            ),
          },
        ]}
      />

      <Compare
        goodLabel="Copy prompt, then adapt"
        badLabel="Run the install command"
        good={<p>The AI rebuilds the piece inside <em>your</em> structure: one component per file, a <code>.tsx</code> name that matches, Tailwind v4.</p>}
        bad={<p>The install command (the &quot;shadcn CLI&quot;) adds extra folders and configuration files that are not on your folder map.</p>}
      />

      <Callout type="warning" title="Things to know">
        <ul className="list-disc pl-5 space-y-1">
          <li>The free level lets you copy only a couple of components per day, so choose before you click.</li>
          <li>Some templates and the built-in AI generator are paid. You do not need them.</li>
          <li>Treat what you copy as a starting point. In the plan review, check it still follows your layout: one component per file, <code>.tsx</code>, and no <code>tailwind.config</code> file.</li>
        </ul>
      </Callout>

      <TeachAI kind="skill" name="website-design" text={DESIGN_SKILL} />

      <QuizSet>
        <Quiz
          question="What is a wireframe?"
          options={['A finished design with colours', 'A rough sketch of the page as labelled boxes', 'A kind of database', 'A programming language']}
          correctIndex={1}
          explanation="A wireframe shows structure only: where each section and element goes."
        />
        <Quiz
          question="Three project cards should sit side by side on a wide screen. Which arrangement fits best?"
          options={['Grid', 'Footer', 'Hero', 'Form']}
          correctIndex={0}
          explanation="A grid arranges children in equal cells, a good match for a set of cards."
        />
        <Quiz
          question="You like a hero on 21st.dev. What is the best way to use it?"
          options={[
            'Run its install command and approve whatever it adds',
            'Copy its prompt into your spec so the plan adapts it to your structure',
            'Retype all of its code by hand',
            'Skip the plan',
          ]}
          correctIndex={1}
          explanation="The prompt lets the AI rebuild it within your rules. The plan review then confirms it does."
        />
        <Quiz
          question="Which part of a page contains the headline and the main call-to-action button?"
          options={['Navbar', 'Footer', 'Hero', 'Card']}
          correctIndex={2}
          explanation="The hero is the large first section built to grab attention."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A web page is rectangles inside rectangles, and each rectangle is a div.',
          'Nearly every site has a navbar, a hero, sections, cards, and a footer.',
          'Flex lines things up in a row or column, and grid lays things out in cells.',
          'Sketch on paper first, then describe it with words and a photo.',
        ]}
      />
    </div>
  );
}
