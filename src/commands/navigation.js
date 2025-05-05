import path from 'path';
import fs from 'fs/promises';
import os from 'os';

export async function navigate(command, args, getDir, setDir) {
  let currentDir = getDir();
  if (command === 'up') {
    const parent = path.dirname(currentDir);
    if (parent !== currentDir && parent.includes(path.parse(currentDir).root)) {
      setDir(parent);
    }
  } else if (command === 'cd') {
    const dest = path.resolve(currentDir, args[0]);
    try {
      const stat = await fs.stat(dest);
      if (stat.isDirectory()) {
        setDir(dest);
      } else {
        throw new Error();
      }
    } catch {
      console.log('Operation failed');
    }
  } else if (command === 'ls') {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      const folders = entries
        .filter((e) => e.isDirectory())
        .map((e) => ({ name: e.name, type: 'directory' }));
      const files = entries
        .filter((e) => e.isFile())
        .map((e) => ({ name: e.name, type: 'file' }));
      const sorted = [
        ...folders.sort((a, b) => a.name.localeCompare(b.name)),
        ...files.sort((a, b) => a.name.localeCompare(b.name)),
      ];
      console.table(sorted);
    } catch {
      console.log('Operation failed');
    }
  }
}
