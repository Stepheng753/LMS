import { StepHeader } from '../../../../components/content/StepHeader';
import { Callout } from '../../../../components/content/Callout';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_16_CheckpointB() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Exam B"
        title="Checkpoint Exam B: Topics 4 and 5"
        summary="Twelve questions on APIs, AI cost, agents and safety."
      />
      <Callout type="tip" title="How to take it">
        Cover the lesson notes and answer from memory. Count your score at the end. Under 8 of 12 means reread the recap
        steps named in the explanations, then retake it tomorrow.
      </Callout>
      <QuizSet title="Checkpoint Exam B: Topics 4 and 5">
        <Quiz
          question="Why use a DNS-01 challenge for certificates?"
          options={["It's faster", "Your server is private so Let's Encrypt can't connect to it", "It's free of charge only here", "It avoids DNS"]}
          correctIndex={1}
          explanation="Adding a DNS record proves ownership without inbound access."
        />
        <Quiz
          question="What does `needs: test` do in a workflow?"
          options={['Skips tests', 'Deploy waits for tests and is skipped on failure', 'Runs twice', 'Nothing']}
          correctIndex={1}
          explanation="Bad code never deploys."
        />
        <Quiz
          question="Best way to undo a bad deploy?"
          options={['Delete the repo', 'git revert HEAD and push', 'Edit files on the server by hand', 'Reboot']}
          correctIndex={1}
          explanation="A new commit that undoes the change, then the pipeline deploys it."
        />
        <Quiz
          question="What's special about OAuth?"
          options={["No keys at all", "A person grants limited access to their own account", "It is only for AI", "It's a database"]}
          correctIndex={1}
          explanation="The user stays in control of what you can see."
        />
        <Quiz
          question="Where is an AI API key allowed to be used?"
          options={['Frontend', 'Backend only', 'Browser console', 'URL']}
          correctIndex={1}
          explanation="Anything in the browser is public."
        />
        <Quiz
          question="You test a new AI loop. Which model?"
          options={['The most expensive', 'The cheapest that works', 'None', 'Random']}
          correctIndex={1}
          explanation="A bug costs cents instead of dollars."
        />
        <Quiz
          question="What is the point of a cost cap in your own app?"
          options={['Speed', 'Stops runaway spending from loops and bugs', 'Quality', 'Security of keys']}
          correctIndex={1}
          explanation="It's a seatbelt, with provider limits as the second."
        />
        <Quiz
          question="What is prompt injection?"
          options={['A database attack', 'Hostile instructions hidden in content an agent reads', 'A type of prompt template', 'A syntax error']}
          correctIndex={1}
          explanation="Treat everything an agent reads as untrusted."
        />
        <Quiz
          question="Safest first permission for a new agent?"
          options={['Admin', 'Read-only on one folder', 'All accounts', 'Root']}
          correctIndex={1}
          explanation="Start narrow."
        />
        <Quiz
          question="Why a dedicated unprivileged user for an agent?"
          options={["Style", "To limit what it can touch if it misbehaves", "Faster", "It's required by Ollama"]}
          correctIndex={1}
          explanation="Least privilege."
        />
        <Quiz
          question="Main trade-off of a local open model?"
          options={['Always worse', 'Privacy and no per-token bill, but you need hardware and quality may be lower', 'Costs more', 'No setup']}
          correctIndex={1}
          explanation="Control for convenience."
        />
        <Quiz
          question="The agent keeps ignoring your standards. Best fix?"
          options={['Repeat yourself', 'Improve the rule or skill that should prevent it', 'Change AI', 'Give up']}
          correctIndex={1}
          explanation="Fix the instruction once; it applies forever."
        />
      </QuizSet>
      <KeyTakeaways
        items={[
          'A wrong answer is a map to the step you should reread.',
          'Retake it after a day. Spaced repetition makes it stick.',
        ]}
      />
    </div>
  );
}
