import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { FileTree } from '../../../../components/content/FileTree';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const EXAMPLE_SPEC = `/plan

I want to build: a one-page portfolio website for me, Anna, a graphic designer,
so that employers can see my work and who I am.

What a visitor can do:
- Read about me
- Browse my projects as cards
- Click a link to open each project's page (use placeholder links)

Sections (see my attached sketch):
- Navbar: my name on the left, links to About and Projects on the right
- Hero: a headline "Hi, I'm Anna" with a one-sentence description and a "See my work" button
- About: a short paragraph and a photo placeholder
- Projects: 3 cards in a row on desktop, stacked on a phone, each with an image placeholder,
  a title and a short description
- Footer: my name and the year

Style: calm, lots of white space, one accent colour (deep green), easy to read.

This is a frontend-only project: only README.md, docs/, scripts/ and frontend/.
Follow my saved rules and skills (stack, fullstack-architecture, website-design,
react-frontend, system-script). Create scripts/system.sh so that
./scripts/system.sh --start frontend installs and starts everything.
I never run npm myself.

It is done when:
- I run ./scripts/system.sh --start frontend and open http://localhost:5173
- I see every section from my sketch
- It looks good on a narrow (phone-sized) window as well as a wide one

Before you write the plan, ask me about anything that is unclear.`;

export default function Step2_11_ProjectPortfolio() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.11 • Project A"
        title="Project A: Your Portfolio Website"
        summary="Your first real build, using everything so far: a sketch, a spec, a reviewed plan, and a site running on your own machine."
      />

      <p>
        A portfolio is a good first project: it is entirely frontend, it uses the rectangles-in-rectangles idea
        directly, and when it works it is something you can show off. There is no contact form and no database. Those
        come in Project B.
      </p>

      <Callout type="info" title="This project is graded by you">
        There is no hidden checker. When every item on the checklist at the bottom is true, you are done.
      </Callout>

      <Section title="What you will end up with" />
      <FileTree
        title="~/Development/portfolio"
        tree={[
          {
            name: 'portfolio',
            children: [
              { name: 'README.md' },
              { name: '.gitignore' },
              { name: 'docs', children: [{ name: 'README.md' }] },
              { name: 'scripts', children: [{ name: 'README.md' }, { name: 'system.sh' }] },
              {
                name: 'frontend',
                children: [
                  { name: 'README.md' },
                  {
                    name: 'src',
                    children: [
                      {
                        name: 'components',
                        children: [
                          { name: 'Navbar.tsx' },
                          { name: 'Hero.tsx' },
                          { name: 'ProjectCard.tsx' },
                          { name: 'Footer.tsx' },
                        ],
                      },
                      { name: 'App.tsx' },
                      { name: 'main.tsx' },
                      { name: 'index.css' },
                    ],
                  },
                ],
              },
            ],
          },
        ]}
      />
      <p>
        No <code>backend/</code>, <code>data/</code> or <code>tests/</code> yet, because a portfolio does not need them.
        (The AI may add a few more files inside <code>frontend</code>. That is fine as long as they are standard
        Vite files.)
      </p>

      <Section title="Do it" />
      <Steps
        steps={[
          {
            title: 'Make the project folder and open it',
            children: (
              <>
                <TerminalBlock
                  lines={[
                    { path: '~', command: 'mkdir -p ~/Development/portfolio' },
                    { path: '~', command: 'cd ~/Development/portfolio' },
                  ]}
                />
                <p>Then open that folder in Antigravity (File → Open Folder), while connected to <code>WSL: Ubuntu</code>.</p>
              </>
            ),
          },
          {
            title: 'Draw your site on paper',
            children: <p>Rectangles in rectangles, as in step 2.6. Include a navbar, a hero, an about section, a projects section with three cards, and a footer. Photograph it.</p>,
          },
          {
            title: 'Write your spec from the template',
            children: (
              <>
                <p>Use your own name, work, tastes and colour. Here is an example of what a finished spec looks like:</p>
                <Collapsible title="Example spec (do not copy blindly)">
                  <CodeBlock language="markdown" title="Spec" code={EXAMPLE_SPEC} />
                </Collapsible>
              </>
            ),
          },
          {
            title: 'Run /plan, with the sketch attached',
            children: <p>Answer any questions. If it asks for a choice you do not understand, ask it to explain and recommend.</p>,
          },
          {
            title: 'Review the plan properly',
            children: <p>Use the checklist from step 2.10. Leave comments. Repeat until it is right. In particular check that it does <strong>not</strong> tell you to run <code>npm</code>, and that it creates <code>scripts/system.sh</code>.</p>,
          },
          { title: 'Approve, and let it build', children: <p>If it asks to run commands, read them before you allow them, just as with Agy.</p> },
          {
            title: 'Run it',
            children: (
              <TerminalBlock
                lines={[
                  { path: '~/Development/portfolio', command: 'chmod +x scripts/system.sh' },
                  { path: '~/Development/portfolio', command: './scripts/system.sh --start frontend' },
                ]}
              />
            ),
          },
          { title: 'Open the address it prints', children: <p>It will be <code>http://localhost:5173</code>. Open it in your browser on Windows. Mirrored networking from step 1.2 is what makes this just work.</p> },
          {
            title: 'Refine',
            children: <p>Ask for changes in plain words: &quot;Make the hero taller&quot;, &quot;Change the accent colour to navy&quot;. For anything bigger than a tweak, use <code>/plan</code> again and review it.</p>,
          },
          { title: 'Stop it when you are done', children: <TerminalBlock path="~/Development/portfolio" command="./scripts/system.sh --stop frontend" /> },
        ]}
      />

      <Collapsible title="If something goes wrong">
        <ul className="list-disc pl-5 space-y-1">
          <li><code>Permission denied</code>: run <code>chmod +x scripts/system.sh</code>.</li>
          <li>The page will not load: look at <code>logs/frontend.log</code> with <code>tail -n 30 logs/frontend.log</code> and give that to the AI.</li>
          <li>&quot;Port already in use&quot;: run the script with <code>--stop frontend</code> first.</li>
          <li>The AI keeps ignoring a rule: add that rule to your saved rule or skill and tell it to re-read.</li>
        </ul>
      </Collapsible>

      <Section title="Checklist: you are done when" />
      <ul className="list-disc pl-5 space-y-1">
        <li>I drew the site on paper before asking for anything.</li>
        <li>I wrote a spec and ran <code>/plan</code>.</li>
        <li>I read the entire plan and left at least one comment, or can say why none was needed.</li>
        <li>I started the site with <code>./scripts/system.sh --start frontend</code> and I did not type npm.</li>
        <li>I can see every section from my sketch, and it looks fine when the browser window is narrow.</li>
        <li>Every folder that exists has a README.md, and each component is in its own file.</li>
        <li>I stopped it again with <code>--stop</code>.</li>
      </ul>
      <p>
        When all of those are true, press <strong>Mark as Complete</strong> at the bottom of the page.
      </p>

      <KeyTakeaways
        items={[
          'You designed a site as boxes, specified it, planned it, reviewed it and built it.',
          'You started it with one script and never typed npm.',
          'The loop is the same for every project: sketch → spec → /plan → review → build → run.',
        ]}
      />
    </div>
  );
}
