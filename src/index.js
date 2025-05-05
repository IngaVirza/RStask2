import os from 'os';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleCommand } from './cli/commandHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const username = process.argv.find((arg) => arg.startsWith('--username='));
const user = username ? username.split('=')[1] : 'Anonymous';

let currentDir = os.homedir();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

console.log(`Welcome to the File Manager, ${user}!`);
printCWD();

rl.prompt();

rl.on('line', async (line) => {
  const input = line.trim();

  if (input === '.exit') {
    exitApp();
  } else {
    await handleCommand(
      input,
      () => currentDir,
      (newDir) => (currentDir = newDir)
    );
    printCWD();
    rl.prompt();
  }
}).on('SIGINT', () => {
  exitApp();
});

function printCWD() {
  console.log(`You are currently in ${currentDir}`);
}

function exitApp() {
  console.log(`Thank you for using File Manager, ${user}, goodbye!`);
  process.exit();
}
