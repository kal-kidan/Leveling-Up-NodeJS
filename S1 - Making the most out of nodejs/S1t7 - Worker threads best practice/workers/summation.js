const { workerData, parentPort } = require('worker_threads');
const n = workerData.n;
let sum = 0;
for (let i = 0; i < n; i++) {
  sum = sum + i;
}

parentPort.postMessage(sum);
