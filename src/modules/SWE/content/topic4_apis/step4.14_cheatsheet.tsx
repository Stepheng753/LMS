import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_14_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.14 • Reference"
        title="Topic 4 Cheat Sheet"
        summary="Credentials, headers, endpoints, status codes and safety rules for every API in this topic."
      />

      <Section title="Which credential?" />
      <Table
        headers={['Credential', 'Means', 'Use for']}
        rows={[
          ['API key', 'Identifies the project or account', 'AI providers, Blotato, public Google data'],
          ['OAuth', 'A person grants limited access (scopes); you get access + refresh tokens', 'A person\'s own Google Sheets, Drive, Calendar; "Sign in with Google"'],
          ['Service account', 'A robot identity with a key file', 'Server-to-server work with no person. Guard the key file'],
        ]}
      />

      <Section title="Headers by service" />
      <Table
        headers={['Service', 'Base address (https://…)', 'Auth header']}
        rows={[
          ['Blotato', <span key="b1">backend.<wbr />blotato.com/v2</span>, <code key="a">blotato-api-key: &lt;key&gt;</code>],
          ['Claude', <span key="c1">api.anthropic.com/<wbr />v1/messages</span>, <span key="b"><code>x-api-key: &lt;key&gt;</code><br /><code>anthropic-version: 2023-06-01</code></span>],
          ['OpenAI', <span key="o1">api.openai.com/<wbr />v1/responses</span>, <code key="c">Authorization: Bearer &lt;key&gt;</code>],
          ['Gemini', <span key="g1">generativelanguage.<wbr />googleapis.com/<wbr />v1beta/…</span>, <code key="d">x-goog-api-key: &lt;key&gt;</code>],
          ['Google APIs (OAuth)', 'sheets.googleapis.com/…', <code key="e">Authorization: Bearer &lt;access token&gt;</code>],
          ['Open-Meteo', <span key="m1">api.open-meteo.com/<wbr />v1/forecast</span>, 'none (free tier)'],
        ]}
      />
      <Callout type="warning" title="Always confirm against the current docs">
        Endpoints, headers and model names change. These are right as of this course. Check the vendor&apos;s reference page
        before you rely on them.
      </Callout>

      <Section title="curl you will reuse" />
      <Table
        headers={['Command', 'Does']}
        rows={[
          [<code key="a">curl -s &quot;URL&quot; | jq .</code>, 'GET and pretty-print JSON'],
          [<code key="b">curl -s -X POST URL -H &quot;Content-Type: application/json&quot; -d @file.json</code>, 'POST a JSON body from a file'],
          [<code key="c">curl -s -o /dev/null -w &quot;%&#123;http_code&#125;\n&quot; URL</code>, 'Print only the status code'],
          [<code key="d">-H &quot;name: $(jq -r .key_name backend/config/secrets.json)&quot;</code>, 'Use a secret without typing it or saving it in history'],
          [<code key="e">curl -s http://localhost:8000/openapi.json | jq &quot;.paths | keys&quot;</code>, 'List the endpoints of your own backend'],
        ]}
      />

      <Section title="Blotato" />
      <Table
        headers={['Action', 'Call']}
        rows={[
          ['List accounts', 'GET /users/me/accounts, then use each id as accountId'],
          ['Publish', 'POST /posts with {"post": {"accountId", "content": {"text", "mediaUrls", "platform"}, "target": {"targetType"}}}'],
          ['Schedule', 'scheduledTime (ISO with timezone) or useNextFreeSlot, at the TOP level'],
          ['Check status', 'GET /posts/{postSubmissionId} until published or failed'],
          ['Limit', '30 requests per minute'],
        ]}
      />
      <Table
        headers={['Platform', 'Media?', 'Remember']}
        rows={[
          ['Bluesky, X', 'No', 'Text-only works. Good for testing'],
          ['Instagram', 'Yes', 'mediaType: reel or story. A story has no caption'],
          ['TikTok', 'Yes', 'privacyLevel, comment/duet/stitch flags, branded and isAiGenerated (be honest)'],
        ]}
      />

      <Section title="Google OAuth" />
      <Table
        headers={['Term', 'Remember']}
        rows={[
          ['Client type', 'Web application, redirect URI exactly http://localhost:8000/auth/google/callback'],
          ['Scope', 'https://www.googleapis.com/auth/spreadsheets.readonly (smallest that works)'],
          ['Flow', 'Login at Google → code → backend swaps for access + refresh tokens → refresh when expired'],
          ['Files', 'google_client.json and google_token.json: git-ignored, chmod 600, never printed'],
          ['Testing status', 'Authorisation expires after 7 days. Publish the app (unverified) for a daily tool'],
          ['Revoke', 'myaccount.google.com/permissions'],
        ]}
      />

      <Section title="AI models" />
      <BigWarning title="Every AI call costs money">
        <p>
          Prices differ by up to <strong>100 times</strong> between models, and loops, long prompts and forgotten schedules
          multiply them. Set a provider spending limit and an app daily cap, test on the cheapest model, and check the
          usage dashboard. Prices below are a snapshot (October 2026): the provider&apos;s pricing page always wins.
        </p>
      </BigWarning>
      <Table
        headers={['Claude model', 'Model ID', 'Input / 1M tokens', 'Output / 1M tokens']}
        rows={[
          ['Haiku 5.5', <code key="a">claude-haiku-5-5</code>, '$0.10', '$0.50 (more above 100K-token prompts)'],
          ['Sonnet 5.5', <code key="b">claude-sonnet-5-5</code>, '$2.00', '$10.00'],
          ['Sonnet 5', <code key="c">claude-sonnet-5</code>, '$2.00', '$10.00'],
          ['Opus 5.5', <code key="d">claude-opus-5-5</code>, '$4.00', '$20.00'],
          ['Opus 5', <code key="e">claude-opus-5</code>, '$5.00', '$25.00'],
          ['Fable 5.1', <code key="f">claude-fable-5-1</code>, '$10.00', '$50.00'],
        ]}
      />
      <ul className="list-disc pl-5 space-y-1">
        <li>Check OpenAI&apos;s and Google&apos;s pricing pages for their current models and prices.</li>
        <li>Model names and prices live in <code>config.json</code>. Keys live in <code>secrets.json</code>.</li>
        <li>Prompt = system (voice, rules) + user (task + data). Say &quot;use only the data you are given&quot;.</li>
      </ul>

      <Section title="Status codes for API clients" />
      <Table
        headers={['Code', 'Meaning', 'Do']}
        rows={[
          ['200 / 201', 'OK / accepted (201 for a publish only means accepted)', 'Continue, or poll the status'],
          ['400 / 422', 'Your request is wrong', 'Do not retry. Fix it'],
          ['401 / 403', 'Bad key, expired login, or API not enabled', 'Do not retry. Check the key, reconnect, enable the API'],
          ['404', 'Wrong path or ID', 'Do not retry'],
          ['429', 'Rate limited', 'Wait for Retry-After, then retry'],
          ['500 / 502 / 503', 'Their server failed', 'Retry with backoff, then give up'],
        ]}
      />

      <Section title="Reading docs" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>Find the seven answers: base URL, auth, endpoint, request, response, limits, plan requirements.</li>
        <li>Trust order: vendor reference, then OpenAPI spec, then examples, then blogs, then AI memory.</li>
        <li>Save the real docs in <code>docs/api/</code> and tell <code>/plan</code> to read them and cite the source of every call.</li>
        <li>Check: find each call in the docs, ask what was inferred, and smoke-test with <code>curl</code>.</li>
      </ol>

      <Section title="Safety rules" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Keys only in git-ignored files, read only by the backend. Revoke immediately if one leaks.</li>

        <li>Timeouts on everything. Retry only safe requests, with backoff.</li>
        <li>Never auto-retry a publish. Save a unique key first, and never send it twice.</li>
        <li>If live data is missing, create no draft. If the AI fails, post nothing.</li>
        <li>Dry-run on by default, human approval for every post, test accounts first.</li>
        <li>Spending limit at the provider, a daily cost cap in the app, and the cheapest model while testing.</li>
        <li>Tests use fake responses and never post or spend.</li>
      </ul>

      <KeyTakeaways
        items={[
          'API key = which project, OAuth = a person\'s permission, service account = the app itself.',
          'Every API needs the seven answers from its docs. Save them in docs/api/ and trust the vendor\'s reference first.',
          'Blotato posts, the AI writes, Google Sheets plans. Your app joins them with approval in the middle.',
          'Be safe by default: limits, timeouts, no blind retries, dry-run, approval and test accounts.',
        ]}
      />
    </div>
  );
}
