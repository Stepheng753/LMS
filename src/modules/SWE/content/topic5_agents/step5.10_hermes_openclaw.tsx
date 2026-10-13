import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_10_HermesOpenClaw() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 5.10 • Autonomous Agents"
        title="Autonomous Agents: Hermes Agent and OpenClaw"
        summary="Agents you run yourself, that live on your own machine, remember things, work on a schedule, and talk to you through a chat app."
      />

      <p>
        The cloud agents in step 5.5 are hosted by their companies. A different kind of agent is{' '}
        <strong>self-hosted and open-source</strong>: software you install and run on your own hardware, with a model of your
        choice. Two of the best known are <strong>Hermes Agent</strong> and <strong>OpenClaw</strong>. They are what people
        usually mean by &quot;autonomous agents&quot;, so this step explains what makes them different.
      </p>

      <BigWarning title="Autonomous agents act on their own, all day, with your keys">
        <p>
          A self-hosted agent is not a chat window you close. It stays running, holds your API keys, can run commands on
          the computer it lives on, reads messages you send it, and can act on a schedule while you sleep. That makes it
          the most powerful thing in this course, and the most dangerous to set up carelessly.
        </p>
        <ul>
          <li><strong>Cost:</strong> it calls a model in a loop, unattended. A stuck or hijacked agent can spend a great deal before you notice. Some agents allow hundreds of steps per task by default. Set limits at the provider, and a lower step limit in the agent.</li>
          <li><strong>Security:</strong> it has been the target of real attacks (step 5.11). Run it isolated, with test accounts, read-only tools, and approvals on.</li>
          <li><strong>You are responsible</strong> for everything it does with the access you give it.</li>
        </ul>
        <p>Do not install either on the computer that holds your real documents, passwords and accounts.</p>
      </BigWarning>

      <Section title="What makes them 'autonomous'" />
      <Flow
        steps={[
          { title: 'You', sub: 'Message it on Telegram, Discord, Slack, WhatsApp...' },
          { title: 'Gateway', sub: 'One always-on program that receives your messages', via: 'chat' },
          { title: 'Agent loop', sub: 'Think, act, observe, with memory and skills', via: 'task' },
          { title: 'Model', sub: 'A cloud model or your own open model', via: 'asks' },
          { title: 'Tools', sub: 'Terminal, files, web, and MCP servers', via: 'acts' },
        ]}
      />
      <Table
        headers={['What it adds', 'In plain words']}
        rows={[
          [<strong key="a">Always on</strong>, 'A background program (a gateway) that keeps running, so it is there whenever you message it'],
          [<strong key="b">Chat as the interface</strong>, 'You talk to it in an app you already use. It can also message you first'],
          [<strong key="c">Memory</strong>, 'It remembers things across days, not just within one chat'],
          [<strong key="d">Skills</strong>, 'Reusable procedures. Hermes can write new ones itself after finishing a hard task and improve them over time'],
          [<strong key="e">A scheduler</strong>, 'Jobs described in plain language that run unattended: "every morning at 8..."'],
          [<strong key="f">Your choice of brain</strong>, 'Works with many models, cloud or local, and you can switch'],
          [<strong key="g">Your computer, your data</strong>, 'It runs where you put it. Nothing is hosted for you'],
        ]}
      />

      <Section title="Hermes Agent" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Who:</strong> Nous Research, an AI research lab. Open source under the MIT licence. Released in February 2026.</li>
        <li><strong>Install:</strong> a one-line script for Linux, macOS and WSL (<code>curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash</code>), and one for Windows PowerShell. Read any script before you run it.</li>
        <li><strong>Start:</strong> run <code>hermes</code>. <code>hermes setup</code> walks you through configuration, and <code>hermes model</code> switches models.</li>
        <li><strong>Models:</strong> its docs list Nous Portal, OpenRouter, OpenAI, or &quot;any endpoint&quot; of your own.</li>
        <li><strong>Tools:</strong> it can run commands through several terminal &quot;backends&quot; (local, Docker, SSH and others), and connect to MCP servers listed in its config.</li>
        <li><strong>Chat:</strong> a gateway for Telegram, Discord, Slack, WhatsApp, Signal and more.</li>
        <li><strong>Schedule:</strong> a built-in cron scheduler that delivers output to any connected chat.</li>
        <li><strong>Safety features:</strong> dangerous-command approval, user allowlists and pairing, and container isolation (step 5.11).</li>
        <li><strong>Lineage:</strong> it can import settings, memories and skills from OpenClaw.</li>
      </ul>

      <Section title="OpenClaw" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>What:</strong> a self-hosted, open-source assistant (MIT licence, from the OpenClaw Foundation). One <strong>Gateway</strong> process connects your chat apps to AI agents. Formerly known as Clawdbot and Moltbot.</li>
        <li><strong>Install:</strong> a script for macOS, Linux and WSL2, then <code>openclaw onboard</code>. It needs a recent Node.</li>
        <li><strong>Chat:</strong> a long list, including Telegram, Discord, Slack, WhatsApp, Signal and iMessage.</li>
        <li><strong>Config:</strong> settings live in <code>~/.openclaw/openclaw.json</code>, and a control web page runs on your own machine.</li>
        <li><strong>Models:</strong> you bring an API key (or a local model service). Its own documentation recommends using the strongest latest-generation model available, <em>for quality and for security</em>.</li>
        <li><strong>Reputation:</strong> it became hugely popular very quickly, and has also had a serious security record. That story is the heart of the next step.</li>
      </ul>

      <Section title="Side by side" />
      <Table
        headers={['', 'Hermes Agent', 'OpenClaw']}
        rows={[
          ['Licence', 'MIT', 'MIT'],
          ['Runs as', 'A CLI, plus a gateway process for chat', 'A Gateway process, plus a control web page'],
          ['Memory and skills', 'Persistent memory, and skills it creates and improves itself', 'Persistent memory and installable skills and plugins'],
          ['Scheduling', 'Built-in cron, set in natural language', 'Supported, check its docs'],
          ['Tools', 'Terminal backends, MCP servers', 'Tools and plugins, MCP support, check its docs'],
          ['Built-in safety features', 'Command approval modes, deny rules, allowlists and pairing, container backend', 'Allowlists and mention rules for chats, local-only gateway by default'],
          ['Security record', 'Newer. Verify against its current docs and advisories', 'Several serious vulnerabilities reported and patched in 2026'],
          ['Best use here', <strong key="h">Our hands-on agent (step 5.12)</strong>, <strong key="o">A case study (step 5.11)</strong>],
        ]}
      />
      <Callout type="info" title="Why Hermes is our hands-on choice">
        Both are open source and capable. We use Hermes for practice because its documentation describes a layered set of
        safety controls, and because it can run its tools in a sandbox. That does not make it &quot;safe&quot;. No agent
        is. It means the careful setup in step 5.12 is possible. And you will still verify its current docs, because both
        projects change quickly.
      </Callout>

      <Section title="Connecting a brain" />
      <Table
        headers={['Option', 'How', 'Good for', 'Watch out for']}
        rows={[
          [<strong key="a">A hosted provider and its key</strong>, 'Choose a provider in the agent\'s setup and give it your API key', 'The best quality, with no hardware', 'Cost. Set provider limits and a low step limit. The key lives in the agent\'s private settings'],
          [<strong key="b">A router service</strong>, 'A service such as OpenRouter that offers many models behind one key', 'Trying several models easily', 'One more company to trust with a key and your prompts'],
          [<strong key="c">Your own open model</strong>, <span key="c2">Point the agent at an OpenAI-compatible address, such as Ollama&apos;s <code>http://localhost:11434/v1</code></span>, 'Privacy, no per-token cost, offline', 'Weaker at long multi-step work. Pick a model that supports tool calling, and use a larger one if you can'],
        ]}
      />
      <Compare
        goodLabel="A sensible start"
        badLabel="A risky start"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>A strong cloud model as the brain, spending limit set</li>
            <li>A low step limit and manual approvals</li>
            <li>A harmless, read-only first job</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>The smallest local model you could find, trusted with real accounts</li>
            <li>No spending limit at the provider</li>
            <li>Approvals switched off &quot;to make it faster&quot;</li>
          </ul>
        }
      />
      <p>
        There is a security angle to model choice, too. Agents decide what to do from <em>text they read</em>, so a weaker
        model is generally easier to trick with a hidden instruction. That is part of why OpenClaw&apos;s docs recommend the
        strongest model, and it is one more reason to start with a capable cloud model and move to a local one carefully.
      </p>

      <Exercise
        title="Cloud brain or local brain?"
        hint={<p>Think about the task&apos;s stakes, its privacy, and how many steps it needs.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>A daily weather and notes briefing, read-only:</strong> either works. A cheap cloud model is easy. A local one is fine if it handles tools well.</li>
            <li><strong>An agent that can message your contacts:</strong> a strong cloud model, approvals on, and probably do not do it at all yet.</li>
            <li><strong>Summarising private medical notes:</strong> local, so nothing leaves your machine.</li>
          </ol>
        }
      >
        <p>Pick a brain for: (1) A daily weather and notes briefing, read-only. (2) An agent that can message your contacts. (3) Summarising private medical notes.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What is the Gateway in these agents?"
          options={['A hardware router', 'An always-on program that receives your chat messages and passes them to the agent', 'A payment system', 'A web browser']}
          correctIndex={1}
          explanation="It is what makes them 'always on' and reachable from a chat app."
        />
        <Quiz
          question="How do you connect an agent to a local open model?"
          options={['You cannot', 'Point it at an OpenAI-compatible address, like Ollama\'s localhost:11434/v1', 'Email the model', 'Install a browser extension']}
          correctIndex={1}
          explanation="Local servers like Ollama expose the same API shape that agents already know."
        />
        <Quiz
          question="Why is a stronger model also a safer choice for an agent?"
          options={['It is cheaper', 'Weaker models are generally easier to trick with hidden instructions', 'It uses less memory', 'It needs no approvals']}
          correctIndex={1}
          explanation="OpenClaw's own docs recommend the strongest model for quality and security."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Autonomous agents are self-hosted: an always-on gateway, chat as the interface, memory, skills, a scheduler, and your choice of model.',
          'Hermes Agent (Nous Research, MIT) and OpenClaw (MIT) are the best known. Both change fast, so check their docs.',
          'Connect a brain through a provider key, a router, or your own OpenAI-compatible endpoint such as Ollama.',
          'Start with a strong cloud model, spending capped, approvals on, and a harmless read-only job.',
          'They run all day with your keys. Cost and security are the main risks. The next step is about safety.',
        ]}
      />
    </div>
  );
}
