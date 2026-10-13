import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { GOOGLE_OAUTH_SKILL, SHEET_TEMPLATE } from '../../toolkit/tools_apis';

const LAB_SPEC = `/plan

Build a small backend-only project called google-lab so I can learn Google OAuth.
Follow my saved rules and skills (stack, fullstack-architecture, fastapi-backend,
system-script, google-oauth, external-apis). Use only README.md, docs/, scripts/,
tests/ and backend/ (with a README in each).

Endpoints:
- GET /auth/google/login: start the Google OAuth flow (scope: spreadsheets.readonly only)
- GET /auth/google/callback: finish it, save the tokens, show a short "Connected" page
- GET /auth/google/status: say whether Google is connected
- GET /sheet/rows?spreadsheet_id=...&range=Sheet1!A1:G20: return the rows as JSON

Config:
- config.json holds google_client_file and google_token_file (paths) and the ports
- backend/config/google_client.json is the file I download from Google
- backend/config/google_token.json is created by the callback
- both google_*.json files must be git-ignored. Never print or log a token or secret

Docs: read the Google Sheets API reference and the OAuth 2.0 web server flow docs,
save the pages you rely on in docs/api/, and tell me which doc each call comes from.

Errors: if Google is not connected, or the token cannot be refreshed, return a clear
message telling me to open /auth/google/login, not a crash.

It is done when:
- ./scripts/system.sh --start backend starts it, and /docs lists the endpoints
- opening /auth/google/login takes me through Google and back
- /sheet/rows returns the rows of my Content Calendar sheet
- ./scripts/system.sh --test unit passes (tests use fake responses, never real Google)

Before you write the plan, ask me about anything that is unclear.`;

export default function Step4_5_OauthSheets() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.5 • Google"
        title="Hands-On: Connect Google Sheets With OAuth"
        summary="Build a small lab app that logs in with Google and reads your content calendar. This is the exact flow the Daily Poster will use."
      />

      <p>
        Time to do it for real. You will make a tiny backend-only project, a <strong>lab</strong>, whose only job is to
        connect to Google with OAuth and read rows from a Sheet. Doing it in a small lab first means that when something
        goes wrong, there is little to search through.
      </p>

      <Section title="1. Make your content calendar Sheet" />
      <Steps
        steps={[
          { title: 'Download the CSV template', children: <p>From the Toolkit page, under <em>Project templates → Content calendar</em>. (Or paste the text below into a new Sheet and use <em>Data → Split text to columns</em>.)</p> },
          { title: 'Import it into Google Sheets', children: <p>At <code>sheets.google.com</code> create a blank sheet, then <em>File → Import → Upload</em>, choose the CSV, and replace the spreadsheet. Name it <strong>Content Calendar</strong>.</p> },
          { title: 'Note its ID', children: <p>The address looks like <code>docs.google.com/spreadsheets/d/<strong>1AbC…xyz</strong>/edit</code>. The long part between <code>/d/</code> and <code>/edit</code> is the <strong>spreadsheet ID</strong>.</p> },
        ]}
      />
      <CodeBlock language="markdown" title="content-calendar.csv" code={SHEET_TEMPLATE} />

      <Section title="2. Set up Google Cloud" />
      <Steps
        steps={[
          { title: 'Create a project', children: <p>In the console (step 4.3) create a project called <code>google-lab</code> and select it.</p> },
          { title: 'Enable the API', children: <p><em>APIs &amp; Services → Library</em> → <strong>Google Sheets API</strong> → <strong>Enable</strong>.</p> },
          { title: 'Set up the consent screen', children: <p>Open <em>Google Auth Platform</em> and click <em>Get started</em>. Fill in an app name (&quot;Google Lab&quot;) and your email, choose <strong>External</strong> as the audience, and finish.</p> },
          { title: 'Add the scope', children: <p>Under <em>Data access</em>, add the scope <code>https://www.googleapis.com/auth/spreadsheets.readonly</code>. That is read-only access to Sheets, and nothing else.</p> },
          { title: 'Add yourself as a test user', children: <p>Under <em>Audience</em> add your own Google email as a test user. In Testing status only listed test users can log in.</p> },
          {
            title: 'Create the OAuth client',
            children: (
              <p>
                <em>Clients → Create client</em> (or <em>Credentials → Create credentials → OAuth client ID</em>). Choose{' '}
                <strong>Web application</strong>. Under <em>Authorised redirect URIs</em> add exactly:
                <br />
                <code>http://localhost:8000/auth/google/callback</code>
              </p>
            ),
          },
          { title: 'Download the JSON', children: <p>Click <em>Download JSON</em>. This file holds your client ID and <strong>client secret</strong>. Treat it as a secret.</p> },
        ]}
      />

      <Section title="3. Create the project and place the file" />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'mkdir -p ~/Development/google-lab/backend/config && cd ~/Development/google-lab' },
          { command: 'ls /mnt/c/Users/YourWindowsName/Downloads | grep client_secret', output: 'client_secret_1234-abc.apps.googleusercontent.com.json' },
          { command: 'cp /mnt/c/Users/YourWindowsName/Downloads/client_secret_*.json backend/config/google_client.json' },
          { command: 'chmod 600 backend/config/google_client.json' },
        ]}
      />
      <p>
        You used the same skills as in step T.1: <code>cp</code> to copy from the Windows <code>Downloads</code> folder, and{' '}
        <code>chmod 600</code> so only you can read it. Now open the folder in Antigravity.
      </p>

      <Section title="4. Spec it, plan it, review it" />
      <CodeBlock language="markdown" title="Spec: google-lab" code={LAB_SPEC} />
      <Table
        headers={['Plan review: check', 'Why']}
        rows={[
          ['Scope is only spreadsheets.readonly', 'The smallest permission that works'],
          ['Both google_*.json files are in .gitignore', 'The client secret and the tokens must never reach git'],
          ['Paths come from config.json, not hard-coded', 'Config stays in JSON'],
          ['The redirect URI is exactly http://localhost:8000/auth/google/callback', 'A mismatch makes Google refuse'],
          ['A "state" value is created and checked', 'Protects the login from forged requests'],
          ['No token or secret is printed or logged', 'Logs get shared'],
          ['It saved the docs it used in docs/api/', 'So you can check its claims'],
          ['Tests use fake responses', 'Tests must never call real Google'],
        ]}
      />

      <Section title="5. Run it and connect" />
      <TerminalBlock
        path="~/Development/google-lab"
        lines={[
          { command: 'chmod +x scripts/system.sh' },
          { command: './scripts/system.sh --start backend', output: '[SUCCESS] Backend is running: http://localhost:8000 (docs: http://localhost:8000/docs)' },
        ]}
      />
      <Steps
        steps={[
          { title: 'Open the login address', children: <p>In your Windows browser go to <code>http://localhost:8000/auth/google/login</code>.</p> },
          { title: 'Choose your account', children: <p>You will see &quot;Google hasn&apos;t verified this app&quot;. That is expected: you are the app&apos;s author. Click <em>Advanced</em>, then <em>Go to Google Lab (unsafe)</em>.</p> },
          { title: 'Approve the permission', children: <p>It says the app wants to see your Google Sheets, read-only. Click <em>Continue</em>.</p> },
          { title: 'You land back on your backend', children: <p>A short &quot;Connected&quot; page appears. Check that the token file exists, <strong>without printing it</strong>:</p> },
        ]}
      />
      <TerminalBlock path="~/Development/google-lab" command="ls -l backend/config/" output={'-rw------- 1 anna anna 412 Oct 14 09:12 google_client.json\n-rw------- 1 anna anna 523 Oct 14 09:15 google_token.json'} />
      <Callout type="warning" title="Do not cat the token file">
        Never print <code>google_token.json</code> or paste it into a chat. Checking that it exists with <code>ls -l</code>
        is enough.
      </Callout>
      <Steps
        steps={[
          { title: 'Open Swagger', children: <p>Go to <code>http://localhost:8000/docs</code> and expand <code>GET /sheet/rows</code>.</p> },
          { title: 'Try it', children: <p>Click <em>Try it out</em>, paste your spreadsheet ID and a range such as <code>Sheet1!A1:G10</code>, and <em>Execute</em>. You should get a <code>200</code> and your rows as JSON.</p> },
        ]}
      />
      <Callout type="success" title="Success looks like this">
        Your calendar&apos;s rows appear in the JSON response, and you never gave your app your Google password.
      </Callout>

      <Section title="6. See revoking in action" />
      <p>
        Open <code>myaccount.google.com/permissions</code> and remove &quot;Google Lab&quot;. Call <code>/sheet/rows</code> again.
        You should get a clear &quot;reconnect Google&quot; message and not a crash. Then log in again. This is the power of
        OAuth: you can cut an app off in one click.
      </p>

      <Section title="7. Make it last: In production" />
      <p>
        You are in <strong>Testing</strong> status, so this login stops working in about 7 days. For a daily tool, go to{' '}
        <em>Google Auth Platform → Audience</em>, choose <em>Publish app</em>, and confirm. The app stays unverified (so you
        still see the warning screen, and click through it once), but the 7-day expiry no longer applies. Then log in again.
      </p>

      <Collapsible title="Troubleshooting">
        <Table
          headers={['What you see', 'Cause', 'Fix']}
          rows={[
            [<code key="a">redirect_uri_mismatch</code>, 'The redirect URI in the console is not exactly what the app sent', 'Compare them character by character, including http, localhost and the port'],
            [<code key="b">Access blocked / access_denied</code>, 'Your account is not a test user, or the app is not published', 'Add your email under Audience → Test users'],
            ['403: Google Sheets API has not been used / is disabled', 'The API is not enabled in this project', 'Enable it in the Library, and check the project selector'],
            [<code key="c">invalid_grant</code>, 'The token expired (Testing status) or was revoked', 'Log in again at /auth/google/login'],
            ['404 / "Requested entity was not found"', 'A wrong spreadsheet ID, or the Sheet belongs to another account', 'Copy the ID from the address bar again, and use the same account you logged in with'],
            ['The login page works but the callback fails', 'The state check or the client secret is wrong', 'Look at logs/backend.log and give the exact error to your AI helper'],
          ]}
        />
      </Collapsible>

      <TeachAI kind="skill" name="google-oauth" text={GOOGLE_OAUTH_SKILL} />

      <QuizSet>
        <Quiz
          question="Which redirect URI must be registered in the console for the lab?"
          options={['http://localhost:5173', 'http://localhost:8000/auth/google/callback', 'https://google.com', 'Any address works']}
          correctIndex={1}
          explanation="It must match the callback address your backend serves, exactly."
        />
        <Quiz
          question="Which files must be git-ignored?"
          options={['Only the README', 'google_client.json and google_token.json', 'config.json', 'Nothing']}
          correctIndex={1}
          explanation="The client file has the secret and the token file grants access. Both are secrets."
        />
        <Quiz
          question="You see 'Google hasn't verified this app' on your own lab. What is right?"
          options={['Stop immediately and delete the project', 'It is expected for an unverified personal app: Advanced, then continue', 'Ask Google for a password', 'Use a different Google account for each login']}
          correctIndex={1}
          explanation="Verification is for apps shared widely. For your own use, you can click through."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Set up: enable the API, create a consent screen with a read-only scope, add yourself as a test user, create a Web application client with the exact redirect URI.',
          'The client JSON and the saved token are secrets: git-ignored, chmod 600, never printed.',
          'Run the lab, log in once, and call /sheet/rows from Swagger to see your own rows.',
          'Revoke at myaccount.google.com/permissions. Publish the app (unverified) so authorisation does not expire in 7 days.',
        ]}
      />
    </div>
  );
}
