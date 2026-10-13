import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { CommandTable } from '../../../../components/content/CommandTable';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_12_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.12 • Reference"
        title="Topic 1 Cheat Sheet"
        summary="Everything from setup and Bash on one page. Bookmark it."
      />

      <Section title="Move around" />
      <CommandTable
        rows={[
          { command: 'pwd', description: 'Where am I?', example: 'pwd' },
          { command: 'ls', description: 'List what is here', example: 'ls' },
          { command: 'ls -l', description: 'List with details', example: 'ls -l' },
          { command: 'ls -la', description: 'Details, including hidden files', example: 'ls -la' },
          { command: 'cd folder', description: 'Go into a folder', example: 'cd Development' },
          { command: 'cd ..', description: 'Go up one level', example: 'cd ..' },
          { command: 'cd ~', description: 'Go home', example: 'cd ~' },
          { command: 'cd -', description: 'Go back to the last folder', example: 'cd -' },
        ]}
      />

      <Section title="Make, copy, move, delete" />
      <CommandTable
        rows={[
          { command: 'mkdir name', description: 'Make a folder', example: 'mkdir notes' },
          { command: 'mkdir -p a/b/c', description: 'Make a chain of folders', example: 'mkdir -p a/b/c' },
          { command: 'touch file', description: 'Make an empty file (or refresh its time)', example: 'touch todo.txt' },
          { command: 'cp a b', description: 'Copy a file', example: 'cp a.txt b.txt' },
          { command: 'cp -r a b', description: 'Copy a folder', example: 'cp -r docs docs2' },
          { command: 'mv a b', description: 'Move or rename', example: 'mv old.txt new.txt' },
          { command: 'rm file', description: 'Delete a file. No undo', example: 'rm old.txt' },
          { command: 'rm -r folder', description: 'Delete a folder and contents. No undo', example: 'rm -r old' },
          { command: 'rmdir folder', description: 'Delete an empty folder', example: 'rmdir old' },
        ]}
      />

      <Section title="Read and write files" />
      <CommandTable
        rows={[
          { command: 'cat file', description: 'Show a whole file', example: 'cat notes.txt' },
          { command: 'head -n 3 file', description: 'Show the first 3 lines', example: 'head -n 3 notes.txt' },
          { command: 'tail -n 3 file', description: 'Show the last 3 lines', example: 'tail -n 3 notes.txt' },
          { command: 'echo "x" > file', description: 'Write text, replacing the file', example: 'echo "hi" > a.txt' },
          { command: 'echo "x" >> file', description: 'Add text to the end of the file', example: 'echo "hi" >> a.txt' },
          { command: 'nano file', description: 'Edit a file in the terminal', example: 'nano notes.txt' },
          { command: 'tree', description: 'Draw a folder as a picture (after installing it)', example: 'tree playground' },
        ]}
      />

      <Section title="Install and update" />
      <CommandTable
        rows={[
          { command: 'sudo apt update', description: 'Refresh the package list' },
          { command: 'sudo apt upgrade', description: 'Update installed packages' },
          { command: 'sudo apt install x', description: 'Install a package', example: 'sudo apt install tree' },
          { command: 'sudo apt remove x', description: 'Uninstall a package', example: 'sudo apt remove tree' },
        ]}
      />

      <Section title="Nano keys" />
      <CommandTable
        title="^ is Ctrl, M- is Alt"
        rows={[
          { command: 'Ctrl+O, Enter', description: 'Save' },
          { command: 'Ctrl+X', description: 'Exit' },
          { command: 'Ctrl+G', description: 'Help' },
          { command: 'Ctrl+W', description: 'Search (again for the next match)' },
          { command: 'Ctrl+\\', description: 'Search and replace' },
          { command: 'Ctrl+K / Ctrl+U', description: 'Cut line / paste' },
          { command: 'Ctrl+6, Alt+6', description: 'Start selecting / copy the selection' },
          { command: 'Alt+U / Alt+E', description: 'Undo / redo' },
          { command: 'Ctrl+A / Ctrl+E', description: 'Start / end of line' },
          { command: 'Ctrl+Y / Ctrl+V', description: 'Page up / down' },
          { command: 'Ctrl+_', description: 'Go to line number' },
          { command: 'Ctrl+C', description: 'Show cursor position' },
          { command: 'Alt+#', description: 'Toggle line numbers' },
        ]}
      />

      <Section title="Terminal survival" />
      <CommandTable
        rows={[
          { command: 'Tab', description: 'Auto-complete a name' },
          { command: '↑ / ↓', description: 'Previous / next command' },
          { command: 'Ctrl+C', description: 'Stop the running command' },
          { command: 'Ctrl+L or clear', description: 'Clear the screen' },
          { command: 'cmd --help', description: 'Quick help for a command', example: 'ls --help' },
          { command: 'man cmd', description: 'Full manual (q to quit)', example: 'man ls' },
          { command: 'Right-click / Ctrl+Shift+V', description: 'Paste into the terminal' },
        ]}
      />

      <Section title="WSL and shell setup" />
      <CommandTable
        rows={[
          { command: 'wsl --shutdown', description: 'Restart WSL fully (PowerShell)' },
          { command: 'wsl --update', description: 'Update WSL itself (PowerShell)' },
          { command: 'wslinfo --networking-mode', description: 'Should print "mirrored" (Ubuntu)' },
          { command: 'source ~/.bashrc', description: 'Reload your shell settings now' },
          { command: 'agy', description: 'Start your AI terminal helper' },
        ]}
      />

      <Section title="Your aliases" />
      <CommandTable
        rows={[
          { command: 'cls / CLS / cls2', description: 'clear the screen' },
          { command: 'll', description: 'Detailed, readable list' },
          { command: 'la', description: 'Same, with hidden files' },
          { command: 'py', description: 'python3 (for later)' },
          { command: 'gs / ga / gc', description: 'git status / add / commit -m (for later)' },
        ]}
      />

      <Callout type="warning" title="When something goes wrong">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Read the error. It usually names the problem (&quot;No such file&quot;, &quot;Permission denied&quot;).</li>
          <li>Check spelling, spaces and capitals. Linux is case-sensitive.</li>
          <li>Run <code>pwd</code> and <code>ls</code> to confirm where you are.</li>
          <li>Copy the whole error, add what you were trying to do, and ask Agy or your AI helper to explain.</li>
        </ol>
      </Callout>

      <KeyTakeaways
        items={[
          'pwd, ls, cd: where am I, what is here, move.',
          'mkdir, touch, cp, mv: build and reorganise. rm: delete, with no undo.',
          'nano: Ctrl+O saves, Ctrl+X exits.',
          'Tab completes, ↑ repeats, Ctrl+C stops, and --help explains.',
          'When stuck: read the error, check where you are, and ask with the full message.',
        ]}
      />
    </div>
  );
}
