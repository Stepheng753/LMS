import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.0 • External APIs"
        title="Now You Are the Client"
        summary="In Topic 2 you built an API. Now you will use other people's, and connect your app to Google, to AI models and to social media."
      />

      <p>
        Your Topic 2 app had a frontend asking a backend for things. Almost every useful app also talks to services it did
        not build: a payment company, a map, a weather service, an AI model. Each of those is an <strong>API</strong> run by
        someone else, and your backend becomes the <em>client</em>, the one doing the asking.
      </p>

      <Flow
        steps={[
          { title: 'Your app', sub: 'Your backend does the asking' },
          { title: 'Their API', sub: 'Google, an AI provider, Blotato', via: 'HTTPS + a key' },
          { title: 'The result', sub: 'Rows, text, a published post', via: 'JSON back' },
        ]}
      />

      <p>
        Everything you learned still applies: URLs, methods, JSON, status codes. What is new is{' '}
        <strong>proving who you are</strong> (keys and logins), <strong>reading someone else&apos;s documentation</strong>,{' '}
        and being careful, because now your code can spend money and post in public.
      </p>

      <Section title="What you will build" />
      <p>
        By the end of this topic you will have built the <strong>Daily Poster</strong>, a lightweight app that ties it all
        together:
      </p>
      <ol className="list-decimal pl-5 space-y-1">
        <li>You keep a content calendar in a <strong>Google Sheet</strong>: a date, a platform, and either a prompt or the finished text.</li>
        <li>Each morning the app reads today&apos;s rows from the Sheet (using <strong>Google OAuth</strong>).</li>
        <li>An <strong>AI model</strong> turns each prompt into a post, using fresh data if the row asks for it. A <strong>model switcher</strong> lets you choose Claude, OpenAI or Gemini.</li>
        <li>You see the drafts, edit and <strong>approve</strong> them.</li>
        <li><strong>Blotato</strong> posts them to whichever of your own accounts you choose: Instagram, TikTok, Bluesky and more.</li>
      </ol>

      <Section title="The road ahead" />
      <Table
        headers={['Phase', 'Steps', 'You will learn']}
        rows={[
          ['Basics', '4.1 to 4.2', 'Calling an API from the terminal, and how keys and secrets work'],
          ['Google', '4.3 to 4.5', 'The Google Cloud console, API key vs OAuth vs service account, and connecting a Google Sheet'],
          ['Posting', '4.6', 'A simple API: publishing to social media with Blotato'],
          ['AI', '4.7 to 4.8', 'Claude, OpenAI and Gemini, and a model switcher inside your app'],
          ['Docs', '4.9 to 4.11', 'Reading API docs and Swagger, giving them to your AI, and calling APIs safely'],
          ['Project', '4.12 to 4.13', 'Design and build the Daily Poster'],
        ]}
      />

      <Section title="Three promises before we start" />
      <Callout type="warning" title="Real money, real posts, real keys">
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>Keys are like credit cards.</strong> Anyone who has your AI key can spend your money. They live in <code>secrets.json</code> and nowhere else.</li>
          <li><strong>Set spending limits first.</strong> Every AI provider lets you cap what an account can spend. We do that before the first call.</li>
          <li><strong>Nothing posts without you.</strong> Test accounts first, a dry-run mode that sends nothing, and an approval click for every post.</li>
        </ol>
      </Callout>
      <BigWarning title="AI models cost real money. Limits first">
        <p>
          Every AI call is billed to your account, the most capable models cost <strong>100 times more per token</strong> than
          the cheapest, and a bug or a loop can multiply a tiny cost into a huge one. Step 4.7 explains the prices and has the
          full warning. Until then, make one rule: <strong>no AI call before you have set a spending limit</strong>.
        </p>
      </BigWarning>
      <Callout type="info" title="Some of this costs a little">
        The AI calls in this topic cost fractions of a cent each. Blotato&apos;s API needs one of its paid plans. If you
        would rather not pay, you can still do every other part, and Step 4.6 shows free alternatives.
      </Callout>

      <Quiz
        question="In this topic, what is your backend's new role?"
        options={['The database', 'The client of other services\' APIs', 'The frontend', 'A firewall']}
        correctIndex={1}
        explanation="Your backend now sends requests to APIs that other companies run."
      />

      <KeyTakeaways
        items={[
          'Your backend is now the client of other people\'s APIs. The HTTP you know still applies.',
          'The new parts are authentication, reading unfamiliar docs, and being careful with money and public posts.',
          'The project: a Google Sheet calendar → AI-written drafts → your approval → posts through Blotato.',
          'Keys stay in secrets.json, spending limits come first, and nothing posts without approval.',
        ]}
      />
    </div>
  );
}
