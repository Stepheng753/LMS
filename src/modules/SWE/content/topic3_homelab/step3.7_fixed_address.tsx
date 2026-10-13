import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_7_FixedAddress() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.7 • The Server"
        title="Give the Server a Fixed Address"
        summary="A server that keeps changing address cannot be found. Ask the router to always give it the same one."
      />

      <p>
        In step 3.3 you learned that your router hands out private addresses with DHCP. By default those are{' '}
        <em>leases</em>: the router may give the same device a different address after a restart. For a laptop you carry
        around, that does not matter. For a server that everything else must find, it is a disaster, because everything
        you set up later (SSH, nginx, firewall rules) depends on its address.
      </p>

      <Section title="Two ways to fix it" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Router reservation (recommended):</strong> tell the router &quot;this exact device always gets this exact address&quot;. The server still asks for an address by DHCP as normal, so nothing on the server changes.</li>
        <li><strong>Static address on the server:</strong> hard-code the address inside the server&apos;s own network settings. It works, but if you pick an address the router also hands to another device, they clash.</li>
      </ul>
      <p>We use the router reservation, since it is safer and easier to undo.</p>

      <Section title="1. Find the server's details" />
      <p>On the server, or over a screen and keyboard for the last time:</p>
      <TerminalBlock
        path="~"
        lines={[
          { command: 'hostname -I', output: '192.168.1.50' },
          { command: 'ip link show', output: '2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> ...\n    link/ether a4:bb:6d:12:34:56 brd ff:ff:ff:ff:ff:ff' },
        ]}
      />
      <p>
        The long <code>link/ether</code> value is the network card&apos;s <strong>MAC address</strong>, a unique ID
        that routers use to recognise a device. The interface may be named differently on your laptop, and you want the
        one that is <code>UP</code> and wired.
      </p>

      <Section title="2. Make the reservation in your router" />
      <Steps
        steps={[
          { title: 'Open your router\'s app or admin page', children: <p>For a TP-Link Deco, that is the Deco app on your phone. For other routers it is usually a web page such as <code>192.168.1.1</code>, printed on the router.</p> },
          { title: 'Find the DHCP or address-reservation setting', children: <p>Look for words like <em>Address Reservation</em>, <em>DHCP reservation</em> or <em>Static lease</em> (in the Deco app, check under <em>More → Advanced</em>). The wording differs between brands.</p> },
          { title: 'Choose your server from the device list', children: <p>Match it by the MAC address or the name you gave it (homelab). Choose the address to reserve. Using its current one, <code>192.168.1.50</code> in the example, is simplest.</p> },
          { title: 'Save, then restart the server', children: <TerminalBlock path="~" command="sudo reboot" /> },
        ]}
      />

      <Section title="3. Prove it works" />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'hostname -I', output: '192.168.1.50' },
        ]}
      />
      <p>The address should be the same after the restart. Now from your Windows computer, in your WSL terminal:</p>
      <TerminalBlock
        path="~"
        lines={[
          { command: 'ping -c 3 192.168.1.50', output: '64 bytes from 192.168.1.50: icmp_seq=1 ttl=64 time=0.8 ms\n...' },
        ]}
      />
      <Callout type="success" title="Success looks like this">
        The ping gets answers. Your computer and the server can see each other. (Mirrored networking from step 1.2 is
        what lets WSL reach your home network directly.)
      </Callout>

      <Callout type="info" title="Why this is only half the story">
        A fixed home address only works at home. In step 3.10 Tailscale gives the server a second, permanent address
        that works from anywhere in the world.
      </Callout>

      <Collapsible title="If the ping fails">
        <ul className="list-disc pl-5 space-y-1">
          <li>Check that the server is on, with the Ethernet cable plugged in at both ends.</li>
          <li>Run <code>wslinfo --networking-mode</code> in WSL. If it does not say <code>mirrored</code>, revisit step 1.2.</li>
          <li>Some routers block devices on different &quot;Wi-Fi bands&quot; from seeing each other. Try from a computer on the same router, or ask your AI helper about &quot;client isolation&quot;.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Why does the server need a fixed address?"
          options={['It runs faster', 'Everything else is configured to find it at that address', 'It uses less power', 'It is required by Ubuntu']}
          correctIndex={1}
          explanation="SSH, nginx and firewall rules all assume a stable address."
        />
        <Quiz
          question="What identifies the device when the router makes a reservation?"
          options={['The username', 'The MAC address', 'The hard disk size', 'The IP address']}
          correctIndex={1}
          explanation="The MAC address is the unique ID of the network card."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'DHCP normally hands out addresses that can change. A server needs one that does not.',
          'A router reservation always gives the same device the same address, and the server itself stays unchanged.',
          'Find the MAC with ip link show, reserve in the router, restart, then ping to confirm.',
        ]}
      />
    </div>
  );
}
