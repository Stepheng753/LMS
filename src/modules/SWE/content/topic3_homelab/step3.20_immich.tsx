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

const IMMICH_SITE = `# /etc/nginx/sites-available/photos.example.com
server {
    listen 80;
    listen [::]:80;
    server_name photos.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name photos.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Photo and video uploads can be huge: no size limit, long timeouts
    client_max_body_size 0;
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;
    send_timeout 300s;

    location / {
        proxy_pass http://127.0.0.1:2283;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`;

export default function Step3_20_Immich() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.20 • Self-Hosted Apps"
        title="Immich: Your Own Photo Library"
        summary="Automatic phone backup, albums, search and face recognition, kept on your own disk."
      />

      <p>
        <strong>Immich</strong> does what Google Photos does: your phone uploads each picture and video automatically,
        and you can browse by date, search by people and places, and share albums. The difference is that the files
        live on your own server. It is a larger application than Jellyfin, made of several containers (the web server, a
        database, a machine-learning service for search and faces, and a cache), but you start them all with one command.
      </p>

      <Callout type="warning" title="Check your hardware first">
        Immich is hungry. The machine-learning part wants plenty of memory and CPU, and photos need lots of disk. Read
        the requirements page in Immich&apos;s documentation before installing. On a small old laptop, expect it to work,
        slowly, and to take a long time for the first scan. You can turn the heavy machine-learning jobs down or off in its
        settings.
      </Callout>

      <Section title="1. Download the official files" />
      <p>Always take Immich&apos;s files from its own documentation, from the &quot;Docker Compose&quot; install page:</p>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'mkdir -p ~/services/immich && cd ~/services/immich' },
          { command: 'wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml' },
          { command: 'wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env' },
        ]}
      />
      <p>
        Two files: <code>docker-compose.yml</code> (what to run) and <code>.env</code> (its settings). Yes, Immich uses a{' '}
        <code>.env</code> file. As step 3.19 explained, third-party apps follow their own rules.
      </p>

      <Section title="2. Edit the settings" />
      <TerminalBlock path="anna@homelab:~/services/immich" command="nano .env" />
      <Table
        headers={['Setting', 'What to put']}
        rows={[
          [<code key="a">UPLOAD_LOCATION</code>, 'Where photos and videos are stored. A folder on the server with plenty of free disk space, for example ./library'],
          [<code key="b">DB_DATA_LOCATION</code>, 'Where the database files live, for example ./postgres. This must be a local disk, not a network share'],
          [<code key="c">TZ</code>, 'Your timezone, for example America/New_York. Remove the # in front to switch it on'],
          [<code key="d">IMMICH_VERSION</code>, 'The version to run. Leave what the file says, or pin an exact version from the Immich releases page, so updates only happen when you choose'],
          [<code key="e">DB_PASSWORD</code>, 'Replace the default with your own. Use only letters and numbers'],
        ]}
      />
      <TerminalBlock path="anna@homelab:~/services/immich" command="chmod 600 .env" />

      <Section title="3. Keep it private: bind the port" />
      <TerminalBlock path="anna@homelab:~/services/immich" command="nano docker-compose.yml" />
      <p>
        Find the <code>immich-server</code> service and its <code>ports</code> entry. It looks something like{' '}
        <code>&quot;2283:2283&quot;</code>. Put <code>127.0.0.1:</code> in front, so it reads:
      </p>
      <CodeBlock language="yaml" title="docker-compose.yml (ports line)" code={`    ports:\n      - '127.0.0.1:2283:2283'`} />
      <Callout type="warning" title="Do not skip this edit">
        As you learned in step 3.9, without the <code>127.0.0.1</code> prefix, Docker opens the port to your whole network,
        around the firewall. The exact wording of the line may differ slightly between Immich versions. Keep the numbers
        and add the prefix.
      </Callout>

      <Section title="4. Start it" />
      <TerminalBlock
        path="anna@homelab:~/services/immich"
        lines={[
          { command: 'docker compose up -d', output: '[+] Pulling ...  (the first start downloads several containers and can take a while)' },
          { command: 'docker compose ps' },
          { command: 'curl -sI http://127.0.0.1:2283 | head -n 1', output: 'HTTP/1.1 200 OK' },
        ]}
      />

      <Section title="5. DNS and nginx" />
      <p>Add the Cloudflare record <code>photos</code> (A, your Tailscale IP, DNS only), then the nginx site:</p>
      <CodeBlock language="bash" title="nginx site for Immich" code={IMMICH_SITE} />
      <p>
        Compared with Jellyfin, the only new things are <code>client_max_body_size 0</code> (no upload limit) and the long
        timeouts, which keep large uploads from being cut off. Enable it and reload as always:
      </p>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo nano /etc/nginx/sites-available/photos.example.com' },
          { command: 'sudo ln -s /etc/nginx/sites-available/photos.example.com /etc/nginx/sites-enabled/' },
          { command: 'sudo nginx -t && sudo systemctl reload nginx' },
        ]}
      />

      <Section title="6. First visit and the phone app" />
      <Steps
        steps={[
          { title: 'Open https://photos.example.com', children: <p>The first account you create becomes the administrator. Use a strong password.</p> },
          { title: 'Follow the welcome steps', children: <p>Choose the defaults. You can change them in Administration later.</p> },
          { title: 'Install the Immich app on your phone', children: <p>With Tailscale on, enter <code>https://photos.example.com</code> as the server and sign in.</p> },
          { title: 'Turn on backup', children: <p>In the app, choose which albums to back up. New photos then upload by themselves whenever the phone can reach the server.</p> },
        ]}
      />
      <Callout type="success" title="Success looks like this">
        A photo you take on your phone appears in the web page a few moments later, and the file exists on the
        server&apos;s disk, in the <code>library</code> folder.
      </Callout>

      <Collapsible title="Good to know">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Backups are essential.</strong> If your phone uploads and then you delete its copy to free space, this server holds the only copy. Step 3.22 covers backups properly. Do it before you rely on this.</li>
          <li><strong>Updating:</strong> read the release notes first, because Immich sometimes has breaking changes. Then <code>docker compose pull &amp;&amp; docker compose up -d</code>.</li>
          <li><strong>The first scan is slow.</strong> Face recognition and search indexing of a big library can run for hours. Let it work.</li>
          <li><strong>Sharing with family:</strong> they can join your Tailscale network, or you can use the public setup from step 3.18 for just this name, with the risks that come with it.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Why does Immich have a .env file when your own projects do not?"
          options={['It is a mistake', 'Third-party apps keep their own documented configuration', 'Docker requires it', 'All apps use .env']}
          correctIndex={1}
          explanation="Our no-.env rule is for projects we write. Immich's official setup uses .env."
        />
        <Quiz
          question="What does client_max_body_size 0 do?"
          options={['Blocks uploads', 'Removes nginx\'s upload size limit', 'Compresses images', 'Closes the port']}
          correctIndex={1}
          explanation="Without it, large photos and videos would fail with a 413 error."
        />
        <Quiz
          question="Why must you set up backups before relying on Immich?"
          options={['Immich deletes photos', 'If you free phone space after uploading, the server holds the only copy', 'Backups make it faster', 'It is required to log in']}
          correctIndex={1}
          explanation="A single copy of precious photos on an old laptop is one disk failure from gone."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Immich is a self-hosted photo and video library with phone backup, search and faces.',
          'Download its official compose and .env, set the storage paths, timezone and a database password.',
          'Edit the ports line to 127.0.0.1:2283:2283, then add the nginx site with no upload limit.',
          'First user = admin. Install the app, turn on backup, and then set up backups of the server.',
        ]}
      />
    </div>
  );
}
