import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_11_ServerUpkeep() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.11 • The Server"
        title="Keeping a Server Healthy"
        summary="Updates, a few base tools, and the five commands that tell you whether your server is well."
      />

      <p>
        A server is not a thing you set up and forget. Software gets security fixes, disks fill up, and processes
        misbehave. A few minutes of attention each week keeps it dependable. Everything here is something you can do
        over <code>ssh homelab</code>.
      </p>

      <Section title="1. Update it" />
      <TerminalBlock
        path="anna@homelab:~"
        command="sudo apt update && sudo apt upgrade -y"
        output={'Reading package lists... Done\n...\n12 upgraded, 0 newly installed.'}
      />
      <Table
        headers={['Piece', 'Meaning']}
        rows={[
          [<code key="a">sudo apt update</code>, 'Refresh the list of available updates (from step 1.9)'],
          [<code key="b">&amp;&amp;</code>, 'Run the second command only if the first succeeded'],
          [<code key="c">sudo apt upgrade -y</code>, 'Install the updates. -y answers "yes" for you'],
        ]}
      />
      <p>Some updates (notably the Linux kernel itself) only take effect after a restart. The system tells you:</p>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'cat /var/run/reboot-required', output: '*** System restart required ***' },
          { command: 'sudo reboot' },
        ]}
      />
      <p>
        If the file does not exist, nothing is pending. Wait a minute after a reboot, then <code>ssh homelab</code> again.
        Docker containers set to <code>restart: unless-stopped</code> come back by themselves.
      </p>
      <Callout type="info" title="Automatic security updates">
        Ubuntu Server normally installs urgent security fixes by itself using a service called{' '}
        <code>unattended-upgrades</code>. Check it with <code>systemctl status unattended-upgrades</code>. Your weekly
        manual update still matters, because it covers everything else.
      </Callout>

      <Section title="2. A few base tools" />
      <p>These are small tools you will want on every server:</p>
      <TerminalBlock
        path="anna@homelab:~"
        command="sudo apt install -y curl wget git htop net-tools ca-certificates gnupg"
      />
      <Table
        headers={['Tool', 'Why']}
        rows={[
          ['curl, wget', 'Download files and test web addresses'],
          ['git', 'Pull your code from GitHub (steps 3.14 and 3.24)'],
          ['htop', 'A live view of CPU, memory and processes'],
          ['net-tools', 'Old but handy network commands such as netstat'],
          ['ca-certificates, gnupg', 'Needed to verify downloads (Docker setup uses them)'],
        ]}
      />

      <Section title="3. The health check" />
      <CommandTable
        title="Five questions, five commands"
        rows={[
          { command: 'uptime', description: 'How long has it been running, and how busy has it been?', example: 'uptime' },
          { command: 'df -h', description: 'How full are the disks? (-h means human-readable sizes)', example: 'df -h' },
          { command: 'free -h', description: 'How much memory is used and free?', example: 'free -h' },
          { command: 'htop', description: 'Live list of the busiest processes. Press q to quit', example: 'htop' },
          { command: 'systemctl status <name>', description: 'Is a service running?', example: 'systemctl status ssh' },
        ]}
      />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'df -h /', output: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda2       234G   41G  181G  19% /' },
          { command: 'free -h', output: '               total        used        free\nMem:           7.6Gi       1.9Gi       3.8Gi' },
        ]}
      />
      <p>
        The one to watch is <code>Use%</code> in <code>df -h</code>. A full disk is the most common way a server breaks,
        and containers and their images are the usual cause (step 3.13 shows how to see and clean that).
      </p>

      <Section title="4. When something is wrong: logs" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'journalctl -u ssh -n 20', output: 'Oct 13 09:14:02 homelab sshd[1204]: Accepted publickey for anna ...' },
          { command: 'systemctl list-timers', output: 'NEXT                LEFT  UNIT\n...                       apt-daily-upgrade.timer\n...                       logrotate.timer' },
        ]}
      />
      <ul className="list-disc pl-5 space-y-1">
        <li><code>journalctl -u &lt;service&gt; -n 20</code> shows the last 20 log lines for a service.</li>
        <li><code>systemctl list-timers</code> lists the scheduled jobs: updates, log tidying, and later certificate renewal.</li>
      </ul>

      <Callout type="tip" title="Weekly routine (five minutes)">
        <ol className="list-decimal pl-5 space-y-1">
          <li><code>ssh homelab</code></li>
          <li><code>sudo apt update &amp;&amp; sudo apt upgrade -y</code></li>
          <li><code>df -h</code> and <code>free -h</code> to see whether anything is getting full</li>
          <li>Reboot if <code>/var/run/reboot-required</code> exists</li>
          <li>Check that your apps still answer</li>
        </ol>
      </Callout>

      <Exercise
        title="Health report"
        hint={<p>You can run a single command remotely with <code>ssh homelab &quot;command&quot;</code>.</p>}
        solution={
          <TerminalBlock
            path="~"
            lines={[
              { command: 'ssh homelab "uptime && df -h / && free -h"' },
            ]}
          />
        }
      >
        <p>
          From your own WSL terminal, without staying logged in, print the server&apos;s uptime, root disk usage and
          memory in one command.
        </p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What does the -y in apt upgrade -y do?"
          options={['Yields to other programs', 'Answers "yes" to the confirmation questions', 'Upgrades only one package', 'Forces a reboot']}
          correctIndex={1}
          explanation="Without -y, apt waits for you to type y."
        />
        <Quiz
          question="Which command shows how full the disks are?"
          options={['free -h', 'df -h', 'uptime', 'htop']}
          correctIndex={1}
          explanation="df reports disk usage. free reports memory."
        />
        <Quiz
          question="/var/run/reboot-required exists. What should you do?"
          options={['Ignore it', 'Plan a restart so updates take effect', 'Delete it', 'Reinstall Ubuntu']}
          correctIndex={1}
          explanation="The system is telling you some updates, such as the kernel, need a restart."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'sudo apt update && sudo apt upgrade -y keeps the server patched. Reboot when asked.',
          'uptime, df -h, free -h, htop and systemctl status answer "is it healthy?".',
          'A full disk is the most common failure. Watch Use%.',
          'journalctl -u <service> shows a service\'s logs.',
        ]}
      />
    </div>
  );
}
