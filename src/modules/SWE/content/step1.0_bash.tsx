import { StepHeader } from '../../../components/content/StepHeader';
import { Section } from '../../../components/content/Section';
import { CodeBlock } from '../../../components/content/CodeBlock';
import { Callout } from '../../../components/content/Callout';
import { TerminalBlock } from '../../../components/content/TerminalBlock';
import { Quiz, MultiSelectQuiz, FillInQuiz, QuizSet } from '../../../components/content/Quiz';
import { Tabs } from '../../../components/content/Tabs';
import { Term } from '../../../components/content/Term';
import { Compare } from '../../../components/content/Compare';
import { CommandTable } from '../../../components/content/CommandTable';
import { Collapsible } from '../../../components/content/Collapsible';
import { Steps } from '../../../components/content/Steps';
import { KeyTakeaways } from '../../../components/content/KeyTakeaways';

export default function Step1_0_Bash() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.0 • Command Line Fundamentals"
        title="Mastering the Bash Terminal"
        summary="Understand the UNIX shell philosophy, standard input/output streams, and running essential commands."
      />

      <p>
        The Bash (Bourne Again SHell) terminal is the primary interface between developers and the operating system.
        Unlike graphical user interfaces, the shell offers powerful automation, remote execution, and composable pipelines.
      </p>

      <p>
        When you type a command, a program called the{' '}
        <Term definition="A program that reads the commands you type, runs them, and prints the results.">shell</Term>{' '}
        interprets it. Hover over dotted words like this one in any lesson for a quick definition.
      </p>

      <Section title="1. Your Identity & Where You Are" />
      <p>
        Two fundamental commands tell you who you are and where you are situated in the system hierarchy:
      </p>

      <TerminalBlock
        command="whoami && pwd"
        output="developer&#10;/home/developer/workspace"
      />

      <Callout type="tip" title="Shell Composition">
        The <code>&&</code> operator executes the second command only if the first command succeeds with exit code 0.
      </Callout>

      <Section title="2. Standard Streams & Redirection" />
      <p>
        In Unix, everything is treated as a stream or a file. Programs communicate via three standard descriptors:
      </p>
      <ul>
        <li><strong>stdin (0)</strong>: Standard input (keyboard / stream input)</li>
        <li><strong>stdout (1)</strong>: Standard output (default terminal print)</li>
        <li><strong>stderr (2)</strong>: Standard error (error diagnostics)</li>
      </ul>

      <CodeBlock
        language="bash"
        title="Redirection Examples"
        code={`# Write output to a new file (overwriting)
echo "System initialized" > boot.log

# Append output to an existing file
echo "Service healthy" >> boot.log

# View file content
cat boot.log`}
      />

      <p>
        The same idea exists in every language. Here is writing then appending to a file in three of them:
      </p>
      <Tabs
        tabs={[
          {
            label: 'Bash',
            content: (
              <CodeBlock language="bash" title="notes.sh" code={`echo "first line" > notes.txt
echo "second line" >> notes.txt`} />
            ),
          },
          {
            label: 'Python',
            content: (
              <CodeBlock language="python" title="notes.py" code={`# "w" overwrites, "a" appends
with open("notes.txt", "w") as f:
    f.write("first line\\n")

with open("notes.txt", "a") as f:
    f.write("second line\\n")`} />
            ),
          },
          {
            label: 'Java',
            content: (
              <CodeBlock language="java" title="Notes.java" code={`import java.io.FileWriter;
import java.io.IOException;

public class Notes {
    public static void main(String[] args) throws IOException {
        // The boolean flag chooses append (true) or overwrite (false)
        try (FileWriter out = new FileWriter("notes.txt", false)) {
            out.write("first line\\n");
        }
        try (FileWriter out = new FileWriter("notes.txt", true)) {
            out.write("second line\\n");
        }
    }
}`} />
            ),
          },
        ]}
      />

      <Section title="3. Quoting Paths with Spaces" />
      <p>
        The shell splits input on spaces, so a path that contains one must be wrapped in quotes.
      </p>
      <Compare
        good={
          <>
            <TerminalBlock command={'cd "My Projects"'} />
            <p>Quotes keep the name together as one argument.</p>
          </>
        }
        bad={
          <>
            <TerminalBlock command="cd My Projects" output="bash: cd: too many arguments" />
            <p>Without quotes, Bash sees two separate arguments.</p>
          </>
        }
      />

      <Section title="4. Your First Session" />
      <Steps
        steps={[
          { title: 'Open a terminal', children: <p>Use your OS terminal app, or WSL on Windows.</p> },
          {
            title: 'Find out where you are',
            children: <TerminalBlock command="pwd" output="/home/developer" />,
          },
          {
            title: 'Create and read a file',
            children: (
              <TerminalBlock
                lines={[
                  { command: 'echo "hello" > note.txt', path: '~' },
                  { command: 'cat note.txt', output: 'hello', path: '~' },
                ]}
              />
            ),
          },
        ]}
      />

      <CommandTable
        title="Commands So Far"
        rows={[
          { command: 'whoami', description: 'Print the current user', example: 'whoami' },
          { command: 'pwd', description: 'Print the working directory', example: 'pwd' },
          { command: 'echo', description: 'Print text (or write it to a file)', example: 'echo hi > a.txt' },
          { command: 'cat', description: 'Print a file\'s contents', example: 'cat a.txt' },
        ]}
      />

      <Collapsible title="Why is it called &quot;Bourne Again&quot; SHell?">
        <p>
          It is a pun on the original Unix shell written by Stephen Bourne, <code>sh</code>. Bash was created as a free
          replacement for it and is now the default on most Linux systems.
        </p>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Which command prints the present working directory in Bash?"
          options={['whoami', 'pwd', 'dir', 'path']}
          correctIndex={1}
          explanation="'pwd' stands for Print Working Directory and outputs the absolute path to your current location."
        />
        <MultiSelectQuiz
          question="Which of these are standard streams?"
          options={['stdin', 'stdout', 'stdlog', 'stderr']}
          correctIndexes={[0, 1, 3]}
          explanation="Unix defines stdin (0), stdout (1) and stderr (2)."
        />
        <FillInQuiz
          question="Which operator appends output to the end of a file instead of overwriting it?"
          answer={['>>', '>> file']}
          placeholder="Type the operator"
          explanation="'>>' appends, while '>' overwrites."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Bash is a command interpreter and scripting language powering modern developer workflows.',
          "'whoami' reveals the current user context, while 'pwd' reports the current directory.",
          "Use '>' to write/overwrite output to a file and '>>' to append.",
        ]}
      />
    </div>
  );
}
