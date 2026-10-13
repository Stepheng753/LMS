import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_9_Installing() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.9 • Bash Basics"
        title="Installing Software"
        summary="Use sudo and apt to install tools, the way you would use an app store."
      />

      <p>
        On Ubuntu, software comes as <strong>packages</strong> from a trusted catalogue, and <code>apt</code> is the
        tool that fetches them. Installing something changes the whole machine, not just your files, so it needs
        administrator powers. That is where <code>sudo</code> comes in.
      </p>

      <Section title="What sudo means" />
      <p>
        <code>sudo</code> (&quot;superuser do&quot;) runs <em>one</em> command with administrator powers. Put it in
        front of the command you want:
      </p>
      <TerminalBlock path="~" command="sudo apt update" output="[sudo] password for anna:" />
      <p>
        It asks for your Linux password (still invisible as you type). You will not need it for everyday commands like{' '}
        <code>ls</code> or <code>mkdir</code>. Only for things that change the system.
      </p>
      <Callout type="warning" title="Slow down at sudo">
        <code>sudo</code> removes the safety rails. Only use it for commands you understand or have asked someone to
        explain. If an instruction you found online starts with <code>sudo</code> and you are not sure what it does,
        ask your AI helper first.
      </Callout>

      <Section title="The install routine" />
      <Steps
        steps={[
          {
            title: 'Refresh the catalogue',
            children: (
              <>
                <TerminalBlock path="~" command="sudo apt update" />
                <p>This only downloads the latest list of what is available. It does not install anything.</p>
              </>
            ),
          },
          {
            title: 'Install a package',
            children: (
              <>
                <TerminalBlock path="~" command="sudo apt install tree" />
                <p>It shows what it will do and asks <code>Do you want to continue? [Y/n]</code>. Type <code>y</code> and press Enter.</p>
              </>
            ),
          },
          {
            title: 'Try it',
            children: (
              <TerminalBlock
                lines={[
                  {
                    path: '~/Development',
                    command: 'tree playground',
                    output: `playground
├── drafts
├── notes
│   └── ideas.md
└── recipes
    └── dinner
        └── pasta.txt`,
                  },
                ]}
              />
            ),
          },
        ]}
      />
      <p>
        <code>tree</code> draws a folder as a picture, which is handy for checking what you built in the last few steps.
      </p>

      <CommandTable
        title="Package commands"
        rows={[
          { command: 'sudo apt update', description: 'Refresh the list of available packages', example: 'sudo apt update' },
          { command: 'sudo apt upgrade', description: 'Update everything already installed', example: 'sudo apt upgrade' },
          { command: 'sudo apt install x', description: 'Install package x', example: 'sudo apt install tree' },
          { command: 'sudo apt remove x', description: 'Uninstall package x', example: 'sudo apt remove tree' },
        ]}
      />

      <Callout type="tip" title="Get in the habit">
        Run <code>sudo apt update</code> before installing something, and <code>sudo apt upgrade</code> every week or
        two to keep your machine patched. Or just ask Agy: &quot;update my system&quot;.
      </Callout>

      <QuizSet>
        <Quiz
          question="What does sudo do?"
          options={[
            'Deletes a file',
            'Runs one command with administrator powers',
            'Makes your computer faster',
            'Switches to Windows',
          ]}
          correctIndex={1}
          explanation="sudo gives a single command administrator rights, after you confirm with your password."
        />
        <Quiz
          question="What does sudo apt update install?"
          options={['The latest version of everything', 'Nothing. It only refreshes the package list', 'The tree tool', 'Ubuntu']}
          correctIndex={1}
          explanation="update refreshes the catalogue. install and upgrade do the actual installing."
        />
        <FillInQuiz
          question="Which command installs a package called tree? (Type the part after 'sudo apt')"
          answer={['install tree', 'install  tree']}
          explanation="sudo apt install tree"
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'apt installs software from Ubuntu’s trusted catalogue. Installs need sudo.',
          'sudo runs one command as administrator. Pause before using it on anything you do not understand.',
          'update refreshes the list, install adds a package, upgrade updates what you already have.',
          'The password is invisible as you type.',
        ]}
      />
    </div>
  );
}
