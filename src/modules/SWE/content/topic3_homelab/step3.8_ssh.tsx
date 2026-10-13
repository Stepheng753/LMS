import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { SSH_CONFIG } from '../../toolkit/tools_homelab';

export default function Step3_8_Ssh() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.8 • The Server"
        title="SSH: Control the Server From Your Own Computer"
        summary="Log in remotely with your key, then shrink the whole thing to a single short command."
      />

      <p>
        <strong>SSH</strong> (secure shell) is a terminal on another computer, encrypted all the way. When you use it, the
        prompt on your screen belongs to the server: you type commands here, they run there. It is how almost every
        server in the world is managed, and it is how your deployment pipeline will talk to yours.
      </p>

      <Callout type="info" title="You already made your key">
        In step 3.5 you created an ed25519 key for GitHub. It works for your server too: you give the server your public
        padlock, exactly as you gave one to GitHub. If you skipped it, run <code>ssh-keygen -t ed25519</code> in WSL
        first.
      </Callout>

      <Section title="1. First login, with the password" />
      <TerminalBlock
        path="~"
        lines={[
          {
            command: 'ssh anna@192.168.1.50',
            output: `The authenticity of host '192.168.1.50' can't be established.
ED25519 key fingerprint is SHA256:...
Are you sure you want to continue connecting (yes/no)? yes
anna@192.168.1.50's password:`,
          },
        ]}
      />
      <p>
        Use your server username and its address from step 3.7. The first time, SSH shows the server&apos;s
        &quot;fingerprint&quot; and asks if you trust it: type <code>yes</code>. (It remembers, and warns you if it ever
        changes.) Then enter the server password. You should land in a prompt that says{' '}
        <code>anna@homelab</code>. That is the server. <code>exit</code> brings you back.
      </p>

      <Section title="2. Install your key on the server" />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'ssh-copy-id anna@192.168.1.50', output: 'Number of key(s) added: 1\n\nNow try logging into the machine, with: "ssh \'anna@192.168.1.50\'"' },
          { command: 'ssh anna@192.168.1.50', output: '(logs in with no password, or just your key passphrase)' },
        ]}
      />
      <p>
        <code>ssh-copy-id</code> adds your public key to a file on the server (<code>~/.ssh/authorized_keys</code>). From
        then on, the server recognises your private key and lets you in without the account password.
      </p>

      <Section title="3. One word instead of three: ~/.ssh/config" />
      <p>
        Typing <code>anna@192.168.1.50</code> every time is tiring and easy to get wrong. A small config file gives the
        server a nickname.
      </p>
      <TerminalBlock path="~" command="nano ~/.ssh/config" />
      <CodeBlock language="bash" title="~/.ssh/config" code={SSH_CONFIG.replace('<server-ip-or-tailscale-name>', '192.168.1.50').replace('<your-username>', 'anna')} />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'chmod 600 ~/.ssh/config' },
          { command: 'ssh homelab', output: 'Welcome to Ubuntu ...\nanna@homelab:~$' },
        ]}
      />
      <Table
        headers={['Line', 'Meaning']}
        rows={[
          [<code key="a">Host homelab</code>, 'The nickname you will type'],
          [<code key="b">HostName</code>, 'The real address or name of the server'],
          [<code key="c">User</code>, 'Your username on the server'],
          [<code key="d">IdentityFile</code>, 'Which private key to use'],
        ]}
      />
      <Callout type="success" title="Success looks like this">
        <code>ssh homelab</code> logs you straight in. In step 3.10 you will change the <code>HostName</code> line to the
        Tailscale name, and the same command will work from a cafe on the other side of the world.
      </Callout>

      <Section title="Copying files" />
      <CommandTable
        title="Moving files over SSH"
        rows={[
          { command: 'scp file.txt homelab:~/', description: 'Copy a file from here to the server’s home folder', example: 'scp notes.txt homelab:~/' },
          { command: 'scp homelab:~/file.txt .', description: 'Copy a file from the server to here', example: 'scp homelab:~/notes.txt .' },
          { command: 'ssh homelab "ls -la"', description: 'Run one command on the server and come back', example: 'ssh homelab "df -h"' },
        ]}
      />
      <p>
        Notice that <code>homelab</code> now works everywhere, because the config file defines it.
      </p>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><code>Connection timed out</code>: wrong address, the server is off, or you are not on the same network. Try <code>ping</code> first.</li>
          <li><code>Permission denied (publickey)</code>: the key was not copied. Repeat <code>ssh-copy-id</code>.</li>
          <li><code>WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED</code>: you may have reinstalled the server. If you did, remove the old entry with <code>ssh-keygen -R 192.168.1.50</code>. If you did not, stop and ask.</li>
          <li><code>Bad owner or permissions</code> on the config: run <code>chmod 600 ~/.ssh/config</code>.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="What does ssh-copy-id do?"
          options={['Copies your private key to the server', 'Adds your public key to the server so it recognises you', 'Copies files', 'Encrypts the disk']}
          correctIndex={1}
          explanation="It installs your public padlock on the server. The private key never leaves your computer."
        />
        <Quiz
          question="What is the point of ~/.ssh/config?"
          options={['To make SSH faster', 'To give the server a short nickname, with its details stored', 'To store passwords', 'To encrypt traffic']}
          correctIndex={1}
          explanation="You type ssh homelab instead of the full user and address."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'SSH is an encrypted terminal on another computer.',
          'ssh-copy-id installs your public key so the server recognises you.',
          'A Host entry in ~/.ssh/config turns the whole thing into ssh homelab.',
          'scp copies files over the same connection.',
        ]}
      />
    </div>
  );
}
