import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Exercise } from '../../../../components/content/Exercise';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const OPENAPI_EXCERPT = `openapi: 3.1.0
info:
  title: Task Tracker API
  version: 0.1.0
servers:
  - url: http://localhost:8000
paths:
  /tasks:
    get:
      summary: List tasks
      responses:
        "200":
          description: A list of tasks
    post:
      summary: Create a task
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/TaskIn"
      responses:
        "201":
          description: Created
components:
  schemas:
    TaskIn:
      type: object
      required: [title]
      properties:
        title:
          type: string
        category_id:
          type: integer
          nullable: true
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key`;

export default function Step4_9_ReadingDocs() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.9 • Docs"
        title="Reading API Docs and Swagger"
        summary="Every API comes with documentation. Learn what is in it, where to find the answer fast, and how to read an OpenAPI (Swagger) file."
      />

      <p>
        You will not memorise any API. Nobody does. The professional skill is <strong>finding the right answer in the
        documentation, quickly, and knowing whether to trust it</strong>. Once you can do that, any API, even one that did not
        exist when this course was written, becomes usable.
      </p>

      <Section title="What is on a docs site" />
      <Table
        headers={['Section', 'Answers']}
        rows={[
          ['Overview / Introduction', 'What does this API do? What are the main ideas?'],
          ['Authentication', 'How do I prove who I am? Which header, which kind of key?'],
          ['Quickstart', 'The shortest working example. Always start here'],
          ['API reference', 'Every endpoint: method, path, parameters, body, response'],
          ['Schemas / Models', 'The exact shape of each object (which fields are required)'],
          ['Errors', 'What each status code and error message means'],
          ['Rate limits and quotas', 'How much may I use? What happens when I go over?'],
          ['Pricing and plans', 'What does it cost, and which plan includes the API?'],
          ['Changelog / Versions', 'What has changed? Is this page for the current version?'],
        ]}
      />

      <Section title="The seven things to extract" />
      <p>
        Before you write (or approve) any code for a new API, find these seven answers. Write them down. This is your cheat
        sheet for that API:
      </p>
      <Table
        headers={['#', 'Question', 'Example, from Blotato']}
        rows={[
          ['1', 'What is the base URL?', 'https://backend.blotato.com/v2'],
          ['2', 'How do I authenticate?', 'A header called blotato-api-key'],
          ['3', 'Which endpoint does what I need?', 'POST /posts to publish'],
          ['4', 'What exactly goes in the request?', 'post.accountId, post.content, post.target'],
          ['5', 'What comes back?', '201 with a postSubmissionId. Poll for status'],
          ['6', 'What are the limits?', '30 requests per minute'],
          ['7', 'Any plan or account requirement?', 'The API is not on the free trial'],
        ]}
      />

      <Section title="Which source do you trust?" />
      <Table
        headers={['Rank', 'Source', 'Trust']}
        rows={[
          ['1', 'The vendor\'s current reference documentation', 'Highest. This is the truth'],
          ['2', 'The vendor\'s OpenAPI spec file', 'Very high, but check its version and date'],
          ['3', 'The vendor\'s official examples and SDK code', 'High, and useful to compare'],
          ['4', 'Blog posts, videos, forum answers', 'Low. Often out of date or wrong'],
          ['5', 'What an AI "remembers"', 'Lowest. It may be confidently wrong, especially for new or changing APIs'],
        ]}
      />
      <Callout type="warning" title="Real examples we hit while writing this topic">
        <ul className="list-disc pl-5 space-y-1">
          <li>A blog post gave one Blotato base URL and a different style of key. Blotato&apos;s own page says that address is not valid.</li>
          <li>Google&apos;s Gemini quickstart no longer used the call style shown in older tutorials.</li>
          <li>OpenAI&apos;s docs address had moved, and its examples used a newer model name than most guides.</li>
          <li>The fact that YouTube uploads from unreviewed apps stay private is a short note buried in the reference, not a headline.</li>
        </ul>
        Each of these would have produced code that looked fine and failed. That is why we read the vendor&apos;s own page.
      </Callout>

      <Section title="OpenAPI and Swagger" />
      <p>
        Many APIs publish a machine-readable description of themselves in a standard format called{' '}
        <Term definition="A standard way to describe an HTTP API in a JSON or YAML file: its servers, paths, parameters, request bodies, responses and security.">OpenAPI</Term>.
        (&quot;Swagger&quot; is the older name, and also the name of the popular tools that read it.) You have already used
        one: the <code>/docs</code> page of your FastAPI backend is a <strong>Swagger UI</strong>, generated from a file at{' '}
        <code>/openapi.json</code>.
      </p>
      <CodeBlock language="yaml" title="An OpenAPI file (abridged)" code={OPENAPI_EXCERPT} />
      <Table
        headers={['Part', 'What it tells you']}
        rows={[
          [<code key="a">servers</code>, 'The base URL'],
          [<code key="b">paths</code>, 'Every endpoint, with its methods (get, post, ...)'],
          [<code key="c">requestBody / parameters</code>, 'What you must send'],
          [<code key="d">responses</code>, 'What can come back, by status code'],
          [<code key="e">components.schemas</code>, 'Reusable object shapes. $ref points to one'],
          [<code key="f">securitySchemes</code>, 'How to authenticate: here, a header called x-api-key'],
        ]}
      />
      <Callout type="info" title="Why this file matters for AI">
        An OpenAPI file is <em>exact</em>: every path and field is spelled out. When you give one to your AI helper (step
        4.10), it no longer has to guess. That makes it the best documentation to hand over, when one exists.
      </Callout>

      <Section title="Try it on your own backend" />
      <p>
        With your Topic 2 app running (<code>./scripts/system.sh --start backend</code>), read its own OpenAPI file with{' '}
        <code>curl</code> and <code>jq</code>:
      </p>
      <TerminalBlock
        path="~/Development/taskapp"
        lines={[
          { command: 'curl -s http://localhost:8000/openapi.json | jq ".paths | keys"', output: '[\n  "/tasks",\n  "/tasks/{task_id}"\n]' },
          { command: 'curl -s http://localhost:8000/openapi.json | jq ".paths[\\"/tasks\\"].post.requestBody"', output: '{\n  "required": true,\n  "content": { "application/json": { "schema": { "$ref": "#/components/schemas/TaskIn" } } }\n}' },
          { command: 'curl -s http://localhost:8000/openapi.json | jq ".components.schemas.TaskIn"', output: '{\n  "properties": { "title": { "type": "string" }, "category_id": { ... } },\n  "required": ["title"]\n}' },
        ]}
      />
      <p>
        You just answered questions 3 and 4 from the table above, for your own API, without opening a browser.
      </p>

      <Section title="Finding a spec" />
      <Table
        headers={['Where to look', 'Try']}
        rows={[
          ['The API\'s docs page', 'A "Download OpenAPI" or "OpenAPI spec" link, or a Swagger UI page'],
          ['Standard addresses', '/openapi.json, /openapi.yaml, /swagger.json or /v3/api-docs on the API\'s own host'],
          ['The vendor\'s GitHub', 'Search the organisation for "openapi" or "spec"'],
          ['Directories', 'Public collections of API specs, such as APIs.guru'],
        ]}
      />
      <p>Not every API has one. When it does not, the written reference is your source, and you will save the relevant parts as text.</p>

      <Exercise
        title="Fill in the seven answers"
        hint={<p>Open Open-Meteo&apos;s documentation page (search for it). It is free and has no key. Use the table above and write the seven answers.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Base URL: <code>https://api.open-meteo.com/v1</code> (the forecast endpoint is <code>/forecast</code>).</li>
            <li>Authentication: none for the free tier.</li>
            <li>Endpoint: <code>GET /v1/forecast</code> for weather.</li>
            <li>Request: query parameters, including latitude, longitude, and <code>current=</code> or <code>daily=</code> lists of variables.</li>
            <li>Response: JSON with a <code>current</code> or <code>daily</code> section, plus a units section.</li>
            <li>Limits and terms: read the usage terms on the page. The free tier is for non-commercial use and has fair-use limits.</li>
            <li>Plan requirement: a paid plan exists for commercial use or very high volume.</li>
          </ol>
        }
      >
        <p>For the Open-Meteo forecast API, find the seven answers from the table. Write them in a short note.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="Two sources disagree on an API's base URL. Which do you trust?"
          options={['The newest blog post', 'The vendor\'s current reference documentation', 'Whatever an AI remembers', 'The longest answer']}
          correctIndex={1}
          explanation="The vendor's own current reference is the source of truth."
        />
        <Quiz
          question="What is /openapi.json on a FastAPI backend?"
          options={['A log file', 'A machine-readable description of every endpoint, which powers /docs', 'A database', 'A secret']}
          correctIndex={1}
          explanation="FastAPI generates it automatically, and Swagger UI draws /docs from it."
        />
        <Quiz
          question="Which is NOT one of the seven things to extract?"
          options={['The base URL', 'How to authenticate', 'The author\'s favourite colour', 'The rate limits']}
          correctIndex={2}
          explanation="The seven answers are base URL, auth, endpoint, request, response, limits and plan requirements."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The skill is finding and trusting the right answer in the docs, not memorising APIs.',
          'Extract seven things: base URL, authentication, endpoint, request, response, limits, plan requirements.',
          'Trust order: vendor reference, then OpenAPI spec, then examples. Blogs and AI memory come last.',
          'An OpenAPI (Swagger) file describes an API exactly. curl + jq will read one, including your own at /openapi.json.',
        ]}
      />
    </div>
  );
}
