import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const SKILLS: [string, string][] = [
  ['Topic 1', 'Move around the file system and use pwd, ls, cd without thinking'],
  ['Topic 1', 'Create, copy, move and delete files and folders, and know the risk of rm'],
  ['Topic 1', 'Edit with nano and write files with echo'],
  ['Topic 1', 'Install a package with apt and explain sudo'],
  ['Topic 1', 'Add an alias and reload it'],
  ['Topic 1', 'Ask an AI helper good questions with full errors'],
  ['Topic 2', 'Explain frontend, backend and database to someone new'],
  ['Topic 2', 'Choose the right HTTP method and read a status code'],
  ['Topic 2', 'Design two related tables with a foreign key'],
  ['Topic 2', 'Sketch a page as nested rectangles'],
  ['Topic 2', 'Write a spec with a done-when'],
  ['Topic 2', 'Review a plan against my own checklist, with specific comments'],
  ['Topic 2', 'Run and test the app only through system.sh'],
  ['Topic 2', 'Find a bug by checking database, Swagger, network, screen in order'],
  ['Topic 3', 'Explain what happens when I load a website'],
  ['Topic 3', 'Commit, push and keep secrets out of git'],
  ['Topic 3', 'Log in to my server with a key from anywhere'],
  ['Topic 3', 'Enable the firewall safely'],
  ['Topic 3', 'Containerise an app and prove its data survives a restart'],
  ['Topic 3', 'Add a name, a certificate and an nginx site'],
  ['Topic 3', 'Deploy by pushing, and roll back by reverting'],
  ['Topic 3', 'Back up and restore'],
  ['Topic 4', 'Choose between API key, OAuth and service account'],
  ['Topic 4', 'Read an API\'s documentation and make a first call'],
  ['Topic 4', 'Read and write a Google Sheet from the backend'],
  ['Topic 4', 'Call an AI model and switch providers by config'],
  ['Topic 4', 'Build a spending cap and prove it works'],
  ['Topic 4', 'Draft, approve, post with a human check'],
  ['Topic 5', 'Explain what an agent is and why it is riskier than a chatbot'],
  ['Topic 5', 'Connect an MCP server and test it'],
  ['Topic 5', 'Write a task brief that another person could follow'],
  ['Topic 5', 'Pick between a cloud agent, a local model and a self-hosted agent'],
  ['Topic 5', 'Run an agent with an unprivileged user, approvals and an allowlist'],
  ['Topic 5', 'Stop an agent quickly and audit what it did'],
];

export default function StepS_18_SelfAssessment() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Self-Assessment"
        title="Your Skills Self-Assessment"
        summary="An honest inventory of what you can do, and a plan for the gaps."
      />

      <Callout type="info" title="Be honest, it is private">
        Rate each skill on this scale: <strong>0</strong> never heard of it, <strong>1</strong> I have seen it,{' '}
        <strong>2</strong> I can do it with the lesson open, <strong>3</strong> I can do it on my own,{' '}
        <strong>4</strong> I could teach it. Copy the list into a note and fill it in.
      </Callout>

      <Section title="The skills" />
      <Table headers={['#', 'Topic', 'I can...']} rows={SKILLS.map(([t, s], i) => [String(i + 1), t, s])} />

      <Section title="Turn the scores into a plan" />
      <Steps
        steps={[
          { title: 'Find your 0s and 1s', children: <p>These are your gaps. Open the matching recap step, then the full lesson, and do its exercise.</p> },
          { title: 'Lift your 2s to 3s', children: <p>Do the skill again without the lesson. If you can finish it alone, it is a 3.</p> },
          { title: 'Make one 3 into a 4', children: <p>Pick the skill you enjoy most and teach it to someone (a friend, or an imaginary student). Write a one-page explanation.</p> },
          { title: 'Schedule it', children: <p>Put two gap-closing sessions in your calendar this week. Small and regular beats a big push.</p> },
          { title: 'Retake in a month', children: <p>Rescore. Seeing the numbers rise is the best motivator.</p> },
        ]}
      />

      <Section title="How to read your result" />
      <Table
        headers={['Mostly...', 'Means', 'Next']}
        rows={[
          [<strong key="a">0s and 1s</strong>, 'You have seen the material, not yet used it', 'Redo the topic projects slowly, one skill a day'],
          [<strong key="b">2s</strong>, 'You can follow, not yet lead', 'Rebuild a project without the lesson open'],
          [<strong key="c">3s</strong>, 'You work on your own', 'Challenges 2 to 5 in S.17'],
          [<strong key="d">4s</strong>, 'You can teach', 'Build something of your own, and share it'],
        ]}
      />

      <Callout type="tip" title="A 2 is a good place to be">
        Needing the lesson open does not mean you failed. It means you are in the middle of learning. Real developers look
        things up all day. What matters is that you know <em>what</em> to look up and can judge the answer.
      </Callout>

      <KeyTakeaways
        items={[
          'Rate yourself 0 to 4 on each skill, honestly.',
          'Fix 0s and 1s with lessons, lift 2s with practice, and teach one 3.',
          'Schedule short regular sessions and retake the assessment in a month.',
        ]}
      />
    </div>
  );
}
