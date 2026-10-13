import { StepHeader } from '../../../components/content/StepHeader';
import { Section } from '../../../components/content/Section';
import { CodeBlock } from '../../../components/content/CodeBlock';
import { Callout } from '../../../components/content/Callout';
import { TerminalBlock } from '../../../components/content/TerminalBlock';
import { Quiz } from '../../../components/content/Quiz';
import { Table } from '../../../components/content/Table';
import { Formula } from '../../../components/content/Formula';
import { Compare } from '../../../components/content/Compare';
import { Exercise } from '../../../components/content/Exercise';
import { KeyTakeaways } from '../../../components/content/KeyTakeaways';

export default function Step1_2_Directories() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.2 • Directory & File Management"
        title="Managing Directories & Permissions"
        summary="Create, move, copy, remove files and directories, and configure POSIX read/write/execute permissions."
      />

      <p>
        A developer continuously organizes codebases, manages build output folders, and secures configuration files.
        Knowing how to safely create, copy, move, and permission files is foundational.
      </p>

      <Section title="1. Creating Nested Structures" />
      <p>
        Use <code className="font-mono text-xs bg-muted px-1 rounded">mkdir -p</code> to create nested directory trees in a single command without failing if parent folders do not exist yet.
      </p>

      <TerminalBlock
        command="mkdir -p src/modules/SWE/content && touch src/modules/SWE/content/index.ts"
        output="[Created directory tree and empty file]"
      />

      <Section title="2. Copying and Moving (cp and mv)" />
      <p>
        <code className="font-mono text-xs bg-muted px-1 rounded">cp -r</code> performs recursive directory copying, while <code className="font-mono text-xs bg-muted px-1 rounded">mv</code> renames or relocates items.
      </p>

      <CodeBlock
        language="bash"
        title="File & Directory Operations"
        code={`# Copy a directory recursively
cp -r src/components src/components_backup

# Move/rename a file
mv old_name.ts new_name.ts

# Remove empty directory
rmdir temp_dir

# Remove directory and its contents recursively (use caution!)
rm -rf temp_build/`}
      />

      <Callout type="warning" title="Irreversible Deletions">
        In Linux and bash, <code className="font-mono text-xs bg-red-100 px-1 py-0.5 rounded">rm -rf</code> does not send items to a trash bin; files are unlinked and cannot be easily recovered.
      </Callout>

      <Section title="3. Understanding Permissions (chmod)" />
      <p>
        Every Unix file assigns read (r=4), write (w=2), and execute (x=1) permissions to Owner, Group, and Others.
      </p>

      <CodeBlock
        language="bash"
        title="Setting File Permissions"
        code={`# Make a script executable for the owner
chmod +x build.sh

# Grant Read/Write/Execute to owner (7), Read/Execute to others (55)
chmod 755 deploy.sh`}
      />

      <Formula
        label="Octal permission digit"
        where={[
          { symbol: 'r', meaning: 'read = 4' },
          { symbol: 'w', meaning: 'write = 2' },
          { symbol: 'x', meaning: 'execute = 1' },
        ]}
      >
        rwx = 4 + 2 + 1 = 7
      </Formula>

      <Table
        caption="Common chmod modes"
        headers={['Mode', 'Owner', 'Group', 'Others', 'Typical use']}
        rows={[
          [<code key="a">755</code>, 'rwx', 'r-x', 'r-x', 'Scripts and programs'],
          [<code key="b">644</code>, 'rw-', 'r--', 'r--', 'Regular files'],
          [<code key="c">600</code>, 'rw-', '---', '---', 'Private keys'],
        ]}
      />

      <Compare
        goodLabel="Safer"
        badLabel="Risky"
        good={<TerminalBlock command="chmod 600 ~/.ssh/id_rsa" />}
        bad={<TerminalBlock command="chmod 777 ~/.ssh/id_rsa" />}
      />

      <Exercise
        title="Make a script runnable"
        hint={<p>You only need the execute bit for the owner.</p>}
        solution={<TerminalBlock command="chmod u+x build.sh && ./build.sh" />}
      >
        <p>You wrote <code>build.sh</code> but get &quot;Permission denied&quot; when you run it. Fix the permissions and run it.</p>
      </Exercise>

      <Quiz
        question="Which flag allows 'mkdir' to create parent directories along the path if they do not exist?"
        options={['-r', '-f', '-p', '-a']}
        correctIndex={2}
        explanation="The '-p' flag (parents) creates any missing intermediate directories."
      />

      <KeyTakeaways
        items={[
          "'mkdir -p' safely generates full nested path hierarchies.",
          "'mv' acts both as a file mover and a file rename utility.",
          "'chmod +x' grants execution permissions, essential for bash automation scripts.",
        ]}
      />
    </div>
  );
}
