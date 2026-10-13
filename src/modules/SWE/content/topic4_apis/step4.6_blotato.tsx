import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Exercise } from '../../../../components/content/Exercise';
import { TeachAI } from '../../../../components/content/TeachAI';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { SOCIAL_POSTING_SKILL } from '../../toolkit/tools_apis';

const BLUESKY_BODY = `{
  "post": {
    "accountId": "98432",
    "content": {
      "text": "Hello from my own app!",
      "mediaUrls": [],
      "platform": "bluesky"
    },
    "target": {
      "targetType": "bluesky"
    }
  }
}`;

const SCHEDULED_BODY = `{
  "post": {
    "accountId": "98432",
    "content": {
      "text": "Good morning! Posted automatically.",
      "mediaUrls": [],
      "platform": "bluesky"
    },
    "target": { "targetType": "bluesky" }
  },
  "scheduledTime": "2026-10-15T09:00:00-04:00"
}`;

const TIKTOK_TARGET = `"content": {
  "text": "A caption for the video",
  "mediaUrls": ["https://example.com/clip.mp4"],
  "platform": "tiktok"
},
"target": {
  "targetType": "tiktok",
  "privacyLevel": "SELF_ONLY",
  "disabledComments": false,
  "disabledDuet": false,
  "disabledStitch": false,
  "isBrandedContent": false,
  "isYourBrand": false,
  "isAiGenerated": true
}`;

const INSTAGRAM_TARGET = `"content": {
  "text": "A warm caption #newmenu",
  "mediaUrls": ["https://example.com/reel.mp4"],
  "platform": "instagram"
},
"target": {
  "targetType": "instagram",
  "mediaType": "reel"
}`;

export default function Step4_6_Blotato() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 4.6 • Posting"
        title="A Simple API: Posting With Blotato"
        summary="One API for publishing to many social platforms, and a first look at an API that is simple to use but strict about its rules."
      />

      <p>
        Posting to social media from code sounds easy and is not. Every platform runs its own API, with its own approval
        process, and many require a review before your app may post publicly. <strong>Blotato</strong> is an{' '}
        <strong>aggregator</strong>: a company that has already done that work with each platform, and offers you a single,
        simple API on top. You connect your own accounts once, and then one request can publish to Bluesky, Instagram,
        TikTok, X and more.
      </p>

      <Callout type="info" title="A real example of why this exists">
        Google&apos;s own YouTube upload API forces videos uploaded by an unreviewed app to be <strong>private</strong>.
        The upload succeeds and returns an ID with no error, but nobody can see the video until the app passes a compliance
        audit that can take weeks. Platform APIs are full of rules like this. An aggregator takes on that burden so you do
        not have to.
      </Callout>

      <Compare
        goodLabel="Through Blotato"
        badLabel="Direct to each platform"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>One key, one request shape</li>
            <li>You connect your accounts once in a settings page</li>
            <li>Scheduling and status tracking built in</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>A separate developer account and approval for each platform</li>
            <li>Some reviews take weeks, and some keep posts private until passed</li>
            <li>A different request format everywhere</li>
          </ul>
        }
      />

      <Section title="1. Account, plan and key" />
      <Callout type="warning" title="The API needs a paid plan">
        At the time of writing, Blotato&apos;s documentation says the API is <strong>not</strong> available on the free
        trial, and that generating an API key ends the trial and starts a paid Starter subscription. Check the current
        pricing before you click, and set a reminder to cancel if you only wish to experiment. The free alternatives are at
        the end of this step.
      </Callout>
      <Steps
        steps={[
          { title: 'Create a Blotato account', children: <p>At <code>blotato.com</code>.</p> },
          { title: 'Connect a test account first', children: <p>In the app&apos;s account settings connect <strong>Bluesky</strong>. It is free, text-only posts work, and a throw-away profile is perfect for testing. Add Instagram or TikTok later, when you trust your setup.</p> },
          { title: 'Generate the API key', children: <p>Go to <em>Accounts → API</em> and click <em>Generate API Key</em> (if you accept the plan). Copy it once.</p> },
          { title: 'Store it', children: <p>Add it to <code>backend/config/secrets.json</code> as <code>blotato_api_key</code>. Never paste it anywhere else.</p> },
        ]}
      />

      <Section title="2. The basics, from Blotato's documentation" />
      <Table
        headers={['Thing', 'Value']}
        rows={[
          ['Base URL', <code key="a">https://backend.blotato.com/v2</code>],
          ['Authentication', <span key="b">A header named <code>blotato-api-key</code> with your key</span>],
          ['Rate limit', '30 requests per minute on publishing'],
          ['List your accounts', <code key="c">GET /users/me/accounts</code>],
          ['Publish or schedule', <code key="d">POST /posts</code>],
          ['Check status', <code key="e">GET /posts/&#123;postSubmissionId&#125;</code>],
        ]}
      />
      <Callout type="tip" title="Docs can disagree. Trust the official page">
        While researching this lesson we found a blog post giving a different base URL and a different kind of key header.
        Blotato&apos;s own page says explicitly that the other address is not valid. When two sources disagree, the vendor&apos;s
        current reference wins. You will practise this in step 4.9.
      </Callout>

      <Section title="3. List your connected accounts" />
      <TerminalBlock
        path="~/Development/daily-poster"
        lines={[
          {
            command: 'curl -s https://backend.blotato.com/v2/users/me/accounts -H "blotato-api-key: $(jq -r .blotato_api_key backend/config/secrets.json)" | jq .',
            output: '{\n  "items": [\n    { "id": "98432", "platform": "bluesky", "username": "my-test.bsky.social" }\n  ]\n}',
          },
        ]}
      />
      <p>
        Each connected account has an <code>id</code>. You will use it as <code>accountId</code> when posting.
      </p>

      <Section title="4. Publish a text post" />
      <p>
        The body wraps everything in a <code>post</code> object: <em>who</em> (<code>accountId</code>), <em>what</em>{' '}
        (<code>content</code>) and <em>where</em> (<code>target</code>):
      </p>
      <CodeBlock language="json" title="Body for a Bluesky post" code={BLUESKY_BODY} />
      <TerminalBlock
        path="~/Development/daily-poster"
        lines={[
          {
            command: `curl -s -X POST https://backend.blotato.com/v2/posts -H "Content-Type: application/json" -H "blotato-api-key: $(jq -r .blotato_api_key backend/config/secrets.json)" -d @post.json`,
            output: '{ "postSubmissionId": "7f3c-…" }',
          },
        ]}
      />
      <p>
        (<code>-d @post.json</code> reads the body from a file, which is tidier for long JSON.) A <code>201</code> status
        only means Blotato <strong>accepted</strong> the request. The post is not necessarily live yet, so ask about its
        progress with the ID you were given:
      </p>
      <TerminalBlock
        path="~/Development/daily-poster"
        command={`curl -s https://backend.blotato.com/v2/posts/7f3c-… -H "blotato-api-key: $(jq -r .blotato_api_key backend/config/secrets.json)" | jq .`}
        output={'{ "status": "published", ... }'}
      />
      <p>Poll until it says <code>published</code> or <code>failed</code>. That is the polling idea from step 4.2.</p>
      <Callout type="warning" title="This posts for real">
        A publish request puts a real post on a real account. Use your throw-away test account, and keep the text harmless
        until you trust the flow.
      </Callout>

      <Section title="5. Schedule it" />
      <p>
        Add a <code>scheduledTime</code> at the <strong>top level</strong> of the body, outside <code>post</code>, in ISO format
        with a timezone offset. (Put it inside <code>post</code> and it is silently ignored.) Blotato then holds the post and
        publishes it at that time, so you do not need a scheduler of your own.
      </p>
      <CodeBlock language="json" title="A scheduled post" code={SCHEDULED_BODY} />
      <p>
        There is also <code>useNextFreeSlot</code>, which publishes at the next open slot in your Blotato posting schedule.
        Use one scheduling method at a time.
      </p>

      <Section title="6. Instagram and TikTok are stricter" />
      <p>
        Text-only posts work on Bluesky and X. <strong>Instagram and TikTok need media</strong>: <code>mediaUrls</code> must
        list <em>public</em> addresses of an image or video. And each platform has its own required <code>target</code> fields:
      </p>
      <CodeBlock language="json" title="Instagram reel (the content and target parts)" code={INSTAGRAM_TARGET} />
      <CodeBlock language="json" title="TikTok video (the content and target parts)" code={TIKTOK_TARGET} />
      <Callout type="warning" title="Be honest about AI content">
        TikTok&apos;s required fields include <code>isAiGenerated</code>, and flags for branded content. Set them
        truthfully. If media or content is AI-generated, say so. Platforms can penalise accounts that hide it, and honesty
        is simply right. Your app should default to asking you, not guessing.
      </Callout>
      <Table
        headers={['Platform', 'Needs media?', 'Special fields']}
        rows={[
          ['Bluesky, X (Twitter)', 'No. Text-only works', 'Just targetType'],
          ['Instagram', 'Yes (image, reel or story)', 'mediaType; a story cannot have a caption'],
          ['TikTok', 'Yes', 'privacyLevel, comment/duet/stitch flags, branded-content and AI-generated flags'],
          ['YouTube', 'Yes (video)', 'title, privacyStatus, shouldNotifySubscribers'],
        ]}
      />

      <Section title="Free ways to practise" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Bluesky directly:</strong> Bluesky has an open, free API, and an &quot;app password&quot; instead of your real one. Ask your AI helper to read Bluesky&apos;s developer documentation and post to a test account.</li>
        <li><strong>Self-host an open-source scheduler:</strong> projects such as Postiz offer a similar posting API you can run yourself on your homelab (Topic 3). Check its documentation and what each platform still requires.</li>
      </ul>

      <TeachAI kind="skill" name="social-posting" text={SOCIAL_POSTING_SKILL} />

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>401:</strong> the key header is missing, misspelled (<code>blotato-api-key</code>) or the key is wrong.</li>
          <li><strong>The post is accepted but never appears:</strong> poll its status. A <code>failed</code> status explains why, often missing media or a missing required field for that platform.</li>
          <li><strong>A scheduled post publishes immediately:</strong> <code>scheduledTime</code> was placed inside <code>post</code>. It belongs at the top level.</li>
          <li><strong>429:</strong> you passed 30 requests a minute. Wait and slow down.</li>
        </ul>
      </Collapsible>

      <Exercise
        title="Schedule a test post"
        hint={<p>Put <code>scheduledTime</code> ten minutes from now, with your timezone offset, at the top level. Then poll the returned ID.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li>List accounts and note your Bluesky test account&apos;s <code>id</code>.</li>
            <li>Write <code>post.json</code> with that <code>accountId</code>, harmless text, and a <code>scheduledTime</code> ten minutes ahead.</li>
            <li>POST it. Save the <code>postSubmissionId</code>.</li>
            <li>Poll the status until it says <code>published</code>, then check the account to confirm.</li>
          </ol>
        }
      >
        <p>Schedule a harmless text post to your test Bluesky account for ten minutes from now, then confirm that it appears.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="Why does an aggregator like Blotato exist?"
          options={['Platforms have no APIs', 'It handles each platform\'s approvals and gives you one simple API', 'It is free', 'It writes your posts']}
          correctIndex={1}
          explanation="Each platform has its own approval process. The aggregator does that once."
        />
        <Quiz
          question="A publish request returns 201. What does that tell you?"
          options={['The post is live', 'Blotato accepted it. Poll the status to learn if it published', 'The post failed', 'You were charged']}
          correctIndex={1}
          explanation="201 means accepted. Check the status for published or failed."
        />
        <Quiz
          question="Where does scheduledTime go?"
          options={['Inside post', 'At the top level of the body, outside post', 'In a header', 'In the URL']}
          correctIndex={1}
          explanation="Inside post it is ignored, so the post publishes immediately."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Blotato is an aggregator: one API in front of many platforms, so you skip each platform\'s approval process.',
          'Header blotato-api-key, base URL backend.blotato.com/v2, 30 requests a minute. The API needs a paid plan.',
          'Publish with POST /posts (accountId, content, target), then poll the status. 201 only means accepted.',
          'scheduledTime goes at the top level. Instagram and TikTok need public media and extra fields.',
          'Test on a throw-away account, and be honest about AI-generated content.',
        ]}
      />
    </div>
  );
}
