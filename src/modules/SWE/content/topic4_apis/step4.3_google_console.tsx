import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_3_GoogleConsole() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.3 • Google"
        title="A Tour of the Google Cloud Console"
        summary="Google's APIs are managed in one place. Learn the few screens you need: projects, APIs, credentials and the consent screen."
      />

      <p>
        Google offers hundreds of APIs: Sheets, Drive, Calendar, Maps, Gmail, YouTube. They are all managed from the{' '}
        <strong>Google Cloud Console</strong> at <code>console.cloud.google.com</code>. It looks intimidating, because it also
        runs a whole cloud platform, but for APIs you only ever need about five screens.
      </p>

      <Callout type="info" title="Screens change names">
        Google rearranges its console often. For example, the &quot;OAuth consent screen&quot; page has become part of
        &quot;Google Auth Platform&quot;. If a name below does not match what you see, use the search box at the top of the
        console, or paste a screenshot to your AI helper.
      </Callout>

      <Section title="The idea: everything lives in a project" />
      <p>
        A <strong>project</strong> is a container for one app&apos;s settings. It holds which APIs you have switched on, the
        credentials your app uses, the consent screen people see, and the quota counters. Make one project per app, so that
        deleting or breaking one never touches another.
      </p>

      <Section title="The screens you need" />
      <Table
        headers={['Screen', 'What it is for', 'When you use it']}
        rows={[
          [<strong key="a">Project selector</strong>, 'The drop-down at the top. Chooses which project you are looking at', 'Always check it first. Most confusion is being in the wrong project'],
          [<strong key="b">APIs &amp; Services → Library</strong>, 'A catalogue of every API. You click Enable on the ones you want', 'Once per API, per project'],
          [<strong key="c">Credentials</strong>, 'Where you create API keys, OAuth client IDs and service accounts', 'To get your app its identity'],
          [<strong key="d">Google Auth Platform (consent screen)</strong>, 'What people see when your app asks permission: app name, scopes, test users, publishing status', 'Before any OAuth login works'],
          [<strong key="e">Quotas</strong>, 'How much of each API you may use', 'When you hit a limit, or to plan'],
          [<strong key="f">IAM &amp; Admin</strong>, 'Who can do what in the project. Service accounts live here too', 'Rarely, for us'],
        ]}
      />

      <Section title="Walk through it" />
      <Steps
        steps={[
          { title: 'Sign in', children: <p>Go to <code>console.cloud.google.com</code> with the Google account that owns your Sheet. Accept the terms if asked. You do <strong>not</strong> need to enable paid billing for the Sheets API, which is free.</p> },
          { title: 'Create a project', children: <p>Click the project selector, then <em>New project</em>. Name it after your app, for example <code>daily-poster</code>. Select it once it is created.</p> },
          { title: 'Open the API Library', children: <p>Use the menu (☰) → <em>APIs &amp; Services</em> → <em>Library</em>. Search for <strong>Google Sheets API</strong> and open it. You will click <em>Enable</em> in step 4.5. For now, just look at the page: it shows the API&apos;s name, its documentation link and its quota.</p> },
          { title: 'Look at Credentials', children: <p>Open <em>APIs &amp; Services → Credentials</em>. Click <em>Create credentials</em> and read the three options in the menu: <strong>API key</strong>, <strong>OAuth client ID</strong>, <strong>Service account</strong>. Do not create anything yet. The next step explains which is which.</p> },
          { title: 'Look at the consent screen', children: <p>Open <em>Google Auth Platform</em> (or <em>OAuth consent screen</em>). Notice the tabs or sections for <em>Branding</em>, <em>Audience</em> (External or Internal, and Testing or In production) and <em>Data access</em> (the scopes). You will fill these in during step 4.5.</p> },
          { title: 'Look at Quotas', children: <p>Search for <em>Quotas</em> in the console. Pick the Sheets API and see its per-minute limits. Knowing where the limits are saves guessing later.</p> },
        ]}
      />

      <Callout type="warning" title="Keep the project's owner account safe">
        This Google account owns the project and any credentials in it. Turn on two-step verification for it, and never share
        its password. Anyone who controls the account controls the project.
      </Callout>

      <Collapsible title="Words you will see">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Enable an API:</strong> switch it on for your project. A disabled API returns a 403 error.</li>
          <li><strong>Credential:</strong> something that identifies your app (key, client ID, service account).</li>
          <li><strong>Scope:</strong> one specific permission, such as read-only access to Sheets.</li>
          <li><strong>Consent screen:</strong> the page where a person approves or denies your app&apos;s request.</li>
          <li><strong>Quota:</strong> a usage allowance per API.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="What is a Google Cloud project?"
          options={['A single API key', 'A container for one app\'s APIs, credentials, consent screen and quotas', 'A Google Sheet', 'A billing invoice']}
          correctIndex={1}
          explanation="Everything about one app lives inside its project."
        />
        <Quiz
          question="You call the Sheets API and get a 403 saying the API is not enabled. What do you do?"
          options={['Make a new key', 'Enable the Google Sheets API in the Library for that project', 'Reinstall Python', 'Wait a day']}
          correctIndex={1}
          explanation="APIs are off by default. Enable them in the Library, in the project you are using."
        />
        <Quiz
          question="Where do you create an API key, an OAuth client ID or a service account?"
          options={['Quotas', 'Credentials', 'IAM only', 'The consent screen']}
          correctIndex={1}
          explanation="Credentials is where all three are created."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The Google Cloud Console manages all of Google\'s APIs, one project per app.',
          'You need five screens: the project selector, the API Library, Credentials, the consent screen and Quotas.',
          'APIs are off until you enable them. A 403 often means "not enabled" or the wrong project.',
          'The three credential types live under Credentials. The next step explains which to use.',
        ]}
      />
    </div>
  );
}
