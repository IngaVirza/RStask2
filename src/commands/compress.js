import fs from 'fs';
import path from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export async function compressFile(srcFile, destFile, cwd) {
  const src = path.resolve(cwd, srcFile);
  const dest = path.resolve(cwd, destFile);

  const rs = fs.createReadStream(src);
  const ws = fs.createWriteStream(dest);
  const brotli = createBrotliCompress();

  rs.pipe(brotli).pipe(ws);

  rs.on('error', () => console.log('Operation failed'));
  ws.on('error', () => console.log('Operation failed'));
}

export async function decompressFile(srcFile, destFile, cwd) {
  const src = path.resolve(cwd, srcFile);
  const dest = path.resolve(cwd, destFile);

  const rs = fs.createReadStream(src);
  const ws = fs.createWriteStream(dest);
  const brotli = createBrotliDecompress();

  rs.pipe(brotli).pipe(ws);

  rs.on('error', () => console.log('Operation failed'));
  ws.on('error', () => console.log('Operation failed'));
}
