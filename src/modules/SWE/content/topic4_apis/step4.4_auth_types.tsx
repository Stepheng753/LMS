import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_4_AuthTypes() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.4 • Google"
        title="API Key vs OAuth vs Service Account"
        summary="Three ways to prove who you are to Google. Learn what each one is for, and why OAuth is the practical choice when an app touches a person's own data."
      />

      <p>
        When you click <em>Create credentials</em> in the console, Google offers three options. They look similar, but they
        answer three different questions. Picking the wrong one is the most common first mistake with Google APIs.
      </p>

      <Section title="Three analogies" />
      <Table
        headers={['Credential', 'Think of it as', 'It answers']}
        rows={[
          [<strong key="a">API key</strong>, 'A visitor badge for your project', '"Which app is this?" It identifies the project so Google can count usage. It does not identify a person'],
          [<strong key="b">OAuth</strong>, 'A permission slip signed by a person', '"May this app do these specific things with my account?" The person says yes (and can take it back)'],
          [<strong key="c">Service account</strong>, 'An employee badge for the app itself', '"This is the app, acting as itself." It is a separate robot account with its own key file'],
        ]}
      />

      <Section title="When to use which" />
      <Table
        headers={['Situation', 'Use']}
        rows={[
          ['Reading public data that anyone could read (public maps, a public video search)', <strong key="1">API key</strong>],
          [<span key="s2">Your app needs to read or change <em>a person&apos;s own</em> Sheet, Drive, Calendar or Gmail</span>, <strong key="2">OAuth</strong>],
          ['A backend job runs with no person involved, on data that belongs to the project itself', <strong key="3">Service account</strong>],
          ['A website with a "Sign in with Google" button', <strong key="4">OAuth</strong>],
        ]}
      />
      <Callout type="info" title="Why this course uses OAuth">
        In the Daily Poster the Sheet is <em>your</em> Sheet. With OAuth you just click &quot;Connect Google&quot;, approve
        read-only access to your own spreadsheets, and revoke it whenever you like at{' '}
        <code>myaccount.google.com/permissions</code>. A service account would be a separate robot with its own key file,
        and you would have to share the Sheet with the robot&apos;s email address. For apps that work with a real person&apos;s
        data, OAuth is also what you will meet everywhere else: Instagram, TikTok, GitHub, Spotify.
      </Callout>

      <Section title="OAuth, step by step" />
      <p>
        OAuth is the one worth understanding properly. The key idea: your app <strong>never sees the person&apos;s password</strong>.
        Google does the login, and your app only receives a limited token.
      </p>
      <Steps
        steps={[
          { title: 'You click "Connect Google" in the app', children: <p>The backend sends your browser to Google, carrying four things: the app&apos;s <strong>client ID</strong>, the <strong>scopes</strong> it wants, the <strong>redirect URI</strong> to return to, and a random <strong>state</strong> value.</p> },
          { title: 'Google asks you to log in and approve', children: <p>You see the <strong>consent screen</strong>: &quot;This app wants to view your Google Sheets.&quot; Your password goes to Google only.</p> },
          { title: 'Google sends you back with a code', children: <p>Your browser returns to the redirect URI with a one-time <strong>code</strong> and your <strong>state</strong>. The app checks that the state matches, which stops forged requests.</p> },
          { title: 'The backend swaps the code for tokens', children: <p>It sends the code, plus the app&apos;s <strong>client secret</strong>, to Google, directly server to server. Google replies with an <strong>access token</strong> and a <strong>refresh token</strong>.</p> },
          { title: 'The backend stores the tokens safely', children: <p>In a git-ignored file. They are as sensitive as passwords.</p> },
          { title: 'Calls use the access token', children: <p>Each request carries <code>Authorization: Bearer &lt;access token&gt;</code>. Google checks it covers the scope being used.</p> },
          { title: 'When it expires, refresh it', children: <p>Access tokens last about an hour. The backend quietly trades the refresh token for a new one, with no person involved. That is what lets a daily job keep running.</p> },
        ]}
      />
      <Table
        headers={['Term', 'Meaning']}
        rows={[
          [<code key="a">client ID / client secret</code>, 'The app\'s own name and password, made in the console. The secret must stay on the backend'],
          [<Term key="b" definition="One specific permission, like read-only access to Google Sheets. Apps should ask for the smallest scope that works.">scope</Term>, 'One specific permission. Ask for the smallest one that does the job'],
          [<code key="c">redirect URI</code>, 'Where Google sends the person back. It must match what you registered, character for character'],
          [<code key="d">access token</code>, 'A short-lived pass (about an hour) used on each request'],
          [<code key="e">refresh token</code>, 'A long-lived key for getting new access tokens. Guard it like a password'],
        ]}
      />

      <Compare
        goodLabel="OAuth"
        badLabel="Sharing a password or key"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>You never give the app your Google password</li>
            <li>It can do only what the scope allows (read-only Sheets)</li>
            <li>You can revoke it in one click</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>The app would hold a full login</li>
            <li>It could do everything you can</li>
            <li>You would have to change your password to cut it off</li>
          </ul>
        }
      />

      <Section title="Testing vs production, and the warning screen" />
      <p>
        On the consent screen, an app has a <strong>publishing status</strong>. Two facts matter for a personal app:
      </p>
      <Table
        headers={['Status', 'Who can use it', 'The catch']}
        rows={[
          ['Testing', 'Only people you list as test users (up to 100)', 'Authorisations expire after 7 days, so a daily job would stop working every week'],
          ['In production (unverified)', 'Any Google account, but a new-user limit applies until verified', 'People see a "Google hasn\'t verified this app" warning. Fine for yourself: click Advanced, then continue'],
        ]}
      />
      <p>
        For a personal tool used by one person, set the app to <strong>In production</strong> and accept the warning on your
        own account. Full Google verification is for apps shared with the public, and involves a review.
      </p>

      <Callout type="warning" title="About service account keys">
        If you ever do use a service account, its downloaded JSON key file can act as the robot forever, and it never expires
        by itself. It is the riskiest file in this topic. Prefer attaching a service account to a cloud service, or using
        OAuth, whenever you can.
      </Callout>

      <Exercise
        title="Pick the credential"
        hint={<p>Ask: is a person&apos;s own data involved? Is a person present to approve? Is the data public?</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Show the public ratings of a YouTube video on your site: <strong>API key</strong> (public data).</li>
            <li>Read a user&apos;s own Google Calendar events: <strong>OAuth</strong>.</li>
            <li>A nightly job reads a spreadsheet owned by your own project, with no person present: <strong>service account</strong> (or OAuth with a stored refresh token).</li>
            <li>Let people log in to your site with their Google account: <strong>OAuth</strong>.</li>
          </ol>
        }
      >
        <p>Which credential fits each? (1) Show public video ratings on your site. (2) Read a user&apos;s own Calendar. (3) A nightly job reads a spreadsheet that belongs to your project. (4) A &quot;Sign in with Google&quot; button.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What does an API key tell Google?"
          options={['Which person is logged in', 'Which project is making the request', 'That a person has given permission', 'Nothing']}
          correctIndex={1}
          explanation="A key identifies the project, for counting and limits. It does not identify or authorise a person."
        />
        <Quiz
          question="In OAuth, who sees the person's Google password?"
          options={['Your app', 'Only Google', 'Blotato', 'Everyone']}
          correctIndex={1}
          explanation="The login happens at Google. Your app only receives a limited token."
        />
        <Quiz
          question="Why does a daily job need a refresh token?"
          options={['It is faster', 'Access tokens expire in about an hour, and a refresh token gets new ones without a person', 'It is required for read-only scopes', 'It stores the Sheet']}
          correctIndex={1}
          explanation="The refresh token lets the backend renew access quietly."
        />
        <Quiz
          question="Your consent screen is in Testing status. What happens to your daily job?"
          options={['Nothing', 'Authorisation expires after about 7 days, so it stops until you reconnect', 'It runs twice as fast', 'It posts twice']}
          correctIndex={1}
          explanation="Testing-status authorisations expire after seven days. For a personal daily tool, publish the app (unverified)."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'API key = which project. OAuth = a person\'s permission. Service account = the app as itself.',
          'Use OAuth when an app acts on a person\'s own data. The password never reaches your app.',
          'The OAuth steps: login at Google → code → backend swaps it for access + refresh tokens → refresh when expired.',
          'Scopes should be the smallest that works. The redirect URI must match exactly.',
          'Testing status expires after 7 days. Personal apps go to In production (unverified).',
        ]}
      />
    </div>
  );
}
