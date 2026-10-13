import React from 'react';
import { Terminal } from 'lucide-react';
import { CodeFrame } from './CodeFrame';

interface TerminalLine {
  command: string;
  output?: string;
  path?: string;
}

interface TerminalBlockProps {
  /** Single command (shorthand for `lines`). */
  command?: string;
  output?: string;
  path?: string;
  /** A multi-command session. */
  lines?: TerminalLine[];
}

const DEFAULT_PATH = '~/developer/workspace';

export const TerminalBlock: React.FC<TerminalBlockProps> = ({
  command,
  output,
  path = DEFAULT_PATH,
  lines,
}) => {
  const entries: TerminalLine[] = lines ?? [{ command: command ?? '', output, path }];

  return (
    <CodeFrame
      icon={<Terminal className="w-3.5 h-3.5 text-[#3fb950]" />}
      label="Terminal"
      copyText={entries.map((e) => e.command).join('\n')}
    >
      <div className="p-4 space-y-3 leading-relaxed">
        {entries.map((entry, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#7ee787] font-semibold">user@lms</span>
              <span className="text-[#8b949e]">:</span>
              <span className="text-[#79c0ff]">{entry.path ?? DEFAULT_PATH}</span>
              <span className="text-[#8b949e] font-bold">$</span>
              <span className="text-[#e6edf3] font-medium">{entry.command}</span>
            </div>
            {entry.output && (
              <div className="text-[#8b949e] whitespace-pre-wrap pl-2 border-l-2 border-[#30363d] text-[0.85rem]">
                {entry.output}
              </div>
            )}
          </div>
        ))}
      </div>
    </CodeFrame>
  );
};
