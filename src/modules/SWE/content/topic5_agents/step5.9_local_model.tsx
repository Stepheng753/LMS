import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { LOCAL_MODELS_SKILL, OLLAMA_ADAPTER_SPEC } from '../topic_toolkit/tools/tools_agents';

export default function Step5_9_LocalModel() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 5.9 • Autonomous Agents"
        title="Hands-On: Run a Model on Your Own Computer"
        summary="Install Ollama, run a small open model, talk to it from the terminal and over its API, and add it to your Daily Poster's model switcher."
      />

      <p>
        <strong>Ollama</strong> is a free tool that downloads open models and runs them with one command. It also starts a
        small server on your computer that apps can talk to, which is how your Daily Poster will use it. The goal here is
        a <strong>small model that most computers can run</strong>, so you can feel the difference from a cloud model.
      </p>

      <Callout type="info" title="This is a feel-it-yourself step">
        You do not need a powerful machine for this. A small model runs on most modern computers, slowly on weak ones. If
        your computer simply cannot manage it, read the steps and skip the install, and nothing later depends on it.
      </Callout>

      <Section title="1. Check what you have" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Windows:</strong> open Task Manager → Performance. Look for a GPU entry and its <em>dedicated GPU memory</em>. Also note your total RAM.</li>
        <li><strong>In WSL with an NVIDIA card:</strong> <code>nvidia-smi</code> may list it. If it does not, that does not mean you lack a card, only that WSL cannot see it.</li>
        <li><strong>Mac:</strong> note the unified memory. Models share it.</li>
      </ul>
      <p>Compare with the table in step 5.7. For the first try, use a small model, such as the one in Ollama&apos;s own quickstart.</p>

      <Section title="2. Install Ollama" />
      <Steps
        steps={[
          { title: 'Download it', children: <p>From <code>ollama.com/download</code>. On Windows, installing the normal Windows app is the easiest way to use your graphics card. (The page also covers macOS and Linux.)</p> },
          { title: 'Check it is running', children: <TerminalBlock path="~" command="curl -s http://localhost:11434" output="Ollama is running" /> },
        ]}
      />
      <Callout type="warning" title="Keep it private">
        Ollama normally listens only on your own computer, at <code>localhost</code>. <strong>Leave it that way.</strong>{' '}
        If you ever change its settings so other machines can reach it, anyone who can reach it can use your computer to
        run models, with no password.
      </Callout>
      <Callout type="info" title="WSL can usually reach it">
        If Ollama runs on Windows, your WSL terminal can normally call it at <code>localhost</code> too, thanks to the
        mirrored networking you turned on in step 1.2. If it cannot, ask your AI helper to check your WSL networking.
      </Callout>

      <Section title="3. Pull and chat" />
      <TerminalBlock
        path="~"
        lines={[
          { command: 'ollama pull gemma4:e2b', output: 'pulling manifest ... success' },
          { command: 'ollama run gemma4:e2b', output: '>>> Send a message (/? for help)' },
        ]}
      />
      <p>
        <code>pull</code> downloads the model (a few gigabytes, so it takes a while). <code>run</code> starts a chat. Type a
        question. To leave, type <code>/bye</code>. (The model name comes from Ollama&apos;s own quickstart at the time of
        writing. Browse the Ollama library for others, and use a smaller or larger one to suit your memory.)
      </p>
      <p>Ask it the same thing you asked a cloud model in step 4.7: <em>&quot;Write a friendly 1-sentence post about a 14°C morning with a light wind.&quot;</em> Notice how long it takes.</p>

      <Section title="4. Talk to its API" />
      <p>
        Ollama speaks the same <strong>OpenAI-compatible</strong> language that many tools understand, at a fixed address:
      </p>
      <Table
        headers={['What', 'Address']}
        rows={[
          ['Base address', <code key="a">http://localhost:11434</code>],
          ['Native chat', <code key="b">/api/chat</code>],
          ['OpenAI-compatible chat', <code key="c">/v1/chat/completions</code>],
        ]}
      />
      <TerminalBlock
        path="~"
        command={`curl -s http://localhost:11434/v1/chat/completions -H "Content-Type: application/json" -d '{"model": "gemma4:e2b", "messages": [{"role": "user", "content": "Write a friendly 1-sentence post about a 14C morning."}]}' | jq -r '.choices[0].message.content'`}
        output="Good morning, everyone! A crisp 14°C is a perfect start to the day."
      />
      <p>
        Notice what is <em>missing</em>: no key, no header for authentication, no bill. It is your own computer. That
        shared &quot;OpenAI-compatible&quot; shape is also how agents like Hermes connect to local models.
      </p>

      <Section title="5. Compare it with the cloud" />
      <Table
        headers={['', 'Local model', 'Cloud (e.g. Haiku 5.5)']}
        rows={[
          ['Time to answer', '?', '?'],
          ['Quality of the post (1 to 5)', '?', '?'],
          ['Followed the length limit?', '?', '?'],
          ['Cost', '$0', 'A fraction of a cent'],
          ['Needed an internet connection?', 'No', 'Yes'],
        ]}
      />
      <p>Fill it in with your own results. Try a harder prompt too, such as one with several instructions. You will often see the gap open up.</p>

      <Section title="6. Add it to your model switcher" />
      <p>
        This is where the Topic 4 work pays off. Your switcher already has an interface and adapters. A local model is{' '}
        <strong>one more adapter</strong>. Save the skill first, then open your <code>daily-poster</code> project and spec
        the change:
      </p>
      <TeachAI kind="skill" name="local-models" text={LOCAL_MODELS_SKILL} />
      <CodeBlock language="markdown" title="Spec: add Ollama to the switcher" code={OLLAMA_ADAPTER_SPEC} />
      <Table
        headers={['Plan review: check', 'Why']}
        rows={[
          ['The address comes from config.json, not code', 'Keep settings in config'],
          ['It follows the same interface as the other adapters', 'The rest of the app must not care which provider ran'],
          ['The model is labelled local, free and on-computer, tier "local"', 'You can see at a glance what you picked'],
          ['A longer timeout for the local tier', 'Local models are slower'],
          ['If Ollama is stopped, it shows as unavailable, never a crash', 'The app should cope when the computer is busy or the tool is off'],
          ['Usage is still recorded', 'Tokens are still useful to see, even at $0'],
          ['Tests use a fake adapter', 'Tests must not depend on Ollama running'],
        ]}
      />
      <p>
        Run it, pick the local model in Settings, and regenerate a draft. Compare it with the cloud drafts you saw in step
        4.13. You now have a <strong>hybrid</strong>: cloud models for quality, a local model for free and private drafts.
      </p>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>It is extremely slow:</strong> the model is too big for your memory and has spilled onto the ordinary processor. Try a smaller model.</li>
          <li><strong>&quot;model not found&quot;:</strong> the name must match exactly what you pulled. Check with <code>ollama list</code>.</li>
          <li><strong>The connection is refused from WSL:</strong> Ollama is not running, or WSL cannot see Windows&apos;s localhost. Check <code>wslinfo --networking-mode</code> says <code>mirrored</code>.</li>
          <li><strong>The disk fills up:</strong> models are large. Remove ones you do not use with <code>ollama rm &lt;name&gt;</code>.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="What address does Ollama's local API use?"
          options={['https://ollama.com', 'http://localhost:11434', 'http://localhost:8000', 'https://api.openai.com']}
          correctIndex={1}
          explanation="Ollama runs on your own machine at port 11434, and normally listens only locally."
        />
        <Quiz
          question="What does a local model call cost in money?"
          options={['The same as a cloud one', 'Nothing per call (just electricity), but it uses your hardware', 'Double', 'It needs a subscription']}
          correctIndex={1}
          explanation="No per-token bill. You pay with hardware, power and speed."
        />
        <Quiz
          question="Why should you not let other machines reach your Ollama?"
          options={['It would slow down the internet', 'Anyone who could reach it could use your computer to run models, with no password', 'It is illegal', 'It deletes the models']}
          correctIndex={1}
          explanation="There is no authentication by default. Keep it on localhost."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Ollama downloads and runs open models: ollama pull <name>, ollama run <name>, and a local API at localhost:11434.',
          'Its OpenAI-compatible endpoint (/v1/chat/completions) needs no key. Keep it bound to your own computer.',
          'Compare speed and quality yourself. Local is free per call but limited by your hardware.',
          'A local model is one more adapter in your switcher, giving you a hybrid of cloud quality and local privacy.',
        ]}
      />
    </div>
  );
}
