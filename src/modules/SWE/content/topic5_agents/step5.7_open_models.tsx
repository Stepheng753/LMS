import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Term } from '../../../../components/content/Term';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_7_OpenModels() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 5.7 • Autonomous Agents"
        title="Open-Source Models"
        summary="Models you can download and run yourself. What that really means, the vocabulary, and what it takes to run one."
      />

      <p>
        Every model you used in Topic 4 lived on a company&apos;s servers. You sent text over the internet and paid per
        token. There is another kind: <strong>open models</strong> that you can download as a file and run on your own
        computer. Nothing leaves your machine, there is no per-token bill, and nobody can switch it off.
      </p>

      <Section title="Open-source or open-weight?" />
      <Table
        headers={['Term', 'Meaning']}
        rows={[
          [<strong key="a">Open weights</strong>, 'The model\'s trained numbers (its "weights") are published, so you can download and run it. This is what most people mean'],
          [<strong key="b">Open source</strong>, 'Strictly, the training code and data are published too. Few big models go that far'],
          [<strong key="c">Closed / proprietary</strong>, 'Only available through the owner\'s API or app (the Claude, GPT and Gemini models you used)'],
        ]}
      />
      <Callout type="info" title="Read the licence">
        Open does not mean &quot;do anything you like&quot;. Some models use a permissive licence such as Apache 2.0 (OpenAI&apos;s
        gpt-oss models are an example). Other popular families use their own custom licences with conditions, for example on
        commercial use or large companies. Read the licence on the model&apos;s page before you build something on it.
      </Callout>

      <Section title="The popular families (as of October 2026)" />
      <Table
        headers={['Family', 'Maker', 'Notes']}
        rows={[
          ['Qwen', 'Alibaba', 'Many sizes from tiny to huge. Often the default local choice, including efficient "mixture of experts" versions'],
          ['Gemma', 'Google', 'Strong single-computer models, with multimodal (image) versions'],
          ['gpt-oss', 'OpenAI', 'Apache 2.0 licensed, in a smaller and a larger size, aimed at reasoning and tool use'],
          ['Llama', 'Meta', 'A long-running family. The biggest versions need serious hardware'],
        ]}
      />
      <p>
        New versions appear every few weeks, and rankings change. Treat any list, including this one, as a starting point,
        and look at the current model pages. You will use two places:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Hugging Face:</strong> the big public library of models, with descriptions, licences and discussion.</li>
        <li><strong>The Ollama library:</strong> ready-to-run versions of popular models, which you will use in step 5.9.</li>
      </ul>

      <Section title="The vocabulary of size" />
      <Table
        headers={['Word', 'Meaning', 'Why you care']}
        rows={[
          [<Term key="a" definition="The number of values the model learned, written like 7B for 7 billion. More parameters usually means more capable, and much more memory.">Parameters</Term>, 'Written 4B, 8B, 27B, 70B: billions of learned numbers', 'Roughly, bigger is smarter and hungrier'],
          [<Term key="b" definition="Storing a model's numbers with less precision so it takes less memory, often with a small loss of quality. Written like Q4 for 4-bit.">Quantization</Term>, 'Shrinking the numbers to fit in less memory. Q4 is a common middle choice', 'A 27B model that needs 54 GB at full size can fit in roughly a quarter of that at Q4'],
          [<Term key="c" definition="A model made of many 'experts' where only a few are used for each word, so it is fast for its size.">Mixture of experts (MoE)</Term>, 'A big model where only a small part is active at once', 'Faster than its total size suggests, but you still need memory for all of it'],
          [<strong key="d">Context length</strong>, 'How much text it can hold in mind at once', 'Longer context needs more memory, so a model that fits may fail on a long prompt'],
          [<strong key="e">Tool calling</strong>, 'Whether it can reliably ask for tools (the loop from step 5.1)', 'Essential for agents. Not every model does it well'],
        ]}
      />

      <Section title="What it takes to run one" />
      <p>
        The key resource is <strong>memory</strong>: ideally the dedicated memory on a graphics card (VRAM). If the model
        does not fit, it either will not run or will run very slowly on the ordinary processor. These are{' '}
        <strong>rough planning numbers</strong> for models at Q4. Guides disagree, and the exact figure depends on the
        model and its context, so always check the download size on the model&apos;s page:
      </p>
      <Table
        caption="Rough guide: memory (VRAM) and what typically fits"
        headers={['Memory', 'What typically fits', 'Good for']}
        rows={[
          ['About 8 GB', 'Small models (roughly 4B to 9B parameters)', 'Chat, summaries, simple tasks. Weak at long, multi-step agent work'],
          ['12 to 16 GB', 'Medium models, such as a 20B-class model like gpt-oss-20b', 'A capable general assistant, and light agent use'],
          ['24 GB', '27B to 32B-class models', 'The most popular tier for serious local use'],
          ['48 GB or more', '70B-class models', 'Strong local quality, at real cost'],
          ['80 GB or more', 'The largest open models', 'Workstation or server hardware'],
        ]}
      />
      <Callout type="warning" title="Your old laptop server is probably not the machine for this">
        Without a graphics card, a model runs on the ordinary processor and system memory. It works for small models, but
        slowly. A Mac with plenty of shared memory, or a PC with a decent graphics card, is a far better place to start. Check
        what your own computer has before you plan anything.
      </Callout>

      <Section title="How good are they?" />
      <Compare
        goodLabel="Where open models do well"
        badLabel="Where they struggle"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>Simple tasks: summaries, rewriting, classification, short posts</li>
            <li>Privacy-sensitive work, since nothing leaves your machine</li>
            <li>High-volume, low-stakes jobs where per-token cost would add up</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>Hard reasoning and long, multi-step agent tasks</li>
            <li>Reliable tool use over many steps. Smaller models make more mistakes</li>
            <li>The very latest capabilities. Frontier cloud models usually lead</li>
          </ul>
        }
      />
      <p>
        The gap shrinks over time, and the best open models are very good. But for agents, where small errors compound
        over many steps, model quality matters a lot, and that is the main reason many people use a cloud model as the brain
        and keep open models for the simpler or more private jobs.
      </p>

      <Exercise
        title="Will it fit?"
        hint={<p>Match the model size to the memory tiers in the table. Remember context length needs extra room.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li>8 GB card, 7B model: <strong>yes</strong>, with a little room.</li>
            <li>8 GB card, 27B model: <strong>no</strong>. Even at Q4 it needs around 17 GB or more.</li>
            <li>24 GB card, 27B model at Q4: <strong>yes</strong>, comfortably.</li>
            <li>16 GB card, 70B model: <strong>no</strong>. Roughly 40 GB or more is needed.</li>
          </ol>
        }
      >
        <p>Decide whether each is likely to fit: (1) an 8 GB graphics card and a 7B model at Q4. (2) 8 GB and a 27B model. (3) 24 GB and a 27B model at Q4. (4) 16 GB and a 70B model.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What does 'open-weight' mean?"
          options={['The model is free of bugs', 'The trained model files are published so you can download and run them', 'It runs only online', 'It has no licence']}
          correctIndex={1}
          explanation="You get the weights. Training code and data may or may not be published, and the licence still applies."
        />
        <Quiz
          question="What does quantization do?"
          options={['Makes the model smarter', 'Stores the numbers with less precision to save memory, with a small quality cost', 'Connects it to the internet', 'Adds tools']}
          correctIndex={1}
          explanation="A 4-bit (Q4) version takes roughly a quarter of the memory of full size."
        />
        <Quiz
          question="Why might a model that fits your memory still fail?"
          options={['The licence', 'Long prompts need extra memory for context', 'The wrong colour theme', 'Its name is too long']}
          correctIndex={1}
          explanation="Context length uses memory too, so a model that just fits may run out on long prompts."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Open-weight models can be downloaded and run on your own machine. Nothing leaves it and there is no per-token bill.',
          'Read the licence: some are permissive (Apache 2.0), others have conditions.',
          'Size vocabulary: parameters, quantization (Q4), mixture of experts, context length and tool calling.',
          'Memory (VRAM) decides what runs: about 8 GB small, 16 GB medium, 24 GB the sweet spot, 48 GB or more for 70B-class.',
          'Open models are great for simple, private or high-volume jobs. For hard multi-step agent work, the strongest cloud models usually lead.',
        ]}
      />
    </div>
  );
}
