import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const Box = ({ title, sub }: { title: string; sub: string }) => (
  <div className="flex-1 min-w-[7.5rem] rounded-lg border border-border bg-card p-2.5 text-center">
    <p className="font-semibold text-foreground text-sm !my-0">{title}</p>
    <p className="text-[0.7rem] text-muted-foreground mt-0.5 !my-0">{sub}</p>
  </div>
);
const Join = ({ label }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center text-primary px-0.5 font-semibold text-[0.65rem]">
    {label && <span>{label}</span>}
    <span>→</span>
  </div>
);

const TAG_POLICY = `{
  "tagOwners": {
    "tag:ci": ["autogroup:admin"]
  }
}`;

export default function Step3_23_CicdSecrets() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.23 • Pipelines"
        title="CI/CD and Secrets"
        summary="Make every push to main test your app and deploy it to the homelab by itself, and give the pipeline its keys without ever putting them in code."
      />

      <p>
        Right now, updating your live app means: <code>ssh homelab</code>, <code>git pull</code>,{' '}
        <code>docker compose up -d --build</code>. Do that once and it is fine. Do it twenty times and you will forget a
        step. A <strong>pipeline</strong> does it for you, the same way every time, and only if your tests pass.
      </p>
      <Table
        headers={['Term', 'Meaning']}
        rows={[
          [<strong key="a">CI</strong>, <span key="a2"><Term definition="Continuous Integration: automatically building and testing every change as soon as it is pushed.">Continuous Integration</Term>: every push is automatically tested</span>],
          [<strong key="b">CD</strong>, <span key="b2"><Term definition="Continuous Deployment: automatically releasing every change that passes its tests.">Continuous Deployment</Term>: a change that passes is automatically shipped</span>],
          [<strong key="c">GitHub Actions</strong>, 'GitHub\'s built-in system for running pipelines, defined by a file in .github/workflows/'],
          [<strong key="d">Runner</strong>, 'A temporary computer that GitHub starts to run your steps, then throws away'],
        ]}
      />

      <div className="my-5 flex flex-wrap items-stretch gap-1">
        <Box title="You push" sub="git push origin main" />
        <Join />
        <Box title="GitHub runner" sub="runs your tests" />
        <Join label="pass" />
        <Box title="Tailscale" sub="runner joins your private network" />
        <Join />
        <Box title="SSH" sub="into your server" />
        <Join />
        <Box title="Server" sub="pull, rebuild, restart" />
      </div>

      <Section title="The puzzle: how does GitHub reach your home?" />
      <p>
        The runner lives on the public internet. Your server hides in a private network. There are three ways to bridge
        that:
      </p>
      <Table
        headers={['Option', 'How', 'Verdict']}
        rows={[
          ['Open an SSH port in the router', 'The runner connects straight to your home', 'Works, but exposes SSH to the whole internet'],
          [<strong key="t">Join the runner to your tailnet</strong>, 'The runner temporarily becomes one of your Tailscale devices, then connects privately', <strong key="v">Our choice. No open ports</strong>],
          ['Run a runner on your server', 'The server reaches out to GitHub instead', 'Also fine, but more to maintain'],
        ]}
      />
      <p>
        Tailscale provides an official GitHub Action for exactly this. The runner joins as a short-lived device tagged{' '}
        <code>tag:ci</code>, does its job, and disappears.
      </p>

      <Section title="Secrets: how the pipeline gets its keys" />
      <p>
        The workflow file lives in your repository, which is why it can never contain a password or a key. Instead,
        GitHub offers <strong>repository secrets</strong>: values stored encrypted in GitHub, that your workflow can use
        but nobody (not even you) can read back.
      </p>
      <Table
        headers={['Secret name', 'Holds']}
        rows={[
          [<code key="a">HOMELAB_HOST</code>, 'The server\'s Tailscale name or its 100.x address'],
          [<code key="b">HOMELAB_USER</code>, 'Your server username'],
          [<code key="c">HOMELAB_SSH_KEY</code>, 'The private key of a dedicated deploy key'],
          [<code key="d">TS_OAUTH_CLIENT_ID</code>, 'Tailscale OAuth client ID'],
          [<code key="e">TS_OAUTH_SECRET</code>, 'Tailscale OAuth client secret'],
        ]}
      />

      <Section title="1. A deploy key just for the pipeline" />
      <p>
        Do <strong>not</strong> give GitHub your personal private key. Make a separate pair that exists only for
        deployments. If it ever leaks, you delete one line on the server and nothing else is affected.
      </p>
      <TerminalBlock
        path="~"
        lines={[
          { command: 'ssh-keygen -t ed25519 -f ~/.ssh/homelab_deploy -N "" -C "github-actions"' },
          { command: 'ssh-copy-id -i ~/.ssh/homelab_deploy.pub homelab', output: 'Number of key(s) added: 1' },
          { command: 'ssh -i ~/.ssh/homelab_deploy homelab "echo deploy key works"', output: 'deploy key works' },
        ]}
      />
      <p>
        <code>-N &quot;&quot;</code> means no passphrase, because a pipeline cannot type one. That is acceptable only
        because this key does one job and is easy to revoke.
      </p>

      <Section title="2. A Tailscale identity for the runner" />
      <Steps
        steps={[
          {
            title: 'Define the tag in your Tailscale access policy',
            children: (
              <>
                <p>In the Tailscale admin console open <em>Access controls</em> and <strong>add</strong> the following to your existing policy (do not replace the whole file; ask your AI helper to merge if unsure):</p>
                <CodeBlock language="json" title="Tailscale access policy (add this)" code={TAG_POLICY} />
              </>
            ),
          },
          {
            title: 'Create an OAuth client',
            children: <p>In the admin console, find <em>Settings → Trust credentials</em> (it may be labelled OAuth clients), choose <em>Credential → OAuth</em>. Give it the <strong>auth_keys (write)</strong> scope and select the tag <code>tag:ci</code>. Menu names change over time, so ask your AI helper if you cannot find it.</p>,
          },
          {
            title: 'Copy the Client ID and the Secret',
            children: <p>The secret is shown <strong>once</strong>. Keep that page open until you have saved both in the next section.</p>,
          },
        ]}
      />

      <Section title="3. Store everything as GitHub secrets" />
      <Steps
        steps={[
          { title: 'Open your repository on GitHub', children: <p>Go to <em>Settings → Secrets and variables → Actions → New repository secret</em>.</p> },
          { title: 'Add HOMELAB_HOST and HOMELAB_USER', children: <p>The server&apos;s Tailscale name (or <code>100.x</code> address) and your username on it.</p> },
          {
            title: 'Add HOMELAB_SSH_KEY',
            children: (
              <>
                <TerminalBlock path="~" command="cat ~/.ssh/homelab_deploy" output={'-----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY-----'} />
                <p>Copy <strong>everything</strong>, including the BEGIN and END lines, into the secret&apos;s value.</p>
              </>
            ),
          },
          { title: 'Add TS_OAUTH_CLIENT_ID and TS_OAUTH_SECRET', children: <p>From the Tailscale step above.</p> },
        ]}
      />
      <Callout type="warning" title="Rules for secrets">
        <ul className="list-disc pl-5 space-y-1">
          <li>Secrets are write-only in GitHub. If you lose one, create a new one.</li>
          <li>Never paste a secret into a chat, a lesson file, a commit or a log.</li>
          <li>The workflow can use secrets, but must never print them.</li>
          <li>If one leaks: delete it from GitHub and revoke it at the source (remove the public key line from <code>~/.ssh/authorized_keys</code> on the server, or delete the OAuth client).</li>
        </ul>
      </Callout>

      <Collapsible title="Optional: limit what the pipeline can reach">
        <p>
          By default a new Tailscale tag can reach anything on your tailnet. For a tighter setup, tag the server too, then
          write an access rule that lets only <code>tag:ci</code> reach the server on port 22. Ask your AI helper to
          write the policy and explain each line before you apply it.
        </p>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Why use a dedicated deploy key instead of your personal SSH key?"
          options={['It is faster', 'If it leaks you revoke one key and nothing else is affected', 'GitHub requires it', 'Personal keys cannot be copied']}
          correctIndex={1}
          explanation="Limiting each key to one job limits the damage if it is ever exposed."
        />
        <Quiz
          question="Why does the workflow join Tailscale?"
          options={['To get faster builds', "So the GitHub runner can privately reach your server without open router ports", 'To store secrets', 'To run tests']}
          correctIndex={1}
          explanation="The runner becomes a temporary device on your private network."
        />
        <Quiz
          question="Where may the private key live?"
          options={['In the workflow file', 'In a GitHub secret only', 'In the README', 'In docker-compose.yml']}
          correctIndex={1}
          explanation="The workflow file is part of the repository, so it can never contain secrets."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'CI tests every push, CD deploys whatever passes. GitHub Actions runs both from a file in .github/workflows/.',
          'The GitHub runner reaches a private homelab by joining your Tailscale network as a short-lived tag:ci device.',
          'Secrets live in GitHub (encrypted, write-only), never in files.',
          'Use a dedicated deploy key you can revoke, never your personal key.',
        ]}
      />
    </div>
  );
}
