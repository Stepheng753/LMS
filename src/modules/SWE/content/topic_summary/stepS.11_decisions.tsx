import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_11_Decisions() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Decisions"
        title="Decision Guides"
        summary="Which tool, which method, which model? Short, practical answers to the choices you will meet again and again."
      />

      <Callout type="info" title="How to read these">
        Each table starts from your situation and gives a default choice. A default is where to begin, not a law. If you
        have a real reason, choose differently, and write the reason down.
      </Callout>

      <Section title="How do I prove who I am to an API?" />
      <Table
        headers={['Situation', 'Use', 'Why']}
        rows={[
          ['Your own app calls an AI model', 'API key', 'Simple, one app, one owner'],
          ['Your app reads a person\'s Google Calendar or Gmail', 'OAuth', 'The person must grant access to their own data'],
          ['A nightly job reads a sheet nobody is logged in for', 'Service account', 'A robot identity, shared only the files it needs'],
          ['A public data API with no account data', 'Often none, or a key for rate limits', 'Read the docs'],
        ]}
      />

      <Section title="Where does this data belong?" />
      <Table
        headers={['Data', 'Put it in', 'Not in']}
        rows={[
          ['Records the app manages (tasks, users, posts)', 'SQLite in data/', 'The frontend, or a JSON file'],
          ['Settings (ports, model names, caps)', 'backend/config/config.json', 'Hard-coded in code'],
          ['Keys and passwords', 'backend/config/secrets.json (git-ignored)', 'Git, the frontend, chat'],
          ['Something humans edit in a spreadsheet', 'A Google Sheet', 'A database nobody opens'],
          ['Big files (photos, videos)', 'A volume or a media app (Immich, Jellyfin)', 'Inside the database'],
        ]}
      />

      <Section title="Which AI model for which job?" />
      <Table
        headers={['Job', 'Pick', 'Reason']}
        rows={[
          ['Building and testing a loop', 'claude-haiku-5-5 ($0.10 / $0.50)', 'Cheap, so mistakes cost cents'],
          ['Everyday writing, summaries, code', 'claude-sonnet-5-5 ($2 / $10)', 'Good quality at a fair price'],
          ['Hard reasoning, tricky code', 'claude-opus-5-5 ($4 / $20)', 'More capable'],
          ['A task where mistakes are very costly', 'claude-fable-5-1 ($10 / $50)', 'Only when it truly matters'],
          ['Private or offline work, no bill', 'A local open model via Ollama', 'You trade quality for control'],
        ]}
      />
      <p className="text-sm text-slate-500">Prices per million tokens, input / output, as taught in Topic 4. Check the provider&apos;s page for current prices.</p>

      <Section title="Where should this run?" />
      <Table
        headers={['Need', 'Run it', 'Because']}
        rows={[
          ['Trying an idea', 'Your WSL machine', 'Instant, free, disposable'],
          ['A tool only you use, always on', 'The homelab, over Tailscale', 'Private, no public exposure'],
          ['Something the public must see', 'The homelab behind nginx and HTTPS, or a hosted service', 'Needs a public address and certificates'],
          ['A heavy one-off job', 'A cloud service for the duration', 'Pay only while you use it'],
          ['An agent with real powers', 'A dedicated unprivileged user, ideally a separate machine', 'Limits the damage'],
        ]}
      />

      <Section title="Cloud agent, local model or self-hosted agent?" />
      <Table
        headers={['If you value', 'Choose']}
        rows={[
          ['Speed to start, best quality, no upkeep', 'A cloud agent (Cowork, Spark, ChatGPT Work)'],
          ['Privacy and no per-token bill, simple tasks', 'A local model with Ollama'],
          ['Always-on, reachable from chat, full control', 'Hermes Agent or OpenClaw on your homelab, with every safety control'],
        ]}
      />

      <Section title="Should I give the agent this permission?" />
      <Table
        headers={['Permission', 'Default', 'Condition for more']}
        rows={[
          ['Read one project folder', 'Yes', 'None'],
          ['Write inside that folder', 'Ask each time', 'A narrow action proven safe many times'],
          ['Run shell commands', 'Ask each time', 'Inside a dedicated user, never with sudo'],
          ['Send messages or emails, post publicly', 'Draft only, a human sends', 'Almost never automatic'],
          ['Spend money', 'Capped, small', 'Provider limits plus your own cap'],
          ['Admin or root access', 'Never', 'Never'],
        ]}
      />

      <Section title="Do I need a framework or an extra tool?" />
      <Table
        headers={['Temptation', 'Answer']}
        rows={[
          ['A new database', 'No. SQLite is enough for these projects'],
          ['A different frontend framework', 'No. Stay with React, Vite, Tailwind, TypeScript'],
          ['A .env file', 'No. JSON in backend/config/'],
          ['Kubernetes', 'No. Compose on one server does everything you need'],
          ['A new library for a small job', 'Ask your AI to do it without one first'],
        ]}
      />

      <QuizSet title="Decisions Check">
        <Quiz
          question="A scheduled job must read a private sheet while you sleep. What do you use?"
          options={['Your personal password', 'A service account the sheet is shared with', 'OAuth with a popup', 'No auth']}
          correctIndex={1}
          explanation="Nobody is present to click Allow, so it must be a robot identity."
        />
        <Quiz
          question="Where do your API keys live?"
          options={['The frontend', 'backend/config/secrets.json, git-ignored', 'The README', 'A public gist']}
          correctIndex={1}
          explanation="Only the backend uses them, and git never sees them."
        />
        <Quiz
          question="You are testing a new AI loop. Which model first?"
          options={['The most expensive', 'The cheapest that works', 'A random one', 'No model']}
          correctIndex={1}
          explanation="Bugs in loops cost money. Test cheap, then upgrade."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Start from the situation, take the default, deviate only for a reason you can state.',
          'Keys in secrets.json, settings in config.json, records in SQLite.',
          'Cheap model to build, better model when quality demands it.',
          'Agent permissions start at read-only and widen only with evidence.',
        ]}
      />
    </div>
  );
}
