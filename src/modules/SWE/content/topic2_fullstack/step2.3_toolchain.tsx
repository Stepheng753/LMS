import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Steps } from '../../../../components/content/Steps';
import { Table } from '../../../../components/content/Table';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_3_Toolchain() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.3 • Full Stack Design"
        title="Install the Toolchain"
        summary="Put Python, Node and a database viewer on your machine, once, so every project can use them."
      />

      <p>
        Building the stack needs four things on your machine. You install them once, and then you should almost never
        have to type a command for them again, because in step 2.8 you will have scripts that do it for you.
      </p>

      <Table
        headers={['Tool', 'What it is for']}
        rows={[
          ['Python 3 + venv', 'Runs the backend. venv makes a private box of libraries for each project'],
          ['Node + npm', 'Runs the frontend tools (Vite, React, Tailwind)'],
          ['sqlite3', 'The command-line side of the database, handy for checking things'],
          ['lsof', 'Lets our scripts find which program is using a port'],
        ]}
      />

      <Section title="1. Ask Agy to install them" />
      <p>
        This is exactly what Agy is for. Start it and paste this request:
      </p>
      <CodeBlock
        language="markdown"
        title="Prompt for Agy"
        code={`Please set up this Ubuntu (WSL) machine for a Python + Node full-stack project.
Install: python3, python3-venv, python3-pip, sqlite3, lsof.
Install the current LTS version of Node.js using nvm (not the apt version, which is too old).
Then show me the version of each tool so I can confirm it worked.
Explain each command before running it.`}
      />
      <Callout type="warning" title="Read before you approve">
        Agy will propose commands, including some with <code>sudo</code>. Read each one. You should recognise{' '}
        <code>sudo apt update</code> and <code>sudo apt install</code> from step 1.9.
      </Callout>

      <Section title="2. Check everything is there" />
      <TerminalBlock
        lines={[
          { path: '~', command: 'python3 --version', output: 'Python 3.12.3' },
          { path: '~', command: 'node --version', output: 'v22.11.0' },
          { path: '~', command: 'npm --version', output: '10.9.0' },
          { path: '~', command: 'sqlite3 --version', output: '3.45.1 2024-01-30 ...' },
        ]}
      />
      <p>
        Your numbers will differ. What matters is that each command prints a version instead of{' '}
        <code>command not found</code>. Python needs to be 3.10 or newer and Node 20 or newer.
      </p>

      <Collapsible title="Why not just apt install nodejs?">
        <p>
          Ubuntu&apos;s own Node package is often several versions behind, and modern tools like Vite refuse to run on
          it. <code>nvm</code> (Node Version Manager) installs the current one into your home folder without touching
          the system. If Agy proposes something different and you are unsure, ask it why.
        </p>
      </Collapsible>

      <Section title="3. The SQLite viewer" />
      <p>
        Databases are files you cannot open in a text editor. A viewer extension in your IDE shows tables as a
        spreadsheet-style grid, so you can see exactly what your app stored.
      </p>
      <Steps
        steps={[
          {
            title: 'Open the Extensions panel',
            children: <p>Press <code>Ctrl+Shift+X</code>, or click the square-blocks icon on the left.</p>,
          },
          {
            title: 'Search for the extension',
            children: (
              <>
                <p>Search for <code>alexcvzz.vscode-sqlite</code> (named <strong>SQLite</strong>, by alexcvzz) and click Install.</p>
                <p>If your window says you are connected to <code>WSL: Ubuntu</code>, choose the option to install it <em>in WSL: Ubuntu</em> too.</p>
              </>
            ),
          },
          {
            title: 'Open a database (you will do this in step 2.12)',
            children: (
              <>
                <p>Press <code>Ctrl+Shift+P</code>, type <code>SQLite: Open Database</code> and choose your <code>.db</code> file from <code>data/</code>.</p>
                <p>A <strong>SQLite Explorer</strong> section appears in the sidebar listing the tables.</p>
              </>
            ),
          },
          {
            title: 'Look at a table',
            children: <p>Right-click a table and choose <strong>Show Table</strong>. It opens as a grid of rows and columns. That is all you need.</p>,
          },
        ]}
      />
      <Callout type="info" title="Can't find it?">
        Antigravity&apos;s extension store is not the same as the one in other editors, so a search can come up empty.
        If so, ask Agy or your AI helper how to install <code>alexcvzz.vscode-sqlite</code> in Antigravity. A manual
        install from a file is the usual fallback.
      </Callout>

      <Quiz
        question="Why do we install Node with nvm instead of apt?"
        options={[
          'apt cannot install anything',
          'The apt version is usually too old for modern tools',
          'nvm is faster',
          'It is required by Linux',
        ]}
        correctIndex={1}
        explanation="Ubuntu's packaged Node lags behind. Vite and friends need a recent one."
      />

      <KeyTakeaways
        items={[
          'Install Python + venv, Node + npm, sqlite3 and lsof once. Ask Agy to do it and read each command.',
          'Verify with --version commands.',
          'The SQLite viewer extension shows database tables as a grid: right-click a table → Show Table.',
          'You will not need to remember install commands for the projects. Scripts will do that.',
        ]}
      />
    </div>
  );
}
