import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const headers = ['Word', 'Plain meaning', 'Example'];

export default function Step1_1_Vocabulary() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.1 • Vocabulary"
        title="The Words You Will Hear"
        summary="About twenty terms, in plain language, so that nothing later in the course sounds like a foreign language."
      />

      <p>
        Skim this page now and come back to it whenever a word feels fuzzy. You do not need to memorise it. Each term
        will show up again in context in the steps that follow.
      </p>

      <Section title="The machine and its tools" />
      <Table
        headers={headers}
        rows={[
          ['Terminal', 'The window where you type commands', 'The black or dark window with a blinking cursor'],
          ['Shell', 'The program inside the terminal that reads your commands and runs them', 'Bash'],
          ['Bash', 'The most common shell on Linux', 'What you will use throughout this course'],
          ['CLI', 'Command-line interface: any tool you control by typing', 'git, agy, apt'],
          ['Prompt', 'The text before the cursor that says the shell is ready', 'user@pc: ~ $'],
          ['Linux', 'A free operating system that most servers and developer tools run on', 'Ubuntu is one version of it'],
          ['Distro', 'A packaged version of Linux ("distribution")', 'Ubuntu, Debian, Fedora'],
          ['WSL', 'Windows Subsystem for Linux: runs real Linux inside Windows', 'The Ubuntu you install in step 1.2'],
          ['IDE', 'Integrated development environment: an editor with extra tools for writing code', 'Antigravity'],
        ]}
      />

      <Section title="Files and folders" />
      <Table
        headers={headers}
        rows={[
          ['Directory', 'Another word for folder', 'Development'],
          ['Path', 'The address of a file or directory', '/home/anna/Development'],
          ['Absolute path', 'A full address that starts at the very top, with /', '/home/anna/notes.txt'],
          ['Relative path', 'An address measured from where you are now', 'notes.txt or ../Development'],
          ['Home (~)', 'Your personal folder, where your things live', '/home/anna, written as ~'],
          ['Root (/)', 'The very top of the whole file system', '/'],
          ['Hidden file', 'A file whose name starts with a dot. Hidden from normal listings', '.bashrc'],
          ['Extension', 'The ending of a file name that hints at its type', '.txt, .md, .json'],
        ]}
      />

      <Section title="Commands" />
      <Table
        headers={headers}
        rows={[
          ['Command', 'An instruction you type and run by pressing Enter', 'ls'],
          ['Argument', 'The thing a command acts on', 'In mkdir photos, the argument is photos'],
          ['Flag / option', 'A switch that changes how a command behaves. Starts with - or --', 'ls -l, rm -r, --help'],
          ['Output', 'What the command prints back to you', 'The list of files after ls'],
          ['Alias', 'A short nickname you create for a longer command', 'll for ls -lhX'],
        ]}
      />

      <Section title="Power and software" />
      <Table
        headers={headers}
        rows={[
          ['sudo', 'Run one command with administrator powers', 'sudo apt install tree'],
          ['Root user', 'The all-powerful administrator account. Not the same as the root directory /', 'What sudo temporarily borrows'],
          ['Package', 'A piece of software packaged for easy install', 'tree'],
          ['apt', 'The installer and updater for packages on Ubuntu', 'apt install'],
          ['Config file', 'A text file that controls how a program behaves', '.bashrc, .bash_aliases'],
        ]}
      />

      <Callout type="info" title="Two different roots">
        &quot;Root&quot; means two things in Linux: the top folder <code>/</code>, and the administrator user. Context
        tells you which one. When someone says &quot;run as root&quot; they mean the user. When they say &quot;the root
        of the file system&quot; they mean the folder.
      </Callout>

      <QuizSet title="Quick Vocabulary Check">
        <Quiz
          question="Which is an absolute path?"
          options={['notes.txt', '../Development', '/home/anna/notes.txt', 'Development/notes.txt']}
          correctIndex={2}
          explanation="An absolute path starts with / and is complete from the top of the file system."
        />
        <Quiz
          question="In the command ls -l, what is -l?"
          options={['A program', 'A flag that changes how ls behaves', 'A folder', 'An alias']}
          correctIndex={1}
          explanation="Flags (options) change a command's behaviour. -l asks ls for the long, detailed listing."
        />
        <Quiz
          question="What is WSL?"
          options={[
            'A text editor',
            'A way of running real Linux inside Windows',
            'A programming language',
            'A website',
          ]}
          correctIndex={1}
          explanation="Windows Subsystem for Linux gives you a real Linux terminal without leaving Windows."
        />
        <FillInQuiz
          question="Which symbol stands for your home directory?"
          answer="~"
          explanation="The tilde (~) is shorthand for your home directory."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The terminal is the window, the shell (Bash) is the program inside it that understands your commands.',
          'A path is an address. Absolute paths start at /, relative paths start from where you are.',
          'A command takes arguments (what to act on) and flags (how to act).',
          '"Root" can mean the top folder / or the administrator user. Context tells you which.',
        ]}
      />
    </div>
  );
}
