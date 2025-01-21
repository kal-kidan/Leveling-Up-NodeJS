const { spawn } = require('child_process');
const runCommand = async (command, args, options) => {
  return new Promise((resolve, reject) => {
    console.log(`Running ${command} ${args.join(' ')}...`);
    const child = spawn(command, args, { ...options, stdio: 'inherit' });
    child.on('close', (code) => {
      if (code == 0) {
        console.log(`${command} ${args.join(' ')} successfully completed!`);
        resolve();
      } else {
        reject(
          new Error(`${command} ${args.join(' ')} failed with code ${code}`)
        );
      }
    });
    child.on('error', (error) => {
      reject(
        new Error(
          `Error running ${command} ${args.join(' ')}: ${error.message}`
        )
      );
    });
  });
};

module.exports = { runCommand };
