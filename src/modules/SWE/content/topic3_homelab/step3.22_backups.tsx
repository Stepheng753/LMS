import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const BACKUP_PROMPT = `/plan

Create scripts/backup.sh for my homelab server.

It must:
- stop nothing that is not needed, and print clear [INFO] / [SUCCESS] / [ERROR] messages
- back up, with dated folders, to /media/backup:
  - this project's data/ folder and backend/config/ folder
  - ~/services/jellyfin/config
  - ~/services/immich (the library, and a dump of its database)
  - ~/services/nextcloud (html and a dump of its database)
- keep only the newest 7 backups
- exit with an error if the backup drive is not mounted

Do not put any passwords in the script. Follow my saved rules and skills
(stack, selfhosted-apps, fullstack-architecture).

Before you write the plan, ask me about anything that is unclear.`;

const FSTAB = `# /etc/fstab (add one line per drive, using the UUID from blkid)
UUID=1234-ABCD  /media/backup  ext4  defaults,nofail  0  2`;

export default function Step3_22_Backups() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.22 • Self-Hosted Apps"
        title="Backups: Don't Lose Your Photos"
        summary="Disks fail. Phones get deleted. A backup you have never restored is a hope, not a backup."
      />

      <Callout type="warning" title="The one lesson of every homelab">
        You are now the only copy of your family photos, files and videos. A hard drive dying is not an &quot;if&quot;. It is
        a &quot;when&quot;. Do this step <strong>before</strong> you trust Immich or Nextcloud with anything precious.
      </Callout>

      <Section title="The 3-2-1 rule" />
      <Table
        headers={['Number', 'Means', 'In practice']}
        rows={[
          [<strong key="a">3</strong>, 'Three copies of the data', 'The live data plus two backups'],
          [<strong key="b">2</strong>, 'On two different kinds of storage', 'The server disk and an external drive'],
          [<strong key="c">1</strong>, 'One copy somewhere else', 'A drive at a relative\'s house, or an encrypted cloud copy'],
        ]}
      />
      <p>
        &quot;Somewhere else&quot; protects against fire, theft and floods. Start with the second copy (an external drive).
        Add the off-site copy when you can.
      </p>

      <Section title="What to back up" />
      <Table
        headers={['App', 'What matters', 'Note']}
        rows={[
          ['Your own app', 'data/ and backend/config/', 'The code is already on GitHub. These two are not'],
          ['Jellyfin', '~/services/jellyfin/config', 'Users, libraries, watch history. The media you may already have elsewhere'],
          ['Immich', 'The photo library and the database', 'Immich can write its own database dumps. Check its documentation for where it keeps them, and back that up too'],
          ['Nextcloud', '~/services/nextcloud/html and the database', 'A live database folder copied while running can be corrupt, so use a database dump or stop the app first'],
          ['Everything', 'Each compose file and .env', 'Without them you cannot recreate the services'],
        ]}
      />
      <Callout type="info" title="Databases are special">
        Copying a database&apos;s files while the database is running can produce a broken copy. The safe ways are: ask the
        app to make its own dump, run the database&apos;s dump command, or stop the app briefly before copying. Your AI
        helper writes this for each app, and you check that it does one of those three.
      </Callout>

      <Section title="1. Add a backup drive" />
      <p>Plug in an external drive. Then, on the server:</p>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'lsblk', output: 'NAME   SIZE TYPE MOUNTPOINT\nsda    234G disk\n└─sda2 234G part /\nsdb    1.8T disk\n└─sdb1 1.8T part' },
          { command: 'sudo blkid /dev/sdb1', output: '/dev/sdb1: UUID="1234-ABCD" TYPE="ext4"' },
        ]}
      />
      <Callout type="warning" title="Check the device name twice">
        Use <code>lsblk</code> to be sure which one is the new drive by its size. Formatting or mounting the wrong one
        could cost you data. If the drive is blank, ask your AI helper to guide the formatting (it erases the drive), and
        choose <code>ext4</code>, the native Linux format. A drive already in NTFS (a Windows format) can be mounted with
        <code> sudo apt install ntfs-3g</code>, which is how FlashServer mounts its media drives.
      </Callout>
      <p>Make a mount point and tell the server to mount the drive at every start, using its UUID:</p>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo mkdir -p /media/backup' },
          { command: 'sudo nano /etc/fstab' },
        ]}
      />
      <CodeBlock language="bash" title="/etc/fstab (add at the bottom)" code={FSTAB} />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo mount -a', output: '(no output means success)' },
          { command: 'df -h /media/backup', output: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sdb1       1.8T   28K  1.7T   1% /media/backup' },
        ]}
      />
      <p>
        <code>nofail</code> keeps the server booting even if the drive is unplugged. <code>sudo mount -a</code> tests the
        file <em>without rebooting</em>: a mistake in <code>fstab</code> can stop a server booting, so always test it
        like this.
      </p>

      <Section title="2. Have the AI write the backup script" />
      <p>
        This is exactly what <code>scripts/</code> and your <code>backup.sh</code> convention are for. Use a spec, review the
        plan, and check that it handles the databases properly:
      </p>
      <CodeBlock language="markdown" title="Spec: backup script" code={BACKUP_PROMPT} />
      <Table
        headers={['Plan review check', 'Why']}
        rows={[
          ['It checks the drive is mounted before writing', 'Otherwise it fills the server\'s own disk'],
          ['Databases are dumped or the app is paused', 'Avoids corrupt copies'],
          ['Old backups are removed, keeping a few', 'Otherwise the drive fills up'],
          ['No passwords inside the script', 'The script should read them from the existing config'],
          ['It never deletes the live data', 'A backup script only writes to the backup drive'],
        ]}
      />

      <Section title="3. Run it automatically" />
      <p>
        A backup you must remember to run will not happen. Schedule it with <code>cron</code>, the server&apos;s built-in
        timer:
      </p>
      <TerminalBlock path="anna@homelab:~" command="crontab -e" />
      <CodeBlock language="bash" title="crontab (runs every night at 3:00)" code={`0 3 * * * /home/anna/apps/taskapp/scripts/backup.sh >> /home/anna/backup.log 2>&1`} />
      <p>
        The five fields are minute, hour, day of month, month, day of week. <code>0 3 * * *</code> means &quot;at minute 0
        of hour 3, every day&quot;. The output is kept in <code>backup.log</code>, which you read when something seems off.
      </p>

      <Section title="4. Prove you can restore" />
      <Steps
        steps={[
          { title: 'Run the backup once by hand', children: <TerminalBlock path="anna@homelab:~" command="~/apps/taskapp/scripts/backup.sh" /> },
          { title: 'Look at what it made', children: <TerminalBlock path="anna@homelab:~" command="ls -la /media/backup" /> },
          { title: 'Restore into a scratch folder', children: <p>Copy one backed-up file, or a whole folder, into <code>/tmp/restore-test</code> and open it. Does it open, and is it complete?</p> },
          { title: 'Repeat every few months', children: <p>Put a reminder in your calendar. A restore test is the only proof that a backup works.</p> },
        ]}
      />

      <Callout type="warning" title="Backups can hold secrets">
        Your backups include <code>secrets.json</code> and compose files with passwords. Keep the drive somewhere safe,
        and if the off-site copy goes to the cloud, <strong>encrypt it first</strong>. Tools such as <code>restic</code>{' '}
        or <code>rclone</code> do this. Ask your AI helper to explain them when you are ready for the off-site copy.
      </Callout>

      <Collapsible title="Good to know">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>RAID is not a backup.</strong> Mirrored disks protect against one disk failing, but not against deleting a file by mistake or malware.</li>
          <li><strong>Phones are not backups either.</strong> If Immich is your photo backup, it needs its own backup.</li>
          <li>Start simple. A nightly copy to one external drive that you have tested beats a clever system you never finished.</li>
        </ul>
      </Collapsible>

      <Exercise
        title="Write your backup plan"
        hint={<p>For each thing you run, name where its data lives, what could go wrong, and where the copies go.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Live data: the server disk, in <code>~/apps/taskapp/data</code> and <code>~/services/*</code>.</li>
            <li>Copy 2: nightly script to the external drive at <code>/media/backup</code>, with database dumps, keeping 7 days.</li>
            <li>Copy 3 (off-site): an encrypted copy on a drive kept at a relative&apos;s, refreshed monthly.</li>
            <li>Test: a restore of one folder into <code>/tmp</code> every three months.</li>
          </ul>
        }
      >
        <p>Write down your 3-2-1 plan for your photos, files and app data: where is each copy, how often is it made, and how will you test it?</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What does the 3-2-1 rule say?"
          options={['3 passwords, 2 disks, 1 server', '3 copies, on 2 kinds of storage, 1 off-site', '3 days, 2 hours, 1 minute', 'Back up three times a day']}
          correctIndex={1}
          explanation="Three copies, two kinds of storage, one somewhere else."
        />
        <Quiz
          question="Why test mount -a before rebooting after editing /etc/fstab?"
          options={['It is faster', 'A broken fstab can stop the server from booting', 'It formats the drive', 'It changes the UUID']}
          correctIndex={1}
          explanation="mount -a tries the file immediately and shows errors while you can still fix them."
        />
        <Quiz
          question="Why is a backup you have never restored a risk?"
          options={['It takes up space', 'You do not know it works until you try', 'It is illegal', 'It slows the server']}
          correctIndex={1}
          explanation="Only a successful restore proves a backup is usable."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'You are the only copy until you make more. Follow 3-2-1: three copies, two storage types, one off-site.',
          'Back up data folders, compose files and database dumps. Never copy a running database\'s files blindly.',
          'Mount a backup drive with a UUID line in /etc/fstab and test it with sudo mount -a.',
          'Automate with a script and cron, then restore a file to prove it works.',
        ]}
      />
    </div>
  );
}
