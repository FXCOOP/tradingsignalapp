import fs from 'node:fs/promises';
import path from 'node:path';

export async function ensureDir(dir: string){
  await fs.mkdir(dir, { recursive: true });
}

export function slugify(s: string){
  return s.toLowerCase().replace(/[^a-z0-9-]+/g,'-').replace(/--+/g,'-').replace(/^-|-$/g,'');
}

export async function writeSignalHTML(html: string, date: Date, slug: string){
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth()+1).padStart(2,'0');
  const dir = path.join(process.cwd(), 'public', 'signals', yyyy, mm);
  await ensureDir(dir);
  const file = path.join(dir, `${slug}.html`);
  await fs.writeFile(file, html, 'utf-8');
  const rel = path.relative(path.join(process.cwd(), 'public'), file).replace(/\\/g,'/');
  return rel;
}