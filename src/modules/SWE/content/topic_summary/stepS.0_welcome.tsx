import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Steps } from '../../../../components/content/Steps';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Start Here"
        title="The Complete Review"
        summary="Everything from the five topics in one place: recaps, a glossary, a command reference, playbooks, exams and challenges. Use it to review, to look things up, and to find your gaps."
      />

      <p>
        You have covered a great deal: a terminal, full-stack apps, your own server, connections to Google and AI, and agents.
        It is normal that parts have already faded. This section is built to bring everything back, and to turn what you have
        seen into what you can <strong>do</strong> without looking.
      </p>

      <Flow
        steps={[
          { title: '1 Setup & Bash', sub: 'The terminal, WSL, your tools' },
          { title: '2 Full stack', sub: 'Specs, plans, apps', via: 'then' },
          { title: '3 Homelab', sub: 'Server, Docker, HTTPS, deploys', via: 'then' },
          { title: '4 External APIs', sub: 'Google, AI, posting', via: 'then' },
          { title: '5 Agents', sub: 'MCP, models, assistants', via: 'then' },
          { title: 'S Summary', sub: 'You are here', via: 'review' },
        ]}
      />

      <Section title="What is in this section" />
      <Table
        headers={['Steps', 'What', 'Use it for']}
        rows={[
          [<strong key="a">S.1 to S.5</strong>, 'A recap of each topic: the big ideas, the key commands, the common mistakes, a quiz and a "can you...?" checklist', 'Refreshing one topic at a time'],
          [<strong key="b">S.6</strong>, 'The big picture: how all the pieces connect, and the life of one feature from idea to live', 'Seeing the whole system'],
          [<strong key="c">S.7 to S.11</strong>, 'A glossary of over 120 terms, a master command reference, the skills and rules map, and decision guides', 'Looking things up fast'],
          [<strong key="d">S.12 to S.14</strong>, 'A safety playbook with incident runbooks, a troubleshooting guide for the whole course, and real-world scenarios', 'When something goes wrong, or you start something new'],
          [<strong key="e">S.15 to S.18</strong>, 'Two checkpoint exams, design challenges, and a full self-assessment with a gap plan', 'Testing yourself honestly'],
          [<strong key="f">S.19</strong>, 'Your own operating manual, a 90-day plan and what to learn next', 'Finishing well'],
        ]}
      />

      <Section title="How to use it: three passes" />
      <Steps
        steps={[
          { title: 'Pass 1: Skim', children: <p>Read each recap quickly, <strong>without looking things up</strong>. Whatever feels familiar, move on. Whatever feels hazy, mark it.</p> },
          { title: 'Pass 2: Test', children: <p>Do the quizzes and the two checkpoint exams. A wrong answer is useful: it tells you exactly which step to reread. The explanations teach too.</p> },
          { title: 'Pass 3: Build', children: <p>Pick a challenge from S.17 or a scenario from S.14 and <strong>do it</strong>. Understanding that you can only use with a lesson open is not yet yours.</p> },
        ]}
      />

      <Callout type="tip" title="Remembering beats rereading">
        Closing the lesson and trying to recall an answer, even a wrong one, makes it stick far better than reading it
        again. Cover the answers, say them aloud, then check.
      </Callout>
      <Callout type="info" title="It is also a reference">
        You will come back to the glossary, the command reference, the troubleshooting guide and the playbooks again and
        again, long after the lessons themselves. Bookmark them.
      </Callout>

      <Section title="Where the toolkit fits" />
      <p>
        The <strong>T</strong> section after this one holds your toolkit: every rule, skill and template you saved, ready to
        download. This summary tells you <em>what</em> they are and <em>when</em> to use them (S.10). The toolkit gives you
        the files.
      </p>

      <Quiz
        question="Which study method helps you remember the most?"
        options={['Rereading the lessons', 'Trying to recall an answer first, then checking it', 'Skipping the quizzes', 'Reading faster']}
        correctIndex={1}
        explanation="Retrieval practice, trying to remember before you look, makes memories last."
      />

      <KeyTakeaways
        items={[
          'S has recaps (S.1 to S.5), the big picture (S.6), references (S.7 to S.11), playbooks (S.12 to S.14), tests (S.15 to S.18) and a finish (S.19).',
          'Use three passes: skim, test, build. Doing beats reading.',
          'The glossary, commands, troubleshooting guide and playbooks are for coming back to.',
          'The toolkit (T) holds the files. The summary explains how to use them.',
        ]}
      />
    </div>
  );
}
