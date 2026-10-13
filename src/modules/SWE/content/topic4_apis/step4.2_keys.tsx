import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Compare } from '../../../../components/content/Compare';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { SECRETS_EXAMPLE } from '../../toolkit/tools_apis';

export default function Step4_2_Keys() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.2 • Basics"
        title="Keys, Tokens & Secrets"
        summary="How an API knows who you are, the different ways of proving it, and how to keep every secret safe."
      />

      <p>
        Open APIs like Open-Meteo answer anyone. Most APIs do not. They need to know <em>who</em> is asking, so they can
        charge the right account, apply the right limits, and protect private data. Proving who you are is called{' '}
        <strong>authentication</strong>, and there are several ways to do it.
      </p>

      <Section title="The kinds of credentials" />
      <Table
        headers={['Kind', 'What it is', 'Sent as', 'Typical use']}
        rows={[
          [<strong key="a">None</strong>, 'No proof needed', '-', 'Free public data (Open-Meteo)'],
          [<strong key="b">API key</strong>, 'A long secret string tied to your account or project', 'A header such as x-api-key, or a query parameter', 'AI providers, Blotato, public Google APIs'],
          [<strong key="c">Bearer token</strong>, 'A token that proves a login or permission', 'Authorization: Bearer <token>', 'OAuth access tokens'],
          [<strong key="d">OAuth</strong>, 'A person grants your app limited access to their account; you receive tokens', 'Authorization: Bearer <access token>', 'Acting on someone\'s Google data (step 4.4)'],
          [<strong key="e">Service account</strong>, 'A robot identity for the app itself, with a key file', 'A token made from the key file', 'Server-to-server work with no person involved'],
        ]}
      />
      <p>
        The same idea underlies all of them: <strong>a secret that only you should know</strong>, which the API checks on
        every request.
      </p>

      <Callout type="warning" title="A key is a credit card with no PIN">
        Whoever holds your AI provider key can run up charges on your account, and nobody will ask them for a password. Treat
        every key as money. If a key leaks, <strong>revoke it at the provider immediately</strong> and make a new one.
      </Callout>

      <Section title="Where keys live" />
      <p>
        In your projects, every secret goes in <code>backend/config/secrets.json</code>, the file that git ignores (step 3.4).
        Here is the shape the Daily Poster will use:
      </p>
      <CodeBlock language="json" title="backend/config/secrets.json" code={SECRETS_EXAMPLE} />
      <Compare
        goodLabel="Do"
        badLabel="Never"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>Keep keys in <code>secrets.json</code>, read by the backend only</li>
            <li>Check <code>git ls-files | grep secrets</code> prints nothing</li>
            <li>Give each project its own key, so you can revoke one without breaking the rest</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>Paste a key into code, a chat, a screenshot or an email</li>
            <li>Put a key in the frontend. Anyone can read it in the browser</li>
            <li>Put a key in a URL: addresses get stored in logs and history</li>
          </ul>
        }
      />
      <Callout type="info" title="Providers watch for leaks">
        Some providers scan public GitHub for their keys and disable any they find. That is a safety net, not a plan. By the
        time it happens, the key has often already been copied.
      </Callout>

      <Section title="Use a key in curl without typing it" />
      <p>
        If you type a key straight into a terminal, it is saved in your command history. A tidier trick: let{' '}
        <code>jq</code> read it from <code>secrets.json</code> while the command runs.
      </p>
      <TerminalBlock
        path="~/Development/daily-poster"
        lines={[
          {
            command: `curl -s https://backend.blotato.com/v2/users/me/accounts -H "blotato-api-key: $(jq -r .blotato_api_key backend/config/secrets.json)"`,
            output: '{"items":[{"id":"98432","platform":"bluesky", ...}]}',
          },
        ]}
      />
      <p>
        <code>$(...)</code> runs a command and drops its output into the line. Here <code>jq -r .blotato_api_key</code> reads
        the key out of the file. (<code>-r</code> prints it without quotes.) You will use this pattern in the next steps.
      </p>

      <Section title="Limits, quotas and bills" />
      <Table
        headers={['Idea', 'Meaning', 'What to do']}
        rows={[
          ['Rate limit', 'The most requests you may send per minute or second. Over it, you get 429 Too Many Requests', 'Slow down. Wait the time in the Retry-After header'],
          ['Quota', 'A daily or monthly allowance, often per project', 'Know the number before you build around it'],
          ['Pricing', 'Many APIs charge per use (AI models charge per token)', 'Estimate cost before you automate'],
          ['Spend limit', 'A cap you set at the provider so a bug cannot spend without end', 'Set one before your first call'],
        ]}
      />
      <Callout type="tip" title="Set the limit first">
        Before you make a single AI call, find the billing or &quot;limits&quot; page in the provider&apos;s dashboard, add
        a small prepaid balance or monthly budget (a few dollars is plenty), and turn on any usage alerts. A loop that calls
        the API by mistake will then stop instead of costing you.
      </Callout>

      <Section title="Polling and webhooks" />
      <p>
        Some actions are not instant. Publishing a post can take seconds or minutes. There are two ways to learn when it
        finishes:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Polling:</strong> your app asks again every few seconds: &quot;is it done yet?&quot; Simple, and what we use with Blotato.</li>
        <li><strong>Webhook:</strong> the API calls <em>your</em> address when it is done. Efficient, but your app must be reachable from the internet.</li>
      </ul>

      <Collapsible title="If you leak a key">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Revoke or delete it in the provider&apos;s dashboard straight away.</li>
          <li>Create a new one and put it in <code>secrets.json</code>.</li>
          <li>Check the provider&apos;s usage page for charges you do not recognise.</li>
          <li>If it was committed to git, remember that deleting the file does not remove it from history (step 3.4). The revoked key is the real fix.</li>
        </ol>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Where should an AI provider key live in your app?"
          options={['In the React code', 'In backend/config/secrets.json, read only by the backend', 'In the URL', 'In the README']}
          correctIndex={1}
          explanation="Secrets stay on the backend, in a git-ignored file."
        />
        <Quiz
          question="You get a 429 response. What does it mean?"
          options={['Your key is wrong', 'You sent too many requests, so wait and retry', 'The server crashed', 'The page does not exist']}
          correctIndex={1}
          explanation="429 means rate limited. Respect the Retry-After header."
        />
        <Quiz
          question="A key was committed to GitHub and then deleted. What must you do?"
          options={['Nothing', 'Revoke the key and make a new one', 'Rename the file', 'Wait a week']}
          correctIndex={1}
          explanation="The key is still in git history and may have been copied. Only revoking it makes it safe."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Authentication proves who is asking: API key, bearer token, OAuth or a service account.',
          'Keys are money. They live only in secrets.json, read only by the backend.',
          'jq -r reads a key from the file so it never appears in your command history.',
          'Set spending limits before your first call. Respect rate limits and 429.',
        ]}
      />
    </div>
  );
}
