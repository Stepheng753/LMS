import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { NEXTCLOUD_COMPOSE } from '../../toolkit/tools_homelab';

const NEXTCLOUD_SITE = `# /etc/nginx/sites-available/files.example.com
server {
    listen 80;
    listen [::]:80;
    server_name files.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name files.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Big files: no limit, long timeouts
    client_max_body_size 0;
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;
    send_timeout 300s;

    # Calendar and contacts discovery
    location = /.well-known/carddav { return 301 https://$host/remote.php/dav; }
    location = /.well-known/caldav  { return 301 https://$host/remote.php/dav; }

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;

export default function Step3_21_Nextcloud() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.21 • Self-Hosted Apps"
        title="Nextcloud: Your Own Cloud Drive"
        summary="Files that sync between your devices, a calendar, contacts and sharing, on your own server."
      />

      <p>
        <strong>Nextcloud</strong> is the open-source answer to Google Drive, Dropbox and Google Calendar. Put a file in
        the Nextcloud folder on your computer and it appears on your phone. Share a link with a friend. Keep a calendar
        and contacts in sync. Like Immich, it is more than one container: the application and a database.
      </p>

      <Callout type="info" title="Which way to install?">
        Nextcloud itself describes two routes. Its <strong>All-in-One</strong> container is the one recommended for most
        people, and it has its own set-up flow and its own ideas about reverse proxies. The plain{' '}
        <strong>official image with compose</strong> is the one shown here, because it is the clearest way to see every
        piece and it follows the same pattern as everything else in this topic. If you later want the all-in-one
        experience, ask your AI helper to follow Nextcloud&apos;s own All-in-One instructions.
      </Callout>

      <Section title="1. The compose file" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'mkdir -p ~/services/nextcloud && cd ~/services/nextcloud' },
          { command: 'nano docker-compose.yml' },
        ]}
      />
      <CodeBlock language="yaml" title="~/services/nextcloud/docker-compose.yml" code={NEXTCLOUD_COMPOSE} />
      <Table
        headers={['Part', 'Meaning']}
        rows={[
          [<code key="a">db</code>, 'The MariaDB database where Nextcloud keeps its records'],
          [<code key="b">app</code>, 'Nextcloud itself'],
          [<code key="c">./db and ./html</code>, 'Folders on the server holding the database and the files. The data survives containers being replaced'],
          [<code key="d">127.0.0.1:8080:80</code>, 'Port 80 inside the container is published privately as 8080'],
          [<code key="e">NEXTCLOUD_TRUSTED_DOMAINS</code>, 'The name people use. Nextcloud refuses to answer under any other'],
          [<code key="f">OVERWRITEHOST / OVERWRITEPROTOCOL</code>, 'Tells it that the outside world sees https and your real name, not the internal address'],
          [<code key="g">TRUSTED_PROXIES</code>, 'Which addresses are allowed to speak for visitors (nginx, from inside Docker\'s network). The value shown is a starting point'],
        ]}
      />
      <Callout type="warning" title="Change every 'change-me' and your domain">
        Replace the three placeholder passwords (use long, random, unique ones) and <code>files.&lt;your-domain&gt;</code>{' '}
        with your real name. The two <code>MYSQL_PASSWORD</code> lines must match. Then protect the file:{' '}
        <code>chmod 600 docker-compose.yml</code>, since it now contains passwords. Never commit it.
      </Callout>
      <TerminalBlock
        path="anna@homelab:~/services/nextcloud"
        lines={[
          { command: 'chmod 600 docker-compose.yml' },
          { command: 'docker compose up -d', output: '✔ Container nextcloud-db-1   Started\n✔ Container nextcloud-app-1  Started' },
          { command: 'curl -sI http://127.0.0.1:8080 | head -n 1', output: 'HTTP/1.1 302 Found' },
        ]}
      />

      <Section title="2. DNS and nginx" />
      <p>Add <code>files</code> in Cloudflare (A, your Tailscale IP, DNS only), then:</p>
      <CodeBlock language="bash" title="nginx site for Nextcloud" code={NEXTCLOUD_SITE} />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo nano /etc/nginx/sites-available/files.example.com' },
          { command: 'sudo ln -s /etc/nginx/sites-available/files.example.com /etc/nginx/sites-enabled/' },
          { command: 'sudo nginx -t && sudo systemctl reload nginx' },
        ]}
      />
      <p>
        The two <code>.well-known</code> lines help calendar and contacts apps find the right address automatically.
      </p>

      <Section title="3. First visit" />
      <Steps
        steps={[
          { title: 'Open https://files.example.com', children: <p>The first visit shows a setup page. Create the <strong>admin</strong> account with a strong password. The database details are already supplied by the compose file.</p> },
          { title: 'Wait while it installs', children: <p>It can take a minute or two. Skip the optional recommended apps if you only want files.</p> },
          { title: 'Install the desktop and phone apps', children: <p>Enter <code>https://files.example.com</code>. With Tailscale on, they sync from anywhere.</p> },
          { title: 'Check Administration settings → Overview', children: <p>Nextcloud lists warnings about its own setup. Most can be ignored while you learn, but read them.</p> },
        ]}
      />
      <Callout type="success" title="Success looks like this">
        You log in over HTTPS, upload a file through the web page, and see it appear on a synced device. All links Nextcloud
        generates start with <code>https://files.example.com</code>.
      </Callout>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>&quot;Access through untrusted domain&quot;:</strong> the name you typed is not in <code>NEXTCLOUD_TRUSTED_DOMAINS</code>. Fix the compose file and run <code>docker compose up -d</code>. Note that settings from the first install are also stored in <code>html/config/config.php</code>, which may need editing.</li>
          <li><strong>Links or redirects use http:// or the wrong host:</strong> check <code>OVERWRITEPROTOCOL</code>, <code>OVERWRITEHOST</code> and <code>TRUSTED_PROXIES</code>. Ask your AI helper with the exact message.</li>
          <li><strong>A 502 from nginx:</strong> the app is not running. <code>docker compose ps</code> and <code>docker compose logs app</code>.</li>
          <li><strong>Upload fails on big files:</strong> make sure the nginx block has <code>client_max_body_size 0;</code> and that you reloaded nginx.</li>
        </ul>
      </Collapsible>

      <Callout type="warning" title="Back up before you trust it">
        Your files and the database are in <code>~/services/nextcloud/html</code> and <code>~/services/nextcloud/db</code>.
        Both must be backed up together. Step 3.22 shows how.
      </Callout>

      <QuizSet>
        <Quiz
          question="What happens if you reach Nextcloud under a name that is not in NEXTCLOUD_TRUSTED_DOMAINS?"
          options={['It works anyway', 'It refuses with an untrusted-domain message', 'It deletes data', 'It redirects to Google']}
          correctIndex={1}
          explanation="Nextcloud only answers under names it has been told to trust."
        />
        <Quiz
          question="Why must the compose file be chmod 600?"
          options={['To make it faster', 'It contains passwords', 'Docker requires it', 'It makes backups smaller']}
          correctIndex={1}
          explanation="Passwords in a file should be readable only by their owner."
        />
        <Quiz
          question="What must be backed up for Nextcloud?"
          options={['Only the html folder', 'Only the database', 'Both the files (html) and the database (db)', 'Neither']}
          correctIndex={2}
          explanation="The files and the database describe each other. One without the other is not enough to restore."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Nextcloud = files, sync, calendar and contacts on your own server.',
          'The official-image compose has a database container and an app container, both with data in local folders.',
          'Trusted domains and the overwrite settings tell it the name and protocol the world sees.',
          'Passwords live in the compose file, so chmod 600 it. Back up html and db together.',
        ]}
      />
    </div>
  );
}
