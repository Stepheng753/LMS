import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeFrameProps {
  icon: React.ReactNode;
  label: string;
  tag?: string;
  copyText: string;
  children: React.ReactNode;
}

// Shared GitHub-style chrome for CodeBlock and TerminalBlock.
export const CodeFrame: React.FC<CodeFrameProps> = ({
  icon,
  label,
  tag,
  copyText,
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      className="my-5 rounded-md border border-[#30363d] bg-[#0d1117] text-[#e6edf3] font-mono text-sm overflow-hidden"
    >
      <div className="flex items-center gap-2 px-3.5 py-2 bg-[#161b22] border-b border-[#30363d] text-[#8b949e]">
        {icon}
        <span className="text-[11px] font-sans uppercase tracking-wider truncate">{label}</span>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          {tag && (
            <span className="px-2 py-0.5 rounded border border-[#30363d] bg-[#21262d] text-[10px] uppercase tracking-wider text-[#8b949e]">
              {tag}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-[11px] font-sans text-[#c9d1d9] transition-colors"
            title="Copy"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#3fb950]" />
                <span className="text-[#3fb950]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};
