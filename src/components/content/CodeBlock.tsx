import React, { useMemo } from 'react';
import { FileCode } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import { CodeFrame } from './CodeFrame';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', title }) => {
  // Authored code is tokenised by Prism, which escapes its input; unknown languages fall back to plain text.
  const html = useMemo(() => {
    const grammar = Prism.languages[language];
    return grammar ? Prism.highlight(code, grammar, language) : escapeHtml(code);
  }, [code, language]);

  return (
    <CodeFrame
      icon={<FileCode className="w-3.5 h-3.5 text-[#8b949e]" />}
      label={title || language}
      tag={title ? language : undefined}
      copyText={code}
    >
      <div className="p-4 overflow-x-auto text-[0.9rem] leading-relaxed">
        <pre className="lms-code m-0 whitespace-pre" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </CodeFrame>
  );
};
