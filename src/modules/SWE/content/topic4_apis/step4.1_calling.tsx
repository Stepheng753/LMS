import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_1_Calling() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.1 • Basics"
        title="Calling an API From the Terminal"
        summary="Make your first requests with curl, read the JSON that comes back, and learn the five parts of every request."
      />

      <p>
        Before writing any app code, the best way to understand an API is to talk to it by hand. The tool for that is{' '}
        <code>curl</code>, which sends an HTTP request from your terminal and shows the reply. You met requests and responses
        in step 2.1. Now you are on the sending side.
      </p>

      <Section title="The five parts of a request" />
      <Table
        headers={['Part', 'What it is', 'Example']}
        rows={[
          ['URL', 'The base address, plus a path to the thing you want', 'https://api.open-meteo.com/v1/forecast'],
          ['Query parameters', 'Options added after a ?, separated by &', '?latitude=40.71&longitude=-74.01'],
          ['Method', 'What to do: GET, POST, PUT, PATCH, DELETE', 'GET'],
          ['Headers', 'Extra information: who you are, what format you send', 'Authorization: Bearer ...'],
          ['Body', 'The data you send (POST and similar), usually JSON', '{"title": "Hello"}'],
        ]}
      />

      <Section title="1. Install jq" />
      <p>
        APIs return JSON, which is hard to read when it arrives as one long line. <strong>jq</strong> pretty-prints and
        picks values out of it.
      </p>
      <TerminalBlock path="~" command="sudo apt install -y jq" />

      <Section title="2. Your first GET" />
      <p>
        We will use a free weather API called Open-Meteo. It needs no key and no account. Latitude and longitude 40.71, -74.01
        is New York. (Ask your AI helper for the numbers for your own city.)
      </p>
      <TerminalBlock
        path="~"
        lines={[
          {
            command: 'curl -s "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m,wind_speed_10m"',
            output: '{"latitude":40.710335,"longitude":-73.99307,"current_units":{"temperature_2m":"°C","wind_speed_10m":"km/h"},"current":{"time":"2026-10-14T09:00","interval":900,"temperature_2m":14.2,"wind_speed_10m":9.4}}',
          },
        ]}
      />
      <p>Now make it readable, and pick out just the part you want:</p>
      <TerminalBlock
        path="~"
        lines={[
          {
            command: 'curl -s "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m,wind_speed_10m" | jq .current',
            output: '{\n  "time": "2026-10-14T09:00",\n  "interval": 900,\n  "temperature_2m": 14.2,\n  "wind_speed_10m": 9.4\n}',
          },
        ]}
      />
      <CommandTable
        title="curl flags to know"
        rows={[
          { command: 'curl -s URL', description: '-s (silent): hide the progress bar, show only the reply', example: 'curl -s https://example.com' },
          { command: 'curl -i URL', description: 'Include the status line and headers in the output', example: 'curl -i https://example.com' },
          { command: 'curl -X POST URL', description: '-X chooses the method', example: 'curl -X POST …' },
          { command: 'curl -H "Name: value" URL', description: '-H adds a header (use it several times)', example: 'curl -H "Accept: application/json" …' },
          { command: "curl -d '{...}' URL", description: '-d sends a body (a POST by default)', example: "curl -d '{\"a\":1}' …" },
          { command: '… | jq .field', description: 'Pipe the reply into jq to pick a field', example: '… | jq .current.temperature_2m' },
        ]}
      />
      <Callout type="info" title="Quote the URL">
        Put the whole URL in quotes. The <code>&amp;</code> character means something special to the shell, so an unquoted
        URL with several parameters will be cut off.
      </Callout>

      <Section title="3. Sending data: a POST" />
      <p>
        <strong>JSONPlaceholder</strong> is a free practice API that pretends to save what you send. A POST needs a header
        saying &quot;this is JSON&quot;, and a body:
      </p>
      <TerminalBlock
        path="~"
        lines={[
          {
            command: `curl -s -X POST https://jsonplaceholder.typicode.com/posts -H "Content-Type: application/json" -d '{"title":"hello","body":"my first post","userId":1}'`,
            output: '{\n  "title": "hello",\n  "body": "my first post",\n  "userId": 1,\n  "id": 101\n}',
          },
        ]}
      />
      <p>The server answered with your data and an invented <code>id</code>. It did not really store it, but the shape is exactly what a real API does.</p>

      <Section title="4. Reading the status code" />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'curl -s -o /dev/null -w "%{http_code}\\n" https://jsonplaceholder.typicode.com/posts/1', output: '200' },
          { command: 'curl -s -o /dev/null -w "%{http_code}\\n" https://jsonplaceholder.typicode.com/posts/99999', output: '404' },
        ]}
      />
      <p>
        <code>-w &quot;%&#123;http_code&#125;&quot;</code> prints just the status code, and <code>-o /dev/null</code> throws away
        the body. 200 means it worked, and 404 means that thing does not exist. The rest of the table from step 2.1 applies
        too: 4xx means your request was wrong, 5xx means their server failed.
      </p>

      <Callout type="tip" title="Where to find practice APIs">
        Search for &quot;free public APIs no key&quot;. Weather, countries, jokes, space photos and exchange rates are easy
        to try. Always read a free API&apos;s usage rules and be gentle: do not hammer it with thousands of requests.
      </Callout>

      <Exercise
        title="Weather for your city"
        hint={<p>Ask your AI helper for the latitude and longitude of your city, then change the two numbers in the URL. Add <code>daily=temperature_2m_max</code> to see tomorrow too, and read the Open-Meteo page to see what else exists.</p>}
        solution={
          <TerminalBlock
            path="~"
            command={'curl -s "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&current=temperature_2m&daily=temperature_2m_max&timezone=auto" | jq \'{now: .current.temperature_2m, tomorrow_max: .daily.temperature_2m_max[1]}\''}
            output={'{\n  "now": 11.8,\n  "tomorrow_max": 14.3\n}'}
          />
        }
      >
        <p>
          Get the current temperature for your own city, and use <code>jq</code> to print only that number. Then find a
          second value on the Open-Meteo page that you could add to the URL.
        </p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What does the part of a URL after the ? contain?"
          options={['The method', 'Query parameters (options for the request)', 'The response', 'The password']}
          correctIndex={1}
          explanation="Query parameters are name=value pairs, separated by &."
        />
        <Quiz
          question="You POST JSON with curl. Which header tells the server the body is JSON?"
          options={['Accept', 'Content-Type: application/json', 'Authorization', 'Host']}
          correctIndex={1}
          explanation="Content-Type describes the body you are sending."
        />
        <Quiz
          question="What does jq do?"
          options={['Sends requests', 'Formats JSON and picks values out of it', 'Encrypts data', 'Stores secrets']}
          correctIndex={1}
          explanation="jq reads JSON and lets you filter it, such as jq .current."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A request is a URL, query parameters, a method, headers and (sometimes) a body.',
          'curl -s "URL" | jq . is the everyday way to explore an API.',
          'POST needs -X POST, a Content-Type header and a -d body.',
          'Always quote URLs, and always check the status code before trusting the body.',
        ]}
      />
    </div>
  );
}
