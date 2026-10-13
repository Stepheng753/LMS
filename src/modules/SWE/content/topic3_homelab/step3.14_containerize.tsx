import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Compare } from '../../../../components/content/Compare';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import {
  ARCH_SKILL_V2,
  BACKEND_DOCKERFILE,
  BACKEND_DOCKERIGNORE,
  COMPOSE_EXAMPLE,
  DOCKER_DEPLOY_SKILL,
  FRONTEND_DOCKERFILE,
} from '../../toolkit/homelabTexts';

const DOCKER_PROMPT = `/plan

Containerize this project so it can run on my homelab server with Docker.

Create:
- backend/Dockerfile and backend/.dockerignore
- frontend/Dockerfile and frontend/.dockerignore
- docker-compose.yml in the project root with a backend and a frontend service

Ports (publish on 127.0.0.1 only):
- backend 8000:8000
- frontend 5173:5173

Volumes:
- ./data mounted at /app/data
- ./backend/config mounted at /app/config

Rules: follow my saved rules and skills, especially docker-deploy and
fullstack-architecture. No secrets in images or in the compose file.
Config stays JSON.

The frontend must call the backend at /api (one constant), because nginx will
route /api to the backend. vite.config.ts must allow the host name
app.<my-domain>.

It is done when:
- docker compose up -d --build starts both services
- data I add survives docker compose down followed by docker compose up -d

Before you write the plan, ask me about anything that is unclear.`;

export default function Step3_14_Containerize() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.14 • Docker"
        title="Containerize Your Full App"
        summary="Package your Topic 2 app into containers, get it onto the server, and run it. The AI writes the files, and you check them."
      />

      <p>
        You already know the loop: spec, <code>/plan</code>, review, build. This time the goal is to wrap your
        Topic 2 app so it runs on the server. You are not going to write a Dockerfile, but you need to be able to read one
        and spot problems.
      </p>

      <Section title="1. Ask for it" />
      <p>Open your project in Antigravity and use this spec:</p>
      <CodeBlock language="markdown" title="Spec: containerize" code={DOCKER_PROMPT} />

      <Section title="2. Know what you are reviewing" />
      <p>Here are the files the plan should produce.</p>
      <CodeBlock language="bash" title="backend/Dockerfile" code={BACKEND_DOCKERFILE} />
      <CommandTable
        title="Dockerfile words"
        rows={[
          { command: 'FROM', description: 'The starting image. Here, a small official Python' },
          { command: 'WORKDIR', description: 'The folder inside the container where the next steps happen' },
          { command: 'COPY', description: 'Copy files from your project into the image' },
          { command: 'RUN', description: 'Run a command while building (install libraries)' },
          { command: 'EXPOSE', description: 'Documents which port the app listens on' },
          { command: 'CMD', description: 'The command the container runs when it starts' },
        ]}
      />
      <p>
        Notice that the Dockerfile installs libraries with <code>pip</code> directly, and there is no{' '}
        <code>.venv</code>. That is correct <em>inside a container</em>: the container is already the private box. (On the
        host, you still use <code>./.venv/bin/python</code>. Your stack rule says so.)
      </p>
      <CodeBlock language="bash" title="backend/.dockerignore" code={BACKEND_DOCKERIGNORE} />
      <Callout type="warning" title="Why .dockerignore matters">
        <code>COPY . .</code> copies everything into the image. Without this file, <code>secrets.json</code> and the
        giant <code>.venv</code> would be baked into it. A secret inside an image can be extracted by anyone who gets the
        image. The config is <em>mounted</em> from the server instead, so it never enters the image.
      </Callout>
      <CodeBlock language="bash" title="frontend/Dockerfile" code={FRONTEND_DOCKERFILE} />
      <CodeBlock language="yaml" title="docker-compose.yml" code={COMPOSE_EXAMPLE} />
      <Table
        headers={['Compose key', 'Meaning']}
        rows={[
          [<code key="a">build.context</code>, 'Which folder holds the Dockerfile for this service'],
          [<code key="b">restart: unless-stopped</code>, 'Start it again after crashes and server reboots'],
          [<code key="c">ports</code>, 'host:container. Note the "127.0.0.1:" in front of each'],
          [<code key="d">volumes</code>, 'host-folder:container-folder. Where persistent data lives'],
          [<code key="e">depends_on</code>, 'Start the backend before the frontend'],
        ]}
      />
      <Table
        caption="The two volumes"
        headers={['On the server', 'Inside the container', 'Holds']}
        rows={[
          ['./data', '/app/data', 'The SQLite database. It survives rebuilds'],
          ['./backend/config', '/app/config', 'config.json and secrets.json, read at start-up'],
        ]}
      />

      <Callout type="info" title="Your 8000:8000 and 5173:5173, with a safety prefix">
        The mappings are exactly the ones in your plan. <code>127.0.0.1:</code> in front keeps them private to the server.
        Without it, Docker would open them to your whole network, around the firewall (step 3.9). nginx, in step 3.16,
        becomes the only public door.
      </Callout>

      <Section title="What changed since Topic 2: the backend address" />
      <Callout type="warning" title="The frontend can no longer say 'localhost'">
        In Topic 2 your frontend called <code>http://localhost:8000</code>. That worked because the website and the
        backend were on <em>your</em> computer. Once the app lives on a server, a visitor&apos;s browser would read
        &quot;localhost&quot; as <em>their own computer</em>, which has no backend, and nothing would load.
        <br />
        <br />
        The fix is why your <code>react-frontend</code> skill said to keep the backend address in{' '}
        <strong>one constant</strong>. Now that one constant changes from <code>http://localhost:8000</code> to{' '}
        <code>/api</code>. The browser then calls the same website it came from (for example{' '}
        <code>https://app.example.com/api/tasks</code>), and nginx forwards anything starting with <code>/api/</code> to
        the backend. A bonus: it is all one origin, so the CORS problem from step 2.13 disappears.
      </Callout>
      <Table
        headers={['', 'Topic 2 (on your laptop)', 'Topic 3 (on the server)']}
        rows={[
          ['Frontend calls', 'http://localhost:8000/tasks', '/api/tasks'],
          ['Who routes it', 'The browser talks to the backend directly', 'nginx sends /api/ to the backend'],
          ['CORS', 'Needed (two ports)', 'Not needed (one address)'],
          ['Where it is changed', '-', 'The single constant in the frontend'],
        ]}
      />
      <Callout type="tip" title="One more gotcha: Vite blocks unknown host names">
        Vite&apos;s dev server refuses requests addressed to names it does not know, and shows &quot;Blocked request. This
        host is not allowed&quot;. That is why the spec above asks for the host name to be allowed in{' '}
        <code>vite.config.ts</code> (the setting is called <code>server.allowedHosts</code>). If you see that message, this
        is the cause.
      </Callout>

      <Section title="3. Review the plan" />
      <Table
        headers={['Check', 'Why']}
        rows={[
          ['Ports are published as 127.0.0.1:PORT:PORT', 'Docker bypasses the firewall otherwise'],
          ['Volumes: ./data to /app/data and ./backend/config to /app/config', 'Data and secrets stay on the host'],
          ['.dockerignore excludes .venv, node_modules and secrets.json', 'No secrets or junk in images'],
          ['No passwords in the Dockerfile or compose file', 'Anything in an image can leak'],
          ['The frontend calls /api through one constant', 'Otherwise it breaks on the server'],
          ['vite.config.ts allows the host name', 'Otherwise "Blocked request"'],
          ['Does the database path still work inside the container?', 'It must point into the mounted /app/data folder'],
          ['Nothing outside the layout was invented', 'Only the Docker files are new'],
        ]}
      />

      <Section title="4. Get the code onto the server" />
      <p>
        The server must be able to <code>git pull</code> your private repository. Give it its own <strong>read-only
        deploy key</strong>. Never copy your personal private key onto the server.
      </p>
      <Steps
        steps={[
          {
            title: 'On the server, make a key just for this',
            children: (
              <TerminalBlock
                path="anna@homelab:~"
                lines={[
                  { command: 'ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N "" -C "homelab-deploy"' },
                  { command: 'cat ~/.ssh/github_deploy.pub', output: 'ssh-ed25519 AAAA... homelab-deploy' },
                ]}
              />
            ),
          },
          {
            title: 'Add it to the repository on GitHub',
            children: <p>Repository → Settings → <strong>Deploy keys</strong> → Add deploy key. Paste the line, leave &quot;Allow write access&quot; <strong>unticked</strong> (read-only), and save.</p>,
          },
          {
            title: 'Tell the server to use that key for GitHub',
            children: (
              <>
                <TerminalBlock path="anna@homelab:~" command="nano ~/.ssh/config" />
                <CodeBlock language="bash" title="~/.ssh/config (on the server)" code={`Host github.com\n    IdentityFile ~/.ssh/github_deploy\n    IdentitiesOnly yes`} />
              </>
            ),
          },
          {
            title: 'Clone the project',
            children: (
              <TerminalBlock
                path="anna@homelab:~"
                lines={[
                  { command: 'mkdir -p ~/apps && cd ~/apps' },
                  { command: 'git clone git@github.com:your-username/taskapp.git', output: "Cloning into 'taskapp'..." },
                ]}
              />
            ),
          },
        ]}
      />

      <Section title="5. Add what git does not have" />
      <p>
        Remember <code>.gitignore</code>? The secrets and the database were deliberately left out, so the clone has
        neither. Create them on the server, by hand:
      </p>
      <TerminalBlock
        path="anna@homelab:~/apps/taskapp"
        lines={[
          { command: 'mkdir -p data' },
          { command: 'nano backend/config/secrets.json', output: '(type or paste your secrets, Ctrl+O, Enter, Ctrl+X)' },
          { command: 'chmod 600 backend/config/secrets.json' },
        ]}
      />
      <Callout type="info" title="This is what 'ignored by git' really means">
        Secrets and databases live <em>only</em> on the machine that uses them. Your laptop has its own, the server has its
        own, and git carries neither. That is the safe way round.
      </Callout>

      <Section title="6. Start it" />
      <TerminalBlock
        path="anna@homelab:~/apps/taskapp"
        lines={[
          { command: 'docker compose up -d --build', output: '[+] Building ...\n[+] Running 3/3\n ✔ Network taskapp_default   Created\n ✔ Container app-backend    Started\n ✔ Container app-frontend   Started' },
          { command: 'docker compose ps', output: 'NAME            STATUS    PORTS\napp-backend     Up        127.0.0.1:8000->8000/tcp\napp-frontend    Up        127.0.0.1:5173->5173/tcp' },
          { command: 'docker compose logs -f', output: 'app-backend  | INFO:     Uvicorn running on http://0.0.0.0:8000' },
        ]}
      />
      <CommandTable
        title="Compose commands"
        rows={[
          { command: 'docker compose up -d', description: 'Start everything in the background' },
          { command: 'docker compose up -d --build', description: 'Rebuild the images first. Use after code changes' },
          { command: 'docker compose down', description: 'Stop and remove the containers (your volumes stay)' },
          { command: 'docker compose logs -f', description: 'Follow the logs of all services. Ctrl+C to stop watching' },
          { command: 'docker compose ps', description: 'What is running' },
        ]}
      />

      <Section title="7. Peek at it from your own computer" />
      <p>
        Because the ports are private to the server, you cannot just type its address in a browser. Use an{' '}
        <strong>SSH tunnel</strong> to borrow the port, in your own WSL terminal:
      </p>
      <TerminalBlock
        path="~"
        command="ssh -L 8000:127.0.0.1:8000 homelab"
        output="(leave this window open)"
      />
      <p>
        Now open <code>http://localhost:8000/docs</code> in your Windows browser. You are looking at the Swagger page
        of the container on the server. Add a task there. The full website needs nginx&apos;s <code>/api</code> routing,
        which is the next two steps.
      </p>

      <Section title="8. Prove the data survives" />
      <TerminalBlock
        path="anna@homelab:~/apps/taskapp"
        lines={[
          { command: 'docker compose down' },
          { command: 'docker compose up -d' },
          { command: 'ls data/', output: 'app.db' },
        ]}
      />
      <p>
        Tear it all down and bring it back. The task you added should still be there. That is the volume doing its job.
      </p>

      <Compare
        goodLabel="Updating the app"
        badLabel="Never do this"
        good={<TerminalBlock path="anna@homelab:~/apps/taskapp" command="git pull origin main && docker compose up -d --build" />}
        bad={<p>Editing files by hand inside a running container. They disappear the next time it is rebuilt.</p>}
      />

      <Section title="Save what you learned" />
      <TeachAI kind="skill" name="docker-deploy" text={DOCKER_DEPLOY_SKILL} />
      <TeachAI kind="skill" name="fullstack-architecture" text={ARCH_SKILL_V2} isUpdate />

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><code>docker compose ps</code> shows a service restarting: read <code>docker compose logs backend</code>. It is usually a missing <code>secrets.json</code> or a wrong database path.</li>
          <li>The database is empty after restarting: the volume is not mounted, or the config&apos;s database path points somewhere inside the container. Ask the AI to check.</li>
          <li>Build fails on the frontend: look for the first red line in the output and paste it to your helper.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Why are secrets mounted from the server instead of copied into the image?"
          options={['Mounting is faster', 'Anything inside an image can be extracted by whoever has the image', 'Docker forbids files', 'No reason']}
          correctIndex={1}
          explanation="Images get shared and stored. Secrets should live only on the machine that needs them."
        />
        <Quiz
          question="Why does the frontend now call /api instead of http://localhost:8000?"
          options={['It is shorter', "A visitor's localhost is their own computer. /api goes through nginx to the backend", 'Docker needs it', 'CORS requires it']}
          correctIndex={1}
          explanation="On a server, 'localhost' in a visitor's browser means their own machine. A relative /api path goes back to the same site."
        />
        <Quiz
          question="What does docker compose down do to your database in ./data?"
          options={['Deletes it', 'Nothing. It is in a volume on the host', 'Encrypts it', 'Copies it to GitHub']}
          correctIndex={1}
          explanation="Containers go away, volumes (host folders) stay."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'You describe, the AI writes Dockerfiles and compose, and you review the checklist.',
          'Ports are published on 127.0.0.1, and data/config are volumes, so secrets and the database stay on the host.',
          'Frontend change since Topic 2: one constant becomes /api, and nginx routes it to the backend.',
          'The server pulls code with its own read-only deploy key. Secrets and the database are created on the server by hand.',
          'docker compose up -d --build, down, logs -f and ps are the commands to know.',
        ]}
      />
    </div>
  );
}
