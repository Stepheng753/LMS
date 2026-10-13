import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { AGENT_SAFETY_CHECKLIST } from '../../toolkit/tools_agents';

export default function Step5_11_SafeAgents() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 5.11 • Autonomous Agents"
        title="Running Agents Safely"
        summary="What can go wrong, what really did go wrong with a popular agent, and the layers of defence that make running one reasonable."
      />

      <BigWarning title="Read this before you install an agent">
        <p>
          An autonomous agent combines <strong>access</strong> (your keys, files and accounts), <strong>autonomy</strong>{' '}
          (it acts without asking), <strong>persistence</strong> (it keeps running, and remembers) and{' '}
          <strong>exposure</strong> (it reads messages and web pages written by strangers). Put those together carelessly and
          a single trick can hand an attacker your accounts. Security researchers have documented this in practice.
        </p>
        <ul>
          <li>Never run an agent on the computer that holds your real documents, passwords and logged-in accounts.</li>
          <li>Never give it your main email, bank, password manager or primary social accounts.</li>
          <li>Never turn approvals off, or use any &quot;allow everything&quot; mode.</li>
          <li>Never expose its control interface to the internet.</li>
          <li>Always set a spending limit at the model provider first.</li>
        </ul>
      </BigWarning>

      <Section title="The threats" />
      <Table
        headers={['Threat', 'How it happens', 'Result if it works']}
        rows={[
          [<strong key="a">Prompt injection</strong>, 'A web page, email, file or chat message contains instructions, and the agent obeys them', 'It does something you never asked for: leaks data, runs a command, sends a message'],
          [<strong key="b">Over-broad access</strong>, 'You gave it far more than the job needs', 'Any mistake or hijack hits your real accounts and files'],
          [<strong key="c">Exposed control</strong>, 'Its web page, gateway or chat bot can be reached by people who should not', 'A stranger gives your agent orders'],
          [<strong key="d">Malicious skills and plugins</strong>, 'You install an add-on that is really code that steals or spies', 'The agent, and your keys, work for someone else'],
          [<strong key="e">Leaked secrets</strong>, 'Keys sit in a readable file, a log or a chat', 'Someone else spends your money or reads your data'],
          [<strong key="f">Runaway cost</strong>, 'A loop, a stuck task or a scheduled job calls a model endlessly', 'A very large bill'],
          [<strong key="g">Outdated software</strong>, 'You skip security updates', 'Known holes stay open'],
        ]}
      />

      <Section title="A case study: what happened with OpenClaw" />
      <p>
        OpenClaw grew from nothing to a huge following in days, and security researchers and vendors then published a stream
        of findings about it during 2026. Everything below is as <strong>reported by those researchers</strong>. Details
        and patch status change, so check current sources. The lessons are what matter:
      </p>
      <Table
        headers={['What was reported', 'The lesson']}
        rows={[
          ['A vulnerability (CVE-2026-25253) allowed an attacker to obtain a user\'s authentication token, which could then be used to access their data. It was patched within days', 'A software flaw can hand over the keys to your agent. Update promptly'],
          ['A chain called "ClawJacked" reportedly let any website silently take full control of a developer\'s agent. It was patched in under a day', 'Local is not the same as safe. A web page you visit can sometimes reach programs running on your own machine'],
          ['Researchers described exposure to skill poisoning, memory manipulation and supply-chain attacks, with prompt injection a central worry', 'Persistent memory plus powerful tools plus third-party skills is a large attack surface'],
          ['A government agency warned that default or poorly configured setups carried relatively high risk, and some companies restricted its use at work', 'Defaults matter. Read and tighten the configuration. Do not run it on work devices without permission'],
          ['One security firm noted these risks belong to agentic AI in general, not one project, and that self-hosted open tools need a higher baseline of user skill than managed ones', 'The same applies to Hermes and every agent. The defence is your setup, not the brand']
        ]}
      />
      <Callout type="warning" title="Popular is not the same as safe">
        A very high number of GitHub stars means a lot of people are curious. It says nothing about whether the defaults are
        secure. Treat any fast-growing agent as untrusted until you have read its security documentation.
      </Callout>

      <Section title="The layers of defence" />
      <p>
        No single control is enough. Stack them, so that when one fails, another stops the damage:
      </p>
      <Table
        headers={['Layer', 'Question it answers', 'Do this']}
        rows={[
          [<strong key="a">1. Who can talk to it</strong>, 'Could a stranger give it orders?', 'An allowlist with only your own account. Pairing for anything new. Never "allow everyone"'],
          [<strong key="b">2. What it can do</strong>, 'If it were hijacked, what is the worst it could do?', 'Read-only tools, a short named list, only the folders it needs. Add deny rules for destructive commands'],
          [<strong key="c">3. Whether it must ask</strong>, 'Does a person see dangerous actions first?', 'Manual approval for risky commands. Never auto-approve, never yolo mode'],
          [<strong key="d">4. Where it runs</strong>, 'What does it sit next to?', 'Its own unprivileged user, a container, or a separate machine. Not your main computer'],
          [<strong key="e">5. What it can reach on the network</strong>, 'Can the internet reach it?', 'Localhost or Tailscale only. Never forward a port to it'],
          [<strong key="f">6. What it can spend</strong>, 'How big can the bill get?', 'A provider spending limit, a low step limit, and a daily cap on scheduled jobs'],
          [<strong key="g">7. How you stop it</strong>, 'Can you pull the plug fast?', 'Know the stop command and where to revoke its keys. Practise once'],
          [<strong key="h">8. How you notice</strong>, 'Would you see something wrong?', 'Keep logs, and read them. Watch the provider dashboard'],
        ]}
      />

      <Section title="How Hermes Agent lines up" />
      <p>
        Hermes&apos;s own documentation describes several of these layers. These are the controls to know, as of this
        writing. Confirm them against the current docs before you rely on them:
      </p>
      <Table
        headers={['Control', 'What it does', 'Setting']}
        rows={[
          ['Command approval', 'smart (an AI judges the risk), manual (it asks you for every dangerous command), or off', <code key="a">approvals.mode: manual</code>],
          ['Scheduled and unattended jobs', 'Whether they may run dangerous commands. "deny" blocks them', <code key="b">cron_mode: deny, unattended_mode: deny</code>],
          ['Deny rules', 'Patterns that are always blocked, even in yolo mode', <code key="c">approvals.deny: [...]</code>],
          ['Hard blocklist', 'Some commands, like deleting the whole disk, are refused under every setting', 'Built in'],
          ['Who may message it', 'Allowlists by chat user ID. With none set, everyone is denied. Unknown users must be paired', <code key="d">TELEGRAM_ALLOWED_USERS, hermes pairing</code>],
          ['Container backend', 'Runs its commands inside a hardened Docker container', <code key="e">terminal.backend: docker</code>],
          ['Protected paths', 'Writes to places like your SSH and cloud credentials folders are blocked', 'Built in'],
          ['Secrets handling', 'Secret-looking variables are stripped from what its tools see', 'Built in. Also chmod 600 the .env'],
          ['Network protection', 'Blocks requests to private and internal addresses by default', 'Built in'],
        ]}
      />
      <Callout type="warning" title="Containers have a catch">
        Hermes treats a container as the safety boundary, and <strong>skips its dangerous-command checks</strong> when it
        runs commands inside one. That is a good trade only if the container is truly isolated. Also, letting a user run
        Docker on a Linux machine is close to giving them full control of it. For a first setup, a <strong>dedicated
        unprivileged user</strong>, with the local backend and manual approvals, is simpler and easier to reason about. The
        step after next uses it.
      </Callout>

      <Section title="Prompt injection: the defences, honestly" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>You cannot fully prevent it.</strong> Models cannot reliably separate your instructions from instructions hidden in content.</li>
        <li><strong>So limit the damage.</strong> If a hijacked agent could only read a notes folder, the worst case is small. If it could run any command with your accounts, the worst case is enormous.</li>
        <li><strong>Approvals catch what limits miss.</strong> That is why they stay on, and why you read them.</li>
        <li><strong>Separate reading from acting.</strong> An agent that reads the open web should not also be able to send email or run commands.</li>
        <li><strong>A stronger model helps</strong>, but never replaces limits.</li>
      </ul>

      <Section title="Your checklist" />
      <p>It is in your Toolkit as well. Run through it before any agent goes live:</p>
      <CodeBlock language="markdown" title="Agent safety checklist" code={AGENT_SAFETY_CHECKLIST} />

      <Collapsible title="The kill switch drill">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Know the command that stops the agent&apos;s background process, and run it once while it is idle.</li>
          <li>Know where to revoke each key it holds: the model provider, the chat bot token, any MCP token.</li>
          <li>Know where its logs are, and how to see what it did in the last hour.</li>
          <li>Write all three on a note. In a crisis you will not remember.</li>
        </ol>
      </Collapsible>

      <Exercise
        title="Threat-model an assistant"
        hint={<p>For each thing it can reach, ask &quot;what is the worst a hijacker could do with this?&quot; Then remove the access you do not need.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Email (read and send):</strong> the worst case is sending convincing messages as you. Remove &quot;send&quot;, or use a throw-away inbox.</li>
            <li><strong>Bank notifications:</strong> the worst case is exposing financial details. Do not connect it.</li>
            <li><strong>Your documents folder:</strong> the worst case is leaking private files. Give it a copy of only what the job needs, read-only.</li>
            <li><strong>A terminal on your main computer:</strong> the worst case is everything. Do not. Use a separate, unprivileged user or machine.</li>
          </ul>
        }
      >
        <p>You are tempted to give a new assistant access to your email (read and send), bank notifications, your documents folder and a terminal on your main computer. For each, name the worst case and how you would reduce it.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What is the best defence against prompt injection?"
          options={['A longer prompt', 'Limiting what the agent can do, and keeping approvals on', 'Using a smaller model', 'Hiding the agent']}
          correctIndex={1}
          explanation="You cannot fully prevent it, so you limit the damage a hijacked agent could do."
        />
        <Quiz
          question="What did the 'ClawJacked' report teach about running software locally?"
          options={['Local software is always safe', 'A website you visit can sometimes reach programs on your own machine, so local is not the same as safe', 'Local software cannot be hacked', 'Only cloud agents are risky']}
          correctIndex={1}
          explanation="Researchers reported a web page taking over a local agent. Keep agents isolated and updated."
        />
        <Quiz
          question="Which approval mode do you use?"
          options={['off, for speed', 'manual, so every dangerous command asks you', 'smart, and never read the prompts', 'Whichever is the default']}
          correctIndex={1}
          explanation="Manual keeps a person in the loop. Never switch approvals off."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Agents combine access, autonomy, persistence and exposure. Together that is a large attack surface.',
          'OpenClaw\'s 2026 record (token theft, a website takeover, risky defaults) shows that popular is not safe, and that local is not safe.',
          'Stack the layers: who can talk to it, what it can do, whether it must ask, where it runs, what it can reach, what it can spend, how you stop it, how you notice.',
          'You cannot fully stop prompt injection. Limit the damage and keep approvals on.',
          'Never on your main computer, never your main accounts, never approvals off, never exposed to the internet.',
        ]}
      />
    </div>
  );
}
