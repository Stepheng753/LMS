import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet, MultiSelectQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_12_Safety() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Safety"
        title="The Safety Playbook"
        summary="Every safety rule from the course in one place, plus step-by-step runbooks for when something goes wrong."
      />

      <Callout type="warning" title="The mindset">
        Assume that one day a key leaks, a script misbehaves, an agent does something you did not intend, or a bill
        surprises you. Safety is not about being perfect. It is about <strong>limiting the damage and recovering fast</strong>.
      </Callout>

      <Section title="The rules, by area" />
      <Table
        headers={['Area', 'Always', 'Never']}
        rows={[
          [<strong key="a">Secrets</strong>, 'Keep them in git-ignored JSON, used only by the backend', 'Commit them, paste them in chats, put them in the frontend'],
          [<strong key="b">Git</strong>, 'Check staged files before every commit', 'git add . without looking at git status'],
          [<strong key="c">Server</strong>, 'Key-only SSH, ufw on (ssh allowed first), Tailscale for access', 'Open SSH or a database to the public internet'],
          [<strong key="d">Docker</strong>, 'Bind published ports to 127.0.0.1', 'Publish a port as 0.0.0.0 unless the whole world should reach it'],
          [<strong key="e">nginx</strong>, 'nginx -t before reload', 'Reload an untested config'],
          [<strong key="f">Backups</strong>, 'Three copies, test a restore', 'Trust a backup you never restored'],
          [<strong key="g">AI cost</strong>, 'Provider limits and an app cap, cheapest model while building', 'Run an uncapped loop'],
          [<strong key="h">Posting</strong>, 'Draft, human approves, then post', 'Auto-post untested output to real audiences'],
          [<strong key="i">Agents</strong>, 'Least privilege, manual approval, allowlist, logs, kill switch', 'Run one as admin or on your main account'],
          [<strong key="j">Pasted commands</strong>, 'Read them, ask your AI to explain them', 'Run a script you do not understand with sudo'],
        ]}
      />

      <Section title="Runbook 1: a secret was committed or pasted" />
      <Steps
        steps={[
          { title: 'Revoke it first', children: <p>Go to the provider (Google, OpenAI, Anthropic, GitHub, Cloudflare, Blotato) and delete or rotate the key. Everything else is secondary. Once public, assume it is already copied.</p> },
          { title: 'Create a new one', children: <p>Put it in <code>backend/config/secrets.json</code> (or the right file). Confirm the file is in <code>.gitignore</code>.</p> },
          { title: 'Check usage', children: <p>Look at the provider's usage page for calls you did not make. Contact their support if there is a bill to dispute.</p> },
          { title: 'Clean the repo', children: <p>Remove the file from tracking with <code>git rm --cached</code>, commit, and ask your AI to help you remove it from history if the repo is public. Revoking was the real fix.</p> },
          { title: 'Learn', children: <p>Add or fix the rule that would have caught it, such as checking <code>git status</code> before committing.</p> },
        ]}
      />

      <Section title="Runbook 2: the AI bill is climbing" />
      <Steps
        steps={[
          { title: 'Stop the source', children: <p>Stop the app or the job: <code>./scripts/system.sh --stop all</code>, or stop the container, or the agent.</p> },
          { title: 'Cut the tap', children: <p>Revoke or pause the API key at the provider, or lower its spending limit.</p> },
          { title: 'Find the cause', children: <p>Read the logs and the usage page: a loop, a retry storm, a larger model than intended, or a leaked key.</p> },
          { title: 'Fix and cap', children: <p>Add or lower the app cap, add a maximum step count, and switch to the cheapest model for testing.</p> },
          { title: 'Test the cap', children: <p>Set it absurdly low and confirm the app refuses to continue.</p> },
        ]}
      />

      <Section title="Runbook 3: locked out of the server" />
      <Steps
        steps={[
          { title: 'Do not panic or reinstall', children: <p>Almost always it is the firewall or an SSH setting, and the machine itself is fine.</p> },
          { title: 'Try another path', children: <p>If SSH over the public network fails, try Tailscale. If Tailscale is down, plug a keyboard and screen into the server.</p> },
          { title: 'At the console', children: <p>Log in locally, check <code>sudo ufw status</code> and <code>sudo systemctl status ssh</code>, and allow SSH again with <code>sudo ufw allow ssh</code>.</p> },
          { title: 'Fix the setting', children: <p>Correct the sshd config, test with <code>sudo sshd -t</code>, reload, and test from a second window before closing the first.</p> },
        ]}
      />

      <Section title="Runbook 4: a bad deploy is live" />
      <Steps
        steps={[
          { title: 'Stop the bleeding', children: <p>Roll back: <code>git revert HEAD</code> then <code>git push</code>. The pipeline deploys the previous state.</p> },
          { title: 'If the pipeline itself is broken', children: <p>SSH in, <code>git checkout</code> the last good commit in the app folder, and run <code>docker compose up -d --build</code>.</p> },
          { title: 'Check the data', children: <p>Volumes survive container changes. Confirm the database is intact before anything else.</p> },
          { title: 'Fix forward', children: <p>Reproduce the bug locally, write a test for it, fix it, push.</p> },
        ]}
      />

      <Section title="Runbook 5: an agent did something unexpected" />
      <Steps
        steps={[
          { title: 'Stop it', children: <p>Use the kill switch: stop the service, revoke its chat token, or kill its user's processes.</p> },
          { title: 'Contain', children: <p>Revoke any key it held. Lock any account it could reach. Change the allowlist.</p> },
          { title: 'Audit', children: <p>Read its logs: what it read, what it ran, what it sent. Your approval log shows what you allowed.</p> },
          { title: 'Repair', children: <p>Restore from backups where it deleted or changed things.</p> },
          { title: 'Tighten', children: <p>Narrow its permissions, require approval on the action that went wrong, update the brief and the agent-safety skill.</p> },
        ]}
      />

      <Collapsible title="Pre-flight checklist before you run anything new">
        <ul className="list-disc pl-5 space-y-1">
          <li>Do I understand what it does? If not, I asked the AI to explain it.</li>
          <li>Which keys does it touch, and are they in git-ignored files?</li>
          <li>What is the worst thing it can do, and can I undo it?</li>
          <li>Is there a cap on steps, time and money?</li>
          <li>Do I have a backup of anything it can change?</li>
          <li>How do I stop it, fast?</li>
        </ul>
      </Collapsible>

      <QuizSet title="Safety Check">
        <Quiz
          question="A key was committed to a public repo. What is the FIRST action?"
          options={['Delete the commit', 'Revoke the key at the provider', 'Make the repo private', 'Rename the file']}
          correctIndex={1}
          explanation="Bots scrape public repos within minutes. Only revoking makes the key useless."
        />
        <Quiz
          question="Why test a restore of a backup?"
          options={['It is quick', 'An untested backup might not work when you need it', 'It saves space', 'It is required by Docker']}
          correctIndex={1}
          explanation="The only proof a backup works is a restore."
        />
        <MultiSelectQuiz
          question="Which of these reduce the damage an agent can do? (Pick all)"
          options={['A dedicated unprivileged user', 'Manual approval for actions', 'Giving it sudo so it never gets stuck', 'An allowlist of who can message it']}
          correctIndexes={[0, 1, 3]}
          explanation="Never give an agent sudo to avoid being interrupted. The interruptions are the safety."
        />
        <Quiz
          question="You lose SSH access after enabling the firewall. Where do you look first?"
          options={['Reinstall Ubuntu', 'ufw rules, via Tailscale or a keyboard on the server', 'Cloudflare', 'GitHub']}
          correctIndex={1}
          explanation="You probably enabled ufw before allowing ssh."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Plan for failure: limit damage, recover fast.',
          'With a leaked key, revoke first and clean up second.',
          'Stop the source, cut the tap, find the cause, fix, and test the fix.',
          'Rollback is a git revert. Data lives in volumes and backups.',
          'For any agent: narrow, approved, logged, capped, stoppable.',
        ]}
      />
    </div>
  );
}
