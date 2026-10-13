import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_6_UbuntuServer() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.6 • The Server"
        title="Install Ubuntu Server on the Old Laptop"
        summary="Turn the old laptop into a server that runs without a screen, from a USB stick."
      />

      <p>
        A <strong>server</strong> is just a computer that runs services for other computers. It has no desktop and no
        mouse, only a text terminal, which is why the commands you learned in Topic 1 matter. This is the same Ubuntu
        you have been using in WSL, now running for real on its own hardware.
      </p>

      <Callout type="warning" title="This erases the laptop">
        The installer will wipe the laptop&apos;s disk. Copy anything you want to keep first. Also, installation needs
        the laptop plugged in the whole time.
      </Callout>

      <Section title="1. Make the installer USB (on your Windows PC)" />
      <Steps
        steps={[
          { title: 'Download Ubuntu Server', children: <p>From <code>ubuntu.com/download/server</code>, get the current <strong>LTS</strong> release. LTS means &quot;long-term support&quot;: security updates for years. You receive a large <code>.iso</code> file.</p> },
          { title: 'Write it to the USB stick', children: <p>Use a free tool such as <strong>balenaEtcher</strong> or <strong>Rufus</strong>: choose the ISO, choose the USB stick, click write. It will erase the stick.</p> },
        ]}
      />

      <Section title="2. Boot the laptop from the stick" />
      <Steps
        steps={[
          { title: 'Plug in the stick and the Ethernet cable', children: <p>Connect the laptop to the router by cable and to power.</p> },
          {
            title: 'Open the boot menu while it starts',
            children: (
              <p>
                Switch the laptop on and tap the boot-menu key repeatedly. It depends on the brand and is often{' '}
                <code>F12</code>, <code>Esc</code>, <code>F10</code> or <code>F2</code>. The start-up logo sometimes shows
                it, and an internet search for &quot;&lt;laptop model&gt; boot menu key&quot; settles it.
              </p>
            ),
          },
          { title: 'Choose the USB stick', children: <p>Pick the entry named after your USB stick. The Ubuntu installer starts.</p> },
        ]}
      />

      <Section title="3. Walk through the installer" />
      <p>Use the arrow keys, <code>Tab</code> and <code>Enter</code>. There is no mouse.</p>
      <Table
        headers={['Screen', 'What to choose']}
        rows={[
          ['Language and keyboard', 'Your language and keyboard layout'],
          ['Type of install', 'Ubuntu Server (not the minimized one)'],
          ['Network', 'Leave the default. Note the address it shows. You should see a wired connection with an address from your router'],
          ['Proxy and mirror', 'Leave both as they are'],
          ['Storage', 'Use an entire disk with the default settings. This is the step that erases the disk'],
          ['Profile', <span key="p">Your name, a short <strong>server name</strong> (for example homelab), a lowercase username, and a password</span>],
          ['SSH', <strong key="s">Tick &quot;Install OpenSSH server&quot;</strong>],
          ['Featured snaps', 'Select none and continue'],
        ]}
      />
      <Callout type="tip" title="Remember what you type here">
        The username and the server name are what you will use in every later step: <code>ssh username@homelab</code>.
        Write them down along with the password.
      </Callout>
      <p>
        Wait for the installation to finish, choose <strong>Reboot now</strong>, and remove the USB stick when it
        tells you to. The laptop restarts into a black screen with a login prompt.
      </p>

      <Section title="4. First login and the lid" />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'hostname -I', output: '192.168.1.50' },
          { command: 'sudo nano /etc/systemd/logind.conf' },
        ]}
      />
      <p>
        Note that address, you need it in the next two steps. Then, because this is a laptop, tell it not to sleep when the
        lid closes. Find these two lines in the file, remove the <code>#</code> at the start, and set them to{' '}
        <code>ignore</code>:
      </p>
      <TerminalBlock
        path="~"
        command="grep -i lidswitch /etc/systemd/logind.conf"
        output={'HandleLidSwitch=ignore\nHandleLidSwitchExternalPower=ignore'}
      />
      <p>Save with <code>Ctrl+O</code>, <code>Enter</code>, <code>Ctrl+X</code>, then restart the laptop:</p>
      <TerminalBlock path="~" command="sudo reboot" />
      <p>
        Once it has restarted, you can close the lid, put the laptop somewhere with ventilation, keep it plugged in
        and cabled, and never touch its keyboard again. From now on you control it from your own computer.
      </p>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li>The laptop goes straight back to the old system: the USB stick is not first in the boot order. Use the boot menu key again.</li>
          <li>The network screen shows no address: check the cable, or try another port on the router.</li>
          <li>No Ethernet port: a USB-to-Ethernet adapter works well. Wi-Fi is possible but needs extra setup in the installer, and is less reliable for a server.</li>
          <li>The laptop gets hot: keep the vents clear, and a laptop stand helps.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="What does LTS mean?"
          options={['Light, tiny, simple', 'Long-term support: updates for years', 'Linux test server', 'Latest tested software']}
          correctIndex={1}
          explanation="LTS releases receive security updates for years, which is what you want in a server."
        />
        <Quiz
          question="Which option must you tick during install so you can control the server remotely?"
          options={['Docker', 'OpenSSH server', 'Featured snaps', 'Proxy']}
          correctIndex={1}
          explanation="OpenSSH server lets you log in from your own computer."
        />
        <Quiz
          question="Why change HandleLidSwitch to ignore?"
          options={['To save power', 'So closing the lid does not put the server to sleep', 'To make it faster', 'To turn off the screen']}
          correctIndex={1}
          explanation="A sleeping server is an offline server."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A server is a computer without a desktop, controlled by text commands.',
          'Install the current Ubuntu Server LTS from a USB stick. This erases the disk.',
          'Tick "Install OpenSSH server", and note the username, server name and IP address.',
          'Set the lid switch to ignore, then you can close the lid and leave it running.',
        ]}
      />
    </div>
  );
}
