import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Exercise } from '../../../../components/content/Exercise';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_17_Challenges() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Challenges"
        title="Design Challenges"
        summary="Open-ended builds that mix several topics. There is no single right answer: judge yours against the checklist."
      />
      <Callout type="info" title="How these work">
        Pick one. Write the spec first, and show it to your AI helper for questions before building. When you are done,
        check yourself against the checklist in the answer box. Cost reminder: use the cheapest model and a tiny cap while
        you build.
      </Callout>

      <Section title="Warm-up (one evening)" />
      <Exercise
        title="Challenge 1: The bookmarks app"
        hint={<p>Two tables? Probably one table is enough: bookmarks with a title, a URL and a tag. Keep the screen to a list, an add form and a delete button.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>A spec with a goal, actions, screens, data, rules and a done-when.</li>
            <li>The standard layout and seven READMEs, SQLite in data/, JSON config.</li>
            <li>Unit, system and manual tests, run through system.sh.</li>
            <li>No duplicate URLs (a rule that you wrote and tested).</li>
            <li>Committed with no secrets staged.</li>
          </ul>
        }
      >
        <p>Build an app that saves links with a title and a tag, lists them, filters by tag, and deletes them.</p>
      </Exercise>

      <Section title="Intermediate (a weekend)" />
      <Exercise
        title="Challenge 2: The family recipe box, live at home"
        hint={<p>Two tables: recipes and ingredients, with a foreign key on ingredients. Plan the nginx name and certificate before you finish.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Spec reviewed through <code>/plan</code>, with your comments recorded.</li>
            <li>Two related tables with the foreign key on the right side.</li>
            <li>Containerised, with a volume for the database and ports bound to 127.0.0.1.</li>
            <li>A Cloudflare record, an nginx site and HTTPS under your domain, reached over Tailscale.</li>
            <li>A pipeline that tests, then deploys. You pushed a change and watched it go live.</li>
            <li>A backup of the database, and a restore you actually tested.</li>
          </ul>
        }
      >
        <p>Build a recipe app with recipes and ingredients, a search box and a shopping-list view. Deploy it on your homelab with its own name.</p>
      </Exercise>

      <Exercise
        title="Challenge 3: The spending tracker with an AI summary"
        hint={<p>Keep the spending data in SQLite. Send the AI only the aggregated numbers it needs, not every record. Put the cap in config.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Keys in secrets.json (git-ignored). The AI is called only from the backend.</li>
            <li>The model is a config setting, and you tested switching it.</li>
            <li>A daily cap stored in the database. You tested it with a tiny cap and it refused.</li>
            <li>The summary is cached so reloading the page does not call the AI again.</li>
            <li>You can say how much one summary costs, in dollars.</li>
          </ul>
        }
      >
        <p>Record expenses, show totals per category, and add a button that asks an AI model for a short plain-English summary of the month.</p>
      </Exercise>

      <Section title="Advanced (a week)" />
      <Exercise
        title="Challenge 4: Sheet to social, with approval"
        hint={<p>Reuse your daily-poster spec. Add one table for drafts with a status: drafted, approved, posted, failed.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Reads the next row from a Google Sheet through a service account shared with only that sheet.</li>
            <li>Drafts with the AI, saves a draft, and a human approves it in the app before anything posts.</li>
            <li>Posts through Blotato with a daily cap on posts and on AI spend.</li>
            <li>Every step is logged, and a paused flag stops everything immediately.</li>
            <li>No key is in git, the frontend or a chat.</li>
          </ul>
        }
      >
        <p>Turn a Google Sheet of ideas into drafted posts, add an approval screen, and post the approved ones on a schedule.</p>
      </Exercise>

      <Exercise
        title="Challenge 5: A safe personal assistant"
        hint={<p>Use the assistant-brief and agent-safety-checklist from your toolkit. Start by giving it read-only access and one task.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>A written brief: goal, done-when, scope, never-do, when to stop and ask.</li>
            <li>A dedicated unprivileged user, with no sudo and access to one folder only.</li>
            <li>Manual approvals on. An allowlist of only your own chat id.</li>
            <li>Caps on steps, time and spending, with logs you can read.</li>
            <li>You practised the kill switch, and wrote down what you would check afterwards.</li>
          </ul>
        }
      >
        <p>Set up an assistant that summarises a folder of notes each morning and messages you the highlights. It may read, never delete or send anything else.</p>
      </Exercise>

      <Section title="Stretch (when you are ready)" />
      <Exercise
        title="Challenge 6: Teach it back"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>You used your own words, not the lesson&apos;s.</li>
            <li>Your friend could repeat the main steps back to you.</li>
            <li>You noticed at least one thing you could not explain, and went back to learn it.</li>
          </ul>
        }
      >
        <p>Explain to a friend, without notes, how a button click becomes a saved row in a database, and how a change you make reaches your server. Draw the pictures if it helps.</p>
      </Exercise>

      <KeyTakeaways
        items={[
          'A build you finished teaches more than a lesson you read.',
          'Write the spec, review the plan, add the tests, ship it, back it up.',
          'Teaching it back is the best test of understanding.',
        ]}
      />
    </div>
  );
}
