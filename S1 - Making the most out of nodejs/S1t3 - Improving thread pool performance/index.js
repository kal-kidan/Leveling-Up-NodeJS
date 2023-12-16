const http = require('http');
const url = require('url');
const querystring = require('querystring');
const server = http.createServer((req, res) => {
  const query = url.parse(req.url).query;
  let n = Number(querystring.parse(query)['n']);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  res.end(JSON.stringify(sum));
});

server.listen(3000, () => {
  console.log('server listening on port 3000');
});
