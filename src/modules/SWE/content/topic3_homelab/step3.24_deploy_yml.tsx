import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CICD_SKILL, DEPLOY_YML } from '../topic_toolkit/tools/tools_homelab';

const CICD_PROMPT = `/plan

Add a GitHub Actions pipeline to this project in .github/workflows/deploy.yml.

Trigger: every push to main.

Job 1, test: check out the code and run ./scripts/system.sh --test unit.
Job 2, deploy (only if the tests pass):
- join my Tailscale network with tailscale/github-action, using the secrets
  TS_OAUTH_CLIENT_ID and TS_OAUTH_SECRET and the tag tag:ci
- set up SSH using the secret HOMELAB_SSH_KEY
- ssh to HOMELAB_USER@HOMELAB_HOST, cd ~/apps/taskapp, run
  git pull origin main and docker compose up -d --build

Rules: follow my saved rules and skills, especially ci-cd-deploy.
Never put a secret in the file and never print one. Use the current major
version of each action. Unit tests must not need secrets.json.

It is done when: pushing a change to main runs the tests, and if they pass my
live app shows the change.

Before you write the plan, ask me about anything that is unclear.`;

export default function Step3_24_DeployYml() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.24 • Pipelines"
        title="The Pipeline: deploy.yml"
        summary="Read the workflow file, have the AI write yours, and watch your first automatic deployment."
      />

      <p>
        A workflow is a file written in <strong>YAML</strong>, a simple format of indented lists and labels, a bit like the
        JSON config you already know. You will not write it, but you must be able to read it, because it holds the keys to
        your server.
      </p>

      <Section title="1. Ask for it" />
      <CodeBlock language="markdown" title="Spec: pipeline" code={CICD_PROMPT} />

      <Section title="2. Read what comes back" />
      <CodeBlock language="yaml" title=".github/workflows/deploy.yml" code={DEPLOY_YML} />
      <Table
        headers={['Part', 'Meaning']}
        rows={[
          [<code key="a">on: push: branches: [main]</code>, 'Run this whenever something is pushed to main'],
          [<code key="b">jobs: test</code>, 'The first job: check out the code and run the unit tests through your script'],
          [<code key="c">needs: test</code>, 'The deploy job waits for tests, and does not run if they fail'],
          [<code key="d">runs-on: ubuntu-latest</code>, 'Which kind of temporary computer GitHub starts'],
          [<code key="e">uses: actions/checkout</code>, 'A ready-made step: download your repository onto the runner'],
          [<code key="f">uses: tailscale/github-action</code>, 'A ready-made step: join your private network as tag:ci'],
          [<code key="g">secrets.NAME</code>, 'Reads a value from GitHub\'s encrypted secrets (the expression is wrapped in dollar-sign double braces)'],
          [<code key="h">ssh-keyscan</code>, 'Records the server\'s fingerprint so the first connection does not stop to ask "do you trust this?"'],
          [<code key="i">ssh user@host "…"</code>, 'Runs the deploy commands on the server: pull, then rebuild and restart'],
        ]}
      />
      <Callout type="warning" title="Check these before approving">
        <ul className="list-disc pl-5 space-y-1">
          <li>Every credential comes from <code>secrets.</code>. There is no literal key or password anywhere.</li>
          <li>Nothing echoes or prints a secret.</li>
          <li>The deploy job has <code>needs: test</code>.</li>
          <li>The server folder (<code>~/apps/taskapp</code>) matches where you cloned it in step 3.14.</li>
          <li>It does <strong>not</strong> open any router port or use an unrelated third-party deploy action.</li>
          <li>The test job runs <code>./scripts/system.sh --test unit</code>, so tests need no secrets.</li>
        </ul>
      </Callout>
      <Callout type="info" title="Versions move">
        Names such as <code>actions/checkout@v4</code> and <code>tailscale/github-action@v4</code> are version tags. New
        major versions appear regularly. Your <code>ci-cd-deploy</code> skill says to use the current major versions.
        If a version is out of date, the workflow normally still runs, and GitHub warns you in the log.
      </Callout>

      <Section title="3. Ship it" />
      <Steps
        steps={[
          { title: 'Approve the plan and let the AI create the file', children: <p>Then check that <code>.github/workflows/deploy.yml</code> exists.</p> },
          {
            title: 'Make a visible change',
            children: <p>For example, change a heading in your frontend, so you will know when it is live.</p>,
          },
          {
            title: 'Commit and push',
            children: (
              <TerminalBlock
                path="~/Development/taskapp"
                lines={[
                  { command: 'ga . && gc "Add deploy pipeline and new heading"' },
                  { command: 'git push origin main' },
                ]}
              />
            ),
          },
          { title: 'Watch it run', children: <p>On GitHub, open your repository&apos;s <strong>Actions</strong> tab. Click the newest run. You will see the <em>test</em> job, then the <em>deploy</em> job, each with a live log. Green ticks mean success.</p> },
          { title: 'Reload your site', children: <p>Open <code>https://app.example.com</code>. The new heading should be there. You did not log in to the server at all.</p> },
        ]}
      />
      <Callout type="success" title="Success looks like this">
        Two green ticks in the Actions tab, and your change live on your own domain, minutes after a single{' '}
        <code>git push</code>.
      </Callout>

      <Section title="When it fails" />
      <Table
        headers={['What you see', 'Probably', 'What to do']}
        rows={[
          ['The test job is red', 'A test failed, or a test needs a file that git does not have', 'Open the log, find the first error. Nothing was deployed. Fix and push again'],
          ['Join the tailnet step fails', 'Wrong OAuth secrets, or tag:ci is not defined in the Tailscale policy', 'Re-check both secrets and the policy'],
          ['SSH: Permission denied (publickey)', 'The key secret is incomplete, or its public half is not on the server', 'Re-paste the whole private key. Check authorized_keys'],
          ['SSH: connection timed out', 'Wrong HOMELAB_HOST, or the server is off / not on Tailscale', 'Check tailscale status on the server'],
          ['git pull fails on the server', 'The server\'s deploy key was not added to GitHub', 'Repeat the deploy-key part of step 3.14'],
          ['The deploy is green but the site did not change', 'The build was cached, or the wrong folder was updated', 'Run docker compose ps on the server, and read docker compose logs'],
        ]}
      />
      <Callout type="tip" title="Rolling back">
        If a bad change goes live, undo it as a new commit: <code>git revert HEAD --no-edit</code>, then{' '}
        <code>git push origin main</code>. The pipeline deploys the reverted version, and your history stays a
        straight line.
      </Callout>

      <TeachAI kind="skill" name="ci-cd-deploy" text={CICD_SKILL} />

      <Collapsible title="Good to know">
        <ul className="list-disc pl-5 space-y-1">
          <li>Runs are free for private repositories up to a monthly allowance, which is plenty for a personal project.</li>
          <li>Secrets are not exposed to workflows triggered by outside contributors&apos; code, which is another reason to keep the repository private.</li>
          <li>Your homelab pipeline can later run more than tests: linting, building, checking dependencies.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="What does needs: test do?"
          options={['Runs tests twice', 'Makes the deploy job wait for the test job and skip if it fails', 'Needs a test server', 'Skips tests']}
          correctIndex={1}
          explanation="needs creates a dependency. A failed test stops deployment."
        />
        <Quiz
          question="Your workflow needs a password. Where does it come from?"
          options={['Written in deploy.yml', 'secrets.NAME, stored in GitHub', 'The README', 'A comment']}
          correctIndex={1}
          explanation="The file is in the repository, so it can only reference secrets."
        />
        <Quiz
          question="A bad change is live. What is the cleanest way back?"
          options={['Delete the repository', 'git revert HEAD, then push so the pipeline deploys the previous state', 'Edit files inside the container', 'Reinstall Ubuntu']}
          correctIndex={1}
          explanation="Revert creates a new commit that undoes the change, and the pipeline does the rest."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'deploy.yml: on push to main → test job → (if green) deploy job over Tailscale and SSH.',
          'Read every workflow before approving: all credentials must come from secrets.',
          'Actions tab: green ticks mean the change is live. Red shows which step failed.',
          'Roll back with git revert HEAD and a push.',
        ]}
      />
    </div>
  );
}
