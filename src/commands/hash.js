import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export async function calculateHash(file, cwd) {
  const filePath = path.resolve(cwd, file);
  const stream = fs.createReadStream(filePath);
  const hash = crypto.createHash('sha256');

  stream.on('data', (chunk) => hash.update(chunk));
  stream.on('end', () => {
    console.log(hash.digest('hex'));
  });

  stream.on('error', () => console.log('Operation failed'));
}
