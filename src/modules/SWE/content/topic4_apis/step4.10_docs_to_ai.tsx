import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { FileTree } from '../../../../components/content/FileTree';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Flow } from '../../../../components/content/Flow';
import { Exercise } from '../../../../components/content/Exercise';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { ARCH_SKILL_V3, EXTERNAL_APIS_SKILL } from '../topic_toolkit/tools/tools_apis';

const LIVE_DATA_SNIPPET = `weather = fetch_json(row.data_url, timeout=10)

if "current" not in weather:
    raise DataUnavailable("weather data missing, not posting")

prompt = (
    "Write a good-morning post about the weather. "
    "Use only this data: " + json.dumps(weather["current"])
)
draft = generate(provider, model, system_prompt, prompt)`;

const PLAN_WORDING = `Read everything in docs/api/ before you plan.
For each external call, name the document and section it comes from.
If the docs do not cover something, ask me. Do not guess an endpoint,
a header, a field or a model name.`;

export default function Step4_10_DocsToAi() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.10 • Docs"
        title="Giving the Docs to Your AI"
        summary="Teach your AI helper from the real documentation, so it builds against facts and not guesses. Then use the same idea inside your app, to give an AI fresh data."
      />

      <p>
        &quot;Give the docs to the AI&quot; can mean two different things, and this app does both:
      </p>
      <Compare
        goodLabel="At build time"
        badLabel="At run time"
        good={
          <>
            <p><strong>You give the docs to your coding AI</strong> so it writes correct integration code.</p>
            <p>Example: the Blotato reference, so it uses the right headers and fields.</p>
          </>
        }
        bad={
          <>
            <p><strong>Your app gives fresh data to a model</strong> so a post is about <em>today</em>, not a guess.</p>
            <p>Example: this morning&apos;s weather, put into the prompt.</p>
          </>
        }
      />

      <Section title="Part 1: Build time. Docs for the coder" />
      <p>
        An AI that writes API code from memory is likely to use outdated names, invent endpoints, or mix up two similar
        services. The fix is simple: <strong>put the real documentation in the project, and tell the AI to read it</strong>.
      </p>
      <FileTree
        title="docs/api/"
        tree={[
          {
            name: 'docs',
            children: [
              { name: 'README.md' },
              {
                name: 'api',
                note: 'saved API documentation',
                children: [
                  { name: 'README.md', note: 'what each file is, and where it came from' },
                  { name: 'blotato.openapi.json', note: 'a spec file, trimmed' },
                  { name: 'blotato.md', note: 'notes from the reference page' },
                  { name: 'google-sheets.md' },
                  { name: 'claude-messages.md' },
                  { name: 'open-meteo.md' },
                ],
              },
            ],
          },
        ]}
      />

      <Section title="Three ways to save docs" />
      <Table
        headers={['Method', 'How', 'Best for']}
        rows={[
          [<strong key="a">Download the OpenAPI spec</strong>, <code key="a2">curl -s URL -o docs/api/name.openapi.json</code>, 'APIs that publish a spec: exact and complete'],
          [<strong key="b">Have the AI save the relevant pages</strong>, 'Ask it to fetch the reference page and write the endpoints you need into docs/api/name.md, with the address and today\'s date at the top', 'Docs that exist only as web pages'],
          [<strong key="c">Copy and paste it yourself</strong>, 'Open nano, paste the section, save. Low-tech and it works', 'A short page, or a login-only page the AI cannot reach'],
        ]}
      />
      <Callout type="tip" title="Some sites offer an AI-friendly index">
        A growing number of sites publish a plain-text summary of their documentation for AI tools, often at an address like{' '}
        <code>/llms.txt</code>. If one exists, it is worth saving. Look on the docs site.
      </Callout>

      <Section title="Trim big specs" />
      <p>
        A full OpenAPI file can be huge, and an AI works better with only what it needs. Use <code>jq</code> to keep just the
        endpoints you will use:
      </p>
      <TerminalBlock
        path="~/Development/daily-poster"
        lines={[
          { command: 'curl -s https://example.com/openapi.json -o /tmp/full.json' },
          {
            command: `jq '{openapi, info, servers, paths: (.paths | with_entries(select(.key | test("^/v2/(posts|users)")))), components}' /tmp/full.json > docs/api/blotato.openapi.json`,
          },
          { command: 'jq ".paths | keys" docs/api/blotato.openapi.json', output: '["/v2/posts", "/v2/posts/{postSubmissionId}", "/v2/users/me/accounts"]' },
        ]}
      />
      <p>
        (Replace the address with the real spec&apos;s. Not every API has one. The three-way table above covers the rest.)
      </p>

      <Section title="Tell the planner to use them" />
      <p>Add this wording to the spec you give <code>/plan</code>:</p>
      <CodeBlock language="markdown" title="Add to every spec that uses an outside API" code={PLAN_WORDING} />

      <Section title="Check its work" />
      <Steps
        steps={[
          { title: 'Compare to the docs', children: <p>For each endpoint, header and field in the plan, can you find it in <code>docs/api/</code>? Ask the AI to quote the line.</p> },
          { title: 'Ask what it inferred', children: <p>Try: <em>&quot;Which parts of this integration did you infer rather than read in the docs?&quot;</em> Anything in that list needs checking.</p> },
          { title: 'Smoke-test it', children: <p>Make one real call by hand with <code>curl</code> (step 4.6). If the first request works, the shape is right.</p> },
        ]}
      />
      <Table
        headers={['A typical invention', 'What the docs would say']}
        rows={[
          ['POST /v2/posts/schedule', 'There is no such path. Scheduling is a scheduledTime on POST /v2/posts'],
          ['Authorization: Bearer <key>', 'The header is blotato-api-key'],
          ['"model": "an old name from training data"', 'Model names change. Copy the current one from the docs'],
          ['scheduledTime inside the post object', 'It belongs at the top level, otherwise it is ignored'],
        ]}
      />

      <Section title="Part 2: Run time. Fresh data in the prompt" />
      <p>
        A model does not know what happened this morning. If you want a post about today&apos;s weather, today&apos;s
        exchange rate or this week&apos;s match, <strong>your app must fetch the data and hand it over</strong>. The
        pattern is always the same:
      </p>
      <Flow
        steps={[
          { title: 'Fetch', sub: 'Call the data API' },
          { title: 'Check', sub: 'Is it valid and complete?', via: 'JSON' },
          { title: 'Shape', sub: 'Keep only what is needed', via: 'ok' },
          { title: 'Prompt', sub: 'Put it in, say "use only this"' },
          { title: 'Draft', sub: 'The model writes', via: 'send' },
        ]}
      />
      <CodeBlock language="python" title="The pattern (shape only)" code={LIVE_DATA_SNIPPET} />
      <Table
        headers={['Rule', 'Why']}
        rows={[
          ['Fetch with a timeout', 'A slow data API must not freeze your daily job'],
          ['Check the data before using it', 'An error page or empty reply would make the model invent things'],
          ['Pass only what is needed', 'Fewer tokens, cheaper, less to go wrong'],
          ['Say "use only the data you are given"', 'Stops invented numbers'],
          ['If the fetch fails, do not post', 'A confident post with no real data is worse than no post'],
        ]}
      />
      <Callout type="info" title="The next level: letting the model ask">
        Here your app decides which data to fetch. A more advanced pattern, <strong>tool use</strong>, lets the model decide
        for itself that it needs the weather and ask your app to fetch it. That is the doorway to autonomous agents, the
        subject of the next topic.
      </Callout>

      <Exercise
        title="Document your own API"
        hint={<p>Use <code>curl</code> to save your Topic 2 app&apos;s <code>/openapi.json</code> into <code>docs/api/</code> in a new project, then ask your AI helper to explain it.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li><code>mkdir -p docs/api</code></li>
            <li>Start your backend, then <code>curl -s http://localhost:8000/openapi.json -o docs/api/taskapp.openapi.json</code>.</li>
            <li>Ask: &quot;Read docs/api/taskapp.openapi.json and list every endpoint with its required fields.&quot;</li>
            <li>Check one of its answers against Swagger at <code>/docs</code>.</li>
          </ol>
        }
      >
        <p>Practise the build-time idea: give your helper your own task API&apos;s spec and have it describe the endpoints, then verify one answer.</p>
      </Exercise>

      <Section title="Save your skills" />
      <p>
        Two saves. The first is new: how to call outside APIs. The second updates your layout skill, which now includes{' '}
        <code>docs/api/</code> and <code>backend/services/</code>.
      </p>
      <TeachAI kind="skill" name="external-apis" text={EXTERNAL_APIS_SKILL} />
      <TeachAI kind="skill" name="fullstack-architecture" text={ARCH_SKILL_V3} isUpdate />

      <QuizSet>
        <Quiz
          question="Why save API docs inside the project?"
          options={['To make the repository bigger', 'So the AI builds from real documentation instead of guessing', 'It is required by git', 'To hide them']}
          correctIndex={1}
          explanation="Documents in the repo are something the AI can read and you can check against."
        />
        <Quiz
          question="You want a post about this morning's weather. What must your app do?"
          options={['Trust the model to know it', 'Fetch the data, check it, and put it in the prompt', 'Ask the user to type it', 'Use yesterday\'s']}
          correctIndex={1}
          explanation="Models do not know today's data. Your app fetches it and hands it over."
        />
        <Quiz
          question="The weather API is down. What should the daily job do?"
          options={['Make up the weather', 'Not create a draft, and show a clear error', 'Post anyway', 'Delete the sheet']}
          correctIndex={1}
          explanation="A post with no real data would be invented. Do not post."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Build time: save the real docs in docs/api/ and tell /plan to read them and name the source of every call.',
          'Prefer an OpenAPI spec when one exists. Trim it with jq. Otherwise save the key pages as text.',
          'Verify: find each call in the docs, ask what was inferred, and smoke-test with curl.',
          'Run time: fetch → check → shape → prompt → draft. If the data is missing, do not post.',
        ]}
      />
    </div>
  );
}
