import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Collapsible } from '../../../../components/content/Collapsible';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_14_Scenarios() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Scenarios"
        title="Real-World Scenarios"
        summary="Eight situations that mix everything you learned. Think through each one before opening the answer."
      />
      <Callout type="tip" title="How to use these">
        Read the situation. Write down, in your own words, what you would do step by step, and which topic each step
        comes from. Then open the answer and compare. The point is the reasoning, not matching word for word.
      </Callout>

      <Section title="1. A friend wants a small booking site" />
      <p>
        Your friend runs a dog-walking business and wants a page where customers pick a time and leave their name. It
        should be live at walks.theirname.com by the weekend. Where do you start?
      </p>
      <Collapsible title="Show a good approach">
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>Sketch</strong> the page as rectangles. Write a spec: goal, actions (see slots, book one), screens, data (slots, bookings), rules (no double booking), done-when.</li>
          <li>Run <code>/plan</code>. Review against your rules. Confirm FastAPI, React, SQLite and the standard layout.</li>
          <li>Build, then start with <code>system.sh</code>. Test booking in the browser and in Swagger. Add a test that double booking is refused.</li>
          <li>Containerise, add a Cloudflare record, an nginx site and a certificate for the new name. Push, and let the pipeline deploy.</li>
          <li>Use the Tailscale-only setup first. Going public is a deliberate extra step, with HTTPS and the backups in place.</li>
        </ol>
      </Collapsible>

      <Section title="2. The disk is 95% full" />
      <p>The server is slow and your deploy failed with "no space left on device". What do you do?</p>
      <Collapsible title="Show a good approach">
        <ol className="list-decimal pl-5 space-y-1">
          <li><code>df -h</code> to confirm which disk. <code>sudo du -sh /var/* | sort -h</code> to find the heavy folder.</li>
          <li>Often it is Docker: <code>docker system df</code>, then <code>docker image prune -f</code>. Do not prune volumes without checking what is in them.</li>
          <li>Check logs: <code>journalctl --disk-usage</code>, and trim if large.</li>
          <li>Check your backup folder is not stacking copies forever. Add a retention rule.</li>
          <li>Re-run the deploy. Add a note to check disk monthly.</li>
        </ol>
      </Collapsible>

      <Section title="3. The API bill doubled overnight" />
      <p>Your daily poster should cost a few cents. This morning the provider shows a much larger charge.</p>
      <Collapsible title="Show a good approach">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Follow Runbook 2: stop the job, pause or revoke the key.</li>
          <li>Read the logs. Was the job retrying in a loop? Did the model setting change to a pricier one? Did a key leak?</li>
          <li>Fix the cause. Add or lower the in-app cap and a maximum retry count.</li>
          <li>Switch to the cheapest model while you re-test. Set the cap tiny and confirm it blocks.</li>
          <li>Set a provider-side spending limit as a second seatbelt.</li>
        </ol>
      </Collapsible>

      <Section title="4. You want to add Immich for family photos" />
      <p>Where do the photos go, how do you reach it, and how do you keep it safe?</p>
      <Collapsible title="Show a good approach">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Give it its own folder with the official compose file. Put the photo library on the disk with space.</li>
          <li>Bind its port to <code>127.0.0.1</code>. Add a Cloudflare record (DNS only) for photos.yourdomain, an nginx site and use your wildcard certificate.</li>
          <li>Reach it over Tailscale. Do not expose it publicly unless you have strong authentication and updates planned.</li>
          <li>Back up the library and the database dump with 3-2-1. Test a restore of a few photos.</li>
        </ol>
      </Collapsible>

      <Section title="5. Someone sends you a script to run" />
      <p>A helpful stranger on a forum says: paste this one line into your terminal and your problem is solved.</p>
      <Collapsible title="Show a good approach">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Do not run it. Copy it to a file or a chat and ask your AI to explain, line by line, what it does.</li>
          <li>Be especially wary of <code>curl ... | sudo bash</code>, base64 blobs, and anything that disables security.</li>
          <li>If it is still needed, run it in a throwaway environment first, never on your server or with sudo.</li>
        </ol>
      </Collapsible>

      <Section title="6. The AI proposes a plan with a new database and a .env file" />
      <p>You asked for a notes app. The plan includes PostgreSQL, a .env file and a Node backend.</p>
      <Collapsible title="Show a good approach">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Reject it against your checklist: SQLite in data/, JSON config, FastAPI.</li>
          <li>Comment on the plan with exactly what to change, and why, and ask for it to be redone.</li>
          <li>If this keeps happening, strengthen the stack rule so the next plan starts right.</li>
        </ol>
      </Collapsible>

      <Section title="7. You want an agent to tidy your downloads folder" />
      <p>It sounds harmless. How do you delegate it safely?</p>
      <Collapsible title="Show a good approach">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Write a brief: goal (sort by file type into subfolders), done-when, the one folder it may touch, and never-do (delete, or touch anything outside it).</li>
          <li>Start read-only: ask for a plan of moves first, not the moves.</li>
          <li>Approve moves manually at first. Keep a copy or dry-run before any change.</li>
          <li>Cap steps and time. Check the log afterwards.</li>
        </ol>
      </Collapsible>

      <Section title="8. A new laptop" />
      <p>Your computer dies. You get a new one. How long until you are working again?</p>
      <Collapsible title="Show a good approach">
        <ol className="list-decimal pl-5 space-y-1">
          <li>Install WSL and your IDE (Topic 1). Unzip your toolkit and run <code>bash install.sh</code>. Rules, skills, aliases and config return.</li>
          <li>Create a new SSH key, add it to GitHub and to the server, and put the config back.</li>
          <li>Clone your repos. Create <code>secrets.json</code> files from your password manager or by regenerating keys.</li>
          <li>Run <code>system.sh --start all</code>. You are back, in an afternoon.</li>
        </ol>
      </Collapsible>

      <KeyTakeaways
        items={[
          'Real problems blend topics. The method stays the same: describe, review, limit.',
          'When unsure, make it smaller, read-only, cheaper and reversible first.',
          'Your toolkit and your repos mean a lost computer is an inconvenience, not a disaster.',
        ]}
      />
    </div>
  );
}
