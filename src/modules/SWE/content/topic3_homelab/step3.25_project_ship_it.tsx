import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { STATIC_COMPOSE, STATIC_FRONTEND_DOCKERFILE } from '../topic_toolkit/tools/tools_homelab';

const PORTFOLIO_PROMPT = `/plan

Containerize my portfolio website (a frontend-only project) so it can run on my
homelab server, and add a GitHub Actions pipeline that deploys it.

Create:
- frontend/Dockerfile: a multi-stage build (node:22-alpine builds the site,
  nginx:alpine serves dist/ on port 80)
- frontend/.dockerignore
- docker-compose.yml in the project root with ONE service, published on
  127.0.0.1:5174:80
- .github/workflows/deploy.yml: on push to main, a build check
  (docker build ./frontend), then deploy over Tailscale and SSH:
  cd ~/apps/portfolio && git pull origin main && docker compose up -d --build

Rules: follow my saved skills, especially docker-deploy and ci-cd-deploy.
There is no backend, no database and no secrets in this project. Use the secrets
HOMELAB_HOST, HOMELAB_USER, HOMELAB_SSH_KEY, TS_OAUTH_CLIENT_ID and
TS_OAUTH_SECRET.

It is done when: pushing a change to main updates the live portfolio.

Before you write the plan, ask me about anything that is unclear.`;

export default function Step3_25_ProjectShipIt() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.25 • Project C"
        title="Project C: Ship Your Apps"
        summary="Take the two apps you built in Topic 2, your portfolio and your full app, from your laptop to your own domain, with every change deploying automatically."
      />

      <p>
        This project connects everything in the topic. You will not learn anything new here. You will do it all, in order,
        on your own work. When you finish, a single <code>git push</code> on either project will update a real website
        running on a server in your home.
      </p>
      <Callout type="info" title="You are your own judge">
        As before, there is no hidden check. Press <strong>Mark as Complete</strong> when everything in the checklist at
        the bottom is honestly true.
      </Callout>

      <Section title="The two apps" />
      <Table
        headers={['', 'Portfolio (Project A)', 'Full app (Project B)']}
        rows={[
          ['What it is', 'A frontend-only website', 'Frontend + backend + database'],
          ['Container recipe', 'A static site: build once, serve with nginx', 'Two services with volumes (step 3.14)'],
          ['Local ports', '127.0.0.1:5174', '127.0.0.1:5173 and 127.0.0.1:8000'],
          ['Hostname', 'portfolio.<your-domain>', 'app.<your-domain>'],
          ['Folder on the server', '~/apps/portfolio', '~/apps/<your-app>'],
          ['Secrets and database', 'None', 'On the server only (secrets.json, data/)'],
          ['Pipeline checks', 'A build check', 'Unit tests'],
        ]}
      />

      <Section title="Where each piece comes from" />
      <Table
        headers={['You need', 'From']}
        rows={[
          ['Both apps working locally', 'Steps 2.11 and 2.15'],
          ['A private GitHub repository for each, without secrets', 'Steps 3.4 and 3.5'],
          ['A server you can SSH into, with Tailscale', 'Steps 3.6 to 3.10'],
          ['The full app in containers', 'Step 3.14'],
          ['Names, nginx and a certificate', 'Steps 3.15 to 3.17'],
          ['Secrets and a pipeline', 'Steps 3.23 and 3.24'],
        ]}
      />

      <Section title="Part 1: The full app" />
      <Steps
        steps={[
          {
            title: 'Check the server is healthy',
            children: <p><code>ssh homelab</code>, run the updates and the health commands from step 3.11. Make sure disk space is fine.</p>,
          },
          {
            title: 'Run the app on the server',
            children: <p>Clone the repository into <code>~/apps/&lt;your-app&gt;</code>, create <code>secrets.json</code> and <code>data/</code> by hand, then <code>docker compose up -d --build</code>. Check <code>docker compose ps</code>.</p>,
          },
          {
            title: 'Give it a name',
            children: <p>Add a Cloudflare record, an nginx site file with the <code>/api/</code> routing, and use the wildcard certificate. Open <code>https://app.&lt;your-domain&gt;</code> and add some data through the page.</p>,
          },
          {
            title: 'Prove that the data survives',
            children: <p><code>docker compose down</code> then <code>up -d</code>, and refresh. Your data is still there.</p>,
          },
          {
            title: 'Set up the pipeline',
            children: <p>Create the deploy key and the Tailscale OAuth client, add the five secrets to the repository, then use <code>/plan</code> to create <code>deploy.yml</code>. Review it with the checklist from step 3.24.</p>,
          },
          {
            title: 'Push a change and watch it deploy',
            children: <p>Change something small but visible, then <code>ga .</code>, <code>gc &quot;…&quot;</code>, <code>git push origin main</code>. Follow the Actions tab to two green ticks and reload the site.</p>,
          },
          {
            title: 'Break it on purpose, then roll back',
            children: <p>Push a deliberately failing unit test and confirm <strong>nothing deploys</strong>. Fix it. Then push a visible change and undo it with <code>git revert HEAD --no-edit</code>.</p>,
          },
        ]}
      />

      <Section title="Part 2: The portfolio" />
      <p>
        The portfolio is simpler: no backend, no database, no secrets. But it is a static <em>website</em>, so it is built
        once and served by nginx inside its own container. Here is the recipe you will ask the AI for:
      </p>
      <CodeBlock language="bash" title="frontend/Dockerfile (static site)" code={STATIC_FRONTEND_DOCKERFILE} />
      <CodeBlock language="yaml" title="docker-compose.yml (one service)" code={STATIC_COMPOSE} />
      <Callout type="info" title="Why two stages?">
        The first stage (<code>node</code>) has all the build tools, and the second (<code>nginx</code>) is tiny and holds
        only the finished website. The final image does not contain Node or your source code, only the result.
      </Callout>
      <Steps
        steps={[
          {
            title: 'Push the portfolio to its own repository',
            children: <p>Check <code>git ls-files</code>, then push, as in step 3.5.</p>,
          },
          {
            title: 'Write the spec and run /plan',
            children: (
              <>
                <p>Use this, with your own details:</p>
                <Collapsible title="Spec: containerize and deploy the portfolio">
                  <CodeBlock language="markdown" title="Spec" code={PORTFOLIO_PROMPT} />
                </Collapsible>
              </>
            ),
          },
          {
            title: 'Review the plan',
            children: <p>Check: one service only, the port is <code>127.0.0.1:5174:80</code>, there are no volumes or secrets, the pipeline runs a build check, and the deploy job reaches the server through Tailscale.</p>,
          },
          {
            title: 'Get it onto the server',
            children: <p>Give the server a deploy key for this repository too (a new one, as in step 3.14), clone it into <code>~/apps/portfolio</code>, and run <code>docker compose up -d --build</code>.</p>,
          },
          {
            title: 'Name it',
            children: <p>Add the Cloudflare record <code>portfolio</code>, an nginx site that proxies <code>/</code> to <code>127.0.0.1:5174</code> (the &quot;local port&quot; pattern), test, reload, and open it over HTTPS.</p>,
          },
          {
            title: 'Add the five secrets to this repository',
            children: <p>Secrets belong to a repository, so repeat step 3.23&apos;s secrets list here. The same Tailscale OAuth client and deploy-key idea work again.</p>,
          },
          {
            title: 'Ship a change',
            children: <p>Edit a heading, push, watch the Actions run, and reload your portfolio.</p>,
          },
        ]}
      />

      <Section title="Part 3: Look after them" />
      <Steps
        steps={[
          {
            title: 'Back up the full app',
            children: <p>Make sure the app&apos;s <code>data/</code> and <code>backend/config/</code> are in the nightly backup, and run a restore test. (The portfolio has nothing to back up: it lives in GitHub.)</p>,
          },
          {
            title: 'Check the certificate renewal',
            children: <p><code>sudo certbot renew --dry-run</code> must pass.</p>,
          },
        ]}
      />

      <Collapsible title="If something goes wrong">
        <ul className="list-disc pl-5 space-y-1">
          <li>Work from the inside out: the container (<code>docker compose logs</code>), then nginx (<code>sudo nginx -t</code>, the error log), then DNS (<code>dig</code>), then the pipeline (the Actions log).</li>
          <li>Use the troubleshooting tables in steps 3.14, 3.16, 3.17 and 3.24.</li>
          <li>A blank portfolio page usually means the build failed or the wrong folder is being served. Check <code>docker compose logs portfolio</code>.</li>
          <li>Give your AI helper the exact error, the step you were on, and what you expected.</li>
        </ul>
      </Collapsible>

      <Section title="Checklist: you are done when" />
      <ul className="list-disc pl-5 space-y-1">
        <li>My <strong>full app</strong> runs on my own server in containers and opens at <code>https://app.&lt;my-domain&gt;</code> with a padlock.</li>
        <li>My <strong>portfolio</strong> opens at <code>https://portfolio.&lt;my-domain&gt;</code> with a padlock, from a device away from home (using Tailscale).</li>
        <li>Each app has its own private GitHub repository, and I can say why <code>secrets.json</code> and the database are <strong>not</strong> in it.</li>
        <li>Every container port is on <code>127.0.0.1</code>, and I can show it in <code>docker compose ps</code>.</li>
        <li>I pushed a change to <em>each</em> app and watched it deploy by itself in the Actions tab.</li>
        <li>I saw a failing test stop the full app&apos;s deployment.</li>
        <li>I rolled back a change with <code>git revert</code>.</li>
        <li>My full app&apos;s data survives <code>docker compose down</code> and <code>up</code>, and is in a backup I have restored once.</li>
        <li>My certificate renews: <code>sudo certbot renew --dry-run</code> passes.</li>
        <li>All my skills are saved: git-workflow, docker-deploy, nginx-proxy, selfhosted-apps and ci-cd-deploy.</li>
      </ul>
      <p>
        When every line is honestly true, press <strong>Mark as Complete</strong>.
      </p>

      <KeyTakeaways
        items={[
          'You deployed both of your Topic 2 apps to your own server, behind your own domain with HTTPS.',
          'A static site is built once and served by nginx. A full app runs as services with volumes.',
          'A push to main on either repository now deploys automatically over a private network.',
          'You can break it, roll it back, back it up, and explain where each secret lives.',
        ]}
      />
    </div>
  );
}
