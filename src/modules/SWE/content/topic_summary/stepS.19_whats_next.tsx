import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Exercise } from '../../../../components/content/Exercise';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_19_WhatsNext() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Finish"
        title="Where You Are Now, and What Next"
        summary="What you can do today, ten habits to keep, how to write your own operating manual, and where to go from here."
      />

      <Section title="The journey" />
      <Flow
        steps={[
          { title: '1 Setup', sub: 'A terminal and a helper' },
          { title: '2 Full stack', sub: 'Apps from specs', via: 'then' },
          { title: '3 Homelab', sub: 'A server of your own', via: 'then' },
          { title: '4 APIs', sub: 'Google, AI, posting', via: 'then' },
          { title: '5 Agents', sub: 'AI that acts, safely', via: 'then' },
        ]}
      />

      <Section title="What you can do now" />
      <Table
        headers={['You can...', 'Which means']}
        rows={[
          ['Direct an AI to build a full-stack app', 'You turn an idea into working software without writing it all yourself'],
          ['Judge what the AI gives you', 'You review plans and code against standards you wrote'],
          ['Run and secure your own server', 'Your apps live at home, private, behind your own domain'],
          ['Ship changes automatically', 'A push tests and deploys, and you can roll back'],
          ['Connect to the outside world', 'Your apps use Google, AI models and social platforms'],
          ['Control cost', 'You know what each call costs and you cap it'],
          ['Delegate to agents carefully', 'You get the benefit with a limit on the risk'],
          ['Recover from mistakes', 'Backups, rollbacks, runbooks'],
        ]}
      />

      <Section title="Ten habits to keep" />
      <Table
        headers={['Habit', 'Why']}
        rows={[
          ['1. Sketch and write the spec before building', 'The AI builds what you describe, so describe it well'],
          ['2. Read the whole plan', 'Reviews are where you earn your keep'],
          ['3. Keep the layout and stack fixed', 'Your AI and your future self always know where things are'],
          ['4. Run through system.sh', 'One way to start, stop and test'],
          ['5. Test in three layers', 'Unit, system and manual catch different bugs'],
          ['6. Never commit secrets', 'Check git status before every commit'],
          ['7. Small commits, clear messages', 'You can find and undo changes'],
          ['8. Cheap model, small cap, first', 'Mistakes should cost cents'],
          ['9. Least privilege for everything', 'Humans, services, agents'],
          ['10. Improve the rule, not just the chat', 'The fix stays fixed'],
        ]}
      />

      <Section title="Write your own operating manual" />
      <Exercise
        title="One page that is truly yours"
        hint={<p>Start with the ten habits. Cross out any that do not fit you. Add three of your own from mistakes you made while learning.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>It fits on one page and you wrote it in your own words.</li>
            <li>It lists your stack, your layout, your naming, and your never-do list.</li>
            <li>It says how you start a project, how you review a plan, and how you ship.</li>
            <li>It says what you check before pressing Enter on anything destructive.</li>
            <li>It is saved as a rule or a skill, so your AI helper follows it too.</li>
          </ul>
        }
      >
        <p>Write a one-page operating manual: how you start projects, what you always check, what you never do, how you ship, and how you keep things safe. Save it as a rule in your toolkit.</p>
      </Exercise>

      <Section title="A 90-day plan" />
      <Table
        headers={['Days', 'Do', 'Success looks like']}
        rows={[
          ['1 to 30', 'Close your gaps (S.18). Take both exams again. Build Challenge 1 and 2', 'Most scores are 3. Exams above 10 of 12'],
          ['31 to 60', 'Build Challenges 3 and 4 for a real use. Put one app in front of other people', 'Something you built is used every week'],
          ['61 to 90', 'Challenge 5 with a real, narrow job. Update your manual with what you learned', 'An agent saves you time, safely'],
        ]}
      />

      <Section title="Where to go next" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Build things you actually need.</strong> The best projects solve a problem you have. Start small, ship, improve.</li>
        <li><strong>Learn one layer deeper.</strong> Pick the one you enjoyed: frontend design, backend logic, servers, or agents.</li>
        <li><strong>Read other people&apos;s code and docs.</strong> Ask your AI to explain it. This is the fastest way to grow.</li>
        <li><strong>Share and teach.</strong> Explaining something is the best test and builds a reputation.</li>
        <li><strong>Try the Personal Finance track</strong> on the Finance tab of this academy, which teaches the money side of the same journey: debt, taxes, investing, retirement and real estate.</li>
        <li><strong>Keep your toolkit alive.</strong> When you improve a rule or a template, download the new zip and keep it safe.</li>
      </ul>

      <Callout type="success" title="You started with a terminal window">
        You can now describe software, direct an AI to build it, run it on your own server, connect it to the world, and
        hand work to an agent, all while keeping it safe and affordable. The tools will change. The habits you learned
        will not.
      </Callout>

      <KeyTakeaways
        items={[
          'You can build, ship, connect and automate, with limits on cost and risk.',
          'Keep the ten habits and write them into your own operating manual.',
          'Follow a 90-day plan: close gaps, build for real use, then try a narrow agent.',
          'Next: build things you need, go deeper in one layer, teach, and explore the Finance track.',
          'Your toolkit (next) holds everything in files, ready for any new machine.',
        ]}
      />
    </div>
  );
}
