import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { Flow } from '../../../../components/content/Flow';

export default function Step3_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.0 • Homelab & Pipelines"
        title="Welcome to the Homelab"
        summary="Turn an old laptop into your own server, and make the apps you build go live every time you save a change."
      />

      <p>
        In Topic 2 your app ran on <code>localhost</code>: only your own computer could see it. In this topic you move
        it somewhere real. By the end, you will push a change to GitHub, and a short while later it will be live on a
        website with a proper name and a padlock, running on a machine in your own home.
      </p>

      <Flow
        steps={[
          { title: 'Your laptop', sub: 'Write the spec, review the plan' },
          { title: 'GitHub', sub: 'Holds the code, runs the pipeline', via: 'git push' },
          { title: 'Homelab server', sub: 'Runs the app in containers', via: 'deploy' },
          { title: 'You, anywhere', sub: 'Phone or computer, via your own domain', via: 'https' },
        ]}
      />

      <Section title="What you will need" />
      <Table
        headers={['Item', 'Notes']}
        rows={[
          ['An old laptop', 'It becomes the server. Its disk will be completely erased, so do not use one you still need'],
          ['A USB stick (8 GB or more)', 'To install the server operating system. Its contents will be erased too'],
          ['An Ethernet cable', 'Strongly recommended over Wi-Fi for a server. You may need a USB adapter if the laptop has no port'],
          ['Access to your router', 'Its admin app or web page, to give the server a fixed address'],
          ['A GitHub account', 'Free'],
          ['A Tailscale account', 'Free for personal use'],
          ['A Cloudflare account', 'Free. It will manage your domain’s DNS'],
          ['A domain name from Hostinger', 'Roughly ten dollars a year, though prices vary. This is the only thing that costs money'],
        ]}
      />

      <Callout type="warning" title="Back up first">
        Installing the server operating system wipes the laptop&apos;s disk. Copy anything you want to keep to another
        place before you start step 3.6.
      </Callout>

      <Section title="The road ahead" />
      <Table
        headers={['Phase', 'Steps', 'You will learn']}
        rows={[
          ['Foundations', '3.1 to 3.3', 'What self-hosting is, how the internet really works, and how home networks work'],
          ['Git', '3.4 to 3.5', 'Saving your project history and putting it on GitHub'],
          ['The server', '3.6 to 3.11', 'Installing Ubuntu Server, remote access with SSH, locking it down, Tailscale'],
          ['Docker', '3.12 to 3.14', 'Packaging your Topic 2 app into containers'],
          ['Names and traffic', '3.15 to 3.18', 'DNS, nginx, HTTPS certificates, and optionally going public'],
          ['Self-hosted apps', '3.19 to 3.22', 'Jellyfin, Immich, Nextcloud, and backups'],
          ['Pipelines', '3.23 to 3.25', 'Automatic testing and deployment with GitHub Actions'],
        ]}
      />

      <Callout type="info" title="How this topic works">
        Same loop as Topic 2. You describe, your AI helper writes the files, and you review. The new skill is that
        everything now touches the real world. A server that is reachable from outside needs more care, so security
        habits are part of each step, not an afterthought.
      </Callout>

      <Quiz
        question="What is the goal of this topic?"
        options={[
          'Learn Python',
          'Run your apps on your own server and deploy them automatically',
          'Design a new website',
          'Replace Windows',
        ]}
        correctIndex={1}
        explanation="You will host your Topic 2 app on a home server and set up a pipeline that deploys each change."
      />

      <KeyTakeaways
        items={[
          'localhost only works on your own computer. A server makes your app reachable by others.',
          'You will build: GitHub → pipeline → homelab server → your own domain.',
          'You need an old laptop, a USB stick, an Ethernet cable, three free accounts and a domain.',
          'Installing the server wipes the laptop. Back up first.',
        ]}
      />
    </div>
  );
}
