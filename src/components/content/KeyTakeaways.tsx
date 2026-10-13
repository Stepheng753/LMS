import React from 'react';
import { BookmarkCheck } from 'lucide-react';

interface KeyTakeawaysProps {
  items: string[];
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ items }) => {
  return (
    <div className="my-6 p-5 rounded-lg border border-[#ebdccb] bg-[#fdfaf7] text-foreground">
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
        <BookmarkCheck className="w-4 h-4 text-primary" />
        <span>Key Takeaways</span>
      </div>
      <ul className="space-y-2 text-sm text-foreground/90 pl-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
