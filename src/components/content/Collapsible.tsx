import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** Replaces the default outer margin (e.g. when nested in another component). */
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  defaultOpen,
  className = 'my-5',
}) => (
  <details open={defaultOpen} className={`group rounded-lg border border-border bg-card ${className}`}>
    <summary className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-foreground list-none [&::-webkit-details-marker]:hidden">
      <ChevronRight className="w-4 h-4 text-primary transition-transform group-open:rotate-90" />
      {title}
    </summary>
    <div className="px-4 pb-4 pt-1 text-sm text-foreground/85 space-y-3 [&>*:first-child]:mt-0">{children}</div>
  </details>
);
