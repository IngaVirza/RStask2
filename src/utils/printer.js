export const printCurrentDir = (getDir) => {
  console.log(`You are currently in ${getDir()}`);
};

export const handleInvalidInput = () => {
  console.log('Invalid input');
};

export const handleError = () => {
  console.log('Operation failed');
};
