import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface CompareProps {
  good: React.ReactNode;
  bad: React.ReactNode;
  goodLabel?: string;
  badLabel?: string;
}

export const Compare: React.FC<CompareProps> = ({ good, bad, goodLabel = 'Do', badLabel = "Don't" }) => (
  <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-lg border border-emerald-200 border-t-4 border-t-emerald-600 bg-emerald-50/50 p-4">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
        <CheckCircle2 className="w-4 h-4" />
        {goodLabel}
      </div>
      <div className="text-sm text-foreground/90 space-y-2 [&>*]:my-0">{good}</div>
    </div>
    <div className="rounded-lg border border-red-200 border-t-4 border-t-red-500 bg-red-50/50 p-4">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-red-800">
        <XCircle className="w-4 h-4" />
        {badLabel}
      </div>
      <div className="text-sm text-foreground/90 space-y-2 [&>*]:my-0">{bad}</div>
    </div>
  </div>
);
