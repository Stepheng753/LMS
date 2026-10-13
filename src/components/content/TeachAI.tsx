import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Tabs } from './Tabs';
import { Steps } from './Steps';
import { CodeBlock } from './CodeBlock';
import { TerminalBlock } from './TerminalBlock';
import { Collapsible } from './Collapsible';

interface TeachAIProps {
  /** A rule is always-on guidance; a skill is a repeatable capability loaded on demand. */
  kind: 'skill' | 'rule';
  /** Lowercase-with-hyphens name. Used for the folder (skill) or file (rule). */
  name: string;
  /** Full file contents, including the frontmatter. */
  text: string;
  /** Shown when the learner is replacing a version they saved earlier. */
  isUpdate?: boolean;
}

const GLOBAL = '~/.gemini/config';
const CLI = '~/.gemini/antigravity-cli';

// "Teach it to your AI": how to save a rule or skill globally, with the text to paste.
export const TeachAI: React.FC<TeachAIProps> = ({ kind, name, text, isUpdate }) => {
  const isSkill = kind === 'skill';
  const dir = isSkill ? `${GLOBAL}/skills/${name}` : `${GLOBAL}/rules`;
  const file = isSkill ? `${dir}/SKILL.md` : `${dir}/${name}.md`;
  const cliDir = isSkill ? `${CLI}/skills` : `${CLI}/rules`;
  const label = isSkill ? 'skill' : 'rule';

  return (
    <div className="my-8 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-primary">
        <GraduationCap className="w-4 h-4" />
        Teach it to your AI
      </div>
      <div className="p-5 space-y-3 text-sm text-foreground/85">
        <p>
          {isUpdate ? 'Replace your saved' : 'Save this as a'} global {label} named <code>{name}</code>.{' '}
          {isUpdate
            ? 'Same steps as before. The new text overwrites the old.'
            : 'Every project you start from now on will follow it.'}
        </p>

        <Tabs
          tabs={[
            {
              label: 'Customizations panel',
              content: (
                <Steps
                  steps={[
                    { title: 'Open Customizations', children: <p>In Antigravity, open the <strong>…</strong> menu at the top of the agent panel and choose <em>Customizations</em>.</p> },
                    { title: `Open the ${isSkill ? 'Skills' : 'Rules'} tab and click + Global`, children: <p>Name it <code>{name}</code>.</p> },
                    { title: 'Paste the text below and save', children: <p>Paste everything, including the lines between the <code>---</code> marks.</p> },
                  ]}
                />
              ),
            },
            {
              label: 'Terminal',
              content: (
                <>
                  <TerminalBlock
                    lines={[
                      { path: '~', command: `mkdir -p ${dir}` },
                      { path: '~', command: `nano ${file}` },
                    ]}
                  />
                  <p>Paste the text below into nano, then <code>Ctrl+O</code>, <code>Enter</code>, <code>Ctrl+X</code>.</p>
                </>
              ),
            },
          ]}
        />

        <CodeBlock language="markdown" title={file} code={text} />

        <Collapsible title="Let Agy see it too" className="mt-2">
          <p>
            The Agy command-line tool reads its own global folder. Copy yours across with the commands from step 1.7:
          </p>
          <TerminalBlock
            lines={[
              { path: '~', command: `mkdir -p ${cliDir}` },
              { path: '~', command: isSkill ? `cp -r ${dir} ${cliDir}/` : `cp ${file} ${cliDir}/` },
            ]}
          />
        </Collapsible>

        <p>
          <strong>Check it worked:</strong> start <code>agy</code> and ask{' '}
          <em>&quot;Which {isSkill ? 'skills' : 'rules'} can you see? Is {name} one of them?&quot;</em>
        </p>
      </div>
    </div>
  );
};
