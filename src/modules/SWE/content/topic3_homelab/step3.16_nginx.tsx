import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Exercise } from '../../../../components/content/Exercise';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { NGINX_PROXY_SKILL } from '../topic_toolkit/tools/tools_homelab';

const HTTP_ONLY_SITE = `# /etc/nginx/sites-available/app.example.com   (HTTP only, for now)
server {
    listen 80;
    server_name app.example.com;

    # The API: /api/tasks is sent to the backend as /tasks
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Everything else: the website
    location / {
        proxy_pass http://127.0.0.1:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}`;

export default function Step3_16_Nginx() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.16 • Names & Traffic"
        title="nginx: The Front Door"
        summary="One program that receives all the traffic and sends each request to the right app, based on the name it was addressed to."
      />

      <p>
        Your server now runs several things on different ports: your app&apos;s frontend on 5173, its backend on 8000, and
        soon Jellyfin on 8096, Immich on 2283, Nextcloud on 8080. Visitors should not have to know any of that. They type{' '}
        <code>app.example.com</code> and expect it to work. <strong>nginx</strong> (say &quot;engine-x&quot;) is a{' '}
        <strong>reverse proxy</strong>: a receptionist who looks at the name on the request and forwards it to the right
        room. It also handles the padlock (HTTPS) so the apps behind it do not have to.
      </p>
      <Table
        headers={['Visitor asks for', 'nginx forwards to']}
        rows={[
          ['app.example.com/', 'the frontend container, 127.0.0.1:5173'],
          ['app.example.com/api/…', 'the backend container, 127.0.0.1:8000'],
          ['jellyfin.example.com', '127.0.0.1:8096'],
          ['photos.example.com', '127.0.0.1:2283'],
        ]}
      />
      <Callout type="info" title="nginx runs on the host, not in a container">
        Docker runs the apps. nginx is installed on the server itself with <code>apt</code>, and is the only thing that
        should ever face the network. Every app listens privately on <code>127.0.0.1</code>.
      </Callout>

      <Section title="1. Install it" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo apt install -y nginx' },
          { command: 'sudo systemctl enable --now nginx' },
          { command: 'systemctl status nginx', output: '● nginx.service - A high performance web server\n   Active: active (running)' },
        ]}
      />
      <p>
        Your firewall already allows everything arriving over Tailscale (step 3.10), which is all the private setup needs.
      </p>

      <Section title="2. How nginx is organised" />
      <Table
        headers={['Folder', 'Purpose']}
        rows={[
          [<code key="a">/etc/nginx/sites-available/</code>, 'One config file per website name. Files here do nothing until they are enabled'],
          [<code key="b">/etc/nginx/sites-enabled/</code>, 'Shortcuts (symbolic links) to the files in sites-available that are switched on'],
        ]}
      />
      <Callout type="success" title="The golden rule: test, then reload">
        Never stop nginx to change its settings. Always run:
        <br />
        <code>sudo nginx -t &amp;&amp; sudo systemctl reload nginx</code>
        <br />
        <code>-t</code> checks the syntax. Only if it passes does the reload happen, with zero downtime. A typo found
        by <code>-t</code> costs nothing. A typo loaded into a running server takes every site down.
      </Callout>

      <Section title="3. Read a server block" />
      <p>
        A <code>server</code> block is one website. Here is the first version of your app&apos;s file. It speaks plain
        HTTP for now, and we add the padlock in the next step.
      </p>
      <CodeBlock language="bash" title="/etc/nginx/sites-available/app.example.com" code={HTTP_ONLY_SITE} />
      <Table
        headers={['Line', 'Meaning']}
        rows={[
          [<code key="a">listen 80;</code>, 'Answer on port 80 (plain web)'],
          [<code key="b">server_name app.example.com;</code>, 'This block is for requests addressed to this name. It is how nginx tells sites apart'],
          [<code key="c">location /api/ {'{ … }'}</code>, 'Rules for addresses that start with /api/'],
          [<code key="d">proxy_pass http://127.0.0.1:8000/;</code>, 'Forward to the backend. The trailing slash removes /api, so /api/tasks arrives as /tasks'],
          [<code key="e">location / {'{ … }'}</code>, 'Everything else goes to the frontend on 5173'],
          [<code key="f">proxy_set_header …</code>, 'Pass the original details (name, visitor address) along to the app'],
          [<code key="g">Upgrade / Connection</code>, 'Allows WebSockets (live connections) to pass through'],
        ]}
      />

      <Section title="4. Turn a new name on: the checklist" />
      <p>
        This is the same routine you will repeat for every app, from your own FlashServer notes. Keep it handy.
      </p>
      <Steps
        steps={[
          { title: 'DNS record', children: <p>The name exists in Cloudflare (step 3.15).</p> },
          { title: 'The app answers locally', children: <TerminalBlock path="anna@homelab:~" command="curl -sI http://127.0.0.1:5173 | head -n 1" output="HTTP/1.1 200 OK" /> },
          {
            title: 'Create the site file',
            children: <TerminalBlock path="anna@homelab:~" command="sudo nano /etc/nginx/sites-available/app.example.com" />,
          },
          {
            title: 'Enable it with a link',
            children: <TerminalBlock path="anna@homelab:~" command="sudo ln -s /etc/nginx/sites-available/app.example.com /etc/nginx/sites-enabled/" />,
          },
          { title: 'Test the syntax', children: <TerminalBlock path="anna@homelab:~" command="sudo nginx -t" output={'syntax is ok\ntest is successful'} /> },
          { title: 'Reload', children: <TerminalBlock path="anna@homelab:~" command="sudo systemctl reload nginx" /> },
          { title: 'Open it', children: <p>With Tailscale on, go to <code>http://app.example.com</code> in your browser. Your app should load, and its data should appear.</p> },
        ]}
      />
      <Callout type="success" title="Success looks like this">
        Your Topic 2 app opens at a real name, and tasks you add are saved through <code>/api</code>. If you still see the
        nginx welcome page, remove the <code>default</code> link: <code>sudo rm /etc/nginx/sites-enabled/default</code>.
      </Callout>

      <Section title="Three patterns from real life" />
      <p>
        The nginx template from your FlashServer repo covers the three shapes you will meet again and again. It is in your
        toolkit for download, and here is what each is for.
      </p>
      <Table
        headers={['Pattern', 'Use it when', 'The key line']}
        rows={[
          ['1. Socket proxy', 'A Python (Gunicorn) service talks over a socket file', <code key="a">proxy_pass http://unix:/tmp/app.sock;</code>],
          ['2. Static site + API', 'A built frontend is served from files, with a backend behind /api', <code key="b">root …/dist; try_files …; location /api</code>],
          ['3. Local port', 'A Docker app listens on a local port: our case, and Jellyfin, Immich, Nextcloud', <code key="c">proxy_pass http://localhost:PORT;</code>],
        ]}
      />
      <Callout type="tip" title="Photo apps need big uploads">
        For Immich and Nextcloud add <code>client_max_body_size 0;</code> inside the block. nginx&apos;s default limit is
        only 1 MB, so without it, uploads fail with &quot;413 Request Entity Too Large&quot;.
      </Callout>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>502 Bad Gateway:</strong> nginx works but the app behind it does not answer. Run <code>docker compose ps</code> and check the port number.</li>
          <li><strong>The nginx welcome page appears:</strong> your site is not enabled, or <code>server_name</code> does not match the address you typed.</li>
          <li><strong>&quot;Blocked request. This host is not allowed&quot;:</strong> that is Vite. Allow the name in <code>vite.config.ts</code> (step 3.14).</li>
          <li><strong><code>nginx -t</code> fails:</strong> it names the file and line. Check for a missing semicolon or brace.</li>
          <li><strong>Page loads, data does not:</strong> open <code>F12 → Network</code>. If requests go to <code>/tasks</code> instead of <code>/api/tasks</code>, the frontend constant was not changed.</li>
        </ul>
      </Collapsible>

      <Exercise
        title="Add a name"
        hint={<p>Follow the checklist: DNS, local check, site file, link, test, reload, open.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Add an A record <code>hello</code> in Cloudflare (DNS only).</li>
            <li>Run <code>docker run -d --name hello -p 127.0.0.1:8083:80 nginx</code>.</li>
            <li>Write a site file with <code>server_name hello.example.com;</code> and <code>proxy_pass http://127.0.0.1:8083;</code>.</li>
            <li>Link it, run <code>sudo nginx -t</code>, then <code>sudo systemctl reload nginx</code>.</li>
            <li>Open <code>http://hello.example.com</code>. You should see the nginx welcome page.</li>
          </ol>
        }
      >
        <p>Publish a throw-away container at <code>hello.example.com</code> using the checklist, then remove it again.</p>
      </Exercise>

      <TeachAI kind="skill" name="nginx-proxy" text={NGINX_PROXY_SKILL} />

      <QuizSet>
        <Quiz
          question="How does nginx decide which site a request is for?"
          options={['The port only', 'The server_name matching the address typed', 'Random', 'The visitor\'s IP']}
          correctIndex={1}
          explanation="The name in the request (Host) is matched against each server_name."
        />
        <Quiz
          question="Why run sudo nginx -t before reloading?"
          options={['It is faster', 'It catches mistakes before they take the sites down', 'It restarts nginx', 'It renews certificates']}
          correctIndex={1}
          explanation="The test checks the config without applying it."
        />
        <Quiz
          question="proxy_pass http://127.0.0.1:8000/; inside location /api/ turns /api/tasks into what?"
          options={['/api/tasks', '/tasks', '/8000/tasks', 'Nothing']}
          correctIndex={1}
          explanation="The trailing slash replaces the /api/ prefix."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'nginx is a reverse proxy: it receives every request and forwards it by name to the right local app.',
          'It runs on the host. Apps stay on 127.0.0.1.',
          'One file per name in sites-available, linked into sites-enabled. Always sudo nginx -t && sudo systemctl reload nginx.',
          'location /api/ with a trailing-slash proxy_pass is how the frontend reaches the backend.',
        ]}
      />
    </div>
  );
}
