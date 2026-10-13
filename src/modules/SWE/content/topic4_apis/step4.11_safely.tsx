import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_11_Safely() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.11 • Docs"
        title="Calling APIs Safely"
        summary="Other people's servers fail, slow down and say no. Learn the habits that stop a small problem becoming a double post or a surprise bill."
      />

      <p>
        When your code only talks to your own database, almost everything works. When it talks to the internet, things go
        wrong regularly: a timeout, an overloaded server, a rate limit, a surprise answer. A good integration expects this.
        You do not write the code, but you review a plan for it, so you need to know what &quot;handles failure properly&quot;
        looks like.
      </p>

      <Section title="What goes wrong, and what to do" />
      <Table
        headers={['Failure', 'What it looks like', 'The right response']}
        rows={[
          ['Slow or hung server', 'No answer', 'A timeout, so the job never waits forever'],
          ['Temporary server trouble', '500, 502, 503', 'Retry a few times with growing pauses, then give up'],
          ['Rate limited', '429 and a Retry-After header', 'Wait the time it asks. Do not hammer it'],
          ['Wrong key or expired login', '401 or 403', 'Do not retry. Show "check your key" or "reconnect Google"'],
          ['Bad request', '400 or 422', 'Do not retry. Your request is wrong. Log what you sent (without secrets) and show the message'],
          ['Not found', '404', 'Do not retry. A wrong address or ID'],
          ['Network down', 'Connection error', 'Retry a few times, then give up cleanly'],
          ['AI refused or gave empty text', '200 but no usable text', 'Treat it as a failed draft. Show why, and do not post'],
        ]}
      />

      <Section title="Retry with backoff" />
      <p>
        <strong>Backoff</strong> means pausing longer after each failed try, giving a struggling server room to recover.
        Retrying instantly, many times, makes things worse. A typical pattern:
      </p>
      <Steps
        steps={[
          { title: 'Try 1 fails with 503', children: <p>Wait 1 second.</p> },
          { title: 'Try 2 fails', children: <p>Wait 2 seconds.</p> },
          { title: 'Try 3 fails', children: <p>Wait 4 seconds.</p> },
          { title: 'Try 4 fails', children: <p>Give up. Record the failure, show a clear message, and leave the item to retry later, by a person or the next scheduled run.</p> },
        ]}
      />
      <Callout type="info" title="Retries are only for safe requests">
        Retrying a <em>read</em> (GET) is harmless. Retrying something that <em>does</em> something, such as publishing a post
        or charging a card, can do it twice. That is the next section.
      </Callout>

      <Section title="Never post twice: idempotency" />
      <p>
        Imagine your app sends a publish request, and the network drops before the answer arrives. Did the post go out? If
        your code simply retries, the same post might appear twice on a real account. Two habits prevent that:
      </p>
      <Compare
        goodLabel="Safe"
        badLabel="Risky"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>Give each action a unique key (for example date + platform + row) and save it <em>before</em> sending</li>
            <li>Check the saved record before any send, and never send a key twice</li>
            <li>If the result is unknown, mark it &quot;unknown&quot; and let a person check the account</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>Auto-retry a publish request on a timeout</li>
            <li>Assume that no answer means it failed</li>
            <li>Rely on remembering what you sent in memory, which is lost on restart</li>
          </ul>
        }
      />

      <Section title="Rate limits and politeness" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Know each API&apos;s limits (Blotato: 30 requests a minute) and stay well under them.</li>
        <li>Process rows one after another, not in a thousand parallel requests.</li>
        <li>Cache data that does not change, instead of asking again.</li>
        <li>On a 429, read the <code>Retry-After</code> header and wait.</li>
      </ul>

      <Section title="Keeping costs under control" />
      <Table
        headers={['Habit', 'How']}
        rows={[
          ['Cap the reply', 'Set max_tokens to a sensible number, like 400 for a post'],
          ['Cap the volume', 'A limit on drafts per day, and a hard stop in the job if exceeded'],
          ['Record usage', 'Save tokens and estimated cost on every draft, and show a running total'],
          ['Choose the model deliberately', 'A cheap model for simple tasks (step 4.7)'],
          ['Set limits at the provider', 'So a bug cannot spend more than the cap'],
        ]}
      />

      <Section title="Check what the AI wrote before it goes anywhere" />
      <p>AI text is a draft, never a finished product. Before it can even reach your approval screen, the app should check:</p>
      <Table
        headers={['Check', 'Why']}
        rows={[
          ['Not empty, not just whitespace', 'Models sometimes return nothing'],
          ['Within the platform\'s length limit', 'Bluesky and X have character limits'],
          ['Numbers match the data you supplied', 'Models can slip in invented figures'],
          ['No leftover instructions or markers', 'Such as "Here is your post:"'],
          ['No secrets or private text echoed back', 'Only data you chose to send should appear'],
        ]}
      />
      <p>And then a person approves it. Always.</p>

      <Section title="Logging, without leaking" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Do log:</strong> what was called, the status code, how long it took, which row, which model.</li>
        <li><strong>Never log:</strong> API keys, tokens, client secrets, or full request headers.</li>
        <li><strong>Check error messages too.</strong> Some libraries print the failing URL or headers in an exception.</li>
      </ul>

      <Section title="Testing without spending money" />
      <Table
        headers={['Kind of test', 'Uses', 'Costs money?']}
        rows={[
          ['Unit tests (tests/unit)', 'Fake responses made up in the test. The real API is never called', 'No'],
          ['System tests (tests/system)', 'Your own running backend, with every external call replaced by a fake', 'No'],
          ['Real-account checks (tests/manual)', 'A written checklist you run by hand against a test account, with dry-run first', 'A little, deliberately'],
        ]}
      />
      <Callout type="warning" title="Automated tests must never post or spend">
        A test that calls a real AI model or posts to a real account is a bug waiting to happen: it runs on every change,
        possibly in a pipeline, and could spend money or post in public. Keep real calls in manual checklists.
      </Callout>

      <Collapsible title="If a key is exposed">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Revoke it at the provider, immediately.</li>
          <li>Make a new key and update <code>secrets.json</code>.</li>
          <li>Check the provider&apos;s usage page for charges you did not make.</li>
          <li>Look for where it leaked: a log, a screenshot, a commit.</li>
        </ol>
      </Collapsible>

      <Exercise
        title="Should it retry?"
        hint={<p>Think about whether the request <em>changes</em> something on the other side, and whether you can tell if it worked.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>GET weather returns 503:</strong> yes, retry with backoff. It is a read and is safe to repeat.</li>
            <li><strong>POST to publish a post times out:</strong> no automatic retry. You cannot tell whether it went out. Mark it &quot;unknown&quot; and let a person check the account.</li>
            <li><strong>AI call returns 429:</strong> yes, wait the Retry-After time, then retry. A generation can safely be re-run (it only costs a little).</li>
            <li><strong>Any call returns 401:</strong> no. The key is wrong, so retrying cannot help. Show a clear message.</li>
          </ul>
        }
      >
        <p>For each, say whether the app should retry automatically: (1) GET weather returns 503. (2) POST to publish times out. (3) The AI call returns 429. (4) Any call returns 401.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What does exponential backoff mean?"
          options={['Retry as fast as possible', 'Wait longer after each failed attempt', 'Retry once', 'Never retry']}
          correctIndex={1}
          explanation="Pauses grow (1s, 2s, 4s...), giving a struggling server time to recover."
        />
        <Quiz
          question="A publish request times out. What should the app do?"
          options={['Retry automatically', 'Mark the result as unknown and let a person check', 'Delete the draft', 'Post to every platform']}
          correctIndex={1}
          explanation="You cannot tell if it went out. Auto-retrying could post twice."
        />
        <Quiz
          question="Should automated tests call the real Blotato or AI APIs?"
          options={['Yes, always', 'No. Use fake responses, and keep real calls in manual checklists', 'Only on weekends', 'Only for AI']}
          correctIndex={1}
          explanation="Real calls can spend money or post publicly on every test run."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Expect failures: set timeouts, retry safe requests with backoff, and honour Retry-After on 429.',
          'Do not retry 401, 400 or 404. They will not fix themselves.',
          'Never retry a publish blindly. Save a unique key first, never send it twice, and mark unknown results for a person to check.',
          'Cap tokens and volume, record usage, check AI text before it reaches approval, and log without secrets.',
          'Tests use fakes. Real-account checks are manual.',
        ]}
      />
    </div>
  );
}
