import React from 'react';

interface TermProps {
  definition: string;
  children: React.ReactNode;
}

// Inline glossary word: dotted underline with a definition tooltip on hover/focus.
export const Term: React.FC<TermProps> = ({ definition, children }) => (
  <span className="relative group/term" tabIndex={0}>
    <span className="border-b border-dotted border-primary cursor-help">{children}</span>
    <span
      role="tooltip"
      className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-2 w-64 -translate-x-1/2 rounded-md bg-[#1c1917] px-3 py-2 text-xs leading-snug font-normal text-[#f5f5f4] shadow-lg opacity-0 transition-opacity group-hover/term:opacity-100 group-focus/term:opacity-100"
    >
      {definition}
    </span>
  </span>
);
