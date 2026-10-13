import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_1_SelfHosting() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.1 • Foundations"
        title="What Is Self-Hosted Open Source?"
        summary="Two ideas that together explain why people run their own servers, and what you take on when you do."
      />

      <Section title="Open source" />
      <p>
        Software is written as text called <strong>source code</strong>. With ordinary (&quot;closed&quot;) software you
        only receive the finished program, and you cannot see or change how it works. With{' '}
        <Term definition="Software whose source code is published, so anyone can read it, run it, and (depending on the licence) change and share it.">open-source</Term>{' '}
        software, the source code is public. Anyone can read it, check what it does, and usually run it for free.
      </p>
      <p>
        Every open-source project comes with a <strong>licence</strong>, a short legal text that says what you may do.
        You do not need to read them all, but you should know the two families:
      </p>
      <Table
        headers={['Family', 'Examples', 'In plain words']}
        rows={[
          ['Permissive', 'MIT, Apache 2.0', 'Do almost anything with it, including in commercial projects'],
          ['Copyleft', 'GPL, AGPL', 'You may use and change it, but changes you share must stay open too'],
        ]}
      />
      <p>
        Open source does not automatically mean &quot;safe&quot; or &quot;well maintained&quot;. It means the code is
        out in the open, where many people can check it. A project with an active community and recent updates is a good
        sign.
      </p>

      <Section title="Self-hosted" />
      <p>
        <strong>Self-hosting</strong> means running a service on hardware <em>you</em> control, instead of renting it from
        a company. Your photos live on your own disk, not on a company&apos;s servers.
      </p>
      <Compare
        goodLabel="Self-hosted"
        badLabel="Rented (cloud service)"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>You own the data and the rules</li>
            <li>No monthly fee, no limits except your disk</li>
            <li>Nobody can change the terms or shut it down</li>
            <li>You learn how the internet actually works</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>Someone else runs it, updates it and backs it up</li>
            <li>Works the moment you sign up</li>
            <li>Their staff keeps it secure and online</li>
            <li>Costs a subscription, and your data lives on their systems</li>
          </ul>
        }
      />

      <Callout type="warning" title="The honest trade-off">
        When you self-host, <strong>you</strong> are the technician. If the server crashes, you fix it. If the disk dies
        and there is no backup, the data is gone. If a service is exposed to the internet and is not kept up to date, it
        can be attacked. That is why this topic spends as much time on security and backups as on installing things.
      </Callout>

      <Section title="The three apps you will run" />
      <Table
        headers={['App', 'Replaces', 'What it does']}
        rows={[
          ['Immich', 'Google Photos, iCloud Photos', 'Backs up photos and videos from your phone, with search, albums and face recognition'],
          ['Jellyfin', 'Netflix and Plex, for your own files', 'Streams your own video and music collection to any device'],
          ['Nextcloud', 'Google Drive, Dropbox, Google Calendar', 'Files, calendar, contacts and sharing'],
        ]}
      />
      <p>
        You will also run <strong>your own apps</strong>, like the one you built in Topic 2, side by side with these.
        Same server, same method.
      </p>
      <Callout type="info" title="Your own media">
        Jellyfin is for media you have the right to use, such as your own videos, family recordings, and files you
        legally own.
      </Callout>

      <QuizSet>
        <Quiz
          question="What does 'open source' mean?"
          options={['The software is free of bugs', 'Its source code is public to read', 'It only runs on Linux', 'It has no licence']}
          correctIndex={1}
          explanation="Open source means the code is published. It says nothing about quality by itself."
        />
        <Quiz
          question="Which of these is a real cost of self-hosting?"
          options={['You cannot see your own data', 'You are responsible for updates, security and backups', 'It always costs a monthly fee', 'It cannot work at home']}
          correctIndex={1}
          explanation="You become the administrator. Freedom comes with responsibility."
        />
        <Quiz
          question="Which app is the self-hosted alternative to Google Photos?"
          options={['Jellyfin', 'Nextcloud', 'Immich', 'nginx']}
          correctIndex={2}
          explanation="Immich is a photo and video library you run yourself."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Open source = public source code, under a licence (permissive like MIT, or copyleft like GPL/AGPL).',
          'Self-hosted = running services on hardware you control, so you own your data.',
          'The price of freedom: you handle updates, security and backups.',
          'We will run Immich (photos), Jellyfin (media) and Nextcloud (files), plus your own apps.',
        ]}
      />
    </div>
  );
}
