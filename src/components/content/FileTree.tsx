import React, { useState } from 'react';
import { ChevronRight, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { getFileIconName, getFolderIconName, getIconSvgBody } from './fileIcons';

export interface TreeNode {
  name: string;
  note?: string;
  /** Presence of `children` marks the node as a directory. */
  children?: TreeNode[];
}

interface FileTreeProps {
  tree: TreeNode[];
  title?: string;
  /** Folders deeper than this start collapsed. Default: everything expanded. */
  defaultOpenDepth?: number;
}

// vscode-icons are authored on a 32x32 grid.
const Icon: React.FC<{ name: string }> = ({ name }) => (
  <svg
    viewBox="0 0 32 32"
    width={18}
    height={18}
    className="shrink-0"
    aria-hidden
    dangerouslySetInnerHTML={{ __html: getIconSvgBody(name) }}
  />
);

const TreeRows: React.FC<{
  nodes: TreeNode[];
  depth: number;
  path: string;
  open: Set<string>;
  toggle: (path: string) => void;
}> = ({ nodes, depth, path, open, toggle }) => (
  <>
    {nodes.map((node) => {
      const nodePath = `${path}/${node.name}`;
      const isDir = node.children !== undefined;
      const isOpen = open.has(nodePath);
      const indent = { paddingLeft: `${depth * 1.25 + 0.5}rem` };
      const note = node.note && <span className="text-muted-foreground text-xs"># {node.note}</span>;

      return (
        <React.Fragment key={nodePath}>
          {isDir ? (
            <button
              type="button"
              role="treeitem"
              aria-expanded={isOpen}
              onClick={() => toggle(nodePath)}
              style={indent}
              className="flex w-full items-center gap-1.5 py-1 pr-4 text-left whitespace-nowrap hover:bg-muted/60 transition-colors"
            >
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-90' : ''}`}
              />
              <Icon name={getFolderIconName(node.name, isOpen)} />
              <span className="font-medium text-foreground">{node.name}</span>
              {note}
            </button>
          ) : (
            <div
              role="treeitem"
              style={{ ...indent, paddingLeft: `${depth * 1.25 + 0.5 + 1.375}rem` }}
              className="flex items-center gap-1.5 py-1 pr-4 whitespace-nowrap"
            >
              <Icon name={getFileIconName(node.name)} />
              <span className="text-foreground/85">{node.name}</span>
              {note}
            </div>
          )}
          {isDir && isOpen && (
            <TreeRows nodes={node.children!} depth={depth + 1} path={nodePath} open={open} toggle={toggle} />
          )}
        </React.Fragment>
      );
    })}
  </>
);

const collectOpen = (nodes: TreeNode[], maxDepth: number, depth = 0, path = '', acc = new Set<string>()) => {
  for (const node of nodes) {
    if (node.children && depth < maxDepth) {
      const nodePath = `${path}/${node.name}`;
      acc.add(nodePath);
      collectOpen(node.children, maxDepth, depth + 1, nodePath, acc);
    }
  }
  return acc;
};

export const FileTree: React.FC<FileTreeProps> = ({ tree, title, defaultOpenDepth = Infinity }) => {
  const [open, setOpen] = useState(() => collectOpen(tree, defaultOpenDepth));

  const toggle = (path: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });

  return (
    <div className="my-5 rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-1.5 border-b border-border bg-muted/60">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title ?? 'Files'}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setOpen(collectOpen(tree, Infinity))}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-primary hover:bg-background/70 transition-colors"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" />
            Expand all
          </button>
          <button
            type="button"
            onClick={() => setOpen(new Set())}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-primary hover:bg-background/70 transition-colors"
          >
            <ChevronsDownUp className="w-3.5 h-3.5" />
            Collapse all
          </button>
        </div>
      </div>
      <div className="py-1.5 font-mono text-sm overflow-x-auto" role="tree">
        <TreeRows nodes={tree} depth={0} path="" open={open} toggle={toggle} />
      </div>
    </div>
  );
};
