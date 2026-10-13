import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet, MultiSelectQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_4_Topic4() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Topic 4"
        title="Recap: External APIs"
        summary="Connecting your apps to Google, to AI models and to social media, safely and with a cap on cost."
      />

      <Section title="The big picture" />
      <Flow
        steps={[
          { title: 'Your backend', sub: 'The only place secrets live' },
          { title: 'Auth', sub: 'API key, OAuth or service account', via: 'proves who you are' },
          { title: 'Their API', sub: 'Google, Claude, OpenAI, Gemini, Blotato', via: 'HTTPS + JSON' },
          { title: 'Your result', sub: 'Sheets rows, generated text, posted content', via: 'response' },
        ]}
      />

      <Section title="The ideas, step by step" />
      <Table
        headers={['Topic', 'Key points', 'Step']}
        rows={[
          [<strong key="a">What an external API is</strong>, 'The same request and response you built in Topic 2, but run by someone else, and usually paid for or limited', '4.1'],
          [<strong key="b">Three ways to prove who you are</strong>, 'API key: a password for your app. OAuth: a person grants your app limited access to their account. Service account: a robot identity for a server-to-server job', '4.2'],
          [<strong key="c">Google Cloud console</strong>, 'Make a project, enable only the API you need, create credentials, and keep the JSON out of git (google_*.json is ignored)', '4.3'],
          [<strong key="d">Google Sheets as a database</strong>, 'A service account reads and writes a sheet you share with its email address. Light, visible to humans, free', '4.4'],
          [<strong key="e">AI APIs</strong>, 'Claude, OpenAI and Gemini all take a prompt and return text. Priced per token, input and output separately. Keys live in backend/config/secrets.json', '4.5, 4.6'],
          [<strong key="f">Reading docs</strong>, 'Find the endpoint, the auth, the request body and an example. Swagger or OpenAPI files describe an API in a way an AI can read', '4.7'],
          [<strong key="g">Giving your AI the docs</strong>, 'Paste or attach the docs (or a short fetched page) so the AI uses the real, current API and not a remembered, outdated one', '4.8'],
          [<strong key="h">Model switcher</strong>, 'One function, one interface, a config setting chooses Claude, OpenAI or Gemini. Swapping a model is one line in config', '4.9'],
          [<strong key="i">Cost caps</strong>, 'A daily and monthly limit in config, a counter in the database, and a refusal when the cap is reached. Test it with a tiny cap', '4.10'],
          [<strong key="j">Posting to social media</strong>, 'Blotato posts to TikTok and Instagram so you do not build each platform\'s OAuth yourself. Draft first, human approves, then post', '4.11 to 4.13'],
          [<strong key="k">The daily poster</strong>, 'A scheduled job reads the next row from a sheet, drafts with AI, saves for approval, then posts. Capped, logged, easy to pause', '4.14'],
        ]}
      />

      <Callout type="warning" title="Cost and keys: the two ways this topic can hurt">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>A leaked key is a stranger spending your money.</strong> Keys go in backend/config/secrets.json, which is git-ignored. Never in the frontend, never in a chat, never committed.</li>
          <li><strong>A loop without a cap is an open tap.</strong> Every AI call is billed. Set provider-side spending limits <em>and</em> your own cap in the app. Use the cheapest model that does the job (Haiku 5.5 at $0.10 input / $0.50 output per million tokens) while building.</li>
        </ul>
      </Callout>

      <Table
        headers={['Model (Claude 5 family)', 'Input / 1M tokens', 'Output / 1M tokens', 'Use for']}
        rows={[
          ['claude-haiku-5-5', '$0.10', '$0.50', 'Building, testing, bulk work'],
          ['claude-sonnet-5-5', '$2', '$10', 'Everyday quality'],
          ['claude-opus-5-5', '$4', '$20', 'Harder tasks'],
          ['claude-opus-5', '$5', '$25', 'Previous top tier'],
          ['claude-fable-5-1', '$10', '$50', 'Only when it really matters'],
        ]}
      />
      <p className="text-sm text-slate-500">Prices are a snapshot from when the course was written. Always check the provider&apos;s pricing page before relying on them.</p>

      <Section title="Common mistakes" />
      <Table
        headers={['Mistake', 'Fix']}
        rows={[
          ['Calling the AI from the frontend', 'Always from the backend. A key in the browser is public'],
          ['Using a service account for something a person owns', 'That is OAuth. A service account only sees what is shared to its email'],
          ['Forgetting to share the sheet with the service account', 'Share it as an editor, using the email in the JSON'],
          ['Enabling every Google API', 'Enable only what you use'],
          ['No cap while testing a loop', 'Cap first, loop second'],
          ['Posting without a human look', 'Draft, approve, post. At least until you trust it'],
          ['Trusting an AI\'s memory of an API', 'Give it the current docs'],
        ]}
      />

      <Collapsible title="Rapid recall">
        <ul className="list-disc pl-5 space-y-1">
          <li>When do you use OAuth instead of an API key? <em>When a person must grant access to their own account</em>.</li>
          <li>Where do secrets live? <em>backend/config/secrets.json, git-ignored</em>.</li>
          <li>What does the model switcher change? <em>One config value, not the code</em>.</li>
          <li>Why a human approval step on posts? <em>Because published content cannot be un-published from someone's feed</em>.</li>
        </ul>
      </Collapsible>

      <QuizSet title="Topic 4 Quick Check">
        <Quiz
          question="Your backend job reads a Google Sheet nightly with nobody logged in. Which auth fits?"
          options={['OAuth with a popup', 'A service account the sheet is shared with', 'No auth', 'A browser cookie']}
          correctIndex={1}
          explanation="A service account is a robot identity for unattended, server-to-server jobs."
        />
        <Quiz
          question="Where must an AI API key be used?"
          options={['In frontend code', 'In the backend only', 'In the README', 'In the page URL']}
          correctIndex={1}
          explanation="Anything in the browser can be read by anyone."
        />
        <Quiz
          question="What is the point of a model switcher?"
          options={['It makes the AI smarter', 'Changing provider or model is a config edit, not a rewrite', 'It removes the cost', 'It hides the key']}
          correctIndex={1}
          explanation="One interface, many providers."
        />
        <Quiz
          question="What does a spending cap in your own app protect against?"
          options={['Slow replies', 'A bug or loop running up a large bill', 'Wrong answers', 'Expired keys']}
          correctIndex={1}
          explanation="The cap is a seatbelt. Provider-side limits are the second one."
        />
        <Quiz
          question="Why give your AI the current API docs?"
          options={['It cannot read otherwise', 'Its memory may be outdated, the docs are the truth', 'To save money', 'To make code shorter']}
          correctIndex={1}
          explanation="APIs change. Documentation in the prompt beats remembered patterns."
        />
        <MultiSelectQuiz
          question="Which of these must never be committed to git? (Pick all)"
          options={['google_service_account.json', 'secrets.json', 'config.json with model names only', 'API keys']}
          correctIndexes={[0, 1, 3]}
          explanation="Credentials never go in git. Non-secret settings can."
        />
        <Quiz
          question="You leaked a key by accident. What first?"
          options={['Delete the commit and hope', 'Revoke the key at the provider, then make a new one', 'Wait', 'Rename the file']}
          correctIndex={1}
          explanation="Once public, a key is burned. Revoke it before anything else."
        />
      </QuizSet>

      <Section title="Can you...?" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Choose between an API key, OAuth and a service account for a given job, and say why?</li>
        <li>Create a Google Cloud project, enable one API, and store the credential safely?</li>
        <li>Read and write a Google Sheet from your backend?</li>
        <li>Call Claude, OpenAI or Gemini, and switch between them with config?</li>
        <li>Build a cap that actually stops spending, and prove it by testing?</li>
        <li>Find the endpoint, auth and body in an unfamiliar API's documentation?</li>
        <li>Describe what the daily poster does at each step, and where a human checks it?</li>
      </ul>

      <KeyTakeaways
        items={[
          'External APIs are requests to someone else\'s server. Authentication proves who you are.',
          'API key for your app, OAuth for a person\'s account, service account for a robot.',
          'Secrets stay in the backend, in git-ignored JSON. A leak means revoke first.',
          'AI calls cost money: cheapest model while building, caps in your app and at the provider.',
          'Draft, approve, post. Keep a human in the loop for anything public.',
        ]}
      />
    </div>
  );
}
