import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { SECRETS_EXAMPLE } from '../topic_toolkit/tools/tools_apis';

export default function Step4_13_Project() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.13 • Project D"
        title="Project D: Build the Daily Poster"
        summary="Build, test and run your AI content app. Dry-run first, a real post to a test account second, then a daily schedule."
      />

      <p>
        This project joins everything in the topic: a Sheet read through OAuth, a model you can switch, live data, a human
        approval, and Blotato. You will build it with the spec-and-plan routine you know, then bring it up carefully,
        <strong> one real thing at a time</strong>.
      </p>
      <Callout type="info" title="You are your own judge, and there is no pressure to keep it">
        As with the earlier projects, there is no hidden check. Press <strong>Mark as Complete</strong> when the checklist at
        the bottom is true. This is a learning project. If you decide not to keep it running, the clean-up section at the end
        shows how to switch everything off safely.
      </Callout>

      <Section title="What you need before you start" />
      <Table
        headers={['You need', 'From']}
        rows={[
          ['A Google Cloud project with the Sheets API and an OAuth Web client', 'Step 4.5 (you can reuse the client file from google-lab)'],
          ['Your Content Calendar Sheet with a few rows for today and tomorrow', 'Step 4.5'],
          ['At least one AI key (Claude, OpenAI or Gemini) with a spending limit set at the provider', 'Steps 4.2 and 4.7. Do not skip the limit'],
          ['A Blotato key, and a throw-away Bluesky test account connected', 'Step 4.6'],
          ['Your saved skills: stack, fullstack-architecture (updated), fastapi-backend, system-script, testing, google-oauth, llm-providers, social-posting, external-apis', 'Steps 2.x to 4.10'],
        ]}
      />

      <Section title="Build it" />
      <Steps
        steps={[
          {
            title: 'Make the project and open it',
            children: (
              <TerminalBlock
                path="~"
                lines={[
                  { command: 'mkdir -p ~/Development/daily-poster/backend/config && cd ~/Development/daily-poster' },
                  { command: 'cp ~/Development/google-lab/backend/config/google_client.json backend/config/' },
                  { command: 'nano backend/config/secrets.json' },
                  { command: 'chmod 600 backend/config/secrets.json backend/config/google_client.json' },
                ]}
              />
            ),
          },
          {
            title: 'Put your keys in secrets.json',
            children: (
              <>
                <p>Paste this shape and fill in only the keys you have (leave the others empty, and the app shows those providers as unavailable):</p>
                <CodeBlock language="json" title="backend/config/secrets.json" code={SECRETS_EXAMPLE} />
              </>
            ),
          },
          {
            title: 'Save the docs the AI will need',
            children: <p>Create <code>docs/api/</code> and save the documentation for Blotato, the Google Sheets API, each AI provider you will use, and your data source (step 4.10). Add a short <code>README.md</code> saying where each came from.</p>,
          },
          {
            title: 'Open the folder in Antigravity and write the spec',
            children: <p>Start from the Daily Poster spec in step 4.12 (it is also in your Toolkit). Adapt it, attach your paper sketch, and run <code>/plan</code>. Answer its questions.</p>,
          },
          {
            title: 'Review the plan twice',
            children: <p>First with the checklist from step 2.10, then with the API checklist from step 4.12. Leave comments until it is right: especially the safe-by-default rules, the model list in config, and nothing keyed in the frontend.</p>,
          },
          {
            title: 'Approve, build, and run',
            children: (
              <TerminalBlock
                path="~/Development/daily-poster"
                lines={[
                  { command: 'chmod +x scripts/system.sh scripts/daily_run.sh' },
                  { command: './scripts/system.sh --start all', output: '[SUCCESS] Backend is running: http://localhost:8000\n[SUCCESS] Frontend is running: http://localhost:5173' },
                ]}
              />
            ),
          },
        ]}
      />

      <BigWarning title="Before the first AI call: cost check">
        <ul>
          <li>You have set a <strong>spending limit</strong> at the AI provider, and a <code>max_daily_cost_usd</code> in your app&apos;s <code>config.json</code> (for example 1.00).</li>
          <li>You are testing on the <strong>cheapest model</strong> (Claude Haiku 5.5). Do not switch to a premium model until everything else works.</li>
          <li>You have re-read the cost warning in step 4.7, and you know where the provider&apos;s <strong>usage dashboard</strong> is.</li>
          <li>The daily job is <strong>off</strong> (no cron line) until you have watched it work by hand.</li>
        </ul>
      </BigWarning>

      <Section title="Bring it up, carefully" />
      <p>Work through these in order. Each one proves one more piece, and nothing posts for real until the last stage.</p>
      <Steps
        steps={[
          {
            title: 'Connect Google',
            children: <p>Open the app, go to <em>Settings → Connect Google</em>, go through the Google login (the unverified-app warning is expected) and return. The <em>Calendar</em> screen should show your Sheet&apos;s upcoming rows.</p>,
          },
          {
            title: 'Run the daily job by hand',
            children: (
              <>
                <TerminalBlock path="~/Development/daily-poster" command="./scripts/daily_run.sh" output="[INFO] 3 rows for today. [SUCCESS] 3 drafts created." />
                <p>Open <em>Today</em>. Each row should be a draft with the platform, the text, the model that wrote it and what it cost. A row with a <code>data_url</code> should mention the real, current data.</p>
              </>
            ),
          },
          {
            title: 'Switch models and compare',
            children: <p>In <em>Settings</em> pick a different model (the app will ask you to confirm a premium one), then <em>Regenerate</em> a draft. Compare tone, length and cost. This is the model switcher doing its job. Keep an eye on the &quot;spend today&quot; figure.</p>,
          },
          {
            title: 'Check the failure paths',
            children: <p>Temporarily break something on purpose: a wrong <code>data_url</code>, or clear one provider&apos;s key. The app should show a clear error and create <strong>no</strong> draft or post, and never crash.</p>,
          },
          {
            title: 'Approve in dry-run',
            children: <p>With dry-run <strong>on</strong>, approve a Bluesky draft. The app shows the exact request it <em>would</em> send, and sends nothing. Compare it to Blotato&apos;s documentation: the right header, <code>accountId</code>, <code>content</code> and <code>target</code>.</p>,
          },
          {
            title: 'One real post to the test account',
            children: <p>Turn dry-run <strong>off</strong>, approve a single harmless Bluesky draft, and watch its status go from scheduled to published. Check the test account to confirm. Turn dry-run back on.</p>,
          },
          {
            title: 'Make the daily run automatic',
            children: (
              <>
                <TerminalBlock path="~" command="crontab -e" />
                <CodeBlock language="bash" title="crontab (every morning at 7:00)" code={`0 7 * * * /home/anna/Development/daily-poster/scripts/daily_run.sh >> /home/anna/daily-poster.log 2>&1`} />
                <p>You used the same cron line shape in step 3.22. The job only <em>creates drafts</em>. Nothing publishes until you approve.</p>
                <Callout type="warning" title="Your computer must be on">
                  In WSL, cron only runs while WSL itself is running and its scheduler is enabled. A closed laptop means no
                  7:00 run. Test with a time two minutes from now. For reliable daily runs, the always-on homelab is the right
                  home, and that is the optional step below.
                </Callout>
              </>
            ),
          },
          {
            title: 'Run the tests and check for secrets',
            children: (
              <TerminalBlock
                path="~/Development/daily-poster"
                lines={[
                  { command: './scripts/system.sh --test all' },
                  { command: 'git ls-files | grep -E "secrets|google_"', output: '(nothing should be printed)' },
                ]}
              />
            ),
          },
        ]}
      />

      <Section title="Optional: deploy it to your homelab" />
      <p>
        A daily job belongs on a machine that is always on. If you want to keep this app, your Topic 3 skills apply directly.
        You do not have to.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Containerize and deploy it with your <code>docker-deploy</code> and <code>ci-cd-deploy</code> skills.</li>
        <li><code>secrets.json</code>, <code>google_client.json</code> and the database live on the server only, created by hand, never in git.</li>
        <li>Add the server&apos;s <strong>https</strong> callback address, for example <code>https://poster.&lt;your-domain&gt;/auth/google/callback</code>, to the OAuth client&apos;s authorised redirect URIs, and put the same address in the app&apos;s config. Then do the Google login once, through the domain.</li>
        <li>Run <code>daily_run.sh</code> from cron on the server.</li>
        <li>Keep it private: reach it over Tailscale, and never expose the approval screen to the public internet.</li>
      </ul>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Google login fails:</strong> use the table in step 4.5 (redirect mismatch, test users, disabled API).</li>
          <li><strong>The Calendar is empty:</strong> check the spreadsheet ID and range in the app&apos;s config, the column names, and that the dates are in the format YYYY-MM-DD.</li>
          <li><strong>No drafts for a row:</strong> the row&apos;s <code>data_url</code> may have failed (that is by design). Read the error on the screen.</li>
          <li><strong>A provider shows as unavailable:</strong> its key is missing or empty in <code>secrets.json</code>.</li>
          <li><strong>Blotato rejects a post:</strong> compare the request with the docs. Instagram and TikTok need public media and their extra fields.</li>
          <li><strong>Always:</strong> check <code>logs/backend.log</code>, and give your AI helper the exact message.</li>
        </ul>
      </Collapsible>

      <Section title="If you don't keep it: clean up" />
      <Steps
        steps={[
          { title: 'Stop it and remove the schedule', children: <p><code>./scripts/system.sh --stop all</code> and delete the line with <code>crontab -e</code>.</p> },
          { title: 'Revoke Google access', children: <p>Remove the app at <code>myaccount.google.com/permissions</code>, and delete the OAuth client in the console.</p> },
          { title: 'Delete or rotate the keys', children: <p>Delete the AI and Blotato keys at each provider. Cancel the Blotato plan if you started one for this.</p> },
          { title: 'Remove the local secrets', children: <p>Delete <code>secrets.json</code> and the Google files from the project folder.</p> },
        ]}
      />

      <Section title="Checklist: you are done when" />
      <ul className="list-disc pl-5 space-y-1">
        <li>I connected my own Google account with OAuth, and the app shows my Sheet&apos;s rows.</li>
        <li>The daily job created drafts, with the model and cost shown on each, using live data where a row asked for it.</li>
        <li>I set a spending limit at the provider and a daily cost cap in the app, and I tested on the cheapest model first.</li>
        <li>I switched models, regenerated a draft, compared the results, and checked what each cost in the provider&apos;s dashboard.</li>
        <li>With the cap set very low, the app stopped generating and said why.</li>
        <li>A failing data source or missing key produced a clear error and <strong>no</strong> draft or post.</li>
        <li>In dry-run, approving showed the exact Blotato request and sent nothing, and I checked it against the docs.</li>
        <li>I published one real post to a test account, and saw the status change to published.</li>
        <li>No key or Google file is in git, and the tests pass without calling any real service.</li>
        <li>My daily run is scheduled, <em>or</em> I understand why it needs an always-on machine.</li>
        <li>I saved my new skills: external-apis, google-oauth, llm-providers and social-posting.</li>
      </ul>
      <p>
        When every line is honestly true, press <strong>Mark as Complete</strong>.
      </p>

      <KeyTakeaways
        items={[
          'You built an API-powered app with OAuth, a model switcher, live data, human approval and posting through Blotato.',
          'You brought it up in safe stages: draft, dry-run, one real test post, then a schedule.',
          'Keys and Google files stayed out of git, and tests used fakes.',
          'A daily job needs an always-on machine. If you do not keep the project, the clean-up steps switch everything off.',
        ]}
      />
    </div>
  );
}
