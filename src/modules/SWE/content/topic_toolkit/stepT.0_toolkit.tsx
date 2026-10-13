import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { ToolkitDownloads } from '../../../../components/content/ToolkitDownloads';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { ARTIFACTS, INSTALL_SCRIPT, TOOLKIT_README } from '../../toolkit/registry';

export default function StepF_0_Toolkit() {
  return (
    <div>
      <StepHeader
        eyebrow="Final • Your Toolkit"
        title="Download Your Toolkit"
        summary="Every rule, skill, template and setting file from this course, ready to download and keep."
      />

      <p>
        Over the topics you saved rules, skills and settings, one at a time. Here they all are, in one place: the
        finished versions, ready to use on any machine. If you ever set up a new computer, or want to start a project
        quickly, this page is the shortcut.
      </p>

      <Callout type="success" title="The quickest way">
        Download the zip. It holds every file, in folders, plus an <code>install.sh</code> that puts your rules, skills and
        shell aliases in the right places for both Antigravity and Agy. The next step shows how to use it.
      </Callout>

      <ToolkitDownloads
        items={ARTIFACTS}
        zipName="academy-toolkit.zip"
        extras={[
          { zipPath: 'install.sh', text: INSTALL_SCRIPT, executable: true },
          { zipPath: 'README.md', text: TOOLKIT_README },
        ]}
      />

      <Section title="What each group is for" />
      <Table
        headers={['Group', 'What you do with it']}
        rows={[
          ['Rules & skills', 'Installed once, globally. Antigravity and Agy then follow them in every project'],
          ['Your machine', '.bash_aliases goes in your home folder, .wslconfig in your Windows user folder, and the SSH config is a template for ~/.ssh/config'],
          ['Project templates', 'Copy into a new project when you need them. The spec template begins every /plan, and the Docker and workflow files are examples for the AI to follow'],
          ['Server templates', 'For the homelab: nginx sites, the certificate credentials template and app compose files'],
        ]}
      />

      <Callout type="warning" title="No secrets inside, and none to add">
        These files contain placeholders such as <code>&lt;your-domain&gt;</code> and <code>change-me</code>. Replace them on
        the machine where the file is used. Never put a real password, key or token into your toolkit, and never share a
        file after you have filled one in.
      </Callout>

      <Callout type="info" title="This page grows with the course">
        When new topics add skills, they appear here, with their finished versions. If you improve a skill in your own
        files, your saved copy is the one that counts, so keep it in a safe place (the next step shows how).
      </Callout>

      <KeyTakeaways
        items={[
          'The toolkit zip holds every finished rule, skill, template and setting from the course.',
          'install.sh puts rules and skills where Antigravity and Agy read them, and installs your aliases.',
          'Templates have placeholders. Fill them in on the machine that uses them, never with real secrets inside the toolkit.',
        ]}
      />
    </div>
  );
}
