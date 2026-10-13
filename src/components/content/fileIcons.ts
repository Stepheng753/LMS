import { FILE_ICON_SVG } from './fileIconData';

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

const pick = (name: string, fallback: string) => (name in FILE_ICON_SVG ? name : fallback);

export function getFileIconName(fileName: string): string {
  const lower = fileName.toLowerCase();
  if (FILE_NAMES[lower]) return pick(FILE_NAMES[lower], 'default-file');
  if (lower.startsWith('readme')) return 'file-type-markdown';
  if (lower.startsWith('license')) return 'file-type-license';
  const ext = lower.includes('.') ? lower.split('.').pop()! : '';
  return pick(EXTENSIONS[ext] ?? 'default-file', 'default-file');
}

export function getFolderIconName(folderName: string, open: boolean): string {
  const type = FOLDERS[folderName.toLowerCase()];
  const base = type ? `folder-type-${type}` : 'default-folder';
  const name = open ? `${base}-opened` : base;
  return pick(name, open ? 'default-folder-opened' : 'default-folder');
}

export function getIconSvgBody(name: string): string {
  return FILE_ICON_SVG[name] ?? FILE_ICON_SVG['default-file'];
}
