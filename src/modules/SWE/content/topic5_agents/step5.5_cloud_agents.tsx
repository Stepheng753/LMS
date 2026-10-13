import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_5_CloudAgents() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 5.5 • Autonomous Agents"
        title="The Cloud Agents: Cowork, Spark and ChatGPT Work"
        summary="The big AI companies now sell agents that work on your behalf. Learn what they have in common, how they differ, and how to choose."
      />

      <p>
        In 2026 all three of the best-known AI companies launched something similar: an agent that works for you instead of
        just chatting. They are the polished, ready-made end of the ladder: you do not build the loop, host anything or
        worry about servers. You connect your accounts, describe a job, and it works, sometimes for hours.
      </p>

      <Callout type="warning" title="A snapshot, not a manual">
        These products launched, changed and merged within months. What follows is how they looked in October 2026, drawn
        from the companies&apos; announcements and news reports, and some details differ between sources. The{' '}
        <strong>ideas</strong> are lasting. The <strong>names, plans and prices are not</strong>. Always check each
        vendor&apos;s own page.
      </Callout>

      <Flow
        steps={[
          { title: 'You describe a goal', sub: 'In plain language' },
          { title: 'It connects to your apps', sub: 'Files, email, calendar, chat (often via MCP-style connectors)', via: 'plans' },
          { title: 'It works', sub: 'In the background, sometimes for hours', via: 'acts' },
          { title: 'It asks you', sub: 'Before high-stakes actions', via: 'approval' },
          { title: 'You review', sub: 'The finished work', via: 'result' },
        ]}
      />

      <Section title="The three, side by side" />
      <Table
        headers={['', 'Claude Cowork (Anthropic)', 'Gemini Spark (Google)', 'ChatGPT Work (OpenAI)']}
        rows={[
          ['What it is', 'A desktop agent inside the Claude app that works on your files and across applications', 'A personal agent that Google describes as working 24/7 on your behalf', 'An agent in ChatGPT that builds documents, spreadsheets, presentations and web apps from your connected tools'],
          ['Where it runs', 'On your computer, with access to folders you choose', 'On Google\'s cloud virtual machines, so it continues when your laptop is closed', 'In OpenAI\'s cloud, working in the background'],
          ['Typical jobs', 'Organise files, pull data from PDFs, make reports from a folder, scheduled tasks', 'Watch your email and calendar, track a package, research with sources, spot hidden fees', 'Gather context from Slack, Drive, calendars and CRMs, then produce finished materials'],
          ['Connects to', 'Connectors, including MCP servers, and plugins', 'Google Workspace: Gmail, Docs, Slides, Calendar', 'Slack, Teams, Google Drive, SharePoint, calendars and project tools through plugins'],
          ['Approvals', 'Reports describe permission prompts and admin controls', 'Google says it asks before high-stakes actions such as spending money or sending email', 'You can review progress and approve key actions'],
          ['Timeline', 'Preview January 2026, general availability April 2026', 'Announced at Google I/O 2026', 'Launched July 9, 2026, with the GPT-5.6 models'],
          ['Caveats', 'Reported in September 2026 to be merging into the regular Claude chat. Check current status', 'Google still calls it experimental. Reports differ on which plan includes it', 'Reuters called it a response to Cowork. One report mentioned launch bugs, including files deleted without permission'],
        ]}
      />
      <p>
        An earlier OpenAI product, &quot;workspace agents&quot; (April 2026), offered a similar idea for business teams.
        Names and bundles in this area change often, and you will see more.
      </p>

      <BigWarning title="Cloud agents act with your logins, and usually need a paid plan">
        <ul>
          <li><strong>They need access.</strong> To be useful, they connect to your email, files, calendar or chat. Whatever they can reach, a mistake or a hijack can reach too.</li>
          <li><strong>Mistakes are real.</strong> Reports of a launch-week agent deleting files show that even well-resourced products misfire. Keep backups of anything an agent can touch.</li>
          <li><strong>They cost money.</strong> These products generally sit on paid plans, and heavy use may be metered or limited. Check the plan, the limits and what counts as usage before you rely on them.</li>
          <li><strong>Your data goes to the vendor.</strong> Check what the product stores and uses, especially on a work account, and never connect accounts you are not allowed to connect.</li>
          <li><strong>Start with a test account or a throw-away folder</strong>, read-only, and widen access only after you have watched it work.</li>
        </ul>
      </BigWarning>

      <Section title="What they have in common" />
      <Table
        headers={['Shared idea', 'Why it matters']}
        rows={[
          ['Connectors', 'They reach your apps through plug-ins, many built on MCP (step 5.2). You choose which accounts to connect'],
          ['Background work', 'They keep going after you stop watching. Nothing is on your screen to catch a mistake'],
          ['Scheduling', 'You can ask for a job daily or weekly, so a mistake repeats on a schedule'],
          ['Approvals', 'Dangerous steps should ask you first. They are only worth something if you read them'],
          ['A paid, hosted service', 'No servers for you to run, but your data and your bill live with the vendor'],
        ]}
      />

      <Section title="Choosing one" />
      <Table
        headers={['If you mostly...', 'Look first at']}
        rows={[
          ['Live in Gmail, Calendar and Google Docs', 'Gemini Spark: it is built into that world'],
          ['Work in Slack, Teams, Drive and documents', 'ChatGPT Work'],
          ['Have files and folders on your own computer to organise or analyse', 'Claude Cowork (or its successor inside Claude), which works on local folders'],
          ['Want control, privacy and no subscription', 'A self-hosted agent (steps 5.10 to 5.12)'],
        ]}
      />
      <Compare
        goodLabel="Good fits for a cloud agent"
        badLabel="Poor fits"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>Drafting, summarising and organising, where a person reviews the result</li>
            <li>Research with sources you can check</li>
            <li>Repetitive paperwork in apps you already use</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>Anything that moves money, signs, or cannot be undone, without a human step</li>
            <li>Work on accounts or data you are not allowed to share</li>
            <li>Jobs where a plausible but wrong answer is worse than no answer</li>
          </ul>
        }
      />

      <Callout type="info" title="You already know how these work">
        Underneath, they are the loop from step 5.1: a model with tools, running in steps. The difference is that the vendor
        built the loop, the connectors and the interface, and hosts the whole thing. You trade control for convenience.
        Everything you have learned about limits, approvals and least privilege applies unchanged.
      </Callout>

      <Exercise
        title="Match the job to the safe setup"
        hint={<p>Ask: what is the worst thing this agent could do with the access it has? Then shrink that access.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Summarise my meeting notes:</strong> give it only the notes folder, read-only. Low risk.</li>
            <li><strong>Tidy my Downloads folder:</strong> ask it to <em>propose</em> a plan first, review it, and back up the folder before approving any moves or deletes.</li>
            <li><strong>Watch my inbox and reply to bills:</strong> do not let it send anything. Draft only, you press send. Start on a test inbox.</li>
            <li><strong>Pay my invoices:</strong> no. Agents should not move money without a human step.</li>
          </ol>
        }
      >
        <p>For each job, say how you would restrict it: (1) Summarise my meeting notes. (2) Tidy my Downloads folder. (3) Watch my inbox and reply to bills. (4) Pay my invoices.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What is the biggest practical difference between a cloud agent and one you build?"
          options={['The cloud one is always smarter', 'The vendor builds and hosts the loop and connectors, so you trade control for convenience', 'You cannot give it a goal', 'It uses no model']}
          correctIndex={1}
          explanation="Same loop underneath, but hosted and packaged by the vendor, on their terms and their bill."
        />
        <Quiz
          question="Why start a cloud agent on a test account or a throw-away folder?"
          options={['It runs faster', 'Whatever it can reach, a mistake or hijack can reach too', 'It is required by the vendor', 'It lowers the price']}
          correctIndex={1}
          explanation="Access is risk. Start small and widen it after you have watched it work."
        />
        <Quiz
          question="Which statement about these products is most accurate?"
          options={['Their names and plans are stable', 'The ideas last, but names, plans and details change fast, so check the vendor\'s page', 'They are all identical', 'They never need paid plans']}
          correctIndex={1}
          explanation="One of the three was reportedly merged into another product within months of launch."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Claude Cowork, Gemini Spark and ChatGPT Work are hosted agents that connect to your apps and work in the background.',
          'They share connectors, background work, scheduling, approvals and a paid hosted model.',
          'Choose by where you live: Google (Spark), Slack and documents (ChatGPT Work), local files (Cowork).',
          'They act with your logins. Start with test accounts, read-only access, backups, and read every approval.',
          'Details change monthly. Check the vendor\'s current page before relying on anything.',
        ]}
      />
    </div>
  );
}
