import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { Compare } from '../../../../components/content/Compare';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { GITIGNORE_TEMPLATE, GIT_WORKFLOW_SKILL } from '../../toolkit/tools_homelab';

export default function Step3_4_Git() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.4 • Git"
        title="Git: A Save Button With Memory"
        summary="Keep a history of every version of your project, and decide what must never be saved."
      />

      <p>
        <strong>Git</strong> records snapshots of your project. Each snapshot is a <strong>commit</strong>: a saved
        moment, with a short message. You can see every past version, compare them, and go back. It is also how code
        travels to GitHub and, later in this topic, to your server.
      </p>
      <p>
        You have had three shortcuts waiting in your <code>.bash_aliases</code> since step 1.10. Now they finally mean
        something:
      </p>
      <CommandTable
        title="Your git aliases"
        rows={[
          { command: 'gs', description: 'git status: what has changed?', example: 'gs' },
          { command: 'ga', description: 'git add: choose what goes in the next snapshot', example: 'ga .' },
          { command: 'gc "message"', description: 'git commit -m: take the snapshot', example: 'gc "Add task list"' },
        ]}
      />

      <Section title="The save cycle" />
      <Steps
        steps={[
          { title: 'Change files', children: <p>Work as usual, or let the AI build something.</p> },
          { title: 'Look: gs', children: <p>Shows which files changed and which are new.</p> },
          { title: 'Choose: ga .', children: <p>Stages the changes. The dot means &quot;everything here&quot;. Git only saves what you have staged.</p> },
          { title: 'Save: gc "what I did"', children: <p>Creates the commit. A good message says what changed, in a few words: &quot;Add delete button&quot;.</p> },
        ]}
      />

      <Section title="One-time setup" />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'sudo apt install -y git' },
          { command: 'git config --global user.name "Your Name"' },
          { command: 'git config --global user.email "you@example.com"' },
        ]}
      />
      <p>
        Git stamps each commit with your name and email. (Use the same email as your GitHub account in the next step.)
      </p>

      <Section title="Start a repository" />
      <TerminalBlock
        lines={[
          { path: '~/Development', command: 'mkdir git-playground && cd git-playground' },
          { path: '~/Development/git-playground', command: 'git init -b main', output: 'Initialized empty Git repository in /home/anna/Development/git-playground/.git/' },
        ]}
      />
      <p>
        <code>git init</code> turns a folder into a <strong>repository</strong> by adding a hidden <code>.git</code>{' '}
        folder that holds the history. <code>-b main</code> names the branch <code>main</code>. We only ever use this one
        branch, so your history is a straight line, one commit after another.
      </p>

      <Section title="What must never be saved: .gitignore" />
      <p>
        Some files must <strong>never</strong> go into git, and certainly never onto GitHub. A file called{' '}
        <code>.gitignore</code> lists them.
      </p>
      <Table
        headers={['Ignored', 'Why']}
        rows={[
          [<code key="a">.venv/</code>, 'Python libraries. Huge, and rebuilt by the script'],
          [<code key="b">node_modules/</code>, 'JavaScript libraries. Huge, and rebuilt by the script'],
          [<code key="c">data/*.db</code>, 'Your real database. It holds real data, and each machine keeps its own'],
          [<code key="d">backend/config/secrets.json</code>, 'Passwords and keys. The most important line in the file'],
          [<code key="e">logs/</code>, 'Noise'],
        ]}
      />
      <CodeBlock language="bash" title=".gitignore" code={GITIGNORE_TEMPLATE} />
      <Callout type="success" title="Create it yourself, with nano">
        <code>nano .gitignore</code>, paste, <code>Ctrl+O</code>, <code>Enter</code>, <code>Ctrl+X</code>. Always create
        <code> .gitignore</code> <em>before</em> your first commit.
      </Callout>

      <Callout type="warning" title="A secret that is committed is a secret that is public forever">
        Git remembers every version. If you commit <code>secrets.json</code> by mistake and delete it in the next
        commit, the secret is still in the history. Once on GitHub, treat it as leaked: change the password or key, do
        not just delete the file. This is why <code>.gitignore</code> comes first.
      </Callout>

      <Section title="Your first two commits" />
      <TerminalBlock
        lines={[
          { path: '~/Development/git-playground', command: 'echo "# My playground" > README.md' },
          { path: '~/Development/git-playground', command: 'gs', output: 'Untracked files:\n  .gitignore\n  README.md' },
          { path: '~/Development/git-playground', command: 'ga .' },
          { path: '~/Development/git-playground', command: 'gc "Start the playground"', output: '[main (root-commit) 3f9a1c2] Start the playground\n 2 files changed' },
          { path: '~/Development/git-playground', command: 'echo "Notes go here" >> README.md' },
          { path: '~/Development/git-playground', command: 'ga . && gc "Add a notes line"' },
          { path: '~/Development/git-playground', command: 'git log --oneline', output: 'a81c0de Add a notes line\n3f9a1c2 Start the playground' },
        ]}
      />
      <CommandTable
        title="Looking around"
        rows={[
          { command: 'git log --oneline', description: 'The list of commits, newest first' },
          { command: 'git diff', description: 'Exactly what changed since the last commit' },
          { command: 'git ls-files', description: 'Every file git is tracking. Check that secrets.json is NOT in it' },
        ]}
      />

      <Compare
        goodLabel="Good commits"
        badLabel="Bad commits"
        good={<p><code>gc &quot;Add delete button to task card&quot;</code>. Small, with a message saying what changed.</p>}
        bad={<p><code>gc &quot;stuff&quot;</code> after three days of changes. You cannot find anything later.</p>}
      />

      <Exercise
        title="Practice in your playground"
        hint={<p>Remember the cycle: change, <code>gs</code>, <code>ga .</code>, <code>gc &quot;...&quot;</code>.</p>}
        solution={
          <TerminalBlock
            lines={[
              { path: '~/Development/git-playground', command: 'echo "secret" > backend-secrets.json' },
              { path: '~/Development/git-playground', command: 'echo "backend-secrets.json" >> .gitignore' },
              { path: '~/Development/git-playground', command: 'gs', output: '(backend-secrets.json is not listed)' },
            ]}
          />
        }
      >
        <p>
          Make a file called <code>backend-secrets.json</code>, add its name to <code>.gitignore</code>, and prove with{' '}
          <code>gs</code> that git no longer sees it. Then commit your <code>.gitignore</code> change.
        </p>
      </Exercise>

      <Callout type="info" title="Letting AI use git">
        When your AI helper works on a project it may want to commit. The skill below makes it propose a message and
        wait for you, never push on its own, and never commit secrets.
      </Callout>

      <TeachAI kind="skill" name="git-workflow" text={GIT_WORKFLOW_SKILL} />

      <QuizSet>
        <Quiz
          question="What does ga . do?"
          options={['Saves the snapshot', 'Stages all the changes here for the next snapshot', 'Uploads to GitHub', 'Deletes files']}
          correctIndex={1}
          explanation="ga is git add. It chooses what goes into the next commit."
        />
        <Quiz
          question="You committed secrets.json by accident and then deleted it. Is it safe now?"
          options={['Yes', 'No: it is still in the history, so change the secret', 'Only if the repository is private', 'Only on weekends']}
          correctIndex={1}
          explanation="Git remembers every version. A committed secret must be treated as exposed and replaced."
        />
        <Quiz
          question="When do you create .gitignore?"
          options={['After pushing', 'Before the first commit', 'Never', 'Only for Python projects']}
          correctIndex={1}
          explanation="If a secret never gets committed, you never have to clean up."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A commit is a saved snapshot with a message. The cycle: gs, ga ., gc "message".',
          'git init -b main starts a repository. We use one branch, main, in a straight line.',
          '.gitignore keeps .venv/, node_modules/, data/*.db and secrets.json out of git. Create it first.',
          'A committed secret stays in history, so replace it.',
        ]}
      />
    </div>
  );
}
