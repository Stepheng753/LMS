import { StepHeader } from '../../../../components/content/StepHeader';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Section } from '../../../../components/content/Section';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

// term, plain meaning, topic where it was taught
const TERMS: [string, string, string][] = [
  ['A record', 'A DNS entry that points a name (like app.example.com) at an IPv4 address', '3'],
  ['Agent', 'A model with a goal, tools and a loop, deciding its own next steps', '5'],
  ['Agy', 'The Antigravity command-line AI helper', '1'],
  ['Alias', 'A short nickname for a longer command, kept in ~/.bash_aliases', '1'],
  ['API', 'A way for one program to ask another for something over a defined set of requests', '2, 4'],
  ['API key', 'A secret string that identifies your app to a service', '4'],
  ['apt', 'Ubuntu\'s tool for installing software from its trusted catalogue', '1'],
  ['Authentication', 'Proving who you are', '4'],
  ['Authorization', 'What you are allowed to do once you are known', '4'],
  ['Backend', 'The server code that does the work and talks to the database (FastAPI)', '2'],
  ['Backup (3-2-1)', 'Three copies, on two kinds of storage, one off-site', '3'],
  ['Bash', 'The shell language you type in the terminal', '1'],
  ['Branch', 'A separate line of commits in git. The course uses just main', '3'],
  ['Cache', 'A saved copy kept for speed', '3'],
  ['CI/CD', 'Continuous integration and delivery: tests and deploys that run automatically on push', '3'],
  ['Client', 'The side that asks. A browser is a client, so is your backend calling an API', '2'],
  ['Cloudflare', 'The service that holds your DNS records', '3'],
  ['Commit', 'A saved snapshot of your project with a message', '3'],
  ['Component', 'A reusable piece of a React page, one per file', '2'],
  ['Compose', 'A file (docker-compose.yml) that describes several containers together', '3'],
  ['Config', 'Settings kept in files, not hard-coded. JSON in backend/config/', '2'],
  ['Container', 'A running, isolated instance of an image', '3'],
  ['CORS', 'The browser rule that decides whether one address may call another', '2'],
  ['Cost cap', 'A limit you set so spending stops at a number', '4'],
  ['Credential', 'Anything that proves identity: a key, a password, a token', '4'],
  ['Database', 'Organised storage of data in tables (SQLite)', '2'],
  ['DDNS', 'Dynamic DNS: keeps a name pointed at a home IP that changes', '3'],
  ['Delegation', 'Handing a task to an agent with a clear brief', '5'],
  ['Deploy', 'Putting the new version of your app live on the server', '3'],
  ['Deploy key', 'An SSH key made only for the pipeline, revocable alone', '3'],
  ['DHCP', 'How a router hands out private addresses to devices', '3'],
  ['DHCP reservation', 'A router setting that always gives one device the same address', '3'],
  ['Directory', 'A folder', '1'],
  ['DNS', 'The internet\'s phone book: names to addresses', '3'],
  ['DNS-01 challenge', 'Proving you own a domain by adding a DNS record, so private servers can get certificates', '3'],
  ['Docker', 'Software that packages and runs apps in containers', '3'],
  ['Dockerfile', 'The recipe for building an image', '3'],
  ['Domain', 'A name you own, like example.com', '3'],
  ['Endpoint', 'One URL and method an API offers', '2'],
  ['Environment variable', 'A named value passed to a program. The course prefers JSON config', '2'],
  ['Frontend', 'What the user sees and clicks (React)', '2'],
  ['FastAPI', 'The Python framework used for backends in the course', '2'],
  ['Firewall', 'A filter for network traffic. On Ubuntu, ufw', '3'],
  ['Flag', 'An option for a command, like -l or --help', '1'],
  ['Foreign key', 'A column pointing to a row in another table', '2'],
  ['Git', 'The tool that records the history of your project', '3'],
  ['GitHub', 'The website that hosts git repositories and runs pipelines', '3'],
  ['GitHub Actions', 'GitHub\'s system for running workflows on events', '3'],
  ['Hardening', 'Making a server harder to attack', '3'],
  ['Hermes Agent', 'A self-hosted, always-on agent reachable by chat', '5'],
  ['Homelab', 'A server you run at home', '3'],
  ['Host', 'A machine on a network, or the name of one', '3'],
  ['HTTP / HTTPS', 'The web\'s request language, and its encrypted version', '2, 3'],
  ['IDE', 'An editor with tools for coding (Antigravity)', '1'],
  ['Image', 'A frozen, runnable package of an app and its dependencies', '3'],
  ['Immich', 'A self-hosted photo library', '3'],
  ['Injection (prompt)', 'Hostile instructions hidden in content an agent reads', '5'],
  ['IP address', 'A number that identifies a device on a network', '3'],
  ['Jellyfin', 'A self-hosted media server', '3'],
  ['JSON', 'A text format for structured data, used for config and API bodies', '2'],
  ['Kill switch', 'A fast way to stop an agent', '5'],
  ['Let\'s Encrypt', 'The free authority that issues HTTPS certificates', '3'],
  ['Local model', 'An open model running on your own machine', '5'],
  ['Localhost (127.0.0.1)', 'This computer, talking to itself', '2, 3'],
  ['Loop (agent)', 'Think, use a tool, look at the result, repeat', '5'],
  ['MCP', 'Model Context Protocol, a standard plug between AI and tools', '5'],
  ['Method (HTTP)', 'GET, POST, PUT, PATCH or DELETE: what to do', '2'],
  ['Model', 'The trained AI that produces answers', '4, 5'],
  ['Model switcher', 'Config that chooses which AI provider and model your app uses', '4'],
];

export default function StepS_7_GlossaryAM() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Glossary"
        title="Glossary, A to M"
        summary="Every term from the course in plain words, with the topic where you met it."
      />
      <Callout type="info" title="How to use this">
        Read the term, say what it means aloud, then check. The last column is the topic number where you can find the
        full lesson. N to Z continues in the next step.
      </Callout>
      <Section title="A to M" />
      <Table headers={['Term', 'Plain meaning', 'Topic']} rows={TERMS.map(([a, b, c]) => [<strong key={a}>{a}</strong>, b, c])} />
      <KeyTakeaways
        items={[
          'You do not need to memorise every word. You do need to recognise them and know where to look.',
          'If a term feels vague, reread the topic listed beside it.',
        ]}
      />
    </div>
  );
}
