const http = require('http');
const querystring = require('querystring');
const url = require('url');
const { Worker } = require('worker_threads');
const server = http.createServer(async (req, res) => {
  res.write('Your request is being processed... \n');
  const query = url.parse(req.url).query;
  const n = Number(querystring.parse(query)['n']);
  const sum = await findSum(n);
  res.end(`the sum is ${sum}`);
});

server.listen(3000, () => {
  console.log('server listening on port 3000');
});

function findSum(n) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./workers/summation.js', { workerData: { n } });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}
