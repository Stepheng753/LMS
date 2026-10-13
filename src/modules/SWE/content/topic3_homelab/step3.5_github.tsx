import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_5_GitHub() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.5 • Git"
        title="GitHub: Your Code, Off the Laptop"
        summary="Create an SSH key to prove who you are, connect to GitHub with it, and push your project."
      />

      <p>
        <strong>GitHub</strong> is a website that stores git repositories. It gives you an off-site copy of your
        project, and later it is where your deployment pipeline will live. To push code, GitHub needs to know it is really
        you, and the safest way is not a password but an <strong>SSH key</strong>.
      </p>

      <Section title="Keys: a padlock and its key" />
      <p>An SSH key is a matched pair of files:</p>
      <Table
        headers={['File', 'Role', 'Share it?']}
        rows={[
          [<code key="a">id_ed25519.pub</code>, 'The public key: a padlock. Anyone may hold copies of the padlock', 'Yes. Give it to GitHub and to servers'],
          [<code key="b">id_ed25519</code>, 'The private key: the only key that opens those padlocks', 'NEVER. Not in chat, not in email, not in git'],
        ]}
      />
      <p>
        You hand out padlocks (public key) to the places you want to access. Only you hold the key (private key) that
        opens them. Nobody can log in as you without the private file, and nothing secret ever crosses the network.
      </p>
      <Callout type="warning" title="The file without .pub is the secret">
        If you ever paste the contents of <code>id_ed25519</code> (no .pub) anywhere, treat it as stolen and make a new
        pair. Your AI helper will not need it. Everything we do uses the public one.
      </Callout>

      <Section title="1. Make your key (in WSL)" />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'ssh-keygen -t ed25519 -C "you@example.com"', output: 'Enter file in which to save the key (/home/anna/.ssh/id_ed25519):\nEnter passphrase (empty for no passphrase):' },
        ]}
      />
      <ul className="list-disc pl-5 space-y-1">
        <li>Press <code>Enter</code> to accept the default file name.</li>
        <li>A <strong>passphrase</strong> is a password protecting the private key. It is a good idea. (Like the sudo password, it stays invisible as you type.)</li>
        <li><code>-t ed25519</code> picks the modern, strong key type.</li>
      </ul>
      <TerminalBlock path="~" command="cat ~/.ssh/id_ed25519.pub" output="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... you@example.com" />
      <p>That one line is your public key. Select it all and copy it.</p>

      <Section title="2. Give GitHub the padlock" />
      <Steps
        steps={[
          { title: 'Create a GitHub account', children: <p>At <code>github.com</code>, if you do not have one. Use the same email as your <code>git config</code>.</p> },
          { title: 'Open Settings → SSH and GPG keys → New SSH key', children: <p>Give it a title like &quot;WSL laptop&quot; and paste the line you copied.</p> },
          {
            title: 'Test the connection',
            children: (
              <>
                <TerminalBlock path="~" command="ssh -T git@github.com" output={'The authenticity of host \'github.com\' can\'t be established.\nAre you sure you want to continue connecting (yes/no)? yes\nHi your-username! You\'ve successfully authenticated, but GitHub does not provide shell access.'} />
                <p>The first time, it asks if you trust GitHub&apos;s fingerprint. Type <code>yes</code>. The &quot;Hi your-username!&quot; line means success.</p>
              </>
            ),
          },
        ]}
      />

      <Section title="3. Create a repository" />
      <Steps
        steps={[
          { title: 'On GitHub, click New repository', children: <p>Name it after your project, for example <code>taskapp</code>.</p> },
          { title: 'Choose Private', children: <p>Only you can see it. Do <strong>not</strong> tick &quot;Add a README&quot; or other starter files, because your project already has them.</p> },
          { title: 'Copy the SSH address it shows', children: <p>It looks like <code>git@github.com:your-username/taskapp.git</code>.</p> },
        ]}
      />

      <Section title="4. Push your project" />
      <p>From inside your Topic 2 full-app project (the one you built in Project B):</p>
      <TerminalBlock
        lines={[
          { path: '~/Development/taskapp', command: 'git init -b main' },
          { path: '~/Development/taskapp', command: 'cat .gitignore', output: '.venv/\nnode_modules/\ndata/*.db\nbackend/config/secrets.json\n...' },
          { path: '~/Development/taskapp', command: 'ga . && gc "First version of the task app"' },
          { path: '~/Development/taskapp', command: 'git ls-files | grep secrets', output: '(nothing should be printed)' },
          { path: '~/Development/taskapp', command: 'git remote add origin git@github.com:your-username/taskapp.git' },
          { path: '~/Development/taskapp', command: 'git push -u origin main', output: 'Enumerating objects...\nTo github.com:your-username/taskapp.git\n * [new branch]      main -> main' },
        ]}
      />
      <Callout type="info" title="Do your portfolio too">
        Your portfolio from Project A is a separate project, so give it its <em>own</em> private repository and push it the
        same way. In Project C (step 3.25) you will deploy both.
      </Callout>
      <Callout type="warning" title="Check for secrets BEFORE you push">
        The <code>git ls-files | grep secrets</code> line should print nothing. If it prints{' '}
        <code>secrets.json</code>, stop. Do not push. Ask your AI helper to help you remove it from the commit. Everything
        pushed to GitHub should be assumed copied the moment it arrives.
      </Callout>
      <p>
        <code>origin</code> is just the nickname for the GitHub address, and <code>-u</code> remembers the pairing the
        first time. From now on, saving a change and sending it is just:
      </p>
      <TerminalBlock
        lines={[
          { path: '~/Development/taskapp', command: 'ga . && gc "Add due dates"' },
          { path: '~/Development/taskapp', command: 'git push origin main' },
        ]}
      />
      <p>Reload the repository page on GitHub and your files are there. Open <code>backend/config</code> and check that <code>secrets.json</code> is <strong>not</strong>.</p>

      <Collapsible title="If something goes wrong">
        <ul className="list-disc pl-5 space-y-1">
          <li><code>Permission denied (publickey)</code>: the public key is not on GitHub yet, or you pasted a different one. Repeat step 2.</li>
          <li><code>remote origin already exists</code>: you ran <code>git remote add</code> twice. Use <code>git remote -v</code> to see it.</li>
          <li><code>rejected ... fetch first</code>: the repository on GitHub has files you do not have. You probably ticked &quot;Add a README&quot;. Ask your AI helper for the safest way to merge, or create the repository again empty.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Which file may you share with GitHub and servers?"
          options={['id_ed25519', 'id_ed25519.pub', 'Both', 'Neither']}
          correctIndex={1}
          explanation="The .pub file is the public padlock. The one without .pub is the private key and must stay secret."
        />
        <Quiz
          question="What should git ls-files | grep secrets print before you push?"
          options={['secrets.json', 'Nothing', 'Your password', 'An error']}
          correctIndex={1}
          explanation="If secrets.json is tracked by git, it is about to be uploaded. It should be ignored."
        />
        <Quiz
          question="What does 'origin' mean in git push origin main?"
          options={['The first commit', 'The nickname for the GitHub address', 'The branch name', 'Your username']}
          correctIndex={1}
          explanation="origin is the default name for the remote repository."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'An SSH key is a pair: the public key (a padlock you give out) and the private key (yours alone).',
          'ssh-keygen -t ed25519 makes the pair. Only ever share the .pub file.',
          'Create the GitHub repository empty and private, then git remote add origin and git push -u origin main.',
          'Always check that secrets.json is not tracked before pushing.',
        ]}
      />
    </div>
  );
}
