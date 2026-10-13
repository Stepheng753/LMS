import React, { useState } from 'react';
import { Download, Package } from 'lucide-react';

export interface DownloadItem {
  id: string;
  group: string;
  title: string;
  description: string;
  installTo: string;
  zipPath: string;
  filename: string;
  text: string;
}

interface ExtraFile {
  zipPath: string;
  text: string;
  executable?: boolean;
}

interface ToolkitDownloadsProps {
  items: DownloadItem[];
  /** Extra files added to the zip only (for example an installer script). */
  extras?: ExtraFile[];
  zipName: string;
}

const saveBlob = (name: string, blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const buttonClass =
  'inline-flex items-center gap-1.5 rounded-md border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors disabled:opacity-60';

// Builds files in the browser. Nothing is uploaded anywhere.
export const ToolkitDownloads: React.FC<ToolkitDownloadsProps> = ({ items, extras = [], zipName }) => {
  const [busy, setBusy] = useState(false);
  const groups = Array.from(new Set(items.map((i) => i.group)));

  const downloadOne = (item: DownloadItem) =>
    saveBlob(item.filename, new Blob([item.text + '\n'], { type: 'text/plain;charset=utf-8' }));

  const downloadZip = async () => {
    setBusy(true);
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      items.forEach((i) => zip.file(i.zipPath, i.text + '\n'));
      extras.forEach((e) => zip.file(e.zipPath, e.text + '\n', e.executable ? { unixPermissions: 0o755 } : undefined));
      const blob = await zip.generateAsync({ type: 'blob', platform: 'UNIX' });
      saveBlob(zipName, blob);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="my-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
        <div className="min-w-0">
          <p className="font-semibold text-foreground !my-0">Everything in one zip</p>
          <p className="text-sm text-muted-foreground !my-0">
            {items.length} files{extras.length > 0 ? ', plus an installer script' : ''}. Built in your browser, nothing is uploaded.
          </p>
        </div>
        <button onClick={downloadZip} disabled={busy} className={buttonClass}>
          <Package className="w-4 h-4" />
          {busy ? 'Preparing…' : `Download ${zipName}`}
        </button>
      </div>

      {groups.map((group) => (
        <div key={group} className="rounded-lg border border-border bg-card overflow-x-auto">
          <div className="px-4 py-2 border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group}
          </div>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {items
                .filter((i) => i.group === group)
                .map((item) => (
                  <tr key={item.id} className="border-t first:border-t-0 border-border">
                    <td className="px-4 py-3 align-top">
                      <p className="font-semibold text-foreground !my-0">{item.title}</p>
                      <p className="text-xs text-muted-foreground !my-0 mt-0.5">{item.description}</p>
                      {item.installTo && (
                        <p className="text-xs !my-0 mt-1">
                          Goes in: <code>{item.installTo}</code>
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-right whitespace-nowrap">
                      <button onClick={() => downloadOne(item)} className={buttonClass}>
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
