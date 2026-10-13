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

export default function Step3_9_Hardening() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.9 • The Server"
        title="Locking It Down: No Passwords, and a Firewall"
        summary="Make the server accept only your key, and block every door that you have not deliberately opened."
      />

      <p>
        A machine with a login prompt on a network gets probed. Passwords can be guessed, but a private key cannot be
        guessed in any realistic time. So now that your key works, we turn <em>passwords off</em> for SSH, and we add a{' '}
        <strong>firewall</strong> that refuses everything except what we choose.
      </p>

      <Callout type="warning" title="The lockout danger">
        If you turn off passwords before key login works, or you enable the firewall before allowing SSH, you lock
        yourself out and need the laptop&apos;s keyboard and screen again. Follow the order below exactly, and keep one
        SSH window open while you test in a second.
      </Callout>

      <Section title="1. Check that your key works" />
      <TerminalBlock
        path="~"
        command="ssh -o PreferredAuthentications=publickey homelab"
        output={'anna@homelab:~$'}
      />
      <p>
        This forces key login. If it does not let you in, <strong>stop</strong> and fix that first (step 3.8). Leave this
        window open, as your safety net.
      </p>

      <Section title="2. Turn off password login" />
      <TerminalBlock path="anna@homelab:~" command="sudo nano /etc/ssh/sshd_config" />
      <p>Find (or add) these lines, with no <code>#</code> at the start:</p>
      <CodeBlock
        language="bash"
        title="/etc/ssh/sshd_config"
        code={`PasswordAuthentication no
PermitRootLogin no`}
      />
      <Table
        headers={['Setting', 'Effect']}
        rows={[
          [<code key="a">PasswordAuthentication no</code>, 'Only keys can log in. Password guessing becomes pointless'],
          [<code key="b">PermitRootLogin no</code>, 'Nobody can log in directly as the all-powerful root user'],
        ]}
      />
      <Callout type="warning" title="Ubuntu has a second place that can override this">
        Files inside <code>/etc/ssh/sshd_config.d/</code> are read first, and one of them (often{' '}
        <code>50-cloud-init.conf</code>) may set <code>PasswordAuthentication yes</code>, which wins over your edit. Always
        check the <em>effective</em> value afterwards, as in the next step.
      </Callout>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo sshd -T | grep -iE "passwordauthentication|permitrootlogin"', output: 'permitrootlogin no\npasswordauthentication no' },
          { command: 'ls /etc/ssh/sshd_config.d/' },
          { command: 'sudo systemctl restart ssh' },
        ]}
      />
      <p>
        Both lines must say <code>no</code>. If <code>passwordauthentication</code> still says <code>yes</code>, edit the
        file in <code>sshd_config.d</code> that sets it. Then restart SSH.
      </p>

      <Section title="3. Test in a second window" />
      <p>Open a <strong>new</strong> WSL terminal (keep the first open) and run:</p>
      <TerminalBlock path="~" command="ssh homelab" output="anna@homelab:~$" />
      <p>Also confirm that passwords are refused:</p>
      <TerminalBlock
        path="~"
        command="ssh -o PubkeyAuthentication=no homelab"
        output="anna@192.168.1.50: Permission denied (publickey)."
      />
      <Callout type="success" title="Success looks like this">
        Your normal login works, and the forced-password attempt is refused. Now you can close the safety-net window.
      </Callout>

      <Section title="4. The firewall: ufw" />
      <p>
        <strong>ufw</strong> (&quot;uncomplicated firewall&quot;) controls which doors are open. The philosophy: deny
        everything coming in, allow everything going out, then open only what you need. <strong>The order matters</strong>:
        allow SSH <em>before</em> you enable it.
      </p>
      <Steps
        steps={[
          {
            title: 'Set the defaults',
            children: <TerminalBlock path="anna@homelab:~" lines={[{ command: 'sudo ufw default deny incoming' }, { command: 'sudo ufw default allow outgoing' }]} />,
          },
          {
            title: 'Allow SSH first',
            children: <TerminalBlock path="anna@homelab:~" command="sudo ufw allow ssh" output="Rules updated" />,
          },
          {
            title: 'Switch it on',
            children: <TerminalBlock path="anna@homelab:~" command="sudo ufw enable" output="Command may disrupt existing ssh connections. Proceed with operation (y|n)? y" />,
          },
          {
            title: 'Check the rules',
            children: <TerminalBlock path="anna@homelab:~" command="sudo ufw status verbose" output={'Status: active\nDefault: deny (incoming), allow (outgoing)\n22/tcp    ALLOW IN    Anywhere'} />,
          },
        ]}
      />
      <p>
        Your SSH session should survive. Open a new one to be sure. You will add rules for the web (nginx) and for
        Tailscale in later steps, always one deliberate door at a time.
      </p>

      <Callout type="warning" title="Docker can walk around the firewall">
        There is a well-known catch: when Docker publishes a container&apos;s port, it adds its own network rules that{' '}
        <strong>bypass ufw</strong>. A port that ufw appears to block can still be open. In step 3.14 you will see how we
        avoid this by publishing container ports only on <code>127.0.0.1</code>.
      </Callout>

      <Collapsible title="Locked yourself out?">
        <p>
          Connect a keyboard and screen to the laptop and log in there with your password. Check{' '}
          <code>sudo ufw status</code> and <code>sudo sshd -T | grep -i passwordauthentication</code>, and fix whichever
          is wrong. This is exactly why you were told to test in a second window.
        </p>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Why is the order important when setting up ufw?"
          options={['It is not', 'Allow SSH before enabling, or you lock yourself out', 'ufw must be enabled first', 'SSH is allowed by default']}
          correctIndex={1}
          explanation="Enabling a deny-all firewall before allowing SSH cuts your own connection."
        />
        <Quiz
          question="After editing sshd_config, how do you confirm the real setting?"
          options={['Trust the file', 'sudo sshd -T | grep -i passwordauthentication', 'Reboot', 'Ask GitHub']}
          correctIndex={1}
          explanation="sshd -T prints the effective configuration, including overrides in sshd_config.d."
        />
        <Quiz
          question="Why test the new login in a second window?"
          options={['It is faster', 'To keep a working session in case the change locks you out', 'SSH requires two windows', 'No reason']}
          correctIndex={1}
          explanation="A working session you did not close is a safety net."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Keys cannot be guessed. Turn off SSH passwords with PasswordAuthentication no.',
          'Check the effective setting with sudo sshd -T, since files in sshd_config.d can override your edit.',
          'ufw: default deny incoming, allow ssh FIRST, then enable.',
          'Always test in a second window before closing the first.',
          'Docker can bypass ufw, so bind container ports to 127.0.0.1.',
        ]}
      />
    </div>
  );
}
