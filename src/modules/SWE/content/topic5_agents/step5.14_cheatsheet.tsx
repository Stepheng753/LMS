import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { CommandTable } from '../../../../components/content/CommandTable';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_14_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 5.14 • Reference"
        title="Topic 5 Cheat Sheet"
        summary="Agents, MCP, the cloud agents, open models, Hermes and the safety rules, in one place."
      />

      <BigWarning title="The five rules">
        <ol>
          <li><strong>Start read-only</strong>, with test accounts and a throw-away folder.</li>
          <li><strong>Approvals on</strong>, and read every one. Never yolo or allow-all.</li>
          <li><strong>Limits:</strong> a provider spending limit, a low step limit, a daily cap.</li>
          <li><strong>Isolate:</strong> its own user, container or machine. Never your main computer or main accounts.</li>
          <li><strong>Know the kill switch</strong> and where to revoke every key.</li>
        </ol>
      </BigWarning>

      <Section title="The ladder" />
      <Table
        headers={['Rung', 'What it is', 'Risk']}
        rows={[
          ['Chat', 'You ask, it answers', 'Lowest'],
          ['API', 'Your code calls a model (Topic 4)', 'Low: you wrote the logic'],
          ['Tools', 'It runs commands for you (Agy, Antigravity)', 'Medium: approvals matter'],
          ['Connected (MCP)', 'It uses your apps through servers', 'Higher: access to real data'],
          ['Cloud agents', 'Cowork, Spark, ChatGPT Work: hosted, background', 'Higher: they act with your logins'],
          ['Self-hosted agents', 'Hermes, OpenClaw: always on, with memory and a schedule', 'Highest: autonomy, persistence and exposure'],
        ]}
      />

      <Section title="The agent loop" />
      <p>
        Goal → <strong>think</strong> → <strong>act</strong> (a tool) → <strong>observe</strong> → repeat until done. Parts: model +
        tools + loop, plus memory and limits. Levels of freedom: suggest, act with approval, act within limits, act freely
        (almost never).
      </p>

      <Section title="MCP" />
      <Table
        headers={['Idea', 'Remember']}
        rows={[
          ['What', 'An open standard: a USB-C port for AI. Host → client → server'],
          ['A server offers', 'Tools (actions), resources (data), prompts (templates)'],
          ['Transports', 'stdio (local, runs as you) and Streamable HTTP (remote, with a token)'],
          ['Official reference servers', 'Filesystem, Fetch, Git, Memory, Time, Sequential Thinking, Everything. They are examples, not production-ready'],
          ['Three rules', 'Vet before you add. Least privilege (one folder, read-only). Approvals on'],
        ]}
      />
      <Table
        headers={['Where', 'File']}
        rows={[
          ['Antigravity / Agy, one project', <code key="a">.agents/mcp_config.json</code>],
          ['Antigravity / Agy, global', <code key="b">~/.gemini/config/mcp_config.json</code>],
          ['Format', <code key="c">{'{'}"mcpServers": {'{'}"name": {'{'}"command": "npx", "args": [...]{'}'}{'}'}{'}'}</code>],
          ['Hermes', <code key="d">~/.hermes/config.yaml → mcp_servers:</code>],
          ['Inside Agy', <code key="e">/mcp</code>],
        ]}
      />

      <Section title="The cloud agents (as of October 2026)" />
      <Table
        headers={['Agent', 'Runs', 'Best for']}
        rows={[
          ['Claude Cowork (reportedly merging into Claude chat)', 'On your computer, on folders you choose', 'Local files, reports, scheduled tasks'],
          ['Gemini Spark', 'Google\'s cloud, 24/7', 'Gmail, Calendar, Docs, background tracking'],
          ['ChatGPT Work', 'OpenAI\'s cloud, for hours', 'Slack, Drive, Teams, documents and web apps'],
        ]}
      />
      <Callout type="warning" title="Details change monthly">
        Names, plans and prices change. Check the vendor&apos;s own page. Backups before write access, and always test on a
        throw-away folder or account first.
      </Callout>

      <Section title="Task brief" />
      <p>
        Goal · Context · Allowed · Not allowed · Ask me before · Done when · Format · Limits · <strong>If unsure: stop and ask</strong>.
        Trust ladder: propose a plan → read-only → act with approval → act within limits. Check correctness, completeness,
        scope and cost.
      </p>

      <Section title="Open vs cloud models" />
      <Table
        headers={['', 'Cloud', 'Local open model']}
        rows={[
          ['Price', 'Per token, no upfront', 'Hardware upfront, then near-free'],
          ['Control', 'Vendor decides', 'You pin and own it'],
          ['Privacy', 'Goes to the vendor', 'Stays on your machine'],
          ['Resources', 'None', 'GPU or RAM, disk, power, setup time'],
          ['Quality', 'Best for hard, multi-step work', 'Good for simple, private, bulk jobs'],
        ]}
      />
      <Table
        caption="Rough memory guide at Q4 (check each model's page)"
        headers={['Memory', 'Typically fits']}
        rows={[
          ['About 8 GB', 'Small models (roughly 4B to 9B)'],
          ['12 to 16 GB', 'Medium (a 20B-class model)'],
          ['24 GB', '27B to 32B-class'],
          ['48 GB or more', '70B-class'],
        ]}
      />
      <CommandTable
        title="Ollama"
        rows={[
          { command: 'ollama pull <name>', description: 'Download a model' },
          { command: 'ollama run <name>', description: 'Chat with it (/bye to exit)' },
          { command: 'ollama list', description: 'See installed models' },
          { command: 'ollama rm <name>', description: 'Delete a model to free disk' },
          { command: 'http://localhost:11434', description: 'Local API address. Keep it on localhost' },
          { command: 'http://localhost:11434/v1', description: 'OpenAI-compatible base address for agents and apps' },
        ]}
      />

      <Section title="Hermes Agent (verify against the current docs)" />
      <CommandTable
        rows={[
          { command: 'hermes setup', description: 'Guided setup' },
          { command: 'hermes model', description: 'Choose or switch the model' },
          { command: 'hermes config edit', description: 'Edit ~/.hermes/config.yaml' },
          { command: 'hermes config check', description: 'Find missing or stale settings' },
          { command: 'hermes doctor', description: 'Diagnose the installation' },
          { command: 'hermes gateway setup / start', description: 'Connect chat apps, then run the gateway' },
          { command: 'hermes pairing list', description: 'See who is asking to be paired. Approve nobody you do not know' },
          { command: 'hermes update', description: 'Install updates and security patches' },
        ]}
      />
      <Table
        headers={['Safety setting', 'Use']}
        rows={[
          [<code key="a">approvals.mode</code>, 'manual. Never off'],
          [<code key="b">cron_mode, unattended_mode</code>, 'deny'],
          [<code key="c">approvals.deny</code>, 'Patterns that are always blocked'],
          [<code key="d">TELEGRAM_ALLOWED_USERS</code>, 'Only your own ID in ~/.hermes/.env. Never allow all'],
          [<code key="e">tools: include</code>, 'Only the read-only tools of each MCP server'],
          [<code key="f">~/.hermes/.env</code>, 'chmod 600. Keys live here'],
        ]}
      />

      <Section title="Prompt injection" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Anything an agent reads can contain hidden instructions: files, web pages, emails, chat messages, tool output.</li>
        <li>You cannot fully prevent it. Limit what a hijacked agent could do, keep approvals on, and separate reading from acting.</li>
        <li>Test it on purpose with a trap note.</li>
      </ul>

      <KeyTakeaways
        items={[
          'The ladder gives AI more reach and gives you less chance to catch mistakes. Climb it carefully.',
          'An agent is a model with tools in a loop. Limits and approvals are part of the design.',
          'MCP connects AI to tools: vet servers, scope them narrowly, keep approvals on.',
          'Cloud agents are convenient but act with your logins. Open models give privacy and control but need hardware and are weaker on hard tasks.',
          'Self-hosted agents are powerful and risky: isolate them, cap them, and practise the kill switch.',
        ]}
      />
    </div>
  );
}
