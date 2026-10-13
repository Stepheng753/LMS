import React, { useState } from 'react';

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="my-5 rounded-lg border border-border bg-card">
      <div role="tablist" className="flex gap-1 px-2 border-b border-border overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`px-3.5 py-2.5 text-sm border-b-2 -mb-px transition-colors shrink-0 ${
              i === active
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="p-4 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {tabs[active].content}
      </div>
    </div>
  );
};
