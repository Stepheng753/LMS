import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Compare } from '../../../../components/content/Compare';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const SYSTEM_SKILL_V1 = `---
name: system-script
description: How to write scripts/system.sh, the single script that installs, starts, stops and restarts a project so the user never types npm, pip or python. Use whenever a project must be run, started, stopped or installed.
---
# scripts/system.sh

The user NEVER types npm, pip, python, uvicorn or pytest. Everything goes through scripts/system.sh.

## Usage
./scripts/system.sh <--start|--restart|--stop> <frontend|all>
(For now "all" is the same as "frontend". Backend options are added later.)

## Behaviour
- Bash script with set -e. Make it executable (chmod +x scripts/system.sh).
- Work out the project root from the script's own location so it runs correctly from any folder.
- On first start, install what is missing without being asked: if frontend/node_modules does not exist, run npm install inside frontend/.
- Start the Vite dev server on port 5173 in the background, writing output to logs/frontend.log.
- Find running processes by their port using lsof. Do NOT create or read .pid files.
- --stop ends whatever is listening on the project's port. --restart is stop followed by start.
- After starting, wait until the port answers, then print the URL (http://localhost:5173).
- Print coloured, plain-language messages: [INFO], [SUCCESS], [WARN], [ERROR].
- For a missing or unknown argument, print the usage text and exit with an error.
- Add logs/ to .gitignore.
- Add scripts/README.md explaining each flag.`;

export default function Step2_8_SystemScript() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.8 • Spec-Driven Engineering"
        title="One Script To Run Everything"
        summary="Why you will never need to memorise npm, pip or python commands, and what to ask your AI for instead."
      />

      <p>
        Running a project involves a pile of small commands: install the libraries, start the server, find the port,
        stop it again. They are different for the frontend and the backend, and easy to forget. So we do not remember
        them. We ask the AI to put them all inside <strong>one script</strong>, and we only ever remember the script.
      </p>

      <Compare
        goodLabel="What you will do"
        badLabel="What you won't"
        good={<TerminalBlock path="~/Development/portfolio" command="./scripts/system.sh --start frontend" />}
        bad={
          <>
            <TerminalBlock path="~/Development/portfolio/frontend" command="npm install" />
            <TerminalBlock path="~/Development/portfolio/frontend" command="npm run dev -- --port 5173" />
          </>
        }
      />

      <Section title="How you use it" />
      <p>
        The script lives at <code>scripts/system.sh</code>. You run it from the project&apos;s root folder, with a
        flag that says <em>what to do</em> and a word that says <em>to what</em>.
      </p>
      <CommandTable
        title="system.sh, round 1 (frontend only)"
        rows={[
          { command: './scripts/system.sh --start frontend', description: 'Install what is missing, then start the website' },
          { command: './scripts/system.sh --stop frontend', description: 'Stop the website' },
          { command: './scripts/system.sh --restart frontend', description: 'Stop, then start again' },
          { command: './scripts/system.sh --start all', description: 'Start everything. For now the same as frontend' },
        ]}
      />
      <TerminalBlock
        lines={[
          {
            path: '~/Development/portfolio',
            command: './scripts/system.sh --start frontend',
            output: `[INFO] Installing frontend libraries (first run only)...
[INFO] Starting frontend on port 5173...
[SUCCESS] Frontend is running: http://localhost:5173`,
          },
          {
            path: '~/Development/portfolio',
            command: './scripts/system.sh --stop frontend',
            output: '[SUCCESS] Stopped frontend (port 5173)',
          },
        ]}
      />

      <Section title="Reading the command" />
      <Table
        headers={['Piece', 'Meaning']}
        rows={[
          [<code key="a">./</code>, 'Run a file from the current folder (the dot means "here")'],
          [<code key="b">scripts/system.sh</code>, 'The path to the script, from the project root'],
          [<code key="c">--start</code>, 'The action: a flag, like -l in ls -l'],
          [<code key="d">frontend</code>, 'The target: what to start'],
        ]}
      />
      <Callout type="warning" title="If you see &quot;Permission denied&quot;">
        A new script is not allowed to run until you give it permission. The fix is a command you may have seen:{' '}
        <code>chmod +x scripts/system.sh</code>. <code>chmod</code> changes permissions, and <code>+x</code> means
        &quot;allow executing&quot;. The plan should already include this step. If it did not, that is something to
        comment on in the review.
      </Callout>

      <Section title="What the script does for you" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Installs on first run.</strong> If the libraries are missing, it fetches them.</li>
        <li><strong>Finds processes by port.</strong> A port is a numbered door on your computer. Port 5173 is where the website listens. To stop it, the script finds what is using that door. No files to keep track of.</li>
        <li><strong>Keeps a log.</strong> Everything the server prints goes to <code>logs/frontend.log</code>. When something breaks, the log is where the clues are.</li>
        <li><strong>Gives clear messages.</strong> Coloured <code>[INFO]</code>, <code>[SUCCESS]</code>, <code>[ERROR]</code> lines in plain language.</li>
      </ul>

      <Callout type="tip" title="This script grows">
        Right now it only handles the frontend. When we reach the backend in step 2.12, you will take it back to your AI
        and add the backend and the test commands, and then you will update the skill below.
      </Callout>

      <TeachAI kind="skill" name="system-script" text={SYSTEM_SKILL_V1} />

      <QuizSet>
        <Quiz
          question="What is the point of scripts/system.sh?"
          options={[
            'To make the project look bigger',
            'So you never need to remember npm, pip or python commands',
            'To hold the database',
            'To store passwords',
          ]}
          correctIndex={1}
          explanation="The script wraps every command, and you only remember the script."
        />
        <Quiz
          question="Running ./scripts/system.sh gives 'Permission denied'. What is the fix?"
          options={['Reinstall Linux', 'chmod +x scripts/system.sh', 'rm scripts/system.sh', 'sudo apt update']}
          correctIndex={1}
          explanation="The file needs the executable permission."
        />
        <Quiz
          question="Where does the frontend's output go so you can investigate errors?"
          options={['logs/frontend.log', 'data/', 'docs/', 'It is lost']}
          correctIndex={0}
          explanation="The script saves output in a log file under logs/."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'You remember one script, not a collection of npm, pip and python commands.',
          './scripts/system.sh --start|--stop|--restart frontend, run from the project root.',
          'The script installs on first run, finds processes by port, writes logs and prints clear messages.',
          'chmod +x makes a script runnable.',
          'You will extend this script with the backend and tests in step 2.12.',
        ]}
      />
    </div>
  );
}
