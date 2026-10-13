import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { Flow } from '../../../../components/content/Flow';

export default function Step3_12_Containers() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.12 • Docker"
        title="Containers: The Idea"
        summary="Why almost every modern app is shipped in a container, and the four words you need to understand them."
      />

      <p>
        Have you ever heard &quot;it works on my machine&quot;? The app runs on the developer&apos;s computer and fails on
        yours, because of a different Python version, a missing library, or a different setting. A{' '}
        <Term definition="A packaged, isolated mini-environment that holds an app plus everything it needs to run, so it behaves the same anywhere.">container</Term>{' '}
        solves this by packing the app <em>and everything it needs</em> into one sealed unit that behaves the same on any
        machine. Like a shipping container, it does not matter what is on the ship: the box is the same.
      </p>

      <Section title="Four words" />
      <Table
        headers={['Word', 'Meaning', 'Analogy']}
        rows={[
          [<strong key="a">Image</strong>, 'A frozen template of an app and its environment. It does not run', 'A recipe, or a cake mix'],
          [<strong key="b">Container</strong>, 'A running copy made from an image', 'A cake baked from the recipe. You can bake many'],
          [<strong key="c">Dockerfile</strong>, 'A short text file of instructions for building an image', 'The recipe card'],
          [<strong key="d">Volume</strong>, 'A folder on the real machine that a container is allowed to use', 'A shelf outside the oven where results are kept'],
        ]}
      />
      <Flow
        steps={[
          { title: 'Dockerfile', sub: 'the instructions' },
          { title: 'Image', sub: 'the sealed template', via: 'build' },
          { title: 'Container', sub: 'the running app', accent: true, via: 'run' },
        ]}
      />

      <Section title="Isolation: a container has its own filesystem" />
      <p>
        Inside a container, the app sees its own private set of folders and cannot see your server&apos;s files unless you
        specifically allow it. That is good for safety and for keeping versions apart: one container can run old Python,
        another new Python, side by side.
      </p>
      <Callout type="warning" title="Containers forget">
        When a container is deleted, <strong>everything written inside it is lost</strong>. Containers are meant to be
        thrown away and recreated, which is how you update them. So anything that must survive (a database, uploaded photos,
        settings) is stored outside, in a <strong>volume</strong>, a folder on the real machine that is mounted into the
        container.
      </Callout>
      <Compare
        goodLabel="Data in a volume"
        badLabel="Data inside the container"
        good={<p>Delete and recreate the container. The database is still on the server, and the new container picks it up.</p>}
        bad={<p>Delete the container to update it. All your data disappears with it.</p>}
      />

      <Section title="Ports: opening a door in the box" />
      <p>
        A container&apos;s inside is sealed, so by default nothing can reach it. You publish a port to open one door,
        written <code>host:container</code>. For example <code>8000:8000</code> means &quot;connections to port 8000 on the
        server go to port 8000 inside the container&quot;. You will see this again, with an important twist about{' '}
        <code>127.0.0.1</code>, in step 3.14.
      </p>

      <Section title="Containers vs virtual machines" />
      <Table
        headers={['', 'Virtual machine', 'Container']}
        rows={[
          ['What it includes', 'A whole pretend computer with its own operating system', 'Just the app and its libraries; shares the host’s kernel'],
          ['Size', 'Gigabytes', 'Often tens of megabytes'],
          ['Start time', 'Minutes', 'Seconds'],
          ['Good for', 'Running different operating systems', 'Running many apps cleanly on one machine'],
        ]}
      />

      <Section title="Why we use them" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Same everywhere:</strong> your app runs identically on the server and, if you ever move, the next one.</li>
        <li><strong>Easy updates and rollbacks:</strong> replace the container, keep the data.</li>
        <li><strong>Clean:</strong> no libraries scattered across the server.</li>
        <li><strong>The standard way apps ship:</strong> Immich, Jellyfin and Nextcloud all publish ready-made containers.</li>
      </ul>

      <Exercise
        title="Predict what happens"
        hint={<p>Think about which folder is a volume and which is inside the container.</p>}
        solution={
          <p>
            The note in <code>/app/data</code> survives, because that folder is a volume stored on the server. The note in{' '}
            <code>/tmp</code> is gone, because it lived inside the old container, which was deleted.
          </p>
        }
      >
        <p>
          A container mounts the server&apos;s <code>./data</code> as <code>/app/data</code>. It writes a note to{' '}
          <code>/app/data/note.txt</code> and another to <code>/tmp/note.txt</code>. You delete the container and start a
          new one from the same image. Which note still exists?
        </p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="What is the difference between an image and a container?"
          options={['None', 'An image is a template, a container is a running copy of it', 'An image runs, a container does not', 'An image is smaller']}
          correctIndex={1}
          explanation="Think recipe and cake. You can bake many cakes from one recipe."
        />
        <Quiz
          question="Where should a database live so that it survives replacing a container?"
          options={['Inside the container', 'In a volume on the host', 'In the Dockerfile', 'Nowhere']}
          correctIndex={1}
          explanation="Anything inside a container is lost when it is deleted. Volumes are on the host."
        />
        <Quiz
          question="What does -p 8000:8000 mean?"
          options={['Pause for 8000 seconds', 'Connections to host port 8000 go to container port 8000', 'Use 8000 MB of memory', 'Print 8000 lines']}
          correctIndex={1}
          explanation="Format: host port, then container port."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A container packs an app with everything it needs, so it runs the same anywhere.',
          'Dockerfile → (build) → image → (run) → container.',
          'Containers forget everything inside them. Keep data in volumes on the host.',
          'Ports are published as host:container. Docker is how Immich, Jellyfin and Nextcloud ship.',
        ]}
      />
    </div>
  );
}
