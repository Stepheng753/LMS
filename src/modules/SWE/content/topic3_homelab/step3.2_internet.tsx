import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { Flow } from '../../../../components/content/Flow';

export default function Step3_2_Internet() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.2 • Foundations"
        title="How the Internet Works"
        summary="What really happens when you type a web address, and why it is exactly the same as opening your app on localhost."
      />

      <p>
        In Topic 2 you opened <code>http://localhost:5173</code> and a page appeared. When you open{' '}
        <code>https://www.example.com</code>, the same thing happens: your browser sends a <strong>request</strong>,
        and a program somewhere sends back a <strong>response</strong>. The only difference is distance. Instead of
        travelling inside your own computer, the request crosses cables, buildings and sometimes oceans.
      </p>

      <Compare
        goodLabel="Your app in Topic 2"
        badLabel="A website on the internet"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>Address: <code>localhost:5173</code></li>
            <li>Travels: inside your computer</li>
            <li>Server: your backend on port 8000</li>
            <li>Only you can reach it</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>Address: <code>www.example.com</code></li>
            <li>Travels: through your router, your ISP and fibre cables</li>
            <li>Server: a computer in a data centre</li>
            <li>Anyone in the world can reach it</li>
          </ul>
        }
      />
      <p>
        A homelab is the bridge between those two columns. You are about to make something that is only on{' '}
        <code>localhost</code> reachable by name, from anywhere.
      </p>

      <Section title="The physical journey" />
      <Flow
        steps={[
          { title: 'Your device', sub: 'phone or laptop' },
          { title: 'Wi-Fi or cable', sub: 'to your router' },
          { title: 'Router', sub: 'the door of your home network' },
          { title: 'ISP', sub: 'your internet provider' },
          { title: 'Fibre backbone', sub: 'light in glass, across cities and oceans' },
          { title: 'Data centre', sub: 'where the server lives' },
        ]}
      />
      <p>
        Your data is chopped into small chunks called <Term definition="A small piece of data sent across a network. Big messages are split into many packets and put back together at the other end.">packets</Term>.
        Each packet finds its own route, hopping from one network to the next, like letters travelling through many
        sorting offices. At the other end, the packets are reassembled and the server reads the request. On long
        routes the data travels as pulses of light through glass fibre, which is why the internet is fast, but the
        speed of light still sets a limit. A round trip across an ocean takes noticeable tens of milliseconds.
      </p>

      <Section title="What happens when you type a URL" />
      <p>For <code>https://www.example.com/photos</code>, your browser does these steps in order:</p>
      <Steps
        steps={[
          {
            title: 'DNS lookup: turn the name into an address',
            children: <p>Computers talk using numbers called IP addresses, not names. Your browser asks a DNS server (a phonebook) &quot;what is the address of <code>www.example.com</code>?&quot; and gets back something like <code>93.184.216.34</code>. We cover DNS properly in step 3.15.</p>,
          },
          {
            title: 'Connect: open a line to that address',
            children: <p>Your computer opens a connection to the server&apos;s address on <strong>port 443</strong> (the standard door for secure websites). This takes a quick back-and-forth exchange called a handshake.</p>,
          },
          {
            title: 'Encrypt: set up HTTPS',
            children: <p>The browser and server agree on a secret code, using a certificate that proves the server is who it claims to be. From now on everything is scrambled. That is the padlock. You will set this up yourself in step 3.17.</p>,
          },
          {
            title: 'Request: the same HTTP as Topic 2',
            children: <p>The browser sends <code>GET /photos</code>, just like the requests in step 2.1.</p>,
          },
          {
            title: 'The server does its work',
            children: <p>On the other end it is the same story as your app: a backend receives the request, asks its database if it needs to, and builds a reply.</p>,
          },
          {
            title: 'Response: back along the same path',
            children: <p>A status code (<code>200</code>) and the page travel back through the fibre, the ISP, your router and your Wi-Fi.</p>,
          },
          {
            title: 'The browser draws the page',
            children: <p>Exactly like your React frontend did with the JSON from the backend.</p>,
          },
        ]}
      />
      <Callout type="info" title="The whole thing takes about a tenth of a second">
        All of that, including crossing half a continent, usually finishes before you have blinked. Most pages repeat the
        process dozens of times for images, scripts and data.
      </Callout>

      <Section title="Try it yourself" />
      <p>
        Open your Ubuntu terminal in WSL. First install two small tools (you remember <code>apt</code> from step 1.9):
      </p>
      <TerminalBlock path="~" command="sudo apt install -y traceroute dnsutils" />

      <p><strong>DNS:</strong> ask the phonebook for an address.</p>
      <TerminalBlock
        path="~"
        lines={[{ command: 'dig +short example.com', output: '93.184.216.34' }]}
      />
      <p><strong>Ping:</strong> measure the round trip, in milliseconds.</p>
      <TerminalBlock
        path="~"
        lines={[
          {
            command: 'ping -c 3 example.com',
            output: `64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=18.2 ms
64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=17.9 ms
64 bytes from 93.184.216.34: icmp_seq=3 ttl=56 time=18.4 ms`,
          },
        ]}
      />
      <p><strong>Traceroute:</strong> list the hops the packets take.</p>
      <TerminalBlock
        path="~"
        lines={[
          {
            command: 'traceroute example.com',
            output: ` 1  192.168.1.1        1.2 ms     (your router)
 2  10.20.0.1          7.8 ms     (your ISP)
 3  ...                12.4 ms    (the ISP's network)
 4  ...                16.1 ms    (a hop in a backbone network)
 5  93.184.216.34      18.2 ms    (the destination)`,
          },
        ]}
      />
      <p><strong>curl:</strong> make the request without a browser, and show the headers.</p>
      <TerminalBlock
        path="~"
        lines={[{ command: 'curl -I https://example.com', output: 'HTTP/2 200\ncontent-type: text/html; charset=UTF-8\n...' }]}
      />
      <Callout type="tip" title="Your numbers will differ">
        The sample output above is illustrative. Some hops show <code>* * *</code> because routers are allowed to ignore
        these probes. That is normal.
      </Callout>
      <p>
        And one you already know: open any website, press <code>F12</code>, choose the <strong>Network</strong> tab and
        reload. Each row is a request/response, just like the ones you traced in step 2.13.
      </p>

      <Table
        caption="Same ideas, new places"
        headers={['In Topic 2', 'On the real internet']}
        rows={[
          ['localhost', 'A real address found through DNS'],
          ['Port 5173 / 8000', 'Port 443 (HTTPS) or 80 (HTTP)'],
          ['Plain HTTP', 'HTTP inside an encrypted HTTPS connection'],
          ['Your computer', 'A server in a data centre, or in your home'],
          ['CORS between two ports', 'One name with nginx routing /api to the backend (step 3.16)'],
        ]}
      />

      <Exercise
        title="Trace a request"
        hint={<p>Start with the name and end with the picture on screen. There are seven steps from step 1 above.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li>DNS turns <code>photos.example.com</code> into an IP address.</li>
            <li>Your device connects to that address on port 443 through your router, ISP and the fibre network.</li>
            <li>Browser and server set up encryption (HTTPS).</li>
            <li>The browser sends <code>GET /</code>.</li>
            <li>The server&apos;s backend builds the page, reading its database.</li>
            <li>The response travels back along the same path.</li>
            <li>The browser draws it.</li>
          </ol>
        }
      >
        <p>In your own words: explain what happens between typing <code>photos.example.com</code> and seeing the page.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What does DNS do?"
          options={['Encrypts the connection', 'Turns a name into an IP address', 'Stores your files', 'Speeds up your Wi-Fi']}
          correctIndex={1}
          explanation="DNS is the phonebook that maps names to numeric addresses."
        />
        <Quiz
          question="Which port do secure (HTTPS) websites use by default?"
          options={['22', '80', '443', '8000']}
          correctIndex={2}
          explanation="443 is the standard HTTPS port. 80 is plain HTTP and 22 is SSH."
        />
        <Quiz
          question="How is loading a website different from loading your Topic 2 app?"
          options={[
            'It uses a different kind of request',
            'It is the same request and response, only the distance and the encryption differ',
            'It does not need a server',
            'It does not use ports',
          ]}
          correctIndex={1}
          explanation="The conversation is the same. The internet just carries it further, with a name lookup and encryption added."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Loading a website is the same request and response as your localhost app, carried across more hops.',
          'Order: DNS lookup → connect → encrypt (HTTPS) → request → server work → response → draw.',
          'Data travels as packets through your router, your ISP, and fibre-optic backbones to a data centre.',
          'dig, ping, traceroute and curl let you watch each part yourself.',
        ]}
      />
    </div>
  );
}
