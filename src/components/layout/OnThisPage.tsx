import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
}

interface OnThisPageProps {
  /** Changes whenever the step content changes, so headings are re-read. */
  stepId: string;
}

// Sticky outline of the active step's level-2 sections, with scroll-spy highlighting.
export const OnThisPage: React.FC<OnThisPageProps> = ({ stepId }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.lms-content h2[id]'));
    setHeadings(nodes.map((n) => ({ id: n.id, text: n.textContent ?? '' })));
    setActiveId(nodes[0]?.id ?? null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [stepId]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
      <ul className="space-y-1 border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`block w-full text-left -ml-px pl-3 py-1 text-sm border-l-2 transition-colors ${
                h.id === activeId
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
