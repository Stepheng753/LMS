import React, { ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';

interface BigWarningProps {
  title: string;
  children: ReactNode;
}

// A deliberately loud warning for things that can cost real money or cause real harm. Use sparingly.
export const BigWarning: React.FC<BigWarningProps> = ({ title, children }) => (
  <div className="my-8 overflow-hidden rounded-xl border-2 border-red-600 bg-red-50/70 text-red-950 shadow-md">
    <div className="flex items-center gap-3 bg-red-600 px-5 py-3 text-white">
      <TriangleAlert className="h-7 w-7 shrink-0" />
      <p className="!my-0 text-base font-bold uppercase tracking-wide sm:text-lg">{title}</p>
    </div>
    <div className="space-y-3 p-5 text-[0.95rem] leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&>*]:!my-0">
      {children}
    </div>
  </div>
);
