const http = require('http');
const querystring = require('querystring');
const url = require('url');

const server = http.createServer((req, res) => {
  res.write('Your request is being processed... \n');
  const query = url.parse(req.url).query;
  const n = Number(querystring.parse(query)['n']);
  findSum(n, (sum) => {
    res.end(`The sum is ${sum} \n`);
  });
});

server.listen(3000, () => {
  console.log('server listening on port 3000');
});

function findSum(n, sumCallBack) {
  let sum = 0;
  function add(i, cb) {
    sum = sum + i;
    if (i == n) {
      return cb(sum);
    }
    setImmediate(add.bind(null, i + 1, cb));
  }

  add(1, sumCallBack);
}
