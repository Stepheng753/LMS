import React from 'react';

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

interface SectionProps {
  title: string;
  id?: string;
  level?: 2 | 3;
}

// Renders a heading with an anchor id. Level-2 sections feed the "On this page" outline.
export const Section: React.FC<SectionProps> = ({ title, id, level = 2 }) => {
  const Tag = level === 2 ? 'h2' : 'h3';
  return (
    <Tag id={id ?? slugify(title)} className="scroll-mt-20">
      {title}
    </Tag>
  );
};
