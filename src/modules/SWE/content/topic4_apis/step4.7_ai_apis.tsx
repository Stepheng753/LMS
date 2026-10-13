import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Tabs } from '../../../../components/content/Tabs';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Exercise } from '../../../../components/content/Exercise';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const CLAUDE_PY = `import anthropic

client = anthropic.Anthropic(api_key=secrets["anthropic_api_key"])

response = client.messages.create(
    model="claude-haiku-5-5",
    max_tokens=1024,
    output_config={"effort": "low"},
    system="You write short, friendly social media posts.",
    messages=[{"role": "user", "content": "Write a post about today's weather: 14C, light wind."}],
)

text = next(block.text for block in response.content if block.type == "text")
print(text)
print(response.usage.input_tokens, response.usage.output_tokens)`;

const OPENAI_PY = `from openai import OpenAI

client = OpenAI(api_key=secrets["openai_api_key"])

response = client.responses.create(
    model="<current model from OpenAI's docs>",
    input="Write a short, friendly social media post about today's weather: 14C, light wind.",
)

print(response.output_text)`;

const GEMINI_PY = `from google import genai

client = genai.Client(api_key=secrets["gemini_api_key"])

interaction = client.interactions.create(
    model="<current model from Google's docs>",
    input="Write a short, friendly social media post about today's weather: 14C, light wind.",
)

print(interaction.output_text)`;

const CLAUDE_CURL = `curl -s https://api.anthropic.com/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: $(jq -r .anthropic_api_key backend/config/secrets.json)" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "claude-haiku-5-5",
    "max_tokens": 1024,
    "output_config": {"effort": "low"},
    "messages": [{"role": "user", "content": "Write a friendly 1-sentence post about a 14C morning."}]
  }' | jq -r '.content[] | select(.type == "text") | .text'`;

const OPENAI_CURL = `curl -s https://api.openai.com/v1/responses \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $(jq -r .openai_api_key backend/config/secrets.json)" \\
  -d '{
    "model": "<current model from OpenAI docs>",
    "input": "Write a friendly 1-sentence post about a 14C morning."
  }' | jq .`;

const GEMINI_CURL = `curl -s https://generativelanguage.googleapis.com/v1beta/interactions \\
  -H "Content-Type: application/json" \\
  -H "x-goog-api-key: $(jq -r .gemini_api_key backend/config/secrets.json)" \\
  -d '{
    "model": "<current model from Google docs>",
    "input": "Write a friendly 1-sentence post about a 14C morning."
  }' | jq .`;

const PROMPT_EXAMPLE = `System:
You write social media posts for a small bakery. Friendly, warm, never pushy.
Rules: under 280 characters. At most two emojis. No made-up facts.
Use only the data you are given.

User:
Write a good-morning post about the weather.
Data: {"temperature_c": 14.2, "wind_kmh": 9.4}`;

export default function Step4_7_AiApis() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.7 • AI"
        title="AI APIs: Claude, OpenAI and Gemini"
        summary="Get a key, set a spending limit, make your first call with curl, and see what the code that does it looks like."
      />

      <p>
        An AI model API is the simplest API in this topic: you send some text, and you get text back. You send a{' '}
        <strong>prompt</strong>, and the reply is a <strong>completion</strong>. Three companies run the best-known ones, and
        your app will be able to use any of them.
      </p>

      <Section title="The three providers" />
      <Table
        headers={['', 'Claude (Anthropic)', 'OpenAI', 'Gemini (Google)']}
        rows={[
          ['Get a key', <span key="k1">console.<wbr />anthropic.com</span>, <span key="k2">platform.<wbr />openai.com</span>, <span key="k3">aistudio.<wbr />google.com</span>],
          ['Python package', <code key="a">anthropic</code>, <code key="b">openai</code>, <code key="c">google-genai</code>],
          ['Key sent in', <code key="g">x-api-key</code>, <code key="h">Authorization: Bearer</code>, <code key="i">x-goog-api-key</code>],
          ['Extra header', <code key="j">anthropic-version</code>, '-', '-'],
        ]}
      />
      <p>The exact address each one uses is in the curl examples in section 3.</p>
      <Callout type="warning" title="Model names change quickly">
        Each provider releases new models often and retires old ones. Never memorise a name. Always copy the current one
        from the provider&apos;s documentation, which you will practise in step 4.9. In your app, model names live in{' '}
        <code>config.json</code>, so changing one never means changing code.
      </Callout>

      <Section title="1. Spending limits first" />
      <Table
        headers={['Provider', 'What to set']}
        rows={[
          ['Anthropic', 'Add a small prepaid credit balance, and set a monthly spend limit for the workspace in the console\'s billing and limits pages'],
          ['OpenAI', 'Set a monthly budget and usage alerts under the project\'s billing and limits'],
          ['Google (Gemini)', 'Use a free-tier key from AI Studio while learning, and set a budget alert in Google Cloud if you enable billing'],
        ]}
      />
      <p>
        The page names change, so if you cannot find a limit, ask your AI helper or search the provider&apos;s help pages for
        &quot;spend limit&quot;. Do this before making any call.
      </p>

      <Section title="2. Tokens, cost and usage" />

      <BigWarning title="Cost & usage warning: read this before you make a single call">
        <p>
          <strong>Every call to an AI model is billed to your account.</strong> Nothing in this topic is free to run at any
          scale, and a small mistake can become a large bill very quickly. Read all of this.
        </p>
        <ul>
          <li><strong>You pay per token, on every call.</strong> You pay for what you send (input) and what comes back (output), including any &quot;thinking&quot; the model does first. Output costs several times more than input.</li>
          <li><strong>Prices differ enormously between models.</strong> The most capable model in the table below costs <strong>100 times more per token</strong> than the cheapest one.</li>
          <li><strong>Usage multiplies cost.</strong> A bug that loops, a &quot;regenerate&quot; button clicked repeatedly, a schedule that runs every minute instead of every day, or a long prompt that is re-sent each time can each turn cents into hundreds or thousands of dollars.</li>
          <li><strong>Long prompts cost more.</strong> Pasting big documents or long histories into every call is the fastest way to a surprise bill. Some models also charge a higher rate once a prompt passes a size threshold.</li>
          <li><strong>Prices and models change without notice.</strong> The figures in this lesson are a snapshot from October 2026. If the provider&apos;s pricing page says something different, <strong>the pricing page is right and this lesson is wrong</strong>.</li>
          <li><strong>Usage limits are separate from cost.</strong> Providers also limit how fast you may call them. You can be slowed down (a 429 error) long before you are charged a lot, or be charged a lot before you notice any slowdown.</li>
          <li><strong>You are responsible for your account&apos;s charges.</strong> The numbers here are illustrative estimates, not guarantees. This course cannot see or control your bill.</li>
        </ul>
        <p><strong>Do these before the first call:</strong></p>
        <ol>
          <li>Set a <strong>spending limit</strong> or a small prepaid balance at the provider, and turn on usage alerts.</li>
          <li><strong>Start with the cheapest model</strong> while you are learning and testing. Move up only when you can see that you need to.</li>
          <li>Build a <strong>daily cost cap into your own app</strong> (step 4.8), so it stops by itself.</li>
          <li>Open the provider&apos;s <strong>usage dashboard</strong> and check it after your first day and then every week.</li>
          <li>If you are ever unsure what is happening, <strong>revoke the key</strong> first and investigate second.</li>
        </ol>
      </BigWarning>

      <p>
        AI models read and write in <Term definition="A chunk of text, roughly three-quarters of a word. Models are billed per million tokens, with one price for what you send and a higher one for what comes back.">tokens</Term>,
        roughly three-quarters of a word. Prices are quoted in US dollars <em>per million tokens</em>, with a separate price for
        input and output. These are the Claude 5 models:
      </p>
      <Table
        caption="Claude 5 family, USD per million tokens (snapshot, October 2026)"
        headers={['Model', 'Model ID', 'Input', 'Output', 'Think of it as']}
        rows={[
          ['Haiku 5.5', <code key="h">claude-haiku-5-5</code>, '$0.10', '$0.50', 'Fastest and cheapest. Prices rise to $0.50 / $2.50 for prompts over 100K tokens'],
          ['Sonnet 5.5', <code key="s">claude-sonnet-5-5</code>, '$2.00', '$10.00', 'Balanced, for everyday work'],
          ['Sonnet 5', <code key="s5">claude-sonnet-5</code>, '$2.00', '$10.00', 'The previous Sonnet'],
          ['Opus 5.5', <code key="o">claude-opus-5-5</code>, '$4.00', '$20.00', 'Very capable. The example default in this course'],
          ['Opus 5', <code key="o5">claude-opus-5</code>, '$5.00', '$25.00', 'The previous Opus'],
          ['Fable 5.1', <code key="f">claude-fable-5-1</code>, '$10.00', '$50.00', 'The most capable and the most expensive. Not needed for short social posts'],
        ]}
      />
      <Table
        caption="What a mistake could cost: illustrative arithmetic, not a prediction"
        headers={['Scenario', 'Haiku 5.5', 'Opus 5.5', 'Fable 5.1']}
        rows={[
          ['1 short post (about 300 tokens in, 100 out)', '$0.00008', '$0.0032', '$0.008'],
          ['1,000 short posts', '$0.08', '$3.20', '$8.00'],
          ['A bug re-sends a 50,000-token prompt 10,000 times (input cost only)', '$50', '$2,000', '$5,000'],
        ]}
      />
      <Callout type="info" title="Why a daily post is still cheap">
        One short post a day costs a fraction of a cent on any of these models. The danger is never the normal case. It is the
        loop, the long prompt and the forgotten schedule. Models that &quot;think&quot; before answering also count those
        thinking tokens as output, so real usage can be several times the simple estimate. A low <code>effort</code> setting
        keeps short tasks cheap. Check OpenAI&apos;s and Google&apos;s pricing pages for their current models and prices.
      </Callout>

      <Section title="3. Your first call, with curl" />
      <p>Put your key in <code>secrets.json</code> and use the <code>jq</code> trick from step 4.2:</p>
      <Tabs
        tabs={[
          {
            label: 'Claude',
            content: (
              <>
                <CodeBlock language="bash" title="Claude: Messages API" code={CLAUDE_CURL} />
                <TerminalBlock path="~/Development/daily-poster" command="(the command above)" output="Good morning, everyone! A cool, calm 14°C to start the day." />
              </>
            ),
          },
          { label: 'OpenAI', content: <CodeBlock language="bash" title="OpenAI: Responses API" code={OPENAI_CURL} /> },
          { label: 'Gemini', content: <CodeBlock language="bash" title="Gemini API" code={GEMINI_CURL} /> },
        ]}
      />
      <p>
        Read the Claude request: <code>model</code> chooses the model (we use the cheapest, Haiku 5.5, for exploring; any ID from the table works), <code>max_tokens</code> caps the reply length,{' '}
        <code>messages</code> is the conversation so far, and <code>output_config.effort</code> controls how much the model
        thinks before it answers (<code>low</code> keeps short tasks quick and cheap). The reply is JSON, and the text is
        nested inside, so <code>jq</code> picks it out.
      </p>

      <Section title="4. What the Python code looks like" />
      <p>
        You will not write this, but you should recognise it. Each provider has an official <strong>SDK</strong>, a Python
        library that wraps the HTTP request. The details differ, which is exactly why Step 4.8 hides them behind one
        interface.
      </p>
      <Tabs
        tabs={[
          { label: 'Claude', content: <CodeBlock language="python" title="anthropic" code={CLAUDE_PY} /> },
          { label: 'OpenAI', content: <CodeBlock language="python" title="openai" code={OPENAI_PY} /> },
          { label: 'Gemini', content: <CodeBlock language="python" title="google-genai" code={GEMINI_PY} /> },
        ]}
      />
      <Callout type="tip" title="Docs move. Check before you trust">
        The model names above are placeholders on purpose. When we looked, Google&apos;s quickstart had switched to a newer
        style of call, and OpenAI&apos;s examples named a different model from last year&apos;s tutorials. Blog posts and
        old answers go stale quickly. The provider&apos;s current documentation is the source of truth.
      </Callout>

      <Section title="5. Writing a prompt that gets a good post" />
      <p>
        A prompt has two layers. The <strong>system prompt</strong> sets the standing rules (voice, limits). The{' '}
        <strong>user message</strong> is the task for this one call, with any data it should use.
      </p>
      <CodeBlock language="markdown" title="A good post prompt" code={PROMPT_EXAMPLE} />
      <Table
        headers={['Ingredient', 'Why']}
        rows={[
          ['Who is speaking, and the voice', 'Keeps posts consistent'],
          ['Hard limits (length, emoji, hashtags)', 'Platforms have character limits'],
          ['"Use only the data you are given"', 'Stops the model inventing facts'],
          ['The data itself, as JSON', 'Fresh facts (step 4.10 explains how to fetch them)'],
          ['The format you want back', 'Just the post text, nothing else'],
        ]}
      />

      <Collapsible title="Good to know">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Models can be wrong.</strong> They write fluent text even when a fact is invented. That is why every draft is checked by a person before it posts.</li>
          <li><strong>Models can refuse.</strong> A request may come back with a refusal instead of text. Your app must treat that as a normal outcome, not a crash.</li>
          <li><strong>The API is stateless.</strong> Nothing is remembered between calls unless you send it again.</li>
          <li><strong>Prices and limits change.</strong> Re-check the pricing page whenever you plan to run something at scale.</li>
        </ul>
      </Collapsible>

      <Exercise
        title="Compare the three"
        hint={<p>Use the same data for all three. If you have only one or two keys, compare those. Note the reply, how long it felt, and the token counts if the reply includes them.</p>}
        solution={
          <p>
            There is no single right answer, which is the point. You will usually find that the smaller or cheaper models
            write perfectly good short posts, and the larger ones differ most on tone and on following the length limit.
            Keep these notes: the model switcher in the next step lets you repeat this comparison any time.
          </p>
        }
      >
        <p>
          Send this to each provider you have a key for: &quot;Write a friendly good-morning post about a 14°C morning with a
          light wind. Under 200 characters.&quot; Compare tone, length, and cost.
        </p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What do you pay for with an AI API?"
          options={['Each request, whatever the size', 'The tokens you send and the tokens you receive', 'Only the reply', 'A fixed monthly fee only']}
          correctIndex={1}
          explanation="Billing is per token, with separate input and output prices."
        />
        <Quiz
          question="Where should model names live in your app?"
          options={['Hard-coded in every endpoint', 'In config.json, so changing one never needs a code change', 'In the frontend', 'In the README']}
          correctIndex={1}
          explanation="Model names go out of date. Config is the right place."
        />
        <Quiz
          question="Which is the safest instruction to stop invented facts in a post?"
          options={['Be creative', 'Use only the data you are given', 'Write longer', 'Add emoji']}
          correctIndex={1}
          explanation="Constraining the model to the supplied data reduces made-up details."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Claude, OpenAI and Gemini all take a prompt and return text. Each has its own key, endpoint and header.',
          'Set a spending limit first. Cost is per token, input and output priced separately, and a post costs a fraction of a cent.',
          'Model names change often. Copy current ones from the docs and keep them in config.',
          'A prompt has a system part (voice and rules) and a user part (the task and the data). Tell the model to use only the data you give it.',
        ]}
      />
    </div>
  );
}
