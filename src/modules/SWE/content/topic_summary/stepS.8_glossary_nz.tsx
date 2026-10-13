import { StepHeader } from '../../../../components/content/StepHeader';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Section } from '../../../../components/content/Section';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

// term, plain meaning, topic where it was taught
const TERMS: [string, string, string][] = [
  ['NAT', 'The router trick that lets many devices share one public address', '3'],
  ['Nextcloud', 'A self-hosted file sync and sharing service', '3'],
  ['nginx', 'The web server and reverse proxy that routes names to apps', '3'],
  ['OAuth', 'A way for a person to grant your app limited access to their account', '4'],
  ['Ollama', 'A tool that runs open models locally', '5'],
  ['Open model', 'A model whose weights can be downloaded and run by anyone', '5'],
  ['Package', 'Software you can install with a package manager', '1'],
  ['Path (absolute / relative)', 'Where a file is, from the root / from where you are', '1'],
  ['Pipeline', 'The automatic series of steps run on push: test, then deploy', '3'],
  ['Plan (/plan)', 'A written proposal the AI makes for you to review before building', '2'],
  ['Port', 'A numbered door on a machine where a program listens', '2, 3'],
  ['Private IP', 'An address that works only inside a network (192.168.x.x, 10.x.x.x)', '3'],
  ['Prompt', 'The text you give an AI', '1, 4'],
  ['Public IP', 'The address the internet sees for your home', '3'],
  ['Query (database)', 'A question asked of a database', '2'],
  ['React', 'The library used to build the frontend', '2'],
  ['README', 'The explanation file in each folder', '2'],
  ['Repository (repo)', 'A project folder tracked by git', '3'],
  ['Request / response', 'A message asking, and the message answering', '2'],
  ['Reverse proxy', 'A server that receives requests and forwards them to the right app', '3'],
  ['Rollback', 'Returning to the last working version (git revert, then deploy)', '3'],
  ['Root (/)', 'The top of the Linux file tree. Also, the all-powerful user', '1'],
  ['Router', 'The home box connecting your devices to the internet', '3'],
  ['Rule (AI)', 'An always-on instruction file for your AI', '2'],
  ['Runner', 'The machine that executes a GitHub Actions workflow', '3'],
  ['Schema', 'The design of your tables and columns', '2'],
  ['Secret', 'A value that must not be shared: key, password, token', '3, 4'],
  ['Self-hosting', 'Running software yourself instead of using someone else\'s service', '3'],
  ['Server', 'A computer that answers requests', '2, 3'],
  ['Service account', 'A robot identity for server-to-server access', '4'],
  ['Shell', 'The program that reads what you type in a terminal', '1'],
  ['Skill (AI)', 'An instruction file loaded when its description matches the task', '2'],
  ['SQLite', 'A database that is a single file, in data/', '2'],
  ['SSH', 'An encrypted way to log in to a remote machine', '3'],
  ['SSH key pair', 'A private file you keep, and a public file you share', '3'],
  ['SSL / TLS', 'The encryption behind HTTPS', '3'],
  ['Spec', 'Your written description of what to build, with a done-when', '2'],
  ['Status code', 'A number saying how a request went: 2xx ok, 4xx you, 5xx server', '2'],
  ['sudo', 'Run one command as administrator', '1'],
  ['Swagger / OpenAPI', 'A machine-readable description of an API, and the /docs page for it', '2, 4'],
  ['Table (database)', 'A grid of rows and columns for one kind of thing', '2'],
  ['Tailscale', 'A private encrypted network joining your devices', '3'],
  ['Tailwind', 'The utility CSS classes used for styling (version 4)', '2'],
  ['Terminal', 'The window where you type commands', '1'],
  ['Token (AI)', 'A chunk of text, the unit AI providers charge by', '4'],
  ['Token (auth)', 'A string proving a login or permission', '4'],
  ['Tool (agent)', 'An action an agent can take: read a file, search, post', '5'],
  ['TypeScript', 'JavaScript with types, used for the frontend', '2'],
  ['ufw', 'Ubuntu\'s simple firewall', '3'],
  ['Ubuntu', 'The Linux system used on WSL and the server', '1, 3'],
  ['URL', 'The address of something on the web', '2'],
  ['venv (.venv)', 'A project\'s private Python with its own libraries', '2'],
  ['Vibe coding', 'Building by describing what you want and directing an AI, while you review', '1'],
  ['Vite', 'The tool that runs and builds the frontend', '2'],
  ['Volume (Docker)', 'Storage that outlives a container', '3'],
  ['WSL', 'Windows Subsystem for Linux: Ubuntu inside Windows', '1'],
  ['Webhook', 'A URL a service calls to tell you something happened', '4'],
  ['Wildcard certificate', 'One certificate valid for every name under a domain (*.example.com)', '3'],
  ['Workflow (Actions)', 'A YAML file describing a pipeline', '3'],
  ['YAML', 'A text format used by compose files and workflows. Indentation matters', '3'],
  ['Zip', 'A single file that packs several files together, like the toolkit', 'T'],
];

export default function StepS_8_GlossaryNZ() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Glossary"
        title="Glossary, N to Z"
        summary="The second half of the course vocabulary, in plain words."
      />
      <Callout type="tip" title="Turn it into a game">
        Cover the middle column. Say what each term means, then uncover to check. Mark the ones you missed and try them
        again tomorrow.
      </Callout>
      <Section title="N to Z" />
      <Table headers={['Term', 'Plain meaning', 'Topic']} rows={TERMS.map(([a, b, c]) => [<strong key={a}>{a}</strong>, b, c])} />
      <KeyTakeaways
        items={[
          'Together with A to M, that is over 120 terms covering the whole course.',
          'Vocabulary is how you ask your AI precisely for what you want. Precise words get precise results.',
        ]}
      />
    </div>
  );
}
