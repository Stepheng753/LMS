import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet, MultiSelectQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_1_Api() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 2.1 • Full Stack Design"
        title="What Is an API?"
        summary="The agreed way for one program to ask another for something, and how the frontend talks to the backend."
      />

      <p>
        <strong>API</strong> stands for <em>application programming interface</em>, which is a mouthful for a simple idea:
        a list of requests that a program is willing to answer. Think of the waiter in the restaurant. You do not
        walk into the kitchen. You order from the menu, and the waiter brings back what you asked for.
      </p>

      <Section title="Request and response" />
      <p>
        Every API conversation has two halves. The frontend sends a <strong>request</strong>. The backend sends back a{' '}
        <strong>response</strong>. A request has three important parts:
      </p>
      <Table
        headers={['Part', 'What it says', 'Example']}
        rows={[
          ['URL', 'Which thing you want', 'http://localhost:8000/tasks'],
          ['Method', 'What you want to do with it', 'GET'],
          ['Body (sometimes)', 'The data you are sending', '{"title": "Buy milk"}'],
        ]}
      />

      <Section title="The four methods" />
      <p>
        There are four methods you will meet constantly. They map onto the four things you ever do with data:{' '}
        <strong>create, read, update, delete</strong> (together, <Term definition="Create, Read, Update, Delete: the four basic operations on stored data.">CRUD</Term>).
      </p>
      <Table
        headers={['Method', 'Meaning', 'Example request', 'What happens']}
        rows={[
          [<code key="g">GET</code>, 'Read', 'GET /tasks', 'Give me all tasks'],
          [<code key="p">POST</code>, 'Create', 'POST /tasks', 'Add a new task (the details are in the body)'],
          [<code key="u">PUT / PATCH</code>, 'Update', 'PUT /tasks/7', 'Change task number 7'],
          [<code key="d">DELETE</code>, 'Delete', 'DELETE /tasks/7', 'Remove task number 7'],
        ]}
      />
      <Callout type="info" title="Reading a URL path">
        <code>/tasks</code> means &quot;the collection of tasks&quot;. <code>/tasks/7</code> means &quot;the one task whose
        id is 7&quot;. Named after the <em>thing</em>, never the action. The method carries the action.
      </Callout>

      <Section title="JSON: the language of the response" />
      <p>
        Responses come back as <Term definition="JavaScript Object Notation: a plain-text way to write structured data that every language can read.">JSON</Term>:
        plain text with labels and values. You can read it as easily as a form.
      </p>
      <CodeBlock
        language="json"
        title="GET /tasks → response"
        code={`[
  { "id": 1, "title": "Buy milk", "done": false },
  { "id": 2, "title": "Book dentist", "done": true }
]`}
      />
      <p>Square brackets mean a list. Curly braces mean one item with named fields.</p>

      <Section title="Status codes: did it work?" />
      <p>
        Every response begins with a three-digit number that tells you what happened, before you read a word of the
        body. The first digit is the family:
      </p>
      <Table
        headers={['Code', 'Meaning', 'When you see it']}
        rows={[
          [<code key="a">200 OK</code>, 'Success', 'A GET worked'],
          [<code key="b">201 Created</code>, 'Success, something new exists', 'A POST added a record'],
          [<code key="c">404 Not Found</code>, 'That thing does not exist', 'You asked for /tasks/999'],
          [<code key="d">422 Unprocessable</code>, 'The data you sent was invalid', 'A required field was missing'],
          [<code key="e">500 Server Error</code>, 'The backend crashed', 'A bug in the backend code'],
        ]}
      />
      <Callout type="tip" title="A cheat for the first digit">
        <strong>2xx</strong> means it worked. <strong>4xx</strong> means <em>you</em> (the request) did something wrong.
        <strong> 5xx</strong> means the <em>server</em> did. That alone tells you where to start looking when something breaks.
      </Callout>

      <Section title="You will meet this for real soon" />
      <p>
        When we build the backend you will open a web page called <code>/docs</code> that lists every endpoint your API
        offers, with a button to try each one. It is the menu from the restaurant analogy, and FastAPI writes it for you.
      </p>

      <QuizSet>
        <Quiz
          question="Which request would delete task number 3?"
          options={['GET /tasks/3', 'POST /tasks/3', 'DELETE /tasks/3', 'DELETE /deleteTask']}
          correctIndex={2}
          explanation="The URL names the thing (/tasks/3). The method (DELETE) says what to do with it."
        />
        <Quiz
          question="You get a 404. What does it most likely mean?"
          options={['The server crashed', 'The thing you asked for was not found', 'It worked', 'Your data was invalid']}
          correctIndex={1}
          explanation="404 means not found, often a mistyped URL or a missing id."
        />
        <MultiSelectQuiz
          question="Which of these are valid first digits of a status code that means a problem? (Pick all)"
          options={['2xx', '4xx', '5xx']}
          correctIndexes={[1, 2]}
          explanation="4xx: your request was wrong. 5xx: the server failed. 2xx is success."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'An API is a list of requests a program will answer. The frontend asks, the backend replies.',
          'A request has a URL (what), a method (do what) and sometimes a body (the data).',
          'GET reads, POST creates, PUT/PATCH updates, DELETE removes.',
          'Responses are JSON, starting with a status code: 2xx worked, 4xx your request was off, 5xx the server broke.',
        ]}
      />
    </div>
  );
}
