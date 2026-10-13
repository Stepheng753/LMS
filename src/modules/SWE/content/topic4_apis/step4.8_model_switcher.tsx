import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Flow } from '../../../../components/content/Flow';
import { Exercise } from '../../../../components/content/Exercise';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CONFIG_WITH_MODELS, LLM_PROVIDERS_SKILL } from '../../toolkit/tools_apis';

const INTERFACE_SKETCH = `# backend/services/llm.py  (shape only)

@dataclass
class Result:
    text: str
    input_tokens: int
    output_tokens: int
    model: str

def generate(provider: str, model: str, system: str, prompt: str) -> Result:
    # looks up the right adapter, calls it, returns the same Result shape
    ...

# backend/services/claude.py   -> uses the anthropic package
# backend/services/openai.py   -> uses the openai package
# backend/services/gemini.py   -> uses the google-genai package`;

export default function Step4_8_ModelSwitcher() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.8 • AI"
        title="One App, Many Models: The Model Switcher"
        summary="Design your app so that Claude, OpenAI and Gemini are interchangeable, and you can choose and compare them with a dropdown."
      />

      <p>
        Models improve and change constantly. One may be cheaper this month, another better at tone, a third temporarily
        unavailable. If your app is written around a single provider, switching means rewriting code. If it is written
        around a <strong>single interface</strong>, switching means choosing a different item in a list.
      </p>

      <Flow
        steps={[
          { title: 'Your endpoint', sub: '"Write today\'s post"' },
          { title: 'One interface', sub: 'generate(provider, model, system, prompt)', via: 'asks' },
          { title: 'The adapter', sub: 'Claude, OpenAI or Gemini code', via: 'picks' },
          { title: 'The provider', sub: 'its own API and SDK', via: 'calls' },
        ]}
      />

      <BigWarning title="A switcher is also a cost switch">
        <p>
          Changing the model can change the cost of every draft by <strong>up to 100 times</strong>. A premium model left
          selected by accident, together with a loop or a long prompt, is how surprise bills happen. So the switcher in this
          app is built with safety in it:
        </p>
        <ul>
          <li>The <strong>cheapest model is selected by default</strong>, until you choose another.</li>
          <li>Picking a <strong>premium</strong> model shows its cost and asks you to confirm.</li>
          <li>A <strong>daily spending cap</strong> in <code>config.json</code> stops all AI calls once today&apos;s cost reaches it.</li>
          <li>Every draft shows its model and cost, and the app shows today&apos;s total.</li>
        </ul>
        <p>Read the cost warning in step 4.7 again if you skipped it.</p>
      </BigWarning>

      <Section title="The idea in plain words" />
      <p>
        Think of a travel plug adapter. Your laptop has one plug. Each country has a different socket. You do not rebuild the
        laptop for every country. You carry an adapter for each. In your app, the <em>laptop</em> is the code that wants
        text written, and an <strong>adapter</strong> is a small file that speaks one provider&apos;s language and returns the
        answer in a standard shape.
      </p>
      <CodeBlock language="python" title="The shape (you will not write this)" code={INTERFACE_SKETCH} />

      <Section title="The list of models lives in config" />
      <p>
        Which models exist, what they are called and what they cost is <strong>data</strong>, not code, so it goes in{' '}
        <code>config.json</code>:
      </p>
      <CodeBlock language="json" title="backend/config/config.json" code={CONFIG_WITH_MODELS} />
      <Table
        headers={['Field', 'Meaning']}
        rows={[
          [<code key="a">provider</code>, 'Which adapter to use: claude, openai or gemini'],
          [<code key="b">model</code>, 'The exact model name from that provider\'s docs. Replace the CHECK_… placeholders after reading the docs'],
          [<code key="c">label</code>, 'The friendly name shown in the dropdown'],
          [<code key="t">tier</code>, 'cheap, standard, premium or check. Premium models show a cost warning when selected'],
          [<code key="d">input_per_million / output_per_million</code>, 'The prices in US dollars per million tokens, so the app can estimate cost per draft. Keep them current from the provider\'s pricing page'],
          [<code key="m">max_daily_cost_usd</code>, 'The most the app may spend on AI calls in one day. When reached, it stops generating'],
          [<code key="e">dry_run</code>, 'When true, nothing is ever posted. Leave it on while testing'],
        ]}
      />
      <p>
        The keys are separate, in <code>secrets.json</code> (step 4.2). A provider without a key shows as <em>unavailable</em>
        in the dropdown, so the app never crashes because you did not sign up for all three.
      </p>

      <Section title="What the switcher looks like" />
      <Table
        headers={['On the Settings screen', 'Does']}
        rows={[
          ['Model dropdown', 'Lists every model in config with its label, greyed out if there is no key'],
          ['Saved choice', 'The chosen provider and model are stored in the database (a settings table), so they survive restarts'],
          ['Test button', 'Sends one short test prompt to the chosen model and shows the reply, tokens and estimated cost'],
          ['Spend today', 'Shows today\'s total against the daily cap, and refuses new drafts once the cap is reached'],
          ['Dry-run switch', 'On by default. When on, "publish" shows the exact request and sends nothing'],
          ['On each draft', 'Shows which model wrote it and what it cost'],
        ]}
      />
      <Callout type="success" title="Why show the model and cost on every draft">
        When you can see &quot;Draft 12 · Haiku 5.5 · $0.0004&quot; next to the one you liked best, choosing the right model
        stops being guesswork. It also catches the mistake of leaving an expensive model selected.
      </Callout>

      <Section title="Reviewing the plan: the switcher checklist" />
      <Table
        headers={['Check', 'Why']}
        rows={[
          ['No model name appears in the code, only in config.json', 'Names go stale. Config is easy to change'],
          ['One interface and one adapter file per provider', 'So adding a fourth provider is one new file'],
          ['Every adapter returns the same shape (text, tokens, model)', 'The rest of the app should not care which provider ran'],
          ['A missing key means "unavailable", never a crash', 'You may not have all three accounts'],
          ['Errors, timeouts, refusals and empty replies are turned into clear messages', 'Providers fail in different ways'],
          ['Usage and cost are recorded per draft', 'You can compare models and see spend'],
          ['A daily cost cap is checked before every model call', 'Stops runaway spending whatever the cause'],
          ['The cheapest model is the default, and premium models ask for confirmation', 'No accidental expensive choice'],
          ['No model call sits in an unbounded loop or retries without a limit', 'The classic source of huge bills'],
          ['Keys are read from secrets.json by the backend only', 'Never reach the frontend'],
          ['Tests use fake adapters', 'Tests must not spend money'],
        ]}
      />
      <Callout type="info" title="Be careful about copying code between providers">
        An AI helper may write the OpenAI or Gemini adapter by guessing from the Claude one. The calls look similar and are
        not the same. Tell it to read each provider&apos;s current documentation, saved in <code>docs/api/</code>, and to say
        where each call comes from (step 4.10 shows how).
      </Callout>

      <Exercise
        title="Design the failure behaviour"
        hint={<p>Think about what you, as the user, would want to see at 7am if the chosen model is down.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>The draft is created with status &quot;failed&quot; and a plain message: &quot;Claude Opus 5.5 did not answer (timeout). Try again or pick another model.&quot;</li>
            <li>It does <strong>not</strong> silently switch to a different model. A cheaper or different model might change your voice or cost without you knowing.</li>
            <li>It does not post anything. The row stays available to retry.</li>
            <li>Optionally, a clearly labelled &quot;Retry with another model&quot; button.</li>
          </ul>
        }
      >
        <p>The chosen provider times out when the daily job runs. What should the app do, and what should it never do?</p>
      </Exercise>

      <TeachAI kind="skill" name="llm-providers" text={LLM_PROVIDERS_SKILL} />

      <QuizSet>
        <Quiz
          question="What is an adapter in the model switcher?"
          options={['A hardware plug', 'A small file that speaks one provider\'s API and returns a standard result', 'A database table', 'A CSS style']}
          correctIndex={1}
          explanation="Each adapter hides one provider's details behind the shared interface."
        />
        <Quiz
          question="Where should the list of models and their prices live?"
          options={['In each endpoint', 'In backend/config/config.json', 'In the frontend', 'In secrets.json']}
          correctIndex={1}
          explanation="Model names and prices are data. Keep them in config, and keys in secrets."
        />
        <Quiz
          question="The selected model is unavailable. Which is best?"
          options={['Silently use a different model', 'Show a clear error and let the user choose', 'Post anyway with no text', 'Delete the draft']}
          correctIndex={1}
          explanation="A silent switch can change your voice and cost without you knowing."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Put every provider behind one interface, with one small adapter per provider.',
          'Model names, labels and prices live in config.json, keys in secrets.json, the chosen model in the database.',
          'A provider without a key is "unavailable", not a crash. Show the model and cost on every draft.',
          'Fail loudly and clearly. Never silently switch models or post on a failure.',
        ]}
      />
    </div>
  );
}
