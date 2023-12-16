const os = require('os');
const fs = require('fs');
const cpuInfo = os.cpus();

(async () => {
  try {
    const filename = 'cpu.txt';
    if (fs.existsSync(filename)) {
      const readableStream = fs.createReadStream(filename);
      readableStream.on('data', (chunk) => {
        console.log(chunk.toString());
      });
      readableStream.on('end', () => {
        console.log('stream completed the reading. ');
      });
      readableStream.on('error', (error) => {
        console.log(error);
      });
    } else {
      await fs.promises.writeFile(filename, JSON.stringify(cpuInfo));
    }
  } catch (error) {
    console.log(error);
  }
})();
