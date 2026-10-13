import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Flow } from '../../../../components/content/Flow';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { DAILY_POSTER_SPEC, SHEET_TEMPLATE } from '../../toolkit/tools_apis';

export default function Step4_12_Design() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.12 • Project D"
        title="Design the Daily Poster"
        summary="Before any code exists, decide exactly what the app does, which data it keeps, and where a human stays in control."
      />

      <p>
        You now have every ingredient: Google OAuth, an AI model with a switcher, Blotato, saved docs, and safe habits.
        This step turns them into a <strong>design</strong> you can hand to <code>/plan</code>. Take your time, because a
        clear spec is what makes the next step easy.
      </p>

      <Section title="A day in the life of the app" />
      <Flow
        steps={[
          { title: 'Your Sheet', sub: 'Content Calendar' },
          { title: 'Daily job', sub: 'reads today\'s rows', via: 'OAuth' },
          { title: 'Live data', sub: 'fetched if a row has a data_url', via: 'for each row' },
          { title: 'AI drafts', sub: 'with your chosen model', via: 'prompt' },
          { title: 'You approve', sub: 'edit, approve or reject', via: 'draft' },
          { title: 'Blotato', sub: 'publishes or schedules', via: 'approved' },
        ]}
      />
      <p>
        Notice where the person sits: <strong>between the draft and the publish</strong>. The app does the boring work, and
        you make the decisions.
      </p>

      <Section title="The calendar (your Google Sheet)" />
      <p>One row is one post. Here are the columns:</p>
      <Table
        headers={['Column', 'Meaning']}
        rows={[
          [<code key="a">date</code>, 'The day to post (YYYY-MM-DD)'],
          [<code key="b">platform</code>, 'bluesky, instagram, tiktok, twitter... (whichever of your own accounts)'],
          [<code key="c">mode</code>, <span key="c2"><code>prompt</code>: the AI writes it. <code>content</code>: post exactly as written</span>],
          [<code key="d">prompt_or_content</code>, 'The instruction for the AI, or the finished text'],
          [<code key="e">media_url</code>, 'Optional public image or video address (Instagram and TikTok need one)'],
          [<code key="f">data_url</code>, 'Optional public JSON address. Fetch it and give the data to the AI'],
          [<code key="g">post_time</code>, 'Optional time of day to publish'],
        ]}
      />
      <CodeBlock language="markdown" title="Example rows" code={SHEET_TEMPLATE} />
      <Callout type="info" title="The Sheet stays read-only">
        The app only reads your Sheet (the read-only scope from step 4.5). It never edits it. Everything it learns, such as
        a draft or a status, is kept in its own database.
      </Callout>

      <Section title="Safe by default" />
      <Table
        headers={['Rule', 'Why']}
        rows={[
          [<strong key="a">Dry-run is ON</strong>, 'Until you turn it off, approving shows the exact request and sends nothing'],
          [<strong key="b">Approval required</strong>, 'No draft publishes without a click. Auto-approve exists but is off'],
          [<strong key="c">Never twice</strong>, 'Each row can only be published once'],
          [<strong key="d">Test account first</strong>, 'Start with a throw-away Bluesky profile'],
          [<strong key="e">Failures stop the post</strong>, 'If live data or the AI fails, the row shows an error and nothing posts'],
          [<strong key="f">Costs visible</strong>, 'Every draft shows its model and its cost, plus today\'s total'],
          [<strong key="g">Spend capped</strong>, 'A daily cost cap in config. The cheapest model is selected by default, and premium models ask for confirmation'],
        ]}
      />

      <Section title="The screens" />
      <Table
        headers={['Screen', 'Shows', 'Actions']}
        rows={[
          ['Today', 'Drafts for today, each with the model that wrote it and its cost', 'Edit, Approve, Reject'],
          ['Calendar', 'Upcoming rows read from your Sheet', 'Refresh from Google'],
          ['Settings', 'The model dropdown, dry-run, connected Google and Blotato accounts', 'Choose model, toggle dry-run, Connect Google'],
          ['History', 'Past posts with status, model and cost', 'Look, filter'],
        ]}
      />
      <Exercise
        title="Sketch it"
        hint={<p>Rectangles in rectangles, as in step 2.6. A navbar with the four screen names, then the main area of the first screen.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>One big page rectangle. A navbar strip across the top with Today, Calendar, Settings and History.</li>
            <li>Under it, on Today: a stack of draft cards. Each card has the platform and the text, a small &quot;model · cost&quot; label, and three buttons (Edit, Approve, Reject).</li>
            <li>On Settings: a dropdown for the model, a toggle labelled Dry-run, and a &quot;Connect Google&quot; button.</li>
            <li>A thin footer.</li>
          </ul>
        }
      >
        <p>On paper, sketch the Today screen and the Settings screen as rectangles. Photograph them for your <code>/plan</code>.</p>
      </Exercise>

      <Section title="The spec" />
      <p>
        Here is the whole design as a spec. Read it line by line. Every part of it comes from a step in this topic. Make it
        yours: change the details, and attach your sketch.
      </p>
      <CodeBlock language="markdown" title="Spec: Daily Poster" code={DAILY_POSTER_SPEC} />

      <Section title="Reviewing the plan: API checklist" />
      <p>On top of the checklist from step 2.10, an app that talks to outside services needs these checks:</p>
      <Table
        headers={['Check', 'Why']}
        rows={[
          ['Every external call names a doc in docs/api/', 'Proof it was read, not guessed'],
          ['Keys only in secrets.json. Google files git-ignored', 'Nothing secret in git'],
          ['One client module per service in backend/services/', 'Endpoints never call outside services directly'],
          ['No model names, prices or account IDs in code', 'They belong in config'],
          ['A daily cost cap is checked before every AI call', 'Step 4.8. This is your safety net against surprise bills'],
          ['Timeouts, retries only on safe calls, 429 handled', 'Step 4.11'],
          ['Publishing needs approval, dry-run defaults to on, and each row posts once', 'Safe by default'],
          ['Live-data failure creates no draft', 'No invented posts'],
          ['The frontend never holds a key', 'Everything keyed is backend-only'],
          ['Tests use fakes and never post or spend', 'Step 4.11'],
          ['TikTok AI flag and platform rules are handled, not skipped', 'Honesty, and avoiding rejected posts'],
        ]}
      />

      <QuizSet>
        <Quiz
          question="Where does the human sit in the Daily Poster's flow?"
          options={['Before the AI', 'Between the draft and the publish', 'After everything', 'Nowhere']}
          correctIndex={1}
          explanation="You approve each draft before anything is sent to Blotato."
        />
        <Quiz
          question="Why is dry-run on by default?"
          options={['It is faster', 'Nothing can be posted by accident while you test', 'It saves money on Blotato only', 'It is required by Google']}
          correctIndex={1}
          explanation="You turn it off deliberately when you are ready for real posts."
        />
        <Quiz
          question="Does the app write to your Google Sheet?"
          options={['Yes, statuses', 'No, it is read-only and keeps state in its own database', 'Only on Fridays', 'Only titles']}
          correctIndex={1}
          explanation="The scope is read-only, which limits the damage if anything goes wrong."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The flow: Sheet → daily job → live data → AI draft → your approval → Blotato.',
          'Safe by default: dry-run on, approval required, one post per row, failures stop the post.',
          'The Sheet is read-only. The app keeps its own drafts and history in SQLite.',
          'A good spec names the data, endpoints, screens, safety rules and a clear "done when".',
        ]}
      />
    </div>
  );
}
