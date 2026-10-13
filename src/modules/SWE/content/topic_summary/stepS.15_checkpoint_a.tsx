import { StepHeader } from '../../../../components/content/StepHeader';
import { Callout } from '../../../../components/content/Callout';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_15_CheckpointA() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Exam A"
        title="Checkpoint Exam A: Topics 1 to 3"
        summary="Twelve questions on the terminal, the app and your homelab. No peeking."
      />
      <Callout type="tip" title="How to take it">
        Cover the lesson notes and answer from memory. Count your score at the end. Under 8 of 12 means reread the recap
        steps named in the explanations, then retake it tomorrow.
      </Callout>
      <QuizSet title="Checkpoint Exam A: Topics 1 to 3">
        <Quiz
          question="You type `rm -r photos` by mistake. What is the situation?"
          options={['It goes to the recycle bin', 'It is deleted permanently', 'It needs sudo', 'Nothing happens']}
          correctIndex={1}
          explanation="There is no trash in the terminal. Deletion is permanent, so check first and keep backups."
        />
        <Quiz
          question="What does `mkdir -p a/b/c` do when `a` does not exist?"
          options={['Fails', 'Creates a, b and c', 'Creates only c', 'Creates only a']}
          correctIndex={1}
          explanation="-p makes the missing parents."
        />
        <Quiz
          question="Which file holds your aliases?"
          options={['~/.bash_aliases', '/etc/hosts', '~/.ssh/config', 'package.json']}
          correctIndex={0}
          explanation="And source ~/.bashrc loads them."
        />
        <Quiz
          question="A request has no body and just asks for data. Which method?"
          options={['POST', 'GET', 'DELETE', 'PUT']}
          correctIndex={1}
          explanation="GET reads."
        />
        <Quiz
          question="Status 404 means:"
          options={['Server crashed', 'Not found', 'Bad data', 'Too many requests']}
          correctIndex={1}
          explanation="The URL or the item does not exist."
        />
        <Quiz
          question="Why is the foreign key placed on the 'many' side?"
          options={['Convention only', 'Each many-row points to its single owner', 'It is faster', 'SQLite requires it']}
          correctIndex={1}
          explanation="A task points to its project; many tasks, one project."
        />
        <Quiz
          question="Which belongs in a spec?"
          options={['The done-when', 'Your passwords', 'The IDE theme', 'A joke']}
          correctIndex={0}
          explanation="Without a done-when, you cannot tell if the work is finished."
        />
        <Quiz
          question="In a plan review you spot `npm install` in the instructions. What do you do?"
          options={['Accept', 'Comment: everything must go through system.sh', 'Delete the repo', 'Run it twice']}
          correctIndex={1}
          explanation="Your rules: no manual npm or pip."
        />
        <Quiz
          question="What is CORS?"
          options={['A database', 'A browser rule about which addresses may call which', 'A Python library', 'A firewall']}
          correctIndex={1}
          explanation="The backend must allow the frontend's address."
        />
        <Quiz
          question="Where does the SQLite file live?"
          options={['frontend/', 'data/', 'docs/', 'scripts/']}
          correctIndex={1}
          explanation="Only in data/."
        />
        <Quiz
          question="What does `ufw allow ssh` before `ufw enable` prevent?"
          options={['Slow SSH', 'Locking yourself out', 'Updates', 'Docker']}
          correctIndex={1}
          explanation="A deny-all firewall with no SSH rule cuts your connection."
        />
        <Quiz
          question="A container is published as `127.0.0.1:8081:80`. Who can reach 8081?"
          options={['Anyone', 'Only the host itself', 'Only Tailscale', 'No one']}
          correctIndex={1}
          explanation="That's how you keep a port private. nginx on the host then fronts it."
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
