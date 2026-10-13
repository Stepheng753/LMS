import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Term } from '../../../../components/content/Term';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.0 • Start Here"
        title="Welcome & How to Learn Here"
        summary="What you are about to learn, why it starts with a black window full of text, and how to use an AI helper along the way."
      />

      <p>
        By the end of this track you will be able to plan and build real software with the help of AI, which is often
        called <em>vibe coding</em>, and to do it with good structure so that what you build keeps working. Nobody
        becomes good at that by memorising code. It starts with being comfortable on a computer the way developers use
        one, and that is what Topic 1 is for.
      </p>

      <Section title="The road ahead" />
      <Table
        headers={['Topic', 'What you will be able to do']}
        rows={[
          ['1 · Setup + Bash', 'Set up a developer machine and move around it confidently using text commands'],
          ['2 · File architecture + spec-driven design', 'Organise a project and describe what you want built before building it'],
          ['3 · Homelab + pipelines', 'Run your own small server and automate how your work gets published'],
          ['4 · External APIs', 'Connect your software to other services on the internet'],
          ['5 · Autonomous agents', 'Put AI to work on multi-step tasks on its own'],
        ]}
      />
      <p>
        This step covers the whole of Topic 1. It is the foundation for everything after it, so we go slowly here.
      </p>

      <Section title="Why a terminal?" />
      <p>
        A <Term definition="A window where you type instructions to the computer instead of clicking.">terminal</Term>{' '}
        is a window where you type instructions instead of clicking. It looks old-fashioned, but nearly every
        developer tool, server and AI coding assistant is controlled this way. Typing gives you precision, speed and
        the ability to repeat or automate anything you have done once.
      </p>

      <Callout type="success" title="You cannot break the computer here">
        Everything in this course happens inside a Linux environment that lives alongside Windows. If you make a mess
        inside it, the worst case is that you delete your own practice files. Your Windows files, photos and documents
        are not touched. Experiment freely.
      </Callout>

      <Section title="Your AI helper" />
      <p>
        You are not meant to memorise this. You will always have an AI model open next to this course, and the
        skill that matters is asking it well. When something goes wrong, which it will, the following routine works
        almost every time.
      </p>
      <Steps
        steps={[
          { title: 'Copy the whole error', children: <p>Select the text in the terminal and copy all of it, not just the last line.</p> },
          { title: 'Say what you were trying to do', children: <p>One sentence is enough: &quot;I was trying to create a folder inside Development.&quot;</p> },
          { title: 'Say what you expected, and what happened instead', children: <p>This helps the AI spot the gap between the two.</p> },
          { title: 'Ask it to explain, not just fix', children: <p>&quot;Explain what went wrong in simple words, then give me the fix.&quot; This is how you learn.</p> },
        ]}
      />

      <Compare
        goodLabel="Helpful question"
        badLabel="Vague question"
        good={
          <p>
            &quot;I typed <code>cd Documnets</code> and got &apos;No such file or directory&apos;. I wanted to go into my
            Documents folder. What did I do wrong?&quot;
          </p>
        }
        bad={<p>&quot;It doesn&apos;t work, help&quot;</p>}
      />

      <Callout type="tip" title="Typos are the number one problem">
        Most beginner errors are a missing space, a capital letter that should be lowercase, or a spelling slip. The
        terminal is literal: it does exactly what you type, not what you meant.
      </Callout>

      <Quiz
        question="When a command fails, what is the best first move?"
        options={[
          'Close the terminal and start over',
          'Copy the full error message and ask your AI helper to explain it',
          'Retype the same command faster',
          'Assume the computer is broken',
        ]}
        correctIndex={1}
        explanation="The error message contains the clues. Pasting it in whole, with what you were trying to do, is the fastest way to get a useful answer."
      />

      <KeyTakeaways
        items={[
          'Topic 1 is about being comfortable at a terminal. Everything later builds on it.',
          'The terminal does exactly what you type, so small typos matter.',
          'Practising inside this environment cannot damage your Windows files.',
          'Ask the AI helper with the full error plus what you were trying to do, and ask it to explain.',
        ]}
      />
    </div>
  );
}
