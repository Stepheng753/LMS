import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-[#f8f4f0] text-muted-foreground py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-foreground">CrossRoads Upskill LMS</span>
          <span>•</span>
          <span>Curated Interactive Learning Tracks</span>
        </div>
        <p className="text-center sm:text-right">
          Crafted with React, Vite & Tailwind CSS in WSL • Elegant Luxury Theme
        </p>
      </div>
    </footer>
  );
};
