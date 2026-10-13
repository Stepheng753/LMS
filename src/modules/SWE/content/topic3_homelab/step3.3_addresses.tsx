import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Exercise } from '../../../../components/content/Exercise';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_3_Addresses() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.3 • Foundations"
        title="Addresses: IPs, Ports & Your Home Network"
        summary="How your devices find each other at home, how your home connects to the world, and why we avoid opening doors in the router."
      />

      <Section title="IP addresses: the street address of a device" />
      <p>
        Every device on a network has an <strong>IP address</strong>, a number like <code>192.168.1.50</code>. It is how
        other machines send packets to it. (You will also meet longer IPv6 addresses. The idea is identical.)
      </p>

      <Section title="Private and public" />
      <Table
        headers={['Kind', 'Looks like', 'Who can reach it', 'Example']}
        rows={[
          ['Private (home network)', '192.168.x.x, 10.x.x.x, 172.16.x.x to 172.31.x.x', 'Only devices on your own network', 'Your laptop: 192.168.1.20'],
          ['Public', 'Everything else', 'Anyone on the internet', 'The one address your home shows to the world'],
          ['Loopback', '127.0.0.1 (localhost)', 'Only the computer itself', 'Your Topic 2 app'],
          ['Tailscale', '100.x.x.x', 'Devices in your private Tailscale network', 'Your server, from anywhere'],
        ]}
      />
      <p>
        Your whole home shares <strong>one</strong> public address, handed to you by your internet provider (ISP). Inside
        the house, every device gets its own private one.
      </p>

      <Section title="The router: the front desk of your home" />
      <p>Your router does three jobs that you should understand:</p>
      <Table
        headers={['Job', 'Name', 'Plain words']}
        rows={[
          ['Hands out private addresses', <Term key="d" definition="Dynamic Host Configuration Protocol: the router automatically gives each device a private address when it joins.">DHCP</Term>, 'Every device that connects is given an address from a pool'],
          ['Shares one public address', <Term key="n" definition="Network Address Translation: the router rewrites addresses so many private devices can share one public address.">NAT</Term>, 'Like a building’s reception: visitors only know the building’s address and reception sends parcels to the right office'],
          ['Blocks unrequested visitors', 'Firewall', 'By default, nothing from the internet can walk in uninvited'],
        ]}
      />
      <Callout type="info" title="Why localhost only works for you">
        An address like <code>192.168.1.50</code> is a private address. It means nothing outside your home, because
        millions of homes use the very same numbers. For the rest of the world to reach something in your house, you
        either open a door in the router (port forwarding) or use a private tunnel (Tailscale). We will use the tunnel
        first.
      </Callout>

      <Section title="Ports: the doors of a device" />
      <p>
        An IP address finds the <em>machine</em>. A <strong>port</strong> finds the <em>program</em> on it, like an
        apartment number within a building. Programs listen on a port, and clients knock on that port.
      </p>
      <Table
        headers={['Port', 'Used by']}
        rows={[
          ['22', 'SSH: remote terminal (step 3.8)'],
          ['80', 'HTTP: plain websites'],
          ['443', 'HTTPS: secure websites'],
          ['5173', 'Your Vite frontend'],
          ['8000', 'Your FastAPI backend'],
          ['2283', 'Immich'],
          ['8096', 'Jellyfin'],
        ]}
      />

      <Section title="Listening on which address?" />
      <p>
        When a program starts it also chooses <em>who may connect</em>. This matters a lot for safety:
      </p>
      <Table
        headers={['It listens on', 'Meaning']}
        rows={[
          [<code key="a">127.0.0.1</code>, 'Only programs on the same machine can connect. Private by default'],
          [<code key="b">0.0.0.0</code>, 'Anyone who can reach this machine on the network can connect'],
        ]}
      />
      <p>
        Later you will see ports written as <code>127.0.0.1:8000</code>. That is a deliberate choice: the app is only
        reachable by nginx on the same machine, and nginx is the one door you control.
      </p>

      <Section title="Look at your own network" />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'hostname -I', output: '192.168.1.20' },
          { command: 'curl -s https://ifconfig.me', output: '203.0.113.45' },
        ]}
      />
      <p>
        The first shows your private address. The second asks an outside service &quot;what address do you see me
        coming from?&quot; That is your home&apos;s public address. They are different, which is NAT in action. (Your
        numbers will be different. Treat your public one as private information and do not share it.)
      </p>

      <Callout type="warning" title="Port forwarding: a door in the wall">
        <strong>Port forwarding</strong> tells your router, &quot;send anything arriving on port X to this device&quot;.
        It makes a service reachable from the whole internet, including everyone who scans for open doors, and many
        homes are scanned constantly. Some ISPs also use shared addresses (CGNAT), which makes forwarding impossible. We
        prefer Tailscale, which needs no open doors. We will cover forwarding in step 3.18 as an optional extra, with the
        risks stated plainly.
      </Callout>

      <Exercise
        title="Sort the addresses"
        hint={<p>Remember the private ranges, loopback, and Tailscale&apos;s 100.x.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li><code>192.168.0.14</code>: private (home)</li>
            <li><code>127.0.0.1</code>: loopback (this computer)</li>
            <li><code>100.101.102.103</code>: Tailscale</li>
            <li><code>10.0.0.5</code>: private</li>
            <li><code>8.8.8.8</code>: public</li>
          </ul>
        }
      >
        <p>Say whether each is private, loopback, Tailscale or public: 192.168.0.14, 127.0.0.1, 100.101.102.103, 10.0.0.5, 8.8.8.8.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What does NAT let your home do?"
          options={['Encrypt traffic', 'Share one public address among many devices', 'Speed up downloads', 'Replace DNS']}
          correctIndex={1}
          explanation="NAT rewrites addresses so every device at home can use the single public address."
        />
        <Quiz
          question="An app listens on 127.0.0.1:8000. Who can connect?"
          options={['Anyone on the internet', 'Anyone on your home Wi-Fi', 'Only programs on that same machine', 'Nobody']}
          correctIndex={2}
          explanation="127.0.0.1 is loopback: private to the machine itself."
        />
        <FillInQuiz
          question="Which port do HTTPS websites use by default?"
          answer="443"
          explanation="HTTPS uses port 443."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'An IP address finds a machine, and a port finds the program on it.',
          'Homes use private addresses inside and share one public address through NAT.',
          '127.0.0.1 means "only this machine". 0.0.0.0 means "anyone who can reach me".',
          'Port forwarding exposes things to the whole internet. Prefer a private tunnel such as Tailscale.',
        ]}
      />
    </div>
  );
}
