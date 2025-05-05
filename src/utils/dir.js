import os from 'os';

let currentDir = os.homedir();

export const getDir = () => currentDir;
export const setDir = (newDir) => {
  if (!newDir.startsWith(path.parse(currentDir).root)) return;
  currentDir = newDir;
};
