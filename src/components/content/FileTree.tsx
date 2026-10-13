import React, { useState } from 'react';
import { ChevronRight, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';

// vscode-icons are bundled one file each (only the ones listed here ship in the app).
// To add an icon: add its name to a list below and map it in FILE_NAMES / EXTENSIONS / FOLDERS.
const ICON_MODULES = import.meta.glob<{ body: string }>(
  [
    '/node_modules/@iconify-icons/vscode-icons/data/d/default-{file,folder,folder-opened}.js',
    '/node_modules/@iconify-icons/vscode-icons/data/f/file-type-{js-official,typescript-official,reactjs,reactts,python,java,class,c,cpp,go,rust,php,ruby,html,css,scss,json,yaml,xml,markdown,sql,shell,log,text,pdf,image,svg,zip,git,npm,license,config,vite,tsconfig,docker,gradle,maven,excel}.js',
    '/node_modules/@iconify-icons/vscode-icons/data/f/folder-type-{src,component,config,dist,docs,git,github,images,log,node,public,script,test,vscode,css,style,api,asset,hook,model,view,controller,helper,library,module,temp,www,server,client,services,shared,plugin,template,theme,tools,app,db,docker,package,python,typescript,js}{,-opened}.js',
  ],
  { eager: true, import: 'default' }
);

const ICON_BODIES: Record<string, string> = Object.fromEntries(
  Object.entries(ICON_MODULES).map(([path, icon]) => [path.split('/').pop()!.replace(/\.js$/, ''), icon.body])
);

const FILE_NAMES: Record<string, string> = {
  'package.json': 'file-type-npm',
  'package-lock.json': 'file-type-npm',
  '.gitignore': 'file-type-git',
  '.gitattributes': 'file-type-git',
  license: 'file-type-license',
  'tsconfig.json': 'file-type-tsconfig',
  'vite.config.ts': 'file-type-vite',
  dockerfile: 'file-type-docker',
  '.bashrc': 'file-type-shell',
  '.zshrc': 'file-type-shell',
  '.profile': 'file-type-shell',
  '.bash_profile': 'file-type-shell',
  '.env': 'file-type-config',
  'build.gradle': 'file-type-gradle',
  'pom.xml': 'file-type-maven',
};

const EXTENSIONS: Record<string, string> = {
  js: 'file-type-js-official', mjs: 'file-type-js-official', cjs: 'file-type-js-official',
  ts: 'file-type-typescript-official', jsx: 'file-type-reactjs', tsx: 'file-type-reactts',
  py: 'file-type-python', java: 'file-type-java', class: 'file-type-class', c: 'file-type-c', h: 'file-type-c',
  cpp: 'file-type-cpp', go: 'file-type-go', rs: 'file-type-rust', php: 'file-type-php', rb: 'file-type-ruby',
  html: 'file-type-html', css: 'file-type-css', scss: 'file-type-scss', json: 'file-type-json',
  yml: 'file-type-yaml', yaml: 'file-type-yaml', xml: 'file-type-xml', md: 'file-type-markdown',
  sql: 'file-type-sql', sh: 'file-type-shell', bash: 'file-type-shell', zsh: 'file-type-shell',
  log: 'file-type-log', txt: 'file-type-text', pdf: 'file-type-pdf', svg: 'file-type-svg',
  png: 'file-type-image', jpg: 'file-type-image', jpeg: 'file-type-image', gif: 'file-type-image',
  webp: 'file-type-image', ico: 'file-type-image', zip: 'file-type-zip', tar: 'file-type-zip',
  gz: 'file-type-zip', csv: 'file-type-excel', xlsx: 'file-type-excel',
  toml: 'file-type-config', ini: 'file-type-config', conf: 'file-type-config', cfg: 'file-type-config',
};

// Folder name -> vscode-icons folder type (the "-opened" variant is derived).
const FOLDERS: Record<string, string> = {
  src: 'src', source: 'src', components: 'component', component: 'component',
  config: 'config', conf: 'config', '.config': 'config', dist: 'dist', build: 'dist', out: 'dist',
  docs: 'docs', doc: 'docs', '.git': 'git', '.github': 'github', images: 'images', img: 'images',
  assets: 'asset', logs: 'log', log: 'log', node_modules: 'node', public: 'public',
  scripts: 'script', script: 'script', test: 'test', tests: 'test', __tests__: 'test', spec: 'test',
  '.vscode': 'vscode', css: 'css', styles: 'style', api: 'api', hooks: 'hook', models: 'model',
  views: 'view', controllers: 'controller', helpers: 'helper', utils: 'helper', lib: 'library',
  modules: 'module', tmp: 'temp', temp: 'temp', www: 'www', server: 'server', client: 'client',
  services: 'services', shared: 'shared', common: 'shared', plugins: 'plugin', templates: 'template',
  themes: 'theme', tools: 'tools', app: 'app', db: 'db', database: 'db', docker: 'docker',
  packages: 'package', venv: 'python', '.venv': 'python', types: 'typescript',
};

const pick = (name: string, fallback: string) => (name in ICON_BODIES ? name : fallback);

function getFileIconName(fileName: string): string {
  const lower = fileName.toLowerCase();
  if (FILE_NAMES[lower]) return pick(FILE_NAMES[lower], 'default-file');
  if (lower.startsWith('readme')) return 'file-type-markdown';
  if (lower.startsWith('license')) return 'file-type-license';
  const ext = lower.includes('.') ? lower.split('.').pop()! : '';
  return pick(EXTENSIONS[ext] ?? 'default-file', 'default-file');
}

function getFolderIconName(folderName: string, open: boolean): string {
  const type = FOLDERS[folderName.toLowerCase()];
  const base = type ? `folder-type-${type}` : 'default-folder';
  const name = open ? `${base}-opened` : base;
  return pick(name, open ? 'default-folder-opened' : 'default-folder');
}

const getIconSvgBody = (name: string) => ICON_BODIES[name] ?? ICON_BODIES['default-file'];

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
