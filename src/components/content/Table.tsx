import React from 'react';

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  caption?: string;
  align?: ('left' | 'right' | 'center')[];
}

const ALIGN = { left: 'text-left', right: 'text-right', center: 'text-center' };

export const Table: React.FC<TableProps> = ({ headers, rows, caption, align = [] }) => (
  <div className="my-5 rounded-lg border border-border overflow-x-auto bg-card">
    <table className="w-full text-sm border-collapse">
      {caption && (
        <caption className="px-4 py-2 text-left text-xs text-muted-foreground border-b border-border">
          {caption}
        </caption>
      )}
      <thead>
        <tr className="bg-muted/70">
          {headers.map((h, i) => (
            <th
              key={i}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${ALIGN[align[i] ?? 'left']}`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r} className="border-t border-border even:bg-muted/30">
            {row.map((cell, c) => (
              <td key={c} className={`px-4 py-2.5 align-top min-w-[6.5rem] [overflow-wrap:anywhere] ${ALIGN[align[c] ?? 'left']}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
