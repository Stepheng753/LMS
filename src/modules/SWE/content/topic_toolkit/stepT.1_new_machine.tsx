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
import { INSTALL_SCRIPT } from '../../toolkit/registry';

export default function StepT_1_NewMachine() {
  return (
    <div>
      <StepHeader
        eyebrow="Toolkit • Setup"
        title="Setting Up a New Machine"
        summary="Go from a fresh Windows computer to your full setup in minutes, using the toolkit."
      />

      <p>
        A new computer, a reinstall, or a friend you are helping: the same short routine rebuilds everything you learned.
        The toolkit does most of the work. You only need the first few steps from the course, because they install the
        tools that everything else sits on.
      </p>

      <Section title="The routine" />
      <Steps
        steps={[
          { title: 'Install WSL and turn on mirrored networking', children: <p>Step 1.2: <code>wsl --install</code>, then the <code>.wslconfig</code> from your toolkit (<code>windows/.wslconfig</code>) in your Windows user folder, then <code>wsl --shutdown</code>.</p> },
          { title: 'Install Antigravity and connect it to WSL', children: <p>Step 1.3.</p> },
          { title: 'Install Agy', children: <p>Step 1.4. It is the helper for everything else.</p> },
          { title: 'Download the toolkit zip', children: <p>From the Download Your Toolkit page. It lands in your Windows <code>Downloads</code> folder.</p> },
          {
            title: 'Bring it into Linux and unpack it',
            children: (
              <>
                <TerminalBlock
                  path="~"
                  lines={[
                    { command: 'sudo apt install -y unzip' },
                    { command: 'cp /mnt/c/Users/YourWindowsName/Downloads/academy-toolkit.zip ~/' },
                    { command: 'unzip academy-toolkit.zip -d ~/toolkit' },
                  ]}
                />
                <p>
                  Replace <code>YourWindowsName</code> with your Windows user name (type <code>ls /mnt/c/Users</code> to
                  see it). <code>/mnt/c</code> is how Linux sees your Windows drive. It is fine to copy a file <em>from</em> there.
                </p>
              </>
            ),
          },
          {
            title: 'Run the installer',
            children: (
              <TerminalBlock
                path="~/toolkit"
                lines={[
                  { command: 'cd ~/toolkit && bash install.sh', output: 'Installing rules and skills...\nInstalling shell aliases...\n\nDone. Now run:  source ~/.bashrc' },
                  { command: 'source ~/.bashrc' },
                ]}
              />
            ),
          },
          {
            title: 'Check that your AI can see everything',
            children: <p>Start <code>agy</code> and ask: <em>&quot;List every rule and skill you can see.&quot;</em> You should see <code>stack</code> and all the skills from the course.</p>,
          },
        ]}
      />
      <Callout type="success" title="Success looks like this">
        Your prompt is colourful again, <code>ll</code> and <code>gs</code> work, and Agy lists your rules and skills,
        without you having typed any of them in.
      </Callout>

      <Section title="What the installer does" />
      <p>
        It is a short script, and you should read it before you ever run one, so here it is. You can recognise
        everything in it from Topic 1:
      </p>
      <CodeBlock language="bash" title="install.sh" code={INSTALL_SCRIPT} />
      <Table
        headers={['Line', 'What it does']}
        rows={[
          [<code key="a">set -e</code>, 'Stop at the first error instead of carrying on'],
          [<code key="b">mkdir -p …</code>, 'Create the rules and skills folders if they are missing'],
          [<code key="c">cp … rules/*.md</code>, 'Copy your rules into both the Antigravity and the Agy folders'],
          [<code key="d">cp -r … skills/*</code>, 'The same for every skill folder'],
          [<code key="e">cp ~/.bash_aliases ….backup</code>, 'Save your existing aliases first, so nothing is lost'],
          [<code key="f">cp … .bash_aliases</code>, 'Install your aliases'],
        ]}
      />
      <Callout type="warning" title="Read scripts before running them">
        Never run a script you have not read, especially one that downloads something from the internet. This one only
        copies files into your own home folder. You can see it above, and it contains no downloads.
      </Callout>

      <Section title="Then, as you need them" />
      <Table
        headers={['Need', 'Use']}
        rows={[
          ['A new project', 'The spec template, then /plan. The skills do the rest'],
          ['Containers', 'The Dockerfile and docker-compose.yml templates'],
          ['A pipeline', 'deploy.yml, and the secrets list in step 3.23'],
          ['A new server', 'Steps 3.6 to 3.11, then the nginx and certificate templates'],
          ['A new self-hosted app', 'The selfhosted-apps skill and its compose example'],
          ['MCP servers, agents or local models', 'The mcp-servers, agent-safety and local-models skills, the task brief and the agent safety checklist'],
          ['An app that calls outside APIs', 'The external-apis, google-oauth, llm-providers and social-posting skills, plus the secrets and config templates'],
        ]}
      />

      <Section title="Keep your toolkit safe, in git" />
      <p>
        Your toolkit is just text files, and you already know the perfect tool for keeping text files safe and versioned.
        Make it a git repository and push it to a <strong>private</strong> GitHub repository:
      </p>
      <TerminalBlock
        path="~/toolkit"
        lines={[
          { command: 'git init -b main' },
          { command: 'ga . && gc "My academy toolkit"' },
          { command: 'git remote add origin git@github.com:your-username/toolkit.git' },
          { command: 'git push -u origin main' },
        ]}
      />
      <p>
        Now every improvement you make to a rule or skill can be saved with <code>gc</code> and pushed, and a new machine
        is one <code>git clone</code> away.
      </p>
      <Callout type="warning" title="Private, and placeholders only">
        Keep this repository private, and check <code>git diff</code> before every commit to be sure no real secret slipped
        in while you were filling in a template.
      </Callout>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><code>No such file</code> copying from <code>/mnt/c</code>: check the Windows user name with <code>ls /mnt/c/Users</code>, and that the zip really is in <code>Downloads</code>.</li>
          <li><code>unzip: command not found</code>: run <code>sudo apt install -y unzip</code>.</li>
          <li>Agy does not list your skills: run <code>install.sh</code> again, then start a new <code>agy</code> session.</li>
          <li>The prompt did not change: run <code>source ~/.bashrc</code> or open a new terminal.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Why does the installer copy rules and skills to two places?"
          options={['By accident', 'Antigravity and the Agy command line read different folders', 'To make backups', 'For speed']}
          correctIndex={1}
          explanation="The IDE reads ~/.gemini/config/ and Agy reads ~/.gemini/antigravity-cli/."
        />
        <Quiz
          question="What should you do before running any script you downloaded?"
          options={['Nothing', 'Read it', 'Make it executable', 'Rename it']}
          correctIndex={1}
          explanation="A script runs with your permissions. Read it first."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'New machine: WSL, Antigravity, Agy, then unzip the toolkit and run bash install.sh.',
          'The installer copies your rules and skills for both Antigravity and Agy, and your aliases, and backs up the old ones.',
          'Read every script before you run it.',
          'Keep your toolkit in a private git repository, with placeholders only.',
        ]}
      />
    </div>
  );
}
