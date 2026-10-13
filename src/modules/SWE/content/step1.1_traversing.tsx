import { StepHeader } from '../../../components/content/StepHeader';
import { Section } from '../../../components/content/Section';
import { CodeBlock } from '../../../components/content/CodeBlock';
import { Callout } from '../../../components/content/Callout';
import { TerminalBlock } from '../../../components/content/TerminalBlock';
import { Quiz } from '../../../components/content/Quiz';
import { Tabs } from '../../../components/content/Tabs';
import { FileTree } from '../../../components/content/FileTree';
import { Exercise } from '../../../components/content/Exercise';
import { KeyTakeaways } from '../../../components/content/KeyTakeaways';

export default function Step1_1_Traversing() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.1 • File System Navigation"
        title="Traversing the File System"
        summary="Navigate the inverted tree of the Unix filesystem using relative paths, absolute paths, and listing flags."
      />

      <p>
        In Unix-like systems, the filesystem is a single inverted tree starting from the root directory{' '}
        <code>/</code>. Whether you are on Linux, macOS, or WSL,
        mastering movement commands is essential.
      </p>

      <Section title="1. Absolute vs Relative Paths" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3 text-sm">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-primary mb-1">Absolute Paths</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Always begins with a forward slash <code className="font-mono">/</code>. Describes the full location from the system root.
          </p>
          <div className="mt-2 font-mono text-xs text-foreground/80 bg-background p-2 rounded border border-border">
            /var/log/nginx/access.log
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-primary mb-1">Relative Paths</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Evaluated relative to your present working directory. Uses <code className="font-mono">.</code> (current) or <code className="font-mono">..</code> (parent).
          </p>
          <div className="mt-2 font-mono text-xs text-foreground/80 bg-background p-2 rounded border border-border">
            ../config/settings.json
          </div>
        </div>
      </div>

      <FileTree
        title="Example project"
        tree={[
          {
            name: 'home',
            children: [
              {
                name: 'developer',
                note: 'your home directory (~)',
                children: [
                  { name: 'workspace', note: 'you are here', children: [{ name: 'README.md' }, { name: 'package.json' }, { name: 'src', children: [{ name: 'components', children: [{ name: 'App.tsx' }] }, { name: 'index.ts' }] }, { name: 'scripts', children: [{ name: 'build.sh' }] }, { name: 'notes.py' }] },
                  { name: '.bashrc', note: 'shell settings' },
                ],
              },
            ],
          },
        ]}
      />

      <Section title="2. Inspecting Contents with ls" />
      <p>
        The <code className="font-mono text-xs bg-muted px-1 rounded">ls</code> command lists directory contents. Adding common flags reveals permissions, sizes, and hidden files:
      </p>

      <TerminalBlock
        command="ls -la"
        output="drwxr-xr-x 4 developer developer 4096 Oct 12 21:00 .&#10;drwxr-xr-x 8 developer developer 4096 Oct 12 20:30 ..&#10;-rw-r--r-- 1 developer developer  240 Oct 12 21:00 .gitignore&#10;-rw-r--r-- 1 developer developer 1450 Oct 12 21:05 README.md"
      />

      <Callout type="tip" title="Shortcut Navigation">
        Typing <code className="font-mono text-xs bg-amber-100 px-1 py-0.5 rounded">cd ~</code> takes you to your user home directory, and <code className="font-mono text-xs bg-amber-100 px-1 py-0.5 rounded">cd -</code> toggles back to your previous directory.
      </Callout>

      <CodeBlock
        language="bash"
        title="Common Navigation Commands"
        code={`# Jump to parent directory
cd ..

# Jump to grandparent directory
cd ../..

# Move to root of the filesystem
cd /

# Return to previous directory
cd -`}
      />

      <Section title="3. Opening a Terminal" />
      <Tabs
        tabs={[
          { label: 'Linux', content: <p>Press <code>Ctrl + Alt + T</code>, or search for &quot;Terminal&quot;.</p> },
          { label: 'macOS', content: <p>Press <code>Cmd + Space</code>, type &quot;Terminal&quot; and hit Enter.</p> },
          {
            label: 'Windows (WSL)',
            content: (
              <>
                <p>Install WSL once from PowerShell, then open the Ubuntu app:</p>
                <TerminalBlock command="wsl --install" path={'PS C:\\Users\\developer'} />
              </>
            ),
          },
        ]}
      />

      <Exercise
        title="Go to /var/log and come back"
        hint={<p>Use an absolute path to go there, and a dash to return.</p>}
        solution={
          <TerminalBlock
            lines={[
              { command: 'cd /var/log', path: '~' },
              { command: 'pwd', output: '/var/log', path: '/var/log' },
              { command: 'cd -', output: '/home/developer', path: '/var/log' },
            ]}
          />
        }
      >
        <p>From your home directory, move into <code>/var/log</code> using an absolute path, then jump straight back to where you were.</p>
      </Exercise>

      <Quiz
        question="What does the '.' (single dot) directory represent in Unix?"
        options={[
          'The parent directory',
          'The current working directory',
          'The system root directory',
          'The user home directory',
        ]}
        correctIndex={1}
        explanation="'.' represents the current directory, whereas '..' represents the parent directory."
      />

      <KeyTakeaways
        items={[
          'Absolute paths start from root (/), whereas relative paths start from your current directory.',
          "'ls -la' shows hidden files (starting with '.') along with timestamps and file sizes in long listing format.",
          "'cd -' is an indispensable shortcut for jumping back to the previous folder.",
        ]}
      />
    </div>
  );
}
