import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const DOCKER_INSTALL = `# 1. Let apt trust Docker's software source
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 2. Add Docker's software source
echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \\
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 3. Install Docker Engine and the Compose plugin
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 4. Let your user run docker without sudo
sudo usermod -aG docker $USER
newgrp docker`;

export default function Step3_13_DockerInstall() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.13 • Docker"
        title="Install Docker & Look Around"
        summary="Put Docker Engine and Compose on the server, run your first container, and learn the commands that show you what is going on."
      />

      <Callout type="info" title="This all happens on the server">
        Run <code>ssh homelab</code> first. Every command in this step is typed at the server&apos;s prompt, not in your
        local WSL.
      </Callout>

      <Section title="1. Install it" />
      <p>
        You can ask Agy for this, or run the steps from Docker&apos;s own instructions yourself. Here they are, with a
        comment for each of the four stages. Do not worry about every symbol. The point is the shape: add Docker&apos;s
        software source, install, then give your user permission.
      </p>
      <CodeBlock language="bash" title="Install Docker Engine and Compose (Ubuntu)" code={DOCKER_INSTALL} />
      <Callout type="warning" title="The docker group is powerful">
        A user in the <code>docker</code> group can effectively do anything on the machine, much like <code>sudo</code>.
        That is fine for your own server, with only your key able to log in. Never add other people to it casually.
      </Callout>
      <Callout type="warning" title="Docker and the firewall">
        Remember step 3.9: Docker publishes ports by adding its own network rules, which <strong>bypass ufw</strong>. A
        container started with <code>-p 8000:8000</code> can be open to your whole network even though ufw says 8000 is
        blocked. Always publish as <code>127.0.0.1:8000:8000</code> unless you truly want the world to see it.
      </Callout>

      <Section title="2. Check it works" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'docker --version', output: 'Docker version 27.x.x, build ...' },
          { command: 'docker compose version', output: 'Docker Compose version v2.x.x' },
          { command: 'docker run hello-world', output: 'Hello from Docker!\nThis message shows that your installation appears to be working correctly.' },
        ]}
      />
      <p>
        <code>docker run</code> downloaded a tiny image, made a container from it, ran it, and exited. That is the whole
        lifecycle in one command.
      </p>

      <Section title="3. A real container: nginx" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'docker run -d --name web -p 127.0.0.1:8081:80 nginx', output: 'Unable to find image \'nginx:latest\' locally\n...\n3c6a1f...' },
          { command: 'curl -s http://127.0.0.1:8081 | head -n 4', output: '<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome to nginx!</title>' },
        ]}
      />
      <CommandTable
        title="What you just typed"
        rows={[
          { command: '-d', description: 'Detached: run in the background' },
          { command: '--name web', description: 'Give the container a name you can use later' },
          { command: '-p 127.0.0.1:8081:80', description: 'Publish: this machine only, port 8081, goes to port 80 in the container' },
          { command: 'nginx', description: 'The image to use. Docker fetches it if it is missing' },
        ]}
      />

      <Section title="4. Inspect: the commands you will use constantly" />
      <CommandTable
        rows={[
          { command: 'docker ps', description: 'Running containers', example: 'docker ps' },
          { command: 'docker ps -a', description: 'All containers, including stopped ones', example: 'docker ps -a' },
          { command: 'docker images', description: 'The images stored on this machine', example: 'docker images' },
          { command: 'docker logs <name>', description: 'What the container has printed', example: 'docker logs web' },
          { command: 'docker logs -f <name>', description: 'Follow the logs live. Ctrl+C to stop watching', example: 'docker logs -f web' },
          { command: 'docker exec -it <name> sh', description: 'Open a shell inside a running container', example: 'docker exec -it web sh' },
          { command: 'docker stop <name>', description: 'Stop a container', example: 'docker stop web' },
          { command: 'docker rm <name>', description: 'Delete a stopped container (its inside is lost)', example: 'docker rm web' },
          { command: 'docker rmi <image>', description: 'Delete an image', example: 'docker rmi nginx' },
          { command: 'docker system df', description: 'How much disk Docker is using', example: 'docker system df' },
        ]}
      />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'docker ps', output: 'CONTAINER ID   IMAGE   COMMAND                  STATUS         PORTS                    NAMES\n3c6a1f...      nginx   "/docker-entrypoint.…"   Up 2 minutes   127.0.0.1:8081->80/tcp   web' },
          { command: 'docker logs web', output: '172.17.0.1 - - [13/Oct/2026:09:20:11 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.5.0"' },
        ]}
      />
      <p>
        See the <code>PORTS</code> column: <code>127.0.0.1:8081-&gt;80</code>. That is how you check you did not
        accidentally open a door to the world. If you see <code>0.0.0.0:8081</code>, it is reachable by everyone.
      </p>

      <Section title="5. Clean up" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'docker stop web && docker rm web' },
          { command: 'docker ps -a', output: '(web is gone)' },
        ]}
      />
      <Callout type="warning" title="Be careful with docker system prune">
        <code>docker system prune</code> deletes unused containers, networks and images. It is useful when the disk is
        filling up, but read what it says before you answer yes, and never add <code>--volumes</code> unless you are
        certain, because that deletes the data you kept in volumes.
      </Callout>

      <Exercise
        title="Run, inspect, remove"
        hint={<p>Use <code>docker run -d --name ...</code>, then <code>docker ps</code>, <code>docker logs</code> and finally <code>docker stop</code> and <code>docker rm</code>.</p>}
        solution={
          <TerminalBlock
            path="anna@homelab:~"
            lines={[
              { command: 'docker run -d --name hello -p 127.0.0.1:8082:80 nginx' },
              { command: 'curl -sI http://127.0.0.1:8082 | head -n 1', output: 'HTTP/1.1 200 OK' },
              { command: 'docker logs hello' },
              { command: 'docker stop hello && docker rm hello' },
            ]}
          />
        }
      >
        <p>
          Start an nginx container called <code>hello</code> on port 8082 (private to the machine), prove it answers with
          <code> curl</code>, look at its logs, then remove it.
        </p>
      </Exercise>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><code>permission denied ... docker.sock</code>: your user is not in the docker group yet. Log out, <code>ssh homelab</code> again, or run <code>newgrp docker</code>.</li>
          <li><code>port is already allocated</code>: something else uses that port. Pick another, or find it with <code>docker ps</code>.</li>
          <li><code>no space left on device</code>: see <code>docker system df</code> and <code>df -h</code> (step 3.11).</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="docker ps shows 0.0.0.0:8081->80/tcp. What does that tell you?"
          options={['It is private', 'The port is reachable from other machines', 'The container crashed', 'It is using no memory']}
          correctIndex={1}
          explanation="0.0.0.0 means every network interface. Use 127.0.0.1 to keep it private."
        />
        <Quiz
          question="Which command shows what a container has printed?"
          options={['docker ps', 'docker logs <name>', 'docker images', 'docker rm']}
          correctIndex={1}
          explanation="docker logs shows the container's output. Add -f to follow it live."
        />
        <Quiz
          question="Why is docker system prune --volumes risky?"
          options={['It is slow', 'It can delete the data you stored in volumes', 'It needs a reboot', 'It stops ssh']}
          correctIndex={1}
          explanation="Volumes hold your persistent data. Deleting them loses it."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Install Docker Engine and the Compose plugin from Docker\'s own apt source, then add your user to the docker group.',
          'docker run -d --name x -p 127.0.0.1:HOST:CONTAINER image starts a private container.',
          'docker ps, docker images, docker logs -f and docker exec are the everyday inspection commands.',
          'Docker bypasses ufw, so check the PORTS column for 127.0.0.1.',
        ]}
      />
    </div>
  );
}
