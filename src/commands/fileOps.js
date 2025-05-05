import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

export async function operateFile(command, args, getDir) {
  const cwd = getDir();
  const resolve = (p) => path.resolve(cwd, p);

  try {
    if (command === 'cat') {
      const stream = fs.createReadStream(resolve(args[0]), 'utf-8');
      stream.pipe(process.stdout);
    } else if (command === 'add') {
      await fsp.writeFile(resolve(args[0]), '', { flag: 'wx' });
    } else if (command === 'mkdir') {
      await fsp.mkdir(resolve(args[0]));
    } else if (command === 'rn') {
      const filePath = resolve(args[0]);
      const newPath = path.join(path.dirname(filePath), args[1]);
      await fsp.rename(filePath, newPath);
    } else if (command === 'cp') {
      const src = resolve(args[0]);
      const dest = path.join(resolve(args[1]), path.basename(src));
      const rs = fs.createReadStream(src);
      const ws = fs.createWriteStream(dest);
      rs.pipe(ws);
    } else if (command === 'mv') {
      const src = resolve(args[0]);
      const dest = path.join(resolve(args[1]), path.basename(src));
      const rs = fs.createReadStream(src);
      const ws = fs.createWriteStream(dest);
      rs.pipe(ws);
      rs.on('close', async () => await fsp.unlink(src));
    } else if (command === 'rm') {
      await fsp.rm(resolve(args[0]));
    }
  } catch {
    console.log('Operation failed');
  }
}
