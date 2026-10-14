import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { WSLCONFIG } from '../topic_toolkit/tools/tools_setup';

export default function Step1_2_Wsl() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.2 • Setup"
        title="Install WSL (Linux inside Windows)"
        summary="Install Ubuntu on your Windows 11 computer and switch on mirrored networking."
      />

      <p>
        Almost all developer tools are built for Linux. <strong>WSL</strong> (Windows Subsystem for Linux) lets you run
        a real copy of Linux, Ubuntu in our case, inside Windows with no second computer and no restart into another
        system. Your Windows programs keep working as normal.
      </p>

      <Callout type="tip" title="Stuck at any point?">
        This is the one step where your AI helper is most useful. Copy whatever the screen shows and ask it. The next
        step also installs a helper that can run these fixes for you.
      </Callout>

      <Section title="1. Check your Windows version" />
      <p>
        Mirrored networking needs Windows 11 version 22H2 or newer. Press the Windows key, type <code>winver</code> and
        press Enter. A small window shows your version. It should say <strong>22H2</strong> or later (for example 23H2
        or 24H2). If it is older, run Windows Update first.
      </p>

      <Section title="2. Install WSL and Ubuntu" />
      <Steps
        steps={[
          {
            title: 'Open PowerShell as administrator',
            children: <p>Press the Windows key, type <code>PowerShell</code>, right-click it and choose <em>Run as administrator</em>.</p>,
          },
          {
            title: 'Run the install command',
            children: (
              <CodeBlock
                language="powershell"
                title="PowerShell (administrator)"
                code="wsl --install"
              />
            ),
          },
          {
            title: 'Restart your computer when asked',
            children: <p>Ubuntu finishes installing after the restart and opens a window on its own.</p>,
          },
          {
            title: 'Create your Linux username and password',
            children: (
              <>
                <p>
                  Choose a short lowercase username with no spaces. Pick a password you will remember. This is separate
                  from your Windows password.
                </p>
                <Callout type="warning" title="The password stays blank">
                  When you type the password, nothing appears on screen, not even dots. That is normal. Type it and
                  press Enter.
                </Callout>
              </>
            ),
          },
        ]}
      />

      <p>
        When it finishes you will see a prompt like <code>anna@PC:~$</code>. That is your Linux terminal. You can open
        it any time by pressing the Windows key and typing <code>Ubuntu</code>.
      </p>

      <Section title="3. Turn on mirrored networking" />
      <p>
        By default, WSL gets its own hidden network, which causes confusing problems later when you run a website on
        your machine and cannot reach it from the browser, or when you want other devices on your home network to reach
        it. <strong>Mirrored mode</strong> makes Linux share the exact same network as Windows, so
        <code> localhost</code> works the same in both.
      </p>
      <Steps
        steps={[
          {
            title: 'Open the settings file in Notepad',
            children: (
              <>
                <p>In a normal PowerShell window (not Ubuntu), run:</p>
                <CodeBlock language="powershell" title="PowerShell" code={'notepad $env:USERPROFILE\\.wslconfig'} />
                <p>If Notepad asks to create a new file, say yes.</p>
              </>
            ),
          },
          {
            title: 'Paste these two lines and save',
            children: (
              <CodeBlock language="ini" title=".wslconfig" code={WSLCONFIG} />
            ),
          },
          {
            title: 'Restart WSL',
            children: <CodeBlock language="powershell" title="PowerShell" code="wsl --shutdown" />,
          },
          {
            title: 'Open Ubuntu again and verify',
            children: (
              <TerminalBlock path="~" command="wslinfo --networking-mode" output="mirrored" />
            ),
          },
        ]}
      />

      <Callout type="success" title="Success looks like this">
        The word <code>mirrored</code> appears. If you see <code>nat</code>, the file was not saved correctly. Check that
        it is named exactly <code>.wslconfig</code> (not <code>.wslconfig.txt</code>) and sits in your user folder, then
        run <code>wsl --shutdown</code> again.
      </Callout>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><code>wsl --install</code> says the command is not recognised: update Windows, then try again.</li>
          <li><code>wslinfo</code> is not found: run <code>wsl --update</code> in PowerShell, then <code>wsl --shutdown</code>.</li>
          <li>Notepad saved the file as <code>.wslconfig.txt</code>: choose <em>All files</em> in the save dialog, or ask your AI helper how to rename it.</li>
        </ul>
      </Collapsible>

      <Quiz
        question="After editing .wslconfig, what must you do before the change takes effect?"
        options={['Nothing, it applies instantly', 'Run wsl --shutdown and reopen Ubuntu', 'Reinstall Windows', 'Delete the file']}
        correctIndex={1}
        explanation="WSL only reads .wslconfig when it starts, so shutting it down and reopening applies the new settings."
      />

      <KeyTakeaways
        items={[
          'WSL runs real Ubuntu inside Windows 11 with no second computer needed.',
          'Run PowerShell as administrator for wsl --install, then restart.',
          'The Linux password is invisible as you type. That is normal.',
          'Mirrored networking lives in .wslconfig, and wslinfo --networking-mode should say "mirrored".',
        ]}
      />
    </div>
  );
}
