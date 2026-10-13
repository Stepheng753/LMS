import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CommandTable } from '../../../../components/content/CommandTable';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_1_Topic1() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Topic 1"
        title="Recap: Setup & Bash"
        summary="Your environment, the terminal, and every command you learned, with the mistakes to avoid."
      />

      <Section title="The big ideas" />
      <Table
        headers={['Idea', 'In one line', 'Step']}
        rows={[
          ['Terminal, shell, Bash', 'The window you type in, the program that reads it, and the shell language you use', '1.1'],
          ['WSL', 'Real Linux (Ubuntu) running inside Windows 11, with mirrored networking so localhost is shared', '1.2'],
          ['IDE', 'Antigravity: an editor with an AI helper, connected to WSL so the editor and terminal are in Linux', '1.3'],
          ['Agy', 'An AI helper in the terminal. You read what it proposes, and ask it to explain, before approving', '1.4'],
          ['The file system', 'A tree starting at /. Absolute paths start with /, relative paths start from where you are', '1.5'],
          ['Projects live in ~/Development', 'Inside Linux, never under /mnt/c', '1.3'],
          ['Commands, flags, arguments', 'A command acts on arguments, and flags (like -l, -r) change how', '1.1'],
          ['sudo and apt', 'Run one command as administrator. apt installs from Ubuntu\'s trusted catalogue', '1.9'],
          ['Aliases and config files', 'Nicknames for commands in ~/.bash_aliases, reloaded with source ~/.bashrc', '1.10'],
          ['Asking AI well', 'Paste the whole error, say what you were trying to do, ask it to explain', '1.0'],
        ]}
      />
      <Callout type="success" title="The most important idea">
        The terminal does exactly what you type. Almost every beginner problem is a typo, a missing space, a wrong
        folder, or a capital letter. When something fails: read the error, check where you are with <code>pwd</code> and{' '}
        <code>ls</code>, then ask with the full error.
      </Callout>

      <Section title="The commands" />
      <CommandTable
        title="Moving and looking"
        rows={[
          { command: 'pwd', description: 'Where am I?' },
          { command: 'ls / ls -l / ls -la', description: 'List files / with details / including hidden files' },
          { command: 'cd folder', description: 'Go into a folder' },
          { command: 'cd .. / cd ~ / cd -', description: 'Up one level / home / back to where you were' },
        ]}
      />
      <CommandTable
        title="Making and changing"
        rows={[
          { command: 'mkdir name / mkdir -p a/b/c', description: 'Make a folder / a whole chain' },
          { command: 'touch file', description: 'Make an empty file, or refresh its timestamp' },
          { command: 'cp a b / cp -r a b', description: 'Copy a file / a folder with everything in it' },
          { command: 'mv a b', description: 'Move or rename' },
          { command: 'rm file / rm -r folder / rmdir folder', description: 'Delete a file / a folder and contents (no undo!) / an empty folder' },
        ]}
      />
      <CommandTable
        title="Reading and writing"
        rows={[
          { command: 'cat / head -n 3 / tail -n 3', description: 'Show a file / the first lines / the last lines' },
          { command: 'echo "x" > file', description: 'Write text, replacing the file' },
          { command: 'echo "x" >> file', description: 'Add text to the end' },
          { command: 'nano file', description: 'Edit. Ctrl+O then Enter saves, Ctrl+X exits' },
        ]}
      />
      <CommandTable
        title="Software and shell"
        rows={[
          { command: 'sudo apt update && sudo apt upgrade -y', description: 'Refresh and install updates' },
          { command: 'sudo apt install name', description: 'Install a package' },
          { command: 'source ~/.bashrc', description: 'Reload your shell settings now' },
          { command: 'Tab, ↑, Ctrl+C, clear, --help, man', description: 'Autocomplete, history, stop, clear, help, manual' },
        ]}
      />
      <Table
        headers={['Nano key', 'Does']}
        rows={[
          ['Ctrl+O, Enter', 'Save'],
          ['Ctrl+X', 'Exit'],
          ['Ctrl+W', 'Search'],
          ['Ctrl+K / Ctrl+U', 'Cut a line / paste it'],
          ['Alt+U', 'Undo'],
          ['Right-click or Ctrl+Shift+V', 'Paste into the terminal'],
        ]}
      />

      <Section title="Mistakes to avoid" />
      <Table
        headers={['Mistake', 'What happens', 'Fix']}
        rows={[
          ['Spaces in names', 'mkdir my project makes two folders', 'Use dashes or underscores'],
          ['rm without looking', 'Permanent deletion. There is no trash', 'ls first, and back up'],
          ['> instead of >>', 'Replaces the file instead of adding to it', 'Check which one you meant'],
          ['Plain Ctrl+V in the terminal', 'Nothing happens', 'Right-click or Ctrl+Shift+V'],
          ['Forgetting the invisible password', 'You think the terminal is frozen', 'Type it anyway and press Enter'],
          ['Projects under /mnt/c', 'Slow, with permission trouble', 'Keep them in ~/Development'],
          ['Pasting a script you did not read', 'It runs with all your permissions', 'Read it, or ask your AI helper to explain it'],
        ]}
      />

      <Collapsible title="Rapid recall: cover the answers and say them aloud">
        <ul className="list-disc pl-5 space-y-1">
          <li>How do you see hidden files? <em>ls -la</em></li>
          <li>How do you go back to the folder you were just in? <em>cd -</em></li>
          <li>What does the dot mean in a path? <em>"here". Two dots mean "one level up"</em></li>
          <li>How do you write several lines into a file? <em>Open it with nano</em></li>
          <li>What loads your aliases after you edit them? <em>source ~/.bashrc</em></li>
        </ul>
      </Collapsible>

      <QuizSet title="Topic 1 Quick Check">
        <Quiz
          question="Which command shows hidden files?"
          options={['ls', 'ls -l', 'ls -la', 'pwd']}
          correctIndex={2}
          explanation="-a means all, which includes files starting with a dot."
        />
        <Quiz
          question="What does mkdir -p projects/site/images do?"
          options={['Fails if projects does not exist', 'Creates the whole chain of folders', 'Deletes the folders', 'Prints the path']}
          correctIndex={1}
          explanation="-p creates any missing parent folders as well."
        />
        <Quiz
          question="How do you rename a file?"
          options={['rename a b', 'mv a b', 'cp a b', 'touch a b']}
          correctIndex={1}
          explanation="Moving to a new name in the same place is renaming."
        />
        <Quiz
          question="Why is rm -r dangerous?"
          options={['It is slow', 'There is no trash can, so deletion is permanent', 'It needs sudo', 'It only works on files']}
          correctIndex={1}
          explanation="Check with ls first, and keep backups."
        />
        <Quiz
          question="How do you save and exit in nano?"
          options={['Ctrl+S, Ctrl+Q', 'Ctrl+O then Enter, then Ctrl+X', 'Esc, :wq', 'Alt+F4']}
          correctIndex={1}
          explanation="Ctrl+O writes the file out, Ctrl+X exits."
        />
        <Quiz
          question="What is the difference between sudo apt update and sudo apt install tree?"
          options={['None', 'update refreshes the list of packages, install adds one', 'update installs everything', 'install refreshes the list']}
          correctIndex={1}
          explanation="update only refreshes the catalogue. install adds a specific package."
        />
        <Quiz
          question="You edited .bash_aliases. How do you use the new alias in the current terminal?"
          options={['Reboot Windows', 'source ~/.bashrc', 'Reinstall Ubuntu', 'Nothing, it is automatic']}
          correctIndex={1}
          explanation="Bash only reads its config at startup, so source re-reads it now."
        />
        <FillInQuiz
          question="Which symbol stands for your home directory?"
          answer="~"
          explanation="The tilde is shorthand for your home directory."
        />
      </QuizSet>

      <Section title="Can you...?" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Open an Ubuntu terminal and say what the prompt is telling you?</li>
        <li>Check that WSL networking is mirrored?</li>
        <li>Create a nested set of folders and files, move and copy them, then delete them safely?</li>
        <li>Edit and save a file in nano, and write a file with echo?</li>
        <li>Install a package with apt and explain what sudo does?</li>
        <li>Add an alias, reload your shell, and use it?</li>
        <li>Ask Agy for help, and read its proposal before you approve?</li>
      </ul>
      <p>If any of these made you hesitate, go back to the matching step (the table above gives the step numbers).</p>

      <KeyTakeaways
        items={[
          'WSL gives you real Linux inside Windows. Your IDE connects to it, and projects live in ~/Development.',
          'Know the core commands: pwd, ls, cd, mkdir, touch, cp, mv, rm, cat, head, tail, echo, nano.',
          'The terminal is literal. Read errors, check where you are, and ask with the full message.',
          'rm is permanent and > replaces. Check before you press Enter.',
          'Aliases and config files live in your home folder and are reloaded with source.',
        ]}
      />
    </div>
  );
}
