import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_10_Tailscale() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.10 • The Server"
        title="Tailscale: Reach Home From Anywhere"
        summary="A private network between your own devices, so the server is reachable anywhere without opening a single door in your router."
      />

      <p>
        Right now the server is reachable only from inside your home. To reach it from elsewhere, the traditional way is
        to open ports in the router, which exposes it to the entire internet (step 3.3). <strong>Tailscale</strong> offers
        a safer way: it builds an encrypted private network, called your <Term definition="Your private Tailscale network: only devices you have signed in can join, and only they can talk to each other.">tailnet</Term>,
        directly between your devices. Your laptop, your phone and your server all join, and then they see each other as
        if they were on the same Wi-Fi, wherever they really are.
      </p>
      <Table
        headers={['Without Tailscale', 'With Tailscale']}
        rows={[
          ['Open router ports to the whole internet', 'No open ports at all'],
          ['The address changes when your ISP changes it (needs DDNS)', 'A stable address for each device'],
          ['Attackers can probe the service', 'Only your signed-in devices can see it'],
        ]}
      />
      <p>
        Each device in the tailnet gets a stable address in the <code>100.x.x.x</code> range and a friendly name.
      </p>

      <Section title="1. Create an account" />
      <p>Sign up at <code>tailscale.com</code> (free for personal use) using an identity such as your Google account.</p>

      <Section title="2. Install it on the server" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'curl -fsSL https://tailscale.com/install.sh | sh' },
          { command: 'sudo tailscale up', output: 'To authenticate, visit:\n  https://login.tailscale.com/a/xxxxxxxx' },
        ]}
      />
      <p>
        Open that web address on any computer, sign in, and approve the device. Then:
      </p>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'tailscale ip -4', output: '100.101.102.103' },
          { command: 'tailscale status', output: '100.101.102.103  homelab  anna@  linux  -' },
        ]}
      />

      <Section title="3. Install it on your own devices" />
      <Steps
        steps={[
          { title: 'Windows', children: <p>Download the installer from <code>tailscale.com/download</code>, run it and sign in with the <em>same</em> account.</p> },
          { title: 'Phone', children: <p>Install the Tailscale app from the app store, and sign in with the same account.</p> },
          { title: 'Check', children: <p>In the Tailscale admin page (<code>login.tailscale.com/admin/machines</code>) you should see all your devices, each with a <code>100.x</code> address.</p> },
        ]}
      />

      <Callout type="warning" title="Turn off key expiry for the server">
        By default Tailscale device keys expire after a while, and an expired server silently drops off your network.
        In the admin page, click the three dots next to <code>homelab</code> and choose <strong>Disable key expiry</strong>.
        Do this for the server only.
      </Callout>

      <Section title="4. Use it" />
      <p>From your Windows computer&apos;s WSL terminal, you can now reach the server by its Tailscale address:</p>
      <TerminalBlock
        path="~"
        lines={[
          { command: 'ssh anna@100.101.102.103', output: 'anna@homelab:~$' },
        ]}
      />
      <p>
        Better still, switch the <code>HostName</code> line in your <code>~/.ssh/config</code> from the home address to
        the Tailscale address (or the MagicDNS name <code>homelab</code>, which Tailscale makes for you). Then{' '}
        <code>ssh homelab</code> works at home, and in a cafe, and on a different continent.
      </p>
      <Callout type="info" title="Is WSL on the tailnet?">
        With Tailscale running on Windows and WSL in mirrored mode, WSL normally reaches your tailnet too. If{' '}
        <code>ssh</code> from WSL times out but works from Windows PowerShell, ask your AI helper about running Tailscale
        inside WSL as well.
      </Callout>

      <Section title="5. Test it for real" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>Turn your phone&apos;s Wi-Fi off and use its mobile hotspot for your laptop (so you are definitely away from the home network).</li>
        <li>Make sure Tailscale is on in Windows.</li>
        <li>Run <code>ssh homelab</code> in WSL.</li>
      </ol>
      <p>If you reach the server, it works. Nothing was opened in your router.</p>

      <Section title="6. Tighten the firewall" />
      <p>
        With Tailscale you no longer need SSH open to your home network at all. You can allow it only on the Tailscale
        connection:
      </p>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo ufw allow in on tailscale0' },
          { command: 'sudo ufw status', output: 'Anywhere on tailscale0    ALLOW IN    Anywhere' },
        ]}
      />
      <Callout type="warning" title="Do this after Tailscale is proven">
        Only remove the plain <code>allow ssh</code> rule (later) once you have logged in successfully over Tailscale from
        outside your home. Keep your safety-net window open while you change firewall rules.
      </Callout>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li>The server shows as offline: <code>sudo tailscale up</code> again, then check for key expiry.</li>
          <li>Cannot reach it from Windows: confirm Tailscale shows &quot;Connected&quot; on both sides and that you signed in to the same account.</li>
          <li>The name <code>homelab</code> does not resolve: use the <code>100.x</code> address, or check that MagicDNS is on in the admin page.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="What is the main advantage of Tailscale over port forwarding?"
          options={['It is faster', 'It needs no open ports, so nothing is exposed to the internet', 'It is free of accounts', 'It replaces SSH']}
          correctIndex={1}
          explanation="Your devices connect through an encrypted private network. Nothing at home faces the public internet."
        />
        <Quiz
          question="Why disable key expiry on the server?"
          options={['It makes it faster', 'So it does not silently drop off the tailnet later', 'It is required', 'To save disk space']}
          correctIndex={1}
          explanation="An expired key disconnects the server until you log in and re-authenticate."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Tailscale builds an encrypted private network (a tailnet) between your own devices.',
          'Each device gets a stable 100.x address and a name, wherever it is.',
          'Install it on the server, your computer and your phone, all with the same account.',
          'Disable key expiry on the server, and use the Tailscale name in ~/.ssh/config.',
        ]}
      />
    </div>
  );
}
