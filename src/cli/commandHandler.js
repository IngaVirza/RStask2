import { navigate } from '../commands/navigation.js';
import { operateFile } from '../commands/fileOps.js';
import { osInfo } from '../commands/os.js';
import { calculateHash } from '../commands/hash.js';
import { compressFile, decompressFile } from '../commands/compress.js';

export async function handleCommand(input, getDir, setDir) {
  const [command, ...args] = input.split(' ');

  try {
    switch (command) {
      case 'up':
      case 'cd':
      case 'ls':
        await navigate(command, args, getDir, setDir);
        break;
      case 'cat':
      case 'add':
      case 'rn':
      case 'cp':
      case 'mv':
      case 'rm':
      case 'mkdir':
        await operateFile(command, args, getDir);
        break;
      case 'os':
        osInfo(args[0]);
        break;
      case 'hash':
        await calculateHash(args[0], getDir());
        break;
      case 'compress':
        await compressFile(args[0], args[1], getDir());
        break;
      case 'decompress':
        await decompressFile(args[0], args[1], getDir());
        break;
      default:
        console.log('Invalid input');
    }
  } catch {
    console.log('Operation failed');
  }
}
