import React from 'react';

interface CommandRow {
  command: string;
  description: string;
  example?: string;
}

interface CommandTableProps {
  rows: CommandRow[];
  title?: string;
}

export const CommandTable: React.FC<CommandTableProps> = ({ rows, title = 'Command Cheat Sheet' }) => {
  const hasExample = rows.some((r) => r.example);
  return (
    <div className="my-5 rounded-lg border border-border bg-card overflow-x-auto">
      <div className="px-4 py-2 border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <table className="w-full text-sm border-collapse">
        <tbody>
          {rows.map((row) => (
            <tr key={row.command} className="border-t first:border-t-0 border-border">
              <td className="px-4 py-2.5 align-top whitespace-nowrap">
                <code>{row.command}</code>
              </td>
              <td className="px-4 py-2.5 align-top text-foreground/85">{row.description}</td>
              {hasExample && (
                <td className="px-4 py-2.5 align-top whitespace-nowrap font-mono text-xs text-muted-foreground">
                  {row.example}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
