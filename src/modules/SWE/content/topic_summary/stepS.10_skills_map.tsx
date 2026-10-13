import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_10_SkillsMap() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Rules & Skills"
        title="Your Skills and Templates Map"
        summary="What each saved rule, skill and template does, when your AI uses it, and when to improve it."
      />

      <Section title="Rules versus skills" />
      <Table
        headers={['', 'Rule', 'Skill']}
        rows={[
          [<strong key="a">When it applies</strong>, 'Always, in every conversation', 'Only when its description matches the task'],
          [<strong key="b">Good for</strong>, 'Your stack and standards that never change', 'A procedure for one kind of work'],
          [<strong key="c">Lives in</strong>, '~/.gemini/config/rules/', '~/.gemini/config/skills/NAME/SKILL.md'],
          [<strong key="d">Cost</strong>, 'Always uses a little of the AI\'s attention', 'Costs nothing until it is needed'],
        ]}
      />

      <Section title="The 18 skills" />
      <Table
        headers={['Skill', 'Use it when you ask the AI to...', 'Topic']}
        rows={[
          ['fullstack-architecture', 'Create a project, or add a folder or file. It knows the layout and the 7 READMEs', '2'],
          ['website-design', 'Design pages or sections. It thinks in nested boxes and suggests 21st.dev', '2'],
          ['react-frontend', 'Write any frontend code: one component per file, Tailwind v4, TypeScript', '2'],
          ['fastapi-backend', 'Write any backend code: JSON config, endpoints, SQLite in data/', '2'],
          ['system-script', 'Change how the app starts, stops or tests', '2'],
          ['testing', 'Add or run tests in the three layers', '2'],
          ['git-workflow', 'Commit or push: small commits, no secrets', '3'],
          ['docker-deploy', 'Containerise: Dockerfiles, compose, ports, volumes', '3'],
          ['nginx-proxy', 'Add a hostname, HTTPS, or the /api proxy', '3'],
          ['selfhosted-apps', 'Install Immich, Jellyfin, Nextcloud or similar safely', '3'],
          ['ci-cd-deploy', 'Write or fix the deploy workflow', '3'],
          ['external-apis', 'Call any outside API: read docs first, keys in secrets.json', '4'],
          ['google-oauth', 'Connect Google with OAuth', '4'],
          ['llm-providers', 'Add an AI provider or the model switcher', '4'],
          ['social-posting', 'Post or schedule through Blotato', '4'],
          ['mcp-servers', 'Find, vet and configure MCP servers', '5'],
          ['agent-safety', 'Build or run an agent: limits, approvals, kill switch', '5'],
          ['local-models', 'Run open models with Ollama and add them to the switcher', '5'],
        ]}
      />

      <Section title="Templates in the toolkit" />
      <Table
        headers={['Template', 'Use it for']}
        rows={[
          ['spec-template', 'Starting any new feature or project description'],
          ['stack', 'Your always-on rule: the fixed technology choices'],
          ['bash_aliases / wslconfig / ssh-config', 'Setting up a new machine'],
          ['gitignore', 'Every new project, before the first commit'],
          ['Dockerfiles, dockerignores, compose files', 'Containerising frontend and backend'],
          ['deploy-yml', 'The test-then-deploy pipeline'],
          ['nginx-template, nginx-app-site, cloudflare-ini', 'Names, routing and certificates'],
          ['jellyfin-compose, nextcloud-compose', 'Self-hosted apps'],
          ['secrets-example, config-with-models', 'The JSON config shapes for backends'],
          ['content-calendar, daily-poster-spec', 'The social poster project'],
          ['task-brief, agent-safety-checklist', 'Before delegating to any agent'],
          ['antigravity-mcp-config, agent-lab-spec, ollama-adapter-spec, assistant-brief', 'The agent projects'],
          ['hermes-config, hermes-env', 'A self-hosted agent on the homelab'],
        ]}
      />

      <Callout type="tip" title="Improving them is the real skill">
        When the AI repeats a mistake, do not just correct it in chat. Ask: "Which rule or skill should have prevented
        this?" Then edit the file. Fix the instruction, and the mistake stops forever.
      </Callout>

      <QuizSet title="Skills Check">
        <Quiz
          question="The AI keeps writing two components in one file. What is the best fix?"
          options={['Keep telling it each time', 'Strengthen the react-frontend skill or the stack rule', 'Switch to another editor', 'Ignore it']}
          correctIndex={1}
          explanation="A rule or skill remembers for you in every future conversation."
        />
        <Quiz
          question="Which is better as a rule than as a skill?"
          options={['How to set up nginx', 'The fixed technology stack', 'How to write a deploy workflow', 'How to run Ollama']}
          correctIndex={1}
          explanation="Things that are always true belong in an always-on rule."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Rules are always on. Skills load when needed.',
          'Each skill matches a kind of work, so a good description is what makes it fire.',
          'Templates are starting points you copy, then adapt.',
          'Improve the file, not just the conversation.',
        ]}
      />
    </div>
  );
}
