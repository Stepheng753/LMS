import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { JELLYFIN_COMPOSE, SELFHOSTED_SKILL } from '../topic_toolkit/tools/tools_homelab';

const LOCAL_PORT_SITE = `# /etc/nginx/sites-available/jellyfin.example.com
server {
    listen 80;
    listen [::]:80;
    server_name jellyfin.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name jellyfin.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 0;
    proxy_read_timeout 300s;

    location / {
        proxy_pass http://127.0.0.1:8096;
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

export default function Step3_19_Jellyfin() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.19 • Self-Hosted Apps"
        title="The Self-Hosting Pattern, and Jellyfin"
        summary="Learn the routine for adding any open-source app to your server, with Jellyfin as the first example."
      />

      <p>
        Every app you add in the next steps follows the same recipe. Learn it once with an easy app and the rest are
        variations. You will know it from your own checklist in step 3.16: it is the &quot;Local Port&quot; pattern.
      </p>

      <Section title="The recipe" />
      <Steps
        steps={[
          { title: 'Make a folder for the app', children: <p><code>~/services/&lt;app&gt;/</code>. Its compose file and its data live together.</p> },
          { title: 'Get the official compose file', children: <p>From the project&apos;s own documentation, never a random blog. Pin a version.</p> },
          { title: 'Bind the port to 127.0.0.1', children: <p>Edit the <code>ports</code> line so the app is private to the server (the Docker-and-firewall issue from step 3.9).</p> },
          { title: 'Start it', children: <p><code>docker compose up -d</code>, then check it answers locally with <code>curl</code>.</p> },
          { title: 'Add a DNS record', children: <p>An A record, DNS only, pointing at your Tailscale address.</p> },
          { title: 'Add an nginx site', children: <p>One file, linked into sites-enabled, the same wildcard certificate.</p> },
          { title: 'Open it over HTTPS and finish setup', children: <p>Most apps ask you to create an admin account on the first visit. Do it straight away.</p> },
        ]}
      />
      <Callout type="info" title="Your .env rule vs third-party apps">
        For your own projects you never use <code>.env</code> files. Third-party apps are different: they ship with their
        own documented configuration, and Immich uses a <code>.env</code> file. That is expected. Follow the app&apos;s
        instructions, but keep the file private (<code>chmod 600</code>), and never commit it.
      </Callout>

      <Section title="Jellyfin: your own streaming service" />
      <p>
        Jellyfin organises your videos and music and streams them to any browser, phone or TV app, with posters,
        descriptions and watch history, like a personal Netflix.
      </p>

      <Section title="1. Folders and media" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'mkdir -p ~/services/jellyfin/config ~/services/jellyfin/cache ~/media/videos' },
          { command: 'id', output: 'uid=1000(anna) gid=1000(anna) groups=1000(anna),27(sudo),999(docker)' },
        ]}
      />
      <p>
        <code>~/media/videos</code> is where the videos live. Copy some in from your computer with{' '}
        <code>scp</code>, for example <code>scp -r Family-2025 homelab:~/media/videos/</code>. The{' '}
        <code>id</code> command shows your user and group numbers (<code>1000</code> and <code>1000</code> here). Jellyfin runs as the
        same user, so it can read your files.
      </p>

      <Section title="2. The compose file" />
      <TerminalBlock path="anna@homelab:~" command="nano ~/services/jellyfin/docker-compose.yml" />
      <CodeBlock language="yaml" title="~/services/jellyfin/docker-compose.yml" code={JELLYFIN_COMPOSE} />
      <p>
        Replace <code>/path/to/your/media</code> with <code>/home/anna/media</code> (your own home path). The{' '}
        <code>:ro</code> at the end means <em>read-only</em>: Jellyfin can play your files, but can never change or delete
        them, a good safety habit.
      </p>
      <TerminalBlock
        path="anna@homelab:~/services/jellyfin"
        lines={[
          { command: 'docker compose up -d', output: '✔ Container jellyfin  Started' },
          { command: 'curl -sI http://127.0.0.1:8096 | head -n 1', output: 'HTTP/1.1 302 Found' },
        ]}
      />

      <Section title="3. DNS and nginx" />
      <p>In Cloudflare add <code>jellyfin</code> (A, your Tailscale IP, DNS only). Then create the site file:</p>
      <CodeBlock language="bash" title="nginx site for a Docker app on a local port" code={LOCAL_PORT_SITE} />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo nano /etc/nginx/sites-available/jellyfin.example.com' },
          { command: 'sudo ln -s /etc/nginx/sites-available/jellyfin.example.com /etc/nginx/sites-enabled/' },
          { command: 'sudo nginx -t && sudo systemctl reload nginx' },
        ]}
      />
      <p>
        This is the same &quot;Local Port&quot; pattern as in your nginx template. You only changed the name and the port.
      </p>

      <Section title="4. First visit" />
      <p>
        Open <code>https://jellyfin.example.com</code>. The setup wizard asks you to create an admin user, then add a
        library: choose the type (Movies, Shows, Music, Home Videos), and pick the folder <code>/media</code>. Let the
        first scan finish.
      </p>
      <Callout type="success" title="Success looks like this">
        Your videos appear with a poster each, and they play in the browser. Install the Jellyfin app on your phone or
        TV, enter <code>https://jellyfin.example.com</code>, and with Tailscale on you can watch from anywhere.
      </Callout>

      <Collapsible title="Good to know">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Transcoding:</strong> converting video on the fly for slow connections is CPU-heavy. An old laptop plays most files directly without it. Hardware acceleration is possible but needs extra setup. Ask your AI helper if playback stutters.</li>
          <li><strong>File names matter:</strong> Jellyfin finds posters by name, for example <code>Movie Name (2020).mp4</code>.</li>
          <li><strong>Updating:</strong> <code>docker compose pull &amp;&amp; docker compose up -d</code>. Read the release notes first.</li>
          <li><strong>Back up the <code>config</code> folder</strong> (your users, library and watch history). The media itself you may already have elsewhere.</li>
        </ul>
      </Collapsible>

      <Section title="Save the pattern" />
      <TeachAI kind="skill" name="selfhosted-apps" text={SELFHOSTED_SKILL} />

      <QuizSet>
        <Quiz
          question="Why bind an app's port to 127.0.0.1 even though ufw is on?"
          options={['It is faster', 'Docker publishes ports around ufw, so only 127.0.0.1 keeps it private', 'Jellyfin requires it', 'ufw does not exist on Ubuntu']}
          correctIndex={1}
          explanation="Docker's own network rules skip ufw, so the binding is the real protection."
        />
        <Quiz
          question="What does :ro on a volume mean?"
          options={['Run once', 'Read-only: the app can read but not change those files', 'Restart on', 'Root only']}
          correctIndex={1}
          explanation="Read-only mounts protect your original media."
        />
        <Quiz
          question="Which order is right?"
          options={[
            'nginx site, then compose file, then DNS',
            'Folder, compose on 127.0.0.1, start, DNS record, nginx site, open and set up',
            'DNS, then reinstall',
            'Open the app, then create the folder',
          ]}
          correctIndex={1}
          explanation="Get the app answering locally first, then give it a name and a front door."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Every self-hosted app: own folder, official compose, port on 127.0.0.1, DNS record, nginx site, then set it up.',
          'Third-party apps keep their own configuration, including .env files. Keep them private.',
          'Jellyfin streams your own media. Mount it read-only and back up its config folder.',
          'Update with docker compose pull && docker compose up -d, after reading the release notes.',
        ]}
      />
    </div>
  );
}
